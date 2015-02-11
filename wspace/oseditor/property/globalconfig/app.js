define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ENABLED", {hash:{},data:data}))
    + "</dd>\r\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DISABLED", {hash:{},data:data}))
    + "</dd>\r\n        ";
  return buffer;
  }

  buffer += "<section class=\"group\">\r\n    <dl class=\"dl-horizontal\">\r\n        <dt>Platform</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.platform), {hash:{},data:data}))
    + "</dd>\r\n        <dt>Region</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.region), {hash:{},data:data}))
    + "</dd>\r\n        <dt>App ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\r\n        <dt>Usage</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.usage), {hash:{},data:data}))
    + "</dd>\r\n    </dl>\r\n</section>\r\n\r\n<section class=\"group\">\r\n    <dl class=\"dl-vertical\">\r\n        <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\r\n        <dt>Instance State</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.agent)),stack1 == null || stack1 === false ? stack1 : stack1.enabled), {hash:{},data:data}))
    + "</dd>\r\n        <!-- <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_RESDIFF_VIEW", {hash:{},data:data}))
    + "</dt>\r\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.resource_diff), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " -->\r\n    </dl>\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });