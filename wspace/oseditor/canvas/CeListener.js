define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
  return CanvasElement.extend({

    /* env:dev                                            env:dev:end */
    type: constant.RESTYPE.OSLISTENER,
    parentType: [constant.RESTYPE.OSSUBNET],
    defaultSize: [8, 8],
    portPosMap: {
      "elb-left": [0, 60, CanvasElement.constant.PORT_LEFT_ANGLE],
      "elb-right": [80, 60, CanvasElement.constant.PORT_RIGHT_ANGLE]
    },
    portDirMap: {
      "elb": "horizontal"
    },
    events: {
      "mousedown .fip-status": "toggleFip",
      "click .fip-status": "suppressEvent"
    },
    suppressEvent: function() {
      return false;
    },
    listenModelEvents: function() {
      this.listenTo(this.model, 'change:fip', this.render);
    },
    labelWidth: function() {
      return 100;
    },
    toggleFip: function() {
      var hasFloatingIp;
      if (this.canvas.design.modeIsApp()) {
        return false;
      }
      hasFloatingIp = !!this.model.getFloatingIp();
      this.model.setFloatingIp(!hasFloatingIp);
      CanvasManager.updateFip(this.$el.children(".fip-status"), this.model);
      return false;
    },
    create: function() {
      var m, svg, svgEl;
      m = this.model;
      svg = this.canvas.svg;
      svgEl = this.createRawNode().add([
        svg.use("os_listener"), svg.group().move(29, 42).classes("fip-status cvs-hover tooltip").add([svg.image("").size(26, 21).classes("normal"), svg.image("").size(26, 21).classes("hover")]), this.createPortElement().attr({
          'class': 'port port-green tooltip',
          'data-name': 'elb',
          'data-alias': 'elb-left',
          'data-tooltip': lang.IDE.PORT_TIP_P
        }), this.createPortElement().attr({
          'class': 'port port-green tooltip',
          'data-name': 'elb',
          'data-alias': 'elb-right',
          'data-tooltip': lang.IDE.PORT_TIP_P
        })
      ]);
      this.canvas.appendNode(svgEl);
      this.initNode(svgEl, m.x(), m.y());
      return svgEl;
    },
    render: function() {
      var m;
      m = this.model;
      CanvasManager.setLabel(this, this.$el.children(".node-label"));
      CanvasManager.updateFip(this.$el.children(".fip-status"), m);
      return null;
    }
  });
});
