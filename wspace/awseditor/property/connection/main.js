(function() {
  define(['../base/main', './model', './view'], function(PropertyModule, model, view) {
    var ConnectionModule;
    ConnectionModule = PropertyModule.extend({
      handleTypes: ["EniAttachment", "ElbSubnetAsso"],
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);
