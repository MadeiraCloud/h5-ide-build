(function() {
  define(["ComplexResModel", "ConnectionModel", "constant"], function(ComplexResModel, ConnectionModel, constant) {
    var AclAsso, Model, formatRules, __emptyIcmp, __emptyPortRange;
    __emptyIcmp = {
      Code: "",
      Type: ""
    };
    __emptyPortRange = {
      From: "",
      To: ""
    };
    AclAsso = ConnectionModel.extend({
      type: "AclAsso",
      oneToMany: constant.RESTYPE.ACL,
      defaults: {
        associationId: ""
      },
      serialize: function(components) {
        var acl, sb;
        sb = this.getTarget(constant.RESTYPE.SUBNET);
        acl = this.getTarget(constant.RESTYPE.ACL);
        components[acl.id].resource.AssociationSet.push({
          NetworkAclAssociationId: this.get("associationId"),
          SubnetId: sb.createRef("SubnetId")
        });
        return null;
      }
    });
    formatRules = function(JsonRuleEntrySet) {
      if (!JsonRuleEntrySet || !JsonRuleEntrySet.length) {
        return [];
      }
      return _.map(JsonRuleEntrySet, function(r) {
        var rule;
        rule = {
          id: _.uniqueId("aclrule_"),
          cidr: r.CidrBlock,
          egress: r.Egress,
          protocol: parseInt(r.Protocol, 10),
          number: parseInt(r.RuleNumber, 10),
          action: r.RuleAction,
          port: ""
        };
        if (rule.protocol === 1 && r.IcmpTypeCode && r.IcmpTypeCode.Code && r.IcmpTypeCode.Type) {
          rule.port = r.IcmpTypeCode.Type + "/" + r.IcmpTypeCode.Code;
        } else if (r.PortRange.From && r.PortRange.To) {
          if (r.PortRange.From === r.PortRange.To) {
            rule.port = r.PortRange.From + "";
          } else {
            rule.port = r.PortRange.From + "-" + r.PortRange.To;
          }
        }
        return rule;
      });
    };
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.ACL,
      newNameTmpl: "CustomACL-",
      defaults: function() {
        return {
          rules: [
            {
              action: "deny",
              cidr: "0.0.0.0/0",
              egress: true,
              id: _.uniqueId("aclrule_"),
              number: 32767,
              port: "",
              protocol: -1
            }, {
              action: "deny",
              cidr: "0.0.0.0/0",
              egress: false,
              id: _.uniqueId("aclrule_"),
              number: 32767,
              port: "",
              protocol: -1
            }
          ]
        };
      },
      isVisual: function() {
        return false;
      },
      isDefault: function() {
        return this.attributes.name === "DefaultACL";
      },
      remove: function() {
        var defaultAcl, target, _i, _len, _ref;
        console.assert(!this.isDefault(), "Cannot delete DefaultACL");
        defaultAcl = Model.getDefaultAcl();
        _ref = this.connectionTargets();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          target = _ref[_i];
          new AclAsso(defaultAcl, target);
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      addRule: function(rule) {
        var currentRules, r, _i, _len;
        console.assert(rule.number !== void 0 && rule.protocol !== void 0 && rule.egress !== void 0 && rule.action !== void 0 && rule.cidr !== void 0 && rule.port !== void 0, "Invalid ACL Rule data");
        rule.protocol = parseInt(rule.protocol, 10);
        rule.number = parseInt(rule.number, 10);
        rule.cidr = MC.getValidCIDR(rule.cidr);
        currentRules = this.get("rules");
        for (_i = 0, _len = currentRules.length; _i < _len; _i++) {
          r = currentRules[_i];
          if (r.number === rule.number) {
            return false;
          }
        }
        rule.id = _.uniqueId("aclrule_");
        currentRules = currentRules.slice(0);
        currentRules.push(rule);
        this.set("rules", currentRules);
        return true;
      },
      removeRule: function(ruleId) {
        var idx, rule, rules, theRule, _i, _len;
        rules = this.get("rules");
        for (idx = _i = 0, _len = rules.length; _i < _len; idx = ++_i) {
          rule = rules[idx];
          if (rule.id === ruleId) {
            theRule = rule;
            break;
          }
        }
        if (theRule.number === 32767) {
          return false;
        }
        if (this.isDefault() && theRule.number === 100) {
          return false;
        }
        rules = rules.slice(0);
        rules.splice(idx, 1);
        this.set("rules", rules);
        return true;
      },
      getRuleCount: function() {
        return this.get("rules").length;
      },
      getAssoCount: function() {
        return this.connections().length;
      },
      serialize: function() {
        var component, port, r, rule, ruleSet, vpc, _i, _len, _ref;
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        ruleSet = [];
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            AssociationSet: [],
            Default: this.isDefault(),
            EntrySet: ruleSet,
            NetworkAclId: this.get("appId"),
            VpcId: vpc.createRef("VpcId"),
            Tags: [
              {
                Key: "visops_default",
                Value: this.isDefault() ? "true" : "false"
              }
            ]
          }
        };
        _ref = this.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          r = {
            Egress: rule.egress,
            Protocol: rule.protocol,
            RuleAction: rule.action,
            RuleNumber: rule.number,
            CidrBlock: rule.cidr,
            IcmpTypeCode: __emptyIcmp,
            PortRange: __emptyPortRange
          };
          if (rule.protocol === 1) {
            port = rule.port.split("/");
            r.IcmpTypeCode = {
              Code: port[1],
              Type: port[0]
            };
          } else if (rule.port) {
            port = (rule.port + "-" + rule.port).split("-");
            r.PortRange = {
              From: port[0],
              To: port[1]
            };
          }
          ruleSet.push(r);
        }
        return {
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.ACL,
      resolveFirst: true,
      getDefaultAcl: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.isDefault();
        });
      },
      preDeserialize: function(data, layout_data) {
        new Model({
          id: data.uid,
          name: data.resource.Default ? "DefaultACL" : data.name,
          appId: data.resource.NetworkAclId,
          rules: formatRules(data.resource.EntrySet)
        });
        return null;
      },
      deserialize: function(data, layout_data, resolve) {
        var acl, asso, c, subnet, _i, _len, _ref;
        acl = resolve(data.uid);
        _ref = data.resource.AssociationSet || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asso = _ref[_i];
          asso.NetworkAclAssociationId = "";
          subnet = resolve(MC.extractID(asso.SubnetId));
          if (!subnet) {
            continue;
          }
          c = new AclAsso(acl, subnet);
          c.set("associationId", asso.NetworkAclAssociationId);
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
