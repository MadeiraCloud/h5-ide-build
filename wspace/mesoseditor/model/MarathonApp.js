define(["ComplexResModel", "constant", "./MarathonDepIn", "i18n!/nls/lang.js"], function(ComplexResModel, constant, MarathonDepIn, lang) {
  var COLORSET, Model, doRemoveEmptyArray, removeEmptyArray;
  COLORSET = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#f39c12", "#d35400", "#c0392b", "#7f8c8d", "#95a5a6"];
  doRemoveEmptyArray = function(obj) {
    if (!_.isObject(obj)) {
      return;
    }
    return _.each(obj, function(value, key) {
      if (_.isArray(value)) {
        if (!value.length) {
          return delete obj[key];
        }
      } else {
        return doRemoveEmptyArray(value);
      }
    });
  };
  removeEmptyArray = function(obj) {
    var cloneData;
    cloneData = $.extend(true, {}, obj);
    doRemoveEmptyArray(cloneData);
    return cloneData;
  };
  Model = ComplexResModel.extend({
    type: constant.RESTYPE.MRTHAPP,
    newNameTmpl: "app",
    defaults: function() {
      return {
        color: COLORSET[Math.round(Math.random() * COLORSET.length)],
        container: {
          docker: {},
          volumes: []
        },
        cpus: 1.5,
        mem: 256,
        instances: 3,
        constraints: [],
        version: '',
        upgradeStrategy: {
          minimumHealthCapacity: 0.5,
          maximumOverCapacity: 0.2
        }
      };
    },
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
      var component, key, resource, _i, _len, _ref;
      console.log(this.toJSON());
      resource = {
        id: this.get("name"),
        container: this.getContainerJson()
      };
      _ref = ['cpus', 'mem', 'instances', 'cmd', 'args', 'env', 'ports', 'executor', 'uris', 'constraints', 'healthChecks', 'upgradeStrategy'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (this.get(key)) {
          resource[key] = this.get(key);
        }
      }
      component = {
        uid: this.id,
        type: this.type,
        toplevel: !this.parent(),
        color: this.get("color"),
        description: this.get("description"),
        version: this.get("version"),
        resource: removeEmptyArray(resource)
      };
      return {
        component: component,
        layout: this.generateLayout()
      };
    },
    getContainerJson: function() {
      return _.extend({
        type: 'DOCKER'
      }, this.container());
    },
    setDescription: function(description) {
      return this.set("description", description);
    },
    container: function() {
      var c;
      c = this.get('container');
      c.docker.image = this.get('image');
      return c;
    },
    isReparentable: function(newParent) {
      return !(newParent && _.find(newParent.children(), function(r) {
        return r.type === constant.RESTYPE.MRTHGROUP;
      }));
    }
  }, {
    handleTypes: constant.RESTYPE.MRTHAPP,
    deserialize: function(data, layout_data, resolve) {
      var attributes, key, _i, _len, _ref;
      console.log(data);
      attributes = {
        id: data.uid,
        name: data.resource.id,
        parent: layout_data.groupUId ? resolve(layout_data.groupUId) : null,
        description: data.description,
        container: data.resource.container,
        image: data.resource.container.docker.image,
        color: data.color,
        version: data.version || '',
        x: layout_data.coordinate[0],
        y: layout_data.coordinate[1]
      };
      _ref = ['cpus', 'mem', 'instances', 'cmd', 'args', 'env', 'ports', 'executor', 'uris', 'constraints', 'healthChecks', 'upgradeStrategy'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (data.resource[key]) {
          attributes[key] = data.resource[key];
        }
      }
      return new Model(attributes);
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
