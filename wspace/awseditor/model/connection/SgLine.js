(function() {
  define(["constant", "ConnectionModel", "ResourceModel", "i18n!/nls/lang.js"], function(constant, ConnectionModel, ResourceModel, lang) {
    var SgRuleLine;
    SgRuleLine = ConnectionModel.extend({
      constructor: function(p1Comp, p2Comp, attr, option) {
        console.assert(p1Comp !== p2Comp, "Sgline should connect to different resources.");
        if (!this.assignCompsToPorts(p1Comp, p2Comp) || !this.isValid()) {
          return;
        }
        return ConnectionModel.call(this, p1Comp, p2Comp, attr, option);
      },
      isValid: function() {
        var TYPE, ami, attachs, elb, elbSgMap, eni, expandAsg, hasInRule, lc, p1Comp, p2Comp, ruleset, sg, target, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        p1Comp = this.port1Comp();
        p2Comp = this.port2Comp();
        TYPE = constant.RESTYPE;
        if (p1Comp.type === p2Comp.type && p1Comp.type === TYPE.AWS_ELB) {
          return false;
        }
        ami = this.getTarget(TYPE.INSTANCE);
        eni = this.getTarget(TYPE.ENI);
        if (eni) {
          attachs = eni.connectionTargets("EniAttachment");
          if (attachs.length === 0) {
            return false;
          }
          if (attachs.indexOf(ami) >= 0) {
            return false;
          }
        }
        expandAsg = this.getTarget("ExpandedAsg");
        lc = this.getTarget(TYPE.LC);
        if (expandAsg && lc && expandAsg.get("originalAsg").getLc() === lc) {
          return false;
        }
        elb = this.getTarget(TYPE.ELB);
        if (elb) {
          if (!elb.get("internal")) {
            return false;
          }
          elbSgMap = {};
          hasInRule = false;
          _ref = elb.connectionTargets("SgAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sg = _ref[_i];
            elbSgMap[sg.id] = sg;
          }
          _ref1 = this.getOtherTarget(elb).connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            sg = _ref1[_j];
            _ref2 = sg.connections("SgRuleSet");
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              ruleset = _ref2[_k];
              target = ruleset.getOtherTarget(sg);
              if (!elbSgMap[target.id]) {
                continue;
              }
              if (ruleset.hasRawRuleTo(elbSgMap[target.id])) {
                hasInRule = true;
                break;
              }
            }
            if (hasInRule) {
              break;
            }
          }
          if (!hasInRule) {
            return false;
          }
        }
        return true;
      },
      validate: function() {
        if (!this.isValid()) {
          this.remove({
            reason: "Validation Failed"
          });
        }
      },
      isRemovable: function() {
        var SgRuleSetModel, allRuleSets, group, groups, _i, _len;
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        allRuleSets = SgRuleSetModel.getRelatedSgRuleSets(this.port1Comp(), this.port2Comp());
        groups = SgRuleSetModel.getGroupedObjFromRuleSets(allRuleSets);
        for (_i = 0, _len = groups.length; _i < _len; _i++) {
          group = groups[_i];
          group.content = MC.template.sgRuleList(group.rules);
        }
        return MC.template.groupedSgRuleListDelConfirm(groups);
      },
      remove: function(reason) {
        var SgRuleSetModel, rs, _i, _len, _ref;
        ConnectionModel.prototype.remove.apply(this, arguments);
        if (reason) {
          return;
        }
        if (this.port1Comp().isRemoved() || this.port2Comp().isRemoved()) {
          return;
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        _ref = SgRuleSetModel.getRelatedSgRuleSets(this.port1Comp(), this.port2Comp());
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rs = _ref[_i];
          rs.remove();
        }
        return null;
      },
      silentRemove: function() {
        var v;
        v = this.__view;
        if (v) {
          v.detach();
        }
        ResourceModel.prototype.remove.apply(this, arguments);
        return null;
      },
      type: "SgRuleLine",
      defaults: {
        name: "Security Group Rule"
      },
      portDefs: [
        {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          },
          port2: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          }
        }, {
          port1: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          },
          port2: {
            name: "elb-sg-in",
            type: constant.RESTYPE.ELB
          }
        }, {
          port1: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          },
          port2: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          }
        }, {
          port1: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          },
          port2: {
            name: "eni-sg",
            type: constant.RESTYPE.ENI
          }
        }, {
          port1: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }, {
          port1: {
            name: "db-sg",
            type: constant.RESTYPE.DBINSTANCE
          },
          port2: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          }
        }
      ]
    }, {
      isConnectable: function(p1Comp, p2Comp) {
        var attach, tag, _i, _len, _ref;
        tag = p1Comp.type + ">" + p2Comp.type;
        if (tag.indexOf(constant.RESTYPE.INSTANCE) !== -1 && tag.indexOf(constant.RESTYPE.ENI) !== -1) {
          _ref = p1Comp.connectionTargets("EniAttachment");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            attach = _ref[_i];
            if (attach === p2Comp) {
              return lang.CANVAS.NETWORK_INTERFACE_ATTACHED_INTERFACE_NO_NEED_FOR_SG_RULE;
            }
          }
        }
        return true;
      }
    });
    return SgRuleLine;
  });

}).call(this);
