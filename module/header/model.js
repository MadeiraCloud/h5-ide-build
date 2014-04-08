(function() {
  define(['backbone', 'jquery', 'underscore', 'session_model', 'constant', 'event', 'common_handle'], function(Backbone, $, _, session_model, constant, ide_event, common_handle) {
    var HeaderModel;
    HeaderModel = Backbone.Model.extend({
      defaults: {
        'info_list': [],
        'unread_num': null,
        'in_dashboard': true,
        'has_cred': true,
        'user_name': null,
        'user_email': null
      },
      initialize: function() {
        return this.on('SESSION_LOGOUT_RETURN', function(forge_result) {
          var result;
          if (!forge_result.is_error) {
            result = forge_result.resolved_data;
          }
          common_handle.cookie.deleteCookie();
          $.cookie('madeiracloud_ide_session_id', null, {
            expires: 0
          });
          window.location.href = "/login";
          return false;
        });
      },
      init: function() {
        this.set({
          'user_name': MC.base64Decode($.cookie('usercode')),
          'user_email': MC.base64Decode($.cookie('email'))
        });
        return null;
      },
      updateHeader: function(req) {
        var i, idx, in_dashboard, info_list, item, same_req, unread_num, _i, _j, _len, _len1;
        item = this.parseInfo(req);
        if (!item) {
          return;
        }
        info_list = this.attributes.info_list;
        unread_num = this.attributes.unread_num;
        in_dashboard = this.attributes.in_dashboard;
        same_req = null;
        for (_i = 0, _len = info_list.length; _i < _len; _i++) {
          i = info_list[_i];
          if (i.id === item.id) {
            same_req = i;
          }
        }
        if (same_req !== null && (same_req.is_request === item.is_request && same_req.is_process === item.is_process && same_req.is_complete === item.is_complete)) {
          return;
        }
        if (in_dashboard || item.rid !== MC.canvas_data.id) {
          item.is_readed = false;
          if (same_req === null || same_req.is_readed) {
            this.set('unread_num', unread_num + 1);
          }
        }
        for (idx = _j = 0, _len1 = info_list.length; _j < _len1; idx = ++_j) {
          i = info_list[idx];
          if (i.id === item.id) {
            info_list.splice(idx, 1);
            break;
          }
        }
        info_list.splice(0, 0, item);
        return null;
      },
      parseInfo: function(req) {
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
      setFlag: function(flag) {
        var info, info_list, unread_num, _i, _len;
        this.set('in_dashboard', flag);
        unread_num = this.attributes.unread_num;
        info_list = this.attributes.info_list;
        if (!flag && unread_num > 0) {
          for (_i = 0, _len = info_list.length; _i < _len; _i++) {
            info = info_list[_i];
            if (info.rid === MC.canvas_data.id && !info.is_readed) {
              info.is_readed = true;
              this.set('unread_num', unread_num - 1);
              break;
            }
          }
        }
        return null;
      },
      resetInfoList: function() {
        var i, _i, _len, _ref;
        _ref = this.attributes.info_list;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.is_readed = true;
        }
        this.set('unread_num', 0);
        return null;
      },
      openApp: function(req_id) {
        var i, info_list, req, _i, _len;
        info_list = this.attributes.info_list;
        for (_i = 0, _len = info_list.length; _i < _len; _i++) {
          i = info_list[_i];
          if (i.id === req_id) {
            req = i;
          }
        }
        if (req) {
          ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'OPEN_APP', req.name, req.region, req.rid);
        }
        return null;
      },
      logout: function() {
        return session_model.logout({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'));
      }
    });
    return new HeaderModel();
  });

}).call(this);
