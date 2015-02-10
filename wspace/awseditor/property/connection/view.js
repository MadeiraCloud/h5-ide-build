(function() {
  define(['../base/view', './template/stack'], function(PropertyView, template) {
    var ConnectionView;
    ConnectionView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new ConnectionView();
  });

}).call(this);
