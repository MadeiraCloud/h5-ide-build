(function() {
  define(["GroupModel", "constant"], function(GroupModel, constant) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.OSNETWORK,
      newNameTmpl: "network",
      isRemovable: function() {
        return false;
      },
      serialize: function() {
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name")
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSNETWORK,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
      }
    });
    return Model;
  });

}).call(this);
