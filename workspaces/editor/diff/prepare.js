(function() {
  define(['constant'], function(constant) {
    var Prepare, helper, prepareNode;
    helper = function(options) {
      return {
        getNodeMap: function(path) {
          var newComp, newCompAttr, oldComp, oldCompAttr, retVal;
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
                return newCompAttr = void 0;
              } else {
                return newCompAttr = newCompAttr[attr];
              }
            }
          });
          return retVal = {
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
          var childNode, component, componentMap, deviceObj, parentKey, type;
          componentMap = this.getNodeMap(path[0]);
          component = this.getNewest(componentMap);
          type = component.type;
          parentKey = path[path.length - 2];
          childNode = data.originValue;
          switch (parentKey) {
            case 'BlockDeviceMapping':
              deviceObj = childNode.DeviceName;
              if (deviceObj) {
                data.key = this.genValue(deviceObj.type, deviceObj.__old__, deviceObj.__new__);
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
            case 'Dimensions':
            case 'AlarmActions':
              data.key = this.pluralToSingular(parentKey);
              break;
            case 'NotificationType':
              data = data;
          }
          if (path.length === 1) {
            data.key = constant.RESNAME[data.key] || data.key;
          }
          return data;
        }
      };
    };
    prepareNode = function(path, data) {
      var compAttrObj, compUID, newAttr, newCompName, newRef, newValue, oldAttr, oldCompName, oldRef, valueRef, _getRef, _ref;
      _getRef = function(value) {
        var refMatchAry, refName, refRegex, refUID;
        if (_.isString(value) && value.indexOf('@{') === 0) {
          refRegex = /@\{.*\}/g;
          refMatchAry = value.match(refRegex);
          if (refMatchAry && refMatchAry.length) {
            refName = value.slice(2, value.length - 1);
            refUID = refName.split('.')[0];
            if (refUID) {
              return "" + refUID + ".name";
            }
          }
        }
        return null;
      };
      if (_.isObject(data.value)) {
        newValue = data.value;
        oldRef = _getRef(newValue.__old__);
        newRef = _getRef(newValue.__new__);
        if (oldRef) {
          newValue.__old__ = this.h.getNodeMap(oldRef).oldAttr;
        }
        if (newRef) {
          newValue.__new__ = this.h.getNodeMap(newRef).newAttr;
        }
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
          data.value = this.h.getNodeMap(valueRef).oldAttr;
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
        if ((_ref = path[1]) === 'type' || _ref === 'uid' || _ref === 'name' || _ref === 'index' || _ref === 'number' || _ref === 'serverGroupUid') {
          delete data.key;
        } else if (path[1] === 'resource') {
          data.skip = true;
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

}).call(this);
