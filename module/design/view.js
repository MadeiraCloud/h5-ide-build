(function() {
  define(['Design', 'event', './module/design/template', 'constant', 'i18n!nls/lang.js', 'state_status', 'backbone', 'jquery', 'handlebars'], function(Design, ide_event, template, constant, lang, stateStatusMain) {
    var DesignView;
    DesignView = Backbone.View.extend({
      el: '#tab-content-design',
      events: {
        'click .btn-ta-valid': 'statusBarTAClick',
        'click .btn-state': 'statusBarClick'
      },
      render: function() {
        console.log('design render');
        this.$el.html(template());
        this.trigger('DESIGN_COMPLETE');
        return $('#main-statusbar').html(MC.template.statusbar());
      },
      listen: function(model) {
        this.model = model;
        this.listenTo(this.model, 'change:snapshot', this.writeOldDesignHtml);
        this.listenTo(ide_event, 'SHOW_DESIGN_OVERLAY', this.showDesignOverlay);
        return this.listenTo(ide_event, 'HIDE_DESIGN_OVERLAY', this.hideDesignOverlay);
      },
      html: function() {
        var data;
        data = {
          resource: $('#resource-panel').html(),
          canvas: $('#canvas-panel').html(),
          overlay: $('#overlay-panel').html()
        };
        return data;
      },
      writeOldDesignHtml: function(event) {
        console.log('writeOldDesignHtml');
        if (_.isNumber(event.attributes.snapshot)) {
          return;
        }
        $('#canvas-panel').one('DOMNodeInserted', '.canvas-svg-group', this, _.debounce(this.canvasChange, 200, true));
        $('#resource-panel').html(this.model.get('snapshot').resource);
        $('#canvas-panel').html(this.model.get('snapshot').canvas);
        $('#overlay-panel').html(this.model.get('snapshot').overlay);
        if ($.trim($('#overlay-panel').html()) !== '') {
          this.showDesignOverlay();
        } else {
          this.hideDesignOverlay();
        }

        /*
        this.$el.empty().html this.model.get 'snapshot'
        $( '#property-panel' ).empty()
         */
        return null;
      },
      canvasChange: function(event) {
        console.log('canvas:listen DOMNodeInserted');
        console.log(MC.data.current_tab_type);
        if (MC.data.current_tab_type === 'OLD_APP' || MC.data.current_tab_type === 'OLD_STACK') {
          ide_event.trigger(ide_event.SWITCH_WAITING_BAR);
          MC.data.current_tab_type = null;
        }
        return null;
      },
      statusBarTAClick: function(event) {
        var btnDom, currentText;
        console.log('statusbarTAClick');
        btnDom = $(event.currentTarget);
        currentText = 'Validate';
        btnDom.text('Validating...');
        return setTimeout(function() {
          MC.ta.validAll();
          btnDom.text(currentText);
          return require(['component/trustedadvisor/main'], function(trustedadvisor_main) {
            return trustedadvisor_main.loadModule('statusbar', null);
          });
        }, 50);
      },
      statusBarClick: function(event) {
        return stateStatusMain.loadModule();
      },
      updateStatusbar: function(type, level) {
        console.log('updateStatusbar, level = ' + level + ', type = ' + type);
        ide_event.trigger(ide_event.UPDATE_TA_MODAL);
        return null;
      },
      updateStatusBarSaveTime: function() {
        var $item, save_time;
        console.log('updateStatusBarSaveTime');
        save_time = $.now() / 1000;
        clearInterval(this.timer);
        $item = $('.stack-save-time');
        $item.text(MC.intervalDate(save_time));
        $item.attr('data-tab-id', MC.data.current_tab_id);
        $item.attr('data-save-time', save_time);
        this.timer = setInterval((function() {
          $item = $('.stack-save-time');
          if ($item.attr('data-tab-id') === MC.data.current_tab_id) {
            return $item.text(MC.intervalDate($item.attr('data-save-time')));
          }
        }), 500);
        return null;
      },
      renderStateBar: function(stateList) {
        var $stateBar, failed, state, status, succeed, _i, _j, _len, _len1, _ref;
        succeed = failed = 0;
        if (!_.isArray(stateList)) {
          stateList = [stateList];
        }
        for (_i = 0, _len = stateList.length; _i < _len; _i++) {
          state = stateList[_i];
          if (state.app_id !== MC.common.other.canvasData.data('origin').id) {
            continue;
          }
          if (state.status) {
            _ref = state.status;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              status = _ref[_j];
              if (status.result === 'success') {
                succeed++;
              } else if (status.result === 'failure') {
                failed++;
              }
            }
          }
        }
        $stateBar = $('.statusbar-btn');
        $stateBar.find('.state-success b').text(succeed);
        return $stateBar.find('.state-failed b').text(failed);
      },
      loadStateStatusBar: function() {
        var $btnState, appStoped, stateList, _ref;
        ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA, this.updateStateBar);
        ide_event.onLongListen(ide_event.UPDATE_STATE_STATUS_DATA, this.updateStateBar, this);
        ide_event.offListen(ide_event.UPDATE_APP_STATE, this.updateStateBarWhenStateChanged);
        ide_event.onLongListen(ide_event.UPDATE_APP_STATE, this.updateStateBarWhenStateChanged, this);
        appStoped = MC.common.other.canvasData.data('origin').state === 'Stopped';
        $btnState = $('#main-statusbar .btn-state');
        if ((_ref = Tabbar.current) === 'app' || _ref === 'appedit') {
          if (appStoped) {
            $btnState.hide();
          }
        }
        if (appStoped) {
          return;
        }
        if (Tabbar.current === 'appview') {
          $btnState.hide();
        } else {
          $btnState.show();
        }
        stateList = MC.data.websocket.collection.status.find().fetch();
        return this.renderStateBar(stateList);
      },
      updateStateBarWhenStateChanged: function(state) {
        var stateList;
        if (state === 'Stopped') {
          stateList = [];
        } else {
          stateList = MC.data.websocket.collection.status.find().fetch();
        }
        return this.renderStateBar(stateList);
      },
      updateStateBar: function(type, idx, statusData) {
        var stateList;
        stateList = MC.data.websocket.collection.status.find().fetch();
        return this.renderStateBar(stateList);
      },
      unloadStateStatusBar: function() {
        $('#main-statusbar .btn-state').hide();
        return ide_event.offListen(ide_event.UPDATE_STATE_STATUS_DATA);
      },
      hideStatusbar: function() {
        var _ref;
        console.log('hideStatusbar');
        if ((_ref = Tabbar.current) === 'app' || _ref === 'appview') {
          $('#main-statusbar .btn-ta-valid').hide();
          this.loadStateStatusBar();
        } else if (Tabbar.current === 'appedit') {
          $('#main-statusbar .btn-ta-valid').show();
          this.loadStateStatusBar();
        } else {
          $('#main-statusbar .btn-ta-valid').show();
          this.unloadStateStatusBar();
        }
        if (Tabbar.current === 'appedit') {
          $('#canvas').css('bottom', 24);
        }
        return null;
      },
      showDesignOverlay: function(state, id) {
        var $item, error, event_type, flag_list, obj;
        try {
          console.log('showDesignOverlay', state, id);
          if (MC.data.current_tab_id !== id) {
            return;
          }
          $item = $('#overlay-panel');
          $item.addClass('design-overlay');
          switch (state) {
            case 'OPEN_TAB_FAIL':
              $item.html(MC.template.openTabFail());
              break;
            case constant.APP_STATE.APP_STATE_STARTING:
              $item.html(MC.template.appStarting());
              break;
            case constant.APP_STATE.APP_STATE_STOPPING:
              $item.html(MC.template.appStopping());
              break;
            case constant.APP_STATE.APP_STATE_TERMINATING:
              $item.html(MC.template.appTerminating());
              break;
            case constant.APP_STATE.APP_STATE_UPDATING:
              obj = {
                'is_show': false,
                'rate': 0,
                'steps': 0,
                'dones': 0
              };
              if (MC.data.process && MC.data.current_tab_id && MC.data.process[MC.data.current_tab_id] && MC.data.process[MC.data.current_tab_id].flag_list) {
                flag_list = MC.data.process[MC.data.current_tab_id].flag_list;
                if (flag_list.rate && flag_list.steps && flag_list.dones) {
                  obj = {
                    'is_show': true,
                    'rate': flag_list.rate,
                    'steps': flag_list.steps,
                    'dones': flag_list.dones
                  };
                }
              }
              $item.html(MC.template.appUpdating(obj));
              break;
            case 'CHANGED_FAIL':
              obj = {
                'is_show': false,
                'state': 'update',
                'detail': '',
                'update_detail': true
              };
              if (MC.data.process && MC.data.current_tab_id && MC.data.process[MC.data.current_tab_id] && MC.data.process[MC.data.current_tab_id].flag_list) {
                flag_list = MC.data.process[MC.data.current_tab_id].flag_list;
                if (flag_list.flag && lang.ide[flag_list.flag] && flag_list.err_detail) {
                  obj = {
                    'is_show': true,
                    'state': lang.ide[flag_list.flag],
                    'detail': flag_list.err_detail.replace(/\n/g, '</br>'),
                    'update_detail': flag_list.flag === 'UPDATE_APP' ? true : false
                  };
                }
              }
              $item.html(MC.template.appChangedfail(obj));
              break;
            case 'UPDATING_SUCCESS':
              $item.html(MC.template.appUpdatedSuccess());
              break;
            default:
              console.log('current state = ' + state);
              console.log(MC.data.process[MC.data.current_tab_id]);
          }
          if (state === 'OPEN_TAB_FAIL') {
            obj = MC.common.other.searchStackAppById(MC.data.current_tab_id);
            if (Tabbar.current === 'new') {
              event_type = 'RELOAD_NEW_STACK';
            } else if (obj) {
              event_type = MC.data.current_tab_id.split('-')[0] === 'app' ? 'RELOAD_APP' : 'RELOAD_STACK';
              MC.open_failed_list[MC.data.current_tab_id] = $.extend(true, {}, obj);
            } else {
              console.error('app or stack not find, current id is ' + MC.data.current_tab_id);
            }
            $('#btn-fail-reload').one('click', function(event) {
              if (Tabbar.current === 'new') {
                ide_event.trigger(ide_event.OPEN_DESIGN_TAB, event_type, MC.open_failed_list[MC.data.current_tab_id].platform, MC.open_failed_list[MC.data.current_tab_id].region, MC.open_failed_list[MC.data.current_tab_id].id);
              } else if (MC.open_failed_list[MC.data.current_tab_id]) {
                ide_event.trigger(ide_event.OPEN_DESIGN_TAB, event_type, null, MC.open_failed_list[MC.data.current_tab_id].region, MC.open_failed_list[MC.data.current_tab_id].id);
              } else {
                console.error('not click, current not id');
              }
              return null;
            });
          } else if (state === 'CHANGED_FAIL') {
            $('#btn-changedfail').one('click', function(event) {
              ide_event.trigger(ide_event.HIDE_DESIGN_OVERLAY);
              return null;
            });
          } else if (state === 'UPDATING_SUCCESS') {
            $('#btn-updated-success').one('click', function(event) {
              ide_event.trigger(ide_event.APPEDIT_2_APP, MC.data.process[MC.data.current_tab_id].id, MC.data.process[MC.data.current_tab_id].region);
              return null;
            });
          } else if (state === constant.APP_STATE.APP_STATE_UPDATING) {
            if (MC.data.process[MC.data.current_tab_id].flag_list.is_pending) {
              $('.overlay-content-wrap').find('.progress').hide();
              $('.overlay-content-wrap').find('.process-info').hide();
            } else if (MC.data.process[MC.data.current_tab_id].flag_list.is_inprocess) {
              $('.overlay-content-wrap').find('.loading-spinner').hide();
              $('.overlay-content-wrap').find('.progress').show();
              $('.overlay-content-wrap').find('.process-info').show();
            }
          }
        } catch (_error) {
          error = _error;
          console.log('design:view:showDesignOverlay error');
          console.log('showDesignOverlay, state = ' + state);
          console.log("error message: " + error);
        }
        return null;
      },
      hideDesignOverlay: function() {
        var $item;
        console.log('hideDesignOverlay');
        $item = $('#overlay-panel');
        $item.removeClass('design-overlay');
        if ($.trim($item.html()) !== '') {
          $item.empty();
        }
        MC.common.other.deleteProcess(MC.data.current_tab_id);
        return null;
      }
    });
    return DesignView;
  });

}).call(this);
