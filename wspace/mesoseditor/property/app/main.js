define(["Design", "../base/main", "./view", "./app_view", "constant", "CloudResources", "event"], function(Design, PropertyModule, view, appView, constant, CloudResources) {
  return PropertyModule.extend({
    handleTypes: [constant.RESTYPE.MRTHAPP],
    initStack: function(uid) {
      this.view = view;
      this.model = Design.instance().component(uid);
      this.view.isAppEdit = false;
      return null;
    },
    initApp: function(uid) {
      var path;
      this.view = appView;
      this.model = Design.instance().component(uid);
      path = this.model.path();
      this.view.appData = CloudResources(Design.instance().credentialId(), constant.RESTYPE.MRTHAPP, Design.instance().serialize().id).filter(function(model) {
        return model.get("id") === path;
      });
      this.view.isAppEdit = false;
      return null;
    },
    initAppEdit: function(uid) {
      var path;
      this.view = view;
      this.view.isAppEdit = true;
      this.model = Design.instance().component(uid);
      this.view.model = Design.instance().component(uid);
      path = this.view.model.path();
      this.view.appData = CloudResources(Design.instance().credentialId(), constant.RESTYPE.MRTHAPP, Design.instance().serialize().id).filter(function(model) {
        return model.get("id") === path;
      });
      return null;
    }
  });
});
