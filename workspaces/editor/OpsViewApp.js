(function() {
  define(["./OpsViewBase", "OpsModel", "./template/TplOpsEditor", "UI.modalplus", "i18n!/nls/lang.js"], function(OpsViewBase, OpsModel, OpsEditorTpl, Modal, lang) {
    return OpsViewBase.extend({
      initialize: function() {
        OpsViewBase.prototype.initialize.apply(this, arguments);
        this.canvas.switchMode("app");
        if (this.workspace.isAppEditMode()) {
          this.resourcePanel.render();
        }
        this.$el.find(".OEPanelLeft").toggleClass("force-hidden", !this.workspace.isAppEditMode());
        this.toggleProcessing();
        this.updateProgress();
      },
      confirmImport: function() {
        var modal, self;
        self = this;
        modal = new Modal({
          title: "App Imported",
          template: OpsEditorTpl.modal.confirmImport({
            name: this.workspace.opsModel.get("name")
          }),
          confirm: {
            text: "Done"
          },
          disableClose: true,
          hideClose: true,
          onCancel: function() {
            self.workspace.remove();
          },
          onConfirm: function() {
            var $ipt, json;
            $ipt = modal.tpl.find("#ImportSaveAppName");
            $ipt.parsley('custom', function(val) {
              var apps;
              if (!MC.validate('awsName', val)) {
                return lang.ide.PARSLEY_SHOULD_BE_A_VALID_STACK_NAME;
              }
              apps = App.model.appList().where({
                name: val
              });
              if (apps.length === 1 && apps[0] === self.workspace.opsModel || apps.length === 0) {
                return;
              }
              return sprintf(lang.ide.PARSLEY_TYPE_NAME_CONFLICT, 'App', val);
            });
            if (!$ipt.parsley('validate')) {
              return;
            }
            modal.tpl.find(".modal-confirm").attr("disabled", "disabled");
            json = self.workspace.design.serialize();
            json.name = $ipt.val();
            json.usage = $("#app-usage-selectbox").find(".item.selected").attr('data-value') || "testing";
            return self.workspace.opsModel.saveApp(json).then(function() {
              self.workspace.design.set("name", json.name);
              return modal.close();
            }, function(err) {
              notification("error", err.msg);
              modal.tpl.find(".modal-confirm").removeAttr("disabled");
            });
          }
        });
      },
      toggleProcessing: function() {
        var opsModel, text;
        if (!this.$el) {
          return;
        }
        this.toolbar.updateTbBtns();
        this.statusbar.update();
        this.$el.children(".ops-process").remove();
        opsModel = this.workspace.opsModel;
        if (!opsModel.isProcessing()) {
          return;
        }
        switch (opsModel.get("state")) {
          case OpsModel.State.Starting:
            text = "Starting your app...";
            break;
          case OpsModel.State.Stopping:
            text = "Stopping your app...";
            break;
          case OpsModel.State.Terminating:
            text = "Terminating your app..";
            break;
          case OpsModel.State.Updating:
            text = "Applying changes to your app...";
            break;
          default:
            console.warn("Unknown opsmodel state when showing loading in AppEditor,", opsModel);
            text = "Processing your request...";
        }
        this.__progress = 0;
        this.$el.append(OpsEditorTpl.appProcessing(text));
      },
      updateProgress: function() {
        var $p, pp, pro;
        pp = this.workspace.opsModel.get("progress");
        $p = this.$el.find(".ops-process");
        $p.toggleClass("has-progess", !!pp);
        if (this.__progress > pp) {
          $p.toggleClass("rolling-back", true);
        }
        this.__progress = pp;
        pro = "" + pp + "%";
        $p.find(".process-info").text(pro);
        $p.find(".bar").css({
          width: pro
        });
      },
      switchMode: function(isAppEditMode) {
        this.toolbar.updateTbBtns();
        this.statusbar.update();
        this.$el.find(".OEPanelLeft").toggleClass("force-hidden", !isAppEditMode);
        if (isAppEditMode) {
          this.resourcePanel.render();
        } else {
          this.$el.find(".OEPanelLeft").empty();
        }
        this.propertyPanel.openPanel();
        this.canvas.switchMode(isAppEditMode ? "appedit" : "app");
      },
      showUpdateStatus: function(error, loading) {
        var self;
        this.$el.find(".ops-process").remove();
        self = this;
        $(OpsEditorTpl.appUpdateStatus({
          error: error,
          loading: loading
        })).appendTo(this.$el).find("#processDoneBtn").click(function() {
          return self.$el.find(".ops-process").remove();
        });
      }
    });
  });

}).call(this);
