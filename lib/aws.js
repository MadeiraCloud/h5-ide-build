(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['MC', 'constant', 'underscore', 'jquery', 'Design', 'i18n!/nls/lang.js'], function(MC, constant, _, $, Design, lang) {
    var checkPrivateIPIfHaveEIP, checkResName, genAttrRefList, getCompByResIdForState, isValidInIPRange;
    getCompByResIdForState = function(resId) {
      var result;
      result = {
        parent: null,
        self: null
      };
      Design.instance().eachComponent(function(component) {
        var groupMembers, index, member;
        groupMembers = component.groupMembers && component.groupMembers();
        if (result.parent || result.self) {
          null;
        }
        if (component.get('appId') === resId) {
          if (groupMembers && groupMembers.length) {
            result.parent = component;
            result.self = new Backbone.Model({
              'name': "" + (component.get('name')) + "-0"
            });
          } else {
            result.self = component;
          }
          return null;
        } else if (groupMembers && __indexOf.call(_.pluck(groupMembers, 'appId'), resId) >= 0) {
          if (component.type === constant.RESTYPE.LC) {
            result.parent = component.parent();
          } else {
            result.parent = component;
            for (index in groupMembers) {
              member = groupMembers[index];
              if (member.appId === resId) {
                result.self = new Backbone.Model({
                  'name': "" + (component.get('name')) + "-" + (+index + 1)
                });
                break;
              }
            }
          }
          return null;
        }
      });
      return result;
    };
    checkPrivateIPIfHaveEIP = function(allCompData, eniUID, priIPNum) {
      var haveEIP;
      haveEIP = false;
      _.each(allCompData, function(compData) {
        var currentENIUID, currentENIUIDRef, currentPriIPNum, currentPriIPNumAry;
        if (compData.type === constant.RESTYPE.EIP) {
          currentENIUIDRef = compData.resource.NetworkInterfaceId;
          currentENIUID = MC.extractID(currentENIUIDRef);
          if (eniUID === currentENIUID) {
            currentPriIPNumAry = compData.resource.PrivateIpAddress.split('.');
            currentPriIPNum = currentPriIPNumAry[3];
            if (Number(currentPriIPNum) === priIPNum) {
              haveEIP = true;
            }
          }
        }
        return null;
      });
      return haveEIP;
    };
    genAttrRefList = function(currentCompData, allCompData) {
      var allAttrStrAry, autoCompList, awsPropertyData, currentASGName, currentCompType, currentCompUID, currentISGName, currentInstanceName, currentIsASG, currentIsISG, currentIsInstance, groupAutoCompList, instanceAutoCompList, lcUID, lcUIDRef, resAttrDataAry, _getSelectedASGModelByLC;
      _getSelectedASGModelByLC = function() {
        var $asgDom, asgViewId;
        $asgDom = $('g.AWS-AutoScaling-LaunchConfiguration.selected').parent('g.AWS-AutoScaling-Group');
        asgViewId = $asgDom.data('id');
        if (asgViewId) {
          return App.workspaces.getAwakeSpace().view.canvas.getItem(asgViewId).model;
        }
        return null;
      };
      if (currentCompData.type === constant.RESTYPE.ASG) {
        lcUIDRef = currentCompData.resource.LaunchConfigurationName;
        if (lcUIDRef) {
          lcUID = MC.extractID(lcUIDRef);
          currentCompData = allCompData[lcUID];
          if (!currentCompData) {
            return null;
          }
        }
      }
      currentCompUID = currentCompData.uid;
      currentCompType = currentCompData.type;
      currentIsASG = false;
      currentASGName = null;
      if (currentCompType === constant.RESTYPE.LC) {
        currentIsASG = true;
      }
      currentIsISG = false;
      currentIsInstance = false;
      currentInstanceName = null;
      currentISGName = null;
      if (currentCompData.number) {
        if (currentCompData.number > 1) {
          currentIsISG = true;
          currentISGName = currentCompData.serverGroupName;
        } else {
          currentIsInstance = true;
          currentInstanceName = currentCompData.serverGroupName;
        }
      }
      allCompData = allCompData || this.get('allCompData');
      autoCompList = [];
      awsPropertyData = constant.STATE_REF_DICT;
      _.each(allCompData, function(compData, uid) {
        var asgHavePublicIP, asgModel, attrList, checkASGPublicIP, compName, compType, compUID, instanceRef, instanceUID, lcCompData, supportType, _ref;
        compName = compData.name;
        compUID = compData.uid;
        compType = compData.type;
        checkASGPublicIP = false;
        if (compUID === currentCompUID) {
          compName = 'self';
        }
        if (compType === constant.RESTYPE.ASG) {
          lcUIDRef = compData.resource.LaunchConfigurationName;
          if (lcUIDRef) {
            lcUID = MC.extractID(lcUIDRef);
            lcCompData = allCompData[lcUID];
            if (currentCompType === constant.RESTYPE.LC && currentCompUID === lcUID) {
              asgModel = _getSelectedASGModelByLC();
              if (asgModel && asgModel.get('id') === compUID) {
                currentASGName = compName;
                compName = 'self';
              }
            }
            if (lcCompData.resource.AssociatePublicIpAddress) {
              asgHavePublicIP = true;
            }
          }
        }
        if (compType === constant.RESTYPE.INSTANCE) {
          return;
        }
        if (compType === constant.RESTYPE.ENI) {
          if (compData.index !== 0) {
            return;
          }
          if (compData.serverGroupUid !== compUID) {
            return;
          }
          instanceRef = compData.resource.Attachment.InstanceId;
          if (!instanceRef) {
            return;
          }
          if ((_ref = compData.resource.Attachment.DeviceIndex) === '0' || _ref === 0) {
            instanceUID = MC.extractID(instanceRef);
            if (instanceUID) {
              compName = allCompData[instanceUID].serverGroupName;
              compUID = instanceUID;
              if (instanceUID === currentCompUID) {
                compName = 'self';
              }
            }
          }
        }
        supportType = compType.replace(/\./ig, '_');
        attrList = awsPropertyData[supportType];
        if (attrList) {
          _.each(attrList, function(isArray, attrName) {
            var autoCompRefStr, autoCompStr, azAry, instanceNoMainPublicIP, ipObjAry;
            autoCompStr = compName + '.';
            autoCompRefStr = compUID + '.';
            if (attrName === '__array') {
              return;
            } else {
              autoCompStr += attrName;
              autoCompRefStr += attrName;
            }
            instanceNoMainPublicIP = false;
            if (attrName === 'PublicIp') {
              if (compType === constant.RESTYPE.ASG) {
                if (!asgHavePublicIP) {
                  return;
                }
              }
              if (compType === constant.RESTYPE.ENI) {
                if ((!MC.aws.aws.checkPrivateIPIfHaveEIP(allCompData, compData.uid, 0)) && (!compData.resource.AssociatePublicIpAddress)) {
                  instanceNoMainPublicIP = true;
                }
              }
            }
            if (!instanceNoMainPublicIP) {
              autoCompList.push({
                name: autoCompStr,
                value: autoCompRefStr,
                uid: compUID
              });
            }
            if (isArray) {
              if (supportType === 'AWS_AutoScaling_Group') {
                if (attrName === 'AvailabilityZones') {
                  azAry = compData.resource.AvailabilityZones;
                  if (azAry.length > 1) {
                    _.each(azAry, function(azName, idx) {
                      autoCompList.push({
                        name: autoCompStr + '[' + idx + ']',
                        value: autoCompRefStr + '[' + idx + ']',
                        uid: compUID
                      });
                      return null;
                    });
                  }
                }
              }
              if (supportType === 'AWS_VPC_NetworkInterface') {
                if (attrName === 'PublicDnsName' || attrName === 'PublicIp' || attrName === 'PrivateDnsName' || attrName === 'PrivateIpAddress') {
                  ipObjAry = compData.resource.PrivateIpAddressSet;
                  if (compData.index !== 0) {
                    return;
                  }
                  if (ipObjAry.length > 1) {
                    _.each(ipObjAry, function(ipObj, idx) {
                      if (attrName === 'PublicIp') {
                        if (!MC.aws.aws.checkPrivateIPIfHaveEIP(allCompData, compData.uid, idx)) {
                          return;
                        }
                      }
                      autoCompList.push({
                        name: autoCompStr + '[' + idx + ']',
                        value: autoCompRefStr + '[' + idx + ']',
                        uid: compUID
                      });
                      return null;
                    });
                  }
                }
              }
              if (supportType === 'AWS_ELB') {
                if (attrName === 'AvailabilityZones') {
                  azAry = compData.resource.AvailabilityZones;
                  if (azAry.length > 1) {
                    _.each(azAry, function(azName, idx) {
                      autoCompList.push({
                        name: autoCompStr + '[' + idx + ']',
                        value: autoCompRefStr + '[' + idx + ']',
                        uid: compUID
                      });
                      return null;
                    });
                  }
                }
              }
            }
            return null;
          });
        }
        return null;
      });
      groupAutoCompList = [];
      instanceAutoCompList = [];
      _.each(autoCompList, function(autoCompObj) {
        var groupCompNameStr, groupCompUIDStr, instanceCompNameStr, instanceCompUIDStr;
        if (autoCompObj.name.indexOf('self.') === 0) {
          if (currentIsInstance) {
            instanceCompNameStr = autoCompObj.name.replace('self', currentInstanceName);
            instanceCompUIDStr = autoCompObj.value.replace('self', currentInstanceName);
            instanceAutoCompList.push({
              name: instanceCompNameStr,
              value: instanceCompUIDStr,
              uid: autoCompObj.uid
            });
          }
          if (currentIsASG || currentIsISG) {
            groupCompNameStr = null;
            groupCompUIDStr = null;
            if (currentIsASG) {
              groupCompNameStr = autoCompObj.name.replace('self', currentASGName);
              groupCompUIDStr = autoCompObj.value.replace('self', currentASGName);
            } else if (currentIsISG) {
              groupCompNameStr = autoCompObj.name.replace('self', currentISGName);
              groupCompUIDStr = autoCompObj.value.replace('self', currentISGName);
            }
            return groupAutoCompList.push({
              name: groupCompNameStr,
              value: groupCompUIDStr,
              uid: autoCompObj.uid
            });
          }
        }
      });
      autoCompList = autoCompList.concat(groupAutoCompList);
      autoCompList = autoCompList.concat(instanceAutoCompList);
      resAttrDataAry = _.map(autoCompList, function(autoCompObj) {
        if (autoCompObj.name.indexOf('self.') === 0) {
          autoCompObj.value = autoCompObj.value.replace(autoCompObj.uid, 'self');
          autoCompObj.uid = 'self';
        }
        return {
          name: "" + autoCompObj.name,
          value: "" + autoCompObj.name,
          ref: "" + autoCompObj.value,
          uid: "" + autoCompObj.uid
        };
      });
      allAttrStrAry = _.map(resAttrDataAry, function(refObj) {
        return refObj.name;
      });
      _.each(['self.PrivateIpAddress', 'self.MacAddress', 'self.PublicIp'], function(attr) {
        if (__indexOf.call(allAttrStrAry, attr) < 0) {
          return resAttrDataAry.push({
            name: "" + attr,
            value: "" + attr,
            ref: "" + attr,
            uid: "self"
          });
        }
      });
      resAttrDataAry = _.filter(resAttrDataAry, function(autoCompObj) {
        if (autoCompObj.name.indexOf('self.') === 0) {
          if (autoCompObj.name.indexOf('.AvailabilityZones') !== -1) {
            return false;
          } else {
            return true;
          }
        }
        return true;
      });
      resAttrDataAry = resAttrDataAry.sort(function(obj1, obj2) {
        if (obj1.name < obj2.name) {
          return -1;
        }
        if (obj1.name > obj2.name) {
          return 1;
        }
      });
      return resAttrDataAry;
    };
    isValidInIPRange = function(ipStr, validIPType) {
      var ipRangeAry, ipRangeValid, isInAryRange, priIPAry, pubIPAry;
      pubIPAry = [
        {
          low: '1.0.0.1',
          high: '126.255.255.254'
        }, {
          low: '128.1.0.1',
          high: '191.254.255.254'
        }, {
          low: '192.0.1.1',
          high: '223.255.254.254'
        }
      ];
      priIPAry = [
        {
          low: '10.0.0.0',
          high: '10.255.255.255'
        }, {
          low: '172.16.0.0',
          high: '172.31.255.255'
        }, {
          low: '192.168.0.0',
          high: '192.168.255.255'
        }
      ];
      ipRangeValid = function(ipAryStr1, ipAryStr2, ipStr) {
        var curIPAry, ipAry1, ipAry2, isInIPRange;
        ipAry1 = ipAryStr1.split('.');
        ipAry2 = ipAryStr2.split('.');
        curIPAry = ipStr.split('.');
        isInIPRange = true;
        _.each(curIPAry, function(ipNum, idx) {
          if (!(Number(curIPAry[idx]) >= Number(ipAry1[idx]) && Number(curIPAry[idx]) <= Number(ipAry2[idx]))) {
            isInIPRange = false;
          }
          return null;
        });
        return isInIPRange;
      };
      ipRangeAry = [];
      if (validIPType === 'public') {
        ipRangeAry = pubIPAry;
      } else if (validIPType === 'private') {
        ipRangeAry = priIPAry;
      }
      isInAryRange = false;
      _.each(ipRangeAry, function(ipRangeObj) {
        var highRange, isInRange, lowRange;
        lowRange = ipRangeObj.low;
        highRange = ipRangeObj.high;
        isInRange = ipRangeValid(lowRange, highRange, ipStr);
        if (isInRange) {
          isInAryRange = true;
        }
        return null;
      });
      return isInAryRange;
    };
    checkResName = function(uid, $input, type) {
      var error, isNameDup, isOldName, isReservedName, name;
      isNameDup = function(uid, newName) {
        var comp, dup;
        console.assert(uid, "This property model doesn't have an id");
        comp = Design.instance().component(uid);
        if (comp.get("name") === newName) {
          return false;
        }
        dup = false;
        Design.instance().eachComponent(function(comp) {
          if (comp.get("name") === newName) {
            dup = true;
            return false;
          }
        });
        return dup;
      };
      isOldName = function(uid, newName) {
        var comp, design;
        design = Design.instance();
        comp = design.component(uid);
        if (!comp) {
          return false;
        }
        return design.isPreservedName(comp.type, newName);
      };
      isReservedName = function(newName) {
        var result;
        result = false;
        if (newName === 'self' || newName === 'this' || newName === 'global' || newName === 'meta' || newName === 'madeira') {
          result = true;
        }
        return result;
      };
      if (!$input.length) {
        $input = $($input);
      }
      name = $input.val();
      if (!type) {
        type = name;
      }
      if (name && !MC.validate('awsName', name)) {
        error = sprintf(lang.PARSLEY.THIS_VALUE_SHOULD_BE_A_VALID_TYPE_NAME, type);
      }
      if (!error && isNameDup(uid, name)) {
        error = sprintf(lang.PARSLEY.TYPE_NAME_CONFLICT, type, name);
      }
      if (!error && isOldName(uid, name)) {
        error = sprintf(lang.PARSLEY.TYPE_NAME_CONFLICT, type, name);
      }
      if (!error && isReservedName(name)) {
        error = sprintf(lang.PARSLEY.TYPE_NAME_CONFLICT, type, name);
      }
      if (name.indexOf("elbsg-") === 0) {
        error = lang.PARSLEY.RESOURCE_NAME_ELBSG_RESERVED;
      }
      $input.parsley('custom', function() {
        return error;
      });
      return $input.parsley('validate');
    };
    MC.aws = {};
    MC.aws.aws = {
      getCompByResIdForState: getCompByResIdForState,
      genAttrRefList: genAttrRefList,
      isValidInIPRange: isValidInIPRange,
      checkPrivateIPIfHaveEIP: checkPrivateIPIfHaveEIP,
      checkResName: checkResName
    };
  });

}).call(this);
