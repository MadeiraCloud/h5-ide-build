define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical property-app\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SCHEME", {hash:{},data:data}))
    + "</dt>\n      <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isInternet), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_DNS_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>\n        <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A)"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(AAAA)ipv6."
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A/AAAA)dualstack."
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HOST_ZONE_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.CanonicalHostedZoneNameID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n    </dl>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INTERNET_FACING", {hash:{},data:data}));
  }

function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INTERNAL", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-elb-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_REQUIRED", {hash:{},data:data}))
    + "</span>\n			<input data-ignore=\"true\" data-required-rollback=\"true\" maxlength=\"17\" class=\"input elb-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-elb-name\"/>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isVpc), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SCHEME", {hash:{},data:data}))
    + "</label>\n      <div class=\"mgt5\">\n        <div class=\"radio\">\n            <input type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.internal), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"internet\" id=\"elb-scheme-select1\" name=\"elb-schema-select\"/>\n            <label for=\"elb-scheme-select1\"></label>\n        </div>\n        <label for=\"elb-scheme-select1\">Internet-facing</label>\n      </div>\n      <div class=\"mgt5\">\n        <div class=\"radio\">\n            <input type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.internal), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"internal\" id=\"elb-scheme-select2\" name=\"elb-schema-select\"/>\n            <label for=\"elb-scheme-select2\"></label>\n        </div>\n        <label for=\"elb-scheme-select2\">Internal</label>\n    	</div>\n		</section>\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program10(depth0,data) {
  
  
  return "hide";
  }

function program12(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.connectionDrainingTimeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program14(depth0,data) {
  
  
  return "300";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li class=\"elb-property-listener\">\n			<div class=\"elb-property-listener-item-remove icon-remove tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_REMOVE_LISTENER", {hash:{},data:data}))
    + "\"></div>\n\n			<div class=\"property-control-group listener-item clearfix\">\n				<div class=\"elb-property-listener-item-1\">\n					<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LOAD_BALENCER_PROTOCOL", {hash:{},data:data}))
    + "</label>\n					<div class=\"selectbox elb-property-elb-protocol\">\n						<div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<ul class=\"dropdown\">\n							<li data-id=\"HTTP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTP</li>\n							<li data-id=\"HTTPS\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "HTTPS", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTPS</li>\n							<li data-id=\"TCP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">TCP</li>\n							<li data-id=\"SSL\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">SSL</li>\n						</ul>\n					</div>\n				</div>\n				<div class=\"elb-property-listener-item-2\">\n					<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n					<input class=\"input elb-property-elb-port tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_25_80_443OR1024TO65535", {hash:{},data:data}))
    + "\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" maxlength=\"5\"/>\n				</div>\n			</div>\n\n			<div class=\"property-control-group listener-item clearfix\">\n				<div class=\"left elb-property-listener-item-1\">\n					<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INSTANCE_PROTOCOL", {hash:{},data:data}))
    + "</label>\n					<div class=\"selectbox elb-property-instance-protocol\">\n						<div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<ul class=\"dropdown\">\n							<li data-id=\"HTTP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTP</li>\n							<li data-id=\"HTTPS\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "HTTPS", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTPS</li>\n							<li data-id=\"TCP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">TCP</li>\n							<li data-id=\"SSL\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">SSL</li>\n						</ul>\n					</div>\n				</div>\n				<div class=\"left elb-property-listener-item-2\">\n					<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n					<input class=\"input elb-property-instance-port tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_1_65535", {hash:{},data:data}))
    + "\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instancePort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" maxlength=\"5\"/>\n				</div>\n			</div>\n\n			<div class=\"property-control-group sslcert-select clearfix\">\n				<label for=\"sslcert-placeholder\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SERVER_CERTIFICATE", {hash:{},data:data}))
    + "</label>\n				<div class=\"sslcert-placeholder\"></div>\n			</div>\n		</li>\n		";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return "selected";
  }

function program19(depth0,data) {
  
  
  return " selected";
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n								<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n									"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.disableCertEdit), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"icon-remove\"></span>\n								</li>\n							";
  return buffer;
  }
function program22(depth0,data) {
  
  
  return "<span class=\"icon-edit\"></span>";
  }

function program24(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program26(depth0,data) {
  
  var buffer = "";
  buffer += "\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n	<div class=\"option-group sg-group\"></div>\n\n	";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.azArray), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_AVAILABILITY_ZONE", {hash:{},data:data}))
    + " </div>\n		<div class=\"option-group\" id=\"property-elb-az-cb-group\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.azArray), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n		";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<section class=\"property-control-group\">\n				<div class=\"checkbox\">\n					<input class=\"property-elb-az-checkbox\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n					<label for=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n				</div>\n				<label for=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"checkbox-label-main\">\n					<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.displayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></label>\n				<label for=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"checkbox-label-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " instances</label>\n			</section>\n			";
  return buffer;
  }

  buffer += "<article id=\"stack-elb-property-panel\">\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_DETAILS", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\" >\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appData), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group\" data-bind=\"true\">\n		<label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n		<textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				<input id=\"elb-cross-az-select\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.crossZone), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"elb-cross-az-select\"></label>\n			</div>\n			<label for=\"elb-cross-az-select\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_ENABLE_CROSS_ZONE_BALANCING", {hash:{},data:data}))
    + "</label>\n			<a class=\"elb-info-icon tooltip icon-info\" href=\"https://aws.amazon.com/about-aws/whats-new/2013/11/06/elastic-load-balancing-adds-cross-zone-load-balancing/\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_READ_RELATED_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				<input id=\"elb-connection-draining-select\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.connectionDrainingEnabled), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"elb-connection-draining-select\"></label>\n			</div>\n			<label for=\"elb-connection-draining-select\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_CONNECTION_DRAINING", {hash:{},data:data}))
    + "</label>\n			<a class=\"elb-info-icon tooltip icon-info\" href=\"http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/config-conn-drain.html\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_READ_RELATED_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n			<div class=\"elb-connection-draining-input-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.connectionDrainingEnabled), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				<label for=\"elb-connection-draining-input\" class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_CONNECTION_TIMEOUT", {hash:{},data:data}))
    + "</label>\n				<input id=\"elb-connection-draining-input\" class=\"input parsley-validated\" type=\"text\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.connectionDrainingTimeout), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-ignore=\"true\" data-required=\"true\" data-type=\"number\">\n				<label for=\"elb-connection-draining-input\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_CONNECTION_SECONDS", {hash:{},data:data}))
    + "</label>\n			</div>\n		</section>\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-idle-timeout\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_IDLE_TIMEOUT", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short mgt5\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.idleTimeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-idle-timeout\" id=\"property-elb-idle-timeout\" data-required=\"true\" data-type=\"digits\" data-min=\"1\" data-max=\"3600\" data-ignore=\"true\"/>\n			<label class=\"elb-property-right-text\" for=\"property-elb-idle-timeout\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</label>\n		</section>\n	</div>\n\n	<!--\n	<div class=\"option-group-head\">Advanced Configuration</div>\n	<div class=\"option-group\" data-bind=\"true\"> <ul id=\"elb-property-listener-list\" class=\"property-list\">\n		<section class=\"property-control-group\">\n			<label>Proxy Protocol</label>\n			<div class=\"mgt5\">\n				<div class=\"checkbox\">\n					<input id=\"elb-advanced-proxy-protocol-select\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.otherPoliciesMap)),stack1 == null || stack1 === false ? stack1 : stack1.EnableProxyProtocol), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n					<label for=\"elb-advanced-proxy-protocol-select\"></label>\n				</div>\n				<label for=\"elb-advanced-proxy-protocol-select\">Enable Proxy Protocol</label>\n				<div id=\"elb-advanced-proxy-protocol-select-tip\" class=\"property-info ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.otherPoliciesMap)),stack1 == null || stack1 === false ? stack1 : stack1.EnableProxyProtocol), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">If you have a Proxy Protocol enabled proxy server in front of your load balancer, then you must not enable Proxy Protocol on your load balancer.</div>\n			</div>\n		</section>\n	</div>\n	-->\n\n	<div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LISTENER_DETAIL", {hash:{},data:data}))
    + " </div>\n	<div class=\"option-group\" data-bind=\"true\"> <ul id=\"elb-property-listener-list\" class=\"property-list\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.listeners), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n		<a href=\"#\" id=\"elb-property-listener-content-add\" class=\"add-to-list action-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_BTN_ADD_LISTENER", {hash:{},data:data}))
    + "</a>\n<!-- 		<section class=\"property-control-group\" id=\"property-control-group-cert-setting\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SERVER_CERTIFICATE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"sslcert-select\">\n				<div class=\"selection\"></div>\n				<div style=\"height: 120px; width:260px;\" class=\"dropdown scroll-wrap scrollbar-auto-hide  clearfix\">\n					<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n					<div class=\"scroll-content\">\n						<ul>\n							<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noSSLCert), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">None</li>\n							";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sslCertItem), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</ul>\n					</div>\n				</div>\n				<div class=\"editor\">\n					<a href=\"#\" class=\"editbtn\">Add New Certificate...</a>\n				</div>\n			</div>\n		</section> -->\n	</div>\n\n	<div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_DETAILS", {hash:{},data:data}))
    + " </div>\n	<div class=\"option-group\" data-bind=\"true\" data-validate=\"parsley\" >\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_PING_PROTOCOL", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox mgt5\" id=\"elb-property-health-protocol-select\">\n				<div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.pingProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"TCP\">TCP</li>\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"HTTP\">HTTP</li>\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "HTTPS", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"HTTPS\">HTTPS</li>\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"SSL\">SSL</li>\n				</ul>\n			</div>\n		</section>\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label for=\"property-elb-health-port\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_PING_PORT", {hash:{},data:data}))
    + "</label>\n			<input class=\"input mgt5\" tooltip=\"1-65535\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.pingPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-port\" id=\"property-elb-health-port\" data-required=\"true\" data-type=\"digits\" data-ignore=\"true\" maxlength=\"5\"/>\n		</section>\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-health-path\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_PING_PATH", {hash:{},data:data}))
    + "</label>\n			<div class=\"pos-r mgt5\">\n				<input class=\"input\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.pingPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-path\" id=\"property-elb-health-path\" />\n				<span class=\"elb-pingpath-prefix\">/</span>\n			</div>\n		</section>\n\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-health-interval\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short mgt5\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckInterval)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-interval\" id=\"property-elb-health-interval\" data-required=\"true\" data-type=\"digits\" data-ignore=\"true\"/>\n			<label class=\"elb-property-right-text\" for=\"property-elb-health-interval\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-health-timout\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_RESPOND_TIMEOUT", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short mgt5\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckTimeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-timeout\" id=\"property-elb-health-timeout\" data-required=\"true\" data-type=\"digits\" data-ignore=\"true\"/>\n			<label class=\"elb-property-right-text\" for=\"property-elb-health-timeout\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</label>\n		</section>\n\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_UNHEALTH_THRESHOLD", {hash:{},data:data}))
    + "</label>\n			<div class=\"slider\" id=\"elb-property-slider-unhealthy\">\n				<a class=\"thumb\"></a>\n				<ul class=\"marker\"><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul>\n			</div>\n		</section>\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_THRESHOLD", {hash:{},data:data}))
    + "</label>\n			<div class=\"slider\" id=\"elb-property-slider-healthy\">\n				<a class=\"thumb\"></a>\n				<ul class=\"marker\"><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul>\n			</div>\n		</section>\n	</div>\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isVpc), {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });