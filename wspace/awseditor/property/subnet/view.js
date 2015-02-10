(function() {
  define(['../base/view', './template/stack', './template/acl', 'event', "Design", 'i18n!/nls/lang.js', "UI.modalplus"], function(PropertyView, template, acl_template, ide_event, Design, lang, modalPlus) {
    var SubnetView;
    SubnetView = PropertyView.extend({
      events: {
        "change #property-subnet-name": 'onChangeName',
        "change #property-res-desc": 'onChangeDesc',
        "focus #property-cidr-block": 'onFocusCIDR',
        "keypress #property-cidr-block": 'onPressCIDR',
        "blur #property-cidr-block": 'onBlurCIDR',
        'click #networkacl-create': 'createAcl',
        'click .icon-btn-details': 'openAcl',
        "click .ppty-acl-cb": 'changeAcl',
        'click .sg-list-delete-btn': 'deleteAcl'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.refreshACLList();
        return this.model.attributes.name;
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Subnet")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      onChangeDesc: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      onPressCIDR: function(event) {
        if (event.keyCode === 13) {
          $('#property-cidr-block').blur();
        }
        return null;
      },
      onFocusCIDR: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurCIDR: function(event) {
        var cidrModal, cidrPrefix, cidrSuffix, descContent, error, inputElem, mainContent, modal, removeInfo, subnetCIDR, that, _ref;
        inputElem = $(event.currentTarget);
        cidrPrefix = $("#property-cidr-prefix").html();
        cidrSuffix = $("#property-cidr-block").val();
        subnetCIDR = cidrPrefix + cidrSuffix;
        removeInfo = lang.PROP.REMOVE_SUBNET;
        if (!cidrSuffix) {
          mainContent = lang.PROP.SUBNET_CIDR_VALIDATION_REQUIRED;
          descContent = lang.PROP.SUBNET_CIDR_VALIDATION_REQUIRED_DESC;
        } else if (!MC.validate('cidr', subnetCIDR)) {
          mainContent = sprintf(lang.PROP.SUBNET_CIDR_VALIDATION_INVALID, subnetCIDR);
          descContent = sprintf(lang.PROP.SUBNET_CIDR_VALIDATION_INVALID_DESC);
        } else {
          error = this.model.isValidCidr(subnetCIDR);
          if (error !== true) {
            mainContent = error.error;
            descContent = error.detail;
            if (error.shouldRemove === false) {
              removeInfo = "";
            }
          }
        }
        if (mainContent) {
          if (!((_ref = this.modal) != null ? _ref.isOpen() : void 0)) {
            that = this;
            cidrModal = MC.template.setupCIDRConfirm({
              main_content: mainContent,
              desc_content: descContent,
              remove_content: removeInfo
            });
            this.modal = new modalPlus({
              title: lang.IDE.SET_UP_CIDR_BLOCK,
              width: 420,
              template: cidrModal,
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
            $("<a id=\"cidr-removed\" class=\"link-red left link-modal-danger\">" + removeInfo + "</a>").appendTo(modal.find(".modal-footer"));
            modal.on("close", function() {
              return inputElem.focus();
            });
            modal.on("confirm", function() {
              return modal.close();
            });
            return modal.find("#cidr-removed").on("click", function() {
              Design.instance().component(that.model.get("uid")).remove();
              that.disabledAllOperabilityArea(false);
              return modal.close();
            });
          }
        } else {
          this.model.setCidr(subnetCIDR);
          return this.disabledAllOperabilityArea(false);
        }
      },
      createAcl: function() {
        return this.trigger("OPEN_ACL", this.model.createAcl());
      },
      openAcl: function(event) {
        var id;
        id = $(event.currentTarget).closest("li").attr("data-uid");
        this.trigger("OPEN_ACL", id);
        return null;
      },
      deleteAcl: function(event) {
        var $target, aclName, aclUID, assoCont, dialog_template, modal, that;
        $target = $(event.currentTarget);
        assoCont = parseInt($target.attr('data-count'), 10);
        aclUID = $target.closest("li").attr('data-uid');
        if (assoCont) {
          that = this;
          aclName = $target.attr('data-name');
          dialog_template = MC.template.modalDeleteSGOrACL({
            title: lang.IDE.TITLE_DELETE_NETWORK_ACL,
            main_content: sprintf(lang.PROP.STACK_DELETE_NETWORK_ACL_CONTENT, aclName),
            desc_content: sprintf(lang.PROP.STACK_DELETE_NETWORK_ACL_DESC, aclName)
          });
          modal = new modalPlus({
            title: lang.PROP.TITLE_DELETE_NETWORK_ACL,
            width: 420,
            template: dialog_template,
            confirm: {
              text: lang.PROP.LBL_DELETE,
              color: "red"
            }
          });
          return modal.on("confirm", function() {
            that.model.removeAcl(aclUID);
            that.refreshACLList();
            return modal.close();
          });
        } else {
          this.model.removeAcl(aclUID);
          return this.refreshACLList();
        }
      },
      changeAcl: function(event) {
        this.model.setACL($(event.currentTarget).closest("li").attr("data-uid"));
        return this.refreshACLList();
      },
      refreshACLList: function() {
        this.model.init(this.model.get('uid'));
        return $('#networkacl-list').html(acl_template(this.model.attributes));
      }
    });
    return new SubnetView();
  });

}).call(this);
