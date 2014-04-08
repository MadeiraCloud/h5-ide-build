(function() {
  define(['backbone', 'underscore', 'rds_service', 'base_model'], function(Backbone, _, rds_service, base_model) {
    var RDSModel, rds_model;
    RDSModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDBEngineVersions: function(src, username) {
        var me;
        me = this;
        src.model = me;
        return rds_service.DescribeDBEngineVersions(src, username, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_RDS_DESC_DB_ENG_VERS_RETURN', aws_result);
            }
          } else {
            console.log('rds.DescribeDBEngineVersions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeOrderableDBInstanceOptions: function(src, username) {
        var me;
        me = this;
        src.model = me;
        return rds_service.DescribeOrderableDBInstanceOptions(src, username, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_RDS_DESC_ORD_DB_INS_OPTS_RETURN', aws_result);
            }
          } else {
            console.log('rds.DescribeOrderableDBInstanceOptions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeEngineDefaultParameters: function(src, username, session_id, region_name, pg_family, marker, max_records) {
        var me;
        if (marker == null) {
          marker = null;
        }
        if (max_records == null) {
          max_records = null;
        }
        me = this;
        src.model = me;
        return rds_service.DescribeEngineDefaultParameters(src, username, session_id, region_name, pg_family, marker, max_records, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_RDS_DESC_ENG_DFT_PARAMS_RETURN', aws_result);
            }
          } else {
            console.log('rds.DescribeEngineDefaultParameters failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeEvents: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return rds_service.DescribeEvents(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_RDS_DESC_EVENTS_RETURN', aws_result);
            }
          } else {
            console.log('rds.DescribeEvents failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    rds_model = new RDSModel();
    return rds_model;
  });

}).call(this);
