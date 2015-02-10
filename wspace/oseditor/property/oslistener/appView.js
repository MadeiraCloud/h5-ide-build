(function() {
  define(['constant', '../OsPropertyView', '../osport/view', './template/app', 'CloudResources'], function(constant, OsPropertyView, portView, template, CloudResources) {
    return OsPropertyView.extend({
      render: function() {
        this.$el.html(template(this.getRenderData()));
        this.$el.append(this.reg(new portView({
          model: this.model,
          appModel: this.genModelForPort()
        })).render().el);
        return this;
      },
      genModelForPort: function() {
        var portId, region;
        region = Design.instance().region();
        portId = this.appModel.get('port_id');
        return CloudResources(constant.RESTYPE.OSPORT, region).get(portId);
      }
    }, {
      handleTypes: [constant.RESTYPE.OSLISTENER],
      handleModes: ['app']
    });
  });

}).call(this);
