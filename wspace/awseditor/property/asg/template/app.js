define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_SUMMARY", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.awsResName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ARN", {hash:{},data:data}))
    + "</dt>\n      <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TIP_CLICK_TO_SELECT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</dd>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n      ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-asg-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-asg-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n    </section>\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "\n    </dl>\n    ";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LC_TITLE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.lcName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MIN_SIZE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.minSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MAX_SIZE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.maxSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_DESIRE_CAPACITY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.capacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_COOL_DOWN", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HEALTH_CHECK_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.healCheckType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HEALTH_CHECK_CRACE_PERIOD", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckGracePeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group\">\n    <p class=\"property-info tac\">Auto Scaling Group "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " is deleted in stopped app.</p>\n  </div>\n  ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_DETAILS", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\" data-bind=\"true\">\n    <section class=\"property-control-group clearfix\">\n      <div class=\"left property-asg-size\">\n        <label class=\"left\" for=\"property-asg-min\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MIN_SIZE", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" id=\"property-asg-min\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.minSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n      </div>\n      <div class=\"right property-asg-size\">\n        <label class=\"left\" for=\"property-asg-max\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MAX_SIZE", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" id=\"property-asg-max\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n      </div>\n    </section>\n\n    <section class=\"property-control-group property-asg-size\">\n      <label class=\"left\" for=\"property-asg-capacity\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_DESIRE_CAPACITY", {hash:{},data:data}))
    + "</label>\n      <input class=\"input\" type=\"text\" id=\"property-asg-capacity\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.capacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-asg-cooldown\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_COOL_DOWN", {hash:{},data:data}))
    + "</label>\n      <input class=\"input input-short\" type=\"text\" id=\"property-asg-cooldown\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"digits\" max=\"86400\">\n      <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n    </section>\n\n    <section class=\"property-control-group clearfix\">\n      <label clas=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HEALTH_CHECK_TYPE", {hash:{},data:data}))
    + "</label>\n      <div class=\"asg-radio-group\">\n        <div class=\"radio\">\n          <input id=\"property-asg-ec2\" type=\"radio\" value=\"ec2\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n          <label for=\"property-asg-ec2\"></label>\n        </div>\n        <label for=\"property-asg-ec2\">EC2</label>\n      </div>\n      <div ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <div class=\"radio\">\n          <input id=\"property-asg-elb\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"elb\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n          <label for=\"property-asg-elb\"></label>\n        </div>\n        <label for=\"property-asg-elb\">ELB</label>\n        <p id=\"property-asg-elb-warn\" class=\"hide property-info\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_ELB_WARN", {hash:{},data:data}))
    + "</p>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-asg-healthcheck\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HEALTH_CHECK_CRACE_PERIOD", {hash:{},data:data}))
    + "</label>\n      <input class=\"input input-short\" type=\"text\" id=\"property-asg-healthcheck\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckGracePeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n      <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n    </section>\n\n  </div>\n  ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_HAS_ELB_WARN", {hash:{},data:data}))
    + "\" class=\"asg-radio-group tooltip\"";
  return buffer;
  }

function program17(depth0,data) {
  
  
  return "class=\"asg-radio-group\"";
  }

function program19(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program21(depth0,data) {
  
  
  return " style=\"display: block\"";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_INSTANCE", {hash:{},data:data}))
    + " <span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = (depth0 && depth0.instance_count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></div>\n    <div class=\"option-group\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_groups), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  ";
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"property-group-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      <ul class=\"property-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instances), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n      ";
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n        ";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <section class=\"property-control-group pos-r\">\n        <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_POLICY", {hash:{},data:data}))
    + "</h5>\n        <p class=\"termination-policy-brief\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.term_policy_brief), {hash:{},data:data}))
    + "</p>\n      </section>\n      <ul id=\"property-asg-policies\" class=\"property-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.policies), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    ";
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"property-asg-policy-name\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.arn), {hash:{},inverse:self.program(31, program31, data),fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n          </li>\n\n        ";
  return buffer;
  }
function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TIP_CLICK_TO_SELECT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.metric)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.evaluation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.periods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "x"
    + escapeExpression(((stack1 = (depth0 && depth0.minute)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "m</span>\n            <span class=\"asg-p-trigger asg-p-tag asg-p-trigger-"
    + escapeExpression(((stack1 = (depth0 && depth0.trigger)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.trigger)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.adjusttype)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            ";
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <section class=\"property-control-group pos-r property-term-p\">\n        <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_POLICY", {hash:{},data:data}))
    + "</h5>\n        <div class=\"termination-policy-brief\">"
    + escapeExpression(((stack1 = (depth0 && depth0.term_policy_brief)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"asg-p-action\"><i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_EDIT", {hash:{},data:data}))
    + "\" id=\"property-asg-term-edit\"></i></div>\n      </section>\n      <ul id=\"property-asg-policies\" class=\"property-list\">\n        <li class=\"pos-r hide\">\n          <h5 class=\"property-asg-policy-name name\"></h5>\n          <span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-trigger asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\"></span>\n          <div class=\"asg-p-action\">\n            <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n            <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n          </div>\n        </li>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.policies), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      </ul>\n      <div class=\"property-control-group tac\">\n        <button class=\"btn btn-blue ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_add_policy), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-asg-policy-add\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TIP_YOU_CAN_ONLY_ADD_25_SCALING_POLICIES", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_BTN_ADD_SCALING_POLICY", {hash:{},data:data}))
    + "</button>\n      </div>\n    ";
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-old=\"true\">\n          <h5 class=\"property-asg-policy-name name\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n          <span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.metricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.comparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.evaluationPeriods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "x"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "m</span>\n          <span class=\"asg-p-trigger asg-p-tag asg-p-trigger-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.adjustmentType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <div class=\"asg-p-action\">\n            <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n            <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n          </div>\n        </li>\n        ";
  return buffer;
  }

function program36(depth0,data) {
  
  
  return "disabled tooltip";
  }

function program38(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dl class=\"dl-vertical\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sendNotify), {hash:{},inverse:self.program(50, program50, data),fn:self.program(39, program39, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNS_TOPIC", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.notiTopicName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      </dl>\n\n    ";
  return buffer;
  }
function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SEND_NOTIFICATION", {hash:{},data:data}))
    + "</dt>\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[1]), {hash:{},inverse:self.noop,fn:self.program(42, program42, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[2]), {hash:{},inverse:self.noop,fn:self.program(44, program44, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[3]), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[4]), {hash:{},inverse:self.noop,fn:self.program(48, program48, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program40(depth0,data) {
  
  var buffer = "";
  buffer += "<dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SUCCESS_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program42(depth0,data) {
  
  var buffer = "";
  buffer += "<dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_FAILED_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program44(depth0,data) {
  
  var buffer = "";
  buffer += "<dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SUCCESS_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program46(depth0,data) {
  
  var buffer = "";
  buffer += "<dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_FAILED_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program48(depth0,data) {
  
  var buffer = "";
  buffer += "<dd>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_VALIDATE_SNS", {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program50(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <dd class=\"property-info tac\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_MSG_NO_NOTIFICATION_WARN", {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

function program52(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"property-control-group property-asg-notification-wrap\">\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SEND_NOTIFICATION", {hash:{},data:data}))
    + "</p>\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns1\" type=\"checkbox\" data-key=\"instanceLaunch\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunch), {hash:{},inverse:self.noop,fn:self.program(53, program53, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns1\"></label>\n        </div>\n        <label for=\"property-asg-sns1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SUCCESS_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns2\" type=\"checkbox\" data-key=\"instanceLaunchError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunchError), {hash:{},inverse:self.noop,fn:self.program(53, program53, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns2\"></label>\n        </div>\n        <label for=\"property-asg-sns2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_FAILED_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns3\" type=\"checkbox\" data-key=\"instanceTerminate\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminate), {hash:{},inverse:self.noop,fn:self.program(53, program53, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns3\"></label>\n        </div>\n        <label for=\"property-asg-sns3\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_SUCCESS_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns4\" type=\"checkbox\" data-key=\"instanceTerminateError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminateError), {hash:{},inverse:self.noop,fn:self.program(53, program53, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns4\"></label>\n        </div>\n        <label for=\"property-asg-sns4\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_FAILED_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns5\" type=\"checkbox\" data-key=\"test\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.test), {hash:{},inverse:self.noop,fn:self.program(53, program53, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns5\"></label>\n        </div>\n        <label for=\"property-asg-sns5\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_VALIDATE_SNS", {hash:{},data:data}))
    + "</label></div>\n\n      </div>\n      <div class=\"property-control-group sns-group\" style=\"display:none;\">\n        <label for=\"sns-placeholder\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SELECT_SNS_TOPIC", {hash:{},data:data}))
    + "</label>\n        <div id=\"sns-placeholder\"></div>\n      </div>\n    ";
  return buffer;
  }
function program53(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<article class=\"property-app\" data-bind=\"true\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasData), {hash:{},inverse:self.program(10, program10, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasData), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_POLICY", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.program(33, program33, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_LBL_NOTIFICATION", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\" id=\"property-asg-sns\">\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.program(52, program52, data),fn:self.program(38, program38, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });