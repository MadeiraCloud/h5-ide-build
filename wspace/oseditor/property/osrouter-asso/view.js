define(['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
  return OsPropertyView.extend({
    render: function() {
      var namePort1, namePort2;
      namePort1 = this.model.getTarget(constant.RESTYPE.OSSUBNET).get('name');
      namePort2 = this.model.getTarget(constant.RESTYPE.OSRT).get('name');
      this.$el.html(template({
        namePort1: namePort1,
        namePort2: namePort2
      }));
      return this;
    }
  }, {
    handleTypes: ['OsRouterAsso'],
    handleModes: ['stack', 'app', 'appedit']
  });
});
