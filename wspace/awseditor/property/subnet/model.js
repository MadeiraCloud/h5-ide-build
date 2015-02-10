(function() {
  define(['../base/model', 'constant', "Design", "CloudResources"], function(PropertyModel, constant, Design, CloudResources) {
    var SubnetModel;
    SubnetModel = PropertyModel.extend({
      defaults: {
        'isAppEdit': false
      },
      init: function(uid) {
        var ACLModel, defaultACL, defaultRT, linkedRT, networkACLs, routeTable, subnet, subnet_acl, subnet_component, _ref;
        subnet_component = Design.instance().component(uid);
        if (!subnet_component) {
          return false;
        }
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        subnet_acl = subnet_component.connectionTargets("AclAsso")[0];
        defaultACL = null;
        networkACLs = [];
        _.each(ACLModel.allObjects(), function(acl) {
          var aclObj;
          aclObj = {
            uid: acl.id,
            name: acl.get("name"),
            isUsed: acl === subnet_acl,
            rule: acl.getRuleCount(),
            association: acl.getAssoCount()
          };
          if (acl.isDefault()) {
            defaultACL = aclObj;
            aclObj.isDefault = true;
          } else {
            networkACLs.splice(_.sortedIndex(networkACLs, aclObj, "name"), 0, aclObj);
          }
          return null;
        });
        if (defaultACL) {
          networkACLs.splice(0, 0, defaultACL);
        }
        this.set({
          uid: uid,
          name: subnet_component.get("name"),
          networkACL: networkACLs,
          isAppEdit: this.isAppEdit,
          description: subnet_component.get("description")
        });
        if (this.isAppEdit) {
          subnet = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SUBNET, Design.instance().region()).get(subnet_component.get('appId'))) != null ? _ref.toJSON() : void 0;
          subnet = _.clone(subnet);
          routeTable = subnet_component.connectionTargets('RTB_Asso')[0];
          linkedRT = routeTable.get('appId');
          if (routeTable.get('main')) {
            defaultRT = routeTable.get('appId');
          }
          subnet.routeTable = linkedRT ? linkedRT : defaultRT;
          this.set(subnet);
        }
        this.getCidr();
        return null;
      },
      getCidr: function() {
        var cidrDivAry, subnet, subnetCidr;
        subnet = Design.instance().component(this.get("uid"));
        subnetCidr = subnet.get("cidr");
        cidrDivAry = this.genCIDRDivAry(subnet.parent().parent().get("cidr"), subnetCidr);
        this.set("CIDRPrefix", cidrDivAry[0]);
        this.set("CIDR", subnetCidr ? cidrDivAry[1] : "");
        return null;
      },
      genCIDRDivAry: function(vpcCIDR, subnetCIDR) {
        var resultPrefix, resultSuffix, subnetAddrAry, subnetIPAry, subnetSuffix, vpcSuffix;
        if (!subnetCIDR) {
          subnetCIDR = vpcCIDR;
        }
        vpcSuffix = Number(vpcCIDR.split('/')[1]);
        subnetIPAry = subnetCIDR.split('/');
        subnetSuffix = Number(subnetIPAry[1]);
        subnetAddrAry = subnetIPAry[0].split('.');
        if (vpcSuffix > 23) {
          resultPrefix = subnetAddrAry[0] + '.' + subnetAddrAry[1] + '.' + subnetAddrAry[2] + '.';
          resultSuffix = subnetAddrAry[3] + '/' + subnetSuffix;
        } else {
          resultPrefix = subnetAddrAry[0] + '.' + subnetAddrAry[1] + '.';
          resultSuffix = subnetAddrAry[2] + '.' + subnetAddrAry[3] + '/' + subnetSuffix;
        }
        return [resultPrefix, resultSuffix];
      },
      createAcl: function() {
        var ACLModel, acl;
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        acl = new ACLModel();
        this.setACL(acl.id);
        return acl.id;
      },
      removeAcl: function(acl_uid) {
        Design.instance().component(acl_uid).remove();
        return null;
      },
      setCidr: function(cidr) {
        return Design.instance().component(this.get("uid")).setCidr(cidr);
      },
      setACL: function(acl_uid) {
        Design.instance().component(this.get("uid")).setAcl(acl_uid);
        return null;
      },
      isValidCidr: function(cidr) {
        return Design.instance().component(this.get("uid")).isValidCidr(cidr);
      }
    });
    return new SubnetModel();
  });

}).call(this);
