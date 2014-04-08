(function() {
  define(['event', "./template", 'backbone', 'jquery', 'handlebars', 'UI.modal'], function(ide_event, template) {
    var StackRunView;
    StackRunView = Backbone.View.extend({
      events: {
        'click .stack-run-click': 'stackRunClickEvent',
        'closed': 'closedStackRunPopup'
      },
      render: function() {
        console.log('pop-up:stack run render');
        modal(template(), true);
        return this.setElement($('#stack-run-modal').closest('#modal-wrap'));
      },
      stackRunClickEvent: function() {
        return console.log('stackRunClickEvent');
      },
      closedStackRunPopup: function() {
        console.log('closedStackRunPopup');
        return this.trigger('CLOSE_POPUP');
      }
    });
    return StackRunView;
  });

}).call(this);
