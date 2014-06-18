(function() {
  define(["constant", "../ConnectionModel", "../ComplexResModel", "i18n!nls/lang.js"], function(constant, ConnectionModel, ComplexResModel, lang) {
    return ConnectionModel.extend({
      offset: {
        x: 2,
        y: 3
      },
      type: "Lc_Asso",
      ceType: "Lc_Asso",
      node_line: false,
      oneToMany: constant.RESTYPE.LC,
      defaults: {
        x: 0,
        y: 0,
        width: 9,
        height: 9
      },
      isVisual: function() {
        return true;
      },
      remove: function() {
        var lc;
        lc = this.getLc();
        ConnectionModel.prototype.remove.call(this);
        if (lc.getUsage().length === 0) {
          lc.remove();
        }
        return null;
      },
      initialize: function(attr, option) {
        return this.draw(true);
      },
      x: function() {
        return this.getAsg().x() + this.offset.x || 0;
      },
      y: function() {
        return this.getAsg().y() + this.offset.y || 0;
      },
      width: function() {
        return this.attributes.width || 0;
      },
      height: function() {
        return this.attributes.height || 0;
      },
      getLc: function() {
        return this.getTarget(constant.RESTYPE.LC);
      },
      getAsg: function() {
        return this.getTarget(constant.RESTYPE.ASG);
      },
      getConnTarget: function(typeOrModel) {
        var type;
        type = _.isObject(typeOrModel) ? typeOrModel.type : typeOrModel;
        if (type === 'SgAsso') {
          return this.getLc();
        }
        return this;
      },
      parent: function() {
        return this.getAsg();
      },
      connections: function(type) {
        return ComplexResModel.prototype.connections.apply(this.getConnTarget(type), arguments);
      },
      connectionTargets: function(type) {
        return ComplexResModel.prototype.connectionTargets.apply(this.getConnTarget(type), arguments);
      },
      connect_base: function(cn) {
        return ComplexResModel.prototype.connectionTargets.apply(this.getConnTarget(cn), arguments);
      },
      disconnect_base: function(cn) {
        return ComplexResModel.prototype.connectionTargets.apply(this.getConnTarget(cn), arguments);
      },
      attach_connection: function(cn) {
        return ComplexResModel.prototype.connectionTargets.apply(this.getConnTarget(cn), arguments);
      }
    });
  });

}).call(this);
