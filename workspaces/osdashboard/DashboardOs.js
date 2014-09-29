define('workspaces/osdashboard/DashboardTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div>\n\n<header class=\"dash-header\">\n  <button class=\"icon-refresh\" id=\"OsReloadResource\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_JUST_NOW", {hash:{},data:data}))
    + "</button>\n  <button class=\"btn btn-primary icon-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "</button>\n</header>\n\n<div class=\"dash-body nano\"> <div class=\"nano-content\">\n\n  <section class=\"dash-ops-list-wrapper\">\n    <nav>\n      <button class=\"on stack ops-list-switcher\"><span class=\"count\"></span> <small>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}))
    + "</small></button>\n      <button class=\"ops-list-switcher\"><span class=\"count\">0</span> <small>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}))
    + "</small></button>\n    </nav>\n    <ul class=\"clearfix dash-ops-list\"></ul>\n  </section>\n  <section class=\"dash-ops-resource-list\"></section>\n\n</div></div>\n\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progressing), {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"thumbnail app-thumbnail\"></div>\n  <div class=\"region-resource-progess";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.progress), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\n  <div class=\"region-resource-info truncate\">\n      <div class=\"loading-spinner loading-spinner-small\"></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.stateDesc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "...\n  </div>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return " hide";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"thumbnail app-thumbnail\"><img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></div>\n  <div class=\"region-resource-info\">\n    <i class=\"icon-terminate terminate-app\"></i>\n    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <span class=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </div>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program10(depth0,data) {
  
  
  return "<i class=\"icon-stop stop-app\"></i>";
  }

function program12(depth0,data) {
  
  
  return "<i class=\"icon-play start-app\"></i>";
  }

function program14(depth0,data) {
  
  
  return "running";
  }

function program16(depth0,data) {
  
  
  return "stopped";
  }

function program18(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"blank-widget\"><div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "</div></div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(18, program18, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.appList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"thumbnail\"><img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></div>\n    <div class=\"region-resource-info\">\n      <i class=\"icon-delete delete-stack\"></i>\n      <i class=\"icon-duplicate duplicate-stack\"></i>\n      <span class=\"truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n  </li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"blank-widget\"><div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_STACK", {hash:{},data:data}))
    + "</div></div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.stackList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"clearfix resource-list-nav\">\n  <div class=\"resource-tab servers on\" data-type=\"OSSERVER\">\n    <span class=\"resource-count\">Server</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab volumes\" data-type=\"OSVOL\">\n    <span class=\"resource-count\">Volume</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n\n  </div>\n  <div class=\"resource-tab snaps\" data-type=\"OSSNAP\">\n    <span class=\"resource-count\">Snapshot</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab fips\" data-type=\"OSFIP\">\n    <span class=\"resource-count\">Floating IP</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab rts\" data-type=\"OSRT\">\n    <span class=\"resource-count\">Router</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n\n  </div>\n  <div class=\"resource-tab elbs\" data-type=\"OSLISTENER\">\n    <span class=\"resource-count\">Load Balancer</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n\n  </div>\n</nav>\n<div class=\"resource-list-body table-head-fix\"></div>";
  };
TEMPLATE.resourceList=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('workspaces/osdashboard/DashboardTplData',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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
    + "</td>\n                  <td><img src=\"/assets/images/ide/ami/openstack/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_os_distro)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\">\n            <span class=\"bubble\" data-bubble-template=\"osDashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;OSSERVER&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.system_metadata)),stack1 == null || stack1 === false ? stack1 : stack1.image_image_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n                  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.accessIPv4)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                  <td>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0['OS-SRV-USG:launched_at']), {hash:{},data:data}))
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
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAUNCH_TIME", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 32%\"></th>\n                <th style=\"width: 12%\"></th>\n                <th style=\"width: 18%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
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

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">Name</th>\n        <th class=\"sortable\" style=\"width:10%\">Status</th>\n        <th class=\"sortable\" style=\"width:10%\">Snapshot Size</th>\n        <th class=\"sortable\" style=\"width:29%\">Source Volume</th>\n        <th class=\"sortable\" style=\"width:28%\" data-row-type=\"datetime\">Created Time</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\">\n  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 10%\"></th>\n                <th style=\"width: 29%\"></th>\n                <th style=\"width: 28%\"></th>\n            </tr>\n        </thead>\n      <tbody>\n          ";
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
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/osdashboard/DashboardView',['./DashboardTpl', './DashboardTplData', "constant", "i18n!/nls/lang.js", "CloudResources", 'AppAction', "backbone", "UI.tooltip", "UI.table", "UI.bubble", "UI.scrollbar", "UI.nanoscroller"], function(Template, TemplateData, constant, lang, CloudResources, appAction) {
    return Backbone.View.extend({
      events: {
        'click #OsReloadResource': 'reloadResource',
        'click .icon-new-stack': 'createStack',
        'click .ops-list-switcher': 'switchAppStack',
        "click .dash-ops-list > li": "openItem",
        "click .dash-ops-list .delete-stack": "deleteStack",
        'click .dash-ops-list .duplicate-stack': 'duplicateStack',
        "click .dash-ops-list .start-app": "startApp",
        'click .dash-ops-list .stop-app': 'stopApp',
        'click .dash-ops-list .terminate-app': 'terminateApp',
        'click .resource-tab': 'switchResource'
      },
      resourcesTab: 'OSSERVER',
      initialize: function() {
        var self;
        this.opsListTab = "stack";
        this.region = "guangzhou";
        this.lastUpdate = +(new Date());
        this.setElement($(Template.frame()).eq(0).appendTo("#main"));
        this.updateOpsList();
        this.updateResList();
        this.updateRegionResources();
        self = this;
        setInterval(function() {
          if (!$("#OsReloadResource").hasClass("reloading")) {
            $("#OsReloadResource").text(MC.intervalDate(self.lastUpdate / 1000));
          }
        }, 1000 * 60);
        MC.template.osDashboardBubble = _.bind(this.osDashboardBubble, this);
      },
      awake: function() {
        this.$el.show().children(".nano").nanoScroller();
      },
      sleep: function() {
        return this.$el.hide();
      },
      osDashboardBubble: function(data) {
        var d, _ref;
        d = {
          id: data.id,
          data: (_ref = this.model.getOsResDataById(this.region, constant.RESTYPE[data.type], data.id)) != null ? _ref.toJSON() : void 0
        };
        d.data = d.data.system_metadata;
        _.each(d.data, function(e, key) {
          if (_.isBoolean(e)) {
            d.data[key] = e.toString();
          }
          if (e === "") {
            d.data[key] = "None";
          }
          if ((_.isArray(e)) && e.length === 0) {
            d.data[key] = ['None'];
          }
          if ((_.isObject(e)) && (!_.isArray(e))) {
            return delete d.data[key];
          }
        });
        return TemplateData.bubbleResourceInfo(d);
      },

      /*
        rendering
       */
      updateOpsList: function() {
        var $opsListView, $switcher, apps, filter, html, mapper, stacks, tojson;
        $opsListView = this.$el.find(".dash-ops-list-wrapper");
        tojson = {
          thumbnail: true
        };
        filter = function(m) {
          return m.isExisting();
        };
        mapper = function(m) {
          return m.toJSON(tojson);
        };
        stacks = App.model.stackList().filter(filter);
        apps = App.model.appList().filter(filter);
        $switcher = $opsListView.children("nav");
        $switcher.find(".count").text(apps.length);
        $switcher.find(".stack").find(".count").text(stacks.length);
        if (this.opsListTab === "stack") {
          html = Template.stackList(stacks.map(mapper));
        } else {
          html = Template.appList(apps.map(mapper));
        }
        $opsListView.children("ul").html(html);
      },
      updateResList: function() {
        return this.$('.dash-ops-resource-list').html(Template.resourceList({}));
      },
      updateAppProgress: function(model) {
        var $li;
        if (model.get("region") === this.region && this.regionOpsTab === "app") {
          console.log("Dashboard Updated due to app progress changes.");
          $li = $el.find(".dash-ops-list").children("[data-id='" + model.id + "']");
          if (!$li.length) {
            return;
          }
          $li.children(".region-resource-progess").show().css({
            width: model.get("progress") + "%"
          });
        }
      },

      /*
        View logics
       */
      switchAppStack: function(evt) {
        var $target;
        $target = $(evt.currentTarget);
        if ($target.hasClass("on")) {
          return;
        }
        $target.addClass("on").siblings().removeClass("on");
        this.opsListTab = $target.hasClass("stack") ? "stack" : "app";
        this.updateOpsList();
      },
      switchResource: function(evt) {
        this.$(".resource-list-nav").children().removeClass("on");
        this.resourcesTab = $(evt.currentTarget).addClass("on").attr("data-type");
        this.updateRegionResources();
      },
      updateResourceCount: function() {
        var $nav, child, count, r, resourceCount;
        resourceCount = this.model.getResourcesCount(this.region);
        $nav = $(".resource-list-nav");
        for (r in resourceCount) {
          count = resourceCount[r];
          child = $nav.children("." + r);
          this.animateResourceCount(child);
        }
      },
      animateResourceCount: function(element) {
        if (element.find("svg").size() > 0) {
          return false;
        }
        element.prepend("<svg class=\"rotate\" viewbox=\"0 0 250 250\">\n  <path class=\"loader usage-quota\" fill=\"#0099ff\" transform=\"translate(125, 125)\"/>\n  <path class=\"loader usage-active\" fill=\"#0099ff\" transform=\"translate(125, 125)\"/>\n  <circle class=\"cover\" cx=\"50%\" cy=\"50%\" r=\"112\" fill=\"#fcfcfc\"></circle>\n  <circle class=\"blue-dot\" cx=\"6.5\" cy=\"50%\" r=\"6.5\" fill=\"#e6e6e6\"></circle>\n  <circle class=\"gray-dot\" cx=\"50%\" cy=\"6.5\" r=\"6.5\" fill=\"#4c92e5\"></circle>\n  <circle class=\"active-dot\" cx=\"50%\" cy=\"6.5\" r=\"6.5\" fill=\"#4c92e5\"></circle>\n</svg>");
        return this.animateUsage(element, Math.round(Math.random() * 100), 100);
      },
      animateUsage: function(elem, active, quota) {
        var PI, activeCircle, activeDot, animate, circleRadius, circleRadiusForDot, maxAngle, quotaAngle, quotaCircle, quotaCount, seconds, t, usageCount;
        seconds = 2;
        circleRadius = 125;
        circleRadiusForDot = circleRadius - 6.5;
        PI = Math.PI;
        quotaCircle = elem.find('.usage-quota');
        activeCircle = elem.find('.usage-active');
        usageCount = elem.find('.count-usage');
        quotaCount = elem.find('.count-quota');
        activeDot = elem.find('.active-dot');
        quotaAngle = 270;
        maxAngle = quotaAngle / quota * active;
        t = seconds * 1000 / 360 * quota / active;
        if (activeCircle.timeout) {
          window.clearTimeout(activeCircle.timeout);
          activeCircle.timeout = void 0;
        }
        animate = function(element, currentAngle, noAnimate) {
          var dotX, dotY, mid, radius, svgAttr, usage, x, y;
          radius = currentAngle * PI / 180;
          x = Math.sin(radius) * circleRadius;
          y = Math.cos(radius) * -circleRadius;
          mid = currentAngle > 180 ? 1 : 0;
          usage = currentAngle / maxAngle * active;
          dotX = Math.sin(radius) * circleRadiusForDot + 125;
          dotY = Math.cos(radius) * -circleRadiusForDot + 125;
          svgAttr = "M 0 0 v -125 A 125 125 1 " + mid + " 1 " + x + " " + y + " z";
          element.attr('d', svgAttr);
          activeDot.attr('cx', dotX).attr('cy', dotY);
          if (!noAnimate) {
            usage = usage > quota ? quota : usage;
            usageCount.text(Math.round(usage));
            currentAngle += 1;
            if (currentAngle <= maxAngle) {
              return activeCircle.timeout = window.setTimeout(function() {
                return animate(element, currentAngle);
              }, t);
            }
          }
        };
        quotaCircle.attr('fill', "#e6e6e6");
        activeCircle.attr('fill', "#4c92e5");
        quotaCount.text("/" + quota);
        animate(quotaCircle, 270, true);
        return animate(activeCircle, 0);
      },
      updateRegionResources: function(type) {
        var tpl, _ref;
        this.updateResourceCount();
        if (type && (_ref = this.resourcesTab, __indexOf.call(type, _ref) < 0)) {
          return;
        }
        type = constant.RESTYPE[this.resourcesTab];
        if (!this.model.isOsResReady(this.region, type)) {
          tpl = '<div class="dashboard-loading"><div class="loading-spinner"></div></div>';
        } else {
          tpl = TemplateData["resource_" + this.resourcesTab](this.model.getOsResData(this.region, type));
        }
        return $(".resource-list-body").html(tpl);
      },
      openItem: function(event) {
        return App.openOps($(event.currentTarget).attr("data-id"));
      },
      createStack: function(event) {
        return App.createOps("guangzhou", "openstack", "awcloud");
      },
      markUpdated: function() {
        this.lastUpdate = +(new Date());
      },
      reloadResource: function() {
        if ($("#OsReloadResource").hasClass("reloading")) {
          return;
        }
        $("#OsReloadResource").addClass("reloading").text("");
        App.discardAwsCache().done(function() {
          return $("#OsReloadResource").removeClass("reloading").text("just now");
        });
      },
      deleteStack: function(event) {
        appAction.deleteStack($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      duplicateStack: function(event) {
        appAction.duplicateStack($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      startApp: function(event) {
        appAction.startApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      stopApp: function(event) {
        appAction.stopApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      terminateApp: function(event) {
        appAction.terminateApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/osdashboard/DashboardModel',["ApiRequest", "CloudResources", "constant", "backbone"], function(ApiRequest, CloudResources, constant) {

    /*
      Dashboard Model
     */
    return Backbone.Model.extend({
      initialize: function() {
        var region;
        region = 'guangzhou';
        this.listenTo(CloudResources(constant.RESTYPE.OSSERVER, region), "update", this.onRegionResChanged(['OSSERVER', 'FIP']));
        this.listenTo(CloudResources(constant.RESTYPE.OSPORT, region), "update", this.onRegionResChanged(['FIP']));
        this.listenTo(CloudResources(constant.RESTYPE.OSVOL, region), "update", this.onRegionResChanged(['OSVOL', 'OSSNAP']));
        this.listenTo(CloudResources(constant.RESTYPE.OSSNAP, region), "update", this.onRegionResChanged(['OSSNAP']));
        this.listenTo(CloudResources(constant.RESTYPE.OSFIP, region), "update", this.onRegionResChanged(['OSFIP']));
        this.listenTo(CloudResources(constant.RESTYPE.OSRT, region), "update", this.onRegionResChanged(['OSRT']));
        this.listenTo(CloudResources(constant.RESTYPE.OSPOOL, region), "update", this.onRegionResChanged(['OSPOOL', 'OSLISTENER']));
        this.listenTo(CloudResources(constant.RESTYPE.OSLISTENER, region), "update", this.onRegionResChanged(['OSLISTENER']));
        return this.listenTo(CloudResources(constant.RESTYPE.OSNETWORK, region), "update", this.onRegionResChanged(['OSRT']));
      },
      onRegionResChanged: function(type) {
        return function() {
          return this.trigger("change:regionResources", type);
        };
      },

      /* Cloud Resources */
      fetchOsResources: function(region) {
        if (region == null) {
          region = 'guangzhou';
        }
        CloudResources(constant.RESTYPE.OSSERVER, region).fetch();
        CloudResources(constant.RESTYPE.OSPORT, region).fetch();
        CloudResources(constant.RESTYPE.OSVOL, region).fetch();
        CloudResources(constant.RESTYPE.OSSNAP, region).fetch();
        CloudResources(constant.RESTYPE.OSFIP, region).fetch();
        CloudResources(constant.RESTYPE.OSRT, region).fetch();
        CloudResources(constant.RESTYPE.OSPOOL, region).fetch();
        CloudResources(constant.RESTYPE.OSLISTENER, region).fetch();
        CloudResources(constant.RESTYPE.OSNETWORK, region).fetch();
      },
      isOsResReady: function(region, type) {
        switch (type) {
          case constant.RESTYPE.OSLISTENER:
            return CloudResources(type, region).isReady() && CloudResources(constant.RESTYPE.OSPOOL, region).isReady();
          case constant.RESTYPE.OSPOOL:
            return CloudResources(type, region).isReady() && CloudResources(constant.RESTYPE.OSLISTENER, region).isReady();
          default:
            return CloudResources(type, region).isReady();
        }
      },
      getOsResData: function(region, type) {
        var data, extNetworks, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        data = {
          servers: (_ref = CloudResources(constant.RESTYPE.OSSERVER, region)) != null ? _ref.toJSON() : void 0,
          volumes: (_ref1 = CloudResources(constant.RESTYPE.OSVOL, region)) != null ? _ref1.toJSON() : void 0,
          snaps: (_ref2 = CloudResources(constant.RESTYPE.OSSNAP, region)) != null ? _ref2.toJSON() : void 0,
          fips: (_ref3 = CloudResources(constant.RESTYPE.OSFIP, region)) != null ? _ref3.toJSON() : void 0,
          rts: (_ref4 = CloudResources(constant.RESTYPE.OSRT, region)) != null ? _ref4.toJSON() : void 0,
          elbs: (_ref5 = CloudResources(constant.RESTYPE.OSLISTENER, region)) != null ? _ref5.toJSON() : void 0
        };
        _.each(data.fips, function(fip) {
          var port, portId, server, _ref6, _ref7, _ref8, _ref9;
          portId = fip.port_id;
          port = (_ref6 = CloudResources(constant.RESTYPE.OSPORT, region)) != null ? (_ref7 = _ref6.get(portId)) != null ? _ref7.toJSON() : void 0 : void 0;
          if (port) {
            server = (_ref8 = CloudResources(constant.RESTYPE.OSSERVER, region)) != null ? (_ref9 = _ref8.get(port.device_id)) != null ? _ref9.toJSON() : void 0 : void 0;
          }
          fip.serverName = server != null ? server.name : void 0;
          return fip.portName = port != null ? port.name : void 0;
        });
        _.each(data.snaps, function(snap) {
          var volume, _ref6, _ref7;
          volume = (_ref6 = CloudResources(constant.RESTYPE.OSVOL, region)) != null ? (_ref7 = _ref6.get(snap.volume_id)) != null ? _ref7.toJSON() : void 0 : void 0;
          return snap.volumeName = volume != null ? volume.name : void 0;
        });
        _.each(data.elbs, function(listener) {
          var pool, _ref6, _ref7;
          pool = (_ref6 = CloudResources(constant.RESTYPE.OSPOOL, region)) != null ? (_ref7 = _ref6.get(listener.pool_id)) != null ? _ref7.toJSON() : void 0 : void 0;
          return listener.poolName = pool != null ? pool.name : void 0;
        });
        extNetworks = _.map(CloudResources(constant.RESTYPE.OSNETWORK, region).getExtNetworks(), function(m) {
          return m.toJSON();
        });
        _.each(data.rts, function(rt) {
          var extNetwork;
          extNetwork = _.findWhere(extNetworks, {
            id: rt.external_gateway_info.network_id
          });
          return rt.externalNetworkName = extNetwork.name;
        });
        return data;
      },
      getOsResDataById: function(region, type, id) {
        return CloudResources(type, region).get(id);
      },
      getResourcesCount: function(region) {
        var collection, d, data, filter, key, type;
        filter = {
          category: region
        };
        data = {
          servers: "OSSERVER",
          volumes: "OSVOL",
          snaps: "OSSNAP",
          fips: "OSFIP",
          rts: "OSRT",
          elbs: "OSLISTENER"
        };
        d = {};
        for (key in data) {
          type = data[key];
          collection = CloudResources(constant.RESTYPE[type], region);
          if (collection.isReady()) {
            d[key] = collection.where(filter).length;
          } else {
            d[key] = "";
          }
        }
        return d;
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/osdashboard/DashboardOs',["Workspace", "./DashboardView", "./DashboardModel", 'i18n!/nls/lang.js'], function(Workspace, DashboardView, DashboardModel, lang) {
    var Dashboard;
    Dashboard = (function(_super) {
      __extends(Dashboard, _super);

      function Dashboard() {
        return Dashboard.__super__.constructor.apply(this, arguments);
      }

      Dashboard.prototype.isFixed = function() {
        return true;
      };

      Dashboard.prototype.tabClass = function() {
        return "icon-dashboard";
      };

      Dashboard.prototype.title = function() {
        return lang.IDE.NAV_TIT_DASHBOARD;
      };

      Dashboard.prototype.url = function() {
        return "/";
      };

      Dashboard.prototype.initialize = function() {
        var self;
        this.model = new DashboardModel();
        this.view = new DashboardView({
          model: this.model
        });
        self = this;
        this.listenTo(App.model.stackList(), "update", function() {
          return self.__renderControl("updateOpsList");
        });
        this.listenTo(App.model.appList(), "update", function() {
          return self.__renderControl("updateOpsList");
        });
        this.listenTo(App.model.stackList(), "change", function() {
          return self.__renderControl("updateOpsList", arguments);
        });
        this.listenTo(App.model.appList(), "change", function() {
          return self.__renderControl("updateOpsList", arguments);
        });
        this.listenTo(this.model, "change:regionResources", function(type) {
          self.view.markUpdated();
          return self.__renderControl("updateRegionResources", arguments);
        });
        this.view.listenTo(App.model.appList(), "change:progress", this.view.updateAppProgress);
        this.model.fetchOsResources();
        this.__renderControlMap = {};
      };

      Dashboard.prototype.sleep = function() {
        this.__renderControlMap = {};
        this.view.sleep();
      };

      Dashboard.prototype.awake = function() {
        var method;
        for (method in this.__renderControlMap) {
          this.view[method]();
        }
        this.__renderControlMap = null;
        this.view.awake();
      };

      Dashboard.prototype.__renderControl = function(method, args) {
        if (this.__renderControlMap) {
          console.log("DashboardView's render is throttled, method name: " + method);
          this.__renderControlMap[method] = true;
        } else {
          this.view[method].apply(this.view, args);
        }
      };

      return Dashboard;

    })(Workspace);
    return Dashboard;
  });

}).call(this);

