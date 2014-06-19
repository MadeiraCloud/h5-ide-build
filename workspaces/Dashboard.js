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

  buffer += "<div>\r\n\r\n<header id=\"global-region-header\">\r\n	<button id=\"RefreshResource\" class=\"icon-refresh\">just now</button>\r\n\r\n	<button class=\"btn btn-primary icon-new-stack js-toggle-dropdown\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "<i class=\"icon-caret-down\"></i></button>\r\n\r\n	<ul id=\"global-region-create-stack-list\" class=\"dropdown-menu\">\r\n	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\r\n\r\n	<button id=\"ImportStack\" class=\"btn btn-primary icon-import\" data-analytics-plus=\"import_json\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_IMPORT_JSON", {hash:{},data:data}))
    + "</button>\r\n\r\n	<button id=\"VisualizeVPC\" class=\"btn btn-blue icon-visualize\" data-analytics-plus=\"visualize_vpc\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_VISUALIZE_VPC", {hash:{},data:data}))
    + "\r\n	</button>\r\n</header>\r\n\r\n\r\n<div id=\"global-region-wrap\" class=\"scroll-wrap\">\r\n<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n\r\n<div class=\"scroll-content\">\r\n	<!-- Global Map -->\r\n	<div id=\"global-region-map-wrap\"> <div id=\"global-region-map-content\" class=\"clearfix\">\r\n		<ul id=\"global-region-spot\" class=\"pos-r\"></ul>\r\n		<div id=\"global-region-status-widget\">\r\n			<header class=\"clearfix\">\r\n			  <div class=\"global-region-status-tab\">\r\n			    <span>0</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_APP", {hash:{},data:data}))
    + "</h5>\r\n			  </div>\r\n			  <div class=\"global-region-status-tab on stack\">\r\n		      <span>0</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STACK", {hash:{},data:data}))
    + "</h5>\r\n			  </div>\r\n			</header>\r\n			<section id=\"global-region-recent-list\"></section>\r\n		</div>\r\n	</div> </div>\r\n	<!-- Global Map -->\r\n\r\n<section id=\"dashboard-data-wrap\">\r\n\r\n	<nav class=\"pos-r\">\r\n		<button id=\"region-switch\" class=\"btn-blue btn js-toggle-dropdown\">\r\n			<i class=\"icon-caret-down right\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</span>\r\n		</button>\r\n\r\n		<ul id=\"region-switch-list\" class=\"dropdown-menu\">\r\n			<li data-region=\"global\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</li>\r\n			";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		</ul>\r\n	</nav>\r\n\r\n	<!-- Global view --><ul id=\"GlobalView\" class=\"clearfix\" style=\"display:none;\"></ul><!-- Global view -->\r\n\r\n	<!-- Region view --><section id=\"RegionView\" style=\"display:none;\">\r\n		<div id=\"region-app-stack-wrap\">\r\n			<div class=\"dashboard-loading\"><div class=\"loading-spinner\"></div></div>\r\n		</div>\r\n		<div id=\"RegionViewWrap\">\r\n		<nav class=\"clearfix\" id=\"RegionResourceNav\">\r\n		  <div class=\"resource-tab instances on\" data-type=\"INSTANCE\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab eips\" data-type=\"EIP\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab volumes\" data-type=\"VOL\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab vpcs\" data-type=\"VPC\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab vpns\" data-type=\"VPN\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab elbs\" data-type=\"ELB\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab asgs\" data-type=\"ASG\">\r\n		   <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab cloudwatches\" data-type=\"CW\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		  <div class=\"resource-tab snss\" data-type=\"SUBSCRIPTION\">\r\n		    <span class=\"resource-count\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + "</span><span class=\"count-bubble\"></span></div>\r\n		</nav>\r\n		<div id=\"RegionResourceData\" class=\"table-head-fix\"></div>\r\n		</div>\r\n	</section><!-- Region view -->\r\n\r\n	<div id=\"DashboardDemo\">\r\n	  <div class=\"enter-credential\">\r\n	    This is only sample data of global resource sumary.</br>\r\n	    <a class=\"show-credential\">Provide your AWS Credential</a> to see real data\r\n	  </div>\r\n	  <img src=\"./assets/images/ide/global-demo.png\"/>\r\n	</div>\r\n</section>\r\n\r\n</div></div></div>\r\n\r\n</div>";
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
  
  
  return "\n  <span class=\"empty-text\">No recently launched app in 30 days</span>\n";
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
  
  
  return "\n  <span class=\"empty-text\">No recently edited stack in 30 days</span>\n";
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
  buffer += "\n<li class=\"instances\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instances)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_RUNNING_INSTANCE", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instances), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"eips\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eips)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.eips), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"volumes\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volumes)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.volumes), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"elbs\">\n  <hgroup><span class=\"resource-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.elbs)),stack1 == null || stack1 === false ? stack1 : stack1.totalCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><h5>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + "</h5></hgroup>\n  <ul>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.elbs), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>\n<li class=\"vpns\">\n  <hgroup><span class=\"resource-count\">"
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

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
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progressing), {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"disabled\" data-appid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    <div class=\"thumbnail app-thumbnail\"></div>\n    <div class=\"region-resource-progess";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.progress), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\n    <div class=\"region-resource-info truncate\">\n        <div class=\"loading-spinner loading-spinner-small\"></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = (depth0 && depth0.stateDesc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "...\n    </div>\n</li>\n";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return " hide";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"thumbnail app-thumbnail\"> <img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/> </div>\n  <div class=\"region-resource-info\">\n    <i class=\"icon-terminate terminate-app\"></i>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stoppable), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <span class=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.stateDesc), "Running", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n  </div>\n</li>\n";
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
    + "\">\n    <div class=\"thumbnail\"> <img src=\""
    + escapeExpression(((stack1 = (depth0 && depth0.thumbnail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.thumbnail), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/> </div>\n    <div class=\"region-resource-info\">\n      <i class=\"icon-delete delete-stack\"></i>\n      <i class=\"icon-duplicate duplicate-stack\"></i>\n      <span class=\"truncate\">"
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
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CREATE_STACK", {hash:{},data:data}))
    + "\"></button>\n    </li>\n</ul> <!-- Resource tab -->\n\n<div class=\"scroll-wrap\">\n<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n\n<ul id=\"region-resource-app-wrap\" class=\"region-resource-list clearfix\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stack), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.apps), {hash:{},inverse:self.program(25, program25, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul> <!-- Resource App -->\n\n<ul id=\"region-resource-stack-wrap\" class=\"region-resource-list clearfix\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.stacks), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul> <!-- Resource Stack -->\n</div>\n</div>\n<!-- Region App & Stack -->";
  return buffer;
  };
TEMPLATE.region_app_stack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

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
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.tagSet), ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          <div>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tagSet), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"resource-id\">( "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " )</span></div>\n        </td>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instanceState)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.launchTime), {hash:{},data:data}))
    + "</td>\n        <td><span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;AMI&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></td>\n        <td>"
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
  buffer += "\n          <div class=\"table-app-link-wrap\"><span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.tagSet), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var stack1;
  return escapeExpression(helpers.or.call(depth0, ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.name), ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.Name), {hash:{},data:data}));
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead><tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_INSTANCE_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:17%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAUNCH_TIME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AMI", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr></thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n    <thead> <tr>\n      <th></th>\n      <th style=\"width: 17%\"></th>\n      <th style=\"width: 20%\"></th>\n      <th style=\"width: 15%\"></th>\n      <th style=\"width: 15%\"></th>\n      <th style=\"width: 40px\"></th>\n    </tr> </thead>\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n  </table>\n</div> </div>";
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
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n      </tr>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ELASTIC_IP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead><tr>\n  <th class=\"sortable\" style=\"width:40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_IP", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ASSOCIATED_INSTANCE", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr></thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n    <thead> <tr> <th style=\"width:40%\"></th><th></th><th style=\"width:40px\"></th> </tr> </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n</div> </div>";
  return buffer;
  };
TEMPLATE.resourceEIP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n        <td>\n        ";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.tagSet), ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </td>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.device)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td><i class=\"status ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachmentStatus), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachmentStatus), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n    </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <div class=\"table-app-link-wrap\"><span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.tagSet), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "status-in-use";
  }

function program9(depth0,data) {
  
  
  return "status-available";
  }

function program11(depth0,data) {
  
  
  return "attached";
  }

function program13(depth0,data) {
  
  
  return "not-attached";
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VOLUME", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:18%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:21%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DEVICE_NAME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:15%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ATTACHMENT_STATUS", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n    <thead> <tr>\n      <th></th>\n      <th style=\"width: 18%\"></th>\n      <th style=\"width: 21%\"></th>\n      <th style=\"width: 15%\"></th>\n      <th style=\"width: 15%\"></th>\n      <th style=\"width:40px\"></th>\n    </tr> </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(15, program15, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n</div> </div>";
  return buffer;
  };
TEMPLATE.resourceVOL=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

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
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.tagSet), ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
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
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dhcpOptionsId), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
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
  buffer += "\n          <div class=\"table-app-link-wrap\"><span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.tagSet), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"bubble\" data-bubble-template=\"dashboardBubble\" data-bubble-data=\"{&quot;type&quot;:&quot;DHCP&quot;,&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}\">"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "None";
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPC", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CIDR", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DHCP_SETTINGS", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n    <thead> <tr>\n<th></th><th style=\"width:20%\"></th><th style=\"width:25%\"></th><th style=\"width:20%\"></th><th style=\"width:40px\"></th>\n    </tr> </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(11, program11, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tbody>\n</table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceVPC=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

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
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.tagSet), ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
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
  buffer += "\n            <div class=\"table-app-link-wrap\"><span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.tagSet), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n          ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n          ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VPN", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ID", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_VIRTUAL_PRIVATE_GATEWAY", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CUSTOMER_GATEWAY", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n    <table class=\"table\"> <thead> <tr>\n      <th></th>\n      <th style=\"width: 20%\"></th>\n      <th style=\"width: 25%\"></th>\n      <th style=\"width: 20%\"></th>\n      <th style=\"width: 40px\"></th>\n    </tr> </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
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
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(helpers.simpleTime.call(depth0, (depth0 && depth0.CreatedTime), {hash:{},data:data}))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZones)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n      </tr>";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LOAD_BALANCER", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DNS_NAME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\" data-row-type=\"datetime\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CREATE_TIME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:25%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AVAILABILITY_ZONE", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATUS", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n    <thead> <tr>\n      <th></th>\n      <th style=\"width: 20%\"></th>\n      <th style=\"width: 25%\"></th>\n      <th style=\"width: 20%\"></th>\n      <th style=\"width: 40px\"></th>\n    </tr> </thead>\n    <tbody>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceELB=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

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
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.tagSet), ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AutoScalingGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.last_activity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.activity_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n      </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"table-app-link-wrap\"><span class=\"table-app-link truncate tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_APP_CREATED_BY", {hash:{},data:data}))
    + escapeExpression(helpers.getInvalidKey.call(depth0, (depth0 && depth0.tagSet), "Created by", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1['app-id'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.tagSet)),stack1 == null || stack1 === false ? stack1 : stack1.app)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span></div>\n          ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n            <div>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_UNMANAGED", {hash:{},data:data}))
    + "</div>\n          ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n      ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:50%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CURRENT", {hash:{},data:data}))
    + "/"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_LAST_ACTIVITY", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ACTIVITY_STATUS", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n  <div class=\"scroll-content\">\n    <table class=\"table\"> <thead> <tr>\n      <th></th>\n      <th style=\"width: 50%\"></th>\n      <th style=\"width: 20%\"></th>\n      <th style=\"width:40px\"></th>\n    </tr> </thead>\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </tbody>\n  </table>\n</div> </div>";
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
  buffer += "\n        ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr>\n          <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n          <td>";
  stack1 = helpers.doubleIf.call(depth0, (depth0 && depth0.Dimensions), ((stack1 = ((stack1 = (depth0 && depth0.Dimensions)),stack1 == null || stack1 === false ? stack1 : stack1.member)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n          <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.MetricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.ComparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.Threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " for "
    + escapeExpression(((stack1 = (depth0 && depth0.Period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds</td>\n          <td><i class=\"status ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.StateValue), "OK", {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.StateValue)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n          <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n        </tr>";
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
  buffer += "\n        <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CLOUDWATCH_ALARM", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n        ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NAME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DIMENSION", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_THRESHOLD", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:10%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_STATE", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n    <table class=\"table\">\n      <thead> <tr>\n        <th></th>\n        <th style=\"width: 30%\"></th>\n        <th style=\"width: 30%\"></th>\n        <th style=\"width: 10%\"></th>\n        <th style=\"width:40px\"></th>\n      </tr> </thead>\n      <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tbody>\n    </table>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.resourceCW=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.TopicName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ": "
    + escapeExpression(((stack1 = (depth0 && depth0.Endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.SubscriptionArn), "PendingConfirmation", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <td><i title=\""
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIT_VIEW_RESOURCE_DETAIL", {hash:{},data:data}))
    + "\" class=\"icon-detail\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></td>\n      </tr>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "\n        <td><i class=\"status status-red icon-label\"></i>Pending Confirmation</td>\n        ";
  }

function program5(depth0,data) {
  
  
  return "\n        <td><i class=\"status status-green icon-label\"></i>Success</td>\n        ";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"blank-widget\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_LEFT", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "DASH_TIP_NO_RESOURCE_RIGHT", {hash:{},data:data}))
    + ".</div>\n    ";
  return buffer;
  }

  buffer += "<table class=\"table-head\"> <thead> <tr>\n  <th class=\"sortable\" style=\"width:20%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_TOPIC_NAME", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_ENDPOINT_AND_PROTOCOL", {hash:{},data:data}))
    + "</th>\n  <th class=\"sortable\" style=\"width:30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_CONFIRMATION", {hash:{},data:data}))
    + "</th>\n  <th style=\"width:40px\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_DETAIL", {hash:{},data:data}))
    + "</th>\n</tr> </thead> </table>\n<div class=\"scroll-wrap\"> <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n  <table class=\"table\">\n    <thead> <tr>\n      <th style=\"width:20%\"></th>\n      <th></th>\n      <th style=\"width:30%\"></th>\n      <th style=\"width:40px\"></th>\n    </tr> </thead>\n\n    <tbody> ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table>\n</div>";
  return buffer;
  };
TEMPLATE.resourceSUBSCRIPTION=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
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


return TEMPLATE; });
define('workspaces/dashboard/VisualizeVpcTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "\r\n<div class=\"unmanaged-vpc-empty\">Oops, loading VPC failed.\r\n	<button class=\"btn btn-blue\" id=\"VisualizeReload\">Retry</button>\r\n</div>\r\n<div class=\"loading-spinner hide\"></div>\r\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.ready), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "<div class=\"loading-spinner\"></div>";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.program(14, program14, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.vpcs)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<section>\r\n			<header class=\"region-header\"><span class=\"region-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>"
    + escapeExpression(((stack1 = (depth0 && depth0.subname)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"vpc-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.vpcs)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></header>\r\n\r\n			<ul class=\"region-group clearfix\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vpcs), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</ul>\r\n		</section>";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n				<li class=\"visualize-vpc ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\r\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n					<h5>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\r\n					<ol class=\"tac\">\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subnet)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">subnet</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">running instance</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.stopped)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">stopped instance</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">network interface</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eip)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">elastic ip</span></li>\r\n						<li class=\"visualize-res\"><div class=\"vis-res-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.elb)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div><span class=\"vis-res-name\">load balancer</span></li>\r\n					</ol>\r\n					<button class=\"btn btn-blue visualize-vpc-btn\" data-vpcid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Import</button>\r\n				</li>\r\n				";
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
  
  
  return "<div class=\"unmanaged-vpc-empty\">There is no VPC to import.</div>";
  }

  buffer += "<div class=\"scroll-wrap scrollbar-auto-hide\" style=\"height:500px;\">\r\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n	<div id=\"VisualizeVpcDialog\" class=\"scroll-content\">\r\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fail), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/dashboard/DashboardView',['./DashboardTpl', './DashboardTplData', './VisualizeVpcTpl', "UI.modalplus", "constant", "i18n!nls/lang.js", "backbone", "UI.scrollbar", "UI.tooltip", "UI.table", "UI.bubble"], function(template, tplPartials, VisualizeVpcTpl, Modal, constant, lang) {
    var Helper;
    Helper = {
      scrollToResource: function() {
        var scrollContent, scrollTo;
        scrollContent = $('#global-region-wrap .scroll-content');
        scrollContent.addClass('scroll-transition');
        setTimeout(function() {
          scrollContent.removeClass('scroll-transition');
          return null;
        }, 100);
        scrollTo = $('#global-region-map-wrap').height() + 7;
        return scrollbar.scrollTo($('#global-region-wrap'), {
          'top': scrollTo
        });
      }
    };
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
        'click #ImportStack': 'importJson',
        'click #VisualizeVPC': 'visualizeVPC',
        'click .show-credential': 'showCredential',
        'click #RefreshResource': 'reloadResource',
        "click .icon-detail": "showResourceDetail"
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
        this.setElement($(template(data)).appendTo("#main"));
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
      dashboardBubbleSub: function(data) {
        var renderData;
        renderData = {};
        renderData.data = _.clone(data);
        renderData.title = data.id || data.name || data._title;
        delete renderData.data._title;
        return tplPartials.bubbleResourceSub(renderData);
      },
      dashboardBubble: function(data) {
        var _ref;
        data.data = (_ref = this.model.getAwsResDataById(this.region, constant.RESTYPE[data.type], data.id)) != null ? _ref.toJSON() : void 0;
        data.id = data.data.id;
        _.each(data.data, function(e, key) {
          if (_.isBoolean(e)) {
            data.data[key] = e.toString();
          }
          if (e === "") {
            data.data[key] = "None";
          }
          if ((_.isArray(e)) && e.length === 0) {
            data.data[key] = ['None'];
          }
          if ((_.isObject(e)) && (!_.isArray(e))) {
            return delete data.data[key];
          }
        });
        return tplPartials.bubbleResourceInfo(data);
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
          $li = $("#region-resource-app-wrap").children("[data-appid='" + model.id + "']");
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
      gotoRegionFromMap: function(evt) {
        var $tgt, region;
        $tgt = $(evt.currentTarget);
        region = $(evt.currentTarget).closest("li").attr("id");
        $("#region-switch-list li[data-region=" + region + "]").click();
        Helper.scrollToResource();
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
        var region, target;
        target = $(evt.currentTarget);
        region = target.attr('data-region');
        if (this.region === region) {
          return;
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
      importJson: function() {
        var hanldeFile, modal, reader, zone;
        modal = new Modal({
          title: lang.ide.POP_IMPORT_JSON_TIT,
          template: tplPartials.importJSON(),
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
          $("#import-json-error").html(lang.ide.POP_IMPORT_ERROR);
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
      openItem: function(event) {
        return App.openOps($(event.currentTarget).attr("data-id"));
      },
      createStack: function(event) {
        return App.createOps($(event.currentTarget).attr("data-region") || this.region);
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
          return $("#RefreshResource").removeClass("reloading").text("just now");
        });
      },
      deleteStack: function(event) {
        App.deleteStack($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      duplicateStack: function(event) {
        App.duplicateStack($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      startApp: function(event) {
        App.startApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      stopApp: function(event) {
        App.stopApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      terminateApp: function(event) {
        App.terminateApp($(event.currentTarget).closest("li").attr("data-id"));
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
        this.visModal = new Modal({
          title: "Import Existing VPC as App",
          width: "770",
          template: VisualizeVpcTpl(attributes),
          disableFooter: true,
          compact: true,
          onClose: function() {
            self.visModal = null;
            clearTimeout(TO);
          }
        });
        this.visModal.tpl.on("click", "#VisualizeReload", function() {
          self.model.visualizeVpc(true);
          self.visModal.tpl.find(".unmanaged-vpc-empty").hide();
          self.visModal.tpl.find(".loading-spinner").show();
          return false;
        });
        this.visModal.tpl.on("click", ".visualize-vpc-btn", function() {
          var $tgt, id, region;
          $tgt = $(this);
          if ($tgt.hasClass(".disabled")) {
            return false;
          }
          id = $tgt.attr("data-vpcid");
          region = $tgt.closest("ul").attr("data-region");
          self.visModal.close();
          App.openOps(App.model.createImportOps(region, id));
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
        var result;
        switch (type) {
          case "SUBSCRIPTION":
            return {
              title: data.Endpoint,
              Endpoint: data.Endpoint,
              Owner: data.Owner,
              Protocol: data.Protocol,
              "Subscription ARN": data.SubscriptionArn,
              "Topic ARN": data.TopicArn
            };
          case "VPC":
            return {
              State: data.state,
              CIDR: data.cidrBlock,
              Tenancy: data.instanceTenancy
            };
          case "ASG":
            console.debug(data);
            return {
              "title": data.Name,
              "Name": data.Name,
              "Availability Zone": data.AvailabilityZones.join(", "),
              "Create Time": data.CreatedTime,
              "Default Cooldown": data.DefaultCooldown,
              "Desired Capacity": data.DesiredCapacity,
              "Max Size": data.MaxSize,
              "Min Size": data.MinSize,
              "HealthCheck Grace Period": data.HealthCheckGracePeriod,
              "Health Check Type": data.HealthCheckType,
              "Launch Configuration": data.LaunchConfigurationName,
              "Termination Policy": data.TerminationPolicies.join(", "),
              "Arn": data.id
            };
          case "ELB":
            return {
              "Availability Zone": data.AvailabilityZones.join(", "),
              "Create Time": data.CreatedTime,
              "DNSName": data.DNSName,
              "Health Check": this.formartDetail('HealthCheck', [data.HealthCheck], "Health Check", true),
              "Instance": data.Instances.join(", "),
              "Listener Descriptions": this.formartDetail('ListenerDescriptions', _.pluck(data.ListenerDescriptions.member, "Listener"), "Listener Descriptions", true),
              "Security Groups": data.SecurityGroups.join(", "),
              Subnets: data.Subnets.join(", ")
            };
          case "VPN":
            return {
              State: data.state,
              "VGW Id": data.vpnGatewayId,
              "CGW Id": data.customerGatewayId,
              Type: data.type
            };
          case "VOL":
            return {
              "Volume ID": data.id,
              "Device Name": data.device,
              "Snapshot ID": data.snapshotId,
              "Volume Size(GiB)": data.size,
              "Status": data.status,
              "Instance Id": data.instanceId,
              'Delete on Termination': data.deleteOnTermination,
              "Availability Zone": data.availabilityZone,
              "Volume Type": data.volumeType,
              "Create Time": data.createTime,
              "Attach Time": data.attachTime
            };
          case "INSTANCE":
            return {
              Status: data.instanceState.name,
              Monitoring: data.monitoring.state,
              "Primary Private IP": data.privateIpAddress,
              "Private DNS": data.privateDnsName,
              "Launch Time": data.launchTime,
              "Availability Zone": data.placement.availabilityZone,
              "AMI Launch Index": data.amiLaunchIndex,
              "Instance Type": data.instanceType,
              "Block Device Type": data.rootDeviceType,
              "Block Devices": this.formartDetail("BlockDevice", data.blockDeviceMapping, "deviceName"),
              "Network Interface": this.formartDetail("ENI", data.networkInterfaceSet, "networkInterfaceId")
            };
          case 'EIP':
            result = {
              'Public IP': data.publicIp,
              'Domain': data.domain,
              'Allocation ID': data.id,
              'Category': data.category,
              'title': data.publicIp
            };
            if (data.associationId) {
              result['Association Id'] = data.associationId;
            }
            if (data.networkInterfaceId) {
              result['NetworkInterface Id'] = data.networkInterfaceId;
            }
            if (data.instanceId) {
              result['Instance Id'] = data.instanceId;
            }
            if (data.privateIpAddresse) {
              result['Private Ip Address'] = data.privateIpAddresses;
            }
            return result;
          case 'CW':
            return {
              'Alarm Name': data.Name,
              'Comparison Operator': data.ComparisonOperator,
              'Dimensions': this.formartDetail('Dimensions', data.Dimensions.member, 'Dimensions', true),
              'Evaluation Periods': data.EvaluationPeriods,
              'Insufficient Data Actions': data.InsufficientDataActions,
              'Metric Name': data.MetricName,
              "Name Space": data.Namespace,
              'OK Actions': data.OKActions,
              'Period': data.Period,
              'State Reason': data.StateReason,
              'State Updated Timestamp': data.StateUpdatedTimestamp,
              'State Value': data.StateValue,
              'Statistic': data.Statistic,
              'Threshold': data.Threshold,
              'Category': data.category,
              'title': data.Name,
              'Actions Enabled': data.ActionsEnabled ? "true" : 'false',
              'Alarm Actions': data.AlarmActions.member,
              'Alarm Arn': data.id
            };
        }
      },
      formartDetail: function(type, array, key, force) {
        var result;
        if ((['BlockDevice', "AttachmentSet", "HealthCheck", "ListenerDescriptions", 'Dimensions'].indexOf(type)) > -1) {
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
          _results.push(this.listenTo(CloudResources(constant.RESTYPE.SUBSCRIPTION, region), "update", this.onRegionResChanged));
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
        if (!this.__visRequest) {
          return;
        }
        this.__isVisReady = true;
        this.__isVisFail = false;
        this.attributes.visualizeData = null;
        this.set("visualizeData", this.parseVisData(result));
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
              if (resources.Tag && resources.Tag.item && resources.Tag.item.length) {
                tags = [];
                _ref = resources.Tag.item;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  t = _ref[_i];
                  if (t) {
                    tags.push(t.key);
                  }
                }
                if (tags.indexOf("Created by") >= 0 && tags.indexOf("app-id") >= 0) {
                  continue;
                }
              }
              obj = {
                id: vpc,
                subnet: resourceMap(resources["AWS|VPC|Subnet"]),
                ami: instanceMap(resources["AWS|EC2|Instance"]),
                stopped: instanceMap(resources["AWS|EC2|Instance"], true),
                eni: resourceMap(resources["AWS|VPC|NetworkInterface"]),
                eip: resourceMap(resources["AWS|EC2|EIP"]),
                elb: resourceMap(resources["AWS|ELB"])
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
        var datasource, i, _i, _len;
        if (!region) {
          datasource = [CloudResources(constant.RESTYPE.INSTANCE), CloudResources(constant.RESTYPE.EIP), CloudResources(constant.RESTYPE.VOL), CloudResources(constant.RESTYPE.ELB), CloudResources(constant.RESTYPE.VPN)];
          for (_i = 0, _len = datasource.length; _i < _len; _i++) {
            i = datasource[_i];
            if (!i.isReady()) {
              return false;
            }
          }
          return true;
        }
        switch (type) {
          case constant.RESTYPE.SUBSCRIPTION:
            return CloudResources(type, region).isReady();
          case constant.RESTYPE.VPC:
            return CloudResources(type).isReady() && CloudResources(constant.RESTYPE.DHCP, region).isReady();
          case constant.RESTYPE.INSTANCE:
            return CloudResources(type).isReady() && CloudResources(constant.RESTYPE.ENI, region).isReady();
          case constant.RESTYPE.VPN:
            return CloudResources(type).isReady() && CloudResources(constant.RESTYPE.VGW, region).isReady() && CloudResources(constant.RESTYPE.CGW, region).isReady();
          default:
            return CloudResources(type).isReady();
        }
      },
      getAwsResData: function(region, type) {
        var filter;
        if (!region) {
          filter = function(m) {
            if (m.attributes.instanceState) {
              return m.attributes.instanceState.name === "running";
            } else {
              return false;
            }
          };
          return {
            instances: CloudResources(constant.RESTYPE.INSTANCE).groupByCategory(void 0, filter),
            eips: CloudResources(constant.RESTYPE.EIP).groupByCategory(),
            volumes: CloudResources(constant.RESTYPE.VOL).groupByCategory(),
            elbs: CloudResources(constant.RESTYPE.ELB).groupByCategory(),
            vpns: CloudResources(constant.RESTYPE.VPN).groupByCategory()
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
        var collection, d, data, filter, key, type;
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

  define('workspaces/Dashboard',["Workspace", "workspaces/dashboard/DashboardView", "workspaces/dashboard/DashboardModel"], function(Workspace, DashboardView, DashboardModel) {
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
        return "Dashboard";
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
        this.view.$el.hide();
      };

      Dashboard.prototype.awake = function() {
        var method;
        for (method in this.__renderControlMap) {
          this.view[method]();
        }
        this.__renderControlMap = null;
        this.view.$el.show();
      };

      Dashboard.prototype.__renderControl = function(method, args) {
        if (this.__renderControlMap) {
          console.log("DashboardView's render is throttled, method name: " + method);
          this.__renderControlMap[method] = true;
        } else {
          this.view[method].apply(this.view, args);
        }
      };

      Dashboard.prototype.isDashboard = function() {
        return true;
      };

      return Dashboard;

    })(Workspace);
    return Dashboard;
  });

}).call(this);

