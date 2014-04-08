(function() {
  define(['event', './template', './email', './password', './loading', './expire', './success', 'i18n!nls/lang.js', 'backbone', 'jquery', 'handlebars'], function(ide_event, tmpl, email_tmpl, password_tmpl, loading_tmpl, expire_tmpl, success_tmpl, lang) {
    var ResetView;
    ResetView = Backbone.View.extend({
      el: '#main-body',
      template: tmpl,
      email_tmpl: email_tmpl,
      password_tmpl: password_tmpl,
      loading_tmpl: loading_tmpl,
      expire_tmpl: expire_tmpl,
      success_tmpl: success_tmpl,
      is_submit: false,
      events: {
        'keyup #reset-pw-email': 'changeSendButtonState',
        'click #reset-btn': 'resetPasswordButtonEvent',
        'click #reset-password': 'resetPasswordEvent',
        'blur #reset-pw': 'verificationPassword'
      },
      initialize: function() {},
      render: function(type, key) {
        console.log('reset render');
        console.log(type, key);
        switch (type) {
          case 'normal':
            return this.$el.html(this.template());
          case 'email':
            return this.$el.html(this.email_tmpl());
          case 'password':
            return this.$el.html(this.loading_tmpl());
          case 'expire':
            return this.$el.html(this.expire_tmpl());
          case 'success':
            return this.$el.html(this.success_tmpl());
          default:
            return this.$el.html(this.template());
        }
      },
      passwordRender: function() {
        console.log('passwordRender');
        return this.$el.html(this.password_tmpl());
      },
      changeSendButtonState: function(event) {
        console.log('changeSendButtonState');
        $('#email-verification-status').hide();
        if (this.is_submit) {
          return;
        }
        if (event.target.value) {
          return $('#reset-btn').removeAttr('disabled');
        } else {
          return $('#reset-btn').attr('disabled', true);
        }
      },
      resetPasswordButtonEvent: function() {
        console.log('resetPasswordButtonEvent');
        $('#email-verification-status').hide();
        $('#reset-btn').attr('disabled', true);
        $('#reset-btn').attr('value', lang.reset.reset_waiting);
        this.is_submit = true;
        this.trigger('RESET_EMAIL', $('#reset-pw-email').val());
        return false;
      },
      resetPasswordEvent: function() {
        console.log('resetPasswordEvent');
        if (this.verificationPassword()) {
          $('#reset-password').attr('value', lang.reset.reset_waiting);
          $('#reset-password').attr('disabled', true);
          this.trigger('RESET_PASSWORD', $('#reset-pw').val());
        }
        return false;
      },
      verificationPassword: function() {
        var status, value;
        value = $('#reset-pw').val().trim();
        status = $('#password-verification-status');
        status.removeClass('error-status');
        if (value !== '') {
          if (value.length > 5) {
            status.hide();
            return true;
          } else {
            status.addClass('error-status').show().text(lang.reset.reset_password_shorter);
            return false;
          }
        } else {
          status.addClass('error-status').show().text(lang.reset.reset_password_required);
          return false;
        }
      },
      showErrorMessage: function() {
        var status;
        console.log('showErrorMessage');
        this.is_submit = false;
        $('#reset-btn').attr('disabled', false);
        $('#reset-btn').attr('value', lang.reset.reset_btn);
        status = $('#email-verification-status');
        status.addClass('error-status').show().text(lang.reset.reset_error_state);
        return false;
      }
    });
    return ResetView;
  });

}).call(this);
