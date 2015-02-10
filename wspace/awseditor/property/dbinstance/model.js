(function() {
  define(['../base/model', 'constant', 'event', 'i18n!/nls/lang.js'], function(PropertyModel, constant, ide_event, lang) {
    var DBInstanceModel;
    DBInstanceModel = PropertyModel.extend({
      init: function(uid) {
        var attr, component;
        component = Design.instance().component(uid);
        attr = component != null ? component.toJSON() : void 0;
        attr.uid = uid;
        this.set(attr);
        return null;
      }
    });
    return new DBInstanceModel();
  });

}).call(this);
