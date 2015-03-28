define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return " selected";
  }

function program3(depth0,data) {
  
  
  return "hide";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.args), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                            <div class=\"multi-ipt-row\">\n                                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                                <span class=\"ipt-wrapper\">\n                                    <input class=\"input\" placeholder=\"\" type=\"text\" data-name=\"argument\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"/>\n                                </span>\n                            </div>\n                            ";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "\n                            <div class=\"multi-ipt-row\">\n                                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-add\"></a></span>\n                                <span class=\"ipt-wrapper\">\n                                    <input class=\"input\" placeholder=\"\" type=\"text\" data-name=\"argument\"/>\n                                </span>\n                            </div>\n                        ";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"multi-input mesos-envs\">\n                <div class=\"multi-ipt-row\">\n                    <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input mesos-env-key update-tooltip tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                    <input class=\"input mesos-env-value update-tooltip tooltip\" type=\"text\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" data-tooltip=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"/>\n                </span>\n                </div>\n            </div>\n            ";
  return buffer;
  }

function program12(depth0,data) {
  
  
  return "\n            <div class=\"multi-input mesos-envs\">\n                <div class=\"multi-ipt-row\">\n                    <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input mesos-env-key update-tooltip tooltip\" type=\"text\" value=\"\" data-tooltip=\"\"/>\n                    <input class=\"input mesos-env-value update-tooltip tooltip\" type=\"text\" value=\"\" data-tooltip=\"\"/>\n                </span>\n                </div>\n            </div>\n            ";
  }

function program14(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"multi-input mesos-ports\">\n                <div class=\"multi-ipt-row\">\n                    <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input mesos-port\" type=\"text\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"/>\n                </span>\n                </div>\n            </div>\n            ";
  return buffer;
  }

function program16(depth0,data) {
  
  
  return "\n            <div class=\"multi-input mesos-ports\">\n                <div class=\"multi-ipt-row\">\n                    <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input mesos-port\" type=\"text\" value=\"\"/>\n                </span>\n                </div>\n            </div>\n            ";
  }

function program18(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"multi-input mesos-uris\">\n                <div class=\"multi-ipt-row\">\n                    <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input mesos-uri update-tooltip tooltip\" type=\"text\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" data-tooltip=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"/>\n                </span>\n                </div>\n            </div>\n            ";
  return buffer;
  }

function program20(depth0,data) {
  
  
  return "\n            <div class=\"multi-input mesos-uris\">\n                <div class=\"multi-ipt-row\">\n                    <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input mesos-uri update-tooltip tooltip\" type=\"text\" value=\"\" data-tooltip=\"\"/>\n                </span>\n                </div>\n            </div>\n            ";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\">\n                            ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </span>\n                    </div>\n                ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.ifCond.call(depth0, (data == null || data === false ? data : data.index), 0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  stack1 = helpers.ifCond.call(depth0, (data == null || data === false ? data : data.index), 1, {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                ";
  stack1 = helpers.ifCond.call(depth0, (data == null || data === false ? data : data.index), 2, {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                    <input class=\"input mesos-constraints-attribute update-tooltip tooltip\" placeholder=\"attribute\" type=\"text\" data-name=\"argument\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" data-tooltip=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"/>\n                                ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                    <select class=\"select3 select mesos-constraints-operator\" name=\"operators\">\n                                        <option value=\"UNIQUE\"   ";
  stack1 = helpers.ifCond.call(depth0, depth0, "UNIQUE", {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">UNIQUE</option>\n                                        <option value=\"CLUSTER\"  ";
  stack1 = helpers.ifCond.call(depth0, depth0, "CLUSTER", {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">CLUSTER</option>\n                                        <option value=\"GROUP_BY\" ";
  stack1 = helpers.ifCond.call(depth0, depth0, "GROUP_BY", {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">GROUP_BY</option>\n                                        <option value=\"LIKE\"     ";
  stack1 = helpers.ifCond.call(depth0, depth0, "LIKE", {hash:{},inverse:self.noop,fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">LIKE</option>\n                                        <option value=\"UNLIKE\"   ";
  stack1 = helpers.ifCond.call(depth0, depth0, "UNLIKE", {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">UNLIKE</option>\n                                    </select>\n                                ";
  return buffer;
  }
function program27(depth0,data) {
  
  
  return "  selected=\"selected\"";
  }

function program29(depth0,data) {
  
  
  return " selected=\"selected\"";
  }

function program31(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program33(depth0,data) {
  
  
  return "    selected=\"selected\"";
  }

function program35(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                    <input class=\"input mesos-constraints-value update-tooltip tooltip\" placeholder=\"value\" type=\"text\" data-name=\"argument\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" data-tooltip=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"/>\n                                ";
  return buffer;
  }

function program37(depth0,data) {
  
  
  return "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                            <span class=\"ipt-wrapper\">\n                                <input class=\"input mesos-constraints-attribute update-tooltip tooltip\" placeholder=\"attribute\" type=\"text\" data-name=\"argument\" value=\"\" data-tooltip=\"\"/>\n                                <select class=\"select3 select mesos-constraints-operator\" name=\"operators\">\n                                    <option value=\"UNIQUE\">UNIQUE</option>\n                                    <option value=\"CLUSTER\">CLUSTER</option>\n                                    <option value=\"GROUP_BY\">GROUP_BY</option>\n                                    <option value=\"LIKE\">LIKE</option>\n                                    <option value=\"UNLIKE\">UNLIKE</option>\n                                </select>\n                                <input class=\"input mesos-constraints-value update-tooltip tooltip\" placeholder=\"value\" type=\"text\" data-name=\"argument\" value=\"\" data-tooltip=\"\"/>\n                            </span>\n                    </div>\n                ";
  }

function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"elb-property-listener\">\n                <div class=\"mesos-health-check-item-remove icon-remove tooltip\" data-tooltip=\"remove health check\"></div>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Protocol</label>\n                    <div class=\"selectbox mesos-health-check-protocol\">\n                        <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        <ul class=\"dropdown\">\n                            <li data-id=\"HTTP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTP</li>\n                            <li data-id=\"TCP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">TCP</li>\n                            <li data-id=\"COMMAND\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "COMMAND", {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">COMMAND</li>\n                        </ul>\n                    </div>\n                </section>\n                <section class=\"property-control-group health-check-option health-check-path clearfix\">\n                    <label class=\"left\">Path</label>\n                    <input class=\"input mesos-health-check-path tooltip parsley-validated\" type=\"text\" placeholder=\"/api/haelth\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"path\">\n                </section>\n                <section class=\"property-control-group health-check-option hide health-check-command clearfix\">\n                    <label class=\"left\">Command</label>\n                    <input class=\"input mesos-health-check-command tooltip parsley-validated\" type=\"text\" placeholder=\"\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.command)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"command\">\n                </section>\n                <section class=\"property-control-group health-check-option health-check-port-index clearfix\">\n                    <label class=\"left\">Port Index</label>\n                    <input class=\"input mesos-health-check-port-index tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.portIndex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"portIndex\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Grace Period Seconds</label>\n                    <input class=\"input mesos-health-check-grace-period tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.gracePeriodSeconds)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"gracePeriodSeconds\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Interval Seconds</label>\n                    <input class=\"input mesos-health-check-interval tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.intervalSeconds)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"intervalSeconds\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Timeout Seconds</label>\n                    <input class=\"input mesos-health-check-timeout tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.timeoutSeconds)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"timeoutSeconds\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Max Consecutive Failures</label>\n                    <input class=\"input mesos-health-check-max-fail tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxConsecutiveFailures)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"maxConsecutiveFailures\"/>\n                </section>\n            </li>\n            ";
  return buffer;
  }
function program40(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<article>\n    <section class=\"clearfix\">\n        <button class=\"open-container btn-blue btn\">Container Setting</button>\n    </section>\n    <div class=\"option-group-head expand\" id=\"mesos-basic-settings\">Basic Settings</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\" for=\"property-mesos-name\">ID</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n            <input class=\"input mesos-name\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"name\" id=\"property-mesos-name\" maxlength=\"255\" data-required-rollback=\"true\"/>\n        </section>\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n            <textarea id=\"property-res-desc\" data-type=\"ascii\" data-bind=\"desc\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n        </section>\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label for=\"property-mesos-cups\">CPUs</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n            <input class=\"input mesos-cpus\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cpus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-mesos-cups\" data-bind=\"cpus\" data-required-rollback=\"true\"/>\n        </section>\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\" for=\"property-mesos-memory\">Memory (MB)</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n            <input class=\"input mesos-mem\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-mesos-memory\" data-bind=\"mem\" data-required-rollback=\"true\"/>\n        </section>\n        <section class=\"property-control-group clearfix\">\n            <label for=\"property-mesos-instances\">Instances</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n            <input class=\"input mesos-instances\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instances)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-mesos-instances\" data-bind=\"instances\" data-required-rollback=\"true\"/>\n        </section>\n    </div>\n    <div class=\"option-group-head expand\" id=\"mesos-execution-settings\">Execution Settings</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <section class=\"property-control-group\">\n            <div class=\"selectbox selectbox-mega\" id=\"property-execution-setting\">\n                <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.executionType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isCommand), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"default\">Command</li>\n                    <li class=\"item";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isCommand), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"dedicated\">Arguments</li>\n                </ul>\n                <div class=\"selection-command ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isCommand), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <input class=\"input execution-command\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cmd)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                </div>\n                <div class=\"selection-arguments ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isCommand), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                    <div class=\"multi-input\">\n                        <div class=\"multi-ipt-row template\">\n                            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                            <span class=\"ipt-wrapper\">\n                                <input class=\"input\" placeholder=\"argument\" type=\"text\" data-name=\"argument\"/>\n                            </span>\n                        </div>\n                        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.args)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </div>\n            </div>\n        </section>\n        <section class=\"property-control-group\">\n            <label class=\"left\">Environments</label>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.env), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\">Ports</label>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ports), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\">Executor</label>\n            <input class=\"input mesos-executor update-tooltip tooltip parsley-validated\" type=\"text\" placeholder=\"\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.executor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"path\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.executor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </section>\n\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\">URIs</label>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.uris), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n\n\n    </div>\n    <div class=\"option-group-head expand\" id=\"mesos-constraints\">Constraints</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <div class=\"multi-input mesos-constraints\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.constraints), {hash:{},inverse:self.program(37, program37, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </div>\n    </div>\n    <div class=\"option-group-head expand\" id=\"mesos-health-checks\">Health Checks</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <ul id=\"mesos-health-checks-list\" class=\"mega-list-wraper\">\n            <li class=\"elb-property-listener hide template\">\n                <div class=\"mesos-health-check-item-remove icon-remove tooltip\" data-tooltip=\"remove health check\"></div>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Protocol</label>\n                    <div class=\"selectbox mesos-health-check-protocol\">\n                        <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        <ul class=\"dropdown\">\n                            <li data-id=\"HTTP\" class=\"item selected\">HTTP</li>\n                            <li data-id=\"TCP\" class=\"item \">TCP</li>\n                            <li data-id=\"COMMAND\" class=\"item \">Command</li>\n                        </ul>\n                    </div>\n                </section>\n                <section class=\"property-control-group health-check-option health-check-path clearfix\">\n                    <label class=\"left\">Path</label>\n                    <input class=\"input mesos-health-check-path tooltip parsley-validated\" type=\"text\" placeholder=\"/api/haelth\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"path\">\n                </section>\n                <section class=\"property-control-group health-check-option hide health-check-command clearfix\">\n                    <label class=\"left\">Command</label>\n                    <input class=\"input mesos-health-check-command update-tooltip tooltip parsley-validated\" type=\"text\" placeholder=\"\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.command)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"command\" data-tooltip=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.command)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                </section>\n                <section class=\"property-control-group health-check-option health-check-port-index clearfix\">\n                    <label class=\"left\">Port Index</label>\n                    <input class=\"input mesos-health-check-port-index tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.portIndex)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"portIndex\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Grace Period Seconds</label>\n                    <input class=\"input mesos-health-check-grace-period tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.gracePeriodSeconds)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"gracePeriodSeconds\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Interval Seconds</label>\n                    <input class=\"input mesos-health-check-interval tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.intervalSeconds)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"intervalSeconds\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Timeout Seconds</label>\n                    <input class=\"input mesos-health-check-timeout tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.timeoutSeconds)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"timeoutSeconds\"/>\n                </section>\n                <section class=\"property-control-group clearfix\">\n                    <label class=\"left\">Max Consecutive Failures</label>\n                    <input class=\"input mesos-health-check-max-fail tooltip parsley-validated\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxConsecutiveFailures)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bind=\"maxConsecutiveFailures\"/>\n                </section>\n            </li>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.healthChecks), {hash:{},inverse:self.noop,fn:self.program(39, program39, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n        <a href=\"#\" id=\"mesos-add-health-check\" class=\"add-to-list\">Add New Health Checks</a>\n    </div>\n    <div class=\"option-group-head expand\" id=\"mesos-update-strategy\">Update Strategy</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\">Minimum Health Capacity</label>\n            <input class=\"input tooltip parsley-validated mesos-update-min-health-capacity\" type=\"text\" placeholder=\"0.5\" data-bind=\"minimumHealthCapacity\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.upgradeStrategy)),stack1 == null || stack1 === false ? stack1 : stack1.minimumHealthCapacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        </section>\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\">Maximum Over Capacity</label>\n            <input class=\"input tooltip parsley-validated mesos-update-max-over-capacity\" type=\"text\" placeholder=\"0.2\" data-bind=\"maximumOverCapacity\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.upgradeStrategy)),stack1 == null || stack1 === false ? stack1 : stack1.maximumOverCapacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n        </section>\n    </div>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });