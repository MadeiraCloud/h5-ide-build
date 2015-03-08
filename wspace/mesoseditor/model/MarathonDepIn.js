(function() {
  define(["constant", "ConnectionModel", "i18n!/nls/lang.js"], function(constant, ConnectionModel, lang) {
    var C;
    C = ConnectionModel.extend({
      type: "MarathonDepIn",
      directional: true,
      portDefs: [
        {
          port1: {
            name: "app-dep-in",
            type: constant.RESTYPE.MRTHAPP
          },
          port2: {
            name: "group-dep-out",
            type: constant.RESTYPE.MRTHGROUP
          }
        }, {
          port1: {
            name: "app-dep-in",
            type: constant.RESTYPE.MRTHAPP
          },
          port2: {
            name: "app-dep-out",
            type: constant.RESTYPE.MRTHAPP
          }
        }, {
          port1: {
            name: "group-dep-in",
            type: constant.RESTYPE.MRTHGROUP
          },
          port2: {
            name: "group-dep-out",
            type: constant.RESTYPE.MRTHGROUP
          }
        }, {
          port1: {
            name: "group-dep-in",
            type: constant.RESTYPE.MRTHGROUP
          },
          port2: {
            name: "app-dep-out",
            type: constant.RESTYPE.MRTHAPP
          }
        }
      ],
      constructor: function(p1Comp, p2Comp, attr, options) {
        var p2;
        if (_.isString(p2Comp)) {
          p2 = this.resolve(p1Comp, p2Comp);
          if (!p2) {
            console.info("Cannot find dependency `" + p2Comp + "` for", p1Comp);
            return;
          }
          p2Comp = p2;
        }
        return ConnectionModel.call(this, p1Comp, p2Comp, attr, options);
      },
      absolutePath: function(target, relativePath) {
        if (relativePath.indexOf("../") === -1) {
          return relativePath;
        }
        relativePath = relativePath.replace(/\\/g, "\/");
        if (relativePath.indexOf("../") === 0) {
          relativePath = target.path() + "/" + relativePath;
        }
        return relativePath.replace(/\/[^/]+\/\.\./g, "");
      },
      serialize: function(component_data, layout_data) {
        var comp;
        comp = component_data[this.port1Comp().id];
        if (!comp.resource.dependencies) {
          comp.resource.dependencies = [];
        }
        comp.resource.dependencies.push(this.port2Comp().path());
      },
      resolve: function(p1Comp, p2path) {
        var p2Comp;
        p2path = this.absolutePath(p1Comp, p2path);
        p2Comp = null;
        p1Comp.design().eachComponent(function(c) {
          if (c.path() === p2path) {
            p2Comp = c;
            return false;
          }
          return true;
        });
        return p2Comp;
      }
    }, {
      isConnectable: function(p1Comp, p2Comp) {
        var cn, _i, _len, _ref;
        _ref = p1Comp.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.connectsTo(p2Comp.id)) {
            return false;
          }
        }
        return true;
      }
    });
    return C;
  });

}).call(this);
