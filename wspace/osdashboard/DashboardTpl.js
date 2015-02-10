define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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