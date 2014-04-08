(function() {
  define(['event', 'i18n!nls/lang.js', './reconnect_template', 'backbone', 'jquery', 'handlebars', 'UI.modal'], function(ide_event, lang, reconnect_template) {
    var ReConnectView;
    ReConnectView = Backbone.View.extend({
      events: {
        'click #reconnect-ok': 'reConnectOK',
        'click #reconnect-close': 'reConnectClose',
        'keyup #input-demo': 'keyupPassword'
      },
      render: function() {
        console.log('pop-up:reconnect render');
        modal(reconnect_template(), false);
        return this.setElement($('.reconnect-session').closest('#modal-wrap'));
      },
      reConnectOK: function() {
        console.log('reConnectOK');
        $('#reconnect-ok').prop('disabled', true);
        return this.trigger('RE_LOGIN', $('#input-demo').val());
      },
      reConnectClose: function() {
        console.log('reConnectClose');
        return ide_event.trigger(ide_event.LOGOUT_IDE);
      },
      keyupPassword: function(event) {
        console.log('changePassword');
        if (event.currentTarget.value.length) {
          if (event.which === 13) {
            return this.reConnectOK();
          } else {
            return $('#reconnect-ok').removeAttr('disabled');
          }
        } else {
          return $('#reconnect-ok').prop('disabled', true);
        }
      },
      invalid: function() {
        console.log('invalid');
        notification('error', lang.ide.NOTIFY_MSG_WARN_AUTH_FAILED);
        $('#reconnect-ok').prop('disabled', false);
        return $('#input-demo').addClass('parsley-error').one('keyup', function() {
          return $(this).removeClass('parsley-error');
        });
      },
      close: function() {
        console.log('closedReConnectPopup');
        modal.close();
        return this.trigger('CLOSE_POPUP');
      }
    });
    return ReConnectView;
  });

}).call(this);
