(function() {
  define(['jquery', 'event'], function($, ide_event) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['unmanagedvpc_view', 'unmanagedvpc_model'], function(View, Model) {
        var model, view;
        view = new View();
        model = new Model();
        view.model = model;

        /* env:dev                                                                       env:dev:end */
        model.on('change:resource_list', function() {
          console.log('change:resource_list', model.get('resource_list'));
          return view.render();
        });
        ide_event.onLongListen(ide_event.UPDATE_IMPORT_ITEM, function(idx) {
          console.log('UPDATE_IMPORT_ITEM');
          return model.getResource(idx);
        });
        model.getStatResourceService();
        view.on('CLOSE_POPUP', function() {
          return unLoadModule(view, model);
        });
        view.on('RELOAD_EVENT', function() {
          return model.reload();
        });
        if (_.isEmpty(model.get('resource_list'))) {
          return view.render();
        }
      });
    };
    unLoadModule = function(view, model) {
      console.log('unmanaged vpc unLoadModule');
      view.off();
      model.off();
      view.undelegateEvents();
      view = null;
      model = null;
      return ide_event.offListen(ide_event.UPDATE_IMPORT_ITEM);
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
