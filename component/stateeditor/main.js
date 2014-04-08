(function() {
  define(['event', 'ace', 'ace_ext_language_tools', 'UI.modal', 'jquery_sort', 'markdown'], function(ide_event) {
    var loadModule, unLoadModule;
    loadModule = function(allCompData, uid, resId) {
      var that;
      that = this;
      return require(['stateeditor_view', 'stateeditor_model'], function(View, Model) {
        var compData, model, resModel, view;
        compData = allCompData[uid];
        resModel = Design.instance().component(uid);
        if (compData) {
          model = new Model({
            compData: compData,
            resModel: resModel,
            resId: resId,
            allCompData: allCompData
          });
        } else {
          model = new Backbone.Model();
        }
        view = new View({
          model: model
        });
        view.model = model;
        ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR);
        ide_event.onLongListen(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR, function(newStateUpdateResIdAry) {
          return view.onStateStatusUpdate(newStateUpdateResIdAry);
        });
        ide_event.offListen(ide_event.STATE_EDITOR_SAVE_DATA);
        ide_event.onLongListen(ide_event.STATE_EDITOR_SAVE_DATA, function(event) {
          return view.onMouseDownSaveFromOther(event);
        });
        $('#property-panel').addClass('state');
        return $('#property-panel .sub-stateeditor').html(view.render().el);
      });
    };
    unLoadModule = function(view, model) {
      var err;
      console.log('state editor unLoadModule');
      try {
        view.off();
        model.off();
        view.undelegateEvents();
        modal.close();
        view = null;
        model = null;
        ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR);
      } catch (_error) {
        err = _error;
        null;
      }
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
