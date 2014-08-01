define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"item data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.license)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.license)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "selected";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" tabindex=\"-1\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hide), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
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
function program5(depth0,data) {
  
  
  return "selected ";
  }

function program7(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program9(depth0,data) {
  
  
  return "checked=\"true\"";
  }

  buffer += "<article class=\"property-dbinstance\">\n    <div class=\"option-group-head expand\">DB Instance Details</div>\n    <div class=\"option-group\">\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-dbinstance-name\" >DB Instance Name</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\">\n            <label class=\"left\">License Model</label>\n            <div class=\"selectbox\" id=\"property-dbinstance-license-select\">\n                <div class=\"selection\"></div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.licenses), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"property-control-group\">\n            <label class=\"left\">DB Instance Class</label>\n            <div class=\"selectbox selectbox-mega\" id=\"property-dbinstance-class-select\">\n                <div class=\"selection\"></div>\n                <ul class=\"dropdown\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.classes), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-version-update\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoMinorVersionUpgrade), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-version-update\">\n                <label for=\"property-dbinstance-version-update\"></label>\n            </div>\n            <label for=\"property-dbinstance-version-update\">Auto Minor Version Update</label>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-mutil-az-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiAz), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-mutil-az-check\">\n                <label for=\"property-dbinstance-mutil-az-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-mutil-az-check\">Multi-AZ Deployment</label>\n        </section>\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-dbinstance-database-port\" >Database Port</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\">\n            <label class=\"left\">Option Group</label>\n            <div class=\"selectbox\" id=\"property-dbinstance-option-group-select\">\n                <div class=\"selection\">default:mysql-5-6</div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item selected data-id=\"default\">default:mysql-5-6</li>\n                    <li class=\"item data-id=\"dedicated\">default:mysql-5-6</li>\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-public-access-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.accessible), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-public-access-check\">\n                <label for=\"property-dbinstance-public-access-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-public-access-check\">Publicly Accessible</label>\n        </section>\n\n    </div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });