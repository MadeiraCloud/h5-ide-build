(function() {
  define(["./TplSvgDef", "./CanvasElement", "./CanvasManager", "Design", "i18n!/nls/lang.js", "UI.modalplus", "event", "backbone", "UI.nanoscroller", "svg"], function(SvgDefTpl, CanvasElement, CanvasManager, Design, lang, Modal, ide_event) {
    var CanvasView;
    $(SvgDefTpl()).appendTo("body");
    CanvasView = Backbone.View.extend({
      events: {
        "click .icon-resize-down": "expandHeight",
        "click .icon-resize-up": "shrinkHeight",
        "click .icon-resize-right": "expandWidth",
        "click .icon-resize-left": "shrinkWidth",
        "click .canvasel": "selectItemByClick",
        "click .line": "selectItemByClick",
        "click svg": "deselectItem",
        "addItem_dragover": "__addItemDragOver",
        "addItem_dragleave": "__addItemDragLeave",
        "addItem_drop": "__addItemDrop",
        "mousedown .canvasel": "__moveItemMouseDown",
        "mousedown .group-label": "__moveItemMouseDown",
        "mousedown .group-resizer": "__resizeGroupDown",
        "mousedown .port": "__drawLineDown",
        "mouseenter .canvasel": "__hoverEl",
        "mouseleave .canvasel": "__hoverOutEl",
        "mousedown svg": "__dragCanvasMouseDown"
      },
      initialize: function(options) {
        var canvasSize;
        this.workspace = options.workspace;
        this.design = this.workspace.design;
        this.parent = options.parent;
        this.listenTo(this.design, Design.EVENT.Deserialized, this.reload);
        this.listenTo(this.design, Design.EVENT.AddResource, this.addItem);
        this.listenTo(this.design, Design.EVENT.RemoveResource, this.removeItem);
        this.setElement(this.parent.$el.find(".OEPanelCenter"), false);
        this.svg = SVG(this.$el.find("svg")[0]);
        canvasSize = this.size();
        this.__getCanvasView().css({
          width: canvasSize[0] * CanvasView.GRID_WIDTH,
          height: canvasSize[1] * CanvasView.GRID_HEIGHT
        });
        this.$el.nanoScroller();
        this.switchMode("stack");
        this.__popupCache = {};
        this.__itemMap = {};
        this.__scale = 1;
        this.__linestyle = parseInt(localStorage.getItem("canvas/lineStyle")) || 0;
        this.reload();
      },
      isReadOnly: function() {
        return false;
      },
      remove: function() {
        var id, item, popup, type, _ref, _ref1;
        _ref = this.__popupCache;
        for (type in _ref) {
          popup = _ref[type];
          if (popup) {
            popup.remove();
          }
        }
        _ref1 = this.__itemMap;
        for (id in _ref1) {
          item = _ref1[id];
          item.remove();
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      updateSize: function() {
        var self;
        self = this;
        return setTimeout(function() {
          return self.$el.nanoScroller();
        }, 150);
      },
      __appendSvg: function(svgEl, layer) {
        svgEl.node.instance = svgEl;
        $(this.svg.node).children(layer).append(svgEl.node);
        return svgEl;
      },
      __getCanvasView: function() {
        return this.$el.children().children(".canvas-view");
      },
      appendLine: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_line");
      },
      appendNode: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_node");
      },
      switchMode: function(mode) {
        console.assert("stack app appedit".indexOf(mode) >= 0);
        this.__getCanvasView().attr("data-mode", mode);
        this.clearPopups();
        this.trigger("switchMode", mode);
      },
      registerPopup: function(type, popup, unregister) {
        var oldPopup;
        oldPopup = this.__popupCache[type];
        if (unregister) {
          if (oldPopup === popup) {
            delete this.__popupCache[type];
          }
        } else {
          if (oldPopup && oldPopup !== popup) {
            oldPopup.remove();
          }
          this.__popupCache[type] = popup;
        }
      },
      clearPopups: function() {
        var popup, type, _ref;
        _ref = this.__popupCache;
        for (type in _ref) {
          popup = _ref[type];
          popup.remove();
        }
        this.__popupCache = {};
      },
      canvasRect: function() {
        var s;
        s = this.size();
        return {
          x1: 3,
          y1: 1,
          x2: s[0] - 3,
          y2: s[1] - 1
        };
      },
      isRectAvailableForItem: function(subRect, item) {
        var ch, children, parentRect, _i, _len;
        if (item.parent()) {
          parentRect = item.parent().rect();
          children = item.parent().children();
        } else {
          parentRect = this.canvasRect();
          children = this.__itemTopLevel;
        }
        parentRect.x1 += 1;
        parentRect.y1 += 1;
        parentRect.x2 -= 1;
        parentRect.y2 -= 1;
        if (parentRect.x1 > subRect.x1 || parentRect.y1 > subRect.y1 || parentRect.x2 < subRect.x2 || parentRect.y2 < subRect.y2) {
          return false;
        }
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          ch = children[_i];
          if (ch === item) {
            continue;
          }
          parentRect = ch.rect();
          if (!(parentRect.x1 >= subRect.x2 || parentRect.x2 <= subRect.x1 || parentRect.y1 >= subRect.y2 || parentRect.y2 <= subRect.y1)) {
            return false;
          }
        }
        return true;
      },
      moveSelectedItem: function(deltaX, deltaY) {
        var item, rect;
        if (this.isReadOnly()) {
          return;
        }
        item = this.getSelectedItem();
        if (!item) {
          return;
        }
        rect = item.effectiveRect();
        rect.x1 += deltaX;
        rect.y1 += deltaY;
        rect.x2 += deltaX;
        rect.y2 += deltaY;
        if (this.isRectAvailableForItem(rect, item)) {
          item.moveBy(deltaX, deltaY);
        }
      },
      getSelectedItem: function() {
        if (!this.__selected) {
          return null;
        }
        return this.getItem(this.__selected.getAttribute("data-id"));
      },
      getSelectedComp: function() {
        var _ref;
        return (_ref = this.getSelectedItem()) != null ? _ref.model : void 0;
      },
      delSelectedItem: function() {
        if (this.isReadOnly() || !this.__selected) {
          return;
        }
        return this.getItem(this.__selected.getAttribute("data-id")).destroy(this.__selected);
      },
      deleteItem: function(itemOrId) {
        if (_.isString(itemOrId)) {
          itemOrId = this.getItem(itemOrId);
        }
        if (!itemOrId) {
          return;
        }
        return itemOrId.destroy();
      },
      selectPrevItem: function() {
        var idx, nodes;
        nodes = $(this.svg.node).find(".canvasel:not(.group)");
        idx = this.__selected ? [].indexOf.call(nodes, this.__selected) - 1 : null;
        if (idx === null || idx < 0) {
          idx = nodes.length - 1;
        }
        return this.selectItem(nodes[idx]);
      },
      selectNextItem: function() {
        var idx, nodes;
        nodes = $(this.svg.node).find(".canvasel:not(.group)");
        idx = this.__selected ? [].indexOf.call(nodes, this.__selected) + 1 : null;
        if (idx === null || idx >= nodes.length) {
          idx = 0;
        }
        return this.selectItem(nodes[idx]);
      },
      selectItem: function(elementOrId) {
        var item;
        if (_.isString(elementOrId)) {
          elementOrId = this.getItem(elementOrId).$el[0];
        }
        if (!elementOrId) {
          return;
        }
        if (this.__selected) {
          CanvasManager.removeClass(this.__selected, "selected");
          this.__selected = null;
        }
        this.__selected = elementOrId;
        CanvasManager.addClass(this.__selected, "selected");
        item = this.getItem(this.__selected.getAttribute("data-id"));
        item.select(this.__selected);
      },
      selectItemByClick: function(evt) {
        this.selectItem(evt.currentTarget);
        return false;
      },
      deselectItem: function(silent) {
        if (this.__selected) {
          CanvasManager.removeClass(this.__selected, "selected");
          this.__selected = null;
        }
        if (silent !== true) {
          ide_event.trigger(ide_event.OPEN_PROPERTY);
        }
      },
      clearItems: function() {
        var id, item, _ref;
        _ref = this.__itemMap;
        for (id in _ref) {
          item = _ref[id];
          item.remove();
        }
        this.__itemMap = {};
      },
      lineStyle: function() {
        return this.__linestyle;
      },
      updateLineStyle: function() {
        var cn, _i, _len, _ref, _ref1;
        this.__linestyle = parseInt(localStorage.getItem("canvas/lineStyle")) || 0;
        CanvasManager.toggle($(this.svg.node).children(".layer_sgline"), this.__linestyle !== 4);
        if (this.__linestyle !== 4) {
          _ref = Design.modelClassForType("SgRuleLine").allObjects();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cn = _ref[_i];
            if ((_ref1 = this.getItem(cn.id)) != null) {
              _ref1.update();
            }
          }
        }
      },
      zoomOut: function() {
        return this.zoom(0.2);
      },
      zoomIn: function() {
        return this.zoom(-0.2);
      },
      zoom: function(delta) {
        var realH, realW, scale, size;
        scale = Math.round((this.__scale + delta) * 10) / 10;
        if (scale < 1 || scale > 1.6) {
          return;
        }
        this.__scale = scale;
        size = this.size();
        realW = size[0] * CanvasView.GRID_WIDTH;
        realH = size[1] * CanvasView.GRID_HEIGHT;
        this.__getCanvasView().css({
          width: size[0] * CanvasView.GRID_WIDTH / scale,
          height: size[1] * CanvasView.GRID_HEIGHT / scale
        }).attr("data-scale", scale).children("svg")[0].setAttribute("viewBox", "0 0 " + realW + " " + realH);
        this.$el.nanoScroller();
      },
      size: function() {
        return this.design.get("canvasSize");
      },
      scale: function() {
        return this.__scale;
      },
      expandHeight: function() {
        return this.resize("height", 60);
      },
      shrinkHeight: function() {
        return this.resize("height", -60);
      },
      expandWidth: function() {
        return this.resize("width", 60);
      },
      shrinkWidth: function() {
        return this.resize("width", -60);
      },
      resize: function(dimension, delta) {
        var bbox, realH, realW, scale, size, wrapper;
        size = this.size();
        scale = this.scale();
        size[dimension === "width" ? 0 : 1] += delta;
        wrapper = this.__getCanvasView();
        realW = size[0] * CanvasView.GRID_WIDTH;
        realH = size[1] * CanvasView.GRID_HEIGHT;
        if (delta > 0) {
          wrapper.children(".icon-resize-up, .icon-resize-left").show();
        } else {
          bbox = wrapper.children("svg")[0].getBBox();
          if (bbox.width + bbox.x + 20 >= realW) {
            realW = bbox.width + bbox.x + 20;
            size[0] = realW / CanvasView.GRID_WIDTH;
            wrapper.children(".icon-resize-left").hide();
          }
          if (bbox.height + bbox.y + 20 >= realH) {
            realH = bbox.height + bbox.y + 20;
            size[1] = realH / CanvasView.GRID_HEIGHT;
            wrapper.children(".icon-resize-up").hide();
          }
        }
        this.design.set("canvasSize", size);
        wrapper.css({
          width: realW / scale,
          height: realH / scale
        }).children("svg")[0].setAttribute("viewBox", "0 0 " + realW + " " + realH);
        this.$el.nanoScroller();
      },
      reload: function() {
        var ItemClass, comp, lines, t, types, _i, _len;
        console.log("Reloading svg canvas.");
        this.clearPopups();
        this.clearItems();
        this.initializing = true;
        this.recreateStructure();
        this.__itemLineMap = {};
        this.__itemNodeMap = {};
        this.__itemTopLevel = [];
        lines = [];
        types = {};
        this.design.eachComponent(function(comp) {
          if (comp.node_line) {
            lines.push(comp);
          } else {
            this.addItem(comp);
          }
          types[comp.type] = true;
        }, this);
        for (t in types) {
          ItemClass = CanvasElement.getClassByType(t);
          if (ItemClass && ItemClass.render) {
            ItemClass.render(this);
          }
        }
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          comp = lines[_i];
          this.addItem(comp, true);
        }
        this.initializing = false;
      },
      __batchAddLines: function() {
        var e, lineModel, _i, _len, _ref;
        _ref = this.__toAddLines;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lineModel = _ref[_i];
          try {
            this.addItem(lineModel, true);
          } catch (_error) {
            e = _error;
            console.error(e);
          }
        }
        this.__toAddLines = null;
      },
      addItem: function(resourceModel, isScheduled) {
        var ItemClass, item, self;
        ItemClass = CanvasElement.getClassByType(resourceModel.type);
        if (!ItemClass) {
          return;
        }
        if (!resourceModel.isVisual()) {
          return;
        }
        if (resourceModel.node_line && !isScheduled) {
          if (!this.__toAddLines) {
            this.__toAddLines = [resourceModel];
            self = this;
            _.defer(function() {
              return self.__batchAddLines();
            });
          } else {
            this.__toAddLines.push(resourceModel);
          }
          return;
        }
        item = new ItemClass({
          model: resourceModel,
          canvas: this
        });
        if (!item.cid) {
          return;
        }
        this.__itemMap[resourceModel.id] = item;
        this.__itemMap[item.cid] = item;
        if (item.isTopLevel()) {
          this.__itemTopLevel[item.isGroup() ? "push" : "unshift"](item);
        }
        if (resourceModel.node_line) {
          this.__itemLineMap[item.cid] = item;
        } else if (!resourceModel.node_group) {
          this.__itemNodeMap[item.cid] = item;
        }
      },
      removeItem: function(resourceModel) {
        var idx, item;
        item = this.getItem(resourceModel.id);
        if (!item) {
          return;
        }
        if (this.getSelectedItem() === item) {
          this.deselectItem();
        }
        delete this.__itemMap[resourceModel.id];
        delete this.__itemMap[item.cid];
        delete this.__itemLineMap[item.cid];
        delete this.__itemNodeMap[item.cid];
        idx = this.__itemTopLevel.indexOf(item);
        if (idx >= 0) {
          this.__itemTopLevel.splice(idx, 1);
        }
        item.remove();
        item.canvas = null;
      },
      getItem: function(id) {
        return this.__itemMap[id];
      },
      update: function() {
        var id, item, _ref;
        _ref = this.__itemNodeMap;
        for (id in _ref) {
          item = _ref[id];
          item.render();
        }
      },
      __hoverEl: function(evt) {
        var _ref;
        return (_ref = this.getItem(evt.currentTarget.getAttribute("data-id"))) != null ? _ref.hover(evt) : void 0;
      },
      __hoverOutEl: function(evt) {
        var _ref;
        return (_ref = this.getItem(evt.currentTarget.getAttribute("data-id"))) != null ? _ref.hoverOut(evt) : void 0;
      },
      __localToCanvasCoor: function(x, y) {
        var sc;
        sc = this.$el.children(":first-child")[0];
        return {
          x: Math.round((x + sc.scrollLeft) / CanvasView.GRID_WIDTH * this.__scale),
          y: Math.round((y + sc.scrollTop) / CanvasView.GRID_HEIGHT * this.__scale)
        };
      },
      __itemAtPos: function(coord) {
        var child, children, chs, context, _i, _len;
        children = this.__itemTopLevel;
        context = null;
        while (children) {
          chs = children;
          children = null;
          for (_i = 0, _len = chs.length; _i < _len; _i++) {
            child = chs[_i];
            if (!child.containPoint(coord.x, coord.y, true)) {
              continue;
            }
            if (!child.isGroup()) {
              return child;
            }
            context = child;
            children = child.children(true);
            break;
          }
        }
        return context;
      },
      __groupAtCoor: function(coord, excludeSubject) {
        var child, children, chs, context, _i, _len;
        children = this.__itemTopLevel;
        context = null;
        while (children) {
          chs = children;
          children = null;
          for (_i = 0, _len = chs.length; _i < _len; _i++) {
            child = chs[_i];
            if (!child.isGroup()) {
              continue;
            }
            if (child === excludeSubject) {
              continue;
            }
            if (!child.containPoint(coord.x, coord.y)) {
              continue;
            }
            context = child;
            children = child.children();
            break;
          }
        }
        return context;
      },
      __clearDragScroll: function() {
        if (this.__dragScrollInt) {
          console.info("Removed drag scroll timer");
          clearInterval(this.__dragScrollInt);
          this.__dragScrollInt = null;
        }
      },
      __scrollOnDrag: function(data) {
        var DETECT_SIZE, SCROLL_SIZE, continuous, dimension, scrollContent, scrollLeft, scrollTop, scrollX, scrollY, self;
        dimension = data.zoneDimension;
        if (!dimension) {
          return;
        }
        scrollContent = this.$el.children(":first-child")[0];
        scrollLeft = scrollContent.scrollLeft;
        scrollTop = scrollContent.scrollTop;
        DETECT_SIZE = 50;
        SCROLL_SIZE = 10;
        if (data.pageX - dimension.x1 <= DETECT_SIZE) {
          if (scrollLeft > SCROLL_SIZE) {
            continuous = true;
            scrollX = scrollLeft - SCROLL_SIZE;
          } else if (scrollLeft > 0) {
            scrollX = "0";
          }
        } else if (dimension.x2 - data.pageX <= DETECT_SIZE) {
          continuous = true;
          scrollX = scrollLeft + SCROLL_SIZE;
        }
        if (data.pageY - dimension.y1 <= DETECT_SIZE) {
          if (scrollTop > SCROLL_SIZE) {
            continuous = true;
            scrollY = scrollTop - SCROLL_SIZE;
          } else if (scrollTop > 0) {
            scrollY = "0";
          }
        } else if (dimension.y2 - data.pageY <= DETECT_SIZE) {
          continuous = true;
          scrollY = scrollTop + SCROLL_SIZE;
        }
        if (scrollX !== void 0) {
          this.$el.nanoScroller({
            scrollLeft: scrollX
          });
        }
        if (scrollY !== void 0) {
          this.$el.nanoScroller({
            scrollTop: scrollY
          });
        }
        if (continuous) {
          if (!this.__dragScrollInt) {
            self = this;
            console.info("Added drag scroll timer");
            this.__dragScrollInt = setInterval(function() {
              return self.__scrollOnDrag(data);
            }, 50);
          }
        } else {
          this.__clearDragScroll();
        }
      }

      /*
       * Connect lines ( Implemented in CanvasViewConnect )
      __drawLineDown : ( evt )->
      __connect : ( LineClass, comp1, comp2, startItem )->
      __popLineInitiator : ()->
       */

      /*
       * Resize ( Implemented in CanvasViewGResizer )
      __resizeGroupDown : ( evt )->
       */

      /*
       * Drop to add ( Implemented in CanvasViewDnd )
      dragItem : ()->
      __addItemDragOver : ( evt )->
      __addItemDragLeave : ( evt )->
      __addItemDrop : ( evt )->
      __bestFitRect : ()->
      __moveItemMouseDown : ( evt )->
       */
    }, {
      GRID_WIDTH: 10,
      GRID_HEIGHT: 10
    });
    CanvasElement.setCanvasViewClass(CanvasView);
    return CanvasView;
  });

}).call(this);
