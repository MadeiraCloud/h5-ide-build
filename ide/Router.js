(function() {
  define(["scenes/ProjectScene", "scenes/Settings", "scenes/StackStore", "scenes/Cheatsheet", "backbone"], function(ProjectScene, Settings, StackStore, Cheatsheet) {
    return Backbone.Router.extend({
      routes: {
        "": "openProject",
        "workspace(/:project)": "openProject",
        "workspace/:project/ops(/:ops)": "openProject",
        "settings": "openSettings",
        "settings/:projectId(/:tab)": "openSettings",
        "store/:sampleId": "openStore",
        "cheatsheet": "openCheatsheet"
      },
      openStore: function(id) {
        return new StackStore({
          id: id
        });
      },
      openSettings: function(projectId, tab) {
        return new Settings({
          tab: tab,
          projectId: projectId
        });
      },
      openProject: function(projectId, opsModelId) {
        return new ProjectScene(projectId, opsModelId);
      },
      openCheatsheet: function() {
        return new Cheatsheet();
      },
      start: function() {
        var self;
        if (!Backbone.history.start({
          pushState: true
        })) {
          console.warn("URL doesn't match any routes.");
          this.navigate("/", {
            replace: true,
            trigger: true
          });
        }
        self = this;
        $(document).on("click", "a.route", function(evt) {
          return self.onRouteClicked(evt);
        });
        this.route("workspace/:project/unsaved(/:ops)", "openProject");
      },
      onRouteClicked: function(evt) {
        var currentUrl, href, lastChar, result;
        href = $(evt.currentTarget).attr("href");
        currentUrl = Backbone.history.fragment;
        lastChar = href[href.length - 1];
        if (lastChar === "/" || lastChar === "\\") {
          href = href.substring(0, href.length - 1);
        }
        result = this.navigate(href, {
          replace: true,
          trigger: true
        });
        if (result === true) {
          $(document).trigger("urlroute");
        } else if (result === false) {
          console.log("URL doesn't match any routes.");
          this.navigate(currentUrl, {
            replace: true
          });
        }
        return false;
      }
    });
  });

}).call(this);
