define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"HideOEPanelRight tooltip sidebar-hider icon-caret-right\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'></button>\n<nav class=\"sidebar-title\">\n  <button class=\"property-tab\" id=\"btn-switch-property\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PROPERTY", {hash:{},data:data}))
    + "</button>\n  <button class=\"property-tab\" id=\"btn-switch-state\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_STATE", {hash:{},data:data}))
    + " <b class=\"count\"></b></button>\n\n</nav>\n\n<div class=\"sub-property\">\n  <section class=\"property-panel-wrapper property-first-panel\">\n    <header class=\"property-sidebar-title truncate property-title\"></header>\n    <div class=\"scroll-wrap scrollbar-auto-hide\">\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n      <div class=\"scroll-content property-content property-details\"></div>\n    </div>\n  </section>\n\n  <section class=\"property-panel-wrapper property-second-panel\">\n    <div class=\"property-sidebar-title\">\n      <button class=\"back icon-btn-back HideSecondPanel tooltip\"></button><span class=\"truncate property-second-title\"></span>\n    </div>\n    <div class=\"scroll-wrap scrollbar-auto-hide\">\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n      <div class=\"scroll-content property-content\"></div>\n    </div>\n  </section>\n</div>\n<div class=\"sub-stateeditor\"></div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });