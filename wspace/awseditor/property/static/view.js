(function() {
  define(['../base/view', './template/stack'], function(PropertyView, template) {
    var StaticView;
    StaticView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        if (this.model.get("isIGW")) {
          return "Internet-gateway";
        } else {
          return "VPN-gateway";
        }
      }
    });
    return new StaticView();
  });

}).call(this);
