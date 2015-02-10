define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.appId), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "<option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "hide";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"group\">\n        <div class=\"main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n    </section>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"option-group-head expand\">\n    Router Detail\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Router Name</label>\n        <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required os-property-router-extnetwork\">\n        <label class=\"name\">External Network</label>\n        <select data-target=\"extNetworkId\" class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.extNetworkId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <option value=\"none\">Disable Public Network</option>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.extnetworks), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </select>\n    </section>\n    <section class=\"group required os-property-router-nat ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.extNetworkId), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <label class=\"name\">Enable NAT</label>\n        <select data-target=\"nat\" class=\"selection bool\" value=\"true\" disabled></select>\n    </section>\n    <!-- <section class=\"group required\">\n        <label class=\"name\">Total Bandwidth</label>\n        <select data-target=\"totalBandwidth\" class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.totalBandwidth)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <option value=\"1\">1</option>\n            <option value=\"2\">2</option>\n            <option value=\"3\">3</option>\n            <option value=\"4\">4</option>\n            <option value=\"5\">5</option>\n            <option value=\"6\">6</option>\n            <option value=\"7\">7</option>\n            <option value=\"8\">8</option>\n            <option value=\"9\">9</option>\n            <option value=\"10\">10</option>\n        </select>\n    </section> -->\n</div>\n<div class=\"option-group-head expand\">\n    Connected Subnet\n</div>\n<div class=\"option-group\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subnets), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.stackTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "true";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

  buffer += "<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n        <dt>Enable NAT</dt><dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.external_gateway_info)),stack1 == null || stack1 === false ? stack1 : stack1.enable_snat), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.appTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });