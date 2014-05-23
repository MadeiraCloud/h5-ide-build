define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\"> <h3>JSON Diff</h3> <i class=\"modal-close\">×</i> </div>\r\n<div id=\"diffWrap\">\r\n  <div id=\"diffInnerWrap\">\r\n    <div id=\"diffSidebar\">\r\n      <div id=\"diffTextarea1Before\">1</div>\r\n      <textarea id=\"diffTextarea1\"></textarea>\r\n      <div id=\"diffTextarea2Before\">2</div>\r\n      <textarea id=\"diffTextarea2\"></textarea>\r\n\r\n      <section class=\"diffInputs\">\r\n        <div class=\"tooltip icon-visualize\" data-tooltip=\"swap\" id=\"diffSwap\"></div>\r\n        <div class=\"tooltip icon-delete\" data-tooltip=\"clear\" id=\"diffClear\"></div>\r\n        <div class=\"tooltip icon-toolbar-diff\" data-tooltip=\"compare\" id=\"diffCompare\"></div>\r\n        <div style=\"width:auto;\">\r\n          <label for=\"diffChangesOnly\"><input type=\"checkbox\" checked=\"checked\" class=\"tooltip\" id=\"diffChangesOnly\" /><span>Changes Only</span></label>\r\n        </div>\r\n      </section>\r\n    </div>\r\n    <div id=\"jsondiffContainer\"></div>\r\n  </div>\r\n</div>\r\n\r\n";
  }; return Handlebars.template(TEMPLATE); });