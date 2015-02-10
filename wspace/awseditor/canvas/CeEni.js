(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CloudResources", "./CpEni", "event"], function(CanvasElement, constant, CanvasManager, lang, CloudResources, EniPopup, ide_event) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.ENI,
      parentType: [constant.RESTYPE.SUBNET],
      defaultSize: [9, 9],
      portPosMap: {
        "eni-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "eni-attach": [8, 50, CanvasElement.constant.PORT_LEFT_ANGLE],
        "eni-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "eni-rtb": [45, 2, CanvasElement.constant.PORT_UP_ANGLE]
      },
      portDirMap: {
        "eni-sg": "horizontal"
      },
      events: {
        "mousedown .eip-status": "toggleEip",
        "mousedown .server-number-group": "showGroup",
        "click .eip-status": function() {
          return false;
        }
      },
      iconUrl: function() {
        if (this.model.connections("EniAttachment").length) {
          return "ide/icon/cvs-eni-att.png";
        } else {
          return "ide/icon/cvs-eni-unatt.png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:connections", this.onConnectionChange);
        this.listenTo(this.model, "change:primaryEip", this.render);
        this.listenTo(this.canvas, "switchMode", this.render);
      },
      onConnectionChange: function(cn) {
        if (cn.type === "EniAttachment") {
          return this.render();
        }
      },
      toggleEip: function() {
        var toggle;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        toggle = !this.model.hasPrimaryEip();
        this.model.setPrimaryEip(toggle);
        if (toggle) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        CanvasManager.updateEip(this.$el.children(".eip-status"), this.model);
        ide_event.trigger(ide_event.PROPERTY_REFRESH_ENI_IP_LIST);
        return false;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: this.iconUrl(),
          imageX: 16,
          imageY: 15,
          imageW: 59,
          imageH: 49,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image("", 12, 14).move(44, 37).classes('eip-status tooltip'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'eni-sg',
            'data-alias': 'eni-sg-left',
            'data-tooltip': lang.IDE.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-green tooltip',
            'data-name': 'eni-attach',
            'data-tooltip': lang.IDE.PORT_TIP_G
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'eni-sg',
            'data-alias': 'eni-sg-right',
            'data-tooltip': lang.IDE.PORT_TIP_F
          }), svg.use("port_bottom").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'eni-rtb',
            'data-tooltip': lang.IDE.PORT_TIP_C
          }), svg.group().add([svg.rect(20, 14).move(36, 2).radius(3).classes("server-number-bg"), svg.plain("0").move(46, 13).classes("server-number")]).classes("server-number-group")
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var count, m, numberGroup;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children("image:not(.eip-status)"), this.iconUrl(), "href");
        count = m.serverGroupCount();
        numberGroup = this.$el.children(".server-number-group");
        CanvasManager.toggle(this.$el.children(".port-eni-rtb"), count <= 1);
        CanvasManager.toggle(numberGroup, count > 1);
        numberGroup.children("text").text(count);
        return CanvasManager.updateEip(this.$el.children(".eip-status"), m);
      },
      showGroup: function() {
        var eip, gm, idx, ins, insCln, m, members, name, _i, _len, _ref;
        if (!this.canvas.design.modeIsApp()) {
          return;
        }
        insCln = CloudResources(this.model.design().credentialId(), this.type, this.model.design().region());
        members = (this.model.groupMembers() || []).slice(0);
        members.unshift({
          appId: this.model.get("appId"),
          ips: this.model.get("ips")
        });
        name = this.model.get("name");
        gm = [];
        for (idx = _i = 0, _len = members.length; _i < _len; idx = ++_i) {
          m = members[idx];
          ins = insCln.get(m.appId);
          if (!ins) {
            console.warn("Cannot find eni of `" + m.appId + "`");
            continue;
          }
          ins = ins.attributes;
          eip = (m.ips || [])[0];
          gm.push({
            name: "" + name + "-" + idx,
            id: m.appId,
            eip: eip != null ? (_ref = eip.eipData) != null ? _ref.publicIp : void 0 : void 0
          });
        }
        new EniPopup({
          attachment: this.$el[0],
          host: this.model,
          models: gm,
          canvas: this.canvas
        });
      }
    });
  });

}).call(this);
