define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "tooltip";
  }

function program3(depth0,data) {
  
  
  return "disabled";
  }

function program5(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<button class=\"btn-toolbar tooltip icon-export-png toolbar-btn-primary\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "' id=\"toolbar-export-png\" data-analytics-plus=\"export_vis_png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "</button>\n\n<button class=\"btn-toolbar icon-zoom-in ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_zoomin), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_ZOOM_IN", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar  icon-zoom-out seperator ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_zoomout), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_ZOOM_OUT", {hash:{},data:data}))
    + "'></button>\n\n\n<!-- line style -->\n<div class=\"selectbox btn-toolbar toolbar-line-style seperator\">\n  <button class=\"selection tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_LINESTYLE", {hash:{},data:data}))
    + "\" id=\"toolbar-line-style\"><i class=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></button>\n  <ul class=\"dropdown\">\n    <li id=\"toolbar-straight\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style0), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'> <i class=\"icon-straight\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_STRAIGHT", {hash:{},data:data}))
    + "</span></li>\n    <li id=\"toolbar-elbow\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style1), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'> <i class=\"icon-elbow\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_ELBOW", {hash:{},data:data}))
    + "</span></li>\n    <li id=\"toolbar-bezier-q\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style2), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'> <i class=\"icon-bezier-q\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_QUADRATIC_BELZIER", {hash:{},data:data}))
    + "</span></li>\n    <li id=\"toolbar-bezier-qt\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style3), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'><i class=\"icon-bezier-qt\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_SMOOTH_QUADRATIC_BELZIER", {hash:{},data:data}))
    + "</span></li>\n  </ul>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });