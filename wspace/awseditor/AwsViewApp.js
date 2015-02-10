(function() {
  define(["CoreEditorViewApp", "./subviews/ResourcePanel", "./subviews/PropertyPanel", "./subviews/Toolbar", "./subviews/Statusbar", "./canvas/CanvasViewAws", "event"], function(CoreEditorViewApp, ResourcePanel, PropertyPanel, Toolbar, Statusbar, CanvasView, ide_event) {
    return CoreEditorViewApp.extend({
      constructor: function(options) {
        _.extend(options, {
          TopPanel: Toolbar,
          RightPanel: PropertyPanel,
          LeftPanel: ResourcePanel,
          BottomPanel: Statusbar,
          CanvasView: CanvasView
        });
        return CoreEditorViewApp.apply(this, arguments);
      },
      showProperty: function() {
        ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
      },
      onItemSelected: function(type, id) {
        ide_event.trigger(ide_event.OPEN_PROPERTY, type, id);
      },
      showStateEditor: function() {
        var com;
        com = this.workspace.getSelectedComponent();
        if (com) {
          ide_event.trigger(ide_event.SHOW_STATE_EDITOR, com.id);
        }
      }
    });
  });

}).call(this);
