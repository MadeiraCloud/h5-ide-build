(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: constant.RESTYPE.OSPORT,
      parentType: [constant.RESTYPE.OSSUBNET],
      defaultSize: [8, 8],
      portPosMap: {
        "pool-left": [0, 40, CanvasElement.constant.PORT_LEFT_ANGLE],
        "pool-right": [80, 40, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "server-left": [0, 60, CanvasElement.constant.PORT_LEFT_ANGLE],
        "server-right": [80, 60, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      portDirMap: {
        "pool": "horizontal",
        "server": "horizontal"
      },
      events: {
        "mousedown .fip-status": "toggleFip",
        "click .fip-status": "suppressEvent"
      },
      suppressEvent: function() {
        return false;
      },
      labelWidth: function() {
        return 100;
      },
      listenModelEvents: function() {
        this.listenTo(this.model, 'change:fip', this.render);
        this.listenTo(this.model, "change:connections", this.render);
      },
      toggleFip: function() {
        var hasFloatingIp;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        hasFloatingIp = !!this.model.getFloatingIp();
        this.model.setFloatingIp(!hasFloatingIp);
        return false;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        console.assert(!this.model.isEmbedded());
        svg = this.canvas.svg;
        svgEl = this.createRawNode().add([
          svg.use("os_port"), svg.group().move(33, 29).classes("fip-status cvs-hover tooltip").add([svg.image("").size(26, 21).classes("normal"), svg.image("").size(26, 21).classes("hover")]), this.createPortElement().attr({
            'class': 'port port-blue tooltip',
            'data-name': 'pool',
            'data-alias': 'pool-left',
            'data-tooltip': lang.IDE.PORT_TIP_P
          }), this.createPortElement().attr({
            'class': 'port port-blue tooltip',
            'data-name': 'pool',
            'data-alias': 'pool-right',
            'data-tooltip': lang.IDE.PORT_TIP_P
          }), this.createPortElement().attr({
            'class': 'port port-green tooltip',
            'data-name': 'server',
            'data-alias': 'server-left',
            'data-tooltip': lang.IDE.PORT_TIP_R
          }), this.createPortElement().attr({
            'class': 'port port-green tooltip',
            'data-name': 'server',
            'data-alias': 'server-right',
            'data-tooltip': lang.IDE.PORT_TIP_R
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var fip, m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        fip = this.$el.children(".fip-status");
        if (m.connections("OsPortUsage").length) {
          fip.show();
          CanvasManager.updateFip(fip, m);
        } else {
          fip.hide();
        }
        return null;
      }
    });
  });

}).call(this);
