define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"operate\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.limit), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"btn btn-red\" id=\"delete\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_REMOVE", {hash:{},data:data}))
    + "</button>\n    </div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"limit-member-tip\">\n            "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_LIMIT", (depth0 && depth0.number), {hash:{},data:data}))
    + " <a href=\"mailto:support@visualops.io\" target=\"_top\">support@visualops.io</a>\n        </div>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <div class=\"invite\">\n            <input class=\"input\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_INVITE_TIP", {hash:{},data:data}))
    + "\" id=\"mail\">\n            <div class=\"search\"></div>\n            <button class=\"btn btn-blue\" id=\"invite\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_INVITE_CONFIRM", {hash:{},data:data}))
    + "</button>\n        </div>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "\n                    <th class=\"checkbox-row\">\n                        <div class=\"checkbox\">\n                            <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                            <label for=\"t-m-select-all\"></label>\n                        </div>\n                    </th>\n                    ";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <th class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sortable), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-row-type=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rowType), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</th>\n                    ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "sortable";
  }

function program12(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.rowType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program14(depth0,data) {
  
  
  return "string";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "width:"
    + escapeExpression(((stack1 = (depth0 && depth0.width)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ";";
  return buffer;
  }

function program18(depth0,data) {
  
  
  return "\n        <div>\n            ";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"scroll-wrap\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.height), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                <div class=\"scroll-content\" style=\"display:block;\">\n                    ";
  return buffer;
  }
function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"height: "
    + escapeExpression(((stack1 = (depth0 && depth0.height)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "px\" ";
  return buffer;
  }

function program23(depth0,data) {
  
  var stack1;
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCheckbox), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program24(depth0,data) {
  
  
  return "<th class=\"checkbox-row\"><div class=\"th-inner\"></div></th>";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <th style=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.width), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><div class=\"th-inner\"></div></th>\n                                ";
  return buffer;
  }

function program28(depth0,data) {
  
  
  return "\n                </div>\n                ";
  }

function program30(depth0,data) {
  
  
  return "\n            </div>\n        </div>\n        ";
  }

  buffer += "<div class=\"hide content\" data-bind=\"true\">\n    <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_MEMBER", {hash:{},data:data}))
    + "<span class=\"memlist-count\"></span></div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"table-head-fix will-be-covered\">\n        <table class=\"table-head\">\n            <thead>\n                <tr>\n                    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noCheckbox), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </tr>\n            </thead>\n        </table>\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.useCustomScroll), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.admin), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.columns), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </tr>\n                        </thead>\n                        <tbody class=\"t-m-content\">\n                        </tbody>\n                    </table>\n                    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.useCustomScroll), {hash:{},inverse:self.program(30, program30, data),fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.main=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item memlist-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.admin), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <td>\n        <div class=\"avatar\" style=\"background-image:url('"
    + escapeExpression(((stack1 = (depth0 && depth0.avatar)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></div>\n        <div class=\"info\">\n            <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.me), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <div class=\"mail\">"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n    </td>\n    <td class=\""
    + escapeExpression(((stack1 = (depth0 && depth0.role)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <span class=\"memlist-view-mode role\">\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "admin", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "collaborator", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </span>\n        <div class=\"selectbox memlist-edit-mode memtype\">\n            <div class=\"selection\">\n                ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "admin", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "collaborator", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <ul class=\"dropdown\">\n                <li data-id=\"admin\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "admin", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <div class=\"name\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ADMIN", {hash:{},data:data}))
    + "</div>\n                </li>\n                <li data-id=\"collaborator\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.role), "collaborator", {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <div class=\"name\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_COLLABORATOR", {hash:{},data:data}))
    + "</div>\n                </li>\n            </ul>\n        </div>\n    </td>\n    <td class=\"memlist-status ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "inactive", {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "normal", {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "inactive", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n    ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.admin), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <td class=\"checkbox-row\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.me), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </td>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"checkbox\">\n            <input id=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<span class=\"you\">("
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_YOU", {hash:{},data:data}))
    + ")</span>";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ADMIN", {hash:{},data:data}));
  }

function program9(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_COLLABORATOR", {hash:{},data:data}));
  }

function program11(depth0,data) {
  
  
  return "selected";
  }

function program13(depth0,data) {
  
  
  return "memlist-pending";
  }

function program15(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_ACTIVE", {hash:{},data:data}));
  }

function program17(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_PENDING", {hash:{},data:data}));
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <td>";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.state), "inactive", {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td>\n        <button class=\"btn btn-blue memlist-edit-mode done\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_DONE", {hash:{},data:data}))
    + "</button>\n        <button class=\"icon-edit memlist-view-mode edit\"></button>\n    </td>\n    ";
  return buffer;
  }
function program20(depth0,data) {
  
  var buffer = "";
  buffer += "<button class=\"cancel link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_CANCEL_INVITE", {hash:{},data:data}))
    + "</button>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.memlist), {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"info\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_REMOVE_CONFIRM", (depth0 && depth0.count), {hash:{},data:data}))
    + "</div>\n<div class=\"operate\">\n    <button class=\"confirm btn btn-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_REMOVE", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.deletePopup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"mail\">"
    + escapeExpression(((stack1 = (depth0 && depth0.mail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  };
TEMPLATE.match=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<span>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_NO_USER", {hash:{},data:data}))
    + " \""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"</span>";
  return buffer;
  };
TEMPLATE.nomatch=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_DEFAULT_WORKSPACE_TIP1", {hash:{},data:data}))
    + ".</div>\n<div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_DEFAULT_WORKSPACE_TIP2", {hash:{},data:data}))
    + ", "
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_MEMBER_LABEL_CREATE_WORKSPACE", {hash:{},data:data}))
    + ".</div>";
  return buffer;
  };
TEMPLATE.defaultProject=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });