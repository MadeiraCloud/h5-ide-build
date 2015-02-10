(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.ELB,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [9, 9],
      portPosMap: {
        "elb-sg-in": [2, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
        "elb-assoc": [79, 50, CanvasElement.constant.PORT_RIGHT_ANGLE, 81, 50],
        "elb-sg-out": [79, 20, CanvasElement.constant.PORT_RIGHT_ANGLE, 81, 20]
      },
      iconUrl: function() {
        if (this.model.get("internal")) {
          return "ide/icon/cvs-elb-int.png";
        } else {
          return "ide/icon/cvs-elb-ext.png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:internal", this.render);
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: this.iconUrl(),
          imageX: 9,
          imageY: 11,
          imageW: 70,
          imageH: 53,
          label: m.get("name"),
          sg: true
        }).add([
          svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'elb-sg-in',
            'data-tooltip': lang.IDE.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'elb-assoc',
            'data-tooltip': lang.IDE.PORT_TIP_K
          }), svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'elb-sg-out',
            'data-tooltip': lang.IDE.PORT_TIP_J
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
        CanvasManager.update(this.$el.children("image"), this.iconUrl(), "href");
        return CanvasManager.toggle(this.$el.children('[data-name="elb-sg-in"]'), m.get("internal"));
      }
    });
  });

}).call(this);
