define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <section class=\"property-control-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_APP_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_APP_IS_DEFAULT", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.isDefault)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n  </section>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <section class=\"property-control-group\" data-bind=\"true\">\n    <label class=\"left\" for=\"property-acl-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n    <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n    <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"property-acl-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n  </section>\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <a href=\"#\" class=\"icon-add add-rule tooltip action-link\" id=\"acl-add-rule-icon\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_BTN_CREATE_NEW_RULE", {hash:{},data:data}))
    + "'></a>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</li>";
  return buffer;
  }

  buffer += "<article>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  <div class=\"option-group-head acl-header expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIT_RULE", {hash:{},data:data}))
    + "\n    <span class=\"property-head-num-wrap\">(<span id=\"acl-rule-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rules)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"option-group\">\n    <div class=\"rule-list-sort property-control-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n      <div class=\"selectbox\" id=\"acl-sort-rule-select\">\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_NUMBER", {hash:{},data:data}))
    + "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n          <li data-id=\"number\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_NUMBER", {hash:{},data:data}))
    + "</li>\n          <li data-id=\"action\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_ACTION", {hash:{},data:data}))
    + "</li>\n          <li data-id=\"direction\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n          <li data-id=\"source/destination\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </div>\n    </div>\n    <ul class=\"property-list acl-rule-list\" id=\"acl-rule-list\">"
    + escapeExpression(((stack1 = (depth0 && depth0.acl_list)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</ul>\n  </div>\n\n  <div class=\"option-group-head acl-header expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIT_ASSOC", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"acl-assn-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.associations)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n  </div>\n\n  <ul class=\"option-group property-list\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.associations), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });