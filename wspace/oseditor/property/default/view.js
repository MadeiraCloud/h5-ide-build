(function() {
  define(['constant', '../OsPropertyView', './template'], function(constant, OsPropertyView, template) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template({}));
        return this;
      }
    }, {
      handleTypes: ['default'],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);
