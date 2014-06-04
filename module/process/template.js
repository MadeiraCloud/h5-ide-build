define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n					"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_FAILED_TITLE", {hash:{},data:data}))
    + "\n				";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n					"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_TITLE", {hash:{},data:data}))
    + "\n				";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<div class=\"result-success\">\n			<p class=\"result-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_TITLE", {hash:{},data:data}))
    + "</p>\n			<p class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_SUB_TITLE", {hash:{},data:data}))
    + "</p>\n		</div>\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<div class=\"loading-spinner\"></div>\n		<!-- <div class=\"step-prepare clearfix\">\n			<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_STEP_PREPARE", {hash:{},data:data}))
    + "</h2><div class=\"loading-spinner\"></div>\n		</div> -->\n		";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"result-fail error-info-block\">\n			<!-- <p class=\"result-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_TITLE", {hash:{},data:data}))
    + "</p> -->\n			<p class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</p>\n			<div class=\"result-error-info\">\n				<p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\n				<p class=\"detail\">";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.err_detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n			</div>\n			<div class=\"action\">\n				<button class=\"btn btn-silver btn-close-process\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_CLOSE_TAB", {hash:{},data:data}))
    + "</button>\n			</div>\n		</div>\n		";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"step-request\">\n			<!-- <h2>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_STEP_REQUEST", {hash:{},data:data}))
    + "</h2> -->\n			<div class=\"progress\">\n				<div class=\"bar\" id=\"progress_bar\" style=\"width: "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.rate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\n			</div>\n			<p class=\"process-info\">\n				<span><b class=\"num\" id=\"progress_num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.dones)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> of</span>\n				<span><b class=\"total\" id=\"progress_total\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.steps)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> tasks</span>\n			</p>\n		</div>\n		";
  return buffer;
  }

  buffer += "<div id=\"process-panel\">\n	<section id=\"process-container\">\n		<header id=\"process-title\" class=\"overlay-text\">\n				";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_failed), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</header>\n		<div id=\"process-body\">\n\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_done), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_pending), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_failed), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.flag_list)),stack1 == null || stack1 === false ? stack1 : stack1.is_inprocess), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		</div>\n	</section>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });