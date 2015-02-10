define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <div class=\"acl-rule-number\"><span class=\"tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_RULE_NUMBER", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n\n  <div class=\"acl-rule-details\">\n    <div class=\"rule-list-row\">\n      <div class=\"acl-rule-allow-cb tooltip icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.action)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.action), "deny", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></div>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.egress), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <span class=\"tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_CIDR_BLOCK", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n    <div class=\"rule-list-row\">\n      <div><span class=\"rule-protocol tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n      <div class=\"tooltip\" data-tooltip='"
    + escapeExpression(((stack1 = (depth0 && depth0.tooltip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </div>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP.ACL_TIP_ACTION_DENY", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program4(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP.ACL_TIP_ACTION_ALLOW", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"icon-outbound tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "PROP.ACL_TIP_OUTBOUND", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></span>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"icon-inbound tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "PROP.ACL_TIP_INBOUND", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></span>\n      ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<a class=\"icon-remove rule-remove-icon tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_REMOVE_RULE", {hash:{},data:data}))
    + "'></a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }; return Handlebars.template(TEMPLATE); });