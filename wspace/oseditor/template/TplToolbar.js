define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"confirm":{},"modal":{},"export":{}};

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
TEMPLATE.BtnZoom=Handlebars.template(__TEMPLATE__);


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
TEMPLATE.BtnRunStack=Handlebars.template(__TEMPLATE__);


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
TEMPLATE.BtnStackOps=Handlebars.template(__TEMPLATE__);


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
TEMPLATE.BtnExport=Handlebars.template(__TEMPLATE__);


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
TEMPLATE.BtnEditApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip btn-toolbar icon-stop\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_STOP_APP", {hash:{},data:data}))
    + "\"></button>\n<button class=\"tooltip btn-toolbar icon-play startApp\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_START_APP", {hash:{},data:data}))
    + "\"><span style=\"display: none\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.START_APP", {hash:{},data:data}))
    + "</span></button>\n<button class=\"btn-toolbar tooltip icon-terminate seperator\" data-tooltip=\"";
  stack1 = helpers.i18n.call(depth0, "TOOLBAR.TIP_TERMINATE_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></button>\n<button class=\"btn-toolbar tooltip icon-save-app seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_SAVE_APP_TO_STACK", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.BtnAppOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-export-png tooltip seperator\" data-analytics-plus=\"export_png\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.EXPORT_AS_PNG", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.BtnPng=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-refresh seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_REFRESH_RESOURCES", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.BtnReloadRes=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return " on";
  }

  buffer += "<label class=\"switch toolbar-visual-ops-switch tooltip";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stateOn), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CUSTOM_USER_DATA", {hash:{},data:data}))
    + "\">\n    <span class=\"switch-label\" data-on=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TOGGLE_VISUALOPS_ON", {hash:{},data:data}))
    + "\" data-off=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TOGGLE_VISUALOPS_OFF", {hash:{},data:data}))
    + "\"></span>\n    <span class=\"switch-handle\"></span>\n</label>";
  return buffer;
  };
TEMPLATE.BtnSwitchStates=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"icon-reload tooltip btn btn-blue reload-states\" data-original=\"Reload States\" data-disabled=\"Initiating…\"  data-tooltip=\"Instantly rerun all states in this app.\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.RELOAD_STATES", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.BtnReloadStates=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"sidebar-title resource\">\n    <a class=\"resource tooltip icon-resource\" data-target=\"resource\" data-tooltip=\"Resource (R)\"></a>\n    <a class=\"config tooltip icon-config\" data-target=\"config\" data-tooltip=\"Stack Property (A)\"></a>\n    <a class=\"property tooltip icon-property\" data-target=\"property\" data-tooltip=\"Property (P)\"></a>\n    <a class=\"state tooltip icon-gear\" data-target=\"state\" data-tooltip=\"Instance State (S)\">\n        <span class=\"state-count\">99</span>\n    </a>\n</header>";
  };
TEMPLATE.PanelHeaderStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<header class=\"sidebar-title resource\" data-mode=\"app\">\n    <a class=\"resource tooltip icon-resource\" data-target=\"resource\" data-tooltip=\"Resource (R)\"></a>\n    <a class=\"config tooltip icon-config\" data-target=\"config\" data-tooltip=\"App Property (A)\"></a>\n    <a class=\"property tooltip icon-property\" data-target=\"property\" data-tooltip=\"Property (P)\"></a>\n    <a class=\"state tooltip icon-gear\" data-target=\"state\" data-tooltip=\"Instance State (S)\">\n        <span class=\"state-count\">99</span>\n    </a>\n</header>";
  };
TEMPLATE.PanelHeaderApp=Handlebars.template(__TEMPLATE__);


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
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div id=\"replace_stack\" style=\"padding: 10px 0\">\n                <div class=\"radio\">\n                    <input id=\"radio-replace-stack\" type=\"radio\" name=\"save-stack-type\" value=\"replace\" checked>\n                    <label for=\"radio-replace-stack\"></label>\n                </div>\n                <label class=\"modal-text-minor\" for=\"radio-replace-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_REPLACE_STACK", {hash:{},data:data}))
    + "</label>\n                <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                    "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_REPLACE_STACK_INTRO", {hash:{},data:data}))
    + " \""
    + escapeExpression(((stack1 = (depth0 && depth0.input)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_REPLACE_STACK_INTRO_END", {hash:{},data:data}))
    + "\n                </div>\n            </div>\n            <div id=\"save_new_stack\">\n                <div class=\"radio\">\n                    <input id=\"radio-new-stack\" type=\"radio\" name=\"save-stack-type\">\n                    <label for=\"radio-new-stack\"></label>\n                </div>\n                <label class=\"modal-text-minor\" for=\"radio-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_SAVE_NEW_STACK", {hash:{},data:data}))
    + "</label>\n                <div style=\"padding: 10px 22px\" class=\"radio-instruction hide\">\n                    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_SAVE_STACK_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n                    <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stackName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                    <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">\n                        "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STACK_NAME_ERROR", {hash:{},data:data}))
    + "</div>\n                </div>\n            </div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div id=\"name_new_stack\">\n                <input id=\"radio-new-stack\" type=\"hidden\" name=\"save-stack-type\" checked>\n                <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_SAVE_STACK_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n                    <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stackName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                    <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STACK_NAME_ERROR", {hash:{},data:data}))
    + "</div>\n                </div>\n            </div>\n        ";
  return buffer;
  }

  buffer += "<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_INTRO_1", {hash:{},data:data}))
    + "</p>\n<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_INTRO_2", {hash:{},data:data}))
    + "</p>\n<div class=\"modal-center-align-helper\">\n    <div class=\"modal-control-group\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originStackExist), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.saveAppToStack=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });