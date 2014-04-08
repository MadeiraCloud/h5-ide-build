(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['event', './template', 'backbone', 'jquery', 'handlebars'], function(ide_event, template) {
    var CustomView, StateStatusView;
    CustomView = Backbone.View.extend({
      tagName: 'li',
      className: 'state-status-item',
      initialize: function() {
        return this.listenTo(this.model, 'change', this.render);
      },
      render: function() {
        this.$el.html(template.item(this.model.toJSON()));
        return this;
      },
      events: {
        'click .state-status-item-detail': 'openStateEditor'
      },
      openStateEditor: function() {
        ide_event.trigger(ide_event.OPEN_PROPERTY, null, this.model.get('uid'), false, 'state');
        return null;
      }
    });
    StateStatusView = Backbone.View.extend({
      events: {
        'click .modal-close': 'closePopup',
        'click .state-status-update': 'renderNew'
      },
      initialize: function() {
        this.items = this.model.get('items');
        this.listenTo(this.model, 'change:items', this.renderAllItem);
        this.listenTo(this.model, 'change:stop', this.renderAllItem);
        this.listenTo(this.model, 'change:new', this.renderUpdate);
        this.itemView = CustomView;
        return null;
      },
      render: function() {
        this.$statusModal = this.$el;
        this.$el.html(template.modal());
        this.$('.modal-state-statusbar').html(template.content());
        this.renderAllItem();
        $('#status-bar-modal').html(this.el).show();
        return this;
      },
      renderUpdate: function(model) {
        var newCount;
        newCount = model.get('new').length;
        if (newCount) {
          this.$('.update-tip').html(template.update(newCount));
        }
        return scrollbar.scrollTo(this.$('.scroll-wrap'), {
          'top': 0
        });
      },
      renderNew: function() {
        this.$('.update-tip div').hide();
        this.renderAllItem();
        return this.model.flushNew();
      },
      renderAllItem: function() {
        var items;
        items = this.items;
        if (this.model.get('stop')) {
          this.renderPending();
          return;
        }
        if (items.length) {
          this.renderContainer();
          return items.each(this.renderItem, this);
        }
      },
      renderItem: function(model, index) {
        var view;
        view = new this.itemView({
          model: model
        });
        view.render();
        view.$el.hide();
        this.$('.state-status-list').append(view.el);
        if (__indexOf.call(this.model.get('new'), model) >= 0) {
          return _.defer(function() {
            return view.$el.fadeIn(300);
          });
        } else {
          return view.$el.show();
        }
      },
      renderContainer: function() {
        return this.$('.status-item').html(template.container());
      },
      renderPending: function() {
        return this.$('.status-item').html(template.pending());
      },
      closePopup: function() {
        $('#status-bar-modal').hide();
        return this.trigger('CLOSE_POPUP');
      }
    });
    return StateStatusView;
  });

}).call(this);
