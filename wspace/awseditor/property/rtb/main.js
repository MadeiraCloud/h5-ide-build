(function() {
  define(['../base/main', './model', './view', './app_model', './app_view', 'event', 'constant'], function(PropertyModule, model, view, app_model, app_view, ide_event, constant) {
    var RTBModule;
    RTBModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.RT, "RTB_Route", "RTB_Asso"],
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
