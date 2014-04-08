(function() {
  define(['constant', 'event', 'ta_conf', './validation/main', './validation/result_vo', 'jquery', 'underscore'], function(constant, ide_event, config, validation_main, resultVO) {
    var validAll, validComp, validRun, _asyncCallback, _genSyncFinish, _getFilename, _handleException, _init, _isAsync, _isGlobal, _pushResult, _syncStart, _validAsync, _validComponents, _validGlobal, _validState;
    _init = function() {
      return resultVO.reset();
    };
    _isGlobal = function(filename, method) {
      return config.globalList[filename] && _.contains(config.globalList[filename], method);
    };
    _isAsync = function(filename, method) {
      return config.asyncList[filename] && _.contains(config.asyncList[filename], method);
    };
    _getFilename = function(componentType) {
      var filename;
      if (config.componentTypeToFileMap[componentType]) {
        return config.componentTypeToFileMap[componentType];
      }
      filename = _.last(componentType.split('.'));
      filename = filename.toLowerCase();
      return [filename];
    };
    _pushResult = function(result, method, filename, uid) {
      return resultVO.set("" + filename + "." + method, result, uid);
    };
    _syncStart = function() {
      return ide_event.trigger(ide_event.TA_SYNC_START);
    };
    _genSyncFinish = function(times) {
      return _.after(times, function() {
        ide_event.trigger(ide_event.TA_SYNC_FINISH);
        return console.log(resultVO.result());
      });
    };
    _asyncCallback = function(method, filename, done) {
      var hasRun;
      hasRun = false;
      _.delay(function() {
        if (!hasRun) {
          hasRun = true;
          _pushResult(null, method, filename);
          return done();
        }
      }, config.syncTimeout);
      return function(result) {
        if (!hasRun) {
          hasRun = true;
          _pushResult(result, method, filename);
          return done();
        }
      };
    };
    _handleException = function(err) {
      return console.log('TA Exception: ', err);
    };
    _validGlobal = function(env) {
      _.each(config.globalList, function(methods, filename) {
        return _.each(methods, function(method) {
          var err, result;
          try {
            if (method.indexOf('~') === 0) {
              if (env === 'all') {
                method = method.slice(1);
              } else {
                return;
              }
            }
            result = validation_main[filename][method]();
            return _pushResult(result, method, filename);
          } catch (_error) {
            err = _error;
            return _handleException(err);
          }
        });
      });
      return null;
    };
    _validComponents = function() {
      var components;
      components = MC.canvas_data.component;
      _.each(components, function(component, uid) {
        var err, filenames;
        filenames = _getFilename(component.type);
        _.each(filenames, function(filename) {
          return _.each(validation_main[filename], function(func, method) {
            var err, result;
            if (!_isGlobal(filename, method) && !_isAsync(filename, method)) {
              try {
                result = validation_main[filename][method](uid);
                return _pushResult(result, method, filename, uid);
              } catch (_error) {
                err = _error;
                return _handleException(err);
              }
            }
          });
        });
        try {
          return _validState(validation_main, uid);
        } catch (_error) {
          err = _error;
          return _handleException(err);
        }
      });
      return null;
    };
    _validState = function(validation_main, uid) {
      var result;
      if (Design.instance().get('agent').enabled === true) {
        result = validation_main.stateEditor(uid);
        _pushResult(result, 'stateEditor', 'stateEditor', uid);
      }
      return null;
    };
    _validAsync = function() {
      var finishTimes, syncFinish;
      finishTimes = _.reduce(config.asyncList, function(memo, arr) {
        console.log(memo, arr);
        return memo + arr.length;
      }, 0);
      _syncStart();
      syncFinish = _genSyncFinish(finishTimes);
      _.each(config.asyncList, function(methods, filename) {
        return _.each(methods, function(method) {
          var err, result;
          try {
            result = validation_main[filename][method](_asyncCallback(method, filename, syncFinish));
            return _pushResult(result, method, filename);
          } catch (_error) {
            err = _error;
            return _handleException(err);
          }
        });
      });
      return null;
    };
    validComp = function(type) {
      var args, err, filename, func, method, result, temp;
      try {
        MC.ta.resultVO = resultVO;
        temp = type.split('.');
        filename = temp[0];
        method = temp[1];
        func = validation_main[filename][method];
        if (_.isFunction(func)) {
          args = Array.prototype.slice.call(arguments, 1);
          result = func.apply(validation_main[filename], args);
          resultVO.set(type, result);
          return result;
        } else {
          console.log('func not found');
        }
      } catch (_error) {
        err = _error;
        _handleException(err);
      }
      return null;
    };
    validRun = function() {
      _init();
      _validComponents();
      _validGlobal('run');
      _validAsync();
      return resultVO.result();
    };
    validAll = function() {
      _init();
      _validComponents();
      _validGlobal('all');
      return resultVO.result();
    };
    return {
      validComp: validComp,
      validAll: validAll,
      validRun: validRun,
      stateEditor: validation_main.stateEditor
    };
  });

}).call(this);
