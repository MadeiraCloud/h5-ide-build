define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dl class=\"dl-vertical\">\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MASTER_DB_INSTANCE", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.sourceDbName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                        <div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                        <div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.cpu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.memory)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n                    </li>\n                    ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "selected ";
  }

function program6(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_STORAGE_TYPE", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox\" id=\"property-dbinstance-storage-type\">\n                <div class=\"selection\"></div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.storageType), "gp2", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"gp2\">General Purpose (SSD)</li>\n                    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.storageType), "io1", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-id=\"io1\">Provisioned IOPS (SSD)</li>\n                    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.storageType), "standard", {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"standard\">Magnetic</li>\n                </ul>\n            </div>\n        </section>\n        ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "selected";
  }

function program11(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program12(depth0,data) {
  
  
  return "hide";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n        <div class=\"property-control-group clearfix\">\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.multiAz), {hash:{},inverse:self.program(18, program18, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n\n    ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AvailabilityZone), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PREFERRED_ZONE", {hash:{},data:data}))
    + "</label>\n                    <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.SecondaryAvailabilityZone), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SECONDARY_ZONE", {hash:{},data:data}))
    + "</label>\n                <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.SecondaryAvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.azNotEnough), {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <section class=\"property-control-group\">\n            <div class=\"property-info\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SUBNETGROUP_NOT_SETUP", (depth0 && depth0.subnetGroupName), (depth0 && depth0.subnetGroupName), {hash:{},data:data}))
    + "</div>\n        </section>\n        ";
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group property-dbinstance-preferred-az ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multiAz), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PREFERRED_ZONE", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox\" id=\"property-dbinstance-preferred-az\"></div>\n        </section>\n        ";
  return buffer;
  }

  buffer += "<article class=\"property-dbinstance\">\n    <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DETAILS", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sourceDbName), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-dbinstance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DATABASE_NAME", {hash:{},data:data}))
    + "</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n          <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n          <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n        </section>\n\n        <section class=\"property-control-group\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_CLASS", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox selectbox-mega\" id=\"property-dbinstance-class-select\">\n                <div class=\"selection\"></div>\n                <ul class=\"dropdown\">\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.classes), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </ul>\n            </div>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-version-update\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoMinorVersionUpgrade), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-version-update\">\n                <label for=\"property-dbinstance-version-update\"></label>\n            </div>\n            <label for=\"property-dbinstance-version-update\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_AUTO_MINOR_VERSION_UPDATE", {hash:{},data:data}))
    + "</label>\n        </section>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.masterIops), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n            <label class=\"left\" for=\"property-dbinstance-database-port\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DATABASE_PORT", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-type=\"number\" data-required=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-public-access-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.accessible), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-public-access-check\">\n                <label for=\"property-dbinstance-public-access-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-public-access-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PUBLIC_ACCESS", {hash:{},data:data}))
    + "</label>\n        </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(21, program21, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });