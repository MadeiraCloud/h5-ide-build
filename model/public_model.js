(function() {
  define(['backbone', 'underscore', 'public_service', 'base_model'], function(Backbone, _, public_service, base_model) {
    var PublicModel, public_model;
    PublicModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      get_hostname: function(src, region_name, instance_id) {
        var me;
        me = this;
        src.model = me;
        return public_service.get_hostname(src, region_name, instance_id, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('PUBLIC_GET__HOSTNAME_RETURN', forge_result);
            }
          } else {
            console.log('public.get_hostname failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      },
      get_dns_ip: function(src, region_name) {
        var me;
        me = this;
        src.model = me;
        return public_service.get_dns_ip(src, region_name, function(forge_result) {
          if (!forge_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('PUBLIC_GET__DNS__IP_RETURN', forge_result);
            }
          } else {
            console.log('public.get_dns_ip failed, error is ' + forge_result.error_message);
            return me.pub(forge_result);
          }
        });
      }
    });
    public_model = new PublicModel();
    return public_model;
  });

}).call(this);
