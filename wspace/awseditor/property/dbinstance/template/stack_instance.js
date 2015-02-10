define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isCanPromote), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPromoted), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"property-control-group property-dbinstance-promote-replica hide\">\n        <button class=\"btn btn-primary\" id=\"property-dbinstance-promote-replica\" style=\"width: 200px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_READ_REPLICA", {hash:{},data:data}))
    + "</button>\n    </section>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"property-control-group property-dbinstance-promote-replica hide\">\n        <button class=\"btn\" id=\"property-dbinstance-promote-replica\" style=\"width: 200px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_CANCEL_PROMOTE", {hash:{},data:data}))
    + "</button>\n    </section>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group apply-immediately-section ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isChanged), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <div class=\"checkbox\">\n            <input id=\"property-dbinstance-apply-immediately\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.applyImmediately), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-apply-immediately\">\n            <label for=\"property-dbinstance-apply-immediately\"></label>\n        </div>\n        <label for=\"property-dbinstance-apply-immediately\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_APPLY_IMMEDIATELY", {hash:{},data:data}))
    + "</label>\n        <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html#Overview.DBInstance.Modifying\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_APPLY_IMMEDIATELY_LINK_TOOLTIP", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n    </section>\n    ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "hide";
  }

function program9(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-group-head expand\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DETAILS", {hash:{},data:data}))
    + "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_APP_DBINSTANCE_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.DbinstanceIdentifier), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DATABASE_NAME", {hash:{},data:data}))
    + "</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n\n        <section class=\"property-control-group\" data-bind=\"true\">\n          <label class=\"left\" for=\"property-res-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DESCRIPTION", {hash:{},data:data}))
    + "</label>\n          <textarea id=\"property-res-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n        </section>\n\n        <div id =\"lvia-container\"></div>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-version-update\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoMinorVersionUpgrade), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-version-update\">\n                <label for=\"property-dbinstance-version-update\"></label>\n            </div>\n            <label for=\"property-dbinstance-version-update\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_AUTO_MINOR_VERSION_UPDATE", {hash:{},data:data}))
    + "</label>\n        </section>\n\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers.ifLogic.call(depth0, (depth0 && depth0.isRestoreDB), "and", (depth0 && depth0.isSqlserver), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(37, program37, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(39, program39, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n\n    <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DATABASE_CONFIG", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(58, program58, data),fn:self.program(51, program51, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div class=\"property-control-group clearfix property-dbinstance-optiongroup\"></div>\n\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(65, program65, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideAZConfig), {hash:{},inverse:self.noop,fn:self.program(71, program71, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "<a href=\"#\" class=\"icon-rds-restore tooltip property-btn-db-restore-config action-link\" data-tooltip=\"Restore to point in time config\" ></a>";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group clearfix\">\n            <label>Source DB Instance</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.sourceDbIdForRestore)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DBSNAPSHOT_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        <section class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DBSNAPSHOT_SIZE", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GiB</div>\n        </section>\n        ";
  return buffer;
  }

function program18(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PENDING_APPLY", {hash:{},data:data}));
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_ALLOCATED_STORAGE", {hash:{},data:data}))
    + "</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <div class=\"ranged-number-input\">\n                <label for=\"property-dbinstance-storage\"></label>\n                <input id=\"property-dbinstance-storage\" type=\"text\" class=\"input parsley-validated property-input-left tooltip\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.allocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-dbinstance-storage\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-type=\"number\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\"property-dbinstance-storage\" class=\"property-label-right\">GB</label>\n            </div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n        ";
  return buffer;
  }
function program21(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program22(depth0,data) {
  
  var buffer = "";
  buffer += "disabled data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SCALLING_NOT_SUPPORT", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originAllocatedStorage), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_CURRENT_ALLOCATED_STORAGE", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.originAllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</label>\n                ";
  return buffer;
  }

function program27(depth0,data) {
  
  
  return "\n        ";
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_STORAGE_TYPE", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox\" id=\"property-dbinstance-storage-type\">\n                <div class=\"selection\"></div>\n                <ul class=\"dropdown\" tabindex=\"-1\">\n                    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.storageType), "gp2", {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"gp2\">General Purpose (SSD)</li>\n                    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.storageType), "io1", {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-id=\"io1\">Provisioned IOPS (SSD)</li>\n                    <li class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.storageType), "standard", {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"standard\">Magnetic</li>\n                </ul>\n            </div>\n        </section>\n        <section class=\"property-control-group property-dbinstance-iops-value-section ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PROVISIONED_IOPS", {hash:{},data:data}))
    + "</label>\n            <div class=\"ranged-number-input\">\n                <input class=\"input\" id=\"property-dbinstance-iops-value\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"iops-ranged\" data-ignore=\"true\" data-required=\"true\" data-type=\"number\">\n                <label for=\"property-dbinstance-iops-value\"></label>\n            </div>\n            <label class=\"property-dbinstance-iops-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.iopsInfo)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        </section>\n        ";
  return buffer;
  }
function program30(depth0,data) {
  
  
  return "selected";
  }

function program32(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program34(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program35(depth0,data) {
  
  
  return "disabled";
  }

function program37(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"property-info property-info-iops-adjust-tip ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.originIOPS), (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.originIOPS), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_IOPS_AVAILABILITY_IMPACT", {hash:{},data:data}))
    + "</div>\n        ";
  return buffer;
  }

function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(42, program42, data),fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-master-password\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MASTER_PASSWORD", {hash:{},data:data}))
    + "</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input tooltip\" data-tooltip=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.password), "****", {hash:{},inverse:self.program(46, program46, data),fn:self.program(44, program44, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" type=\"password\" placeholder=\"****\" id=\"property-dbinstance-master-password\" value=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.password), "****", {hash:{},inverse:self.program(49, program49, data),fn:self.program(44, program44, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-type=\"ascii\" data-ignore=\"true\" data-required=\"true\"/>\n        </section>\n        ";
  return buffer;
  }
function program40(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_USERNAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.MasterUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </section>\n        ";
  return buffer;
  }

function program42(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-master-username\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MASTER_USERNAME", {hash:{},data:data}))
    + "</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-master-username\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore-regexp=\"^[a-zA-Z]+[0-9a-zA-Z_]*$\" data-required-rollback=\"true\"/>\n        </section>\n        ";
  return buffer;
  }

function program44(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program46(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.password), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program47(depth0,data) {
  
  
  return "Default Password: 12345678";
  }

function program49(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.password)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program51(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group clearfix\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dbName), {hash:{},inverse:self.noop,fn:self.program(52, program52, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PORT", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Endpoint), {hash:{},inverse:self.program(56, program56, data),fn:self.program(54, program54, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </section>\n        ";
  return buffer;
  }
function program52(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DATABASE_NAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.dbName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  }

function program54(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Endpoint)),stack1 == null || stack1 === false ? stack1 : stack1.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program56(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_NOT_READY", {hash:{},data:data}));
  }

function program58(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(59, program59, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-database-port\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DATABASE_PORT", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-type=\"number\" data-required=\"true\" data-min=\"1150\" data-max=\"65535\"/>\n        </section>\n        ";
  return buffer;
  }
function program59(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(60, program60, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program60(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.program(63, program63, data),fn:self.program(61, program61, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program61(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-database-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DATABASE_NAME", {hash:{},data:data}))
    + "</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-name\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.dbName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required=\"true\" data-ignore-regexp=\"^[a-zA-Z]+[0-9a-zA-Z_]*$\"/>\n        </section>\n        ";
  return buffer;
  }

function program63(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isMysql), {hash:{},inverse:self.noop,fn:self.program(61, program61, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program65(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.noop,fn:self.program(66, program66, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOracle), {hash:{},inverse:self.noop,fn:self.program(68, program68, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }
function program66(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <section class=\"property-control-group\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PG", {hash:{},data:data}))
    + "</label>\n            <div id=\"property-dbinstance-parameter-group-select\">\n            </div>\n        </section>\n        ";
  return buffer;
  }

function program68(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_CHARACTER_SET_NAME", {hash:{},data:data}))
    + "</label>\n            <div class=\"selectbox combo-dd\" id=\"property-dbinstance-charset-select\">\n                <div class=\"selection\"></div>\n                <div class=\"dropdown\">\n                    <div class=\"scroll-wrap scrollbar-auto-hide clearfix\">\n                        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                        <div class=\"scroll-content\">\n                            <ul>\n                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.oracleCharset), {hash:{},inverse:self.noop,fn:self.program(69, program69, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n        ";
  return buffer;
  }
function program69(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.charset)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.charset)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                                ";
  return buffer;
  }

function program71(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n    <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_NETWORK_AZ_DEPLOYMENT", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(72, program72, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div id=\"property-dbinstance-mutil-az\"></div>\n\n    </div>\n\n    ";
  return buffer;
  }
function program72(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-public-access-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.accessible), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-public-access-check\">\n                <label for=\"property-dbinstance-public-access-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-public-access-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_PUBLICLY_ACCESSIBLE", {hash:{},data:data}))
    + "</label>\n        </section>\n        ";
  return buffer;
  }

function program74(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPromoted), {hash:{},inverse:self.noop,fn:self.program(75, program75, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_BACKUP_OPTION", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n\n        <section class=\"property-control-group tooltip\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasSlave), {hash:{},inverse:self.program(79, program79, data),fn:self.program(77, program77, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-auto-backup-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.backupRetentionPeriod), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-auto-backup-check\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasSlave), {hash:{},inverse:self.noop,fn:self.program(82, program82, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableBackupForOldMySQL), {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\"property-dbinstance-auto-backup-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-auto-backup-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_ENABLE_AUTOMATIC_BACKUP", {hash:{},data:data}))
    + "</label>\n        </section>\n\n        <div id=\"property-dbinstance-auto-backup-group\" class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backupRetentionPeriod), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n\n            <section id=\"group-dbinstance-backup-period\" class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backupRetentionPeriod), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" >\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_BACKUP_RETENTION_PERIOD", {hash:{},data:data}))
    + "</label>\n                <input class=\"input shorter-input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.backupRetentionPeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-backup-period\" type=\"text\" data-type=\"digits\" data-min=\"1\" data-max=\"35\" data-ignore=\"true\">\n                <label class=\"property-label-right\" for=\"property-dbinstance-backup-period\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_BACK_RETANTION_PERIOD_DAY", {hash:{},data:data}))
    + "</label>\n            </section>\n\n            <section id=\"property-dbinstance-backup-window-select\" class=\"property-control-group\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_BACKUP_WINDOW", {hash:{},data:data}))
    + "</label>\n                <div class=\"property-dbinstance-radio-group\">\n                    <div class=\"radio\">\n                        <input id=\"property-dbinstance-backup-radio-no\" name=\"property-dbinstance-backup-radio\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backupWindow), {hash:{},inverse:self.noop,fn:self.program(84, program84, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"no\">\n                        <label for=\"property-dbinstance-backup-radio-no\"></label>\n                    </div>\n                    <label for=\"property-dbinstance-backup-radio-no\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_NO_PREFERENCE", {hash:{},data:data}))
    + "</label>\n                </div>\n                <div class=\"property-dbinstance-radio-group\">\n                    <div class=\"radio\">\n                        <input id=\"property-dbinstance-backup-radio-window\" name=\"property-dbinstance-backup-radio\" type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.backupWindow), {hash:{},inverse:self.noop,fn:self.program(84, program84, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"window\">\n                        <label for=\"property-dbinstance-backup-radio-window\"></label>\n                    </div>\n                    <label for=\"property-dbinstance-backup-radio-window\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SELECT_WINDOW", {hash:{},data:data}))
    + "</label>\n                </div>\n            </section>\n\n            <section id=\"property-dbinstance-backup-window-group\" class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backupWindow), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-control-group\">\n                <section class=\"property-control-group\">\n                    <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_START_TIME", {hash:{},data:data}))
    + "</label>\n                    <input class=\"input shorter-input\" type=\"text\" id=\"property-dbinstance-backup-window-start-time\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.backup)),stack1 == null || stack1 === false ? stack1 : stack1.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9:]*$\"/>\n                    <label>UTC</label>\n                </section>\n                <section class=\"property-control-group\">\n                    <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DURATION", {hash:{},data:data}))
    + "</label>\n                    <div class=\"selectbox shorter-dropdown\" id=\"property-dbinstance-backup-window-duration\">\n                        <div class=\"selection\"></div>\n                        <ul class=\"dropdown\">\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.backupDurations), {hash:{},inverse:self.noop,fn:self.program(86, program86, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </ul>\n                    </div>\n                    <label for=\"property-dbinstance-maintenance-window-duration\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_BACKUP_DURATION_HOUR", {hash:{},data:data}))
    + "</label>\n                </section>\n            </section>\n\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originBackupWindow), {hash:{},inverse:self.noop,fn:self.program(88, program88, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n\n        </div>\n    </div>\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isPromoted), {hash:{},inverse:self.noop,fn:self.program(90, program90, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(95, program95, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  return buffer;
  }
function program75(depth0,data) {
  
  
  return "expand";
  }

function program77(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_REPLICA_MUST_ENABLE_AUTOMATIC_BACKUPS", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program79(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disableBackupForOldMySQL), {hash:{},inverse:self.noop,fn:self.program(80, program80, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program80(depth0,data) {
  
  
  return "data-tooltip=\"DB Backups not supported on a read replica running a mysql version before 5.6\"";
  }

function program82(depth0,data) {
  
  
  return "disabled checked";
  }

function program84(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program86(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                            ";
  return buffer;
  }

function program88(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <section class=\"property-control-group\">\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_CURRENT_BACKUP_WINDOW", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.originBackupWindow)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            </section>\n            ";
  return buffer;
  }

