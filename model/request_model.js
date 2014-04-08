(function() {
  define(['backbone', 'underscore', 'request_service', 'base_model'], function(Backbone, _, request_service, base_model) {
    var RequestModel, request_model;
    RequestModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      init: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return request_service.init(src, username, session_id, region_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('REQUEST_INIT_RETURN', forge_result);
            }
          } else {
            console.log('request.init failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      update: function(src, username, session_id, region_name, timestamp) {
        var me;
        if (timestamp == null) {
          timestamp = null;
        }
        me = this;
        src.model = me;
        return request_service.update(src, username, session_id, region_name, timestamp, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('REQUEST_UPDATE_RETURN', forge_result);
            }
          } else {
            console.log('request.update failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    request_model = new RequestModel();
    return request_model;
  });

}).call(this);
