(function() {
  define(["constant", "ComplexResModel", "ConnectionModel"], function(constant, ComplexResModel, ConnectionModel) {
    var SslCertModel, SslCertUsage;
    SslCertUsage = ConnectionModel.extend({
      type: "SslCertUsage",
      oneToMany: constant.RESTYPE.IAM
    });
    SslCertModel = ComplexResModel.extend({
      type: constant.RESTYPE.IAM,
      defaults: {
        name: "v",
        body: "",
        chain: "",
        key: "",
        arn: "",
        certId: ""
      },
      isVisual: function() {
        return false;
      },
      assignTo: function(target) {
        return new SslCertUsage(this, target);
      },
      serialize: function() {
        var elbModelAry, that, used;
        that = this;
        used = false;
        elbModelAry = Design.modelClassForType(constant.RESTYPE.ELB).allObjects();
        _.each(elbModelAry, function(elbModel) {
          _.each(elbModel.get('listeners'), function(listenerObj) {
            if (listenerObj.sslCert === that) {
              used = true;
            }
            return null;
          });
          return null;
        });
        if (used) {
          return {
            component: {
              uid: this.id,
              type: "AWS.IAM.ServerCertificate",
              name: this.get("name"),
              resource: {
                PrivateKey: this.get("key"),
                CertificateBody: this.get("body"),
                CertificateChain: this.get("chain"),
                ServerCertificateMetadata: {
                  ServerCertificateName: this.get("appName") || this.get("name"),
                  Arn: this.get("arn") || "",
                  ServerCertificateId: this.get("certId") || ""
                }
              }
            }
          };
        }
        return {};
      },
      updateValue: function(certObj) {
        var key, value;
        for (key in certObj) {
          value = certObj[key];
          this.set(key, value);
        }
        return null;
      }
    }, {
      handleTypes: constant.RESTYPE.IAM,
      deserialize: function(data) {
        new SslCertModel({
          id: data.uid,
          name: data.name,
          body: data.resource.CertificateBody,
          chain: data.resource.CertificateChain,
          key: data.resource.PrivateKey,
          arn: data.resource.ServerCertificateMetadata.Arn,
          certId: data.resource.ServerCertificateMetadata.ServerCertificateId,
          appName: data.resource.ServerCertificateMetadata.ServerCertificateName
        });
        return null;
      },
      createNew: function(sslCertData) {
        var needCreate, newSslCert, sslCertList;
        newSslCert = null;
        sslCertList = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
        needCreate = true;
        _.each(sslCertList, function(sslCertModel) {
          if (sslCertModel.get('body')) {
            sslCertModel.remove();
          } else {
            if (sslCertModel.get('arn') === sslCertData.get('Arn')) {
              needCreate = false;
              newSslCert = sslCertModel;
            }
          }
          return null;
        });
        if (needCreate) {
          newSslCert = new SslCertModel({
            name: sslCertData.get('Name'),
            body: sslCertData.get('CertificateBody'),
            chain: sslCertData.get('CertificateChain'),
            key: sslCertData.get('PrivateKey'),
            arn: sslCertData.get('Arn'),
            certId: sslCertData.get('id')
          });
        }
        return newSslCert;
      }
    });
    return SslCertModel;
  });

}).call(this);
