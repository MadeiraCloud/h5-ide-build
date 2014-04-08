(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['MC', 'constant', 'state_model', 'backbone', 'jquery', 'underscore'], function(MC, constant, state_model) {
    var StateEditorModel;
    StateEditorModel = Backbone.Model.extend({
      defaults: {
        compData: null,
        allCompData: null,
        stateLogDataAry: []
      },
      initialize: function() {
        var agentData, allCompData, cmdAry, cmdModuleMap, cmdNameAry, cmdParaMap, cmdParaObjMap, currentCompData, currentState, groupResSelectData, modRepo, modTag, modVersion, moduleCMDMap, moduleData, moduleDataObj, osPlatform, osPlatformDistro, platformInfo, resAttrDataAry, that;
        that = this;
        agentData = Design.instance().get('agent');
        modRepo = agentData.module.repo;
        modTag = agentData.module.tag;
        modVersion = modRepo + ':' + modTag;
        moduleDataObj = MC.data.state.module[modVersion];
        platformInfo = that.getResPlatformInfo();
        osPlatform = platformInfo.osPlatform;
        osPlatformDistro = platformInfo.osPlatformDistro;
        if (osPlatform === 'windows') {
          that.set('isWindowsPlatform', true);
        } else {
          that.set('isWindowsPlatform', false);
        }
        if (osPlatformDistro) {
          that.set('supportedPlatform', true);
        } else {
          that.set('supportedPlatform', false);
        }
        moduleData = {};
        if (osPlatform === 'linux') {
          if (moduleDataObj.linux) {
            moduleData = _.extend(moduleData, moduleDataObj.linux);
          }
        } else if (osPlatform === 'windows') {
          if (moduleDataObj.windows) {
            moduleData = _.extend(moduleData, moduleDataObj.windows);
          }
        }
        if (moduleDataObj.common) {
          moduleData = _.extend(moduleData, moduleDataObj.common);
        }
        if (moduleDataObj.meta) {
          moduleData = _.extend(moduleData, moduleDataObj.meta);
        }
        cmdAry = [];
        cmdParaMap = {};
        cmdParaObjMap = {};
        cmdModuleMap = {};
        moduleCMDMap = {};
        _.each(moduleData, function(cmdObj, cmdName) {
          var cmdAllParaAry, cmdDistroAry, paraAryObj, supportCMD;
          cmdDistroAry = cmdObj.distro;
          supportCMD = false;
          if (((!cmdDistroAry) || (cmdDistroAry && __indexOf.call(cmdDistroAry, osPlatformDistro) >= 0)) && osPlatform === 'linux') {
            supportCMD = true;
          }
          cmdObj.support = supportCMD;
          cmdAry.push({
            name: cmdName,
            support: supportCMD
          });
          paraAryObj = cmdObj.parameter;
          cmdParaMap[cmdName] = [];
          cmdParaObjMap[cmdName] = {};
          cmdModuleMap[cmdName] = cmdObj;
          moduleCMDMap[cmdObj.module] = cmdName;
          _.each(paraAryObj, function(paraObj, paraName) {
            var paraBuildObj;
            paraBuildObj = _.extend(paraObj, {});
            paraBuildObj.name = paraName;
            paraBuildObj['type_' + paraBuildObj.type] = true;
            cmdParaMap[cmdName].push(paraBuildObj);
            cmdParaObjMap[cmdName][paraName] = paraBuildObj;
            return null;
          });
          cmdAllParaAry = cmdParaMap[cmdName];
          cmdParaMap[cmdName] = that.sortParaList(cmdAllParaAry, 'name');
          return null;
        });
        cmdNameAry = cmdAry.sort(function(val1, val2) {
          if (val1.support === val2.support) {
            if (val1.name > val2.name) {
              return 1;
            } else if (val1.name < val2.name) {
              return -1;
            } else {
              return 0;
            }
          } else {
            if (val1.support === true) {
              return -1;
            }
            if (val2.support === true) {
              return 1;
            }
          }
        });
        allCompData = that.get('allCompData');
        that.set('cmdNameAry', cmdNameAry);
        that.set('cmdParaMap', cmdParaMap);
        that.set('cmdParaObjMap', cmdParaObjMap);
        that.set('cmdModuleMap', cmdModuleMap);
        that.set('moduleCMDMap', moduleCMDMap);
        that.genStateRefList(allCompData);
        currentCompData = that.get('compData');
        resAttrDataAry = MC.aws.aws.genAttrRefList(currentCompData, allCompData);
        that.set('resAttrDataAry', resAttrDataAry);
        that.genAttrRefRegexList();
        groupResSelectData = that.getGroupResSelectData();
        that.set('groupResSelectData', groupResSelectData);
        currentState = MC.canvas.getState();
        if (currentState === 'stack') {
          that.set('currentState', 'stack');
        } else if (currentState === 'app') {
          that.set('currentState', 'app');
        } else if (currentState === 'appedit') {
          that.set('currentState', 'appedit');
        }
        if (MC.canvas_data.state === 'Stoped') {
          return that.set('currentAppState', 'stoped');
        }
      },
      sortParaList: function(cmdAllParaAry, paraName) {
        var newCMDAllParaAry;
        newCMDAllParaAry = cmdAllParaAry.sort(function(paraObj1, paraObj2) {
          if (paraObj1.required === paraObj2.required) {
            if (paraObj1[paraName] < paraObj2[paraName]) {
              return -1;
            } else {
              return 1;
            }
          }
          if (paraObj1.required) {
            return -1;
          }
          if (paraObj2.required) {
            return 1;
          }
        });
        return newCMDAllParaAry;
      },
      getResPlatformInfo: function() {
        var compData, imageId, imageObj, linuxDistroRange, osFamily, osPlatform, osPlatformDistro, osType, that;
        that = this;
        compData = that.get('compData');
        imageId = compData.resource.ImageId;
        imageObj = MC.data.dict_ami[imageId];
        osPlatform = null;
        osPlatformDistro = null;
        if (imageObj) {
          osFamily = imageObj.osFamily;
          osType = imageObj.osType;
          linuxDistroRange = ['centos', 'redhat', 'rhel', 'ubuntu', 'debian', 'fedora', 'gentoo', 'opensuse', 'suse', 'sles', 'amazon', 'amaz', 'linux-other'];
          if (osType === 'windows') {
            osPlatform = 'windows';
          } else if (__indexOf.call(linuxDistroRange, osType) >= 0) {
            osPlatform = 'linux';
            osPlatformDistro = osType;
          }
        }
        return {
          osPlatform: osPlatform,
          osPlatformDistro: osPlatformDistro
        };
      },
      updateAllStateRef: function(newOldStateIdMap) {
        var allInstanceModel, allLCModel, cmdParaObjMap, dealFunc, moduleCMDMap, newOldStateIdRefMap, that;
        that = this;
        allInstanceModel = Design.modelClassForType(constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance).allObjects();
        allLCModel = Design.modelClassForType(constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration).allObjects();
        newOldStateIdRefMap = {};
        _.each(newOldStateIdMap, function(value, key) {
          var newKey, newValue;
          newKey = that.replaceParaNameToUID(key);
          newValue = that.replaceParaNameToUID(value);
          newOldStateIdRefMap[newKey] = newValue;
          return null;
        });
        moduleCMDMap = that.get('moduleCMDMap');
        cmdParaObjMap = that.get('cmdParaObjMap');
        dealFunc = function(resModel) {
          var compUID, stateObj;
          stateObj = resModel.getStateData();
          compUID = resModel.id;
          if (stateObj && stateObj.length > 0) {
            _.each(stateObj, function(stateItemObj) {
              var cmdName, moduleName, paraModelObj, paraObj;
              paraObj = stateItemObj.parameter;
              moduleName = stateItemObj.module;
              cmdName = moduleCMDMap[moduleName];
              if (!cmdName) {
                return;
              }
              paraModelObj = cmdParaObjMap[cmdName];
              if (!paraModelObj) {
                return;
              }
              _.each(paraObj, function(paraValue, paraName) {
                var newParaValue, paraType;
                paraType = paraModelObj[paraName].type;
                if (paraType === 'state') {
                  newParaValue = _.map(paraValue, function(stateRef) {
                    if (newOldStateIdRefMap[stateRef]) {
                      return newOldStateIdRefMap[stateRef];
                    }
                    return stateRef;
                  });
                  paraObj[paraName] = newParaValue;
                }
                return null;
              });
              return null;
            });
            resModel.setStateData(stateObj);
          }
          return null;
        };
        _.each(allInstanceModel, dealFunc);
        _.each(allLCModel, dealFunc);
        return null;
      },
      setStateData: function(stateData) {
        var compData, resModel, that;
        that = this;
        compData = that.get('compData');
        resModel = that.get('resModel');
        return resModel.setStateData(stateData);
      },
      getStateData: function() {
        var compData, resModel, stateData, that;
        that = this;
        compData = that.get('compData');
        resModel = that.get('resModel');
        if (compData) {
          stateData = resModel.getStateData();
          if (_.isArray(stateData)) {
            return stateData;
          }
        }
        return null;
      },
      getResName: function() {
        var compData, resName, that;
        that = this;
        resName = '';
        compData = that.get('compData');
        if (compData && compData.name) {
          resName = compData.name;
        }
        if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
          if (compData.serverGroupUid === compData.uid) {
            if (compData.serverGroupName) {
              resName = compData.serverGroupName;
            }
          }
        }
        return resName;
      },
      genStateRefList: function(allCompData) {
        var compData, compList, currentCompUID, moduleCMDMap, resStateDataAry, that;
        that = this;
        compList = _.values(allCompData);
        resStateDataAry = [];
        compData = that.get('compData');
        currentCompUID = compData.uid;
        moduleCMDMap = that.get('moduleCMDMap');
        if (compList && !_.isEmpty(compList) && _.isArray(compList)) {
          _.each(compList, function(compObj) {
            var compName, compType, compUID, stateAry;
            compUID = compObj.uid;
            compType = compObj.type;
            compName = compObj.name;
            if (currentCompUID === compUID) {
              return;
            }
            if (compType === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
              if (compObj.index !== 0) {
                return;
              }
              compName = compObj.serverGroupName;
            }
            if (compType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
              compName = Design.instance().component(compUID).parent().get('name');
            }
            stateAry = compObj.state;
            if (stateAry && _.isArray(stateAry)) {
              _.each(stateAry, function(stateObj, idx) {
                var stateMeta, stateNumStr, stateRefStr;
                if (stateObj.module !== 'meta.comment') {
                  stateNumStr = String(idx + 1);
                  stateRefStr = '{' + compName + '.state.' + stateNumStr + '}';
                  stateMeta = moduleCMDMap[stateObj.module];
                  return resStateDataAry.push({
                    name: stateRefStr,
                    value: stateRefStr,
                    meta: stateMeta
                  });
                }
              });
            }
            return null;
          });
        }
        resStateDataAry = resStateDataAry.sort(function(val1, val2) {
          if (val1.name > val2.name) {
            return 1;
          } else if (val1.name < val2.name) {
            return -1;
          } else {
            return 0;
          }
        });
        return that.set('resStateDataAry', resStateDataAry);
      },
      genAttrRefRegexList: function() {
        var attrRefRegexList, resAttrDataAry, resAttrRegexStr, resStateDataAry, stateRefRegexList, that;
        that = this;
        attrRefRegexList = [];
        resAttrDataAry = that.get('resAttrDataAry');
        resStateDataAry = that.get('resStateDataAry');
        if (!resAttrDataAry) {
          resAttrDataAry = [];
        }
        attrRefRegexList = _.map(resAttrDataAry, function(refObj) {
          var regStr;
          regStr = refObj.name.replace('{', '\\{').replace('}', '\\}').replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
          return '@' + '{' + regStr + '}';
        });
        stateRefRegexList = _.map(resStateDataAry, function(refObj) {
          var regStr;
          regStr = refObj.name.replace('{', '\\{').replace('}', '\\}').replace('.', '\\.').replace('[', '\\[').replace(']', '\\]');
          return '@' + regStr;
        });
        attrRefRegexList = attrRefRegexList.concat(stateRefRegexList);
        resAttrRegexStr = attrRefRegexList.join('|');
        return that.set('resAttrRegexStr', resAttrRegexStr);
      },
      replaceStateUIDToName: function(paraValue) {
        var allCompData, compData, newParaValue, newRefStr, refMatchAry, refMatchStr, refRegex, resName, resUID, stateNum, stateNumMap, stateUID, that, uidMatchAry, uidRegex;
        that = this;
        allCompData = that.get('allCompData');
        refRegex = /@\{([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})\.state\.state-([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})\}/g;
        uidRegex = /[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}/g;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        if (refMatchAry && refMatchAry.length) {
          refMatchStr = refMatchAry[0];
          uidMatchAry = refMatchStr.match(uidRegex);
          resUID = uidMatchAry[0];
          stateUID = 'state-' + uidMatchAry[1];
          compData = allCompData[resUID];
          resName = 'unknown';
          stateNum = 'unknown';
          if (compData) {
            stateNumMap = {};
            resName = compData.name;
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
              if (compData.number && compData.number > 1) {
                resName = compData.serverGroupName;
              }
            }
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
              _.each(allCompData, function(asgCompData) {
                var lcUID, lcUIDRef;
                if (asgCompData.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_Group) {
                  lcUIDRef = asgCompData.resource.LaunchConfigurationName;
                  if (lcUIDRef) {
                    lcUID = MC.extractID(lcUIDRef);
                    if (lcUID === resUID) {
                      resName = asgCompData.name;
                    }
                  }
                }
                return null;
              });
            }
            if (compData.state && _.isArray(compData.state)) {
              _.each(compData.state, function(stateObj, idx) {
                if (stateObj.id === stateUID) {
                  stateNum = idx + 1;
                }
                return null;
              });
            }
          }
          newRefStr = refMatchStr.replace(resUID, resName).replace(stateUID, stateNum);
          newParaValue = newParaValue.replace(refMatchStr, newRefStr);
        }
        return newParaValue;
      },
      replaceStateNameToUID: function(paraValue) {
        var allCompData, compData, lcCompData, lcUID, lcUIDRef, newParaValue, newUIDStr, refMatchAry, refMatchStr, refRegex, resName, resUID, stateNum, stateUID, that;
        that = this;
        allCompData = that.get('allCompData');
        refRegex = /@\{([\w-]+)\.state\.\d+\}/g;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        if (refMatchAry && refMatchAry.length) {
          refMatchStr = refMatchAry[0];
          resName = refMatchStr.replace('@{', '').split('.')[0];
          resUID = that.getUIDByResName(resName);
          stateNum = Number(refMatchStr.replace('}', '').split('.')[2]);
          stateUID = '';
          lcCompData = null;
          if (resUID && _.isNumber(stateNum)) {
            compData = allCompData[resUID];
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_Group) {
              lcUIDRef = compData.resource.LaunchConfigurationName;
              if (lcUIDRef) {
                lcUID = MC.extractID(lcUIDRef);
                resUID = lcUID;
                lcCompData = allCompData[lcUID];
              }
            }
            if (lcCompData) {
              compData = lcCompData;
            }
            if (compData.state && _.isArray(compData.state) && compData.state[stateNum - 1]) {
              stateUID = compData.state[stateNum - 1].id;
            }
          }
          if (resUID && stateUID) {
            newUIDStr = refMatchStr.replace(resName, resUID).replace('.state.' + stateNum, '.state.' + stateUID);
            newParaValue = newParaValue.replace(refMatchStr, newUIDStr);
          }
        }
        return newParaValue;
      },
      replaceParaUIDToName: function(paraValue) {
        var allCompData, currentCompData, currentCompUID, newParaValue, refMatchAry, refRegex, that, uidRegex;
        that = this;
        currentCompData = that.get('compData');
        currentCompUID = currentCompData.uid;
        allCompData = that.get('allCompData');
        refRegex = /@\{([A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})(\.(\w+(\[\d+\])*))+\}/g;
        uidRegex = /[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12}/;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        _.each(refMatchAry, function(refMatchStr) {
          var compData, newRefStr, resName, resUID, uidMatchAry;
          uidMatchAry = refMatchStr.match(uidRegex);
          resUID = uidMatchAry[0];
          compData = allCompData[resUID];
          if (compData) {
            resName = compData.name;
            if (compData.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
              if (compData.number && compData.number > 1) {
                resName = compData.serverGroupName;
              }
            }
          } else {
            resName = 'unknown';
          }
          newRefStr = refMatchStr.replace(resUID, resName);
          newParaValue = newParaValue.replace(refMatchStr, newRefStr);
          return null;
        });
        return newParaValue;
      },
      replaceParaNameToUID: function(paraValue) {
        var allCompData, newParaValue, refMatchAry, refRegex, that;
        that = this;
        allCompData = that.get('allCompData');
        refRegex = constant.REGEXP.stateEditorOriginReference;
        refMatchAry = paraValue.match(refRegex);
        newParaValue = paraValue;
        _.each(refMatchAry, function(refMatchStr) {
          var newUIDStr, resName, resUID;
          resName = refMatchStr.replace('@{', '').split('.')[0];
          if (resName !== 'self') {
            resUID = that.getUIDByResName(resName);
            if (resUID) {
              newUIDStr = refMatchStr.replace(resName, resUID);
              newParaValue = newParaValue.replace(refMatchStr, newUIDStr);
            }
          }
          return null;
        });
        return newParaValue;
      },
      getUIDByResName: function(resName) {
        var allCompData, currentCompData, currentCompUID, resultUID, that;
        that = this;
        currentCompData = that.get('compData');
        currentCompUID = currentCompData.uid;
        allCompData = that.get('allCompData');
        resultUID = '';
        $.each(allCompData, function(uid, resObj) {
          if (resObj.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
            if (resObj.number && resObj.number > 1) {
              if (resObj.serverGroupName === resName) {
                resultUID = uid;
                return false;
              }
            }
          }
          if (resObj.name === resName) {
            resultUID = uid;
          }
          return null;
        });
        return resultUID;
      },
      getResState: function(resId) {
        var currentRegion, resObj, resState, that;
        that = this;
        currentRegion = MC.canvas_data.region;
        resObj = MC.data.resource_list[currentRegion][resId];
        resState = 'unknown';
        if (resObj && resObj.instanceState && resObj.instanceState.name) {
          resState = resObj.instanceState.name;
        }
        that.set('resState', resState);
        return null;
      },
      genStateLogData: function(resId, callback) {
        var agentStatus, appId, originStatusDataAry, resModel, stateDataAry, stateIdNumMap, that;
        that = this;
        appId = MC.canvas_data.id;
        if (!(appId && resId)) {
          that.set('stateLogDataAry', []);
          callback();
          return;
        }
        resModel = that.get('resModel');
        stateDataAry = resModel.getStateData();
        stateIdNumMap = {};
        originStatusDataAry = _.map(stateDataAry, function(stateObj, idx) {
          stateIdNumMap[stateObj.id] = idx;
          return {
            id: stateObj.id,
            result: 'pending'
          };
        });
        agentStatus = 'pending';
        state_model.log({
          sender: that
        }, $.cookie('usercode'), $.cookie('session_id'), appId, resId);
        that.off('STATE_LOG_RETURN');
        return that.on('STATE_LOG_RETURN', function(result) {
          var logAry, statusDataAry, statusObj;
          if (!result.is_error) {
            statusDataAry = result.resolved_data;
            if (statusDataAry && statusDataAry[0]) {
              statusObj = statusDataAry[0];
              if (statusObj.agent_status) {
                agentStatus = statusObj.agent_status;
              }
              logAry = statusObj.status;
              if (logAry && _.isArray(logAry)) {
                _.each(logAry, function(logObj) {
                  var stateNum;
                  stateNum = stateIdNumMap[logObj.id];
                  if (_.isNumber(stateNum)) {
                    return originStatusDataAry[stateNum] = logObj;
                  }
                });
              }
            }
            originStatusDataAry.unshift({
              id: 'Agent',
              result: agentStatus
            });
            that.set('stateLogDataAry', originStatusDataAry);
            that.set('agentStatus', agentStatus);
            if (callback) {
              return callback();
            }
          }
        });
      },
      getCurrentResUID: function() {
        var compData, currentCompUID, that;
        that = this;
        compData = that.get('compData');
        currentCompUID = compData.uid;
        return currentCompUID;
      },
      getGroupResSelectData: function() {
        var allCompData, compData, dataAry, originCompUID, originGroupUID, that;
        that = this;
        compData = that.get('compData');
        allCompData = that.get('allCompData');
        originGroupUID = '';
        originCompUID = compData.uid;
        if (compData.type === 'AWS.EC2.Instance') {
          originGroupUID = compData.serverGroupUid;
        }
        dataAry = [];
        _.each(allCompData, function(compObj) {
          var asgName, compType, compUID, currentGroupUID, lsgUID, resId, resName;
          compType = compObj.type;
          compUID = compObj.uid;
          if (compType === 'AWS.EC2.Instance' && compData.type === compType) {
            currentGroupUID = compObj.serverGroupUid;
            if (compUID === originCompUID) {
              resId = compObj.resource.InstanceId;
              resName = compObj.name;
              dataAry.push({
                res_id: resId,
                res_name: resName
              });
            } else if (originGroupUID && currentGroupUID && compUID !== originGroupUID && currentGroupUID === originGroupUID) {
              resId = compObj.resource.InstanceId;
              dataAry.push({
                res_id: resId,
                res_name: compObj.name
              });
            }
          }
          null;
          if (compType === 'AWS.AutoScaling.Group' && compData.type === 'AWS.AutoScaling.LaunchConfiguration') {
            asgName = compObj.resource.AutoScalingGroupName;
            lsgUID = MC.extractID(compObj.resource.LaunchConfigurationName);
            if (lsgUID === originCompUID) {
              $.each(MC.data.resource_list[MC.canvas_data.region], function(idx, resObj) {
                if (resObj && resObj.AutoScalingGroupName && resObj.Instances) {
                  if (resObj.AutoScalingGroupName === asgName) {
                    return $.each(resObj.Instances.member, function(idx, instanceObj) {
                      var instanceId;
                      instanceId = instanceObj.InstanceId;
                      return dataAry.push({
                        res_id: instanceId,
                        res_name: instanceId
                      });
                    });
                  }
                }
              });
            }
          }
          return null;
        });
        return dataAry;
      }
    });
    return StateEditorModel;
  });

}).call(this);
