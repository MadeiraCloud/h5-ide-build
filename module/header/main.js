(function() {
  define(['event', 'i18n!nls/lang.js', 'base_main'], function(ide_event, lang, base_main) {
    var initialize, loadModule, unLoadModule;
    initialize = function() {
      _.extend(this, base_main);
      return null;
    };
    initialize();
    loadModule = function() {
      console.log('load header module');
      return require(['header_view', 'header_model'], function(View, model) {
        var logout, updateHeader, updateHeaderTO, view;
        view = loadSuperModule(loadModule, 'header', View, null);
        if (!view) {
          return;
        }
        model.init();
        view.model = model;
        view.render();
        updateHeaderTO = null;
        updateHeader = function() {
          view.updateNotification();
          return null;
        };
        ide_event.onLongListen(ide_event.UPDATE_HEADER, function(req) {
          console.log('HEADER_UPDATE, req:', req);
          if (req) {
            model.updateHeader(req);
            if (updateHeaderTO) {
              clearTimeout(updateHeaderTO);
            }
            updateHeaderTO = setTimeout(updateHeader, 200);
          }
          return null;
        });
        ide_event.onListen(ide_event.WS_COLLECTION_READY_REQUEST, function() {
          model.resetInfoList();
          view.updateNotification();
          return null;
        });
        ide_event.onLongListen(ide_event.SWITCH_DASHBOARD, function() {
          console.log('header:SWITCH_DASHBOARD');
          model.setFlag(true);
          return view.updateNotification();
        });
        ide_event.onLongListen(ide_event.SWITCH_TAB, function() {
          return setTimeout(function() {
            console.log('SWITCH_TAB header id:' + MC.data.current_tab_id);
            model.setFlag(false);
            return view.updateNotification();
          }, 500);
        });
        ide_event.onListen(ide_event.OPEN_DESIGN, function() {
          console.log('OPEN_DESIGN');
          model.setFlag(false);
          return view.updateNotification();
        });
        ide_event.onLongListen(ide_event.UPDATE_AWS_CREDENTIAL, function() {
          console.log('UPDATE_AWS_CREDENTIAL');
          model.set('has_cred', MC.common.cookie.getCookieByName('has_cred') === 'true');
          return view.update();
        });
        view.on('DROPDOWN_MENU_CLOSED', function() {
          return model.resetInfoList();
        });
        view.on('DROPDOWN_APP_NAME_CLICK', function(req_id) {
          return model.openApp(req_id);
        });
        logout = function() {
          model.logout();
          return null;
        };
        ide_event.onLongListen(ide_event.LOGOUT_IDE, logout);
        view.on('BUTTON_LOGOUT_CLICK', logout);
        view.on('AWSCREDENTIAL_CLICK', function() {
          console.log('AWSCREDENTIAL_CLICK');
          return require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        });
        return null;
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
