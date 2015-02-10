define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"property-control-group property-ami-info\">\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.AMI_APP_NOT_AVAILABLE", {hash:{},data:data}))
    + "</p>\n    </div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"property-control-group property-ami-info\">\n        <div class=\"property-control-group tac\">\n            <button id=\"changeAmi\" class=\"btn btn-blue\"><i class=\"icon-edit icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.STATIC_SUB_CHANGE_AMI", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n    <div class=\"property-control-group hide\" id=\"changeAmiPanel\">\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DRAG_IMAGE_DROP_TO_CHANGE", {hash:{},data:data}))
    + "</p>\n        <div id=\"changeAmiDropZone\">\n            <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DRAG_IMAGE_DROP_HERE", {hash:{},data:data}))
    + "</p>\n            <div class=\"resource-icon resource-icon-instance\">\n                <img src=\"/assets/images/ide/ami/amazon.i386.ebs.png\" width=\"39\" height=\"27\">\n                <div class=\"resource-label\"></div>\n            </div>\n        </div>\n        <div class=\"hide\" id=\"confirmChangeAmiWrap\">\n            <p id=\"changeAmiWarning\"></p>\n            <button id=\"confirmChangeAmi\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CONFIRM_CHANGE_AMI", {hash:{},data:data}))
    + "</button>\n        </div>\n        <button id=\"cancelChangeAmi\" class=\"btn-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"property-control-group property-ami-info\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.AMI_STACK_NOT_AVAILABLE", {hash:{},data:data}))
    + "\n    </div>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical property-ami-info\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_DESC", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.rootDeviceType), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_ARCHITECH", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_VIRTUALIZATION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.virtualizationType), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_KERNEL_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.kernelId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_OS_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.osType), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI_SUPPORT_INSTANCE_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.instance_type), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CAPACITY", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.volumeSize), {hash:{},data:data}))
    + "GB</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_OWNER", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.ownerId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_STARTED", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.startTime), {hash:{},data:data}))
    + "</dd>\n    </dl>\n";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ami), {hash:{},inverse:self.program(10, program10, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });