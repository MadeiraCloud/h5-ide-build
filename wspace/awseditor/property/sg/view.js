(function() {
  define(['../base/view', './template/stack', './template/app', 'constant', 'i18n!/nls/lang.js', "UI.modalplus"], function(PropertyView, template, app_template, constant, lang, modalPlus) {
    var SgView;
    SgView = PropertyView.extend({
      events: {
        'click #sg-add-rule-icon': 'showCreateRuleModal',
        'click .sg-rule-delete': 'removeRulefromList',
        'change #securitygroup-name': 'setSGName',
        'change #securitygroup-description': 'setSGDescription',
        'OPTION_CHANGE #sg-rule-filter-select': 'sortSgRule'
      },
      render: function() {
        var tpl;
        tpl = this.model.isReadOnly ? app_template : template;
        this.$el.html(tpl(this.model.toJSON()));
        this.refreshSgruleList();
        this.setTitle(this.model.get("name"));
        this.prependTitle('<span class="sg-color" style="background-color:' + this.model.get("color") + '" ></span>');
        this.forceShow();
        setTimeout(function() {
          return $('#securitygroup-name').focus();
        }, 200);
        return this.model.get("name");
      },
      refreshSgruleList: function() {
        var rules;
        rules = this.model.get('rules');
        rules.deletable = this.model.get('ruleEditable');
        return $('#sg-rule-list').html(MC.template.sgRuleList(rules));
      },
      showCreateRuleModal: function(event) {
        var self;
        self = this;
        this.modal = new modalPlus({
          title: lang.IDE.POP_SGRULE_TITLE_ADD,
          template: MC.template.modalSGRule(self.model.createSGRuleData()),
          confirm: {
            text: lang.IDE.POP_SGRULE_BTN_SAVE
          }
        });
        this.modal.tpl.attr("id", "modal-sg-rule");
        this.modal.on("confirm", self.saveSgModal.bind(self));
        $("#sg-modal-direction").on("click", "input", this.radioSgModalChange);
        $("#modal-protocol-select").on("OPTION_CHANGE", this.sgModalSelectboxChange);
        $("#protocol-icmp-main-select").on("OPTION_CHANGE", this.icmpMainSelect);
        $("#sg-protocol-select-result").on("OPTION_CHANGE", ".protocol-icmp-sub-select", this.icmpSubSelect);
        $("#sg-add-model-source-select").on("OPTION_CHANGE", this.modalRuleSourceSelected);
        return false;
      },
      radioSgModalChange: function(event) {
        if ($('#sg-modal-direction input:checked').val() === "inbound") {
          return $('#rule-modal-ip-range').text(lang.IDE.POP_ACLRULE_LBL_SOURCE);
        } else {
          return $('#rule-modal-ip-range').text(lang.IDE.POP_ACLRULE_LBL_DEST);
        }
      },
      sgModalSelectboxChange: function(event, id) {
        $('#sg-protocol-select-result').find('.show').removeClass('show');
        $('.sg-protocol-option-input').removeClass("show");
        $('#sg-protocol-' + id).addClass('show');
        $('.protocol-icmp-sub-select').removeClass('shown');
        $('#modal-protocol-select').data('protocal-type', id);
        return null;
      },
      icmpMainSelect: function(event, id) {
        $("#protocol-icmp-main-select").data('protocal-main', id);
        if (id === "3" || id === "5" || id === "11" || id === "12") {
          $('.protocol-icmp-sub-select').removeClass('shown');
          return $('#protocol-icmp-sub-select-' + id).addClass('shown');
        } else {
          return $('.protocol-icmp-sub-select').removeClass('shown');
        }
      },
      icmpSubSelect: function(event, id) {
        return $("#protocol-icmp-main-select").data('protocal-sub', id);
      },
      modalRuleSourceSelected: function(event) {
        var isCustom, value;
        value = $.trim($(event.target).find('.selected').attr('data-id'));
        isCustom = value === 'custom';
        $('#securitygroup-modal-description').toggle(isCustom);
        $('#sg-add-model-source-select .selection').width(isCustom ? 69 : 322);
        return null;
      },
      setSGName: function(event) {
        var name, oldName, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "SG")) {
          oldName = this.model.get("name");
          this.model.setName(name);
          this.setTitle(this.model.get("name"));
          this.prependTitle('<span class="sg-color" style="background-color:' + this.model.get("color") + '" ></span>');
          $("#sg-rule-list").children().find(".rule-reference").each(function() {
            if ($(this).text() === oldName) {
              $(this).html(title);
            }
          });
        }
        return null;
      },
      setSGDescription: function(event) {
        this.model.setDescription(event.target.value);
        return null;
      },
      sortSgRule: function(event) {
        this.model.sortSGRule($(event.target).find('.selected').attr('data-id'));
        this.refreshSgruleList();
        return null;
      },
      removeRulefromList: function(event) {
        var li_dom, rule, ruleCount;
        li_dom = $(event.target).closest('li');
        rule = {
          ruleSetId: li_dom.attr('data-uid'),
          port: li_dom.attr('data-port'),
          protocol: li_dom.attr('data-protocol'),
          direction: li_dom.attr('data-direction'),
          relation: li_dom.attr("data-relationid")
        };
        li_dom.remove();
        ruleCount = $("#sg-rule-list").children().length;
        $("#rule-count").text(ruleCount);
        this.model.removeRule(rule);
        return false;
      },
      saveSgModal: function(event) {
        var custom_protocal_dom, descrition_dom, needValidate, ports, protocol_type, protocol_val, protocol_val_sub, result, rule, sg_direction, sourceValue, tcp_port_dom, udp_port_dom, validateMap;
        sg_direction = $('#sg-modal-direction input:checked').val();
        descrition_dom = $('#securitygroup-modal-description');
        tcp_port_dom = $('#sg-protocol-tcp input');
        udp_port_dom = $('#sg-protocol-udp input');
        custom_protocal_dom = $('#sg-protocol-custom input');
        protocol_type = $('#modal-protocol-select').data('protocal-type');
        sourceValue = $.trim($('#sg-add-model-source-select').find('.selected').attr('data-id'));
        validateMap = {
          'custom': {
            dom: custom_protocal_dom,
            method: function(val) {
              if (!MC.validate.portRange(val)) {
                return lang.PARSLEY.MUST_BE_A_VALID_FORMAT_OF_NUMBER;
              }
              if (Number(val) < 0 || Number(val) > 255) {
                return lang.PARSLEY.THE_PROTOCOL_NUMBER_RANGE_MUST_BE_0_255;
              }
              return null;
            }
          },
          'tcp': {
            dom: tcp_port_dom,
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return lang.PARSLEY.MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
              }
              if (!MC.validate.portValidRange(portAry)) {
                return lang.PARSLEY.PORT_RANGE_BETWEEN_0_65535;
              }
              return null;
            }
          },
          'udp': {
            dom: udp_port_dom,
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return lang.PARSLEY.MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
              }
              if (!MC.validate.portValidRange(portAry)) {
                return lang.PARSLEY.PORT_RANGE_BETWEEN_0_65535;
              }
              return null;
            }
          }
        };
        if (protocol_type in validateMap) {
          needValidate = validateMap[protocol_type];
          needValidate.dom.parsley('custom', needValidate.method);
        }
        descrition_dom.parsley('custom', function(val) {
          if (!MC.validate('cidr', val)) {
            return lang.PARSLEY.MUST_BE_CIDR_BLOCK;
          }
          return null;
        });
        if ((sourceValue === 'custom' && (!descrition_dom.parsley('validate'))) || (needValidate && !needValidate.dom.parsley('validate'))) {
          return;
        }
        rule = {
          protocol: protocol_type,
          direction: sg_direction || "inbound",
          fromPort: "",
          toPort: ""
        };
        switch (protocol_type) {
          case "tcp":
          case "udp":
            ports = $('#sg-protocol-' + protocol_type + ' input').val().split('-');
            rule.fromPort = ports[0].trim();
            if (ports.length >= 2) {
              rule.toPort = ports[1].trim();
            }
            break;
          case "icmp":
            protocol_val = $("#protocol-icmp-main-select").data('protocal-main');
            protocol_val_sub = $("#protocol-icmp-main-select").data('protocal-sub');
            rule.fromPort = protocol_val;
            rule.toPort = protocol_val_sub;
            break;
          case "custom":
            rule.protocol = $('#sg-protocol-custom input').val();
        }
        if (sourceValue === 'custom') {
          rule.relation = descrition_dom.val();
        } else {
          rule.relation = "@" + $('#sg-add-model-source-select').find('li.selected').attr("data-uid");
        }
        result = this.model.addRule(rule);
        if (!result) {
          return notification('warning', lang.NOTIFY.THE_ADDING_RULE_ALREADY_EXIST);
        } else {
          this.refreshSgruleList();
          return this.modal.close();
        }
      }
    });
    return new SgView();
  });

}).call(this);
