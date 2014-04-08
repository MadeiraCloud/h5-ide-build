(function() {
  define(['MC', 'event', 'account_model'], function(MC, ide_event, account_model) {
    var ReSetModel;
    ReSetModel = Backbone.Model.extend({
      defaults: {
        key: null
      },
      initialize: function() {
        return this.on('ACCOUNT_CHECK__REPEAT_RETURN', function(forge_result) {
          console.log('ACCOUNT_CHECK__REPEAT_RETURN');
          console.log(forge_result);
          if (!forge_result.is_error) {
            this.trigger('NO_EMAIL');
          } else {
            this._resetPasswordServer(forge_result.param[1] ? forge_result.param[1] : forge_result.param[2]);
          }
          return null;
        });
      },
      checkRepeatService: function(value) {
        var email, username;
        console.log('checkRepeatService, value = ' + value);
        if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/.test(value)) {
          username = null;
          email = value;
        } else {
          username = value;
          email = null;
        }
        return account_model.check_repeat({
          sender: this
        }, username, email);
      },
      _resetPasswordServer: function(result) {
        console.log('resetPasswordServer, result = ' + result);
        account_model.reset_password({
          sender: this
        }, result);
        return this.once('ACCOUNT_RESET__PWD_RETURN', function(forge_result) {
          console.log('ACCOUNT_RESET__PWD_RETURN');
          console.log(forge_result);
          if (!forge_result.is_error) {
            window.location.href = "/reset/#email";
          } else {
            this.trigger('NO_EMAIL');
          }
          return null;
        });
      },
      checkKeyServer: function() {
        console.log('checkKeyServer, key = ' + this.get('key'));
        account_model.check_validation({
          sender: this
        }, this.get('key'), 'reset');
        return this.once('ACCOUNT_CHECK__VALIDATION_RETURN', function(forge_result) {
          console.log('ACCOUNT_CHECK__VALIDATION_RETURN');
          console.log(forge_result);
          if (!forge_result.is_error) {
            this.trigger('KEY_VALID');
          } else {
            window.location.href = "/reset/#expire";
          }
          return null;
        });
      },
      updatePasswordServer: function(result) {
        console.log('updatePasswordServer, result = ' + result + ', key = ' + this.get('key'));
        account_model.update_password({
          sender: this
        }, this.get('key'), result);
        return this.once('ACCOUNT_UPDATE__PWD_RETURN', function(forge_result) {
          console.log('ACCOUNT_UPDATE__PWD_RETURN');
          console.log(forge_result);
          if (!forge_result.is_error) {
            window.location.href = "/reset/#success";
          } else {

          }
          return null;
        });
      }
    });
    return new ReSetModel();
  });

}).call(this);
