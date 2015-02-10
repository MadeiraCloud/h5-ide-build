(function() {
  define(['../base/main', '../base/model', '../base/view', 'constant', 'i18n!/nls/lang.js'], function(PropertyModule, PropertyModel, PropertyView, constant, lang) {
    var MissingModule, MissingView, m, model, view;
    MissingView = PropertyView.extend({
      render: function() {
        var comp, _ref;
        comp = Design.instance().component(this.model.get('uid'));
        if (((_ref = Design.instance().get('state')) === 'Stopped' || _ref === "Stopping") && comp.type === constant.RESTYPE.ASG) {
          this.$el.html(MC.template.missingAsgWhenStop({
            asgName: comp.get('name')
          }));
          return "" + (comp.get('name')) + " Deleted";
        } else {
          this.$el.html(MC.template.missingPropertyPanel());
          return lang.PROP.MISSING_RESOURCE_UNAVAILABLE;
        }
      }
    });
    view = new MissingView();
    m = PropertyModel.extend({
      init: function(uid) {
        return this.set('uid', uid);
      }
    });
    model = new m();
    MissingModule = PropertyModule.extend({
      handleTypes: "Missing_Resource",
      initApp: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);
