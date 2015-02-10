(function() {
  define(["ComplexResModel", "constant", "Design", "i18n!/nls/lang.js"], function(ComplexResModel, constant, Design, lang) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSVOL,
      newNameTmpl: "volume",
      defaults: {
        size: 1,
        bootable: false
      },
      constructor: function(attr, option) {
        var owner;
        if (attr.owner) {
          owner = attr.owner;
          delete attr.owner;
        }
        ComplexResModel.call(this, attr, option);
        this.attachTo(owner, attr.mountPoint);
      },
      getOwner: function() {
        return this.connectionTargets("OsVolumeUsage")[0];
      },
      attachTo: function(owner, originMountPoint) {
        var VolumeUsage, mountPoint;
        if (owner) {
          if (!originMountPoint) {
            mountPoint = this.getMountPoint(owner);
          } else {
            mountPoint = originMountPoint;
          }
          if (!mountPoint) {
            return false;
          }
          this.set("mountPoint", mountPoint);
          VolumeUsage = Design.modelClassForType("OsVolumeUsage");
          new VolumeUsage(this, owner);
        }
      },
      getMountPoint: function(owner) {
        var image, mountPoint, volumes;
        image = owner.getImage();
        volumes = owner.volumes();
        if (!image) {
          if (!ami_info) {
            notification("warning", sprintf(lang.NOTIFY.WARN_AMI_NOT_EXIST_TRY_USE_OTHER, imageId), false);
          }
          return null;
        } else {
          console.log(image);
          mountPoint = null;
          if (image.os_distro !== "windows") {
            mountPoint = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
          } else {
            mountPoint = ["f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
          }
          $.each(volumes || [], function(key, value) {
            var index, k;
            if (value.get('mountPoint').slice(0, 5) === "/dev/") {
              k = value.get('mountPoint').slice(-1);
              index = mountPoint.indexOf(k);
              if (index >= 0) {
                return mountPoint.splice(index, 1);
              }
            }
          });
          if (mountPoint.length === 0) {
            notification("warning", lang.NOTIFY.WARN_ATTACH_VOLUME_REACH_INSTANCE_LIMIT, false);
            return null;
          }
          if (image.os_distro !== "windows") {
            mountPoint = "/dev/sd" + mountPoint[0];
          } else {
            mountPoint = "xvd" + mountPoint[0];
          }
          return mountPoint;
        }
      },
      serialize: function() {
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              snapshot_id: this.get("snapshot"),
              size: this.get("size"),
              mount_point: this.get("mountPoint"),
              bootable: this.get("bootable"),
              server_id: this.connectionTargets("OsVolumeUsage")[0].createRef("id"),
              display_description: this.get("description"),
              display_name: this.get("name")
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSVOL,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.display_name,
          appId: data.resource.id,
          snapshot: data.resource.snapshot_id,
          size: data.resource.size,
          mountPoint: data.resource.mount_point,
          bootable: data.resource.bootable,
          owner: resolve(MC.extractID(data.resource.server_id)),
          description: data.resource.display_description
        });
      }
    });
    return Model;
  });

}).call(this);
