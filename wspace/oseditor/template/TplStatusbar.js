define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"status-bar\"></ul>\n<div class=\"status-bar-modal\" style=\"display: none;\"></div>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Last saved: <span class=\"stack-save-time\">-<span>";
  };
TEMPLATE.lastSaved=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"state-success\"><i class=\"status status-green icon-label\"></i><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.successCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>\n<span class=\"state-failed\"><i class=\"status status-red icon-label\"></i><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.failCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>";
  return buffer;
  };
TEMPLATE.state=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Validate";
  };
TEMPLATE.ta=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });