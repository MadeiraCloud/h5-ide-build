define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-group-head truncate\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  <ul class=\"property-group sg-rule-list property-list\">";
  stack1 = ((stack1 = (depth0 && depth0.ruleListTpl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"tac property-control-group\">\n    <button class=\"btn\" id=\"sg-edit-rule-button\" style=\"width:180px;\"><i class=\"icon-edit icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGRULE_BTN_EDIT_RULE", {hash:{},data:data}))
    + "</button>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article>\n  <section class=\"property-info\" style=\"margin-top:0;\">\n    <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGRULE_DESCRIPTION", {hash:{},data:data}))
    + "</div>\n  </section>\n\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });