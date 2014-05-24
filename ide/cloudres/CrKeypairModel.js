(function() {
  define(["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                              env:dev:end */
      defaults: {
        keyName: "",
        keyData: "",
        keyMaterial: "",
        keyFingerprint: ""
      },
      doCreate: function() {
        var promise, self;
        self = this;
        if (this.get("keyData")) {
          promise = ApiRequest("kp_ImportKeyPair", {
            region_name: this.getCollection().region(),
            key_name: this.get("keyName"),
            key_data: this.get("keyData")
          });
        } else {
          promise = ApiRequest("kp_CreateKeyPair", {
            region_name: this.getCollection().region(),
            key_name: this.get("keyName")
          });
        }
        return promise.then(function(res) {
          var e;
          try {
            self.set(res.CreateKeyPairResponse);
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Keypair created but aws returns invalid ata.");
          }
          console.log("Created keypair resource", self);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("kp_DeleteKeyPair", {
          region_name: this.getCollection().region(),
          key_name: this.get("id")
        });
      }
    });
  });

}).call(this);
