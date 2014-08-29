define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\"> <h3>JSON Diff</h3> <i class=\"modal-close\">×</i> </div>\n<div id=\"diffWrap\">\n  <div id=\"diffInnerWrap\">\n    <div id=\"diffSidebar\">\n      <div id=\"diffTextarea1Before\">1</div>\n      <textarea id=\"diffTextarea1\"></textarea>\n      <div id=\"diffTextarea2Before\">2</div>\n      <textarea id=\"diffTextarea2\"></textarea>\n\n      <section class=\"diffInputs\">\n        <div class=\"tooltip icon-visualize\" data-tooltip=\"swap\" id=\"diffSwap\"></div>\n        <div class=\"tooltip icon-delete\" data-tooltip=\"clear\" id=\"diffClear\"></div>\n        <div class=\"tooltip icon-toolbar-diff\" data-tooltip=\"compare\" id=\"diffCompare\"></div>\n        <div style=\"width:auto;\">\n          <label for=\"diffChangesOnly\"><input type=\"checkbox\" checked=\"checked\" class=\"tooltip\" id=\"diffChangesOnly\" /><span>Changes Only</span></label>\n        </div>\n      </section>\n    </div>\n    <div id=\"jsondiffContainer\"></div>\n  </div>\n</div>";
  }; return Handlebars.template(TEMPLATE); });