define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CanvasView", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, CanvasView, CloudResources) {
  return CanvasElement.extend({

    /* env:dev                                             env:dev:end */
    type: constant.RESTYPE.MRTHAPP,
    parentType: [constant.RESTYPE.MRTHGROUP, "SVG"],
    defaultSize: [18, 8],
    portPosition: function(portName, isAtomic) {
      var m, x;
      m = this.model;
      if (portName === "app-dep-in") {
        x = 0;
        if (isAtomic) {
          x -= 5;
        }
        return [x, 41, CanvasElement.constant.PORT_LEFT_ANGLE];
      } else {
        x = 175;
        if (isAtomic) {
          x += 9;
        }
        return [x, 41, CanvasElement.constant.PORT_RIGHT_ANGLE];
      }
    },
    iconUrl: function() {
      return "ide/icon-mrth/icn-" + (this.model.get('image')) + ".png";
    },
    listenModelEvents: function() {
      this.listenTo(CloudResources(this.canvas.design.credentialId(), constant.RESTYPE.MRTHAPP, this.canvas.design.opsModel().id), "change", this.render);
      this.listenTo(this.model, "change", this.render);
    },
    create: function() {
      var height, m, portSize, size, svg, svgEl, width;
      m = this.model;
      svg = this.canvas.svg;
      size = this.size();
      width = 150;
      height = 70;
      portSize = 10;
      svgEl = svg.group().add([
        svg.rect(width + 9, height + 9).move(8.5, 0.5).radius(5).classes("marathon-app-bg"), svg.rect(width - 1, 37).move(portSize + 3.5, 37.5).radius(2).classes("marathon-app-bottom"), svg.rect(width - 1, 32).move(portSize + 3.5, 8.5).classes("marathon-app-top"), svg.rect(width - 2, 1).move(portSize + 4, 40).classes("marathon-app-line"), svg.use("marathon_app_title").attr({
          "class": "marathon-app-ceiling",
          "fill": this.model.get("color")
        }), svg.image(MC.IMG_URL + this.iconUrl(), 20, 20).move(21, 15), svg.text("").move(47, 29).classes('node-label'), svg.image(MC.IMG_URL + "ide/icon-mrth/cvs-appicon.png", 120, 32).move(20, 42), svg.plain("").move(50, 62).attr({
          "class": 'cpu-label tooltip',
          "data-tooltip": "CPU"
        }), svg.plain("").move(115, 62).attr({
          "class": 'memory-label tooltip',
          "data-tooltip": "Memory"
        }), svg.use("marathon_port").attr({
          'class': 'port port-marathon tooltip',
          'data-name': 'app-dep-in',
          'data-tooltip': lang.IDE.PORT_TIP_U
        }), svg.use("marathon_port").attr({
          'class': 'port port-marathon tooltip',
          'data-name': 'app-dep-out',
          'data-tooltip': lang.IDE.PORT_TIP_V
        }), svg.group().add([
          svg.rect(20, 16).move(155, -3).radius(3).classes("server-number-bg"), svg.plain("0").move(165, 9).attr({
            "class": "server-number",
            "text-anchor": "middle"
          })
        ]).attr({
          "class": "server-number-group tooltip",
          "data-tooltip": this.canvas.design.modeIsApp() ? "Tasks/Instances" : "Instances"
        })
      ]).attr({
        "data-id": this.cid
      }).classes('canvasel ' + this.type.replace(/\.|:/g, "-"));
      if (this.canvas.design.modeIsApp()) {
        $(svgEl.node).find(".server-number-bg").attr({
          width: 40,
          x: 135
        });
        $(svgEl.node).find(".server-number").attr({
          x: 155
        });
      }
      this.canvas.appendNode(svgEl);
      this.initNode(svgEl, m.x(), m.y());
      return svgEl;
    },
    label: function() {
      return this.model.get('name');
    },
    labelWidth: function() {
      return 110;
    },
    render: function() {
      var app, i, m, t, text;
      m = this.model;
      CanvasManager.setLabel(this, this.$el.children(".node-label"));
      this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      CanvasManager.update(this.$el.find(".cpu-label"), m.get("cpus") || "0");
      CanvasManager.update(this.$el.find(".memory-label"), m.get("mem") || "0");
      if (this.canvas.design.modeIsApp()) {
        app = CloudResources(this.canvas.design.credentialId(), constant.RESTYPE.MRTHAPP, this.canvas.design.opsModel().id).get(m.path());
        if (app) {
          t = app.get("tasksRunning");
          i = app.get("instances");
          text = "" + t + "/" + i;
          if (parseInt(t) !== parseInt(i)) {
            CanvasManager.addClass(this.$el.find(".server-number-group"), "mismatch");
          } else {
            CanvasManager.removeClass(this.$el.find(".server-number-group"), "mismatch");
          }
        } else {
          text = m.get("instances");
        }
        return CanvasManager.update(this.$el.find(".server-number"), text);
      } else {
        return CanvasManager.update(this.$el.find(".server-number"), m.get("instances") || "0");
      }
    }
  });
});
