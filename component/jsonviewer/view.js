define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"diffWrap\">\r\n  <div class=\"diffInputs clearfix\">\r\n    <input type=\"text\" id=\"diffSearch\" class=\"diffInput\" placeholder=\"uid | type | name\">\r\n    <select id=\"diffTypeSelect\" class=\"diffInput\">\r\n      <option value=\".\">All</option>\r\n    </select>\r\n    <button class=\"icon-refresh tooltip diffInput\" id=\"diffRefresh\" data-tooltip=\"Reload CanvasData\"></button>\r\n  </div>\r\n  <div id=\"diffInnerWrap\">\r\n    <div class=\"jsondiffContainer\" id=\"jsonCompContainer\"></div>\r\n    <div class=\"jsondiffContainer\" id=\"jsonLayoutContainer\"></div>\r\n    <div class=\"jsondiffContainer\" id=\"jsonAttrContainer\"></div>\r\n  </div>\r\n</div>\r\n\r\n<!--</div>-->";
  }; return Handlebars.template(TEMPLATE); });