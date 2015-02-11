
/*
----------------------------
  A refactor version of previous lib/websocket
  The usage of Meteor seems to be wrong, but whatever.
----------------------------
 */

(function() {
  define('ide/Websocket',["Meteor", "backbone", "event", "MC"], function(Meteor, Backbone, ide_event) {
    var WEBSOCKET_URL, Websocket, singleton;
    singleton = null;
    WEBSOCKET_URL = "" + MC.API_HOST + "/ws/";
    Meteor._debug = function() {
      return console.log.apply(console, arguments);
    };
    Websocket = function() {
      var opts;
      if (singleton) {
        return singleton;
      }
      singleton = this;
      this.connection = Meteor.connect(WEBSOCKET_URL, true);
      this.projects = {};
      opts = {
        connection: this.connection
      };
      this.collection = {
        project: new Meteor.Collection("project", opts),
        history: new Meteor.Collection("project_history", opts),
        user: new Meteor.Collection("user", opts),
        imports: new Meteor.Collection("imports", opts),
        request: new Meteor.Collection("request", opts),
        status: new Meteor.Collection("status", opts),
        app: new Meteor.Collection("app", opts),
        stack: new Meteor.Collection("stack", opts)
      };
      Deps.autorun((function(_this) {
        return function() {
          return _this.statusChanged();
        };
      })(this));
      this.pipeChanges();
      setTimeout((function(_this) {
        return function() {
          _this.shouldNotify = true;
          if (!_this.connection.status.connected) {
            return _this.statusChanged();
          }
        };
      })(this), 5000);
      this.appWideSubscripe();
      return this;
    };
    Websocket.prototype.isReady = function(projectId) {
      var _ref;
      return (_ref = this.projects[projectId]) != null ? _ref.ready : void 0;
    };
    Websocket.prototype.onUserSubError = function(e) {
      console.log(e);
      this.trigger("Disconnected");
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
    Websocket.prototype.appWideSubscripe = function() {
      this.connection.subscribe("user", App.user.get("usercode"), App.user.get("session"), {
        onReady: function() {},
        onError: function(e) {
          return singleton.onUserSubError(e);
        }
      });
      return this.connection.subscribe("imports", App.user.get("usercode"), App.user.get("session"));
    };
    Websocket.prototype.subscribe = function(projectId) {
      var self, session, usercode;
      if (this.projects[projectId]) {
        return;
      }
      self = this;
      session = App.user.get("session");
      usercode = App.user.get("usercode");
      this.projects[projectId] = [
        this.connection.subscribe("history", usercode, session, projectId), this.connection.subscribe("project", usercode, session, projectId, {
          onError: function(e) {
            return self.onError(e, projectId);
          }
        }), this.connection.subscribe("request", usercode, session, projectId, function() {
          var _ref;
          if ((_ref = self.projects[projectId]) != null) {
            _ref.ready = true;
          }
        }), this.connection.subscribe("status", usercode, session, projectId), this.connection.subscribe("stack", usercode, session, projectId), this.connection.subscribe("app", usercode, session, projectId)
      ];
    };
    Websocket.prototype.unsubscribe = function(projectId) {
      var subscription, _i, _len, _ref;
      _ref = this.projects[projectId] || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subscription = _ref[_i];
        subscription.stop();
      }
      delete this.projects[projectId];
    };
    Websocket.prototype.onError = function(error, projectId) {
      var e;
      console.error("Websocket/Meteor Error:", error);
      if (!this.subscribeErrorState) {
        this.subscribeErrorState = true;
        try {
          this.unsubscribe(projectId);
        } catch (_error) {
          e = _error;
        }
        this.trigger("Disconnected");
      }
    };
    Websocket.prototype.pipeChanges = function() {
      var self;
      self = this;
      this.collection.imports.find().observe({
        added: function(idx, dag) {
          return self.trigger("visualizeUpdate", idx);
        },
        changed: function(idx, dag) {
          return self.trigger("visualizeUpdate", idx);
        }
      });
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


  buffer += "<section class=\"invalid-session\" id=\"SessionDialog\">\r\n    <div class=\"confirmSession\">\r\n        <div class=\"modal-text-major\">\r\n            <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION_ERROR", {hash:{},data:data}))
    + "</p>\r\n            <p>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION_ACTION", {hash:{},data:data}))
    + "</p>\r\n        </div>\r\n        <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_INVALID_SESSION_WARNING", {hash:{},data:data}))
    + "</div>\r\n    </div>\r\n    <div class=\"reconnectSession\" style=\"display:none;\">\r\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.DASH_PROVIDE_PASSWORD_TO_RECONNECT", {hash:{},data:data}))
    + "</div>\r\n        <div class=\"modal-input\">\r\n            <input type=\"password\" id=\"SessionPassword\" class=\"input\" placeholder=\"Password\" style=\"width:200px;\" autofocus>\r\n        </div>\r\n    </div>\r\n</section>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('ide/subviews/SessionDialog',['i18n!/nls/lang.js', "./SessionDialogTpl", "UI.modalplus", "backbone"], function(lang, template, modalPlus) {
    var CurrentSessionDialog, SessionDialogView;
    CurrentSessionDialog = null;
    SessionDialogView = Backbone.View.extend({
      events: {
        'keyup #SessionPassword': 'passwordChanged'
      },
      constructor: function() {
        var self;
        if (CurrentSessionDialog) {
          return CurrentSessionDialog;
        }
        CurrentSessionDialog = this;
        this.defer = Q.defer();
        self = this;
        this.modal = new modalPlus({
          title: lang.IDE.DASH_INVALID_SESSION,
          width: 400,
          template: template(),
          disableClose: true,
          hideClose: true,
          confirm: {
            text: lang.IDE.DASH_LBL_CONNECT
          },
          cancel: {
            text: lang.IDE.DASH_LBL_CLOSE_SESSION,
            color: "red"
          }
        });
        this.modal.on("confirm", function() {
          return self.showReconnect();
        });
        this.modal.on("cancel", function() {
          return self.closeSession();
        });
        this.modal.on("close", function() {
          return self.closeSession();
        });
        return this.setElement($('#modal-wrap'));
      },
      promise: function() {
        return this.defer.promise;
      },
      showReconnect: function() {
        $(".invalid-session .confirmSession").hide();
        $(".invalid-session .reconnectSession").show();
        this.modal.find(".modal-confirm").text(lang.IDE.DASH_LBL_CONNECT).attr("disabled", "disabled");
        this.modal.off("confirm");
        this.modal.on("confirm", _.bind(this.connect, this));
      },
      closeSession: function() {
        return App.logout();
      },
      connect: function() {
        if (this.modal.find(".modal-confirm").is(":disabled")) {
          return;
        }
        this.modal.find(".modal-confirm").attr("disabled", "disabled");
        return App.user.acquireSession($("#SessionPassword").val()).then((function(_this) {
          return function() {
            _this.remove();
            _this.defer.resolve();
            App.ignoreChangesWhenQuit();
            window.location.reload();
          };
        })(this), function(error) {
          this.modal.find(".modal-confirm").removeAttr("disabled");
          notification('error', lang.NOTIFY.WARN_AUTH_FAILED);
          $("#SessionPassword").toggleClass("parsley-error", true);
        });
      },
      passwordChanged: function(evt) {
        $("#SessionPassword").toggleClass("parsley-error", false);
        if (($("#SessionPassword").val() || "").length >= 6) {
          this.modal.find(".modal-confirm").removeAttr("disabled");
        } else {
          this.modal.find(".modal-confirm").attr("disabled", "disabled");
        }
        if (evt.which === 13) {
          this.connect();
        }
      }
    });
    return SessionDialogView;
  });

}).call(this);

define('ide/subviews/AppTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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


return TEMPLATE; });
define('ide/subviews/FullnameTpl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"complete-fullname\">\r\n    <div class=\"control-group fullname\">\r\n        <div class=\"half-group\">\r\n            <label for=\"complete-firstname\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "FIRST_NAME", {hash:{},data:data}))
    + "</label>\r\n            <input autocomplete=\"off\" id=\"complete-firstname\" class=\"input\" type=\"text\"/>\r\n        </div>\r\n        <div class=\"half-group\">\r\n            <label for=\"complete-lastname\" class=\"account-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "LAST_NAME", {hash:{},data:data}))
    + "</label>\r\n            <input autocomplete=\"off\" id=\"complete-lastname\" class=\"input\" type=\"text\"/>\r\n        </div>\r\n    </div>\r\n    <p class=\"information\">"
    + escapeExpression(helpers.i18n.call(depth0, "YOU_CAN_LATER_UPDATE_PROFILE", {hash:{},data:data}))
    + "</p>\r\n</div>";
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
        this.modal.setContent(MC.template.loadingSpinner());
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
  define('ide/ApplicationView',["backbone", "./subviews/SessionDialog", "./subviews/AppTpl", "./subviews/FullnameSetup", 'i18n!/nls/lang.js', 'constant'], function(Backbone, SessionDialog, AppTpl, FullnameSetup, lang, constant) {
    return Backbone.View.extend({
      el: $("body")[0],
      events: {
        "click .click-select": "selectText"
      },
      initialize: function() {
        $(window).on("beforeunload", this.checkUnload);
        $(window).on('keydown', this.globalKeyEvent);
        if (!App.user.fullnameNotSet()) {
          new FullnameSetup();
        }
      },
      checkUnload: function() {
        if (App.canQuit()) {
          return void 0;
        } else {
          return lang.IDE.BEFOREUNLOAD_MESSAGE;
        }
      },
      hideGlobalLoading: function() {
        return $("#GlobalLoading").hide();
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
            App.loadUrl("/cheatsheet");
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
    var KnownOpsModelClass, OpsModel, OpsModelLastestVersion, OpsModelState, OpsModelStateDesc, OpsModelType;
    KnownOpsModelClass = {};
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
          state: OpsModelState.UnRun,
          version: OpsModelLastestVersion,
          name: "",
          provider: "",
          region: "",
          description: "",
          revision: 0,
          usage: "",
          unlimited: false,
          importMsrId: void 0,
          stoppable: true,
          requestId: "",
          progress: 0,
          opsActionError: ""
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
        return Backbone.Model.apply(this, arguments);
      },
      initialize: function(attr, options) {
        if (options && options.jsonData) {
          this.__setJsonData(options.jsonData);
        }

        /* env:dev                                                                                                                          env:dev:end */

        /* env:debug */
        this.listenTo(this, "change:state", function() {
          return console.log("OpsModel's state changed", this, MC.prettyStackTrace());
        });

        /* env:debug:end */
      },
      project: function() {
        var ops, p, _i, _len, _ref;
        _ref = App.model.projects().models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          ops = p.stacks().get(this) || p.apps().get(this);
          if (ops) {
            return p;
          }
        }
        return null;
      },
      url: function() {
        var p;
        p = this.project() || "";
        if (p) {
          p = p.url();
        }
        return p + "/" + this.relativeUrl();
      },
      relativeUrl: function() {
        if (this.get("id")) {
          return "ops/" + (this.get('id'));
        } else {
          return "unsaved/" + this.cid;
        }
      },
      credential: function() {
        return this.project().credOfProvider(this.get("provider"));
      },
      credentialId: function() {
        return (this.credential() || {}).id;
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
        return this.isApp() && !this.get("unlimited");
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
        o.url = this.url();
        if (this.isProcessing()) {
          o.progressing = true;
        }
        if (options && options.thumbnail) {
          o.thumbnail = ThumbUtil.fetch(o.id);
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
      getJsonData: function() {
        return {
          id: this.get("id") || "",
          name: this.get("name"),
          region: this.get("region"),
          usage: this.get("usage"),
          provider: this.get("provider"),
          version: this.get("version"),
          revision: this.get("revision"),
          description: this.get("description"),
          property: {
            stoppable: this.get("stoppable")
          },
          resource_diff: this.__jsonData.resource_diff,
          component: this.__jsonData.component,
          layout: this.__jsonData.layout,
          agent: this.__jsonData.agent,
          stack_id: this.__jsonData.stack_id
        };
      },
      fetchJsonData: function() {
        return this.__fjdImport(this) || this.__fdjLocalInit(this) || this.__fjdStack(this) || this.__fjdApp(this);
      },
      __fdjLocalInit: function() {
        var d, self;
        if (this.isPersisted()) {
          return;
        }
        if (this.get("__________itsshitdontsave")) {
          d = Q.defer();
          d.resolve(this);
          return d.promise;
        }
        if (this.get("duplicateTarget")) {
          self = this;
          return ApiRequest("stack_save_as", {
            region_name: this.get("region"),
            stack_id: this.get("duplicateTarget"),
            new_name: this.collection.getNewName()
          }).then(function(json) {
            self.__setJsonData(json);
            return self.set({
              id: json.id,
              duplicateTarget: void 0
            });
          });
        }
        if (!this.__jsonData) {
          this.__setJsonData(this.__defaultJson());
        }
        return this.save();
      },
      __fjdImport: function(self) {
        if (!this.isImported()) {
          return;
        }
        return CloudResources(this.credentialId(), "OpsResource", this.getMsrId()).init({
          region: this.get("region"),
          project: this.project().id,
          provider: this.get("provider")
        }).fetchForceDedup().then(function() {
          return self.__setJsonData(self.generateJsonFromRes());
        });
      },
      generateJsonFromRes: function() {
        var json;
        json = CloudResources(this.credentialId(), 'OpsResource', this.getMsrId()).generatedJson;
        if (!json.agent.module.repo) {
          json.agent.module = {
            repo: App.user.get("repo"),
            tag: App.user.get("tag")
          };
        }
        return json;
      },
      __fjdStack: function(self) {
        if (!this.isStack()) {
          return;
        }
        return ApiRequest("stack_info", {
          key_id: this.credentialId(),
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
          key_id: this.credentialId(),
          region_name: this.get("region"),
          app_ids: [this.get("id")]
        }).then(function(ds) {
          return self.__setJsonData(ds[0]);
        });
      },
      __setJsonData: function(json) {
        var newLayout, stoppable, _ref;
        if (!json) {
          this.__destroy();
          throw new McError(ApiRequest.Errors.MissingDataInServer, "Stack/App doesn't exist.");
        }
        if (!json.agent) {
          json.agent = {
            enabled: false
          };
        }
        if (!json.agent.module || !json.agent.module.repo) {
          json.agent.module = {
            repo: App.user.get("repo"),
            tag: App.user.get("tag")
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
        if (json.layout) {
          if (json.layout.component) {
            newLayout = $.extend({}, json.layout.component.node, json.layout.component.group);
            newLayout.size = json.layout.size;
            json.layout = newLayout;
          }
          if (!json.layout.size) {
            json.layout.size = [240, 240];
          }
        }
        if ((json.version || "").split("-").length < 3) {
          json.version = OpsModelLastestVersion;
        }
        this.__jsonData = {
          resource_diff: json.resource_diff,
          component: json.component,
          layout: json.layout,
          agent: json.agent
        };
        stoppable = ((_ref = json.property) != null ? _ref.stoppable : void 0) || true;
        this.set({
          name: json.name || this.get("name"),
          version: json.version || OpsModelLastestVersion,
          revision: json.revision || 0,
          stoppable: stoppable,
          description: json.description,
          usage: json.usage
        });
        return this;
      },
      save: function(newJson, thumbnail) {
        var d, nameClash, self;
        if (this.isApp() || this.testState(OpsModelState.Saving)) {
          return this.__returnErrorPromise();
        }
        newJson = newJson || this.getJsonData();
        newJson.id = this.get("id");
        nameClash = this.collection.where({
          name: newJson.name
        }) || [];
        if (nameClash.length > 1 || (nameClash[0] && nameClash[0] !== this)) {
          d = Q.defer();
          d.reject(McError(ApiRequest.Errors.StackRepeatedStack, "Stack name has already been used."));
          return d.promise;
        }
        this.set("state", OpsModelState.Saving);
        self = this;
        return ApiRequest((this.isPersisted() ? "stack_save" : "stack_create"), {
          region_name: this.get("region"),
          spec: newJson,
          key_id: this.credentialId()
        }).then(function(res) {
          self.__setJsonData(res);
          self.set({
            state: OpsModelState.UnRun,
            updateTime: +(new Date()),
            id: res.id
          });
          ThumbUtil.save(res.id, thumbnail);
          self.trigger("jsonDataSaved", self);
          return self;
        }, function(err) {
          self.set("state", OpsModelState.UnRun);
          throw err;
        });
      },
      remove: function() {
        var collection, d, self;
        if (this.isPersisted() && this.isApp()) {
          return this.__returnErrorPromise();
        }
        self = this;
        collection = this.collection;
        this.__destroy();
        if (!this.isPersisted()) {
          d = Q.defer();
          d.resolve();
          return d.promise;
        }
        return ApiRequest("stack_remove", {
          region_name: this.get("region"),
          stack_id: this.get("id")
        }).fail(function() {
          self.set("state", OpsModelState.UnRun);
          return collection.add(self);
        });
      },
      run: function(toRunJson, appName) {
        var project;
        toRunJson.id = "";
        toRunJson.stack_id = this.get("id");
        project = this.project();
        return ApiRequest("stack_run", {
          region_name: toRunJson.region,
          stack: toRunJson,
          app_name: appName,
          key_id: this.credentialId()
        }).then(function(res) {
          return project.apps().add(new OpsModel({
            name: appName,
            requestId: res[0],
            state: OpsModelState.Initializing,
            region: toRunJson.region,
            provider: toRunJson.provider,
            usage: toRunJson.usage,
            updateTime: +(new Date())
          }));
        });
      },
      duplicate: function() {
        if (this.isApp()) {
          return;
        }
        return this.collection.add(new OpsModel({
          duplicateTarget: this.get("id"),
          provider: this.get("provider"),
          region: this.get("region")
        }));
      },
      stop: function() {
        var self;
        if (!this.isApp() || this.get("state") !== OpsModelState.Running) {
          return this.__returnErrorPromise();
        }
        self = this;
        this.attributes.progress = 0;
        this.set("state", OpsModelState.Stopping);
        return ApiRequest("app_stop", {
          region_name: this.get("region"),
          key_id: this.credentialId(),
          app_id: this.get("id"),
          app_name: this.get("name"),
          key_id: this.credentialId()
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
        this.attributes.progress = 0;
        this.set("state", OpsModelState.Starting);
        return ApiRequest("app_start", {
          region_name: this.get("region"),
          key_id: this.credentialId(),
          app_id: this.get("id"),
          app_name: this.get("name"),
          key_id: this.credentialId()
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
        this.attributes.progress = 0;
        this.set("state", OpsModelState.Terminating);
        self = this;
        options = $.extend({
          region_name: this.get("region"),
          app_id: this.get("id"),
          app_name: this.get("name"),
          flag: force,
          key_id: this.credentialId()
        }, extraOption || {});
        return ApiRequest("app_terminate", options).then(function() {
          if (force) {
            self.__destroy();
          }
        }, function(err) {
          self.set("state", oldState);
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
          fast_update: fastUpdate,
          key_id: this.credentialId()
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
          return self.fetchJsonData().then(function() {
            self.importMsrId = void 0;
            self.__updateAppDefer = null;
            return self.set("state", OpsModelState.Running);
          }, errorHandler);
        }, errorHandler);
      },
      importApp: function(newJson) {
        newJson.id = "";
        return this.syncAppJson(newJson);
      },
      saveApp: function(newJson) {
        newJson.id = this.get("id");
        return this.syncAppJson(newJson);
      },
      syncAppJson: function(newJson) {
        var oldState, self;
        if (!this.isApp()) {
          return this.__returnErrorPromise();
        }
        if (this.__saveAppDefer) {
          console.error("The app is already saving!");
          return this.__saveAppDefer.promise;
        }
        oldState = this.get("state");
        this.set("state", OpsModelState.Saving);
        this.attributes.progress = 0;
        this.__saveAppDefer = Q.defer();
        self = this;
        ApiRequest("app_save_info", {
          spec: newJson,
          key_id: self.credentialId()
        }).then(function(res) {
          if (!self.id) {
            self.attributes.requestId = res[0];
          }
          self.attributes.importMsrId = void 0;
        }, function(error) {
          return self.__saveAppDefer.reject(error);
        });
        return this.__saveAppDefer.promise.then(function() {
          self.__setJsonData(newJson);
          self.__saveAppDefer = null;
          self.attributes.requestId = void 0;
          self.attributes.progress = 0;
          self.set("state", oldState);
        }, function(error) {
          self.__saveAppDefer = null;
          self.attributes.requestId = void 0;
          self.attributes.progress = 0;
          self.set("state", oldState);
          throw error;
        });
      },
      isProcessing: function() {
        var state;
        state = this.attributes.state;
        return state === OpsModelState.Initializing || state === OpsModelState.Stopping || state === OpsModelState.Updating || state === OpsModelState.Terminating || state === OpsModelState.Starting || state === OpsModelState.Saving;
      },
      updateWithWSEvent: function(wsRequest) {
        var completed, i, progress, step, toState, totalSteps, _i, _len, _ref;
        if (wsRequest.state === constant.OPS_STATE.INPROCESS) {
          step = 0;
          totalSteps = 1;
          if (wsRequest.dag && wsRequest.dag.step) {
            totalSteps = wsRequest.dag.step.length;
            _ref = wsRequest.dag.step;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              if (i[1] === "done") {
                ++step;
              }
            }
          }
          progress = parseInt(step * 100.0 / totalSteps);
          if (this.attributes.progress !== progress) {
            this.attributes.progress = progress;
            this.trigger("change:progress", this, progress);
          }
          return;
        }
        console.info("OpsModel's state changes due to WS event:", this, wsRequest);
        completed = wsRequest.state === constant.OPS_STATE.DONE;
        switch (wsRequest.code) {
          case constant.OPS_CODE_NAME.LAUNCH:
            toState = completed ? OpsModelState.Running : OpsModelState.Destroyed;
            break;
          case constant.OPS_CODE_NAME.STOP:
            toState = completed ? OpsModelState.Stopped : OpsModelState.Running;
            break;
          case constant.OPS_CODE_NAME.START:
            toState = completed ? OpsModelState.Running : OpsModelState.Stopped;
            break;
          case constant.OPS_CODE_NAME.TERMINATE:
            toState = completed ? OpsModelState.Destroyed : OpsModelState.Stopped;
            break;
          case constant.OPS_CODE_NAME.UPDATE:
          case constant.OPS_CODE_NAME.STATE_UPDATE:
            if (!this.__updateAppDefer) {
              return console.warn("UpdateAppDefer is null when setStatusWithWSEvent with `update` event.");
            }
            if (completed) {
              this.__updateAppDefer.resolve();
            } else {
              this.__updateAppDefer.reject(McError(ApiRequest.Errors.OperationFailure, wsRequest.data));
            }
            return;
          case constant.OPS_CODE_NAME.APP_SAVE:
            if (!this.__saveAppDefer) {
              return console.warn("SaveAppDefer is null when setStatusWithWSEvent with `save` event.");
            }
            if (completed) {
              this.__saveAppDefer.resolve();
            } else {
              this.__saveAppDefer.reject(McError(ApiRequest.Errors.OperationFailure, wsRequest.data));
            }
            return;
        }
        this.attributes.opsActionError = completed ? "" : wsRequest.data;
        if (toState === OpsModelState.Destroyed) {
          this.__destroy();
        } else if (toState) {
          this.set({
            state: toState,
            progress: 0
          });
        }
      },

      /*
       Internal Methods
       */
      destroy: function() {
        return console.info("OpsModel's destroy() doesn't do anything. You probably want to call remove(), stop() or terminate()");
      },
      __destroy: function() {
        var msrId;
        if (this.attributes.state === OpsModelState.Destroyed) {
          return;
        }
        ThumbUtil.remove(this.get("id"));
        msrId = this.getMsrId();
        if (msrId) {
          CloudResources(this.credential(), "OpsResource", msrId).destroy();
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
      __defaultJson: function() {
        return {
          resource_diff: true,
          component: {},
          layout: {
            size: [240, 240]
          },
          agent: {
            enabled: true,
            module: {
              repo: App.user.get("repo"),
              tag: App.user.get("tag")
            }
          }
        };
      }
    }, {
      extend: function(protoProps, staticProps) {
        var provider, subClass, _i, _len, _ref;
        subClass = (window.__detailExtend || Backbone.Model.extend).call(this, protoProps, staticProps);
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
  define('ProjectLog',["constant", "backbone"], function(constant) {
    var AuditType, ProjectLog, auditFilter, historyFilter;
    ProjectLog = Backbone.Model.extend({
      comparator: function(m1, m2) {
        return -(m1.attributes.time - m2.attributes.time);
      },
      constructor: function(attr, opt) {
        var cate;
        cate = attr.action.split(".");
        return Backbone.Model.call(this, {
          id: attr.id,
          usercode: attr.username,
          username: Base64.decode(attr.username || ""),
          type: cate[1] || "",
          action: cate[2] || "",
          success: attr.result === 0,
          detail: attr.detail,
          target: attr.target,
          targetId: attr.target_id,
          time: attr.time,
          duration: attr.duration
        }, opt);
      }
    }, {
      TYPE: {
        APP: "App",
        APPSTATE: "AppState",
        STACK: "Stack",
        PROJECT: "Project",
        MEMBER: "Member",
        PAYMENT: "Payment",
        CREDENTIAL: "Credential",
        TOKEN: "Token"
      },
      ACTION: {
        CREATE: "Create",
        UDPATE: "Update",
        RENAME: "Rename",
        REMOVE: "Remove",
        SAVE: "Save",
        TERMINATE: "Terminate",
        START: "Start",
        STOP: "Stop",
        REBOOT: "Reboot",
        SAVEAS: "SaveAs",
        CLONE: "Clone",
        NOTIFY: "Notify",
        RENDER: "Render",
        GETKEY: "GetKey",
        IMPORT: "Import",
        RUN: "Run",
        INVITE: "Invite",
        ADD: "Add"
      },
      ACTION_MAP: {
        "Create": "created",
        "Update": "updated",
        "Rename": "renamed",
        "Remove": "removed",
        "Save": "saved",
        "Terminate": "terminated",
        "Start": "started",
        "Stop": "stopped",
        "Reboot": "rebooted",
        "SaveAs": "saved as",
        "Clone": "cloned",
        "Notify": "notified",
        "Render": "rendered",
        "GetKey": "got key",
        "Import": "imported",
        "Run": "ran",
        "Invite": "invited",
        "Add": "added"
      }
    });
    AuditType = {};
    AuditType[ProjectLog.TYPE.PROJECT] = true;
    AuditType[ProjectLog.TYPE.MEMBER] = true;
    AuditType[ProjectLog.TYPE.PAYMENT] = true;
    AuditType[ProjectLog.TYPE.CREDENTIAL] = true;
    AuditType[ProjectLog.TYPE.TOKEN] = true;
    historyFilter = function(model) {
      return !AuditType[model.get("type")];
    };
    auditFilter = function(model) {
      return AuditType[model.get("type")];
    };
    ProjectLog.Collection = Backbone.Collection.extend({
      model: ProjectLog,
      history: function() {
        return this.filter(historyFilter);
      },
      audit: function() {
        return this.filter(auditFilter);
      }
    });
    return ProjectLog;
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
      add: function(model) {
        if (!this.isNameAvailable(model.get("name"))) {
          model.attributes.name = this.getNewName(model.get("name"));
        }
        Backbone.Collection.prototype.add.apply(this, arguments);
        return model;
      }
    });
  });

}).call(this);

(function() {
  define('Credential',["ApiRequest", "backbone"], function(ApiRequest) {
    var Credential, PROVIDER, __maskString;
    __maskString = function(text) {
      if (text.length > 6) {
        return (new Array(text.length - 6)).join("*") + text.substr(-6);
      } else {
        return text;
      }
    };

    /*
     * Credential is a model used to represent the credential item of a project.
     * One can obtain the particular credential of a project, then update it with the
     * credential's method.
     */
    PROVIDER = {
      AWSGLOBAL: "aws::global",
      AWSCHINA: "aws::china"
    };
    Credential = Backbone.Model.extend({

      /*
      attr :
        id           : ""
        provider     : ""
        isDemo       : ""
        awsAccount   : ""
        awsAccessKey : ""
        awsSecretKey : ""
       */
      constructor: function(attr, option) {
        Backbone.Model.call(this);
        console.assert(option && option.project);
        this.set({
          project: option.project,
          id: attr.id,
          provider: attr.provider,
          isDemo: attr.is_demo,
          alias: attr.alias,
          awsAccount: attr.account_id,
          awsAccessKey: attr.access_key,
          awsSecretKey: attr.secret_key
        });
      },
      isDemo: function() {
        return !!this.get("isDemo");
      },
      __update: function(cred, forceUpdate) {
        return ApiRequest("project_update_credential", {
          project_id: this.get("project").id,
          key_id: this.id,
          credential: cred,
          force_update: forceUpdate
        });
      },
      formatCredForRequest: function(cred, remove) {
        if (remove) {
          return {
            alias: '',
            account_id: '',
            access_key: '',
            secret_key: '',
            provider: cred.provider || PROVIDER.AWSGLOBAL
          };
        } else {
          return {
            alias: cred.alias,
            account_id: cred.awsAccount,
            access_key: cred.awsAccessKey,
            secret_key: cred.awsSecretKey,
            provider: cred.provider || PROVIDER.AWSGLOBAL
          };
        }
      },
      add: function() {
        var credential, model, project;
        model = this;
        credential = this.formatCredForRequest(this.attributes);
        project = this.get('project');
        return ApiRequest("project_add_credential", {
          project_id: project.id,
          credential: credential
        }).then(function(res) {
          model.set('id', res[1]);
          project.credentials().add(model);
          return res;
        });
      },

      /*
      cred : {
        awsAccount   : ""
        awsAccessKey : ""
        awsSecretKey : ""
      }
       */
      update: function(cred, forceUpdate) {
        var credential, p, self;
        if (forceUpdate == null) {
          forceUpdate = false;
        }
        self = this;
        credential = this.formatCredForRequest(cred);
        p = this.__update(credential, forceUpdate);
        return p.then(function(res) {
          return self.set({
            isDemo: false,
            alias: cred.alias,
            awsAccount: cred.awsAccount,
            awsAccessKey: cred.awsAccessKey,
            awsSecretKey: cred.awsSecretKey
          });
        });
      },
      save: function(cred, forceUpdate, valid) {
        if (forceUpdate == null) {
          forceUpdate = false;
        }
        if (valid == null) {
          valid = true;
        }
        if (!cred) {
          cred = this.attributes;
        }
        if (this.id) {
          return this.update(cred, forceUpdate, valid);
        } else {
          return this.add(cred, valid);
        }
      },
      destroy: function(options) {
        var credential, model, project;
        model = this;
        project = this.get('project');
        credential = this.formatCredForRequest(this.attributes, true);
        return ApiRequest("project_update_credential", {
          project_id: project.id,
          key_id: this.id,
          credential: credential,
          force_update: false
        }).then(function(res) {
          var demoAccountInfo;
          demoAccountInfo = res[1];
          model.set({
            isDemo: true,
            alias: '',
            awsAccount: demoAccountInfo[0],
            awsAccessKey: demoAccountInfo[1],
            awsSecretKey: demoAccountInfo[2]
          });
          return res;
        });
      },
      toJSON: function() {
        return _.extend({}, this.attributes, {
          awsAccessKey: __maskString(this.attributes.awsAccessKey),
          awsSecretKey: __maskString(this.attributes.awsSecretKey)
        });
      }
    }, {
      PROVIDER: PROVIDER
    });
    Credential.Collection = Backbone.Collection.extend({
      model: Credential
    });
    return Credential;
  });

}).call(this);

(function() {
  define('Project',["ApiRequest", "ProjectLog", "ide/submodels/OpsCollection", "OpsModel", "Credential", "ApiRequestR", "constant", "backbone"], function(ApiRequest, ProjectLog, OpsCollection, OpsModel, Credential, ApiRequestR, constant) {

    /*
     * One-time initializer to observe the websocket. Since the websocket is not
     * available during the defination of the class
     */
    var MEMBERROLE, OneTimeWsInit;
    OneTimeWsInit = function() {
      var handleRequest;
      OneTimeWsInit = function() {};
      App.WS.collection.project.find().observe({
        changed: function(newDocument, oldDocument) {
          var _ref;
          return (_ref = App.model.projects().get(newDocument.id)) != null ? _ref.updateWithWsData(newDocument) : void 0;
        },
        removed: function(oldDocument) {
          var _ref;
          if (!oldDocument) {
            return;
          }
          console.info("Project has been removed", oldDocument);
          if ((_ref = App.model.projects().get(oldDocument.id)) != null) {
            _ref.cleanup();
          }
        }
      });
      App.WS.collection.history.find().observe({
        added: function(newDocument) {
          var project;
          if (!newDocument) {
            return;
          }
          project = App.model.projects().get(newDocument.project_id);
          if (!project) {
            console.log("There's an audit that is not related to any project, ignored.", newDocument);
            return;
          }
          project.logs().unshift(newDocument);
        }
      });
      handleRequest = function(req) {
        var TGT, targetId;
        if (!req.project_id || req.state === constant.OPS_STATE.PENDING) {
          return;
        }
        if (req.state === constant.OPS_STATE.DONE && req.code === constant.OPS_CODE_NAME.APP_SAVE) {
          targetId = req.data;
        } else {
          targetId = req.dag && req.dag.spec ? req.dag.spec.id : req.rid;
        }

        /*
         * Update the corresponding opsmodel.
         */
        if (!App.WS.isReady(req.project_id) && req.state !== constant.OPS_STATE.INPROCESS) {
          return;
        }
        TGT = App.model.projects().get(req.project_id);
        if (!TGT) {
          return;
        }
        TGT = TGT.apps().get(targetId) || TGT.apps().findWhere({
          requestId: req.id
        });
        if (!TGT) {
          return;
        }
        if (!TGT.id && targetId) {
          TGT.set("id", targetId);
        }
        TGT.updateWithWSEvent(req);
      };
      App.WS.collection.request.find().observe({
        added: handleRequest,
        changed: handleRequest
      });
    };
    MEMBERROLE = {
      ADMIN: "admin",
      MEMBER: "collaborator",
      OBSERVER: "observer"
    };
    return Backbone.Model.extend({

      /*
       * Possible events that will trigger on this model:
      `change:credential` :
          Convenient event for someone that is interested in the credentials of the project.
          Fires when one of the credential of this project is updated.
      `update:credential` :
          Fires when credential is added / removed.
      
      `change:app` :
          Convenient event for someone that is interested in the apps of the project.
          Fires when one of the app is updated. The same as listen to the change event of the app collection.
      `update:app` :
          Fires when app is added / removed.
      
      `change:stack`
          Convenient event for someone that is interested in the stacks of the project.
          Fires when one of the stack is updated. The same as listen to the change event of the stacks collection.
      `update:stack`
          Fires when stack is added / removed.
       */
      defaults: function() {
        return {
          name: "",
          tokens: [],
          credentials: new Credential.Collection(),
          stacks: new OpsCollection(),
          apps: new OpsCollection(),
          logs: new ProjectLog.Collection(),
          members: null,
          myRole: "observer",
          "private": false,
          billingState: ""
        };
      },
      constructor: function(attr) {
        var idx, t, _i, _len, _ref, _ref1;
        Backbone.Model.apply(this);
        this.set({
          id: attr.id,
          name: attr.name || "My Workspace",
          "private": attr.id === App.user.id,
          billingState: (_ref = attr.payment) != null ? _ref.state : void 0
        });
        _ref1 = attr.tokens || [];
        for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
          t = _ref1[idx];
          if (!t.name) {
            this.attributes.defaultToken = t.token;
          } else {
            this.attributes.tokens.push(t);
          }
        }
        this.credentials().set(attr.credentials, {
          project: this,
          silent: true
        });
        this.listenTo(this.credentials(), "change", function() {
          return this.trigger("change:credential");
        });
        this.listenTo(this.credentials(), "add", function() {
          return this.trigger("update:credential");
        });
        this.listenTo(this.credentials(), "remove", function() {
          return this.trigger("update:credential");
        });
        this.__checkMyRole(attr.members);
        this.stacks().set(this.__parseListRes(attr.stacks || []));
        this.apps().set(this.__parseListRes(attr.apps || []));
        this.listenTo(this.stacks(), "change", function() {
          return this.trigger("change:stack");
        });
        this.listenTo(this.stacks(), "change:id", function() {
          return this.trigger("update:stack");
        });
        this.listenTo(this.stacks(), "add", function() {
          return this.trigger("update:stack");
        });
        this.listenTo(this.stacks(), "remove", function() {
          return this.trigger("update:stack");
        });
        this.listenTo(this.apps(), "change", function() {
          return this.trigger("change:app");
        });
        this.listenTo(this.apps(), "add", function() {
          return this.trigger("update:app");
        });
        this.listenTo(this.apps(), "remove", function() {
          return this.trigger("update:app");
        });
        App.WS.subscribe(this.id);
        OneTimeWsInit();
      },
      stacks: function() {
        return this.get("stacks");
      },
      apps: function() {
        return this.get("apps");
      },
      credentials: function() {
        return this.get("credentials");
      },
      logs: function() {
        return this.get("logs");
      },
      tokens: function() {
        return this.get("tokens");
      },
      defaultToken: function() {
        return this.get("defaultToken");
      },
      getOpsModel: function(id) {
        return this.get("stacks").get(id) || this.get("apps").get(id);
      },
      url: function() {
        return "workspace/" + this.get("id");
      },
      showCredential: function() {
        return App.loadUrl("/settings/" + (this.get("id")) + "/credential");
      },
      isPrivate: function() {
        return this.get("private");
      },
      hasCredential: function() {
        console.log(this.get("credentials"));
        return this.get("credentials").length > 0;
      },
      credIdOfProvider: function(CredentialProvider) {
        return (this.credOfProvider(CredentialProvider) || {}).id;
      },
      credOfProvider: function(CredentialProvider) {
        var cred, _i, _len, _ref;
        _ref = this.get("credentials").models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cred = _ref[_i];
          if (cred.get("provider") === CredentialProvider) {
            return cred;
          }
        }
        return null;
      },
      shouldPay: function() {
        var _ref;
        return !((_ref = this.get("billingState")) === "active" || _ref === "pastdue");
      },
      amIAdmin: function() {
        return this.get("myRole") === MEMBERROLE.ADMIN || this.isPrivate();
      },
      amIMeber: function() {
        return this.get("myRole") === MEMBERROLE.MEMBER;
      },
      amIObserver: function() {
        return this.get("myRole") === MEMBERROLE.OBSERVER;
      },
      isDemoMode: function(provider) {
        var cred;
        if (provider == null) {
          provider = constant.PROVIDER.AWSGLOBAL;
        }
        cred = this.credentials().findWhere({
          provider: provider
        });
        return cred && cred.isDemo() || false;
      },
      updateName: function(name) {
        var model;
        model = this;
        return ApiRequest("project_save", {
          project_id: this.id,
          spec: {
            name: name
          }
        }).then(function(res) {
          model.set('name', name);
          return res;
        });
      },
      destroy: function() {
        var self;
        self = this;
        this.__manualDestroy = true;
        return ApiRequest("project_remove", {
          project_id: this.id
        }).then(function(res) {
          self.cleanup();
          return res;
        }, function(err) {
          self.__manualDestroy = false;
          throw err;
        });
      },
      cleanup: function() {
        if (this.__isRemoved) {
          return;
        }
        this.__isRemoved = true;
        this.trigger("destroy", this, this.collection, {
          manualAction: !!this.__manualDestroy
        });
        App.WS.unsubscribe(this.id);
      },
      leave: function() {
        var that;
        that = this;
        this.__manualDestroy = true;
        return ApiRequest("project_remove_members", {
          project_id: this.id,
          member_ids: [App.user.id]
        }).then(function(res) {
          that.cleanup();
          return res;
        }, function(err) {
          self.__manualDestroy = false;
          throw err;
        });
      },
      createStack: function(region, provider) {
        if (provider == null) {
          provider = Credential.PROVIDER.AWSGLOBAL;
        }
        return this.stacks().add(new OpsModel({
          region: region,
          provider: provider
        }));
      },
      createStackByJson: function(json, updateLayout) {
        if (updateLayout == null) {
          updateLayout = false;
        }
        return this.stacks().add(new OpsModel({
          name: json.name,
          region: json.region,
          autoLayout: updateLayout,
          __________itsshitdontsave: updateLayout
        }, {
          jsonData: json
        }));
      },
      createAppByExistingResource: function(resourceId, region, provider) {
        if (provider == null) {
          provider = Credential.PROVIDER.AWSGLOBAL;
        }
        return this.apps().findWhere({
          importMsrId: resourceId
        }) || this.apps().add(new OpsModel({
          name: "ImportedApp",
          importMsrId: resourceId,
          region: region,
          provider: provider,
          state: OpsModel.State.Running
        }));
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
            stoppable: !(ops.property && ops.property.stoppable === false),
            unlimited: ops.before_charge
          });
        }
        return r;
      },
      getPaymentState: function() {
        var projectId, that;
        that = this;
        projectId = this.get("id");
        return ApiRequestR("payment_self", {
          projectId: projectId
        }).then(function(result) {
          var formattedResult;
          formattedResult = {
            email: result.email,
            cardNumber: result.card,
            lastName: result.last_name,
            firstName: result.first_name,
            periodEnd: result.current_period_ends_at,
            periodStart: result.current_period_started_at,
            maxQuota: result.max_quota,
            currentQuota: result.current_quota,
            nextPeriod: result.next_assessment_at,
            paymentState: result.state
          };
          formattedResult.renewDays = (Math.round((new Date(formattedResult.nextPeriod) - new Date()) / (24 * 3600 * 100))) / 10;
          formattedResult.isDefault = that.isPrivate();
          formattedResult.failToCharge = that.shouldPay();
          that.set("payment", formattedResult);
          return formattedResult;
        });
      },
      __checkMyRole: function(members) {
        var id, m, _i, _len, _ref;
        id = App.user.id;
        _ref = members || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          m = _ref[_i];
          if (m.id === id) {
            this.set("myRole", m.role);
            return;
          }
        }
      },
      updateWithWsData: function(wsdata) {
        var cred, creds, _i, _j, _len, _len1, _ref, _ref1;
        if (wsdata.name) {
          this.set("name", wsdata.name);
        }
        if (wsdata.members) {
          this.__checkMyRole(wsdata.members);
        }
        if (wsdata.payment) {
          this.set("billingState", wsdata.payment.state);
        }
        if (wsdata.credentials) {
          creds = {};
          _ref = wsdata.credentials;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cred = _ref[_i];
            if (this.credentials().get(cred.id)) {
              this.credentials().get(cred.id).set("isDemo", cred.is_demo);
            } else {
              this.credentials.add(cred, {
                project: this
              });
            }
            creds[cred.id] = true;
          }
          _ref1 = this.credentials().models.slice(0);
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            cred = _ref1[_j];
            if (!creds[cred.id]) {
              this.credentials().remove(cred);
            }
          }
        }
      }
    }, {
      MEMBERROLE: MEMBERROLE
    });
  });

}).call(this);


/*
----------------------------
  The Model for application
----------------------------

  ApplicationModel holds the data / settings of VisualOps. It also provides some convenient methods.
 */

(function() {
  define('ide/ApplicationModel',["OpsModel", "Project", "ApiRequest", "ApiRequestOs", "ThumbnailUtil", "constant", "i18n!/nls/lang.js", "backbone"], function(OpsModel, Project, ApiRequest, ApiRequestOs, ThumbnailUtil, constant, lang) {
    return Backbone.Model.extend({
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
      fetchUserData: function(userCodeList) {
        var d, result, self, toFetch, usercode, userdata, _i, _len;
        toFetch = [];
        result = {};
        for (_i = 0, _len = userCodeList.length; _i < _len; _i++) {
          usercode = userCodeList[_i];
          userdata = this.__vousercache[usercode];
          if (userdata === void 0) {
            toFetch.push(usercode);
          } else if (userdata) {
            result[usercode] = $.extend({}, userdata);
          }
        }
        if (!toFetch.length) {
          d = Q.defer();
          d.resolve(result);
          return d.promise;
        }
        self = this;
        return ApiRequest("account_list_user", {
          user_list: toFetch
        }).then(function(res) {
          var data, _j, _k, _len1, _len2;
          for (_j = 0, _len1 = toFetch.length; _j < _len1; _j++) {
            usercode = toFetch[_j];
            self.__vousercache[usercode] = false;
          }
          for (_k = 0, _len2 = res.length; _k < _len2; _k++) {
            d = res[_k];
            data = self.__vousercache[d.username] = {
              usercode: d.username,
              email: Base64.decode(d.email || "")
            };
            data.avatar = "https://www.gravatar.com/avatar/" + CryptoJS.MD5(data.email.trim().toLowerCase()).toString();
            result[d.username] = $.extend({}, data);
          }
          return result;
        });
      },
      getOpsModelById: function(opsModelId) {
        var ops, p, _i, _len, _ref;
        _ref = this.get("projects").models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          ops = p.getOpsModel(opsModelId);
          if (ops) {
            return ops;
          }
        }
        return null;
      },
      projects: function() {
        return this.get("projects");
      },
      getPrivateProject: function() {
        var p, _i, _len, _ref;
        _ref = this.get("projects").models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.isPrivate()) {
            return p;
          }
        }
        return null;
      },
      createProject: function(attr) {
        var self;
        self = this;
        return ApiRequest("project_create", {
          project_name: attr.name,
          first_name: attr.firstname,
          last_name: attr.lastname,
          email: attr.email,
          credit_card: {
            full_number: attr.card.number,
            expiration_month: attr.card.expire.split("/")[0] || "",
            expiration_year: attr.card.expire.split("/")[1] || "",
            cvv: attr.card.cvv
          }
        }).then(function(projectObj) {
          var p;
          p = new Project(projectObj);
          self.projects().add(p);
          return p;
        });
      },

      /*
        Internal methods
       */
      defaults: function() {
        return {
          projects: new (Backbone.Collection.extend({
            comparator: function(m) {
              if (m.isPrivate()) {
                return "";
              } else {
                return m.get("name");
              }
            },
            initialize: function() {
              this.on("change:name", this.sort, this);
            }
          }))()
        };
      },
      initialize: function() {
        this.__awsdata = {};
        this.__osdata = {};
        this.__stateModuleData = {};
        this.__vousercache = {};
      },
      fetch: function() {
        var awsData, projectlist, self;
        self = this;
        projectlist = ApiRequest("project_list").then(function(res) {
          return self.__parseProjectData(res);
        });
        awsData = ApiRequest("aws_aws", {
          fields: ["region", "price", "instance_types", "rds"]
        }).then(function(res) {
          return self.__parseAwsData(res);
        });
        return Q.all([projectlist, awsData]).then(function() {
          var ids, p, _i, _len, _ref;
          ids = [];
          _ref = self.projects().models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            ids = ids.concat(p.stacks().pluck("id"), p.apps().pluck("id"));
          }
          ThumbnailUtil.cleanup(ids);
        });
      },
      __parseProjectData: function(res) {
        var p, _i, _len, _ref;
        _ref = res || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          this.attributes.projects.add(new Project(p));
        }
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
        var data, dataset, provider, providerData, self, _i, _len;
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
  define('ide/User',["ApiRequest", "backbone", "crypto"], function(ApiRequest) {
    var UserState;
    UserState = {
      NotFirstTime: 2
    };
    return Backbone.Model.extend({
      initialize: function() {
        this.set({
          usercode: $.cookie("usercode"),
          username: Base64.decode($.cookie("usercode")),
          session: $.cookie("session_id")
        });
      },
      fullnameNotSet: function() {
        return !this.get("firstName") || !this.get("lastName");
      },
      userInfoAccuired: function(result) {
        this.set({
          id: result.id,
          email: Base64.decode(result.email),
          state: parseInt(result.state, 10),
          intercomHash: result.intercom_hash,
          firstName: Base64.decode(result.first_name || ""),
          lastName: Base64.decode(result.last_name || ""),
          repo: "https://github.com/MadeiraCloud/salt.git",
          tag: "v2014-07-18"
        });
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
          user_hash: this.get("intercomHash")
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
      gravatar: function() {
        var email;
        email = CryptoJS.MD5(this.get("email").trim().toLowerCase()).toString();
        return {
          image: "https://www.gravatar.com/avatar/" + email,
          profile: "https://www.gravatar.com/" + email
        };
      }
    });
  });

}).call(this);

(function() {
  define('Scene',["backbone"], function() {
    var DefaultSceneClass, Scene, sid;
    sid = 0;
    DefaultSceneClass = null;
    Scene = (function() {
      function Scene() {
        this.id = "scene_" + (++sid);
        this.initialize.apply(this, arguments);
        App.sceneManager.add(this);
        return this;
      }

      Scene.prototype.isActive = function() {
        return App.sceneManager.activeScene() === this;
      };

      Scene.prototype.isRemoved = function() {
        return !!this.__isRemoved;
      };

      Scene.prototype.remove = function() {
        if (this.__isRemoved) {
          return;
        }
        App.sceneManager.remove(this, true);
        return null;
      };

      Scene.prototype.activate = function() {
        return App.sceneManager.activate(this);
      };

      Scene.prototype.updateTitle = function() {
        var title;
        title = this.title();
        if (this.isActive() && title) {
          document.title = title;
          return;
        }
      };

      Scene.prototype.updateUrl = function() {
        var url;
        url = this.url();
        if (this.isActive() && url) {
          Router.navigate(url, {
            replace: true
          });
        }
      };


      /*
        Methods that should be override
       */

      Scene.prototype.initialize = function(attributes) {
        return this.activate();
      };

      Scene.prototype.isRemovable = function() {
        return true;
      };

      Scene.prototype.becomeActive = function() {
        if (this.view) {
          this.view.$el.show();
        }
        this.updateUrl();
        return this.updateTitle();
      };

      Scene.prototype.becomeInactive = function() {
        $(document.activeElement).filter("input, textarea").blur();
        if (this.view) {
          return this.view.$el.hide();
        }
      };

      Scene.prototype.cleanup = function() {
        this.stopListening();
        if (this.view) {
          this.view.remove();
        } else {
          console.warn("Cannot find @view when scene is about to remove:", this);
        }
      };

      Scene.prototype.isWorkingOn = function(info) {
        return false;
      };

      Scene.prototype.url = function() {
        return "";
      };

      Scene.prototype.title = function() {
        return "";
      };

      return Scene;

    })();
    _.extend(Scene.prototype, Backbone.Events);
    Scene.SetDefaultScene = function(s) {
      return DefaultSceneClass = s;
    };
    Scene.DefaultScene = function() {
      return DefaultSceneClass;
    };
    return Scene;
  });

}).call(this);

(function() {
  define('ide/SceneManager',["Scene", "backbone"], function(Scene) {
    var SceneManager;
    SceneManager = (function() {
      function SceneManager() {
        this.__scenes = [];
        this.__scenesById = {};
        this.__activeScene = null;
        this;
      }

      SceneManager.prototype.__frontActivateList = function(scene) {
        var newList, s, _i, _len, _ref;
        newList = [scene];
        _ref = this.__scenes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s !== scene) {
            newList.push(s);
          }
        }
        this.__scenes = newList;
      };

      SceneManager.prototype.__endActivateList = function(scene) {
        var newList, s, _i, _len, _ref;
        newList = [];
        _ref = this.__scenes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s !== scene) {
            newList.push(s);
          }
        }
        newList.push(scene);
        this.__scenes = newList;
      };

      SceneManager.prototype.scenes = function() {
        return this.__scenes.slice(0);
      };

      SceneManager.prototype.get = function(id) {
        return this.__scenesById[id];
      };

      SceneManager.prototype.add = function(scene) {
        if (this.__scenesById[scene.id]) {
          return scene;
        }
        this.__scenesById[scene.id] = scene;
        if (this.__activeScene !== scene) {
          this.__frontActivateList(scene);
        }
        if (this.__scenes.length === 1) {
          this.activate(scene);
        }
        return scene;
      };

      SceneManager.prototype.activeScene = function() {
        return this.__activeScene;
      };

      SceneManager.prototype.activate = function(scene) {
        if (_.isString(scene)) {
          scene = this.__scenesById[scene];
        }
        if (scene === this.__activeScene || !scene || scene.isRemoved()) {
          return scene;
        }
        if (this.__activeScene) {
          this.__activeScene.becomeInactive();
        }
        this.__activeScene = scene;
        this.__endActivateList(scene);
        scene.becomeActive();
        return scene;
      };

      SceneManager.prototype.remove = function(scene, force) {
        if (_.isString(scene)) {
          scene = this.__spacesById[scene];
        }
        if (!scene) {
          return;
        }
        if (!force && !scene.isRemovable()) {
          return;
        }
        if (scene.isRemoved()) {
          return;
        }
        scene.__isRemoved = true;
        delete this.__scenesById[scene.id];
        this.__scenes.splice(this.__scenes.indexOf(scene), 1);
        if (this.__activeScene === scene) {
          this.__activeScene = null;
          if (this.__scenes.length) {
            this.__scenes[this.__scenes.length - 1].activate();
          } else {
            console.info("Creating default scene.");
            (new (Scene.DefaultScene())()).activate();
          }
        }
        scene.stopListening();
        scene.cleanup();
      };

      SceneManager.prototype.find = function(info) {
        var s, _i, _len, _ref;
        _ref = this.__scenes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s.isWorkingOn(info)) {
            return s;
          }
        }
        return null;
      };

      SceneManager.prototype.hasUnsaveScenes = function() {
        return this.__scenes.some(function(s) {
          return !s.isRemovable();
        });
      };

      return SceneManager;

    })();
    return SceneManager;
  });

}).call(this);


/*
----------------------------
  The Model for stack / app
----------------------------

  This model represent a stack or an app. It contains serveral methods to manipulate the stack / app
 */

(function() {
  define('ide/submodels/OpsModelAws',["OpsModel", "ApiRequest", "constant"], function(OpsModel, ApiRequest, constant) {
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
      __defaultJson: function() {
        var comp, component, id, json, l, layout, vpcId, vpcRef;
        json = OpsModel.prototype.__defaultJson.call(this);
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
        return json;
      }
    }, {
      supportedProviders: ["aws::global", "aws::china"]
    });
    return AwsOpsModel;
  });

}).call(this);


/*
----------------------------
  The Model for stack / app
----------------------------

  This model represent a stack or an app. It contains serveral methods to manipulate the stack / app
 */

(function() {
  define('ide/submodels/OpsModelOs',["OpsModel", "ApiRequest", "constant"], function(OpsModel, ApiRequest, constant) {
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
      __defaultJson: function() {
        var comp, component, id, json, l, layout, networkId, subnetId;
        json = OpsModel.prototype.__defaultJson.call(this);
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
        return json;
      }
    }, {
      supportedProviders: ["os::awcloud_bj"]
    });
    return OsOpsModel;
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
  define('ide/Application',["./Websocket", "./ApplicationView", "./ApplicationModel", "./User", "./SceneManager", "ApiRequest", "i18n!/nls/lang.js", "UI.notification", "./submodels/OpsModelAws", "./submodels/OpsModelOs"], function(Websocket, ApplicationView, ApplicationModel, User, SceneManager, ApiRequest, lang) {
    var VisualOps;
    VisualOps = function() {
      if (window.App) {
        console.error("Application is already created.");
        return;
      }
      window.App = this;
    };
    VisualOps.prototype.initialize = function() {
      var jobs, self;
      this.__createUser();
      this.__createWebsocket();
      this.sceneManager = new SceneManager();
      this.model = new ApplicationModel();
      this.view = new ApplicationView();
      self = this;
      jobs = this.user.fetch().then(function() {
        return self.model.fetch().fail(function(err) {
          var d;
          notification("error", lang.NOTIFY.CANNOT_LOAD_APPLICATION_DATA, false);
          d = Q.defer();
          return d.promise;
        });
      });
      return jobs.then(function() {
        return App.view.hideGlobalLoading();
      }, function(err) {
        if (err.error < 0) {
          if (err.error === ApiRequest.Errors.Network500) {
            return window.location = "/500";
          } else {
            return window.location.reload();
          }
        } else {
          return App.logout();
        }
      });
    };
    VisualOps.prototype.__createWebsocket = function() {
      this.WS = new Websocket();
      this.WS.on("Disconnected", function() {
        return App.acquireSession();
      });
      this.WS.on("StatusChanged", function(isConnected) {
        console.info("Websocket Status changed, isConnected:", isConnected);
        if (App.view) {
          return App.view.toggleWSStatus(isConnected);
        }
      });
    };
    VisualOps.prototype.__createUser = function() {
      this.user = new User();
    };
    VisualOps.prototype.acquireSession = function() {
      return this.view.showSessionDialog();
    };
    VisualOps.prototype.logout = function() {
      var p;
      App.user.logout();
      this.ignoreChangesWhenQuit();
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
    VisualOps.prototype.ignoreChangesWhenQuit = function() {
      this.__ICWQ = true;
    };
    VisualOps.prototype.canQuit = function() {
      return this.__ICWQ || !this.sceneManager.hasUnsaveScenes();
    };
    VisualOps.prototype.loadUrl = function(url) {
      return window.Router.navigate(url, {
        replace: true,
        trigger: true
      });
    };
    return VisualOps;
  });

}).call(this);


define("ide/AppBundle", function(){});
