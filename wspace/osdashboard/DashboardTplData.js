define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n<dl class=\"dl-horizontal\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleResourceInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                  <td>\n                    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                  </td>\n                  <td class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td><img src=\"/assets/images/ide/ami-os/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_os_distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\">\n            <span class=\"bubble\" data-bubble-template=\"osDashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;OSSERVER&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_image_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n                  <td>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.launched_at), {hash:{},data:data}))
    + "</td>\n              </tr>\n          ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + "Server"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n          ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">Name</th>\n        <th class=\"sortable\" style=\"width:10%\">Status</th>\n        <th class=\"sortable\" style=\"width:32%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AMI", {hash:{},data:data}))
    + "</th>\n        <!--<th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_PUBLIC_IP", {hash:{},data:data}))
    + "</th>-->\n        <th class=\"sortable\" style=\"width:25%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAUNCH_TIME", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 32%\"></th>\n                <th style=\"width: 25%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.servers), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.resource_OSSERVER=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                  <td>\n                    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                  </td>\n                  <td class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n                  <td>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.attachments), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                  <td>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</td>\n              </tr>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.device)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + "Volume"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n          ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">Name</th>\n        <th class=\"sortable\" style=\"width:20%\">Status</th>\n        <th class=\"sortable\" style=\"width:10%\">Volume Size</th>\n        <th class=\"sortable\" style=\"width:12%\">Device Name</th>\n        <th class=\"sortable\" style=\"width:30%\" data-row-type=\"datetime\">Created Time</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 20%\"></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 12%\"></th>\n                <th style=\"width: 30%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.resource_OSVOL=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                  <td>\n                    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                  </td>\n                  <td class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n                  <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.volumeName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                  <td>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</td>\n              </tr>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.volumeName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program4(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.volume_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + "Snapshot"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n          ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">Name</th>\n        <th class=\"sortable\" style=\"width:10%\">Status</th>\n        <th class=\"sortable\" style=\"width:12%\">Snapshot Size</th>\n        <th class=\"sortable\" style=\"width:27%\">Source Volume</th>\n        <th class=\"sortable\" style=\"width:28%\" data-row-type=\"datetime\">Created Time</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 29%\"></th>\n                <th style=\"width: 28%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.snaps), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.resource_OSSNAP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.floating_ip_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.serverName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.portName), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n              </tr>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "("
    + escapeExpression(((stack1 = (depth0 && depth0.portName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + "FIP"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n          ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">IP Address</th>\n        <th class=\"sortable\" style=\"width:60%\">Associated Server</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 60%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.fips), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.resource_OSFIP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.externalNetworkName), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n              </tr>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.externalNetworkName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program4(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.external_gateway_info)),stack1 == null || stack1 === false ? stack1 : stack1.network_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + "Router"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n          ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">Name</th>\n        <th class=\"sortable\" style=\"width:20%\">Status</th>\n        <th class=\"sortable\" style=\"width:30%\">External Network</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 20%\"></th>\n                <th style=\"width: 30%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.rts), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.resource_OSRT=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <tr>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.poolName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td class=\"os-status os-status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              </tr>\n          ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + "Load Balancer"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n          ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">Pool Name</th>\n        <th class=\"sortable\" style=\"width:20%\">Status</th>\n        <th class=\"sortable\" style=\"width:30%\">Listener Name</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 20%\"></th>\n                <th style=\"width: 30%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.elbs), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.resource_OSLISTENER=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });