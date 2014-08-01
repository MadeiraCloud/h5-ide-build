(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "./CanvasView"], function(CanvasElement, constant, CanvasManager, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.VPC,
      parentType: ["SVG"],
      listenModelEvents: function() {
        this.listenTo(this.model, "change:cidr", this.render);
      },
      create: function() {
        return this.canvas.appendVpc(this.createGroup());
      },
      siblings: function() {
        var canvas;
        canvas = this.canvas;
        return canvas.design.componentsOfType(constant.RESTYPE.CGW).map(function(m) {
          return canvas.getItem(m.id);
        });
      },
      render: function() {
        var m;
        m = this.model;
        this.$el.children("text").text("" + (m.get('name')) + " (" + (m.get('cidr')) + ")");
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      }
    });
  });

}).call(this);
