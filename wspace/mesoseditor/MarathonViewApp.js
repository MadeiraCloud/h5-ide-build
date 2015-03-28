define(["CoreEditorViewApp", "./subviews/ResourcePanel", "./subviews/PropertyPanel", "./subviews/Toolbar", "./canvas/CanvasViewMarathon", "event"], function(CoreEditorViewApp, ResourcePanel, PropertyPanel, Toolbar, CanvasView, ide_event) {
  return CoreEditorViewApp.extend({
    constructor: function(options) {
      _.extend(options, {
        TopPanel: Toolbar,
        RightPanel: PropertyPanel,
        LeftPanel: ResourcePanel,
        CanvasView: CanvasView
      });
      CoreEditorViewApp.apply(this, arguments);
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
