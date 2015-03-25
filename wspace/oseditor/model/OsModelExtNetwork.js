define(["ComplexResModel", "constant", "CloudResources"], function(ComplexResModel, constant, CloudResources) {
  var Model;
  Model = ComplexResModel.extend({
    type: constant.RESTYPE.OSEXTNET,
    defaults: function() {
      return {
        name: "ext-network"
      };
    },
    isRemovable: function() {
      return false;
    },
    getResourceId: function() {
      var extNetwork;
      if (this.get("appId")) {
        return this.get("appId");
      }
      extNetwork = CloudResources(constant.RESTYPE.OSNETWORK, this.design().region()).getExtNetworks()[0];
      if (extNetwork) {
        return extNetwork.id;
      } else {
        return "";
      }
    },
    serialize: function() {
      return {
        layout: this.generateLayout(),
        component: {
          uid: this.id,
          type: this.type,
          resource: {
            id: this.getResourceId()
          }
        }
      };
    }
  }, {
    handleTypes: constant.RESTYPE.OSEXTNET,
    resolveFirst: true,
    preDeserialize: function(data, layout_data) {
      return new Model({
        id: data.uid,
        x: layout_data.coordinate[0],
        y: layout_data.coordinate[1],
        appId: data.resource.id
      });
    },
    deserialize: function() {}
  });
  return Model;
});
