define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "Encrypted";
  }

function program5(depth0,data) {
  
  
  return "Not Encrypted";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>IOPS</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.volumeId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</dd>\n  </dl>\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.readableVt.call(depth0, (depth0 && depth0.volumeType), {hash:{},data:data}))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + " GB</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.encrypted), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </dl>\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ATTACHMENT_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.state), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.instanceId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ATTACHMENT_TIME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.attachTime), {hash:{},data:data}))
    + "</dd>\n  </dl>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });