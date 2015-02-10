(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.RT,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [8, 8],
      portPosMap: {
        "rtb-tgt-left": [10, 35, CanvasElement.constant.PORT_LEFT_ANGLE, 8, 35],
        "rtb-tgt-right": [70, 35, CanvasElement.constant.PORT_RIGHT_ANGLE, 72, 35],
        "rtb-src-top": [40, 3, CanvasElement.constant.PORT_UP_ANGLE],
        "rtb-src-bottom": [40, 77, CanvasElement.constant.PORT_DOWN_ANGLE]
      },
      portDirMap: {
        "rtb-tgt": "horizontal",
        "rtb-src": "vertical"
      },
      iconUrl: function() {
        if (this.model.get("main")) {
          return "ide/icon/cvs-rtb-main.png";
        } else {
          return "ide/icon/cvs-rtb.png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:main", this.render);
      },
      create: function() {
        var m, node, svg;
        m = this.model;
        svg = this.canvas.svg;
        node = this.createNode({
          image: this.iconUrl(),
          imageX: 10,
          imageY: 13,
          imageW: 60,
          imageH: 57
        }).add([
          svg.text("").move(41, 27).classes('node-label'), svg.use("port_left").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'rtb-tgt',
            'data-alias': 'rtb-tgt-left',
            'data-tooltip': lang.IDE.PORT_TIP_B
          }), svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'rtb-tgt',
            'data-alias': 'rtb-tgt-right',
            'data-tooltip': lang.IDE.PORT_TIP_B
          }), svg.use("port_bottom").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'rtb-src',
            'data-alias': 'rtb-src-top',
            'data-tooltip': lang.IDE.PORT_TIP_A
          }), svg.use("port_top").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'rtb-src',
            'data-alias': 'rtb-src-bottom',
            'data-tooltip': lang.IDE.PORT_TIP_A
          })
        ]);
        this.canvas.appendNode(node);
        this.initNode(node, m.x(), m.y());
        return node;
      },
      labelWidth: function(width) {
        return CanvasElement.prototype.labelWidth.call(this, width) - 20;
      },
      render: function() {
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        return CanvasManager.update(this.$el.children("image"), this.iconUrl(), "href");
      }
    });
  });

}).call(this);
