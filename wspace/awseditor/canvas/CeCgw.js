(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
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
          image: "ide/icon/cvs-cgw.png",
          imageX: 13,
          imageY: 8,
          imageW: 151,
          imageH: 76
        }).add([
          svg.text("").move(90, 95).classes('node-label'), svg.use("port_right").attr({
            'class': 'port port-purple tooltip',
            'data-name': 'cgw-vpn',
            'data-tooltip': lang.IDE.PORT_TIP_I
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      labelWidth: function(width) {
        return CanvasElement.prototype.labelWidth.call(this, width) - 4;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children(".node-label"));
      }
    });
  });

}).call(this);
