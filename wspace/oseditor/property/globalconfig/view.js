define(['constant', '../OsPropertyView', './stack', './app', '../ossglist/view'], function(constant, OsPropertyView, TplStack, TplApp, SgListView) {
  return OsPropertyView.extend({
    events: {
      'change .selection[data-target]': 'updateAttribute'
    },
    initialize: function() {
      this.sgListView = this.reg(new SgListView({
        targetModel: null
      }));
    },
    render: function() {
      var template;
      template = (function() {
        switch (false) {
          case this.mode() !== 'app':
            return TplApp;
          default:
            return TplStack;
        }
      }).call(this);
      this.$el.html(template(this.getRenderData()));
      this.$el.append(this.sgListView.render().el);
      return this;
    },
    mode: function() {
      var mod;
      mod = Design.instance().mode();
      return mod;
    },
    getTitle: function() {
      var _ref;
      if ((_ref = this.mode()) === 'app' || _ref === 'appedit') {
        return 'App Property';
      } else {
        return 'Stack Property';
      }
    }
  }, {
    handleTypes: ['globalconfig'],
    handleModes: ['stack', 'app', 'appedit']
  });
});
