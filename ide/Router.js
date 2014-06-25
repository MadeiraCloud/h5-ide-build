(function() {
  define(["backbone"], function() {
    var IdeRouter;
    return IdeRouter = Backbone.Router.extend({
      routes: {
        "": "openDashboard"
      },
      initialize: function() {
        this.route(/^ops\/([^/]+$)/, "openOps");
        this.route(/^store\/([^/]+$)/, "openStore");
      },
      openStore: function(id) {
        var opsModel;
        opsModel = App.model.stackList().findWhere({
          sampleId: id
        });
        if (!opsModel) {
          opsModel = App.model.createSampleOps(id);
        }
        Router.navigate(opsModel.url(), {
          replace: true
        });
        App.openOps(opsModel);
      },
      openOps: function(id) {
        if (!App.openOps(id)) {
          Router.navigate("/", {
            replace: true
          });
        }
      },
      openDashboard: function() {
        if (window.Dashboard) {
          return window.Dashboard.activate();
        }
      },
      start: function() {
        if (!Backbone.history.start({
          pushState: true
        })) {
          console.warn("URL doesn't match any routes.");
          this.navigate("/", {
            replace: true
          });
        }
        this.route(/^ops\/([^/]+)/, "openOps");
      },
      execute: function() {
        this.__forceReplace = true;
        Backbone.Router.prototype.execute.apply(this, arguments);
        this.__forceReplace = false;
      },
      navigate: function(fragment, options) {
        if (this.__forceReplace) {
          options = options || {};
          options.replace = true;
        }
        return Backbone.Router.prototype.navigate.apply(this, arguments);
      }
    });
  });

}).call(this);
