(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CanvasView"], function(CanvasElement, constant, CanvasManager, lang, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                        env:dev:end */
      type: constant.RESTYPE.SUBNET,
      parentType: [constant.RESTYPE.AZ],
      defaultSize: [19, 19],
      portPosition: function(portName, isAtomic) {
        var m, portY, x;
        m = this.model;
        portY = m.height() * CanvasView.GRID_HEIGHT / 2 - 5;
        if (portName === "subnet-assoc-in") {
          return [-12, portY, CanvasElement.constant.PORT_LEFT_ANGLE];
        } else {
          x = m.width() * CanvasView.GRID_WIDTH + 4;
          if (isAtomic) {
            x += 8;
          }
          return [x, portY, CanvasElement.constant.PORT_RIGHT_ANGLE];
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:cidr", this.render);
      },
      create: function() {
        var m, svg, svgEl;
        svg = this.canvas.svg;
        svgEl = this.canvas.appendSubnet(this.createGroup());
        svgEl.add([
          svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'subnet-assoc-in',
            'data-tooltip': lang.IDE.PORT_TIP_L
          }), svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'subnet-assoc-out',
            'data-tooltip': lang.IDE.PORT_TIP_M
          })
        ]);
        m = this.model;
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      label: function() {
        return "" + (this.model.get('name')) + " (" + (this.model.get('cidr')) + ")";
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      },
      containPoint: function(px, py) {
        var size, x, y;
        x = this.model.x() - 2;
        y = this.model.y();
        size = this.size();
        return x <= px && y <= py && x + size.width + 4 >= px && y + size.height >= py;
      }
    });
  });

}).call(this);
