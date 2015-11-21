define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_LOADING_APP_FAILED", {hash:{},data:data}))
    + "\r\n	<button class=\"btn btn-blue\" id=\"VisualizeReload\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_BTN_RETRY", {hash:{},data:data}))
    + "</button>\r\n</div>\r\n<div class=\"loading-spinner hide\"></div>\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ready), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "<div class=\"loading-spinner\"></div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<section>\r\n			<header class=\"region-header\"><span class=\"region-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><span class=\"vpc-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.apps)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></header>\r\n\r\n			<ul class=\"region-group clearfix\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</ul>\r\n		</section>\r\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n				<li class=\"visualize-vpc\">\r\n					<h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\r\n					<ol class=\"tac\">\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SUBNETS", {hash:{},data:data}))
    + "</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.router)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSROUTER", {hash:{},data:data}))
    + "</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.server)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSSERVER", {hash:{},data:data}))
    + "</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.fip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSFIP", {hash:{},data:data}))
    + "</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.listener)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSLISTENER", {hash:{},data:data}))
    + "</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.pool)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSPOOL", {hash:{},data:data}))
    + "</span></li>\r\n					</ol>\r\n					<button class=\"btn btn-blue visualize-vpc-btn\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_TO_IMPORT", {hash:{},data:data}))
    + "</button>\r\n				</li>\r\n				";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_APP_TO_IMPORT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  buffer += "<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:500px;\">\r\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n	<div id=\"VisualizeVpcDialog\" class=\"scroll-content\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fail), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });