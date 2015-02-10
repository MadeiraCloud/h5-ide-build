(function() {
  define(["../DesignOs", "constant"], function(Design, constant) {
    Design.registerSerializeVisitor(function(components, layouts, options) {
      var comp, member, rule, uid, _i, _j, _len, _len1, _ref, _ref1;
      if (!options || !options.toStack) {
        return;
      }
      for (uid in components) {
        comp = components[uid];
        if (comp.resource.hasOwnProperty("id")) {
          comp.resource.id = "";
        }
        switch (comp.type) {
          case constant.RESTYPE.OSPOOL:
            _ref = comp.resource.member || [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              member = _ref[_i];
              member.id = "";
            }
            break;
          case constant.RESTYPE.OSSG:
            _ref1 = comp.resource.rules || [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              rule = _ref1[_j];
              rule.id = "";
            }
            break;
          case constant.RESTYPE.OSLISTENER:
            comp.resource.port_id = "";
            break;
          case constant.RESTYPE.OSFIP:
            comp.resource.floating_ip_address = "";
            break;
          case constant.RESTYPE.OSRT:
            comp.resource.public_ip = "";
        }
      }
    });
  });

}).call(this);
