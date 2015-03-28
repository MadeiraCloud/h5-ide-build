define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<div class=\"mega-list-wraper-header truncate\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.sgColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.groupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"property-group\">\n  <ul class=\"mega-list-wraper\" id=\"sg-info-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.rules), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n</div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <div class=\"rule-list-row\">\n        <div class=\"rule-direction-icon icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.direction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.direction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sgColor), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div class=\"rule-reference truncate tooltip\" data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.direction), "inbound", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.ipRanges)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n      <div class=\"rule-list-row\">\n        <div><span class=\"rule-protocol tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_PROTOCOL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ipProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n        <div class=\"rule-port tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_PORT_CODE", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.dispPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n    </li>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.sgColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "IDE.POP_SGRULE_LBL_SOURCE", {hash:{},data:data}));
  }

function program7(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "IDE.POP_SGRULE_LBL_DEST", {hash:{},data:data}));
  }

  buffer += "<article class=\"property-info\" style=\"margin-top:0;\">\n   <section class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGRULE_SELECTED_CONNECTION_REFLECTS_FOLLOWING_SGR", {hash:{},data:data}))
    + "</section>\n</article>\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sg_group), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }; return Handlebars.template(TEMPLATE); });