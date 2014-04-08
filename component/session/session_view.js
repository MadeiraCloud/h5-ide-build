(function() {
  define(['event', './session_template', 'backbone', 'jquery', 'handlebars', 'UI.modal'], function(ide_event, session_template) {
    var SessionView;
    SessionView = Backbone.View.extend({
      events: {
        'closed': 'closedSessionPopup',
        'click #cidr-return': 'reConnectSession'
      },
      render: function() {
        console.log('pop-up:session render');
        modal(session_template(), false);
        return this.setElement($('.invalid-session').closest('#modal-wrap'));
      },
      reConnectSession: function() {
        console.log('reConnectSession');
        return ide_event.trigger(ide_event.LOGOUT_IDE);
      },
      closedSessionPopup: function() {
        console.log('closedSessionPopup');
        this.trigger('OPEN_RECONNECT');
        return this.trigger('CLOSE_POPUP');
      }
    });
    return SessionView;
  });

}).call(this);
