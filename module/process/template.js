define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n					"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_FAILED_TITLE", {hash:{},data:data}))
    + "\r\n				";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n					"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_TITLE", {hash:{},data:data}))
    + "\r\n				";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n		<div class=\"result-success\">\r\n			<p class=\"result-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_TITLE", {hash:{},data:data}))
    + "</p>\r\n			<p class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_SUB_TITLE", {hash:{},data:data}))
    + "</p>\r\n		</div>\r\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n		<div class=\"loading-spinner\"></div>\r\n		<!-- <div class=\"step-prepare clearfix\">\r\n			<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_STEP_PREPARE", {hash:{},data:data}))
    + "</h2><div class=\"loading-spinner\"></div>\r\n		</div> -->\r\n		";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<div class=\"result-fail error-info-block\">\r\n			<!-- <p class=\"result-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_TITLE", {hash:{},data:data}))
    + "</p> -->\r\n			<p class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</p>\r\n			<div class=\"result-error-info\">\r\n				<p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\r\n				<p class=\"detail\">";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.err_detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\r\n			</div>\r\n			<div class=\"action\">\r\n				<button class=\"btn btn-silver btn-close-process\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_CLOSE_TAB", {hash:{},data:data}))
    + "</button>\r\n			</div>\r\n		</div>\r\n		";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<div class=\"step-request\">\r\n			<!-- <h2>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_STEP_REQUEST", {hash:{},data:data}))
    + "</h2> -->\r\n			<div class=\"progress\">\r\n				<div class=\"bar\" id=\"progress_bar\" style=\"width: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.rate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\r\n			</div>\r\n			<p class=\"process-info\">\r\n				<span><b class=\"num\" id=\"progress_num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.dones)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> of</span>\r\n				<span><b class=\"total\" id=\"progress_total\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.steps)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> tasks</span>\r\n			</p>\r\n		</div>\r\n		";
  return buffer;
  }

  buffer += "<div id=\"process-panel\">\r\n	<section id=\"process-container\">\r\n		<header id=\"process-title\" class=\"overlay-text\">\r\n				";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_failed), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</header>\r\n		<div id=\"process-body\">\r\n\r\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_done), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_pending), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_failed), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_inprocess), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		</div>\r\n	</section>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });