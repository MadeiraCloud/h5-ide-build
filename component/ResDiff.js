define('DiffTree',['constant'], function(constant) {
  var DiffTree;
  DiffTree = function(option) {
    var getType, isArray, typeofReal, _compare, _diffAry;
    if (!option) {
      option = {};
    }
    if (!option.filterAttrMap) {
      option.filterAttrMap = {
        '*.type': true,
        '*.uid': true,
        '*.index': true,
        '*.number': true,
        '*.serverGroupUid': true,
        '*.serverGroupName': true,
        '*.resource.UserData': true,
        '*.resource.PrivateIpAddressSet.n.AutoAssign': true,
        '*.resource.AssociatePublicIpAddress': true,
        '*.resource.KeyName': true,
        '*.resource.AssociationSet.n.RouteTableAssociationId': true,
        '*.resource.AssociationSet.n.NetworkAclAssociationId': true,
        '*.resource.BlockDeviceMapping': true,
        '*.resource.VolumeSize': true,
        '*.resource.GroupDescription': true,
        '*.resource.ListenerDescriptions.n.Listener.SSLCertificateId': true,
        '*.resource.Attachment.AttachmentId': true,
        'DBINSTANCE.resource.DBName': true,
        'DBINSTANCE.resource.AvailabilityZone': true,
        'DBINSTANCE.resource.Endpoint.Address': true,
        'DBINSTANCE.resource.ApplyImmediately': true,
        'DBINSTANCE.resource.Endpoint': true,
        'DBINSTANCE.resource.SourceDBInstanceIdentifierForPoint': true,
        'DBINSTANCE.resource.UseLatestRestorableTime': true,
        'ASG.resource.AutoScalingGroupARN': true,
        'ASG.resource.PolicyARN': true,
        '*.resource.Tags': true,
        '*.resource.adminPass': true,
        '*.resource.key_name': true,
        '*.resource.bootable': true,
        "TAG.resource.n.PropagateAtLaunch": true
      };
    }
    if (!option.noDiffArrayAttrMap) {
      option.noDiffArrayAttrMap = {
        '*.state': true,
        '*.resource.TerminationPolicies': true
      };
    }
    option.filterResMap = {};
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
            if (!_compare.call(this, a, b, a[i], b[j], '', null, [])) {
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
    _compare = function(pA, pB, a, b, key, path, resultJSON) {
      var aAry, aString, attrPath1, attrPath2, attrPathAry, attrPathStr, bAry, bString, changeType, diffAryResult, hasDiff, haveDiff, i, isEqual, keys, resShortType, resType, typeA, typeB, v, value1, value2, _i, _len;
      if (key === 'VPCZoneIdentifier') {
        aAry = a.split(',');
        bAry = b.split(',');
        aAry = _.map(aAry, function(ref) {
          return $.trim(ref);
        });
        bAry = _.map(bAry, function(ref) {
          return $.trim(ref);
        });
        a = aAry;
        b = bAry;
      }
      attrPathStr = '';
      if (path) {
        if (key) {
          path = path.concat([key]);
        }
        if (path.length === 2 && a && a.type) {
          path[1] = a.type;
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
          resType = path[1];
          resShortType = this.resTypeShortMap[resType];
          attrPathStr = attrPathAry.join('.');
          attrPath1 = resShortType + '.' + attrPathStr;
          attrPath2 = '*.' + attrPathStr;
          if (option.filterAttrMap[attrPath1] || option.filterAttrMap[attrPath2]) {
            return;
          }
          if (attrPath1 === "TAG.resource.n.Value" || attrPath1 === "ASGTAG.resource.n.Value" || attrPath2 === "TAG.resource.n.Value" || attrPath2 === "ASGTAG.resource.n.Value") {
            if ((pA && pA.Key === 'visualops') && (pB && pB.Key === 'visualops')) {
              return;
            }
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
          if (!attrPath2 || (attrPath2 && !option.noDiffArrayAttrMap[attrPath2])) {
            diffAryResult = {};
            if (a.length < b.length) {
              _diffAry.call(this, a, b);
            } else {
              _diffAry.call(this, b, a);
            }
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
          hasDiff = _compare.call(this, a, b, a && a[keys[i]], b && b[keys[i]], keys[i], path, resultJSON[key]);
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
        if (typeofReal(a) === 'number') {
          a = String(a);
        }
        if (typeofReal(b) === 'number') {
          b = String(b);
        }
        if (typeofReal(a) === 'boolean') {
          a = String(a);
        }
        if (typeofReal(b) === 'boolean') {
          b = String(b);
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
      _compare.call(this, json1, json2, json1, json2, 'result', [], resultJSON);
      return resultJSON.result;
    };
    return null;
  };
  DiffTree.prototype.resTypeShortMap = _.invert(constant.RESTYPE);
  return DiffTree;
});

define('component/resdiff/resDiffTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-res-diff\">\n	<p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.RESOURCES_APP_CHANGED", {hash:{},data:data}))
    + "</p>\n	<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.WHAT_HAVE_BEEN_CHANGED", {hash:{},data:data}))
    + "</h5>\n	<div class=\"scroll-wrap scroll-wrap-res-diff\" style=\"max-height: 350px;\">\n		<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<article class=\"content-wrap scroll-content\"></article>\n	</div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"group "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<div class=\"head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"count\">("
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></div>\n	<div class=\"content\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.resDiffGroup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"tree\"></ul>";
  };
TEMPLATE.resDiffTree=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "closed";
  }

  buffer += "<li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.closed), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	<div class=\"meta\">\n		<span class=\"type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</div>\n</li>";
  return buffer;
  };
TEMPLATE.resDiffTreeItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"name to\"> -></span><span class=\"name "
    + escapeExpression(((stack1 = (depth0 && depth0.type1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

  buffer += "<div class=\"meta\">\n	<span class=\"type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	<span class=\"name ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.value1), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.resDiffTreeMeta=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define('component/resdiff/prepare',['constant'], function(constant) {
  var Prepare, helper, prepareNode;
  helper = function(options) {
    return {
      getNodeMap: function(path) {
        var newComp, newCompAttr, oldComp, oldCompAttr;
        if (_.isString(path)) {
          path = path.split('.');
        }
        oldComp = options.oldAppJSON.component;
        newComp = options.newAppJSON.component;
        oldCompAttr = _.extend(oldComp, {});
        newCompAttr = _.extend(newComp, {});
        _.each(path, function(attr) {
          if (oldCompAttr) {
            if (_.isUndefined(oldCompAttr[attr])) {
              oldCompAttr = void 0;
            } else {
              oldCompAttr = oldCompAttr[attr];
            }
          }
          if (newCompAttr) {
            if (_.isUndefined(newCompAttr[attr])) {
              newCompAttr = void 0;
            } else {
              newCompAttr = newCompAttr[attr];
            }
          }
          return null;
        });
        return {
          oldAttr: oldCompAttr,
          newAttr: newCompAttr
        };
      },
      genValue: function(type, oldValue, newValue) {
        var result;
        result = '';
        oldValue = String(oldValue);
        newValue = String(newValue);
        if (type === 'changed') {
          if (!oldValue) {
            oldValue = 'none';
          }
          if (!newValue) {
            newValue = 'none';
          }
        }
        if (oldValue) {
          result = oldValue;
          if (newValue && oldValue !== newValue) {
            result += ' -> ' + newValue;
          }
        } else {
          result = newValue;
        }
        return result;
      },
      getNodeData: function(path) {
        return this.getNewest(this.getNodeMap(path));
      },
      getNewest: function(attrMap) {
        return attrMap.newAttr || attrMap.oldAttr;
      },
      pluralToSingular: function(str) {
        return str.slice(0, -1);
      },
      setToElement: function(str) {
        return str.slice(0, -3);
      },
      replaceArrayIndex: function(path, data) {
        var childNode, component, componentMap, deviceObj, err, parentKey, pluralKeys, type;
        componentMap = this.getNodeMap(path[0]);
        component = this.getNewest(componentMap);
        type = component.type;
        parentKey = path[path.length - 2];
        childNode = data.originValue;
        pluralKeys = ['Dimensions', 'AlarmActions', 'Instances', 'Attachments', 'AvailabilityZones', 'LoadBalancerNames', 'TerminationPolicies', 'ListenerDescriptions', 'SecurityGroups', 'Subnets', 'Routes'];
        switch (parentKey) {
          case 'BlockDeviceMapping':
            deviceObj = childNode.DeviceName;
            data.key = 'Device';
            if (deviceObj) {
              if (_.isObject(deviceObj)) {
                data.key = this.genValue(deviceObj.type, deviceObj.__old__, deviceObj.__new__);
              } else {
                data.key = deviceObj;
              }
            }
            break;
          case 'GroupSet':
            data.key = 'SecurityGroup';
            break;
          case 'IpPermissions':
          case 'IpPermissionsEgress':
          case 'EntrySet':
            data.key = 'Rule';
            break;
          case 'AssociationSet':
          case 'AttachmentSet':
          case 'PrivateIpAddressSet':
            data.key = this.setToElement(parentKey);
            break;
          case 'NotificationType':
            data.key = 'Type';
            break;
          case 'VPCZoneIdentifier':
            data.key = 'Subnet';
            break;
          case 'RouteSet':
            data.key = 'Route';
            break;
          case 'SubnetIds':
            data.key = 'Subnet';
            break;
          case 'OptionSettings':
            data.key = 'Option';
            break;
          case 'Options':
            data.key = 'Option';
            break;
          case 'ResourceIds':
            data.key = 'Id';
        }
        if (__indexOf.call(pluralKeys, parentKey) >= 0) {
          data.key = this.pluralToSingular(parentKey);
        }
        if (path.length === 1) {
          data.key = constant.RESNAME[data.key] || data.key;
        }
        try {
          if (data.key === 'MasterUserPassword' && data.value) {
            if (data.value.type === 'changed') {
              data.value.__new__ = data.value.__new__.replace(/./g, '*');
            }
          }
        } catch (_error) {
          err = _error;
          null;
        }
        return data;
      }
    };
  };
  prepareNode = function(path, data) {
    var attrObj, compAttrObj, compUID, needName, newAttr, newCompName, newRef, newValue, oldAttr, oldCompName, oldRef, oldValue, valueRef, _getRef;
    _getRef = function(value, needName) {
      var refMatchAry, refName, refRegex, refUID;
      if (_.isString(value) && value.indexOf('@{') === 0) {
        refRegex = /@\{.*\}/g;
        refMatchAry = value.match(refRegex);
        if (refMatchAry && refMatchAry.length) {
          refName = value.slice(2, value.length - 1);
          refUID = refName.split('.')[0];
          if (needName) {
            if (refUID) {
              return "" + refUID + ".name";
            }
          } else {
            return refName;
          }
        }
      }
      return null;
    };
    if (_.isObject(data.value)) {
      newValue = data.value;
      needName = true;
      if (data.key) {
        if (data.key.substr(data.key.lastIndexOf('Id')) === 'Id') {
          needName = false;
        }
      }
      oldRef = _getRef(newValue.__old__, needName);
      newRef = _getRef(newValue.__new__, needName);
      if (oldRef) {
        newValue.__old__ = this.h.getNodeMap(oldRef).oldAttr;
      }
      if (newRef) {
        newValue.__new__ = this.h.getNodeMap(newRef).newAttr;
      }
      data = this.h.replaceArrayIndex(path, data);
      data.value = {
        type: newValue.type,
        old: newValue.__old__,
        "new": newValue.__new__
      };
    } else {
      compAttrObj = this.h.getNodeMap(path);
      oldAttr = compAttrObj.oldAttr;
      newAttr = compAttrObj.newAttr;
      valueRef = _getRef(data.value);
      if (valueRef) {
        attrObj = this.h.getNodeMap(valueRef);
        oldValue = attrObj.oldAttr;
        newValue = attrObj.newAttr;
        data.value = oldValue || newValue;
      }
      if (path.length === 1) {
        compUID = path[0];
        oldCompName = (oldAttr ? oldAttr.name : void 0) || '';
        newCompName = (newAttr ? newAttr.name : void 0) || '';
        if (oldAttr) {
          data.key = oldAttr.type;
        } else {
          data.key = newAttr.type;
        }
        data.value = this.h.genValue(null, oldCompName, newCompName);
      }
      data = this.h.replaceArrayIndex(path, data);
    }
    if (path.length === 2) {
      if (path[1] === 'resource') {
        data.skip = true;
      }
      if (path[1] === 'state') {
        delete data.key;
      }
    }
    return data;
  };
  Prepare = function(options) {
    _.extend(this, options);
    this.h = helper(options);
    return this;
  };
  Prepare.prototype.node = prepareNode;
  return Prepare;
});

define('ResDiff',['UI.modalplus', 'DiffTree', 'component/resdiff/resDiffTpl', 'component/resdiff/prepare', 'constant', 'i18n!/nls/lang.js', 'ApiRequest'], function(modalplus, DiffTree, template, Prepare, constant, lang, ApiRequest) {
  return Backbone.View.extend({
    className: 'res_diff_tree',
    tagName: 'section',
    initialize: function(option) {
      this.oldAppJSON = option.old;
      this.newAppJSON = option["new"];
      if (option.callback) {
        this.callback = option.callback;
      }
      this.prepare = new Prepare({
        oldAppJSON: this.oldAppJSON,
        newAppJSON: this.newAppJSON
      });
      return this._genDiffInfo(this.oldAppJSON.component, this.newAppJSON.component);
    },
    events: {
      'click .item .type': '_toggleTab',
      'click .head': '_toggleItem'
    },
    _toggleItem: function(e) {
      var $target;
      $target = $(e.currentTarget).closest('.group');
      return $target.toggleClass('closed');
    },
    _toggleTab: function(e) {
      var $target;
      $target = $(e.currentTarget).closest('.item');
      if ($target.hasClass('end')) {
        return;
      }
      return $target.toggleClass('closed');
    },
    render: function() {
      var okText, options, that;
      that = this;
      okText = lang.PROP.APP_DIFF_CHANGE_CONFIRM;
      options = {
        template: template.frame(),
        title: lang.IDE.TITLE_APP_CHANGES,
        disableClose: true,
        hideClose: true,
        confirm: {
          text: okText
        },
        width: '608px',
        compact: false,
        preventClose: true
      };
      this.modal = new modalplus(options);
      this.modal.on('confirm', function() {
        var $confirmBtn, promise;
        $confirmBtn = that.modal.tpl.find('.modal-confirm');
        if (that.callback) {
          $confirmBtn.addClass('disabled');
          $confirmBtn.text('Saving...');
          promise = that.callback(true);
          return promise.then(function() {
            return that.modal.close();
          }, function(data) {
            $confirmBtn.text(okText);
            $confirmBtn.removeClass('disabled');
            if (data.error === ApiRequest.Errors.AppConflict) {
              return notification('error', lang.IDE.WARNNING_APP_CHANGE_BY_OTHER_USER);
            } else {
              return notification('error', data.msg);
            }
          });
        } else {
          return that.modal.close();
        }
      }, this);
      this.modal.on('cancel', function() {
        if (that.callback) {
          that.callback(false);
        }
        return that.modal.close();
      }, this);
      this.modal.tpl.find('article').html(this.$el);
      this._genResGroup(this.$el);
      return this.modal.resize();
    },
    _genDiffInfo: function(oldComps, newComps) {
      var diffTree, ignoreDiffMap, that, unionNewComps, unionOldComps;
      that = this;
      that.addedComps = {};
      that.removedComps = {};
      that.modifiedComps = {};
      unionOldComps = {};
      unionNewComps = {};
      ignoreDiffMap = {};
      _.each(oldComps, function(comp, uid) {
        if (comp && !ignoreDiffMap[comp.type]) {
          if (newComps[uid]) {
            unionOldComps[uid] = oldComps[uid];
            unionNewComps[uid] = newComps[uid];
          } else {
            that.removedComps[uid] = oldComps[uid];
          }
          return null;
        }
      });
      _.each(_.keys(newComps), function(uid) {
        if (!oldComps[uid]) {
          if (newComps[uid] && !ignoreDiffMap[newComps[uid].type]) {
            that.addedComps[uid] = newComps[uid];
          }
        }
        return null;
      });
      diffTree = new DiffTree();
      that.modifiedComps = diffTree.compare(unionOldComps, unionNewComps);
      if (!that.modifiedComps) {
        return that.modifiedComps = {};
      }
    },
    _genResGroup: function($containerDom) {
      var $group, compCount, data, groupData, that, _i, _len, _results;
      that = this;
      groupData = [
        {
          title: lang.TOOLBAR.POP_DIFF_NEW_RES,
          diffComps: that.addedComps,
          closed: true,
          type: 'added',
          needDiff: false
        }, {
          title: lang.TOOLBAR.POP_DIFF_REMOVED_RES,
          diffComps: that.removedComps,
          closed: true,
          type: 'removed',
          needDiff: false
        }, {
          title: lang.TOOLBAR.POP_DIFF_MODIFY_RES,
          diffComps: that.modifiedComps,
          closed: false,
          type: 'modified',
          needDiff: true
        }
      ];
      _results = [];
      for (_i = 0, _len = groupData.length; _i < _len; _i++) {
        data = groupData[_i];
        compCount = _.keys(data.diffComps).length;
        if (compCount) {
          $group = $(template.resDiffGroup({
            type: data.type,
            title: data.title,
            count: compCount
          })).appendTo($containerDom);
          _results.push(this._genResTree($group.find('.content'), data.diffComps, data.closed, data.needDiff));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    _genResTree: function($container, diffComps, closed, needDiff) {
      var that, _genTree;
      that = this;
      _genTree = function(value, key, path, $parent) {
        var $diffTree, $treeItem, changeType, data, nextPath, type, type1, value1, __value, _key, _results, _value;
        if (_.isObject(value)) {
          if (_.isUndefined(value.__new__) && _.isUndefined(value.__old__)) {
            $diffTree = $(template.resDiffTree({})).appendTo($parent);
            _results = [];
            for (_key in value) {
              _value = value[_key];
              __value = _.isObject(_value) ? '' : _value;
              nextPath = path.concat([_key]);
              data = this.prepare.node(nextPath, {
                key: _key,
                value: __value,
                originValue: _value
              });
              if (data.key) {
                if (data.skip) {
                  $treeItem = $parent;
                  $diffTree.remove();
                } else {
                  $treeItem = $(template.resDiffTreeItem({
                    key: data.key,
                    value: data.value,
                    closed: closed
                  })).appendTo($diffTree);
                  if (!_.isObject(_value)) {
                    $treeItem.addClass('end');
                  }
                }
                if (_.isArray(_value) && _value.length === 0) {
                  _results.push($treeItem.remove());
                } else {
                  _results.push(_genTree.call(that, _value, _key, nextPath, $treeItem));
                }
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            changeType = value.type;
            data = this.prepare.node(path, {
              key: key,
              value: value
            });
            if (data.key) {
              type = value1 = type1 = '';
              if (_.isObject(data.value)) {
                if (data.value.type === 'added') {
                  value = data.value["new"];
                  type = 'new';
                } else if (data.value.type === 'removed') {
                  value = data.value.old;
                  type = 'old';
                } else if (data.value.type === 'changed') {
                  value = data.value.old;
                  value1 = data.value["new"];
                  type = 'old';
                  type1 = 'new';
                }
              } else {
                value = data.value;
              }
              $parent.html(template.resDiffTreeMeta({
                key: data.key,
                value: value,
                type: type,
                value1: value1,
                type1: type1,
                closed: closed
              }));
              $parent.addClass('end');
              return $parent.addClass(changeType);
            } else {
              return $parent.remove();
            }
          }
        }
      };
      return _genTree.call(that, diffComps, null, [], $container);
    },
    getRelatedInstanceGroupUID: function(originComps, comp) {
      var eniComp, eniRef, eniUID, instanceComp, instanceRef, instanceUID, resType, that;
      that = this;
      resType = comp.type;
      if (resType === constant.RESTYPE.INSTANCE) {
        return comp.serverGroupUid;
      }
      if (resType === constant.RESTYPE.ENI) {
        instanceRef = comp.resource.Attachment.InstanceId;
      }
      if (instanceRef) {
        instanceUID = MC.extractID(instanceRef);
        instanceComp = originComps[instanceUID];
        if (instanceComp) {
          return instanceComp.serverGroupUid;
        }
      }
      if (resType === constant.RESTYPE.VOL) {
        instanceRef = comp.resource.AttachmentSet.InstanceId;
      }
      if (instanceRef) {
        instanceUID = MC.extractID(instanceRef);
        instanceComp = originComps[instanceUID];
        if (instanceComp) {
          return instanceComp.serverGroupUid;
        }
      }
      if (resType === constant.RESTYPE.EIP) {
        eniRef = comp.resource.NetworkInterfaceId;
      }
      if (eniRef) {
        eniUID = MC.extractID(eniRef);
        eniComp = originComps[eniUID];
        if (eniComp) {
          return that.getRelatedInstanceGroupUID(originComps, eniComp);
        }
      }
      return '';
    },
    renderAppUpdateView: function() {
      this._genResGroup(this.$el);
      return this.$el;
    },
    getDiffInfo: function() {
      var appModifiedComps, diffTree, hasCompChange, hasLayoutChange, hasStateChange, layoutModifiedComps, newAppJSON, oldAppJSON, onlyStateChange, that;
      that = this;
      oldAppJSON = _.extend({}, that.oldAppJSON);
      newAppJSON = _.extend({}, that.newAppJSON);
      hasCompChange = false;
      if (_.size(that.addedComps) || _.size(that.removedComps) || _.size(that.modifiedComps)) {
        hasCompChange = true;
      }
      diffTree = new DiffTree();
      layoutModifiedComps = diffTree.compare(oldAppJSON.layout, newAppJSON.layout);
      hasLayoutChange = false;
      if (_.size(layoutModifiedComps)) {
        hasLayoutChange = true;
      }
      hasStateChange = false;
      onlyStateChange = true;
      _.each(that.modifiedComps, function(comp, uid) {
        if (comp.state) {
          hasStateChange = true;
        }
        if (_.size(comp) === 1 && comp.state) {
          delete that.modifiedComps[uid];
        } else {
          onlyStateChange = false;
        }
        if (comp && comp.state) {
          delete comp.state;
        }
        return null;
      });
      if (onlyStateChange && _.size(that.addedComps) === 0 && _.size(that.removedComps) === 0) {
        hasCompChange = false;
      }
      delete oldAppJSON.component;
      delete oldAppJSON.layout;
      delete newAppJSON.component;
      delete newAppJSON.layout;
      appModifiedComps = diffTree.compare(oldAppJSON, newAppJSON);
      if (_.size(appModifiedComps) > 0) {
        hasLayoutChange = true;
      }
      return {
        compChange: hasCompChange,
        layoutChange: hasLayoutChange,
        stateChange: hasStateChange
      };
    },
    getChangeInfo: function() {
      var hasResChange, needUpdateLayout, newComps, oldComps, that;
      that = this;
      hasResChange = false;
      if (_.size(that.addedComps) || _.size(that.removedComps) || _.size(that.modifiedComps)) {
        hasResChange = true;
      }
      needUpdateLayout = _.some(that.addedComps, function(comp) {
        return that.newAppJSON.layout[comp.uid];
      });
      newComps = that.newAppJSON.component;
      oldComps = that.oldAppJSON.component;
      _.each(that.modifiedComps, function(comp, uid) {
        var originComp, _ref;
        originComp = oldComps[uid];
        if (originComp && ((_ref = originComp.type) === constant.RESTYPE.ENI || _ref === constant.RESTYPE.EIP || _ref === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.VOL)) {
          if (originComp && originComp.number > 1) {
            needUpdateLayout = true;
          }
        }
        return null;
      });
      _.each(that.modifiedComps, function(comp, uid) {
        var instanceAry;
        if (oldComps[uid] && oldComps[uid].type === constant.RESTYPE.ELB) {
          if (comp && comp.resource && comp.resource.Instances) {
            instanceAry = [];
            _.map(comp.resource.Instances, function(refObj) {
              var _refObj;
              _refObj = refObj.InstanceId;
              if (_refObj) {
                if (_refObj.__old__) {
                  instanceAry.push(_refObj.__old__);
                }
                if (_refObj.__new__) {
                  return instanceAry.push(_refObj.__new__);
                }
              }
            });
            _.each(instanceAry, function(uidRef) {
              uid = MC.extractID(uidRef);
              if (oldComps[uid] && oldComps[uid].number > 1) {
                needUpdateLayout = true;
              }
              return null;
            });
          }
        }
        return null;
      });
      _.each(that.modifiedComps, function(comp, uid) {
        if (newComps[uid] && newComps[uid].type === constant.RESTYPE.ASG) {
          if (comp && comp.resource && comp.resource.AvailabilityZones) {
            needUpdateLayout = true;
          }
          if (comp && comp.resource && comp.resource.VPCZoneIdentifier) {
            needUpdateLayout = true;
          }
        }
        return null;
      });
      _.each(that.removedComps, function(comp) {
        var originComp, serverGroupUid, _ref;
        if ((_ref = comp.type) === constant.RESTYPE.ENI || _ref === constant.RESTYPE.EIP || _ref === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.VOL) {
          serverGroupUid = that.getRelatedInstanceGroupUID(oldComps, comp);
          originComp = oldComps[serverGroupUid];
          if (originComp && originComp.number > 1) {
            needUpdateLayout = true;
          }
        }
        return null;
      });
      return {
        hasResChange: hasResChange,
        needUpdateLayout: needUpdateLayout
      };
    }
  });
});


define("component/ResDiff", function(){});
