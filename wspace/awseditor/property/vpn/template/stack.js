define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_SUMMARY", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_LBL_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnConnectionId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_LBL_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_LBL_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_LBL_ROUTING", {hash:{},data:data}))
    + "</dt>\n      <dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.staticRoutesOnly), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n\n      <a class='btn btn-primary vpn-download' href=\"data:text/plain;base64,";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.vpncfg)),stack1 == null || stack1 === false ? stack1 : stack1.filecontent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" download=\"";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.vpncfg)),stack1 == null || stack1 === false ? stack1 : stack1.filename)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ".txt\" style=\"padding:8px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_TIT_DOWNLOAD_CONF", {hash:{},data:data}))
    + "</a>\n\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vgwTelemetry), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_STACK_STATIC", {hash:{},data:data}));
  }

function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_STACK_DYNAMIC", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_LBL_TUNNEL", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th style=\"width:20px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_COL_TUNNEL", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:100px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_COL_IP", {hash:{},data:data}))
    + "</th>\n            </tr>\n            </thead>\n            <tbody>\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vgwTelemetry), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n  ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n                <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\"\n                       data-tooltip=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.status), "DOWN", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " since "
    + escapeExpression(((stack1 = (depth0 && depth0.lastStatusChange)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.statusMessage), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                </td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.outsideIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            </tr>\n            ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "DOWN";
  }

function program10(depth0,data) {
  
  
  return "UP";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "because "
    + escapeExpression(((stack1 = (depth0 && depth0.statusMessage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.routes)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_LBL_STATUS_RT", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th style=\"width:100px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_COL_IP_PREFIX", {hash:{},data:data}))
    + "</th>\n                <th style=\"width:100px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_COL_SOURCE", {hash:{},data:data}))
    + "</th>\n            </tr>\n            </thead>\n            <tbody>\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.routes)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n  ";
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n                <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.destinationCidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                </td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n            </tr>\n            ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dynamic), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_GATEWAY_VPN_DYNAMIC", {hash:{},data:data}))
    + "</section>\n  ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.dynamic), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vpnConnectionId), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <section class=\"property-control-group\">\n    <div class=\"clearfix\">\n      <label class=\"left\" for=\"property-vpc-ips\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_LBL_IP_PREFIX", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n    </div>\n    <div id=\"property-vpn-ips\" class=\"multi-input\" data-max-row=\"100\" data-bind=\"true\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ips), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </section>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vpnConnectionId), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.CGW_APP_VPN_LBL_STATUS_RT", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n  ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"multi-ipt-row\">\n        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n        <span class=\"ipt-wrapper\"><input data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\"></span>\n      </div>\n      ";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"multi-ipt-row\">\n        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n        <span class=\"ipt-wrapper\"><input data-ignore=\"true\" data-empty-remove=\"true\" data-ignore-regexp=\"^[0-9./]*$\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" type=\"text\"></span>\n      </div>\n      ";
  return buffer;
  }

function program29(depth0,data) {
  
  
  return " </div> ";
  }

  buffer += "<article>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vpnConnectionId), {hash:{},inverse:self.program(18, program18, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });