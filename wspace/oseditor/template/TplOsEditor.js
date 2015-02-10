define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div id=\"OpsEditor\" class=\"pos-r\">\n  <nav class=\"OEPanelTop\"></nav>\n  <aside class=\"OEPanelRight\" id=\"OEPanelRight\"></aside>\n\n<div class=\"OEMiddleWrap\">\n  <div class=\"OEPanelBottom\"></div>\n\n  <section class=\"OEPanelCenter nano\"> <div class=\"nano-content\">\n    <div class=\"canvas-view\">\n      <button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <svg width=\"100%\" height=\"100%\"></svg>\n    </div> </div>\n    <q class=\"canvas-message\"></q>\n  </section>\n</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });