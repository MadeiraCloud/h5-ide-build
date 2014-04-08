(function() {
  define(['jquery', 'event'], function($, ide_event) {
    var loadModule, loadReConnectModule, unLoadModule;
    loadModule = function() {
      return require(['./component/session/session_view'], function(Session_view) {
        var session_view;
        if (modal && modal.isPopup()) {
          return;
        }
        session_view = new Session_view();
        session_view.render();
        session_view.on('CLOSE_POPUP', function() {
          return unLoadModule(session_view);
        });
        return session_view.on('OPEN_RECONNECT', function() {
          return loadReConnectModule();
        });
      });
    };
    loadReConnectModule = function() {
      return require(['./component/session/reconnect_view', './component/session/model'], function(Reconnect_view, Model) {
        var model, reconnect_view;
        if (modal && modal.isPopup()) {
          return;
        }
        reconnect_view = new Reconnect_view();
        model = new Model();
        reconnect_view.render();
        reconnect_view.on('RE_LOGIN', function(password) {
          return model.relogin(password);
        });
        reconnect_view.on('CLOSE_POPUP', function() {
          return unLoadModule(reconnect_view, model);
        });
        model.on('RE_LOGIN_SCUCCCESS', function() {
          ide_event.trigger(ide_event.UPDATE_APP_LIST);
          ide_event.trigger(ide_event.UPDATE_DASHBOARD);
          ide_event.trigger(ide_event.RECONNECT_WEBSOCKET);
          reconnect_view.close();
          if (!MC.data.is_loading_complete) {
            window.location.href = "/";
          }
        });
        return model.on('RE_LOGIN_FAILED', function() {
          return reconnect_view.invalid();
        });
      });
    };
    unLoadModule = function(view, model) {
      console.log('session unLoadModule');
      view.off();
      view.undelegateEvents();
      view = null;
      if (!model) {
        return;
      }
      model.off();
      return model = null;
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
