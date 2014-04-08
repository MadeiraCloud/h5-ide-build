(function() {
  define(['./template', "event", "constant", "canvas_layout", 'MC.canvas', 'backbone', 'jquery'], function(template, ide_event, constant, canvas_layout) {
    var CanvasView;
    CanvasView = Backbone.View.extend({
      initialize: function() {
        this.template = template();
        this.listenTo(ide_event, 'SWITCH_TAB', function() {
          return canvas_layout.listen();
        });
        return this.listenTo(ide_event, 'UPDATE_RESOURCE_STATE', function() {
          return canvas_layout.listen();
        });
      },
      render: function() {
        console.log('canvas render');
        $('#canvas').html(this.template);
        return ide_event.trigger(ide_event.DESIGN_SUB_COMPLETE);
      },
      reRender: function(template) {
        console.log('re-canvas render');
        if ($("#canvas").is(":empty")) {
          $('#canvas').html(this.template);
        }
        return null;
      }
    });
    return CanvasView;
  });

}).call(this);
