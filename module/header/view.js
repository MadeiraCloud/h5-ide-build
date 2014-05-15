(function() {
  define(['event', './module/header/template/header', './module/header/template/notifyitem', 'backbone', 'jquery', 'handlebars'], function(ide_event, tmpl, notifyitemTmpl) {
    var HeaderView;
    HeaderView = Backbone.View.extend({
      el: '#header',
      template: tmpl,
      events: {
        'click #btn-logout': 'clickLogout',
        'click #awscredential-modal': 'clickOpenAWSCredential',
        'DROPDOWN_CLOSE #header--notification': 'dropdownClosed',
        'click .dropdown-app-name': 'clickAppName'
      },
      render: function() {
        console.log('header render');
        this.$el.html(this.template(this.model.attributes));
        return ide_event.trigger(ide_event.HEADER_COMPLETE);
      },
      update: function() {
        $("#header").find(".no-credential").toggle(!this.model.get("has_cred"));
        $("#header--user").data("tooltip", this.model.get("user_email"));
        $("#header--user--name").text(this.model.get("user_name"));
        this.setAlertCount(this.model.get("unread_num"));
        return null;
      },
      updateNotification: function() {
        var html, i, _i, _len, _ref;
        this.setAlertCount(this.model.get("unread_num"));
        html = "";
        _ref = this.model.attributes.info_list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          html += notifyitemTmpl(i);
        }
        $("#notification-panel-wrapper").find(".scroll-content").html(html);
        $("#notification-panel-wrapper").css("max-height", Math.ceil(window.innerHeight * 0.8));
        return null;
      },
      clickLogout: function() {
        return this.trigger('BUTTON_LOGOUT_CLICK');
      },
      dropdownClosed: function() {
        $("#notification-panel-wrapper").find(".scroll-content").children().removeClass("unread");
        this.setAlertCount();
        this.trigger('DROPDOWN_MENU_CLOSED');
        return null;
      },
      clickAppName: function(event) {
        console.log('click dropdown app name');
        return this.trigger('DROPDOWN_APP_NAME_CLICK', event.currentTarget.id);
      },
      clickOpenAWSCredential: function() {
        return this.trigger('AWSCREDENTIAL_CLICK');
      },
      setAlertCount: function(count) {
        $('#header--notification').find('span').text(count || "");
        return null;
      }
    });
    return HeaderView;
  });

}).call(this);
