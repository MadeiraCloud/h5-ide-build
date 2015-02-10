define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dl class=\"dl-horizontal dl-region-type property-control-group\">\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_REGION", {hash:{},data:data}))
    + "</label></dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_TYPE", {hash:{},data:data}))
    + "</label></dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_ID", {hash:{},data:data}))
    + "</label></dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label></dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\" data-bind=\"true\">\n        <label class=\"left\" for=\"property-app-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_NAME", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-app-name\">\n    </section>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_USAGE", {hash:{},data:data}))
    + "</label></dt>\n      <dd style=\"text-transform: capitalize\">"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical\">\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_INSTANCE_STATE", {hash:{},data:data}))
    + "</label></dt>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.opsEnable), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_RESDIFF_VIEW", {hash:{},data:data}))
    + "</label></dt>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isResDiff), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ENABLED", {hash:{},data:data}))
    + "</dd>\n      ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DISABLED", {hash:{},data:data}))
    + "</dd>\n      ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group resdiff-switch\">\n      <div class=\"checkbox\">\n        <input id=\"property-app-resdiff\" type=\"checkbox\" name=\"resdiff\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isResDiff), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " >\n        <label for=\"property-app-resdiff\"></label>\n      </div>\n      <label for=\"property-app-resdiff\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_LBL_RESDIFF", {hash:{},data:data}))
    + "</label><i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.APP_TIP_RESDIFF", {hash:{},data:data}))
    + "\"></i>\n    </section>\n    ";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "checked";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<section class=\"property-control-group\" data-bind=\"true\">\n		<label class=\"left\" for=\"property-stack-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_NAME", {hash:{},data:data}))
    + "</label>\n		<input class=\"input\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-stack-name\">\n	</section>\n    <section class=\"property-control-group\" data-bind=\"true\">\n        <label for=\"property-stack-description\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_DESCRIPTION", {hash:{},data:data}))
    + "</label>\n        <textarea name=\"\" id=\"property-stack-description\" cols=\"30\" rows=\"7\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n	<dl class=\"dl-horizontal dl-region-type property-control-group\">\n		<dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_REGION", {hash:{},data:data}))
    + "</label></dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_TYPE", {hash:{},data:data}))
    + "</label></dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_ID", {hash:{},data:data}))
    + "</label></dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n  ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head pos-r\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_TIT_ACL", {hash:{},data:data}))
    + "<span class=\"acl-info-list-num property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.networkAcls)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>\n	</div>\n	<div class=\"option-group\">\n    <ul class=\"acl-sg-info-list acl-info-list property-list\" id=\"stack-property-acl-list\"></ul>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n	";
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = "";
  buffer += "<a href=\"#\" class=\"add-to-list action-link\" id=\"stack-property-new-acl\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_BTN_CREATE_NEW_ACL", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.currency)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.totalFee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  stack1 = helpers.i18n.call(depth0, "PROP.STACK_LBL_COST_CYCLE", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr> <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.resource)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td> <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td> <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.formatedFee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td> </tr>\n      ";
  return buffer;
  }

  buffer += "<article>\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.program(14, program14, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<!-- SG, ACL, COST -->\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_TIT_SG", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.networkAcls), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n	<div class=\"option-group-head\">\n		"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_TIT_COST_ESTIMATION", {hash:{},data:data}))
    + "\n		<span class=\"cost-counter right\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.totalFee), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n	</div>\n	<div class=\"option-group\">\n		<table class=\"table cost-estimation-table\">\n			<thead> <tr>\n					<th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_COST_COL_RESOURCE", {hash:{},data:data}))
    + "</th>\n          <th style=\"min-width:70px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_COST_COL_SIZE_TYPE", {hash:{},data:data}))
    + "</th>\n          <th style=\"min-width:60px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_COST_COL_FEE", {hash:{},data:data}))
    + "</th>\n			</tr> </thead>\n			<tbody> ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.costList), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n\n		</table>\n		<div class=\"property-control-group tac\">\n			<a target=\"_blank\" href=\"http://aws.amazon.com/ec2/pricing/\" class=\"goto-outsite tac\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STACK_LBL_AWS_EC2_PRICING", {hash:{},data:data}))
    + "</a>\n		</div>\n	</div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });