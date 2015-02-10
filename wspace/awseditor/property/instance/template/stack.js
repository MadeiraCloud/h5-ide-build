define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "single";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "disabled=\"disabled\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_YOU_CANNOT_SPECIFY_INSTANCE_NUMBER", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_IF_THE_QUANTITY_IS_MORE_THAN_1", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "style=\"color:red;\"";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox selectbox-mega\" id=\"instance-type-select\">\n				<div class=\"selection\"></div>\n				<ul class=\"dropdown\"> ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_type), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </ul>\n			</div>\n		</section>\n		";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" tabindex=\"-1\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hide), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n						<div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n					</li>\n				";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "selected ";
  }

function program13(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program15(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TENANCY", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"tenancy-select\">\n				<div class=\"selection\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tenancy), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.force_tenacy), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<li class=\"item ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.tenancy), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"dedicated\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TENANCY_DELICATED", {hash:{},data:data}))
    + "</li>\n				</ul>\n			</div>\n		</section>\n		";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "Default";
  }

function program20(depth0,data) {
  
  
  return "Dedicated";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tenancy), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"default\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TENANCY_DEFAULT", {hash:{},data:data}))
    + "</li>\n					";
  return buffer;
  }
function program23(depth0,data) {
  
  
  return "selected";
  }

function program25(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" checked=\"true\" value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n				";
  }

function program27(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n				";
  }

function program29(depth0,data) {
  
  
  return "hide";
  }

function program31(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<div class=\"property-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_USERDATA_DISABLED_TO_INSTALL_VISUALOPS", {hash:{},data:data}))
    + " <a href=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.AGENT_USER_DATA_URL", {hash:{},data:data}))
    + "\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_VIEW_AGENT_USER_DATA_URL_TEXT", {hash:{},data:data}))
    + "</a>.</div>\n			";
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<label for=\"property-instance-user-data\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_USER_DATA", {hash:{},data:data}))
    + "</label>\n			<textarea id=\"property-instance-user-data\">"
    + escapeExpression(((stack1 = (depth0 && depth0.userData)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n			";
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ROOT_DEVICE", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</label>\n      <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </section>\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_SIZE", {hash:{},data:data}))
    + "</label>\n      <div class=\"ranged-number-input\">\n          <label for=\"volume-size-ranged\"></label>\n          <input id=\"volume-size-ranged\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"volume-size-ranged\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-required=\"true\" data-type=\"number\"/>\n      <label for=\"volume-property-ranged-number\" >GB</label>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE", {hash:{},data:data}))
    + "</label>\n      <div id=\"volume-type-radios\">\n\n      <div>\n      	<div class=\"radio\">\n          <input id=\"radio-standard\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"standard\"/>\n          <label for=\"radio-standard\"></label>\n        </div>\n        <label for=\"radio-standard\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_STANDARD", {hash:{},data:data}))
    + "</label>\n      </div>\n\n      <div>\n        <div class=\"radio\">\n          <input id=\"radio-gp2\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isGp2), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"gp2\"/>\n          <label for=\"radio-gp2\"></label>\n        </div>\n        <label for=\"radio-gp2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_GP2", {hash:{},data:data}))
    + "</label>\n      </div>\n\n      <div ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_MSG_WARN", {hash:{},data:data}))
    + "\">\n        <div class=\"radio\">\n          <input id=\"radio-io1\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isIo1), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(38, program38, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"io1\"/>\n          <label for=\"radio-io1\"></label>\n        </div>\n        <label for=\"radio-io1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_TYPE_IO1", {hash:{},data:data}))
    + "</label>\n      </div>\n\n      </div>\n    </section>\n\n    <section class=\"property-control-group\" id=\"iops-group\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.isIo1), {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_IOPS", {hash:{},data:data}))
    + "</label>\n        <div class=\"ranged-number-input\">\n          <label for=\"iops-ranged\"></label>\n          <input id=\"iops-ranged\" type=\"text\" class=\"input\" min=\"100\" max=\"2000\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n    </section>\n\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VOLUME_ENCRYPTED", {hash:{},data:data}))
    + "</label>\n        <div>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.encrypted), {hash:{},inverse:self.program(44, program44, data),fn:self.program(42, program42, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    </section>\n\n	</div>\n  ";
  return buffer;
  }
function program36(depth0,data) {
  
  
  return "class=\"tooltip\"";
  }

function program38(depth0,data) {
  
  
  return "disabled";
  }

function program40(depth0,data) {
  
  
  return "style=\"display:none\"";
  }

function program42(depth0,data) {
  
  
  return "Encrypted";
  }

function program44(depth0,data) {
  
  
  return "Not Encrypted";
  }

function program46(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-instance-ni-description\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_DESC", {hash:{},data:data}))
    + "</label>\n			<textarea id=\"property-instance-ni-description\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck), {hash:{},inverse:self.program(49, program49, data),fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<label for=\"property-instance-source-check\"></label>\n			</div>\n			<label for=\"property-instance-source-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_SOURCE_DEST_CHECK", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multi_enis), {hash:{},inverse:self.program(53, program53, data),fn:self.program(51, program51, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			<div class=\"checkbox\">\n				<input id=\"property-instance-public-ip\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multi_enis), {hash:{},inverse:self.noop,fn:self.program(55, program55, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.assoPublicIp), {hash:{},inverse:self.noop,fn:self.program(57, program57, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-instance-public-ip\" />\n				<label for=\"property-instance-public-ip\"></label>\n			</div>\n			<label for=\"property-instance-public-ip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_AUTO_PUBLIC_IP", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"network-list-wrap\">\n				<div class=\"network-list-header clearfix\">\n					"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "\n					<button id=\"instance-ip-add\" class=\"right btn btn-blue btn-small tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_TIP_ADD_IP_ADDRESS", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ENI_ADD_IP", {hash:{},data:data}))
    + "</button>\n				</div>\n				<ul class=\"network-list\" id=\"property-network-list\" data-bind=\"true\"></ul>\n			</div>\n		</section>\n	</div>\n	";
  return buffer;
  }
function program47(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-source-check\" type=\"checkbox\" checked=\"true\" value=\"None\" name=\"property-instance-source-check\" />\n				";
  }

function program49(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-source-check\" type=\"checkbox\" value=\"None\" name=\"property-instance-source-check\" />\n				";
  }

function program51(depth0,data) {
  
  var buffer = "";
  buffer += "class=\"property-control-group tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_PUBLIC_IP_CANNOT_BE_ASSOCIATED", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program53(depth0,data) {
  
  
  return "class=\"property-control-group\"";
  }

function program55(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program57(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

  buffer += "<article>\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-instance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_HOSTNAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n\n			<div class=\"property-instance-name-wrap ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.count), 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				<div class=\"name-count-wrap\">\n					-[0-<span id=\"property-instance-name-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.displayCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>]\n				</div>\n				<div class=\"fitfloat\">\n					<input class=\"input instance-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n				</div>\n			</div>\n		</section>\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n			<textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</section>\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-instance-count\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_NUMBER", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n			<input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-count\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.number_disable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n		</section>\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_AMI", {hash:{},data:data}))
    + "</label>\n			<div id=\"property-ami\" class=\"property-block-wrap clearfix\" data-uid='"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n				<img class=\"property-ami-icon left\" src=\"/assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<div class=\"property-ami-label\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_set_ebs), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			<div class=\"checkbox\">\n				<input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ebsOptimized), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"ebs-optimized\" />\n				<label for=\"property-instance-ebs-optimized\"></label>\n			</div>\n			<label for=\"property-instance-ebs-optimized\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</label>\n		</section>\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.classic_stack), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</label>\n			<i class=\"icon-info tooltip default-kp-info\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "POP_INSTANCE_KEYPAIR_INFO_TIP", {hash:{},data:data}))
    + "\"></i>\n            <div id=\"kp-placeholder\"></div>\n		</section>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_ADVANCED_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<label for=\"property-instance-enable-cloudwatch\"></label>\n			</div>\n			<label for=\"property-instance-enable-cloudwatch\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CW_ENABLED", {hash:{},data:data}))
    + "</label>\n\n			<p class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-info\" id=\"property-cloudwatch-warn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_CW_WARN", {hash:{},data:data}))
    + "<a target=\"_blank\" href=\"http://aws.amazon.com/cloudwatch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_WATCH_LINK_TEXT", {hash:{},data:data}))
    + "</a></p>\n		</section>\n		<section class=\"property-control-group\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stackAgentEnable), {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</section>\n	</div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eni), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<div class=\"option-group-head\" id=\"sg-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });