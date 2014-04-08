(function() {
  define(['backbone', 'underscore', 'parametergroup_service', 'base_model'], function(Backbone, _, parametergroup_service, base_model) {
    var ParameterGroupModel, parametergroup_model;
    ParameterGroupModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDBParameterGroups: function(src, username, session_id, region_name, pg_name, marker, max_records) {
        var me;
        if (pg_name == null) {
          pg_name = null;
        }
        if (marker == null) {
          marker = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        me = this;
        src.model = me;
        return parametergroup_service.DescribeDBParameterGroups(src, username, session_id, region_name, pg_name, marker, max_records, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_PG_DESC_DB_PARAM_GRPS_RETURN', aws_result);
            }
          } else {
            console.log('parametergroup.DescribeDBParameterGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeDBParameters: function(src, username, session_id, region_name, pg_name, source, marker, max_records) {
        var me;
        if (source == null) {
          source = null;
        }
        if (marker == null) {
          marker = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        me = this;
        src.model = me;
        return parametergroup_service.DescribeDBParameters(src, username, session_id, region_name, pg_name, source, marker, max_records, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_PG_DESC_DB_PARAMS_RETURN', aws_result);
            }
          } else {
            console.log('parametergroup.DescribeDBParameters failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    parametergroup_model = new ParameterGroupModel();
    return parametergroup_model;
  });

}).call(this);
