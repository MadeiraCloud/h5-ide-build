(function() {
  define(['../base/model', 'constant', 'event', 'i18n!/nls/lang.js'], function(PropertyModel, constant, ide_event, lang) {
    var InstanceModel;
    InstanceModel = PropertyModel.extend({
      init: function(uid) {
        var agentData, attr, component, design, eni, vpc;
        component = Design.instance().component(uid);
        attr = component != null ? component.toJSON() : void 0;
        attr.uid = uid;
        attr.classic_stack = false;
        attr.can_set_ebs = component.isEbsOptimizedEnabled();
        attr.instance_type = component.getInstanceTypeList();
        attr.tenancy = component.isDefaultTenancy();
        attr.displayCount = attr.count - 1;
        attr.description = component.get("description");
        eni = component.getEmbedEni();
        attr.number_disable = eni && eni.connections('RTB_Route').length > 0;
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).allObjects()[0];
        attr.force_tenacy = vpc && !vpc.isDefaultTenancy();
        design = Design.instance();
        agentData = design.get('agent');
        attr.stackAgentEnable = agentData.enabled;
        this.set(attr);
        this.getAmi();
        this.getKeyPair();
        this.getEni();
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
      setCount: function(val) {
        return Design.instance().component(this.get("uid")).setCount(val);
      },
      setEbsOptimized: function(value) {
        return Design.instance().component(this.get("uid")).set("ebsOptimized", value);
      },
      setTenancy: function(value) {
        return Design.instance().component(this.get("uid")).setTenancy(value);
      },
      setMonitoring: function(value) {
        return Design.instance().component(this.get("uid")).set("monitoring", value);
      },
      setUserData: function(value) {
        return Design.instance().component(this.get("uid")).set("userData", value);
      },
      setEniDescription: function(value) {
        return Design.instance().component(this.get("uid")).getEmbedEni().set("description", value);
      },
      setSourceCheck: function(value) {
        return Design.instance().component(this.get("uid")).getEmbedEni().set("sourceDestCheck", value);
      },
      setPublicIp: function(value) {
        Design.instance().component(this.get("uid")).getEmbedEni().set("assoPublicIp", value);
        if (value) {
          return Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
      },
      getAmi: function() {
        var ami, ami_id, comp, data, deviceType, rdEbs, rdName, rootDevice;
        ami_id = this.get("imageId");
        comp = Design.instance().component(this.get("uid"));
        ami = comp.getAmi();
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
              }
              return null;
            });
          }
          deviceType = comp.get("rdType");
          rootDevice = {
            name: rdName,
            size: parseInt(comp.get("rdSize"), 10),
            iops: comp.get("rdIops"),
            encrypted: rdEbs.encrypted,
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
      canSetInstanceType: function(value) {
        var config, eni_number, instance, max_eni_num;
        instance = Design.instance().component(this.get("uid"));
        eni_number = instance.connectionTargets("EniAttachment").length + 1;
        config = instance.getInstanceTypeConfig(value);
        max_eni_num = config ? config.max_eni : 2;
        if (eni_number <= 2 || eni_number <= max_eni_num) {
          return true;
        }
        return sprintf(lang.PROP.WARN_EXCEED_ENI_LIMIT, value, max_eni_num);
      },
      setInstanceType: function(value) {
        var instance;
        instance = Design.instance().component(this.get("uid"));
        instance.setInstanceType(value);
        this.getEni();
        return instance.isEbsOptimizedEnabled();
      },
      getEni: function() {
        var eni, eni_obj, instance;
        instance = Design.instance().component(this.get("uid"));
        eni = instance.getEmbedEni();
        if (!eni) {
          return;
        }
        eni_obj = eni.toJSON();
        eni_obj.ips = eni.getIpArray();
        eni_obj.ips[0].unDeletable = true;
        this.set("eni", eni_obj);
        this.set("multi_enis", instance.connections("EniAttachment").length > 0);
        return null;
      },
      attachEip: function(eip_index, attach) {
        Design.instance().component(this.get("uid")).getEmbedEni().setIp(eip_index, null, null, attach);
        this.attributes.eni.ips[eip_index].hasEip = attach;
        if (attach) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        return null;
      },
      removeIp: function(index) {
        Design.instance().component(this.get("uid")).getEmbedEni().removeIp(index);
        return null;
      },
      addIp: function() {
        var comp, ips;
        comp = Design.instance().component(this.get("uid")).getEmbedEni();
        comp.addIp();
        ips = comp.getIpArray();
        ips[0].unDeletable = true;
        this.get("eni").ips = ips;
        return null;
      },
      isValidIp: function(ip) {
        return Design.instance().component(this.get("uid")).getEmbedEni().isValidIp(ip);
      },
      canAddIP: function() {
        return Design.instance().component(this.get("uid")).getEmbedEni().canAddIp();
      },
      setIp: function(idx, ip, autoAssign) {
        Design.instance().component(this.get("uid")).getEmbedEni().setIp(idx, ip, autoAssign);
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
    return new InstanceModel();
  });

}).call(this);
