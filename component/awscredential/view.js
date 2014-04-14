(function() {
  define(['event', 'i18n!nls/lang.js', 'constant', './form', './loading', './skip', 'backbone', 'jquery', 'handlebars', 'UI.modal', 'UI.notification'], function(ide_event, lang, constant, form_tmpl, loading_tmpl, skip_tmpl) {
    var AWSCredentialView, last_access_key, last_account_id, last_secret_key;
    last_account_id = null;
    last_access_key = null;
    last_secret_key = null;
    AWSCredentialView = Backbone.View.extend({
      state: 'credential',
      events: {
        'click #close-awscredential': 'onClose',
        'click #account-setting-close': 'onClose',
        'click #awscredentials-submit': 'onSubmit',
        'click #awscredentials-update-done': 'onDone',
        'click .AWSCredentials-account-update': 'onUpdate',
        'click #awscredentials-cancel': 'onAWSCredentialCancel',
        'click #awscredentials-remove': 'onAWSCredentialRemove',
        'click #account-setting-tab li a': 'onTab',
        'click #account-change-password': 'onChangePassword',
        'click #account-email-update': 'clickUpdateEmail',
        'click #account-email-cancel': 'clickCancelEmail',
        'click #account-password-update': 'clickUpdatePassword',
        'click #account-password-cancel': 'clickCancelPassword',
        'change #aws-credential-account-id': 'verificationKey',
        'change #aws-credential-access-key': 'verificationKey',
        'change #aws-credential-secret-key': 'verificationKey',
        'click #awscredentials-skip': 'onSkinButton'
      },
      render: function(template) {
        console.log('account_setting_tab render');
        modal(template(this.model.get('account_id')), false);
        this.setElement($('#account-setting-wrap').closest('#modal-wrap'));
        $('#AWSCredential-form').find('ul').html(form_tmpl());
        $('#AWSCredentials-submiting').html(loading_tmpl());
        $('#modal-box').hide();
        return setTimeout(function() {
          $('#modal-box').show();
          return modal.position();
        }, 500);
      },
      onClose: function() {
        console.log('account_setting_tab onClose');
        if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
          this.trigger('CANCAL_CREDENTIAL');
          if (this.state === 'welcome') {
            $('#awscredentials-submit').text('Loading...');
            $('#awscredentials-skip').hide();
            $('#AWSCredential-welcome-img').hide();
          }
        } else {
          this.trigger('CLOSE_POPUP');
        }
        return null;
      },
      onDone: function() {
        console.log('account_setting_tab onDone');
        return this.trigger('CLOSE_POPUP');
      },
      onUpdate: function() {
        var me;
        console.log('account_setting_tab onUpdate');
        me = this;
        return me.showSetting('credential', 'in_update');
      },
      onSubmit: function() {
        var access_key, account_id, me, right_count, secret_key, _ref;
        console.log('account_setting_tab onSubmit');
        if ((_ref = $('#awscredentials-skip').attr('data-type')) === 'back' || _ref === 'done') {
          if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
            this.trigger('CANCAL_CREDENTIAL');
            if (this.state === 'welcome') {
              $('#awscredentials-submit').text('Loading...');
              $('#awscredentials-skip').hide();
              $('#AWSCredential-welcome-img').hide();
            }
          } else {
            this.onDone();
          }
          return;
        }
        me = this;
        right_count = 0;
        account_id = $('#aws-credential-account-id').val().trim();
        access_key = $('#aws-credential-access-key').val().trim();
        secret_key = $('#aws-credential-secret-key').val().trim();
        if (MC.common.cookie.getCookieByName('account_id') === 'demo_account' && $('#aws-credential-account-id').val().trim() === 'demo_account') {
          notification('error', lang.ide.HEAD_MSG_ERR_INVALID_SAME_ID);
          return;
        }
        if (!account_id) {
          return notification('error', lang.ide.HEAD_MSG_ERR_INVALID_ACCOUNT_ID);
        } else if (!access_key) {
          return notification('error', lang.ide.HEAD_MSG_ERR_INVALID_ACCESS_KEY);
        } else if (!secret_key) {
          return notification('error', lang.ide.HEAD_MSG_ERR_INVALID_SECRET_KEY);
        } else {
          me.showSetting('credential', 'on_submit');
          last_account_id = account_id;
          last_access_key = access_key;
          last_secret_key = secret_key;
          me.trigger('AWS_AUTHENTICATION', account_id, access_key, secret_key);
          if (this.state === 'welcome') {
            $('#awscredentials-submit').text('Loading...');
            $('#awscredentials-skip').hide();
            return $('#AWSCredential-welcome-img').hide();
          }
        }
      },
      onAWSCredentialCancel: function() {
        var me;
        console.log('account_setting_tab onAWSCredentialCancel');
        me = this;
        if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
          if ($('#AWSCredentials-remove-wrap').attr('data-type') === 'remove') {
            return me.showSetting('credential', 'in_update');
          } else {
            return me.trigger('CANCAL_CREDENTIAL');
          }
        } else {
          return me.showSetting('credential', 'on_update');
        }
      },
      onAWSCredentialRemove: function(event) {
        var me;
        console.log('account_setting_tab onAWSCredentialRemove');
        me = this;
        $('#AWSCredentials-remove-wrap').attr('data-type', 'remove');
        if ($('#awscredentials-remove').hasClass('btn btn-red')) {
          me.trigger('REMOVE_CREDENTIAL');
          return me.showSetting('credential');
        } else {
          return me.showSetting('credential', 'on_remove');
        }
      },
      onTab: function(event) {
        var me, obj;
        console.log('account_setting_tab onTab');
        me = this;
        obj = $(event.currentTarget);
        if (obj.text() === lang.ide.HEAD_LABEL_CREDENTIAL) {
          if ($.cookie('has_cred') === 'true') {
            me.showSetting('credential', 'on_update');
          } else {
            me.showSetting('credential', 'is_failed');
          }
        } else {
          me.showSetting('account');
        }
        return null;
      },
      clickUpdateEmail: function(flag) {
        var email, me, status;
        console.log('account_setting_tab clickUpdateEmail');
        me = this;
        email = $('#account-email-input').val();
        status = $('#email-verification-status');
        status.removeClass('error-status');
        if (flag && flag === 'is_failed') {
          return status.show().text(lang.ide.HEAD_MSG_ERR_UPDATE_EMAIL2);
        } else if (email) {
          if (email !== '' && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/.test(email)) {
            if (email === MC.base64Decode($.cookie('email'))) {
              return me.showSetting('account');
            } else {
              return me.trigger('UPDATE_ACCOUNT_EMAIL', email);
            }
          } else {
            return status.show().text(lang.ide.HEAD_MSG_ERR_UPDATE_EMAIL3);
          }
        }
      },
      clickCancelEmail: function(event) {
        var me;
        console.log('account_setting_tab clickCancelEmail');
        me = this;
        return me.showSetting('account');
      },
      onChangePassword: function(event) {
        var me;
        console.log('account_setting_tab onChangePassword');
        me = this;
        if ($('#account-password-wrap').css('display') === 'none') {
          me.showSetting('account', 'on_password');
        } else {
          me.showSetting('account');
        }
        return null;
      },
      clickUpdatePassword: function(flag) {
        var me, new_password, password;
        console.log('account_setting_tab onUpdatePassword');
        me = this;
        password = $('#account-current-password').val();
        new_password = $('#account-new-password').val();
        if (!password || !new_password) {
          $('#account-passowrd-info').show();
          return $('#account-passowrd-info').text(lang.ide.HEAD_MSG_ERR_NULL_PASSWORD);
        } else if (new_password === $.cookie('username') || new_password.length < 6) {
          $('#account-passowrd-info').show();
          return $('#account-passowrd-info').text(lang.ide.HEAD_MSG_ERR_INVALID_PASSWORD);
        } else if (flag === 'error_password') {
          $('#account-passowrd-info').show();
          return $('#account-passowrd-info').html(lang.ide.HEAD_MSG_ERR_WRONG_PASSWORD + ' <a href="/reset/" target="_blank">' + lang.ide.HEAD_MSG_INFO_FORGET_PASSWORD + '</a>');
        } else {
          $('#account-passowrd-info').hide();
          return me.trigger('UPDATE_ACCOUNT_PASSWORD', password, new_password);
        }
      },
      clickCancelPassword: function(event) {
        var me;
        console.log('account_setting_tab clickCancelPassword');
        me = this;
        return me.showSetting('account');
      },
      notify: function(type, msg) {
        return notification(type, msg);
      },
      verificationKey: function() {
        var right_count;
        console.log('verificationKey');
        right_count = 0;
        if ($('#aws-credential-account-id').val().trim()) {
          right_count = right_count + 1;
        }
        if ($('#aws-credential-access-key').val().trim()) {
          right_count = right_count + 1;
        }
        if ($('#aws-credential-secret-key').val().trim()) {
          right_count = right_count + 1;
        }
        if (right_count === 3) {
          $('#awscredentials-submit').attr('disabled', false);
        } else {
          $('#awscredentials-submit').attr('disabled', true);
        }
        return null;
      },
      onSkinButton: function() {
        var $target;
        console.log('onSkinButton');
        $target = $('#awscredentials-skip');
        $('#AWSCredential-info').removeClass('error');
        if ($target.attr('data-type') === 'skip') {
          $target.attr('data-type', 'back');
          $target.text('Back');
          $('#awscredentials-submit').text('Done');
          $('#awscredentials-submit').removeAttr('disabled');
          $('#AWSCredential-form').find('ul').html(skip_tmpl());
          $('#AWSCredential-welcome').text(lang.ide.HEAD_INFO_PROVIDE_CREDENTIAL1);
          $('#AWSCredential-info').find('p').text(lang.ide.HEAD_INFO_DEMO_MODE);
          $('#AWSCredential-welcome-img').hide();
          $('#AWSCredential-form').find('h4').hide();
        } else if ($target.attr('data-type') === 'back') {
          $target.attr('data-type', 'skip');
          $target.text('Skip');
          $('#awscredentials-submit').attr('disabled', true);
          $('#awscredentials-submit').text(lang.ide.HEAD_BTN_SUBMIT);
          $('#AWSCredential-form').find('ul').html(form_tmpl());
          $('#AWSCredential-welcome').text(sprintf(lang.ide.HEAD_INFO_WELCOME, MC.common.cookie.getCookieByName('username')));
          $('#AWSCredential-info').find('p').text(lang.ide.HEAD_INFO_PROVIDE_CREDENTIAL2);
          $('#AWSCredential-welcome-img').show();
          $('#AWSCredential-form').find('h4').show();
        }
        return null;
      },
      showSetting: function(tab, flag) {
        var app, confirm_remove, me, num, r, right_count, welcome_string, _i, _j, _len, _len1, _ref, _ref1;
        console.log('account_setting_tab tab and flag:' + tab + ', ' + flag);
        me = this;
        if (tab === 'account') {
          $('#account-profile-setting').show();
          $('#AWSCredential-setting').hide();
          $('#account-profile-setting-body').show();
          $('#account-profile-setting-username').show();
          $('#account-profile-setting-email').show();
          if (!flag) {
            $('#account-email-change-wrap').show();
            $('#account-email-input-wrap').hide();
            $('#account-password-wrap').hide();
            $('#account-profile-username').text($.cookie('username'));
            $('#account-profile-email').text(MC.base64Decode($.cookie('email')));
          } else if (flag === 'on_email') {
            $('#account-email-change-wrap').hide();
            $('#account-email-input-wrap').show();
            $('#account-password-wrap').hide();
            $('#email-verification-status').hide();
            $('#account-email-input').val(MC.base64Decode($.cookie('email')));
          } else if (flag === 'on_password') {
            $('#account-email-change-wrap').show();
            $('#account-email-input-wrap').hide();
            $('#account-password-wrap').show();
            $('#account-passowrd-info').hide();
            $('#account-current-password').val('');
            $('#account-new-password').val('');
          }
        } else if (tab === 'credential') {
          $('#account-profile-setting').hide();
          $('#AWSCredential-setting').show();
          $('#AWSCredentials-remove').hide();
          $('#AWSCredential-form').show();
          $('#AWSCredential-form').find('ul').show();
          $('#awscredentials-submit').show();
          $('#AWSCredential-info-wrap').show();
          $('#AWSCredential-info').show();
          $('#AWSCredentials-remove-wrap').hide();
          $('#awscredentials-remove').css('display', 'inline-block');
          $('#awscredentials-cancel').show();
          $('#awscredentials-submit').attr('disabled', "true");
          $('#awscredentials-remove').css('display', 'inline-block');
          if (!flag) {
            $('#AWSCredentials-submiting').hide();
            $('#AWSCredentials-update').hide();
            $('#aws-credential-account-id').val(' ');
            $('#aws-credential-access-key').val(' ');
            $('#aws-credential-secret-key').val(' ');
            if (this.state === 'credential') {
              $('#AWSCredential-info').find('p').text(lang.ide.HEAD_INFO_PROVIDE_CREDENTIAL3);
            } else if (this.state === 'welcome') {
              welcome_string = sprintf(lang.ide.HEAD_INFO_WELCOME, MC.common.cookie.getCookieByName('username'));
              $('#AWSCredential-welcome').text(welcome_string);
              $('#AWSCredential-info').find('p').text(lang.ide.HEAD_INFO_PROVIDE_CREDENTIAL2);
            }
            $('#awscredentials-remove').hide();
            $('#awscredentials-cancel').hide();
          } else if (flag === 'is_failed') {
            $('#AWSCredentials-submiting').hide();
            $('#AWSCredentials-update').hide();
            $('#AWSCredential-info').addClass('error');
            $('#AWSCredential-info').find('p').text(lang.ide.HEAD_ERR_AUTHENTICATION);
            right_count = 0;
            if (last_account_id) {
              $('#aws-credential-account-id').text(last_account_id);
              right_count = right_count + 1;
            }
            if (last_access_key) {
              $('#aws-credential-access-key').text(last_access_key);
              right_count = right_count + 1;
            }
            if (last_secret_key) {
              $('#aws-credential-secret-key').text(last_secret_key);
              right_count = right_count + 1;
            }
            if (right_count === 3) {
              $('#awscredentials-submit').attr('disabled', false);
            }
            if (this.state === 'welcome') {
              $('#awscredentials-submit').text(lang.ide.HEAD_BTN_SUBMIT);
              $('#awscredentials-skip').show();
            }
          } else if (flag === 'on_update') {
            $('#AWSCredential-form').hide();
            $('#AWSCredentials-submiting').hide();
            $('#AWSCredentials-update').show();
            $('#AWSCredential-info-wrap').hide();
            $('#aws-credential-update-account-id').text(me.model.attributes.account_id);
            $('.AWSCredentials-nochange-warn').hide();
            $('.AWSCredentials-account-update').show();
            $('.AWSCredentials-account-update').attr('disabled', false);
            if (this.state === 'welcome') {
              $('#awscredentials-skip').hide();
              $('#awscredentials-skip').attr('data-type', 'done');
              $('#awscredentials-submit').text(lang.ide.HEAD_BTN_DONE);
              $('#awscredentials-submit').removeAttr('disabled');
            }
          } else if (flag === 'in_update') {
            if (MC.common.cookie.getCookieByName('account_id') === 'demo_account') {
              $('#awscredentials-remove').hide();
            }
            $('#AWSCredentials-submiting').hide();
            $('#AWSCredentials-update').hide();
            $('#AWSCredential-info').find('p').text(lang.ide.HEAD_CHANGE_CREDENTIAL);
            $('#aws-credential-account-id').val(me.model.attributes.account_id);
            $('#awscredentials-remove').removeClass("btn btn-red");
            $('#aws-credential-access-key').val(' ');
            $('#aws-credential-secret-key').val(' ');
            num = 0;
            _ref = constant.REGION_KEYS;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              r = _ref[_i];
              _ref1 = MC.data.app_list[r];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                app = _ref1[_j];
                num++;
              }
            }
            if (num > 0) {
              $('#aws-credential-account-id').attr('disabled', true);
              $('#awscredentials-remove').hide();
            } else {
              $('#aws-credential-account-id').attr('disabled', false);
              $('#awscredentials-remove').show();
            }
            if (me.model.attributes.account_id === 'demo_account') {
              $('#aws-credential-account-id').val(' ');
              $('#aws-credential-account-id').attr('disabled', false);
            }
          } else if (flag === 'on_submit') {
            $('#AWSCredential-form').hide();
            $('#AWSCredentials-submiting').show();
            $('#AWSCredentials-update').hide();
            $('#AWSCredential-info-wrap').hide();
          } else if (flag === 'load_resource') {
            $('#AWSCredential-form').hide();
            $('#AWSCredentials-submiting').show();
            $('#AWSCredentials-update').hide();
            $('#AWSCredentials-loading-text').text(lang.ide.HEAD_INFO_LOADING_RESOURCE);
            $('#AWSCredential-info-wrap').hide();
          } else if (flag === 'on_remove') {
            $('#AWSCredential-info').hide();
            $('#AWSCredentials-remove-wrap').show();
            confirm_remove = sprintf(lang.ide.HEAD_INFO_CONFIRM_REMOVE, me.model.attributes.account_id);
            $('#AWSCredential-remove-head').find('p').text(confirm_remove);
            $('#awscredentials-submit').hide();
            $('#AWSCredential-form').find('ul').hide();
            $('#awscredentials-remove').addClass("btn btn-red");
          }
        }
        return null;
      }
    });
    return AWSCredentialView;
  });

}).call(this);
