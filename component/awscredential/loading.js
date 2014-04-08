define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"AWSCredentials-submiting-body\">\r\n	<div class=\"loading-spinner\" id=\"AWSCredentials-loading\"></div>\r\n	<span id=\"AWSCredentials-loading-text\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_CONNECTING", {hash:{},data:data}))
    + "</span>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });