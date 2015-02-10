define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MSG_DROP_LC", {hash:{},data:data}))
    + "</div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_DETAILS", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-asg-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_REQUIRED", {hash:{},data:data}))
    + "</span>\n			<input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-asg-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n		</section>\n\n		<section class=\"property-control-group\" data-bind=\"true\">\n	        <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n	        <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</section>\n\n		<section class=\"property-control-group clearfix\">\n			<div class=\"left property-asg-size\">\n				<label class=\"left\" for=\"property-asg-min\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MIN_SIZE", {hash:{},data:data}))
    + "</label>\n				<input class=\"input\" type=\"text\" id=\"property-asg-min\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.minSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n			</div>\n			<div class=\"right property-asg-size\">\n				<label class=\"left\" for=\"property-asg-max\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MAX_SIZE", {hash:{},data:data}))
    + "</label>\n				<input class=\"input\" type=\"text\" id=\"property-asg-max\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n			</div>\n	  </section>\n\n		<section class=\"property-control-group property-asg-size\">\n			<label class=\"left\" for=\"property-asg-capacity\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_DESIRE_CAPACITY", {hash:{},data:data}))
    + "</label>\n			<input class=\"input\" type=\"text\" id=\"property-asg-capacity\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.capacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n		</section>\n\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-asg-cooldown\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_COOL_DOWN", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short\" type=\"text\" id=\"property-asg-cooldown\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"digits\" max=\"86400\">\n			<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n		</section>\n\n		<section class=\"property-control-group clearfix\">\n			<label clas=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HEALTH_CHECK_TYPE", {hash:{},data:data}))
    + "</label>\n			<div class=\"asg-radio-group\">\n				<div class=\"radio\">\n					<input id=\"property-asg-ec2\" type=\"radio\" value=\"ec2\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n					<label for=\"property-asg-ec2\"></label>\n				</div>\n				<label for=\"property-asg-ec2\">EC2</label>\n			</div>\n			<div ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				<div class=\"radio\">\n					<input id=\"property-asg-elb\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"elb\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n					<label for=\"property-asg-elb\"></label>\n				</div>\n				<label for=\"property-asg-elb\">ELB</label>\n                <p id=\"property-asg-elb-warn\" class=\"hide property-info\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ELB_WARN", {hash:{},data:data}))
    + "</p>\n			</div>\n		</section>\n\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-asg-healthcheck\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HEALTH_CHECK_CRACE_PERIOD", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short\" type=\"text\" id=\"property-asg-healthcheck\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckGracePeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n			<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n		</section>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group pos-r property-term-p\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_POLICY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"termination-policy-brief\">"
    + escapeExpression(((stack1 = (depth0 && depth0.term_policy_brief)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"asg-p-action\"><i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_EDIT", {hash:{},data:data}))
    + "\" id=\"property-asg-term-edit\"></i></div>\n		</section>\n\n		<ul id=\"property-asg-policies\" class=\"property-list\">\n			<li class=\"pos-r hide\">\n        <h5 class=\"property-asg-policy-name name\"></h5>\n				<span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-trigger asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\"></span>\n        <div class=\"asg-p-action\">\n	        <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n	        <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n        </div>\n      </li>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.policies), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		</ul>\n		<div class=\"property-control-group tac\">\n			<button class=\"btn btn-blue ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_add_policy), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-asg-policy-add\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TIP_YOU_CAN_ONLY_ADD_25_SCALING_POLICIES", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_BTN_ADD_SCALING_POLICY", {hash:{},data:data}))
    + "</button>\n		</div>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_NOTIFICATION", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" id=\"property-asg-sns\">\n		<div class=\"property-control-group property-asg-notification-wrap\">\n			<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SEND_NOTIFICATION", {hash:{},data:data}))
    + "</p>\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns1\" type=\"checkbox\" data-key=\"instanceLaunch\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunch), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns1\"></label>\n			</div>\n			<label for=\"property-asg-sns1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SUCCESS_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns2\" type=\"checkbox\" data-key=\"instanceLaunchError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunchError), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns2\"></label>\n			</div>\n			<label for=\"property-asg-sns2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_FAILED_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns3\" type=\"checkbox\" data-key=\"instanceTerminate\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminate), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns3\"></label>\n			</div>\n			<label for=\"property-asg-sns3\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SUCCESS_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns4\" type=\"checkbox\" data-key=\"instanceTerminateError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminateError), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns4\"></label>\n			</div>\n			<label for=\"property-asg-sns4\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_FAILED_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns5\" type=\"checkbox\" data-key=\"test\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.test), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns5\"></label>\n			</div>\n			<label for=\"property-asg-sns5\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_VALIDATE_SNS", {hash:{},data:data}))
    + "</label></div>\n\n		</div>\n\n		<div class=\"property-control-group sns-group\" style=\"display:none;\">\n			<label for=\"sns-placeholder\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SELECT_SNS_TOPIC", {hash:{},data:data}))
    + "</label>\n			<div id=\"sns-placeholder\"></div>\n		</div>\n\n	</div>\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HAS_ELB_WARN", {hash:{},data:data}))
    + "\" class=\"asg-radio-group tooltip\"";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "class=\"asg-radio-group\"";
  }

function program10(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program12(depth0,data) {
  
  
  return " style=\"display: block\"";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <h5 class=\"property-asg-policy-name name\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n      	<span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.metricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.comparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.evaluationPeriods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "x"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "m</span>\n        <span class=\"asg-p-trigger asg-p-tag asg-p-trigger-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.adjustmentType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <div class=\"asg-p-action\">\n	        <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n	        <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n        </div>\n      </li>\n      ";
  return buffer;
  }

function program16(depth0,data) {
  
  
  return "disabled tooltip";
  }

function program18(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<article>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.emptyAsg), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });