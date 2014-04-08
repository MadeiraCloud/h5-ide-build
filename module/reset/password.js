define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "\n<div id=\"reset-form-wrap\" class=\"box-wrapper\">\n	<div class=\"box-header\">\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "reset", {hash:{},data:data}))
    + "</h2>\n	</div>\n	<form id=\"reset-form\" method=\"post\" action=\"\" class=\"box-body\">\n		<div id=\"password-verification-status\" class=\"verification-status\"></div>\n		<label for=\"reset-pw\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "reset-new-password", {hash:{},data:data}))
    + "</label>\n		<input autocomplete=\"off\" name=\"password\" class=\"account-input\" type=\"password\" id=\"reset-pw\">\n\n		<div class=\"account-btn-wrap\">\n			<input class=\"btn btn-primary btn-large account-btn\" id=\"reset-password\" type=\"submit\" value=\""
    + escapeExpression(helpers.i18n.call(depth0, "reset-done-btn", {hash:{},data:data}))
    + "\">\n		</div>\n	</form>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });