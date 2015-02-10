(function() {
  define(['../base/main', './model', './view', 'constant', 'event'], function(PropertyModule, model, view, constant, ide_event) {
    var VPNModule;
    VPNModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.VPN,
      initStack: function() {
        this.view = view;
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = false;
        return null;
      },
      initApp: function() {
        this.view = view;
        this.model = model;
        this.model.isApp = true;
        this.model.isAppEdit = false;
        return null;
      },
      initAppEdit: function() {
        this.view = view;
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = true;
        return null;
      }
    });
    return null;
  });

}).call(this);
