
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
        imports: new Meteor.Collection("imports", opts),
        user_state: new Meteor.Collection("user", opts)
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
      this.connection.subscribe("user", usercode, session);
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
      var self;
      self = this;
      this.collection.user_state.find().fetch();
      this.collection.user_state.find().observeChanges({
        added: function(idx, dag) {
          return self.trigger("userStateChange", idx, dag);
        },
        changed: function(idx, dag) {
          return self.trigger("userStateChange", idx, dag);
        }
      });
      this.collection.request.find().fetch();
      this.collection.request.find().observeChanges({
        added: function(idx, dag) {
          return self.trigger("requestChange", idx, dag);
        },
        changed: function(idx, dag) {
          return self.trigger("requestChange", idx, dag);
        }
      });
      this.collection.imports.find().fetch();
      this.collection.imports.find().observe({
        added: function(idx, dag) {
          return self.trigger("visualizeUpdate", idx);
        },
        changed: function(idx, dag) {
          return self.trigger("visualizeUpdate", idx);
        }
      });
      this.collection.status.find().fetch();
      return this.collection.status.find().observe({
        added: function(idx, statusData) {
          ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA, 'add', idx, statusData);
          return ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR, idx ? [idx.res_id] : []);
        },
        changed: function(newDocument, oldDocument) {
          ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA, 'change', newDocument, oldDocument);
          return ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR, newDocument ? [newDocument.res_id] : []);
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
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section style=\"width:400px;\" class=\"invalid-session\" id=\"SessionDialog\">\n  <div class=\"confirmSession\">\n  <div class=\"modal-header\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION", {hash:{},data:data}))
    + "</h3></div>\n\n  <article class=\"modal-body\">\n    <div class=\"modal-text-major\">\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION_ERROR", {hash:{},data:data}))
    + "</p>\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION_ACTION", {hash:{},data:data}))
    + "</p>\n    </div>\n    <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION_WARNING", {hash:{},data:data}))
    + "</div>\n  </article>\n\n  <footer class=\"modal-footer\">\n    <button id=\"SessionReconnect\" class=\"btn btn-blue\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_LBL_RECONNECT", {hash:{},data:data}))
    + "</button>\n    <button id=\"SessionClose\" class=\"btn btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_LBL_CLOSE_SESSION", {hash:{},data:data}))
    + "</button>\n  </footer>\n  </div>\n\n  <div class=\"reconnectSession\" style=\"display:none;\">\n  <div class=\"modal-header\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_RECONNECT_SESSION", {hash:{},data:data}))
    + "</h3></div>\n  <article class=\"modal-body\">\n    <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_PROVIDE_PASSWORD_TO_RECONNECT", {hash:{},data:data}))
    + "</div>\n    <div class=\"modal-input\">\n      <input type=\"password\" id=\"SessionPassword\" class=\"input\" placeholder=\"Password\" style=\"width:200px;\" autofocus>\n    </div>\n  </article>\n  <footer class=\"modal-footer\">\n    <button id=\"SessionConnect\" class=\"btn btn-blue\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_LBL_CONNECT", {hash:{},data:data}))
    + "</button>\n    <button id=\"SessionClose2\" class=\"btn btn-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_LBL_CLOSE_SESSION", {hash:{},data:data}))
    + "</button>\n  </footer>\n  </div>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/SessionDialog',['i18n!/nls/lang.js', "./SessionDialogTpl", "backbone"], function(lang, template) {
    var CurrentSessionDialog, SessionDialogView;
    CurrentSessionDialog = null;
    SessionDialogView = Backbone.View.extend({
      events: {
        'click #SessionReconnect': 'showReconnect',
        'click #SessionClose': 'closeSession',
        'click #SessionClose2': 'closeSession',
        'click #SessionConnect': 'connect',
        'keyup #SessionPassword': 'passwordChanged'
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
          notification('error', lang.NOTIFY.WARN_AUTH_FAILED);
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


  buffer += "<nav id=\"header\">\n  <section class=\"voquota tooltip\" data-tooltip=\"<span>3600 free instance hours used up <br>\nYou are in limited status now</span>\" data-tooltip-type=\"html\">\n      <div class=\"payment-exclamation\">!</div>\n  </section>\n  <a id=\"support\" class=\"icon-support\" href=\"mailto:3rp02j1w@incoming.intercom.io\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_LBL_SUPPORT", {hash:{},data:data}))
    + "</a>\n\n  <section class=\"dropdown\">\n    <div id=\"HeaderNotification\" class=\"js-toggle-dropdown\">\n      <i class=\"icon-notification\"></i>\n      <span id=\"NotificationCounter\"></span>\n    </div>\n\n    <div class=\"dropdown-menu\">\n      <div id=\"notification-panel-wrapper\" class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <ul class=\"scroll-content\"></ul>\n\n        <div class=\"notification-empty\">\n          <div class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.HEAD_LABEL_BLANK_NOTIFICATION", {hash:{},data:data}))
    + "</div>\n          <div class=\"description\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_BLANK_NOTIFICATION_DESC", {hash:{},data:data}))
    + "</div>\n        </div>\n      </div>\n\n    </div>\n  </section>\n\n  <section class=\"dropdown\">\n    <div id=\"HeaderUser\" class=\"js-toggle-dropdown\">\n      <span class=\"truncate left\" style=\"max-width:100px;\">"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n      <i class=\"icon-caret-down\"></i>\n    </div>\n\n    <ul class=\"dropdown-menu\">\n      <li id=\"HeaderShortcuts\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_KEY_SHORT", {hash:{},data:data}))
    + "</li>\n      <li><a class=\"dis-blk\" href=\"http://docs.visualops.io\" target=\"_blank\" >"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_DOC", {hash:{},data:data}))
    + "</a></li>\n      <li id=\"HeaderSettings\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_SETTING", {hash:{},data:data}))
    + "</li>\n      <li id=\"HeaderBilling\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_BILLING", {hash:{},data:data}))
    + "</li>\n      <li id=\"HeaderLogout\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_MENUITEM_LOGOUT", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n</nav>";
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
  buffer += "\n        <button id=\"CredSetupRemove\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_REMOVE_CREDENTIAL", {hash:{},data:data}))
    + "</button>\n        ";
  return buffer;
  }

  buffer += "<nav id=\"SettingsNav\">\n  <span data-target=\"AccountTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT", {hash:{},data:data}))
    + "</span>\n  <span data-target=\"CredentialTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CREDENTIAL", {hash:{},data:data}))
    + "</span>\n  <span data-target=\"TokenTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCESSTOKEN", {hash:{},data:data}))
    + "</span>\n</nav>\n\n<div class=\"tabContent\" id=\"SettingsBody\">\n  <section id=\"AccountTab\">\n    <dl class=\"dl-horizontal\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_USERNAME", {hash:{},data:data}))
    + "</dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n\n    <dl class=\"dl-horizontal\">\n      <dt class=\"accountFullNameRO\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_FULLNAME", {hash:{},data:data}))
    + "</dt><dd class=\"accountFullNameRO\"> <span class=\"fullNameText\">"
    + escapeExpression(((stack1 = (depth0 && depth0.firstName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.lastName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " </span> <button class=\"icon-edit link-style tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_FULLNAME", {hash:{},data:data}))
    + "' id=\"AccountFullName\"></button></dd>\n    </dl>\n    <div id=\"AccountFullNameWrap\" class=\"accountEditWrap\">\n      <dl class=\"dl-horizontal\">\n          <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "FIRST_NAME", {hash:{},data:data}))
    + "</dt>\n          <dd><input type=\"text\" class=\"input\" id=\"AccountFirstName\"/></dd>\n          <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "LAST_NAME", {hash:{},data:data}))
    + "</dt>\n          <dd><input type=\"text\" class=\"input\" id=\"AccountLastName\"/></dd>\n      </dl>\n      <div id=\"AccountFullNameInfo\" class=\"empty-hide\"></div>\n      <div class=\"accountPwdBtns\">\n          <button class=\"btn btn-blue\" id=\"AccountUpdateFullName\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\n          <span id=\"AccountCancelFullName\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\n      </div>\n    </div>\n\n    <dl class=\"dl-horizontal\">\n      <dt class=\"accountEmailRO\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_ACCOUNT_EMAIL", {hash:{},data:data}))
    + "</dt><dd class=\"accountEmailRO\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.email)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span><button class=\"icon-edit link-style tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_NEW_EMAIL", {hash:{},data:data}))
    + "' id=\"AccountEmail\"></button></dd>\n    </dl>\n    <div id=\"AccountEmailWrap\" class=\"accountEditWrap\">\n      <dl class=\"dl-horizontal\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_NEW_EMAIL", {hash:{},data:data}))
    + "</dt>\n        <dd><input type=\"string\" class=\"input\" id=\"AccountNewEmail\" /></dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\n        <dd><input type=\"password\" class=\"input\" id=\"AccountEmailPwd\" /></dd>\n      </dl>\n\n      <div id=\"AccountEmailInfo\" class=\"empty-hide\"></div>\n\n      <div class=\"accountPwdBtns\">\n        <button class=\"btn btn-blue\" id=\"AccountUpdateEmail\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_UPDATE", {hash:{},data:data}))
    + "</button>\n        <span id=\"AccountCancelEmail\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_BTN_CANCEL", {hash:{},data:data}))
    + "</span>\n      </div>\n    </div>\n\n    <button id=\"AccountPwd\" class=\"link-style\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CHANGE_PASSWORD", {hash:{},data:data}))
    + "</button>\n    <div id=\"AccountPwdWrap\" class=\"accountEditWrap\">\n\n      <dl class=\"dl-horizontal\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_LABEL_CURRENT_PASSWORD", {hash:{},data:data}))
    + "</dt>\n        <dd><input type=\"password\" class=\"input\" id=\"AccountCurrentPwd\" /></dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "HAED_LABEL_NEW_PASSWORD", {hash:{},data:data}))
    + "</dt>\n        <dd><input type=\"password\" class=\"input\" id=\"AccountNewPwd\" /></dd>\n      </dl>\n\n      <div id=\"AccountInfo\" class=\"empty-hide\"></div>\n\n      <div class=\"accountPwdBtns\">\n        <button class=\"btn btn-blue\" id=\"AccountUpdatePwd\" disabled>"
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
    + "</p><div class=\"loading-spinner\"></div></div>\n\n  </section>\n\n  <section id=\"TokenTab\">\n    <div id=\"TokenManager\">\n      <p class=\"clearfix\"><button class=\"btn btn-blue right\" id=\"TokenCreate\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_CREATE", {hash:{},data:data}))
    + "</button>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN", {hash:{},data:data}))
    + "<a href=\"http://docs.visualops.io/app_management/reload_states.html\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_LINK", {hash:{},data:data}))
    + "</a> </p>\n      <section class=\"token-table\">\n        <header class=\"clearfix\">\n          <span class=\"tokenName\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_TOKENTABLE_NAME", {hash:{},data:data}))
    + "</span>\n          <span class=\"tokenToken\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_TOKENTABLE_TOKEN", {hash:{},data:data}))
    + "</span>\n        </header>\n        <div class=\"scroll-wrap\">\n          <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n          <ul id=\"TokenList\" class=\"scroll-content\" data-empty=\""
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_INFO_TOKEN_EMPTY", {hash:{},data:data}))
    + "\"></ul>\n        </div>\n      </section>\n    </div>\n    <div id=\"TokenRmConfirm\" class=\"hide\">\n      <h3 id=\"TokenRmTit\"></h3>\n      <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CONFIRM_TOKEN_RM", {hash:{},data:data}))
    + "</p>\n      <div class=\"cred-btn-wrap clearfix\">\n        <button class=\"right link-style\" id=\"TokenRmCancel\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_LABEL_ACCOUNT_CANCEL", {hash:{},data:data}))
    + "</button>\n        <button id=\"TokenRemove\" class=\"btn btn-red right\">"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_BTN_TOKEN_REMOVE", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n  </section>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/SettingsDialog',["./SettingsDialogTpl", 'i18n!/nls/lang.js', "ApiRequest", "UI.modalplus", "backbone"], function(SettingsTpl, lang, ApiRequest, Modal) {
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
        "keyup  #AccountCurrentPwd, #AccountNewPwd": "updatePwdBtn",
        "click #AccountEmail": "showEmail",
        "click #AccountCancelEmail": "hideEmail",
        "click #AccountUpdateEmail": "changeEmail",
        "click #AccountCancelFullName": "hideFullName",
        "change #AccountNewEmail, #AccountEmailPwd": "updateEmailBtn",
        "keyup  #AccountNewEmail, #AccountEmailPwd": "updateEmailBtn",
        "click #AccountUpdateFullName": "changeFullName",
        "change #AccountFirstName, #AccountLastName": "updateFullNameBtn",
        "keyup #AccountFirstName, #AccountLastName": "updateFullNameBtn",
        'click #AccountFullName': "showFullName"
      },
      initialize: function(options) {
        var attributes, tab;
        attributes = {
          username: App.user.get("username"),
          firstName: App.user.get("firstName") || "",
          lastName: App.user.get("lastName") || "",
          email: App.user.get("email"),
          account: App.user.get("account"),
          awsAccessKey: App.user.get("awsAccessKey"),
          awsSecretKey: App.user.get("awsSecretKey"),
          credRemoveTitle: sprintf(lang.IDE.SETTINGS_CRED_REMOVE_TIT, App.user.get("username")),
          credNeeded: !!App.model.appList().length
        };
        this.modal = new Modal({
          template: SettingsTpl(attributes),
          title: lang.IDE.HEAD_LABEL_SETTING,
          disableFooter: true,
          compact: true,
          width: "490px"
        });
        this.setElement(this.modal.tpl);
        this.modal.$("#SettingsNav span[data-target='AccountTab']").click();
        this.modal.resize();
        tab = 0;
        if (options) {
          tab = options.defaultTab || 0;
          if (tab === SettingsDialog.TAB.CredentialInvalid) {
            this.showCredSetup();
            this.modal.tpl.find(".modal-close").hide();
            this.modal.tpl.find("#CredSetupMsg").text(lang.IDE.SETTINGS_ERR_CRED_VALIDATE);
          }
          if (tab < 0) {
            tab = Math.abs(tab);
          }
        }
        this.modal.$("#SettingsNav").children().eq(tab).click();
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
          credRemoveTitle: sprintf(lang.IDE.SETTINGS_CRED_REMOVE_TIT, App.user.get("username"))
        };
        this.modal.setContent(SettingsTpl(attributes));
        return this.modal.$("#SettingsNav").children().eq(SettingsDialog.TAB.Credential).click();
      },
      switchTab: function(evt) {
        var $this;
        $this = $(evt.currentTarget);
        if ($this.hasClass("selected")) {
          return;
        }
        this.modal.$("#SettingsBody").children().hide();
        this.modal.$("#SettingsNav").children().removeClass("selected");
        this.modal.$("#" + $this.addClass("selected").attr("data-target")).show();
      },
      showPwd: function() {
        this.modal.$("#AccountPwd").hide();
        this.modal.$("#AccountPwdWrap").show();
        this.modal.$("#AccountCurrentPwd").focus();
      },
      hidePwd: function() {
        this.modal.$("#AccountPwd").show();
        this.modal.$("#AccountPwdWrap").hide();
        this.modal.$("#AccountCurrentPwd, #AccountNewPwd").val("");
        this.modal.$("#AccountInfo").empty();
      },
      updatePwdBtn: function() {
        var new_pwd, old_pwd;
        old_pwd = this.modal.$("#AccountCurrentPwd").val() || "";
        new_pwd = this.modal.$("#AccountNewPwd").val() || "";
        if (old_pwd.length && new_pwd.length) {
          this.modal.$("#AccountUpdatePwd").removeAttr("disabled");
        } else {
          this.modal.$("#AccountUpdatePwd").attr("disabled", "disabled");
        }
      },
      changePwd: function() {
        var new_pwd, old_pwd, that;
        that = this;
        old_pwd = this.modal.$("#AccountCurrentPwd").val() || "";
        new_pwd = this.modal.$("#AccountNewPwd").val() || "";
        if (new_pwd.length < 6) {
          this.modal.$('#AccountInfo').text(lang.IDE.SETTINGS_ERR_INVALID_PWD);
          return;
        }
        this.modal.$("#AccountInfo").empty();
        this.modal.$("#AccountUpdatePwd").attr("disabled", "disabled");
        App.user.changePassword(old_pwd, new_pwd).then(function() {
          notification('info', lang.NOTIFY.SETTINGS_UPDATE_PWD_SUCCESS);
          $("#AccountCancelPwd").click();
        }, function(err) {
          if (err.error === 2) {
            that.modal.$('#AccountInfo').html("" + lang.IDE.SETTINGS_ERR_WRONG_PWD + " <a href='/reset/' target='_blank'>" + lang.IDE.SETTINGS_INFO_FORGET_PWD + "</a>");
          } else {
            that.modal.$('#AccountInfo').text(lang.IDE.SETTINGS_UPDATE_PWD_FAILURE);
          }
          return that.modal.$("#AccountUpdatePwd").removeAttr("disabled");
        });
      },
      showEmail: function() {
        this.hideFullName();
        $(".accountEmailRO").hide();
        $("#AccountEmailWrap").show();
        $("#AccountNewEmail").focus();
      },
      hideEmail: function() {
        $(".accountEmailRO").show();
        $("#AccountEmailWrap").hide();
        $("#AccountNewEmail, #AccountEmailPwd").val("");
        $("#AccountEmailInfo").empty();
      },
      showFullName: function() {
        this.hideEmail();
        $(".accountFullNameRO").hide();
        $("#AccountFullNameWrap").show();
        $("#AccountFirstName").val(App.user.get("firstName") || "").focus();
        $("#AccountLastName").val(App.user.get("lastName") || "");
      },
      hideFullName: function() {
        $(".accountFullNameRO").show();
        $("#AccountFullNameWrap").hide();
        $("#AccountFirstName, #AccountLastName").val("");
        return $("#AccountUpdateFullName").attr("disabled", false);
      },
      updateEmailBtn: function() {
        var new_pwd, old_pwd;
        old_pwd = $("#AccountNewEmail").val() || "";
        new_pwd = $("#AccountEmailPwd").val() || "";
        if (old_pwd.length && new_pwd.length >= 6) {
          $("#AccountUpdateEmail").removeAttr("disabled");
        } else {
          $("#AccountUpdateEmail").attr("disabled", "disabled");
        }
      },
      updateFullNameBtn: function() {
        var first_name, last_name;
        first_name = $("#AccountFirstName").val() || "";
        last_name = $("#AccountLastName").val() || "";
        if (first_name.length && last_name.length) {
          $("#AccountUpdateFullName").removeAttr("disabled");
        } else {
          $("#AccountUpdateFullName").attr("disabled", "disabled");
        }
      },
      changeFullName: function() {
        var first_name, last_name, that;
        that = this;
        first_name = $("#AccountFirstName").val() || "";
        last_name = $("#AccountLastName").val() || "";
        if (first_name && last_name) {
          $("#AccountUpdateFullName").attr("disabled", true);
          return App.user.changeName(first_name, last_name).then(function(result) {
            that.hideFullName();
            $(".fullNameText").text(first_name + " " + last_name);
            if (result) {
              return notification("info", lang.NOTIFY.UPDATED_FULLNAME_SUCCESS);
            }
          }, function(err) {
            notification("error", lang.NOTIFY.UPDATED_FULLNAME_FAIL);
            $("#AccountUpdateFullName").attr("disabled", false);
            return console.error("Change Full name Failed due to ->", err);
          });
        }
      },
      changeEmail: function() {
        var email, pwd;
        email = $("#AccountNewEmail").val() || "";
        pwd = $("#AccountEmailPwd").val() || "";
        $("#AccountEmailInfo").empty();
        $("#AccountUpdateEmail").attr("disabled", "disabled");
        App.user.changeEmail(email, pwd).then(function() {
          notification('info', lang.NOTIFY.SETTINGS_UPDATE_EMAIL_SUCCESS);
          $("#AccountCancelEmail").click();
          $(".accountEmailRO").children("span").text(App.user.get("email"));
        }, function(err) {
          var text;
          switch (err.error) {
            case 116:
              text = lang.IDE.SETTINGS_UPDATE_EMAIL_FAIL3;
              break;
            case 117:
              text = lang.IDE.SETTINGS_UPDATE_EMAIL_FAIL2;
              break;
            default:
              text = lang.IDE.SETTINGS_UPDATE_EMAIL_FAIL1;
          }
          $('#AccountEmailInfo').text(text);
          return $("#AccountUpdateEmail").removeAttr("disabled");
        });
      },
      showCredSetup: function() {
        this.modal.$("#CredentialTab").children().hide();
        this.modal.$("#CredSetupWrap").show();
        this.modal.$("#CredSetupAccount").focus()[0].select();
        this.modal.$("#CredSetupRemove").toggle(App.user.hasCredential());
        this.updateSubmitBtn();
      },
      cancelCredSetup: function() {
        this.modal.$("#CredentialTab").children().hide();
        if (App.user.hasCredential()) {
          this.modal.$("#CredAwsWrap").show();
        } else {
          this.modal.$("#CredDemoWrap").show();
        }
      },
      showRemoveCred: function() {
        this.modal.$("#CredentialTab").children().hide();
        this.modal.$("#CredRemoveWrap").show();
      },
      removeCred: function() {
        var self;
        this.modal.$("#CredentialTab").children().hide();
        this.modal.$("#CredRemoving").show();
        this.modal.$("#modal-box .modal-close").hide();
        self = this;
        App.user.changeCredential().then(function() {
          self.updateCredSettings();
        }, function() {
          self.modal.$("#CredSetupMsg").text(lang.IDE.SETTINGS_ERR_CRED_REMOVE);
          self.modal.$("#modal-box .modal-close").show();
          return self.showCredSetup();
        });
      },
      updateSubmitBtn: function() {
        var accesskey, account, privatekey;
        account = this.modal.$("#CredSetupAccount").val();
        accesskey = this.modal.$("#CredSetupAccessKey").val();
        privatekey = this.modal.$("#CredSetupSecretKey").val();
        if (account.length && accesskey.length && privatekey.length) {
          this.modal.$("#CredSetupSubmit").removeAttr("disabled");
        } else {
          this.modal.$("#CredSetupSubmit").attr("disabled", "disabled");
        }
      },
      submitCred: function() {
        var accesskey, privatekey, self;
        this.modal.$("#CredentialTab").children().hide();
        this.modal.$("#CredUpdating").show();
        this.modal.$("#modal-box .modal-close").hide();
        accesskey = this.modal.$("#CredSetupAccessKey").val();
        privatekey = this.modal.$("#CredSetupSecretKey").val();
        self = this;
        return App.user.validateCredential(accesskey, privatekey).then(function() {
          self.setCred();
        }, function() {
          self.modal.$("#CredSetupMsg").text(lang.IDE.SETTINGS_ERR_CRED_VALIDATE);
          self.modal.$("#modal-box .modal-close").show();
          self.showCredSetup();
        });
      },
      setCred: function() {
        var accesskey, account, privatekey, self;
        account = this.modal.$("#CredSetupAccount").val();
        accesskey = this.modal.$("#CredSetupAccessKey").val();
        privatekey = this.modal.$("#CredSetupSecretKey").val();
        if (account === "demo_account") {
          account = "user_demo_account";
          this.modal.$("#CredSetupAccount").val(account);
        }
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
        this.modal.$("#CredSetupMsg").text(lang.IDE.SETTINGS_ERR_CRED_UPDATE);
        this.modal.$("#modal-box .modal-close").show();
        return this.showCredSetup();
      },
      showCredConfirm: function() {
        this.modal.$("#CredentialTab").children().hide();
        this.modal.$("#CredConfirmWrap").show();
        return this.modal.$("#modal-box .modal-close").show();
      },
      confirmCred: function() {
        var accesskey, account, privatekey, self;
        account = this.modal.$("#CredSetupAccount").val();
        accesskey = this.modal.$("#CredSetupAccessKey").val();
        privatekey = this.modal.$("#CredSetupSecretKey").val();
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
        this.modal.$("#TokenManager").hide();
        this.modal.$("#TokenRmConfirm").show();
        this.modal.$("#TokenRmTit").text(sprintf(lang.IDE.SETTINGS_CONFIRM_TOKEN_RM_TIT, name));
      },
      createToken: function() {
        var self;
        this.modal.$("#TokenCreate").attr("disabled", "disabled");
        self = this;
        App.user.createToken().then(function() {
          self.updateTokenTab();
          return self.modal.$("#TokenCreate").removeAttr("disabled");
        }, function() {
          notification("error", lang.NOTIFY.FAIL_TO_CREATE_TOKEN);
          return self.modal.$("#TokenCreate").removeAttr("disabled");
        });
      },
      doneEditToken: function(evt) {
        var $p, duplicate, newTokenName, oldName, t, token, _i, _len, _ref;
        $p = $(evt.currentTarget).closest("li").removeClass("editing");
        $p.children(".tokenName").attr("readonly", true);
        token = $p.children(".tokenToken").text();
        newTokenName = $p.children(".tokenName").val();
        _ref = App.user.get("tokens");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (t.token === token) {
            oldName = t.name;
          } else if (t.name === newTokenName) {
            duplicate = true;
          }
        }
        if (!newTokenName || duplicate) {
          $p.children(".tokenName").val(oldName);
          return;
        }
        App.user.updateToken(token, newTokenName).fail(function() {
          oldName = "";
          $p.children(".tokenName").val(oldName);
          return notification("error", lang.NOTIFY.FAIL_TO_UPDATE_TOKEN);
        });
      },
      confirmRmToken: function() {
        var self;
        this.modal.$("#TokenRemove").attr("disabled", "disabled");
        self = this;
        App.user.removeToken(this.rmToken).then(function() {
          self.updateTokenTab();
          return self.cancelRmToken();
        }, function() {
          notification(lang.NOTIFY.FAIL_TO_DELETE_TOKEN);
          return self.cancelRmToken();
        });
      },
      cancelRmToken: function() {
        this.rmToken = "";
        this.modal.$("#TokenRemove").removeAttr("disabled");
        this.modal.$("#TokenManager").show();
        this.modal.$("#TokenRmConfirm").hide();
      },
      updateTokenTab: function() {
        var tokens;
        tokens = App.user.get("tokens");
        this.modal.$("#TokenManager").find(".token-table").toggleClass("empty", tokens.length === 0);
        if (tokens.length) {
          this.modal.$("#TokenList").html(MC.template.accessTokenTable(tokens));
        } else {
          this.modal.$("#TokenList").empty();
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

define('ide/subviews/BillingDialogTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.card)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "NO_CARD", {hash:{},data:data}));
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                <table class=\"table-head\">\n                    <thead>\n                    <tr>\n                        <th class=\"sortable desc-sort\" data-row-type=\"datetime\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "DATE", {hash:{},data:data}))
    + "</th>\n                        <th data-row-type=\"string\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMOUNT", {hash:{},data:data}))
    + "</th>\n                        <th data-row-type=\"string\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "STATUS", {hash:{},data:data}))
    + "</th>\n                        <th data-row-type=\"string\" style=\"width:25%;\">"
    + escapeExpression(helpers.i18n.call(depth0, "ACTION", {hash:{},data:data}))
    + "</th>\n                    </tr>\n                    </thead>\n                </table>\n                <div class=\"scroll-wrap\" style=\"max-height:200px;\">\n                    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n                    <div class=\"scroll-content\">\n                        <table class=\"table\">\n                            <thead>\n                            <tr>\n                                <th style=\"width: 25%\">\n                                    <div class=\"th-inner\"></div>\n                                </th>\n                                <th style=\"width: 25%\">\n                                    <div class=\"th-inner\"></div>\n                                </th>\n                                <th style=\"width: 25%\">\n                                    <div class=\"th-inner\"></div>\n                                </th>\n                                <th style=\"width: 25%\">\n                                    <div class=\"th-inner\"></div>\n                                </th>\n                            </tr>\n                            </thead>\n                            <tbody class=\"t-m-content\">\n                            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.paymentHistory), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n                ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                                <tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                                    <td>"
    + escapeExpression(helpers.formatTime.call(depth0, (depth0 && depth0.updated_at), "yyyy-MM-d", {hash:{},data:data}))
    + "</td>\n                                    <td>$ "
    + escapeExpression(helpers.or.call(depth0, (depth0 && depth0.ending_balance), (depth0 && depth0.total_balance), {hash:{},data:data}))
    + "</td>\n                                    <td>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.success), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n                                    <td>\n                                        <a class=\"payment-receipt link-blue\" href=\"#\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_VIEW_RECEIPT", {hash:{},data:data}))
    + "</a></td>\n                                </tr>\n                            ";
  return buffer;
  }
