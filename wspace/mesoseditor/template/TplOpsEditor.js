define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"toolbar":{},"confirm":{},"export":{},"modal":{},"canvas":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-export-png toolbar-btn-primary\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "' data-analytics-plus=\"export_vis_png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnActionPng=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-zoom-in tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_ZOOM_IN", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-zoom-out seperator tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_ZOOM_OUT", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnZoom=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"selectbox btn-toolbar toolbar-line-style\">\n  <button class=\"selection tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SG_LINE_STYLE", {hash:{},data:data}))
    + "\"></button>\n  <ul class=\"dropdown\">\n    <li class='item' data-id=\"0\"><span class=\"icon-straight\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_LINESTYLE_STRAIGHT", {hash:{},data:data}))
    + "</span></li>\n    <li class='item' data-id=\"1\"><span class=\"icon-elbow\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_LINESTYLE_ELBOW", {hash:{},data:data}))
    + "</span></li>\n    <li class='item' data-id=\"2\"><span class=\"icon-bezier-q\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_LINESTYLE_CURVE", {hash:{},data:data}))
    + "</span></li>\n  </ul>\n</div>";
  return buffer;
  };
TEMPLATE.toolbar.BtnLinestyle=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip btn-toolbar icon-update-app toolbar-btn-primary\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_UPDATE_APP", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EDIT_APP", {hash:{},data:data}))
    + "</button>\n<button class=\"tooltip btn-toolbar icon-apply-app toolbar-btn-primary\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SAVE_UPDATE_APP", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APPLY_EDIT", {hash:{},data:data}))
    + "</button>\n<button class=\"tooltip btn-toolbar icon-cancel-update-app seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CANCEL_UPDATE_APP", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnEditApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-play tooltip toolbar-btn-primary runApp\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_BTN_RUN_STACK", {hash:{},data:data}))
    + "'>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.BTN_RUN_STACK", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnRunStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-save\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SAVE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-delete tooltip seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DELETE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar tooltip icon-duplicate\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-new-stack tooltip seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CREATE_STACK", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnStackOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"selectbox btn-toolbar seperator\">\n  <button class=\"selection tooltip icon-send\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT", {hash:{},data:data}))
    + "'></button>\n  <ul class=\"dropdown\">\n    <li data-analytics-plus=\"export_png\" class=\"icon-export-png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "</li>\n    <li data-analytics-plus=\"export_json\" class=\"icon-export-json\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_JSON", {hash:{},data:data}))
    + "</li>\n  </ul>\n</div>";
  return buffer;
  };
TEMPLATE.toolbar.BtnExport=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<button class=\"btn-toolbar tooltip icon-terminate seperator\" data-tooltip=\"";
  stack1 = helpers.i18n.call(depth0, "TOOLBAR.TIP_TERMINATE_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnAppOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-export-png tooltip seperator\" data-analytics-plus=\"export_png\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnPng=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-refresh seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_REFRESH_RESOURCES", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnReloadRes=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CONFIRM_ENABLE_STATE", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.confirm.enableState=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\" style=\"padding:40px 20px;\">\n        <div class=\"modal-text-major\"></div>\n        <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <a class=\"btn btn-blue\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n    <button id=\"tpl-cancel\" class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.export.JSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-spinner\"></div>\n<section style=\"margin:10px 10px 0;max-height:420px;overflow:hidden;text-align:center;display:none;\"></section>\n<div class=\"modal-footer\">\n    <a class=\"btn btn-blue\" style=\"display: inline-block;\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.export.PNG=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CANCEL_UPDATE_CONFIRM", {hash:{},data:data}))
    + "</div>\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.DISCARD_UPDATE_CHANGE", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.modal.cancelUpdate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wrapper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.CONTENT_OPS_CONFLICT", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.modal.confliction=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"marathon-cvs-ph\">Drop stuff to create stack.</div>";
  };
TEMPLATE.canvas.placeholder=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });