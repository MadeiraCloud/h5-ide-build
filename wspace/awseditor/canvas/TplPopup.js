define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<header class=\"volume-pph\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_POP_ATTACHED_VOLUMES", {hash:{},data:data}))
    + " <span>("
    + escapeExpression(((stack1 = (depth0 && depth0.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\n<ul class=\"popup-content popup-volume\">\n\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshot), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <div class=\"vpp-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"vpp-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "vpp-snapshot";
  }

function program5(depth0,data) {
  
  
  return "vpp-volume";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status res-state tooltip "
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"volume-pp-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_POP_NO_ATTACHED_VOLUME", {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.length), {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.volume=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"popup-content popup-instance\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"vpp-instance\">\n    <i class=\"vpp-ins-state tooltip status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n    <img src=\"/assets/images/"
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" width=\"39\" height=\"27\">\n    <div class=\"vpp-ins-vol\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"vpp-ins-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div></li>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"instance-pp-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_POP_NO_INSTANCES", {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  buffer += "<header class=\"instance-pph\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"instance-pph-close\">×</span></header>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.items)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.instance=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"popup-content popup-instance\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"vpp-instance vpp-eni\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eip), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"vpp-eip tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.eip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"instance-pp-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_POP_NO_NETWORK_INTERFACE", {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  buffer += "<header class=\"instance-pph\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"instance-pph-close\">×</span></header>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.items)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.eni=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });