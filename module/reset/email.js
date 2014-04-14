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
    + "</a>.\n		</div>\n	</div>\n	<p class=\"account-instruction-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "send-email-info", {hash:{},data:data}))
    + "</p>\n	<p class=\"account-instruction\">"
    + escapeExpression(helpers.i18n.call(depth0, "check-email-info", {hash:{},data:data}))
    + "</p>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });