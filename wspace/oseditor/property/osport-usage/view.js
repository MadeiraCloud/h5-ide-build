define(['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
  return OsPropertyView.extend({
    render: function() {
      var namePort1, namePort2;
      namePort1 = this.model.getTarget(constant.RESTYPE.OSSERVER).get('name');
      namePort2 = this.model.getTarget(constant.RESTYPE.OSPORT).get('name');
      this.$el.html(template({
        namePort1: namePort1,
        namePort2: namePort2
      }));
      return this;
    }
  }, {
    handleTypes: ['OsPortUsage'],
    handleModes: ['stack', 'app', 'appedit']
  });
});
