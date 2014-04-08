(function() {
  define(['backbone', 'underscore', 'subnetgroup_service', 'base_model'], function(Backbone, _, subnetgroup_service, base_model) {
    var SubnetGroupModel, subnetgroup_model;
    SubnetGroupModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDBSubnetGroups: function(src, username, session_id, region_name, sg_name, marker, max_records) {
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
        return subnetgroup_service.DescribeDBSubnetGroups(src, username, session_id, region_name, sg_name, marker, max_records, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_SNTG_DESC_DB_SNET_GRPS_RETURN', aws_result);
            }
          } else {
            console.log('subnetgroup.DescribeDBSubnetGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    subnetgroup_model = new SubnetGroupModel();
    return subnetgroup_model;
  });

}).call(this);
