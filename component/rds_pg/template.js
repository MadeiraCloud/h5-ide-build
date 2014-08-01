define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n            <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.DBEngineVersionDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr class=\"item\" data-id=\"\">\n        <td>\n            <div class=\"checkbox\">\n                <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n                <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n            </div>\n        </td>\n        <td><div class=\"manager-content-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div></td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    </tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.selectedId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " RDS Parameter";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "selected "
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " RDS Parameter Groups";
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">Confirm to delete ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">Delete</button>\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>Deleting...</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                        <li class=\"item\" data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n                                        ";
  return buffer;
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBPG_SET_FAMILY", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-family-choose\">\n                        <div class=\"selectbox selectbox-mega\" id=\"property-family\">\n                            <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.families)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                            <div class=\"scroll-wrap\" style=\"height: 160px\">\n                                <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                                <div class=\"scroll-content\">\n                                    <ul class=\"dropdown\" tabindex=\"-1\">\n                                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.families), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n\n            <div class=\"control-group clearfix\">\n                <label for=\"property-dbpg-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBPG_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-dbpg-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-ignore-regexp=\"^[a-zA-Z][a-zA-Z0-9-]*$\" data-required=\"true\" data-type=\"database\" data-ignore=\"true\" placeholder=\"Begin with a letter; must contain only ASCII letters, digits, and hyphens; and must not end with a hyphen or contain two consecutive hyphens\">\n                </div>\n            </div>\n\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-dbpg-desc-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBPG_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-dbpg-desc-create' class=\"input\" placeholder=\"Up to 255 characters\" data-required=\"true\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>Create</button>\n            <button class=\"btn btn-silver cancel\">Cancel</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>Creating...</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-reset\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <div class=\"modal-text-major\">Do you confirm to reset all parameters for "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " to their defaults?</div>\n        <div class=\"init action\">\n            <button class=\"btn btn-red do-action\" data-action=\"reset\">Reset</button>\n            <button class=\"btn btn-silver cancel\">Cancel</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>Resetting...</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_reset=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n                    <th width=\"40%\">Parameter Name</th>\n                    <th width=\"20%\">Origin Value</th>\n                    <th width=\"40%\">Edit Value</th>\n                ";
  }

function program3(depth0,data) {
  
  
  return "\n                    <th width=\"50%\">Parameter Name</th>\n                    <th width=\"50%\">Edit Value</th>\n                ";
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr id=\"pg-"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <td>\n                        <div class=\"prop_main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            <div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.Source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                        </div>\n                        <div class=\"prop_sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                    </td>\n                    ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.preview), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <td>\n                        <div class=\"prop_main\">\n                            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "input", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </div>\n                        <div class=\"prop_main\">\n                            <div class=\"prop_sub\">Changes will apply ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ApplyType), "dynamic", {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                        </div>\n                    </td>\n                </tr>\n            ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <td>\n                            <div class=\"prop_main\" style=\"text-align: center\">\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </div>\n                        </td>\n                    ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    "
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                                ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "&lt;engine-default&gt;";
  }

function program12(depth0,data) {
  
  
  return "&lt;empty&gt;";
  }

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                                <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"select\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                                    <option value=\"<engine-default>\">&lt;engine-default&gt;</option>\n                                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.selections), {hash:{},inverse:self.noop,fn:self.programWithDepth(17, program17, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                </select>\n                            ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                                        <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.newValue), {hash:{},inverse:self.programWithDepth(21, program21, data, depth1),fn:self.programWithDepth(18, program18, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n                                    ";
  return buffer;
  }
