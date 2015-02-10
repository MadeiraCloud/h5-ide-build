(function() {
  define(['i18n!/nls/lang.js', '../base/view', './template/stack', 'constant', "Design", 'UI.modalplus'], function(lang, PropertyView, template, constant, Design, modalPlus) {
    var CGWView;
    CGWView = PropertyView.extend({
      events: {
        "click #property-cgw .cgw-routing input": 'onChangeRouting',
        "change #property-cgw-bgp": 'onChangeBGP',
        "change #property-cgw-name": 'onChangeName',
        "focus #property-cgw-ip": 'onFocusIP',
        "keypress #property-cgw-ip": 'onPressIP',
        "blur #property-cgw-ip": 'onBlurIP',
        'change #property-res-desc': 'onChangeDescription'
      },
      render: function() {
        this.$el.html(template(this.model.toJSON()));
        return this.model.get('name');
      },
      onChangeDescription: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      onChangeRouting: function() {
        $('#property-cgw-bgp-wrapper').toggle($('#property-routing-dynamic').is(':checked'));
        return this.model.setBGP("");
      },
      onChangeBGP: function(event) {
        var $target, region;
        $target = $(event.currentTarget);
        region = Design.instance().region();
        if (!$target.val()) {
          this.model.setBGP("");
          return;
        }
        $target.parsley('custom', function(val) {
          val = +val;
          if (val < 1 || val > 65534) {
            return lang.PARSLEY.MUST_BE_BETWEEN_1_AND_65534;
          }
          if (val === 7224 && region === 'us-east-1') {
            return lang.PARSLEY.ASN_NUMBER_7224_RESERVED;
          }
          if (val === 9059 && region === 'eu-west-1') {
            return lang.PARSLEY.ASN_NUMBER_9059_RESERVED_IN_IRELAND;
          }
        });
        if ($target.parsley('validate')) {
          this.model.setBGP($target.val());
        }
        return null;
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Customer Gateway")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      onPressIP: function(event) {
        if (event.keyCode === 13) {
          return $('#property-cgw-ip').blur();
        }
      },
      onFocusIP: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurIP: function(event) {
        var descContent, dialog_template, haveError, ipAddr, mainContent, modal, that, _ref;
        ipAddr = $('#property-cgw-ip').val();
        haveError = true;
        if (!ipAddr) {
          mainContent = lang.PROP.CGW_IP_VALIDATE_REQUIRED;
          descContent = lang.PROP.CGW_IP_VALIDATE_REQUIRED_DESC;
        } else if (!MC.validate('ipv4', ipAddr)) {
          mainContent = sprintf(lang.PROP.CGW_IP_VALIDATE_INVALID, ipAddr);
          descContent = lang.PROP.CGW_IP_VALIDATE_INVALID_DESC;
        } else if (MC.aws.aws.isValidInIPRange(ipAddr, 'private')) {
          mainContent = sprintf(lang.PROP.CGW_IP_VALIDATE_INVALID_CUSTOM, ipAddr);
          descContent = lang.PROP.CGW_IP_VALIDATE_INVALID_CUSTOM_DESC;
        } else {
          haveError = false;
        }
        if (!haveError) {
          this.model.setIP(event.target.value);
          this.disabledAllOperabilityArea(false);
          return;
        }
        if (!((_ref = this.modal) != null ? _ref.isOpen() : void 0)) {
          dialog_template = MC.template.setupCIDRConfirm({
            remove_content: lang.PROP.CGW_REMOVE_CUSTOM_GATEWAY,
            main_content: mainContent,
            desc_content: descContent
          });
          that = this;
          this.modal = new modalPlus({
            template: dialog_template,
            title: lang.IDE.SET_UP_CIDR_BLOCK,
            disableClose: true,
            width: 420,
            confirm: {
              text: "OK",
              color: "blue"
            },
            cancel: {
              hide: true
            }
          });
          modal = this.modal;
          $("<a id=\"cidr-removed\" class=\"link-red left link-modal-danger\">" + lang.PROP.CGW_REMOVE_CUSTOM_GATEWAY + "</a>").appendTo(modal.find(".modal-footer"));
          modal.on("confirm", function() {
            return modal.close();
          });
          modal.on("close", function() {
            return $('#property-cgw-ip').focus();
          });
          return modal.find("#cidr-removed").on("click", function(e) {
            e.preventDefault();
            console.log("Not Work.....");
            Design.instance().component(that.model.get("uid")).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        }
      }
    });
    return new CGWView();
  });

}).call(this);
