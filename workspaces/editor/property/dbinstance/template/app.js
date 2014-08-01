define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"highlight-status\">(Pending Apply)=>["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.DbinstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.Endpoint)),stack1 == null || stack1 === false ? stack1 : stack1.Address), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ":";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Endpoint), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.Port), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  }
function program4(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Endpoint)),stack1 == null || stack1 === false ? stack1 : stack1.Address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program6(depth0,data) {
  
  
  return "(Not Ready)";
  }

function program8(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Endpoint)),stack1 == null || stack1 === false ? stack1 : stack1.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program10(depth0,data) {
  
  
  return "Not Ready";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"highlight-status\">(Pending Apply)=>["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.Port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>";
  return buffer;
  }

function program14(depth0,data) {
  
  
  return "green";
  }

function program16(depth0,data) {
  
  
  return "yellow";
  }

function program18(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "Unavailable("
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"highlight-status\">(Pending Apply)=>["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>";
  return buffer;
  }

function program24(depth0,data) {
  
  
  return "Yes";
  }

function program26(depth0,data) {
  
  
  return "No";
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"highlight-status\">(Pending Apply)=>["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.DbinstanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>";
  return buffer;
  }

function program30(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.Iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program32(depth0,data) {
  
  
  return "Disabled";
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"highlight-status\">(Pending Apply)=>["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.Iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]</span>";
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"highlight-status\">(Pending Apply)=>["
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB]</span>";
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ReadReplicaDBInstanceIdentifiers), {hash:{},inverse:self.noop,fn:self.program(39, program39, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  return buffer;
  }
function program39(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_READ_REPLICAS", {hash:{},data:data}))
    + "</dt>\n                    <dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>\n                ";
  return buffer;
  }

function program41(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_REPLICAS_SOURCE", {hash:{},data:data}))
    + "</dt>\n                <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ReadReplicaSourceDBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            ";
  return buffer;
  }

function program43(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_NAME", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>";
  return buffer;
  }

function program45(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_OG", {hash:{},data:data}))
    + "</dt>\n                <dd>";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.optionGroups), {hash:{},inverse:self.noop,fn:self.program(46, program46, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </dd>\n            ";
  return buffer;
  }
function program46(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.program(49, program49, data),fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                ";
  return buffer;
  }
function program47(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        "
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n                    ";
  return buffer;
  }

function program49(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <a class=\"db-og-in-app\">"
    + escapeExpression(((stack1 = (depth0 && depth0.OptionGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.Status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</a>\n                    ";
  return buffer;
  }

function program51(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_PG", {hash:{},data:data}))
    + "</dt>\n                <dd>\n                    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.DBParameterGroups), {hash:{},inverse:self.noop,fn:self.program(52, program52, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </dd>\n            ";
  return buffer;
  }
function program52(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        "
    + escapeExpression(((stack1 = (depth0 && depth0.DBParameterGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.ParameterApplyStatus)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")\n                    ";
  return buffer;
  }

function program54(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "(";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.DBSubnetGroup)),stack1 == null || stack1 === false ? stack1 : stack1.Subnets), {hash:{},inverse:self.noop,fn:self.program(55, program55, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ")";
  return buffer;
  }
function program55(depth0,data) {
  
  var buffer = "", stack1;
  buffer += escapeExpression(((stack1 = (depth0 && depth0.SubnetIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", ";
  return buffer;
  }

function program57(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_SECONDARY_ZONE", {hash:{},data:data}))
    + "</dt>\n                <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.SecondaryAvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            ";
  return buffer;
  }

function program59(depth0,data) {
  
  
  return "true";
  }

function program61(depth0,data) {
  
  
  return "false";
  }

function program63(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "Enabled ("
    + escapeExpression(((stack1 = (depth0 && depth0.BackupRetentionPeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " day)";
  return buffer;
  }

  buffer += "<article class=\"property-app app-dbinstance\">\n    <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\" style=\"display: block\">\n        <dl class=\"dl-vertical\">\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_APP_DBINSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.DbinstanceIdentifier), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_ENDPOINT", {hash:{},data:data}))
    + "</dt>\n            <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Endpoint), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_STATUS", {hash:{},data:data}))
    + "</dt>\n            <dd><i class=\"status status-";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.DBInstanceStatus), "available", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.DBInstanceStatus), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_ENGINE", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "("
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.EngineVersion), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_AUTO_UPGRADE", {hash:{},data:data}))
    + "</dt>\n            <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.AutoMinorVersionUpgrade), {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_CLASS", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceClass)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.DbinstanceClass), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_IOPS", {hash:{},data:data}))
    + "</dt>\n            <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Iops), {hash:{},inverse:self.program(32, program32, data),fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.Iops), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_STORAGE", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.AllocatedStorage), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_USERNAME", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.MasterUsername)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ReadReplicaDBInstanceIdentifiers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(38, program38, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ReadReplicaSourceDBInstanceIdentifier), {hash:{},inverse:self.noop,fn:self.program(41, program41, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </dl>\n    </div>\n\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_DBCONFIG", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        <dl class=\"dl-vertical\">\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.name), {hash:{},inverse:self.noop,fn:self.program(43, program43, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_PORT", {hash:{},data:data}))
    + "</dt>\n            <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.Endpoint), {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.PendingModifiedValues)),stack1 == null || stack1 === false ? stack1 : stack1.Port), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.optionGroups)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(45, program45, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.DBParameterGroups)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(51, program51, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n        </dl>\n    </div>\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_NETWORK_AVAILABILITY", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        <dl class=\"dl-vertical\">\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_SUBNETGROUP", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.DBSubnetGroup)),stack1 == null || stack1 === false ? stack1 : stack1.DBSubnetGroupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.DBSubnetGroup)),stack1 == null || stack1 === false ? stack1 : stack1.Subnets)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(54, program54, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_PREFERRED_ZONE", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.AvailabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.SecondaryAvailabilityZone), {hash:{},inverse:self.noop,fn:self.program(57, program57, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_PUBLIC_ACCESS", {hash:{},data:data}))
    + "</dt>\n            <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.PubliclyAccessible), {hash:{},inverse:self.program(61, program61, data),fn:self.program(59, program59, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_LICENSE_MODEL", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.LicenseModel)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n    </div>\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_BACKUP_MAINTENANCE", {hash:{},data:data}))
    + "</div>\n    <div class=\"option-group\">\n        <dl class=\"dl-vertical\">\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_AUTOBACKUP", {hash:{},data:data}))
    + "</dt>\n            <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.BackupRetentionPeriod), {hash:{},inverse:self.program(32, program32, data),fn:self.program(63, program63, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_LAST_RESTORE", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.LatestRestorableTime), {hash:{},data:data}))
    + "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_BACKUP_WINDOW", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.PreferredBackupWindow)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n            <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_DBINSTANCE_MAINTENANCE_WINDOW", {hash:{},data:data}))
    + "</dt>\n            <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.PreferredMaintenanceWindow)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n    </div>\n\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_TIT_SG", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n    <div class=\"option-group sg-group\"></div>\n\n\n</article>";
  return buffer;
  };
TEMPLATE.appView=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });