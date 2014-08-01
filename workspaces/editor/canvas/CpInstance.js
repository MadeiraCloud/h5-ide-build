(function() {
  define(["./CanvasPopup", "./TplPopup", "./CpVolume", "event", "constant", "CloudResources"], function(CanvasPopup, TplPopup, VolumePopup, ide_event, constant, CloudResources) {
    return CanvasPopup.extend({
      type: "InstancePopup",
      attachType: "overlay",
      className: "canvas-pp instance",
      events: {
        "click .instance-pph-close": "remove",
        "click li": "selectItem",
        "click .vpp-ins-vol": "showVolume"
      },
      initialize: function() {
        CanvasPopup.prototype.initialize.apply(this, arguments);
        this.selectItem({
          currentTarget: this.$el.find("li")[0]
        });
      },
      content: function() {
        return TplPopup.instance({
          name: this.host.get("name"),
          items: this.models || []
        });
      },
      selectItem: function(evt) {
        this.canvas.deselectItem(true);
        this.$el.find(".selected").removeClass("selected");
        ide_event.trigger(ide_event.OPEN_PROPERTY, this.host.type, $(evt.currentTarget).addClass("selected").attr("data-id"));
        return false;
      },
      remove: function() {
        if (this.volPopup) {
          this.volPopup.remove();
        }
        return CanvasPopup.prototype.remove.apply(this, arguments);
      },
      showVolume: function(evt) {
        var $ins, bdm, ins, region, vol, volCln, vols, volumeId, _i, _len, _ref, _ref1;
        region = this.canvas.design.region();
        $ins = $(evt.currentTarget).closest(".vpp-instance");
        ins = CloudResources(constant.RESTYPE.INSTANCE, region).get($ins.attr("data-id"));
        if (!ins) {
          return;
        }
        ins = ins.attributes;
        volCln = CloudResources(constant.RESTYPE.VOL, region);
        vols = [];
        _ref = ins.blockDeviceMapping;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bdm = _ref[_i];
          if (bdm.deviceName !== ins.rootDeviceName) {
            volumeId = (_ref1 = bdm.ebs) != null ? _ref1.volumeId : void 0;
            if (!volumeId) {
              continue;
            }
            vol = volCln.get(volumeId);
            if (!vol) {
              continue;
            }
            vols.push({
              id: vol.id,
              name: bdm.deviceName,
              snapshot: vol.get("snapshotId"),
              size: vol.get("size")
            });
          }
        }
        this.volPopup = new VolumePopup({
          attachment: $ins[0],
          models: vols,
          canvas: this.canvas
        });
        return false;
      }
    });
  });

}).call(this);
