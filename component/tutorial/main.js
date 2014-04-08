(function() {
  define(['jquery', 'event'], function($, ide_event) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['./component/tutorial/view', './component/tutorial/model'], function(View, Model) {
        var model, view;
        view = new View();
        model = new Model();
        if (MC.common.cookie.getCookieByName('state') === '3') {
          model.updateAccountService();
        }
        view.model = model;
        view.on('CLOSE_POPUP', function() {
          return unLoadModule(view, model);
        });
        return view.render();
      });
    };
    unLoadModule = function(view, model) {
      console.log('stack run unLoadModule');
      view.off();
      model.off();
      view.undelegateEvents();
      view = null;
      return model = null;
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
