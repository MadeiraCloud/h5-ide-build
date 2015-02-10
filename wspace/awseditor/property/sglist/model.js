(function() {
  define(["Design", "constant"], function(Design, constant) {
    var SGListModel;
    SGListModel = Backbone.Model.extend({
      getSGInfoList: function() {
        var SgAssoModel, SgRuleSetModel, asso, assos, deletable, design, enabledSG, enabledSGArr, isELBParent, isStackParent, needShow, parent_model, readonly, resource, resource_id, ruleSets, ruleset, sg, sgChecked, sgRuleAry, sg_list, usedSG, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
        design = Design.instance();
        parent_model = this.parent_model;
        readonly = false;
        if (design.modeIsApp() || design.modeIsAppView()) {
          readonly = true;
        } else if (design.modeIsAppEdit()) {
          if (parent_model.isSGListReadOnly) {
            readonly = parent_model.isSGListReadOnly();
          }
        }
        resource_id = this.resId;
        resource = design.component(resource_id);
        if (resource) {
          isELBParent = resource.type === constant.RESTYPE.ELB;
          isStackParent = false;
          resource_id = resource.id;
        } else {
          isELBParent = false;
          isStackParent = true;
          resource_id = "";
        }
        sg_list = [];
        enabledSG = {};
        enabledSGArr = [];
        SgAssoModel = Design.modelClassForType("SgAsso");
        _ref = Design.modelClassForType(constant.RESTYPE.SG).allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          if (sg.isElbSg() && !(isELBParent || isStackParent)) {
            continue;
          }
          sgChecked = !!SgAssoModel.findExisting(sg, resource);
          needShow = isStackParent || (!readonly) || sgChecked;
          if (!needShow) {
            continue;
          }
          if (sg.isDefault() || readonly) {
            deletable = false;
          } else {
            deletable = true;
          }
          assos = sg.connections("SgAsso");
          for (_j = 0, _len1 = assos.length; _j < _len1; _j++) {
            asso = assos[_j];
            if (asso.connectsTo(resource_id)) {
              enabledSG[sg.id] = true;
              enabledSGArr.push(sg);
              break;
            }
          }
          sg_list.push({
            uid: sg.id,
            color: sg.color,
            name: sg.get("name"),
            desc: sg.get("description"),
            ruleCount: sg.ruleCount(),
            memberCount: sg.getMemberList().length,
            hideCheck: readonly || isStackParent,
            deletable: deletable,
            used: enabledSG[sg.id]
          });
        }
        sgRuleAry = [];
        for (_k = 0, _len2 = enabledSGArr.length; _k < _len2; _k++) {
          usedSG = enabledSGArr[_k];
          ruleSets = usedSG.connections("SgRuleSet");
          for (_l = 0, _len3 = ruleSets.length; _l < _len3; _l++) {
            ruleset = ruleSets[_l];
            sgRuleAry = sgRuleAry.concat(ruleset.toPlainObjects(usedSG.id));
          }
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        this.set({
          is_stack_sg: isStackParent,
          only_one_sg: enabledSGArr.length === 1,
          sg_list: sg_list,
          sg_length: isStackParent ? sg_list.length : enabledSGArr.length,
          readonly: readonly,
          sg_rule_list: SgRuleSetModel.getPlainObjFromRuleSets(sgRuleAry)
        });
        this.sortSGList();
        this.sortSGRule();
        return null;
      },
      sortSGList: function() {
        this.attributes.sg_list = this.attributes.sg_list.sort(function(a_sg, b_sg) {
          if (a_sg.name === "DefaultSG") {
            return -1;
          }
          if (b_sg.name === "DefaultSG") {
            return 1;
          }
          if (a_sg.name < b_sg.name) {
            return -1;
          }
          if (a_sg.name === b_sg.name) {
            return 0;
          }
          if (a_sg.name > b_sg.name) {
            return 1;
          }
        });
        return this.attributes.sg_list;
      },
      sortSGRule: function(key) {
        var sgRuleList;
        sgRuleList = _.sortBy(this.attributes.sg_rule_list, key || "direction");
        this.set("sg_rule_list", sgRuleList);
        return null;
      },
      assignSG: function(sgUID, sgChecked) {
        var SgAsso, asso, design;
        SgAsso = Design.modelClassForType("SgAsso");
        design = Design.instance();
        console.assert(this.resId, "Resource not found when assigning SG");
        asso = new SgAsso(design.component(this.resId), design.component(sgUID));
        if (sgChecked === false) {
          asso.remove();
        }
        return null;
      },
      deleteSG: function(sgUID) {
        Design.instance().component(sgUID).remove();
        return null;
      },
      isElbSg: function(sgUID) {
        return Design.instance().component(sgUID).isElbSg();
      },
      getElbNameBySgId: function(sgUID) {
        var elb, sg, _i, _len, _ref;
        sg = Design.instance().component(sgUID);
        if (sg.isElbSg()) {
          _ref = Design.modelClassForType(constant.RESTYPE.ELB).allObjects();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elb = _ref[_i];
            if (elb.getElbSg() === sg) {
              return elb.get("name");
            }
          }
        }
        return "";
      },
      createNewSG: function() {
        var SgAsso, SgModel, component, model;
        SgModel = Design.modelClassForType(constant.RESTYPE.SG);
        model = new SgModel();
        component = Design.instance().component(this.resId);
        if (component) {
          SgAsso = Design.modelClassForType("SgAsso");
          new SgAsso(model, component);
        }
        return model.id;
      }
    });
    return new SGListModel();
  });

}).call(this);
