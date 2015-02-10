(function() {
  define(["constant", "ConnectionModel", "ComplexResModel", "Design"], function(constant, ConnectionModel, ComplexResModel, Design) {
    var C, VpcRouteTarget;
    VpcRouteTarget = ComplexResModel.extend({
      type: "ExternalVpcRouteTarget",
      defaults: {
        targetId: "",
        targetType: ""
      },

      /*
      This model is initialized by a something like:
      {
        GatewayId              : ""
        InstanceId             : ""
        NetworkInterfaceId     : ""
        VpcPeeringConnectionId : ""
      }
      If either of above attributes is reference, make sure the referencing
      component has already been created ( a.k.a can be retrieve by Design.instance().component() )
       */
      constructor: function(attr) {
        var i, id, internalVpcRouteTarget, realAttr, vrt, _i, _j, _len, _len1, _ref, _ref1;
        if (!(attr.GatewayId || attr.InstanceId || attr.NetworkInterfaceId || attr.VpcPeeringConnectionId)) {
          console.error("Invalid attributes for creating Route Target");
          return;
        }
        id = MC.extractID(attr.GatewayId || attr.InstanceId || attr.NetworkInterfaceId);
        if (id) {
          internalVpcRouteTarget = Design.instance().component(id);
          if (internalVpcRouteTarget) {
            return internalVpcRouteTarget;
          }
        }
        _ref = ["GatewayId", "InstanceId", "NetworkInterfaceId", "VpcPeeringConnectionId"];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (attr[i]) {
            realAttr = {
              name: attr[i],
              targetId: attr[i],
              targetType: i
            };
            break;
          }
        }
        if (realAttr) {
          _ref1 = VpcRouteTarget.allObjects();
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            vrt = _ref1[_j];
            if (vrt.get("targetId") === realAttr.targetId && vrt.get("targetType") === realAttr.targetType) {
              return vrt;
            }
          }
          return ComplexResModel.call(this, realAttr);
        }
      }
    });
    C = ConnectionModel.extend({
      type: "RTB_Route",
      isVisual: function() {
        return !this.getTarget("ExternalVpcRouteTarget");
      },
      constructor: function(p1Comp, p2Comp, attr, option) {
        var eniComp, rtbComp;
        if (p1Comp.type === constant.RESTYPE.ENI) {
          eniComp = p1Comp;
          rtbComp = p2Comp;
        } else if (p2Comp.type === constant.RESTYPE.ENI) {
          eniComp = p2Comp;
          rtbComp = p1Comp;
        }
        if (eniComp && eniComp.embedInstance()) {
          p1Comp = eniComp.embedInstance();
          p2Comp = rtbComp;
        }
        return ConnectionModel.call(this, p1Comp, p2Comp, attr, option);
      },
      defaults: function() {
        return {
          routes: []
        };
      },
      initialize: function(attr, option) {
        var igw;
        igw = this.getTarget(constant.RESTYPE.IGW);
        if (igw && option && option.createByUser) {
          this.get("routes").push("0.0.0.0/0");
        }
        return null;
      },
      addRoute: function(route) {
        var idx, routes;
        if (!route) {
          return;
        }
        routes = this.get("routes");
        idx = _.indexOf(routes, route);
        if (idx !== -1) {
          return false;
        }
        routes.push(route);
        this.set("routes", routes);
        return true;
      },
      removeRoute: function(route) {
        var idx, routes;
        if (!route) {
          return;
        }
        routes = this.get("routes");
        idx = _.indexOf(routes, route);
        if (idx !== -1) {
          return false;
        }
        routes.splice(idx, 1);
        this.set("routes", routes);
        return true;
      },
      setPropagate: function(propagate) {
        console.assert((this.port1Comp().type === constant.RESTYPE.VGW) || (this.port2Comp().type === constant.RESTYPE.VGW), "Propagation can only be set to VPN<==>RTB connection.");
        return this.set("propagate", propagate);
      },
      serialize: function(components) {
        var TYPE, d, otherTarget, r, r_temp, rtb, rtb_data, _i, _len, _ref;
        rtb = this.getTarget(constant.RESTYPE.RT);
        otherTarget = this.getOtherTarget(rtb);
        rtb_data = components[rtb.id];
        if (this.get("propagate")) {
          rtb_data.resource.PropagatingVgwSet.push(otherTarget.createRef("VpnGatewayId"));
        }
        r_temp = {
          Origin: "",
          InstanceId: "",
          NetworkInterfaceId: "",
          GatewayId: ""
        };
        TYPE = constant.RESTYPE;
        switch (otherTarget.type) {
          case TYPE.ENI:
            r_temp.NetworkInterfaceId = otherTarget.createRef("NetworkInterfaceId");
            break;
          case TYPE.IGW:
            r_temp.GatewayId = otherTarget.createRef("InternetGatewayId");
            break;
          case TYPE.VGW:
            r_temp.GatewayId = otherTarget.createRef("VpnGatewayId");
            break;
          case TYPE.INSTANCE:
            r_temp.NetworkInterfaceId = otherTarget.getEmbedEni().createRef("NetworkInterfaceId");
            break;
          case "ExternalVpcRouteTarget":
            r_temp[otherTarget.get("targetType")] = otherTarget.get("targetId");
        }
        _ref = this.get("routes");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          d = {
            "DestinationCidrBlock": r
          };
          rtb_data.resource.RouteSet.push($.extend(d, r_temp));
        }
        return null;
      },
      portDefs: [
        {
          port1: {
            name: "igw-tgt",
            type: constant.RESTYPE.IGW
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "instance-rtb",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "eni-rtb",
            type: constant.RESTYPE.ENI
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "vgw-tgt",
            type: constant.RESTYPE.VGW
          },
          port2: {
            name: "rtb-tgt",
            type: constant.RESTYPE.RT
          }
        }, {
          port1: {
            name: "",
            type: constant.RESTYPE.RT
          },
          port2: {
            name: "",
            type: "ExternalVpcRouteTarget"
          }
        }
      ]
    }, {
      isConnectable: function(p1Comp, p2Comp) {
        var instance;
        if (p1Comp.type === constant.RESTYPE.INSTANCE) {
          instance = p1Comp;
        } else if (p2Comp.type === constant.RESTYPE.INSTANCE) {
          instance = p2Comp;
        }
        if (instance && instance.get("count") > 1) {
          return false;
        }
        return true;
      },
      VpcRouteTarget: VpcRouteTarget
    });
    return C;
  });

}).call(this);
