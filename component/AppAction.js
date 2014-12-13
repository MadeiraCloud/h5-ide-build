define('component/appactions/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DELETE_STACK", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.msg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn modal-close btn-red\" id=\"confirmRmStack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DELETE_STACK", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.removeStackConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-control-group\">\n            <label class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_DUPLICATE_STACK", {hash:{},data:data}))
    + "</label>\n            <input id=\"confirmDupStackIpt\" class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.newName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn btn-red\" id=\"confirmDupStack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DUPLICATE_STACK", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.dupStackConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <li>\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_CONFIRM_LIST_1", {hash:{},data:data}))
    + "\n            </li>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <li>\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_CONFIRM_LIST_2", {hash:{},data:data}))
    + "\n            </li>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <li>\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_CONFIRM_LIST_3", {hash:{},data:data}))
    + "\n            </li>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"modal-shrink\">\n            <div class=\"sub-gray\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_WARNNING", {hash:{},data:data}))
    + "</div>\n            <div class=\"error\">\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_MISSING_SNAPSHOT_1", {hash:{},data:data}))
    + " ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.lostDBSnapshot), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_MISSING_SNAPSHOT_2", {hash:{},data:data}))
    + "\n            </div>\n        </div>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.index), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }
function program9(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<div class=\"modal-center-align-helper\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_START_APP", {hash:{},data:data}))
    + "</div>\n    <ul class=\"modal-list-items\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEC2Instance), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasDBInstance), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasASG), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lostDBSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.startAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div style=\"padding: 20px\">\n        <p><b style=\"color:#ec3c38;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.appName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_MSG", {hash:{},data:data}))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_ASG", {hash:{},data:data}))
    + "</p>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n        <div><input class=\"input\" style=\"width:351px;\" id=\"appNameConfirmIpt\"/></div>\n    </div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"modal-center-align-helper\" style=\"padding: 20px\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_STOP_APP_LEFT", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.appName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_STOP_APP_RIGHT", {hash:{},data:data}))
    + "</div>\n        <ul class=\"modal-list-items\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEC2Instance), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasDBInstance), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasAsg), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <li>\n                    "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STOP_CONFIRM_LIST_1", {hash:{},data:data}))
    + "\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasInstanceStore), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </li>\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<span class=\"error\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STOP_CONFIRM_LIST_1_SPAN", {hash:{},data:data}))
    + "</span>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <li>\n                    "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STOP_CONFIRM_LIST_2", {hash:{},data:data}))
    + "\n                    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STOP_CONFIRM_LIST_2_SPAN", {hash:{},data:data}))
    + "</span>\n                </li>\n            ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <li>\n                    "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STOP_CONFIRM_LIST_3", {hash:{},data:data}))
    + "\n                    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_STOP_CONFIRM_LIST_3_SPAN", {hash:{},data:data}))
    + "</span>\n                </li>\n            ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isProduction), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.stopAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "(<span class=\"db-stop-status\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<p>DB Instance\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cantStop), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_CANT_STOP_1", {hash:{},data:data}))
    + "</p>\n<p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_CANT_STOP_2", {hash:{},data:data}))
    + "</p>";
  return buffer;
  };
TEMPLATE.cantStop=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p><b style=\"color:#ec3c38;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_MSG", {hash:{},data:data}))
    + "</p>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n        <div><input class=\"input\" style=\"width:390px;\" id=\"appNameConfirmIpt\"/></div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"modal-center-align-helper\"><div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_TERMINATE_APP_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_TERMINATE_APP_RIGHT", {hash:{},data:data}))
    + "</div></div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"check-final-snapshot checkbox-wrap\">\n            <div class=\"checkbox\">\n                <input id=\"take-rds-snapshot\" type=\"checkbox\" checked=\"checked\" name=\"dns-resolution\">\n                <label for=\"take-rds-snapshot\"></label>\n            </div>\n            <label for=\"take-rds-snapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_TAKE_DB_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n        </section>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notReadyDB)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"cant-snapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_CANT_TAKE_SNAPSHOT_1", {hash:{},data:data}))
    + "\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notReadyDB), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_CANT_TAKE_SNAPSHOT_2", {hash:{},data:data}))
    + "</p>\n        ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"resource-tag\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>(<span class=\"db-stop-status\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return ", ";
  }

  buffer += "<div class=\"confirm-padding\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.production), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.hasDBInstance)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.terminateAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"modal-center-align-helper\"> <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.FORGET_VISUALOPS_CANT", {hash:{},data:data}))
    + "</div></div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.production), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p><b style=\"color:#ec3c38;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.FORGET_CONFIRM_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n            <p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n            <div><input class=\"input\" style=\"width:390px;\" id=\"appNameConfirmIpt\"/></div>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"modal-center-align-helper\"> <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.FORGET_APP_CONFIRM", {hash:{},data:data}))
    + "</div></div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"confirm-padding\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasState), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.forgetAppConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"disconnected-msg\">\n    <div>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CONNECTION_LOST_TO_RECONNECT", {hash:{},data:data}))
    + "</div>\n    <div>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CHANGES_MAY_NOT_BE_SAVED", {hash:{},data:data}))
    + "</div>\n</section>";
  return buffer;
  };
TEMPLATE.disconnectedMsg=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_FORCE_TERMINATE", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_FORCE_TERMINATE_CONTENT", (depth0 && depth0.name), {hash:{},data:data}))
    + "</div>\n    </div>\n</div>\n<div class=\"modal-footer\">\n    <button class=\"btn modal-close btn-red\" id=\"forceTerminateApp\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DELETE_STACK", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.forceTerminateApp=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/*
----------------------------
  App Action Method
----------------------------
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('AppAction',["backbone", "component/appactions/template", 'i18n!/nls/lang.js', 'CloudResources', 'constant', 'UI.modalplus', 'ApiRequest', 'kp_dropdown', 'OsKp', 'TaGui', 'OpsModel'], function(Backbone, AppTpl, lang, CloudResources, constant, modalPlus, ApiRequest, AwsKp, OsKp, TA, OpsModel) {
    var AppAction;
    AppAction = Backbone.View.extend({
      runStack: function(event, workspace) {
        var appNameDom, checkAppNameRepeat, cloudType, cost, self, that;
        this.workspace = workspace;
        cloudType = this.workspace.opsModel.type;
        that = this;
        if ($(event.currentTarget).attr('disabled')) {
          return false;
        }
        this.modal = new modalPlus({
          title: lang.IDE.RUN_STACK_MODAL_TITLE,
          template: MC.template.modalRunStack,
          disableClose: true,
          width: '450px',
          confirm: {
            text: App.user.hasCredential() ? lang.IDE.RUN_STACK_MODAL_CONFIRM_BTN : lang.IDE.RUN_STACK_MODAL_NEED_CREDENTIAL,
            disabled: true
          }
        });
        if (cloudType === OpsModel.Type.OpenStack) {
          this.modal.find(".estimate").hide();
          this.modal.resize();
        }
        this.renderKpDropdown(this.modal, cloudType);
        cost = Design.instance().getCost();
        this.modal.tpl.find('.modal-input-value').val(this.workspace.opsModel.get("name"));
        this.modal.tpl.find("#label-total-fee").find('b').text("$" + cost.totalFee);
        TA.loadModule('stack').then((function(_this) {
          return function() {
            var _ref;
            _this.modal.resize();
            return (_ref = _this.modal) != null ? _ref.toggleConfirm(false) : void 0;
          };
        })(this));
        appNameDom = this.modal.tpl.find('#app-name');
        checkAppNameRepeat = this.checkAppNameRepeat.bind(this);
        appNameDom.keyup(function() {
          return checkAppNameRepeat(appNameDom.val());
        });
        self = this;
        this.modal.on('confirm', (function(_this) {
          return function() {
            var appNameRepeated;
            _this.hideError();
            if (!App.user.hasCredential()) {
              App.showSettings(App.showSettings.TAB.Credential);
              return false;
            }
            appNameRepeated = _this.checkAppNameRepeat(appNameDom.val());
            if (!_this.defaultKpIsSet(cloudType) || appNameRepeated) {
              return false;
            }
            _this.modal.tpl.find(".btn.modal-confirm").attr("disabled", "disabled");
            _this.json = _this.workspace.design.serialize({
              usage: 'runStack'
            });
            _this.json.usage = $("#app-usage-selectbox").find(".dropdown .item.selected").data('value');
            _this.json.name = appNameDom.val();
            return _this.workspace.opsModel.run(_this.json, appNameDom.val()).then(function(ops) {
              self.modal.close();
              return App.openOps(ops);
            }, function(err) {
              var error;
              self.modal.close();
              error = err.awsError ? err.error + "." + err.awsError : " " + err.error + " : " + (err.result || err.msg);
              return notification('error', sprintf(lang.NOTIFY.FAILA_TO_RUN_STACK_BECAUSE_OF_XXX, self.workspace.opsModel.get('name'), error));
            });
          };
        })(this));
        App.user.on('change:credential', function() {
          if (App.user.hasCredential() && that.modal.isOpen()) {
            return that.modal.find(".modal-confirm").text(lang.IDE.RUN_STACK_MODAL_CONFIRM_BTN);
          }
        });
        return this.modal.on('close', function() {
          return App.user.off('change:credential');
        });
      },
      renderKpDropdown: function(modal, cloudType) {
        var KeypairModel, defaultKp, hideKpError, keyPairDropdown, osKeypair;
        if (cloudType === OpsModel.Type.OpenStack) {
          if (!OsKp.prototype.hasResourceWithDefaultKp()) {
            return false;
          }
          osKeypair = new OsKp();
          KeypairModel = Design.modelClassForType(constant.RESTYPE.OSKP);
          defaultKp = _.find(KeypairModel.allObjects(), function(obj) {
            return obj.get('name') === 'DefaultKP';
          });
          if (modal.isOpen()) {
            modal.find("#kp-runtime-placeholder").html(osKeypair.render(defaultKp.get("keyName")).$el);
          }
          modal.tpl.find('.default-kp-group').show();
          osKeypair.$input.on('change', function() {
            return osKeypair.setDefaultKeyPair();
          });
          return false;
        }
        if (AwsKp.hasResourceWithDefaultKp()) {
          keyPairDropdown = new AwsKp();
          if (modal) {
            modal.tpl.find("#kp-runtime-placeholder").html(keyPairDropdown.render().el);
          } else {
            return false;
          }
          hideKpError = this.hideError.bind(this);
          keyPairDropdown.dropdown.on('change', function() {
            return hideKpError('kp');
          });
          modal.tpl.find('.default-kp-group').show();
          modal.on('close', function() {
            return keyPairDropdown.remove();
          });
        }
        return null;
      },
      hideError: function(type) {
        var selector;
        selector = type ? $("#runtime-error-" + type) : $(".runtime-error");
        return selector.hide();
      },
      defaultKpIsSet: function(cloudType) {
        var defaultKP, kpModal;
        if (cloudType === OpsModel.Type.OpenStack) {
          if (OsKp.prototype.hasResourceWithDefaultKp() && OsKp.prototype.defaultKpNotSet()) {
            this.showError('kp', lang.IDE.RUN_STACK_MODAL_KP_WARNNING);
            return false;
          } else {
            return true;
          }
        }
        if (!AwsKp.hasResourceWithDefaultKp()) {
          return true;
        }
        kpModal = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKP = kpModal.getDefaultKP();
        if (!defaultKP.get('isSet') || !((this.modal || this.updateModal) && (this.modal || this.updateModal).tpl.find("#kp-runtime-placeholder .item.selected").size())) {
          this.showError('kp', lang.IDE.RUN_STACK_MODAL_KP_WARNNING);
          return false;
        }
        return true;
      },
      checkAppNameRepeat: function(nameVal) {
        if (App.model.appList().findWhere({
          name: nameVal
        })) {
          this.showError('appname', lang.PROP.MSG_WARN_REPEATED_APP_NAME);
          return true;
        } else if (!nameVal) {
          this.showError('appname', lang.PROP.MSG_WARN_NO_APP_NAME);
          return true;
        } else {
          this.hideError('appname');
          return false;
        }
      },
      showError: function(id, msg) {
        return $("#runtime-error-" + id).text(msg).show();
      },
      deleteStack: function(id, name) {
        name = name || App.model.stackList().get(id).get("name");
        modal(AppTpl.removeStackConfirm({
          msg: sprintf(lang.TOOLBAR.POP_BODY_DELETE_STACK, name)
        }));
        $("#confirmRmStack").on("click", function() {
          var opsModel, p;
          opsModel = App.model.stackList().get(id);
          p = opsModel.remove();
          if (opsModel.isPersisted()) {
            return p.then(function() {
              return notification("info", sprintf(lang.NOTIFY.ERR_DEL_STACK_SUCCESS, name));
            }, function() {
              return notification("error", sprintf(lang.NOTIFY.ERR_DEL_STACK_FAILED, name));
            });
          }
        });
      },
      duplicateStack: function(id) {
        var opsModel;
        opsModel = App.model.stackList().get(id);
        if (!opsModel) {
          return;
        }
        opsModel.fetchJsonData().then(function() {
          return App.openOps(App.model.createStackByJson(opsModel.getJsonData()));
        }, function() {
          return notification("error", lang.NOTIFY.ERROR_CANT_DUPLICATE);
        });
      },
      startApp: function(id) {
        var app, startAppModal;
        app = App.model.appList().get(id);
        startAppModal = new modalPlus({
          template: AppTpl.loading(),
          title: lang.TOOLBAR.TIP_START_APP,
          confirm: {
            text: lang.TOOLBAR.POP_BTN_START_APP,
            color: 'blue',
            disabled: false
          },
          disableClose: true
        });
        startAppModal.tpl.find('.modal-footer').hide();
        return this.checkBeforeStart(app).then(function(result) {
          var awsError, hasASG, hasDBInstance, hasEC2Instance, lostDBSnapshot;
          hasEC2Instance = result.hasEC2Instance, hasDBInstance = result.hasDBInstance, hasASG = result.hasASG, lostDBSnapshot = result.lostDBSnapshot, awsError = result.awsError;
          if (awsError && awsError !== 403) {
            startAppModal.close();
            notification('error', lang.NOTIFY.ERROR_FAILED_LOAD_AWS_DATA);
            return false;
          }
          startAppModal.tpl.find('.modal-footer').show();
          startAppModal.tpl.find('.modal-body').html(AppTpl.startAppConfirm({
            hasEC2Instance: hasEC2Instance,
            hasDBInstance: hasDBInstance,
            hasASG: hasASG,
            lostDBSnapshot: lostDBSnapshot
          }));
          startAppModal.on('confirm', function() {
            startAppModal.close();
            App.model.appList().get(id).start().fail(function(err) {
              var error;
              error = err.awsError ? err.error + "." + err.awsError : err.error;
              notification('error', sprintf(lang.NOTIFY.ERROR_FAILED_START, name, error));
            });
          });
        });
      },
      checkBeforeStart: function(app) {
        var cloudType, comp, defer;
        comp = null;
        cloudType = app.type;
        defer = new Q.defer();
        if (cloudType === OpsModel.Type.OpenStack) {
          console.log("CloudType is OpenStack");
          defer.resolve({});
        } else {
          ApiRequest("app_info", {
            region_name: app.get("region"),
            app_ids: [app.get("id")]
          }).then(function(ds) {
            return comp = ds[0].component;
          }).then(function() {
            var awsError, dbInstance, hasASG, hasDBInstance, hasEC2Instance, name, snapshots;
            name = App.model.appList().get(app.get("id")).get("name");
            hasEC2Instance = !!(_.filter(comp, function(e) {
              return e.type === constant.RESTYPE.INSTANCE;
            })).length;
            hasDBInstance = !!(_.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            })).length;
            hasASG = !!(_.filter(comp, function(e) {
              return e.type === constant.RESTYPE.ASG;
            })).length;
            dbInstance = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            });
            snapshots = CloudResources(constant.RESTYPE.DBSNAP, app.get("region"));
            awsError = null;
            return snapshots.fetchForce().fail(function(error) {
              return awsError = error.awsError;
            })["finally"](function() {
              var lostDBSnapshot;
              lostDBSnapshot = _.filter(dbInstance, function(e) {
                return e.resource.DBSnapshotIdentifier && !snapshots.findWhere({
                  id: e.resource.DBSnapshotIdentifier
                });
              });
              return defer.resolve({
                hasEC2Instance: hasEC2Instance,
                hasDBInstance: hasDBInstance,
                hasASG: hasASG,
                lostDBSnapshot: lostDBSnapshot,
                awsError: awsError
              });
            });
          });
        }
        return defer.promise;
      },
      checkBeforeStop: function(app) {
        var cloudType, defer, resourceList;
        cloudType = app.type;
        if (cloudType === OpsModel.Type.OpenStack) {
          console.log("CloudType is OpenStack");
          defer = new Q.defer();
          defer.resolve();
          return defer.promise;
        } else {
          resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
          return resourceList.fetchForce();
        }
      },
      stopApp: function(id) {
        var app, appName, awsError, cloudType, isProduction, name, stopModal, that;
        app = App.model.appList().get(id);
        name = app.get("name");
        that = this;
        cloudType = app.type;
        isProduction = app.get('usage') === "production";
        appName = app.get('name');
        stopModal = new modalPlus({
          template: AppTpl.loading(),
          title: isProduction ? lang.TOOLBAR.POP_TIT_STOP_PRD_APP : lang.TOOLBAR.POP_TIT_STOP_APP,
          confirm: {
            text: lang.TOOLBAR.POP_BTN_STOP_APP,
            color: 'red',
            disabled: isProduction
          },
          disableClose: true
        });
        stopModal.tpl.find(".modal-footer").hide();
        awsError = null;
        return this.checkBeforeStop(app).fail(function(error) {
          console.log(error);
          if (error.awsError) {
            return awsError = error.awsError;
          }
        })["finally"](function() {
          var resourceList;
          resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
          if (awsError && awsError !== 403) {
            stopModal.close();
            notification('error', lang.NOTIFY.ERROR_FAILED_LOAD_AWS_DATA);
            return false;
          }
          if (cloudType === OpsModel.Type.OpenStack) {
            stopModal.tpl.find(".modal-footer").show();
            stopModal.tpl.find('.modal-body').css('padding', "0").html(AppTpl.stopAppConfirm({
              isProduction: isProduction,
              appName: appName
            }));
            stopModal.resize();
            $("#appNameConfirmIpt").on("keyup change", function() {
              if ($("#appNameConfirmIpt").val() === name) {
                return stopModal.tpl.find('.modal-confirm').removeAttr("disabled");
              } else {
                return stopModal.tpl.find('.modal-confirm').attr("disabled", "disabled");
              }
            });
          } else {
            app.fetchJsonData().then(function() {
              var amiRes, com, comp, imageId, toFetch, toFetchArray, uid;
              comp = app.getJsonData().component;
              toFetch = {};
              for (uid in comp) {
                com = comp[uid];
                if (com.type === constant.RESTYPE.INSTANCE || com.type === constant.RESTYPE.LC) {
                  imageId = com.resource.ImageId;
                  if (imageId) {
                    toFetch[imageId] = true;
                  }
                }
              }
              toFetchArray = _.keys(toFetch);
              amiRes = CloudResources(constant.RESTYPE.AMI, app.get("region"));
              return amiRes.fetchAmis(_.keys(toFetch)).then(function() {
                var dbInstanceName, hasAsg, hasDBInstance, hasEC2Instance, hasInstanceStore, hasNotReadyDB, _ref, _ref1;
                hasInstanceStore = false;
                amiRes.each(function(e) {
                  var _ref;
                  if ((_ref = e.id, __indexOf.call(toFetchArray, _ref) >= 0) && e.get("rootDeviceType") === 'instance-store') {
                    hasInstanceStore = true;
                    return null;
                  }
                });
                hasEC2Instance = (_ref = _.filter(comp, function(e) {
                  return e.type === constant.RESTYPE.INSTANCE;
                })) != null ? _ref.length : void 0;
                hasDBInstance = _.filter(comp, function(e) {
                  return e.type === constant.RESTYPE.DBINSTANCE;
                });
                dbInstanceName = _.map(hasDBInstance, function(e) {
                  return e.resource.DBInstanceIdentifier;
                });
                hasNotReadyDB = resourceList.filter(function(e) {
                  var _ref1;
                  return (_ref1 = e.get('DBInstanceIdentifier'), __indexOf.call(dbInstanceName, _ref1) >= 0) && e.get('DBInstanceStatus') !== 'available';
                });
                hasAsg = (_ref1 = _.filter(comp, function(e) {
                  return e.type === constant.RESTYPE.ASG;
                })) != null ? _ref1.length : void 0;
                stopModal.tpl.find(".modal-footer").show();
                if (hasNotReadyDB && hasNotReadyDB.length) {
                  stopModal.tpl.find('.modal-body').html(AppTpl.cantStop({
                    cantStop: hasNotReadyDB
                  }));
                  stopModal.tpl.find('.modal-confirm').remove();
                } else {
                  hasDBInstance = hasDBInstance != null ? hasDBInstance.length : void 0;
                  stopModal.tpl.find('.modal-body').css('padding', "0").html(AppTpl.stopAppConfirm({
                    isProduction: isProduction,
                    appName: appName,
                    hasEC2Instance: hasEC2Instance,
                    hasDBInstance: hasDBInstance,
                    hasAsg: hasAsg,
                    hasInstanceStore: hasInstanceStore
                  }));
                }
                stopModal.resize();
                return $("#appNameConfirmIpt").on("keyup change", function() {
                  if ($("#appNameConfirmIpt").val() === name) {
                    return stopModal.tpl.find('.modal-confirm').removeAttr("disabled");
                  } else {
                    return stopModal.tpl.find('.modal-confirm').attr("disabled", "disabled");
                  }
                });
              });
            });
          }
          return stopModal.on("confirm", function() {
            stopModal.close();
            return app.stop().fail(function(err) {
              var error;
              console.log(err);
              error = err.awsError ? err.error + "." + err.awsError : err.error;
              return notification(sprintf(lang.NOTIFY.ERROR_FAILED_STOP, name, error));
            });
          });
        });
      },
      terminateApp: function(id) {
        var app, cloudType, name, production, resourceList, self, terminateConfirm;
        self = this;
        app = App.model.appList().get(id);
        name = app.get("name");
        production = app.get("usage") === 'production';
        terminateConfirm = new modalPlus({
          title: production ? lang.TOOLBAR.POP_TIT_TERMINATE_PRD_APP : lang.TOOLBAR.POP_TIT_TERMINATE_APP,
          template: AppTpl.loading(),
          confirm: {
            text: lang.TOOLBAR.POP_BTN_TERMINATE_APP,
            color: "red",
            disabled: production
          },
          disableClose: true
        });
        cloudType = app.type;
        if (cloudType === OpsModel.Type.OpenStack) {
          this.__terminateApp(id, null, terminateConfirm);
          return false;
        }
        terminateConfirm.tpl.find('.modal-footer').hide();
        resourceList = CloudResources(constant.RESTYPE.DBINSTANCE, app.get("region"));
        return resourceList.fetchForce().then(function(result) {
          return self.__terminateApp(id, resourceList, terminateConfirm);
        }).fail(function(error) {
          if (error.awsError === 403) {
            return self.__terminateApp(id, resourceList, terminateConfirm);
          } else {
            terminateConfirm.close();
            notification('error', lang.NOTIFY.ERROR_FAILED_LOAD_AWS_DATA);
            return false;
          }
        });
      },
      __terminateApp: function(id, resourceList, terminateConfirm) {
        var app, cloudType, fetchJsonData, name, production;
        app = App.model.appList().get(id);
        name = app.get("name");
        production = app.get("usage") === 'production';
        cloudType = app.type;
        fetchJsonData = function() {
          var defer;
          if (cloudType === OpsModel.Type.OpenStack) {
            defer = new Q.defer();
            defer.resolve();
            return defer.promise;
          } else {
            return app.fetchJsonData();
          }
        };
        return fetchJsonData().then(function() {
          var comp, dbInstanceName, hasDBInstance, notReadyDB;
          if (cloudType === OpsModel.Type.OpenStack) {
            hasDBInstance = null;
            notReadyDB = [];
          } else {
            comp = app.getJsonData().component;
            hasDBInstance = _.filter(comp, function(e) {
              return e.type === constant.RESTYPE.DBINSTANCE;
            });
            dbInstanceName = _.map(hasDBInstance, function(e) {
              return e.resource.DBInstanceIdentifier;
            });
            notReadyDB = resourceList.filter(function(e) {
              var _ref;
              return (_ref = e.get('DBInstanceIdentifier'), __indexOf.call(dbInstanceName, _ref) >= 0) && e.get('DBInstanceStatus') !== 'available';
            });
          }
          terminateConfirm.tpl.find('.modal-body').html(AppTpl.terminateAppConfirm({
            production: production,
            name: name,
            hasDBInstance: hasDBInstance,
            notReadyDB: notReadyDB
          }));
          terminateConfirm.tpl.find('.modal-footer').show();
          terminateConfirm.resize();
          if (notReadyDB != null ? notReadyDB.length : void 0) {
            terminateConfirm.tpl.find("#take-rds-snapshot").attr("checked", false).change(function() {
              return terminateConfirm.tpl.find(".modal-confirm").attr('disabled', $(this).is(":checked"));
            });
          }
          $("#appNameConfirmIpt").on("keyup change", function() {
            if ($("#appNameConfirmIpt").val() === name) {
              terminateConfirm.tpl.find('.modal-confirm').removeAttr("disabled");
            } else {
              terminateConfirm.tpl.find('.modal-confirm').attr("disabled", "disabled");
            }
          });
          terminateConfirm.on("confirm", function() {
            var takeSnapshot;
            terminateConfirm.close();
            takeSnapshot = terminateConfirm.tpl.find("#take-rds-snapshot").is(':checked');
            app.terminate(null, {
              create_snapshot: takeSnapshot
            }).fail(function(err) {
              var error;
              error = err.awsError ? err.error + "." + err.awsError : err.error;
              return notification(sprintf(lang.NOTIFY.ERROR_FAILED_TERMINATE, name, error));
            });
          });
        });
      },
      forgetApp: function(id) {
        var app, forgetConfirm, name, production, self;
        self = this;
        app = App.model.appList().get(id);
        name = app.get("name");
        production = app.get("usage") === 'production';
        forgetConfirm = new modalPlus({
          title: lang.IDE.TITLE_CONFIRM_TO_FORGET,
          template: AppTpl.loading(),
          confirm: {
            text: lang.TOOLBAR.BTN_FORGET_CONFIRM,
            color: "red",
            disabled: production
          },
          disableClose: true
        });
        forgetConfirm.tpl.find('.modal-footer').hide();
        return self.__forgetApp(id, forgetConfirm);
      },
      __forgetApp: function(id, forgetConfirm) {
        var app, comp, hasState, name, production, uid, _ref, _ref1;
        app = App.model.appList().get(id);
        name = app.get("name");
        production = app.get("usage") === 'production';
        hasState = false;
        if (Design.instance().get("agent").enabled) {
          _ref = Design.instance().serialize().component;
          for (uid in _ref) {
            comp = _ref[uid];
            if (((_ref1 = comp.type) === constant.RESTYPE.INSTANCE || _ref1 === constant.RESTYPE.LC) && comp.state && comp.state.length > 0) {
              hasState = true;
              break;
            }
            null;
          }
        }
        return app.fetchJsonData().then(function() {
          forgetConfirm.tpl.find('.modal-body').html(AppTpl.forgetAppConfirm({
            production: production,
            name: name,
            hasState: hasState
          }));
          forgetConfirm.tpl.find('.modal-footer').show();
          forgetConfirm.resize();
          if (hasState) {
            forgetConfirm.tpl.find('.modal-confirm').attr("disabled", "disabled");
          }
          $("#appNameConfirmIpt").on("keyup change", function() {
            if ($("#appNameConfirmIpt").val() === name) {
              forgetConfirm.tpl.find('.modal-confirm').removeAttr("disabled");
            } else {
              forgetConfirm.tpl.find('.modal-confirm').attr("disabled", "disabled");
            }
          });
          forgetConfirm.on("confirm", function() {
            forgetConfirm.close();
            app.terminate(true, false).fail(function(err) {
              var error;
              error = err.awsError ? err.error + "." + err.awsError : err.error;
              return notification("Fail to forget your app \"" + name + "\". (ErrorCode: " + error + ")");
            });
          });
        });
      },
      showPayment: function(elem) {
        var paymentModal, paymentState, result, showPaymentDefer, updateDom;
        showPaymentDefer = Q.defer();
        paymentState = App.user.get("paymentState");
        if (!App.user.shouldPay()) {
          showPaymentDefer.resolve({});
        } else {
          result = {
            first_name: App.user.get("firstName"),
            last_name: App.user.get("lastName"),
            url: App.user.get("paymentUrl"),
            card: App.user.get("creditCard")
          };
          updateDom = MC.template.paymentUpdate(result);
          if (elem) {
            $(elem).html(updateDom);
            $(elem).trigger('paymentRendered');
          } else {
            paymentModal = new modalPlus({
              title: lang.IDE.PAYMENT_INVALID_BILLING,
              template: updateDom,
              disableClose: true,
              confirm: {
                text: App.user.hasCredential() ? lang.IDE.RUN_STACK_MODAL_CONFIRM_BTN : lang.IDE.RUN_STACK_MODAL_NEED_CREDENTIAL,
                disabled: true
              }
            });
            paymentModal.find('.modal-footer').hide();
            paymentModal.listenTo(App.user, "paymentUpdate", function() {
              if (paymentModal.isClosed) {
                return false;
              }
              if (!App.user.shouldPay()) {
                return showPaymentDefer.resolve({
                  result: result,
                  modal: paymentModal
                });
              }
            });
          }
        }
        return showPaymentDefer.promise;
      }
    });
    return new AppAction();
  });

}).call(this);


define("component/AppAction", function(){});
