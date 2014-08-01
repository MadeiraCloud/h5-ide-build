(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./OpsEditorBase", "Design", "CloudResources", "constant"], function(OpsEditorBase, Design, CloudResources, constant) {

    /*
      StackEditor is mainly for editing a stack
     */
    var StackEditor;
    StackEditor = (function(_super) {
      __extends(StackEditor, _super);

      function StackEditor() {
        return StackEditor.__super__.constructor.apply(this, arguments);
      }

      StackEditor.prototype.title = function() {
        return (this.design || this.opsModel).get("name") + " - stack";
      };

      StackEditor.prototype.isReady = function() {
        var region, stateModule;
        if (!this.opsModel.hasJsonData() || !this.opsModel.isPersisted()) {
          return false;
        }
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return CloudResources(constant.RESTYPE.AZ, region).isReady() && CloudResources(constant.RESTYPE.SNAP, region).isReady() && CloudResources(constant.RESTYPE.DBENGINE, region).isReady() && CloudResources(constant.RESTYPE.DBOG, region).isReady() && CloudResources(constant.RESTYPE.DBSNAP, region).isReady() && CloudResources("QuickStartAmi", region).isReady() && CloudResources("MyAmi", region).isReady() && CloudResources("FavoriteAmi", region).isReady() && !!App.model.getStateModule(stateModule.repo, stateModule.tag) && this.hasAmiData();
      };

      StackEditor.prototype.fetchAdditionalData = function() {
        var jobs, region, stateModule;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        jobs = [App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.AZ, region).fetch(), CloudResources(constant.RESTYPE.SNAP, region).fetch(), CloudResources(constant.RESTYPE.DBENGINE, region).fetch(), CloudResources(constant.RESTYPE.DBOG, region).fetch(), CloudResources(constant.RESTYPE.DBSNAP, region).fetch(), CloudResources("QuickStartAmi", region).fetch(), CloudResources("MyAmi", region).fetch(), CloudResources("FavoriteAmi", region).fetch(), this.fetchAmiData()];
        if (!this.opsModel.isPersisted()) {
          jobs.unshift(this.opsModel.save());
        }
        return Q.all(jobs);
      };

      StackEditor.prototype.hasAmiData = function() {
        var cln, comp, imageId, json, uid, _ref;
        json = this.opsModel.getJsonData();
        cln = CloudResources(constant.RESTYPE.AMI, this.opsModel.get("region"));
        _ref = json.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.INSTANCE || comp.type === constant.RESTYPE.LC) {
            imageId = comp.resource.ImageId;
            if (imageId && !cln.get(imageId)) {
              return false;
            }
          }
        }
        return true;
      };

      StackEditor.prototype.fetchAmiData = function() {
        var comp, imageId, json, toFetch, uid, _ref;
        json = this.opsModel.getJsonData();
        toFetch = {};
        _ref = json.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.INSTANCE || comp.type === constant.RESTYPE.LC) {
            imageId = comp.resource.ImageId;
            if (imageId) {
              toFetch[imageId] = true;
            }
          }
        }
        return CloudResources(constant.RESTYPE.AMI, this.opsModel.get("region")).fetchAmis(_.keys(toFetch));
      };

      StackEditor.prototype.cleanup = function() {
        OpsEditorBase.prototype.cleanup.call(this);
        if (!this.opsModel.isPersisted()) {
          this.opsModel.remove();
        }
      };

      StackEditor.prototype.isModified = function() {
        if (!this.opsModel.isPersisted()) {
          return true;
        }
        return this.design && this.design.isModified();
      };

      return StackEditor;

    })(OpsEditorBase);
    return StackEditor;
  });

}).call(this);
