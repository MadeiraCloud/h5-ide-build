
/*
This file use for validate state.
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['Design', 'constant', 'i18n!nls/lang.js', 'jquery', 'underscore', 'MC'], function(Design, constant, lang) {
    var Helper, Message, Validator, checkFormat, __matchModule;
    Message = {};
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
        if (_.isArray(val) || _.isObject(val)) {
          return !!_.size(val);
        } else {
          return this.notnull(val) && this.notblank(val);
        }
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
      },
      buildError: function(tip, stateId, type) {
        return {
          level: constant.TA.ERROR,
          info: tip,
          uid: "format_" + type + ":" + stateId
        };
      },
      getModule: function() {
        var agentData, modRepo, modTag, modVersion, module, moduleDataObj;
        agentData = MC.common.other.canvasData.get('agent');
        modRepo = agentData.module.repo;
        modTag = agentData.module.tag;
        modVersion = modRepo + ':' + modTag;
        moduleDataObj = MC.data.state.module[modVersion];
        module = {};
        _.each(moduleDataObj, function(obj, key) {
          return _.extend(module, obj);
        });
        return module;
      },
      getCommand: function(module, moduleName) {
        return _.findWhere(module, {
          module: moduleName
        });
      }
    };
    __matchModule = function(state, data) {
      var cmd, error, module, name, param, tip, type, _ref;
      module = Helper.getModule();
      cmd = Helper.getCommand(module, state.module);
      if (cmd) {
        error = [];
        _ref = cmd.parameter;
        for (name in _ref) {
          param = _ref[name];
          if (param.required === true && !Validator.required(state.parameter[name])) {
            tip = sprintf(lang.ide.TA_MSG_ERROR_STATE_EDITOR_EMPTY_REQUIED_PARAMETER, data.name, data.stateId, name);
            type = 'requiredParameter';
            error.push(Helper.buildError(tip, data.stateId, type));
          }
        }
        return error;
      }
    };
    checkFormat = function(state, data) {
      return __matchModule(state, data);
    };
    return checkFormat;
  });

}).call(this);
