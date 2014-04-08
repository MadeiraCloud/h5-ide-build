define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"register-form-wrap\" class=\"box-wrapper\">\r\n	<div class=\"box-header\">\r\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "register", {hash:{},data:data}))
    + "</h2>\r\n		<div class=\"title-link\">\r\n			"
    + escapeExpression(helpers.i18n.call(depth0, "register-login", {hash:{},data:data}))
    + " <a href=\"/login\">"
    + escapeExpression(helpers.i18n.call(depth0, "link-login", {hash:{},data:data}))
    + "</a>.\r\n		</div>\r\n	</div>\r\n	<form id=\"register-form\" method=\"post\" action=\"\" class=\"box-body\">\r\n		<div class=\"control-group\">\r\n			<label for=\"register-username\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-username", {hash:{},data:data}))
    + "</label>\r\n			<input autocomplete=\"off\" id=\"register-username\" class=\"account-input\" type=\"text\"/>\r\n			<div id=\"username-verification-status\" class=\"\"></div>\r\n		</div>\r\n		<!-- <p>Alphanumerics and underscores only.</p> -->\r\n		<div class=\"control-group\">\r\n			<label for=\"register-email\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-email", {hash:{},data:data}))
    + "</label>\r\n			<input autocomplete=\"off\" id=\"register-email\" class=\"account-input\" type=\"text\"/>\r\n			<div id=\"email-verification-status\" class=\"\"></div>\r\n		</div>\r\n		<!-- <p>A valid email address. All e-mails from the system will be sent to this address. The e-mail address is not made public and will only be used if you wish to receive a new password or wish to receive certain news or notifications by e-mail.</p> -->\r\n		<div class=\"control-group\">\r\n			<label for=\"register-password\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-password", {hash:{},data:data}))
    + "</label>\r\n			<input autocomplete=\"off\" id=\"register-password\" class=\"account-input\" type=\"password\"/>\r\n			<div id=\"password-verification-status\" class=\"\"></div>\r\n			<!-- <p>At  least  6 character.</p> -->\r\n		</div>\r\n		<div class=\"account-btn-wrap\">\r\n			<div id=\"tos-wrap\">\r\n				"
    + escapeExpression(helpers.i18n.call(depth0, "register-policy", {hash:{},data:data}))
    + " <a target=\"_blank\" href=\"http://www.visualops.io/terms-conditions-privacy-policy\">"
    + escapeExpression(helpers.i18n.call(depth0, "link-policy", {hash:{},data:data}))
    + "</a>.\r\n			</div>\r\n\r\n			<input class=\"btn btn-primary btn-large account-btn\" id=\"register-btn\" type=\"submit\" value=\""
    + escapeExpression(helpers.i18n.call(depth0, "register-btn", {hash:{},data:data}))
    + "\" disabled>\r\n		</div>\r\n	</form>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });