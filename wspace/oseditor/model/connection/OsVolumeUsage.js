(function() {
  define(["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsVolumeUsage",
      initialize: function() {
        var server, usage, volume, _i, _len, _ref;
        volume = this.getTarget(constant.RESTYPE.OSVOL);
        _ref = volume.connections("OsVolumeUsage");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          usage = _ref[_i];
          if (usage !== this) {
            usage.remove();
          }
        }
        server = this.getTarget(constant.RESTYPE.OSSERVER);
        _.defer(function() {
          if (!server.isRemoved()) {
            return server.trigger("change:volume");
          }
        });
      },
      remove: function(option) {
        ConnectionModel.prototype.remove.call(this, option);
        if (this.getTarget(constant.RESTYPE.OSSERVER).isRemoved()) {
          this.getTarget(constant.RESTYPE.OSVOL).remove();
        } else {
          this.getTarget(constant.RESTYPE.OSSERVER).trigger('change:volume');
        }
      }
    });
  });

}).call(this);
