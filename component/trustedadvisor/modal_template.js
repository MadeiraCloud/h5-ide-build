define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\r\n	<h3>Validation</h3>\r\n	<i class=\"modal-close\">×</i>\r\n</div>\r\n<div class=\"modal-body\">\r\n	<div id=\"modal-validation-statusbar\">\r\n	</div>\r\n</div>";
  }; return Handlebars.template(TEMPLATE); });