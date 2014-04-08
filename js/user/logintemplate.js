define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"login-box\" class=\"box-wrapper clearfix\">\n	<div id=\"login-title\" class=\"box-header\">\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "login", {hash:{},data:data}))
    + "</h2><div id=\"login-register\"  class=\"title-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "login-register", {hash:{},data:data}))
    + "<a href=\"/register\" id=\"link-register\">"
    + escapeExpression(helpers.i18n.call(depth0, "link-register", {hash:{},data:data}))
    + "</a></div>\n	</div>\n	<form id=\"login-form\" method=\"post\" class=\"box-body\">\n		<div class=\"error-msg\" id=\"error-msg-1\">"
    + escapeExpression(helpers.i18n.call(depth0, "error-msg-1", {hash:{},data:data}))
    + "</div>\n		<div class=\"error-msg\" id=\"error-msg-2\">"
    + escapeExpression(helpers.i18n.call(depth0, "error-msg-2", {hash:{},data:data}))
    + "</div>\n		<div class=\"control-group\">\n			<input autocomplete=\"off\" id=\"login-user\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "login-user", {hash:{},data:data}))
    + "\" type=\"text\" class=\"account-input\" name=\"user_name\"/>\n			<label for=\"login-user\" class=\"icon-user login-label\"></label>\n		</div>\n		<div class=\"control-group\">\n			<input autocomplete=\"off\" id=\"login-password\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "login-password", {hash:{},data:data}))
    + "\" type=\"password\" class=\"account-input\" name=\"password\"/>\n			<label for=\"login-password\" class=\"icon-password login-label\"></label>\n		</div>\n		<div class=\"account-btn-wrap\">\n			<a href=\"/reset\" id=\"link-foget\" class=\"footer-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "link-foget", {hash:{},data:data}))
    + "</a>\n			<input id=\"login-btn\" type=\"submit\" value=\""
    + escapeExpression(helpers.i18n.call(depth0, "login-btn", {hash:{},data:data}))
    + "\" class=\"btn btn-primary btn-large account-btn\" data-loading-text=\""
    + escapeExpression(helpers.i18n.call(depth0, "login-loading", {hash:{},data:data}))
    + "\" disabled/>\n		</div>\n	</form>\n</div>\n<div id=\"footer-push\"></div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });