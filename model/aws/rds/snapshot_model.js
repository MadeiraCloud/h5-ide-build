(function() {
  define(['backbone', 'underscore', 'snapshot_service', 'base_model'], function(Backbone, _, snapshot_service, base_model) {
    var SnapshotModel, snapshot_model;
    SnapshotModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeDBSnapshots: function(src, username, session_id) {
        var me;
        me = this;
        src.model = me;
        return snapshot_service.DescribeDBSnapshots(src, username, session_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('RDS_SS_DESC_DB_SNAPSHOTS_RETURN', aws_result);
            }
          } else {
            console.log('snapshot.DescribeDBSnapshots failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    snapshot_model = new SnapshotModel();
    return snapshot_model;
  });

}).call(this);
