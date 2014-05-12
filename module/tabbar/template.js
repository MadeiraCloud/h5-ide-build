define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"clearfix tabbar-group\">\n	<li id=\"tab-bar-dashboard\" class=\"active\">\n		<a href=\"javascript:void(0)\" data-toggle=\"tab\"  class=\"truncate tab-bar-truncate\"><i class=\"icon-dashboard icon-tabbar-label\"></i>Global</a>\n	</li>\n</ul>\n";
  }; return Handlebars.template(TEMPLATE); });