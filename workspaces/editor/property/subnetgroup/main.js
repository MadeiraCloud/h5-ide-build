(function() {
  define(["Design", "../base/main", "./view", './app_view', 'CloudResources', "constant"], function(Design, PropertyModule, view, app_view, CloudResources, constant) {
    var SubnetGroupModule;
    SubnetGroupModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.DBSBG],
      initStack: function(uid) {
        this.model = Design.instance().component(uid);
        this.view = view;
        return null;
      },
      initApp: function(uid) {
        var _ref;
        this.model = Design.instance().component(uid);
        this.view = app_view;
        this.view.appModel = (_ref = CloudResources(constant.RESTYPE.DBSBG, Design.instance().region())) != null ? _ref.get(this.model.get('appId')) : void 0;
        return null;
      },
      initAppEdit: function(uid) {
        this.model = Design.instance().component(uid);
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);
