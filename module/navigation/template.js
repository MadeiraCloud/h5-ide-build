define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<nav>\r\n	<button class=\"off-canvas-tab\" id=\"off-canvas-app\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_APPS", {hash:{},data:data}))
    + "</button>\r\n	<button class=\"off-canvas-tab selected\" id=\"off-canvas-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_STACKS", {hash:{},data:data}))
    + "</button>\r\n</nav>\r\n\r\n<section class=\"scroll-wrap\">\r\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n	<div class=\"scroll-content\">\r\n\r\n		<ul class=\"scroll-content hide\" id=\"nav-app-region\"></ul>\r\n\r\n		<div class=\"scroll-content\" id=\"nav-stack\">\r\n			<ul id=\"nav-stack-region\"></ul>\r\n			<ul id=\"nav-region-empty-list\"></ul>\r\n		</div>\r\n\r\n	</div>\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });