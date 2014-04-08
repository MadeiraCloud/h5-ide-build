(function() {
  define(['backbone', 'underscore', 'acl_service', 'base_model'], function(Backbone, _, acl_service, base_model) {
    var ACLModel, acl_model;
    ACLModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeNetworkAcls: function(src, username, session_id, region_name, acl_ids, filters) {
        var me;
        if (acl_ids == null) {
          acl_ids = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return acl_service.DescribeNetworkAcls(src, username, session_id, region_name, acl_ids, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('VPC_ACL_DESC_NET_ACLS_RETURN', aws_result);
            }
          } else {
            console.log('acl.DescribeNetworkAcls failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    acl_model = new ACLModel();
    return acl_model;
  });

}).call(this);
