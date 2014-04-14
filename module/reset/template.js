define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"reset-form-wrap\" class=\"box-wrapper\">\n	<div class=\"box-header\">\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "pre-reset", {hash:{},data:data}))
    + "</h2>\n		<div class=\"title-link\">\n			<a href=\"/register/\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-register", {hash:{},data:data}))
    + "</a> / <a href=\"/login/\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-login", {hash:{},data:data}))
    + "</a>.\n		</div>\n	</div>\n	<p class=\"account-instruction\">"
    + escapeExpression(helpers.i18n.call(depth0, "email-label", {hash:{},data:data}))
    + "</p>\n\n	<form id=\"reset-form\" method=\"post\" action=\"\" class=\"box-body\">\n		<div id=\"email-verification-status\" class=\"verification-status\"></div>\n		<label for=\"reset-pw-email\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "account-label", {hash:{},data:data}))
    + "</label>\n		<input class=\"account-input\" autocomplete=\"off\" name=\"name\" class=\"reset-input\" type=\"text\" id=\"reset-pw-email\" />\n		<div class=\"account-btn-wrap\">\n			<input class=\"btn btn-primary btn-large account-btn\" id=\"reset-btn\" type=\"submit\" value=\""
    + escapeExpression(helpers.i18n.call(depth0, "reset-btn", {hash:{},data:data}))
    + "\" disabled>\n		</div>\n	</form>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });