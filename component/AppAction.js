define('component/appactions/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-center-align-helper\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.msg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.removeStackConfirm=Handlebars.template(__TEMPLATE__);


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
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_START_WARNING", {hash:{},data:data}))
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
    + "</div>\n    <ul class=\"mega-list-wraper-items\">\n        ";
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
    + "</div>\n        <ul class=\"mega-list-wraper-items\">\n            ";
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
    + "(<span class=\"warning-text\">"
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
  buffer += "\n        <section class=\"release-eip checkbox-wrap\">\n            <div class=\"checkbox\">\n                <input type=\"checkbox\" id=\"release-eip-checkbox\" />\n                <label for=\"release-eip-checkbox\"></label>\n            </div>\n            <label class=\"modal-text-minor\" for=\"release-eip-checkbox\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_RELEASE_EIP_LABEL", {hash:{},data:data}))
    + "(";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.eipsToRelease), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ")</label>\n            <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_RELEASE_EIP_NOTE", {hash:{},data:data}))
    + "</p>\n        </section>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.resource)),stack1 == null || stack1 === false ? stack1 : stack1.PublicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }
function program7(depth0,data) {
  
  
  return ", ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"check-final-snapshot checkbox-wrap\">\n            <div class=\"checkbox\">\n                <input id=\"take-rds-snapshot\" type=\"checkbox\" checked=\"checked\" name=\"dns-resolution\">\n                <label for=\"take-rds-snapshot\"></label>\n            </div>\n            <label class=\"modal-text-minor\" for=\"take-rds-snapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_TAKE_DB_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n        </section>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notReadyDB)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <p class=\"cant-snapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_CANT_TAKE_SNAPSHOT_1", {hash:{},data:data}))
    + "\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notReadyDB), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_CANT_TAKE_SNAPSHOT_2", {hash:{},data:data}))
    + "</p>\n        ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"resource-tag\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>(<span class=\"db-stop-status\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attributes)),stack1 == null || stack1 === false ? stack1 : stack1.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)";
  return buffer;
  }

  buffer += "<div class=\"mg20\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.production), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eipsToRelease)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.hasDBInstance)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
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
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_FORGET_PROD_APP_INPUT_LBL", {hash:{},data:data}))
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
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TERMINATE_PROTECTION_CANNOT_TERMINITE", {hash:{},data:data}))
    + "</div>\n<div class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  };
TEMPLATE.hasTerminationProtection=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });

