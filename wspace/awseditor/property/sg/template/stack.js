define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<a href=\"#\" class=\"icon-add tooltip add-rule action-link\" id=\"sg-add-rule-icon\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIP_CREATE_RULE", {hash:{},data:data}))
    + "' ></a>\n		";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<li class=\"sg-member-name\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>";
  return buffer;
  }

  buffer += "<article>\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<div class=\"property-control-group\">\n			<label for=\"securitygroup-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n			<input class=\"input\"  type=\"text\" id=\"securitygroup-name\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.nameReadOnly), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n		</div>\n		<div class=\"property-control-group\">\n			<label for=\"securitygroup-description\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n			<input class=\"input\" type=\"text\" id=\"securitygroup-description\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.descReadOnly), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"ascii\" data-ignore=\"true\"/>\n		</div>\n	</div>\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIT_RULE", {hash:{},data:data}))
    + "\n		<span class=\"property-head-num-wrap\">(<span id=\"rule-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rules)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ruleEditable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"option-group\">\n		<div class=\"rule-list-sort property-control-group\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"selectbox\" id=\"sg-rule-filter-select\">\n				<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"item selected\" data-id=\"direction\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"relation\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"protocol\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_RULE_SORT_BY_PROTOCOL", {hash:{},data:data}))
    + "</li>\n				</ul>\n			</div>\n		</div>\n\n		<ul class=\"sg-rule-list property-list\" id=\"sg-rule-list\"></ul>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.SG_TIT_MEMBER", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.members)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>	</div>\n	<div class=\"option-group\">\n		<ul class=\"sg-member-list property-list\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });