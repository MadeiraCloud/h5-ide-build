define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"clearfix\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <div class=\"col1\"> <div class=\"radio\">\n    <input id=\"ppty-acl-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"ppty-acl-cb\" type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsed), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    <label for=\"ppty-acl-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n  </div> </div>\n  <div class=\"col3 tooltip icon-btn-details\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_TIP_DETAIL", {hash:{},data:data}))
    + "'></div>\n  <div class=\"col2\">\n    <div class=\"col2-1 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rule)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_LBL_ASSOC", {hash:{},data:data}));
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n  </div>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " | <a class=\"sg-list-delete-btn\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-count=\""
    + escapeExpression(((stack1 = (depth0 && depth0.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_BTN_DELETE", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.networkACL), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }; return Handlebars.template(TEMPLATE); });