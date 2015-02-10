(function() {
  define(["../base/main", "./app_model", "./app_view", "../sglist/main", "constant", "event"], function(PropertyModule, app_model, app_view, sglist_main, constant, ide_event) {
    var ServerGroupModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.PROPERTY_REFRESH_ENI_IP_LIST] = function() {
      this.model.getEni();
      this.view.refreshIPList();
      return null;
    };
    ServerGroupModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: 'component_server_group',
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.model.isAppEdit = false;
        this.view = app_view;
        return null;
      },
      setupAppEdit: function() {
        this.view.on("OPEN_AMI", function(id) {
          return PropertyModule.loadSubPanel("STATIC", id);
        });
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.model.isAppEdit = true;
        this.view = app_view;
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
