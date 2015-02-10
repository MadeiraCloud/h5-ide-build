define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
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
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_NETWORK_INTERFACE_SUMMARY", {hash:{},data:data}))
    + "</div>\n<div class=\"option-group\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.description), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_SOURCE_DEST_CHECK_DISP", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n<div>\n\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "expand";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_NETWORK_INTERFACE_GROUP_MEMBERS", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span><span class=\"appedit-head-meta appedit-head-meta-add\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.increment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n<ul class=\"option-group property-list\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n  ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"subtitle\">("
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"subtitle subtitle-launch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_CREATE_AFTER_APPLYING_UPDATES", {hash:{},data:data}))
    + "</div>\n      ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOld), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"subtitle subtitle-terminate\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_DELETE_AFTER_APPLYING_UPDATES", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }; return Handlebars.template(TEMPLATE); });