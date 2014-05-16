
/*
----------------------------
  A refactor version of previous lib/websocket
  The usage of Meteor seems to be wrong, but whatever.
----------------------------
 */

(function() {
  define(["Meteor", "backbone", "event", "MC"], function(Meteor, Backbone, ide_event) {
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
