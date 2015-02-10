define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "style=\"color:red;\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox selectbox-mega\" id=\"instance-type-select\">\n				<div class=\"selection\"></div>\n				<ul class=\"dropdown\">\n					";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_type), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</ul>\n			</div>\n		</section>\n		";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n						<div class=\"main  truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n					</li>\n					";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "selected ";
  }

function program7(depth0,data) {
  
  
  return "hide";
  }

function program9(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" checked=\"true\" name=\"ebs-optimized\" />\n				";
  }

function program11(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" name=\"ebs-optimized\" />\n				";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<section class=\"property-control-group\">\n				<div class=\"checkbox\">\n					<input id=\"property-instance-public-ip\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.publicIp), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-instance-public-ip\" />\n					<label for=\"property-instance-public-ip\"></label>\n				</div>\n				<label for=\"property-instance-public-ip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_AUTO_PUBLIC_IP", {hash:{},data:data}))
    + "</label>\n			</section>\n		";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program16(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program17(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program19(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program21(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<div class=\"property-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_USERDATA_DISABLED_TO_INSTALL_VISUALOPS", {hash:{},data:data}))
    + "</div>\n			";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<label for=\"property-instance-user-data\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_USER_DATA", {hash:{},data:data}))
    + "</label>\n				<textarea id=\"property-instance-user-data\">"
    + escapeExpression(((stack1 = (depth0 && depth0.userData)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n			";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">Root Device</div>\n	<div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</label>\n      <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </section>\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</label>\n      <div class=\"ranged-number-input\">\n          <label for=\"volume-size-ranged\"></label>\n          <input id=\"volume-size-ranged\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"volume-size-ranged\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-required=\"true\" data-type=\"number\"/>\n      <label for=\"volume-size-ranged\" >GB</label>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</label>\n        <div id=\"volume-type-radios\">\n          <div>\n             <div class=\"radio\">\n                  <input id=\"radio-standard\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"standard\" />\n                  <label for=\"radio-standard\"></label>\n              </div>\n              <label for=\"radio-standard\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_STANDARD", {hash:{},data:data}))
    + "</label>\n          </div>\n          <div>\n             <div class=\"radio\">\n                  <input id=\"radio-gp2\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isGp2), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"gp2\" />\n                  <label for=\"radio-gp2\"></label>\n              </div>\n              <label for=\"radio-gp2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_GP2", {hash:{},data:data}))
    + "</label>\n          </div>\n          <div ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_MSG_WARN", {hash:{},data:data}))
    + "\">\n            <div class=\"radio\">\n              <input id=\"radio-io1\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isIo1), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"io1\" />\n              <label for=\"radio-io1\"></label>\n            </div>\n            <label for=\"radio-io1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_IO1", {hash:{},data:data}))
    + "</label>\n          </div>\n        </div>\n    </section>\n\n    <section class=\"property-control-group\" id=\"iops-group\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isIo1), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label>IOPS</label>\n        <div class=\"ranged-number-input\">\n          <label for=\"iops-ranged\"></label>\n          <input id=\"iops-ranged\" type=\"text\" class=\"input\" min=\"100\" max=\"2000\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n    </section>\n\n<!--     <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED", {hash:{},data:data}))
    + "</label>\n        <div>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.encrypted), {hash:{},inverse:self.program(34, program34, data),fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    </section> -->\n\n	</div>\n  ";
  return buffer;
  }
function program26(depth0,data) {
  
  
  return "class=\"tooltip\"";
  }

function program28(depth0,data) {
  
  
  return "disabled";
  }

function program30(depth0,data) {
  
  
  return "style=\"display:none\"";
  }

function program32(depth0,data) {
  
  
  return "Yes";
  }

function program34(depth0,data) {
  
  
  return "No";
  }

  buffer += "<article>\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LC_TITLE", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-instance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LC_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n			<input class=\"input launch-configuration-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-instance-name\" id=\"property-instance-name\" maxlength=\"240\" data-required-rollback=\"true\" data-ignore=\"true\"/>\n		</section>\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n            <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n        </section>\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI", {hash:{},data:data}))
    + "</label>\n			<div id=\"property-ami\" class=\"property-block-wrap clearfix\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<img class=\"property-ami-icon left\" src=\"/assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" / >\n				<div class=\"property-ami-label\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_set_ebs), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			<div class=\"checkbox\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ebsOptimized), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<label for=\"property-instance-ebs-optimized\"></label>\n			</div>\n			<label for=\"property-instance-ebs-optimized\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</label>\n			<i class=\"icon-info tooltip default-kp-info\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "POP_INSTANCE_KEYPAIR_INFO_TIP", {hash:{},data:data}))
    + "\"></i>\n            <div id=\"kp-placeholder\"></div>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.displayAssociatePublicIp), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ADVANCED_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				<input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitorEnabled), {hash:{},inverse:self.program(19, program19, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n				<label for=\"property-instance-enable-cloudwatch\"></label>\n			</div>\n			<label for=\"property-instance-enable-cloudwatch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CW_ENABLED", {hash:{},data:data}))
    + "</label>\n\n			<p class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-info\" id=\"property-cloudwatch-warn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CW_WARN", {hash:{},data:data}))
    + "<a target=\"_blank\" href=\"http://aws.amazon.com/cloudwatch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_WATCH_LINK_TEXT", {hash:{},data:data}))
    + "</a></p>\n		</section>\n		<section class=\"property-control-group\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stackAgentEnable), {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</section>\n	</div>\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });