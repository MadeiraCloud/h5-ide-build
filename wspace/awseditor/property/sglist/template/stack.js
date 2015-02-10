define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<ul class=\"tab sg-info-list-tab\">\n	<li data-tab-target=\"#item-group\" class=\"active\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_TAB_GROUP", {hash:{},data:data}))
    + "</li>\n	<li data-tab-target=\"#item-rule\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_TAB_RULE", {hash:{},data:data}))
    + "</li>\n</ul>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"clearfix\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideCheck), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"col3 sg-edit-icon tooltip icon-btn-details\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_TIP_VIEW_DETAIL", {hash:{},data:data}))
    + "'></div>\n\n				<div class=\"col2\">\n					<div class=\"col2-1 truncate\"><div class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></div><span class=\"sg-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n					<div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n					<div class=\"col2-3 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_LBL_MEMBER", {hash:{},data:data}));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deletable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n			</li>\n			";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<div class=\"checkbox-wrap col1\">\n						<div class=\"checkbox\">\n							<input class=\"sg-list-association-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.used), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"sg-list-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n							<label for=\"sg-list-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n						</div>\n					</div>\n				";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " | <a class=\"sg-list-delete-btn\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-count=\""
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_LNK_DELETE", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "<a href=\"javascript:void(0)\" class=\"add-to-list action-link\" id=\"add-sg-btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SGLIST_BTN_CREATE_NEW_SG", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.is_stack_sg), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"tab-content\">\n	<div id=\"item-group\" class=\"active tab-item pos-r\">\n		<ul class=\"acl-sg-info-list property-list\" id=\"sg-info-list\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sg_list), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readonly), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n\n	<div id=\"item-rule\" class=\"tab-item\">\n		<div class=\"rule-list-sort property-control-group\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"selectbox\" id=\"sg-rule-filter-select\">\n				<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"item selected\" data-id=\"direction\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"relation\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"protocol\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_PROTOCOL", {hash:{},data:data}))
    + "</li>\n				</ul>\n			</div>\n		</div>\n		<ul class=\"sg-rule-list property-list\" id=\"sglist-rule-list\"> </ul>\n	</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });