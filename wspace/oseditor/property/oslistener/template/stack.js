define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <dl class=\"dl-vertical\"><dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Subnet ID</dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\r\n";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "disabled";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<div class=\"option-group-head expand\">\r\n    Listener Details\r\n</div>\r\n<div class=\"option-group\" data-model=\"listener\">\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Name</label>\r\n        <input data-id=\"listener-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n    </section>\r\n\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Connection Limit</label>\r\n        <input data-id=\"listener-limit\" data-target=\"limit\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.limit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n    </section>\r\n\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Protocol</label>\r\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"protocol\" data-id=\"listener-protocol\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n            <option value='HTTP'>HTTP</option>\r\n            <option value='HTTPS'>HTTPS</option>\r\n            <option value='TCP'>TCP</option>\r\n        </select>\r\n    </section>\r\n\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Protocol Port</label>\r\n        <input data-id=\"listener-port\" data-target=\"port\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\r\n    </section>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });