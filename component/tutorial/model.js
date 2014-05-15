(function() {
  define(['account_model', 'backbone', 'jquery', 'underscore', 'MC'], function(account_model) {
    var TutorialModel;
    TutorialModel = Backbone.Model.extend({
      initialize: function() {
        var me;
        me = this;
        return me.on('ACCOUNT_UPDATE__ACCOUNT_RETURN', function(result) {
          var attributes;
          console.log('ACCOUNT_UPDATE__ACCOUNT_RETURN');
          attributes = result.param[3];
          if (!result.is_error) {
            if (attributes.state === '2') {
              MC.common.cookie.setCookieByName('state', attributes.state);
            }
          } else {

          }
          return null;
        });
      },
      updateAccountService: function() {
        console.log('updateAccountService');
        return account_model.update_account({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), {
          'state': '2'
        });
      }
    });
    return TutorialModel;
  });

}).call(this);
