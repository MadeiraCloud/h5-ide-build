define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"modal-header\"> <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DIALOG_TIT", {hash:{},data:data}))
    + "</h3> </div>\r\n\r\n<div id=\"WelcomeDialog\">\r\n\r\n<section id=\"WelcomeSettings\">\r\n  <header>\r\n    <h2>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_TIT", {hash:{},data:data}))
    + "<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></h2>\r\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DESC", {hash:{},data:data}))
    + "</p>\r\n  </header>\r\n  <div id=\"CredSetupWrap\">\r\n    <div id=\"CredSetupMsg\" class=\"cred-setup-msg empty-hide\"></div>\r\n    <ul>\r\n      <li>\r\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCOUNTID", {hash:{},data:data}))
    + "\"></i>\r\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</label>\r\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccount\" type=\"text\">\r\n      </li>\r\n      <li>\r\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCESSKEY", {hash:{},data:data}))
    + "\"></i>\r\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</label>\r\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccessKey\" type=\"text\">\r\n      </li>\r\n      <li>\r\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_SECRETKEY", {hash:{},data:data}))
    + "\"></i>\r\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</label>\r\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupSecretKey\" type=\"password\">\r\n      </li>\r\n    </ul>\r\n\r\n    <footer class=\"cred-btn-wrap clearfix tar\">\r\n      <button id=\"WelcomeSkip\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_SKIP", {hash:{},data:data}))
    + "</button>\r\n      <button id=\"CredSetupSubmit\" class=\"btn btn-blue\" disabled=\"disabled\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\r\n    </footer>\r\n  </div>\r\n</section>\r\n\r\n<section id=\"WelcomeCredUpdate\" class=\"hide\">\r\n  <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATING", {hash:{},data:data}))
    + "</p>\r\n  <div class=\"loading-spinner\"></div>\r\n</section>\r\n\r\n<section id=\"WelcomeSkipWarning\" class=\"hide modal-body\">\r\n  <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_TIT", {hash:{},data:data}))
    + "</h3>\r\n  <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_SUBTIT", {hash:{},data:data}))
    + "</h5>\r\n  <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_MSG", {hash:{},data:data}))
    + "</p>\r\n  <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_MSG_EXTRA", {hash:{},data:data}))
    + "</p>\r\n  <footer class=\"cred-btn-wrap clearfix tar\">\r\n    <button id=\"WelcomeBack\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_BACK", {hash:{},data:data}))
    + "</button>\r\n    <button id=\"WelcomeDone\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_DONE", {hash:{},data:data}))
    + "</button>\r\n  </footer>\r\n</section>\r\n\r\n<section id=\"WelcomeDoneWrap\" class=\"hide\">\r\n  <p id=\"WelcomeDoneTitDemo\">"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_HINT_DEMO", {hash:{},data:data}))
    + "</p>\r\n  <p id=\"WelcomeDoneTit\">"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_HINT", {hash:{},data:data}))
    + " <span></span></p>\r\n  <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_TIT", {hash:{},data:data}))
    + "</h3>\r\n  <ul>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_MSG", {hash:{},data:data}))
    + "</ul>\r\n  <footer class=\"cred-btn-wrap clearfix tar\">\r\n    <button id=\"WelcomeClose\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_DONE", {hash:{},data:data}))
    + "</button>\r\n  </footer>\r\n</section>\r\n\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });