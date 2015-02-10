(function() {
  define(["../DesignAws", "constant"], function(Design, constant) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var TYPE, comp, elb, elbs, sg, sgName, sgs, uid, _i, _j, _len, _len1;
      if (version >= "2014-02-11") {
        return;
      }
      TYPE = constant.RESTYPE;
      elbs = [];
      sgs = [];
      for (uid in data) {
        comp = data[uid];
        if (comp.type === TYPE.ELB) {
          elbs.push(comp);
        } else if (comp.type === TYPE.SG) {
          sgs.push(comp);
        }
      }
      for (_i = 0, _len = elbs.length; _i < _len; _i++) {
        elb = elbs[_i];
        sgName = elb.name + "-sg";
        for (_j = 0, _len1 = sgs.length; _j < _len1; _j++) {
          sg = sgs[_j];
          if (sg.name === sgName) {
            sg.name = "elbsg-" + elb.name;
            if (sg.resource.GroupName === sgName) {
              sg.resource.GroupName = sg.name;
            }
            break;
          }
        }
      }
      return null;
    });
    return null;
  });

}).call(this);
