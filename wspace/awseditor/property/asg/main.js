(function() {
  define(['../base/main', './model', './view', 'constant', './app_model', './app_view'], function(PropertyModule, model, view, constant, app_model, app_view) {
    var AsgModule;
    AsgModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.ASG, "ExpandedAsg"],
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.model.isAppEdit = false;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.model.isAppEdit = true;
        this.view = app_view;
        return null;
      }
    });
    return null;
  });

}).call(this);
