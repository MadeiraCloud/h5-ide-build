define(["ComplexResModel", "constant"], function(ComplexResModel, constant) {
  var Model;
  Model = ComplexResModel.extend({
    type: constant.RESTYPE.OSSG,
    newNameTmpl: "security-group",
    initialize: function() {
      var RuleModel;
      RuleModel = Design.modelClassForType(constant.RESTYPE.OSSGRULE);
      this.get("rules").push(new RuleModel());
    },
    defaults: function() {
      return {
        description: "custom security group",
        rules: []
      };
    },
    attachSG: function(targetModel) {
      var SgAsso;
      SgAsso = Design.modelClassForType("OsSgAsso");
      return new SgAsso(targetModel, this);
    },
    unAttachSG: function(targetModel) {
      var SgAsso;
      SgAsso = Design.modelClassForType("OsSgAsso");
      return (new SgAsso(targetModel, this)).remove();
    },
    addRule: function(ruleData) {
      var RuleModel, rule, _i, _len, _ref;
      _ref = this.get("rules");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        if (rule.isEqualToData(ruleData)) {
          return false;
        }
      }
      RuleModel = Design.modelClassForType(constant.RESTYPE.OSSGRULE);
      rule = new RuleModel(ruleData);
      this.get("rules").push(rule);
      return rule.id;
    },
    getRule: function(id) {
      var rule, _i, _len, _ref;
      _ref = this.get("rules");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        if (rule.id === id) {
          return rule;
        }
      }
      return null;
    },
    removeRule: function(idOrModel) {
      var idx, r, _i, _len, _ref;
      _ref = this.get("rules");
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        r = _ref[idx];
        if (r === idOrModel || r.id === idOrModel) {
          this.get("rules").splice(idx, 1);
          break;
        }
      }
    },
    getMemberList: function() {
      return _.filter(this.connectionTargets('OsSgAsso'), function(tgt) {
        return true;
      });
    },
    isDefault: function() {
      return this.get('name') === 'DefaultSG';
    },
    remove: function() {
      var rule, _i, _len, _ref;
      _ref = this.get("rules");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rule = _ref[_i];
        rule.remove();
      }
      return ComplexResModel.prototype.remove.apply(this, arguments);
    },
    serialize: function() {
      var ruleLength, rules;
      if (this.getMemberList().length) {
        rules = this.get("rules");
        ruleLength = rules.length;
        rules = _.filter(rules, function(rule, idx) {
          var i, _i, _ref;
          for (i = _i = _ref = idx + 1; _ref <= ruleLength ? _i < ruleLength : _i > ruleLength; i = _ref <= ruleLength ? ++_i : --_i) {
            if (_.isEqual(rule.toJSON(), rules[i].toJSON())) {
              return false;
            }
          }
          return true;
        });
        return {
          component: {
            name: this.get("name"),
            type: this.type,
            uid: this.id,
            resource: {
              id: this.get("appId"),
              name: this.get("name"),
              description: this.get("description"),
              rules: rules != null ? rules.map(function(rule) {
                return rule.toJSON();
              }) : void 0
            }
          }
        };
      } else {
        return null;
      }
    }
  }, {
    handleTypes: constant.RESTYPE.OSSG,
    deserialize: function(data, layout_data, resolve) {
      var RuleModel, rule, rules, sgModel, _i, _len, _ref;
      RuleModel = Design.modelClassForType(constant.RESTYPE.OSSGRULE);
      sgModel = new Model({
        id: data.uid,
        name: data.resource.name,
        appId: data.resource.id,
        description: data.resource.description
      });
      rules = data.resource.rules.map(function(rule) {
        var rModel;
        if (rule.remote_group_id) {
          rule.remote_group_id = resolve(MC.extractID(rule.remote_group_id));
        }
        rModel = new RuleModel();
        rModel.fromJSON(rule);
        return rModel;
      });
      if (rules.length) {
        _ref = sgModel.get("rules");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          rule.remove();
        }
        sgModel.set('rules', rules);
      }
    },
    getDefaultSg: function() {
      return _.find(Model.allObjects(), function(obj) {
        return obj.isDefault();
      });
    },
    attachDefaultSG: function(targetModel) {
      var SgAsso, defaultSg;
      defaultSg = Model.getDefaultSg();
      if (defaultSg) {
        SgAsso = Design.modelClassForType('OsSgAsso');
        new SgAsso(defaultSg, targetModel);
      }
    }
  });
  return Model;
});
