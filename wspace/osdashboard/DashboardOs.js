(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["Workspace", "./DashboardView", "./DashboardModel", 'i18n!/nls/lang.js'], function(Workspace, DashboardView, DashboardModel, lang) {
    var Dashboard;
    Dashboard = (function(_super) {
      __extends(Dashboard, _super);

      function Dashboard() {
        return Dashboard.__super__.constructor.apply(this, arguments);
      }

      Dashboard.prototype.isFixed = function() {
        return true;
      };

      Dashboard.prototype.tabClass = function() {
        return "icon-dashboard";
      };

      Dashboard.prototype.title = function() {
        return lang.IDE.NAV_TIT_DASHBOARD;
      };

      Dashboard.prototype.url = function() {
        return "/";
      };

      Dashboard.prototype.initialize = function() {
        var self;
        this.model = new DashboardModel();
        this.view = new DashboardView({
          model: this.model
        });
        self = this;
        this.listenTo(App.model.stackList(), "update", function() {
          return self.__renderControl("updateOpsList");
        });
        this.listenTo(App.model.appList(), "update", function() {
          return self.__renderControl("updateOpsList");
        });
        this.listenTo(App.model.stackList(), "change", function() {
          return self.__renderControl("updateOpsList", arguments);
        });
        this.listenTo(App.model.appList(), "change", function() {
          return self.__renderControl("updateOpsList", arguments);
        });
        this.listenTo(this.model, "change:regionResources", function(type) {
          self.view.markUpdated();
          return self.__renderControl("updateRegionResources", arguments);
        });
        this.view.listenTo(App.model.appList(), "change:progress", this.view.updateAppProgress);
        this.model.fetchOsResources();
        this.__renderControlMap = {};
      };

      Dashboard.prototype.sleep = function() {
        this.__renderControlMap = {};
        this.view.sleep();
      };

      Dashboard.prototype.awake = function() {
        var method;
        for (method in this.__renderControlMap) {
          this.view[method]();
        }
        this.__renderControlMap = null;
        this.view.awake();
      };

      Dashboard.prototype.__renderControl = function(method, args) {
        if (this.__renderControlMap) {
          console.log("DashboardView's render is throttled, method name: " + method);
          this.__renderControlMap[method] = true;
        } else {
          this.view[method].apply(this.view, args);
        }
      };

      return Dashboard;

    })(Workspace);
    return Dashboard;
  });

}).call(this);
