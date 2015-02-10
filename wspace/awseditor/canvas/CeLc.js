(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "./CpVolume", "./CpInstance", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, VolumePopup, InstancePopup, CloudResources) {
    return CanvasElement.extend({

      /* env:dev                                    env:dev:end */
      type: constant.RESTYPE.LC,
      portPosMap: {
        "launchconfig-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "launchconfig-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      portDirMap: {
        "launchconfig-sg": "horizontal"
      },
      defaultSize: [9, 9],
      events: {
        "mousedown .server-number-group": "showGroup",
        "mousedown .volume-image": "showVolume",
        "click .volume-image": "suppressEvent",
        "click .server-number-group": "suppressEvent"
      },
      hover: function(evt) {
        var $asg, $lc, $lcLayer, asgPos;
        $lc = $(evt.currentTarget);
        $asg = $lc.parent();
        asgPos = $asg[0].instance.transform();
        if (!CanvasManager.hasClass($asg, "AWS-AutoScaling-Group") && !CanvasManager.hasClass($asg, "ExpandedAsg")) {
          return;
        }
        $lcLayer = this.canvas.getLayer("layer_lc");
        $lcLayer.attr({
          "transform": "translate(" + asgPos.x + " " + asgPos.y + ")",
          "data-id": $asg.attr("data-id")
        });
        $lcLayer.append($lc);
      },
      hoverOut: function(evt) {
        var $layer, $lc, id;
        $lc = $(evt.currentTarget);
        $layer = $lc.parent();
        if (!CanvasManager.hasClass($layer, "layer_lc")) {
          return;
        }
        id = $layer.attr("data-id");
        $layer.attr("data-id", "");
        this.canvas.getItem(id).$el.children().eq(0).after($lc[0]);
      },
      suppressEvent: function() {
        return false;
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:connections", this.render);
        this.listenTo(this.model, "change:volumeList", this.render);
        this.listenTo(this.model, "change:imageId", this.render);
        this.listenTo(this.canvas, "switchMode", this.render);
        this.listenTo(this.model, "change:expandedList", function() {
          var self;
          self = this;
          return setTimeout(function() {
            if (!self.model.isRemoved()) {
              return self.render();
            }
          }, 0);
        });
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
      pos: function(el) {
        var p, parentItem;
        if (el) {
          parentItem = this.canvas.getItem(el.parentNode.getAttribute("data-id"));
        } else {
          console.warn("Accessing LC' position without svg element");
          parentItem = parentItem = this.canvas.getItem(this.model.connectionTargets("LcUsage")[0].id);
        }
        if (parentItem) {
          p = parentItem.pos();
          p.x += 2;
          p.y += 3;
          return p;
        } else {
          return {
            x: 0,
            y: 0
          };
        }
      },
      isTopLevel: function() {
        return false;
      },
      ensureLcView: function() {
        var asg, elementChanged, expanded, isOriginalAsg, lcParentMap, parentCid, parentItem, parentModel, subview, svg, svgEl, uid, views, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
        elementChanged = false;
        lcParentMap = {};
        _ref = this.model.connectionTargets("LcUsage");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asg = _ref[_i];
          lcParentMap[asg.id] = asg;
          _ref1 = asg.get("expandedList");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            expanded = _ref1[_j];
            lcParentMap[expanded.id] = expanded;
          }
        }
        views = [];
        _ref2 = this.$el;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          subview = _ref2[_k];
          views.push(subview);
        }
        for (_l = 0, _len3 = views.length; _l < _len3; _l++) {
          subview = views[_l];
          parentCid = $(subview.parentNode).attr("data-id");
          parentItem = this.canvas.getItem(parentCid);
          if (!parentItem) {
            this.removeView(subview);
            elementChanged = true;
          } else {
            parentModel = parentItem.model;
            if (!lcParentMap[parentModel.id]) {
              this.removeView(subview);
              elementChanged = true;
            } else {
              delete lcParentMap[parentModel.id];
            }
          }
        }
        svg = this.canvas.svg;
        for (uid in lcParentMap) {
          parentModel = lcParentMap[uid];
          isOriginalAsg = parentModel.type !== "ExpandedAsg";
          svgEl = this.createNode({
            image: "ide/icon/cvs-instance.png",
            imageX: 15,
            imageY: 11,
            imageW: 61,
            imageH: 62,
            label: true,
            labelBg: true,
            sg: isOriginalAsg
          }).add([
            svg.image(MC.IMG_URL + this.iconUrl(), 39, 27).move(27, 15).classes("ami-image"), svg.use("port_diamond").move(10, 20).attr({
              'class': 'port port-blue tooltip',
              'data-name': 'launchconfig-sg',
              'data-alias': 'launchconfig-sg-left',
              'data-tooltip': lang.IDE.PORT_TIP_D
            }), svg.use("port_diamond").move(80, 20).attr({
              'class': 'port port-blue tooltip',
              'data-name': 'launchconfig-sg',
              'data-alias': 'launchconfig-sg-right',
              'data-tooltip': lang.IDE.PORT_TIP_D
            }), svg.image(MC.IMG_URL + "ide/icon/icn-vol.png", 29, 24).move(31, 46).classes('volume-image'), svg.plain("").move(45, 58).classes('volume-number'), svg.group().add([svg.rect(20, 14).move(36, 2).radius(3).classes("server-number-bg"), svg.plain("0").move(46, 13).classes("server-number")]).classes("server-number-group")
          ]).classes("canvasel fixed AWS-AutoScaling-LaunchConfiguration").move(20, 30);
          this.addView(svgEl);
          this.canvas.getItem(uid).$el.children().eq(0).after(svgEl.node);
          elementChanged = true;
        }
        if (elementChanged) {
          this.updateConnections();
        }
      },
      render: function(force) {
        var asg, asgCln, el, m, numberGroup, volumeCount, _i, _len, _ref, _ref1;
        if (this.canvas.initializing && !force) {
          return;
        }
        this.ensureLcView();
        m = this.model;
        CanvasManager.update(this.$el.children(".node-label"), m.get("name"));
        CanvasManager.update(this.$el.children(".ami-image"), this.iconUrl(), "href");
        volumeCount = m.get("volumeList") ? m.get("volumeList").length : 0;
        CanvasManager.update(this.$el.children(".volume-number"), volumeCount);
        this.$el.children(".server-number-group").hide();
        if (m.design().modeIsApp()) {
          this.$el.children(".server-number-group").show();
          asgCln = CloudResources(m.design().credentialId(), constant.RESTYPE.ASG, m.design().region());
          _ref = this.$el;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            asg = this.canvas.getItem(el.parentNode.getAttribute("data-id")).model;
            asg = asgCln.get((asg.get("originalAsg") || asg).get("appId"));
            if (!asg) {
              continue;
            }
            asg = asg.attributes;
            if ((_ref1 = asg.Instances) != null ? _ref1.length : void 0) {
              numberGroup = $(el).children(".server-number-group").show();
              CanvasManager.update(numberGroup.children("text"), asg.Instances.length);
            }
          }
        }
      },
      destroy: function(selectedDomElement) {
        var LcUsage, parentItem, parentModel;
        if (this.model.connections("LcUsage").length > 1) {
          parentItem = this.canvas.getItem(selectedDomElement.parentNode.getAttribute("data-id"));
          if (!parentItem) {
            return;
          }
          LcUsage = Design.modelClassForType("LcUsage");
          parentModel = parentItem.model;
          if (parentModel.type === "ExpandedAsg") {
            parentModel = parentModel.get("originalAsg");
          }
          (new LcUsage(parentModel, this.model)).remove();
          return;
        }
        return CanvasElement.prototype.destroy.apply(this, arguments);
      },
      doDestroyModel: function() {
        var _ref;
        return (_ref = this.model.connections("LcUsage")[0]) != null ? _ref.remove() : void 0;
      },
      showVolume: function(evt) {
        var self;
        if (this.volPopup) {
          return false;
        }
        self = this;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        this.volPopup = new VolumePopup({
          attachment: $(evt.currentTarget).closest("g")[0],
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
      showGroup: function(evt) {
        var bdm, gm, icon, idx, ins, insCln, m, name, volume, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        insCln = CloudResources(this.model.design().credentialId(), constant.RESTYPE.INSTANCE, this.model.design().region());
        name = this.model.get("name");
        gm = [];
        icon = this.iconUrl();
        _ref = this.model.groupMembers();
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          m = _ref[idx];
          ins = insCln.get(m.appId);
          if (!ins) {
            console.warn("Cannot find instance of `" + m.appId + "`");
            continue;
          }
          ins = ins.attributes;
          volume = ins.blockDeviceMapping.length;
          _ref1 = ins.blockDeviceMapping;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            bdm = _ref1[_j];
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
            state: ((_ref2 = ins.instanceState) != null ? _ref2.name : void 0) || "unknown"
          });
        }
        new InstancePopup({
          attachment: $(evt.currentTarget).closest(".canvasel")[0],
          host: this.model,
          models: gm,
          canvas: this.canvas
        });
      }
    }, {
      render: function(canvas) {
        var lc, _i, _len, _ref, _results;
        _ref = canvas.design.componentsOfType(constant.RESTYPE.LC);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lc = _ref[_i];
          _results.push(canvas.getItem(lc.id).render(true));
        }
        return _results;
      },
      createResource: function(t, attr, option) {
        var asg, lcModel;
        if (!attr.parent) {
          return;
        }
        if (attr.parent.getLc()) {
          return;
        }
        asg = attr.parent.get("originalAsg") || attr.parent;
        delete attr.parent;
        lcModel = CanvasElement.createResource(this.type, attr, option);
        asg.setLc(lcModel);
        return lcModel;
      }
    });
  });

}).call(this);
