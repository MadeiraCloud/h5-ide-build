(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["OpsModel", "../template/TplOpsEditor", "ThumbnailUtil", "JsonExporter", "ApiRequest", "i18n!/nls/lang.js", "UI.modalplus", 'kp_dropdown', "ResDiff", 'constant', 'event', 'TaGui', "CloudResources", "AppAction", "UI.notification", "backbone"], function(OpsModel, OpsEditorTpl, Thumbnail, JsonExporter, ApiRequest, lang, Modal, kpDropdown, ResDiff, constant, ide_event, TA, CloudResources, AppAction) {
    var API_HOST, API_URL, hosts, location;
    location = window.location;
    if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.exec(location.hostname)) {
      console.error("VisualOps IDE can not be browsed with IP address.");
      return;
    }
    hosts = location.hostname.split(".");
    if (hosts.length >= 3) {
      API_HOST = hosts[hosts.length - 2] + "." + hosts[hosts.length - 1];
    } else {
      API_HOST = location.hostname;
    }
    API_URL = window.location.protocol + "//api." + API_HOST + "/v1/apps/";
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
        "click .icon-toolbar-cloudformation": "exportCF",
        "click .runApp": 'runStack',
        "OPTION_CHANGE .toolbar-line-style": "setTbLineStyle",
        "click .icon-hide-sg": "toggleSgLine",
        "click .icon-stop": "stopApp",
        "click .startApp": "startApp",
        "click .icon-terminate": "terminateApp",
        "click .icon-forget-app": "forgetApp",
        "click .icon-refresh": "refreshResource",
        "click .icon-update-app": "switchToAppEdit",
        "click .icon-apply-app": "applyAppEdit",
        "click .icon-cancel-update-app": "cancelAppEdit",
        'click .toolbar-visual-ops-switch': 'opsOptionChanged',
        'click .reload-states': "reloadState",
        'click .icon-save-app': 'appToStack'
      },
      initialize: function(options) {
        var attr, btn, btns, opsModel, that, tpl, _i, _len;
        _.extend(this, options);
        this.appAction = new AppAction({
          workspace: this.workspace
        });
        opsModel = this.workspace.opsModel;
        if (opsModel.isStack()) {
          btns = ["BtnRunStack", "BtnStackOps", "BtnZoom", "BtnExport", "BtnLinestyle", "BtnSwitchStates"];
        } else {
          btns = ["BtnEditApp", "BtnAppOps", "BtnZoom", "BtnPng", "BtnLinestyle", "BtnReloadRes"];
        }
        tpl = "";
        for (_i = 0, _len = btns.length; _i < _len; _i++) {
          btn = btns[_i];
          attr = {
            stateOn: this.workspace.design.get("agent").enabled
          };
          tpl += OpsEditorTpl.toolbar[btn](attr);
        }
        if (this.workspace.opsModel.isApp() && this.workspace.design.attributes.agent.enabled) {
          tpl += OpsEditorTpl.toolbar.BtnReloadStates();
        }
        this.setElement(this.parent.$el.find(".OEPanelTop").html(tpl));
        that = this;
        setTimeout(function() {
          if (!that.workspace.isRemoved()) {
            return that.updateTbBtns();
          }
        }, 1000);
        this.updateZoomButtons();
      },
      updateTbBtns: function() {
        var ami, hasState, isAppEdit, opsModel, running, stopped;
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
        if (this.__saving) {
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
        return this.appAction.saveStack(evt.currentTarget, this);
      },
      deleteStack: function() {
        return this.appAction.deleteStack(this.workspace.opsModel.cid, this.workspace.opsModel.get("name"), this.workspace);
      },
      createStack: function() {
        var newOps;
        newOps = this.workspace.opsModel.project().createStack(this.workspace.design.region());
        return App.loadUrl(newOps.url());
      },
      duplicateStack: function() {
        var newOps;
        newOps = this.workspace.opsModel.project().createStackByJson(this.workspace.design.serialize({
          duplicateStack: true
        }));
        App.loadUrl(newOps.url());
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
      exportCF: function() {
        var ApiPromise, TAPromise, components, design, hasCustomOG, modal, name;
        design = this.workspace.design;
        hasCustomOG = false;
        components = design.serialize({
          usage: 'runStack'
        }).component;
        _.each(components, function(e) {
          if (e.type === constant.RESTYPE.DBOG) {
            return hasCustomOG = true;
          }
        });
        modal = new Modal({
          title: lang.TOOLBAR.POP_EXPORT_CF,
          template: OpsEditorTpl["export"].CF({
            hasCustomOG: hasCustomOG
          }),
          width: "470",
          disableFooter: true
        });
        name = design.get("name");
        TAPromise = TA.loadModule('stack');
        ApiPromise = ApiRequest("stack_export_cloudformation", {
          region: design.get("region"),
          stack: design.serialize()
        });
        return Q.spread([TAPromise, ApiPromise], function(taError, apiReturn) {
          var btn;
          if (modal != null) {
            modal.resize();
          }
          btn = modal.tpl.find("a.btn-blue").text(lang.TOOLBAR.POP_BTN_EXPORT_CF).removeClass("disabled");
          JsonExporter.genericExport(btn, apiReturn, "" + name + ".json");
          btn.click(function() {
            return modal.close();
          });
        }, function(err) {
          if (modal != null) {
            modal.resize();
          }
          modal.tpl.find("a.btn-blue").text(lang.TOOLBAR.POP_BTN_EXPORT_CF);
          if (err.error) {
            notification("error", sprintf(lang.NOTIFY.FAIL_TO_EXPORT_TO_CLOUDFORMATION, err.error));
          }
        });
      },
      reloadState: function(event) {
        var $target, app_id, data;
        $target = $(event.currentTarget);
        if ($target.hasClass('disabled')) {
          return false;
        }
        $target.toggleClass('disabled').html($target.attr('data-disabled'));
        app_id = Design.instance().get('id');
        data = {
          'encoded_user': App.user.get('usercode'),
          'token': this.workspace.opsModel.project().get('defaultToken')
        };
        return $.ajax({
          url: API_URL + app_id,
          method: "POST",
          data: JSON.stringify(data),
          dataType: 'json',
          statusCode: {
            200: function() {
              notification('info', lang.NOTIFY.RELOAD_STATE_SUCCESS);
              return ide_event.trigger(ide_event.REFRESH_PROPERTY);
            },
            401: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_INVALID_REQUEST);
            },
            404: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_NETWORKERROR);
            },
            429: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_NOT_READY);
            },
            500: function() {
              return notification('error', lang.NOTIFY.RELOAD_STATE_INTERNAL_SERVER_ERROR);
            }
          },
          error: function() {
            return console.log('Error while Reload State');
          },
          success: function() {
            return console.debug('Reload State Success!');
          }
        }).always(function() {
          return window.setTimeout(function() {
            return $target.removeClass('disabled').html($target.attr('data-original'));
          });
        });
      },
      runStack: function(event) {
        var opsModal, that;
        that = this;
        if ($(event.currentTarget).attr('disabled')) {
          return false;
        }
        opsModal = this.workspace.opsModel;
        return this.appAction.showPayment(null, opsModal).then(function(result) {
          var paymentModal, paymentUpdate;
          paymentUpdate = result.result;
          paymentModal = result.modal;
          return that.appAction.runStack(paymentUpdate, paymentModal, that.workspace);
        });
      },
      appToStack: function() {
        var appToStackModal, name, newName, onConfirm, originStackExist, stack;
        name = this.workspace.design.attributes.name;
        newName = this.getStackNameFromApp(name);
        stack = this.workspace.opsModel.project().stacks().get(this.workspace.design.attributes.stack_id);
        onConfirm = (function(_this) {
          return function() {
            var isNew, newJson, newOps;
            MC.Analytics.increase("app_to_stack");
            isNew = !(appToStackModal.tpl.find("input[name='save-stack-type']:checked").val() === "replace");
            if (isNew) {
              newOps = _this.workspace.opsModel.project().createStackByJson(_this.workspace.design.serializeAsStack(appToStackModal.tpl.find('#modal-input-value').val()));
              appToStackModal.close();
              App.loadUrl(newOps.url());
            } else {
              newJson = Design.instance().serializeAsStack();
              newJson.id = _this.workspace.design.attributes.stack_id;
              appToStackModal.close();
              newJson.name = stack.get("name");
              return stack.save(newJson).then(function() {
                notification("info", sprintf(lang.NOTIFY.INFO_HDL_SUCCESS, lang.TOOLBAR.TOOLBAR_HANDLE_SAVE_STACK, newJson.name));
                return App.loadUrl(stack.url());
              }, function() {
                return notification('error', sprintf(lang.NOTIFY.ERR_SAVE_FAILED, newJson.name));
              });
            }
          };
        })(this);
        originStackExist = !!stack;
        appToStackModal = new Modal({
          title: lang.TOOLBAR.POP_TIT_APP_TO_STACK,
          template: OpsEditorTpl.saveAppToStack({
            input: name,
            stackName: newName,
            originStackExist: originStackExist
          }),
          confirm: {
            text: lang.TOOLBAR.POP_BTN_SAVE_TO_STACK
          },
          onConfirm: onConfirm
        });
        return appToStackModal.tpl.find("input[name='save-stack-type']").change(function() {
          return appToStackModal.tpl.find(".radio-instruction").toggleClass('hide');
        });
      },
      getStackNameFromApp: function(app_name) {
        var copy_name, idx, name_list, prefix, reg_name, stack_reg;
        if (!app_name) {
          app_name = "untitled";
        }
        idx = 0;
        reg_name = /.*-\d+$/;
        if (reg_name.test(app_name)) {
          prefix = app_name.substr(0, app_name.lastIndexOf("-"));
          idx = Number(app_name.substr(app_name.lastIndexOf("-") + 1));
          copy_name = prefix;
        } else {
          if (app_name.charAt(app_name.length - 1) === "-") {
            copy_name = app_name.substr(0, app_name.length - 1);
          } else {
            copy_name = app_name;
          }
        }
        stack_reg = /.-stack+$/;
        if (stack_reg.test(copy_name)) {
          copy_name = copy_name;
        } else {
          copy_name = copy_name + "-stack";
        }
        name_list = this.workspace.opsModel.project().stacks().pluck("name") || [];
        idx++;
        while (idx <= name_list.length) {
          if ($.inArray(copy_name + "-" + idx, name_list) === -1) {
            break;
          }
          idx++;
        }
        return copy_name + "-" + idx;
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
      hideDefaultKpError: function(context) {
        return context.hideError('kp');
      },
      hideError: function(type) {
        var selector;
        selector = type ? $("#runtime-error-" + type) : $(".runtime-error");
        return selector.hide();
      },
      showError: function(id, msg) {
        return $("#runtime-error-" + id).text(msg).show();
      },
      defaultKpIsSet: function() {
        var defaultKP, kpModal;
        if (!kpDropdown.hasResourceWithDefaultKp()) {
          return true;
        }
        kpModal = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKP = kpModal.getDefaultKP();
        if (!defaultKP.get('isSet') || !((this.modal || this.updateModal) && (this.modal || this.updateModal).tpl.find("#kp-runtime-placeholder .item.selected").size())) {
          this.showError('kp', lang.IDE.RUN_STACK_MODAL_KP_WARNNING);
          return false;
        }
        return true;
      },
      startApp: function() {
        this.appAction.startApp(this.workspace.opsModel.id);
        return false;
      },
      stopApp: function() {
        this.appAction.stopApp(this.workspace.opsModel.id);
        return false;
      },
      terminateApp: function() {
        this.appAction.terminateApp(this.workspace.opsModel.id);
        return false;
      },
      forgetApp: function() {
        this.appAction.forgetApp(this.workspace.opsModel.id);
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
      checkDBinstance: function(oldDBInstanceList) {
        var DBInstances, checkDB;
        checkDB = new Q.defer();
        if (oldDBInstanceList.length) {
          DBInstances = CloudResources(this.workspace.opsModel.credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().get("region"));
          DBInstances.fetchForce().then(function() {
            return checkDB.resolve(DBInstances);
          });
        } else {
          checkDB.resolve([]);
        }
        return checkDB.promise;
      },
      applyAppEdit: function() {
        var DBInstances, components, dbInstanceList, differ, newJson, oldDBInstanceList, oldJson, removes, result, that;
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
        dbInstanceList = [];
        console.log(newJson);
        components = newJson.component;
        _.each(components, function(e) {
          if (e.type === constant.RESTYPE.DBINSTANCE) {
            return dbInstanceList.push(e.resource.DBInstanceIdentifier);
          }
        });
        DBInstances = CloudResources(that.workspace.opsModel.credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().get("region"));
        this.updateModal = new Modal({
          title: lang.IDE.HEAD_INFO_LOADING,
          template: MC.template.loadingSpinner,
          disableClose: true,
          cancel: "Close"
        });
        this.updateModal.tpl.find(".modal-footer").hide();
        oldDBInstanceList = [];
        _.each(oldJson.component, function(e) {
          if (e.type === constant.RESTYPE.DBINSTANCE) {
            return oldDBInstanceList.push(e.resource.DBInstanceIdentifier);
          }
        });
        return this.checkDBinstance(oldDBInstanceList).then(function(DBInstances) {
          var $diffTree, cost, currency, notAvailableDB, removeList, removeListNotReady;
          notAvailableDB = DBInstances.filter(function(e) {
            var _ref;
            return (_ref = e.attributes.DBInstanceIdentifier, __indexOf.call(dbInstanceList, _ref) >= 0) && e.attributes.DBInstanceStatus !== "available";
          });
          if (notAvailableDB.length) {
            that.updateModal.find(".modal-footer").show().find(".modal-confirm").hide();
            that.updateModal.setContent(MC.template.cantUpdateApp({
              data: notAvailableDB
            }));
            that.updateModal.setTitle(lang.IDE.UPDATE_APP_MODAL_TITLE);
            return false;
          }
          removeList = [];
          _.each(removes, function(e) {
            var dbModel;
            if (e.type === constant.RESTYPE.DBINSTANCE) {
              dbModel = DBInstances.get(e.resource.DBInstanceIdentifier);
              if (dbModel) {
                return removeList.push(DBInstances.get(e.resource.DBInstanceIdentifier));
              }
            }
          });
          removeListNotReady = _.filter(removeList, function(e) {
            return e.attributes.DBInstanceStatus !== "available";
          });
          that.updateModal.tpl.children().css('width', "450px").find(".modal-footer").show();
          that.updateModal.find(".modal-wrapper-fix").width(665).find('.modal-body').css('padding', 0);
          that.updateModal.setContent(MC.template.updateApp({
            isRunning: that.workspace.opsModel.testState(OpsModel.State.Running),
            notReadyDB: removeListNotReady,
            removeList: removeList
          }));
          that.updateModal.tpl.find(".modal-header").find("h3").text(lang.IDE.UPDATE_APP_MODAL_TITLE);
          that.updateModal.tpl.find('.modal-confirm').prop("disabled", true).text((Design.instance().credential() ? lang.IDE.UPDATE_APP_CONFIRM_BTN : lang.IDE.UPDATE_APP_MODAL_NEED_CREDENTIAL));
          that.updateModal.resize();
          cost = Design.instance().getCost();
          currency = Design.instance().getCurrency();
          that.updateModal.find("#label-total-fee").find('b').text("" + (currency + cost.totalFee));
          that.updateModal.find("#label-visualops-fee").find('b').text("" + (currency + cost.visualOpsFee));
          window.setTimeout(function() {
            return that.updateModal.resize();
          }, 100);
          if (removeListNotReady != null ? removeListNotReady.length : void 0) {
            that.updateModal.tpl.find("#take-rds-snapshot").attr("checked", false).on("change", function() {
              return that.updateModal.tpl.find(".modal-confirm").prop('disabled', $(this).is(":checked"));
            });
          }
          that.updateModal.on('confirm', function() {
            var _ref;
            if (!Design.instance().credential()) {
              Design.instance().project().showCredential();
              return false;
            }
            if (!that.defaultKpIsSet()) {
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
        });
      },
      opsOptionChanged: function() {
        var $switcher, agent, confirmModal, instancesNoUserData, stateEnabled, workspace;
        $switcher = $(".toolbar-visual-ops-switch").toggleClass('on');
        stateEnabled = $switcher.hasClass("on");
        agent = this.workspace.design.get('agent');
        if (stateEnabled) {
          instancesNoUserData = this.workspace.design.instancesNoUserData();
          workspace = this.workspace;
          if (!instancesNoUserData) {
            $switcher.removeClass('on');
            confirmModal = new Modal({
              title: lang.IDE.TITLE_CONFIRM_TO_ENABLE_VISUALOPS,
              width: "420px",
              template: OpsEditorTpl.confirm.enableState(),
              confirm: {
                text: lang.IDE.ENABLE_VISUALOPS
              },
              onConfirm: function() {
                agent.enabled = true;
                confirmModal.close();
                $switcher.addClass('on');
                workspace.design.set('agent', agent);
                return ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
              }
            });
            return null;
          } else {
            agent.enabled = true;
            this.workspace.design.set("agent", agent);
            return ide_event.trigger(ide_event.REFRESH_PROPERTY);
          }
        } else {
          agent.enabled = false;
          this.workspace.design.set('agent', agent);
          return ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
        }
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
      },
      xxxxxx: function() {
        return this.setElement(this.parent.$el.find(".OEPanelTop").html(OpsEditorTpl.toolbar.BtnActionPng()));
      }
    });
  });

}).call(this);