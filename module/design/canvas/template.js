define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n<div class=\"scrollbar-horizontal-wrap\"><div class=\"scrollbar-horizontal-thumb\"></div></div>\r\n<div id=\"canvas_content\" class=\"scroll-content\">\r\n<div id=\"canvas_container\">\r\n	<button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('height', 'expand')\"></button>\r\n	<button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('height', 'shrink')\"></button>\r\n\r\n	<button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('width', 'expand')\"></button>\r\n	<button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('width', 'shrink')\"></button>\r\n\r\n	<div id=\"canvas_body\" class=\"canvas-view-normal\">\r\n		<svg id=\"svg_canvas\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\">\r\n			<line id=\"svg_padding_line\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"/>\r\n			<g id=\"group_layer\">\r\n				<g id=\"vpc_layer\"></g>\r\n				<g id=\"az_layer\"></g>\r\n				<g id=\"subnet_layer\"></g>\r\n				<g id=\"asg_layer\"></g>\r\n			</g>\r\n			<g id=\"line_layer\"></g>\r\n			<g id=\"node_layer\"></g>\r\n		</svg>\r\n	</div>\r\n</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });