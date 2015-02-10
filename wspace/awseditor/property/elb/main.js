(function() {
  define(['../base/main', './model', './view', './app_model', './app_view', "../sglist/main", 'constant'], function(PropertyModule, model, view, app_model, app_view, sglist_main, constant) {
    var ElbModule;
    ElbModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.ELB,
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(model);
        return null;
      }
    });
    return null;
  });

}).call(this);
