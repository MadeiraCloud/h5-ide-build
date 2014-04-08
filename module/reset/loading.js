define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n<div class=\"box-loading box-wrapper\">\n	<div class=\"loading-spinner\"></div>\n</div>";
  }; return Handlebars.template(TEMPLATE); });