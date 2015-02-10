(function() {
  define(["../base/main", "./model", "./view", "./app_view", "../sglist/main", "constant", "event"], function(PropertyModule, model, view, app_view, sglist_main, constant, ide_event) {
    var LCModule;
    model.on("KP_DOWNLOADED", function(data, option) {
      return app_view.updateKPModal(data, option);
    });
    app_view.on("OPEN_AMI", function(id) {
      return PropertyModule.loadSubPanel("STATIC", id);
    });
    view.on("OPEN_AMI", function(id) {
      return PropertyModule.loadSubPanel("STATIC", id);
    });
    LCModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.LC,
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initStack: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isApp = true;
        this.model.isAppEdit = false;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = true;
        this.model.isAppEdit = true;
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
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
