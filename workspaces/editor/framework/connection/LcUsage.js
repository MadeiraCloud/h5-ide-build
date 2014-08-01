(function() {
  define(["../ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "LcUsage",
      remove: function() {
        var lc;
        lc = this.getTarget(constant.RESTYPE.LC);
        ConnectionModel.prototype.remove.apply(this, arguments);
        if (lc.connections("LcUsage").length === 0) {
          lc.remove();
        }
      }
    });
  });

}).call(this);
