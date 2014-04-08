define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- reconnectSession -->\r\n<div style=\"width:320px\" class=\"reconnect-session\">\r\n	<div class=\"modal-header\"> <h3>Reconnect Session</h3></div>\r\n	<div class=\"modal-body\">\r\n		<div>\r\n			<div class=\"modal-text-major\">Please provide your password to reconnect:</div>\r\n			<div class=\"modal-input\">\r\n				<div class=\"placeholder-input\" data-bind=\"ture\">\r\n					<input type=\"password\" id=\"input-demo\" class=\"input\" placeholder=\"Password\" data-required=\"true\" autofocus>\r\n				</div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"modal-footer\">\r\n		<button id=\"reconnect-ok\"    class=\"btn btn-blue\" disabled>OK</button>\r\n		<button id=\"reconnect-close\" class=\"btn btn-silver\">Close Session</button>\r\n	</div>\r\n</div>\r\n";
  }; return Handlebars.template(TEMPLATE); });