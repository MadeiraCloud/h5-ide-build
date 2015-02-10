define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.keyName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_NO_KP", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.keyName), {hash:{},inverse:self.program(12, program12, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dd>\n      ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.windows), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                <button class=\"btn btn-blue\" id=\"property-app-keypair\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_GET_WINDOWS_PASSWORD", {hash:{},data:data}))
    + "</button>\n            ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <a href=\"#\" id=\"property-app-keypair\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n            ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n          "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_NO_KP", {hash:{},data:data}))
    + "\n        ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ROOT_DEVICE", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <article class=\"property-app\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.volumeId), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.name), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.createTime), {hash:{},data:data}))
    + "</dd>\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.readableVt.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.volumeType), {hash:{},data:data}))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.snapshotId), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},data:data}))
    + " GB</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED", {hash:{},data:data}))
    + "</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.encrypted), {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ATTACHMENT_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.state), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.instanceId), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ATTACHMENT_TIME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.attachTime), {hash:{},data:data}))
    + "</dd>\n      </dl>\n    </article>\n  </div>\n  ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program17(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED_STATE", {hash:{},data:data}));
  }

function program19(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_NOT_ENCRYPTED_STATE", {hash:{},data:data}));
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_IOPS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.networkInterfaceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.description), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_SOURCE_DEST_CHECK_DISP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n\n    <div class=\"hidden-details\">\n      <a href=\"#\" class=\"toggle-details js-toggle-dropdown\" data-toggle=\"self-only\"><span class=\"details-off\">+ "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SHOW_DETAIL", {hash:{},data:data}))
    + "</span><span class=\"details-on\">- "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_HIDE_DETAIL", {hash:{},data:data}))
    + "</span></a>\n\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_VPC_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SUBNET_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.attachment), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_MAC_ADDRESS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.macAddress), {hash:{},data:data}))
    + "</dd>\n\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.privateDnsName), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.ownerId), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </div>\n    <table class=\"table table-small\">\n      <tr>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "</th>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n      </tr>\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.privateIpAddressesSet), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n\n  </div>\n  ";
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_ATTACHMENT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentId), {hash:{},data:data}))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_Attachment_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.instanceOwnerId), {hash:{},data:data}))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_Attachment_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PUBLIC_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PRIVATE_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.privateDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_IP_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.ownerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.primary), {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        <td>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp), {hash:{},inverse:self.program(39, program39, data),fn:self.program(37, program37, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      </tr>\n      ";
  return buffer;
  }
function program35(depth0,data) {
  
  var buffer = "";
  buffer += "<span>("
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_PRIMARY", {hash:{},data:data}))
    + ")</span>";
  return buffer;
  }

function program37(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program39(depth0,data) {
  
  
  return "-";
  }

  buffer += "<article class=\"property-app\">\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_DETAIL", {hash:{},data:data}))
    + "\n  <a href=\"#\" class=\"icon-syslog tooltip property-btn-get-system-log action-link\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_GET_SYSTEM_LOG", {hash:{},data:data}))
    + "\" ></a>\n</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_LAUNCH_TIME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.launchTime), {hash:{},data:data}))
    + "</dd>\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PRIMARY_PUBLIC_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.publicIpAddress), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PUBLIC_DNS", {hash:{},data:data}))
    + "</dt>\n      <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.dnsName), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PRIMARY_PRIVATE_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.privateIpAddress), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PRIVATE_DNS", {hash:{},data:data}))
    + "</dt>\n      <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.privateDnsName), {hash:{},data:data}))
    + "</dd>\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI", {hash:{},data:data}))
    + "</dt>\n      <dd><a href=\"#\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-app-ami\">"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a><dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</dt>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app_view), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CLOUDWATCH_DETAILED_MONITORING", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.monitoringState)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.ebsOptimized), {hash:{},data:data}))
    + "<dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TENANCY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.placement)),stack1 == null || stack1 === false ? stack1 : stack1.tenancy), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.rootDeviceType), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_BLOCK_DEVICE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.blockDevice), {hash:{},data:data}))
    + "</dd>\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eni), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });