(function() {
  define(["../base/main", "./model", "./view", "./app_model", "./app_view", "../sglist/main", 'event', "constant"], function(PropertyModule, model, view, app_model, app_view, sglist_main, ide_event, constant) {
    var EniModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.PROPERTY_REFRESH_ENI_IP_LIST] = function() {
      this.model.getIpList();
      this.view.refreshIpList();
      return null;
    };
    EniModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: [constant.RESTYPE.ENI, "component_eni_group"],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initStack: function() {
        this.model = model;
        this.model.isAppEdit = false;
        this.model.isGroupMode = false;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        if (!this.model.attributes.association) {
          return sglist_main.loadModule(this.model);
        }
      },
      initApp: function() {
        this.model = app_model;
        this.model.isGroupMode = this.handle === "component_eni_group";
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        if (!this.model.isGroupMode) {
          sglist_main.loadModule(this.model);
        }
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);
