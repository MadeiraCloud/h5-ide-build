(function() {
  define(["CoreEditorApp", "./AwsViewApp", "./model/DesignAws", "./AwsEditorStack", "OpsModel", "CloudResources", "constant", "./AwsDeps"], function(CoreEditorApp, AppView, DesignAws, StackEditor, OpsModel, CloudResources, constant) {
    return CoreEditorApp.extend({
      type: "AwsEditorApp",
      viewClass: AppView,
      designClass: DesignAws,
      fetchData: function() {
        var credId, region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        credId = this.opsModel.credentialId();
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(credId, constant.RESTYPE.AZ, region).fetch(), CloudResources(credId, constant.RESTYPE.SNAP, region).fetch(), CloudResources(credId, constant.RESTYPE.DHCP, region).fetch(), CloudResources(credId, "QuickStartAmi", region).fetch(), CloudResources(credId, "MyAmi", region).fetch(), CloudResources(credId, "FavoriteAmi", region).fetch(), this.loadVpcResource(), this.fetchAmiData(), this.fetchRdsData(false)]).fail(function(err) {
          return self.__handleDataError(err);
        });
      },
      __handleDataError: function(err) {
        if (err.error === 286) {
          this.view.showVpcNotExist(this.opsModel.get("name"), (function(_this) {
            return function() {
              return _this.opsModel.terminate(true);
            };
          })(this));
          this.remove();
          return;
        }
        throw err;
      },
      fetchAmiData: StackEditor.prototype.fetchAmiData,
      fetchRdsData: StackEditor.prototype.fetchRdsData,
      isRdsDisabled: StackEditor.prototype.isRdsDisabled
    }, {
      canHandle: function(data) {
        if (!data.opsModel) {
          return false;
        }
        return data.opsModel.type === OpsModel.Type.Amazon && data.opsModel.isApp() && !data.opsModel.isProcessing();
      }
    });
  });

}).call(this);
