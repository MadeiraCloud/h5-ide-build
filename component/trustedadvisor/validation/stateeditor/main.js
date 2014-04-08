
/*
This file use for validate state.
 */

(function() {
  define(['./register', 'constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(validators, constant, MC, lang, resultVO) {
    var isStateValid, __checkState, __modifyUid;
    __modifyUid = function(result, uid, index) {
      var r, _i, _len, _ref;
      if (result) {
        if (!_.isArray(result)) {
          result = [result];
        }
        _ref = result || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          r.uid = "" + uid + ":" + index + ":" + r.uid;
        }
      }
      return result;
    };
    __checkState = function(state, data) {
      var index, result, results, validator;
      results = [];
      for (index in validators) {
        validator = validators[index];
        result = validator(state, data);
        result = __modifyUid(result, data.uid, index);
        results = results.concat(result);
      }
      return results;
    };
    isStateValid = function(uid) {
      var component, data, errs, states;
      component = MC.canvas_data.component[uid];
      if (!component || !component.state || component.index && component.index > 0) {
        return null;
      }
      states = component.state;
      data = {
        uid: uid,
        comp: component,
        type: component.type,
        name: component.name,
        stateId: null
      };
      errs = [];
      _.each(states, function(state, id) {
        errs = errs.concat(__checkState(state, _.extend({}, data, {
          stateId: id + 1
        })));
        return null;
      });
      if (!errs.length) {
        errs = null;
      }
      return errs;
    };
    return isStateValid;
  });

}).call(this);
