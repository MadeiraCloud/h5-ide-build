(function() {
  define(['../base/view', './template/app', 'og_manage_app', 'constant'], function(PropertyView, template, ogManageApp, constant) {
    var CGWAppView;
    CGWAppView = PropertyView.extend({
      events: {
        'click .db-og-in-app': 'openOgModal'
      },
      openOgModal: function() {
        var ogModel;
        ogModel = this.resModel.connectionTargets('OgUsage')[0];
        return new ogManageApp({
          model: ogModel
        });
      },
      render: function() {
        var data;
        data = this.model ? this.model.toJSON() : this.view.resModel.serialize().component.resource;
        if (!data.Endpoint) {
          data = this.resModel.serialize().component.resource;
          data.DBSubnetGroup.DBSubnetGroupName = Design.instance().component(data.DBSubnetGroup.DBSubnetGroupName.split(".")[0].split("{").pop()).serialize().component.resource.DBSubnetGroupName;
        }
        data.optionGroups = _.map(data.OptionGroupMemberships, function(ogm) {
          var ogComp;
          ogComp = Design.modelClassForType(constant.RESTYPE.DBOG).findWhere({
            appId: ogm.OptionGroupName
          });
          return _.extend({}, ogm, {
            isDefault: !ogComp,
            uid: (ogComp != null ? ogComp.id : void 0) || ''
          });
        });
        this.$el.html(template.appView(data));
        return this.resModel.get('name');
      }
    });
    return new CGWAppView();
  });

}).call(this);
