define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article>\n    <div class=\"option-group-head expand\">Dependency Relationship</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <label class=\"property-control-group\">"
    + escapeExpression(((stack1 = (depth0 && depth0.before)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " depends on "
    + escapeExpression(((stack1 = (depth0 && depth0.after)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n    </div>\n</article>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });