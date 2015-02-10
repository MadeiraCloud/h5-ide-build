define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n      <li rule-num=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ruleAction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" rule-engress=\""
    + escapeExpression(((stack1 = (depth0 && depth0.egress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        <div class=\"acl-rule-number\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ruleNumber)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><span class=\"tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_RULE_NUMBER", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleNumber)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\r\n\r\n        <div class=\"acl-rule-details\">\r\n          <div class=\"rule-list-row\">\r\n            <div class=\"acl-rule-allow-cb tooltip acl-rule-action icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleAction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ruleAction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ruleAction), "deny", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></div>\r\n\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.egress), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <span class=\"acl-rule-reference tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_CIDR_BLOCK", {hash:{},data:data}))
    + "' data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n          </div>\r\n          <div class=\"rule-list-row\">\r\n            <div><span class=\"rule-protocol acl-rule-protocol tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "' data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocolName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></div>\r\n            <div class=\"acl-rule-port tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.dispPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n          </div>\r\n        </div>\r\n      </li>\r\n      ";
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
  buffer += "<span class=\"acl-rule-direction acl-rule-outbound icon-outbound tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "PROP.ACL_TIP_OUTBOUND", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.egress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>\r\n            ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"acl-rule-direction acl-rule-inbound icon-inbound tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "PROP.ACL_TIP_INBOUND", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.egress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>\r\n            ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n      <li>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetDisplay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\r\n    ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\r\n\r\n  <dl class=\"dl-vertical\">\r\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_APP_ID", {hash:{},data:data}))
    + "</dt>\r\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.networkAclId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n\r\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_APP_IS_DEFAULT", {hash:{},data:data}))
    + "</dt>\r\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1['default'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n\r\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\r\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n  </dl>\r\n\r\n\r\n  <header class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIT_RULE", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.rule_number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\r\n  <article class=\"option-group\">\r\n    <div class=\"rule-list-sort property-control-group\">\r\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\r\n      <div class=\"selectbox\" id=\"acl-sort-rule-select\">\r\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_NUMBER", {hash:{},data:data}))
    + "</div>\r\n        <ul class=\"dropdown\" tabindex=\"-1\">\r\n          <li data-id=\"number\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_NUMBER", {hash:{},data:data}))
    + "</li>\r\n          <li data-id=\"action\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_ACTION", {hash:{},data:data}))
    + "</li>\r\n          <li data-id=\"direction\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\r\n          <li data-id=\"source/destination\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n    <ul class=\"property-list acl-rule-list\" id=\"acl-rule-list\" >\r\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.entrySet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    </ul>\r\n  </article>\r\n\r\n\r\n  <header class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIT_ASSOC", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.asso_number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\r\n  <ul class=\"option-group property-list\">\r\n    ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.associationSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n  </ul>\r\n\r\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });