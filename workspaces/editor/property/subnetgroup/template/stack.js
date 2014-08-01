define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class='property-az-name'>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div> <div>("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div> ";
  return buffer;
  }

  buffer += "<article class=\"property-subnet-group\">\n  <div class=\"option-group-head expand\">Subnet Groups Details</div>\n  <div class=\"option-group\">\n\n   <section class=\"property-control-group\" data-bind=\"true\">\n    <label class=\"left\" for=\"property-dbinstance-name\" >Subnet Group Name</label>\n    <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n    <input class=\"input\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-subnet-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n  </section>\n\n\n  <section class=\"property-control-group\" data-bind=\"true\">\n    <label class=\"left\" for=\"property-dbinstance-name\" >Subnet Group Description</label>\n    <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n    <input class=\"input\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-subnet-desc\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n  </section>\n</div>\n\n<div class=\"option-group-head expand\">Member<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = (depth0 && depth0.sbCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>\n<button class=\"icon-edit tooltip add-rule\" data-tooltip=\"Edit subnet group\"></button></div>\n<section class=\"property-control-group\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.azSb), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });