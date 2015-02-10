(function() {
  define(['../base/view', './template/app'], function(PropertyView, template) {
    var CGWAppView;
    CGWAppView = PropertyView.extend({
      events: {
        'change #property-res-desc': 'onChangeDescription',
        "change #property-cgw-name": 'onChangeName'
      },
      render: function() {
        var _ref;
        this.$el.html(template(_.extend({
          isEditable: this.model.isAppEdit
        }, (_ref = this.model) != null ? _ref.toJSON() : void 0)));
        return this.model.get('id');
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Customer Gateway")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      onChangeDescription: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      }
    });
    return new CGWAppView();
  });

}).call(this);
