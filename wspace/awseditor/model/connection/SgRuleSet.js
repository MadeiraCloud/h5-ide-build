(function() {
  define(["constant", "ConnectionModel", "Design"], function(constant, ConnectionModel, Design) {
    var SgRuleSet;
    SgRuleSet = ConnectionModel.extend({
      type: "SgRuleSet",

      /*
      |-------|   in1        out2   |-------|
      |       |  <=====     <=====  |       |
      | PORT1 |                     | PORT2 |
      |       |  =====>     =====>  |       |
      |-------|   out1        in2   |-------|
       */
      "default": {
        in1: null,
        out1: null,
        in2: null,
        out2: null
      },
      initialize: function() {
        var tmp;
        if (this.port1Comp().type === "SgIpTarget") {
          tmp = this.port2Comp();
          this.__port2Comp = this.__port1Comp;
          this.__port1Comp = tmp;
        }
        this.attributes.in1 = [];
        this.attributes.out1 = [];
        if (this.port1Comp() === this.port2Comp()) {
          this.attributes.in2 = this.attributes.in1;
          this.attributes.out2 = this.attributes.out1;
        } else {
          this.attributes.in2 = [];
          this.attributes.out2 = [];
        }
        return null;
      },
      ruleCount: function(port) {
        if (port === this.port1Comp().id || port === this.port1Comp().get("name")) {
          return this.attributes.in1.length + this.attributes.out1.length;
        } else {
          return this.attributes.in2.length + this.attributes.out2.length;
        }
      },
      toPlainObjects: function(filter, detailedInfo) {
        var attr, port, portion, portions, rule, rules, _i, _j, _len, _len1, _ref;
        portions = [
          {
            ary: this.attributes.in1,
            direction: SgRuleSet.DIRECTION.IN,
            relation: this.port2Comp(),
            owner: this.port1Comp()
          }, {
            ary: this.attributes.out1,
            direction: SgRuleSet.DIRECTION.OUT,
            relation: this.port2Comp(),
            owner: this.port1Comp()
          }
        ];
        if (!(this.port1Comp() === this.port2Comp() || this.getTarget("SgIpTarget"))) {
          portions.push({
            ary: this.attributes.in2,
            direction: SgRuleSet.DIRECTION.IN,
            relation: this.port1Comp(),
            owner: this.port2Comp()
          });
          portions.push({
            ary: this.attributes.out2,
            direction: SgRuleSet.DIRECTION.OUT,
            relation: this.port1Comp(),
            owner: this.port2Comp()
          });
        }
        rules = [];
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portion = portions[_i];
          if (filter) {
            if (_.isString(filter)) {
              if (portion.owner.id !== filter && portion.owner.get("name") !== filter) {
                continue;
              }
            } else if (!filter(portion.owner)) {
              continue;
            }
          }
          _ref = portion.ary;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            rule = _ref[_j];
            if (rule.protocol === "icmp") {
              port = rule.fromPort + "/" + rule.toPort;
            } else if (rule.fromPort === rule.toPort || !rule.toPort) {
              port = rule.fromPort;
            } else {
              port = rule.fromPort + "-" + rule.toPort;
            }
            attr = {
              ruleSetId: this.id,
              port: port,
              protocol: rule.protocol,
              direction: portion.direction,
              relation: portion.relation.get("name"),
              color: portion.relation.color
            };
            if (detailedInfo) {
              attr.relationId = portion.relation.id;
              attr.ownerId = portion.owner.id;
            }
            rules.push(attr);
          }
        }
        return rules;
      },
      hasRawRuleTo: function(port) {
        console.assert(port === this.port1Comp() || port === this.port2Comp(), "Invalid port for calling SgRuleSet.hasRawRuleTo()");
        if (port === this.port1Comp()) {
          return this.attributes.in1.length > 0 || this.attributes.out2.length > 0;
        } else {
          return this.attributes.in2.length > 0 || this.attributes.out1.length > 0;
        }
      },
      addRawRule: function(ruleOwner, direction, rawRule) {
        var SgModel, elb, exist, existRule, oldPort1InRuleCout, oldPort1OutRuleCout, oldPort2InRuleCout, oldPort2OutRuleCout, p1, p2, port1, portion, portionName, portions, rule, shouldInitSgLine, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1;
        console.assert(ruleOwner === this.port1Comp().id || ruleOwner === this.port2Comp().id || ruleOwner === this.port1Comp().get("name") || ruleOwner === this.port2Comp().get("name"), "Invalid ruleOwner, when adding a raw rule to SgRuleSet : ", ruleOwner);
        console.assert(direction === SgRuleSet.DIRECTION.BIWAY || direction === SgRuleSet.DIRECTION.IN || direction === SgRuleSet.DIRECTION.OUT, "Invalid direction, when adding a raw rule to SgRuleSet : ", rawRule);
        console.assert((("" + rawRule.protocol) === "-1" || rawRule.protocol === "all" || parseInt(rawRule.protocol, 10) + "" === rawRule.protocol) || rawRule.fromPort || rawRule.toPort, "Invalid rule, when adding a raw rule to SgRuleSet : ", rawRule);
        shouldInitSgLine = this.get("in1").length + this.get("in2").length + this.get("out1").length + this.get("out2").length === 0;
        oldPort1InRuleCout = this.get("in1").length;
        oldPort2InRuleCout = this.get("in2").length;
        oldPort1OutRuleCout = this.get("out1").length;
        oldPort2OutRuleCout = this.get("out2").length;
        rule = {
          protocol: rawRule.protocol,
          fromPort: "" + rawRule.fromPort,
          toPort: "" + rawRule.toPort
        };
        if (("" + rule.protocol) === "-1" || rule.protocol === "all") {
          rule.protocol = "all";
          rule.fromPort = "0";
          rule.toPort = "65535";
        } else if (parseInt(rawRule.protocol, 10) + "" === rawRule.protocol) {
          rule.fromPort = "";
          rule.toPort = "";
        }
        if (rule.fromPort === rule.toPort && rule.protocol !== "icmp") {
          rule.toPort = "";
        }
        port1 = ruleOwner === this.port1Comp().id || ruleOwner === this.port1Comp().get("name");
        if (!port1 && this.getTarget("SgIpTarget")) {
          console.info("Ignoring adding sg rules for Ip Target.");
          return;
        }
        switch (direction) {
          case SgRuleSet.DIRECTION.IN:
            portions = [port1 ? "in1" : "in2"];
            break;
          case SgRuleSet.DIRECTION.OUT:
            portions = [port1 ? "out1" : "out2"];
            break;
          case SgRuleSet.DIRECTION.BIWAY:
            portions = [port1 ? "in1" : "in2", port1 ? "out1" : "out2"];
        }
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portionName = portions[_i];
          exist = false;
          portion = this.get(portionName);
          for (_j = 0, _len1 = portion.length; _j < _len1; _j++) {
            existRule = portion[_j];
            if (existRule.fromPort === rule.fromPort && existRule.toPort === rule.toPort && existRule.protocol === rule.protocol) {
              exist = true;
              break;
            }
          }
          if (!exist) {
            portion = portion.slice(0);
            portion.push(rule);
            this.set(portionName, portion);
          }
        }
        if (shouldInitSgLine) {
          p1 = this.port1Comp();
          p2 = this.port2Comp();
          if (p1 !== p2 && p1.type !== "SgIpTarget" && p2.type !== "SgIpTarget") {
            p1.vlineAddBatch(p2);
          }
        } else {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          if ((oldPort1InRuleCout + oldPort2OutRuleCout === 0) && (this.get("in1").length + this.get("out2").length > 0)) {
            _ref = this.port1Comp().connectionTargets("SgAsso");
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              elb = _ref[_k];
              if (elb.type === constant.RESTYPE.ELB) {
                SgModel.tryDrawLine(elb);
              }
            }
          }
          if ((oldPort2InRuleCout + oldPort1OutRuleCout === 0) && (this.get("in2").length + this.get("out1").length > 0)) {
            _ref1 = this.port2Comp().connectionTargets("SgAsso");
            for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
              elb = _ref1[_l];
              if (elb.type === constant.RESTYPE.ELB) {
                SgModel.tryDrawLine(elb);
              }
            }
          }
        }
        return null;
      },
      addRule: function(target, direction, rule) {
        var target2;
        console.assert(target === this.port1Comp().id || target === this.port2Comp().id || target === this.port1Comp().get("name") || target === this.port2Comp().get("name"), "Invalid target, when adding a rule to SgRuleSet : ", target);
        if (target === this.port1Comp().id || target === this.port1Comp().get("name")) {
          target2 = this.port2Comp().id;
        } else {
          target = this.port2Comp().id;
          target2 = this.port1Comp().id;
        }
        if (direction === SgRuleSet.DIRECTION.IN || direction === SgRuleSet.DIRECTION.BIWAY) {
          this.addRawRule(target, SgRuleSet.DIRECTION.IN, rule);
          this.addRawRule(target2, SgRuleSet.DIRECTION.OUT, rule);
        }
        if (direction === SgRuleSet.DIRECTION.OUT || direction === SgRuleSet.DIRECTION.BIWAY) {
          this.addRawRule(target, SgRuleSet.DIRECTION.OUT, rule);
          this.addRawRule(target2, SgRuleSet.DIRECTION.IN, rule);
        }
        return null;
      },
      removeRawRule: function(ruleOwner, direction, rule) {
        var SgModel, elb, existRule, found, idx, oldPort1InRuleCout, oldPort1OutRuleCout, oldPort2InRuleCout, oldPort2OutRuleCout, port1, portion, portionName, portions, sgline, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _m, _n, _ref, _ref1, _ref2, _ref3;
        console.assert(ruleOwner === this.port1Comp().id || ruleOwner === this.port2Comp().id || ruleOwner === this.port1Comp().get("name") || ruleOwner === this.port2Comp().get("name"), "Invalid ruleOwner, when removing a raw rule from SgRuleSet : ", ruleOwner);
        console.assert(direction === SgRuleSet.DIRECTION.BIWAY || direction === SgRuleSet.DIRECTION.IN || direction === SgRuleSet.DIRECTION.OUT, "Invalid direction, when removing a raw rule from SgRuleSet : ", rule);
        console.assert(rule.fromPort !== void 0 && rule.toPort !== void 0 && rule.protocol !== void 0, "Invalid rule, when removing a raw rule from SgRuleSet : ", rule);
        oldPort1InRuleCout = this.get("in1").length;
        oldPort2InRuleCout = this.get("in2").length;
        oldPort1OutRuleCout = this.get("out1").length;
        oldPort2OutRuleCout = this.get("out2").length;
        if (rule.protocol === "-1") {
          rule.protocol = "all";
        }
        if (rule.fromPort === rule.toPort) {
          rule.toPort = "";
        }
        port1 = ruleOwner === this.port1Comp().id || ruleOwner === this.port1Comp().get("name");
        switch (direction) {
          case SgRuleSet.DIRECTION.IN:
            portions = [port1 ? "in1" : "in2"];
            break;
          case SgRuleSet.DIRECTION.OUT:
            portions = [port1 ? "out1" : "out2"];
            break;
          case SgRuleSet.DIRECTION.BIWAY:
            portions = [port1 ? "in1" : "in2", port1 ? "out1" : "out2"];
        }
        found = false;
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portionName = portions[_i];
          portion = this.get(portionName);
          for (idx = _j = 0, _len1 = portion.length; _j < _len1; idx = ++_j) {
            existRule = portion[idx];
            if (existRule.fromPort === rule.fromPort && existRule.toPort === rule.toPort && existRule.protocol === rule.protocol) {
              portion = portion.slice(0);
              portion.splice(idx, 1);
              found = true;
              this.set(portionName, portion);
              break;
            }
          }
        }
        if (this.get("in1").length + this.get("in2").length + this.get("out1").length + this.get("out2").length === 0) {
          this.remove();
        } else {
          SgModel = Design.modelClassForType(constant.RESTYPE.SG);
          if ((this.get("in1").length + this.get("out2").length === 0) && (oldPort1InRuleCout + oldPort2OutRuleCout > 0)) {
            _ref = this.port1Comp().connectionTargets("SgAsso");
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              elb = _ref[_k];
              if (elb.type === constant.RESTYPE.ELB) {
                _ref1 = elb.connections("SgRuleLine");
                for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
                  sgline = _ref1[_l];
                  sgline.validate();
                }
              }
            }
          }
          if ((this.get("in2").length + this.get("out1").length === 0) && (oldPort2InRuleCout + oldPort1OutRuleCout > 0)) {
            _ref2 = this.port2Comp().connectionTargets("SgAsso");
            for (_m = 0, _len4 = _ref2.length; _m < _len4; _m++) {
              elb = _ref2[_m];
              if (elb.type === constant.RESTYPE.ELB) {
                _ref3 = elb.connections("SgRuleLine");
                for (_n = 0, _len5 = _ref3.length; _n < _len5; _n++) {
                  sgline = _ref3[_n];
                  sgline.validate();
                }
              }
            }
          }
        }
        console.assert(found, "Rule is not found when removing SG Rule", rule);
        return null;
      },
      removeRuleByPlainObj: function(ruleObj) {
        var owner, ports;
        console.assert(ruleObj.relation === this.port1Comp().id || ruleObj.relation === this.port1Comp().get("name") || ruleObj.relation === this.port2Comp().id || ruleObj.relation === this.port2Comp().get("name"), "Invalid ruleObj.relation, when removing a rule : ", ruleObj);
        console.assert(ruleObj.direction === SgRuleSet.DIRECTION.BIWAY || ruleObj.direction === SgRuleSet.DIRECTION.IN || ruleObj.direction === SgRuleSet.DIRECTION.OUT, "Invalid direction, when removing a raw rule from SgRuleSet : ", ruleObj);
        console.assert(ruleObj.relation !== void 0 && ruleObj.port !== void 0 && ruleObj.protocol !== void 0 && ruleObj.direction !== void 0, "Invalid ruleObj, when removing a rule : ", ruleObj);
        if (ruleObj.relation === this.port1Comp().id || ruleObj.relation === this.port1Comp().get("name")) {
          owner = this.port2Comp().id;
        } else {
          owner = this.port1Comp().id;
        }
        ports = "" + ruleObj.port;
        if (ports.indexOf("/") >= 0) {
          ports = ports.split("/");
        } else {
          ports = ports.split("-");
        }
        ruleObj.fromPort = ports[0];
        ruleObj.toPort = ports[1] || "";
        this.removeRawRule(owner, ruleObj.direction, ruleObj);
        return null;
      },
      serialize: function(components) {
        var portion, portions, rule, sg1, sg1Ref, sg2, sg2Ref, _i, _j, _len, _len1, _ref;
        sg1 = this.port1Comp();
        sg2 = this.port2Comp();
        sg1Ref = sg1.createRef("GroupId");
        sg2Ref = sg2.type === "SgIpTarget" ? sg2.get("name") : sg2.createRef("GroupId");
        portions = [
          {
            ary: this.get("in1"),
            owner: components[sg1.id].resource.IpPermissions,
            target: sg2Ref
          }, {
            ary: this.get("out1"),
            owner: components[sg1.id].resource.IpPermissionsEgress,
            target: sg2Ref
          }
        ];
        if (sg2.type !== "SgIpTarget" && sg1 !== sg2) {
          portions.push({
            ary: this.get("in2"),
            owner: components[sg2.id].resource.IpPermissions,
            target: sg1Ref
          });
          portions.push({
            ary: this.get("out2"),
            owner: components[sg2.id].resource.IpPermissionsEgress,
            target: sg1Ref
          });
        }
        for (_i = 0, _len = portions.length; _i < _len; _i++) {
          portion = portions[_i];
          _ref = portion.ary;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            rule = _ref[_j];
            if (rule.protocol === '1') {
              rule.protocol = 'icmp';
              rule.fromPort = '0';
              rule.toPort = '0';
            }
            portion.owner.push({
              FromPort: rule.fromPort,
              ToPort: rule.toPort ? rule.toPort : rule.fromPort,
              IpRanges: portion.target,
              IpProtocol: rule.protocol === "all" ? "-1" : rule.protocol
            });
          }
        }
        return null;
      },
      remove: function() {
        ConnectionModel.prototype.remove.apply(this, arguments);
        if (this.getTarget("SgIpTarget")) {
          return;
        }
        if (this.port1Comp().isRemoved()) {
          this.port2Comp().vlineRemoveBatch(this.port1Comp(), this);
        } else {
          this.port1Comp().vlineRemoveBatch(this.port2Comp(), this);
        }
      }
    }, {
      getResourceSgRuleSets: function(resource) {
        var ruleset, sg, sgRuleAry, sgRuleMap, _i, _j, _len, _len1, _ref, _ref1;
        sgRuleMap = {};
        sgRuleAry = [];
        _ref = resource.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          _ref1 = sg.connections("SgRuleSet");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ruleset = _ref1[_j];
            if (sgRuleMap[ruleset.id]) {
              continue;
            }
            sgRuleMap[ruleset.id] = true;
            sgRuleAry.push(ruleset);
          }
        }
        return sgRuleAry;
      },
      getRelatedSgRuleSets: function(res1, res2) {
        var foundRuleSet, res1SgMap, ruleset, sg, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        res1SgMap = {};
        _ref = res1.connectionTargets("SgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          res1SgMap[sg.id] = true;
        }
        foundRuleSet = [];
        _ref1 = res2.connectionTargets("SgAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sg = _ref1[_j];
          _ref2 = sg.connections("SgRuleSet");
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            ruleset = _ref2[_k];
            if (res1SgMap[ruleset.getOtherTarget(sg).id]) {
              foundRuleSet.push(ruleset);
            }
          }
        }
        return _.uniq(foundRuleSet);
      },
      getPlainObjFromRuleSets: function(sgRuleAry) {
        var rule, ruleMap, ruleString, rules, _i, _len;
        ruleMap = {};
        rules = [];
        for (_i = 0, _len = sgRuleAry.length; _i < _len; _i++) {
          rule = sgRuleAry[_i];
          ruleString = rule.direction + rule.target + rule.protocol + rule.port;
          if (ruleMap[ruleString]) {
            continue;
          }
          ruleMap[ruleString] = true;
          rules.push(rule);
        }
        return rules;
      },
      getGroupedObjFromRuleSets: function(rulesetArray) {
        var arr, comp, group, id, ipTarget, plainObj, ruleset, tempMap, uid, _i, _j, _len, _len1, _ref;
        tempMap = {};
        for (_i = 0, _len = rulesetArray.length; _i < _len; _i++) {
          ruleset = rulesetArray[_i];
          ipTarget = ruleset.getTarget("SgIpTarget");
          if (ipTarget && !ipTarget.isClassicElbSg()) {
            continue;
          }
          comp = ruleset.port1Comp();
          id = comp.id;
          if (!tempMap[id]) {
            tempMap[id] = {
              ownerId: id,
              ownerName: comp.get("name"),
              ownerColor: comp.color,
              rules: []
            };
          }
          comp = ruleset.port2Comp();
          id = comp.id;
          if (!tempMap[id]) {
            tempMap[id] = {
              ownerId: id,
              ownerName: comp.get("name"),
              ownerColor: comp.color,
              rules: []
            };
          }
          _ref = ruleset.toPlainObjects(null, true);
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            plainObj = _ref[_j];
            tempMap[plainObj.ownerId].rules.push(plainObj);
          }
        }
        arr = [];
        for (uid in tempMap) {
          group = tempMap[uid];
          if (group.rules.length) {
            arr.push(group);
          }
        }
        return arr.sort(function(a, b) {
          if (a.ownerName === "DefaultSG") {
            return -1;
          }
          if (b.ownerName === "DefaultSG") {
            return 1;
          }
          if (a.ownerName < b.ownerName) {
            return -1;
          }
          if (a.ownerName > b.ownerName) {
            return 1;
          }
          return 0;
        });
      }
    });
    SgRuleSet.DIRECTION = {
      BIWAY: "biway",
      IN: "inbound",
      OUT: "outbound"
    };
    return SgRuleSet;
  });

}).call(this);
