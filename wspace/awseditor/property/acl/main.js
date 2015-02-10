(function() {
  define(["../base/main", './model', './view', 'event'], function(PropertyModule, model, view) {
    var AclModule;
    model.on('REFRESH_RULE_LIST', function() {
      return view.refreshRuleList();
    });
    AclModule = PropertyModule.extend({
      subPanelID: "ACL",
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
