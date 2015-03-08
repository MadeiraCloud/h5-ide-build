(function() {
  define(['../base/view', './template', 'i18n!/nls/lang.js', 'constant', 'UI.modalplus'], function(PropertyView, Tpl, lang, constant) {
    var view;
    view = PropertyView.extend({
      initialize: function(options) {},
      render: function() {
        var afterComp, beforeComp;
        afterComp = this.model.port1Comp();
        beforeComp = this.model.port2Comp();
        this.$el.html(Tpl.stack({
          before: beforeComp.get('name'),
          after: afterComp.get('name')
        }));
        return 'Dependency';
      }
    });
    return new view();
  });

}).call(this);
