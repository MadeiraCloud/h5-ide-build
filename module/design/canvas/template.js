define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scrollbar-horizontal-wrap\"><div class=\"scrollbar-horizontal-thumb\"></div></div>\n<div id=\"canvas_content\" class=\"scroll-content\">\n<div id=\"canvas_container\">\n	<button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('height', 'expand')\"></button>\n	<button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('height', 'shrink')\"></button>\n\n	<button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('width', 'expand')\"></button>\n	<button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('width', 'shrink')\"></button>\n\n	<div id=\"canvas_body\" class=\"canvas-view-normal\">\n		<svg id=\"svg_canvas\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\">\n			<line id=\"svg_padding_line\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"/>\n			<g id=\"group_layer\">\n				<g id=\"vpc_layer\"></g>\n				<g id=\"az_layer\"></g>\n				<g id=\"subnet_layer\"></g>\n				<g id=\"asg_layer\"></g>\n			</g>\n			<g id=\"line_layer\"></g>\n			<g id=\"node_layer\"></g>\n		</svg>\n	</div>\n</div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });