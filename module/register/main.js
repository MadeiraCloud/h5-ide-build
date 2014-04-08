(function() {
  define(['jquery', 'event', 'base_main'], function($, ide_event, base_main) {
    var initialize, loadModule, unLoadModule;
    initialize = function() {
      return _.extend(this, base_main);
    };
    initialize();
    loadModule = function(type) {
      return require(['module/register/view', 'module/register/model'], function(View, model) {
        var view;
        view = loadSuperModule(loadModule, 'register', View, null);
        if (!view) {
          return;
        }
        view.model = model;
        view.on('CHECK_REPEAT', function(username, email, password) {
          return model.checkRepeatService(username, email, password);
        });
        view.on('AUTO_LOGIN', function() {
          return model.loginService();
        });
        model.on('USERNAME_REPEAT', function() {
          return view.showStatusInValid('username');
        });
        model.on('EMAIL_REPEAT', function() {
          return view.showStatusInValid('email');
        });
        model.on('USERNAME_EMAIL_REPEAT', function() {
          return view.showUsernameEmailError();
        });
        model.on('USERNAME_VALID', function() {
          return view.showStatusValid('username');
        });
        model.on('EMAIL_VALID', function() {
          return view.showStatusValid('email');
        });
        model.on('USERNAME_EMAIL_VALID', function() {
          return view.showUsernameEmailValid();
        });
        model.on('RESET_CREATE_ACCOUNT', function(message) {
          return view.resetCreateAccount(message);
        });
        model.on('OTHER_ERROR', function() {
          return view.otherError();
        });
        model.on('RESIGER_SUCCESS', function() {
          return view.registerSuccess();
        });
        return view.render(type);
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
