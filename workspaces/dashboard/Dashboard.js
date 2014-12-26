define('workspaces/dashboard/DashboardTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.shortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.shortName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }

  buffer += "<div>\n\n<header id=\"global-region-header\">\n	<button id=\"RefreshResource\" class=\"icon-refresh\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_JUST_NOW", {hash:{},data:data}))
    + "</button>\n\n  <div class=\"hovermenu\">\n    <button class=\"btn btn-primary icon-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "<i class=\"icon-caret-down\"></i></button>\n    <ul id=\"global-region-create-stack-list\" class=\"dropdown-menu\">";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n  </div>\n\n  <div class=\"hovermenu\">\n    <button class=\"btn btn-primary icon-import\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_IMPORT_JSON", {hash:{},data:data}))
    + "<i class=\"icon-caret-down\"></i></button>\n    <ul class=\"dropdown-menu\" id=\"ImportStack\">\n      <li data-type=\"stack\" data-analytics-plus=\"import_json\">Import stack</li>\n      <li data-type=\"cf\" data-analytics-plus=\"import_cf\">Import cloudformation</li>\n    </ul>\n  </div>\n\n	<button id=\"VisualizeVPC\" class=\"btn btn-blue icon-visualize\" data-analytics-plus=\"visualize_vpc\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_VISUALIZE_VPC", {hash:{},data:data}))
    + "\n	</button>\n</header>\n\n\n<div id=\"global-region-wrap\" class=\"nano\">\n<div class=\"nano-content\">\n	<!-- Global Map -->\n    <div id=\"global-region-map-wrap\">\n        <div id=\"global-region-map-content\" class=\"clearfix\">\n            <ul id=\"global-region-spot\" class=\"pos-r\"></ul>\n            <div id=\"global-region-status-widget\">\n                <header class=\"clearfix\">\n                    <div class=\"global-region-status-tab\">\n                        <span>0</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}))
    + "</h5>\n                    </div>\n                    <div class=\"global-region-status-tab on stack\">\n                        <span>0</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}))
    + "</h5>\n                    </div>\n                </header>\n                <section id=\"global-region-recent-list\"></section>\n            </div>\n        </div>\n    </div>\n	<!-- Global Map -->\n\n<section id=\"dashboard-data-wrap\">\n\n	<nav class=\"pos-r\">\n		<button id=\"region-switch\" class=\"btn-blue btn js-toggle-dropdown\">\n			<i class=\"icon-caret-down right\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</span>\n		</button>\n\n		<ul id=\"region-switch-list\" class=\"dropdown-menu\">\n			<li data-region=\"global\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</li>\n			";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</nav>\n\n	<!-- Global view --><ul id=\"GlobalView\" class=\"clearfix\" style=\"display:none;\"></ul><!-- Global view -->\n\n	<!-- Region view --><section id=\"RegionView\" style=\"display:none;\">\n		<div id=\"region-app-stack-wrap\">\n			<div class=\"dashboard-loading\"><div class=\"loading-spinner\"></div></div>\n		</div>\n		<div id=\"RegionViewWrap\">\n		<nav class=\"clearfix\" id=\"RegionResourceNav\">\n		  <div class=\"resource-tab instances on\" data-type=\"INSTANCE\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		    <div class=\"resource-tab rds\" data-type=\"DBINSTANCE\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RDS", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab eips\" data-type=\"EIP\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab volumes\" data-type=\"VOL\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab vpcs\" data-type=\"VPC\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab vpns\" data-type=\"VPN\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab elbs\" data-type=\"ELB\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab asgs\" data-type=\"ASG\">\n		   <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab cloudwatches\" data-type=\"CW\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		  <div class=\"resource-tab snss\" data-type=\"SUBSCRIPTION\">\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\n		</nav>\n		<div id=\"RegionResourceData\" class=\"table-head-fix\"></div>\n		</div>\n	</section><!-- Region view -->\n\n	<div id=\"DashboardDemo\">\n	  <div class=\"enter-credential\">\n	    "
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_SAMPLE_INSTRUCTION", {hash:{},data:data}))
    + "</br>\n	    <a class=\"show-credential\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_PROVIDE_YOUR_CREDENTIAL_1", {hash:{},data:data}))
    + "</a> "
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_PROVIDE_YOUR_CREDENTIAL_2", {hash:{},data:data}))
    + "\n	  </div>\n	  <img src=\"/assets/images/ide/global-demo.png\"/>\n	</div>\n</section>\n\n</div></div></div>\n\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/dashboard/DashboardTplData',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"global-map-item\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " Dashboard\">\n  <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n  <span class=\"global-region-location app\">"
    + escapeExpression(((stack1 = (depth0 && depth0.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  <span class=\"global-region-location stack\">"
    + escapeExpression(((stack1 = (depth0 && depth0.stack)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.globalMap=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RECENT_LAUNCHED_STACK", {hash:{},data:data}))
    + "</h4>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"recent-list-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h5>\n    <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span class=\"recent-time\">"
    + escapeExpression(((stack1 = (depth0 && depth0.formatedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </li>";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"right icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <span class=\"empty-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_RECENT_APP", {hash:{},data:data}))
    + "</span>\n";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RECENT_EDITED_STACK", {hash:{},data:data}))
    + "</h4>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stacks), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"recent-list-item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n    <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <span class=\"recent-time\">"
    + escapeExpression(((stack1 = (depth0 && depth0.formatedTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </li>";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <span class=\"empty-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_RECENT_STACK", {hash:{},data:data}))
    + "</span>\n";
  return buffer;
  }

  buffer += "<section ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.apps)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(7, program7, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>\n<section ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.stacks)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(12, program12, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</section>";
  return buffer;
  };
TEMPLATE.recent=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n<div class=\"dashboard-loading\"><div class=\"loading-spinner\"></div></div>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"instances\" data-type=\"INSTANCE\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instances)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RUNNING_INSTANCE", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instances), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"rds\" data-type=\"DBINSTANCE\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rds)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RDS", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.rds), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"eips\" data-type=\"EIP\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eips)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.eips), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"volumes\" data-type=\"VOL\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volumes)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"elbs\" data-type=\"ELB\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.elbs)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.elbs), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"vpns\" data-type=\"VPN\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.vpns)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vpns), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"global-resource-li\">\n    <span class=\"count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <h4>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h4><h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.regionArea)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n  </li>";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.globalResources=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "class=\"on\"";
  }

function program3(depth0,data) {
  
  
  return "on ";
  }

function program5(depth0,data) {
  
  
  return " style=\"display: none;\"";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progressing), {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>\n";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"thumbnail app-thumbnail\"></div>\n    <div class=\"region-resource-progess";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.progress), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\n    <div class=\"region-resource-info truncate\">\n        <div class=\"loading-spinner loading-spinner-small\"></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.stateDesc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "...\n    </div>\n";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return " hide";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"thumbnail app-thumbnail\"><img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></div>\n  <div class=\"region-resource-info\">\n    <i class=\"icon-terminate terminate-app\"></i>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stoppable), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <span class=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </div>\n";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program14(depth0,data) {
  
  
  return "class=\"hide\"";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return "<i class=\"icon-stop stop-app\"></i>";
  }

function program19(depth0,data) {
  
  
  return "<i class=\"icon-play start-app\"></i>";
  }

function program21(depth0,data) {
  
  
  return "running";
  }

function program23(depth0,data) {
  
  
  return "stopped";
  }

function program25(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"blank-widget\"><div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "</div></div>\n";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"thumbnail\"><img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/></div>\n    <div class=\"region-resource-info\">\n      <i class=\"icon-delete delete-stack tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_DEL_STACK", {hash:{},data:data}))
    + "\"></i>\n      <i class=\"icon-duplicate duplicate-stack tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "\"></i>\n      <span class=\"truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n  </li>\n";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"blank-widget\"><div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_STACK", {hash:{},data:data}))
    + "</div></div>\n";
  return buffer;
  }

  buffer += "<ul id=\"region-resource-tab\" class=\"clearfix\">\n    <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.apps)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <small>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}))
    + "</small></li>\n    <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stack), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "stack\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stacks)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <small>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}))
    + "</small>\n        <button id=\"btn-create-stack\" class=\"icon-new-stack\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_CREATE_STACK", {hash:{},data:data}))
    + "\"></button>\n    </li>\n</ul><!-- Resource tab -->\n\n<div class=\"scroll-wrap\">\n<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n\n<ul id=\"region-resource-app-wrap\" class=\"region-resource-list clearfix\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stack), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.program(25, program25, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul><!-- Resource App -->\n\n<ul id=\"region-resource-stack-wrap\" class=\"region-resource-list clearfix\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stacks), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul><!-- Resource Stack -->\n</div>\n</div>\n<!-- Region App & Stack -->";
  return buffer;
  };
TEMPLATE.region_app_stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<tr>\n        <td>\n        ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          <div>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.visopsTag), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"resource-id\">( "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " )</span></div>\n        </td>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.launchTime), {hash:{},data:data}))
    + "</td>\n        <td>\n          <img src=\"/assets/images/ide/ami/";
  stack1 = helpers.awsAmiIcon.call(depth0, (depth0 && depth0.imageId), (depth0 && depth0.category), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n          <span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;AMI&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td ";
  stack1 = helpers.awsIsEip.call(depth0, (depth0 && depth0.ipAddress), (depth0 && depth0.category), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.ipAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.placement)),stack1 == null || stack1 === false ? stack1 : stack1.availabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n      </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div class=\"table-app-link-wrap\"><span class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var stack1;
  return escapeExpression(helpers.or.call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.name), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.Name), {hash:{},data:data}));
  }

function program10(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "class=\"dashboard-eip tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAUNCH_TIME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AMI", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE_TYPE", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n      <thead>\n          <tr>\n              <th></th>\n              <th style=\"width: 10%\"></th>\n              <th style=\"width: 18%\"></th>\n              <th style=\"width: 15%\"></th>\n              <th style=\"width: 11%\"></th>\n              <th style=\"width: 14%\"></th>\n              <th style=\"width: 11%\"></th>\n              <th style=\"width: 40px\"></th>\n          </tr>\n      </thead>\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(14, program14, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n  </table>\n</div></div>";
  return buffer;
  };
TEMPLATE.resourceINSTANCE=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n            </tr>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n                .\n            </div>\n        ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\" style=\"width:40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_IP", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ASSOCIATED_INSTANCE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n        <tr>\n            <th style=\"width:40%\"></th>\n            <th></th>\n            <th style=\"width:40px\"></th>\n        </tr>\n        </thead>\n        <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n    </table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceEIP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n                <td>\n                    ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                </td>\n                <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.device)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GiB</td>\n                <td>\n                    <i class=\"status ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachmentStatus), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachmentStatus), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n            </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <div class=\"table-app-link-wrap\"><span\n                                class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\"\n                                data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\"\n                                data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n                    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n                    ";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "status-in-use";
  }

function program10(depth0,data) {
  
  
  return "status-available";
  }

function program12(depth0,data) {
  
  
  return "\n                    attached";
  }

function program14(depth0,data) {
  
  
  return "not-attached";
  }

function program16(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n                .\n            </div>\n        ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DEVICE_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:12%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME_SIZE", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ATTACHMENT_STATUS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n        <tr>\n            <th></th>\n            <th style=\"width: 15%\"></th>\n            <th style=\"width: 20%\"></th>\n            <th style=\"width: 18%\"></th>\n            <th style=\"width: 12%\"></th>\n            <th style=\"width: 15%\"></th>\n            <th style=\"width:40px\"></th>\n        </tr>\n        </thead>\n        <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(16, program16, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n    </table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceVOL=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n        <td>\n        ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </td>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dhcpOptionsId), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n      </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div class=\"table-app-link-wrap\"><span class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n        ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;DHCP&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

function program10(depth0,data) {
  
  
  return "None";
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CIDR", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DHCP_SETTINGS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n      <thead>\n      <tr>\n          <th></th>\n          <th style=\"width:20%\"></th>\n          <th style=\"width:25%\"></th>\n          <th style=\"width:20%\"></th>\n          <th style=\"width:40px\"></th>\n      </tr>\n      </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tbody>\n</table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceVPC=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>\n          ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </td>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td><span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;VGW&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n        <td><span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;CGW&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id='"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'></i></td>\n      </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"table-app-link-wrap\"><span class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n          ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n          ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VIRTUAL_PRIVATE_GATEWAY", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CUSTOMER_GATEWAY", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n        <tr>\n            <th></th>\n            <th style=\"width: 20%\"></th>\n            <th style=\"width: 25%\"></th>\n            <th style=\"width: 20%\"></th>\n            <th style=\"width: 40px\"></th>\n        </tr>\n        </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceVPN=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.CreatedTime), {hash:{},data:data}))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZones)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n            </tr>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n                .\n            </div>\n        ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DNS_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n    <table class=\"table\">\n        <thead>\n        <tr>\n            <th></th>\n            <th style=\"width: 20%\"></th>\n            <th style=\"width: 25%\"></th>\n            <th style=\"width: 20%\"></th>\n            <th style=\"width: 40px\"></th>\n        </tr>\n        </thead>\n        <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </tbody>\n    </table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceELB=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr>\n                    <td>\n                        ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.visopsTag), ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(6, program6, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AutoScalingGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                    </td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.last_activity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.activity_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n                    </td>\n                </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <div class=\"table-app-link-wrap\"><span\n                                    class=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.isOwner), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate tooltip\"\n                                    data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.visopsTag), "Created by", {hash:{},data:data}))
    + "\"\n                                    data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.visopsTag)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n                        ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "table-app-link link-style";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n                            <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n                        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "\n                </div>\n            ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CURRENT", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAST_ACTIVITY", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ACTIVITY_STATUS", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th></th>\n                <th style=\"width: 50%\"></th>\n                <th style=\"width: 20%\"></th>\n                <th style=\"width:40px\"></th>\n            </tr>\n            </thead>\n            <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceASG=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <tr>\n              <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              <td>";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.Dimensions), ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n              <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.MetricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.ComparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.Threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " for "
    + escapeExpression(((stack1 = (depth0 && depth0.Period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds</td>\n              <td><i class=\"status ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.StateValue), "OK", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.StateValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n              <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n            </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.Value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "status-green";
  }

function program7(depth0,data) {
  
  var stack1;
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.StateValue), "ALARM", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program8(depth0,data) {
  
  
  return "status-yellow";
  }

function program10(depth0,data) {
  
  
  return "status-grey";
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n            ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DIMENSION", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_THRESHOLD", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th style=\"width: 30%\"></th>\n                    <th style=\"width: 30%\"></th>\n                    <th style=\"width: 10%\"></th>\n                    <th style=\"width:40px\"></th>\n                </tr>\n            </thead>\n          <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </tbody>\n        </table>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceCW=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <tr>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.TopicName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (depth0 && depth0.Endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                    ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.SubscriptionArn), "PendingConfirmation", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n                    </td>\n                </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <td><i class=\"status status-red icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_PENDING_CONFIRMATION", {hash:{},data:data}))
    + "</td>\n                    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n                        <td><i class=\"status status-green icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_SUCCESS", {hash:{},data:data}))
    + "</td>\n                    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + "</div>\n            ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_TOPIC_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ENDPOINT_AND_PROTOCOL", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CONFIRMATION", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n        <table class=\"table\">\n            <thead>\n            <tr>\n                <th style=\"width:20%\"></th>\n                <th></th>\n                <th style=\"width:30%\"></th>\n                <th style=\"width:40px\"></th>\n            </tr>\n            </thead>\n            <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </tbody>\n        </table>\n    </div>";
  return buffer;
  };
TEMPLATE.resourceSUBSCRIPTION=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<tr>\n                <td>\n                    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                </td>\n                <td><i class=\"status status-";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.DBInstanceStatus), "available", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n                <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</td>\n                <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n            </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "green";
  }

function program5(depth0,data) {
  
  
  return "yellow";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n                <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n            ";
  return buffer;
  }

  buffer += "<table class=\"table-head\">\n    <thead>\n    <tr>\n        <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DBINSTANCE_NAME", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:18%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:21%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_FAMILY", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLASS", {hash:{},data:data}))
    + "</th>\n        <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STORAGE", {hash:{},data:data}))
    + "</th>\n        <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n    </tr>\n    </thead>\n</table>\n<div class=\"scroll-wrap\"><div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n        <table class=\"table\">\n            <thead>\n                <tr>\n                    <th></th>\n                    <th style=\"width: 18%\"></th>\n                    <th style=\"width: 21%\"></th>\n                    <th style=\"width: 15%\"></th>\n                    <th style=\"width: 15%\"></th>\n                    <th style=\"width: 40px\"></th>\n                </tr>\n            </thead>\n            <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n        </table>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceDBINSTANCE=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, (data == null || data === false ? data : data.key), {hash:{},data:data}))
    + ":</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.bubble), {hash:{},inverse:self.program(10, program10, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<a href=\"javascript:void(0)\" class=\"bubble table-link\" data-bubble-template=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.template), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-bubble-data=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return ", ";
  }

function program6(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.bubble)),stack1 == null || stack1 === false ? stack1 : stack1.template)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program8(depth0,data) {
  
  
  return "dashboardBubble";
  }

function program10(depth0,data) {
  
  
  return escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0));
  }

  buffer += "<dl class=\"dl-horizontal\" style=\"margin-top:0;\">\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</dl>";
  return buffer;
  };
TEMPLATE.resourceDetail=Handlebars.template(__TEMPLATE__);


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
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n    <dl class=\"dl-horizontal\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>\n</div>";
  return buffer;
  };
TEMPLATE.bubbleResourceSub=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('workspaces/dashboard/VisualizeVpcTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_LOADING_VPC_FAILED", {hash:{},data:data}))
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
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.program(26, program26, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.vpcs)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<section>\n			<header class=\"region-header\"><span class=\"region-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>"
    + escapeExpression(((stack1 = (depth0 && depth0.subname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"vpc-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.vpcs)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></header>\n\n			<ul class=\"region-group clearfix\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vpcs), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n		</section>";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li class=\"visualize-vpc ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n					<h5>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h5>\n					<ol class=\"tac\">\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subnet)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SUBNETS", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RUNNING_INSTANCE", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stopped)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STOPPED_INSTANCE", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NETWORK_INTERFACE", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eip)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</span></li>\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.elb)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</span></li>\n					</ol>\n					<button class=\"btn btn-blue visualize-vpc-btn";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.username), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.username), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-vpcid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.username), {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n				</li>\n				";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return " disabled tooltip";
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += " data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "IDE_TIP_VISUALIZE_MORE_THAN_100_ENI", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span>("
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>";
  return buffer;
  }

function program16(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program18(depth0,data) {
  
  
  return " tooltip disabled";
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-tooltip=\"This VPC has been imported by "
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"";
  return buffer;
  }

function program22(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_ALREADY_IMPORTED", {hash:{},data:data}));
  }

function program24(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_TO_IMPORT", {hash:{},data:data}));
  }

function program26(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"unmanaged-vpc-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TPL_NO_VPC_TO_IMPORT", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

  buffer += "<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:500px;\">\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<div id=\"VisualizeVpcDialog\" class=\"scroll-content\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fail), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/dashboard/ImportDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-spinner loading-spinner-small hide\"></div>\n<div id=\"modal-import-json-dropzone\">"
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
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"loading-spinner loading-spinner-small hide\"></div>\n<div id=\"modal-import-json-dropzone\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_DROP_CF_LBL", {hash:{},data:data}))
    + "<label for=\"modal-import-json-file\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_SELECT_LBL", {hash:{},data:data}))
    + "</label><input type=\"file\" id=\"modal-import-json-file\"></div>\n<div id=\"import-json-error\"></div>";
  return buffer;
  };
TEMPLATE.importCF=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"item";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <section class=\"modal-control-group\"> <h5>Specify parameters for template:</h5>\n\n  <div class=\"nano cf-params-wrap\">\n    <ul class=\"cf-params nano-content\" id=\"import-cf-params\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.parameters), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n  </section>\n  ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"cf-input-entry\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.NoEcho), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n      <div class=\"cf-left\">\n        <span class=\"cf-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"cf-type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.Type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      </div>\n      <div class=\"cf-right\">\n        <span class=\"cf-input-wrap\">\n          <input class=\"input cf-input\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.NoEcho), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.Default)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </span>\n\n        <div class=\"cf-desc\"><p>"
    + escapeExpression(((stack1 = (depth0 && depth0.Description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.__Constraint), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <span class=\"cf-error\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ConstraintDescription), {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n      </div>\n      </li>";
  return buffer;
  }
function program6(depth0,data) {
  
  
  return "data-echo=\"false\"";
  }

function program8(depth0,data) {
  
  
  return "type=\"password\"";
  }

function program10(depth0,data) {
  
  
  return "type=\"text\"";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p>"
    + escapeExpression(((stack1 = (depth0 && depth0.__Constraint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  return buffer;
  }

function program14(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.ConstraintDescription)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program16(depth0,data) {
  
  
  return "Parameter value does not meet its constraint.";
  }

  buffer += "<div id=\"import-cf-form\">\n  <section class=\"modal-control-group clearfix\"> <label class=\"label\">Region:</label>\n    <div class=\"selectbox combo-dd\" id=\"import-cf-region\">\n      <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.regions)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      <ul class=\"dropdown\" tabindex=\"-1\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.regions), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n      </ul>\n    </div>\n  </section>\n\n  ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.parameters)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"loader\"><div class=\"loading-spinner\"></div></div>\n\n  <div class=\"modal-footer\">\n    <span class=\"param-error hide\">Please provide valid value for each parameter.</span>\n    <button class=\"btn btn-blue\" id=\"import-cf-import\">Import</button>\n    <button class=\"btn btn-silver\" id=\"import-cf-cancel\">Cancel</button>\n  </div>\n</div>\n<div class=\"loading-spinner hide\"></div>";
  return buffer;
  };
TEMPLATE.importCFConfirm=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/dashboard/ImportDialog',['./ImportDialogTpl', "UI.modalplus", "constant", "i18n!/nls/lang.js", "CloudResources", "ApiRequest", "JsonExporter", "backbone", "UI.select2", "UI.nanoscroller"], function(tplPartials, Modal, constant, lang, CloudResources, ApiRequest, JsonExporter) {
    return Backbone.View.extend({
      events: {
        "change #modal-import-json-file": "onSelectFile",
        "drop #modal-import-json-dropzone": "onSelectFile",
        "dragenter #modal-import-json-dropzone": "onDragenter",
        "dragleave #modal-import-json-dropzone": "onDragleave",
        "dragover  #modal-import-json-dropzone": "onDragover",
        "click #import-cf-cancel": "cancelImport",
        "click #import-cf-import": "doImport",
        "keypress .cf-input": "onFocusInput",
        "OPTION_CHANGE #import-cf-region": "onRegionChange"
      },
      initialize: function(attr) {
        var self;
        self = this;
        this.type = attr.type;
        this.modal = new Modal({
          title: this.type === "stack" ? lang.IDE.POP_IMPORT_JSON_TIT : lang.IDE.POP_IMPORT_CF_TIT,
          template: this.type === "stack" ? tplPartials.importJSON() : tplPartials.importCF(),
          width: "470",
          disableFooter: true,
          onClose: function() {
            return self.onModalClose();
          }
        });
        this.setElement(this.modal.tpl);
        this.regionForceFetchMap = {};
        this.reader = new FileReader();
        this.reader.onload = function(evt) {
          return self.onReaderLoader(evt);
        };
        this.reader.onerror = this.onReaderError;
      },
      onDragenter: function() {
        return this.$el.find("#modal-import-json-dropzone").toggleClass("dragover", true);
      },
      onDragleave: function() {
        return this.$el.find("#modal-import-json-dropzone").toggleClass("dragover", false);
      },
      onDragover: function(evt) {
        var dt;
        dt = evt.originalEvent.dataTransfer;
        if (dt) {
          dt.dropEffect = "copy";
        }
        evt.stopPropagation();
        evt.preventDefault();
      },
      onSelectFile: function(evt) {
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
        this.reader.readAsText(files[0]);
        return null;
      },
      onReaderLoader: function(evt) {
        var error, result;
        result = JsonExporter.importJson(this.reader.result);
        if (_.isString(result)) {
          $("#import-json-error").html(result);
          return;
        }
        if (this.type === "stack" && result.AWSTemplateFormatVersion) {
          error = lang.IDE.POP_IMPORT_FORMAT_ERROR;
        } else if (this.type === "cf" && !result.AWSTemplateFormatVersion) {
          error = lang.IDE.POP_IMPORT_FORMAT_ERROR;
        }
        if (!error) {
          if (result.AWSTemplateFormatVersion) {
            this.handleCFTemplate(result);
            return;
          } else {
            error = App.importJson(this.reader.result);
          }
        }
        if (_.isString(error)) {
          $("#import-json-error").html(error);
        } else {
          this.modal.close();
          this.reader = null;
        }
        return null;
      },
      onReaderError: function() {
        return $("#import-json-error").html(lang.IDE.POP_IMPORT_ERROR);
      },
      handleCFTemplate: function(cfJson) {
        var data, key, parameters, value, _ref;
        parameters = [];
        _ref = cfJson.Parameters;
        for (key in _ref) {
          value = _ref[key];
          value.Name = key;
          value.NoEcho = value.NoEcho === true;
          if (value.AllowedValues && !_.isArray(value.AllowedValues)) {
            value.AllowedValues = void 0;
          }
          if (value.Type === "AWS::EC2::KeyPair::KeyName") {
            this.hasKpParam = true;
          }
          value.__Constraint = "";
          if (value.AllowedValues) {
            value.__Constraint = "AllowedPattern: " + value.AllowedValues.join(",") + " ";
          }
          if (value.Type === "Number") {
            if (value.MinValue) {
              value.__Constraint += "MinValue: " + value.MinValue + " ";
            }
            if (value.MaxValue) {
              value.__Constraint += "MaxValue: " + value.MaxValue + " ";
            }
          } else if (value.Type === "String") {
            if (value.MinLength) {
              value.__Constraint += "MinLength: " + value.MinLength + " ";
            }
            if (value.MaxLength) {
              value.__Constraint += "MaxLength: " + value.MaxLength + " ";
            }
          }
          parameters.push(value);
        }
        this.parameters = parameters;
        this.cfJson = cfJson;
        data = {
          regions: constant.REGION_KEYS.slice(0),
          parameters: parameters
        };
        this.modal.setContent(tplPartials.importCFConfirm(data));
        this.modal.setWidth("570");
        this.modal.setTitle(lang.IDE.POP_IMPORT_CF_TIT);
        this.modal.tpl.find(".cf-params-wrap").nanoScroller();
        this.initInputs();
        this.onRegionChange();
      },
      onModalClose: function() {
        var ipt, select2, _i, _len, _ref;
        _ref = this.modal.tpl.find("#import-cf-params").children().find("input.cf-input");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ipt = _ref[_i];
          select2 = $(ipt).data("select2");
          if (select2) {
            $(ipt).select2("destroy");
          }
        }
      },
      initInputs: function() {
        var $inputs, av, avs, formatNoMatches, ipt, kpInitSelection, kpQuery, numberCreateSC, param, select2, select2Option, self, _i, _j, _len, _len1, _ref, _ref1;
        self = this;
        kpQuery = function(options) {
          var kp, kps, term, _i, _len, _ref;
          kps = [];
          term = options.term.toLowerCase();
          _ref = self.currentRegionKps;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            kp = _ref[_i];
            if (kp.toLowerCase().indexOf(term) >= 0) {
              kps.push({
                id: kp,
                text: kp
              });
            }
          }
          return options.callback({
            more: false,
            results: kps
          });
        };
        kpInitSelection = function(element, callback) {
          var def;
          def = element.select2("val");
          return callback({
            id: def,
            text: def
          });
        };
        numberCreateSC = function(term) {
          if (isNaN(Number(term))) {
            return;
          }
          return {
            id: term,
            text: term
          };
        };
        formatNoMatches = function() {
          return "Invalid input";
        };
        $inputs = $("#import-cf-params").children();
        _ref = this.parameters;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          param = _ref[_i];
          if (param.NoEcho) {
            continue;
          }
          select2 = false;
          ipt = $inputs.filter("[data-name='" + param.Name + "']").find("input");
          select2Option = {
            allowClear: true,
            data: [],
            formatNoMatches: formatNoMatches
          };
          if (param.Type === "CommaDelimitedList" || param.Type === "List<Number>") {
            select2 = true;
            select2Option.multiple = true;
            select2Option.allowDuplicate = true;
            if (!param.AllowedValues) {
              select2Option.tags = [];
              select2Option.data = void 0;
              select2Option.tokenSeparators = [","];
            }
          }
          if (param.Type === "List<Number>") {
            select2Option.createSearchChoice = numberCreateSC;
          }
          if (param.Type === "AWS::EC2::KeyPair::KeyName") {
            select2 = true;
            select2Option.query = kpQuery;
            select2Option.initSelection = kpInitSelection;
          }
          if (param.AllowedValues) {
            select2 = true;
            avs = [];
            _ref1 = param.AllowedValues;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              av = _ref1[_j];
              avs.push({
                id: "" + av,
                text: "" + av
              });
            }
            select2Option.data = avs;
            select2Option.selectOnComma = true;
          }
          if (select2) {
            ipt.select2(select2Option);
          }
        }
      },
      onRegionChange: function() {
        var currentRegion, self;
        if (!this.hasKpParam) {
          return;
        }
        currentRegion = $("#import-cf-region").find(".selected").attr("data-id");
        if (!this.regionForceFetchMap[currentRegion]) {
          this.regionForceFetchMap[currentRegion] = true;
          CloudResources(constant.RESTYPE.KP, currentRegion).fetchForce();
        }
        self = this;
        $("#import-cf-form .loader").show();
        CloudResources(constant.RESTYPE.KP, currentRegion).fetch().then(function() {
          var $inputs, $ipt, param, _i, _len, _ref;
          $("#import-cf-form .loader").hide();
          self.currentRegionKps = CloudResources(constant.RESTYPE.KP, currentRegion).pluck("id");
          $inputs = $("#import-cf-params").children();
          _ref = self.parameters;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            param = _ref[_i];
            if (param.Type === "AWS::EC2::KeyPair::KeyName") {
              $ipt = $inputs.filter("[data-name='" + param.Name + "']").find("input.cf-input");
              $ipt.select2("val", $ipt.select2("val") || param.Default);
            }
          }
        });
      },
      extractUserInput: function($li) {
        var $input, AllowedPattern, allowed, av, idx, name, param, type, v, value, valueArray, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
        type = $li.attr("data-type");
        $input = $li.find("input.cf-input");
        if ($input.siblings(".select2-container").length) {
          value = $input.select2("val");
        } else {
          value = $li.find("input.cf-input").val();
        }
        name = $li.attr("data-name");
        param = this.cfJson.Parameters[name];
        if (!value) {
          return false;
        }
        if (type === "Number" || type === "String") {
          valueArray = [value];
        } else {
          if (_.isArray(value)) {
            valueArray = value;
          } else {
            valueArray = value.split(",");
          }
        }
        if (type === "Number" || type === "List<Number>") {
          for (idx = _i = 0, _len = valueArray.length; _i < _len; idx = ++_i) {
            v = valueArray[idx];
            v = Number(v);
            if (isNaN(v)) {
              return false;
            }
            if (param.MinValue && Number(param.MinValue) > v) {
              return false;
            }
            if (param.MaxValue && Number(param.MaxValue) < v) {
              return false;
            }
            valueArray[idx] = v;
          }
        } else if (type === "String" || type === "CommaDelimitedList") {
          if (param.AllowedPattern) {
            AllowedPattern = new RegExp(param.AllowedPattern);
          }
          for (idx = _j = 0, _len1 = valueArray.length; _j < _len1; idx = ++_j) {
            v = valueArray[idx];
            if (param.MinLength && Number(param.MinLength) > v.length) {
              return false;
            }
            if (param.MaxLength && Number(param.MaxLength) < v.length) {
              return false;
            }
            if (AllowedPattern && !AllowedPattern.test(v)) {
              return false;
            }
          }
        }
        if (param.AllowedValues) {
          for (_k = 0, _len2 = valueArray.length; _k < _len2; _k++) {
            v = valueArray[_k];
            _ref = param.AllowedValues || [];
            for (_l = 0, _len3 = _ref.length; _l < _len3; _l++) {
              av = _ref[_l];
              if ("" + av === "" + v) {
                allowed = true;
                break;
              }
            }
            if (!allowed) {
              return false;
            }
          }
        }
        if (param.Type === "AWS::EC2::KeyPair::KeyName") {
          if (this.currentRegionKps.indexOf(value) < 0) {
            return false;
          }
        }
        if (type === "String" || type === "Number") {
          value = valueArray[0];
        } else if (type === "List<Number>" || type === "CommaDelimitedList") {
          value = valueArray.join(",");
        }
        return {
          name: name,
          value: value
        };
      },
      checkCFParameter: function() {
        var $entries, $li, error, li, result, _i, _len;
        $entries = this.modal.tpl.find(".cf-params").children();
        error = false;
        for (_i = 0, _len = $entries.length; _i < _len; _i++) {
          li = $entries[_i];
          $li = $(li);
          result = this.extractUserInput($li);
          if (!result) {
            error = true;
            $li.toggleClass("error", true);
          } else {
            this.cfJson.Parameters[result.name].Default = result.value;
            $li.toggleClass("error", false);
          }
        }
        return !error;
      },
      doImport: function() {
        var region, self;
        if (!this.checkCFParameter()) {
          this.modal.tpl.find(".param-error").show();
          return;
        }
        self = this;
        this.modal.tpl.find(".loading-spinner").show();
        this.modal.tpl.closest(".modal-box").find(".modal-close").hide();
        $("#import-cf-form").hide();
        region = $("#import-cf-region").find(".selected").attr("data-id");
        return CloudResources(constant.RESTYPE.AZ, region).fetch().then(function() {
          return ApiRequest("stack_import_cloudformation", {
            region_name: $("#import-cf-region").find(".selected").attr("data-id"),
            cf_template: self.cfJson,
            parameters: {
              az: _.pluck(CloudResources(constant.RESTYPE.AZ, region).where({
                category: region
              }), "id")
            }
          }).then(function(data) {
            self.modal.close();
            data.provider = "aws::global";
            return App.importJson(data, true);
          }, function() {
            self.modal.close();
            notification('error', sprintf(lang.IDE.POP_IMPORT_CFM_ERROR));
          });
        });
      },
      cancelImport: function() {
        return this.modal.close();
      },
      onFocusInput: function(evt) {
        return $(evt.currentTarget).closest("li").removeClass("error");
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/dashboard/DashboardView',['./DashboardTpl', './DashboardTplData', './VisualizeVpcTpl', "UI.modalplus", "constant", "i18n!/nls/lang.js", 'AppAction', "CloudResources", "ApiRequest", "./ImportDialog", "backbone", "UI.scrollbar", "UI.tooltip", "UI.table", "UI.bubble", "UI.nanoscroller"], function(template, tplPartials, VisualizeVpcTpl, Modal, constant, lang, appAction, CloudResources, ApiRequest, ImportDialog) {
    Handlebars.registerHelper("awsAmiIcon", function(amiId, region) {
      var ami;
      ami = CloudResources(constant.RESTYPE.AMI, region).get(amiId);
      if (ami) {
        ami = ami.attributes;
        return ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
      } else {
        return "empty.png";
      }
    });
    Handlebars.registerHelper("awsIsEip", function(ip, region, options) {
      var eip, _i, _len, _ref;
      if (!ip) {
        return "";
      }
      _ref = CloudResources(constant.RESTYPE.EIP, region).models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        eip = _ref[_i];
        if (eip.get("publicIp") === ip) {
          return options.fn(this);
        }
      }
      return "";
    });
    return Backbone.View.extend({
      events: {
        "click .global-map-item": "gotoRegionFromMap",
        "click .global-map-item .app": "gotoRegionFromMap",
        'click .recent-list-item, .region-resource-list li': 'openItem',
        'click .table-app-link': 'openItem',
        'click #global-region-create-stack-list li, #btn-create-stack': 'createStack',
        "click .region-resource-list .delete-stack": "deleteStack",
        'click .region-resource-list .duplicate-stack': 'duplicateStack',
        "click .region-resource-list .start-app": "startApp",
        'click .region-resource-list .stop-app': 'stopApp',
        'click .region-resource-list .terminate-app': 'terminateApp',
        'click .global-region-status-tab': 'switchRecent',
        'click #region-switch-list li': 'switchRegion',
        'click #region-resource-tab li': 'switchAppStack',
        'click .resource-tab': 'switchResource',
        "click .global-resource-li": "gotoRegionResource",
        'click #VisualizeVPC': 'visualizeVPC',
        'click .show-credential': 'showCredential',
        'click #RefreshResource': 'reloadResource',
        "click .icon-detail": "showResourceDetail",
        "mouseenter .hovermenu": "showMenu",
        "mouseleave .hovermenu": "hideMenu",
        'click #ImportStack li': 'importJson'
      },
      showMenu: function(evt) {
        return $(evt.currentTarget).children(".dropdown-menu").show();
      },
      hideMenu: function(evt) {
        return $(evt.currentTarget).children(".dropdown-menu").hide();
      },
      initialize: function() {
        var data, self;
        this.regionOpsTab = "stack";
        this.region = "global";
        this.resourcesTab = "INSTANCE";
        this.lastUpdate = +(new Date());
        data = _.map(constant.REGION_LABEL, function(name, id) {
          return {
            id: id,
            name: name,
            shortName: constant.REGION_SHORT_LABEL[id]
          };
        });
        this.setElement($(template(data)).eq(0).appendTo("#main"));
        this.updateOpsList();
        this.updateDemoView();
        this.updateGlobalResources();
        self = this;
        setInterval(function() {
          if (!$("#RefreshResource").hasClass("reloading")) {
            $("#RefreshResource").text(MC.intervalDate(self.lastUpdate / 1000));
          }
        }, 1000 * 60);
        MC.template.dashboardBubble = _.bind(this.dashboardBubble, this);
        MC.template.dashboardBubbleSub = _.bind(this.dashboardBubbleSub, this);
      },
      awake: function() {
        this.$el.show().children("#global-region-wrap").nanoScroller();
      },
      sleep: function() {
        return this.$el.hide();
      },
      dashboardBubbleSub: function(data) {
        var formattedData, renderData;
        renderData = {};
        formattedData = {};
        _.each(data, function(value, key) {
          var newKey;
          newKey = lang.IDE["BUBBLE_" + key.toUpperCase().split("-").join("_")] || key;
          return formattedData[newKey] = value;
        });
        renderData.data = formattedData;
        renderData.title = data.id || data.name || data._title;
        delete renderData.data._title;
        return tplPartials.bubbleResourceSub(renderData);
      },
      dashboardBubble: function(data) {
        var d, formattedData, resourceData, _ref;
        resourceData = (_ref = this.model.getAwsResDataById(this.region, constant.RESTYPE[data.type], data.id)) != null ? _ref.toJSON() : void 0;
        formattedData = {};
        _.each(resourceData, function(value, key) {
          var newKey;
          newKey = lang.IDE["BUBBLE_" + key.toUpperCase().split("-").join("_")] || key;
          return formattedData[newKey] = value;
        });
        d = {
          id: data.id,
          data: formattedData
        };
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
        return tplPartials.bubbleResourceInfo(d);
      },

      /*
        rendering
       */
      updateOpsList: function() {
        var $tabs, apps, isStack, r, regionsMap, stacks, _i, _j, _len, _len1, _ref, _ref1;
        regionsMap = {};
        _ref = App.model.stackList().groupByRegion();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          regionsMap[r.region] = r;
          r.stack = r.data.length;
          r.app = 0;
        }
        _ref1 = App.model.appList().groupByRegion();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          r = _ref1[_j];
          if (!regionsMap[r.region]) {
            regionsMap[r.region] = r;
            r.stack = 0;
          }
          regionsMap[r.region].app = r.data.length;
        }
        $("#global-region-spot").html(tplPartials.globalMap(regionsMap));
        stacks = App.model.stackList().filterRecent(true);
        apps = App.model.appList().filterRecent(true);
        if (stacks.length > 5) {
          stacks.length = 5;
        }
        if (apps.length > 5) {
          apps.length = 5;
        }
        $tabs = $("#global-region-status-widget").find(".global-region-status-tab");
        $tabs.eq(0).children("span").text(App.model.appList().length);
        $tabs.eq(1).children("span").text(App.model.stackList().length);
        isStack = $tabs.filter(".on").hasClass("stack");
        $('#global-region-recent-list').html(tplPartials.recent({
          stacks: stacks,
          apps: apps,
          isStack: isStack
        }));
        this.updateRegionAppStack();
      },
      updateRegionList: function(model) {
        console.log("Dashboard Updated due to state changes in app list.");
        if (!model || model.get("region") === this.region) {
          return this.updateRegionAppStack();
        }
      },
      updateAppProgress: function(model) {
        var $li;
        if (model.get("region") === this.region && this.regionOpsTab === "app") {
          console.log("Dashboard Updated due to app progress changes.");
          $li = $("#region-resource-app-wrap").children("[data-id='" + model.id + "']");
          if (!$li.length) {
            return;
          }
          $li.children(".region-resource-progess").show().css({
            width: model.get("progress") + "%"
          });
        }
      },
      updateRegionAppStack: function() {
        var attr, filter, region, tojson;
        attr = {
          apps: [],
          stacks: [],
          region: this.region
        };
        attr[this.regionOpsTab] = true;
        region = this.region;
        if (region !== "global") {
          filter = function(f) {
            return f.get("region") === region && f.isExisting();
          };
          tojson = {
            thumbnail: true
          };
          attr.stacks = App.model.stackList().filter(filter).map(function(m) {
            return m.toJSON(tojson);
          });
          attr.apps = App.model.appList().filter(filter).map(function(m) {
            return m.toJSON(tojson);
          });
        }
        $('#region-app-stack-wrap').html(tplPartials.region_app_stack(attr));
      },

      /*
        View logics
       */
      gotoRegionResource: function(evt) {
        var type;
        this.gotoRegionFromMap(evt);
        type = $(evt.currentTarget).parent().parent().attr("data-type");
        $("#RegionResourceNav").children("[data-type='" + type + "']").click();
        return false;
      },
      gotoRegionFromMap: function(evt) {
        var $li, $tgt, region;
        $tgt = $(evt.currentTarget);
        $li = $(evt.currentTarget).closest("li");
        region = $li.attr("id") || $li.attr("data-region");
        $("#region-switch-list li[data-region=" + region + "]").click();
        $("#global-region-wrap").nanoScroller({
          scrollTop: $('#global-region-map-wrap').height()
        });
        $("#region-resource-tab").children().eq($tgt.hasClass("app") ? 0 : 1).click();
        return false;
      },
      switchRecent: function(evt) {
        var $tgt;
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("on")) {
          return;
        }
        $tgt.addClass("on").siblings().removeClass("on");
        return $("#global-region-recent-list").children().hide().eq($tgt.index()).show();
      },
      switchRegion: function(evt) {
        var region, resetScroller, target;
        target = $(evt.currentTarget);
        region = target.attr('data-region');
        if (this.region === region) {
          return;
        }
        if (this.region === "global" || region === "global") {
          resetScroller = true;
        }
        this.region = region;
        $('#region-switch').find('span').text(target.text());
        if (region === "global") {
          $("#RegionView").hide();
          $("#GlobalView").show();
        } else {
          this.model.fetchAwsResources(region);
          $("#RegionView").show();
          $("#GlobalView").hide();
          this.updateRegionAppStack();
          this.updateRegionResources();
        }
        if (resetScroller) {
          $("#global-region-wrap").nanoScroller("reset");
        }
      },
      switchAppStack: function(evt) {
        var $target;
        $target = $(evt.currentTarget);
        if ($target.hasClass("on")) {
          return;
        }
        $target.addClass("on").siblings().removeClass("on");
        this.regionOpsTab = $target.hasClass("stack") ? "stack" : "app";
        $("#RegionView").find(".region-resource-list").hide().eq($target.index()).show();
      },
      switchResource: function(evt) {
        $("#RegionResourceNav").children().removeClass("on");
        this.resourcesTab = $(evt.currentTarget).addClass("on").attr("data-type");
        this.updateRegionResources();
      },
      importJson: function(evt) {
        return new ImportDialog({
          type: $(evt.currentTarget).attr("data-type")
        });
      },
      openItem: function(event) {
        return App.openOps($(event.currentTarget).attr("data-id"));
      },
      createStack: function(event) {
        var $tgt;
        $tgt = $(event.currentTarget);
        return App.createOps($tgt.attr("data-region") || this.region, $tgt.attr("data-provider"));
      },
      markUpdated: function() {
        this.lastUpdate = +(new Date());
      },
      reloadResource: function() {
        if ($("#RefreshResource").hasClass("reloading")) {
          return;
        }
        $("#RefreshResource").addClass("reloading").text("");
        this.model.clearVisualizeData();
        App.discardAwsCache().done(function() {
          return $("#RefreshResource").removeClass("reloading").text(lang.IDE.DASH_TPL_JUST_NOW);
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
      updateVisModel: function() {
        if (!this.visModal) {
          return;
        }
        this.visModal.tpl.find(".modal-body").html(VisualizeVpcTpl({
          ready: this.model.isVisualizeReady(),
          fail: this.model.isVisualizeTimeout() || this.model.isVisualizeFailed(),
          data: this.model.get("visualizeData")
        }));
      },
      visualizeVPC: function() {
        var that;
        that = this;
        return appAction.showPayment().then(function(data) {
          return that.__visualizeVPC(data.modal);
        });
      },
      __visualizeVPC: function(modal) {
        var TO, attributes, self;
        this.model.visualizeVpc();
        attributes = {
          ready: this.model.isVisualizeReady(),
          fail: this.model.isVisualizeTimeout() || this.model.isVisualizeFailed(),
          data: this.model.get("visualizeData")
        };
        self = this;
        TO = setTimeout(function() {
          return self.updateVisModel();
        }, 60 * 8 * 1000 + 1000);
        if (modal) {
          this.visModal = modal;
          this.visModal.setTitle(lang.IDE.DASH_IMPORT_VPC_AS_APP).setContent(VisualizeVpcTpl(attributes)).setWidth('770px').compact().resize().on('close', function() {
            self.visModal = null;
            clearTimeout(TO);
          });
        } else {
          this.visModal = new Modal({
            title: lang.IDE.DASH_IMPORT_VPC_AS_APP,
            width: "770",
            template: VisualizeVpcTpl(attributes),
            disableFooter: true,
            compact: true,
            onClose: function() {
              self.visModal = null;
              clearTimeout(TO);
            }
          });
        }
        this.visModal.tpl.on("click", "#VisualizeReload", function() {
          self.model.visualizeVpc(true);
          self.visModal.tpl.find(".unmanaged-vpc-empty").hide();
          self.visModal.tpl.find(".loading-spinner").show();
          return false;
        });
        this.visModal.tpl.on("click", ".visualize-vpc-btn", function(event) {
          var $tgt, id, region;
          if ($(event.currentTarget).hasClass('disabled')) {
            return false;
          }
          $tgt = $(this);
          if ($tgt.hasClass(".disabled")) {
            return false;
          }
          id = $tgt.attr("data-vpcid");
          region = $tgt.closest("ul").attr("data-region");
          self.visModal.close();
          App.openOps(App.model.createImportOps(region, "aws::global", id));
          return false;
        });
      },
      updateDemoView: function() {
        if (App.user.hasCredential()) {
          $("#dashboard-data-wrap").removeClass("demo");
          $("#VisualizeVPC").removeAttr("disabled");
        } else {
          $("#VisualizeVPC").attr("disabled", "disabled");
          $("#dashboard-data-wrap").toggleClass("demo", true);
        }
      },
      showCredential: function() {
        return App.showSettings(App.showSettings.TAB.Credential);
      },
      updateGlobalResources: function() {
        var data;
        if (!this.model.isAwsResReady()) {
          if (this.__globalLoading) {
            return;
          }
          this.__globalLoading = true;
          data = {
            loading: true
          };
        } else {
          this.__globalLoading = false;
          data = this.model.getAwsResData();
        }
        $("#GlobalView").html(tplPartials.globalResources(data));
        if (this.region === "global") {
          $("#GlobalView").show();
        }
      },
      updateRegionTabCount: function() {
        var $nav, count, r, resourceCount;
        resourceCount = this.model.getResourcesCount(this.region);
        $nav = $("#RegionResourceNav");
        for (r in resourceCount) {
          count = resourceCount[r];
          $nav.children("." + r).children(".count-bubble").text(count === "" ? "-" : count);
        }
      },
      updateRegionResources: function() {
        var tpl, type;
        if (this.region === "global") {
          return;
        }
        this.updateRegionTabCount();
        type = constant.RESTYPE[this.resourcesTab];
        if (!this.model.isAwsResReady(this.region, type)) {
          tpl = '<div class="dashboard-loading"><div class="loading-spinner"></div></div>';
        } else {
          tpl = tplPartials["resource" + this.resourcesTab](this.model.getAwsResData(this.region, type));
        }
        return $("#RegionResourceData").html(tpl);
      },
      formateDetail: function(type, data) {
        var json, result, _ref, _ref1, _ref2;
        switch (type) {
          case "SUBSCRIPTION":
            return {
              DASH_LBL_TITLE: data.Endpoint,
              DASH_LBL_ENDPOINT: data.Endpoint,
              DASH_LBL_OWNER: data.Owner,
              DASH_LBL_PROTOCOL: data.Protocol,
              DASH_LBL_SUBSCRIPTION_ARN: data.SubscriptionArn,
              DASH_LBL_TOPIC_ARN: data.TopicArn
            };
          case "VPC":
            return {
              DASH_LBL_STATE: data.state,
              DASH_LBL_CIDR: data.cidrBlock,
              DASH_LBL_TENANCY: data.instanceTenancy
            };
          case "ASG":
            return {
              DASH_LBL_TITLE: data.Name,
              DASH_BUB_NAME: data.Name,
              DASH_LBL_AVAILABILITY_ZONE: data.AvailabilityZones.join(", "),
              DASH_LBL_CREATE_TIME: data.CreatedTime,
              DASH_LBL_DEFAULT_COOLDOWN: data.DefaultCooldown,
              DASH_LBL_DESIRED_CAPACITY: data.DesiredCapacity,
              DASH_LBL_MAX_SIZE: data.MaxSize,
              DASH_LBL_MIN_SIZE: data.MinSize,
              DASH_LBL_HEALTH_CHECK_GRACE_PERIOD: data.HealthCheckGracePeriod,
              DASH_LBL_HEALTH_CHECK_TYPE: data.HealthCheckType,
              DASH_LBL_LAUNCH_CONFIGURATION_NAME: data.LaunchConfigurationName,
              DASH_LBL_TERMINATION_POLICIES: data.TerminationPolicies.join(", "),
              DASH_LBL_AUTOSCALING_GROUP_ARN: data.id
            };
          case "ELB":
            return {
              DASH_LBL_AVAILABILITY_ZONE: data.AvailabilityZones.join(", "),
              DASH_LBL_CREATE_TIME: data.CreatedTime,
              DASH_LBL_DNS_NAME: data.DNSName,
              DASH_LBL_HEALTH_CHECK: this.formartDetail('HealthCheck', [data.HealthCheck], "Health Check", true),
              DASH_LBL_INSTANCE: data.Instances.join(", "),
              DASH_LBL_LISTENER_DESC: this.formartDetail('ListenerDescriptions', _.pluck(data.ListenerDescriptions.member, "Listener"), "Listener Descriptions", true),
              DASH_LBL_SECURITY_GROUPS: data.SecurityGroups.join(", "),
              DASH_LBL_SUBNETS: data.Subnets.join(", ")
            };
          case "VPN":
            return {
              DASH_LBL_STATE: data.state,
              DASH_LBL_VGW_ID: data.vpnGatewayId,
              DASH_LBL_CGW_ID: data.customerGatewayId,
              DASH_LBL_TYPE: data.type
            };
          case "VOL":
            return {
              DASH_LBL_VOLUME_ID: data.id,
              DASH_LBL_DEVICE_NAME: data.device,
              DASH_LBL_SNAPSHOT_ID: data.snapshotId,
              DASH_LBL_VOLUME_SIZE: data.size,
              DASH_LBL_STATUS: data.status,
              DASH_LBL_INSTANCE_ID: data.instanceId,
              DASH_LBL_DELETE_ON_TERM: data.deleteOnTermination,
              DASH_LBL_AVAILABILITY_ZONE: data.availabilityZone,
              DASH_LBL_VOLUME_TYPE: data.volumeType,
              DASH_LBL_CREATE_TIME: data.createTime,
              DASH_LBL_ATTACH_TIME: data.attachTime
            };
          case "INSTANCE":
            return {
              DASH_LBL_STATUS: data.instanceState.name,
              DASH_LBL_MONITORING: data.monitoring.state,
              DASH_LBL_PRIMARY_PRIVATE_IP: data.privateIpAddress,
              DASH_LBL_PRIVATE_DNS: data.privateDnsName,
              DASH_LBL_LAUNCH_TIME: data.launchTime,
              DASH_LBL_AVAILABILITY_ZONE: data.placement.availabilityZone,
              DASH_LBL_AMI_LAUNCH_INDEX: data.amiLaunchIndex,
              DASH_LBL_INSTANCE_TYPE: data.instanceType,
              DASH_LBL_BLOCK_DEVICE_TYPE: data.rootDeviceType,
              DASH_LBL_BLOCK_DEVICES: data.blockDeviceMapping ? this.formartDetail("BlockDevice", data.blockDeviceMapping, "deviceName") : null,
              DASH_LBL_NETWORK_INTERFACE: data.networkInterfaceSet ? this.formartDetail("ENI", data.networkInterfaceSet, "networkInterfaceId") : null
            };
          case 'EIP':
            result = {
              DASH_LBL_PUBLIC_IP: data.publicIp,
              DASH_LBL_DOMAIN: data.domain,
              DASH_LBL_ALLOCATION_ID: data.id,
              DASH_LBL_CATEGORY: data.category,
              DASH_LBL_TITLE: data.publicIp
            };
            if (data.associationId) {
              result.DASH_LBL_ASSOCIATION_ID = data.associationId;
            }
            if (data.networkInterfaceId) {
              result.DASH_LBL_NETWORK_INTERFACE_ID = data.networkInterfaceId;
            }
            if (data.instanceId) {
              result.DASH_LBL_INSTANCE_ID = data.instanceId;
            }
            if (data.privateIpAddresse) {
              result.DASH_LBL_PRIVATE_IP_ADDRESS = data.privateIpAddresses;
            }
            return result;
          case 'CW':
            return {
              DASH_LBL_ALARM_NAME: data.Name,
              DASH_LBL_COMPARISON_OPERATOR: data.ComparisonOperator,
              DASH_LBL_DIMENSIONS: this.formartDetail('Dimensions', data.Dimensions, 'Dimensions', true),
              DASH_LBL_EVALUATION_PERIODS: data.EvaluationPeriods,
              DASH_LBL_INSUFFICIENT_DATA_ACTIONS: data.InsufficientDataActions,
              DASH_LBL_METRIC_NAME: data.MetricName,
              DASH_LBL_NAMESPACE: data.Namespace,
              DASH_LBL_OK_ACTIONS: data.OKActions,
              DASH_LBL_PERIOD: data.Period,
              DASH_LBL_STATE_REGION: data.StateReason,
              DASH_LBL_STATE_UPDATED_TIMESTAMP: data.StateUpdatedTimestamp,
              DASH_LBL_STATE_VALUE: data.StateValue,
              DASH_LBL_STATISTIC: data.Statistic,
              DASH_LBL_THRESHOLD: data.Threshold,
              DASH_LBL_CATEGORY: data.category,
              DASH_LBL_TITLE: data.Name,
              DASH_LBL_ACTIONS_ENABLED: data.ActionsEnabled ? "true" : 'false',
              DASH_LBL_ALARM_ACTIONS: data.AlarmActions.member,
              DASH_LBL_ALARM_ARN: data.id
            };
          case "DBINSTANCE":
            json = {
              DASH_LBL_STATUS: data.DBInstanceStatus,
              DASH_LBL_ENDPOINT: data.Endpoint.Address + "" + data.Endpoint.Port,
              DASH_LBL_ENGINE: data.Engine,
              DASH_LBL_DB_NAME: data.name || data.Name || data.DBName || "None",
              DASH_LBL_OPTION_GROUP: ((_ref = data.OptionGroupMemberships) != null ? (_ref1 = _ref.OptionGroupMembership) != null ? _ref1.OptionGroupName : void 0 : void 0) || "None",
              DASH_LBL_PARAMETER_GROUP: ((_ref2 = data.DBParameterGroups) != null ? _ref2.DBParameterGroupName : void 0) || "None",
              DASH_LBL_AVAILABILITY_ZONE: data.AvailabilityZone,
              DASH_LBL_SUBNET_GROUP: data.sbgId || "None",
              DASH_LBL_PUBLICLY_ACCESSIBLE: data.PubliclyAccessible.toString(),
              DASH_LBL_IOPS: data.Iops || "OFF",
              DASH_LBL_MULTI_AZ: data.MultiAZ.toString(),
              DASH_LBL_AUTOMATED_BACKUP: data.AutoMinorVersionUpgrade,
              DASH_LBL_LATEST_RESTORE_TIME: data.LatestRestorableTime,
              DASH_LBL_AUTO_MINOR_VERSION_UPGRADE: data.AutoMinorVersionUpgrade,
              DASH_LBL_MAINTENANCE_WINDOW: data.PreferredMaintenanceWindow,
              DASH_LBL_BACKUP_WINDOW: data.PreferredBackupWindow
            };
            return json;
        }
      },
      formartDetail: function(type, array, key, force) {
        var result;
        if ((['BlockDevice', "AttachmentSet", "HealthCheck", "ListenerDescriptions", 'Dimensions', 'ENI'].indexOf(type)) > -1) {
          _.map(array, function(blockDevice, index) {
            _.map(blockDevice, function(e, key) {
              if (key === "ebs") {
                _.extend(blockDevice, e);
              }
              if (_.isObject(e)) {
                return delete blockDevice[key];
              }
            });
            return _.map(blockDevice, function(e, key) {
              if (_.isBoolean(e)) {
                blockDevice[key] = e.toString();
                return null;
              }
            });
          });
          _.map(array, function(data) {
            if (force) {
              data._title = key;
            } else {
              data._title = data[key];
            }
            data.bubble = {
              value: force ? key : data[key],
              data: JSON.stringify(data),
              template: "dashboardBubbleSub"
            };
            return data;
          });
          array.bubble = true;
          return array;
        } else {
          result = _.map(array, function(i) {
            i.bubble = {};
            i.bubble.value = i[key];
            i.bubble.data = JSON.stringify({
              type: type,
              id: i[key]
            });
            return i;
          });
          result.bubble = true;
          return result;
        }
      },
      showResourceDetail: function(evt) {
        var $tgt, formatedData, id, resModel, type;
        $tgt = $(evt.currentTarget);
        id = $tgt.attr("data-id");
        type = constant.RESTYPE[this.resourcesTab];
        resModel = this.model.getResourceData(this.region, type, id);
        formatedData = this.formateDetail(this.resourcesTab, resModel.attributes);
        if (formatedData.title) {
          id = formatedData.title;
          delete formatedData.title;
        }
        new Modal({
          title: id,
          width: "450",
          template: tplPartials.resourceDetail(formatedData),
          disableFooter: true
        });
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/dashboard/DashboardModel',["ApiRequest", "CloudResources", "constant", "backbone"], function(ApiRequest, CloudResources, constant) {
    var VisualizeVpcParams;
    VisualizeVpcParams = {
      'AWS.VPC.VPC': {},
      'AWS.VPC.Subnet': {},
      'AWS.EC2.Instance': {
        'filter': {
          'instance-state-name': ['pending', 'running', 'stopping', 'stopped']
        }
      },
      'AWS.VPC.NetworkInterface': {},
      'AWS.ELB': {}
    };

    /*
      Dashboard Model
     */
    return Backbone.Model.extend({
      defaults: {
        visualizeData: []
      },
      initialize: function() {
        var region, _i, _len, _ref, _results;
        this.listenTo(App.WS, "visualizeUpdate", this.onVisualizeUpdated);
        this.listenTo(CloudResources(constant.RESTYPE.INSTANCE), "update", this.onGlobalResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.EIP), "update", this.onGlobalResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.VOL), "update", this.onGlobalResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.ELB), "update", this.onGlobalResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.VPN), "update", this.onGlobalResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.VPC), "update", this.onRegionResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.ASG), "update", this.onRegionResChanged);
        this.listenTo(CloudResources(constant.RESTYPE.CW), "update", this.onRegionResChanged);
        _ref = constant.REGION_KEYS;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          region = _ref[_i];
          this.listenTo(CloudResources(constant.RESTYPE.SUBSCRIPTION, region), "update", this.onRegionResChanged);
          _results.push(this.listenTo(CloudResources(constant.RESTYPE.DBINSTANCE, region), "update", this.onGlobalResChanged));
        }
        return _results;
      },

      /* Visualize */
      visualizeTimestamp: function() {
        return this.__visRequestTime;
      },
      clearVisualizeData: function() {
        this.set("visualizeData", []);
        this.__visRequest = null;
      },
      visualizeVpc: function(force) {
        var self;
        if (force) {
          this.__visRequest = null;
        }
        if (this.__visRequest) {
          return;
        }
        this.__isVisReady = false;
        this.__visRequest = true;
        this.__visRequestTime = +(new Date());
        self = this;
        ApiRequest("aws_resource", {
          region_name: null,
          resources: VisualizeVpcParams,
          addition: "statistic",
          retry_times: 1
        }).fail(function(error) {
          self.__visRequest = false;
          self.__isVisReady = true;
          self.__isVisFail = true;
          self.set("visualizeData", []);
        });
      },
      onVisualizeUpdated: function(result) {
        var data, self;
        if (!this.__visRequest) {
          return;
        }
        this.__isVisReady = true;
        this.__isVisFail = false;
        this.attributes.visualizeData = null;
        self = this;
        data = self.parseVisData(result);
        self.set("visualizeData", data);
      },
      isVisualizeReady: function() {
        return !!this.__isVisReady;
      },
      isVisualizeFailed: function() {
        return !!this.__isVisFail;
      },
      isVisualizeTimeout: function() {
        if (this.__visRequestTime - (new Date()) > 60 * 10 * 1000) {
          this.__visVpcDefer = null;
          return true;
        }
        return false;
      },
      parseVisData: function(data) {
        var e, instanceMap, obj, region, regions, resourceMap, resources, t, tags, vpc, vpcMap, vpcs, _i, _len, _ref;
        delete data._id;
        delete data.username;
        delete data.timestamp;
        resourceMap = function(res) {
          return _.keys(res || {});
        };
        instanceMap = function(res, stopped) {
          var ami, id, instances, state, _ref, _ref1;
          instances = [];
          _ref = res || {};
          for (id in _ref) {
            ami = _ref[id];
            state = ((_ref1 = ami.instanceState) != null ? _ref1.name : void 0) || "";
            if (stopped) {
              if (state === "stopped" || state === "stopping") {
                instances.push(id);
              }
            } else {
              if (state === "running" || state === "pending") {
                instances.push(id);
              }
            }
          }
          return instances;
        };
        regions = [];
        for (region in data) {
          vpcMap = data[region];
          vpcs = [];
          regions.push({
            id: region,
            name: constant.REGION_SHORT_LABEL[region],
            subname: constant.REGION_LABEL[region],
            vpcs: vpcs
          });
          for (vpc in vpcMap) {
            resources = vpcMap[vpc];
            try {
              tags = {};
              if (resources.Tag && resources.Tag.item) {
                if (resources.Tag.item.length) {
                  _ref = resources.Tag.item;
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    t = _ref[_i];
                    tags[t.key] = t.value;
                  }
                } else {
                  tags[resources.Tag.item.key] = resources.Tag.item.value;
                }
              }
              obj = {
                id: vpc,
                name: tags.Name || tags.name,
                subnet: resourceMap(resources["AWS|VPC|Subnet"]),
                ami: instanceMap(resources["AWS|EC2|Instance"]),
                stopped: instanceMap(resources["AWS|EC2|Instance"], true),
                eni: resourceMap(resources["AWS|VPC|NetworkInterface"]),
                eip: resourceMap(resources["AWS|EC2|EIP"]),
                elb: resourceMap(resources["AWS|ELB"]),
                username: resources['username'] ? Base64.decode(resources['username']) : void 0
              };
              obj.disabled = obj.eni.length > 300;
              vpcs.push(obj);
            } catch (_error) {
              e = _error;
            }
          }
        }
        return regions;
      },

      /* Cloud Resources */
      onRegionResChanged: function() {
        return this.trigger("change:regionResources");
      },
      onGlobalResChanged: function() {
        this.trigger("change:globalResources");
        return this.trigger("change:regionResources");
      },
      fetchAwsResources: function(region) {
        if (!region) {
          CloudResources(constant.RESTYPE.INSTANCE).fetch();
          CloudResources(constant.RESTYPE.EIP).fetch();
          CloudResources(constant.RESTYPE.VOL).fetch();
          CloudResources(constant.RESTYPE.ELB).fetch();
          CloudResources(constant.RESTYPE.VPN).fetch();
          _.each(constant.REGION_KEYS, function(e) {
            return CloudResources(constant.RESTYPE.DBINSTANCE, e).fetch();
          });
          return;
        }
        CloudResources(constant.RESTYPE.SUBSCRIPTION, region).fetch();
        CloudResources(constant.RESTYPE.VPC).fetch();
        CloudResources(constant.RESTYPE.DHCP, region).fetch();
        CloudResources(constant.RESTYPE.ASG).fetch();
        CloudResources(constant.RESTYPE.CW).fetch();
        CloudResources(constant.RESTYPE.ENI, region).fetch();
        CloudResources(constant.RESTYPE.CGW, region).fetch();
        CloudResources(constant.RESTYPE.VGW, region).fetch();
      },
      isAwsResReady: function(region, type) {
        var datasource, e, globalReady, i, _i, _j, _len, _len1, _ref;
        if (!region) {
          globalReady = true;
          datasource = [CloudResources(constant.RESTYPE.INSTANCE), CloudResources(constant.RESTYPE.EIP), CloudResources(constant.RESTYPE.VOL), CloudResources(constant.RESTYPE.ELB), CloudResources(constant.RESTYPE.VPN)];
          _ref = constant.REGION_KEYS;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            if (!CloudResources(constant.RESTYPE.DBINSTANCE, e).isReady()) {
              globalReady = false;
            }
          }
          for (_j = 0, _len1 = datasource.length; _j < _len1; _j++) {
            i = datasource[_j];
            if (!i.isReady()) {
              globalReady = false;
            }
          }
          return globalReady;
        }
        switch (type) {
          case constant.RESTYPE.SUBSCRIPTION:
            return CloudResources(type, region).isReady();
          case constant.RESTYPE.VPC:
            return CloudResources(type).isReady() && CloudResources(constant.RESTYPE.DHCP, region).isReady();
          case constant.RESTYPE.INSTANCE:
            return CloudResources(type).isReady() && CloudResources(constant.RESTYPE.EIP, region).isReady();
          case constant.RESTYPE.VPN:
            return CloudResources(type).isReady() && CloudResources(constant.RESTYPE.VGW, region).isReady() && CloudResources(constant.RESTYPE.CGW, region).isReady();
          case constant.RESTYPE.DBINSTANCE:
            return CloudResources(type, region).isReady();
          default:
            return CloudResources(type).isReady();
        }
      },
      getAwsResData: function(region, type) {
        var DBInstances, DBInstancesCount, data, e, filter, _i, _len, _ref;
        if (!region) {
          filter = function(m) {
            if (m.attributes.instanceState) {
              return m.attributes.instanceState.name === "running";
            } else {
              return false;
            }
          };
          DBInstancesCount = 0;
          DBInstances = [];
          _ref = constant.REGION_KEYS;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            e = _ref[_i];
            data = {
              region: e,
              data: CloudResources(constant.RESTYPE.DBINSTANCE, e).models || [],
              regionName: constant.REGION_SHORT_LABEL[e],
              regionArea: constant.REGION_LABEL[e]
            };
            DBInstancesCount += data.data.length;
            DBInstances.push(data);
          }
          DBInstances.totalCount = DBInstancesCount;
          return {
            instances: CloudResources(constant.RESTYPE.INSTANCE).groupByCategory(void 0, filter),
            eips: CloudResources(constant.RESTYPE.EIP).groupByCategory(),
            volumes: CloudResources(constant.RESTYPE.VOL).groupByCategory(),
            elbs: CloudResources(constant.RESTYPE.ELB).groupByCategory(),
            vpns: CloudResources(constant.RESTYPE.VPN).groupByCategory(),
            rds: DBInstances
          };
        }
        if (type === constant.RESTYPE.SUBSCRIPTION) {
          return CloudResources(type, region).models;
        } else {
          return CloudResources(type, region).where({
            category: region
          });
        }
      },
      getAwsResDataById: function(region, type, id) {
        return CloudResources(type, region).get(id);
      },
      getResourcesCount: function(region) {
        var collection, d, data, filter, key, rdsCollection, type;
        filter = {
          category: region
        };
        data = {
          instances: "INSTANCE",
          eips: "EIP",
          volumes: "VOL",
          elbs: "ELB",
          vpns: "VPN",
          vpcs: "VPC",
          asgs: "ASG",
          cloudwatches: "CW"
        };
        d = {};
        for (key in data) {
          type = data[key];
          collection = CloudResources(constant.RESTYPE[type]);
          if (collection.isReady()) {
            d[key] = collection.where(filter).length;
          } else {
            d[key] = "";
          }
        }
        rdsCollection = CloudResources(constant.RESTYPE.DBINSTANCE, region);
        if (rdsCollection.isReady()) {
          d.rds = rdsCollection.models.length;
        } else {
          d.rds = "";
        }
        collection = CloudResources(constant.RESTYPE.SUBSCRIPTION, region);
        if (collection.isReady()) {
          d.snss = collection.models.length;
        } else {
          d.snss = "";
        }
        return d;
      },
      getResourceData: function(region, type, id) {
        return CloudResources(type, region).get(id);
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/dashboard/Dashboard',["Workspace", "./DashboardView", "./DashboardModel", 'i18n!/nls/lang.js'], function(Workspace, DashboardView, DashboardModel, lang) {
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
          return self.__renderControl("updateRegionList", arguments);
        });
        this.listenTo(App.model.appList(), "change", function() {
          return self.__renderControl("updateRegionList", arguments);
        });
        this.listenTo(App.model.appList(), "change", function() {
          return self.__renderControl("updateOpsList");
        });
        this.view.listenTo(App.model.appList(), "change:progress", this.view.updateAppProgress);
        this.listenTo(this.model, "change:globalResources", function() {
          self.view.markUpdated();
          return self.__renderControl("updateGlobalResources");
        });
        this.listenTo(this.model, "change:regionResources", function() {
          self.view.markUpdated();
          return self.__renderControl("updateRegionResources");
        });
        this.listenTo(this.model, "change:visualizeData", function() {
          return self.__renderControl("updateVisModel");
        });
        this.listenTo(App.user, "change:credential", function() {
          self.model.clearVisualizeData();
          self.model.fetchAwsResources();
          return self.view.updateDemoView();
        });
        this.model.fetchAwsResources();
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

