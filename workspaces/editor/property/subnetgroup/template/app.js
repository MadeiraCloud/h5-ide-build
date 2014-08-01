define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"option-group-category\">\n            "
    + escapeExpression(((stack1 = (depth0 && depth0.az)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        </div>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subnets), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <dl class=\"dl-vertical\">\n                <dt>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt>\n                <dd>("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</dd>\n            </dl>\n            ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n    <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        <dl class=\"dl-vertical\">\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_SUBNET_GROUP_NAME", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBSubnetGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_SUBNET_GROUP_DESC", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBSubnetGroupDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n    </div>\n    <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_SUBNET_GROUP_MEMBERS", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.azSb), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</article>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });