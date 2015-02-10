(function() {
  define(["Design", "constant"], function(Design, constant) {
    var OsDesign;
    OsDesign = Design.extend({
      instancesNoUserData: function() {
        var instanceModels, result;
        result = true;
        instanceModels = Design.modelClassForType(constant.RESTYPE.OSSERVER).allObjects();
        _.each(instanceModels, function(serverModel) {
          result = serverModel.get('userData') ? false : true;
          return null;
        });
        return result;
      }
    });
    return OsDesign;
  });

}).call(this);
