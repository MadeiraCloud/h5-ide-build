
/*
----------------------------
  The Model for application
----------------------------

  This model holds all the data of the user in our database. For example, stack list / app list / notification things and extra.
 */

(function() {
  define(["backbone", "./Websocket", "event", "constant"], function(Backbone, Websocket, ide_event, constant) {
    return Backbone.Model.extend({
      defaults: function() {
        return {
          notification: [],
          __websocketReady: false
        };
      },
      initialize: function() {
        this.__initializeNotification();
      },
      __initializeNotification: function() {

        /*
        ide_event.onLongListen ide_event.SWITCH_DASHBOARD, () -> return
        ide_event.onLongListen ide_event.SWITCH_TAB, () -> return
        ide_event.onListen ide_event.OPEN_DESIGN, () -> return
         */
        var self;
        self = this;
        return ide_event.onLongListen(ide_event.UPDATE_REQUEST_ITEM, function(idx) {
          return self.__processSingleNotification(idx);
        });
      },
      __processSingleNotification: function(idx) {
        var i, info_list, item, req, same_req, _i, _len;
        req = App.WS.collection.request.findOne({
          '_id': idx
        });
        if (!req) {
          return;
        }
        item = this.__parseRequestInfo(req);
        if (!item) {
          return;
        }
        info_list = this.attributes.notification;
        for (idx = _i = 0, _len = info_list.length; _i < _len; idx = ++_i) {
          i = info_list[idx];
          if (i.id === item.id) {
            same_req = i;
            break;
          }
        }
        if (same_req && same_req.is_request === item.is_request && same_req.is_process === item.is_process && same_req.is_complete === item.is_complete) {
          return;
        }
        item.is_readed = !App.WS.isReady();
        info_list.splice(idx, 1);
        info_list.splice(0, 0, item);
        if (!this.__notifyDebounce) {
          this.__notifyDebounce = setTimeout((function(_this) {
            return function() {
              _this.trigger("change:notification");
              _this.__notifyDebounce = null;
            };
          })(this), 300);
        }
        return null;
      },
      __parseRequestInfo: function(req) {
        var duration, item, lst, time_begin, time_end;
        if (!req.brief) {
          return;
        }
        lst = req.brief.split(' ');
        item = {
          is_readed: true,
          is_request: req.state === constant.OPS_STATE.OPS_STATE_PENDING,
          is_process: req.state === constant.OPS_STATE.OPS_STATE_INPROCESS,
          is_complete: req.state === constant.OPS_STATE.OPS_STATE_DONE,
          operation: lst[0].toLowerCase(),
          name: lst[lst.length - 1],
          region_label: constant.REGION_SHORT_LABEL[req.region],
          time: req.time_end
        };
        item = $.extend({}, req, item);
        if (req.state === constant.OPS_STATE.OPS_STATE_FAILED) {
          item.error = req.data;
        } else if (req.state === constant.OPS_STATE.OPS_STATE_INPROCESS) {
          item.time = req.time_begin;
        }
        if (req.state !== constant.OPS_STATE.OPS_STATE_PENDING) {
          item.time_str = MC.dateFormat(new Date(item.time * 1000), "hh:mm yyyy-MM-dd");
          if (req.state !== constant.OPS_STATE.OPS_STATE_INPROCESS) {
            time_begin = parseInt(req.time_begin, 10);
            time_end = parseInt(req.time_end, 10);
            if (!isNaN(time_begin) && !isNaN(time_end) && time_end >= time_begin) {
              duration = time_end - time_begin;
              if (duration < 60) {
                item.duration = "Took " + duration + " sec.";
              } else {
                item.duration = "Took " + (Math.round(duration / 60)) + " min.";
              }
            }
          }
        }
        if (item.rid.search('stack') === 0) {
          item.name = lst[2];
        }
        item.is_terminated = item.is_complete && item.operation === 'terminate';
        return item;
      },
      markNotificationRead: function() {
        var i, _i, _len, _ref;
        _ref = this.attributes.notification;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.is_readed = true;
        }
      }
    });
  });

}).call(this);