function program90(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MAINTENANCE_OPTION", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n\n        <section id=\"property-dbinstance-maintenance-window-select\" class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MAINTENANCE_WINDOW", {hash:{},data:data}))
    + "</label>\n            <div class=\"property-dbinstance-radio-group\">\n                <div class=\"radio\">\n                    <input id=\"property-dbinstance-maintenance-radio-no\" name=\"property-dbinstance-maintenance-radio\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.maintenanceWindow), {hash:{},inverse:self.noop,fn:self.program(84, program84, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"no\">\n                    <label for=\"property-dbinstance-maintenance-radio-no\"></label>\n                </div>\n                <label for=\"property-dbinstance-maintenance-radio-no\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_NO_PREFERENCE", {hash:{},data:data}))
    + "</label>\n            </div>\n            <div class=\"property-dbinstance-radio-group\">\n                <div class=\"radio\">\n                    <input id=\"property-dbinstance-maintenance-radio-window\" name=\"property-dbinstance-maintenance-radio\" type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.maintenanceWindow), {hash:{},inverse:self.noop,fn:self.program(84, program84, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"window\">\n                    <label for=\"property-dbinstance-maintenance-radio-window\"></label>\n                </div>\n                <label for=\"property-dbinstance-maintenance-radio-window\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_SELECT_WINDOW", {hash:{},data:data}))
    + "</label>\n            </div>\n        </section>\n\n        <section id=\"property-dbinstance-maintenance-window-group\" class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.maintenanceWindow), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <section class=\"property-control-group\" >\n                <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_MAINTENANCE_START_DAY", {hash:{},data:data}))
    + "</label>\n                <div class=\"selectbox shorter-dropdown\" id=\"property-dbinstance-maintenance-window-start-day-select\">\n                    <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_MONDAY", {hash:{},data:data}))
    + "</div>\n                    <ul class=\"dropdown\" tabindex=\"-1\">\n                        <li class=\"item\" data-id=\"mon\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_MONDAY", {hash:{},data:data}))
    + "</li>\n                        <li class=\"item\" data-id=\"tue\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_TUESDAY", {hash:{},data:data}))
    + "</li>\n                        <li class=\"item\" data-id=\"wed\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_WEDNESDAY", {hash:{},data:data}))
    + "</li>\n                        <li class=\"item\" data-id=\"thu\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_THURSDAY", {hash:{},data:data}))
    + "</li>\n                        <li class=\"item\" data-id=\"fri\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_FRIDAY", {hash:{},data:data}))
    + "</li>\n                        <li class=\"item\" data-id=\"sat\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_SATURDAY", {hash:{},data:data}))
    + "</li>\n                        <li class=\"item\" data-id=\"sun\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.WEEKDAY_SUNDAY", {hash:{},data:data}))
    + "</li>\n                    </ul>\n                </div>\n            </section>\n            <section class=\"property-control-group\" >\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_START_TIME", {hash:{},data:data}))
    + "</label>\n                <input class=\"input shorter-input\" type=\"text\" id=\"property-dbinstance-maintenance-window-start-time\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.maintenance)),stack1 == null || stack1 === false ? stack1 : stack1.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required-rollback=\"true\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9:]*$\"/>\n                <label>UTC</label>\n            </section>\n            <section class=\"property-control-group\" >\n                <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_DURATION", {hash:{},data:data}))
    + "</label>\n                <div class=\"selectbox shorter-dropdown\" id=\"property-dbinstance-maintenance-window-duration\">\n                    <div class=\"selection\"></div>\n                    <ul class=\"dropdown\" tabindex=\"-1\">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.maintenanceDurations), {hash:{},inverse:self.noop,fn:self.program(91, program91, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n                <label for=\"property-dbinstance-maintenance-window-duration\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_BACKUP_DURATION_HOUR", {hash:{},data:data}))
    + "</label>\n            </section>\n\n        </section>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originMaintenanceWindow), {hash:{},inverse:self.noop,fn:self.program(93, program93, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n    ";
  return buffer;
  }
function program91(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                        ";
  return buffer;
  }

function program93(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_CURRENT_BACKUP_WINDOW", {hash:{},data:data}))
    + " <br/>"
    + escapeExpression(((stack1 = (depth0 && depth0.originMaintenanceWindow)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        </section>\n        ";
  return buffer;
  }

function program95(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.program(97, program97, data),fn:self.program(96, program96, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program96(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(99, program99, data),fn:self.program(97, program97, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  return buffer;
  }
function program97(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"option-group-head\" id=\"sg-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n    <div class=\"option-group sg-group\"></div>\n    ";
  return buffer;
  }

function program99(depth0,data) {
  
  
  return "\n    ";
  }

  buffer += "<article class=\"property-dbinstance\" data-bind=\"true\">\n\n    <div class=\"property-dbinstance-not-available-info hide\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP.DBINSTANCE_NOT_AVAILABLE", {hash:{},data:data}))
    + "\n    </div>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isPromoted), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isRestoreDB), {hash:{},inverse:self.noop,fn:self.program(74, program74, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });