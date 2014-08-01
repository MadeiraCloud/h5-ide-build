(function() {
  define(['../base/view', './template/app', 'i18n!/nls/lang.js', 'constant', 'Design', 'CloudResources'], function(PropertyView, template, lang, constant, Design, CloudResources) {
    var SubnetGroupView;
    SubnetGroupView = PropertyView.extend({
      render: function() {
        var data, _ref;
        if (!this.appModel) {
          return;
        }
        data = this.appModel.toJSON();
        data.azSb = this.getAzSb();
        data.sbCount = ((_ref = this.appModel.get('Subnets')) != null ? _ref.length : void 0) || 0;
        this.$el.html(template.app(data));
        return this.model.get('name');
      },
      getAzSb: function() {
        var azSb, sbAppResources;
        azSb = {};
        sbAppResources = CloudResources(constant.RESTYPE.SUBNET, Design.instance().region());
        _.each(this.appModel.get('Subnets'), function(sb) {
          var az, sbApp;
          az = sb.SubnetAvailabilityZone.Name;
          sbApp = sbAppResources.get(sb.SubnetIdentifier);
          azSb[az] || (azSb[az] = []);
          return azSb[az].push({
            name: sbApp.get('subnetId'),
            cidr: sbApp.get('cidrBlock')
          });
        });
        azSb = _.map(azSb, function(subnets, az) {
          return {
            az: az,
            subnets: subnets
          };
        });
        return azSb;
      }
    });
    return new SubnetGroupView();
  });

}).call(this);
