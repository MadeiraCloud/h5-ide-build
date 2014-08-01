(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.CGW,
      parentType: ["SVG"],
      defaultSize: [17, 10],
      portPosMap: {
        "cgw-vpn": [6, 45, CanvasElement.constant.PORT_LEFT_ANGLE]
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cgw-canvas.png",
          imageX: 13,
          imageY: 8,
          imageW: 151,
          imageH: 76
        }).add([
          svg.text("").move(100, 95).classes('node-label'), svg.use("port_right").attr({
            'class': 'port port-purple tooltip',
            'data-name': 'cgw-vpn',
            'data-tooltip': lang.ide.PORT_TIP_I
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        return CanvasManager.update(this.$el.children(".node-label"), this.model.get("name"));
      }
    });
  });

}).call(this);
