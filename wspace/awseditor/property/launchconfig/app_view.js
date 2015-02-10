(function() {
  define(['../base/view', './template/app'], function(PropertyView, template) {
    var LCAppView;
    LCAppView = PropertyView.extend({
      events: {
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-user-data': 'userdataChange',
        'change #property-res-desc': 'onChangeDescription',
        'change .launch-configuration-name': 'lcNameChange'
      },
      kpModalClosed: false,
      render: function() {
        var data;
        data = _.extend({
          isEditable: this.model.isAppEdit
        }, this.model.toJSON());
        this.$el.html(template(data));
        return data.name;
      },
      onChangeDescription: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      lcNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "LaunchConfiguration")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      cloudwatchSelect: function(event) {
        this.model.setCloudWatch(event.target.checked);
        return $("#property-cloudwatch-warn").toggle($("#property-instance-enable-cloudwatch").is(":checked"));
      },
      userdataChange: function(event) {
        return this.model.setUserData(event.target.value);
      },
      elbNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Launch Configuration")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      }
    });
    return new LCAppView();
  });

}).call(this);
