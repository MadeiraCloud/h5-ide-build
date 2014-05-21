(function() {
  define(['event', 'i18n!nls/lang.js', 'common_handle', 'UI.notification', 'UI.tour', 'backbone', 'jquery', 'handlebars', 'underscore'], function(ide_event, lang, common_handle) {
    var MainView, view;
    MainView = Backbone.View.extend({
      el: $('#main'),
      delay: null,
      open_fail: false,
      initialize: function() {
        $(window).on('beforeunload', this.beforeunloadEvent);
        return $(document).on('keydown', this.globalKeyEvent);
      },
      showMain: function() {
        var target, that;
        that = this;
        console.log('showMain');
        if ($('#waiting-bar-wrapper').hasClass('waiting-bar')) {
          this.toggleWaiting();
        }
        if (this.delay) {
          clearTimeout(this.delay);
        }
        if (!MC.data.loading_wrapper_html) {
          MC.data.loading_wrapper_html = $('#loading-bar-wrapper').html();
        }
        if ($('#loading-bar-wrapper').html().trim() === '') {
          return;
        }
        target = $('#loading-bar-wrapper').find('div');
        target.fadeOut('normal', function() {
          target.remove();
          return $('#wrapper').removeClass('main-content');
        });
        if (!this.open_fail) {
          delete MC.open_failed_list[MC.data.current_tab_id];
        }
        this.open_fail = false;
        return null;
      },
      showLoading: function(tab_id, is_transparent) {
        var me;
        console.log('showLoading, tab_id = ' + tab_id + ' , is_transparent = ' + is_transparent);
        $('#loading-bar-wrapper').html(!is_transparent ? MC.data.loading_wrapper_html : MC.template.loadingTransparent());
        me = this;
        this.delay = setTimeout(function() {
          console.log('setTimeout close loading');
          if ($('#loading-bar-wrapper').html().trim() !== '') {
            me.open_fail = true;
            ide_event.trigger(ide_event.SWITCH_MAIN);
            return ide_event.trigger(ide_event.SHOW_DESIGN_OVERLAY, 'OPEN_TAB_FAIL', tab_id);
          }
        }, 1000 * 30);
        return null;
      },
      toggleWaiting: function() {
        console.log('toggleWaiting');
        $('#waiting-bar-wrapper').removeClass('waiting-bar');
        return this.hideStatubar();
      },
      showDashbaordTab: function() {
        console.log('showDashbaordTab');
        console.log('MC.data.dashboard_type = ' + MC.data.dashboard_type);
        if (MC.data.dashboard_type === 'OVERVIEW_TAB') {
          this.showOverviewTab();
        } else {
          this.showRegionTab();
        }
        return this.hideStatubar();
      },
      showOverviewTab: function() {
        console.log('showOverviewTab');
        $('#tab-content-dashboard').addClass('active');
        $('#tab-content-region').removeClass('active');
        $('#tab-content-design').removeClass('active');
        return $('#tab-content-process').removeClass('active');
      },
      showRegionTab: function() {
        console.log('showRegionTab');
        $('#tab-content-region').addClass('active');
        $('#tab-content-dashboard').removeClass('active');
        $('#tab-content-design').removeClass('active');
        return $('#tab-content-process').removeClass('active');
      },
      showTab: function() {
        console.log('showTab');
        $('#tab-content-design').addClass('active');
        $('#tab-content-dashboard').removeClass('active');
        $('#tab-content-region').removeClass('active');
        $('#tab-content-process').removeClass('active');
        this.hideStatubar();
        return null;
      },
      showProcessTab: function() {
        console.log('showProcessTab');
        $('#tab-content-process').addClass('active');
        $('#tab-content-dashboard').removeClass('active');
        $('#tab-content-region').removeClass('active');
        $('#tab-content-design').removeClass('active');
        return this.hideStatubar();
      },
      beforeunloadEvent: function() {
        var checked_tab_id, has_refresh, _ref;
        if (MC.browser === 'msie' && MC.browserVersion === 10) {
          return;
        }
        if (!(App && App.user && App.user.get("session"))) {
          return;
        }
        has_refresh = true;
        checked_tab_id = null;
        if (!_.isEmpty(MC.common.other.canvasData.data()) && !_.isEmpty(MC.common.other.canvasData.origin()) && ((_ref = Tabbar.current) !== 'dashboard' && _ref !== 'appview' && _ref !== 'process')) {
          if (!MC.common.other.canvasData.isModified()) {
            console.log('current equal #1');
          } else {
            has_refresh = false;
          }
          checked_tab_id = MC.common.other.canvasData.get('id');
        } else {
          console.log('current equal #2');
        }
        _.each(MC.tab, function(item, id) {
          console.log('beforeunload current tab item', id, item);
          if (id.split('-')[0] === 'appview') {
            console.log('current equal #3');
          } else {
            if (!_.isEqual(item.data, item.origin_data) && id !== checked_tab_id) {
              has_refresh = false;
            } else {
              console.log('current equal #4');
            }
          }
          return has_refresh;
        });
        console.log('If I can refresh', has_refresh);
        if (has_refresh) {
          return void 0;
        } else {
          return lang.ide.BEFOREUNLOAD_MESSAGE;
        }
      },
      hideStatubar: function() {
        console.log('hideStatubar');
        if ($.trim($('#status-bar-modal').html())) {
          $('#status-bar-modal').empty();
          $('#status-bar-modal').hide();
          return ide_event.trigger(ide_event.UNLOAD_TA_MODAL);
        }
      },
      globalKeyEvent: function(event) {
        var nodeName;
        nodeName = event.target.nodeName.toLowerCase();
        if (event.which === 8 && nodeName !== 'input' && nodeName !== 'textarea' && event.target.contentEditable !== 'true') {
          return false;
        }
        if (event.which === 191 && nodeName !== 'input' && nodeName !== 'textarea' && event.target.contentEditable !== 'true') {
          modal(MC.template.shortkey(), true);
          return false;
        }
      }
    });
    view = new MainView();
    return view;
  });

}).call(this);
