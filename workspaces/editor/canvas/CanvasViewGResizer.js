(function() {
  define(["./CanvasView"], function(CanvasView) {
    var CanvasViewProto, ________visualizeResize, __childrenBound, __max, __min, __resizeMove, __resizeUp, __updateGroupEl, __updateRange;
    ________visualizeResize = function() {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  env:dev:end */
    CanvasViewProto = CanvasView.prototype;
    CanvasViewProto.__resizeGroupDown = function(evt) {
      var $group, $resizer, data, direction, dirt, item, left, parent, size, target, top, _i, _len;
      $resizer = $(evt.currentTarget);
      $group = $resizer.closest("g");
      item = this.getItem($group.attr("data-id"));
      direction = $resizer.attr("class").replace("group-resizer ", "").split("-");
      target = item.rect();
      parent = item.parent();
      if (parent) {
        parent = parent.rect();
        parent.x1 += 1;
        parent.y1 += 1;
        parent.x2 -= 1;
        parent.y2 -= 1;
      } else {
        size = this.size();
        parent = {
          x1: 5,
          y1: 3,
          x2: size[0] - 5,
          y2: size[1] - 3
        };
      }
      left = direction.indexOf("left") >= 0;
      top = direction.indexOf("top") >= 0;
      data = {
        pageX: evt.pageX,
        pageY: evt.pageY,
        direction: direction,
        context: this,
        item: item,
        $resizer: $resizer,
        $svgel: $group,
        sideX: left ? "x1" : "x2",
        sideY: top ? "y1" : "y2",
        move: left || top,
        originalBound: $.extend({}, target),
        innerBound: __childrenBound(item, target),
        target: target,
        parent: parent,
        siblings: item.siblings().map(function(si) {
          return si.rect();
        }),
        overlay: $("<div></div>").appendTo(this.$el).css({
          "position": "absolute",
          "left": "0",
          "top": "0",
          "bottom": "0",
          "right": "0",
          "cursor": $resizer.css("cursor")
        })
      };
      for (_i = 0, _len = direction.length; _i < _len; _i++) {
        dirt = direction[_i];
        __updateRange(dirt, data);
      }
      $(document).on({
        'mousemove.resizegroup': __resizeMove,
        'mouseup.resizegroup': __resizeUp
      }, data);
      ________visualizeResize(data);
      return false;
    };
    __updateRange = function(direction, data) {
      var blocks, down, key, left, range, right, sibling, target, top, _i, _j, _len, _len1, _ref, _ref1;
      target = data.target;
      left = direction === "left";
      right = direction === "right";
      top = direction === "top";
      down = direction === "down";
      blocks = [
        {
          x1: data.parent.x2,
          y1: data.parent.y2,
          x2: data.parent.x1,
          y2: data.parent.y1
        }
      ];
      if (left || right) {
        key = "rangeX";
        _ref = data.siblings;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sibling = _ref[_i];
          if (sibling.y1 >= target.y2 || sibling.y2 <= target.y1) {
            continue;
          }
          if (left) {
            if (sibling.x1 > target.x1) {
              continue;
            }
          } else if (sibling.x2 < target.x2) {
            continue;
          }
          blocks.push(sibling);
        }
      } else {
        key = "rangeY";
        _ref1 = data.siblings;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sibling = _ref1[_j];
          if (sibling.x1 >= target.x2 || sibling.x2 <= target.x1) {
            continue;
          }
          if (top) {
            if (sibling.y1 > target.y1) {
              continue;
            }
          } else if (sibling.y2 < target.y2) {
            continue;
          }
          blocks.push(sibling);
        }
      }
      if (left) {
        range = [__max(blocks, "x2") + 1, data.innerBound.x1];
      } else if (right) {
        range = [data.innerBound.x2, __min(blocks, "x1") - 1];
      } else if (top) {
        range = [__max(blocks, "y2") + 1, data.innerBound.y1];
      } else {
        range = [data.innerBound.y2, __min(blocks, "y1") - 1];
      }
      data[key] = range;
    };
    __childrenBound = function(item, bound) {
      var bb, ch, _i, _len, _ref;
      bound = {
        x1: bound.x2 - 10,
        y1: bound.y2 - 10,
        x2: bound.x1 + 10,
        y2: bound.y1 + 10
      };
      _ref = item.children();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        bb = ch.effectiveRect();
        if (bound.x1 > bb.x1) {
          bound.x1 = bb.x1;
        }
        if (bound.y1 > bb.y1) {
          bound.y1 = bb.y1;
        }
        if (bound.x2 < bb.x2) {
          bound.x2 = bb.x2;
        }
        if (bound.y2 < bb.y2) {
          bound.y2 = bb.y2;
        }
      }
      bound.x1 -= 1;
      bound.y1 -= 1;
      bound.x2 += 1;
      bound.y2 += 1;
      return bound;
    };
    __min = function(array, key) {
      var i, min, _i, _len;
      min = array[0][key];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (i[key] < min) {
          min = i[key];
        }
      }
      return min;
    };
    __max = function(array, key) {
      var i, max, _i, _len;
      max = array[0][key];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (i[key] > max) {
          max = i[key];
        }
      }
      return max;
    };
    __resizeMove = function(evt) {
      var changed, data, newX, newY, scale;
      data = evt.data;
      scale = data.context.__scale;
      if (data.rangeX) {
        newX = data.originalBound[data.sideX] + Math.round((evt.pageX - data.pageX) * scale / CanvasView.GRID_WIDTH);
        if (newX < data.rangeX[0]) {
          newX = data.rangeX[0];
        } else if (newX > data.rangeX[1]) {
          newX = data.rangeX[1];
        }
        if (newX !== data.target[data.sideX]) {
          data.target[data.sideX] = newX;
          changed = true;
          if (data.rangeY) {
            __updateRange(data.direction[0], data);
            ________visualizeResize(data);
          }
        }
      }
      if (data.rangeY) {
        newY = data.originalBound[data.sideY] + Math.round((evt.pageY - data.pageY) * scale / CanvasView.GRID_HEIGHT);
        if (newY < data.rangeY[0]) {
          newY = data.rangeY[0];
        } else if (newY > data.rangeY[1]) {
          newY = data.rangeY[1];
        }
        if (newY !== data.target[data.sideY]) {
          data.target[data.sideY] = newY;
          changed = true;
          if (data.rangeX) {
            __updateRange(data.direction[1], data);
            ________visualizeResize(data);
          }
        }
      }
      if (changed) {
        __updateGroupEl(data);
      }
      return false;
    };
    __updateGroupEl = function(data) {
      var ch, classes, cn, height, model, name, p, pad, pad2, ports, pos, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
      model = data.item.model;
      if (data.move) {
        model.attributes.x = data.target.x1;
        model.attributes.y = data.target.y1;
        data.$svgel[0].instance.move(data.target.x1 * CanvasView.GRID_WIDTH, data.target.y1 * CanvasView.GRID_HEIGHT);
      }
      width = model.attributes.width = data.target.x2 - data.target.x1;
      height = model.attributes.height = data.target.y2 - data.target.y1;
      width *= CanvasView.GRID_WIDTH;
      height *= CanvasView.GRID_HEIGHT;
      pad = 10;
      pad2 = 20;
      ports = [];
      _ref = data.$svgel[0].instance.children();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        classes = ch.classes();
        if (classes.indexOf("group") >= 0) {
          ch.size(width, height);
        } else if (classes.indexOf("top") >= 0) {
          ch.size(width - pad2, pad).x(pad);
        } else if (classes.indexOf("left") >= 0) {
          ch.size(pad, height - pad2).y(pad);
        } else if (classes.indexOf("right") >= 0) {
          ch.size(pad, height - pad2).move(width - pad, pad);
        } else if (classes.indexOf("bottom") >= 0) {
          ch.size(width - pad2, pad).move(pad, height - pad);
        } else if (classes.indexOf("top-right") >= 0) {
          ch.x(width - pad);
        } else if (classes.indexOf("bottom-left") >= 0) {
          ch.y(height - pad);
        } else if (classes.indexOf("bottom-right") >= 0) {
          ch.move(width - pad, height - pad);
        } else if (classes.indexOf("port") >= 0) {
          ports.push(ch);
        }
      }
      if (ports.length) {
        for (_j = 0, _len1 = ports.length; _j < _len1; _j++) {
          p = ports[_j];
          name = p.attr("data-alias") || p.attr("data-name");
          if (name) {
            pos = data.item.portPosition(name);
            if (pos) {
              p.move(pos[0], pos[1]);
            }
          }
        }
        _ref1 = data.item.connections();
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          cn = _ref1[_k];
          cn.update();
        }
      }
      _ref2 = data.item.children(true);
      for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
        ch = _ref2[_l];
        if (ch.sticky) {
          ch.ensureStickyPos();
        }
      }
    };
    return __resizeUp = function(evt) {
      var data;
      data = evt.data;
      data.overlay.remove();
      $(document).off(".resizegroup");
      return false;
    };
  });

}).call(this);
