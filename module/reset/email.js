define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"reset-form-wrap\" class=\"box-wrapper\">\r\n	<div class=\"box-header\">\r\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "pre-reset", {hash:{},data:data}))
    + "</h2>\r\n		<div class=\"title-link\">\r\n			<a href=\"/register\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-register", {hash:{},data:data}))
    + "</a> / <a href=\"/login\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-login", {hash:{},data:data}))
    + "</a>.\r\n		</div>\r\n	</div>\r\n	<p class=\"account-instruction-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "send-email-info", {hash:{},data:data}))
    + "</p>\r\n	<p class=\"account-instruction\">"
    + escapeExpression(helpers.i18n.call(depth0, "check-email-info", {hash:{},data:data}))
    + "</p>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });