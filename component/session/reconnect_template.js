define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<!-- reconnectSession -->\n<div style=\"width:320px\" class=\"reconnect-session\">\n	<div class=\"modal-header\"> <h3>Reconnect Session</h3></div>\n	<div class=\"modal-body\">\n		<div>\n			<div class=\"modal-text-major\">Please provide your password to reconnect:</div>\n			<div class=\"modal-input\">\n				<div class=\"placeholder-input\" data-bind=\"ture\">\n					<input type=\"password\" id=\"input-demo\" class=\"input\" placeholder=\"Password\" data-required=\"true\" autofocus>\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"reconnect-ok\"    class=\"btn btn-blue\" disabled>OK</button>\n		<button id=\"reconnect-close\" class=\"btn btn-silver\">Close Session</button>\n	</div>\n</div>\n";
  }; return Handlebars.template(TEMPLATE); });