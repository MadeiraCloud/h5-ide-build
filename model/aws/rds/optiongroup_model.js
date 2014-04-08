(function() {
  define(['backbone', 'underscore', 'optiongroup_service', 'base_model'], function(Backbone, _, optiongroup_service, base_model) {
    var OptionGroupModel, optiongroup_model;
    OptionGroupModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeOptionGroupOptions: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return optiongroup_service.DescribeOptionGroupOptions(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_OG_DESC_OPT_GRP_OPTIONS_RETURN', aws_result);
            }
          } else {
            console.log('optiongroup.DescribeOptionGroupOptions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeOptionGroups: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return optiongroup_service.DescribeOptionGroups(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_OG_DESC_OPT_GRPS_RETURN', aws_result);
            }
          } else {
            console.log('optiongroup.DescribeOptionGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    optiongroup_model = new OptionGroupModel();
    return optiongroup_model;
  });

}).call(this);
