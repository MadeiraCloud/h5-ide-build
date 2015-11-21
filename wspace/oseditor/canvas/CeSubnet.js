define(["CanvasElement", "constant", "CanvasManager", "CanvasView", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, CanvasView, lang) {
  return CanvasElement.extend({

    /* env:dev                                            env:dev:end */
    type: constant.RESTYPE.OSSUBNET,
    parentType: [constant.RESTYPE.OSNETWORK],
    defaultSize: [19, 19],
    portDirMap: {
      "route": "vertical"
    },
    listenModelEvents: function() {
      this.listenTo(this.model, "change:public", this.render);
      this.listenTo(this.model, "change:cidr", this.render);
    },
    portPosition: function(portName, isAtomic) {
      var m, portX;
      m = this.model;
      portX = m.width() * CanvasView.GRID_WIDTH / 2;
      if (portName === "route-top") {
        return [portX, -5, CanvasElement.constant.PORT_UP_ANGLE];
      } else {
        return [portX, m.height() * CanvasView.GRID_HEIGHT + 5, CanvasElement.constant.PORT_DOWN_ANGLE];
      }
    },
    create: function() {
      var m, svg, svgEl;
      svg = this.canvas.svg;
      svgEl = this.canvas.appendSubnet(this.createGroup());
      svgEl.add([
        this.createPortElement().attr({
          'class': 'port port-gray tooltip',
          'data-name': 'route',
          'data-alias': 'route-top',
          'data-tooltip': lang.IDE.PORT_TIP_T
        }), this.createPortElement().attr({
          'class': 'port port-gray tooltip',
          'data-name': 'route',
          'data-alias': 'route-bottom',
          'data-tooltip': lang.IDE.PORT_TIP_T
        }), svg.image(MC.IMG_URL + "ide/icon-os/cvs-subnet.png", 12, 12).move(5, 5).classes("public tooltip").attr({
          'data-tooltip': "Public subnet"
        })
      ]);
      m = this.model;
      this.initNode(svgEl, m.x(), m.y());
      return svgEl;
    },
    label: function() {
      return "" + (this.model.get('name')) + " (" + (this.model.get('cidr')) + ")";
    },
    labelWidth: function(width) {
      var w;
      w = CanvasElement.prototype.labelWidth.call(this, width);
      if (this.model.get("public")) {
        w -= 16;
      }
      return w;
    },
    render: function() {
      var m;
      m = this.model;
      CanvasManager.setLabel(this, this.$el.children("text"));
      this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      this.$el.children("text")[0].setAttribute("x", m.get("public") ? 21 : 5);
      return CanvasManager.toggle(this.$el.children(".public"), m.get("public"));
    }
  });
});
