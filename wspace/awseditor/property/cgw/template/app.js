define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group clearfix\">\n      <label class=\"left\" for=\"property-cgw-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cgw-name\" data-ignore=\"true\"/>\n  </div>\n  <section class=\"property-control-group\" data-bind=\"true\">\n    <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n    <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n  </section>\n  ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_CGW_LBL_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </dl>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_CGW_LBL_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_IPADDR", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ipAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_CGW_LBL_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_BGP_ASN", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.bgpAsn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });