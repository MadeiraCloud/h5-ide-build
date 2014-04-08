(function() {
  define(['backbone', 'underscore', 'reservedinstance_service', 'base_model'], function(Backbone, _, reservedinstance_service, base_model) {
    var ReservedInstanceModel, reservedinstance_model;
    ReservedInstanceModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeReservedDBInstances: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return reservedinstance_service.DescribeReservedDBInstances(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_RSVDINS_DESC_RESERVED_DB_INSTANCES_RETURN', aws_result);
            }
          } else {
            console.log('reservedinstance.DescribeReservedDBInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeReservedDBInstancesOfferings: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return reservedinstance_service.DescribeReservedDBInstancesOfferings(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_RSVDINS_DESC_RESERVED_DB_INSTANCES_OFFERINGS_RETURN', aws_result);
            }
          } else {
            console.log('reservedinstance.DescribeReservedDBInstancesOfferings failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    reservedinstance_model = new ReservedInstanceModel();
    return reservedinstance_model;
  });

}).call(this);
