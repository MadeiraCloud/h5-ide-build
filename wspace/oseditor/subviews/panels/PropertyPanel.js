define(['backbone', 'constant', 'Design', 'CloudResources', '../../property/OsPropertyView', '../../property/OsPropertyBundle', '../../property/validation/ValidationBase', '../../property/validation/ValidationBundle', './template/TplPropertyPanel', 'UI.selection', 'ConnectionModel'], function(Backbone, constant, Design, CloudResources, OsPropertyView, OsPropertyBundle, ValidationBase, ValidationBundle, PropertyPanelTpl, bindSelection, ConnectionModel) {
  return Backbone.View.extend({
    initialize: function(options) {
      var region, _ref, _ref1, _ref2, _ref3, _ref4;
      region = options.workspace.design.region();
      this.options = options;
      this.uid = options.uid;
      this.type = options.type;
      this.panel = options.panel;
      this.model = Design.instance().component(this.uid);
      this.mode = options.workspace.design.mode();
      if (this.mode === 'appedit' && !((_ref = this.model) != null ? _ref.get('appId') : void 0)) {
        this.mode = 'stack';
      }
      if (this.model && ((_ref1 = this.mode) === 'app' || _ref1 === 'appedit') && ((_ref2 = this.model) != null ? _ref2.get('appId') : void 0)) {
        this.appModel = (_ref3 = CloudResources(this.type, region)) != null ? _ref3.get((_ref4 = this.model) != null ? _ref4.get('appId') : void 0) : void 0;
      }
      if (this.model) {
        this.viewClass = OsPropertyView.getClass(this.mode, this.type);
      }
      if (this.viewClass == null) {
        this.viewClass = OsPropertyView.getClass(this.mode, 'default');
      }
      this.validationClass = ValidationBase.getClass(this.type);
    },
    resourceInexist: function() {
      if (this.mode === 'stack') {
        return false;
      }
      if (this.appModel) {
        return false;
      }
      if (this.model instanceof ConnectionModel) {
        return false;
      }
      return true;
    },
    render: function() {
      var classOptions, design, propertyView, validationInstance, _ref;
      design = this.options.workspace.design;
      classOptions = {
        model: this.model,
        appModel: this.appModel || null,
        propertyPanel: this,
        panel: this.panel,
        workspace: this.options.workspace
      };
      propertyView = this.propertyView = new this.viewClass(classOptions);
      if (this.validationClass) {
        validationInstance = new this.validationClass(classOptions);
      } else {
        validationInstance = null;
      }
      bindSelection(this.$el, propertyView.selectTpl, _.extend({
        view: propertyView
      }, validationInstance));
      this.setTitle();
      if (this.resourceInexist()) {
        this.$el.append(PropertyPanelTpl.empty());
      } else {
        this.$el.append(propertyView.render().el);
      }
      if ((_ref = this.panel.parent) != null) {
        _ref.$el.attr('data-mode', this.mode);
      }
      return this;
    },
    setTitle: function(title) {
      var $title;
      if (title == null) {
        title = this.propertyView.getTitle();
      }
      if (!title) {
        return;
      }
      $title = this.$('h1.title');
      if ($title.size()) {
        return $title.eq(0).text(title);
      } else {
        return this.$el.html(PropertyPanelTpl.title({
          title: title
        }));
      }
    },
    showFloatPanel: function() {
      return this.panel.showFloatPanel.apply(this.panel, arguments);
    },
    hideFloatPanel: function() {
      return this.panel.hideFloatPanel.apply(this.panel, arguments);
    },
    remove: function() {
      var _ref;
      if (this.propertyView && this.propertyView.selectTpl) {
        bindSelection.unbind(this.$el, this.propertyView.selectTpl);
      }
      if ((_ref = this.propertyView) != null) {
        _ref.remove();
      }
      return Backbone.View.prototype.remove.apply(this, arguments);
    }
  });
});
