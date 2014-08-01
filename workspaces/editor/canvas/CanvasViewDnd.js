(function() {
  define(["./CanvasView", "./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasView, CanvasElement, constant, CanvasManager, lang) {
    var CanvasViewProto, ________visualizeBestfit, ________visualizeOnMove, __cancelCanvasDrag, __canvasDrag, __expandRect, __findFits, __isContain, __isOverlap, __isRectEmpty, __moveItemDidDrop, __moveItemDrag, __moveItemDrop, __moveItemStart, __moveStickyItemDrag, __moveStickyItemDrop, __moveStickyItemStart, __parentBorderLimit, __rectHeight, __rectWidth;
    ________visualizeOnMove = function() {};
    ________visualizeBestfit = function() {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 env:dev:end */
    CanvasViewProto = CanvasView.prototype;
    CanvasViewProto.__addItemDragOver = function(evt, data) {
      var ItemClass, group, parentType;
      this.__scrollOnDrag(data);
      group = this.__groupAtCoor(this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1));
      if (group) {
        ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
        parentType = ItemClass.prototype.parentType;
        if (!parentType || parentType.indexOf(group.type) === -1) {
          group = null;
        }
      }
      if (group !== this.__dragHoverGroup) {
        if (this.__dragHoverGroup) {
          CanvasManager.removeClass(this.__dragHoverGroup.$el, "droppable");
        }
        if (group) {
          CanvasManager.addClass(group.$el, "droppable");
        }
        this.__dragHoverGroup = group;
        data.shadow.toggleClass("autoparent", !!(group && !ItemClass.isDirectParentType(group.type)));
      }
      ________visualizeOnMove.call(this, data);
    };
    CanvasViewProto.__addItemDragLeave = function() {
      this.__clearDragScroll();
      if (this.__dragHoverGroup) {
        CanvasManager.removeClass(this.__dragHoverGroup.$el, "droppable");
        return this.__dragHoverGroup = null;
      }
    };
    CanvasViewProto.__handleDropData = function(data, excludeChild, parentMustBeDirect) {
      var ItemClass, ItemClassProto, dropPos, dropRect, group, groupType;
      if (!data.zoneDimension) {
        return "";
      }
      ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
      ItemClassProto = ItemClass.prototype;
      group = this.__groupAtCoor(this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1), excludeChild);
      groupType = group ? group.type : "SVG";
      if ((parentMustBeDirect && !ItemClass.isDirectParentType(groupType)) || (ItemClassProto.parentType || []).indexOf(groupType) === -1) {
        return this.errorMessageForDrop(ItemClassProto.type) || "";
      }
      dropPos = this.__localToCanvasCoor(data.pageX - data.offsetX - data.zoneDimension.x1, data.pageY - data.offsetY - data.zoneDimension.y1);
      dropRect = {
        x1: dropPos.x,
        y1: dropPos.y,
        x2: dropPos.x + data.itemWidth,
        y2: dropPos.y + data.itemHeight
      };
      if (group && !ItemClass.isDirectParentType(group.type)) {
        dropRect.x1 -= 2;
        dropRect.y1 -= 2;
        dropRect.x2 += 2;
        dropRect.y2 += 2;
      }
      if (!ItemClassProto.sticky) {
        dropRect = this.__bestFitRect(dropRect, group, excludeChild);
        if (!dropRect) {
          return lang.ide.CVS_MSG_WARN_NO_ENOUGH_SPACE;
        }
      }
      return {
        group: group,
        dropRect: dropRect
      };
    };
    CanvasViewProto.__addItemDrop = function(evt, data) {
      var ItemClass, ItemClassProto, attributes, model, result, self;
      ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
      ItemClassProto = ItemClass.prototype;
      data.itemWidth = ItemClassProto.defaultSize[0];
      data.itemHeight = ItemClassProto.defaultSize[1];
      result = this.__handleDropData(data);
      if (_.isString(result)) {
        notification('warning', result, false);
        return;
      }
      attributes = $.extend({
        x: result.dropRect.x1,
        y: result.dropRect.y1,
        width: ItemClassProto.defaultSize[0],
        height: ItemClassProto.defaultSize[1]
      }, data.dataTransfer);
      if (Design.modelClassForType(attributes.type).prototype.node_group) {
        attributes.x += 1;
        attributes.y += 1;
        attributes.width -= 2;
        attributes.height -= 2;
      }
      delete attributes.type;
      if (result.group) {
        attributes.parent = result.group.model;
      }
      model = ItemClass.createResource(ItemClassProto.type, attributes, {
        createByUser: true
      });
      if (model && model.id) {
        self = this;
        _.defer(function() {
          return self.selectItem(model.id);
        });
      }
    };
    __parentBorderLimit = function(rect, parentRect) {
      var r;
      r = $.extend({}, rect);
      if (rect.x1 <= parentRect.x1) {
        r.x2 -= rect.x1 - parentRect.x1 - 1;
        r.x1 = parentRect.x1 + 1;
      } else if (rect.x2 >= parentRect.x2) {
        r.x1 += parentRect.x2 - 1 - rect.x2;
        r.x2 = parentRect.x2 - 1;
      }
      if (rect.y1 <= parentRect.y1) {
        r.y2 -= rect.y1 - parentRect.y1 - 1;
        r.y1 = parentRect.y1 + 1;
      } else if (rect.y2 >= parentRect.y2) {
        r.y1 += parentRect.y2 - 1 - rect.y2;
        r.y2 = parentRect.y2 - 1;
      }
      return r;
    };
    __isOverlap = function(rect1, rect2) {
      return !(rect1.x1 >= rect2.x2 || rect1.x2 <= rect2.x1 || rect1.y1 >= rect2.y2 || rect1.y2 <= rect2.y1);
    };
    __isRectEmpty = function(rect, testArray) {
      var a, _i, _len;
      for (_i = 0, _len = testArray.length; _i < _len; _i++) {
        a = testArray[_i];
        if (!(rect.x1 >= a.x2 || rect.x2 <= a.x1 || rect.y1 >= a.y2 || rect.y2 <= a.y1)) {
          return false;
        }
      }
      return true;
    };
    __isContain = function(subRect, parentRect) {
      return parentRect.x1 <= subRect.x1 && parentRect.y1 <= subRect.y1 && parentRect.x2 >= subRect.x2 && parentRect.y2 >= subRect.y2;
    };
    __rectWidth = function(rect) {
      return rect.x2 - rect.x1;
    };
    __rectHeight = function(rect) {
      return rect.y2 - rect.y1;
    };
    __expandRect = function(rect, dx, dy) {
      rect.x1 -= dx;
      rect.x2 += dx;
      rect.y1 -= dy;
      rect.y2 += dy;
      return rect;
    };
    __findFits = function(rect, height, alignEdges, colliders) {
      var fits, yyy, _i, _j, _len, _len1, _ref, _ref1;
      fits = [];
      _ref = alignEdges.y1;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        yyy = _ref[_i];
        rect.y1 = yyy;
        rect.y2 = yyy + height;
        if (__isRectEmpty(rect, colliders)) {
          fits.push($.extend({}, rect));
        }
      }
      _ref1 = alignEdges.y2;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        yyy = _ref1[_j];
        rect.y2 = yyy;
        rect.y1 = yyy - height;
        if (__isRectEmpty(rect, colliders)) {
          fits.push($.extend({}, rect));
        }
      }
      return fits;
    };
    CanvasViewProto.__bestFitRect = function(rect, group, item) {
      var alignEdges, bb, bestFit, ch, children, colliders, dis, farColliders, fit, fits, halfH, halfW, height, idx, minDis, minDistance, orignalRect, ox, oy, parentRect, rectMethod, width, x1, x2, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;
      if (group) {
        children = group.children();
        parentRect = group.rect();
      } else {
        children = this.__itemTopLevel.slice(0);
        parentRect = this.canvasRect();
      }
      idx = children.indexOf(item);
      if (idx >= 0) {
        children.splice(idx, 1);
      }
      rectMethod = "rect";
      if (item) {
        if (item.isGroup()) {
          rect.x1 -= 1;
          rect.y1 -= 1;
          rect.x2 += 1;
          rect.y2 += 1;
        } else {
          rectMethod = "effectiveRect";
        }
      }
      width = __rectWidth(rect);
      height = __rectHeight(rect);
      halfW = Math.round(width / 2);
      halfH = Math.round(height / 2);
      if (halfW > 12) {
        halfW = 12;
      }
      if (halfH > 12) {
        halfH = 12;
      }
      orignalRect = __parentBorderLimit(rect, parentRect);
      rect = __parentBorderLimit(__expandRect(rect, halfW, halfH), parentRect);
      colliders = [];
      farColliders = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        bb = ch[rectMethod]();
        if (__isOverlap(bb, orignalRect)) {
          colliders.push(bb);
        } else if (__isOverlap(bb, rect)) {
          farColliders.push(bb);
        }
      }
      if (!colliders.length) {
        if (__isContain(orignalRect, parentRect)) {
          bestFit = orignalRect;
        }
      } else {
        colliders = colliders.concat(farColliders);
        alignEdges = {
          x1: [orignalRect.x1],
          x2: [orignalRect.x2],
          y1: [orignalRect.y1],
          y2: [orignalRect.y2]
        };
        for (_j = 0, _len1 = colliders.length; _j < _len1; _j++) {
          ch = colliders[_j];
          if (ch.x1 - width >= rect.x1) {
            alignEdges.x2.push(ch.x1);
          }
          if (ch.y1 - height >= rect.y1) {
            alignEdges.y2.push(ch.y1);
          }
          if (ch.x2 + width <= rect.x2) {
            alignEdges.x1.push(ch.x2);
          }
          if (ch.y2 + height <= rect.y2) {
            alignEdges.y1.push(ch.y2);
          }
        }
        fits = [];
        ox = orignalRect.x1;
        oy = orignalRect.y1;
        _ref = alignEdges.x1;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          x1 = _ref[_k];
          orignalRect.x1 = x1;
          orignalRect.x2 = x1 + width;
          fits = fits.concat(__findFits(orignalRect, height, alignEdges, colliders));
        }
        _ref1 = alignEdges.x2;
        for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
          x2 = _ref1[_l];
          orignalRect.x2 = x2;
          orignalRect.x1 = x2 - width;
          fits = fits.concat(__findFits(orignalRect, height, alignEdges, colliders));
        }
        minDistance = 0;
        for (_m = 0, _len4 = fits.length; _m < _len4; _m++) {
          fit = fits[_m];
          if (!__isContain(fit, parentRect)) {
            continue;
          }
          dis = Math.pow(fit.x1 - ox, 2) + Math.pow(fit.y1 - oy, 2);
          if (!bestFit || minDis > dis) {
            bestFit = fit;
            minDis = dis;
          }
        }
      }
      ________visualizeBestfit.call(this, bestFit, fits, colliders, alignEdges, rect);
      return bestFit;
    };
    CanvasViewProto.__moveItemMouseDown = function(evt) {
      if (evt.metaKey) {
        this.__dragCanvasMouseDown(evt);
      } else if (!this.isReadOnly()) {
        this.dragItem(evt, {
          onDrop: __moveItemDidDrop,
          altState: true
        });
      }
      return false;
    };
    CanvasViewProto.dragItem = function(evt, options) {
      var $tgt, canvasOffset, item;
      console.assert(options.onDrop, "Drop handler is not specified.");
      if (evt.which !== 1) {
        return false;
      }

      /*
       options = {
          altState : false
          onDrop   : ()->
       }
       */
      $tgt = $(evt.currentTarget).closest(".canvasel");
      if (CanvasManager.hasClass($tgt, "fixed")) {
        return;
      }
      item = this.getItem($tgt.attr("data-id"));
      if (!item) {
        return;
      }
      this.selectItem($tgt[0]);
      canvasOffset = this.$el.offset();
      options = $.extend(options, {
        dropTargets: $("#OpsEditor .OEPanelCenter"),
        dataTransfer: {
          type: item.type
        },
        item: item,
        targetSvg: $tgt[0].instance,
        context: this,
        eventPrefix: "moveItem_",
        noShadow: true,
        lockToCenter: false,
        canvasX: canvasOffset.left,
        canvasY: canvasOffset.top,
        onDragStart: __moveItemStart,
        onDrag: __moveItemDrag,
        onDragEnd: __moveItemDrop,
        includeSource: function(evt) {
          return evt.data.altState && !!evt.altKey;
        }
      });
      if (!item.isClonable()) {
        options.altState = false;
      }
      if (item.sticky) {
        options.onDragStart = __moveStickyItemStart;
        options.onDrag = __moveStickyItemDrag;
        options.onDragEnd = __moveStickyItemDrop;
      }
      (item.isGroup() ? $tgt.children(".group") : $tgt).dnd(evt, options);
      return false;
    };
    __moveItemStart = function(data) {
      var size, svg, targetSvg;
      svg = data.context.svg;
      targetSvg = data.targetSvg.attr("id", "svgDragTarget");
      data.cloneSvg = svg.group().add(svg.use("svgDragTarget", true).move(-targetSvg.x(), -targetSvg.y())).classes("shadow").move(targetSvg.x(), targetSvg.y());
      if (data.altState) {
        size = data.item.size();
        data.cloneSvg.add(svg.use("clone_indicator").move(size.width * CanvasView.GRID_WIDTH - 12, size.height * CanvasView.GRID_HEIGHT - 12).classes("indicator").hide());
      }
    };
    __moveItemDrag = function(evt) {
      var ItemClass, ctx, data, group, mousePos, parentType;
      data = evt.data;
      if (!data.zoneDimension) {
        return;
      }
      ctx = data.context;
      ctx.__scrollOnDrag(data);
      group = ctx.__groupAtCoor(ctx.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1), data.item);
      if (group) {
        ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
        parentType = ItemClass.prototype.parentType;
        if (!parentType || parentType.indexOf(group.type) === -1 || !ItemClass.isDirectParentType(group.type)) {
          group = null;
        }
      }
      if (group !== ctx.__dragHoverGroup) {
        if (ctx.__dragHoverGroup) {
          CanvasManager.removeClass(ctx.__dragHoverGroup.$el, "droppable");
        }
        if (group) {
          CanvasManager.addClass(group.$el, "droppable");
        }
        ctx.__dragHoverGroup = group;
      }
      mousePos = data.context.__localToCanvasCoor(data.pageX - data.canvasX - data.offsetX, data.pageY - data.canvasY - data.offsetY);
      data.cloneSvg.move(mousePos.x * CanvasView.GRID_WIDTH, mousePos.y * CanvasView.GRID_HEIGHT);
      if (data.altState) {
        data.cloneSvg.get(1)[evt.altKey ? "show" : "hide"]();
      }
      ________visualizeOnMove.call(ctx, data, data.item);
    };
    __moveItemDrop = function(evt) {
      var data, ignore, result, size;
      data = evt.data;
      data.context.__addItemDragLeave();
      data.targetSvg.attr("id", "");
      if (data.cloneSvg) {
        data.cloneSvg.remove();
      }
      size = data.item.size();
      data.itemWidth = size.width;
      data.itemHeight = size.height;
      if ((_.isFunction(data.includeSource) && data.includeSource(evt)) || data.includeSource === true) {
        ignore = null;
      } else {
        ignore = data.item;
      }
      result = data.context.__handleDropData(data, ignore, true);
      if (_.isString(result)) {
        if (result === lang.ide.CVS_MSG_WARN_NO_ENOUGH_SPACE) {
          notification("warning", result);
        }
        return;
      }
      data.dataTransfer.item = data.item;
      data.dataTransfer.parent = result.group;
      data.dataTransfer.x = result.dropRect.x1;
      data.dataTransfer.y = result.dropRect.y1;
      if (data.item.isGroup()) {
        data.dataTransfer.x += 1;
        data.dataTransfer.y += 1;
      }
      data.onDrop(evt, data.dataTransfer);
    };
    __moveItemDidDrop = function(evt, dataTransfer) {
      var m;
      if (dataTransfer.item.isClonable() && evt.altKey) {
        m = "cloneTo";
      } else {
        m = "changeParent";
      }
      dataTransfer.item[m](dataTransfer.parent, dataTransfer.x, dataTransfer.y);
    };
    __moveStickyItemStart = function(evt) {};
    __moveStickyItemDrag = function(evt) {
      var ctx, data, mousePos;
      data = evt.data;
      if (!data.zoneDimension) {
        return;
      }
      ctx = data.context;
      ctx.__scrollOnDrag(data);
      mousePos = data.context.__localToCanvasCoor(data.pageX - data.canvasX - data.offsetX, data.pageY - data.canvasY - data.offsetY);
      data.item.ensureStickyPos(mousePos.x, mousePos.y);
    };
    __moveStickyItemDrop = function(evt) {
      return evt.data.context.__clearDragScroll();
    };
    CanvasViewProto.__dragCanvasMouseDown = function(evt) {
      var scrollContent;
      if (!evt.metaKey || evt.which !== 1) {
        return false;
      }
      scrollContent = this.$el.children(":first-child")[0];
      $(document).on({
        "mousemove.dragcanvas": __canvasDrag,
        "mousedown.dragcanvas": __cancelCanvasDrag,
        "mouseup.dragcanvas": __cancelCanvasDrag,
        "urlroute.dragcanvas": __cancelCanvasDrag
      }, {
        context: this,
        startX: evt.pageX,
        startY: evt.pageY,
        scrollLeft: scrollContent.scrollLeft,
        scrollTop: scrollContent.scrollTop,
        overlay: $("<div id='overlayer' class='grabbing'></div>").appendTo("body")
      });
      return false;
    };
    __canvasDrag = function(evt) {
      var data;
      data = evt.data;
      data.context.$el.nanoScroller({
        "scrollLeft": data.scrollLeft - evt.pageX + data.startX
      });
      data.context.$el.nanoScroller({
        "scrollTop": data.scrollTop - evt.pageY + data.startY
      });
      return false;
    };
    __cancelCanvasDrag = function(evt) {
      $(document).off(".dragcanvas");
      evt.data.overlay.remove();
      return false;
    };
    return null;
  });

}).call(this);
