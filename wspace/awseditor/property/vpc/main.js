(function() {
  define(['../base/main', './model', './view', './app_model', './app_view', 'constant'], function(PropertyModule, model, view, app_model, app_view, constant) {
    var VPCModule;
    VPCModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.VPC,
      initStack: function() {
        this.model = model;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);
