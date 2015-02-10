(function() {
  define(['../base/view', './template/app', './template/eni_list'], function(PropertyView, template, list_template) {
    var EniAppView;
    EniAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        if (this.model.isGroupMode) {
          $("#prop-appedit-eni-list").html(list_template(this.model.attributes));
        }
        return this.model.attributes.name;
      }
    });
    return new EniAppView();
  });

}).call(this);
