(function() {
  define(['jquery', 'event', 'base_main', 'constant', 'UI.tabbar', 'UI.modal'], function($, ide_event, base_main, constant) {
    var initialize, loadModule, unLoadModule;
    initialize = function() {
      _.extend(this, base_main);
      return null;
    };
    initialize();
    loadModule = function() {
      return require(['tabbar_view', 'tabbar_model'], function(View, model) {
        var importStackTab, newProcessTab, newStack, newStackTab, openApp, openAppTab, openStack, openStackTab, reloadAppTab, reloadAppViewTab, reloadNewStackTab, reloadStackTab, view;
        view = loadSuperModule(loadModule, 'tabbar', View, null);
        if (!view) {
          return;
        }
        view.on('SWITCH_DASHBOARD', function(original_tab_id, tab_id) {
          console.log('SWITCH_DASHBOARD');
          console.log('original_tab_id = ' + original_tab_id);
          console.log('tab_id          = ' + tab_id);
          return model.refresh(original_tab_id, tab_id, 'dashboard');
        });
        view.on('SWITCH_NEW_STACK_TAB', function(original_tab_id, tab_id, tab_name) {
          console.log('SWITCH_NEW_STACK_TAB');
          console.log('original_tab_id = ' + original_tab_id);
          console.log('tab_id          = ' + tab_id);
          console.log('tab_name        = ' + tab_name);
          model.set('tab_name', tab_name);
          return model.refresh(original_tab_id, tab_id, 'new');
        });
        view.on('SWITCH_STACK_TAB', function(original_tab_id, tab_id) {
          console.log('SWITCH_STACK_TAB');
          console.log('original_tab_id = ' + original_tab_id);
          console.log('tab_id          = ' + tab_id);
          return model.refresh(original_tab_id, tab_id, 'stack');
        });
        view.on('SWITCH_APP_TAB', function(original_tab_id, tab_id) {
          console.log('SWITCH_APP_TAB');
          console.log('original_tab_id = ' + original_tab_id);
          console.log('tab_id          = ' + tab_id);
          return model.refresh(original_tab_id, tab_id, 'app');
        });
        view.on('SWTICH_PROCESS_TAB', function(original_tab_id, tab_id) {
          console.log('SWTICH_PROCESS_TAB');
          console.log('original_tab_id = ' + original_tab_id);
          console.log('tab_id          = ' + tab_id);
          return model.refresh(original_tab_id, tab_id, tab_id.split('-')[0]);
        });
        view.on('SELECE_PLATFORM', function(platform) {
          console.log('SELECE_PLATFORM');
          console.log('platform          = ' + platform);
          console.log('region_name       = ' + view.temp_region_name);
          model.set('stack_region_name', view.temp_region_name);
          model.set('current_platform', platform);
          if (MC.data.untitled === 0 && MC.common.cookie.getCookieByName('state') === '3') {
            require(['component/tutorial/main'], function(tutorial_main) {
              return tutorial_main.loadModule();
            });
          }
          MC.common.other.checkRepeatStackName();
          Tabbar.add('new-' + MC.data.untitled + '-' + view.temp_region_name, 'untitled-' + MC.data.untitled + ' - stack');
          return modal.close();
        });
        model.on('SWITCH_DASHBOARD', function(result) {
          console.log('SWITCH_DASHBOARD');
          return ide_event.trigger(ide_event.SWITCH_DASHBOARD, null);
        });
        model.on('OPEN_PROCESS', function(tab_id) {
          var icon;
          console.log('OPEN_PROCESS');
          ide_event.trigger(ide_event.SWITCH_PROCESS, 'OPEN_PROCESS', tab_id);
          if (MC.common.other.processType(tab_id) === 'appview') {
            icon = 'visualization';
          } else if (MC.common.other.processType(tab_id) === 'process') {
            icon = 'pending';
          }
          return ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, icon, tab_id);
        });
        model.on('OLD_STACK', function(tab_id) {
          console.log('OLD_STACK');
          return ide_event.trigger(ide_event.SWITCH_TAB, 'OLD_STACK', tab_id);
        });
        model.on('OLD_PROCESS', function(tab_id) {
          console.log('OLD_PROCESS');
          return ide_event.trigger(ide_event.SWITCH_PROCESS, 'OLD_PROCESS', tab_id);
        });
        model.on('OLD_APP', function(tab_id) {
          console.log('OLD_APP');
          return ide_event.trigger(ide_event.SWITCH_TAB, 'OLD_APP', tab_id);
        });
        model.on('SAVE_DESIGN_MODULE', function(tab_id) {
          console.log('SAVE_DESIGN_MODULE', tab_id);
          return ide_event.trigger(ide_event.ADD_TAB_DATA, tab_id);
        });
        newStack = function(tab_id) {
          console.log('NEW_STACK');
          console.log(model.get('stack_region_name'));
          console.log(model.get('current_platform'));
          console.log(model.get('tab_name'));
          console.log(tab_id);
          ide_event.trigger(ide_event.SWITCH_LOADING_BAR, tab_id);
          ide_event.trigger(ide_event.SWITCH_TAB, 'NEW_STACK', model.get('tab_name').replace(' - stack', ''), model.get('stack_region_name'), tab_id, model.get('current_platform'));
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'stack', tab_id);
          MC.data.nav_new_stack_list[tab_id] = {
            region: model.get('stack_region_name'),
            platform: model.get('current_platform'),
            tab_name: model.get('tab_name').replace(' - stack', '')
          };
          return null;
        };
        openStack = function(tab_id) {
          var result;
          console.log('OPEN_STACK', tab_id);
          if (tab_id && tab_id.split('-') && tab_id.split('-')[0]) {
            ide_event.trigger(ide_event.SWITCH_LOADING_BAR, tab_id);
            if (tab_id.split('-')[0] === 'stack') {
              model.once('GET_STACK_COMPLETE', function(result) {
                console.log('GET_STACK_COMPLETE', result);
                console.log(result);
                if (MC.common.other.isResultRight(result) === true) {
                  ide_event.trigger(ide_event.SWITCH_TAB, 'OPEN_STACK', tab_id, model.get('stack_region_name'), result, result.resolved_data[0].platform);
                  return ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'stack', tab_id);
                } else {
                  ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, result.param[4][0]);
                  return ide_event.trigger(ide_event.SWITCH_MAIN);
                }
              });
              model.getStackInfo(tab_id);
            } else if (tab_id.split('-')[0] === 'import') {
              result = this.get('import_stack');
              tab_id = tab_id.replace('import', 'new');
              result.resolved_data[0].id = tab_id;
              MC.data.current_tab_id = tab_id;
              view.updateCurrentTab(tab_id, result.resolved_data[0].name + ' - stack');
              ide_event.trigger(ide_event.SWITCH_TAB, 'OPEN_STACK', tab_id, model.get('stack_region_name'), result, result.resolved_data[0].platform);
              ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'stack', tab_id);
            }
          }
          return null;
        };
        openApp = function(tab_id) {
          console.log('OPEN_APP');
          model.once('GET_APP_COMPLETE', function(result) {
            console.log('GET_APP_COMPLETE');
            console.log(result);
            if (MC.common.other.isResultRight(result) === true) {
              ide_event.trigger(ide_event.SWITCH_TAB, 'OPEN_APP', tab_id, result.resolved_data[0].region, result, result.resolved_data[0].platform);
              return ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, result.resolved_data[0].state, tab_id);
            } else {
              ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, result.param[4][0]);
              return ide_event.trigger(ide_event.SWITCH_MAIN);
            }
          });
          model.getAppInfo(tab_id);
          ide_event.trigger(ide_event.SWITCH_LOADING_BAR, tab_id);
          return null;
        };
        model.on('NEW_STACK', newStack);
        model.on('OPEN_STACK', openStack);
        model.on('OPEN_APP', openApp);
        newStackTab = function(region_name) {
          var platformSupport;
          console.log('ADD_STACK_TAB', region_name);
          view.temp_region_name = region_name;
          platformSupport = model.checkPlatform(region_name);
          if (platformSupport === null) {
            modal(MC.template.createNewStackErrorAndReload(), true);
          } else {
            view.openNewStackDialog();
          }
          return null;
        };
        openStackTab = function(tab_name, region_name, stack_id) {
          console.log('OPEN_STACK_TAB ' + ' tab_name = ' + tab_name + ', region_name = ' + region_name + ', stack_id = ' + stack_id);
          model.set('stack_region_name', region_name);
          Tabbar.open(stack_id.toLowerCase(), tab_name + ' - stack');
          if (_.contains(MC.data.demo_stack_list, tab_name) && MC.common.cookie.getCookieByName('state') === '3') {
            require(['component/tutorial/main'], function(tutorial_main) {
              return tutorial_main.loadModule();
            });
          }
          return null;
        };
        openAppTab = function(tab_name, region_name, app_id) {
          console.log('OPEN_APP_TAB ' + ' tab_name = ' + tab_name + ', region_name = ' + region_name + ', app_id = ' + app_id);
          model.set('app_region_name', region_name);
          Tabbar.open(app_id.toLowerCase(), tab_name + ' - app');
          return null;
        };
        newProcessTab = function(tab_id, tab_name, region, type) {
          var appview_id, obj, process_name, uid;
          console.log('OPEN_APP_PROCESS_TAB', tab_id, tab_name, region, type);
          if (type === 'process') {
            process_name = 'process-' + region + '-' + tab_name;
            MC.common.other.addProcess(process_name, {
              'tab_id': tab_id,
              'app_name': tab_name,
              'region': region,
              'flag_list': {
                'is_pending': true
              }
            });
            return Tabbar.add(process_name, tab_name + ' - app');
          } else if (type === 'appview') {
            obj = MC.common.other.searchCacheMap({
              key: 'origin_id',
              value: tab_id
            });
            if (!_.isEmpty(obj)) {
              appview_id = obj.type + '-' + obj.uid;
            } else {
              uid = MC.common.other.createUID();
              appview_id = 'process-' + uid;
              MC.common.other.addCacheMap(uid, appview_id, tab_id, region, 'process');
            }
            return Tabbar.open(appview_id, tab_name + ' - visualization');
          }
        };
        reloadNewStackTab = function(tab_id, region_name, platform) {
          console.log('RELOAD_NEW_STACK_TAB', tab_id, region_name, platform);
          model.set('tab_name', tab_id);
          model.set('stack_region_name', region_name);
          model.set('current_platform', platform);
          return newStack(tab_id);
        };
        reloadStackTab = function(tab_id, region_name) {
          console.log('RELOAD_STACK_TAB', tab_id, region_name);
          model.set('stack_region_name', region_name);
          return openStack(tab_id);
        };
        reloadAppTab = function(tab_id, region_name) {
          console.log('PROCESS_RUN_SUCCESS, tab_id = ' + tab_id + ', region_name = ' + region_name);
          model.set('app_region_name', region_name);
          return openApp(tab_id);
        };
        reloadAppViewTab = function(tab_name, region_name, tab_id) {
          var obj;
          console.log('OPEN_APPVIEW_TAB ' + ' tab_name = ' + tab_name + ', region_name = ' + region_name + ', tab_id = ' + tab_id);
          obj = MC.common.other.searchCacheMap({
            key: 'origin_id',
            value: tab_name
          });
          console.log(obj);
          ide_event.trigger(ide_event.SWITCH_TAB, 'OPEN_APP', tab_id, region_name, obj.data, obj.data.resolved_data[0].platform);
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'visualization', tab_id);
          return null;
        };
        importStackTab = function(result) {
          console.log('importStackTab', result);
          model.set('stack_region_name', result.resolved_data[0].region);
          model.set('import_stack', result);
          Tabbar.open(result.resolved_data[0].id, result.resolved_data[0].name + ' - stack');
          return null;
        };
        ide_event.onLongListen(ide_event.OPEN_DESIGN_TAB, function(type, tab_name, region_name, tab_id) {
          console.log('OPEN_DESIGN_TAB', type, tab_name, region_name, tab_id);
          switch (type) {
            case 'NEW_STACK':
              return newStackTab(region_name);
            case 'OPEN_STACK':
              return openStackTab(tab_name, region_name, tab_id);
            case 'OPEN_APP':
              return openAppTab(tab_name, region_name, tab_id);
            case 'NEW_PROCESS':
              return newProcessTab(tab_id, tab_name, region_name, 'process');
            case 'NEW_APPVIEW':
              return newProcessTab(tab_id, tab_name, region_name, 'appview');
            case 'RELOAD_STACK':
              return reloadStackTab(tab_id, region_name);
            case 'RELOAD_APP':
              return reloadAppTab(tab_id, region_name);
            case 'RELOAD_APPVIEW':
              return reloadAppViewTab(tab_name, region_name, tab_id);
            case 'RELOAD_NEW_STACK':
              return reloadNewStackTab(tab_id, region_name, tab_name);
            case 'IMPORT_STACK':
              return importStackTab(tab_name);
            default:
              return console.log('open undefined tab');
          }
        });
        ide_event.onLongListen(ide_event.CLOSE_DESIGN_TAB, function(tab_id) {
          console.log('CLOSE_DESIGN_TAB', tab_id);
          view.closeTab(tab_id);
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_DESIGN_TAB, function(tab_id, tab_name, old_tab_id) {
          var original_tab_id;
          console.log('UPDATE_DESIGN_TAB', tab_id, tab_name, old_tab_id);
          if (MC.data.current_tab_id === old_tab_id || old_tab_id === void 0) {
            MC.common.other.setCurrentTabId(tab_id);
          }
          original_tab_id = view.updateCurrentTab(tab_id, tab_name, old_tab_id);
          console.log(original_tab_id);
          if (original_tab_id !== tab_id) {
            ide_event.trigger(ide_event.ADD_TAB_DATA, tab_id);
            ide_event.trigger(ide_event.DELETE_TAB_DATA, original_tab_id);
          }
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_DESIGN_TAB_TYPE, function(tab_id, tab_type) {
          console.log('UPDATE_DESIGN_TAB_TYPE, tab_id = ' + tab_id + ', tab_type = ' + tab_type);
          return Tabbar.updateState(tab_id, tab_type);
        });
        ide_event.onLongListen(ide_event.NAVIGATION_TO_DASHBOARD_REGION, function() {
          console.log('NAVIGATION_TO_DASHBOARD_REGION');
          Tabbar.open('dashboard');
          return null;
        });
        ide_event.onLongListen(ide_event.RETURN_REGION_TAB, function(region) {
          console.log('RETURN_REGION_TAB ' + ' region = ' + region);
          view.changeDashboardTabname(region);
          return null;
        });
        ide_event.onLongListen(ide_event.RETURN_OVERVIEW_TAB, function() {
          console.log('RETURN_OVERVIEW_TAB ');
          view.changeDashboardTabname('Global');
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_APP_STATE, function(type, tab_id) {
          console.log('tabbar:UPDATE_APP_STATE', type, tab_id);
          if (type === constant.APP_STATE.APP_STATE_TERMINATED) {
            ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, tab_id);
            MC.common.other.deleteProcess(tab_id);
          }
          return null;
        });
        ide_event.onLongListen(ide_event.UPDATE_TAB_DATA, function(new_tab_id, old_tab_id) {
          view.updateCurrentTab(new_tab_id, null, old_tab_id);
          return null;
        });
        return view.render();
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
