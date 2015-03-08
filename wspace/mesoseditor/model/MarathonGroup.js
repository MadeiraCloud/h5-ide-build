(function() {
  define(["constant", "GroupModel", "./MarathonDepIn", "i18n!/nls/lang.js"], function(constant, GroupModel, MarathonDepIn, lang) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.MRTHGROUP,
      newNameTmpl: "group",
      path: function() {
        var path, t;
        path = [];
        t = this;
        while (t) {
          path.unshift(t.get("name"));
          t = t.parent();
        }
        return ("/" + path.join("/")).replace(/\/+/g, "/");
      },
      serialize: function() {
        var apps, ch, component, groups, _i, _len, _ref;
        groups = [];
        apps = [];
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          if (ch.type === constant.RESTYPE.MRTHGROUP) {
            groups.push(ch.id);
          } else {
            apps.push(ch.id);
          }
        }
        component = {
          uid: this.id,
          type: this.type,
          toplevel: !this.parent(),
          resource: {
            id: this.get("name")
          }
        };
        if (groups.length) {
          component.resource.groups = groups;
        }
        if (apps.length) {
          component.resource.apps = apps;
        }
        return {
          component: component,
          layout: this.generateLayout()
        };
      },
      isReparentable: function(newParent) {
        return !(newParent && _.find(newParent.children(), function(r) {
          return r.type === constant.RESTYPE.MRTHAPP;
        }));
      }
    }, {
      handleTypes: constant.RESTYPE.MRTHGROUP,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.id,
          parent: layout_data.groupUId ? resolve(layout_data.groupUId) : null,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
        return null;
      },
      postDeserialize: function(data, layout_data) {
        var dep, _i, _len, _ref;
        _ref = data.resource.dependencies || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dep = _ref[_i];
          new MarathonDepIn(Design.instance().component(data.uid), dep);
        }
      }
    });
    return Model;
  });

}).call(this);
