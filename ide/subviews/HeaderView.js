(function() {
  define(["./HeaderTpl", "./SettingsDialog", 'backbone'], function(tmpl, SettingsDialog) {
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
