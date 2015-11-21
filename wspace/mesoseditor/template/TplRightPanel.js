define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"HideOEPanelRight tooltip sidebar-hider icon-caret-right\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'></button>\r\n<nav class=\"sidebar-title\">\r\n  <button id=\"btn-switch-property\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PROPERTY", {hash:{},data:data}))
    + "</button>\r\n  <button id=\"btn-switch-state\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_STATE", {hash:{},data:data}))
    + " <b class=\"count\"></b></button>\r\n</nav>\r\n\r\n<div class=\"sub-property\">\r\n  <section class=\"property-panel-wrapper property-first-panel\">\r\n    <header class=\"property-sidebar-title truncate property-title\"></header>\r\n    <div class=\"scroll-wrap scrollbar-auto-hide\">\r\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n      <div class=\"scroll-content property-content property-details\"></div>\r\n    </div>\r\n  </section>\r\n\r\n  <section class=\"property-panel-wrapper property-second-panel\">\r\n    <div class=\"property-sidebar-title\">\r\n      <button class=\"back icon-btn-back HideSecondPanel tooltip\"></button><span class=\"truncate property-second-title\"></span>\r\n    </div>\r\n    <div class=\"scroll-wrap scrollbar-auto-hide\">\r\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n      <div class=\"scroll-content property-content\"></div>\r\n    </div>\r\n  </section>\r\n</div>\r\n<div class=\"sub-stateeditor\"></div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });