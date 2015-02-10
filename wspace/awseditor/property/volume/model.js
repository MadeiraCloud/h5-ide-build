(function() {
  define(['../base/model', 'constant', 'Design', "CloudResources"], function(PropertyModel, constant, Design, CloudResources) {
    var VolumeModel;
    VolumeModel = PropertyModel.extend({
      init: function(uid) {
        var component, displayEncrypted, isEncrypted, res, snapshot, supportEncrypted, volume_detail, _ref;
        component = Design.instance().component(uid);
        res = component.attributes;
        if (!res.owner) {
          console.error("[volume property] can not found owner of volume!");
          return false;
        }
        supportEncrypted = component.isSupportEncrypted();
        displayEncrypted = true;
        if (!supportEncrypted) {
          displayEncrypted = false;
        }
        if (res.snapshotId) {
          supportEncrypted = false;
        }
        if (component.get('owner').type === constant.RESTYPE.LC) {
          displayEncrypted = false;
        }
        isEncrypted = false;
        if (supportEncrypted) {
          isEncrypted = ((_ref = res.encrypted) === 'true' || _ref === true);
        }
        volume_detail = {
          isWin: res.name[0] !== '/',
          isStandard: res.volumeType === 'standard',
          isIo1: res.volumeType === 'io1',
          isGp2: res.volumeType === 'gp2',
          iops: res.iops,
          volume_size: res.volumeSize,
          snapshot_id: res.snapshotId,
          name: res.name,
          displayEncrypted: displayEncrypted,
          support_encrypted: supportEncrypted,
          encrypted: isEncrypted
        };
        if (volume_detail.isWin) {
          volume_detail.editName = volume_detail.name.slice(-1);
        } else {
          volume_detail.editName = volume_detail.name.slice(5);
        }
        if (volume_detail.snapshot_id) {
          snapshot = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SNAP, Design.instance().region()).get(volume_detail.snapshot_id);
          if (snapshot) {
            volume_detail.snapshot_size = snapshot.get('volumeSize');
            volume_detail.snapshot_desc = snapshot.get('description');
          }
        }
        if (volume_detail.volume_size < 10) {
          volume_detail.iopsDisabled = true;
        }
        this.set('volume_detail', volume_detail);
        this.set('uid', uid);
        return null;
      },
      setDeviceName: function(name) {
        var allVolume, device_name, lc, lcUid, newDeviceName, newId, realuid, uid, v, volume, volumeModel, _i, _len;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        if (!volume) {
          realuid = uid.split('_');
          device_name = realuid[2];
          lcUid = realuid[0];
          lc = Design.instance().component(lcUid);
          volumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
          allVolume = volumeModel && volumeModel.allObjects() || [];
          for (_i = 0, _len = allVolume.length; _i < _len; _i++) {
            v = allVolume[_i];
            if (v.get('owner') === lc) {
              if (v.get('name') === device_name) {
                newDeviceName = volume.genFullName(name);
                newId = "" + realuid + "_volume_" + name;
                v.set('name', newDeviceName);
                this.attributes.volume_detail.name = newDeviceName;
                this.attributes.volume_detail.editName = name;
                this.set('uid', newId);
                break;
              }
            }
          }
        } else {
          newDeviceName = volume.genFullName(name);
          volume.set('name', newDeviceName);
          this.attributes.volume_detail.name = newDeviceName;
        }
        return null;
      },
      setVolumeSize: function(value) {
        var allVolume, device_name, lc, lcUid, realuid, uid, v, volume, volumeModel, _i, _len;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        if (!volume) {
          realuid = uid.split('_');
          device_name = realuid[2];
          lcUid = realuid[0];
          lc = Design.instance().component(lcUid);
          volumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
          allVolume = volumeModel && volumeModel.allObjects() || [];
          for (_i = 0, _len = allVolume.length; _i < _len; _i++) {
            v = allVolume[_i];
            if (v.get('owner') === lc) {
              if (v.get('name') === device_name) {
                v.set('volumeSize', value);
                break;
              }
            }
          }
        } else {
          volume.set('volumeSize', value);
        }
        return null;
      },
      setVolumeType: function(type, iops) {
        var volume;
        volume = Design.instance().component(this.get("uid"));
        volume.set({
          'volumeType': type,
          'iops': iops
        });
        return null;
      },
      setEncrypted: function(value) {
        var uid, volume;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        if (!volume) {

        } else {
          volume.set('encrypted', value);
        }
        return null;
      },
      genFullName: function(name) {
        if (comp.name[0] !== '/') {
          if (comp.name === "xvd" + name) {
            return true;
          }
        } else if (comp.name.indexOf(name) !== -1) {
          return true;
        }
      },
      isDuplicate: function(name) {
        var allVolume, device_name, lc, lcUid, realuid, uid, v, volume, volumeModel, _i, _len;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        volumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
        allVolume = volumeModel && volumeModel.allObjects() || [];
        if (!volume) {
          realuid = uid.split('_');
          device_name = realuid[2];
          lcUid = realuid[0];
          lc = Design.instance().component(lcUid);
          for (_i = 0, _len = allVolume.length; _i < _len; _i++) {
            v = allVolume[_i];
            if (v.get('owner') === lc) {
              volume = v;
              break;
            }
          }
        }
        return _.some(allVolume, function(v) {
          var fullName;
          fullName = v.genFullName(name);
          if (v !== volume && v.get('name') === fullName) {
            return true;
          }
        });
      }
    });
    return new VolumeModel();
  });

}).call(this);
