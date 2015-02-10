define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_INSTANCE_SUMMARY", {hash:{},data:data}))
    + "</div>\n<div class=\"option-group\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_LAUNCH_TIME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.launchTime), {hash:{},data:data}))
    + "</dd>\n  </dl>\n<div>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "expand";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_SERVER_GROUP_MEMBERS", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span> <span class=\"appedit-head-meta appedit-head-meta-add\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.increment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n<ul class=\"option-group property-list\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n  ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"subtitle\">("
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"subtitle subtitle-launch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_LAUNCH_AFTER_APPLYING_UPDATES", {hash:{},data:data}))
    + "</div>\n      ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOld), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"subtitle subtitle-terminate\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TERMINATE_AFTER_APPLYING_UPDATE", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }; return Handlebars.template(TEMPLATE); });