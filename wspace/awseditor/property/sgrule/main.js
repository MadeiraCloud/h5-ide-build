(function() {
  define(['../base/main', './model', './view'], function(PropertyModule, model, view) {
    var SgRuleModule;
    SgRuleModule = PropertyModule.extend({
      handleTypes: ["ElbAmiAsso", "SgRuleLine"],
      initStack: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isApp = true;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);
