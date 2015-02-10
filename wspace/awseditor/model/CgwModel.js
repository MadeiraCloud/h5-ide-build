(function() {
  define(["ComplexResModel", "Design", "constant"], function(ComplexResModel, Design, constant) {
    var Model;
    Model = ComplexResModel.extend({
      defaults: {
        bgpAsn: ""
      },
      newNameTmpl: "customer-gateway-",
      type: constant.RESTYPE.CGW,
      isDynamic: function() {
        return !!this.get("bgpAsn");
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          description: this.get("description") || "",
          type: this.type,
          uid: this.id,
          resource: {
            CustomerGatewayId: this.get("appId"),
            BgpAsn: this.get("bgpAsn"),
            Type: "ipsec.1",
            IpAddress: this.get("ip")
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.CGW,
      deserialize: function(data, layout_data, resolve) {
        return new Model({
          id: data.uid,
          name: data.name,
          description: data.description || "",
          appId: data.resource.CustomerGatewayId,
          bgpAsn: data.resource.BgpAsn,
          ip: data.resource.IpAddress,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
      }
    });
    return Model;
  });

}).call(this);
