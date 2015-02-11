define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"os-property-message\">\r\n    This is a connection of "
    + escapeExpression(((stack1 = (depth0 && depth0.namePort1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " and "
    + escapeExpression(((stack1 = (depth0 && depth0.namePort2)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", working as load balancer.\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });