(function() {
  define(["ConnectionModel", "constant"], function(ConnectionModel, constant) {

    /* Router <=> Subnet */
    return ConnectionModel.extend({
      type: "OsRouterAsso",
      oneToMany: constant.RESTYPE.OSRT,
      portDefs: [
        {
          port1: {
            name: "route",
            type: constant.RESTYPE.OSRT
          },
          port2: {
            name: "route",
            type: constant.RESTYPE.OSSUBNET
          }
        }
      ],
      initialize: function() {
        var rt;
        rt = this.getTarget(constant.RESTYPE.OSRT);
        this.listenTo(rt, "change:extNetworkId", this.onRtPublicityChanged);
        this.getTarget(constant.RESTYPE.OSSUBNET).set("public", rt.isPublic());
      },
      remove: function() {
        var res, subnet;
        subnet = this.getTarget(constant.RESTYPE.OSSUBNET);
        res = ConnectionModel.prototype.remove.apply(this, arguments);
        subnet.set("public", false);
        return res;
      },
      onRtPublicityChanged: function() {
        this.getTarget(constant.RESTYPE.OSSUBNET).set("public", this.getTarget(constant.RESTYPE.OSRT).isPublic());
      }
    });
  });

}).call(this);
