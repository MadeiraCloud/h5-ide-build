define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INTERNET_FACING", {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INTERNAL", {hash:{},data:data}));
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_IDLE_TIMEOUT", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.IdleTimeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds<dd>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"clearfix\">\n        <div class=\"app-panel-li-col2-1\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_ELB_PROTOCOL", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n\n        <div class=\"app-panel-li-col2-2\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.LoadBalancerPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n\n        <div class=\"app-panel-li-col2-1\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INSTANCE_PROTOCOL", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.InstanceProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n\n        <div class=\"app-panel-li-col2-2\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.InstancePort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.server_certificate), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </li>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"app-panel-li-col2-full\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SERVER_CERTIFICATE", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.server_certificate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_INSTANCES", {hash:{},data:data}))
    + "</div>\n  <ul class=\"option-group property-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.distribution), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n  ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li>\n        <div class=\"list-row\">\n            <i class=\"status status-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.health), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>\n            <span class=\"app-panel-li-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.zone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n        <div class=\"list-row\">\n          <ul class=\"elb-property-instance-list\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </ul>\n        </div>\n      </li>\n    ";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "green";
  }

function program14(depth0,data) {
  
  
  return "red";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <li>\n                <div class=\"instance-info\">\n                  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.instance_name), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  <div class=\"instance-id ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.instance_name), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">("
    + escapeExpression(((stack1 = (depth0 && depth0.instance_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                </div>\n                <div class=\"instance-state\">\n                  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.instance_state), {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.instance_state), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n              </li>\n            ";
  return buffer;
  }
function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"instance-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instance_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  }

function program19(depth0,data) {
  
  
  return "instance-id-down";
  }

function program21(depth0,data) {
  
  
  return "InService";
  }

function program23(depth0,data) {
  
  
  return "OutOfService";
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a class=\"elb-info-icon tooltip icon-info\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instance_state_desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></a>";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span> </div>\n  <div class=\"option-group sg-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_LOADING", {hash:{},data:data}))
    + "</div>\n  ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_DETAILS", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_SCHEME", {hash:{},data:data}))
    + "</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isInternet), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_DNS_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>\n          <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A)"
    + escapeExpression(((stack1 = (depth0 && depth0.Dnsname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(AAAA)ipv6."
    + escapeExpression(((stack1 = (depth0 && depth0.Dnsname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A/AAAA)dualstack."
    + escapeExpression(((stack1 = (depth0 && depth0.Dnsname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HOST_ZONE_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.CanonicalHostedZoneNameID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_CROSS_ZONE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.CrossZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_CONNECTION_DRAIN", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ConnectionDrainingInfo)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.IdleTimeout), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LISTENER_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <ul class=\"property-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.listenerDisplay), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_DETAILS", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_PING_PROTOCOL", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_PING_PORT", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_PING_PATH", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.Interval)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_RESPOND_TIMEOUT", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.Timeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_UNHEALTH_THRESHOLD", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.UnhealthyThreshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_HEALTH_THRESHOLD", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.HealthyThreshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.distribution)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isclassic), {hash:{},inverse:self.noop,fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });