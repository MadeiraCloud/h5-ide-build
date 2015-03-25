define(["ConnectionModel", "constant"], function(ConnectionModel, constant) {
  return ConnectionModel.extend({
    type: "OsPortUsage",
    portDefs: [
      {
        port1: {
          name: "server",
          type: constant.RESTYPE.OSSERVER
        },
        port2: {
          name: "server",
          type: constant.RESTYPE.OSPORT
        }
      }, {
        port1: {
          name: "listener",
          type: constant.RESTYPE.OSLISTENER
        },
        port2: {
          name: "listener",
          type: constant.RESTYPE.OSPORT
        }
      }
    ],
    isVisual: function() {
      var server;
      server = this.getTarget(constant.RESTYPE.OSSERVER);
      return server && server.embedPort() !== this.getTarget(constant.RESTYPE.OSPORT);
    },
    remove: function(option) {
      var port, server;
      ConnectionModel.prototype.remove.call(this, option);
      server = this.getTarget(constant.RESTYPE.OSSERVER);
      port = this.getTarget(constant.RESTYPE.OSPORT);
      if (server.isRemoved() && server.embedPort() === port) {
        port.remove();
      }
    }
  });
});
