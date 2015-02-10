define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

function program3(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

  buffer += "<article id=\"property-cgw\" data-bind=\"true\">\n	<div class=\"property-control-group clearfix\">\n		<label class=\"left\" for=\"property-cgw-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_NAME", {hash:{},data:data}))
    + "</label>\n		<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n		<input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cgw-name\" data-ignore=\"true\"/>\n	</div>\n\n	<div class=\"property-control-group\">\n        <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n        <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n	</div>\n\n	<div class=\"property-control-group clearfix\">\n		<label class=\"left\" for=\"property-cgw-ip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_IPADDR", {hash:{},data:data}))
    + "</label>\n		<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n		<input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9.]*$\" id=\"property-cgw-ip\" data-empty-remove=\"true\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_TIP_THIS_ADDRESS_MUST_BE_STATIC", {hash:{},data:data}))
    + "\"/>\n	</div>\n\n	<div class=\"property-control-group clearfix cgw-routing\">\n		<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_ROUTING", {hash:{},data:data}))
    + "</label>\n		<p></p>\n		<div class=\"radio\">\n			<input id=\"property-routing-static\" type=\"radio\" name=\"routing-type\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.BGP), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"static\" />\n			<label for=\"property-routing-static\"></label>\n		</div>\n		<label for=\"property-routing-static\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_STATIC", {hash:{},data:data}))
    + "</label>\n	</div>\n\n	<div class=\"property-control-group clearfix cgw-routing\">\n		<div class=\"radio\">\n			<input id=\"property-routing-dynamic\" type=\"radio\" name=\"routing-type\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.BGP), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"dynamic\" />\n			<label for=\"property-routing-dynamic\"></label>\n		</div>\n		<label for=\"property-routing-dynamic\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_DYNAMIC", {hash:{},data:data}))
    + "</label>\n	</div>\n\n	<div class=\"property-control-group clearfix\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.BGP), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"property-cgw-bgp-wrapper\">\n		<label class=\"left\" for=\"property-cgw-bgp\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_BGP_ASN", {hash:{},data:data}))
    + "</label>\n		<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n		<input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.BGP)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cgw-bgp\" maxlength=\"5\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_TIP_1TO65534", {hash:{},data:data}))
    + "\" data-type=\"digits\" />\n	</div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });