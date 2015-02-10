(function() {
  define(["constant", "ConnectionModel"], function(constant, ConnectionModel) {
    var C;
    C = ConnectionModel.extend({
      type: "RTB_Asso",
      oneToMany: constant.RESTYPE.RT,
      defaults: {
        implicit: false
      },
      portDefs: {
        port1: {
          name: "subnet-assoc-out",
          type: constant.RESTYPE.SUBNET
        },
        port2: {
          name: "rtb-src",
          type: constant.RESTYPE.RT
        }
      },
      serialize: function(components) {
        var rtb, rtb_data, sb;
        if (this.get("implicit")) {
          return;
        }
        sb = this.getTarget(constant.RESTYPE.SUBNET);
        rtb = this.getTarget(constant.RESTYPE.RT);
        rtb_data = components[rtb.id];
        rtb_data.resource.AssociationSet.push({
          SubnetId: sb.createRef("SubnetId"),
          RouteTableAssociationId: this.get("assoId") || "",
          Main: false
        });
        return null;
      },
      remove: function() {
        var RtbModel, newRtb, oldRtb, subnet, subnetRtbAsso;
        subnet = this.getTarget(constant.RESTYPE.SUBNET);
        if (!subnet.isRemoved()) {
          subnetRtbAsso = subnet.connections("RTB_Asso");
          if (subnetRtbAsso.length === 0 || (subnetRtbAsso.length === 1 && subnetRtbAsso[0] === this)) {
            oldRtb = this.getTarget(constant.RESTYPE.RT);
            if (oldRtb.get("main")) {
              this.set("implicit", true);
              return;
            }
            ConnectionModel.prototype.remove.apply(this, arguments);
            RtbModel = Design.modelClassForType(constant.RESTYPE.RT);
            newRtb = RtbModel.getMainRouteTable();
            new C(subnet, newRtb, {
              implicit: true
            });
            return;
          }
        }
        ConnectionModel.prototype.remove.apply(this, arguments);
        return null;
      }
    });
    return C;
  });

}).call(this);
