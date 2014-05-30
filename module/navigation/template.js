define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<nav>\n	<button class=\"off-canvas-tab\" id=\"off-canvas-app\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_APPS", {hash:{},data:data}))
    + "</button>\n	<button class=\"off-canvas-tab selected\" id=\"off-canvas-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_STACKS", {hash:{},data:data}))
    + "</button>\n</nav>\n\n<section class=\"scroll-wrap\">\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<div class=\"scroll-content\">\n\n		<ul class=\"scroll-content hide\" id=\"nav-app-region\"></ul>\n\n		<div class=\"scroll-content\" id=\"nav-stack\">\n			<ul id=\"nav-stack-region\"></ul>\n			<ul id=\"nav-region-empty-list\"></ul>\n		</div>\n\n	</div>\n</section>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });