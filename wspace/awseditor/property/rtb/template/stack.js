define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_ASSOCIATION", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_ASSOCIATION_TO", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.rtb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"property-control-group\" data-bind=\"true\">\n		<label class=\"left\" for=\"rt-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_NAME", {hash:{},data:data}))
    + "</label>\n		<input class=\"input\" type=\"text\" data-required=\"true\" data-ignore=\"true\" data-required-rollback=\"true\"  value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"rt-name\">\n	</div>\n\n	<section class=\"property-control-group\" data-bind=\"true\">\n        <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n        <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n	</section>\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(7, program7, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_ROUTE", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<ul class=\"property-list property-list-no-padding route-list\">\n			<li><table class=\"table-no-style\">\n			  <tr class=\"route-target\">\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_TARGET", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-target-resource\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LOCAL", {hash:{},data:data}))
    + "</td>\n			  </tr>\n			  <tr>\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_DESTINATION", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-destination-input\"> <div class=\"route-readonly\">"
    + escapeExpression(((stack1 = (depth0 && depth0.local_route)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div> </td>\n			  </tr>\n			</table></li>\n\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.routes), {hash:{},inverse:self.noop,fn:self.programWithDepth(12, program12, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	  <dl class=\"dl-vertical\">\n	    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_ID", {hash:{},data:data}))
    + "</dt>\n	    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.routeTableId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n	    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n	    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n	    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_VPC_ID", {hash:{},data:data}))
    + "</dt>\n	    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	  </dl>\n\n	  	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isMain), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n	  	<div class=\"tac property-control-group\">\n			<button class=\"btn btn-primary\" id=\"set-main-rt\" style=\"width: 200px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_SET_MAIN", {hash:{},data:data}))
    + "</button>\n			<p class=\"hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</p>\n		</div>\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"tac property-control-group\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isMain), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</p>\n			";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<button class=\"btn btn-primary\" id=\"set-main-rt\" style=\"width: 200px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_SET_MAIN", {hash:{},data:data}))
    + "</button>\n			<p class=\"hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</p>\n			";
  return buffer;
  }

function program12(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.isStack), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			  ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.isStack), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			  <table class=\"table-no-style\">\n			  <tr class=\"route-target\">\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_TARGET", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-target-resource\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n			  </tr>\n\n			  <tr>\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RT_DESTINATION", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-destination-input\">\n			    	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readonly), {hash:{},inverse:self.program(22, program22, data),fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n				    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isVgw), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			    </td>\n			  </tr>\n			</table>\n			</li>\n			";
  return buffer;
  }
function program13(depth0,data) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.type), "ExternalVpcRouteTarget", {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program14(depth0,data) {
  
  
  return "have-vpc-peer-route";
  }

function program16(depth0,data) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.type), "ExternalVpcRouteTarget", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program17(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"remove-vpc-peer-route\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RTB_REMOVE_VPC_PEER_ROUTE", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cidr_set), {hash:{},inverse:self.noop,fn:self.programWithDepth(20, program20, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;
  }
function program20(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += " <div class=\"route-readonly\" data-ref=\""
    + escapeExpression(((stack1 = (depth1 && depth1.ref)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div> ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			    	<div class=\"multi-input\" data-ref=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ref)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n							";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cidr_set), {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				    </div>\n				    ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "";
  buffer += "\n							<div class=\"multi-ipt-row\">\n			          <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n			          <span class=\"ipt-wrapper\"><input class=\"ip-main-input input\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" data-type=\"cidr\" data-trigger=\"change\" placeholder=\"eg. 0.0.0.0/0\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\"></span>\n			        </div>\n							";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "\n							<div class=\"multi-ipt-row\">\n			          <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n			          <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" placeholder=\"eg. 0.0.0.0/0\" data-empty-remove=\"true\" type=\"text\"></span>\n			        </div>\n				      ";
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				    <div class=\"property-control-group\">\n							<div class=\"checkbox\">\n								<input id=\"propagate_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" class=\"propagation\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isProp), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n								<label for=\"propagate_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n							</div>\n							<label for=\"propagate_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RTB_ALLOW_PROPAGATION", {hash:{},data:data}))
    + "</label>\n						</div>\n						";
  return buffer;
  }
function program28(depth0,data) {
  
  
  return "checked=\"true\"";
  }

  buffer += "<article>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.association), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });