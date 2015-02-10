define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "readonly";
  }

function program3(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<div class=\"scroll-wrap\" style=\"max-height:500px;\" id=\"asg-termination-policy\" data-bind=\"true\">\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<div class=\"modal-body scroll-content\" id=\"property-asg-policy\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n\n		<label for=\"asg-policy-name\" class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "</label>\n		<input type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"asg-policy-name\" data-required-rollback=\"true\" data-ignore=\"true\" maxlength=\"255\" data-required=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOld), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n\n		<section class=\"modal-control-group\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ALARM", {hash:{},data:data}))
    + "</h5>\n			<div class=\"control-sentence\">\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_WHEN", {hash:{},data:data}))
    + "</span>\n\n				<div class=\"selectbox\" id=\"asg-policy-metric\">\n					<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_CPU", {hash:{},data:data}))
    + "</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li data-id=\"CPUUtilization\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_CPU", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"DiskReadBytes\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_DISC_READS", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"DiskReadOps\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_DISK_READ_OPERATIONS", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"DiskWriteBytes\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_DISK_WRITES", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"DiskWriteOps\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_DISK_WRITE_OPERATIONS", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"NetworkIn\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_NETWORK_IN", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"NetworkOut\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_NETWORK_OUT", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"StatusCheckFailed\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_STATUS_CHECK_FAILED_ANY", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"StatusCheckFailed_Instance\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_STATUS_CHECK_FAILED_INSTANCE", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"StatusCheckFailed_System\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_STATUS_CHECK_FAILED_SYSTEM", {hash:{},data:data}))
    + "</li>\n					</ul>\n				</div>\n\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_IS", {hash:{},data:data}))
    + "</span>\n\n				<div class=\"selectbox\" id=\"asg-policy-eval\">\n					<div class=\"selection\">&gt;=</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li data-id=\">\" class=\"item\">&gt;</li>\n						<li data-id=\">=\" class=\"item selected\">&gt;=</li>\n						<li data-id=\"<\" class=\"item\">&lt;</li>\n						<li data-id=\"<=\" class=\"item\">&lt;=</li>\n					</ul>\n				</div>\n\n				<input type=\"text\" class=\"input\" id=\"asg-policy-threshold\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*\\.?[0-9]*$\" data-required=\"true\">\n\n				<span id=\"asg-policy-unit\">"
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n\n				<br />\n\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_FOR", {hash:{},data:data}))
    + "</span>\n\n				<input type=\"text\" class=\"input\" id=\"asg-policy-periods\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.evaluationPeriods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-ignore=\"true\" data-type=\"digits\">\n\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_PERIOD", {hash:{},data:data}))
    + "</span>\n\n				<input type=\"text\" class=\"input\" id=\"asg-policy-second\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-ignore=\"true\" data-type=\"digits\">\n\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_SECONDS", {hash:{},data:data}))
    + "</span>\n\n				<br />\n\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_START_SCALING", {hash:{},data:data}))
    + "</span>\n\n				<div class=\"selectbox\" id=\"asg-policy-trigger\">\n					<div class=\"selection\">ALARM</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li data-id=\"ALARM\" class=\"item selected\">ALARM</li>\n						<li data-id=\"INSUFFICIANT_DATA\" class=\"item\">INSUFFICIANT_DATA</li>\n						<li data-id=\"OK\" class=\"item\">OK</li>\n					</ul>\n				</div>\n\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_STATE", {hash:{},data:data}))
    + "</span>\n			</div>\n		</section>\n\n		<section class=\"modal-control-group\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_SCALING_ACTIVITY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"control-sentence\">\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADJUSTMENT", {hash:{},data:data}))
    + "</span>\n				<div class=\"selectbox\" id=\"asg-policy-adjust-type\">\n					<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADJUSTMENT_CHANGE", {hash:{},data:data}))
    + "</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li data-id=\"ChangeInCapacity\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADJUSTMENT_CHANGE", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"ExactCapacity\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADJUSTMENT_EXACT", {hash:{},data:data}))
    + "</li>\n						<li data-id=\"PercentChangeInCapacity\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADJUSTMENT_PERCENT", {hash:{},data:data}))
    + "</li>\n					</ul>\n				</div>\n				<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADJUSTMENT_OF", {hash:{},data:data}))
    + "</span>\n				<input type=\"text\" class=\"input tooltip\" id=\"asg-policy-adjust\" data-required=\"true\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"e.g. -1\" data-ignore=\"true\" data-ignore-regexp=\"^-?[0-9]*$\">\n				<span class=\"hide pecentcapcity\">%</span>\n				<span>.</span>\n			</div>\n		</section>\n\n		<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED", {hash:{},data:data}))
    + "</h5>\n		<div class=\"asg-policy-advanced\">\n			<section id=\"asg-policy-statistics\" class=\"modal-control-group\">\n				<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_ALARM_OPTION", {hash:{},data:data}))
    + "</h5>\n				<div class=\"clearfix\">\n					<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC", {hash:{},data:data}))
    + "</label>\n					<div class=\"selectbox\" id=\"asg-policy-statistics\">\n						<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC_AVG", {hash:{},data:data}))
    + "</div>\n						<ul class=\"dropdown\" tabindex=\"-1\">\n							<li data-id=\"Average\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC_AVG", {hash:{},data:data}))
    + "</li>\n							<li data-id=\"Minimum\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC_MIN", {hash:{},data:data}))
    + "</li>\n							<li data-id=\"Maximum\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC_MAX", {hash:{},data:data}))
    + "</li>\n							<li data-id=\"SampleCount\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC_SAMPLE", {hash:{},data:data}))
    + "</li>\n							<li data-id=\"Sum\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_STATISTIC_SUM", {hash:{},data:data}))
    + "</li>\n						</ul>\n					</div>\n				</div>\n			</section>\n\n			<section id=\"asg-policy-scaling\" class=\"modal-control-group\">\n				<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_SCALING_OPTION", {hash:{},data:data}))
    + "</h5>\n				<div class=\"clearfix\">\n					<label for=\"asg-policy-cooldown\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_COOLDOWN_PERIOD", {hash:{},data:data}))
    + "</label>\n					<input type=\"text\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_TIP_COOLDOWN_PERIOD", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"5\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_DEFAULT_COOL_DOWN", {hash:{},data:data}))
    + "\" data-ignore=\"true\" data-type=\"digits\" id=\"asg-policy-cooldown\">\n					<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n				</div>\n\n				<div id=\"asg-policy-step-wrapper\" class=\"hide clearfix pecentcapcity\">\n					<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_MIN_ADJUST_STEP", {hash:{},data:data}))
    + "</label>\n					<input type=\"text\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ADD_POLICY_ADVANCED_TIP_MIN_ADJUST_STEP", {hash:{},data:data}))
    + "\" id=\"asg-policy-step\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.minAdjustStep)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" maxlength=\"5\" data-type=\"digits\">\n				</div>\n			</section>\n\n			<section class=\"modal-control-group\">\n				<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_NOTIFICATION", {hash:{},data:data}))
    + "</h5>\n				<div class=\"checkbox\">\n					<input id=\"asg-policy-notify\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sendNotification), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n					<label for=\"asg-policy-notify\"></label>\n				</div>\n				<label id=\"asg-policy-notify-label\" for=\"asg-policy-notify\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SEND_NOTIFICATION_D", {hash:{},data:data}))
    + "</label>\n\n				<div class=\"sns-policy-field\">\n					<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SELECT_SNS_TOPIC", {hash:{},data:data}))
    + "</label>\n					<div class=\"policy-sns-placeholder\"></div>\n				</div>\n\n			</section>\n		</div>\n	</div>\n</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });