define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"reset-form-wrap\" class=\"box-wrapper\">\n	<div class=\"box-header\">\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "reset", {hash:{},data:data}))
    + "</h2>\n	</div>\n	<p class=\"account-instruction-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "expired-info", {hash:{},data:data}))
    + "</p>\n	<p class=\"account-instruction\"><a href=\"/login/\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-relogin", {hash:{},data:data}))
    + "</a></p>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });