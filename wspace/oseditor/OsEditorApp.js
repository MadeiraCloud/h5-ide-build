(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["CoreEditorApp", "./OsViewApp", "./model/DesignOs", "OpsModel", "CloudResources", "constant"], function(CoreEditorApp, AppView, DesignOs, OpsModel, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.viewClass = AppView;

      AppEditor.prototype.designClass = DesignOs;

      AppEditor.prototype.fetchData = function() {
        var region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.OSFLAVOR, region).fetch(), CloudResources(constant.RESTYPE.OSIMAGE, region).fetch(), CloudResources(constant.RESTYPE.OSKP, region).fetch(), CloudResources(constant.RESTYPE.OSIMAGE, region).fetch(), CloudResources(constant.RESTYPE.OSNETWORK, region).fetch(), CloudResources(constant.RESTYPE.OSVOL, region).fetch(), this.loadVpcResource()]);
      };

      return AppEditor;

    })(CoreEditorApp);
    return AppEditor;
  });

}).call(this);
