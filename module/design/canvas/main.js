(function() {
  define(['event', 'i18n!nls/lang.js', 'constant'], function(ide_event, lang, constant) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['./module/design/canvas/view'], function(View) {
        var view;
        view = new View();
        view.render();
        ide_event.onLongListen(ide_event.CREATE_DESIGN_OBJ, function(region_name, type, current_platform, tab_name, result) {
          var dd, options;
          console.log('canvas:CREATE_DESIGN_OBJ', region_name, type, current_platform, tab_name, result);
          view.reRender();
          options = {
            mode: Tabbar.current === 'new' ? Design.MODE.Stack : Tabbar.current
          };
          if (Tabbar.current === 'appview') {
            MC.common.other.canvasData.init(result.resolved_data[0]);
            options.autoFinish = false;
            MC.canvas.layout.init();
            dd = new Design(MC.common.other.canvasData.data(true), options);
            console.log('new Design Create Complete');
            MC.canvas.analysis();
            dd.finishDeserialization();
          } else {
            MC.canvas.layout.init();
            new Design(MC.common.other.canvasData.data(true), options);
            console.log('new Design Create Complete');
            if (type === 'NEW_STACK') {
              MC.aws.aws.enableStackAgent(true);
            }
            MC.common.other.canvasData.origin(MC.common.other.canvasData.data());
            MC.ta.list = [];
          }
          ide_event.trigger(ide_event.OPEN_SUB_DESIGN, region_name, type, current_platform, tab_name, result);
          return null;
        });
        ide_event.onLongListen(ide_event.RESTORE_CANVAS, function() {
          var options;
          console.log('RESTORE_CANVAS');
          view.render();
          options = {
            mode: Tabbar.current
          };
          MC.canvas.layout.init();
          new Design(MC.common.other.canvasData.origin(), options);
          console.log('new Design Create Complete');
          MC.common.other.canvasData.origin(MC.common.other.canvasData.data());
          return null;
        });
        return ide_event.onLongListen(ide_event.UPDATE_APP_STATE, function(type, id) {
          console.log('canvas:UPDATE_APP_STATE', type, id);
          if (type === constant.APP_STATE.APP_STATE_STARTING || type === constant.APP_STATE.APP_STATE_STOPPING || type === constant.APP_STATE.APP_STATE_TERMINATING || type === constant.APP_STATE.APP_STATE_UPDATING) {
            if (MC.common.other.isCurrentTab(id)) {
              MC.common.other.canvasData.set('state', type);
            } else {

            }
          }
          return null;
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
