(function() {
  define(['../base/model', 'Design', 'constant', "CloudResources"], function(PropertyModel, Design, constant, CloudResources) {
    var VPCModel;
    VPCModel = PropertyModel.extend({
      defaults: {
        'isAppEdit': false
      },
      init: function(uid) {
        var AclModel, RtbModel, TYPE_ACL, TYPE_RTB, component, data, dhcp, dhcp_comp, myVPCComponent, vpc, _ref;
        component = Design.instance().component(uid);
        dhcp_comp = component.get("dhcp");
        dhcp = $.extend({}, dhcp_comp.attributes);
        dhcp.none = dhcp_comp.isAuto();
        dhcp["default"] = dhcp_comp.isDefault();
        dhcp.hasDhcp = (!dhcp.none) && (!dhcp["default"]);
        data = {
          uid: uid,
          dnsSupport: component.get("dnsSupport"),
          dnsHosts: component.get("dnsHostnames"),
          defaultTenancy: component.isDefaultTenancy(),
          name: component.get("name"),
          cidr: component.get("cidr"),
          dhcp: dhcp,
          isAppEdit: this.isAppEdit,
          description: component.get("description")
        };
        if (this.isAppEdit) {
          myVPCComponent = Design.instance().component(uid);
          vpc = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VPC, Design.instance().region()).get(myVPCComponent.get('appId'))) != null ? _ref.toJSON() : void 0;
          vpc = _.clone(vpc);
          TYPE_RTB = constant.RESTYPE.RT;
          TYPE_ACL = constant.RESTYPE.ACL;
          RtbModel = Design.modelClassForType(TYPE_RTB);
          AclModel = Design.modelClassForType(TYPE_ACL);
          vpc.mainRTB = RtbModel.getMainRouteTable();
          if (vpc.mainRTB) {
            vpc.mainRTB = vpc.mainRTB.get("appId");
            vpc.defaultACL = AclModel.getDefaultAcl();
          }
          if (vpc.defaultACL) {
            vpc.defaultACL = vpc.defaultACL.get("appId");
          }
          this.set(vpc);
        }
        this.set(data);
        return null;
      },
      setCidr: function(newCIDR) {
        if (Design.instance().component(this.get("uid")).setCidr(newCIDR)) {
          this.attributes.cidr = newCIDR;
          return true;
        }
        return false;
      },
      setTenancy: function(tenancy) {
        Design.instance().component(this.get("uid")).setTenancy(tenancy);
        return null;
      },
      setDnsSupport: function(enable) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).set("dnsSupport", enable);
        return null;
      },
      setDnsHosts: function(enable) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).set("dnsHostnames", enable);
        return null;
      },
      setAmazonDns: function(enable) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).get("dhcp").set("amazonDNS", enable);
        return null;
      },
      removeDhcp: function(isDefault) {
        var dhcp, uid;
        uid = this.get("uid");
        dhcp = Design.instance().component(uid).get("dhcp");
        if (isDefault) {
          dhcp.setDefault();
        } else {
          dhcp.setAuto();
        }
        return null;
      },
      setDhcp: function(val) {
        var dhcp, uid;
        uid = this.get("uid");
        dhcp = Design.instance().component(uid).get("dhcp");
        dhcp.setDhcp(val);
        return null;
      },
      setDHCPOptions: function(options, force) {
        var dhcp, uid;
        uid = this.get("uid");
        dhcp = Design.instance().component(uid).get("dhcp");
        dhcp.set(options, force);
        return null;
      }
    });
    return new VPCModel();
  });

}).call(this);
