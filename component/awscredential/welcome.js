define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<!-- AWSCredential -->\n<div id=\"account-setting-wrap\" class=\"modal-welcome\" style=\"width: 550px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_WELCOME", {hash:{},data:data}))
    + "</h3>\n		<i id=\"account-setting-close\">&times;</i>\n	</div>\n\n	<div class=\"modal-body\">\n\n		<div id=\"AWSCredential-setting\">\n			<div id=\"AWSCredential-info-wrap\">\n				<div id=\"AWSCredential-info\" class=\"AWSCredential-wall\">\n					<h4 id=\"AWSCredential-welcome\"></h4>\n					<p></p>\n				</div>\n			</div>\n			<img src=\"./assets/images/ide/welcome-img.png\" id=\"AWSCredential-welcome-img\" alt=\"\"/>\n\n			<div id=\"AWSCredential-form\">\n				<h4 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_PROVIDE_CREDENTIAL", {hash:{},data:data}))
    + "</h4>\n				<ul>\n					loading...\n				</ul>\n			</div>\n\n			<div id=\"AWSCredentials-submiting\">\n				"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_LOADING", {hash:{},data:data}))
    + "\n			</div>\n\n			<div id=\"AWSCredentials-update\">\n				<div class=\"AWSCredentials-body-info\">\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_ACCOUNT_LIST", {hash:{},data:data}))
    + "</h5>\n					<div class=\"AWSCredentials-account-info\">\n						<span id=\"aws-credential-update-account-id\">"
    + escapeExpression(((stack1 = (depth0 && depth0.account_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n					</div>\n				</div>\n			</div>\n\n		</div>\n\n	</div>\n\n	<div class=\"modal-footer\">\n		<div id=\"welcome-btn-wrap\">\n			<a id=\"awscredentials-skip\" data-type=\"skip\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_SKIP", {hash:{},data:data}))
    + "</a>\n			<button id=\"awscredentials-submit\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\n		</div>\n	</div>\n</div>\n\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });