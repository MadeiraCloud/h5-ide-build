define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n        ";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Security Group\n</div>\n<div class=\"option-group\">\n    <select class=\"selection option mutil show-input item-list\" data-target=\"sglist\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.attachedSGList)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-button-tpl=\"button\" data-select-tpl=\"sgOption\" data-item-tpl=\"sgItem\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgList), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </select>\n</div>";
  return buffer;
  };
TEMPLATE.stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item\">\n    <span class=\"item-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"item-remove icon-del tooltip\" data-tooltip=\"Unassociate Security Group\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"option\">\n    <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"info\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Rules, "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Members, "
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.option=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>Create <span class=\"default\">New Security Group...</span><span class=\"new\"></span></div>";
  };
TEMPLATE.addButton=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"item-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <span class=\"item-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Rules, "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Members, "
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </li>\n        ";
  return buffer;
  }

  buffer += "<div class=\"option-group-head expand\">\n    Security Group ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachedSGList)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n</div>\n<div class=\"option-group\">\n    <ul class=\"item-readable-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.attachedSGList), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n</div>";
  return buffer;
  };
TEMPLATE.app=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });