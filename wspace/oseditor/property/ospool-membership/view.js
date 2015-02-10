(function() {
  define(['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        var memberName, poolName;
        poolName = this.model.getTarget(constant.RESTYPE.OSPOOL).get('name');
        memberName = this.model.getOtherTarget(constant.RESTYPE.OSPOOL).get('name');
        this.$el.html(template({
          poolName: poolName,
          memberName: memberName
        }));
        return this;
      }
    }, {
      handleTypes: ['OsPoolMembership'],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);
