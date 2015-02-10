define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_ASSOCIATION", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_ASSOCIATION_TO", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.rtb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_VPC_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_ROUTE", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <table class=\"table table-small\">\n      <thead>\n        <tr>\n          <th></th>\n          <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_DESTINATION", {hash:{},data:data}))
    + "</th>\n          <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_TARGET", {hash:{},data:data}))
    + "</th>\n          <th></th>\n        </tr>\n      </thead>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.routeSet), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n  </div>\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.destinationCidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.target)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.propagate), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tr>\n      ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td><i class=\"status status-green tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_TIP_ACTIVE", {hash:{},data:data}))
    + "\"></i></td>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td><i class=\"status status-red tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_TIP_BLACKHOLE", {hash:{},data:data}))
    + "\"></i></td>\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td><i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_TIP_PROPAGATED", {hash:{},data:data}))
    + "\"></i></td>\n        ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n        <td></td>\n        ";
  }

  buffer += "<article class=\"property-app\">\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.association), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });