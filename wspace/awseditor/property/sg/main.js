(function() {
  define(['../base/main', './model', './view'], function(PropertyModule, model, view) {
    var SgModule;
    SgModule = PropertyModule.extend({
      subPanelID: "SG",
      initStack: function() {
        this.model = model;
        this.model.isReadOnly = false;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isReadOnly = true;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isReadOnly = false;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);
