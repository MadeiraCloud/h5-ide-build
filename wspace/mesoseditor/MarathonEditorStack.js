(function() {
  define(["CoreEditor", "OpsModel", "./MarathonViewStack", "./model/DesignMarathon", "CloudResources", "constant", "Credential", "./MarathonDeps"], function(CoreEditor, OpsModel, StackView, DesignMarathon, CloudResources, constant, Credential) {

    /*
      StackEditor is mainly for editing a stack
     */
    return CoreEditor.extend({
      type: "MarathonEditorStack",
      viewClass: StackView,
      designClass: DesignMarathon,
      title: function() {
        return (this.design || this.opsModel).get("name") + " - stack";
      },
      fetchData: function() {
        var credId, jobs, region, stateModule;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        credId = this.opsModel.credentialId();
        jobs = [App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(credId, constant.RESTYPE.DOCKERIMAGE, region).fetch()];
        return Q.all(jobs);
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
        return data.opsModel.type === OpsModel.Type.Mesos && data.opsModel.isStack();
      }
    });
  });

}).call(this);
