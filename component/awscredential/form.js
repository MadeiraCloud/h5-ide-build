define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<li>\r\n	<i class=\"icon-info icon-label tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_TIP_AWS_ACCOUNT_ID", {hash:{},data:data}))
    + "'></i>\r\n	<label>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_ID", {hash:{},data:data}))
    + "</label>\r\n	<input autocomplete=\"off\" class=\"input\" id=\"aws-credential-account-id\" type=\"text\" />\r\n</li>\r\n<li>\r\n	<i class=\"icon-info icon-label tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_TIP_ACCOUNT_ACCESS_KEY", {hash:{},data:data}))
    + "'></i>\r\n	<label>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_ACCESS_KEY", {hash:{},data:data}))
    + "</label>\r\n	<input autocomplete=\"off\" class=\"input\" id=\"aws-credential-access-key\" type=\"text\" />\r\n</li>\r\n<li>\r\n	<i class=\"icon-info icon-label tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_TIP_ACCOUNT_SECRET_KEY", {hash:{},data:data}))
    + "'></i>\r\n	<label>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_SECRET_KEY", {hash:{},data:data}))
    + "</label>\r\n	<input autocomplete=\"off\" class=\"input\" id=\"aws-credential-secret-key\" type=\"text\" />\r\n</li>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });