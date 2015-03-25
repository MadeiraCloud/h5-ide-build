define(["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
  var Model;
  Model = ComplexResModel.extend({
    type: constant.RESTYPE.OSPOOL,
    newNameTmpl: "pool",
    defaults: function() {
      return {
        protocol: 'HTTP',
        method: 'ROUND_ROBIN'
      };
    },
    initialize: function(attr, options) {
      var HmModel;
      if (!attr.healthMonitors) {
        HmModel = Design.modelClassForType(constant.RESTYPE.OSHM);
        this.attributes.healthMonitors = [new HmModel()];
      }
      this.listenTo(this, 'change:protocol', function() {
        var _ref;
        return (_ref = this.connectionTargets('OsListenerAsso')[0]) != null ? _ref.set('protocol', this.get('protocol'), {
          silent: true
        }) : void 0;
      });
    },
    ports: function() {
      var p, ports, _i, _len, _ref;
      ports = [];
      _ref = this.connectionTargets("OsPoolMembership");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (p.type === constant.RESTYPE.OSSERVER) {
          ports.push(p.embedPort());
        } else {
          ports.push(p);
        }
      }
      return ports;
    },
    addNewHm: function(name) {
      var MonitorModel, monitor;
      MonitorModel = Design.modelClassForType(constant.RESTYPE.OSHM);
      if (name) {
        monitor = new MonitorModel({
          name: name
        });
      } else {
        monitor = new MonitorModel();
      }
      this.get("healthMonitors").push(monitor);
      return monitor;
    },
    getHm: function(id) {
      var hm, _i, _len, _ref;
      _ref = this.get("healthMonitors");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hm = _ref[_i];
        if (hm.id === id) {
          return hm;
        }
      }
      return null;
    },
    removeHm: function(idOrModel) {
      var h, idx, _i, _len, _ref;
      _ref = this.get("healthMonitors");
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        h = _ref[idx];
        if (h === idOrModel || h.id === idOrModel) {
          this.get("healthMonitors").splice(idx, 1);
          h.remove();
          break;
        }
      }
    },
    remove: function() {
      var hm, _i, _len, _ref;
      _ref = this.get("healthMonitors");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        hm = _ref[_i];
        hm.remove();
      }
      return ComplexResModel.prototype.remove.apply(this, arguments);
    },
    serialize: function() {
      var member;
      member = _.map(this.connections('OsPoolMembership'), function(c) {
        var target;
        target = c.getOtherTarget(constant.RESTYPE.OSPOOL);
        if (target.type === constant.RESTYPE.OSSERVER) {
          target = target.embedPort();
        }
        return {
          protocol_port: c.get('port'),
          address: target.createRef('fixed_ips.0.ip_address'),
          weight: c.get('weight'),
          id: c.get('appId')
        };
      });
      return {
        layout: this.generateLayout(),
        component: {
          name: this.get('name'),
          type: this.type,
          uid: this.id,
          resource: {
            id: this.get('appId'),
            name: this.get('name'),
            description: this.get('description'),
            protocol: this.get('protocol'),
            lb_method: this.get('method'),
            subnet_id: this.parent().createRef('id'),
            healthmonitors: this.get("healthMonitors").map(function(hm) {
              return hm.createRef('id');
            }),
            member: member
          }
        }
      };
    }
  }, {
    handleTypes: constant.RESTYPE.OSPOOL,
    deserialize: function(data, layout_data, resolve) {
      new Model({
        id: data.uid,
        name: data.resource.name,
        description: data.resource.description,
        appId: data.resource.id,
        protocol: data.resource.protocol,
        method: data.resource.lb_method,
        parent: resolve(MC.extractID(data.resource.subnet_id)),
        x: layout_data.coordinate[0],
        y: layout_data.coordinate[1],
        healthMonitors: (data.resource.healthmonitors || []).map(function(hmid) {
          return resolve(MC.extractID(hmid));
        })
      });
    },
    postDeserialize: function(data, layout_data) {
      var Membership, design, member, pool, _i, _len, _ref;
      design = Design.instance();
      pool = design.component(data.uid);
      Membership = Design.modelClassForType("OsPoolMembership");
      _ref = data.resource.member;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        member = _ref[_i];
        new Membership(pool, design.component(MC.extractID(member.address)), {
          appId: member.id,
          weight: member.weight,
          port: member.protocol_port
        });
      }
    }
  });
  return Model;
});
