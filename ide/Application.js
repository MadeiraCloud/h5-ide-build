
/*
----------------------------
  A refactor version of previous lib/websocket
  The usage of Meteor seems to be wrong, but whatever.
----------------------------
 */

(function() {
  define('ide/Websocket',["Meteor", "backbone", "event", "MC"], function(Meteor, Backbone, ide_event) {
    var WEBSOCKET_URL, Websocket, singleton;
    WEBSOCKET_URL = "" + MC.API_HOST + "/ws/";
    Meteor._debug = function() {
      return console.log.apply(console, arguments);
    };
    singleton = null;
    Websocket = function() {
      var opts;
      if (singleton) {
        return singleton;
      }
      singleton = this;
      this.__readyDefer = Q.defer();
      this.__isReady = false;
      this.connection = Meteor.connect(WEBSOCKET_URL, true);
      opts = {
        connection: this.connection
      };
      this.collection = {
        request: new Meteor.Collection("request", opts),
        request_detail: new Meteor.Collection("request_detail", opts),
        stack: new Meteor.Collection("stack", opts),
        app: new Meteor.Collection("app", opts),
        status: new Meteor.Collection("status", opts),
        imports: new Meteor.Collection("imports", opts)
      };
      Deps.autorun((function(_this) {
        return function() {
          return _this.statusChanged();
        };
      })(this));
      this.subscribe();
      this.pipeChanges();
      setTimeout((function(_this) {
        return function() {
          _this.shouldNotify = true;
          if (!_this.connection.status.connected) {
            return _this.statusChanged();
          }
        };
      })(this), 5000);
      return this;
    };
    Websocket.prototype.statusChanged = function() {
      var status;
      status = this.connection.status().connected;
      if (status) {
        this.shouldNotify = true;
      }
      if (!this.shouldNotify) {
        return;
      }
      return this.trigger("StatusChanged", status);
    };
    Websocket.prototype.subscribe = function() {
      var callback, onReady, session, subscribed, usercode;
      if (this.subscribed) {
        return;
      }
      subscribed = true;
      onReady = function() {
        this.__isReady = true;
        return this.__readyDefer.resolve();
      };
      usercode = App.user.get('usercode');
      session = App.user.get('session');
      callback = {
        onReady: _.bind(onReady, this),
        onError: _.bind(this.onError, this)
      };
      this.connection.subscribe("request", usercode, session, callback);
      this.connection.subscribe("stack", usercode, session);
      this.connection.subscribe("app", usercode, session);
      this.connection.subscribe("status", usercode, session);
      this.connection.subscribe("imports", usercode, session);
    };
    Websocket.prototype.ready = function() {
      return this.__readyDefer.promise;
    };
    Websocket.prototype.isReady = function() {
      return this.__isReady;
    };
    Websocket.prototype.onError = function(error) {
      console.error("Websocket/Meteor Error:", error);
      this.subscribed = false;
      this.trigger("Disconnected");
    };
    Websocket.prototype.pipeChanges = function() {
      this.collection.request.find().fetch();
      this.collection.request.find().observeChanges({
        added: function(idx, dag) {
          return ide_event.trigger(ide_event.UPDATE_REQUEST_ITEM, idx, dag);
        },
        changed: function(idx, dag) {
          return ide_event.trigger(ide_event.UPDATE_REQUEST_ITEM, idx, dag);
        }
      });
      this.collection.imports.find().fetch();
      return this.collection.imports.find().observe({
        added: function(idx, dag) {
          return ide_event.trigger(ide_event.UPDATE_IMPORT_ITEM, idx);
        },
        changed: function(idx, dag) {
          return ide_event.trigger(ide_event.UPDATE_IMPORT_ITEM, idx);
        }
      });
    };
    _.extend(Websocket.prototype, Backbone.Events);
    return Websocket;
  });

}).call(this);

define('ide/subviews/SessionDialogTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section style=\"width:400px;\" class=\"invalid-session\" id=\"SessionDialog\">\r\n  <div class=\"confirmSession\">\r\n  <div class=\"modal-header\"><h3>Invalid Session</h3></div>\r\n\r\n  <article class=\"modal-body\">\r\n    <div class=\"modal-text-major\"> <p>Your account has signed in from other location or you last login has timed out.</p> <p>Would you like to reconnect this session or close it?</p> </div>\r\n    <div class=\"modal-text-minor\">If you have unsaved changes, close this session will cause all your change to lose.</div>\r\n  </article>\r\n\r\n  <footer class=\"modal-footer\">\r\n    <button id=\"SessionReconnect\" class=\"btn btn-blue\">Reconnect</button>\r\n    <button id=\"SessionClose\" class=\"btn btn-silver\">Close Session</button>\r\n  </footer>\r\n  </div>\r\n\r\n  <div class=\"reconnectSession\" style=\"display:none;\">\r\n  <div class=\"modal-header\"><h3>Reconnect Session</h3></div>\r\n  <article class=\"modal-body\">\r\n    <div class=\"modal-text-major\">Please provide your password to reconnect:</div>\r\n    <div class=\"modal-input\">\r\n      <input type=\"password\" id=\"SessionPassword\" class=\"input\" placeholder=\"Password\" style=\"width:200px;\" autofocus>\r\n    </div>\r\n  </article>\r\n  <footer class=\"modal-footer\">\r\n    <button id=\"SessionConnect\" class=\"btn btn-blue\" disabled>Connect</button>\r\n    <button id=\"SessionClose2\" class=\"btn btn-red\">Close Session</button>\r\n  </footer>\r\n  </div>\r\n</section>\r\n";
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/SessionDialog',['i18n!nls/lang.js', "./SessionDialogTpl", "backbone"], function(lang, template) {
    var CurrentSessionDialog, SessionDialogView;
    CurrentSessionDialog = null;
    SessionDialogView = Backbone.View.extend({
      events: {
        'click #SessionReconnect': 'showReconnect',
        'click #SessionClose': 'closeSession',
        'click #SessionClose2': 'closeSession',
        'click #SessionConnect': 'connect',
        'keypress #SessionPassword': 'passwordChanged'
      },
      constructor: function() {
        if (CurrentSessionDialog) {
          return CurrentSessionDialog;
        }
        CurrentSessionDialog = this;
        this.defer = Q.defer();
        modal(template(), false);
        return this.setElement($('#modal-wrap'));
      },
      promise: function() {
        return this.defer.promise;
      },
      showReconnect: function() {
        $(".invalid-session .confirmSession").hide();
        $(".invalid-session .reconnectSession").show();
      },
      closeSession: function() {
        return App.logout();
      },
      connect: function() {
        if ($("#SessionConnect").is(":disabled")) {
          return;
        }
        $("#SessionConnect").attr("disabled", "disabled");
        return App.user.acquireSession($("#SessionPassword").val()).then((function(_this) {
          return function() {
            _this.remove();
            _this.defer.resolve();
          };
        })(this), function(error) {
          $("#SessionConnect").removeAttr("disabled");
          notification('error', lang.ide.NOTIFY_MSG_WARN_AUTH_FAILED);
          $("#SessionPassword").toggleClass("parsley-error", true);
        });
      },
      passwordChanged: function(evt) {
        $("#SessionPassword").toggleClass("parsley-error", false);
        if (($("#SessionPassword").val() || "").length >= 6) {
          $("#SessionConnect").removeAttr("disabled");
        } else {
          $("#SessionConnect").attr("disabled", "disabled");
        }
        if (evt.which === 13) {
          this.connect();
        }
      }
    });
    return SessionDialogView;
  });

}).call(this);

define('ide/subviews/HeaderTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
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
define('ide/subviews/SettingsDialogTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
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
    + "</span>\r\n  <span data-target=\"TokenTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSTOKEN", {hash:{},data:data}))
    + "</span>\r\n</nav>\r\n\r\n<div class=\"modal-body\" id=\"SettingsBody\">\r\n  <section id=\"AccountTab\">\r\n    <dl class=\"dl-horizontal\">\r\n      <dt>"
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
    + "</dt>\r\n        <dd><input type=\"password\" class=\"input\" id=\"AccountNewPwd\" /></dd>\r\n      </dl>\r\n\r\n      <div id=\"AccountInfo\" class=\"empty-hide\"></div>\r\n\r\n      <div id=\"AccountPwdBtns\">\r\n        <button class=\"btn btn-blue\" id=\"AccountUpdatePwd\" disabled>"
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
    + "</a> </p>\r\n      <section class=\"token-table\">\r\n        <header class=\"clearfix\">\r\n          <span class=\"tokenName\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_TOKENTABLE_NAME", {hash:{},data:data}))
    + "</span>\r\n          <span class=\"tokenToken\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_TOKENTABLE_TOKEN", {hash:{},data:data}))
    + "</span>\r\n        </header>\r\n        <div class=\"scroll-wrap\">\r\n          <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n          <ul id=\"TokenList\" class=\"scroll-content\" data-empty=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_EMPTY", {hash:{},data:data}))
    + "\"></ul>\r\n        </div>\r\n      </section>\r\n    </div>\r\n    <div id=\"TokenRmConfirm\" class=\"hide\">\r\n      <h3 id=\"TokenRmTit\"></h3>\r\n      <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CONFIRM_TOKEN_RM", {hash:{},data:data}))
    + "</p>\r\n      <div class=\"cred-btn-wrap clearfix\">\r\n        <button class=\"right link-style\" id=\"TokenRmCancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\r\n        <button id=\"TokenRemove\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_REMOVE", {hash:{},data:data}))
    + "</button>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</div>\r\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/SettingsDialog',["./SettingsDialogTpl", 'i18n!nls/lang.js', "ApiRequest", "backbone"], function(SettingsTpl, lang, ApiRequest) {
    var SettingsDialog;
    SettingsDialog = Backbone.View.extend({
      events: {
        "click #SettingsNav span": "switchTab",
        "click #AccountPwd": "showPwd",
        "click #AccountCancelPwd": "hidePwd",
        "click #AccountUpdatePwd": "changePwd",
        "click .cred-setup, .cred-cancel": "showCredSetup",
        "click .cred-setup-cancel": "cancelCredSetup",
        "click #CredSetupRemove": "showRemoveCred",
        "click #CredRemoveConfirm": "removeCred",
        "click #CredSetupSubmit": "submitCred",
        "click #CredSetupConfirm": "confirmCred",
        "click #TokenCreate": "createToken",
        "click .tokenControl .icon-edit": "editToken",
        "click .tokenControl .icon-delete": "removeToken",
        "click .tokenControl .tokenDone": "doneEditToken",
        "click #TokenRemove": "confirmRmToken",
        "click #TokenRmCancel": "cancelRmToken",
        "keyup  #CredSetupAccount, #CredSetupAccessKey, #CredSetupSecretKey": "updateSubmitBtn",
        "change #CredSetupAccount, #CredSetupAccessKey, #CredSetupSecretKey": "updateSubmitBtn",
        "change #AccountCurrentPwd, #AccountNewPwd": "updatePwdBtn",
        "keyup  #AccountCurrentPwd, #AccountNewPwd": "updatePwdBtn"
      },
      initialize: function(options) {
        var attributes, tab;
        attributes = {
          username: App.user.get("username"),
          email: App.user.get("email"),
          account: App.user.get("account"),
          awsAccessKey: App.user.get("awsAccessKey"),
          awsSecretKey: App.user.get("awsSecretKey"),
          credRemoveTitle: sprintf(lang.ide.SETTINGS_CRED_REMOVE_TIT, App.user.get("username")),
          credNeeded: !!(_.reduce(_.map(MC.data.app_list, function(el) {
            return el.length;
          }), (function(m, n) {
            return m + n;
          }), 0))
        };
        modal(SettingsTpl(attributes));
        this.setElement($("#modal-box"));
        tab = 0;
        if (options) {
          tab = options.defaultTab || 0;
          if (tab === SettingsDialog.TAB.CredentialInvalid) {
            this.showCredSetup();
            $(".modal-close").hide();
            $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_VALIDATE);
          }
          if (tab < 0) {
            tab = Math.abs(tab);
          }
        }
        $("#SettingsNav").children().eq(tab).click();
        this.updateTokenTab();
      },
      updateCredSettings: function() {
        var attributes;
        attributes = {
          username: App.user.get("username"),
          email: App.user.get("email"),
          account: App.user.get("account"),
          awsAccessKey: App.user.get("awsAccessKey"),
          awsSecretKey: App.user.get("awsSecretKey"),
          credRemoveTitle: sprintf(lang.ide.SETTINGS_CRED_REMOVE_TIT, App.user.get("username"))
        };
        $("#modal-box").html(SettingsTpl(attributes));
        return $("#SettingsNav").children().eq(SettingsDialog.TAB.Credential).click();
      },
      switchTab: function(evt) {
        var $this;
        $this = $(evt.currentTarget);
        if ($this.hasClass("selected")) {
          return;
        }
        $("#SettingsBody").children().hide();
        $("#SettingsNav").children().removeClass("selected");
        $("#" + $this.addClass("selected").attr("data-target")).show();
      },
      showPwd: function() {
        $("#AccountPwd").hide();
        $("#AccountPwdWrap").show();
        $("#AccountCurrentPwd").focus();
      },
      hidePwd: function() {
        $("#AccountPwd").show();
        $("#AccountPwdWrap").hide();
        $("#AccountCurrentPwd, #AccountNewPwd").val("");
        $("#AccountInfo").empty();
      },
      updatePwdBtn: function() {
        var new_pwd, old_pwd;
        old_pwd = $("#AccountCurrentPwd").val() || "";
        new_pwd = $("#AccountNewPwd").val() || "";
        if (old_pwd.length && new_pwd.length) {
          $("#AccountUpdatePwd").removeAttr("disabled");
        } else {
          $("#AccountUpdatePwd").attr("disabled", "disabled");
        }
      },
      changePwd: function() {
        var new_pwd, old_pwd;
        old_pwd = $("#AccountCurrentPwd").val() || "";
        new_pwd = $("#AccountNewPwd").val() || "";
        if (new_pwd.length < 6) {
          $('#AccountInfo').text(lang.ide.SETTINGS_ERR_INVALID_PWD);
          return;
        }
        $("#AccountInfo").empty();
        $("#AccountUpdatePwd").attr("disabled", "disabled");
        App.user.changePassword(old_pwd, new_pwd).then(function() {
          notification('info', lang.ide.SETTINGS_UPDATE_PWD_SUCCESS);
          $("#AccountCancelPwd").click();
          $("#AccountUpdatePwd").removeAttr("disabled");
        }, function(err) {
          if (err.error === 2) {
            $('#AccountInfo').html("" + lang.ide.SETTINGS_ERR_WRONG_PWD + " <a href='/reset/' target='_blank'>" + lang.ide.SETTINGS_INFO_FORGET_PWD + "</a>");
          } else {
            $('#AccountInfo').text(lang.ide.SETTINGS_UPDATE_PWD_FAILURE);
          }
          return $("#AccountUpdatePwd").removeAttr("disabled");
        });
      },
      showCredSetup: function() {
        $("#CredentialTab").children().hide();
        $("#CredSetupWrap").show();
        $("#CredSetupAccount").focus()[0].select();
        $("#CredSetupRemove").toggle(App.user.hasCredential());
        this.updateSubmitBtn();
      },
      cancelCredSetup: function() {
        $("#CredentialTab").children().hide();
        if (App.user.hasCredential()) {
          $("#CredAwsWrap").show();
        } else {
          $("#CredDemoWrap").show();
        }
      },
      showRemoveCred: function() {
        $("#CredentialTab").children().hide();
        $("#CredRemoveWrap").show();
      },
      removeCred: function() {
        var self;
        $("#CredentialTab").children().hide();
        $("#CredRemoving").show();
        $("#modal-box .modal-close").hide();
        self = this;
        App.user.changeCredential().then(function() {
          self.updateCredSettings();
        }, function() {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_REMOVE);
          $("#modal-box .modal-close").show();
          return self.showCredSetup();
        });
      },
      updateSubmitBtn: function() {
        var accesskey, account, privatekey;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        if (account.length && accesskey.length && privatekey.length) {
          $("#CredSetupSubmit").removeAttr("disabled");
        } else {
          $("#CredSetupSubmit").attr("disabled", "disabled");
        }
      },
      submitCred: function() {
        var accesskey, privatekey, self;
        $("#CredentialTab").children().hide();
        $("#CredUpdating").show();
        $("#modal-box .modal-close").hide();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.validateCredential(accesskey, privatekey).then(function() {
          self.setCred();
        }, function() {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_VALIDATE);
          $("#modal-box .modal-close").show();
          self.showCredSetup();
        });
      },
      setCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.changeCredential(account, accesskey, privatekey, false).then(function() {
          return self.updateCredSettings();
        }, function(err) {
          if (err.error === ApiRequest.Errors.ChangeCredConfirm) {
            self.showCredConfirm();
          } else {
            self.showCredUpdateFail();
          }
        });
      },
      showCredUpdateFail: function() {
        $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_UPDATE);
        $("#modal-box .modal-close").show();
        return this.showCredSetup();
      },
      showCredConfirm: function() {
        $("#CredentialTab").children().hide();
        $("#CredConfirmWrap").show();
        return $("#modal-box .modal-close").show();
      },
      confirmCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        App.user.changeCredential(account, accesskey, privatekey, true).then(function() {
          return self.updateCredSettings();
        }, function() {
          return self.showCredUpdateFail();
        });
      },
      editToken: function(evt) {
        var $p, $t;
        $t = $(evt.currentTarget);
        $p = $t.closest("li").toggleClass("editing", true);
        $p.children(".tokenName").removeAttr("readonly").focus().select();
      },
      removeToken: function(evt) {
        var $p, name;
        $p = $(evt.currentTarget).closest("li");
        name = $p.children(".tokenName").val();
        this.rmToken = $p.children(".tokenToken").text();
        $("#TokenManager").hide();
        $("#TokenRmConfirm").show();
        $("#TokenRmTit").text(sprintf(lang.ide.SETTINGS_CONFIRM_TOKEN_RM_TIT, name));
      },
      createToken: function() {
        var self;
        $("#TokenCreate").attr("disabled", "disabled");
        self = this;
        App.user.createToken().then(function() {
          self.updateTokenTab();
          return $("#TokenCreate").removeAttr("disabled");
        }, function() {
          notification("error", "Fail to create token, please retry.");
          return $("#TokenCreate").removeAttr("disabled");
        });
      },
      doneEditToken: function(evt) {
        var $p;
        $p = $(evt.currentTarget).closest("li").removeClass("editing");
        $p.children(".tokenName").attr("readonly", true);
        App.user.updateToken($p.children(".tokenToken").text(), $p.children(".tokenName").val()).then(function() {}, function() {
          var oldName;
          oldName = "";
          $p.children(".tokenName").val(oldName);
          return notification("error", "Fail to update token, please retry.");
        });
      },
      confirmRmToken: function() {
        var self;
        $("#TokenRemove").attr("disabled", "disabled");
        self = this;
        App.user.removeToken(this.rmToken).then(function() {
          self.updateTokenTab();
          return self.cancelRmToken();
        }, function() {
          notification("Fail to delete token, please retry.");
          return self.cancelRmToken();
        });
      },
      cancelRmToken: function() {
        this.rmToken = "";
        $("#TokenRemove").removeAttr("disabled");
        $("#TokenManager").show();
        $("#TokenRmConfirm").hide();
      },
      updateTokenTab: function() {
        var tokens;
        tokens = App.user.get("tokens");
        $("#TokenManager").find(".token-table").toggleClass("empty", tokens.length === 0);
        if (tokens.length) {
          $("#TokenList").html(MC.template.accessTokenTable(tokens));
        } else {
          $("#TokenList").empty();
        }
      }
    });
    SettingsDialog.TAB = {
      CredentialInvalid: -1,
      Normal: 0,
      Credential: 1,
      Token: 2
    };
    return SettingsDialog;
  });

}).call(this);

(function() {
  define('ide/subviews/HeaderView',["./HeaderTpl", "./SettingsDialog", 'backbone'], function(tmpl, SettingsDialog) {
    var HeaderView;
    HeaderView = Backbone.View.extend({
      events: {
        'click #HeaderLogout': 'logout',
        'click #HeaderSettings': 'settings',
        'click #HeaderShortcuts': 'shortcuts',
        'DROPDOWN_CLOSE #HeaderNotification': 'dropdownClosed'
      },
      initialize: function() {
        this.listenTo(App.user, "change", this.update);
        this.listenTo(App.model, "change:notification", this.updateNotification);
        this.setElement($(tmpl(App.user.toJSON())).prependTo("#header-wrapper"));
      },
      logout: function() {
        return App.logout();
      },
      shortcuts: function() {
        return modal(MC.template.shortkey());
      },
      settings: function() {
        return new SettingsDialog();
      },
      update: function() {
        return $("#HeaderUser").data("tooltip", App.user.get("email")).children("span").text(App.user.get("username"));
      },
      setAlertCount: function(count) {
        return $('#NotificationCounter').text(count || "");
      },
      updateNotification: function() {
        var html, i, notification, unread_num, _i, _len;
        console.info("Notification Updated");
        notification = App.model.get("notification");
        html = "";
        unread_num = 0;
        for (_i = 0, _len = notification.length; _i < _len; _i++) {
          i = notification[_i];
          html += MC.template.headerNotifyItem(i);
          if (!i.is_readed) {
            unread_num++;
          }
        }
        this.setAlertCount(unread_num);
        $("#notification-panel-wrapper").find(".scroll-content").html(html);
        $("#notification-panel-wrapper").css("max-height", Math.ceil(window.innerHeight * 0.8));
        return null;
      },
      dropdownClosed: function() {
        $("#notification-panel-wrapper").find(".scroll-content").children().removeClass("unread");
        this.setAlertCount();
        App.model.markNotificationRead();
        return null;
      }
    });
    return HeaderView;
  });

}).call(this);

define('ide/subviews/WelcomeTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
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
(function() {
  define('ide/subviews/WelcomeDialog',["./WelcomeTpl", 'i18n!nls/lang.js', "backbone"], function(WelcomeTpl, lang) {
    var WelcomeDialog;
    WelcomeDialog = Backbone.View.extend({
      events: {
        "click #WelcomeSkip": "skip",
        "click #WelcomeBack": "back",
        "click #WelcomeDone": "done",
        "click #WelcomeClose": "close",
        "click #CredSetupSubmit": "submitCred",
        "keyup #CredSetupAccount, #CredSetupAccessKey, #CredSetupSecretKey": "updateSubmitBtn"
      },
      initialize: function(options) {
        var attributes;
        attributes = {
          username: App.user.get("username")
        };
        modal(WelcomeTpl(attributes));
        this.setElement($("#modal-box"));
      },
      skip: function() {
        $("#WelcomeSettings").hide();
        return $("#WelcomeSkipWarning").show();
      },
      back: function() {
        $("#WelcomeSettings").show();
        return $("#WelcomeSkipWarning").hide();
      },
      done: function() {
        $("#WelcomeSettings, #WelcomeSkipWarning, #WelcomeCredUpdate").hide();
        $("#WelcomeDoneWrap").show();
        if (App.user.hasCredential()) {
          $("#WelcomeDoneTitDemo").hide();
          return $("#WelcomeDoneTit").children("span").text(App.user.get("account"));
        } else {
          $("#WelcomeDoneTitDemo").show();
          return $("#WelcomeDoneTit").hide();
        }
      },
      close: function() {
        return modal.close();
      },
      updateSubmitBtn: function() {
        var accesskey, account, privatekey;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        if (account.length && accesskey.length && privatekey.length) {
          $("#CredSetupSubmit").removeAttr("disabled");
        } else {
          $("#CredSetupSubmit").attr("disabled", "disabled");
        }
      },
      submitCred: function() {
        var accesskey, privatekey, self;
        $("#WelcomeSettings").hide();
        $("#WelcomeCredUpdate").show();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.validateCredential(accesskey, privatekey).then(function() {
          self.setCred();
        }, function() {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_VALIDATE);
          self.showCredSetup();
        });
      },
      setCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.changeCredential(account, accesskey, privatekey, true).then(function() {
          self.done();
        }, function(err) {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_UPDATE);
          self.showCredSetup();
        });
      },
      showCredSetup: function() {
        $("#WelcomeDialog").children().hide();
        $("#WelcomeSettings").show();
        $("#CredSetupAccount").focus()[0].select();
        this.updateSubmitBtn();
      }
    });
    return WelcomeDialog;
  });

}).call(this);


/*
----------------------------
  The View for application
----------------------------
 */

(function() {
  define('ide/ApplicationView',["backbone", "./subviews/SessionDialog", "./subviews/HeaderView", "./subviews/WelcomeDialog"], function(Backbone, SessionDialog, HeaderView, WelcomeDialog) {
    return Backbone.View.extend({
      el: "body",
      events: {
        "click .click-select": "selectText"
      },
      initialize: function() {
        this.header = new HeaderView();
        this.listenTo(App.user, "change:state", this.toggleWelcome);

        /* env:dev                                                                             env:dev:end */

        /* env:debug */
        require(["./ide/subviews/DebugTool"], function(DT) {
          return new DT();
        });

        /* env:debug:end */
      },
      toggleWSStatus: function(isConnected) {
        if (isConnected) {
          return $(".disconnected-msg").remove();
        } else {
          if ($(".disconnected-msg").show().length > 0) {
            return;
          }
          return $(MC.template.disconnectedMsg()).appendTo("body").on("mouseover", function() {
            $(".disconnected-msg").addClass("hovered");
            $("body").on("mousemove.disconnectedmsg", function(e) {
              var msg, pos, x, y;
              msg = $(".disconnected-msg");
              if (!msg.length) {
                $("body").off("mousemove.disconnectedmsg");
                return;
              }
              pos = msg.offset();
              x = e.pageX;
              y = e.pageY;
              if (x < pos.left || y < pos.top || x >= pos.left + msg.outerWidth() || y >= pos.top + msg.outerHeight()) {
                $("body").off("mousemove.disconnectedmsg");
                msg.removeClass("hovered");
              }
            });
          });
        }
      },
      toggleWelcome: function() {
        if (App.user.isFirstVisit()) {
          new WelcomeDialog();
        }
      },
      showSessionDialog: function() {
        return (new SessionDialog()).promise();
      },
      selectText: function(event) {
        var e, range;
        try {
          range = document.body.createTextRange();
          range.moveToElementText(event.currentTarget);
          range.select();
          console.warn("Select text by document.body.createTextRange");
        } catch (_error) {
          e = _error;
          if (window.getSelection) {
            range = document.createRange();
            range.selectNode(event.currentTarget);
            window.getSelection().addRange(range);
            console.warn("Select text by document.createRange");
          }
        }
        return false;
      }
    });
  });

}).call(this);


/*
----------------------------
  The Model for application
----------------------------

  This model holds all the data of the user in our database. For example, stack list / app list / notification things and extra.
 */

(function() {
  define('ide/ApplicationModel',["backbone", "./Websocket", "event", "constant"], function(Backbone, Websocket, ide_event, constant) {
    return Backbone.Model.extend({
      defaults: function() {
        return {
          notification: [],
          __websocketReady: false
        };
      },
      initialize: function() {
        this.__initializeNotification();
      },
      __initializeNotification: function() {

        /*
        ide_event.onLongListen ide_event.SWITCH_DASHBOARD, () -> return
        ide_event.onLongListen ide_event.SWITCH_TAB, () -> return
        ide_event.onListen ide_event.OPEN_DESIGN, () -> return
         */
        var self;
        self = this;
        return ide_event.onLongListen(ide_event.UPDATE_REQUEST_ITEM, function(idx) {
          return self.__processSingleNotification(idx);
        });
      },
      __triggerChange: _.debounce(function() {
        return this.trigger("change:notification");
      }, 300),
      __processSingleNotification: function(idx) {
        var i, info_list, item, req, same_req, _i, _len;
        req = App.WS.collection.request.findOne({
          '_id': idx
        });
        if (!req) {
          return;
        }
        item = this.__parseRequestInfo(req);
        if (!item) {
          return;
        }
        info_list = this.attributes.notification;
        for (idx = _i = 0, _len = info_list.length; _i < _len; idx = ++_i) {
          i = info_list[idx];
          if (i.id === item.id) {
            same_req = i;
            break;
          }
        }
        if (same_req && same_req.is_request === item.is_request && same_req.is_process === item.is_process && same_req.is_complete === item.is_complete) {
          return;
        }
        item.is_readed = !App.WS.isReady();
        info_list.splice(idx, 1);
        info_list.splice(0, 0, item);
        this.__triggerChange();
        return null;
      },
      __parseRequestInfo: function(req) {
        var duration, item, lst, time_begin, time_end;
        if (!req.brief) {
          return;
        }
        lst = req.brief.split(' ');
        item = {
          is_readed: true,
          is_request: req.state === constant.OPS_STATE.OPS_STATE_PENDING,
          is_process: req.state === constant.OPS_STATE.OPS_STATE_INPROCESS,
          is_complete: req.state === constant.OPS_STATE.OPS_STATE_DONE,
          operation: lst[0].toLowerCase(),
          name: lst[lst.length - 1],
          region_label: constant.REGION_SHORT_LABEL[req.region],
          time: req.time_end
        };
        item = $.extend({}, req, item);
        if (req.state === constant.OPS_STATE.OPS_STATE_FAILED) {
          item.error = req.data;
        } else if (req.state === constant.OPS_STATE.OPS_STATE_INPROCESS) {
          item.time = req.time_begin;
        }
        if (req.state !== constant.OPS_STATE.OPS_STATE_PENDING) {
          item.time_str = MC.dateFormat(new Date(item.time * 1000), "hh:mm yyyy-MM-dd");
          if (req.state !== constant.OPS_STATE.OPS_STATE_INPROCESS) {
            time_begin = parseInt(req.time_begin, 10);
            time_end = parseInt(req.time_end, 10);
            if (!isNaN(time_begin) && !isNaN(time_end) && time_end >= time_begin) {
              duration = time_end - time_begin;
              if (duration < 60) {
                item.duration = "Took " + duration + " sec.";
              } else {
                item.duration = "Took " + (Math.round(duration / 60)) + " min.";
              }
            }
          }
        }
        if (item.rid.search('stack') === 0) {
          item.name = lst[2];
        }
        item.is_terminated = item.is_complete && item.operation === 'terminate';
        return item;
      },
      markNotificationRead: function() {
        var i, _i, _len, _ref;
        _ref = this.attributes.notification;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.is_readed = true;
        }
      }
    });
  });

}).call(this);


/*
----------------------------
  User is a model containing user's data. Nothing more, nothing less.
  Currently most of the data is stored in cookie. But in the future,
  it might just fetch user data at the beginning.
----------------------------
 */

(function() {
  define('ide/User',["ApiRequest", "event", "backbone"], function(ApiRequest, ide_event) {
    var UserState;
    UserState = {
      NotFirstTime: 2
    };
    return Backbone.Model.extend({
      initialize: function() {
        this.set({
          usercode: $.cookie("usercode"),
          username: MC.base64Decode($.cookie("usercode")),
          session: $.cookie("session_id")
        });
      },
      hasCredential: function() {
        return !!this.get("account");
      },
      isFirstVisit: function() {
        return !(UserState.NotFirstTime & this.get("state"));
      },
      userInfoAccuired: function(result) {
        var idx, res, t, _i, _len, _ref;
        res = {
          email: MC.base64Decode(result.email),
          repo: result.mod_repo,
          tag: result.mod_tag,
          state: parseInt(result.state, 10),
          intercomHash: result.intercom_secret,
          account: result.account_id,
          awsAccessKey: result.access_key,
          awsSecretKey: result.secret_key,
          tokens: result.tokens || [],
          defaultToken: ""
        };
        if (result.account_id === "demo_account") {
          res.account = res.awsAccessKey = res.awsSecretKey = "";
        }
        _ref = res.tokens;
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          t = _ref[idx];
          if (!t.name) {
            res.defaultToken = t.token;
            res.tokens.splice(idx, 1);
            break;
          }
        }
        this.set(res);
        if (this.isFirstVisit()) {
          ApiRequest("updateAccount", {
            params: {
              state: this.get("state") | UserState.NotFirstTime
            }
          });
        }
      },
      bootIntercom: function() {
        var intId;
        if (!window.Intercom) {
          intId = setInterval((function(_this) {
            return function() {
              if (window.Intercom) {
                console.log("Intercom Loaded, Booting Intercom");
                clearInterval(intId);
                _this.bootIntercom();
              }
            };
          })(this), 1000);
          return;
        }
        window.Intercom("boot", {
          app_id: "3rp02j1w",
          email: this.get("email"),
          username: this.get("username"),
          user_hash: this.get("intercomHash"),
          widget: {
            'activator': '#feedback'
          }
        });
      },
      fetch: function() {
        return ApiRequest("login", {
          username: this.get("username"),
          password: this.get("session")
        }).then((function(_this) {
          return function(result) {
            _this.userInfoAccuired(result);

            /* env:prod */
            return _this.bootIntercom();

            /* env:prod:end */
          };
        })(this), function(err) {
          if (err.error < 0) {
            window.location.reload();
          } else {
            App.logout();
          }
          throw err;
        });
      },
      acquireSession: function(password) {
        return ApiRequest("login", {
          username: this.get("username"),
          password: password
        }).then((function(_this) {
          return function(result) {
            $.cookie("session_id", result.session_id, {
              expires: 30,
              path: '/'
            });
            _this.set("session", result.session_id);
            _this.userInfoAccuired(result);
            _this.trigger("SessionUpdated");
          };
        })(this));
      },
      logout: function() {
        var cValue, ckey, domain, _ref;
        domain = {
          "domain": window.location.hostname.replace("ide", "")
        };
        _ref = $.cookie();
        for (ckey in _ref) {
          cValue = _ref[ckey];
          $.removeCookie(ckey, domain);
          $.removeCookie(ckey);
        }
      },
      changePassword: function(oldPwd, newPwd) {
        return ApiRequest("updateAccount", {
          params: {
            password: oldPwd,
            new_password: newPwd
          }
        });
      },
      validateCredential: function(accessKey, secretKey) {
        return ApiRequest("validateCred", {
          access_key: accessKey,
          secret_key: secretKey
        });
      },
      changeCredential: function(account, accessKey, secretKey, force) {
        var self;
        if (account == null) {
          account = "";
        }
        if (accessKey == null) {
          accessKey = "";
        }
        if (secretKey == null) {
          secretKey = "";
        }
        if (force == null) {
          force = false;
        }
        self = this;
        return ApiRequest("updateCred", {
          access_key: accessKey,
          secret_key: secretKey,
          account_id: account,
          force: force
        }).then(function() {
          var attr;
          attr = {
            account: account,
            awsAccessKey: accessKey,
            awsSecretKey: secretKey
          };
          if (attr.awsAccessKey.length > 6) {
            attr.awsAccessKey = (new Array(accessKey.length - 6)).join("*") + accessKey.substr(-6);
          }
          if (attr.awsSecretKey.length > 6) {
            attr.awsSecretKey = (new Array(secretKey.length - 6)).join("*") + secretKey.substr(-6);
          }
          self.set(attr);
          self.trigger("change:credential");
          ide_event.trigger(ide_event.UPDATE_AWS_CREDENTIAL);
        });
      },
      createToken: function() {
        var base, nameMap, newName, self, t, tmpl, _i, _len, _ref;
        tmpl = "MyToken";
        base = 1;
        nameMap = {};
        _ref = this.attributes.tokens;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          nameMap[t.name] = true;
        }
        while (true) {
          newName = tmpl + base;
          if (nameMap[newName]) {
            base += 1;
          } else {
            break;
          }
        }
        self = this;
        return ApiRequest("token_create", {
          token_name: newName
        }).then(function(res) {
          self.attributes.tokens.splice(0, 0, {
            name: res[0],
            token: res[1]
          });
        });
      },
      removeToken: function(token) {
        var idx, self, t, _i, _len, _ref;
        _ref = this.attributes.tokens;
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          t = _ref[idx];
          if (t.token === token) {
            break;
          }
        }
        self = this;
        return ApiRequest("token_remove", {
          token: token,
          token_name: t.name
        }).then(function(res) {
          idx = self.attributes.tokens.indexOf(t);
          if (idx >= 0) {
            self.attributes.tokens.splice(idx, 1);
          }
        });
      },
      updateToken: function(token, newName) {
        var self;
        self = this;
        return ApiRequest("token_update", {
          token: token,
          new_token_name: newName
        }).then(function(res) {
          var idx, t, _i, _len, _ref;
          _ref = self.attributes.tokens;
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            t = _ref[idx];
            if (t.token === token) {
              t.name = newName;
              break;
            }
          }
        });
      }
    });
  });

}).call(this);


/*
----------------------------
  This is the core / entry point / controller of the whole IDE.
----------------------------

  It contains some basical logics to maintain the IDE. And it holds other components
  to provide other functionality
 */

(function() {
  define('ide/Application',["./Websocket", "./ApplicationView", "./ApplicationModel", "./User", "./subviews/SettingsDialog", "common_handle", "event", "vpc_model", "constant"], function(Websocket, ApplicationView, ApplicationModel, User, SettingsDialog, common_handle, ide_event, vpc_model, constant) {
    var VisualOps;
    VisualOps = function() {
      if (window.App) {
        console.error("Application is already created.");
        return;
      }
      window.App = this;
    };
    VisualOps.prototype.initialize = function() {
      this.__createUser();
      this.__createWebsocket();
      this.model = new ApplicationModel();
      this.__view = new ApplicationView();
      return this.user.fetch();
    };
    VisualOps.prototype.__createWebsocket = function() {
      this.WS = new Websocket();
      this.WS.on("Disconnected", (function(_this) {
        return function() {
          return _this.acquireSession();
        };
      })(this));
      this.WS.on("StatusChanged", (function(_this) {
        return function(isConnected) {
          console.info("Websocket Status changed, isConnected:", isConnected);
          return _this.__view.toggleWSStatus(isConnected);
        };
      })(this));
    };
    VisualOps.prototype.__createUser = function() {
      this.user = new User();
      this.user.on("SessionUpdated", (function(_this) {
        return function() {
          ide_event.trigger(ide_event.UPDATE_APP_LIST);
          ide_event.trigger(ide_event.UPDATE_DASHBOARD);
          return _this.WS.subscribe();
        };
      })(this));
      this.user.on("change:credential", (function(_this) {
        return function() {
          return _this.__onCredentialChanged();
        };
      })(this));
    };
    VisualOps.prototype.__onCredentialChanged = function() {
      vpc_model.DescribeAccountAttributes({
        sender: vpc_model
      }, App.user.get('usercode'), App.user.get('session'), '', ["supported-platforms", "default-vpc"]);
      return vpc_model.once('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', function(result) {
        var regionAttrSet;
        console.log('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN');
        if (result.is_error) {
          return;
        }
        regionAttrSet = result.resolved_data;
        return _.map(constant.REGION_KEYS, function(value) {
          var default_vpc, support_platform;
          if (regionAttrSet[value] && regionAttrSet[value].accountAttributeSet) {
            support_platform = regionAttrSet[value].accountAttributeSet.item[0].attributeValueSet.item;
            if (support_platform && $.type(support_platform) === "array") {
              if (support_platform.length === 2) {
                MC.data.account_attribute[value].support_platform = support_platform[0].attributeValue + ',' + support_platform[1].attributeValue;
              } else if (support_platform.length === 1) {
                MC.data.account_attribute[value].support_platform = support_platform[0].attributeValue;
              }
            }
            default_vpc = regionAttrSet[value].accountAttributeSet.item[1].attributeValueSet.item;
            if (default_vpc && $.type(default_vpc) === "array" && default_vpc.length === 1) {
              MC.data.account_attribute[value].default_vpc = default_vpc[0].attributeValue;
            }
            return null;
          }
        });
      });
    };
    VisualOps.prototype.acquireSession = function() {
      ide_event.trigger(ide_event.SWITCH_MAIN);
      return this.__view.showSessionDialog();
    };
    VisualOps.prototype.logout = function() {
      App.user.logout();
      window.location.href = "/login/";
    };
    VisualOps.prototype.showSettings = function(tab) {
      return new SettingsDialog({
        defaultTab: tab
      });
    };
    VisualOps.prototype.showSettings.TAB = SettingsDialog.TAB;
    return VisualOps;
  });

}).call(this);

