(function() {
  define(['constant', '../OsPropertyView', '../osport/view', './template/stack', 'CloudResources'], function(constant, OsPropertyView, portView, template, CloudResources) {
    return OsPropertyView.extend({
      events: {
        'change .selection[data-target]': 'updateAttribute'
      },
      render: function() {
        var region;
        this.$el.html(template(this.getRenderData()));
        region = Design.instance().region();
        this.$el.append(this.reg(new portView({
          model: this.model,
          appModel: CloudResources(constant.RESTYPE.OSPORT, region).get(this.model.get('portId'))
        })).render().el);
        return this;
      },
      getModelForUpdateAttr: function(e) {
        var $target, dataModel;
        $target = $(e.currentTarget);
        dataModel = $target.closest('[data-model]').data('model');
        if (dataModel === 'listener') {
          return this.model;
        } else {
          return null;
        }
      }
    }, {
      handleTypes: [constant.RESTYPE.OSLISTENER],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);
