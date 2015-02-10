(function() {
  define(['constant', '../OsPropertyView', './template', 'CloudResources', 'UI.selection', 'UI.bubblepopup', '../validation/ValidationBase'], function(constant, OsPropertyView, template, CloudResources, bindSelection, bubblePopup, ValidationBase) {
    return OsPropertyView.extend({
      events: {
        "change .selection[data-target]": "updateAttribute",
        "click .direction-switch .t-m-btn": "switchDirection",
        "click .rule-item-remove": "removeRule",
        "click .os-sg-remove": "removeSG",
        "focus .os-sg-new-input": "focusNewInput"
      },
      className: 'float-panel-sg',
      initialize: function(options) {
        var that;
        that = this;
        that.sgModel = options.sgModel;
        that.listView = options.listView;
        return this.selectTpl = {
          ipValid: function(value) {
            if (MC.validate('cidr', value)) {
              return true;
            }
            if (Design.instance().component(value)) {
              return true;
            }
            return false;
          },
          portValid: function(value) {
            var rule, _ref;
            if (!(value && value[0])) {
              return false;
            }
            value = value[0];
            rule = that.getRuleValue(this);
            if ((_ref = rule.protocol) === 'tcp' || _ref === 'udp' || _ref === 'all') {
              if (that.getPortRange(value)) {
                return true;
              }
            } else {
              if (that.getICMPRange(value)) {
                return true;
              }
            }
            return false;
          },
          ipTipTpl: function() {
            return template.sgIPInputTip();
          }
        };
      },
      render: function() {
        var SGValid, currentMode, egressRules, ingressRules, memberList, memberModelList, modeIsApp, modeIsAppEdit, sgRules, that;
        that = this;
        SGValid = ValidationBase.getClass(constant.RESTYPE.OSSG);
        bindSelection(this.$el, this.selectTpl, new SGValid({
          view: this,
          model: that.sgModel
        }));
        ingressRules = [];
        egressRules = [];
        sgRules = that.sgModel.get('rules');
        _.each(sgRules, function(ruleModel) {
          var ruleStrObj;
          ruleStrObj = that.getRuleStr(ruleModel);
          if (ruleStrObj.direction === 'ingress') {
            return ingressRules.push(ruleStrObj);
          } else if (ruleStrObj.direction === 'egress') {
            return egressRules.push(ruleStrObj);
          }
        });
        memberModelList = this.sgModel.getMemberList();
        memberList = _.map(memberModelList, function(member) {
          if (member.isEmbedded && member.isEmbedded()) {
            member = member.owner();
          }
          return {
            name: member.get('name')
          };
        });
        currentMode = Design.instance().mode();
        if (!this.sgModel.get('appId')) {
          currentMode = 'stack';
        }
        modeIsAppEdit = currentMode === 'appedit';
        modeIsApp = currentMode === 'app';
        this.$el.html(template.stack({
          id: this.sgModel.get('appId'),
          name: this.sgModel.get('name'),
          description: this.sgModel.get('description'),
          defaultSG: this.sgModel.isDefault(),
          ingressRules: ingressRules,
          egressRules: egressRules,
          memberList: memberList,
          modeIsAppEdit: modeIsAppEdit,
          modeIsApp: modeIsApp
        }));
        _.delay(function() {
          return that.$el.find('.rule-item').each(function() {
            return that.initSGList($(this));
          });
        });
        if (!modeIsApp) {
          this.addNewItem(this.$el.find('.rule-list'));
        }
        this.setTitle(this.sgModel.get('name'));
        this.updateCount();
        return this;
      },
      nullStr: 'N/A',
      initSGList: function($ruleItem) {
        var $selectDom, allSGModels, allSGObjs, selectDom;
        allSGModels = Design.modelClassForType(constant.RESTYPE.OSSG).allObjects();
        allSGObjs = _.map(allSGModels, function(sgModel) {
          return {
            text: sgModel.get('name'),
            value: sgModel.id
          };
        });
        $selectDom = $ruleItem.find('select.selection[data-target="ip"]');
        selectDom = $selectDom[0];
        if (selectDom && selectDom.selectize) {
          return selectDom.selectize.addOption(allSGObjs);
        }
      },
      switchDirection: function(event) {
        var $target;
        $target = $(event.currentTarget);
        this.$el.find('.direction-switch .t-m-btn').removeClass('active');
        $target.addClass('active');
        this.$el.find('.rule-container').addClass('hide');
        if ($target.hasClass('ingress')) {
          return this.$el.find('.rule-container.ingress').removeClass('hide');
        } else {
          return this.$el.find('.rule-container.egress').removeClass('hide');
        }
      },
      setTitle: function(title) {
        return this.$('h1').text(title);
      },
      updateAttribute: function(event) {
        var $ruleItem, $target, attr, newRuleId, rule, ruleModel, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        if ("protocol|port|ip".indexOf(attr) >= 0) {
          rule = this.getRuleValue($target);
          if (!rule) {
            return;
          }
          if (attr === 'protocol') {
            this.setDefaultPort(rule, $target);
          }
          $ruleItem = $target.parents('.rule-item');
          ruleModel = this.sgModel.getRule($ruleItem.data('id'));
          if (ruleModel) {
            rule.appId = "";
            ruleModel.set(rule);
          } else {
            if (rule) {
              newRuleId = this.sgModel.addRule(rule);
            }
            this.addNewItem($ruleItem);
            $ruleItem.data('id', newRuleId);
            this.updateCount();
            this.listView.refreshList();
          }
        }
        if (attr === 'name') {
          this.sgModel.set('name', value);
          this.setTitle(value);
          this.listView.refreshList();
        }
        if (attr === 'description') {
          this.sgModel.set('description', value);
        }
        return this.refreshDeleteState();
      },
      refreshDeleteState: function() {
        return this.$el.find('.rule-item').each(function() {
          if ($(this).data('id')) {
            return $(this).find('.icon-delete').removeClass('hide');
          } else {
            return $(this).find('.icon-delete').addClass('hide');
          }
        });
      },
      addNewItem: function($lastItem) {
        var $newItem, that;
        that = this;
        if (this.$el.find('input.os-sg-new-input').length <= 1) {
          if ($lastItem.hasClass('rule-item')) {
            return $newItem = $(template.sgNewInput()).insertAfter($lastItem);
          } else {
            return $newItem = $(template.sgNewInput()).appendTo($lastItem);
          }
        }
      },
      removeRule: function(event) {
        var $ruleItem, $target, ruleId;
        $target = $(event.currentTarget);
        $ruleItem = $target.parents('.rule-item');
        ruleId = $ruleItem.data('id');
        if (ruleId) {
          this.sgModel.removeRule(ruleId);
          $ruleItem.remove();
          this.updateCount();
          return this.listView.refreshList();
        }
      },
      setDefaultPort: function(rule, $target) {
        var $port, $ruleContainer, _ref;
        $ruleContainer = $target.parents('.rule-item');
        $port = $ruleContainer.find('input[data-target="port"]');
        $port.removeAttr('disabled');
        if ((_ref = rule.protocol) === 'tcp' || _ref === 'udp') {
          return $port.val('1-65535');
        } else if (rule.protocol === 'icmp') {
          return $port.val('-1/-1');
        } else if (rule.protocol === null) {
          $port.val(this.nullStr);
          return $port.attr('disabled', 'disabled');
        }
      },
      getPortStr: function(min, max) {
        if (min === null || max === null) {
          return '1-65535';
        }
        if (min === max) {
          return min + '';
        } else {
          return min + '-' + max;
        }
      },
      getICMPStr: function(type, code) {
        if (type === null) {
          type = -1;
        }
        if (code === null) {
          code = -1;
        }
        return type + '/' + code;
      },
      getPortRange: function(portStr) {
        var portRange;
        if (portStr === '1-65535') {
          return [null, null];
        }
        portRange = MC.validate.portRange(portStr);
        if (portRange && MC.validate.portValidRange(portRange)) {
          if (portRange[0] === 0) {
            return null;
          }
          if (portRange.length === 1) {
            portRange[1] = portRange[0];
          }
          return portRange;
        } else {
          return null;
        }
      },
      getICMPRange: function(icmpStr) {
        var icmpAry, icmpCode, icmpType;
        icmpAry = icmpStr.split('/');
        if (icmpAry && icmpAry.length === 2) {
          icmpType = Number(icmpAry[0]);
          icmpCode = Number(icmpAry[1]);
          if (!isNaN(icmpType) && !isNaN(icmpCode) && _.isNumber(icmpType) && _.isNumber(icmpCode)) {
            if (icmpType < -1 || icmpType > 255) {
              return null;
            }
            if (icmpCode < -1 || icmpCode > 255) {
              return null;
            }
            if (icmpType === -1) {
              icmpType = null;
            }
            if (icmpCode === -1) {
              icmpCode = null;
            }
            icmpAry[0] = icmpType;
            icmpAry[1] = icmpCode;
            return icmpAry;
          }
        }
        return null;
      },
      getRuleValue: function($target) {
        var $ip, $port, $protocol, $ruleContainer, $ruleItem, direction, ip, port, port_range_max, port_range_min, protocol, sg, sgModel;
        $ruleItem = $target.parents('.rule-item');
        $ruleContainer = $ruleItem.parents('.rule-container');
        $protocol = $ruleItem.find('select[data-target="protocol"]');
        $port = $ruleItem.find('input[data-target="port"]');
        $ip = $ruleItem.find('select[data-target="ip"]');
        protocol = $protocol.getValue();
        port = $port.getValue();
        ip = $ip.getValue();
        if (ip === '0.0.0.0/0' || !ip) {
          ip = null;
        }
        sg = null;
        sgModel = Design.instance().component(ip);
        if (sgModel) {
          sg = sgModel;
          ip = null;
        }
        direction = 'ingress';
        if ($ruleContainer.hasClass('egress')) {
          direction = 'egress';
        }
        if (protocol === 'all') {
          protocol = null;
          port_range_min = null;
          port_range_max = null;
        } else if (protocol === 'icmp') {
          port = this.getICMPRange(port);
          if (port === null) {
            port_range_min = null;
            port_range_max = null;
          } else {
            port_range_min = port[0];
            port_range_max = port[1];
          }
        } else {
          port = this.getPortRange(port);
          if (port === null) {
            port_range_min = null;
            port_range_max = null;
          } else {
            port_range_min = port[0];
            port_range_max = port[1];
          }
        }
        return {
          direction: direction,
          protocol: protocol,
          portMin: port_range_min,
          portMax: port_range_max,
          ip: ip,
          sg: sg
        };
      },
      getRuleStr: function(ruleModel) {
        var direction, ip, port, protocol, rule, ruleData, sgId, sgModel, _ref, _ref1;
        rule = ruleModel.toJSON();
        direction = rule.direction;
        ip = rule.remote_ip_prefix;
        protocol = rule.protocol;
        if (ip === null) {
          ip = '0.0.0.0/0';
        }
        sgModel = ruleModel.get('sg');
        if (sgModel) {
          ip = sgModel.get('name');
          sgId = sgModel.id;
        }
        if ((_ref = rule.protocol) === 'tcp' || _ref === 'udp') {
          port = this.getPortStr(rule.port_range_min, rule.port_range_max);
        } else if ((_ref1 = rule.protocol) === 'icmp') {
          port = this.getICMPStr(rule.port_range_min, rule.port_range_max);
        } else {
          protocol = 'all';
          port = this.nullStr;
        }
        return ruleData = {
          id: ruleModel.id,
          direction: direction,
          protocol: protocol,
          port: port,
          ip: ip,
          sgId: sgId
        };
      },
      removeSG: function(event) {
        var that;
        that = this;
        return bubblePopup($(event.currentTarget), template.sgRemovePopup(), {
          '.confirm': function() {
            that.sgModel.remove();
            that.listView.refreshList();
            return that.listView.hideFloatPanel();
          }
        });
      },
      updateCount: function() {
        var ingressRules, sgRules;
        sgRules = this.sgModel.get('rules');
        ingressRules = _.filter(sgRules, function(ruleModel) {
          return ruleModel.get('direction') === 'ingress';
        });
        this.$el.find('.sg-rule-count').text(sgRules.length);
        this.$el.find('.sg-ingress-count').text(ingressRules.length);
        this.$el.find('.sg-egress-count').text(sgRules.length - ingressRules.length);
        return this.$el.find('.sg-member-count').text(this.sgModel.getMemberList().length);
      },
      focusNewInput: function(event) {
        var $lastItem, $newItem, that;
        that = this;
        $lastItem = $(event.currentTarget);
        $newItem = $(template.newItem()).insertAfter($lastItem);
        if ($newItem) {
          that.initSGList($newItem);
        }
        _.delay(function() {
          return $newItem.find('.selection[data-target="port"]').focus();
        });
        return $lastItem.remove();
      }
    }, {
      handleTypes: ['ossg'],
      handleModes: ['stack', 'appedit', 'app']
    });
  });

}).call(this);
