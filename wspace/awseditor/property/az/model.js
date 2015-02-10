(function() {
  define(['../base/model', "Design", 'constant', "CloudResources"], function(PropertyModel, Design, constant, CloudResources) {
    var AZModel;
    AZModel = PropertyModel.extend({
      init: function(id) {
        var AZClass, az, az_list, component, design, possible_list, selectedItemName, used_list, _i, _len;
        design = Design.instance();
        az_list = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AZ, Design.instance().region()).where({
          category: design.get("region")
        });
        component = design.component(id);
        if (!component || !az_list) {
          return false;
        }
        selectedItemName = component.get("name");
        used_list = {};
        AZClass = Design.modelClassForType(constant.RESTYPE.AZ);
        _.each(AZClass.allObjects(), function(element) {
          used_list[element.get("name")] = true;
          return null;
        });
        possible_list = [];
        for (_i = 0, _len = az_list.length; _i < _len; _i++) {
          az = az_list[_i];
          az = az.attributes;
          if (az.id === selectedItemName || !used_list[az.id]) {
            possible_list.push({
              name: az.id,
              selected: az.id === selectedItemName
            });
          }
        }
        this.set({
          uid: id,
          name: selectedItemName,
          list: possible_list
        });
        return null;
      }
    });
    return new AZModel();
  });

}).call(this);
