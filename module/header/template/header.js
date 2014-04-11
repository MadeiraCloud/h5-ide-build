define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<nav class=\"header-menu\">\n  <section class=\"dropdown\">\n    <div id=\"header--notification\" class=\"js-toggle-dropdown\">\n      <i class=\"icon-notification\"></i>\n      <span id=\"notification-counter\"></span>\n    </div>\n\n    <div class=\"dropdown-menu\">\n      <div id=\"notification-panel-wrapper\" class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <ul class=\"scroll-content\"></ul>\n\n        <div class=\"notification-empty\">\n          <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_BLANK_NOTIFICATION", {hash:{},data:data}))
    + "</div>\n          <div class=\"description\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_BLANK_NOTIFICATION_DESC", {hash:{},data:data}))
    + "</div>\n        </div>\n      </div>\n\n    </div>\n  </section>\n\n  <section class=\"dropdown\">\n    <div id=\"header--user\" class=\"js-toggle-dropdown tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.user_email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n      <span class=\"truncate\" style=\"max-width:100px;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.user_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      <span class=\"no-credential\" style=\"display:none;\"></span>\n      <i class=\"icon-caret-down\"></i>\n    </div>\n\n    <ul id=\"user-dropdown-wrapper\" class=\"dropdown-menu\" role=\"menu\">\n      <li id=\"guide-tutorial\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_USER_TOUR", {hash:{},data:data}))
    + "</li>\n      <li id=\"keyboard-shortcuts\" class=\"modal\" data-modal-template=\"shortkey\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_KEY_SHORT", {hash:{},data:data}))
    + "</li>\n\n      <li><a href=\"http://docs.visualops.io\" target=\"_blank\" >"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_DOC", {hash:{},data:data}))
    + "</a></li>\n\n      <li>\n        <span class=\"no-credential\" style=\"display:none;\"></span>\n        <a href=\"javascript:void(0);\" id=\"awscredential-modal\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_SETTING", {hash:{},data:data}))
    + "</a>\n      </li>\n\n      <li id=\"btn-logout\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_LOGOUT", {hash:{},data:data}))
    + "</li>\n\n    </ul>\n  </section>\n</nav>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });