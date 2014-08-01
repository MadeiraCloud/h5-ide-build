define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n        <div class=\"checkbox\">\n            <input id=\"property-dbinstance-apply-immediately\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.applyImmediately), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-apply-immediately\">\n            <label for=\"property-dbinstance-apply-immediately\"></label>\n        </div>\n        <label for=\"property-dbinstance-apply-immediately\">Apply Immediately</label>\n        <a class=\"tooltip icon-info\" href=\"http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.DBInstance.html#Overview.DBInstance.Modifying\" data-tooltip=\"Click to read AWS documentation on modifying DB instance using Apply Immediately.\" target=\"_blank\"></a>\n    </section>\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dl class=\"dl-vertical\">\n            <dt>DB Snapshot ID</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            <dt>DB Snapshot Size</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_APP_DBINSTANCE_ID", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.DbinstanceIdentifier), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </div>\n        ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return "(Pending Apply)";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-name\" >DB Instance Name</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n        </section>\n        ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "disabled data-tooltip=\"Scalling storage after launch a DB Instance is currently not supported for SQL Server.\"";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originAllocatedStorage), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <label>Current Allocated Storage: "
    + escapeExpression(((stack1 = (depth0 && depth0.originAllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</label>\n                ";
  return buffer;
  }

function program16(depth0,data) {
  
  
  return "hide";
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"property-info property-info-iops-adjust-tip ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.originIOPS), (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.originIOPS), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">When you initiate a storage type conversion between IOPS and standard storage, your DB Instance will have an availability impact for a few minutes.</div>\n        ";
  return buffer;
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_USERNAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.MasterUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n        ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-master-username\" >Master Username</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-master-username\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore-regexp=\"^[a-zA-Z]+[0-9a-zA-Z_]*$\" data-required-rollback=\"true\"/>\n        </section>\n        ";
  return buffer;
  }

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div class=\"property-control-group clearfix\">\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_NAME", {hash:{},data:data}))
    + "</label>\n            <div>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_PORT", {hash:{},data:data}))
    + "</label>\n            <div>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Endpoint), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        </div>\n        ";
  return buffer;
  }
function program25(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Endpoint)),stack1 == null || stack1 === false ? stack1 : stack1.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program27(depth0,data) {
  
  
  return "Not Ready";
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-database-port\" >Database Port</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-port\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-type=\"number\" data-required=\"true\"/>\n        </section>\n        ";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-database-name\" >Database Name</label>\n            <input class=\"input\"  type=\"text\" id=\"property-dbinstance-database-name\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.dbName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required=\"true\" data-ignore-regexp=\"^[a-zA-Z]+[0-9a-zA-Z_]*$\"/>\n        </section>\n        ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <label class=\"left\">Character Set Name</label>\n            <div class=\"selectbox combo-dd\" id=\"property-dbinstance-charset-select\">\n                <div class=\"selection\"></div>\n                <div class=\"dropdown\">\n                    <div class=\"scroll-wrap scrollbar-auto-hide clearfix\">\n                        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                        <div class=\"scroll-content\">\n                            <ul>\n                                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.oracleCharset), {hash:{},inverse:self.noop,fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n        ";
  return buffer;
  }
function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.charset)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.charset)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                                ";
  return buffer;
  }
function program34(depth0,data) {
  
  
  return "selected";
  }

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n    <div class=\"option-group-head expand\">Network & AZ Deployment</div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(39, program39, data),fn:self.program(37, program37, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div id=\"property-dbinstance-mutil-az\"></div>\n\n    </div>\n\n    ";
  return buffer;
  }
function program37(depth0,data) {
  
  
  return "\n\n        ";
  }

function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-public-access-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.accessible), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-public-access-check\">\n                <label for=\"property-dbinstance-public-access-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-public-access-check\">Publicly Accessible</label>\n        </section>\n        ";
  return buffer;
  }

function program41(depth0,data) {
  
  
  return "data-tooltip=\"DB instance serving as replication source must enable automatic backups\"";
  }

function program43(depth0,data) {
  
  
  return "disabled checked";
  }

function program45(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <div>\n                    <div class=\"radio\">\n                        <input id=\"property-dbinstance-backup-radio-no\" name=\"property-dbinstance-backup-radio\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backup), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"no\">\n                        <label for=\"property-dbinstance-backup-radio-no\"></label>\n                    </div>\n                    <label for=\"property-dbinstance-backup-radio-no\">No Preference</label>\n                </div>\n                <div>\n                    <div class=\"radio\">\n                        <input id=\"property-dbinstance-backup-radio-window\" name=\"property-dbinstance-backup-radio\" type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.backup), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"window\">\n                        <label for=\"property-dbinstance-backup-radio-window\"></label>\n                    </div>\n                    <label for=\"property-dbinstance-backup-radio-window\">Select Window</label>\n                </div>\n                ";
  return buffer;
  }
function program46(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program48(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                            <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                            ";
  return buffer;
  }

function program50(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div>\n                <div class=\"radio\">\n                    <input id=\"property-dbinstance-maintenance-radio-no\" name=\"property-dbinstance-maintenance-radio\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.maintenance), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"no\">\n                    <label for=\"property-dbinstance-maintenance-radio-no\"></label>\n                </div>\n                <label for=\"property-dbinstance-maintenance-radio-no\">No Preference</label>\n            </div>\n            <div>\n                <div class=\"radio\">\n                    <input id=\"property-dbinstance-maintenance-radio-window\" name=\"property-dbinstance-maintenance-radio\" type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.maintenance), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"window\">\n                    <label for=\"property-dbinstance-maintenance-radio-window\"></label>\n                </div>\n                <label for=\"property-dbinstance-maintenance-radio-window\">Select Window</label>\n            </div>\n            ";
  return buffer;
  }

function program52(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n                        ";
  return buffer;
  }

  buffer += "<article class=\"property-dbinstance\" data-bind=\"true\">\n\n    <div class=\"property-dbinstance-not-available-info hide\">\n        This DB instance is not in availabe status. To apply modification made for this instance, wait for its status to be available.\n    </div>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div class=\"option-group-head expand\">DB Instance Details</div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div id =\"lvia-container\"></div>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-version-update\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoMinorVersionUpgrade), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-version-update\">\n                <label for=\"property-dbinstance-version-update\"></label>\n            </div>\n            <label for=\"property-dbinstance-version-update\">Auto Minor Version Update</label>\n        </section>\n\n        <section class=\"property-control-group\">\n            <label>Allocated Storage</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <div class=\"ranged-number-input\">\n                <label for=\"property-dbinstance-storage\"></label>\n                <input id=\"property-dbinstance-storage\" type=\"text\" class=\"input parsley-validated property-input-left tooltip\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.allocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-dbinstance-storage\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-type=\"number\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isSqlserver), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\"property-dbinstance-storage\" class=\"property-label-right\">GB</label>\n            </div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n\n        <section class=\"property-control-group\">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-iops-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-iops-check\">\n                <label for=\"property-dbinstance-iops-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-iops-check\">Use Provisioned IOPS</label>\n        </section>\n\n        <section class=\"property-control-group property-dbinstance-iops-value-section ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <label class=\"left\">Provisioned IOPS</label>\n            <div class=\"ranged-number-input\">\n                <input class=\"input\" id=\"property-dbinstance-iops-value\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"iops-ranged\" data-ignore=\"true\" data-required=\"true\" data-type=\"number\">\n                <label for=\"property-dbinstance-iops-value\"></label>\n            </div>\n            <label class=\"property-dbinstance-iops-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.iopsInfo)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n        </section>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <section class=\"property-control-group\" >\n            <label class=\"left\" for=\"property-dbinstance-master-password\" >Master Password</label>\n            <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n            <input class=\"input\"  type=\"password\" id=\"property-dbinstance-master-password\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.password)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required-rollback=\"true\"/>\n        </section>\n\n    </div>\n\n    <div class=\"option-group-head expand\">Database Config</div>\n    <div class=\"option-group\">\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(29, program29, data),fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        <div class=\"property-control-group clearfix property-dbinstance-optiongroup\"></div>\n\n        <section class=\"property-control-group\">\n            <label class=\"left\">Parameter Group</label>\n            <div id=\"property-dbinstance-parameter-group-select\">\n            </div>\n        </section>\n\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOracle), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </div>\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideAZConfig), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n    <div class=\"option-group-head\">Backup Options</div>\n    <div class=\"option-group\">\n\n        <section class=\"property-control-group tooltip\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasSlave), {hash:{},inverse:self.noop,fn:self.program(41, program41, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"checkbox\">\n                <input id=\"property-dbinstance-auto-backup-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.backupRetentionPeriod), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-dbinstance-auto-backup-check\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasSlave), {hash:{},inverse:self.noop,fn:self.program(43, program43, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n                <label for=\"property-dbinstance-auto-backup-check\"></label>\n            </div>\n            <label for=\"property-dbinstance-auto-backup-check\">Enable Automatic Backups</label>\n        </section>\n\n        <div id=\"property-dbinstance-auto-backup-group\" class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backupRetentionPeriod), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n\n            <section id=\"group-dbinstance-backup-period\" class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backupRetentionPeriod), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" >\n                <label>Backup Retention Period</label>\n                <input class=\"input shorter-input\" title=\"hours\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.backupRetentionPeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-dbinstance-backup-period\" type=\"text\" data-type=\"number\" data-min=\"1\" data-max=\"35\" data-ignore=\"true\">\n                <label class=\"property-label-right\" for=\"property-dbinstance-backup-period\">day(s)</label>\n            </section>\n\n            <section id=\"property-dbinstance-backup-window-select\" class=\"property-control-group\">\n                <label>Backup Window</label>\n                ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(45, program45, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </section>\n\n            <section id=\"property-dbinstance-backup-window-group\" class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.backup), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-control-group\">\n                <section class=\"property-control-group\">\n                    <label>Start Time:</label>\n                    <input class=\"input shorter-input\" type=\"text\" id=\"property-dbinstance-backup-window-start-time\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.backup)),stack1 == null || stack1 === false ? stack1 : stack1.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required-rollback=\"true\"/>\n                    <label>UTC</label>\n                </section>\n                <section class=\"property-control-group\">\n                    <label>Duration:</label>\n                    <div class=\"selectbox shorter-dropdown\" id=\"property-dbinstance-backup-window-duration\">\n                        <div class=\"selection\"></div>\n                        <ul class=\"dropdown\">\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.backupDurations), {hash:{},inverse:self.noop,fn:self.program(48, program48, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                        </ul>\n                    </div>\n                </section>\n            </section>\n\n        </div>\n\n    </div>\n\n    <div class=\"option-group-head\">Maintenance Options</div>\n    <div class=\"option-group\">\n\n        <section id=\"property-dbinstance-maintenance-window-select\" class=\"property-control-group\">\n            <label>Maintenance Window</label>\n            ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(50, program50, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n\n        <div id=\"property-dbinstance-maintenance-window-group\" class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.maintenance), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <section class=\"property-control-group\" >\n                <label class=\"left\">Start Day</label>\n                <div class=\"selectbox shorter-dropdown\" id=\"property-dbinstance-maintenance-window-start-day-select\">\n                    <div class=\"selection\">Monday</div>\n                    <ul class=\"dropdown\" tabindex=\"-1\">\n                        <li class=\"item\" data-id=\"mon\">Monday</li>\n                        <li class=\"item\" data-id=\"tue\">Tuesday</li>\n                        <li class=\"item\" data-id=\"wed\">Wednesday</li>\n                        <li class=\"item\" data-id=\"thu\">Thursday</li>\n                        <li class=\"item\" data-id=\"fri\">Friday</li>\n                        <li class=\"item\" data-id=\"sat\">Saturday</li>\n                        <li class=\"item\" data-id=\"sun\">Sunday</li>\n                    </ul>\n                </div>\n            </section>\n            <section class=\"property-control-group\" >\n                <label>Start Time:</label>\n                <input class=\"input shorter-input\" type=\"text\" id=\"property-dbinstance-maintenance-window-start-time\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.maintenance)),stack1 == null || stack1 === false ? stack1 : stack1.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required-rollback=\"true\"/>\n                <label>UTC</label>\n            </section>\n            <section class=\"property-control-group\" >\n                <label>Duration:</label>\n                <div class=\"selectbox shorter-dropdown\" id=\"property-dbinstance-maintenance-window-duration\">\n                    <div class=\"selection\"></div>\n                    <ul class=\"dropdown\" tabindex=\"-1\">\n                        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.maintenanceDurations), {hash:{},inverse:self.noop,fn:self.program(52, program52, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                    </ul>\n                </div>\n                <label for=\"property-dbinstance-maintenance-window-duration\">hour(s)</label>\n            </section>\n        </div>\n\n    </div>\n\n    <div class=\"option-group-head\" id=\"sg-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n    <div class=\"option-group sg-group\"></div>\n\n</article>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });