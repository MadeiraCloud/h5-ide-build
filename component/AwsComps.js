define('component/awscomps/DhcpTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_AUTO_DHCP", {hash:{},data:data}))
    + "<i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_AUTO_DHCP", {hash:{},data:data}))
    + "'></i>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DEFAULT_DHCP", {hash:{},data:data}))
    + " <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_DEFAULT_DHCP", {hash:{},data:data}))
    + "\"></i>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAuto), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['domain-name'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['domain-name-servers'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['ntp-servers'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0['netbios-name-servers'])),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['netbios-node-type']), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n    <td class=\"show-detail icon-toolbar-cloudformation\"></td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "domain-name = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "domain-name-servers = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name-servers']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "ntp-servers = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['ntp-servers']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "netbios-name-servers = ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['netbios-name-servers']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ";";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "netbios-node-type = "
    + escapeExpression(((stack1 = (depth0 && depth0['netbios-node-type'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<li data-id=\"@default\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0['default']), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DEFAULT_DHCP", {hash:{},data:data}))
    + "\n    <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_DEFAULT_DHCP", {hash:{},data:data}))
    + "\"></i>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-id=\"@auto\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.auto), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_AUTO_DHCP", {hash:{},data:data}))
    + "\n    <i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_AUTO_DHCP", {hash:{},data:data}))
    + "'></i>\n</li>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideDefaultNoKey), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DHCP_DELETE_CONFIRM_ONE", (depth0 && depth0.selectedId), {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DHCP_DELETE_CONFIRM_MULTY", (depth0 && depth0.selectedCount), {hash:{},data:data}));
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program3(depth0,data) {
  
  
  return "3";
  }

function program5(depth0,data) {
  
  
  return "4";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div class=\"multi-ipt-row\">\n                            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_DNS", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_EG_172_16_16_16", {hash:{},data:data}))
    + "\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                        </div>\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div class=\"multi-ipt-row\">\n                            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_DNS", {hash:{},data:data}))
    + "\"  placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_EG_172_16_16_16", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                        </div>\n                        ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NTP", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NTP", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NETBIOS", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_UP_TO_4_NETBIOS", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n                    </div>\n                    ";
  return buffer;
  }

function program19(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE_NOT_SPECIFIED", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                        ";
  return buffer;
  }
function program22(depth0,data) {
  
  
  return " selected";
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-dhcp-domain\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</label>\n                <div id=\"property-dhcp-domain\" class=\"multi-input\" data-max-row=\"100\">\n                    <div class=\"multi-ipt-row\">\n                        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n                        <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_ENTER_THE_DOMAIN_NAME", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"domain\" data-ignore=\"true\"></span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div class=\"modal-right\" style=\"margin: 10px 0\">\n                        <div class=\"checkbox\">\n                            <input id=\"property-amazon-dns\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.amazonDNS), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "type=\"checkbox\">\n                            <label style=\"width: 14px\" for=\"property-amazon-dns\"></label>\n                        </div>\n                        <label for=\"property-amazon-dns\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_AMZN_PROVIDED_DNS", {hash:{},data:data}))
    + "</label>\n                    </div>\n                    <div id=\"property-domain-server\" class=\"multi-input\" data-max-row=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.amazonDNS), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n                        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainServers), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</label>\n                <div id=\"property-ntp-server\" class=\"multi-input\" data-max-row=\"4\">\n                    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n                <div id=\"property-netbios-server\" class=\"multi-input\" data-max-row=\"4\">\n                    ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosServers), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</label>\n                <div class=\"selectbox selectbox-mega\" id=\"property-netbios-type\">\n                    <div class=\"selection tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_TIP_SELECT_NETBIOS_NODE", {hash:{},data:data}))
    + "\">";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosType), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                    <ul class=\"dropdown\" tabindex=\"-1\">\n                        ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosTypes), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "<br>";
  return buffer;
  }

  buffer += "<div class=\"detail-info\">\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['domain-name-servers']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n    </div>\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0['ntp-servers']), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n        <section class=\"property-control-group\">\n\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0['netbios-node-type'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.detail_info=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('dhcp_manage',["CloudResources", 'constant', 'UI.modalplus', 'toolbar_modal', 'i18n!/nls/lang.js', 'component/awscomps/DhcpTpl'], function(CloudResources, constant, modalPlus, toolbarModal, lang, template) {
  var DhcpManager, deleteCount, deleteErrorCount, fetched, fetching, mapFilterInput, regionsMark, updateAmazonCB;
  fetched = false;
  fetching = false;
  regionsMark = {};
  updateAmazonCB = function() {
    var rowLength;
    rowLength = $("#property-domain-server").children().length;
    if (rowLength > 3) {
      return $('#property-amazon-dns').attr("disabled", true);
    } else {
      return $('#property-amazon-dns').removeAttr("disabled");
    }
  };
  mapFilterInput = function(selector) {
    var $inputs, ipt, result, _i, _len;
    $inputs = $(selector);
    result = [];
    for (_i = 0, _len = $inputs.length; _i < _len; _i++) {
      ipt = $inputs[_i];
      if (ipt.value) {
        result.push(ipt.value);
      }
    }
    return result;
  };
  deleteCount = 0;
  deleteErrorCount = 0;
  DhcpManager = Backbone.View.extend({
    constructor: function() {
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DHCP, Design.instance().region());
      this.listenTo(this.collection, 'change', function() {
        return this.renderManager();
      });
      this.listenTo(this.collection, 'update', function() {
        return this.renderManager();
      });
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this;
    },
    credChanged: function() {
      var _ref;
      this.collection.fetchForce();
      if ((_ref = this.manager) != null) {
        _ref.renderLoading();
      }
      return this.manager && this.refreshManager();
    },
    remove: function() {
      this.isRemoved = true;
      return Backbone.View.prototype.remove.call(this);
    },
    filter: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.collection.toJSON(), function(data) {
        return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.renderDropdown(hitKeys);
      } else {
        return this.renderDropdown();
      }
    },
    render: function() {
      this.manager = new toolbarModal(this.getModalOptions());
      this.manager.on('refresh', this.refreshManager, this);
      this.manager.on('slidedown', this.renderSlides, this);
      this.manager.on('action', this.doAction, this);
      this.manager.on('detail', this.detail, this);
      this.manager.on('close', (function(_this) {
        return function() {
          return _this.manager.remove();
        };
      })(this));
      this.manager.render();
      this.renderManager();
      return this.trigger('manage');
    },
    refreshManager: function() {
      fetched = false;
      return this.renderManager();
    },
    renderManager: function() {
      var currentRegion, initManager, _ref, _ref1, _ref2;
      if ((_ref = Design.instance().credential()) != null ? _ref.isDemo() : void 0) {
        if ((_ref1 = this.manager) != null) {
          _ref1.render('nocredential');
        }
        return false;
      }
      initManager = this.initManager.bind(this);
      currentRegion = (_ref2 = Design.instance()) != null ? _ref2.get('region') : void 0;
      if (currentRegion && ((!fetched && !fetching) || (!regionsMark[currentRegion]))) {
        fetching = true;
        regionsMark[currentRegion] = true;
        return this.collection.fetchForce().then(initManager, initManager);
      } else if (!fetching) {
        return initManager();
      }
    },
    initManager: function() {
      var content, _ref;
      fetching = false;
      fetched = true;
      content = template.content({
        items: this.collection.toJSON()
      });
      return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template['slide_' + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    detail: function(event, data, $tr) {
      var detailTpl, dhcpData, dhcpId;
      dhcpId = data.id;
      dhcpData = this.collection.get(dhcpId).toJSON();
      detailTpl = template.detail_info;
      return this.manager.setDetail($tr, detailTpl(dhcpData));
    },
    getSlides: function() {
      return {
        "delete": function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selectedId = checked[0].data.id;
          } else {
            data.selectedCount = checkedAmount;
          }
          return this.manager.setSlide(tpl(data));
        },
        'create': function(tpl) {
          var data, selectedType;
          data = {
            dhcp: {}
          };
          selectedType = 0;
          data.dhcp.netbiosTypes = [
            {
              id: "default",
              value: lang.PROP.VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE_NOT_SPECIFIED,
              selected: selectedType === 0
            }, {
              id: 1,
              value: 1,
              selected: selectedType === 1
            }, {
              id: 2,
              value: 2,
              selected: selectedType === 2
            }, {
              id: 4,
              value: 4,
              selected: selectedType === 4
            }, {
              id: 8,
              value: 8,
              selected: selectedType === 8
            }
          ];
          this.manager.setSlide(tpl(data));
          this.manager.$el.find("#property-amazon-dns").change((function(_this) {
            return function(e) {
              return _this.onChangeAmazonDns(e);
            };
          })(this));
          this.manager.$el.find('.multi-input').on('ADD_ROW', (function(_this) {
            return function(e) {
              return _this.processParsley(e);
            };
          })(this));
          this.manager.$el.find(".control-group .input").change((function(_this) {
            return function(e) {
              return _this.onChangeDhcpOptions(e);
            };
          })(this));
          this.manager.$el.find('.formart_toolbar_modal').on('OPTION_CHANGE REMOVE_ROW', (function(_this) {
            return function(e) {
              return _this.onChangeDhcpOptions(e);
            };
          })(this));
          this.manager.$el.find('#property-domain-server').on('ADD_ROW REMOVE_ROW', updateAmazonCB);
          return updateAmazonCB();
        }
      };
    },
    processParsley: function(event) {
      $(event.currentTarget).find('input').last().removeClass('parsley-validated').removeClass('parsley-error').next('.parsley-error-list').remove();
      return $(".parsley-error-list").remove();
    },
    doAction: function(action, checked) {
      return this[action] && this[action](this.validate(action), checked);
    },
    create: function(invalid, checked) {
      var afterCreated, data, domainNameServers, validate;
      if (!invalid) {
        domainNameServers = mapFilterInput("#property-domain-server .input");
        if ($("#property-amazon-dns").is(":checked")) {
          domainNameServers.push("AmazonProvidedDNS");
        }
        data = {
          "domain-name": mapFilterInput("#property-dhcp-domain .input"),
          "domain-name-servers": domainNameServers,
          "ntp-servers": mapFilterInput("#property-ntp-server .input"),
          "netbios-name-servers": mapFilterInput("#property-netbios-server .input"),
          "netbios-node-type": [parseInt($("#property-netbios-type .selection").html(), 10) || 0]
        };
        validate = function(value, key) {
          if (key === 'netbios-node-type') {
            return false;
          }
          if (value.length < 1) {
            return false;
          } else {
            return true;
          }
        };
        if (!_.some(data, validate)) {
          this.manager.error("Please provide at least one field.");
          return false;
        }
        if (data['netbios-node-type'][0] === 0) {
          data['netbios-node-type'] = [];
        }
        this.switchAction('processing');
        afterCreated = this.afterCreated.bind(this);
        return this.collection.create(data).save().then(afterCreated, afterCreated);
      }
    },
    "delete": function(invalid, checked) {
      var afterDeleted, that;
      that = this;
      deleteCount += checked.length;
      this.switchAction('processing');
      afterDeleted = that.afterDeleted.bind(that);
      return _.each(checked, (function(_this) {
        return function(data) {
          return _this.collection.findWhere({
            id: data.data.id
          }).destroy().then(afterDeleted, afterDeleted);
        };
      })(this));
    },
    afterDeleted: function(result) {
      deleteCount--;
      if (result.error) {
        deleteErrorCount++;
      }
      if (deleteCount === 0) {
        if (deleteErrorCount > 0) {
          notification('error', sprintf(lang.NOTIFY.FAILED_TO_DELETE_DHCP, deleteErrorCount, result.awsResult));
        } else {
          notification('info', lang.NOTIFY.DELETE_SUCCESSFULLY);
        }
        this.manager.unCheckSelectAll();
        deleteErrorCount = 0;
        return this.manager.cancel();
      }
    },
    afterCreated: function(result) {
      if (result.error) {
        this.manager.error("Create failed because of: " + (result.awsResult || result.msg));
        this.switchAction();
        return false;
      }
      notification('info', lang.NOTIFY.DHCP_CREATED_SUCCESSFULLY);
      return this.manager.cancel();
    },
    validate: function(action) {
      switch (action) {
        case 'create':
          return this.manager.$el.find(".parsley-error").size() > 0;
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    onChangeAmazonDns: function() {
      var $inputbox, $rows, allowRows, useAmazonDns;
      useAmazonDns = $("#property-amazon-dns").is(":checked");
      allowRows = useAmazonDns ? 3 : 4;
      $inputbox = $("#property-domain-server").attr("data-max-row", allowRows);
      $rows = $inputbox.children();
      $inputbox.toggleClass("max", $rows.length >= allowRows);
      return null;
    },
    onChangeDhcpOptions: function(event) {
      if (event && !$(event.currentTarget).closest('[data-bind=true]').parsley('validate')) {

      }
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_DHCP_IN_AREA, regionName),
        slideable: true,
        resourceName: lang.PROP.RESOURCE_NAME_DHCP,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.PROP.LBL_CREATE_DHCP_OPTIONS_SET
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.PROP.LBL_DELETE
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "200px",
            name: lang.PROP.NAME
          }, {
            sortable: false,
            width: "480px",
            name: lang.PROP.LBL_OPTIONS
          }, {
            sortable: false,
            width: "56px",
            name: lang.PROP.LBL_DETAIL
          }
        ]
      };
    }
  });
  return DhcpManager;
});

define('dhcp',["CloudResources", 'constant', 'combo_dropdown', 'dhcp_manage', 'UI.modalplus', 'toolbar_modal', 'i18n!/nls/lang.js', 'component/awscomps/DhcpTpl'], function(CloudResources, constant, comboDropdown, dhcpManager, modalPlus, toolbarModal, lang, template) {
  var DhcpDropdown, fetched;
  fetched = false;
  DhcpDropdown = Backbone.View.extend({
    constructor: function(options) {
      var option, selection;
      this.resModel = options != null ? options.resModel : void 0;
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DHCP, Design.instance().region());
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(this.collection, 'update', this.render);
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      option = {
        manageBtnValue: lang.PROP.VPC_MANAGE_DHCP,
        filterPlaceHolder: lang.PROP.VPC_FILTER_DHCP,
        resourceName: lang.PROP.RESOURCE_NAME_DHCP
      };
      this.dropdown = new comboDropdown(option);
      selection = template.selection({
        isDefault: false,
        isAuto: true
      });
      this.dropdown.setSelection(selection);
      this.dropdown.on('open', this.show, this);
      this.dropdown.on('manage', this.manageDhcp, this);
      this.dropdown.on('change', this.setDHCP, this);
      this.dropdown.on('filter', this.filter, this);
      return this;
    },
    initialize: function(options) {
      return _.extend(this, options);
    },
    credChanged: function() {
      var _ref;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      return this.collection.fetchForce().then((function(_this) {
        return function() {
          return _this.render();
        };
      })(this));
    },
    remove: function() {
      this.isRemoved = true;
      return Backbone.View.prototype.remove.call(this);
    },
    render: function() {
      if (!fetched) {
        this.renderLoading();
        this.collection.fetch().then((function(_this) {
          return function() {
            return _this.render();
          };
        })(this));
        fetched = true;
        return false;
      }
      return this.renderDropdown();
    },
    show: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        return this.render();
      } else {
        return this.renderNoCredential();
      }
    },
    renderNoCredential: function() {
      return this.dropdown.render('nocredential').toggleControls(false);
    },
    renderLoading: function() {
      return this.dropdown.render('loading').toggleControls(false);
    },
    renderDropdown: function(keys) {
      var content, data, datas, selected, _ref;
      selected = (_ref = this.resModel) != null ? _ref.toJSON().dhcp.appId : void 0;
      data = this.collection.toJSON();
      datas = {
        isRuntime: false,
        keys: data
      };
      if (selected) {
        _.each(data, function(key) {
          if (key.id === selected) {
            key.selected = true;
          }
        });
      } else {
        datas.auto = true;
      }
      if (selected === "") {
        datas.auto = true;
      } else if (selected && selected === 'default') {
        datas["default"] = true;
      }
      if (keys) {
        datas.keys = keys;
        datas.hideDefaultNoKey = true;
      }
      if (Design.instance() && (Design.instance().modeIsApp() || Design.instance().modeIsAppEdit())) {
        datas.isRunTime = true;
      }
      content = template.keys(datas);
      this.dropdown.toggleControls(true);
      return this.dropdown.setContent(content);
    },
    filter: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.collection.toJSON(), function(data) {
        return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.renderDropdown(hitKeys);
      } else {
        return this.renderDropdown();
      }
    },
    setDHCP: function(e) {
      var targetDhcp, targetModel;
      if (e === '@auto') {
        targetDhcp = {
          id: ''
        };
      } else if (e === '@default') {
        targetDhcp = {
          id: "default"
        };
      } else {
        targetModel = this.collection.findWhere({
          id: e
        });
        targetDhcp = targetModel.toJSON();
      }
      this.resModel.toJSON().dhcp.dhcpOptionsId = targetDhcp.id;
      return this.trigger('change', targetDhcp);
    },
    setSelection: function(e) {
      var selection;
      selection = template.selection(e);
      return this.dropdown.setSelection(selection);
    },
    manageDhcp: function() {
      return new dhcpManager().render();
    }
  });
  return DhcpDropdown;
});

define('component/awscomps/KpDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <label for=\"create-kp-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_NAME", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" id=\"create-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\" autofocus>\n    </div>\n    <div class=\"after-create hide\">";
  stack1 = helpers.i18n.call(depth0, "PROP.KP_CREATED_NEED_TO_DOWNLOAD", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"download action\" style=\"display:none;\">\n        <a class=\"btn btn-blue do-action pulse\" data-action=\"download\" id=\"download-kp\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n        <button class=\"btn btn-silver cancel\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CLOSE", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.KP_CONFIRM_DELETE_3", (depth0 && depth0.selecteKeyName), {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.KP_CONFIRM_DELETE_2", (depth0 && depth0.selectedCount), {hash:{},data:data}));
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_CONFIRM_DELETE_1", {hash:{},data:data}))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-import\" data-bind=\"true\">\n    <label for=\"import-kp-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_NAME", {hash:{},data:data}))
    + "</label>\n    <input class=\"input\" type=\"text\" id=\"import-kp-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"allow alphanumber, _ or - up to 255 characters\">\n    <div class=\"import-zone\">\n\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORT", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"ready action\" style=\"display:none;\">\n        <button class=\"btn btn-blue do-action\" data-action=\"import\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORT", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_IMPORTING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_import=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"upload-kp-component drop-zone\">\n    <p class=\"upload-stuff\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "LBL_DROP", (depth0 && depth0.type), {hash:{},data:data}))
    + "\n        <label for=\"modal-import\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_SELECT_A_FILE", {hash:{},data:data}))
    + "</label>\n        <span class=\"display-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_OR_PASTE_KEY_CONTENT", {hash:{},data:data}))
    + "</span>\n        <span class=\"display-filled\" style=\"display:none;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.KP_OR_PASTE_TO_UPDATE", {hash:{},data:data}))
    + "</span>\n        <input type=\"file\" id=\"modal-import\">\n    </p>\n    <p class=\"key-content\"></p>\n</div>";
  return buffer;
  };
TEMPLATE.upload=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<textarea autofocus spellcheck=\"false\" class=\"safari-download-textarea input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keypair)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>";
  return buffer;
  };
TEMPLATE.safari_download=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('kp_upload',['component/awscomps/KpDialogTpl', 'backbone', 'jquery'], function(template_modal, Backbone, $) {
  return Backbone.View.extend({
    __data: null,
    events: {
      'paste .upload-kp-component': 'onPaste',
      'change .upload-kp-component': 'hanldeFile',
      'drop .upload-kp-component': 'hanldeFile',
      'dragenter .upload-kp-component': 'addDragoverClass',
      'dragleave .upload-kp-component': 'removeDragoverClass',
      'dragover .upload-kp-component': 'dragoverHandler'
    },
    removeDragoverClass: function(event) {
      return $(event.currentTarget).removeClass('dragover');
    },
    addDragoverClass: function(event) {
      return $(event.currentTarget).addClass('dragover');
    },
    dragoverHandler: function(event) {
      var dt;
      dt = event.originalEvent.dataTransfer;
      if (dt) {
        dt.dropEffect = "copy";
      }
      event.stopPropagation();
      event.preventDefault();
      return null;
    },
    save: function(data) {
      if (!data) {
        return;
      }
      this.__data = data;
      this.$('.drop-zone').addClass('filled');
      this.$('.key-content').text(data);
      return this.trigger('load', data);
    },
    onPaste: function(event) {
      var pasteData;
      pasteData = event.originalEvent.clipboardData.getData('text/plain');
      return this.save(pasteData);
    },
    hanldeFile: function(evt) {
      var files;
      evt.stopPropagation();
      evt.preventDefault();
      this.$(".drop-zone").removeClass("dragover");
      this.$("#import-json-error").html("");
      evt = evt.originalEvent;
      files = (evt.dataTransfer || evt.target).files;
      if (!files || !files.length) {
        return;
      }
      this.__reader.readAsText(files[0]);
      return null;
    },
    initialize: function(options) {
      var reader, that;
      that = this;
      that.type = options && options.type || 'public key';
      reader = this.__reader = new FileReader();
      reader.onload = function(evt) {
        that.save(reader.result);
        return null;
      };
      reader.onerror = function() {
        that.trigger('error');
        return null;
      };
      return null;
    },
    getData: function() {
      return this.__data;
    },
    render: function() {
      var data;
      data = {
        type: this.type
      };
      this.$el.html(template_modal.upload(data));
      return this;
    }
  });
});

define('kp_manage',['toolbar_modal', 'UI.modalplus', 'component/awscomps/KpDialogTpl', 'kp_upload', 'backbone', 'jquery', 'constant', 'JsonExporter', 'CloudResources', 'i18n!/nls/lang.js', 'UI.notification'], function(toolbar_modal, modalplus, template, upload, Backbone, $, constant, JsonExporter, CloudResources, lang) {
  var download;
  download = JsonExporter.download;
  return Backbone.View.extend({
    __needDownload: false,
    __upload: null,
    __import: '',
    __mode: 'normal',
    needDownload: function() {
      if (arguments.length === 1) {
        this.__needDownload = arguments[0];
        if (arguments[0] === false) {
          this.M$('.cancel').prop('disabled', false);
        }
      } else {
        if (this.__needDownload) {
          notification('warning', lang.NOTIFY.YOU_MUST_DOWNLOAD_THE_KEYPAIR);
        }
      }
      return this.__needDownload;
    },
    denySlide: function() {
      return !this.needDownload();
    },
    getRegion: function() {
      var region;
      region = Design.instance().get('region');
      return constant.REGION_SHORT_LABEL[region];
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_KP_IN_AREA, regionName),
        slideable: _.bind(that.denySlide, that),
        resourceName: lang.PROP.RESOURCE_NAME_KEYPAIR,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.IDE.COMPONENT_CREATE_KEYPAIR
          }, {
            icon: 'import',
            type: 'import',
            name: lang.IDE.COMPONENT_IMPORT_KEY_PAIR
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.IDE.COMPONENT_DELETE_KEY_PAIR
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "40%",
            name: lang.IDE.COMPONENT_KEY_PAIR_COL_NAME
          }, {
            sortable: false,
            name: lang.IDE.COMPONENT_KEY_PAIR_COL_FINGERPRINT
          }
        ]
      };
    },
    initModal: function() {
      new toolbar_modal(this.getModalOptions());
      this.modal.on('close', function() {
        return this.remove();
      }, this);
      this.modal.on('slidedown', this.renderSlides, this);
      this.modal.on('action', this.doAction, this);
      return this.modal.on('refresh', this.refresh, this);
    },
    initialize: function(options) {
      var that;
      _.extend(this, options);
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.KP, Design.instance().get("region"));
      this.initModal();
      this.modal.render();
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        that = this;
        this.collection.fetch().then(function() {
          return that.renderKeys();
        });
      } else {
        this.modal.render('nocredential');
      }
      this.collection.on('update', this.renderKeys, this);
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      return this.listenTo(Design.instance().credential(), "change", this.credChanged);
    },
    credChanged: function() {
      this.collection.fetchForce();
      this.modal.renderLoading();
      return this.modal && this.refresh();
    },
    renderKeys: function() {
      var data;
      if (!this.collection.isReady()) {
        return false;
      }
      data = {
        keys: this.collection.toJSON()
      };
      this.modal.setContent(template.keys(data));
      return this;
    },
    __events: {
      'click #kp-create': 'renderCreate',
      'click #kp-import': 'renderImport',
      'click #kp-delete': 'renderDelete',
      'click #kp-refresh': 'refresh',
      'click .cancel': 'cancel'
    },
    downloadKp: function() {
      return this.__downloadKp && this.__downloadKp();
    },
    doAction: function(action, checked) {
      return this[action] && this[action](this.validate(action), checked);
    },
    validate: function(action) {
      switch (action) {
        case 'create':
          return !this.M$('#create-kp-name').parsley('validate');
        case 'import':
          return !this.M$('#import-kp-name').parsley('validate');
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    genDownload: function(name, str) {
      this.__downloadKp = function() {
        var blob, options;
        if ($("body").hasClass("safari")) {
          blob = null;
        } else {
          blob = new Blob([str]);
        }
        if (!blob) {
          options = {
            template: template.safari_download({
              keypair: str
            }),
            title: lang.IDE.TITLE_KEYPAIR_CONTENT,
            disableFooter: true,
            disableClose: true,
            width: '855px',
            height: '473px',
            compact: true
          };
          new modalplus(options);
          $('.safari-download-textarea').select();
          return;
        }
        return download(blob, name);
      };
      return this.__downloadKp;
    },
    genDeleteFinish: function(times) {
      var error, finHandler, success, that;
      success = [];
      error = [];
      that = this;
      finHandler = _.after(times, function() {
        that.cancel();
        if (success.length === 1) {
          console.debug(success);
          notification('info', sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].attributes.keyName));
          return;
        } else if (success.length > 1) {
          notification('info', sprintf(lang.NOTIFY.SELECTED_KEYPAIRS_ARE_DELETED, success.length));
          return;
        }
        if (!that.collection.toJSON().length) {
          that.M$('#t-m-select-all').get(0).checked = false;
        }
        _.each(error, function(s) {
          return console.log(s);
        });
        if (error.length > 0) {
          return notification('error', lang.NOTIFY.FAILED_TO_DELETE_KP);
        }
      });
      return function(res) {
        console.debug(res);
        if (!(res.reason || res.msg)) {
          success.push(res);
        } else {
          error.push(res);
        }
        return finHandler();
      };
    },
    create: function(invalid) {
      var keyName, that;
      that = this;
      if (!invalid) {
        keyName = this.M$('#create-kp-name').val();
        this.switchAction('processing');
        return this.collection.create({
          keyName: keyName
        }).save().then(function(res) {
          that.needDownload(true);
          that.genDownload("" + res.attributes.keyName + ".pem", res.attributes.keyMaterial);
          that.switchAction('download');
          that.M$('.before-create').hide();
          return that.M$('.after-create').find('span').text(res.attributes.keyName).end().show();
        }, function(err) {
          that.modal.error(err.awsResult || err.reason || err.msg);
          return that.switchAction();
        });
      }
    },
    download: function() {
      this.needDownload(false);
      this.__downloadKp && this.__downloadKp();
      return null;
    },
    "delete": function(invalid, checked) {
      var count, onDeleteFinish, that;
      count = checked.length;
      onDeleteFinish = this.genDeleteFinish(count);
      this.switchAction('processing');
      that = this;
      return _.each(checked, (function(_this) {
        return function(c) {
          return _this.collection.findWhere({
            keyName: c.data.name.toString()
          }).destroy().then(onDeleteFinish, onDeleteFinish);
        };
      })(this));
    },
    "import": function(invalid) {
      var keyContent, keyName, that;
      that = this;
      if (!invalid) {
        keyName = this.M$('#import-kp-name').val();
        this.switchAction('processing');
        try {
          keyContent = (typeof Base64 !== "undefined" && Base64 !== null ? Base64.encode : void 0) ? Base64.encode(that.__upload.getData()) : window.btoa(that.__upload.getData());
        } catch (_error) {
          this.modal.error('Key is not in valid OpenSSH public key format');
          that.switchAction('init');
          return;
        }
        return this.collection.create({
          keyName: keyName,
          keyData: keyContent
        }).save().then(function(res) {
          notification('info', sprintf(lang.NOTIFY.XXX_IS_IMPORTED, keyName));
          return that.cancel();
        }, function(err) {
          var msg;
          if (err.awsResult && err.awsResult.indexOf('Length exceeds maximum of 2048') >= 0) {
            msg = 'Length exceeds maximum of 2048';
          } else {
            msg = err.awsResult || err.error_message || err.reason || err.msg;
          }
          that.modal.error(msg);
          return that.switchAction('ready');
        });
      }
    },
    cancel: function() {
      return this.modal.cancel();
    },
    refresh: function() {
      var _ref;
      if ((_ref = this.modal) != null) {
        _ref.render("loading");
      }
      return this.collection.fetchForce().then((function(_this) {
        return function() {
          return _this.renderKeys();
        };
      })(this));
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template["slide_" + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    getSlides: function() {
      var modal, that;
      that = this;
      modal = this.modal;
      return {
        create: function(tpl, checked) {
          return modal.setSlide(tpl);
        },
        "delete": function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selecteKeyName = checked[0].data.name;
          } else {
            data.selectedCount = checkedAmount;
          }
          return modal.setSlide(tpl(data));
        },
        "import": function(tpl, checked) {
          modal.setSlide(tpl);
          that.__upload && that.__upload.remove();
          that.__upload = new upload({
            type: lang.IDE.LBL_PUBLIC_KEY
          });
          that.__upload.on('load', that.afterImport, this);
          return that.M$('.import-zone').html(that.__upload.render().el);
        }
      };
    },
    afterImport: function(result) {
      return this.switchAction('ready');
    }
  });
});

define('component/awscomps/KpTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.keyName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n        "
    + escapeExpression(helpers.i18n.call(depth0, "COMPONENT_SELECT_KEYPAIR", {hash:{},data:data}))
    + "\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    "
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noKey), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRunTime), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <li data-id=\"@no\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_NO_KP", {hash:{},data:data}))
    + "\n        <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_NO_KP", {hash:{},data:data}))
    + "\"></i>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-id=\"@default\" class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultKey), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" tabindex=\"-1\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_DEFAULT_KP", {hash:{},data:data}))
    + "\n        <i class=\"icon-info tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_TIP_DEFAULT_KP", {hash:{},data:data}))
    + "'></i>\n    </li>\n    ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-fingerprint=\""
    + escapeExpression(((stack1 = (depth0 && depth0.keyFingerprint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </li>\n";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideDefaultNoKey), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('kp_dropdown',['Design', 'kp_manage', 'combo_dropdown', 'component/awscomps/KpTpl', 'backbone', 'jquery', 'constant', 'i18n!/nls/lang.js', 'CloudResources'], function(Design, kpManage, comboDropdown, template, Backbone, $, constant, lang, CloudResources) {
  var regions;
  regions = {};
  return Backbone.View.extend({
    showCredential: function() {
      return Design.instance().project().showCredential();
    },
    filter: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.getKey(), function(k) {
        return k.keyName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.renderKeys(hitKeys);
      } else {
        return this.renderKeys();
      }
    },
    getKey: function() {
      var json, that;
      that = this;
      json = this.collection.toJSON();
      if (this.resModel) {
        _.each(json, function(e) {
          if (e.keyName === that.resModel.getKeyName()) {
            return e.selected = true;
          }
        });
      }
      return json;
    },
    setKey: function(name, data) {
      var KpModel;
      if (this.__mode === 'runtime') {
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        if (name === '@no') {
          return KpModel.setDefaultKP('', '');
        } else {
          return KpModel.setDefaultKP(name, data.fingerprint);
        }
      } else {
        if (name === '@default') {
          return this.resModel.setKey('', true);
        } else if (name === '@no') {
          return this.resModel.setKey('');
        } else {
          return this.resModel.setKey(name);
        }
      }
    },
    manageKp: function(event) {
      this.renderModal();
      return false;
    },
    initDropdown: function() {
      var options;
      options = {
        manageBtnValue: lang.PROP.INSTANCE_MANAGE_KP,
        filterPlaceHolder: lang.PROP.INSTANCE_FILTER_KP,
        resourceName: lang.PROP.RESOURCE_NAME_KEYPAIR
      };
      this.dropdown = new comboDropdown(options);
      this.dropdown.on('open', this.show, this);
      this.dropdown.on('manage', this.manageKp, this);
      this.dropdown.on('change', this.setKey, this);
      return this.dropdown.on('filter', this.filter, this);
    },
    initialize: function(options) {
      var credentialId;
      this.resModel = options ? options.resModel : null;
      credentialId = Design.instance().credentialId();
      this.collection = CloudResources(credentialId, constant.RESTYPE.KP, Design.instance().get("region"));
      this.listenTo(this.collection, 'update', this.renderKeys);
      this.listenTo(this.collection, 'change', this.renderKeys);
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      if (!this.resModel) {
        this.__mode = 'runtime';
      }
      return this.initDropdown();
    },
    credChanged: function() {
      var _ref;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      return this.collection.fetchForce().then((function(_this) {
        return function() {
          return _this.renderKeys();
        };
      })(this));
    },
    show: function() {
      var def;
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        def = null;
        if (!regions[Design.instance().get("region")] && this.collection.isReady()) {
          regions[Design.instance().get("region")] = true;
          def = this.collection.fetchForce();
        } else {
          regions[Design.instance().get("region")] = true;
          def = this.collection.fetch();
        }
        return def.then((function(_this) {
          return function() {
            return _this.renderKeys();
          };
        })(this));
      } else {
        return this.renderNoCredential();
      }
    },
    render: function() {
      this.renderDropdown();
      this.el = this.dropdown.el;
      return this;
    },
    renderNoCredential: function() {
      return this.dropdown.render('nocredential').toggleControls(false);
    },
    syncErrorHandler: function(err) {
      return console.error(err);
    },
    renderKeys: function(data) {
      if (!this.collection.isReady()) {
        return false;
      }
      if (data && arguments.length === 1) {
        data = {
          keys: data,
          hideDefaultNoKey: true
        };
      } else {
        data = {
          keys: this.getKey()
        };
      }
      if (this.resModel) {
        if (this.resModel.isNoKey()) {
          data.noKey = true;
        }
        if (this.resModel.isDefaultKey()) {
          data.defaultKey = true;
        }
      }
      data.isRunTime = this.__mode === 'runtime';
      this.dropdown.setContent(template.keys(data));
      this.dropdown.toggleControls(true);
      return this;
    },
    renderDropdown: function() {
      var selection;
      this.data = {
        keyName: this.resModel ? this.resModel.getKeyName() : ""
      };
      if (this.data.keyName === '$DefaultKeyPair') {
        this.data.defaultKey = true;
      } else if (this.data.keyName === lang.PROP.INSTANCE_NO_KP) {
        this.data.noKey = true;
      }
      this.data.isRunTime = this.__mode === 'runtime';
      selection = template.selection(this.data);
      return this.dropdown.setSelection(selection);
    },
    renderModal: function() {
      var that;
      that = this;
      return new kpManage({
        model: that.data
      });
    },
    remove: function() {
      this.dropdown.remove();
      return Backbone.View.prototype.remove.apply(this, arguments);
    }
  }, {
    hasResourceWithDefaultKp: function() {
      var has;
      has = false;
      Design.instance().eachComponent(function(comp) {
        var _ref;
        if ((_ref = comp.type) === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.LC) {
          if (comp.isDefaultKey() && (!comp.get('appId') || comp.type === constant.RESTYPE.LC)) {
            has = true;
            return false;
          }
        }
      });
      return has;
    }
  });
});

define('component/awscomps/SnsTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NONE", {hash:{},data:data}))
    + "</span>";
  return buffer;
  };
TEMPLATE.dropdown_no_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <p><span class=\"icon-tag-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.subCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " sub</span> "
    + escapeExpression(((stack1 = (depth0 && depth0.DisplayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-topic-arn=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"kp-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subCount), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.subCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBSCRIPTIONS", {hash:{},data:data}))
    + "</td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"show-detail\"";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.modal_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-display-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.DisplayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                  ";
  return buffer;
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <div>\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SELECT_TOPIC", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox dd-topic-name\">\n                <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NEW_TOPIC", {hash:{},data:data}))
    + "</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                  <li class=\"item selected new-topic\" data-id=\"@new\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NEW_TOPIC", {hash:{},data:data}))
    + "</li>\n                  ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n\n        </div>\n        <div class=\"create-sns-topic\">\n            <label for=\"create-topic-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.TOPIC_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\" type=\"text\" id=\"create-topic-name\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z0-9,_-]*$\" data-required=\"true\" maxlength=\"255\" placeholder=\"Required. Up to 256 characters\" data-event-trigger=\"false\">\n        </div>\n        <div>\n            <label for=\"create-display-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DISPLAY_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\" type=\"text\" id=\"create-display-name\" maxlength=\"255\" placeholder=\"Required for SMS subscriptions (up to 10 characters)\" data-event-trigger=\"false\">\n        </div>\n        <div>\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox dd-protocol\">\n                <div class=\"selection\">email</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item\" data-id=\"https\">HTTPS</li>\n                    <li class=\"item\" data-id=\"http\">HTTP</li>\n                    <li class=\"item selected\" data-id=\"email\">Email</li>\n                    <li class=\"item\" data-id=\"email-json\">Email-JSON</li>\n                    <li class=\"item\" data-id=\"sms\">SMS</li>\n                    <li class=\"item\" data-id=\"arn\">Application</li>\n                    <li class=\"item\" data-id=\"sqs\">Amazon SQS</li>\n                </ul>\n            </div>\n        </div>\n        <div>\n            <label for=\"create-endpoint\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENDPOINT", {hash:{},data:data}))
    + "</label>\n            <input type=\"text\" class=\"input\" id=\"create-endpoint\" max-length=\"255\" data-required=\"true\" placeholder=\"example@mail.com\" data-event-trigger=\"false\">\n        </div>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"download action\" style=\"display:none;\">\n        <a class=\"btn btn-blue do-action pulse\" data-action=\"download\" id=\"download-kp\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n        <button class=\"btn btn-silver cancel\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CLOSE", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DELETE_SNS_TOPIC_CONFIRM", (depth0 && depth0.selecteKeyName), {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DELETE_SNS_TOPIC_CONFIRM_M", (depth0 && depth0.selectedCount), {hash:{},data:data}));
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.SubscriptionArn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRemovable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </td>\n        </tr>\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <a class=\"icon-delete remove\"></a>\n                    <div class=\"do-remove-panel\">\n                        <button class=\"btn btn-blue btn-small do-remove\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SubscriptionArn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n                        <button class=\"btn btn-link btn-small cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<table class=\"table sns-detail\">\n    <thead>\n        <tr>\n            <th style=\"width: 48px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "</th>\n            <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENDPOINT", {hash:{},data:data}))
    + "</th>\n            <th style=\"wdith: 30%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SUBSCRIPTION_ARN", {hash:{},data:data}))
    + "</th>\n            <th style=\"width: 103px;\"></th>\n        </tr>\n    </thead>\n    <tbody>\n        ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.detail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"combo-dd-no-data\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NO_SNS_TOPIC_IN_XXX", (depth0 && depth0.regionName), {hash:{},data:data}))
    + "</p>\n\n    <a class=\"create-one\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATE_SNS_TOPIC", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.nosns=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('sns_manage',['constant', 'CloudResources', 'toolbar_modal', 'component/awscomps/SnsTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, toolbar_modal, template, lang) {
  return Backbone.View.extend({
    tagName: 'section',
    initCol: function() {
      var region;
      region = Design.instance().region();
      this.subCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SUBSCRIPTION, region);
      this.topicCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.TOPIC, region);
      this.topicCol.on('update', this.processCol, this);
      return this.subCol.on('update', this.processSubUpdate, this);
    },
    processSubUpdate: function() {
      if (!this.M$('.tr-detail').length) {
        return this.processCol();
      }
    },
    processSubCreate: function(newSub) {
      var that, topicArn;
      topicArn = newSub.get('TopicArn');
      that = this;
      return this.M$('.detailed').each(function() {
        if ($(this).data('topicArn') === topicArn) {
          that.detail(null, $(this).data(), $(this));
          return false;
        }
      });
    },
    quickCreate: function() {
      return this.modal.triggerSlide('create');
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_SNS_IN_AREA, regionName),
        classList: 'sns-manage',
        resourceName: lang.IDE.RESOURCE_NAME_SNS,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.PROP.LBL_CREATE_SUBSCRIPTION
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.PROP.LBL_DELETE
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "25%",
            name: lang.PROP.LBL_TOPIC
          }, {
            sortable: true,
            name: lang.PROP.LBL_TOPIC_ARN
          }, {
            sortable: false,
            width: "20%",
            name: lang.PROP.LBL_SUBSCRIPTION
          }
        ]
      };
    },
    initModal: function() {
      new toolbar_modal(this.getModalOptions());
      this.modal.on('close', function() {
        return this.remove();
      }, this);
      this.modal.on('slidedown', this.renderSlides, this);
      this.modal.on('action', this.doAction, this);
      this.modal.on('refresh', this.refresh, this);
      return this.modal.on('detail', this.detail, this);
    },
    detail: function(event, data, $tr) {
      var $trDetail, subModels;
      subModels = this.getSubs(data.topicArn);
      data = _.map(subModels, function(m) {
        var attrs;
        attrs = m.toJSON();
        attrs.isRemovable = m.isRemovable();
        return attrs;
      });
      $trDetail = this.modal.setDetail($tr, template.detail(data));
      return this.processDetail($trDetail, $tr);
    },
    processDetail: function($trDetail, $tr) {
      var that, updateCount;
      that = this;
      updateCount = function() {
        var subCount;
        subCount = $trDetail.find('.sns-detail tbody tr').length;
        $tr.find('.show-detail b').text(subCount);
        if (subCount === 0) {
          return $tr.find('.show-detail').click();
        }
      };
      $trDetail.on('click', '.remove', function() {
        $(this).hide();
        return $trDetail.find('.do-remove-panel').show();
      }).on('click', '.cancel', function() {
        $(this).closest('.do-remove-panel').hide();
        return $trDetail.find('.remove').show();
      }).on('click', '.do-remove', function() {
        var $removeBtn;
        $removeBtn = $(this);
        return that.removeSub($removeBtn.data('id')).then(function() {
          $removeBtn.closest('tr').remove();
          return updateCount();
        });
      });
      return updateCount();
    },
    removeSub: function(subId) {
      var m;
      m = this.subCol.findWhere({
        SubscriptionArn: subId
      });
      return m != null ? m.destroy().then(function(deletedModel) {
        notification('info', lang.NOTIFY.REMOVE_SUBSCRIPTION_SUCCEED);
        return deletedModel;
      }).fail(function(err) {
        notification('error', err.awsResult);
        throw err;
      }) : void 0;
    },
    fetch: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.topicCol.fetch();
        return this.subCol.fetch();
      }
    },
    initialize: function() {
      this.initCol();
      this.initModal();
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this.fetch();
    },
    credChanged: function() {
      var _ref;
      this.topicCol.fetchForce();
      if ((_ref = this.modal) != null) {
        _ref.renderLoading();
      }
      return this.modal && this.refresh();
    },
    doAction: function(action, checked) {
      return this[action] && this[action](this.validate(action), checked);
    },
    validate: function(action) {
      switch (action) {
        case 'create':
          return !this.M$('#create-topic-name').parsley('validateForm');
      }
    },
    genDeleteFinish: function(times) {
      var error, finHandler, success, that;
      success = [];
      error = [];
      that = this;
      finHandler = _.after(times, function() {
        that.modal.cancel();
        if (success.length === 1) {
          notification('info', sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].get('Name')));
        } else if (success.length > 1) {
          notification('info', sprintf(lang.NOTIFY.SELECTED_XXX_SNS_TOPIC_ARE_DELETED, success.length));
        }
        if (!error.length) {
          that.modal.unCheckSelectAll();
        }
        return _.each(error, function(s) {
          return console.log(s);
        });
      });
      return function(res) {
        if (res instanceof Backbone.Model) {
          success.push(res);
        } else {
          error.push(res);
        }
        return finHandler();
      };
    },
    errorHandler: function(awsError) {
      return this.modal.error(awsError.awsResult);
    },
    create: function(invalid) {
      var createSub, displayName, endpoint, protocol, that, topicId, topicModel, topicName;
      if (invalid) {
        return false;
      }
      that = this;
      this.switchAction('processing');
      topicId = this.M$('.dd-topic-name .selected').data('id');
      protocol = this.M$('.dd-protocol .selected ').data('id');
      topicName = this.M$('#create-topic-name').val();
      displayName = this.M$('#create-display-name').val();
      endpoint = this.M$('#create-endpoint').val();
      createSub = function(newTopic) {
        return that.subCol.create({
          TopicArn: newTopic && newTopic.id || topicId,
          Endpoint: endpoint,
          Protocol: protocol
        }).save().then(function(newSub) {
          that.processSubCreate(newSub);
          notification('info', lang.NOTIFY.CREATE_SUBSCRIPTION_SUCCEED);
          return that.modal.cancel();
        }).fail(function(awsError) {
          return that.errorHandler(awsError);
        });
      };
      if (topicId === '@new') {
        return this.topicCol.create({
          Name: topicName,
          DisplayName: displayName
        }).save().then(createSub).fail(function(awsError) {
          return that.errorHandler(awsError);
        });
      } else {
        topicModel = this.topicCol.get(topicId);
        if (displayName === topicModel.get('DisplayName')) {
          return createSub();
        } else {
          return topicModel.update(displayName).then(createSub);
        }
      }
    },
    "delete": function(invalid, checked) {
      var count, onDeleteFinish, that;
      count = checked.length;
      that = this;
      onDeleteFinish = this.genDeleteFinish(count);
      this.switchAction('processing');
      return _.each(checked, function(c) {
        var m;
        m = that.topicCol.get(c.data.id);
        return m != null ? m.destroy().then(onDeleteFinish, onDeleteFinish) : void 0;
      });
    },
    refresh: function() {
      this.subCol.fetchForce();
      return this.topicCol.fetchForce();
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    render: function() {
      this.modal.render();
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.processCol();
      } else {
        this.modal.render('nocredential');
      }
      return this;
    },
    processCol: function(noRender) {
      var data, that;
      that = this;
      if (this.topicCol.isReady() && this.subCol.isReady()) {
        data = this.topicCol.map(function(tModel) {
          var sub, tData;
          tData = tModel.toJSON();
          sub = that.subCol.where({
            TopicArn: tData.id
          });
          tData.sub = sub.map(function(sModel) {
            return sModel.toJSON();
          });
          tData.subCount = tData.sub.length;
          return tData;
        });
        if (!noRender) {
          this.renderList(data);
        }
      }
      return data;
    },
    getSubs: function(topicArn) {
      return this.subCol.where({
        TopicArn: topicArn
      });
    },
    renderList: function(data) {
      return this.modal.setContent(template.modal_list(data));
    },
    renderNoCredential: function() {
      return this.modal.render('nocredential').toggleControls(false);
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template["slide_" + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    getSlides: function() {
      var modal, that;
      that = this;
      modal = this.modal;
      return {
        create: function(tpl, checked) {
          var $allTextBox, processCreateBtn, updateEndpoint, validateRequired;
          modal.setSlide(tpl(this.processCol(true)));
          updateEndpoint = function(protocol) {
            var endPoint, errorMsg, placeholder, selectedProto, type;
            selectedProto = that.M$('.dd-protocol .selected').data('id');
            switch (selectedProto) {
              case "sqs":
                placeholder = lang.PROP.STACK_AMAZON_ARN;
                type = lang.PROP.STACK_SQS;
                errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_AMAZON_SQS_ARN;
                break;
              case "arn":
                placeholder = lang.PROP.STACK_AMAZON_ARN;
                type = lang.PROP.STACK_ARN;
                errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_APPLICATION_ARN;
                break;
              case "email":
                placeholder = lang.PROP.STACK_EXAMPLE_EMAIL;
                type = lang.PROP.STACK_EMAIL;
                errorMsg = lang.IDE.HEAD_MSG_ERR_UPDATE_EMAIL3;
                break;
              case "email-json":
                placeholder = lang.PROP.STACK_EXAMPLE_EMAIL;
                type = lang.PROP.STACK_EMAIL;
                errorMsg = lang.IDE.HEAD_MSG_ERR_UPDATE_EMAIL3;
                break;
              case "sms":
                placeholder = lang.PROP.STACK_E_G_1_206_555_6423;
                type = lang.PROP.STACK_USPHONE;
                errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_PHONE_NUMBER;
                break;
              case "http":
                placeholder = lang.PROP.STACK_HTTP_WWW_EXAMPLE_COM;
                type = lang.PROP.STACK_HTTP;
                errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_URL;
                break;
              case "https":
                placeholder = lang.PROP.STACK_HTTPS_WWW_EXAMPLE_COM;
                type = lang.PROP.STACK_HTTPS;
                errorMsg = lang.PARSLEY.PLEASE_PROVIDE_A_VALID_URL;
            }
            endPoint = that.M$('#create-endpoint');
            endPoint.attr("placeholder", placeholder);
            endPoint.parsley('custom', function(value) {
              if (type && value && (!MC.validate(type, value))) {
                return errorMsg;
              }
            });
            return null;
          };
          updateEndpoint('email');
          that.M$('#create-display-name').parsley('custom', function(value) {
            var selectedProto;
            selectedProto = that.M$('.dd-protocol .selected').data('id');
            if (selectedProto === 'sms' && !value) {
              return lang.IDE.SMS_DISPLAY_NAME_IS_REQUIRED;
            }
            return null;
          });
          that.M$('#create-topic-name').parsley('custom', function(value) {
            if (that.topicCol.where({
              Name: value
            }).length) {
              return lang.IDE.TOPIC_NAME_IS_ALREADY_TAKEN;
            }
            return null;
          });
          $allTextBox = that.M$('.slide-create input[type=text]');
          validateRequired = function() {
            var pass;
            pass = true;
            $allTextBox.each(function() {
              var selectedProto;
              if ($(this).is(':hidden')) {
                return;
              }
              if (this.id === 'create-display-name') {
                selectedProto = that.M$('.dd-protocol .selected').data('id');
                if (selectedProto === 'sms') {
                  if (!this.value.trim().length) {
                    return pass = false;
                  }
                }
              } else {
                if (!this.value.trim().length) {
                  return pass = false;
                }
              }
            });
            return pass;
          };
          processCreateBtn = function(event, showError) {
            var $target;
            $target = event && $(event.currentTarget) || $('#create-topic-name');
            if (validateRequired()) {
              return that.M$('.slide-create .do-action').prop('disabled', false);
            } else {
              return that.M$('.slide-create .do-action').prop('disabled', true);
            }
          };
          $allTextBox.on('keyup', processCreateBtn);
          that.M$('.dd-protocol').off('OPTION_CHANGE').on('OPTION_CHANGE', function(id) {
            updateEndpoint(id);
            return processCreateBtn(null, true);
          });
          return that.M$('.dd-topic-name').off('OPTION_CHANGE').on('OPTION_CHANGE', function(event, id, data) {
            if (id === '@new') {
              return that.M$('.create-sns-topic').show();
            } else {
              that.M$('#create-display-name').val(data.displayName);
              return that.M$('.create-sns-topic').hide();
            }
          });
        },
        "delete": function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selecteKeyName = checked[0].data.name;
          } else {
            data.selectedCount = checkedAmount;
          }
          return modal.setSlide(tpl(data));
        },
        "import": function(tpl, checked) {
          modal.setSlide(tpl);
          that.__upload && that.__upload.remove();
          that.__upload = new upload();
          that.__upload.on('load', that.afterImport, this);
          return that.M$('.import-zone').html(that.__upload.render().el);
        }
      };
    },
    show: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.topicCol.fetch();
        this.subCol.fetch();
        return this.processCol();
      } else {
        return this.renderNoCredential();
      }
    },
    filter: function(keyword) {
      return this.processCol(true, keyword);
    }
  });
});

define('sns_dropdown',['constant', 'CloudResources', 'sns_manage', 'combo_dropdown', 'component/awscomps/SnsTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, snsManage, comboDropdown, template, lang) {
  return Backbone.View.extend({
    tagName: 'section',
    initCol: function() {
      var region;
      region = Design.instance().region();
      this.subCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SUBSCRIPTION, region);
      this.topicCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.TOPIC, region);
      this.listenTo(this.topicCol, 'update', this.processCol);
      this.listenTo(this.topicCol, 'change', this.processCol);
      this.listenTo(this.subCol, 'update', this.processCol);
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      return this.listenTo(Design.instance().credential(), "change", this.credChanged);
    },
    initDropdown: function() {
      var options;
      options = {
        manageBtnValue: lang.PROP.INSTANCE_MANAGE_SNS,
        filterPlaceHolder: lang.PROP.INSTANCE_FILTER_SNS,
        classList: 'sns-dropdown',
        resourceName: lang.PROP.RESOURCE_NAME_SNS
      };
      this.dropdown = new comboDropdown(options);
      this.dropdown.on('open', this.show, this);
      this.dropdown.on('manage', this.manage, this);
      this.dropdown.on('change', this.set, this);
      this.dropdown.on('filter', this.filter, this);
      return this.dropdown.on('quick_create', this.quickCreate, this);
    },
    initialize: function(options) {
      if (options && options.selection) {
        this.selection = options.selection;
      }
      this.initCol();
      this.initDropdown();
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.topicCol.fetch();
        return this.subCol.fetch();
      }
    },
    render: function(needInit) {
      var selection;
      selection = this.selection;
      if (needInit) {
        if (this.topicCol.first()) {
          this.selection = selection = this.topicCol.first().get('Name');
          this.processCol();
          this.trigger('change', this.topicCol.first().id, selection);
        } else {
          selection = template.dropdown_no_selection();
        }
      } else {
        if (!selection) {
          selection = template.dropdown_no_selection();
        }
      }
      this.dropdown.setSelection(selection);
      this.el = this.dropdown.el;
      return this;
    },
    credChanged: function() {
      var _ref;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      return this.topicCol.fetchForce();
    },
    quickCreate: function() {
      return new snsManage().render().quickCreate();
    },
    processCol: function(filter, keyword) {
      var data, len, selection, that;
      that = this;
      if (this.topicCol.isReady() && this.subCol.isReady()) {
        data = this.topicCol.map(function(tModel) {
          var sub, tData;
          tData = tModel.toJSON();
          sub = that.subCol.where({
            TopicArn: tData.id
          });
          tData.sub = sub.map(function(sModel) {
            return sModel.toJSON();
          });
          tData.subCount = tData.sub.length;
          return tData;
        });
        if (filter === true) {
          len = keyword.length;
          data = _.filter(data, function(d) {
            return d.Name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
          });
        }
        selection = this.selection;
        _.each(data, function(d) {
          if (d.Name && d.Name === selection) {
            d.selected = true;
            return null;
          }
        });
        this.renderDropdownList(data, filter);
      }
      return false;
    },
    renderDropdownList: function(data, filter) {
      var region, regionName;
      if (_.isEmpty(data) && !filter) {
        region = Design.instance().region();
        regionName = constant.REGION_SHORT_LABEL[region];
        return this.dropdown.setContent(template.nosns({
          regionName: regionName
        })).toggleControls(true, 'manage').toggleControls(false, 'filter');
      } else {
        return this.dropdown.setContent(template.dropdown_list(data)).toggleControls(true);
      }
    },
    renderNoCredential: function() {
      return this.dropdown.render('nocredential').toggleControls(false);
    },
    show: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.topicCol.fetch();
        this.subCol.fetch();
        if (!this.dropdown.$('.item').length) {
          return this.processCol();
        }
      } else {
        return this.renderNoCredential();
      }
    },
    manage: function() {
      return new snsManage().render();
    },
    set: function(id, data) {
      return this.trigger('change', id, data.name);
    },
    filter: function(keyword) {
      return this.processCol(true, keyword);
    },
    remove: function() {
      this.dropdown.remove();
      return Backbone.View.prototype.remove.apply(this, arguments);
    }
  });
});

define('component/awscomps/SnapshotTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(13, program13, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tagSet), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"manager-content-sub\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " &nbsp;&nbsp;&nbsp;&nbsp;Size: "
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</div>\n    ";
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program7(depth0,data) {
  
  
  return "&lt;No Name&gt;";
  }

function program9(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program11(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\"\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td><div class=\"manager-content-main\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div><span class=\"manager-content-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n    <td>\n        <div class=\"manager-content-main\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.completed), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <span class=\"manager-content-sub\">Started: "
    + escapeExpression(((stack1 = (depth0 && depth0.started)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program4(depth0,data) {
  
  
  return "&lt;No Name&gt;";
  }

function program6(depth0,data) {
  
  
  return "<i class=\"status status-green icon-label\"></i> Completed";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status status-yellow icon-label\"></i> Pending - "
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.selectedId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(helpers.i18n.call(depth0, "PROP.DELETE_SNAPSHOT_2", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETE_SNAPSHOT_3", {hash:{},data:data}));
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETE_SNAPSHOT_1", {hash:{},data:data}));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"domain\" data-ignore=\"true\" placeholder=\"Allow alpha number, _ or - up to 255 characters.\">\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_VOLUME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-volume-choose\"></div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-snapshot-desc-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-snapshot-desc-create' class=\"input\" placeholder=\"Up to 255 characters\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"slide-duplicate\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-source\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SOURCE_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <p id=\"property-snapshot-source\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                </div>\n            </div>\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NEW_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"domain\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-copy\" data-ignore=\"true\">\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-region-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_DESTINATION_REGION", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-region-choose\"></div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-snapshot-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-snapshot-desc' class=\"input\" value=\"[Copied "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " from "
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"duplicate\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DUPLICATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DUPLICATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_duplicate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('snapshotManager',['CloudResources', 'ApiRequest', 'constant', 'combo_dropdown', "UI.modalplus", 'toolbar_modal', "i18n!/nls/lang.js", 'component/awscomps/SnapshotTpl'], function(CloudResources, ApiRequest, constant, combo_dropdown, modalPlus, toolbar_modal, lang, template) {
  var deleteCount, deleteErrorCount, fetched, fetching, regionsMark, snapshotRes;
  fetched = false;
  deleteCount = 0;
  deleteErrorCount = 0;
  fetching = false;
  regionsMark = {};
  snapshotRes = Backbone.View.extend({
    constructor: function() {
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SNAP, Design.instance().region());
      this.listenTo(this.collection, 'update', this.onChange.bind(this));
      this.listenTo(this.collection, 'change', this.onChange.bind(this));
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this;
    },
    credChanged: function() {
      var _ref, _ref1;
      this.collection.fetchForce();
      if ((_ref = this.manager) != null) {
        _ref.renderLoading();
      }
      this.manager && this.refresh();
      return (_ref1 = this.dropdown) != null ? _ref1.render("loading") : void 0;
    },
    onChange: function() {
      this.initManager();
      return this.trigger('datachange', this);
    },
    remove: function() {
      this.isRemoved = true;
      return Backbone.View.prototype.remove.call(this);
    },
    render: function() {
      return this.renderManager();
    },
    renderDropdown: function() {
      var option, selection;
      option = {
        filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_VOLUME,
        resourceName: lang.PROP.RESOURCE_NAME_SNAPSHOT
      };
      this.dropdown = new combo_dropdown(option);
      this.volumes = CloudResources(Design.instance().credentialId(), constant.RESTYPE.VOL, Design.instance().region());
      selection = lang.PROP.VOLUME_SNAPSHOT_SELECT;
      this.dropdown.setSelection(selection);
      this.dropdown.on('open', this.openDropdown, this);
      this.dropdown.on('filter', this.filterDropdown, this);
      this.dropdown.on('change', this.selectSnapshot, this);
      return this.dropdown;
    },
    renderRegionDropdown: function() {
      var option, selection;
      option = {
        filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_REGION
      };
      this.regionsDropdown = new combo_dropdown(option);
      this.regions = _.keys(constant.REGION_LABEL);
      selection = lang.PROP.VOLUME_SNAPSHOT_SELECT_REGION;
      this.regionsDropdown.setSelection(selection);
      this.regionsDropdown.on('open', this.openRegionDropdown, this);
      this.regionsDropdown.on('filter', this.filterRegionDropdown, this);
      this.regionsDropdown.on('change', this.selectRegion, this);
      return this.regionsDropdown;
    },
    openRegionDropdown: function(keySet) {
      var content, currentRegion, data, dataSet;
      currentRegion = Design.instance().get('region');
      data = _.map(this.regions, function(region) {
        return {
          name: constant.REGION_LABEL[region] + " - " + constant.REGION_SHORT_LABEL[region],
          selected: region === currentRegion,
          region: region
        };
      });
      dataSet = {
        isRuntime: false,
        data: data
      };
      if (keySet) {
        dataSet.data = keySet;
        dataSet.hideDefaultNoKey = true;
      }
      content = template.keys(dataSet);
      this.regionsDropdown.toggleControls(false, 'manage');
      this.regionsDropdown.toggleControls(true, 'filter');
      return this.regionsDropdown.setContent(content);
    },
    openDropdown: function(keySet) {
      return this.volumes.fetch().then((function(_this) {
        return function() {
          var content, currentRegion, data, dataSet;
          data = _this.volumes.toJSON();
          currentRegion = Design.instance().get('region');
          data = _.filter(data, function(volume) {
            return volume.category === currentRegion;
          });
          dataSet = {
            isRuntime: false,
            data: data
          };
          if (keySet) {
            dataSet.data = keySet;
            dataSet.hideDefaultNoKey = true;
          }
          content = template.keys(dataSet);
          _this.dropdown.toggleControls(false, 'manage');
          _this.dropdown.toggleControls(true, 'filter');
          return _this.dropdown.setContent(content);
        };
      })(this));
    },
    filterDropdown: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.volumes.toJSON(), function(data) {
        return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.openDropdown(hitKeys);
      } else {
        return this.openDropdown();
      }
    },
    filterRegionDropdown: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.regions, function(data) {
        return data.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.openRegionDropdown(hitKeys);
      } else {
        return this.openRegionDropdown();
      }
    },
    selectSnapshot: function(e) {
      return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
    },
    selectRegion: function(e) {
      return this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
    },
    renderManager: function() {
      var _ref, _ref1;
      this.manager = new toolbar_modal(this.getModalOptions());
      this.manager.on('refresh', this.refresh, this);
      this.manager.on("slidedown", this.renderSlides, this);
      this.manager.on('action', this.doAction, this);
      this.manager.on('close', (function(_this) {
        return function() {
          return _this.manager.remove();
        };
      })(this));
      this.manager.on('checked', this.processDuplicate, this);
      this.manager.render();
      if ((_ref = Design.instance().credential()) != null ? _ref.isDemo() : void 0) {
        if ((_ref1 = this.manager) != null) {
          _ref1.render('nocredential');
        }
        return false;
      }
      return this.initManager();
    },
    processDuplicate: function(event, checked) {
      if (checked.length === 1) {
        return this.M$('[data-btn=duplicate]').prop('disabled', false);
      } else {
        return this.M$('[data-btn=duplicate]').prop('disabled', true);
      }
    },
    refresh: function() {
      fetched = false;
      return this.initManager();
    },
    setContent: function() {
      var content, data, dataSet, _ref;
      fetching = false;
      fetched = true;
      data = this.collection.toJSON();
      _.each(data, function(e, f) {
        if (e.progress === 100) {
          data[f].completed = true;
        }
        if (e.startTime) {
          data[f].started = (new Date(e.startTime)).toString();
        }
        return null;
      });
      dataSet = {
        items: data
      };
      content = template.content(dataSet);
      return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
    },
    initManager: function() {
      var currentRegion, setContent, _ref;
      setContent = this.setContent.bind(this);
      currentRegion = (_ref = Design.instance()) != null ? _ref.get('region') : void 0;
      if (currentRegion && ((!fetched && !fetching) || (!regionsMark[currentRegion]))) {
        fetching = true;
        regionsMark[currentRegion] = true;
        return this.collection.fetchForce().then(setContent, setContent);
      } else if (!fetching) {
        return this.setContent();
      }
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template['slide_' + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    getSlides: function() {
      return {
        'delete': function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selectedName = checked[0].data.name;
          } else {
            data.selectedCount = checkedAmount;
          }
          return this.manager.setSlide(tpl(data));
        },
        'create': function(tpl) {
          var data;
          data = {
            volumes: {}
          };
          this.manager.setSlide(tpl(data));
          this.dropdown = this.renderDropdown();
          return this.manager.$el.find('#property-volume-choose').html(this.dropdown.$el);
        },
        'duplicate': function(tpl, checked) {
          var data;
          data = {};
          data.originSnapshot = checked[0];
          data.region = Design.instance().get('region');
          if (!checked) {
            return;
          }
          this.manager.setSlide(tpl(data));
          this.regionsDropdown = this.renderRegionDropdown();
          this.regionsDropdown.on('change', (function(_this) {
            return function() {
              return _this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
            };
          })(this));
          return this.manager.$el.find('#property-region-choose').html(this.regionsDropdown.$el);
        }
      };
    },
    doAction: function(action, checked) {
      return this["do_" + action] && this["do_" + action]('do_' + action, checked);
    },
    do_create: function(validate, checked) {
      var afterCreated, data, volume;
      volume = this.volumes.findWhere({
        'id': $('#property-volume-choose').find('.selectbox .selection .manager-content-main').data('id')
      });
      if (!volume) {
        return false;
      }
      data = {
        "name": $("#property-snapshot-name-create").val(),
        'volumeId': volume.id,
        'description': $('#property-snapshot-desc-create').val()
      };
      this.switchAction('processing');
      afterCreated = this.afterCreated.bind(this);
      return this.collection.create(data).save().then(afterCreated, afterCreated);
    },
    do_delete: function(invalid, checked) {
      var afterDeleted, that;
      that = this;
      deleteCount += checked.length;
      this.switchAction('processing');
      afterDeleted = that.afterDeleted.bind(that);
      return _.each(checked, (function(_this) {
        return function(data) {
          return _this.collection.findWhere({
            id: data.data.id
          }).destroy().then(afterDeleted, afterDeleted);
        };
      })(this));
    },
    do_duplicate: function(invalid, checked) {
      var afterDuplicate, description, newName, sourceSnapshot, targetRegion;
      sourceSnapshot = checked[0];
      targetRegion = $('#property-region-choose').find('.selectbox .selection .manager-content-main').data('id');
      if ((this.regions.indexOf(targetRegion)) < 0) {
        return false;
      }
      this.switchAction('processing');
      newName = this.manager.$el.find('#property-snapshot-name').val();
      description = this.manager.$el.find('#property-snapshot-desc').val();
      afterDuplicate = this.afterDuplicate.bind(this);
      return this.collection.findWhere({
        id: sourceSnapshot.data.id
      }).copyTo(targetRegion, newName, description).then(afterDuplicate, afterDuplicate);
    },
    afterCreated: function(result, newSnapshot) {
      this.manager.cancel();
      if (result.error) {
        notification('error', sprintf(lang.NOTIFY.CREATE_FAILED_BECAUSE_OF_XXX, result.msg));
        return false;
      }
      return notification('info', lang.NOTIFY.NEW_SNAPSHOT_IS_CREATED_SUCCESSFULLY);
    },
    afterDuplicate: function(result) {
      var currentRegion;
      currentRegion = Design.instance().get('region');
      this.manager.cancel();
      if (result.error) {
        notification('error', sprintf, lang.NOTIFY.DUPLICATE_FAILED_BECAUSE_OF_XXX, result.msg);
        return false;
      }
      if (result.attributes.region === currentRegion) {
        this.collection.add(result);
        return notification('info', lang.NOTIFY.INFO_DUPLICATE_SNAPSHOT_SUCCESS);
      } else {
        this.initManager();
        return notification('info', lang.NOTIFY.INFO_ANOTHER_REGION_DUPLICATE_SNAPSHOT_SUCCESS);
      }
    },
    afterDeleted: function(result) {
      deleteCount--;
      if (result.error) {
        deleteErrorCount++;
      }
      if (deleteCount === 0) {
        if (deleteErrorCount > 0) {
          notification('error', sprintf(lang.NOTIFY.XXX_SNAPSHOT_FAILED_TO_DELETE, deleteErrorCount));
        } else {
          notification('info', lang.NOTIFY.INFO_DELETE_SNAPSHOT_SUCCESSFULLY);
        }
        this.manager.unCheckSelectAll();
        deleteErrorCount = 0;
        return this.manager.cancel();
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_SNAPSHOT_IN_AREA, regionName),
        slideable: true,
        resourceName: lang.PROP.RESOURCE_NAME_SNAPSHOT,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.PROP.CREATE_SNAPSHOT
          }, {
            icon: 'duplicate',
            type: 'duplicate',
            disabled: true,
            name: lang.PROP.LBL_DUPLICATE
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.PROP.LBL_DELETE
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "20%",
            name: lang.PROP.LBL_NAME
          }, {
            sortable: true,
            rowType: 'number',
            width: "10%",
            name: lang.PROP.LBL_CAPACITY
          }, {
            sortable: true,
            rowType: 'datetime',
            width: "40%",
            name: lang.PROP.LBL_STATUS
          }, {
            sortable: false,
            width: "30%",
            name: lang.PROP.LBL_DESC
          }
        ]
      };
    }
  });
  return snapshotRes;
});

define('component/awscomps/RdsPgTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr class=\"item\" data-id=\"\">\n        <td>\n            <div class=\"checkbox\">\n                <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n            </div>\n        </td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupFamily)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    </tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "disabled";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "CONFIRM_DELETE_PARAMETER_GROUP", (depth0 && depth0.selectedId), {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "CONFIRM_DELETE_PARAMETER_GROUP_MULTY", (depth0 && depth0.selectedCount), {hash:{},data:data}));
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                                        <li class=\"item\" data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n                                        ";
  return buffer;
  }

  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_SET_FAMILY", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-family-choose\">\n                        <div class=\"selectbox selectbox-mega\" id=\"property-family\">\n                            <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.families)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                            <div class=\"scroll-wrap\" style=\"height: 160px\">\n                                <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                                <div class=\"scroll-content\">\n                                    <ul class=\"dropdown\" tabindex=\"-1\">\n                                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.families), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n\n            <div class=\"control-group clearfix\">\n                <label for=\"property-dbpg-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-dbpg-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-ignore-regexp=\"^[a-zA-Z][a-zA-Z0-9-]*$\" data-required=\"true\" data-type=\"database\" data-ignore=\"true\" placeholder=\"Begin with a letter; must contain only ASCII letters, digits, and hyphens; and must not end with a hyphen or contain two consecutive hyphens\">\n                </div>\n            </div>\n\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-dbpg-desc-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_SET_DESC", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id='property-dbpg-desc-create' class=\"input\" placeholder=\"Up to 255 characters\" data-required=\"true\" type=\"text\"/>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CLOSE", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"slide-reset\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_CONFIRM_RESET_1", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_CONFIRM_RESET_2", {hash:{},data:data}))
    + "</div>\n        <div class=\"init action\">\n            <button class=\"btn btn-red do-action\" data-action=\"reset\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_RESET", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_RESETTING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_reset=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n                <th width=\"20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ORIGINAL_VALUE", {hash:{},data:data}))
    + "</th>\n                <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n                <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n            ";
  return buffer;
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr id=\"pg-"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <td>\n                    <div class=\"prop_main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        <div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.Source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                    </div>\n                    <div class=\"prop_sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                </td>\n                ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.preview), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                <td>\n                    <div class=\"prop_main\">\n                        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "input", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                    <div class=\"prop_main\">\n                        <div class=\"prop_sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_1", {hash:{},data:data}));
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ApplyType), "dynamic", {hash:{},inverse:self.program(35, program35, data),fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                    </div>\n                </td>\n            </tr>\n        ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <td>\n                        <div class=\"prop_main\" style=\"text-align: center\">\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </div>\n                    </td>\n                ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                "
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                            ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "&lt;engine-default&gt;";
  }

function program12(depth0,data) {
  
  
  return "&lt;empty&gt;";
  }

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                            <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"select3\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.selections), {hash:{},inverse:self.noop,fn:self.programWithDepth(19, program19, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </select>\n                        ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data) {
  
  
  return "<option value=\"<engine-default>\">&lt;engine-default&gt;</option>";
  }

function program19(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                                <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.newValue), {hash:{},inverse:self.programWithDepth(23, program23, data, depth1),fn:self.programWithDepth(20, program20, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n                            ";
  return buffer;
  }
function program20(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.newValue), depth0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program21(depth0,data) {
  
  
  return "selected=\"selected\" ";
  }

function program23(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.ParameterValue), depth0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program24(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <input type=\"text\" class=\"input prop-half-width\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newValue), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AllowedValues), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program27(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.newValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program29(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  }

function program33(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_2", {hash:{},data:data}));
  }

function program35(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_3", {hash:{},data:data}));
  }

function program37(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <button class=\"btn do-action\" id=\"pg-back-to-edit\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_BACK_TO_EDITING", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-blue\" id=\"rds-pg-save\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_APPLY_CHANGES", {hash:{},data:data}))
    + "</button>\n        ";
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <button class=\"btn btn-blue do-action\" data-action=\"preview\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REVIEW_CHANGES_SAVE", {hash:{},data:data}))
    + "</button>\n        ";
  return buffer;
  }

  buffer += "<div class=\"clearfix\" id=\"pg-sort-filter\">\n    <div class=\"pull-left\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_FILTER", {hash:{},data:data}))
    + " <input id=\"pg-filter-parameter-name\" class=\"input\" type=\"text\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_FILTER_BY_NAME", {hash:{},data:data}))
    + "\"/>\n    </div>\n    <div class=\"pull-right\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_SORT_BY", {hash:{},data:data}))
    + "\n        <div class=\"selectbox\" id=\"sort-parameter-name\">\n            <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</div>\n            <ul class=\"dropdown\" tabindex=\"-1\">\n                <li class=\"item selected\" data-id=\"ParameterName\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</li>\n                <li class=\"item\" data-id=\"IsModifiable\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ISMODIFIABLE", {hash:{},data:data}))
    + "</li>\n                <li class=\"item\" data-id=\"ApplyType\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_APPLY_METHOD", {hash:{},data:data}))
    + "</li>\n                <li class=\"item\" data-id=\"Source\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_SOURCE", {hash:{},data:data}))
    + "</li>\n            </ul>\n        </div>\n    </div>\n</div>\n<div id=\"parameter-table\" style=\"height: "
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.height), 310, {hash:{},data:data}))
    + "px\">\n    <table class=\"table\">\n        <thead>\n        <tr>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </tr>\n        </thead>\n        <tbody>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n    </table>\n</div>\n<div class=\"pg-edit-footer clearfix\">\n    <a target=\"_blank\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ParamValuesRef.html\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_VALUE_REFERENCE", {hash:{},data:data}))
    + "</a>\n    <div class=\"init action\" style=\"padding: 10px 0\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(39, program39, data),fn:self.program(37, program37, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"padding: 10px 0;display: none\">\n        <button class=\"btn btn-blue\" id=\"rds-pg-save\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_APPLYING", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_edit=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n            <th width=\"20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ORIGINAL_VALUE", {hash:{},data:data}))
    + "</th>\n            <th width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_PARAMETER_NAME", {hash:{},data:data}))
    + "</th>\n            <th width=\"50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_EDIT_VALUE", {hash:{},data:data}))
    + "</th>\n        ";
  return buffer;
  }

function program5(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr id=\"pg-"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <td>\n                <div class=\"prop_main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                    <div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.Source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                </div>\n                <div class=\"prop_sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            </td>\n            ";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.preview), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <td>\n                <div class=\"prop_main\">\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.noop,fn:self.programWithDepth(14, program14, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "input", {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n                <div class=\"prop_main\">\n                    <div class=\"prop_sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_1", {hash:{},data:data}));
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.ApplyType), "dynamic", {hash:{},inverse:self.program(35, program35, data),fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n                </div>\n            </td>\n        </tr>\n    ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <td>\n                    <div class=\"prop_main\" style=\"text-align: center\">\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </div>\n                </td>\n            ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            "
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.inputType), "select", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "&lt;engine-default&gt;";
  }

function program12(depth0,data) {
  
  
  return "&lt;empty&gt;";
  }

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n                        <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"select3\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ParameterValue), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.selections), {hash:{},inverse:self.noop,fn:self.programWithDepth(19, program19, data, depth0, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </select>\n                    ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data) {
  
  
  return "<option value=\"<engine-default>\">&lt;engine-default&gt;</option>";
  }

function program19(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n                                <option value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.newValue), {hash:{},inverse:self.programWithDepth(23, program23, data, depth1),fn:self.programWithDepth(20, program20, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</option>\n                            ";
  return buffer;
  }
function program20(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.newValue), depth0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program21(depth0,data) {
  
  
  return "selected=\"selected\" ";
  }

function program23(depth0,data,depth2) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth2 && depth2.ParameterValue), depth0, {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program24(depth0,data) {
  
  
  return "selected=\"selected\"";
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <input type=\"text\" class=\"input prop-half-width\" name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.newValue), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.IsModifiable), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AllowedValues), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    ";
  return buffer;
  }
function program27(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.newValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program29(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ParameterValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"prop_sub\">("
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  }

function program33(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_2", {hash:{},data:data}));
  }

function program35(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBPG_APPLY_IMMEDIATELY_3", {hash:{},data:data}));
  }

  buffer += "<table class=\"table\">\n    <thead>\n    <tr>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.preview), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tr>\n    </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.programWithDepth(5, program5, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n</table>";
  return buffer;
  };
TEMPLATE.filter=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('rds_pg',['CloudResources', 'ApiRequest', 'constant', "UI.modalplus", 'combo_dropdown', 'toolbar_modal', "i18n!/nls/lang.js", 'component/awscomps/RdsPgTpl'], function(CloudResources, ApiRequest, constant, modalPlus, combo_dropdown, toolbar_modal, lang, template) {
  var DbpgRes, deleteCount, deleteErrorCount, fetched, fetching, regionsMark;
  fetched = false;
  deleteCount = 0;
  deleteErrorCount = 0;
  fetching = false;
  regionsMark = {};
  DbpgRes = Backbone.View.extend({
    constructor: function(model) {
      if (model) {
        this.resModel = model;
      }
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBPG, Design.instance().region());
      this.listenTo(this.collection, 'update', this.onUpdate.bind(this));
      this.listenTo(this.collection, 'change', this.onUpdate.bind(this));
      this.listenTo(this.collection, 'remove', this.onRemove.bind(this));
      this.listenTo(this.collection, 'add', this.onAdd.bind(this));
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this;
    },
    credChanged: function() {
      var _ref, _ref1;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      if ((_ref1 = this.manager) != null) {
        _ref1.renderLoading();
      }
      this.manager && this.refresh();
      return this.collection.fetchForce();
    },
    onUpdate: function() {
      this.initManager();
      return this.trigger('datachange', this);
    },
    onAdd: function() {
      return this.initDropdown();
    },
    onRemove: function() {
      var _ref;
      this.initDropdown();
      if (this.resModel && !(this.collection.get(this.resModel.get('pgName')))) {
        this.resModel.setDefaultParameterGroup(this.resModel.get('engineVersion'));
      }
      return (_ref = this.dropdown) != null ? _ref.setSelection(this.resModel.get('pgName')) : void 0;
    },
    remove: function() {
      return Backbone.View.prototype.remove.call(this);
    },
    render: function() {
      return this.renderManager();
    },
    enableCreate: function() {
      return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
    },
    selectRegion: function() {
      return this.manager.$el.find('[data-action="reset"]').prop('disabled', false);
    },
    renderManager: function() {
      var _ref, _ref1;
      this.manager = new toolbar_modal(this.getModalOptions());
      this.manager.on('refresh', this.refresh, this);
      this.manager.on("slidedown", this.renderSlides, this);
      this.manager.on('slideup', this.slideDown, this);
      this.manager.on('action', this.doAction, this);
      this.manager.on('close', (function(_this) {
        return function() {
          _this.manager.remove();
          return _this.collection.remove();
        };
      })(this));
      this.manager.on('checked', this.processReset, this);
      this.manager.render();
      if ((_ref = Design.instance().credential()) != null ? _ref.isDemo() : void 0) {
        if ((_ref1 = this.manager) != null) {
          _ref1.render('nocredential');
        }
        return false;
      }
      return this.initManager();
    },
    initManager: function() {
      var currentRegion, setContent;
      setContent = this.setContent.bind(this);
      currentRegion = Design.instance().get('region');
      if ((!fetched && !fetching) || (!regionsMark[currentRegion])) {
        fetching = true;
        regionsMark[currentRegion] = true;
        return this.collection.fetchForce().then(setContent, setContent);
      } else if (!fetching) {
        return this.setContent();
      }
    },
    processReset: function(event, checked) {
      var allNotDefault, that;
      if (checked.length === 1 && !this.collection.findWhere({
        id: checked[0].data.id
      }).isDefault()) {
        this.M$('[data-btn=reset],[data-btn=edit]').prop('disabled', false);
      } else {
        this.M$('[data-btn=reset],[data-btn=edit]').prop('disabled', true);
      }
      that = this;
      allNotDefault = _.every(checked, function(e) {
        var val;
        val = !that.collection.findWhere({
          id: e.data.id
        }).isDefault();
        return val;
      });
      if (checked.length >= 1 && allNotDefault) {
        return window.setTimeout(function() {
          return that.M$('[data-btn=delete]').prop('disabled', false);
        }, 1);
      } else {
        return window.setTimeout(function() {
          return that.M$('[data-btn=delete]').prop('disabled', true);
        }, 1);
      }
    },
    refresh: function() {
      fetched = false;
      return this.initManager();
    },
    setContent: function() {
      var content, data, dataSet, _ref;
      fetching = false;
      fetched = true;
      data = this.collection.toJSON();
      _.each(data, function(e) {
        if (e.DBParameterGroupName.indexOf("default.") === 0) {
          e.isDefault = true;
          return e;
        }
      });
      dataSet = {
        items: data
      };
      content = template.content(dataSet);
      return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template['slide_' + which];
      $(".slidebox .content").removeAttr('style');
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    slideDown: function(param, checked) {
      var parameters, target;
      if (param === "edit" && checked.length === 1) {
        target = this.collection.findWhere({
          id: checked[0].data.id
        });
        parameters = target.getParameters();
        return parameters.fetch().then(function(result) {
          return _.each(result.models, function(e) {
            if (e.has("newValue")) {
              return e.unset("newValue");
            }
          });
        });
      }
    },
    getSlides: function() {
      return {
        'delete': function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selectedId = checked[0].data.id;
          } else {
            data.selectedCount = checkedAmount;
          }
          return this.manager.setSlide(tpl(data));
        },
        'create': function(tpl) {
          var that;
          this.families = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBENGINE, Design.instance().get("region"));
          that = this;
          return this.families.fetch().then(function() {
            var data, families;
            families = _.uniq(_.pluck(that.families.toJSON(), "DBParameterGroupFamily"));
            data = {
              families: families
            };
            that.manager.setSlide(tpl(data));
            return $("#property-dbpg-name-create").keyup(function() {
              var disableCreate;
              disableCreate = !$(this).val();
              return that.manager.$el.find('[data-action="create"]').prop('disabled', disableCreate);
            });
          });
        },
        'edit': function(tpl, checked, option) {
          var parameters, target, that;
          if (!checked) {
            return false;
          }
          that = this;
          target = this.collection.findWhere({
            id: checked[0].data.id
          });
          parameters = target.getParameters();
          if (!option) {
            that.manager.setSlide(template.loading());
          }
          return parameters.fetch().then(function(result) {
            if (result.error) {
              that.manager.cancel();
              notification('error', result.awsResult || result.msg);
            }
            that.renderEditTpl(parameters, tpl, option);
            $(".slidebox .content").css({
              "width": "100%",
              "margin-top": "0px"
            });
            return that.bindEditEvent(parameters, tpl, option);
          });
        },
        'reset': function(tpl, checked) {
          var data;
          data = {
            name: checked[0].data.id
          };
          if (!checked) {
            return;
          }
          return this.manager.setSlide(tpl(data));
        }
      };
    },
    renderEditTpl: function(parameters, tpl, option) {
      var data, isMixedValue, isNumberString, that;
      that = this;
      data = parameters.toJSON ? parameters.toJSON() : parameters;
      isNumberString = function(e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      };
      isMixedValue = function(e) {
        var isMixed, tempArray;
        isMixed = false;
        tempArray = e.split(",");
        _.each(tempArray, function(value) {
          var range;
          range = value.split('-');
          if (range.length === 2 && isNumberString(range[0]) && isNumberString(range[1])) {
            isMixed = true;
            return null;
          }
        });
        return isMixed;
      };
      _.each(data, function(e) {
        var _ref;
        if (((_ref = e.AllowedValues) != null ? _ref.split(',').length : void 0) > 1 && !isMixedValue(e.AllowedValues)) {
          e.inputType = "select";
          e.selections = e.AllowedValues.split(",");
        } else {
          e.inputType = "input";
        }
      });
      if (option != null ? option.sort : void 0) {
        data = _.sortBy(data, function(e) {
          var s;
          s = e.ParameterName;
          if (option.sort === "ParameterName") {
            s = e.ParameterName;
          }
          if (option.sort === 'IsModifiable') {
            s = e.IsModifiable;
          }
          if (option.sort === "ApplyType") {
            s = e.ApplyType;
          }
          if (option.sort === "Source") {
            s = e.Source;
          }
          return s;
        });
        $("#parameter-table").html(template.filter({
          data: data
        }));
      }
      if (option != null ? option.filter : void 0) {
        data = _.filter(data, function(e) {
          return (e.ParameterName.toLowerCase().indexOf(option.filter.toLowerCase())) > -1;
        });
        $("#parameter-table").html(template.filter({
          data: data
        }));
      }
      if ((option != null ? option.filter : void 0) || (option != null ? option.sort : void 0)) {
        return false;
      }
      console.log("Rendering....");
      that.manager.setSlide(tpl({
        data: data,
        height: $('.table-head-fix.will-be-covered>div').height() - 76
      }));
      $(".slidebox").css('max-height', "none");
      this.manager.on("slideup", function() {
        return $('.slidebox').removeAttr("style");
      });
      return $(window).on('resize', function() {
        return $("#parameter-table").height($('.table-head-fix.will-be-covered>div').height() - 67).find(".scrollbar-veritical-thumb").removeAttr("style");
      });
    },
    bindFilter: function(parameters, tpl) {
      var filter, sortType, that, _ref, _ref1;
      that = this;
      sortType = (_ref = $("#sort-parameter-name").find(".item.selected")) != null ? (_ref1 = _ref.data()) != null ? _ref1.id : void 0 : void 0;
      filter = $("#pg-filter-parameter-name");
      filter.off('change').on('change', function() {
        var checked, val;
        val = $(this).val();
        checked = [
          {
            data: {
              id: parameters.groupModel.id
            }
          }
        ];
        if (that.filterDelay) {
          window.clearTimeout(that.filterDelay);
        }
        that.filterDelay = window.setTimeout(function() {
          return (that.getSlides().edit.bind(that))(template.slide_edit, checked, {
            filter: val,
            sort: sortType
          });
        }, 200);
        return null;
      });
      return $("#sort-parameter-name").on('OPTION_CHANGE', function(event, value, data) {
        sortType = (data != null ? data.id : void 0) || value;
        return filter.trigger('change');
      });
    },
    bindEditEvent: function(parameters, tpl, option) {
      var getChange, that;
      that = this;
      getChange = function() {
        var changeArray;
        changeArray = [];
        parameters.filter(function(e) {
          if (e.has('newValue') && (e.get("newValue") !== e.get("ParameterValue"))) {
            return changeArray.push(e.toJSON());
          }
        });
        return changeArray;
      };
      if (getChange().length) {
        $("[data-action='preview']").prop('disabled', false);
      }
      if (!option) {
        that.bindFilter(parameters, tpl);
      }
      if (!option) {
        $("#pg-filter-parameter-name").keyup(function() {
          return $(this).trigger('change');
        });
      }
      _.each(parameters.models, function(e) {
        var onChange;
        onChange = function() {
          $("[data-action='preview']").prop('disabled', false);
          if (this.value === "<engine-default>" || (this.value === "" && !e.get("ParameterValue"))) {
            e.unset('newValue');
          }
          if (e.isValidValue(this.value) || this.value === "" || (e.isFunctionValue(this.value) && !e.isNumber(this.value))) {
            $(this).removeClass("parsley-error");
            if (this.value !== "") {
              return e.set('newValue', this.value);
            }
          } else {
            return $(this).addClass("parsley-error");
          }
        };
        if (e.attributes.IsModifiable) {
          $(".slidebox").on('change', "[name='" + e.attributes.ParameterName + "']", onChange);
          return $(".slidebox").on('keyup', "[name='" + e.attributes.ParameterName + "']", onChange);
        }
      });
      if (!option) {
        return $("[data-action='preview']").click(function() {
          var data;
          data = getChange();
          _.each(data, function(e) {
            var _ref;
            if (((_ref = e.AllowedValues) != null ? _ref.split(',').length : void 0) > 1) {
              e.inputType = 'select';
              e.selections = e.AllowedValues.split(',');
            } else {
              e.inputType = 'input';
            }
          });
          that.manager.setSlide(tpl({
            data: data,
            preview: true
          }));
          $("#parameter-table").height($('.table-head-fix.will-be-covered>div').height() - 67).find(".scrollbar-veritical-thumb").removeAttr("style");
          $("#rds-pg-save").click(function() {
            return that.modifyParams(parameters, getChange());
          });
          return $("#pg-back-to-edit").click(function() {
            var checked;
            checked = [
              {
                data: {
                  id: parameters.groupModel.id
                }
              }
            ];
            return (that.getSlides().edit.bind(that))(tpl, checked);
          });
        });
      }
    },
    modifyParams: function(parameters, change) {
      var afterModify, changeMap;
      changeMap = {};
      _.each(change, function(e) {
        changeMap[e.ParameterName] = e.newValue;
        return null;
      });
      _.each(parameters.models, function(d) {
        return d.unset('newValue');
      });
      afterModify = this.afterModify.bind(this);
      this.switchAction('processing');
      return parameters.groupModel.modifyParams(changeMap).then(afterModify, afterModify);
    },
    afterModify: function(result) {
      if ((result != null ? result.error : void 0)) {
        notification('error', sprintf(lang.NOTIFY.PARAMETER_GROUP_UPDATED_FAILED, (result != null ? result.awsResult : void 0) || (result != null ? result.awsErrorCode : void 0) || (result != null ? result.msg : void 0)));
        this.switchAction();
        return false;
      }
      notification('info', lang.NOTIFY.PARAMETER_GROUP_IS_UPDATED);
      return this.manager.cancel();
    },
    doAction: function(action, checked) {
      return this["do_" + action] && this["do_" + action]('do_' + action, checked);
    },
    do_create: function() {
      var afterCreated, data;
      if (!(($('#property-dbpg-name-create').parsley('validate')) && ($('#property-dbpg-desc-create').parsley('validate')))) {
        return false;
      }
      data = {
        "DBParameterGroupName": $("#property-dbpg-name-create").val(),
        'DBParameterGroupFamily': $("#property-family .selection").html().trim(),
        'Description': $('#property-dbpg-desc-create').val()
      };
      this.switchAction('processing');
      afterCreated = this.afterCreated.bind(this);
      return this.collection.create(data).save().then(afterCreated, afterCreated);
    },
    do_delete: function(invalid, checked) {
      var afterDeleted, that;
      that = this;
      deleteCount += checked.length;
      this.switchAction('processing');
      afterDeleted = that.afterDeleted.bind(that);
      return _.each(checked, (function(_this) {
        return function(data) {
          return _this.collection.findWhere({
            id: data.data.id
          }).destroy().then(afterDeleted, afterDeleted);
        };
      })(this));
    },
    do_edit: function(invalid, checked) {

      /*
       */
    },
    do_reset: function(invalid, checked) {
      var afterReset, sourceDbpg;
      sourceDbpg = checked[0];
      this.switchAction('processing');
      afterReset = this.afterReset.bind(this);
      return this.collection.findWhere({
        id: sourceDbpg.data.id
      }).resetParams().then(afterReset, afterReset);
    },
    afterCreated: function(result) {
      this.manager.cancel();
      if (result.error) {
        notification('error', sprintf(lang.NOTIFY.CREATE_FAILED_BECAUSE_OF_XXX, result.msg));
        return false;
      }
      return notification('info', lang.NOTIFY.NEW_RDS_PARAMETER_GROUP_IS_CREATED_SUCCESSFULLY);
    },
    afterReset: function(result) {
      var currentRegion;
      currentRegion = Design.instance().get('region');
      this.manager.cancel();
      if (result.error) {
        notification('error', result.awsResult);
        return false;
      }
      return notification('info', lang.NOTIFY.RDS_PARAMETER_GROUP_IS_RESET_SUCCESSFULLY);
    },
    afterDeleted: function(result) {
      deleteCount--;
      if (result.error) {
        deleteErrorCount++;
      }
      if (deleteCount === 0) {
        if (deleteErrorCount > 0) {
          this.manager.error(result.awsResult || sprintf(lang.IDE.RDS_DELETE_DB_PG_FAILED, deleteErrorCount));
          this.switchAction();
          deleteErrorCount = 0;
          return null;
        } else {
          notification('info', lang.NOTIFY.DELETE_SUCCESSFULLY);
          this.manager.unCheckSelectAll();
          deleteErrorCount = 0;
          return this.manager.cancel();
        }
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    renderDropdown: function() {
      var option, that;
      that = this;
      option = {
        manageBtnValue: lang.PROP.VPC_MANAGE_RDS_PG,
        filterPlaceHolder: lang.PROP.VPC_FILTER_RDS_PG,
        resourceName: lang.PROP.RESOURCE_NAME_PARAMETER_GROUP
      };
      this.dropdown = new combo_dropdown(option);
      if (this.resModel && !this.resModel.attributes.pgName) {
        that.dropdown.setSelection("Please Select Parameter Group");
      } else {
        this.dropdown.setSelection(this.resModel.attributes.pgName);
      }
      this.dropdown.on('open', this.initDropdown.bind(this), this);
      this.dropdown.on('manage', this.renderManager.bind(this), this);
      this.dropdown.on('filter', this.filterDropdown.bind(this), this);
      this.dropdown.on('change', this.setParameterGroup.bind(this), this);
      return this.dropdown;
    },
    initDropdown: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        return this.renderDefault();
      } else {
        return this.renderNoCredential();
      }
    },
    renderDefault: function() {
      if (!this.dropdown) {
        return false;
      }
      if (!fetched) {
        this.renderLoading();
        this.collection.fetch().then((function(_this) {
          return function() {
            return _this.renderDefault();
          };
        })(this));
        fetched = true;
        return false;
      }
      return this.openDropdown();
    },
    renderNoCredential: function() {
      return this.dropdown.render('nocredential').toggleControls(false);
    },
    renderLoading: function() {
      return this.dropdown.render('loading').toggleControls(false);
    },
    openDropdown: function(keys) {
      var content, data, datas, defaultInfo, engineCol, modelData, regionName, selected, targetFamily;
      data = this.collection.toJSON();
      selected = this.resModel.attributes.pgName;
      _.each(data, function(e) {
        if (e.DBParameterGroupName === selected) {
          e.selected = true;
          return null;
        }
      });
      datas = {
        keys: data
      };
      if (keys) {
        datas.keys = keys;
      }
      if (Design.instance().modeIsApp() || Design.instance().modeIsAppEdit()) {
        datas.isRunTime = true;
      }
      modelData = this.resModel.attributes;
      regionName = Design.instance().region();
      engineCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBENGINE, regionName);
      if (engineCol) {
        defaultInfo = engineCol.getDefaultByNameVersion(regionName, modelData.engine, modelData.engineVersion);
        targetFamily = defaultInfo.family;
      }
      if (targetFamily) {
        datas.keys = _.filter(datas.keys, function(e) {
          return e.DBParameterGroupFamily === targetFamily;
        });
      }
      content = template.keys(datas);
      this.dropdown.toggleControls(true);
      return this.dropdown.setContent(content);
    },
    filterDropdown: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.collection.toJSON(), function(data) {
        return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.openDropdown(hitKeys);
      } else {
        return this.openDropdown();
      }
    },
    setParameterGroup: function(value, data) {
      var val;
      val = value || data.id;
      return this.resModel.set("pgName", val);
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.COMPONENT_RDS_PG_MANAGER_TITLE, regionName),
        slideable: true,
        resourceName: lang.PROP.RESOURCE_NAME_PARAMETER_GROUP,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.PROP.LBL_CREATE_PARAMETER_GROUP
          }, {
            icon: 'edit',
            type: 'edit',
            disabled: true,
            name: lang.PROP.LBL_EDIT
          }, {
            icon: 'reset',
            type: 'reset',
            disabled: true,
            name: lang.PROP.LBL_RESET
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.PROP.LBL_DELETE
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "30%",
            rowType: "string",
            name: lang.PROP.NAME
          }, {
            sortable: true,
            rowType: 'string',
            width: "30%",
            name: lang.PROP.DBPG_SET_FAMILY
          }, {
            sortable: false,
            width: "40%",
            name: lang.PROP.LBL_DESC
          }
        ]
      };
    }
  });
  return DbpgRes;
});

define('component/awscomps/RdsSnapshotTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"manager-content-sub\">Engine: "
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " &nbsp;&nbsp;Size: "
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</div>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n    <td>\n        <div class=\"manager-content-main\">";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.Status), "creating", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <span class=\"manager-content-sub\">Started: "
    + escapeExpression(((stack1 = (depth0 && depth0.started)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </td>\n    <td class=\"show-detail icon-toolbar-cloudformation\"></td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status status-yellow icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.PercentProgress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status status-green icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.selectedId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_DELETE_2", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.selectedCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_DELETE_3", {hash:{},data:data}));
  return buffer;
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_DELETE_1", {hash:{},data:data}))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selectedId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "?</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"no-credential tac\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_EMPTY", {hash:{},data:data}))
    + "</p>\n</div>";
  return buffer;
  };
TEMPLATE.noinstance=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name-create\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"database\" data-ignore=\"true\" data-ignore-regexp=\"^[a-zA-Z][a-zA-Z0-9-]*$\" data-required=\"true\"  placeholder=\"Allow alpha number, _ or - up to 255 characters.\">\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-volume-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_INSTANCE", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-db-instance-choose\"></div>\n                </div>\n            </div>\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"slide-duplicate\" data-bind=\"true\">\n    <div class=\"formart_toolbar_modal\" data-type=\"true\">\n        <section data-bind=\"true\">\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-source\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SOURCE_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <p id=\"property-snapshot-source\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.originSnapshot)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix property-content\" style=\"background: none\">\n                <label for=\"property-region-choose\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_DESTINATION_REGION", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <div id=\"property-region-choose\"></div>\n                </div>\n            </div>\n\n            <div class=\"control-group clearfix\">\n                <label for=\"property-snapshot-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SNAPSHOT_SET_NEW_NAME", {hash:{},data:data}))
    + "</label>\n                <div>\n                    <input id=\"property-snapshot-name\" class=\"input\" type=\"text\" maxlength=\"255\" data-type=\"domain\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.newCopyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\">\n                </div>\n            </div>\n\n\n        </section>\n        <div class=\"init action\">\n            <button class=\"btn btn-blue do-action\" data-action=\"duplicate\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DUPLICATE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n        <div class=\"processing action\" style=\"display:none;\">\n            <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DUPLICATING", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_duplicate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"detail-info horizontal\">\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_VPC_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.VpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_ENGINE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_LICENSE_MODEL", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.LicenseModel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_STATUS", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_STORAGE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_CREATE_TIME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.SnapshotCreateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_SOURCE_REGION", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_INSTANCE_NAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_TYPE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.SnapshotType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_ENGINE_VERSION", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_MASTER_USERNAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.MasterUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION_GROUP_NAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DB_SNAPSHOT_INSTANCE_CREATE_TIME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.InstanceCreateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.detail=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('rds_snapshot',['CloudResources', 'ApiRequest', 'constant', 'combo_dropdown', "UI.modalplus", 'toolbar_modal', "i18n!/nls/lang.js", 'component/awscomps/RdsSnapshotTpl'], function(CloudResources, ApiRequest, constant, combo_dropdown, modalPlus, toolbar_modal, lang, template) {
  var deleteCount, deleteErrorCount, fetched, fetching, regionsMark, snapshotRes;
  fetched = false;
  deleteCount = 0;
  deleteErrorCount = 0;
  fetching = false;
  regionsMark = {};
  snapshotRes = Backbone.View.extend({
    constructor: function() {
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBSNAP, Design.instance().region());
      this.listenTo(this.collection, 'update', this.onChange.bind(this));
      this.listenTo(this.collection, 'change', this.onChange.bind(this));
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this;
    },
    onChange: function() {
      this.initManager();
      return this.trigger('datachange', this);
    },
    credChanged: function() {
      var _ref, _ref1;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      if ((_ref1 = this.manager) != null) {
        _ref1.renderLoading();
      }
      this.manager && this.refresh();
      return this.collection.fetchForce();
    },
    remove: function() {
      this.isRemoved = true;
      return Backbone.View.prototype.remove.call(this);
    },
    render: function() {
      return this.renderManager();
    },
    renderDropdown: function() {
      var option, selection;
      option = {
        filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_VOLUME,
        resourceName: lang.PROP.RESOURCE_NAME_RDS_SNAPSHOT
      };
      this.dropdown = new combo_dropdown(option);
      this.instances = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region());
      selection = lang.PROP.INSTANCE_SNAPSHOT_SELECT;
      this.dropdown.setSelection(selection);
      this.dropdown.on('open', this.openDropdown, this);
      this.dropdown.on('filter', this.filterDropdown, this);
      this.dropdown.on('change', this.selectSnapshot, this);
      return this.dropdown;
    },
    renderRegionDropdown: function(exceptRegion) {
      var option, selection;
      option = {
        filterPlaceHolder: lang.PROP.SNAPSHOT_FILTER_REGION
      };
      this.regionsDropdown = new combo_dropdown(option);
      this.regions = _.keys(constant.REGION_LABEL);
      if (exceptRegion) {
        this.regions = _.without(this.regions, exceptRegion);
      }
      selection = lang.PROP.VOLUME_SNAPSHOT_SELECT_REGION;
      this.regionsDropdown.setSelection(selection);
      this.regionsDropdown.on('open', this.openRegionDropdown, this);
      this.regionsDropdown.on('filter', this.filterRegionDropdown, this);
      this.regionsDropdown.on('change', this.selectRegion, this);
      return this.regionsDropdown;
    },
    openRegionDropdown: function(keySet) {
      var content, currentRegion, data, dataSet;
      currentRegion = Design.instance().get('region');
      data = _.map(this.regions, function(region) {
        return {
          name: constant.REGION_LABEL[region] + " - " + constant.REGION_SHORT_LABEL[region],
          selected: region === currentRegion,
          region: region
        };
      });
      dataSet = {
        isRuntime: false,
        data: data
      };
      if (keySet) {
        dataSet.data = keySet;
        dataSet.hideDefaultNoKey = true;
      }
      content = template.keys(dataSet);
      this.regionsDropdown.toggleControls(false, 'manage');
      this.regionsDropdown.toggleControls(true, 'filter');
      return this.regionsDropdown.setContent(content);
    },
    openDropdown: function(keySet) {
      return this.instances.fetch().then((function(_this) {
        return function() {
          var content, data, dataSet;
          data = _this.instances.toJSON();
          if (data.length < 1) {
            _this.dropdown.setContent(template.noinstance());
            return false;
          }
          dataSet = {
            isRuntime: false,
            data: data
          };
          if (keySet) {
            dataSet.data = keySet;
            dataSet.hideDefaultNoKey = true;
          }
          content = template.keys(dataSet);
          _this.dropdown.toggleControls(false, 'manage');
          _this.dropdown.toggleControls(true, 'filter');
          return _this.dropdown.setContent(content);
        };
      })(this));
    },
    filterDropdown: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.instances.toJSON(), function(data) {
        return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.openDropdown(hitKeys);
      } else {
        return this.openDropdown();
      }
    },
    filterRegionDropdown: function(keyword) {
      var hitKeys;
      hitKeys = _.filter(this.regions, function(data) {
        return data.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.openRegionDropdown(hitKeys);
      } else {
        return this.openRegionDropdown();
      }
    },
    selectSnapshot: function(e) {
      $("#property-db-instance-choose .selection .manager-content-sub").remove();
      return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
    },
    selectRegion: function(e) {
      return this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
    },
    renderManager: function() {
      var _ref, _ref1;
      this.manager = new toolbar_modal(this.getModalOptions());
      this.manager.on('refresh', this.refresh, this);
      this.manager.on("slidedown", this.renderSlides, this);
      this.manager.on("slideup", this.resetSlide, this);
      this.manager.on('action', this.doAction, this);
      this.manager.on('detail', this.detail, this);
      this.manager.on('close', (function(_this) {
        return function() {
          _this.manager.remove();
          return _this.collection.remove();
        };
      })(this));
      this.manager.on('checked', this.processDuplicate, this);
      this.manager.render();
      if ((_ref = Design.instance().credential()) != null ? _ref.isDemo() : void 0) {
        if ((_ref1 = this.manager) != null) {
          _ref1.render('nocredential');
        }
        return false;
      }
      return this.initManager();
    },
    resetSlide: function() {
      return this.manager.$el.find(".slidebox").removeAttr('style');
    },
    processDuplicate: function(event, checked) {
      if (checked.length === 1) {
        return this.M$('[data-btn=duplicate]').prop('disabled', false);
      } else {
        return this.M$('[data-btn=duplicate]').prop('disabled', true);
      }
    },
    refresh: function() {
      fetched = false;
      return this.initManager();
    },
    setContent: function() {
      var content, data, dataSet, _ref;
      fetching = false;
      fetched = true;
      data = this.collection.toJSON();
      _.each(data, function(e, f) {
        if (e.PercentProgress === 100) {
          e.completed = true;
        }
        if (e.SnapshotCreateTime) {
          e.started = (new Date(e.SnapshotCreateTime)).toString();
        }
        return null;
      });
      dataSet = {
        items: data
      };
      content = template.content(dataSet);
      return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
    },
    initManager: function() {
      var currentRegion, setContent;
      setContent = this.setContent.bind(this);
      currentRegion = Design.instance().get('region');
      if ((!fetched && !fetching) || (!regionsMark[currentRegion])) {
        fetching = true;
        regionsMark[currentRegion] = true;
        return this.collection.fetchForce().then(setContent, setContent);
      } else if (!fetching) {
        return this.setContent();
      }
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template['slide_' + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    getSlides: function() {
      return {
        'delete': function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selectedName = checked[0].data.name;
          } else {
            data.selectedCount = checkedAmount;
          }
          return this.manager.setSlide(tpl(data));
        },
        'create': function(tpl) {
          var data;
          data = {
            volumes: {}
          };
          this.manager.setSlide(tpl(data));
          this.dropdown = this.renderDropdown();
          this.manager.$el.find('#property-db-instance-choose').html(this.dropdown.$el);
          return this.manager.$el.find(".slidebox").css('overflow', "visible");
        },
        'duplicate': function(tpl, checked) {
          var data, snapshot;
          data = {};
          data.originSnapshot = checked[0];
          data.region = Design.instance().get('region');
          if (!checked) {
            return;
          }
          data.newCopyName = checked[0].id.split(':').pop() + "-copy";
          snapshot = this.collection.get(checked[0].id);
          console.log(snapshot);
          this.manager.setSlide(tpl(data));
          if (snapshot.isAutomated()) {
            this.regionsDropdown = this.renderRegionDropdown();
          } else {
            this.regionsDropdown = this.renderRegionDropdown(snapshot.collection.region());
          }
          this.regionsDropdown.on('change', (function(_this) {
            return function() {
              return _this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
            };
          })(this));
          this.manager.$el.find('#property-region-choose').html(this.regionsDropdown.$el);
          return this.manager.$el.find(".slidebox").css('overflow', "visible");
        }
      };
    },
    doAction: function(action, checked) {
      return this["do_" + action] && this["do_" + action]('do_' + action, checked);
    },
    do_create: function(validate, checked) {
      var afterCreated, data, dbInstance;
      if (!$('#property-snapshot-name-create').parsley('validate')) {
        return false;
      }
      dbInstance = this.instances.findWhere({
        'id': $('#property-db-instance-choose').find('.selectbox .selection .manager-content-main').data('id')
      });
      if (!dbInstance) {
        return false;
      }
      data = {
        "DBSnapshotIdentifier": $("#property-snapshot-name-create").val(),
        'DBInstanceIdentifier': dbInstance.id
      };
      this.switchAction('processing');
      afterCreated = this.afterCreated.bind(this);
      return this.collection.create(data).save().then(afterCreated, afterCreated);
    },
    do_delete: function(invalid, checked) {
      var afterDeleted, that;
      that = this;
      deleteCount += checked.length;
      this.switchAction('processing');
      afterDeleted = that.afterDeleted.bind(that);
      return _.each(checked, (function(_this) {
        return function(data) {
          return _this.collection.findWhere({
            id: data.data.id
          }).destroy().then(afterDeleted, afterDeleted);
        };
      })(this));
    },
    do_duplicate: function(invalid, checked) {
      var accountNumber, afterDuplicate, newName, sourceSnapshot, targetRegion;
      sourceSnapshot = checked[0];
      targetRegion = $('#property-region-choose').find('.selectbox .selection .manager-content-main').data('id');
      if ((this.regions.indexOf(targetRegion)) < 0) {
        return false;
      }
      this.switchAction('processing');
      newName = this.manager.$el.find('#property-snapshot-name').val();
      afterDuplicate = this.afterDuplicate.bind(this);
      accountNumber = Design.instance().credential().get("awsAccount");
      if (!/^\d+$/.test(accountNumber.split('-').join(''))) {
        notification('error', lang.PROP.DB_SNAPSHOT_ACCOUNT_NUMBER_INVALID);
        return false;
      }
      return this.collection.findWhere({
        id: sourceSnapshot.data.id
      }).copyTo(targetRegion, newName).then(afterDuplicate, afterDuplicate);
    },
    afterCreated: function(result, newSnapshot) {
      this.manager.cancel();
      if (result.error) {
        notification('error', sprintf(lang.NOTIFY.DB_SNAPSHOT_CREATE_FAILED, result.msg));
        return false;
      }
      return notification('info', lang.NOTIFY.NEW_SNAPSHOT_IS_CREATED_SUCCESSFULLY);
    },
    afterDuplicate: function(result) {
      var currentRegion;
      currentRegion = Design.instance().get('region');
      this.manager.cancel();
      if (result.error) {
        notification('error', sprintf(lang.NOTIFY.DUPLICATE_FAILED_BECAUSE_OF_XXX, result.awsResult || result.msg));
        return false;
      }
      if (result.attributes.region === currentRegion) {
        this.collection.add(result);
        return notification('info', lang.NOTIFY.DB_SNAPSHOT_DUPLICATE_SUCCESS);
      } else {
        this.initManager();
        return notification('info', lang.NOTIFY.DB_SNAPSHOT_DUPLICATE_SUCCESS_OTHER_REGION);
      }
    },
    afterDeleted: function(result) {
      deleteCount--;
      if (result.error) {
        deleteErrorCount++;
      }
      if (deleteCount === 0) {
        if (deleteErrorCount > 0) {
          notification('error', sprintf(lang.NOTIFY.XXX_SNAPSHOT_FAILED_TO_DELETE, deleteErrorCount));
        } else {
          notification('info', lang.NOTIFY.DB_SNAPSHOT_DELETE_SUCCESS);
        }
        this.manager.unCheckSelectAll();
        deleteErrorCount = 0;
        return this.manager.cancel();
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    detail: function(event, data, $tr) {
      var detailTpl, snapshotData, snapshotId;
      snapshotId = data.id;
      snapshotData = this.collection.get(snapshotId).toJSON();
      detailTpl = template.detail(snapshotData);
      return this.manager.setDetail($tr, detailTpl);
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_DB_SNAPSHOT_IN_AREA, regionName),
        slideable: true,
        resourceName: lang.PROP.RESOURCE_NAME_RDS_SNAPSHOT,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.PROP.CREATE_SNAPSHOT
          }, {
            icon: 'duplicate',
            type: 'duplicate',
            disabled: true,
            name: lang.PROP.LBL_DUPLICATE
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.PROP.LBL_DELETE
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "30%",
            name: lang.PROP.LBL_NAME
          }, {
            sortable: true,
            rowType: 'number',
            width: "20%",
            name: lang.PROP.LBL_CAPACITY
          }, {
            sortable: true,
            rowType: 'datetime',
            width: "40%",
            name: lang.PROP.LBL_STATUS
          }, {
            sortable: false,
            width: "10%",
            name: lang.PROP.LBL_DETAIL
          }
        ]
      };
    }
  });
  return snapshotRes;
});

define('component/awscomps/EipManageTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <tr class=\"item\" data-id=\"\">\n        <td style=\"width: 5%;\">\n            <div class=\"checkbox\">\n                <input id=\"eip-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.canRelease), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\"eip-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n            </div>\n        </td>\n        <td style=\"width: 35px;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.domain)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.networkInterfaceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    </tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "disabled";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.keys), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.keys=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"before-create\">\n        <p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_CONFIRM_TO_CREATE", {hash:{},data:data}))
    + "</p>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CREATING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_CONFIRM_RELEASE_3", (depth0 && depth0.selecteEip), {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_CONFIRM_RELEASE_2", (depth0 && depth0.selectedCount), {hash:{},data:data}));
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_CONFIRM_RELEASE_1", {hash:{},data:data}))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteEip), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_RELEASE_EIP_NOTE", {hash:{},data:data}))
    + "</p>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_CONFIRM_RELEASE_BTN", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETING", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"eip-selector-wrapper\">\n    <div class=\"modal-control-group clearfix\">\n        <label for=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_SELECT_IP_LABEL", {hash:{},data:data}))
    + "</label>\n        <div id=\"eip-selector\" style=\"display:inline-block;\"></div>\n        <div class=\"runtime-error hide\" id=\"need-select-eip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EIP_NEED_SELECT", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.selector=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.selected), "old", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"old\" tabindex=\"-1\">\n        <div class=\"manager-content-main\" data-id=\"old\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASSIGN_OLD_ELASTIC_IP", {hash:{},data:data}))
    + "<i class=\"icon-info tooltip\" data-tooltip=\"Keep use current Elastic IP.\"></i></div>\n        <div class=\"manager-content-sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASSIGN_OLD_ELASTIC_IP_DESC", {hash:{},data:data}))
    + "</div>\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.selected), "new", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"new\" tabindex=\"-1\">\n    <div class=\"manager-content-main\" data-id=\"new\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASSIGN_NEW_ELASTIC_IP", {hash:{},data:data}))
    + "<i class=\"icon-info tooltip\" data-tooltip=\"Assign a new Elastic IP\"></i></div>\n    <div class=\"manager-content-sub\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ASSIGN_NEW_ELASTIC_IP_DESC", {hash:{},data:data}))
    + "</div>\n</li>";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.selected), (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        <div class=\"manager-content-main\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"manager-content-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.allocationId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </li>\n";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.currentEip), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideNewEip), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.dropdown=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('eip_manager',['toolbar_modal', 'UI.modalplus', 'component/awscomps/EipManageTpl', 'constant', 'backbone', 'CloudResources', 'i18n!/nls/lang.js', 'UI.notification'], function(toolbar_modal, modalplus, template, constant, Backbone, CloudResources, lang) {
  return Backbone.View.extend({
    initialize: function(options) {
      var that;
      _.extend(this, options);
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.EIP, Design.instance().get("region"));
      this.initModal();
      this.modal.render();
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        that = this;
        this.collection.fetch().then(function() {
          return that.renderKeys();
        });
      } else {
        this.modal.render('nocredential');
      }
      this.collection.on('update', this.renderKeys, this);
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      return this.listenTo(Design.instance().credential(), "change", this.credChanged);
    },
    initModal: function() {
      new toolbar_modal(this.getModalOptions());
      this.modal.on('close', function() {
        return this.remove();
      }, this);
      this.modal.on('slidedown', this.renderSlides, this);
      this.modal.on('action', this.doAction, this);
      return this.modal.on('refresh', this.refresh, this);
    },
    credChanged: function() {
      this.collection.fetchForce();
      this.modal.renderLoading();
      return this.modal && this.refresh();
    },
    renderKeys: function() {
      var data;
      if (!this.collection.isReady()) {
        return false;
      }
      data = {
        keys: _.filter(this.collection.toJSON(), function(eip) {
          return eip.category === Design.instance().region();
        })
      };
      this.modal.setContent(template.keys(data));
      return this;
    },
    doAction: function(action, checked) {
      return this[action] && this[action](this.validate(action), checked);
    },
    validate: function(action) {
      switch (action) {
        case 'create':
          return false;
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    genDeleteFinish: function(times) {
      var error, finHandler, success, that;
      success = [];
      error = [];
      that = this;
      finHandler = _.after(times, function() {
        that.cancel();
        if (success.length === 1) {
          console.debug(success);
          notification('info', sprintf(lang.NOTIFY.EIP_XXX_IS_RELEASED, success[0].attributes.id));
          return;
        } else if (success.length > 1) {
          notification('info', sprintf(lang.NOTIFY.SELECTED_EIP_ARE_DELETED, success.length));
          return;
        }
        if (!that.collection.toJSON().length) {
          that.M$('#t-m-select-all').get(0).checked = false;
        }
        _.each(error, function(s) {
          return console.log(s);
        });
        if (error.length > 0) {
          return notification('error', lang.NOTIFY.FAILED_TO_RELEASE_EIP);
        }
      });
      return function(res) {
        console.debug(res);
        if (!(res.reason || res.msg)) {
          success.push(res);
        } else {
          error.push(res);
        }
        return finHandler();
      };
    },
    create: function(invalid) {
      var domain, region, that;
      that = this;
      if (!invalid) {
        domain = "vpc";
        region = Design.instance().region();
        this.switchAction('processing');
        return this.collection.create({
          domain: domain,
          region: region
        }).save().then(function(res) {
          notification("info", sprintf(lang.NOTIFY.EIP_XXX_IS_CREATED, res.attributes.id));
          return that.cancel();
        }, function(err) {
          that.modal.error(err.awsResult || err.reason || err.msg);
          return that.switchAction();
        });
      }
    },
    "delete": function(invalid, checked) {
      var count, onDeleteFinish, that;
      count = checked.length;
      onDeleteFinish = this.genDeleteFinish(count);
      this.switchAction('processing');
      that = this;
      return _.each(checked, (function(_this) {
        return function(c) {
          return _this.collection.findWhere({
            publicIp: c.data.name.toString()
          }).destroy().then(onDeleteFinish, onDeleteFinish);
        };
      })(this));
    },
    cancel: function() {
      return this.modal.cancel();
    },
    refresh: function() {
      var _ref;
      if ((_ref = this.modal) != null) {
        _ref.render("loading");
      }
      return this.collection.fetchForce().then((function(_this) {
        return function() {
          return _this.renderKeys();
        };
      })(this));
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template["slide_" + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    getSlides: function() {
      var modal, that;
      that = this;
      modal = this.modal;
      return {
        create: function(tpl) {
          return modal.setSlide(tpl);
        },
        "delete": function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selecteEip = checked[0].data.name;
          } else {
            data.selectedCount = checkedAmount;
          }
          return modal.setSlide(tpl(data));
        }
      };
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_EIP_IN_AREA, regionName),
        resourceName: lang.PROP.RESOURCE_NAME_EIP,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.IDE.COMPONENT_CREATE_EIP
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.IDE.COMPONENT_DELETE_EIP
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "35%",
            name: "Elastic IP"
          }, {
            width: "15%",
            sortable: true,
            name: "Instance"
          }, {
            width: "15%",
            sortable: true,
            name: "Private IP"
          }, {
            width: "15%",
            sortable: true,
            name: "Domain"
          }, {
            width: "15%",
            sortable: true,
            name: "Network Interface"
          }
        ]
      };
    }
  });
});

var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define('eip_selector',['combo_dropdown', 'UI.modalplus', 'component/awscomps/EipManageTpl', 'constant', 'backbone', 'CloudResources', 'eip_manager', 'i18n!/nls/lang.js', 'UI.notification'], function(comboDropdown, Modal, template, constant, Backbone, CloudResources, EipManager, lang) {
  return Backbone.View.extend({
    initialize: function(model) {
      this.model = model;
      this.collection = CloudResources(Design.instance().credentialId(), constant.RESTYPE.EIP, Design.instance().get("region"));
      this.listenTo(this.collection, 'change', this.renderDropdown);
      this.listenTo(this.collection, 'update', this.renderDropdown);
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this.renderModal();
    },
    renderModal: function() {
      var self;
      self = this;
      this.modal = new Modal({
        title: lang.PROP.EIP_SELECTOR_CONFIRM_TITLE,
        template: template.selector,
        confirm: lang.PROP.EIP_SELECTOR_CONFIRM_LABEL
      });
      this.modal.on("shown", function() {
        return self.renderDropdown();
      });
      return this.modal.on("confirm", function() {
        if (self.selected) {
          self.model.setPrimaryEip(true, self.selectedEip);
          self.trigger("assign");
          return self.modal.close();
        } else {
          return self.modal.find("#need-select-eip").removeClass("hide");
        }
      });
    },
    credChanged: function() {
      var _ref;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      return this.collection.fetchForce().then((function(_this) {
        return function() {
          return _this.renderDropdown();
        };
      })(this));
    },
    renderDropdown: function() {
      var option, selection;
      option = {
        manageBtnValue: lang.PROP.EIP_DROPDOWN_MANAGE,
        filterPlaceHolder: lang.PROP.EIP_DROPDOWN_FILTER,
        resourceName: lang.PROP.EIP_RESOURCE_NAME
      };
      this.dropdown = new comboDropdown(option);
      selection = lang.PROP.SELECT_EIP_SELECTION;
      this.dropdown.setSelection(selection);
      this.dropdown.on('open', this.renderEip, this);
      this.dropdown.on('manage', this.manageEip, this);
      this.dropdown.on('change', this.assignEip, this);
      this.dropdown.on('filter', this.filter, this);
      if (!Design.instance().credential() || Design.instance().credential().isDemo()) {
        this.dropdown.render('nocredential').toggleControls(false);
      }
      return this.modal.tpl.find("#eip-selector").html(this.dropdown.$el);
    },
    renderEip: function(keySet) {
      var self;
      self = this;
      this.collection.fetch().then(function() {
        var content, currentEip, currentRegion, data, dataSet, enisWithEip, selected, usedEips;
        data = self.collection.toJSON();
        currentRegion = Design.instance().region();
        if (keySet) {
          data = keySet;
        }
        enisWithEip = _.filter(Design.instance().componentsOfType(constant.RESTYPE.ENI), function(eni) {
          return eni.hasPrimaryEip();
        });
        usedEips = _.map(enisWithEip, function(eni) {
          return eni.get("ips")[0].eipData.publicIp;
        });
        data = _.filter(data, function(eip) {
          var _ref;
          if (_ref = eip.publicIp, __indexOf.call(usedEips, _ref) >= 0) {
            return false;
          }
          return eip.category === currentRegion && eip.canRelease;
        });
        dataSet = {
          data: data
        };
        if (keySet) {
          dataSet.hideNewEip = true;
        }
        if (self.selected) {
          selected = null;
          if (self.selectedEip && self.selectedEip.id) {
            selected = self.selectedEip.id;
          } else {
            selected = self.selectedEip;
          }
          dataSet.selected = selected;
        }
        currentEip = null;
        if (self.model.getEmbedEni) {
          currentEip = self.model.getEmbedEni().getCurrentEip();
        } else {
          currentEip = self.model.getCurrentEip();
        }
        if (currentEip) {
          dataSet.currentEip = {
            id: currentEip.resource.PublicIp
          };
        }
        content = template.dropdown(dataSet);
        self.dropdown.toggleControls(true, "manage");
        self.dropdown.toggleControls(true, "filter");
        return self.dropdown.setContent(content);
      });
      return console.log("Render Eip List");
    },
    manageEip: function() {
      console.log("Show Eip Manager");
      return new EipManager({
        workspace: this.workspace
      }).render();
    },
    assignEip: function(id) {
      var eip;
      eip = this.collection.find({
        id: id
      });
      eip || (eip = id);
      this.selected = true;
      this.selectedEip = eip;
      this.modal.find("#need-select-eip").addClass("hide");
      console.log("Assign Elastic Ip to Model");
      return console.log(eip);
    },
    filter: function(keyword) {
      var hitKeys;
      console.log("Filter Elastic Ip");
      hitKeys = _.filter(this.collection.toJSON(), function(eip) {
        return eip.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      if (keyword) {
        return this.renderEip(hitKeys);
      } else {
        return this.renderEip();
      }
    }
  });
});

define('component/awscomps/TagManagerTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"tag-manager-wrap\">\n    <div class=\"tag-resource-list\">\n        <input type=\"text\" class=\"input filter-bar\" placeholder=\"Filter Bar\"/>\n        <button class=\"btn edit-tags btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RESOURCE_EDIT_TAG", {hash:{},data:data}))
    + "</button>\n        <div class=\"resource-list\">\n            <div class=\"table-head-fix tag-resource-table\">\n                <table class=\"table-head\">\n                    <thead>\n                    <tr>\n                        <th>\n                            <div class=\"checkbox\">\n                                <input id=\"t-m-select-all\" type=\"checkbox\" value=\"None\">\n                                <label for=\"t-m-select-all\"></label>\n                            </div>\n                        </th>\n                        <th class=\"sortable active\" data-row-type=\"string\">Name</th>\n                        <th class=\"\" data-row-type=\"string\">Type</th>\n                    </tr>\n                    </thead>\n                </table>\n                <div>\n                    <table class=\"table\">\n                        <thead>\n                        <tr>\n                            <th><div class=\"th-inner\"></div></th>\n                            <th><div class=\"th-inner\"></div></th>\n                            <th><div class=\"th-inner\"></div></th>\n                        </tr>\n                        </thead>\n                        <tbody class=\"t-m-content\"></tbody>\n                    </table>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"tag-resource-detail\">\n        <div class=\"tabs-navs\" data-id=\"checked\">Selected <span>()</span></div>\n        <div class=\"tabs-content\">\n            <div class=\"tab-content\" data-id=\"checked\">\n\n            </div>\n            <div class=\"tab-content\" data-id=\"selected\" style=\"display: none\">\n\n            </div>\n        </div>\n        <div class=\"tabs-footer pull-right\">\n           <button class=\"btn save-tags btn-primary\">Save</button>\n           <button class=\"btn btn-silver cancel\">Cancel</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.modalTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"check-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"check-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>("
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.models), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.filterResource=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  
  return "\n    <div class=\"tag-empty\">Please select resources in resource list for tag details.</div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"table-head-fix tag-resource-table\">\n        <table class=\"table-head\">\n            <thead>\n            <tr>\n                <th class=\"\" width=\"35%\" data-row-type=\"string\">Key</th>\n                <th class=\"\" width=\"35%\" data-row-type=\"string\">Value</th>\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.allAsg), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tr>\n            </thead>\n        </table>\n    </div>\n    <ul class=\"tags-list ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.allAsg), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "\n                    <th class=\"\" width=\"20%\" data-row-type=\"string\">Tag New Instances</th>\n                    <th class=\"\" width=\"10%\" data-row-type=\"string\"></th>\n                ";
  }

function program6(depth0,data) {
  
  
  return "\n                    <th class=\"\" width=\"30%\" data-row-type=\"string\"></th>\n                ";
  }

function program8(depth0,data) {
  
  
  return "no-inherit";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-asg=\""
    + escapeExpression(((stack1 = (depth0 && depth0.asg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                <div class=\"edit\">\n                    <input class=\"tag-key input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"127\" data-ignore=\"true\" data-required-rollback=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableEdit), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    <input class=\"tag-value input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableEdit), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.allowCheck), {hash:{},inverse:self.program(18, program18, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n                </div>\n            </li>\n        ";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "disabled";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class=\"checkbox\">\n                            <input id=\"cb"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.asg), {hash:{},data:data}))
    + "\" type=\"checkbox\" value=\"None\" data-id=\""
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.asg), {hash:{},data:data}))
    + "\" class=\"one-cb\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableEdit), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.inherit), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                            <label for=\"cb"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.asg), {hash:{},data:data}))
    + "\"></label>\n                        </div>\n                        <div class=\"action\">\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.disableEdit), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </div>\n                    ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return "checked";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button class=\"btn btn-red edit-delete\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableEdit), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><i class=\"icon-delete\"></i></button>";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class=\"action wide\">\n                            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.disableEdit), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </div>\n                    ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.empty), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.tagResource=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('component/awscomps/FilterInputTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"fake-input\">\n    <ul class=\"tags\"></ul>\n    <i class=\"icon-search placeholder\">Filter</i>\n    <input type=\"text\"/>\n    <span class=\"line-tip\"></span>\n</div>\n<ul class=\"dropdown\"></ul>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-vtext=\""
    + escapeExpression(((stack1 = (depth0 && depth0.vtext)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.type), "label", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n";
  stack1 = ((stack1 = (depth0 && depth0.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "label";
  }

function program4(depth0,data) {
  
  
  return "option";
  }

function program6(depth0,data) {
  
  
  return "selected";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <span class=\"key\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vtext), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "=<span class=\"value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.vtext)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.tag=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('FilterInput',['constant', 'Design', 'component/awscomps/FilterInputTpl'], function(constant, Design, template) {
  var DefaultValues, RefRegx, ResNameToType, ResTypeToShort, filterInput, getResNameByType, getResShortNameByType, getResTypeByShortName, hasTag, isResAttributeMatch, isResMatchResource, isResMatchTag, seperate;
  ResNameToType = _.invert(constant.RESNAME);
  ResTypeToShort = _.invert(constant.RESTYPE);
  DefaultValues = {
    Empty: '(empty)',
    NotTagged: 'Not tagged',
    AllValues: 'All values',
    AllAttributes: 'All Attributes'
  };
  RefRegx = /@\{.+\}/;
  getResNameByType = function(type) {
    return constant.RESNAME[type];
  };
  getResShortNameByType = function(type) {
    var _ref;
    return (_ref = ResTypeToShort[type]) != null ? _ref.toLowerCase() : void 0;
  };
  getResTypeByShortName = function(short) {
    return constant.RESTYPE[short.toUpperCase()];
  };
  seperate = function(str, sep) {
    var after, before, pos, tmp;
    pos = str.indexOf(sep);
    if (pos === -1) {
      return false;
    }
    tmp = str.split(sep);
    before = tmp[0];
    after = tmp[1];
    return {
      before: before,
      after: after,
      pos: pos
    };
  };
  isResAttributeMatch = function(resource, attr, value) {
    var serialized;
    if (!attr) {
      return true;
    }
    if (attr === 'name') {
      if (value === DefaultValues.AllValues) {
        return true;
      }
      return resource.get('name') === value;
    }
    serialized = resource.serialize();
    if (!_.isArray(serialized)) {
      serialized = [serialized];
    }
    return _.some(serialized, function(serializedItem) {
      var v, _ref, _ref1;
      v = serializedItem != null ? (_ref = serializedItem.component) != null ? (_ref1 = _ref.resource) != null ? _ref1[attr] : void 0 : void 0 : void 0;
      if (v === +v) {
        v = String(v);
      }
      if (value === DefaultValues.AllValues) {
        return v !== void 0;
      } else {
        return v === value;
      }
    });
  };
  hasTag = function(tags, key, value) {
    var args;
    args = arguments;
    return _.some(tags, function(tag) {
      return tag.get('key') === key && (args.length !== 3 || tag.get('value') === value);
    });
  };
  isResMatchTag = function(resource, selTags) {
    var tags;
    if (!_.size(selTags)) {
      return true;
    }
    tags = resource.tags();
    return _.every(selTags, function(tagValues, tagKey) {
      return _.some(tagValues, function(tagValue) {
        switch (tagValue) {
          case DefaultValues.AllValues:
            return hasTag(tags, tagKey);
          case DefaultValues.NotTagged:
            return !hasTag(tags, tagKey);
          case DefaultValues.Empty:
            return hasTag(tags, tagKey, '');
          default:
            return hasTag(tags, tagKey, tagValue);
        }
      });
    });
  };
  isResMatchResource = function(res, selectResources) {
    if (!_.size(selectResources)) {
      return true;
    }
    return _.some(selectResources, function(selRes) {
      var attr, resShortName, splitDot, type, value;
      splitDot = seperate(selRes.key, '.');
      resShortName = (splitDot != null ? splitDot.before : void 0) || selRes.key;
      attr = splitDot.after || '';
      value = selRes.value;
      type = getResTypeByShortName(resShortName);
      return res.type === type && isResAttributeMatch(res, attr, value);
    });
  };
  filterInput = Backbone.View.extend({
    className: "filter-input",
    tplDropdown: template.dropdown,
    tplTag: template.tag,
    unFilterTypeInVisualMode: [constant.RESTYPE.SG, 'ExpandedAsg', constant.RESTYPE.DHCP, 'ExternalVpcRouteTarget'],
    events: {
      "click .tags li": "clickTagHandler",
      "blur input": "blurInputHandler",
      "focus input": "focusInputHandler",
      "click input": "clickInputHandler",
      "click .fake-input": "clickFakeInputHandler",
      "keydown input": "keydownHandler",
      "keyup input": "keyupHandler",
      "click .dropdown li.option": "selectHandler",
      "mouseover .dropdown": "overDrop",
      "mouseleave .dropdown": "leaveDrop",
      "mouseover .dropdown li": "overDropItem",
      "mouseover .tags li": "overSelectionHandler",
      "mouseleave .tags li": "leaveSelectionHandler"
    },
    getFilterableResource: function() {
      var allComp;
      allComp = Design.instance().getAllComponents();
      return _.filter(allComp, (function(_this) {
        return function(comp) {
          if (_this.isVisual) {
            return !comp.port && comp.isVisual() && !_.contains(_this.unFilterTypeInVisualMode, comp.type);
          } else {
            return _.contains(constant.HASTAG, comp.type);
          }
        };
      })(this));
    },
    getMatchedResource: function(hightlight, sel) {
      var filterable, matched, selection, _ref;
      selection = this.classifySelection(sel || this.selection);
      filterable = this.getFilterableResource();
      matched = _.filter(filterable, function(resource) {
        if (isResMatchTag(resource, selection.tags) && isResMatchResource(resource, selection.resources)) {
          return true;
        }
      });
      if (hightlight) {
        return {
          matched: matched,
          effect: (0 < (_ref = matched.length) && _ref < filterable.length)
        };
      } else {
        return matched;
      }
    },
    triggerChange: function() {
      var matched;
      matched = this.getMatchedResource(true);
      return this.trigger('change:filter', matched.matched, matched.effect);
    },
    classifySelection: function(sels) {
      var classified, sel, _i, _len;
      classified = {
        tags: {},
        resources: []
      };
      for (_i = 0, _len = sels.length; _i < _len; _i++) {
        sel = sels[_i];
        if (sel.type === 'tag') {
          classified.tags[sel.key] || (classified.tags[sel.key] = []);
          classified.tags[sel.key].push(sel.value);
        } else {
          classified.resources.push(sel);
        }
      }
      return classified;
    },
    getState: function(value) {
      var cursorPos, dotSplit, effect, equalSplit, input, key, mode, state, subKey, tagSplit, text;
      input = this.$("input").get(0);
      text = input.value;
      subKey = null;
      state = 'value';
      equalSplit = seperate(text, '=');
      key = ((equalSplit != null ? equalSplit.before : void 0) || text).trim();
      value = (equalSplit != null ? equalSplit.after : void 0) || '';
      tagSplit = seperate(key, 'tag:');
      dotSplit = seperate(key, '.');
      if (tagSplit) {
        mode = 'tag';
        key = tagSplit.after;
      } else if (dotSplit) {
        mode = 'resource_attribute';
        key = dotSplit.before;
        subKey = dotSplit.after;
      } else {
        mode = 'resource';
        subKey = '';
      }
      cursorPos = input.selectionStart;
      if (equalSplit && cursorPos > equalSplit.pos) {
        state = 'value';
        effect = value;
      } else {
        state = mode;
        effect = mode === 'resource_attribute' ? subKey : key;
      }
      return {
        mode: mode,
        state: state,
        key: key,
        subKey: subKey,
        value: value,
        effect: effect
      };
    },
    initialize: function(options) {
      var comp, name, s, _i, _len, _ref;
      this.selection = [];
      if (options) {
        this.isVisual = options.isVisual;
        if (options.selection) {
          _ref = options.selection;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            s = _ref[_i];
            this.addSelection(s, true);
          }
        }
        if (options.uid) {
          comp = Design.instance().component(options.uid);
          name = comp != null ? comp.get('name') : void 0;
          if (name) {
            this.addSelection({
              key: "" + (getResShortNameByType(comp.type)) + ".name",
              value: name,
              type: 'resource_attribute'
            }, true);
          } else if (comp.type === constant.RESTYPE.VPN) {
            this.addSelection({
              key: getResShortNameByType(comp.type),
              type: 'resource'
            }, true);
          }
        }
      }
      return null;
    },
    render: function() {
      var tpl;
      tpl = template.frame;
      this.$el.html(tpl);
      this.renderSelection();
      return this;
    },
    renderDropdown: function() {
      var data, filter, state;
      state = this.getState();
      filter = state.effect;
      data = this.getDropdownData(state.state, state.key, state.subKey);
      data = this.filterByInput(data, filter);
      this.$(".dropdown").html(this.tplDropdown(data));
      this.$(".dropdown").scrollTop(0);
      return this;
    },
    removeDropdown: function() {
      return this.$(".dropdown").html("");
    },
    renderSelection: function() {
      this.$(".tags").html(this.tplTag(this.selection));
      return this;
    },
    renderLineTip: function($fakeInput) {
      var $li, $lis, $ul, cs, hideLineNum, idx, li, lineWidth, ulWidth, _i, _len;
      $fakeInput = $fakeInput || this.$(".fake-input");
      $ul = this.$('.tags');
      $lis = $ul.find('li');
      if (!$lis.size()) {
        this.$(".line-tip").text("");
        return;
      }
      ulWidth = $ul.width();
      lineWidth = 0;
      hideLineNum = 0;
      for (idx = _i = 0, _len = $lis.length; _i < _len; idx = ++_i) {
        li = $lis[idx];
        $li = $(li);
        cs = window.getComputedStyle(li);
        lineWidth += parseInt(cs.width) + parseInt(cs.paddingLeft) + parseInt(cs.paddingRight) + parseInt(cs.marginLeft) + parseInt(cs.marginRight);
        if (lineWidth > ulWidth) {
          hideLineNum = $lis.size() - idx;
          break;
        }
      }
      if (hideLineNum < 1) {
        return this.$(".line-tip").text("");
      } else {
        return this.$(".line-tip").text("(+" + hideLineNum + ")");
      }
    },
    stringKeyValue: function(sel) {
      var key, value;
      key = sel.key;
      value = sel.value;
      if (_.isNumber(key)) {
        sel.key = key.toString();
      }
      if (_.isNumber(value)) {
        sel.value = value.toString();
      }
      return sel;
    },
    addSelection: function(sel, silent) {
      var state, _ref;
      if (!sel) {
        state = this.getState();
        if (!state.value) {
          return;
        }
        sel = {
          key: state.key + (state.subKey ? "." + state.subKey : ''),
          value: state.value,
          type: state.mode
        };
      }
      if (!sel.type) {
        sel.type = this.getState().type;
      }
      if (!sel.vtext) {
        sel.vtext = sel.value;
      }
      this.stringKeyValue(sel);
      if (!sel.value && ((_ref = sel.type) !== 'resource' && _ref !== 'resource_attribute')) {
        return;
      }
      this.clearInput();
      if (_.some(this.selection, function(t) {
        return _.isEqual(t, sel);
      })) {
        return this;
      }
      this.selection.push(sel);
      if (!silent) {
        this.triggerChange();
      }
      this.renderSelection();
      return this;
    },
    removeSelection: function($sel) {
      var selection;
      if (!$sel.size()) {
        return;
      }
      selection = {
        key: $sel.data("key"),
        value: $sel.data("value")
      };
      this.stringKeyValue(selection);
      this.selection = _.filter(this.selection, function(s) {
        return s.key !== selection.key || s.value !== selection.value && !(!s.value && !selection.value);
      });
      this.triggerChange();
      if (this.selection.length) {
        return $sel.remove();
      } else {
        return this.$(".tags").empty();
      }
    },
    removeLastSelection: function() {
      var $last;
      $last = this.$(".tags li").last();
      return this.removeSelection($last);
    },
    getDropdownData: function(state, key, subKey) {
      if (state === 'value') {
        if (subKey) {
          return this.getAttributeValueDd(key, subKey);
        } else {
          return this.getTagValueDd(key);
        }
      } else {
        if (state === 'resource_attribute') {
          return this.getAttributeDd(key);
        } else {
          return this.getTagKeyDd().concat(this.getResourceDd());
        }
      }
    },
    uniqSortDd: function(dd) {
      return _.sortBy(_.uniq(dd, function(d) {
        return d.value;
      }), 'value');
    },
    getAttributeDd: function(resShortName) {
      var attrs, dd, resource, serialized, type;
      type = getResTypeByShortName(resShortName);
      if (!type) {
        return;
      }
      attrs = [];
      resource = Design.modelClassForType(type).first();
      if (!type) {
        return;
      }
      serialized = resource.serialize();
      if (!_.isArray(serialized)) {
        serialized = [serialized];
      }
      _.each(serialized, function(serializedItem) {
        var _ref;
        if (serializedItem != null ? (_ref = serializedItem.component) != null ? _ref.resource : void 0 : void 0) {
          return _.each(serializedItem.component.resource, function(v, k) {
            if (!_.isObject(v)) {
              return attrs.push(k);
            }
          });
        }
      });
      attrs.push('name');
      dd = _.map(attrs, function(a) {
        return {
          type: 'attribute',
          value: a
        };
      });
      dd = this.uniqSortDd(dd);
      dd.unshift({
        type: 'attribute',
        value: DefaultValues.AllAttributes,
        "default": true
      });
      dd.unshift({
        type: 'label',
        value: 'Attributes',
        "for": 'attribute'
      });
      return dd;
    },
    getResourceDd: function() {
      var dd, resources;
      resources = this.getFilterableResource();
      dd = _.map(resources, function(r) {
        return {
          id: r.id,
          type: 'resource',
          value: getResShortNameByType(r.type),
          text: getResNameByType(r.type)
        };
      });
      dd = this.uniqSortDd(dd);
      dd.unshift({
        type: 'label',
        value: 'Resources',
        "for": 'resource'
      });
      return dd;
    },
    getTagKeyDd: function() {
      var dd, tags;
      tags = Design.modelClassForType(constant.RESTYPE.TAG).all();
      dd = _.map(tags, function(tag) {
        return {
          id: tag.id,
          type: 'tag.key',
          value: tag.get('key')
        };
      });
      dd = this.uniqSortDd(dd);
      dd.unshift({
        type: 'label',
        value: 'Tag Keys',
        "for": 'tag.key'
      });
      return dd;
    },
    getTagValueDd: function(tagKey) {
      var dd, defaultTag, matchTags, tags, _i, _len, _ref;
      tags = Design.modelClassForType(constant.RESTYPE.TAG).all();
      matchTags = _.filter(tags, function(tag) {
        return tag.get('key') === tagKey;
      });
      dd = _.map(matchTags, function(tag) {
        return {
          id: tag.id,
          type: 'tag.value',
          value: tag.get('value')
        };
      });
      dd = this.uniqSortDd(dd);
      _ref = [DefaultValues.AllValues, DefaultValues.NotTagged, DefaultValues.Empty];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        defaultTag = _ref[_i];
        dd.unshift({
          type: 'tag.value',
          value: defaultTag,
          "default": true
        });
      }
      return dd;
    },
    getAttributeValueDd: function(resShortName, attr) {
      var dd, r, resources, serialized, type, _i, _len;
      type = getResTypeByShortName(resShortName);
      if (!type) {
        return;
      }
      resources = Design.modelClassForType(type).allObjects();
      dd = [];
      for (_i = 0, _len = resources.length; _i < _len; _i++) {
        r = resources[_i];
        if (attr === 'name') {
          dd.push({
            type: 'attribute_value',
            value: r.get('name')
          });
          continue;
        }
        serialized = r.serialize();
        if (!_.isArray(serialized)) {
          serialized = [serialized];
        }
        _.each(serialized, (function(_this) {
          return function(serializedItem) {
            var v, _ref, _ref1;
            v = serializedItem != null ? (_ref = serializedItem.component) != null ? (_ref1 = _ref.resource) != null ? _ref1[attr] : void 0 : void 0 : void 0;
            if (v) {
              return dd.push({
                type: 'attribute_value',
                value: v,
                text: _this.getReadableText(v),
                vtext: _this.getReadableText(v)
              });
            }
          };
        })(this));
      }
      dd = this.uniqSortDd(dd);
      dd.unshift({
        type: 'attribute_value',
        value: DefaultValues.AllValues,
        "default": true
      });
      return dd;
    },
    getReadableText: function(value) {
      var id, res;
      if (RefRegx.test(value)) {
        id = MC.extractID(value);
        res = Design.instance().component(id);
        if (res) {
          return res.get('appId') || res.get('name');
        }
      }
      return value;
    },
    focusInput: function($input) {
      ($input || this.$("input")).focus();
      return this.renderDropdown();
    },
    clearInput: function($input) {
      return ($input || this.$("input")).val("");
    },
    getMatchText: function(data, filter) {
      var matchIdx, text, value;
      value = data.value.toString();
      text = data.text.toString();
      if ((matchIdx = value.toLowerCase().indexOf(filter)) !== -1) {
        return value.slice(matchIdx, matchIdx + filter.length);
      } else if ((matchIdx = text.toLowerCase().indexOf(filter)) !== -1) {
        return text.slice(matchIdx, matchIdx + filter.length);
      }
    },
    filterByInput: function(data, filter) {
      var filtered, setSelected;
      filter = filter && filter.trim().toLowerCase();
      setSelected = false;
      filtered = [];
      _.each(data, (function(_this) {
        return function(d) {
          var match;
          if (!d.text) {
            d.text = d.value.toString();
          }
          if (!d.text) {
            return;
          }
          if (d.type === 'label') {
            return filtered.push(d);
          } else if (!filter || (match = _this.getMatchText(d, filter))) {
            if (!setSelected) {
              d.selected = setSelected = true;
            }
            d.text = d.text.toString().replace(match, "<span class=\"match\">" + match + "</span>");
            return filtered.push(d);
          }
        };
      })(this));
      return _.filter(filtered, function(f) {
        if (f.type === 'label') {
          return _.some(filtered, function(ff) {
            return ff.type === f["for"];
          });
        }
        return true;
      });
    },
    fold: function(force) {
      var that;
      that = this;
      if (!this.hoverDrop) {
        return that.$(".dropdown").empty();
      } else if (force === true) {
        this.hoverDrop = false;
        return this.fold();
      }
    },
    setKeydowning: function() {
      clearTimeout(this.__timeoutResetKeydowning);
      return this.__keydowning = true;
    },
    unsetKeydowning: function() {
      return this.__timeoutResetKeydowning = setTimeout((function(_this) {
        return function() {
          return _this.__keydowning = false;
        };
      })(this), 300);
    },
    overDrop: function() {
      this.hoverDrop = true;
      return null;
    },
    leaveDrop: function() {
      this.hoverDrop = false;
      return null;
    },
    overDropItem: function(e) {
      var $tgt;
      if (this.__keydowning) {
        return;
      }
      $tgt = $(e.currentTarget);
      this.$(".dropdown li").removeClass("selected");
      if ($tgt.hasClass('option')) {
        return $tgt.addClass("selected");
      }
    },
    clickTagHandler: function(e) {
      var $tgt;
      $tgt = $(e.currentTarget);
      this.removeSelection($tgt);
      return false;
    },
    keyupHandler: function(e) {
      var $input, code;
      this.unsetKeydowning();
      code = e.which;
      $input = $(e.currentTarget);
      if (!(_.contains([27, 38, 40], code))) {
        return this.renderDropdown();
      }
    },
    keydownHandler: function(e) {
      var $dropdown, $input, $next, $prev, $selected, code, ddHeight, dropdown, nextHeight, nextTop, prevHeight, prevTop;
      code = e.which;
      $input = $(e.currentTarget);
      switch (code) {
        case 8:
          if ($input[0].selectionStart === 0) {
            this.removeLastSelection();
            return this.focusInput();
          }
          break;
        case 13:
          dropdown = this.$(".dropdown");
          if (dropdown.children().size()) {
            return this.selectHandler({
              currentTarget: dropdown.find(".selected")
            });
          } else {
            return this.addSelection();
          }
          break;
        case 27:
          return this.fold();
        case 38:
          this.setKeydowning();
          $selected = this.$(".dropdown .selected");
          $prev = $selected.prevAll('.option').first();
          $dropdown = this.$(".dropdown");
          if ($prev.size()) {
            prevHeight = $prev.outerHeight();
            prevTop = $prev.position().top;
            ddHeight = $dropdown.outerHeight();
            if (prevTop < 0) {
              $dropdown[0].scrollTop += prevTop;
            }
            $selected.removeClass("selected");
            $prev.addClass("selected");
          } else {
            this.gotoLastDdItem($dropdown, $selected);
          }
          return false;
        case 40:
          this.setKeydowning();
          $selected = this.$(".dropdown .selected");
          $next = $selected.nextAll('.option').first();
          $dropdown = this.$(".dropdown");
          if ($next.size()) {
            nextHeight = $next.outerHeight();
            nextTop = $next.position().top;
            ddHeight = $dropdown.outerHeight();
            if (nextTop + nextHeight > ddHeight) {
              $dropdown[0].scrollTop += nextTop + nextHeight - ddHeight;
            }
            $selected.removeClass("selected");
            $next.addClass("selected");
          } else {
            this.gotoFirstDdItem($dropdown, $selected);
          }
          return false;
      }
    },
    gotoFirstDdItem: function($dropdown, $selected) {
      var $target;
      $target = $dropdown.find('li.option').first();
      if ($target && $target !== $selected) {
        $selected.removeClass('selected');
        $target.addClass('selected');
        return $dropdown[0].scrollTop = 0;
      }
    },
    gotoLastDdItem: function($dropdown, $selected) {
      var $target;
      $target = $dropdown.find('li.option').last();
      if ($target && $target !== $selected) {
        $selected.removeClass('selected');
        $target.addClass('selected');
        return $dropdown[0].scrollTop = $dropdown[0].scrollHeight;
      }
    },
    focusInputHandler: function() {
      clearTimeout(this.__timeoutRemoveFocus);
      this.$(".fake-input").addClass("focus");
      return this.trigger('focus');
    },
    blurInputHandler: function() {
      var that;
      that = this;
      this.__timeoutRemoveFocus = setTimeout(function() {
        var $fakeInput;
        that.fold();
        that.removeDropdown();
        $fakeInput = that.$(".fake-input");
        $fakeInput.removeClass("focus");
        return that.renderLineTip($fakeInput);
      }, 180);
      return null;
    },
    clickInputHandler: function(e) {
      e.stopPropagation();
      this.renderDropdown();
      return false;
    },
    clickFakeInputHandler: function(e) {
      $(e.currentTarget).addClass("focus");
      this.focusInput();
      return false;
    },
    selectHandler: function(e) {
      var $input, $tgt, key, state, type;
      this.focusInput();
      $tgt = $(e.currentTarget);
      $input = this.$("input");
      type = $tgt.data('type');
      state = this.getState();
      if (state.state === 'value') {
        key = state.key + (state.subKey ? "." + state.subKey : '');
        this.addSelection({
          key: key,
          value: $tgt.data('value'),
          type: state.mode,
          vtext: $tgt.data('vtext')
        });
      } else {
        key = $tgt.data('value');
        if (type === 'attribute') {
          if (key === DefaultValues.AllAttributes) {
            this.addSelection({
              key: state.key,
              type: state.mode
            });
            return this.renderDropdown();
          } else {
            key = "" + state.key + "." + key + " = ";
          }
        } else if (type === 'resource') {
          key = "" + key + ".";
        } else {
          key = "tag:" + key + " = ";
        }
        $input.val(key);
      }
      return this.renderDropdown();
    },
    triggerHover: function($sel) {
      var matched, sel, selData;
      if ($sel && this.__justHovered === $sel.get(0)) {
        return;
      }
      this.__justHovered = $sel && $sel.get(0) || null;
      if ($sel) {
        selData = $sel.data();
        sel = [
          this.stringKeyValue({
            key: selData.key,
            value: selData.value,
            type: selData.type
          })
        ];
      } else {
        sel = null;
      }
      matched = this.getMatchedResource(true, sel);
      return this.trigger('hover', matched.matched, matched.effect);
    },
    overSelectionHandler: function(e) {
      console.log('over selection');
      return this.triggerHover($(e.currentTarget));
    },
    leaveSelectionHandler: function(e) {
      console.log('leave selection');
      return this.triggerHover();
    }
  });
  return filterInput;
});

define('tag_manager',['constant', 'CloudResources', "UI.modalplus", "component/awscomps/TagManagerTpl", "FilterInput", "backbone", 'i18n!/nls/lang.js', 'event'], function(constant, CloudResources, Modal, template, FilterInput, Backbone, lang, ide_event) {
  return Backbone.View.extend({
    events: {
      "click .create-tag": "addTag",
      "click .edit-delete": "removeTagUsage",
      "click .edit-done": "changeTags",
      "click .save-tags": "saveAllTags",
      "click .edit-remove-row": "removeRow",
      "click .edit-tags": "editTags",
      "click .cancel": "cancelEdit",
      "keyup .tag-key.input": "changeTagInput",
      "keyup .tag-value.input": "changeTagInput",
      "change #t-m-select-all": "selectAllInput",
      "change .tag-resource-list .checkbox input": "selectInput",
      "click .t-m-content tr.item": "clickItem"
    },
    initialize: function(model) {
      this.instance = Design.instance();
      this.model = model;
      this.setElement(this.renderModal().tpl);
      this.renderFilter();
      return this;
    },
    renderModal: function() {
      this.modal = new Modal({
        title: "Tag Management",
        width: 900,
        height: 500,
        template: template.modalTemplate,
        disableFooter: true,
        disableClose: true
      });
      return this.modal;
    },
    renderFilter: function() {
      var data;
      data = this.model ? {
        uid: this.model.id
      } : null;
      this.filter = new FilterInput(data);
      this.listenTo(this.filter, 'change:filter', this.filterResourceList);
      this.modal.tpl.find(".filter-bar").replaceWith(this.filter.render().el);
      if (data) {
        this.filterResourceList(this.filter.getMatchedResource());
        return this.$el.find(".t-m-content tr.item:first-child").find('input').prop('checked', true);
      } else {
        return this.filterResourceList(this.filter.getFilterableResource());
      }
    },
    selectAllInput: function(e) {
      var isChecked;
      isChecked = $(e.currentTarget).is(":checked");
      this.$el.find(".table-head-fix .item .checkbox input").prop("checked", isChecked);
      return this.renderTagsContent();
    },
    selectInput: function() {
      return this.renderTagsContent();
    },
    clickItem: function(e) {
      if ($(e.target).parents(".checkbox").size() <= 0) {
        return $(e.currentTarget).find('.checkbox input').click();
      }
    },
    editTags: function(e) {
      return this.$('.tag-resource-detail').addClass('show');
    },
    cancelEdit: function(e) {
      return this.$('.tag-resource-detail').removeClass('show');
    },
    changeTags: function(elem) {
      var $tagKey, $tagLi, $tagValue, error, inherit, key, resource, tagAsgComp, tagComp, value;
      $tagLi = $(elem).parents("li");
      $tagKey = $tagLi.find(".tag-key");
      $tagValue = $tagLi.find(".tag-value");
      tagComp = this.instance.component($tagLi.data("id"));
      tagAsgComp = this.instance.component($tagLi.data("asg"));
      if ($tagKey.val()) {
        key = $tagKey.val();
        value = $tagValue.val();
        inherit = $tagLi.find(".checkbox input").is(":checked");
        if (key.indexOf("aws:") === 0) {
          return false;
        }
        resource = this.getAffectedResources();
        if (tagComp) {
          tagComp.update(resource.common, key, value);
        }
        if (tagAsgComp) {
          tagAsgComp.update(resource.asg, key, value, inherit);
        }
        if (!tagComp && !tagAsgComp) {
          error = null;
          _.each(_.union(resource.common, resource.asg), function(res) {
            var err;
            err = res.addTag(key, value, inherit);
            if (err) {
              return error = err;
            }
          });
          if (error) {
            return notification("error", error.error);
          }
        }
      } else {
        return notification("error", "Sorry, but tag should have a key name.");
      }
    },
    saveAllTags: function() {
      var that;
      that = this;
      this.$el.find(".tab-content:visible").find("input.tag-key").not(":disabled").each(function(index, value) {
        if (value.value) {
          return that.changeTags(value);
        }
      });
      this.renderTagsContent();
      this.cancelEdit();
      return ide_event.trigger(ide_event.REFRESH_PROPERTY);
    },
    getAffectedResources: function() {
      var resources, self;
      self = this;
      resources = {
        common: [],
        asg: []
      };
      this.$el.find(".t-m-content .one-cb").each(function(key, value) {
        var comp;
        if ($(value).is(":checked")) {
          comp = self.instance.component($(value).parents("tr").data("id"));
          if (comp.type === "AWS.AutoScaling.Group") {
            return resources.asg.push(comp);
          } else {
            return resources.common.push(comp);
          }
        }
      });
      return resources;
    },
    removeTagUsage: function(e) {
      var $tagLi, asgTagComp, resources, tagComp;
      if (e.currentTarget) {
        $tagLi = $(e.currentTarget).parents("li");
      } else {
        $tagLi = $(e);
      }
      tagComp = this.instance.component($tagLi.data("id"));
      asgTagComp = this.instance.component($tagLi.data("asg"));
      resources = this.getAffectedResources();
      if (!tagComp && !asgTagComp) {
        $tagLi.remove();
        return;
      }
      if (tagComp) {
        _.each(resources.common, function(res) {
          return res.removeTag(tagComp);
        });
      }
      if (asgTagComp) {
        _.each(resources.asg, function(asg) {
          return asg.removeTag(asgTagComp);
        });
      }
      if (e.currentTarget) {
        return this.renderTagsContent();
      }
    },
    renderTagsContent: function(uid) {
      var allComps, checkedAllAsg, checkedAsgComps, checkedAsgData, checkedAsgTagArray, checkedAsgTagIdsArray, checkedComps, checkedData, checkedTagArray, checkedTagIdsArray, info, self, unitedData;
      self = this;
      if (!uid) {
        uid = this.$el.find(".t-m-content .item.selected").data("id");
      }
      checkedAllAsg = true;
      checkedComps = [];
      checkedTagArray = [];
      checkedAsgComps = [];
      checkedAsgTagArray = [];
      this.$el.find(".t-m-content .one-cb:checked").each(function(key, value) {
        var checkedComp;
        checkedComp = self.instance.component($(value).parents("tr").data("id"));
        if (checkedComp.type !== "AWS.AutoScaling.Group") {
          checkedAllAsg = false;
          checkedComps.push(checkedComp);
          return checkedTagArray.push(checkedComp.tags());
        } else {
          checkedAsgComps.push(checkedComp);
          return checkedAsgTagArray.push(checkedComp.tags());
        }
      });
      checkedTagIdsArray = _.map(checkedTagArray, function(tagArray) {
        return _.map(tagArray, function(tag) {
          return tag.id;
        });
      });
      checkedData = _.map(_.intersection.apply(_, checkedTagIdsArray), function(tagId) {
        var tag;
        tag = self.instance.component(tagId);
        return {
          key: tag.get("key"),
          value: tag.get("value"),
          id: tag.id,
          disableEdit: tag.get("retain"),
          allowCheck: checkedAllAsg
        };
      });
      checkedData = _.sortBy(checkedData, function(data) {
        if (data.disableEdit) {
          return -1;
        } else {
          return data.key.toString().charCodeAt(0);
        }
      });
      checkedAsgTagIdsArray = _.map(checkedAsgTagArray, function(tagArray) {
        return _.map(tagArray, function(tag) {
          return tag.id;
        });
      });
      checkedAsgData = _.map(_.intersection.apply(_, checkedAsgTagIdsArray), function(tagId) {
        var tag;
        tag = self.instance.component(tagId);
        return {
          key: tag.get("key"),
          value: tag.get("value"),
          inherit: tag.get("inherit"),
          asg: tag.id,
          disableEdit: tag.get("retain"),
          allowCheck: checkedAllAsg
        };
      });
      unitedData = [];
      if (checkedAsgComps.length) {
        if (checkedComps.length) {
          unitedData = _.compact(_.map(checkedData, function(data) {
            var commonData;
            commonData = _.findWhere(checkedAsgData, {
              key: data.key,
              value: data.value
            });
            if (commonData) {
              commonData.id = data.id;
            }
            return commonData;
          }));
        } else {
          unitedData = checkedAsgData;
        }
      } else {
        unitedData = checkedData;
      }
      allComps = checkedComps.concat(checkedAsgComps);
      this.$el.find(".tab-content[data-id='checked']").html(template.tagResource({
        data: unitedData,
        empty: !allComps.length,
        allAsg: checkedAllAsg
      }));
      if (allComps.length === 1) {
        info = allComps[0].get('name');
        this.$el.find(".tabs-navs").text("Selected Resource (" + info + ")");
      } else {
        this.$el.find(".tabs-navs").text("Intersectional Tags - Selected Resources (" + allComps.length + ")");
      }
      return this.changeTagInput();
    },
    filterResourceList: function(resModels) {
      var models;
      models = _.map(resModels, function(model) {
        return {
          name: model.get("name"),
          appId: model.get("appId"),
          type: model.type,
          id: model.id
        };
      });
      this.modal.tpl.find(".t-m-content").html(template.filterResource({
        models: models
      }));
      if (models.length === 1) {
        this.$el.find(".t-m-content tr.item:first-child").find('input').prop('checked', true);
      }
      return _.delay((function(_this) {
        return function() {
          return _this.renderTagsContent();
        };
      })(this));
    },
    changeTagInput: function() {
      var focusToLast, that;
      that = this;
      focusToLast = false;
      this.$el.find(".tags-list li").each(function(idx, elem) {
        if (!$(elem).find('.input.tag-key').val() && !$(elem).find('.input.tag-value').val()) {
          if ($(elem).next('li').length) {
            focusToLast = true;
          }
          that.removeTagUsage(elem);
          return $(elem).remove();
        } else {
          return $(elem).find('.edit-remove-row').show();
        }
      });
      this.addTag();
      if (focusToLast) {
        return this.$el.find(".tags-list li:last-child .input.tag-key").focus();
      }
    },
    addTag: function(e) {
      var $tagLi, hasNoneAsg, tagId, tagTemplate;
      tagId = this.$el.find(".tags-list li").size() + 1;
      tagTemplate = "<li class=\"edit\">\n    <div class=\"edit\">\n        <input class=\"tag-key input\" type=\"text\" value=\"\" maxlength=\"127\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        <input class=\"tag-value input\" type=\"text\" value=\"\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        <div class=\"checkbox\">\n            <input id='" + tagId + "' type=\"checkbox\" value=\"None\" class=\"one-cb\">\n            <label for=\"" + tagId + "\"></label>\n        </div>\n        <div class=\"action\">\n          <button class=\"btn btn-red edit-remove-row\"><i class=\"icon-del\"></i></button>\n        </div>\n    </div>\n</li>";
      $tagLi = $(tagTemplate);
      $tagLi.appendTo(this.$el.find("ul.tags-list"));
      hasNoneAsg = this.getAffectedResources().common.length > 0;
      if (hasNoneAsg) {
        return $tagLi.find(".checkbox").remove().end().find(".action").addClass("wide");
      }
    },
    removeRow: function(e) {
      return $(e.currentTarget).parents("li").remove();
    }
  });
});

define('component/awscomps/SslCertTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  return escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  };
TEMPLATE.dropdown_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <td>\n        <div class=\"checkbox\">\n            <input id=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"one-cb\">\n            <label for=\"sslcert-select-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n        </div>\n    </td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.UploadDate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n    <td class=\"show-detail icon-toolbar-cloudformation\"></td>\n</tr>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.modal_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-create\" data-bind=\"true\">\n    <div class=\"modal-ssl-cert-create\">\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_CERT_NAME", {hash:{},data:data}))
    + "</label>\n            <input placeholder=\"Required. Up to 128 characters\" class=\"input\" type=\"text\" data-required=\"true\" data-ignore=\"true\" id=\"ssl-cert-name-input\"/>\n        </div>\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_PRIVATE_KEY", {hash:{},data:data}))
    + "</label>\n            <textarea placeholder=\"Required. PEM Encoded\" class=\"input ssl-cert-input\" data-required=\"true\" id=\"ssl-cert-privatekey-input\"></textarea>\n        </div>\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\"  >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_PUBLIC_KEY", {hash:{},data:data}))
    + "</label>\n            <textarea placeholder=\"Required. PEM Encoded\" class=\"input ssl-cert-input\" data-required=\"true\" id=\"ssl-cert-publickey-input\"></textarea>\n        </div>\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\"  >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_CERTIFICATE_CHAIN", {hash:{},data:data}))
    + "</label>\n            <textarea placeholder=\"Optional. PEM Encoded\" class=\"input ssl-cert-input\" id=\"ssl-cert-chain-input\"></textarea>\n        </div>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"create\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPLOAD", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPLOAD_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_create=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DELETE_SSL_CERT_CONFIRM", (depth0 && depth0.selecteKeyName), {hash:{},data:data}));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DELETE_SSL_CERT_CONFIRM_M", (depth0 && depth0.selectedCount), {hash:{},data:data}));
  }

  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selecteKeyName), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red do-action\" data-action=\"delete\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DELETING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_delete=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"slide-update\" data-bind=\"true\">\n    <div class=\"modal-ssl-cert-update\">\n        <div class=\"modal-ssl-cert-item clearfix\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ELB_LBL_LISTENER_CERT_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cert_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-required=\"true\" id=\"ssl-cert-name-update-input\"/>\n        </div>\n    </div>\n    <div class=\"init action\">\n        <button class=\"btn btn-blue do-action\" data-action=\"update\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPDATE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n    <div class=\"processing action\" style=\"display:none;\">\n        <button class=\"btn\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.UPDATING_3PERIOD", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.slide_update=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"detail-info\">\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SERVER_CERTIFICATE_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SERVER_CERTIFICATE_ARN", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n    <div class=\"detail-info-row\">\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.EXPIRATION_DATE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Expiration)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PATH", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.Path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.detail_info=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"combo-dd-no-data\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NO_SSL_CERTIFICATE", {hash:{},data:data}))
    + "</p>\n    <a class=\"create-one\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATE_SSL_CERTIFICATE", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.no_sslcert=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('sslcert_manage',['constant', 'CloudResources', 'toolbar_modal', 'component/awscomps/SslCertTpl', 'i18n!/nls/lang.js', 'event'], function(constant, CloudResources, toolbar_modal, template, lang, ide_event) {
  return Backbone.View.extend({
    tagName: 'section',
    initCol: function() {
      var region;
      region = Design.instance().region();
      this.sslCertCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.IAM, region);
      if (Design.instance().credential()) {
        this.sslCertCol.fetch();
      }
      this.sslCertCol.on('update', this.processCol, this);
      return this.sslCertCol.on('change', this.processCol, this);
    },
    getModalOptions: function() {
      var region, regionName, that;
      that = this;
      region = Design.instance().get('region');
      regionName = constant.REGION_SHORT_LABEL[region];
      return {
        title: sprintf(lang.IDE.MANAGE_SSL_CERT_IN_AREA, regionName),
        classList: 'sslcert-manage',
        resourceName: lang.PROP.RESOURCE_NAME_SSL,
        context: that,
        buttons: [
          {
            icon: 'new-stack',
            type: 'create',
            name: lang.PROP.LBL_UPLOAD_NEW_SSL_CERTIFICATE
          }, {
            icon: 'edit',
            type: 'update',
            disabled: true,
            name: lang.PROP.UPDATE
          }, {
            icon: 'del',
            type: 'delete',
            disabled: true,
            name: lang.PROP.LBL_DELETE
          }, {
            icon: 'refresh',
            type: 'refresh',
            name: ''
          }
        ],
        columns: [
          {
            sortable: true,
            width: "50%",
            name: lang.PROP.NAME
          }, {
            sortable: true,
            rowType: 'datetime',
            width: "33%",
            name: lang.PROP.LBL_UPLOAD_DATE
          }, {
            sortable: false,
            name: lang.PROP.LBL_VIEW_DETAILS
          }
        ]
      };
    },
    initModal: function() {
      new toolbar_modal(this.getModalOptions());
      this.modal.on('close', function() {
        return this.remove();
      }, this);
      this.modal.on('slidedown', this.renderSlides, this);
      this.modal.on('action', this.doAction, this);
      this.modal.on('refresh', this.refresh, this);
      this.modal.on('checked', this.checked, this);
      return this.modal.on('detail', this.detail, this);
    },
    initialize: function() {
      this.initCol();
      this.initModal();
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      return this.listenTo(Design.instance().credential(), "change", this.credChanged);
    },
    credChanged: function() {
      var _ref;
      this.sslCertCol.fetchForce();
      if ((_ref = this.modal) != null) {
        _ref.renderLoading();
      }
      return this.modal && this.refresh();
    },
    quickCreate: function() {
      return this.modal.triggerSlide('create');
    },
    doAction: function(action, checked) {
      return this[action] && this[action](this.validate(action), checked);
    },
    validate: function(action) {
      switch (action) {
        case 'create':
          return true;
      }
    },
    genDeleteFinish: function(times) {
      var error, finHandler, success, that;
      success = [];
      error = [];
      that = this;
      finHandler = _.after(times, function() {
        that.modal.cancel();
        if (success.length === 1) {
          notification('info', sprintf(lang.NOTIFY.XXX_IS_DELETED, success[0].get('Name')));
        } else if (success.length > 1) {
          notification('info', sprintf(lang.NOTIFY.SELECTED_XXX_SNS_TOPIC_ARE_DELETED, success.length));
        }
        return _.each(error, function(s) {
          return console.log(s);
        });
      });
      return function(res) {
        if (res instanceof Backbone.Model) {
          success.push(res);
        } else {
          error.push(res);
        }
        return finHandler();
      };
    },
    create: function(invalid) {
      var $certChain, $certName, $certPrikey, $certPubkey, certName, that;
      that = this;
      this.switchAction('processing');
      $certName = $('#ssl-cert-name-input');
      $certPrikey = $('#ssl-cert-privatekey-input');
      $certPubkey = $('#ssl-cert-publickey-input');
      $certChain = $('#ssl-cert-chain-input');
      certName = $certName.val();
      if (certName === 'None') {
        notification('error', sprintf(lang.NOTIFY.CERTIFICATE_NAME_XXX_IS_INVALID, certName));
        return;
      }
      return this.sslCertCol.create({
        Name: certName,
        CertificateBody: $certPubkey.val(),
        PrivateKey: $certPrikey.val(),
        CertificateChain: $certChain.val(),
        Path: ''
      }).save().then(function(result) {
        notification('info', sprintf(lang.NOTIFY.CERTIFICATE_XXX_IS_UPLOADED, certName));
        return that.modal.cancel();
      }, function(result) {
        that.switchAction();
        if (result.awsResult) {
          return notification('error', result.awsResult);
        }
      });
    },
    "delete": function(invalid, checked) {
      var count, onDeleteFinish, that;
      count = checked.length;
      that = this;
      onDeleteFinish = this.genDeleteFinish(count);
      this.switchAction('processing');
      return _.each(checked, function(c) {
        var m;
        m = that.sslCertCol.get(c.data.id);
        return m != null ? m.destroy().then(onDeleteFinish, onDeleteFinish) : void 0;
      });
    },
    update: function(invalid, checked) {
      var newCertName, oldCerName, sslCertData, sslCertId, that;
      that = this;
      this.switchAction('processing');
      if (checked && checked[0]) {
        sslCertId = checked[0].data.id;
        sslCertData = that.sslCertCol.get(sslCertId);
        oldCerName = sslCertData.get('Name');
        newCertName = $('#ssl-cert-name-update-input').val();
        if (newCertName === oldCerName) {
          return that.modal.cancel();
        } else {
          return sslCertData.update({
            Name: newCertName
          }).then(function(result) {
            var certName, sslCertModelAry;
            certName = newCertName;
            notification('info', sprintf(lang.NOTIFY.CERTIFICATE_XXX_IS_UPLOADED, certName));
            sslCertModelAry = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
            _.each(sslCertModelAry, function(sslCertModel) {
              if (sslCertModel.get('name') === oldCerName) {
                sslCertModel.set('name', newCertName);
                sslCertModel.set('arn', sslCertData.get('Arn'));
              }
              return null;
            });
            ide_event.trigger(ide_event.REFRESH_PROPERTY);
            return that.modal.cancel();
          }, function(result) {
            that.switchAction();
            if (result.awsResult) {
              return notification('error', result.awsResult);
            }
          });
        }
      }
    },
    detail: function(event, data, $tr) {
      var detailTpl, sslCertData, sslCertId, that;
      that = this;
      sslCertId = data.id;
      sslCertData = this.sslCertCol.get(sslCertId).toJSON();
      sslCertData.Expiration = MC.dateFormat(new Date(sslCertData.Expiration), 'yyyy-MM-dd hh:mm:ss');
      detailTpl = template.detail_info;
      return this.modal.setDetail($tr, detailTpl(sslCertData));
    },
    refresh: function() {
      return this.sslCertCol.fetchForce();
    },
    checked: function(event, checkedAry) {
      var $editBtn;
      $editBtn = this.M$('.toolbar .icon-edit');
      if (checkedAry.length === 1) {
        return $editBtn.removeAttr('disabled');
      } else {
        return $editBtn.attr('disabled', 'disabled');
      }
    },
    switchAction: function(state) {
      if (!state) {
        state = 'init';
      }
      return this.M$('.slidebox .action').each(function() {
        if ($(this).hasClass(state)) {
          return $(this).show();
        } else {
          return $(this).hide();
        }
      });
    },
    render: function() {
      this.modal.render();
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.processCol();
      } else {
        this.modal.render('nocredential');
      }
      return this;
    },
    processCol: function() {
      var data;
      if (this.sslCertCol.isReady()) {
        data = this.sslCertCol.map(function(sslCertModel) {
          var sslCertData;
          sslCertData = sslCertModel.toJSON();
          sslCertData.UploadDate = MC.dateFormat(new Date(sslCertData.UploadDate), 'yyyy-MM-dd hh:mm:ss');
          return sslCertData;
        });
        this.renderList(data);
      }
      return false;
    },
    renderList: function(data) {
      return this.modal.setContent(template.modal_list(data));
    },
    renderNoCredential: function() {
      return this.modal.render('nocredential').toggleControls(false);
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template["slide_" + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    processSlideCreate: function() {},
    getSlides: function() {
      var modal, that;
      that = this;
      modal = this.modal;
      return {
        create: function(tpl, checked) {
          var allTextBox, processCreateBtn;
          modal.setSlide(tpl);
          allTextBox = that.M$('.slide-create input, .slide-create textarea');
          processCreateBtn = function(event) {
            if ($(event.currentTarget).parsley('validateForm', false)) {
              return that.M$('.slide-create .do-action').prop('disabled', false);
            } else {
              return that.M$('.slide-create .do-action').prop('disabled', true);
            }
          };
          return allTextBox.on('keyup', processCreateBtn);
        },
        "delete": function(tpl, checked) {
          var checkedAmount, data;
          checkedAmount = checked.length;
          if (!checkedAmount) {
            return;
          }
          data = {};
          if (checkedAmount === 1) {
            data.selecteKeyName = checked[0].data.name;
          } else {
            data.selectedCount = checkedAmount;
          }
          return modal.setSlide(tpl(data));
        },
        update: function(tpl, checked) {
          var allTextBox, certName, processCreateBtn;
          that = this;
          if (checked && checked[0]) {
            certName = checked[0].data.name;
            modal.setSlide(tpl({
              cert_name: certName
            }));
          }
          allTextBox = that.M$('.slide-update input');
          processCreateBtn = function(event) {
            if ($(event.currentTarget).parsley('validateForm', false)) {
              return that.M$('.slide-update .do-action').prop('disabled', false);
            } else {
              return that.M$('.slide-update .do-action').prop('disabled', true);
            }
          };
          return allTextBox.on('keyup', processCreateBtn);
        }
      };
    },
    show: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.sslCertCol.fetch();
        return this.processCol();
      } else {
        return this.renderNoCredential();
      }
    },
    manage: function() {},
    set: function() {},
    filter: function(keyword) {
      return this.processCol(true, keyword);
    }
  });
});

