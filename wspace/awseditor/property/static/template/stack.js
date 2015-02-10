define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <article class=\"property-app\">\n  <dl class=\"dl-vertical\">\n    <dt>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIGW), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ID</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.appId), {hash:{},data:data}))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIGW), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt>VPC</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.vpcId), {hash:{},data:data}))
    + "</dd>\n  </dl>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "Internet Gateway";
  }

function program4(depth0,data) {
  
  
  return "VPN Gateway";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ATTACHMENT_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.attachment_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.attachment_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>type</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <article>\n  <div  class=\"property-control-group\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIGW), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.IGW_TXT_DESCRIPTION", {hash:{},data:data}))
    + "\n  ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VGW_TXT_DESCRIPTION", {hash:{},data:data}))
    + "\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });