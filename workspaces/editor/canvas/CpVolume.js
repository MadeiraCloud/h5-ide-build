(function() {
  define(["./CanvasPopup", "./TplPopup", "event", "constant"], function(CanvasPopup, TplPopup, ide_event, constant) {
    return CanvasPopup.extend({
      type: "VolumePopup",
      events: {
        "mousedown li": "clickVolume"
      },
      closeOnBlur: true,
      initialize: function() {
        var data, volume, _i, _len, _ref;
        CanvasPopup.prototype.initialize.apply(this, arguments);
        if (this.host) {
          this.listenTo(this.host, "change:volumeList", this.render);
        }
        data = this.models || [];
        if (data[0] && data[0].get) {
          _ref = this.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            volume = _ref[_i];
            this.listenTo(volume, "change:name", this.updateVolume);
            this.listenTo(volume, "change:volumeSize", this.updateVolume);
          }
        }
        if (this.selectAtBegin) {
          this.clickVolume({
            currentTarget: this.$el.find('[data-id=' + this.selectAtBegin.id + ']')[0]
          });
        }
      },
      migrate: function(oldPopup) {
        var id;
        id = oldPopup.$el.find(".selected").attr("data-id");
        this.$el.find('[data-id="' + id + '"]').addClass("selected");
      },
      updateVolume: function(volume) {
        var $vol;
        $vol = this.$el.find('[data-id=' + volume.id + ']');
        $vol.children(".vpp-name").text(volume.get("name"));
        $vol.children(".vpp-size").text(volume.get("volumeSize") + "GB");
      },
      content: function() {
        var data, volume, _i, _len, _ref;
        data = this.models || [];
        if (data[0] && data[0].get) {
          data = [];
          _ref = this.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            volume = _ref[_i];
            data.push({
              id: volume.get("id"),
              name: volume.get("name"),
              size: volume.get("volumeSize"),
              snapshot: volume.get("snapshotId")
            });
          }
        }
        return TplPopup.volume(data);
      },
      clickVolume: function(evt) {
        var $vol, volId;
        $vol = $(evt.currentTarget).addClass("selected");
        volId = $vol.attr("data-id");
        this.canvas.selectVolume(volId);
        if (this.selected) {
          $(this.selected).removeClass("selected");
        }
        this.selected = evt.currentTarget;
        ide_event.trigger(ide_event.OPEN_PROPERTY, constant.RESTYPE.VOL, volId);
        if (evt.which === 1) {
          $vol.dnd(evt, {
            dropTargets: this.canvas.$el,
            dataTransfer: {
              id: volId
            },
            eventPrefix: "addVol_"
          });
        }
        return false;
      },
      remove: function() {
        this.canvas.selectVolume(null);
        CanvasPopup.prototype.remove.call(this);
      }
    });
  });

}).call(this);
