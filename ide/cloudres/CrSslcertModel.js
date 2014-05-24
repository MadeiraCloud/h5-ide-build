(function() {
  define(["./CrModel", "ApiRequest"], function(CrModel, ApiRequest) {
    return CrModel.extend({

      /* env:dev                                              env:dev:end */
      taggable: false,
      defaults: {
        Path: "",
        Name: "",
        PrivateKey: "",
        CertificateChain: "",
        CertificateBody: ""
      },
      doUpdate: function(newAttr) {
        var self;
        self = this;
        return ApiRequest("iam_UpdateServerCertificate", {
          servercer_name: this.get("Name"),
          new_servercer_name: newAttr.Name,
          new_path: newAttr.Path
        }).then(function() {
          self.set(newAttr);
          return self;
        });
      },
      doCreate: function() {
        var self;
        self = this;
        return ApiRequest("iam_UploadServerCertificate", {
          servercer_name: this.get("Name"),
          cert_body: this.get("CertificateBody"),
          private_key: this.get("PrivateKey"),
          cert_chain: this.get("CertificateChain"),
          path: this.get("Path")
        }).then(function(res) {
          var e, id;
          self.attributes.CertificateChain = "";
          self.attributes.PrivateKey = "";
          try {
            id = res.UploadServerCertificateResponse.UploadServerCertificateResult.ServerCertificateMetadata.ServerCertificateId;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Ssl cert created but aws returns invalid ata.");
          }
          self.set("id", id);
          console.log("Created SslCert resource", self);
          return self;
        });
      },
      doDestroy: function() {
        return ApiRequest("iam_DeleteServerCertificate", {
          servercer_name: this.get("Name")
        });
      }
    });
  });

}).call(this);
