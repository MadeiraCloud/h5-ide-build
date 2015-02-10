(function() {
  define(["CoreEditorView", "./template/TplOsEditor", "./subviews/Panel", "./subviews/Toolbar", "./subviews/Statusbar", "./canvas/CanvasViewOs"], function(CoreEditorView, TplOsEditor, RightPanel, Toolbar, Statusbar, CanvasView) {
    return CoreEditorView.extend({
      template: TplOsEditor,
      constructor: function(options) {
        _.extend(options, {
          TopPanel: Toolbar,
          RightPanel: RightPanel,
          BottomPanel: Statusbar,
          CanvasView: CanvasView
        });
        return CoreEditorView.apply(this, arguments);
      },
      initialize: function() {
        this.panel = this.propertyPanel;
        this.$el.addClass("openstack").find(".OEPanelLeft").addClass("force-hidden");
      },
      showProperty: function() {
        this.panel.show().openProperty();
        return false;
      },
      showResource: function() {
        this.panel.show().openResource();
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

}).call(this);
