define(['../base/view', './template', 'i18n!/nls/lang.js', 'constant', 'UI.modalplus'], function(PropertyView, Tpl, lang, constant) {
  var view;
  view = PropertyView.extend({
    events: {
      'change #property-mesos-stack-name': 'changeName'
    },
    initialize: function(options) {},
    render: function() {
      if (this.mode === 'stack') {
        this.$el.html(Tpl.stack(this.model.toJSON()));
      } else {
        this.$el.html(Tpl.app(this.model.toJSON()));
      }
      return this.model.get('name');
    },
    changeName: function(event) {
      var value;
      value = $(event.currentTarget).val();
      this.model.set('name', value);
      return this.setTitle(value);
    }
  });
  return new view();
});
