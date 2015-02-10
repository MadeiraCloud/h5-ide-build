(function() {
  define(['../base/model', 'Design', 'CloudResources', 'constant'], function(PropertyModel, Design, CloudResources, constant) {
    var VolumeAppModel, getVolRes;
    getVolRes = function(volComp) {
      var appId, data, deviceName, instanceList, representMember, v, volume, volumeList, _i, _len, _ref, _ref1, _ref2;
      representMember = volComp.get('owner').groupMembers()[0];
      deviceName = volComp.get('name');
      appId = representMember.appId;
      instanceList = CloudResources(Design.instance().credentialId(), constant.RESTYPE.INSTANCE, Design.instance().region());
      volumeList = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VOL, Design.instance().region());
      if (!instanceList) {
        return null;
      }
      data = (_ref = instanceList.get(appId)) != null ? _ref.toJSON() : void 0;
      if (data && data.blockDeviceMapping) {
        _ref1 = data.blockDeviceMapping;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          if (data.rootDeviceName.indexOf(v.deviceName) !== -1) {
            continue;
          }
          volume = (_ref2 = volumeList.get(v.ebs.volumeId)) != null ? _ref2.attributes : void 0;
          if (!volume) {
            continue;
          }
          if (volume.device !== deviceName) {
            continue;
          }
          return volume;
        }
      }
      return null;
    };
    VolumeAppModel = PropertyModel.extend({
      init: function(uid) {
        var appId, myVolumeComponent, volume;
        myVolumeComponent = Design.instance().component(uid);
        if (myVolumeComponent) {
          appId = myVolumeComponent.get("appId");
        } else {
          appId = uid;
        }
        if (!appId && myVolumeComponent.get('owner').type === constant.RESTYPE.LC) {
          volume = getVolRes(myVolumeComponent);
        } else {
          volume = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VOL, Design.instance().region()).get(appId);
          volume = volume.attributes;
        }
        if (volume) {
          if (volume.attachmentSet) {
            volume.name = volume.attachmentSet[0].device;
          }
        } else {
          return false;
        }
        return this.set(volume);
      }
    });
    return new VolumeAppModel();
  });

}).call(this);
