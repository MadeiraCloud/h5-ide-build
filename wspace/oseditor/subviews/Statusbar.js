(function() {
  define(["OpsModel", "Design", "../template/TplStatusbar", "constant", "backbone", "event", "state_status", "i18n!/nls/lang.js"], function(OpsModel, Design, template, constant, Backbone, ide_event, stateStatus, lang) {
    var itemView, items;
    items = [
      {
        name: 'lastSaved',
        className: 'info',
        visible: true,
        events: {
          update: function() {
            return [
              {
                obj: null,
                event: 'jsonDataSaved'
              }
            ];
          }
        },
        update: function($, workspace) {
          var save_time;
          save_time = jQuery.now() / 1000;
          if (this.timer) {
            clearInterval(this.timer);
          }
          this.timer = setInterval(function() {
            var $item, new_interval_time;
            $item = $('.stack-save-time');
            new_interval_time = MC.intervalDate(save_time);
            if ($item.text() !== new_interval_time) {
              return $item.text(new_interval_time);
            }
          }, 1000);
          return null;
        },
        click: function(event) {
          return null;
        },
        remove: function() {
          return clearInterval(this.timer);
        }
      }, {
        name: 'ta',
        className: 'status-bar-btn',
        visible: function(toggle, workspace) {
          var isVisible, mode;
          mode = workspace.design.mode();
          if (mode === 'app' || mode === 'appview') {
            isVisible = false;
          } else {
            isVisible = true;
          }
          if (typeof toggle === "function") {
            toggle(isVisible);
          }
          return isVisible;
        },
        changeVisible: true,
        click: function(event) {
          var btnDom, currentText;
          btnDom = $(event.currentTarget);
          currentText = lang.IDE.LBL_VALIDATE;
          btnDom.text(lang.IDE.VALIDATING_3DOT);
          return setTimeout(function() {
            MC.ta.validAll();
            btnDom.text(currentText);
            return require(['TaGui'], function(trustedadvisor_main) {
              return trustedadvisor_main.loadModule('statusbar', null);
            });
          }, 50);
        }
      }, {
        name: 'state',
        className: 'status-bar-btn',
        visible: function(toggle, workspace) {
          var appStoped, isVisible, mode;
          mode = workspace.design.mode();
          appStoped = _.every([OpsModel.State.Updating, OpsModel.State.Running, OpsModel.State.Saving], function(state) {
            return !workspace.opsModel.testState(state);
          });
          isVisible = false;
          if (mode === 'app' || mode === 'appedit') {
            isVisible = !appStoped;
          } else if (mode === 'appview') {
            isVisible = false;
          }
          if (typeof toggle === "function") {
            toggle(isVisible);
          }
          return isVisible;
        },
        events: {
          update: [
            {
              obj: ide_event,
              event: ide_event.UPDATE_STATE_STATUS_DATA
            }
          ]
        },
        changeVisible: true,
        update: function($, workspace) {
          var data;
          data = this.renderData(true, workspace);
          $('.state-success b').text(data.successCount);
          return $('.state-failed b').text(data.failCount);
        },
        renderData: function(visible, workspace) {
          var failed, state, stateList, status, succeed, _i, _j, _len, _len1, _ref;
          this.workspace = workspace;
          if (!visible) {
            return {};
          }
          stateList = App.WS.collection.status.find().fetch();
          succeed = failed = 0;
          if (!_.isArray(stateList)) {
            stateList = [stateList];
          }
          for (_i = 0, _len = stateList.length; _i < _len; _i++) {
            state = stateList[_i];
            if (state.app_id !== workspace.opsModel.get('id')) {
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
          return {
            successCount: succeed,
            failCount: failed
          };
        },
        click: function(event) {
          return stateStatus.loadModule();
        }
      }
    ];
    itemView = Backbone.View.extend({
      tagName: 'li',
      initialize: function() {
        _.bindAll(this, 'render', 'toggle');
        this.clearGarbage = [];
        return this.needUpdate = [];
      },
      render: function() {
        this.$el.html(this.template(this.data));
        return this;
      },
      toggle: function(showOrHide) {
        return this.$el.toggle(showOrHide);
      },
      remove: function() {
        var garbage, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.clearGarbage;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          garbage = _ref[_i];
          if (_.isArray(garbage)) {
            garbage[1].apply(garbage[0], garbage.slice(2));
          } else {
            garbage();
          }
        }
        this.clearGarbage = [];
        this.needUpdate = [];
        return this;
      },
      update: function() {
        var needUpdate, _i, _len, _ref;
        _ref = this.needUpdate;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          needUpdate = _ref[_i];
          needUpdate();
        }
        return this;
      }
    });
    return Backbone.View.extend({
      initialize: function(options) {
        var workspace;
        _.extend(this, options);
        workspace = this.workspace;
        this.itemViews = [];
        this.setElement(this.parent.$el.find(".OEPanelBottom").html(template.frame()));
        return this.renderItem();
      },
      ready: false,
      bindItem: function() {
        var e, event, index, isVisible, item, type, view, wrap$, wrapToggle, wrapUpdate, wrapVisible, _i, _j, _len, _len1, _ref, _ref1;
        _ref = jQuery.extend(true, [], items).reverse();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          item = _ref[index];
          view = new itemView();
          view.delegateEvents({
            click: item.click
          });
          view.template = template[item.name];
          view.$el.addClass(item.className);
          wrap$ = _.bind(view.$, view);
          wrapToggle = _.bind(view.toggle, view);
          if (_.isFunction(item.visible)) {
            wrapVisible = _.bind(item.visible, item, wrapToggle, this.workspace);
          }
          if (_.isFunction(item.update)) {
            wrapUpdate = _.bind(item.update, item, wrap$, this.workspace);
          }
          _ref1 = item.events;
          for (type in _ref1) {
            event = _ref1[type];
            if (_.isFunction(event)) {
              event = event();
            }
            if (!_.isArray(event)) {
              continue;
            }
            for (_j = 0, _len1 = event.length; _j < _len1; _j++) {
              e = event[_j];
              if (type === 'update') {
                if (e.obj === ide_event) {
                  ide_event.onLongListen(e.event, wrapUpdate);
                  view.clearGarbage.push([ide_event, ide_event.offListen, e.event, wrapUpdate]);
                } else {
                  view.listenTo(e.obj || this.workspace.opsModel, e.event, wrapUpdate);
                }
              }
            }
          }
          if (item.changeVisible) {
            if (item.visible) {
              view.needUpdate.push(wrapVisible);
            }
            if (item.update) {
              view.needUpdate.push(wrapUpdate);
            }
          }
          if (_.isFunction(item.visible)) {
            isVisible = item.visible(view.toggle, this.workspace);
          } else {
            view.toggle(item.visible);
            isVisible = item.visible;
          }
          view.data = (typeof item.renderData === "function" ? item.renderData(isVisible, this.workspace) : void 0) || {};
          if (item.remove) {
            view.clearGarbage.push(_.bind(item.remove, item));
          }
          this.itemViews.push(view);
        }
        return null;
      },
      renderItem: function() {
        var that, view, _i, _len, _ref;
        that = this;
        if (!this.ready) {
          this.bindItem();
          this.ready = true;
        }
        _ref = this.itemViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          this.$('ul').append(view.render().el);
        }
        return this;
      },
      update: function() {
        var view, _i, _len, _ref, _results;
        _ref = this.itemViews;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(view.update());
        }
        return _results;
      },
      remove: function() {
        var view, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.itemViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          view.remove();
        }
        return this;
      }
    });
  });

}).call(this);
