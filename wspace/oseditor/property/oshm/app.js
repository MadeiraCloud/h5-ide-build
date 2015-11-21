define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <dt>URL Path</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.url_path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n        <dt>Expected Codes</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.expected_codes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd></dl>\r\n    ";
  return buffer;
  }

  buffer += "<h1 class=\"title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\r\n<section class=\"group\">\r\n    <dl class=\"dl-vertical\">\r\n        <dt>Name</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Type</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Delay</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.delay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Timeout</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.timeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Max Retries</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.max_retries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.url_path), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.expected_codes), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });