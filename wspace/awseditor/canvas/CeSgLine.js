(function() {
  define(["CanvasLine", "constant", "CanvasManager", "i18n!/nls/lang.js", "SGRulePopup"], function(CeLine, constant, CanvasManager, lang, SGRulePopup) {
    return CeLine.extend({

      /* env:dev                                        env:dev:end */
      type: "SgRuleLine",
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = svg.group().add([svg.path(pd), svg.path(pd).classes("fill-line")]).attr({
          "data-id": this.cid
        }).classes("line " + this.type.replace(/\./g, "-"));
        this.canvas.appendSgline(svgEl);
        return svgEl;
      },
      renderConnection: function(item_from, item_to, element1, element2) {
        return CeLine.prototype.renderConnection.call(this, item_from, item_to, element1, element2);
      },
      lineStyle: function() {
        return this.canvas.lineStyle();
      }
    }, {
      connect: function(LineClass, p1Comp, p2Comp) {
        new SGRulePopup(p1Comp, p2Comp);
      }
    });
  });

}).call(this);
