define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:855px;\" id=\"modal-browse-community-ami\">\r\n	<div class=\"modal-header\">\r\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_COMMUNITY_AMIS", {hash:{},data:data}))
    + "</h3>\r\n		<i class=\"modal-close\">×</i>\r\n	</div>\r\n\r\n	<div class=\"modal-body\">\r\n		<div class=\"content-wrap\">\r\n			<div id=\"ami-search-option\">\r\n				<div>\r\n					<input id=\"community-ami-input\" class=\"input\" type=\"text\" placeholder=\"";
  stack1 = helpers.i18n.call(depth0, "AMI_LBL_ALL_SEARCH_AMI_BY_NAME_OR_ID", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\r\n				</div>\r\n\r\n				<div id=\"selectbox-ami-platform\" class=\"selectbox\">\r\n					<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</div>\r\n					<ul class=\"dropdown\" tabindex=\"-1\">\r\n						<li class=\"item selected\" data-id=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</li>\r\n						<li class=\"item\" data-id=\"amazonlinux\">\r\n							<i class=\"icon-amz-linux icon-ami-os\"></i>\r\n							<span>Amazon Linux</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"centos\">\r\n							<i class=\"icon-centos icon-ami-os\"></i>\r\n							<span>Cent OS</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"debian\">\r\n							<i class=\"icon-debian icon-ami-os\"></i>\r\n							<span>Debian</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"fedora\">\r\n							<i class=\"icon-fedora icon-ami-os\"></i>\r\n							<span>Fedora</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"gentoo\">\r\n							<i class=\"icon-gentoo icon-ami-os\"></i>\r\n							<span>Gentoo</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"opensuse\">\r\n							<i class=\"icon-opensuse icon-ami-os\"></i>\r\n							<span>OpenSUSE</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"ubuntu\">\r\n							<i class=\"icon-ubuntu icon-ami-os\"></i>\r\n							<span>Ubuntu</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"redhat\">\r\n							<i class=\"icon-redhat icon-ami-os\"></i>\r\n							<span>Red Hat</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"windows\">\r\n							<i class=\"icon-windows icon-ami-os\"></i>\r\n							<span>Windows</span>\r\n						</li>\r\n						<li class=\"item\" data-id=\"otherlinux\">\r\n							<i class=\"icon-linux-other icon-ami-os\"></i>\r\n							<span>Other Linux</span>\r\n						</li>\r\n					</ul>\r\n				</div>\r\n\r\n				<div class=\"ami-option-group\">\r\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_VISIBILITY", {hash:{},data:data}))
    + "</h5>\r\n					<div class=\"ami-option-wrap\" id=\"filter-ami-type\">\r\n						<button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PUBLIC", {hash:{},data:data}))
    + "</button>\r\n						<button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PRIVATE", {hash:{},data:data}))
    + "</button>\r\n					</div>\r\n				</div>\r\n\r\n				<div class=\"ami-option-group\">\r\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ARCHITECTURE", {hash:{},data:data}))
    + "</h5>\r\n					<div class=\"ami-option-wrap\" id=\"filter-ami-32bit-64bit\">\r\n						<button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_32_BIT", {hash:{},data:data}))
    + "</button>\r\n						<button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_64_BIT", {hash:{},data:data}))
    + "</button>\r\n					</div>\r\n				</div>\r\n\r\n				<div class=\"ami-option-group\">\r\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</h5>\r\n					<div class=\"ami-option-wrap\" id=\"filter-ami-EBS-Instance\">\r\n						<button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_EBS", {hash:{},data:data}))
    + "</button>\r\n						<button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_INSTANCE_STORE", {hash:{},data:data}))
    + "</button>\r\n					</div>\r\n				</div>\r\n\r\n				<!-- <div id=\"ami-count\">Total: 0</div> -->\r\n\r\n				<div id=\"btn-search-ami\" class=\"btn btn-blue\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SEARCHING", {hash:{},data:data}))
    + "</div>\r\n			</div>\r\n\r\n			<div id=\"ami-data-wrap\">\r\n				<div id=\"ami-table-wrap\" class=\"table-head-fix\">\r\n					<table class=\"table-head\">\r\n						<thead>\r\n							<tr>\r\n								<th style=\"width: 44px;\"></th>\r\n								<th style=\"width: 104px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_ID", {hash:{},data:data}))
    + "</th>\r\n								<th>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_NAME", {hash:{},data:data}))
    + "</th>\r\n								<th style=\"width: 62px;padding-left:4px;text-align:left;\" class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SIZE", {hash:{},data:data}))
    + "</th>\r\n							</tr>\r\n						</thead>\r\n					</table>\r\n					<div class=\"scroll-wrap\">\r\n						<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n						<div class=\"show-loading\">\r\n							<div class=\"loading-spinner\"></div>\r\n						</div>\r\n						<div class=\"scroll-content\" style=\"display:block;\">\r\n							<table class=\"table\">\r\n								<thead>\r\n									<tr>\r\n										<th style=\"width: 16px;\"><div class=\"th-inner\"></div></th>\r\n										<th style=\"width: 80px;\"><div class=\"th-inner\"></div></th>\r\n										<th><div class=\"th-inner\"></div></th>\r\n										<th style=\"width: 42px;\"><div class=\"th-inner\"></div></th>\r\n									</tr>\r\n								</thead>\r\n								<tbody id=\"community_ami_table\"></tbody>\r\n							</table>\r\n						</div>\r\n					</div>\r\n				</div>\r\n\r\n				<div id=\"community-ami-page\">\r\n					<div class=\"page-tip\" style=\"display: none;\"></div>\r\n					<div class=\"pagination\" style=\"display: none;\">\r\n						<!-- <a href=\"#\" class=\"first\" data-action=\"first\">&laquo;</a> -->\r\n						<a href=\"#\" class=\"previous\" data-action=\"previous\">&lsaquo;</a>\r\n						<input type=\"text\" readonly=\"readonly\" data-max-page=\"40\" />\r\n						<a href=\"#\" class=\"next\" data-action=\"next\">&rsaquo;</a>\r\n						<!-- <a href=\"#\" class=\"last\" data-action=\"last\">&raquo;</a> -->\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });