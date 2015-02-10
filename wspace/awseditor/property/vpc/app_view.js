(function() {
  define(['../base/view', './template/app'], function(PropertyView, template) {
    var VPCAppView;
    VPCAppView = PropertyView.extend({
      render: function() {
        var data;
        data = this.model.attributes;
        if (data.dhcpOptionsId === 'default') {
          data.defaultDhcp = true;
          data.autoDhcp = false;
        } else if (!data.dhcpOptionsId || !data.dhcp) {
          data.autoDhcp = true;
          data.defaultDhcp = false;
        } else if (data.dhcpOptionsId[0] !== "@") {
          data.autoDhcp = false;
          data.defaultDhcp = false;
        }
        this.$el.html(template(data));
        return this.model.attributes.name;
      }
    });
    return new VPCAppView();
  });

}).call(this);
