(function() {
  define(["constant", "GroupModel", "./DhcpModel", "Design"], function(constant, GroupModel, DhcpModel, Design) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.VPC,
      defaults: {
        description: "",
        dnsSupport: true,
        dnsHostnames: false,
        tenancy: "default",
        cidr: "10.0.0.0/16"
      },
      initialize: function() {
        if (!this.attributes.dhcp) {
          this.attributes.dhcp = new DhcpModel();
        }
        return null;
      },
      isRemovable: function() {
        return false;
      },
      isDefaultTenancy: function() {
        return this.get("tenancy") !== "dedicated";
      },
      setTenancy: function(tenancy) {
        var instance, _i, _len, _ref;
        this.set("tenancy", tenancy);
        if (tenancy === "dedicated") {
          _ref = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            instance = _ref[_i];
            instance.setTenancy(tenancy);
          }
        }
        return null;
      },
      setCidr: function(cidr) {
        var SubnetModel, idx, sb, shouldUpdateSubnetCidr, subnetCidrAry, subnets, validCIDR, _i, _len;
        SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
        subnets = SubnetModel.allObjects();
        shouldUpdateSubnetCidr = false;
        subnetCidrAry = _.map(subnets, function(sb) {
          var subnetCidr;
          subnetCidr = sb.get("cidr");
          if (!SubnetModel.isInVPCCIDR(cidr, subnetCidr)) {
            shouldUpdateSubnetCidr = true;
          }
          return subnetCidr;
        });
        if (shouldUpdateSubnetCidr) {
          subnetCidrAry = this.generateSubnetCidr(cidr, subnetCidrAry);
          if (!subnetCidrAry) {
            return false;
          }
          for (idx = _i = 0, _len = subnets.length; _i < _len; idx = ++_i) {
            sb = subnets[idx];
            sb.setCidr(subnetCidrAry[idx]);
          }
        }
        validCIDR = MC.getValidCIDR(cidr);
        this.set("cidr", validCIDR);
        return true;
      },
      generateSubnetCidr: function(newCidr, subnetCidrAry) {
        var SubnetModel, subnets;
        SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
        subnets = SubnetModel.allObjects();
        subnetCidrAry = SubnetModel.autoAssignSimpleCIDR(newCidr, subnetCidrAry, this.get("cidr"));
        if (!subnetCidrAry.length) {
          subnetCidrAry = SubnetModel.autoAssignAllCIDR(newCidr, subnets.length);
        }
        if (subnetCidrAry.length !== subnets.length) {
          return null;
        }
        return subnetCidrAry;
      },
      serialize: function() {
        var component, dhcp, dhcpModel;
        console.assert(this.get("tenancy") === "default" || this.get("tenancy") === "dedicated", "Invalid value for Vpc.attributes.tenancy");
        dhcpModel = this.get("dhcp");
        if (dhcpModel.isAuto()) {
          dhcp = "";
        } else if (dhcpModel.isDefault()) {
          dhcp = "default";
        } else {
          dhcp = dhcpModel.getDhcp();
        }
        component = {
          name: this.get("name"),
          description: this.get("description") || "",
          type: this.type,
          uid: this.id,
          resource: {
            EnableDnsSupport: this.get("dnsSupport"),
            InstanceTenancy: this.get("tenancy"),
            EnableDnsHostnames: this.get("dnsHostnames"),
            DhcpOptionsId: dhcp,
            VpcId: this.get("appId"),
            CidrBlock: this.get("cidr")
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.VPC,
      resolveFirst: true,
      theVPC: function() {
        return Design.instance().classCacheForCid(this.prototype.classId)[0];
      },
      preDeserialize: function(data, layout_data) {
        new Model({
          id: data.uid,
          name: data.name,
          description: data.description || "",
          appId: data.resource.VpcId,
          cidr: data.resource.CidrBlock,
          dnsHostnames: data.resource.EnableDnsHostnames,
          dnsSupport: data.resource.EnableDnsSupport,
          tenancy: data.resource.InstanceTenancy,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
        return null;
      },
      deserialize: function(data, layout, resolve) {
        var dhcp, oldDhcp, vpc;
        vpc = resolve(data.uid);
        dhcp = data.resource.DhcpOptionsId;
        if (dhcp === void 0) {
          vpc.get('dhcp').setAuto();
        } else if (!dhcp) {
          vpc.get("dhcp").setAuto();
        } else if (dhcp === "default") {
          vpc.get("dhcp").setDefault();
        } else if (dhcp[0] === "@") {
          oldDhcp = vpc.get("dhcp");
          if (oldDhcp) {
            oldDhcp.remove();
          }
          vpc.set("dhcp", resolve(MC.extractID(dhcp)));
        } else {
          vpc.get("dhcp").setDhcp(dhcp);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
