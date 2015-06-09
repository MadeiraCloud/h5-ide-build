define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n<dl class=\"dl-vertical\">ID<dt></dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    Status<dt></dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    <dt>Subnet ID</dt><dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\r\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "disabled";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n    <header>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.osport)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</header>\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Weight</label>\r\n        <input data-id=\"mem-weight\" data-index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"weight\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.weight)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n    </section>\r\n\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Protocol Port</label>\r\n        <input data-id=\"mem-port\" data-target=\"port\" data-index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n    </section>\r\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\r\n    <div class=\"os-property-message\">\r\n        <h5>No Member</h5>\r\n        Connect Pool with Port or Server to register as Member\r\n    </div>\r\n    ";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n<div class=\"option-group-head expand\">\r\n    Pool\r\n</div>\r\n<div class=\"option-group pool-details\">\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Name</label>\r\n        <input data-id=\"pool-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n    </section>\r\n\r\n    <section class=\"group\">\r\n        <label class=\"name\">Description</label>\r\n        <input data-target=\"description\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n    </section>\r\n\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Protocol</label>\r\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"protocol\" data-id=\"pool-protocol\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n            <option value='HTTP'>HTTP</option>\r\n            <option value='HTTPS'>HTTPS</option>\r\n            <option value='TCP'>TCP</option>\r\n        </select>\r\n    </section>\r\n\r\n    <section class=\"group required\">\r\n        <label class=\"name\">Load Balancing Method</label>\r\n        <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"method\" data-id=\"listener-method\">\r\n            <option value='ROUND_ROBIN'>Round Robin</option>\r\n            <option value='LEAST_CONNECTIONS'>Least Connections</option>\r\n            <option value='SOURCE_IP'>Source IP</option>\r\n        </select>\r\n    </section>\r\n</div>\r\n\r\n<div class=\"option-group-head expand\">\r\n    Member("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.mems)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\r\n</div>\r\n<div class=\"option-group\" data-model=\"mem\">\r\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.mems), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });