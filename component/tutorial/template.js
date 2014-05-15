define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\n	<h3>Stack Design Tour</h3>\n	<i class=\"modal-close\">×</i>\n</div>\n\n<div id=\"guide-carousel\" class=\"carousel slide\" data-interval=\"false\" data-wrap=\"false\">\n	<div class=\"carousel-inner\">\n		<div class=\"item active\">\n			<div class=\"carousel-caption\">\n				<h4><span class=\"carousel-counter\">1</span>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_TOUR_DESIGN_DIAGRAM", {hash:{},data:data}))
    + "</h4>\n				<p>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_TOUR_DESIGN_DIAGRAM", {hash:{},data:data}))
    + "</p>\n			</div>\n			<div id=\"guide-video-0\" class=\"guide-class\" data-video-id=\"_rZfDyw25x0\"></div>\n		</div>\n\n		<div class=\"item\">\n			<div class=\"carousel-caption\">\n				<h4><span class=\"carousel-counter\">2</span>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_TOUR_CONNECT_PORT", {hash:{},data:data}))
    + "</h4>\n				<p>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_TOUR_CONNECT_PORT", {hash:{},data:data}))
    + "</p>\n			</div>\n			<div id=\"guide-video-1\" class=\"guide-class\" data-video-id=\"bvmgjqjPLps\"></div>\n		</div>\n\n		<div class=\"item\">\n			<div class=\"carousel-caption\">\n				<h4><span class=\"carousel-counter\">3</span>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_TOUR_CONFIG_PROPERTY", {hash:{},data:data}))
    + "</h4>\n				<p>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_TOUR_CONFIG_PROPERTY", {hash:{},data:data}))
    + "</p>\n			</div>\n			<div id=\"guide-video-2\" class=\"guide-class\" data-video-id=\"6eS-9uECTHs\"></div>\n		</div>\n\n		<div class=\"item\">\n			<div class=\"carousel-caption\">\n				<h4><span class=\"carousel-counter\">4</span>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_TOUR_DO_MORE", {hash:{},data:data}))
    + "</h4>\n				<p>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_TOUR_DO_MORE", {hash:{},data:data}))
    + "</p>\n			</div>\n			<div id=\"guide-video-3\" class=\"guide-class\" data-video-id=\"SIclqaNgBDs\"></div>\n		</div>\n	</div>\n\n	<div class=\"carousel-indicators-wrap\">\n		<ol class=\"carousel-indicators\">\n			<i data-target=\"#guide-carousel\" data-slide-to=\"0\" class=\"indicator-item active\"></i>\n			<i data-target=\"#guide-carousel\" data-slide-to=\"1\" class=\"indicator-item\"></i>\n			<i data-target=\"#guide-carousel\" data-slide-to=\"2\" class=\"indicator-item\"></i>\n			<i data-target=\"#guide-carousel\" data-slide-to=\"3\" class=\"indicator-item\"></i>\n		</ol>\n	</div>\n\n	<div class=\"carousel-btn\">\n		<a href=\"#guide-carousel\" class=\"carousel-previous btn btn-silver disabled\">< Previous</a>\n		<a href=\"#guide-carousel\" class=\"carousel-next btn btn-blue\">Next ></a>\n		<a class=\"carousel-done btn btn-blue modal-close\" style=\"display: none;\">Done</a>\n	</div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });