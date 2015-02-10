define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "disabled";
  }

  buffer += "<h1 class=\"title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h1>\n<section class=\"group required\">\n    <label class=\"name\">Name</label>\n    <input data-id=\"hm-name\" data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n<section class=\"group required\">\n    <label class=\"name\">Type</label>\n    <select class=\"selection option\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-target=\"type\" data-id=\"hm-method\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <option value='PING'>PING</option>\n        <option value='HTTP'>HTTP</option>\n        <option value='HTTPS'>HTTPS</option>\n        <option value='TCP'>TCP</option>\n    </select>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Delay</label>\n    <input data-id=\"hm-delay\" data-target=\"delay\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.delay)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Timeout</label>\n    <input data-id=\"hm-timeout\" data-target=\"timeout\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.timeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Max Retries</label>\n    <input data-id=\"hm-maxretries\" data-target=\"maxRetries\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxRetries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">URL Path</label>\n    <input data-id=\"hm-urlpath\" data-target=\"urlPath\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.urlPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>\n\n<section class=\"group required\">\n    <label class=\"name\">Expected Codes</label>\n    <input data-id=\"hm-expectedcodes\" data-target=\"expectedCodes\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.expectedCodes)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });