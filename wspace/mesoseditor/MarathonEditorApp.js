(function() {
  define(["CoreEditorApp", "./MarathonViewApp", "./model/DesignMarathon", "./MarathonEditorStack", "OpsModel", "CloudResources", "constant", "./MarathonDeps"], function(CoreEditorApp, AppView, DesignMarathon, StackEditor, OpsModel, CloudResources, constant) {
    return CoreEditorApp.extend({
      type: "MarathonEditorApp",
      viewClass: AppView,
      designClass: DesignMarathon,
      initEditor: function() {
        var self;
        self = this;
        this.__refreshInterval = setInterval(function() {
          return self.loadVpcResource();
        }, 8000);
        return CoreEditorApp.prototype.initEditor.call(this);
      },
      cleanup: function() {
        if (this.__refreshInterval) {
          console.log("Clearing AutoRefresh Interval");
          clearInterval(this.__refreshInterval);
          this.__refreshInterval = null;
        }
        return CoreEditorApp.prototype.cleanup.call(this);
      },
      fetchData: function() {
        var credId, region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        credId = this.opsModel.credentialId();
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(credId, constant.RESTYPE.DOCKERIMAGE, region).fetch(), CloudResources(credId, constant.RESTYPE.MRTHAPP, this.opsModel.id).fetch(), CloudResources(credId, constant.RESTYPE.MRTHGROUP, this.opsModel.id).fetch()]);
      },
      diff: function() {},
      loadVpcResource: function() {
        return CloudResources(this.opsModel.credentialId(), constant.RESTYPE.MRTHAPP, this.opsModel.id).fetch();
      }
    }, {
      canHandle: function(data) {
        if (!data.opsModel) {
          return false;
        }
        return data.opsModel.type === OpsModel.Type.Mesos && data.opsModel.isApp() && !data.opsModel.isProcessing();
      }
    });
  });

}).call(this);
