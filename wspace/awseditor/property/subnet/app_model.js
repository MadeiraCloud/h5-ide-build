(function() {
  define(['../base/model', 'constant', 'Design', 'CloudResources'], function(PropertyModel, constant, Design, CloudResources) {
    var SubnetAppModel;
    SubnetAppModel = PropertyModel.extend({
      init: function(uid) {
        var defaultRT, linkedRT, mySubnetComponent, routeTable, subnet, _ref;
        mySubnetComponent = Design.instance().component(uid);
        subnet = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SUBNET, Design.instance().region()).get(mySubnetComponent.get('appId'))) != null ? _ref.toJSON() : void 0;
        if (!subnet) {
          return false;
        }
        subnet = _.clone(subnet);
        subnet.name = mySubnetComponent.get('name');
        subnet.description = mySubnetComponent.get('description');
        subnet.acl = this.getACL(uid);
        subnet.uid = uid;
        routeTable = mySubnetComponent.connectionTargets('RTB_Asso')[0];
        linkedRT = routeTable.get('appId');
        if (routeTable.get('main')) {
          defaultRT = routeTable.get('appId');
        }
        subnet.routeTable = linkedRT ? linkedRT : defaultRT;
        this.set(subnet);
        return null;
      },
      getACL: function(uid) {
        var acl;
        acl = Design.instance().component(uid).connectionTargets('AclAsso')[0];
        if (!acl) {
          return null;
        }
        return {
          id: acl.id,
          name: acl.get("name"),
          rule: acl.getRuleCount(),
          association: acl.getAssoCount()
        };
      }
    });
    return new SubnetAppModel();
  });

}).call(this);
