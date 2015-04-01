define('wspace/dashboard/DashboardTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n                      <div class=\"region-app-stack-wrap marathon\">\n                          <div class=\"dash-region-apps-wrap\">\n                              <div class=\"dashboard-loading\">\n                                  <div class=\"loading-spinner\"></div>\n                              </div>\n                          </div>\n                          <div class=\"dash-region-stacks-wrap\">\n                              <div class=\"dashboard-loading\">\n                                  <div class=\"loading-spinner\"></div>\n                              </div>\n                          </div>\n                      </div>\n                      ";
  }

function program3(depth0,data) {
  
  var stack1;
  stack1 = helpers.each.call(depth0, (depth0 && depth0.regions), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                        <li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.alias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                                    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                          <a class=\"show-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_PROVIDE_YOUR_CREDENTIAL_1", {hash:{},data:data}))
    + "</a> "
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_PROVIDE_YOUR_CREDENTIAL_2", {hash:{},data:data}))
    + "\n                          ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n                          <p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_ASK_ADMIN_PROVIDE_CREDENTIAL", {hash:{},data:data}))
    + "</p>\n                          ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<button class=\"dashboard-nav-log dashboard-nav-audit\" data-id=\"audit\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASHBOARD_PANEL_LOGS_AUDIT", {hash:{},data:data}))
    + "</button>";
  return buffer;
  }

  buffer += "<div>\n\n  <header class=\"dashboard-header\">\n    <button class=\"icon-refresh refreshResource\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_JUST_NOW", {hash:{},data:data}))
    + "</button>\n\n      <button class=\"btn btn-primary icon-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "</button>\n\n      <div class=\"hovermenu\">\n        <button class=\"btn btn-primary icon-import\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_IMPORT_JSON", {hash:{},data:data}))
    + "<i class=\"icon-caret-down\"></i></button>\n        <div class=\"dropdown-menu\"> <ul>\n          <li class='import-stack' data-type=\"stack\" data-analytics-plus=\"import_json\">"
    + escapeExpression(helpers.i18n.call(depth0, "IMPORT_FORM_STACK_JSON", {hash:{},data:data}))
    + "</li>\n          <li class='import-stack' data-type=\"cf\" data-analytics-plus=\"import_cf\">"
    + escapeExpression(helpers.i18n.call(depth0, "IMPORT_FORM_CLOUDFORMATION", {hash:{},data:data}))
    + "</li>\n        </ul> </div>\n      </div>\n\n      <button id=\"VisualizeVPC\" class=\"btn btn-blue icon-visualize tooltip\" data-analytics-plus=\"visualize_vpc\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROVIDE_CRED_TO_VISUALIZE", {hash:{},data:data}))
    + "\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROVIDE_CRED_TO_VISUALIZE", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_VISUALIZE_VPC", {hash:{},data:data}))
    + "</button>\n\n  </header>\n\n  <div class=\"dashboard-wrapper\">\n      <article class=\"dashboard-content\">\n          <div id=\"global-region-wrap\">\n              <!-- Global Map -->\n              <section id=\"dashboard-data-wrap\">\n                  <!-- Region view -->\n                  <section id=\"RegionView\">\n                      <div class=\"region-app-stack-wrap\">\n                          <div class=\"dash-region-apps-wrap\">\n                              <div class=\"dashboard-loading\">\n                                  <div class=\"loading-spinner\"></div>\n                              </div>\n                          </div>\n                          <div class=\"dash-region-stacks-wrap\">\n                              <div class=\"dashboard-loading\">\n                                  <div class=\"loading-spinner\"></div>\n                              </div>\n                          </div>\n                      </div>\n\n                      ";
  stack1 = helpers['if'].call(depth0, false, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                      <div class=\"dash-resource-wrap\">\n                        <header class=\"dash-region-header\">\n                            <label class=\"region-resource-tab\">\n                                Resource Table\n                            </label>\n                            <nav class=\"dash-region-navigation\" data-type=\"resource\">\n                                <button class=\"js-toggle-dropdown\">\n                                    <i class=\"icon-caret-down right\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</span>\n                                </button>\n                                <ul id=\"region-switch-list\" class=\"dropdown-menu\">\n                                    <li data-region=\"global\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</li>\n                                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.providers), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                </ul>\n                            </nav>\n                          </header>\n                          <ul id=\"GlobalView\" style=\"display: none;\"></ul>\n                          <div id=\"RegionViewWrap\">\n                              <nav class=\"\" id=\"RegionResourceNav\">\n                                  <div class=\"resource-tab instances on\" data-type=\"INSTANCE\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab rds\" data-type=\"DBINSTANCE\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RDS", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab eips\" data-type=\"EIP\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab volumes\" data-type=\"VOL\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab vpcs\" data-type=\"VPC\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab vpns\" data-type=\"VPN\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab elbs\" data-type=\"ELB\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab asgs\" data-type=\"ASG\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab cloudwatches\" data-type=\"CW\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                                  <div class=\"resource-tab snss\" data-type=\"SUBSCRIPTION\">\n                                      <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + "</span><span\n                                          class=\"count-bubble\"></span></div>\n                              </nav>\n                              <div id=\"RegionResourceData\" class=\"table-head-fix\"></div>\n                          </div>\n                      </div>\n                  </section>\n                  <!-- Region view -->\n                  <div id=\"DashboardDemo\">\n                      <div class=\"enter-credential\">\n                          "
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_SAMPLE_INSTRUCTION", {hash:{},data:data}))
    + "<br/>\n                          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                      </div>\n                      <img src=\"/assets/images/ide/global-demo.png\"/>\n                  </div>\n              </section>\n          </div>\n      </article>\n\n    <aside class=\"dashboard-sidebar\">\n      <nav>\n        <button class=\"dashboard-nav-log dashboard-nav-activity selected\" data-id=\"activity\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASHBOARD_PANEL_LOGS_ACTIVITY", {hash:{},data:data}))
    + "</button>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </nav>\n      <div class=\"dashboard-log-wrap\">\n          <div class=\"dashboard-log dashboard-log-activity\"><div class=\"loading-spinner\"></div></div>\n          <div class=\"dashboard-log dashboard-log-audit hide\"><div class=\"loading-spinner\"></div></div>\n      </div>\n    </aside>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.main=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"dashboard-log-item "
    + escapeExpression(((stack1 = (depth0 && depth0.action_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.avatar), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div class=\"info\">\n            <div class=\"event\">";
  stack1 = ((stack1 = (depth0 && depth0.event)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <div class=\"time\">"
    + escapeExpression(((stack1 = (depth0 && depth0.time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n    </li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<img class=\"avatar\" src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.avatar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  buffer += "<ul class=\"dashboard-log-list\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  };
TEMPLATE.activityList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"dashboard-log-empty\">\n    <div class=\"main\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASHBOARD_PANEL_LOGS_NO_ACTIVITY", {hash:{},data:data}))
    + "</div>\n    <div class=\"sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASHBOARD_PANEL_LOGS_NO_ACTIVITY_SUB", {hash:{},data:data}))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.noActivity=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var functionType="function", escapeExpression=this.escapeExpression;


  return escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0));
  };
TEMPLATE.securityText=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('wspace/dashboard/ImportDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-spinner loading-spinner-small hide\"></div>\n<div id=\"modal-import-json-dropzone\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_DROP_LBL", {hash:{},data:data}))
    + "<label for=\"modal-import-json-file\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_SELECT_LBL", {hash:{},data:data}))
    + "</label><input type=\"file\" id=\"modal-import-json-file\"></div>\n<div id=\"import-json-error\"></div>";
  return buffer;
  };
TEMPLATE.importJSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-spinner loading-spinner-small hide\"></div>\n<div id=\"modal-import-json-dropzone\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_DROP_CF_LBL", {hash:{},data:data}))
    + "<label for=\"modal-import-json-file\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_SELECT_LBL", {hash:{},data:data}))
    + "</label><input type=\"file\" id=\"modal-import-json-file\"></div>\n<div id=\"import-json-error\"></div>\n<ul class=\"import-cf-notice\">\n"
    + escapeExpression(helpers.i18n.call(depth0, "IMPORT_CF_NOTICE", {hash:{},data:data}))
    + "\n</ul>";
  return buffer;
  };
TEMPLATE.importCF=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"item";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <section class=\"modal-control-group\"> <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "SPECIFY_PARAMETERS_FOR_TEMPLATE", {hash:{},data:data}))
    + "</h5>\n\n  <div class=\"nano cf-params-wrap\">\n    <ul class=\"cf-params nano-content\" id=\"import-cf-params\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.parameters), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n  </section>\n  ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"cf-input-entry\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.NoEcho), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n      <div class=\"cf-left\">\n        <span class=\"cf-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"cf-type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      <div class=\"cf-right\">\n        <span class=\"cf-input-wrap\">\n          <input class=\"input cf-input\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.NoEcho), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Default)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </span>\n\n        <div class=\"cf-desc\"><p>"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.__Constraint), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <span class=\"cf-error\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ConstraintDescription), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n      </div>\n      </li>";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "data-echo=\"false\"";
  }

function program8(depth0,data) {
  
  
  return "type=\"password\"";
  }

function program10(depth0,data) {
  
  
  return "type=\"text\"";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p>"
    + escapeExpression(((stack1 = (depth0 && depth0.__Constraint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  return buffer;
  }

function program14(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ConstraintDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program16(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "IMPORT_CF_NOT_MEET_CONSTRAINT", {hash:{},data:data}));
  }

  buffer += "<div id=\"import-cf-form\">\n  <section class=\"modal-control-group clearfix\"> <label class=\"label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_REGION", {hash:{},data:data}))
    + ":</label>\n    <div class=\"selectbox combo-dd\" id=\"import-cf-region\">\n      <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.regions)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      <ul class=\"dropdown\" tabindex=\"-1\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.regions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n      </ul>\n    </div>\n  </section>\n\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.parameters)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"loader\"><div class=\"loading-spinner\"></div></div>\n\n  <div class=\"modal-footer\">\n    <span class=\"param-error hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "IMPORT_CF_PARAMS_ERROR", {hash:{},data:data}))
    + "</span>\n    <span class=\"param-empty hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "IMPORT_CF_PARAMS_EMPTY", {hash:{},data:data}))
    + "</span>\n    <button class=\"btn btn-blue\" id=\"import-cf-import\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORT", {hash:{},data:data}))
    + "</button>\n    <button class=\"btn modal-close btn-silver\" id=\"import-cf-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n  </div>\n</div>\n<div class=\"loading-spinner hide\"></div>";
  return buffer;
  };
