(function() {
  define(['constant', 'CloudResources', './component/optiongroup/ogTpl', 'i18n!/nls/lang.js', 'event', 'UI.modalplus'], function(constant, CloudResources, template, lang, ide_event, modalplus) {
    return Backbone.View.extend({
      id: 'modal-option-group',
      tagName: 'section',
      className: 'modal-toolbar modal-option-group-app',
      events: {
        'click .toggle-og-detail': "toggleDetail"
      },
      toggleDetail: function(e) {
        var $li, $target;
        $target = $(e.currentTarget);
        $li = $target.closest('li');
        $li.toggleClass('show-details');
        return $li.find('.toggle-og-detail').toggle();
      },
      initModal: function(tpl) {
        var options;
        options = {
          template: tpl,
          title: this.model.get('appId'),
          width: '855px',
          height: '473px',
          compact: true,
          confirm: {
            hide: true
          },
          cancel: {
            text: 'Close'
          }
        };
        this.__modalplus = new modalplus(options);
        this.__modalplus.on('closed', this.close, this);
        return null;
      },
      initialize: function(options) {
        var appId, _ref;
        appId = this.model.get('appId');
        this.appData = (_ref = CloudResources(constant.RESTYPE.DBOG, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
        if (!this.appData) {
          return false;
        }
        return this.render();
      },
      render: function() {
        this.$el.html(template.og_app_modal(this.appData));
        this.initModal(this.el);
        return this;
      },
      close: function() {
        return this.remove();
      }
    });
  });

}).call(this);
