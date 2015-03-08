(function() {
  define(["OpsModel", "../template/TplOpsEditor", "ThumbnailUtil", "JsonExporter", "ApiRequest", "i18n!/nls/lang.js", "UI.modalplus", "ResDiff", 'constant', 'TaGui', "CloudResources", "AppAction", "UI.notification", "backbone"], function(OpsModel, OpsEditorTpl, Thumbnail, JsonExporter, ApiRequest, lang, Modal, ResDiff, constant, TA, CloudResources, AppAction) {
    return Backbone.View.extend({
      events: {
        "click .icon-save": "saveStack",
        "click .icon-delete": "deleteStack",
        "click .icon-duplicate": "duplicateStack",
        "click .icon-new-stack": "createStack",
        "click .icon-zoom-in": "zoomIn",
        "click .icon-zoom-out": "zoomOut",
        "click .icon-export-png": "exportPNG",
        "click .icon-export-json": "exportJson",
        "click .runApp": 'runStack',
        "OPTION_CHANGE .toolbar-line-style": "setTbLineStyle",
        "click .icon-terminate": "terminateApp",
        "click .icon-refresh": "refreshResource",
        "click .icon-update-app": "switchToAppEdit",
        "click .icon-apply-app": "applyAppEdit",
        "click .icon-cancel-update-app": "cancelAppEdit"
      },
      initialize: function(options) {
        var btn, btns, opsModel, tpl, _i, _len;
        _.extend(this, options);
        this.appAction = new AppAction({
          workspace: this.workspace
        });
        opsModel = this.workspace.opsModel;
        if (opsModel.isStack()) {
          btns = ["BtnRunStack", "BtnStackOps", "BtnZoom", "BtnExport", "BtnLinestyle"];
        } else {
          btns = ["BtnEditApp", "BtnAppOps", "BtnReloadRes"];
        }
        tpl = "";
        for (_i = 0, _len = btns.length; _i < _len; _i++) {
          btn = btns[_i];
          tpl += OpsEditorTpl.toolbar[btn]();
        }
        this.setElement(this.parent.$el.find(".OEPanelTop").html(tpl));
        this.updateZoomButtons();
        this.updateTbBtns();
        this.listenTo(this.workspace.opsModel, "change:state", this.updateTbBtns);
      },
      updateTbBtns: function() {
        var ami, hasState, isAppEdit, opsModel, running, stopped;
        if (this.workspace.isRemoved()) {
          return;
        }
        opsModel = this.workspace.opsModel;
        this.$el.children(".toolbar-line-style").children(".dropdown").children().eq(parseInt(localStorage.getItem("canvas/lineStyle"), 10) || 2).click();
        if (opsModel.isApp()) {
          isAppEdit = this.workspace.isAppEditMode && this.workspace.isAppEditMode();
          this.$el.children(".icon-update-app").toggle(!isAppEdit);
          this.$el.children(".icon-apply-app, .icon-cancel-update-app").toggle(isAppEdit);
          if (isAppEdit) {
            this.$el.children(".icon-terminate, .icon-forget-app, .icon-stop, .icon-play, .icon-refresh, .icon-save-app, .icon-reload").hide();
            this.$el.find(".icon-refresh").hide();
          } else {
            running = opsModel.testState(OpsModel.State.Running);
            stopped = opsModel.testState(OpsModel.State.Stopped);
            this.$el.children(".icon-terminate, .icon-forget-app, .icon-refresh, .icon-save-app, .icon-reload").show();
            this.$el.children(".icon-stop").toggle(opsModel.get("stoppable") && running);
            this.$el.children(".icon-play").toggle(stopped).toggleClass("toolbar-btn-primary seperator", opsModel.testState(OpsModel.State.Stopped)).find("span").toggle(stopped);
            this.$el.children('.icon-update-app').toggle(!stopped);
            this.$el.find(".icon-refresh").toggle(running);
            ami = [].concat(this.workspace.design.componentsOfType(constant.RESTYPE.INSTANCE), this.workspace.design.componentsOfType(constant.RESTYPE.LC));
            hasState = _.find(ami, function(comp) {
              var _ref;
              return comp && (((_ref = comp.attributes.state) != null ? _ref.length : void 0) > 0);
            });
            this.$el.find('.reload-states').toggle(!!hasState);
          }
        }
        if (this.workspace.opsModel.testState(OpsModel.State.Saving)) {
          this.$el.children(".icon-save").attr("disabled", "disabled");
        } else {
          this.$el.children(".icon-save").removeAttr("disabled");
        }
        this.updateZoomButtons();
      },
      setTbLineStyle: function(ls, attr) {
        localStorage.setItem("canvas/lineStyle", attr);
        if (this.parent.canvas) {
          this.parent.canvas.updateLineStyle();
        }
      },
      toggleSgLine: function() {
        var sgBtn, show;
        sgBtn = $(".icon-hide-sg");
        show = sgBtn.hasClass("selected");
        if (show) {
          sgBtn.data("tooltip", lang.TOOLBAR.LBL_LINESTYLE_HIDE_SG).removeClass("selected");
        } else {
          sgBtn.data("tooltip", lang.TOOLBAR.LBL_LINESTYLE_SHOW_SG).addClass("selected");
        }
        this.parent.canvas.toggleSgLine(show);
      },
      saveStack: function(evt) {
        var self;
        self = this;
        this.workspace.saveStack().then(function() {
          return notification("info", sprintf(lang.NOTIFY.ERR_SAVE_SUCCESS, self.workspace.opsModel.get("name")));
        }, function(e) {
          var modal;
          if (e.error === ApiRequest.Errors.StackConflict) {
            return modal = new Modal({
              title: lang.IDE.TITLE_OPS_CONFLICT,
              width: "420",
              disableClose: true,
              template: OpsEditorTpl.modal.confliction(),
              cancel: {
                hide: true
              },
              confirm: {
                color: "blue",
                text: lang.IDE.HEAD_BTN_DONE
              },
              onConfirm: function() {
                return modal.close();
              }
            });
          } else {
            return notification("error", e.msg);
          }
        });
      },
      deleteStack: function() {
        return this.appAction.deleteStack(this.workspace.opsModel.cid, this.workspace.opsModel.get("name"), this.workspace);
      },
      createStack: function() {
        return App.loadUrl(this.workspace.scene.project.createStack(this.workspace.design.region()).url());
      },
      duplicateStack: function() {
        return App.loadUrl(this.workspace.scene.project.createStackByJson(this.workspace.design.serialize()).url());
      },
      zoomIn: function() {
        this.parent.canvas.zoomIn();
        return this.updateZoomButtons();
      },
      zoomOut: function() {
        this.parent.canvas.zoomOut();
        return this.updateZoomButtons();
      },
      updateZoomButtons: function() {
        var scale;
        scale = this.parent.canvas ? this.parent.canvas.scale() : 1;
        if (scale <= 1) {
          this.$el.find(".icon-zoom-in").attr("disabled", "disabled");
        } else {
          this.$el.find(".icon-zoom-in").removeAttr("disabled");
        }
        if (scale >= 1.6) {
          this.$el.find(".icon-zoom-out").attr("disabled", "disabled");
        } else {
          this.$el.find(".icon-zoom-out").removeAttr("disabled");
        }
      },
      exportPNG: function() {
        var design, modal, name;
        modal = new Modal({
          title: lang.IDE.TITLE_EXPORT_PNG,
          template: OpsEditorTpl["export"].PNG(),
          width: "470",
          disableFooter: true,
          compact: true,
          onClose: function() {
            modal = null;
          }
        });
        design = this.workspace.design;
        name = design.get("name");
        Thumbnail.exportPNG(this.parent.getSvgElement(), {
          isExport: true,
          createBlob: true,
          name: name,
          id: design.get("id"),
          onFinish: function(data) {
            var btn;
            if (!modal) {
              return;
            }
            modal.tpl.find(".loading-spinner").remove();
            modal.tpl.find("section").show().prepend("<img style='max-height:100%;display:inline-block;' src='" + data.image + "' />");
            btn = modal.tpl.find("a.btn-blue").click(function() {
              return modal.close();
            });
            if (data.blob) {
              btn.click(function() {
                JsonExporter.download(data.blob, "" + name + ".png");
                return false;
              });
            } else {
              btn.attr({
                href: data.image,
                download: "" + name + ".png"
              });
            }
            modal.resize();
          }
        });
      },
      exportJson: function() {
        var data, date, design, name, username;
        design = this.workspace.design;
        username = App.user.get('username');
        date = MC.dateFormat(new Date(), "yyyy-MM-dd");
        name = [design.get("name"), username, date].join("-");
        data = JsonExporter.exportJson(design.serialize(), "" + name + ".json");
        if (data) {
          return new Modal({
            title: lang.TOOLBAR.EXPORT_AS_JSON,
            template: OpsEditorTpl["export"].JSON(data),
            width: "470",
            disableFooter: true,
            compact: true
          });
        }
      },
      runStack: function(event) {
        var that;
        that = this;
        if ($(event.currentTarget).attr('disabled')) {
          return false;
        }
        return this.doRunStack();
      },
      doRunStack: function() {
        var appNameDom, appUrlDom, checkAppNameRepeat, cloudType, self, validate;
        cloudType = this.workspace.opsModel.type;
        self = this;
        this.modal = new Modal({
          title: 'Run Marathon on Mesos Cluster',
          template: MC.template.modalRunMesos,
          disableClose: true,
          width: '465px',
          compact: true,
          confirm: {
            text: 'Run',
            disabled: true
          }
        });
        this.modal.find('.modal-input-value').val(this.workspace.opsModel.get("name"));
        appNameDom = this.modal.find('#app-name');
        appUrlDom = this.modal.find('#app-url');
        checkAppNameRepeat = this.checkAppNameRepeat.bind(this);
        validate = function() {
          var nameValid, urlValid;
          nameValid = !checkAppNameRepeat(appNameDom.val());
          urlValid = appUrlDom.length > 0;
          if (nameValid && urlValid) {
            return self.modal.toggleConfirm(false);
          } else {
            return self.modal.toggleConfirm(true);
          }
        };
        appNameDom.keyup(validate);
        appUrlDom.keyup(validate);
        return this.modal.on('confirm', (function(_this) {
          return function() {
            if (self.checkAppNameRepeat(appNameDom.val())) {
              return false;
            }
            _this.modal.toggleConfirm(true);
            _this.json = _this.workspace.design.serialize({
              usage: 'runStack'
            });
            _this.json.name = appNameDom.val();
            _this.json.host = appUrlDom.val();
            return _this.workspace.opsModel.run(_this.json, appNameDom.val()).then(function(ops) {
              self.modal.close();
              return App.loadUrl(ops.url());
            }, function(err) {
              var error;
              self.modal.close();
              error = err.awsError ? err.error + "." + err.awsError : " " + err.error + " : " + (err.result || err.msg);
              return notification('error', sprintf(lang.NOTIFY.FAILA_TO_RUN_STACK_BECAUSE_OF_XXX, self.workspace.opsModel.get('name'), error));
            });
          };
        })(this));
      },
      checkAppNameRepeat: function(nameVal) {
        if (this.workspace.scene.project.apps().findWhere({
          name: nameVal
        })) {
          this.showError('appname', lang.PROP.MSG_WARN_REPEATED_APP_NAME);
          return true;
        } else if (!nameVal) {
          this.showError('appname', lang.PROP.MSG_WARN_NO_APP_NAME);
          return true;
        } else {
          this.hideError('appname');
          return false;
        }
      },
      hideError: function(type) {
        var selector;
        selector = type ? $("#runtime-error-" + type) : $(".runtime-error");
        return selector.hide();
      },
      showError: function(id, msg) {
        return $("#runtime-error-" + id).text(msg).show();
      },
      terminateApp: function() {
        this.appAction.terminateApp(this.workspace.opsModel.id, true);
        return false;
      },
      refreshResource: function() {
        this.workspace.reloadAppData();
        return false;
      },
      switchToAppEdit: function() {
        this.workspace.switchToEditMode();
        return false;
      },
      applyAppEdit: function() {
        var $diffTree, components, differ, newJson, oldJson, removeList, removes, result, that;
        that = this;
        oldJson = this.workspace.opsModel.getJsonData();
        newJson = this.workspace.design.serialize({
          usage: 'updateApp'
        });
        differ = new ResDiff({
          old: oldJson,
          "new": newJson
        });
        result = differ.getDiffInfo();
        if (!result.compChange && !result.layoutChange && !result.stateChange) {
          return this.workspace.applyAppEdit();
        }
        removes = differ.removedComps;
        components = newJson.component;
        this.updateModal = new Modal({
          title: lang.IDE.HEAD_INFO_LOADING,
          template: MC.template.loadingSpinner,
          disableClose: true,
          cancel: "Close"
        });
        this.updateModal.tpl.find(".modal-footer").hide();
        removeList = [];
        that.updateModal.tpl.children().css("width", "450px").find(".modal-footer").show();
        that.updateModal.find(".modal-wrapper-fix").width(455).find('.modal-body').css('padding', 0);
        that.updateModal.setContent(MC.template.updateApp({
          isRunning: that.workspace.opsModel.testState(OpsModel.State.Running),
          removeList: removeList
        }));
        that.updateModal.find('.payment-wrapper-right').hide();
        that.updateModal.find(".modal-header").find("h3").text(lang.IDE.UPDATE_APP_MODAL_TITLE);
        that.updateModal.find('.modal-confirm').prop("disabled", true).text((Design.instance().credential() ? lang.IDE.UPDATE_APP_CONFIRM_BTN : lang.IDE.UPDATE_APP_MODAL_NEED_CREDENTIAL));
        that.updateModal.resize();
        window.setTimeout(function() {
          return that.updateModal.resize();
        }, 100);
        that.updateModal.on('confirm', function() {
          var _ref;
          if (!Design.instance().credential()) {
            Design.instance().project().showCredential();
            return false;
          }
          newJson = that.workspace.design.serialize({
            usage: 'updateApp'
          });
          that.workspace.applyAppEdit(newJson, !result.compChange);
          return (_ref = that.updateModal) != null ? _ref.close() : void 0;
        });
        if (result.compChange) {
          $diffTree = differ.renderAppUpdateView();
          $('#app-update-summary-table').html($diffTree);
        }
        that.appAction.renderKpDropdown(that.updateModal);
        TA.loadModule('stack').then(function() {
          var _ref;
          that.updateModal && that.updateModal.toggleConfirm(false);
          return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
        }, function(err) {
          var _ref;
          console.log(err);
          that.updateModal && that.updateModal.toggleConfirm(true);
          that.updateModal && that.updateModal.tpl.find("#take-rds-snapshot").off('change');
          return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
        });
      },
      cancelAppEdit: function() {
        var modal, self;
        if (!this.workspace.cancelEditMode()) {
          self = this;
          modal = new Modal({
            title: lang.IDE.TITLE_CHANGE_NOT_APPLIED,
            template: OpsEditorTpl.modal.cancelUpdate(),
            width: "400",
            confirm: {
              text: "Discard",
              color: "red"
            },
            onConfirm: function() {
              modal.close();
              self.workspace.cancelEditMode(true);
            }
          });
        }
        return false;
      }
    });
  });

}).call(this);
