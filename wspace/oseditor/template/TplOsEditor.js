define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div id=\"OpsEditor\" class=\"pos-r\">\r\n  <nav class=\"OEPanelTop\"></nav>\r\n  <aside class=\"OEPanelRight\" id=\"OEPanelRight\"></aside>\r\n\r\n<div class=\"OEMiddleWrap\">\r\n  <div class=\"OEPanelBottom\"></div>\r\n\r\n  <section class=\"OEPanelCenter nano\"> <div class=\"nano-content\">\r\n    <div class=\"canvas-view\">\r\n      <button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\r\n      <button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\r\n      <button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\r\n      <button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\r\n      <svg width=\"100%\" height=\"100%\"></svg>\r\n    </div> </div>\r\n    <q class=\"canvas-message\"></q>\r\n  </section>\r\n</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });