(function() {
  define(['backbone', 'underscore', 'guest_service', 'base_model'], function(Backbone, _, guest_service, base_model) {
    var GuestModel, guest_model;
    GuestModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      invite: function(src, username, session_id, region_name) {
        var me;
        me = this;
        src.model = me;
        return guest_service.invite(src, username, session_id, region_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('GUEST_INVITE_RETURN', forge_result);
            }
          } else {
            console.log('guest.invite failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      cancel: function(src, username, session_id, region_name, guest_id) {
        var me;
        me = this;
        src.model = me;
        return guest_service.cancel(src, username, session_id, region_name, guest_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('GUEST_CANCEL_RETURN', forge_result);
            }
          } else {
            console.log('guest.cancel failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      access: function(src, guestname, session_id, region_name, guest_id) {
        var me;
        me = this;
        src.model = me;
        return guest_service.access(src, guestname, session_id, region_name, guest_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('GUEST_ACCESS_RETURN', forge_result);
            }
          } else {
            console.log('guest.access failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      end: function(src, guestname, session_id, region_name, guest_id) {
        var me;
        me = this;
        src.model = me;
        return guest_service.end(src, guestname, session_id, region_name, guest_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('GUEST_END_RETURN', forge_result);
            }
          } else {
            console.log('guest.end failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      info: function(src, username, session_id, region_name, guest_id) {
        var me;
        if (guest_id == null) {
          guest_id = null;
        }
        me = this;
        src.model = me;
        return guest_service.info(src, username, session_id, region_name, guest_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('GUEST_INFO_RETURN', forge_result);
            }
          } else {
            console.log('guest.info failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    guest_model = new GuestModel();
    return guest_model;
  });

}).call(this);
