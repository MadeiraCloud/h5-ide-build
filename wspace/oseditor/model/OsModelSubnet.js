(function() {
  define(["GroupModel", "constant"], function(GroupModel, constant) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.OSSUBNET,
      newNameTmpl: "subnet",
      defaults: function() {
        return {
          "public": false,
          cidr: "",
          dhcp: true,
          nameservers: []
        };
      },
      initialize: function(attributes, option) {
        if (option.createByUser) {
          return this.set('cidr', this.generateCidr());
        }
      },
      generateCidr: function() {
        var comp, currentSubnetNum, currentVPCCIDR, maxSubnetNum, resultSubnetNum, subnetCIDR, subnetCIDRAry, subnetCIDRIPAry, subnetCIDRIPStr, subnetCIDRSuffix, vpcCIDRAry, vpcCIDRIPStr, vpcCIDRIPStrAry, vpcCIDRSuffix, _i, _len, _ref;
        currentVPCCIDR = '10.0.0.0/8';
        vpcCIDRAry = currentVPCCIDR.split('/');
        vpcCIDRIPStr = vpcCIDRAry[0];
        vpcCIDRIPStrAry = vpcCIDRIPStr.split('.');
        vpcCIDRSuffix = Number(vpcCIDRAry[1]);
        maxSubnetNum = -1;
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          comp = _ref[_i];
          subnetCIDR = comp.get("cidr");
          subnetCIDRAry = subnetCIDR.split('/');
          subnetCIDRIPStr = subnetCIDRAry[0];
          subnetCIDRSuffix = Number(subnetCIDRAry[1]);
          subnetCIDRIPAry = subnetCIDRIPStr.split('.');
          currentSubnetNum = Number(subnetCIDRIPAry[1]);
          if (maxSubnetNum < currentSubnetNum) {
            maxSubnetNum = currentSubnetNum;
          }
        }
        resultSubnetNum = maxSubnetNum + 1;
        if (resultSubnetNum > 255) {
          return "";
        }
        vpcCIDRIPStrAry[1] = String(resultSubnetNum);
        return vpcCIDRIPStrAry.join('.') + '/16';
      },
      resetAllChildIP: function() {
        var allListenerModels, allPortModels, models;
        allPortModels = Design.modelClassForType(constant.RESTYPE.OSPORT).allObjects();
        allListenerModels = Design.modelClassForType(constant.RESTYPE.OSLISTENER).allObjects();
        models = allPortModels.concat(allListenerModels);
        return _.each(models, function(model) {
          model.assignIP();
          return null;
        });
      },
      serialize: function() {
        return {
          layout: this.generateLayout(),
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              cidr: this.get("cidr"),
              enable_dhcp: this.get("dhcp"),
              dns_nameservers: this.get('nameservers'),
              network_id: this.parent().createRef("id"),
              gateway_ip: "",
              ip_version: "4",
              allocation_pools: {}
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.OSSUBNET,
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.resource.name,
          appId: data.resource.id,
          parent: resolve(MC.extractID(data.resource.network_id)),
          cidr: data.resource.cidr,
          dhcp: data.resource.enable_dhcp,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1],
          nameservers: _.isArray(data.resource.dns_nameservers) ? data.resource.dns_nameservers : []
        });
      }
    });
    return Model;
  });

}).call(this);
