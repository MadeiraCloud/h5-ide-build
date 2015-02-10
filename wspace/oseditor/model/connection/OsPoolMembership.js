(function() {
  define(["ConnectionModel", "constant"], function(ConnectionModel, constant) {
    return ConnectionModel.extend({
      type: "OsPoolMembership",
      defaults: function() {
        return {
          port: 80,
          weight: 1,
          appId: ""
        };
      },
      getPort: function() {
        var pool;
        pool = this.getOtherTarget(constant.RESTYPE.OSPOOL);
        if (pool.type === constant.RESTYPE.OSSERVER) {
          pool = pool.embedPort();
        }
        return pool;
      },
      portDefs: [
        {
          port1: {
            name: "pool",
            type: constant.RESTYPE.OSPOOL
          },
          port2: {
            name: "pool",
            type: constant.RESTYPE.OSPORT
          }
        }, {
          port1: {
            name: "pool",
            type: constant.RESTYPE.OSPOOL
          },
          port2: {
            name: "pool",
            type: constant.RESTYPE.OSSERVER
          }
        }
      ],
      constructor: function(p1Comp, p2Comp, attr, option) {
        var pool, port;
        if (p1Comp.type === constant.RESTYPE.OSPORT) {
          port = p1Comp;
          pool = p2Comp;
        } else if (p2Comp.type === constant.RESTYPE.OSPORT) {
          port = p2Comp;
          pool = p1Comp;
        }
        if (port && port.isEmbedded()) {
          p1Comp = port.owner();
          p2Comp = pool;
        }
        return ConnectionModel.call(this, p1Comp, p2Comp, attr, option);
      }
    });
  });

}).call(this);
