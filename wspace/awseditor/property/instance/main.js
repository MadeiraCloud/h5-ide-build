(function() {
  define(["../base/main", "./model", "./view", "./app_model", "./app_view", "../sglist/main", "constant", "event"], function(PropertyModule, model, view, app_model, app_view, sglist_main, constant, ide_event) {
    var InstanceModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.PROPERTY_REFRESH_ENI_IP_LIST] = function() {
      if (this.model.getEni) {
        this.model.getEni();
      }
      if (this.view.refreshIPList) {
        this.view.refreshIPList();
      }
      return null;
    };
    InstanceModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: [constant.RESTYPE.INSTANCE, 'component_asg_instance'],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      setupStack: function() {
        this.view.on("OPEN_AMI", function(id) {
          return PropertyModule.loadSubPanel("STATIC", id);
        });
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
      setupApp: function() {
        var me;
        me = this;
        this.view.on("OPEN_AMI", function(id) {
          return PropertyModule.loadSubPanel("STATIC", id);
        });
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
      }
    });
    return null;
  });

}).call(this);
