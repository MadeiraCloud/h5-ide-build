(function() {
  define(['backbone', 'underscore', 'placementgroup_service', 'base_model'], function(Backbone, _, placementgroup_service, base_model) {
    var PlacementGroupModel, placementgroup_model;
    PlacementGroupModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      CreatePlacementGroup: function(src, username, session_id, region_name, group_name, strategy) {
        var me;
        if (strategy == null) {
          strategy = 'cluster';
        }
        me = this;
        src.model = me;
        return placementgroup_service.CreatePlacementGroup(src, username, session_id, region_name, group_name, strategy, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_PG_CREATE_PLA_GRP_RETURN', aws_result);
            }
          } else {
            console.log('placementgroup.CreatePlacementGroup failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DeletePlacementGroup: function(src, username, session_id, region_name, group_name) {
        var me;
        me = this;
        src.model = me;
        return placementgroup_service.DeletePlacementGroup(src, username, session_id, region_name, group_name, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_PG_DELETE_PLA_GRP_RETURN', aws_result);
            }
          } else {
            console.log('placementgroup.DeletePlacementGroup failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribePlacementGroups: function(src, username, session_id, region_name, group_names, filters) {
        var me;
        if (group_names == null) {
          group_names = null;
        }
        if (filters == null) {
          filters = null;
        }
        me = this;
        src.model = me;
        return placementgroup_service.DescribePlacementGroups(src, username, session_id, region_name, group_names, filters, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('EC2_PG_DESC_PLA_GRPS_RETURN', aws_result);
            }
          } else {
            console.log('placementgroup.DescribePlacementGroups failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    placementgroup_model = new PlacementGroupModel();
    return placementgroup_model;
  });

}).call(this);
