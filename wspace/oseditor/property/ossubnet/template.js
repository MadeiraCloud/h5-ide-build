define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Gateway IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.gateway_ip), {hash:{},data:data}))
    + "</dd>\n        <dt>DNS Name Server</dt>\n        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.dns_nameservers), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n</section>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, depth0, {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "disabled";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n        ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<section class=\"group required\" data-bind=\"true\">\n    <label class=\"name\">Subnet Name</label>\n    <input class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"name\" data-required-rollback=\"true\" data-ignore=\"true\" />\n</section>\n<section class=\"group required\">\n    <label class=\"name\">Cidr</label>\n    <input class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"cidr\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n</section>\n<section class=\"group\">\n    <label class=\"name\">DNS Nameservers</label>\n    <select data-target=\"iplist\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.modeIsStack), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"selection option mutil show-input item-list\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.nameServerList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-button-tpl=\"button\" data-option-tpl=\"sgOption\" data-item-tpl=\"sgItem\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.nameServers), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n</section>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item\">\n    <span class=\"item-name\" data-value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"item-remove icon-del\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"option\">\n    <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.option=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>Add <span class=\"default\">by inputing IP Address...</span><span class=\"new\"></span></div>";
  };
TEMPLATE.addButton=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "true";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.dns_nameservers), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, depth0, {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "-";
  }

  buffer += "<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        <dt>CIDR</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.cidr), {hash:{},data:data}))
    + "</dd>\n        <dt>Gateway IP</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.gateway_ip), {hash:{},data:data}))
    + "</dd>\n        <dt>Enable DHCP</dt><dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enable_dhcp), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n        <dt>DNS Name Server</dt>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dns_nameservers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });