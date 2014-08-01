(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "Design"], function(CanvasElement, constant, CanvasManager, lang, Design) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.IGW,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [8, 8],
      portPosMap: {
        "igw-tgt": [78, 35, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      sticky: "left",
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/igw-canvas.png",
          imageX: 10,
          imageY: 16,
          imageW: 60,
          imageH: 46,
          label: m.get("name")
        }).add(svg.use("port_left").attr({
          'class': 'port port-blue tooltip',
          'data-name': 'igw-tgt',
          'data-tooltip': lang.ide.PORT_TIP_C
        }));
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      }
    });
  });

}).call(this);
