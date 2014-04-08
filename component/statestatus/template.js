define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-header\">\n	<h3>Failed State</h3>\n	<i class=\"modal-close\">×</i>\n</div>\n<div class=\"modal-body\">\n	<div class=\"modal-state-statusbar\">\n	</div>\n</div>\n\n";
  };
TEMPLATE.modal=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"state-status-content\">\n\n	<div class=\"scroll-wrap scroll-wrap-validation\" style=\"height:200px;\">\n		<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<div class=\"content_wrap scroll-content\">\n			<div class=\"update-tip\"></div>\n			<div class=\"status-item\">\n				<p class=\"no-item\">No failed item.</p>\n			</div>\n		</div>\n	</div>\n</div>\n\n";
  };
TEMPLATE.content=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.parent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s ";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "<s>has failed</s> is updated.";
  }

function program5(depth0,data) {
  
  
  return "has failed";
  }

function program7(depth0,data) {
  
  
  return "State log will update after change is applied.";
  }

function program9(depth0,data) {
  
  
  return escapeExpression(helpers.UTC.call(depth0, (depth0 && depth0.time), {hash:{},data:data}));
  }

  buffer += "<div class=\"state-status-item-icon\">\n	<i class=\"status status-red\"></i>\n</div>\n<div class=\"state-status-item-info\">\n	<div class=\"state-status-item-desc truncate\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.parent), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " 's state "
    + escapeExpression(((stack1 = (depth0 && depth0.stateId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.updated), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"timestamp\">\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.updated), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<dl class=\"state-status-pending\">\n	<dt>All states are pending.</dt>\n	<dd>A message will show here when a state succeeds or fails.</dd>\n</dl>\n\n";
  };
TEMPLATE.pending=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"state-status-list\">\n</ul>\n\n";
  };
TEMPLATE.container=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"state-status-update\">\n	"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " states has updated status.\n</div>\n";
  return buffer;
  };
TEMPLATE.update=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });