define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "disabled";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n<button class=\"btn-toolbar modal icon-delete tooltip seperator\" id=\"toolbar-delete\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_DELETE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_DELETE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_DELETE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"red\" }' data-modal-dismiss=\"true\"  data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DELETE_STACK", {hash:{},data:data}))
    + "'></button>\r\n";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n<button class=\"btn-toolbar disabled modal icon-delete tooltip seperator\" id=\"toolbar-delete\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DELETE_NEW_STACK", {hash:{},data:data}))
    + "'></button>\r\n";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n<button class=\"modal btn-toolbar tooltip icon-duplicate\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "' id=\"toolbar-duplicate\" data-modal-template=\"modalApp\" data-modal-data='{\"title\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_TIT_DUPLICATE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"body\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BODY_DUPLICATE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"input\":\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"confirm\":\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_POP_BTN_DUPLICATE_STACK", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\", \"color\":\"blue\" }' data-modal-dismiss=\"true\"></button>\r\n";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n<button class=\"btn-toolbar tooltip icon-duplicate disabled\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "'></button>\r\n";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "tooltip";
  }

function program13(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<button class=\"btn-toolbar icon-play tooltip toolbar-btn-primary ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_enable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"toolbar-run\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_BTN_RUN_STACK", {hash:{},data:data}))
    + "'>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_BTN_RUN_STACK", {hash:{},data:data}))
    + "</button>\r\n\r\n<button class=\"btn-toolbar tooltip icon-save ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_enable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_SAVE_STACK", {hash:{},data:data}))
    + "'></button>\r\n\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_delete), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_duplicate), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n<button class=\"btn-toolbar icon-new-stack tooltip seperator\" id=\"toolbar-new\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CREATE_STACK", {hash:{},data:data}))
    + "'></button>\r\n\r\n<button class=\"btn-toolbar icon-zoom-in ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_zoomin), {hash:{},inverse:self.program(1, program1, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "TOOL_TIP_ZOOM_IN", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\r\n<button class=\"btn-toolbar icon-zoom-out seperator ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.item_flags)),stack1 == null || stack1 === false ? stack1 : stack1.is_zoomout), {hash:{},inverse:self.program(1, program1, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "TOOL_TIP_ZOOM_OUT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\r\n\r\n<div class=\"selectbox btn-toolbar seperator\">\r\n	<button class=\"selection tooltip icon-send\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT", {hash:{},data:data}))
    + "' id=\"toolbar-export\"></button>\r\n\r\n	<ul class=\"dropdown\">\r\n		<li id=\"toolbar-export-png\"  data-analytics-plus=\"export_png\" class=\"icon-export-png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "</li>\r\n		<li id=\"toolbar-export-json\" data-analytics-plus=\"export_json\" class=\"icon-export-json\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</li>\r\n		<li id=\"toolbar-convert-cf\"  data-analytics-plus=\"cloudformation\" class=\"icon-toolbar-cloudformation\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_CF", {hash:{},data:data}))
    + "</li>\r\n	</ul>\r\n</div>\r\n\r\n<!-- line style -->\r\n<div class=\"selectbox btn-toolbar toolbar-line-style seperator\">\r\n	<button class=\"selection tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_LINESTYLE", {hash:{},data:data}))
    + "' id=\"toolbar-line-style\"><i class=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i></button>\r\n\r\n	<ul class=\"dropdown\">\r\n		<li id=\"toolbar-straight\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style0), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>\r\n			<i class=\"icon-straight\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_STRAIGHT", {hash:{},data:data}))
    + "</span></li>\r\n		<li id=\"toolbar-elbow\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style1), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'> <i class=\"icon-elbow\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_ELBOW", {hash:{},data:data}))
    + "</span></li>\r\n		<li id=\"toolbar-bezier-q\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style2), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'> <i class=\"icon-bezier-q\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_QUADRATIC_BELZIER", {hash:{},data:data}))
    + "</span></li>\r\n		<li id=\"toolbar-bezier-qt\" class='item ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.lines)),stack1 == null || stack1 === false ? stack1 : stack1.is_style3), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'><i class=\"icon-bezier-qt\"></i><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_SMOOTH_QUADRATIC_BELZIER", {hash:{},data:data}))
    + "</span></li>\r\n	</ul>\r\n</div>\r\n\r\n<label class=\"switch toolbar-visual-ops-switch tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CUSTOM_USER_DATA", {hash:{},data:data}))
    + "\">\r\n  <span class=\"switch-label\" data-on=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TOGGLE_VISUALOPS_ON", {hash:{},data:data}))
    + "\" data-off=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TOGGLE_VISUALOPS_OFF", {hash:{},data:data}))
    + "\"></span>\r\n  <span class=\"switch-handle\"></span>\r\n</label>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });