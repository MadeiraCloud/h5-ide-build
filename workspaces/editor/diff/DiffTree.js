(function() {
  define([], function() {
    var DiffTree;
    DiffTree = function(option) {
      var getType, isArray, typeofReal, _compare, _diffAry;
      if (!option) {
        option = {};
      }
      option.filterMap = {
        'resource.PrivateIpAddressSet.n.AutoAssign': true,
        'resource.AssociatePublicIpAddress': true
      };
      isArray = function(value) {
        return value && typeof value === 'object' && value.constructor === Array;
      };
      typeofReal = function(value) {
        if (isArray(value)) {
          return 'array';
        } else {
          if (value === null) {
            return 'null';
          } else {
            return typeof value;
          }
        }
      };
      getType = function(value) {
        if (typeA === 'object' || typeA === 'array') {
          return '';
        } else {
          return String(a) + ' ';
        }
      };
      _diffAry = function(a, b) {
        var i, j, tmp, v, _i, _j, _len, _ref, _ref1, _results, _results1;
        _ref1 = (function() {
          _results1 = [];
          for (var _j = 0, _ref = a.length; 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
          return _results1;
        }).apply(this);
        _results = [];
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          v = _ref1[i];
          _results.push((function() {
            var _k, _l, _len1, _ref2, _ref3, _results2, _results3;
            _ref3 = (function() {
              _results3 = [];
              for (var _l = 0, _ref2 = b.length; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; 0 <= _ref2 ? _l++ : _l--){ _results3.push(_l); }
              return _results3;
            }).apply(this);
            _results2 = [];
            for (j = _k = 0, _len1 = _ref3.length; _k < _len1; j = ++_k) {
              v = _ref3[j];
              if (!_compare.call(this, a[i], b[j], '', null, [])) {
                tmp = b[i];
                b[i] = b[j];
                _results2.push(b[j] = tmp);
              } else {
                _results2.push(void 0);
              }
            }
            return _results2;
          }).call(this));
        }
        return _results;
      };
      _compare = function(a, b, key, path, resultJSON) {
        var aString, attrPath, attrPathAry, bString, changeType, diffAryResult, hasDiff, haveDiff, i, isEqual, keys, typeA, typeB, v, value1, value2, _i, _len;
        if (path) {
          if (key) {
            path = path.concat([key]);
          }
          if (path.length > 2) {
            attrPathAry = path.slice(2);
            attrPathAry = _.map(attrPathAry, function(path) {
              var num;
              num = Number(path);
              if (num >= 0) {
                return 'n';
              }
              return path;
            });
            attrPath = attrPathAry.join('.');
            if (option.filterMap[attrPath]) {
              return;
            }
          }
        }
        if (!a && !b) {
          return;
        }
        haveDiff = false;
        typeA = typeofReal(a);
        typeB = typeofReal(b);
        aString = typeA === 'object' || typeA === 'array' ? '' : String(a) + '';
        bString = typeB === 'object' || typeB === 'array' ? '' : String(b) + '';
        if (!aString) {
          aString = '';
        }
        if (!bString) {
          bString = '';
        }
        changeType = value1 = value2 = '';
        if (a === void 0) {
          changeType = 'added';
          value2 = bString;
        } else if (b === void 0) {
          changeType = 'removed';
          value1 = aString;
        } else if (typeA !== typeB || (typeA !== 'object' && typeA !== 'array' && a !== b)) {
          changeType = 'changed';
          value1 = aString;
          value2 = bString;
        } else {
          value1 = aString;
        }
        resultJSON[key] = {};
        if (typeA === 'object' || typeA === 'array' || typeB === 'object' || typeB === 'array') {
          if (typeA === 'array' && typeB === 'array') {
            diffAryResult = {};
            if (a.length < b.length) {
              _diffAry.call(this, a, b);
            } else {
              _diffAry.call(this, b, a);
            }
          }
          keys = [];
          for (v in a) {
            keys.push(v);
          }
          for (v in b) {
            keys.push(v);
          }
          keys.sort();
          isEqual = true;
          for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
            v = keys[i];
            if (keys[i] === keys[i - 1]) {
              continue;
            }
            hasDiff = _compare.call(this, a && a[keys[i]], b && b[keys[i]], keys[i], path, resultJSON[key]);
            if (hasDiff) {
              isEqual = false;
            }
          }
          haveDiff = !isEqual;
          if (isEqual) {
            delete resultJSON[key];
          }
        } else {
          if (path) {
            path.length = 0;
          }
          if (a !== b) {
            haveDiff = true;
            resultJSON[key] = {
              type: changeType,
              __old__: a,
              __new__: b
            };
          } else {
            delete resultJSON[key];
          }
        }
        return haveDiff;
      };
      this.compare = function(json1, json2) {
        var resultJSON;
        resultJSON = {};
        _compare.call(this, json1, json2, 'result', [], resultJSON);
        return resultJSON.result;
      };
      return null;
    };
    return DiffTree;
  });

}).call(this);
