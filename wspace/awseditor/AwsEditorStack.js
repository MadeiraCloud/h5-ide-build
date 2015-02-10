(function() {
  define(["CoreEditor", "OpsModel", "./AwsViewStack", "./model/DesignAws", "CloudResources", "constant", "Credential", "./AwsDeps"], function(CoreEditor, OpsModel, StackView, DesignAws, CloudResources, constant, Credential) {

    /*
      StackEditor is mainly for editing a stack
     */
    return CoreEditor.extend({
      type: "AwsEditorStack",
      viewClass: StackView,
      designClass: DesignAws,
      title: function() {
        return (this.design || this.opsModel).get("name") + " - stack";
      },
      fetchData: function() {
        var credId, jobs, region, stateModule;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        credId = this.opsModel.credentialId();
        jobs = [App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(credId, constant.RESTYPE.AZ, region).fetch(), CloudResources(credId, constant.RESTYPE.SNAP, region).fetch(), CloudResources(credId, "QuickStartAmi", region).fetch(), CloudResources(credId, "MyAmi", region).fetch(), CloudResources(credId, "FavoriteAmi", region).fetch(), this.fetchAmiData(), this.fetchRdsData(false)];
        return Q.all(jobs);
      },
      fetchAmiData: function() {
        var comp, imageId, json, toFetch, uid, _ref;
        json = this.opsModel.getJsonData();
        toFetch = {};
        _ref = json.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.INSTANCE || comp.type === constant.RESTYPE.LC) {
            imageId = comp.resource.ImageId;
            if (imageId) {
              toFetch[imageId] = true;
            }
          }
        }
        return CloudResources(this.opsModel.credentialId(), constant.RESTYPE.AMI, this.opsModel.get("region")).fetchAmis(_.keys(toFetch));
      },
      isRdsDisabled: function() {
        return !!this.__disableRds;
      },
      fetchRdsData: function(isForce) {
        var credId, method, region, self;
        if (isForce == null) {
          isForce = true;
        }
        self = this;
        region = this.opsModel.get("region");
        if (isForce) {
          method = "fetchForce";
        } else {
          method = "fetch";
        }
        credId = this.opsModel.credentialId();
        return Q.all([CloudResources(credId, constant.RESTYPE.DBENGINE, region)[method](), CloudResources(credId, constant.RESTYPE.DBOG, region)[method](), CloudResources(credId, constant.RESTYPE.DBSNAP, region)[method]()]).then(function() {
          if (self.__disableRds !== false) {
            self.__disableRds = false;
            return self.trigger("toggleRdsFeature", true);
          }
        }, function(error) {
          if (error.awsErrorCode) {
            console.error("No authority to load rds data. Rds feature will be disabled.", error);
            self.__disableRds = true;
            self.trigger("toggleRdsFeature", false);
            return;
          }
          throw error;
        });
      },
      isModified: function() {
        if (!this.opsModel.isPersisted()) {
          return false;
        }
        return this.design && this.design.isModified();
      }
    }, {
      canHandle: function(data) {
        if (!data.opsModel) {
          return false;
        }
        return data.opsModel.type === OpsModel.Type.Amazon && data.opsModel.isStack();
      }
    });
  });

}).call(this);
