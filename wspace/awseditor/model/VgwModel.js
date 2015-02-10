(function() {
  define(["ComplexResModel", "Design", "constant"], function(ComplexResModel, Design, constant) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        name: "VPN-gateway"
      },
      type: constant.RESTYPE.VGW,
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            Type: "ipsec.1",
            VpnGatewayId: this.get("appId"),
            Attachments: [
              {
                VpcId: this.parent().createRef("VpcId")
              }
            ]
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.VGW,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.name,
          appId: data.resource.VpnGatewayId,
          parent: resolve(MC.extractID(data.resource.Attachments[0].VpcId)),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);
