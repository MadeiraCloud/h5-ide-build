define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "App";
  }

function program3(depth0,data) {
  
  
  return "Stack";
  }

  buffer += "<section class=\"group required\">\n    <label class=\"name\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " Name</label>\n    <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group\">\n    <label class=\"name\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " Description</label>\n    <input data-target=\"description\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group\">\n    <dl class=\"dl-horizontal\">\n        <dt>Platform</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.platform)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>Region</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });