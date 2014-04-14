(function() {
  define(['jquery', 'event', 'i18n!nls/lang.js'], function($, ide_event, lang) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['./module/design/toolbar/view', './module/design/toolbar/model'], function(View, model) {
        var view;
        view = new View();
        view.model = model;
        view.listen();
        view.render();
        ide_event.onLongListen(ide_event.OPEN_DESIGN, function(region_name, type, current_platform, tab_name, tab_id) {
          console.log('toolbar:OPEN_DESIGN', tab_id, type);
          view.render(type, 0);
          return null;
        });
        ide_event.onLongListen(ide_event.OPEN_SUB_DESIGN, function(region_name, type, current_platform, tab_name, tab_id) {
          console.log('toolbar:OPEN_SUB_DESIGN', tab_id, type);
          model.setFlag(tab_id, type);
          return null;
        });
        model.on('UPDATE_TOOLBAR', function(type) {
          console.log('update toolbar status');
          return view.render(type, 1);
        });
        ide_event.onLongListen(ide_event.SWITCH_DASHBOARD, function() {
          console.log('toolbar:SWITCH_DASHBOARD');
          model.setTabFlag(false);
          return null;
        });
        ide_event.onLongListen(ide_event.SWITCH_TAB, function() {
          return setTimeout(function() {
            return model.setTabFlag(true);
          }, 500);
        });
        ide_event.onLongListen(ide_event.SAVE_STACK, function(data) {
          var err, msg;
          console.log(ide_event.SAVE_STACK);
          try {
            MC.common.other.canvasData.save(data);
            MC.common.other.canvasData.origin(data);
            model.saveStack(data);
          } catch (_error) {
            err = _error;
            msg = sprintf(lang.ide.TOOL_MSG_ERR_SAVE_FAILED, data.name);
            view.notify('error', msg);
          }
          return null;
        });
        ide_event.onLongListen(ide_event.DUPLICATE_STACK, function(region, id, new_name, name) {
          console.log(ide_event.DUPLICATE_STACK + ':' + region + ',' + id + ',' + new_name + ',' + name);
          return model.duplicateStack(region, id, new_name, name);
        });
        ide_event.onLongListen(ide_event.DELETE_STACK, function(region, id, name) {
          console.log(ide_event.DELETE_STACK + ':' + region + ',' + id + ',' + name);
          return model.deleteStack(region, id, name);
        });
        view.on('TOOLBAR_ZOOM_IN', function() {
          console.log('TOOLBAR_ZOOM_IN');
          return model.zoomIn();
        });
        view.on('TOOLBAR_ZOOM_OUT', function() {
          console.log('TOOLBAR_ZOOM_OUT');
          return model.zoomOut();
        });
        view.on('UPDATE_APP', function(is_update) {
          model.updateApp(is_update);
          return null;
        });
        view.on('TOOLBAR_EXPORT_PNG_CLICK', function() {
          console.log('design_toolbar_click:exportPngIcon');
          return model.generatePNG();
        });
        view.on('CONVERT_CLOUDFORMATION', function() {
          return model.convertCloudformation();
        });
        model.on('EXPORT_PNG', function(base64_image, uid, blob) {
          return view.exportPNG(base64_image, uid, blob);
        });
        view.on('APP_UPDATING', function(data) {
          console.log('design_toolbar APP_2_APPEDIT');
          if (_.isObject(data)) {
            return model.saveApp(data);
          } else {
            return console.log('current is not object, data is ' + data);
          }
        });
        ide_event.onLongListen('STOP_APP', function(region, app_id, app_name) {
          console.log('design_toolbar STOP_APP region:' + region + ', app_id:' + app_id + ', app_name:' + app_name);
          return model.stopApp(region, app_id, app_name);
        });
        ide_event.onLongListen('START_APP', function(region, app_id, app_name) {
          console.log('design_toolbar START_APP region:' + region + ', app_id:' + app_id + ', app_name:' + app_name);
          return model.startApp(region, app_id, app_name);
        });
        ide_event.onLongListen('TERMINATE_APP', function(region, app_id, app_name, flag) {
          console.log('design_toolbar TERMINATE_APP region:' + region + ', app_id:' + app_id + ', app_name:' + app_name + ', flag:' + flag);
          return model.terminateApp(region, app_id, app_name, flag);
        });
        ide_event.onLongListen(ide_event.CANVAS_SAVE, function() {
          console.log('CANVAS_SAVE');
          return view.clickSaveIcon();
        });
        ide_event.onLongListen(ide_event.UPDATE_REQUEST_ITEM, function(idx, dag) {
          console.log('toolbar listen UPDATE_REQUEST_ITEM index:' + idx);
          return model.reqHandle(idx, dag);
        });
        ide_event.onLongListen(ide_event.APPEDIT_2_APP, function(tab_id, region) {
          console.log('APPEDIT_2_APP, tab_id = ' + tab_id + ', region = ' + region);
          return view.saveSuccess2App(tab_id, region);
        });
        model.on('TOOLBAR_REQUEST_SUCCESS', function(flag, value) {
          var msg, str_idx;
          if (flag) {
            str_idx = 'TOOLBAR_HANDLE_' + flag;
            if (str_idx in lang.ide) {
              msg = sprintf(lang.ide.TOOL_MSG_INFO_REQ_SUCCESS, lang.ide[str_idx], value);
              return view.notify('info', msg);
            }
          }
        });
        model.on('TOOLBAR_REQUEST_FAILED', function(flag, value) {
          var msg, str_idx;
          if (flag) {
            str_idx = 'TOOLBAR_HANDLE_' + flag;
            if (str_idx in lang.ide) {
              msg = sprintf(lang.ide.TOOL_MSG_ERR_REQ_FAILED, lang.ide[str_idx], value);
              return view.notify('error', msg);
            }
          }
        });
        model.on('TOOLBAR_HANDLE_SUCCESS', function(flag, value) {
          var app_name, data, msg, region, str_idx, usage;
          console.log('TOOLBAR_HANDLE_SUCCESS', flag, value);
          if (flag) {
            if (modal && modal.isPopup()) {
              if (flag === 'SAVE_STACK_BY_RUN') {
                data = MC.common.other.canvasData.data();
                app_name = $('.modal-input-value').val();
                data.name = app_name;
                data.usage = 'others';
                usage = $('#app-usage-selectbox .selected').data('value');
                if (usage) {
                  data.usage = usage;
                }
                model.runStack(data);
                region = MC.common.other.canvasData.get('region');
                MC.data.app_list[region].push(app_name);
                modal.close();
              } else if (flag === "EXPORT_CLOUDFORMATION") {
                view.saveCloudFormation(value);
                value = "";
              } else if ($('#modal-export-cf')[0] !== void 0) {
                model.convertCloudformation();
              }
            }
            str_idx = 'TOOLBAR_HANDLE_' + flag;
            if (str_idx in lang.ide) {
              msg = sprintf(lang.ide.TOOL_MSG_INFO_HDL_SUCCESS, lang.ide[str_idx], value);
              view.notify('info', msg);
            }
            return null;
          }
        });
        return model.on('TOOLBAR_HANDLE_FAILED', function(flag, value) {
          var msg, str_idx;
          if (flag) {
            if (modal && modal.isPopup()) {
              if (flag === "SAVE_STACK" || flag === "CREATE_STACK") {
                $('#btn-confirm').attr('disabled', true);
                $('.modal-close').attr('disabled', false);
              }
            }
            str_idx = 'TOOLBAR_HANDLE_' + flag;
            if (str_idx in lang.ide) {
              msg = sprintf(lang.ide.TOOL_MSG_ERR_HDL_FAILED, lang.ide[str_idx], value);
              return view.notify('error', msg);
            }
          }
        });
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
