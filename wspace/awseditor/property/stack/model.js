(function() {
  define(['../base/model', 'constant', "Design"], function(PropertyModel, constant, Design) {
    var StackModel;
    StackModel = PropertyModel.extend({
      init: function() {
        var agentData, design, vpc;
        design = Design.instance();
        if (!design.get("name")) {
          return null;
        }
        agentData = design.get('agent');
        this.set({
          name: design.get("name").replace(/\s+/g, ''),
          id: design.get("id"),
          usage: design.get("usage"),
          description: design.get('description'),
          type: "EC2 VPC",
          region: constant.REGION_SHORT_LABEL[design.region()],
          isApp: this.isApp,
          isAppEdit: this.isAppEdit,
          isStack: this.isStack,
          isImport: design.modeIsAppView(),
          isResDiff: design.get('resource_diff'),
          opsEnable: agentData.enabled
        });
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        if (vpc) {
          this.set("vpcid", vpc.get("appId"));
        }
        this.getNetworkACL();
        if (this.isStack) {
          this.set('isStack', true);
        }
        this.set(Design.instance().getCost());
        this.set("currency", Design.instance().getCurrency());
        return null;
      },
      createAcl: function() {
        var ACLModel;
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        return (new ACLModel()).id;
      },
      getNetworkACL: function() {
        var ACLModel, defaultACL, networkAcls;
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        networkAcls = [];
        defaultACL = null;
        _.each(ACLModel.allObjects(), (function(_this) {
          return function(acl) {
            var aclObj, deletable;
            deletable = true;
            if (_this.isApp) {
              deletable = false;
            } else if (acl.isDefault()) {
              deletable = false;
            } else if (_this.isAppEdit) {
              deletable = !acl.get("appId");
            }
            aclObj = {
              uid: acl.id,
              name: acl.get("name"),
              rule: acl.getRuleCount(),
              association: acl.getAssoCount(),
              deletable: deletable
            };
            if (acl.isDefault()) {
              defaultACL = aclObj;
            } else {
              networkAcls.splice(_.sortedIndex(networkAcls, aclObj, "name"), 0, aclObj);
            }
            return null;
          };
        })(this));
        if (defaultACL) {
          networkAcls.splice(0, 0, defaultACL);
        }
        this.set("networkAcls", networkAcls);
        return null;
      },
      removeAcl: function(acl_uid) {
        Design.instance().component(acl_uid).remove();
        this.getNetworkACL();
        return null;
      },
      updateStackName: function(name) {
        this.set("name", name);
        Design.instance().set("name", name);
      },
      updateDescription: function(description) {
        this.set("description", description);
        Design.instance().set('description', description);
      }
    });
    return new StackModel();
  });

}).call(this);
