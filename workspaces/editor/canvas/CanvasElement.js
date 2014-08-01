(function() {
  define(["Design", "./CanvasManager", "i18n!/nls/lang.js", "UI.modalplus", "event", "backbone", "svg"], function(Design, CanvasManager, lang, Modal, ide_event) {
    var CanvasElement, CanvasView, SubElements, __detailExtend;
    CanvasView = null;
    __detailExtend = Backbone.Model.extend;

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 env:dev:end */
    SubElements = {};
    CanvasElement = Backbone.View.extend({
      _ensureElement: function() {
        if (!this.$el) {
          this.$el = $();
        }
      },
      initialize: function(options) {
        this.canvas = options.canvas;
        this.addView(this.create());
        this.render();
        this.listenTo(this.model, "change:name", this.render);
        this.listenModelEvents();
        this.ensureStickyPos();
      },
      listenModelEvents: function() {},
      addView: function(dom) {
        if (!dom) {
          return this;
        }
        this.$el = this.$el.add(dom.node ? dom.node : dom);
        this.delegateEvents();
        return this;
      },
      removeView: function(dom) {
        if (!dom) {
          return this;
        }
        if (dom.node) {
          dom = dom.node;
        }
        this.undelegateEvents();
        this.$el = this.$el.not(dom);
        $(dom).remove();
        this.delegateEvents();
        return this;
      },
      portDirection: function(portName) {
        if (this.portDirMap) {
          return this.portDirMap[portName];
        } else {
          return null;
        }
      },
      portPosition: function(portName) {
        if (this.portPosMap) {
          return this.portPosMap[portName];
        } else {
          return null;
        }
      },
      hover: function(evt) {
        var cn, _i, _len, _ref;
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          CanvasManager.addClass(cn.$el, "hover");
        }
      },
      hoverOut: function(evt) {
        var cn, _i, _len, _ref;
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          CanvasManager.removeClass(cn.$el, "hover");
        }
      },
      create: function() {},
      render: function() {},
      size: function() {
        var bbox;
        if (this.model.width && this.model.width()) {
          return {
            width: this.model.width(),
            height: this.model.height()
          };
        } else if (this.defaultSize) {
          return {
            width: this.defaultSize[0],
            height: this.defaultSize[1]
          };
        } else {
          bbox = this.$el[0].getBBox();
          console.warn("Accessing CanvasElement's size by getBBox(), should implement defaultSize", this);
          return {
            width: bbox.width,
            height: bbox.height
          };
        }
      },
      pos: function(el) {
        var elId, item, x, y;
        x = this.model.x();
        y = this.model.y();
        if (el) {
          el = el.parentNode;
          while (el) {
            elId = el.getAttribute("data-id");
            item = this.canvas.getItem(elId);
            if (item) {
              x += item.model.x();
              y += item.model.y();
            } else {
              break;
            }
            el = el.parentNode;
          }
        }
        return {
          x: x,
          y: y
        };
      },
      containPoint: function(px, py, includeStickyChildren) {
        var i, rect, testRects, _i, _j, _len, _len1, _ref;
        testRects = [this.rect()];
        if (includeStickyChildren) {
          _ref = this.children(true);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.sticky) {
              testRects.push(i.rect());
            }
          }
        }
        for (_j = 0, _len1 = testRects.length; _j < _len1; _j++) {
          rect = testRects[_j];
          if (rect.x1 <= px && rect.y1 <= py && rect.x2 >= px && rect.y2 >= py) {
            return true;
          }
        }
        return false;
      },
      rect: function(el) {
        var pos, size;
        size = this.size();
        pos = this.pos(el);
        return {
          x1: pos.x,
          y1: pos.y,
          x2: pos.x + size.width,
          y2: pos.y + size.height
        };
      },
      effectiveRect: function() {
        var rect;
        rect = this.rect();
        if (this.isGroup()) {
          rect.x1 -= 1;
          rect.y1 -= 1;
          rect.x2 += 1;
          rect.y2 += 1;
        }
        return rect;
      },
      ensureStickyPos: function(newX, newY) {
        var constrain, prect, size, x, y;
        if (!this.sticky) {
          return;
        }
        size = this.size();
        prect = this.parent().rect();
        constrain = function(v, v1, v2) {
          if (v <= v1) {
            return v1;
          }
          if (v >= v2) {
            return v2;
          }
          return v;
        };
        x = newX || this.model.x();
        y = newY || this.model.y();
        if (x < 0) {
          x = Math.round((prect.x2 - prect.x1 - size.width) / 2);
        }
        if (y < 0) {
          y = Math.round((prect.y2 - prect.y1 - size.height) / 2);
        }
        x = constrain(x, prect.x1, prect.x2 - size.width);
        y = constrain(y, prect.y1, prect.y2 - size.height);
        switch (this.sticky) {
          case "left":
            x = prect.x1 - Math.round(size.width / 2);
            break;
          case "right":
            x = prect.x2 - Math.round(size.width / 2);
            break;
          case "top":
            y = prect.y1 - Math.round(size.height / 2);
            break;
          case "bottom":
            y = prect.y2 - Math.round(size.height / 2);
        }
        if (this.model.attributes.x === x && this.model.attributes.y === y) {
          return;
        }
        this.model.attributes.x = x;
        this.model.attributes.y = y;
        this.$el[0].instance.move(x * CanvasView.GRID_WIDTH, y * CanvasView.GRID_HEIGHT);
        this.updateConnections();
      },
      initNode: function(node, x, y) {
        var cc, child, name, pos, _i, _len, _ref;
        node.move(x * CanvasView.GRID_WIDTH, y * CanvasView.GRID_HEIGHT);
        _ref = node.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          cc = child.node;
          if (cc.tagName.toLowerCase() !== "path") {
            continue;
          }
          name = child.attr("data-alias") || child.attr("data-name");
          if (name) {
            pos = this.portPosition(name);
            if (pos) {
              child.move(pos[0], pos[1]);
            }
          }
        }
        return null;
      },
      createNode: function(option) {
        var el, height, m, size, svg, width, x, y;
        m = this.model;
        size = this.size();
        x = m.x();
        y = m.y();
        width = size.width * CanvasView.GRID_WIDTH;
        height = size.height * CanvasView.GRID_HEIGHT;
        svg = this.canvas.svg;
        el = svg.group();
        el.add([svg.rect(width, height).radius(5).classes("node-background"), svg.image(MC.IMG_URL + option.image, option.imageW, option.imageH).move(option.imageX, option.imageY)]).attr({
          "data-id": this.cid
        }).classes('canvasel ' + this.type.replace(/\./g, "-"));
        if (option.labelBg) {
          el.add(svg.use("label_path").classes("node-label-name-bg"));
        }
        if (option.label) {
          el.add(svg.plain(option.label).move(width / 2, height - 4).classes("node-label"));
        }
        if (option.sg) {
          el.add(svg.group().add([svg.rect(7, 5).move(10, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(20, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(30, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(40, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(50, 6).classes('node-sg-color-border tooltip')]).classes("node-sg-color-group").move(8, 63));
        }
        return el;
      },
      createGroup: function() {
        var el, height, m, pad, svg, width, x, y;
        m = this.model;
        x = m.x();
        y = m.y();
        width = m.width() * CanvasView.GRID_WIDTH;
        height = m.height() * CanvasView.GRID_HEIGHT;
        pad = 10;
        svg = this.canvas.svg;
        el = svg.group();
        return el.add([svg.rect(width, height).radius(5).classes("group"), svg.rect(width - 2 * pad, pad).x(pad).classes("group-resizer top"), svg.rect(pad, height - 2 * pad).y(pad).classes("group-resizer left"), svg.rect(pad, height - 2 * pad).move(width - pad, pad).classes("group-resizer right"), svg.rect(width - 2 * pad, pad).move(pad, height - pad).classes("group-resizer bottom"), svg.rect(pad, pad).classes("group-resizer top-left"), svg.rect(pad, pad).x(width - pad).classes('group-resizer top-right'), svg.rect(pad, pad).y(height - pad).classes("group-resizer bottom-left"), svg.rect(pad, pad).move(width - pad, height - pad).classes("group-resizer bottom-right"), svg.text("").move(5, 15).classes("group-label")]).attr({
          "data-id": this.cid
        }).classes("canvasel group " + this.type.replace(/\./g, "-"));
      },
      isGroup: function() {
        return !!this.model.node_group;
      },
      isTopLevel: function() {
        if (!this.model.parent) {
          return false;
        }
        if (this.model.parent()) {
          return false;
        }
        return true;
      },
      parent: function() {
        var p;
        p = this.model.parent();
        if (p) {
          return this.canvas.getItem(p.id);
        } else {
          return null;
        }
      },
      children: function(includeStickyChildren) {
        var canvas, ch, i, items, _i, _len, _ref;
        if (!this.model.node_group) {
          return [];
        }
        canvas = this.canvas;
        items = [];
        _ref = this.model.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          i = canvas.getItem(ch.id);
          if (!i) {
            continue;
          }
          if (i.sticky && !includeStickyChildren) {
            continue;
          }
          items.push(i);
        }
        return items;
      },
      siblings: function(includeStickyChildren) {
        var idx, s;
        s = this.parent().children(includeStickyChildren);
        idx = s.indexOf(this);
        if (idx >= 0) {
          s.splice(idx, 1);
        }
        return s;
      },
      connections: function() {
        var cn, cnns, _i, _len, _ref;
        cnns = [];
        _ref = this.model.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          cn = this.canvas.getItem(cn.id);
          if (cn && cn.node_line) {
            cnns.push(cn);
          }
        }
        return cnns;
      },
      isConnectable: function(fromPort, toId, toPort) {
        var C, p1Comp, p2Comp, t, _i, _len, _ref;
        C = Design.modelClassForPorts(fromPort, toPort);
        if (!C) {
          return false;
        }
        p1Comp = this.model;
        p2Comp = this.model.design().component(toId);
        _ref = p1Comp.connectionTargets(C.prototype.type);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (t === p2Comp) {
            return false;
          }
        }
        return C.isConnectable(p1Comp, p2Comp) !== false;
      },
      select: function(selectedDomElement) {
        ide_event.trigger(ide_event.OPEN_PROPERTY, this.type, this.model.id);
      },
      destroy: function(selectedDomElement) {
        var canvas, modal, model, name, result, self;
        if (this.model.isRemoved()) {
          this.$el.remove();
          this.$el = $();
          return;
        }
        canvas = this.canvas;
        result = this.isDestroyable();
        model = this.model;
        name = model.get("name");
        if (result === true && model.node_group && model.children().length > 0) {
          result = sprintf(lang.ide.CVS_CFM_DEL_GROUP, name);
        }
        if (_.isString(result)) {
          self = this;
          modal = new Modal({
            title: sprintf(lang.ide.CVS_CFM_DEL, name),
            template: result,
            confirm: {
              text: lang.ide.CFM_BTN_DELETE,
              color: "red"
            },
            onConfirm: function() {
              self.doDestroyModel();
              modal.close();
            }
          });
        } else if (result.error) {
          notification("error", result.error);
        } else if (result === true) {
          this.doDestroyModel();
        }
      },
      doDestroyModel: function() {
        return this.model.remove();
      },
      isDestroyable: function(selectedDomElement) {
        var ch, result, _i, _len, _ref;
        result = this.model.isRemovable();
        if (result !== true) {
          return result;
        }
        if (this.model.node_group) {
          _ref = this.children();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ch = _ref[_i];
            result = ch.isDestroyable();
            if (result !== true) {
              break;
            }
          }
        }
        return result;
      },
      isClonable: function() {
        return !!this.model.clone;
      },
      cloneTo: function(parent, x, y) {
        var model, name, nameMatch, self;
        if (!this.model.clone) {
          return;
        }
        name = this.model.get("name");
        nameMatch = name.match(/(.+-copy)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-copy";
        }
        model = CanvasElement.getClassByType(this.type).createResource(this.type, {
          parent: parent.model,
          name: name,
          x: x,
          y: y
        }, {
          cloneSource: this.model
        });
        if (model && model.id) {
          self = this;
          _.defer(function() {
            return self.canvas.selectItem(model.id);
          });
        }
      },
      changeParent: function(newParent, x, y) {
        var parentModel, res;
        if ((this.parent() || null) === newParent) {
          if (this.model.x() === x && this.model.y() === y) {
            return;
          }
          this.moveBy(x - this.model.x(), y - this.model.y());
          return;
        }
        if (this.model.get("appId")) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
          return;
        }
        if (!this.parent() && newParent) {
          return;
        }
        parentModel = newParent.model;
        res = this.model.isReparentable(parentModel);
        if (_.isString(res)) {
          notification("error", res);
          return;
        }
        if (res === true) {
          parentModel.addChild(this.model);
          this.moveBy(x - this.model.x(), y - this.model.y());
        }
      },
      moveBy: function(deltaX, deltaY) {
        var ch, _i, _len, _ref;
        if (this.isGroup()) {
          _ref = this.children(true);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ch = _ref[_i];
            ch.moveBy(deltaX, deltaY);
          }
        }
        deltaX += this.model.x();
        deltaY += this.model.y();
        this.model.set({
          x: deltaX,
          y: deltaY
        });
        this.$el[0].instance.move(deltaX * CanvasView.GRID_WIDTH, deltaY * CanvasView.GRID_HEIGHT);
        this.updateConnections();
      },
      updateConnections: function() {
        var cn, _i, _len, _ref;
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          cn.update();
        }
      }
    }, {
      isDirectParentType: function(type) {
        return true;
      },
      createResource: function(type, attributes, options) {
        var Model;
        Model = Design.modelClassForType(type);
        return new Model(attributes, options);
      },
      getClassByType: function(type) {
        return SubElements[type];
      },
      extend: function(protoProps, staticProps) {
        var subClass;
        console.assert(protoProps.type, "Subclass of CanvasElement does not specifying a type");
        staticProps = staticProps || {};
        staticProps.type = protoProps.type;
        subClass = __detailExtend.call(this, protoProps, staticProps);
        SubElements[protoProps.type] = subClass;
        return subClass;
      }
    });
    CanvasElement.constant = {
      PORT_RIGHT_ANGLE: 0,
      PORT_UP_ANGLE: 90,
      PORT_LEFT_ANGLE: 180,
      PORT_DOWN_ANGLE: 270
    };
    CanvasElement.setCanvasViewClass = function(c) {
      CanvasView = c;
    };
    return CanvasElement;
  });

}).call(this);
