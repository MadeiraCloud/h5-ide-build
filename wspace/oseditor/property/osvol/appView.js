define(['constant', '../OsPropertyView', './template', 'CloudResources'], function(constant, OsPropertyView, template, CloudResources) {
  return OsPropertyView.extend({
    render: function() {
      this.$el.html(template.appTemplate(this.getRenderData()));
      return this;
    }
  }, {
    handleTypes: [constant.RESTYPE.OSVOL],
    handleModes: ['app']
  });
});
