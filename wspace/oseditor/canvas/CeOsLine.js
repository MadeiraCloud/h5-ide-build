(function() {
  define(["CanvasLine", "constant"], function(CeLine, constant) {
    CeLine.extend({

      /* env:dev                                                env:dev:end */
      type: "OsListenerAsso"
    });
    CeLine.extend({

      /* env:dev                                             env:dev:end */
      type: "OsPortUsage"
    });
    CeLine.extend({

      /* env:dev                                              env:dev:end */
      type: "OsRouterAsso",
      appendLineToCanvas: function(svgEl) {
        return this.canvas.appendGroupLine(svgEl);
      }
    });
    return CeLine.extend({

      /* env:dev                                                  env:dev:end */
      type: "OsPoolMembership"
    });
  });

}).call(this);
