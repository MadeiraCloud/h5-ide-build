(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "./CpVolume", "./CpInstance", "i18n!/nls/lang.js", "CloudResources", "event"], function(CanvasElement, constant, CanvasManager, VolumePopup, InstancePopup, lang, CloudResources, ide_event) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: constant.RESTYPE.INSTANCE,
      parentType: [constant.RESTYPE.AZ, constant.RESTYPE.SUBNET, constant.RESTYPE.ASG, "ExpandedAsg"],
      defaultSize: [9, 9],
      portPosMap: {
        "instance-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "instance-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "instance-attach": [78, 50, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "instance-rtb": [45, 2, CanvasElement.constant.PORT_UP_ANGLE]
      },
      portDirMap: {
        "instance-sg": "horizontal"
      },
      events: {
        "mousedown .eip-status": "toggleEip",
        "mousedown .volume-image": "showVolume",
        "mousedown .server-number-group": "showGroup",
        "click .eip-status": "suppressEvent",
        "click .volume-image": "suppressEvent",
        "click .server-number-group": "suppressEvent"
      },
      suppressEvent: function() {
        return false;
      },
      iconUrl: function() {
        var ami;
        ami = this.model.getAmi() || this.model.get("cachedAmi");
        if (!ami) {
          return "ide/ami/ami-not-available.png";
        } else {
          return "ide/ami/" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:primaryEip", this.render);
        this.listenTo(this.model, "change:imageId", this.render);
        this.listenTo(this.model, "change:volumeList", this.render);
        this.listenTo(this.model, "change:count", this.updateServerCount);
        this.listenTo(this.canvas, "switchMode", this.render);
      },
      updateServerCount: function() {
        var eni, _i, _len, _ref, _ref1;
        this.render();
        _ref = this.model.connectionTargets("EniAttachment");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          eni = _ref[_i];
          if ((_ref1 = this.canvas.getItem(eni.id)) != null) {
            _ref1.render();
          }
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
          image: "ide/icon/instance-canvas.png",
          imageX: 15,
          imageY: 11,
          imageW: 61,
          imageH: 62,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image(MC.IMG_URL + this.iconUrl(), 39, 27).move(27, 15).classes("ami-image"), svg.image(MC.IMG_URL + "ide/icon/instance-volume.png", 29, 24).move(21, 46).classes('volume-image'), svg.text("").move(35, 58).classes('volume-number'), svg.image("", 12, 14).move(53, 49).classes('eip-status tooltip'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'instance-sg',
            'data-alias': 'instance-sg-left',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-green tooltip',
            'data-name': 'instance-attach',
            'data-tooltip': lang.ide.PORT_TIP_E
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'instance-sg',
            'data-alias': 'instance-sg-right',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_bottom").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'instance-rtb',
            'data-tooltip': lang.ide.PORT_TIP_C
          }), svg.group().add([svg.rect(20, 14).move(36, 2).radius(3).classes("server-number-bg"), svg.plain("0").move(46, 13).classes("server-number")]).classes("server-number-group")
        ]);
        if (!this.model.design().modeIsStack() && m.get("appId")) {
          svgEl.add(svg.circle(8).move(63, 14).classes('instance-state unknown'));
        }
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var instance, m, numberGroup, state, statusIcon, volumeCount;
        m = this.model;
        CanvasManager.update(this.$el.children(".node-label"), m.get("name"));
        CanvasManager.update(this.$el.children(".ami-image"), this.iconUrl(), "href");
        numberGroup = this.$el.children(".server-number-group");
        statusIcon = this.$el.children(".instance-state");
        if (m.get("count") > 1) {
          CanvasManager.toggle(statusIcon, false);
          CanvasManager.toggle(numberGroup, true);
          CanvasManager.update(numberGroup.children("text"), m.get("count"));
        } else {
          CanvasManager.toggle(statusIcon, true);
          CanvasManager.toggle(numberGroup, false);
          if (statusIcon.length) {
            instance = CloudResources(m.type, m.design().region()).get(m.get("appId"));
            state = (instance != null ? instance.get("instanceState").name : void 0) || "unknown";
            statusIcon.data("tooltip", state).attr("class", "instance-state tooltip " + state);
          }
        }
        CanvasManager.updateEip(this.$el.children(".eip-status"), m);
        volumeCount = m.get("volumeList") ? m.get("volumeList").length : 0;
        return CanvasManager.update(this.$el.children(".volume-number"), volumeCount);
      },
      showVolume: function() {
        var self;
        if (this.canvas.design.modeIsApp() && this.model.get("count") > 1) {
          return false;
        }
        if (this.volPopup) {
          return false;
        }
        self = this;
        this.volPopup = new VolumePopup({
          attachment: this.$el[0],
          host: this.model,
          models: this.model.get("volumeList"),
          canvas: this.canvas,
          onRemove: function() {
            return _.defer(function() {
              self.volPopup = null;
            });
          }
        });
        return false;
      },
      showGroup: function() {
        var bdm, gm, icon, idx, ins, insCln, m, members, name, volume, _i, _j, _len, _len1, _ref, _ref1;
        if (!this.canvas.design.modeIsApp()) {
          return;
        }
        insCln = CloudResources(this.type, this.model.design().region());
        members = (this.model.groupMembers() || []).slice(0);
        members.unshift({
          appId: this.model.get("appId")
        });
        name = this.model.get("name");
        gm = [];
        icon = this.iconUrl();
        for (idx = _i = 0, _len = members.length; _i < _len; idx = ++_i) {
          m = members[idx];
          ins = insCln.get(m.appId);
          if (!ins) {
            console.warn("Cannot find instance of `" + m.appId + "`");
            continue;
          }
          ins = ins.attributes;
          volume = ins.blockDeviceMapping.length;
          _ref = ins.blockDeviceMapping;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            bdm = _ref[_j];
            if (bdm.deviceName === ins.rootDeviceName) {
              --volume;
              break;
            }
          }
          gm.push({
            name: "" + name + "-" + idx,
            id: m.appId,
            icon: icon,
            volume: volume,
            state: ((_ref1 = ins.instanceState) != null ? _ref1.name : void 0) || "unknown"
          });
        }
        new InstancePopup({
          attachment: this.$el[0],
          host: this.model,
          models: gm,
          canvas: this.canvas
        });
      }
    }, {
      isDirectParentType: function(t) {
        return t !== constant.RESTYPE.AZ;
      },
      createResource: function(type, attr, option) {
        var TYPE_LC;
        if (!attr.parent) {
          return;
        }
        switch (attr.parent.type) {
          case constant.RESTYPE.SUBNET:
            return CanvasElement.createResource(type, attr, option);
          case constant.RESTYPE.ASG:
          case "ExpandedAsg":
            TYPE_LC = constant.RESTYPE.LC;
            return CanvasElement.getClassByType(TYPE_LC).createResource(TYPE_LC, attr, option);
          case constant.RESTYPE.AZ:
            attr.parent = CanvasElement.createResource(constant.RESTYPE.SUBNET, {
              x: attr.x + 1,
              y: attr.y + 1,
              width: 11,
              height: 11,
              parent: attr.parent
            }, option);
            attr.x += 2;
            attr.y += 2;
            return CanvasElement.createResource(constant.RESTYPE.INSTANCE, attr, option);
        }
      }
    });
  });

}).call(this);
