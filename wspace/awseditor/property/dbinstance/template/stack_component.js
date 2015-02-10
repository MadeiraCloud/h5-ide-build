define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.ifLogic.call(depth0, ((stack1 = (depth0 && depth0.engines)),stack1 == null || stack1 === false ? stack1 : stack1.length), ">", 1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"property-control-group\">\n    <label class=\"left\">DB Engine</label>\n    <div class=\"selectbox\" id=\"property-dbinstance-engine-select\">\n        <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.engines), {hash:{},inverse:self.noop,fn:self.programWithDepth(3, program3, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n</section>\n";
  return buffer;
  }
function program3(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth1 && depth1.engine), depth0, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n            ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected";
  }

function program6(depth0,data) {
  
  
  return "\n";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"property-control-group\">\n    <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_LICENSE_MODEL", {hash:{},data:data}))
    + "</label>\n    <div class=\"selectbox\" id=\"property-dbinstance-license-select\">\n        <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.license)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.licenses), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>\n</section>\n";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.license)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.license)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n            ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(16, program16, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n        <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DB_ENGINE_VERSION", {hash:{},data:data}))
    + "</label>\n        <div class=\"selectbox combo-dd\" id=\"property-dbinstance-engine-version-select\">\n            <div class=\"property-engine-label left\" >"
    + escapeExpression(((stack1 = (depth0 && depth0.engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div class=\"property-engineversion-label selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.engineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div class=\"property-engineversion-dropdown dropdown\">\n                <div class=\"scroll-wrap scrollbar-auto-hide clearfix\">\n                    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                    <div class=\"scroll-content\">\n                        <ul>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.versions), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.version)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.version)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                            ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group clearfix\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DB_ENGINE_VERSION", {hash:{},data:data}))
    + "</label>\n        <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.engineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n    </section>\n";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                                <div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                                <div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ECU</span><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.cpu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.memory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                                </div>\n                            </li>\n                        ";
  return buffer;
  }
function program19(depth0,data) {
  
  
  return "selected ";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<section class=\"property-control-group\">\n    <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DB_INSTANCE_CLASS", {hash:{},data:data}))
    + "</label>\n\n    <div class=\"selectbox selectbox-mega combo-dd\" id=\"property-dbinstance-class-select\">\n        <div class=\"selection\">\n            <div class=\"main truncate\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.classInfo)),stack1 == null || stack1 === false ? stack1 : stack1.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div class=\"sub\"><span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.classInfo)),stack1 == null || stack1 === false ? stack1 : stack1.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ECU</span><span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.classInfo)),stack1 == null || stack1 === false ? stack1 : stack1.cpu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n                <span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.classInfo)),stack1 == null || stack1 === false ? stack1 : stack1.memory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n        </div>\n        <div class=\"dropdown\">\n            <div class=\"scroll-wrap scrollbar-auto-hide clearfix\">\n                <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                <div class=\"scroll-content\">\n                    <ul>\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.classes), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>";
  return buffer;
  };
TEMPLATE.lvi=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n    ";
  return buffer;
  }

  buffer += "<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SELECT_WINDOW", {hash:{},data:data}))
    + "</div>\n<ul class=\"dropdown\" tabindex=\"-1\">\n    <li class=\"item\" data-id=\"no\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_NO_PREFERENCE", {hash:{},data:data}))
    + "</li>\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  };
TEMPLATE.preferred_az=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <button class=\"icon-new-stack btn btn-blue t-m-btn\" data-btn=\"create\">"
    + escapeExpression(((stack1 = (depth0 && depth0.btnValueCreate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <button class=\"icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " t-m-btn\" data-btn=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n                ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "disabled";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <th class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sortable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-row-type=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rowType), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                            ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "sortable";
  }

function program9(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.rowType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program11(depth0,data) {
  
  
  return "string";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "width:"
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    <th style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><div class=\"th-inner\"></div></th>\n                                    ";
  return buffer;
  }

  buffer += "<div class=\"modal-toolbar "
    + escapeExpression(((stack1 = (depth0 && depth0.classList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"content-wrap\">\n        <div class=\"toolbar\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.btnValueCreate), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <div class=\"btn-group\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.buttons), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n        <div class=\"list\">\n            <div class=\"slidebox\" style=\""
    + escapeExpression(((stack1 = (depth0 && depth0.slideStyle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <div class=\"content clearfix\">\n                </div>\n                <div class=\"error\">\n                    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SOMETHING_ERROR", {hash:{},data:data}))
    + "\n                </div>\n            </div>\n            <div class=\"table-head-fix\">\n                <table class=\"table-head\">\n                    <thead>\n                        <tr>\n                            <th>\n                                <div class=\"checkbox\">\n                                    <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                                    <label for=\"t-m-select-all\"></label>\n                                </div>\n                            </th>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </tr>\n                    </thead>\n                </table>\n                <div class=\"scroll-wrap\">\n                    <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                    <div class=\"scroll-content\" style=\"display:block;\">\n                        <table class=\"table\">\n                            <thead>\n                                <tr>\n                                    <th><div class=\"th-inner\"></div></th>\n                                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                </tr>\n                            </thead>\n                            <tbody class='t-m-content'>\n\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.optionGroupModal=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<label for=\"property-dbinstance-optiongroup-placeholder\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_OPTION_GROUP", {hash:{},data:data}))
    + "</label>\n<div class=\"property-dbinstance-optiongroup-placeholder\"></div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_OPTION_GROUP", {hash:{},data:data}))
    + "</label>\n<div>"
    + escapeExpression(((stack1 = (depth0 && depth0.ogName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.canCustomOG), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.optionGroupDropDown=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program3(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SQLSERVER_MIRROR_TIP", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n    <div class=\"property-control-group clearfix\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.multiAz), {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n\n";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AvailabilityZone), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PREFERRED_ZONE", {hash:{},data:data}))
    + "</label>\n                <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.SecondaryAvailabilityZone), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SECONDARY_ZONE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.SecondaryAvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.azNotEnough), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"property-control-group\">\n        <div class=\"property-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SUBNETGROUP_NOT_SETUP", (depth0 && depth0.subnetGroupName), (depth0 && depth0.subnetGroupName), {hash:{},data:data}))
    + "</div>\n    </section>\n    ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group property-dbinstance-preferred-az ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiAz), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PREFERRED_ZONE", {hash:{},data:data}))
    + "</label>\n        <div class=\"selectbox\" id=\"property-dbinstance-preferred-az\"></div>\n    </section>\n    ";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "hide";
  }

  buffer += "<section class=\"property-control-group\">\n    <div class=\"checkbox\">\n        <input id=\"property-dbinstance-mutil-az-check\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableMutilAZForMirror), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiAz), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-dbinstance-mutil-az-check\">\n        <label for=\"property-dbinstance-mutil-az-check\"></label>\n    </div>\n    <label for=\"property-dbinstance-mutil-az-check\" class=\"tooltip\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableMutilAZForMirror), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MUTIL_AZ_DEPLOY", {hash:{},data:data}))
    + "</label>\n</section>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(14, program14, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.propertyDbinstanceMutilAZ=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"modal-db-replica-promote-confirm\">\n    <h5 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PROMOTE_CONFIRM_MAJOR", {hash:{},data:data}))
    + "</h5>\n    <ul>\n        <li>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PROMOTE_CONFIRM_CONTENT_1", {hash:{},data:data}))
    + "</li>\n        <li>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PROMOTE_CONFIRM_CONTENT_2", {hash:{},data:data}))
    + "</li>\n        <li>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PROMOTE_CONFIRM_CONTENT_3", {hash:{},data:data}))
    + "</li>\n        <li>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PROMOTE_CONFIRM_CONTENT_4", {hash:{},data:data}))
    + "</li>\n    </ul>\n    <h5 class=\"modal-text-major\">Note</h5>\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RDS_PROMOTE_REPLICA_WARNING", {hash:{},data:data}))
    + "</p>\n    <a href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RDS_READ_AWS_DOC", {hash:{},data:data}))
    + "</a>\n</section>";
  return buffer;
  };
TEMPLATE.modalPromoteConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"modal-db-instance-restore-no-restore\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RDS_NO_BACKUP_TIP", {hash:{},data:data}))
    + "</div>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <h5 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RDS_RESTORE_DB_TIP", {hash:{},data:data}))
    + "</h5>\n\n        <div class=\"modal-db-instance-restore-option\">\n            <label class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RDS_RESTORE_USE_LASTEST_TIME", {hash:{},data:data}))
    + "</label>\n            <input id=\"modal-db-instance-restore-radio-latest\" type=\"radio\" value=\"latest\" name=\"modal-db-instance-restore-radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.custom), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <label for=\"modal-db-instance-restore-radio-latest\">"
    + escapeExpression(((stack1 = (depth0 && depth0.lastest)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        </div>\n\n        <div class=\"modal-db-instance-restore-option\">\n            <label class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RDS_RESTORE_USE_CUSTOM_TIME", {hash:{},data:data}))
    + "</label>\n            <input id=\"modal-db-instance-restore-radio-custom\" type=\"radio\" value=\"custom\" name=\"modal-db-instance-restore-radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.custom), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"datetimepicker\">\n                <input class=\"input datepicker\" type=\"text\" >\n                <input class=\"input timepicker hour\" value=\"\" data-ignore=\"true\" maxlength=\"2\" data-required=\"true\" data-type=\"number\" type=\"text\" >\n                <label>:</label>\n                <input class=\"input timepicker minute\" value=\"\" data-ignore=\"true\" maxlength=\"2\" data-required=\"true\" data-type=\"number\" type=\"text\" >\n                <label>:</label>\n                <input class=\"input timepicker second\" value=\"\" data-ignore=\"true\" maxlength=\"2\" data-required=\"true\" data-type=\"number\" type=\"text\" >\n                <label>UTC "
    + escapeExpression(((stack1 = (depth0 && depth0.timezone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            </div>\n        </div>\n    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<section class=\"modal-db-instance-restore-config\" data-bind=\"true\">\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noRestore), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</section>";
  return buffer;
  };
TEMPLATE.modalRestoreConfirm=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });