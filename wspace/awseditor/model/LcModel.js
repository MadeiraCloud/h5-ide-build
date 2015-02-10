(function() {
  define(["ComplexResModel", "./InstanceModel", "Design", "constant", "./VolumeModel", 'i18n!/nls/lang.js', 'CloudResources'], function(ComplexResModel, InstanceModel, Design, constant, VolumeModel, lang, CloudResources) {
    var Model, emptyArray;
    emptyArray = [];
    Model = ComplexResModel.extend({
      defaults: function() {
        return {
          imageId: "",
          ebsOptimized: false,
          instanceType: "m1.small",
          monitoring: false,
          userData: "",
          publicIp: false,
          state: null,
          rdSize: 0,
          rdIops: "",
          rdType: 'gp2'
        };
      },
      type: constant.RESTYPE.LC,
      newNameTmpl: "launch-config-",
      initialize: function(attr, option) {
        var SgAsso;
        if (option && option.createByUser) {
          this.initInstanceType();
          Design.modelClassForType(constant.RESTYPE.KP).getDefaultKP().assignTo(this);
          SgAsso = Design.modelClassForType("SgAsso");
          new SgAsso(Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg(), this);
        }
        if (!this.get("rdSize")) {
          this.set("rdSize", this.getAmiRootDeviceVolumeSize());
        }
        return null;
      },
      getNewName: function(base) {
        var id, nameMap, newName, resource_list, rl;
        if (!this.newNameTmpl) {
          newName = this.defaults ? this.defaults.name : void 0;
          return newName || "";
        }
        if (base === void 0) {
          base = this.getAllObjects().length;
        }
        nameMap = {};
        this.design().eachComponent(function(comp) {
          if (comp.get("name")) {
            nameMap[comp.get("name")] = true;
          }
          return null;
        });
        if (Design.instance().modeIsAppEdit()) {
          resource_list = CloudResources(this.design().credentialId(), constant.RESTYPE.LC, this.design().region()).toJSON();
          for (id in resource_list) {
            rl = resource_list[id];
            if (rl.LaunchConfigurationName) {
              nameMap[_.first(rl.LaunchConfigurationName.split('---'))] = true;
            }
          }
        }
        while (true) {
          newName = this.newNameTmpl + base;
          if (nameMap[newName]) {
            base += 1;
          } else {
            break;
          }
        }
        return newName;
      },
      isRemovable: function() {
        var state;
        if (this.design().modeIsAppEdit() && this.get("appId")) {
          return {
            error: lang.CANVAS.ERR_DEL_LC
          };
        }
        state = this.get("state");
        if (state && state.length > 0) {
          return MC.template.NodeStateRemoveConfirmation({
            name: this.get("name")
          });
        }
        return true;
      },
      isDefaultTenancy: function() {
        return true;
      },
      groupMembers: function() {
        var amis, i, resource, resource_list, _i, _len, _ref, _ref1;
        resource_list = CloudResources(this.design().credentialId(), constant.RESTYPE.ASG, this.design().region());
        if (!resource_list) {
          return [];
        }
        resource = (_ref = resource_list.get(this.connectionTargets("LcUsage")[0].get("appId"))) != null ? _ref.toJSON() : void 0;
        if (resource && resource.Instances && resource.Instances.length) {
          amis = [];
          _ref1 = resource.Instances;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            i = _ref1[_i];
            amis.push({
              id: i.InstanceId,
              appId: i.InstanceId,
              state: i.HealthStatus
            });
          }
        }
        return amis || [];
      },
      remove: function() {
        var v, _i, _len, _ref;
        _ref = (this.get("volumeList") || emptyArray).slice(0);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          v.remove();
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      getStateData: InstanceModel.prototype.getStateData,
      setStateData: InstanceModel.prototype.setStateData,
      setKey: InstanceModel.prototype.setKey,
      getKeyName: InstanceModel.prototype.getKeyName,
      isDefaultKey: InstanceModel.prototype.isDefaultKey,
      isNoKey: InstanceModel.prototype.isNoKey,
      setAmi: InstanceModel.prototype.setAmi,
      getAmi: InstanceModel.prototype.getAmi,
      getOSFamily: InstanceModel.prototype.getOSFamily,
      setInstanceType: InstanceModel.prototype.setInstanceType,
      initInstanceType: InstanceModel.prototype.initInstanceType,
      isEbsOptimizedEnabled: InstanceModel.prototype.isEbsOptimizedEnabled,
      getBlockDeviceMapping: InstanceModel.prototype.getBlockDeviceMapping,
      getAmiRootDevice: InstanceModel.prototype.getAmiRootDevice,
      getAmiRootDeviceName: InstanceModel.prototype.getAmiRootDeviceName,
      getAmiRootDeviceVolumeSize: InstanceModel.prototype.getAmiRootDeviceVolumeSize,
      getInstanceType: InstanceModel.prototype.getInstanceType,
      getInstanceTypeConfig: InstanceModel.prototype.getInstanceTypeConfig,
      getInstanceTypeList: InstanceModel.prototype.getInstanceTypeList,
      serialize: function() {
        var ami, blockDevice, component, layout, vd, volume, _i, _len, _ref;
        ami = this.getAmi() || this.get("cachedAmi");
        layout = this.generateLayout();
        if (ami) {
          layout.osType = ami.osType;
          layout.architecture = ami.architecture;
          layout.rootDeviceType = ami.rootDeviceType;
        }
        blockDevice = this.getBlockDeviceMapping();
        _ref = this.get("volumeList") || emptyArray;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          volume = _ref[_i];
          vd = {
            DeviceName: volume.get("name"),
            Ebs: {
              VolumeSize: volume.get("volumeSize"),
              VolumeType: volume.get("volumeType")
            }
          };
          if (volume.get("volumeType") === "io1") {
            vd.Ebs.Iops = volume.get("iops");
          }
          if (volume.get("snapshotId")) {
            vd.Ebs.SnapshotId = volume.get("snapshotId");
          }
          blockDevice.push(vd);
        }
        component = {
          type: this.type,
          uid: this.id,
          name: this.get("name"),
          description: this.get("description") || "",
          state: this.get("state"),
          resource: {
            UserData: this.get("userData"),
            LaunchConfigurationARN: this.get("appId"),
            InstanceMonitoring: this.get("monitoring"),
            ImageId: this.get("imageId"),
            KeyName: this.get("keyName"),
            EbsOptimized: this.isEbsOptimizedEnabled() ? this.get("ebsOptimized") : false,
            BlockDeviceMapping: blockDevice,
            SecurityGroups: _.map(this.connectionTargets("SgAsso"), function(sg) {
              return sg.createRef("GroupId");
            }),
            LaunchConfigurationName: this.get("configName") || this.get("name"),
            InstanceType: this.get("instanceType"),
            AssociatePublicIpAddress: this.get("publicIp")
          }
        };
        return {
          component: component,
          layout: layout
        };
      }
    }, {
      handleTypes: constant.RESTYPE.LC,
      resolveFirst: true,
      preDeserialize: function(data, layout_data) {
        var attr;
        if (!(_.isArray(data.state) && data.state.length)) {
          data.state = null;
        }
        attr = {
          id: data.uid,
          name: data.name,
          description: data.description || "",
          state: data.state,
          appId: data.resource.LaunchConfigurationARN,
          imageId: data.resource.ImageId,
          ebsOptimized: data.resource.EbsOptimized,
          instanceType: data.resource.InstanceType,
          monitoring: data.resource.InstanceMonitoring,
          userData: data.resource.UserData,
          publicIp: data.resource.AssociatePublicIpAddress,
          configName: data.resource.LaunchConfigurationName
        };
        if (layout_data.osType && layout_data.architecture && layout_data.rootDeviceType) {
          attr.cachedAmi = {
            osType: layout_data.osType,
            architecture: layout_data.architecture,
            rootDeviceType: layout_data.rootDeviceType
          };
        }
        new Model(attr);
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var KP, SgAsso, model, rd, sg, volume, _attr, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        model = resolve(data.uid);
        rd = model.getAmiRootDevice();
        _ref = data.resource.BlockDeviceMapping || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          volume = _ref[_i];
          if ((rd && volume.DeviceName === rd.DeviceName) || (!rd && ((_ref1 = volume.DeviceName) === '/dev/xvda' || _ref1 === '/dev/sda1'))) {
            model.set("rdSize", volume.Ebs.VolumeSize);
            model.set("rdIops", volume.Ebs.Iops);
            model.set("rdType", volume.Ebs.VolumeType);
          } else {
            if (volume.Ebs) {
              _attr = {
                name: volume.DeviceName,
                snapshotId: volume.Ebs.SnapshotId,
                volumeSize: volume.Ebs.VolumeSize,
                volumeType: volume.Ebs.VolumeType,
                iops: volume.Ebs.Iops,
                owner: model
              };
              new VolumeModel(_attr, {
                noNeedGenName: true
              });
            }
          }
        }
        SgAsso = Design.modelClassForType("SgAsso");
        _ref2 = data.resource.SecurityGroups || [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          sg = _ref2[_j];
          new SgAsso(model, resolve(MC.extractID(sg)));
        }
        KP = resolve(MC.extractID(data.resource.KeyName));
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
