(function() {
  define(['../base/model', 'constant', 'Design', "CloudResources"], function(PropertyModel, constant, Design, CloudResources) {
    var LaunchConfigModel;
    LaunchConfigModel = PropertyModel.extend({
      initialize: function() {
        var me;
        me = this;
        return this.on('EC2_KPDOWNLOAD_RETURN', function(result) {
          var keypairname, region_name;
          region_name = result.param[3];
          keypairname = result.param[4];
          if (me.get("keyName") !== keypairname) {
            return;
          }

          /*
           * The EC2_KPDOWNLOAD_RETURN event won't fire when the result.is_error
           * is true. According to bugs in service models.
           */
          me.trigger("KP_DOWNLOADED", result.resolved_data);
          return null;
        });
      },
      init: function(uid) {
        var agentData, data, design, kp, rootDevice;
        this.lc = Design.instance().component(uid);
        if (!this.lc) {
          return false;
        }
        data = this.lc.toJSON();
        data.uid = uid;
        data.isEditable = this.isAppEdit;
        data.app_view = Design.instance().modeIsAppView();
        this.set(data);
        this.set("displayAssociatePublicIp", true);
        this.set("monitorEnabled", true);
        this.set("can_set_ebs", this.lc.isEbsOptimizedEnabled());
        this.getInstanceType();
        this.getAmi();
        this.getKeyPair();
        design = Design.instance();
        agentData = design.get('agent');
        this.set("stackAgentEnable", agentData.enabled);
        if (this.isApp) {
          this.getAppLaunch(uid);
          kp = this.lc.connectionTargets('KeypairUsage')[0];
          this.set('keyName', kp && kp.get("appId") || this.lc.get('keyName'));
          rootDevice = this.lc.getBlockDeviceMapping();
          if (rootDevice.length === 1) {
            this.set("rootDevice", rootDevice[0]);
          }
          return;
        }
        return null;
      },
      getInstanceType: function(uid, data) {
        var instanceType, region, view_instance_type;
        instanceType = this.lc.get('instanceType');
        region = Design.instance().region();
        view_instance_type = _.map(this.lc.getInstanceType(), function(value) {
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
            selected: instanceType === value
          };
        });
        this.set("instance_type", view_instance_type);
        return null;
      },
      setEbsOptimized: function(value) {
        return this.lc.set('ebsOptimized', value);
      },
      setCloudWatch: function(value) {
        return this.lc.set('monitoring', value);
      },
      setUserData: function(value) {
        return this.lc.set('userData', value);
      },
      setPublicIp: function(value) {
        this.lc.set("publicIp", value);
        if (value) {
          return Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
      },
      setInstanceType: function(value) {
        this.lc.setInstanceType(value);
        return this.lc.isEbsOptimizedEnabled();
      },
      getAmi: function() {
        var ami, ami_id, comp, data, deviceType, rdEbs, rdName, rootDevice;
        ami_id = this.get("imageId");
        comp = Design.instance().component(this.get("uid"));
        ami = this.lc.getAmi();
        if (!ami) {
          data = {
            name: ami_id + " is not available.",
            icon: "ami-not-available.png",
            unavailable: true
          };
        } else {
          data = {
            name: ami.name || ami.description || ami.id,
            icon: ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png"
          };
        }
        this.set('instance_ami', data);
        if (ami && ami.blockDeviceMapping && !$.isEmptyObject(ami.blockDeviceMapping)) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (rdName && !rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                rdName = key;
                return null;
              }
            });
            null;
          }
          deviceType = comp.get("rdType");
          rootDevice = {
            name: rdName,
            size: parseInt(comp.get("rdSize"), 10),
            iops: comp.get("rdIops"),
            isStandard: deviceType === 'standard',
            isIo1: deviceType === 'io1',
            isGp2: deviceType === 'gp2'
          };
          if (rootDevice.size < 10) {
            rootDevice.iops = "";
            rootDevice.iopsDisabled = true;
          }
          this.set("rootDevice", rootDevice);
        }
        this.set("min_volume_size", comp.getAmiRootDeviceVolumeSize());
        return null;
      },
      getKeyPair: function() {
        var selectedKP;
        selectedKP = Design.instance().component(this.get("uid")).connectionTargets("KeypairUsage")[0];
        if (selectedKP) {
          this.set("keypair", selectedKP.getKPList());
        }
        return null;
      },
      addKP: function(kp_name) {
        var KpModel, kp, _i, _len, _ref;
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        _ref = KpModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kp = _ref[_i];
          if (kp.get("name") === kp_name) {
            return false;
          }
        }
        kp = new KpModel({
          name: kp_name
        });
        return kp.id;
      },
      setKP: function(kp_uid) {
        var design, instance;
        design = Design.instance();
        instance = design.component(this.get("uid"));
        design.component(kp_uid).assignTo(instance);
        return null;
      },
      isSGListReadOnly: function() {
        if (this.get('appId')) {
          return true;
        }
      },
      getAppLaunch: function(uid) {
        var lc_data, _ref;
        lc_data = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.LC, Design.instance().region()).get(this.lc.get('appId'))) != null ? _ref.toJSON() : void 0;
        this.set("ebsOptimized", this.lc.get("ebsOptimized") + "");
        this.set('name', this.lc.get('name'));
        this.set('lc', lc_data);
        this.set('uid', uid);
        return null;
      },
      getStateData: function() {
        return Design.instance().component(this.get("uid")).getStateData();
      },
      setIops: function(iops) {
        Design.instance().component(this.get("uid")).set("rdIops", iops);
        return null;
      },
      setVolumeType: function(type) {
        Design.instance().component(this.get("uid")).set("rdType", type);
        return null;
      },
      setVolumeSize: function(size) {
        Design.instance().component(this.get("uid")).set("rdSize", size);
        return null;
      }
    });
    return new LaunchConfigModel();
  });

}).call(this);
