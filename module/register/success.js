define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"register-success-wrap\" class=\"box-wrapper\">\r\n	<div class=\"box-header\">\r\n		<h2>"
    + escapeExpression(helpers.i18n.call(depth0, "register-success", {hash:{},data:data}))
    + "</h2>\r\n	</div>\r\n\r\n	<div class=\"box-body\">\r\n		<p class=\"account-instruction-major\">\r\n		"
    + escapeExpression(helpers.i18n.call(depth0, "account-instruction", {hash:{},data:data}))
    + "<br/>\r\n		</p>\r\n		<p style=\"text-align:center;margin-top:20px;\">\r\n			<button class=\"btn btn-primary btn-large\" id=\"register-get-start\">"
    + escapeExpression(helpers.i18n.call(depth0, "register-get-start", {hash:{},data:data}))
    + "</button>\r\n		</p>\r\n	</div>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });