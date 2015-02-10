(function() {
  define(["../base/main", "./model", "./view", "./app_model", "./app_view", "constant"], function(PropertyModule, model, view, app_model, app_view, constant) {
    var VolumeModule;
    VolumeModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.VOL],
      setupStack: function() {
        this.view.on("OPEN_SNAPSHOT", function(id) {
          PropertyModule.loadSubPanel("STATIC", id);
          return null;
        });
        return null;
      },
      initStack: function(uid) {
        var owner, volume;
        volume = Design.instance().component(uid);
        owner = volume.get('owner');
        this.model = model;
        this.view = view;
        if (owner.type === constant.RESTYPE.LC && owner.get('appId')) {
          this.model.isAppEdit = true;
        } else {
          this.model.isAppEdit = false;
        }
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      }
    });
    return null;
  });

}).call(this);
