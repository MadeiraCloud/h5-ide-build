(function() {
  define(['../base/model', 'constant', 'i18n!/nls/lang.js', 'Design', 'CloudResources', "ApiRequest"], function(PropertyModel, constant, lang, Design, CloudResources, ApiRequest) {
    var AppInstanceModel;
    AppInstanceModel = PropertyModel.extend({
      defaults: {
        'id': null
      },
      setOsTypeAndLoginCmd: function(appId) {
        var cmd_line, instance_data, instance_state, login_user, os_type, region, _ref, _ref1;
        region = Design.instance().region();
        instance_data = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.INSTANCE, region).get(appId)) != null ? _ref.toJSON() : void 0;
        if (instance_data) {
          os_type = (_ref1 = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AMI, region).get(instance_data.imageId)) != null ? _ref1.toJSON() : void 0;
          if (os_type) {
            os_type = os_type.osType;
          }
        }
        if (!os_type) {
          return;
        }
        if ('win|windows'.indexOf(os_type) > 0) {
          this.set('osType', 'windows');
        } else {
          this.set('osType', os_type);
        }
        if (instance_data) {
          instance_state = instance_data.instanceState.name;
        }
        if (instance_state === 'running') {
          switch (os_type) {
            case 'amazon':
              login_user = 'ec2-user';
              break;
            case 'ubuntu':
              login_user = 'ubuntu';
              break;
            case 'redhat':
              login_user = 'ec2-user';
              break;
            default:
              login_user = 'root';
          }
        }
        cmd_line = sprintf('ssh -i %s.pem %s@%s', instance_data.keyName, login_user, instance_data.publicIpAddress || instance_data.privateIpAddress);
        return this.set('loginCmd', cmd_line);
      },
      init: function(instance_id) {
        var app_data, deviceName, effective, i, instance, monitoringState, myInstanceComponent, rdName, rootDevice, volume, _i, _len, _ref, _ref1, _ref2, _ref3;
        this.set('id', instance_id);
        this.set('uid', instance_id);
        myInstanceComponent = Design.instance().component(instance_id);
        if (myInstanceComponent) {
          instance_id = myInstanceComponent.get('appId');
        } else {
          effective = Design.modelClassForType(constant.RESTYPE.INSTANCE).getEffectiveId(instance_id);
          myInstanceComponent = Design.instance().component(effective.uid);
          this.set('uid', effective.uid);
          this.set('mid', effective.mid);
        }
        if (myInstanceComponent) {
          this.set('description', myInstanceComponent.get("description"));
          this.set('name', myInstanceComponent.get("name"));
        }
        if (!myInstanceComponent) {
          console.warn("instance.app_model.init(): can not find InstanceModel");
        }
        app_data = CloudResources(Design.instance().credentialId(), constant.RESTYPE.INSTANCE, Design.instance().region());
        if (app_data != null ? (_ref = app_data.get(instance_id)) != null ? _ref.toJSON() : void 0 : void 0) {
          instance = $.extend(true, {}, (_ref1 = app_data.get(instance_id)) != null ? _ref1.toJSON() : void 0);
          instance.name = myInstanceComponent ? myInstanceComponent.get('name') : instance_id;
          rdName = myInstanceComponent.getAmiRootDeviceName();
          instance.state = MC.capitalize(instance.instanceState.name);
          instance.blockDevice = "";
          if (instance.blockDeviceMapping && instance.blockDeviceMapping) {
            deviceName = [];
            _ref2 = instance.blockDeviceMapping;
            for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
              i = _ref2[_i];
              deviceName.push(i.deviceName);
              if (rdName === i.deviceName) {
                rootDevice = i;
              }
            }
            instance.blockDevice = deviceName.join(", ");
            if (rootDevice) {
              volume = (_ref3 = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VOL, Design.instance().region()).get(rootDevice.ebs.volumeId)) != null ? _ref3.toJSON() : void 0;
              if (volume) {
                if (volume.attachmentSet) {
                  volume.name = volume.attachmentSet[0].device;
                }
                this.set("rootDevice", volume);
              }
            }
          }
          instance.eni = this.getEniData(instance);
          instance.app_view = false;
          monitoringState = 'disabled';
          if (instance.monitoring && instance.monitoring.state) {
            monitoringState = instance.monitoring.state;
          }
          this.set('monitoringState', monitoringState);
          this.set(instance);
          this.resModel = myInstanceComponent;
          this.setOsTypeAndLoginCmd(instance_id);
        } else {
          return false;
        }
        return null;
      },
      getEniData: function(instance_data) {
        var EniModel, TYPE_ENI, allEni, appData, component, data, eni, i, id, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        if (!instance_data.networkInterfaceSet) {
          return null;
        }
        _ref = instance_data.networkInterfaceSet;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.attachment.deviceIndex === "0") {
            id = i.networkInterfaceId;
            data = i;
            break;
          }
        }
        TYPE_ENI = constant.RESTYPE.ENI;
        if (!id) {
          return null;
        }
        EniModel = Design.modelClassForType(TYPE_ENI);
        allEni = EniModel && EniModel.allObjects() || [];
        for (_j = 0, _len1 = allEni.length; _j < _len1; _j++) {
          eni = allEni[_j];
          if (eni.get('appId' === id)) {
            component = eni;
            break;
          }
        }
        appData = CloudResources(Design.instance().credentialId(), constant.RESTYPE.ENI, Design.instance().region());
        if (!appData.get(id)) {
          data = $.extend(true, {}, data);
        } else {
          data = $.extend(true, {}, (_ref1 = appData.get(id)) != null ? _ref1.toJSON() : void 0);
        }
        data.name = component ? component.get('name') : id;
        if (data.status === "in-use") {
          data.isInUse = true;
        }
        data.sourceDestCheck = data.sourceDestCheck ? "enabled" : "disabled";
        _ref2 = data.privateIpAddressesSet;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          i = _ref2[_k];
          i.primary = i.primary === true;
        }
        return data;
      },
      getPassword: function(key_data) {
        return ApiRequest("ins_GetPasswordData", {
          region: Design.instance().region(),
          instance_id: this.get("instanceId"),
          key_id: Design.instance().credentialId(),
          key_data: key_data || void 0
        }).then(function(data) {
          return data.GetPasswordDataResponse.passwordData;
        });
      },
      getEni: function() {
        var eni, eni_obj, instance;
        instance = Design.instance().component(this.get('uid'));
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
      }
    });
    return new AppInstanceModel();
  });

}).call(this);
