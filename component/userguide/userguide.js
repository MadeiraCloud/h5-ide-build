define(['constant', 'i18n!/nls/lang.js', './userguideTpl'], function(constant, lang, template) {
  return Backbone.View.extend({
    className: 'user-guide',
    tagName: 'section',
    initialize: function() {
      return console.log('init');
    },
    events: {
      'click .guide-card': 'playVideo',
      'click .guide-video': 'closeVideo'
    },
    render: function() {
      this.$el.html(template());
      $('.user-guide').remove();
      return $('body').append(this.$el);
    },
    playVideo: function() {
      var video;
      this.$el.find('.guide-video').fadeIn();
      video = this.$el.find('.guide-video video')[0];
      return video.play();
    },
    closeVideo: function() {
      var video;
      this.$el.find('.guide-video').fadeOut();
      video = this.$el.find('.guide-video video')[0];
      video.pause();
      return video.currentTime = 0;
    }
  });
});
