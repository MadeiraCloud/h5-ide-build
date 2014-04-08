(function() {
  define(['jquery', 'event', './component/statestatus/view', './component/statestatus/model'], function($, ide_event, View, Model) {
    var loadModule, model, unLoadModule, view;
    model = null;
    view = null;
    loadModule = function() {
      model = new Model();
      view = new View({
        model: model
      });
      view.on('CLOSE_POPUP', this.unLoadModule, this);
      ide_event.onLongListen(ide_event.UPDATE_STATE_STATUS_DATA, model.listenStateStatusUpdate, model);
      ide_event.onLongListen(ide_event.STATE_EDITOR_DATA_UPDATE, model.listenStateEditorUpdate, model);
      ide_event.onLongListen(ide_event.UPDATE_APP_STATE, model.listenUpdateAppState, model);
      return view.render();
    };
    unLoadModule = function() {
      view.remove();
      model.destroy();
      ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA, model.listenStateStatusUpdate);
      ide_event.offListen(ide_event.STATE_EDITOR_DATA_UPDATE);
      return ide_event.offListen(ide_event.UPDATE_APP_STATE, model.listenUpdateAppState);
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
