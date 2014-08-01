(function() {
  define(["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    var CeLine, LineMaskToClear;
    LineMaskToClear = null;
    CeLine = CanvasElement.extend({

      /* env:dev                                      env:dev:end */
      type: "CeLine",
      node_line: true,
      portName: function(targetId) {
        return this.model.port(targetId, "name");
      },
      render: function() {
        var el1, el2, initiator, item1, item2, _i, _j, _len, _len1, _ref, _ref1;
        this.$el.remove();
        this.$el = $();
        item1 = this.canvas.getItem(this.model.port1Comp().id);
        item2 = this.canvas.getItem(this.model.port2Comp().id);
        initiator = this.canvas.__popLineInitiator() || item1;
        if (item1.$el.length === 1 && item2.$el.length === 1) {
          this.renderConnection(item1, item2, void 0, void 0, initiator);
        } else {
          _ref = item1.$el;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el1 = _ref[_i];
            _ref1 = item2.$el;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              el2 = _ref1[_j];
              this.renderConnection(item1, item2, el1, el2, initiator);
            }
          }
        }
      },
      update: function() {
        var el1, el2, i, item1, item2, newLength, svgEl, _i, _j, _len, _len1, _ref, _ref1;
        item1 = this.canvas.getItem(this.model.port1Comp().id);
        item2 = this.canvas.getItem(this.model.port2Comp().id);
        if (item1.$el.length === 1 && item2.$el.length === 1) {
          this.$el.children().attr("d", this.generatePath(item1, item2, void 0, void 0));
        } else {
          newLength = item1.$el.length * item2.$el.length;
          if (this.$el.length < newLength) {
            while (this.$el.length < newLength) {
              svgEl = this.createLine("M0 0Z");
              this.addView(svgEl);
            }
          } else if (this.$el.length > newLength) {
            this.$el.slice(newLength).remove();
            this.$el = this.$el.slice(0, newLength);
          }
          i = 0;
          _ref = item1.$el;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el1 = _ref[_i];
            _ref1 = item2.$el;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              el2 = _ref1[_j];
              this.$el.eq(i).children().attr("d", this.generatePath(item1, item2, el1, el2));
              ++i;
            }
          }
        }
      },
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = svg.group().add([svg.path(pd), svg.path(pd).classes("fill-line")]).attr({
          "data-id": this.cid
        }).classes("line " + this.type.replace(/\./g, "-"));
        this.canvas.appendLine(svgEl);
        return svgEl;
      },
      renderConnection: function(item_from, item_to, element1, element2, initiator) {
        var dirt, length, maskPath, path, svg, svgEl;
        path = this.generatePath(item_from, item_to, element1, element2);
        svgEl = this.createLine(path);
        this.addView(svgEl);
        if (!this.canvas.initializing && initiator) {
          svg = this.canvas.svg;
          maskPath = svg.path(path);
          length = parseFloat(maskPath.node.getTotalLength()).toFixed(2);
          dirt = (initiator === item_from ? 1 : -1) * (this.__lastDir || 1);
          maskPath.style({
            "stroke-dasharray": length + " " + length,
            "stroke-dashoffset": length * dirt
          });
          setTimeout(function() {
            return maskPath.classes("mask-line");
          }, 20);
          CeLine.cleanLineMask(svgEl.maskWith(maskPath));
        }
      },
      generatePath: function(item_from, item_to, element1, element2) {
        var connection, controlPoints, dirn_from, dirn_to, end0, from_port, path, pos_from, pos_port_from, pos_port_to, pos_to, start0, to_port;
        connection = this.model;
        pos_from = item_from.pos(element1);
        pos_to = item_to.pos(element2);
        pos_to.x *= 10;
        pos_to.y *= 10;
        pos_from.x *= 10;
        pos_from.y *= 10;
        from_port = connection.port1("name");
        to_port = connection.port2("name");
        dirn_from = item_from.portDirection(from_port);
        dirn_to = item_to.portDirection(to_port);
        if (dirn_from && dirn_to) {
          if (pos_from.x > pos_to.x) {
            from_port += "-left";
            to_port += "-right";
          } else {
            from_port += "-right";
            to_port += "-left";
          }
          pos_port_from = item_from.portPosition(from_port, true);
          pos_port_to = item_to.portPosition(to_port, true);
          pos_from.x += pos_port_from[0];
          pos_from.y += pos_port_from[1];
          pos_to.x += pos_port_to[0];
          pos_to.y += pos_port_to[1];
        } else if (dirn_from) {
          pos_port_to = item_to.portPosition(to_port, true);
          pos_to.x += pos_port_to[0];
          pos_to.y += pos_port_to[1];
          if (dirn_from === "vertical") {
            from_port += pos_to.y > pos_from.y ? "-bottom" : "-top";
          } else if (dirn_from === "horizontal") {
            from_port += pos_to.x > pos_from.x ? "-right" : "-left";
          }
          pos_port_from = item_from.portPosition(from_port, true);
          pos_from.x += pos_port_from[0];
          pos_from.y += pos_port_from[1];
        } else if (dirn_to) {
          pos_port_from = item_from.portPosition(from_port, true);
          pos_from.x += pos_port_from[0];
          pos_from.y += pos_port_from[1];
          if (dirn_to === "vertical") {
            to_port += pos_from.y > pos_to.y ? "-bottom" : "-top";
          } else if (dirn_to === "horizontal") {
            to_port += pos_from.x > pos_to.x ? "-right" : "-left";
          }
          pos_port_to = item_to.portPosition(to_port, true);
          pos_to.x += pos_port_to[0];
          pos_to.y += pos_port_to[1];
        } else {
          pos_port_from = item_from.portPosition(from_port, true);
          pos_port_to = item_to.portPosition(to_port, true);
          pos_from.x += pos_port_from[0];
          pos_from.y += pos_port_from[1];
          pos_to.x += pos_port_to[0];
          pos_to.y += pos_port_to[1];
        }
        start0 = {
          x: pos_from.x,
          y: pos_from.y,
          angle: pos_port_from[2],
          type: connection.port1Comp().type,
          name: from_port
        };
        end0 = {
          x: pos_to.x,
          y: pos_to.y,
          angle: pos_port_to[2],
          type: connection.port2Comp().type,
          name: to_port
        };
        this.__lastDir = start0.y >= end0.y ? 1 : -1;
        if (start0.x === end0.x || start0.y === end0.y) {
          path = "M" + start0.x + " " + start0.y + " L" + end0.x + " " + end0.y;
        } else {
          controlPoints = MC.canvas.route2(start0, end0);
          if (controlPoints) {
            switch (this.lineStyle()) {
              case 0:
                path = "M" + controlPoints[0].x + " " + controlPoints[0].y + " L" + controlPoints[1].x + " " + controlPoints[1].y + " L" + controlPoints[controlPoints.length - 2].x + " " + controlPoints[controlPoints.length - 2].y + " L" + controlPoints[controlPoints.length - 1].x + " " + controlPoints[controlPoints.length - 1].y;
                break;
              case 1:
                path = MC.canvas._round_corner(controlPoints);
                break;
              case 2:
                path = MC.canvas._bezier_q_corner(controlPoints);
                break;
              case 3:
                path = MC.canvas._bezier_qt_corner(controlPoints);
                break;
              case 777:
                path = MC.canvas._round_corner(controlPoints);
            }
          }
        }
        return path;
      },
      lineStyle: function() {
        return 777;
      }
    }, {
      cleanLineMask: function(line) {
        if (!LineMaskToClear) {
          LineMaskToClear = [line];
          return setTimeout(function() {
            return CeLine.__cleanLineMask();
          }, 340);
        } else {
          return LineMaskToClear.push(line);
        }
      },
      __cleanLineMask: function() {
        var line, _i, _len;
        for (_i = 0, _len = LineMaskToClear.length; _i < _len; _i++) {
          line = LineMaskToClear[_i];
          if (line.masker) {
            line.masker.remove();
          }
        }
        LineMaskToClear = null;
      }
    });
    CeLine.extend({

      /* env:dev                                               env:dev:end */
      type: "EniAttachment"
    });
    CeLine.extend({

      /* env:dev                                         env:dev:end */
      type: "ElbAsso"
    });
    CeLine.extend({

      /* env:dev                                         env:dev:end */
      type: "RTB_Asso"
    });
    CeLine.extend({

      /* env:dev                                          env:dev:end */
      type: "RTB_Route",
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = CeLine.prototype.createLine.call(this, pd);
        svgEl.add(svg.path(pd).classes("dash-line"));
        return svgEl;
      }
    });
    CeLine.extend({

      /* env:dev                                     env:dev:end */
      type: constant.RESTYPE.VPN
    });
    CeLine.extend({

      /* env:dev                                               env:dev:end */
      type: "ElbSubnetAsso"
    });
    CeLine.extend({

      /* env:dev                                            env:dev:end */
      type: "ElbAmiAsso"
    });
    CeLine.extend({

      /* env:dev                                               env:dev:end */
      type: "DbReplication"
    });
    return CeLine;
  });

}).call(this);
