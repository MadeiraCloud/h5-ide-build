(function() {
  define(['../base/view', './template/stack', './template/acl', './template/sub', 'event', 'i18n!/nls/lang.js'], function(PropertyView, template, acl_template, sub_template, ide_event, lang) {
    var StackView;
    StackView = PropertyView.extend({
      events: {
        'change #property-stack-name': 'stackNameChanged',
        'change #property-stack-description': 'stackDescriptionChanged',
        'change #property-app-name': 'changeAppName',
        'click #stack-property-new-acl': 'createAcl',
        'click #stack-property-acl-list .edit': 'openAcl',
        'click .acl-info-list .sg-list-delete-btn': 'deleteAcl',
        'click #property-app-resdiff': 'toggleResDiff'
      },
      render: function() {
        var title;
        if (this.model.isApp || this.model.isAppEdit) {
          title = "App - " + (this.model.get('name'));
        } else {
          title = "Stack - " + (this.model.get('name'));
        }
        this.$el.html(template(this.model.attributes));
        if (title) {
          this.setTitle(title);
        }
        this.refreshACLList();
        if (this.model.isAppEdit) {
          this.$('#property-app-name').parsley('custom', this.checkAppName);
        }
        return null;
      },
      checkAppName: function(val) {
        var design, repeatApp;
        design = Design.instance();
        repeatApp = design.project().apps().findWhere({
          name: val
        });
        if (repeatApp && repeatApp.id !== design.get('id')) {
          return lang.PROP.MSG_WARN_REPEATED_APP_NAME;
        }
        return null;
      },
      changeAppName: function(e) {
        var $target;
        $target = $(e.currentTarget);
        if ($target.parsley('validate')) {
          return Design.instance().set('name', $target.val());
        }
      },
      toggleResDiff: function(e) {
        return Design.instance().set('resource_diff', e.currentTarget.checked);
      },
      stackDescriptionChanged: function() {
        var description, stackDescTextarea, stackId;
        stackDescTextarea = $("#property-stack-description");
        stackId = this.model.get('id');
        description = stackDescTextarea.val();
        if (stackDescTextarea.parsley('validate')) {
          return this.model.updateDescription(description);
        }
      },
      stackNameChanged: function() {
        var name, stackId, stackNameInput;
        stackNameInput = $('#property-stack-name');
        stackId = this.model.get('id');
        name = stackNameInput.val();
        if (name === this.model.get("name")) {
          return;
        }
        stackNameInput.parsley('custom', function(val) {
          if (!MC.validate('awsName', val)) {
            return lang.PARSLEY.SHOULD_BE_A_VALID_STACK_NAME;
          }
          if (val === Design.instance().__opsModel.get("name")) {
            return;
          }
          if (!Design.instance().project().stacks().isNameAvailable(val)) {
            return sprintf(lang.PARSLEY.TYPE_NAME_CONFLICT, 'Stack', name);
          }
        });
        if (stackNameInput.parsley('validate')) {
          this.setTitle("Stack - " + name);
          this.model.updateStackName(name);
        }
        return null;
      },
      refreshACLList: function() {
        $(this.el).find('.acl-info-list-num').text("(" + (this.model.get('networkAcls').length) + ")");
        return $('#stack-property-acl-list').html(acl_template(this.model.attributes));
      },
      createAcl: function() {
        return this.trigger("OPEN_ACL", this.model.createAcl());
      },
      openAcl: function(event) {
        this.trigger("OPEN_ACL", $(event.currentTarget).closest("li").attr("data-uid"));
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
            title: lang.PROP.STACK_DELETE_NETWORK_ACL_TITLE,
            main_content: sprintf(lang.PROP.STACK_DELETE_NETWORK_ACL_CONTENT, aclName),
            desc_content: sprintf(lang.PROP.STACK_DELETE_NETWORK_ACL_DESC, aclName)
          });
          modal = new modalPlus({
            title: lang.PROP.STACK_DELETE_NETWORK_ACL_TITLE,
            width: 420,
            template: dialog_template,
            confirm: {
              text: lang.PROP.LBL_DELETE,
              color: "red"
            }
          });
          return modal.on("confirm", function() {
            that.model.removeAcl(aclUID);
            that.model.getNetworkACL();
            that.refreshACLList();
            return modal.close();
          });
        } else {
          this.model.removeAcl(aclUID);
          this.model.getNetworkACL();
          return this.refreshACLList();
        }
      }
    });
    return new StackView();
  });

}).call(this);
