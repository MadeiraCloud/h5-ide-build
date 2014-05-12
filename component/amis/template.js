define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:855px;\" id=\"modal-browse-community-ami\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_COMMUNITY_AMIS", {hash:{},data:data}))
    + "</h3>\n		<i class=\"modal-close\">×</i>\n	</div>\n\n	<div class=\"modal-body\">\n		<div class=\"content-wrap\">\n			<div id=\"ami-search-option\">\n				<div>\n					<input id=\"community-ami-input\" class=\"input\" type=\"text\" placeholder=\"";
  stack1 = helpers.i18n.call(depth0, "AMI_LBL_ALL_SEARCH_AMI_BY_NAME_OR_ID", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\n				</div>\n\n				<div id=\"selectbox-ami-platform\" class=\"selectbox\">\n					<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li class=\"item selected\" data-id=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</li>\n						<li class=\"item\" data-id=\"amazonlinux\">\n							<i class=\"icon-amz-linux icon-ami-os\"></i>\n							<span>Amazon Linux</span>\n						</li>\n						<li class=\"item\" data-id=\"centos\">\n							<i class=\"icon-centos icon-ami-os\"></i>\n							<span>Cent OS</span>\n						</li>\n						<li class=\"item\" data-id=\"debian\">\n							<i class=\"icon-debian icon-ami-os\"></i>\n							<span>Debian</span>\n						</li>\n						<li class=\"item\" data-id=\"fedora\">\n							<i class=\"icon-fedora icon-ami-os\"></i>\n							<span>Fedora</span>\n						</li>\n						<li class=\"item\" data-id=\"gentoo\">\n							<i class=\"icon-gentoo icon-ami-os\"></i>\n							<span>Gentoo</span>\n						</li>\n						<li class=\"item\" data-id=\"opensuse\">\n							<i class=\"icon-opensuse icon-ami-os\"></i>\n							<span>OpenSUSE</span>\n						</li>\n						<li class=\"item\" data-id=\"ubuntu\">\n							<i class=\"icon-ubuntu icon-ami-os\"></i>\n							<span>Ubuntu</span>\n						</li>\n						<li class=\"item\" data-id=\"redhat\">\n							<i class=\"icon-redhat icon-ami-os\"></i>\n							<span>Red Hat</span>\n						</li>\n						<li class=\"item\" data-id=\"windows\">\n							<i class=\"icon-windows icon-ami-os\"></i>\n							<span>Windows</span>\n						</li>\n						<li class=\"item\" data-id=\"otherlinux\">\n							<i class=\"icon-linux-other icon-ami-os\"></i>\n							<span>Other Linux</span>\n						</li>\n					</ul>\n				</div>\n\n				<div class=\"ami-option-group\">\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_VISIBILITY", {hash:{},data:data}))
    + "</h5>\n					<div class=\"ami-option-wrap\" id=\"filter-ami-type\">\n						<button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PUBLIC", {hash:{},data:data}))
    + "</button>\n						<button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PRIVATE", {hash:{},data:data}))
    + "</button>\n					</div>\n				</div>\n\n				<div class=\"ami-option-group\">\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ARCHITECTURE", {hash:{},data:data}))
    + "</h5>\n					<div class=\"ami-option-wrap\" id=\"filter-ami-32bit-64bit\">\n						<button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_32_BIT", {hash:{},data:data}))
    + "</button>\n						<button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_64_BIT", {hash:{},data:data}))
    + "</button>\n					</div>\n				</div>\n\n				<div class=\"ami-option-group\">\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</h5>\n					<div class=\"ami-option-wrap\" id=\"filter-ami-EBS-Instance\">\n						<button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_EBS", {hash:{},data:data}))
    + "</button>\n						<button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_INSTANCE_STORE", {hash:{},data:data}))
    + "</button>\n					</div>\n				</div>\n\n				<!-- <div id=\"ami-count\">Total: 0</div> -->\n\n				<div id=\"btn-search-ami\" class=\"btn btn-blue\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SEARCHING", {hash:{},data:data}))
    + "</div>\n			</div>\n\n			<div id=\"ami-data-wrap\">\n				<div id=\"ami-table-wrap\" class=\"table-head-fix\">\n					<table class=\"table-head\">\n						<thead>\n							<tr>\n								<th style=\"width: 44px;\"></th>\n								<th style=\"width: 104px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_ID", {hash:{},data:data}))
    + "</th>\n								<th>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_NAME", {hash:{},data:data}))
    + "</th>\n								<th style=\"width: 62px;padding-left:4px;text-align:left;\" class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SIZE", {hash:{},data:data}))
    + "</th>\n							</tr>\n						</thead>\n					</table>\n					<div class=\"scroll-wrap\">\n						<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n						<div class=\"show-loading\">\n							<div class=\"loading-spinner\"></div>\n						</div>\n						<div class=\"scroll-content\" style=\"display:block;\">\n							<table class=\"table\">\n								<thead>\n									<tr>\n										<th style=\"width: 16px;\"><div class=\"th-inner\"></div></th>\n										<th style=\"width: 80px;\"><div class=\"th-inner\"></div></th>\n										<th><div class=\"th-inner\"></div></th>\n										<th style=\"width: 42px;\"><div class=\"th-inner\"></div></th>\n									</tr>\n								</thead>\n								<tbody id=\"community_ami_table\"></tbody>\n							</table>\n						</div>\n					</div>\n				</div>\n\n				<div id=\"community-ami-page\">\n					<div class=\"page-tip\" style=\"display: none;\"></div>\n					<div class=\"pagination\" style=\"display: none;\">\n						<!-- <a href=\"#\" class=\"first\" data-action=\"first\">&laquo;</a> -->\n						<a href=\"#\" class=\"previous\" data-action=\"previous\">&lsaquo;</a>\n						<input type=\"text\" readonly=\"readonly\" data-max-page=\"40\" />\n						<a href=\"#\" class=\"next\" data-action=\"next\">&rsaquo;</a>\n						<!-- <a href=\"#\" class=\"last\" data-action=\"last\">&raquo;</a> -->\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });