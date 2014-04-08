define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "no-item";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						";
  stack1 = ((stack1 = (depth0 && depth0.info)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n\r\n				";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title empty\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						Good job! No error here.\r\n					</div>\r\n				";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						";
  stack1 = ((stack1 = (depth0 && depth0.info)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n				";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title empty\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						Good job! No warning here.\r\n					</div>\r\n				";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title empty\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						Good job! No notice here.\r\n					</div>\r\n				";
  return buffer;
  }

  buffer += "<div class=\"validation-content\">\r\n	<ul class=\"tab\">\r\n		<li class=\"active ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.error_list)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tab-target=\"#item-error\">Error<span class=\"validation-counter validation-counter-error\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.error_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\r\n		<li data-tab-target=\"#item-warning\" class=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.warning_list)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Warning<span class=\"validation-counter validation-counter-warning\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.warning_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\r\n		<li data-tab-target=\"#item-notice\" class=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.notice_list)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Notice<span class=\"validation-counter validation-counter-notice\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.notice_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\r\n	</ul>\r\n	<div class=\"scroll-wrap scroll-wrap-validation\">\r\n		<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n		<div class=\"content_wrap scroll-content\">\r\n\r\n			<div id=\"item-error\" class=\"content active\">\r\n\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.error_list), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n				<div class=\"item-error-tip\"><i class=\"icon-info\"></i>Some error validation only happens at the time to run stack.</div>\r\n\r\n			</div>\r\n			<div id=\"item-warning\" class=\"content\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.warning_list), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n			<div id=\"item-notice\" class=\"content\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notice_list), {hash:{},inverse:self.program(11, program11, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });