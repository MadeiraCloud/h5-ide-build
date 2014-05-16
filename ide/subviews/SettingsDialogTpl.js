define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "style=\"display:block;\"";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\r\n        <button id=\"CredSetupRemove\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_REMOVE_CREDENTIAL", {hash:{},data:data}))
    + "</button>\r\n        ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\r\n  <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_SETTING", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i>\r\n</div>\r\n\r\n<nav id=\"SettingsNav\">\r\n  <span data-target=\"AccountTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT", {hash:{},data:data}))
    + "</span>\r\n  <span data-target=\"CredentialTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CREDENTIAL", {hash:{},data:data}))
    + "</span>\r\n  <!-- <span data-target=\"TokenTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSTOKEN", {hash:{},data:data}))
    + "</span> -->\r\n</nav>\r\n\r\n<div class=\"modal-body\" id=\"SettingsBody\">\r\n  <section id=\"AccountTab\">\r\n    <dl class=\"dl-horizontal\">\r\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_USERNAME", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_EMAIL", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n    </dl>\r\n\r\n    <button id=\"AccountPwd\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CHANGE_PASSWORD", {hash:{},data:data}))
    + "</button>\r\n    <div id=\"AccountPwdWrap\">\r\n\r\n      <dl class=\"dl-horizontal\">\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n        <dd><input type=\"password\" class=\"input\" id=\"AccountCurrentPwd\" /></dd>\r\n\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HAED_LABEL_NEW_PASSWORD", {hash:{},data:data}))
    + "</dt>\r\n        <dd><input type=\"password\" class=\"input\" id=\"AccountNewPwd\" /></dd>\r\n      </dl>\r\n\r\n      <div id=\"AccountInfo\" class=\"empty-hide\"></div>\r\n\r\n      <div id=\"AccountPwdBtns\">\r\n        <button class=\"btn btn-blue\" id=\"AccountUpdatePwd\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\r\n        <span id=\"AccountCancelPwd\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\r\n      </div>\r\n    </div>\r\n  </section>\r\n\r\n  <section id=\"CredentialTab\">\r\n    <div id=\"CredDemoWrap\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.account), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_DEMO_TIT", {hash:{},data:data}))
    + "</h3>\r\n      <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_DEMO_TEXT", {hash:{},data:data}))
    + "</p>\r\n      <p class=\"tac\"><button class=\"btn btn-blue cred-setup\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_DEMO_SETUP", {hash:{},data:data}))
    + "</button></p>\r\n    </div>\r\n\r\n    <div id=\"CredAwsWrap\" class=\"pos-r\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.account), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\r\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_CONNECTED_TIT", {hash:{},data:data}))
    + "</h3>\r\n      <button class=\"cred-setup link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_UPDATE", {hash:{},data:data}))
    + "</button>\r\n      <dl class=\"dl-horizontal cred-setup-msg\" style=\"margin-top:15px;\">\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.account)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccessKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.awsSecretKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\r\n      </dl>\r\n    </div>\r\n\r\n    <div id=\"CredSetupWrap\">\r\n      <div id=\"CredSetupMsg\" class=\"cred-setup-msg empty-hide\"></div>\r\n      <ul>\r\n        <li>\r\n          <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCOUNTID", {hash:{},data:data}))
    + "\"></i>\r\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</label>\r\n          <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccount\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.account)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        </li>\r\n        <li>\r\n          <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCESSKEY", {hash:{},data:data}))
    + "\"></i>\r\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</label>\r\n          <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccessKey\" type=\"text\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccessKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        </li>\r\n        <li>\r\n          <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_SECRETKEY", {hash:{},data:data}))
    + "\"></i>\r\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</label>\r\n          <input autocomplete=\"off\" class=\"input\" id=\"CredSetupSecretKey\" type=\"password\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsSecretKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n        </li>\r\n      </ul>\r\n\r\n      <div class=\"cred-btn-wrap clearfix\">\r\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.credNeeded), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n        <button class=\"right link-style cred-setup-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\r\n        <button id=\"CredSetupSubmit\" class=\"btn btn-blue right\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div id=\"CredRemoveWrap\">\r\n      <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.credRemoveTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\r\n      <div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_REMOVE_TEXT", {hash:{},data:data}))
    + "</div>\r\n      <div class=\"cred-btn-wrap clearfix\">\r\n        <button class=\"right link-style cred-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\r\n        <button id=\"CredRemoveConfirm\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_REMOVE_CREDENTIAL", {hash:{},data:data}))
    + "</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"CredConfirmWrap\">\r\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TIT", {hash:{},data:data}))
    + "</h3>\r\n      <div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TEXT", {hash:{},data:data}))
    + "</div>\r\n      <div class=\"cred-btn-wrap clearfix\">\r\n        <button class=\"right link-style cred-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\r\n        <button id=\"CredSetupConfirm\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_UPDATE_CONFIRM", {hash:{},data:data}))
    + "</button>\r\n      </div>\r\n    </div>\r\n\r\n    <div id=\"CredRemoving\"><p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_REMOVING", {hash:{},data:data}))
    + "</p><div class=\"loading-spinner\"></div></div>\r\n    <div id=\"CredUpdating\"><p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATING", {hash:{},data:data}))
    + "</p><div class=\"loading-spinner\"></div></div>\r\n\r\n  </section>\r\n\r\n  <section id=\"TokenTab\">\r\n    <div id=\"TokenManager\">\r\n      <p class=\"clearfix\"> <button class=\"btn btn-blue right\" id=\"TokenCreate\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_CREATE", {hash:{},data:data}))
    + "</button>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN", {hash:{},data:data}))
    + "<a href=\"\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_LINK", {hash:{},data:data}))
    + "</a> </p>\r\n      <ul class=\"token-table\" data-empty=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_EMPTY", {hash:{},data:data}))
    + "\"></ul>\r\n    </div>\r\n    <div id=\"TokenRmConfirm\" class=\"hide\">\r\n      <h3 id=\"TokenRmTit\"></h3>\r\n      <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CONFIRM_TOKEN_RM", {hash:{},data:data}))
    + "</p>\r\n      <div class=\"cred-btn-wrap clearfix\">\r\n        <button class=\"right link-style\" id=\"TokenRmCancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\r\n        <button id=\"TokenRemove\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_REMOVE", {hash:{},data:data}))
    + "</button>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });