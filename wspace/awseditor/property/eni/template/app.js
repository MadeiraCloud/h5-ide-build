define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_NETWORK_INTERFACE_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.networkInterfaceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.description), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_SOURCE_DEST_CHECK_DISP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.sourceDestCheck)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <div class=\"hidden-details\">\n      <a href=\"#\" class=\"toggle-details js-toggle-dropdown\" data-toggle=\"self-only\"><span class=\"details-off\">+ "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SHOW_DETAIL", {hash:{},data:data}))
    + "</span><span class=\"details-on\">- "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_HIDE_DETAIL", {hash:{},data:data}))
    + "</span></a>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_VPC_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SUBNET_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachment), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_MAC_ADDRESS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.macAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.privateDnsName), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ownerId), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </div>\n\n    <table class=\"table\">\n      <tr>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "</th>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n      </tr>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.privateIpAddressesSet), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n  </div>\n\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_ATTACHMENT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_Attachment_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.instanceOwnerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_Attachment_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PUBLIC_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_PRIVATE_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_IP_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.primary), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        <td>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      </tr>\n      ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "";
  buffer += "<span>("
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_PRIMARY", {hash:{},data:data}))
    + ")</span>";
  return buffer;
  }

function program15(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program17(depth0,data) {
  
  
  return "-";
  }

  buffer += "<article class=\"property-app\">\n  <div id=\"prop-appedit-eni-list\" class=\"expand\"></div>\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isGroupMode), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });