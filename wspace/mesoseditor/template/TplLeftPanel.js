define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip sidebar-hider icon-caret-left HideOEPanelLeft\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'></button>\n<header class=\"sidebar-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RESOURCES", {hash:{},data:data}))
    + "</header>\n<section class=\"marathon-resource-panel\">\n    <div class=\"resource-list-head\">Marathon App</div>\n    <ul class=\"resource-list-az clearfix\">\n        <li class=\"tooltip resource-item marathon-group\" data-tooltip=\"Drag to the canvas to use this image\" data-type=\"MRTHGROUP\">\n            <div class=\"res-name\">App Group</div>\n        </li>\n    </ul>\n    <div class=\"resource-list-head\">Docker Container</div>\n    <ul class=\"nano-content resource-list-docker-image\"></ul>\n</section>";
  return buffer;
  };
TEMPLATE.panel=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item dockerimage bubble\" data-type=\"MRTHAPP\" data-option='{\"image\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"name\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-bubble-template=\"resPanelImageDocker\" data-bubble-data='"
    + escapeExpression(((stack1 = (depth0 && depth0.bubble)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n  <div class=\"resource-icon-docker-image\"><img src=\"/assets/images/ide/icon-mrth/icn-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width=\"32\" height=\"32\" /></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.docker_image=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.ID), {hash:{},data:data}))
    + "</div>\n<dl class=\"bubble-content dl-horizontal\">";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>";
  return buffer;
  };
TEMPLATE.resourcePanelBubble=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });