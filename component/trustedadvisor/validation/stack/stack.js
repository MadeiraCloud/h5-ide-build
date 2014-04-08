(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'stack_service', 'ami_service', '../result_vo'], function(constant, $, MC, lang, stackService, amiService) {
    var generateComponentForDefaultVPC, isHaveNotExistAMI, isHaveNotExistAMIAsync, verify, _getCompName, _getCompType;
    generateComponentForDefaultVPC = function() {
      var azObjAry, azSubnetIdMap, currentComps, defaultVPCId, originComps, resType;
      resType = constant.AWS_RESOURCE_TYPE;
      originComps = MC.canvas_data.component;
      currentComps = _.extend(originComps, {});
      defaultVPCId = MC.aws.aws.checkDefaultVPC();
      azObjAry = MC.data.config[MC.canvas_data.region].zone.item;
      azSubnetIdMap = {};
      _.each(azObjAry, function(azObj) {
        var azName, resultObj, subnetId, subnetObj;
        azName = azObj.zoneName;
        resultObj = {};
        subnetObj = Design.modelClassForType(resType.AWS_EC2_AvailabilityZone).getSubnetOfDefaultVPC(azName);
        subnetId = null;
        if (subnetObj) {
          subnetId = subnetObj.subnetId;
        } else {
          subnetId = '';
        }
        azSubnetIdMap[azName] = subnetId;
        return null;
      });
      _.each(currentComps, function(compObj) {
        var asgAZAry, asgSubnetIdAry, asgSubnetIdStr, azNameAry, compType, compUID, eniAZName, instanceAZName, subnetIdAry;
        compType = compObj.type;
        compUID = compObj.uid;
        if (compType === resType.AWS_EC2_Instance) {
          instanceAZName = compObj.resource.Placement.AvailabilityZone;
          currentComps[compUID].resource.VpcId = defaultVPCId;
          currentComps[compUID].resource.SubnetId = azSubnetIdMap[instanceAZName];
        } else if (compType === resType.AWS_VPC_NetworkInterface) {
          eniAZName = compObj.resource.AvailabilityZone;
          currentComps[compUID].resource.VpcId = defaultVPCId;
          currentComps[compUID].resource.SubnetId = azSubnetIdMap[eniAZName];
        } else if (compType === resType.AWS_ELB) {
          currentComps[compUID].resource.VpcId = defaultVPCId;
          azNameAry = getAZAryForDefaultVPC(compUID);
          subnetIdAry = _.map(azNameAry, function(azName) {
            return azSubnetIdMap[azName];
          });
          currentComps[compUID].resource.Subnets = subnetIdAry;
        } else if (compType === resType.AWS_EC2_SecurityGroup) {
          currentComps[compUID].resource.VpcId = defaultVPCId;
        } else if (compType === resType.AWS_AutoScaling_Group) {
          asgAZAry = compObj.resource.AvailabilityZones;
          asgSubnetIdAry = _.map(asgAZAry, function(azName) {
            return azSubnetIdMap[azName];
          });
          asgSubnetIdStr = asgSubnetIdAry.join(' , ');
          currentComps[compUID].resource.VPCZoneIdentifier = asgSubnetIdStr;
        }
        return null;
      });
      return currentComps;
    };
    _getCompName = function(compUID) {
      var compName, compObj;
      compName = '';
      compObj = MC.canvas_data.component[compUID];
      if (compObj && compObj.name) {
        compName = compObj.name;
      }
      return compName;
    };
    _getCompType = function(compUID) {
      var compObj, compType;
      compType = '';
      compObj = MC.canvas_data.component[compUID];
      if (compObj && compObj.type) {
        compType = compObj.type;
      }
      return compType;
    };
    verify = function(callback) {
      var err, tipInfo, validData;
      try {
        if (!callback) {
          callback = function() {};
        }
        validData = MC.canvas_data;
        if (MC.aws.aws.checkDefaultVPC()) {
          validData.component = generateComponentForDefaultVPC();
        }
        stackService.verify({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), validData, function(result) {
          var checkResult, err, errCode, errCompName, errCompType, errCompUID, errInfoStr, errKey, errMessage, returnInfo, returnInfoObj, validResultObj;
          checkResult = true;
          returnInfo = null;
          errInfoStr = '';
          if (!result.is_error) {
            validResultObj = result.resolved_data;
            if (typeof validResultObj === 'object') {
              if (validResultObj.result) {
                callback(null);
              } else {
                checkResult = false;
                try {
                  returnInfo = validResultObj.cause;
                  returnInfoObj = JSON.parse(returnInfo);
                  errCompUID = returnInfoObj.uid;
                  errCode = returnInfoObj.code;
                  errKey = returnInfoObj.key;
                  errMessage = returnInfoObj.message;
                  errCompName = _getCompName(errCompUID);
                  errCompType = _getCompType(errCompUID);
                  errInfoStr = sprintf(lang.ide.TA_MSG_ERROR_STACK_FORMAT_VALID_FAILED, errCompName, errMessage);
                  if (errCode === 'EMPTY_VALUE' && errKey === 'InstanceId' && errMessage === 'Key InstanceId can not empty' && errCompType === 'AWS.VPC.NetworkInterface') {
                    checkResult = true;
                  }
                  if (errCode === 'EMPTY_VALUE' && errKey === 'LaunchConfigurationName' && errMessage === 'Key LaunchConfigurationName can not empty' && errCompType === 'AWS.AutoScaling.Group') {
                    checkResult = true;
                  }
                } catch (_error) {
                  err = _error;
                  errInfoStr = "Stack format validation error";
                }
              }
            } else {
              callback(null);
            }
          } else {
            callback(null);
          }
          if (checkResult) {
            return callback(null);
          } else {
            validResultObj = {
              level: constant.TA.ERROR,
              info: errInfoStr
            };
            callback(validResultObj);
            return console.log(validResultObj);
          }
        });
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_STACK_CHECKING_FORMAT_VALID);
        return {
          level: constant.TA.ERROR,
          info: tipInfo
        };
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    isHaveNotExistAMIAsync = function(callback) {
      var amiAry, currentRegion, currentState, err, instanceAMIMap;
      try {
        if (!callback) {
          callback = function() {};
        }
        currentState = MC.canvas.getState();
        amiAry = [];
        instanceAMIMap = {};
        _.each(MC.canvas_data.component, function(compObj) {
          var imageId;
          if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance || compObj.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
            imageId = compObj.resource.ImageId;
            if (imageId) {
              if (!instanceAMIMap[imageId]) {
                instanceAMIMap[imageId] = [];
                amiAry.push(imageId);
              }
              instanceAMIMap[imageId].push(compObj.uid);
            }
          }
          return null;
        });
        if (amiAry.length) {
          currentRegion = MC.canvas_data.region;
          amiService.DescribeImages({
            sender: this
          }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, amiAry, null, null, null, function(result) {
            var awsAMIIdAry, awsAMIIdAryStr, descAMIAry, descAMIIdAry, tipInfoAry;
            tipInfoAry = [];
            if (result.is_error && result.aws_error_code === 'InvalidAMIID.NotFound') {
              awsAMIIdAryStr = result.error_message;
              awsAMIIdAryStr = awsAMIIdAryStr.replace("The image ids '[", "").replace("]' do not exist", "").replace("The image id '[", "").replace("]' does not exist", "");
              awsAMIIdAry = awsAMIIdAryStr.split(',');
              awsAMIIdAry = _.map(awsAMIIdAry, function(awsAMIId) {
                return $.trim(awsAMIId);
              });
              if (!awsAMIIdAry.length) {
                callback(null);
                return null;
              }
              _.each(amiAry, function(amiId) {
                var instanceUIDAry;
                if (__indexOf.call(awsAMIIdAry, amiId) >= 0) {
                  instanceUIDAry = instanceAMIMap[amiId];
                  _.each(instanceUIDAry, function(instanceUID) {
                    var infoObjType, infoTagType, instanceName, instanceObj, instanceType, tipInfo;
                    instanceObj = MC.canvas_data.component[instanceUID];
                    instanceType = instanceObj.type;
                    instanceName = instanceObj.name;
                    infoObjType = 'Instance';
                    infoTagType = 'instance';
                    if (instanceType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
                      infoObjType = 'Launch Configuration';
                      infoTagType = 'lc';
                    }
                    tipInfo = sprintf(lang.ide.TA_MSG_ERROR_STACK_HAVE_NOT_EXIST_AMI, infoObjType, infoTagType, instanceName, amiId);
                    tipInfoAry.push({
                      level: constant.TA.ERROR,
                      info: tipInfo,
                      uid: instanceUID
                    });
                    return null;
                  });
                }
                return null;
              });
            } else if (!result.is_error) {
              descAMIIdAry = [];
              descAMIAry = result.resolved_data;
              if (_.isArray(descAMIAry)) {
                _.each(descAMIAry, function(amiObj) {
                  descAMIIdAry.push(amiObj.imageId);
                  return null;
                });
              }
              _.each(amiAry, function(amiId) {
                var instanceUIDAry;
                if (__indexOf.call(descAMIIdAry, amiId) < 0) {
                  instanceUIDAry = instanceAMIMap[amiId];
                  _.each(instanceUIDAry, function(instanceUID) {
                    var infoObjType, infoTagType, instanceName, instanceObj, instanceType, tipInfo;
                    instanceObj = MC.canvas_data.component[instanceUID];
                    instanceType = instanceObj.type;
                    instanceName = instanceObj.name;
                    infoObjType = 'Instance';
                    infoTagType = 'instance';
                    if (instanceType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
                      infoObjType = 'Launch Configuration';
                      infoTagType = 'lc';
                    }
                    tipInfo = sprintf(lang.ide.TA_MSG_ERROR_STACK_HAVE_NOT_AUTHED_AMI, infoObjType, infoTagType, instanceName, amiId);
                    tipInfoAry.push({
                      level: constant.TA.ERROR,
                      info: tipInfo,
                      uid: instanceUID
                    });
                    return null;
                  });
                }
                return null;
              });
            }
            if (tipInfoAry.length) {
              callback(tipInfoAry);
              return console.log(tipInfoAry);
            } else {
              return callback(null);
            }
          });
          return null;
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    isHaveNotExistAMI = function() {
      var amiAry, awsAMIIdAry, instanceAMIMap, tipInfoAry;
      amiAry = [];
      instanceAMIMap = {};
      _.each(MC.canvas_data.component, function(compObj) {
        var imageId;
        if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance || compObj.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
          imageId = compObj.resource.ImageId;
          if (imageId) {
            if (!instanceAMIMap[imageId]) {
              instanceAMIMap[imageId] = [];
              amiAry.push(imageId);
            }
            instanceAMIMap[imageId].push(compObj.uid);
          }
        }
        return null;
      });
      awsAMIIdAry = [];
      _.each(MC.data.dict_ami, function(amiObj) {
        var amiId;
        amiId = amiObj.imageId;
        awsAMIIdAry.push(amiId);
        return null;
      });
      tipInfoAry = [];
      _.each(amiAry, function(amiId) {
        var instanceUIDAry;
        if (__indexOf.call(awsAMIIdAry, amiId) < 0) {
          instanceUIDAry = instanceAMIMap[amiId];
          _.each(instanceUIDAry, function(instanceUID) {
            var infoObjType, infoTagType, instanceName, instanceObj, instanceType, tipInfo;
            instanceObj = MC.canvas_data.component[instanceUID];
            instanceType = instanceObj.type;
            instanceName = instanceObj.name;
            infoObjType = 'Instance';
            infoTagType = 'instance';
            if (instanceType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
              infoObjType = 'Launch Configuration';
              infoTagType = 'lc';
            }
            tipInfo = sprintf(lang.ide.TA_MSG_ERROR_STACK_HAVE_NOT_EXIST_AMI, infoObjType, infoTagType, instanceName, amiId);
            tipInfoAry.push({
              level: constant.TA.ERROR,
              info: tipInfo,
              uid: instanceUID
            });
            return null;
          });
        }
        return null;
      });
      return tipInfoAry;
    };
    return {
      isHaveNotExistAMIAsync: isHaveNotExistAMIAsync,
      isHaveNotExistAMI: isHaveNotExistAMI,
      verify: verify
    };
  });

}).call(this);
