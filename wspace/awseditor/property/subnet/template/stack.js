define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_AVAILABLE_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.availableIpAddressCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_RT_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.routeTable)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-subnet-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" lastValue=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-subnet-name\" maxlength=\"255\" data-required-rollback=\"true\" data-ignore=\"true\"/>\n    </section>\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n  </div>\n\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group\">\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-subnet-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" lastValue=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-subnet-name\" maxlength=\"255\" data-required-rollback=\"true\" data-ignore=\"true\"/>\n    </section>\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-cidr-block\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_DETAIL_LBL_CIDR_BLOCK", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <div class=\"subnet-cidr-wrapper\">\n        <span class=\"cidr-prefix\" id=\"property-cidr-prefix\">"
    + escapeExpression(((stack1 = (depth0 && depth0.CIDRPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <input data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" class=\"input cidr-rest tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.CIDR)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" lastValue=\""
    + escapeExpression(((stack1 = (depth0 && depth0.CIDR)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cidr-block\" data-empty-remove=\"true\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_TIP_CIDR_BLOCK", {hash:{},data:data}))
    + "\"/>\n      </div>\n    </section>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article data-bind=\"true\">\n  <div class=\"option-group-head expand\" id=\"subnet-property-detail\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_TIT_ASSOC_ACL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <ul id=\"networkacl-list\" class=\"acl-sg-info-list acl-info-list property-list stack-property-acl-list\"></ul>\n    <a href=\"#\" class=\"add-to-list action-link\" id=\"networkacl-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_BTN_CREATE_NEW_ACL", {hash:{},data:data}))
    + "</a>\n  </div>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });