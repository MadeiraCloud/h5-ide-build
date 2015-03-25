define(["CoreEditorViewApp", "./template/TplOsEditor", "./subviews/Panel", "./subviews/Toolbar", "./subviews/Statusbar", "./canvas/CanvasViewOs"], function(CoreEditorViewApp, TplOsEditor, RightPanel, Toolbar, Statusbar, CanvasView) {
  return CoreEditorViewApp.extend({
    template: TplOsEditor,
    constructor: function(options) {
      _.extend(options, {
        TopPanel: Toolbar,
        RightPanel: RightPanel,
        BottomPanel: Statusbar,
        CanvasView: CanvasView
      });
      return CoreEditorViewApp.apply(this, arguments);
    },
    initialize: function() {
      this.panel = this.propertyPanel;
      this.$el.addClass("openstack").find(".OEPanelLeft").addClass("force-hidden");
      CoreEditorViewApp.prototype.initialize.apply(this, arguments);
    },
    switchMode: function(mode) {
      this.toolbar.updateTbBtns();
      this.statusbar.update();
      this.propertyPanel.openCurrent();
    },
    showProperty: function() {
      this.panel.show().openProperty();
      return false;
    },
    showResource: function() {
      if (this.workspace.design.modeIsAppEdit()) {
        this.panel.show().openResource();
      }
      return false;
    },
    showGlobal: function() {
      this.panel.show().openConfig();
      return false;
    },
    showStateEditor: function() {
      this.panel.show().openState();
      return false;
    },
    onCanvasDoubleClick: function() {
      return this.panel.show().openCurrent();
    },
    onItemSelected: function(type, id) {
      if (!id && !type) {
        this.panel.openConfig({
          uid: '',
          type: 'default'
        });
        return;
      }
      return this.panel.openProperty({
        uid: id,
        type: type
      });
    }
  });
});
