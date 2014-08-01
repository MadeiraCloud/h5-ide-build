define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\n	<h3>Validation</h3>\n	<i class=\"modal-close\">×</i>\n</div>\n<div class=\"modal-body\">\n	<div id=\"modal-validation-statusbar\">\n	</div>\n</div>";
  }; return Handlebars.template(TEMPLATE); });