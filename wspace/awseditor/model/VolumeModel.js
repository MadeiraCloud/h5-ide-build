(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["i18n!/nls/lang.js", "ComplexResModel", "constant"], function(lang, ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        name: '',
        owner: null,
        volumeSize: 1,
        snapshotId: '',
        appId: '',
        volumeType: 'gp2',
        iops: '',
        encrypted: false
      },
      type: constant.RESTYPE.VOL,
      constructor: function(attributes, options) {
        var owner;
        owner = attributes.owner;
        delete attributes.owner;
        if (!attributes.name) {
          attributes.name = this.getDeviceName(owner);
        }
        if (attributes.name) {
          ComplexResModel.call(this, attributes);
          this.attachTo(owner, options);
        }
        if (options && options.cloneSource) {
          this.clone(options.cloneSource);
        }
        if (attributes.iops) {
          attributes.volumeType = "io1";
        }
        return null;
      },
      clone: function(srcTarget) {
        this.cloneAttributes(srcTarget, {
          reserve: "owner"
        });
        return null;
      },
      isVisual: function() {
        return false;
      },
      isNameAvailable: function() {
        return true;
      },
      isReparentable: function(newParent) {
        var parent;
        if (this.design().modeIsAppEdit()) {
          parent = this.get("owner");
          if (parent.type !== newParent.type) {
            return false;
          }
          if (!this.get("appId")) {
            return true;
          }
          if (parent.get("count") > 1) {
            return lang.CANVAS.ERR_SERVERGROUP_VOLUME;
          }
          if (newParent.get("count") > 1) {
            return lang.CANVAS.ERR_SERVERGROUP_VOLUME2;
          }
          while (parent && parent.type !== constant.RESTYPE.AZ) {
            parent = parent.parent();
            newParent = newParent.parent();
          }
          if (parent && newParent && parent !== newParent) {
            return lang.IDE.VALIDATION_CANNOT_MOVE_VOLUME_ACROSS_AZ;
          }
        }
        return true;
      },
      groupMembers: function() {
        if (!this.__groupMembers) {
          this.__groupMembers = [];
        }
        return this.__groupMembers;
      },
      isRemovable: function() {
        if (this.design().modeIsAppEdit()) {
          if ((this.get("owner") || {}).type === constant.RESTYPE.LC) {
            return lang.NOTIFY.WARN_OPERATE_NOT_SUPPORT_YET;
          }
        }
        return true;
      },
      remove: function() {
        var vl;
        vl = this.attributes.owner.get("volumeList");
        vl.splice(vl.indexOf(this), 1);
        this.attributes.owner.trigger("change:volumeList");
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      genFullName: function(name) {
        if (this.get('name')[0] !== '/') {
          return 'xvd' + name;
        } else {
          return '/dev/' + name;
        }
      },
      getCost: function(priceMap, currency, force) {
        var count, fee, name, owner, p, standardType, t, volumePrices, _i, _j, _len, _len1, _ref;
        if (!priceMap.ebs) {
          return;
        }
        owner = this.get("owner");
        if (!owner) {
          console.warn("This volume has not attached to any ami, found when calc-ing cost :", this);
          return;
        }
        if (!force && this.get("owner").type !== constant.RESTYPE.INSTANCE) {
          return;
        }
        standardType = this.get("volumeType") === "standard";
        _ref = priceMap.ebs.types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (standardType) {
            if (t.ebsVols) {
              volumePrices = t.ebsVols;
            }
          } else if (t.ebsPIOPSVols) {
            volumePrices = t.ebsPIOPSVols;
          }
        }
        if (!volumePrices) {
          return;
        }
        count = this.get("owner").get("count") || 1;
        name = owner.get("name") + " - " + this.get("name");
        if (count > 1) {
          name += " (x" + count + ")";
        }
        for (_j = 0, _len1 = volumePrices.length; _j < _len1; _j++) {
          p = volumePrices[_j];
          if (p.unit === 'perGBmoProvStorage') {
            fee = p[currency];
            return {
              resource: name,
              type: this.get("volumeSize") + "G",
              fee: fee * this.get("volumeSize") * count,
              formatedFee: fee + "/GB/mo"
            };
          }
        }
        return null;
      },
      attachTo: function(owner, options) {
        var oldOwner, vl, volumeList;
        if (!owner) {
          return false;
        }
        if (owner === this.attributes.owner) {
          return false;
        }
        oldOwner = this.attributes.owner;
        if (oldOwner) {
          vl = oldOwner.get('volumeList');
          vl.splice(vl.indexOf(this), 1);
          oldOwner.trigger("change:volumeList");
        }
        this.attributes.owner = owner;
        if (!(options && options.noNeedGenName)) {
          this.attributes.name = this.getDeviceName(owner);
          if (!this.attributes.name) {
            return false;
          }
        }
        if (!this.isSupportEncrypted()) {
          this.attributes.encrypted = false;
        }
        volumeList = owner.get('volumeList');
        if (volumeList) {
          volumeList.push(this);
        } else {
          owner.set('volumeList', [this]);
        }
        owner.trigger("change:volumeList");
        return true;
      },
      isSupportEncrypted: function() {
        var instanceType, owner, supportEncrypted, supportedEncryptedType;
        supportedEncryptedType = ['m3.medium', 'm3.large', 'm3.xlarge', 'm3.2xlarge', 'c3.large', 'c3.xlarge', 'c3.2xlarge', 'c3.4xlarge', 'c3.8xlarge', 'cr1.8xlarge', 'r3.large', 'r3.xlarge', 'r3.2xlarge', 'r3.4xlarge', 'r3.8xlarge', 'i2.xlarge', 'i2.2xlarge', 'i2.4xlarge', 'i2.8xlarge', 'g2.2xlarge'];
        owner = this.attributes.owner;
        instanceType = owner.get('instanceType');
        supportEncrypted = false;
        if ((__indexOf.call(supportedEncryptedType, instanceType) >= 0)) {
          supportEncrypted = true;
        }
        return supportEncrypted;
      },
      getDeviceName: function(owner) {
        var ami_info, deviceName, imageId, volumeList;
        imageId = owner.get("imageId");
        ami_info = owner.getAmi();
        if (!ami_info) {
          if (!ami_info) {
            notification("warning", sprintf(lang.NOTIFY.WARN_AMI_NOT_EXIST_TRY_USE_OTHER, imageId), false);
          }
          return null;
        } else {
          deviceName = null;
          if (ami_info.osType !== "windows") {
            deviceName = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
          } else {
            deviceName = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
          }
          $.each(ami_info.blockDeviceMapping || [], function(key, value) {
            var index, k;
            if (key.slice(0, 4) === "/dev/") {
              k = key.slice(-1);
              index = deviceName.indexOf(k);
              if (index >= 0) {
                return deviceName.splice(index, 1);
              }
            }
          });
          volumeList = owner.get("volumeList");
          if (volumeList && volumeList.length > 0) {
            $.each(volumeList, function(key, value) {
              var index, k;
              k = value.get("name").slice(-1);
              index = deviceName.indexOf(k);
              if (index >= 0) {
                return deviceName.splice(index, 1);
              }
            });
          }
          if (deviceName.length === 0) {
            notification("warning", lang.NOTIFY.WARN_ATTACH_VOLUME_REACH_INSTANCE_LIMIT, false);
            return null;
          }
          if (ami_info.osType !== "windows") {
            deviceName = "/dev/sd" + deviceName[0];
          } else {
            deviceName = "xvd" + deviceName[0];
          }
          return deviceName;
        }
      },
      ensureEnoughMember: function() {
        var totalCount;
        if (!this.get("owner")) {
          return;
        }
        totalCount = this.get("owner").get("count");
        if (!totalCount) {
          return;
        }
        totalCount -= 1;
        while (this.groupMembers().length < totalCount) {
          this.groupMembers().push({
            id: MC.guid(),
            appId: ""
          });
        }
        return null;
      },
      generateJSON: function(index, serverGroupOption) {
        var appId, instanceId, member, owner, uid, volumeName;
        console.assert(!serverGroupOption || serverGroupOption.instanceId !== void 0, "Invalid serverGroupOption");
        this.ensureEnoughMember();
        volumeName = (serverGroupOption.instanceName || "") + this.get("name");
        appId = "";
        if (index > 0) {
          member = this.groupMembers()[index - 1];
          uid = member.id;
          appId = member.appId;
        } else {
          uid = this.id;
          appId = this.get("appId");
        }
        instanceId = this.createRef("InstanceId", serverGroupOption.instanceId);
        owner = this.get("owner");
        return {
          uid: uid,
          type: this.type,
          name: volumeName,
          serverGroupUid: this.id,
          serverGroupName: this.get("name"),
          index: index,
          number: serverGroupOption.number || 1,
          resource: {
            VolumeId: appId,
            Size: this.get("volumeSize"),
            SnapshotId: this.get("snapshotId"),
            Iops: this.get("iops"),
            VolumeType: this.get("volumeType"),
            AvailabilityZone: owner ? owner.getAvailabilityZone().createRef() : "",
            AttachmentSet: {
              InstanceId: instanceId,
              Device: this.get("name")
            },
            Encrypted: this.get("encrypted")
          }
        };
      },
      serialize: function() {
        if (this.get("owner")) {
          return;
        }
        return {
          component: this.generateJSON(0, {
            number: 1
          })
        };
      }
    }, {
      handleTypes: constant.RESTYPE.VOL,
      deserialize: function(data, layout_data, resolve) {
        var attachment, attr, instance, m, members, model, _i, _len;
        if (data.serverGroupUid && data.serverGroupUid !== data.uid) {
          members = resolve(data.serverGroupUid).groupMembers();
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            m = members[_i];
            if (m && m.id === data.uid) {
              console.debug("This volume servergroup member has already deserialized", data);
              return;
            }
          }
          members[data.index - 1] = {
            id: data.uid,
            appId: data.resource.VolumeId
          };
          return;
        }
        if (data.resource.AttachmentSet) {
          attachment = data.resource.AttachmentSet;
          instance = attachment && attachment.InstanceId ? resolve(MC.extractID(attachment.InstanceId)) : null;
        } else {
          console.error("deserialize failed");
          return null;
        }
        if (!instance || instance.getAmiRootDeviceName() === attachment.Device) {
          return null;
        }
        attr = {
          id: data.uid,
          name: data.serverGroupName || data.name,
          owner: instance,
          volumeSize: data.resource.Size,
          snapshotId: data.resource.SnapshotId,
          volumeType: data.resource.VolumeType,
          iops: data.resource.Iops,
          appId: data.resource.VolumeId,
          encrypted: data.resource.Encrypted
        };
        model = new Model(attr, {
          noNeedGenName: true
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);
