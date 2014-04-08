define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<li class=\"state-item view ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.cmd_value), "#", {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-command=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cmd_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		<div class=\"state-toolbar\">\n			<div class=\"state-action-wrap\">\n				<div class=\"state-remove icon-delete tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_DELETE_STATE", {hash:{},data:data}))
    + "\"></div>\n				<div class=\"state-check tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_SELECT_STATE", {hash:{},data:data}))
    + "\">\n					<div class=\"checkbox\">\n						<input id=\"state-check-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" name=\"state-check-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n						<label for=\"state-check-"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n					</div>\n				</div>\n			</div>\n			<i class=\"state-status-icon status status-yellow\"></i>\n			<i class=\"state-drag\"></i>\n			<div class=\"state-view\">\n				<div class=\"command-view-value\"></div>\n				<div class=\"parameter-view-list\">\n					";
  stack1 = self.invokePartial(partials.paraViewListTpl, 'paraViewListTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			</div>\n		</div>\n		<div class=\"state-edit clearfix\">\n			<div class=\"command-value editable-area line\">"
    + escapeExpression(((stack1 = (depth0 && depth0.cmd_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-list\">\n				";
  stack1 = self.invokePartial(partials.paraListTpl, 'paraListTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "comment";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.state_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.stateListTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_line), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_dict), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_array), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_bool), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_text), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_state), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item line ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_disabled), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">\n				"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<div class=\"parameter-container\">\n				<div class=\"parameter-value editable-area line\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</div>\n	";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "required";
  }

function program5(depth0,data) {
  
  
  return "optional";
  }

function program7(depth0,data) {
  
  
  return "disabled";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item dict ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_disabled), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">\n				"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<div class=\"parameter-container\">\n				";
  stack1 = self.invokePartial(partials.paraDictListTpl, 'paraDictListTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item array ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_disabled), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">\n				"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<div class=\"parameter-container\">\n				";
  stack1 = self.invokePartial(partials.paraArrayListTpl, 'paraArrayListTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item bool ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_disabled), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">\n				"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<div class=\"parameter-container\">\n				<div class=\"parameter-value editable-area line\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</div>\n	";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item text ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_disabled), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">\n				"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<div class=\"parameter-container\">\n				<div class=\"parameter-value editable-area text\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</div>\n	";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item state ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.required), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_disabled), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">\n				"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n			</div>\n			<div class=\"parameter-container\">\n				";
  stack1 = self.invokePartial(partials.paraArrayListTpl, 'paraArrayListTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.parameter_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.paraListTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_line), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_dict), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_array), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_bool), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_text), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_state), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item line ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_no_visible), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n	";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "no-visible";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item dict ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_no_visible), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n	";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item array ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_no_visible), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n	";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item bool ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_no_visible), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n	";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item text ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_no_visible), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n	";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"parameter-item state ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.para_no_visible), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-para-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<div class=\"parameter-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"parameter-value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.para_value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n	";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.parameter_view_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.paraViewListTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"parameter-dict-item\">\n		<div class=\"parameter-value editable-area line key\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<div class=\"parameter-value editable-area line value\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.para_value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.paraDictListTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"parameter-value editable-area line\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</div>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.para_value), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.paraArrayListTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"state-empty\">"
    + escapeExpression(((stack1 = (depth0 && depth0.tip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n\n";
  return buffer;
  };
TEMPLATE.stateEmptyTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"state-warning\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_UNKNOWN_DISTRO_LBL", {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n						<div class=\"state-item-add-btn btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_NO_STATE_ADD_BTN", {hash:{},data:data}))
    + "</div>\n					";
  return buffer;
  }

  buffer += "<div id=\"state-editor-model\" class=\"se-model-"
    + escapeExpression(((stack1 = (depth0 && depth0.current_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<div class=\"selectbox state-editor-res-select\" data-res-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.res_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		";
  stack1 = self.invokePartial(partials.stateResSelectTpl, 'stateResSelectTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n\n	<div id=\"state-editor-wrap\">\n		<div id=\"state-editor-body\">\n			<div id=\"state-editor\" spellcheck=\"false\" class=\"font-mono\">\n				";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.supported_platform), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n				<div class=\"state-no-state-container font-normal\">\n					<div class=\"state-no-data-tip\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_NO_STATE_LBL", {hash:{},data:data}))
    + "</div>\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.allow_add_state), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n\n				<div class=\"state-have-state-container\">\n					<div class=\"state-editor-toolbar clearfix font-normal\">\n						<a class=\"tooltip state-desc-toggle icon-desc\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_DESCRIPTION", {hash:{},data:data}))
    + "\"></a>\n						<a class=\"tooltip state-log-toggle icon-log\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_STATE_LOG", {hash:{},data:data}))
    + "\"></a>\n						<a class=\"tooltip state-log-refresh icon-refresh\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_REFRESH_STATE_LOG", {hash:{},data:data}))
    + "\"></a>\n						<a class=\"tooltip state-sys-log-btn icon-syslog\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_SYSTEM_LOG", {hash:{},data:data}))
    + "\"></a>\n\n						<div class=\"state-operate\">\n							<a id=\"state-toolbar-add\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_ADD_STATE", {hash:{},data:data}))
    + "</a>\n							<a id=\"state-toolbar-copy-all\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_COPY_ALL", {hash:{},data:data}))
    + "</a>\n							<a id=\"state-toolbar-copy\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_COPY_SELECTED", {hash:{},data:data}))
    + "(<span id=\"state-toolbar-copy-count\"></span>)</a>\n							<a id=\"state-toolbar-delete\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_DELETE", {hash:{},data:data}))
    + "(<span id=\"state-toolbar-delete-count\"></span>)</a>\n							<a id=\"state-toolbar-paste\" class=\"disabled\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_PASTE", {hash:{},data:data}))
    + "</a>\n							<a id=\"state-toolbar-undo\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_UNDO", {hash:{},data:data}))
    + "</a>\n							<a id=\"state-toolbar-redo\" href=\"javascript:void(0)\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TOOL_REDO", {hash:{},data:data}))
    + "</a>\n\n							<div id=\"state-toolbar-selectAll\" class=\"checkbox tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "STATE_TIP_SELECT_ALL_STATES", {hash:{},data:data}))
    + "\">\n								<input type=\"checkbox\" name=\"state-toolbar-selectAll\">\n								<label for=\"state-toolbar-selectAll\"></label>\n							</div>\n						</div>\n					</div>\n\n					<ol class=\"state-list\"></ol>\n\n				</div>\n			</div>\n		</div>\n	</div>\n\n	<div id=\"state-description\" data-command=\"\" class=\"state-sidebar\"></div>\n	<div id=\"state-log\" data-state-id=\"\" class=\"state-sidebar\">\n		<div class=\"state-log-header\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_TIT", {hash:{},data:data}))
    + "<span class=\"state-log-loading\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_LOADING_LBL", {hash:{},data:data}))
    + "</span></div>\n		<ul class=\"state-log-list\">\n			";
  stack1 = self.invokePartial(partials.stateLogInstanceItemTpl, 'stateLogInstanceItemTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = self.invokePartial(partials.stateLogItemTpl, 'stateLogItemTpl', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.editorModalTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li class=\"item ";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.res_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.res_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

  buffer += "<div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.res_selects)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.res_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<ul class=\"dropdown\" tabindex=\"-1\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.res_selects), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n\n";
  return buffer;
  };
TEMPLATE.stateResSelectTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<li class=\"state-log-item "
    + escapeExpression(((stack1 = (depth0 && depth0.state_status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.view), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_state_log), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-state-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		<div class=\"state-log-item-header\">\n			<div class=\"state-log-item-name\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.state_num), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.log_time), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<div class=\"state-log-item-status\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state_status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div>\n		<div class=\"state-log-item-content\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.comment), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stdout), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "view";
  }

function program4(depth0,data) {
  
  
  return "state-log";
  }

function program6(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.state_num)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"state-log-item-time\">"
    + escapeExpression(((stack1 = (depth0 && depth0.log_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<div class=\"state-log-item-detail comment\">"
    + escapeExpression(helpers.breaklines.call(depth0, (depth0 && depth0.comment), {hash:{},data:data}))
    + "</div>";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.long_stdout), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n					<a class=\"state-log-item-view-detail\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_VIEW_DETAIL", {hash:{},data:data}))
    + "</a>\n				";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n					<div class=\"state-log-item-detail stdout\">"
    + escapeExpression(helpers.breaklines.call(depth0, (depth0 && depth0.stdout), {hash:{},data:data}))
    + "</div>\n				";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.state_logs), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.stateLogItemTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.res_status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_ITEM_UNKNOWN", {hash:{},data:data}));
  }

  buffer += "<li class=\"state-log-item\">\n	<div class=\"state-log-item-header\">\n		<div class=\"state-log-item-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_ITEM_INSTANCE", {hash:{},data:data}))
    + "</div>\n		<div class=\"state-log-item-status\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.res_status), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	</div>\n</li>\n\n";
  return buffer;
  };
TEMPLATE.stateLogInstanceItemTpl=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div id=\"modal-state-log-detail\" style=\"width: 900px;\">\n	<div class=\"modal-header\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_DETAIL_MOD_TIT", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<textarea class=\"state-log-detail-content\" readonly=\"readonly\">"
    + escapeExpression(((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n	</div>\n	<div class=\"modal-footer\">\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATE_LOG_DETAIL_MOD_CLOSE_BTN", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n";
  return buffer;
  };
TEMPLATE.stateLogDetailModal=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });