define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<article class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_LBL_ATTACH_WARN", {hash:{},data:data}))
    + "</article>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<article>\n  <div id=\"prop-appedit-eni-list\" class=\"expand\"></div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_LBL_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n<!-- ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " -->\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-eni-source-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sourceDestCheck), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n        <label for=\"property-eni-source-check\"></label>\n      </div>\n      <label for=\"property-eni-source-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SOURCE_DEST_CHECK", {hash:{},data:data}))
    + "</label>\n    </section>\n\n    <section class=\"property-control-group\">\n      <div class=\"network-list-wrap\">\n        <div class=\"network-list-header\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_IP_ADDRESS", {hash:{},data:data}))
    + "\n          <button id=\"property-eni-ip-add\" class=\"right btn btn-blue btn-small tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_TIP_ADD_IP_ADDRESS", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_ADD_IP", {hash:{},data:data}))
    + "</button>\n        </div>\n        <ul class=\"network-list\" id=\"property-eni-list\" data-bind=\"true\">\n        </ul>\n      </div>\n    </section>\n  </div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ENI_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>\n\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-eni-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-eni-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n";
  return buffer;
  }

function program6(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.attached), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }; return Handlebars.template(TEMPLATE); });