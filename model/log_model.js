(function() {
  define(['backbone', 'underscore', 'log_service', 'base_model'], function(Backbone, _, log_service, base_model) {
    var LogModel, log_model;
    LogModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      put_user_log: function(src, username, session_id, user_logs) {
        var me;
        me = this;
        src.model = me;
        return log_service.put_user_log(src, username, session_id, user_logs, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('LOG_PUT__USER__LOG_RETURN', forge_result);
            }
          } else {
            console.log('log.put_user_log failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    log_model = new LogModel();
    return log_model;
  });

}).call(this);
