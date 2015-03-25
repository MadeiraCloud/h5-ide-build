define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
  return CanvasElement.extend({

    /* env:dev                                      env:dev:end */
    type: constant.RESTYPE.OSRT,
    parentType: ["SVG"],
    defaultSize: [8, 8],
    portPosMap: {
      "route-left": [0, 40, CanvasElement.constant.PORT_LEFT_ANGLE],
      "route-right": [80, 40, CanvasElement.constant.PORT_RIGHT_ANGLE]
    },
    portDirMap: {
      "route": "horizontal"
    },
    isPortSignificant: function() {
      return true;
    },
    labelWidth: function() {
      return 100;
    },
    iconUrl: function() {
      return "ide/icon/openstack/cvs-router.png";
    },
    create: function() {
      var m, node, svg;
      m = this.model;
      svg = this.canvas.svg;
      node = this.createRawNode().add([
        svg.use("os_router"), this.createPortElement().attr({
          'class': 'port port-gray tooltip',
          'data-name': 'route',
          'data-alias': 'route-left',
          'data-tooltip': lang.IDE.PORT_TIP_S
        }), this.createPortElement().attr({
          'class': 'port port-gray tooltip',
          'data-name': 'route',
          'data-alias': 'route-right',
          'data-tooltip': lang.IDE.PORT_TIP_S
        })
      ]);
      this.canvas.appendNode(node);
      this.initNode(node, m.x(), m.y());
      return node;
    },
    render: function() {
      return CanvasManager.setLabel(this, this.$el.children(".node-label"));
    }
  });
});