function program7(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PAYMENT_PAID", {hash:{},data:data}));
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "<span class=\"link-red\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_FAILED", {hash:{},data:data}))
    + "</span>";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "\n                    <div class=\"full-space\">\n                        "
    + escapeExpression(helpers.i18n.call(depth0, "NO_BILLING_EVENT", {hash:{},data:data}))
    + "\n                    </div>\n                ";
  return buffer;
  }

  buffer += "<div id=\"billing-status\">\n    <nav id=\"PaymentNav\">\n        <span data-target=\"PaymentBillingTab\" class=\"selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_BILLING_TAB", {hash:{},data:data}))
    + "</span>\n        <span data-target=\"UsageTab\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_USAGE_TAB", {hash:{},data:data}))
    + "</span>\n    </nav>\n    <div class=\"tabContent\" id=\"PaymentBody\">\n        <section id=\"PaymentBillingTab\">\n            <p class=\"warning-red\"></p>\n            <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "CREDIT_CARD_INFORMATION", {hash:{},data:data}))
    + "</h5>\n            <div class=\"clearfix\">\n                <div class=\"left clearfix\">\n                    <div class=\"payment-credit-middle left\">\n\n                    </div>\n                    <div class=\"left\">\n                        <p class=\"payment-number\">";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.card), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n                        <p class=\"payment-username\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.first_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.last_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n                    </div>\n                </div>\n                <div class=\"right\">\n                    <a class=\"btn btn-blue update-payment\" href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">"
    + escapeExpression(helpers.i18n.call(depth0, "UPDATE_BILLING_INFORMATION", {hash:{},data:data}))
    + "<i class=\"icon-right\"></i></a>\n                </div>\n            </div>\n            <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "BILLING_HISTORY", {hash:{},data:data}))
    + " <span class=\"payment-next-billing\">"
    + escapeExpression(helpers.i18n.call(depth0, "NEXT_BILLING_ON", {hash:{},data:data}))
    + " "
    + escapeExpression(helpers.formatTime.call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.billingEnd), "yyyy-MM-d", {hash:{},data:data}))
    + "</span></h5>\n            <div class=\"table-head-fix\">\n                ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasPaymentHistory), {hash:{},inverse:self.program(11, program11, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n        </section>\n        <section id=\"UsageTab\" class=\"hide\">\n            <p class=\"warning-red\"></p>\n            <h5 class=\"billing_usage_title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_CURRENT_USAGE", {hash:{},data:data}))
    + escapeExpression(helpers.formatTime.call(depth0, ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.last_billing_time), "yyyy-MM-d", {hash:{},data:data}))
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_CURRENT_USAGE_SPAN", {hash:{},data:data}))
    + "</h5>\n            <div class=\"usage-wrapper\">\n                <div class=\"used-points\">\n                    <div class=\"usage-number\">\n                        "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.current_quota)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n                    </div>\n                    <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_INSTANT_HOUR", {hash:{},data:data}))
    + "</span>\n                </div>\n            </div>\n            <p class=\"renew-points\">"
    + escapeExpression(helpers.i18n.call(depth0, "PAYMENT_RENEW_FREE_INFO", ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.max_quota), ((stack1 = (depth0 && depth0.paymentUpdate)),stack1 == null || stack1 === false ? stack1 : stack1.renewRemainDays), {hash:{},data:data}))
    + "</p>\n        </section>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.billingTemplate=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('ide/subviews/BillingDialog',["./BillingDialogTpl", 'i18n!/nls/lang.js', "ApiRequest", "UI.modalplus", "ApiRequestR", "backbone"], function(BillingDialogTpl, lang, ApiRequest, Modal, ApiRequestR) {
    var BillingDialog;
    BillingDialog = Backbone.View.extend({
      events: {
        "click #PaymentNav span": "switchTab",
        'click #PaymentBody a.payment-receipt': "viewPaymentReceipt",
        'click .update-payment': "_bindPaymentEvent"
      },
      initialize: function(modal) {
        var paymentState, that;
        that = this;
        paymentState = App.user.get("paymentState");
        if (modal) {
          this.modal = modal;
          this.modal.setWidth("650px").setTitle(lang.IDE.PAYMENT_SETTING_TITLE).setContent(MC.template.loadingSpiner).find('.modal-confirm').hide();
        } else {
          this.modal = new Modal({
            title: lang.IDE.PAYMENT_SETTING_TITLE,
            width: "650px",
            template: MC.template.loadingSpiner,
            disableClose: true,
            confirm: {
              hide: true
            }
          });
        }
        this.getPaymentHistory().then(function(paymentHistory) {
          var billable_quota, hasPaymentHistory, paymentUpdate, tempArray;
          console.log(paymentHistory);
          paymentUpdate = {
            url: App.user.get("paymentUrl"),
            card: App.user.get("creditCard"),
            billingEnd: App.user.get("billingEnd"),
            current_quota: App.user.get("voQuotaCurrent"),
            max_quota: App.user.get("voQuotaPerMonth"),
            renewRemainDays: Math.round((App.user.get("renewDate") - (new Date())) / (1000 * 60 * 60 * 24)),
            last_billing_time: App.user.get("billingStart") || new Date()
          };
          billable_quota = App.user.get("voQuotaCurrent") - App.user.get("voQuotaPerMonth");
          paymentUpdate.billable_quota = billable_quota > 0 ? billable_quota : 0;
          that.modal.find(".modal-body").css('padding', "0");
          hasPaymentHistory = (_.keys(paymentHistory)).length;
          tempArray = [];
          _.each(paymentHistory, function(e) {
            e.ending_balance = e.ending_balance_in_cents / 100;
            e.total_balance = e.total_in_cents / 100;
            e.start_balance = e.starting_balance_in_cents / 100;
            return tempArray.push(e);
          });
          tempArray.reverse();
          paymentHistory = tempArray;
          that.paymentHistory = tempArray;
          that.paymentUpdate = _.clone(paymentUpdate);
          that.modal.setContent(BillingDialogTpl.billingTemplate({
            paymentUpdate: paymentUpdate,
            paymentHistory: paymentHistory,
            hasPaymentHistory: hasPaymentHistory
          }));
          if (!App.user.get("creditCard")) {
            that.modal.find("#PaymentBillingTab").html(MC.template.paymentSubscribe({
              url: App.user.get("paymentUrl"),
              freePointsPerMonth: App.user.get("voQuotaPerMonth"),
              shouldPay: App.user.shouldPay()
            }));
            that.modal.listenTo(App.user, "paymentUpdate", function() {
              that.initialize(that.modal);
              return that.modal.stopListening();
            });
          }
          return that.updateUsage();
        }, function() {
          var _ref;
          notification('error', "Error while getting user payment info, please try again later.");
          return (_ref = that.modal) != null ? _ref.close() : void 0;
        });
        this.listenTo(App.user, "paymentUpdate", function() {
          return that.updateUsage();
        });
        return this.setElement(this.modal.tpl);
      },
      getPaymentHistory: function() {
        var historyDefer;
        historyDefer = new Q.defer();
        if (!App.user.get("creditCard")) {
          historyDefer.resolve({});
        } else {
          ApiRequestR("payment_statement").then(function(paymentHistory) {
            return historyDefer.resolve(paymentHistory);
          }, function(err) {
            return historyDefer.reject(err);
          });
        }
        return historyDefer.promise;
      },
      switchTab: function(event) {
        var target;
        target = $(event.currentTarget);
        console.log("Switching Tabs");
        this.modal.find("#PaymentNav").find("span").removeClass("selected");
        this.modal.find(".tabContent > section").addClass("hide");
        $("#" + target.addClass("selected").data('target')).removeClass("hide");
        return this.updateUsage();
      },
      _bindPaymentEvent: function(event) {
        var that;
        that = this;
        event.preventDefault();
        window.open($(event.currentTarget).attr("href"), "");
        this.modal.listenTo(App.user, 'change:paymentState', function() {
          var paymentState;
          paymentState = App.user.get('paymentState');
          if (that.modal.isClosed) {
            return false;
          }
          if (paymentState === 'active') {
            return that._renderBillingDialog(that.modal);
          }
        });
        this.modal.on('close', function() {
          return that.modal.stopListening(App.user);
        });
        return false;
      },
      _renderBillingDialog: function(modal) {
        return new BillingDialog(modal);
      },
      updateUsage: function() {
        var current_quota, shouldPay;
        if (this.modal.isClosed) {
          return false;
        }
        shouldPay = App.user.shouldPay();
        this.modal.$(".usage-block").toggleClass("error", shouldPay);
        this.modal.$(".used-points").toggleClass("error", shouldPay);
        current_quota = App.user.get("voQuotaCurrent");
        this.modal.find(".payment-number").text(App.user.get("creditCard") || "No Card");
        this.modal.find(".payment-username").text("" + (App.user.get("cardFirstName")) + " " + (App.user.get("cardLastName")));
        this.modal.find(".used-points .usage-number").text(current_quota);
        if (App.user.shouldPay()) {
          return this.modal.find(".warning-red").not(".no-change").show().html(sprintf(lang.IDE.PAYMENT_PROVIDE_UPDATE_CREDITCARD, App.user.get("paymentUrl"), (App.user.get("creditCard") ? "Update" : "Provide")));
        } else if (App.user.isUnpaid()) {
          return this.modal.find(".warning-red").not(".no-change").show().html(sprintf(lang.IDE.PAYMENT_UNPAID_BUT_IN_FREE_QUOTA, App.user.get("paymentUrl")));
        } else {
          return this.modal.find(".warning-red").not(".no-change").hide();
        }
      },
      viewPaymentReceipt: function(event) {
        var $target, cssToInsert, id, makeNewWindow, paymentHistory;
        $target = $(event.currentTarget);
        id = $target.parent().parent().data("id");
        paymentHistory = this.paymentHistory[id];
        cssToInsert = ".billing_statement_section {\n    display: block;\n    position: relative;\n}\n.billing_statement_section h2 {\n    display: block;\n    background: #E6E6E6;\n    font-size: 16px;\n    padding: 10px;\n    font-weight: bold;\n    margin-bottom: 0;\n    border-bottom: 1px solid #727272;\n}\n.billing_statement_section_content {\n    display: block;\n    position: relative;\n    padding-top: 10px;\n}\ntable {\n    border-collapse: collapse;\n    width: 100%;\n}\ntable, td, th {\n    border: 1px solid #333;\n    padding: 7px;\n    text-align: left;\n    font-size: 14px;\n}\ntable thead {\n    background: #dedede;\n}\ntable tr.billing_statement_listing_tfoot {\n    font-weight: bold;\n    text-align: right;\n}\n#billing_statement {\n    width: 800px;\n    margin: 20px auto;\n    padding-bottom: 50px;\n}\n.billing_statement_section .billing_statement_section_content h3 {\n    font-size: 14px;\n    position: relative;\n    margin: 10px 0;\n    font-weight: bold;\n    margin-bottom: 14px;\n    background: #F3F3F3;\n    padding: 5px;\n}\ndiv#billing_statement_account_information_section {\n    width: 49%;\n    float: left;\n}\ndiv#billing_statement_summary_section {\n    width: 49%;\n    float: right;\n}\ndiv#billing_statement_detail_section {\n    clear: both;\n    padding-top: 10px;\n}\n.billing_statement_section_content .billing_statement_summary_label {\n    font-weight: bold;\n    font-size: 16px;\n    width: 44%;\n    display: inline-block;\n    text-align: right;\n}\n.billing_statement_section_content> div {\n    margin-bottom: 10px;\n}\n.billing_statement_section_content .billing_statement_summary_value {\n    text-align: right;\n    float: right;\n    color: #666;\n}\ndiv#billing_statement_summary_balance_paid_stamp.billing_statement_balance_paid_stamp_paid {\n    float: right;\n    font-size: 30px;\n    color: #50B816;\n    margin-top: 10px;\n}\ndiv#billing_statement_summary_balance_paid_stamp.billing_statement_balance_paid_stamp_unpaid {\n    float: right;\n    font-size: 30px;\n    color: #C70000;\n    margin-top: 10px;\n}\nbody {font-family: 'Lato', 'Helvetica Neue', Arial, sans-serif;}";
        makeNewWindow = function() {
          var content, headTag, newWindow, styleTag;
          newWindow = window.open("", "");
          newWindow.focus();
          content = paymentHistory.html;
          newWindow.document.write(content);
          headTag = newWindow.document.head || newWindow.document.getElementsByTagName('head')[0];
          styleTag = document.createElement('style');
          styleTag.type = 'text/css';
          if (styleTag.styleSheet) {
            styleTag.styleSheet.cssText = cssToInsert;
          } else {
            styleTag.appendChild(document.createTextNode(cssToInsert));
          }
          headTag.appendChild(styleTag);
          return newWindow.document.close();
        };
        return makeNewWindow();
      }
    });
    return BillingDialog;
  });

}).call(this);

(function() {
  define('ide/subviews/HeaderView',["./HeaderTpl", "./SettingsDialog", './BillingDialog', 'i18n!/nls/lang.js', 'backbone', "UI.selectbox"], function(tmpl, SettingsDialog, BillingDialog, lang) {
    var HeaderView;
    HeaderView = Backbone.View.extend({
      events: {
        'click #HeaderLogout': 'logout',
        'click #HeaderSettings': 'settings',
        'click #HeaderShortcuts': 'shortcuts',
        'click #HeaderBilling': 'billingSettings',
        'click .voquota': "billingSettings",
        'DROPDOWN_CLOSE #HeaderNotification': 'dropdownClosed'
      },
      initialize: function() {
        this.listenTo(App.user, "change", this.update);
        this.listenTo(App.model, "change:notification", this.updateNotification);
        this.setElement($(tmpl(App.user.toJSON())).prependTo("#wrapper"));
        this.update();
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
        var $quota;
        $quota = $("#header").children(".voquota");
        if (App.user.shouldPay()) {
          return $quota.addClass("show");
        } else {
          return $quota.removeClass("show");
        }
      },
      setAlertCount: function(count) {
        return $('#NotificationCounter').text(count || "");
      },
      updateNotification: function() {
        var html, i, notification, unread_num, _i, _len;
        console.log("Notification Updated, Websocket isReady:", App.WS.isReady());
        notification = _.map(App.model.get("notification"), function(n) {
          return _.extend({}, n, {
            operation: lang.TOOLBAR[n.operation.toUpperCase()] || n.operation
          });
        });
        html = "";
        unread_num = 0;
        for (_i = 0, _len = notification.length; _i < _len; _i++) {
          i = notification[_i];
          html += MC.template.headerNotifyItem(i);
          if (!i.readed) {
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
      },
      billingSettings: function() {
        return new BillingDialog();
      }
    });
    return HeaderView;
  });

}).call(this);

define('ide/subviews/WelcomeTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_PROVIDE_CRED_DESC", {hash:{},data:data}))
    + "</p>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <h2>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_TIT", {hash:{},data:data}))
    + "<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.username)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></h2>\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "WELCOME_DESC", {hash:{},data:data}))
    + "</p>\n  ";
  return buffer;
  }

  buffer += "<section id=\"WelcomeSettings\">\n  <header>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noWelcome), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </header>\n  <div id=\"CredSetupWrap\">\n    <div id=\"CredSetupMsg\" class=\"cred-setup-msg empty-hide\"></div>\n    <ul>\n      <li>\n        <i class=\"icon-info icon-label tooltip\" data-tooltip=\""
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
    + "</button>\n    </footer>\n  </div>\n</section>\n\n<section id=\"WelcomeCredUpdate\" class=\"hide\">\n  <p>"
    + escapeExpression(helpers.i18n.call(depth0, "SETTINGS_CRED_UPDATING", {hash:{},data:data}))
    + "</p>\n  <div class=\"loading-spinner\"></div>\n</section>\n\n<section id=\"WelcomeSkipWarning\" class=\"hide modal-body\">\n  <h3>"
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
    + "</button>\n  </footer>\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/WelcomeDialog',["./WelcomeTpl", "UI.modalplus", 'i18n!/nls/lang.js', "backbone"], function(WelcomeTpl, Modal, lang) {
    var SingletonWelcome, WelcomeDialog;
    SingletonWelcome = null;
    WelcomeDialog = Backbone.View.extend({
      events: {
        "click #WelcomeSkip": "skip",
        "click #WelcomeBack": "back",
        "click #WelcomeDone": "skipDone",
        "click #WelcomeClose": "close",
        "click #CredSetupSubmit": "submitCred",
        "keyup #CredSetupAccount, #CredSetupAccessKey, #CredSetupSecretKey": "updateSubmitBtn"
      },
      constructor: function() {
        if (SingletonWelcome) {
          return SingletonWelcome;
        }
        SingletonWelcome = this;
        return Backbone.View.apply(this, arguments);
      },
      initialize: function(options) {
        var attributes, title;
        attributes = {
          username: App.user.get("username")
        };
        if (options && options.askForCredential) {
          title = lang.IDE.WELCOME_PROVIDE_CRED_TIT;
          attributes.noWelcome = true;
        } else {
          title = lang.IDE.WELCOME_DIALOG_TIT;
        }
        this.modal = new Modal({
          title: title,
          template: WelcomeTpl(attributes),
          width: "600",
          disableClose: true,
          disableFooter: true,
          compact: true,
          hideClose: true,
          cancel: {
            hide: true
          }
        });
        this.modal.tpl.find(".context-wrap").attr("id", "WelcomeDialog");
        this.setElement(this.modal.tpl);
      },
      skip: function() {
        $("#WelcomeSettings").hide();
        return $("#WelcomeSkipWarning").show();
      },
      back: function() {
        $("#WelcomeSettings").show();
        return $("#WelcomeSkipWarning").hide();
      },
      skipDone: function() {
        if (!App.user.hasCredential()) {
          this.done();
          return;
        }
        $("#CredSetupAccount").val("");
        $("#CredSetupAccessKey").val("");
        $("#CredSetupSecretKey").val("");
        $("#WelcomeSkipWarning").hide();
        $("#WelcomeCredUpdate").show();
        this.setCred();
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
        SingletonWelcome = null;
        return this.modal.close();
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
          $("#CredSetupMsg").text(lang.IDE.SETTINGS_ERR_CRED_VALIDATE);
          self.showCredSetup();
        });
      },
      setCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        if (account === "demo_account") {
          account = "user_demo_account";
          $("#CredSetupAccount").val(account);
        }
        self = this;
        return App.user.changeCredential(account, accesskey, privatekey, true).then(function() {
          self.done();
        }, function(err) {
          $("#CredSetupMsg").text(lang.IDE.SETTINGS_ERR_CRED_UPDATE);
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

define('ide/subviews/NavigationTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<aside id=\"navigation\">\n  <nav>\n    <button class=\"off-canvas-tab\" id=\"off-canvas-app\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_APPS", {hash:{},data:data}))
    + "</button>\n    <button class=\"off-canvas-tab selected\" id=\"off-canvas-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "NAV_TIT_STACKS", {hash:{},data:data}))
    + "</button>\n  </nav>\n  <div style=\"overflow-y:scroll;position:absolute;top:50px;bottom:0;left:0;right:0;\">\n    <ul id=\"nav-app-region\" class=\"hide\"></ul>\n    <ul id=\"nav-stack-region\"></ul>\n  </div>\n\n<!--   <section class=\"scroll-wrap\">\n    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content\">\n      <ul class=\"scroll-content hide\" id=\"nav-app-region\"></ul>\n      <div class=\"scroll-content\" id=\"nav-stack\">\n        <ul id=\"nav-stack-region\"></ul>\n        <div id=\"nav-show-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.SHOW_UNUSED_REGIONS", {hash:{},data:data}))
    + "</div>\n        <ul id=\"nav-region-empty-list\" class=\"hide\"></ul>\n      </div>\n    </div>\n  </section> -->\n</aside>\n<button id=\"off-canvas-menu\" class=\"icon-menu\"></button>\n<div id=\"off-canvas-overlay\"></div>";
  return buffer;
  };
