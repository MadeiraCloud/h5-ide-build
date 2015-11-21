define(['constant', '../OsPropertyView', './stack', './app', 'CloudResources', 'UI.selection', '../validation/ValidationBase'], function(constant, OsPropertyView, TplStack, TplApp, CloudResources, bindSelection, ValidationBase) {
  return OsPropertyView.extend({
    events: {
      "change .selection[data-target]": "updateAttribute"
    },
    initialize: function(options) {
      this.isApp = options.isApp;
      if (this.isApp) {
        this.modelData = options.modelData;
      }
    },
    setTitle: function(title) {
      return this.$('h1').text(title);
    },
    toggleUrlAndCodes: function() {
      var type, visible, _ref;
      type = (_ref = this.model) != null ? _ref.get('type') : void 0;
      visible = type === 'PING' || type === 'TCP' ? false : true;
      this.$('[data-id="hm-urlpath"]').closest('section').toggle(visible);
      return this.$('[data-id="hm-expectedcodes"]').closest('section').toggle(visible);
    },
    updateAttribute: function(e) {
      var $target, target;
      $target = $(e.currentTarget);
      target = $target.data('target');
      OsPropertyView.prototype.updateAttribute.call(this, e);
      if (target === 'type') {
        return this.toggleUrlAndCodes();
      }
    },
    render: function() {
      var HmValid;
      if (this.isApp) {
        this.$el.html(TplApp(this.modelData));
      } else {
        HmValid = ValidationBase.getClass(constant.RESTYPE.OSHM);
        bindSelection(this.$el, this.selectTpl, new HmValid({
          model: this.model
        }));
        this.$el.html(TplStack(this.getRenderData()));
      }
      if (!this.isApp) {
        this.toggleUrlAndCodes();
      }
      return this;
    }
  }, {
    handleTypes: [constant.RESTYPE.OSHM],
    handleModes: ['stack', 'appedit']
  });
});
