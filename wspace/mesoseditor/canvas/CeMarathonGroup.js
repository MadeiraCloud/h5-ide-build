define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CanvasView"], function(CanvasElement, constant, CanvasManager, lang, CanvasView) {
  return CanvasElement.extend({

    /* env:dev                                                 env:dev:end */
    type: constant.RESTYPE.MRTHGROUP,
    parentType: [constant.RESTYPE.MRTHGROUP, "SVG"],
    defaultSize: [22, 17],
    portPosition: function(portName, isAtomic) {
      var m, x;
      m = this.model;
      if (portName === "group-dep-in") {
        x = -10;
        if (isAtomic) {
          x -= 8;
        }
        return [x, 11, CanvasElement.constant.PORT_LEFT_ANGLE];
      } else {
        x = m.width() * CanvasView.GRID_WIDTH + 10;
        if (isAtomic) {
          x += 7;
        }
        return [x, 11, CanvasElement.constant.PORT_RIGHT_ANGLE];
      }
    },
    listenModelEvents: function() {
      var self;
      self = this;
      this.listenTo(this.model, "change:__parent", function() {
        return self.canvas.sortGroup();
      });
    },
    applyGeometry: function(x, y, width, height) {
      var ch, classes, _i, _len, _ref;
      CanvasElement.prototype.applyGeometry.apply(this, arguments);
      _ref = this.$el[0].instance.children();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        classes = ch.classes();
        if (classes.indexOf("group-label-bg") >= 0) {
          ch.size(width * 10, ch.height());
          break;
        }
      }
    },
    create: function() {
      var m, svg, svgEl;
      svg = this.canvas.svg;
      m = this.model;
      svgEl = this.canvas.appendGroup(this.createGroup());
      svgEl.add([
        svg.rect(m.width() * 10, 20).move(0, 0).radius(2).attr({
          'class': "group-label-bg"
        }), svg.use("marathon_port").attr({
          'class': 'port port-marathon tooltip',
          'data-name': 'group-dep-in',
          'data-tooltip': lang.IDE.PORT_TIP_U
        }), svg.use("marathon_port").attr({
          'class': 'port port-marathon tooltip',
          'data-name': 'group-dep-out',
          'data-tooltip': lang.IDE.PORT_TIP_V
        })
      ], 0);
      this.initNode(svgEl, m.x(), m.y());
      return svgEl;
    },
    label: function() {
      return this.model.get('name');
    },
    render: function() {
      var m;
      m = this.model;
      CanvasManager.setLabel(this, this.$el.children("text"));
      return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
    },
    containPoint: function(px, py) {
      var size, x, y;
      x = this.model.x() - 2;
      y = this.model.y();
      size = this.size();
      return x <= px && y <= py && x + size.width + 4 >= px && y + size.height >= py;
    },
    parentCount: function() {
      var a, c;
      c = 0;
      a = this.parent();
      while (a) {
        ++c;
        a = a.parent();
      }
      return c;
    }
  });
});
