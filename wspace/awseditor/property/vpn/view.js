(function() {
  define(['../base/view', './template/stack', 'i18n!/nls/lang.js', "UI.modalplus"], function(PropertyView, template, lang, modalPlus) {
    var VPNView;
    VPNView = PropertyView.extend({
      events: {
        "BEFORE_REMOVE_ROW #property-vpn-ips": 'beforeRemoveIP',
        "REMOVE_ROW #property-vpn-ips": 'removeIP',
        "ADD_ROW #property-vpn-ips": 'addIP',
        "focus #property-vpn-ips input": 'onFocusCIDR',
        "keypress #property-vpn-ips input": 'onPressCIDR',
        "blur #property-vpn-ips input": 'onBlurCIDR'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      },
      addIP: function() {
        $("#property-vpn-ips input").last().focus();
        return null;
      },
      beforeRemoveIP: function(event) {
        var nonEmptyInputs;
        if (event.value) {
          nonEmptyInputs = $("#property-vpn-ips").find("input").filter(function() {
            return this.value.length > 0;
          });
          if (nonEmptyInputs.length < 2) {
            event.preventDefault();
          }
        }
        return null;
      },
      removeIP: function(event, ip) {
        var ips;
        if (!ip) {
          return;
        }
        ips = [];
        $("#property-vpn-ips input").each(function() {
          return ips.push($(this).val());
        });
        this.model.updateIps(ips);
        return null;
      },
      onPressCIDR: function(event) {
        if (event.keyCode === 13) {
          $(event.currentTarget).blur();
        }
        return null;
      },
      onFocusCIDR: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurCIDR: function(event) {
        var allCidrAry, cidr, descContent, dialog_template, inputElem, inputValue, ips, mainContent, modal, that, _i, _len, _ref;
        inputElem = $(event.currentTarget);
        inputValue = inputElem.val();
        ips = [];
        $("#property-vpn-ips input").each(function() {
          if (this.value) {
            ips.push(this.value);
          }
          return null;
        });
        allCidrAry = _.uniq(ips);
        if (!inputValue) {
          if (inputElem.parents('.multi-ipt-row').siblings().length === 0) {
            mainContent = lang.PROP.VPN_BLUR_CIDR_REQUIRED;
            descContent = lang.PROP.VPN_BLUR_CIDR_REQUIRED_DESC;
          }
        } else if (!MC.validate('cidr', inputValue)) {
          mainContent = sprintf(lang.PROP.VPN_BLUR_CIDR_NOT_VALID_IP, inputValue);
          descContent = lang.PROP.VPN_BLUR_CIDR_NOT_VALID_IP_DESC;
        } else {
          for (_i = 0, _len = allCidrAry.length; _i < _len; _i++) {
            cidr = allCidrAry[_i];
            if (cidr !== inputValue && this.model.isCidrConflict(inputValue, cidr)) {
              mainContent = sprintf(lang.PROP.VPN_BLUR_CIDR_CONFLICTS_IP, inputValue);
              descContent = lang.PROP.VPN_BLUR_CIDR_CONFLICTS_IP_DESC;
              break;
            }
          }
        }
        if (!mainContent) {
          this.model.updateIps(allCidrAry);
          this.disabledAllOperabilityArea(false);
          return;
        }
        if (!((_ref = this.modal) != null ? _ref.isOpen() : void 0)) {
          dialog_template = MC.template.setupCIDRConfirm({
            remove_content: lang.PROP.VPN_REMOVE_CONNECTION,
            main_content: mainContent,
            desc_content: descContent
          });
          that = this;
          this.modal = new modalPlus({
            title: lang.IDE.VPN_REMOVE_CONNECTION,
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
          $("<a id=\"cidr-removed\" class=\"link-red left link-modal-danger\">" + lang.PROP.VPN_REMOVE_CONNECTION + "</a>").appendTo(modal.find(".modal-footer"));
          modal.on("confirm", function() {
            return modal.close();
          });
          modal.on("close", function() {
            return inputElem.focus();
          });
          return modal.find("#cidr-removed").on("click", function() {
            Design.instance().component(that.model.get("uid")).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        }
      }
    });
    return new VPNView();
  });

}).call(this);
