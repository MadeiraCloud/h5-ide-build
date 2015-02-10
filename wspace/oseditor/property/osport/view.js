(function() {
  define(['constant', '../OsPropertyView', './template', 'CloudResources', '../ossglist/view'], function(constant, OsPropertyView, template, CloudResources, SgListView) {
    return OsPropertyView.extend({
      events: {
        "change .selection[data-target]": "updateAttribute"
      },
      initialize: function() {
        this.sgListView = this.reg(new SgListView({
          targetModel: this.model
        }));
        return this.listenTo(this.model, 'change:fip', this.render);
      },
      render: function() {
        var extendData, floatIPData, floatIPModel, float_ip, value, _ref;
        if ((_ref = this.mode()) === 'stack' || _ref === 'appedit') {
          if (this.model.isAttached()) {
            value = _.extend({
              hasFloatIP: this.model.getFloatingIp(),
              isPurePort: this.model.type === constant.RESTYPE.OSPORT
            }, this.model.toJSON());
            if (this.mode() === 'appedit') {
              value = _.extend(value, this.getRenderData());
            }
            this.$el.html(template.stack(value));
          } else {
            this.$el.html(template.unattached(value));
          }
        } else {
          extendData = {};
          floatIPModel = this.model.getFloatingIp();
          if (floatIPModel) {
            floatIPData = CloudResources(constant.RESTYPE.OSFIP, Design.instance().region()).get(floatIPModel.get('appId'));
            if (floatIPData) {
              float_ip = floatIPData.get('floating_ip_address');
            }
            extendData.float_ip = float_ip;
          }
          this.$el.html(template.app(_.extend(this.getRenderData(), extendData)));
        }
        if (this.model.isAttached()) {
          this.$el.append(this.sgListView.render().el);
        }
        return this;
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
        if (attr === 'float_ip') {
          this.model.setFloatingIp(value);
        } else {
          this.model.set(attr, value);
        }
        if (attr === 'name') {
          return this.setTitle(value);
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSPORT],
      handleModes: ['stack', 'app', 'appedit']
    });
  });

}).call(this);
