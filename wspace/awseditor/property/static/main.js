(function() {
  define(['../base/main', './model', './view', 'constant'], function(PropertyModule, model, view, constant) {
    var StaticModule;
    StaticModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.VGW, constant.RESTYPE.IGW],
      initStack: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = false;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = true;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = true;
        return null;
      }
    });
    return null;
  });

}).call(this);
