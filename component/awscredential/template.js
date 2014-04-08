define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<!-- AWSCredential -->\r\n<div id=\"account-setting-wrap\" style=\"width: 550px\">\r\n	<div class=\"modal-header\">\r\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_SETTING", {hash:{},data:data}))
    + "</h3>\r\n		<i id=\"account-setting-close\">&times;</i>\r\n	</div>\r\n\r\n	<div class=\"modal-body\">\r\n\r\n		<div id=\"account-setting-tab\">\r\n			<ul class=\"clearfix\">\r\n				<li><a href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT", {hash:{},data:data}))
    + "</a></li>\r\n				<li><a href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CREDENTIAL", {hash:{},data:data}))
    + "</a></li>\r\n			</ul>\r\n		</div>\r\n\r\n		<div id=\"account-profile-setting\" class=\"account-tab-content\">\r\n			<div id=\"account-profile-setting-body\">\r\n				<dl class=\"dl-horizontal\" id=\"account-profile-setting-username\">\r\n					<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_USERNAME", {hash:{},data:data}))
    + "</dt>\r\n					<dd id=\"account-profile-username\"></dd>\r\n				</dl>\r\n				<dl class=\"dl-horizontal\" id=\"account-profile-setting-email\">\r\n					<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_EMAIL", {hash:{},data:data}))
    + "</dt>\r\n					<dd id=\"account-email-change-wrap\">\r\n						<span id=\"account-profile-email\"></span>\r\n					</dd>\r\n\r\n					<dd id=\"account-email-input-wrap\">\r\n						<input id=\"account-email-input\" type=\"text\" class=\"input\"/>\r\n						<div id=\"email-verification-status\" class=\"verification-status\"></div>\r\n\r\n						<div id=\"account-email-update-btns\">\r\n							<a href=\"javascript:void(0)\" id=\"account-email-update\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</a>\r\n							<a href=\"javascript:void(0)\" id=\"account-email-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</a>\r\n						</div>\r\n					</dd>\r\n				</dl>\r\n\r\n				<a href=\"javascript:void(0)\" id=\"account-change-password\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CHANGE_PASSWORD", {hash:{},data:data}))
    + "</a>\r\n\r\n				<div id=\"account-password-wrap\">\r\n					<div id=\"account-passowrd-info\">\r\n					</div>\r\n\r\n					<dl class=\"dl-horizontal\">\r\n						<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n						<dd><input type=\"password\" class=\"input\" id=\"account-current-password\" /></dd>\r\n\r\n						<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HAED_LABEL_NEW_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n						<dd><input type=\"password\" class=\"input\" id=\"account-new-password\" /></dd>\r\n					</dl>\r\n\r\n					<div id=\"account-password-update-btns\">\r\n						<a href=\"javascript:void(0)\" id=\"account-password-update\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</a>\r\n						<a href=\"javascript:void(0)\" id=\"account-password-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</a>\r\n					</div>\r\n				</div>\r\n			</div>\r\n		</div>\r\n\r\n		<div id=\"AWSCredential-setting\" class=\"account-tab-content\">\r\n			<div id=\"AWSCredential-info-wrap\">\r\n				<div id=\"AWSCredential-info\" class=\"AWSCredential-wall\">\r\n					<p></p>\r\n				</div>\r\n				<!--div id=\"AWSCredential-failed\" class=\"AWSCredential-wall\">\r\n					<p>Authentication failed. Please check your AWS Credentials and try again.</p>\r\n				</div-->\r\n				<div id=\"AWSCredentials-remove-wrap\">\r\n					<div id=\"AWSCredential-remove-head\">\r\n						<p class=\"modal-text-major\"></p>\r\n					</div>\r\n					<div id=\"AWSCredential-remove-body\">\r\n						<p>\r\n							"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_REMOVE_CREDENTIAL1", {hash:{},data:data}))
    + "<br />\r\n							"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_REMOVE_CREDENTIAL2", {hash:{},data:data}))
    + "<br />\r\n							"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_REMOVE_CREDENTIAL3", {hash:{},data:data}))
    + "\r\n						</p>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n			<div id=\"AWSCredential-form\">\r\n				<ul>\r\n					"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_LOADING", {hash:{},data:data}))
    + "\r\n				</ul>\r\n\r\n				<div id=\"AWSCredential-setting-btn-wrap\">\r\n					<!-- <a href=\"/help\" id=\"AWSCredentials-link\" target=\"_blank\">Need help?</a> -->\r\n					<a href=\"javascript:void(0)\" id=\"awscredentials-remove\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_REMOVE_CREDENTIAL", {hash:{},data:data}))
    + "</a>\r\n					<button id=\"awscredentials-submit\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\r\n					<a href=\"javascript:void(0)\" id=\"awscredentials-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</a>\r\n				</div>\r\n			</div>\r\n\r\n			<div id=\"AWSCredentials-submiting\">\r\n				"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_LOADING", {hash:{},data:data}))
    + "\r\n			</div>\r\n\r\n			<div id=\"AWSCredentials-update\">\r\n				<div class=\"AWSCredentials-body-info\">\r\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_ACCOUNT_LIST", {hash:{},data:data}))
    + "</h5>\r\n					<div class=\"AWSCredentials-account-info\">\r\n						<span id=\"aws-credential-update-account-id\"></span>\r\n						<a class=\"AWSCredentials-account-update\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_UPDATE", {hash:{},data:data}))
    + "</a>\r\n					</div>\r\n\r\n					<div class=\"AWSCredentials-nochange-warn\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_WARN_UPDATE_CREDENTIAL", {hash:{},data:data}))
    + "</div>\r\n				</div>\r\n			</div>\r\n\r\n		</div>\r\n\r\n	</div>\r\n\r\n	<div class=\"modal-footer\">\r\n		<button id=\"close-awscredential\" class=\"btn btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CLOSE", {hash:{},data:data}))
    + "</button>\r\n	</div>\r\n</div>\r\n\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });