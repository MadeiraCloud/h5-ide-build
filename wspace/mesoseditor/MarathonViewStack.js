define(["CoreEditorView", "./subviews/PropertyPanel", "./subviews/Toolbar", "./subviews/ResourcePanel", "./canvas/CanvasViewMarathon", "event"], function(CoreEditorView, PropertyPanel, Toolbar, ResourcePanel, CanvasView, ide_event) {
  return CoreEditorView.extend({
    constructor: function(options) {
      _.extend(options, {
        TopPanel: Toolbar,
        RightPanel: PropertyPanel,
        LeftPanel: ResourcePanel,
        CanvasView: CanvasView
      });
      CoreEditorView.apply(this, arguments);
      this.$el.find(".OEPanelBottom").remove();
    },
    showProperty: function() {
      ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
    },
    onItemSelected: function(type, id) {
      ide_event.trigger(ide_event.OPEN_PROPERTY, type, id);
    },
    showStateEditor: function() {}
  });
});
