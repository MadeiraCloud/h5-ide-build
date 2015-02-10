define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_TENANCY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceTenancy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.mainRTB)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_APP_DEFAULT_ACL", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.defaultACL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <section class=\"property-control-group clearfix\">\n      <label class=\"left\" for=\"property-vpc-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input vpc-name\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-vpc-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n    </section>\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-resolution\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsSupport), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-resolution\">\n        <label for=\"property-dns-resolution\"></label>\n      </div>\n      <label for=\"property-dns-resolution\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_ENABLE_DNS_RESOLUTION", {hash:{},data:data}))
    + "</label>\n    </section>\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-hostname\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsHosts), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-hostname\">\n        <label for=\"property-dns-hostname\"></label>\n      </div>\n      <label for=\"property-dns-hostname\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_ENABLE_DNS_HOSTNAME_SUPPORT", {hash:{},data:data}))
    + "</label>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIT_DHCP_OPTION", {hash:{},data:data}))
    + "</label>\n      <div id=\"dhcp-dropdown\"></div>\n    </section>\n  </div>\n\n\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " checked=\"checked\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group\" data-bind=\"true\">\n    <section class=\"property-control-group clearfix\">\n      <label class=\"left\" for=\"property-vpc-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input vpc-name\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-vpc-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n    </section>\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n    <section class=\"property-control-group clearfix\">\n      <label class=\"left\" for=\"property-cidr-block\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_CIDR_BLOCK", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input cidr-block tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cidr-block\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_EG_10_0_0_0_16", {hash:{},data:data}))
    + "\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\" data-trigger=\"change\" data-type=\"awsCidr\"/>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_TENANCY", {hash:{},data:data}))
    + "</label>\n      <div class=\"selectbox selectbox-mega\" id=\"property-tenancy\">\n        <div class=\"selection\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultTenancy), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n          <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultTenancy), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"default\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_TENANCY_LBL_DEFAULT", {hash:{},data:data}))
    + "</li>\n          <li class=\"item";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.defaultTenancy), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"dedicated\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_TENANCY_LBL_DEDICATED", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </div>\n      <div id=\"desc-dedicated\" class=\"property-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_SELECTING_DEDICATED_DESC", {hash:{},data:data}))
    + "<a target=\"_blank\" href=\"http://aws.amazon.com/dedicated-instances/\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_SELECTING_DEDICATED_LINK_TEXT", {hash:{},data:data}))
    + "</a></div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-resolution\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsSupport), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-resolution\">\n        <label for=\"property-dns-resolution\"></label>\n      </div>\n      <label for=\"property-dns-resolution\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_ENABLE_DNS_RESOLUTION", {hash:{},data:data}))
    + "</label>\n    </section>\n\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-hostname\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsHosts), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-hostname\">\n        <label for=\"property-dns-hostname\"></label>\n      </div>\n      <label for=\"property-dns-hostname\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DETAIL_LBL_ENABLE_DNS_HOSTNAME_SUPPORT", {hash:{},data:data}))
    + "</label>\n    </section>\n\n    <section class=\"property-control-group\">\n        <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIT_DHCP_OPTION", {hash:{},data:data}))
    + "</label>\n        <div id=\"dhcp-dropdown\"></div>\n    </section>\n  </div>\n\n  ";
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP.VPC_DETAIL_TENANCY_LBL_DEFAULT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program7(depth0,data) {
  
  
  return "Dedicated";
  }

function program9(depth0,data) {
  
  
  return " selected";
  }

  buffer += "<article>\n  <div class=\"option-group-head expand\" id=\"vpc-property-detail\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });