(function() {
  define(['../base/view', './template/stack', "SGRulePopup"], function(PropertyView, template, SGRulePopup) {
    var SgRuleView;
    SgRuleView = PropertyView.extend({
      events: {
        "click #sg-edit-rule-button": "onEditRule"
      },
      render: function() {
        var group, _i, _len, _ref;
        _ref = this.model.attributes.groups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          group = _ref[_i];
          group.ruleListTpl = MC.template.sgRuleList(group.rules);
        }
        this.$el.html(template(this.model.attributes));
        return "Security Group Rule";
      },
      onEditRule: function(event) {
        new SGRulePopup(this.model.get("uid"));
        return false;
      }
    });
    return new SgRuleView();
  });

}).call(this);
