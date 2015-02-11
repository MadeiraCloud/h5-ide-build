(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: constant.RESTYPE.OSPOOL,
      parentType: [constant.RESTYPE.OSSUBNET],
      defaultSize: [8, 8],
      portPosMap: {
        "pool-left": [0, 40, CanvasElement.constant.PORT_LEFT_ANGLE],
        "pool-right": [80, 40, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "elb-left": [0, 60, CanvasElement.constant.PORT_LEFT_ANGLE],
        "elb-right": [80, 60, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      portDirMap: {
        "elb": "horizontal",
        "pool": "horizontal"
      },
      isPortSignificant: function() {
        return true;
      },
      labelWidth: function() {
        return 100;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createRawNode().add([
          svg.use("os_pool"), this.createPortElement().attr({
            'class': 'port port-blue tooltip',
            'data-name': 'pool',
            'data-alias': 'pool-left',
            'data-tooltip': lang.IDE.PORT_TIP_R
          }), this.createPortElement().attr({
            'class': 'port port-blue tooltip',
            'data-name': 'pool',
            'data-alias': 'pool-right',
            'data-tooltip': lang.IDE.PORT_TIP_R
          }), this.createPortElement().attr({
            'class': 'port port-green tooltip',
            'data-name': 'elb',
            'data-alias': 'elb-left',
            'data-tooltip': lang.IDE.PORT_TIP_Q
          }), this.createPortElement().attr({
            'class': 'port port-green tooltip',
            'data-name': 'elb',
            'data-alias': 'elb-right',
            'data-tooltip': lang.IDE.PORT_TIP_Q
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children(".node-label"));
      }
    });
  });

}).call(this);
