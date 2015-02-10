(function() {
  define(['../base/view', './template/app'], function(PropertyView, template) {
    var RtbAppView;
    RtbAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new RtbAppView();
  });

}).call(this);
