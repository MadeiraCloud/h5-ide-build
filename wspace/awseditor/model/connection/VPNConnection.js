(function() {
  define(["constant", "ConnectionModel"], function(constant, ConnectionModel) {
    var C;
    C = ConnectionModel.extend({
      type: constant.RESTYPE.VPN,
      defaults: function() {
        return {
          routes: []
        };
      },
      portDefs: {
        port1: {
          name: "vgw-vpn",
          type: constant.RESTYPE.VGW
        },
        port2: {
          name: "cgw-vpn",
          type: constant.RESTYPE.CGW
        }
      },
      serialize: function(component_data) {
        var cgw, routes, vgw;
        vgw = this.getTarget(constant.RESTYPE.VGW);
        cgw = this.getTarget(constant.RESTYPE.CGW);
        if (cgw.isDynamic()) {
          routes = [];
        } else {
          routes = _.map(this.get("routes"), function(r) {
            return {
              DestinationCidrBlock: r
            };
          });
        }
        component_data[this.id] = {
          name: "vpn:" + cgw.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            CustomerGatewayId: cgw.createRef("CustomerGatewayId"),
            Options: {
              StaticRoutesOnly: !cgw.isDynamic()
            },
            Type: "ipsec.1",
            Routes: routes,
            VpnConnectionId: this.get("appId"),
            VpnGatewayId: vgw.createRef("VpnGatewayId")
          }
        };
        return null;
      }
    }, {
      handleTypes: constant.RESTYPE.VPN,
      deserialize: function(data, layout_data, resolve) {
        var cgw, vpn;
        cgw = resolve(MC.extractID(data.resource.CustomerGatewayId));
        vpn = resolve(MC.extractID(data.resource.VpnGatewayId));
        if (!cgw || !vpn) {
          return;
        }
        return new C(cgw, vpn, {
          id: data.uid,
          appId: data.resource.VpnConnectionId,
          routes: _.map(data.resource.Routes, function(r) {
            return r.DestinationCidrBlock;
          })
        });
      }
    });
    return C;
  });

}).call(this);