TEMPLATE.navigation=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<h3 class=\"nav-group-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</h3>\n	<ul class=\"nav-item-list app-list\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</ul>\n</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"truncate nav-truncate icon-app-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progressing), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" title=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ["
    + escapeExpression(((stack1 = (depth0 && depth0.stateDesc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "]\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "pending";
  }

function program5(depth0,data) {
  
  
  return escapeExpression(helpers.tolower.call(depth0, (depth0 && depth0.stateDesc), {hash:{},data:data}));
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"icon-app-type-"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n<div class=\"nav-empty\">"
    + escapeExpression(helpers.i18n.call(depth0, "DASH_LBL_NO_APP", {hash:{},data:data}))
    + "</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.applist=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<h3 class=\"nav-group-title\">"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")<button class=\"icon-new-stack tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "IDE_COM_CREATE_NEW_STACK", {hash:{},data:data}))
    + "'></button></h3>\n	<ul class=\"nav-item-list stack-list\">\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.data), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"truncate nav-truncate icon-stack-nav\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.stacklist=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.data)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li class=\"nav-group-title\" data-region=\""
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.regionName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " (0) <button class=\"icon-new-stack tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "IDE_COM_CREATE_NEW_STACK", {hash:{},data:data}))
    + "'></button></li>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.regionlist=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('ide/subviews/Navigation',["./NavigationTpl", 'backbone'], function(NavPartsTpl) {
    return Backbone.View.extend({
      events: {
        "click #off-canvas-app": "showNavApp",
        "click #off-canvas-stack": "showNavStack",
        'click .stack-list li, .app-list li': 'openOps',
        'click #nav-show-empty': 'showEmptyRegion',
        'click .icon-new-stack': 'createStack'
      },
      initialize: function() {
        this.setElement($(NavPartsTpl.navigation()).appendTo("#wrapper").eq(0));
        $("#off-canvas-menu").click(_.bind(this.showOffCanvas, this));
        $("#off-canvas-overlay").click(_.bind(this.hideOffCanvas, this));
        this.updateStackList();
        this.updateAppList();
        this.listenTo(App.model.stackList(), "update", function() {
          if (this.showing) {
            this.updateStackList();
          } else {
            this.stackDirty = true;
          }
        });
        this.listenTo(App.model.appList(), "update change:state", function() {
          console.log("Navigation updated due to appList update", arguments);
          if (this.showing) {
            this.updateAppList();
          } else {
            this.appDirty = true;
          }
        });
      },
      showOffCanvas: function() {
        if ($("#wrapper").hasClass("off-canvas")) {
          return $("wrapper").removeClass("off-canvas");
        }
        if (this.stackDirty) {
          this.updateStackList();
        }
        if (this.appDirty) {
          this.updateAppList();
        }
        this.showing = true;
        this.stackDirty = this.appDirty = false;
        if ($("#nav-app-region").children(".nav-empty").length) {
          this.showNavStack();
        } else {
          this.showNavApp();
        }
        $("#wrapper").addClass("off-canvas");
      },
      hideOffCanvas: function() {
        $("#wrapper").removeClass("off-canvas");
        this.showing = false;
      },
      showNavApp: function() {
        $("#nav-app-region").show();
        $("#nav-stack-region").hide();
        $("#off-canvas-app").toggleClass("selected", true);
        $("#off-canvas-stack").toggleClass("selected", false);
      },
      showNavStack: function() {
        $("#nav-app-region").hide();
        $("#nav-stack-region").show();
        $("#off-canvas-app").toggleClass("selected", false);
        $("#off-canvas-stack").toggleClass("selected", true);
      },
      showEmptyRegion: function() {
        $("#nav-show-empty").hide();
        $("#nav-region-empty-list").show();
      },
      updateStackList: function() {
        var list;
        list = App.model.stackList().groupByRegion(true);
        $('#nav-stack-region').html($.trim(NavPartsTpl.stacklist(list)));
        return $('#nav-region-empty-list').html(NavPartsTpl.regionlist(list));
      },
      updateAppList: function() {
        return $('#nav-app-region').html(NavPartsTpl.applist(App.model.appList().groupByRegion()));
      },
      openOps: function(event) {
        this.hideOffCanvas();
        App.openOps($(event.currentTarget).attr("data-id"));
      },
      createStack: function(event) {
        var region;
        region = $(event.currentTarget).closest("li").attr("data-region");
        if (!region) {
          return;
        }
        this.hideOffCanvas();
        App.createOps(region);
      }
    });
  });

}).call(this);

define('ide/subviews/AppTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DELETE_STACK", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n  <div class=\"modal-center-align-helper\">\n      <div class=\"modal-text-major\">"
    + escapeExpression(((stack1 = (depth0 && depth0.msg)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  </div>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn modal-close btn-red\" id=\"confirmRmStack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DELETE_STACK", {hash:{},data:data}))
    + "</button>\n  <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.removeStackConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n  <div class=\"modal-center-align-helper\">\n    <div class=\"modal-control-group\">\n      <label class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BODY_DUPLICATE_STACK", {hash:{},data:data}))
    + "</label>\n      <input id=\"confirmDupStackIpt\" class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.newName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n    </div>\n  </div>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn btn-red\" id=\"confirmDupStack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DUPLICATE_STACK", {hash:{},data:data}))
    + "</button>\n  <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.dupStackConfirm=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<section class=\"disconnected-msg\">\n  <div>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CONNECTION_LOST_TO_RECONNECT", {hash:{},data:data}))
    + "</div>\n  <div>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CHANGES_MAY_NOT_BE_SAVED", {hash:{},data:data}))
    + "</div>\n</section>";
  return buffer;
  };
TEMPLATE.disconnectedMsg=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<header class=\"modal-header\" style=\"width:390px;\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_FORCE_TERMINATE", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></header>\n<div class=\"modal-body modal-text-wraper\" style=\"width:390px;\">\n  <div class=\"modal-center-align-helper\">\n      <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_FORCE_TERMINATE_CONTENT", (depth0 && depth0.name), {hash:{},data:data}))
    + "</div>\n  </div>\n</div>\n<div class=\"modal-footer\">\n  <button class=\"btn modal-close btn-red\" id=\"forceTerminateApp\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_DELETE_STACK", {hash:{},data:data}))
    + "</button>\n  <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.forceTerminateApp=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('ide/subviews/FullnameTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"complete-fullname\">\n    <div class=\"control-group fullname\">\n        <div class=\"half-group\">\n            <label for=\"complete-firstname\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "FIRST_NAME", {hash:{},data:data}))
    + "</label>\n            <input autocomplete=\"off\" id=\"complete-firstname\" class=\"input\" type=\"text\"/>\n        </div>\n        <div class=\"half-group\">\n            <label for=\"complete-lastname\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "LAST_NAME", {hash:{},data:data}))
    + "</label>\n            <input autocomplete=\"off\" id=\"complete-lastname\" class=\"input\" type=\"text\"/>\n        </div>\n    </div>\n    <p class=\"information\">"
    + escapeExpression(helpers.i18n.call(depth0, "YOU_CAN_LATER_UPDATE_PROFILE", {hash:{},data:data}))
    + "</p>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/FullnameSetup',["./FullnameTpl", "UI.modalplus", 'i18n!/nls/lang.js', 'ApiRequest', "backbone"], function(FullnameTpl, Modal, lang, ApiRequest) {
    return Backbone.View.extend({
      events: {
        "click #submitFullName": "submit",
        "change #complete-firstname": "changeInput",
        "change #complete-lastname": "changeInput",
        "keyup #complete-lastname": "changeInput",
        "keyup #complete-lastname": "changeInput"
      },
      initialize: function() {
        this.modal = new Modal({
          title: lang.IDE.COMPLETE_YOUR_PROFILE,
          template: FullnameTpl(),
          width: "600",
          disableClose: true,
          hideClose: true,
          cancel: {
            hide: true
          },
          confirm: {
            disabled: true
          }
        });
        this.modal.on('confirm', this.submit.bind(this));
        return this.setElement(this.modal.tpl);
      },
      changeInput: function() {
        var $firstNameInput, $lastNameInput, confirmBtn;
        confirmBtn = this.modal.find(".modal-confirm");
        $firstNameInput = this.modal.find("#complete-firstname");
        $lastNameInput = this.modal.find("#complete-lastname");
        if (!!$firstNameInput.val() && !!$lastNameInput.val()) {
          return confirmBtn.attr("disabled", false);
        } else {
          return confirmBtn.attr("disabled", true);
        }
      },
      submit: function() {
        var firstname, lastname, that;
        that = this;
        firstname = that.modal.$("#complete-firstname").val();
        lastname = that.modal.$("#complete-lastname").val();
        if (!(firstname && lastname)) {
          return false;
        }
        this.modal.find(".modal-confirm").attr('disabled', true);
        this.modal.setContent(MC.template.loadingSpiner());
        return ApiRequest("account_update_account", {
          attributes: {
            first_name: firstname,
            last_name: lastname
          }
        }).then(function() {
          App.user.set("firstName", firstname);
          App.user.set("lastName", lastname);
          this.modal.close();
          return notification("info", lang.IDE.PROFILE_UPDATED_SUCCESSFULLY);
        }, function() {
          this.modal.close();
          return notification('error', lang.IDE.PROFILE_UPDATED_FAILED);
        });
      }
    });
  });

}).call(this);


/*
----------------------------
  The View for application
----------------------------
 */

(function() {
  define('ide/ApplicationView',["backbone", "./subviews/SessionDialog", "./subviews/HeaderView", "./subviews/WelcomeDialog", "./subviews/SettingsDialog", "./subviews/Navigation", "./subviews/AppTpl", "./subviews/FullnameSetup", 'i18n!/nls/lang.js', 'CloudResources', 'constant', 'UI.modalplus'], function(Backbone, SessionDialog, HeaderView, WelcomeDialog, SettingsDialog, Navigation, AppTpl, FullnameSetup, lang, CloudResources, constant, modalPlus) {
    return Backbone.View.extend({
      el: $("body")[0],
      events: {
        "click .click-select": "selectText"
      },
      initialize: function() {
        this.header = new HeaderView();
        new Navigation();
        this.listenTo(App.user, "change:state", this.toggleWelcome);
        this.listenTo(App.model.appList(), "change:terminateFail", this.askForForceTerminate);

        /* env:dev                                                                           env:dev:end */

        /* env:debug */
        require(["./ide/subviews/DebugTool"], function(DT) {
          return new DT();
        });

        /* env:debug:end */
        $(window).on("beforeunload", this.checkUnload);
        $(window).on('keydown', this.globalKeyEvent);
      },
      checkUnload: function() {
        if (App.canQuit()) {
          return void 0;
        } else {
          return lang.IDE.BEFOREUNLOAD_MESSAGE;
        }
      },
      globalKeyEvent: function(event) {
        var nodeName;
        nodeName = event.target.nodeName.toLowerCase();
        if (nodeName === "input" || nodeName === "textarea" || event.target.contentEditable === 'true') {
          return;
        }
        switch (event.which) {
          case 8:
            event.preventDefault();
            return;
          case 191:
            modal(MC.template.shortkey(), true);
            return false;
        }
      },
      toggleWSStatus: function(isConnected) {
        if (isConnected) {
          return $(".disconnected-msg").remove();
        } else {
          if ($(".disconnected-msg").show().length > 0) {
            return;
          }
          return $(AppTpl.disconnectedMsg()).appendTo("body").on("mouseover", function() {
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
        } else if (App.user.fullnameNotSet()) {
          new FullnameSetup();
        }
      },
      askForAwsCredential: function() {
        return new WelcomeDialog({
          askForCredential: true
        });
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
      },
      askForForceTerminate: function(model) {
        if (!model.get("terminateFail")) {
          return;
        }
        modal(AppTpl.forceTerminateApp({
          name: model.get("name")
        }));
        $("#forceTerminateApp").on("click", function() {
          model.terminate(true).fail(function(err) {
            var error;
            error = err.awsError ? err.error + "." + err.awsError : err.error;
            return notification(sprintf(lang.NOTIFY.ERROR_FAILED_TERMINATE, name, error));
          });
        });
      },
      notifyUnpay: function() {
        notification("error", "Failed to charge your account. Please update your billing info.");
      }
    });
  });

}).call(this);


/*
----------------------------
  The Model for stack / app
----------------------------

  This model represent a stack or an app. It contains serveral methods to manipulate the stack / app
 */

(function() {
  define('OpsModel',["ApiRequest", "constant", "CloudResources", "ThumbnailUtil", "backbone"], function(ApiRequest, constant, CloudResources, ThumbUtil) {
    var KnownOpsModelClass, OpsModel, OpsModelLastestVersion, OpsModelState, OpsModelStateDesc, OpsModelType, __detailExtend;
    KnownOpsModelClass = {};
    __detailExtend = Backbone.Model.extend;

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        env:dev:end */
    OpsModelType = {
      OpenStack: "OpenstackOps",
      Amazon: "AwsOps"
    };
    OpsModelState = {
      UnRun: 0,
      Running: 1,
      Stopped: 2,
      Initializing: 3,
      Starting: 4,
      Updating: 5,
      Stopping: 6,
      Terminating: 7,
      Destroyed: 8,
      Saving: 9
    };
    OpsModelStateDesc = ["", "Running", "Stopped", "Starting", "Starting", "Updating", "Stopping", "Terminating", "", "Saving"];
    OpsModelLastestVersion = "2014-11-11";
    OpsModel = Backbone.Model.extend({
      type: "GenericOps",
      defaults: function() {
        return {
          updateTime: +(new Date()),
          region: "",
          state: OpsModelState.UnRun,
          stoppable: true,
          name: "",
          version: OpsModelLastestVersion,
          provider: ""
        };
      },
      constructor: function(attr, opts) {
        var Model, provider;
        attr = attr || {};
        opts = opts || {};
        if (this.type === "GenericOps") {
          if (opts.jsonData) {
            provider = opts.jsonData.provider;
          }
          attr.provider = provider || attr.provider || "aws::global";
          console.assert(KnownOpsModelClass[attr.provider], "Cannot find specific OpsModel for provider '" + attr.provider + "'");
          Model = KnownOpsModelClass[attr.provider];
          if (Model) {
            return new Model(attr, opts);
          }
        }
        Backbone.Model.apply(this, arguments);
      },
      initialize: function(attr, options) {
        if (options) {
          if (options.initJsonData) {
            this.__initJsonData();
          }
          if (options.jsonData) {
            this.__setJsonData(options.jsonData);
          }
        }

        /* env:dev                                                                                                                        env:dev:end */

        /* env:debug */
        this.listenTo(this, "change:state", function() {
          return console.log("OpsModel's state changed", this, MC.prettyStackTrace());
        });

        /* env:debug:end */
      },
      url: function() {
        if (this.get("id")) {
          return "ops/" + (this.get('id'));
        } else {
          return "ops/" + this.cid + "/unsaved";
        }
      },
      isStack: function() {
        return this.attributes.state === OpsModelState.UnRun || this.attributes.state === OpsModelState.Saving;
      },
      isApp: function() {
        return !this.isStack();
      },
      isImported: function() {
        return !!this.attributes.importMsrId;
      },
      isPMRestricted: function() {
        return this.get("version") >= "2014-11-11" && this.isApp();
      },
      testState: function(state) {
        return this.attributes.state === state;
      },
      getStateDesc: function() {
        return OpsModelStateDesc[this.attributes.state];
      },
      toJSON: function(options) {
        var o;
        o = Backbone.Model.prototype.toJSON.call(this);
        o.stateDesc = OpsModelStateDesc[o.state];
        o.regionName = constant.REGION_SHORT_LABEL[o.region];
        if (this.isProcessing()) {
          o.progressing = true;
        }
        if (options) {
          if (options.thumbnail) {
            o.thumbnail = ThumbUtil.fetch(o.id);
          }
        }
        return o;
      },
      isPersisted: function() {
        return !!this.get("id");
      },
      isExisting: function() {
        var state;
        state = this.get("state");
        if (state === OpsModelState.Destroyed) {
          console.warn("There's probably a bug existing that the destroyed opsmodel is still be using by someone.");
        }
        return !!(this.get("id") && state !== OpsModelState.Destroyed);
      },
      getMsrId: function() {
        return this.get("importMsrId") || void 0;
      },
      getThumbnail: function() {
        return ThumbUtil.fetch(this.get("id"));
      },
      saveThumbnail: function(thumb) {
        if (thumb) {
          ThumbUtil.save(this.get("id"), thumb);
          this.trigger("change");
        } else {
          ThumbUtil.save(this.get("id"), "");
        }
      },
      hasJsonData: function() {
        return !!this.__jsonData;
      },
      getJsonData: function() {
        return this.__jsonData;
      },
      fetchJsonData: function() {
        var d;
        if (this.__jsonData) {
          d = Q.defer();
          d.resolve(this);
          return d.promise;
        }
        return this.__fjdTemplate(this) || this.__fjdImport(this) || this.__fjdStack(this) || this.__fjdApp(this);
      },
      __fjdTemplate: function(self) {
        var sampleId;
        sampleId = this.get("sampleId");
        if (!sampleId) {
          return;
        }
        return ApiRequest('stackstore_fetch_stackstore', {
          sub_path: "master/stack/" + sampleId + "/" + sampleId + ".json"
        }).then(function(result) {
          var e, j;
          try {
            j = JSON.parse(result);
            delete j.id;
            delete j.signature;
            if (!self.collection.isNameAvailable(j.name)) {
              j.name = self.collection.getNewName(j.name);
            }
            self.attributes.region = j.region;
            self.__setJsonData(j);
          } catch (_error) {
            e = _error;
            j = null;
            self.attributes.region = "us-east-1";
            self.__initJsonData();
          }
          if (j) {
            self.set("name", j.name);
          }
          return self;
        });
      },
      __fjdImport: function(self) {
        if (!this.isImported()) {
          return;
        }
        return CloudResources("OpsResource", this.getMsrId()).init(this.get("region"), this.get("provider")).fetchForceDedup().then(function() {
          return self.__onFjdImported();
        });
      },
      generateJsonFromRes: function() {
        var json;
        json = CloudResources('OpsResource', this.getMsrId()).generatedJson;
        if (!json.agent.module.repo) {
          json.agent.module = {
            repo: App.user.get("repo"),
            tag: App.user.get("tag")
          };
        }
        return json;
      },
      __onFjdImported: function() {
        var json;
        json = this.generateJsonFromRes();
        this.__setJsonData(json);
        this.attributes.name = json.name;
        return this;
      },
      __fjdStack: function(self) {
        if (!this.isStack()) {
          return;
        }
        return ApiRequest("stack_info", {
          region_name: this.get("region"),
          stack_ids: [this.get("id")]
        }).then(function(ds) {
          return self.__setJsonData(ds[0]);
        });
      },
      __fjdApp: function(self) {
        if (!this.isApp()) {
          return;
        }
        return ApiRequest("app_info", {
          region_name: this.get("region"),
          app_ids: [this.get("id")]
        }).then(function(ds) {
          return self.__setJsonData(ds[0]);
        });
      },
      __setJsonData: function(json) {
        var newLayout;
        if (!json) {
          this.__destroy();
          throw new McError(ApiRequest.Errors.MissingDataInServer, "Stack/App doesn't exist.");
        }
        if (!json.agent) {
          json.agent = {
            enabled: false,
            module: {
              repo: App.user.get("repo"),
              tag: App.user.get("tag")
            }
          };
        }
        if (!json.property) {
          json.property = {
            stoppable: true
          };
        }

        /*
        Old JSON will have structure like :
        layout : {
          component : { node : {}, group : {} }
          size : []
        }
        New JSON will have structure like :
        layout : {
          xxx  : {}
          size : []
        }
         */
        if (json.layout && json.layout.component) {
          newLayout = $.extend({}, json.layout.component.node, json.layout.component.group);
          newLayout.size = json.layout.size;
          json.layout = newLayout;
        }
        if (json.layout && !json.layout.size) {
          json.layout.size = [240, 240];
        }
        if ((json.version || "").split("-").length < 3) {
          json.version = OpsModelLastestVersion;
        }
        if (!json.provider && this.get("provider")) {
          json.provider = this.get("provider");
        }
        this.__jsonData = json;
        if (this.attributes.name !== json.name) {
          this.set("name", json.name);
        }
        if (json.autoLayout) {
          this.set("autoLayout", json.autoLayout);
        }
        return this;
      },
      save: function(newJson, thumbnail) {
        var api, d, nameClash, self;
        if (this.isApp() || this.testState(OpsModelState.Saving)) {
          return this.__returnErrorPromise();
        }
        if (!newJson) {
          newJson = this.__jsonData;
        }
        this.set("state", OpsModelState.Saving);
        nameClash = this.collection.where({
          name: newJson.name
        }) || [];
        if (nameClash.length > 1 || (nameClash[0] && nameClash[0] !== this)) {
          d = Q.defer();
          d.reject(McError(ApiRequest.Errors.StackRepeatedStack, "Stack name has already been used."));
          return d.promise;
        }
        api = this.get("id") ? "stack_save" : "stack_create";
        if (newJson.state !== "Enabled") {
          console.warn("The json's state isnt `Enabled` when saving the stack", this, newJson);
          newJson.state = "Enabled";
        }
        newJson.id = this.get("id");
        self = this;
        return ApiRequest(api, {
          region_name: this.get("region"),
          spec: newJson
        }).then(function(res) {
          var attr;
          attr = {
            name: newJson.name,
            version: newJson.version,
            updateTime: +(new Date()),
            stoppable: res.property.stoppable,
            state: OpsModelState.UnRun
          };
          if (!self.get("id")) {
            attr.id = res.id;
          }
          if (thumbnail) {
            ThumbUtil.save(self.get("id") || attr.id, thumbnail);
          }
          self.set(attr);
          self.__jsonData = res;
          self.trigger("jsonDataSaved", self);
          if (attr.id) {
            self.collection.__triggerUpdate(self);
          }
          return self;
        }, function(err) {
          self.set("state", OpsModelState.UnRun);
          throw err;
        });
      },
      remove: function() {
        var d, self;
        if (this.isPersisted() && this.isApp()) {
          return this.__returnErrorPromise();
        }
        this.__destroy();
        if (!this.get("id")) {
          d = Q.defer();
          d.resolve();
          return d.promise;
        }
        self = this;
        return ApiRequest("stack_remove", {
          region_name: this.get("region"),
          stack_id: this.get("id")
        }).fail(function() {
          this.set("state", OpsModelState.UnRun);
          return App.model.stackList().add(self);
        });
      },
      run: function(toRunJson, appName) {
        var region;
        region = this.get("region");
        toRunJson.id = this.get("id") || "";
        return ApiRequest("stack_run_v2", {
          region_name: region,
          stack: toRunJson,
          app_name: appName
        }).then(function(res) {
          var m;
          m = new OpsModel({
            name: appName,
            requestId: res[0],
            state: OpsModelState.Initializing,
            progress: 0,
            region: region,
            provider: toRunJson.provider,
            usage: toRunJson.usage,
            version: toRunJson.version,
            updateTime: +(new Date()),
            stoppable: toRunJson.property.stoppable,
            resource_diff: false
          });
          App.model.appList().add(m);
          return m;
        });
      },
      duplicate: function(name) {
        var attr, collection, thumbnail;
        if (this.isApp()) {
          return;
        }
        thumbnail = ThumbUtil.fetch(this.get("id"));
        attr = $.extend(true, {}, this.attributes, {
          name: name,
          updateTime: +(new Date()),
          provider: this.get("provider")
        });
        collection = this.collection;
        return ApiRequest("stack_save_as", {
          region_name: this.get("region"),
          stack_id: this.get("id"),
          new_name: name || this.collection.getNewName()
        }).then(function(id) {
          if (thumbnail) {
            ThumbUtil.save(id, thumbnail);
          }
          attr.id = id;
          return collection.add(new OpsModel(attr));
        });
      },
      stop: function() {
        var self;
        if (!this.isApp() || this.get("state") !== OpsModelState.Running) {
          return this.__returnErrorPromise();
        }
        self = this;
        this.set("state", OpsModelState.Stopping);
        this.attributes.progress = 0;
        return ApiRequest("app_stop", {
          region_name: this.get("region"),
          app_id: this.get("id"),
          app_name: this.get("name")
        }).fail(function(err) {
          self.set("state", OpsModelState.Running);
          throw err;
        });
      },
      start: function() {
        var self;
        if (!this.isApp() || this.get("state") !== OpsModelState.Stopped) {
          return this.__returnErrorPromise();
        }
        self = this;
        this.set("state", OpsModelState.Starting);
        this.attributes.progress = 0;
        return ApiRequest("app_start", {
          region_name: this.get("region"),
          app_id: this.get("id"),
          app_name: this.get("name")
        }).fail(function(err) {
          self.set("state", OpsModelState.Stopped);
          throw err;
        });
      },
      terminate: function(force, extraOption) {
        var oldState, options, self;
        if (force == null) {
          force = false;
        }
        if (!this.isApp()) {
          return this.__returnErrorPromise();
        }
        oldState = this.get("state");
        this.set("state", OpsModelState.Terminating);
        this.attributes.progress = 0;
        this.attributes.terminateFail = false;
        self = this;
        options = $.extend({
          region_name: this.get("region"),
          app_id: this.get("id"),
          app_name: this.get("name"),
          flag: force
        }, extraOption || {});
        return ApiRequest("app_terminate", options).then(function() {
          if (force) {
            self.__destroy();
          }
        }, function(err) {
          if (err.error < 0) {
            throw err;
          }
          self.set({
            state: oldState,
            terminateFail: true
          });
          throw err;
        });
      },
      update: function(newJson, fastUpdate) {
        var errorHandler, oldState, self;
        if (!this.isApp()) {
          return this.__returnErrorPromise();
        }
        if (this.__updateAppDefer) {
          console.error("The app is already updating!");
          return this.__updateAppDefer.promise;
        }
        oldState = this.get("state");
        this.set("state", OpsModelState.Updating);
        this.attributes.progress = 0;
        this.__updateAppDefer = Q.defer();
        self = this;
        ApiRequest("app_update", {
          region_name: this.get("region"),
          spec: newJson,
          app_id: this.get("id"),
          fast_update: fastUpdate
        }).fail(function(error) {
          return self.__updateAppDefer.reject(error);
        });
        errorHandler = function(error) {
          self.__updateAppDefer = null;
          self.attributes.progress = 0;
          self.set({
            state: oldState
          });
          throw error;
        };
        return this.__updateAppDefer.promise.then(function() {
          self.__jsonData = null;
          return self.fetchJsonData().then(function() {
            self.__updateAppDefer = null;
            self.importMsrId = void 0;
            return self.set({
              name: newJson.name,
              state: OpsModelState.Running
            });
          }, errorHandler);
        }, errorHandler);
      },
      saveApp: function(newJson) {
        var oldState, self;
        if (!this.isApp()) {
          return this.__returnErrorPromise();
        }
        if (this.__saveAppDefer) {
          console.error("The app is already saving!");
          return this.__saveAppDefer.promise;
        }
        newJson.changed = false;
        if (newJson.state !== this.getStateDesc()) {
          console.warn("The new app json's state isnt the same as the app", this, newJson);
          newJson.state = this.getStateDesc();
        }
        console.assert((newJson.id || "").indexOf("stack-") === -1, "The newJson has wrong appid, in saveApp()");
        if (newJson.id) {
          if (newJson.id !== this.get("id")) {
            console.warn("The newJson has different id, in saveApp()");
          }
          newJson.id = this.get("id");
        } else {
          newJson.id = "";
        }
        oldState = this.get("state");
        this.set("state", OpsModelState.Saving);
        this.attributes.progress = 0;
        this.__saveAppDefer = Q.defer();
        self = this;
        ApiRequest("app_save_info", {
          spec: newJson
        }).then(function(res) {
          if (!self.id) {
            self.attributes.requestId = res[0];
          }
          self.attributes.importMsrId = void 0;
        }, function(error) {
          return self.__saveAppDefer.reject(error);
        });
        return this.__saveAppDefer.promise.then(function() {
          self.__jsonData = newJson;
          self.attributes.requestId = void 0;
          self.__saveAppDefer = null;
          self.set({
            name: newJson.name,
            state: oldState,
            usage: newJson.usage
          });
        }, function(error) {
          self.__saveAppDefer = null;
          self.attributes.requestId = void 0;
          self.attributes.progress = 0;
          self.set({
            state: oldState
          });
          throw error;
        });
      },
      setStatusProgress: function(steps, totalSteps) {
        var progress;
        progress = parseInt(steps * 100.0 / totalSteps);
        if (this.attributes.progress !== progress) {
          this.attributes.progress = progress;
          this.trigger("change:progress", this, progress);
        }
      },
      isProcessing: function() {
        var state;
        state = this.attributes.state;
        return state === OpsModelState.Initializing || state === OpsModelState.Stopping || state === OpsModelState.Updating || state === OpsModelState.Terminating || state === OpsModelState.Starting || state === OpsModelState.Saving;
      },
      setStatusWithApiResult: function(state) {
        console.info("OpsModel's state changes due to ApiRequest:", state, this);
        return this.set("state", OpsModelState[state]);
      },
      setStatusWithWSEvent: function(operation, state, error) {
        var d, self, toState;
        console.info("OpsModel's state changes due to WS event:", operation, state, error, this);
        switch (operation) {
          case "launch":
            if (state.completed) {
              toState = OpsModelState.Running;
            } else if (state.failed) {
              toState = OpsModelState.Destroyed;
            }
            break;
          case "stop":
            if (state.completed) {
              toState = OpsModelState.Stopped;
            } else if (state.failed) {
              toState = OpsModelState.Running;
            }
            break;
          case "update":
            if (!this.__updateAppDefer) {
              console.warn("UpdateAppDefer is null when setStatusWithWSEvent with `update` event.");
              return;
            }
            if (!state.completed) {
              d = this.__updateAppDefer;
              this.__updateAppDefer = null;
              d.reject(McError(ApiRequest.Errors.OperationFailure, error));
            } else {
              this.__jsonData = null;
              self = this;
              this.fetchJsonData().then(function() {
                d = self.__updateAppDefer;
                self.__updateAppDefer = null;
                return d.resolve();
              });
            }
            return;
          case "save":
            if (!this.__saveAppDefer) {
              console.warn("SaveAppDefer is null when setStatusWithWSEvent with `save` event.");
              return;
            }
            d = this.__saveAppDefer;
            this.__saveAppDefer = null;
            if (state.completed) {
              d.resolve();
            } else {
              d.reject(McError(ApiRequest.Errors.OperationFailure, error));
            }
            return;
          case "terminate":
            if (state.completed) {
              toState = OpsModelState.Destroyed;
            } else {
              toState = OpsModelState.Stopped;
              this.attributes.terminateFail = false;
              this.set("terminateFail", true);
            }
            break;
          case "start":
            if (state.completed) {
              toState = OpsModelState.Running;
            } else {
              toState = OpsModelState.Stopped;
            }
        }
        if (error) {
          this.attributes.opsActionError = error;
        }
        if (toState === OpsModelState.Destroyed) {
          this.__destroy();
        } else if (toState) {
          this.attributes.progress = 0;
          this.set("state", toState);
        }
      },

      /*
       Internal Methods
       */
      destroy: function() {
        return console.info("OpsModel's destroy() doesn't do anything. You probably want to call remove(), stop() or terminate()");
      },
      __destroy: function() {
        var msrId, _ref;
        if (this.attributes.state === OpsModelState.Destroyed) {
          return;
        }
        ThumbUtil.remove(this.get("id"));
        msrId = this.getMsrId();
        if (msrId) {
          if ((_ref = CloudResources("OpsResource", msrId)) != null) {
            _ref.destroy();
          }
        }
        this.attributes.state = OpsModelState.Destroyed;
        return this.trigger('destroy', this, this.collection);
      },
      __returnErrorPromise: function() {
        var d;
        d = Q.defer();
        d.resolve(McError(ApiRequest.Errors.InvalidMethodCall, "The method is not supported by this model."));
        return d.promise;
      },
      __createRawJson: function() {
        return {
          id: this.get("id") || "",
          name: this.get("name"),
          description: "",
          region: this.get("region"),
          platform: "ec2-vpc",
          state: "Enabled",
          version: this.get("version"),
          resource_diff: true,
          component: {},
          provider: this.get("provider"),
          layout: {
            size: [240, 240]
          },
          agent: {
            enabled: true,
            module: {
              repo: App.user.get("repo"),
              tag: App.user.get("tag")
            }
          },
          property: {
            stoppable: true
          }
        };
      },
      __initJsonData: function() {
        this.__jsonData = this.__createRawJson();
      }
    }, {
      extend: function(protoProps, staticProps) {
        var provider, subClass, _i, _len, _ref;
        subClass = __detailExtend.call(this, protoProps, staticProps);
        _ref = staticProps.supportedProviders;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          provider = _ref[_i];
          KnownOpsModelClass[provider] = subClass;
        }
        return subClass;
      }
    });
    OpsModel.Type = OpsModelType;
    OpsModel.State = OpsModelState;
    OpsModel.LatestVersion = OpsModelLastestVersion;
    return OpsModel;
  });

}).call(this);


/*
----------------------------
  The collection for stack / app
----------------------------

  This collection will trigger an "update" event when the list ( containing all visible items ) is changed.
 */

(function() {
  define('ide/submodels/OpsCollection',["OpsModel", "constant", "backbone"], function(OpsModel, constant) {
    return Backbone.Collection.extend({
      model: OpsModel,
      newNameTmpl: "untitled",
      comparator: function(m1, m2) {
        return -(m1.attributes.updateTime - m2.attributes.updateTime);
      },
      initialize: function() {
        this.on("change:updateTime", this.sort, this);
        this.on("add remove", this.__triggerUpdate, this);
        this.on("change:id", this.__triggerUpdate, this);
        this.__debounceUpdate = _.debounce(function() {
          return this.trigger("update");
        });
      },
      getNewName: function(possibleName) {
        var base, nameMap, nameMatch, newName, tmpl;
        nameMap = this.groupBy("name");
        base = 0;
        if (possibleName) {
          nameMatch = possibleName.match(/(.+)(-\d*)$/);
          tmpl = nameMatch ? nameMatch[1] : possibleName;
        } else {
          tmpl = this.newNameTmpl;
        }
        newName = tmpl + "-0";
        while (true) {
          if (nameMap[newName]) {
            base += 1;
          } else {
            break;
          }
          newName = tmpl + "-" + base;
        }
        return newName;
      },
      isNameAvailable: function(name) {
        return name && !this.findWhere({
          name: name
        });
      },
      groupByRegion: function(includeEmptyRegion, toJSON, includeEveryOps) {
        var R, list, m, models, r, regionMap, regions, _i, _j, _len, _len1, _ref, _ref1;
        if (includeEmptyRegion == null) {
          includeEmptyRegion = false;
        }
        if (toJSON == null) {
          toJSON = true;
        }
        if (includeEveryOps == null) {
          includeEveryOps = false;
        }
        regionMap = {};
        _ref = this.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (!includeEveryOps && !m.isExisting()) {
            continue;
          }
          r = m.attributes.region;
          list = regionMap[r] || (regionMap[r] = []);
          list.push(toJSON ? m.toJSON() : m);
        }
        regions = [];
        _ref1 = constant.REGION_KEYS;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          R = _ref1[_j];
          models = regionMap[R];
          if (!models && !includeEmptyRegion) {
            continue;
          }
          regions.push({
            region: R,
            regionName: constant.REGION_SHORT_LABEL[R],
            data: models || []
          });
        }
        return regions;
      },
      filterRecent: function(toJSON) {
        var filters, m, now, time, _i, _len, _ref;
        if (toJSON == null) {
          toJSON = false;
        }
        now = Math.round(+(new Date()) / 1000);
        filters = [];
        _ref = this.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (m.testState(OpsModel.State.Terminating)) {
            continue;
          }
          time = m.get("updateTime");
          if (now - time >= 2592000) {
            break;
          }
          if (toJSON) {
            m = m.toJSON();
            m.formatedTime = MC.intervalDate(time);
          }
          filters.push(m);
        }
        return filters;
      },
      __triggerUpdate: function(model) {
        if (!model) {
          return;
        }
        if (this.indexOf(model) !== -1 && !model.isExisting()) {
          return;
        }
        this.__debounceUpdate();
      },
      add: function(model) {
        var newName;
        if (!this.isNameAvailable(model.get("name"))) {
          newName = this.getNewName();
          model.attributes.name = newName;
          if (model.__jsonData) {
            model.__jsonData.name = newName;
          }
        }
        return Backbone.Collection.prototype.add.apply(this, arguments);
      }
    });
  });

}).call(this);


/*
----------------------------
  The Model for stack / app
----------------------------

  This model represent a stack or an app. It contains serveral methods to manipulate the stack / app
 */

(function() {
  define('ide/submodels/OpsModelOs',["OpsModel", "ApiRequest", "constant", "CloudResources"], function(OpsModel, ApiRequest, constant, CloudResources) {
    var OsOpsModel;
    OsOpsModel = OpsModel.extend({
      type: OpsModel.Type.OpenStack,
      getMsrId: function() {
        var comp, msrId, uid, _ref;
        msrId = OpsModel.prototype.getMsrId.call(this);
        if (msrId) {
          return msrId;
        }
        if (!this.__jsonData) {
          return void 0;
        }
        _ref = this.__jsonData.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.OSNETWORK) {
            return comp.resource.id;
          }
        }
        return void 0;
      },
      __initJsonData: function() {
        var comp, component, id, json, l, layout, networkId, subnetId;
        json = this.__createRawJson();
        layout = {
          "NETWORK": {
            coordinate: [27, 3],
            size: [60, 60]
          },
          "SUBNET": {
            coordinate: [30, 6],
            size: [25, 54]
          },
          "RT": {
            coordinate: [10, 3]
          }
        };
        component = {
          'KP': {
            type: "OS::Nova::KeyPair",
            name: "DefaultKP",
            resource: {}
          },
          "NETWORK": {
            type: "OS::Neutron::Network",
            resource: {
              name: "network1"
            }
          },
          "SG": {
            type: "OS::Neutron::SecurityGroup",
            resource: {
              name: "DefaultSG",
              description: "default security group",
              rules: []
            }
          },
          "RT": {
            type: "OS::Neutron::Router",
            resource: {
              external_gateway_info: {}
            }
          },
          "SUBNET": {
            type: "OS::Neutron::Subnet",
            resource: {
              cidr: "10.0.0.0/16",
              enable_dhcp: true
            }
          }
        };
        for (id in component) {
          comp = component[id];
          comp.uid = MC.guid();
          json.component[comp.uid] = comp;
          if (layout[id]) {
            l = layout[id];
            l.uid = comp.uid;
            json.layout[l.uid] = l;
          }
          if (comp.type === "OS::Neutron::Subnet") {
            subnetId = comp.uid;
          } else if (comp.type === "OS::Neutron::Network") {
            networkId = comp.uid;
          }
        }
        for (id in component) {
          comp = component[id];
          if (comp.type === "OS::Neutron::Subnet") {
            comp.resource.network_id = "@{" + networkId + ".resource.id}";
          } else if (comp.type === "OS::Neutron::Router") {
            comp.resource.router_interface = [
              {
                subnet_id: "@{" + subnetId + ".resource.id}"
              }
            ];
          }
        }
        this.__jsonData = json;
      }
    }, {
      supportedProviders: ["os::awcloud_bj"]
    });
    return OsOpsModel;
  });

}).call(this);


/*
----------------------------
  The Model for stack / app
----------------------------

  This model represent a stack or an app. It contains serveral methods to manipulate the stack / app
 */

(function() {
  define('ide/submodels/OpsModelAws',["OpsModel", "ApiRequest", "constant", "CloudResources"], function(OpsModel, ApiRequest, constant, CloudResources) {
    var AwsOpsModel;
    AwsOpsModel = OpsModel.extend({
      type: OpsModel.Type.Amazon,
      getMsrId: function() {
        var comp, msrId, uid, _ref;
        msrId = OpsModel.prototype.getMsrId.call(this);
        if (msrId) {
          return msrId;
        }
        if (!this.__jsonData) {
          return void 0;
        }
        _ref = this.__jsonData.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.VPC) {
            return comp.resource.VpcId;
          }
        }
        return void 0;
      },
      __initJsonData: function() {
        var comp, component, id, json, l, layout, vpcId, vpcRef;
        json = this.__createRawJson();
        vpcId = MC.guid();
        vpcRef = "@{" + vpcId + ".resource.VpcId}";
        layout = {
          VPC: {
            coordinate: [5, 3],
            size: [60, 60]
          },
          RTB: {
            coordinate: [50, 5],
            groupUId: vpcId
          }
        };
        component = {
          KP: {
            type: "AWS.EC2.KeyPair",
            name: "DefaultKP",
            resource: {
              KeyName: "DefaultKP",
              KeyFingerprint: ""
            }
          },
          SG: {
            type: "AWS.EC2.SecurityGroup",
            name: "DefaultSG",
            resource: {
              IpPermissions: [
                {
                  IpProtocol: "tcp",
                  IpRanges: "0.0.0.0/0",
                  FromPort: "22",
                  ToPort: "22"
                }
              ],
              IpPermissionsEgress: [
                {
                  FromPort: "0",
                  IpProtocol: "-1",
                  IpRanges: "0.0.0.0/0",
                  ToPort: "65535"
                }
              ],
              Default: true,
              GroupId: "",
              GroupName: "DefaultSG",
              GroupDescription: 'default VPC security group',
              VpcId: vpcRef
            }
          },
          ACL: {
            type: "AWS.VPC.NetworkAcl",
            name: "DefaultACL",
            resource: {
              AssociationSet: [],
              Default: true,
              NetworkAclId: "",
              VpcId: vpcRef,
              EntrySet: [
                {
                  RuleAction: "allow",
                  Protocol: -1,
                  CidrBlock: "0.0.0.0/0",
                  Egress: true,
                  IcmpTypeCode: {
                    Type: "",
                    Code: ""
                  },
                  PortRange: {
                    To: "",
                    From: ""
                  },
                  RuleNumber: 100
                }, {
                  RuleAction: "allow",
                  Protocol: -1,
                  CidrBlock: "0.0.0.0/0",
                  Egress: false,
                  IcmpTypeCode: {
                    Type: "",
                    Code: ""
                  },
                  PortRange: {
                    To: "",
                    From: ""
                  },
                  RuleNumber: 100
                }, {
                  RuleAction: "deny",
                  Protocol: -1,
                  CidrBlock: "0.0.0.0/0",
                  Egress: true,
                  IcmpTypeCode: {
                    Type: "",
                    Code: ""
                  },
                  PortRange: {
                    To: "",
                    From: ""
                  },
                  RuleNumber: 32767
                }, {
                  RuleAction: "deny",
                  Protocol: -1,
                  CidrBlock: "0.0.0.0/0",
                  Egress: false,
                  IcmpTypeCode: {
                    Type: "",
                    Code: ""
                  },
                  PortRange: {
                    To: "",
                    From: ""
                  },
                  RuleNumber: 32767
                }
              ]
            }
          },
          VPC: {
            type: "AWS.VPC.VPC",
            name: "vpc",
            resource: {
              VpcId: "",
              CidrBlock: "10.0.0.0/16",
              DhcpOptionsId: "",
              EnableDnsHostnames: false,
              EnableDnsSupport: true,
              InstanceTenancy: "default"
            }
          },
          RTB: {
            type: "AWS.VPC.RouteTable",
            name: "RT-0",
            resource: {
              VpcId: vpcRef,
              RouteTableId: "",
              AssociationSet: [
                {
                  Main: "true",
                  SubnetId: "",
                  RouteTableAssociationId: ""
                }
              ],
              PropagatingVgwSet: [],
              RouteSet: [
                {
                  InstanceId: "",
                  NetworkInterfaceId: "",
                  Origin: 'CreateRouteTable',
                  GatewayId: 'local',
                  DestinationCidrBlock: '10.0.0.0/16'
                }
              ]
            }
          }
        };
        for (id in component) {
          comp = component[id];
          if (id === "VPC") {
            comp.uid = vpcId;
          } else {
            comp.uid = MC.guid();
          }
          json.component[comp.uid] = comp;
          if (layout[id]) {
            l = layout[id];
            l.uid = comp.uid;
            json.layout[comp.uid] = l;
          }
        }
        this.__jsonData = json;
      }
    }, {
      supportedProviders: ["aws::global", "aws::china"]
    });
    return AwsOpsModel;
  });

}).call(this);


/*
----------------------------
  The Model for application
----------------------------

  This model holds all the data of the user in our database. For example, stack list / app list / notification things and extra.
 */

