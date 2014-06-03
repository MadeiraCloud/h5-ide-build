(function() {
  define(['i18n!nls/lang.js', 'constant', 'component/stateeditor/stateeditor', './module/design/framework/DesignBundle'], function(lang, constant, stateeditor, Design) {
    var loadModule, unLoadModule, wrap;
    loadModule = function() {
      return require(['design_view', 'design_model', 'property', 'event'], function(View, model, property_main, ide_event) {
        var design_view_init, view;
        design_view_init = null;
        MC.data.design_submodule_count = 0;
        view = new View();
        view.listen(model);
        view.once('DESIGN_COMPLETE', function() {
          console.log('view:DESIGN_COMPLETE');
          return wrap();
        });
        view.render();
        ide_event.onLongListen(ide_event.DESIGN_SUB_COMPLETE, function() {
          console.log('design:DESIGN_SUB_COMPLETE = ' + MC.data.design_submodule_count);
          if (MC.data.design_submodule_count === 3) {
            design_view_init = view.$el.html();
            MC.data.design_submodule_count = -1;
            ide_event.trigger(ide_event.DESIGN_COMPLETE);
            ide_event.trigger(ide_event.IDE_AVAILABLE);
            ide_event.offListen(ide_event.DESIGN_SUB_COMPLETE);
          } else {
            MC.data.design_submodule_count = MC.data.design_submodule_count + 1;
          }
          return null;
        });
        ide_event.onLongListen(ide_event.ADD_TAB_DATA, function(tab_id) {
          var error, _ref;
          console.log('ADD_TAB_DATA = ' + tab_id);
          try {
            if ((_ref = tab_id.split('-')[0]) !== 'process') {
              model.addTab(tab_id, view.html(), model.getDesignModel(), model.getCanvasData(), model.getOriginData(), property_main.snapshot(), model.getTAValidation());
            }
          } catch (_error) {
            error = _error;
            console.log('ADD_TAB_DATA error, current tab id is ' + tab_id);
            console.log("error message: " + error);
          }
          return null;
        });
        ide_event.onLongListen(ide_event.DELETE_TAB_DATA, function(tab_id) {
          console.log('DELETE_TAB_DATA, tab_id = ' + tab_id);
          model.deleteTab(tab_id);
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_TAB_DATA, function(new_tab_id, old_tab_id) {
          model.updateTab(new_tab_id, old_tab_id);
          return null;
        });
        ide_event.onLongListen(ide_event.SWITCH_TAB, function(type, tab_id, region_name, result, current_platform) {
          var component, id, layout, state, _ref;
          console.log('design:SWITCH_TAB', type, tab_id, region_name, result, current_platform);
          if (type === 'NEW_STACK') {
            MC.open_failed_list[MC.data.current_tab_id] = {
              'id': tab_id,
              'region': region_name,
              'platform': current_platform,
              'type': type
            };
          }
          if (type === 'OLD_STACK' || type === 'OLD_APP') {
            model.getTab(type, tab_id);
          } else {
            view.$el.html(design_view_init);
          }
          if (type === 'NEW_STACK' || type === 'OPEN_STACK' || type === 'OPEN_APP') {
            if (result && result.resolved_data && result.resolved_data.length === 0) {
              console.log('current tab inexistence', type, tab_id, region_name, result, current_platform);
              return;
            }
            id = type === 'NEW_STACK' ? result : tab_id;
            MC.data.open_tab_data[id] = {
              region: region_name,
              type: type,
              platform: current_platform,
              tab_id: tab_id,
              result: result
            };
            if (type === 'NEW_STACK') {
              model.setCanvasData({});
              MC.common.other.canvasData.initSet('id', result);
              MC.common.other.canvasData.initSet('name', tab_id);
              MC.common.other.canvasData.initSet('region', region_name);
              MC.common.other.canvasData.initSet('platform', current_platform);
              MC.common.other.canvasData.initSet('version', '2014-02-17');
              component = $.extend(true, {}, MC.canvas.DESIGN_INIT_DATA_VPC);
              layout = MC.canvas.DESIGN_INIT_LAYOUT_VPC;
              MC.common.other.canvasData.initSet('component', component);
              MC.common.other.canvasData.initSet('layout', layout);
            }
            if (type === 'OPEN_STACK' || type === 'OPEN_APP') {
              model.setCanvasData(result.resolved_data[0]);
            }
            ide_event.trigger(ide_event.OPEN_DESIGN, region_name, type, current_platform, tab_id, result);
            if (type === 'OPEN_STACK') {
              ide_event.trigger(ide_event.SWITCH_WAITING_BAR, null, true);
            }
          }
          if (type === 'OPEN_APP' || type === 'OLD_APP') {
            console.log('when open_app or old_app restore the scene');
            if (MC.data.process[tab_id] && MC.data.process[tab_id].flag_list) {
              if (MC.data.process[tab_id].flag_list.is_updated) {
                if (type === 'OLD_APP') {
                  ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, 'UPDATING_SUCCESS', tab_id);
                } else {
                  MC.common.other.deleteProcess(tab_id);
                }
              } else if (MC.data.process[tab_id].flag_list.is_done) {
                ide_event.trigger(ide_event.HIDE_DESIGN_OVERLAY);
              } else if (MC.data.process[tab_id].flag_list.is_failed) {
                if (type === 'OLD_APP') {
                  ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, 'CHANGED_FAIL', tab_id);
                } else {

                }
              } else if (MC.data.process[tab_id].flag_list.flag === 'UPDATE_APP') {
                ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, constant.APP_STATE.APP_STATE_UPDATING, tab_id);
              } else if ((_ref = MC.data.process[tab_id].flag_list.flag) === 'START_APP' || _ref === 'STOP_APP' || _ref === 'TERMINATE_APP') {
                ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, model.returnAppState(MC.data.process[tab_id].flag_list.flag, MC.data.process[tab_id].state), tab_id);
              }
            } else {
              state = MC.common.other.filterProcess(tab_id);
              if (state) {
                ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, state, tab_id);
              } else {
                console.log('current tab not found state');
              }
            }
          }
          if ((type === 'OLD_APP' || type === 'OLD_STACK') && MC.open_failed_list[tab_id]) {
            ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, 'OPEN_TAB_FAIL', tab_id);
          }
          view.hideStatusbar();
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_APP_STATE, function(type, id) {
          console.log('design:UPDATE_APP_STATE', type, id);
          if (_.isEmpty(MC.common.other.initDataProcess(id, type, MC.process))) {
            return;
          }
          if (MC.data.current_tab_id !== id) {
            return;
          }
          if (MC.process[id].flag_list && MC.process[id].flag_list.is_updated) {
            ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, 'UPDATING_SUCCESS', id);
          } else if (MC.process[id].flag_list && MC.process[id].flag_list.is_failed) {
            ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, 'CHANGED_FAIL', id);
            _.delay(function() {
              var obj;
              obj = MC.common.other.searchStackAppById(id);
              if (obj && obj.state) {
                return ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, obj.state, id);
              }
            }, 500);
          } else if (type === constant.APP_STATE.APP_STATE_RUNNING || type === constant.APP_STATE.APP_STATE_STOPPED || type === constant.APP_STATE.APP_STATE_TERMINATED) {
            ide_event.trigger(ide_event.HIDE_DESIGN_OVERLAY);
          } else if (type === constant.APP_STATE.APP_STATE_STARTING || type === constant.APP_STATE.APP_STATE_STOPPING || type === constant.APP_STATE.APP_STATE_TERMINATING || type === constant.APP_STATE.APP_STATE_UPDATING) {
            ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, type, id);
          }
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_APP_INFO, function(region_name, app_id) {
          console.log('UPDATE_APP_INFO', region_name, app_id);
          setTimeout(function() {
            if (MC.data.process[app_id] && MC.data.process[app_id].flag_list.is_failed) {
              return;
            }
            return model.appInfoService(region_name, app_id);
          }, 200);
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_APP_RESOURCE, function(region_name, app_id) {
          console.log('UPDATE_APP_RESOURCE', region_name, app_id);
          ide_event.trigger(ide_event.SWITCH_LOADING_BAR, null, true);
          model.getAppResourcesService(region_name, app_id);
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_STATUS_BAR, function(type, level) {
          return view.updateStatusbar(type, level);
        });
        ide_event.onLongListen(ide_event.UPDATE_STATUS_BAR_SAVE_TIME, function() {
          return view.updateStatusBarSaveTime();
        });
        ide_event.onLongListen(ide_event.UPDATE_RESOURCE_STATE, function() {
          return view.hideStatusbar();
        });
        ide_event.onLongListen(ide_event.OPEN_STATE_EDITOR, function(uid, resId) {
          var allCompData, compData;
          allCompData = Design.instance().serialize().component;
          compData = allCompData[uid];
          return stateeditor.loadModule(allCompData, uid, resId);
        });
        model.on("SET_PROPERTY_PANEL", function(property_panel) {
          property_main.restore(property_panel);
          return null;
        });
        ide_event.onLongListen(ide_event.RESOURCE_API_COMPLETE, function() {
          var obj, _ref, _ref1;
          console.log('design:RESOURCE_API_COMPLETE');
          obj = MC.data.open_tab_data[MC.data.current_tab_id];
          if (obj && obj.tab_id) {
            ide_event.trigger(ide_event.CREATE_DESIGN_OBJ, obj.region, obj.type, obj.platform, obj.tab_id, obj.result);
            if (Tabbar.current === 'app') {
              model.getAppResourcesService(obj.region, obj.tab_id);
            } else if (Tabbar.current === 'appview') {
              Design.instance().trigger(Design.EVENT.AwsResourceUpdated);
            } else if ((_ref = Tabbar.current) === 'new' || _ref === 'stack') {
              ide_event.trigger(ide_event.GET_STATE_MODULE);
            }
            if ((_ref1 = obj.type) !== 'OLD_APP' && _ref1 !== 'OLD_STACK') {
              ide_event.trigger(ide_event.OPEN_PROPERTY, "component", "");
            }
            return delete MC.data.open_tab_data[MC.data.current_tab_id];
          } else {
            return console.error('design:RESOURCE_API_COMPLETE');
          }
        });
        return ide_event.onLongListen(ide_event.GET_STATE_MODULE, function() {
          console.log('design:GET_STATE_MODULE');
          return model.getStateModule();
        });
      });
    };
    unLoadModule = function() {};
    wrap = function() {
      return require(['resource', 'property', 'toolbar', 'canvas'], function(resource, property, toolbar, canvas) {
        canvas.loadModule();
        toolbar.loadModule();
        resource.loadModule();
        return property.loadModule();
      });
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
