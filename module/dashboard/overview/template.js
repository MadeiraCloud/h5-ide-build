define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n			<li data-region=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['long'])),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['long'])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " - "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['short'])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\r\n		";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<li data-region=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['long'])),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						<a href=\"javascript:void(0)\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0['short'])),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\r\n					</li>\r\n				";
  return buffer;
  }

  buffer += "<header id=\"global-region-header\">\r\n	<button id=\"global-refresh\" class=\"icon-refresh\">just now</button>\r\n\r\n	<button id=\"global-create-stack\" class=\"btn btn-primary icon-new-stack\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_CREATE_NEW_STACK", {hash:{},data:data}))
    + "<i class=\"icon-caret-down\"></i></button>\r\n	<div class=\"dropdown-menu\">\r\n		<ul id=\"global-region-create-stack-list\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_names), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\r\n	</div>\r\n\r\n	<button id=\"global-import-stack\" class=\"btn btn-primary icon-import\" disabled data-analytics-plus=\"import_json\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_IMPORT_JSON", {hash:{},data:data}))
    + "</button>\r\n\r\n	<!-- Visualize unmanaged VPC -->\r\n	<button id=\"global-region-visualize-VPC\" class=\"btn btn-blue icon-visualize\" disabled data-analytics-plus=\"visualize_vpc\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_VISUALIZE_VPC", {hash:{},data:data}))
    + "\r\n<!-- 	<div class=\"help-tip-body\">\r\n		<p><b>Visualize custom VPC resources you have created outside VisualOps.</b></p>\r\n		<p>Once the VPC you select has been visualized, you can manually fine-tune the auto-generated diagram.\r\n		<p>Currently we support to save the visualization as PNG. Future version will include the feature to import VPC resource as an app.</p>\r\n	</div> -->\r\n	</button>\r\n</header>\r\n\r\n\r\n<div id=\"global-region-wrap\" class=\"scroll-wrap\">\r\n<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n\r\n<div class=\"scroll-content\">\r\n	<!-- Global Map -->\r\n	<div id=\"global-region-map-wrap\">\r\n		<div id=\"global-region-map-content\">\r\n			<ul id=\"global-region-spot\">\r\n				<!-- will be filled -->\r\n			</ul>\r\n\r\n			<div id=\"global-region-status-widget\">\r\n				<!-- will be filled -->\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<!-- Global Map -->\r\n\r\n	<div id=\"global-region-tabbar-wrap\">\r\n		<a id=\"region-switch\" class=\"disabled btn-blue btn\" href=\"javascript:void(0)\">\r\n			<span>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</span>\r\n			<i class=\"icon-caret-down\"></i>\r\n		</a>\r\n\r\n		<div id=\"region-switch-list\" class=\"dropdown-menu\">\r\n			<ul>\r\n				<li data-region=\"global\">\r\n					<a href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BTN_GLOBAL", {hash:{},data:data}))
    + "</a>\r\n				</li>\r\n\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_names), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n			</ul>\r\n		</div>\r\n	</div>\r\n\r\n	<!-- Global view -->\r\n		<div id=\"global-view\">\r\n			<!-- loading -->\r\n				<div class=\"dashboard-loading clearfix\">\r\n					<div class=\"loading-spinner\"></div>\r\n				</div>\r\n			<!-- will be filled -->\r\n		</div>\r\n	<!-- Global view -->\r\n\r\n	<!-- Region view -->\r\n		<div id=\"region-view\" style=\"display:none;\">\r\n\r\n			<div id=\"region-app-stack-wrap\">\r\n				<div class=\"dashboard-loading clearfix\">\r\n					<div class=\"loading-spinner\"></div>\r\n				</div>\r\n			</div>\r\n\r\n			<div id=\"region-resource-wrap\">\r\n				<div class=\"dashboard-loading clearfix\">\r\n					<div class=\"loading-spinner\"></div>\r\n				</div>\r\n			</div>\r\n\r\n		</div>\r\n	<!-- Region view -->\r\n</div>\r\n</div>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });