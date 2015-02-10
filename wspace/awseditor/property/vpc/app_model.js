(function() {
  define(['../base/model', "Design", 'constant', 'CloudResources'], function(PropertyModel, Design, constant, CloudResources) {
    var VPCAppModel;
    VPCAppModel = PropertyModel.extend({
      init: function(vpc_uid) {
        var AclModel, RtbModel, TYPE_ACL, TYPE_RTB, appData, dhcp, dhcpData, i, myVPCComponent, vpc, _ref, _ref1, _ref2, _ref3, _ref4;
        myVPCComponent = Design.instance().component(vpc_uid);
        vpc = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VPC, Design.instance().region()).get(myVPCComponent.get('appId'))) != null ? _ref.attributes : void 0;
        appData = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DHCP, Design.instance().region());
        if (!vpc) {
          return false;
        }
        vpc = $.extend(true, {}, vpc);
        vpc.name = myVPCComponent.get('name');
        vpc.description = myVPCComponent.get('description');
        TYPE_RTB = constant.RESTYPE.RT;
        TYPE_ACL = constant.RESTYPE.ACL;
        RtbModel = Design.modelClassForType(TYPE_RTB);
        AclModel = Design.modelClassForType(TYPE_ACL);
        vpc.mainRTB = RtbModel.getMainRouteTable();
        if (vpc.mainRTB) {
          vpc.mainRTB = vpc.mainRTB.get("appId");
        }
        vpc.defaultACL = AclModel.getDefaultAcl();
        if (vpc.defaultACL) {
          vpc.defaultACL = vpc.defaultACL.get("appId");
        }
        if (vpc.dhcpOptionsId) {
          if (!appData.get(vpc.dhcpOptionsId)) {
            vpc.default_dhcp = true;
          } else {
            dhcpData = (_ref1 = appData.get(myVPCComponent != null ? (_ref2 = myVPCComponent.toJSON().dhcp) != null ? _ref2.toJSON().appId : void 0 : void 0)) != null ? _ref1.attributes : void 0;
            vpc.dhcpOptionsId = myVPCComponent != null ? (_ref3 = myVPCComponent.toJSON().dhcp) != null ? (_ref4 = _ref3.toJSON()) != null ? _ref4.appId : void 0 : void 0 : void 0;
            dhcp = null;
            if (dhcpData) {
              dhcp = {};
              for (i in dhcpData) {
                dhcp[MC.camelCase(i)] = dhcpData[i];
              }
            }
            vpc.dhcp = dhcp;
          }
        }
        this.set(vpc);
        return null;
      }
    });
    return new VPCAppModel();
  });

}).call(this);
