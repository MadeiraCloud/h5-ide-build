(function() {
  define(['event'], function(ide_event) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['process_view', 'process_model'], function(view, model) {
        var type;
        type = null;
        view.model = model;
        model.on('change:flag_list', function() {
          console.log('change:flag_list');
          return view.render(type);
        });
        model.on('change:timeout_obj', function() {
          console.log('change:timeout_obj');
          return view.render(type);
        });
        ide_event.onLongListen(ide_event.SWITCH_PROCESS, function(state, tab_id) {
          var obj;
          console.log('process:SWITCH_PROCESS', state, tab_id);
          type = MC.common.other.processType(tab_id);
          switch (type) {
            case 'appview':
              obj = MC.common.other.getCacheMap(tab_id);
              model.getVpcResourceService(obj.region, obj.origin_id, state);
              model.getTimestamp(state, tab_id);
              break;
            case 'process':
              model.getProcess(tab_id);
          }
          return view.render(type);
        });
        return ide_event.onLongListen(ide_event.UPDATE_PROCESS, function(tab_id) {
          console.log('UPDATE_PROCESS', tab_id);
          if (MC.common.other.isCurrentTab(tab_id)) {
            return model.getProcess(tab_id);
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
