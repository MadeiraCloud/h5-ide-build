define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n	<h3 class=\"nav-stack-region-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.region_group)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.region_count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</h3>\n	<ul class=\"nav-region-list-items app-list\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_name_group), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-app-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"truncate nav-truncate icon-app-"
    + escapeExpression(helpers.tolower.call(depth0, (depth0 && depth0.state), {hash:{},data:data}))
    + "\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-["
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"nav-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.app_list), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.app_list_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n	<h3 class=\"nav-stack-region-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.region_group)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.region_count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")<button class=\"icon-new-stack tooltip create-new-stack\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "IDE_COM_CREATE_NEW_STACK", {hash:{},data:data}))
    + "'></button></h3>\n\n	<ul class=\"nav-region-list-items stack-list\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_name_group), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li data-region-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-stack-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"truncate nav-truncate icon-stack-nav\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n		";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.stack_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.stack_list_data=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.region_empty_list), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<ul class=\"nav-region-list\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_empty_list), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n\n		<div class=\"show-unused-region\">Show unused regions</div>\n	";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += " <li class=\"nav-stack-region-title\" data-empty-region-label=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"> "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " (0) <button class=\"icon-new-stack tooltip create-new-empty-stack\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "IDE_COM_CREATE_NEW_STACK", {hash:{},data:data}))
    + "'></button>\n			</li> ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<ul>\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_empty_list), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += " <li class=\"nav-stack-region-title\" data-empty-region-label=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\"> "
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " (0) <button class=\"icon-new-stack tooltip create-new-empty-stack\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "IDE_COM_CREATE_NEW_STACK", {hash:{},data:data}))
    + "'></button>\n		</li> ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stack_list), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.region_empty_list=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li>\n	<a href=\"javascript:void(0)\" class=\"truncate nav-truncate region-name\" data-region-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		"
    + escapeExpression(((stack1 = (depth0 && depth0.region_city)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n		<span class=\"nav-head-note\">"
    + escapeExpression(((stack1 = (depth0 && depth0.region_area)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</a>\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.region_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.region_list=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });