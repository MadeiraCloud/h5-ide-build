define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "class=\"expand\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n\n    <section class=\"property-control-group\" data-bind=\"true\">\n        <label class=\"left\" for=\"property-instance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_HOSTNAME", {hash:{},data:data}))
    + "</label>\n        <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n\n        <div class=\"property-instance-name-wrap ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.count), 1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <div class=\"name-count-wrap\">\n                -[0-<span id=\"property-instance-name-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.displayCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>]\n            </div>\n            <div class=\"fitfloat\">\n                <input class=\"input instance-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n        </div>\n    </section>\n\n    <section class=\"property-control-group\" data-bind=\"true\">\n        <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n        <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-instance-count\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_NUMBER", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n      <input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-count\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.number_disable), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ami), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_editable), {hash:{},inverse:self.program(23, program23, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ADVANCED_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <label for=\"property-instance-enable-cloudwatch\"></label>\n      </div>\n      <label for=\"property-instance-enable-cloudwatch\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CW_ENABLED", {hash:{},data:data}))
    + "</label>\n\n      <p class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-info\" id=\"property-cloudwatch-warn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CW_WARN", {hash:{},data:data}))
    + "<a target=\"_blank\" href=\"http://aws.amazon.com/cloudwatch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_AMAZON_CLOUD_WATCH_PRODUCT_PAGE", {hash:{},data:data}))
    + "</a></p>\n    </section>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eni), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "single";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "disabled=\"disabled\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_YOU_CANNOT_SPECIFY_INSTANCE_NUMBER", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_IF_THE_QUANTITY_IS_MORE_THAN_1", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI", {hash:{},data:data}))
    + "</label>\n      <div id=\"property-ami\" class=\"property-block-wrap clearfix\" data-uid='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n        <img class=\"property-ami-icon left\" src=\"/assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" / >\n        <div class=\"property-ami-label\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n    </section>\n    ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n      <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n      <div class=\"selectbox selectbox-mega\" id=\"instance-type-select\">\n        <div class=\"selection\"></div>\n        <ul class=\"dropdown\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_type), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n    </section>\n    <section class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_set_ebs), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"checkbox\">\n        <input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ebs_optimized), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"ebs-optimized\" />\n        <label for=\"property-instance-ebs-optimized\"></label>\n      </div>\n      <label for=\"property-instance-ebs-optimized\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</label>\n    </section>\n    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hide), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n          </li>\n          ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "selected ";
  }

function program17(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program19(depth0,data) {
  
  
  return "hide";
  }

function program21(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program23(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n      <p class=\"property-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_UPDATE_INSTANCE_TYPE_DISABLED_FOR_INSTANCE_STORE", {hash:{},data:data}))
    + "</p>\n    </section>\n    ";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "\n        <input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" checked=\"true\" value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n        ";
  }

function program27(depth0,data) {
  
  
  return "\n        <input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n        ";
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">Root Device</div>\n  <div class=\"option-group\">\n    <article class=\"property-app\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.DeviceName), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeType), {hash:{},data:data}))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeSize), {hash:{},data:data}))
    + " GB</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </article>\n  </div>\n  ";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>IOPS</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck), {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <label for=\"property-instance-source-check\"></label>\n      </div>\n      <label for=\"property-instance-source-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_SOURCE_DEST_CHECK", {hash:{},data:data}))
    + "</label>\n    </section>\n    <section class=\"property-control-group\">\n      <div class=\"network-list-wrap\">\n        <div class=\"network-list-header clearfix\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "\n          <button id=\"instance-ip-add\" class=\"right btn btn-blue btn-small tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_TIP_ADD_IP_ADDRESS", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_ADD_IP", {hash:{},data:data}))
    + "</button>\n        </div>\n        <ul class=\"network-list\" id=\"property-network-list\" data-bind=\"true\"></ul>\n      </div>\n    </section>\n  </div>\n  ";
  return buffer;
  }
function program35(depth0,data) {
  
  
  return "\n        <input id=\"property-instance-source-check\" type=\"checkbox\" checked=\"true\" value=\"None\" name=\"property-instance-source-check\" />\n        ";
  }

function program37(depth0,data) {
  
  
  return "\n        <input id=\"property-instance-source-check\" type=\"checkbox\" value=\"None\" name=\"property-instance-source-check\" />\n        ";
  }

  buffer += "<article class=\"property-app\">\n  <div id=\"prop-appedit-ami-list\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n  </div>\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });