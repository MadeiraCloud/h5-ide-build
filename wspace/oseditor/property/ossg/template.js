define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.defaultSG), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  
  return "<div class=\"os-sg-remove icon-delete bubble-popup tooltip\" data-tooltip=\"Delete Security Group\"></div>";
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"group\">\n        <dl class=\"dl-vertical\">\n            <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n            <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n            <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n        </dl>\n    </section>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"group required\">\n        <label class=\"name\">Name</label>\n        <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultSG), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Description</label>\n        <input data-target=\"description\" class=\"selection string\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "disabled";
  }

function program9(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"rule-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <select data-target=\"protocol\" class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        <option value=\"tcp\">TCP</option>\n                        <option value=\"udp\">UDP</option>\n                        <option value=\"icmp\">ICMP</option>\n                        <option value=\"all\">All</option>\n                    </select>\n                    <input class=\"selection\" data-target=\"port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "all", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tip=\"Input single port, port range or port range.\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    <select data-target=\"ip\" data-button-tpl=\"ipTipTpl\" class=\"selection option\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgId), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-valid-handle=\"ipValid\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        <option value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgId), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                    </select>\n                    ";
  stack1 = helpers.unless.call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                ";
  return buffer;
  }
function program10(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.sgId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program12(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program14(depth0,data) {
  
  
  return "<div class=\"rule-item-remove icon-delete tooltip\" data-tooltip=\"Delete Rule\"></div>";
  }

function program16(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                <div class=\"rule-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    <select data-target=\"protocol\" class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        <option value=\"tcp\">TCP</option>\n                        <option value=\"udp\">UDP</option>\n                        <option value=\"icmp\">ICMP</option>\n                        <option value=\"all\">All</option>\n                    </select>\n                    <input class=\"selection\" data-target=\"port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "all", {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tip=\"Input single port, port range or a common protocol\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    <select data-target=\"ip\" data-button-tpl=\"ipTipTpl\" class=\"selection option\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgId), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-valid-handle=\"ipValid\" ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        <option value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgId), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                    </select>\n                    ";
  stack1 = helpers.unless.call(depth0, (depth1 && depth1.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"member-item\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n        ";
  return buffer;
  }

  buffer += "<h1 class=\"title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.modeIsApp), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"option-group-head expand\">\n    Security Group\n</div>\n<div class=\"option-group\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsApp), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n<div class=\"option-group-head expand\">Rule (<span class=\"sg-rule-count\"></span>)</div>\n<div class=\"direction-switch btn-group\">\n    <button class=\"icon-unknown t-m-btn ingress active\">Ingress (<span class=\"sg-ingress-count\"></span>)</button>\n    <button class=\"icon-unknown t-m-btn egress\">Egress (<span class=\"sg-egress-count\"></span>)</button>\n\n    <div class=\"os-sg-rule-list-container\">\n        <div class=\"rule-container ingress\">\n            <ul class=\"head-list clearfix\">\n                <li class=\"head\">Protocol</li>\n                <li class=\"head\">Port/Code</li>\n                <li class=\"head\">Source</li>\n            </ul>\n            <div class=\"rule-list ingress clearfix\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ingressRules), {hash:{},inverse:self.noop,fn:self.programWithDepth(9, program9, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n        <div class=\"rule-container egress hide\">\n            <ul class=\"head-list clearfix\">\n                <li class=\"head\">Protocol</li>\n                <li class=\"head\">Port/Code</li>\n                <li class=\"head\">Target</li>\n            </ul>\n            <div class=\"rule-list egress clearfix\">\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.egressRules), {hash:{},inverse:self.noop,fn:self.programWithDepth(16, program16, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"option-group-head expand\">\n    Member (<span class=\"sg-member-count\"></span>)\n</div>\n<div class=\"option-group\">\n    <ul class=\"os-sg-member-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.memberList), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"rule-item\">\n    <select data-target=\"protocol\" class=\"selection option\" value=\"\" >\n        <option value=\"tcp\">TCP</option>\n        <option value=\"udp\">UDP</option>\n        <option value=\"icmp\">ICMP</option>\n        <option value=\"all\">All</option>\n    </select>\n    <input class=\"selection\" data-target=\"port\" value=\"\" data-tip=\"Input single port, port range or a common protocol\" />\n    <select data-target=\"ip\" class=\"selection option\" data-button-tpl=\"ipTipTpl\" value=\"\" data-valid-handle=\"ipValid\" ></select>\n    <div class=\"rule-item-remove icon-delete tooltip\" data-tooltip=\"Delete Rule\"></div>\n</div>";
  };
TEMPLATE.newItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"info\">Confirm to delete this security group?</div>\n<div class=\"operate\">\n    <button class=\"confirm btn btn-red\">Delete</li>\n    <button class=\"cancel btn btn-silver\">Cancel</li>\n</div>";
  };
TEMPLATE.sgRemovePopup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<input class=\"input os-sg-new-input\" placeholder=\"Add new rule...\" />";
  };
TEMPLATE.sgNewInput=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"os-sg-rule-ip-tip\"><i class=\"icon-info\"></i>Input CIDR / Security Group</div>";
  };
TEMPLATE.sgIPInputTip=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });