define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-instance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LC_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n      <input class=\"input launch-configuration-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-instance-name\" id=\"property-instance-name\" maxlength=\"240\" data-required-rollback=\"true\" data-ignore=\"true\"/>\n    </section>\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ROOT_DEVICE", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <article class=\"property-app\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.DeviceName), {hash:{},data:data}))
    + "</dd>\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.readableVt.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeType), {hash:{},data:data}))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeSize), {hash:{},data:data}))
    + " GB</dd>\n<!--         <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED", {hash:{},data:data}))
    + "</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.encrypted), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd> -->\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </article>\n  </div>\n  ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "Yes";
  }

function program12(depth0,data) {
  
  
  return "No";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>IOPS</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

  buffer += "<article class=\"property-app\" data-bind=\"true\">\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LC_TITLE", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <dl class=\"dl-vertical\">\n      ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LC_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = (depth0 && depth0.lc)),stack1 == null || stack1 === false ? stack1 : stack1.CreatedTime), {hash:{},data:data}))
    + "</dd>\n    </dl>\n\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</dt>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app_view), {hash:{},inverse:self.program(5, program5, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ebsOptimized)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });