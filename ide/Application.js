
/*
----------------------------
  This is the core / entry point / controller of the whole IDE.
  It contains some basical logics to maintain the IDE. And it holds other components
  to provide other functionality
----------------------------
 */

(function() {
  define(["./Websocket", "./ApplicationView", "event"], function(Websocket, ApplicationView, ide_event) {
    var VisualOps;
    VisualOps = function() {
      if (window.App) {
        console.error("Application is already created.");
        return;
      }
      window.App = this;
      this.view = new ApplicationView();
      this.createWebsocket();
    };
    VisualOps.prototype.createWebsocket = function() {
      this.WS = new Websocket();
      this.WS.on("Disconnected", function() {
        ide_event.trigger(ide_event.SWITCH_MAIN);
        return require(['component/session/SessionDialog'], function(SessionDialog) {
          return new SessionDialog();
        });
      });
      return this.WS.on("StatusChanged", (function(_this) {
        return function(isConnected) {
          console.log("Websocket Status changed, isConnected:", isConnected);
          return _this.view.toggleWSStatus(isConnected);
        };
      })(this));
    };
    return VisualOps;
  });

}).call(this);