define('sslcert_dropdown',['constant', 'CloudResources', 'sslcert_manage', 'combo_dropdown', 'component/awscomps/SslCertTpl', 'i18n!/nls/lang.js'], function(constant, CloudResources, sslCertManage, comboDropdown, template, lang) {
  return Backbone.View.extend({
    tagName: 'section',
    initCol: function() {
      var region;
      region = Design.instance().region();
      this.sslCertCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.IAM, region);
      return this.sslCertCol.on('update', this.processCol, this);
    },
    initDropdown: function() {
      var options;
      options = {
        manageBtnValue: lang.PROP.INSTANCE_MANAGE_SSL_CERT,
        filterPlaceHolder: lang.PROP.INSTANCE_FILTER_SSL_CERT,
        resourceName: lang.PROP.RESOURCE_NAME_SSL
      };
      this.dropdown = new comboDropdown(options);
      this.dropdown.on('open', this.show, this);
      this.dropdown.on('manage', this.manage, this);
      this.dropdown.on('change', this.set, this);
      this.dropdown.on('filter', this.filter, this);
      return this.dropdown.on('quick_create', this.quickCreate, this);
    },
    initialize: function() {
      this.initCol();
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this.initDropdown();
    },
    credChanged: function() {
      var _ref;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      return this.sslCertCol.fetchForce();
    },
    quickCreate: function() {
      return new sslCertManage().render().quickCreate();
    },
    render: function() {
      var selectionName;
      selectionName = this.sslCertName || 'None';
      this.el = this.dropdown.el;
      if (selectionName === 'None') {
        $(this.el).addClass('empty');
        this.sslCertCol.fetch();
      }
      this.dropdown.setSelection(selectionName);
      return this;
    },
    setDefault: function() {
      var compModel, currentListenerObj, data, listenerAry, _ref;
      if (this.sslCertCol.isReady()) {
        data = this.sslCertCol.toJSON();
        if (data && data[0] && this.uid) {
          if (this.dropdown.getSelection() === 'None') {
            compModel = Design.instance().component(this.uid);
            if (compModel) {
              listenerAry = compModel.get('listeners');
              currentListenerObj = listenerAry[this.listenerNum];
              if (currentListenerObj && ((_ref = currentListenerObj.protocol) === 'HTTPS' || _ref === 'SSL')) {
                compModel.setSSLCert(this.listenerNum, data[0].id);
                this.dropdown.trigger('change', data[0].id);
                this.dropdown.setSelection(data[0].Name);
                return $(this.el).removeClass('empty');
              }
            }
          }
        }
      }
    },
    processCol: function(filter, keyword) {
      var data, len;
      if (this.sslCertCol.isReady()) {
        data = this.sslCertCol.toJSON();
        this.setDefault();
        if (filter) {
          len = keyword.length;
          data = _.filter(data, function(d) {
            return d.Name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
          });
        }
        this.renderDropdownList(data);
      }
      return false;
    },
    renderDropdownList: function(data) {
      var selection;
      if (data.length) {
        selection = this.dropdown.getSelection();
        _.each(data, function(d) {
          if (d.Name && d.Name === selection) {
            d.selected = true;
          }
          return null;
        });
        return this.dropdown.setContent(template.dropdown_list(data)).toggleControls(true);
      } else {
        return this.dropdown.setContent(template.no_sslcert({})).toggleControls(true);
      }
    },
    renderNoCredential: function() {
      return this.dropdown.render('nocredential').toggleControls(false);
    },
    show: function() {
      if (Design.instance().credential() && !Design.instance().credential().isDemo()) {
        this.sslCertCol.fetch();
        return this.processCol();
      } else {
        return this.renderNoCredential();
      }
    },
    manage: function() {
      return new sslCertManage().render();
    },
    set: function(id, data) {
      var currentListenerObj, listenerAry, _ref;
      if (this.uid && id) {
        listenerAry = Design.instance().component(this.uid).get('listeners');
        currentListenerObj = listenerAry[this.listenerNum];
        if (currentListenerObj && ((_ref = currentListenerObj.protocol) === 'HTTPS' || _ref === 'SSL')) {
          return Design.instance().component(this.uid).setSSLCert(this.listenerNum, id);
        }
      }
    },
    filter: function(keyword) {
      return this.processCol(true, keyword);
    }
  });
});

define('component/awscomps/OgTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  return escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  };
TEMPLATE.dropdown_selection=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" tabindex=\"-1\">\n        "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n        <div class=\"option-preview\">"
    + escapeExpression(((stack1 = (depth0 && depth0.preview)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.id), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  
  return "<div class=\"icon-edit\"></div>";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.dropdown_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"combo-dd-no-data\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NO_OPTION_GROUP_PERIOD", {hash:{},data:data}))
    + "</p>\n    <a class=\"create-one\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATE_OPTION_GROUP", {hash:{},data:data}))
    + "</a>\n</div>";
  return buffer;
  };
TEMPLATE.no_option_group=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"port-sg\">\n        <div>\n            <label for=\"og-port\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT", {hash:{},data:data}))
    + "</label>\n            <input type=\"text\" id=\"og-port\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-type=\"number\" autocomplete=\"off\" data-min=\"1150\" data-max=\"65535\"/>\n        </div>\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SECURITY_GROUP", {hash:{},data:data}))
    + "</label>\n        <ul class=\"acl-sg-info-list mega-list-wraper\" id=\"og-sg\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgs), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n    </div>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li>\n                <div class=\"checkbox-wrap col1\">\n                    <div class=\"checkbox\">\n                        <input type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.used), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"og-sg-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n                        <label for=\"og-sg-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n                    </div>\n                </div>\n\n                <div class=\"col2\">\n                    <div class=\"col2-1 truncate\"><div class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></div><span class=\"sg-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n                    <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                    <div class=\"col2-3 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_LBL_MEMBER", {hash:{},data:data}))
    + "</div>\n                </div>\n            </li>\n            ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program5(depth0,data) {
  
  
  return "checked";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <table class=\"table\">\n        <tr>\n            <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION_SETTING", {hash:{},data:data}))
    + "</th>\n            <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VALUE", {hash:{},data:data}))
    + "</th>\n            <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ALLOWED_VALUES", {hash:{},data:data}))
    + "</th>\n        </tr>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.OptionGroupOptionSettings), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            <td class=\"value\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.program(13, program13, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </td>\n            <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllowedValues)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        </tr>\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <select name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"option-setting select3\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </select>\n                ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <option value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</option>\n                    ";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "selected";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <input name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SettingName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-type=\"number\" class=\"input option-setting\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-start=\""
    + escapeExpression(((stack1 = (depth0 && depth0.start)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-end=\""
    + escapeExpression(((stack1 = (depth0 && depth0.end)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n                ";
  return buffer;
  }

  buffer += "<form class=\"content clearfix\" data-bind=\"true\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.DefaultPort), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.OptionGroupOptionSettings), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"action\">\n        <a class=\"btn btn-blue do-action add-option\" data-option-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SAVE_OPTION", {hash:{},data:data}))
    + "</a>\n        <a class=\"btn btn-silver cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</a>\n    </div>\n</form>";
  return buffer;
  };
TEMPLATE.og_slide=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"slide-delete\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CONFIRM_TO_DELETE_THIS_OPTION_GROUP_QUESTION", {hash:{},data:data}))
    + "</div>\n    <div class=\"init action\">\n        <button class=\"btn btn-red remove-confirm\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>\n        <button class=\"btn btn-silver remove-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.og_slide_remove=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.MySQL.Options.html\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "READ_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.Options.html\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "READ_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n            ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.SQLServer.Options.html\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "READ_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n            ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"og-apply-immediately\">\n                <div class=\"checkbox tooltip\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <input type=\"checkbox\" id=\"option-apply-immediately\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.applyImmediately), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                    <label for=\"option-apply-immediately\"></label>\n                </div>\n                <label for=\"option-apply-immediately\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_APPLY_IMMEDIATELY", {hash:{},data:data}))
    + "</label>\n            </div>\n            ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip="
    + escapeExpression(helpers.i18n.call(depth0, "RDS_PORT_CHANGE_REQUIRES_APPLIED_IMMEDIATELY", {hash:{},data:data}));
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "checked";
  }

function program13(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppPortChanged), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program15(depth0,data) {
  
  
  return "disabled";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button class=\"remove-btn btn btn-red ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_DELETE", {hash:{},data:data}))
    + "</button>";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "disabled tooltip";
  }

function program20(depth0,data) {
  
  
  return "data-tooltip=\"This option group canot be deleted since it is currently in use.\"";
  }

  buffer += "<div id=\"modal-option-group\">\n    <div class=\"slidebox\">\n        <div class=\"form\"></div>\n        <div class=\"error\">\n        </div>\n    </div>\n    <div class=\"will-be-covered\">\n        <div class=\"header\">\n            "
    + escapeExpression(helpers.i18n.call(depth0, "OPTION_GROUP_USED_FOR", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.engineName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.engineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "mysql", {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "oracle", {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.engineType), "sqlserver", {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"container optiongroup\">\n            <div class=\"input-item\">\n                <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.NAME", {hash:{},data:data}))
    + "</label>\n                <input class=\"input og-name\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n            <div class=\"input-item\">\n                <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n                <input class=\"input og-description\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n            </div>\n            <div class=\"left option-list-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION", {hash:{},data:data}))
    + "</div>\n            <ul class=\"option-list\"></ul>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n        <div class=\"modal-footer\">\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isCreate), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <span class=\"err-tip\"></span>\n            <button class=\"save-btn btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SAVE", {hash:{},data:data}))
    + "</button>\n            <button class=\"btn btn-silver modal-close cancel-btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CANCEL", {hash:{},data:data}))
    + "</button>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.og_modal=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"option-item\" data-idx=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Persistent), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Permenant), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div class=\"option-edit-btn ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.unmodify), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-btn-details\"></div>\n    <label class=\"switcher";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.unmodify), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <span class=\"switch-label\" data-on=\"ON\" data-off=\"OFF\"></span>\n        <span class=\"switch-handle\"></span>\n    </label>\n\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"persistent\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PERSISTENT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"permenant\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PERMENANT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "invisible";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.visible), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }
function program9(depth0,data) {
  
  
  return " invisible";
  }

function program11(depth0,data) {
  
  
  return " on";
  }

function program13(depth0,data) {
  
  
  return " disabled";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.ogOptions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.og_option_item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li class=\"option-item\" data-idx=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.OptionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <div class=\"og-title clearfix\">\n            <div class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Persistent), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Permenant), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <a class=\"toggle-og-detail show-og-detail\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SHOW_DETAILS", {hash:{},data:data}))
    + "</a>\n            <a class=\"toggle-og-detail hide-og-detail\" style=\"display:none;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.HIDE_DETAILS", {hash:{},data:data}))
    + "</a>\n        </div>\n        <div class=\"og-details\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Port), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.VpcSecurityGroupMemberships), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <table class=\"table\">\n                <tr><th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SETTING", {hash:{},data:data}))
    + "</th><th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VALUE", {hash:{},data:data}))
    + "</th></tr>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.OptionSettings), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </table>\n        </div>\n    </li>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"persistent\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PERSISTENT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"permenant\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PERMENANT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT_COLON", {hash:{},data:data}))
    + "</span>\n                <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SECURITY_GROUP_COLON", {hash:{},data:data}))
    + "</span>\n                <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.VpcSecurityGroupId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr><td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td><td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td></tr>\n                ";
  return buffer;
  }

  buffer += "<div class=\"summary clearfix\">\n    <dl>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION_GROUP_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENGINE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.EngineName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION_GROUP_DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENGINE_VERSION", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.MajorEngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n</div>\n<div class=\"left option-list-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.OPTION", {hash:{},data:data}))
    + "("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Options)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n<ul class=\"option-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.Options), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;
  };
TEMPLATE.og_app_modal=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define('og_manage',['constant', 'CloudResources', 'component/common/toolbarModalTpl', 'component/awscomps/OgTpl', 'i18n!/nls/lang.js', 'event', 'UI.modalplus'], function(constant, CloudResources, toolbar_modal_tpl, template, lang, ide_event, modalplus) {
  var capitalizeKey, valueInRange;
  valueInRange = function(start, end) {
    return function(val) {
      val = +val;
      if (val > end || val < start) {
        return sprintf(lang.PARSLEY.RDS_VALUE_IS_NOT_ALLOWED, val);
      }
      return null;
    };
  };
  capitalizeKey = function(arr) {
    var a, k, newK, obj, returnArr, v, _i, _len;
    returnArr = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      a = arr[_i];
      obj = {};
      for (k in a) {
        v = a[k];
        newK = k.charAt(0).toUpperCase() + k.substring(1);
        obj[newK] = v;
      }
      returnArr.push(obj);
    }
    return returnArr;
  };
  return Backbone.View.extend({
    id: 'modal-option-group',
    tagName: 'section',
    className: 'modal-toolbar',
    events: {
      'click .option-item .switcher': 'optionChanged',
      'click .option-item .option-edit-btn': 'optionEditClicked',
      'click .cancel': 'cancel',
      'click .add-option': 'addOption',
      'click .save-btn': 'saveClicked',
      'click .remove-btn': 'removeClicked',
      'click .cancel-btn': 'cancelClicked',
      'submit form': 'doNothing',
      'click #og-sg input': 'changeSg',
      'click .remove-confirm': 'removeConfirm',
      'click .remove-cancel': 'removeCancel',
      'change #option-apply-immediately': 'changeApplyImmediately'
    },
    changeApplyImmediately: function(e) {
      return this.model.set('applyImmediately', e.currentTarget.checked);
    },
    changeSg: function(e) {
      var checked, sgCbs;
      checked = e.currentTarget.checked;
      sgCbs = $('#og-sg input:checked');
      if (!sgCbs.length) {
        return false;
      }
      return null;
    },
    doNothing: function() {
      return false;
    },
    getModalOptions: function() {
      return {
        title: lang.IDE.RDS_EDIT_OPTION_GROUP,
        classList: 'option-group-manage',
        context: that
      };
    },
    isAppPortChanged: function() {
      var appData, appId, appOptions, that, _ref;
      if (!this.isAppEdit) {
        return false;
      }
      appId = this.ogModel.get('appId');
      appData = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBOG, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
      if (!appData) {
        return false;
      }
      appOptions = {};
      that = this;
      _.each(appData.Options, function(option) {
        return appOptions[option.OptionName] = option;
      });
      return _.some(appOptions, function(option, name) {
        return that.ogDataStore[name] && +that.ogDataStore[name].Port !== +option.Port;
      });
    },
    initModal: function(tpl) {
      var options, that;
      that = this;
      options = {
        template: tpl,
        title: lang.IDE.RDS_EDIT_OPTION_GROUP,
        disableFooter: true,
        disableClose: true,
        width: '855px',
        height: '473px',
        compact: true,
        mode: "panel"
      };
      this.__modalplus = new modalplus(options);
      this.__modalplus.on('closed', this.close, this);
      this.dropdown.refresh();
      return null;
    },
    initialize: function(option) {
      var engineOptions, optionAry, optionCol, that;
      that = this;
      this.isAppEdit = Design.instance().modeIsAppEdit();
      this.dropdown = option.dropdown;
      this.isCreate = option.isCreate;
      this.dbInstance = option.dbInstance;
      optionCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBENGINE, Design.instance().region());
      engineOptions = optionCol.getOptionGroupsByEngine(Design.instance().region(), option.engine);
      if (engineOptions) {
        this.ogOptions = engineOptions[option.version];
      }
      this.ogModel = option.model;
      this.ogNameOptionMap = {};
      this.ogDataStore = {};
      optionAry = this.ogModel.get('options');
      _.each(optionAry, function(option) {
        that.ogDataStore[option.OptionName] = option;
        return null;
      });
      _.each(this.ogOptions, function(option) {
        that.ogNameOptionMap[option.Name] = option;
        if (that.ogDataStore[option.Name]) {
          option.checked = true;
        } else {
          option.checked = false;
        }
        if (that.isAppEdit && (option.Permanent || option.Persistent) && that.ogModel.get('appId')) {
          option.unmodify = true;
        } else {
          option.unmodify = false;
        }
        if (!(!option.DefaultPort && !option.OptionGroupOptionSettings)) {
          option.visible = true;
        }
        return null;
      });
      return null;
    },
    render: function() {
      var ogData;
      ogData = this.ogModel.toJSON();
      ogData.isCreate = this.isCreate;
      ogData.isAppEdit = this.isAppEdit;
      ogData.engineType = this.ogModel.engineType();
      ogData.isAppPortChanged = this.isAppPortChanged();
      this.$el.html(template.og_modal(ogData));
      this.initModal(this.el);
      if (!(Design.instance().credential() && !Design.instance().credential().isDemo())) {
        this.renderNoCredential();
        return false;
      }
      this.renderOptionList();
      this.__modalplus.resize();
      return this;
    },
    renderOptionList: function() {
      return this.$el.find('.option-list').html(template.og_option_item({
        ogOptions: this.ogOptions,
        isAppEdit: this.isAppEdit
      }));
    },
    slide: function(option, callback) {
      var data;
      if (!option.DefaultPort && !option.OptionGroupOptionSettings) {
        callback({
          Port: '',
          VpcSecurityGroupMemberships: [],
          OptionSettings: []
        });
        return;
      }
      this.optionCb = callback;
      data = this.ogDataStore[option.Name];
      this.renderSlide(option, data);
      return this.$('.slidebox').addClass('show');
    },
    slideUp: function() {
      return this.$('.slidebox').removeClass('show').removeAttr("style");
    },
    cancel: function() {
      this.slideUp();
      if (typeof this.optionCb === "function") {
        this.optionCb(null);
      }
      return null;
    },
    removeConfirm: function() {
      this.ogModel.remove();
      this.dropdown.setSelection(this.dbInstance.getOptionGroupName());
      this.dropdown.refresh();
      this.slideUp();
      return this.__modalplus.close();
    },
    removeCancel: function() {
      return this.slideUp();
    },
    addOption: function(e) {
      var data, form, optionName, port, sgCbs;
      optionName = $(e.currentTarget).data('optionName');
      form = $('form');
      if (!form.parsley('validate')) {
        this.$('.error').html(lang.IDE.RDS_SOME_ERROR_OCCURED);
        return;
      }
      data = {
        OptionSettings: capitalizeKey(form.serializeArray())
      };
      port = $('#og-port').val();
      sgCbs = $('#og-sg input:checked');
      data.Port = port || '';
      data.VpcSecurityGroupMemberships = [];
      sgCbs.each(function() {
        return data.VpcSecurityGroupMemberships.push(Design.instance().component($(this).data('uid')).createRef('GroupId'));
      });
      if (typeof this.optionCb === "function") {
        this.optionCb(data);
      }
      this.ogDataStore[optionName] = data;
      this.slideUp();
      return null;
    },
    renderSlide: function(option, data) {
      var arr, end, i, s, start, that, _i, _len, _ref;
      option = jQuery.extend(true, {}, option);
      if (option.OptionGroupOptionSettings && !_.isArray(option.OptionGroupOptionSettings)) {
        option.OptionGroupOptionSettings = [option.OptionGroupOptionSettings];
      }
      if (option.DefaultPort) {
        option.port = (data != null ? data.Port : void 0) || option.DefaultPort;
        option.sgs = [];
        Design.modelClassForType(constant.RESTYPE.SG).each(function(obj) {
          var json, _ref;
          json = obj.toJSON();
          json["default"] = obj.isDefault();
          json.color = obj.color;
          json.ruleCount = obj.ruleCount();
          json.memberCount = obj.getMemberList().length;
          if (data && data.VpcSecurityGroupMemberships) {
            if (_ref = obj.createRef('GroupId'), __indexOf.call(data.VpcSecurityGroupMemberships, _ref) >= 0) {
              json.checked = true;
            }
          }
          if (json["default"]) {
            if (!data) {
              json.checked = true;
            }
            return option.sgs.unshift(json);
          } else {
            return option.sgs.push(json);
          }
        });
      }
      _ref = option.OptionGroupOptionSettings || [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        s = _ref[i];
        if (s.AllowedValues.indexOf(',') >= 0) {
          s.items = _.map(s.AllowedValues.split(','), function(v) {
            return {
              value: v,
              selected: data && v === data.OptionSettings[i].Value
            };
          });
        } else if (s.AllowedValues.indexOf('-') >= 0) {
          arr = s.AllowedValues.split('-');
          start = +arr[0];
          end = +arr[1];
          s.start = start;
          s.end = end;

          /*
          if end - start < 10
              s.items = _.range start, end + 1
           */
        }
        if (s.items) {
          s.AllowedValues = '';
        }
        if (data) {
          s.value = data.OptionSettings[i].Value;
        } else {
          s.value = s.DefaultValue;
        }
      }
      this.$('.form').html(template.og_slide(option || {}));
      this.$('.error').html('');
      console.log("Initing...");
      that = this;
      window.setTimeout(function() {
        return that.__modalplus.$(".slidebox.show").css('max-height', that.__getHeightOfContent());
      }, 0);
      $(window).on('resize', function() {
        return that.__modalplus.$(".slidebox.show").css('max-height', that.__getHeightOfContent());
      });
      $('form input').each(function() {
        var $this;
        $this = $(this);
        start = +$this.data('start');
        end = +$this.data('end');
        if (isFinite(start) && isFinite(end)) {
          return $this.parsley('custom', valueInRange(start, end));
        }
      });
      return null;
    },
    __getHeightOfContent: function() {
      var $modal, headerHeight, windowHeight;
      windowHeight = $(window).height();
      $modal = this.__modalplus.tpl;
      headerHeight = $modal.find(".modal-header").outerHeight();
      return windowHeight - headerHeight;
    },
    renderRemoveConfirm: function() {
      this.$('.slidebox').addClass('show');
      return this.$('.slidebox .form').html(template.og_slide_remove({}));
    },
    renderNoCredential: function() {
      return this.__modalplus.setContent(toolbar_modal_tpl.nocredential({
        resourceName: lang.PROP.RESOURCE_NAME_OPTION_GROUP
      }));
    },
    renderSlides: function(which, checked) {
      var slides, tpl, _ref;
      tpl = template["slide_" + which];
      slides = this.getSlides();
      return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
    },
    close: function() {
      this.optionCb = null;
      return this.remove();
    },
    handleApplyImmediately: function() {
      if (this.isAppPortChanged()) {
        return this.$('#option-apply-immediately').prop('disabled', true).prop('checked', true).parent().data('tooltip', lang.IDE.RDS_PORT_CHANGE_REQUIRES_APPLIED_IMMEDIATELY);
      } else {
        return this.$('#option-apply-immediately').prop('disabled', false).parent().removeAttr('data-tooltip');
      }
    },
    optionChanged: function(event) {
      var $optionEdit, $optionItem, $switcher, option, optionIdx, optionName, that;
      that = this;
      $switcher = $(event.currentTarget);
      $optionEdit = $switcher.siblings('.option-edit-btn');
      $switcher.toggleClass('on');
      $optionItem = $switcher.parents('.option-item');
      optionIdx = Number($optionItem.data('idx'));
      optionName = $optionItem.data('name');
      if ($switcher.hasClass('on')) {
        option = this.ogOptions[optionIdx];
        if (!(!option.DefaultPort && !option.OptionGroupOptionSettings)) {
          $optionEdit.removeClass('invisible');
        }
        this.slide(option, function(optionData) {
          if (optionData) {
            return that.ogDataStore[optionName] = optionData;
          } else {
            return that.setOption($optionItem, false);
          }
        });
        this.handleApplyImmediately();
      } else {
        $optionEdit.addClass('invisible');
      }
      return null;
    },
    optionEditClicked: function(event) {
      var $optionEdit, $optionItem, optionIdx, optionName, that;
      that = this;
      $optionEdit = $(event.currentTarget);
      $optionItem = $optionEdit.parents('.option-item');
      optionIdx = Number($optionItem.data('idx'));
      optionName = $optionItem.data('name');
      return this.slide(this.ogOptions[optionIdx], function(optionData) {
        if (optionData) {
          that.ogDataStore[optionName] = optionData;
        }
        return that.handleApplyImmediately();
      });
    },
    setOption: function($item, value) {
      var $optionEdit, $switcher;
      $switcher = $item.find('.switcher');
      $optionEdit = $switcher.siblings('.option-edit-btn');
      if (value) {
        $switcher.addClass('on');
        return $optionEdit.removeClass('invisible');
      } else {
        $switcher.removeClass('on');
        return $optionEdit.addClass('invisible');
      }
    },
    getOption: function($item) {
      var $switcher;
      $switcher = $item.find('.switcher');
      return $switcher.hasClass('on');
    },
    getOptionByName: function(ogName) {
      var $switcher;
      $switcher = this.$('.option-list .option-item[data-name="' + ogName + '"]').find('.switcher');
      return $switcher.hasClass('on');
    },
    saveClicked: function() {
      var $ogDesc, $ogItemList, $ogName, isRightDepend, ogDataAry, ogDesc, ogName, ogNameCheck, that;
      that = this;
      $ogName = this.$('.og-name');
      $ogDesc = this.$('.og-description');
      $ogName.val($ogName.val().toLowerCase());
      $ogName.parsley('custom', function(val) {
        var errTip;
        errTip = lang.PARSLEY.OPTION_GROUP_NAME_INVALID;
        if (val[val.length - 1] === '-' || (val.indexOf('--') !== -1)) {
          return errTip;
        }
        if (val.length < 1 || val.length > 255) {
          return errTip;
        }
        if (!MC.validate('letters', val[0])) {
          return errTip;
        }
      });
      ogNameCheck = MC.aws.aws.checkResName(this.ogModel.get('id'), $ogName, "OptionGroup");
      $ogDesc.parsley('custom', function(val) {
        var errTip;
        errTip = lang.PARSLEY.OPTION_GROUP_DESCRIPTION_INVALID;
        if (val.length < 1) {
          return errTip;
        }
      });
      isRightDepend = true;
      $ogItemList = that.$('.option-list .option-item');
      _.each($ogItemList, function(ogItem) {
        var $ogItem, dependAry, dependName, errTip, needAry, ogDefine, ogName, option;
        $ogItem = $(ogItem);
        option = that.getOption($ogItem);
        if (option) {
          ogName = $ogItem.data('name');
          ogDefine = that.ogNameOptionMap[ogName];
          if (ogDefine.OptionsDependedOn && ogDefine.OptionsDependedOn.OptionName) {
            dependName = ogDefine.OptionsDependedOn.OptionName;
            dependAry = dependName.split(',');
            needAry = [];
            _.each(dependAry, function(depend) {
              var isOn;
              isOn = that.getOptionByName(depend);
              if (!isOn) {
                return needAry.push(depend);
              }
            });
            if (needAry.length) {
              isRightDepend = false;
              errTip = "" + ogName + " has a dependency on " + (needAry.join(',')) + " option.";
              that.$('.err-tip').text(errTip);
            }
          }
        }
        return null;
      });
      if (!isRightDepend) {
        return;
      }
      if ($ogName.parsley('validate') && $ogDesc.parsley('validate') && ogNameCheck) {
        ogName = $ogName.val();
        ogDesc = $ogDesc.val();
        this.ogModel.set('name', ogName);
        this.ogModel.set('description', ogDesc);
        ogDataAry = [];
        $ogItemList = this.$('.option-list .option-item');
        _.each($ogItemList, function(ogItem) {
          var $ogItem, ogData, option;
          $ogItem = $(ogItem);
          option = that.getOption($ogItem);
          if (option) {
            ogName = $ogItem.data('name');
            ogData = that.ogDataStore[ogName];
            ogData.OptionName = ogName;
            ogDataAry.push(ogData);
          }
          return null;
        });
        this.ogModel.set('options', ogDataAry);
        this.dropdown.refresh();
        this.__modalplus.close();
        return null;
      }
    },
    removeClicked: function(event) {
      var that;
      that = this;
      if (!$(event.target).hasClass('disabled')) {
        return this.renderRemoveConfirm();
      }
    },
    cancelClicked: function() {
      var that;
      that = this;
      return this.__modalplus.close();
    }
  });
});

define('og_manage_app',['constant', 'CloudResources', 'component/awscomps/OgTpl', 'i18n!/nls/lang.js', 'event', 'UI.modalplus'], function(constant, CloudResources, template, lang, ide_event, modalplus) {
  return Backbone.View.extend({
    id: 'modal-option-group',
    tagName: 'section',
    className: 'modal-toolbar modal-option-group-app',
    events: {
      'click .toggle-og-detail': "toggleDetail"
    },
    toggleDetail: function(e) {
      var $li, $target;
      $target = $(e.currentTarget);
      $li = $target.closest('li');
      $li.toggleClass('show-details');
      return $li.find('.toggle-og-detail').toggle();
    },
    initModal: function(tpl) {
      var options;
      options = {
        template: tpl,
        title: this.model.get('appId'),
        width: '855px',
        height: '473px',
        compact: true,
        confirm: {
          hide: true
        },
        cancel: {
          text: 'Close'
        }
      };
      this.__modalplus = new modalplus(options);
      this.__modalplus.on('closed', this.close, this);
      return null;
    },
    initialize: function(options) {
      var appId, _ref;
      appId = this.model.get('appId');
      this.appData = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBOG, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
      if (!this.appData) {
        return false;
      }
      return this.render();
    },
    render: function() {
      this.$el.html(template.og_app_modal(this.appData));
      this.initModal(this.el);
      return this;
    },
    close: function() {
      return this.remove();
    }
  });
});

