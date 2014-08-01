
/*
----------------------------
  App Action Method
----------------------------
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["backbone", "component/AppAction/template", 'i18n!/nls/lang.js', 'CloudResources', 'constant', 'UI.modalplus'], function(Backbone, AppTpl, lang, CloudResources, constant, modalPlus) {
    var AppAction;
    AppAction = Backbone.View.extend({
      deleteStack: function(id, name) {
        name = name || App.model.stackList().get(id).get("name");
        modal(AppTpl.removeStackConfirm({
          msg: sprintf(lang.ide.TOOL_POP_BODY_DELETE_STACK, name)
        }));
        $("#confirmRmStack").on("click", function() {
          var opsModel, p;
          opsModel = App.model.stackList().get(id);
          p = opsModel.remove();
          if (opsModel.isPersisted()) {
            return p.then(function() {
              return notification("info", sprintf(lang.ide.TOOL_MSG_ERR_DEL_STACK_SUCCESS, name));
            }, function() {
              return notification("error", sprintf(lang.ide.TOOL_MSG_ERR_DEL_STACK_FAILED, name));
            });
          }
        });
      },
      duplicateStack: function(id) {
        var opsModel;
        opsModel = App.model.stackList().get(id);
        if (!opsModel) {
          return;
        }
        opsModel.fetchJsonData().then(function() {
          return App.openOps(App.model.createStackByJson(opsModel.getJsonData()));
        }, function() {
          return notification("error", "Cannot duplicate the stack, please retry.");
        });
      },
      startApp: function(id) {
        var comp, dbInstance, hasASG, hasDBInstance, hasEC2Instance, name, snapshots, startAppModal;
        name = App.model.appList().get(id).get("name");
        comp = Design.instance().serialize().component;
        hasEC2Instance = (_.filter(comp, function(e) {
          return e.type === constant.RESTYPE.INSTANCE;
        })).length;
        hasDBInstance = (_.filter(comp, function(e) {
          return e.type === constant.RESTYPE.DBINSTANCE;
        })).length;
        hasASG = (_.filter(comp, function(e) {
          return e.type === constant.RESTYPE.ASG;
        })).length;
        startAppModal = new modalPlus({
          template: AppTpl.loading(),
          title: lang.ide.TOOL_TIP_START_APP,
          confirm: {
            text: lang.ide.TOOL_POP_BTN_START_APP,
            color: 'blue',
            disabled: false
          },
          disableClose: true
        });
        startAppModal.tpl.find('.modal-footer').hide();
        dbInstance = _.filter(comp, function(e) {
          return e.type === constant.RESTYPE.DBINSTANCE;
        });
        console.log(dbInstance);
        snapshots = CloudResources(constant.RESTYPE.DBSNAP, Design.instance().region());
        return snapshots.fetchForce().then(function() {
          var lostDBSnapshot;
          lostDBSnapshot = _.filter(dbInstance, function(e) {
            return e.resource.DBSnapshotIdentifier && !snapshots.findWhere({
              id: e.resource.DBSnapshotIdentifier
            });
          });
          startAppModal.tpl.find('.modal-footer').show();
          startAppModal.tpl.find('.modal-body').html(AppTpl.startAppConfirm({
            hasEC2Instance: hasEC2Instance,
            hasDBInstance: hasDBInstance,
            hasASG: hasASG,
            lostDBSnapshot: lostDBSnapshot
          }));
          startAppModal.on('confirm', function() {
            startAppModal.close();
            App.model.appList().get(id).start().fail(function(err) {
              var error;
              error = err.awsError ? err.error + "." + err.awsError : err.error;
              notification("Fail to start your app \"" + name + "\". (ErrorCode: " + error + ")");
            });
          });
        });
      },
      stopApp: function(id) {
        var app, appName, canStop, isProduction, name, resourceList, that;
        app = App.model.appList().get(id);
        name = app.get("name");
        that = this;
        AppTpl.cantStop({});
        isProduction = app.get('usage') === "production";
        appName = app.get('name');
        canStop = new modalPlus({
          template: AppTpl.loading(),
          title: isProduction ? lang.ide.TOOL_POP_TIT_STOP_PRD_APP : lang.ide.TOOL_POP_TIT_STOP_APP,
          confirm: {
            text: lang.ide.TOOL_POP_BTN_STOP_APP,
            color: 'red',
            disabled: isProduction
          },
          disableClose: true
        });
        canStop.tpl.find(".modal-footer").hide();
        resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
        return Q.all(resourceList.fetchForce(), app.fetchJsonData()).then(function() {
          var amiRes, com, comp, imageId, toFetch, toFetchArray, uid;
          comp = app.getJsonData().component;
          toFetch = {};
          for (uid in comp) {
            com = comp[uid];
            if (com.type === constant.RESTYPE.INSTANCE || com.type === constant.RESTYPE.LC) {
              imageId = com.resource.ImageId;
              if (imageId) {
                toFetch[imageId] = true;
              }
            }
          }
          toFetchArray = _.keys(toFetch);
          amiRes = CloudResources(constant.RESTYPE.AMI, app.get("region"));
          return amiRes.fetchAmis(_.keys(toFetch)).then(function() {
            var dbInstanceName, fee, hasAsg, hasDBInstance, hasEC2Instance, hasInstanceStore, hasNotReadyDB, savingFee, totalFee, _ref, _ref1, _ref2;
            hasInstanceStore = false;
            amiRes.each(function(e) {
              var _ref;
              if ((_ref = e.id, __indexOf.call(toFetchArray, _ref) >= 0) && e.get("rootDeviceType") === 'instance-store') {
                return hasInstanceStore = true;
              }
            });
            hasEC2Instance = (_ref = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.INSTANCE;
            })) != null ? _ref.length : void 0;
            hasDBInstance = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            });
            dbInstanceName = _.map(hasDBInstance, function(e) {
              return e.resource.DBInstanceIdentifier;
            });
            hasNotReadyDB = resourceList.filter(function(e) {
              var _ref1;
              return (_ref1 = e.get('DBInstanceIdentifier'), __indexOf.call(dbInstanceName, _ref1) >= 0) && e.get('DBInstanceStatus') !== 'available';
            });
            hasAsg = (_ref1 = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.ASG;
            })) != null ? _ref1.length : void 0;
            fee = ((_ref2 = Design.instance()) != null ? _ref2.getCost() : void 0) || {};
            totalFee = fee.totalFee;
            savingFee = fee.totalFee;
            canStop.tpl.find(".modal-footer").show();
            if (hasNotReadyDB && hasNotReadyDB.length) {
              canStop.tpl.find('.modal-body').html(AppTpl.cantStop({
                cantStop: hasNotReadyDB
              }));
              canStop.tpl.find('.modal-confirm').remove();
            } else {
              hasDBInstance = hasDBInstance != null ? hasDBInstance.length : void 0;
              canStop.tpl.find('.modal-body').css('padding', "0").html(AppTpl.stopAppConfirm({
                isProduction: isProduction,
                appName: appName,
                hasEC2Instance: hasEC2Instance,
                hasDBInstance: hasDBInstance,
                hasAsg: hasAsg,
                totalFee: totalFee,
                savingFee: savingFee,
                hasInstanceStore: hasInstanceStore
              }));
            }
            canStop.resize();
            canStop.on("confirm", function() {
              canStop.close();
              app.stop().fail(function(err) {
                var error;
                error = err.awsError ? err.error + "." + err.awsError : err.error;
                notification("Fail to stop your app \"" + name + "\". (ErrorCode: " + error + ")");
              });
            });
            $("#appNameConfirmIpt").on("keyup change", function() {
              if ($("#appNameConfirmIpt").val() === name) {
                canStop.tpl.find('.modal-confirm').removeAttr("disabled");
              } else {
                canStop.tpl.find('.modal-confirm').attr("disabled", "disabled");
              }
            });
          });
        });
      },
      terminateApp: function(id) {
        var app, name, production, resourceList, terminateConfirm;
        app = App.model.appList().get(id);
        console.log(id);
        name = app.get("name");
        production = app.get("usage") === 'production';
        terminateConfirm = new modalPlus({
          title: production ? lang.ide.TOOL_POP_TIT_TERMINATE_PRD_APP : lang.ide.TOOL_POP_TIT_TERMINATE_APP,
          template: AppTpl.loading(),
          confirm: {
            text: lang.ide.TOOL_POP_BTN_TERMINATE_APP,
            color: "red",
            disabled: production
          },
          disableClose: true
        });
        terminateConfirm.tpl.find('.modal-footer').hide();
        resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
        return resourceList.fetchForce().then(function() {
          return app.fetchJsonData().then(function() {
            var comp, dbInstanceName, hasDBInstance, notReadyDB;
            comp = app.getJsonData().component;
            console.log(comp);
            console.log(resourceList);
            hasDBInstance = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            });
            dbInstanceName = _.map(hasDBInstance, function(e) {
              return e.resource.DBInstanceIdentifier;
            });
            notReadyDB = resourceList.filter(function(e) {
              var _ref;
              return (_ref = e.get('DBInstanceIdentifier'), __indexOf.call(dbInstanceName, _ref) >= 0) && e.get('DBInstanceStatus') !== 'available';
            });
            terminateConfirm.tpl.find('.modal-body').html(AppTpl.terminateAppConfirm({
              production: production,
              name: name,
              hasDBInstance: hasDBInstance,
              notReadyDB: notReadyDB
            }));
            terminateConfirm.tpl.find('.modal-footer').show();
            terminateConfirm.resize();
            if (notReadyDB != null ? notReadyDB.length : void 0) {
              terminateConfirm.tpl.find("#take-rds-snapshot").attr("checked", false).change(function() {
                return terminateConfirm.tpl.find(".modal-confirm").attr('disabled', $(this).is(":checked"));
              });
            }
            $("#appNameConfirmIpt").on("keyup change", function() {
              if ($("#appNameConfirmIpt").val() === name) {
                terminateConfirm.tpl.find('.modal-confirm').removeAttr("disabled");
              } else {
                terminateConfirm.tpl.find('.modal-confirm').attr("disabled", "disabled");
              }
            });
            terminateConfirm.on("confirm", function() {
              var takeSnapshot;
              terminateConfirm.close();
              takeSnapshot = terminateConfirm.tpl.find("#take-rds-snapshot").is(':checked');
              app.terminate(null, takeSnapshot).fail(function(err) {
                var error;
                error = err.awsError ? err.error + "." + err.awsError : err.error;
                return notification("Fail to terminate your app \"" + name + "\". (ErrorCode: " + error + ")");
              });
            });
          });
        });
      }
    });
    return new AppAction();
  });

}).call(this);
