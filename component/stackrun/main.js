(function() {
  define(['jquery', 'event'], function($, ide_event) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['./component/stackrun/view', './component/stackrun/model'], function(View, Model) {
        var model, view;
        view = new View();
        model = new Model();
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
      model = null;
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
