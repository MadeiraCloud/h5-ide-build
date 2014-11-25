define('workspaces/osdashboard/DashboardTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div>\n\n<header class=\"dash-header\">\n  <button class=\"icon-refresh\" id=\"OsReloadResource\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_JUST_NOW", {hash:{},data:data}))
    + "</button>\n  <button class=\"btn btn-primary icon-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "</button>\n\n  <button id=\"ImportStack\" class=\"btn btn-primary icon-import\" data-analytics-plus=\"import_json\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_IMPORT_JSON", {hash:{},data:data}))
    + "</button>\n\n  <button id=\"VisualizeApp\" class=\"btn btn-blue icon-visualize\" data-analytics-plus=\"visualize_vpc\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_VISUALIZE_APP", {hash:{},data:data}))
    + "\n  </button>\n\n</header>\n\n<div class=\"dash-body nano\"> <div class=\"nano-content\">\n\n  <section class=\"dash-ops-list-wrapper\">\n    <nav>\n      <button class=\"on stack ops-list-switcher\"><span class=\"count\"></span> <small>"
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
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"modal-import-json-dropzone\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_DROP_LBL", {hash:{},data:data}))
    + "<label for=\"modal-import-json-file\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_SELECT_LBL", {hash:{},data:data}))
    + "</label><input type=\"file\" id=\"modal-import-json-file\"></div>\n<div id=\"import-json-error\"></div>";
  return buffer;
  };
TEMPLATE.importJSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<nav class=\"clearfix resource-list-nav\">\n  <div class=\"resource-tab servers on\" data-type=\"OSSERVER\">\n    <svg class=\"quota-chart\" viewbox=\"0 0 282 282\">\n      <path class=\"quota-path\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\"/>\n      <path class=\"quota-path usage\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\" stroke-dashoffset=\"589.1\"/>\n    </svg>\n    <span class=\"resource-count\">Server</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab volumes\" data-type=\"OSVOL\">\n    <svg class=\"quota-chart\" viewbox=\"0 0 282 282\">\n      <path class=\"quota-path\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\"/>\n      <path class=\"quota-path usage\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\" stroke-dashoffset=\"589.1\"/>\n    </svg>\n    <span class=\"resource-count\">Volume</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab snaps\" data-type=\"OSSNAP\">\n    <svg class=\"quota-chart\" viewbox=\"0 0 282 282\">\n      <path class=\"quota-path\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\"/>\n      <path class=\"quota-path usage\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\" stroke-dashoffset=\"589.1\"/>\n    </svg>\n    <span class=\"resource-count\">Snapshot</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab fips\" data-type=\"OSFIP\">\n    <svg class=\"quota-chart\" viewbox=\"0 0 282 282\">\n      <path class=\"quota-path\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\"/>\n      <path class=\"quota-path usage\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\" stroke-dashoffset=\"589.1\"/>\n    </svg>\n    <span class=\"resource-count\">Floating IP</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab rts\" data-type=\"OSRT\">\n    <svg class=\"quota-chart\" viewbox=\"0 0 282 282\">\n      <path class=\"quota-path\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\"/>\n      <path class=\"quota-path usage\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\" stroke-dashoffset=\"589.1\"/>\n    </svg>\n    <span class=\"resource-count\">Router</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n  <div class=\"resource-tab elbs\" data-type=\"OSLISTENER\">\n    <svg class=\"quota-chart\" viewbox=\"0 0 282 282\">\n      <path class=\"quota-path\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\"/>\n      <path class=\"quota-path usage\" d=\"M48.6 221.4a125 125 0 1 1 176.8 0\" stroke-dashoffset=\"589.1\"/>\n    </svg>\n    <span class=\"resource-count\">Load Balancer</span>\n    <p class=\"count\"><span class=\"count-usage\">-</span><span class=\"count-quota\">-</span></p>\n  </div>\n</nav>\n<div class=\"resource-list-body table-head-fix\"></div>";
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
define('workspaces/osdashboard/ImportAppTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_LOADING_APP_FAILED", {hash:{},data:data}))
    + "\n	<button class=\"btn btn-blue\" id=\"VisualizeReload\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_BTN_RETRY", {hash:{},data:data}))
    + "</button>\n</div>\n<div class=\"loading-spinner hide\"></div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ready), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "<div class=\"loading-spinner\"></div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<section>\n			<header class=\"region-header\"><span class=\"region-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><span class=\"vpc-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.apps)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></header>\n\n			<ul class=\"region-group clearfix\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n		</sectio\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li class=\"visualize-vpc\">\n					<h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n					<ol class=\"tac\">\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SUBNETS", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.router)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSROUTER", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.server)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSSERVER", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.fip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSFIP", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.listener)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSLISTENER", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.pool)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_OSPOOL", {hash:{},data:data}))
    + "</span></li>\n					</ol>\n					<button class=\"btn btn-blue visualize-vpc-btn\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_TO_IMPORT", {hash:{},data:data}))
    + "</button>\n				</li>\n				";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_APP_TO_IMPORT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  buffer += "<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:500px;\">\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<div id=\"VisualizeVpcDialog\" class=\"scroll-content\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fail), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/osdashboard/DashboardView',['./DashboardTpl', './DashboardTplData', "./ImportAppTpl", "constant", "i18n!/nls/lang.js", "CloudResources", "UI.modalplus", 'AppAction', "backbone", "UI.tooltip", "UI.table", "UI.bubble", "UI.scrollbar", "UI.nanoscroller"], function(Template, TemplateData, ImportAppTpl, constant, lang, CloudResources, Modal, appAction) {
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
        'click .resource-tab': 'switchResource',
        "click #ImportStack": "importStack",
        "click #VisualizeApp": "importApp"
      },
      resourcesTab: 'OSSERVER',
      initialize: function() {
        var self;
        this.opsListTab = "stack";
        this.lastUpdate = +(new Date());
        this.setElement($(Template.frame()).eq(0).appendTo("#main"));
        this.updateOpsList();
        this.updateResList();
        this.updateRegionResources(true);
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
          data: (_ref = this.model.getOsResDataById(constant.RESTYPE[data.type], data.id)) != null ? _ref.toJSON() : void 0
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
        if (model.get("region") === this.model.region && this.regionOpsTab === "app") {
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
      updateResourceCount: function(init) {
        var $nav, child, count, provider, quotaMap, r, resourceCount, resourceMap, that;
        that = this;
        provider = App.user.get("default_provider");
        quotaMap = App.model.getOpenstackQuotas(provider);
        $nav = $(".resource-list-nav");
        resourceMap = {
          elbs: "Neutron::port",
          fips: "Neutron::floatingip",
          rts: "Neutron::router",
          servers: "Nova::instances",
          snaps: "Cinder::snapshots",
          volumes: "Cinder::volumes"
        };
        if (init === true && quotaMap) {
          _.each(resourceMap, function(value, key) {
            var dom, quota;
            dom = $nav.children("." + key);
            quota = quotaMap[value];
            that.animateUsage(dom, 0, quota);
            return dom.find('.count-usage').text("-");
          });
        }
        resourceCount = this.model.getResourcesCount();
        for (r in resourceCount) {
          count = resourceCount[r];
          child = $nav.children("." + r);
          if (typeof count === "number" && quotaMap) {
            this.animateUsage(child, count, quotaMap[resourceMap[r]]);
          }
        }
      },
      animateUsage: function(elem, usage, quota) {
        var $path;
        $path = elem.find(".quota-path.usage");
        $path.attr("stroke-dashoffset", ($path[0].getTotalLength() * (1 - usage / quota)).toFixed(2));
        elem.find('.count-usage').text(usage);
        return elem.find('.count-quota').text("/" + quota);
      },
      updateRegionResources: function(type) {
        var tpl, _ref;
        this.updateResourceCount(type);
        if (type && (_ref = this.resourcesTab, __indexOf.call(type, _ref) < 0)) {
          return;
        }
        type = constant.RESTYPE[this.resourcesTab];
        if (!this.model.isOsResReady(type)) {
          tpl = '<div class="dashboard-loading"><div class="loading-spinner"></div></div>';
        } else {
          tpl = TemplateData["resource_" + this.resourcesTab](this.model.getOsResData(type));
        }
        return $(".resource-list-body").html(tpl);
      },
      openItem: function(event) {
        return App.openOps($(event.currentTarget).attr("data-id"));
      },
      createStack: function(event) {
        return App.createOps(this.model.region, this.model.provider);
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
      },
      importStack: function() {
        var hanldeFile, modal, reader, zone;
        modal = new Modal({
          title: lang.IDE.POP_IMPORT_JSON_TIT,
          template: Template.importJSON(),
          width: "470",
          disableFooter: true
        });
        reader = new FileReader();
        reader.onload = function(evt) {
          var error;
          error = App.importJson(reader.result);
          if (_.isString(error)) {
            $("#import-json-error").html(error);
          } else {
            modal.close();
            reader = null;
          }
          return null;
        };
        reader.onerror = function() {
          $("#import-json-error").html(lang.IDE.POP_IMPORT_ERROR);
          return null;
        };
        hanldeFile = function(evt) {
          var files;
          evt.stopPropagation();
          evt.preventDefault();
          $("#modal-import-json-dropzone").removeClass("dragover");
          $("#import-json-error").html("");
          evt = evt.originalEvent;
          files = (evt.dataTransfer || evt.target).files;
          if (!files || !files.length) {
            return;
          }
          reader.readAsText(files[0]);
          return null;
        };
        $("#modal-import-json-file").on("change", hanldeFile);
        zone = $("#modal-import-json-dropzone").on("drop", hanldeFile);
        zone.on("dragenter", function() {
          return $(this).closest("#modal-import-json-dropzone").toggleClass("dragover", true);
        });
        zone.on("dragleave", function() {
          return $(this).closest("#modal-import-json-dropzone").toggleClass("dragover", false);
        });
        zone.on("dragover", function(evt) {
          var dt;
          dt = evt.originalEvent.dataTransfer;
          if (dt) {
            dt.dropEffect = "copy";
          }
          evt.stopPropagation();
          evt.preventDefault();
          return null;
        });
        return null;
      },
      importApp: function() {
        var self;
        self = this;
        if (!this.visModal) {
          this.visModal = new Modal({
            title: lang.IDE.DASH_IMPORT_APP,
            width: "770",
            template: ImportAppTpl({}),
            disableFooter: true,
            compact: true,
            onClose: function() {
              self.visModal = null;
            }
          });
          this.visModal.tpl.on("click", "#VisualizeReload", function() {
            self.importApp();
            self.visModal.tpl.find(".unmanaged-vpc-empty").hide();
            self.visModal.tpl.find(".loading-spinner").show();
            return false;
          });
          this.visModal.tpl.on("click", ".visualize-vpc-btn", function(event) {
            return self.doImportApp(event);
          });
        }
        this.model.importApp().then(function(data) {
          return self.visModal.tpl.find(".modal-body").html(ImportAppTpl({
            ready: true,
            data: data
          }));
        }, function() {
          return self.visModal.tpl.find(".modal-body").html(ImportAppTpl({
            fail: true
          }));
        });
      },
      doImportApp: function(evt) {
        var $tgt, id, region;
        $tgt = $(evt.currentTarget);
        id = $tgt.attr("data-id");
        region = $tgt.closest("ul").attr("data-region");
        this.visModal.close();
        App.openOps(App.model.createImportOps(region, "openstack", this.model.provider, id));
        return false;
      }
    });
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/osdashboard/DashboardModel',["ApiRequest", "CloudResources", "constant", "backbone"], function(ApiRequest, CloudResources, constant) {

    /*
      Dashboard Model
     */
    return Backbone.Model.extend({
      defaults: {
        region: "",
        provider: ""
      },
      initialize: function() {
        var R, r;
        r = this.region = App.user.get("default_region");
        this.provider = App.user.get("default_provider");
        R = constant.RESTYPE;
        r = this.region;
        this.listenTo(CloudResources(R.OSSERVER, r), "update", this.onRegionResChanged(['OSSERVER', 'FIP']));
        this.listenTo(CloudResources(R.OSPORT, r), "update", this.onRegionResChanged(['FIP']));
        this.listenTo(CloudResources(R.OSVOL, r), "update", this.onRegionResChanged(['OSVOL', 'OSSNAP']));
        this.listenTo(CloudResources(R.OSSNAP, r), "update", this.onRegionResChanged(['OSSNAP']));
        this.listenTo(CloudResources(R.OSFIP, r), "update", this.onRegionResChanged(['OSFIP']));
        this.listenTo(CloudResources(R.OSRT, r), "update", this.onRegionResChanged(['OSRT']));
        this.listenTo(CloudResources(R.OSPOOL, r), "update", this.onRegionResChanged(['OSPOOL', 'OSLISTENER']));
        this.listenTo(CloudResources(R.OSLISTENER, r), "update", this.onRegionResChanged(['OSLISTENER']));
        return this.listenTo(CloudResources(R.OSNETWORK, r), "update", this.onRegionResChanged(['OSRT']));
      },
      onRegionResChanged: function(type) {
        return function() {
          return this.trigger("change:regionResources", type);
        };
      },

      /* Cloud Resources */
      fetchOsResources: function() {
        CloudResources(constant.RESTYPE.OSSERVER, this.region).fetch();
        CloudResources(constant.RESTYPE.OSPORT, this.region).fetch();
        CloudResources(constant.RESTYPE.OSVOL, this.region).fetch();
        CloudResources(constant.RESTYPE.OSSNAP, this.region).fetch();
        CloudResources(constant.RESTYPE.OSFIP, this.region).fetch();
        CloudResources(constant.RESTYPE.OSRT, this.region).fetch();
        CloudResources(constant.RESTYPE.OSPOOL, this.region).fetch();
        CloudResources(constant.RESTYPE.OSLISTENER, this.region).fetch();
        CloudResources(constant.RESTYPE.OSNETWORK, this.region).fetch();
      },
      isOsResReady: function(type) {
        var res;
        res = CloudResources(type, this.region).isReady();
        switch (type) {
          case constant.RESTYPE.OSLISTENER:
            res = res && CloudResources(constant.RESTYPE.OSPOOL, this.region).isReady();
            break;
          case constant.RESTYPE.OSPOOL:
            res = res && CloudResources(constant.RESTYPE.OSLISTENER, this.region).isReady();
        }
        return res;
      },
      getOsResData: function(type) {
        var availableImageDistro, data, extNetworks, region;
        region = this.region;
        availableImageDistro = ["centos", "debian", "fedora", "gentoo", "opensuse", "redhat", "suse", "ubuntu", "windows", "cirros"];
        data = {
          servers: _.map(CloudResources(constant.RESTYPE.OSSERVER, region).toJSON(), function(e) {
            var _ref;
            if (_ref = e.system_metadata.image_os_distro, __indexOf.call(availableImageDistro, _ref) < 0) {
              e.system_metadata.image_os_distro = "unknown";
            }
            return e;
          }),
          volumes: CloudResources(constant.RESTYPE.OSVOL, region).toJSON(),
          snaps: CloudResources(constant.RESTYPE.OSSNAP, region).toJSON(),
          fips: CloudResources(constant.RESTYPE.OSFIP, region).toJSON(),
          rts: CloudResources(constant.RESTYPE.OSRT, region).toJSON(),
          elbs: CloudResources(constant.RESTYPE.OSLISTENER, region).toJSON()
        };
        _.each(data.fips, function(fip) {
          var port, portId, server, _ref, _ref1, _ref2, _ref3;
          portId = fip.port_id;
          port = (_ref = CloudResources(constant.RESTYPE.OSPORT, region)) != null ? (_ref1 = _ref.get(portId)) != null ? _ref1.toJSON() : void 0 : void 0;
          if (port) {
            server = (_ref2 = CloudResources(constant.RESTYPE.OSSERVER, region)) != null ? (_ref3 = _ref2.get(port.device_id)) != null ? _ref3.toJSON() : void 0 : void 0;
          }
          fip.serverName = server != null ? server.name : void 0;
          return fip.portName = port != null ? port.name : void 0;
        });
        _.each(data.snaps, function(snap) {
          var volume, _ref, _ref1;
          volume = (_ref = CloudResources(constant.RESTYPE.OSVOL, region)) != null ? (_ref1 = _ref.get(snap.volume_id)) != null ? _ref1.toJSON() : void 0 : void 0;
          return snap.volumeName = volume != null ? volume.name : void 0;
        });
        _.each(data.elbs, function(listener) {
          var pool, _ref, _ref1;
          pool = (_ref = CloudResources(constant.RESTYPE.OSPOOL, region)) != null ? (_ref1 = _ref.get(listener.pool_id)) != null ? _ref1.toJSON() : void 0 : void 0;
          return listener.poolName = pool != null ? pool.name : void 0;
        });
        extNetworks = _.map(CloudResources(constant.RESTYPE.OSNETWORK, region).getExtNetworks(), function(m) {
          return m.toJSON();
        });
        _.each(data.rts, function(rt) {
          var extNetwork, name;
          name = "";
          if (rt.external_gateway_info) {
            extNetwork = _.findWhere(extNetworks, {
              id: rt.external_gateway_info.network_id
            });
            if (extNetwork) {
              name = extNetwork.name;
            }
          }
          return rt.externalNetworkName = name;
        });
        return data;
      },
      getOsResDataById: function(type, id) {
        return CloudResources(type, this.region).get(id);
      },
      getResourcesCount: function() {
        var collection, d, data, filter, key, type;
        filter = {
          category: this.region
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
          collection = CloudResources(constant.RESTYPE[type], this.region);
          if (collection.isReady()) {
            d[key] = collection.where(filter).length;
          } else {
            d[key] = "";
          }
        }
        return d;
      },
      importApp: function() {
        var self;
        self = this;
        return ApiRequest("resource_region_resource").then(function(data) {
          var d, emptyArr, key, networkId, region, value, _ref;
          d = [];
          emptyArr = [];
          _ref = data.openstack[self.provider] || {};
          for (key in _ref) {
            value = _ref[key];
            region = {
              name: constant.REGION_LABEL[key],
              region: key,
              apps: []
            };
            for (networkId in value) {
              data = value[networkId];
              region.apps.push({
                id: networkId,
                subnet: (data[constant.RESTYPE.OSSUBNET] || emptyArr).length,
                router: (data[constant.RESTYPE.OSRT] || emptyArr).length,
                server: (data[constant.RESTYPE.OSSERVER] || emptyArr).length,
                fip: (data[constant.RESTYPE.OSFIP] || emptyArr).length,
                listener: (data[constant.RESTYPE.OSLISTENER] || emptyArr).length,
                pool: (data[constant.RESTYPE.OSPOOL] || emptyArr).length
              });
            }
            if (region.apps.length) {
              d.push(region);
            }
          }
          return d;
        });
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

