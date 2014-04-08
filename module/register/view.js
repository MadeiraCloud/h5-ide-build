(function() {
  define(['event', './template', './success', 'i18n!nls/lang.js', 'UI.notification', 'backbone', 'jquery', 'handlebars'], function(ide_event, tmpl, success_tmpl, lang) {
    var RegisterView;
    RegisterView = Backbone.View.extend({
      el: '#main-body',
      template: tmpl,
      success_tmpl: success_tmpl,
      is_submit: false,
      events: {
        'blur  #register-username': 'verificationUser',
        'keyup #register-username': '_checkButtonDisabled',
        'blur  #register-email': 'verificationEmail',
        'keyup #register-email': '_checkButtonDisabled',
        'blur #register-password': 'verificationPassword',
        'keyup #register-password': '_checkButtonDisabled',
        'submit #register-form': 'submit',
        'click #register-get-start': 'loginEvent'
      },
      initialize: function() {},
      render: function(type) {
        console.log('register render');
        console.log(type);
        switch (type) {
          case 'normal':
            return this.$el.html(this.template(this.model));
          default:
            return this.$el.html(this.template(this.model));
        }
      },
      verificationUser: function(event) {
        var status, value;
        console.log('verificationUser');
        value = $('#register-username').val();
        status = $('#username-verification-status');
        if (value.trim() !== '') {
          if (/[^A-Za-z0-9\_]{1}/.test(value) !== true) {
            if (value.trim().length > 40) {
              status.addClass('error-status').removeClass('verification-status').show().text(lang.register.username_maxlength);
              return false;
            } else {
              this.trigger('CHECK_REPEAT', value, null);
              return true;
            }
          } else {
            status.addClass('error-status').removeClass('verification-status').show().text(lang.register.username_not_matched);
            return false;
          }
        } else {
          status.addClass('error-status').removeClass('verification-status').show().text(lang.register.username_required);
          return false;
        }
      },
      verificationEmail: function(event) {
        var reg_str, status, value;
        console.log('verificationEmail');
        value = $('#register-email').val().trim();
        status = $('#email-verification-status');
        reg_str = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value !== '' && reg_str.test(value)) {
          this.trigger('CHECK_REPEAT', null, value);
          return true;
        } else if (value.trim() === '') {
          return status.addClass('error-status').removeClass('verification-status').show().text(lang.register.email_required);
        } else {
          status.addClass('error-status').removeClass('verification-status').show().text(lang.register.email_not_valid);
          return false;
        }
      },
      verificationPassword: function() {
        var status, value;
        console.log('verificationPassword');
        value = $('#register-password').val().trim();
        status = $('#password-verification-status');
        if (value !== '') {
          if (value.length > 5) {
            status.addClass('verification-status').removeClass('error-status').show().text(lang.register.password_ok);
            this._checkButtonDisabled();
            return true;
          } else {
            status.addClass('error-status').removeClass('verification-status').show().text(lang.register.password_shorter);
            $('#register-btn').attr('disabled', true);
            this._checkButtonDisabled();
            return false;
          }
        } else {
          status.addClass('error-status').removeClass('verification-status').show().text(lang.register.password_required);
          $('#register-btn').attr('disabled', true);
          this._checkButtonDisabled();
          return false;
        }
      },
      submit: function() {
        var email, password, right_count, username;
        console.log('submit');
        username = $('#register-username').val();
        email = $('#register-email').val();
        password = $('#register-password').val();
        right_count = 0;
        if (this.verificationUser()) {
          right_count = right_count + 1;
        }
        if (this.verificationEmail()) {
          right_count = right_count + 1;
        }
        if (this.verificationPassword()) {
          right_count = right_count + 1;
        }
        if (right_count === 3) {
          $('#register-btn').attr('value', lang.register.reginster_waiting);
          $('#register-btn').attr('disabled', true);
          this.is_submit = true;
          this.trigger('CHECK_REPEAT', username, email, password);
        }
        return false;
      },
      showUsernameEmailError: function() {
        console.log('showUsernameError');
        this.showStatusInValid('username');
        this.showStatusInValid('email');
        return null;
      },
      showStatusInValid: function(type) {
        var status;
        console.log('showStatusInValid');
        if (type === 'username' || type === 'email') {
          switch (type) {
            case 'username':
              status = $('#username-verification-status');
              status.text(lang.register.username_taken);
              break;
            case 'email':
              status = $('#email-verification-status');
              status.text(lang.register.email_used);
          }
          if (status.attr('class') !== 'error-status') {
            status.addClass('error-status').removeClass('verification-status').show();
          } else {
            status.show();
          }
          this.is_submit = false;
        }
        if ($('#register-btn').val() === lang.register.reginster_waiting) {
          $('#register-btn').attr('disabled', false);
          $('#register-btn').attr('value', lang.register['register-btn']);
        }
        return null;
      },
      showUsernameEmailValid: function() {
        console.log('showUsernameValid');
        this.showStatusValid('username');
        this.showStatusValid('email');
        return null;
      },
      showStatusValid: function(type) {
        var status;
        console.log('showStatusValid ' + type);
        if (type === 'username' || type === 'email') {
          switch (type) {
            case 'username':
              status = $('#username-verification-status');
              status.text(lang.register.username_available);
              break;
            case 'email':
              status = $('#email-verification-status');
              status.text(lang.register.email_available);
          }
          if ($('#register-' + type).val()) {
            if (status.attr('class') !== 'verification-status') {
              status.removeClass('error-status').addClass('verification-status').show();
            } else {
              status.show();
            }
          } else {
            status.removeClass('error-status').removeClass('verification-status').show().text('');
          }
          this._checkButtonDisabled();
        }
        return null;
      },
      loginEvent: function() {
        console.log('loginEvent');
        this.trigger('AUTO_LOGIN');
        return null;
      },
      _checkButtonDisabled: function(event) {
        var right_count;
        console.log('_checkButtonDisabled');
        if (event && event.target) {
          switch (false) {
            case event.target.id !== "register-username":
              this.verificationUser();
              break;
            case event.target.id !== "register-email":
              this.verificationEmail();
              break;
            case event.target.id !== "register-password":
              this.verificationPassword();
          }
        }
        right_count = 0;
        if ($('#register-username').val().trim()) {
          right_count = right_count + 1;
        }
        if ($('#register-email').val().trim()) {
          right_count = right_count + 1;
        }
        if ($('#register-password').val().trim()) {
          right_count = right_count + 1;
        }
        if (right_count === 3) {
          if ($('#register-btn').val() !== lang.register.reginster_waiting) {
            console.log('enable create account button');
            $('#register-btn').attr('disabled', false);
          }
        } else {
          $('#register-btn').attr('disabled', true);
        }
        return null;
      },
      otherError: function() {
        console.log('otherError');
        $('#username-verification-status').removeClass('error-status').removeClass('verification-status').show().text('');
        return $('#email-verification-status').removeClass('error-status').removeClass('verification-status').show().text('');
      },
      resetCreateAccount: function(message) {
        var label, msg;
        console.log('reset account button');
        $('#username-verification-status').removeClass('error-status').removeClass('verification-status').show().text('');
        $('#email-verification-status').removeClass('error-status').removeClass('verification-status').show().text('');
        $('#register-btn').attr('disabled', false);
        $('#register-btn').attr('value', lang.register['register-btn']);
        label = 'ERROR_CODE_' + message + '_MESSAGE';
        msg = lang.service[label];
        notification('error', msg, false);
        return null;
      },
      registerSuccess: function() {
        console.log('registerSuccess');
        return this.$el.html(this.success_tmpl());
      }
    });
    return RegisterView;
  });

}).call(this);
