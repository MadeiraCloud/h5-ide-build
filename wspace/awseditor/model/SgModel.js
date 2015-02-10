(function() {
  define(["ComplexResModel", "ResourceModel", "./connection/SgRuleSet", "./connection/SgLine", "Design", "constant"], function(ComplexResModel, ResourceModel, SgRuleSet, SgLine, Design, constant) {
    var Model, PREDEF_SG_COLORS, SgTargetModel;
    PREDEF_SG_COLORS = ['#f26c4f', '#7dc476', '#00bef2', '#615ca8', '#fcec00', '#ff9900', '#ffcc00', '#ffcc99', '#ff99ff', '#00cccc', '#99cc99', '#9999ff', '#ffff99', '#ff00ff', '#663300', '#336600', '#660066', '#003300', '#0000ff', '#666600'];
    SgTargetModel = ComplexResModel.extend({
      type: "SgIpTarget",
      constructor: function(ip) {
        var cache, ipTarget, _i, _len;
        cache = Design.instance().classCacheForCid(this.classId);
        for (_i = 0, _len = cache.length; _i < _len; _i++) {
          ipTarget = cache[_i];
          if (ipTarget.attributes.name === ip) {
            return ipTarget;
          }
        }
        cache.push(this);
        Backbone.Model.call(this, {
          id: MC.guid(),
          name: ip
        });
        return this;
      },
      isClassicElbSg: function() {
        return this.attributes.name === "amazon-elb/amazon-elb-sg";
      },
      isVisual: function() {
        return false;
      }
    });
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.SG,
      newNameTmpl: "custom-sg-",
      color: "#f26c4f",
      defaults: {
        description: "Custom Security Group",
        groupName: ""
      },
      initialize: function(attributes, option) {
        var attr, direction;
        this.color = this.generateColor();
        if (!(option && option.isDeserialize)) {
          if (this.isElbSg()) {
            direction = SgRuleSet.DIRECTION.IN;
            attr = {
              fromPort: "22",
              toPort: "",
              protocol: "tcp"
            };
          } else {
            direction = SgRuleSet.DIRECTION.OUT;
            attr = {
              fromPort: "0",
              toPort: "65535",
              protocol: "-1"
            };
          }
          (new SgRuleSet(this, this.createIpTarget("0.0.0.0/0"))).addRawRule(this.id, direction, attr);
        }
        return null;
      },
      isElbSg: function() {
        return this.get("isElbSg");
      },
      setAsElbSg: function() {
        return this.set("isElbSg", true);
      },
      isDefault: function() {
        return this.attributes.name === "DefaultSG";
      },
      isVisual: function() {
        return false;
      },
      createIpTarget: function(ipAddress) {
        return new SgTargetModel(MC.getValidCIDR(ipAddress));
      },
      getNewName: function() {
        var myKinds;
        myKinds = Design.modelClassForType(this.type).allObjects();
        return ResourceModel.prototype.getNewName.call(this, myKinds.length - 1);
      },
      ruleCount: function() {
        var count, ruleset, _i, _len, _ref;
        count = 0;
        _ref = this.connections("SgRuleSet");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ruleset = _ref[_i];
          count += ruleset.ruleCount(this.id);
        }
        return count;
      },
      getMemberList: function() {
        return _.filter(this.connectionTargets("SgAsso"), function(tgt) {
          return tgt.type !== "ExpandedAsg";
        });
      },
      connect: function(cn) {
        if (cn.type === "SgAsso") {
          this.vlineAdd(cn.getOtherTarget(this));
        }
        return null;
      },
      disconnect: function(cn) {
        if (cn.type === "SgAsso") {
          this.vlineRemove(cn.getOtherTarget(this), void 0, cn);
        }
        return null;
      },
      vlineAdd: function(resource) {
        var connectedResMap, res, sg, _i, _j, _len, _len1, _ref, _ref1;
        if (this.design().initializing()) {
          return;
        }
        connectedResMap = {};
        _ref = this.getVisualConnectedSg();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          _ref1 = sg.connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            res = _ref1[_j];
            if (connectedResMap[res.id]) {
              continue;
            }
            if (resource !== res) {
              new SgLine(resource, res);
            }
            connectedResMap[res.id] = true;
          }
        }
        return null;
      },
      vlineAddBatch: function(otherSg) {
        var groupRes, myRes, otherRes, _i, _j, _len, _len1, _ref;
        if (this.design().initializing()) {
          return;
        }
        if (otherSg === this) {
          return;
        }
        groupRes = this.connectionTargets("SgAsso");
        _ref = otherSg.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          otherRes = _ref[_i];
          for (_j = 0, _len1 = groupRes.length; _j < _len1; _j++) {
            myRes = groupRes[_j];
            if (myRes !== otherRes) {
              new SgLine(myRes, otherRes);
            }
          }
        }
        return null;
      },
      vlineRemove: function(resource, possibleAffectedRes, reason) {
        var cn, connectableMap, res, resourceSg, sg, sgTarget, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
        if (this.design().initializing()) {
          return;
        }
        if (!possibleAffectedRes) {
          possibleAffectedRes = [];
          _ref = this.getVisualConnectedSg();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sg = _ref[_i];
            possibleAffectedRes = possibleAffectedRes.concat(sg.connectionTargets("SgAsso"));
          }
        }
        connectableMap = {};
        _ref1 = resource.connectionTargets("SgAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          resourceSg = _ref1[_j];
          _ref2 = resourceSg.getVisualConnectedSg();
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            sg = _ref2[_k];
            _ref3 = sg.connectionTargets("SgAsso");
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              sgTarget = _ref3[_l];
              connectableMap[sgTarget.id] = true;
            }
          }
        }
        for (_m = 0, _len4 = possibleAffectedRes.length; _m < _len4; _m++) {
          res = possibleAffectedRes[_m];
          if (res === resource) {
            continue;
          }
          cn = SgLine.findExisting(resource, res);
          if (cn) {
            if (!connectableMap[res.id]) {
              cn.remove(reason);
            } else {
              cn.validate();
            }
          }
        }
        return null;
      },
      vlineRemoveBatch: function(otherSg, reason) {
        var possibleAffectedRes, resource, _i, _len, _ref;
        if (this.design().initializing()) {
          return;
        }
        possibleAffectedRes = otherSg.connectionTargets("SgAsso");
        _ref = this.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          resource = _ref[_i];
          this.vlineRemove(resource, possibleAffectedRes, reason);
        }
        return null;
      },
      getVisualConnectedSg: function() {
        var cnn, cnns, _i, _len, _ref;
        cnns = [];
        _ref = this.get("__connections");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cnn = _ref[_i];
          if (cnn.type === "SgRuleSet" && cnn.port1Comp() !== cnn.port2Comp() && !cnn.getTarget("SgIpTarget")) {
            cnns.push(cnn.getOtherTarget(this));
          }
        }
        return cnns;
      },
      generateColor: function() {
        var c, color, i, sg, usedColor, _i, _len, _ref;
        if (this.isDefault()) {
          return PREDEF_SG_COLORS[0];
        }
        usedColor = {};
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          usedColor[sg.color] = true;
        }
        i = 1;
        while (i < PREDEF_SG_COLORS.length) {
          c = PREDEF_SG_COLORS[i];
          if (!usedColor[c]) {
            color = c;
            break;
          }
          ++i;
        }
        if (!color) {
          color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
          while (color.length < 6) {
            color = '0' + color;
          }
          color = "#" + color;
        }
        return color;
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            Default: this.isDefault(),
            GroupId: this.get("appId"),
            GroupName: this.get("groupName") || this.get("name"),
            GroupDescription: this.get("description"),
            VpcId: this.getVpcRef(),
            IpPermissions: [],
            IpPermissionsEgress: [],
            Tags: [
              {
                Key: "visops_default",
                Value: this.isDefault() ? "true" : "false"
              }
            ]
          }
        };
        return {
          component: component
        };
      }
    }, {
      getDefaultSg: function() {
        return _.find(Model.allObjects(), function(obj) {
          return obj.isDefault();
        });
      },
      tryDrawLine: function(leftRes, rightRes) {
        var connectedSg, otherSg, rightMap, rightResArr, sg, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4;
        if (rightRes) {
          rightMap = {};
          _ref = rightRes.connectionTargets("SgAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sg = _ref[_i];
            rightMap[sg.id] = true;
          }
          _ref1 = leftRes.connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            sg = _ref1[_j];
            _ref2 = sg.getVisualConnectedSg();
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              connectedSg = _ref2[_k];
              if (rightMap[connectedSg.id]) {
                new SgLine(leftRes, rightRes);
                return;
              }
            }
          }
        } else {
          rightResArr = [];
          _ref3 = leftRes.connectionTargets("SgAsso");
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            sg = _ref3[_l];
            _ref4 = sg.getVisualConnectedSg();
            for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
              otherSg = _ref4[_m];
              rightResArr = _.union(rightResArr, otherSg.connectionTargets("SgAsso"));
            }
          }
          for (_n = 0, _len5 = rightResArr.length; _n < _len5; _n++) {
            rightRes = rightResArr[_n];
            if (leftRes !== rightRes) {
              new SgLine(leftRes, rightRes);
            }
          }
        }
        return null;
      },
      updateSgLines: function() {
        var a, connectableMap, idKey, key, leftPortRes, leftRes, resource, ress, ruleset, sg1, sg2, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        connectableMap = {};
        _ref = SgRuleSet.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ruleset = _ref[_i];
          sg1 = ruleset.port1Comp();
          sg2 = ruleset.port2Comp();
          if (sg1 === sg2 || sg1.type === "SgIpTarget" || sg2.type === "SgIpTarget") {
            continue;
          }
          leftPortRes = sg1.connectionTargets("SgAsso");
          _ref1 = sg2.connectionTargets("SgAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            resource = _ref1[_j];
            for (_k = 0, _len2 = leftPortRes.length; _k < _len2; _k++) {
              leftRes = leftPortRes[_k];
              if (leftRes.id === resource.id) {
                continue;
              }
              if (leftRes.id < resource.id) {
                key = leftRes.id + "|" + resource.id;
              } else {
                key = resource.id + "|" + leftRes.id;
              }
              a = connectableMap[key] || [];
              a[0] = leftRes;
              a[1] = resource;
              connectableMap[key] = a;
            }
          }
        }
        for (idKey in connectableMap) {
          ress = connectableMap[idKey];
          new SgLine(ress[0], ress[1], void 0, {
            detectDuplicate: false
          });
        }
        return null;
      },
      handleTypes: constant.RESTYPE.SG,
      deserialize: function(data, layout_data, resolve) {
        var attr, dir, group, rule, ruleObj, ruleTarget, rules, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        group = new Model({
          name: data.resource.Default ? "DefaultSG" : data.name,
          id: data.uid,
          appId: data.resource.GroupId,
          groupName: data.resource.GroupName,
          description: data.resource.GroupDescription
        }, {
          isDeserialize: true
        });
        rules = [];
        if (data.resource.IpPermissions) {
          _ref = data.resource.IpPermissions;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            rule = _ref[_i];
            rules.push({
              rule: rule
            });
          }
        }
        if (data.resource.IpPermissionsEgress) {
          _ref1 = data.resource.IpPermissionsEgress;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            rule = _ref1[_j];
            rules.push({
              rule: rule,
              out: true
            });
          }
        }
        for (_k = 0, _len2 = rules.length; _k < _len2; _k++) {
          ruleObj = rules[_k];
          rule = ruleObj.rule;
          if (rule.IpRanges[0] === "@") {
            ruleTarget = resolve(MC.extractID(rule.IpRanges));
          } else {
            ruleTarget = new SgTargetModel(rule.IpRanges);
          }
          if (!ruleTarget) {
            continue;
          }
          attr = {
            fromPort: rule.FromPort,
            toPort: rule.ToPort,
            protocol: rule.IpProtocol
          };
          dir = ruleObj.out ? SgRuleSet.DIRECTION.OUT : SgRuleSet.DIRECTION.IN;
          (new SgRuleSet(group, ruleTarget)).addRawRule(group.id, dir, attr);
        }
        return null;
      }
    });
    Design.on(Design.EVENT.Deserialized, Model.updateSgLines);
    return Model;
  });

}).call(this);
