define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"register-success-wrap\" class=\"box-wrapper\">\n	<div class=\"box-header\">\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "register-success", {hash:{},data:data}))
    + "</h2>\n	</div>\n\n	<div class=\"box-body\">\n		<p class=\"account-instruction-major\">\n		"
    + escapeExpression(helpers.i18n.call(depth0, "account-instruction", {hash:{},data:data}))
    + "<br/>\n		</p>\n		<p style=\"text-align:center;margin-top:20px;\">\n			<button class=\"btn btn-primary btn-large\" id=\"register-get-start\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-get-start", {hash:{},data:data}))
    + "</button>\n		</p>\n	</div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });