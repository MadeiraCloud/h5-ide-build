define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.app)),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"group\">\n            <label class=\"name\">Snapshot ID</label>\n            <select id=\"property-os-volume-snapshot\" data-target=\"snapshot\" class=\"selection option\" data-option-tpl=\"snapshotOption\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>\n        </section>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "true";
  }

function program9(depth0,data) {
  
  
  return "false";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"option-group-head expand\">\n    Volume Details\n</div>\n<div class=\"option-group\">\n    <section class=\"group required\">\n        <label class=\"name\">Volume Name</label>\n        <input data-target=\"name\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group\">\n        <label class=\"name\">Description</label>\n        <input data-target=\"description\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Mount Point</label>\n        <input data-target=\"mountPoint\" class=\"selection string\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.mountPoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    <section class=\"group required\">\n        <label class=\"name\">Volume Size</label>\n        <input data-target=\"size\" class=\"selection string\" id=\"property-os-volume-size\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshot), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <section class=\"group\">\n        <label class=\"name\">Bootable</label>\n        <select class=\"selection bool\" data-target=\"bootable\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.bootable), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.modeIsAppEdit), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></select>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.stackTemplate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div>\n    <div class=\"manager-content-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"manager-content-sub\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "G | "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>";
  return buffer;
  };
TEMPLATE.snapshotOption=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"group\">\n    <dl class=\"dl-vertical\">\n        <dt>ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</dd>\n        <dt>Name</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.display_name), {hash:{},data:data}))
    + "</dd>\n        <dt>Status</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.status), {hash:{},data:data}))
    + "</dd>\n        <dt>Size</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + "</dd>\n        <dt>Snapshot ID</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.snapshot_id), {hash:{},data:data}))
    + "</dd>\n        <dt>Description</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n        <dt>Bootable</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.bootable), {hash:{},data:data}))
    + "</dd>\n        <dt>Created at</dt><dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.created_at), {hash:{},data:data}))
    + "</dd>\n    </dl>\n</section>";
  return buffer;
  };
TEMPLATE.appTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });