(function() {
  define(['../base/model', 'constant', "../base/main", "CloudResources", "Design", 'i18n!/nls/lang.js'], function(PropertyModel, constant, PropertyModule, CloudResources, Design, lang) {
    var StaticSubModel;
    StaticSubModel = PropertyModel.extend({
      init: function(uid) {
        var InstanceModel, ami, item;
        this.set("isApp", this.isApp);
        InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
        ami = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AMI, Design.instance().region()).get(uid);
        if (ami) {
          ami = ami.toJSON();
          this.set(ami);
          this.set("instance_type", (InstanceModel.getInstanceType(ami, Design.instance().region()) || []).join(", "));
          this.set("ami", true);
          this.set("name", ami.name);
          return;
        } else if (uid.indexOf("ami-") === 0) {
          this.set("ami", {
            unavailable: true
          });
          this.set("name", uid);
          return;
        }
        this.set("name", uid);
        item = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SNAP, Design.instance().region()).get(uid);
        if (!item) {
          return false;
        }
        this.set(item.attributes);
        return true;
      },
      canChangeAmi: function(amiId) {
        var component, instanceType, newAmi, oldAmi;
        component = Design.instance().component(PropertyModule.activeModule().uid);
        oldAmi = component.getAmi() || component.get("cachedAmi");
        newAmi = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AMI, Design.instance().region()).get(amiId);
        if (newAmi) {
          newAmi = newAmi.toJSON();
        }
        if (!oldAmi && !newAmi) {
          return lang.PROP.STATICSUB_VALIDATION_AMI_INFO_MISSING;
        }
        if (oldAmi.osType === "windows" && newAmi.osType !== "windows") {
          return sprintf(lang.PROP.STATICSUB_VALIDATION_AMI_TYPE_NOT_SUPPORT, newAmi.osFamily);
        }
        if (oldAmi.osType !== "windows" && newAmi.osType === "windows") {
          return sprintf(lang.PROP.STATICSUB_VALIDATION_AMI_TYPE_NOT_SUPPORT, newAmi.osFamily);
        }
        instanceType = Design.modelClassForType(constant.RESTYPE.INSTANCE).getInstanceType(newAmi, Design.instance().region());
        if (instanceType.indexOf(component.get("instanceType")) === -1) {
          return sprintf(lang.PROP.STATICSUB_VALIDATION_AMI_INSTANCETYPE_NOT_VALID, newAmi.name, component.get("instanceType"));
        }
        return true;
      },
      getAmiPngName: function(amiId) {
        var ami;
        ami = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AMI, Design.instance().region()).get(amiId);
        if (!ami) {
          return "ami-not-available";
        } else {
          ami = ami.attributes;
          return "" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType;
        }
      },
      getAmiName: function(amiId) {
        var ami;
        ami = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AMI, Design.instance().region()).get(amiId);
        if (ami) {
          return ami.get("name");
        } else {
          return "";
        }
      },
      changeAmi: function(amiId) {
        Design.instance().component(PropertyModule.activeModule().uid).setAmi(amiId);
        this.init(amiId);
        return null;
      },
      getInstanceName: function() {
        return Design.instance().component(PropertyModule.activeModule().uid).get("name");
      }
    });
    return new StaticSubModel();
  });

}).call(this);
