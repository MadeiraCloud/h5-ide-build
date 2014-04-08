(function() {
  define(['MC', 'event', 'account_model', 'session_model', 'common_handle', 'crypto'], function(MC, ide_event, account_model, session_model, common_handle) {
    var RegisterModel;
    RegisterModel = Backbone.Model.extend({
      defaults: {
        password: null,
        username: null
      },
      initialize: function() {
        return this.on('ACCOUNT_CHECK__REPEAT_RETURN', function(forge_result) {
          console.log('ACCOUNT_CHECK__REPEAT_RETURN');
          console.log(forge_result);
          if (!forge_result.is_error) {
            if (forge_result.param[1] && forge_result.param[2]) {
              this.registerService(forge_result.param[1], forge_result.param[2], this.get('password'));
            } else {
              if (forge_result.param[1] && !forge_result.param[2]) {
                this.trigger('USERNAME_VALID');
              } else if (!forge_result.param[1] && forge_result.param[2]) {
                this.trigger('EMAIL_VALID');
              }
            }
          } else {
            switch (forge_result.error_message) {
              case 'username':
                this.trigger('USERNAME_REPEAT');
                break;
              case 'email':
                this.trigger('EMAIL_REPEAT');
                break;
              case 'username,email':
                this.trigger('USERNAME_EMAIL_REPEAT');
                break;
              default:
                console.log('other error');
                if (!_.isEmpty(forge_result.param[1]) && !_.isEmpty(forge_result.param[2])) {
                  this.trigger('RESET_CREATE_ACCOUNT', forge_result.return_code);
                } else {
                  this.trigger('OTHER_ERROR');
                }
            }
          }
          return null;
        });
      },
      checkRepeatService: function(username, email, password) {
        console.log('checkRepeatService, username = ' + username + ', email = ' + email + ', password = ' + password);
        this.set('password', password);
        return account_model.check_repeat({
          sender: this
        }, username, email);
      },
      registerService: function(username, email, password) {
        var me;
        console.log('registerService, username = ' + username + ', email = ' + email + ', password = ' + password);
        account_model.register({
          sender: this
        }, username, password, email);
        me = this;
        return this.once('ACCOUNT_REGISTER_RETURN', function(forge_result) {
          console.log('ACCOUNT_REGISTER_RETURN');
          console.log(forge_result);
          if (!forge_result.is_error) {
            me.set('username', forge_result.param[1]);
            me.set('password', forge_result.param[2]);
            me.trigger('RESIGER_SUCCESS');
          } else {
            me.trigger('RESET_CREATE_ACCOUNT', forge_result.return_code);
          }
          return null;
        });
      },
      loginService: function() {
        console.log('loginService');
        if (!this.get('username') || !this.get('password')) {
          return;
        }
        session_model.login({
          sender: this
        }, this.get('username'), this.get('password'));
        this.set('username', null);
        this.set('password', null);
        return this.once('SESSION_LOGIN_RETURN', function(forge_result) {
          var intercom_sercure_mode_hash, result;
          if (!forge_result.is_error) {
            result = forge_result.resolved_data;
            common_handle.cookie.deleteCookie();
            common_handle.cookie.setCookie(result);
            common_handle.cookie.setIDECookie(result);
            localStorage.setItem('email', MC.base64Decode(common_handle.cookie.getCookieByName('email')));
            localStorage.setItem('user_name', common_handle.cookie.getCookieByName('username'));
            intercom_sercure_mode_hash = function() {
              var hash, intercom_api_secret;
              intercom_api_secret = '4tGsMJzq_2gJmwGDQgtP2En1rFlZEvBhWQWEOTKE';
              hash = CryptoJS.HmacSHA256(MC.base64Decode($.cookie('email')), intercom_api_secret);
              return hash.toString(CryptoJS.enc.Hex);
            };
            localStorage.setItem('user_hash', intercom_sercure_mode_hash());
            window.location.href = "/";
            return null;
          }
        });
      }
    });
    return new RegisterModel();
  });

}).call(this);
