define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  return escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  };
TEMPLATE.dropdown_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <div class=\"option-preview\">"
    + escapeExpression(((stack1 = (depth0 && depth0.preview)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"icon-edit\"></div>";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"combo-dd-no-data\">\n    <p>No Option Group.</p>\n    <a class=\"create-one\">Create Option Group</a>\n</div>";
  };
TEMPLATE.no_option_group=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"port-sg\">\n        <div>\n            <label for=\"og-port\">Port</label>\n            <input type=\"text\" id=\"og-port\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-type=\"number\" autocomplete=\"off\"/>\n        </div>\n        <ul class=\"acl-sg-info-list property-list\" id=\"og-sg\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgs), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n    </div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"clearfix\">\n                <div class=\"checkbox-wrap col1\">\n                    <div class=\"checkbox\">\n                        <input type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.used), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"og-sg-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n                        <label for=\"og-sg-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n                    </div>\n                </div>\n\n                <div class=\"col2\">\n                    <div class=\"col2-1 truncate\"><div class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></div><span class=\"sg-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n                    <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                    <div class=\"col2-3 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LBL_MEMBER", {hash:{},data:data}))
    + "</div>\n                </div>\n            </li>\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program5(depth0,data) {
  
  
  return "checked";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"table\">\n        <tr>\n            <th>Option Setting</th>\n            <th>Value</th>\n            <th>Allowed Values</th>\n        </tr>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.OptionGroupOptionSettings), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td class=\"value\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.program(13, program13, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"option-setting\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </select>\n                ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                    ";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "selected";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <input name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-type=\"number\" class=\"option-setting\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-start=\""
    + escapeExpression(((stack1 = (depth0 && depth0.start)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-end=\""
    + escapeExpression(((stack1 = (depth0 && depth0.end)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                ";
  return buffer;
  }

  buffer += "<form class=\"content clearfix\" data-bind=\"true\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.DefaultPort), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.OptionGroupOptionSettings), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"action\">\n        <a class=\"btn btn-blue do-action add-option\" data-option-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Save Option</a>\n        <a class=\"btn btn-silver cancel\">Cancel</a>\n    </div>\n</form>";
  return buffer;
  };
TEMPLATE.og_slide=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete this option group?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red remove-confirm\">Delete</button>\n        <button class=\"btn btn-silver remove-cancel\">Cancel</button>\n    </div>\n</div>";
  };
TEMPLATE.og_slide_remove=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.MySQL.Options.html\" data-tooltip=\"Read AWS documentation…\" target=\"_blank\"></a>\n            ";
  }

function program3(depth0,data) {
  
  
  return "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.Options.html\" data-tooltip=\"Read AWS documentation…\" target=\"_blank\"></a>\n            ";
  }

function program5(depth0,data) {
  
  
  return "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.SQLServer.Options.html\" data-tooltip=\"Read AWS documentation…\" target=\"_blank\"></a>\n            ";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"og-apply-immediately\">\n                <div class=\"checkbox tooltip\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <input type=\"checkbox\" id=\"option-apply-immediately\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.applyImmediately), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <label for=\"option-apply-immediately\"></label>\n                </div>\n                <label for=\"option-apply-immediately\">Apply Immediately</label>\n            </div>\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip="
    + escapeExpression(helpers.i18n.call(depth0, "RDS_PORT_CHANGE_REQUIRES_APPLIED_IMMEDIATELY", {hash:{},data:data}));
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "checked";
  }

function program13(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program15(depth0,data) {
  
  
  return "disabled";
  }

function program17(depth0,data) {
  
  
  return "<button class=\"remove-btn btn btn-red\">Delete</button>";
  }

  buffer += "<div id=\"modal-option-group\">\n    <div class=\"slidebox\">\n        <div class=\"form\"></div>\n        <div class=\"error\">\n        </div>\n    </div>\n    <div class=\"will-be-covered\">\n        <div class=\"header\">\n            This Option Group is used for "
    + escapeExpression(((stack1 = (depth0 && depth0.engineName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.engineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "mysql", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "oracle", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "sqlserver", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"container\">\n            <div class=\"input-item\">\n                <label class=\"left\">Name</label>\n                <input class=\"input og-name\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n            <div class=\"input-item\">\n                <label class=\"left\">Description</label>\n                <input class=\"input og-description\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n            <div class=\"left option-list-head\">Option</div>\n            <ul class=\"option-list\"></ul>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"modal-footer\">\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isCreate), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <span class=\"err-tip\"></span>\n            <button class=\"save-btn btn btn-blue\">Save</button>\n            <button class=\"btn btn-silver modal-close cancel-btn\">Cancel</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.og_modal=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"option-item\" data-idx=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Persistent), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Permenant), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.unmodify), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<div class=\"persistent\">PERSISTENT</div>";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"permenant\">PERMENANT</div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-edit-btn icon-btn-details";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></div>\n    <label class=\"switcher";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>\n        <span class=\"switch-handle\"></span>\n    </label>\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return " invisible";
  }

function program9(depth0,data) {
  
  
  return " on";
  }

function program11(depth0,data) {
  
  
  return " disabled";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.ogOptions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.og_option_item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"option-item\" data-idx=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.OptionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"og-title clearfix\">\n            <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Persistent), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Permenant), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <a class=\"toggle-og-detail show-og-detail\">Show details</a>\n            <a class=\"toggle-og-detail hide-og-detail\" style=\"display:none;\">Hide details</a>\n        </div>\n        <div class=\"og-details\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Port), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.VpcSecurityGroupMemberships), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <table class=\"table\">\n                <tr><th>Setting</th><th>Value</th></tr>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.OptionSettings), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </table>\n        </div>\n    </li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "<div class=\"persistent\">PERSISTENT</div>";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"permenant\">PERMENANT</div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <span>Port:</span>\n                <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <span>Security Group:</span>\n                <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.VpcSecurityGroupId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr><td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n                ";
  return buffer;
  }

  buffer += "<div class=\"summary clearfix\">\n    <dl>\n        <dt>Option Group Name</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Engine</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.EngineName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Option Group Description</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>Engine Version</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.MajorEngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</div>\n<div class=\"left option-list-head\">Option("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Options)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n<ul class=\"option-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.Options), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  };
TEMPLATE.og_app_modal=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });