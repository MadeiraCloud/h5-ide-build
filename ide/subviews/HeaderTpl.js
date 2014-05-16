define(['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<nav class=\"header-menu\" id=\"header\">\r\n  <a id=\"support\" class=\"icon-support\" href=\"mailto:3rp02j1w@incoming.intercom.io\" target=\"_blank\">Support</a>\r\n\r\n  <section class=\"dropdown\">\r\n    <div id=\"HeaderNotification\" class=\"js-toggle-dropdown\">\r\n      <i class=\"icon-notification\"></i>\r\n      <span id=\"NotificationCounter\"></span>\r\n    </div>\r\n\r\n    <div class=\"dropdown-menu\">\r\n      <div id=\"notification-panel-wrapper\" class=\"scroll-wrap\">\r\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n        <ul class=\"scroll-content\"></ul>\r\n\r\n        <div class=\"notification-empty\">\r\n          <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_BLANK_NOTIFICATION", {hash:{},data:data}))
    + "</div>\r\n          <div class=\"description\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_BLANK_NOTIFICATION_DESC", {hash:{},data:data}))
    + "</div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </section>\r\n\r\n  <section class=\"dropdown\">\r\n    <div id=\"HeaderUser\" class=\"js-toggle-dropdown tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.user_email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n      <span class=\"truncate left\" style=\"max-width:100px;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.user_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\r\n      <i class=\"icon-caret-down\"></i>\r\n    </div>\r\n\r\n    <ul id=\"user-dropdown-wrapper\" class=\"dropdown-menu\">\r\n      <li id=\"HeaderShortcuts\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_KEY_SHORT", {hash:{},data:data}))
    + "</li>\r\n      <li><a href=\"http://docs.visualops.io\" target=\"_blank\" >"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_DOC", {hash:{},data:data}))
    + "</a></li>\r\n      <li id=\"HeaderSettings\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_SETTING", {hash:{},data:data}))
    + "</li>\r\n      <li id=\"HeaderLogout\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_LOGOUT", {hash:{},data:data}))
    + "</li>\r\n    </ul>\r\n  </section>\r\n</nav>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });