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
        }).then(function(res) {
          var newArn, oldArn;
          oldArn = self.get('Arn');
          newArn = "" + (oldArn.split('/')[0]) + "/" + newAttr.Name;
          self.set('Arn', newArn);
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
          var e;
          self.attributes.CertificateChain = "";
          self.attributes.PrivateKey = "";
          try {
            res = res.UploadServerCertificateResponse.UploadServerCertificateResult.ServerCertificateMetadata;
            res.Arn = res.Arn;
            res.Expiration = res.Expiration;
            res.Path = res.Path;
            res.id = res.ServerCertificateId;
            res.Name = res.ServerCertificateName;
            res.UploadDate = res.UploadDate;
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidAwsReturn, "Ssl cert created but aws returns invalid data.");
          }
          self.set(res);
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
