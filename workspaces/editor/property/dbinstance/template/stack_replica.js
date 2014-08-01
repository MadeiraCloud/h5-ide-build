define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dl class=\"dl-vertical\">\n            <dt>Master DB Instance</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.sourceDbName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" tabindex=\"-1\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hide), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                        <div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        <!-- <div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div> -->\n                    </li>\n                    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected ";
  }

function program6(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program8(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-iops-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-iops-check\">\n                <label for=\"property-dbinstance-iops-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-iops-check\">Use Provisioned IOPS</label>\n        </section>\n        ";
  return buffer;
  }

  buffer += "<article class=\"property-dbinstance\">\n    <div class=\"option-group-head expand\">DB Instance Details</div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sourceDbName), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-dbinstance-name\" >DB Instance Name</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\">\n            <label class=\"left\">DB Instance Class</label>\n            <div class=\"selectbox selectbox-mega\" id=\"property-dbinstance-class-select\">\n                <div class=\"selection\"></div>\n                <ul class=\"dropdown\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.classes), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-version-update\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoMinorVersionUpgrade), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-version-update\">\n                <label for=\"property-dbinstance-version-update\"></label>\n            </div>\n            <label for=\"property-dbinstance-version-update\">Auto Minor Version Update</label>\n        </section>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.masterIops), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-dbinstance-database-port\" >Database Port</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-public-access-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.accessible), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-public-access-check\">\n                <label for=\"property-dbinstance-public-access-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-public-access-check\">Publicly Accessible</label>\n        </section>\n\n\n\n    </div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });