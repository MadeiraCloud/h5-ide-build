define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- invalidSession -->\r\n<div style=\"width:420px\" class=\"invalid-session\">\r\n	<div class=\"modal-header\"> <h3>Invalid Session</h3></div>\r\n	<div class=\"modal-body\">\r\n		<div>\r\n			<div class=\"modal-text-major\">Your account has signed in from other location or you last login has\r\n				timed out.</div>\r\n			<div class=\"modal-text-major\">Would you like to reconnect this session or close it?</div>\r\n			<div class=\"modal-text-minor\">If you have unsaved changes, close this session will cause all your change to lose.</div>\r\n		</div>\r\n	</div>\r\n		<div class=\"modal-footer\">\r\n			<button id=\"cidr-remove\" class=\"btn btn-blue modal-close\">Reconnect</button>\r\n			<button id=\"cidr-return\" class=\"btn btn-red\">Close Session</button>\r\n		</div>\r\n</div>";
  }; return Handlebars.template(TEMPLATE); });