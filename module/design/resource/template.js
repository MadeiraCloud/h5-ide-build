define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"javascript:void(0)\" id=\"hide-resource-panel\" class=\"tooltip sidebar-hider icon-caret-left\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'>\n</a>\n<div class=\"sidebar-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RESOURCES", {hash:{},data:data}))
    + "</div>\n\n<div class=\"fixedaccordion accordion-default\">\n	<div class=\"accordion-group\">\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AZ", {hash:{},data:data}))
    + "</div>\n		<div class=\"accordion-body\">\n			<ul class=\"availability-zone resource-list clearfix\">loading...</ul>\n		</div>\n	</div>\n\n	<div class=\"accordion-group\">\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AMI", {hash:{},data:data}))
    + "</div>\n		<div class=\"selectbox resource-select dark\" id=\"resource-select\">\n			<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</div>\n			<ul class=\"dropdown\">\n				<li class=\"item selected\" data-id=\"quickstart-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</li>\n				<li class=\"item\" data-id=\"my-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_MY_AMI", {hash:{},data:data}))
    + "</li>\n				<li class=\"item\" data-id=\"favorite-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_FAVORITE_AMI", {hash:{},data:data}))
    + "</li>\n			</ul>\n		</div>\n		<div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n			<div class=\"item-wrap scroll-content\">\n				<ul class=\"quickstart-ami-list resource-list\">loading...</ul>\n				<ul class=\"my-ami-list resource-list hide\">loading...</ul>\n				<ul class=\"favorite-ami-list resource-list hide\">loading...</ul>\n			</div>\n			<div class=\"community-ami\">loading...</div>\n		</div>\n	</div>\n\n	<div class=\"accordion-group\">\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VOL", {hash:{},data:data}))
    + "</div>\n		<div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n			<div class=\"item-wrap scroll-content\">\n				<ul class=\"resoruce-snapshot resource-list\">\n					<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VOLUME", {hash:{},data:data}))
    + "' data-component-type=\"node\" data-type=\"AWS.EC2.EBS.Volume\" data-option='' >\n						<div class=\"resource-icon resource-icon-volume\"></div>\n						<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VOL", {hash:{},data:data}))
    + "</div>\n					</li>\n				</ul>\n			</div>\n		</div>\n	</div>\n	<div class=\"accordion-group\">\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_ELB_ASG", {hash:{},data:data}))
    + "</div>\n		<div class=\"accordion-body\">\n			<ul class=\"resource-list clearfix\" id=\"resource-asg-list\">\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ELB", {hash:{},data:data}))
    + "' data-component-type=\"node\" data-type=\"AWS.ELB\">\n					<div class=\"resource-icon resource-icon-elb\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ELB", {hash:{},data:data}))
    + "</div>\n				</li>\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ASG", {hash:{},data:data}))
    + "' data-component-type=\"group\" data-type=\"AWS.AutoScaling.Group\">\n					<div class=\"resource-icon resource-icon-asg\"></div>\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ASG", {hash:{},data:data}))
    + "</div>\n				</li>\n			</ul>\n		</div>\n	</div>\n	<div class='resource-vpc-list accordion-group'>\n	</div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });