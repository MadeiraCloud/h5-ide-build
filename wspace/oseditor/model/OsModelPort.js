(function() {
  define(["ComplexResModel", "constant", "Design"], function(ComplexResModel, constant, Design) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.OSPORT,
      newNameTmpl: "port",
      defaults: function() {
        return {
          ip: "",
          macAddress: "",
          deviceIndex: 0
        };
      },
      initialize: function(attributes, option) {
        if (option.createByUser) {
          Design.modelClassForType(constant.RESTYPE.OSSG).attachDefaultSG(this);
          return this.assignIP();
        }
      },
      assignIP: function() {
        var availableIP, parent;
        parent = this.parent();
        if (this.isEmbedded()) {
          parent = this.owner().parent();
        }
        availableIP = Model.getAvailableIP(parent);
        if (availableIP) {
          return this.set('ip', availableIP);
        }
      },
      onParentChanged: function(oldParent) {
        if (oldParent) {
          if (!this.isEmbedded()) {
            return this.assignIP();
          }
        }
      },
      owner: function() {
        return this.connectionTargets("OsPortUsage")[0];
      },
      isAttached: function() {
        return !!this.owner();
      },
      isVisual: function() {
        return !this.isEmbedded();
      },
      isEmbedded: function() {
        if (!this.parent()) {
          return true;
        }
        return this.owner() && this.owner().embedPort() === this;
      },
      setFloatingIp: function(hasFip) {
        var Usage, oldUsage;
        oldUsage = this.connections("OsFloatIpUsage")[0];
        if (!hasFip) {
          if (oldUsage) {
            oldUsage.remove();
          }
        } else {
          if (!oldUsage) {
            Usage = Design.modelClassForType("OsFloatIpUsage");
            new Usage(this);
          }
        }
        (this.isEmbedded() ? this.owner() : this).trigger('change:fip');
      },
      getFloatingIp: function() {
        return this.connectionTargets("OsFloatIpUsage")[0];
      },
      getRouter: function() {
        var context, parent, rt;
        context = this.owner() || this;
        parent = context.parent();
        if (parent) {
          rt = parent.connectionTargets("OsRouterAsso")[0];
        }
        return rt || null;
      },
      serialize: function() {
        var deviceIndex, json, ports, subnet, that;
        if (this.isEmbedded()) {
          subnet = this.owner().parent();
        } else {
          subnet = this.parent();
        }
        that = this;
        deviceIndex = 0;
        if (this.owner() && !this.isEmbedded()) {
          ports = this.owner().connectionTargets("OsPortUsage");
          _.each(ports, function(port, idx) {
            if (that === port) {
              deviceIndex = idx;
            }
            return null;
          });
        }
        json = {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              mac_address: this.get("macAddress"),
              security_groups: this.connectionTargets("OsSgAsso").map(function(sg) {
                return sg.createRef("id");
              }),
              network_id: subnet.parent().createRef("id"),
              device_id: this.owner() ? this.owner().createRef("id") : "",
              device_index: deviceIndex,
              fixed_ips: [
                {
                  subnet_id: subnet.createRef("id"),
                  ip_address: this.get("ip")
                }
              ]
            }
          }
        };
        if (!this.isEmbedded()) {
          json.layout = this.generateLayout();
        }
        return json;
      },
      setIp: function(ip) {
        return this.set("ip", ip);
      }
    }, {
      handleTypes: constant.RESTYPE.OSPORT,
      deserialize: function(data, layout_data, resolve) {
        var SgAsso, port, sg, _i, _len, _ref;
        port = new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          parent: resolve(MC.extractID(data.resource.fixed_ips[0].subnet_id)),
          ip: data.resource.fixed_ips[0].ip_address,
          macAddress: data.resource.mac_address,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        SgAsso = Design.modelClassForType("OsSgAsso");
        _ref = data.resource.security_groups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          new SgAsso(port, resolve(MC.extractID(sg)));
        }
      },
      getAvailableIP: function(subnetModel) {
        var allListenerModels, allPortModels, availableIPAry, filterList, ipObj, models, subnetCIDR;
        subnetCIDR = subnetModel.get('cidr');
        filterList = [];
        allPortModels = Design.modelClassForType(constant.RESTYPE.OSPORT).allObjects();
        allListenerModels = Design.modelClassForType(constant.RESTYPE.OSLISTENER).allObjects();
        models = allPortModels.concat(allListenerModels);
        _.each(models, function(model) {
          var currentSubnetModel;
          if (model.isEmbedded && model.isEmbedded()) {
            currentSubnetModel = model.owner().parent();
          } else {
            currentSubnetModel = model.parent();
          }
          if (currentSubnetModel === subnetModel) {
            filterList.push(model.get('ip'));
          }
          return null;
        });
        availableIPAry = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPInCIDR(subnetCIDR, filterList, 0, [0, 1, 2]);
        if (availableIPAry && availableIPAry[availableIPAry.length - 1]) {
          ipObj = availableIPAry[availableIPAry.length - 1];
          if (ipObj.available) {
            return ipObj.ip;
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