(function() {
  define('ide/ApplicationModel',["./submodels/OpsCollection", "OpsModel", "ApiRequest", "ApiRequestOs", "backbone", "constant", "ThumbnailUtil", "i18n!/nls/lang.js", "./submodels/OpsModelOs", "./submodels/OpsModelAws"], function(OpsCollection, OpsModel, ApiRequest, ApiRequestOs, Backbone, constant, ThumbUtil, lang) {
    return Backbone.Model.extend({
      defaults: function() {
        return {
          __websocketReady: false,
          notification: [],
          stackList: new OpsCollection(),
          appList: new OpsCollection()
        };
      },
      markNotificationRead: function() {
        var i, _i, _len, _ref;
        _ref = this.attributes.notification;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.readed = true;
        }
      },
      stackList: function() {
        return this.attributes.stackList;
      },
      appList: function() {
        return this.attributes.appList;
      },
      getOpsModelById: function(opsId) {
        return this.attributes.appList.get(opsId) || this.attributes.stackList.get(opsId);
      },
      createImportOps: function(region, provider, msrId) {
        var m;
        m = this.attributes.appList.findWhere({
          importMsrId: msrId
        });
        if (m) {
          return m;
        }
        m = new OpsModel({
          name: "ImportedApp",
          importMsrId: msrId,
          region: region,
          provider: provider,
          state: OpsModel.State.Running
        });
        this.attributes.appList.add(m);
        return m;
      },
      createSampleOps: function(sampleId) {
        var m;
        m = new OpsModel({
          sampleId: sampleId
        });
        this.attributes.stackList.add(m);
        return m;
      },
      createStack: function(region, provider) {
        var m;
        if (provider == null) {
          provider = "aws::global";
        }
        m = new OpsModel({
          region: region,
          provider: provider
        }, {
          initJsonData: true
        });
        this.attributes.stackList.add(m);
        return m;
      },
      createStackByJson: function(json, updateLayout) {
        var m;
        if (updateLayout == null) {
          updateLayout = false;
        }
        if (!this.attributes.stackList.isNameAvailable(json.name)) {
          json.name = this.stackList().getNewName(json.name);
        }
        m = new OpsModel({
          name: json.name,
          region: json.region,
          autoLayout: updateLayout
        }, {
          jsonData: json
        });
        this.attributes.stackList.add(m);
        return m;
      },
      getPriceData: function(awsRegion) {
        return (this.__awsdata[awsRegion] || {}).price;
      },
      getOsFamilyConfig: function(awsRegion) {
        return (this.__awsdata[awsRegion] || {}).osFamilyConfig;
      },
      getInstanceTypeConfig: function(awsRegion) {
        return (this.__awsdata[awsRegion] || {}).instanceTypeConfig;
      },
      getRdsData: function(awsRegion) {
        return (this.__awsdata[awsRegion] || {}).rds;
      },
      getStateModule: function(repo, tag) {
        return this.__stateModuleData[repo + ":" + tag];
      },
      getOpenstackFlavors: function(provider, region) {
        return this.__osdata[provider][region].flavors;
      },
      getOpenstackQuotas: function(provider) {
        return this.__osdata[provider].quota;
      },

      /*
        Internal methods
       */
      initialize: function() {
        this.__awsdata = {};
        this.__osdata = {};
        this.__stateModuleData = {};
        this.__initializeNotification();
      },
      fetch: function() {
        var ap, awsData, osData, self, sp;
        self = this;
        sp = ApiRequest("stack_list", {
          region_name: null
        }).then(function(res) {
          return self.get("stackList").set(self.__parseListRes(res));
        });
        ap = ApiRequest("app_list", {
          region_name: null
        }).then(function(res) {
          return self.get("appList").set(self.__parseListRes(res));
        });
        awsData = ApiRequest("aws_aws", {
          fields: ["region", "price", "instance_types", "rds"]
        }).then(function(res) {
          return self.__parseAwsData(res);
        });
        osData = ApiRequestOs("os_os", {
          provider: null
        }).then(function(res) {
          return self.__parseOsData(res);
        });
        return Q.all([sp, ap, awsData, osData]).then(function() {
          var e;
          try {
            ThumbUtil.cleanup(self.appList().pluck("id").concat(self.stackList().pluck("id")));
          } catch (_error) {
            e = _error;
          }
        });
      },
      __parseAwsData: function(res) {
        var cpu, i, instanceTypeConfig, storage, typeInfo, _i, _j, _len, _len1, _ref;
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          i = res[_i];
          instanceTypeConfig = {};
          this.__awsdata[i.region] = {
            price: i.price,
            osFamilyConfig: i.instance_types.sort,
            instanceTypeConfig: instanceTypeConfig,
            rds: i.rds
          };
          _ref = i.instance_types.info || [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            typeInfo = _ref[_j];
            if (!typeInfo) {
              continue;
            }
            cpu = typeInfo.cpu || {};
            typeInfo.name = typeInfo.description;
            typeInfo.formated_desc = [typeInfo.name || "", cpu.units + " ECUs", cpu.cores + " vCPUs", typeInfo.memory + " GiB memory"];
            typeInfo.description = typeInfo.formated_desc.join(", ");
            storage = typeInfo.storage;
            if (storage && storage.ssd === true) {
              typeInfo.description += ", " + storage.count + " x " + storage.size + " GiB SSD Storage Capacity";
            }
            instanceTypeConfig[typeInfo.typeName] = typeInfo;
          }
        }
      },
      __parseOsData: function(res) {
        var data, dataset, osQuota, provider, providerData, self, _i, _len;
        self = this;
        for (provider in res) {
          dataset = res[provider];
          for (_i = 0, _len = dataset.length; _i < _len; _i++) {
            data = dataset[_i];
            providerData = this.__osdata[provider] || (this.__osdata[provider] = {});
            providerData[data.region] = {
              flavors: new Backbone.Collection(_.values(data.flavor))
            };
          }
          osQuota = ApiRequestOs("os_quota", {
            provider: provider
          }).then(function(res) {
            return self.__parseOsQuota(res);
          });
        }
      },
      __parseOsQuota: function(res) {
        var cate, data, dataset, key, pd, provider, q, quota;
        quota = {};
        for (provider in res) {
          dataset = res[provider];
          for (cate in dataset) {
            data = dataset[cate];
            for (key in data) {
              q = data[key];
              quota["" + cate + "::" + key] = q;
            }
          }
          pd = this.__osdata[provider] || (this.__osdata[provider] = {});
          pd.quota = quota;
        }
      },
      fetchStateModule: function(repo, tag) {
        var d, data, self;
        data = this.getStateModule(repo, tag);
        if (data) {
          d = Q.defer();
          d.resolve(data);
          return d.promise;
        }
        self = this;
        return ApiRequest("state_module", {
          mod_repo: repo,
          mod_tag: tag
        }).then(function(d) {
          var e;
          try {
            d = JSON.parse(d);
          } catch (_error) {
            e = _error;
            throw McError(ApiRequest.Errors.InvalidRpcReturn, "Can't load state data. Please retry.");
          }
          self.__stateModuleData[repo + ":" + tag] = d;
          return d;
        });
      },
      __parseListRes: function(res) {
        var ops, r, _i, _len;
        r = [];
        for (_i = 0, _len = res.length; _i < _len; _i++) {
          ops = res[_i];
          r.push({
            id: ops.id,
            updateTime: ops.time_update,
            region: ops.region,
            usage: ops.usage,
            name: ops.name,
            version: ops.version,
            provider: ops.provider,
            state: OpsModel.State[ops.state] || OpsModel.State.UnRun,
            stoppable: !(ops.property && ops.property.stoppable === false)
          });
        }
        return r;
      },
      __initializeNotification: function() {
        var self;
        self = this;
        return App.WS.on("requestChange", function(idx, dag) {
          return self.__processSingleNotification(idx, dag);
        });
      },
      __triggerNotification: _.debounce(function() {
        return this.trigger("change:notification");
      }, 400),
      __processSingleNotification: function(idx) {
        var i, info_list, item, ops, req, same_req, space, _i, _len;
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
        this.__handleRequestChange(item);
        if (item.operation === "save") {
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
        if (same_req && _.isEqual(same_req.state, item.state)) {
          return;
        }
        item.readed = !App.WS.isReady();
        if (!item.readed && App.workspaces && !item.state.failed) {
          space = App.workspaces.getAwakeSpace();
          ops = this.appList().get(item.targetId) || this.stackList().get(item.targetId);
          item.readed = space.isWorkingOn(ops);
        }
        info_list.splice(idx, 1);
        info_list.splice(0, 0, item);
        if (info_list.length > 30) {
          info_list.length = 30;
        }
        this.__triggerNotification();
        return null;
      },
      __parseRequestInfo: function(req) {
        var dag, duration, i, request, time_begin, time_end, _i, _len, _ref;
        if (!req.brief) {
          return;
        }
        dag = req.dag;
        request = {
          id: req.id,
          region: constant.REGION_SHORT_LABEL[req.region],
          time: req.time_end,
          operation: constant.OPS_CODE_NAME[req.code],
          targetId: dag && dag.spec ? dag.spec.id : req.rid,
          targetName: req.brief.split(" ")[2] || "",
          state: {
            processing: true
          },
          readed: true
        };
        switch (req.state) {
          case constant.OPS_STATE.OPS_STATE_FAILED:
            request.error = req.data;
            request.state = {
              failed: true
            };
            break;
          case constant.OPS_STATE.OPS_STATE_INPROCESS:
            request.time = req.time_begin;
            request.step = 0;
            if (req.dag && req.dag.step) {
              request.totalSteps = req.dag.step.length;
              _ref = req.dag.step;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                i = _ref[_i];
                if (i[1] === "done") {
                  ++request.step;
                }
              }
            } else {
              request.totalSteps = 1;
            }
            break;
          case constant.OPS_STATE.OPS_STATE_DONE:
            if (request.operation === "save") {
              request.targetId = req.data;
            }
            request.state = {
              completed: true,
              terminated: req.code === 'Forge.App.Terminate'
            };
            break;
          case constant.OPS_STATE.OPS_STATE_PENDING:
            request.state = {
              pending: true
            };
            request.time = "";
        }
        if (request.time) {
          request.time = MC.dateFormat(new Date(request.time * 1000), "hh:mm yyyy-MM-dd");
          if (req.state !== constant.OPS_STATE.OPS_STATE_INPROCESS) {
            time_begin = parseInt(req.time_begin, 10);
            time_end = parseInt(req.time_end, 10);
            if (!isNaN(time_begin) && !isNaN(time_end) && time_end >= time_begin) {
              duration = time_end - time_begin;
              if (duration < 60) {
                request.duration = sprintf(lang.TOOLBAR.TOOK_XXX_SEC, duration);
              } else {
                request.duration = sprintf(lang.TOOLBAR.TOOK_XXX_MIN, Math.round(duration / 60));
              }
            }
          }
        }
        return request;
      },
      __handleRequestChange: function(request) {
        var theApp;
        if (!App.WS.isReady() && !request.state.processing) {
          return;
        }
        if (request.state.pending) {
          return;
        }
        theApp = this.appList().get(request.targetId);
        if (!theApp) {
          theApp = this.appList().findWhere({
            requestId: request.id
          });
          if (theApp && request.targetId) {
            theApp.set("id", request.targetId);
          }
        }
        if (!theApp) {
          return;
        }
        if (!request.state.processing && !theApp.isProcessing()) {
          return;
        }
        if (theApp.testState(OpsModel.State.Terminating) && request.operation !== "terminate") {
          console.error("We recevied a request notification, which operation is not `terminate`. But the app is terminating.", request);
          return;
        }
        if (request.state.processing) {
          return theApp.setStatusProgress(request.step, request.totalSteps);
        } else {
          return theApp.setStatusWithWSEvent(request.operation, request.state, request.error);
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
  define('ide/User',["ApiRequest", "ApiRequestR", "backbone"], function(ApiRequest, ApiRequestR) {
    var Model, PaymentState, UserState;
    UserState = {
      NotFirstTime: 2
    };
    PaymentState = {
      NoInfo: "",
      Pastdue: "pastdue",
      Unpaid: "unpaid",
      Active: "active"
    };
    Model = Backbone.Model.extend({
      defaults: {
        paymentState: "",
        voQuotaPerMonth: 1000,
        voQuotaCurrent: 0
      },
      initialize: function() {
        this.set({
          usercode: $.cookie("usercode"),
          username: Base64.decode($.cookie("usercode")),
          session: $.cookie("session_id")
        });
      },
      hasCredential: function() {
        return !!this.get("account");
      },
      isFirstVisit: function() {
        return !(UserState.NotFirstTime & this.get("state"));
      },
      fullnameNotSet: function() {
        return !this.get("firstName") || !this.get("lastName");
      },
      isUnpaid: function() {
        return this.get("paymentState") === PaymentState.Unpaid;
      },
      shouldPay: function() {
        return (this.get("voQuotaCurrent") >= this.get("voQuotaPerMonth")) && (!this.get("creditCard") || this.isUnpaid());
      },
      getBillingOverview: function() {
        var ov;
        ov = {
          quotaTotal: this.get("voQuotaPerMonth"),
          quotaCurrent: this.get("voQuotaCurrent"),
          billingStart: this.get("billingStart"),
          billingEnd: this.get("billingEnd"),
          billingRemain: Math.round((this.get("billingEnd") - new Date()) / 24 / 3600000)
        };
        ov.quotaRemain = Math.max(ov.quotaTotal - ov.quotaCurrent, 0);
        ov.billingRemain = Math.min(ov.billingRemain, 31);
        ov.billingRemain = Math.max(ov.billingRemain, 0);
        ov.quotaPercent = Math.round(Math.min(ov.quotaCurrent, ov.quotaTotal) / Math.max(ov.quotaCurrent, ov.quotaTotal) * 100);
        return ov;
      },
      userInfoAccuired: function(result) {
        var idx, paymentInfo, res, selfPage, t, _i, _len, _ref;
        paymentInfo = result.payment || {};
        selfPage = paymentInfo.self_page || {};
        res = {
          email: Base64.decode(result.email),
          repo: result.mod_repo,
          tag: result.mod_tag,
          state: parseInt(result.state, 10),
          intercomHash: result.intercom_secret,
          account: result.account_id,
          firstName: Base64.decode(result.first_name || ""),
          lastName: Base64.decode(result.last_name || ""),
          cardFirstName: Base64.decode(selfPage.first_name || ""),
          cardLastName: Base64.decode(selfPage.last_name || ""),
          voQuotaCurrent: paymentInfo.current_quota || 0,
          voQuotaPerMonth: paymentInfo.max_quota || 3600,
          has_card: !!paymentInfo.has_card,
          paymentUrl: selfPage.url,
          creditCard: selfPage.card,
          billingEnd: new Date(selfPage.current_period_ends_at || new Date()),
          billingStart: new Date(selfPage.current_period_started_at || new Date()),
          renewDate: paymentInfo.next_reset_time ? new Date(paymentInfo.next_reset_time * 1000) : new Date(),
          paymentState: paymentInfo.state || "",
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
          ApiRequest("account_update_account", {
            attributes: {
              state: "" + (this.get("state") | UserState.NotFirstTime)
            }
          });
        }
      },
      onWsUserStateChange: function(changes) {
        var attr, changed, key, paymentInfo, that, toChange, value;
        console.log(changes);
        that = this;
        paymentInfo = changes.payment;
        if (!changes) {
          return;
        }
        attr = {
          current_quota: "voQuotaCurrent",
          max_quota: "voQuotaPerMonth",
          has_card: "creditCard",
          state: "paymentState"
        };
        changed = !!changes.time_update;
        toChange = {};
        for (key in attr) {
          value = attr[key];
          if (paymentInfo != null ? paymentInfo.hasOwnProperty(key) : void 0) {
            changed = true;
            toChange[value] = paymentInfo[key];
          }
        }
        if (changed) {
          this.set(toChange);
        }
        if (paymentInfo != null ? paymentInfo.next_reset_time : void 0) {
          App.user.set("renewDate", new Date(paymentInfo.next_reset_time * 1000));
        }
        if (App.user.get("firstName") && App.user.get("lastName")) {
          ApiRequestR("payment_self").then(function(result) {
            paymentInfo = {
              creditCard: result.card,
              billingEnd: new Date(result.current_period_ends_at || null),
              billingStart: new Date(result.current_period_started_at || null),
              paymentUrl: result.url,
              cardFirstName: result.card ? Base64.decode(result.first_name || "") : void 0,
              cardLastName: result.card ? Base64.decode(result.last_name || "") : void 0
            };
            that.set(paymentInfo);
            return that.trigger("paymentUpdate");
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
            'activator': '#support'
          }
        });
      },
      fetch: function() {
        var self;
        self = this;
        return ApiRequest("session_login", {
          username: this.get("username"),
          password: this.get("session")
        }).then(function(result) {
          self.userInfoAccuired(result);

          /* env:prod */
          self.bootIntercom();

          /* env:prod:end */
          if (self.hasCredential()) {
            return ApiRequest("ec2_DescribeRegions").fail(function() {});
          }
        }, function(err) {
          if (err.error < 0) {
            if (err.error === ApiRequest.Errors.Network500) {
              window.location = "/500";
            } else {
              window.location.reload();
            }
          } else {
            App.logout();
          }
          throw err;
        });
      },
      acquireSession: function(password) {
        return ApiRequest("session_login", {
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
        var cValue, ckey, def, domain, _ref;
        domain = {
          "domain": window.location.hostname.replace("ide", ""),
          "path": "/"
        };
        def = {
          "path": "/"
        };
        _ref = $.cookie();
        for (ckey in _ref) {
          cValue = _ref[ckey];
          $.removeCookie(ckey, domain);
          $.removeCookie(ckey, def);
        }
      },
      changePassword: function(oldPwd, newPwd) {
        return ApiRequest("account_update_account", {
          attributes: {
            password: oldPwd,
            new_password: newPwd
          }
        });
      },
      changeEmail: function(email, oldPwd) {
        var self;
        self = this;
        return ApiRequest("account_update_account", {
          attributes: {
            password: oldPwd,
            email: email
          }
        }).then(function() {
          return self.set("email", email);
        });
      },
      changeName: function(firstName, lastName) {
        var defer, self;
        self = this;
        defer = new Q.defer();
        if (firstName === self.get("firstName") && lastName === self.get("lastName")) {
          defer.resolve();
        }
        ApiRequest("account_update_account", {
          attributes: {
            first_name: firstName,
            last_name: lastName
          }
        }).then(function(res) {
          self.userInfoAccuired(res);
          return defer.resolve(res);
        }, function(err) {
          return defer.reject(err);
        });
        return defer.promise;
      },
      validateCredential: function(accessKey, secretKey) {
        return ApiRequest("account_validate_credential", {
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
        return ApiRequest("account_set_credential", {
          access_key: accessKey,
          secret_key: secretKey,
          account_id: account,
          force_update: force
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
    Model.PaymentState = PaymentState;
    return Model;
  });

}).call(this);

(function() {
  define('ide/subviews/WorkspaceView',['i18n!/nls/lang.js', "backbone", "jquerysort"], function(lang) {
    return Backbone.View.extend({
      el: $("#tabbar-wrapper")[0],
      events: {
        "click li": "onClick",
        "click .icon-close": "onClose"
      },
      initialize: function(options) {
        var self;
        self = this;
        this.tabsWidth = 0;
        this.$el.find("#ws-tabs").dragsort({
          horizontal: true,
          dragSelectorExclude: ".fixed, .icon-close",
          dragEnd: function() {
            self.updateTabOrder();
          }
        });
      },
      updateTabOrder: function() {
        return this.trigger("orderChanged", this.tabOrder());
      },
      tabOrder: function() {
        return _.map(this.$el.find("li"), function(li) {
          return li.id;
        });
      },
      setTabIndex: function(id, isFixed, idx) {
        var $after, $group, $tgt;
        $tgt = this.$el.find("#" + id);
        if (!$tgt.length) {
          return;
        }
        if (isFixed) {
          $group = $("#ws-fixed-tabs");
        } else {
          $group = $("#ws-tabs");
          idx -= $("#ws-fixed-tabs").children().length;
        }
        $after = $group.children().eq(idx);
        if ($after.length) {
          $tgt.insertBefore($after);
        } else {
          $group.append($tgt);
        }
      },
      addTab: function(data, index, fixed) {
        var $parent, $tgt, tpl;
        if (index == null) {
          index = -1;
        }
        if (fixed == null) {
          fixed = false;
        }
        $parent = fixed ? $("#ws-fixed-tabs") : $("#ws-tabs");
        tpl = "<li class='" + data.klass + "' id='" + data.id + "' title='" + data.title + "'><span class='truncate'>" + data.title + "</span>";
        if (data.closable) {
          tpl += '<i class="icon-close" title="' + lang.TOOLBAR.TIT_CLOSE_TAB + '"></i>';
        }
        $tgt = $parent.children().eq(index);
        if ($tgt.length) {
          $tgt = $(tpl + "</li>").insertAfter($tgt);
        } else {
          $tgt = $(tpl + "</li>").appendTo($parent);
        }
        this.tabsWidth += $tgt.outerWidth();
        this.ensureTabSize();
        return $tgt;
      },
      removeTab: function(id) {
        var $tgt;
        $tgt = this.$el.find("#" + id);
        this.tabsWidth -= $tgt.outerWidth();
        $tgt.remove();
        this.ensureTabSize();
        return $tgt;
      },
      ensureTabSize: function() {
        var availableSpace, children, windowWidth;
        windowWidth = $(window).width();
        availableSpace = windowWidth - $("#header").outerWidth() - $("#ws-tabs").offset().left;
        children = $("#ws-tabs").children();
        if (this.tabsWidth < availableSpace) {
          children.css("max-width", "auto");
        } else {
          availableSpace = Math.floor(availableSpace / children.length);
          children.css("max-width", availableSpace);
        }
      },
      updateTab: function(id, title, klass) {
        var $tgt;
        $tgt = this.$el.find("#" + id);
        if (title !== void 0 || title !== null) {
          this.tabsWidth -= $tgt.outerWidth();
          $tgt.attr("title", title);
          $tgt.children("span").text(title);
          $tgt.attr("title", title);
          this.tabsWidth += $tgt.outerWidth();
          this.ensureTabSize();
        }
        if (klass !== void 0 || klass !== null) {
          if ($tgt.hasClass("active")) {
            klass += " active";
          }
          $tgt.attr("class", klass);
        }
      },
      activateTab: function(id) {
        this.$el.find(".active").removeClass("active");
        this.$el.find("#" + id).addClass("active");
      },
      onClick: function(evt) {
        this.trigger("click", evt.currentTarget.id);
      },
      onClose: function(evt) {
        this.trigger("close", $(evt.currentTarget).closest("li")[0].id);
        return false;
      },
      showLoading: function() {
        return $("#GlobalLoading").show();
      },
      hideLoading: function() {
        return $("#GlobalLoading").hide();
      }
    });
  });

}).call(this);

(function() {
  define('ide/WorkspaceManager',["./subviews/WorkspaceView", "underscore"], function(WorkspaceView) {
    var WorkspaceManager;
    WorkspaceManager = (function() {
      function WorkspaceManager() {
        var self;
        this.view = new WorkspaceView();
        self = this;
        this.view.on("orderChanged", function(order) {
          return self.__updateOrder(order);
        });
        this.view.on("click", function(id) {
          return self.awakeWorkspace(id);
        });
        this.view.on("close", function(id) {
          return self.remove(id);
        });
        this.__spaces = [];
        this.__spacesById = {};
        this.__awakeSpace = null;
        return this;
      }

      WorkspaceManager.prototype.__updateOrder = function(order) {
        var self;
        self = this;
        this.__spaces = order.map(function(id) {
          return self.__spacesById[id];
        });
      };

      WorkspaceManager.prototype.spaces = function() {
        return this.__spaces.slice(0);
      };

      WorkspaceManager.prototype.get = function(id) {
        return this.__spacesById[id];
      };

      WorkspaceManager.prototype.setIndex = function(workspace, idx) {
        this.view.setTabIndex(workspace.id, workspace.isFixed(), idx);
        this.__updateOrder(this.view.tabOrder());
      };

      WorkspaceManager.prototype.add = function(workspace) {
        this.__spacesById[workspace.id] = workspace;
        this.view.addTab({
          title: workspace.title(),
          id: workspace.id,
          closable: !workspace.isFixed(),
          klass: workspace.tabClass()
        }, -1, workspace.isFixed());
        this.__updateOrder(this.view.tabOrder());
        if (this.__spaces.length === 1) {
          this.awakeWorkspace(workspace);
        }
        return workspace;
      };

      WorkspaceManager.prototype.getAwakeSpace = function() {
        return this.__awakeSpace;
      };

      WorkspaceManager.prototype.awakeWorkspace = function(workspace) {
        var promise;
        if (!workspace) {
          return;
        }
        if (_.isString(workspace)) {
          workspace = this.__spacesById[workspace];
        }
        if (this.__awakeSpace === workspace) {
          return;
        }
        if (workspace.isRemoved()) {
          return;
        }
        if (this.__awakeSpace) {
          this.__awakeSpace.sleep();
        }
        this.__awakeSpace = workspace;
        this.__updateUrl();
        this.view.activateTab(workspace.id);
        promise = workspace.awake();
        if (promise && promise.then && promise.isFulfilled && !promise.isFulfilled()) {
          promise.then((function(_this) {
            return function() {
              return _this.view.hideLoading();
            };
          })(this));
          this.view.showLoading();
        } else {
          this.view.hideLoading();
        }
      };

      WorkspaceManager.prototype.update = function(workspace) {
        if (!workspace) {
          return;
        }
        if (workspace === this.__awakeSpace) {
          this.__updateUrl(true);
        }
        this.view.updateTab(workspace.id, workspace.title(), workspace.tabClass());
        return workspace;
      };

      WorkspaceManager.prototype.remove = function(workspace, force) {
        var id;
        if (!workspace) {
          return;
        }
        if (_.isString(workspace)) {
          workspace = this.__spacesById[workspace];
        }
        if (!force && !workspace.isRemovable()) {
          return;
        }
        id = workspace.id;
        this.view.removeTab(id);
        delete this.__spacesById[id];
        this.__spaces.splice(this.__spaces.indexOf(workspace), 1);
        workspace.stopListening();
        workspace.cleanup();
        if (this.__awakeSpace === workspace) {
          this.__awakeSpace = null;
          this.awakeWorkspace(this.__spaces[this.__spaces.length - 1]);
        }
        return workspace;
      };

      WorkspaceManager.prototype.removeAllSpaces = function(filter) {
        var space, _i, _len, _ref;
        _ref = this.__spaces.slice(0);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          space = _ref[_i];
          if (!space.isFixed() && (!filter || filter(space))) {
            this.remove(space, true);
          }
        }
      };

      WorkspaceManager.prototype.find = function(attribute) {
        return _.find(this.__spaces, function(space) {
          return space.isWorkingOn(attribute);
        });
      };

      WorkspaceManager.prototype.hasUnsaveSpaces = function() {
        return this.__spaces.some(function(ws) {
          return ws.isModified();
        });
      };

      WorkspaceManager.prototype.__updateUrl = function(replace) {
        if (replace == null) {
          replace = false;
        }
        return Router.navigate(this.__awakeSpace.url(), {
          replace: replace
        });
      };

      return WorkspaceManager;

    })();
    return WorkspaceManager;
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
  define('ide/Application',["ApiRequest", "./Websocket", "./ApplicationView", "./ApplicationModel", "./User", "./subviews/SettingsDialog", "CloudResources", "./WorkspaceManager", "OpsModel", "JsonExporter", "constant", "i18n!/nls/lang.js", "underscore"], function(ApiRequest, Websocket, ApplicationView, ApplicationModel, User, SettingsDialog, CloudResources, WorkspaceManager, OpsModel, JsonExporter, constant, lang) {
    var VisualOps;
    VisualOps = function() {
      if (window.App) {
        console.error("Application is already created.");
        return;
      }
      window.App = this;
    };
    VisualOps.prototype.initialize = function() {
      var fetchModel;
      this.__createUser();
      this.__createWebsocket();
      this.workspaces = new WorkspaceManager();
      this.model = new ApplicationModel();
      this.__view = new ApplicationView();
      fetchModel = this.model.fetch().fail(function(err) {
        notification(lang.NOTIFY.CANNOT_LOAD_APPLICATION_DATA);
        throw err;
      });
      return Q.all([this.user.fetch(), fetchModel]);
    };
    VisualOps.prototype.__createWebsocket = function() {
      this.WS = new Websocket();
      this.WS.on("Disconnected", function() {
        return App.acquireSession();
      });
      this.WS.on("StatusChanged", function(isConnected) {
        console.info("Websocket Status changed, isConnected:", isConnected);
        if (App.__view) {
          return App.__view.toggleWSStatus(isConnected);
        }
      });
      this.WS.on("userStateChange", function(idx, dag) {
        return App.user.onWsUserStateChange(dag);
      });
    };
    VisualOps.prototype.__createUser = function() {
      this.user = new User();
      this.user.on("SessionUpdated", (function(_this) {
        return function() {
          return _this.WS.subscribe();
        };
      })(this));
      this.user.on("change:credential", (function(_this) {
        return function() {
          return _this.discardAwsCache();
        };
      })(this));
    };
    VisualOps.prototype.acquireSession = function() {
      return this.__view.showSessionDialog();
    };
    VisualOps.prototype.logout = function() {
      var p;
      App.user.logout();
      p = window.location.pathname;
      if (p === "/") {
        p = window.location.hash.replace("#", "/");
      }
      if (p && p !== "/") {
        window.location.href = "/login?ref=" + p;
      } else {
        window.location.href = "/login";
      }
    };
    VisualOps.prototype.canQuit = function() {
      return !this.workspaces.hasUnsaveSpaces();
    };
    VisualOps.prototype.showSettings = function(tab) {
      return new SettingsDialog({
        defaultTab: tab
      });
    };
    VisualOps.prototype.showSettings.TAB = SettingsDialog.TAB;
    VisualOps.prototype.askForAwsCredential = function() {
      return this.__view.askForAwsCredential();
    };
    VisualOps.prototype.deleteStack = function(id, name) {
      return this.__view.deleteStack(id, name);
    };
    VisualOps.prototype.duplicateStack = function(id) {
      return this.__view.duplicateStack(id);
    };
    VisualOps.prototype.startApp = function(id) {
      return this.__view.startApp(id);
    };
    VisualOps.prototype.stopApp = function(id) {
      return this.__view.stopApp(id);
    };
    VisualOps.prototype.terminateApp = function(id) {
      return this.__view.terminateApp(id);
    };
    VisualOps.prototype.discardAwsCache = function() {
      return CloudResources.invalidate();
    };
    VisualOps.prototype.importJson = function(json, updateLayout) {
      var result;
      if (_.isString(json)) {
        result = JsonExporter.importJson(json);
        if (_.isString(result)) {
          return result;
        }
      } else {
        result = json;
      }
      return this.openOps(this.model.createStackByJson(result, updateLayout));
    };
    VisualOps.prototype.openOps = function(opsModel, refresh) {
      var editor;
      if (!opsModel) {
        return;
      }
      if (_.isString(opsModel)) {
        opsModel = this.model.getOpsModelById(opsModel);
      }
      if (!opsModel) {
        console.warn("The OpsModel is not found when opening.");
        return;
      }
      if (opsModel.testState(OpsModel.State.Destroyed)) {
        console.error("The OpsModel is destroyed", opsModel);
        return;
      }
      editor = this.workspaces.find(opsModel);
      if (editor && refresh) {
        editor.remove();
        editor = null;
      }
      if (!editor) {
        editor = new OpsEditor(opsModel);
      }
      editor.activate();
      return editor;
    };
    VisualOps.prototype.createOps = function(region, provider) {
      var editor;
      if (!region) {
        return;
      }
      editor = new OpsEditor(this.model.createStack(region, provider));
      editor.activate();
      editor;
    };
    return VisualOps;
  });

}).call(this);

(function() {
  define('Workspace',["backbone"], function() {
    var Workspace, wsid;
    wsid = 0;
    Workspace = (function() {
      function Workspace(attributes) {
        var ws, _i, _len, _ref;
        _ref = App.workspaces.spaces();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ws = _ref[_i];
          if (ws instanceof this.constructor && ws.isWorkingOn(attributes)) {
            console.info("Found a workspace that is working on, ", attributes, ws);
            return ws;
          }
        }
        this.id = "space_" + (++wsid);
        this.initialize(attributes);
        App.workspaces.add(this);
        return this;
      }

      Workspace.prototype.isAwake = function() {
        return App.workspaces.getAwakeSpace() === this;
      };

      Workspace.prototype.index = function() {
        return App.workspaces.spaces().indexOf(this);
      };

      Workspace.prototype.setIndex = function(idx) {
        return App.workspaces.setIndex(this, idx);
      };

      Workspace.prototype.isRemoved = function() {
        return !!this.__isRemoved;
      };

      Workspace.prototype.remove = function() {
        if (this.__isRemoved) {
          return;
        }
        this.__isRemoved = true;
        return App.workspaces.remove(this, true);
      };

      Workspace.prototype.updateTab = function() {
        return App.workspaces.update(this);
      };

      Workspace.prototype.activate = function() {
        return App.workspaces.awakeWorkspace(this);
      };


      /*
        Methods that should be override
       */

      Workspace.prototype.initialize = function(attributes) {};

      Workspace.prototype.isFixed = function() {
        return false;
      };

      Workspace.prototype.isModified = function() {
        return false;
      };

      Workspace.prototype.tabClass = function() {
        return "";
      };

      Workspace.prototype.title = function() {
        return "";
      };

      Workspace.prototype.awake = function() {
        if (this.view) {
          return this.view.$el.show();
        }
      };

      Workspace.prototype.sleep = function() {
        $(document.activeElement).filter("input, textarea").blur();
        if (this.view) {
          return this.view.$el.hide();
        }
      };

      Workspace.prototype.cleanup = function() {
        if (this.view) {
          this.view.remove();
        } else {
          console.warn("Cannot find @view when workspace is about to remove:", this);
        }
      };

      Workspace.prototype.isRemovable = function() {
        return true;
      };

      Workspace.prototype.isWorkingOn = function(attributes) {
        return false;
      };

      Workspace.prototype.updateUrl = function() {
        if (this.isAwake()) {
          Router.navigate(this.url(), {
            replace: true
          });
        }
      };

      return Workspace;

    })();
    _.extend(Workspace.prototype, Backbone.Events);
    return Workspace;
  });

}).call(this);

(function() {
  define('ide/Router',["backbone"], function() {
    return Backbone.Router.extend({
      routes: {
        "": "openDashboard"
      },
      initialize: function() {
        this.route(/^ops\/([^/]+$)/, "openOps");
        this.route(/^store\/([^/]+$)/, "openStore");
      },
      openStore: function(id) {
        var opsModel;
        opsModel = App.model.stackList().findWhere({
          sampleId: id
        });
        if (!opsModel) {
          opsModel = App.model.createSampleOps(id);
        }
        Router.navigate(opsModel.url(), {
          replace: true
        });
        App.openOps(opsModel);
      },
      openOps: function(id) {
        if (!App.openOps(id)) {
          Router.navigate("/", {
            replace: true
          });
        }
      },
      openDashboard: function() {
        if (window.Dashboard) {
          return window.Dashboard.activate();
        }
      },
      start: function() {
        if (!Backbone.history.start({
          pushState: true
        })) {
          console.warn("URL doesn't match any routes.");
          this.navigate("/", {
            replace: true
          });
        }
        this.route(/^ops\/([^/]+)/, "openOps");
      },
      execute: function() {
        this.__forceReplace = true;
        Backbone.Router.prototype.execute.apply(this, arguments);
        this.__forceReplace = false;
      },
      navigate: function(fragment, options) {
        if (this.__forceReplace) {
          options = options || {};
          options.replace = true;
        }
        $(document).trigger("urlroute");
        return Backbone.Router.prototype.navigate.apply(this, arguments);
      }
    });
  });

}).call(this);

(function() {
  define('ide/AppBundle',["./Application", "OpsModel", "Workspace", "./Router"], function(Application) {
    return Application;
  });

}).call(this);

