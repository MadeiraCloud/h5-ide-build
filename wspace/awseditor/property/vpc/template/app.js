define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"property-control-group\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_LBL_DEFAULT", {hash:{},data:data}))
    + "</p>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultDhcp), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <dl class=\"dl-vertical\">\n        <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_LBL_NONE", {hash:{},data:data}))
    + "</dd>\n    </dl>\n  </div>\n  ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_OPTION_SET_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dhcpOptionsId), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainName), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainNameServers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNameServers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNodeType), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </dl>\n  ";
  return buffer;
  }
function program7(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program9(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainName), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</p>";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainNameServers), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n    ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n    ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NAME_SERVER", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNameServers), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n    ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNodeType)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_TENANCY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceTenancy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.mainRTB)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_DEFAULT_ACL", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.defaultACL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n  </div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIT_DHCP_OPTION", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoDhcp), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.defaultDhcp), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });