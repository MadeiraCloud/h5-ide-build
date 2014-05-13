(function() {
  define(['event', 'base_main', 'constant'], function(ide_event, base_main, constant) {
    var initialize, loadModule, unLoadModule;
    initialize = function() {
      return _.extend(this, base_main);
    };
    initialize();
    loadModule = function() {
      return require(['navigation_view', 'navigation_model', 'UI.tooltip'], function(View, model) {
        var view;
        view = loadSuperModule(loadModule, 'navigation', View, null);
        if (!view) {
          return;
        }
        view.model = model;
        view.render();
        model.on('change:app_list', function() {
          console.log('change:app_list');
          ide_event.trigger(ide_event.RESULT_APP_LIST, model.get('app_list'));
          MC.data.nav_app_list = model.get('app_list');
          return view.appListRender();
        });
        model.on('change:stack_list', function() {
          console.log('change:stack_list');
          ide_event.trigger(ide_event.RESULT_STACK_LIST, model.get('stack_list'));
          MC.data.nav_stack_list = model.get('stack_list');
          return view.stackListRender();
        });
        model.on('change:region_empty_list', function() {
          console.log('change:region_empty_list');
          ide_event.trigger(ide_event.RESULT_EMPTY_REGION_LIST, null);
          view.regionEmtpyListRender();
          return model.describeRegionsService();
        });
        model.on('change:region_list', function() {
          console.log('change:region_list');
          return view.regionListRender();
        });
        model.appListService();
        model.stackListService();
        model.getStateAWSProperty();
        model.listenStateStatusList();
        ide_event.onLongListen(ide_event.UPDATE_APP_LIST, function(flag, ids) {
          console.log('UPDATE_APP_LIST');
          return model.appListService(flag, ids);
        });
        ide_event.onLongListen(ide_event.UPDATE_STACK_LIST, function(flag, ids) {
          console.log('UPDATE_STACK_LIST');
          return model.stackListService(flag, ids);
        });
        ide_event.onLongListen(ide_event.UPDATE_AWS_CREDENTIAL, function() {
          console.log('navigation:UPDATE_AWS_CREDENTIAL');
          return model.describeRegionsService();
        });
        return ide_event.onLongListen(ide_event.UPDATE_APP_STATE, function(type, id) {
          console.log('navigation:UPDATE_APP_STATE', type, id);
          if (type === constant.APP_STATE.APP_STATE_STARTING || type === constant.APP_STATE.APP_STATE_STOPPING || type === constant.APP_STATE.APP_STATE_TERMINATING || type === constant.APP_STATE.APP_STATE_UPDATING) {
            return model.updateApplistState(type, id);
          }
        });
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