/*
----------------------------
  App Action Method
----------------------------
 */
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define('AppAction',["backbone", "component/appactions/template", "ThumbnailUtil", 'i18n!/nls/lang.js', 'CloudResources', 'constant', 'UI.modalplus', 'ApiRequest', 'kp_dropdown', 'OsKp', 'TaGui', 'OpsModel', "credentialFormView"], function(Backbone, AppTpl, Thumbnail, lang, CloudResources, constant, modalPlus, ApiRequest, AwsKp, OsKp, TA, OpsModel, CredentialFormView) {
  return Backbone.View.extend({
    initialize: function(options) {
      return _.extend(this, options);
    },
    credentialId: function() {
      if (Design.instance()) {
        return Design.instance().credentialId();
      } else {
        return this.model.project().credIdOfProvider(this.model.get("provider"));
      }
    },
    runStack: function(paymentUpdate, paymentModal) {
      var $selectbox, appNameDom, checkAppNameRepeat, cloudType, cost, costString, paymentState, self, taPassed, that, _ref;
      cloudType = this.workspace.opsModel.type;
      that = this;
      paymentState = this.workspace.opsModel.project().get("billingState");
      if (paymentModal) {
        this.modal = paymentModal;
        this.modal.setTitle(lang.IDE.RUN_STACK_MODAL_TITLE).setWidth('665px').setContent(MC.template.modalRunStack({
          paymentState: paymentState,
          paymentUpdate: paymentUpdate
        })).compact().find('.modal-footer').show();
      } else {
        this.modal = new modalPlus({
          title: lang.IDE.RUN_STACK_MODAL_TITLE,
          template: MC.template.modalRunStack({
            paymentState: paymentState,
            paymentUpdate: paymentUpdate
          }),
          disableClose: true,
          width: '665px',
          compact: true,
          confirm: {
            text: !Design.instance().project().isDemoMode() ? lang.IDE.RUN_STACK_MODAL_CONFIRM_BTN : lang.IDE.RUN_STACK_MODAL_NEED_CREDENTIAL,
            disabled: true
          }
        });
        this.renderKpDropdown(this.modal, cloudType);
      }
      if (cloudType === OpsModel.Type.OpenStack) {
        this.modal.find(".estimate").hide();
        this.modal.resize();
      }
      cost = Design.instance().getCost();
      this.modal.find('.modal-input-value').val(this.workspace.opsModel.get("name"));
      costString = "$" + cost.totalFee;
      if ((_ref = Design.instance().region()) === 'cn-north-1') {
        costString = "￥" + cost.totalFee;
      }
      this.modal.find("#label-total-fee").find('b').text(costString);
      this.modal.find("#label-visualops-fee").find('b').text("$" + cost.visualOpsFee);
      $selectbox = this.modal.find("#app-usage-selectbox.selectbox");
      $selectbox.on("OPTION_CHANGE", function(evt, _, result) {
        return $selectbox.parent().find("input.custom-app-usage").toggleClass("show", result.value === "custom");
      });
      taPassed = false;
      TA.loadModule('stack').then((function(_this) {
        return function() {
          taPassed = true;
          return _this.modal.resize();
        };
      })(this))["catch"]((function(_this) {
        return function() {
          return _this.modal.find('.modal-confirm').addClass('disabled').addClass('tooltip').attr('data-tooltip', lang.TOOLBAR.FIX_THE_ERROR_TO_LAUNCH_APP);
        };
      })(this)).fin((function(_this) {
        return function() {
          return _this.modal.toggleConfirm(false);
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
          var appNameRepeated, usage;
          if (!taPassed) {
            return;
          }
          _this.hideError();
          if (Design.instance().project().isDemoMode()) {
            if (Design.instance().project().amIAdmin()) {
              new CredentialFormView({
                model: Design.instance().project()
              }).render();
            } else {
              self.modal.find(".modal-body .members-only").show();
            }
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
          usage = $("#app-usage-selectbox").find(".dropdown .item.selected").data('value');
          if (usage === "custom") {
            usage = $.trim($selectbox.parent().find("input.custom-app-usage").val()) || "custom";
          }
          _this.json.usage = usage;
          _this.json.name = appNameDom.val();
          return _this.workspace.opsModel.run(_this.json, appNameDom.val()).then(function(ops) {
            self.modal.close();
            return App.loadUrl(ops.url());
          }, function(err) {
            var error;
            self.modal.close();
            error = err.awsError ? err.error + "." + err.awsError : " " + err.error + " : " + (err.result || err.msg);
            return notification('error', sprintf(lang.NOTIFY.FAILA_TO_RUN_STACK_BECAUSE_OF_XXX, self.workspace.opsModel.get('name'), error));
          });
        };
      })(this));
      this.modal.listenTo(Design.instance().project(), 'change:credential', function() {
        if (Design.instance().credential() && that.modal.isOpen()) {
          return that.modal.find(".modal-confirm").text(lang.IDE.RUN_STACK_MODAL_CONFIRM_BTN);
        }
      });
      return this.modal.on('close', function() {
        return that.modal.stopListening(App.user);
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
      if (this.workspace.opsModel.project().apps().findWhere({
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
      var modal, self, workspace, _ref;
      workspace = this.workspace;
      name = name || ((_ref = this.workspace) != null ? _ref.opsModel.project().stacks().get(id).get("name") : void 0) || this.model.get("name");
      self = this;
      modal = new modalPlus({
        title: lang.TOOLBAR.TIP_DELETE_STACK,
        width: 420,
        confirm: {
          text: lang.TOOLBAR.POP_BTN_DELETE_STACK,
          color: "red"
        },
        template: AppTpl.removeStackConfirm({
          msg: sprintf(lang.TOOLBAR.POP_BODY_DELETE_STACK, name)
        })
      });
      return modal.on("confirm", function() {
        var opsModel, p;
        modal.close();
        opsModel = self.model || workspace.opsModel.project().stacks().get(id);
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
      var opsModel, workspace;
      workspace = this.workspace;
      opsModel = this.model || workspace.opsModel.project().stacks().get(id);
      if (!opsModel) {
        return;
      }
      opsModel.fetchJsonData().then(function() {
        return App.loadUrl((opsModel.project() || workspace.opsModel.project()).createStackByJson(opsModel.getJsonData()).url());
      }, function() {
        return notification("error", lang.NOTIFY.ERROR_CANT_DUPLICATE);
      });
    },
    startApp: function(id) {
      var app, startAppModal, workspace;
      workspace = this.workspace;
      app = this.model || workspace.opsModel.project().apps().get(id);
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
          app.start().fail(function(err) {
            var error;
            error = err.awsError ? err.error + "." + err.awsError : err.error;
            notification('error', sprintf(lang.NOTIFY.ERROR_FAILED_START, name, error));
          });
        });
      });
    },
    checkBeforeStart: function(app) {
      var cloudType, comp, defer, self;
      self = this;
      comp = null;
      cloudType = app.type;
      defer = new Q.defer();
      if (cloudType === OpsModel.Type.OpenStack) {
        console.log("CloudType is OpenStack");
        defer.resolve({});
      } else {
        ApiRequest("app_info", {
          key_id: this.credentialId(),
          region_name: app.get("region"),
          app_ids: [app.get("id")]
        }).then(function(ds) {
          return comp = ds[0].component;
        }).then(function() {
          var awsError, dbInstance, hasASG, hasDBInstance, hasEC2Instance, snapshots;
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
          snapshots = CloudResources(self.credentialId(), constant.RESTYPE.DBSNAP, app.get("region"));
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
        resourceList = CloudResources(this.credentialId(), constant.RESTYPE.DBINSTANCE, app.get("region"));
        return resourceList.fetchForce();
      }
    },
    stopApp: function(id) {
      var app, appName, awsError, cloudType, isProduction, name, stopModal, that;
      app = this.model || this.workspace.opsModel.project().apps().get(id);
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
        resourceList = CloudResources(that.credentialId(), constant.RESTYPE.DBINSTANCE, app.get("region"));
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
            amiRes = CloudResources(that.credentialId(), constant.RESTYPE.AMI, app.get("region"));
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
    terminateApp: function(id, hasJson) {
      var app, cloudType, name, production, resourceList, self, terminateConfirm;
      self = this;
      app = this.model || this.workspace.opsModel.project().apps().get(id);
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
        this.__terminateApp(id, null, terminateConfirm, hasJson);
        return false;
      }
      terminateConfirm.tpl.find('.modal-footer').hide();
      resourceList = CloudResources(self.credentialId(), constant.RESTYPE.DBINSTANCE, app.get("region"));
      return resourceList.fetchForce().then(function() {
        return self.__checkTerminateProtection(terminateConfirm).then(function() {
          return self.__terminateApp(id, resourceList, terminateConfirm, hasJson);
        });
      }, function(error) {
        if (error.awsError === 403) {
          return self.__terminateApp(id, resourceList, terminateConfirm, hasJson);
        } else {
          terminateConfirm.close();
          notification('error', lang.NOTIFY.ERROR_FAILED_LOAD_AWS_DATA);
          return false;
        }
      });
    },
    __checkTerminateProtection: function(modal) {
      var design, needCheckProtection, opsModel, _ref, _ref1;
      needCheckProtection = false;
      opsModel = ((_ref = this.workspace) != null ? _ref.opsModel : void 0) || this.model;
      design = (_ref1 = this.workspace) != null ? _ref1.design : void 0;
      if (design) {
        design.eachComponent(function(comp) {
          var _ref2;
          if ((_ref2 = comp.type) === constant.RESTYPE.INSTANCE || _ref2 === constant.RESTYPE.ASG) {
            needCheckProtection = true;
            return false;
          }
        });
      } else {
        needCheckProtection = true;
      }
      if (!needCheckProtection) {
        return Promise.resolve({});
      }
      return opsModel.checkTerminateProtection().then(function(res) {
        var id, iname, instanceList, instanceListStr, name;
        if (_.size(res)) {
          instanceList = [];
          for (id in res) {
            name = res[id];
            if (_.isString(name)) {
              iname = "" + name + "(" + id + ")";
            } else {
              iname = id;
            }
            instanceList.push(iname);
          }
          instanceListStr = instanceList.join(', ');
          modal.tpl.find('.modal-body').html(AppTpl.hasTerminationProtection({
            instanceList: instanceListStr
          }));
          modal.tpl.find('.modal-confirm').remove();
          modal.tpl.find('.modal-footer .modal-close').text(lang.IDE.PROC_CLOSE_TAB);
          modal.tpl.find('.modal-footer').show();
          return Promise.reject({});
        } else {
          return Promise.resolve({});
        }
      }, function(err) {
        console.error(err);
        return Promise.resolve();
      });
    },
    __terminateApp: function(id, resourceList, terminateConfirm, hasJsonData) {
      var app, cloudType, eipsToRelease, fetchJsonData, hasDBInstance, name, notReadyDB, production;
      app = this.model || this.workspace.opsModel.project().apps().get(id);
      name = app.get("name");
      production = app.get("usage") === 'production';
      cloudType = app.type;
      fetchJsonData = function() {
        var defer;
        defer = new Q.defer();
        if (cloudType === OpsModel.Type.OpenStack) {
          defer.resolve();
          return defer.promise;
        } else if (hasJsonData) {
          defer.resolve();
          return defer.promise;
        } else {
          return app.fetchJsonData();
        }
      };
      hasDBInstance = null;
      notReadyDB = [];
      eipsToRelease = [];
      return fetchJsonData().then(function() {
        var comp, dbInstanceName;
        if (cloudType === OpsModel.Type.OpenStack) {
          hasDBInstance = null;
          notReadyDB = [];
        } else {
          comp = app.getJsonData().component;
          hasDBInstance = _.filter(comp, function(e) {
            return e.type === constant.RESTYPE.DBINSTANCE;
          });
          eipsToRelease = _.filter(comp, function(e) {
            return e.type === constant.RESTYPE.EIP;
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
          notReadyDB: notReadyDB,
          eipsToRelease: eipsToRelease
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
          var create_snapshot, release_eip;
          terminateConfirm.close();
          create_snapshot = terminateConfirm.tpl.find("#take-rds-snapshot").is(':checked');
          release_eip = terminateConfirm.tpl.find("#release-eip-checkbox").is(":checked");
          app.terminate(null, {
            create_snapshot: create_snapshot,
            release_eip: release_eip
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
      app = this.workspace.opsModel.project().apps().get(id);
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
      app = this.workspace.opsModel.project().apps().get(id);
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
          app.terminate(true, false).then(function() {
            return notification("info", "Your app \"" + name + "\" has been removed from our database.");
          }, function(err) {
            return notification("error", "Failed to remove your app \"" + name + "\" from our database. (ErrorCode: " + err.error + ")");
          });
        });
      });
    },
    showPayment: function(elem, opsModel) {
      var paymentModal, project, project_id, result, showPaymentDefer, url, _ref;
      if (!opsModel) {
        opsModel = (_ref = this.workspace) != null ? _ref.opsModel : void 0;
      }
      project = (opsModel != null ? opsModel.project() : void 0) || this.project;
      project_id = project.get("id");
      showPaymentDefer = Q.defer();
      url = "/settings/" + project_id + "/billing";
      if (!project.shouldPay()) {
        showPaymentDefer.resolve({
          result: {
            url: url
          }
        });
      } else {
        result = {
          isAdmin: project.amIAdmin(),
          url: url,
          freePointsPerMonth: 3600
        };
        if (elem) {
          $(elem).html(MC.template.loadingSpinner());
          $(elem).trigger('paymentRendered');
        } else {
          paymentModal = new modalPlus({
            title: lang.PROP.LBL_LOADING,
            template: MC.template.loadingSpinner(),
            disableClose: true,
            confirm: {
              text: !project.isDemoMode() ? lang.IDE.RUN_STACK_MODAL_CONFIRM_BTN : lang.IDE.RUN_STACK_MODAL_NEED_CREDENTIAL,
              disabled: true
            }
          });
          paymentModal.find('.modal-footer').hide();
        }
        project.getPaymentState().then(function() {
          var updateDom, _ref1;
          if (((_ref1 = project.get("payment")) != null ? _ref1.cardNumber : void 0) || !project.isPrivate()) {
            updateDom = MC.template.paymentUpdate(result);
          } else {
            updateDom = MC.template.providePayment(result);
          }
          if (elem) {
            $(elem).html(updateDom);
            return $(elem).trigger('paymentRendered');
          } else {
            paymentModal.setContent(updateDom);
            paymentModal.setTitle(lang.IDE.PAYMENT_INVALID_BILLING);
            paymentModal.setContent(updateDom);
            return paymentModal.listenTo(project, "change:billingState", function() {
              if (paymentModal.isClosed) {
                return false;
              }
              if (!project.shouldPay()) {
                return showPaymentDefer.resolve({
                  result: result,
                  modal: paymentModal
                });
              }
            });
          }
        });
      }
      return showPaymentDefer.promise;
    }
  });
});


define("component/AppAction", function(){});
