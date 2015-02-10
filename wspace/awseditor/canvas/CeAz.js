(function() {
  define(["CanvasElement", "constant", "CanvasManager", "CanvasView"], function(CanvasElement, constant, CanvasManager, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                    env:dev:end */
      type: constant.RESTYPE.AZ,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [23, 23],
      create: function() {
        return this.canvas.appendAz(this.createGroup());
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.update(this.$el.children("text"), m.get("name"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      }
    }, {
      createResource: function(type, attr, option) {
        var azModel;
        attr.width = 21;
        attr.height = 21;
        azModel = CanvasElement.createResource(type, attr, option);
        return CanvasElement.createResource(constant.RESTYPE.SUBNET, {
          x: attr.x + 2,
          y: attr.y + 2,
          width: attr.width - 4,
          height: attr.height - 4,
          parent: azModel
        }, option);
      }
    });
  });

}).call(this);
