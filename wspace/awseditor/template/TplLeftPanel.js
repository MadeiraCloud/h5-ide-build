define(['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "disabled";
  }

function program3(depth0,data) {
  
  
  return "disableRds";
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<li class=\"tooltip resource-item vgw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VGW", {hash:{},data:data}))
    + "' data-type=\"VGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VGW", {hash:{},data:data}))
    + "</li>";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "<li class=\"tooltip resource-item cgw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_CGW", {hash:{},data:data}))
    + "' data-type=\"CGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_CGW", {hash:{},data:data}))
    + "</li>";
  return buffer;
  }

  buffer += "<button class=\"tooltip sidebar-hider icon-caret-left HideOEPanelLeft\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'></button>\n\n<header class=\"sidebar-title\"> "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RESOURCES", {hash:{},data:data}))
    + "\n  <i class=\"icon-resources js-toggle-dropdown menu-manage-shard-res tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_SHARED_RESOURCES", {hash:{},data:data}))
    + "\"></i>\n  <ul class=\"dropdown-menu resources-dropdown-wrapper\">\n    <li data-action=\"keypair\" class=\"icon-kp\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_KEY_PAIR", {hash:{},data:data}))
    + "</span></li>\n    <li data-action=\"snapshot\" class=\"icon-ebs-snap\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_EBS_SNAPSHOT", {hash:{},data:data}))
    + "</span></li>\n    <li data-action=\"sns\" class=\"icon-sns\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SNS_SUBSCRIPTION", {hash:{},data:data}))
    + "</span></li>\n    <li data-action=\"sslcert\" class=\"icon-cert\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SERVER_CERTIFICATE", {hash:{},data:data}))
    + "</span></li>\n    <li data-action=\"dhcp\" class=\"icon-dhcp\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_DHCP_OPTION_SETS", {hash:{},data:data}))
    + "</span></li>\n    <li data-action=\"rdspg\" class=\"icon-pg ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rdsDisabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_DB_PARAMETER_GROUPS", {hash:{},data:data}))
    + "</span></li>\n    <li data-action=\"rdssnapshot\" class=\"icon-rds-snap ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rdsDisabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_DB_SNAPSHOT", {hash:{},data:data}))
    + "</span></li>\n  </ul>\n  <i class=\"refresh-resource-panel icon-refresh tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_REFRESH_RESOURCE_LIST", {hash:{},data:data}))
    + "\"></i>\n</header>\n\n<div class=\"fixedaccordion accordion-default\">\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AZ", {hash:{},data:data}))
    + "</header>\n    <ul class=\"resource-list-az clearfix accordion-body\">\n      <li class=\"tooltip resource-item az\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_AZ", {hash:{},data:data}))
    + "' data-type=\"AZ\">\n        <div class=\"resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"res-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.AZ_AND_SUBNET", {hash:{},data:data}))
    + "</div>\n      </li>\n      <li class=\"tooltip resource-item subnet\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_SUBNET", {hash:{},data:data}))
    + "' data-type=\"SUBNET\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_SUBNET", {hash:{},data:data}))
    + "</li>\n      <li class=\"tooltip resource-item subnetgroup\" data-type=\"DBSBG\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_SUBNET_GROUP", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AMI", {hash:{},data:data}))
    + "\n      <nav class=\"selectbox resource-select AmiTypeSelect js-toggle-dropdown\">\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</div>\n        <ul class=\"dropdown\">\n          <li class=\"item selected\" data-id=\"QuickStartAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"MyAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_MY_AMI", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"FavoriteAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_FAVORITE_AMI", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </nav>\n    </header>\n    <div class=\"accordion-body nano\">\n      <button class=\"btn btn-primary BrowseCommunityAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_BTN_BROWSE_COMMUNITY_AMI", {hash:{},data:data}))
    + "</button>\n      <ul class=\"nano-content resource-list-ami\"></ul>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VOL", {hash:{},data:data}))
    + "</header>\n    <div class=\"accordion-body nano\">\n      <button class=\"btn btn-primary ManageSnapshot ManageEbsSnapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_SNAPSHOT_MANAGE", {hash:{},data:data}))
    + "</button>\n      <div class=\"nano-content\">\n        <div class=\"resource-list-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_BLANK_VOL", {hash:{},data:data}))
    + "</div>\n        <ul class=\"clearfix\"><li class=\"tooltip resource-item volume\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VOLUME", {hash:{},data:data}))
    + "' data-type=\"VOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VOL", {hash:{},data:data}))
    + "</li></ul>\n        <div class=\"resource-list-head\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VOL_FROM_SNAPSHOT", {hash:{},data:data}))
    + "\n          <div class=\"selectbox resource-list-sort-select dark\" id=\"resource-list-sort-select-snapshot\">\n            <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_DATE", {hash:{},data:data}))
    + "</div>\n            <ul class=\"dropdown\">\n              <li class=\"item selected focused\" data-id=\"date\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_DATE", {hash:{},data:data}))
    + "</li>\n              <li class=\"item\" data-id=\"storge\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_STORAGE", {hash:{},data:data}))
    + "</li>\n            </ul>\n          </div>\n        </div>\n        <ul class=\"resource-list-snapshot\"></ul>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RDS", {hash:{},data:data}))
    + "</header>\n    <div class=\"accordion-body nano ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rdsDisabled), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"disableRds-content\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_MSG_RDS_DISABLED", {hash:{},data:data}))
    + "</div>\n      <button class=\"btn btn-primary ManageSnapshot ManageRdsSnapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RDS_SNAPSHOT_MANAGE", {hash:{},data:data}))
    + "</button>\n      <div class=\"nano-content\">\n        <div class=\"resource-list-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RDS_INSTANCE", {hash:{},data:data}))
    + "</div>\n        <ul class=\"resource-list-rds\"></ul>\n        <div class=\"resource-list-head\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RDS_INSTANCE_FROM_SNAPSHOT", {hash:{},data:data}))
    + "\n          <div class=\"selectbox resource-list-sort-select dark\" id=\"resource-list-sort-select-rds-snapshot\">\n            <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_DATE", {hash:{},data:data}))
    + "</div>\n            <ul class=\"dropdown\">\n              <li class=\"item selected focused\" data-id=\"date\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_DATE", {hash:{},data:data}))
    + "</li>\n              <li class=\"item\" data-id=\"engine\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_ENGINE", {hash:{},data:data}))
    + "</li>\n              <li class=\"item\" data-id=\"storge\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_SORT_BY_STORAGE", {hash:{},data:data}))
    + "</li>\n            </ul>\n          </div>\n        </div>\n        <ul class=\"resource-list-rds-snapshot\"></ul>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_ELB_ASG", {hash:{},data:data}))
    + "</header>\n    <ul class=\"resource-list-asg clearfix accordion-body\">\n      <li class=\"tooltip resource-item elb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ELB", {hash:{},data:data}))
    + "' data-type=\"ELB\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ELB", {hash:{},data:data}))
    + "</li>\n      <li class=\"tooltip resource-item asg\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ASG", {hash:{},data:data}))
    + "' data-type=\"ASG\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ASG", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n\n  <section class='accordion-group'>\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VPC", {hash:{},data:data}))
    + "</header>\n    <ul class=\"accordion-body\">\n      <li class=\"tooltip resource-item rtb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_RTB", {hash:{},data:data}))
    + "' data-type=\"RT\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RTB", {hash:{},data:data}))
    + "</li>\n\n      <li class=\"tooltip resource-item igw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_IGW", {hash:{},data:data}))
    + "' data-type=\"IGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_IGW", {hash:{},data:data}))
    + "</li>\n\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasVGW), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasCGW), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      <li class=\"tooltip resource-item eni\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ENI", {hash:{},data:data}))
    + "' data-type=\"ENI\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ENI", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n</div>";
  return buffer;
  };
TEMPLATE.panel=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble snapshot\" data-date=\""
    + escapeExpression(((stack1 = (depth0 && depth0.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-storge=\""
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bubble-template=\"resPanelSnapshot\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"region\":\""
    + escapeExpression(((stack1 = (depth2 && depth2.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"VOL\" data-option='{\"volumeSize\":"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", \"snapshotId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"encrypted\": \"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.encrypted), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"}'>\n  <div class=\"ebs-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "true";
  }

function program5(depth0,data) {
  
  
  return "false";
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div style=\"padding-bottom:15px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_NO_EBS_SNAPSHOT", (depth0 && depth0.region), {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.snapshot=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0[0])),stack1 == null || stack1 === false ? stack1 : stack1.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item dbinstance tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"DBINSTANCE\" data-option='{\"engine\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n<div class=\"resource-icon-dbinstance\"><img src=\"/assets/images/ide/icon/rds-"
    + escapeExpression(helpers.firstOfSplit.call(depth0, (depth0 && depth0.Engine), "-", {hash:{},data:data}))
    + ".png\" width=\"42\" height=\"30\"></div>\n"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.rds=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item dbsnapshot bubble\" data-date=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SnapshotCreateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-engine=\""
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-storge=\""
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"DBINSTANCE\" data-option='{\"engine\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"snapshotId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.DBSnapshotIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"allocatedStorage\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" }' data-bubble-template=\"resPanelDbSnapshot\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.DBSnapshotIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"region\":\""
    + escapeExpression(((stack1 = (depth1 && depth1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n  <div class=\"resource-icon-dbsnapshot\"><img src=\"/assets/images/ide/icon/rds-"
    + escapeExpression(helpers.firstOfSplit.call(depth0, (depth0 && depth0.Engine), "-", {hash:{},data:data}))
    + ".png\" width=\"32\" height=\"23\">\n  <div class=\"rds-snapshot-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div style=\"padding-bottom:15px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_NO_DB_SNAPSHOT", (depth0 && depth0.region), {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(3, program3, data),fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.rds_snapshot=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"bubble resource-item instance\" data-bubble-template=\"resPanelAmiInfo\" data-bubble-data='{\"region\":\""
    + escapeExpression(((stack1 = (depth2 && depth2.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"INSTANCE\" data-option='{\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n  ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.fav), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"resource-icon-instance\"><img src=\"/assets/images/ide/ami/"
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width='39' height='27' /></div>\n  "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button class=\"btn-fav-ami fav tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_TOGGLE_FAVORITE", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></button>";
  return buffer;
  }

function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fav), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "<p class=\"blank-slate\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_BROWSE_COMMUNITY_AMI", {hash:{},data:data}))
    + "</p>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(5, program5, data),fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.ami=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"resource-icon resource-icon-instance\" >\n  <img src=\"/assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\"/>\n</div>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOUD_RESOURCE_AUTO_SCALING_GROUP", {hash:{},data:data}))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
  return buffer;
  };
TEMPLATE.reuse_lc=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.id), (depth0 && depth0.ID), {hash:{},data:data}))
    + "</div>\n<dl class=\"bubble-content dl-horizontal\">";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>";
  return buffer;
  };
TEMPLATE.resourcePanelBubble=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });