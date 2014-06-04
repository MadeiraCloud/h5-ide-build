define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<header id=\"process-title\" class=\"overlay-text\" data-tab-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n			Loading resources...\r\n		</header>\r\n		";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\r\n			<div class=\"loading-spinner\"></div>\r\n			";
  }

function program5(depth0,data) {
  
  
  return "\r\n				<div class=\"overlay-content-wrap\">\r\n					<div class=\"overlay-text\" style=\"margin-top:200px;\">Oops! There has been some issue loading the tab. Please close this tab and try again.</div>\r\n				</div>\r\n			";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n\r\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.timeout), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n			";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "\r\n				<div class=\"long-lag-message\">It takes longer to load resources since your system is quite signiﬁcant.</br>\r\n	Just sit back and we are off to go soon!</div>\r\n				";
  }

  buffer += "<div id=\"process-panel\">\r\n	<section id=\"process-container\">\r\n\r\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.overtime), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		<div id=\"process-body\">\r\n\r\n			";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.overtime), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.overtime), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n		</div>\r\n\r\n	</section>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });