define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"register-form-wrap\" class=\"box-wrapper\">\n	<div class=\"box-header\">\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "register", {hash:{},data:data}))
    + "</h2>\n		<div class=\"title-link\">\n			"
    + escapeExpression(helpers.i18n.call(depth0, "register-login", {hash:{},data:data}))
    + " <a href=\"/login\">"
    + escapeExpression(helpers.i18n.call(depth0, "link-login", {hash:{},data:data}))
    + "</a>.\n		</div>\n	</div>\n	<form id=\"register-form\" method=\"post\" action=\"\" class=\"box-body\">\n		<div class=\"control-group\">\n			<label for=\"register-username\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-username", {hash:{},data:data}))
    + "</label>\n			<input autocomplete=\"off\" id=\"register-username\" class=\"account-input\" type=\"text\"/>\n			<div id=\"username-verification-status\" class=\"\"></div>\n		</div>\n		<!-- <p>Alphanumerics and underscores only.</p> -->\n		<div class=\"control-group\">\n			<label for=\"register-email\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-email", {hash:{},data:data}))
    + "</label>\n			<input autocomplete=\"off\" id=\"register-email\" class=\"account-input\" type=\"text\"/>\n			<div id=\"email-verification-status\" class=\"\"></div>\n		</div>\n		<!-- <p>A valid email address. All e-mails from the system will be sent to this address. The e-mail address is not made public and will only be used if you wish to receive a new password or wish to receive certain news or notifications by e-mail.</p> -->\n		<div class=\"control-group\">\n			<label for=\"register-password\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-password", {hash:{},data:data}))
    + "</label>\n			<input autocomplete=\"off\" id=\"register-password\" class=\"account-input\" type=\"password\"/>\n			<div id=\"password-verification-status\" class=\"\"></div>\n			<!-- <p>At  least  6 character.</p> -->\n		</div>\n		<div class=\"account-btn-wrap\">\n			<div id=\"tos-wrap\">\n				"
    + escapeExpression(helpers.i18n.call(depth0, "register-policy", {hash:{},data:data}))
    + " <a target=\"_blank\" href=\"http://www.visualops.io/terms-conditions-privacy-policy\">"
    + escapeExpression(helpers.i18n.call(depth0, "link-policy", {hash:{},data:data}))
    + "</a>.\n			</div>\n\n			<input class=\"btn btn-primary btn-large account-btn\" id=\"register-btn\" type=\"submit\" value=\""
    + escapeExpression(helpers.i18n.call(depth0, "register-btn", {hash:{},data:data}))
    + "\" disabled>\n		</div>\n	</form>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });