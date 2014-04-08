(function() {
  define(['backbone', 'underscore', 'internetgateway_service', 'base_model'], function(Backbone, _, internetgateway_service, base_model) {
    var InternetGatewayModel, internetgateway_model;
    InternetGatewayModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeInternetGateways: function(src, username, session_id, region_name, gw_ids, filters) {
        var me;
        if (gw_ids == null) {
          gw_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return internetgateway_service.DescribeInternetGateways(src, username, session_id, region_name, gw_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_IGW_DESC_INET_GWS_RETURN', aws_result);
            }
          } else {
            console.log('internetgateway.DescribeInternetGateways failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    internetgateway_model = new InternetGatewayModel();
    return internetgateway_model;
  });

}).call(this);
