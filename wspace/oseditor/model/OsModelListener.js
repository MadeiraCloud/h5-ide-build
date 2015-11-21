define(["./OsModelPort", "constant", "Design"], function(OsModelPort, constant, Design) {
  var Model;
  Model = OsModelPort.extend({
    type: constant.RESTYPE.OSLISTENER,
    newNameTmpl: "listener",
    defaults: function() {
      return {
        protocol: 'HTTP',
        port: 80,
        limit: 1000,
        ip: "",
        portId: ""
      };
    },
    initialize: function(attr, options) {
      var Asso;
      if (options.pool) {
        Asso = Design.modelClassForType("OsListenerAsso");
        new Asso(this, options.pool);
      }
      if (options.createByUser) {
        Design.modelClassForType(constant.RESTYPE.OSSG).attachDefaultSG(this);
        this.assignIP();
      }
      this.listenTo(this, 'change:protocol', function() {
        var _ref;
        return (_ref = this.connectionTargets('OsListenerAsso')[0]) != null ? _ref.set('protocol', this.get('protocol'), {
          silent: true
        }) : void 0;
      });
    },
    assignIP: function() {
      var availableIP;
      availableIP = Design.modelClassForType(constant.RESTYPE.OSPORT).getAvailableIP(this.parent());
      if (availableIP) {
        return this.set('ip', availableIP);
      }
    },
    onParentChanged: function(oldParent) {
      if (oldParent) {
        return this.assignIP();
      }
    },
    isAttached: function() {
      return true;
    },
    isVisual: function() {
      return true;
    },
    isEmbedded: function() {
      return false;
    },
    getFloatingIp: function() {
      return this.connectionTargets("OsFloatIpUsage")[0];
    },
    serialize: function() {
      var _ref;
      return {
        layout: this.generateLayout(),
        component: {
          name: this.get('name'),
          type: this.type,
          uid: this.id,
          resource: {
            id: this.get('appId'),
            name: this.get('name'),
            pool_id: ((_ref = this.connectionTargets('OsListenerAsso')[0]) != null ? _ref.createRef('id') : void 0) || '',
            subnet_id: this.parent().createRef('id'),
            connection_limit: this.get('limit'),
            protocol: this.get('protocol'),
            protocol_port: this.get('port'),
            port_id: this.get("portId"),
            address: this.get("ip"),
            security_groups: this.connectionTargets("OsSgAsso").map(function(sg) {
              return sg.createRef("id");
            })
          }
        }
      };
    }
  }, {
    handleTypes: constant.RESTYPE.OSLISTENER,
    deserialize: function(data, layout_data, resolve) {
      var SgAsso, listener, sg, _i, _len, _ref;
      listener = new Model({
        id: data.uid,
        name: data.resource.name,
        appId: data.resource.id,
        limit: data.resource.connection_limit,
        port: data.resource.protocol_port,
        protocol: data.resource.protocol,
        parent: resolve(MC.extractID(data.resource.subnet_id)),
        x: layout_data.coordinate[0],
        y: layout_data.coordinate[1],
        portId: data.resource.port_id,
        ip: data.resource.address
      }, {
        pool: resolve(MC.extractID(data.resource.pool_id))
      });
      SgAsso = Design.modelClassForType("OsSgAsso");
      _ref = data.resource.security_groups || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sg = _ref[_i];
        new SgAsso(listener, resolve(MC.extractID(sg)));
      }
    }
  });
  return Model;
});
