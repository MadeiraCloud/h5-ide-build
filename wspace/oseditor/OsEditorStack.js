var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["CoreEditor", "./OsViewStack", "./model/DesignOs", "CloudResources", "constant"], function(CoreEditor, StackView, DesignOs, CloudResources, constant) {

  /*
    StackEditor is mainly for editing a stack
   */
  var StackEditor;
  StackEditor = (function(_super) {
    __extends(StackEditor, _super);

    function StackEditor() {
      return StackEditor.__super__.constructor.apply(this, arguments);
    }

    StackEditor.prototype.viewClass = StackView;

    StackEditor.prototype.designClass = DesignOs;

    StackEditor.prototype.title = function() {
      return (this.design || this.opsModel).get("name") + " - stack";
    };

    StackEditor.prototype.isReady = function() {
      var region, stateModule;
      if (this.__hasAdditionalData) {
        return true;
      }
      if (!this.opsModel.hasJsonData() || !this.opsModel.isPersisted()) {
        return false;
      }
      region = this.opsModel.get("region");
      stateModule = this.opsModel.getJsonData().agent.module;
      return CloudResources(constant.RESTYPE.OSFLAVOR, region).isReady() && CloudResources(constant.RESTYPE.OSIMAGE, region).isReady() && CloudResources(constant.RESTYPE.OSKP, region).isReady() && CloudResources(constant.RESTYPE.OSNETWORK, region).isReady() && CloudResources(constant.RESTYPE.OSSNAP, region).isReady() && !!App.model.getStateModule(stateModule.repo, stateModule.tag);
    };

    StackEditor.prototype.fetchData = function() {
      var jobs, region, stateModule;
      region = this.opsModel.get("region");
      stateModule = this.opsModel.getJsonData().agent.module;
      jobs = [App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.OSFLAVOR, region).fetch(), CloudResources(constant.RESTYPE.OSIMAGE, region).fetch(), CloudResources(constant.RESTYPE.OSKP, region).fetch(), CloudResources(constant.RESTYPE.OSSNAP, region).fetch(), CloudResources(constant.RESTYPE.OSNETWORK, region).fetch()];
      if (!this.opsModel.isPersisted()) {
        jobs.unshift(this.opsModel.save());
      }
      return Q.all(jobs);
    };

    StackEditor.prototype.isModified = function() {
      if (!this.opsModel.isPersisted()) {
        return true;
      }
      return this.design && this.design.isModified();
    };

    return StackEditor;

  })(CoreEditor);
  return StackEditor;
});
