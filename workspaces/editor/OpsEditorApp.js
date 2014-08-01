(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./OpsEditorStack", "./OpsViewApp", "ResDiff", "OpsModel", "Design", "CloudResources", "constant"], function(StackEditor, AppView, ResDiff, OpsModel, Design, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.viewClass = AppView;

      AppEditor.prototype.title = function() {
        return ((this.design || this.opsModel).get("name") || this.opsModel.get("importVpcId")) + " - app";
      };

      AppEditor.prototype.tabClass = function() {
        switch (this.opsModel.get("state")) {
          case OpsModel.State.Running:
            return "icon-app-running";
          case OpsModel.State.Stopped:
            return "icon-app-stopped";
          default:
            return "icon-app-pending";
        }
      };

      AppEditor.prototype.isReady = function() {
        return !!this.__hasAdditionalData;
      };

      AppEditor.prototype.fetchAdditionalData = function() {
        var region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.AZ, region).fetch(), CloudResources(constant.RESTYPE.SNAP, region).fetch(), CloudResources(constant.RESTYPE.DHCP, region).fetch(), CloudResources(constant.RESTYPE.DBENGINE, region).fetch(), CloudResources(constant.RESTYPE.DBOG, region).fetch(), CloudResources(constant.RESTYPE.DBSNAP, region).fetch(), CloudResources("QuickStartAmi", region).fetch(), CloudResources("MyAmi", region).fetch(), CloudResources("FavoriteAmi", region).fetch(), this.loadVpcResource(), this.fetchAmiData()]).then(function() {
          var newJson, oldJson;
          if (self.isRemoved()) {
            return;
          }
          if (self.opsModel.isImported()) {
            return;
          }
          if (!self.opsModel.testState(OpsModel.State.Running)) {
            return;
          }
          oldJson = self.opsModel.getJsonData();
          newJson = self.opsModel.generateJsonFromRes();
          self.differ = new ResDiff({
            old: oldJson,
            "new": newJson,
            callback: function(confirm) {
              if (confirm) {
                return self.opsModel.saveApp(self.design.serialize());
              } else {
                self.opsModel.__setJsonData(oldJson);
                return self.remove();
              }
            }
          });
          if (self.differ.getChangeInfo().hasResChange) {
            self.opsModel.__setJsonData(newJson);
          }
        }, function(err) {
          if (err.error === 286) {
            self.view.showVpcNotExist(self.opsModel.get("name"), function() {
              return self.opsModel.terminate(true);
            });
            self.remove();
            return;
          }
          throw err;
        });
      };

      AppEditor.prototype.delayUntilAwake = function(method) {
        if (this.isAwake()) {
          method.call(this);
        } else {
          console.info("AppEditor's action is delayed until wake up.");
          this.__calledUponWakeup = method;
        }
      };

      AppEditor.prototype.awake = function() {
        StackEditor.prototype.awake.call(this);
        if (this.__calledUponWakeup) {
          this.__calledUponWakeup.call(this);
          this.__calledUponWakeup = null;
        }
      };

      AppEditor.prototype.isAppEditMode = function() {
        return !!this.__appEdit;
      };

      AppEditor.prototype.isModified = function() {
        return this.isAppEditMode() && this.design && this.design.isModified();
      };

      AppEditor.prototype.initEditor = function() {
        if (this.differ && this.differ.getChangeInfo().hasResChange) {
          this.differ.render();
          this.differ = null;
        }
        if (this.opsModel.isImported()) {
          this.updateTab();
          this.view.confirmImport();
        }
      };

      AppEditor.prototype.refreshResource = function() {};

      AppEditor.prototype.switchToEditMode = function() {
        if (this.isAppEditMode()) {
          return;
        }
        this.__appEdit = true;
        this.design.setMode(Design.MODE.AppEdit);
        this.view.switchMode(true);
      };

      AppEditor.prototype.cancelEditMode = function(force) {
        var modfied;
        modfied = force || this.design.isModified();
        if (modfied && !force) {
          return false;
        }
        this.__appEdit = false;
        if (modfied) {
          this.recreateDesign();
        } else {
          this.design.setMode(Design.MODE.App);
        }
        this.view.switchMode(false);
        return true;
      };

      AppEditor.prototype.recreateDesign = function() {
        return this.design.reload(this.opsModel);
      };

      AppEditor.prototype.loadVpcResource = function() {
        return CloudResources("OpsResource", this.opsModel.getVpcId()).init(this.opsModel.get("region")).fetchForce();
      };

      AppEditor.prototype.applyAppEdit = function(newJson, fastUpdate) {
        var self;
        if (!newJson) {
          this.__appEdit = false;
          this.design.setMode(Design.MODE.App);
          this.view.switchMode(false);
          return;
        }
        self = this;
        this.__applyingUpdate = true;
        fastUpdate = fastUpdate && !this.opsModel.testState(OpsModel.State.Stopped);
        this.opsModel.update(newJson, fastUpdate).then(function() {
          if (fastUpdate) {
            return self.onAppEditDone();
          } else {
            self.view.showUpdateStatus("", true);
            return self.loadVpcResource().then(function() {
              return self.onAppEditDone();
            });
          }
        }, function(err) {
          var msg;
          self.__applyingUpdate = false;
          self.view.stopListening(self.opsModel, "change:progress", self.view.updateProgress);
          msg = err.msg;
          if (err.result) {
            msg += "\n" + err.result;
          }
          msg = msg.replace(/\n/g, "<br />");
          self.view.showUpdateStatus(msg);
        });
        this.view.listenTo(this.opsModel, "change:progress", this.view.updateProgress);
        return true;
      };

      AppEditor.prototype.onAppEditDone = function() {
        return this.delayUntilAwake(this.__onAppEditDone);
      };

      AppEditor.prototype.__onAppEditDone = function() {
        if (this.isRemoved()) {
          return;
        }
        this.__appEdit = this.__applyingUpdate = false;
        this.view.stopListening(this.opsModel, "change:progress", this.view.updateProgress);
        this.recreateDesign();
        this.design.setMode(Design.MODE.App);
        this.view.showUpdateStatus();
        this.view.switchMode(false);
        this.saveThumbnail();
      };

      AppEditor.prototype.onOpsModelStateChanged = function() {
        var self;
        if (!this.isInited()) {
          return;
        }
        if (this.opsModel.testState(OpsModel.State.Saving)) {
          return;
        }
        this.updateTab();
        if (this.opsModel.isProcessing()) {
          this.view.toggleProcessing();
        } else if (!this.__applyingUpdate && !this.opsModel.testState(OpsModel.State.Destroyed)) {
          self = this;
          this.view.showUpdateStatus("", true);
          this.loadVpcResource().then(function() {
            return self.delayUntilAwake(self.onVpcResLoaded);
          });
        }
        return StackEditor.prototype.onOpsModelStateChanged.call(this);
      };

      AppEditor.prototype.onVpcResLoaded = function() {
        if (this.isRemoved()) {
          return;
        }
        this.view.canvas.update();
        this.view.toggleProcessing();
      };

      return AppEditor;

    })(StackEditor);
    return AppEditor;
  });

}).call(this);
