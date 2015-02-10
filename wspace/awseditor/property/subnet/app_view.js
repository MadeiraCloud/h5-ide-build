(function() {
  define(['../base/view', './template/app'], function(PropertyView, template) {
    var SubnetAppView;
    SubnetAppView = PropertyView.extend({
      events: {
        "click .acl-sg-info-list .icon-btn-details": 'showACLDetail'
      },
      render: function() {
        this.$el.html(template(this.model.toJSON()));
        this.setTitle(this.model.get('name'));
        return null;
      },
      showACLDetail: function(event) {
        this.trigger('OPEN_ACL', $(event.currentTarget).data('uid'));
        return null;
      }
    });
    return new SubnetAppView();
  });

}).call(this);
