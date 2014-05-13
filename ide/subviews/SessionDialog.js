(function() {
  define(['i18n!nls/lang.js', "./SessionDialogTpl"], function(lang, template) {
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
