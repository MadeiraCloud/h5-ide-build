(function() {
  define(['event', "./template", 'backbone', 'jquery', 'handlebars', 'UI.modal', 'bootstrap-carousel'], function(ide_event, template) {
    var TutorialView;
    TutorialView = Backbone.View.extend({
      events: {
        'closed': 'closedPopup'
      },
      render: function() {
        var youtube_player;
        console.log('pop-up:stack run render');
        modal(template(), true);
        this.setElement($('#guide-carousel-modal').closest('#modal-wrap'));
        $('#guide-carousel').carousel({
          'interval': false,
          'wrap': false
        });
        youtube_player = [];
        onYouTubePlayerAPIReady();
        return setTimeout(function() {
          return modal.position();
        }, 500);
      },
      closedPopup: function() {
        console.log('closedPopup');
        return this.trigger('CLOSE_POPUP');
      }
    });
    return TutorialView;
  });

}).call(this);
