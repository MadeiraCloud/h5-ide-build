(function() {
  define(['../base/view', './template/stack'], function(PropertyView, template) {
    var AZView;
    AZView = PropertyView.extend({
      events: {
        'OPTION_CHANGE #az-quick-select': "azSelect"
      },
      render: function() {
        var data;
        if (this.isAppEdit) {
          data = {
            appEdit: true
          };
        } else {
          data = this.model.attributes;
        }
        this.$el.html(template(data));
        return "Availability Zone";
      },
      azSelect: function(event, newAZName) {
        this.model.setName(newAZName);
      }
    });
    return new AZView();
  });

}).call(this);
