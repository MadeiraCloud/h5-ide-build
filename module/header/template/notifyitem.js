define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "unread";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <i class=\"icon-error\"></i>\n      <div class=\"content\"><span class=\"resource-name-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> failed to "
    + escapeExpression(((stack1 = (depth0 && depth0.operation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " in "
    + escapeExpression(((stack1 = (depth0 && depth0.region_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <i class=\"icon-pending\"></i>\n      <div class=\"content\">Sending request to "
    + escapeExpression(((stack1 = (depth0 && depth0.operation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"resource-name-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> in "
    + escapeExpression(((stack1 = (depth0 && depth0.region_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <i class=\"icon-pending\"></i>\n      <div class=\"content\">Processing request to "
    + escapeExpression(((stack1 = (depth0 && depth0.operation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"resource-name-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> in "
    + escapeExpression(((stack1 = (depth0 && depth0.region_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <i class=\"icon-success\"></i>\n      <div class=\"content\"><span class=\"resource-name-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span>"
    + escapeExpression(((stack1 = (depth0 && depth0.operation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " successfully in "
    + escapeExpression(((stack1 = (depth0 && depth0.region_label)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n    ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"notification-details\">"
    + escapeExpression(((stack1 = (depth0 && depth0.error)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  ";
  return buffer;
  }

  buffer += "<li class=\"notification-item ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.is_readed), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  <div class=\"notification-message\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_request), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_process), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_complete), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"notification-duration left\">"
    + escapeExpression(((stack1 = (depth0 && depth0.duration)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  <div class=\"timestamp\">"
    + escapeExpression(((stack1 = (depth0 && depth0.time_str)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</li>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });