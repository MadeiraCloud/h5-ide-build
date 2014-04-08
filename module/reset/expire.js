define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"reset-form-wrap\" class=\"box-wrapper\">\r\n	<div class=\"box-header\">\r\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "reset", {hash:{},data:data}))
    + "</h2>\r\n	</div>\r\n	<p class=\"account-instruction-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "expired-info", {hash:{},data:data}))
    + "</p>\r\n	<p class=\"account-instruction\"><a href=\"/login\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-relogin", {hash:{},data:data}))
    + "</a></p>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });