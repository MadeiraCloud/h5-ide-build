(function() {
  define(['backbone', 'underscore', 'securitygroup_service', 'base_model'], function(Backbone, _, securitygroup_service, base_model) {
    var SecurityGroupModel, securitygroup_model;
    SecurityGroupModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDBSecurityGroups: function(src, username, session_id, region_name, sg_name, marker, max_records) {
        var me;
        if (sg_name == null) {
          sg_name = null;
        }
        if (marker == null) {
          marker = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        me = this;
        src.model = me;
        return securitygroup_service.DescribeDBSecurityGroups(src, username, session_id, region_name, sg_name, marker, max_records, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_SG_DESC_DB_SGS_RETURN', aws_result);
            }
          } else {
            console.log('securitygroup.DescribeDBSecurityGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    securitygroup_model = new SecurityGroupModel();
    return securitygroup_model;
  });

}).call(this);
