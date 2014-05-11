define('ui/MC.template',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"tab":{},"notification":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li id=\"tab-bar-"
    + escapeExpression(((stack1 = (depth0 && depth0.tab_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tab-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.tab_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<a href=\"#tab-content-"
    + escapeExpression(((stack1 = (depth0 && depth0.tab_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.tab_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tab-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.tab_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"truncate tab-bar-truncate\">\n		<i class=\"icon-tabbar-label\"></i>\n		"
    + escapeExpression(((stack1 = (depth0 && depth0.tab_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n	</a>\n	<a href=\"javascript:void(0)\" class=\"close-restriction icon-close\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIT_CLOSE_TAB", {hash:{},data:data}))
    + "\"></a>\n</li>\n\n";
  return buffer;
  };
TEMPLATE.tab.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li id=\"tab-bar-"
    + escapeExpression(((stack1 = (depth0 && depth0.target_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<a href=\"#tab-content-"
    + escapeExpression(((stack1 = (depth0 && depth0.target_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-toggle=\"tab\" class=\"truncate tab-bar-truncate\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.target_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		<i class=\"icon-dashboard-tabbar icon-tabbar-label\"></i>\n		"
    + escapeExpression(((stack1 = (depth0 && depth0.target_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n	</a>\n	<a href=\"javascript:void(0)\" class=\"icon-close close-tab\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIT_CLOSE_TAB", {hash:{},data:data}))
    + "\"></a>\n</li>\n\n";
  return buffer;
  };
TEMPLATE.tab.dashboard=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n		<i class=\"notification_close\">&times;</i>\n	";
  }

  buffer += "<div class=\"notification_item "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_item\">\n	<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.template)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.should_stay), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n\n";
  return buffer;
  };
TEMPLATE.notification.item=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width: 520px\">\n    <div class=\"modal-header\">\n        <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n        <i class=\"modal-close\">&times;</i>\n    </div>\n    <div class=\"modal-body\">\n        <p class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0['intro-1'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        <p class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0['intro-2'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n        <div class=\"modal-center-align-helper\">\n            <div class=\"modal-control-group\">\n                <div id=\"replace_stack\" style=\"padding: 10px 0\">\n                    <div class=\"radio\">\n                        <input id=\"radio-replace-stack\" type=\"radio\" name=\"save-stack-type\" checked>\n                        <label for=\"radio-replace-stack\"></label>\n                    </div>\n                    <label class=\"modal-text-minor\" for=\"radio-replace-stack\">"
    + escapeExpression(((stack1 = (depth0 && depth0.replace)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n                    <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                        "
    + escapeExpression(((stack1 = (depth0 && depth0['replace-info'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " \""
    + escapeExpression(((stack1 = (depth0 && depth0.input)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" "
    + escapeExpression(((stack1 = (depth0 && depth0['replace-info-end'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                    </div>\n                </div>\n                <div id=\"save_new_stack\">\n                   <div class=\"radio\">\n                       <input id=\"radio-new-stack\" type=\"radio\" name=\"save-stack-type\">\n                       <label for=\"radio-new-stack\"></label>\n                   </div>\n                   <label class=\"modal-text-minor\" for=\"radio-new-stack\">"
    + escapeExpression(((stack1 = (depth0 && depth0['save-new'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n                   <div style=\"padding: 10px 22px\" class=\"radio-instruction hide\">\n                       <p>"
    + escapeExpression(((stack1 = (depth0 && depth0.instruction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                       <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.input)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                       <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">"
    + escapeExpression(((stack1 = (depth0 && depth0['error-message'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n                   </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"modal-footer\">\n        <button id=\"btn-confirm\" class=\"btn btn-"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.confirm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n        <button class=\"btn modal-close btn-silver\">Cancel</button>\n    </div>\n</div>\n\n\n";
  return buffer;
  };
TEMPLATE.modalAppToStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div class=\"modal-text-wraper\">\n				<div class=\"modal-center-align-helper\">\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.input), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			</div>\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"modal-control-group\">\n							<label class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.body)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n							<input id=\"modal-input-value\" class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.input)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" />\n						</div>\n					";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"modal-text-major\">\n							";
  stack1 = ((stack1 = (depth0 && depth0.body)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_asg), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n							<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_ASG", {hash:{},data:data}))
    + "</div>\n						";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<div class=\"terminate-pro-app-confirm\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_stop), {hash:{},inverse:self.program(11, program11, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<p class=\"confirm-area\"><input class=\"input\" id=\"confirm-app-name\" data-confirm=\""
    + escapeExpression(((stack1 = (depth0 && depth0.app_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/></p>\n			</div>\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<p><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.app_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_PROD_APP_MSG", {hash:{},data:data}))
    + "\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_asg), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</p>\n					<p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n				";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n							"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_STOP_ASG", {hash:{},data:data}))
    + "\n						";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<p><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.app_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_PROD_APP_WARNING_MSG", {hash:{},data:data}))
    + "</b>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_MSG", {hash:{},data:data}))
    + "</p>\n					<p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_TERMINATE_PROD_APP_INPUT_LBL", {hash:{},data:data}))
    + "</p>\n				";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "disabled";
  }

  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n	<div class=\"modal-body\">\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.is_production), {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"btn-confirm\" class=\"btn btn-"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_production), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = (depth0 && depth0.confirm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:700px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n	<div class=\"modal-body\">\n		<textarea id=\"json-content\"></textarea>\n	</div>\n	<div class=\"modal-footer\">\n		<a id=\"btn-confirm\" class=\"btn btn-"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" href=\"data://text/plain;, ";
  stack1 = ((stack1 = (depth0 && depth0.filecontent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" download=\""
    + escapeExpression(((stack1 = (depth0 && depth0.download)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.confirm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalToolbar=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"modal-export-cf\" style=\"width:468px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_EXPORT_CF", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n			<div class=\"modal-text-major\"></div>\n			<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_EXPORT_CF_INFO", {hash:{},data:data}))
    + "</div>\n		</div> </div>\n	</div>\n	<div class=\"modal-footer\">\n		<a id=\"tpl-download\" class=\"btn btn-blue modal-close disabled\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_EXPORT_CF", {hash:{},data:data}))
    + "</a>\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.exportCloudFormation=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div style=\"width:468px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n			<div class=\"modal-text-major\"></div>\n			<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</div>\n		</div> </div>\n	</div>\n	<div class=\"modal-footer\">\n		<a class=\"btn btn-blue modal-close\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\" download=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n		<button id=\"tpl-cancel\" class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.exportJSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:468px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_JSON_TIT", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\" style=\"min-height:0px;\">\n		<div id=\"modal-import-json-dropzone\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_DROP_LBL", {hash:{},data:data}))
    + "<label for=\"modal-import-json-file\" class=\"select-file-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_IMPORT_SELECT_LBL", {hash:{},data:data}))
    + "</label><input type=\"file\" id=\"modal-import-json-file\"></div>\n		<div id=\"import-json-error\"></div>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.importJSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n\n	<div class=\"modal-body\">\n		<div class=\"loading-spinner\"></div>\n	</div>\n\n	<div class=\"modal-footer\">\n		<a id=\"btn-confirm\" class=\"btn btn-"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" >"
    + escapeExpression(((stack1 = (depth0 && depth0.confirm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.exportPNG=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-resource-instance-detail\" style=\"width:420px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n\n	<div class=\"modal-body\">\n		<dl class=\"dl-horizontal\">\n			<dt>DnsName</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.dnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>Architecture</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>EbsOptimized</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ebsOptimized)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>GroupSet</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.groupSet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>Hypervisor</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.hypervisor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>ImageId</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>InstanceState</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceState)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>InstanceType</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>IpAddress</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ipAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>KernelId</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>KeyName</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>LaunchTime</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.launchTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>Monitoring</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.monitoring)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>NetworkInterfaceSet</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.networkInterfaceSet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>AvailabilityZone</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.availabilityZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>PrivateDnsName</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>RootDeviceName</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n			<dt>RootDeviceType</dt>\n			<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		</dl>\n	</div>\n\n	<div class=\"modal-footer\">\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_BTN_CLOSE", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalResourceInstanceDetail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n<div class=\"modal-resource-detail\" style=\"width:800px\">\n";
  }

function program3(depth0,data) {
  
  
  return "\n<div class=\"modal-resource-detail\" style=\"width:420px\">\n";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<br />\n		<br />\n		<table class=\"table table-light\">\n			<thead>\n				<tr>\n					";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.detail_table)),stack1 == null || stack1 === false ? stack1 : stack1.th_set), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</tr>\n			</thead>\n			<tbody>\n				<tr>\n				";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.detail_table)),stack1 == null || stack1 === false ? stack1 : stack1.tr1_set), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</tr>\n\n				<tr>\n				";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.detail_table)),stack1 == null || stack1 === false ? stack1 : stack1.tr2_set), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</tr>\n			</tbody>\n		</table>\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "";
  buffer += "\n					<th style=\"width:160px\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</th>\n					";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "\n					<td>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n				";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.detail_table), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n	<div class=\"modal-body\">\n		<dl class=\"dl-horizontal\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sub_info), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</dl>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.detail_table), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"modal-footer\">\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_BTN_CLOSE", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalRegionResourceDetail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>Start Time:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['start-time'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Stop Time:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['end-time'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Estimated Cost:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cost)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleTest=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head alert\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleAlert=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head suggest\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleSuggest=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\"><i class=\"icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>Start Time:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['start-time'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Stop Time:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['end-time'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<!--dt>Estimated Cost:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cost)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd-->\n	</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleAppInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\"><i class=\"status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-("
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>Launch Time:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['launch-time'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Availability Zone:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.az)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Instance Type:</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0['instance-type'])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleInstanceInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\"><i class=\"status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n<dl class=\"dl-horizontal\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sub_info), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleRegionResourceInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bubble-head\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>SnapshotId</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>StartTime</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Status</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Size</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleSnapshotInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.imageOwnerAlias)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  
  return "No Alias";
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_NAME", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ARCHITECTURE", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_IMAGELOCATION", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_IMAGEOWNERALIAS", {hash:{},data:data}))
    + "</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.imageOwnerAlias), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_IMAGEOWNERID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageOwnerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ISPUBLIC", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.isPublic)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_KERNELID", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ROOTDEVICENAME", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_BUB_ROOTDEVICETYPE", {hash:{},data:data}))
    + "</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleAMIInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "true";
  }

function program3(depth0,data) {
  
  
  return "false";
  }

  buffer += "<div class=\"bubble-head\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<div class=\"bubble-content\">\n	<dl class=\"dl-horizontal\">\n		<dt>Name</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Description</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Architecture</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Image Location</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageLocation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Public</dt>\n		<dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isPublic), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n		<dt>KernelId</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.kernelId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Root Device Name</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Root Device Type</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Image Size</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt>Support Instance Type</dt>\n		<dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instance_type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.bubbleAMIMongoInfo=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:660px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_CREATE_THIS_STACK_IN", {hash:{},data:data}))
    + ":</h3>\n		<i class=\"modal-close\">×</i>\n	</div>\n	<div class=\"modal-body\">\n		<div id=\"createNewStack_wrap\">\n			<ul class=\"clearfix\">\n				<li>\n					<a class=\"new-stack-dialog\" href=\"javascript:void(0)\" data-supported-platform=\"ec2-classic\">\n						<h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_CLASSIC", {hash:{},data:data}))
    + "</h4>\n						<p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_CLASSIC_INTRO", {hash:{},data:data}))
    + ".</p>\n					</a>\n				</li>\n				<li>\n					<a class=\"new-stack-dialog\" href=\"javascript:void(0)\" data-supported-platform=\"ec2-vpc\">\n						<h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_VPC", {hash:{},data:data}))
    + "</h4>\n						<p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_VPC_INTRO", {hash:{},data:data}))
    + ".</p>\n					</a>\n				</li>\n			</ul>\n		</div>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.createNewStackClassic=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:400px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_CREATE_STACK_ERROR", {hash:{},data:data}))
    + "</h3>\n		<i class=\"modal-close\">×</i>\n	</div>\n	<div class=\"modal-body\">\n		<div id=\"createNewStack_wrap\" class=\"load-account-attr-error\">\n			<p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_FALE_LOAD_RESOURCE_PLEASE_RETRY", {hash:{},data:data}))
    + "</p>\n			<button class=\"btn btn-blue\" id=\"reload-account-attributes\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_BTN_RETRY", {hash:{},data:data}))
    + "</button>\n		</div>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.createNewStackErrorAndReload=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:660px\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_CREATE_THIS_STACK_IN", {hash:{},data:data}))
    + ":</h3>\n		<i class=\"modal-close\">×</i>\n	</div>\n	<div class=\"modal-body\">\n		<div id=\"createNewStack_wrap\">\n			<ul class=\"clearfix\">\n				<li>\n					<a class=\"new-stack-dialog\" href=\"javascript:void(0)\" data-supported-platform=\"default-vpc\">\n						<h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_DEFAULT_VPC", {hash:{},data:data}))
    + "</h4>\n						<p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_DEFAULT_VPC_INTRO", {hash:{},data:data}))
    + ".</p>\n					</a>\n				</li>\n				<li>\n					<a class=\"new-stack-dialog\" href=\"javascript:void(0)\" data-supported-platform=\"custom-vpc\">\n						<h4>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_CUSTOM_VPC", {hash:{},data:data}))
    + "</h4>\n						<p>"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_POP_CREATE_STACK_VPC_INTRO", {hash:{},data:data}))
    + ".</p>\n					</a>\n				</li>\n			</ul>\n		</div>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.createNewStackVPC=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\nIPSec Tunnel #"
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n================================================================================\n#1: Internet Key Exchange Configuration\n\nConfigure the IKE SA as follows\n  - Authentication Method    : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_protocol_method)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Pre-Shared Key           : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_pre_shared_key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Authentication Algorithm : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_authentication_protocol_algorithm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Encryption Algorithm     : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_encryption_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Lifetime                 : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_lifetime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds\n  - Phase 1 Negotiation Mode : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Perfect Forward Secrecy  : "
    + escapeExpression(((stack1 = (depth0 && depth0.ike_perfect_forward_secrecy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\n#2: IPSec Configuration\n\nConfigure the IPSec SA as follows:\n  - Protocol                 : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Authentication Algorithm : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_authentication_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Encryption Algorithm     : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_encryption_protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Lifetime                 : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_lifetime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " seconds\n  - Mode                     : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_mode)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Perfect Forward Secrecy  : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_perfect_forward_secrecy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nIPSec Dead Peer Detection (DPD) will be enabled on the AWS Endpoint. We\nrecommend configuring DPD on your endpoint as follows:\n  - DPD Interval             : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_interval)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - DPD Retries              : "
    + escapeExpression(((stack1 = (depth0 && depth0.ipsec_retries)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nIPSec ESP (Encapsulating Security Payload) inserts additional\nheaders to transmit packets. These headers require additional space,\nwhich reduces the amount of space available to transmit application data.\nTo limit the impact of this behavior, we recommend the following\nconfiguration on your Customer Gateway:\n  - TCP MSS Adjustment       : "
    + escapeExpression(((stack1 = (depth0 && depth0.tcp_mss_adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " bytes\n  - Clear Don't Fragment Bit : "
    + escapeExpression(((stack1 = (depth0 && depth0.clear_df_bit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Fragmentation            : "
    + escapeExpression(((stack1 = (depth0 && depth0.fragmentation_before_encryption)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\n#3: Tunnel Interface Configuration\n\nYour Customer Gateway must be configured with a tunnel interface that is\nassociated with the IPSec tunnel. All traffic transmitted to the tunnel\ninterface is encrypted and transmitted to the Virtual Private Gateway.\n\nThe Customer Gateway and Virtual Private Gateway each have two addresses that relate\nto this IPSec tunnel. Each contains an outside address, upon which encrypted\ntraffic is exchanged. Each also contain an inside address associated with\nthe tunnel interface.\n\nThe Customer Gateway outside IP address was provided when the Customer Gateway\nwas created. Changing the IP address requires the creation of a new\nCustomer Gateway.\n\nThe Customer Gateway inside IP address should be configured on your tunnel\ninterface.\n\nOutside IP Addresses:\n  - Customer Gateway 		        : "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_outside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Virtual Private Gateway	        : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpn_gateway_outside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nInside IP Addresses\n  - Customer Gateway         		: "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_inside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Virtual Private Gateway             : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpn_gateway_inside_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nConfigure your tunnel to fragment at the optimal size:\n  - Tunnel interface MTU     : 1436 bytes\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isStaticRouting), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n#4: Static Routing Configuration:\n\nTo route traffic between your internal network and your VPC,\nyou will need a static route added to your router.\n\nStatic Route Configuration Options:\n\n  - Next hop                      : "
    + escapeExpression(((stack1 = (depth0 && depth0.next_hop)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nYou should add static routes towards your internal network on the VGW.\nThe VGW will then send traffic towards your internal network over\nhe tunnels.\n";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n#4: Border Gateway Protocol (BGP) Configuration:\n\nThe Border Gateway Protocol (BGPv4) is used within the tunnel, between the inside\nIP addresses, to exchange routes from the VPC to your home network. Each\nBGP router has an Autonomous System Number (ASN). Your ASN was provided\nto AWS when the Customer Gateway was created.\n\nBGP Configuration Options:\n  - Customer Gateway ASN	          : "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_bgp_asn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Virtual Private  Gateway ASN          : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpn_gateway_bgp_asn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Neighbor IP Address     		  : "
    + escapeExpression(((stack1 = (depth0 && depth0.neighbor_ip_address)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n  - Neighbor Hold Time       : "
    + escapeExpression(((stack1 = (depth0 && depth0.customer_gateway_bgp_hold_time)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nConfigure BGP to announce routes to the Virtual Private Gateway. The gateway\nwill announce prefixes to your customer gateway based upon the prefix you\nassigned to the VPC at creation time.\n";
  return buffer;
  }

  buffer += "Amazon Web Services\nVirtual Private Cloud\n\nVPN Connection Configuration\n================================================================================\nAWS utilizes unique identifiers to manipulate the configuration of\na VPN Connection. Each VPN Connection is assigned a VPN Connection Identifier\nand is associated with two other identifiers, namely the\nCustomer Gateway Identifier and the Virtual Private Gateway Identifier.\n\nYour VPN Connection ID		         : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpnConnectionId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\nYour Virtual Private Gateway ID          : "
    + escapeExpression(((stack1 = (depth0 && depth0.vpnGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\nYour Customer Gateway ID    		 : "
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n\nA VPN Connection consists of a pair of IPSec tunnel security associations (SAs).\nIt is important that both tunnel security associations be configured.\n\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tunnel), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n\nAdditional Notes and Questions\n================================================================================\n\n  - Amazon Virtual Private Cloud Getting Started Guide:\n      http://docs.amazonwebservices.com/AmazonVPC/latest/GettingStartedGuide\n  - Amazon Virtual Private Cloud Network Administrator Guide:\n      http://docs.amazonwebservices.com/AmazonVPC/latest/NetworkAdminGuide\n  - XSL Version: 2009-07-15-1119716\n\n\n";
  return buffer;
  };
TEMPLATE.configurationDownload=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"modal-run-stack\">\n	<div class=\"modal-header\">\n		<h3>Run Stack</h3>\n		<i class=\"modal-close\">×</i>\n	</div>\n	<div class=\"modal-body\">\n		<div class=\"modal-control-group clearfix\" data-bind=\"true\">\n			<label class=\"label\" for=\"app-name\">App Name</label>\n			<input id=\"app-name\" class=\"input modal-input-value\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\">\n		</div>\n		<div class=\"modal-control-group app-usage-group clearfix\">\n			<label for=\"\">App Usage</label>\n			<div id=\"app-usage-selectbox\" class=\"selectbox\">\n				<div class=\"selection\"><i class=\"icon-app-type-testing\"></i>Testing</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"selected item\" data-value=\"testing\"><i class=\"icon-app-type-testing\"></i>Testing</li>\n					<li class=\"item\" data-value=\"development\"><i class=\"icon-app-type-development\"></i>Development</li>\n					<li class=\"item\" data-value=\"production\"><i class=\"icon-app-type-production\"></i>Production</li>\n					<li class=\"item\" data-value=\"others\"><i class=\"icon-app-type-others\" data-value=\"testing\"></i>Others</li>\n				<ul>\n			</div>\n		</div>\n		<div class=\"stack-validation\">\n			<details open style=\"display:none;\">\n				<summary>Stack Validation</summary>\n				<div id=\"stack-run-validation-container\"></div>\n			</details>\n			<div class=\"nutshell\" style=\"display: none;\">:<label></label></div>\n			<div class=\"validating\">\n				<div class=\"loading-spinner loading-spinner-small\"></div>\n				<p>Validating your stack...</p>\n			</div>\n		</div>\n		<div class=\"estimate clearfix\">\n			<span class=\"title\">Estimated Cost</span>\n			<span class=\"price\" id=\"label-total-fee\"><b>$"
    + escapeExpression(((stack1 = (depth0 && depth0.total_fee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> / month</span>\n		</div>\n\n	</div>\n	<div class=\"modal-footer\">\n\n		<button class=\"btn btn-blue\" id=\"btn-confirm\" disabled>Run Stack</button>\n		<button class=\"btn btn-silver modal-close\" id=\"run-stack-cancel\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalRunStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.deletable), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n<div class=\"rule-list-row\">\n	<div class='rule-direction-icon tooltip icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.direction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.direction), "inbound", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></div>\n	<div class='rule-reference tooltip truncate' data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.direction), "inbound", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.color), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += escapeExpression(((stack1 = (depth0 && depth0.relation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>\n<div class=\"rule-list-row\">\n	<div><span class=\"rule-protocol tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIP_PROTOCOL", {hash:{},data:data}))
    + "' >"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n	<div class='rule-port tooltip' data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIP_PORT_CODE", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n</div>\n";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.deletable), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ruleSetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-protocol=\""
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-port=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-relation=\""
    + escapeExpression(((stack1 = (depth0 && depth0.relation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-relationid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.relationId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-direction=\""
    + escapeExpression(((stack1 = (depth0 && depth0.direction)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"pos-r sg-create-rule-item\">\n";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n<li class=\"sg-create-rule-item\">\n";
  }

function program6(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIP_INBOUND", {hash:{},data:data}));
  }

function program8(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIP_OUTBOUND", {hash:{},data:data}));
  }

function program10(depth0,data) {
  
  
  return "Source";
  }

function program12(depth0,data) {
  
  
  return "Destination";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "";
  buffer += "<a href=\"#\" class=\"sg-rule-delete icon-remove tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIP_REMOVE_RULE", {hash:{},data:data}))
    + "'></a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.sgRuleList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<h3 class=\"sg-create-group truncate\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n<ul class=\"sg-rule-list\">";
  stack1 = ((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.groupedSgRuleList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<h3 class=\"sg-create-group truncate\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n<ul class=\"sg-rule-list\">";
  stack1 = ((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n";
  return buffer;
  }

  buffer += "Following rule(s) will be deleted from its(their) security group:</div>\n<article class=\"scroll-wrap delete-sgrule-dialog\">\n<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n<div class=\"scroll-content\">\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n</article>\n\n";
  return buffer;
  };
TEMPLATE.groupedSgRuleListDelConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n			<div class=\"modal-text-major\">";
  stack1 = ((stack1 = (depth0 && depth0.content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n		</div> </div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"canvas-op-confirm\" class=\"btn modal-close btn-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "CFM_BTN_DELETE", {hash:{},data:data}))
    + "</button>\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "CFM_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.canvasOpConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"input-ip-item\">\n  <div class=\"name tooltip\" data-tooltip=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.autoAssign), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <label class=\"input-ip-wrap\" for=\"propertyIpListItem-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><span class=\"input-ip-prefix\">"
    + escapeExpression(((stack1 = (depth0 && depth0.prefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <input type=\"text\" class=\"input input-ip\"  id=\"propertyIpListItem-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.suffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.editable), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-ignore=\"true\" data-ignore-regexp=\"^[0-9.x]*$\" data-required=\"true\">\n    </label>\n  </div>\n  <div class=\"input-ip-eip-btn tooltip toggle-eip";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEip), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasEip), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></div>\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.unDeletable), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_IP_MSG_2", {hash:{},data:data}));
  }

function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_IP_MSG_1", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program8(depth0,data) {
  
  
  return " associated";
  }

function program10(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_IP_MSG_4", {hash:{},data:data}));
  }

function program12(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_IP_MSG_3", {hash:{},data:data}));
  }

function program14(depth0,data) {
  
  
  return "<div class=\"icon-remove\"></div>";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  };
TEMPLATE.propertyIpList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n				<div class=\"modal-text-minor\" style=\"margin-top:10px;\"><i class=\"icon-inbound\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_INBOUND", {hash:{},data:data}))
    + "</div>\n			";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<div class=\"radio-group-horizontal\">\n				<div class=\"radio\">\n					<input id=\"radio_inbound\" type=\"radio\" name=\"sg-direction\" checked=\"checked\" value=\"inbound\" />\n					<label for=\"radio_inbound\"></label>\n				</div>\n				<label for=\"radio_inbound\" ><i class=\"icon-inbound icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_INBOUND", {hash:{},data:data}))
    + "</label>\n			</div>\n\n			<div class=\"radio-group-horizontal\">\n				<div class=\"radio\">\n					<input id=\"radio_outbound\" type=\"radio\" name=\"sg-direction\" value=\"outbound\"/>\n					<label for=\"radio_outbound\"></label>\n				</div>\n				<label for=\"radio_outbound\"><i class=\"icon-outbound icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_OUTBOUND", {hash:{},data:data}))
    + "</label>\n			</div>\n			";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"item truncate\" data-id=\"sg\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><span class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n					";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n							";
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n							<li class=\"item\" data-id=\"custom\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</li>\n							<li class=\"item\" data-id=\"all\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_ALL", {hash:{},data:data}))
    + "</li>\n							";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n					<div class=\"sg-protocol-option-input\" id=\"sg-protocol-custom\">\n						<input class=\"input\" name=\"protocol-custom-ranged\" placeholder=\"0-255\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*$\" data-required=\"true\">\n					</div>\n					<div class=\"sg-protocol-option-input\" id=\"sg-protocol-all\">\n						Port Range:<span>0-65535</span>\n					</div>\n				";
  }

  buffer += "<div id=\"modal-sg-rule\" data-bind=\"true\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_TITLE_ADD", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i>\n	</div>\n\n	<div class=\"modal-body\">\n		<div class=\"modal-control-group clearfix\">\n			<label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_DIRECTION", {hash:{},data:data}))
    + "</label>\n\n			<div id=\"sg-modal-direction\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n\n		<div class=\"modal-control-group clearfix\">\n			<label class=\"label-short\" for=\"securitygroup-modal-description\" id=\"rule-modal-ip-range\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_SOURCE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"sg-add-model-source-select\">\n				<div class=\"selection\">IP...</div>\n				<ul class=\"dropdown\">\n					<li class=\"item selected\" data-id=\"custom\">IP...</li>\n					";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sgList), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</ul>\n			</div>\n			<input class=\"input\" type=\"text\" id=\"securitygroup-modal-description\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" data-required=\"true\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PLACEHOLD_SOURCE", {hash:{},data:data}))
    + "'>\n		</div>\n\n		<div class=\"modal-control-group clearfix\">\n			<label class=\"label-short\" >"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_LBL_PROTOCOL", {hash:{},data:data}))
    + "</label>\n				<div class=\"modal-protocol-select\">\n					<div class=\"selectbox\" id=\"modal-protocol-select\"  data-protocal-type=\"tcp\">\n						<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</div>\n						<ul class=\"dropdown\" tabindex=\"-1\">\n							<li class=\"selected item\" data-id=\"tcp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</li>\n							<li class=\"item\" data-id=\"udp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_UDP", {hash:{},data:data}))
    + "</li>\n							<li class=\"item\" data-id=\"icmp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PROTOCOL_ICMP", {hash:{},data:data}))
    + "</li>\n							";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</ul>\n					</div>\n				</div>\n			<div id=\"sg-protocol-select-result\">\n				<div class=\"sg-protocol-option-input show\" id=\"sg-protocol-tcp\">\n					<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\"  data-required=\"true\"/>\n				</div>\n				<div class=\"sg-protocol-option-input\" id=\"sg-protocol-udp\">\n					<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n				</div>\n\n				<div class=\"sg-protocol-option-input\" id=\"sg-protocol-icmp\">\n					<div class=\"selectbox\" id=\"protocol-icmp-main-select\" data-protocal-main=\"0\"  data-protocal-sub=\"-1\">\n					<div class=\"selection\">Echo Reply(0)</div>\n					<div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n						<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n						<ul tabindex=\"-1\" class=\"scroll-content\">\n							<li class=\"item selected\" data-id=\"0\">Echo Reply(0)</li>\n							<li class=\"item\" data-id=\"3\">Destination Unreachable(3) ...</li>\n							<li class=\"item\" data-id=\"4\">Source Quench(4)</li>\n							<li class=\"item\" data-id=\"5\">Redirect Message(5) ...</li>\n							<li class=\"item\" data-id=\"6\">Alternate Host Address(6)</li>\n							<li class=\"item\" data-id=\"8\">Echo Request(8)</li>\n							<li class=\"item\" data-id=\"9\">Router Advertisement(9)</li>\n							<li class=\"item\" data-id=\"10\">Router Solicitation(10)</li>\n							<li class=\"item\" data-id=\"11\">Time Exceeded(11) ...</li>\n							<li class=\"item\" data-id=\"12\">Parameter Problem: Bad IP header(12) ...</li>\n							<li class=\"item\" data-id=\"13\">Timestamp(13)</li>\n							<li class=\"item\" data-id=\"14\">Timestamp Reply(14)</li>\n							<li class=\"item\" data-id=\"15\">Information Request(15)</li>\n							<li class=\"item\" data-id=\"16\">Information Reply(16)</li>\n							<li class=\"item\" data-id=\"17\">Address Mask Request(17)</li>\n							<li class=\"item\" data-id=\"18\">Address Mask Reply(18)</li>\n							<li class=\"item\" data-id=\"30\">Traceroute(30)</li>\n							<li class=\"item\" data-id=\"31\">Datagram Conversion Error(31)</li>\n							<li class=\"item\" data-id=\"32\">Mobile Host Redirect(32)</li>\n							<li class=\"item\" data-id=\"33\">Where Are You(33)</li>\n							<li class=\"item\" data-id=\"34\">Here I Am(34)</li>\n							<li class=\"item\" data-id=\"35\">Mobile Registration Request(35)</li>\n							<li class=\"item\" data-id=\"36\">Mobile Registration Reply(36)</li>\n							<li class=\"item\" data-id=\"37\">Domain Name Request(37)</li>\n							<li class=\"item\" data-id=\"38\">Domain Name Reply(38)</li>\n							<li class=\"item\" data-id=\"39\">SKIP Algorithm Discovery Protocol(39)</li>\n							<li class=\"item\" data-id=\"40\">Photuris Security Failures(40)</li>\n							<li class=\"item\" data-id=\"-1\">All(-1)</li>\n						</ul>\n					</div>\n					</div>\n				</div>\n\n				<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-3\">\n					<div class=\"selection\">All(-1)</div>\n					<div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n						<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n						<ul class=\"scroll-content\" tabindex=\"-1\">\n							<li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n							<li class=\"item\" data-id=\"0\">destination network unreachable(0)</li>\n							<li class=\"item\" data-id=\"1\">destination host unreachable(1)</li>\n							<li class=\"item\" data-id=\"2\">destination protocol unreachable(2)</li>\n							<li class=\"item\" data-id=\"3\">destination port unreachable(3)</li>\n							<li class=\"item\" data-id=\"4\">fragmentation required and DF flag set(4)</li>\n							<li class=\"item\" data-id=\"5\">source route failed(5)</li>\n							<li class=\"item\" data-id=\"6\">destination network unknown(6)</li>\n							<li class=\"item\" data-id=\"7\">destination host unknown(7)</li>\n							<li class=\"item\" data-id=\"8\">source host isolated(8)</li>\n							<li class=\"item\" data-id=\"9\">network administratively prohibited(9)</li>\n							<li class=\"item\" data-id=\"10\">host administratively prohibited(10)</li>\n							<li class=\"item\" data-id=\"11\">network unreachable for TOS(11)</li>\n							<li class=\"item\" data-id=\"12\">host unreachable for TOS(12)</li>\n							<li class=\"item\" data-id=\"13\">communication administratively prohibited(13)</li>\n						</ul>\n					</div>\n				</div>\n\n				<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-5\">\n					<div class=\"selection\">All(-1)</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li class=\"selected item\" data-id=\"-1\">All(-1)</li>\n						<li class=\"item\" data-id=\"0\">redirect datagram for the network(0)</li>\n						<li class=\"item\" data-id=\"1\">redirect datagram for the host(1)</li>\n						<li class=\"item\" data-id=\"2\">redirect datagram for the TOS & network(2)</li>\n						<li class=\"item\" data-id=\"3\">redirect datagram for the TOS & host(3)</li>\n					</ul>\n				</div>\n\n				<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-11\">\n					<div class=\"selection\">All(-1)</div>\n					<ul class=\"dropdown\" tabindex=\"-1\">\n						<li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n						<li class=\"item\" data-id=\"0\">TTL expired transit(0)</li>\n						<li class=\"item\" data-id=\"1\">fragmentation reasembly time exceeded(1)</li>\n					</ul>\n				</div>\n\n				<div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-12\">\n					<div class=\"selection\">All(-1)</div>\n					<ul class=\"dropdown\" role=\"menu\">\n						<li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n						<li class=\"item\" data-id=\"0\">pointer indicates the error(0)</li>\n						<li class=\"item\" data-id=\"1\">missing a required option(1)</li>\n						<li class=\"item\" data-id=\"2\">bad length(2)</li>\n					</ul>\n				</div>\n\n				";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isClassic), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button class=\"btn btn-blue\" id='sg-modal-save'>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_BTN_SAVE", {hash:{},data:data}))
    + "</button>\n		<button class=\"btn btn-silver modal-close\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_SGRULE_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalSGRule=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\">\n		<h3 id='keypair-name'>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n		<i class=\"modal-close\">&times;</i>\n	</div>\n	<div class=\"modal-body\">\n		<section id='keypair-loading' class=\"loading-spinner\"></section>\n\n		<section id=\"keypair-body-linux\" class=\"hide\">\n			<div class=\"keypair-download clearfix modal-control-group\">\n				<p class=\"modal-text-major left\">Key Pair data is ready</p>\n				<a href=\"#\" class=\"btn btn-blue right\" id=\"keypair-kp-linux\">Download</a>\n			</div>\n			<div id=\"keypair-remote\" class=\"modal-control-group clearfix\">\n				<label for=\"keypair-cmd\">Remote Access</label>\n				<input class=\"input click-select\" id=\"keypair-cmd\" type=\"text\" readonly=\"readonly\">\n			</div>\n\n		</section>\n		<section id=\"keypair-body-win\" class=\"hide\">\n			<div class=\"modal-control-group\">\n				<h4>Remote Access</h4>\n				<label for=\"keypair-private-key\">Private Key</label>\n				<textarea id=\"keypair-private-key\" class=\"click-select\" readonly=\"readonly\"></textarea>\n				<a href=\"#\" id=\"keypair-rdp\" class=\"btn btn-blue\">Download RDP</a>\n				<a href=\"#\" id=\"keypair-kp-win\" class=\"btn btn-blue\">Download Key Pair</a>\n			</div>\n\n			<div id=\"keypair-public\" class=\"modal-control-group clearfix\">\n				<label for=\"keypair-dns\">Public DNS</label>\n				<input class=\"input click-select\" type=\"text\" readonly=\"readonly\" id=\"keypair-dns\">\n			</div>\n\n			<div class=\"modal-control-group clearfix\">\n				<label style=\"width:100%;\">Windows Login Password</label>\n				<div id=\"keypair-login\">\n					<input type=\"password\" readonly=\"readonly\" id=\"keypair-pwd\" class=\"input click-select\">\n					<a href=\"#\" class=\"btn btn-silver kp-copy-btn\" id=\"keypair-show\">Show password</a>\n				</div>\n				<div id=\"keypair-no-pwd\"></div>\n			</div>\n\n		</section>\n	</div>\n\n	<div class=\"modal-footer\">\n		<button class=\"btn modal-close btn-silver\">Close</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalDownloadKP=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<article>\n	<div class=\"property-control-group\">This resource is not available. It may have been deleted from other source or terminated in previous app editing.</div>\n</article>\n\n";
  };
TEMPLATE.missingPropertyPanel=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<article>\n	<div class=\"property-control-group\">"
    + escapeExpression(((stack1 = (depth0 && depth0.asgName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " is deleted in stopped app. The auto scaling group will be created when the app is started.</div>\n</article>\n\n";
  return buffer;
  };
TEMPLATE.missingAsgWhenStop=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li>\n			<a href=\"#\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-instance=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instance_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "_item "
    + escapeExpression(((stack1 = (depth0 && depth0.deleted)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<span class=\"volume_name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n				<span class=\"volume_size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</span>\n			</a>\n		</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "snapshot";
  }

function program4(depth0,data) {
  
  
  return "volume";
  }

  buffer += "<div class=\"bubble-head\">Attached volume (<span id=\"instance_volume_number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</div>\n<div id=\"instance_volume_wrap\" class=\"scroll-wrap\">\n	<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<ul id=\"instance_volume_list\" class=\"clearfix bubble-content scroll-content\">\n		";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.instanceVolume=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n		<li>\n			<a href=\"#\" class=\"asgList-item\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<i class=\"asgList-item-status tooltip status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></i>\n				<span class=\"asgList-item-icon\" style=\"background-image:url('./assets/images/"
    + escapeExpression(((stack1 = (depth0 && depth0.background)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></span>\n				<div class=\"asgList-item-volume\" data-target-id="
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n					<span class=\"asgList-item-number\">"
    + escapeExpression(((stack1 = (depth1 && depth1.volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n				</div>\n				<span class=\"asgList-item-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n			</a>\n		</li>\n		";
  return buffer;
  }

  buffer += "<div id=\"asgList-wrap\">\n	<div id=\"asgList-header\">\n		<span id=\"asgList-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<a id=\"asgList-close\" href=\"javascript:void(0)\" onclick=\"MC.canvas.asgList.close()\">&times;</a>\n	</div>\n	<ul id=\"asgList\" class=\"clearfix\">\n		";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.asgList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n		<li>\n			<a href=\"#\" class='instanceList-item "
    + escapeExpression(((stack1 = (depth0 && depth0.deleted)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "' id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<i class=\"instanceList-item-status tooltip status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n				<span class=\"instanceList-item-icon\" style=\"background-image:url('./assets/images/"
    + escapeExpression(((stack1 = (depth1 && depth1.background)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "')\"></span>\n				<div class=\"instanceList-item-volume\" data-target-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n					<span class=\"instanceList-item-number\">"
    + escapeExpression(((stack1 = (depth1 && depth1.volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n				</div>\n				<span class=\"instanceList-item-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n			</a>\n		</li>\n		";
  return buffer;
  }

  buffer += "<div id=\"instanceList-wrap\" data-id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0[0])),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<div id=\"instanceList-header\">\n		<span id=\"instanceList-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<a id=\"instanceList-close\" href=\"javascript:void(0)\" onclick=\"MC.canvas.instanceList.close()\">&times;</a>\n	</div>\n	<ul id=\"instanceList\" class=\"clearfix\">\n		";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.instanceList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data,depth1) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li>\n	<a href=\"#\" class=\"instanceList-item\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		<i class=\"instanceList-item-status tooltip status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n		<span class=\"instanceList-item-icon\" style=\"background-image:url('./assets/images/ide/ami/"
    + escapeExpression(((stack1 = (depth1 && depth1.background)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png')\"></span>\n		<div class=\"instanceList-item-volume\" data-target-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n			<span class=\"instanceList-item-number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		</div>\n		<span class=\"instanceList-item-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</a>\n</li>\n\n";
  return buffer;
  };
TEMPLATE.instanceListItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n		<li>\n			<a href=\"#\" class=\"eniList-item "
    + escapeExpression(((stack1 = (depth0 && depth0.deleted)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<i class=\"eniList-item-eip-status";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.eip), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i>\n				<span class=\"eniList-item-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n			</a>\n		</li>\n		";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " on";
  }

  buffer += "<div id=\"eniList-wrap\">\n	<div id=\"eniList-header\">\n		<span id=\"eniList-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<a id=\"eniList-close\" href=\"javascript:void(0)\" onclick=\"MC.canvas.eniList.close()\">&times;</a>\n	</div>\n	<ul id=\"eniList\" class=\"clearfix\">\n		";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.eniList=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data,depth1) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return " on";
  }

  buffer += "<li>\n	<a href=\"#\" class=\"eniList-item\" id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n		<i class=\"eniList-item-eip-status";
  stack1 = helpers['if'].call(depth0, (depth1 && depth1.eip), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i>\n		<span class=\"eniList-item-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</a>\n</li>\n\n";
  return buffer;
  };
TEMPLATE.eniListItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"> <h3>Set up CIDR Block</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n			<div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		</div> </div>\n	</div>\n	<div class=\"modal-footer\">\n		<a id=\"cidr-remove\" class=\"link-red left link-modal-danger\">"
    + escapeExpression(((stack1 = (depth0 && depth0.remove_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n		<button id=\"cidr-return\" class=\"btn modal-close btn-blue\">OK</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.setupCIDRConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\"> <h3>Attach Network Interface to Instance</h3><i class=\"modal-close\">&times;</i> </div>\n<div class=\"modal-body\">\n	<div class=\"modal-center-align-helper\">\n		<p>"
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " has been automatically assigned Public IP.</p>\n		<p>If you want to attach the external network interface to "
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", the Public IP must be removed.</p>\n		<p>Do you still want to attach "
    + escapeExpression(((stack1 = (depth0 && depth0.eni)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " to "
    + escapeExpression(((stack1 = (depth0 && depth0.host)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " and remove the Public IP?</p>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalAttachingEni=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	";
  stack1 = ((stack1 = (depth0 && depth0.confirm)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<div class=\"modal-footer\">\n		<button class=\"btn modal-close btn-blue\" id=\"canvas-op-confirm\" style=\"width:200px;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.action)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</button>\n		<button class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalCanvasConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"> <h3>Stack Name Already in Use</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\" style=\"min-height:120px;\">\n		<div class=\"modal-text-wraper\">\n			<div class=\"modal-center-align-helper\">\n				<div class=\"modal-text-major\">Stack name <span class=\"resource-name-label\">"
    + escapeExpression(((stack1 = (depth0 && depth0.stack_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> is already used by another stack. Please use a different name.</div>\n				<div class=\"modal-control-group\" data-bind=\"true\">\n					<label for=\"new-stack-name\">Stack Name</label>\n					<input id=\"new-stack-name\" class=\"input modal-input-value\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stack_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\">\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"rename-confirm\" class=\"btn btn-blue\">Save</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalReinputStackName=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"><h3 class=\"truncate\" style=\"width: 380px;\">Confirm to close "
    + escapeExpression(((stack1 = (depth0 && depth0.tab_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n			<div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.tab_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " has unsaved changes.</div>\n			<div class=\"modal-text-major\">Do you confirm to close it?</div>\n		</div> </div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"close-tab-confirm\" class=\"btn btn-red\" data-tab-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.tab_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Close Tab</button>\n		<button class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.closeTabRestriction=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"width:420px\">\n	<div class=\"modal-header\"><h3 class=\"truncate\" style=\"width: 380px;\">Changes not applied</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n			<div class=\"modal-text-major\">This app has been changed.</div>\n			<div class=\"modal-text-major\">Do you conﬁrm to discard the changes?</div>\n		</div> </div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"return-app-confirm\" class=\"btn btn-red\">Discard</button>\n		<button class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  };
TEMPLATE.cancelAppEdit2App=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\">\n			 <div class=\"modal-center-align-helper\">\n				<div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<div class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		 </div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"modal-confirm-delete\" class=\"btn btn-red\">Delete</button>\n		<button id=\"modal-cancel\" class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalDeleteSGOrACL=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"loading-modal-wrap\">\n	<div class=\"loading-modal\" id=\"modal-box\">\n		<div class=\"loading-spinner loading-spinner-mid\"></div>\n		<div>Refreshing resources...</div>\n	</div>\n</div>\n\n";
  };
TEMPLATE.loadingTransparent=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\">\n			 <div class=\"modal-center-align-helper\">\n				<div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<div class=\"modal-text-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		 </div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"modal-confirm-delete\" class=\"btn btn-red\">Delete</button>\n		<button id=\"modal-cancel\" class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalForceDeleteApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>\n	<div class=\"info\">Last saved: <span class=\"stack-save-time\">-<span></div>\n	<ul class=\"statusbar-btn-list\">\n		<li class=\"statusbar-btn btn-state\">\n			<span class=\"state-success\"><i class=\"status status-green icon-label\"></i><b>0</b></span>\n			<span class=\"state-failed\"><i class=\"status status-red icon-label\"></i><b>0</b></span>\n		</li>\n		<li class=\"statusbar-btn btn-ta-valid\">Validate</li>\n	</ul>\n</div>\n\n";
  };
TEMPLATE.statusbar=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "( "
    + escapeExpression(((stack1 = (depth0 && depth0.instance_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " )</li>\n				";
  return buffer;
  }

  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"><h3 class=\"truncate\" style=\"width: 380px;\">Need to Restart Instance</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\" style=\"height:150px;\">\n		<div class=\"modal-text-wraper\">\n			<div class=\"modal-text-major\">To update the properties you have changed, following instances need to restart:</div>\n			<ul class=\"clearfix\">\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n			<div id=\"instance-type\" class=\"modal-text-major\"></div>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"confirm-update-app\" class=\"btn btn-blue\" style=\"width:160px;\">Continue to Update</button>\n		<button class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.restartInstance=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<h3 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_MAJOR_TEXT_RUNNING", {hash:{},data:data}))
    + "</h3>\n	";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<h3 class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_MAJOR_TEXT_STOPPED", {hash:{},data:data}))
    + "</h3>\n		<p class=\"modal-text-minor\" style=\"margin-top:10px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_MINOR_TEXT_STOPPED", {hash:{},data:data}))
    + "</p>\n	";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<table class=\"table-head-fix table app-update-summary-table-header\" data-target=\"app-update-summary-table\">\n			<thead> <tr class=\"header-row\">\n				<th class=\"sortable active\" width=\"30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_TABLE_TYPE", {hash:{},data:data}))
    + "</th>\n				<th class=\"sortable\" width=\"30%\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_TABLE_NAME", {hash:{},data:data}))
    + "</th>\n				<th class=\"sortable\" width=\"40%\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_TABLE_CHANGE", {hash:{},data:data}))
    + "</th> </tr>\n			</thead>\n		</table>\n		<div class=\"scroll-wrap\" style=\"max-height:256px;\">\n			<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n			<table class=\"table scroll-content\" id=\"app-update-summary-table\">\n				<tbody>\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.result), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</tbody>\n			</table>\n		</div>\n	";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <tr>\n					<td width=\"30%\">"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n					<td width=\"30%\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n					<td width=\"40%\">\n						";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.changes), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.extra), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.info), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n				</tr> ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<span class=\"au-summary-label au-summary-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.info)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<span class=\"au-summary-label au-summary-"
    + escapeExpression(((stack1 = (depth0 && depth0.change)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.change)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n						";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<p class=\"au-summary-extra\">"
    + escapeExpression(((stack1 = (depth0 && depth0.extra)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"tooltip icon-warning\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.info)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>";
  return buffer;
  }

  buffer += "<div id=\"app-apply-update\" style=\"width:460px\">\n	<div class=\"modal-header\"><h3 class=\"truncate\" style=\"width: 380px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_TIT", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isRunning), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.result)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<div class=\"stack-validation\">\n			<details open style=\"display:none;\">\n				<summary>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_VALIDATION", {hash:{},data:data}))
    + "</summary>\n				<div id=\"stack-run-validation-container\"></div>\n			</details>\n			<div class=\"nutshell\" style=\"display: none;\">:<label></label></div>\n			<div class=\"validating\">\n				<div class=\"loading-spinner loading-spinner-small\"></div>\n				<p>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_VALIDATING", {hash:{},data:data}))
    + "</p>\n			</div>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"confirm-update-app\" class=\"btn btn-blue\" style=\"width:160px;\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_CONFIRM_BTN", {hash:{},data:data}))
    + "</button>\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_CONFIRM_UPDATE_CANCEL_BTN", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.updateApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"overlay-content-wrap\">\n	<div class=\"overlay-text\">Oops! There has been some issue loading the tab.</div>\n	<button class=\"btn btn-blue\" id=\"btn-fail-reload\">Reload</button>\n</div>\n\n";
  };
TEMPLATE.openTabFail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"overlay-content-wrap\">\n	<div class=\"overlay-text\">Starting app...</div>\n	<div class=\"loading-spinner\"></div>\n</div>\n\n";
  };
TEMPLATE.appStarting=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"overlay-content-wrap\">\n	<div class=\"overlay-text\">Stopping app...</div>\n	<div class=\"loading-spinner\"></div>\n</div>\n\n";
  };
TEMPLATE.appStopping=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"overlay-content-wrap\">\n	<div class=\"overlay-text\">Terminating app...</div>\n	<div class=\"loading-spinner\"></div>\n</div>\n\n";
  };
TEMPLATE.appTerminating=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"progress\">\n		<div class=\"bar\" id=\"progress_bar\" style=\"width: "
    + escapeExpression(((stack1 = (depth0 && depth0.rate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\n	</div>\n	<p class=\"process-info\">\n		<span><b class=\"num\" id=\"progress_num\">"
    + escapeExpression(((stack1 = (depth0 && depth0.dones)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> of</span>\n		<span><b class=\"total\" id=\"progress_total\">"
    + escapeExpression(((stack1 = (depth0 && depth0.steps)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b> tasks</span>\n	</p>\n	";
  return buffer;
  }

  buffer += "<div class=\"overlay-content-wrap\">\n	<div class=\"overlay-text\">Updating app...</div>\n	<div class=\"loading-spinner\"></div>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_show), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n\n";
  return buffer;
  };
TEMPLATE.appUpdating=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"overlay-content-wrap\">\n	<div class=\"overlay-text\">App has updated successfully.</div>\n	<button class=\"btn btn-blue\" id=\"btn-updated-success\">Done</button>\n</div>\n\n";
  };
TEMPLATE.appUpdatedSuccess=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"error-info-block\">\n		<div class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</div>\n		<div class=\"result-error-info\">\n			<p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\n			<p class=\"detail\">";
  stack1 = ((stack1 = (depth0 && depth0.detail)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n		</div>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.update_detail), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n		<div class=\"result-error-notice\">The state of your app has been rolled back, except for the already deleted resources.</div>\n		";
  }

  buffer += "<div class=\"overlay-content-wrap app-change-fail\">\n	<div class=\"overlay-text\">Oops! The app failed to "
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_show), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<button class=\"btn btn-silver\" id=\"btn-changedfail\">Done</button>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.appChangedfail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"node-action-wrap\">\n	<div id=\"node-action-state\">\n		<div id=\"node-action-state-btn\">\n			<i id=\"node-state-icon\"></i>\n			<span id=\"node-state-number\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state_num)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		</div>\n		<div class=\"node-action-tooltip\">Edit State</div>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.nodeAction=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"modal-instance-sys-log\" style=\"width: 900px;\">\n	<div class=\"modal-header\"><h3>System Log: "
    + escapeExpression(((stack1 = (depth0 && depth0.instance_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<section class=\"instance-sys-log-loading loading-spinner\"></section>\n		<div class=\"instance-sys-log-content font-mono\">"
    + escapeExpression(((stack1 = (depth0 && depth0.log_content)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n		<div class=\"instance-sys-log-info modal-text-minor\">System log is not ready yet. Please try in a short while.</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"modal-instance-sys-log-cancel\" class=\"btn modal-close btn-silver\">Close</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalInstanceSysLog=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "Are you sure you want to delete "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?</div>\n<div class=\"modal-text-minor\">Once deleted, the states of "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'s configuration will be lost.</div>\n\n";
  return buffer;
  };
TEMPLATE.NodeStateRemoveConfirmation=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "Are you sure you want to delete "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?</div>\n<div class=\"modal-text-minor\">The security group "
    + escapeExpression(((stack1 = (depth0 && depth0.sg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " will also be deleted. Other load balancer using this security group will be affected.</div>\n\n";
  return buffer;
  };
TEMPLATE.ElbRemoveConfirmation=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div style=\"width:420px\">\n	<div class=\"modal-header\"><h3>Conﬁrm to Enable VisualOps</h3><i class=\"modal-close\">&times;</i></div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\">\n			<div class=\"modal-center-align-helper\">\n				<div class=\"modal-text-major\">Enable VisualOps will override your custom User Data. Are you sure to continue?</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"modal-stack-agent-enable-confirm\" style=\"width:145px;\" class=\"btn modal-confirm btn-blue\">Enable VisualOps</button>\n		<button id=\"modal-stack-agent-enable-cancel\" class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  };
TEMPLATE.modalStackAgentEnable=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:640px\" id=\"modal-key-short\">\n	<div class=\"modal-header\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_MOD_TIT", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></div>\n	<div class=\"modal-body scroll-wrap\">\n		<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<div class=\"scroll-content\" style=\"height: 560px\">\n			<section class=\"key-stack-app\">\n				<h3 class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_TIT_STACK_APP_OP", {hash:{},data:data}))
    + "</h3>\n				<ul class=\"keys\">\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PROP_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PROP_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_STAT_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_STAT_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DUPL_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DUPL_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DUPL_ACTION", {hash:{},data:data}))
    + "\n						</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_ACTION", {hash:{},data:data}))
    + "\n						</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SAVE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SAVE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SAVE_ACTION", {hash:{},data:data}))
    + "\n						</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SCRL_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SCRL_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SCRL_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n				</ul>\n			</section>\n			<section class=\"key-state\">\n				<h3 class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_TIT_STATE_GEN", {hash:{},data:data}))
    + "</h3>\n				<ul class=\"keys\">\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_FOCUS_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_FOCUS_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_EXPAND_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_EXPAND_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COLLAPSE_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COLLAPSE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_NEXT_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_NEXT_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PREV_KEY", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PREV_ACTION", {hash:{},data:data}))
    + "\n						</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CONTENT_EDITOR_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CONTENT_EDITOR_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CONTENT_EDITOR_ACTION", {hash:{},data:data}))
    + "\n						</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_INFO_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_INFO_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_INFO_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_LOG_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_LOG_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_LOG_ACTION", {hash:{},data:data}))
    + "\n						</div>\n					</li>\n				</ul>\n			</section>\n			<section class=\"key-state-edit\">\n				<h3 class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_TIT_STATE_EDIT", {hash:{},data:data}))
    + "</h3>\n				<ul class=\"keys\">\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ALL_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ALL_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_SELECT_ALL_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DESELECT_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DESELECT_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DESELECT_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CREATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CREATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_CREATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_STATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_STATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_DEL_STATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_MOVE_FOCUS_STATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_MOVE_FOCUS_STATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_MOVE_FOCUS_STATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COPY_STATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COPY_STATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_COPY_STATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PASTE_STATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PASTE_STATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_PASTE_STATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_UNDO_STATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_UNDO_STATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_UNDO_STATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n					<li class=\"key-item\">\n						<div class=\"key mac font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_REDO_STATE_KEY_MAC", {hash:{},data:data}))
    + "</div>\n						<div class=\"key pc font-mono\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_REDO_STATE_KEY_PC", {hash:{},data:data}))
    + "</div>\n						<div class=\"action\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_REDO_STATE_ACTION", {hash:{},data:data}))
    + "</div>\n					</li>\n				</ul>\n			</section>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "KEY_MODAL_BTN_CLOSE", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.shortkey=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div style=\"width:343px\" id=\"modal-ssl-cert-setting\">\n	<div class=\"modal-header\"><h3>Server Certiﬁcate</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\" style=\"min-height:120px;\">\n		<div class=\"modal-ssl-cert-item clearfix\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_LBL_LISTENER_NAME", {hash:{},data:data}))
    + "</label>\n			<input class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sslCert)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" data-required=\"true\" data-ignore=\"true\" id=\"elb-ssl-cert-name-input\"/>\n		</div>\n		<div class=\"modal-ssl-cert-item clearfix\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_LBL_LISTENER_PRIVATE_KEY", {hash:{},data:data}))
    + "</label>\n			<textarea class=\"input elb-ssl-cert-input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "POP_TIP_PEM_ENCODED", {hash:{},data:data}))
    + "\" data-required=\"true\" data-ignore=\"true\" id=\"elb-ssl-cert-privatekey-input\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sslCert)),stack1 == null || stack1 === false ? stack1 : stack1.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</div>\n		<div class=\"modal-ssl-cert-item clearfix\">\n			<label class=\"left\"  >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_LBL_LISTENER_PUBLIC_KEY", {hash:{},data:data}))
    + "</label>\n			<textarea class=\"input elb-ssl-cert-input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "POP_TIP_PEM_ENCODED", {hash:{},data:data}))
    + "\" data-required=\"true\" data-ignore=\"true\" id=\"elb-ssl-cert-publickey-input\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sslCert)),stack1 == null || stack1 === false ? stack1 : stack1.body)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</div>\n		<div class=\"modal-ssl-cert-item clearfix\">\n			<label class=\"left\"  >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_LBL_LISTENER_CERTIFICATE_CHAIN", {hash:{},data:data}))
    + "</label>\n			<textarea class=\"input elb-ssl-cert-input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "POP_TIP_PEM_ENCODED", {hash:{},data:data}))
    + "\" id=\"elb-ssl-cert-chain-input\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.sslCert)),stack1 == null || stack1 === false ? stack1 : stack1.chain)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"elb-ssl-cert-confirm\" class=\"btn btn-blue\">Save</button>\n		<button id=\"elb-ssl-cert-cancel\" class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.modalSSLCertSetting=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:623px\" id=\"experimental-modal\">\n	<div class=\"modal-header\">\n		<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_TIT", {hash:{},data:data}))
    + "</h3>\n		<i class=\"modal-close\">×</i>\n	</div>\n	<div class=\"modal-body\">\n		<h3 class=\"modal-body-header\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_INTRO", {hash:{},data:data}))
    + "</h3>\n		<div class=\"modal-body-content\">\n			<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_INTRO_MORE", {hash:{},data:data}))
    + "</div>\n			<h4 class=\"request-invite-header\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_REQUEST_TIT", {hash:{},data:data}))
    + "</h4>\n			<div class=\"request-invite-content\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_REQUEST_CONTENT", {hash:{},data:data}))
    + "</div>\n			<textarea id=\"experimental-message\" class=\"input\" style=\"width:95%;height:120px;\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_REQUEST_PLACEHOLDER", {hash:{},data:data}))
    + "' data-required=\"true\"></textarea>\n		</div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"experimental-visops-confirm\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_BTN_REQUEST", {hash:{},data:data}))
    + "</button>\n		<button id=\"experimental-visops-cancel\" class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n	</div>\n</div>\n\n";
  return buffer;
  };
TEMPLATE.experimentalVisops=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<h3 class=\"modal-body-header\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_THANK_LBL", {hash:{},data:data}))
    + "</h3>\n<div class=\"modal-text-major tac\">"
    + escapeExpression(helpers.i18n.call(depth0, "INVITE_MOD_THANK_MORE", {hash:{},data:data}))
    + "</div>\n\n";
  return buffer;
  };
TEMPLATE.experimentalVisopsTrail=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"bubble-head\">A NAT instance must meet following requirements:</div>\n<div class=\"bubble-content\">\n	<ul class=\"bubble-NAT-req-list\">\n		<li>Should have a route targeting the instance itself with destination to 0.0.0.0/0.</li>\n		<li>Should belong to a subnet which routes traffic with destination 0.0.0.0/0 to Internet Gateway.</li>\n		<li>Should disable Source/Destination Checking in \"Network Interface Details\".</li>\n		<li>Should have public IP or Elastic IP.</li>\n		<li>Should have outbound rule to the outside.</li>\n		<li>Should have inbound rule from within the VPC.</li>\n	</ul>\n</div>\n\n";
  };
TEMPLATE.bubbleNATreq=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"disconnected-msg\">\n	<div>Connection lost. Attempting to reconnect…</div>\n	<div>Changes made now may not be saved.</div>\n</section>\n\n";
  };
TEMPLATE.disconnectedMsg=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += escapeExpression(helpers.nl2br.call(depth0, (depth0 && depth0.content), {hash:{},data:data}))
    + "\n\n";
  return buffer;
  };
TEMPLATE.covertNl2br=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += escapeExpression(helpers.breaklines.call(depth0, (depth0 && depth0.content), {hash:{},data:data}))
    + "\n\n";
  return buffer;
  };
TEMPLATE.convertBreaklines=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div style=\"width:420px\">\n	<div class=\"modal-header\"> <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_CERT_REMOVE_CONFIRM_TITLE", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i> </div>\n	<div class=\"modal-body\">\n		<div class=\"modal-text-wraper\">\n			 <div class=\"modal-center-align-helper\">\n				<div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_CERT_REMOVE_CONFIRM_MAIN", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.cert_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "?</div>\n				<div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_CERT_REMOVE_CONFIRM_SUB", {hash:{},data:data}))
    + "</div>\n			</div>\n		 </div>\n	</div>\n	<div class=\"modal-footer\">\n		<button id=\"modal-confirm-elb-cert-delete\" class=\"btn btn-red\">Delete</button>\n		<button id=\"modal-cancel\" class=\"btn modal-close btn-silver\">Cancel</button>\n	</div>\n</div>\n";
  return buffer;
  };
TEMPLATE.modalDeleteELBCert=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('lib/IntercomAnalytics',["jquery"], function() {

    /*
     * Every key that are used to do analytics should be defined here.
     */
    var IntercomAnalytics, IntercomKeys;
    IntercomKeys = {
      import_json: true,
      export_json: true,
      visualize_vpc: true,
      sg_line_style: true,
      export_png: true,
      export_vis_png: true,
      cloudformation: true
    };
    IntercomAnalytics = {
      increase: function(key) {
        var o;
        if (!IntercomKeys[key]) {
          console.error("The key `" + key + "` is not enabled for analytics");
          return;
        }
        o = {};
        o[key] = 1;
        return window.Intercom && window.Intercom('update', {
          increments: o
        });
      },
      update: function(key, value) {
        var o;
        if (!IntercomKeys[key]) {
          console.error("The key `" + key + "` is not enabled for analytics");
          return;
        }
        o = {};
        o[key] = value;
        return window.Intercom && window.Intercom("update", o);
      }
    };
    $(document.body).on("click", "[data-analytics-plus]", function() {
      var key;
      key = $(this).attr("data-analytics-plus");
      if (key) {
        IntercomAnalytics.increase(key);
      }
    });
    return IntercomAnalytics;
  });

}).call(this);

(function() {
  define('lib/handlebarhelpers',["handlebars", "i18n!nls/lang.js"], function(Handlebars, lang) {
    Handlebars.registerHelper('i18n', function(text) {
      var t;
      t = lang.ide[text];

      /* env:prod */
      t = t || "undefined";

      /* env:prod:end */
      return new Handlebars.SafeString(t);
    });
    Handlebars.registerHelper('tolower', function(result) {
      return new Handlebars.SafeString(result.toLowerCase());
    });
    Handlebars.registerHelper('emptyStr', function(v1) {
      if (v1 === '' || v1 === (void 0) || v1 === null) {
        return '-';
      } else {
        return new Handlebars.SafeString(v1);
      }
    });
    Handlebars.registerHelper('UTC', function(text) {
      return new Handlebars.SafeString(new Date(text).toUTCString());
    });
    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });
    Handlebars.registerHelper('nl2br', function(text) {
      var nl2br;
      nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
      return new Handlebars.SafeString(nl2br);
    });
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
      if (v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    });
    Handlebars.registerHelper('timeStr', function(v1) {
      var d;
      d = new Date(v1);
      if (isNaN(Date.parse(v1)) || !d.toLocaleDateString || !d.toTimeString) {
        if (v1) {
          return new Handlebars.SafeString(v1);
        } else {
          return '-';
        }
      }
      d = new Date(v1);
      return d.toLocaleDateString() + " " + d.toTimeString();
    });
    Handlebars.registerHelper("plusone", function(v1) {
      v1 = parseInt(v1, 10);
      if (isNaN(v1)) {
        return v1;
      } else {
        return '' + (v1 + 1);
      }
    });
    return null;
  });

}).call(this);

/*
#**********************************************************
#* Filename: MC.core.js
#* Creator: Angel
#* Description: The core of the whole system
#* Date: 20131115
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

/* Define as MC module */
define( "MC", [ "ui/MC.template", "q", "lib/IntercomAnalytics", "lib/handlebarhelpers", "jquery", "sprintf" ], function ( template, Q, Analytics ) {

window.Q = Q;

var storage = function( instance ) {
	var s = {
		  set: function (name, value) {
			instance[name] = typeof value === 'object' ? JSON.stringify(value) : value;
		}

		, get: function (name) {
			var data = instance[name];

			try {
				data = JSON.parse(data);
			} catch (e) {}
			return data || "";
		}

		, remove: function (name) {
			instance.removeItem(name);

			return true;
		}

		, clear: function() {
			instance.clear();
		}
	};
	return s;
};

var _extractIDRegex = /^\s*?@?{?([-A-Z0-9a-z]+)}?/;

var MC = {
	// Global Variable

	DOMAIN   : window.MC_DOMAIN,
	API_HOST : window.MC_PROTO + "://api." + window.MC_DOMAIN,

	IMG_URL: './assets/images/',

	// Global data
	data: {},

	Analytics : Analytics,

	/**
	 * Generate GUID
	 * @return {string} the guid
	 */
	guid: function ()
	{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
		{
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r&0x3 | 0x8);
			return v.toString(16);
   		}).toUpperCase();
	},

	/**
	 * Determine the string is JSON or not
	 * @param  {string}  string the string will be determined
	 * @return {Boolean} if the string is JSON, return true, otherwise return false
	 */
	isJSON: function (string)
	{
		var rvalidchars = /^[\],:{}\s]*$/,
			rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
			rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
			rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;

		return typeof string === 'string' && string.trim() !== '' ?
			rvalidchars.test(string
				.replace(rvalidescape, '@')
				.replace(rvalidtokens, ']')
				.replace(rvalidbraces, '')) :
			false;
	},

	/**
	 * JSON-RPC API request
	 * @param  {object} option the configuration of API request
	 * @return {[type]} [description]
	 *
	 * example:
	 * MC.api({
 		url: '/app/',
	 	method: 'summary',
	 	data: {},
	 	success: function (data)
	 	error: function (status, error)
	 	});
	 */
	api: function (option)
	{
		$.ajax({
			url: MC.API_HOST + option.url,
			dataType: 'json',
			type: 'POST',
			data: JSON.stringify({
				jsonrpc: '2.0',
				id: MC.guid(),
				method: option.method || '',
				params: option.data || {}
			}),
			success: function(res){
				option.success(res.result[1], res.result[0]);
			},
			error: function(xhr, status, error){
				option.error(status, -1);
			}
		});
	},

	capitalize: function (string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	},

	truncate: function (string, length)
	{
		return string.length > length ? string.substring(0, length - 3) + '...' : string;
	},

	leftPadString : function (string, length, padding)
	{
		if ( string.length >= length ) { return string; }
		return (new Array(length-string.length+1)).join(padding) + string;
	},
	rightPadString : function (string, length, padding)
	{
		if ( string.length >= length ) { return string; }
		return string + (new Array(length-string.length+1)).join(padding);
	},


	/*
		For realtime CSS edit
	 */
	/* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   nv:dev:end */

	extractID: function (uid)
	{
		if (!uid) { return ""; }

		var result = _extractIDRegex.exec(uid);

		return result ? result[1] : uid;
	},

	/**
	 * Display and update notification number on title
	 * @param  {number} number the notification number
	 * @return {boolean} true
	 */
	titleNotification: function (number)
	{
		var rnumber = /\([0-9]*\)/ig;

		if (number > 0)
		{
			document.title = (document.title.match(rnumber)) ? document.title.replace(rnumber, '(' + number + ')') : '(' + number + ') ' + document.title;
		}
		else
		{
			document.title = document.title.replace(rnumber, '');
		}

		return true;
	},

	/**
	 * Format a number with grouped thousands
	 * @param  {number} number The target number
	 * @return {string}
	 *
	 * 3123131 -> 3,123,131
	 */
	numberFormat: function (number)
	{
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '');

		var n = !isFinite(+number) ? 0 : +number,
			precision = 0,
			separator = ',',
			decimal = '.',
			string = '',
			fix = function (n, precision)
			{
				var k = Math.pow(10, precision);
				return '' + Math.round(n * k) / k;
			};

		string = (precision ? fix(n, precision) : '' + Math.round(n)).split('.');
		if (string[0].length > 3)
		{
			string[0] = string[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator);
		}
		if ((string[1] || '').length < precision)
		{
			string[1] = string[1] || '';
			string[1] += [precision - string[1].length + 1].join('0');
		}

		return string.join(decimal);
	},

	/**
	 * Returns a formatted string according to the given format string with date object
	 * @param  {Date object} date   The date object
	 * @param  {String} format the string of format
	 * @return {String} The formatted date string
	 */
	dateFormat: function (date, format)
	{
		var date_format = {
				"M+" : date.getMonth() + 1,
				"d+" : date.getDate(),
				"h+" : date.getHours(),
				"m+" : date.getMinutes(),
				"s+" : date.getSeconds(),
				"q+" : Math.floor((date.getMonth() + 3) / 3),
				"S" : date.getMilliseconds()
			},
			key;

		if (/(y+)/.test(format))
		{
			format = format.replace(
				RegExp.$1,
				(date.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		}
		for (key in date_format)
		{
			if (new RegExp("("+ key +")").test(format))
			{
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ? date_format[key] : ("00"+ date_format[key]).substr((""+ date_format[key]).length)
				);
			}
		}

		return format;
	},

	/**
	 * Calculate the interval time between now and target date time.
	 * @param  {timespan number} date_time The target date time with second
	 * @return {[string]} The interval time.
	 */
	intervalDate: function (date_time)
	{
		var now = new Date(),
			date_time = date_time * 1000,
			second = (now.getTime() - date_time) / 1000,
			days = Math.floor(second / 86400),
			hours = Math.floor(second / 3600),
			minute = Math.floor(second / 60);

		if (days > 30)
		{
			return MC.dateFormat(new Date(date_time), "dd/MM yyyy");
		}
	 	else
	 	{
			return days > 0 ? days + ' days ago' : hours > 0 ? hours + ' hours ago' : minute > 0 ? minute + ' minutes ago' : 'just now';
	 	}
	},

	/**
	 * Calculate the interval time between two date time.
	 * @param  {Date} first time
	 * @param  {Date} second time
	 * @param  {String} (s)econd | (m)inute | (h)our | (d)ay default is second
	 * @return {number} time difference
	 */
	timestamp : function( t1, t2, type ) {

		if ( $.type( t1 ) === 'date' && $.type( t2 ) === 'date' ) {

			var div_num = 1;

			switch ( type ) {
				case 's':
					div_num = 1000;
					break;
				case 'm':
					div_num = 1000 * 60;
					break;
				case 'h':
					div_num = 1000 * 3600;
					break;
				case 'd':
					div_num = 1000 * 3600 * 24;
					break;
				default:
					div_num = 1000;
					break;
			}
			return parseInt(( t2.getTime() - t1.getTime() ) / parseInt( div_num ));
		}

		else {
			console.error( 'variable is type date', t1, t2, type );
		}
	},

	/**
	 * Generate random number
	 * @param  {number} min min number
	 * @param  {number} max max number
	 * @return {number} The randomized number
	 */
	rand: function (min, max)
	{
		return Math.floor(Math.random() * (max - min + 1) + min);
	},

	base64Encode: function (string)
	{
		return window.btoa(unescape(encodeURIComponent( string )));
	},

	base64Decode: function (string)
	{
		return decodeURIComponent(escape(window.atob( string )));
	},

	camelCase: function (string)
	{
		return string.replace(/-([a-z])/ig, function (match, letter)
		{
			return (letter + '').toUpperCase();
		});
	},

	/*
	* Storage
	* Author: Angel & Tim
	*
	* Save data into local computer via HTML5 localStorage or sessionStorage.
	*
	* Saving data
	* MC.[storage|session].set(name, value)
	*
	* Getting data
	* MC.[storage|session].get(name)
	*
	* Remove data
	* MC.[storage|session].remove(name)
	*/
	storage : storage( localStorage ),
	session : storage( sessionStorage ),

	cacheForDev : function( key, data, callback ) {
		/* env:dev                                                                                                                                                                                                                                                                                                                                                                                                            nv:dev:end */

		return false;


	}

};

window.MC = MC;



	/**
	 * jQuery plugin to convert a given $.ajax response xml object to json.
	 *
	 * @example var json = $.xml2json(response);
	 * modified by Angel
	 */
	jQuery.extend({
		xml2json : function xml2json(xml) {
			var result = {},
				attribute,
				content,
				node,
				child,
				i,
				j;

			for (i in xml.childNodes)
			{
				node = xml.childNodes[ i ];

				if (node.nodeType === 1)
				{
					child = node.hasChildNodes() ? xml2json(node) : node.nodevalue;

					child = child == null ? null : child;

					// Special for "item" & "member"
					if (
						(node.nodeName === 'item' || node.nodeName === 'member') &&
						child.value
					)
					{
						if (child.key)
						{
							if ($.type(result) !== 'object')
							{
								result = {};
							}
							if (!$.isEmptyObject(child))
							{
								result[ child.key ] = child.value;
							}
						}
						else
						{
							if ($.type(result) !== 'array')
							{
								result = [];
							}
							if (!$.isEmptyObject(child))
							{
								result.push(child.value);
							}
						}
					}
					else
					{
						if (
							(
								node.nextElementSibling &&
								node.nextElementSibling.nodeName === node.nodeName
							)
							||
							node.nodeName === 'item' ||
							node.nodeName === 'member'
						)
						{
							if ($.type(result[ node.nodeName ]) === 'undefined')
							{
								result[ node.nodeName ] = [];
							}
							if (!$.isEmptyObject(child))
							{
								result[ node.nodeName ].push(child);
							}
						}
						else
						{
							if (node.previousElementSibling && node.previousElementSibling.nodeName === node.nodeName)
							{
								if (!$.isEmptyObject(child))
								{
									result[ node.nodeName ].push(child);
								}
							}
							else
							{
								result[ node.nodeName ] = child;
							}
						}
					}

					// Add attributes if any
					if (node.attributes.length > 0)
					{
						result[ node.nodeName ][ '@attributes' ] = {};
						for (j in node.attributes)
						{
							attribute = node.attributes.item(j);
							result[ node.nodeName ]['@attributes'][attribute.nodeName] = attribute.nodeValue;
						}
					}

					// Add element value
					if (
						node.childElementCount === 0 &&
						node.textContent != null &&
						node.textContent !== ''
					)
					{
						content = node.textContent.trim();

						switch (content.toLowerCase())
						{
							case 'true':
								content = true;
								break;

							case 'false':
								content = false;
								break;
						}

						if (result[ node.nodeName ] instanceof Array)
						{
							result[ node.nodeName ].push(content);
						}
						else
						{
							result[ node.nodeName ] = content;
						}
					}
				}
			}

			return result;
		}
	});

	/*!
	 * jQuery Cookie Plugin v1.3.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function(e){function m(a){return a}function n(a){return decodeURIComponent(a.replace(j," "))}function k(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return d.json?JSON.parse(a):a}catch(c){}}var j=/\+/g,d=e.cookie=function(a,c,b){if(void 0!==c){b=e.extend({},d.defaults,b);if("number"===typeof b.expires){var g=b.expires,f=b.expires=new Date;f.setDate(f.getDate()+g)}c=d.json?JSON.stringify(c):String(c);return document.cookie=[d.raw?a:encodeURIComponent(a),"=",d.raw?c:encodeURIComponent(c),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}c=d.raw?m:n;b=document.cookie.split("; ");for(var g=a?void 0:{},f=0,j=b.length;f<j;f++){var h=b[f].split("="),l=c(h.shift()),h=c(h.join("="));if(a&&a===l){g=k(h);break}a||(g[l]=k(h))}return g};d.defaults={};e.removeCookie=function(a,c){return void 0!==e.cookie(a)?(e.cookie(a,"",e.extend({},c,{expires:-1})),!0):!1}})(jQuery);

	/* Global initialization */
	// Detecting browser and add the class name on body, so that we can use specific CSS style
	// or for specific usage.
	(function () {
		var ua  = navigator.userAgent.toLowerCase();

		var ua = navigator.userAgent.toLowerCase();
    var browser = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) || [];
    var kclass = browser[1] || "";

    if ( browser[1] == "webkit" ) {
    	var safari = /version\/([\d\.]+).*safari/.exec( ua );
      if (safari) {
      	kclass += " safari";
      	browser[2] = safari[1];
      }
    } else if ( browser[1] == "chrome" ) {
    	kclass += " webkit";
    }
    if (navigator.platform.toLowerCase().indexOf('mac') >= 0) {
			kclass += " mac";
		}

		MC.browser = browser[1];
		MC.browserVersion = parseInt(browser[2], 10);

		$(document.body).addClass(kclass);
	})();

	MC.template = template;
	return MC;
});

(function() {
  define('constant',['MC', 'i18n!nls/lang.js'], function(MC, lang) {
    var APP_STATE, AWS_RESOURCE, AWS_RESOURCE_KEY, AWS_RESOURCE_SHORT_TYPE, DEMO_STACK_NAME_LIST, INSTANCE_STATES, INSTANCE_TYPE, LINUX, MESSAGE_E, OPS_STATE, OS_TYPE_MAPPING, RDP_TMPL, RECENT_DAYS, RECENT_NUM, REGEXP, REGION_KEYS, REGION_LABEL, REGION_SHORT_LABEL, RESTYPE, RETURN_CODE, TA, WINDOWS;
    AWS_RESOURCE_KEY = {
      "AWS.EC2.AvailabilityZone": "ZoneName",
      "AWS.EC2.Instance": "InstanceId",
      "AWS.EC2.KeyPair": "KeyFingerprint",
      "AWS.EC2.SecurityGroup": "GroupId",
      "AWS.EC2.EIP": "PublicIp",
      "AWS.EC2.AMI": "ImageId",
      "AWS.EC2.EBS.Volume": "VolumeId",
      "AWS.ELB": "LoadBalancerName",
      "AWS.VPC.VPC": "VpcId",
      "AWS.VPC.Subnet": "SubnetId",
      "AWS.VPC.InternetGateway": "InternetGatewayId",
      "AWS.VPC.RouteTable": "RouteTableId",
      "AWS.VPC.VPNGateway": "VpnGatewayId",
      "AWS.VPC.CustomerGateway": "CustomerGatewayId",
      "AWS.VPC.NetworkInterface": "NetworkInterfaceId",
      "AWS.VPC.DhcpOptions": "DhcpOptionsId",
      "AWS.VPC.VPNConnection": "VpnConnectionId",
      "AWS.VPC.NetworkAcl": "NetworkAclId",
      "AWS.IAM.ServerCertificate": "",
      "AWS.AutoScaling.Group": "AutoScalingGroupARN",
      "AWS.AutoScaling.LaunchConfiguration": "LaunchConfigurationARN",
      "AWS.AutoScaling.NotificationConfiguration": "",
      "AWS.AutoScaling.ScalingPolicy": "PolicyARN",
      "AWS.AutoScaling.ScheduledActions": "ScheduledActionARN",
      "AWS.CloudWatch.CloudWatch": "AlarmArn",
      "AWS.SNS.Subscription": "",
      "AWS.SNS.Topic": ""
    };
    RESTYPE = {
      AZ: "AWS.EC2.AvailabilityZone",
      INSTANCE: "AWS.EC2.Instance",
      KP: "AWS.EC2.KeyPair",
      SG: "AWS.EC2.SecurityGroup",
      EIP: "AWS.EC2.EIP",
      AMI: "AWS.EC2.AMI",
      VOL: "AWS.EC2.EBS.Volume",
      SNAP: "AWS.EC2.EBS.Snapshot",
      ELB: "AWS.ELB",
      VPC: "AWS.VPC.VPC",
      SUBNET: "AWS.VPC.Subnet",
      IGW: "AWS.VPC.InternetGateway",
      RT: "AWS.VPC.RouteTable",
      VGW: "AWS.VPC.VPNGateway",
      CGW: "AWS.VPC.CustomerGateway",
      ENI: "AWS.VPC.NetworkInterface",
      DHCP: "AWS.VPC.DhcpOptions",
      VPN: "AWS.VPC.VPNConnection",
      ACL: "AWS.VPC.NetworkAcl",
      IAM: "AWS.IAM.ServerCertificate",
      ASG: 'AWS.AutoScaling.Group',
      LC: 'AWS.AutoScaling.LaunchConfiguration',
      NC: 'AWS.AutoScaling.NotificationConfiguration',
      SP: 'AWS.AutoScaling.ScalingPolicy',
      SA: 'AWS.AutoScaling.ScheduledActions',
      CW: 'AWS.CloudWatch.CloudWatch',
      SUBSCRIPTION: 'AWS.SNS.Subscription',
      TOPIC: 'AWS.SNS.Topic'
    };
    AWS_RESOURCE_SHORT_TYPE = {
      AWS_EC2_AvailabilityZone: "az",
      AWS_EC2_Instance: "instance",
      AWS_EC2_KeyPair: "kp",
      AWS_EC2_SecurityGroup: "sg",
      AWS_EC2_EIP: "eip",
      AWS_EC2_AMI: "ami",
      AWS_EBS_Volume: "vol",
      AWS_EBS_Snapshot: "snap",
      AWS_ELB: "elb",
      AWS_VPC_VPC: "vpc",
      AWS_VPC_Subnet: "subnet",
      AWS_VPC_InternetGateway: "igw",
      AWS_VPC_RouteTable: "rtb",
      AWS_VPC_VPNGateway: "vgw",
      AWS_VPC_CustomerGateway: "cgw",
      AWS_VPC_NetworkInterface: "eni",
      AWS_VPC_DhcpOptions: "dhcp",
      AWS_VPC_VPNConnection: "vpn",
      AWS_VPC_NetworkAcl: "acl",
      AWS_IAM_ServerCertificate: "iam",
      AWS_AutoScaling_Group: 'asg',
      AWS_AutoScaling_LaunchConfiguration: 'asl_lc',
      AWS_AutoScaling_NotificationConfiguration: 'asl_nc',
      AWS_AutoScaling_ScalingPolicy: 'asl_sp',
      AWS_AutoScaling_ScheduledActions: 'asl_sa',
      AWS_CloudWatch_CloudWatch: 'clw',
      AWS_SNS_Subscription: 'sns_sub',
      AWS_SNS_Topic: 'sns_top'
    };
    INSTANCE_TYPE = {
      't1.micro': ["T1 Micro", "ECU Up to 2", "Core 1", "Memory 613MB"],
      'm1.small': ["M1 Small", "ECU 1", "Core 1", "Memory 1.7GB"],
      'm1.medium': ["M1 Medium", "ECU 2", "Core 1", "Memory 3.7GB"],
      'm1.large': ["M1 Large", "ECU 4", "Core 2", "Memory 7.5GB"],
      'm1.xlarge': ["M1 Extra Large", "ECU 8", "Core 4", "Memory 15GB"],
      'm3.xlarge': ["M3 Extra Large", "ECU 13", "Core 4", "Memory 15GB"],
      'm3.2xlarge': ["M3 Double Extra Large", "ECU 26", "Core 8", "Memory 30GB"],
      'm2.xlarge': ["M2 High-Memory Extra Large", "ECU 6.5", "Core 2", "Memory 17.1GB"],
      'm2.2xlarge': ["M2 High-Memory Double Extra Large", "ECU 13", "Core 4", "Memory 34.2GB"],
      'm2.4xlarge': ["M2 High-Memory Quadruple Extra Large", "ECU 26", "Core 8", "Memory 68.4GB"],
      'c1.medium': ["C1 High-CPU Medium", "ECU 5", "Core 2", "Memory 1.7GB"],
      'c1.xlarge': ["C1 High-CPU Extra Large", "ECU 20", "Core 8", "Memory 7GB"],
      'hi1.4xlarge': ["High I/O Quadruple Extra Large", "ECU 35", "Core 16", "Memory 60.5GB"],
      'hs1.8xlarge': ["High Storage Eight Extra Large", "ECU 35", "Core 16", "Memory 117GB"]
    };
    INSTANCE_STATES = {
      'pending': 0,
      'running': 16,
      'shuttingdown': 32,
      'terminated': 48,
      'stopping': 64,
      'stopped': 80
    };
    MESSAGE_E = {
      MESSAGE_E_SESSION: "This session has expired, please log in again",
      MESSAGE_E_EXTERNAL: "Sorry, there seems to be a problem with AWS",
      MESSAGE_E_ERROR: "Sorry, we're experiencing techincal difficulty",
      MESSAGE_E_UNKNOWN: "Something is wrong. Please contact support@visualops.io",
      MESSAGE_E_PARAM: "Parameter error!"
    };
    REGION_KEYS = ['us-east-1', 'us-west-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1', 'ap-southeast-2', 'ap-northeast-1', 'sa-east-1'];
    REGION_SHORT_LABEL = {};
    REGION_LABEL = {};
    REGION_SHORT_LABEL['us-east-1'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_us-east-1'];
    REGION_LABEL['us-east-1'] = lang.ide['IDE_LBL_REGION_NAME_us-east-1'];
    REGION_SHORT_LABEL['us-west-1'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_us-west-1'];
    REGION_LABEL['us-west-1'] = lang.ide['IDE_LBL_REGION_NAME_us-west-1'];
    REGION_SHORT_LABEL['us-west-2'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_us-west-2'];
    REGION_LABEL['us-west-2'] = lang.ide['IDE_LBL_REGION_NAME_us-west-2'];
    REGION_SHORT_LABEL['eu-west-1'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_eu-west-1'];
    REGION_LABEL['eu-west-1'] = lang.ide['IDE_LBL_REGION_NAME_eu-west-1'];
    REGION_SHORT_LABEL['ap-southeast-1'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_ap-southeast-1'];
    REGION_LABEL['ap-southeast-1'] = lang.ide['IDE_LBL_REGION_NAME_ap-southeast-1'];
    REGION_SHORT_LABEL['ap-southeast-2'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_ap-southeast-2'];
    REGION_LABEL['ap-southeast-2'] = lang.ide['IDE_LBL_REGION_NAME_ap-southeast-2'];
    REGION_SHORT_LABEL['ap-northeast-1'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_ap-northeast-1'];
    REGION_LABEL['ap-northeast-1'] = lang.ide['IDE_LBL_REGION_NAME_ap-northeast-1'];
    REGION_SHORT_LABEL['sa-east-1'] = lang.ide['IDE_LBL_REGION_NAME_SHORT_sa-east-1'];
    REGION_LABEL['sa-east-1'] = lang.ide['IDE_LBL_REGION_NAME_sa-east-1'];
    RETURN_CODE = {
      E_OK: 0,
      E_NONE: 1,
      E_INVALID: 2,
      E_FULL: 3,
      E_EXIST: 4,
      E_EXTERNAL: 5,
      E_FAILED: 6,
      E_BUSY: 7,
      E_NORSC: 8,
      E_NOPERM: 9,
      E_NOSTOP: 10,
      E_NOSTART: 11,
      E_ERROR: 12,
      E_LEFTOVER: 13,
      E_TIMEOUT: 14,
      E_UNKNOWN: 15,
      E_CONN: 16,
      E_EXPIRED: 17,
      E_PARAM: 18,
      E_SESSION: 19,
      E_END: 20,
      E_BLOCKED_USER: 21
    };
    APP_STATE = {
      APP_STATE_RUNNING: "Running",
      APP_STATE_STOPPED: "Stopped",
      APP_STATE_REBOOTING: "Rebooting",
      APP_STATE_CLONING: "Cloning",
      APP_STATE_SAVETOSTACK: "Saving",
      APP_STATE_TERMINATING: "Terminating",
      APP_STATE_UPDATING: "Updating",
      APP_STATE_SHUTTING_DOWN: "Shutting down",
      APP_STATE_STOPPING: "Stopping",
      APP_STATE_STARTING: "Starting",
      APP_STATE_TERMINATED: "Terminated",
      APP_STATE_INITIALIZING: "Initializing"
    };
    OPS_STATE = {
      OPS_STATE_PENDING: "Pending",
      OPS_STATE_INPROCESS: "InProcess",
      OPS_STATE_DONE: "Done",
      OPS_STATE_ROLLBACK: "Rollback",
      OPS_STATE_FAILED: "Failed"
    };
    AWS_RESOURCE = {
      AZ: 'AWS.EC2.AvailabilityZone',
      AMI: 'AWS.EC2.AMI',
      VOLUME: 'AWS.EC2.EBS.Volume',
      SNAPSHOT: 'AWS.EC2.EBS.Snapshot',
      EIP: 'AWS.EC2.EIP',
      INSTANCE: 'AWS.EC2.Instance',
      KP: 'AWS.EC2.KeyPair',
      SG: 'AWS.EC2.SecurityGroup',
      ELB: 'AWS.ELB',
      ACL: 'AWS.VPC.NetworkAcl',
      CGW: 'AWS.VPC.CustomerGateway',
      DHCP: 'AWS.VPC.DhcpOptions',
      ENI: 'AWS.VPC.NetworkInterface',
      IGW: 'AWS.VPC.InternetGateway',
      RT: 'AWS.VPC.RouteTable',
      SUBNET: 'AWS.VPC.Subnet',
      VPC: 'AWS.VPC.VPC',
      VPN: 'AWS.VPC.VPNConnection',
      VGW: 'AWS.VPC.VPNGateway',
      ASG: 'AWS.AutoScaling.Group',
      ASL_ACT: 'AWS.AutoScaling.Activities',
      ASL_INS: 'AWS.AutoScaling.Instance',
      ASL_LC: 'AWS.AutoScaling.LaunchConfiguration',
      ASL_NC: 'AWS.AutoScaling.NotificationConfiguration',
      ASL_SP: 'AWS.AutoScaling.ScalingPolicy',
      ASL_SA: 'AWS.AutoScaling.ScheduledActions',
      CLW: 'AWS.CloudWatch.CloudWatch',
      SNS_SUB: 'AWS.SNS.Subscription',
      SNS_TOPIC: 'AWS.SNS.Topic'
    };
    RECENT_NUM = 5;
    RECENT_DAYS = 30;
    RDP_TMPL = "\n screen mode id:i:2\n use multimon:i:0\n desktopwidth:i:1024\n desktopheight:i:768\n session bpp:i:32\n winposstr:s:0,3,0,0,1024,768\n compression:i:1\n keyboardhook:i:2\n audiocapturemode:i:0\n videoplaybackmode:i:1\n connection type:i:2\n displayconnectionbar:i:1\n disable wallpaper:i:1\n allow font smoothing:i:0\n allow desktop composition:i:0\n disable full window drag:i:1\n disable menu anims:i:1\n disable themes:i:0\n disable cursor setting:i:0\n bitmapcachepersistenable:i:1\n full address:s:%s\n audiomode:i:0\n redirectprinters:i:1\n redirectcomports:i:0\n redirectsmartcards:i:1\n redirectclipboard:i:1\n redirectposdevices:i:0\n redirectdirectx:i:1\n autoreconnection enabled:i:1\n authentication level:i:2\n prompt for credentials:i:0\n negotiate security layer:i:1\n remoteapplicationmode:i:0\n alternate shell:s:\n shell working directory:s:\n gatewayhostname:s:\n gatewayusagemethod:i:4\n gatewaycredentialssource:i:4\n gatewayprofileusagemethod:i:0\n promptcredentialonce:i:1\n use redirection server name:i:0\n";
    DEMO_STACK_NAME_LIST = ['vpc-with-private-subnet-and-vpn', 'vpc-with-public-and-private-subnets-and-vpn', 'vpc-with-public-subnet-only', 'vpc-with-public-and-private-subnets'];
    TA = {
      ERROR: 'ERROR',
      WARNING: 'WARNING',
      NOTICE: 'NOTICE'
    };
    LINUX = ['centos', 'redhat', 'rhel', 'ubuntu', 'debian', 'fedora', 'gentoo', 'opensuse', 'suse', 'sles', 'amazon', 'amaz', 'linux-other'];
    WINDOWS = ['windows', 'win'];
    OS_TYPE_MAPPING = {
      'linux-other': 'linux',
      'redhat': 'rhel',
      'suse': 'sles',
      'windows': 'mswin'
    };
    REGEXP = {
      'stateEditorReference': /@\{([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})\.\w+\}/g,
      'stateEditorOriginReference': /@\{(([\w-]+)\.(([\w-]+(\[\d+\])?)|state.[\w-]+))\}/g,
      'uid': /[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}/g
    };
    return {
      AWS_RESOURCE_KEY: AWS_RESOURCE_KEY,
      INSTANCE_TYPE: INSTANCE_TYPE,
      INSTANCE_STATES: INSTANCE_STATES,
      AWS_RESOURCE_SHORT_TYPE: AWS_RESOURCE_SHORT_TYPE,
      REGION_KEYS: REGION_KEYS,
      REGION_SHORT_LABEL: REGION_SHORT_LABEL,
      REGION_LABEL: REGION_LABEL,
      RETURN_CODE: RETURN_CODE,
      LINUX: LINUX,
      WINDOWS: WINDOWS,
      MESSAGE_E: MESSAGE_E,
      APP_STATE: APP_STATE,
      OPS_STATE: OPS_STATE,
      RECENT_NUM: RECENT_NUM,
      RECENT_DAYS: RECENT_DAYS,
      AWS_RESOURCE: AWS_RESOURCE,
      RDP_TMPL: RDP_TMPL,
      DEMO_STACK_NAME_LIST: DEMO_STACK_NAME_LIST,
      TA: TA,
      OS_TYPE_MAPPING: OS_TYPE_MAPPING,
      REGEXP: REGEXP,
      RESTYPE: RESTYPE
    };
  });

}).call(this);

/*
#**********************************************************
#* MC.canvas
#* Description: Canvas logic core
# **********************************************************
# (c) Copyright 2014 Madeiracloud  All Rights Reserved
# **********************************************************
*/

// JSON data for current tab
//MC.canvas_data = {};

// Variable for current tab
// MC.canvas_property = {};

define('MC.canvas',["MC", "canvon"], function(MC){

MC.canvas = {
	getState: function ()
	{
		//return Tabbar.current;
		//return MC.canvas_data.stack_id !== undefined ? 'app' : 'stack';
		var state = '',
			current = Tabbar.current;

		if (
			current === 'new' ||
			current === 'stack'
		)
		{
			state = 'stack';
		}
		else if (
			current === 'app' ||
			current === 'appedit' ||
			current === 'appview'
		)
		{
			state = current;
		}

		return state;
	},

	display: function (id, key, is_visible)
	{
		var target = $('#' + id + '_' + key);

		if (is_visible === null || is_visible === undefined)
		{
			switch (target.attr('display'))
			{
				case 'none':
					is_visible = false;
					break;

				default:
					is_visible = true;
					break;
			}
			return is_visible;
		}
		else if (is_visible === true)
		{
			target.attr('display', 'inline');
			target.attr('style', '');
			Canvon(target).addClass('tooltip');
		}
		else
		{
			target.attr('display', 'none');
			target.attr('style', 'opacity:0');
			Canvon(target).removeClass('tooltip');
		}
	},

	canvasName : function (string)
	{
		return string.length > 17 ? string.substring(0, 17 - 3) + '...' : string;
	},

	update: function (id, type, key, value)
	{
		var target = $('#' + id + '_' + key),
			value;

		switch (type)
		{
			case 'text':
				if (key.indexOf("name") !== -1)
				{
					value = MC.canvas.canvasName( value );
				}

				if (target.length === 0)
				{
					target = $('#' + id).find("." + key);
				}

				target.text(value);
				break;

			case 'image':
				//target.attr('href', value);
				target[ 0 ].setAttributeNS("http://www.w3.org/1999/xlink", "href", value);
				break;

			case 'eip':
				target.attr('data-eip-state', value);
				break;

			case 'id':
				target.attr('id', value);
				break;

			case 'color':
				target.attr('style', 'fill:' + value);
				break;

			case 'tooltip': //add tooltip
				Canvon( '#' + id + '_' + key )
					.addClass('tooltip')
					.data( 'tooltip', value )
					.attr( 'data-tooltip', value );
				break;
		}

		return true;
	},

	resize: function (target, type)
	{
		var canvas_size = $canvas.size(),
			scale_ratio = $canvas.scale(),
			key = target === 'width' ? 0 : 1,
			node_minX = [],
			node_minY = [],
			node_maxX = [],
			node_maxY = [],
			coordinate,
			size,
			value,
			target_value,
			screen_maxX,
			screen_maxY;

		if (type === 'expand')
		{
			canvas_size[ key ] += 60;

			$('#svg_resizer_' + target + '_shrink').show();
		}

		if (type === 'shrink')
		{
			$.each($canvas.node(), function (index, item)
			{
				coordinate = item.position();
				size = item.size();

				node_maxX.push(coordinate[0] + size[0]);
				node_maxY.push(coordinate[1] + size[1]);
			});

			$.each($canvas.group(), function (index, item)
			{
				coordinate = item.position();
				size = item.size();

				node_maxX.push(coordinate[0] + size[0]);
				node_maxY.push(coordinate[1] + size[1]);
			});

			screen_maxX = Math.max.apply(Math, node_maxX);
			screen_maxY = Math.max.apply(Math, node_maxY);

			target_value = target === 'width' ? screen_maxX : screen_maxY;

			if ((canvas_size[ key ] - 60) <= target_value)
			{
				canvas_size[ key ] = 20 + target_value;

				$('#svg_resizer_' + target + '_shrink').hide();
			}
			else
			{
				canvas_size[ key ] -= 60;

				if (canvas_size[ key ] === 20 + target_value)
				{
					$('#svg_resizer_' + target + '_shrink').hide();
				}
			}
		}

		$('#svg_canvas')[0].setAttribute('viewBox', '0 0 ' + MC.canvas.GRID_WIDTH * canvas_size[0] + ' ' + MC.canvas.GRID_HEIGHT * canvas_size[1]);

		$('#svg_canvas').attr({
			'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
			'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
		});

		$('#canvas_container, #canvas_body').css({
			'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
			'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
		});

		$canvas.size(canvas_size[0], canvas_size[1]);

		return true;
	},

	zoomIn: function ()
	{
		var canvas_size = $canvas.size(),
			$canvas_body = $('#canvas_body'),
			newClass = "",
			scale_ratio = $canvas.scale();

		if (scale_ratio > 1)
		{
			$canvas.scale((scale_ratio * 10 - 2) / 10);

			scale_ratio = $canvas.scale();

			$('#svg_canvas')[0].setAttribute('viewBox', '0 0 ' + MC.canvas.GRID_WIDTH * canvas_size[0] + ' ' + MC.canvas.GRID_HEIGHT * canvas_size[1]);

			newClass = $canvas_body.attr("class").replace(/zoomlevel_[^\s]+\s?/g, "") + "zoomlevel_" + ("" + scale_ratio).replace(".", "_");
			$canvas_body.attr("class", newClass);

			$('#canvas_container, #canvas_body').css({
				'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
				'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
			});

			$('#svg_canvas').attr({
				'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
				'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
			});
		}

		if (scale_ratio === 1 && $('#canvas_body').hasClass('canvas_zoomed'))
		{
			$('#canvas_body')
				.removeClass('canvas_zoomed');
		}

		MC.canvas.event.clearSelected();

		return true;
	},

	zoomOut: function ()
	{
		var canvas_size = $canvas.size(),
			$canvas_body = $('#canvas_body'),
			newClass = "",
			scale_ratio = $canvas.scale();

		if (scale_ratio < 1.6)
		{
			$canvas.scale((scale_ratio * 10 + 2) / 10);

			scale_ratio = $canvas.scale();

			$('#svg_canvas')[0].setAttribute('viewBox', '0 0 ' + MC.canvas.GRID_WIDTH * canvas_size[0] + ' ' + MC.canvas.GRID_HEIGHT * canvas_size[1]);

			newClass = $.trim($canvas_body.attr("class").replace(/zoomlevel_[^\s]+\s?/g, "")) + " zoomlevel_" + ("" + scale_ratio).replace(".", "_");
			$canvas_body.attr("class", newClass);

			$('#canvas_container, #canvas_body').css({
				'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
				'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
			});

			$('#svg_canvas').attr({
				'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
				'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
			});
		}

		$('#canvas_body')
			.addClass('canvas_zoomed');

		MC.canvas.event.clearSelected();

		return true;
	},

	_addPad: function (point, adjust)
	{
		//add by xjimmy, adjust point
		switch (point.angle)
		{
			case 0:
				point.x += MC.canvas.PORT_PADDING;
				point.y -= adjust;
				break;

			case 90:
				point.x -= adjust;
				point.y -= MC.canvas.PORT_PADDING;
				break;

			case 180:
				point.x -= MC.canvas.PORT_PADDING;
				point.y -= adjust;
				break;

			case 270:
				point.x -= adjust;
				point.y += MC.canvas.PORT_PADDING;
				break;
		}
	},

	_getPath: function (prev, current, next)
	{
		//add by xjimmy, generate path by three point
		var sign = 0,
			delta = 0,
			cornerRadius = MC.canvas.CORNER_RADIUS, //8
			closestRange = 2 * MC.canvas.CORNER_RADIUS, //2*cornerRadius
			p1,
			p2;

		/*1.above or below*/
		if (prev.x === current.x)
		{
			//1.1 calc p1
			delta = current.y - prev.y;
			if (Math.abs(delta) <= closestRange )
			{
				//use middle point between prev and current
				p1 = { 'x': current.x, 'y': (prev.y + current.y) / 2};
			}
			else
			{
				sign = delta ? (delta < 0 ? -1 : 1) : 0;
				p1 = { 'x': current.x, 'y': current.y - cornerRadius * sign};
			}

			//1.2 calc p2
			delta = current.x - next.x;
			if (Math.abs(delta) <= closestRange)
			{
				//use middle point between current and next
				p2 = { 'x': (current.x + next.x) / 2, 'y': current.y};
			}
			else
			{
				sign = delta ? (delta < 0 ? -1 : 1) : 0;
				p2 = { 'x': current.x - cornerRadius * sign, 'y': current.y};
			}
		}
		else
		{
			/*2.left or right*/
			//2.1 calc p1
			delta = current.x - prev.x;
			if (Math.abs(delta) <= closestRange)
			{
				//use middle point between prev and current
				p1 = { 'x': (prev.x + current.x) / 2, 'y': current.y};
			}
			else
			{
				sign = delta ? (delta < 0 ? -1 : 1) : 0;
				p1 = { 'x': current.x - cornerRadius * sign, 'y': current.y};
			}

			//2.2 calc p2
			delta = current.y - next.y;
			if (Math.abs(delta) <= closestRange)
			{
				//use middle point between current and next
				p2 = { 'x': current.x, 'y': (current.y + next.y) / 2};
			}
			else
			{
				sign = delta ? (delta < 0 ? -1 : 1) : 0;
				p2 = { 'x': current.x, 'y': current.y - cornerRadius * sign};
			}
		}

		return ' L ' + p1.x + ' ' + p1.y + ' Q ' + current.x + ' ' + current.y + ' ' + p2.x + ' ' + p2.y;
	},

	_bezier_q_corner: function(controlPoints)
	{
		var d = '';

		if (controlPoints.length>=6)
		{
			var start0 = controlPoints[0],
				start = controlPoints[1],
				end = controlPoints[controlPoints.length-2],
				end0 = controlPoints[controlPoints.length-1],
				mid,
				c2,
				c3;

				/*
				mid = {
					x: (start.x + end.x)/2,
					y: (start.y + end.y)/2
				};

				c2 = {
					x: mid.x,
					y: start.y
				};

				c3 = {
					x: mid.x,
					y: mid.y
				};

				d = 'M ' + start0.x + ' ' + start0.y + ' L ' + start.x + ' ' + start.y
					+ ' Q ' + c2.x + ' ' + c2.y + ' ' + c3.x + ' ' + c3.y
					+ ' T ' + end.x + ' ' + end.y
					+ ' L ' + end0.x + ' ' + end0.y;
				*/

				/*
				//method 1
				mid = {
					x: (start.x + end.x)/2,
					y: (start.y + end.y)/2
				};

				c2 = {
					x: mid.x,
					y: start.y
				};

				c3 = {
					x: mid.x,
					y: end.y
				};

				d = 'M ' + start0.x + ' ' + start0.y + ' L ' + start.x + ' ' + start.y
					+ ' C ' + c2.x + ' ' + c2.y + ' ' + c3.x + ' ' + c3.y
					+ ' ' + end.x + ' ' + end.y
					+ ' L ' + end0.x + ' ' + end0.y;
				*/

				//method 2
				mid = {
					x: (start.x + end.x)/2,
					y: (start.y + end.y)/2
				};

				c2 = controlPoints[2];

				c3 = controlPoints[controlPoints.length - 3];

				d = 'M ' + start0.x + ' ' + start0.y
					+ ' Q ' + c3.x + ' ' + c3.y
					+ ' ' + end.x + ' ' + end.y
					+ ' L ' + end0.x + ' ' + end0.y;

		}
		else
		{
			$.each(controlPoints, function (idx, value)
			{
				if (idx === 0)
				{
					//start0 point
					d = 'M ' + value.x + " " + value.y;
				}
				else if (idx === (controlPoints.length - 1))
				{
					//end0 point
					d += ' ' + value.x + ' ' + value.y;
				}
				else
				{
					//middle point
					prev_p = controlPoints[idx - 1]; //prev point
					next_p = controlPoints[idx + 1]; //next point

					if (
						(prev_p.x === value.x && next_p.x === value.x) ||
						(prev_p.y === value.y && next_p.y === value.y)
					)
					{
						//three point one line
						d += ' L ' + value.x + ' ' + value.y;
					}
					else
					{
						//fold line
						var c3   = controlPoints[controlPoints.length - 3],
							end  = controlPoints[controlPoints.length - 2],
							end0 = controlPoints[controlPoints.length - 1];

						d += ' Q ' + c3.x + ' ' + c3.y + ' ' + end.x + ' ' + end.y + ' L ' + end0.x + ' ' + end0.y;
						return false;
					}
				}
				last_p = value;
			});
		}

		return d;
	},

	_bezier_qt_corner: function(controlPoints)
	{
		var d = '';

		if (controlPoints.length>=4)
		{
			var start0 = controlPoints[0],
				start = controlPoints[1],
				end = controlPoints[controlPoints.length-2],
				end0 = controlPoints[controlPoints.length-1],
				mid,
				c2,
				c3;

				/*
				mid = {
					x: (start.x + end.x)/2,
					y: (start.y + end.y)/2
				};

				c2 = {
					x: mid.x,
					y: start.y
				};

				c3 = {
					x: mid.x,
					y: mid.y
				};

				d = 'M ' + start0.x + ' ' + start0.y + ' L ' + start.x + ' ' + start.y
					+ ' Q ' + c2.x + ' ' + c2.y + ' ' + c3.x + ' ' + c3.y
					+ ' T ' + end.x + ' ' + end.y
					+ ' L ' + end0.x + ' ' + end0.y;
				*/

				/*
				//method 1
				mid = {
					x: (start.x + end.x)/2,
					y: (start.y + end.y)/2
				};

				c2 = {
					x: mid.x,
					y: start.y
				};

				c3 = {
					x: mid.x,
					y: end.y
				};

				d = 'M ' + start0.x + ' ' + start0.y + ' L ' + start.x + ' ' + start.y
					+ ' C ' + c2.x + ' ' + c2.y + ' ' + c3.x + ' ' + c3.y
					+ ' ' + end.x + ' ' + end.y
					+ ' L ' + end0.x + ' ' + end0.y;
				*/

				//method 2
				mid = {
					x: (start.x + end.x)/2,
					y: (start.y + end.y)/2
				};

				c2 = controlPoints[2];

				c3 = controlPoints[controlPoints.length - 3];

				d = 'M ' + start0.x + ' ' + start0.y + ' L ' + start.x + ' ' + start.y
					+ ' C ' + c2.x + ' ' + c2.y + ' ' + c3.x + ' ' + c3.y
					+ ' ' + end.x + ' ' + end.y
					+ ' L ' + end0.x + ' ' + end0.y;

		}
		else
		{
			$.each(controlPoints, function (idx, value)
			{
				if (idx === 0)
				{
					//start0 point
					d = 'M ' + value.x + " " + value.y;
				}
				else if (idx === (controlPoints.length - 1))
				{
					//end0 point
					d += ' L ' + value.x + ' ' + value.y;
				}
				else
				{
					//middle point
					prev_p = controlPoints[idx - 1]; //prev point
					next_p = controlPoints[idx + 1]; //next point

					if (
						(prev_p.x === value.x && next_p.x === value.x) ||
						(prev_p.y === value.y && next_p.y === value.y)
					)
					{
						//three point one line
						d += ' L ' + value.x + ' ' + value.y;
					}
					else
					{
						//fold line
						d += MC.canvas._getPath(prev_p, value, next_p);
					}
				}
				last_p = value;
			});
		}

		return d;
	},

	_round_corner: function (controlPoints)
	{
		//add by xjimmy, draw round corner of fold line
		var d = '',
			last_p = {},
			prev_p = {},
			next_p = {};

		$.each(controlPoints, function (idx, value)
		{
			if (idx === 0)
			{
				//start0 point
				d = 'M ' + value.x + " " + value.y;
			}
			else if (idx === (controlPoints.length - 1))
			{
				//end0 point
				d += ' L ' + value.x + ' ' + value.y;
			}
			else
			{
				//middle point
				prev_p = controlPoints[idx - 1]; //prev point
				next_p = controlPoints[idx + 1]; //next point

				if (
					(prev_p.x === value.x && next_p.x === value.x) ||
					(prev_p.y === value.y && next_p.y === value.y)
				)
				{
					//three point one line
					d += ' L ' + value.x + ' ' + value.y;
				}
				else
				{
					//fold line
					d += MC.canvas._getPath(prev_p, value, next_p);
				}
			}
			last_p = value;
		});

		return d;
	},

	_adjustMidY: function (port_id, mid_y, point, sign)
	{
		switch (port_id)
		{
			case 'rtb-src-top':
			case 'rtb-src-bottom':
				mid_y = point.y;
				break;

			case 'rtb-tgt':
			case 'elb-assoc':
			case 'elb-sg-in':
			case 'elb-sg-out':
				mid_y = point.y + 40 * sign;
				break;
		}
		return mid_y;
	},

	_adjustMidX: function (port_id, mid_x, point, sign)
	{
		switch (port_id)
		{
			case 'rtb-tgt-left':
			case 'rtb-tgt-right':
			case 'elb-assoc':
			case 'elb-sg-in':
			case 'elb-sg-out':
				if (point.angle === 0)
				{//left port
					mid_x = point.x + 4;
				}
				else if (point.angle === 180)
				{//right port
					mid_x = point.x - 4;
				}
				break;

			case 'rtb-src': //both top and bottom
				mid_x = point.x + 40 * sign;
				break;
		}
		return mid_x;
	},

	updateResizer: function(node, width, height)
	{
		var pad = 10,
			top = 0;

		width = width * MC.canvas.GRID_WIDTH;
		height = height * MC.canvas.GRID_HEIGHT;

		$(node).find('.resizer-wrap').empty().append(
			Canvon.rectangle(0, top, pad, pad).attr({'class': 'group-resizer resizer-topleft', 'data-direction': 'topleft'}),
			Canvon.rectangle(pad, top, width - 2 * pad, pad).attr({'class': 'group-resizer resizer-top', 'data-direction': 'top'}),
			Canvon.rectangle(width - pad, top, pad, pad).attr({'class': 'group-resizer resizer-topright', 'data-direction': 'topright'}),
			Canvon.rectangle(0, top + pad, pad, height - 2 * pad).attr({'class': 'group-resizer resizer-left', 'data-direction': 'left'}),
			Canvon.rectangle(width - pad, top + pad, pad, height - 2 * pad).attr({'class': 'group-resizer resizer-right', 'data-direction': 'right'}),
			Canvon.rectangle(0, height + top - pad, pad, pad).attr({'class': 'group-resizer resizer-bottomleft', 'data-direction': 'bottomleft'}),
			Canvon.rectangle(pad, height + top - pad, width - 2 * pad, pad).attr({'class': 'group-resizer resizer-bottom', 'data-direction': 'bottom'}),
			Canvon.rectangle(width - pad, height + top - pad, pad, pad).attr({'class': 'group-resizer resizer-bottomright', 'data-direction': 'bottomright'})
		);
	},

	route2: function (start, end)
	{
		//add by xjimmy, connection algorithm (xjimmy's algorithm)
		var controlPoints = [],
			start0 = {},
			end0 = {},
			//start.x >= end.x
			start_0_90 = false,
			end_0_90 = false,
			start_180_270 = false,
			end_180_270 = false,
			//start.x<end.x
			start_0_270 = false,
			end_0_270 = false,
			start_90_180 = false,
			end_90_180 = false;


		//first and last point
		$.extend(true, start0, start);
		$.extend(true, end0, end);

		if (Math.sqrt(Math.pow(end0.y - start0.y, 2) + Math.pow(end0.x - start0.x, 2)) > MC.canvas.PORT_PADDING * 2)
		{
			//add pad to start and end
			MC.canvas._addPad(start, 0);
			MC.canvas._addPad(end, 0);
		}

		MC.canvas._addPad(start, 0);
		MC.canvas._addPad(end, 0);

		//ensure start.y>=end.y
		if (start.y < end.y)
		{
			var tmp = start;
			start = end;
			end = tmp;
			var tmp0 = start0;
			start0 = end0;
			end0 = tmp0;
		}

		if (start.x >= end.x)
		{
			start_0_90 = start.angle === 0 || start.angle === 90;
			end_0_90 = end.angle === 0 || end.angle === 90;
			start_180_270 = start.angle === 180 || start.angle === 270;
			end_180_270 = end.angle === 180 || end.angle === 270;
		}
		else
		{
			//start.x<end.x
			start_0_270 = start.angle === 0 || start.angle === 270;
			end_0_270 = end.angle === 0 || end.angle === 270;
			start_90_180 = start.angle === 90 || start.angle === 180;
			end_90_180 = end.angle === 90 || end.angle === 180;
		}

		//1.start point
		controlPoints.push(start0);
		controlPoints.push(start);

		//2.control point
		if (
			(start_0_90 && end_0_90) || (start_90_180 && end_90_180)
		)
		{
			//A
			controlPoints.push(
			{
				x: start.x,
				y: end.y
			});
		}
		else if (
			(start_180_270 && end_180_270) || (start_0_270 && end_0_270)
		)
		{
			//B
			controlPoints.push(
			{
				x: end.x,
				y: start.y
			});
		}
		else if (
			(start_0_90 && end_180_270) || (start_90_180 && end_0_270)
		)
		{
			//C
			mid_y = Math.round((start.y + end.y) / 2);
			if ((end.type === "AWS.VPC.RouteTable" || end.type === "AWS.ELB") && end.type !== start.type)
			{
				if (Math.abs(mid_y - end.y) > 5)
				{
					mid_y = MC.canvas._adjustMidY(end.name, mid_y, end, 1);
				}
			}
			else if ((start.type === "AWS.VPC.RouteTable" || end.type === "AWS.ELB") && end.type !== start.type)
			{
				if (Math.abs(start.y - mid_y) > 5)
				{
					mid_y = MC.canvas._adjustMidY(start.name, mid_y, start, -1);
				}
			}
			controlPoints.push(
			{
				x: start.x,
				y: mid_y
			});
			controlPoints.push(
			{
				x: end.x,
				y: mid_y
			});
		}
		else if (
			(start_180_270 && end_0_90) || (start_0_270 && end_90_180)
		)
		{
			//D
			mid_x = Math.round((start.x + end.x) / 2);
			if ((end.type === 'AWS.VPC.RouteTable' || end.type === 'AWS.ELB') && end.type !== start.type)
			{
				if (Math.abs(start.x - mid_x) > 5)
				{
					mid_x = MC.canvas._adjustMidX(end.name, mid_x, start, 1);
				}
			}
			else if (start.type === 'AWS.VPC.RouteTable' && end.type !== start.type)
			{
				if (Math.abs(mid_x - end.x) > 5)
				{
					if (end.type === 'AWS.VPC.InternetGateway' || end.type === 'AWS.VPC.VPNGateway')
					{
						mid_x = MC.canvas._adjustMidX(start.name, mid_x, end, -1);
					}
					else
					{
						mid_x = MC.canvas._adjustMidX(start.name, mid_x, start, -1);
					}
				}
			}
			else if (start.type === 'AWS.ELB' && end.type !== start.type)
			{
				if (Math.abs(mid_x - end.x) > 5)
				{
					if (end.type === 'AWS.EC2.Instance' || end.type === 'AWS.VPC.Subnet' || end.type === 'AWS.AutoScaling.Group' || end.type === 'AWS.AutoScaling.LaunchConfiguration')
					{
						mid_x = MC.canvas._adjustMidX(start.name, mid_x, end, -1);
					}
					else
					{
						mid_x = MC.canvas._adjustMidX(start.name, mid_x, start, -1);
					}
				}
			}
			controlPoints.push(
			{
				x: mid_x,
				y: start.y
			});
			controlPoints.push(
			{
				x: mid_x,
				y: end.y
			});
		}

		//3.end point
		controlPoints.push(end);
		controlPoints.push(end0);

		return controlPoints;
	},

	select: function (id)
	{
		var item = $canvas(id),
			target = item.$element(),
			node_type = item.nodeType,
			clone_node;

		Canvon(target).addClass('selected');

		if (node_type === 'line')
		{
			clone = target.clone();

			target.remove();
			$('#line_layer').append(clone);
		}

		if (node_type === 'node')
		{
			clone = target.clone();

			target.remove();
			$('#node_layer').append(clone);

			$.each(item.connection(), function (index, item)
			{
				Canvon('#' + item.line + ', #' + id + '_port-' + item.port).addClass('view-show');
			});

			Canvon(clone.find('.port')).addClass('view-show');
		}

		$canvas.selected_node().length = 0;

		$canvas.selected_node().push( id );

		return true;
	},

	move: function (node, x, y)
	{
		var target_item = $canvas(node.id),
			target_type = target_item.type,
			node_type = target_item.nodeType,

			connection_stack = [],

			group_child,
			group_coordinate,
			group_offsetX,
			group_offsetY,

			group_size,

			node_item,
			node_coordinate;

		if (node_type === 'node')
		{
			target_item.position(x, y);
			target_item.reConnect();
		}

		if (node_type === 'group')
		{
			group_child = MC.canvas.groupChild(node);

			group_coordinate = target_item.position();

			group_size = target_item.size();

			group_offsetX = x - group_coordinate[0];
			group_offsetY = y - group_coordinate[1];

			target_item.position(x, y);
			target_item.reConnect();

			$.each(group_child, function (index, item)
			{
				node_item = $canvas( item.id );
				node_coordinate = node_item.position();

				node_item.position(node_coordinate[0] + group_offsetX, node_coordinate[1] + group_offsetY);

				// Re-draw group connection
				if (
					node_item.type === 'AWS.VPC.Subnet' ||
					node_item.type === 'AWS.AutoScaling.Group' ||
					node_item.nodeType === 'node'
				)
				{
					$.each(node_item.connection(), function (i, data)
					{
						connection_stack.push( data.line );
					});
				}
			});

			$.each(connection_stack, function (index, value)
			{
				$canvas( value ).reConnect();
			});

			// Re-draw group connection
			if (target_type === 'AWS.VPC.Subnet' || target_type === 'AWS.AutoScaling.Group')
			{
				target_item.reConnect();
			}

			if (target_type === 'AWS.VPC.VPC')
			{
				var group_left = x,
					group_top = y,
					group_width = group_size[0],
					group_height = group_size[1],

					igw_gateway,
					igw_item,

					vgw_gateway,
					vgw_item;

				igw_gateway = $('.AWS-VPC-InternetGateway');
				vgw_gateway = $('.AWS-VPC-VPNGateway');

				if (igw_gateway[0])
				{
					igw_item = $canvas(igw_gateway.attr('id'));
					//igw_top = igw_item.position()[1] + group_offsetY;

					// MC.canvas.COMPONENT_SIZE[0] / 2 = 4
					igw_item.position(group_left - 4, igw_item.position()[1] + group_offsetY);

					igw_item.reConnect();
				}

				if (vgw_gateway[0])
				{
					vgw_item = $canvas(vgw_gateway.attr('id'));
					//vgw_top = vgw_item.position()[1] + group_offsetY;

					// MC.canvas.COMPONENT_SIZE[0] / 2 = 4
					vgw_item.position(group_left + group_width - 4, vgw_item.position()[1] + group_offsetY);

					vgw_item.reConnect();
				}
			}
		}
	},

	position: function (node, x, y)
	{
		x = x > 0 ? x : 0;
		y = y > 0 ? y : 0;

		var transformVal = node.transform.baseVal,
			translateVal;

		if (transformVal.numberOfItems === 1)
		{
			/* MC.canvas.GRID_WIDTH = 10 */
			/* MC.canvas.GRID_HEIGHT = 10 */
			transformVal.getItem(0).setTranslate(x * 10, y * 10);
		}
		else
		{
			/* MC.canvas.GRID_WIDTH = 10 */
			/* MC.canvas.GRID_HEIGHT = 10 */
			translateVal = node.ownerSVGElement.createSVGTransform();

			translateVal.setTranslate(x * 10, y * 10);

			transformVal.appendItem(translateVal);
		}

		return true;
	},

	groupSize: function (node, width, height)
	{
		var group = node.getElementsByClassName('group')[0];

		group.width.baseVal.value = width * 10;
		group.height.baseVal.value = height * 10;
		group.x.baseVal.value = 0;
		group.y.baseVal.value = 0;

		return true;
	},

	remove: function (node)
	{
		$(node).remove();

		return true;
	},

	pixelToGrid: function (x, y)
	{
		var scale_ratio = $canvas.scale();

		return {
			'x': Math.ceil(x * scale_ratio / MC.canvas.GRID_WIDTH),
			'y': Math.ceil(y * scale_ratio / MC.canvas.GRID_HEIGHT)
		};
	},

	matchPoint: function (x, y)
	{
		var coordinate = MC.canvas.pixelToGrid(x, y),
			node_coordinate,
			matched,
			size;

		$.each($canvas.node(), function (index, item)
		{
			node_coordinate = item.position();
			size = item.size();

			if (
				node_coordinate &&
				node_coordinate[0] <= coordinate.x &&
				node_coordinate[0] + size[0] >= coordinate.x &&
				node_coordinate[1] <= coordinate.y &&
				node_coordinate[1] + size[1] >= coordinate.y
			)
			{
				matched = document.getElementById( item.id );

				return false;
			}
		});

		return matched;
	},

	isMatchPlace: function (target_id, target_type, node_type, x, y, width, height)
	{
		var group_stack = [
				document.getElementById('asg_layer').childNodes,
				document.getElementById('subnet_layer').childNodes,
				document.getElementById('az_layer').childNodes,
				document.getElementById('vpc_layer').childNodes
			],
			points = [
				{
					'x': x,
					'y': y
				},
				{
					'x': x + width,
					'y': y
				},
				{
					'x': x,
					'y': y + height
				},
				{
					'x': x + width,
					'y': y + height
				}
			],
			canvas_size = $canvas.size(),
			match_option = MC.canvas.MATCH_PLACEMENT[ target_type ],
			ignore_stack = [],
			match = [],
			result = {},
			is_matched = false,
			match_status,
			match_target,
			group_node,
			group_child,
			coordinate,
			size,

			// For specially fast iteration algorithm
			point = points.length,
			layer,
			i;

		if (target_id !== null)
		{
			ignore_stack.push(target_id);

			if (node_type === 'group')
			{
				group_child = MC.canvas.groupChild(document.getElementById(target_id));

				$.each(group_child, function (index, item)
				{
					if ($canvas( item.id ).nodeType === 'group')
					//if (item.getAttribute('data-type') === 'group')
					{
						ignore_stack.push(item.id);
					}
				});
			}
		}

		while ( point-- )
		{
			layer = group_stack.length;

			while ( layer-- )
			{
				if ( group_stack[ layer ] )
				{
					match_status = {};
					i = group_stack[ layer ].length;

					while ( i-- )
					{
						id = group_stack[ layer ][ i ].id;

						group_item = $canvas(id);
						coordinate = group_item.position();
						size = group_item.size();

						if (
							$.inArray(id, ignore_stack) === -1 &&
							points[ point ].x > coordinate[0] &&
							points[ point ].x < coordinate[0] + size[0] &&
							points[ point ].y > coordinate[1] &&
							points[ point ].y < coordinate[1] + size[1]
						)
						{
							match_status['is_matched'] = $.inArray(group_item.type, match_option) > -1;
							match_status['target'] = id;
							match_target = id;
						}
					}

					if (!$.isEmptyObject(match_status))
					{
						match[ point ] = match_status;
					}
				}
			}
		}

		is_matched =
			match[0] &&
			match[1] &&
			match[2] &&
			match[3] &&

			match[0].is_matched &&
			match[1].is_matched &&
			match[2].is_matched &&
			match[3].is_matched &&

			match[0].target === match[1].target &&
			match[0].target === match[2].target &&
			match[0].target === match[3].target &&

			// canvas right offset = 3
			x + width < canvas_size[0] - 3 &&
			y + height < canvas_size[1] - 3;

		if (
			!is_matched &&
			$.inArray('Canvas', match_option) > -1 &&
			!match[0] &&
			!match[1] &&
			!match[2] &&
			!match[3] &&

			// canvas right offset = 3
			x + width < canvas_size[0] - 3 &&
			y + height < canvas_size[1] - 3
		)
		{
			is_matched = true;
			match_target = 'Canvas';
		}

		return {
			'is_matched': is_matched,
			'target': is_matched ? match_target : null
		};
	},

	isBlank: function (target_id, target_type, node_type, start_x, start_y, width, height)
	{
		var isBlank = true,
			end_x,
			end_y,
			coordinate,
			size;

		if (node_type === 'group')
		{
			end_x = start_x + width;
			end_y = start_y + height;

			$.each($canvas.group(), function (key, item)
			{
				coordinate = item.position();
				size = item.size();

				if (
					item.id !== target_id &&
					item.type === target_type &&
					coordinate[0] < end_x &&
					coordinate[0] + size[0] > start_x &&
					coordinate[1] < end_y &&
					coordinate[1] + size[1] > start_y
				)
				{
					isBlank = false;
				}
			});
		}

		return isBlank;
	},

	parentGroup: function (node_id, target_type, start_x, start_y, end_x, end_y)
	{
		var group_parent_type = MC.canvas.MATCH_PLACEMENT[ target_type ],
			matched = null,
			group_item,
			coordinate,
			size;

		var oldSize = null;

		$.each($canvas.group(), function (key, item)
		{
			group_item = $canvas(item.id);

			coordinate = group_item.position();
			size = group_item.size();

			if (
				node_id !== item.id &&
				$.inArray(group_item.type, group_parent_type) > -1 &&
				(
					coordinate[0] <= start_x &&
					coordinate[0] + size[0] >= start_x
				)
				&&
				(
					coordinate[1] <= start_y &&
					coordinate[1] + size[1] >= start_y
				)
			)
			{
				var newMatched = document.getElementById( item.id );
				if ( !matched ) {
					matched = newMatched;
				} else if ( size[0] < oldSize[0] || size[1] < oldSize[1] ) {
					matched = newMatched;
				}
				oldSize = size;
			}
		});

		return matched;
	},

	areaChild: function (node_id, target_type, start_x, start_y, end_x, end_y)
	{
		var group_weight = MC.canvas.GROUP_WEIGHT[ target_type ],
			matched = [],
			coordinate,
			size;

		$.each($canvas.node(), function (key, item)
		{
			coordinate = item.position();
			size = item.size();

			if (
				node_id !== item.id &&
				item.type !== 'AWS.VPC.InternetGateway' &&
				item.type !== 'AWS.VPC.VPNGateway' &&
				(
					(coordinate[0] > start_x &&
					coordinate[0] < end_x)
					||
					(coordinate[0] + size[0] > start_x &&
					coordinate[0] + size[0] < end_x)
				)
				&&
				(
					(coordinate[1] > start_y &&
					coordinate[1] < end_y)
					||
					(coordinate[1] + size[1] > start_y &&
					coordinate[1] + size[1] < end_y)
				)
			)
			{
				matched.push(document.getElementById( item.id ));
			}
		});

		$.each($canvas.group(), function (key, item)
		{
			coordinate = item.position();
			size = item.size();

			if (
				node_id !== item.id &&
				(
					$.inArray(item.type, group_weight) > -1 ||
					item.type === target_type
				) &&
				start_x <= coordinate[0] + size[0] &&
				end_x >= coordinate[0] &&
				start_y <= coordinate[1] + size[1] &&
				end_y >= coordinate[1]
			)
			{
				matched.push(document.getElementById( item.id ));
			}
		});

		return matched;
	},

	groupChild: function (group_node)
	{
		var group_item = $canvas(group_node.id),
			coordinate = group_item.position(),
			size = group_item.size();

		return MC.canvas.areaChild(
			group_item.id,
			group_item.type,
			coordinate[ 0 ],
			coordinate[ 1 ],
			coordinate[ 0 ] + size[ 0 ],
			coordinate[ 1 ] + size[ 1 ]
		);
	}
};

MC.canvas.layout = {
	init: function ()
	{
		MC.paper = Canvon('#svg_canvas');

		var canvas_size = $canvas.size(),
			attr = {
				'width' : canvas_size[0] * MC.canvas.GRID_WIDTH,
				'height': canvas_size[1] * MC.canvas.GRID_HEIGHT
			};

		$('#svg_canvas').attr( attr );
		$('#canvas_container').css( attr );

		return true;
	}
};

MC.canvas.volume = {
	bubble: function (id, node_id, volume_type)
	{
		if (!$('#volume-bubble-box')[0])
		{
			var target = $('#' + id),
				canvas_container = $('#canvas_container'),
				canvas_offset = $canvas.offset(),
				target_uid = id.replace(/_[0-9]*$/ig, ''),
				width,
				height,
				target_offset,
				target_width,
				target_height,
				bubble_box;

			canvas_container.append('<div id="volume-bubble-box"><div class="arrow"></div><div id="volume-bubble-content"></div></div>');
			bubble_box = $('#volume-bubble-box');

			volume_list = volume_type ? $canvas( $('#' + volume_type + '-wrap').data('target-id') ).listVolume( node_id ) : $canvas( id ).volume();

			$.each(volume_list, function (i, item)
			{
				item.instance_id = id;
			});

			$('#volume-bubble-content').html(
				MC.template.instanceVolume( volume_list )
			);

			if (volume_type)
			{
				target_offset = target.offset();
				target_width = target.width();
				target_height = target.height();
			}
			else
			{
				target_offset = target[0].getBoundingClientRect();
				target_width = target_offset.width;
				target_height = target_offset.height;
			}

			width = bubble_box.width();
			height = bubble_box.height();

			bubble_box
				.addClass('bubble-left')
				.data('target-id', id)
				.css({
					'left': target_offset.left + target_width + 15 - canvas_offset.left,
					'top': target_offset.top - canvas_offset.top - ((height - target_height) / 2)
				})
				.show();

			if (target.prop('namespaceURI') === 'http://www.w3.org/2000/svg')
			{
				MC.canvas.update(id, 'image', 'volume_status', MC.canvas.IMAGE.INSTANCE_VOLUME_ATTACHED_ACTIVE);
			}
		}
	},

	show: function ()
	{
		//event.stopImmediatePropagation();

		var target = $(this),
			bubble_box = $('#volume-bubble-box'),
			target_id = target.data('target-id'),
			target_uid = target_id.replace(/_[0-9]*$/ig, ''),

			volume_type =
				target.hasClass('instanceList-item-volume') ? 'instanceList' :
				target.hasClass('asgList-item-volume') ? 'asgList' : null,

			volume_list = volume_type ? $canvas( $('#' + volume_type + '-wrap').data('target-id') ).listVolume( target.parent().data('id') ) : $canvas(target_id).volume(),

			volume_length = volume_list.length,
			bubble_target_id;

		if (!bubble_box[0])
		{
			if (MC.canvas.getState() === 'app' || MC.canvas.getState() === 'appview')
			{
				if (volume_type)
				{
					MC.canvas.volume.bubble( target_id, target.parent().data('id'), volume_type );

					return false;
				}
				else if (
					$canvas( target_id ).list().length === 0
				)
				{
					MC.canvas.volume.bubble(target_id);

					return false;
				}
				else
				{
					$canvas( target_uid ).select();

					return false;
				}

				if ($canvas(target_id).type === 'AWS.AutoScaling.LaunchConfiguration')
				{
					MC.canvas.asgList.show.call( this, event );

					return false;
				}
			}

			if (
				MC.canvas.getState() === 'appedit' &&
				$canvas(target_id).type === 'AWS.AutoScaling.LaunchConfiguration'
			)
			{
				$canvas( target_uid ).select();

				return false;
			}

			if (volume_length > 0)
			{
				MC.canvas.volume.bubble(target_id);
			}
			else
			{
				if ($('#' + target_id).prop('namespaceURI') === 'http://www.w3.org/2000/svg')
				{
					MC.canvas.update(target_id, 'image', 'volume_status', MC.canvas.IMAGE.INSTANCE_VOLUME_NOT_ATTACHED);
				}
			}
		}
		else
		{
			bubble_target_id = bubble_box.data('target-id');

			MC.canvas.volume.close();
			// MC.canvas.event.clearSelected();

			// $canvas(target_uid).select();

			if (target_uid !== bubble_target_id)
			{
				// if (
				// 	MC.canvas.getState() === 'app' &&
				// 	volume_type
				// )
				// {
				// 	MC.canvas.volume.bubble( target_id, target.parent().data('id'), volume_type );
				// }
				// else
				// {
				// 	MC.canvas.volume.bubble(target_id);
				// }

				if (MC.canvas.getState() === 'app')
				{
					if (volume_type)
					{
						MC.canvas.volume.bubble( target_id, target.parent().data('id'), volume_type );

						return false;
					}
					else if (
						$canvas( target_id ).list().length === 0
					)
					{
						MC.canvas.volume.bubble(target_id);

						return false;
					}
					else
					{
						$canvas( target_uid ).select();

						return false;
					}

					if ($canvas(target_id).type === 'AWS.AutoScaling.LaunchConfiguration')
					{
						MC.canvas.asgList.show.call( this, event );

						return false;
					}
				}
			}
		}

		return false;
	},

	select: function (id)
	{
		MC.canvas.event.clearSelected();

		$('#instance_volume_list').find('.selected').removeClass('selected');

		$('#' + id).addClass('selected');

		$(document).on('keyup', MC.canvas.volume.remove);

		return false;
	},

	close: function (event)
	{
		var bubble_box = $('#volume-bubble-box'),
			target;

		if (event)
		{
			target = $(event.target);
			if (
				target.attr('class') === 'instance-volume' ||
				target.is('.snapshot_item') ||
				target.parent().is('.snapshot_item') ||
				target.is('.volume_item') ||
				target.parent().is('.volume_item')
			)
			{
				return false;
			}
		}

		if (bubble_box[0])
		{
			target_id = bubble_box.data('target-id');
			bubble_box.remove();

			if ($('#' + target_id).prop('namespaceURI') === 'http://www.w3.org/2000/svg')
			{
				MC.canvas.update(target_id, 'image', 'volume_status', MC.canvas.IMAGE.INSTANCE_VOLUME_NOT_ATTACHED);
			}

			$(document)
				.off('keyup', MC.canvas.volume.remove)
				.off('click', ':not(.instance-volume, #volume-bubble-box)', MC.canvas.volume.close);
		}
	},

	remove: function (event)
	{
		if (
			(
				event.which === 46 ||
				// For Mac
				event.which === 8
			)
			&&
			(
				event.ctrlKey === false &&
				event.metaKey === false
			)
			&&
			event.target.tagName.toLowerCase() !== 'input' &&
			MC.canvas.getState() !== 'app'
		)
		{
			var bubble_box = $('#volume-bubble-box'),
				target_id = bubble_box.data('target-id'),
				target_node = $('#' + target_id),
				target_offset = target_node[0].getBoundingClientRect(),
				volume_id = $('#instance_volume_list').find('.selected').attr('id');

			if (
				volume_id &&
				$canvas(volume_id).remove()
			)
			{
				$('#' + volume_id).parent().remove();

				bubble_box.css('top',  target_offset.top - $('#canvas_container').offset().top - ((bubble_box.height() - target_offset.height) / 2));

				$('#instance_volume_number').text(
					$canvas( target_id ).volume().length
				);

				$canvas.trigger("CANVAS_NODE_SELECTED", "");

			}

			$(document).off('keyup', MC.canvas.volume.remove);

			return false;
		}
	},

	mousedown: function (event)
	{
		if (event.which === 1)
		{
			var target = $(this),
				target_offset = target.offset(),
				canvas_offset = $canvas.offset(),
				node_type = target.data('type'),
				state = MC.canvas.getState(),
				shadow,
				clone_node;

			if (
				state === 'app' ||
				state === 'appview'// ||
				//$canvas( target.data('instance') ).type === 'AWS.AutoScaling.LaunchConfiguration'
			)
			{
				//MC.canvas.volume.select(this.id);
				$canvas( this.id, 'AWS.EC2.EBS.Volume' ).select();

				return false;
			}

			$(document.body)
				.append('<div id="drag_shadow"><div class="resource-icon resource-icon-volume"></div></div>')
				.append('<div id="overlayer"></div>');

			shadow = $('#drag_shadow');

			shadow
				.addClass('AWS-EC2-EBS-Volume')
				.css({
					'top': event.pageY - 50,
					'left': event.pageX - 50
				});

			Canvon('.AWS-EC2-Instance, .AWS-AutoScaling-LaunchConfiguration').addClass('attachable');

			$(document).on({
				'mousemove': MC.canvas.volume.mousemove,
				'mouseup': MC.canvas.volume.mouseup
			}, {
				'target': target,
				'instance_id': target.data('instance'),
				'canvas_offset': $canvas.offset(),
				'canvas_body': $('#canvas_body'),
				'shadow': shadow,
				'originalPageX': event.pageX,
				'originalPageY': event.pageY,
				'action': 'move'
			});

			$canvas( this.id, 'AWS.EC2.EBS.Volume' ).select();

			return false;
		}
	},

	mousemove: function (event)
	{
		var match_node = MC.canvas.matchPoint(
				event.pageX - event.data.canvas_offset.left,
				event.pageY - event.data.canvas_offset.top
			),
			node_type = match_node ? match_node.getAttribute('data-class') : null,
			event_data = event.data,
			target_type = ['AWS.EC2.Instance', 'AWS.AutoScaling.LaunchConfiguration'];

		if (
			event_data.action === 'add'
			||
			(
				(
					event.pageX > event_data.originalPageX + 2 ||
					event.pageX < event_data.originalPageX - 2

				)
				&&
				(
					event.pageY > event_data.originalPageY + 2 ||
					event.pageY < event_data.originalPageY - 2
				)
			)
		)
		{
			event_data.shadow
				.css({
					'top': event.pageY - 50,
					'left': event.pageX - 50
				})
				.show();

			event_data.canvas_body.addClass('node-dragging');

			if (
				match_node &&
				$.inArray(node_type, target_type) > -1
			)
			{
				MC.canvas.volume.bubble(match_node.id);
			}
			else
			{
				MC.canvas.volume.close();
			}
		}

		return false;
	},

	mouseup: function (event)
	{
		var target = $(event.data.target),
			node_option = target.data('option') || {},
			bubble_box = $('#volume-bubble-box'),
			original_node_volume_data,
			new_volume_name,
			target_volume_data,
			original_node_id,
			volume_type,
			new_volume,
			volume_id,
			target_id,
			target_az;

		Canvon('.AWS-EC2-Instance, .AWS-AutoScaling-LaunchConfiguration').removeClass('attachable');

		if (bubble_box[0])
		{
			target_id = bubble_box.data('target-id');
			target_node = $('#' + target_id);
			target_offset = target_node[0].getBoundingClientRect();

			if (event.data.action === 'move')
			{
				volume_id = target.attr('id');

				if (event.data.instance_id !== target_id)
				{
					volume_item = $canvas(target_id).moveVolume(volume_id);

					if (volume_item)
					{
						volume_type = volume_item.snapshotId ? 'snapshot_item' : 'volume_item';

						$('#instance_volume_list').append('<li><a href="javascript:void(0)" id="' + volume_id +'" class="' + volume_type + '"><span class="volume_name">' + volume_item.name + '</span><span class="volume_size">' + volume_item.size + 'GB</span></a></li>');

						$('#instance_volume_number').text(
							$canvas( target_id ).volume().length
						);

						$canvas( volume_item.id, 'AWS.EC2.EBS.Volume' ).select();
					}
				}
			}
			else
			{
				volume_item = $canvas(target_id).addVolume(target.data('option'));

				if (volume_item)
				{
					volume_type = volume_item.snapshotId ? 'snapshot_item' : 'volume_item';

					$('#instance_volume_list').append('<li><a href="javascript:void(0)" id="' + volume_item.id +'" data-instance="' + target_id + '" class="' + volume_type + '"><span class="volume_name">' + volume_item.name + '</span><span class="volume_size">' + volume_item.size + 'GB</span></a></li>');

					$('#instance_volume_number').text(
						$canvas( target_id ).volume().length
					);

					$canvas( volume_item.id, 'AWS.EC2.EBS.Volume' ).select();
				}
			}

			bubble_box.css('top',  target_offset.top - $('#canvas_container').offset().top - ((bubble_box.height() - target_offset.height) / 2));
		}
		else
		{
			// dispatch event when is not matched
			$canvas.trigger("CANVAS_PLACE_NOT_MATCH", {
				'type': 'AWS.EC2.EBS.Volume'
			});
		}

		event.data.shadow.remove();

		event.data.canvas_body.removeClass('node-dragging');

		$('#overlayer').remove();

		$(document).off({
			'mousemove': MC.canvas.volume.mousemove,
			'mouseup': MC.canvas.volume.mouseup
		});

		return false;
	}
};

MC.canvas.asgList = {
	show: function (event)
	{
		event.stopImmediatePropagation();

		if (event.which === 1)
		{
			MC.canvas.event.clearList();

			var target = this.parentNode,
				target_id = target.id,
				target_offset = Canvon(target).offset(),
				canvas_offset = $canvas.offset();

			$('#canvas_container').append(
				MC.template.asgList( $canvas( target_id ).list() )
			);

			$('#asgList-wrap')
				.data('target-id', target.id)
				.on('click', '.asgList-item', MC.canvas.asgList.select)
				.css({
					'top': target_offset.top - canvas_offset.top - 30,
					'left': target_offset.left - canvas_offset.left - 20
				});

			MC.canvas.asgList.select.call($('#asgList-wrap .asgList-item').first());

			return true;
		}
	},

	close: function ()
	{
		$('#asgList-wrap').remove();

		MC.canvas.volume.close();

		return false;
	},

	select: function (event)
	{
		var target = $(this);

		$('#asgList-wrap .selected').removeClass('selected');

		target.addClass('selected');
		$canvas( $('#asgList-wrap').data('target-id') ).select( target.data('id') );

		return false;
	},

	selectById: function (target_id, item_id)
	{
		MC.canvas.event.clearList();

		var target_offset = Canvon('#' + target_id).offset(),
			canvas_offset = $canvas.offset();

		$('#canvas_container').append(
			MC.template.asgList( $canvas( target_id ).list() )
		);

		$('#asgList-wrap')
			.data('target-id', target_id)
			.on('click', '.asgList-item', MC.canvas.asgList.select)
			.css({
				'top': target_offset.top - canvas_offset.top - 30,
				'left': target_offset.left - canvas_offset.left - 20
			});

		MC.canvas.asgList.select.call( $('#' + item_id) );
	}
};

MC.canvas.instanceList = {
	show: function (event)
	{
		event.stopImmediatePropagation();

		if (event.which === 1)
		{
			MC.canvas.event.clearList();

			var target = this.parentNode,
				target_id = target.id,
				target_offset = Canvon('#' + target_id).offset(),
			   	canvas_offset = $canvas.offset(),
			   	list = $canvas( target_id ).list();

			if (list.length === 0)
			{
				$canvas(target_id).select();

				return false;
			}

			$('#canvas_container').append(
				MC.template.instanceList( list )
			);

			$('#instanceList-wrap')
				.data('target-id', target.id)
				.on('click', '.instanceList-item', MC.canvas.instanceList.select)
				.css({
					'top': target_offset.top - canvas_offset.top - 30,
					'left': target_offset.left - canvas_offset.left - 20
				});

			MC.canvas.instanceList.select.call($('#instanceList-wrap .instanceList-item').first());
		}

		return false;
	},

	close: function ()
	{
		$('#instanceList-wrap').remove();

		MC.canvas.volume.close();

		return false;
	},

	select: function (event)
	{
		var target = $(this),
			bubble_box = $('#volume-bubble-box');

		if (
			bubble_box[0] &&
			bubble_box.data('target-id') !== this.id
		)
		{
			MC.canvas.volume.close();
		}

		$('#instanceList-wrap .selected').removeClass('selected');

		target.addClass('selected');

		$canvas( $('#instanceList-wrap').data('target-id') ).select( target.data('id') );

		//$canvas.trigger('CANVAS_INSTANCE_SELECTED', target.data('id'));

		return false;
	},

	selectById: function (target_id, item_id)
	{
		MC.canvas.event.clearList();

		var target_offset = Canvon('#' + target_id).offset(),
		   	canvas_offset = $canvas.offset(),
		   	list = $canvas(target_id).list();

		$('#canvas_container').append(
			MC.template.instanceList(list)
		);

		$('#instanceList-wrap')
			.data('target-id', target_id)
			.on('click', '.instanceList-item', MC.canvas.instanceList.select)
			.css({
				'top': target_offset.top - canvas_offset.top - 30,
				'left': target_offset.left - canvas_offset.left - 20
			});

		MC.canvas.instanceList.select.call( $('#' + item_id) );
	}
};

MC.canvas.eniList = {
	show: function (event)
	{
		event.stopImmediatePropagation();

		if (event.which === 1)
		{
			MC.canvas.event.clearList();

			var target = this.parentNode,
				target_id = target.id,
				target_offset = Canvon('#' + target_id).offset(),
				canvas_offset = $canvas.offset(),
				list = $canvas( target_id ).list();

			if (list.length === 0)
			{
				$canvas(target_id).select();

				return false;
			}

			$('#canvas_container').append( MC.template.eniList( list ) );

			$('#eniList-wrap')
				.data('target-id', target.id)
				.on('click', '.eniList-item', MC.canvas.eniList.select)
				.css({
					'top': target_offset.top - canvas_offset.top - 30,
					'left': target_offset.left - canvas_offset.left - 20
				});

			MC.canvas.eniList.select.call($('#eniList-wrap .eniList-item').first());

			return false;
		}
	},

	close: function ()
	{
		$('#eniList-wrap').remove();

		return false;
	},

	select: function (event)
	{
		var target = $(this);

		$('#eniList-wrap .selected').removeClass('selected');

		target.addClass('selected');

		$canvas( $('#eniList-wrap').data('target-id') ).select( target.data('id') );

		//$canvas.trigger('CANVAS_ENI_SELECTED', target.data('id'));

		return false;
	},

	selectById: function (target_id, item_id)
	{
		MC.canvas.event.clearList();

		var target_offset = Canvon('#' + target_id).offset(),
			canvas_offset = $canvas.offset(),
			list = $canvas( target_id ).list();

		$('#canvas_container').append( MC.template.eniList( list ) );

		$('#eniList-wrap')
			.data('target-id', target_id)
			.on('click', '.eniList-item', MC.canvas.eniList.select)
			.css({
				'top': target_offset.top - canvas_offset.top - 30,
				'left': target_offset.left - canvas_offset.left - 20
			});

		MC.canvas.eniList.select.call( $('#' + item_id) );

		return false;
	}
};

MC.canvas.nodeAction = {
	show: function (id)
	{
		var canvas_status = MC.canvas.getState(),
			target_type = $canvas(id).type;

		if (
			(
				canvas_status === 'stack' ||
				canvas_status === 'app' ||
				canvas_status === 'appedit'
			)
			&&
			(
				target_type === 'AWS.EC2.Instance' ||
				target_type === 'AWS.AutoScaling.LaunchConfiguration'
			)
		)
		{
			var resModel = Design.instance().component(id);
			var stateAry = resModel.getStateData();
			var stateNum = 0;

			if (stateAry && _.isArray(stateAry)) {
				stateNum = stateAry.length;
			}

			if ((canvas_status === 'app') && !stateNum)
			{
				return;
			}

			$('#canvas_container').append(MC.template.nodeAction({
				state_num: stateNum
			}));

			MC.canvas.nodeAction.updateNumber(stateNum);

			MC.canvas.nodeAction.position(id);
		}
	},

	updateNumber: function (num)
	{
		$('#node-state-number').text(num);

		return false;
	},

	position: function (id)
	{
		var target = $('#' + id),
			offset = target[0].getBoundingClientRect(),
			canvas_offset = $('#svg_canvas').offset();

		$('#node-action-wrap')
			.css({
				'left': offset.left - canvas_offset.left + offset.width + 5,
				'top': offset.top - canvas_offset.top
			})
			.attr('data-id', id);

		return true;
	},

	popup: function (event)
	{
		event.stopImmediatePropagation();

		if (event.which === 1)
		{
			$canvas.trigger("STATE_ICON_CLICKED", $(this).data('id'));
		}

		return false;
	},

	remove: function (id)
	{
		var node_action = $('#node-action-wrap');

		if (node_action.data('id') === id)
		{
			node_action.remove();
		}

		return true;
	}
};

MC.canvas.event = {};

// Double click event simulation
MC.canvas.event.dblclick = function (callback)
{
	if (MC.canvas.event.dblclick.timer)
	{
		// Double click event call
		callback.call(this, event);

		return true;
	}

	MC.canvas.event.dblclick.timer = setTimeout(function ()
	{
		MC.canvas.event.dblclick.timer = null;
	}, 500);

	return false;
};

MC.canvas.event.dblclick.timer = null;

MC.canvas.event.dragable = {
	mousedown: function (event)
	{
		if (
			event.which === 1 &&
			(event.ctrlKey || event.metaKey)
		)
		{
			event.stopImmediatePropagation();

			MC.canvas.event.ctrlMove.mousedown.call( this, event );

			return false;
		}

		if (event.which === 1)
		{
			// Double click event
			if (MC.canvas.event.dblclick(function ()
			{
				$canvas.trigger('SHOW_PROPERTY_PANEL');
			}))
			{
				return false;
			}

			var target = $(this),
				target_item = $canvas(this.id),
				target_offset = target_item.offset(),
				target_type = target_item.type,
				node_type = target_item.nodeType,
				svg_canvas = $('#svg_canvas'),
				canvas_offset = $canvas.offset(),
				canvas_body = $('#canvas_body'),
				currentTarget = $(event.target),
				shadow,
				target_group_type,
				SVGtranslate;

			if (target_type === 'AWS.AutoScaling.LaunchConfiguration' && MC.canvas.getState() === 'app')
			{
				if (currentTarget.is('.instance-volume'))
				{
					MC.canvas.volume.show.call(event.target);
				}
				else
				{
					MC.canvas.event.clearSelected();

					$canvas(this.id).select();
					// MC.canvas.nodeAction.show(this.id);
				}

				// return false;
			}

			if (currentTarget.is('.instance-volume'))
			{
				MC.canvas.volume.show.call(event.target);

				return false;
			}

			if (currentTarget.is('.eip-status') && MC.canvas.getState() !== 'appview')
			{
				$canvas( this.id ).toggleEip();

				return false;
			}

			if (target_type === 'AWS.VPC.Subnet')
			{
				target.find('.port').hide();
			}

			shadow = target.clone();

			// Allow cloning for instance
			if (target_type === 'AWS.EC2.Instance')
			{
				shadow.append([
					Canvon.rectangle(75, 75, 25, 25).attr({'class': 'clone-icon', 'rx': 2, 'ry': 2}),
					Canvon.image(MC.IMG_URL + 'ide/icon-drag-to-copy.png', 82, 82, 12, 12).attr('class', 'clone-icon'),
				]);
			}

			svg_canvas.append(shadow);

			target_group_type = MC.canvas.MATCH_PLACEMENT[ target_type ];

			if (target_group_type)
			{
				$.each(target_group_type, function (index, item)
				{
					if (item !== 'AWS.AutoScaling.Group' && item !== 'Canvas')
					{
						Canvon('.' + item.replace(/\./ig, '-')).addClass('dropable-group');
					}
				});
			}

			$(document.body).append('<div id="overlayer" class="grabbing"></div>');

			// Caching the SVGtranslate object at first for fastest value manipulating.
			if (shadow[0].transform.numberOfItems === 0)
			{
				SVGtranslate = shadow[0].transform.baseVal.appendItem(
					shadow[0].ownerSVGElement.createSVGTransform()
				);
			}
			else
			{
				SVGtranslate = shadow[0].transform.baseVal.getItem(0);
			}

			if (target_type === 'AWS.VPC.InternetGateway' || target_type === 'AWS.VPC.VPNGateway')
			{
				Canvon(shadow).addClass('shadow');

				$(document).on({
					'mousemove': MC.canvas.event.dragable.gatewaymove,
					'mouseup': MC.canvas.event.dragable.gatewayup
				}, {
					'target': target,
					'canvas_body': canvas_body,
					'target_type': target_type,
					'node_type': node_type,
					'vpc_data': $canvas($('.AWS-VPC-VPC').attr('id')),
					'shadow': shadow,
					'offsetX': event.pageX - target_offset.left + canvas_offset.left,
					'offsetY': event.pageY - target_offset.top + canvas_offset.top,
					'originalPageX': event.pageX,
					'originalPageY': event.pageY,
					'scale_ratio': $canvas.scale(),
					'SVGtranslate': SVGtranslate
				});
			}
			else
			{
				$(document).on({
					'keydown.DRAGABLE_EVENT': target_type === 'AWS.EC2.Instance' ? MC.canvas.event.dragable.keyClone : false,
					'mousemove.DRAGABLE_EVENT': MC.canvas.event.dragable.mousemove,
					'mouseup.DRAGABLE_EVENT': Canvon(event.target).hasClass('asg-resource-dragger') ?
						// For asgExpand
						MC.canvas.event.dragable.asgExpandup :
						// Default
						MC.canvas.event.dragable.mouseup
				}, {
					'target': target,
					'canvas_body': canvas_body,
					'target_type': target_type,
					'node_type': node_type,
					'shadow': shadow,
					'offsetX': event.pageX - target_offset.left + canvas_offset.left,
					'offsetY': event.pageY - target_offset.top + canvas_offset.top,
					'groupChild': node_type === 'group' ? MC.canvas.groupChild(this) : null,
					'originalPageX': event.pageX,
					'originalPageY': event.pageY,
					'originalTarget': event.target,
					'size': target_item.size(),
					'grid_width': MC.canvas.GRID_WIDTH,
					'grid_height': MC.canvas.GRID_HEIGHT,
					'scale_ratio': $canvas.scale(),
					'SVGtranslate': SVGtranslate
				});
			}

			MC.canvas.volume.close();
			MC.canvas.event.clearSelected();
		}

		// return false;
	},
	// For instance cloning recently
	keyClone: function (event)
	{
		if (
			event.altKey
		)
		{
			if (!event.data.canvas_body.hasClass('cloning'))
			{
				event.data.canvas_body.addClass('cloning');

				return false;
			}
		}
		else
		{
			event.data.canvas_body.removeClass('cloning');

			return false;
		}
	},
	mousemove: function (event)
	{
		var event_data = event.data,
			target_id = event_data.target[0].id,
			target_type = event_data.target_type,
			node_type = event_data.node_type,
			size = event_data.size,
			grid_width = event_data.grid_width,
			grid_height = event_data.grid_height,
			scale_ratio = event_data.scale_ratio,
			coordinate = {
				'x': Math.round((event.pageX - event_data.offsetX) / (grid_width / scale_ratio)),
				'y': Math.round((event.pageY - event_data.offsetY) / (grid_height / scale_ratio))
			},
			match_place = MC.canvas.isMatchPlace(
				target_id,
				target_type,
				node_type,
				coordinate.x,
				coordinate.y,
				size[0],
				size[1]
			);

		if (
			event.pageX !== event_data.originalPageX &&
			event.pageY !== event_data.originalPageY &&
			!Canvon(event_data.shadow).hasClass('shadow')
		)
		{
			Canvon(event_data.shadow).addClass('shadow');
			event_data.canvas_body.addClass('node-dragging');
		}

		if (event.altKey)
		{
			event_data.canvas_body.addClass('cloning');
		}
		else
		{
			event_data.canvas_body.removeClass('cloning');
		}

		Canvon('.match-dropable-group').removeClass('match-dropable-group');

		if (match_place.is_matched)
		{
			Canvon('#' + match_place.target).addClass('match-dropable-group');
		}

		// Cached SVGtranslate (fast)
		event_data.SVGtranslate.setTranslate(coordinate.x * grid_width, coordinate.y * grid_height);

		return false;
	},
	mouseup: function (event)
	{
		var event_data = event.data,
			target = event_data.target,
			target_id = target.attr('id'),
			target_item = $canvas(target_id),
			target_type = event_data.target_type,
			node_type = event_data.node_type;

		if (target_type === 'AWS.VPC.Subnet')
		{
			event_data.target.find('.port').show();
		}

		// Selected
		if (
			event.pageX === event_data.originalPageX &&
			event.pageY === event_data.originalPageY
		)
		{
			if (MC.canvas.getState() === 'app')
			{
				MC.canvas.instanceList.show.call( target[0], event);
			}
			else
			{
				$canvas(target_id).select();
				MC.canvas.volume.close();

				// if (target_item.type === 'AWS.EC2.Instance')
				// {
				// 	MC.canvas.nodeAction.show(target_id);
				// }
			}
		}
		else
		{
			var svg_canvas = $("#svg_canvas"),
				canvas_offset = $canvas.offset(),
				shadow_offset = Canvon(event_data.shadow).offset(),
				layout_node_data = $canvas.node(),

				scale_ratio = $canvas.scale(),
				size,
				match_place,
				coordinate,
				clone_node,
				parentGroup;

			if (node_type === 'node')
			{
				size = event_data.size;

				coordinate = MC.canvas.pixelToGrid(
					shadow_offset.left - canvas_offset.left,
					shadow_offset.top - canvas_offset.top
				);

				match_place = MC.canvas.isMatchPlace(
					target_id,
					target_type,
					node_type,
					coordinate.x,
					coordinate.y,
					size[0],
					size[1]
				);

				parentGroup = MC.canvas.parentGroup(
					target_id,
					target_type,
					coordinate.x,
					coordinate.y,
					coordinate.x + size[0],
					coordinate.y + size[1]
				);

				if (
					coordinate.x > 0 &&
					coordinate.y > 0 &&
					match_place.is_matched
				)
				{
					if (event_data.canvas_body.hasClass('cloning'))
					{
						target_item.clone((parentGroup ? parentGroup.id : 'canvas'), coordinate.x, coordinate.y);
					}
					else
					{
						target_item.changeParent((parentGroup ? parentGroup.id : 'canvas'), function ()
						{
							this.move(coordinate.x, coordinate.y);
							this.reConnect();

							$canvas(target_id).select();
						});
					}
				}
			}

			if (node_type === 'group')
			{
				var coordinate = MC.canvas.pixelToGrid(
						shadow_offset.left - canvas_offset.left,
						shadow_offset.top - canvas_offset.top
					),
					layout_group_data = $canvas.group(),
					group_data = layout_group_data[ target_id ],
					group_coordinate = target_item.position(),
					group_size = target_item.size(),
					group_type = target_item.type,
					group_padding = MC.canvas.GROUP_PADDING,
					child_stack = [],
					unique_stack = [],
					connection_stack = {},
					coordinate_fixed = false,
					match_place,
					areaChild,
					parentGroup,
					parent_data,
					parent_coordinate,
					parent_size,
					data,
					connection_target_id,
					fixed_areaChild,
					group_offsetX,
					group_offsetY,
					matched_child,
					child_data,
					//child_type,
					isBlank;

				if (group_type === 'AWS.VPC.VPC')
				{
					if (coordinate.y <= 3)
					{
						coordinate.y = 3;
					}

					if (coordinate.x <= 5)
					{
						coordinate.x = 5;
					}
				}
				else
				{
					if (coordinate.y <= 2)
					{
						coordinate.y = 2;
					}

					if (coordinate.x <= 2)
					{
						coordinate.x = 2;
					}
				}

				match_place = MC.canvas.isMatchPlace(
					target_id,
					target_type,
					node_type,
					// Make it larger for better place determination
					coordinate.x - 1,
					coordinate.y - 1,
					group_size[0] + 2,
					group_size[1] + 2
				);

				areaChild = MC.canvas.areaChild(
					target_id,
					target_type,
					coordinate.x,
					coordinate.y,
					coordinate.x + group_size[0],
					coordinate.y + group_size[1]
				);

				parentGroup = MC.canvas.parentGroup(
					target_id,
					group_type,
					coordinate.x,
					coordinate.y,
					coordinate.x + group_size[0],
					coordinate.y + group_size[1]
				);

				$.each(areaChild, function (index, item)
				{
					child_stack.push(item.id);
				});

				$.each(event_data.groupChild, function (index, item)
				{
					child_stack.push(item.id);
				});

				$.each(child_stack, function (index, item)
				{
					if ($.inArray(item, unique_stack) === -1)
					{
						unique_stack.push(item);
					}
				});

				if (parentGroup)
				{
					parent_item = $canvas(parentGroup.id);
					parent_data = layout_group_data[ parentGroup.id ];
					parent_coordinate = parent_item.position();
					parent_size = parent_item.size();

					if (parent_coordinate[0] + group_padding > coordinate.x)
					{
						coordinate.x = parent_coordinate[0] + group_padding;
						coordinate_fixed = true;
					}
					if (parent_coordinate[0] + parent_size[0] - group_padding < coordinate.x + group_size[0])
					{
						coordinate.x = parent_coordinate[0] + parent_size[0] - group_padding - group_size[0];
						coordinate_fixed = true;
					}
					if (parent_coordinate[1] + group_padding > coordinate.y)
					{
						coordinate.y = parent_coordinate[1] + group_padding;
						coordinate_fixed = true;
					}
					if (parent_coordinate[1] + parent_size[1] - group_padding < coordinate.y + group_size[1])
					{
						coordinate.y = parent_coordinate[1] + parent_size[1] - group_padding - group_size[1];
						coordinate_fixed = true;
					}

					if (coordinate_fixed)
					{
						fixed_areaChild = MC.canvas.areaChild(
							target_id,
							target_type,
							coordinate.x,
							coordinate.y,
							coordinate.x + group_size[0],
							coordinate.y + group_size[1]
						);
					}
				}

				group_offsetX = coordinate.x - group_coordinate[0];
				group_offsetY = coordinate.y - group_coordinate[1];

				isBlank =
					MC.canvas.isBlank(
						target_id,
						group_type,
						'group',
						coordinate.x,
						coordinate.y,
						group_size[0],
						group_size[1]
					) &&
					event_data.groupChild.length === unique_stack.length;

				if (
					(
						(
							coordinate_fixed &&
							match_place.is_matched &&
							event_data.groupChild.length === fixed_areaChild.length
						)
						||
						(
							!coordinate_fixed &&
							match_place.is_matched &&
							isBlank
						)
					)
				)
				{
					target_item.changeParent((parentGroup ? parentGroup.id : 'canvas'), function ()
					{
						this.move(coordinate.x, coordinate.y);
						this.reConnect();
					});
				}
				else if (!isBlank)
				{
					//dispatch event when is not blank
					$canvas.trigger("CANVAS_PLACE_OVERLAP");
				}

				$canvas(target_id).select();
			}

			// $canvas(target_id).select();
			// MC.canvas.nodeAction.show(target_id);
		}

		event_data.shadow.remove();

		event_data.canvas_body
			.removeClass('node-dragging')
			.removeClass('cloning');

		$('#overlayer').remove();

		Canvon('.dropable-group').removeClass('dropable-group');

		Canvon('.match-dropable-group').removeClass('match-dropable-group');

		$(document).off('.DRAGABLE_EVENT');
	},
	gatewaymove: function (event)
	{
		var event_data = event.data,
			gateway_top = Math.round((event.pageY - event_data.offsetY) / (MC.canvas.GRID_HEIGHT / event_data.scale_ratio)),
			vpc_coordinate = event_data.vpc_data.position(),
			vpc_size = event_data.vpc_data.size(),
			target_type = event_data.target_type;

		// MC.canvas.COMPONENT_SIZE for AWS.VPC.InternetGateway and AWS.VPC.VPNGateway = 8
		if (gateway_top > vpc_coordinate[1] + vpc_size[1] - 8)
		{
			gateway_top = vpc_coordinate[1] + vpc_size[1] - 8;
		}

		if (gateway_top < vpc_coordinate[1])
		{
			gateway_top = vpc_coordinate[1];
		}

		if (target_type === 'AWS.VPC.InternetGateway')
		{
			// Cached SVGtranslate (fast)
			event_data.SVGtranslate.setTranslate(
				(vpc_coordinate[0] - 4) * MC.canvas.GRID_WIDTH,
				gateway_top * MC.canvas.GRID_HEIGHT
			);
		}

		if (target_type === 'AWS.VPC.VPNGateway')
		{
			// Cached SVGtranslate (fast)
			event_data.SVGtranslate.setTranslate(
				(vpc_coordinate[0] + vpc_size[0] - 4) * MC.canvas.GRID_WIDTH,
				gateway_top * MC.canvas.GRID_HEIGHT
			);
		}

		return false;
	},
	gatewayup: function (event)
	{
		var target = event.data.target,
			target_id = target.attr('id'),
			target_item = $canvas(target_id),
			target_type = target_item.type,
			canvas_offset = $canvas.offset(),
			shadow_offset = Canvon(event.data.shadow).offset(),
			node_class = target.data('class'),
			scale_ratio = $canvas.scale(),
			coordinate = MC.canvas.pixelToGrid(shadow_offset.left - canvas_offset.left, shadow_offset.top - canvas_offset.top);

		target_item.position(null, coordinate.y);

		target_item.reConnect();

		target_item.select();

		Canvon('.dropable-group').removeClass('dropable-group');

		event.data.shadow.remove();

		event.data.canvas_body.removeClass('node-dragging');

		$('#overlayer').remove();

		$(document).off({
			'mousemove': MC.canvas.event.gatewaymove,
			'mouseup': MC.canvas.event.gatewayup
		});
	},
	asgExpandup: function (event)
	{
		var event_data = event.data,
			target = event.data.target,
			target_id = target.attr('id'),
			target_type = event.data.target_type,
			node_type = event_data.nodeType,
			asg_item = $canvas(target_id),
			svg_canvas = $('#svg_canvas'),
			canvas_offset = $canvas.offset(),
			shadow_offset = Canvon(event.data.shadow).offset(),
			scale_ratio = $canvas.scale(),
			coordinate = MC.canvas.pixelToGrid(shadow_offset.left - canvas_offset.left, shadow_offset.top - canvas_offset.top),
			size = event_data.size,
			areaChild = MC.canvas.areaChild(
				target_id,
				target_type,
				coordinate.x,
				coordinate.y,
				coordinate.x + size[0],
				coordinate.y + size[1]
			),
			match_place = MC.canvas.isMatchPlace(
				null,
				target_type,
				node_type,
				coordinate.x,
				coordinate.y,
				size[0],
				size[1]
			),
			parentGroup = MC.canvas.parentGroup(
				target_id,
				target_type,
				coordinate.x,
				coordinate.y,
				coordinate.x + size[0],
				coordinate.y + size[1]
			);

		if (
			areaChild.length === 0 &&
			match_place.is_matched
		)
		{
			asg_item.asgExpand(match_place.target, coordinate.x, coordinate.y);

			asg_item.select();
		}

		Canvon('.dropable-group').removeClass('dropable-group');

		event.data.shadow.remove();

		event.data.canvas_body.removeClass('node-dragging');

		$('#overlayer').remove();

		$(document).off('.DRAGABLE_EVENT');
	}
};

MC.canvas.event.drawConnection = {
	mousedown: function (event)
	{
		if ( event.which != 1 ) { return false; }

		var svg_canvas = $('#svg_canvas'),
			canvas_offset = svg_canvas.offset(),
			target = $(this),
			target_offset = Canvon(this).offset(),

			parent = target.parent(),
			node_id = parent.attr('id'),
			parent_item = $canvas(node_id),

			port_type = target.data('type'),
			port_name = target.data('name'),
			scale_ratio = $canvas.scale(),
			target_node,
			target_port;

		//calculate point of junction
		var offset = {
			  left : target_offset.left + Math.round(target_offset.width / 2)
			, top  : target_offset.top  + Math.round(target_offset.height / 2)
		};

		$(document.body).append('<div id="overlayer"></div>');

		svg_canvas.append(Canvon.group().attr({
			'class': 'draw-line-wrap line-' + port_type,
			'id': 'draw-line-connection'
		}));

		$(document).on({
			'mousemove': MC.canvas.event.drawConnection.mousemove,
			'mouseup': MC.canvas.event.drawConnection.mouseup
		}, {
			'connect': target.data('connect'),
			'originalTarget': target.parent(),
			'originalX': (offset.left - canvas_offset.left) * scale_ratio,
			'originalY': (offset.top - canvas_offset.top) * scale_ratio,
			'draw_line': $('#draw-line-connection'),
			'port_name': port_name,
			'canvas_offset': canvas_offset,
			'scale_ratio': scale_ratio
		});

		MC.canvas.event.clearSelected();

		// Keep hover style on
		$.each(parent_item.connection(), function (index, item)
		{
			Canvon('#' + item.line).addClass('view-keephover');
		});

		// Highlight connectable port
		var connection_option = parent_item.connectionData( port_name );
		var reg = /\./ig;
		for ( var i in connection_option ) {
			$('.' + i.replace(reg, '-')).each(function (index, item) {
				if ( item.id == node_id ) { return; }

				var ports = connection_option[i];

				for ( var j = 0; j < connection_option[i].length; ++j ) {

					if (parent_item.isConnectable( port_name, item.id, ports[j] ))
					{
						target_node = this;

						$(target_node).find('.port-' + ports[j]).each(function ()
						{
							target_port = $(this);

							if (target_port.css('display') !== 'none')
							{
								Canvon(target_node).addClass('connectable');

								Canvon(target_port).addClass("connectable-port view-show");
							}
						});
					}

				}
			});
		}
		return false;
	},

	mousemove: function (event)
	{
		var event_data = event.data,
			canvas_offset = event_data.canvas_offset,
			scale_ratio = event_data.scale_ratio,
			endX = (event.pageX - canvas_offset.left) * scale_ratio,
			endY = (event.pageY - canvas_offset.top) * scale_ratio,
			startX = event_data.originalX,
			startY = event_data.originalY,
			angle = Math.atan2(endY - startY, endX - startX),
			arrow_length = 8,

			arrowPI = 3.141592653589793 / 6,
			arrowAngleA = angle - arrowPI,
			arrowAngleB = angle + arrowPI;

		event_data.draw_line.empty().append(
			Canvon.line(startX, startY, endX, endY).attr('class', 'draw-line'),

			Canvon.polygon([
				[endX, endY],
				[endX - arrow_length * Math.cos(arrowAngleA), endY - arrow_length * Math.sin(arrowAngleA)],
				[endX - arrow_length * Math.cos(arrowAngleB), endY - arrow_length * Math.sin(arrowAngleB)]
			]).attr('class', 'draw-line-arrow')
		);

		return false;
	},

	mouseup: function (event)
	{
		event.data.draw_line.remove();

		var match_node = MC.canvas.matchPoint(
				Math.round(event.pageX - event.data.canvas_offset.left),
				Math.round(event.pageY - event.data.canvas_offset.top)
			),
			//svg_canvas = $('#svg_canvas'),
			from_node = event.data.originalTarget,
			port_name = event.data.port_name,
			from_type = from_node.data('class'),

			to_node,
			port_name,
			to_port_name,
			line_id,
			coordinate,
			group_coordinate,
			group_size;

		if (
			(
				from_type === 'AWS.VPC.RouteTable' || from_type === 'AWS.ELB'
			)
			&&
			!match_node
		)
		{
			coordinate = MC.canvas.pixelToGrid(event.pageX - event.data.canvas_offset.left, event.pageY - event.data.canvas_offset.top);

			match_node = null;

			$.each($canvas.group(), function (key, item)
			{
				group_coordinate = item.position();
				group_size = item.size();

				if (
					item.type === 'AWS.VPC.Subnet' &&
					group_coordinate &&

					// Specially extend subnet area
					group_coordinate[0] - 2 < coordinate.x &&
					group_coordinate[0] + group_size[0] + 2 > coordinate.x &&
					group_coordinate[1] < coordinate.y &&
					group_coordinate[1] + group_size[1] > coordinate.y
				)
				{
					match_node = document.getElementById( item.id );

					return false;
				}
			});
		}

		if (match_node)
		{
			to_node = $(match_node);

			if (
				$.inArray(from_node.data('class'), ['AWS.EC2.Instance', 'AWS.AutoScaling.LaunchConfiguration']) > -1 &&
				to_node.data('class') === 'AWS.ELB'
			)
			{
				match_node_offset = match_node.getBoundingClientRect();

				if (event.pageX > (match_node_offset.left + match_node_offset.width / 2))
				{
					to_port_name = 'elb-sg-out';
				}
				if (event.pageX < (match_node_offset.left + match_node_offset.width / 2))
				{
					to_port_name = 'elb-sg-in';
				}
			}
			else
			{
				to_port_name = to_node.find('.connectable-port').data('name');
			}

			if (!from_node.is(to_node) && to_port_name !== undefined)
			{
				$canvas.connect(from_node.attr('id'), port_name, to_node.attr('id'), to_port_name);
			}
		}

		Canvon('#svg_canvas .connectable').removeClass('connectable');

		Canvon('#svg_canvas .view-keephover').removeClass('view-keephover');

		Canvon('#svg_canvas .view-show').removeClass('view-show');

		Canvon('#svg_canvas .connectable-port').removeClass('connectable-port');

		$('#overlayer').remove();

		$(document).off({
			'mousemove': MC.canvas.event.drawConnection.mousemove,
			'mouseup': MC.canvas.event.drawConnection.mouseup,
		});

		return false;
	}
};

MC.canvas.event.siderbarDrag = {
	mousedown: function (event)
	{
		if (event.which === 1)
		{
			var target = $(this),
				target_offset = target.offset(),
				svg_canvas = $('#svg_canvas'),
				canvas_offset = $canvas.offset(),
				target_type = target.data('type'),
				node_type = target.data('component-type'),

				drop_zone = $('#changeAmiDropZone'),
				drop_zone_offset,
				drop_zone_data,

				shadow,
				clone_node,
				default_width,
				default_height,
				target_group_type,
				size;

			if (target.data('enable') === false)
			{
				return false;
			}

			$(document.body).append('<div id="drag_shadow"></div><div id="overlayer" class="grabbing"></div>');
			shadow = $('#drag_shadow');

			if (node_type === 'group')
			{
				size = MC.canvas.GROUP_DEFAULT_SIZE[ target_type ];

				shadow.addClass(target_type.replace(/\./ig, '-'));
			}
			else
			{
				clone_node = target.find('.resource-icon').clone();
				shadow.append(clone_node);
				size = MC.canvas.COMPONENT_SIZE[ target_type ];
			}

			shadow
				.css({
					'top': event.pageY - 50,
					'left': event.pageX - 50,
					'width': size[0] * MC.canvas.GRID_WIDTH,
					'height': size[1] * MC.canvas.GRID_HEIGHT
				})
				.show();

			if (target_type === 'AWS.EC2.EBS.Volume')
			{
				if (MC.canvas.getState() === 'appedit')
				{
					Canvon('.AWS-EC2-Instance, .AWS-AutoScaling-LaunchConfiguration').addClass('attachable');
				}
				else
				{
					Canvon('.AWS-EC2-Instance, .AWS-AutoScaling-LaunchConfiguration').addClass('attachable');
				}

				shadow.addClass('AWS-EC2-EBS-Volume');

				$(document).on({
					'mousemove': MC.canvas.volume.mousemove,
					'mouseup': MC.canvas.volume.mouseup
				}, {
					'target': target,
					'canvas_offset': canvas_offset,
					'canvas_body': $('#canvas_body'),
					'shadow': shadow,
					'action': 'add'
				});
			}
			else
			{
				target_group_type = MC.canvas.MATCH_PLACEMENT[ target_type ];

				if (target_group_type)
				{
					Canvon('.' + target_group_type.join(',').replace(/\./ig, '-').replace(/,/ig, ',.')).addClass('dropable-group');
				}

				// For change AMI
				if (
					target_type === 'AWS.EC2.Instance' &&
					drop_zone.is(":visible")
				)
				{
					drop_zone_offset = drop_zone.offset();

					drop_zone_data = {
						'x1': drop_zone_offset.left,
						'x2': drop_zone_offset.left + drop_zone.width(),
						'y1': drop_zone_offset.top,
						'y2': drop_zone_offset.top + drop_zone.height()
					};
				}

				$(document).on({
					'mousemove': MC.canvas.event.siderbarDrag.mousemove,
					'mouseup': MC.canvas.event.siderbarDrag.mouseup
				}, {
					'target': target,
					'node_type': node_type,
					'canvas_offset': canvas_offset,
					'target_type': target_type,
					'shadow': shadow,
					'scale_ratio': $canvas.scale(),
					'component_size': node_type === 'node' ? MC.canvas.COMPONENT_SIZE[ target_type ] : MC.canvas.GROUP_DEFAULT_SIZE[ target_type ],
					'drop_zone': drop_zone,
					'drop_zone_data': drop_zone_data
				});
			}

			$('#canvas_body').addClass('node-dragging');
		}

		MC.canvas.volume.close();
		MC.canvas.event.clearSelected();

		return false;
	},

	mousemove: function (event)
	{
		var event_data = event.data,
			shadow = event_data.shadow[0],
			canvas_offset = event_data.canvas_offset,
			target_id = event_data.target[0].id,
			node_type = event_data.node_type,
			target_type = event_data.target_type,
			component_size = event_data.component_size,

			// MC.canvas.GRID_WIDTH
			grid_width = 10,

			// MC.canvas.GRID_HEIGHT
			grid_height = 10,

			scale_ratio = event_data.scale_ratio,
			coordinate = {
				'x': Math.round((event.pageX - canvas_offset.left - 50) / (grid_width / scale_ratio)),
				'y': Math.round((event.pageY - canvas_offset.top - 50) / (grid_height / scale_ratio))
			},
			match_place = MC.canvas.isMatchPlace(
				null,
				target_type,
				node_type,
				coordinate.x,
				coordinate.y,
				component_size[0],
				component_size[1]
			);

		Canvon('.match-dropable-group').removeClass('match-dropable-group');

		if (match_place.is_matched)
		{
			Canvon('#' + match_place.target).addClass('match-dropable-group');
		}

		// For change AMI hover effect
		if (event_data.drop_zone_data)
		{
			if (
				event.pageX > event_data.drop_zone_data.x1 &&
				event.pageX < event_data.drop_zone_data.x2 &&
				event.pageY > event_data.drop_zone_data.y1 &&
				event.pageY < event_data.drop_zone_data.y2
			)
			{
				event_data.drop_zone.addClass("hover");
			}
			else
			{
				event_data.drop_zone.removeClass("hover");
			}
		}

		shadow.style.top = (event.pageY - 50) + 'px';
		shadow.style.left = (event.pageX - 50) + 'px';

		return false;
	},

	mouseup: function (event)
	{
		$('#overlayer').remove();

		event.data.shadow.hide();

		// Change AMI event
		var elem = document.elementFromPoint(event.pageX, event.pageY);

		if (elem.id === 'changeAmiDropZone' || $(elem).parents('#changeAmiDropZone').length > 0)
		{
			$("#changeAmiDropZone")
				.removeClass("hover")
				.trigger("drop", $(event.data.target).data('option').imageId);

			event.data.shadow.remove();
		}
		else
		{
			event.data.shadow.show();

			if (!$('#canvas_body').hasClass('canvas_zoomed'))
			{
				var target = $(event.data.target),
					target_id = target.attr('id') || '',
					node_type = target.data('component-type'),
					target_type = target.data('type'),
					canvas_offset = $canvas.offset(),
					shadow_offset = event.data.shadow.position(),
					node_option = target.data('option') || {},
					coordinate = MC.canvas.pixelToGrid(shadow_offset.left - canvas_offset.left, shadow_offset.top - canvas_offset.top),
					component_size,
					match_place,
					default_group_size,
					new_node,
					vpc_id,
					vpc_item,
					vpc_coordinate,
					areaChild,
					new_node_id;

				if (coordinate.x > 0 && coordinate.y > 0)
				{
					if (node_type === 'node')
					{
						component_size = MC.canvas.COMPONENT_SIZE[ target_type ];

						if (target_type === 'AWS.VPC.InternetGateway' || target_type === 'AWS.VPC.VPNGateway')
						{
							vpc_id = $('.AWS-VPC-VPC').attr('id');
							vpc_item = $canvas( vpc_id );
							vpc_coordinate = vpc_item.position();
							vpc_size = vpc_item.size();

							node_option.groupUId = vpc_id;

							if (coordinate.y > vpc_coordinate[1] + vpc_size[1] - component_size[1])
							{
								coordinate.y = vpc_coordinate[1] + vpc_size[1] - component_size[1];
							}
							if (coordinate.y < vpc_coordinate[1])
							{
								coordinate.y = vpc_coordinate[1];
							}

							if (target_type === 'AWS.VPC.InternetGateway')
							{
								coordinate.x = vpc_coordinate[0] - (component_size[1] / 2);
							}
							if (target_type === 'AWS.VPC.VPNGateway')
							{
								coordinate.x = vpc_coordinate[0] + vpc_size[0] - (component_size[1] / 2);
							}

							$canvas.add(target_type, node_option, coordinate);
						}
						else
						{
							match_place = MC.canvas.isMatchPlace(
								null,
								target_type,
								node_type,
								coordinate.x,
								coordinate.y,
								component_size[0],
								component_size[1]
							);

							if (match_place.is_matched)
							{
								node_option.groupUId = match_place.target;

								new_node_id = $canvas.add(target_type, node_option, coordinate);

								if (new_node_id)
								{
									MC.canvas.select(new_node_id);

									// if (target_type === 'AWS.EC2.Instance')
									// {
									// 	MC.canvas.nodeAction.show(new_node_id);
									// }
								}
							}
							else
							{
								// dispatch event when is not matched
								$canvas.trigger("CANVAS_PLACE_NOT_MATCH", {
									'type': target_type
								});
							}
						}
					}

					if (node_type === 'group')
					{
						default_group_size = MC.canvas.GROUP_DEFAULT_SIZE[ target_type ];

						// Move a little bit offset for Subnet because its port
						if (target_type === 'AWS.VPC.Subnet')
						{
							//coordinate.x -= 1;
						}

						match_place = MC.canvas.isMatchPlace(
							null,
							target_type,
							node_type,
							coordinate.x,
							coordinate.y,
							default_group_size[0],
							default_group_size[1]
						),
						areaChild = MC.canvas.areaChild(
							null,
							target_type,
							coordinate.x,
							coordinate.y,
							coordinate.x + default_group_size[0],
							coordinate.y + default_group_size[1]
						);

						if (
							match_place.is_matched
						)
						{
							if (
								MC.canvas.isBlank(
									target_id,
									target_type,
									'group',
									// Enlarge a little bit to make the drop place correctly.
									coordinate.x - 1,
									coordinate.y - 1,
									default_group_size[0] + 2,
									default_group_size[1] + 2
								) && areaChild.length === 0
							)
							{
								node_option.groupUId = match_place.target;

								new_node_id = $canvas.add(target_type, node_option, coordinate);

								if (!($canvas.hasVPC() && target_type === "AWS.EC2.AvailabilityZone"))
								{
									//has no vpc
									MC.canvas.select(new_node_id);
								}
							}
							else
							{
								// dispatch event when is not blank
								$canvas.trigger("CANVAS_PLACE_OVERLAP");
							}
						}
						else
						{
							// dispatch event when is not matched
							$canvas.trigger("CANVAS_PLACE_NOT_MATCH", {
								type: target_type
							});
						}
					}
				}

				if (target_type === 'AWS.VPC.InternetGateway' || target_type === 'AWS.VPC.VPNGateway')
				{
					event.data.shadow.show().animate({
						'left': coordinate.x * MC.canvas.GRID_WIDTH + canvas_offset.left,
						'top': coordinate.y * MC.canvas.GRID_HEIGHT + canvas_offset.top,
						'opacity': 0
					}, function ()
					{
						event.data.shadow.remove();
					});
				}
				else
				{
					event.data.shadow.remove();
				}
			}
			else
			{
				$canvas.trigger("CANVAS_ZOOMED_DROP_ERROR");

				event.data.shadow.remove();
			}
		}

		Canvon('.dropable-group').removeClass('dropable-group');

		Canvon('.match-dropable-group').removeClass('match-dropable-group');

		$('#canvas_body').removeClass('node-dragging');

		$(document).off({
			'mousemove': MC.canvas.event.mousemove,
			'mouseup': MC.canvas.event.mouseup
		});
	}
};

MC.canvas.event.groupResize = {
	mousedown: function (event)
	{
		if (event.which === 1)
		{
			var target = event.target,
				parent = $(target.parentNode.parentNode),
				parent_item = $canvas(parent.attr('id')),
				group = parent.find('.group'),
				group_offset = group[0].getBoundingClientRect(),
				canvas_offset = $canvas.offset(),
				scale_ratio = $canvas.scale(),
				grid_width = MC.canvas.GRID_WIDTH,
				grid_height = MC.canvas.GRID_HEIGHT,
				group_left = (group_offset.left - canvas_offset.left) * scale_ratio,
				group_top = (group_offset.top - canvas_offset.top) * scale_ratio,
				type = parent_item.type,
				line_layer = document.getElementById('line_layer');

			if (type === 'AWS.VPC.Subnet')
			{
				// Re-draw group connection
				$.each(parent_item.connection(), function (i, value)
				{
					line_layer.removeChild(document.getElementById( value.line ));
				});
			}

			// Hide label
			parent.find('.group-label, .port').hide();

			$(document.body).append('<div id="overlayer" style="cursor: ' + $(event.target).css('cursor') + '"></div>');

			$(document)
				.on({
					'mousemove': MC.canvas.event.groupResize.mousemove,
					'mouseup': MC.canvas.event.groupResize.mouseup
				}, {
					'parent': parent,
					'resizer': target,
					//'group_title': parent.find('.group-label'),
					'target': group,
					'originalTarget': group[0],
					'group_child': MC.canvas.groupChild(target.parentNode.parentNode),
					'originalX': event.pageX,
					'originalY': event.pageY,
					'originalWidth': group_offset.width,
					'originalHeight': group_offset.height,
					'originalTop': group_offset.top,
					'originalLeft': group_offset.left,
					'originalTranslate': parent.attr('transform'),
					'canvas_offset': canvas_offset,
					'offsetX': event.pageX - canvas_offset.left,
					'offsetY': event.pageY - canvas_offset.top,
					'direction': $(target).data('direction'),
					'group_type': type,
					'scale_ratio': scale_ratio,
					'group_min_padding': MC.canvas.GROUP_MIN_PADDING,
					'parentGroup': MC.canvas.parentGroup(
						parent.attr('id'),
						type,
						Math.ceil(group_left / grid_width),
						Math.ceil(group_top / grid_height),
						Math.ceil((group_offset.left + group_offset.width) / grid_width),
						Math.ceil((group_offset.top + group_offset.height) / grid_height)
					),
					'group_port': type === 'AWS.VPC.Subnet' ? [
						parent.find('.port-subnet-assoc-in').first(),
						parent.find('.port-subnet-assoc-out').first()
					] : null
				});
		}

		return false;
	},
	mousemove: function (event)
	{
		var event_data = event.data,
			target = event_data.originalTarget,
			direction = event_data.direction,
			//type = event_data.group_type,
			scale_ratio = event_data.scale_ratio,
			group_min_padding = event_data.group_min_padding,
			left = Math.ceil((event.pageX - event_data.originalLeft) / 10) * 10 * scale_ratio,
			max_left = event_data.originalWidth * scale_ratio - group_min_padding,
			top = Math.ceil((event.pageY - event_data.originalTop) / 10) * 10 * scale_ratio,
			max_top = event_data.originalHeight * scale_ratio - group_min_padding,
			prop,
			key;

		switch (direction)
		{
			case 'topleft':
				prop = {
					'y': top > max_top ? max_top : top,
					'x': left > max_left ? max_left : left,
					'width': event_data.originalWidth * scale_ratio - left,
					'height': event_data.originalHeight * scale_ratio - top
				};
				break;

			case 'topright':
				prop = {
					'y': top > max_top ? max_top : top,
					'width': Math.round((event_data.originalWidth + event.pageX - event_data.originalX) / 10) * 10 * scale_ratio,
					'height': event_data.originalHeight * scale_ratio - top
				};
				break;

			case 'bottomleft':
				prop = {
					'x': left > max_left ? max_left : left,
					'width': event_data.originalWidth * scale_ratio - left,
					'height': Math.round((event_data.originalHeight + event.pageY - event_data.originalY) / 10) * 10 * scale_ratio
				};
				break;

			case 'bottomright':
				prop = {
					'width': Math.round((event_data.originalWidth + event.pageX - event_data.originalX) / 10) * 10 * scale_ratio,
					'height': Math.round((event_data.originalHeight + event.pageY - event_data.originalY) / 10) * 10 * scale_ratio
				};
				break;

			case 'top':
				prop = {
					'y': top > max_top ? max_top : top,
					'height': event_data.originalHeight * scale_ratio - top
				};
				break;

			case 'right':
				prop = {
					'width': Math.round((event_data.originalWidth + event.pageX - event_data.originalX) / 10) * 10 * scale_ratio
				};
				break;

			case 'bottom':
				prop = {
					'height': Math.round((event_data.originalHeight + event.pageY - event_data.originalY) / 10) * 10 * scale_ratio
				};
				break;

			case 'left':
				prop = {
					'x': left > max_left ? max_left : left,
					'width': event_data.originalWidth * scale_ratio - left
				};
				break;
		}

		if (prop.width !== undefined && prop.width < group_min_padding)
		{
			prop.width = group_min_padding;
		}

		if (prop.height !== undefined && prop.height < group_min_padding)
		{
			prop.height = group_min_padding;
		}

		// Using baseVal for best performance
		for (key in prop)
		{
			target[ key ].baseVal.value = prop[ key ];
		}

		return false;
	},
	mouseup: function (event)
	{
		var event_data = event.data,
			parent = event_data.parent,
			target = event_data.target,
			originalTarget = target[0],
			type = event_data.group_type,
			//group_title = event_data.group_title,
			direction = event_data.direction,
			parent_offset = parent[0].getBoundingClientRect(),
			canvas_offset = event_data.canvas_offset,
			scale_ratio = $canvas.scale(),
			grid_width = MC.canvas.GRID_WIDTH,
			grid_height = MC.canvas.GRID_HEIGHT,
			offsetX = originalTarget.x.baseVal.value,// target.attr('x') * 1,
			offsetY = originalTarget.y.baseVal.value,//target.attr('y') * 1,
			group_id = parent.attr('id'),

			group_width = Math.round(originalTarget.width.baseVal.value / grid_width),
			group_height = Math.round(originalTarget.height.baseVal.value / grid_height),
			group_left = Math.round(((parent_offset.left - canvas_offset.left) * scale_ratio + offsetX) / grid_width),
			group_top = Math.round(((parent_offset.top - canvas_offset.top) * scale_ratio + offsetY) / grid_height),

			canvas_size = $canvas.size(),
			node_minX = [],
			node_minY = [],
			node_maxX = [],
			node_maxY = [],

			group_padding = MC.canvas.GROUP_PADDING,
			parentGroup = event_data.parentGroup,
			group_node,
			group_coordinate,
			layout_connection_data,
			parent_data,
			parent_size,
			parent_coordinate,
			item_data,
			item_coordinate,
			item_size,
			group_maxX,
			group_maxY,
			group_minX,
			group_minY,

			igw_gateway,
			igw_gateway_id,
			igw_gateway_data,
			igw_top,

			vgw_gateway,
			vgw_gateway_id,
			vgw_gateway_data,
			vgw_top,

			port_top,
			line_connection;

		// adjust group_left
		if (offsetX < 0)
		{
			// when resize by left,topleft, bottomleft
			group_left = Math.round((parent_offset.left - canvas_offset.left) * scale_ratio / grid_width);
		}

		// adjust group_top
		if (
			direction === 'top' ||
			direction === 'topleft' ||
			direction === 'topright'
		)
		{
			if (offsetY < 0)
			{
				group_top = Math.round((parent_offset.top - canvas_offset.top) * scale_ratio / grid_height);
			}
			else if (offsetY > 0)
			{
				group_top = Math.round(((parent_offset.top - canvas_offset.top)  * scale_ratio + offsetY) / grid_width);
			}
		}

		$.each(event_data.group_child, function (index, item)
		{
			item = $canvas( item.id );

			item_size = item.size();
			item_coordinate = item.position();

			node_minX.push(item_coordinate[0]);
			node_minY.push(item_coordinate[1]);
			node_maxX.push(item_coordinate[0] + item_size[0]);
			node_maxY.push(item_coordinate[1] + item_size[1]);
		});

		group_maxX = Math.max.apply(Math, node_maxX) + group_padding;
		group_maxY = Math.max.apply(Math, node_maxY) + group_padding;
		group_minX = Math.min.apply(Math, node_minX) - group_padding;
		group_minY = Math.min.apply(Math, node_minY) - group_padding;

		switch (direction)
		{
			case 'topleft':
				if (group_left >= group_minX)
				{
					group_width += (group_left - group_minX);
					group_left = group_minX;
				}

				if (group_top >= group_minY)
				{
					group_height += (group_top - group_minY);
					group_top = group_minY;
				}
				break;

			case 'topright':
				group_width = group_width + group_left >= group_maxX ? group_width : group_maxX - group_left;

				if (group_top >= group_minY)
				{
					group_height += (group_top - group_minY);
					group_top = group_minY;
				}
				break;

			case 'bottomleft':
				if (group_left >= group_minX)
				{
					group_width += (group_left - group_minX);
					group_left = group_minX;
				}

				group_height = group_height + group_top >= group_maxY ? group_height : group_maxY - group_top;
				break;

			case 'bottomright':
				group_width = group_width + group_left >= group_maxX ? group_width : group_maxX - group_left;
				group_height = group_height + group_top >= group_maxY ? group_height : group_maxY - group_top;
				break;

			case 'top':
				if (group_top >= group_minY)
				{
					group_height += (group_top - group_minY);
					group_top = group_minY;
				}
				break;

			case 'right':
				group_width = group_width + group_left >= group_maxX ? group_width : group_maxX - group_left;
				break;

			case 'bottom':
				group_height = group_height + group_top >= group_maxY ? group_height : group_maxY - group_top;
				break;

			case 'left':
				if (group_left >= group_minX)
				{
					group_width += (group_left - group_minX);
					group_left = group_minX;
				}
				break;
		}

		if (parentGroup)
		{
			parent_data = $canvas( parentGroup.id );
			parent_size = parent_data.size();
			parent_coordinate = parent_data.position();

			if (group_left < parent_coordinate[0] + group_padding)
			{
				group_width = group_left + group_width - parent_coordinate[0] - group_padding;
				group_left = parent_coordinate[0] + group_padding;
			}

			if (group_top < parent_coordinate[1] + group_padding)
			{
				group_height = group_top + group_height - parent_coordinate[1] - group_padding;
				group_top = parent_coordinate[1] + group_padding;
			}

			if (group_width + group_left > parent_coordinate[0] + parent_size[0] - group_padding)
			{
				group_width = parent_coordinate[0] + parent_size[0] - group_padding - group_left;
			}

			if (group_height + group_top > parent_coordinate[1] + parent_size[1] - group_padding)
			{
				group_height = parent_coordinate[1] + parent_size[1] - group_padding - group_top;
			}
		}

		// Top coordinate fix
		if (type === 'AWS.VPC.VPC')
		{
			if (group_top <= 3)
			{
				group_height = group_height + group_top - 3;
				group_top = 3;
			}

			if (group_left <= 5)
			{
				group_width = group_width + group_left - 5;
				group_left = 5;
			}
		}
		else
		{
			if (group_top <= 2)
			{
				group_height = group_height + group_top - 2;
				group_top = 2;
			}

			if (group_left <= 2)
			{
				group_width = group_width + group_left - 2;
				group_left = 2;
			}
		}

		if (
			group_width > group_padding &&
			group_height > group_padding &&

			event_data.group_child.length === MC.canvas.areaChild(
				group_id,
				type,
				group_left,
				group_top,
				group_left + group_width,
				group_top + group_height
			).length &&

			// canvas right offset = 3
			group_left + group_width < canvas_size[0] - 3 &&
			group_top + group_height < canvas_size[1] - 3
		)
		{
			if (type === 'AWS.VPC.VPC')
			{
				igw_gateway = $('.AWS-VPC-InternetGateway');
				vgw_gateway = $('.AWS-VPC-VPNGateway');

				if (igw_gateway[0])
				{
					igw_item = $canvas(igw_gateway[0].id);

					igw_top = igw_item.position()[1];

					if (igw_top > group_top + group_height - 8)
					{
						igw_top = group_top + group_height - 8;
					}

					if (igw_top < group_top)
					{
						igw_top = group_top;
					}

					// MC.canvas.COMPONENT_SIZE[0] / 2 = 4
					igw_item.position(group_left - 4, igw_top);

					igw_item.reConnect();
				}

				if (vgw_gateway[0])
				{
					vgw_item = $canvas(vgw_gateway[0].id);

					vgw_top = vgw_item.position()[1];

					if (vgw_top > group_top + group_height - 8)
					{
						vgw_top = group_top + group_height - 8;
					}

					if (vgw_top < group_top)
					{
						vgw_top = group_top;
					}

					// MC.canvas.COMPONENT_SIZE[0] / 2 = 4
					vgw_item.position(group_left + group_width - 4, vgw_top);

					vgw_item.reConnect();
				}
			}

			// parent.attr('transform',
			// 	'translate(' +
			// 		group_left * 10 + ',' +
			// 		group_top * 10 +
			// 	')'
			// );

			// target.attr({
			// 	'x': 0,
			// 	'y': 0,
			// 	'width': group_width * 10,
			// 	'height': group_height * 10
			// });

			// group_title.attr({
			// 	'x': label_coordinate[0],
			// 	'y': label_coordinate[1]
			// });

			group_node = $canvas( group_id );

			group_node.position(group_left, group_top);
			group_node.size(group_width, group_height);

			MC.canvas.updateResizer(parent, group_width, group_height);
		}
		else
		{
			group_width = Math.round(event_data.originalWidth * scale_ratio / 10);
			group_height = Math.round(event_data.originalHeight * scale_ratio / 10);

			group_node = $canvas( group_id );
			group_coordinate = group_node.position();

			// if (type === 'AWS.VPC.Subnet')
			// {
			// 	event_data.group_port[0].show();
			// 	event_data.group_port[1].show();
			// }

			group_node.position(group_coordinate[0], group_coordinate[1]);
			group_node.size(group_width, group_height);

			//parent.attr('transform', event_data.originalTranslate);

			// target.attr({
			// 	'x': 0,
			// 	'y': 0,
			// 	'width': event_data.originalWidth * scale_ratio,
			// 	'height': event_data.originalHeight * scale_ratio
			// });

			//group_node.reConnect();

			MC.canvas.updateResizer(parent, group_width, group_height);
		}

		parent.find('.group-label, .port').show();

		if (type === 'AWS.VPC.Subnet')
		{
			port_top = (group_height * MC.canvas.GRID_HEIGHT / 2) - 5;

			event_data.group_port[0].attr('transform', 'translate(-12, ' + port_top + ')');

			event_data.group_port[1].attr('transform', 'translate(' + (group_width * MC.canvas.GRID_WIDTH + 10) + ', ' + port_top + ')');

			//group_node.reConnect();
		}

		group_node.reConnect();

		$('#overlayer').remove();

		$(document)
			.off({
				'mousemove': MC.canvas.event.groupResize.mousemove,
				'mouseup': MC.canvas.event.groupResize.mouseup
			});
	}
};

MC.canvas.event.ctrlMove = {
	mousedown: function (event)
	{
		if (
			event.which === 1 &&
			(event.ctrlKey || event.metaKey)
		)
		{
			event.stopImmediatePropagation();

			var canvas_offset = $canvas.offset(),
				canvas = $('#canvas'),
				scroll_content = canvas.find('.scroll-content').first()[0];

			$(document).on({
				'mousemove': MC.canvas.event.ctrlMove.mousemove,
				'mouseup': MC.canvas.event.ctrlMove.mouseup
			}, {
				'canvas': canvas,
				'offsetX': event.pageX,
				'offsetY': event.pageY,
				'originalCoordinate': {
					'left': scroll_content.realScrollLeft ? scroll_content.realScrollLeft : 0,
					'top': scroll_content.realScrollTop ? scroll_content.realScrollTop : 0
				}
			});

			$(document.body).append('<div id="overlayer" class="grabbing"></div>');

			return false;
		}
	},

	mousemove: function (event)
	{
		var event_data = event.data;

		scrollbar.scrollTo(event_data.canvas, {
			'left': event_data.offsetX - event.pageX - event_data.originalCoordinate.left,
			'top': event_data.offsetY - event.pageY - event_data.originalCoordinate.top
		});

		return false;
	},

	mouseup: function ()
	{
		$('#overlayer').remove();

		$(document).off({
			'mousemove': MC.canvas.event.ctrlMove.mousemove,
			'mouseup': MC.canvas.event.ctrlMove.mouseup
		});

		return false;
	}
};

MC.canvas.event.selectLine = function (event)
{
	if (event.which === 1)
	{
		MC.canvas.event.clearSelected();

		$canvas(this.id).select();
	}

	return false;
};

MC.canvas.event.selectNode = function (event)
{
	if (event.which === 1)
	{
		// Double click event
		if (MC.canvas.event.dblclick(function ()
		{
			$canvas.trigger('SHOW_PROPERTY_PANEL');
		}))
		{
			return false;
		}

		MC.canvas.event.clearSelected();

		$canvas(this.id).select();
		// MC.canvas.nodeAction.show(this.id);
	}

	return false;
};


MC.canvas.event.appDrawConnection = function ()
{
	MC.canvas.event.drawConnection.mousedown.call( this, event );

	return false;
};

MC.canvas.event.clearList = function (event)
{
	MC.canvas.instanceList.close();
	MC.canvas.eniList.close();
	MC.canvas.asgList.close();
	MC.canvas.event.clearSelected(event);

	return true;
};

MC.canvas.event.nodeHover = function (event)
{
	var connection = $canvas(this.id).connection(),
		stack = [],
		length = connection.length;

	while ( length-- )
	{
		stack[ length ] = '#' + connection[ length ].line;
	}

	Canvon( stack.join(',') )[ event.type === 'mouseenter' ? 'addClass' : 'removeClass' ]( 'view-hover' );

	return true;
};

MC.canvas.event.clearSelected = function (event)
{
	// Except for tab switching
	if (event && $(event.currentTarget).is('#tab-bar li'))
	{
		return false;
	}

	Canvon('#svg_canvas .selected').removeClass('selected');

	Canvon('#svg_canvas .view-show').removeClass('view-show');

	$('#node-action-wrap').remove();

	// Empty selected_node
	$canvas.selected_node().length = 0;

	return true;
};

MC.canvas.event.clickBlank = function (event)
{
	if (event.target.id === 'svg_canvas')
	{
		//dispatch event when click blank area in canvas
		$canvas.trigger("CANVAS_NODE_SELECTED", "");
	}

	return true;
};

MC.canvas.event.keyEvent = function (event)
{
	var canvas_status = MC.canvas.getState(),
		selected_node = $canvas.selected_node();

	if (
		$('#modal-wrap')[0] !== undefined ||
		($('.sub-stateeditor').css('display') === "block" && (event.which !== 46 && event.which !== 8)) ||
		Tabbar.current === 'dashboard'
	)
	{
		return true;
	}

	if (
		$.inArray(canvas_status, [
			'new',
			'app',
			'stack',
			'appedit',
			'appview'
		]) > -1
	)
	{
		var keyCode = event.which,
			nodeName = event.target.nodeName.toLowerCase();

		// Disable key event for input & textarea
		if (
			nodeName === 'input' ||
			nodeName === 'textarea' ||
			event.target.contentEditable === 'true'
		)
		{
			return true;
		}

		// Delete resource - [delete/backspace]
		if (
			(
				keyCode === 46 ||
				// For Mac
				keyCode === 8
			) &&
			(
				canvas_status === 'stack' ||
				canvas_status === 'appedit'
			) &&
			selected_node.length > 0// &&
			//event.target === document.body
		)
		{
			if (event.ctrlKey || event.metaKey) {
				return true;
			}

			MC.canvas.volume.close();
			$.each(selected_node, function (index, id)
			{
				$canvas( id ).remove();
			});

			// selected_node.length = 0;

			return false;
		}


		// Disable backspace
		if (
			keyCode === 8 &&
			nodeName !== 'input' &&
			nodeName !== 'textarea'
		)
		{
			return false;
		}

		// Switch node - [tab]
		if (
			keyCode === 9 &&
			selected_node.length === 1
		)
		{
			var 	current_node_id = selected_node[ 0 ],
				//selected_node = $('#' + current_node_id),
				//layout_node_data = $canvas.node(),
				node_stack = [],
				index = 0,
				current_index,
				next_node,
				next_id,
				next_item;

			if ($canvas(current_node_id).nodeType !== 'node')
			{
				return false;
			}

			$.each($canvas.node(), function (index, item)
			{
				if (item.id === current_node_id)
				{
					current_index = index;
				}

				node_stack.push(item.id);

				index++;
			});

			if (current_index === node_stack.length - 1)
			{
				current_index = 0;
			}
			else
			{
				current_index++;
			}

			MC.canvas.event.clearSelected();

			next_id = $('#' + node_stack[ current_index ]).attr('id');

			next_item = $canvas(next_id);

			next_item.select();

			// if (
			// 	next_item.type === 'AWS.EC2.Instance' ||
			// 	next_item.type === 'AWS.AutoScaling.LaunchConfiguration'
			// )
			// {
			// 	MC.canvas.nodeAction.show(next_id);
			// }

			return false;
		}

		// Move node - [up, down, left, right]
		if (
			$.inArray(keyCode, [37, 38, 39, 40]) > -1 &&
			(
				canvas_status === 'stack' ||
				canvas_status === 'appedit' ||
				canvas_status === 'appview'
			) &&
			selected_node.length === 1 &&
			$('#' + selected_node[ 0 ]).data('type') !== 'line'
		)
		{
			var target = $('#' + selected_node[ 0 ]),
				target_id = selected_node[ 0 ],
				target_item = $canvas(target_id),
				node_type = target_item.nodeType,
				target_type = target_item.type,
				coordinate = target_item.position(),
				canvas_size = $canvas.size(),
				scale_ratio = $canvas.scale(),
				coordinate = {'x': coordinate[0], 'y': coordinate[1]},
				component_size = target_item.size(),
				match_place,
				vpc_id,
				vpc_item,
				vpc_size,
				vpc_coordinate;

			if (node_type !== 'node')
			{
				return false;
			}

			if (keyCode === 38)
			{
				coordinate.y--;
			}

			if (keyCode === 40)
			{
				coordinate.y++;
			}

			if (target_type === 'AWS.VPC.InternetGateway' || target_type === 'AWS.VPC.VPNGateway')
			{
				match_place = {};

				vpc_id = $('.AWS-VPC-VPC').attr('id');
				vpc_item = $canvas(vpc_id);
				vpc_coordinate = vpc_item.position();
				vpc_size = vpc_item.size();

				match_place.is_matched =
					coordinate.y <= vpc_coordinate[1] + vpc_size[1] - component_size[1] &&
					coordinate.y >= vpc_coordinate[1];
			}
			else
			{
				if (keyCode === 37)
				{
					coordinate.x--;
				}

				if (keyCode === 39)
				{
					coordinate.x++;
				}

				match_place = MC.canvas.isMatchPlace(
					target_id,
					target_type,
					node_type,
					coordinate.x,
					coordinate.y,
					component_size[0],
					component_size[1]
				);
			}

			if (
				coordinate.x > 0 &&
				coordinate.y > 0 &&
				match_place.is_matched &&

				coordinate.x + component_size[0] < canvas_size[0] - 3 &&
				coordinate.y + component_size[1] < canvas_size[1] - 3
			)
			{
				target_item.position(coordinate.x, coordinate.y);

				target_item.reConnect();
			}

			// if (
			// 	target_type === 'AWS.EC2.Instance' &&
			// 	$('#node-action-wrap').data('id') === target_id
			// )
			// {
			// 	MC.canvas.nodeAction.position(target_id);
			// }

			return false;
		}

		// Save stack - [Ctrl + S]
		if (
			(event.ctrlKey || event.metaKey) && keyCode === 83 &&
			canvas_status === 'stack'
		)
		{
			$canvas.trigger("CANVAS_SAVE");

			return false;
		}

		// ZoomIn - [Ctrl + +]
		if (
			(event.ctrlKey || event.metaKey) && keyCode === 187
		)
		{
			MC.canvas.zoomIn();

			return false;
		}

		// ZoomIn - [Ctrl + -]
		if (
			(event.ctrlKey || event.metaKey) && keyCode === 189
		)
		{
			MC.canvas.zoomOut();

			return false;
		}

		// Open state editor - [Enter]
		if (
			keyCode === 13 &&
			MC.canvas.getState() !== "appview"
		)
		{
			var type = $canvas( $canvas.selected_node()[ 0 ] ).type;

			if (
				type === 'AWS.EC2.Instance' ||
				type === 'AWS.AutoScaling.LaunchConfiguration'
			)
			{
				$canvas.trigger("SHOW_STATE_EDITOR", $canvas.selected_node()[ 0 ]);
			}

			return false;
		}

		// Show state editor - [S]
		if (
			keyCode === 83 &&
			selected_node.length === 1 &&
			MC.canvas.getState() !== "appview"
		)
		{
			var type = $canvas( $canvas.selected_node()[ 0 ] ).type;

			if (
				type === 'AWS.EC2.Instance' ||
				type === 'AWS.AutoScaling.LaunchConfiguration'
			)
			{
				$canvas.trigger("SHOW_STATE_EDITOR", $canvas.selected_node()[ 0 ]);
			}

			return false;
		}

		// Focus property input - [P]
		if (
			keyCode === 80
		)
		{
			$canvas.trigger('SHOW_PROPERTY_PANEL');
			return false;
		}
	}
};

MC.canvas.analysis = function ()
{
	var
		// component_data = data.component,
		// layout_data = data.layout,
		connection_data = $canvas.connection(),

		resources = {},
		resource_stack = {},

		elb_child_stack = [],
		elb_connection,

		GROUP_INNER_PADDING = 2,
		GROUP_MARGIN = 2,

		VPC_PADDING_LEFT = 20,
		VPC_PADDING_TOP = 10,
		VPC_PADDING_RIGHT = 8,
		VPC_PADDING_BOTTOM = 5,

		ELB_START_LEFT = 14,
		ELB_SIZE = MC.canvas.COMPONENT_SIZE['AWS.ELB'],

		// Initialize group construction
		SUBGROUP = {
			'AWS.VPC.VPC': ['AWS.EC2.AvailabilityZone'],
			'AWS.EC2.AvailabilityZone': ['AWS.VPC.Subnet'],
			'AWS.VPC.Subnet': [
				'AWS.EC2.Instance',
				'AWS.AutoScaling.Group',
				'AWS.VPC.NetworkInterface'
			],
			'AWS.AutoScaling.Group': ['AWS.AutoScaling.LaunchConfiguration']
		},

		SORT_ORDER = {
			'AWS.AutoScaling.Group': 1,
			'AWS.EC2.Instance': 2,
			'AWS.VPC.NetworkInterface': 3
		},

		GROUP_DEFAULT_SIZE = {
			'AWS.VPC.VPC': [60, 60],
			'AWS.EC2.AvailabilityZone': [17, 17],
			'AWS.VPC.Subnet': [15, 15],
			'AWS.AutoScaling.Group' : [13, 13]
		},

		// For children node order
		POSITION_METHOD = {
			'AWS.VPC.VPC': 'vertical',
			'AWS.EC2.AvailabilityZone': 'horizontal',
			'AWS.VPC.Subnet': 'matrix',
			'AWS.AutoScaling.Group': 'center'
		},

		layout,
		previous_node;

	$.each($canvas.node(), function (index, item)
	{
		resources[ item.id ] = item;
	});

	$.each($canvas.group(), function (index, item)
	{
		resources[ item.id ] = item;
	});

	$.each(resources, function (key, value)
	{
		var type = value.type,
			stack = resource_stack[ type ];

		if (stack === undefined)
		{
			resource_stack[ type ] = [];
		}

		resource_stack[ type ].push(key);
	});

	layout = {
		'id': resource_stack[ 'AWS.VPC.VPC' ][0],
		'coordinate': [5, 3],
		'size': [0, 0],
		'type': 'AWS.VPC.VPC'
	};

	// ELB connected children
	if (resource_stack[ 'AWS.ELB' ] !== undefined)
	{
		$.each(resource_stack[ 'AWS.ELB' ], function (current_index, id)
		{
			$.each($canvas( id ).connection(), function (i, item)
			{
				if (item.port === 'elb-sg-out')
				{
					elb_child_stack.push( item.target );
				}
			});
		});
	}

	function searchChild(id)
	{
		var children = [],
			target_group = SUBGROUP[ resources[ id ].type ],
			node_data,
			node_child;

		$.each(resources, function (key, value)
		{
			if (
				$.inArray(resources[ key ].type, target_group) > -1 &&
				value.parentId === id
			)
			{
				node_child = searchChild(key);

				node_data = {
					'id': key,
					'coordinate': [0, 0],
					'size': [0, 0],
					'type': value.type
				};

				if (MC.canvas.COMPONENT_SIZE[ value.type ] !== undefined)
				{
					node_data.size = MC.canvas.COMPONENT_SIZE[ value.type ];
				}

				if (GROUP_DEFAULT_SIZE[ value.type ] !== undefined)
				{
					node_data.size = GROUP_DEFAULT_SIZE[ value.type ];
				}

				if (node_child)
				{
					node_data[ 'children' ] = node_child;
				}

				children.push(node_data);
			}
		});

		return children.length < 1 ? false : children;
	}

	node_child = searchChild( resource_stack[ 'AWS.VPC.VPC' ][0] );

	if (node_child)
	{
		layout[ 'children' ] = node_child;
	}

	function checkChild(node)
	{
		if (node.children !== undefined)
		{
			var count = 0;

			$.each(node.children, function (i, item)
			{
				count += checkChild(item);
			});

			node.totalChild = count + node.children.length;

			if (node.type === 'AWS.VPC.Subnet')
			{
				node.hasELBConnected = false;

				$.each(node.children, function (i, item)
				{
					if ($.inArray(item.id, elb_child_stack) > -1)
					{
						node.hasELBConnected = true;
					}

					if (item.type === 'AWS.AutoScaling.Group')
					{
						if (
							item.children !== undefined &&
							$.inArray(item.children[ 0 ].id, elb_child_stack) > -1
						)
						{
							node.hasELBConnected = true;
						}
					}
				});
			}

			return node.children.length;
		}
		else
		{
			node.totalChild = 0;

			if (node.type === 'AWS.VPC.Subnet')
			{
				node.hasELBConnected = false;
			}

			return 0;
		}
	}

	checkChild( layout );

	function sortChild(node)
	{
		if (node.children !== undefined)
		{
			if (node.type === 'AWS.EC2.AvailabilityZone')
			{
				node.children.sort(function (a, b)
				{
					if (
						(a.hasELBConnected === true && b.hasELBConnected === true)
						||
						(a.hasELBConnected === false && b.hasELBConnected === false)
					)
					{
						return b.totalChild - a.totalChild;
					}
					else
					{
						if (
							a.hasELBConnected === true &&
							b.hasELBConnected === false
						)
						{
							return -1;
						}

						if (
							a.hasELBConnected === false &&
							b.hasELBConnected === true
						)
						{
							return 1;
						}
					}
				});
			}
			else
			{
				node.children.sort(function (a, b)
				{
					return b.totalChild - a.totalChild;
				});
			}

			$.each(node.children, function (i, item)
			{
				sortChild( item );
			});
		}
	}

	sortChild( layout );

	function positionSubnetChild(node)
	{
		var stack = {},
			children = node.children,
			length = children.length,
			method = POSITION_METHOD[ node.type ],
			max_width = 0,
			max_height = 0,

			NODE_MARGIN_LEFT = 2,
			NODE_MARGIN_TOP = 2,

			unique_row = {},
			noELBstack = [],

			elb_connected_instance = [],
			normal_instance = [],
			hasUniqueInstanceConnectedToELB = false,

			max_column = Math.ceil( Math.sqrt( length ) ),
			max_row = length === 0 ? 0 : Math.ceil( length / max_column ),
			column_index = 0,
			row_index = 0,

			node_connection,
			hasELBConnected,
			targetELB;

		children.sort(function (a, b)
		{
			return SORT_ORDER[ a.type ] - SORT_ORDER[ b.type ];
		});

		$.each(children, function (current_index, item)
		{
			hasELBConnected = false;
			targetELB = null;

			if (stack[ item.type ] === undefined)
			{
				stack[ item.type ] = [];
			}

			stack[ item.type ].push( item );

			// Check connection
			if (
				(
					item.type === 'AWS.AutoScaling.Group' ||
					item.type === 'AWS.EC2.Instance'
				) &&
				item.children !== undefined
			)
			{
				node_connection = resources[ item.children[ 0 ].id ].connection();
			}
			else
			{
				node_connection = resources[ item.id ].connection();
			}

			if (node_connection)
			{
				$.each(node_connection, function (i, data)
				{
					if (resources[ data.target ].type === 'AWS.ELB')
					{
						if (connection_data[ data.line ].target[ data.target ] === 'elb-sg-out')
						{
							hasELBConnected = true;
							targetELB = data.target;
						}
					}
				});

				if (hasELBConnected)
				{
					if (unique_row[ targetELB ] === undefined)
					{
						unique_row[ targetELB ] = [];
					}

					unique_row[ targetELB ].push( item );
				}
				else
				{
					if (item.type === 'AWS.AutoScaling.Group')
					{
						noELBstack.push( item );
					}
				}
			}
			else
			{
				if (item.type === 'AWS.AutoScaling.Group')
				{
					noELBstack.push( item );
				}
			}
		});

		var column_count = 0,
			row_width = 0,
			row_top = 0,
			left_padding = 0,
			row_index,

			// Range
			ASG_WIDTH = 15,
			ASG_HEIGHT = 15,
			INSTANCE_WIDTH = 11,
			INSTANCE_HEIGHT = 11;

		if (noELBstack.length > 0)
		{
			unique_row[ 'zz' ] = noELBstack;
		}

		$.each(unique_row, function (row, row_stack)
		{
			row_top = 0;

			row_stack.sort(function (a, b)
			{
				return SORT_ORDER[ a.type ] - SORT_ORDER[ b.type ];
			});

			$.each(row_stack, function (row_index, item)
			{
				if (item.type === 'AWS.AutoScaling.Group')
				{
					row_width = ASG_WIDTH;

					item.coordinate = [
						left_padding + 2,
						row_top + GROUP_INNER_PADDING
					];

					row_top += ASG_HEIGHT;

					if (item.children !== undefined)
					{
						positionChild( item );
					}
				}

				if (item.type === 'AWS.EC2.Instance')
				{
					row_width = row_width === ASG_WIDTH ? ASG_WIDTH : INSTANCE_WIDTH;

					item.coordinate = [
						// Adjust instance x axis with ASG (+2)
						left_padding + (row_width === ASG_WIDTH ? 4 : 2),
						// Adjust instance y axis with ASG (+4)
						row_top + GROUP_INNER_PADDING
					];

					row_top += INSTANCE_HEIGHT;
				}
			});

			column_count++;

			left_padding += row_width;
		})

		if (stack[ 'AWS.EC2.Instance' ] !== undefined)
		{
			$.each(stack[ 'AWS.EC2.Instance' ], function (i, item)
			{
				if ($.inArray(item.id, elb_child_stack) === -1)
				{
					normal_instance.push( item );
				}
			});

			normal_instance.sort(function (a, b)
			{
				return $canvas( a.id ).getModel().attributes.name.localeCompare( $canvas( b.id ).getModel().attributes.name );
			});
		}

		if (normal_instance.length > 0)
		{
			var childLength = normal_instance.length,
				max_child_column = Math.ceil( Math.sqrt( childLength ) ),
				max_child_row = childLength === 0 ? 0 : Math.ceil( childLength / max_child_column ),
				column_index = 0,
				row_index = 0;

			$.each(normal_instance, function (i, item)
			{
				if (column_index >= max_child_column)
				{
					column_index = 0;
					row_index++;
				}

				item.coordinate = [
					column_index * 9 + (column_index * NODE_MARGIN_LEFT) + GROUP_INNER_PADDING,
					row_index * 9 + (row_index * NODE_MARGIN_LEFT) + GROUP_INNER_PADDING
				];

				column_index++;
			});

			$.each(normal_instance, function (i, item)
			{
				item.coordinate[0] += left_padding;
			});

			left_padding += max_child_column * INSTANCE_WIDTH;
		}

		if (stack[ 'AWS.VPC.NetworkInterface' ] !== undefined)
		{
			var childLength = stack[ 'AWS.VPC.NetworkInterface' ].length,
				max_child_column = Math.ceil( Math.sqrt( childLength ) ),
				max_child_row = childLength === 0 ? 0 : Math.ceil( childLength / max_child_column ),
				eni_padding = 0,
				column_index = 0,
				row_index = 0;

			$.each(stack[ 'AWS.VPC.NetworkInterface' ], function (i, item)
			{
				if (column_index >= max_child_column)
				{
					column_index = 0;
					row_index++;
				}

				item.coordinate = [
					column_index * 9 + (column_index * NODE_MARGIN_LEFT) + eni_padding + GROUP_INNER_PADDING,
					row_index * 9 + (row_index * NODE_MARGIN_LEFT) + GROUP_INNER_PADDING
				];

				column_index++;
			});
		}

		if (stack[ 'AWS.VPC.NetworkInterface' ] !== undefined)
		{
			$.each(stack[ 'AWS.VPC.NetworkInterface' ], function (i, item)
			{
				item.coordinate[0] += left_padding;
			});
		}

		var max_width = 0,
			max_height = 0,
			item_coordinate,
			component_size;

		$.each(children, function (i, item)
		{
			item_coordinate = item.coordinate;

			component_size = MC.canvas.COMPONENT_SIZE[ item.type ];

			if (item_coordinate[0] + component_size[0] > max_width)
			{
				max_width = item_coordinate[0] + component_size[0];
			}

			if (item_coordinate[1] + component_size[1] > max_height)
			{
				max_height = item_coordinate[1] + component_size[1];
			}
		});

		node.size = [
			max_width + GROUP_INNER_PADDING,
			max_height + GROUP_INNER_PADDING
		];
	}

	function sortSubnet( children )
	{
		var internetELBconnected = [],
			internalELBconnected = [],
			normalSubnet = [],

			isInternetELBconnected,
			isInternalELBconnected,

			//layout_component_data = MC.canvas_data.

			elb_type,
			item_connection;

		$.each(children, function (i, item)
		{
			isInternetELBconnected = false;
			isInternalELBconnected = false;

			if (item.children !== undefined)
			{
				$.each(item.children, function (index, node)
				{
					if (
						node.type === 'AWS.AutoScaling.Group' &&
						node.children !== undefined
					)
					{
						node = node.children[ 0 ];
					}

					node_connection = resources[ node.id ].connection();

					if (node_connection)
					{
						$.each(node_connection, function (index, data)
						{
							if (resources[ data.target ].type === 'AWS.ELB')
							{
								elb_type = $canvas( data.target ).getModel().attributes.internal ? 'internal' : 'internet-facing';

								if (elb_type === 'internet-facing')
								{
									isInternetELBconnected = true;
								}

								if (elb_type === 'internal')
								{
									isInternalELBconnected = true;
								}
							}
						});
					}
				});

				if (isInternetELBconnected)
				{
					internetELBconnected.push( item );
				}
				else if (isInternalELBconnected)
				{
					internalELBconnected.push( item );
				}
			}

			if (!isInternetELBconnected && !isInternalELBconnected)
			{
				normalSubnet.push( item );
			}
		});

		internetELBconnected.sort(function (a, b)
		{
			return b.totalChild - a.totalChild;
		});

		internetELBconnected.sort(function (a, b)
		{
			return b.totalChild - a.totalChild;
		});

		normalSubnet.sort(function (a, b)
		{
			if (
				b.totalChild === a.totalChild &&
				(
					b.totalChild > 0 &&
					a.totalChild > 0
				)
			)
			{
				var weight = {
						'a': 0,
						'b': 0
					};

				$.each({"a": a, "b": b}, function (key, value)
				{
					$.each(value.children, function (i, item)
					{
						if (item.type === 'AWS.AutoScaling.Group')
						{
							weight[ key ] += 3;
						}

						if (item.type === 'AWS.EC2.Instance')
						{
							weight[ key ] += 2;
						}

						if (item.type === 'AWS.VPC.NetworkInterface')
						{
							weight[ key ] += 1;
						}
					});
				});

				return weight.b - weight.a;
			}
			else
			{
				return b.totalChild - a.totalChild;
			}
		});

		children = internetELBconnected.concat(internalELBconnected, normalSubnet);

		return children;
	}

	function positionChild(node)
	{
		var children = node.children,
			GROUP_MARGIN = 2,

			length = children.length,
			method = POSITION_METHOD[ node.type ],
			max_width = 0,
			max_height = 0,

			NODE_MARGIN_LEFT = 2,
			NODE_MARGIN_TOP = 2;

		if (node.type === 'AWS.EC2.AvailabilityZone')
		{
			GROUP_MARGIN = 4;
		}

		if (method === 'matrix')
		{
			positionSubnetChild(node);
		}

		if (method === 'vertical')
		{
			$.each(children, function (current_index, item)
			{
				item.coordinate = [
					0 + GROUP_INNER_PADDING,
					current_index + GROUP_INNER_PADDING
				];

				if (item.children !== undefined)
				{
					positionChild( item );
				}

				if (item.size[0] > max_width)
				{
					max_width = item.size[0];
				}

				max_height += item.size[1];

				if (current_index > 0)
				{
					previous_node = children[ current_index - 1 ];
					item.coordinate = [
						0 + GROUP_INNER_PADDING,
						previous_node.size[1] + previous_node.coordinate[1] + GROUP_MARGIN
					];

					max_height += GROUP_MARGIN * 2;
				}
			});

			node.size = [
				max_width + (GROUP_INNER_PADDING * 2),
				max_height + (GROUP_MARGIN * (length - 1)) + GROUP_INNER_PADDING
			];
		}

		if (method === 'horizontal')
		{
			if (node.type === 'AWS.EC2.AvailabilityZone')
			{
				children = sortSubnet( children );
			}

			$.each(children, function (current_index, item)
			{
				item.coordinate = [
					current_index + GROUP_INNER_PADDING,
					0 + GROUP_INNER_PADDING
				];

				if (item.children !== undefined)
				{
					positionChild( item );
				}

				if (item.size[1] > max_height)
				{
					max_height = item.size[1];
				}

				max_width += item.size[0];

				if (current_index > 0)
				{
					previous_node = children[ current_index - 1 ];
					item.coordinate = [
						previous_node.size[0] + previous_node.coordinate[0] + GROUP_MARGIN,
						0 + GROUP_INNER_PADDING
					];

					max_width += GROUP_MARGIN * 2;
				}
			});

			node.size = [
				max_width - (GROUP_MARGIN * (length - 1)) + (GROUP_INNER_PADDING * 2),
				max_height + (GROUP_INNER_PADDING * 2)
			];
		}

		if (method === 'center')
		{
			$.each(children, function (current_index, item)
			{
				item.coordinate = [2, 2];
			});

			node.size = [13, 13];
		}
	}

	if (layout.children)
	{
		positionChild( layout );
	}

	// VPC padding
	if (layout.children)
	{
		$.each(layout.children, function (i, item)
		{
			item.coordinate[0] += VPC_PADDING_LEFT;
			item.coordinate[1] += VPC_PADDING_TOP;
		});
	}

	// RouteTable
	if (resource_stack[ 'AWS.VPC.RouteTable' ] !== undefined)
	{
		var ROUTE_TABLE_START_LEFT = 15,
			ROUTE_TABLE_START_TOP = 5,
			ROUTE_TABLE_MARGIN = 4,
			ROUTE_TABLE_SIZE = MC.canvas.COMPONENT_SIZE['AWS.VPC.RouteTable'],
			RT_to_IGW = [],
			RT_to_VGW = [],
			RT_other = [],
			RT_prefer,
			RT_connection,
			RT_connect_target;

		if (resource_stack[ 'AWS.VPC.RouteTable' ].length > 0)
		{
			resource_stack[ 'AWS.VPC.RouteTable' ].sort(function (a, b)
			{
				return $canvas( a ).getModel().attributes.name.localeCompare( $canvas( b ).getModel().attributes.name );
			});

			$.each(resource_stack[ 'AWS.VPC.RouteTable' ], function (index, id)
			{
				RT_prefer = false;
				RT_connection = $canvas( id ).connection();

				$.each(RT_connection, function (i, data)
				{
					if (data.port === 'rtb-tgt')
					{
						RT_connect_target = $canvas( data.target ).type;

						if (RT_connect_target === 'AWS.VPC.InternetGateway')
						{
							RT_prefer = true;
							RT_to_IGW.push( id );
						}

						if (RT_connect_target === 'AWS.VPC.VPNGateway')
						{
							RT_prefer = true;
							RT_to_VGW.push( id );
						}

					}
				});

				if (RT_prefer === false)
				{
					RT_other.push( id );
				}
			});

			// RT Children join
			resource_stack[ 'AWS.VPC.RouteTable' ] = _.unique( RT_to_IGW.concat(RT_to_VGW, RT_other) );

			$.each(resource_stack[ 'AWS.VPC.RouteTable' ], function (current_index, id)
			{
				$canvas( id ).position(
					(current_index + 1) * ROUTE_TABLE_SIZE[0] + ((current_index + 1) * ROUTE_TABLE_MARGIN) + ROUTE_TABLE_START_LEFT,
					ROUTE_TABLE_START_TOP
				);
			});
		}
	}

	// Add AZ margin for ELB
	var elb_stack = layout.children,
		max_first_height = 0;

	if (
		elb_stack !== undefined &&
		elb_stack.length > 1 &&
		resource_stack[ 'AWS.ELB' ] !== undefined
	)
	{
		// var i = 1,
		// 	l = elb_stack.length;

		// for ( ; i < l ; i++ )
		// {
		// 	elb_stack[ i ].coordinate[ 1 ] += 15;
		// }

		max_first_height = elb_stack[ 0 ].coordinate[ 1 ] + elb_stack[ 0 ].size[ 1 ];

		if (elb_stack[ 2 ])
		{
			if (elb_stack[ 2 ].size[ 1 ] > elb_stack[ 0 ].size[ 1 ])
			{
				elb_stack[ 2 ].coordinate = [
					elb_stack[ 0 ].coordinate[ 0 ] + elb_stack[ 0 ].size[ 0 ] + 5,
					elb_stack[ 0 ].coordinate[ 1 ]
				];

				elb_stack[ 0 ].coordinate = [
					elb_stack[ 0 ].coordinate[ 0 ],
					elb_stack[ 0 ].coordinate[ 1 ] + (elb_stack[ 2 ].size[ 1 ] - elb_stack[ 0 ].size[ 1 ]) / 2
				];

				max_first_height = elb_stack[ 2 ].coordinate[ 1 ] + elb_stack[ 2 ].size[ 1 ];
			}
			else
			{
				elb_stack[ 2 ].coordinate = [
					elb_stack[ 0 ].coordinate[ 0 ] + elb_stack[ 0 ].size[ 0 ] + 5,
					elb_stack[ 0 ].coordinate[ 1 ] + elb_stack[ 0 ].size[ 1 ] - elb_stack[ 2 ].size[ 1 ]
				];
			}
		}

		if (elb_stack[ 1 ])
		{
			elb_stack[ 1 ].coordinate[ 1 ] = max_first_height + 15;
		}

		if (elb_stack[ 3 ])
		{
			elb_stack[ 3 ].coordinate = [
				elb_stack[ 1 ].coordinate[ 0 ] + elb_stack[ 1 ].size[ 0 ] + 5,
				elb_stack[ 1 ].coordinate[ 1 ]
			];
		}
	}

	// ELB
	if (resource_stack[ 'AWS.ELB' ] !== undefined)
	{
		resource_stack[ 'AWS.ELB' ].sort(function (a, b)
		{
			a = $canvas( a ).getModel().attributes.internal ? 'internal' : 'internet-facing';
			b = $canvas( b ).getModel().attributes.internal ? 'internal' : 'internet-facing';

			return b.localeCompare( a );
		});

		if (elb_stack.length > 1)
		{
			$.each(resource_stack[ 'AWS.ELB' ], function (current_index, id)
			{
				$canvas( id ).position(
					ELB_START_LEFT + (current_index * 10) + (current_index * 10),
					max_first_height + 5
				);
			});
		}
		else
		{
			$.each(resource_stack[ 'AWS.ELB' ], function (current_index, id)
			{
				$canvas( id ).position(
					ELB_START_LEFT,
					elb_stack[ 0 ].coordinate[ 0 ] + (elb_stack[ 0 ].size[ 1 ] / 2 - 5) + current_index * 10
				);
			});
		}
	}

	function absPosition(node, x, y)
	{
		var coordinate = node.coordinate;

		coordinate[0] += x;
		coordinate[1] += y;

		if (node.children !== undefined)
		{
			$.each(node.children, function (i, item)
			{
				absPosition(item, coordinate[0], coordinate[1]);
			});
		}
	}

	absPosition( layout, 0, 0 );

	function updateLayoutData(node)
	{
		var resource = resources[ node.id ];

		$canvas( node.id ).position( node.coordinate[0], node.coordinate[1] );

		if (node.size !== undefined)
		{
			$canvas( node.id ).size( node.size[0], node.size[1] );
			//resource.size = node.size;
		}

		if (node.children !== undefined)
		{
			$.each(node.children, function (i, item)
			{
				updateLayoutData( item );
			});
		}
	}

	updateLayoutData( layout );

	function VPCsize()
	{
		var VPC_max_width = 0,
			VPC_max_height = 0,
			//layout_data = data.layout.component,
			ignore_type = ['AWS.VPC.CustomerGateway', 'AWS.VPC.InternetGateway', 'AWS.VPC.VPNGateway'],
			coordinate,
			size,
			group_size,
			item_type;

		$.each($canvas.node(), function (i, item)
		{
			coordinate = item.position();
			size = item.size();

			if ($.inArray(item.type, ignore_type) === -1)
			{
				//component_size = MC.canvas.COMPONENT_SIZE[ item.type ];

				if (coordinate[0] + size[0] > VPC_max_width)
				{
					VPC_max_width = coordinate[0] + size[0];
				}

				if (coordinate[1] + size[1] > VPC_max_height)
				{
					VPC_max_height = coordinate[1] + size[1];
				}
			}
		});

		$.each($canvas.group(), function (i, item)
		{
			coordinate = item.position();
			size = item.size();

			if (item.type !== 'AWS.AutoScaling.Group')
			{
				if (coordinate[0] + size[0] > VPC_max_width)
				{
					VPC_max_width = coordinate[0] + size[0];
				}

				if (coordinate[1] + size[1] > VPC_max_height)
				{
					VPC_max_height = coordinate[1] + size[1];
				}
			}
		});

		layout.size[0] = VPC_max_width - layout.coordinate[0] + VPC_PADDING_RIGHT;
		layout.size[1] = VPC_max_height - layout.coordinate[1] + VPC_PADDING_BOTTOM;

		$canvas( layout.id ).size(
			 VPC_max_width - layout.coordinate[0] + VPC_PADDING_RIGHT,
			 VPC_max_height - layout.coordinate[1] + VPC_PADDING_BOTTOM
		);
	}

	VPCsize();

	// IGW & VGW
	if (resource_stack[ 'AWS.VPC.InternetGateway' ] !== undefined)
	{
		$canvas( resource_stack[ 'AWS.VPC.InternetGateway' ][ 0 ] ).position(
			layout.coordinate[0] - 4,
			layout.coordinate[1] + (layout.size[1] / 2) - 4
		);
	}

	if (resource_stack[ 'AWS.VPC.VPNGateway' ] !== undefined)
	{
		$canvas( resource_stack[ 'AWS.VPC.VPNGateway' ][ 0 ] ).position(
			layout.coordinate[0] + layout.size[0] - 4,
			layout.coordinate[1] + (layout.size[1] / 2) - 4
		);
	}

	// CGW
	if (resource_stack[ 'AWS.VPC.CustomerGateway' ] !== undefined)
	{
		$.each(resource_stack[ 'AWS.VPC.CustomerGateway' ], function (i, item)
		{
			$canvas( item ).position(
				layout.coordinate[0] + layout.size[0] + 8,
				layout.coordinate[1] + (i * 11) + (layout.size[1] / 2) - 5
			);
		});
	}

	// Canvas size
	var canvas_width = layout.size[ 0 ] + 80,
		canvas_height = layout.size[ 1 ] + 50;

	$canvas.size(
		canvas_width < 180 ? 180 : canvas_width,
		canvas_height < 150 ? 150 : canvas_height
	);

	return true;
};

MC.canvas.benchmark = function (count)
{
	var NODE_MARGIN_LEFT = 2,
		NODE_MARGIN_TOP = 2,
		NODE_START_LEFT = 8,
		NODE_START_TOP = 8,
		GROUP_INNER_PADDING = 2,

		max_child_column = Math.ceil( Math.sqrt( count ) ),
		max_child_row = count === 0 ? 0 : Math.ceil( count / max_child_column ),
		scale_ratio = $canvas.scale(),
		column_index = 0,
		row_index = 0,
		i = 0;

	var AZ_id = $canvas.add("AWS.EC2.AvailabilityZone", {"name": "us-east-1a"}, {'x': 5, 'y': 5});

	for (; i < count; i++)
	{
		if (column_index >= max_child_column)
		{
			column_index = 0;
			row_index++;
		}

		$canvas.add(
			"AWS.EC2.Instance",
			{
				"imageId": "ami-cde4bca4",
				"cachedAmi" : {
					"osType": "amazon",
					"architecture": "i386",
					"rootDeviceType": "ebs"
				},
				"groupUId": AZ_id
			},
			{
				'x': NODE_START_LEFT + column_index * 9 + (column_index * NODE_MARGIN_LEFT) + GROUP_INNER_PADDING,
				'y': NODE_START_TOP + row_index * 9 + (row_index * NODE_MARGIN_TOP) + GROUP_INNER_PADDING
			}
		);

		column_index++;
	}

	$canvas(AZ_id).size((max_child_column * (9 + NODE_MARGIN_LEFT)) + 8, (max_child_row * (9 + NODE_MARGIN_TOP)) + 8);
	MC.canvas.updateResizer($('#' + AZ_id)[0], (max_child_column * (9 + NODE_MARGIN_LEFT)) + 8, (max_child_row * (9 + NODE_MARGIN_TOP)) + 8);

	canvas_size = [
		(max_child_column * (9 + NODE_MARGIN_LEFT)) + 50,
		(max_child_row * (9 + NODE_MARGIN_TOP)) + 50
	];

	$('#svg_canvas').attr({
		'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
		'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
	});

	$('#canvas_container, #canvas_body').css({
		'width': canvas_size[0] * MC.canvas.GRID_WIDTH / scale_ratio,
		'height': canvas_size[1] * MC.canvas.GRID_HEIGHT / scale_ratio
	});

	$canvas.size(canvas_size[0], canvas_size[1]);
};

});

define('MC.canvas.constant',[ 'i18n!nls/lang.js', "MC.canvas" ], function( lang ){

var constant_data = {

	GRID_WIDTH: 10,
	GRID_HEIGHT: 10,

	COMPONENT_SIZE:
	{
		'AWS.ELB': [9, 9],
		'AWS.EC2.Instance': [9, 9],
		'AWS.EC2.EBS.Volume': [10, 10],
		'AWS.VPC.NetworkInterface': [9, 9],
		'AWS.VPC.CustomerGateway': [17, 10],
		'AWS.VPC.RouteTable': [8, 8],
		'AWS.VPC.InternetGateway': [8, 8],
		'AWS.VPC.VPNGateway': [8, 8],
		'AWS.AutoScaling.LaunchConfiguration': [9, 9],
		'AWS.AutoScaling.Group': [13, 13]
	},

	GROUP_DEFAULT_SIZE:
	{
		'AWS.VPC.VPC': [60, 60], //[width, height]
		'AWS.EC2.AvailabilityZone': [21, 21],
		'AWS.VPC.Subnet': [17, 17],
		'AWS.AutoScaling.Group' : [13, 13]
	},

	GROUP_PADDING: 2,

	IMAGE:
	{
		//volume icon of instance
		INSTANCE_VOLUME_ATTACHED_ACTIVE: MC.IMG_URL + 'ide/icon/instance-volume-attached-active.png',
		INSTANCE_VOLUME_ATTACHED_NORMAL: MC.IMG_URL + 'ide/icon/instance-volume-attached-normal.png',
		INSTANCE_VOLUME_NOT_ATTACHED: MC.IMG_URL + 'ide/icon/instance-volume-not-attached.png',
	},

	//min padding for group
	GROUP_MIN_PADDING: 120,

	PORT_PADDING: 4, //port padding (to point of junction)
	CORNER_RADIUS: 8, //cornerRadius of fold line

	GROUP_WEIGHT:
	{
		'AWS.VPC.VPC': ['AWS.EC2.AvailabilityZone', 'AWS.VPC.Subnet', 'AWS.AutoScaling.Group'],
		'AWS.EC2.AvailabilityZone': ['AWS.VPC.Subnet', 'AWS.AutoScaling.Group'],
		'AWS.VPC.Subnet': ['AWS.AutoScaling.Group'],
		'AWS.AutoScaling.Group': []
	},

	// If array, order by ASG -> Subnet -> AZ -> Canvas.
	MATCH_PLACEMENT:
	{
		'AWS.ELB': ['AWS.VPC.VPC'],
		'AWS.EC2.Instance': ['AWS.AutoScaling.Group', 'AWS.VPC.Subnet'],
		'AWS.EC2.EBS.Volume': ['AWS.VPC.Subnet'],
		'AWS.VPC.NetworkInterface': ['AWS.VPC.Subnet'],
		'AWS.VPC.CustomerGateway': ['Canvas'],
		'AWS.VPC.RouteTable': ['AWS.VPC.VPC'],
		'AWS.VPC.InternetGateway': ['AWS.VPC.VPC'],
		'AWS.VPC.VPNGateway': ['AWS.VPC.VPC'],
		'AWS.EC2.AvailabilityZone': ['AWS.VPC.VPC'],
		'AWS.VPC.Subnet': ['AWS.EC2.AvailabilityZone'],
		'AWS.VPC.VPC': ['Canvas'],
		'AWS.AutoScaling.Group' : ['AWS.VPC.Subnet']
	},

	//json data for stack
	STACK_JSON:
	{
		"id": "",
		"name": "",
		"description": "",
		"region": "",
		"platform": "ec2-vpc", //ec2-classic|ec2-vpc, default-vpc|custom-vpc
		"state": "Enabled",
		"username": "",
		"owner": "",
		"version": "2013-09-04",
		"tag": "",
		"usage": "",
		//"has_instance_store_ami": "", //true|false
		"component":
		{},
		"layout":
		{
			"size": [240, 240],
			"component":
			{
				"group":
				{},
				"node":
				{}
			},
			"connection":
			{}
		},
		"history":
		{
			"time":
			{
				"created": 0,
				"updatd": 0
			}
		},
		"property":
		{
			"stoppable": "true",
			"schedule":
			{
				"stop":
				{
					"run": null,
					"when": null,
					"during": null
				},
				"backup":
				{
					"day": null,
					"when": null
				},
				"start":
				{
					"when": null
				}
			},
			"policy":
			{
				"ha": ""
			},
			"lease":
			{
				"length": null,
				"action": "",
				"due": null
			}
		}
	},

	DESIGN_INIT_LAYOUT_VPC:
	{
		size  : [240,240],
		component : {
			group : {
				VPC : {
					coordinate : [5,3],
					size       : [60,60]
				}
			},
			node : {
				RTB : {
					coordinate : [50,5]
				}
			}
		}

	},

	DESIGN_INIT_DATA_VPC:
	{
		KP : {
			type : "AWS.EC2.KeyPair",
			name : "DefaultKP",
			resource : { KeyName : "DefaultKP" }
		},
		SG : {
			type : "AWS.EC2.SecurityGroup",
			name : "DefaultSG",
			resource : {
				IpPermissions: [{
					IpProtocol : "tcp",
					IpRanges   : "0.0.0.0/0",
					FromPort   : "22",
					ToPort     : "22",
					Groups     : [{"GroupId":"","UserId":"","GroupName":""}]
				}],
				IpPermissionsEgress : [{
					FromPort: "0",
					IpProtocol: "-1",
					IpRanges: "0.0.0.0/0",
					ToPort: "65535"
				}],
				Default             : "true",
				GroupName           : "DefaultSG",
				GroupDescription    : 'Default Security Group'
			}
		},
		ACL : {
			"type": "AWS.VPC.NetworkAcl",
			"name": "DefaultACL",
			"resource": {
				"RouteTableId": "",
				"NetworkAclId": "",
				"VpcId": "",
				"Default": "true",
				"EntrySet": [
					{
						"RuleAction": "allow",
						"Protocol": "-1",
						"CidrBlock": "0.0.0.0/0",
						"Egress": true,
						"IcmpTypeCode": {
							"Type": "",
							"Code": ""
						},
						"PortRange": {
							"To": "",
							"From": ""
						},
						"RuleNumber": "100"
					},
					{
						"RuleAction": "deny",
						"Protocol": "-1",
						"CidrBlock": "0.0.0.0/0",
						"Egress": true,
						"IcmpTypeCode": {
							"Type": "",
							"Code": ""
						},
						"PortRange": {
							"To": "",
							"From": ""
						},
						"RuleNumber": "32767"
					},
					{
						"RuleAction": "allow",
						"Protocol": "-1",
						"CidrBlock": "0.0.0.0/0",
						"Egress": false,
						"IcmpTypeCode": {
							"Type": "",
							"Code": ""
						},
						"PortRange": {
							"To": "",
							"From": ""
						},
						"RuleNumber": "100"
					},
					{
						"RuleAction": "deny",
						"Protocol": "-1",
						"CidrBlock": "0.0.0.0/0",
						"Egress": false,
						"IcmpTypeCode": {
							"Type": "",
							"Code": ""
						},
						"PortRange": {
							"To": "",
							"From": ""
						},
						"RuleNumber": "32767"
					}
				],
				"AssociationSet": []
			}
		},
		VPC : {
			type : "AWS.VPC.VPC",
			name : "vpc",
			resource : {}
		},
		RTB : {
			type     : "AWS.VPC.RouteTable",
			resource : {
				PropagatingVgwSet : [],
				RouteSet          : [{
						State                : 'active',
						Origin               : 'CreateRouteTable',
						GatewayId            : 'local',
						DestinationCidrBlock : '10.0.0.0/16'
				}],
				AssociationSet : [{Main:"true"}]
			}
		}
	},

	//***** AWS.EC2.AvailabilityZone *****/
	AZ_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.EC2.AvailabilityZone",
			"coordinate": [0, 0],
			"size": [480, 240],
			"name": "", //eg: us-east-1a
			"groupUId": ""
		}
	},

	//***** AWS.EC2.Instance *****/
	INSTANCE_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.EC2.Instance",
			"coordinate": [0, 0],
			"osType": "", //amazon|centos|debian|fedora|gentoo|linux-other|opensuse|redhat|suse|ubuntu|win
			"architecture": "", //i386|x86_64
			"rootDeviceType": "", //ebs|instance-store
			"virtualizationType" : "", //hvm|paravirtual
			"groupUId": "",
			"connection": [],
			"instanceList": [], //store uid of each instance in server group
			"volumeList" : {},
			"eipList" : null,
			'eniList' : []
		},
		data:
		{
			"uid": "",
			"type": "AWS.EC2.Instance",
			"name": "", 			//if number >1 then it's server group name
			"serverGroupUid": "", 	//uid of servergroup(index is 0)
			"serverGroupName": "",  //name of servergroup
			"number": 1,			//if number >1 then it's server group
			"index": 0, 			//index in server group
			"state": "",
			//"platform": "32",
			"software":
			{},
			"resource":
			{
				"RamdiskId": "",
				"InstanceId": "",
				"DisableApiTermination": "false",
				"ShutdownBehavior": "terminate",
				"SecurityGroupId": [],
				"SecurityGroup": [],
				"UserData":
				{
					"Base64Encoded": "false",
					"Data": ""
				},
				"ImageId": "",
				"Placement":
				{
					"Tenancy": "",
					"AvailabilityZone": "", //eg: ap-northeast-1b
					"GroupName": ""
				},
				"PrivateIpAddress": "",
				"BlockDeviceMapping": [],
				"KernelId": "",
				"SubnetId": "",
				"KeyName": "",
				"VpcId": "",
				"InstanceType": "",
				"Monitoring": "disabled",
				"EbsOptimized": "false",
				"NetworkInterface":[]
			}
		}
	},

	//***** AWS.ELB *****/
	ELB_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.ELB",
			"coordinate": [0, 0],
			"groupUId": "",
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.ELB",
			"name": "",
			"resource":
			{
				"HealthCheck":
				{
					"Timeout": "5",
					"Target": "HTTP:80/index.html",
					"HealthyThreshold": "9",
					"UnhealthyThreshold": "4",
					"Interval": "30"
				},
				"Policies":
				{
					"AppCookieStickinessPolicies": [
					{
						"CookieName": "",
						"PolicyName": ""
					}],
					"OtherPolicies": [],
					"LBCookieStickinessPolicies": [
					{
						"CookieExpirationPeriod": "",
						"PolicyName": ""
					}]
				},
				"BackendServerDescriptions": [
				{
					"InstantPort": "",
					"PoliciyNames": ""
				}],
				"SecurityGroups": [],
				"CreatedTime": "",
				"CanonicalHostedZoneNameID": "",
				"ListenerDescriptions": [
				{
					"PolicyNames": "",
					"Listener":
					{
						"LoadBalancerPort": "80",
						"InstanceProtocol": "HTTP",
						"Protocol": "HTTP",
						"SSLCertificateId": "",
						"InstancePort": "80"
					}
				}],
				"DNSName": "",
				"Scheme": "", //internal | internet-facing
				"CanonicalHostedZoneName": "",
				"Instances": [],
				"SourceSecurityGroup":
				{
					"OwnerAlias": "",
					"GroupName": ""
				},
				"Subnets": [],
				"VpcId": "",
				"LoadBalancerName": "",
				"AvailabilityZones": [],
				"CrossZoneLoadBalancing": "false"
			}
		}
	},


	//***** AWS.VPC.VPC *****/
	VPC_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.VPC",
			"coordinate": [0, 0],
			"size": [0, 0],
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.VPC",
			"name": "vpc",
			"resource":
			{
				"EnableDnsHostnames": "false",
				"DhcpOptionsId": "",
				"CidrBlock": "10.0.0.0/16",
				"State": "",
				"InstanceTenancy": "default",
				"VpcId": "",
				"IsDefault": "false",
				"EnableDnsSupport": "true"
			}
		}
	},

	//***** AWS.VPC.Subnet *****/
	SUBNET_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.Subnet",
			"coordinate": [0, 0],
			"size": [0, 0],
			"groupUId": "",
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.Subnet",
			"name": "subnet1",
			"resource":
			{
				"AvailabilityZone": "", //seg: ap-northeast-1b
				"CidrBlock": "10.0.0.0/24",
				"SubnetId": "",
				"VpcId": "", //@3EE0DED4-4D29-12C4-4A98-14C0BBC81A6A.resource.VpcId
				"AvailableIpAddressCount": "",
				"State": ""
			}
		}
	},

	//***** AWS.VPC.InternetGateway *****/
	IGW_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.InternetGateway",
			"coordinate": [0, 0],
			"groupUId": "",
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.InternetGateway",
			"name": "IGW",
			"resource":
			{
				"InternetGatewayId": "",
				"AttachmentSet": [
				{
					"VpcId": "", //@3EE0DED4-4D29-12C4-4A98-14C0BBC81A6A.resource.VpcId
					"State": "available"
				}]
			}
		}
	},

	//***** AWS.VPC.RouteTable *****/
	ROUTETABLE_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.RouteTable",
			"coordinate": [0, 0],
			"groupUId": "",
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.RouteTable",
			"name": "",
			"resource":
			{
				"VpcId": "",
				"PropagatingVgwSet": [],
				"RouteSet": [
					{
						'State' : 'active',
						'Origin': 'CreateRouteTable',
						'InstanceId':'',
						'InstanceOwnerId':'',
						'GatewayId' : 'local',
						'NetworkInterfaceId' : '',
						'DestinationCidrBlock' : '10.0.0.0/16'
					}
				],
				"RouteTableId": "",
				"AssociationSet": [
					//{
					//	"Main": "true",
					//	"RouteTableId": "",
					//	"SubnetId": "",
					//	"RouteTableAssociationId": ""
					//}
				]
			}
		}
	},


	//***** AWS.VPC.VPNGateway *****/
	VGW_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.VPNGateway",
			"coordinate": [0, 0],
			"groupUId": "",
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.VPNGateway",
			"name": "VGW",
			"resource":
			{
				"Attachments": [
				{
					"VpcId": "", //eg: @3EE0DED4-4D29-12C4-4A98-14C0BBC81A6A.resource.VpcId
					"State": "attached"
				}],
				"Type": "ipsec.1",
				"AvailabilityZone": "",
				"VpnGatewayId": "",
				"State": "available"
			}
		}
	},

	//***** AWS.VPC.CustomerGateway *****/
	CGW_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.CustomerGateway",
			"networkName": "",
			"coordinate": [0, 0],
			"groupUId": "",
			"connection": []
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.CustomerGateway",
			"name": "CustomerNetwork1",
			"resource":
			{
				"Type": "ipsec.1",
				"BgpAsn": "",
				"CustomerGatewayId": "",
				"State": "available",
				"IpAddress": ""
			}
		}
	},

	//***** AWS.VPC.NetworkInterface *****/
	ENI_JSON:
	{
		layout:
		{
			'uid' : '',
			"type": "AWS.VPC.NetworkInterface",
			"coordinate": [0, 0],
			"groupUId": "",
			"connection": [],
			"eniList": [],
			"eipList" : {}
		},
		data:
		{
			"uid": "",
			"type": "AWS.VPC.NetworkInterface",
			"name": "eni1", //if number >1 then it's server group name
			"serverGroupUid": "", 	//uid of servergroup(index is 0)
			"serverGroupName": "",  //name of servergroup
			"number": 1,			//if number >1 then it's server group
			"index": 0, 			//index in server group
			"resource":
			{
				"PrivateIpAddressSet": [
				{
					"Association":
					{
						"AssociationID": "",
						"PublicDnsName": "",
						"AllocationID": "",
						"InstanceId": "",
						"IpOwnerId": "",
						"PublicIp": ""
					},
					"PrivateIpAddress": "10.0.0.1",
					"AutoAssign": "true",
					"Primary": "true"
				}],
				"Status": "",
				"GroupSet": [
				//{
				//	"GroupId": "", //eg: @B70030F1-0107-B526-8022-14C0BBD50CC1.resource.GroupId
				//	"GroupName": "" //eg: @B70030F1-0107-B526-8022-14C0BBD50CC1.resource.GroupName
				//}
				],
				"PrivateDnsName": "",
				"SourceDestCheck": "true",
				"RequestId": "",
				"MacAddress": "",
				"OwnerId": "",
				"RequestManaged": "",
				"SecondPriIpCount": "",
				"Attachment":
				{
					"InstanceId": "", //eg: @D673A590-1897-12F8-D1F3-14C116707F9A.resource.InstanceId
					"AttachmentId": "",
					"DeviceIndex": "1",
					"AttachTime": ""
				},
				"AvailabilityZone": "", //eg: ap-northeast-1b
				"SubnetId": "", //eg: @E2236992-27D1-97CA-4B03-14C0C485E033.resource.SubnetId
				"Description": "",
				"VpcId": "", //eg: @3EE0DED4-4D29-12C4-4A98-14C0BBC81A6A.resource.VpcId
				"PrivateIpAddress": "",
				"NetworkInterfaceId": ""
			}
		}
	},

	/********************************************
	** AutoScaling **
	********************************************/

	//*****AWS.AutoScaling.Group*****/
	ASG_JSON: {
		layout: {
			'uid' : '',
			"type": "AWS.AutoScaling.Group",
			"coordinate": [
				0,
				0
			],
			"size" : [
				13,
				13
			],
			"groupUId": "",
			"originalId": "",
			"connection": [

			]
		},
		data: {
			'type': 'AWS.AutoScaling.Group',
			'name': '',
			'uid': '',
			'resource': {
				'AutoScalingGroupARN': '',
				'AutoScalingGroupName': '',
				'AvailabilityZones': [

				],
				'CreatedTime': '',
				'DefaultCooldown': "300",
				'DesiredCapacity': "",
				'EnabledMetrics': [
					{
						'Granularity': '',
						'Metric': ''
					}
				],
				'HealthCheckGracePeriod': "300",
				'HealthCheckType': "EC2",
				'Instances': [

				],
				'LaunchConfigurationName': '',
				'LoadBalancerNames': [

				],
				'MaxSize': "2",
				'MinSize': "1",
				'PlacementGroup': '',
				'Status': '',
				'SuspendedProcesses': [
					{
						'ProcessName': '',
						'SuspensionReason': ''
					}
				],
				'Tags': '',
				'TerminationPolicies': [
					'Default'
				],
				'VPCZoneIdentifier': '',
				'InstanceId': '',
				'ShouldDecrementDesiredCapacity': ''
			}
		}
	},

	/*****AWS.AutoScaling.LaunchConfiguration*****/
	ASL_LC_JSON: {
		layout:
		{
			'uid' : '',
			'type': 'AWS.AutoScaling.LaunchConfiguration',
			'coordinate': [0, 0],
			'osType': '', //amazon|centos|debian|fedora|gentoo|linux-other|opensuse|redhat|suse|ubuntu|win
			'architecture': '', //i386|x86_64
			'rootDeviceType': '', //ebs|instance-store
			'groupUId': '',
			"originalId": "",
			'connection': []
		},
		data: {
			'name': '',
			'uid': '',
			'type': 'AWS.AutoScaling.LaunchConfiguration',
			'resource': {
				'BlockDeviceMapping': [

				],
				'CreatedTime': '',
				'EbsOptimized': '',
				'IamInstanceProfile': '',
				'ImageId': '',
				'InstanceMonitoring': '',
				'InstanceType': '',
				'KernelId': '',
				'KeyName': '',
				'LaunchConfigurationARN': '',
				'LaunchConfigurationName': '',
				'RamdiskId': '',
				'SecurityGroups': [

				],
				'SpotPrice': '',
				'UserData': ''
			}
		}
	}

};

for ( var i in constant_data ) {
	MC.canvas[i] = constant_data[i];
}
});

/*
#**********************************************************
#* Filename: MC.validate.js
#* Creator: Tim
#* Description: Validate helper of logic
#* Date: 20130813
# **********************************************************
# (c) Copyright 2013 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define('MC.validate',["MC"], function( MC ) {

	var slice = function( arr, start, end ) {
		return Function.call.apply( Array.prototype.slice, arguments );
	};

	var regExp = {
		email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
		, alphanum: /^\w+$/
		, digits: /^\d+$/
		, number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/
		, awsName: /^[a-zA-Z0-9][a-zA-Z0-9-]*$/
		, phone: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
		, usPhone: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
		// IPv4 only
		, ipv4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
		// CIDR only
		, cidr: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))$/
		// AWS CIDR
		, awsCidr: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([1][6-9]|[2][0-8]))$/
		// IPv4 and CIDR
		, ipaddress: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/(\d|[1-2]\d|3[0-2]))?$/
		, url: /^(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
		, urlstrict: /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i

		, arn: /^arn:aws:sns:[\w-]+:.+$/
		, sqs: /^arn:aws:sqs:[\w-]+:\d{12}:.+$/

		, deviceLinux: /^\/dev\/(hd[a-z]([1-9]|1[0-5])|(sd[a-z]|sd[b-z]([1-9]|1[0-5])))$/
		, deviceWindows: /^xvd[f-p]$/

	};


	MC.validate = function() {
		var func = arguments[ 0 ];
		if ( func in MC.validate ) {
			return MC.validate[ func ].apply( MC.validate, slice( arguments, 1 ) );
		} else if ( func in regExp ) {
			return regExp[ func ].test( slice( arguments, 1, 2) );
		}
		else {
			throw "the validate method: [" + func + "] doesn't exist";
		}
	};

	MC.validate.required = function( value ) {
		return !! value;
	};

	MC.validate.equal = function( value1, value2 ) {
		return value1 === value2;
	};

	MC.validate.exist = function( value, set ) {
		if ( Array.prototype.indexOf && Array.prototype.indexOf === set.indexOf ) {
			return set.indexOf( value ) !== -1;
		}

		var i = 0;
		for ( ; i<set.length; i++ ) {
			if ( set[ i ] === value ) {
				break;
			}
		}

		return !( i === set.length );
	};

	MC.validate.range = function( value, range ) {
		return value >= range[ 0 ] && value <= range[ 1 ];
	};

	MC.validate.http = function( value ) {
		return regExp.urlstrict.test( value ) && value.slice(0, 4) === 'http';
	};

	MC.validate.https = function( value ) {
		return regExp.urlstrict.test( value ) && value.slice(0, 5) === 'https';
	};

	MC.validate.deviceName = function ( value, type, addPrefix ) {
		if ( type === 'linux' ) {
			addPrefix && ( value = '/dev/' + value );
			return regExp.deviceLinux.test( value );
		} else if ( type === 'windows') {
			addPrefix && ( value = 'xvd' + value );
			return regExp.deviceWindows.test( value );
		}

		return false;
	};

	// helper

	MC.validate.preventDupname = function( target, id, name, type ) {
		$target = target instanceof $ ? target : $( target )
		if ( arguments.length === 3 ) type = name;

		$target.parsley('custom', function( val ) {
			if ( val && !MC.validate( 'awsName',  val ) ) {
				return 'This value should be a valid ' + type + ' name.';
			}
            if ( !MC.aws.aws.checkIsRepeatName( id, val ) ) {
                return type + ' name " ' + val + ' " is already in using. Please use another one.';
            }
		})
	};

	MC.validate.portRange = function ( value ) {
		var portAry = []
		if (value.indexOf('-') === -1) {
			if (!value || isNaN(Number(value))) {
				return false;
			}
			portAry[0] = Number(value);
		} else {
			valueAry = value.split('-');
			if (valueAry.length !== 2 || !valueAry[0] || !valueAry[1]) {
				return false;
			}
			if (isNaN(Number(valueAry[0])) || isNaN(Number(valueAry[1]))) {
				return false;
			}
			portAry[0] = Number(valueAry[0]);
			portAry[1] = Number(valueAry[1]);
		}
		return portAry;
	};

	MC.validate.portValidRange = function ( portAry ) {
		if (portAry.length === 1) {
			port1 = portAry[0];
			if (port1 < 0 || port1 > 65535) {
				return false;
			}
		} else {
			port1 = portAry[0];
			port2 = portAry[1];
			if (port1 < 0 || port1 > 65535 || port2 < 0 || port2 > 65535) {
				return false;
			}
			if (port2 <= port1) {
				return false;
			}
		}
		return true;
	};

	MC.validate.port = function ( value ) {
		var portValue = null

		if (!value || isNaN(Number(value))) {
			return false;
		}

		portValue = Number(value);
		return portValue;
	};

});



/*
 */

(function() {
  define('event',['underscore', 'backbone'], function() {
    var Event, event;
    Event = (function() {
      function Event() {
        _.extend(this, Backbone.Events);
      }

      Event.prototype.NAVIGATION_COMPLETE = 'NAVIGATION_COMPLETE';

      Event.prototype.HEADER_COMPLETE = 'HEADER_COMPLETE';

      Event.prototype.DASHBOARD_COMPLETE = 'DASHBOARD_COMPLETE';

      Event.prototype.DESIGN_COMPLETE = 'DESIGN_COMPLETE';

      Event.prototype.RESOURCE_COMPLETE = 'RESOURCE_COMPLETE';

      Event.prototype.DESIGN_SUB_COMPLETE = 'DESIGN_SUB_COMPLETE';

      Event.prototype.IDE_AVAILABLE = 'IDE_AVAILABLE';

      Event.prototype.LOGOUT_IDE = 'LOGOUT_IDE';

      Event.prototype.OPEN_DESIGN = 'OPEN_DESIGN';

      Event.prototype.OPEN_SUB_DESIGN = 'OPEN_SUB_DESIGN';

      Event.prototype.CREATE_DESIGN_OBJ = 'CREATE_DESIGN_OBJ';

      Event.prototype.OPEN_PROPERTY = 'OPEN_PROPERTY';

      Event.prototype.FORCE_OPEN_PROPERTY = "FORCE_OPEN_PROPERTY";

      Event.prototype.REFRESH_PROPERTY = "REFRESH_PROPERTY";

      Event.prototype.RELOAD_AZ = 'RELOAD_AZ';

      Event.prototype.RESOURCE_API_COMPLETE = 'RESOURCE_API_COMPLETE';

      Event.prototype.SHOW_DESIGN_OVERLAY = 'SHOW_DESIGN_OVERLAY';

      Event.prototype.HIDE_DESIGN_OVERLAY = 'HIDE_DESIGN_OVERLAY';

      Event.prototype.UPDATE_RESOURCE_STATE = 'UPDATE_RESOURCE_STATE';

      Event.prototype.SWITCH_TAB = 'SWITCH_TAB';

      Event.prototype.SWITCH_DASHBOARD = 'SWITCH_DASHBOARD';

      Event.prototype.SWITCH_PROCESS = 'SWITCH_PROCESS';

      Event.prototype.SWITCH_LOADING_BAR = 'SWITCH_LOADING_BAR';

      Event.prototype.SWITCH_WAITING_BAR = 'SWITCH_WAITING_BAR';

      Event.prototype.SWITCH_MAIN = 'SWITCH_MAIN';

      Event.prototype.ADD_TAB_DATA = 'ADD_TAB_DATA';

      Event.prototype.DELETE_TAB_DATA = 'DELETE_TAB_DATA';

      Event.prototype.UPDATE_TAB_DATA = 'UPDATE_TAB_DATA';

      Event.prototype.OPEN_DESIGN_TAB = 'OPEN_DESIGN_TAB';

      Event.prototype.CLOSE_DESIGN_TAB = 'CLOSE_DESIGN_TAB';

      Event.prototype.UPDATE_DESIGN_TAB = 'UPDATE_DESIGN_TAB';

      Event.prototype.UPDATE_DESIGN_TAB_ICON = 'UPDATE_DESIGN_TAB_ICON';

      Event.prototype.UPDATE_DESIGN_TAB_TYPE = 'UPDATE_DESIGN_TAB_TYPE';

      Event.prototype.HIDE_STATUS_BAR = 'HIDE_STATUS_BAR';

      Event.prototype.UPDATE_STATUS_BAR = 'UPDATE_STATUS_BAR';

      Event.prototype.UPDATE_TA_MODAL = 'UPDATE_TA_MODAL';

      Event.prototype.UNLOAD_TA_MODAL = 'UNLOAD_TA_MODAL';

      Event.prototype.TA_SYNC_START = 'TA_SYNC_START';

      Event.prototype.TA_SYNC_FINISH = 'TA_SYNC_FINISH';

      Event.prototype.RESULT_APP_LIST = 'RESULT_APP_LIST';

      Event.prototype.RESULT_STACK_LIST = 'RESULT_STACK_LIST';

      Event.prototype.RESULT_EMPTY_REGION_LIST = 'RESULT_EMPTY_REGION_LIST';

      Event.prototype.UPDATE_DASHBOARD = 'UPDATE_DASHBOARD';

      Event.prototype.UPDATE_REGION_THUMBNAIL = 'UPDATE_REGION_THUMBNAIL';

      Event.prototype.RETURN_OVERVIEW_TAB = 'RETURN_OVERVIEW_TAB';

      Event.prototype.RETURN_REGION_TAB = 'RETURN_REGION_TAB';

      Event.prototype.APPEDIT_2_APP = 'APPEDIT_2_APP';

      Event.prototype.RESTORE_CANVAS = 'RESTORE_CANVAS';

      Event.prototype.ENABLE_RESOURCE_ITEM = 'ENABLE_RESOURCE_ITEM';

      Event.prototype.DISABLE_RESOURCE_ITEM = 'DISABLE_RESOURCE_ITEM';

      Event.prototype.SHOW_PROPERTY_PANEL = 'SHOW_PROPERTY_PANEL';

      Event.prototype.PROPERTY_REFRESH_ENI_IP_LIST = 'PROPERTY_REFRESH_ENI_IP_LIST';

      Event.prototype.PROPERTY_DISABLE_USER_DATA_INPUT = 'PROPERTY_DISABLE_USER_DATA_INPUT';

      Event.prototype.UNDELEGATE_PROPERTY_DOM_EVENTS = 'UNDELEGATE_PROPERTY_DOM_EVENTS';

      Event.prototype.CANVAS_CREATE_LINE = 'CANVAS_CREATE_LINE';

      Event.prototype.CANVAS_DELETE_OBJECT = 'CANVAS_DELETE_OBJECT';

      Event.prototype.CANVAS_UPDATE_APP_RESOURCE = 'CANVAS_UPDATE_APP_RESOURCE';

      Event.prototype.CREATE_LINE_TO_CANVAS = 'CREATE_LINE_TO_CANVAS';

      Event.prototype.DELETE_LINE_TO_CANVAS = 'DELETE_LINE_TO_CANVAS';

      Event.prototype.REDRAW_SG_LINE = 'REDRAW_SG_LINE';

      Event.prototype.UPDATE_SG_LINE = 'UPDATE_SG_LINE';

      Event.prototype.START_APP = 'START_APP';

      Event.prototype.STOP_APP = 'STOP_APP';

      Event.prototype.TERMINATE_APP = 'TERMINATE_APP';

      Event.prototype.DELETE_STACK = 'DELETE_STACK';

      Event.prototype.DUPLICATE_STACK = 'DUPLICATE_STACK';

      Event.prototype.APP_TO_STACK = 'APP_TO_STACK';

      Event.prototype.SAVE_STACK = 'SAVE_STACK';

      Event.prototype.UPDATE_APP_LIST = 'UPDATE_APP_LIST';

      Event.prototype.UPDATE_STACK_LIST = 'UPDATE_STACK_LIST';

      Event.prototype.UPDATE_STATUS_BAR_SAVE_TIME = 'UPDATE_STATUS_BAR_SAVE_TIME';

      Event.prototype.UPDATE_APP_STATE = 'UPDATE_APP_STATE';

      Event.prototype.CANVAS_SAVE = 'CANVAS_SAVE';

      Event.prototype.NAVIGATION_TO_DASHBOARD_REGION = 'NAVIGATION_TO_DASHBOARD_REGION';

      Event.prototype.RECONNECT_WEBSOCKET = 'RECONNECT_WEBSOCKET';

      Event.prototype.WS_COLLECTION_READY_REQUEST = 'WS_COLLECTION_READY_REQUEST';

      Event.prototype.UPDATE_REQUEST_ITEM = 'UPDATE_REQUEST_ITEM';

      Event.prototype.UPDATE_IMPORT_ITEM = 'UPDATE_IMPORT_ITEM';

      Event.prototype.RESOURCE_QUICKSTART_READY = 'RESOURCE_QUICKSTART_READY';

      Event.prototype.SAVE_APP_THUMBNAIL = 'SAVE_APP_THUMBNAIL';

      Event.prototype.UPDATE_PROCESS = 'UPDATE_PROCESS';

      Event.prototype.UPDATE_HEADER = 'UPDATE_HEADER';

      Event.prototype.UPDATE_REGION_RESOURCE = 'UPDATE_REGION_RESOURCE';

      Event.prototype.UPDATE_AWS_CREDENTIAL = 'UPDATE_AWS_CREDENTIAL';

      Event.prototype.ACCOUNT_DEMONSTRATE = 'ACCOUNT_DEMONSTRATE';

      Event.prototype.UPDATE_APP_RESOURCE = 'UPDATE_APP_RESOURCE';

      Event.prototype.UPDATE_APP_INFO = 'UPDATE_APP_INFO';

      Event.prototype.UPDATE_STATE_STATUS_DATA = 'STATE_STATUS_DATA_UPDATE';

      Event.prototype.UPDATE_STATE_STATUS_DATA_TO_EDITOR = 'UPDATE_STATE_STATUS_DATA_TO_EDITOR';

      Event.prototype.STATE_EDITOR_SAVE_DATA = 'STATE_EDITOR_SAVE_DATA';

      Event.prototype.GET_STATE_MODULE = 'GET_STATE_MODULE';

      Event.prototype.SHOW_STATE_EDITOR = 'SHOW_STATE_EDITOR';

      Event.prototype.STATE_EDITOR_DATA_UPDATE = 'STATE_EDITOR_DATA_UPDATE';

      Event.prototype.onListen = function(type, callback, context) {
        return this.once(type, callback, context);
      };

      Event.prototype.onLongListen = function(type, callback, context) {
        return this.on(type, callback, context);
      };

      Event.prototype.offListen = function(type, function_name) {
        if (function_name) {
          return this.off(type, function_name);
        } else {
          return this.off(type);
        }
      };

      return Event;

    })();
    event = new Event();
    return event;
  });

}).call(this);


define( 'canvas_layout',['event', 'jquery', 'MC.canvas', 'MC.canvas.constant', 'canvon'], function(ide_event) {
var listen = function ()
{
	var canvas_state = MC.canvas.getState(),
		canvas_container = $('#canvas_container'),
		name_space = '.CANVAS_EVENT';

	MC.paper = Canvon('#svg_canvas');

	canvas_container
		.off(name_space)
		.removeClass('canvas_state_app canvas_state_appedit canvas_state_stack canvas_state_appview')
		.addClass('canvas_state_' + canvas_state);

	if (canvas_state === 'app')
	{
		canvas_container
			.on('mousedown' + name_space, '.instance-volume, .instanceList-item-volume, .asgList-item-volume', MC.canvas.volume.show)
			.on('click' + name_space, '.line', MC.canvas.event.selectLine)
			.on('mousedown' + name_space, MC.canvas.event.clearSelected)
			.on('mousedown' + name_space, '#svg_canvas', MC.canvas.event.clickBlank)
			.on('mouseenter'  + name_space + ' mouseleave'  + name_space, '.node', MC.canvas.event.nodeHover)
			.on('selectstart' + name_space, false)
			.on('mousedown' + name_space, '.dragable', MC.canvas.event.selectNode)
			.on('mousedown' + name_space, '.AWS-AutoScaling-LaunchConfiguration .instance-number-group', MC.canvas.asgList.show)
			.on('mousedown' + name_space, '.AWS-EC2-Instance .instance-number-group', MC.canvas.instanceList.show)
			.on('mousedown' + name_space, '.AWS-VPC-NetworkInterface .eni-number-group', MC.canvas.eniList.show)
			.on('mousedown' + name_space, MC.canvas.event.ctrlMove.mousedown)
			.on('mousedown' + name_space, '#node-action-wrap', MC.canvas.nodeAction.popup);
	}

	if (canvas_state === 'appedit')
	{
		canvas_container
			.on('mousedown' + name_space, '.instance-volume, .instanceList-item-volume, .asgList-item-volume', MC.canvas.volume.show)
			.on('mousedown' + name_space, '.port', MC.canvas.event.appDrawConnection)
			.on('mousedown' + name_space, '.dragable', MC.canvas.event.dragable.mousedown)
			.on('mousedown' + name_space, '.group-resizer', MC.canvas.event.groupResize.mousedown)
			.on('click' + name_space, '.line', MC.canvas.event.selectLine)
			.on('mousedown' + name_space, MC.canvas.event.clearSelected)
			.on('mousedown' + name_space, '#svg_canvas', MC.canvas.event.clickBlank)
			.on('mouseenter'  + name_space + ' mouseleave'  + name_space, '.node', MC.canvas.event.nodeHover)
			.on('selectstart' + name_space, false)
			.on('mousedown' + name_space, MC.canvas.event.ctrlMove.mousedown)
			.on('mousedown' + name_space, '#node-action-wrap', MC.canvas.nodeAction.popup);
	}

	if (canvas_state === 'stack')
	{
		canvas_container
			.on('mousedown' + name_space, '.port', MC.canvas.event.drawConnection.mousedown)
			.on('mousedown' + name_space, '.dragable', MC.canvas.event.dragable.mousedown)
			.on('mousedown' + name_space, '.group-resizer', MC.canvas.event.groupResize.mousedown)
			.on('mouseenter'  + name_space + ' mouseleave'  + name_space, '.node', MC.canvas.event.nodeHover)
			.on('click' + name_space, '.line', MC.canvas.event.selectLine)
			.on('mousedown' + name_space, MC.canvas.event.clearSelected)
			.on('mousedown' + name_space, '#svg_canvas', MC.canvas.event.clickBlank)
			.on('selectstart' + name_space, false)
			.on('mousedown' + name_space, MC.canvas.event.ctrlMove.mousedown)
			.on('mousedown' + name_space, '#node-action-wrap', MC.canvas.nodeAction.popup);
	}

	if (canvas_state === 'appview')
	{
		canvas_container
			.on('mousedown' + name_space, '.instance-volume, .instanceList-item-volume, .asgList-item-volume', MC.canvas.volume.show)
			.on('mousedown' + name_space, '.dragable', MC.canvas.event.dragable.mousedown)
			.on('mousedown' + name_space, '.group-resizer', MC.canvas.event.groupResize.mousedown)
			.on('mouseenter'  + name_space + ' mouseleave'  + name_space, '.node', MC.canvas.event.nodeHover)
			.on('click' + name_space, '.line', MC.canvas.event.selectLine)
			.on('mousedown' + name_space, '.AWS-AutoScaling-LaunchConfiguration .instance-number-group', MC.canvas.asgList.show)
			.on('mousedown' + name_space, MC.canvas.event.clearSelected)
			.on('mousedown' + name_space, '#svg_canvas', MC.canvas.event.clickBlank)
			.on('selectstart' + name_space, false)
			.on('mousedown' + name_space, MC.canvas.event.ctrlMove.mousedown);
	}

	$('#tab-content-design').on('click', '#canvas-panel, #resource-panel', MC.canvas.volume.close);
};

// Dom Ready
var canvas_initialize = function ()
{
	$(document).on('keydown', MC.canvas.event.keyEvent);

	$('#header, #navigation, #tab-bar').on('click', MC.canvas.volume.close);

	$('#tab-content-design').on('mousedown', '.resource-item', MC.canvas.event.siderbarDrag.mousedown);

	$(document.body)
		.on('mousedown', '#instance_volume_list a', MC.canvas.volume.mousedown);

};

// Dom Ready
var connect = function ()
{

};

	return {
		'listen'     : listen,
		'canvas_initialize' : canvas_initialize,
		'connect'    : connect
	};
});


define("lib/lib", function(){});
