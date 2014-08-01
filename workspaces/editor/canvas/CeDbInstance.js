(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "./CpVolume", "./CpInstance", "i18n!/nls/lang.js", "CloudResources", "event"], function(CanvasElement, constant, CanvasManager, VolumePopup, InstancePopup, lang, CloudResources, ide_event) {
    return CanvasElement.extend({

      /* env:dev                                            env:dev:end */
      type: constant.RESTYPE.DBINSTANCE,
      parentType: [constant.RESTYPE.DBSBG, constant.RESTYPE.VPC],
      defaultSize: [9, 9],
      portPosMap: {
        "db-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "db-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "replica": [45, 45, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      portDirMap: {
        "db-sg": "horizontal"
      },
      typeIcon: function() {
        return "ide/icon/dbinstance-" + (this.model.category()) + ".png";
      },
      engineIcon: function() {
        return "ide/engine/" + (this.model.get("engine") || "").split("-")[0] + ".png";
      },
      events: {
        "mousedown .dbreplicate": "replicate"
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:backupRetentionPeriod", this.render);
        this.listenTo(this.model, "change:connections", this.updateReplicaTip);
      },
      updateReplicaTip: function(cnn) {
        if (cnn.type === "DbReplication") {
          this.render();
        }
      },
      replicate: function(evt) {
        if (!this.canvas.design.modeIsApp() && this.model.slaves().length < 5) {
          this.canvas.dragItem(evt, {
            onDrop: this.onDropReplicate
          });
        }
        return false;
      },
      onDropReplicate: function(evt, dataTransfer) {
        var DbInstance, name, nameMatch;
        name = dataTransfer.item.model.get("name");
        nameMatch = name.match(/(.+-replica)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-replica";
        }
        DbInstance = Design.modelClassForType(constant.RESTYPE.DBINSTANCE);
        new DbInstance({
          x: dataTransfer.x,
          y: dataTransfer.y,
          name: name,
          parent: dataTransfer.parent.model,
          sourceId: dataTransfer.item.model.id
        }, {
          master: dataTransfer.item.model
        });
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/dbinstance-canvas.png",
          imageX: 15,
          imageY: 11,
          imageW: 61,
          imageH: 62,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image(MC.IMG_URL + this.typeIcon(), 32, 15).move(30, 20).classes("type-image"), svg.image(MC.IMG_URL + this.engineIcon(), 32, 15).move(30, 40).classes('engine-image'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'db-sg',
            'data-alias': 'db-sg-left',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'db-sg',
            'data-alias': 'db-sg-right',
            'data-tooltip': lang.ide.PORT_TIP_D
          })
        ]);
        svgEl.add(svg.use("port_diamond").attr({
          'data-name': 'replica'
        }), 0);
        if (this.model.get('engine') === constant.DBENGINE.MYSQL && this.model.category() !== 'replica') {
          svgEl.add(svg.image(MC.IMG_URL + "ide/icon/dbinstance-resource-dragger.png", 22, 21).move(34, 58).attr({
            "class": "dbreplicate tooltip"
          }));
        }
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var $r, m, tip;
        m = this.model;
        CanvasManager.update(this.$el.children(".node-label"), m.get("name"));
        CanvasManager.update(this.$el.children(".type-image"), this.typeIcon(), "href");
        CanvasManager.update(this.$el.children(".engine-image"), this.engineIcon(), "href");
        if (m.get('engine') === constant.DBENGINE.MYSQL && m.category() !== 'replica') {
          $r = this.$el.children(".dbreplicate");
          CanvasManager.toggle($r, m.autobackup() !== 0);
          if (this.model.slaves().length < 5) {
            tip = "Drag to create a read replica.";
          } else {
            tip = "Cannot create more read replica.";
          }
          CanvasManager.update($r, tip, "tooltip");
        }
      }
    }, {
      isDirectParentType: function(t) {
        return t !== constant.RESTYPE.VPC;
      },
      createResource: function(type, attr, option) {
        var _ref;
        if (!attr.parent) {
          return;
        }
        if (option && ((_ref = option.cloneSource) != null ? _ref.master() : void 0)) {
          if (option.cloneSource.master().slaves().length >= 5) {
            notification("error", "Cannot create more read replica.");
            return;
          } else {
            option.master = option.cloneSource.master();
            delete option.cloneSource;
          }
        }
        switch (attr.parent.type) {
          case constant.RESTYPE.DBSBG:
            return CanvasElement.createResource(type, attr, option);
          case constant.RESTYPE.VPC:
            attr.parent = CanvasElement.createResource(constant.RESTYPE.DBSBG, {
              x: attr.x + 1,
              y: attr.y + 1,
              width: 11,
              height: 11,
              parent: attr.parent
            }, option);
            if (!attr.parent.id) {
              notification("error", "Cannot create subnet group due to insufficient subnets.");
              return;
            }
            attr.x += 2;
            attr.y += 2;
            return CanvasElement.createResource(constant.RESTYPE.DBINSTANCE, attr, option);
        }
      }
    });
  });

}).call(this);
