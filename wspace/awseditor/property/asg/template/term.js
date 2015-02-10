define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"checkbox\">\n                <input id=\"property-asg-term"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                <label for=\"property-asg-term"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n            </div>\n            <label for=\"property-asg-term"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"list-name\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"drag-handle tooltip icon-sort\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_MSG_DRAG", {hash:{},data:data}))
    + "\"></span>\n            </li>\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"enabled\" ";
  }

function program4(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

  buffer += "<div id=\"property-asg-term\">\n    <p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASG_TERMINATION_TEXT_WARN", {hash:{},data:data}))
    + "</p>\n    <div class=\"drag-sort-list-wrap\">\n        <ul class=\"drag-sort-list\" id=\"property-term-list\">\n            ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n        <ul class=\"drag-sort-list\">\n            <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useDefault), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"checkbox\">\n                <input id=\"property-asg-term-def\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useDefault), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                <label for=\"property-asg-term-def\"></label>\n            </div>\n            <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DEFAULT", {hash:{},data:data}))
    + "</span>\n            </li>\n        </ul>\n    </div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });