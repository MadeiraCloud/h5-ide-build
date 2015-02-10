(function() {
  define(["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "CanvasView"], function(CanvasElement, constant, CanvasManager, lang, CanvasView) {
    var CeAsg;
    CeAsg = CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.ASG,
      parentType: [constant.RESTYPE.SUBNET],
      defaultSize: [15, 15],
      events: {
        "mousedown .asg-dragger": "dragExpand"
      },
      isGroup: function() {
        return true;
      },
      size: function() {
        return {
          width: 13,
          height: 13
        };
      },
      dragExpand: function(evt) {
        if (!this.canvas.design.modeIsApp()) {
          this.canvas.dragItem(evt, {
            onDrop: this.onDropExpand
          });
        }
        return false;
      },
      onDropExpand: function(evt, dataTransfer) {
        var ExpandedAsgModel, item, originalAsg, res, target;
        item = dataTransfer.item;
        originalAsg = item.model;
        if (originalAsg.type === "ExpandedAsg") {
          originalAsg = originalAsg.get("originalAsg");
        }
        target = dataTransfer.parent.model;
        ExpandedAsgModel = Design.modelClassForType("ExpandedAsg");
        res = new ExpandedAsgModel({
          x: dataTransfer.x,
          y: dataTransfer.y,
          parent: target,
          originalAsg: originalAsg
        });
        if (res && res.id) {
          return;
        }
        notification('error', sprintf(lang.CANVAS.ERR_DROP_ASG, originalAsg.get("name"), target.parent().get("name")));
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = svg.group().add([svg.rect(129, 129).move(1, 1).radius(5).classes("asg-group"), svg.use("asg_frame", true).classes("asg-frame"), svg.use("asg_prompt", true).classes("asg-prompt"), svg.use("asg_dragger").classes("asg-dragger tooltip").attr("data-tooltip", lang.CANVAS.CVS_TIP_ASG_DRAGGER), svg.plain("").move(4, 14).classes('group-label')]).attr({
          "data-id": this.cid
        }).classes('canvasel ' + this.type.split(".").join("-"));
        this.canvas.appendAsg(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      getLc: function() {
        return this.model.getLc();
      },
      labelWidth: function(width) {
        return (width || this.size().width * CanvasView.GRID_WIDTH) - 22;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children("text"));
      },
      updateConnections: function() {
        var cn, lc, _i, _len, _ref;
        lc = this.model.getLc();
        if (!lc) {
          return;
        }
        _ref = this.canvas.getItem(lc.id).connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          cn.update();
        }
      },
      destroy: function(selectedDomElement) {
        var substitute, x, y;
        substitute = this.model.get("expandedList");
        if (substitute && substitute[0]) {
          substitute = substitute[0];
          substitute.parent().addChild(this.model);
          x = substitute.get("x");
          y = substitute.get("y");
          substitute.remove();
          this.moveBy(x - this.model.get("x"), y - this.model.get("y"));
          this.model.set({
            x: x,
            y: y
          });
          return;
        }
        return CanvasElement.prototype.destroy.apply(this, arguments);
      }
    }, {
      createResource: function(type, attr, option) {
        var asgModel, lcId;
        if (attr.lcId) {
          lcId = attr.lcId;
          delete attr.lcId;
        }
        attr.x += 1;
        attr.y += 1;
        asgModel = CanvasElement.createResource(type, attr, option);
        asgModel.setLc(lcId);
        return asgModel;
      }
    });
    CeAsg.extend({

      /* env:dev                                             env:dev:end */
      type: "ExpandedAsg",
      listenModelEvents: function() {
        this.listenTo(this.model.get("originalAsg"), "change:name", this.render);
      },
      label: function() {
        return (this.model.get("originalAsg") || this.model).get("name");
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children("text"));
      }
    });
    return CeAsg;
  });

}).call(this);
