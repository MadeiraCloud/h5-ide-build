(function() {
  define(["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsListenerAsso",
      portDefs: [
        {
          port1: {
            name: "elb",
            type: constant.RESTYPE.OSLISTENER
          },
          port2: {
            name: "elb",
            type: constant.RESTYPE.OSPOOL
          }
        }
      ],
      constructor: function(p1Comp, p2Comp) {
        var asso, reason;
        reason = {
          reason: this
        };
        asso = p1Comp.connections("OsListenerAsso")[0];
        if (asso) {
          asso.remove(reason);
        }
        asso = p2Comp.connections("OsListenerAsso")[0];
        if (asso) {
          asso.remove(reason);
        }
        return ConnectionModel.apply(this, arguments);
      },
      isRemovable: function() {
        return {
          error: 'Listener must keep connected to Pool'
        };
      },
      remove: function(reason) {
        var listener, pool;
        ConnectionModel.prototype.remove.apply(this, arguments);
        if (reason && reason.reason && reason.reason.type === "OsListenerAsso") {
          return;
        }
        listener = this.getTarget(constant.RESTYPE.OSLISTENER);
        pool = this.getTarget(constant.RESTYPE.OSPOOL);
        if (listener.isRemoved() && !pool.isRemoved()) {
          pool.remove();
        }
        if (pool.isRemoved() && !listener.isRemoved()) {
          listener.remove();
        }
      }
    });
  });

}).call(this);
