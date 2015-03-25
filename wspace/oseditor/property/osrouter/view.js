define(['constant', '../OsPropertyView', './template', 'CloudResources'], function(constant, OsPropertyView, template, CloudResources) {
  return OsPropertyView.extend({
    events: {
      "change .selection[data-target]": "updateAttribute"
    },
    render: function() {
      var json, resData, subnets, _ref, _ref1;
      if ((_ref = this.mode()) === 'stack' || _ref === 'appedit') {
        console.log(this.model);
        subnets = this.model.connectionTargets("OsRouterAsso");
        json = this.model.toJSON();
        json.subnets = _.map(subnets, function(e) {
          return e.toJSON();
        });
        if (this.mode() === 'appedit') {
          resData = this.getRenderData();
          if (resData) {
            _.extend(json, resData);
          }
          json.status = resData != null ? (_ref1 = resData.app) != null ? _ref1.status : void 0 : void 0;
        }
        console.log(CloudResources(constant.RESTYPE.OSNETWORK, Design.instance().region()));
        json.extnetworks = CloudResources(constant.RESTYPE.OSNETWORK, Design.instance().region()).getExtNetworks().map(function(nt) {
          return nt.id;
        });
        this.$el.html(template.stackTemplate(json));
      } else {
        this.$el.html(template.appTemplate(this.getRenderData()));
      }
      return this;
    },
    updateAttribute: function(event) {
      var $target, attr, natSelection, value;
      $target = $(event.currentTarget);
      attr = $target.data('target');
      value = $target.getValue();
      if (attr === 'extNetworkId') {
        if (value === "none") {
          value = "";
        }
        natSelection = this.$el.find('.selection[data-target="nat"]');
        if (value) {
          if (!this.model.get(attr)) {
            natSelection.setValue(true);
          }
        } else {
          natSelection.setValue(false);
        }
        this.$el.find('.os-property-router-nat').toggleClass('hide', !value);
      }
      this.model.set(attr, value);
      if (attr === 'name') {
        return this.setTitle(value);
      }
    }
  }, {
    handleTypes: [constant.RESTYPE.OSRT],
    handleModes: ['stack', 'appedit', 'app']
  });
});
