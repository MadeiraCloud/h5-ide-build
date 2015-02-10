(function() {
  define(['../base/model', "Design"], function(PropertyModel, Design) {
    var SGRuleModel;
    SGRuleModel = PropertyModel.extend({
      init: function(line_id) {
        var SgRuleSetModel, allRuleSets, connection;
        connection = Design.instance().component(line_id);
        if (!connection) {
          return;
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        allRuleSets = SgRuleSetModel.getRelatedSgRuleSets(connection.port1Comp(), connection.port2Comp());
        this.set({
          uid: line_id,
          groups: SgRuleSetModel.getGroupedObjFromRuleSets(allRuleSets),
          readOnly: this.isApp
        });
        return null;
      }
    });
    return new SGRuleModel();
  });

}).call(this);
