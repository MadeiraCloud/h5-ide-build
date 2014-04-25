define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- invalidSession -->\n<div style=\"width:420px\" class=\"invalid-session\">\n	<div class=\"modal-header\"> <h3>Invalid Session</h3></div>\n	<div class=\"modal-body\">\n		<div>\n			<div class=\"modal-text-major\">Your account has signed in from other location or you last login has\n				timed out.</div>\n			<div class=\"modal-text-major\">Would you like to reconnect this session or close it?</div>\n			<div class=\"modal-text-minor\">If you have unsaved changes, close this session will cause all your change to lose.</div>\n		</div>\n	</div>\n		<div class=\"modal-footer\">\n			<button id=\"cidr-remove\" class=\"btn btn-blue modal-close\">Reconnect</button>\n			<button id=\"cidr-return\" class=\"btn btn-red\">Close Session</button>\n		</div>\n</div>";
  }; return Handlebars.template(TEMPLATE); });