function program18(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.newValue), depth0, {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program19(depth0,data) {
  
  
  return "selected=\"selected\" ";
  }

function program21(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.ParameterValue), depth0, {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program22(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <input type=\"text\" class=\"input prop-half-width\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newValue), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AllowedValues), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program25(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.newValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program27(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  }

function program31(depth0,data) {
  
  
  return "immediately";
  }

function program33(depth0,data) {
  
  
  return "after rebooting";
  }

function program35(depth0,data) {
  
  
  return "\n            <button class=\"btn do-action\" id=\"pg-back-to-edit\">Back to Editing</button>\n            <button class=\"btn btn-blue\" id=\"rds-pg-save\">Apply Changes</button>\n        ";
  }

function program37(depth0,data) {
  
  
  return "\n            <button class=\"btn btn-blue do-action\" data-action=\"preview\" disabled>Review Changes & Save</button>\n        ";
  }

  buffer += "<div class=\"clearfix\" id=\"pg-sort-filter\">\n    <div class=\"pull-left\">\n        Filter: <input id=\"pg-filter-parameter-name\" class=\"input\" type=\"text\" placeholder=\"Filter by Parameter Name\"/>\n    </div>\n    <div class=\"pull-right\">\n        Sort by:\n        <div class=\"selectbox\" id=\"sort-parameter-name\">\n            <div class=\"selection\">Parameter Name</div>\n            <ul class=\"dropdown\" tabindex=\"-1\">\n                <li class=\"item selected\" data-id=\"ParameterName\">Parameter Name</li>\n                <li class=\"item\" data-id=\"IsModifiable\">Is Modifiable</li>\n                <li class=\"item\" data-id=\"ApplyType\">Apply Method</li>\n                <li class=\"item\" data-id=\"Source\">Source</li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div class=\"scroll-wrap\" style=\"height: 310px\">\n    <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\" id=\"parameter-table\">\n        <table class=\"table\">\n            <thead>\n            <tr>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            </tr>\n            </thead>\n            <tbody>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>\n<div class=\"pg-edit-footer clearfix\">\n    <a class=\"blue-link\" target=\"_blank\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ParamValuesRef.html\"> <i class=\"icon-info\"></i> Parameter Valume Reference</a>\n    <div class=\"init action\" style=\"padding: 10px 0\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"btn btn-silver cancel\">Cancel</button>\n    </div>\n    <div class=\"processing action\" style=\"padding: 10px 0;display: none\">\n        <button class=\"btn btn-blue\" id=\"rds-pg-save\" disabled>Applying</button>\n        <button class=\"btn btn-silver cancel\" disabled>Cancel</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_edit=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n            <th width=\"40%\">Parameter Name</th>\n            <th width=\"20%\">Origin Value</th>\n            <th width=\"40%\">Edit Value</th>\n        ";
  }

function program3(depth0,data) {
  
  
  return "\n            <th width=\"50%\">Parameter Name</th>\n            <th width=\"50%\">Edit Value</th>\n        ";
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr id=\"pg-"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <td>\n                <div class=\"prop_main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                    <div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.Source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                </div>\n                <div class=\"prop_sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </td>\n            ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.preview), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <td>\n                <div class=\"prop_main\">\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "input", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                <div class=\"prop_main\">\n                    <div class=\"prop_sub\">Changes will apply ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ApplyType), "dynamic", {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                </div>\n            </td>\n        </tr>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <td>\n                    <div class=\"prop_main\" style=\"text-align: center\">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </td>\n            ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            "
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "&lt;engine-default&gt;";
  }

function program12(depth0,data) {
  
  
  return "&lt;empty&gt;";
  }

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                        <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"select\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            <option value=\"<engine-default>\">&lt;engine-default&gt;</option>\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.selections), {hash:{},inverse:self.noop,fn:self.programWithDepth(17, program17, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </select>\n                    ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                                <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.newValue), {hash:{},inverse:self.programWithDepth(21, program21, data, depth1),fn:self.programWithDepth(18, program18, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n                            ";
  return buffer;
  }
function program18(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.newValue), depth0, {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program19(depth0,data) {
  
  
  return "selected=\"selected\" ";
  }

function program21(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.ParameterValue), depth0, {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program22(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <input type=\"text\" class=\"input prop-half-width\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newValue), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AllowedValues), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program25(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.newValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program27(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  }

function program31(depth0,data) {
  
  
  return "immediately";
  }

function program33(depth0,data) {
  
  
  return "after rebooting";
  }

  buffer += "<table class=\"table\">\n    <thead>\n    <tr>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.filter=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


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
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });