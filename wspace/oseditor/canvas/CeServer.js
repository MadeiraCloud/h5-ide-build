define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CloudResources", "./CpVolume"], function(CanvasElement, constant, CanvasManager, lang, CloudResources, VolumePopup) {
  return CanvasElement.extend({

    /* env:dev                                            env:dev:end */
    type: constant.RESTYPE.OSSERVER,
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
      "mousedown .vol-image": "showVolume",
      "click .fip-status": "suppressEvent",
      "click .vol-image": "suppressEvent"
    },
    suppressEvent: function() {
      return false;
    },
    labelWidth: function() {
      return 100;
    },
    iconUrl: function() {
      var image, m, server, url;
      image = this.model.getImage() || this.model.get("cachedAmi");
      if (!image) {
        m = this.model;
        server = CloudResources(m.type, m.design().region()).get(m.get("appId"));
        if (server) {
          server = server.attributes;
          if (server.platform && server.platform === "windows") {
            url = "ide/ami-os/windows." + server.architecture + "@2x.png";
          } else {
            url = "ide/ami-os/linux." + server.architecture + "@2x.png";
          }
        } else {
          url = "ide/ami-os/image-not-available.png";
        }
      } else {
        url = "ide/ami-os/" + image.os_type + "." + image.architecture + "@2x.png";
      }
      return url;
    },
    listenModelEvents: function() {
      this.listenTo(this.model, "change:imageId", this.render);
      this.listenTo(this.model, 'change:fip', this.render);
      this.listenTo(this.canvas, "change:externalData", this.updateState);
    },
    updateState: function() {
      var appData, m, state, stateIcon;
      m = this.model;
      stateIcon = this.$el.children(".res-state");
      if (stateIcon) {
        appData = CloudResources(m.type, m.design().region()).get(m.get("appId"));
        state = (appData != null ? appData.get("status") : void 0) || "unknown";
        return stateIcon.data("tooltip", state).attr("data-tooltip", state).attr("class", "res-state tooltip " + state);
      }
    },
    toggleFip: function() {
      var embedPort, hasFloatingIp;
      if (this.canvas.design.modeIsApp()) {
        return false;
      }
      embedPort = this.model.embedPort();
      hasFloatingIp = !!embedPort.getFloatingIp();
      embedPort.setFloatingIp(!hasFloatingIp);
      CanvasManager.updateFip(this.$el.children(".fip-status"), this.model);
      return false;
    },
    create: function() {
      var m, svg, svgEl;
      m = this.model;
      svg = this.canvas.svg;
      svgEl = this.createRawNode().add([
        svg.use("os_server"), svg.image(MC.IMG_URL + this.iconUrl(), 30, 30).move(25, 10).classes("ami-image tooltip").attr({
          'data-tooltip': this.model.getImage().name
        }), svg.group().move(43, 50).classes("fip-status cvs-hover tooltip").add([svg.image("").size(26, 21).classes("normal"), svg.image("").size(26, 21).classes("hover")]), svg.group().move(15, 46).classes("vol-image cvs-hover tooltip").add([svg.image("").size(22, 26).classes("normal"), svg.image("").size(22, 26).classes("hover")]), svg.plain("").move(26, 60).classes('volume-number'), this.createPortElement().attr({
          'class': 'port port-blue tooltip',
          'data-name': 'pool',
          'data-alias': 'pool-left',
          'data-tooltip': lang.IDE.PORT_TIP_O
        }), this.createPortElement().attr({
          'class': 'port port-blue tooltip',
          'data-name': 'pool',
          'data-alias': 'pool-right',
          'data-tooltip': lang.IDE.PORT_TIP_O
        }), this.createPortElement().attr({
          'class': 'port port-green tooltip',
          'data-name': 'server',
          'data-alias': 'server-left',
          'data-tooltip': lang.IDE.PORT_TIP_N
        }), this.createPortElement().attr({
          'class': 'port port-green tooltip',
          'data-name': 'server',
          'data-alias': 'server-right',
          'data-tooltip': lang.IDE.PORT_TIP_N
        })
      ]);
      if (!m.design().modeIsStack() && m.get("appId")) {
        svgEl.add(svg.circle(8).move(63, 11).classes('res-state unknown'));
      }
      this.canvas.appendNode(svgEl);
      this.initNode(svgEl, m.x(), m.y());
      this.listenTo(this.model, 'change:volume', this.updateVolume);
      return svgEl;
    },
    render: function() {
      var m;
      m = this.model;
      CanvasManager.setLabel(this, this.$el.children(".node-label"));
      CanvasManager.update(this.$el.children(".ami-image"), this.iconUrl(), "href");
      CanvasManager.updateFip(this.$el.children(".fip-status"), m);
      this.updateVolume();
      this.updateState();
      return null;
    },
    updateVolume: function() {
      var $vol, img1, img2, m, volumes;
      m = this.model;
      volumes = m.volumes();
      this.$el.children('.volume-number').text(volumes.length || 0);
      if (volumes.length === 0) {
        img1 = 'ide/icon-os/cvs-vol-e-n.png';
        img2 = 'ide/icon-os/cvs-vol-e-h.png';
      } else {
        img1 = 'ide/icon-os/cvs-vol-ne-n.png';
        img2 = 'ide/icon-os/cvs-vol-ne-h.png';
      }
      $vol = this.$el.children(".vol-image");
      CanvasManager.update($vol.find(".normal"), img1, "href");
      CanvasManager.update($vol.find(".hover"), img2, "href");
    },
    showVolume: function() {
      var attachment, canvas, owner, v;
      owner = this.model;
      v = owner.volumes()[0];
      attachment = this.$el[0];
      canvas = this.canvas;
      new VolumePopup({
        attachment: attachment,
        host: owner,
        models: owner.volumes(),
        canvas: canvas,
        selectAtBegin: v
      });
    }
  });
});
