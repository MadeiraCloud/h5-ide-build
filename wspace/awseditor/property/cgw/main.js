(function() {
  define(['../base/main', './model', './view', './app_model', './app_view', 'constant'], function(PropertyModule, model, view, app_model, app_view, constant) {
    var CGWModule;
    CGWModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.CGW,
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
