(function() {
  define(["./CrModel", "CloudResources", "ApiRequest"], function(CrModel, CloudResources, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                               env:dev:end */
      defaults: {
        volumeId: "",
        status: "pending",
        startTime: "",
        progress: 0,
        ownerId: "",
        volumeSize: 1,
        description: "",
        name: ""
      },
      isComplete: function() {
        return this.attributes.status === "completed";
      },
      isPending: function() {
        return this.attributes.status === "pending";
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("ebs_CreateSnapshot", {
          region_name: this.getCollection().region(),
          volume_id: this.get("volumeId"),
          description: this.get("description")
        }).then(function(res) {
          var e;
          try {
            res = res.CreateSnapshotResponse;
            res.id = res.snapshotId;
            res.progress = res.progress || 0;
            delete res.snapshotId;
            delete res["@attributes"];
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot created but aws returns invalid ata.");
          }
          self.set(res);
          self.getCollection().startPollingStatus();
          console.log("Created Snapshot resource", self);
          return self;
        });
      },
      set: function(key, value) {
        if (key.progress) {
          key.progress = parseInt(key.progress, 10) || 0;
        }
        if (key.volumeSize) {
          key.volumeSize = parseInt(key.volumeSize, 10) || 1;
        }
        Backbone.Model.prototype.set.apply(this, arguments);
      },
      copyTo: function(destRegion, newName, description) {
        var self;
        self = this;
        return ApiRequest("ebs_CopySnapshot", {
          region_name: this.getCollection().region(),
          snapshot_id: this.get("id"),
          dst_region_name: destRegion,
          description: description
        }).then(function(data) {
          var clones, id, model, thatCln, _ref;
          id = (_ref = data.CopySnapshotResponse) != null ? _ref.snapshotId : void 0;
          if (!id) {
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Snapshot copied but aws returns invalid data.");
          }
          thatCln = CloudResources(self.collection.type, destRegion);
          clones = self.toJSON();
          clones.name = newName;
          clones.description = description;
          clones.region = destRegion;
          clones.id = id;
          model = thatCln.create(clones);
          thatCln.add(model);
          model.tagResource();
          return model;
        });
      },
      doDestroy: function() {
        return ApiRequest("ebs_DeleteSnapshot", {
          region_name: this.getCollection().region(),
          snapshot_id: this.get("id")
        });
      },
      tagResource: function() {
        var self;
        self = this;
        return ApiRequest("ec2_CreateTags", {
          region_name: this.getCollection().region(),
          resource_ids: [this.get("id")],
          tags: [
            {
              Name: "Created by",
              Value: App.user.get("username")
            }, {
              Name: "Name",
              Value: this.get("name")
            }
          ]
        }).then(function() {
          console.log("Success to tag resource", self.get("id"));
        });
      }
    });
  });

}).call(this);
