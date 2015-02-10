(function() {
  define(['../base/view', './template/app'], function(PropertyView, template) {
    var ElbAppView;
    ElbAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new ElbAppView();
  });

}).call(this);
