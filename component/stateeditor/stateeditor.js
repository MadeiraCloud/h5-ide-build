define('component/stateeditor/template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/stateeditor/validate',['Design', 'validation', 'constant', 'i18n!nls/lang.js', 'jquery', 'underscore', 'MC', 'UI.errortip'], function(Design, validationTA, constant, lang) {
    var Action, Helper, Message, Setup, TA, Validator, validate;
    TA = validationTA.state;
    Message = {};
    Setup = {
      before: function() {},
      after: function() {}
    };
    Validator = {
      command: function(val, param, elem, represent) {
        var map;
        val = Helper.trim(val);
        map = param.dataMap;
        if (!this.required(val)) {
          return 'Command name is required.';
        }
        if (!this.stateAllowed(val, map)) {
          return "Command \"" + val + "\" is not supported.";
        }
        return null;
      },
      parameter: function(val, param, elem, represent) {
        var result, validateList;
        validateList = ['required', 'type'];
        result = null;
        if (this[param.constraint.type]) {
          result = this[param.constraint.type](val, param, elem, represent);
        }
        if (!result) {
          result = this.componentExist(val);
        }
        return result;
      },
      dict: function(val, param, elem, represent) {
        var result, subType;
        subType = param.subType;
        result = null;
        if (param.constraint.required && subType === 'key' && !this.required(val)) {
          result = 'dict key is required';
        }
        return result;
      },
      array: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'array value is required';
        }
        return result;
      },
      line: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'line value is required';
        }
        return result;
      },
      text: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'text value is required';
        } else {
          result = this.componentExist(val);
        }
        return result;
      },
      bool: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'line value is required';
        } else if (!(this.isBool(val) || this.isStringBool(val, true))) {
          result = "invalid boolean value: \"" + val + "\"";
        }
        return result;
      },
      componentExist: function(val) {
        var inexsitCount, ref, refs, _i, _len;
        refs = Helper.getRefName(val);
        inexsitCount = 0;
        for (_i = 0, _len = refs.length; _i < _len; _i++) {
          ref = refs[_i];
          if (!Helper.nameExist(ref.name)) {
            inexsitCount++;
          }
        }
        if (inexsitCount) {
          return "Reference 'unknown' doesn't exist.";
        }
        return null;
      },
      required: function(val) {
        return this.notnull(val) && this.notblank(val);
      },
      notnull: function(val) {
        return val.length > 0;
      },
      notblank: function(val) {
        return 'string' === typeof val && '' !== val.replace(/^\s+/g, '').replace(/\s+$/g, '');
      },
      isBool: function(val) {
        return _.isBoolean(val);
      },
      isStringBool: function(val, allowEmpty) {
        return /^(true|false)$/i.test(val || allowEmpty && val === '');
      },
      stateAllowed: function(val, map) {
        return __indexOf.call(Helper.getAllowCommands(map), val) >= 0;
      }
    };
    Helper = {
      getAllowCommands: function(map) {
        return _.keys(map);
      },
      trim: function(val) {
        return $.trim(val);
      },
      nameExist: function(name) {
        var allCompData, component, uid;
        allCompData = Design.instance().serialize().component;
        for (uid in allCompData) {
          component = allCompData[uid];
          if (component.name === name) {
            return true;
          }
        }
        return false;
      },
      getRefName: function(val) {
        var reg, resArr, ret;
        reg = constant.REGEXP.stateEditorOriginReference;
        ret = [];
        while ((resArr = reg.exec(val)) !== null) {
          ret.push({
            name: resArr[1],
            ref: resArr[0]
          });
        }
        return ret;
      }
    };
    Action = {
      displayError: function(msg, elem, represent) {
        if (!errortip.hasError(elem)) {
          errortip.createError(msg, elem);
          return errortip.createError(msg, represent);
        } else {
          errortip.changeError(msg, elem);
          return errortip.changeError(msg, represent);
        }
      },
      clearError: function(elem, represent) {
        if (errortip.hasError(elem)) {
          errortip.removeError(elem);
          return errortip.removeError(represent);
        }
      }
    };
    validate = function(value, param, elem, represent) {
      var res;
      res = Validator[param.type](value, param, elem, represent);
      if (res) {
        Action.displayError(res, elem, represent);
      } else {
        Action.clearError(elem, represent);
      }
      return res;
    };
    _.extend(validate, Setup);
    return validate;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/stateeditor/view',['event', 'i18n!nls/lang.js', './template', './validate', 'constant', 'instance_model', './lib/markdown', 'UI.errortip'], function(ide_event, lang, template, validate, constant, instance_model, Markdown) {
    var StateEditorView, id, tpl;
    for (id in template) {
      tpl = template[id];
      Handlebars.registerPartial(id, tpl);
    }
    StateEditorView = Backbone.View.extend({
      events: {
        'closed': 'closedPopup',
        'blur .parameter-item.dict .parameter-value': 'onDictInputBlur',
        'keyup .parameter-item.dict .parameter-value': 'onDictInputChange',
        'paste .parameter-item.dict .parameter-value': 'onDictInputChange',
        'keyup .parameter-item.array .parameter-value': 'onArrayInputChange',
        'paste .parameter-item.array .parameter-value': 'onArrayInputChange',
        'keyup .parameter-item.state .parameter-value': 'onArrayInputChange',
        'paste .parameter-item.state .parameter-value': 'onArrayInputChange',
        'blur .parameter-item.array .parameter-value': 'onArrayInputBlur',
        'blur .parameter-item.state .parameter-value': 'onArrayInputBlur',
        'blur .command-value': 'onCommandInputBlur',
        'focus .editable-area': 'onFocusInput',
        'blur .editable-area': 'onBlurInput',
        'click #state-toolbar-add': 'addStateItem',
        'click #state-toolbar-copy-all': 'copyAllState',
        'click #state-toolbar-copy': 'copyState',
        'click #state-toolbar-delete': 'removeState',
        'click #state-toolbar-paste': 'pasteState',
        'click #state-toolbar-undo': 'onUndo',
        'click #state-toolbar-redo': 'onRedo',
        'click #state-toolbar-selectAll': 'onSelectAllClick',
        'click .state-toolbar': 'onStateToolbarClick',
        'click .state-toolbar .checkbox': 'checkboxSelect',
        'click .state-toolbar .state-remove': 'onStateRemoveClick',
        'click .state-save': 'onStateSaveClick',
        'click .state-cancel': 'onStateCancelClick',
        'click .state-close': 'onStateCancelClick',
        'click .parameter-item .parameter-remove': 'onParaRemoveClick',
        'click .state-desc-toggle': 'onDescToggleClick',
        'click .state-log-toggle': 'onLogToggleClick',
        'click .state-log-refresh': 'onLogRefreshClick',
        'click .state-sys-log-btn': 'openSysLogModal',
        'click .state-item-add': 'onStateItemAddClick',
        'click .state-item-add-btn': 'onStateItemAddBtnClick',
        'click #state-editor': 'onClickBlank',
        'click .state-log-item-header': 'onStateLogItemHeaderClick',
        'click .state-log-item .state-log-item-view-detail': 'onStateLogDetailBtnClick',
        'OPTION_CHANGE .state-editor-res-select': 'onResSelectChange',
        'keyup .parameter-item.optional .parameter-value': 'onOptionalParaItemChange',
        'paste .parameter-item.optional .parameter-value': 'onOptionalParaItemChange',
        'click .parameter-item .parameter-name': 'onParaNameClick',
        'SWITCH_STATE': 'onSwitchState',
        'EXPAND_STATE': 'onExpandState',
        'COLLAPSE_STATE': 'onCollapseState',
        'REMOVE_STATE': 'onRemoveState',
        'ACE_TAB_SWITCH': 'aceTabSwitch',
        'ACE_UTAB_SWITCH': 'aceUTabSwitch'
      },
      editorShow: false,
      initialize: function() {},
      initState: function() {
        this.initData();
        this.initUndoManager();
        return $(document).off('keydown', this.keyEvent).on('keydown', {
          target: this
        }, this.keyEvent);
      },
      closedPopup: function() {
        this.trigger('CLOSE_POPUP');
        return $(document).off('keydown', this.keyEvent);
      },
      render: function() {
        var compData, that, _ref;
        that = this;
        compData = this.model.get('compData');
        that.initState();
        if (that.isWindowsPlatform) {
          this.__renderEmpty('is_windows');
          return that;
        }
        if (Design.instance().get('agent').enabled) {
          if (compData && ((_ref = compData.type) === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance || _ref === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration)) {
            this.__renderState();
          } else {
            this.__renderEmpty();
          }
        } else {
          this.__renderEmpty('disalbed');
        }
        return this;
      },
      __renderEmpty: function(type) {
        var tip, tipSet;
        tipSet = {
          disalbed: 'VisualOps is disabled.',
          "void": "The component does'nt have state editor.",
          group: 'View states and log by selecting individual instance.',
          "default": 'No state editor here.',
          group_in_app: 'View states and log by selecting individual instance.',
          is_windows: 'Editing state is only available for Linux platform.'
        };
        tip = type && tipSet[type] || tipSet["default"];
        this.$el.html($.trim(template.stateEmptyTpl({
          tip: tip
        })));
        this.editorShow = false;
        return this;
      },
      renderStateCount: function() {
        var count;
        count = this.$stateList.find('.state-item').length;
        return $('#btn-switch-state b').text("(" + count + ")");
      },
      __renderState: function() {
        var $aceAutocompleteTip, $logPanel, $logPanelRefresh, $logPanelToggle, $logSysBtn, $stateItemList, currentAppState, docMouseDownFunc, onPasteGistData, stateObj, that, _ref, _ref1;
        this.editorShow = true;
        that = this;
        that.unloadEditor();
        this.$el.html($.trim(template.editorModalTpl({
          res_name: that.resName,
          supported_platform: that.supportedPlatform,
          current_state: that.currentState,
          no_state: that.resNoState,
          allow_add_state: ((_ref = that.currentState) === 'stack' || _ref === 'appedit')
        })), false, null, {
          opacity: 0.2,
          conflict: 'loose'
        });
        that.$editorModal = that.$el;
        that.$stateList = that.$editorModal.find('.state-list');
        that.$stateLogList = that.$editorModal.find('.state-log-list');
        that.$cmdDsec = that.$('#state-description');
        that.$noStateContainer = that.$editorModal.find('.state-no-state-container');
        that.$haveStateContainer = that.$editorModal.find('.state-have-state-container');
        that.$stateGistPasteArea = this.$('#state-gist-paste-area');
        if (that.resNoState) {
          that.$haveStateContainer.hide();
          that.$noStateContainer.show();
        } else {
          that.$haveStateContainer.show();
          that.$noStateContainer.hide();
        }
        docMouseDownFunc = jQuery.proxy(that.onDocumentMouseDown, that);
        $(document).off('mousedown', docMouseDownFunc).on('mousedown', docMouseDownFunc);
        onPasteGistData = jQuery.proxy(that.onPasteGistData, that);
        $(document).off('paste', onPasteGistData).on('paste', onPasteGistData);
        that.$('#state-editor').on('scroll', function() {
          return that.$('.ace_editor.ace_autocomplete').hide();
        });
        stateObj = that.loadStateData(that.originCompStateData);
        that.refreshStateList(stateObj);
        $stateItemList = that.$stateList.find('.state-item');
        that.refreshStateViewList($stateItemList);
        that.bindStateListSortEvent();
        if (that.readOnlyMode) {
          that.setEditorReadOnlyMode();
        }
        that.refreshDescription();
        that.onLogRefreshClick();
        if (that.isShowLogPanel) {
          that.showLogPanel();
        }
        $logPanelToggle = that.$editorModal.find('.state-log-toggle');
        $logPanelRefresh = that.$editorModal.find('.state-log-refresh');
        $logSysBtn = that.$editorModal.find('.state-sys-log-btn');
        $logPanel = $('#state-log');
        if (that.currentState === 'stack') {
          $logPanelToggle.hide();
        } else if ((_ref1 = that.currentState) === 'app' || _ref1 === 'appedit') {
          currentAppState = Design.instance().get('state');
          if (currentAppState === 'Stopped') {
            $logPanelToggle.hide();
            $logPanelRefresh.hide();
            if (!that.currentResId) {
              $logSysBtn.hide();
            }
          } else {
            setTimeout(function() {
              return that.onLogToggleClick();
            }, 0);
          }
        }
        $aceAutocompleteTip = $('.ace_autocomplete_tip');
        if (!$aceAutocompleteTip.length) {
          $('body').append('<div class="ace_autocomplete_tip">No result matches the input</div>');
        }
        that.$aceAutocompleteTip = $('.ace_autocomplete_tip');
        that.updateToolbar();
        return this;
      },
      initData: function() {
        var currentAppState, that;
        that = this;
        that.cmdNameAry = that.model.get('cmdNameAry');
        that.cmdParaMap = that.model.get('cmdParaMap');
        that.cmdParaObjMap = that.model.get('cmdParaObjMap');
        that.cmdModuleMap = that.model.get('cmdModuleMap');
        that.moduleCMDMap = that.model.get('moduleCMDMap');
        that.langTools = ace.require('ace/ext/language_tools');
        that.Tokenizer = ace.require("ace/tokenizer").Tokenizer;
        that.resAttrDataAry = that.model.get('resAttrDataAry');
        that.resStateDataAry = that.model.get('resStateDataAry');
        that.groupResSelectData = that.model.get('groupResSelectData');
        that.originCompStateData = that.model.getStateData();
        that.resName = that.model.getResName();
        that.supportedPlatform = that.model.get('supportedPlatform');
        that.isWindowsPlatform = that.model.get('isWindowsPlatform');
        that.currentResId = that.model.get('resId');
        that.currentState = that.model.get('currentState');
        currentAppState = that.model.get('currentAppState');
        that.resAttrRegexStr = that.model.get('resAttrRegexStr');
        that.markdownConvert = new Markdown.Converter();
        that.generalTip = lang.ide.STATE_HELP_INTRO_LBL;
        that.resNoState = true;
        if (that.originCompStateData && _.isArray(that.originCompStateData) && that.originCompStateData.length) {
          that.resNoState = false;
        }
        if (that.currentState === 'app') {
          that.readOnlyMode = true;
          that.isShowLogPanel = true;
          that.setEditorAppModel();
        }
        if (that.currentState === 'appedit') {
          that.readOnlyMode = false;
          that.isShowLogPanel = true;
          return that.setEditorAppModel();
        } else if (that.currentState === 'stack') {
          that.readOnlyMode = false;
          return that.isShowLogPanel = false;
        }
      },
      setEditorAppModel: function() {
        var that;
        that = this;
        if ((!that.currentResId) && that.groupResSelectData && that.groupResSelectData[0]) {
          that.currentResId = that.groupResSelectData[0].res_id;
        }
        if (!that.currentResId) {
          that.isShowLogPanel = false;
        }
        return null;
      },
      genStateUID: function() {
        return 'state-' + MC.guid();
      },
      bindStateListSortEvent: function() {
        var that;
        that = this;
        return that.$stateList.dragsort({
          itemSelector: '.state-item',
          dragSelector: '.state-drag',
          dragBetween: true,
          placeHolderTemplate: '<div class="state-item state-placeholder"></div>',
          dragStart: function(stateItem) {
            var $stateItem;
            $stateItem = $(stateItem);
            return that.collapseItem($stateItem);
          },
          dragEnd: function(stateItem, oldIndex) {
            var $stateItem, newIndex, stateId;
            $stateItem = $(stateItem);
            newIndex = $stateItem.index();
            stateId = $stateItem.attr('data-id');
            if (oldIndex !== newIndex) {
              that.undoManager.register(stateId, oldIndex, 'sort', newIndex);
            }
            return that.refreshLogItemNum();
          }
        });
      },
      onLogRefreshClick: function(event) {
        var that;
        that = this;
        return that.onResSelectChange();
      },
      refreshStateList: function(stateListObj) {
        var $stateItems, that;
        that = this;
        if (!(stateListObj && stateListObj.state_list.length)) {
          stateListObj = {
            state_list: []
          };
        }
        that.$stateList.html($.trim(template.stateListTpl(stateListObj)));
        return $stateItems = that.$stateList.find('.state-item');
      },
      refreshStateViewList: function($stateItemList) {
        var $lastArrayInputListAry, $lastDictInputList, $lastInputListAry, $lastStateInputListAry, that;
        that = this;
        _.each($stateItemList, function(stateItem) {
          var $stateItem;
          $stateItem = $(stateItem);
          that.refreshStateView($stateItem);
          return null;
        });
        if (!that.readOnlyMode) {
          $lastDictInputList = $stateItemList.find('.parameter-item.dict .parameter-dict-item:last .key');
          _.each($lastDictInputList, function(lastDictInput) {
            return that.onDictInputChange({
              currentTarget: lastDictInput
            }, true);
          });
          $lastArrayInputListAry = $stateItemList.find('.parameter-item.array .parameter-value:last').toArray();
          $lastStateInputListAry = $stateItemList.find('.parameter-item.state .parameter-value:last').toArray();
          $lastInputListAry = $lastArrayInputListAry.concat($lastStateInputListAry);
          return _.each($lastInputListAry, function(lastInput) {
            return that.onArrayInputChange({
              currentTarget: lastInput
            }, true);
          });
        }
      },
      refreshStateView: function($stateItem) {
        var $cmdValueElem, $cmdViewValueElem, $paraItemList, $paraListElem, $paraViewListElem, cmdName, cmdValue, currentParaMap, mustShowPara, paraListViewRenderAry, that;
        that = this;
        cmdName = $stateItem.attr('data-command');
        currentParaMap = that.cmdParaObjMap[cmdName];
        $cmdViewValueElem = $stateItem.find('.command-view-value');
        $paraListElem = $stateItem.find('.parameter-list');
        $paraViewListElem = $stateItem.find('.parameter-view-list');
        $paraItemList = $paraListElem.find('.parameter-item');
        $cmdValueElem = $stateItem.find('.state-edit .command-value');
        cmdValue = that.getPlainText($cmdValueElem);
        $cmdViewValueElem.text(cmdValue);
        paraListViewRenderAry = [];
        mustShowPara = true;
        _.each(currentParaMap, function(paraObj) {
          if (paraObj.visible) {
            mustShowPara = false;
          }
          return null;
        });
        _.each($paraItemList, function(paraItemElem) {
          var $paraDictItems, $paraItem, $valueInput, $valueInputs, paraName, paraNoVisible, paraObj, paraType, paraValue, paraValueAry, valueValue, viewRenderObj;
          $paraItem = $(paraItemElem);
          paraName = $paraItem.attr('data-para-name');
          paraObj = currentParaMap[paraName];
          paraType = paraObj.type;
          paraName = paraObj.name;
          paraNoVisible = true;
          if (mustShowPara) {
            paraNoVisible = false;
          } else {
            if (paraObj.visible) {
              if (paraObj.required) {
                paraNoVisible = false;
              } else {
                if (!$paraItem.hasClass('disabled')) {
                  paraNoVisible = false;
                }
              }
            }
          }
          viewRenderObj = {
            para_name: paraName,
            para_no_visible: paraNoVisible
          };
          viewRenderObj['type_' + paraType] = true;
          paraValue = '';
          if (paraType === 'dict') {
            $paraDictItems = $paraItem.find('.parameter-dict-item');
            paraValueAry = [];
            _.each($paraDictItems, function(paraDictItem) {
              var $keyInput, $paraDictItem, $valueInput, keyValue, valueValue;
              $paraDictItem = $(paraDictItem);
              $keyInput = $paraDictItem.find('.key');
              $valueInput = $paraDictItem.find('.value');
              keyValue = that.getPlainText($keyInput);
              valueValue = that.getPlainText($valueInput);
              if (keyValue && valueValue) {
                paraValueAry.push(keyValue + ':' + valueValue);
              }
              if (keyValue && !valueValue) {
                paraValueAry.push(keyValue);
              }
              return null;
            });
            paraValue = paraValueAry.join(', ');
          } else if (paraType === 'array' || paraType === 'state') {
            $valueInputs = $paraItem.find('.parameter-value');
            paraValueAry = [];
            _.each($valueInputs, function(valueInput) {
              var $valueInput, valueValue;
              $valueInput = $(valueInput);
              valueValue = that.getPlainText($valueInput);
              if (valueValue) {
                return paraValueAry.push(valueValue);
              }
            });
            paraValue = paraValueAry.join(', ');
          } else if (paraType === 'line' || paraType === 'text' || paraType === 'bool' || paraType === 'state') {
            $valueInput = $paraItem.find('.parameter-value');
            valueValue = that.getPlainText($valueInput);
            paraValue = valueValue;
            if (paraType === 'bool') {
              if (paraValue === 'true') {
                paraValue = paraName;
              } else {
                viewRenderObj.para_no_visible = true;
              }
            }
          }
          viewRenderObj.para_value = paraValue;
          if (paraValue) {
            paraListViewRenderAry.push(viewRenderObj);
          }
          return null;
        });
        return $paraViewListElem.html($.trim(template.paraViewListTpl({
          parameter_view_list: paraListViewRenderAry
        })));
      },
      bindStateListEvent: function($stateItems) {
        var that;
        that = this;
        return _.each($stateItems, function(stateItem) {
          var $cmdValueItem, $stateItem;
          $stateItem = $(stateItem);
          $cmdValueItem = $stateItem.find('.command-value');
          that.bindCommandEvent($cmdValueItem);
          return null;
        });
      },
      bindCommandEvent: function($cmdValueItem) {
        var cmdNameAry, that;
        that = this;
        cmdNameAry = that.cmdNameAry;
        cmdNameAry = _.map(cmdNameAry, function(value, i) {
          var metaStr;
          metaStr = '';
          if (value.support === false) {
            metaStr = 'not supported';
          }
          return {
            'name': value.name,
            'value': value.name,
            'meta': metaStr,
            'support': value.support
          };
        });
        return that.initCodeEditor($cmdValueItem[0], {
          focus: cmdNameAry
        });
      },
      bindParaListEvent: function($paraListElem, currentCMD) {
        var that;
        that = this;
        return setTimeout(function() {
          var $paraItemList, currentParaMap;
          $paraItemList = $paraListElem.find('.parameter-item');
          currentParaMap = that.cmdParaObjMap[currentCMD];
          return _.each($paraItemList, function(paraItem) {
            var $paraItem, currentParaName, paraObj;
            $paraItem = $(paraItem);
            currentParaName = $paraItem.attr('data-para-name');
            paraObj = currentParaMap[currentParaName];
            that.bindParaItemEvent($paraItem, paraObj);
            return null;
          });
        }, 0);
      },
      bindParaItemEvent: function($paraItem, paraObj) {
        var $commentStateItem, $firstInput, $inputElem, $inputElemAry, firstEditor, haveAtDataAry, paraOption, paraOptionAry, paraType, that;
        that = this;
        paraType = paraObj.type;
        paraOption = paraObj.option;
        paraOptionAry = null;
        if (paraOption) {
          if (_.isString(paraOption)) {
            paraOptionAry = [paraOption];
          } else if (_.isArray(paraOption)) {
            paraOptionAry = paraOption;
          }
          paraOptionAry = _.map(paraOptionAry, function(valueStr) {
            return {
              name: valueStr,
              value: valueStr
            };
          });
        }
        if (paraType === 'dict') {
          return _.each($paraItem, function(paraDictItem) {
            var $keyInputs, $paraDictItem, $valueInputs;
            $paraDictItem = $(paraDictItem);
            $keyInputs = $paraDictItem.find('.key');
            $valueInputs = $paraDictItem.find('.value');
            _.each($keyInputs, function(keyInput) {
              return that.initCodeEditor(keyInput, {});
            });
            return _.each($valueInputs, function(valueInput) {
              return that.initCodeEditor(valueInput, {
                focus: paraOptionAry,
                at: that.resAttrDataAry
              });
            });
          });
        } else if (paraType === 'line' || paraType === 'text' || paraType === 'array') {
          $inputElemAry = $paraItem.find('.parameter-value');
          if (!$inputElemAry.length) {
            $inputElemAry = $paraItem.nextAll('.parameter-value');
          }
          _.each($inputElemAry, function(inputElem) {
            return that.initCodeEditor(inputElem, {
              focus: paraOptionAry,
              at: that.resAttrDataAry
            });
          });
          $commentStateItem = $paraItem.parents('.state-item.comment');
          $firstInput = $commentStateItem.find('.parameter-value');
          firstEditor = $firstInput.data('editor');
          if (firstEditor) {
            return firstEditor.focus();
          }
        } else if (paraType === 'state') {
          $inputElemAry = $paraItem.find('.parameter-value');
          if (!$inputElemAry.length) {
            $inputElemAry = $paraItem.nextAll('.parameter-value');
          }
          haveAtDataAry = _.map(that.resStateDataAry, function(stateRefObj) {
            return {
              name: '@' + stateRefObj.name,
              value: '@' + stateRefObj.value,
              meta: stateRefObj.meta
            };
          });
          return _.each($inputElemAry, function(inputElem) {
            return that.initCodeEditor(inputElem, {
              focus: haveAtDataAry
            });
          });
        } else if (paraType === 'bool') {
          $inputElem = $paraItem.find('.parameter-value');
          return that.initCodeEditor($inputElem[0], {
            focus: [
              {
                name: 'true',
                value: 'true'
              }, {
                name: 'false',
                value: 'false'
              }
            ]
          });
        }
      },
      unBindParaListEvent: function($paraListElem) {
        var that;
        that = this;
        return setTimeout(function() {
          var $editInputs;
          $editInputs = $paraListElem.find('.editable-area');
          return _.each($editInputs, function(editInput) {
            var $editInput, editor;
            $editInput = $(editInput);
            editor = $editInput.data('editor');
            if (editor) {
              return editor.destroy();
            }
          });
        }, 0);
      },
      refreshDescription: function(cmdName) {
        var descHTML, descMarkdown, moduleObj, that;
        that = this;
        descMarkdown = '';
        if (cmdName) {
          moduleObj = that.cmdModuleMap[cmdName];
          if (moduleObj.reference) {
            descMarkdown = moduleObj.reference.en;
          }
          that.$cmdDsec.attr('data-command', cmdName);
        } else {
          descHTML = that.generalTip;
          that.$cmdDsec.html(descHTML);
          return;
        }
        descHTML = '';
        setTimeout(function() {
          if (descMarkdown) {
            descHTML = that.markdownConvert.makeHtml(descMarkdown);
          }
          that.$cmdDsec.html(descHTML);
          that.$cmdDsec.find('em:contains(required)').parents('li').addClass('required');
          that.$cmdDsec.find('em:contains(optional)').parents('li').addClass('optional');
          return that.$cmdDsec.scrollTop(0);
        }, 0);
        return null;
      },
      refreshParaList: function($paraListElem, currentCMD) {
        var currentParaAry, currentParaMap, newParaAry, that;
        that = this;
        currentParaMap = that.cmdParaObjMap[currentCMD];
        currentParaAry = that.cmdParaMap[currentCMD];
        newParaAry = [];
        _.each(currentParaAry, function(paraObj) {
          var newParaObj, paraDisabled, _ref, _ref1;
          paraDisabled = false;
          if (!paraObj.required) {
            paraDisabled = true;
          }
          newParaObj = {
            para_name: paraObj.name,
            required: paraObj.required,
            para_disabled: paraDisabled
          };
          newParaObj['type_' + paraObj.type] = true;
          if ((_ref = paraObj.type) === 'line' || _ref === 'text' || _ref === 'bool') {
            newParaObj.para_value = '';
          } else if (paraObj.type === 'dict') {
            newParaObj.para_value = [
              {
                key: '',
                value: ''
              }
            ];
          } else if ((_ref1 = paraObj.type) === 'array' || _ref1 === 'state') {
            newParaObj.para_value = [''];
          }
          newParaAry.push(newParaObj);
          return null;
        });
        $paraListElem.html($.trim(template.paraListTpl({
          parameter_list: newParaAry
        })));
        return that.bindParaListEvent($paraListElem, currentCMD);
      },
      getParaObj: function($inputElem) {
        var $paraItem, $stateItem, currentCMD, currentParaMap, currentParaName, paraObj, that;
        that = this;
        $stateItem = $inputElem.parents('.state-item');
        $paraItem = $inputElem.parents('.parameter-item');
        currentCMD = $stateItem.attr('data-command');
        currentParaName = $paraItem.attr('data-para-name');
        currentParaMap = that.cmdParaObjMap[currentCMD];
        paraObj = currentParaMap[currentParaName];
        return paraObj;
      },
      onDictInputChange: function(event, noBindEvent) {
        var $currentDictItemContainer, $currentDictItemElem, $currentInputElem, $dictItemElem, $keyInput, $paraItem, $paraValueAry, $valueInput, currentValue, keyInputValue, newDictItemHTML, nextDictItemElemAry, paraObj, that, valueInputValue;
        that = this;
        if (that.readOnlyMode) {
          return;
        }
        $currentInputElem = $(event.currentTarget);
        currentValue = that.getPlainText($currentInputElem);
        if (currentValue) {
          $currentInputElem.removeClass('disabled');
        }
        paraObj = that.getParaObj($currentInputElem);
        $currentDictItemElem = $currentInputElem.parent('.parameter-dict-item');
        nextDictItemElemAry = $currentDictItemElem.next();
        if (!nextDictItemElemAry.length) {
          $currentDictItemContainer = $currentDictItemElem.parents('.parameter-container');
          $keyInput = $currentDictItemElem.find('.key');
          $valueInput = $currentDictItemElem.find('.value');
          keyInputValue = that.getPlainText($keyInput);
          valueInputValue = that.getPlainText($valueInput);
          if (keyInputValue || valueInputValue) {
            newDictItemHTML = $.trim(template.paraDictListTpl({
              para_value: [
                {
                  key: '',
                  value: ''
                }
              ]
            }));
            $dictItemElem = $(newDictItemHTML).appendTo($currentDictItemContainer);
            $paraValueAry = $dictItemElem.find('.parameter-value');
            $paraValueAry.addClass('disabled');
            $paraItem = $dictItemElem.parents('.parameter-item');
            if (!noBindEvent) {
              return that.bindParaItemEvent($paraItem, paraObj);
            }
          }
        }
      },
      onDictInputBlur: function(event) {
        var $currentDictItemContainer, $currentInputElem, allInputElemAry, newAllInputElemAry, newInputElemAry, that;
        that = this;
        if (that.readOnlyMode) {
          return;
        }
        $currentInputElem = $(event.currentTarget);
        $currentDictItemContainer = $currentInputElem.parents('.parameter-container');
        allInputElemAry = $currentDictItemContainer.find('.parameter-dict-item');
        _.each(allInputElemAry, function(itemElem, idx) {
          var inputElemAry, isAllInputEmpty;
          inputElemAry = $(itemElem).find('.parameter-value');
          isAllInputEmpty = true;
          _.each(inputElemAry, function(inputElem) {
            if (that.getPlainText(inputElem)) {
              isAllInputEmpty = false;
            }
            return null;
          });
          if (isAllInputEmpty && idx !== allInputElemAry.length - 1) {
            $(itemElem).remove();
          }
          return null;
        });
        newAllInputElemAry = $currentDictItemContainer.find('.parameter-dict-item');
        if (newAllInputElemAry.length === 1) {
          newInputElemAry = $(newAllInputElemAry[0]).find('.parameter-value');
          return newInputElemAry.removeClass('disabled');
        }
      },
      onArrayInputChange: function(event, noBindEvent) {
        var $arrayItemElem, $currentArrayInputContainer, $currentInputElem, $paraItem, currentInput, currentValue, newArrayItemHTML, nextInputElemAry, paraObj, that;
        that = this;
        $currentInputElem = $(event.currentTarget);
        currentValue = that.getPlainText($currentInputElem);
        if (currentValue) {
          $currentInputElem.removeClass('disabled');
        }
        paraObj = that.getParaObj($currentInputElem);
        nextInputElemAry = $currentInputElem.next();
        if (!nextInputElemAry.length) {
          $currentArrayInputContainer = $currentInputElem.parents('.parameter-container');
          currentInput = that.getPlainText($currentInputElem);
          if (currentInput) {
            newArrayItemHTML = $.trim(template.paraArrayListTpl({
              para_value: ['']
            }));
            $arrayItemElem = $(newArrayItemHTML).appendTo($currentArrayInputContainer);
            $arrayItemElem.addClass('disabled');
            $paraItem = $arrayItemElem.parents('.parameter-item');
            if (!noBindEvent) {
              return that.bindParaItemEvent($paraItem, paraObj);
            }
          }
        }
      },
      onArrayInputBlur: function(event) {
        var $currentArrayItemContainer, $currentInputElem, allInputElemAry, that;
        that = this;
        $currentInputElem = $(event.currentTarget);
        $currentArrayItemContainer = $currentInputElem.parents('.parameter-container');
        allInputElemAry = $currentArrayItemContainer.find('.parameter-value');
        return _.each(allInputElemAry, function(itemElem, idx) {
          var inputValue;
          inputValue = that.getPlainText(itemElem);
          if (!inputValue && idx !== allInputElemAry.length - 1) {
            $(itemElem).remove();
          }
          return null;
        });
      },
      onFocusInput: function(event) {
        var $currentInput, $stateItem, cmdName, currentDescCMDName, currentValue, paraObj, that;
        that = this;
        $currentInput = $(event.currentTarget);
        if ($currentInput.hasClass('parameter-value')) {
          currentValue = that.getPlainText($currentInput);
          paraObj = that.getParaObj($currentInput);
          if (paraObj) {
            that.highlightParaDesc(paraObj.name);
          }
        }
        $stateItem = $currentInput.parents('.state-item');
        cmdName = $stateItem.attr('data-command');
        currentDescCMDName = that.$cmdDsec.attr('data-command');
        if (cmdName && currentDescCMDName !== cmdName) {
          return that.refreshDescription(cmdName);
        }
      },
      onBlurInput: function(event) {
        var $currentInput, editor, that;
        that = this;
        $currentInput = $(event.currentTarget);
        editor = $currentInput.data('editor');
        if (editor) {
          return editor.clearSelection();
        }
      },
      onParaNameClick: function(event) {
        var $currentParaName, $paraFirstVauleInput, $paraItem, inputEditor, that;
        that = this;
        $currentParaName = $(event.currentTarget);
        $paraItem = $currentParaName.parents('.parameter-item');
        $paraFirstVauleInput = $paraItem.find('.parameter-value');
        inputEditor = $paraFirstVauleInput.data('editor');
        if (inputEditor) {
          return inputEditor.focus();
        }
      },
      onStateToolbarClick: function(event) {
        var $stateItem, $stateToolbarElem, that;
        that = this;
        $stateToolbarElem = $(event.currentTarget);
        that.clearFocusedItem();
        $stateItem = $stateToolbarElem.parents('.state-item');
        $stateItem.addClass('focused');
        if ($stateItem.hasClass('view')) {
          that.expandItem.call(this, $stateItem);
        } else {
          that.collapseItem.call(this, $stateItem);
        }
        return false;
      },
      expandItem: function($stateItem) {
        var $cmdValueItem, $paraListItem, $stateItemList, cmdEditor, cmdName, currentCMD, currentStateId, that, _ref;
        that = this;
        that.clearFocusedItem();
        $stateItemList = that.$stateList.find('.state-item');
        currentCMD = $stateItem.attr('data-command');
        $paraListItem = $stateItem.find('.parameter-list');
        that.bindStateListEvent([$stateItem]);
        _.each($stateItemList, function(otherStateItem) {
          var $otherStateItem;
          $otherStateItem = $(otherStateItem);
          if (!$stateItem.is($otherStateItem) && !$otherStateItem.hasClass('view')) {
            that.refreshStateView($otherStateItem);
          }
          return null;
        });
        $stateItemList.addClass('view');
        $stateItem.removeClass('view').addClass('focused');
        cmdName = $stateItem.attr('data-command');
        if (cmdName) {
          that.refreshDescription(cmdName);
        }
        if ((_ref = that.currentState) === 'app' || _ref === 'appedit') {
          currentStateId = $stateItem.attr('data-id');
          that.scrollToLogItem(currentStateId);
        }
        $cmdValueItem = $stateItem.find('.command-value');
        cmdEditor = $cmdValueItem.data('editor');
        if (cmdEditor) {
          setTimeout(function() {
            return cmdEditor.focus();
          }, 0);
        }
        return that.bindParaListEvent($paraListItem, currentCMD);
      },
      collapseItem: function($stateItem) {
        var $focusInput, $paraListItem, editor, that;
        that = this;
        $focusInput = that.$stateList.find('.editable-area.ace_focus');
        if ($focusInput) {
          editor = $focusInput.data('editor');
          if (editor) {
            editor.blur();
          }
        }
        that.refreshStateView($stateItem);
        $stateItem.addClass('view');
        that.refreshDescription();
        return $paraListItem = $stateItem.find('.parameter-list');
      },
      onExpandState: function(event) {
        var that;
        that = this;
        that.expandItem($('.state-list').find('.focused'));
        return false;
      },
      onCollapseState: function(event) {
        var that;
        that = this;
        that.collapseItem($('.state-list').find('.focused'));
        return false;
      },
      clearSelectedItem: function() {
        var that;
        that = this;
        that.$stateList.find('.selected').removeClass('selected');
        that.$stateList.find('.checkbox input').prop('checked', false);
        return null;
      },
      clearFocusedItem: function() {
        var that;
        that = this;
        that.$stateList.find('.focused').removeClass('focused');
        return null;
      },
      onStateItemAddClick: function(event) {
        var that;
        that = this;
        that.addStateItem.call(this, event);
        return false;
      },
      addStateItem: function(event) {
        var $cmdValueItem, $focusState, $newStateItem, $stateItem, $stateItemList, $stateItems, cmdEditor, newStateHTML, newStateId, statePos, that;
        that = this;
        if (that.currentState === 'app') {
          return false;
        }
        $stateItem = that.$stateList.find('.state-item:last');
        newStateId = that.genStateUID();
        newStateHTML = $.trim(template.stateListTpl({
          state_list: [
            {
              id: newStateId
            }
          ]
        }));
        $focusState = that.$stateList.find('.state-item.focused');
        if ($focusState.length) {
          $newStateItem = $(newStateHTML).insertAfter($focusState);
        } else {
          $newStateItem = $(newStateHTML).appendTo(that.$stateList);
        }
        that.clearFocusedItem();
        $cmdValueItem = $newStateItem.find('.command-value');
        that.bindCommandEvent($cmdValueItem);
        $stateItemList = that.$stateList.find('.state-item');
        _.each($stateItemList, function(otherStateItem) {
          var $otherStateItem;
          $otherStateItem = $(otherStateItem);
          if (!$newStateItem.is($otherStateItem) && !$otherStateItem.hasClass('view')) {
            that.refreshStateView($otherStateItem);
          }
          return null;
        });
        $stateItemList.addClass('view');
        $newStateItem.removeClass('view').addClass('focused');
        cmdEditor = $cmdValueItem.data('editor');
        if (cmdEditor) {
          setTimeout(function() {
            return cmdEditor.focus();
          }, 0);
        }
        that.refreshLogItemNum();
        $stateItems = that.$stateList.find('.state-item');
        if ($stateItems.length) {
          that.$haveStateContainer.show();
          that.$noStateContainer.hide();
        }
        statePos = $newStateItem.index();
        that.undoManager.register(newStateId, statePos, 'add');
        that.updateToolbar();
        return false;
      },
      onStateRemoveClick: function(event) {
        var $currentElem, $stateItem, that;
        that = this;
        $currentElem = $(event.currentTarget);
        $stateItem = $currentElem.parents('.state-item');
        return that.onRemoveState(null, $stateItem);
      },
      submitValidate: function(element) {
        var $editor, bindValidateFailed, doValidate, elems, result, that, validateFailed;
        that = this;
        doValidate = function(elem) {
          var param, represent, value;
          value = that.getPlainText(elem);
          param = that.getParaObjByInput(elem);
          represent = that.getRepresent(elem);
          return validate(value, param, elem, represent);
        };
        validateFailed = function(e) {
          var result;
          result = doValidate(e.currentTarget);
          if (!result) {
            return $(e.currentTarget).off('keyup.validate');
          }
        };
        bindValidateFailed = function(elem) {
          return $(elem).on('keyup.validate', validateFailed);
        };
        if (element) {
          result = doValidate(element);
        } else {
          $editor = this.$stateList.find('.editable-area:not(".disabled")');
          elems = $editor.toArray();
          result = true;
          _.each(elems, function(e) {
            var res;
            res = doValidate(e);
            if (res) {
              bindValidateFailed(e);
              if (result) {
                result = false;
              }
            }
            return result;
          });
        }
        return result;
      },
      genStateItemData: function($stateItem) {
        var $paraItemList, $paraListElem, cmdName, moduleObj, stateId, stateItemObj, that;
        that = this;
        cmdName = $stateItem.attr('data-command');
        stateId = $stateItem.attr('data-id');
        moduleObj = that.cmdModuleMap[cmdName];
        if (!moduleObj) {
          return {
            id: stateId,
            module: '',
            parameter: {}
          };
        }
        stateItemObj = {
          id: stateId,
          module: moduleObj.module,
          parameter: {}
        };
        $paraListElem = $stateItem.find('.parameter-list');
        $paraItemList = $paraListElem.find('.parameter-item');
        _.each($paraItemList, function(paraItem) {
          var $arrayItemList, $dictItemList, $paraInput, $paraItem, arrayObj, dictObjAry, isStateParaItem, paraName, paraValue;
          $paraItem = $(paraItem);
          if ($paraItem.hasClass('disabled')) {
            return;
          }
          paraName = $paraItem.attr('data-para-name');
          paraValue = null;
          if ($paraItem.hasClass('line') || $paraItem.hasClass('bool') || $paraItem.hasClass('text')) {
            $paraInput = $paraItem.find('.parameter-value');
            paraValue = that.getPlainText($paraInput);
            if ($paraItem.hasClass('bool')) {
              if (paraValue === 'true') {
                paraValue = true;
              } else if (paraValue === 'false') {
                paraValue = false;
              } else {
                paraValue = '';
              }
            }
            if ($paraItem.hasClass('line') || $paraItem.hasClass('text')) {
              paraValue = that.model.replaceParaNameToUID(paraValue);
            }
          } else if ($paraItem.hasClass('dict')) {
            $dictItemList = $paraItem.find('.parameter-dict-item');
            dictObjAry = [];
            _.each($dictItemList, function(dictItem) {
              var $dictItem, $keyInput, $valueInput, keyValue, valueValue;
              $dictItem = $(dictItem);
              $keyInput = $dictItem.find('.key');
              $valueInput = $dictItem.find('.value');
              keyValue = that.getPlainText($keyInput);
              valueValue = that.getPlainText($valueInput);
              if (keyValue) {
                valueValue = that.model.replaceParaNameToUID(valueValue);
                dictObjAry.push({
                  key: keyValue,
                  value: valueValue
                });
              }
              return null;
            });
            paraValue = dictObjAry;
          } else if ($paraItem.hasClass('array') || $paraItem.hasClass('state')) {
            $arrayItemList = $paraItem.find('.parameter-value');
            isStateParaItem = $paraItem.hasClass('state');
            arrayObj = [];
            _.each($arrayItemList, function(arrayItem) {
              var $arrayItem, arrayValue;
              $arrayItem = $(arrayItem);
              arrayValue = that.getPlainText($arrayItem);
              if (arrayValue) {
                if (isStateParaItem) {
                  arrayValue = that.model.replaceStateNameToUID(arrayValue);
                } else {
                  arrayValue = that.model.replaceParaNameToUID(arrayValue);
                }
                arrayObj.push(arrayValue);
              }
              return null;
            });
            paraValue = arrayObj;
          }
          return stateItemObj.parameter[paraName] = paraValue;
        });
        return stateItemObj;
      },
      saveStateData: function() {
        var $stateItemList, stateObjAry, that;
        that = this;
        $stateItemList = that.$stateList.find('.state-item');
        stateObjAry = [];
        _.each($stateItemList, function(stateItem, idx) {
          var $stateItem, stateItemObj;
          $stateItem = $(stateItem);
          stateItemObj = that.genStateItemData($stateItem);
          if (stateItemObj && stateItemObj.module && stateItemObj.id) {
            stateObjAry.push(stateItemObj);
          }
          return null;
        });
        return stateObjAry;
      },
      loadStateData: function(stateObjAry) {
        var renderObj, that;
        that = this;
        renderObj = {
          state_list: [],
          err_list: []
        };
        _.each(stateObjAry, function(state, idx) {
          var cmdName, err, paraListObj, paraModelObj, stateId, stateRenderObj;
          try {
            cmdName = that.moduleCMDMap[state.module];
            if (!cmdName) {
              throw new Error('command');
            }
            paraModelObj = that.cmdParaObjMap[cmdName];
            paraListObj = state.parameter;
            stateId = state.id;
            stateRenderObj = {
              id: stateId,
              id_show: idx + 1,
              cmd_value: cmdName,
              parameter_list: []
            };
            _.each(paraModelObj, function(paraModelValue, paraModelName) {
              var paraListAry, paraModelRequired, paraModelType, paraValue, renderParaObj, renderParaValue;
              paraModelType = paraModelValue.type;
              paraModelRequired = paraModelValue.required;
              renderParaObj = {
                para_name: paraModelName,
                para_disabled: true,
                required: paraModelRequired
              };
              renderParaObj['type_' + paraModelType] = true;
              paraValue = paraListObj[paraModelName];
              if (paraValue === void 0 && paraModelRequired) {
                throw new Error('parameter');
              }
              if (paraValue === void 0 && !paraModelRequired) {
                renderParaObj.para_disabled = true;
              } else {
                renderParaObj.para_disabled = false;
              }
              renderParaValue = null;
              if (paraModelType === 'line' || paraModelType === 'text' || paraModelType === 'bool') {
                renderParaValue = String(paraValue);
                if (!paraValue) {
                  renderParaValue = '';
                }
                if (paraModelType === 'bool' && paraValue === false) {
                  renderParaValue = 'false';
                }
                if (paraModelType === 'line' || paraModelType === 'text') {
                  renderParaValue = that.model.replaceParaUIDToName(renderParaValue);
                  if (renderParaValue && renderParaValue.indexOf('unknown') !== -1) {
                    renderObj.err_list.push('reference');
                  }
                }
              } else if (paraModelType === 'dict') {
                renderParaValue = [];
                if (_.isArray(paraValue)) {
                  _.each(paraValue, function(paraValueObj) {
                    paraValueObj.value = that.model.replaceParaUIDToName(paraValueObj.value);
                    if (paraValueObj.value && paraValueObj.value.indexOf('unknown') !== -1) {
                      renderObj.err_list.push('reference');
                    }
                    renderParaValue.push({
                      key: paraValueObj.key,
                      value: paraValueObj.value
                    });
                    return null;
                  });
                } else if (_.isObject(paraValue)) {
                  _.each(paraValue, function(paraValueStr, paraKey) {
                    paraValueStr = that.model.replaceParaUIDToName(paraValueStr);
                    if (paraValueStr && paraValueStr.indexOf('unknown') !== -1) {
                      renderObj.err_list.push('reference');
                    }
                    renderParaValue.push({
                      key: paraKey,
                      value: paraValueStr
                    });
                    return null;
                  });
                }
                if (!paraValue || _.isEmpty(paraValue)) {
                  renderParaValue = [
                    {
                      key: '',
                      value: ''
                    }
                  ];
                }
              } else if (paraModelType === 'array' || paraModelType === 'state') {
                renderParaValue = [];
                if (!_.isArray(paraValue)) {
                  if (!paraValue) {
                    paraValue = '';
                  }
                  paraValue = [paraValue];
                }
                _.each(paraValue, function(paraValueStr) {
                  if (paraModelType === 'state') {
                    paraValueStr = that.model.replaceStateUIDToName(paraValueStr);
                  } else {
                    paraValueStr = that.model.replaceParaUIDToName(paraValueStr);
                  }
                  if (paraValueStr && paraValueStr.indexOf('unknown') !== -1) {
                    renderObj.err_list.push('reference');
                  }
                  renderParaValue.push(paraValueStr);
                  return null;
                });
                if (!paraValue || !paraValue.length) {
                  renderParaValue = [''];
                }
              }
              renderParaObj.para_value = renderParaValue;
              stateRenderObj.parameter_list.push(renderParaObj);
              paraListAry = stateRenderObj.parameter_list;
              stateRenderObj.parameter_list = that.model.sortParaList(paraListAry, 'para_name');
              return null;
            });
            renderObj.state_list.push(stateRenderObj);
          } catch (_error) {
            err = _error;
            renderObj.err_list.push(err.message);
          }
          return null;
        });
        return renderObj;
      },
      onStateSaveClick: function(event) {
        var changeAry, changeObj, compareStateData, otherCompareStateData, stateData, that, _ref;
        that = this;
        stateData = that.saveStateData();
        that.model.setStateData(stateData);
        if (stateData) {
          compareStateData = null;
          otherCompareStateData = null;
          changeAry = [];
          if (that.originCompStateData && stateData) {
            if (that.originCompStateData.length > stateData.length) {
              compareStateData = stateData;
              otherCompareStateData = that.originCompStateData;
            } else {
              compareStateData = that.originCompStateData;
              otherCompareStateData = stateData;
            }
            _.each(compareStateData, function(stateObj, idx) {
              if (!_.isEqual(stateObj, otherCompareStateData[idx])) {
                changeAry.push(stateObj.id);
              }
              return null;
            });
            if ((_ref = that.currentState) === 'app' || _ref === 'appedit') {
              changeObj = {
                resId: that.currentResId,
                stateIds: changeAry
              };
              if ((!_.isEqual(that.originCompStateData, stateData)) || changeAry.length) {
                return ide_event.trigger(ide_event.STATE_EDITOR_DATA_UPDATE, changeObj);
              }
            }
          }
        }
      },
      onStateCancelClick: function(event) {
        var that;
        that = this;
        that.unloadEditor();
        return that.closedPopup();
      },
      onParaRemoveClick: function(event) {
        var $currentElem, $paraItem, that;
        that = this;
        $currentElem = $(event.currentTarget);
        $paraItem = $currentElem.parents('.parameter-item');
        if ($paraItem.hasClass('disabled')) {
          $paraItem.removeClass('disabled');
        } else {
          $paraItem.addClass('disabled');
        }
        return null;
      },
      onDescToggleClick: function(event) {
        var $descPanel, $descPanelToggle, $logPanel, $logPanelToggle, $stateEditor, expandPanel, that;
        that = this;
        $stateEditor = $('#state-editor');
        $descPanel = $('#state-description');
        $logPanel = $('#state-log');
        $descPanelToggle = that.$editorModal.find('.state-desc-toggle');
        $logPanelToggle = that.$editorModal.find('.state-log-toggle');
        expandPanel = $('#property-panel').hasClass('state-wide');
        if (expandPanel && $descPanel.hasClass('show')) {
          $stateEditor.addClass('full');
          $logPanel.removeClass('show');
          $descPanel.removeClass('show');
          $descPanelToggle.removeClass('active');
          $('#property-panel').removeClass('state-wide');
        } else {
          $stateEditor.removeClass('full');
          $logPanel.removeClass('show');
          $descPanel.addClass('show');
          $descPanelToggle.addClass('active');
          $('#property-panel').addClass('state-wide');
        }
        return $logPanelToggle.removeClass('active');
      },
      onLogToggleClick: function(event) {
        var $descPanel, $descPanelToggle, $logPanel, $logPanelToggle, $stateEditor, currentAppState, expandPanel, that, _ref;
        that = this;
        if ((_ref = that.currentState) === 'app' || _ref === 'appedit') {
          currentAppState = Design.instance().get('state');
          if (currentAppState === 'Stopped') {
            return;
          }
        }
        $stateEditor = $('#state-editor');
        $descPanel = $('#state-description');
        $logPanel = $('#state-log');
        $descPanelToggle = that.$editorModal.find('.state-desc-toggle');
        $logPanelToggle = that.$editorModal.find('.state-log-toggle');
        expandPanel = $('#property-panel').hasClass('state-wide');
        if (expandPanel && $logPanel.hasClass('show')) {
          $stateEditor.addClass('full');
          $descPanel.removeClass('show');
          $logPanel.removeClass('show');
          $logPanelToggle.removeClass('active');
          $('#property-panel').removeClass('state-wide');
        } else {
          $stateEditor.removeClass('full');
          $descPanel.removeClass('show');
          $logPanel.addClass('show');
          $logPanelToggle.addClass('active');
          $('#property-panel').addClass('state-wide');
        }
        return $descPanelToggle.removeClass('active');
      },
      showLogPanel: function() {
        var $descPanel, $descPanelToggle, $logPanel, $logPanelToggle, $stateEditor, that;
        that = this;
        $stateEditor = $('#state-editor');
        $descPanel = $('#state-description');
        $logPanel = $('#state-log');
        $descPanelToggle = that.$editorModal.find('.state-desc-toggle');
        $logPanelToggle = that.$editorModal.find('.state-log-toggle');
        $stateEditor.removeClass('full');
        $descPanel.removeClass('show');
        $logPanel.addClass('show');
        $logPanelToggle.addClass('active');
        $descPanelToggle.removeClass('active');
        return null;
      },
      onDocumentMouseDown: function(event) {
        var $allEditableArea, $currentElem, $parentElem, that;
        that = this;
        $currentElem = $(event.target);
        $parentElem = $currentElem.parents('.editable-area');
        if (!$parentElem.length && !$currentElem.hasClass('editable-area') && !$currentElem.hasClass('ace_scrollbar')) {
          $allEditableArea = $('.editable-area');
          _.each($allEditableArea, function(editableArea) {
            var $editableArea, editor;
            $editableArea = $(editableArea);
            editor = $editableArea.data('editor');
            if (editor) {
              editor.blur();
            }
            return null;
          });
          setTimeout(function() {
            return that.$stateGistPasteArea.focus();
          }, 0);
        }
        return that.onMouseDownSaveFromOther(event);
      },
      onMouseDownSaveFromOther: function(event) {
        var $currentElem, $parentEditorModel, $parentElem, $propertyPanel, $stateEditorModel, that;
        that = this;
        $currentElem = $(event.target);
        $parentElem = $currentElem.parents('.editable-area');
        $stateEditorModel = $('#state-editor-model');
        $parentEditorModel = $currentElem.parents('#state-editor-model');
        if ($stateEditorModel.length && (!$parentEditorModel.length)) {
          $propertyPanel = $('#property-panel');
          if ($stateEditorModel.length && !$propertyPanel.hasClass('no-state')) {
            return that.onStateSaveClick();
          } else {
            if ($currentElem.parents('#tabbar-wrapper').length) {
              return that.onStateSaveClick();
            }
          }
        }
      },
      initCodeEditor: function(editorElem, hintObj) {
        var $editorElem, that, _initEditor;
        that = this;
        if (!editorElem) {
          return;
        }
        $editorElem = $(editorElem);
        if ($editorElem.data('editor')) {
          return;
        }
        _initEditor = function() {
          var editColumn, editRow, editSession, editor, editorSingleLine, maxLines, tk;
          editor = ace.edit(editorElem);
          $editorElem.data('editor', editor);
          editor.hintObj = hintObj;
          editor.getSession().setMode(that.resRefHighLight);
          editor.renderer.setPadding(4);
          editor.setBehavioursEnabled(false);
          editorSingleLine = false;
          maxLines = void 0;
          if ($editorElem.hasClass('line')) {
            maxLines = 1;
            editorSingleLine = true;
          }
          editor.setOptions({
            enableBasicAutocompletion: true,
            maxLines: maxLines,
            showGutter: false,
            highlightGutterLine: false,
            showPrintMargin: false,
            highlightActiveLine: false,
            highlightSelectedWord: false,
            enableSnippets: false,
            singleLine: editorSingleLine
          });
          tk = new that.Tokenizer({
            'start': [
              {
                token: 'res_ref_correct',
                regex: that.resAttrRegexStr
              }, {
                token: 'res_ref',
                regex: '@\\{(\\w|\\-)+(\\.(\\w+(\\[\\d+\\])*))+\\}'
              }
            ]
          });
          editor.session.$mode.$tokenizer = tk;
          editor.session.bgTokenizer.setTokenizer(tk);
          editor.renderer.updateText();
          editSession = editor.getSession();
          editRow = editSession.getLength();
          editColumn = editSession.getLine(editRow - 1).length;
          editor.gotoLine(editRow, editColumn);
          editor.commands.on("afterExec", function(e) {
            var $firstInput, $paraItem, $paraListElem, $stateItem, commentCMDEditor, currentValue, cursorPos, firstEditor, hintDataAryMap, isShowTip, lastChar, lineStr, originCMDName, thatEditor, value;
            thatEditor = e.editor;
            currentValue = thatEditor.getValue();
            hintDataAryMap = thatEditor.hintObj;
            if (e.command.name === "insertstring") {
              if (/^{$/.test(e.args) && hintDataAryMap.at) {
                editSession = thatEditor.getSession();
                cursorPos = thatEditor.getCursorPosition();
                editRow = cursorPos.row;
                editColumn = cursorPos.column;
                lineStr = editSession.getLine(editRow);
                lastChar = lineStr[editColumn - 2];
                if (lastChar === '@') {
                  thatEditor.insert('}');
                  thatEditor.moveCursorTo(editRow, editColumn);
                  that.setEditorCompleter(thatEditor, hintDataAryMap.at, 'reference');
                  thatEditor.execCommand("startAutocomplete");
                }
              }
            }
            if (e.command.name === "backspace") {
              $stateItem = $editorElem.parents('.state-item');
              if (hintDataAryMap.focus) {
                $paraItem = $editorElem.parents('.parameter-item');
                if ($paraItem.hasClass('bool') || $paraItem.hasClass('state')) {
                  that.setPlainText($editorElem, '');
                }
                that.setEditorCompleter(thatEditor, hintDataAryMap.focus, 'command');
                thatEditor.execCommand("startAutocomplete");
              }
              if (currentValue === '' && $stateItem.hasClass('comment')) {
                commentCMDEditor = $stateItem.find('.command-value').data('editor');
                if (commentCMDEditor) {
                  commentCMDEditor.focus();
                }
              }
            }
            if (e.command.name === "autocomplete_confirm") {
              $stateItem = $editorElem.parents('.state-item');
              $paraListElem = $stateItem.find('.parameter-list');
              if ($editorElem.hasClass('command-value')) {
                value = e.args;
                originCMDName = $stateItem.attr('data-command');
                if (originCMDName !== value) {
                  that.setCMDForStateItem($stateItem, value);
                  that.refreshDescription(value);
                  that.refreshParaList($paraListElem, value);
                  that.refreshStateView($stateItem);
                }
              }
              if (value === '#') {
                $firstInput = $paraListElem.find('.parameter-value');
                firstEditor = $firstInput.data('editor');
                if (firstEditor) {
                  firstEditor.focus();
                }
              } else if ($editorElem.hasClass('parameter-value')) {
                cursorPos = thatEditor.getCursorPosition();
                thatEditor.moveCursorTo(cursorPos.row, cursorPos.column + 1);
                $paraItem = $editorElem.parents('.parameter-item');
                if ($paraItem.hasClass('dict')) {
                  that.onDictInputChange({
                    currentTarget: $editorElem[0]
                  });
                } else if ($paraItem.hasClass('array') || $paraItem.hasClass('state')) {
                  that.onArrayInputChange({
                    currentTarget: $editorElem[0]
                  });
                } else if ($paraItem.hasClass('line') || $paraItem.hasClass('bool') || $paraItem.hasClass('text')) {
                  $paraItem.removeClass('disabled');
                }
              }
            }
            if (e.command.name === "autocomplete_match") {
              isShowTip = false;
              if ($editorElem.hasClass('parameter-value')) {
                $paraItem = $editorElem.parents('.parameter-item');
                if ($paraItem.hasClass('state')) {
                  isShowTip = true;
                }
              }
              if ($editorElem.hasClass('command-value')) {
                isShowTip = true;
              }
              if (isShowTip) {
                if (!e.args) {
                  return that.$aceAutocompleteTip.show();
                } else {
                  return that.$aceAutocompleteTip.hide();
                }
              }
            }
          });
          editor.on("focus", function(e, thatEditor) {
            var $stateItem, $valueInput, currentValue, hintDataAryMap, inputPosX, inputPosY;
            $valueInput = $(thatEditor.container);
            $stateItem = $valueInput.parents('.state-item');
            that.justScrollToElem(that.$stateList, $valueInput);
            hintDataAryMap = thatEditor.hintObj;
            currentValue = thatEditor.getValue();
            if (!currentValue && hintDataAryMap.focus) {
              that.setEditorCompleter(thatEditor, hintDataAryMap.focus, 'command');
              thatEditor.execCommand("startAutocomplete");
            }
            inputPosX = $valueInput.offset().left;
            inputPosY = $valueInput.offset().top;
            that.$aceAutocompleteTip.css({
              left: inputPosX,
              top: inputPosY + 25
            });
            that.clearFocusedItem();
            return $stateItem.addClass('focused');
          });
          editor.on("blur", function(e, thatEditor) {
            var $paraItem, $stateItem, $valueInput, currentValue;
            that.$cmdDsec.find('.highlight').removeClass('highlight');
            that.$aceAutocompleteTip.hide();
            $valueInput = $(thatEditor.container);
            $stateItem = $valueInput.parents('.state-item');
            $paraItem = $valueInput.parents('.parameter-item');
            currentValue = thatEditor.getValue();
            if ($paraItem && $paraItem[0]) {
              if ($paraItem.hasClass('bool')) {
                if (currentValue !== 'true' && currentValue !== 'false') {
                  return that.setPlainText($valueInput, '');
                }
              }
            }
          });
          if (that.readOnlyMode) {
            return editor.setReadOnly(true);
          }
        };
        return _initEditor();
      },
      highlightParaDesc: function(paraName) {
        var $paraNameSpan, err, paraNameSpan, paraParagraph, scrollToPos, that;
        that = this;
        that.$cmdDsec.find('.highlight').removeClass('highlight');
        $paraNameSpan = that.$cmdDsec.find("strong code:contains('" + paraName + "')");
        paraNameSpan = $paraNameSpan.filter(function() {
          return $(this).text() === paraName;
        });
        if (paraNameSpan[0]) {
          paraParagraph = $(paraNameSpan[0]).parents('li');
          paraParagraph.addClass('highlight');
        }
        try {
          scrollToPos = paraParagraph.offset().top - that.$cmdDsec.offset().top + that.$cmdDsec.scrollTop() - 15;
          that.$cmdDsec.stop(true, true);
          return that.$cmdDsec.animate({
            scrollTop: scrollToPos
          }, 150);
        } catch (_error) {
          err = _error;
          return null;
        }
      },
      scrollToLogItem: function(stateId) {
        var $stateLog, $targetStateItem, err, scrollToPos, that;
        that = this;
        $targetStateItem = that.$stateLogList.find(".state-log-item[data-state-id='" + stateId + "']");
        $stateLog = $('#state-log');
        try {
          if ($targetStateItem[0]) {
            scrollToPos = $targetStateItem.offset().top - $stateLog.offset().top + $stateLog.scrollTop();
            $stateLog.stop(true, true);
            return $stateLog.animate({
              scrollTop: scrollToPos
            }, 150);
          }
        } catch (_error) {
          err = _error;
          return null;
        }
      },
      justScrollToElem: function($parent, $target) {
        var err, parentOffsetTop, parentTop, scrollPos, targetOffsetTop, targetTop;
        try {
          targetOffsetTop = $target.offset().top;
          parentOffsetTop = $parent.offset().top;
          targetTop = targetOffsetTop + 35;
          parentTop = parentOffsetTop + $parent.height();
          if (targetTop > parentTop) {
            scrollPos = $parent.scrollTop() + targetTop - parentTop + 15;
          } else if (targetOffsetTop < parentOffsetTop) {
            scrollPos = $parent.scrollTop() + targetOffsetTop - parentOffsetTop - 15;
          }
          return $parent.scrollTop(scrollPos);
        } catch (_error) {
          err = _error;
          return null;
        }
      },
      setEditorCompleter: function(editor, dataAry, metaType) {
        editor.completers = [
          {
            getCompletions: function(editor, session, pos, prefix, callback) {
              if (dataAry && dataAry.length) {
                return callback(null, dataAry.map(function(ea) {
                  return {
                    name: ea.name,
                    value: ea.value,
                    score: ea.value,
                    meta: ea.meta,
                    support: ea.support
                  };
                }));
              } else {
                return callback(null, []);
              }
            }
          }
        ];
        return null;
      },
      getRepresent: function(inputElem) {
        var $input, $paraItem, $stateItem, paramName, represent;
        $input = $(inputElem);
        $stateItem = $input.closest('.state-item');
        if ($input.hasClass('command-value')) {
          represent = $stateItem.find('.state-view .command-view-value');
        } else {
          $paraItem = $input.closest('.parameter-item');
          paramName = $paraItem.data('paraName');
          represent = $stateItem.find(".state-view [data-para-name='" + paramName + "']");
        }
        return represent;
      },
      getParaObjByInput: function(inputElem) {
        var $inputElem, $paraItem, $stateItem, command, constraint, currentParaMap, paramName, retVal, subType, that, type;
        that = this;
        $inputElem = $(inputElem);
        retVal = {};
        if ($inputElem.hasClass('command-value')) {
          type = 'command';
          retVal = {
            type: type,
            dataMap: that.cmdParaObjMap
          };
        } else {
          type = 'parameter';
          $paraItem = $inputElem.closest('.parameter-item');
          $stateItem = $paraItem.closest('.state-item');
          paramName = $paraItem.data('paraName');
          command = $stateItem.data('command');
          currentParaMap = that.cmdParaObjMap[command];
          constraint = currentParaMap[paramName];
          if ($inputElem.hasClass('key')) {
            subType = 'key';
          } else if ($inputElem.hasClass('value')) {
            subType = 'value';
          }
          retVal = {
            type: type,
            subType: subType,
            command: command,
            paramName: paramName,
            constraint: constraint,
            dataMap: that.cmdParaObjMap,
            refList: that.model.genAttrRefList()
          };
        }
        return retVal;
      },
      getPlainText: function(inputElem) {
        var $inputElem, editor;
        $inputElem = $(inputElem);
        editor = $inputElem.data('editor');
        if (editor) {
          return editor.getValue();
        } else {
          if (!$inputElem.hasClass('ace_editor')) {
            return $inputElem.text();
          }
          return '';
        }
      },
      setPlainText: function(inputElem, content) {
        var $inputElem, editor;
        $inputElem = $(inputElem);
        editor = $inputElem.data('editor');
        if (editor) {
          return editor.setValue(content);
        }
      },
      updateStateIdBySort: function(newOldStateIdMap) {
        var that;
        that = this;
        return that.model.updateAllStateRef(newOldStateIdMap);
      },
      refreshStateLogList: function() {
        var $stateLogItems, instanceStateHTML, renderHTML, resState, stateIdLogViewMap, stateLogDataAry, stateLogViewAry, stateStatusMap, that;
        that = this;
        stateLogDataAry = that.model.get('stateLogDataAry');
        if (!(stateLogDataAry && stateLogDataAry.length)) {
          that.showLogListLoading(false, true);
        }
        that.stateIdLogContentMap = {};
        stateLogViewAry = [];
        stateStatusMap = {};
        stateIdLogViewMap = {};
        $stateLogItems = that.$stateLogList.find('.state-log-item');
        _.each($stateLogItems, function(stateLogItem) {
          var $stateLogItem, stateId, stateView;
          $stateLogItem = $(stateLogItem);
          stateId = $stateLogItem.attr('data-state-id');
          stateView = $stateLogItem.hasClass('view');
          if (stateId) {
            stateIdLogViewMap[stateId] = stateView;
          }
          return null;
        });
        _.each(stateLogDataAry, function(logObj, idx) {
          var commentStr, isStateLog, longStdout, stateId, stateNum, stateStatus, stdoutStr, timeStr, viewLog;
          timeStr = null;
          if (logObj.time) {
            timeStr = MC.dateFormat(new Date(logObj.time), 'yyyy-MM-dd hh:mm:ss');
          }
          stateStatus = logObj.result;
          stateId = "" + logObj.id;
          stateNum = '';
          isStateLog = false;
          if (logObj.id !== 'Agent') {
            stateId = "State " + stateId;
            isStateLog = true;
            stateStatusMap[logObj.id] = stateStatus;
          } else {
            stateNum = logObj.id;
          }
          stdoutStr = '';
          commentStr = '';
          longStdout = false;
          if (logObj.comment) {
            commentStr = $.trim(logObj.comment.replace(/\n\n/g, '\n'));
          }
          if (logObj.stdout) {
            stdoutStr = $.trim(logObj.stdout.replace(/\n\n/g, '\n'));
            if (stdoutStr.length > 100) {
              longStdout = true;
              that.stateIdLogContentMap[logObj.id] = {
                number: stateNum,
                content: stdoutStr
              };
            }
          }
          viewLog = stateIdLogViewMap[logObj.id];
          if (viewLog !== true && viewLog !== false) {
            viewLog = false;
          }
          stateLogViewAry.push({
            id: logObj.id,
            state_num: stateNum,
            log_time: timeStr,
            state_status: stateStatus,
            stdout: stdoutStr,
            comment: commentStr,
            long_stdout: longStdout,
            view: viewLog,
            is_state_log: isStateLog
          });
          return null;
        });
        renderHTML = $.trim(template.stateLogItemTpl({
          state_logs: stateLogViewAry
        }));
        that.refreshStateItemStatus(stateStatusMap);
        resState = that.model.get('resState');
        instanceStateHTML = $.trim(template.stateLogInstanceItemTpl({
          res_status: resState
        }));
        that.$stateLogList.empty().append(instanceStateHTML).append(renderHTML);
        return that.refreshLogItemNum();
      },
      setEditorReadOnlyMode: function() {
        var $closeBtn, $saveCancelBtn, that;
        that = this;
        that.$stateList.find('.state-drag').hide();
        that.$stateList.find('.state-add').hide();
        that.$stateList.find('.state-remove').hide();
        that.$stateList.find('.parameter-remove').hide();
        that.$editorModal.find('.state-item-add').hide();
        $saveCancelBtn = that.$editorModal.find('.state-save, .state-cancel');
        $saveCancelBtn.hide();
        $closeBtn = that.$editorModal.find('.state-close');
        return $closeBtn.css('display', 'inline-block');
      },
      showLogListLoading: function(loadShow, infoShow) {
        var $loadText, $logInfo, $logPanel, that;
        that = this;
        $logPanel = $('#state-log');
        $loadText = $logPanel.find('.state-log-loading');
        $logInfo = $logPanel.find('.state-log-info');
        if (loadShow) {
          $loadText.show();
          return $logInfo.hide();
        } else {
          $loadText.hide();
          if (infoShow) {
            return $logInfo.show();
          } else {
            return $logInfo.hide();
          }
        }
      },
      onResSelectChange: function() {
        var $loadText, $logPanel, selectedResId, that;
        that = this;
        selectedResId = that.currentResId;
        that.showLogListLoading(true);
        that.model.getResState(selectedResId);
        if (!that.isLoadingLogList) {
          $logPanel = $('#state-log');
          $loadText = $logPanel.find('.state-log-loading');
          $loadText.text('Refresh...');
          that.isLoadingLogList = true;
          that.model.genStateLogData(selectedResId, function() {
            that.refreshStateLogList();
            that.showLogListLoading(false);
            return that.isLoadingLogList = false;
          });
          if (that.logRefreshTimer) {
            clearTimeout(that.logRefreshTimer);
          }
          return that.logRefreshTimer = setTimeout(function() {
            if (that.isLoadingLogList) {
              return $loadText.text('Request log info timeout, please try again');
            }
          }, 5000);
        }
      },
      onStateStatusUpdate: function(newStateUpdateResIdAry) {
        var selectedResId, that;
        that = this;
        selectedResId = that.currentResId;
        if (newStateUpdateResIdAry) {
          if (newStateUpdateResIdAry.length) {
            if (selectedResId && __indexOf.call(newStateUpdateResIdAry, selectedResId) >= 0) {
              return that.onLogRefreshClick();
            }
          } else {
            return that.onLogRefreshClick();
          }
        } else {
          return that.onLogRefreshClick();
        }
      },
      onOptionalParaItemChange: function(event) {
        var $arrayItemList, $currentInputElem, $dictItemList, $paraItem, currentValue, needDisable, that;
        that = this;
        $currentInputElem = $(event.currentTarget);
        currentValue = that.getPlainText($currentInputElem);
        $paraItem = $currentInputElem.parents('.parameter-item');
        if (currentValue) {
          return $paraItem.removeClass('disabled');
        } else {
          if ($paraItem.hasClass('line') || $paraItem.hasClass('bool') || $paraItem.hasClass('text')) {
            return $paraItem.addClass('disabled');
          } else if ($paraItem.hasClass('dict')) {
            needDisable = true;
            $dictItemList = $paraItem.find('.parameter-dict-item');
            if ($dictItemList.length <= 2) {
              _.each($dictItemList, function(dictItem) {
                var $dictItem, $keyInput, $valueInput, keyValue, valueValue;
                $dictItem = $(dictItem);
                $keyInput = $dictItem.find('.key');
                $valueInput = $dictItem.find('.value');
                keyValue = that.getPlainText($keyInput);
                valueValue = that.getPlainText($valueInput);
                if (keyValue || valueValue) {
                  needDisable = false;
                }
                return null;
              });
              if (needDisable) {
                return $paraItem.addClass('disabled');
              }
            }
          } else if ($paraItem.hasClass('array') || $paraItem.hasClass('state')) {
            needDisable = true;
            $arrayItemList = $paraItem.find('.parameter-value');
            if ($arrayItemList.length <= 2) {
              _.each($arrayItemList, function(arrayItem) {
                var $arrayItem, inputValue;
                $arrayItem = $(arrayItem);
                inputValue = that.getPlainText($arrayItem);
                if (inputValue) {
                  needDisable = false;
                }
                return null;
              });
              if (needDisable) {
                return $paraItem.addClass('disabled');
              }
            }
          }
        }
      },
      onCommandInputBlur: function(event) {
        var $currentElem, $paraListElem, $stateItem, currentValue, moduleObj, originCMDName, that;
        that = this;
        $currentElem = $(event.currentTarget);
        $stateItem = $currentElem.parents('.state-item');
        currentValue = that.getPlainText($currentElem);
        moduleObj = that.cmdModuleMap[currentValue];
        originCMDName = $stateItem.attr('data-command');
        if (moduleObj && moduleObj.support) {
          if (originCMDName !== currentValue) {
            that.setCMDForStateItem($stateItem, currentValue);
            that.refreshDescription(currentValue);
            $paraListElem = $stateItem.find('.parameter-list');
            that.refreshParaList($paraListElem, currentValue);
            return that.refreshStateView($stateItem);
          }
        } else {
          return that.setPlainText($currentElem, originCMDName);
        }
      },
      setCMDForStateItem: function($stateItem, cmdValue) {
        var that;
        that = this;
        $stateItem.attr('data-command', cmdValue);
        if (cmdValue === '#') {
          return $stateItem.addClass('comment');
        } else {
          return $stateItem.removeClass('comment');
        }
      },
      refreshStateItemStatus: function(stateStatusMap) {
        var $stateItemList, that;
        that = this;
        $stateItemList = that.$stateList.find('.state-item');
        return _.each($stateItemList, function(stateItem) {
          var $stateItem, $statusIcon, stateId, stateStatus;
          $stateItem = $(stateItem);
          stateId = $stateItem.attr('data-id');
          $statusIcon = $stateItem.find('.state-status-icon');
          $statusIcon.removeClass('status-green').removeClass('status-red').removeClass('status-yellow');
          stateStatus = stateStatusMap[stateId];
          if (stateStatus === 'success') {
            $statusIcon.addClass('status-green');
          } else if (stateStatus === 'failure') {
            $statusIcon.addClass('status-red');
          } else {
            $statusIcon.addClass('status-yellow');
          }
          return null;
        });
      },
      refreshLogItemNum: function() {
        var $logItemList, $stateItemList, stateIdNumMap, that;
        that = this;
        if (that.currentState === 'stack') {
          return;
        }
        stateIdNumMap = {};
        $stateItemList = that.$stateList.find('.state-item');
        _.each($stateItemList, function(stateItem, idx) {
          var $stateItem, stateId;
          $stateItem = $(stateItem);
          stateId = $stateItem.attr('data-id');
          stateIdNumMap[stateId] = idx + 1;
          return null;
        });
        $logItemList = that.$stateLogList.find('.state-log-item');
        return _.each($logItemList, function(logItem, idx) {
          var $logItem, stateId, stateNum, stateNumStr;
          if (idx >= 2) {
            $logItem = $(logItem);
            stateId = $logItem.attr('data-state-id');
            stateNum = stateIdNumMap[stateId];
            stateNumStr = 'unknown';
            if (stateNum) {
              stateNumStr = stateNum;
            }
            $logItem.find('.state-log-item-name').text('State ' + stateNumStr);
          }
          return null;
        });
      },
      unloadEditor: function() {
        var $aceEditors, that;
        that = this;
        $aceEditors = $('.ace_editor');
        return $aceEditors.remove();
      },
      initUndoManager: function() {
        var that;
        that = this;
        that.commandStack = [];
        that.commandIndex = -1;
        that.undoManager = {
          register: function(stateId, statePos, method, stateData) {
            var insertPos, newIndex, oldIndex, stateDataAry, statePosAry;
            that.commandStack.splice(that.commandIndex + 1, that.commandStack.length - that.commandIndex);
            if (method === 'remove') {
              stateDataAry = [];
              statePosAry = statePos;
              _.each(stateId, function(stateIdValue) {
                var $stateItem, stateDataValue;
                $stateItem = that.getStateItemById(stateIdValue);
                stateDataValue = that.getStateItemByData($stateItem);
                return stateDataAry.push(stateDataValue);
              });
              that.commandStack.push({
                redo: function() {
                  return _.each(stateDataAry, function(stateDataValue) {
                    var $stateItem;
                    $stateItem = that.getStateItemById(stateDataValue.id);
                    return that.onRemoveState(null, $stateItem, true);
                  });
                },
                undo: function() {
                  var idx;
                  idx = 0;
                  _.each(stateDataAry, function(stateDataValue) {
                    return that.addStateItemByData([stateDataValue], statePosAry[idx++] - 1);
                  });
                  return null;
                }
              });
            }
            if (method === 'add') {
              that.commandStack.push({
                redo: function() {
                  return null;
                },
                undo: function() {
                  var $stateItem;
                  $stateItem = that.getStateItemById(stateId);
                  stateData = that.getStateItemByData($stateItem);
                  this.redo = function() {
                    return that.addStateItemByData([stateData], statePos - 1);
                  };
                  return that.onRemoveState(null, $stateItem, true);
                }
              });
            }
            if (method === 'sort') {
              oldIndex = statePos;
              newIndex = stateData;
              that.commandStack.push({
                redo: function() {
                  var $stateItem;
                  $stateItem = that.getStateItemById(stateId);
                  stateData = that.getStateItemByData($stateItem);
                  that.onRemoveState(null, $stateItem, true);
                  return that.addStateItemByData([stateData], newIndex - 1);
                },
                undo: function() {
                  var $stateItem;
                  $stateItem = that.getStateItemById(stateId);
                  stateData = that.getStateItemByData($stateItem);
                  that.onRemoveState(null, $stateItem, true);
                  return that.addStateItemByData([stateData], oldIndex - 1);
                }
              });
            }
            if (method === 'paste') {
              insertPos = statePos;
              stateDataAry = _.map(stateData, function(data) {
                return _.extend({}, data);
              });
              that.commandStack.push({
                redo: function() {
                  return that.addStateItemByData(stateDataAry, insertPos - 1);
                },
                undo: function() {
                  return _.each(stateDataAry, function(pasteStateData) {
                    var $stateItem, pasteStateId;
                    pasteStateId = pasteStateData.id;
                    $stateItem = that.getStateItemById(pasteStateId);
                    that.onRemoveState(null, $stateItem, true);
                    return null;
                  });
                }
              });
            }
            that.commandIndex = that.commandStack.length - 1;
            _.defer(_.bind(that.renderStateCount, that));
            return null;
          },
          redo: function() {
            var operateCommand;
            if (that.undoManager.hasRedo()) {
              operateCommand = that.commandStack[that.commandIndex + 1];
              if (operateCommand) {
                operateCommand.redo();
                that.commandIndex = that.commandIndex + 1;
              }
              that.renderStateCount();
            }
            return null;
          },
          undo: function() {
            var operateCommand;
            if (that.undoManager.hasUndo()) {
              operateCommand = that.commandStack[that.commandIndex];
              if (operateCommand) {
                operateCommand.undo();
                that.commandIndex = that.commandIndex - 1;
              }
              that.renderStateCount();
            }
            return null;
          },
          hasUndo: function() {
            return that.commandIndex !== -1;
          },
          hasRedo: function() {
            return that.commandIndex < (that.commandStack.length - 1);
          }
        };
        return null;
      },
      getStateItemById: function(stateId) {
        var $stateItem, that;
        that = this;
        $stateItem = that.$stateList.find('.state-item[data-id="' + stateId + '"]');
        return $stateItem;
      },
      getStateItemByData: function($stateItem) {
        var stateData, that;
        that = this;
        stateData = that.genStateItemData($stateItem);
        return stateData;
      },
      setNewStateIdForStateAry: function(stateDataAry) {
        var that;
        that = this;
        stateDataAry = _.map(stateDataAry, function(stateData) {
          stateData.id = that.genStateUID();
          return stateData;
        });
        return stateDataAry;
      },
      addStateItemByData: function(stateDataAry, insertPos) {
        var $currentStateItems, $newStateItems, $stateItems, newStateItems, parseErrList, returnInsertPos, stateListObj, that;
        that = this;
        stateListObj = that.loadStateData(stateDataAry);
        parseErrList = stateListObj.err_list;
        if (parseErrList.length) {
          if (__indexOf.call(parseErrList, 'command') >= 0 || __indexOf.call(parseErrList, 'parameter') >= 0) {
            notification('warning', lang.ide.NOTIFY_MSG_INFO_STATE_PARSE_COMMAND_FAILED);
          }
          if (__indexOf.call(parseErrList, 'reference') >= 0) {
            notification('warning', lang.ide.NOTIFY_MSG_INFO_STATE_PARSE_REFRENCE_FAILED);
          }
        }
        newStateItems = $.trim(template.stateListTpl(stateListObj));
        $currentStateItems = that.$stateList.find('.state-item');
        returnInsertPos = null;
        if (_.isNumber(insertPos)) {
          if (insertPos <= -1) {
            $newStateItems = $(newStateItems).prependTo(that.$stateList);
            returnInsertPos = -1;
          } else {
            if ($currentStateItems[insertPos]) {
              $newStateItems = $(newStateItems).insertAfter($currentStateItems[insertPos]);
              returnInsertPos = insertPos;
            } else {
              $newStateItems = $(newStateItems).appendTo(that.$stateList);
              returnInsertPos = that.$stateList.length - 1;
            }
          }
        } else {
          $newStateItems = $(newStateItems).appendTo(that.$stateList);
          returnInsertPos = that.$stateList.length - 1;
        }
        that.bindStateListEvent($newStateItems);
        that.refreshStateViewList($newStateItems);
        $stateItems = that.$stateList.find('.state-item');
        if ($stateItems.length) {
          that.$haveStateContainer.show();
          that.$noStateContainer.hide();
        }
        return returnInsertPos;
      },
      keyEvent: function(event) {
        var altKey, focused, is_editable, is_input, keyCode, metaKey, shiftKey, status, tagName, target, that;
        that = this;
        if ($('.sub-stateeditor').css('display') === "none") {
          return true;
        }
        target = event.data.target;
        status = target.currentState;
        is_editable = status === 'appedit' || status === 'stack';
        tagName = event.target.tagName.toLowerCase();
        is_input = tagName === 'input' || tagName === 'textarea';
        keyCode = event.which;
        metaKey = event.ctrlKey || event.metaKey;
        shiftKey = event.shiftKey;
        altKey = event.altKey;
        if (metaKey && shiftKey === false && altKey === false && keyCode === 90 && is_editable) {
          target.undoManager.undo();
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 89 && is_editable) {
          target.undoManager.redo();
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 67 && is_input === false && is_editable) {
          target.copyState.call(target, event);
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 86 && is_editable && is_input === false) {
          target.pasteState.call(target, event);
        }
        if (metaKey && (keyCode === 46 || keyCode === 8) && shiftKey === false && altKey === false && is_editable) {
          target.removeState.call(target, event);
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 13 && is_editable) {
          target.addStateItem.call(target, event);
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 40 && is_editable) {
          target.moveState.call(target, 'down');
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 38 && is_editable) {
          target.moveState.call(target, 'up');
          return false;
        }
        if (metaKey === false && shiftKey === false && altKey === false && keyCode === 27) {
          target.collapseItem.call(target, $('.state-list .focused'));
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 73) {
          target.onDescToggleClick(target, event);
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 76 && status !== 'stack') {
          target.onLogToggleClick(target, event);
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 65 && is_editable) {
          target.selectAll(target, event);
          return false;
        }
        if (metaKey && shiftKey === false && altKey === false && keyCode === 68 && is_editable) {
          target.unSelectAll(target, event);
          return false;
        }
        if (keyCode === 9 && shiftKey && metaKey === false) {
          target.onSwitchState.call(target, true);
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 38) {
          target.switchFocus.call(target, true);
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 40) {
          target.switchFocus.call(target);
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 32 && is_input === false && is_editable) {
          target.toggleSelected.call(target);
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 13) {
          focused = $('#state-editor .state-item.focused');
          if (focused[0] !== null && focused.hasClass('view') === true) {
            target.expandItem.call(target, focused);
          }
          if ($(event.target).parent().hasClass('text') === true) {
            return true;
          }
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 9) {
          target.onSwitchState.call(target);
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 80 && is_input === false) {
          $canvas.trigger('SHOW_PROPERTY_PANEL');
          return false;
        }
        if (metaKey === false && shiftKey === false && keyCode === 83 && is_input === false) {
          $canvas.trigger('SHOW_STATE_EDITOR');
          return false;
        }
      },
      onUndo: function() {
        var that;
        that = this;
        that.undoManager.undo();
        return false;
      },
      onRedo: function() {
        var that;
        that = this;
        that.undoManager.redo();
        return false;
      },
      copyState: function() {
        var stack, that;
        that = this;
        stack = [];
        $('.state-list .selected').each(function() {
          return stack.push(that.getStateItemByData($(this)));
        });
        if (stack.length) {
          MC.data.stateClipboard = stack;
          that.updateToolbar();
          notification('info', lang.ide.NOTIFY_MSG_INFO_STATE_COPY_TO_CLIPBOARD);
        }
        return true;
      },
      copyAllState: function() {
        var stack, that;
        that = this;
        stack = [];
        $('.state-list .state-item').each(function() {
          return stack.push(that.getStateItemByData($(this)));
        });
        MC.data.stateClipboard = stack;
        that.updateToolbar();
        notification('info', lang.ide.NOTIFY_MSG_INFO_STATE_COPY_TO_CLIPBOARD);
        return true;
      },
      moveState: function(direction) {
        var focused_index, item, new_index, next_item, prev_item, state_id, that;
        that = this;
        item = $('#state-editor .state-item.focused');
        focused_index = $('#state-editor .state-item.focused').index('#state-editor .state-list > li');
        if (direction === 'down') {
          next_item = item.next();
          if (next_item.length > 0) {
            item.insertAfter(next_item);
            new_index = focused_index + 1;
          } else {
            item.parent().prepend(item);
            new_index = 0;
          }
        }
        if (direction === 'up') {
          prev_item = item.prev();
          if (prev_item.length > 0) {
            item.insertBefore(prev_item);
            new_index = focused_index - 1;
          } else {
            item.parent().append(item);
            new_index = $('#state-editor .state-item').length;
          }
        }
        state_id = item.data('id');
        that.undoManager.register(state_id, focused_index, 'sort', new_index);
        return false;
      },
      pasteState: function() {
        var focused_index, insertPos, newStateDataAry, that;
        that = this;
        focused_index = $('#state-editor .state-item.focused').index('#state-editor .state-list > li');
        if (focused_index === -1) {
          focused_index = null;
        }
        newStateDataAry = that.setNewStateIdForStateAry(MC.data.stateClipboard);
        insertPos = that.addStateItemByData(newStateDataAry, focused_index);
        that.undoManager.register(null, insertPos, 'paste', newStateDataAry);
        that.clearSelectedItem();
        that.clearFocusedItem();
        that.updateToolbar();
        return true;
      },
      removeState: function() {
        var that;
        that = this;
        that.onRemoveState(null, $('.state-list').find('.selected'));
        return true;
      },
      toggleSelected: function() {
        var item, that;
        that = this;
        item = $('#state-editor .state-item.focused');
        if (item.hasClass('selected')) {
          item.removeClass('selected');
          item.find('.checkbox input').prop('checked', false);
        } else {
          item.addClass('selected');
          item.find('.checkbox input').prop('checked', true);
        }
        that.updateToolbar();
        return false;
      },
      switchFocus: function(reverse) {
        var focused_index, stack, target_index, target_item, that, total;
        that = this;
        focused_index = 0;
        stack = $('#state-editor .state-item');
        total = stack.length;
        focused_index = $('#state-editor .state-item.focused').index('#state-editor .state-list > li');
        that.clearFocusedItem();
        if (reverse && reverse === true) {
          if (focused_index > 0) {
            target_index = focused_index - 1;
          }
          if (focused_index < 1) {
            target_index = total - 1;
          }
        } else {
          if (focused_index + 1 < total) {
            target_index = focused_index + 1;
          } else {
            target_index = 0;
          }
        }
        target_item = stack.eq(target_index);
        target_item.addClass('focused');
        that.justScrollToElem(that.$stateList, target_item);
        return false;
      },
      onSwitchState: function(reverse) {
        var focused_index, stack, target_index, target_item, that, total;
        that = this;
        focused_index = 0;
        stack = $('#state-editor .state-item');
        total = stack.length;
        focused_index = $('#state-editor .state-item.focused').index('#state-editor .state-list > li');
        that.clearFocusedItem();
        if (reverse && reverse === true) {
          if (focused_index > 0) {
            target_index = focused_index - 1;
          }
          if (focused_index < 1) {
            target_index = total - 1;
          }
        } else {
          if (focused_index + 1 < total) {
            target_index = focused_index + 1;
          } else {
            target_index = 0;
          }
        }
        target_item = stack.eq(target_index);
        that.expandItem.call(this, target_item.addClass('focused'));
        return false;
      },
      aceTabSwitch: function(event, container) {
        var container_item, index, stack, that, total;
        that = this;
        if (that.currentState === 'app') {
          that.onSwitchState.call(this, event);
          return false;
        }
        container_item = $(container);
        index = 0;
        if (container_item.hasClass('command-value')) {
          stack = container_item.parents('.state-item').find('.parameter-list .ace_editor');
          if (stack.length > 0) {
            stack.eq(0).find('.ace_text-input').focus();
          }
        } else {
          stack = container_item.parents('.parameter-list').find('.ace_editor');
          total = stack.length;
          $.each(stack, function(i, item) {
            if (container === item) {
              return index = i;
            }
          });
          if (index + 1 < total) {
            stack.eq(index + 1).find('.ace_text-input').focus();
          } else {
            container_item.parents('.state-item').find('.command-value .ace_text-input').focus();
          }
        }
        return false;
      },
      aceUTabSwitch: function(event, container) {
        var container_item, index, stack, that, total;
        that = this;
        if (that.currentState === 'app') {
          that.onSwitchState.call(this, event);
          return false;
        }
        container_item = $(container);
        index = 0;
        if (container_item.hasClass('command-value')) {
          stack = container_item.parents('.state-item').find('.parameter-list .ace_editor');
          total = stack.length;
          stack.eq(total - 1).find('.ace_text-input').focus();
          return false;
        }
        stack = container_item.parents('.parameter-list').find('.ace_editor');
        total = stack.length;
        $.each(stack, function(i, item) {
          if (container === item) {
            return index = i;
          }
        });
        if (index > 0) {
          stack.eq(index - 1).find('.ace_text-input').focus();
        }
        if (index === 0) {
          container_item.parents('.state-item').find('.command-value .ace_text-input').focus();
        }
        return false;
      },
      onRemoveState: function(event, $targetStates, noRegisterUndo) {
        var $stateItems, stateIdAry, statePosAry, that;
        that = this;
        if (that.currentState === 'app') {
          return false;
        }
        if (!noRegisterUndo) {
          stateIdAry = [];
          statePosAry = [];
          _.each($targetStates, function(targetState) {
            var $targetState, stateId, statePos;
            $targetState = $(targetState);
            stateId = $targetState.attr('data-id');
            stateIdAry.push(stateId);
            statePos = $targetState.index();
            return statePosAry.push(statePos);
          });
          that.undoManager.register(stateIdAry, statePosAry, 'remove');
        }
        _.each($targetStates, function(targetState) {
          var $targetState;
          $targetState = $(targetState);
          that.collapseItem($targetState);
          return null;
        });
        $targetStates.remove();
        $stateItems = that.$stateList.find('.state-item');
        if (!$stateItems.length) {
          that.$haveStateContainer.hide();
          that.$noStateContainer.show();
        } else {
          _.each($stateItems, function(stateItem) {
            var $stateItem;
            $stateItem = $(stateItem);
            if (!$stateItem.hasClass('view')) {
              that.expandItem($stateItem);
            }
            return null;
          });
        }
        that.refreshLogItemNum();
        that.updateToolbar();
        return false;
      },
      checkboxSelect: function(event) {
        var checkbox, item, that;
        that = this;
        checkbox = $(event.currentTarget).find('input');
        item = checkbox.parents('.state-item');
        item.removeClass('selected');
        if (checkbox.prop('checked') === false) {
          checkbox.prop('checked', true);
          item.addClass('selected');
        } else {
          checkbox.prop('checked', false);
        }
        that.updateToolbar();
        return false;
      },
      selectAll: function() {
        var that;
        that = this;
        $('#state-editor .state-item').addClass('selected').find('.checkbox input').prop('checked', true);
        that.updateToolbar();
        return true;
      },
      unSelectAll: function() {
        var that;
        that = this;
        $('#state-editor .state-item').removeClass('selected').find('.checkbox input').prop('checked', false);
        that.updateToolbar();
        return true;
      },
      onSelectAllClick: function() {
        var checkbox, that;
        that = this;
        checkbox = $(event.currentTarget).find('input');
        if (checkbox.prop('checked') === false) {
          checkbox.prop('checked', true);
          that.selectAll.call(this, event);
        } else {
          checkbox.prop('checked', false);
          that.unSelectAll.call(this, event);
        }
        return false;
      },
      onStateItemAddBtnClick: function(event) {
        var that;
        that = this;
        that.onStateItemAddClick();
        that.$haveStateContainer.show();
        that.$noStateContainer.hide();
        return false;
      },
      updateToolbar: function() {
        var selected_length, that;
        that = this;
        selected_length = that.$('#state-editor .state-item.selected').length;
        if (selected_length > 0) {
          that.$('#state-toolbar-copy, #state-toolbar-delete').show();
          that.$('#state-toolbar-copy-all').hide();
          that.$('#state-toolbar-copy-count, #state-toolbar-delete-count').text(selected_length);
        } else {
          that.$('#state-toolbar-copy, #state-toolbar-delete').hide();
          that.$('#state-toolbar-copy-all').show();
        }
        if (MC.data.stateClipboard.length > 0) {
          that.$('#state-toolbar-paste').removeClass('disabled');
        } else {
          that.$('#state-toolbar-paste').addClass('disabled');
        }
        if (selected_length > 0 && selected_length === that.$('#state-editor .state-item').length) {
          that.$('#state-toolbar-selectAll').find('input').prop('checked', true);
        } else {
          that.$('#state-toolbar-selectAll').find('input').prop('checked', false);
        }
        return true;
      },
      onClickBlank: function(event) {
        var target, that;
        that = this;
        target = $(event.target);
        if (target.parents('.state-item').length === 0) {
          that.clearFocusedItem();
        }
        return false;
      },
      onPasteGistData: function(event) {
        var err, pasteData, pasteDataJSON, that;
        that = this;
        pasteData = event.originalEvent.clipboardData.getData('text/plain');
        try {
          pasteDataJSON = JSON.parse(pasteData);
          pasteDataJSON = that.setNewStateIdForStateAry(pasteDataJSON);
          return that.addStateItemByData(pasteDataJSON);
        } catch (_error) {
          err = _error;
          return null;
        }
      },
      onStateLogItemHeaderClick: function(event) {
        var $currentTarget, $stateLogItem;
        $currentTarget = $(event.currentTarget);
        $stateLogItem = $currentTarget.parents('.state-log-item');
        return $stateLogItem.toggleClass('view');
      },
      openSysLogModal: function() {
        var currentRegion, instanceId, that;
        that = this;
        instanceId = that.currentResId;
        currentRegion = MC.canvas_data.region;
        instance_model.GetConsoleOutput({
          sender: that
        }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, instanceId);
        modal(MC.template.modalInstanceSysLog({
          instance_id: instanceId,
          log_content: ''
        }, true));
        that.off('EC2_INS_GET_CONSOLE_OUTPUT_RETURN').on('EC2_INS_GET_CONSOLE_OUTPUT_RETURN', function(result) {
          if (!result.is_error) {
            console.log(result.resolved_data);
          }
          return that.refreshSysLog(result.resolved_data);
        });
        return false;
      },
      refreshSysLog: function(result) {
        var $contentElem, logContent;
        $('#modal-instance-sys-log .instance-sys-log-loading').hide();
        if (result && result.output) {
          logContent = MC.base64Decode(result.output);
          $contentElem = $('#modal-instance-sys-log .instance-sys-log-content');
          $contentElem.html(MC.template.convertBreaklines({
            content: logContent
          }));
          $contentElem.show();
        } else {
          $('#modal-instance-sys-log .instance-sys-log-info').show();
        }
        return modal.position();
      },
      onStateLogDetailBtnClick: function(event) {
        var $logDetailBtn, $logItem, stateId, stateLogObj, that;
        that = this;
        $logDetailBtn = $(event.currentTarget);
        $logItem = $logDetailBtn.parents('.state-log-item');
        stateId = $logItem.attr('data-state-id');
        if (stateId) {
          stateLogObj = that.stateIdLogContentMap[stateId];
          if (stateLogObj) {
            return modal($.trim(template.stateLogDetailModal({
              number: stateLogObj.number,
              content: stateLogObj.content
            })), true);
          }
        }
      }
    });
    return StateEditorView;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/stateeditor/model',['MC', 'constant', 'state_model', 'backbone', 'jquery', 'underscore'], function(MC, constant, state_model) {
    var StateEditorModel;
    StateEditorModel = Backbone.Model.extend({
      defaults: {
        compData: null,
        allCompData: null,
        stateLogDataAry: []
      },
      initialize: function() {
        var agentData, allCompData, cmdAry, cmdModuleMap, cmdNameAry, cmdParaMap, cmdParaObjMap, currentCompData, currentState, groupResSelectData, modRepo, modTag, modVersion, moduleCMDMap, moduleData, moduleDataObj, osPlatform, osPlatformDistro, platformInfo, resAttrDataAry, that;
        that = this;
        agentData = Design.instance().get('agent');
        modRepo = agentData.module.repo;
        modTag = agentData.module.tag;
        modVersion = modRepo + ':' + modTag;
        moduleDataObj = MC.data.state.module[modVersion];
        platformInfo = that.getResPlatformInfo();
        osPlatform = platformInfo.osPlatform;
        osPlatformDistro = platformInfo.osPlatformDistro;
        if (osPlatform === 'windows') {
          that.set('isWindowsPlatform', true);
        } else {
          that.set('isWindowsPlatform', false);
        }
        if (osPlatformDistro) {
          that.set('supportedPlatform', true);
        } else {
          that.set('supportedPlatform', false);
        }
        moduleData = {};
        if (osPlatform === 'linux') {
          if (moduleDataObj.linux) {
            moduleData = _.extend(moduleData, moduleDataObj.linux);
          }
        } else if (osPlatform === 'windows') {
          if (moduleDataObj.windows) {
            moduleData = _.extend(moduleData, moduleDataObj.windows);
          }
        }
        if (moduleDataObj.common) {
          moduleData = _.extend(moduleData, moduleDataObj.common);
        }
        if (moduleDataObj.meta) {
          moduleData = _.extend(moduleData, moduleDataObj.meta);
        }
        cmdAry = [];
        cmdParaMap = {};
        cmdParaObjMap = {};
        cmdModuleMap = {};
        moduleCMDMap = {};
        _.each(moduleData, function(cmdObj, cmdName) {
          var cmdAllParaAry, cmdDistroAry, paraAryObj, supportCMD;
          cmdDistroAry = cmdObj.distro;
          supportCMD = false;
          if (((!cmdDistroAry) || (cmdDistroAry && __indexOf.call(cmdDistroAry, osPlatformDistro) >= 0)) && osPlatform === 'linux') {
            supportCMD = true;
          }
          cmdObj.support = supportCMD;
          cmdAry.push({
            name: cmdName,
            support: supportCMD
          });
          paraAryObj = cmdObj.parameter;
          cmdParaMap[cmdName] = [];
          cmdParaObjMap[cmdName] = {};
          cmdModuleMap[cmdName] = cmdObj;
          moduleCMDMap[cmdObj.module] = cmdName;
          _.each(paraAryObj, function(paraObj, paraName) {
            var paraBuildObj;
            paraBuildObj = _.extend(paraObj, {});
            paraBuildObj.name = paraName;
            paraBuildObj['type_' + paraBuildObj.type] = true;
            cmdParaMap[cmdName].push(paraBuildObj);
            cmdParaObjMap[cmdName][paraName] = paraBuildObj;
            return null;
          });
          cmdAllParaAry = cmdParaMap[cmdName];
          cmdParaMap[cmdName] = that.sortParaList(cmdAllParaAry, 'name');
          return null;
        });
        cmdNameAry = cmdAry.sort(function(val1, val2) {
          if (val1.support === val2.support) {
            if (val1.name > val2.name) {
              return 1;
            } else if (val1.name < val2.name) {
              return -1;
            } else {
              return 0;
            }
          } else {
            if (val1.support === true) {
              return -1;
            }
            if (val2.support === true) {
              return 1;
            }
          }
        });
        allCompData = that.get('allCompData');
        that.set('cmdNameAry', cmdNameAry);
        that.set('cmdParaMap', cmdParaMap);
        that.set('cmdParaObjMap', cmdParaObjMap);
        that.set('cmdModuleMap', cmdModuleMap);
        that.set('moduleCMDMap', moduleCMDMap);
        that.genStateRefList(allCompData);
        currentCompData = that.get('compData');
        resAttrDataAry = MC.aws.aws.genAttrRefList(currentCompData, allCompData);
        that.set('resAttrDataAry', resAttrDataAry);
        that.genAttrRefRegexList();
        groupResSelectData = that.getGroupResSelectData();
        that.set('groupResSelectData', groupResSelectData);
        currentState = MC.canvas.getState();
        if (currentState === 'stack') {
          that.set('currentState', 'stack');
        } else if (currentState === 'app') {
          that.set('currentState', 'app');
        } else if (currentState === 'appedit') {
          that.set('currentState', 'appedit');
        }
        if (MC.canvas_data.state === 'Stoped') {
          return that.set('currentAppState', 'stoped');
        }
      },
      sortParaList: function(cmdAllParaAry, paraName) {
        var newCMDAllParaAry;
        newCMDAllParaAry = cmdAllParaAry.sort(function(paraObj1, paraObj2) {
          if (paraObj1.required === paraObj2.required) {
            if (paraObj1[paraName] < paraObj2[paraName]) {
              return -1;
            } else {
              return 1;
            }
          }
          if (paraObj1.required) {
            return -1;
          }
          if (paraObj2.required) {
            return 1;
          }
        });
        return newCMDAllParaAry;
      },
      getResPlatformInfo: function() {
        var compData, imageId, imageObj, linuxDistroRange, osFamily, osPlatform, osPlatformDistro, osType, that;
        that = this;
        compData = that.get('compData');
        imageId = compData.resource.ImageId;
        imageObj = MC.data.dict_ami[imageId];
        osPlatform = null;
        osPlatformDistro = null;
        if (imageObj) {
          osFamily = imageObj.osFamily;
          osType = imageObj.osType;
          linuxDistroRange = ['centos', 'redhat', 'rhel', 'ubuntu', 'debian', 'fedora', 'gentoo', 'opensuse', 'suse', 'sles', 'amazon', 'amaz', 'linux-other'];
          if (osType === 'windows') {
            osPlatform = 'windows';
          } else if (__indexOf.call(linuxDistroRange, osType) >= 0) {
            osPlatform = 'linux';
            osPlatformDistro = osType;
          }
        }
        return {
          osPlatform: osPlatform,
          osPlatformDistro: osPlatformDistro
        };
      },
      updateAllStateRef: function(newOldStateIdMap) {
        var allInstanceModel, allLCModel, cmdParaObjMap, dealFunc, moduleCMDMap, newOldStateIdRefMap, that;
        that = this;
        allInstanceModel = Design.modelClassForType(constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance).allObjects();
        allLCModel = Design.modelClassForType(constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration).allObjects();
        newOldStateIdRefMap = {};
        _.each(newOldStateIdMap, function(value, key) {
          var newKey, newValue;
          newKey = that.replaceParaNameToUID(key);
          newValue = that.replaceParaNameToUID(value);
          newOldStateIdRefMap[newKey] = newValue;
          return null;
        });
        moduleCMDMap = that.get('moduleCMDMap');
        cmdParaObjMap = that.get('cmdParaObjMap');
        dealFunc = function(resModel) {
          var compUID, stateObj;
          stateObj = resModel.getStateData();
          compUID = resModel.id;
          if (stateObj && stateObj.length > 0) {
            _.each(stateObj, function(stateItemObj) {
              var cmdName, moduleName, paraModelObj, paraObj;
              paraObj = stateItemObj.parameter;
              moduleName = stateItemObj.module;
              cmdName = moduleCMDMap[moduleName];
              if (!cmdName) {
                return;
              }
              paraModelObj = cmdParaObjMap[cmdName];
              if (!paraModelObj) {
                return;
              }
              _.each(paraObj, function(paraValue, paraName) {
                var newParaValue, paraType;
                paraType = paraModelObj[paraName].type;
                if (paraType === 'state') {
                  newParaValue = _.map(paraValue, function(stateRef) {
                    if (newOldStateIdRefMap[stateRef]) {
                      return newOldStateIdRefMap[stateRef];
                    }
                    return stateRef;
                  });
                  paraObj[paraName] = newParaValue;
                }
                return null;
              });
              return null;
            });
            resModel.setStateData(stateObj);
          }
          return null;
        };
        _.each(allInstanceModel, dealFunc);
        _.each(allLCModel, dealFunc);
        return null;
      },
      setStateData: function(stateData) {
        var compData, resModel, that;
        that = this;
        compData = that.get('compData');
        resModel = that.get('resModel');
        return resModel.setStateData(stateData);
      },
      getStateData: function() {
        var compData, resModel, stateData, that;
        that = this;
        compData = that.get('compData');
        resModel = that.get('resModel');
        if (compData) {
          stateData = resModel.getStateData();
          if (_.isArray(stateData)) {
            return stateData;
          }
        }
        return null;
      },
      getResName: function() {
        var compData, resName, that;
        that = this;
        resName = '';
        compData = that.get('compData');
        if (compData && compData.name) {
          resName = compData.name;
        }
        if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
          if (compData.serverGroupUid === compData.uid) {
            if (compData.serverGroupName) {
              resName = compData.serverGroupName;
            }
          }
        }
        return resName;
      },
      genStateRefList: function(allCompData) {
        var compData, compList, currentCompUID, moduleCMDMap, resStateDataAry, that;
        that = this;
        compList = _.values(allCompData);
        resStateDataAry = [];
        compData = that.get('compData');
        currentCompUID = compData.uid;
        moduleCMDMap = that.get('moduleCMDMap');
        if (compList && !_.isEmpty(compList) && _.isArray(compList)) {
          _.each(compList, function(compObj) {
            var compName, compType, compUID, stateAry;
            compUID = compObj.uid;
            compType = compObj.type;
            compName = compObj.name;
            if (currentCompUID === compUID) {
              return;
            }
            if (compType === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
              if (compObj.index !== 0) {
                return;
              }
              compName = compObj.serverGroupName;
            }
            if (compType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
              compName = Design.instance().component(compUID).parent().get('name');
            }
            stateAry = compObj.state;
            if (stateAry && _.isArray(stateAry)) {
              _.each(stateAry, function(stateObj, idx) {
                var stateMeta, stateNumStr, stateRefStr;
                if (stateObj.module !== 'meta.comment') {
                  stateNumStr = String(idx + 1);
                  stateRefStr = '{' + compName + '.state.' + stateNumStr + '}';
                  stateMeta = moduleCMDMap[stateObj.module];
                  return resStateDataAry.push({
                    name: stateRefStr,
                    value: stateRefStr,
                    meta: stateMeta
                  });
                }
              });
            }
            return null;
          });
        }
        resStateDataAry = resStateDataAry.sort(function(val1, val2) {
          if (val1.name > val2.name) {
            return 1;
          } else if (val1.name < val2.name) {
            return -1;
          } else {
            return 0;
          }
        });
        return that.set('resStateDataAry', resStateDataAry);
      },
      genAttrRefRegexList: function() {
        var attrRefRegexList, resAttrDataAry, resAttrRegexStr, resStateDataAry, stateRefRegexList, that;
        that = this;
        attrRefRegexList = [];
        resAttrDataAry = that.get('resAttrDataAry');
        resStateDataAry = that.get('resStateDataAry');
        if (!resAttrDataAry) {
          resAttrDataAry = [];
        }
        attrRefRegexList = _.map(resAttrDataAry, function(refObj) {
          var regStr;
          regStr = refObj.name.replace('{', '\\{').replace('}', '\\}').replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
          return '@' + '{' + regStr + '}';
        });
        stateRefRegexList = _.map(resStateDataAry, function(refObj) {
          var regStr;
          regStr = refObj.name.replace('{', '\\{').replace('}', '\\}').replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
          return '@' + regStr;
        });
        attrRefRegexList = attrRefRegexList.concat(stateRefRegexList);
        resAttrRegexStr = attrRefRegexList.join('|');
        return that.set('resAttrRegexStr', resAttrRegexStr);
      },
      replaceStateUIDToName: function(paraValue) {
        var allCompData, compData, newParaValue, newRefStr, refMatchAry, refMatchStr, refRegex, resName, resUID, stateNum, stateNumMap, stateUID, that, uidMatchAry, uidRegex;
        that = this;
        allCompData = that.get('allCompData');
        refRegex = /@\{([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})\.state\.state-([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})\}/g;
        uidRegex = /[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}/g;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        if (refMatchAry && refMatchAry.length) {
          refMatchStr = refMatchAry[0];
          uidMatchAry = refMatchStr.match(uidRegex);
          resUID = uidMatchAry[0];
          stateUID = 'state-' + uidMatchAry[1];
          compData = allCompData[resUID];
          resName = 'unknown';
          stateNum = 'unknown';
          if (compData) {
            stateNumMap = {};
            resName = compData.name;
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
              if (compData.number && compData.number > 1) {
                resName = compData.serverGroupName;
              }
            }
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
              _.each(allCompData, function(asgCompData) {
                var lcUID, lcUIDRef;
                if (asgCompData.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_Group) {
                  lcUIDRef = asgCompData.resource.LaunchConfigurationName;
                  if (lcUIDRef) {
                    lcUID = MC.extractID(lcUIDRef);
                    if (lcUID === resUID) {
                      resName = asgCompData.name;
                    }
                  }
                }
                return null;
              });
            }
            if (compData.state && _.isArray(compData.state)) {
              _.each(compData.state, function(stateObj, idx) {
                if (stateObj.id === stateUID) {
                  stateNum = idx + 1;
                }
                return null;
              });
            }
          }
          newRefStr = refMatchStr.replace(resUID, resName).replace(stateUID, stateNum);
          newParaValue = newParaValue.replace(refMatchStr, newRefStr);
        }
        return newParaValue;
      },
      replaceStateNameToUID: function(paraValue) {
        var allCompData, compData, lcCompData, lcUID, lcUIDRef, newParaValue, newUIDStr, refMatchAry, refMatchStr, refRegex, resName, resUID, stateNum, stateUID, that;
        that = this;
        allCompData = that.get('allCompData');
        refRegex = /@\{([\w-]+)\.state\.\d+\}/g;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        if (refMatchAry && refMatchAry.length) {
          refMatchStr = refMatchAry[0];
          resName = refMatchStr.replace('@{', '').split('.')[0];
          resUID = that.getUIDByResName(resName);
          stateNum = Number(refMatchStr.replace('}', '').split('.')[2]);
          stateUID = '';
          lcCompData = null;
          if (resUID && _.isNumber(stateNum)) {
            compData = allCompData[resUID];
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_Group) {
              lcUIDRef = compData.resource.LaunchConfigurationName;
              if (lcUIDRef) {
                lcUID = MC.extractID(lcUIDRef);
                resUID = lcUID;
                lcCompData = allCompData[lcUID];
              }
            }
            if (lcCompData) {
              compData = lcCompData;
            }
            if (compData.state && _.isArray(compData.state) && compData.state[stateNum - 1]) {
              stateUID = compData.state[stateNum - 1].id;
            }
          }
          if (resUID && stateUID) {
            newUIDStr = refMatchStr.replace(resName, resUID).replace('.state.' + stateNum, '.state.' + stateUID);
            newParaValue = newParaValue.replace(refMatchStr, newUIDStr);
          }
        }
        return newParaValue;
      },
      replaceParaUIDToName: function(paraValue) {
        var allCompData, currentCompData, currentCompUID, newParaValue, refMatchAry, refRegex, that, uidRegex;
        that = this;
        currentCompData = that.get('compData');
        currentCompUID = currentCompData.uid;
        allCompData = that.get('allCompData');
        refRegex = /@\{([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})(\.(\w+(\[\d+\])*))+\}/g;
        uidRegex = /[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}/;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        _.each(refMatchAry, function(refMatchStr) {
          var compData, newRefStr, resName, resUID, uidMatchAry;
          uidMatchAry = refMatchStr.match(uidRegex);
          resUID = uidMatchAry[0];
          compData = allCompData[resUID];
          if (compData) {
            resName = compData.name;
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
              if (compData.number && compData.number > 1) {
                resName = compData.serverGroupName;
              }
            }
          } else {
            resName = 'unknown';
          }
          newRefStr = refMatchStr.replace(resUID, resName);
          newParaValue = newParaValue.replace(refMatchStr, newRefStr);
          return null;
        });
        return newParaValue;
      },
      replaceParaNameToUID: function(paraValue) {
        var allCompData, newParaValue, refMatchAry, refRegex, that;
        that = this;
        allCompData = that.get('allCompData');
        refRegex = constant.REGEXP.stateEditorOriginReference;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        _.each(refMatchAry, function(refMatchStr) {
          var newUIDStr, resName, resUID;
          resName = refMatchStr.replace('@{', '').split('.')[0];
          if (resName !== 'self') {
            resUID = that.getUIDByResName(resName);
            if (resUID) {
              newUIDStr = refMatchStr.replace(resName, resUID);
              newParaValue = newParaValue.replace(refMatchStr, newUIDStr);
            }
          }
          return null;
        });
        return newParaValue;
      },
      getUIDByResName: function(resName) {
        var allCompData, currentCompData, currentCompUID, resultUID, that;
        that = this;
        currentCompData = that.get('compData');
        currentCompUID = currentCompData.uid;
        allCompData = that.get('allCompData');
        resultUID = '';
        $.each(allCompData, function(uid, resObj) {
          if (resObj.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
            if (resObj.number && resObj.number > 1) {
              if (resObj.serverGroupName === resName) {
                resultUID = uid;
                return false;
              }
            }
          }
          if (resObj.name === resName) {
            resultUID = uid;
          }
          return null;
        });
        return resultUID;
      },
      getResState: function(resId) {
        var currentRegion, resObj, resState, that;
        that = this;
        currentRegion = MC.canvas_data.region;
        resObj = MC.data.resource_list[currentRegion][resId];
        resState = 'unknown';
        if (resObj && resObj.instanceState && resObj.instanceState.name) {
          resState = resObj.instanceState.name;
        }
        that.set('resState', resState);
        return null;
      },
      genStateLogData: function(resId, callback) {
        var agentStatus, appId, originStatusDataAry, resModel, stateDataAry, stateIdNumMap, that;
        that = this;
        appId = MC.canvas_data.id;
        if (!(appId && resId)) {
          that.set('stateLogDataAry', []);
          callback();
          return;
        }
        resModel = that.get('resModel');
        stateDataAry = resModel.getStateData();
        stateIdNumMap = {};
        originStatusDataAry = _.map(stateDataAry, function(stateObj, idx) {
          stateIdNumMap[stateObj.id] = idx;
          return {
            id: stateObj.id,
            result: 'pending'
          };
        });
        agentStatus = 'pending';
        state_model.log({
          sender: that
        }, $.cookie('usercode'), $.cookie('session_id'), appId, resId);
        that.off('STATE_LOG_RETURN');
        return that.on('STATE_LOG_RETURN', function(result) {
          var logAry, statusDataAry, statusObj;
          if (!result.is_error) {
            statusDataAry = result.resolved_data;
            if (statusDataAry && statusDataAry[0]) {
              statusObj = statusDataAry[0];
              if (statusObj.agent_status) {
                agentStatus = statusObj.agent_status;
              }
              logAry = statusObj.status;
              if (logAry && _.isArray(logAry)) {
                _.each(logAry, function(logObj) {
                  var stateNum;
                  stateNum = stateIdNumMap[logObj.id];
                  if (_.isNumber(stateNum)) {
                    return originStatusDataAry[stateNum] = logObj;
                  }
                });
              }
            }
            originStatusDataAry.unshift({
              id: 'Agent',
              result: agentStatus
            });
            that.set('stateLogDataAry', originStatusDataAry);
            that.set('agentStatus', agentStatus);
            if (callback) {
              return callback();
            }
          }
        });
      },
      getCurrentResUID: function() {
        var compData, currentCompUID, that;
        that = this;
        compData = that.get('compData');
        currentCompUID = compData.uid;
        return currentCompUID;
      },
      getGroupResSelectData: function() {
        var allCompData, compData, dataAry, originCompUID, originGroupUID, that;
        that = this;
        compData = that.get('compData');
        allCompData = that.get('allCompData');
        originGroupUID = '';
        originCompUID = compData.uid;
        if (compData.type === 'AWS.EC2.Instance') {
          originGroupUID = compData.serverGroupUid;
        }
        dataAry = [];
        _.each(allCompData, function(compObj) {
          var asgName, compType, compUID, currentGroupUID, lsgUID, resId, resName;
          compType = compObj.type;
          compUID = compObj.uid;
          if (compType === 'AWS.EC2.Instance' && compData.type === compType) {
            currentGroupUID = compObj.serverGroupUid;
            if (compUID === originCompUID) {
              resId = compObj.resource.InstanceId;
              resName = compObj.name;
              dataAry.push({
                res_id: resId,
                res_name: resName
              });
            } else if (originGroupUID && currentGroupUID && compUID !== originGroupUID && currentGroupUID === originGroupUID) {
              resId = compObj.resource.InstanceId;
              dataAry.push({
                res_id: resId,
                res_name: compObj.name
              });
            }
          }
          null;
          if (compType === 'AWS.AutoScaling.Group' && compData.type === 'AWS.AutoScaling.LaunchConfiguration') {
            asgName = compObj.resource.AutoScalingGroupName;
            lsgUID = MC.extractID(compObj.resource.LaunchConfigurationName);
            if (lsgUID === originCompUID) {
              $.each(MC.data.resource_list[MC.canvas_data.region], function(idx, resObj) {
                if (resObj && resObj.AutoScalingGroupName && resObj.Instances) {
                  if (resObj.AutoScalingGroupName === asgName) {
                    return $.each(resObj.Instances.member, function(idx, instanceObj) {
                      var instanceId;
                      instanceId = instanceObj.InstanceId;
                      return dataAry.push({
                        res_id: instanceId,
                        res_name: instanceId
                      });
                    });
                  }
                }
              });
            }
          }
          return null;
        });
        return dataAry;
      }
    });
    return StateEditorModel;
  });

}).call(this);

(function() {
  define('component/stateeditor/stateeditor',['event', './view', './model', './lib/ace', 'UI.modal', 'jquerysort'], function(ide_event, View, Model) {
    var loadModule, unLoadModule;
    loadModule = function(allCompData, uid, resId) {
      var compData, model, resModel, view;
      compData = allCompData[uid];
      resModel = Design.instance().component(uid);
      if (compData) {
        model = new Model({
          compData: compData,
          resModel: resModel,
          resId: resId,
          allCompData: allCompData
        });
      } else {
        model = new Backbone.Model();
      }
      view = new View({
        model: model
      });
      view.model = model;
      ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR);
      ide_event.onLongListen(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR, function(newStateUpdateResIdAry) {
        return view.onStateStatusUpdate(newStateUpdateResIdAry);
      });
      ide_event.offListen(ide_event.STATE_EDITOR_SAVE_DATA);
      ide_event.onLongListen(ide_event.STATE_EDITOR_SAVE_DATA, function(event) {
        return view.onMouseDownSaveFromOther(event);
      });
      $('#property-panel').addClass('state');
      return $('#property-panel .sub-stateeditor').html(view.render().el);
    };
    unLoadModule = function(view, model) {
      var err;
      console.log('state editor unLoadModule');
      try {
        view.off();
        model.off();
        view.undelegateEvents();
        modal.close();
        view = null;
        model = null;
        ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR);
      } catch (_error) {
        err = _error;
      }
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);

