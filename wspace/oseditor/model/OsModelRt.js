(function() {
  define(["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSRT,
      newNameTmpl: "router",
      defaults: {
        nat: false,
        extNetworkId: "",
        publicip: ""
      },
      isPublic: function() {
        return !!this.get("extNetworkId");
      },
      serialize: function() {
        var extNetwork;
        if (this.get("extNetworkId")) {
          extNetwork = {
            network_id: this.get("extNetworkId")
          };
        } else {
          extNetwork = {};
        }
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              nat: this.get("extNetworkId") ? this.get("nat") : false,
              external_gateway_info: extNetwork,
              router_interface: this.connectionTargets("OsRouterAsso").map(function(subnet) {
                return {
                  subnet_id: subnet.createRef("id")
                };
              }),
              public_ip: this.get("publicip")
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSRT,
      deserialize: function(data, layout_data, resolve) {
        var Asso, router, subnet, _i, _len, _ref;
        router = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          nat: data.resource.nat,
          extNetworkId: (data.resource.external_gateway_info || {}).network_id || "",
          publicip: data.resource.public_ip,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        Asso = Design.modelClassForType("OsRouterAsso");
        _ref = data.resource.router_interface;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          new Asso(router, resolve(MC.extractID(subnet.subnet_id)));
        }
      }
    });
    return Model;
  });

}).call(this);
