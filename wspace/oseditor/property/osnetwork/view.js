define(['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
  return OsPropertyView.extend({
    render: function() {
      this.$el.html(template(this.getRenderData()));
      return this;
    }
  }, {
    handleTypes: [constant.RESTYPE.OSNETWORK],
    handleModes: ['stack', 'app', 'appedit']
  });
});
