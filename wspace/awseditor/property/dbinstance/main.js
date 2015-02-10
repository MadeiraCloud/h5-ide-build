(function() {
  define(["Design", "CloudResources", "../base/main", "./model", "./view", "./app_view", "../sglist/main", "constant", "event"], function(Design, CloudResources, PropertyModule, model, view, app_view, sglist_main, constant) {
    var DBInstanceModule;
    DBInstanceModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.DBINSTANCE],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      setupStack: function() {
        return null;
      },
      initStack: function(uid) {
        this.view = view;
        this.model = model;
        this.view.resModel = Design.instance().component(uid);
        this.view.isAppEdit = false;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      setupApp: function() {
        return null;
      },
      initApp: function(uid) {
        var resModel;
        resModel = Design.instance().component(uid);
        if (resModel.serialize().component.resource.ReadReplicaSourceDBInstanceIdentifier) {
          uid = resModel.serialize().component.resource.ReadReplicaSourceDBInstanceIdentifier.split(".")[0].split('{').pop();
        }
        this.model = (CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(resModel.get('appId'))) || (CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBSNAP, Design.instance().region()).get(resModel.get('snapshotId'))) || resModel;
        this.view = app_view;
        this.view.model = this.model;
        this.view.resModel = resModel;
        this.view.isAppEdit = false;
        return null;
      },
      initAppEdit: function(uid) {
        var originJson, resModel;
        resModel = Design.instance().component(uid);
        this.view = view;
        this.model = model;
        this.view.resModel = resModel;
        originJson = Design.instance().__opsModel.getJsonData();
        view.originComp = originJson.component[resModel.id];
        if (resModel.get('appId')) {
          this.view.isAppEdit = true;
          this.view.appModel = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(resModel.get('appId'));
        } else {
          this.view.isAppEdit = false;
        }
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.view.resModel);
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.view.resModel);
        return null;
      }
    });
    null;
    return DBInstanceModule;
  });

}).call(this);