TEMPLATE.importCFConfirm=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('wspace/dashboard/ImportDialog',['./ImportDialogTpl', "UI.modalplus", "constant", "i18n!/nls/lang.js", "CloudResources", "ApiRequest", "JsonExporter", "backbone", "UI.select2", "UI.nanoscroller"], function(tplPartials, Modal, constant, lang, CloudResources, ApiRequest, JsonExporter) {
  return Backbone.View.extend({
    events: {
      "change #modal-import-json-file": "onSelectFile",
      "drop #modal-import-json-dropzone": "onSelectFile",
      "dragenter #modal-import-json-dropzone": "onDragenter",
      "dragleave #modal-import-json-dropzone": "onDragleave",
      "dragover  #modal-import-json-dropzone": "onDragover",
      "click #import-cf-cancel": "cancelImport",
      "click #import-cf-import": "doImport",
      "keypress .cf-input": "onFocusInput",
      "OPTION_CHANGE #import-cf-region": "onRegionChange"
    },
    initialize: function(attr) {
      var self;
      self = this;
      this.type = attr.type;
      this.project = attr.project;
      this.modal = new Modal({
        title: this.type === "stack" ? lang.IDE.POP_IMPORT_JSON_TIT : lang.IDE.POP_IMPORT_CF_TIT,
        template: this.type === "stack" ? tplPartials.importJSON() : tplPartials.importCF(),
        width: "470",
        disableFooter: true,
        onClose: function() {
          return self.onModalClose();
        }
      });
      this.setElement(this.modal.tpl);
      this.regionForceFetchMap = {};
      this.reader = new FileReader();
      this.reader.onload = function(evt) {
        return self.onReaderLoader(evt);
      };
      this.reader.onerror = this.onReaderError;
    },
    onDragenter: function() {
      return this.$el.find("#modal-import-json-dropzone").toggleClass("dragover", true);
    },
    onDragleave: function() {
      return this.$el.find("#modal-import-json-dropzone").toggleClass("dragover", false);
    },
    onDragover: function(evt) {
      var dt;
      dt = evt.originalEvent.dataTransfer;
      if (dt) {
        dt.dropEffect = "copy";
      }
      evt.stopPropagation();
      evt.preventDefault();
    },
    onSelectFile: function(evt) {
      var files;
      evt.stopPropagation();
      evt.preventDefault();
      $("#modal-import-json-dropzone").removeClass("dragover");
      $("#import-json-error").html("");
      evt = evt.originalEvent;
      files = (evt.dataTransfer || evt.target).files;
      if (!files || !files.length) {
        return;
      }
      this.filename = (files[0].name || "").split(".")[0];
      this.reader.readAsText(files[0]);
      return null;
    },
    onReaderLoader: function(evt) {
      var error, opsModel, result;
      result = JsonExporter.importJson(this.reader.result);
      if (_.isString(result)) {
        $("#import-json-error").html(result);
        return;
      }
      if (this.type === "stack" && result.AWSTemplateFormatVersion) {
        error = lang.IDE.POP_IMPORT_FORMAT_ERROR;
      } else if (this.type === "cf" && !result.AWSTemplateFormatVersion) {
        error = lang.IDE.POP_IMPORT_FORMAT_ERROR;
      }
      if (!error) {
        if (result.AWSTemplateFormatVersion) {
          this.handleCFTemplate(result);
          return;
        }
      }
      opsModel = this.project.createStackByJson(result);
      App.loadUrl(opsModel.url());
      this.modal.close();
      this.model = this.project = this.reader = null;
      return null;
    },
    onReaderError: function() {
      return $("#import-json-error").html(lang.IDE.POP_IMPORT_ERROR);
    },
    handleCFTemplate: function(cfJson) {
      var data, key, parameters, value, _ref;
      parameters = [];
      _ref = cfJson.Parameters;
      for (key in _ref) {
        value = _ref[key];
        value.Name = key;
        value.NoEcho = value.NoEcho === true;
        if (value.AllowedValues && !_.isArray(value.AllowedValues)) {
          value.AllowedValues = void 0;
        }
        if (value.Type === "AWS::EC2::KeyPair::KeyName") {
          this.hasKpParam = true;
        }
        value.__Constraint = "";
        if (value.AllowedValues) {
          value.__Constraint = "AllowedPattern: " + value.AllowedValues.join(",") + " ";
        }
        if (value.Type === "Number") {
          if (value.MinValue) {
            value.__Constraint += "MinValue: " + value.MinValue + " ";
          }
          if (value.MaxValue) {
            value.__Constraint += "MaxValue: " + value.MaxValue + " ";
          }
        } else if (value.Type === "String") {
          if (value.MinLength) {
            value.__Constraint += "MinLength: " + value.MinLength + " ";
          }
          if (value.MaxLength) {
            value.__Constraint += "MaxLength: " + value.MaxLength + " ";
          }
        }
        parameters.push(value);
      }
      this.parameters = parameters;
      this.cfJson = cfJson;
      data = {
        regions: constant.REGION_KEYS.slice(0),
        parameters: parameters
      };
      this.modal.setContent(tplPartials.importCFConfirm(data));
      this.modal.setWidth("570");
      this.modal.setTitle(lang.IDE.POP_IMPORT_CF_TIT);
      this.modal.tpl.find(".cf-params-wrap").nanoScroller();
      this.initInputs();
      this.onRegionChange();
    },
    onModalClose: function() {
      var ipt, select2, _i, _len, _ref;
      _ref = this.modal.tpl.find("#import-cf-params").children().find("input.cf-input");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ipt = _ref[_i];
        select2 = $(ipt).data("select2");
        if (select2) {
          $(ipt).select2("destroy");
        }
      }
    },
    initInputs: function() {
      var $inputs, av, avs, formatNoMatches, ipt, kpInitSelection, kpQuery, numberCreateSC, param, select2, select2Option, self, _i, _j, _len, _len1, _ref, _ref1;
      self = this;
      kpQuery = function(options) {
        var kp, kps, term, _i, _len, _ref;
        kps = [];
        term = options.term.toLowerCase();
        _ref = self.currentRegionKps;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kp = _ref[_i];
          if (kp.toLowerCase().indexOf(term) >= 0) {
            kps.push({
              id: kp,
              text: kp
            });
          }
        }
        return options.callback({
          more: false,
          results: kps
        });
      };
      kpInitSelection = function(element, callback) {
        var def;
        def = element.select2("val");
        return callback({
          id: def,
          text: def
        });
      };
      numberCreateSC = function(term) {
        if (isNaN(Number(term))) {
          return;
        }
        return {
          id: term,
          text: term
        };
      };
      formatNoMatches = function(term) {
        if (!term) {
          return "Input value...";
        } else {
          return "Invalid input";
        }
      };
      $inputs = $("#import-cf-params").children();
      _ref = this.parameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        if (param.NoEcho) {
          continue;
        }
        select2 = false;
        ipt = $inputs.filter("[data-name='" + param.Name + "']").find("input");
        select2Option = {
          allowClear: true,
          data: [],
          formatNoMatches: formatNoMatches
        };
        if (param.Type === "CommaDelimitedList" || param.Type === "List<Number>") {
          select2 = true;
          select2Option.multiple = true;
          select2Option.allowDuplicate = true;
          if (!param.AllowedValues) {
            select2Option.tags = [];
            select2Option.data = void 0;
            select2Option.tokenSeparators = [","];
          }
        }
        if (param.Type === "List<Number>") {
          select2Option.createSearchChoice = numberCreateSC;
        }
        if (param.Type === "AWS::EC2::KeyPair::KeyName") {
          select2 = true;
          select2Option.query = kpQuery;
          select2Option.initSelection = kpInitSelection;
        }
        if (param.AllowedValues) {
          select2 = true;
          avs = [];
          _ref1 = param.AllowedValues;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            av = _ref1[_j];
            avs.push({
              id: "" + av,
              text: "" + av
            });
          }
          select2Option.data = avs;
          select2Option.selectOnComma = true;
        }
        if (select2) {
          ipt.select2(select2Option);
        }
      }
    },
    onRegionChange: function() {
      var credId, currentRegion, self;
      if (!this.hasKpParam) {
        return;
      }
      credId = this.project.credIdOfProvider("aws::global");
      currentRegion = $("#import-cf-region").find(".selected").attr("data-id");
      if (!this.regionForceFetchMap[currentRegion]) {
        this.regionForceFetchMap[currentRegion] = true;
        CloudResources(credId, constant.RESTYPE.KP, currentRegion).fetchForce();
      }
      self = this;
      $("#import-cf-form .loader").show();
      CloudResources(credId, constant.RESTYPE.KP, currentRegion).fetch().then(function() {
        var $inputs, $ipt, param, _i, _len, _ref;
        $("#import-cf-form .loader").hide();
        self.currentRegionKps = CloudResources(credId, constant.RESTYPE.KP, currentRegion).pluck("id");
        $inputs = $("#import-cf-params").children();
        _ref = self.parameters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          param = _ref[_i];
          if (param.Type === "AWS::EC2::KeyPair::KeyName") {
            $ipt = $inputs.filter("[data-name='" + param.Name + "']").find("input.cf-input");
            $ipt.select2("val", $ipt.select2("val") || param.Default);
          }
        }
      });
    },
    extractUserInput: function($li) {
      var $input, AllowedPattern, allowed, av, idx, name, param, type, v, value, valueArray, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
      type = $li.attr("data-type");
      $input = $li.find("input.cf-input");
      if ($input.siblings(".select2-container").length) {
        value = $input.select2("val");
      } else {
        value = $li.find("input.cf-input").val();
      }
      name = $li.attr("data-name");
      param = this.cfJson.Parameters[name];
      if (!value) {
        return {
          name: name,
          value: ""
        };
      }
      if (type === "Number" || type === "String") {
        valueArray = [value];
      } else {
        if (_.isArray(value)) {
          valueArray = value;
        } else {
          valueArray = value.split(",");
        }
      }
      if (type === "Number" || type === "List<Number>") {
        for (idx = _i = 0, _len = valueArray.length; _i < _len; idx = ++_i) {
          v = valueArray[idx];
          v = Number(v);
          if (isNaN(v)) {
            return false;
          }
          if (param.MinValue && Number(param.MinValue) > v) {
            return false;
          }
          if (param.MaxValue && Number(param.MaxValue) < v) {
            return false;
          }
          valueArray[idx] = v;
        }
      } else if (type === "String" || type === "CommaDelimitedList") {
        if (param.AllowedPattern) {
          AllowedPattern = new RegExp(param.AllowedPattern);
        }
        for (idx = _j = 0, _len1 = valueArray.length; _j < _len1; idx = ++_j) {
          v = valueArray[idx];
          if (param.MinLength && Number(param.MinLength) > v.length) {
            return false;
          }
          if (param.MaxLength && Number(param.MaxLength) < v.length) {
            return false;
          }
          if (AllowedPattern && !AllowedPattern.test(v)) {
            return false;
          }
        }
      }
      if (param.AllowedValues) {
        for (_k = 0, _len2 = valueArray.length; _k < _len2; _k++) {
          v = valueArray[_k];
          _ref = param.AllowedValues || [];
          for (_l = 0, _len3 = _ref.length; _l < _len3; _l++) {
            av = _ref[_l];
            if ("" + av === "" + v) {
              allowed = true;
              break;
            }
          }
          if (!allowed) {
            return false;
          }
        }
      }
      if (param.Type === "AWS::EC2::KeyPair::KeyName") {
        if (this.currentRegionKps.indexOf(value) < 0) {
          return false;
        }
      }
      if (type === "String" || type === "Number") {
        value = valueArray[0];
      } else if (type === "List<Number>" || type === "CommaDelimitedList") {
        value = valueArray.join(",");
      }
      return {
        name: name,
        value: value
      };
    },
    checkCFParameter: function() {
      var $entries, $li, error, hasEmpty, li, result, _i, _len;
      $entries = this.modal.tpl.find(".cf-params").children();
      error = false;
      hasEmpty = false;
      for (_i = 0, _len = $entries.length; _i < _len; _i++) {
        li = $entries[_i];
        $li = $(li);
        result = this.extractUserInput($li);
        if (!result) {
          error = true;
          $li.toggleClass("error", true);
        } else {
          if (!result.value) {
            hasEmpty = true;
          }
          this.cfJson.Parameters[result.name].Default = result.value;
          $li.toggleClass("error", false);
        }
      }
      this.modal.tpl.find(".param-error").hide();
      this.modal.tpl.find(".param-empty").hide();
      if (error) {
        this.modal.tpl.find(".param-error").show();
        this.emptyParamConfirm = false;
      } else if (hasEmpty) {
        this.modal.tpl.find(".param-empty").show();
        if (!this.emptyParamConfirm) {
          error = this.emptyParamConfirm = true;
        }
      }
      return !error;
    },
    doImport: function() {
      var credId, region, self;
      if (!this.checkCFParameter()) {
        return;
      }
      self = this;
      this.modal.tpl.find(".loading-spinner").show();
      this.modal.tpl.closest(".modal-box").find(".modal-close").hide();
      $("#import-cf-form").hide();
      this.modal.resize();
      region = $("#import-cf-region").find(".selected").attr("data-id");
      credId = this.project.credIdOfProvider("aws::global");
      return CloudResources(credId, constant.RESTYPE.AZ, region).fetch().then(function() {
        return ApiRequest("stack_import_cloudformation", {
          region_name: $("#import-cf-region").find(".selected").attr("data-id"),
          cf_template: self.cfJson,
          parameters: {
            az: _.pluck(CloudResources(credId, constant.RESTYPE.AZ, region).where({
              category: region
            }), "id")
          }
        }).then(function(data) {
          self.modal.close();
          data.provider = "aws::global";
          if (self.filename) {
            data.name = self.filename;
          }
          return App.loadUrl(self.project.createStackByJson(data, true).url());
        }, function() {
          self.modal.close();
          notification('error', sprintf(lang.IDE.POP_IMPORT_CFM_ERROR));
        });
      });
    },
    cancelImport: function() {
      return this.modal.close();
    },
    onFocusInput: function(evt) {
      return $(evt.currentTarget).closest("li").removeClass("error");
    }
  });
});

define('wspace/dashboard/DashboardTplData',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"global-map-item\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Dashboard\">\n        <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n        <span class=\"global-region-location app\">"
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"global-region-location stack\">"
    + escapeExpression(((stack1 = (depth0 && depth0.stack)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.globalMap=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RECENT_LAUNCHED_STACK", {hash:{},data:data}))
    + "</h4>\n        <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"recent-list-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h5>\n            <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"recent-time\">"
    + escapeExpression(((stack1 = (depth0 && depth0.formatedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </li>";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"right icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <span class=\"empty-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_RECENT_APP", {hash:{},data:data}))
    + "</span>\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RECENT_EDITED_STACK", {hash:{},data:data}))
    + "</h4>\n        <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stacks), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n    ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"recent-list-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n            <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"recent-time\">"
    + escapeExpression(((stack1 = (depth0 && depth0.formatedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </li>";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <span class=\"empty-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_RECENT_STACK", {hash:{},data:data}))
    + "</span>\n    ";
  return buffer;
  }

  buffer += "<section ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.apps)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(7, program7, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>\n<section ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.stacks)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>";
  return buffer;
  };
TEMPLATE.recent=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n<div class=\"dashboard-loading\"><div class=\"loading-spinner\"></div></div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"instances\" data-type=\"INSTANCE\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instances)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RUNNING_INSTANCE", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instances), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"rds\" data-type=\"DBINSTANCE\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rds)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RDS", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.rds), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"eips\" data-type=\"EIP\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eips)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.eips), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"volumes\" data-type=\"VOL\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volumes)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"elbs\" data-type=\"ELB\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.elbs)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.elbs), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"vpns\" data-type=\"VPN\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.vpns)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vpns), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"global-resource-li\">\n    <span class=\"count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4><h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionArea)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n  </li>";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.globalResources=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "Docker App";
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}));
  }

function program5(depth0,data) {
  
  
  return "hide";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.shortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>";
  return buffer;
  }

function program9(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n            <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <a class=\"route\" href=\"/workspace/"
    + escapeExpression(((stack1 = (depth1 && depth1.projectId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/ops/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progressing), {hash:{},inverse:self.programWithDepth(12, program12, data, depth1),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </a></li>\n        ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"thumbnail app-thumbnail\"></div>\n                <div class=\"region-resource-progess-wrap\"><div class=\"region-resource-progess\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div></div>\n                <div class=\"region-resource-info truncate\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <div class=\"loading-spinner loading-spinner-small\"></div><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.stateDesc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "...</span>\n                </div>\n            ";
  return buffer;
  }

function program12(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers.unless.call(depth0, (depth2 && depth2.isMarathon), {hash:{},inverse:self.program(16, program16, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div class=\"thumbnail app-thumbnail\"><img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></div>\n                <div class=\"region-resource-info\">\n                    <i class=\"icon-terminate terminate-app tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TOOLBAR_HANDLE_TERMINATE_APP", {hash:{},data:data}))
    + "\"></i>\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stoppable), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <span class=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                </div>\n                ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.type), "mesos", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return " <i class=\"icon-app-type-mesos\"></i> ";
  }

function program16(depth0,data) {
  
  
  return "\n                    <i class=\"icon-app-type-marathon\"></i>\n                ";
  }

function program18(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = "";
  buffer += "<i class=\"icon-stop stop-app tooltip\"  data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TOOLBAR_HANDLE_STOP_APP", {hash:{},data:data}))
    + "\"></i>";
  return buffer;
  }

function program23(depth0,data) {
  
  
  return "<i class=\"icon-play start-app\"></i>";
  }

function program25(depth0,data) {
  
  
  return "running";
  }

function program27(depth0,data) {
  
  
  return "stopped";
  }

function program29(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"blank-widget\"><div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "</div></div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"dash-region-apps-wrap\">\n    <header class=\"dash-region-header\">\n        <label class=\"region-resource-tab\">\n            "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.apps)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<b>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isMarathon), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b>\n        </label>\n        <nav class=\"dash-region-navigation ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isMarathon), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-type=\"apps\">\n            <button class=\"js-toggle-dropdown\">\n                <i class=\"icon-caret-down right\"></i><span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.currentRegion)),stack1 == null || stack1 === false ? stack1 : stack1.shortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </button>\n            <ul id=\"region-switch-list\" class=\"dropdown-menu\">\n                <li data-region=\"global\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + " <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.globalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n        </nav>\n    </header>\n\n    <ul id=\"region-resource-app-wrap\" class=\"region-resource-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.program(29, program29, data),fn:self.programWithDepth(9, program9, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>";
  return buffer;
  };
TEMPLATE.region_apps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "Docker Stack";
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}));
  }

function program5(depth0,data) {
  
  
  return "hide";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.shortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>";
  return buffer;
  }

function program9(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n            <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <a class=\"route\" href=\"/workspace/"
    + escapeExpression(((stack1 = (depth1 && depth1.projectId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/ops/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.type), "mesos", {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <div class=\"thumbnail\"><img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></div>\n                    <div class=\"region-resource-info\">\n                        <i class=\"icon-delete delete-stack tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_DEL_STACK", {hash:{},data:data}))
    + "\"></i>\n                        <i class=\"icon-duplicate duplicate-stack tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "\"></i>\n                        <span class=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.type), "mesos", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                    </div>\n                </a>\n            </li>\n        ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return " <i class=\"icon-stack-type-mesos\"></i> ";
  }

function program12(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program14(depth0,data) {
  
  
  return "upper-compact ";
  }

function program16(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"blank-widget\"><div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_STACK", {hash:{},data:data}))
    + "</div></div>\n        ";
  return buffer;
  }

  buffer += "<div class=\"dash-region-stacks-wrap\">\n    <header class=\"dash-region-header\">\n        <label class=\"region-resource-tab stack\">\n            "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stacks)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<b>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isMarathon), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b>\n        </label>\n        <nav class=\"dash-region-navigation ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isMarathon), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-type=\"stacks\">\n            <button class=\"js-toggle-dropdown\">\n                <i class=\"icon-caret-down right\"></i><span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.currentRegion)),stack1 == null || stack1 === false ? stack1 : stack1.shortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </button>\n\n            <ul id=\"region-switch-list\" class=\"dropdown-menu\">\n                <li data-region=\"global\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + " <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.globalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </ul>\n        </nav>\n    </header>\n    <ul id=\"region-resource-stack-wrap\" class=\"region-resource-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stacks), {hash:{},inverse:self.program(16, program16, data),fn:self.programWithDepth(9, program9, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  };
TEMPLATE.region_stacks=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "<tr>\n    <td>\n    ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <div>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.visopsTag), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"resource-id\">( "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " )</span></div>\n    </td>\n    <td><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.launchTime), {hash:{},data:data}))
    + "</td>\n    <td>\n      <img src=\"/assets/images/ide/ami/";
  stack1 = helpers.awsAmiIcon.call(depth0, ((stack1 = (depth1 && depth1.collection)),stack1 == null || stack1 === false ? stack1 : stack1.__credential), (depth0 && depth0.imageId), (depth0 && depth0.category), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;AMI&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td ";
  stack1 = helpers.awsIsEip.call(depth0, ((stack1 = (depth1 && depth1.collection)),stack1 == null || stack1 === false ? stack1 : stack1.__credential), (depth0 && depth0.ipAddress), (depth0 && depth0.category), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.ipAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.placement)),stack1 == null || stack1 === false ? stack1 : stack1.availabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n  </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"table-app-link-wrap\"><span class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var stack1;
  return escapeExpression(helpers.or.call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.name), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.Name), {hash:{},data:data}));
  }

function program10(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "class=\"dashboard-eip tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAUNCH_TIME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AMI", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE_TYPE", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n  <thead>\n      <tr>\n          <th></th>\n          <th style=\"width: 10%\"></th>\n          <th style=\"width: 18%\"></th>\n          <th style=\"width: 15%\"></th>\n          <th style=\"width: 11%\"></th>\n          <th style=\"width: 14%\"></th>\n          <th style=\"width: 11%\"></th>\n          <th style=\"width: 40px\"></th>\n      </tr>\n  </thead>\n<tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(14, program14, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceINSTANCE=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n        </tr>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n            .\n        </div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\" style=\"width:40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_IP", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ASSOCIATED_INSTANCE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n    <thead>\n    <tr>\n        <th style=\"width:40%\"></th>\n        <th></th>\n        <th style=\"width:40px\"></th>\n    </tr>\n    </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceEIP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>\n                ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </td>\n            <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.device)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n            <td>\n                <i class=\"status ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachmentStatus), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachmentStatus), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n            <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n        </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <div class=\"table-app-link-wrap\"><span\n                            class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\"\n                            data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\"\n                            data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n                ";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "status-in-use";
  }

function program10(depth0,data) {
  
  
  return "status-available";
  }

function program12(depth0,data) {
  
  
  return "\n                attached";
  }

function program14(depth0,data) {
  
  
  return "not-attached";
  }

function program16(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n            .\n        </div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DEVICE_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME_SIZE", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ATTACHMENT_STATUS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n    <thead>\n    <tr>\n        <th></th>\n        <th style=\"width: 15%\"></th>\n        <th style=\"width: 20%\"></th>\n        <th style=\"width: 18%\"></th>\n        <th style=\"width: 12%\"></th>\n        <th style=\"width: 15%\"></th>\n        <th style=\"width:40px\"></th>\n    </tr>\n    </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(16, program16, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceVOL=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n    <td>\n    ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </td>\n    <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dhcpOptionsId), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n  </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"table-app-link-wrap\"><span class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;DHCP&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "None";
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n  ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CIDR", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DHCP_SETTINGS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n  <thead>\n  <tr>\n      <th></th>\n      <th style=\"width:20%\"></th>\n      <th style=\"width:25%\"></th>\n      <th style=\"width:20%\"></th>\n      <th style=\"width:40px\"></th>\n  </tr>\n  </thead>\n  <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceVPC=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <tr>\n    <td>\n      ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </td>\n    <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td><span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;VGW&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n    <td><span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;CGW&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n    <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id='"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'></i></td>\n  </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"table-app-link-wrap\"><span class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n      ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n  ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VIRTUAL_PRIVATE_GATEWAY", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CUSTOMER_GATEWAY", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n    <thead>\n    <tr>\n        <th></th>\n        <th style=\"width: 20%\"></th>\n        <th style=\"width: 25%\"></th>\n        <th style=\"width: 20%\"></th>\n        <th style=\"width: 40px\"></th>\n    </tr>\n    </thead>\n<tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceVPN=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.CreatedTime), {hash:{},data:data}))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZones)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n        </tr>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n            .\n        </div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DNS_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n\n<table class=\"table\">\n    <thead>\n    <tr>\n        <th></th>\n        <th style=\"width: 20%\"></th>\n        <th style=\"width: 25%\"></th>\n        <th style=\"width: 20%\"></th>\n        <th style=\"width: 40px\"></th>\n    </tr>\n    </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceELB=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>\n                ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AutoScalingGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.last_activity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.activity_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n            </td>\n        </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <div class=\"table-app-link-wrap\"><span\n                            class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\"\n                            data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\"\n                            data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n                ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n        </div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CURRENT", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAST_ACTIVITY", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ACTIVITY_STATUS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n\n<table class=\"table\">\n    <thead>\n    <tr>\n        <th></th>\n        <th style=\"width: 50%\"></th>\n        <th style=\"width: 20%\"></th>\n        <th style=\"width:40px\"></th>\n    </tr>\n    </thead>\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceASG=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr>\n      <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td>";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.Dimensions), ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.MetricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.ComparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.Threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " for "
    + escapeExpression(((stack1 = (depth0 && depth0.Period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds</td>\n      <td><i class=\"status ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.StateValue), "OK", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.StateValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n    </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.Value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "status-green";
  }

function program7(depth0,data) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.StateValue), "ALARM", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program8(depth0,data) {
  
  
  return "status-yellow";
  }

function program10(depth0,data) {
  
  
  return "status-grey";
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DIMENSION", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_THRESHOLD", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n    <thead>\n        <tr>\n            <th></th>\n            <th style=\"width: 30%\"></th>\n            <th style=\"width: 30%\"></th>\n            <th style=\"width: 10%\"></th>\n            <th style=\"width:40px\"></th>\n        </tr>\n    </thead>\n  <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceCW=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.TopicName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (depth0 && depth0.Endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.SubscriptionArn), "PendingConfirmation", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n            </td>\n        </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <td><i class=\"status status-red icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_PENDING_CONFIRMATION", {hash:{},data:data}))
    + "</td>\n            ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <td><i class=\"status status-green icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_SUCCESS", {hash:{},data:data}))
    + "</td>\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_TOPIC_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ENDPOINT_AND_PROTOCOL", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CONFIRMATION", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n    <thead>\n    <tr>\n        <th style=\"width:20%\"></th>\n        <th></th>\n        <th style=\"width:30%\"></th>\n        <th style=\"width:40px\"></th>\n    </tr>\n    </thead>\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceSUBSCRIPTION=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<tr>\n        <td>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </td>\n        <td><i class=\"status status-";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.DBInstanceStatus), "available", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n    </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "green";
  }

function program5(depth0,data) {
  
  
  return "yellow";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DBINSTANCE_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:21%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_FAMILY", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLASS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STORAGE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<table class=\"table\">\n    <thead>\n        <tr>\n            <th></th>\n            <th style=\"width: 18%\"></th>\n            <th style=\"width: 21%\"></th>\n            <th style=\"width: 15%\"></th>\n            <th style=\"width: 15%\"></th>\n            <th style=\"width: 40px\"></th>\n        </tr>\n    </thead>\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.resourceDBINSTANCE=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + ":</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.bubble), {hash:{},inverse:self.program(10, program10, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<a href=\"javascript:void(0)\" class=\"bubble table-link\" data-bubble-template=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.template), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-bubble-data=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return ", ";
  }

function program6(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.template)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program8(depth0,data) {
  
  
  return "dashboardBubble";
  }

function program10(depth0,data) {
  
  
  return escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0));
  }

  buffer += "<dl class=\"dl-horizontal\" style=\"margin-top:0;\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</dl>";
  return buffer;
  };
TEMPLATE.resourceDetail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n<dl class=\"dl-horizontal\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleResourceInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n    <dl class=\"dl-horizontal\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleResourceSub=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('wspace/dashboard/VisualizeTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:500px;\">\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<section id=\"VisualizeVpcDialog\" class=\"scroll-content\"></section>\n</div>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_LOADING_VPC_FAILED", {hash:{},data:data}))
    + "\n	<button class=\"btn btn-blue\" id=\"VisualizeReload\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_BTN_RETRY", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.failure=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.vpcs)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<section>\n	<header class=\"region-header\"><span class=\"region-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>"
    + escapeExpression(((stack1 = (depth0 && depth0.subname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"vpc-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.vpcs)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></header>\n\n	<ul class=\"region-group clearfix\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vpcs), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</section>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li class=\"visualize-vpc\">\n			<h5>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h5>\n			<ol class=\"tac\">\n				<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subnet)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SUBNETS", {hash:{},data:data}))
    + "</span></li>\n				<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RUNNING_INSTANCE", {hash:{},data:data}))
    + "</span></li>\n				<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stopped)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STOPPED_INSTANCE", {hash:{},data:data}))
    + "</span></li>\n				<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NETWORK_INTERFACE", {hash:{},data:data}))
    + "</span></li>\n				<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eip)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</span></li>\n				<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.elb)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</span></li>\n			</ol>\n			<button class=\"btn btn-blue visualize-vpc-btn";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imported), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-vpcid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imported), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n		</li>\n		";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span>("
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>";
  return buffer;
  }

function program6(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program8(depth0,data) {
  
  
  return " tooltip disabled";
  }

function program10(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_ALREADY_IMPORTED", {hash:{},data:data}));
  }

function program12(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_TO_IMPORT", {hash:{},data:data}));
  }

function program14(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_VPC_TO_IMPORT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(14, program14, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('wspace/dashboard/VisualizeDialog',["Credential", "ApiRequest", "UI.modalplus", "./VisualizeTpl", "i18n!/nls/lang.js", "constant", "backbone"], function(Credential, ApiRequest, Modal, VisualizeTpl, lang, constant) {
  var VisualizeVpcParams;
  VisualizeVpcParams = {
    'AWS.VPC.VPC': {},
    'AWS.VPC.Subnet': {},
    'AWS.EC2.Instance': {
      'filter': {
        'instance-state-name': ['pending', 'running', 'stopping', 'stopped']
      }
    },
    'AWS.VPC.NetworkInterface': {},
    'AWS.ELB': {}
  };
  return Backbone.View.extend({
    events: {
      "click #VisualizeReload": "sendRequest",
      "click .visualize-vpc-btn": "importVpc"
    },
    initialize: function(attr) {
      var self;
      this.model = attr.model;
      this.dialog = attr.dialog;
      this.dialog || (this.dialog = new Modal({
        title: lang.IDE.DASH_IMPORT_VPC_AS_APP
      }));
      this.dialog.setTitle(lang.IDE.DASH_IMPORT_VPC_AS_APP).setWidth(770).setContent(VisualizeTpl.frame()).toggleFooter().compact().resize();
      self = this;
      this.dialog.on("close", function() {
        return self.remove();
      });
      this.setElement(this.dialog.tpl.find("#VisualizeVpcDialog"));
      this.sendRequest();
      this.listenTo(App.WS, "visualizeUpdate", this.onReceiveData);
    },
    render: function() {
      if (this.fail) {
        return this.$el.html(VisualizeTpl.failure());
      } else if (this.data) {
        return this.$el.html(VisualizeTpl.content(this.data));
      } else {
        return this.$el.html(VisualizeTpl.loading());
      }
    },
    remove: function() {
      this.stopListening();
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    sendRequest: function() {
      var self;
      self = this;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout((function() {
        return self.failToLoad();
      }), 480000);
      ApiRequest("aws_resource", {
        region_name: null,
        key_id: this.model.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL),
        resources: VisualizeVpcParams,
        addition: "statistic",
        retry_times: 1
      }).fail(function() {
        return self.failToLoad();
      });
      this.fail = false;
      this.data = null;
      this.render();
    },
    failToLoad: function() {
      this.fail = true;
      this.data = null;
      this.render();
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
    },
    onReceiveData: function(result) {
      this.fail = false;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.data = this.parseVisData(result);
      this.render();
    },
    parseVisData: function(data) {
      var e, instanceMap, obj, region, regions, resourceMap, resources, t, tags, vpc, vpcMap, vpcs, _i, _len, _ref;
      resourceMap = function(res) {
        return _.keys(res || {});
      };
      instanceMap = function(res, stopped) {
        var ami, id, instances, state, _ref, _ref1;
        instances = [];
        _ref = res || {};
        for (id in _ref) {
          ami = _ref[id];
          state = ((_ref1 = ami.instanceState) != null ? _ref1.name : void 0) || "";
          if (stopped) {
            if (state === "stopped" || state === "stopping") {
              instances.push(id);
            }
          } else {
            if (state === "running" || state === "pending") {
              instances.push(id);
            }
          }
        }
        return instances;
      };
      regions = [];
      for (region in data) {
        vpcMap = data[region];
        if (region === "_id" || region === "username" || region === "timestamp") {
          continue;
        }
        vpcs = [];
        regions.push({
          id: region,
          name: constant.REGION_SHORT_LABEL[region],
          subname: constant.REGION_LABEL[region],
          vpcs: vpcs
        });
        for (vpc in vpcMap) {
          resources = vpcMap[vpc];
          try {
            tags = {};
            if (resources.Tag && resources.Tag.item) {
              if (resources.Tag.item.length) {
                _ref = resources.Tag.item;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  t = _ref[_i];
                  tags[t.key] = t.value;
                }
              } else {
                tags[resources.Tag.item.key] = resources.Tag.item.value;
              }
            }
            obj = {
              id: vpc,
              name: tags.Name || tags.name,
              subnet: resourceMap(resources["AWS|VPC|Subnet"]),
              ami: instanceMap(resources["AWS|EC2|Instance"]),
              stopped: instanceMap(resources["AWS|EC2|Instance"], true),
              eni: resourceMap(resources["AWS|VPC|NetworkInterface"]),
              eip: resourceMap(resources["AWS|EC2|EIP"]),
              elb: resourceMap(resources["AWS|ELB"]),
              imported: !!resources.project_id
            };
            vpcs.push(obj);
          } catch (_error) {
            e = _error;
          }
        }
      }
      return regions;
    },
    importVpc: function(event) {
      var $tgt, opsmodel;
      if ($(event.currentTarget).hasClass('disabled')) {
        return false;
      }
      $tgt = $(event.currentTarget);
      if ($tgt.hasClass(".disabled")) {
        return false;
      }
      opsmodel = this.model.createAppByExistingResource($tgt.attr("data-vpcid"), $tgt.closest("ul").attr("data-region"), Credential.PROVIDER.AWSGLOBAL);
      this.dialog.close();
      App.loadUrl(opsmodel.url());
      return false;
    }
  });
});

define('wspace/dashboard/DashboardView',["./DashboardTpl", "./ImportDialog", "./DashboardTplData", "constant", "./VisualizeDialog", "CloudResources", "AppAction", "UI.modalplus", "i18n!/nls/lang.js", "ProjectLog", "Credential", "credentialFormView", "UI.bubble", "backbone"], function(Template, ImportDialog, dataTemplate, constant, VisualizeDialog, CloudResources, AppAction, Modal, lang, ProjectLog, Credential, CredentialFormView) {
  Handlebars.registerHelper("awsAmiIcon", function(credentialId, amiId, region) {
    var ami;
    ami = CloudResources(credentialId, constant.RESTYPE.AMI, region).get(amiId);
    if (ami) {
      ami = ami.attributes;
      return ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
    } else {
      console.log(credentialId, amiId, region, ami);
      return "empty.png";
    }
  });
  Handlebars.registerHelper("awsIsEip", function(credentialId, ip, region, options) {
    var eip, _i, _len, _ref;
    if (!ip) {
      return "";
    }
    _ref = CloudResources(credentialId, constant.RESTYPE.EIP, region).models;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      eip = _ref[_i];
      if (eip.get("publicIp") === ip) {
        return options.fn(this);
      }
    }
    return "";
  });
  return Backbone.View.extend({
    events: {
      "click .dashboard-header .icon-new-stack": "createStack",
      "click .dashboard-header .import-stack": "importStack",
      "click .dashboard-header .icon-visualize": "importApp",
      "click .dashboard-sidebar .dashboard-nav-log": "updateLog",
      "click .dashboard-sidebar nav buttton": "updateLog",
      'click #region-switch-list li': 'switchRegion',
      'click .resource-tab': 'switchResource',
      "click .region-resource-list .delete-stack": "deleteStack",
      'click .region-resource-list .duplicate-stack': 'duplicateStack',
      "click .region-resource-list .start-app": "startApp",
      'click .region-resource-list .stop-app': 'stopApp',
      'click .region-resource-list .terminate-app': 'terminateApp',
      "click .show-credential": "showCredential",
      "click .icon-detail": "showResourceDetail",
      'click .refreshResource': 'reloadResource',
      "click .global-resource-li": "switchGlobalResource"
    },
    initialize: function() {
      var credentialId, region, self, _i, _len, _ref;
      this.resourcesTab = "INSTANCE";
      this.region = "global";
      this.appsRegion = "global";
      this.stacksRegion = "global";
      this.setElement($(Template.main({
        providers: this.model.supportedProviders(),
        id: this.model.scene.project.get("id"),
        isAdmin: this.model.scene.project.amIAdmin()
      })).appendTo(this.model.scene.spaceParentElement()));
      self = this;
      this.logCol = this.model.scene.project.logs();
      this.logCol.on('change add', this.updateLog, this);
      this.render();
      this.listenTo(this.model.scene.project, "update:stack", function() {
        return this.updateStacks();
      });
      this.listenTo(this.model.scene.project, "update:app", function() {
        return this.updateApps();
      });
      this.listenTo(this.model.scene.project, "change:stack", function() {
        return this.updateStacks();
      });
      this.listenTo(this.model.scene.project, "change:app", function() {
        return this.updateApps();
      });
      this.listenTo(this.model.scene.project, "update:credential", function() {
        return self.updateDemoView();
      });
      this.listenTo(this.model.scene.project, "change:credential", function() {
        return self.updateDemoView();
      });
      this.listenTo(this.model.scene.project.apps(), "change:progress", function(ops) {
        return self.updateAppStackProgress(ops);
      });
      this.listenTo(this.model.scene.project.stacks(), "change:progress", function(ops) {
        return self.updateAppStackProgress(ops);
      });
      this.listenTo(App.WS, "visualizeUpdate", this.onVisualizeUpdated);
      credentialId = this.model.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL);
      this.credentialAccount = this.model.scene.project.credOfProvider(Credential.PROVIDER.AWSGLOBAL).get("awsAccount");
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.INSTANCE), "update", this.onGlobalResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.EIP), "update", this.onGlobalResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.VOL), "update", this.onGlobalResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.ELB), "update", this.onGlobalResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.VPN), "update", this.onGlobalResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.VPC), "update", this.onRegionResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.ASG), "update", this.onRegionResChanged);
      this.listenTo(CloudResources(credentialId, constant.RESTYPE.CW), "update", this.onRegionResChanged);
      _ref = constant.REGION_KEYS;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        region = _ref[_i];
        this.listenTo(CloudResources(credentialId, constant.RESTYPE.SUBSCRIPTION, region), "update", this.onRegionResChanged);
        this.listenTo(CloudResources(credentialId, constant.RESTYPE.DBINSTANCE, region), "update", this.onGlobalResChanged);
      }
      MC.template.dashboardBubble = _.bind(this.dashboardBubble, this);
      MC.template.dashboardBubbleSub = _.bind(this.dashboardBubbleSub, this);
    },
    render: function() {
      var self;
      this.updateDemoView();
      this.updateGlobalResources();
      this.model.fetchAwsResources();
      this.initRegion();
      this.updateLog();
      self = this;
      setInterval(function() {
        if (!self.$el.find(".refreshResource").hasClass("reloading")) {
          self.$el.find(".refreshResource").text(MC.intervalDate(self.lastUpdate / 1000));
        }
        self.updateLog();
      }, 1000 * 60);
      this.$el.toggleClass("observer", this.model.isReadOnly());
    },
    createStack: function(evt) {
      var awsRegions, createStackModal, firstRegion, self;
      self = this;
      awsRegions = (_.findWhere(self.model.supportedProviders(), {
        id: "aws::global"
      })).regions;
      firstRegion = awsRegions[0];
      createStackModal = new Modal({
        title: lang.IDE.CREATE_STACK_TITLE,
        compact: true,
        width: 560,
        template: MC.template.createStack({
          firstRegion: firstRegion,
          awsRegions: awsRegions
        }),
        confirm: {
          text: lang.IDE.CREATE_STACK_CONFIRM
        }
      });
      createStackModal.find(".toolbar-visual-ops-switch").on("click", function() {
        return $(this).toggleClass("on");
      });
      createStackModal.find(".select-stack-type li").click(function(evt) {
        if (!$(evt.currentTarget).hasClass('active')) {
          createStackModal.find(".select-stack-type li").toggleClass("active");
          return createStackModal.find(".tabs-content > div").toggleClass("hide");
        }
      });
      return createStackModal.on("confirm", function() {
        var framework, opsModel, provider, region, scale, type;
        createStackModal.close();
        provider = "aws::global";
        type = createStackModal.find(".tab-aws-stack").hasClass("active") ? "aws" : "mesos";
        region = createStackModal.find("#create-" + type + "-stack-region li.item.selected").data("value");
        framework = type === "mesos" ? createStackModal.find(".create-mesos-use-marathon").hasClass("on") : false;
        scale = createStackModal.find("#mesos-scale li.item.selected").data("value");
        console.log("Creating Stack: ", region, provider, {
          type: type,
          framework: framework
        });
        opsModel = self.model.scene.project.createStack(region, provider, {
          type: type,
          framework: framework,
          scale: scale
        });
        return self.model.scene.loadSpace(opsModel);
      });
    },
    showCredential: function() {
      return new CredentialFormView({
        model: this.model.scene.project
      }).render();
    },
    importStack: function(evt) {
      new ImportDialog({
        type: $(evt.currentTarget).attr("data-type"),
        project: this.model.scene.project
      });
      return false;
    },
    importApp: function() {
      return new AppAction({
        project: this.model.scene.project
      }).showPayment().then((function(_this) {
        return function(result) {
          return new VisualizeDialog({
            model: _this.model.scene.project,
            dialog: result != null ? result.modal : void 0
          });
        };
      })(this));
    },
    updateDemoView: function() {
      var newCredentialAccount;
      if (!this.model.scene.project.isDemoMode()) {
        this.$el.find("#dashboard-data-wrap").removeClass("demo");
        this.$el.find("#VisualizeVPC").removeAttr("disabled").removeClass("tooltip").removeAttr("title");
        newCredentialAccount = this.model.scene.project.credOfProvider(Credential.PROVIDER.AWSGLOBAL).get("awsAccount");
        if (this.credentialAccount !== newCredentialAccount) {
          this.reloadResource();
          this.credentialAccount = newCredentialAccount;
        }
      } else {
        this.$el.find("#VisualizeVPC").attr("disabled", "disabled").addClass("tooltip").attr("title", lang.IDE.PROVIDE_CRED_TO_VISUALIZE);
        this.$el.find("#dashboard-data-wrap").toggleClass("demo", true);
      }
    },
    updateGlobalResources: function() {
      var data;
      if (!this.model.isAwsResReady()) {
        this.__globalLoading = true;
        data = {
          loading: true
        };
      } else {
        this.__globalLoading = false;
        data = {};
        _.each(this.model.getAwsResData(), function(resList, key) {
          var orderedList;
          orderedList = _.sortBy(resList, function(res) {
            return -res.data.length;
          });
          data[key] = orderedList;
        });
      }
      this.$el.find("#GlobalView").html(dataTemplate.globalResources(data));
      if (this.region === "global") {
        this.$el.find("#GlobalView").removeAttr("style");
        this.$el.find("#RegionViewWrap").hide();
      }
    },
    onGlobalResChanged: function() {
      this.updateGlobalResources();
      return this.updateRegionResources();
    },
    onRegionResChanged: function() {
      return this.updateRegionResources();
    },
    initRegion: function() {
      this.updateRegionAppStack("stacks", "global");
      this.updateRegionAppStack("apps", "global");
      this.toggleMarathonOpslist();
      return this.updateRegionResources();
    },
    switchRegion: function(evt) {
      var region, target, updateType;
      if (evt && evt.currentTarget) {
        target = evt.currentTarget;
        region = $(target).data("region");
        if (region !== "global") {
          this.model.fetchAwsResources(region);
        }
        updateType = $(evt.currentTarget).parents(".dash-region-navigation").data("type");
        if (updateType === "stacks" || updateType === "apps") {
          this[updateType + "Region"] = region;
          return this.updateRegionAppStack(updateType, region);
        } else if (updateType === "resource") {
          this.region = region;
          return this.updateRegionResources();
        }
      }
    },
    switchGlobalResource: function(evt) {
      var $elem, region, type;
      console.log(evt);
      $elem = $(evt.currentTarget);
      region = $elem.data("region");
      type = $elem.parent().parent().data("type");
      $(".dash-resource-wrap").find("#region-switch-list").find("li[data-region=" + region + "]").click();
      return $("#RegionViewWrap").find("nav>div[data-type='" + type + "']").click();
    },
    updateRegionResources: function() {
      var tpl, type;
      this.$el.find(".dash-resource-wrap .js-toggle-dropdown span").text(constant.REGION_SHORT_LABEL[this.region] || lang.IDE.DASH_BTN_GLOBAL);
      if (this.region === "global") {
        this.updateGlobalResources();
        return;
      }
      this.$el.find("#RegionViewWrap").show();
      this.$el.find("#GlobalView").hide();
      this.updateRegionTabCount();
      type = constant.RESTYPE[this.resourcesTab];
      if (!this.model.isAwsResReady(this.region, type)) {
        tpl = '<div class="dashboard-loading"><div class="loading-spinner"></div></div>';
      } else {
        tpl = dataTemplate["resource" + this.resourcesTab](this.model.getAwsResData(this.region, type));
      }
      return this.$el.find("#RegionResourceData").html(tpl);
    },
    updateAppStackProgress: function(ops) {
      $("#region-resource-app-wrap, #region-resource-stack-wrap").children("li[data-id='" + ops.id + "']").find(".region-resource-progess").css("width", ops.get("progress") + "%");
    },
    updateStacks: function() {
      this.updateRegionAppStack("stacks", null);
      return this.toggleMarathonOpslist();
    },
    updateApps: function() {
      this.updateRegionAppStack("apps", null);
      return this.toggleMarathonOpslist();
    },
    toggleMarathonOpslist: function() {
      var $marathonWrap, hasMarathonOps;
      $marathonWrap = this.$el.find(".region-app-stack-wrap.marathon");
      hasMarathonOps = $marathonWrap.find(".region-resource-list li").size() > 0;
      return $marathonWrap.toggle(hasMarathonOps);
    },
    updateRegionAppStack: function(updateType, region, isMarathon) {
      var attr, data, filter, resources, self, tojson;
      if (updateType == null) {
        updateType = "stacks";
      }
      if (isMarathon == null) {
        isMarathon = false;
      }
      if (updateType !== "stacks" && updateType !== "apps") {
        return false;
      }
      if (!region) {
        if (isMarathon) {
          region = "global";
        } else {
          region = this[updateType + "Region"];
        }
      }
      self = this;
      attr = {
        apps: [],
        stacks: [],
        region: this.region
      };
      data = _.map(constant.REGION_LABEL, function(name, id) {
        return {
          id: id,
          name: name,
          count: 0,
          shortName: constant.REGION_SHORT_LABEL[id]
        };
      });
      if (region !== "global") {
        filter = function(f) {
          return f.get("region") === region && f.isExisting();
        };
      } else {
        filter = function() {
          return true;
        };
      }
      tojson = {
        thumbnail: true
      };
      resources = _.clone(self.model.scene.project[updateType]());
      resources.comparator = "updateTime";
      resources.sort();
      if (isMarathon) {
        resources = resources.filter(function(f) {
          return f.get("provider") === "docker::marathon";
        });
      } else {
        resources = resources.filter(function(f) {
          return f.get("provider") !== "docker::marathon";
        });
      }
      attr.region = _.map(data, function(obj) {
        obj.count = _.filter(resources, function(resource) {
          return resource.get("region") === obj.id;
        }).length;
        return obj;
      });
      attr[updateType] = resources.filter(filter).map(function(m) {
        return m.toJSON(tojson);
      }).reverse();
      attr.globalCount = resources.length;
      attr.projectId = self.model.scene.project.id;
      attr.currentRegion = _.find(data, function(e) {
        return e.id === region;
      }) || {
        id: "global",
        shortName: lang.IDE.DASH_BTN_GLOBAL
      };
      if (isMarathon) {
        attr.isMarathon = isMarathon;
        this.$el.find(".region-app-stack-wrap.marathon .dash-region-" + updateType + "-wrap").replaceWith(dataTemplate["region_" + updateType](attr));
      } else {
        this.$el.find(".region-app-stack-wrap").not(".marathon").find(".dash-region-" + updateType + "-wrap").replaceWith(dataTemplate["region_" + updateType](attr));
      }
    },
    updateRegionTabCount: function() {
      var $nav, count, r, resourceCount;
      resourceCount = this.model.getResourcesCount(this.region);
      $nav = this.$el.find("#RegionResourceNav");
      for (r in resourceCount) {
        count = resourceCount[r];
        $nav.children("." + r).children(".count-bubble").text(count === "" ? "-" : count);
      }
    },
    switchResource: function(evt) {
      this.$el.find("#RegionResourceNav").children().removeClass("on");
      this.resourcesTab = $(evt.currentTarget).addClass("on").attr("data-type");
      this.updateRegionResources();
    },
    deleteStack: function(event) {
      var id;
      event.preventDefault();
      id = $(event.currentTarget).closest("li").attr("data-id");
      (new AppAction({
        model: this.model.scene.project.getOpsModel(id)
      })).deleteStack();
      return false;
    },
    duplicateStack: function(event) {
      var id;
      event.preventDefault();
      id = $(event.currentTarget).closest("li").attr("data-id");
      App.loadUrl(this.model.scene.project.stacks().get(id).duplicate().url());
      return false;
    },
    startApp: function(event) {
      var id;
      event.preventDefault();
      id = $(event.currentTarget).closest("li").attr("data-id");
      (new AppAction({
        model: this.model.scene.project.getOpsModel(id)
      })).startApp();
      return false;
    },
    stopApp: function(event) {
      var id;
      event.preventDefault();
      id = $(event.currentTarget).closest("li").attr("data-id");
      (new AppAction({
        model: this.model.scene.project.getOpsModel(id)
      })).stopApp();
      return false;
    },
    terminateApp: function(event) {
      var id;
      event.preventDefault();
      id = $(event.currentTarget).closest("li").attr("data-id");
      (new AppAction({
        model: this.model.scene.project.getOpsModel(id)
      })).terminateApp();
      return false;
    },
    reloadResource: function() {
      if ($(".refreshResource").hasClass("reloading")) {
        return;
      }
      $(".refreshResource").addClass("reloading").text("");
      this.model.clearVisualizeData();
      CloudResources.invalidate().done(function() {
        return $(".refreshResource").removeClass("reloading").text(lang.IDE.DASH_TPL_JUST_NOW);
      });
    },
    showResourceDetail: function(evt) {
      var $tgt, formattedData, id, resModel, type;
      $tgt = $(evt.currentTarget);
      id = $tgt.attr("data-id");
      type = constant.RESTYPE[this.resourcesTab];
      resModel = this.model.getResourceData(this.region, type, id);
      formattedData = this.formatDetail(this.resourcesTab, resModel.attributes);
      if (formattedData.title) {
        id = formattedData.title;
        delete formattedData.title;
      }
      new Modal({
        title: id,
        width: "450",
        template: dataTemplate.resourceDetail(formattedData),
        disableFooter: true
      });
    },
    formatDetail: function(type, data) {
      var json, result, _ref, _ref1, _ref2;
      switch (type) {
        case "SUBSCRIPTION":
          return {
            DASH_LBL_TITLE: data.Endpoint,
            DASH_LBL_ENDPOINT: data.Endpoint,
            DASH_LBL_OWNER: data.Owner,
            DASH_LBL_PROTOCOL: data.Protocol,
            DASH_LBL_SUBSCRIPTION_ARN: data.SubscriptionArn,
            DASH_LBL_TOPIC_ARN: data.TopicArn
          };
        case "VPC":
          return {
            DASH_LBL_STATE: data.state,
            DASH_LBL_CIDR: data.cidrBlock,
            DASH_LBL_TENANCY: data.instanceTenancy
          };
        case "ASG":
          return {
            DASH_LBL_TITLE: data.Name,
            DASH_BUB_NAME: data.Name,
            DASH_LBL_AVAILABILITY_ZONE: data.AvailabilityZones.join(", "),
            DASH_LBL_CREATE_TIME: data.CreatedTime,
            DASH_LBL_DEFAULT_COOLDOWN: data.DefaultCooldown,
            DASH_LBL_DESIRED_CAPACITY: data.DesiredCapacity,
            DASH_LBL_MAX_SIZE: data.MaxSize,
            DASH_LBL_MIN_SIZE: data.MinSize,
            DASH_LBL_HEALTH_CHECK_GRACE_PERIOD: data.HealthCheckGracePeriod,
            DASH_LBL_HEALTH_CHECK_TYPE: data.HealthCheckType,
            DASH_LBL_LAUNCH_CONFIGURATION_NAME: data.LaunchConfigurationName,
            DASH_LBL_TERMINATION_POLICIES: data.TerminationPolicies.join(", "),
            DASH_LBL_AUTOSCALING_GROUP_ARN: data.id
          };
        case "ELB":
          return {
            DASH_LBL_AVAILABILITY_ZONE: data.AvailabilityZones.join(", "),
            DASH_LBL_CREATE_TIME: data.CreatedTime,
            DASH_LBL_DNS_NAME: data.DNSName,
            DASH_LBL_HEALTH_CHECK: this.formatData('HealthCheck', [data.HealthCheck], "Health Check", true),
            DASH_LBL_INSTANCE: data.Instances.join(", "),
            DASH_LBL_LISTENER_DESC: this.formatData('ListenerDescriptions', _.pluck(data.ListenerDescriptions.member, "Listener"), "Listener Descriptions", true),
            DASH_LBL_SECURITY_GROUPS: data.SecurityGroups.join(", "),
            DASH_LBL_SUBNETS: data.Subnets.join(", ")
          };
        case "VPN":
          return {
            DASH_LBL_STATE: data.state,
            DASH_LBL_VGW_ID: data.vpnGatewayId,
            DASH_LBL_CGW_ID: data.customerGatewayId,
            DASH_LBL_TYPE: data.type
          };
        case "VOL":
          return {
            DASH_LBL_VOLUME_ID: data.id,
            DASH_LBL_DEVICE_NAME: data.device,
            DASH_LBL_SNAPSHOT_ID: data.snapshotId,
            DASH_LBL_VOLUME_SIZE: data.size,
            DASH_LBL_STATUS: data.status,
            DASH_LBL_INSTANCE_ID: data.instanceId,
            DASH_LBL_DELETE_ON_TERM: data.deleteOnTermination,
            DASH_LBL_AVAILABILITY_ZONE: data.availabilityZone,
            DASH_LBL_VOLUME_TYPE: data.volumeType,
            DASH_LBL_CREATE_TIME: data.createTime,
            DASH_LBL_ATTACH_TIME: data.attachTime
          };
        case "INSTANCE":
          return {
            DASH_LBL_STATUS: data.instanceState.name,
            DASH_LBL_MONITORING: data.monitoring.state,
            DASH_LBL_PRIMARY_PRIVATE_IP: data.privateIpAddress,
            DASH_LBL_PRIVATE_DNS: data.privateDnsName,
            DASH_LBL_LAUNCH_TIME: data.launchTime,
            DASH_LBL_AVAILABILITY_ZONE: data.placement.availabilityZone,
            DASH_LBL_AMI_LAUNCH_INDEX: data.amiLaunchIndex,
            DASH_LBL_INSTANCE_TYPE: data.instanceType,
            DASH_LBL_BLOCK_DEVICE_TYPE: data.rootDeviceType,
            DASH_LBL_BLOCK_DEVICES: data.blockDeviceMapping ? this.formatData("BlockDevice", data.blockDeviceMapping, "deviceName") : null,
            DASH_LBL_NETWORK_INTERFACE: data.networkInterfaceSet ? this.formatData("ENI", data.networkInterfaceSet, "networkInterfaceId") : null
          };
        case 'EIP':
          result = {
            DASH_LBL_PUBLIC_IP: data.publicIp,
            DASH_LBL_DOMAIN: data.domain,
            DASH_LBL_ALLOCATION_ID: data.id,
            DASH_LBL_CATEGORY: data.category,
            DASH_LBL_TITLE: data.publicIp
          };
          if (data.associationId) {
            result.DASH_LBL_ASSOCIATION_ID = data.associationId;
          }
          if (data.networkInterfaceId) {
            result.DASH_LBL_NETWORK_INTERFACE_ID = data.networkInterfaceId;
          }
          if (data.instanceId) {
            result.DASH_LBL_INSTANCE_ID = data.instanceId;
          }
          if (data.privateIpAddresse) {
            result.DASH_LBL_PRIVATE_IP_ADDRESS = data.privateIpAddresses;
          }
          return result;
        case 'CW':
          return {
            DASH_LBL_ALARM_NAME: data.Name,
            DASH_LBL_COMPARISON_OPERATOR: data.ComparisonOperator,
            DASH_LBL_DIMENSIONS: this.formatData('Dimensions', data.Dimensions, 'Dimensions', true),
            DASH_LBL_EVALUATION_PERIODS: data.EvaluationPeriods,
            DASH_LBL_INSUFFICIENT_DATA_ACTIONS: data.InsufficientDataActions,
            DASH_LBL_METRIC_NAME: data.MetricName,
            DASH_LBL_NAMESPACE: data.Namespace,
            DASH_LBL_OK_ACTIONS: data.OKActions,
            DASH_LBL_PERIOD: data.Period,
            DASH_LBL_STATE_REGION: data.StateReason,
            DASH_LBL_STATE_UPDATED_TIMESTAMP: data.StateUpdatedTimestamp,
            DASH_LBL_STATE_VALUE: data.StateValue,
            DASH_LBL_STATISTIC: data.Statistic,
            DASH_LBL_THRESHOLD: data.Threshold,
            DASH_LBL_CATEGORY: data.category,
            DASH_LBL_TITLE: data.Name,
            DASH_LBL_ACTIONS_ENABLED: data.ActionsEnabled ? "true" : 'false',
            DASH_LBL_ALARM_ACTIONS: data.AlarmActions.member,
            DASH_LBL_ALARM_ARN: data.id
          };
        case "DBINSTANCE":
          json = {
            DASH_LBL_STATUS: data.DBInstanceStatus,
            DASH_LBL_ENDPOINT: data.Endpoint.Address + "" + data.Endpoint.Port,
            DASH_LBL_ENGINE: data.Engine,
            DASH_LBL_DB_NAME: data.name || data.Name || data.DBName || "None",
            DASH_LBL_OPTION_GROUP: ((_ref = data.OptionGroupMemberships) != null ? (_ref1 = _ref.OptionGroupMembership) != null ? _ref1.OptionGroupName : void 0 : void 0) || "None",
            DASH_LBL_PARAMETER_GROUP: ((_ref2 = data.DBParameterGroups) != null ? _ref2.DBParameterGroupName : void 0) || "None",
            DASH_LBL_AVAILABILITY_ZONE: data.AvailabilityZone,
            DASH_LBL_SUBNET_GROUP: data.sbgId || "None",
            DASH_LBL_PUBLICLY_ACCESSIBLE: data.PubliclyAccessible.toString(),
            DASH_LBL_IOPS: data.Iops || "OFF",
            DASH_LBL_MULTI_AZ: data.MultiAZ.toString(),
            DASH_LBL_AUTOMATED_BACKUP: data.AutoMinorVersionUpgrade,
            DASH_LBL_LATEST_RESTORE_TIME: data.LatestRestorableTime,
            DASH_LBL_AUTO_MINOR_VERSION_UPGRADE: data.AutoMinorVersionUpgrade,
            DASH_LBL_MAINTENANCE_WINDOW: data.PreferredMaintenanceWindow,
            DASH_LBL_BACKUP_WINDOW: data.PreferredBackupWindow
          };
          return json;
      }
    },
    formatData: function(type, array, key, force) {
      var result;
      if ((['BlockDevice', "AttachmentSet", "HealthCheck", "ListenerDescriptions", 'Dimensions', 'ENI'].indexOf(type)) > -1) {
        _.map(array, function(blockDevice, index) {
          _.map(blockDevice, function(e, key) {
            if (key === "ebs") {
              _.extend(blockDevice, e);
            }
            if (_.isObject(e)) {
              return delete blockDevice[key];
            }
          });
          return _.map(blockDevice, function(e, key) {
            if (_.isBoolean(e)) {
              blockDevice[key] = e.toString();
              return null;
            }
          });
        });
        _.map(array, function(data) {
          if (force) {
            data._title = key;
          } else {
            data._title = data[key];
          }
          data.bubble = {
            value: force ? key : data[key],
            data: JSON.stringify(data),
            template: "dashboardBubbleSub"
          };
          return data;
        });
        array.bubble = true;
        return array;
      } else {
        result = _.map(array, function(i) {
          i.bubble = {};
          i.bubble.value = i[key];
          i.bubble.data = JSON.stringify({
            type: type,
            id: i[key]
          });
          return i;
        });
        result.bubble = true;
        return result;
      }
    },
    dashboardBubbleSub: function(data) {
      var formattedData, renderData;
      renderData = {};
      formattedData = {};
      _.each(data, function(value, key) {
        var newKey;
        newKey = lang.IDE["BUBBLE_" + key.toUpperCase().split("-").join("_")] || key;
        formattedData[newKey] = value;
      });
      renderData.data = formattedData;
      renderData.title = data.id || data.name || data._title;
      delete renderData.data._title;
      return dataTemplate.bubbleResourceSub(renderData);
    },
    dashboardBubble: function(data) {
      var d, formattedData, resourceData, _ref;
      resourceData = (_ref = this.model.getAwsResDataById(this.region, constant.RESTYPE[data.type], data.id)) != null ? _ref.toJSON() : void 0;
      formattedData = {};
      _.each(resourceData, function(value, key) {
        var newKey;
        newKey = lang.IDE["BUBBLE_" + key.toUpperCase().split("-").join("_")] || key;
        formattedData[newKey] = value;
      });
      d = {
        id: data.id,
        data: formattedData
      };
      _.each(d.data, function(e, key) {
        if (_.isBoolean(e)) {
          d.data[key] = e.toString();
        }
        if (e === "") {
          d.data[key] = "None";
        }
        if ((_.isArray(e)) && e.length === 0) {
          d.data[key] = ['None'];
        }
        if ((_.isObject(e)) && (!_.isArray(e))) {
          return delete d.data[key];
        }
      });
      return dataTemplate.bubbleResourceInfo(d);
    },
    updateLog: function(event) {
      var $btn, $sidebar, myRole, that;
      that = this;
      if (event) {
        $btn = $(event.currentTarget);
        $sidebar = $btn.parents('.dashboard-sidebar');
        $sidebar.find('.dashboard-nav-log').removeClass('selected');
        $sidebar.find('.dashboard-log').addClass('hide');
        $btn.addClass('selected');
        if ($btn.hasClass('dashboard-nav-activity')) {
          $sidebar.find('.dashboard-log-activity').removeClass('hide');
        } else {
          $sidebar.find('.dashboard-log-audit').removeClass('hide');
        }
      }
      myRole = that.model.scene.project.get('myRole');
      that.renderLog("activity");
      if (myRole === 'admin') {
        return that.renderLog("audit");
      } else {
        return that.renderLog("audit", true);
      }
    },
    renderLog: function(type, empty) {
      var $container, container, dataAry, models, projectId, that;
      that = this;
      if (type === 'activity') {
        models = this.logCol.history();
        container = '.dashboard-log-activity';
      } else if (type === 'audit') {
        models = this.logCol.audit();
        container = '.dashboard-log-audit';
      }
      $container = this.$el.find('.dashboard-sidebar').find(container);
      if (empty) {
        $container.html(Template.noActivity());
        return;
      }
      projectId = this.model.scene.project.id;
      dataAry = _.filter(models, function(data) {
        return data.get('success');
      });
      dataAry = _.map(models, function(data) {
        var action, event, eventStr, target, targetId, _name, _target;
        action = data.get('action') || '';
        target = data.get('target') || '';
        type = (data.get('type') || '').toLowerCase();
        targetId = data.get('targetId') || '';
        if (!that.model.scene.project.getOpsModel(targetId)) {
          targetId = null;
        }
        _name = '<span class="name">' + Template.securityText(data.get("username")) + '</span>';
        if (targetId) {
          _target = '<a class="target route" href="/workspace/' + projectId + '/ops/' + targetId + '">' + target + '</a>';
        } else {
          _target = '<span class="target">' + Template.securityText(target) + ' </span>';
        }
        eventStr = lang.IDE["DASHBOARD_LOGS_" + (type.toUpperCase()) + "_" + (action.toUpperCase())];
        if (eventStr) {
          event = sprintf(eventStr, _name, _target, '');
        }
        return {
          action_type: (action + '_' + type).toLowerCase(),
          event: event || ("" + _name + " " + action + " " + type + " " + _target),
          time: MC.intervalDate(new Date(data.get('time')))
        };
      });
      if (dataAry.length) {
        return $container.html(Template.activityList(dataAry));
      } else {
        return $container.html(Template.noActivity());
      }
    }
  });
});

define('wspace/dashboard/Dashboard',["Workspace", "./DashboardView", 'i18n!/nls/lang.js', "CloudResources", "constant", "ApiRequest", "Credential"], function(Workspace, DashboardView, lang, CloudResources, constant, ApiRequest, Credential) {
  return Workspace.extend({
    type: "Dashboard",
    isFixed: function() {
      return true;
    },
    tabClass: function() {
      return "icon-dashboard";
    },
    title: function() {
      return lang.IDE.NAV_TIT_DASHBOARD;
    },
    url: function() {
      return "/";
    },
    initialize: function() {
      this.view = new DashboardView({
        model: this
      });
      this.listenTo(this.scene.project, "change:myRole", function() {
        return this.view.render();
      });
    },
    isReadOnly: function() {
      return this.scene.project.amIObserver();
    },
    isWorkingOn: function(attr) {
      return attr.type === "Dashboard";
    },
    fetchAwsResources: function(region) {
      var credentialId, self;
      credentialId = this.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL);
      self = this;
      if (!region) {
        CloudResources(credentialId, constant.RESTYPE.INSTANCE).fetch();
        CloudResources(credentialId, constant.RESTYPE.EIP).fetch();
        CloudResources(credentialId, constant.RESTYPE.VOL).fetch();
        CloudResources(credentialId, constant.RESTYPE.ELB).fetch();
        CloudResources(credentialId, constant.RESTYPE.VPN).fetch();
        _.each(constant.REGION_KEYS, function(e) {
          return CloudResources(credentialId, constant.RESTYPE.DBINSTANCE, e).fetch();
        });
        return;
      }
      CloudResources(credentialId, constant.RESTYPE.SUBSCRIPTION, region).fetch();
      CloudResources(credentialId, constant.RESTYPE.VPC).fetch();
      CloudResources(credentialId, constant.RESTYPE.DHCP, region).fetch();
      CloudResources(credentialId, constant.RESTYPE.ASG).fetch();
      CloudResources(credentialId, constant.RESTYPE.CW).fetch();
      CloudResources(credentialId, constant.RESTYPE.ENI, region).fetch();
      CloudResources(credentialId, constant.RESTYPE.CGW, region).fetch();
      CloudResources(credentialId, constant.RESTYPE.VGW, region).fetch();
    },
    isAwsResReady: function(region, type) {
      var credentialId, datasource, e, globalReady, i, _i, _j, _len, _len1, _ref;
      credentialId = this.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL);
      if (!region) {
        globalReady = true;
        datasource = [CloudResources(credentialId, constant.RESTYPE.INSTANCE), CloudResources(credentialId, constant.RESTYPE.EIP), CloudResources(credentialId, constant.RESTYPE.VOL), CloudResources(credentialId, constant.RESTYPE.ELB), CloudResources(credentialId, constant.RESTYPE.VPN)];
        _ref = constant.REGION_KEYS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          if (!CloudResources(credentialId, constant.RESTYPE.DBINSTANCE, e).isReady()) {
            globalReady = false;
          }
        }
        for (_j = 0, _len1 = datasource.length; _j < _len1; _j++) {
          i = datasource[_j];
          if (!i.isReady()) {
            globalReady = false;
          }
        }
        return globalReady;
      }
      switch (type) {
        case constant.RESTYPE.SUBSCRIPTION:
          return CloudResources(credentialId, type, region).isReady();
        case constant.RESTYPE.VPC:
          return CloudResources(credentialId, type).isReady() && CloudResources(credentialId, constant.RESTYPE.DHCP, region).isReady();
        case constant.RESTYPE.INSTANCE:
          return CloudResources(credentialId, type).isReady() && CloudResources(credentialId, constant.RESTYPE.EIP, region).isReady();
        case constant.RESTYPE.VPN:
          return CloudResources(credentialId, type).isReady() && CloudResources(credentialId, constant.RESTYPE.VGW, region).isReady() && CloudResources(credentialId, constant.RESTYPE.CGW, region).isReady();
        case constant.RESTYPE.DBINSTANCE:
          return CloudResources(credentialId, type, region).isReady();
        default:
          return CloudResources(credentialId, type).isReady();
      }
    },
    getAwsResData: function(region, type) {
      var DBInstances, DBInstancesCount, credentialId, data, e, filter, _i, _len, _ref;
      credentialId = this.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL);
      if (!region) {
        filter = function(m) {
          if (m.attributes.instanceState) {
            return m.attributes.instanceState.name === "running";
          } else {
            return false;
          }
        };
        DBInstancesCount = 0;
        DBInstances = [];
        _ref = constant.REGION_KEYS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          e = _ref[_i];
          data = {
            region: e,
            data: CloudResources(credentialId, constant.RESTYPE.DBINSTANCE, e).models || [],
            regionName: constant.REGION_SHORT_LABEL[e],
            regionArea: constant.REGION_LABEL[e]
          };
          DBInstancesCount += data.data.length;
          DBInstances.push(data);
        }
        DBInstances.totalCount = DBInstancesCount;
        return {
          instances: CloudResources(credentialId, constant.RESTYPE.INSTANCE).groupByCategory(void 0, filter),
          eips: CloudResources(credentialId, constant.RESTYPE.EIP).groupByCategory(),
          volumes: CloudResources(credentialId, constant.RESTYPE.VOL).groupByCategory(),
          elbs: CloudResources(credentialId, constant.RESTYPE.ELB).groupByCategory(),
          vpns: CloudResources(credentialId, constant.RESTYPE.VPN).groupByCategory(),
          rds: DBInstances
        };
      }
      if (type === constant.RESTYPE.SUBSCRIPTION) {
        return CloudResources(credentialId, type, region).models;
      } else {
        return CloudResources(credentialId, type, region).where({
          category: region
        });
      }
    },
    getAwsResDataById: function(region, type, id) {
      return CloudResources(this.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL), type, region).get(id);
    },
    getResourceData: function(region, type, id) {
      return CloudResources(this.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL), type, region).get(id);
    },
    clearVisualizeData: function() {
      this.set("visualizeData", []);
      this.__visRequest = null;
    },
    getResourcesCount: function(region) {
      var collection, credentialId, d, data, filter, key, rdsCollection, type;
      filter = {
        category: region
      };
      data = {
        instances: "INSTANCE",
        eips: "EIP",
        volumes: "VOL",
        elbs: "ELB",
        vpns: "VPN",
        vpcs: "VPC",
        asgs: "ASG",
        cloudwatches: "CW"
      };
      d = {};
      credentialId = this.scene.project.credIdOfProvider(Credential.PROVIDER.AWSGLOBAL);
      for (key in data) {
        type = data[key];
        collection = CloudResources(credentialId, constant.RESTYPE[type]);
        if (collection.isReady()) {
          d[key] = collection.where(filter).length;
        } else {
          d[key] = "";
        }
      }
      rdsCollection = CloudResources(credentialId, constant.RESTYPE.DBINSTANCE, region);
      if (rdsCollection.isReady()) {
        d.rds = rdsCollection.models.length;
      } else {
        d.rds = "";
      }
      collection = CloudResources(credentialId, constant.RESTYPE.SUBSCRIPTION, region);
      if (collection.isReady()) {
        d.snss = collection.models.length;
      } else {
        d.snss = "";
      }
      return d;
    },
    supportedProviders: function() {
      return [
        {
          id: "aws::global",
          regions: [
            {
              id: "us-east-1",
              name: lang.IDE['IDE_LBL_REGION_NAME_us-east-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_us-east-1']
            }, {
              id: "us-west-1",
              name: lang.IDE['IDE_LBL_REGION_NAME_us-west-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_us-west-1']
            }, {
              id: "us-west-2",
              name: lang.IDE['IDE_LBL_REGION_NAME_us-west-2'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_us-west-2']
            }, {
              id: "eu-west-1",
              name: lang.IDE['IDE_LBL_REGION_NAME_eu-west-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_eu-west-1']
            }, {
              id: 'eu-central-1',
              name: lang.IDE['IDE_LBL_REGION_NAME_eu-central-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_eu-central-1']
            }, {
              id: 'ap-southeast-2',
              name: lang.IDE['IDE_LBL_REGION_NAME_ap-southeast-2'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_ap-southeast-2']
            }, {
              id: 'ap-northeast-1',
              name: lang.IDE['IDE_LBL_REGION_NAME_ap-northeast-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_ap-northeast-1']
            }, {
              id: 'ap-southeast-1',
              name: lang.IDE['IDE_LBL_REGION_NAME_ap-southeast-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_ap-southeast-1']
            }, {
              id: 'sa-east-1',
              name: lang.IDE['IDE_LBL_REGION_NAME_sa-east-1'],
              alias: lang.IDE['IDE_LBL_REGION_NAME_SHORT_sa-east-1']
            }
          ]
        }
      ];
    }
  }, {
    canHandle: function(attr) {
      return attr.type === "Dashboard";
    }
  });
});

