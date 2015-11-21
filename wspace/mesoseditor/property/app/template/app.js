define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                    <li data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, depth0, (depth0 && depth0.version), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\r\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <div class=\"option-group-head expand\" id=\"mesos-execution-settings\">Execution Settings</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        <dl class=\"dl-vertical\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isCommand), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <dt>Environment</dt>\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.env), {hash:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <dt>Ports</dt>\r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ports)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(12, program12, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <dt>Executor</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.executor), {hash:{},data:data}))
    + "</dd>\r\n            <dt>URIs</dt>\r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.uris)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(20, program20, data),fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </dl>\r\n    </div>\r\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<dt>Command</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.command), {hash:{},data:data}))
    + "</dd>\r\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <dt>Command</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.command), {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.env), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <dd>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n            ";
  return buffer;
  }

function program12(depth0,data) {
  
  
  return "\r\n            <dd>-</dd>\r\n            ";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ports), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "";
  buffer += "<dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, depth0, {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.uris), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n                <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, depth0, {hash:{},data:data}))
    + "</dd>\r\n            ";
  return buffer;
  }

function program20(depth0,data) {
  
  
  return "\r\n                <dd>-</dd>\r\n            ";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.constraints), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n                <dd>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\r\n            ";
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = "";
  buffer += escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <dl class=\"dl-vertical mesos-health-check-li\">\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.protocol), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.path), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.portIndex), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n            <dt>Grace Period Seconds</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.gracePeriodSeconds), {hash:{},data:data}))
    + "</dd>\r\n\r\n            <dt>Interval Seconds</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.intervalSeconds), {hash:{},data:data}))
    + "</dd>\r\n\r\n            <dt>Timeout Seconds</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.timeoutSeconds), {hash:{},data:data}))
    + "</dd>\r\n\r\n            <dt>Max Consecutive Failures</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.maxConsecutiveFailures), {hash:{},data:data}))
    + "</dd>\r\n        </dl>\r\n        ";
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <dt>Protocol</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.protocol), {hash:{},data:data}))
    + "</dd>\r\n            ";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n                <dt>Path</dt>\r\n                <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.path), {hash:{},data:data}))
    + "</dd>\r\n            ";
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <dt>Port Index</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.portIndex), {hash:{},data:data}))
    + "</dd>\r\n            ";
  return buffer;
  }

function program33(depth0,data) {
  
  
  return "\r\n        <dl class=\"dl-vertical\">\r\n            <dt>Health Checks</dt>\r\n            <dd>-</dd>\r\n        </dl>\r\n        ";
  }

function program35(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n            <dd>id: "
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\r\n            ";
  return buffer;
  }

  buffer += "<article>\r\n    <div class=\"option-group-head expand\" id=\"mesos-switch-versions\">Switch Versions</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        <section class=\"property-control-group clearfix\">\r\n            <label class=\"left\">Switch Version</label>\r\n            <div class=\"selectbox mesos-switch-versions\">\r\n                <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.version)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n                <ul class=\"dropdown\">\r\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.versions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n                </ul>\r\n            </div>\r\n        </section>\r\n        <dl class=\"dl-vertical\">\r\n            <dt>Tasks</dt>\r\n            <dd><a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.task)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">Task Details</a></dd>\r\n        </dl>\r\n    </div>\r\n    <div class=\"option-group-head expand\" id=\"mesos-container-settings\">Container Setting</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        <section class=\"clearfix\">\r\n            <button class=\"open-container btn-blue btn\">Container Setting</button>\r\n        </section>\r\n    </div>\r\n    <div class=\"option-group-head expand\" id=\"mesos-basic-settings\">Basic Settings</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        <dl class=\"dl-vertical\">\r\n            <dt>ID</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\r\n            <dt>CPUs</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.cpus), {hash:{},data:data}))
    + "</dd>\r\n            <dt>Memory</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.mem), {hash:{},data:data}))
    + "</dd>\r\n            <dt>Instances</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.instances), {hash:{},data:data}))
    + "</dd>\r\n        </dl>\r\n    </div>\r\n\r\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideExecutionSettings), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    <div class=\"option-group-head expand\" id=\"mesos-constraints\">Constraints</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        <dl class=\"dl-vertical\">\r\n            <dt>Constraints</dt>\r\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.constraints)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(20, program20, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </dl>\r\n    </div>\r\n\r\n    <div class=\"option-group-head expand\" id=\"mesos-health-checks\">Health Checks</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.healthChecks), {hash:{},inverse:self.program(33, program33, data),fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n    </div>\r\n\r\n    <div class=\"option-group-head expand\" id=\"mesos-update-strategy\">Update Strategy</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n        <dl class=\"dl-vertical\">\r\n            <dt>Minimum Health Capacity  </dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.upgradeStrategy)),stack1 == null || stack1 === false ? stack1 : stack1.minimumHealthCapacity), {hash:{},data:data}))
    + "</dd>\r\n            <dt>Maximum Over Capacity</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.upgradeStrategy)),stack1 == null || stack1 === false ? stack1 : stack1.maximumOverCapacity), {hash:{},data:data}))
    + "</dd>\r\n        </dl>\r\n    </div>\r\n\r\n    <div class=\"option-group-head expand\" id=\"mesos-advanced-details  \">Advanced Details</div>\r\n    <div class=\"option-group\" data-bind=\"true\">\r\n\r\n        <dl class=\"dl-vertical\">\r\n            <dt>Deployments</dt>\r\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.deployments), {hash:{},inverse:self.program(12, program12, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n            <dt>Backoff Seconds</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.backoffSeconds), {hash:{},data:data}))
    + "</dd>\r\n\r\n            <dt>Backoff Factor</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.backoffFactor), {hash:{},data:data}))
    + "</dd>\r\n\r\n\r\n            <dt>Max Launch Delay Seconds</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.maxLaunchDelaySeconds), {hash:{},data:data}))
    + "</dd>\r\n\r\n\r\n            <dt>Tasks Running</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.tasksRunning), {hash:{},data:data}))
    + "</dd>\r\n\r\n\r\n            <dt>Tasks Staged</dt>\r\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.tasksStaged), {hash:{},data:data}))
    + "</dd>\r\n\r\n        </dl>\r\n    </div>\r\n\r\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });