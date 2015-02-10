(function() {
  define(["CanvasElement", "constant", "CanvasManager", "./CpVolume", "./CpInstance", "i18n!/nls/lang.js", "CloudResources", "DbSubnetGPopup"], function(CanvasElement, constant, CanvasManager, VolumePopup, InstancePopup, lang, CloudResources, DbSubnetGPopup) {
    return CanvasElement.extend({

      /* env:dev                                            env:dev:end */
      type: constant.RESTYPE.DBINSTANCE,
      parentType: [constant.RESTYPE.DBSBG, constant.RESTYPE.VPC],
      defaultSize: [9, 9],
      portPosMap: {
        "db-sg-left": [10, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
        "db-sg-right": [79, 35, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "replica": [45, 45, CanvasElement.constant.PORT_DOWN_ANGLE]
      },
      portDirMap: {
        "db-sg": "horizontal"
      },
      portPosition: function(portName, isAtomic) {
        var p;
        p = this.portPosMap[portName];
        if (portName === "replica") {
          p = p.slice(0);
          if (this.model.master()) {
            p[1] = 45;
            p[2] = CanvasElement.constant.PORT_2D_V_ANGLE;
          } else {
            p[1] = 61;
            p[2] = CanvasElement.constant.PORT_DOWN_ANGLE;
          }
        }
        return p;
      },
      typeIcon: function() {
        return "ide/icon/icn-" + (this.model.category()) + ".png";
      },
      engineIcon: function() {
        return "ide/icon/rds-" + (this.model.get("engine") || "").split("-")[0] + ".png";
      },
      events: {
        "mousedown .dbreplicate": "replicate",
        "mousedown .dbrestore": "restore"
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:backupRetentionPeriod", this.render);
        this.listenTo(this.model, "change:connections", this.updateReplicaTip);
        this.listenTo(this.canvas, "change:externalData", this.updateState);
      },
      updateState: function() {
        var appData, m, state, stateIcon;
        m = this.model;
        stateIcon = this.$el.children(".res-state");
        if (stateIcon) {
          appData = CloudResources(m.design().credentialId(), m.type, m.design().region()).get(m.get("appId"));
          state = (appData != null ? appData.get("DBInstanceStatus") : void 0) || "unknown";
          return stateIcon.data("tooltip", state).attr("data-tooltip", state).attr("class", "res-state tooltip " + state);
        }
      },
      updateReplicaTip: function(cnn) {
        if (cnn.type === "DbReplication") {
          this.render();
        }
      },
      replicate: function(evt) {
        var appData, backup, _ref;
        if (!this.canvas.design.modeIsApp() && this.model.slaves().length < 5) {
          appData = CloudResources(this.model.design().credentialId(), this.model.type, this.model.design().region()).get(this.model.get("appId"));
          if (appData) {
            backup = ((_ref = appData.get('BackupRetentionPeriod')) !== 0 && _ref !== '0');
          }
          if (this.model.autobackup() && this.model.get('appId') && !backup) {
            return false;
          }
          this.canvas.dragItem(evt, {
            onDrop: this.onDropReplicate
          });
        }
        return false;
      },
      restore: function(evt) {
        if (!this.canvas.design.modeIsApp()) {
          this.canvas.dragItem(evt, {
            onDrop: this.onDropRestore
          });
        }
        return false;
      },
      onDropReplicate: function(evt, dataTransfer) {
        var DbInstance, name, nameMatch, replica, targetSubnetGroup;
        targetSubnetGroup = dataTransfer.parent.model;
        if (targetSubnetGroup !== dataTransfer.item.model.parent()) {
          notification("error", lang.NOTIFY.READ_REPLICA_MUST_BE_DROPPED_IN_THE_SAME_SBG);
          return;
        }
        name = dataTransfer.item.model.get("name");
        nameMatch = name.match(/(.+-replica)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-replica";
        }
        DbInstance = Design.modelClassForType(constant.RESTYPE.DBINSTANCE);
        replica = new DbInstance({
          x: dataTransfer.x,
          y: dataTransfer.y,
          name: name,
          parent: targetSubnetGroup,
          sourceId: dataTransfer.item.model.id
        }, {
          master: dataTransfer.item.model
        });
        if (replica.id) {
          dataTransfer.item.canvas.selectItem(replica.id);
        }
      },
      onDropRestore: function(evt, dataTransfer) {
        var DbInstance, name, newDbIns, targetSubnetGroup;
        targetSubnetGroup = dataTransfer.parent.model;
        name = dataTransfer.item.model.get("name");
        DbInstance = Design.modelClassForType(constant.RESTYPE.DBINSTANCE);
        newDbIns = new DbInstance({
          x: dataTransfer.x,
          y: dataTransfer.y,
          name: "from-" + name,
          parent: targetSubnetGroup
        }, {
          master: dataTransfer.item.model,
          isRestore: true
        });
        if (newDbIns.id) {
          dataTransfer.item.canvas.selectItem(newDbIns.id);
        }
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cvs-rds.png",
          imageX: 14,
          imageY: 8,
          imageW: 62,
          imageH: 66,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image(MC.IMG_URL + this.engineIcon(), 46, 33).move(22, 18).classes('engine-image'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'db-sg',
            'data-alias': 'db-sg-left',
            'data-tooltip': lang.IDE.PORT_TIP_D
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'db-sg',
            'data-alias': 'db-sg-right',
            'data-tooltip': lang.IDE.PORT_TIP_D
          })
        ]);
        if (this.model.get('engine') === constant.DB_ENGINE.MYSQL) {
          svgEl.add(svg.use("port_diamond").attr({
            "class": "port",
            'data-name': 'replica'
          }), 0);
          if (this.model.master()) {
            svgEl.add(svg.plain("REPLICA").move(45, 60).classes("replica-text"));
            svgEl.add(svg.use("replica_dragger").attr({
              "class": "dbreplicate tooltip"
            }));
          } else {
            svgEl.add(svg.plain("MASTER").move(45, 60).classes("master-text"));
            svgEl.add(svg.use("replica_dragger").attr({
              "class": "dbreplicate tooltip"
            }));
          }
        }
        if (!m.design().modeIsStack() && m.get("appId")) {
          svgEl.add(svg.circle(8).move(63, 15).classes('res-state unknown'));
        }
        svgEl.add(svg.use("restore_dragger").attr({
          "class": "dbrestore tooltip"
        }));
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var $r, appData, backup, m, penddingObj, tip, _ref, _ref1;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children(".type-image"), this.typeIcon(), "href");
        CanvasManager.update(this.$el.children(".engine-image"), this.engineIcon(), "href");
        CanvasManager.toggle(this.$el.children(".master-text"), m.design().modeIsApp() && m.slaves().length);
        if (m.get('engine') === constant.DB_ENGINE.MYSQL) {
          $r = this.$el.children(".dbreplicate");
          appData = CloudResources(m.design().credentialId(), m.type, m.design().region()).get(m.get("appId"));
          if (appData) {
            backup = "" + appData.get('BackupRetentionPeriod') !== "0";
          }
          if (m.slaves().length < 5) {
            CanvasManager.removeClass($r, "disabled");
            if (m.autobackup()) {
              tip = lang.IDE.RES_TIP_DRAG_TO_DUPLICATE;
              if (m.category() === 'replica' && m.master() && m.master().master()) {
                CanvasManager.toggle($r, false);
              } else {
                CanvasManager.toggle($r, true);
                if (m.get('appId') && !backup) {
                  tip = lang.IDE.RES_TIP_PLEASE_WAIT_AUTOBACKUP_ENABLE_TO_CREATE_REPLICA;
                  CanvasManager.addClass($r, "disabled");
                }
              }
            } else {
              tip = lang.IDE.RES_TIP_DRAG_TO_DUPLICATE;
              CanvasManager.toggle($r, false);
            }
          } else {
            tip = lang.IDE.RES_TIP_CANT_CREATE_MORE_REPLICA;
            CanvasManager.toggle($r, true);
            CanvasManager.addClass($r, "disabled");
          }
          CanvasManager.update($r, tip, "tooltip");
          if (m.getSourceDBForRestore()) {
            CanvasManager.toggle($r, false);
          }
        }
        $r = this.$el.children(".dbrestore");
        CanvasManager.toggle($r, !!m.get("appId"));
        CanvasManager.update($r, lang.IDE.RES_TIP_DRAG_TO_RESTORE, "tooltip");
        appData = CloudResources(m.design().credentialId(), m.type, m.design().region()).get(m.get("appId"));
        if (appData) {
          penddingObj = appData.get('PendingModifiedValues');
          if (((_ref = appData.get('BackupRetentionPeriod')) === 0 || _ref === '0') || (penddingObj && ((_ref1 = penddingObj.BackupRetentionPeriod) === 0 || _ref1 === '0'))) {
            CanvasManager.toggle($r, false);
          }
        }
        this.updateState();
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
          if (option.cloneSource.master().slaves().length > 5) {
            notification("error", lang.NOTIFY.CANNOT_CREATE_MORE_READ_REPLICA);
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
              notification("error", lang.NOTIFY.CANNOT_CREATE_SBG_DUE_TO_INSUFFICIENT_SUBNETS);
              return;
            }
            attr.x += 2;
            attr.y += 2;
            new DbSubnetGPopup({
              model: attr.parent
            });
            return CanvasElement.createResource(constant.RESTYPE.DBINSTANCE, attr, option);
        }
      }
    });
  });

}).call(this);
