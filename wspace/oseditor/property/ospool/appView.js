define(['constant', '../OsPropertyView', '../osport/view', '../oshmlist/view', './template/app', 'CloudResources'], function(constant, OsPropertyView, PortView, HmlistView, template, CloudResources) {
  return OsPropertyView.extend({
    initialize: function() {
      var region, _ref;
      region = Design.instance().region();
      this.hmList = _.map((_ref = this.appModel) != null ? _ref.get('health_monitors') : void 0, function(id) {
        return CloudResources(constant.RESTYPE.OSHM, region).get(id);
      });
      this.hmlistView = this.reg(new HmlistView({
        targetModel: this.hmList,
        isApp: true
      }));
    },
    render: function() {
      this.$el.html(template(this.getRenderData()));
      this.renderHmlist();
      return this;
    },
    getModelJson: function() {
      var PortClass, appJson, _ref;
      appJson = ((_ref = this.appModel) != null ? _ref.toJSON() : void 0) || {};
      appJson = $.extend(true, {}, appJson);
      PortClass = Design.modelClassForType(constant.RESTYPE.OSPORT);
      _.each(appJson.members, function(m) {
        var osport;
        osport = PortClass.find(function(port) {
          return port.get('ip') === m.address;
        });
        if (!osport) {
          return;
        }
        m.name = osport.isEmbedded() ? osport.owner().get('name') : osport.get('name');
        return null;
      });
      return appJson;
    },
    renderHmlist: function() {
      return this.$('.pool-details').after(this.hmlistView.render().el);
    }
  }, {
    handleTypes: [constant.RESTYPE.OSPOOL],
    handleModes: ['app']
  });
});
