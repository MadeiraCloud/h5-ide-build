(function() {
  define(['session_model', 'common_handle', 'backbone', 'jquery', 'underscore', 'MC'], function(session_model, common_handle) {
    var SessionModel;
    SessionModel = Backbone.Model.extend({
      initialize: function() {
        var me;
        me = this;
        return this.on('SESSION_LOGIN_RETURN', function(forge_result) {
          var result;
          console.log('SESSION_LOGIN_RETURN');
          if (!forge_result.is_error) {
            result = forge_result.resolved_data;
            common_handle.cookie.setCookie(result);
            me.trigger('RE_LOGIN_SCUCCCESS');
          } else {
            console.log('Authentication failed.');
            me.trigger('RE_LOGIN_FAILED');
          }
          return null;
        });
      },
      relogin: function(password) {
        console.log('relogin, password = ' + password);
        return session_model.login({
          sender: this
        }, $.cookie('username'), password);
      }
    });
    return SessionModel;
  });

}).call(this);
