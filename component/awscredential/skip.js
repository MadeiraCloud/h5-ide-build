define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<li id=\"welcome-skip-info\">\r\n\r\n<p class=\"welcome-skip-item\">- The demo mode may not reﬂect the real condition of resources available for your account.</p>\r\n<p class=\"welcome-skip-item\">- If you want to provide credentials later, design previously created in demo mode may not work due to resource inconsistency.</p>\r\n\r\n<p>You can provide AWS Credentials later from Settings in the top-right drop down.</p>\r\n</li>\r\n";
  }; return Handlebars.template(TEMPLATE); });