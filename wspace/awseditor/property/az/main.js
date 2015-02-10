(function() {
  define(['../base/main', './model', './view', 'constant'], function(PropertyModule, model, view, constant) {
    var AZModule;
    AZModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.AZ,
      initStack: function() {
        this.model = model;
        this.view = view;
        this.view.isAppEdit = false;
      },
      initApp: function() {
        return false;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        this.view.isAppEdit = true;
      }
    });
    return null;
  });

}).call(this);
