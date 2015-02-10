define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_TIT_ASSOC_ACL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <ul class=\"acl-sg-info-list property-list acl-info-list\">\n      <li>\n        <div class=\"col3 tooltip icon-btn-details\" data-uid=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_TIP_DETAIL", {hash:{},data:data}))
    + "'></div>\n        <div class=\"col2\">\n          <div class=\"col2-1 truncate\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.rule)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_ACL_LBL_ASSOC", {hash:{},data:data}))
    + "</div>\n        </div>\n      </li>\n    </ul>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBNET_APP_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
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
    + "</dd>\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.acl), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });