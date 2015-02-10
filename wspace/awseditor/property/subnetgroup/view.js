(function() {
  define(['../base/view', './template/stack', 'i18n!/nls/lang.js', 'constant', 'Design', "DbSubnetGPopup"], function(PropertyView, template, lang, constant, Design, DbSubnetGPopup) {
    var SubnetGroupView;
    SubnetGroupView = PropertyView.extend({
      events: {
        'change #property-subnet-name': 'setName',
        'change #property-subnet-desc': 'setDesc',
        "click .icon-edit": "editSgb"
      },
      setName: function(e) {
        var $target;
        $target = $(e.currentTarget);
        if ($target.parsley('validate') && MC.aws.aws.checkResName(this.model.get('id'), $target, "Subnet Group")) {
          return this.model.set('name', $target.val());
        }
      },
      setDesc: function(e) {
        var $target;
        $target = $(e.currentTarget);
        if ($target.parsley('validate')) {
          return this.model.set('description', $target.val());
        }
      },
      editSgb: function() {
        var subnetGPopup, that;
        that = this;
        subnetGPopup = new DbSubnetGPopup({
          model: this.model
        });
        this.listenTo(subnetGPopup, 'update', function() {
          that.render();
          this.stopListening(subnetGPopup);
          return subnetGPopup.remove();
        });
        return false;
      },
      render: function() {
        var data, subnets;
        subnets = this.model.connectionTargets("SubnetgAsso").map(function(sb) {
          return {
            name: sb.get("name"),
            cidr: sb.get("cidr"),
            az: sb.parent().get("name")
          };
        });
        data = this.model.toJSON();
        data.sbCount = subnets.length;
        data.azSb = _.groupBy(subnets, "az");
        data.isAppEdit = this.isAppEdit;
        this.$el.html(template(data));
        return this.model.get('name');
      }
    });
    return new SubnetGroupView();
  });

}).call(this);
