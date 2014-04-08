
/*
This file use for validate state.
 */

(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js'], function(CONST, MC, lang) {
    var Message, checkRefExist, takeplace, __componentTipMap, __findReference, __genError, __getComp, __getCompTip, __getRef, __isUid, __legalExist, __legalState, __refState;
    __componentTipMap = {
      'AWS.EC2.Instance': lang.ide.TA_MSG_ERROR_STATE_EDITOR_INEXISTENT_INSTANCE,
      'AWS.AutoScaling.LaunchConfiguration': lang.ide.TA_MSG_ERROR_STATE_EDITOR_INEXISTENT_ASG
    };
    __getCompTip = function(compType, str1, str2, str100) {
      var tip;
      tip = __componentTipMap[arguments[0]];
      return sprintf.apply(this, [].concat(tip, Array.prototype.slice.call(arguments, 1)));
    };
    __genError = function(tip, stateId) {
      return {
        level: CONST.TA.ERROR,
        info: tip,
        uid: "refinexsit:" + stateId
      };
    };
    __findReference = function(str) {
      var refObj, reg, resArr, ret;
      reg = CONST.REGEXP.stateEditorOriginReference;
      ret = [];
      while ((resArr = reg.exec(str)) !== null) {
        refObj = {
          attr: resArr[3],
          uid: resArr[2],
          ref: resArr[1],
          str: resArr[0]
        };
        ret.push(refObj);
      }
      return ret;
    };
    __isUid = function(uid) {
      CONST.REGEXP.uid.lastIndex = 0;
      return CONST.REGEXP.uid.test(uid);
    };
    __getComp = function(uid) {
      var component;
      component = MC.canvas_data.component[uid];
      return component;
    };
    __getRef = function(obj, data) {
      var key, ref, value;
      ref = [];
      if (_.isString(obj)) {
        if (obj.length === 0) {
          return [];
        }
        ref = ref.concat(__findReference(obj));
      } else {
        for (key in obj) {
          value = obj[key];
          ref = ref.concat(__getRef(value, data));
        }
      }
      return ref;
    };
    __legalExist = function(legalRef, ref) {
      return _.some(legalRef, function(legal) {
        return legal.ref === ref.ref;
      });
    };
    __legalState = function(ref) {
      var arr, comp, state, stateId;
      arr = ref.attr.split('.');
      state = arr[0];
      stateId = arr[1];
      comp = __getComp(ref.uid);
      if (comp && comp[state] && _.where(comp[state], {
        id: stateId
      }).length) {
        return true;
      } else {
        return false;
      }
    };
    __refState = function(ref) {
      return ref.attr.indexOf('.') !== -1;
    };
    Message = {
      illegal: function(ref) {
        var comp, refName;
        comp = __getComp(ref.uid);
        if (comp) {
          refName = "" + (comp.serverGroupName || comp.name) + "." + ref.attr;
        } else if (__isUid(ref.uid)) {
          refName = "unknown." + r.attr;
        } else {
          refName = ref.ref;
        }
        return refName;
      },
      state: function(ref) {
        var arr, refName;
        refName = Message.illegal(ref);
        arr = refName.split('.');
        if (arr[2].length === 42) {
          arr[2] = 'unknown';
        }
        return arr.join('.');
      }
    };
    checkRefExist = function(obj, data) {
      var error, legalRef, r, ref, refName, tip, _i, _len;
      ref = __getRef(obj, data);
      error = [];
      if (ref.length) {
        legalRef = MC.aws.aws.genAttrRefList(data.comp, MC.canvas_data.component);
      }
      for (_i = 0, _len = ref.length; _i < _len; _i++) {
        r = ref[_i];
        if (__refState(r)) {
          if (!__legalState(r)) {
            refName = Message.state(r);
          }
        } else {
          if (!__legalExist(legalRef, r)) {
            refName = Message.illegal(r);
          }
        }
        if (refName) {
          tip = __getCompTip(data.type, data.name, data.stateId, refName);
          error.push(__genError(tip, data.stateId));
        }
      }
      return error;
    };
    takeplace = function() {
      return null;
    };
    return checkRefExist;
  });

}).call(this);
