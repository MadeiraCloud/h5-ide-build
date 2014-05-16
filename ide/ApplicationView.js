
/*
----------------------------
  The View for application
----------------------------
 */

(function() {
  define(["backbone", "./subviews/SessionDialog", "./subviews/HeaderView", "./subviews/WelcomeDialog", "./subviews/SettingsDialog"], function(Backbone, SessionDialog, HeaderView, WelcomeDialog, SettingsDialog) {
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
      showSettings: function(tab) {
        new SettingsDialog({
          defaultTab: tab
        });
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
