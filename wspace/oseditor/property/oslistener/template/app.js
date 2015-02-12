define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"option-group-head expand\">\r\n    Listener Details\r\n</div>\r\n<div class=\"option-group\">\r\n    <dl class=\"dl-vertical\">\r\n        <dt>Name</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Subnet ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnet_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Address</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Connection Limit</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.connection_limit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Protocol</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Protocol Port</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol_port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>Pool ID</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.pool_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    </dl>\r\n</div>\r\n\r\n<div class=\"option-group-head expand\">\r\n    Port Details\r\n</div>\r\n<div class=\"option-group\">\r\n\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });