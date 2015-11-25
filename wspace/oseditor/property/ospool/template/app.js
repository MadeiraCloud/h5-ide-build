define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <header>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</header>\n    <section class=\"group\">\n        <dl class=\"dl-vertical\">\n            <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n            <dt>Weight</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.weight), {hash:{},data:data}))
    + "</dd>\n        </dl>\n    </section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n    <div class=\"os-property-message\">\n        No Member\n    </div>\n";
  }

  buffer += "<div class=\"option-group-head expand\">\n    Pool Details\n</div>\n<div class=\"option-group pool-details\">\n    <dl class=\"dl-vertical\">\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n        <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n        <dt>Subnet ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.subnet_id), {hash:{},data:data}))
    + "</dd>\n        <dt>Protocol</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.protocol), {hash:{},data:data}))
    + "</dd>\n        <dt>LB Method</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.lb_method), {hash:{},data:data}))
    + "</dd>\n        <dt>Provider</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.provider), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</div>\n\n<div class=\"option-group-head expand\">\n    Member("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.members)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group \">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });