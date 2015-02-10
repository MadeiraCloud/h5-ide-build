(function() {
  define(['../base/main', './model', './view', "event", "Design"], function(PropertyModule, model, view, ide_event, Design) {
    var StaticSubModule;
    view.on("AMI_CHANGE", function() {
      var component;
      component = Design.instance().component(PropertyModule.activeModule().uid);
      ide_event.trigger(ide_event.OPEN_PROPERTY, component.type, component.id);
      return null;
    });
    StaticSubModule = PropertyModule.extend({
      subPanelID: "STATIC",
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
