define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"jsonViewer\" style='width:46%;height:70%;top:2%;left:2%;z-index:94;box-shadow:rgba(0, 0, 0, 0.3) 0px 5px 30px;position:absolute;min-width:540px;'>\n\n<div class=\"modal-header\"> <h3>Data viewer</h3> <i class=\"modal-close\">×</i> </div>\n<div id=\"diffWrap\">\n  <div class=\"diffInputs clearfix\">\n    <input type=\"text\" id=\"diffSearch\" class=\"diffInput\" placeholder=\"uid | type | name\">\n    <select id=\"diffTypeSelect\" class=\"diffInput\">\n      <option value=\".\">All</option>\n    </select>\n    <button class=\"icon-refresh tooltip diffInput\" id=\"diffRefresh\" data-tooltip=\"Reload CanvasData\"></button>\n  </div>\n  <div id=\"diffInnerWrap\">\n    <div class=\"jsondiffContainer\" id=\"jsonCompContainer\"></div>\n    <div class=\"jsondiffContainer\" id=\"jsonLayoutContainer\"></div>\n    <div class=\"jsondiffContainer\" id=\"jsonAttrContainer\"></div>\n  </div>\n</div>\n\n</div>\n";
  }; return Handlebars.template(TEMPLATE); });