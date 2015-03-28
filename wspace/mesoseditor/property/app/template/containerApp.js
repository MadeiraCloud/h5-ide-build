define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "true";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <table class=\"table\">\n                  <tr>\n                        <th>Host</th>\n                        <th>Container</th>\n                        <th>Service Port</th>\n                  </tr>\n                  ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.portMappings), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </table>\n            ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <tr>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.hostPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.containerPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.servicePort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  </tr>\n                  ";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "\n            -\n            ";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <table class=\"table\">\n                  <tr>\n                        <th>Host Path</th>\n                        <th>Container Path</th>\n                  </tr>\n                  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </table>\n            ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <tr>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.hostPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.containerPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":"
    + escapeExpression(((stack1 = (depth0 && depth0.mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  </tr>\n                  ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <table class=\"table\">\n                  <tr>\n                        <th>Key</th>\n                        <th>Value</th>\n                  </tr>\n                  ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.parameters), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </table>\n            ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                  <tr>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  </tr>\n                  ";
  return buffer;
  }

  buffer += "<dl class=\"dl-vertical container-app\">\n      <dt>Image</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>Network</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.network)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>Privileged</dt>\n      <dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.privileged), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n      <dt>Port Mappings</dt>\n      <dd>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.portMappings)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dd>\n\n      <dt>Volumes</dt>\n      <dd>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volumes)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(8, program8, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dd>\n\n      <dt>Volumes</dt>\n      <dd>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.docker)),stack1 == null || stack1 === false ? stack1 : stack1.parameters)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(8, program8, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dd>\n</dl>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });