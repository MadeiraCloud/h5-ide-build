define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"DebugTool\" class=\"debugToolBg\">\n  <ul>\n    <li id=\"DtDiff\" class=\"icon-toolbar-diff tooltip\" data-tooltip=\"Json Diff\"></li>\n    <li id=\"DtView\" class=\"icon-toolbar-cloudformation tooltip\" data-tooltip=\"Json View\"></li>\n    <li id=\"DtApi\" class=\"tooltip debugToolBg\" data-tooltip=\"Debug Api\"></li>\n    <li id=\"DtSession\" class=\"icon-user tooltip\" data-tooltip=\"Share Session\"></li>\n    <li id=\"DtClearStack\" class=\"icon-delete tooltip\" data-tooltip=\"Clear Stacks\"></li>\n    <li id=\"DtClearApp\" class=\"icon-terminate tooltip\" data-tooltip=\"Terminate Apps\"></li>\n  </ul>\n  <div id=\"DebugTooltip\">console输入man查看快捷debug</div>\n</div>";
  };
TEMPLATE.Toolbar=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.text)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>";
  return buffer;
  }

  buffer += "<section id=\"DebugQuestion\">\n  <article>\n    <p>";
  stack1 = ((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    <div class=\"clearfix\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.buttons), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <button data-id=\"debug_q_close\">取消</button>\n    </div>\n  </article>\n</section>";
  return buffer;
  };
TEMPLATE.Question=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section id=\"ApiDebuggerScene\">\n  <div id=\"ApiDebuggerClose\"></div>\n  <div id=\"ApiDebuggerLeft\">\n    <label id=\"ApiDebuggerLabel\">Api : </label>\n    <select id=\"ApiSelect\" data-placeholder=\"Select an api\"></select>\n    <label>Parameters :</label>\n    <section id=\"ApiParamsWrap\" class=\"clearfix\"></section>\n    <button class=\"btn btn-blue\" id=\"ApiDebugSend\">Send Request</button>\n  </div>\n  <div id=\"ApiDebuggerRight\"><label>Result :</label><pre id=\"ApiResult\"></pre></div>\n</section>";
  };
TEMPLATE.ApiDebugger=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });