(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['Design', 'validation', 'constant', 'i18n!nls/lang.js', 'jquery', 'underscore', 'MC', 'UI.errortip'], function(Design, validationTA, constant, lang) {
    var Action, Helper, Message, Setup, TA, Validator, validate;
    TA = validationTA.state;
    Message = {};
    Setup = {
      before: function() {},
      after: function() {}
    };
    Validator = {
      command: function(val, param, elem, represent) {
        var map;
        val = Helper.trim(val);
        map = param.dataMap;
        if (!this.required(val)) {
          return 'Command name is required.';
        }
        if (!this.stateAllowed(val, map)) {
          return "Command \"" + val + "\" is not supported.";
        }
        return null;
      },
      parameter: function(val, param, elem, represent) {
        var result, validateList;
        validateList = ['required', 'type'];
        result = null;
        if (this[param.constraint.type]) {
          result = this[param.constraint.type](val, param, elem, represent);
        }
        if (!result) {
          result = this.componentExist(val);
        }
        return result;
      },
      dict: function(val, param, elem, represent) {
        var result, subType;
        subType = param.subType;
        result = null;
        if (param.constraint.required && subType === 'key' && !this.required(val)) {
          result = 'dict key is required';
        }
        return result;
      },
      array: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'array value is required';
        }
        return result;
      },
      line: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'line value is required';
        }
        return result;
      },
      text: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'text value is required';
        } else {
          result = this.componentExist(val);
        }
        return result;
      },
      bool: function(val, param, elem, represent) {
        var result;
        result = null;
        if (param.constraint.required && !this.required(val)) {
          result = 'line value is required';
        } else if (!(this.isBool(val) || this.isStringBool(val, true))) {
          result = "invalid boolean value: \"" + val + "\"";
        }
        return result;
      },
      componentExist: function(val) {
        var inexsitCount, ref, refs, _i, _len;
        refs = Helper.getRefName(val);
        inexsitCount = 0;
        for (_i = 0, _len = refs.length; _i < _len; _i++) {
          ref = refs[_i];
          if (!Helper.nameExist(ref.name)) {
            inexsitCount++;
          }
        }
        if (inexsitCount) {
          return "Reference 'unknown' doesn't exist.";
        }
        return null;
      },
      required: function(val) {
        return this.notnull(val) && this.notblank(val);
      },
      notnull: function(val) {
        return val.length > 0;
      },
      notblank: function(val) {
        return 'string' === typeof val && '' !== val.replace(/^\s+/g, '').replace(/\s+$/g, '');
      },
      isBool: function(val) {
        return _.isBoolean(val);
      },
      isStringBool: function(val, allowEmpty) {
        return /^(true|false)$/i.test(val || allowEmpty && val === '');
      },
      stateAllowed: function(val, map) {
        return __indexOf.call(Helper.getAllowCommands(map), val) >= 0;
      }
    };
    Helper = {
      getAllowCommands: function(map) {
        return _.keys(map);
      },
      trim: function(val) {
        return $.trim(val);
      },
      nameExist: function(name) {
        var allCompData, component, uid;
        allCompData = Design.instance().serialize().component;
        for (uid in allCompData) {
          component = allCompData[uid];
          if (component.name === name) {
            return true;
          }
        }
        return false;
      },
      getRefName: function(val) {
        var reg, resArr, ret;
        reg = constant.REGEXP.stateEditorOriginReference;
        ret = [];
        while ((resArr = reg.exec(val)) !== null) {
          ret.push({
            name: resArr[1],
            ref: resArr[0]
          });
        }
        return ret;
      }
    };
    Action = {
      displayError: function(msg, elem, represent) {
        if (!errortip.hasError(elem)) {
          errortip.createError(msg, elem);
          return errortip.createError(msg, represent);
        } else {
          errortip.changeError(msg, elem);
          return errortip.changeError(msg, represent);
        }
      },
      clearError: function(elem, represent) {
        if (errortip.hasError(elem)) {
          errortip.removeError(elem);
          return errortip.removeError(represent);
        }
      }
    };
    validate = function(value, param, elem, represent) {
      var res;
      res = Validator[param.type](value, param, elem, represent);
      if (res) {
        Action.displayError(res, elem, represent);
      } else {
        Action.clearError(elem, represent);
      }
      return res;
    };
    _.extend(validate, Setup);
    return validate;
  });

}).call(this);
