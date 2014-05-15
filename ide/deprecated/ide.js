(function() {
  define(['MC', 'event', 'handlebars', 'i18n!nls/lang.js', './view', 'canvas_layout', 'header', 'navigation', 'tabbar', 'dashboard', 'design_module', 'process', 'constant', 'base_model', 'common_handle', 'validation', 'aws_handle'], function(MC, ide_event, Handlebars, lang, view, canvas_layout, header, navigation, tabbar, dashboard, design, process, constant, base_model, common_handle, validation) {
    return {
      initialize: function() {
        var r, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
        _.delay(function() {
          console.log('---------- check network ----------');
          if (!MC.data.is_loading_complete && $('#loading-bar-wrapper').html().trim() !== '') {
            ide_event.trigger(ide_event.SWITCH_MAIN);
            return notification('error', lang.ide.IDE_MSG_ERR_CONNECTION, true);
          }
        }, 50 * 1000);
        MC.data.current_tab_id = 'dashboard';
        MC.data.config = {};
        _ref = constant.REGION_KEYS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          MC.data.config[r] = {};
        }
        MC.data.dict_ami = {};
        MC.data.stack_list = {};
        _ref1 = constant.REGION_KEYS;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          r = _ref1[_j];
          MC.data.stack_list[r] = [];
        }
        MC.data.app_list = {};
        _ref2 = constant.REGION_KEYS;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          r = _ref2[_k];
          MC.data.app_list[r] = [];
        }
        MC.data.nav_new_stack_list = {};
        MC.data.nav_app_list = {};
        MC.data.nav_stack_list = {};
        MC.data.resource_list = {};
        _ref3 = constant.REGION_KEYS;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          r = _ref3[_l];
          MC.data.resource_list[r] = {};
        }
        MC.data.untitled = 0;
        MC.tab = {};
        MC.process = {};
        MC.data.process = {};
        MC.storage.remove('process');
        MC.data.loading_wrapper_html = null;
        MC.data.is_loading_complete = false;
        MC.data.resouceapi = [];
        MC.data.ide_available_count = 0;
        MC.data.account_attribute = {};
        _ref4 = constant.REGION_KEYS;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          r = _ref4[_m];
          MC.data.account_attribute[r] = {
            'support_platform': '',
            'default_vpc': '',
            'default_subnet': {}
          };
        }
        MC.data.demo_stack_list = constant.DEMO_STACK_NAME_LIST;
        MC.open_failed_list = {};
        MC.ta = {};
        MC.ta = validation;
        MC.ta.list = [];
        MC.ta.state_list = {};
        MC.data.state = {};
        MC.data.stateClipboard = [];
        MC.data.running_app_list = {};
        MC.data.open_tab_data = {};
        ide_event.onLongListen(ide_event.RETURN_OVERVIEW_TAB, function() {
          return view.showOverviewTab();
        });
        ide_event.onLongListen(ide_event.RETURN_REGION_TAB, function() {
          return view.showRegionTab();
        });
        ide_event.onLongListen(ide_event.SWITCH_TAB, function() {
          return view.showTab();
        });
        ide_event.onLongListen(ide_event.SWITCH_DASHBOARD, function() {
          return view.showDashbaordTab();
        });
        ide_event.onLongListen(ide_event.SWITCH_PROCESS, function() {
          return view.showProcessTab();
        });
        ide_event.onLongListen(ide_event.SWITCH_MAIN, function() {
          return view.showMain();
        });
        ide_event.onLongListen(ide_event.SWITCH_LOADING_BAR, function(tab_id, is_transparent) {
          return view.showLoading(tab_id, is_transparent);
        });
        ide_event.onLongListen(ide_event.SWITCH_WAITING_BAR, function() {
          return view.toggleWaiting();
        });
        ide_event.onLongListen(ide_event.HIDE_STATUS_BAR, function() {
          return view.hideStatubar();
        });
        ide_event.onLongListen(ide_event.IDE_AVAILABLE, function() {
          console.log('IDE_AVAILABLE');
          MC.data.ide_available_count = MC.data.ide_available_count + 1;
          console.log('----------- ide:SWITCH_MAIN -----------');
          if (MC.data.ide_available_count === 4) {
            return ide_event.trigger(ide_event.SWITCH_MAIN);
          }
        });
        header.loadModule();
        tabbar.loadModule();
        dashboard.loadModule();
        ide_event.onListen(ide_event.DASHBOARD_COMPLETE, function() {
          console.log('DASHBOARD_COMPLETE');
          return navigation.loadModule();
        });
        ide_event.onListen(ide_event.NAVIGATION_COMPLETE, function() {
          console.log('NAVIGATION_COMPLETE');
          design.loadModule();
          return setTimeout(function() {
            console.log('layout');
            return canvas_layout.canvas_initialize();
          }, 2000);
        });
        ide_event.onListen(ide_event.DESIGN_COMPLETE, function() {
          console.log('DESIGN_COMPLETE');
          return process.loadModule();
        });
        base_model.sub(function(error) {
          var error_msg, label, _ref5;
          console.log('sub');
          if (error.return_code === constant.RETURN_CODE.E_SESSION) {
            ide_event.trigger(ide_event.SWITCH_MAIN);
            require(['component/session/SessionDialog'], function(SessionDialog) {
              return new SessionDialog();
            });
            if (error.param[0].method === 'info') {
              if ((_ref5 = error.param[0].url) === '/stack/' || _ref5 === '/app/') {
                ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, error.param[4][0]);
              }
            }
          } else {
            label = 'ERROR_CODE_' + error.return_code + '_MESSAGE';
            console.warn(lang.service[label], error);
            if (error.error_message.indexOf('AWS was not able to validate the provided access credentials') !== -1) {
              return;
            }
            if (error.param[0].url === '/session/' && error.param[0].method === 'login') {
              return;
            }
            if (error.return_code === -1 && error.error_message === "200") {
              if (error.param[0].url === '/aws/' && error.param[0].method === 'resource') {
                notification('warning', lang.service["ERROR_CODE_-1_MESSAGE_AWS_RESOURCE"]);
              } else {
                notification('warning', lang.service[label]);
              }
              return null;
            }
            if (lang.service[label]) {
              error_msg = lang.service[label] + "(" + error.return_code + ")";
            } else {
              error_msg = "unknown error (" + error.return_code + ")";
            }
            if (error_msg && $(".error_item").text().indexOf(error_msg) === -1) {
              notification('error', error_msg, false);
            }
          }
          return null;
        });
        return null;
      }
    };
  });

}).call(this);
