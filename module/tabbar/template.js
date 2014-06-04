define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"clearfix tabbar-group\">\r\n	<li id=\"tab-bar-dashboard\" class=\"active\">\r\n		<a href=\"javascript:void(0)\" data-toggle=\"tab\"  class=\"truncate tab-bar-truncate\"><i class=\"icon-dashboard icon-tabbar-label\"></i>Global</a>\r\n	</li>\r\n</ul>";
  }; return Handlebars.template(TEMPLATE); });