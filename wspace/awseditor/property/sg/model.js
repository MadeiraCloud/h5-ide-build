(function() {
  define(['../base/model', "Design", 'constant', "CloudResources"], function(PropertyModel, Design, constant, CloudResources) {
    var SgModel;
    SgModel = PropertyModel.extend({
      init: function(uid) {
        var component, inputReadOnly, members, rule, rules, _i, _len, _ref;
        this.component = component = Design.instance().component(uid);
        if (this.isReadOnly) {
          this.appInit(uid);
          return;
        }
        rules = [];
        _ref = component.connections("SgRuleSet");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          rules = rules.concat(rule.toPlainObjects(uid, true));
        }
        members = _.map(component.getMemberList(), function(tgt) {
          return tgt.get("name");
        });
        this.set({
          uid: uid,
          name: component.get("name"),
          description: component.get("description"),
          members: members,
          rules: rules,
          color: component.color,
          ruleEditable: true
        });
        this.sortSGRule();
        if (component.isElbSg()) {
          inputReadOnly = true;
        } else if (this.isAppEdit) {
          inputReadOnly = component.get("appId");
        }
        if (inputReadOnly || component.isDefault()) {
          this.set('nameReadOnly', true);
          this.set('descReadOnly', true);
        }
        return null;
      },
      setDescription: function(value) {
        Design.instance().component(this.get("uid")).set("description", value);
        return null;
      },
      sortSGRule: function(key) {
        this.attributes.rules = _.sortBy(this.attributes.rules, key || "direction");
        return null;
      },
      addRule: function(rule) {
        var SgRuleSetModel, beforeCount, mySg, rules, sgRuleSet, target, uid, _i, _len, _ref;
        uid = this.get("uid");
        mySg = Design.instance().component(uid);
        if (rule.relation[0] === "@") {
          target = Design.instance().component(rule.relation.substr(1));
        } else {
          target = mySg.createIpTarget(rule.relation);
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        sgRuleSet = new SgRuleSetModel(mySg, target);
        beforeCount = sgRuleSet.ruleCount(mySg.id);
        sgRuleSet.addRawRule(mySg.id, rule.direction, rule);
        if (beforeCount < sgRuleSet.ruleCount(mySg.id)) {
          rules = [];
          _ref = mySg.connections("SgRuleSet");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            rule = _ref[_i];
            rules = rules.concat(rule.toPlainObjects(uid, true));
          }
          this.attributes.rules = rules;
          this.sortSGRule();
          return true;
        } else {
          return false;
        }
      },
      createSGRuleData: function() {
        var sgList;
        sgList = _.map(Design.modelClassForType(constant.RESTYPE.SG).allObjects(), function(sg) {
          return {
            id: sg.id,
            color: sg.color,
            name: sg.get("name")
          };
        });
        return {
          isClassic: false,
          sgList: sgList
        };
      },
      removeRule: function(rule) {
        var sgRuleSet;
        sgRuleSet = Design.instance().component(rule.ruleSetId);
        sgRuleSet.removeRuleByPlainObj(rule);
        return null;
      },
      appInit: function(sg_uid) {
        var currentAppSG, currentRegion, currentSGID, members, rule, rules, sg_app_detail, _i, _len, _ref, _ref1;
        currentRegion = Design.instance().region();
        currentSGID = this.component.get('appId');
        currentAppSG = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SG, currentRegion).get(currentSGID)) != null ? _ref.toJSON() : void 0;
        rules = [];
        _ref1 = this.component.connections("SgRuleSet");
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          rule = _ref1[_i];
          rules = rules.concat(rule.toPlainObjects(sg_uid));
        }
        members = _.map(this.component.connectionTargets("SgAsso"), function(sgTarget) {
          return sgTarget.get('name');
        });
        sg_app_detail = {
          uid: sg_uid,
          name: this.component.get('name'),
          color: this.component.color,
          groupName: currentAppSG.groupName,
          description: currentAppSG.groupDescription,
          groupId: currentAppSG.groupId,
          ownerId: currentAppSG.ownerId,
          vpcId: currentAppSG.vpcId,
          members: members,
          rules: rules
        };
        this.set(sg_app_detail);
        this.sortSGRule();
        return null;
      }
    });
    return new SgModel();
  });

}).call(this);
