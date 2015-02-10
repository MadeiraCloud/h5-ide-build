(function() {
  define(["constant", "ConnectionModel", "Design"], function(constant, ConnectionModel, Design) {
    var SgAsso;
    SgAsso = ConnectionModel.extend({
      type: "SgAsso",
      isVisual: function() {
        return true;
      },
      assignCompsToPorts: function(p1Comp, p2Comp) {
        if (p1Comp.type === constant.RESTYPE.SG) {
          this.__port1Comp = p1Comp;
          this.__port2Comp = p2Comp;
        } else if (p2Comp.type === constant.RESTYPE.SG) {
          this.__port1Comp = p2Comp;
          this.__port2Comp = p1Comp;
        } else {
          return false;
        }
        return true;
      },
      remove: function() {
        var defaultSg, resource;
        ConnectionModel.prototype.remove.apply(this, arguments);
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        if (resource.isRemoved()) {
          return;
        }
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        if (resource.connections("SgAsso").length === 0) {
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          if (defaultSg) {
            new SgAsso(resource, defaultSg);
          }
        }
        return null;
      },
      sortedSgList: function() {
        var resource, sgAssos, sgs;
        resource = this.getOtherTarget(constant.RESTYPE.SG);
        sgAssos = resource.connections("SgAsso");
        sgs = _.map(sgAssos, function(a) {
          return a.getTarget(constant.RESTYPE.SG);
        });
        return sgs.sort(function(a_sg, b_sg) {
          var a_nm, b_nm;
          if (a_sg.isDefault()) {
            return -1;
          }
          if (b_sg.isDefault()) {
            return 1;
          }
          a_nm = a_sg.get("name");
          b_nm = b_sg.get("name");
          if (a_nm < b_nm) {
            return -1;
          }
          if (a_nm === b_nm) {
            return 0;
          }
          if (a_nm > b_nm) {
            return 1;
          }
        });
      }
    });
    return SgAsso;
  });

}).call(this);
