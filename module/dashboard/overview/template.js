define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li data-region=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['long'])),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['long'])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['short'])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n		";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li data-region=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['long'])),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n						<a href=\"javascript:void(0)\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['short'])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n					</li>\n				";
  return buffer;
  }

  buffer += "<header id=\"global-region-header\">\n	<button id=\"global-refresh\" class=\"icon-refresh\">just now</button>\n\n	<button id=\"global-create-stack\" class=\"btn btn-primary icon-new-stack\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "<i class=\"icon-caret-down\"></i></button>\n	<div class=\"dropdown-menu\">\n		<ul id=\"global-region-create-stack-list\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_names), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n	</div>\n\n	<button id=\"global-import-stack\" class=\"btn btn-primary icon-import\" disabled data-analytics-plus=\"import_json\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_IMPORT_JSON", {hash:{},data:data}))
    + "</button>\n\n	<!-- Visualize unmanaged VPC -->\n	<button id=\"global-region-visualize-VPC\" class=\"btn btn-blue icon-visualize\" disabled data-analytics-plus=\"visualize_vpc\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_VISUALIZE_VPC", {hash:{},data:data}))
    + "\n<!-- 	<div class=\"help-tip-body\">\n		<p><b>Visualize custom VPC resources you have created outside VisualOps.</b></p>\n		<p>Once the VPC you select has been visualized, you can manually fine-tune the auto-generated diagram.\n		<p>Currently we support to save the visualization as PNG. Future version will include the feature to import VPC resource as an app.</p>\n	</div> -->\n	</button>\n</header>\n\n\n<div id=\"global-region-wrap\" class=\"scroll-wrap\">\n<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n\n<div class=\"scroll-content\">\n	<!-- Global Map -->\n	<div id=\"global-region-map-wrap\">\n		<div id=\"global-region-map-content\">\n			<ul id=\"global-region-spot\">\n				<!-- will be filled -->\n			</ul>\n\n			<div id=\"global-region-status-widget\">\n				<!-- will be filled -->\n			</div>\n		</div>\n	</div>\n	<!-- Global Map -->\n\n	<div id=\"global-region-tabbar-wrap\">\n		<a id=\"region-switch\" class=\"disabled btn-blue btn\" href=\"javascript:void(0)\">\n			<span>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</span>\n			<i class=\"icon-caret-down\"></i>\n		</a>\n\n		<div id=\"region-switch-list\" class=\"dropdown-menu\">\n			<ul>\n				<li data-region=\"global\">\n					<a href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</a>\n				</li>\n\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_names), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n			</ul>\n		</div>\n	</div>\n\n	<!-- Global view -->\n		<div id=\"global-view\">\n			<!-- loading -->\n				<div class=\"dashboard-loading clearfix\">\n					<div class=\"loading-spinner\"></div>\n				</div>\n			<!-- will be filled -->\n		</div>\n	<!-- Global view -->\n\n	<!-- Region view -->\n		<div id=\"region-view\" style=\"display:none;\">\n\n			<div id=\"region-app-stack-wrap\">\n				<div class=\"dashboard-loading clearfix\">\n					<div class=\"loading-spinner\"></div>\n				</div>\n			</div>\n\n			<div id=\"region-resource-wrap\">\n				<div class=\"dashboard-loading clearfix\">\n					<div class=\"loading-spinner\"></div>\n				</div>\n			</div>\n\n		</div>\n	<!-- Region view -->\n</div>\n</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });