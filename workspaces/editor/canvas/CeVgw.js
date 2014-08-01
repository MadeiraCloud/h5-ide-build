(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.VGW,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [8, 8],
      portPosMap: {
        "vgw-tgt": [3, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
        "vgw-vpn": [70, 35, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      sticky: "right",
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/vgw-canvas.png",
          imageX: 10,
          imageY: 16,
          imageW: 60,
          imageH: 46,
          label: m.get("name")
        }).add([
          svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'vgw-tgt',
            'data-tooltip': lang.ide.PORT_TIP_C
          }), svg.use("port_right").attr({
            'class': 'port port-purple tooltip',
            'data-name': 'vgw-vpn',
            'data-tooltip': lang.ide.PORT_TIP_H
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      }
    }, {
      createResource: function(type, attr, option) {
        var vpc;
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        attr.x = vpc.x() + vpc.width() - 4;
        if (attr.y < vpc.y() || attr.y + 8 > vpc.y() + vpc.height()) {
          attr.y = vpc.y() + Math.round(vpc.height() / 2) - 4;
        }
        attr.parent = vpc;
        return CanvasElement.createResource(type, attr, option);
      }
    });
  });

}).call(this);
