(function() {
  define(['backbone', 'underscore', 'routetable_service', 'base_model'], function(Backbone, _, routetable_service, base_model) {
    var RouteTableModel, routetable_model;
    RouteTableModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeRouteTables: function(src, username, session_id, region_name, rt_ids, filters) {
        var me;
        if (rt_ids == null) {
          rt_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return routetable_service.DescribeRouteTables(src, username, session_id, region_name, rt_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_RT_DESC_RT_TBLS_RETURN', aws_result);
            }
          } else {
            console.log('routetable.DescribeRouteTables failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    routetable_model = new RouteTableModel();
    return routetable_model;
  });

}).call(this);
