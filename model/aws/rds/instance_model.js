(function() {
  define(['backbone', 'underscore', 'instance_service', 'base_model'], function(Backbone, _, instance_service, base_model) {
    var InstanceModel, instance_model;
    InstanceModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDBInstances: function(src, username, session_id, region_name, instance_id, marker, max_records) {
        var me;
        if (instance_id == null) {
          instance_id = null;
        }
        if (marker == null) {
          marker = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        me = this;
        src.model = me;
        return instance_service.DescribeDBInstances(src, username, session_id, region_name, instance_id, marker, max_records, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_INS_DESC_DB_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('instance.DescribeDBInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    instance_model = new InstanceModel();
    return instance_model;
  });

}).call(this);
