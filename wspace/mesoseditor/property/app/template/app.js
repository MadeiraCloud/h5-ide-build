define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, depth0, (depth0 && depth0.version), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-group-head expand\" id=\"mesos-execution-settings\">Execution Settings</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <dl class=\"dl-vertical\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isCommand), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <dt>Environment</dt>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.env), {hash:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <dt>Ports</dt>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ports)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(12, program12, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <dt>Executor</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.executor), {hash:{},data:data}))
    + "</dd>\n            <dt>URIs</dt>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.uris)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(20, program20, data),fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </dl>\n    </div>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<dt>Command</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.command), {hash:{},data:data}))
    + "</dd>\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <dt>Command</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.command), {hash:{},data:data}))
    + "</dd>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.env), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dd>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            ";
  return buffer;
  }

function program12(depth0,data) {
  
  
  return "\n            <dd>-</dd>\n            ";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ports), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
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
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.uris), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, depth0, {hash:{},data:data}))
    + "</dd>\n            ";
  return buffer;
  }

function program20(depth0,data) {
  
  
  return "\n                <dd>-</dd>\n            ";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.constraints), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dd>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            ";
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
  buffer += "\n        <dl class=\"dl-vertical mesos-health-check-li\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.protocol), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.path), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.portIndex), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n            <dt>Grace Period Seconds</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.gracePeriodSeconds), {hash:{},data:data}))
    + "</dd>\n\n            <dt>Interval Seconds</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.intervalSeconds), {hash:{},data:data}))
    + "</dd>\n\n            <dt>Timeout Seconds</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.timeoutSeconds), {hash:{},data:data}))
    + "</dd>\n\n            <dt>Max Consecutive Failures</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.maxConsecutiveFailures), {hash:{},data:data}))
    + "</dd>\n        </dl>\n        ";
  return buffer;
  }
function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <dt>Protocol</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.protocol), {hash:{},data:data}))
    + "</dd>\n            ";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <dt>Path</dt>\n                <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.path), {hash:{},data:data}))
    + "</dd>\n            ";
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <dt>Port Index</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.portIndex), {hash:{},data:data}))
    + "</dd>\n            ";
  return buffer;
  }

function program33(depth0,data) {
  
  
  return "\n        <dl class=\"dl-vertical\">\n            <dt>Health Checks</dt>\n            <dd>-</dd>\n        </dl>\n        ";
  }

function program35(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <dd>id: "
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n            ";
  return buffer;
  }

  buffer += "<article>\n    <div class=\"option-group-head expand\" id=\"mesos-switch-versions\">Switch Versions</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\">Switch Version</label>\n            <div class=\"selectbox mesos-switch-versions\">\n                <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.version)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                <ul class=\"dropdown\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.versions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </section>\n        <dl class=\"dl-vertical\">\n            <dt>Tasks</dt>\n            <dd><a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.task)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">Task Details</a></dd>\n        </dl>\n    </div>\n    <div class=\"option-group-head expand\" id=\"mesos-container-settings\">Container Setting</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <section class=\"clearfix\">\n            <button class=\"open-container btn-blue btn\">Container Setting</button>\n        </section>\n    </div>\n    <div class=\"option-group-head expand\" id=\"mesos-basic-settings\">Basic Settings</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <dl class=\"dl-vertical\">\n            <dt>ID</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n            <dt>CPUs</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.cpus), {hash:{},data:data}))
    + "</dd>\n            <dt>Memory</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.mem), {hash:{},data:data}))
    + "</dd>\n            <dt>Instances</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.instances), {hash:{},data:data}))
    + "</dd>\n        </dl>\n    </div>\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideExecutionSettings), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div class=\"option-group-head expand\" id=\"mesos-constraints\">Constraints</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <dl class=\"dl-vertical\">\n            <dt>Constraints</dt>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.constraints)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(20, program20, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </dl>\n    </div>\n\n    <div class=\"option-group-head expand\" id=\"mesos-health-checks\">Health Checks</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.healthChecks), {hash:{},inverse:self.program(33, program33, data),fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n\n    <div class=\"option-group-head expand\" id=\"mesos-update-strategy\">Update Strategy</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <dl class=\"dl-vertical\">\n            <dt>Minimum Health Capacity  </dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.upgradeStrategy)),stack1 == null || stack1 === false ? stack1 : stack1.minimumHealthCapacity), {hash:{},data:data}))
    + "</dd>\n            <dt>Maximum Over Capacity</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.upgradeStrategy)),stack1 == null || stack1 === false ? stack1 : stack1.maximumOverCapacity), {hash:{},data:data}))
    + "</dd>\n        </dl>\n    </div>\n\n    <div class=\"option-group-head expand\" id=\"mesos-advanced-details  \">Advanced Details</div>\n    <div class=\"option-group\" data-bind=\"true\">\n\n        <dl class=\"dl-vertical\">\n            <dt>Deployments</dt>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.deployments), {hash:{},inverse:self.program(12, program12, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <dt>Backoff Seconds</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.backoffSeconds), {hash:{},data:data}))
    + "</dd>\n\n            <dt>Backoff Factor</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.backoffFactor), {hash:{},data:data}))
    + "</dd>\n\n\n            <dt>Max Launch Delay Seconds</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.maxLaunchDelaySeconds), {hash:{},data:data}))
    + "</dd>\n\n\n            <dt>Tasks Running</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.tasksRunning), {hash:{},data:data}))
    + "</dd>\n\n\n            <dt>Tasks Staged</dt>\n            <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.tasksStaged), {hash:{},data:data}))
    + "</dd>\n\n        </dl>\n    </div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });