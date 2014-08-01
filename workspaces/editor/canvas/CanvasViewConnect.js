(function() {
  define(["./CanvasView", "Design", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasView, Design, CanvasManager, lang) {
    var CanvasViewProto, cancelConnect, detectDrag, startDrag, __drawLineMove, __drawLineUp;
    CanvasViewProto = CanvasView.prototype;
    cancelConnect = function(evt) {
      var $el, data, _i, _len, _ref;
      $(document).off(".drawline");
      data = evt.data;
      data.context.__clearDragScroll();
      if (data.marker) {
        data.marker.remove();
        data.lineSvg.remove();
        data.overlay.remove();
        _ref = data.highlightEls;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $el = _ref[_i];
          CanvasManager.removeClass($el, "connectable");
        }
      }
    };
    detectDrag = function(evt) {
      var data;
      data = evt.data;
      if (Math.pow(evt.pageX - data.startX, 2) + Math.pow(evt.pageY - data.startY, 2) >= 4) {
        $(document).off("mousemove.drawline").off("mouseup.drawline").on({
          "mousemove.drawline": __drawLineMove,
          "mouseup.drawline": __drawLineUp
        }, data);
        startDrag.call(data.context, data);
      }
      return false;
    };
    startDrag = function(d) {
      var $port, cn, co, comp, data, dimension, highlightEls, item, lineSvg, marker, portAlias, portName, portPos, ports, pos, ti, toPort, type, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      $port = d.source;
      item = d.startItem;
      portName = $port.attr("data-name");
      portAlias = $port.attr("data-alias");
      pos = item.pos($port.closest("g")[0]);
      portPos = item.portPosition(portAlias || portName);
      pos.x = pos.x * CanvasView.GRID_WIDTH + portPos[0];
      pos.y = pos.y * CanvasView.GRID_HEIGHT + portPos[1];
      _ref = item.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        CanvasManager.addClass(cn.$el, "hover");
      }
      highlightEls = [];
      _ref1 = Design.modelClassForType("Framework_CN").connectionData(item.type, portName);
      for (type in _ref1) {
        data = _ref1[type];
        _ref2 = this.design.componentsOfType(type);
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          comp = _ref2[_j];
          for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
            toPort = data[_k];
            if (item.isConnectable(portName, comp.id, toPort)) {
              ti = this.getItem(comp.id);
              if (ti) {
                ports = ti.$el.children("[data-name='" + toPort + "']");
                CanvasManager.addClass(ti.$el, "connectable");
                CanvasManager.addClass(ports, "connectable");
                highlightEls.push(ports);
                highlightEls.push(ti.$el);
              }
            }
          }
        }
      }
      marker = this.svg.marker(3, 3).classes(portName).attr("id", "draw-line-marker").add(this.svg.path("M1.5,0 L1.5,3 L3,1.5 L1.5,0"));
      lineSvg = this.svg.line(pos.x, pos.y, pos.x, pos.y).classes("draw-line " + portName).marker("end", marker);
      this.svg.add(lineSvg);
      co = this.$el.offset();
      dimension = {
        x1: co.left,
        y1: co.top,
        x2: co.left + this.$el.outerWidth(),
        y2: co.top + this.$el.outerHeight()
      };
      $.extend(d, {
        marker: marker,
        lineSvg: lineSvg,
        zoneDimension: dimension,
        highlightEls: highlightEls,
        portName: portName,
        startPos: pos,
        overlay: $("<div></div>").appendTo(this.$el).css({
          "position": "absolute",
          "left": "0",
          "top": "0",
          "bottom": "0",
          "right": "0"
        })
      });
      return false;
    };
    CanvasViewProto.__connect = function(LineClass, comp1, comp2, startItem) {
      var c, self;
      self = this;
      c = new LineClass(comp1, comp2, void 0, {
        createByUser: true
      });
      if (c.id) {
        _.defer(function() {
          return self.selectItem(c.id);
        });
      }
      this.__connectInitItem = startItem;
    };
    CanvasViewProto.__popLineInitiator = function() {
      var i;
      i = this.__connectInitItem;
      this.__connectInitItem = null;
      return i;
    };
    CanvasViewProto.__drawLineDown = function(evt) {
      var $port, $tgt, item, scrollContent;
      if (evt.which !== 1) {
        return false;
      }
      $port = $(evt.currentTarget);
      $tgt = $port.closest("g");
      item = this.getItem($tgt.attr("data-id"));
      if (!item) {
        return false;
      }
      scrollContent = this.$el.children(":first-child")[0];
      $(document).on({
        "mousemove.drawline": detectDrag,
        "mousedown.drawline": cancelConnect,
        "mouseup.drawline": cancelConnect,
        "urlroute.drawline": cancelConnect
      }, {
        context: this,
        canvasScale: this.__scale,
        source: $port,
        startItem: item,
        scrollContent: scrollContent,
        pageX: evt.pageX,
        pageY: evt.pageY,
        startX: evt.pageX + scrollContent.scrollLeft,
        startY: evt.pageY + scrollContent.scrollTop
      });
      return false;
    };
    __drawLineMove = function(evt) {
      var data, newX, newY;
      data = evt.data;
      data.pageX = evt.pageX;
      data.pageY = evt.pageY;
      data.context.__scrollOnDrag(data);
      newX = data.startPos.x + (data.pageX + data.scrollContent.scrollLeft - data.startX) * data.canvasScale;
      newY = data.startPos.y + (data.pageY + data.scrollContent.scrollTop - data.startY) * data.canvasScale;
      data.lineSvg.plot(data.startPos.x, data.startPos.y, newX, newY);
      return false;
    };
    __drawLineUp = function(evt) {
      var C, comp1, comp2, coord, data, fixed, item, modal, offset, res, self, toPort;
      data = evt.data;
      offset = $(data.scrollContent).offset();
      coord = data.context.__localToCanvasCoor(data.pageX - offset.left, data.pageY - offset.top);
      item = data.context.__itemAtPos(coord);
      if (item) {
        fixed = data.context.fixConnection(coord, data.startItem, item);
        if (fixed) {
          toPort = fixed.toPort;
          item = fixed.target;
        }
      }
      if (!toPort && item) {
        toPort = item.$el.find(".connectable").attr("data-name");
      }
      cancelConnect(evt);
      if (!item || !toPort || item === data.startItem) {
        return false;
      }
      C = Design.modelClassForPorts(data.portName, toPort);
      console.assert(C, "Cannot found Class for type: " + data.portName + ">" + toPort);
      comp1 = data.startItem.model;
      comp2 = item.model;
      res = C.isConnectable(comp1, comp2);
      if (res === false) {
        return;
      }
      if (_.isString(res)) {
        notification("error", res);
        return false;
      }
      if (res === true) {
        data.context.__connect(C, comp1, comp2, data.startItem);
        return false;
      }
      if (res.confirm) {
        self = this;
        modal = new Modal({
          title: res.title,
          width: "420",
          template: res.template,
          confirm: {
            text: res.action,
            color: "blue"
          },
          onConfirm: function() {
            modal.close();
            data.context.__connect(C, comp1, comp2, data.startItem);
          }
        });
      }
      return false;
    };
    return null;
  });

}).call(this);