define('og_dropdown',['constant', 'CloudResources', 'combo_dropdown', 'og_manage', 'component/awscomps/OgTpl', 'i18n!/nls/lang.js', "credentialFormView"], function(constant, CloudResources, comboDropdown, OgManage, template, lang, CredentialFormView) {
  return Backbone.View.extend({
    tagName: 'section',
    events: {
      'click .icon-edit': 'editClicked',
      "click .combo-dd-no-data .create-one": "showCredential"
    },
    initDropdown: function() {
      var options;
      options = {
        manageBtnValue: 'Create New Option Group ...',
        filterPlaceHolder: 'Filter by Option Group name',
        noFilter: true,
        resourceName: lang.PROP.RESOURCE_NAME_OPTION_GROUP
      };
      this.dropdown = new comboDropdown(options);
      this.dropdown.on('open', this.show, this);
      this.dropdown.on('manage', this.manage, this);
      this.dropdown.on('change', this.set, this);
      this.dropdown.on('filter', this.filter, this);
      return this.dropdown.on('quick_create', this.quickCreate, this);
    },
    initialize: function(option) {
      this.initDropdown();
      this.listenTo(Design.instance().credential(), "update", this.credChanged);
      this.listenTo(Design.instance().credential(), "change", this.credChanged);
      return this.dbInstance = option.dbInstance;
    },
    render: function(option) {
      var that;
      that = this;
      this.el = this.dropdown.el;
      this.dropdown.setSelection('None');
      this.engine = option.engine;
      this.engineVersion = option.engineVersion;
      this.version = option.majorVersion;
      this.refresh();
      return this;
    },
    credChanged: function() {
      var _ref;
      if ((_ref = this.dropdown) != null) {
        _ref.render("loading");
      }
      return this.refresh();
    },
    refresh: function() {
      var customOGAry, defaultOG, defaultOGAry, engineCol, ogComps, regionName, that;
      that = this;
      regionName = Design.instance().region();
      engineCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBENGINE, regionName);
      ogComps = Design.modelClassForType(constant.RESTYPE.DBOG).allObjects();
      defaultOGAry = [];
      defaultOG = engineCol.getDefaultByNameVersion(regionName, this.engine, this.engineVersion);
      if (defaultOG && defaultOG.defaultOGName) {
        defaultOGAry.push({
          id: null,
          name: defaultOG.defaultOGName
        });
      }
      customOGAry = [];
      _.each(ogComps, function(compModel) {
        if (compModel.get('engineName') === that.engine && compModel.get('engineVersion') === that.version) {
          return customOGAry.push({
            id: compModel.id,
            name: compModel.get('name'),
            data: compModel.toJSON()
          });
        }
      });
      this.ogAry = defaultOGAry.concat(customOGAry);
      return this.renderDropdownList();
    },
    renderDropdownList: function() {
      var selection, that;
      that = this;
      if (this.ogAry.length) {
        selection = this.dbInstance.getOptionGroupName();
        _.each(this.ogAry, function(og) {
          var ogName, ogPreviewAry;
          ogName = og.name;
          ogPreviewAry = [];
          if (og.data) {
            _.each(og.data.options, function(option) {
              return ogPreviewAry.push(option.OptionName);
            });
            og.preview = ogPreviewAry.join(',');
          }
          if (ogName && ogName === selection) {
            og.selected = true;
            that.dropdown.setSelection(selection);
          }
          return null;
        });
        return this.dropdown.setContent(template.dropdown_list(this.ogAry)).toggleControls(true);
      } else {
        return this.dropdown.setContent(template.no_option_group({})).toggleControls(true);
      }
    },
    quickCreate: function() {
      var DBOGModel, dbOGModel;
      DBOGModel = Design.modelClassForType(constant.RESTYPE.DBOG);
      dbOGModel = new DBOGModel({
        engineName: this.engine,
        engineVersion: this.version
      });
      return new OgManage({
        dbInstance: this.dbInstance,
        engine: this.engine,
        version: this.version,
        model: dbOGModel,
        dropdown: this,
        isCreate: true
      }).render();
    },
    renderNoCredential: function() {
      return this.dropdown.render('nocredential').toggleControls(false);
    },
    show: function() {
      if (!(Design.instance().credential() && !Design.instance().credential().isDemo())) {
        this.renderNoCredential();
        return false;
      }
      $('#property-dbinstance-parameter-group-select .selectbox').removeClass('open');
      if (!this.dropdown.$('.item').length) {
        return this.renderDropdownList();
      }
    },
    manage: function() {
      return this.quickCreate();
    },
    set: function(id, data) {
      return this.dbInstance.setOptionGroup(data.name);
    },
    filter: function(keyword) {},
    editClicked: function(event) {
      var $item, ogModel, ogUID;
      $item = $(event.currentTarget).parent();
      ogUID = $item.data('id');
      if (ogUID) {
        ogModel = Design.instance().component(ogUID);
        new OgManage({
          dbInstance: this.dbInstance,
          engine: this.engine,
          version: this.version,
          model: ogModel,
          dropdown: this
        }).render();
      }
      return false;
    },
    setSelection: function() {
      return this.dropdown.setSelection.apply(this, arguments);
    },
    showCredential: function() {
      return new CredentialFormView({
        model: Design.instance().project()
      }).render();
    }
  });
});

define('component/awscomps/SGRulePppTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n\r\n      <div class=\"selectbox\" id=\"sg-create-sg-out\">\r\n        <div class=\"selection\"><span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n        <ul class=\"dropdown\">\r\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.owner), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </ul>\r\n      </div>\r\n\r\n      <div class=\"selectbox\" id=\"sg-create-direction\">\r\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INITIATE_TRAFFIC_TO", {hash:{},data:data}))
    + "</div>\r\n        <ul class=\"dropdown\">\r\n          <li class=\"item selected\" data-id=\"outbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INITIATE_TRAFFIC_TO", {hash:{},data:data}))
    + "</li>\r\n          <li class=\"item\" data-id=\"inbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ACCEPT_TRAFFIC_FROM", {hash:{},data:data}))
    + "</li>\r\n          <li class=\"item\" data-id=\"biway\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.HAVE_2WAY_TRAFFIC_WITH", {hash:{},data:data}))
    + "</li>\r\n        </ul>\r\n      </div>\r\n\r\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            <li class=\"item ";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n              <span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>\r\n              "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n            </li>\r\n          ";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "selected";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n\r\n      <div id=\"sg-create-sg-out\">\r\n        <div class=\"sg-create-selection selected\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n      </div>\r\n\r\n      <div id=\"sg-create-direction\">\r\n        <div class=\"sg-create-selection selected\" data-id=\"outbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INITIATE_TRAFFIC_TO", {hash:{},data:data}))
    + "</div>\r\n      </div>\r\n\r\n      ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n            <li class=\"item truncate ";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n              <span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>\r\n              "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n            </li>\r\n          ";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\r\n          <li class=\"item\" data-id=\"custom\">Custom</li>\r\n          <li class=\"item\" data-id=\"all\">All</li>\r\n          ";
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-custom\">\r\n            <input class=\"input\" type=\"text\" name=\"protocol-custom-ranged\" value=\"1\" min=\"1\" max=\"255\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*$\" data-required=\"true\">\r\n          </section>\r\n\r\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-all\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.PORT_RANGE_COLON", {hash:{},data:data}))
    + "0-65535</section>\r\n    ";
  return buffer;
  }

  buffer += "<article class=\"modal-body\" id=\"sg-rule-create-modal\" data-bind=\"true\">\r\n  <section class=\"sg-rule-create-add-wrap\">\r\n    <section class=\"sg-node-wrap clearfix\">\r\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ALLOW", {hash:{},data:data}))
    + "</label>\r\n\r\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.owner)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n      <div class=\"selectbox\" id=\"sg-create-sg-in\">\r\n        <div class=\"selection truncate\"><span class=\"sg-create-sg-color\" style=\"background:"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.relation)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.relation)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\r\n        <ul class=\"dropdown\">\r\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.relation), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </ul>\r\n      </div>\r\n    </section>\r\n\r\n    <p class=\"clearfix mgt10\">\r\n      <label class=\"sg-create-proto-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESTINATION_PROTOCOL", {hash:{},data:data}))
    + "</label>\r\n      <label class=\"sg-create-proto-label-port\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\r\n    </p>\r\n\r\n    <section class=\"clearfix sg-proto-option-wrap\">\r\n      <div class=\"selectbox sg-proto-option\" id=\"sg-create-proto\" data-protocal-type=\"tcp\">\r\n        <div class=\"selection\">TCP</div>\r\n        <ul class=\"dropdown\" tabindex=\"-1\">\r\n          <li class=\"selected item\" data-id=\"tcp\">TCP</li>\r\n          <li class=\"item\" data-id=\"udp\">UDP</li>\r\n          <li class=\"item\" data-id=\"icmp\">ICMP</li>\r\n          ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        </ul>\r\n      </div>\r\n\r\n      <div class=\"sg-create-proto-inputs\">\r\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-tcp\" style=\"display:block;\">\r\n            <input class=\"input\" type=\"text\" placeholder=\"Port Range.eg.80 or 49152-65535\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\r\n          </section>\r\n\r\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-udp\">\r\n            <input class=\"input\" type=\"text\" placeholder=\"Port Range.eg.80 or 49152-65535\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\r\n          </section>\r\n\r\n          <section class=\"sg-proto-input\" id=\"sg-proto-ipt-icmp\">\r\n            <div class=\"selectbox\" id=\"sg-proto-icmp-sel\">\r\n              <div class=\"selection\">Echo Reply(0)</div>\r\n              <div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\r\n                <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n                <ul tabindex=\"-1\" class=\"scroll-content\">\r\n                  <li class=\"item selected\" data-id=\"0\">Echo Reply(0)</li>\r\n                  <li class=\"item\" data-id=\"3\">Destination Unreachable(3) ...</li>\r\n                  <li class=\"item\" data-id=\"4\">Source Quench(4)</li>\r\n                  <li class=\"item\" data-id=\"5\">Redirect Message(5) ...</li>\r\n                  <li class=\"item\" data-id=\"6\">Alternate Host Address(6)</li>\r\n                  <li class=\"item\" data-id=\"8\">Echo Request(8)</li>\r\n                  <li class=\"item\" data-id=\"9\">Router Advertisement(9)</li>\r\n                  <li class=\"item\" data-id=\"10\">Router Solicitation(10)</li>\r\n                  <li class=\"item\" data-id=\"11\">Time Exceeded(11) ...</li>\r\n                  <li class=\"item\" data-id=\"12\">Parameter Problem: Bad IP header(12) ...</li>\r\n                  <li class=\"item\" data-id=\"13\">Timestamp(13)</li>\r\n                  <li class=\"item\" data-id=\"14\">Timestamp Reply(14)</li>\r\n                  <li class=\"item\" data-id=\"15\">Information Request(15)</li>\r\n                  <li class=\"item\" data-id=\"16\">Information Reply(16)</li>\r\n                  <li class=\"item\" data-id=\"17\">Address Mask Request(17)</li>\r\n                  <li class=\"item\" data-id=\"18\">Address Mask Reply(18)</li>\r\n                  <li class=\"item\" data-id=\"30\">Traceroute(30)</li>\r\n                  <li class=\"item\" data-id=\"31\">Datagram Conversion Error(31)</li>\r\n                  <li class=\"item\" data-id=\"32\">Mobile Host Redirect(32)</li>\r\n                  <li class=\"item\" data-id=\"33\">Where Are You(33)</li>\r\n                  <li class=\"item\" data-id=\"34\">Here I Am(34)</li>\r\n                  <li class=\"item\" data-id=\"35\">Mobile Registration Request(35)</li>\r\n                  <li class=\"item\" data-id=\"36\">Mobile Registration Reply(36)</li>\r\n                  <li class=\"item\" data-id=\"37\">Domain Name Request(37)</li>\r\n                  <li class=\"item\" data-id=\"38\">Domain Name Reply(38)</li>\r\n                  <li class=\"item\" data-id=\"39\">SKIP Algorithm Discovery Protocol(39)</li>\r\n                  <li class=\"item\" data-id=\"40\">Photuris Security Failures(40)</li>\r\n                  <li class=\"item\" data-id=\"-1\">All(-1)</li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-3\">\r\n              <div class=\"selection\">All(-1)</div>\r\n              <div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\r\n                <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n                <ul class=\"scroll-content\" tabindex=\"-1\">\r\n                  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\r\n                  <li class=\"item\" data-id=\"0\">destination network unreachable(0)</li>\r\n                  <li class=\"item\" data-id=\"1\">destination host unreachable(1)</li>\r\n                  <li class=\"item\" data-id=\"2\">destination protocol unreachable(2)</li>\r\n                  <li class=\"item\" data-id=\"3\">destination port unreachable(3)</li>\r\n                  <li class=\"item\" data-id=\"4\">fragmentation required and DF flag set(4)</li>\r\n                  <li class=\"item\" data-id=\"5\">source route failed(5)</li>\r\n                  <li class=\"item\" data-id=\"6\">destination network unknown(6)</li>\r\n                  <li class=\"item\" data-id=\"7\">destination host unknown(7)</li>\r\n                  <li class=\"item\" data-id=\"8\">source host isolated(8)</li>\r\n                  <li class=\"item\" data-id=\"9\">network administratively prohibited(9)</li>\r\n                  <li class=\"item\" data-id=\"10\">host administratively prohibited(10)</li>\r\n                  <li class=\"item\" data-id=\"11\">network unreachable for TOS(11)</li>\r\n                  <li class=\"item\" data-id=\"12\">host unreachable for TOS(12)</li>\r\n                  <li class=\"item\" data-id=\"13\">communication administratively prohibited(13)</li>\r\n                </ul>\r\n              </div>\r\n            </div>\r\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-5\">\r\n              <div class=\"selection\">All(-1)</div>\r\n              <ul class=\"dropdown\" tabindex=\"-1\">\r\n                <li class=\"selected item\" data-id=\"-1\">All(-1)</li>\r\n                <li class=\"item\" data-id=\"0\">redirect datagram for the network(0)</li>\r\n                <li class=\"item\" data-id=\"1\">redirect datagram for the host(1)</li>\r\n                <li class=\"item\" data-id=\"2\">redirect datagram for the TOS & network(2)</li>\r\n                <li class=\"item\" data-id=\"3\">redirect datagram for the TOS & host(3)</li>\r\n              </ul>\r\n            </div>\r\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-11\">\r\n              <div class=\"selection\">All(-1)</div>\r\n              <ul class=\"dropdown\" tabindex=\"-1\">\r\n                <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\r\n                <li class=\"item\" data-id=\"0\">TTL expired transit(0)</li>\r\n                <li class=\"item\" data-id=\"1\">fragmentation reasembly time exceeded(1)</li>\r\n              </ul>\r\n            </div>\r\n            <div class=\"selectbox sg-proto-input-sub\" id=\"sg-proto-input-sub-12\">\r\n              <div class=\"selection\">All(-1)</div>\r\n              <ul class=\"dropdown\" role=\"menu\">\r\n                <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\r\n                <li class=\"item\" data-id=\"0\">pointer indicates the error(0)</li>\r\n                <li class=\"item\" data-id=\"1\">missing a required option(1)</li>\r\n                <li class=\"item\" data-id=\"2\">bad length(2)</li>\r\n              </ul>\r\n            </div>\r\n          </section>\r\n\r\n\r\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n      </div>\r\n    </section>\r\n    <button class=\"btn btn-blue sg-rule-create-add\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ADD_RULE", {hash:{},data:data}))
    + "</button>\r\n  </section>\r\n\r\n  <section class=\"sg-rule-create-done-wrap\">\r\n    <div>\r\n      <p id=\"sg-rule-create-msg\" class=\"modal-text-major\"></p>\r\n      <p id=\"sg-rule-self-ref\" class=\"hide\"><i class=\"icon-info icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RULE_REF_ITS_OWN_SG", {hash:{},data:data}))
    + "</p>\r\n    </div>\r\n    <button class=\"btn btn-blue sg-rule-create-readd\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CREATE_ANOTHER_RULE", {hash:{},data:data}))
    + "</button>\r\n    <button class=\"btn btn-silver btn-modal-close\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_CLOSE", {hash:{},data:data}))
    + "</button>\r\n  </section>\r\n</article>\r\n\r\n\r\n\r\n<aside class=\"sg-rule-create-sidebar\">\r\n  <div class=\"sidebar-wrap\">\r\n  <header class=\"sg-create-sb-h\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.RELATED_RULE", {hash:{},data:data}))
    + "<span class=\"num-wrap\" id=\"sgRuleCreateCount\">("
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\r\n  <section class=\"scroll-wrap scrollbar-auto-hide\" style=\"max-height:358px\">\r\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n      <div class=\"scroll-content sg-create-rule-list\" id=\"sgRuleCreateSidebar\"></div>\r\n  </section>\r\n</div>\r\n</aside>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('component/awscomps/SGRulePopupView',['./SGRulePppTpl', 'i18n!/nls/lang.js', "Design", "event", "UI.modalplus"], function(template, lang, Design, ide_event, modalPlus) {
  var SGRulePopupView;
  SGRulePopupView = Backbone.View.extend({
    events: {
      'click .sg-rule-create-add': 'addRule',
      'click .sg-rule-create-readd': 'readdRule',
      'OPTION_CHANGE #sg-create-proto': 'onProtocolChange',
      'click .sg-rule-delete': 'deleteRule',
      'OPTION_CHANGE #sg-proto-icmp-sel': 'onICMPChange',
      "click .btn-modal-close": 'onModalClose'
    },
    render: function() {
      this.modal = new modalPlus({
        title: lang.PROP.CREATE_SECURITY_GROUP_RULE,
        template: template(this.model.attributes),
        compact: true,
        disableClose: true,
        disableFooter: true,
        width: 530
      });
      this.modal.find(".modal-header").css({
        background: "#232526"
      });
      this.setElement($('#sg-rule-create-modal').closest('#modal-wrap'));
      this.updateSidebar();
      return null;
    },
    addRule: function(event) {
      var action, data, in_target, info, out_target, ruleCount;
      data = this.extractRuleData(event);
      if (!data) {
        return;
      }
      ruleCount = this.model.addRule(data);
      if (ruleCount === 0) {
        return;
      }
      out_target = $("#sg-create-sg-out").find(".selected").text();
      in_target = $("#sg-create-sg-in").find(".selected").text();
      action = $("#sg-create-direction").find(".selected").text();
      $("#sg-rule-self-ref").hide();
      if (ruleCount === 1) {
        info = sprintf(lang.PROP.MSG_SG_CREATE, out_target, out_target, action, in_target);
      } else if (data.target === data.relation) {
        info = sprintf(lang.PROP.MSG_SG_CREATE_SELF, ruleCount, out_target, out_target);
        $("#sg-rule-self-ref").show();
      } else {
        info = sprintf(lang.PROP.MSG_SG_CREATE_MULTI, ruleCount, out_target, in_target, out_target, action, in_target);
      }
      $("#sg-rule-create-msg").text(info);
      this.$el.find('.modal-box').toggleClass('done', true);
      return this.updateSidebar();
    },
    readdRule: function() {
      return this.$el.find('.modal-box').toggleClass('done', false);
    },
    deleteRule: function(event) {
      var $count, $li, $parent, c, data;
      $li = $(event.currentTarget).closest("li");
      data = {
        ruleSetId: $li.attr("data-uid"),
        protocol: $li.attr("data-protocol"),
        relation: $li.attr("data-relation"),
        port: $li.attr("data-port"),
        direction: $li.attr("data-direction")
      };
      $parent = $li.parent();
      $li.remove();
      if ($parent.children().length === 0) {
        $parent.prev().remove();
        $parent.remove();
      }
      this.model.delRule(data);
      $count = $("#sgRuleCreateCount");
      c = parseInt($("#sgRuleCreateCount").text().replace("(", ""), 10) - 1;
      if (c < 0) {
        c = 0;
      }
      $count.text("(" + c + ")");
      return false;
    },
    onDirChange: function() {
      return $(".sg-rule-direction").html($("#sg-rule-create-dir-i").is(":checked") ? lang.IDE.POP_SGRULE_LBL_SOURCE : lang.IDE.POP_SGRULE_LBL_DEST);
    },
    onProtocolChange: function(event, id) {
      $(".sg-proto-input").hide();
      $("#sg-proto-ipt-" + id).show();
      if (id === 'custom') {
        return $('#sg-rule-create-modal .sg-create-proto-label-port').text('Protocol');
      } else {
        return $('#sg-rule-create-modal .sg-create-proto-label-port').text('Port');
      }
    },
    onICMPChange: function(event, id) {
      $(".sg-proto-input-sub").hide();
      return $("#sg-proto-input-sub-" + id).show();
    },
    updateSidebar: function() {
      var $modal, $sidebar, group, isShown, ruleCount, _i, _len, _ref;
      ruleCount = 0;
      _ref = this.model.attributes.groups || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        group = _ref[_i];
        ruleCount += group.rules.length;
        group.rules.deletable = true;
        group.content = MC.template.sgRuleList(group.rules);
      }
      $sidebar = $("#sgRuleCreateSidebar").html(MC.template.groupedSgRuleList(this.model.attributes));
      $("#sgRuleCreateCount").text("(" + ruleCount + ")");
      $modal = this.$el.find('.modal-box');
      $sidebar = $sidebar.closest(".sg-rule-create-sidebar");
      isShown = $sidebar.hasClass("shown");
      if (ruleCount === 0) {
        if (isShown) {
          return _.delay(function() {
            $sidebar.removeClass("shown").animate({
              left: "0"
            });
            return $modal.animate({
              left: '-=100px'
            }, 300);
          }, 300);
        }
      } else {
        if (!isShown) {
          return _.delay(function() {
            $sidebar.addClass("shown").animate({
              left: "-200px"
            });
            return $modal.animate({
              left: '+=100px'
            }, 300);
          }, 300);
        }
      }
    },
    onModalClose: function() {
      var comp, lineId;
      this.modal.close();
      lineId = this.model.get("lineId");
      comp = Design.instance().component(lineId);
      if (comp) {
        ide_event.trigger(ide_event.OPEN_PROPERTY, comp.type, lineId);
      }
      return false;
    },
    extractRuleData: function(event) {
      var $protoIpt, $protoIptWrap, custom_protocal_dom, needValidate, portValue, ports, protocol_type, rule, tcp_port_dom, udp_port_dom, validateMap;
      tcp_port_dom = $('#sg-proto-ipt-tcp input');
      udp_port_dom = $('#sg-proto-ipt-udp input');
      custom_protocal_dom = $('#sg-proto-ipt-custom input');
      protocol_type = $("#sg-create-proto").find(".selected").attr("data-id");
      validateMap = {
        'custom': {
          dom: custom_protocal_dom,
          method: function(val) {
            if (!MC.validate.portRange(val)) {
              return lang.PARSLEY.MUST_BE_A_VALID_FORMAT_OF_NUMBER;
            }
            if (Number(val) < 0 || Number(val) > 255) {
              return lang.PARSLEY.THE_PROTOCOL_NUMBER_RANGE_MUST_BE_0_255;
            }
            return null;
          }
        },
        'tcp': {
          dom: tcp_port_dom,
          method: function(val) {
            var portAry;
            portAry = MC.validate.portRange(val);
            if (!portAry) {
              return lang.PARSLEY.MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
            }
            if (!MC.validate.portValidRange(portAry)) {
              return lang.PARSLEY.PORT_RANGE_BETWEEN_0_65535;
            }
            return null;
          }
        },
        'udp': {
          dom: udp_port_dom,
          method: function(val) {
            var portAry;
            portAry = MC.validate.portRange(val);
            if (!portAry) {
              return lang.PARSLEY.MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
            }
            if (!MC.validate.portValidRange(portAry)) {
              return lang.PARSLEY.PORT_RANGE_BETWEEN_0_65535;
            }
            return null;
          }
        }
      };
      if (protocol_type in validateMap) {
        needValidate = validateMap[protocol_type];
        needValidate.dom.parsley('custom', needValidate.method);
      }
      if (needValidate && !needValidate.dom.parsley('validate')) {
        return;
      }
      rule = {
        protocol: protocol_type,
        direction: $("#sg-create-direction").find(".selected").attr("data-id"),
        fromPort: "",
        toPort: "",
        target: $("#sg-create-sg-out").find(".selected").attr("data-id"),
        relation: $("#sg-create-sg-in").find(".selected").attr("data-id")
      };
      $protoIptWrap = $("#sg-proto-ipt-" + rule.protocol);
      $protoIpt = $protoIptWrap.find("input");
      portValue = $protoIpt.val();
      switch (protocol_type) {
        case "tcp":
        case "udp":
          ports = portValue.split("-");
          rule.fromPort = ports[0].trim();
          if (ports.length >= 2) {
            rule.toPort = ports[1].trim();
          }
          break;
        case "icmp":
          portValue = $("#sg-proto-icmp-sel").find(".selected").attr("data-id");
          rule.fromPort = portValue;
          if (portValue === "3" || portValue === "5" || portValue === "11" || portValue === "12") {
            rule.toPort = $("#sg-proto-input-sub-" + portValue).find(".selected").attr("data-id");
          } else {
            rule.toPort = "-1";
          }
          break;
        case "custom":
          rule.protocol = portValue;
      }
      return rule;
    }
  });
  return SGRulePopupView;
});

define('SGRulePopup',['constant', "Design", 'component/awscomps/SGRulePopupView', "backbone"], function(constant, Design, View) {
  var SGRulePopup, SGRulePopupModel;
  SGRulePopupModel = Backbone.Model.extend({
    initialize: function() {
      var design, map, port1, port2;
      design = Design.instance();
      port1 = this.get("port1");
      port2 = this.get("port2");
      map = function(sg) {
        return {
          uid: sg.id,
          color: sg.color,
          name: sg.get("name")
        };
      };
      this.set("relation", _.map(port2.connectionTargets("SgAsso"), map));
      if (_.isString(port1)) {
        this.set("owner", {
          name: port1,
          uid: this.get("port1").id
        });
      } else {
        this.set("owner", _.map(port1.connectionTargets("SgAsso"), map));
      }
      this.updateGroupList();
      return null;
    },
    updateGroupList: function() {
      var SgRuleSetModel, allRuleSets, cnn, design;
      design = Design.instance();
      cnn = design.component(this.get("uid"));
      SgRuleSetModel = Design.modelClassForType("SgRuleSet");
      allRuleSets = SgRuleSetModel.getRelatedSgRuleSets(this.get("port1"), this.get("port2"));
      this.set("groups", SgRuleSetModel.getGroupedObjFromRuleSets(allRuleSets));
      return null;
    },
    addRule: function(data) {
      var SgRuleSetModel, count, relationComp, sgRuleSet, targetComp;
      targetComp = Design.instance().component(data.target);
      relationComp = Design.instance().component(data.relation);
      SgRuleSetModel = Design.modelClassForType("SgRuleSet");
      sgRuleSet = new SgRuleSetModel(targetComp, relationComp);
      count = 2;
      sgRuleSet.addRule(data.target, data.direction, data);
      if (data.direction === "biway") {
        count *= 2;
      }
      this.updateGroupList();
      return count;
    },
    delRule: function(data) {
      var sgRuleSet;
      sgRuleSet = Design.instance().component(data.ruleSetId);
      sgRuleSet.removeRuleByPlainObj(data);
      return null;
    }
  });
  SGRulePopup = function(line_id, port2Comp) {
    var cnn, model, port1Comp;
    if (port2Comp) {
      port1Comp = line_id;
      line_id = "";
    } else {
      cnn = Design.instance().component(line_id);
      port1Comp = cnn.port1Comp();
      port2Comp = cnn.port2Comp();
    }
    model = new SGRulePopupModel({
      port1: port1Comp,
      port2: port2Comp,
      lineId: line_id
    });
    return (new View({
      model: model
    })).render();
  };
  return SGRulePopup;
});

define('component/awscomps/DbSubnetGPopupTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<header class=\"mega-list-wraper-header\">"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</header>\r\n		";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		<section class=\"mega-list-wraper-body\">\r\n		  <div class=\"checkbox dbsgppp-check\">\r\n		   <input id=\"dbsgppp-"
    + escapeExpression(((stack1 = (depth0 && depth0.idx)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"dbsgppp-subnet\" type=\"checkbox\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n		   <label for=\"dbsgppp-"
    + escapeExpression(((stack1 = (depth0 && depth0.idx)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\r\n		  </div>\r\n		  <div class=\"dbsgppp-sbname\" for=\"dbsgppp-"
    + escapeExpression(((stack1 = (depth0 && depth0.idx)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n		  	<div class=\"dbsgppp-cidr\">("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\r\n		  </div>\r\n\r\n		</section>\r\n		";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.POP_SELECT_SUBNET_FOR_SUBNET_GROUP_CONTENT", (depth0 && depth0.minAZCount), {hash:{},data:data}))
    + "</p>\r\n\r\n<div class=\"scroll-wrap\" style=\"max-height:256px;\">\r\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n	<div class=\"scroll-content\">\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('DbSubnetGPopup',['component/awscomps/DbSubnetGPopupTpl', 'i18n!/nls/lang.js', "UI.modalplus", "constant", "Design"], function(template, lang, Modal, constant, Design) {
  return Backbone.View.extend({
    events: {
      "click .dbsgppp-subnet": "updateSelected"
    },
    initialize: function() {
      var assos, minAZCount, modal, self, subnets, _ref;
      self = this;
      assos = this.model.connectionTargets("SubnetgAsso");
      subnets = _.map(this.model.design().componentsOfType(constant.RESTYPE.SUBNET), function(subnet, key) {
        return {
          az: subnet.parent().get("name"),
          id: subnet.id,
          name: subnet.get("name"),
          cidr: subnet.get("cidr"),
          idx: key,
          checked: assos.indexOf(subnet) >= 0
        };
      });
      if ((_ref = Design.instance().region()) === 'cn-north-1') {
        minAZCount = 1;
      } else {
        minAZCount = 2;
      }
      modal = new Modal({
        title: lang.IDE.POP_SELECT_SUBNET_FOR_SUBNET_GROUP_TITLE,
        template: template({
          minAZCount: minAZCount,
          group: _.groupBy(subnets, "az")
        }),
        confirm: {
          text: lang.IDE.POP_LBL_DONE
        },
        disableClose: true,
        onCancel: function() {
          return self.cancel();
        },
        onClose: function() {
          return self.cancel();
        },
        onConfirm: function() {
          self.apply();
          return modal.close();
        }
      });
      this.setElement(modal.tpl);
      this.updateSelected();
    },
    updateSelected: function() {
      var azs, btn, minAZCount, _ref;
      btn = this.$el.closest(".modal-box").find(".modal-confirm");
      azs = {};
      _.each(this.$el.find(".dbsgppp-subnet:checked"), function(el) {
        var id;
        id = $(el).attr("data-id");
        return azs[Design.instance().component(id).parent().get("name")] = true;
      });
      if ((_ref = Design.instance().region()) === 'cn-north-1') {
        minAZCount = 1;
      } else {
        minAZCount = 2;
      }
      if (_.keys(azs).length >= minAZCount) {
        btn.removeAttr("disabled");
      } else {
        btn.attr("disabled", "disabled");
      }
    },
    cancel: function() {
      if (this.model.connectionTargets("SubnetgAsso").length === 0) {
        this.model.remove();
      }
    },
    apply: function() {
      var SubnetgAsso, cb, design, existSb, id, sb, sbAsso, subnets, value, _i, _j, _len, _len1, _ref, _ref1;
      subnets = {};
      _ref = this.$el.find(".dbsgppp-subnet:checked");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cb = _ref[_i];
        subnets[$(cb).attr("data-id")] = true;
      }
      existSb = {};
      _ref1 = this.model.connections("SubnetgAsso");
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        sbAsso = _ref1[_j];
        id = sbAsso.getTarget(constant.RESTYPE.SUBNET).id;
        if (!subnets[id]) {
          sbAsso.remove();
        } else {
          existSb[id] = true;
        }
      }
      SubnetgAsso = Design.modelClassForType("SubnetgAsso");
      design = this.model.design();
      for (sb in subnets) {
        value = subnets[sb];
        if (!existSb[sb]) {
          new SubnetgAsso(this.model, design.component(sb));
        }
      }
      this.trigger('update');
    }
  });
});


define("component/AwsComps", function(){});
