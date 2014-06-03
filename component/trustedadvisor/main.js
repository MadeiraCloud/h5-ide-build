(function() {
  define(['jquery', 'event', './view', './model'], function($, ide_event, View, Model) {
    var loadModule, unLoadModule;
    loadModule = function(type, status) {
      var model, processBar, processRun, view;
      view = new View();
      model = new Model();
      view.model = model;
      view.on('CLOSE_POPUP', function() {
        return unLoadModule(view, model);
      });
      processBar = function() {
        ide_event.onLongListen(ide_event.UPDATE_TA_MODAL, function() {
          return console.log('UPDATE_TA_MODAL');
        });
        model.createList();
        return view.render(type, status);
      };
      processRun = function() {
        var deferred;
        deferred = Q.defer();
        ide_event.onListen(ide_event.TA_SYNC_FINISH, function() {
          console.log('TA_SYNC_FINISH');
          model.createList();
          view.render(type, status);
          if (model.get('error_list').length === 0) {
            return deferred.resolve();
          } else {
            return deferred.reject();
          }
        });
        MC.ta.validRun();
        return deferred.promise;
      };
      ide_event.onLongListen(ide_event.UNLOAD_TA_MODAL, function() {
        console.log('UNLOAD_TA_MODAL');
        return unLoadModule(view, model);
      });
      if (type === 'stack') {
        view.closedPopup();
        return processRun();
      } else {
        return processBar();
      }
    };
    unLoadModule = function(view, model) {
      console.log('trusted advisor run unLoadModule');
      view.off();
      model.off();
      view.undelegateEvents();
      view = null;
      model = null;
      ide_event.offListen(ide_event.UPDATE_TA_MODAL);
      return ide_event.offListen(ide_event.UNLOAD_TA_MODAL);
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
