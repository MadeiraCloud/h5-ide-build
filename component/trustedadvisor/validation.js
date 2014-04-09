(function() {
  define('component/trustedadvisor/config',{
    validDebug: '',
    syncTimeout: 10000,
    componentTypeToFileMap: {
      'AWS.AutoScaling.Group': ['asg'],
      'AWS.EC2.SecurityGroup': ['sg'],
      'AWS.VPC.VPNGateway': ['vgw'],
      'AWS.VPC.VPNConnection': ['vpn'],
      'AWS.VPC.CustomerGateway': ['cgw'],
      'AWS.VPC.InternetGateway': ['igw'],
      'AWS.EC2.Instance': ['instance', 'state'],
      'AWS.ELB': ['elb'],
      'AWS.VPC.NetworkInterface': ['eni'],
      'AWS.VPC.NetworkAcl': ['acl'],
      'AWS.AutoScaling.LaunchConfiguration': ['state'],
      'AWS.VPC.RouteTable': ['rtb']
    },
    globalList: {
      eip: ['isHasIGW'],
      az: ['isAZAlone'],
      sg: ['isStackUsingOnlyOneSG', 'isAssociatedSGNumExceedLimit'],
      vpc: ['isVPCAbleConnectToOutside'],
      stack: ['~isHaveNotExistAMI']
    },
    asyncList: {
      cgw: ['isCGWHaveIPConflict'],
      stack: ['verify', 'isHaveNotExistAMIAsync'],
      subnet: ['getAllAWSENIForAppEditAndDefaultVPC']
    }
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/result_vo',['event', 'MC', 'Design', 'underscore'], function(ide_event, MC, Design) {
    var reset, result, set, _add, _del, _exist, _genKey, _genRes, _hash, _replace;
    _hash = function(str) {
      var hash;
      hash = 0;
      if (str.length === 0) {
        return hash;
      }
      _.each(str, function(v, i) {
        var char;
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
        return null;
      });
      return "k" + hash;
    };
    _genKey = function(key, uid) {
      return _hash("" + key + "|" + uid);
    };
    _genRes = function(key, result, uid) {
      uid = uid || result && result.uid || null;
      return _.extend({}, result, {
        key: _genKey(key, uid),
        type: key
      });
    };
    _del = function(key) {
      var delete_obj;
      delete_obj = {};
      _.map(MC.ta.list, function(obj) {
        if (obj.key === key) {
          delete_obj = obj;
        }
        return null;
      });
      if (delete_obj) {
        MC.ta.list = _.without(MC.ta.list, delete_obj);
        if (delete_obj.level) {
          ide_event.trigger(ide_event.UPDATE_STATUS_BAR, 'delete', delete_obj.level);
        }
      }
      return null;
    };
    _add = function(result) {
      MC.ta.list.push(result);
      return ide_event.trigger(ide_event.UPDATE_STATUS_BAR, 'add', result.level);
    };
    _replace = function(result) {
      MC.ta.list = _.map(MC.ta.list, function(item) {
        if (item.key === result.key) {
          return result;
        }
        return item;
      });
      return MC.ta.list;
    };
    _exist = function(key) {
      return _.contains(_.pluck(MC.ta.list, 'key'), key);
    };
    set = function(key, result, uid) {
      var k, res;
      res = _genRes(key, result, uid);
      k = res.key;
      if (_.isArray(result)) {
        _.each(result, function(r) {
          if (r) {
            return set(key, r, r.uid);
          }
        });
      } else if (result) {
        if (!_exist(k)) {
          _add(res);
        } else {
          _replace(res);
        }
      } else {
        _del(k);
      }
      return MC.ta.list;
    };
    reset = function() {
      MC.ta.list = [];
      MC.canvas_data = Design.instance().serialize();
      return null;
    };
    result = function() {
      return MC.ta.list;
    };
    return {
      set: set,
      reset: reset,
      result: result
    };
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/stack/stack',['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'stack_service', 'ami_service', '../result_vo'], function(constant, $, MC, lang, stackService, amiService) {
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

(function() {
  define('component/trustedadvisor/helper',['constant', 'MC', 'i18n!nls/lang.js', 'Design', 'underscore'], function(CONST, MC, LANG, Design, _) {
    var Helper, Inside;
    Inside = {
      taReturn: function(type, tip, uid) {
        var ret;
        ret = {
          level: CONST.TA[type],
          info: tip
        };
        if (uid) {
          ret.uid = uid;
        }
        return ret;
      },
      genTip: function(args) {
        var tip;
        if (args.length > 2) {
          tip = Function.call.apply(sprintf, args);
        } else {
          tip = args[1];
        }
        return tip;
      }
    };
    Helper = {
      map: {
        protocal: {
          '1': 'icmp',
          '6': 'tcp',
          '17': 'udp',
          '-1': 'all'
        }
      },
      protocal: {
        get: function(code) {
          return Helper.map.protocal[code.toString()] || code;
        }
      },
      i18n: {
        short: function() {
          return LANG.ide;
        }
      },
      component: {
        get: function(uid, rework) {
          if (rework) {
            return Design.instance().component(uid);
          } else {
            return MC.canvas_data.component[uid];
          }
        }
      },
      message: {
        error: function(uid, tip) {
          tip = Inside.genTip(arguments);
          return Inside.taReturn(CONST.TA.ERROR, tip, uid);
        },
        warning: function(uid, tip) {
          tip = Inside.genTip(arguments);
          return Inside.taReturn(CONST.TA.WARNING, tip, uid);
        },
        notice: function(uid, tip) {
          tip = Inside.genTip(arguments);
          return Inside.taReturn(CONST.TA.NOTICE, tip, uid);
        }
      },
      eni: {
        getByInstance: function(instance) {
          return _.filter(MC.canvas_data.component, function(component) {
            if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_VPC_NetworkInterface) {
              if (MC.extractID(component.resource.Attachment.InstanceId) === instance.uid) {
                return true;
              }
            }
          });
        }
      },
      sg: {
        get: function(component) {
          var eni, enis, sg, sgId, sgs, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
          sgs = [];
          if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
            _ref = component.resource.SecurityGroups;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              sgId = _ref[_i];
              sgs.push(Helper.component.get(MC.extractID(sgId)));
            }
          } else if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
            enis = Helper.eni.getByInstance(component);
            for (_j = 0, _len1 = enis.length; _j < _len1; _j++) {
              eni = enis[_j];
              _ref1 = eni.resource.GroupSet;
              for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                sg = _ref1[_k];
                sgs.push(Helper.component.get(MC.extractID(sg.GroupId)));
              }
            }
          } else if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_ELB) {
            _ref2 = component.resource.SecurityGroups;
            for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
              sgId = _ref2[_l];
              sgs.push(Helper.component.get(MC.extractID(sgId)));
            }
          }
          return _.uniq(_.compact(sgs));
        },
        port: function(sgs) {
          var build, info, permission, sg, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
          info = {
            "in": {},
            out: {}
          };
          if (!_.isArray(sgs)) {
            sgs = [sgs];
          }
          build = function(permission, direction) {
            var protocal, theInfo;
            protocal = Helper.protocal.get(permission.IpProtocol);
            if (!info[direction][protocal]) {
              info[direction][protocal] = [];
            }
            theInfo = {
              from: Number(permission.FromPort),
              to: Number(permission.ToPort),
              range: permission.IpRanges
            };
            if (_.where(info[direction][protocal], theInfo).length === 0) {
              return info[direction][protocal].push(theInfo);
            }
          };
          for (_i = 0, _len = sgs.length; _i < _len; _i++) {
            sg = sgs[_i];
            if (sg.type !== CONST.RESTYPE.SG) {
              continue;
            }
            _ref = sg.resource.IpPermissionsEgress;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              permission = _ref[_j];
              build(permission, 'out');
            }
            _ref1 = sg.resource.IpPermissions;
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              permission = _ref1[_k];
              build(permission, 'in');
            }
          }
          return info;
        },
        isInRange: function(protocal, port, portData, direction) {
          var isInRangeResult, portCode, protocalCode;
          isInRangeResult = false;
          protocalCode = Helper.protocal.get(protocal.toLowerCase());
          portCode = Number(port);
          _.each(portData[direction], function(portAry, proto) {
            if (proto === protocalCode) {
              _.each(portAry, function(portObj) {
                if (portCode >= portObj.from && portCode <= portObj.to) {
                  isInRangeResult = true;
                }
                return null;
              });
            }
            return null;
          });
          return isInRangeResult;
        }
      }
    };
    return Helper;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/ec2/instance',['constant', 'MC', 'Design', '../../helper'], function(constant, MC, Design, Helper) {
    var i18n, isAssociatedSGRuleExceedFitNum, isConnectRoutTableButNoEIP, isEBSOptimizedForAttachedProvisionedVolume, isNatCheckedSourceDest, _getSGCompRuleLength;
    i18n = Helper.i18n.short();
    isEBSOptimizedForAttachedProvisionedVolume = function(instanceUID) {
      var amiId, haveProvisionedVolume, instanceComp, instanceName, instanceType, instanceUIDRef, isInstanceComp, lsgName, tipInfo, _ref;
      instanceComp = MC.canvas_data.component[instanceUID];
      instanceType = instanceComp.type;
      isInstanceComp = instanceType === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance;
      haveProvisionedVolume = false;
      instanceUIDRef = lsgName = amiId = null;
      if (instanceComp) {
        instanceUIDRef = MC.aws.aws.genResRef(instanceUID, 'resource.InstanceId');
      } else {
        lsgName = instanceComp.resource.LaunchConfigurationName;
        amiId = instanceComp.resource.ImageId;
      }
      _.each(MC.canvas_data.component, function(compObj) {
        if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_EBS_Volume) {
          if (compObj.resource.VolumeType !== 'standard') {
            if (isInstanceComp && (compObj.resource.AttachmentSet.InstanceId === instanceUIDRef)) {
              haveProvisionedVolume = true;
            } else if (!isInstanceComp && compObj.resource.ImageId === amiId && compObj.resource.LaunchConfigurationName === lsgName) {
              haveProvisionedVolume = true;
            }
          }
        }
        return null;
      });
      if (!(haveProvisionedVolume && ((_ref = instanceComp.resource.EbsOptimized) === 'false' || _ref === false || _ref === ''))) {
        return null;
      } else {
        instanceName = instanceComp.name;
        tipInfo = sprintf(i18n.TA_MSG_NOTICE_INSTANCE_NOT_EBS_OPTIMIZED_FOR_ATTACHED_PROVISIONED_VOLUME, instanceName);
        return {
          level: constant.TA.NOTICE,
          info: tipInfo,
          uid: instanceUID
        };
      }
    };
    _getSGCompRuleLength = function(sgUID) {
      var sgComp, sgInboundRuleAry, sgOutboundRuleAry, sgTotalRuleNum;
      sgComp = MC.canvas_data.component[sgUID];
      sgInboundRuleAry = sgComp.resource.IpPermissions;
      sgOutboundRuleAry = sgComp.resource.IpPermissionsEgress;
      sgTotalRuleNum = 0;
      if (sgInboundRuleAry) {
        sgTotalRuleNum += sgInboundRuleAry.length;
      }
      if (sgOutboundRuleAry) {
        sgTotalRuleNum += sgOutboundRuleAry.length;
      }
      return sgTotalRuleNum;
    };
    isAssociatedSGRuleExceedFitNum = function(instanceUID) {
      var instanceComp, instanceName, instanceSGAry, instanceType, isInstanceComp, lsgSGAry, platformType, sgUIDAry, tipInfo, totalSGRuleNum;
      instanceComp = MC.canvas_data.component[instanceUID];
      instanceType = instanceComp.type;
      isInstanceComp = instanceType === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance;
      platformType = MC.canvas_data.platform;
      if (platformType !== MC.canvas.PLATFORM_TYPE.EC2_CLASSIC) {
        sgUIDAry = [];
        if (isInstanceComp) {
          _.each(MC.canvas_data.component, function(compObj) {
            var associatedInstanceRef, associatedInstanceUID, eniSGAry;
            if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_NetworkInterface) {
              associatedInstanceRef = compObj.resource.Attachment.InstanceId;
              associatedInstanceUID = MC.extractID(associatedInstanceRef);
              if (associatedInstanceUID === instanceUID) {
                eniSGAry = compObj.resource.GroupSet;
                _.each(eniSGAry, function(sgObj) {
                  var eniSGUID, eniSGUIDRef;
                  eniSGUIDRef = sgObj.GroupId;
                  eniSGUID = MC.extractID(eniSGUIDRef);
                  if (!(__indexOf.call(sgUIDAry, eniSGUID) >= 0)) {
                    sgUIDAry.push(eniSGUID);
                  }
                  return null;
                });
              }
            }
            return null;
          });
        } else {
          lsgSGAry = instanceComp.resource.SecurityGroups;
          _.each(lsgSGAry, function(sgRef) {
            var sgUID;
            sgUID = MC.extractID(sgRef);
            if (!(__indexOf.call(sgUIDAry, sgUID) >= 0)) {
              sgUIDAry.push(sgUID);
            }
            return null;
          });
        }
        totalSGRuleNum = 0;
        _.each(sgUIDAry, function(sgUID) {
          totalSGRuleNum += _getSGCompRuleLength(sgUID);
          return null;
        });
        if (totalSGRuleNum > 50) {
          instanceName = instanceComp.name;
          tipInfo = sprintf(i18n.TA_MSG_WARNING_INSTANCE_SG_RULE_EXCEED_FIT_NUM, instanceName, 50);
          return {
            level: constant.TA.WARNING,
            info: tipInfo,
            uid: instanceUID
          };
        }
      } else {
        sgUIDAry = [];
        if (isInstanceComp) {
          instanceSGAry = instanceComp.resource.SecurityGroup;
        } else {
          instanceSGAry = instanceComp.resource.SecurityGroups;
        }
        _.each(instanceSGAry, function(sgRef) {
          var sgUID;
          sgUID = MC.extractID(sgRef);
          if (!(__indexOf.call(sgUIDAry, sgUID) >= 0)) {
            sgUIDAry.push(sgUID);
          }
          return null;
        });
        totalSGRuleNum = 0;
        _.each(sgUIDAry, function(sgUID) {
          totalSGRuleNum += _getSGCompRuleLength(sgUID);
          return null;
        });
        if (totalSGRuleNum > 100) {
          instanceName = instanceComp.name;
          tipInfo = sprintf(i18n.TA_MSG_WARNING_INSTANCE_SG_RULE_EXCEED_FIT_NUM, instanceName, 100);
          return {
            level: constant.TA.WARNING,
            info: tipInfo,
            uid: instanceUID
          };
        }
      }
      return null;
    };
    isConnectRoutTableButNoEIP = function(uid) {
      var RTB, components, hasEIP, instance, instanceId, isConnectRTB, tipInfo;
      components = MC.canvas_data.component;
      instance = components[uid];
      instanceId = MC.aws.aws.genResRef(uid, 'resource.InstanceId');
      RTB = '';
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_RouteTable) {
          return _.some(component.resource.RouteSet, function(rt) {
            if (rt.InstanceId === instanceId) {
              RTB = component;
              return true;
            }
          });
        }
      });
      hasEIP = _.some(components, function(component) {
        if (component.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_EIP && component.resource.InstanceId === instanceId) {
          return true;
        }
      });
      if (!isConnectRTB || hasEIP) {
        return null;
      }
      tipInfo = sprintf(i18n.TA_MSG_NOTICE_INSTANCE_HAS_RTB_NO_ELB, RTB.name, instance.name, instance.name);
      return {
        level: constant.TA.NOTICE,
        info: tipInfo,
        uid: uid
      };
    };
    isNatCheckedSourceDest = function(uid) {
      var connectedRt, enis, hasUncheck, instance;
      instance = Design.instance().component(uid);
      connectedRt = instance.connectionTargets('RTB_Route');
      if (connectedRt && connectedRt.length) {
        enis = instance.connectionTargets('EniAttachment');
        enis.push(instance.getEmbedEni());
        hasUncheck = _.some(enis, function(eni) {
          return !eni.get('sourceDestCheck');
        });
        if (!hasUncheck) {
          return Helper.message.error(uid, i18n.TA_MSG_ERROR_INSTANCE_NAT_CHECKED_SOURCE_DEST, instance.get('name'));
        }
        null;
      }
      return null;
    };
    return {
      isEBSOptimizedForAttachedProvisionedVolume: isEBSOptimizedForAttachedProvisionedVolume,
      isAssociatedSGRuleExceedFitNum: isAssociatedSGRuleExceedFitNum,
      isConnectRoutTableButNoEIP: isConnectRoutTableButNoEIP,
      isNatCheckedSourceDest: isNatCheckedSourceDest
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/subnet',['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'eni_service', '../result_vo'], function(constant, $, MC, lang, eniService) {
    var getAllAWSENIForAppEditAndDefaultVPC;
    getAllAWSENIForAppEditAndDefaultVPC = function(callback) {
      var currentRegion, currentState, currentVPCComp, currentVPCId, currentVPCUID, defaultVPCId, err;
      try {
        if (!callback) {
          callback = function() {};
        }
        currentState = MC.canvas.getState();
        defaultVPCId = MC.aws.aws.checkDefaultVPC();
        if (currentState !== 'appedit' && !MC.aws.aws.checkDefaultVPC()) {
          callback(null);
          return null;
        }
        if (defaultVPCId) {
          currentVPCId = defaultVPCId;
        } else {
          currentVPCUID = Design.modelClassForType(constant.AWS_RESOURCE_TYPE.AWS_VPC_VPC).theVPC().id;
          currentVPCComp = MC.canvas_data.component[currentVPCUID];
          currentVPCId = currentVPCComp.resource.VpcId;
        }
        currentRegion = MC.canvas_data.region;
        eniService.DescribeNetworkInterfaces({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, null, [
          {
            "Name": "vpc-id",
            "Value": [currentVPCId]
          }
        ], function(result) {
          var checkResult, conflictInfo, eniObjAry;
          checkResult = true;
          conflictInfo = null;
          if (!result.is_error) {
            eniObjAry = result.resolved_data;
            _.each(eniObjAry, function(eniObj) {
              MC.data.resource_list[currentRegion][eniObj.networkInterfaceId] = eniObj;
              return null;
            });
            return callback(null);
          } else {
            return callback(null);
          }
        });
        return null;
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    return {
      getAllAWSENIForAppEditAndDefaultVPC: getAllAWSENIForAppEditAndDefaultVPC
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/vpc',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang) {
    var isVPCAbleConnectToOutside;
    isVPCAbleConnectToOutside = function() {
      var isHaveEIP, isHavePubIP, isHaveVPN, tipInfo, _ref;
      if (((_ref = MC.canvas_data.platform) === MC.canvas.PLATFORM_TYPE.EC2_CLASSIC)) {
        return null;
      }
      isHaveVPN = false;
      isHaveEIP = false;
      isHavePubIP = false;
      _.each(MC.canvas_data.component, function(compObj) {
        var compType;
        compType = compObj.type;
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_VPC_VPNConnection) {
          isHaveVPN = true;
        }
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_EC2_EIP) {
          isHaveEIP = true;
        }
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_VPC_NetworkInterface) {
          if (compObj.index === 0) {
            if (compObj.resource.AssociatePublicIpAddress) {
              isHavePubIP = true;
            }
          }
        }
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
          if (compObj.resource.AssociatePublicIpAddress) {
            isHavePubIP = true;
          }
        }
        return null;
      });
      if (isHaveVPN || isHaveEIP || isHavePubIP) {
        return null;
      }
      tipInfo = sprintf(lang.ide.TA_MSG_WARNING_NOT_VPC_CAN_CONNECT_OUTSIDE);
      return {
        level: constant.TA.WARNING,
        info: tipInfo
      };
    };
    return {
      isVPCAbleConnectToOutside: isVPCAbleConnectToOutside
    };
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/elb/elb',['constant', 'MC', 'i18n!nls/lang.js', '../../helper'], function(constant, MC, lang, taHelper) {
    var isAttachELBToMultiAZ, isHaveIGWForInternetELB, isHaveInstanceAttached, isHaveRepeatListener, isHaveSSLCert, isRedirectPortHttpsToHttp, isRuleInboundInstanceForELBListener, isRuleInboundToELBListener, isRuleOutboundToInstanceListener;
    isHaveIGWForInternetELB = function(elbUID) {
      var elbComp, elbName, haveIGW, isInternetELB, tipInfo, _ref;
      if (!((_ref = MC.canvas_data.platform) === MC.canvas.PLATFORM_TYPE.CUSTOM_VPC || _ref === MC.canvas.PLATFORM_TYPE.EC2_VPC)) {
        return null;
      }
      elbComp = MC.canvas_data.component[elbUID];
      isInternetELB = elbComp.resource.Scheme === 'internet-facing';
      haveIGW = false;
      _.each(MC.canvas_data.component, function(compObj) {
        var compType;
        compType = compObj.type;
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_VPC_InternetGateway) {
          haveIGW = true;
        }
        return null;
      });
      if (!(isInternetELB && !haveIGW)) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_VPC_HAVE_INTERNET_ELB_AND_NO_HAVE_IGW, elbName);
        return {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: elbUID
        };
      }
    };
    isHaveInstanceAttached = function(elbUID) {
      var attachedASGNum, attachedInstanceNum, elbComp, elbName, elbNameRef, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      attachedInstanceNum = elbComp.resource.Instances.length;
      attachedASGNum = 0;
      elbNameRef = MC.aws.aws.genResRef(elbUID, 'resource.LoadBalancerName');
      _.each(MC.canvas_data.component, function(compObj) {
        var attachedELBAry, compType;
        compType = compObj.type;
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_Group) {
          attachedELBAry = compObj.resource.LoadBalancerNames;
          if (__indexOf.call(attachedELBAry, elbNameRef) >= 0) {
            attachedASGNum++;
          }
        }
        return null;
      });
      if (attachedInstanceNum !== 0 || attachedASGNum !== 0) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_NO_ATTACH_INSTANCE_OR_ASG, elbName);
        return {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: elbUID
        };
      }
    };
    isAttachELBToMultiAZ = function(elbUID) {
      var attachedAZAry, elbComp, elbName, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      attachedAZAry = elbComp.resource.AvailabilityZones;
      if (attachedAZAry.length !== 1) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_WARNING_ELB_NO_ATTACH_TO_MULTI_AZ, elbName);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: elbUID
        };
      }
    };
    isRedirectPortHttpsToHttp = function(elbUID) {
      var elbComp, elbName, haveListener, listenerAry, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      haveListener = false;
      listenerAry = elbComp.resource.ListenerDescriptions;
      _.each(listenerAry, function(listenerItem) {
        var elbPort, instancePort, listenerObj;
        listenerObj = listenerItem.Listener;
        elbPort = listenerObj.LoadBalancerPort;
        instancePort = listenerObj.InstancePort;
        if ((elbPort === 443 || elbPort === '443') && (instancePort === 443 || instancePort === '443')) {
          haveListener = true;
        }
        return null;
      });
      if (!haveListener) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_NOTICE_ELB_REDIRECT_PORT_443_TO_443, elbName);
        return {
          level: constant.TA.NOTICE,
          info: tipInfo,
          uid: elbUID
        };
      }
    };
    isHaveRepeatListener = function(elbUID) {
      var elbComp, elbName, haveRepeat, listenerAry, portExistMap, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      listenerAry = elbComp.resource.ListenerDescriptions;
      portExistMap = {};
      haveRepeat = false;
      _.each(listenerAry, function(listenerItem) {
        var elbPort, listenerObj;
        listenerObj = listenerItem.Listener;
        elbPort = listenerObj.LoadBalancerPort;
        if (!portExistMap[elbPort]) {
          portExistMap[String(elbPort)] = true;
        } else {
          haveRepeat = true;
        }
        return null;
      });
      if (!haveRepeat) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_HAVE_REPEAT_LISTENER_ITEM, elbName);
        return {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: elbUID
        };
      }
    };
    isHaveSSLCert = function(elbUID) {
      var elbComp, elbName, isCorrect, listenerAry, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      listenerAry = elbComp.resource.ListenerDescriptions;
      isCorrect = true;
      _.each(listenerAry, function(listenerItem) {
        var elbProtocol, listenerObj;
        listenerObj = listenerItem.Listener;
        elbProtocol = listenerObj.Protocol;
        if (elbProtocol === 'HTTPS' || elbProtocol === 'SSL') {
          if (!listenerObj.SSLCertificateId) {
            isCorrect = false;
          }
        }
        return null;
      });
      if (isCorrect) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_HAVE_NO_SSL_CERT, elbName);
        return {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: elbUID
        };
      }
    };
    isRuleInboundToELBListener = function(elbUID) {
      var elbComp, elbName, elbPort, elbProtocol, isInRange, listenerAry, listenerItem, listenerObj, portData, result, resultPortAry, sgCompAry, tipInfo, _i, _len;
      elbComp = MC.canvas_data.component[elbUID];
      elbName = elbComp.name;
      sgCompAry = taHelper.sg.get(elbComp);
      portData = taHelper.sg.port(sgCompAry);
      listenerAry = elbComp.resource.ListenerDescriptions;
      result = true;
      resultPortAry = [];
      for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
        listenerItem = listenerAry[_i];
        listenerObj = listenerItem.Listener;
        elbProtocol = listenerObj.Protocol;
        elbPort = listenerObj.LoadBalancerPort;
        isInRange = taHelper.sg.isInRange('tcp', elbPort, portData, 'in');
        if (!isInRange) {
          result = false;
          resultPortAry.push(elbProtocol + ' <span class="validation-tag tag-port">' + elbPort + '</span>');
        }
      }
      if (!result) {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_RULE_NOT_INBOUND_TO_ELB_LISTENER, elbName, resultPortAry.join(', '));
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: elbUID
        };
      }
      return null;
    };
    isRuleOutboundToInstanceListener = function(elbUID) {
      var elbComp, elbName, instancePort, instanceProtocol, isInRange, listenerAry, listenerItem, listenerObj, portData, result, resultPortAry, sgCompAry, tipInfo, _i, _len;
      elbComp = MC.canvas_data.component[elbUID];
      sgCompAry = taHelper.sg.get(elbComp);
      portData = taHelper.sg.port(sgCompAry);
      listenerAry = elbComp.resource.ListenerDescriptions;
      result = true;
      resultPortAry = [];
      for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
        listenerItem = listenerAry[_i];
        listenerObj = listenerItem.Listener;
        instanceProtocol = listenerObj.InstanceProtocol;
        instancePort = listenerObj.InstancePort;
        isInRange = taHelper.sg.isInRange('tcp', instancePort, portData, 'out');
        if (!isInRange) {
          result = false;
          resultPortAry.push(instanceProtocol + ' <span class="validation-tag tag-port">' + instancePort + '</span>');
        }
      }
      if (!result) {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_RULE_NOT_OUTBOUND_TO_INSTANCE_LISTENER, elbName, resultPortAry.join(', '));
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: elbUID
        };
      }
      return null;
    };
    isRuleInboundInstanceForELBListener = function(elbUID) {
      var asgUIDAry, elbComp, elbName, instanceAry, listenerAry, resultAry;
      elbComp = MC.canvas_data.component[elbUID];
      elbName = elbComp.name;
      instanceAry = elbComp.resource.Instances;
      listenerAry = elbComp.resource.ListenerDescriptions;
      resultAry = [];
      _.each(instanceAry, function(instanceObj) {
        var instanceComp, instancePort, instanceProtocol, instanceUID, isInRange, listenerItem, listenerObj, portData, portInfo, resultPortAry, sgCompAry, targetName, targetType, tipInfo, _i, _len;
        instanceUID = MC.extractID(instanceObj.InstanceId);
        if (instanceUID) {
          resultPortAry = [];
          instanceComp = MC.canvas_data.component[instanceUID];
          if (instanceComp.index !== 0) {
            return;
          }
          sgCompAry = taHelper.sg.get(instanceComp);
          portData = taHelper.sg.port(sgCompAry);
          for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
            listenerItem = listenerAry[_i];
            listenerObj = listenerItem.Listener;
            instanceProtocol = listenerObj.InstanceProtocol;
            instancePort = listenerObj.InstancePort;
            isInRange = taHelper.sg.isInRange('tcp', instancePort, portData, 'in');
            if (!isInRange) {
              resultPortAry.push(instanceProtocol + ' <span class="validation-tag tag-port">' + instancePort + '</span>');
            }
          }
          if (resultPortAry.length) {
            targetType = 'Instance';
            targetName = instanceComp.serverGroupName;
            portInfo = resultPortAry.join(', ');
            tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_RULE_INSTANCE_NOT_OUTBOUND_FOR_ELB_LISTENER, targetType, targetName, portInfo, elbName);
            return resultAry.push({
              level: constant.TA.WARNING,
              info: tipInfo,
              uid: elbUID
            });
          }
        }
      });
      asgUIDAry = [];
      _.each(MC.canvas_data.component, function(compObj) {
        var elbRefAry;
        if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_Group) {
          elbRefAry = compObj.resource.LoadBalancerNames;
          _.each(elbRefAry, function(elbRef) {
            var currentELBUID;
            currentELBUID = MC.extractID(elbRef);
            if (elbUID === currentELBUID) {
              asgUIDAry.push(compObj.uid);
            }
            return null;
          });
        }
        return null;
      });
      _.each(asgUIDAry, function(asgUID) {
        var asgComp, instancePort, instanceProtocol, isInRange, lcComp, lcRef, lcUID, listenerItem, listenerObj, portData, portInfo, resultPortAry, sgCompAry, targetName, targetType, tipInfo, _i, _len;
        resultPortAry = [];
        asgComp = MC.canvas_data.component[asgUID];
        lcRef = asgComp.resource.LaunchConfigurationName;
        if (lcRef) {
          lcUID = MC.extractID(lcRef);
          lcComp = MC.canvas_data.component[lcUID];
        } else {
          return;
        }
        sgCompAry = taHelper.sg.get(lcComp);
        portData = taHelper.sg.port(sgCompAry);
        for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
          listenerItem = listenerAry[_i];
          listenerObj = listenerItem.Listener;
          instanceProtocol = listenerObj.InstanceProtocol;
          instancePort = listenerObj.InstancePort;
          isInRange = taHelper.sg.isInRange('tcp', instancePort, portData, 'in');
          if (!isInRange) {
            resultPortAry.push(instanceProtocol + ' <span class="validation-tag tag-port">' + instancePort + '</span>');
          }
        }
        if (resultPortAry.length) {
          targetType = 'Launch Configuration';
          targetName = lcComp.name;
          portInfo = resultPortAry.join(', ');
          tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ELB_RULE_INSTANCE_NOT_OUTBOUND_FOR_ELB_LISTENER, targetType, targetName, portInfo, elbName);
          return resultAry.push({
            level: constant.TA.WARNING,
            info: tipInfo,
            uid: elbUID
          });
        }
      });
      return resultAry;
    };
    return {
      isHaveIGWForInternetELB: isHaveIGWForInternetELB,
      isHaveInstanceAttached: isHaveInstanceAttached,
      isAttachELBToMultiAZ: isAttachELBToMultiAZ,
      isRedirectPortHttpsToHttp: isRedirectPortHttpsToHttp,
      isHaveRepeatListener: isHaveRepeatListener,
      isHaveSSLCert: isHaveSSLCert,
      isRuleInboundToELBListener: isRuleInboundToELBListener,
      isRuleOutboundToInstanceListener: isRuleOutboundToInstanceListener,
      isRuleInboundInstanceForELBListener: isRuleInboundInstanceForELBListener
    };
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/ec2/securitygroup',['constant', 'MC', 'i18n!nls/lang.js'], function(constant, MC, lang) {
    var getAllRefComp, isAssociatedSGNumExceedLimit, isELBDefaultSG, isHaveFullZeroOutboundRule, isHaveFullZeroSourceToHTTPRule, isHaveUsingAllProtocolRule, isHaveUsingPort22Rule, isSGRuleExceedFitNum, isStackUsingOnlyOneSG;
    getAllRefComp = function(sgUID) {
      var refCompAry, refNum, sgAry;
      refNum = 0;
      sgAry = [];
      refCompAry = [];
      _.each(MC.canvas_data.component, function(comp) {
        var compType, _sgAry;
        compType = comp.type;
        if (compType === 'AWS.ELB' || compType === 'AWS.AutoScaling.LaunchConfiguration') {
          sgAry = comp.resource.SecurityGroups;
          sgAry = _.map(sgAry, function(value) {
            var refSGUID;
            refSGUID = MC.extractID(value);
            return refSGUID;
          });
          if (__indexOf.call(sgAry, sgUID) >= 0) {
            refCompAry.push(comp);
          }
        }
        if (compType === 'AWS.EC2.Instance') {
          sgAry = comp.resource.SecurityGroupId;
          sgAry = _.map(sgAry, function(value) {
            var refSGUID;
            refSGUID = MC.extractID(value);
            return refSGUID;
          });
          if (__indexOf.call(sgAry, sgUID) >= 0) {
            refCompAry.push(comp);
          }
        }
        if (compType === 'AWS.VPC.NetworkInterface') {
          _sgAry = [];
          _.each(comp.resource.GroupSet, function(sgObj) {
            _sgAry.push(sgObj.GroupId);
            return null;
          });
          sgAry = _sgAry;
          sgAry = _.map(sgAry, function(value) {
            var refSGUID;
            refSGUID = MC.extractID(value);
            return refSGUID;
          });
          if (__indexOf.call(sgAry, sgUID) >= 0) {
            refCompAry.push(comp);
          }
        }
        return null;
      });
      return refCompAry;
    };
    isELBDefaultSG = function(sgUID) {
      var component;
      component = MC.canvas_data.component[sgUID];
      return component && component.name.indexOf("elbsg-") === 0;
    };
    isSGRuleExceedFitNum = function(sgUID) {
      var platformType, sgComp, sgInboundRuleAry, sgName, sgOutboundRuleAry, sgTotalRuleNum, tipInfo;
      sgComp = MC.canvas_data.component[sgUID];
      sgInboundRuleAry = sgComp.resource.IpPermissions;
      sgOutboundRuleAry = sgComp.resource.IpPermissionsEgress;
      sgTotalRuleNum = 0;
      if (sgInboundRuleAry) {
        sgTotalRuleNum += sgInboundRuleAry.length;
      }
      if (sgOutboundRuleAry) {
        sgTotalRuleNum += sgOutboundRuleAry.length;
      }
      platformType = MC.canvas_data.platform;
      if (platformType !== MC.canvas.PLATFORM_TYPE.EC2_CLASSIC) {
        if (sgTotalRuleNum > 50) {
          sgName = sgComp.name;
          tipInfo = sprintf(lang.ide.TA_MSG_WARNING_SG_RULE_EXCEED_FIT_NUM, sgName, 50);
          return {
            level: constant.TA.WARNING,
            info: tipInfo,
            uid: sgUID
          };
        }
      } else {
        if (sgTotalRuleNum > 100) {
          sgName = sgComp.name;
          tipInfo = sprintf(lang.ide.TA_MSG_WARNING_SG_RULE_EXCEED_FIT_NUM, sgName, 100);
          return {
            level: constant.TA.WARNING,
            info: tipInfo,
            uid: sgUID
          };
        }
      }
      return null;
    };
    isStackUsingOnlyOneSG = function() {
      var refSGNum, tipInfo;
      refSGNum = 0;
      _.each(MC.canvas_data.component, function(compObj) {
        var allRefComp, sgUID;
        if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_SecurityGroup) {
          sgUID = compObj.uid;
          allRefComp = getAllRefComp(sgUID);
          if (allRefComp.length > 0) {
            refSGNum++;
          }
        }
        return null;
      });
      if (refSGNum === 1) {
        tipInfo = sprintf(lang.ide.TA_MSG_NOTICE_STACK_USING_ONLY_ONE_SG);
        return {
          level: constant.TA.NOTICE,
          info: tipInfo
        };
      } else {
        return null;
      }
    };
    isHaveUsingAllProtocolRule = function(sgUID) {
      var allRefComp, haveAllProtocolRule, sgComp, sgInboundRuleAry, sgName, sgOutboundRuleAry, tipInfo;
      allRefComp = getAllRefComp(sgUID);
      if (allRefComp.length === 0) {
        return null;
      }
      if (isELBDefaultSG(sgUID)) {
        return null;
      }
      sgComp = MC.canvas_data.component[sgUID];
      sgInboundRuleAry = sgComp.resource.IpPermissions;
      sgOutboundRuleAry = sgComp.resource.IpPermissionsEgress;
      haveAllProtocolRule = false;
      _.each(sgInboundRuleAry, function(ruleObj) {
        var ruleProtocol;
        ruleProtocol = ruleObj.IpProtocol;
        if (ruleProtocol === '-1' || ruleProtocol === (-1)) {
          haveAllProtocolRule = true;
        }
        return null;
      });
      if (!haveAllProtocolRule) {
        _.each(sgOutboundRuleAry, function(ruleObj) {
          var ruleProtocol;
          ruleProtocol = ruleObj.IpProtocol;
          if (ruleProtocol === '-1' || ruleProtocol === (-1)) {
            haveAllProtocolRule = true;
          }
          return null;
        });
      }
      if (haveAllProtocolRule) {
        sgName = sgComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_WARNING_SG_USING_ALL_PROTOCOL_RULE, sgName);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: sgUID
        };
      }
      return null;
    };
    isHaveFullZeroSourceToHTTPRule = function(sgUID) {
      var allRefComp, isFullZeroTargetOtherPort, sgComp, sgInboundRuleAry, sgName, tipInfo, validPortAry1, validPortAry2;
      allRefComp = getAllRefComp(sgUID);
      if (allRefComp.length === 0) {
        return null;
      }
      if (isELBDefaultSG(sgUID)) {
        return null;
      }
      sgComp = MC.canvas_data.component[sgUID];
      sgInboundRuleAry = sgComp.resource.IpPermissions;
      isFullZeroTargetOtherPort = false;
      validPortAry1 = [80, '80'];
      validPortAry2 = [443, '443'];
      _.each(sgInboundRuleAry, function(ruleObj) {
        var _ref, _ref1, _ref2, _ref3;
        if (ruleObj.IpRanges === '0.0.0.0/0') {
          if (!(((_ref = ruleObj.FromPort, __indexOf.call(validPortAry1, _ref) >= 0) && (_ref1 = ruleObj.ToPort, __indexOf.call(validPortAry1, _ref1) >= 0)) || ((_ref2 = ruleObj.FromPort, __indexOf.call(validPortAry2, _ref2) >= 0) && (_ref3 = ruleObj.ToPort, __indexOf.call(validPortAry2, _ref3) >= 0)))) {
            isFullZeroTargetOtherPort = true;
          }
        }
        return null;
      });
      if (isFullZeroTargetOtherPort) {
        sgName = sgComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_WARNING_SG_RULE_FULL_ZERO_SOURCE_TARGET_TO_OTHER_PORT, sgName);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: sgUID
        };
      }
      return null;
    };
    isHaveUsingPort22Rule = function(sgUID) {
      var allRefComp, isUsingPort22, sgComp, sgInboundRuleAry, sgName, sgOutboundRuleAry, tipInfo, validPortAry;
      allRefComp = getAllRefComp(sgUID);
      if (allRefComp.length === 0) {
        return null;
      }
      if (isELBDefaultSG(sgUID)) {
        return null;
      }
      sgComp = MC.canvas_data.component[sgUID];
      sgInboundRuleAry = sgComp.resource.IpPermissions;
      sgOutboundRuleAry = sgComp.resource.IpPermissionsEgress;
      isUsingPort22 = false;
      validPortAry = [22, '22'];
      _.each(sgInboundRuleAry, function(ruleObj) {
        var _ref, _ref1;
        if ((_ref = ruleObj.FromPort, __indexOf.call(validPortAry, _ref) >= 0) && (_ref1 = ruleObj.ToPort, __indexOf.call(validPortAry, _ref1) >= 0)) {
          isUsingPort22 = true;
        }
        return null;
      });
      if (isUsingPort22) {
        sgName = sgComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_NOTICE_SG_RULE_USING_PORT_22, sgName);
        return {
          level: constant.TA.NOTICE,
          info: tipInfo,
          uid: sgUID
        };
      }
      return null;
    };
    isHaveFullZeroOutboundRule = function(sgUID) {
      var allRefComp, isHaveFullZeroOutbound, sgComp, sgName, sgOutboundRuleAry, tipInfo;
      allRefComp = getAllRefComp(sgUID);
      if (allRefComp.length === 0) {
        return null;
      }
      if (isELBDefaultSG(sgUID)) {
        return null;
      }
      sgComp = MC.canvas_data.component[sgUID];
      sgOutboundRuleAry = sgComp.resource.IpPermissionsEgress;
      isHaveFullZeroOutbound = false;
      _.each(sgOutboundRuleAry, function(ruleObj) {
        if (ruleObj.IpRanges === '0.0.0.0/0') {
          isHaveFullZeroOutbound = true;
        }
        return null;
      });
      if (isHaveFullZeroOutbound) {
        sgName = sgComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_WARNING_SG_RULE_HAVE_FULL_ZERO_OUTBOUND, sgName);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: sgUID
        };
      }
      return null;
    };
    isAssociatedSGNumExceedLimit = function() {
      var maxSGNumLimit, platformType, taResultAry;
      maxSGNumLimit = 5;
      platformType = MC.canvas_data.platform;
      if (platformType === MC.canvas.PLATFORM_TYPE.EC2_CLASSIC) {
        maxSGNumLimit = 500;
      }
      taResultAry = [];
      _.each(MC.canvas_data.component, function(comp) {
        var compName, compType, compUID, instanceComp, instanceName, instanceUID, instanceUIDRef, isExceedLimit, resTypeName, sgAry, taObj, tagName, tipInfo, _ref;
        compType = comp.type;
        compName = comp.name;
        compUID = comp.uid;
        isExceedLimit = false;
        sgAry = [];
        resTypeName = '';
        tagName = '';
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_ELB) {
          sgAry = comp.resource.SecurityGroups;
          resTypeName = 'Load Balancer';
          tagName = 'elb';
        }
        if (compType === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
          sgAry = comp.resource.SecurityGroups;
          resTypeName = 'Launch Configuration';
          tagName = 'lc';
        } else if (compType === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
          sgAry = comp.resource.SecurityGroupId;
          resTypeName = 'Instance';
          tagName = 'instance';
        } else if (compType === constant.AWS_RESOURCE_TYPE.AWS_VPC_NetworkInterface) {
          _.each(comp.resource.GroupSet, function(sgObj) {
            sgAry.push(sgObj.GroupId);
            return null;
          });
          resTypeName = 'Network Interface';
          tagName = 'eni';
          if ((_ref = comp.resource.Attachment.DeviceIndex) === 0 || _ref === '0') {
            instanceUIDRef = comp.resource.Attachment.InstanceId;
            if (instanceUIDRef) {
              instanceUID = MC.extractID(instanceUIDRef);
              instanceComp = MC.canvas_data.component[instanceUID];
              if (instanceComp) {
                instanceName = instanceComp.name;
                resTypeName = 'Instance';
                tagName = 'instance';
                compName = instanceName;
              }
            }
          }
        }
        if (sgAry.length > maxSGNumLimit) {
          tipInfo = sprintf(lang.ide.TA_MSG_ERROR_RESOURCE_ASSOCIATED_SG_EXCEED_LIMIT, resTypeName, tagName, compName, maxSGNumLimit);
          taObj = {
            level: constant.TA.ERROR,
            info: tipInfo,
            uid: compUID
          };
          taResultAry.push(taObj);
        }
        return null;
      });
      if (taResultAry.length > 0) {
        return taResultAry;
      }
      return null;
    };
    return {
      isSGRuleExceedFitNum: isSGRuleExceedFitNum,
      isStackUsingOnlyOneSG: isStackUsingOnlyOneSG,
      isHaveUsingAllProtocolRule: isHaveUsingAllProtocolRule,
      isHaveFullZeroSourceToHTTPRule: isHaveFullZeroSourceToHTTPRule,
      isHaveUsingPort22Rule: isHaveUsingPort22Rule,
      isHaveFullZeroOutboundRule: isHaveFullZeroOutboundRule,
      isAssociatedSGNumExceedLimit: isAssociatedSGNumExceedLimit
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/asg/asg',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isELBHasHealthCheck, isHasLaunchConfiguration;
    isHasLaunchConfiguration = function(uid) {
      var asg, tipInfo;
      asg = MC.canvas_data.component[uid];
      if (asg.resource.LaunchConfigurationName) {
        return null;
      }
      tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ASG_HAS_NO_LAUNCH_CONFIG, asg.name);
      return {
        level: constant.TA.ERROR,
        info: tipInfo,
        uid: uid
      };
    };
    isELBHasHealthCheck = function(uid) {
      var asg, isConnectELB, tipInfo;
      asg = MC.canvas_data.component[uid];
      isConnectELB = MC.canvas_data.component[uid].resource.LoadBalancerNames.length > 0;
      if (!isConnectELB || isConnectELB && asg.resource.HealthCheckType === 'ELB') {
        return null;
      }
      tipInfo = sprintf(lang.ide.TA_MSG_WARNING_ELB_HEALTH_NOT_CHECK, asg.name);
      return {
        level: constant.TA.WARNING,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isHasLaunchConfiguration: isHasLaunchConfiguration,
      isELBHasHealthCheck: isELBHasHealthCheck
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/ec2/eip',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isHasIGW, _hasType;
    isHasIGW = function() {
      var tipInfo, _ref;
      if (((_ref = MC.canvas_data.platform) === MC.canvas.PLATFORM_TYPE.EC2_CLASSIC || _ref === MC.canvas.PLATFORM_TYPE.DEFAULT_VPC)) {
        return null;
      }
      if (!_hasType(constant.AWS_RESOURCE_TYPE.AWS_EC2_EIP) || _hasType(constant.AWS_RESOURCE_TYPE.AWS_VPC_InternetGateway)) {
        return null;
      }
      tipInfo = lang.ide.TA_MSG_ERROR_HAS_EIP_NOT_HAS_IGW;
      return {
        level: constant.TA.ERROR,
        info: tipInfo
      };
    };
    _hasType = function(type) {
      var components;
      components = MC.canvas_data.component;
      return _.some(components, function(component) {
        return component.type === type;
      });
    };
    return {
      isHasIGW: isHasIGW
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/ec2/az',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isAZAlone;
    isAZAlone = function() {
      var count, instanceCount, tipInfo;
      instanceCount = _.countBy(MC.canvas_data.component, function(compObj) {
        var _ref;
        if ((_ref = compObj.type) === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance || _ref === constant.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
          return 'instance';
        } else {
          return 'others';
        }
      });
      if (!instanceCount.instance) {
        return null;
      }
      count = _.countBy(MC.canvas_data.component, function(component) {
        if (component.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_AvailabilityZone) {
          return 'az';
        } else {
          return 'others';
        }
      });
      if (count.az > 1) {
        return null;
      }
      tipInfo = lang.ide.TA_MSG_WARNING_SINGLE_AZ;
      return {
        level: constant.TA.WARNING,
        info: tipInfo
      };
    };
    return {
      isAZAlone: isAZAlone
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/vgw',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isConnectToRTB;
    isConnectToRTB = function(uid) {
      var components, isConnectRTB, tipInfo, vpn, vpnId;
      components = MC.canvas_data.component;
      vpn = components[uid];
      vpnId = MC.aws.aws.genResRef(uid, 'resource.VpnGatewayId');
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_RouteTable) {
          return _.some(component.resource.RouteSet, function(rt) {
            var RTB;
            if (rt.GatewayId === vpnId) {
              RTB = component;
              return true;
            }
          });
        }
      });
      if (isConnectRTB) {
        return null;
      }
      tipInfo = lang.ide.TA_MSG_WARNING_NO_RTB_CONNECT_VGW;
      return {
        level: constant.TA.WARNING,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isConnectToRTB: isConnectToRTB
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/vpn',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isVPNHaveIPForStaticCGW, isVPNPrefixIPNotValid;
    isVPNHaveIPForStaticCGW = function(uid) {
      var bgpAsn, cgwComp, cgwName, cgwRef, cgwUID, isHaveNoEmptyRoute, isStaticCGW, returnObj, routeAry, tipInfo, vgwComp, vgwName, vgwRef, vgwUID, vpnComp;
      returnObj = null;
      vpnComp = MC.canvas_data.component[uid];
      cgwRef = vpnComp.resource.CustomerGatewayId;
      vgwRef = vpnComp.resource.VpnGatewayId;
      cgwUID = '';
      if (cgwRef) {
        cgwUID = MC.extractID(cgwRef);
      }
      vgwUID = '';
      if (vgwRef) {
        vgwUID = MC.extractID(vgwRef);
      }
      if (cgwUID && vgwUID) {
        cgwComp = MC.canvas_data.component[cgwUID];
        vgwComp = MC.canvas_data.component[vgwUID];
        if (cgwComp) {
          isStaticCGW = true;
          bgpAsn = cgwComp.resource.BgpAsn;
          if (bgpAsn && _.isNumber(Number(bgpAsn))) {
            isStaticCGW = false;
          }
          if (isStaticCGW) {
            routeAry = vpnComp.resource.Routes;
            isHaveNoEmptyRoute = true;
            if (!routeAry.length) {
              isHaveNoEmptyRoute = false;
            }
            if (_.isArray(routeAry)) {
              _.each(routeAry, function(routeObj) {
                if (!routeObj.DestinationCidrBlock) {
                  isHaveNoEmptyRoute = false;
                }
                return null;
              });
            }
            if (isStaticCGW && !isHaveNoEmptyRoute) {
              vgwName = vgwComp.name;
              cgwName = cgwComp.name;
              tipInfo = sprintf(lang.ide.TA_MSG_ERROR_VPN_NO_IP_FOR_STATIC_CGW, cgwName, vgwName);
              returnObj = {
                level: constant.TA.ERROR,
                info: tipInfo,
                uid: uid
              };
            }
          }
        }
      }
      return returnObj;
    };
    isVPNPrefixIPNotValid = function(uid) {
      var invalidRouteCIDRAry, returnObj, routeAry, tipInfo, vpnComp, vpnName;
      returnObj = null;
      vpnComp = MC.canvas_data.component[uid];
      vpnName = vpnComp.name;
      routeAry = vpnComp.resource.Routes;
      invalidRouteCIDRAry = [];
      _.each(routeAry, function(routeObj) {
        var isInAnyPriIPRange, isInAnyPubIPRange, routeCIDR, routeIP;
        routeCIDR = routeObj.DestinationCidrBlock;
        if (routeCIDR) {
          routeIP = routeCIDR.split('/')[0];
          isInAnyPubIPRange = MC.aws.aws.isValidInIPRange(routeIP, 'public');
          isInAnyPriIPRange = MC.aws.aws.isValidInIPRange(routeIP, 'private');
        }
        if (isInAnyPubIPRange && !isInAnyPriIPRange) {
          return invalidRouteCIDRAry.push(routeCIDR);
        }
      });
      if (invalidRouteCIDRAry.length) {
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_VPN_NOT_PUBLIC_IP, vpnName, invalidRouteCIDRAry.join(', '));
        returnObj = {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: uid
        };
      }
      return returnObj;
    };
    return {
      isVPNHaveIPForStaticCGW: isVPNHaveIPForStaticCGW,
      isVPNPrefixIPNotValid: isVPNPrefixIPNotValid
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/igw',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isConnectToRTB;
    isConnectToRTB = function(uid) {
      var components, igw, igwId, isConnectRTB, tipInfo;
      components = MC.canvas_data.component;
      igw = components[uid];
      igwId = MC.aws.aws.genResRef(uid, 'resource.InternetGatewayId');
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_RouteTable) {
          return _.some(component.resource.RouteSet, function(rt) {
            var RTB;
            if (rt.GatewayId === igwId) {
              RTB = component;
              return true;
            }
          });
        }
      });
      if (isConnectRTB) {
        return null;
      }
      tipInfo = lang.ide.TA_MSG_WARNING_NO_RTB_CONNECT_IGW;
      return {
        level: constant.TA.WARNING,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isConnectToRTB: isConnectToRTB
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/networkacl',['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isConnectSubnetButNoAllowRule;
    isConnectSubnetButNoAllowRule = function(uid) {
      var HasAllowACLRule, acl, components, connectSubnet, tipInfo;
      components = MC.canvas_data.component;
      acl = components[uid];
      connectSubnet = _.some(acl.resource.AssociationSet, function(as) {
        if (as.SubnetId) {
          return true;
        }
      });
      HasAllowACLRule = _.some(acl.resource.EntrySet, function(es) {
        return es.RuleAction === 'allow';
      });
      if (!connectSubnet || HasAllowACLRule) {
        return null;
      }
      tipInfo = sprintf(lang.ide.TA_MSG_NOTICE_ACL_HAS_NO_ALLOW_RULE, acl.name);
      return {
        level: constant.TA.NOTICE,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isConnectSubnetButNoAllowRule: isConnectSubnetButNoAllowRule
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/cgw',['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'customergateway_service', '../result_vo'], function(constant, $, MC, lang, cgwService) {
    var isCGWHaveIPConflict, isValidCGWIP;
    isCGWHaveIPConflict = function(callback) {
      var currentRegion, err, stackCGWIP, stackCGWName, stackCGWUID, tipInfo;
      try {
        if (!callback) {
          callback = function() {};
        }
        stackCGWIP = stackCGWName = stackCGWUID = null;
        _.each(MC.canvas_data.component, function(compObj) {
          var stackCGWId;
          if (compObj.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_CustomerGateway) {
            stackCGWId = compObj.resource.CustomerGatewayId;
            stackCGWIP = compObj.resource.IpAddress;
            stackCGWName = compObj.name;
            stackCGWUID = compObj.uid;
          }
          return null;
        });
        if (stackCGWIP && stackCGWName && stackCGWUID && !stackCGWId) {
          currentRegion = MC.canvas_data.region;
          cgwService.DescribeCustomerGateways({
            sender: this
          }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, [], null, function(result) {
            var cgwObjAry, checkResult, conflictInfo, validResultObj;
            checkResult = true;
            conflictInfo = null;
            if (!result.is_error) {
              cgwObjAry = result.resolved_data;
              _.each(cgwObjAry, function(cgwObj) {
                var cgwIP, cgwId, cgwState;
                cgwId = cgwObj.customerGatewayId;
                cgwIP = cgwObj.ipAddress;
                cgwState = cgwObj.state;
                if (stackCGWIP === cgwIP && cgwState === 'available') {
                  conflictInfo = sprintf(lang.ide.TA_MSG_ERROR_CGW_IP_CONFLICT, stackCGWName, stackCGWIP, cgwId, cgwIP);
                  checkResult = false;
                }
                return null;
              });
            } else {
              callback(null);
            }
            if (checkResult) {
              callback(null);
            } else {
              validResultObj = {
                level: constant.TA.ERROR,
                info: conflictInfo
              };
              callback(validResultObj);
              console.log(validResultObj);
            }
            return null;
          });
          tipInfo = sprintf(lang.ide.TA_MSG_ERROR_CGW_CHECKING_IP_CONFLICT);
          return {
            level: constant.TA.ERROR,
            info: tipInfo
          };
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    isValidCGWIP = function(uid) {
      var cgwComp, cgwIP, cgwName, isInAnyPriIPRange, tipInfo;
      cgwComp = MC.canvas_data.component[uid];
      cgwName = cgwComp.name;
      cgwIP = cgwComp.resource.IpAddress;
      isInAnyPriIPRange = MC.aws.aws.isValidInIPRange(cgwIP, 'private');
      if (isInAnyPriIPRange) {
        tipInfo = sprintf(lang.ide.TA_MSG_WARNING_CGW_IP_RANGE_ERROR, cgwName, cgwIP);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: uid
        };
      }
      return null;
    };
    return {
      isCGWHaveIPConflict: isCGWHaveIPConflict,
      isValidCGWIP: isValidCGWIP
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/eni',['constant', 'MC', 'i18n!nls/lang.js'], function(constant, MC, lang) {
    var isENIAttachToInstance;
    isENIAttachToInstance = function(eniUID) {
      var attachedInstanceId, eniComp, eniName, tipInfo;
      eniComp = MC.canvas_data.component[eniUID];
      attachedInstanceId = eniComp.resource.Attachment.InstanceId;
      if (attachedInstanceId) {
        return null;
      } else {
        eniName = eniComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ENI_NOT_ATTACH_TO_INSTANCE, eniName);
        return {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: eniUID
        };
      }
    };
    return {
      isENIAttachToInstance: isENIAttachToInstance
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/vpc/rtb',['constant', 'MC', '../../helper', 'Design'], function(CONST, MC, Helper, Design) {
    var i18n, isRtbConnectedNatAndItConnectedSubnet, isRtbHaveConflictDestination;
    i18n = Helper.i18n.short();
    isRtbConnectedNatAndItConnectedSubnet = function(uid) {
      var connectedInstances, instance, instanceName, instanceNameStr, notices, rtb, rtbName, subnets, suspectInstances, _i, _len;
      rtb = Design.instance().component(uid);
      rtbName = rtb.get('name');
      suspectInstances = rtb.connectionTargets('RTB_Route');
      subnets = rtb.connectionTargets('RTB_Asso');
      instanceNameStr = '';
      connectedInstances = _.filter(suspectInstances, function(comp) {
        return comp.type === CONST.RESTYPE.INSTANCE;
      });
      notices = [];
      if (subnets.length) {
        for (_i = 0, _len = connectedInstances.length; _i < _len; _i++) {
          instance = connectedInstances[_i];
          instanceName = instance.get('name');
          notices.push(Helper.message.notice(uid + instance.id, i18n.TA_MSG_NOTICE_RT_ROUTE_NAT, instanceName, rtbName, instanceName, rtbName));
        }
        return notices;
      }
      return null;
    };
    isRtbHaveConflictDestination = function(uid) {
      var notices, routeDesAry, routeSet, rtb, rtbName;
      rtb = MC.canvas_data.component[uid];
      routeSet = rtb.resource.RouteSet;
      rtbName = rtb.name;
      routeDesAry = [];
      notices = [];
      _.each(routeSet, function(route) {
        var currentRouteDes;
        currentRouteDes = route.DestinationCidrBlock;
        _.each(routeDesAry, function(routeDes) {
          var tipInfo;
          if (MC.aws.subnet.isSubnetConflict(currentRouteDes, routeDes)) {
            tipInfo = sprintf(i18n.TA_MSG_ERROR_RT_HAVE_CONFLICT_DESTINATION, rtbName);
            return notices.push({
              level: CONST.TA.ERROR,
              info: tipInfo,
              uid: uid
            });
          }
        });
        return routeDesAry.push(currentRouteDes);
      });
      if (notices.length) {
        return notices;
      }
      return null;
    };
    return {
      isRtbConnectedNatAndItConnectedSubnet: isRtbConnectedNatAndItConnectedSubnet,
      isRtbHaveConflictDestination: isRtbHaveConflictDestination
    };
  });

}).call(this);


/*
This file use for validate state.
 */

(function() {
  define('component/trustedadvisor/validation/stateeditor/validation/reference',['constant', 'MC', 'i18n!nls/lang.js'], function(CONST, MC, lang) {
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


/*
This file use for validate state.
 */

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/stateeditor/validation/format',['Design', 'constant', 'i18n!nls/lang.js', 'jquery', 'underscore', 'MC'], function(Design, constant, lang) {
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

(function() {
  define('component/trustedadvisor/validation/stateeditor/register',['./validation/reference', './validation/format'], function(reference, format) {
    return [reference, format];
  });

}).call(this);


/*
This file use for validate state.
 */

(function() {
  define('component/trustedadvisor/validation/stateeditor/main',['./register', 'constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(validators, constant, MC, lang, resultVO) {
    var isStateValid, __checkState, __modifyUid;
    __modifyUid = function(result, uid, index) {
      var r, _i, _len, _ref;
      if (result) {
        if (!_.isArray(result)) {
          result = [result];
        }
        _ref = result || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          r.uid = "" + uid + ":" + index + ":" + r.uid;
        }
      }
      return result;
    };
    __checkState = function(state, data) {
      var index, result, results, validator;
      results = [];
      for (index in validators) {
        validator = validators[index];
        result = validator(state, data);
        result = __modifyUid(result, data.uid, index);
        results = results.concat(result);
      }
      return results;
    };
    isStateValid = function(uid) {
      var component, data, errs, states;
      component = MC.canvas_data.component[uid];
      if (!component || !component.state || component.index && component.index > 0) {
        return null;
      }
      states = component.state;
      data = {
        uid: uid,
        comp: component,
        type: component.type,
        name: component.name,
        stateId: null
      };
      errs = [];
      _.each(states, function(state, id) {
        errs = errs.concat(__checkState(state, _.extend({}, data, {
          stateId: id + 1
        })));
        return null;
      });
      if (!errs.length) {
        errs = null;
      }
      return errs;
    };
    return isStateValid;
  });

}).call(this);


/*
This file use for validate component about state.
 */

(function() {
  define('component/trustedadvisor/validation/state/state',['constant', 'MC', '../result_vo', 'Design', '../../helper'], function(CONST, MC, resultVO, Design, Helper) {
    var i18n, isConnectedOut, isHasIgw, isHasOutPort80and443, isHasOutPort80and443Strict, __genConnectedError, __getComp, __getEniByInstance, __getSg, __getSubnetRtb, __hasEipOrPublicIp, __hasState, __hasType, __isEniSourceDestUncheck, __isInstanceConnectedOut, __isInstanceNat, __isLcConnectedOut, __isPortTcpAllowed, __isRouteIgw, __natOut, __selfOut, __sgsHasOutPort80and443, __wrap;
    i18n = Helper.i18n.short();
    __wrap = function(method) {
      return function(uid) {
        if (__hasState(uid)) {
          return method(uid);
        } else {
          return null;
        }
      };
    };
    __getComp = function(uid, rework) {
      if (rework) {
        return Design.instance().component(uid);
      } else {
        return MC.canvas_data.component[uid];
      }
    };
    __hasState = function(uid) {
      var component, had, state;
      if (Design.instance().get('agent').enabled === false) {
        return false;
      }
      if (uid) {
        component = __getComp(uid, true);
        if (component) {
          state = component.get('state');
          return state && state.length;
        } else {
          return false;
        }
      } else {
        had = false;
        Design.instance().eachComponent(function(component) {
          if (__hasState(component.id)) {
            had = true;
            return false;
          }
        });
        return had;
      }
    };
    __hasType = function(type) {
      return Design.modelClassForType(type).allObjects().length;
    };
    __getEniByInstance = function(instance) {
      return _.filter(MC.canvas_data.component, function(component) {
        if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_VPC_NetworkInterface) {
          if (MC.extractID(component.resource.Attachment.InstanceId) === instance.uid) {
            return true;
          }
        }
      });
    };
    __getSg = function(component) {
      var eni, enis, sg, sgId, sgs, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      sgs = [];
      if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
        _ref = component.resource.SecurityGroups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sgId = _ref[_i];
          sgs.push(__getComp(MC.extractID(sgId)));
        }
      } else if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
        enis = __getEniByInstance(component);
        for (_j = 0, _len1 = enis.length; _j < _len1; _j++) {
          eni = enis[_j];
          _ref1 = eni.resource.GroupSet;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            sg = _ref1[_k];
            sgs.push(__getComp(MC.extractID(sg.GroupId)));
          }
        }
      }
      return _.uniq(_.compact(sgs));
    };
    __isPortTcpAllowed = function(permission, port) {
      var formPort, res, toPort, _ref;
      res = false;
      if ((_ref = permission.IpProtocol) === '-1' || _ref === '6' || _ref === 'tcp') {
        formPort = +permission.FromPort;
        toPort = +permission.ToPort;
        if ((formPort === toPort && toPort === port)) {
          res = true;
        } else if (+permission.FromPort <= port && permission.ToPort >= port) {
          res = true;
        }
      }
      return res;
    };
    __sgsHasOutPort80and443 = function(sgs, strict) {
      var permission, sg, __443, __80, _i, _j, _len, _len1, _ref;
      __80 = __443 = 0;
      for (_i = 0, _len = sgs.length; _i < _len; _i++) {
        sg = sgs[_i];
        _ref = sg.resource.IpPermissionsEgress;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          permission = _ref[_j];
          if (strict && permission.IpRanges === '0.0.0.0/0' || !strict) {
            if (__isPortTcpAllowed(permission, 80)) {
              __80++;
            }
            if (__isPortTcpAllowed(permission, 443)) {
              __443++;
            }
          }
        }
      }
      return __80 > 0 && __443 > 0;
    };
    __hasEipOrPublicIp = function(component) {
      var enis, hasEip, lc;
      if (component.type === "ExpandedAsg") {
        lc = component.get('originalAsg').get('lc');
        return lc.get('publicIp') === true;
      } else if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
        return component.get('publicIp') === true;
      } else if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
        enis = component.connectionTargets('EniAttachment');
        enis.push(component.getEmbedEni());
        hasEip = _.some(enis, function(eni) {
          return eni.hasEip();
        });
        return component.hasAutoAssignPublicIp() || hasEip;
      }
    };
    __getSubnetRtb = function(component) {
      var subnet;
      subnet = component.parent();
      if (subnet.type !== CONST.AWS_RESOURCE_TYPE.AWS_VPC_Subnet) {
        subnet = subnet.parent();
      }
      return subnet.connectionTargets('RTB_Asso')[0];
    };
    __isRouteIgw = function(component) {
      var igw, rtb, rtbConn, uid;
      uid = component.uid || component.id;
      component = Design.instance().component(uid);
      rtb = __getSubnetRtb(component);
      rtbConn = rtb.connectionTargets('RTB_Route');
      igw = _.where(rtbConn, {
        type: CONST.AWS_RESOURCE_TYPE.AWS_VPC_InternetGateway
      });
      return igw.length > 0;
    };
    __natOut = function(component) {
      var instances, rtb;
      if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
        rtb = __getSubnetRtb(component);
        if (rtb) {
          instances = _.where(rtb.connectionTargets('RTB_Route'), {
            type: CONST.AWS_RESOURCE_TYPE.AWS_EC2_Instance
          });
          return _.some(instances, function(instance) {
            return __isInstanceNat(instance);
          });
        }
      }
      return false;
    };
    __isInstanceNat = function(instance) {
      return __isRouteIgw(instance) && __isEniSourceDestUncheck(instance);
    };
    __isEniSourceDestUncheck = function(instance) {
      var enis;
      enis = instance.connectionTargets('EniAttachment');
      enis.push(instance.getEmbedEni());
      return _.some(enis, function(eni) {
        return !eni.get('sourceDestCheck');
      });
    };
    __selfOut = function(component, result, subnetName) {
      var lc, name;
      if (!__hasEipOrPublicIp(component)) {
        name = component.get('name');
        if (component.type === 'ExpandedAsg') {
          lc = component.get('originalAsg').get('lc');
          subnetName = component.parent().get('name');
          name = lc && lc.get('name');
        }
        result.push(Helper.message.error(component.id, i18n.TA_MSG_ERROR_NO_EIP_OR_PIP, name, name, subnetName));
        return true;
      } else if (__isRouteIgw(component)) {
        return true;
      } else {
        return false;
      }
    };
    __genConnectedError = function(subnetName, uid) {
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_NOT_CONNECT_OUT, subnetName);
    };
    __isLcConnectedOut = function(uid) {
      var asg, expandedAsgs, lc, lcOld, result, subnet, subnetId, subnetName, _i, _len;
      lc = __getComp(uid, true);
      lcOld = __getComp(uid);
      result = [];
      asg = lc.parent();
      expandedAsgs = asg.get('expandedList');
      subnet = lc.parent().parent();
      subnetName = subnet.get('name');
      subnetId = subnet.id;
      if (!__selfOut(lc, result, subnetName)) {
        result.push(__genConnectedError(subnetName, subnetId));
      }
      for (_i = 0, _len = expandedAsgs.length; _i < _len; _i++) {
        asg = expandedAsgs[_i];
        if (!__selfOut(asg, result, subnetName)) {
          subnetName = asg.parent().get('name');
          result.push(__genConnectedError(subnetName, subnetId));
        }
      }
      return result;
    };
    __isInstanceConnectedOut = function(uid) {
      var component, result, subnet, subnetId, subnetName;
      component = __getComp(uid, true);
      result = [];
      subnet = component.parent();
      subnetName = subnet.get('name');
      subnetId = subnet.id;
      if (__natOut(component) || __selfOut(component, result, subnetName)) {
        return result;
      }
      result.push(__genConnectedError(subnetName, subnetId));
      return result;
    };

    /* Public */
    isHasIgw = function(uid) {
      if (__hasType(CONST.AWS_RESOURCE_TYPE.AWS_VPC_InternetGateway)) {
        return null;
      }
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_NO_CGW);
    };
    isHasOutPort80and443 = function(uid) {
      var component, sgs;
      component = __getComp(uid);
      sgs = __getSg(component);
      if (__sgsHasOutPort80and443(sgs)) {
        return null;
      }
      return Helper.message.error(uid, i18n.TA_MSG_ERROR_NO_OUTBOUND_RULES, component.name);
    };
    isHasOutPort80and443Strict = function(uid) {
      var component, sgs;
      component = __getComp(uid);
      sgs = __getSg(component);
      if (isHasOutPort80and443(uid) || __sgsHasOutPort80and443(sgs, true)) {
        return null;
      }
      return Helper.message.warning(uid, i18n.TA_MSG_WARNING_OUTBOUND_NOT_TO_ALL, component.name);
    };
    isConnectedOut = function(uid) {
      var component, result;
      result = [];
      component = __getComp(uid);
      if (component.type === CONST.AWS_RESOURCE_TYPE.AWS_AutoScaling_LaunchConfiguration) {
        return __isLcConnectedOut(uid);
      } else {
        return __isInstanceConnectedOut(uid);
      }
    };
    return {
      isHasIgw: __wrap(isHasIgw),
      isHasOutPort80and443: __wrap(isHasOutPort80and443),
      isHasOutPort80and443Strict: __wrap(isHasOutPort80and443Strict),
      isConnectedOut: __wrap(isConnectedOut)
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/main',['MC', './stack/stack', './ec2/instance', './vpc/subnet', './vpc/vpc', './elb/elb', './ec2/securitygroup', './asg/asg', './ec2/eip', './ec2/az', './vpc/vgw', './vpc/vpn', './vpc/igw', './vpc/networkacl', './vpc/cgw', './vpc/eni', './vpc/rtb', './stateeditor/main', './state/state'], function(MC, stack, instance, subnet, vpc, elb, sg, asg, eip, az, vgw, vpn, igw, acl, cgw, eni, rtb, stateEditor, state) {
    return {
      stack: stack,
      instance: instance,
      subnet: subnet,
      vpc: vpc,
      elb: elb,
      sg: sg,
      asg: asg,
      eip: eip,
      az: az,
      vgw: vgw,
      vpn: vpn,
      igw: igw,
      acl: acl,
      cgw: cgw,
      eni: eni,
      rtb: rtb,
      stateEditor: stateEditor,
      state: state
    };
  });

}).call(this);

(function() {
  define('validation',['constant', 'event', 'component/trustedadvisor/config', 'component/trustedadvisor/validation/main', 'component/trustedadvisor/validation/result_vo', 'jquery', 'underscore'], function(constant, ide_event, config, validation_main, resultVO) {
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

