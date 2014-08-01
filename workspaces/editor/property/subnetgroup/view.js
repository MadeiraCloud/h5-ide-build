(function() {
  define(['../base/view', './template/stack', 'i18n!/nls/lang.js', 'constant', 'Design', "component/dbsbgroup/DbSubnetGPopup"], function(PropertyView, template, lang, constant, Design, DbSubnetGPopup) {
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
        if ($target.parsley('validate')) {
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
        new DbSubnetGPopup({
          model: this.model
        });
        return false;
      },
      render: function() {
        var data;
        data = this.model.toJSON();
        data.azSb = this.getAzSb();
        data.sbCount = this.model.connectionTargets("SubnetgAsso").length;
        this.$el.html(template(data));
        return this.model.get('name');
      },
      getAzSb: function() {
        var sbs;
        sbs = _.map(Design.modelClassForType(constant.RESTYPE.SUBNET).allObjects(), function(sb) {
          return {
            name: sb.get("name"),
            cidr: sb.get("cidr"),
            az: sb.parent().get("name")
          };
        });
        return _.groupBy(sbs, "az");
      }
    });
    return new SubnetGroupView();
  });

}).call(this);
