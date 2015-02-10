(function() {
  define(["ComplexResModel", "Design", "constant", "i18n!/nls/lang.js", 'CloudResources'], function(ComplexResModel, Design, constant, lang, CloudResources) {
    var Model, emptyArray;
    emptyArray = [];
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.INSTANCE,
      newNameTmpl: "host-",
      defaults: function() {
        return {
          count: 1,
          imageId: '',
          tenancy: 'default',
          ebsOptimized: false,
          instanceType: "m1.small",
          monitoring: false,
          userData: "",
          volumeList: [],
          rdSize: 0,
          rdIops: 0,
          rdType: 'gp2',
          cachedAmi: null,
          state: null
        };
      },
      initialize: function(attr, option) {
        var EniModel, KpModel, SgAsso, SgModel, defaultKp, defaultSg, tenancy, volSize, vpc;
        option = option || {};
        if (option.cloneSource) {
          attr.imageId = option.cloneSource.get("imageId");
        }
        console.assert(attr.imageId, "Invalid attributes when creating InstanceModel", attr);
        this.setAmi(attr.imageId);
        if (option.createByUser || option.cloneSource) {
          EniModel = Design.modelClassForType(constant.RESTYPE.ENI);
          this.setEmbedEni(new EniModel({
            name: "eni0",
            assoPublicIp: false
          }, {
            instance: this
          }));
        }
        if (option.cloneSource) {
          this.clone(option.cloneSource);
        } else if (option.createByUser) {
          this.initInstanceType();
        }
        if (!this.get("rdSize")) {
          volSize = this.getAmiRootDeviceVolumeSize();
          if (volSize > 0) {
            this.set("rdSize", volSize);
          }
        }
        if (option.createByUser && !option.cloneSource) {
          KpModel = Design.modelClassForType(constant.RESTYPE.KP);
          defaultKp = KpModel.getDefaultKP();
          if (defaultKp) {
            defaultKp.assignTo(this);
          } else {
            console.error("No DefaultKP found when initialize InstanceModel");
          }
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          defaultSg = SgModel.getDefaultSg();
          if (defaultSg) {
            SgAsso = Design.modelClassForType("SgAsso");
            new SgAsso(this, defaultSg);
          } else {
            console.error("No DefaultSG found when initialize InstanceModel");
          }
        }
        tenancy = this.get("tenancy");
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        if (vpc && !vpc.isDefaultTenancy()) {
          tenancy = "dedicated";
        }
        this.setTenancy(tenancy);
        return null;
      },
      groupMembers: function() {
        if (!this.__groupMembers) {
          this.__groupMembers = [];
        }
        return this.__groupMembers;
      },
      getAvailabilityZone: function() {
        var p;
        p = this.parent();
        if (p.type === constant.RESTYPE.SUBNET) {
          return p.parent();
        } else {
          return p;
        }
      },
      getOSFamily: function() {
        var ami;
        ami = this.getAmi() || this.get("cachedAmi");
        if (!ami || !ami.osType || !ami.osFamily) {
          console.warn("Cannot find ami infomation for instance :", this);
          return "linux";
        }
        if (ami.osFamily) {
          return ami.osFamily;
        }
        return CloudResources(this.design.credentialId(), constant.RESTYPE.AMI, this.design.region()).getOSFamily(ami.id);
      },
      initInstanceType: function() {
        var i, type, _i, _len, _ref;
        _ref = this.getInstanceTypeList();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.name !== "t1.micro") {
            type = i.name;
            break;
          }
        }
        this.attributes.instanceType = type || "m1.small";
      },
      getCost: function(priceMap, currency) {
        var ami, count, cw_fee, fee, formatedFee, instanceType, name, osFamily, osType, priceObj, t, unit, _i, _len, _ref;
        if (!priceMap.instance) {
          return null;
        }
        ami = this.getAmi() || this.get("cachedAmi");
        osType = ami ? ami.osType : "linux-other";
        osFamily = this.getOSFamily();
        instanceType = this.get("instanceType").split(".");
        unit = priceMap.instance.unit;
        fee = priceMap.instance[instanceType[0]][instanceType[1]];
        fee = fee ? fee.onDemand : void 0;
        if (fee) {
          if (fee[osFamily] === void 0 && osFamily.indexOf("mswin") === 0) {
            osFamily = "mswin";
          }
          fee = fee[osFamily];
        }
        fee = fee ? fee[currency] : void 0;
        if (!fee) {
          return null;
        }
        if (unit === "perhr") {
          formatedFee = fee + "/hr";
          fee *= 24 * 30;
        } else {
          formatedFee = fee + "/mo";
        }
        count = this.get("count") || 1;
        name = this.get("name");
        if (count > 1) {
          name += " (x" + count + ")";
          fee *= count;
        }
        priceObj = {
          resource: name,
          type: this.get("instanceType"),
          fee: fee,
          formatedFee: formatedFee
        };
        if (this.get("monitoring")) {
          _ref = priceMap.cloudwatch.types;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            if (t.ec2Monitoring) {
              fee = t.ec2Monitoring[currency];
              cw_fee = {
                resource: this.get("name") + "-monitoring",
                type: "CloudWatch",
                fee: fee * count,
                formatedFee: fee + "/mo"
              };
              return [priceObj, cw_fee];
            }
          }
        }
        return priceObj;
      },
      isReparentable: function(newParent) {
        var check;
        if (newParent.type === constant.RESTYPE.ASG || newParent.type === "ExpandedAsg") {
          return false;
        }
        if (newParent.type === constant.RESTYPE.SUBNET) {
          if (newParent.parent() !== this.parent().parent()) {
            check = true;
          }
        } else {
          check = true;
        }
        if (check && this.connectionTargets("EniAttachment").length > 0) {
          return lang.CANVAS.ERR_MOVE_ATTACHED_ENI;
        }
        return true;
      },
      connect: function(cn) {
        var eni;
        if (cn.type === "EniAttachment") {
          eni = this.getEmbedEni();
          if (eni) {
            return eni.set("assoPublicIp", false);
          }
        }
      },
      setPrimaryEip: function(toggle) {
        var eni;
        eni = this.getEmbedEni();
        if (eni) {
          eni.setPrimaryEip(toggle);
        } else {
          this.set("hasEip", toggle);
          if (toggle) {
            if (!this.attributes.eipData) {
              this.attributes.eipData = {};
            }
            if (!this.attributes.eipData.id) {
              this.attributes.eipData.id = MC.guid();
            }
          }
        }
      },
      hasPrimaryEip: function() {
        var eni;
        eni = this.getEmbedEni();
        if (eni) {
          return eni.hasPrimaryEip();
        } else {
          return this.get("hasEip");
        }
      },
      hasAutoAssignPublicIp: function() {
        return this.getEmbedEni().get('assoPublicIp');
      },
      setCount: function(count) {
        var c, eni, route, _i, _j, _len, _len1, _ref, _ref1;
        this.set("count", count);
        if (count > 1) {
          route = this.connections('RTB_Route')[0];
          if (route) {
            route.remove();
          }
        }
        _ref = this.connectionTargets("EniAttachment");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          eni = _ref[_i];
          if (count > 1) {
            _ref1 = eni.connections("RTB_Route");
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              c = _ref1[_j];
              c.remove();
            }
          }
        }
        return null;
      },
      isDefaultTenancy: function() {
        var VpcModel, vpc;
        VpcModel = Design.modelClassForType(constant.RESTYPE.VPC);
        vpc = VpcModel.allObjects()[0];
        if (vpc && !vpc.isDefaultTenancy()) {
          return false;
        } else {
          return this.get("tenancy") !== "dedicated";
        }
        return null;
      },
      setAmi: function(amiId) {
        var ami, cached, minRdSize, rdEbs, rdName;
        this.set("imageId", amiId);
        ami = this.getAmi();
        cached = this.get("cachedAmi");
        if (ami && cached) {
          cached.osType = ami.osType;
          cached.architecture = ami.architecture;
          cached.rootDeviceType = ami.rootDeviceType;
        }
        if (ami && ami.blockDeviceMapping && !$.isEmptyObject(ami.blockDeviceMapping)) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (!rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
              }
              return null;
            });
          }
          minRdSize = rdEbs ? parseInt(rdEbs.volumeSize, 10) : 10;
          if (this.get("rdSize") < minRdSize) {
            this.set("rdSize", minRdSize);
          }
        }
        return null;
      },
      getAmi: function() {
        var ami;
        ami = CloudResources(this.design().credentialId(), constant.RESTYPE.AMI, this.design().region()).get(this.get("imageId"));
        if (ami) {
          return ami.toJSON();
        } else {
          return null;
        }
      },
      getBlockDeviceMapping: function() {
        var ami, blockDeviceMapping, rdEbs, rdName;
        ami = this.getAmi() || this.get("cachedAmi");
        if (ami && ami.rootDeviceType === "ebs" && ami.blockDeviceMapping && !$.isEmptyObject(ami.blockDeviceMapping)) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (!rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                rdName = key;
              }
              return null;
            });
          }
          blockDeviceMapping = [
            {
              DeviceName: rdName,
              Ebs: {
                SnapshotId: rdEbs.snapshotId,
                VolumeSize: this.get("rdSize") || rdEbs.volumeSize,
                VolumeType: this.get('rdType')
              }
            }
          ];
          if (this.get("rdIops") && parseInt(this.get("rdSize"), 10) >= 10) {
            blockDeviceMapping[0].Ebs.Iops = this.get("rdIops");
          }
        }
        return blockDeviceMapping || [];
      },
      getAmiRootDevice: function() {
        var amiInfo, rd, rdEbs, rdName;
        amiInfo = this.getAmi() || this.get("cachedAmi");
        rd = null;
        if (amiInfo && amiInfo.rootDeviceType === "ebs" && amiInfo.blockDeviceMapping) {
          rdName = amiInfo.rootDeviceName;
          rdEbs = amiInfo.blockDeviceMapping[rdName];
          if (rdName && !rdEbs) {
            _.each(amiInfo.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                rdName = key;
              }
              return null;
            });
          }
          if (rdName && rdEbs) {
            rd = {
              "DeviceName": rdName,
              "Ebs": {
                "VolumeSize": Number(rdEbs.volumeSize),
                "SnapshotId": rdEbs.snapshotId,
                "VolumeType": rdEbs.volumeType
              }
            };
            if (rdEbs.volumeType === "io1") {
              rd.Ebs.Iops = rdEbs.iops;
            }
          } else {
            console.warn("getAmiRootDevice(): can not found root device of AMI(" + this.get("imageId") + ")", this);
          }
        }
        return rd;
      },
      getAmiRootDeviceVolumeSize: function() {
        var amiInfo, rd, volSize, volumeSize;
        volSize = 0;
        amiInfo = this.getAmi();
        if (amiInfo) {
          if (amiInfo.osType === "windows") {
            volumeSize = 30;
          } else {
            volumeSize = 10;
          }
          rd = this.getAmiRootDevice();
          if (rd) {
            volSize = rd.Ebs.VolumeSize;
          } else {
            console.warn("getAmiRootDeviceVolumeSize(): use default volumeSize " + volSize, this);
          }
        } else {
          console.warn("getAmiRootDeviceVolumeSize(): unknown volumeSize for " + this.get("imageId"));
        }
        return volSize;
      },
      getAmiRootDeviceName: function() {
        var rd;
        rd = this.getAmiRootDevice();
        if (rd && rd.DeviceName) {
          return rd.DeviceName;
        } else {
          return "";
        }
      },
      getInstanceTypeConfig: function(type) {
        var config;
        config = App.model.getInstanceTypeConfig(this.design().region());
        if (config) {
          return config[type || this.get("instanceType")];
        }
        return null;
      },
      getMaxEniCount: function() {
        var config;
        config = this.getInstanceTypeConfig();
        if (config) {
          config = config.max_eni;
        }
        return config || 16;
      },
      isEbsOptimizedEnabled: function() {
        var EbsMap, ami, instanceType;
        ami = this.getAmi() || this.get("cachedAmi");
        if (ami && ami.rootDeviceType === "instance-store") {
          return false;
        }
        instanceType = this.getInstanceTypeConfig();
        if (instanceType && instanceType.ebs_optimized) {
          return instanceType.ebs_optimized === 'Yes';
        }
        EbsMap = {
          "m1.large": true,
          "m1.xlarge": true,
          "m2.2xlarge": true,
          "m2.4xlarge": true,
          "m3.xlarge": true,
          "m3.2xlarge": true,
          "c1.xlarge": true,
          "c3.xlarge": true,
          "c3.2xlarge": true,
          "c3.4xlarge": true,
          "g2.2xlarge": true,
          "i2.xlarge": true,
          "i2.2xlarge": true,
          "i2.4xlarge": true
        };
        return !!EbsMap[this.get("instanceType")];
      },
      setInstanceType: function(type) {
        var eni, enis, volumeList, _i, _len;
        if (type === "t1.micro" && !this.isDefaultTenancy()) {
          type = "m1.small";
        }
        this.set("instanceType", type);
        if (!this.isEbsOptimizedEnabled()) {
          this.set("ebsOptimized", false);
        }
        volumeList = this.get('volumeList');
        if (volumeList) {
          _.each(volumeList, function(vol) {
            if (!vol.isSupportEncrypted()) {
              vol.set('encrypted', false);
            }
            return null;
          });
        }
        if (this.getEmbedEni) {
          enis = this.connectionTargets("EniAttachment");
          enis.push(this.getEmbedEni());
          for (_i = 0, _len = enis.length; _i < _len; _i++) {
            eni = enis[_i];
            eni.limitIpAddress();
          }
        }
        return null;
      },
      setTenancy: function(tenancy) {
        this.set("tenancy", tenancy);
        if (tenancy === "dedicated" && this.get("instanceType") === "t1.micro") {
          this.initInstanceType();
        }
        return null;
      },
      getInstanceType: function() {
        return Model.getInstanceType(this.getAmi(), this.design().region());
      },
      getInstanceTypeList: function() {
        var instanceType, region, tenancy;
        tenancy = this.isDefaultTenancy();
        instanceType = this.get("instanceType");
        region = this.design().region();
        return _.map(this.getInstanceType(), function(value) {
          var configs;
          configs = App.model.getInstanceTypeConfig(region);
          if (!configs) {
            return {};
          }
          configs = configs[value].formated_desc;
          return {
            main: configs[0],
            ecu: configs[1],
            core: configs[2],
            mem: configs[3],
            name: value,
            selected: instanceType === value,
            hide: !tenancy && value === "t1.micro"
          };
        });
      },
      remove: function() {
        var eni, v, _i, _j, _len, _len1, _ref, _ref1;
        if (this.__mainEni) {
          this.__mainEni.remove();
        }
        _ref = (this.get("volumeList") || emptyArray).slice(0);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          v.remove();
        }
        if (Design.instance().modeIsAppEdit()) {
          _ref1 = this.connectionTargets("EniAttachment");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            eni = _ref1[_j];
            eni.remove();
          }
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      isRemovable: function() {
        var state;
        state = this.get("state");
        if ((state && _.isArray(state) && state.length > 0) || ($('#state-editor-model').is(':visible') && $('#state-editor-model .state-list .state-item').length >= 1)) {
          return MC.template.NodeStateRemoveConfirmation({
            name: this.get("name")
          });
        }
        return true;
      },
      clone: function(srcTarget) {
        var Volume, state, v, _i, _j, _len, _len1, _ref, _ref1;
        this.cloneAttributes(srcTarget, {
          reserve: "volumeList",
          copyConnection: ["KeypairUsage", "SgAsso", "ElbAmiAsso"]
        });
        _ref = this.get("state") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          state = _ref[_i];
          state.id = "state-" + this.design().guid();
        }
        Volume = Design.modelClassForType(constant.RESTYPE.VOL);
        _ref1 = srcTarget.get("volumeList") || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          v = _ref1[_j];
          new Volume({
            owner: this
          }, {
            cloneSource: v
          });
        }
        this.getEmbedEni().clone(srcTarget.getEmbedEni());
        return null;
      },
      setEmbedEni: function(eni) {
        this.__mainEni = eni;
        return null;
      },
      getEmbedEni: function() {
        return this.__mainEni;
      },
      getRealGroupMemberIds: function() {
        var c, mem, members, _i, _len, _ref;
        this.ensureEnoughMember();
        c = this.get("count");
        members = [this.id];
        _ref = this.groupMembers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          mem = _ref[_i];
          if (members.length >= c) {
            break;
          }
          members.push(mem.id);
        }
        return members;
      },
      ensureEnoughMember: function() {
        var totalCount;
        totalCount = this.get("count") - 1;
        while (this.groupMembers().length < totalCount) {
          this.groupMembers().push({
            id: MC.guid(),
            appId: "",
            eipData: {
              id: MC.guid()
            }
          });
        }
        return null;
      },
      onParentChanged: function() {
        var eniModel;
        eniModel = this.getEmbedEni();
        if (eniModel) {
          return eniModel.onParentChanged();
        }
      },
      generateJSON: function() {
        var blockDeviceMapping, component, name, p, tenancy, vpc;
        tenancy = this.get("tenancy");
        p = this.parent();
        if (p.type === constant.RESTYPE.SUBNET) {
          vpc = p.parent().parent();
          if (!vpc.isDefaultTenancy()) {
            tenancy = "dedicated";
          }
        }
        name = this.get("name");
        if (this.get("count") > 1) {
          name += "-0";
        }
        blockDeviceMapping = this.getBlockDeviceMapping();
        component = {
          type: this.type,
          uid: this.id,
          name: name,
          description: this.get("description") || "",
          index: 0,
          number: this.get("count"),
          serverGroupUid: this.id,
          serverGroupName: this.get("name"),
          state: this.get("state"),
          resource: {
            UserData: {
              Base64Encoded: false,
              Data: this.get("userData")
            },
            BlockDeviceMapping: blockDeviceMapping,
            Placement: {
              Tenancy: tenancy === "dedicated" ? "dedicated" : "",
              AvailabilityZone: this.getAvailabilityZone().createRef()
            },
            InstanceId: this.get("appId"),
            ImageId: this.get("imageId"),
            KeyName: this.get("keyName"),
            EbsOptimized: this.isEbsOptimizedEnabled() ? this.get("ebsOptimized") : false,
            VpcId: this.getVpcRef(),
            SubnetId: this.getSubnetRef(),
            Monitoring: this.get("monitoring") ? "enabled" : "disabled",
            NetworkInterface: [],
            InstanceType: this.get("instanceType"),
            DisableApiTermination: false,
            ShutdownBehavior: "terminate",
            SecurityGroup: [],
            SecurityGroupId: []
          }
        };
        return component;
      },
      createEipJson: function(eipData, instanceId) {
        instanceId = instanceId || this.id;
        return {
          uid: eipData.id,
          type: constant.RESTYPE.EIP,
          index: 0,
          name: "EIP",
          resource: {
            Domain: "standard",
            InstanceId: this.createRef("InstanceId", instanceId),
            AllocationId: eipData.allocationId || "",
            NetworkInterfaceId: "",
            PublicIp: eipData.publicIp || ""
          }
        };
      },
      getStateData: function() {
        return this.get("state");
      },
      setStateData: function(stateAryData) {
        return this.set("state", stateAryData);
      },
      setKey: function(keyName, defaultKey) {
        var KpModel, defaultKp, kp;
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKp = KpModel.getDefaultKP();
        if (defaultKey) {
          if (defaultKp) {
            return defaultKp.assignTo(this);
          } else {
            return console.error("No DefaultKP found when initialize InstanceModel");
          }
        } else {
          kp = this.connectionTargets("KeypairUsage")[0];
          kp && kp.dissociate(this);
          return this.set('keyName', keyName);
        }
      },
      getKeyName: function() {
        var kp;
        kp = this.connectionTargets("KeypairUsage")[0];
        if (kp) {
          if (kp.isDefault()) {
            return '$DefaultKeyPair';
          } else {
            return kp.get('name');
          }
        } else {
          return this.get('keyName') || lang.PROP.INSTANCE_NO_KP;
        }
      },
      isDefaultKey: function() {
        var kp;
        kp = this.connectionTargets("KeypairUsage")[0];
        return kp && kp.isDefault();
      },
      isNoKey: function() {
        var kp;
        kp = this.connectionTargets("KeypairUsage")[0];
        return !kp && !this.get('keyName');
      },
      serialize: function() {
        var allResourceArray, ami, attach, eni, eniIndex, eniModels, enis, i, idx, instance, instances, layout, member, memberObj, res, serverGroupOption, v, volume, volumeModels, volumes, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;
        allResourceArray = [];
        ami = this.getAmi() || this.get("cachedAmi");
        layout = this.generateLayout();
        if (ami) {
          layout.osType = ami.osType;
          layout.architecture = ami.architecture;
          layout.rootDeviceType = ami.rootDeviceType;
        }
        allResourceArray.push({
          layout: layout
        });
        instances = [this.generateJSON()];
        i = instances.length;
        this.ensureEnoughMember();
        while (i < this.get("count")) {
          member = $.extend(true, {}, instances[0]);
          member.name = this.get("name") + "-" + i;
          member.index = i;
          memberObj = this.groupMembers()[instances.length - 1];
          member.uid = memberObj.id;
          member.resource.InstanceId = memberObj.appId;
          ++i;
          instances.push(member);
        }
        serverGroupOption = {
          number: instances.length,
          instanceId: ""
        };
        volumeModels = this.get("volumeList") || emptyArray;
        eniModels = this.getEmbedEni() ? [this.getEmbedEni()] : [];
        _ref = this.connections("EniAttachment");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          attach = _ref[_i];
          eniModels[attach.get("index")] = attach.getOtherTarget(this);
        }
        volumes = [];
        enis = [];
        for (idx = _j = 0, _len1 = instances.length; _j < _len1; idx = ++_j) {
          instance = instances[idx];
          serverGroupOption.instanceId = instance.uid;
          serverGroupOption.instanceName = instance.name + "-";
          for (_k = 0, _len2 = volumeModels.length; _k < _len2; _k++) {
            volume = volumeModels[_k];
            v = volume.generateJSON(idx, serverGroupOption);
            volumes.push(v);
          }
          for (eniIndex = _l = 0, _len3 = eniModels.length; _l < _len3; eniIndex = ++_l) {
            eni = eniModels[eniIndex];
            enis = enis.concat(eni.generateJSON(idx, serverGroupOption, eniIndex));
          }
        }
        _ref1 = instances.concat(volumes).concat(enis);
        for (_m = 0, _len4 = _ref1.length; _m < _len4; _m++) {
          res = _ref1[_m];
          allResourceArray.push({
            component: res
          });
        }
        return allResourceArray;
      }
    }, {
      handleTypes: constant.RESTYPE.INSTANCE,
      getInstanceType: function(ami, region) {
        var data, e;
        if (!ami || !region) {
          return [];
        }
        data = App.model.getOsFamilyConfig(region);
        try {
          data = data[ami.osFamily] || data[constant.OS_TYPE_MAPPING[ami.osType]];
          data = ami.rootDeviceType === "ebs" ? data.ebs : data['instance_store'];
          data = data[ami.architecture];
          data = data[ami.virtualizationType || "paravirtual"];
        } catch (_error) {
          e = _error;
          console.error("Invalid instance type list data", ami, App.model.getOsFamilyConfig(region));
          data = [];
        }
        return data || [];
      },
      getEffectiveId: function(instance_id) {
        var asg, data, design, index, insAndEniAry, instance, member, obj, resource_list, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        design = Design.instance();
        if (design.component(instance_id)) {
          return {
            uid: instance_id,
            mid: null
          };
        }
        insAndEniAry = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
        insAndEniAry = insAndEniAry.concat(Design.modelClassForType(constant.RESTYPE.ENI).allObjects());
        for (_i = 0, _len = insAndEniAry.length; _i < _len; _i++) {
          instance = insAndEniAry[_i];
          if (instance.get("appId") === instance_id) {
            return {
              uid: instance.id,
              mid: "" + instance.id + "_0"
            };
          } else if (instance.groupMembers) {
            _ref = instance.groupMembers();
            for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
              member = _ref[index];
              if (member && member.appId === instance_id) {
                return {
                  uid: instance.id,
                  mid: "" + member.id + "_" + (index + 1)
                };
              }
            }
          }
        }
        resource_list = CloudResources(design.credentialId(), constant.RESTYPE.ASG, design.region());
        _ref1 = Design.modelClassForType(constant.RESTYPE.ASG).allObjects();
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          asg = _ref1[_k];
          data = (_ref2 = resource_list.get(asg.get('appId'))) != null ? _ref2.toJSON() : void 0;
          if (!data || !data.Instances) {
            continue;
          }
          data = data.Instances;
          _ref3 = data.member || data;
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            obj = _ref3[_l];
            if (obj === instance_id || obj.InstanceId === instance_id) {
              return {
                uid: asg.getLc().id,
                mid: instance_id
              };
            }
          }
        }
        return {
          uid: null,
          mid: null
        };
      },
      deserialize: function(data, layout_data, resolve) {
        var KP, attr, eipData, kpUid, m, members, model, rootDevice, _i, _len;
        if (data.serverGroupUid && data.serverGroupUid !== data.uid) {
          members = resolve(data.serverGroupUid).groupMembers();
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            m = members[_i];
            if (m && m.id === data.uid) {
              console.debug("This instance servergroup member has already deserialized", data);
              return;
            }
          }
          if (data.resource.EipResource) {
            eipData = {
              id: data.resource.EipResource.uid,
              allocationId: data.resource.EipResource.resource.AllocationId,
              publicIp: data.resource.EipResource.resource.PublicIp
            };
          }
          members[data.index - 1] = {
            id: data.uid,
            appId: data.resource.InstanceId,
            eipData: eipData || {
              id: MC.guid()
            }
          };
          return;
        }
        rootDevice = data.resource.BlockDeviceMapping[0];
        if (!rootDevice || _.isString(rootDevice)) {
          rootDevice = {
            Ebs: {
              VolumeSize: 0,
              Iops: ""
            }
          };
        }
        if (!(_.isArray(data.state) && data.state.length)) {
          data.state = null;
        }
        attr = {
          id: data.uid,
          name: data.serverGroupName || data.name,
          description: data.description || "",
          appId: data.resource.InstanceId,
          count: data.number,
          imageId: data.resource.ImageId,
          tenancy: data.resource.Placement.Tenancy,
          ebsOptimized: data.resource.EbsOptimized,
          instanceType: data.resource.InstanceType,
          monitoring: data.resource.Monitoring !== "disabled",
          userData: data.resource.UserData.Data || "",
          rdSize: rootDevice.Ebs.VolumeSize,
          rdIops: rootDevice.Ebs.Iops,
          rdType: rootDevice.Ebs.VolumeType,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          state: data.state
        };
        if (data.resource.EipResource) {
          attr.hasEip = true;
          attr.eipData = {
            id: data.resource.EipResource.uid,
            allocationId: data.resource.EipResource.resource.AllocationId
          };
        }
        if (layout_data.osType && layout_data.architecture && layout_data.rootDeviceType) {
          if (layout_data.osType === "win") {
            layout_data.osType = "windows";
          }
          attr.cachedAmi = {
            osType: layout_data.osType,
            architecture: layout_data.architecture,
            rootDeviceType: layout_data.rootDeviceType
          };
        }
        model = new Model(attr);
        kpUid = MC.extractID(data.resource.KeyName);
        if (kpUid && kpUid !== data.resource.KeyName) {
          KP = resolve(kpUid);
        }
        if (KP) {
          KP.assignTo(model);
        } else {
          model.set('keyName', data.resource.KeyName);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
