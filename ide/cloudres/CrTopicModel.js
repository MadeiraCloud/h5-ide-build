(function() {
  define(["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                            env:dev:end */
      taggable: false,
      defaults: {
        Name: "",
        DisplayName: ""
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("sns_CreateTopic", {
          region_name: this.getCollection().region(),
          topic_name: this.get("Name")
        }).then(function(res) {
          var e, id;
          try {
            id = res.CreateTopicResponse.CreateTopicResult.TopicArn;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Topic created but aws returns invalid ata.");
          }
          self.set("id", id);
          console.log("Created topic resource", self);
          if (self.get("DisplayName")) {
            setTimeout(function() {
              return ApiRequest("sns_SetTopicAttributes", {
                region_name: self.getCollection().region(),
                topic_arn: id,
                attr_name: "DisplayName",
                attr_value: self.get("DisplayName")
              });
            }, 1000);
          }
          return self;
        });
      },
      doUpdate: function(displayName) {
        var self;
        self = this;
        return ApiRequest("sns_SetTopicAttributes", {
          region_name: this.getCollection().region(),
          topic_arn: this.get("id"),
          attr_name: "DisplayName",
          attr_value: displayName
        }).then(function() {
          self.set("DisplayName", displayName);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("sns_DeleteTopic", {
          region_name: this.getCollection().region(),
          topic_arn: this.get("id")
        });
      }
    });
  });

}).call(this);
