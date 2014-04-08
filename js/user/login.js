(function() {
  define(['jquery', 'handlebars', 'MC', 'session_model', 'i18n!nls/lang.js', 'js/user/logintemplate', 'common_handle', 'crypto'], function($, Handlebars, MC, session_model, lang, template, common_handle) {
    MC.login = function(event) {
      var password, username;
      event.preventDefault();
      $('#error-msg-1').removeClass('show');
      $('#error-msg-2').removeClass('show');
      $('.control-group').removeClass('error');
      username = $('#login-user').val();
      password = $('#login-password').val();
      if (username === '') {
        event.preventDefault();
        $('.error-msg').removeClass('show');
        $('.control-group').first().removeClass('error');
        $('#error-msg-2').addClass('show');
        $('.control-group').first().addClass('error');
        return false;
      }
      $('#login-btn').attr('value', lang.login.login_waiting);
      $('#login-btn').attr('disabled', true);
      session_model.login({
        sender: this
      }, username, password);
      return session_model.once('SESSION_LOGIN_RETURN', function(forge_result) {
        var intercom_sercure_mode_hash, result;
        MC.common.other.verify500(forge_result);
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
            console.log('hash.toString(CryptoJS.enc.Hex) = ' + hash.toString(CryptoJS.enc.Hex));
            return hash.toString(CryptoJS.enc.Hex);
          };
          localStorage.setItem('user_hash', intercom_sercure_mode_hash());
          window.location.href = "/";
          return true;
        } else {
          event.preventDefault();
          $('.error-msg').removeClass('show');
          $('.control-group').first().removeClass('error');
          $('#error-msg-1').addClass('show');
          $('#login-btn').attr('value', 'Log In');
          $('#login-btn').attr('disabled', false);
          return false;
        }
      });
    };
    return {
      ready: function() {
        var data;
        data = {
          english: $.cookie('lang') === 'en-us'
        };
        $('#main-body').html(template(data));
        $('#login-btn').removeAttr('disabled');
        $('#login-btn').addClass('enabled');
        $('#login-form').submit(MC.login);
        $('#footer .version').text('Version ' + version);
        $('#footer .lang a').click(function(ev) {
          $.cookie('lang', $(this).data('lang'));
          MC.storage.set('language', $(this).data('lang'));
          window.location.reload();
          return false;
        });
        return true;
      }
    };
  });

}).call(this);
