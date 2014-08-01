(function() {
  define(["./CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                                  env:dev:end */
      taggable: false,
      isComplete: function() {
        return this.attributes.Status === "available";
      },
      isAutomated: function() {
        return this.attributes.SnapshotType === "automated";
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("rds_snap_CreateDBSnapshot", {
          region_name: this.getCollection().region(),
          source_id: this.get("DBInstanceIdentifier"),
          snapshot_id: this.get("DBSnapshotIdentifier")
        }).then(function(res) {
          var e;
          try {
            res = res.CreateDBSnapshotResponse.CreateDBSnapshotResult.DBSnapshot;
            res.id = res.DBSnapshotIdentifier;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot created but aws returns invalid data.");
          }
          self.set(res);
          console.log("Created DbSnapshot resource", self);
          return self;
        });
      },
      set: function(key) {
        if (key.PercentProgress) {
          key.PercentProgress = parseInt(key.PercentProgress, 10) || 0;
        }
        if (key.Status === "creating") {
          this.startPollingStatus();
        }
        Backbone.Model.prototype.set.apply(this, arguments);
      },
      startPollingStatus: function() {
        var ___pollingStatus;
        if (this.__polling) {
          return;
        }
        ___pollingStatus = this.__pollingStatus.bind(this);
        this.__polling = setTimeout(___pollingStatus, 2000);
      },
      stopPollingStatus: function() {
        clearTimeout(this.__polling);
        this.__polling = null;
      },
      __pollingStatus: function() {
        var self, _ref;
        self = this;
        return ApiRequest("rds_snap_DescribeDBSnapshots", {
          region_name: ((_ref = this.getCollection()) != null ? _ref.region() : void 0) || Design.instance().region(),
          snapshot_id: this.get("DBSnapshotIdentifier")
        }).then(function(res) {
          self.__polling = null;
          self.__parsePolling(res);
        }, function() {
          self.__polling = null;
          return self.startPollingStatus();
        });
      },
      __parsePolling: function(res) {
        res = res.DescribeDBSnapshotsResponse.DescribeDBSnapshotsResult.DBSnapshots.DBSnapshot;
        this.set({
          PercentProgress: res.PercentProgress,
          Status: res.Status
        });
      },
      doDestroy: function() {
        return ApiRequest("rds_snap_DeleteDBSnapshot", {
          region_name: this.getCollection().region(),
          snapshot_id: this.get("id")
        });
      }
    });
  });

}).call(this);
