(function() {
  define(["ConnectionModel", "constant", "Design"], function(ConnectionModel, constant, Design) {
    return ConnectionModel.extend({
      type: "OsFloatIpUsage",
      constructor: function(p1comp, p2comp, attr, options) {
        var FloatIpModel;
        if (!p2comp && p1comp.type !== constant.RESTYPE.OSFIP) {
          FloatIpModel = Design.modelClassForType(constant.RESTYPE.OSFIP);
          p2comp = new FloatIpModel();
        }
        return ConnectionModel.call(this, p1comp, p2comp, attr, options);
      }
    });
  });

}).call(this);
