define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "selected";
  }

function program3(depth0,data) {
  
  
  return "hide";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"multi-ipt-row\">\n                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input\" placeholder=\"0\" type=\"text\" data-name=\"hostPort\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.hostPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" required/>\n                    <input class=\"input\" placeholder=\"80/tcp\" type=\"text\" data-name=\"container\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.containerPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" required/>\n                    <input class=\"input\" placeholder=\"80\" type=\"text\" data-name=\"servicePort\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.servicePort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" required/>\n                </span>\n            </div>\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"multi-ipt-row\">\n                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input\" placeholder=\"/host/path\" type=\"text\" data-name=\"hostPath\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.hostPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"required/>\n                    <input class=\"input\" placeholder=\"/mount/point:ro\" type=\"text\" data-name=\"containerPath\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.containerPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":"
    + escapeExpression(((stack1 = (depth0 && depth0.mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" required/>\n                </span>\n            </div>\n            ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"multi-ipt-row\">\n                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input\" type=\"text\" data-name=\"key\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" required/>\n                    <input class=\"input\" type=\"text\" data-name=\"value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" required/>\n                </span>\n            </div>\n            ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<div class=\"container\">\n    <div class=\"input-item\">\n        <label class=\"left\">Image</label>\n        <input class=\"input\" name=\"image\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" required disabled>\n    </div>\n    <div class=\"input-item\">\n        <label class=\"left\">Network</label>\n        <select name=\"network\" class=\"select3\">\n            <option value=\"BRIDGE\" ";
  stack1 = helpers.ifCond.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.network), "BRIDGE", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">BRIDGE</option>\n            <option value=\"HOST\" ";
  stack1 = helpers.ifCond.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.network), "HOST", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">HOST</option>\n        </select>\n    </div>\n    <div class=\"input-item port-mappings\">\n        <label class=\"left\">Port Mappings <a href=\"#\" class=\"icon-add\" id=\"add-item-outside\"></a></label>\n        <div class=\"titles ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.portMappings), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <span>Host</span><span>Container</span><span>Service Port</span>\n        </div>\n        <div class=\"multi-input\">\n            <div class=\"multi-ipt-row template\">\n                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input\" placeholder=\"0\" type=\"text\" data-name=\"hostPort\" required/>\n                    <input class=\"input\" placeholder=\"80/tcp\" type=\"text\" data-name=\"container\" required/>\n                    <input class=\"input\" placeholder=\"80\" type=\"text\" data-name=\"servicePort\" required/>\n                </span>\n            </div>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.portMappings), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"input-item volumes\">\n        <label class=\"left\">Volumes <a href=\"#\" class=\"icon-add\" id=\"add-item-outside\"></a></label>\n        <div class=\"titles ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <span>Host Path</span><span>Container Path</span>\n        </div>\n        <div class=\"multi-input\">\n            <div class=\"multi-ipt-row template\">\n                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input\" placeholder=\"/host/path\" type=\"text\" data-name=\"hostPath\" required/>\n                    <input class=\"input\" placeholder=\"/mount/point:ro\" type=\"text\" data-name=\"containerPath\" required/>\n                </span>\n            </div>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"input-item parameters\">\n        <label class=\"left\">Parameters <a href=\"#\" class=\"icon-add\" id=\"add-item-outside\"></a></label>\n        <div class=\"titles ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.parameters), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <span>Key</span><span>Value</span>\n        </div>\n        <div class=\"multi-input\">\n            <div class=\"multi-ipt-row template\">\n                <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                <span class=\"ipt-wrapper\">\n                    <input class=\"input\" type=\"text\" data-name=\"key\" required/>\n                    <input class=\"input\" type=\"text\" data-name=\"value\" required/>\n                </span>\n            </div>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.parameters), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </div>\n\n    <div class=\"input-item privileged\">\n        <div class=\"checkbox\">\n            <input type=\"checkbox\" id=\"cb-privileged\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.privileged), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <label for=\"cb-privileged\"></label>\n        </div>\n        <label for=\"cb-privileged\">Privileged</label>\n    </div>\n\n\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });