define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<article>\n    <div class=\"option-group-head expand\">Stack</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <section class=\"property-control-group clearfix\">\n            <label class=\"left\" for=\"property-mesos-stack-name\">Stack Name</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-mesos-stack-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n    </div>\n</article>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article>\n    <div class=\"option-group-head expand\">Deployment Details</div>\n    <div class=\"option-group\" data-bind=\"true\">\n        <dl class=\"dl-vertical\">\n            <dt>Deployment Name</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        <dl class=\"dl-vertical\">\n            <dt>Deployment ID</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        <dl class=\"dl-vertical\">\n            <dt>Mesos Master</dt>\n            <dd><a href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">"
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></dd>\n        </dl>\n    </div>\n</article>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });