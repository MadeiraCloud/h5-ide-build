(function() {
  define(['event', 'MC', 'Design', 'underscore'], function(ide_event, MC, Design) {
    var reset, result, set, _add, _del, _exist, _genKey, _genRes, _hash, _replace;
    _hash = function(str) {
      var hash;
      hash = 0;
      if (str.length === 0) {
        return hash;
      }
      _.each(str, function(v, i) {
        var char;
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
        return null;
      });
      return "k" + hash;
    };
    _genKey = function(key, uid) {
      return _hash("" + key + "|" + uid);
    };
    _genRes = function(key, result, uid) {
      uid = uid || result && result.uid || null;
      return _.extend({}, result, {
        key: _genKey(key, uid),
        type: key
      });
    };
    _del = function(key) {
      var delete_obj;
      delete_obj = {};
      _.map(MC.ta.list, function(obj) {
        if (obj.key === key) {
          delete_obj = obj;
        }
        return null;
      });
      if (delete_obj) {
        MC.ta.list = _.without(MC.ta.list, delete_obj);
        if (delete_obj.level) {
          ide_event.trigger(ide_event.UPDATE_TA_MODAL, 'delete', delete_obj.level);
        }
      }
      return null;
    };
    _add = function(result) {
      MC.ta.list.push(result);
      return ide_event.trigger(ide_event.UPDATE_TA_MODAL, 'add', result.level);
    };
    _replace = function(result) {
      MC.ta.list = _.map(MC.ta.list, function(item) {
        if (item.key === result.key) {
          return result;
        }
        return item;
      });
      return MC.ta.list;
    };
    _exist = function(key) {
      return _.contains(_.pluck(MC.ta.list, 'key'), key);
    };
    set = function(key, result, uid) {
      var k, res;
      res = _genRes(key, result, uid);
      k = res.key;
      if (_.isArray(result)) {
        _.each(result, function(r) {
          if (r) {
            return set(key, r, r.uid);
          }
        });
      } else if (result) {
        if (!_exist(k)) {
          _add(res);
        } else {
          _replace(res);
        }
      } else {
        _del(k);
      }
      return MC.ta.list;
    };
    reset = function() {
      MC.ta.list = [];
      MC.canvas_data = Design.instance().serialize();
      return null;
    };
    result = function() {
      return MC.ta.list;
    };
    return {
      set: set,
      reset: reset,
      result: result
    };
  });

}).call(this);
