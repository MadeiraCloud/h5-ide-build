(function() {
  define(['../base/main', './model', './view', './app_model', './app_view', 'constant'], function(PropertyModule, model, view, app_model, app_view, constant) {
    var SubnetModule;
    app_view.on('OPEN_ACL', function(acl_uid) {
      return PropertyModule.loadSubPanel("ACL", acl_uid);
    });
    view.on('OPEN_ACL', function(acl_uid) {
      PropertyModule.loadSubPanel("ACL", acl_uid);
      return null;
    });
    SubnetModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.SUBNET,
      onUnloadSubPanel: function(id) {
        if (id === "ACL" && this.view.refreshACLList) {
          return this.view.refreshACLList();
        }
      },
      initStack: function() {
        this.view = view;
        this.model = model;
        this.model.isAppEdit = false;
        return null;
      },
      initApp: function() {
        this.view = app_view;
        this.model = app_model;
        return null;
      },
      initAppEdit: function() {
        this.view = view;
        this.model = model;
        this.model.isAppEdit = true;
        return null;
      }
    });
    return null;
  });

}).call(this);
