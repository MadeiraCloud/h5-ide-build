define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<a href=\"javascript:void(0)\" id=\"hide-resource-panel\" class=\"tooltip sidebar-hider icon-caret-left\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'>\r\n</a>\r\n<div class=\"sidebar-title\">\r\n	"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RESOURCES", {hash:{},data:data}))
    + "\r\n	<i class=\"js-toggle-dropdown menu-manage-shard-res icon-resources\"></i>\r\n	<ul class=\"dropdown-menu resources-dropdown-wrapper\">\r\n		<li data-action=\"keypair\">Manage Key Pairs...</li>\r\n		<li data-action=\"snapshot\">Manage EBS Snapshots...</li>\r\n		<li data-action=\"sns\">Manage SNS Topic & Subscriptions...</li>\r\n		<li data-action=\"sslcert\">Manage Server Certificates...</li>\r\n		<li data-action=\"dhcp\">Manage DHCP Option Sets...</li>\r\n	</ul>\r\n	<i class=\"refresh-resource-panel icon-refresh tooltip\" data-tooltip=\"Refresh resource list\"></i>\r\n</div>\r\n\r\n<div class=\"fixedaccordion accordion-default\">\r\n	<div class=\"accordion-group\">\r\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AZ", {hash:{},data:data}))
    + "</div>\r\n		<div class=\"accordion-body\">\r\n			<ul class=\"availability-zone resource-list clearfix\"></ul>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"accordion-group\">\r\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AMI", {hash:{},data:data}))
    + "</div>\r\n		<div class=\"selectbox resource-select dark\" id=\"resource-select\">\r\n			<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</div>\r\n			<ul class=\"dropdown\">\r\n				<li class=\"item selected\" data-id=\"quickstart-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</li>\r\n				<li class=\"item\" data-id=\"my-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_MY_AMI", {hash:{},data:data}))
    + "</li>\r\n				<li class=\"item\" data-id=\"favorite-ami\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_FAVORITE_AMI", {hash:{},data:data}))
    + "</li>\r\n			</ul>\r\n		</div>\r\n		<div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\r\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n			<div class=\"item-wrap scroll-content\">\r\n				<ul class=\"quickstart-ami-list resource-list\"></ul>\r\n				<ul class=\"my-ami-list resource-list hide\"></ul>\r\n				<ul class=\"favorite-ami-list resource-list hide\"></ul>\r\n			</div>\r\n			<div class=\"community-ami\"></div>\r\n		</div>\r\n	</div>\r\n\r\n	<div class=\"accordion-group\">\r\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VOL", {hash:{},data:data}))
    + "</div>\r\n		<div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\r\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n			<div class=\"item-wrap scroll-content\">\r\n				<ul class=\"resoruce-snapshot resource-list\">\r\n				</ul>\r\n			</div>\r\n            <div class=\"btn btn-primary\" id=\"btn-snapshot-manager\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_SNAPSHOT_MANAGE", {hash:{},data:data}))
    + "</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"accordion-group\">\r\n		<div class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_ELB_ASG", {hash:{},data:data}))
    + "</div>\r\n		<div class=\"accordion-body\">\r\n			<ul class=\"resource-list clearfix\" id=\"resource-asg-list\">\r\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ELB", {hash:{},data:data}))
    + "' data-component-type=\"node\" data-type=\"AWS.ELB\">\r\n					<div class=\"resource-icon resource-icon-elb\"></div>\r\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ELB", {hash:{},data:data}))
    + "</div>\r\n				</li>\r\n				<li class=\"tooltip resource-item\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ASG", {hash:{},data:data}))
    + "' data-component-type=\"group\" data-type=\"AWS.AutoScaling.Group\">\r\n					<div class=\"resource-icon resource-icon-asg\"></div>\r\n					<div class=\"resource-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ASG", {hash:{},data:data}))
    + "</div>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>\r\n	<div class='resource-vpc-list accordion-group'>\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });