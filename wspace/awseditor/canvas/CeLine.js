(function() {
  define(["CanvasLine", "constant", "CanvasManager", "i18n!/nls/lang.js", "SGRulePopup"], function(CeLine, constant, CanvasManager, lang, SGRulePopup) {
    CeLine.extend({

      /* env:dev                                               env:dev:end */
      type: "EniAttachment"
    });
    CeLine.extend({

      /* env:dev                                         env:dev:end */
      type: "RTB_Asso"
    });
    CeLine.extend({

      /* env:dev                                          env:dev:end */
      type: "RTB_Route",
      lineStyle: function() {
        return 1;
      },
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
    }, {
      connect: function(LineClass, p1Comp, p2Comp) {
        new SGRulePopup(p1Comp, p2Comp);
        return new LineClass(p1Comp, p2Comp, void 0, {
          createByUser: true
        });
      }
    });
    CeLine.extend({

      /* env:dev                                               env:dev:end */
      type: "DbReplication",
      select: function() {},
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = CeLine.prototype.createLine.call(this, pd);
        svgEl.add(svg.path(pd).classes("dash-line"));
        return svgEl;
      }
    });
    return CeLine;
  });

}).call(this);
