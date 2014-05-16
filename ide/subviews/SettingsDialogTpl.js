define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "style=\"display:block;\"";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <button id=\"CredSetupRemove\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_REMOVE_CREDENTIAL", {hash:{},data:data}))
    + "</button>\n        ";
  return buffer;
  }

  buffer += "<div class=\"modal-header\">\n  <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_SETTING", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i>\n</div>\n\n<nav id=\"SettingsNav\">\n  <span data-target=\"AccountTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT", {hash:{},data:data}))
    + "</span>\n  <span data-target=\"CredentialTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CREDENTIAL", {hash:{},data:data}))
    + "</span>\n  <!-- <span data-target=\"TokenTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSTOKEN", {hash:{},data:data}))
    + "</span> -->\n</nav>\n\n<div class=\"modal-body\" id=\"SettingsBody\">\n  <section id=\"AccountTab\">\n    <dl class=\"dl-horizontal\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_USERNAME", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_EMAIL", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n\n    <button id=\"AccountPwd\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CHANGE_PASSWORD", {hash:{},data:data}))
    + "</button>\n    <div id=\"AccountPwdWrap\">\n\n      <dl class=\"dl-horizontal\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\n        <dd><input type=\"password\" class=\"input\" id=\"AccountCurrentPwd\" /></dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HAED_LABEL_NEW_PASSWORD", {hash:{},data:data}))
    + "</dt>\n        <dd><input type=\"password\" class=\"input\" id=\"AccountNewPwd\" /></dd>\n      </dl>\n\n      <div id=\"AccountInfo\" class=\"empty-hide\"></div>\n\n      <div id=\"AccountPwdBtns\">\n        <button class=\"btn btn-blue\" id=\"AccountUpdatePwd\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\n        <span id=\"AccountCancelPwd\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\n      </div>\n    </div>\n  </section>\n\n  <section id=\"CredentialTab\">\n    <div id=\"CredDemoWrap\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.account), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_DEMO_TIT", {hash:{},data:data}))
    + "</h3>\n      <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_DEMO_TEXT", {hash:{},data:data}))
    + "</p>\n      <p class=\"tac\"><button class=\"btn btn-blue cred-setup\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_DEMO_SETUP", {hash:{},data:data}))
    + "</button></p>\n    </div>\n\n    <div id=\"CredAwsWrap\" class=\"pos-r\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.account), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_CONNECTED_TIT", {hash:{},data:data}))
    + "</h3>\n      <button class=\"cred-setup link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_UPDATE", {hash:{},data:data}))
    + "</button>\n      <dl class=\"dl-horizontal cred-setup-msg\" style=\"margin-top:15px;\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.account)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccessKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.awsSecretKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      </dl>\n    </div>\n\n    <div id=\"CredSetupWrap\">\n      <div id=\"CredSetupMsg\" class=\"cred-setup-msg empty-hide\"></div>\n      <ul>\n        <li>\n          <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCOUNTID", {hash:{},data:data}))
    + "\"></i>\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</label>\n          <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccount\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.account)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </li>\n        <li>\n          <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCESSKEY", {hash:{},data:data}))
    + "\"></i>\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</label>\n          <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccessKey\" type=\"text\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsAccessKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </li>\n        <li>\n          <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_SECRETKEY", {hash:{},data:data}))
    + "\"></i>\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</label>\n          <input autocomplete=\"off\" class=\"input\" id=\"CredSetupSecretKey\" type=\"password\" placeholder=\""
    + escapeExpression(((stack1 = (depth0 && depth0.awsSecretKey)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </li>\n      </ul>\n\n      <div class=\"cred-btn-wrap clearfix\">\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.credNeeded), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <button class=\"right link-style cred-setup-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\n        <button id=\"CredSetupSubmit\" class=\"btn btn-blue right\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\n      </div>\n\n    </div>\n\n    <div id=\"CredRemoveWrap\">\n      <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.credRemoveTitle)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h3>\n      <div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_REMOVE_TEXT", {hash:{},data:data}))
    + "</div>\n      <div class=\"cred-btn-wrap clearfix\">\n        <button class=\"right link-style cred-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\n        <button id=\"CredRemoveConfirm\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_REMOVE_CREDENTIAL", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div id=\"CredConfirmWrap\">\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TIT", {hash:{},data:data}))
    + "</h3>\n      <div>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATE_CONFIRM_TEXT", {hash:{},data:data}))
    + "</div>\n      <div class=\"cred-btn-wrap clearfix\">\n        <button class=\"right link-style cred-cancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\n        <button id=\"CredSetupConfirm\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_UPDATE_CONFIRM", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div id=\"CredRemoving\"><p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_REMOVING", {hash:{},data:data}))
    + "</p><div class=\"loading-spinner\"></div></div>\n    <div id=\"CredUpdating\"><p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATING", {hash:{},data:data}))
    + "</p><div class=\"loading-spinner\"></div></div>\n\n  </section>\n\n  <section id=\"TokenTab\">\n    <div id=\"TokenManager\">\n      <p class=\"clearfix\"> <button class=\"btn btn-blue right\" id=\"TokenCreate\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_CREATE", {hash:{},data:data}))
    + "</button>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN", {hash:{},data:data}))
    + "<a href=\"\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_LINK", {hash:{},data:data}))
    + "</a> </p>\n      <ul class=\"token-table\" data-empty=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_EMPTY", {hash:{},data:data}))
    + "\"></ul>\n    </div>\n    <div id=\"TokenRmConfirm\" class=\"hide\">\n      <h3 id=\"TokenRmTit\"></h3>\n      <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CONFIRM_TOKEN_RM", {hash:{},data:data}))
    + "</p>\n      <div class=\"cred-btn-wrap clearfix\">\n        <button class=\"right link-style\" id=\"TokenRmCancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\n        <button id=\"TokenRemove\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_REMOVE", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n  </section>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });