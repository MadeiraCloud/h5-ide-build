(function() {
  define(['jquery', 'event', 'base_main'], function($, ide_event, base_main) {
    var initialize, loadModule, unLoadModule;
    initialize = function() {
      return _.extend(this, base_main);
    };
    initialize();
    loadModule = function(type, key) {
      return require(['module/reset/view', 'module/reset/model'], function(View, model) {
        var view;
        view = loadSuperModule(loadModule, 'reset', View, null);
        if (!view) {
          return;
        }
        view.model = model;
        if (key && type === 'password') {
          model.set('key', key);
          model.checkKeyServer();
        }
        view.on('RESET_EMAIL', function(result) {
          return model.checkRepeatService(result);
        });
        view.on('RESET_PASSWORD', function(result) {
          return model.updatePasswordServer(result);
        });
        model.on('NO_EMAIL', function() {
          return view.showErrorMessage();
        });
        model.on('KEY_VALID', function() {
          return view.passwordRender();
        });
        return view.render(type, key);
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
