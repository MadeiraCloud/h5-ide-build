define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<!-- AWSCredential -->\r\n<div id=\"account-setting-wrap\" class=\"modal-welcome\" style=\"width: 550px\">\r\n	<div class=\"modal-header\">\r\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_WELCOME", {hash:{},data:data}))
    + "</h3>\r\n		<i id=\"account-setting-close\">&times;</i>\r\n	</div>\r\n\r\n	<div class=\"modal-body\">\r\n\r\n		<div id=\"AWSCredential-setting\">\r\n			<div id=\"AWSCredential-info-wrap\">\r\n				<div id=\"AWSCredential-info\" class=\"AWSCredential-wall\">\r\n					<h4 id=\"AWSCredential-welcome\"></h4>\r\n					<p></p>\r\n				</div>\r\n			</div>\r\n			<img src=\"./assets/images/ide/welcome-img.png\" id=\"AWSCredential-welcome-img\" alt=\"\"/>\r\n\r\n			<div id=\"AWSCredential-form\">\r\n				<h4 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_PROVIDE_CREDENTIAL", {hash:{},data:data}))
    + "</h4>\r\n				<ul>\r\n					loading...\r\n				</ul>\r\n			</div>\r\n\r\n			<div id=\"AWSCredentials-submiting\">\r\n				"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_LOADING", {hash:{},data:data}))
    + "\r\n			</div>\r\n\r\n			<div id=\"AWSCredentials-update\">\r\n				<div class=\"AWSCredentials-body-info\">\r\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_ACCOUNT_LIST", {hash:{},data:data}))
    + "</h5>\r\n					<div class=\"AWSCredentials-account-info\">\r\n						<span id=\"aws-credential-update-account-id\">"
    + escapeExpression(((stack1 = (depth0 && depth0.account_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n					</div>\r\n				</div>\r\n			</div>\r\n\r\n		</div>\r\n\r\n	</div>\r\n\r\n	<div class=\"modal-footer\">\r\n		<div id=\"welcome-btn-wrap\">\r\n			<a id=\"awscredentials-skip\" data-type=\"skip\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_SKIP", {hash:{},data:data}))
    + "</a>\r\n			<button id=\"awscredentials-submit\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\r\n		</div>\r\n	</div>\r\n</div>\r\n\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });