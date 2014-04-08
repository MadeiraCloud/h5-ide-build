(function() {
  define(['event', './module/tabbar/template', 'backbone', 'jquery', 'handlebars', 'UI.tabbar'], function(ide_event, tmpl) {
    var TabBarView;
    TabBarView = Backbone.View.extend({
      el: $('#tab-bar'),
      template: tmpl,
      events: {
        'OPEN_TAB': 'openTabEvent',
        'CLOSE_TAB': 'closeTabEvent',
        'CLOSE_TAB_RESTRICTION': 'closeTabRestrictionEvent'
      },
      initialize: function() {
        $(document.body).on('click', '#reload-account-attributes', this, this.reloadAccountAttributes);
        $(document.body).on('click', '#close-tab-confirm', this, this.closeTabConfirmEvent);
        return this.listenTo(ide_event, 'UPDATE_DESIGN_TAB_ICON', this.updateTabIcon);
      },
      render: function() {
        console.log('tabbar render');
        return $(this.el).html(this.template());
      },
      reloadAccountAttributes: function() {
        return window.location.reload();
      },
      openTabEvent: function(event, original_tab_id, tab_id) {
        var tab_type;
        console.log('openTabEvent');
        console.log('original_tab_id = ' + original_tab_id + ', tab_id = ' + tab_id);
        if (original_tab_id === tab_id) {
          return;
        }
        MC.common.other.setCurrentTabId(tab_id);
        tab_type = tab_id.split('-')[0];
        switch (tab_type) {
          case 'dashboard':
            this.trigger('SWITCH_DASHBOARD', original_tab_id, tab_id);
            break;
          case 'new':
            this.trigger('SWITCH_NEW_STACK_TAB', original_tab_id, tab_id, $('#tab-bar-' + tab_id).find('a').attr('title'));
            break;
          case 'stack':
          case 'import':
            this.trigger('SWITCH_STACK_TAB', original_tab_id, tab_id);
            break;
          case 'app':
          case 'appview':
            this.trigger('SWITCH_APP_TAB', original_tab_id, tab_id);
            break;
          case 'process':
            this.trigger('SWTICH_PROCESS_TAB', original_tab_id, tab_id);
            break;
          default:
            console.log('no find tab type');
        }
        return null;
      },
      updateCurrentTab: function(tab_id, tab_name, old_tab_id) {
        var original_tab_id;
        console.log('updateCurrentTab', tab_id, tab_name, old_tab_id);
        original_tab_id = null;
        _.each($('.tabbar-group').children(), function(item) {
          var temp;
          console.log($(item));
          if (old_tab_id && $(item).attr('id') !== 'tab-bar-' + old_tab_id) {
            return;
          }
          if (!old_tab_id && $(item).attr('class') !== 'active') {
            return;
          }
          $(item).attr('id', 'tab-bar-' + tab_id);
          temp = $($(item).find('a')[0]);
          original_tab_id = temp.attr('data-tab-id');
          if (tab_name) {
            temp.attr('title', tab_name);
          }
          temp.attr('data-tab-id', tab_id);
          temp.attr('href', '#tab-content-' + tab_id);
          if (tab_name) {
            temp.html(temp.find('i').get(0).outerHTML + tab_name);
          }
          if (MC.common.other.isCurrentTab(tab_id)) {
            ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_TYPE, tab_id, tab_id.split('-')[0]);
          }
          return null;
        });
        return original_tab_id;
      },
      updateTabIcon: function(type, tab_id) {
        console.log('updateTabIcon, type = ' + type + ', tab_id = ' + tab_id);
        return _.each($('.tabbar-group').children(), function(item) {
          var $item, classname;
          $item = $(item);
          if ($item.attr('id') === 'tab-bar-' + tab_id) {
            switch (type) {
              case 'stack':
                classname = 'icon-stack-tabbar';
                break;
              case 'visualization':
                classname = 'icon-' + type + '-tabbar';
                break;
              default:
                classname = 'icon-app-' + type.toLowerCase();
            }
            $item.find('i').removeClass();
            return $item.find('i').addClass('icon-tabbar-label ' + classname);
          }
        });
      },
      updateTabCloseState: function(tab_id) {
        var close_target;
        console.log('updateTabCloseState, tab_id = ' + tab_id);
        close_target = $('#tab-bar-' + tab_id).children('.icon-close');
        close_target.removeClass('close-restriction');
        close_target.addClass('close-tab');
        return close_target.addClass('auto-close');
      },
      closeTabEvent: function(event, tab_id) {
        console.log('closeTabEvent');
        ide_event.trigger(ide_event.DELETE_TAB_DATA, tab_id);
        return null;
      },
      closeTabRestrictionEvent: function(event, target, tab_name, tab_id) {
        var is_changed, _ref, _ref1;
        console.log('closeTabRestrictionEvent', tab_name, tab_id);
        if (((_ref = tab_id.split('-')[0]) === 'process' || _ref === 'appview') || (tab_id === MC.data.current_tab_id && Tabbar.current === 'app') || ((_ref1 = MC.common.other.canvasData.data().platform) === MC.canvas.PLATFORM_TYPE.EC2_CLASSIC || _ref1 === MC.canvas.PLATFORM_TYPE.DEFAULT_VPC)) {
          this.directCloseTab(tab_id);
          return;
        }
        is_changed = true;
        if (MC.common.other.isCurrentTab(tab_id)) {
          is_changed = MC.common.other.canvasData.isModified();
        } else {
          is_changed = MC.tab[tab_id].design_model.isModified();
        }
        if (!is_changed) {
          this.directCloseTab(tab_id);
        } else {
          modal(MC.template.closeTabRestriction({
            'tab_name': tab_name,
            'tab_id': tab_id
          }, true));
        }
        return null;
      },
      closeTabConfirmEvent: function(event) {
        console.log('closeTabConfirmEvent, tab_id = ' + $(event.currentTarget).attr('data-tab-id'));
        event.data.directCloseTab($(event.currentTarget).attr('data-tab-id'));
        return modal.close();
      },
      directCloseTab: function(tab_id) {
        console.log('directCloseTab', tab_id);
        this.updateTabCloseState(tab_id);
        _.delay(function() {
          return ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, tab_id);
        }, 150);
        return null;
      },
      closeTab: function(tab_id) {
        var $target;
        console.log('closeTab', tab_id);
        if ($('#tab-bar-' + tab_id).length === 0) {
          return;
        }
        $target = $($('#tab-bar-' + tab_id).find('a')[1]);
        if ($target.attr('class').indexOf('close-restriction') !== -1) {
          this.updateTabCloseState(tab_id);
        }
        _.delay(function() {
          return $target.trigger('click');
        }, 150);
        return null;
      },
      changeDashboardTabname: function(tab_name) {
        console.log('changeDashboardTabname');
        $('#tab-bar-dashboard').children().html('<i class="icon-dashboard icon-tabbar-label"></i>' + tab_name);
        return null;
      },
      openNewStackDialog: function() {
        console.log('openNewStackDialog');
        this.trigger('SELECE_PLATFORM', 'ec2-vpc');
        return null;
      }
    });
    return TabBarView;
  });

}).call(this);
