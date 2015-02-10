define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CONNECTION_ATTACHMENT_OF", ((stack1 = (depth0 && depth0.eniAsso)),stack1 == null || stack1 === false ? stack1 : stack1.instance), ((stack1 = (depth0 && depth0.eniAsso)),stack1 == null || stack1 === false ? stack1 : stack1.eni), {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subnetAsso), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CONNECTION_SUBNET_ASSO_PLACEMENT", ((stack1 = (depth0 && depth0.subnetAsso)),stack1 == null || stack1 === false ? stack1 : stack1.subnet), ((stack1 = (depth0 && depth0.subnetAsso)),stack1 == null || stack1 === false ? stack1 : stack1.elb), {hash:{},data:data}))
    + "</div>\n  ";
  return buffer;
  }

  buffer += "<article>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eniAsso), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });