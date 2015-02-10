(function() {
  define(["constant", "ConnectionModel"], function(constant, ConnectionModel) {
    return ConnectionModel.extend({
      type: "DbReplication",
      portDefs: {
        port1: {
          name: "replica",
          type: constant.RESTYPE.DBINSTANCE
        },
        port2: {
          name: "replica",
          type: constant.RESTYPE.DBINSTANCE
        }
      },
      master: function() {
        return this.__port1Comp;
      },
      slave: function() {
        return this.__port2Comp;
      },
      isRemovable: function() {
        return false;
      }
    });
  });

}).call(this);
