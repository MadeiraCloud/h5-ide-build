(function() {
  define(['../base/view', 'Design', 'constant', './template/stack', './template/rule_item', './template/dialog', 'i18n!/nls/lang.js', 'UI.modalplus'], function(PropertyView, Design, constant, htmlTpl, ruleTpl, rulePopupTpl, lang, modalPlus) {
    var ACLView;
    ACLView = PropertyView.extend({
      events: {
        'change #property-acl-name': 'aclNameChanged',
        'click #acl-add-rule-icon': 'showCreateRuleModal',
        'OPTION_CHANGE #acl-sort-rule-select': 'sortAclRule',
        'click .acl-rule-details .rule-remove-icon': 'removeAclRule'
      },
      render: function() {
        this.$el.html(htmlTpl(this.model.attributes));
        this.refreshRuleList();
        return this.model.attributes.name;
      },
      aclNameChanged: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "ACL")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      sortAclRule: function(event) {
        var sg_rule_list, sortType;
        sg_rule_list = $('#acl-rule-list');
        sortType = $(event.target).find('.selected').attr('data-id');
        this.model.setSortOption(sortType);
        this.refreshRuleList();
        return null;
      },
      refreshRuleList: function() {
        $('#acl-rule-list').html(ruleTpl(this.model.attributes.rules));
        $('#acl-rule-count').text(this.model.attributes.rules.length);
        return null;
      },
      removeAclRule: function(event) {
        var $target, ruleId;
        $target = $(event.currentTarget).closest("li");
        ruleId = $target.attr("data-uid");
        if (this.model.removeAclRule(ruleId)) {
          $target.remove();
        }
        return null;
      },
      showCreateRuleModal: function() {
        var SubnetModel, data;
        SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
        data = {
          classic: false,
          subnets: _.map(SubnetModel.allObjects(), function(subnet) {
            return {
              name: subnet.get("name"),
              cidr: subnet.get("cidr")
            };
          })
        };
        new modalPlus({
          title: lang.IDE.POP_ACLRULE_TITLE_ADD,
          width: 450,
          template: rulePopupTpl(data),
          confirm: {
            text: lang.IDE.POP_ACLRULE_BTN_SAVE
          },
          compact: true
        }).on("confirm", _.bind(this.saveRule, this)).tpl.attr("id", "modal-acl-rule");
        $("#acl-add-model-source-select").on("OPTION_CHANGE", this.modalRuleSourceSelected);
        $("#modal-protocol-select").on("OPTION_CHANGE", this.modalRuleProtocolSelected);
        $("#protocol-icmp-main-select").on("OPTION_CHANGE", this.modalRuleICMPSelected);
        $("#acl-add-model-direction-outbound").on("change", this.changeBoundInModal);
        $("#acl-add-model-direction-inbound").on("change", this.changeBoundInModal);
        $('.simple-protocol-select li').on('click', this.clickSimpleProtocolSelect);
        return false;
      },
      saveRule: function() {
        var $custom_source_dom, $protocol_dom, $rule_number_dom, icmpCode, icmpType, needValidate, number, port, protocol, result, source, validateMap;
        $rule_number_dom = $('#modal-acl-number');
        number = $('#modal-acl-number').val();
        result = this.model.checkRuleNumber(number);
        $rule_number_dom.parsley('custom', function(val) {
          if (_.isString(result)) {
            return result;
          } else {
            return null;
          }
        });
        if (!$rule_number_dom.parsley('validate')) {
          return;
        }
        source = $('#acl-add-model-source-select').find('.selected').attr('data-id');
        if (source === "custom") {
          $custom_source_dom = $('#modal-acl-source-input');
          $custom_source_dom.parsley('custom', function(val) {
            if (!MC.validate('cidr', val)) {
              return lang.PARSLEY.MUST_BE_CIDR_BLOCK;
            }
            return null;
          });
          if (!$custom_source_dom.parsley('validate')) {
            return;
          }
          source = $custom_source_dom.val();
        }
        $protocol_dom = $('#modal-protocol-select').find('.selected');
        protocol = $protocol_dom.attr('data-id');
        validateMap = {
          'tcp': {
            dom: $('#sg-protocol-tcp input'),
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return 'Must be a valid format of port range.';
              }
              if (!MC.validate.portValidRange(portAry)) {
                return 'Port range needs to be a number or a range of numbers between 0 and 65535.';
              }
              return null;
            }
          },
          'udp': {
            dom: $('#sg-protocol-udp input'),
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return 'Must be a valid format of port range.';
              }
              if (!MC.validate.portValidRange(portAry)) {
                return 'Port range needs to be a number or a range of numbers between 0 and 65535.';
              }
              return null;
            }
          },
          'custom': {
            dom: $('#sg-protocol-custom input'),
            method: function(val) {
              if (!MC.validate.port(val)) {
                return 'Must be a valid format of port.';
              }
              return null;
            }
          }
        };
        if (validateMap[protocol]) {
          needValidate = validateMap[protocol];
          needValidate.dom.parsley('custom', needValidate.method);
          if (!needValidate.dom.parsley('validate')) {
            return;
          }
        }
        if (protocol === 'tcp') {
          port = $('#sg-protocol-' + protocol + ' input').val();
          protocol = "6";
        } else if (protocol === 'udp') {
          port = $('#sg-protocol-' + protocol + ' input').val();
          protocol = '17';
        } else if (protocol === 'icmp') {
          icmpType = $('#protocol-icmp-main-select').find('.selected').attr('data-id');
          icmpCode = $('#protocol-icmp-sub-select-' + icmpType).find('.selected').attr('data-id') || "-1";
          protocol = '1';
          port = icmpType + "/" + icmpCode;
        } else if (protocol === 'custom') {
          protocol = $('#sg-protocol-' + protocol + ' input').val();
          port = "";
        } else if (protocol === 'all') {
          protocol = '-1';
          port = '';
        }
        this.model.addAclRule({
          number: number,
          action: $('#acl-add-model-action-allow').is(':checked') ? "allow" : "deny",
          egress: $('#acl-add-model-direction-outbound').is(':checked'),
          cidr: source,
          protocol: protocol,
          port: port
        });
        modal.close();
        return null;
      },
      modalRuleSourceSelected: function(event) {
        var value;
        value = $.trim($(event.target).find('.selected').attr('data-id'));
        if (value === 'custom') {
          $('#modal-acl-source-input').show();
          return $('#acl-add-model-source-select .selection').width(68);
        } else {
          $('#modal-acl-source-input').hide();
          return $('#acl-add-model-source-select .selection').width(322);
        }
      },
      modalRuleProtocolSelected: function(event) {
        var icmpSelectElem, icmpSelectedValue, protocolSelectElem, selectedValue;
        protocolSelectElem = $(event.target);
        selectedValue = protocolSelectElem.find('.selected').attr('data-id');
        if (selectedValue) {
          $('#sg-protocol-custom').hide();
          $('#sg-protocol-all').hide();
          $('#sg-protocol-select-result .sg-protocol-option-input').hide();
          $('#sg-protocol-' + selectedValue).show();
          icmpSelectElem = $('#protocol-icmp-main-select');
          icmpSelectedValue = icmpSelectElem.find('.selected').attr('data-id');
          if (icmpSelectedValue !== '3' && icmpSelectedValue !== '5' && icmpSelectedValue !== '11' && icmpSelectedValue !== '12') {
            $('.protocol-icmp-sub-select').hide();
          }
        }
        return null;
      },
      modalRuleICMPSelected: function(event) {
        var icmpSelectElem, selectedValue, subSelectElem;
        icmpSelectElem = $(event.target);
        selectedValue = icmpSelectElem.find('.selected').attr('data-id');
        subSelectElem = $('#protocol-icmp-sub-select-' + selectedValue);
        $('.protocol-icmp-sub-select').hide();
        subSelectElem.show();
        return null;
      },
      changeBoundInModal: function(event) {
        var inbound;
        inbound = $('#acl-add-model-direction-inbound').prop('checked');
        if (inbound) {
          return $('#acl-add-model-bound-label').text(lang.IDE.POP_ACLRULE_LBL_SOURCE);
        } else {
          return $('#acl-add-model-bound-label').text(lang.IDE.POP_ACLRULE_LBL_DEST);
        }
      },
      clickSimpleProtocolSelect: function(event) {
        var protocolMap, protocolName, protocolPort, toggleToProtocol;
        protocolName = $(event.currentTarget).text();
        toggleToProtocol = function(protocolName) {
          var protocolNameLowerCase, selectBox;
          protocolNameLowerCase = protocolName.toLowerCase();
          selectBox = $('#modal-protocol-select');
          selectBox.find('li.item').removeClass('selected');
          selectBox.find('li.item[data-id=' + protocolNameLowerCase + ']').addClass('selected');
          selectBox.find('.selection').text(protocolName);
          return selectBox.trigger('OPTION_CHANGE');
        };
        protocolMap = {
          'SSH': 22,
          'SMTP': 25,
          'DNS': 53,
          'HTTP': 80,
          'POP3': 110,
          'IMAP': 143,
          'LDAP': 289,
          'HTTPS': 443,
          'SMTPS': 465,
          'IMAPS': 993,
          'POP3S': 995,
          'MS SQL': 1433,
          'MYSQL': 3306,
          'RDP': 3389
        };
        protocolPort = protocolMap[protocolName];
        if (protocolName === 'DNS') {
          toggleToProtocol('UDP');
          return $('#sg-protocol-udp input').val(protocolPort);
        } else {
          toggleToProtocol('TCP');
          return $('#sg-protocol-tcp input').val(protocolPort);
        }
      }
    });
    return new ACLView();
  });

}).call(this);
