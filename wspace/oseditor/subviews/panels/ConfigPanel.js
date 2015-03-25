define(['backbone', 'constant', './PropertyPanel', '../../property/OsPropertyView'], function(Backbone, constant, PropertyPanel, OsPropertyView) {
  return PropertyPanel.extend({
    initialize: function(options) {
      PropertyPanel.prototype.initialize.call(this, options);
      this.type = 'globalconfig';
      this.model = this.appModel = Design.instance();
      this.viewClass = OsPropertyView.getClass(this.mode, this.type);
    }
  });
});
