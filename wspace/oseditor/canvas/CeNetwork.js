(function() {
  define(["CanvasElement", "constant", "CanvasManager", "CanvasView"], function(CanvasElement, constant, CanvasManager, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                             env:dev:end */
      type: constant.RESTYPE.OSNETWORK,
      parentType: ["SVG"],
      defaultSize: [60, 60],
      create: function() {
        return this.canvas.appendNetwork(this.createGroup());
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      }
    });
  });

}).call(this);
