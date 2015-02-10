(function() {
  define(['../base/main', './model', './view'], function(PropertyModel, model, view) {
    var loadModule, onUnloadSubPanel, refresh;
    view.on('OPEN_SG', function(sgUID) {
      PropertyModel.loadSubPanel("SG", sgUID);
      return null;
    });
    view.model = model;
    refresh = function() {
      view.render();
      return null;
    };
    loadModule = function(parent_model) {
      model.parent_model = parent_model;
      model.resId = parent_model.get('uid') || parent_model.id;
      view.render();
      return null;
    };
    onUnloadSubPanel = function(id) {
      if (id === "SG") {
        return view.render();
      }
    };
    return {
      loadModule: loadModule,
      refresh: refresh,
      onUnloadSubPanel: onUnloadSubPanel
    };
  });

}).call(this);
