(function() {
  define(['../base/view', './template/stack', 'i18n!/nls/lang.js', "UI.modalplus"], function(PropertyView, template, lang, modalPlus) {
    var RTBView;
    RTBView = PropertyView.extend({
      events: {
        'REMOVE_ROW  .multi-input': 'removeIp',
        'ADD_ROW     .multi-input': 'processParsley',
        'BEFORE_REMOVE_ROW  .multi-input': 'beforeRemoveIp',
        'change #rt-name': 'changeName',
        'click #set-main-rt': 'setMainRT',
        'change .propagation': 'changePropagation',
        "focus .ipt-wrapper .input": 'onFocusCIDR',
        "keypress .ipt-wrapper .input": 'onPressCIDR',
        "blur .ipt-wrapper .input": 'onBlurCIDR',
        'change #property-res-desc': 'onChangeDescription',
        'click .remove-vpc-peer-route a': 'onRemoveVPCPeerRoute'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.title;
      },
      onChangeDescription: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      processParsley: function(event) {
        $(event.currentTarget).find('input').last().focus().removeClass('parsley-validated').removeClass('parsley-error').next('.parsley-error-list').remove();
        return null;
      },
      beforeRemoveIp: function(event) {
        var $nonEmptyInputs;
        $nonEmptyInputs = $(event.currentTarget).find("input").filter(function() {
          return this.value.length;
        });
        if ($nonEmptyInputs.length <= 1 && event.value) {
          return false;
        }
        return null;
      },
      removeIp: function(event) {
        var $target, newIps;
        $target = $(event.currentTarget);
        newIps = _.map($target.find("input"), function(input) {
          return input.value;
        });
        this.model.setRoutes($target.attr("data-ref"), _.uniq(newIps));
        return null;
      },
      changeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Route Table")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      setMainRT: function() {
        if (this.model.isAppEdit) {
          this.model.setMainRT();
          this.render();
        } else {
          $("#set-main-rt").hide().parent().find("p").show();
          this.model.setMainRT();
        }
        return null;
      },
      changePropagation: function(event) {
        this.model.setPropagation($(event.target).is(":checked"));
        return null;
      },
      onPressCIDR: function(event) {
        if (event.keyCode === 13) {
          return $(event.currentTarget).blur();
        }
      },
      onFocusCIDR: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurCIDR: function(event) {
        var allCidrAry, cidr, dataRef, descContent, dialog_template, idx, inputElem, inputValue, ips, mainContent, modal, parentElem, that, _i, _len, _ref;
        inputElem = $(event.currentTarget);
        inputValue = inputElem.val();
        parentElem = inputElem.closest(".multi-input");
        dataRef = parentElem.attr("data-ref");
        ips = [];
        parentElem.find("input").each(function() {
          if (this !== event.currentTarget && this.value) {
            ips.push(this.value);
          }
          return null;
        });
        allCidrAry = _.uniq(ips);
        parentElem.closest("li").siblings().each(function() {
          var otherGroupIps;
          otherGroupIps = [];
          $(this).find("input").each(function() {
            if (this.value) {
              otherGroupIps.push(this.value);
            }
            return null;
          });
          allCidrAry = allCidrAry.concat(_.uniq(otherGroupIps));
          return null;
        });
        if (!inputValue) {
          if (inputElem.closest('.multi-ipt-row').siblings().length === 0) {
            mainContent = lang.PROP.RTB_CIDR_BLOCK_REQUIRED;
            descContent = lang.PROP.RTB_CIDR_BLOCK_REQUIRED_DESC;
          }
        } else if (!MC.validate('cidr', inputValue)) {
          mainContent = sprintf(lang.PROP.RTB_CIDR_BLOCK_INVALID, inputValue);
          descContent = lang.PROP.RTB_CIDR_BLOCK_INVALID_DESC;
        } else {
          for (idx = _i = 0, _len = allCidrAry.length; _i < _len; idx = ++_i) {
            cidr = allCidrAry[idx];
            if (inputValue === cidr) {
              mainContent = sprintf(lang.PROP.RTB_CIDR_BLOCK_CONFLICTS, inputValue);
              descContent = lang.PROP.RTB_CIDR_BLOCK_CONFLICTS_DESC;
              break;
            }
            if (idx === 0 && cidr !== "0.0.0.0/0" && this.model.isCidrConflict(inputValue, cidr)) {
              mainContent = sprintf(lang.PROP.RTB_CIDR_BLOCK_CONFLICTS_LOCAL, inputValue);
              descContent = lang.PROP.RTB_CIDR_BLOCK_CONFLICTS_LOCAL_DESC;
              break;
            }
          }
        }
        if (!mainContent) {
          if (inputValue) {
            ips.push(inputValue);
          }
          this.model.setRoutes(dataRef, _.uniq(ips));
          this.disabledAllOperabilityArea(false);
          return;
        }
        dialog_template = MC.template.setupCIDRConfirm({
          remove_content: lang.PROP.REMOVE_ROUTE,
          main_content: mainContent,
          desc_content: descContent
        });
        that = this;
        if (!((_ref = this.modal) != null ? _ref.isOpen() : void 0)) {
          this.modal = new modalPlus({
            title: lang.IDE.SET_UP_CIDR_BLOCK,
            width: 420,
            template: dialog_template,
            confirm: {
              text: "OK",
              color: "blue"
            },
            disableClose: true,
            cancel: {
              hide: true
            }
          });
          modal = this.modal;
          $("<a id=\"cidr-removed\" class=\"link-red left link-modal-danger\">" + lang.PROP.REMOVE_ROUTE + "</a>").appendTo(modal.find(".modal-footer"));
          modal.on("confirm", function() {
            return modal.close();
          });
          modal.on("close", function() {
            return inputElem.focus();
          });
          return modal.find("#cidr-removed").on("click", function() {
            Design.instance().component(dataRef).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        }
      },
      onRemoveVPCPeerRoute: function(event) {
        var $li;
        $li = $(event.currentTarget).parents('li');
        this.model.removeRoute($li.find('.route-readonly').attr('data-ref'));
        $li.remove();
        return null;
      }
    });
    return new RTBView();
  });

}).call(this);
