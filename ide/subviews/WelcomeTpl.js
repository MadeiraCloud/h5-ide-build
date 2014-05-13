define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"modal-header\"> <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DIALOG_TIT", {hash:{},data:data}))
    + "</h3> </div>\n\n<div id=\"WelcomeDialog\">\n\n<section id=\"WelcomeSettings\">\n  <header>\n    <h2>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_TIT", {hash:{},data:data}))
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h2>\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DESC", {hash:{},data:data}))
    + "</p>\n  </header>\n  <div id=\"CredSetupWrap\">\n    <div id=\"CredSetupMsg\" class=\"cred-setup-msg empty-hide\"></div>\n    <ul>\n      <li>\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCOUNTID", {hash:{},data:data}))
    + "\"></i>\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNTID", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccount\" type=\"text\">\n      </li>\n      <li>\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_ACCESSKEY", {hash:{},data:data}))
    + "\"></i>\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSKEY", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupAccessKey\" type=\"text\">\n      </li>\n      <li>\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_TIP_CRED_SECRETKEY", {hash:{},data:data}))
    + "\"></i>\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_SECRETKEY", {hash:{},data:data}))
    + "</label>\n        <input autocomplete=\"off\" class=\"input\" id=\"CredSetupSecretKey\" type=\"password\">\n      </li>\n    </ul>\n\n    <footer class=\"cred-btn-wrap clearfix tar\">\n      <button id=\"WelcomeSkip\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_SKIP", {hash:{},data:data}))
    + "</button>\n      <button id=\"CredSetupSubmit\" class=\"btn btn-blue\" disabled=\"disabled\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_SUBMIT", {hash:{},data:data}))
    + "</button>\n    </footer>\n  </div>\n</section>\n\n<section id=\"WelcomeCredUpdate\" class=\"hide\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATING", {hash:{},data:data}))
    + "</h3></section>\n\n<section id=\"WelcomeSkipWarning\" class=\"hide modal-body\">\n  <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_TIT", {hash:{},data:data}))
    + "</h3>\n  <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_SUBTIT", {hash:{},data:data}))
    + "</h5>\n  <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_MSG", {hash:{},data:data}))
    + "</p>\n  <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_SKIP_MSG_EXTRA", {hash:{},data:data}))
    + "</p>\n  <footer class=\"cred-btn-wrap clearfix tar\">\n    <button id=\"WelcomeBack\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_BACK", {hash:{},data:data}))
    + "</button>\n    <button id=\"WelcomeDone\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_DONE", {hash:{},data:data}))
    + "</button>\n  </footer>\n</section>\n\n<section id=\"WelcomeDoneWrap\" class=\"hide\">\n  <p id=\"WelcomeDoneTitDemo\">"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_HINT_DEMO", {hash:{},data:data}))
    + "</p>\n  <p id=\"WelcomeDoneTit\">"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_HINT", {hash:{},data:data}))
    + " <span></span></p>\n  <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_TIT", {hash:{},data:data}))
    + "</h3>\n  <ul>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DONE_MSG", {hash:{},data:data}))
    + "</ul>\n  <footer class=\"cred-btn-wrap clearfix tar\">\n    <button id=\"WelcomeClose\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_DONE", {hash:{},data:data}))
    + "</button>\n  </footer>\n</section>\n\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });