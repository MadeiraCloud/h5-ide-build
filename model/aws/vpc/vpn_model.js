(function() {
  define(['backbone', 'underscore', 'vpn_service', 'base_model'], function(Backbone, _, vpn_service, base_model) {
    var VPNModel, vpn_model;
    VPNModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeVpnConnections: function(src, username, session_id, region_name, vpn_ids, filters) {
        var me;
        if (vpn_ids == null) {
          vpn_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return vpn_service.DescribeVpnConnections(src, username, session_id, region_name, vpn_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_VPN_DESC_VPN_CONNS_RETURN', aws_result);
            }
          } else {
            console.log('vpn.DescribeVpnConnections failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    vpn_model = new VPNModel();
    return vpn_model;
  });

}).call(this);
