(function() {
  define(['event', './template', 'backbone', 'jquery', 'handlebars', 'UI.modal', 'jqpagination'], function(ide_event, template, Backbone, $, Handlebars) {
    var AMIsView;
    AMIsView = Backbone.View.extend({
      events: {
        'closed': 'closedAMIsPopup',
        'click .ami-option-group .ami-option-wrap .btn': 'clickOptionBtn'
      },
      render: function() {
        var that;
        console.log('pop-up:amis run render');
        that = this;
        return modal(template({}), true, function() {
          return _.defer(function() {
            return that.setElement($('#modal-browse-community-ami').closest('#modal-wrap'));
          });
        });
      },
      showLoading: function() {
        this.$('.scroll-content').hide();
        return this.$('.show-loading').show();
      },
      showContent: function() {
        this.$('.show-loading').hide();
        return this.$('.scroll-content').show();
      },
      closedAMIsPopup: function() {
        console.log('closedAMIsPopup');
        return this.trigger('CLOSE_POPUP');
      },
      clickOptionBtn: function(event) {
        var active_btns;
        console.log('click option button');
        if ($(event.target).hasClass('active')) {
          active_btns = $(event.target).parent().find('.active');
          if (active_btns.length === 1 && active_btns[0] === event.target) {
            return;
          } else {
            $(event.target).removeClass('active');
          }
        } else {
          $(event.target).addClass('active');
        }
        return null;
      }
    });
    return AMIsView;
  });

}).call(this);
