define('component/session/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section style=\"width:400px;\" class=\"invalid-session\">\r\n  <div class=\"confirmSession\">\r\n  <div class=\"modal-header\"><h3>Invalid Session</h3></div>\r\n\r\n  <article class=\"modal-body\">\r\n    <div class=\"modal-text-major\"> <p>Your account has signed in from other location or you last login has timed out.</p> <p>Would you like to reconnect this session or close it?</p> </div>\r\n    <div class=\"modal-text-minor\">If you have unsaved changes, close this session will cause all your change to lose.</div>\r\n  </article>\r\n\r\n  <footer class=\"modal-footer\">\r\n    <button id=\"SessionReconnect\" class=\"btn btn-blue\">Reconnect</button>\r\n    <button id=\"SessionClose\" class=\"btn btn-silver\">Close Session</button>\r\n  </footer>\r\n  </div>\r\n\r\n  <div class=\"reconnectSession\" style=\"display:none;\">\r\n  <div class=\"modal-header\"><h3>Reconnect Session</h3></div>\r\n  <article class=\"modal-body\">\r\n    <div class=\"modal-text-major\">Please provide your password to reconnect:</div>\r\n    <div class=\"modal-input\">\r\n      <input type=\"password\" id=\"SessionPassword\" class=\"input\" placeholder=\"Password\" style=\"width:200px;\" autofocus>\r\n    </div>\r\n  </article>\r\n  <footer class=\"modal-footer\">\r\n    <button id=\"SessionConnect\" class=\"btn btn-blue\" disabled>Connect</button>\r\n    <button id=\"SessionClose2\" class=\"btn btn-red\">Close Session</button>\r\n  </footer>\r\n  </div>\r\n</section>\r\n";
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('component/session/SessionDialogView',['./template', 'i18n!nls/lang.js'], function(template, lang) {
    var SessionDialogView;
    SessionDialogView = Backbone.View.extend({
      events: {
        'click #SessionReconnect': 'showReconnect',
        'click #SessionClose': 'closeSession',
        'click #SessionClose2': 'closeSession',
        'click #SessionConnect': 'connect',
        'keypress #SessionPassword': 'passwordChanged'
      },
      render: function() {
        modal(template(), false);
        this.setElement($('#modal-wrap'));
      },
      showReconnect: function() {
        $(".invalid-session .confirmSession").hide();
        $(".invalid-session .reconnectSession").show();
      },
      closeSession: function() {
        return this.model.closeSession();
      },
      connect: function() {
        if ($("#SessionConnect").is(":disabled")) {
          return;
        }
        $("#SessionConnect").attr("disabled", "disabled");
        return this.model.connect($("#SessionPassword").val()).then(function() {}, function(error) {
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

(function() {
  define('component/session/SessionDialog',["./SessionDialogView", "ApiRequest", "common_handle", "event"], function(SessionDialogView, ApiRequest, common_handle, ide_event) {
    var CurrentSessionDialog, SessionDialog, SessionDialogModel;
    SessionDialogModel = Backbone.Model.extend({
      closeSession: function() {
        common_handle.cookie.deleteCookie();
        window.location.href = "/login/";
      },
      connect: function(password) {
        return ApiRequest("login", {
          username: $.cookie('username'),
          password: password
        }).then((function(_this) {
          return function(result) {
            common_handle.cookie.setCookie(result);
            _this.trigger("CONNECTED");
            ide_event.trigger(ide_event.UPDATE_APP_LIST);
            ide_event.trigger(ide_event.UPDATE_DASHBOARD);
            App.WS.subscribe();
            if (!MC.data.is_loading_complete) {
              window.location.href = "/";
            }
          };
        })(this));
      }
    });
    CurrentSessionDialog = null;
    SessionDialog = function() {
      var model, view;
      if (CurrentSessionDialog) {
        return;
      }
      CurrentSessionDialog = this;
      model = new SessionDialogModel();
      view = new SessionDialogView({
        model: model
      });
      view.render();
      model.on("CONNECTED", function() {
        CurrentSessionDialog = null;
        model.off();
        return view.remove();
      });
    };
    return SessionDialog;
  });

}).call(this);

