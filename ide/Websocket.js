
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
          return _this.trigger("StatusChanged", _this.connection.status().connected);
        };
      })(this));
      this.subscribe();
      this.pipeChanges();
      return this;
    };
    Websocket.prototype.subscribe = function() {
      var callback, session, subscribed, usercode;
      if (this.subscribed) {
        return;
      }
      subscribed = true;
      usercode = $.cookie('usercode');
      session = $.cookie('session_id');
      callback = {
        onReady: _.bind(this.onReady, this),
        onError: _.bind(this.onError, this)
      };
      this.connection.subscribe("request", usercode, session, callback);
      this.connection.subscribe("stack", usercode, session);
      this.connection.subscribe("app", usercode, session);
      this.connection.subscribe("status", usercode, session);
      this.connection.subscribe("imports", usercode, session);
    };
    Websocket.prototype.onReady = function() {
      ide_event.trigger(ide_event.WS_COLLECTION_READY_REQUEST);
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
