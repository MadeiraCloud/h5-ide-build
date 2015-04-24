(function() {
  define('component/trustedadvisor/lib/TA.Config',{
    validDebug: '',
    syncTimeout: 10000,
    componentTypeToFileMap: {
      aws: {
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
        'AWS.VPC.RouteTable': ['rtb'],
        'AWS.EC2.EBS.Volume': ['ebs'],
        'AWS.EC2.KeyPair': ['kp'],
        'AWS.RDS.DBInstance': ['dbinstance'],
        'AWS.RDS.OptionGroup': ['og'],
        'AWS.RDS.DBSubnetGroup': ['sbg']
      },
      openstack: {
        'OS::Neutron::Port': ['osport'],
        'OS::Neutron::Subnet': ['ossubnet'],
        'OS::Neutron::Router': ['osrouter'],
        'OS::Neutron::Pool': ['ospool'],
        'OS::Neutron::VIP': ['oslistener']
      }
    },
    globalList: {
      aws: {
        eip: ['isHasIGW'],
        az: ['isAZAlone'],
        sg: ['isStackUsingOnlyOneSG', 'isAssociatedSGNumExceedLimit'],
        vpc: ['isVPCAbleConnectToOutside'],
        stack: ['~isHaveNotExistAMI'],
        kp: ['longLiveNotice'],
        dbinstance: ['isOgValid', 'isHaveEnoughIPForDB']
      },
      openstack: {
        ossubnet: ['subnetHasPortShouldConncectedOut', 'isSubnetCIDRConflict'],
        osstack: ['isResExtendQuotaLimit']
      }
    },
    asyncList: {
      aws: {
        cgw: ['isCGWHaveIPConflict'],
        stack: ['verify', 'isHaveNotExistAMIAsync'],
        subnet: ['getAllAWSENIForAppEditAndDefaultVPC'],
        ebs: ['isSnapshotExist'],
        kp: ['isKeyPairExistInAws'],
        elb: ['isSSLCertExist'],
        asg: ['isTopicNonexist'],
        vpc: ['isVPCUsingNonexistentDhcp'],
        og: ['isOGExeedCountLimit']
      },
      openstack: {}
    },
    get: function(key, platform) {
      var _ref;
      if (Design.instance().type() === "AwsOps") {
        platform = "aws";
      } else {
        platform = "openstack";
      }
      return ((_ref = this[key]) != null ? _ref[platform] : void 0) || this[key]['aws'];
    }
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/aws/stack/stack',['constant', 'jquery', 'MC', 'i18n!/nls/lang.js', 'ApiRequest', "CloudResources"], function(constant, $, MC, lang, ApiRequest, CloudResources) {
    var getAZAryForDefaultVPC, isHaveNotExistAMI, isHaveNotExistAMIAsync, verify, _getCompName, _getCompType;
    getAZAryForDefaultVPC = function(elbUID) {
      var azNameAry, elbComp, elbInstances;
      elbComp = MC.canvas_data.component[elbUID];
      elbInstances = elbComp.resource.Instances;
      azNameAry = [];
      _.each(elbInstances, function(instanceRefObj) {
        var instanceAZName, instanceRef, instanceUID;
        instanceRef = instanceRefObj.InstanceId;
        instanceUID = MC.extractID(instanceRef);
        instanceAZName = MC.canvas_data.component[instanceUID].resource.Placement.AvailabilityZone;
        if (!(__indexOf.call(azNameAry, instanceAZName) >= 0)) {
          azNameAry.push(instanceAZName);
        }
        return null;
      });
      return azNameAry;
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
        ApiRequest('stack_verify', {
          username: $.cookie('usercode'),
          session_id: $.cookie('session_id'),
          spec: validData
        }).then(function(result) {
          var checkResult, err, errCode, errCompName, errCompType, errCompUID, errInfoStr, errKey, errMessage, returnInfo, returnInfoObj, validResultObj;
          checkResult = true;
          returnInfo = null;
          errInfoStr = '';
          if (result !== true) {
            checkResult = false;
            try {
              returnInfo = result;
              returnInfoObj = JSON.parse(returnInfo);
              errCompUID = returnInfoObj.uid;
              errCode = returnInfoObj.code;
              errKey = returnInfoObj.key;
              errMessage = returnInfoObj.message;
              errCompName = _getCompName(errCompUID);
              errCompType = _getCompType(errCompUID);
              errInfoStr = sprintf(lang.TA.ERROR_STACK_FORMAT_VALID_FAILED, errCompName, errMessage);
              if (errCode === 'EMPTY_VALUE' && errKey === 'InstanceId' && errMessage === 'Key InstanceId can not empty' && errCompType === 'AWS.VPC.NetworkInterface') {
                checkResult = true;
              }
              if (errCode === 'EMPTY_VALUE' && errKey === 'LaunchConfigurationName' && errMessage === 'Key LaunchConfigurationName can not empty' && errCompType === 'AWS.AutoScaling.Group') {
                checkResult = true;
              }
              if (errCode === 'EMPTY_VALUE' && errKey === 'TopicARN' && errMessage === 'Key TopicARN can not empty' && errCompType === 'AWS.AutoScaling.NotificationConfiguration') {
                checkResult = true;
              }
            } catch (_error) {
              err = _error;
              errInfoStr = lang.TA.ERROR_STACK_FORMAT_VALID_ERROR;
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
        }, function(result) {
          return callback(null);
        });
        tipInfo = sprintf(lang.TA.ERROR_STACK_CHECKING_FORMAT_VALID);
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
      var amiAry, cr, err, failure, instanceAMIMap, success, tipInfoAry;
      try {
        if (!callback) {
          callback = function() {};
        }
        tipInfoAry = [];
        amiAry = [];
        instanceAMIMap = {};
        _.each(MC.canvas_data.component, function(compObj) {
          var imageId, instanceId;
          if (compObj.type === constant.RESTYPE.INSTANCE || compObj.type === constant.RESTYPE.LC) {
            imageId = compObj.resource.ImageId;
            instanceId = '';
            if (compObj.type === constant.RESTYPE.INSTANCE) {
              instanceId = compObj.resource.InstanceId;
            } else if (compObj.type === constant.RESTYPE.LC) {
              instanceId = compObj.resource.LaunchConfigurationARN;
            }
            if (imageId && (!instanceId)) {
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
          cr = CloudResources(constant.RESTYPE.AMI, MC.canvas_data.region);
          failure = function() {
            return callback(null);
          };
          success = function() {
            var amiId, id, infoObjType, infoTagType, instanceObj, instanceUID, invalids, _i, _j, _k, _len, _len1, _len2, _ref;
            invalids = [];
            for (_i = 0, _len = amiAry.length; _i < _len; _i++) {
              id = amiAry[_i];
              if (cr.isInvalidAmiId(id)) {
                invalids.push(id);
              }
            }
            if (!invalids.length) {
              return callback(null);
            }
            for (_j = 0, _len1 = invalids.length; _j < _len1; _j++) {
              amiId = invalids[_j];
              _ref = instanceAMIMap[amiId] || [];
              for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                instanceUID = _ref[_k];
                instanceObj = MC.canvas_data.component[instanceUID];
                if (instanceObj.type === constant.RESTYPE.LC) {
                  infoTagType = 'lc';
                  infoObjType = lang.PROP.LC_TITLE;
                } else {
                  infoTagType = "instance";
                  infoObjType = lang.PROP.ELB_INSTANCES;
                }
                tipInfoAry.push({
                  level: constant.TA.ERROR,
                  uid: instanceUID,
                  info: sprintf(lang.TA.ERROR_STACK_HAVE_NOT_EXIST_AMI, infoObjType, infoTagType, instanceObj.name, amiId)
                });
              }
            }
            if (tipInfoAry.length) {
              callback(tipInfoAry);
              return console.log(tipInfoAry);
            } else {
              return callback(null);
            }
          };
          cr.fetchAmis(amiAry).then(success, failure);
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    isHaveNotExistAMI = function() {
      var amiAry, amiCollection, instanceAMIMap, tipInfoAry;
      amiAry = [];
      instanceAMIMap = {};
      _.each(MC.canvas_data.component, function(compObj) {
        var imageId, instanceId;
        if (compObj.type === constant.RESTYPE.INSTANCE || compObj.type === constant.RESTYPE.LC) {
          imageId = compObj.resource.ImageId;
          instanceId = '';
          if (compObj.type === constant.RESTYPE.INSTANCE) {
            instanceId = compObj.resource.InstanceId;
          } else if (compObj.type === constant.RESTYPE.LC) {
            instanceId = compObj.resource.LaunchConfigurationARN;
          }
          if (imageId && (!instanceId)) {
            if (!instanceAMIMap[imageId]) {
              instanceAMIMap[imageId] = [];
              amiAry.push(imageId);
            }
            instanceAMIMap[imageId].push(compObj.uid);
          }
        }
        return null;
      });
      tipInfoAry = [];
      amiCollection = CloudResources(constant.RESTYPE.AMI, MC.canvas_data.region);
      _.each(amiAry, function(amiId) {
        var instanceUIDAry;
        if (!amiCollection.get(amiId)) {
          instanceUIDAry = instanceAMIMap[amiId];
          _.each(instanceUIDAry, function(instanceUID) {
            var infoObjType, infoTagType, instanceName, instanceObj, instanceType, tipInfo;
            instanceObj = MC.canvas_data.component[instanceUID];
            instanceType = instanceObj.type;
            instanceName = instanceObj.name;
            infoObjType = lang.PROP.ELB_INSTANCES;
            infoTagType = 'instance';
            if (instanceType === constant.RESTYPE.LC) {
              infoObjType = lang.PROP.LC_TITLE;
              infoTagType = 'lc';
            }
            tipInfo = sprintf(lang.TA.ERROR_STACK_HAVE_NOT_EXIST_AMI, infoObjType, infoTagType, instanceName, amiId);
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
  define('TaHelper',['constant', 'MC', 'i18n!/nls/lang.js', 'Design', 'underscore'], function(CONST, MC, LANG, Design, _) {
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
          return LANG.TA;
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
            if (component.type === CONST.RESTYPE.ENI) {
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
          if (component.type === CONST.RESTYPE.LC) {
            _ref = component.resource.SecurityGroups;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              sgId = _ref[_i];
              sgs.push(Helper.component.get(MC.extractID(sgId)));
            }
          } else if (component.type === CONST.RESTYPE.INSTANCE) {
            enis = Helper.eni.getByInstance(component);
            for (_j = 0, _len1 = enis.length; _j < _len1; _j++) {
              eni = enis[_j];
              _ref1 = eni.resource.GroupSet;
              for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                sg = _ref1[_k];
                sgs.push(Helper.component.get(MC.extractID(sg.GroupId)));
              }
            }
          } else if (component.type === CONST.RESTYPE.ELB) {
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
            if (proto === protocalCode || proto === 'all') {
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

  define('component/trustedadvisor/validation/aws/ec2/instance',['constant', 'MC', 'Design', 'TaHelper'], function(constant, MC, Design, Helper) {
    var i18n, isAssociatedSGRuleExceedFitNum, isConnectRoutTableButNoEIP, isEBSOptimizedForAttachedProvisionedVolume, isNatCheckedSourceDest, _getSGCompRuleLength;
    i18n = Helper.i18n.short();
    isEBSOptimizedForAttachedProvisionedVolume = function(instanceUID) {
      var amiId, haveProvisionedVolume, instanceComp, instanceName, instanceType, instanceUIDRef, isInstanceComp, lsgName, tipInfo, _ref;
      instanceComp = MC.canvas_data.component[instanceUID];
      instanceType = instanceComp.type;
      isInstanceComp = instanceType === constant.RESTYPE.INSTANCE;
      haveProvisionedVolume = false;
      instanceUIDRef = lsgName = amiId = null;
      if (instanceComp) {
        instanceUIDRef = MC.genResRef(instanceUID, 'resource.InstanceId');
      } else {
        lsgName = instanceComp.resource.LaunchConfigurationName;
        amiId = instanceComp.resource.ImageId;
      }
      _.each(MC.canvas_data.component, function(compObj) {
        if (compObj.type === constant.RESTYPE.VOL) {
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
        tipInfo = sprintf(i18n.NOTICE_INSTANCE_NOT_EBS_OPTIMIZED_FOR_ATTACHED_PROVISIONED_VOLUME, instanceName);
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
      var instanceComp, instanceName, instanceSGAry, instanceType, isInstanceComp, sgUIDAry, tipInfo, totalSGRuleNum;
      instanceComp = MC.canvas_data.component[instanceUID];
      instanceType = instanceComp.type;
      isInstanceComp = instanceType === constant.RESTYPE.INSTANCE;
      sgUIDAry = [];
      if (isInstanceComp) {
        _.each(MC.canvas_data.component, function(compObj) {
          var associatedInstanceRef, associatedInstanceUID, eniSGAry;
          if (compObj.type === constant.RESTYPE.ENI) {
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
        totalSGRuleNum = 0;
        _.each(sgUIDAry, function(sgUID) {
          totalSGRuleNum += _getSGCompRuleLength(sgUID);
          return null;
        });
        if (totalSGRuleNum > 50) {
          instanceName = instanceComp.name;
          tipInfo = sprintf(i18n.WARNING_INSTANCE_SG_RULE_EXCEED_FIT_NUM, instanceName, 50);
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
          tipInfo = sprintf(i18n.WARNING_INSTANCE_SG_RULE_EXCEED_FIT_NUM, instanceName, 100);
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
      instanceId = MC.genResRef(uid, 'resource.InstanceId');
      RTB = '';
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.RESTYPE.RT) {
          return _.some(component.resource.RouteSet, function(rt) {
            if (rt.InstanceId === instanceId) {
              RTB = component;
              return true;
            }
          });
        }
      });
      hasEIP = _.some(components, function(component) {
        if (component.type === constant.RESTYPE.EIP && component.resource.InstanceId === instanceId) {
          return true;
        }
      });
      if (!isConnectRTB || hasEIP) {
        return null;
      }
      tipInfo = sprintf(i18n.NOTICE_INSTANCE_HAS_RTB_NO_ELB, RTB.name, instance.name, instance.name);
      return {
        level: constant.TA.NOTICE,
        info: tipInfo,
        uid: uid
      };
    };
    isNatCheckedSourceDest = function(uid) {
      var connectedRt, enis, hasUncheck, instance;
      instance = Design.instance().component(uid);
      if (!instance) {
        return null;
      }
      connectedRt = instance.connectionTargets('RTB_Route');
      if (connectedRt && connectedRt.length) {
        enis = instance.connectionTargets('EniAttachment');
        enis.push(instance.getEmbedEni());
        hasUncheck = _.some(enis, function(eni) {
          return !eni.get('sourceDestCheck');
        });
        if (!hasUncheck) {
          return Helper.message.error(uid, i18n.ERROR_INSTANCE_NAT_CHECKED_SOURCE_DEST, instance.get('name'));
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
  define('component/trustedadvisor/validation/aws/vpc/subnet',['constant', 'jquery', 'MC', 'i18n!/nls/lang.js'], function(constant, $, MC, lang) {
    return {
      getAllAWSENIForAppEditAndDefaultVPC: function(callback) {
        return callback(null);
      }
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/vpc/vpc',['constant', 'MC', 'i18n!/nls/lang.js', 'Design', 'CloudResources', 'TaHelper'], function(constant, MC, lang, Design, CloudResources, Helper) {
    var i18n, isVPCAbleConnectToOutside, isVPCUsingNoneDHCPAndVisualops, isVPCUsingNonexistentDhcp, isVPCWithRdsAccessibleEnableDNS, isVPCWithRdsAccessibleHasNoIgw, isVPCWithRdsTenancyDefault, __hasState;
    i18n = Helper.i18n.short();
    __hasState = function(uid) {
      var component, had, state;
      if (Design.instance().get('agent').enabled === false) {
        return false;
      }
      if (uid) {
        component = Design.instance().component(uid);
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
    isVPCAbleConnectToOutside = function() {
      var isHaveEIP, isHavePubIP, isHaveVPN, tipInfo;
      isHaveVPN = false;
      isHaveEIP = false;
      isHavePubIP = false;
      _.each(MC.canvas_data.component, function(compObj) {
        var compType;
        compType = compObj.type;
        if (compType === constant.RESTYPE.VPN) {
          isHaveVPN = true;
        }
        if (compType === constant.RESTYPE.EIP) {
          isHaveEIP = true;
        }
        if (compType === constant.RESTYPE.ENI) {
          if (compObj.index === 0) {
            if (compObj.resource.AssociatePublicIpAddress) {
              isHavePubIP = true;
            }
          }
        }
        if (compType === constant.RESTYPE.LC) {
          if (compObj.resource.AssociatePublicIpAddress) {
            isHavePubIP = true;
          }
        }
        return null;
      });
      if (isHaveVPN || isHaveEIP || isHavePubIP) {
        return null;
      }
      tipInfo = sprintf(lang.TA.WARNING_NOT_VPC_CAN_CONNECT_OUTSIDE);
      return {
        level: constant.TA.WARNING,
        info: tipInfo
      };
    };
    isVPCUsingNoneDHCPAndVisualops = function(uid) {
      var dhcpId, vpc;
      if (!__hasState()) {
        return null;
      }
      vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
      dhcpId = vpc.get('dhcp').get('appId');
      if (dhcpId !== 'default') {
        return null;
      }
      return Helper.message.warning(vpc.id, i18n.WARNING_VPC_CANNOT_USE_DEFAULT_DHCP_WHEN_USE_VISUALOPS);
    };
    isVPCUsingNonexistentDhcp = function(callback) {
      var dhcpCol, dhcpId, vpc;
      vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
      dhcpId = vpc.get('dhcp').get('appId');
      if (!dhcpId || dhcpId === 'default') {
        callback(null);
        return;
      }
      dhcpCol = CloudResources(constant.RESTYPE.DHCP, Design.instance().region());
      dhcpCol.fetchForce().fin(function() {
        if (dhcpCol.get(dhcpId)) {
          return callback(null);
        } else {
          return callback(Helper.message.error(vpc.id, i18n.ERROR_VPC_DHCP_NONEXISTENT));
        }
      });
      return null;
    };
    isVPCWithRdsTenancyDefault = function(uid) {
      var hasRdsInstance, vpc;
      vpc = Design.instance().component(uid);
      hasRdsInstance = !!Design.modelClassForType(constant.RESTYPE.DBINSTANCE).size();
      if (hasRdsInstance && (vpc.get('tenancy') !== 'default')) {
        return Helper.message.error(uid, i18n.ERROR_RDS_TENANCY_MUST_DEFAULT);
      }
      return null;
    };
    isVPCWithRdsAccessibleHasNoIgw = function(uid) {
      var hasRdsAccessible, vpc;
      vpc = Design.instance().component(uid);
      hasRdsAccessible = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).some(function(db) {
        return db.get('accessible');
      });
      if (!hasRdsAccessible) {
        return null;
      }
      if (_.some(vpc.children(), function(child) {
        return child.type === constant.RESTYPE.IGW;
      })) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_RDS_ACCESSIBLE_NOT_HAVE_IGW);
    };
    isVPCWithRdsAccessibleEnableDNS = function(uid) {
      var hasRdsAccessible, vpc;
      vpc = Design.instance().component(uid);
      hasRdsAccessible = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).some(function(db) {
        return db.get('accessible');
      });
      if (!hasRdsAccessible) {
        return null;
      }
      if (vpc.get('dnsSupport') && vpc.get('dnsHostnames')) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_RDS_ACCESSIBLE_NOT_HAVE_DNS);
    };
    return {
      isVPCAbleConnectToOutside: isVPCAbleConnectToOutside,
      isVPCUsingNonexistentDhcp: isVPCUsingNonexistentDhcp,
      isVPCUsingNoneDHCPAndVisualops: isVPCUsingNoneDHCPAndVisualops,
      isVPCWithRdsTenancyDefault: isVPCWithRdsTenancyDefault,
      isVPCWithRdsAccessibleHasNoIgw: isVPCWithRdsAccessibleHasNoIgw,
      isVPCWithRdsAccessibleEnableDNS: isVPCWithRdsAccessibleEnableDNS
    };
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/aws/elb/elb',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isAttachELBToMultiAZ, isELBSubnetCIDREnough, isHaveIGWForInternetELB, isHaveInstanceAttached, isHaveRepeatListener, isHaveSSLCert, isInternetElbRouteOut, isRedirectPortHttpsToHttp, isRuleInboundInstanceForELBListener, isRuleInboundToELBListener, isRuleInboundToELBPingPort, isRuleOutboundToInstanceListener, isSSLCertExist;
    i18n = Helper.i18n.short();
    isHaveIGWForInternetELB = function(elbUID) {
      var elbComp, elbName, haveIGW, isInternetELB, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      isInternetELB = elbComp.resource.Scheme === 'internet-facing';
      haveIGW = false;
      _.each(MC.canvas_data.component, function(compObj) {
        var compType;
        compType = compObj.type;
        if (compType === constant.RESTYPE.IGW) {
          haveIGW = true;
        }
        return null;
      });
      if (!(isInternetELB && !haveIGW)) {
        return null;
      } else {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.TA.ERROR_VPC_HAVE_INTERNET_ELB_AND_NO_HAVE_IGW, elbName);
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
      elbNameRef = MC.genResRef(elbUID, 'resource.LoadBalancerName');
      _.each(MC.canvas_data.component, function(compObj) {
        var attachedELBAry, compType;
        compType = compObj.type;
        if (compType === constant.RESTYPE.ASG) {
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
        tipInfo = sprintf(lang.TA.ERROR_ELB_NO_ATTACH_INSTANCE_OR_ASG, elbName);
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
        tipInfo = sprintf(lang.TA.WARNING_ELB_NO_ATTACH_TO_MULTI_AZ, elbName);
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
        tipInfo = sprintf(lang.TA.NOTICE_ELB_REDIRECT_PORT_443_TO_443, elbName);
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
        tipInfo = sprintf(lang.TA.ERROR_ELB_HAVE_REPEAT_LISTENER_ITEM, elbName);
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
        tipInfo = sprintf(lang.TA.ERROR_ELB_HAVE_NO_SSL_CERT, elbName);
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
      sgCompAry = Helper.sg.get(elbComp);
      portData = Helper.sg.port(sgCompAry);
      listenerAry = elbComp.resource.ListenerDescriptions;
      result = true;
      resultPortAry = [];
      for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
        listenerItem = listenerAry[_i];
        listenerObj = listenerItem.Listener;
        elbProtocol = listenerObj.Protocol;
        elbPort = listenerObj.LoadBalancerPort;
        isInRange = Helper.sg.isInRange('tcp', elbPort, portData, 'in');
        if (!isInRange) {
          result = false;
          resultPortAry.push(elbProtocol + ' <span class="validation-tag tag-port">' + elbPort + '</span>');
        }
      }
      if (!result) {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.TA.ERROR_ELB_RULE_NOT_INBOUND_TO_ELB_LISTENER, elbName, resultPortAry.join(', '));
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
      sgCompAry = Helper.sg.get(elbComp);
      portData = Helper.sg.port(sgCompAry);
      listenerAry = elbComp.resource.ListenerDescriptions;
      result = true;
      resultPortAry = [];
      for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
        listenerItem = listenerAry[_i];
        listenerObj = listenerItem.Listener;
        instanceProtocol = listenerObj.InstanceProtocol;
        instancePort = listenerObj.InstancePort;
        isInRange = Helper.sg.isInRange('tcp', instancePort, portData, 'out');
        if (!isInRange) {
          result = false;
          resultPortAry.push(instanceProtocol + ' <span class="validation-tag tag-port">' + instancePort + '</span>');
        }
      }
      if (!result) {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.TA.ERROR_ELB_RULE_NOT_OUTBOUND_TO_INSTANCE_LISTENER, elbName, resultPortAry.join(', '));
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
          sgCompAry = Helper.sg.get(instanceComp);
          portData = Helper.sg.port(sgCompAry);
          for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
            listenerItem = listenerAry[_i];
            listenerObj = listenerItem.Listener;
            instanceProtocol = listenerObj.InstanceProtocol;
            instancePort = listenerObj.InstancePort;
            isInRange = Helper.sg.isInRange('tcp', instancePort, portData, 'in');
            if (!isInRange) {
              resultPortAry.push(instanceProtocol + ' <span class="validation-tag tag-port">' + instancePort + '</span>');
            }
          }
          if (resultPortAry.length) {
            targetType = 'Instance';
            targetName = instanceComp.serverGroupName;
            portInfo = resultPortAry.join(', ');
            tipInfo = sprintf(lang.TA.ERROR_ELB_RULE_INSTANCE_NOT_OUTBOUND_FOR_ELB_LISTENER, targetType, targetName, portInfo, elbName);
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
        if (compObj.type === constant.RESTYPE.ASG) {
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
        sgCompAry = Helper.sg.get(lcComp);
        portData = Helper.sg.port(sgCompAry);
        for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
          listenerItem = listenerAry[_i];
          listenerObj = listenerItem.Listener;
          instanceProtocol = listenerObj.InstanceProtocol;
          instancePort = listenerObj.InstancePort;
          isInRange = Helper.sg.isInRange('tcp', instancePort, portData, 'in');
          if (!isInRange) {
            resultPortAry.push(instanceProtocol + ' <span class="validation-tag tag-port">' + instancePort + '</span>');
          }
        }
        if (resultPortAry.length) {
          targetType = 'Launch Configuration';
          targetName = lcComp.name;
          portInfo = resultPortAry.join(', ');
          tipInfo = sprintf(lang.TA.ERROR_ELB_RULE_INSTANCE_NOT_OUTBOUND_FOR_ELB_LISTENER, targetType, targetName, portInfo, elbName);
          return resultAry.push({
            level: constant.TA.WARNING,
            info: tipInfo,
            uid: elbUID
          });
        }
      });
      return resultAry;
    };
    isRuleInboundToELBPingPort = function(elbUID) {
      var elbComp, elbName, err, isInRange, pingPort, portData, sgCompAry, tipInfo;
      elbComp = MC.canvas_data.component[elbUID];
      elbName = elbComp.name;
      sgCompAry = Helper.sg.get(elbComp);
      portData = Helper.sg.port(sgCompAry);
      pingPort = null;
      try {
        pingPort = elbComp.resource.HealthCheck.Target;
        pingPort = pingPort.split(':')[1];
        pingPort = pingPort.split('/')[0];
      } catch (_error) {
        err = _error;
        return null;
      }
      isInRange = Helper.sg.isInRange('tcp', pingPort, portData, 'in');
      if (!isInRange) {
        elbName = elbComp.name;
        tipInfo = sprintf(lang.TA.WARNING_ELB_RULE_NOT_INBOUND_TO_ELB_PING_PORT, elbName, pingPort);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: elbUID
        };
      }
      return null;
    };
    isELBSubnetCIDREnough = function(elbUID) {
      var elbComp, elbName, elbSubnetAry, resultAry;
      elbComp = MC.canvas_data.component[elbUID];
      elbSubnetAry = elbComp.resource.Subnets;
      elbName = elbComp.name;
      resultAry = [];
      _.each(elbSubnetAry, function(subnetRef) {
        var subnetCIDR, subnetComp, subnetName, subnetUID, suffixNum, tipInfo;
        subnetUID = MC.extractID(subnetRef);
        subnetComp = MC.canvas_data.component[subnetUID];
        if (subnetComp) {
          subnetName = subnetComp.name;
          subnetUID = subnetComp.uid;
          subnetCIDR = subnetComp.resource.CidrBlock;
          suffixNum = Number(subnetCIDR.split('/')[1]);
          if (suffixNum > 27) {
            tipInfo = sprintf(lang.TA.ERROR_ELB_ATTACHED_SUBNET_CIDR_SUFFIX_GREATE_27, elbName, subnetName);
            resultAry.push({
              level: constant.TA.ERROR,
              info: tipInfo,
              uid: subnetUID
            });
          }
        }
        return null;
      });
      return resultAry;
    };
    isSSLCertExist = function(callback) {
      var allExistCertAry, eachListener, elbNameUIDMap, elbNotExistCertMap, err, haveCert, sslCertCol, validResultAry;
      try {
        if (!callback) {
          callback = function() {};
        }
        elbNameUIDMap = {};
        eachListener = function(iterator) {
          return _.each(MC.canvas_data.component, function(compObj) {
            var elbName, listenerAry, listenerCertRef, listenerCertUID, listenerItem, listenerObj, sslCertComp, sslCertName, _i, _len;
            if (compObj.type === constant.RESTYPE.ELB) {
              elbName = compObj.name;
              elbNameUIDMap[elbName] = compObj.uid;
              listenerAry = compObj.resource.ListenerDescriptions;
              for (_i = 0, _len = listenerAry.length; _i < _len; _i++) {
                listenerItem = listenerAry[_i];
                listenerObj = listenerItem.Listener;
                listenerCertRef = listenerObj.SSLCertificateId;
                if (!listenerCertRef) {
                  continue;
                }
                listenerCertUID = MC.extractID(listenerCertRef);
                sslCertComp = MC.canvas_data.component[listenerCertUID];
                if (sslCertComp) {
                  sslCertName = sslCertComp.name;
                  iterator(elbName, sslCertName);
                }
              }
            }
            return null;
          });
        };
        elbNotExistCertMap = {};
        allExistCertAry = [];
        validResultAry = [];
        haveCert = false;
        eachListener(function() {
          return haveCert = true;
        });
        if (haveCert) {
          sslCertCol = CloudResources(constant.RESTYPE.IAM);
          return sslCertCol.fetchForce().then(function(result) {
            var sslCertAry;
            sslCertAry = sslCertCol.toJSON();
            _.each(sslCertAry, function(sslCertData) {
              return allExistCertAry.push(sslCertData.Name);
            });
            eachListener(function(elbName, sslCertName) {
              if (__indexOf.call(allExistCertAry, sslCertName) < 0) {
                if (!elbNotExistCertMap[elbName]) {
                  elbNotExistCertMap[elbName] = [];
                }
                return elbNotExistCertMap[elbName].push(sslCertName);
              }
            });
            _.each(elbNotExistCertMap, function(sslCertNameAry, elbName) {
              var tipInfo, uniqSSLCertNameAry;
              uniqSSLCertNameAry = _.uniq(sslCertNameAry);
              tipInfo = sprintf(lang.TA.ERROR_ELB_SSL_CERT_NOT_EXIST_FROM_AWS, elbName, uniqSSLCertNameAry.join(', '));
              return validResultAry.push({
                level: constant.TA.ERROR,
                info: tipInfo,
                uid: elbNameUIDMap[elbName]
              });
            });
            if (validResultAry.length) {
              callback(validResultAry);
              return;
            }
            return callback(null);
          }, function() {
            return callback(null);
          });
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    isInternetElbRouteOut = function(uid) {
      var elb, rtbs, subnets;
      elb = Design.instance().component(uid);
      if (elb.get('internal')) {
        return null;
      }
      subnets = elb.connectionTargets('ElbSubnetAsso');
      rtbs = _.map(subnets, function(sb) {
        return sb.connectionTargets('RTB_Asso')[0];
      });
      if (_.some(rtbs, function(rtb) {
        var igw, rtbConnTarget;
        rtbConnTarget = rtb.connectionTargets('RTB_Route');
        igw = _.where(rtbConnTarget, {
          type: constant.RESTYPE.IGW
        });
        return igw.length > 0;
      })) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_ELB_INTERNET_SHOULD_ATTACH_TO_PUBLIC_SB, elb.get('name'));
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
      isRuleInboundInstanceForELBListener: isRuleInboundInstanceForELBListener,
      isRuleInboundToELBPingPort: isRuleInboundToELBPingPort,
      isELBSubnetCIDREnough: isELBSubnetCIDREnough,
      isSSLCertExist: isSSLCertExist,
      isInternetElbRouteOut: isInternetElbRouteOut
    };
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('component/trustedadvisor/validation/aws/ec2/securitygroup',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
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
      var sgComp, sgInboundRuleAry, sgName, sgOutboundRuleAry, sgTotalRuleNum, tipInfo;
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
      if (sgTotalRuleNum > 50) {
        sgName = sgComp.name;
        tipInfo = sprintf(lang.TA.WARNING_SG_RULE_EXCEED_FIT_NUM, sgName, 50);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: sgUID
        };
      }
      return null;
    };
    isStackUsingOnlyOneSG = function() {
      var refSGNum, tipInfo;
      refSGNum = 0;
      _.each(MC.canvas_data.component, function(compObj) {
        var allRefComp, sgUID;
        if (compObj.type === constant.RESTYPE.SG) {
          sgUID = compObj.uid;
          allRefComp = getAllRefComp(sgUID);
          if (allRefComp.length > 0) {
            refSGNum++;
          }
        }
        return null;
      });
      if (refSGNum === 1) {
        tipInfo = sprintf(lang.TA.NOTICE_STACK_USING_ONLY_ONE_SG);
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
        tipInfo = sprintf(lang.TA.WARNING_SG_USING_ALL_PROTOCOL_RULE, sgName);
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
        tipInfo = sprintf(lang.TA.WARNING_SG_RULE_FULL_ZERO_SOURCE_TARGET_TO_OTHER_PORT, sgName);
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
        tipInfo = sprintf(lang.TA.NOTICE_SG_RULE_USING_PORT_22, sgName);
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
        tipInfo = sprintf(lang.TA.WARNING_SG_RULE_HAVE_FULL_ZERO_OUTBOUND, sgName);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: sgUID
        };
      }
      return null;
    };
    isAssociatedSGNumExceedLimit = function() {
      var maxSGNumLimit, taResultAry;
      maxSGNumLimit = 5;
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
        if (compType === constant.RESTYPE.ELB) {
          sgAry = comp.resource.SecurityGroups;
          resTypeName = 'Load Balancer';
          tagName = 'elb';
        }
        if (compType === constant.RESTYPE.LC) {
          sgAry = comp.resource.SecurityGroups;
          resTypeName = 'Launch Configuration';
          tagName = 'lc';
        } else if (compType === constant.RESTYPE.INSTANCE) {
          sgAry = comp.resource.SecurityGroupId;
          resTypeName = 'Instance';
          tagName = 'instance';
        } else if (compType === constant.RESTYPE.ENI) {
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
          tipInfo = sprintf(lang.TA.ERROR_RESOURCE_ASSOCIATED_SG_EXCEED_LIMIT, resTypeName, tagName, compName, maxSGNumLimit);
          taObj = {
            level: constant.TA.WARNING,
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
  define('component/trustedadvisor/validation/aws/asg/asg',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isELBHasHealthCheck, isHasLaunchConfiguration, isNotificationNotHasTopic, isPolicyNotHasTopic, isTopicNonexist;
    i18n = Helper.i18n.short();
    isHasLaunchConfiguration = function(uid) {
      var asg, tipInfo;
      asg = MC.canvas_data.component[uid];
      if (asg.resource.LaunchConfigurationName) {
        return null;
      }
      tipInfo = sprintf(lang.TA.ERROR_ASG_HAS_NO_LAUNCH_CONFIG, asg.name);
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
      tipInfo = sprintf(lang.TA.WARNING_ELB_HEALTH_NOT_CHECK, asg.name);
      return {
        level: constant.TA.WARNING,
        info: tipInfo,
        uid: uid
      };
    };
    isNotificationNotHasTopic = function(uid) {
      var asg, notification, topic;
      asg = Design.instance().component(uid);
      notification = asg.getNotiObject();
      if (!notification || !notification.isEffective()) {
        return null;
      }
      topic = notification.getTopic();
      if (topic && topic.get('appId')) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_ASG_NOTIFICATION_NO_TOPIC, asg.get('name'));
    };
    isPolicyNotHasTopic = function(uid) {
      var asg, p, policies, result, _i, _len;
      asg = Design.instance().component(uid);
      policies = asg.get("policies") || [];
      result = [];
      for (_i = 0, _len = policies.length; _i < _len; _i++) {
        p = policies[_i];
        if (!p.isNotificate() || p.getTopic()) {
          continue;
        }
        result.push(Helper.message.error(p.id, i18n.ERROR_ASG_POLICY_NO_TOPIC, asg.get('name'), p.get('name')));
      }
      return result;
    };
    isTopicNonexist = function(callback) {
      var allAsg, asg, needTa, notiValid, notification, p, policies, region, result, topic, topicCol, _i, _j, _len, _len1;
      allAsg = Design.modelClassForType(constant.RESTYPE.ASG).allObjects();
      needTa = [];
      for (_i = 0, _len = allAsg.length; _i < _len; _i++) {
        asg = allAsg[_i];
        notification = asg.getNotiObject();
        notiValid = false;
        if (!notification || !notification.isEffective()) {
          notiValid = true;
        } else {
          topic = notification.getTopic();
          if (!topic) {
            notiValid = true;
          }
        }
        if (!notiValid) {
          needTa.push([topic, asg, notification]);
        }
        policies = asg.get("policies") || [];
        for (_j = 0, _len1 = policies.length; _j < _len1; _j++) {
          p = policies[_j];
          topic = p.getTopic();
          if (p.isNotificate() && topic) {
            needTa.push([topic, asg, p]);
          }
        }
      }
      if (_.isEmpty(needTa)) {
        callback(null);
        return;
      }
      region = Design.instance().region();
      topicCol = CloudResources(constant.RESTYPE.TOPIC, region);
      result = [];
      return topicCol.fetchForce().fin(function() {
        var obj, ta, _k, _len2;
        for (_k = 0, _len2 = needTa.length; _k < _len2; _k++) {
          ta = needTa[_k];
          topic = ta[0];
          asg = ta[1];
          obj = ta[2];
          if (!topicCol.get(topic.get('appId'))) {
            if (obj.type === constant.RESTYPE.SP) {
              result.push(Helper.message.error(obj.id, i18n.ERROR_ASG_POLICY_TOPIC_NONEXISTENT, asg.get('name'), obj.get('name'), topic.get('name')));
            } else if (obj.type === constant.RESTYPE.NC) {
              result.push(Helper.message.error(obj.id, i18n.ERROR_ASG_NOTIFICITION_TOPIC_NONEXISTENT, asg.get('name'), topic.get('name')));
            }
          }
        }
        return callback(result);
      });
    };
    return {
      isHasLaunchConfiguration: isHasLaunchConfiguration,
      isELBHasHealthCheck: isELBHasHealthCheck,
      isNotificationNotHasTopic: isNotificationNotHasTopic,
      isPolicyNotHasTopic: isPolicyNotHasTopic,
      isTopicNonexist: isTopicNonexist
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/ec2/eip',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
    var isHasIGW, _hasType;
    isHasIGW = function() {
      var tipInfo;
      if (!_hasType(constant.RESTYPE.EIP) || _hasType(constant.RESTYPE.IGW)) {
        return null;
      }
      tipInfo = lang.TA.ERROR_HAS_EIP_NOT_HAS_IGW;
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
  define('component/trustedadvisor/validation/aws/ec2/az',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
    var isAZAlone;
    isAZAlone = function() {
      var count, instanceCount, tipInfo;
      instanceCount = _.countBy(MC.canvas_data.component, function(compObj) {
        var _ref;
        if ((_ref = compObj.type) === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.LC) {
          return 'instance';
        } else {
          return 'others';
        }
      });
      if (!instanceCount.instance) {
        return null;
      }
      count = _.countBy(MC.canvas_data.component, function(component) {
        if (component.type === constant.RESTYPE.AZ) {
          return 'az';
        } else {
          return 'others';
        }
      });
      if (count.az > 1) {
        return null;
      }
      tipInfo = lang.TA.WARNING_SINGLE_AZ;
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
  define('component/trustedadvisor/validation/aws/vpc/vgw',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
    var isConnectToRTB;
    isConnectToRTB = function(uid) {
      var components, isConnectRTB, tipInfo, vpn, vpnId;
      components = MC.canvas_data.component;
      vpn = components[uid];
      vpnId = MC.genResRef(uid, 'resource.VpnGatewayId');
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.RESTYPE.RT) {
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
      tipInfo = lang.TA.WARNING_NO_RTB_CONNECT_VGW;
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
  define('component/trustedadvisor/validation/aws/vpc/vpn',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
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
              tipInfo = sprintf(lang.TA.ERROR_VPN_NO_IP_FOR_STATIC_CGW, cgwName, vgwName);
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
        var isInAnyPriIPRange, isInAnyPubIPRange, routeCIDR, routeIP, routeIPCIDR, validSubnetCIDR;
        routeCIDR = routeObj.DestinationCidrBlock;
        if (routeCIDR) {
          validSubnetCIDR = Design.modelClassForType(constant.RESTYPE.SUBNET).isValidSubnetCIDR(routeCIDR);
          if (!validSubnetCIDR) {
            return invalidRouteCIDRAry.push(routeCIDR);
          } else {
            routeIP = routeCIDR.split('/')[0];
            routeIPCIDR = routeCIDR.split('/')[1];
            isInAnyPubIPRange = MC.aws.aws.isValidInIPRange(routeIP, 'public');
            isInAnyPriIPRange = MC.aws.aws.isValidInIPRange(routeIP, 'private');
            if ((isInAnyPubIPRange && !isInAnyPriIPRange) || Number(routeIPCIDR) === 0) {
              return invalidRouteCIDRAry.push(routeCIDR);
            }
          }
        }
      });
      if (invalidRouteCIDRAry.length) {
        tipInfo = sprintf(lang.TA.ERROR_VPN_NOT_PUBLIC_IP, vpnName, invalidRouteCIDRAry.join(', '));
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
  define('component/trustedadvisor/validation/aws/vpc/igw',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
    var isConnectToRTB;
    isConnectToRTB = function(uid) {
      var components, igw, igwId, isConnectRTB, tipInfo;
      components = MC.canvas_data.component;
      igw = components[uid];
      igwId = MC.genResRef(uid, 'resource.InternetGatewayId');
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.RESTYPE.RT) {
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
      tipInfo = lang.TA.WARNING_NO_RTB_CONNECT_IGW;
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
  define('component/trustedadvisor/validation/aws/vpc/networkacl',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
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
      tipInfo = sprintf(lang.TA.NOTICE_ACL_HAS_NO_ALLOW_RULE, acl.name);
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
  define('component/trustedadvisor/validation/aws/vpc/cgw',['constant', 'jquery', 'MC', 'i18n!/nls/lang.js', 'TaHelper', "CloudResources"], function(constant, $, MC, lang, Helper, CloudResources) {
    var i18n, isAttachVGW, isCGWHaveIPConflict, isValidCGWIP;
    i18n = Helper.i18n.short();
    isCGWHaveIPConflict = function(callback) {
      var cr, err, failure, stackCGWIP, stackCGWId, stackCGWName, stackCGWUID, success;
      try {
        if (!callback) {
          callback = function() {};
        }
        stackCGWIP = stackCGWName = stackCGWUID = stackCGWId = null;
        _.each(MC.canvas_data.component, function(compObj) {
          if (compObj.type === constant.RESTYPE.CGW) {
            stackCGWId = compObj.resource.CustomerGatewayId;
            stackCGWIP = compObj.resource.IpAddress;
            stackCGWName = compObj.name;
            stackCGWUID = compObj.uid;
          }
          return null;
        });
        if (stackCGWIP && stackCGWName && stackCGWUID && !stackCGWId) {
          cr = CloudResources(constant.RESTYPE.CGW, Design.instance().region());
          failure = function() {
            return callback(null);
          };
          success = function() {
            var error, exist;
            exist = cr.where({
              "state": "available",
              "ipAddress": stackCGWIP
            })[0];
            if (exist) {
              error = {
                level: constant.TA.ERROR,
                info: sprintf(lang.TA.ERROR_CGW_IP_CONFLICT, stackCGWName, stackCGWIP, exist.id, stackCGWIP)
              };
              console.log(error);
            }
            callback(error || null);
            return null;
          };
          cr.fetchForce().then(success, failure);
          return {
            level: constant.TA.ERROR,
            info: sprintf(lang.TA.ERROR_CGW_CHECKING_IP_CONFLICT)
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
        tipInfo = sprintf(lang.TA.WARNING_CGW_IP_RANGE_ERROR, cgwName, cgwIP);
        return {
          level: constant.TA.WARNING,
          info: tipInfo,
          uid: uid
        };
      }
      return null;
    };
    isAttachVGW = function(uid) {
      var cgw, hasAttachVgw;
      cgw = Design.instance().component(uid);
      hasAttachVgw = cgw.connections(constant.RESTYPE.VPN).length;
      if (hasAttachVgw) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_CGW_MUST_ATTACH_VPN, cgw.get('name'));
    };
    return {
      isCGWHaveIPConflict: isCGWHaveIPConflict,
      isValidCGWIP: isValidCGWIP,
      isAttachVGW: isAttachVGW
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/vpc/eni',['constant', 'MC', 'i18n!/nls/lang.js'], function(constant, MC, lang) {
    var isENIAttachToInstance;
    isENIAttachToInstance = function(eniUID) {
      var attachedInstanceId, eniComp, eniName, tipInfo;
      eniComp = MC.canvas_data.component[eniUID];
      attachedInstanceId = eniComp.resource.Attachment.InstanceId;
      if (attachedInstanceId) {
        return null;
      } else {
        eniName = eniComp.name;
        tipInfo = sprintf(lang.TA.ERROR_ENI_NOT_ATTACH_TO_INSTANCE, eniName);
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
  define('component/trustedadvisor/validation/aws/vpc/rtb',['constant', 'MC', 'TaHelper', 'Design'], function(CONST, MC, Helper, Design) {
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
          notices.push(Helper.message.notice(uid + instance.id, i18n.NOTICE_RT_ROUTE_NAT, instanceName, rtbName, instanceName, rtbName));
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
      _.each(routeSet, function(route, idx) {
        var currentRouteDes;
        currentRouteDes = route.DestinationCidrBlock;
        _.each(routeDesAry, function(routeDes) {
          var SubnetModel, tipInfo;
          SubnetModel = Design.modelClassForType(CONST.RESTYPE.SUBNET);
          if ((currentRouteDes === routeDes) || (idx === 0 && SubnetModel.isCidrConflict(currentRouteDes, routeDes))) {
            tipInfo = sprintf(i18n.ERROR_RT_HAVE_CONFLICT_DESTINATION, rtbName);
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
  define('component/trustedadvisor/validation/aws/stateeditor/validation/reference',['constant', 'MC', 'i18n!/nls/lang.js'], function(CONST, MC, lang) {
    var Message, checkRefExist, takeplace, __componentTipMap, __findReference, __genError, __getComp, __getCompTip, __getRef, __isUid, __legalExist, __legalState, __refState;
    __componentTipMap = {
      'AWS.EC2.Instance': lang.TA.ERROR_STATE_EDITOR_INEXISTENT_INSTANCE,
      'AWS.AutoScaling.Group': lang.TA.ERROR_STATE_EDITOR_INEXISTENT_ASG,
      'OS::Nova::Server': lang.TA.ERROR_STATE_EDITOR_INEXISTENT_OSSERVER
    };
    __getCompTip = function(compType, str1, str2, str100) {
      var tip, type;
      type = arguments[0];
      if (type === 'AWS.AutoScaling.LaunchConfiguration') {
        type = 'AWS.AutoScaling.Group';
      }
      tip = __componentTipMap[type];
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
          refName = "unknown." + ref.attr;
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
      var error, legalRef, r, ref, refName, refNames, tip, _i, _len;
      ref = __getRef(obj, data);
      error = [];
      refNames = [];
      if (ref.length) {
        legalRef = MC.aws.aws.genAttrRefList(data.comp, MC.canvas_data.component);
      }
      for (_i = 0, _len = ref.length; _i < _len; _i++) {
        r = ref[_i];
        refName = '';
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
          refNames.push("<span class='validation-tag tag-state-ref'>" + refName + "</span>");
        }
      }
      if (refNames.length) {
        tip = __getCompTip(data.type, data.name, data.stateId, refNames.join(', '));
        error.push(__genError(tip, data.stateId));
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

  define('component/trustedadvisor/validation/aws/stateeditor/validation/format',['Design', 'constant', 'i18n!/nls/lang.js', 'jquery', 'underscore', 'MC'], function(Design, constant, lang) {
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
      isRef: function(val) {
        if (!_.isArray(val)) {
          val = [val];
        }
        return _.every(val, function(v) {
          return constant.REGEXP.stateEditorRefOnly.test(v);
        });
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
        var module, moduleDataObj, stateModuel;
        stateModuel = Design.instance().get('agent').module;
        moduleDataObj = App.model.getStateModule(stateModuel.repo, stateModuel.tag);
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
            tip = sprintf(lang.TA.ERROR_STATE_EDITOR_EMPTY_REQUIED_PARAMETER, data.name, data.stateId, name);
            type = 'requiredParameter';
            error.push(Helper.buildError(tip, data.stateId, type));
          } else if (cmd.module === 'meta.wait' && name === 'state' && !Validator.isRef(state.parameter[name])) {
            tip = sprintf(lang.TA.ERROR_STATE_EDITOR_INVALID_FORMAT, data.name, data.stateId, 'wait');
            type = 'invalidFormat';
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
  define('component/trustedadvisor/validation/aws/stateeditor/register',['./validation/reference', './validation/format'], function(reference, format) {
    return [reference, format];
  });

}).call(this);


/*
This file use for validate state.
 */

(function() {
  define('component/trustedadvisor/validation/aws/stateeditor/main',['./register', 'constant', 'MC', 'i18n!/nls/lang.js'], function(validators, constant, MC, lang) {
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
  define('component/trustedadvisor/validation/aws/state/state',['constant', 'MC', 'Design', 'TaHelper'], function(constant, MC, Design, Helper) {
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
        if (component.type === constant.RESTYPE.ENI) {
          if (MC.extractID(component.resource.Attachment.InstanceId) === instance.uid) {
            return true;
          }
        }
      });
    };
    __getSg = function(component) {
      var eni, enis, sg, sgId, sgs, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
      sgs = [];
      if (component.type === constant.RESTYPE.LC) {
        _ref = component.resource.SecurityGroups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sgId = _ref[_i];
          sgs.push(__getComp(MC.extractID(sgId)));
        }
      } else if (component.type === constant.RESTYPE.INSTANCE) {
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
      var enis, hasEip;
      if (component.type === constant.RESTYPE.LC) {
        return component.get('publicIp') === true;
      } else if (component.type === constant.RESTYPE.INSTANCE) {
        enis = component.connectionTargets('EniAttachment');
        enis.push(component.getEmbedEni());
        hasEip = _.some(enis, function(eni) {
          return eni.hasEip();
        });
        return component.hasAutoAssignPublicIp() || hasEip;
      }
    };
    __getSubnetRtb = function(component) {
      return component.parent().connectionTargets('RTB_Asso')[0];
    };
    __isRouteIgw = function(component) {
      var eni, enis, rtbs, uid, _i, _len;
      uid = component.uid || component.id;
      component = Design.instance().component(uid);
      rtbs = [];
      rtbs.push(__getSubnetRtb(component));
      enis = component.connectionTargets("EniAttachment");
      for (_i = 0, _len = enis.length; _i < _len; _i++) {
        eni = enis[_i];
        rtbs.push(__getSubnetRtb(eni));
      }
      return _.some(rtbs, function(rtb) {
        var igw, rtbConn;
        rtbConn = rtb.connectionTargets('RTB_Route');
        igw = _.where(rtbConn, {
          type: constant.RESTYPE.IGW
        });
        return igw.length > 0;
      });
    };
    __natOut = function(component) {
      var instances, rtb, _ref;
      if ((_ref = component.type) === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.ASG || _ref === 'ExpandedAsg') {
        rtb = __getSubnetRtb(component);
        if (rtb) {
          instances = _.where(rtb.connectionTargets('RTB_Route'), {
            type: constant.RESTYPE.INSTANCE
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
      var lcOrInstance, name, _ref;
      if ((_ref = component.type) === constant.RESTYPE.ASG || _ref === 'ExpandedAsg') {
        lcOrInstance = component.getLc();
      } else {
        lcOrInstance = component;
      }
      if (!__hasEipOrPublicIp(lcOrInstance)) {
        name = lcOrInstance.get('name');
        result.push(Helper.message.error(lcOrInstance.id, i18n.ERROR_NO_EIP_OR_PIP, name, name, subnetName));
        return true;
      } else if (__isRouteIgw(component)) {
        return true;
      } else {
        return false;
      }
    };
    __genConnectedError = function(subnetName, uid) {
      return Helper.message.error(uid, i18n.ERROR_NOT_CONNECT_OUT, subnetName);
    };
    __isLcConnectedOut = function(uid) {
      var asg, asgs, expandedAsgs, lc, result, subnet, subnetId, subnetName, subnetNameString, subnetNames, _i, _len;
      lc = __getComp(uid, true);
      result = [];
      expandedAsgs = [];
      subnetNames = [];
      asgs = Design.modelClassForType(constant.RESTYPE.ASG).filter(function(asg) {
        if (asg.getLc() === lc) {
          expandedAsgs = expandedAsgs.concat(asg.get('expandedList'));
          subnetNames.push(asg.parent().get('name'));
          return true;
        }
      });
      asgs = asgs.concat(expandedAsgs);
      subnetNameString = _.uniq(subnetNames).join(',');
      for (_i = 0, _len = asgs.length; _i < _len; _i++) {
        asg = asgs[_i];
        if (!(__natOut(asg) || __selfOut(asg, result, subnetNameString))) {
          subnet = asg.parent();
          subnetName = subnet.get('name');
          subnetId = subnet.id;
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
      if (__hasType(constant.RESTYPE.IGW)) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_NO_CGW);
    };
    isHasOutPort80and443 = function(uid) {
      var component, sgs;
      component = __getComp(uid);
      sgs = __getSg(component);
      if (__sgsHasOutPort80and443(sgs)) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_NO_OUTBOUND_RULES, component.name);
    };
    isHasOutPort80and443Strict = function(uid) {
      var component, sgs;
      component = __getComp(uid);
      sgs = __getSg(component);
      if (isHasOutPort80and443(uid) || __sgsHasOutPort80and443(sgs, true)) {
        return null;
      }
      return Helper.message.warning(uid, i18n.WARNING_OUTBOUND_NOT_TO_ALL, component.name);
    };
    isConnectedOut = function(uid) {
      var component, result;
      result = [];
      component = __getComp(uid);
      if (component.type === constant.RESTYPE.LC) {
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
  define('component/trustedadvisor/validation/aws/ec2/ebs',['constant', 'jquery', 'MC', 'i18n!/nls/lang.js', "CloudResources"], function(constant, $, MC, lang, CloudResources) {
    var isSnapshotExist;
    isSnapshotExist = function(callback) {
      var cr, err, failure, snaphostAry, snaphostMap, success;
      try {
        if (!callback) {
          callback = function() {};
        }
        snaphostAry = [];
        snaphostMap = {};
        _.each(MC.canvas_data.component, function(compObj) {
          var instanceUID, snaphostId;
          if (compObj.type === constant.RESTYPE.VOL) {
            snaphostId = compObj.resource.SnapshotId;
            instanceUID = compObj.resource.AttachmentSet.InstanceId;
            if (snaphostId && instanceUID) {
              if (!snaphostMap[snaphostId]) {
                snaphostMap[snaphostId] = [];
              }
              instanceUID = MC.extractID(instanceUID);
              snaphostMap[snaphostId] = _.union(snaphostMap[snaphostId], [instanceUID]);
            }
          }
          if (compObj.type === constant.RESTYPE.LC) {
            _.each(compObj.resource.BlockDeviceMapping, function(blockObj, idx) {
              if (idx > 0) {
                snaphostId = blockObj.Ebs.SnapshotId;
                instanceUID = compObj.uid;
                if (snaphostId && instanceUID) {
                  if (!snaphostMap[snaphostId]) {
                    snaphostMap[snaphostId] = [];
                  }
                  return snaphostMap[snaphostId] = _.union(snaphostMap[snaphostId], [instanceUID]);
                }
              }
            });
          }
          return null;
        });
        snaphostAry = _.keys(snaphostMap);
        if (snaphostAry.length) {
          cr = CloudResources(constant.RESTYPE.SNAP, Design.instance().region());
          failure = function() {
            return callback(null);
          };
          success = function() {
            var id, infoObjType, instanceId, instanceObj, instanceUID, missingIds, snapshotId, tipInfoAry, _i, _j, _k, _len, _len1, _len2, _ref, _results;
            tipInfoAry = [];
            missingIds = [];
            for (_i = 0, _len = snaphostAry.length; _i < _len; _i++) {
              id = snaphostAry[_i];
              if (!cr.get(id)) {
                missingIds.push(id);
              }
            }
            if (!missingIds.length) {
              return callback(null);
            }
            _results = [];
            for (_j = 0, _len1 = missingIds.length; _j < _len1; _j++) {
              snapshotId = missingIds[_j];
              _ref = snaphostMap[snapshotId] || [];
              for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                instanceUID = _ref[_k];
                instanceObj = MC.canvas_data.component[instanceUID];
                if (instanceObj.type === constant.RESTYPE.LC) {
                  instanceId = instanceObj.resource.LaunchConfigurationARN;
                  infoObjType = lang.PROP.LC_TITLE;
                } else {
                  instanceId = instanceObj.resource.InstanceId;
                  infoObjType = lang.PROP.ELB_INSTANCES;
                }
                if (!instanceId) {
                  tipInfoAry.push({
                    level: constant.TA.ERROR,
                    uid: instanceUID,
                    info: sprintf(lang.TA.ERROR_STACK_HAVE_NOT_EXIST_SNAPSHOT, snapshotId, infoObjType, instanceObj.name)
                  });
                }
                null;
              }
              if (tipInfoAry.length) {
                callback(tipInfoAry);
                _results.push(console.log(tipInfoAry));
              } else {
                _results.push(callback(null));
              }
            }
            return _results;
          };
          cr.fetch().then(success, failure);
          return null;
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    return {
      isSnapshotExist: isSnapshotExist
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/ec2/kp',['constant', 'MC', 'Design', 'TaHelper', 'underscore', 'CloudResources'], function(constant, MC, Design, Helper, _, CloudResources) {
    var i18n, isKeyPairExistInAws, isNotDefaultAndRefInstance, longLiveNotice;
    i18n = Helper.i18n.short();
    isNotDefaultAndRefInstance = function(uid) {
      var instance, instanceStr, instances, kp, lcStr, message, tag, _i, _len;
      kp = Design.instance().component(uid);
      instances = kp.connectionTargets("KeypairUsage");
      if (kp.isDefault() || !instances.length) {
        return null;
      }
      lcStr = '';
      instanceStr = '';
      message = '';
      for (_i = 0, _len = instances.length; _i < _len; _i++) {
        instance = instances[_i];
        tag = instance.type === constant.RESTYPE.LC ? 'lc' : 'instance';
        if (instance.type === constant.RESTYPE.LC) {
          tag = 'lc';
          lcStr += "<span class='validation-tag tag-" + tag + "'>" + (instance.get('name')) + "</span>, ";
        } else {
          tag = 'instance';
          instanceStr += "<span class='validation-tag tag-" + tag + "'>" + (instance.get('name')) + "</span>, ";
        }
      }
      if (instanceStr) {
        message += 'Instance ' + instanceStr;
      }
      if (lcStr) {
        message += 'Launch Configuration' + lcStr;
      }
      message = message.slice(0, -2);
      return Helper.message.error(uid, i18n.ERROR_INSTANCE_REF_OLD_KEYPAIR, message, kp.get('name'));
    };
    longLiveNotice = function() {
      return Helper.message.notice(null, i18n.NOTICE_KEYPAIR_LONE_LIVE);
    };
    isKeyPairExistInAws = function(callback) {
      var allInstances, allLcs, errors, i, instanceLike, invalid, keyName, kpCollection, needValidate, region, results, session, username, _i, _len;
      allInstances = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
      allLcs = Design.modelClassForType(constant.RESTYPE.LC).allObjects();
      instanceLike = allInstances.concat(allLcs);
      needValidate = [];
      invalid = [];
      errors = {};
      results = [];
      for (_i = 0, _len = instanceLike.length; _i < _len; _i++) {
        i = instanceLike[_i];
        if (i.type === constant.RESTYPE.INSTANCE && i.get('appId') && i.get('count') === i.groupMembers().length + 1) {
          continue;
        }
        keyName = i.get('keyName');
        if (keyName && keyName[0] !== '@' && !i.connectionTargets("KeypairUsage").length) {
          needValidate.push(i);
        }
      }
      if (!needValidate.length) {
        return callback(null);
      } else {
        username = $.cookie("usercode");
        session = $.cookie("session_id");
        region = Design.instance().region();
        kpCollection = CloudResources(constant.RESTYPE.KP, Design.instance().get("region"));
        return kpCollection.fetchForce().then(function(col) {
          var kpList;
          kpList = col.toJSON();
          _.each(needValidate, function(i) {
            var inexist, tag;
            inexist = _.every(kpList, function(kp) {
              return kp.keyName !== i.get('keyName');
            });
            if (inexist) {
              keyName = i.get('keyName');
              invalid.push(i);
              if (!errors[keyName]) {
                errors[keyName] = {
                  lc: '',
                  instance: ''
                };
              }
              tag = i.type === constant.RESTYPE.LC ? 'lc' : 'instance';
              if (i.type === constant.RESTYPE.LC) {
                tag = 'lc';
                return errors[keyName].lc += "<span class='validation-tag tag-" + tag + "'>" + (i.get('name')) + "</span>, ";
              } else {
                tag = 'instance';
                return errors[keyName].instance += "<span class='validation-tag tag-" + tag + "'>" + (i.get('name')) + "</span>, ";
              }
            }
          });
          _.each(errors, function(err, keyName) {
            var message;
            message = '';
            if (err.instance) {
              message += 'Instance ' + err.instance;
            }
            if (err.lc) {
              message += 'Launch Configuration' + err.lc;
            }
            message = message.slice(0, -2);
            return results.push(Helper.message.error(keyName, i18n.ERROR_INSTANCE_REF_OLD_KEYPAIR, message, keyName));
          });
          return callback(results);
        }, function() {
          return callback(null);
        });
      }
    };
    return {
      isNotDefaultAndRefInstance: isNotDefaultAndRefInstance,
      longLiveNotice: longLiveNotice,
      isKeyPairExistInAws: isKeyPairExistInAws
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/rds/dbinstance',['constant', 'MC', 'Design', 'TaHelper', 'CloudResources'], function(constant, MC, Design, Helper, CloudResources) {
    var diff, i18n, isAzConsistent, isBackupMaintenanceOverlap, isDBandOgBothModified, isHaveEnoughIPForDB, isHaveReplicaStorageSmallThanOrigin, isMasterPasswordValid, isOgValid, isSqlServerCross3Subnet;
    i18n = Helper.i18n.short();
    diff = function(oldcomp, newcomp) {
      return !_.isEqual(oldcomp, newcomp);
    };
    isOgValid = function() {
      var db, dbs, nameStr, taId, _i, _len;
      dbs = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).filter(function(db) {
        return (db.get('instanceClass') === 'db.t1.micro') && !db.getOptionGroup().isDefault();
      });
      if (!dbs.length) {
        return null;
      }
      taId = '';
      nameStr = '';
      for (_i = 0, _len = dbs.length; _i < _len; _i++) {
        db = dbs[_i];
        nameStr += "<span class='validation-tag'>" + (db.get('name')) + "</span>, ";
        taId += db.id;
      }
      nameStr = nameStr.slice(0, -2);
      return Helper.message.error(taId, i18n.ERROR_RDS_DB_T1_MICRO_DEFAULT_OPTION, nameStr);
    };
    isAzConsistent = function(uid) {
      var azName, db, sbg;
      db = Design.instance().component(uid);
      azName = db.get('az');
      if (!azName) {
        return null;
      }
      sbg = db.parent();
      if (_.some(sbg.connectionTargets("SubnetgAsso"), function(sb) {
        return sb.parent().get('name') === azName;
      })) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_RDS_AZ_NOT_CONSISTENT, db.get('name'), azName);
    };
    isHaveEnoughIPForDB = function(uid) {
      var dbModels, resultSubnetAry, subnetDBMap, _getSubnetRemainIPCount;
      _getSubnetRemainIPCount = function(subnetModel) {
        var availableIPCount, cidr;
        cidr = subnetModel.get('cidr');
        availableIPCount = subnetModel.getAvailableIPCountInSubnet();
        return availableIPCount;
      };
      subnetDBMap = {};
      resultSubnetAry = [];
      dbModels = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).allObjects();
      _.each(dbModels, function(dbModel) {
        var connAry, subnetGroupModel;
        subnetGroupModel = dbModel.get('__parent');
        connAry = subnetGroupModel.get('__connections');
        _.each(connAry, function(conModel) {
          var subnetModel;
          subnetModel = conModel.getTarget(constant.RESTYPE.SUBNET);
          if (!subnetDBMap[subnetModel.id]) {
            subnetDBMap[subnetModel.id] = [];
          }
          subnetDBMap[subnetModel.id] = _.union(subnetDBMap[subnetModel.id], [dbModel.get('id')]);
          return null;
        });
        return null;
      });
      _.each(subnetDBMap, function(dbAry, subnetUID) {
        var availableIPCount, subnetModel;
        subnetModel = Design.instance().component(subnetUID);
        availableIPCount = _getSubnetRemainIPCount(subnetModel);
        if (availableIPCount < dbAry.length) {
          resultSubnetAry.push(subnetModel.get('name'));
        }
        return null;
      });
      resultSubnetAry = _.map(resultSubnetAry, function(name) {
        return "<span class='validation-tag tag-vpn'>" + name + "</span>";
      });
      if (resultSubnetAry.length) {
        return {
          level: constant.TA.ERROR,
          info: sprintf(i18n.ERROR_HAVE_NOT_ENOUGH_IP_FOR_DB, resultSubnetAry.join(', '))
        };
      }
      return null;
    };
    isHaveReplicaStorageSmallThanOrigin = function(uid) {
      var dbModel, srcStorge, storge;
      dbModel = Design.instance().component(uid);
      if (!dbModel.master()) {
        return null;
      }
      storge = dbModel.get('allocatedStorage');
      srcStorge = dbModel.master().get('allocatedStorage');
      if (storge < srcStorge) {
        return {
          uid: uid,
          level: constant.TA.ERROR,
          info: sprintf(i18n.ERROR_REPLICA_STORAGE_SMALL_THAN_ORIGIN, dbModel.get('name'), dbModel.master().get('name'))
        };
      }
      return null;
    };
    isSqlServerCross3Subnet = function(uid) {
      var azs, db, og, sbg;
      db = Design.instance().component(uid);
      og = db.getOptionGroup();
      if (!db.isSqlserver()) {
        return null;
      }
      if (og.isDefault()) {
        return null;
      }
      if (_.every(og.get('options'), function(option) {
        return option.OptionName !== 'Mirroring';
      })) {
        return null;
      }
      sbg = db.parent();
      azs = _.map(sbg.connectionTargets('SubnetgAsso'), function(sb) {
        return sb.parent();
      });
      if (_.uniq(azs).length > 2) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_RDS_SQL_SERVER_MIRROR_MUST_HAVE3SUBNET, db.get('name'));
    };
    isBackupMaintenanceOverlap = function(uid) {
      var appData, appId, backupEnd, backupStart, backupTimeArray, backupWindow, db, maintenanceEnd, maintenanceStart, maintenanceTimeArray, maintenanceWindow;
      db = Design.instance().component(uid);
      appId = db.get('appId');
      backupWindow = db.get('backupWindow');
      maintenanceWindow = db.get('maintenanceWindow');
      if (!(backupWindow && maintenanceWindow)) {
        return null;
      }
      if (appId) {
        appData = CloudResources(constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(appId);
        backupWindow = backupWindow || appData.get('PreferredBackupWindow');
        maintenanceWindow = maintenanceWindow || appData.get('PreferredMaintenanceWindow');
      }
      backupTimeArray = backupWindow.replace(/:/g, '').split('-');
      maintenanceTimeArray = maintenanceWindow.replace(/:/g, '').split('-');
      backupStart = +backupTimeArray[0];
      backupEnd = +backupTimeArray[1];
      maintenanceStart = +maintenanceTimeArray[0].slice(3);
      maintenanceEnd = +maintenanceTimeArray[1].slice(3);
      if (maintenanceEnd <= maintenanceStart && backupStart <= backupEnd) {
        if (maintenanceEnd <= backupStart && backupStart <= maintenanceStart && backupEnd <= maintenanceStart) {
          return null;
        }
      } else if (backupEnd <= backupStart && maintenanceStart <= maintenanceEnd) {
        if (backupEnd <= maintenanceStart && maintenanceStart <= backupStart && maintenanceEnd < backupStart) {
          return null;
        }
      } else if (backupEnd <= backupStart && maintenanceEnd <= maintenanceStart) {

      } else if (backupStart >= maintenanceEnd || backupEnd <= maintenanceStart) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_RDS_BACKUP_MAINTENANCE_OVERLAP, db.get('name'));
    };
    isMasterPasswordValid = function(uid) {
      var db, password, _ref;
      db = Design.instance().component(uid);
      password = db.get('password');
      if (password && (password === '****' || (8 <= (_ref = password.length) && _ref <= 41))) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_MASTER_PASSWORD_INVALID, db.get('name'));
    };
    isDBandOgBothModified = function(uid) {
      var db, dbOrigincomp, dbcomp, og, ogOrigincomp, ogcomp, originJson;
      db = Design.instance().component(uid);
      og = db.getOptionGroup();
      if (!db.get('appId') || !og.get('appId') || og.isDefault()) {
        return null;
      }
      originJson = Design.instance().__opsModel.getJsonData();
      dbOrigincomp = originJson.component[uid];
      ogOrigincomp = originJson.component[og.id];
      dbcomp = MC.canvas_data.component[uid];
      ogcomp = MC.canvas_data.component[og.id];
      if (!(diff(dbOrigincomp, dbcomp) && diff(ogOrigincomp, ogcomp))) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_OG_DB_BOTH_MODIFIED, db.get('name'), og.get('name'));
    };
    return {
      isOgValid: isOgValid,
      isAzConsistent: isAzConsistent,
      isHaveEnoughIPForDB: isHaveEnoughIPForDB,
      isSqlServerCross3Subnet: isSqlServerCross3Subnet,
      isBackupMaintenanceOverlap: isBackupMaintenanceOverlap,
      isMasterPasswordValid: isMasterPasswordValid,
      isHaveReplicaStorageSmallThanOrigin: isHaveReplicaStorageSmallThanOrigin,
      isDBandOgBothModified: isDBandOgBothModified
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/rds/og',['constant', 'MC', 'Design', 'TaHelper', 'CloudResources'], function(constant, MC, Design, Helper, CloudResources) {
    var i18n, isOGExeedCountLimit, unusedOgWontCreate;
    i18n = Helper.i18n.short();
    unusedOgWontCreate = function(callback) {
      var nameStr, og, ogUnused, taId, _i, _len;
      ogUnused = Design.modelClassForType(constant.RESTYPE.DBOG).filter(function(og) {
        return !(og.isDefault() || og.connections().length);
      });
      if (!ogUnused.length) {
        callback(null);
        return null;
      }
      taId = '';
      nameStr = '';
      for (_i = 0, _len = ogUnused.length; _i < _len; _i++) {
        og = ogUnused[_i];
        nameStr += "<span class='validation-tag'>" + (og.get('name')) + "</span>, ";
        taId += og.id;
      }
      nameStr = nameStr.slice(0, -2);
      callback(Helper.message.warning(taId, i18n.WARNING_RDS_UNUSED_OG_NOT_CREATE, nameStr));
      return null;
    };
    isOGExeedCountLimit = function(callback) {
      var customOGModels, err, existOGModels, ogModels, region, regionName;
      try {
        if (!callback) {
          callback = function() {};
        }
        existOGModels = Design.modelClassForType(constant.RESTYPE.DBOG).allObjects();
        customOGModels = _.filter(existOGModels, function(model) {
          if (!model.get('default') && !model.get('createdBy')) {
            return true;
          }
        });
        if (customOGModels.length) {
          region = Design.instance().get('region');
          regionName = constant.REGION_SHORT_LABEL[region];
          ogModels = CloudResources(constant.RESTYPE.DBOG, region);
          return ogModels.fetchForce().then(function(ogCol) {
            var customOgAry;
            customOgAry = ogCol.filter(function(model) {
              return model.get('id').indexOf('default:') !== 0;
            });
            if (customOgAry.length + customOGModels.length > 20) {
              return callback(Helper.message.error('', i18n.ERROR_RDS_OG_EXCEED_20_LIMIT, regionName));
            } else {
              return callback(null);
            }
          }, function(err) {
            return callback(null);
          });
        } else {
          return callback(null);
        }
      } catch (_error) {
        err = _error;
        return callback(null);
      }
    };
    return {
      isOGExeedCountLimit: isOGExeedCountLimit
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/aws/rds/sbg',['constant', 'MC', 'Design', 'TaHelper', 'CloudResources'], function(constant, MC, Design, Helper, CloudResources) {
    var i18n, isSbgHasSbin2Az;
    i18n = Helper.i18n.short();
    isSbgHasSbin2Az = function(uid) {
      var azs, minAZCount, sbg, sbs, tmpTip, uniqAzCount, _ref;
      tmpTip = "Subnet Group %s must have subnets in at least 2 Availability Zones.";
      sbg = Design.instance().component(uid);
      sbs = sbg.connectionTargets("SubnetgAsso");
      azs = [];
      azs = _.map(sbs, function(sb) {
        return sb.parent();
      });
      uniqAzCount = _.uniq(azs).length;
      if ((_ref = Design.instance().region()) === 'cn-north-1') {
        minAZCount = 1;
      } else {
        minAZCount = 2;
      }
      if (uniqAzCount >= minAZCount) {
        return null;
      }
      return Helper.message.error(uid, sprintf(tmpTip, sbg.get('name')));
    };
    return {
      isSbgHasSbin2Az: isSbgHasSbin2Az
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/os/osport',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isPortConnectwithServer;
    i18n = Helper.i18n.short();
    isPortConnectwithServer = function(uid) {
      var connectedServer, port;
      port = Design.instance().component(uid);
      connectedServer = _.some(port.connectionTargets('OsPortUsage'), function(target) {
        return target.type === constant.RESTYPE.OSSERVER;
      });
      if (connectedServer) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_PORT_MUST_CONNECT_WITH_SERVER, port.get('name'));
    };
    return {
      isPortConnectwithServer: isPortConnectwithServer
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/os/ossubnet',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isSubnetCIDRConflict, subnetHasPortShouldConncectedOut, __isSbConnectOut;
    i18n = Helper.i18n.short();
    __isSbConnectOut = function(sb) {
      var rt, rts;
      rts = _.filter(sb.connectionTargets('OsRouterAsso'), function(obj) {
        return obj.type === constant.RESTYPE.OSRT;
      });
      rt = rts[0];
      if (!rt || !rt.get('extNetworkId')) {
        return false;
      }
      return true;
    };
    subnetHasPortShouldConncectedOut = function() {
      var badSbs, child, port, sb, sbNames, subnets, _i, _j, _len, _len1, _ref, _ref1;
      badSbs = [];
      subnets = Design.modelClassForType(constant.RESTYPE.OSSUBNET).allObjects();
      for (_i = 0, _len = subnets.length; _i < _len; _i++) {
        sb = subnets[_i];
        _ref = sb.children();
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          child = _ref[_j];
          port = null;
          if ((_ref1 = child.type) === constant.RESTYPE.OSPORT || _ref1 === constant.RESTYPE.OSLISTENER) {
            port = child;
          } else if (child.type === constant.RESTYPE.OSSERVER) {
            port = child.embedPort();
          }
          if (port && port.getFloatingIp() && !__isSbConnectOut(sb)) {
            badSbs.push(sb);
          }
        }
      }
      sbNames = _.map(_.uniq(badSbs), function(sb) {
        return "<span class='validation-tag tag-ossubnet'>" + (sb.get('name')) + "</span>";
      }).join(', ');
      if (!sbNames) {
        return null;
      }
      return Helper.message.error(null, i18n.ERROR_SUBNET_HAS_PORT_SHOULD_CONNECTED_OUT, sbNames);
    };
    isSubnetCIDRConflict = function() {
      var cidr1, cidr2, conflictSubnet1, conflictSubnet2, haveConflict, isCidrConflict, name1, name2, subnetModel1, subnetModel2, subnetModels, _i, _j, _len, _len1;
      subnetModels = Design.modelClassForType(constant.RESTYPE.OSSUBNET).allObjects();
      isCidrConflict = Design.modelClassForType(constant.RESTYPE.SUBNET).isCidrConflict;
      conflictSubnet1 = null;
      conflictSubnet2 = null;
      for (_i = 0, _len = subnetModels.length; _i < _len; _i++) {
        subnetModel1 = subnetModels[_i];
        for (_j = 0, _len1 = subnetModels.length; _j < _len1; _j++) {
          subnetModel2 = subnetModels[_j];
          if (subnetModel1 === subnetModel2) {
            continue;
          }
          haveConflict = isCidrConflict(subnetModel1.get('cidr'), subnetModel2.get('cidr'));
          if (haveConflict) {
            conflictSubnet1 = subnetModel1;
            conflictSubnet2 = subnetModel2;
            break;
          }
        }
        if (conflictSubnet1) {
          break;
        }
      }
      if (conflictSubnet1) {
        name1 = conflictSubnet1.get('name');
        name2 = conflictSubnet2.get('name');
        cidr1 = conflictSubnet1.get('cidr');
        cidr2 = conflictSubnet2.get('cidr');
        return Helper.message.error(null, i18n.ERROR_SUBNET_HAS_CONFLICT_CIDR_WITH_OTHERS, name1, cidr1, name2, cidr2);
      }
    };
    return {
      subnetHasPortShouldConncectedOut: subnetHasPortShouldConncectedOut,
      isSubnetCIDRConflict: isSubnetCIDRConflict
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/os/osrouter',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, rtMustConnecteToOneSubnet;
    i18n = Helper.i18n.short();
    rtMustConnecteToOneSubnet = function(uid) {
      var rt;
      rt = Design.instance().component(uid);
      if (rt.connections('OsRouterAsso').length) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_ROUTER_XXX_MUST_CONNECT_TO_AT_LEAST_ONE_SUBNET, rt.get('name'));
    };
    return {
      rtMustConnecteToOneSubnet: rtMustConnecteToOneSubnet
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/os/ospool',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isMemberBelongsConnectedSubnet, isPoolConnectedwithListener;
    i18n = Helper.i18n.short();
    isPoolConnectedwithListener = function(uid) {
      var pool;
      pool = Design.instance().component(uid);
      if (pool.connections('OsListenerAsso').length) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_POOL_XXX_MUST_BE_CONNECTED_TO_A_LISTENER, pool.get('name'));
    };
    isMemberBelongsConnectedSubnet = function(uid) {
      var memberNames, members, notConnectedMembers, pool;
      pool = Design.instance().component(uid);
      members = pool.connectionTargets('OsPoolMembership');
      notConnectedMembers = _.reject(members, function(m) {
        var memberRt, poolRt;
        if (m.parent() === pool.parent()) {
          return true;
        }
        memberRt = m.parent().connectionTargets('OsRouterAsso')[0];
        poolRt = pool.parent().connectionTargets('OsRouterAsso')[0];
        if (memberRt && memberRt === poolRt) {
          return true;
        }
        return false;
      });
      memberNames = _.map(notConnectedMembers, function(nc) {
        return "<span class='validation-tag tag-ospoolmember'>" + (nc.get('name')) + "</span>";
      }).join(', ');
      if (!memberNames) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_POOL_AND_MEMBER_SUBNET_NOT_CONNECTED, pool.get('name'), memberNames);
    };
    return {
      isPoolConnectedwithListener: isPoolConnectedwithListener,
      isMemberBelongsConnectedSubnet: isMemberBelongsConnectedSubnet
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/os/oslistener',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isListenerConnectedwithPool;
    i18n = Helper.i18n.short();
    isListenerConnectedwithPool = function(uid) {
      var listener;
      listener = Design.instance().component(uid);
      if (listener.connections('OsListenerAsso').length) {
        return null;
      }
      return Helper.message.error(uid, i18n.ERROR_LISTENER_XXX_MUST_BE_CONNECTED_TO_A_POOL, listener.get('name'));
    };
    return {
      isListenerConnectedwithPool: isListenerConnectedwithPool
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/validation/os/osstack',['constant', 'MC', 'i18n!/nls/lang.js', 'TaHelper', 'CloudResources'], function(constant, MC, lang, Helper, CloudResources) {
    var i18n, isResExtendQuotaLimit;
    i18n = Helper.i18n.short();
    isResExtendQuotaLimit = function() {
      var existMap, getNewCount, limitMap, newMap, provider, quotaMap, region, typeShortMap, validAry;
      region = Design.instance().region();
      provider = App.user.get("default_provider");
      quotaMap = App.model.getOpenstackQuotas(provider);
      getNewCount = function(type) {
        return _.filter(Design.modelClassForType(type).allObjects(), function(model) {
          return !model.get('appId');
        }).length;
      };
      typeShortMap = {};
      existMap = {};
      newMap = {};
      limitMap = {};
      _.each([constant.RESTYPE.OSPORT, constant.RESTYPE.OSFIP, constant.RESTYPE.OSRT, constant.RESTYPE.OSSG, constant.RESTYPE.OSSUBNET], function(type) {
        typeShortMap[type] = existMap[type] = CloudResources(type, region).length;
        return newMap[type] = getNewCount(type);
      });
      limitMap[constant.RESTYPE.OSPORT] = quotaMap['Neutron::port'];
      limitMap[constant.RESTYPE.OSFIP] = quotaMap['Neutron::floatingip'];
      limitMap[constant.RESTYPE.OSRT] = quotaMap['Neutron::router'];
      limitMap[constant.RESTYPE.OSSG] = quotaMap['Neutron::security_group'];
      limitMap[constant.RESTYPE.OSSUBNET] = quotaMap['Neutron::subnet'];
      validAry = [];
      _.each(existMap, function(count, type) {
        var limitCount, typeName, usedCount;
        usedCount = existMap[type] + newMap[type];
        limitCount = limitMap[type];
        typeName = constant.RESNAME[type];
        if (usedCount > limitCount && typeName) {
          validAry.push(Helper.message.error(null, i18n.ERROR_STACK_RESOURCE_EXCCED_LIMIT, typeName, usedCount, limitCount));
        }
        return null;
      });
      return validAry;
    };
    return {
      isResExtendQuotaLimit: isResExtendQuotaLimit
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/lib/TA.Bundle',['MC', '../validation/aws/stack/stack', '../validation/aws/ec2/instance', '../validation/aws/vpc/subnet', '../validation/aws/vpc/vpc', '../validation/aws/elb/elb', '../validation/aws/ec2/securitygroup', '../validation/aws/asg/asg', '../validation/aws/ec2/eip', '../validation/aws/ec2/az', '../validation/aws/vpc/vgw', '../validation/aws/vpc/vpn', '../validation/aws/vpc/igw', '../validation/aws/vpc/networkacl', '../validation/aws/vpc/cgw', '../validation/aws/vpc/eni', '../validation/aws/vpc/rtb', '../validation/aws/stateeditor/main', '../validation/aws/state/state', '../validation/aws/ec2/ebs', '../validation/aws/ec2/kp', '../validation/aws/rds/dbinstance', '../validation/aws/rds/og', '../validation/aws/rds/sbg', '../validation/os/osport', '../validation/os/ossubnet', '../validation/os/osrouter', '../validation/os/ospool', '../validation/os/oslistener', '../validation/os/osstack'], function(MC, stack, instance, subnet, vpc, elb, sg, asg, eip, az, vgw, vpn, igw, acl, cgw, eni, rtb, stateEditor, state, ebs, kp, dbinstance, og, sbg, osport, ossubnet, osrouter, ospool, oslistener, osstack) {
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
      state: state,
      ebs: ebs,
      kp: kp,
      dbinstance: dbinstance,
      og: og,
      sbg: sbg,
      osport: osport,
      ossubnet: ossubnet,
      osrouter: osrouter,
      ospool: ospool,
      oslistener: oslistener,
      osstack: osstack
    };
  });

}).call(this);

(function() {
  define('component/trustedadvisor/lib/TA.Core',['event', 'MC', 'Design', 'underscore'], function(ide_event, MC, Design) {
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
          ide_event.trigger(ide_event.UPDATE_TA_MODAL, 'delete', delete_obj.level);
        }
      }
      return null;
    };
    _add = function(result) {
      MC.ta.list.push(result);
      return ide_event.trigger(ide_event.UPDATE_TA_MODAL, 'add', result.level);
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
  define('validation',['constant', 'event', 'component/trustedadvisor/lib/TA.Config', 'component/trustedadvisor/lib/TA.Bundle', 'component/trustedadvisor/lib/TA.Core', 'jquery', 'underscore', "MC"], function(constant, ide_event, config, TaBundle, TaCore) {
    var validAll, validComp, validRun, _asyncCallback, _genSyncFinish, _getFilename, _handleException, _init, _isAsync, _isGlobal, _pushResult, _syncFinish, _syncStart, _validAsync, _validComponents, _validGlobal, _validState;
    _init = function() {
      return TaCore.reset();
    };
    _isGlobal = function(filename, method) {
      return config.get('globalList')[filename] && _.contains(config.get('globalList')[filename], method);
    };
    _isAsync = function(filename, method) {
      return config.get('asyncList')[filename] && _.contains(config.get('asyncList')[filename], method);
    };
    _getFilename = function(componentType) {
      var filename;
      if (config.get('componentTypeToFileMap')[componentType]) {
        return config.get('componentTypeToFileMap')[componentType];
      }
      filename = _.last(componentType.split('.'));
      filename = filename.toLowerCase();
      return [filename];
    };
    _pushResult = function(result, method, filename, uid) {
      return TaCore.set("" + filename + "." + method, result, uid);
    };
    _syncStart = function() {
      return ide_event.trigger(ide_event.TA_SYNC_START);
    };
    _syncFinish = function() {
      return ide_event.trigger(ide_event.TA_SYNC_FINISH);
    };
    _genSyncFinish = function(times) {
      return _.after(times, function() {
        return _syncFinish();
      });
    };
    _asyncCallback = function(method, filename, done) {
      var hasRun;
      hasRun = false;
      _.delay(function() {
        if (!hasRun) {
          hasRun = true;
          _pushResult(null, method, filename);
          done();
          return console.error('Async TA Timeout');
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
      _.each(config.get('globalList'), function(methods, filename) {
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
            result = TaBundle[filename][method]();
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
          return _.each(TaBundle[filename], function(func, method) {
            var err, result;
            if (!_isGlobal(filename, method) && !_isAsync(filename, method)) {
              try {
                result = TaBundle[filename][method](uid);
                return _pushResult(result, method, filename, uid);
              } catch (_error) {
                err = _error;
                return _handleException(err);
              }
            }
          });
        });
        try {
          return _validState(TaBundle, uid);
        } catch (_error) {
          err = _error;
          return _handleException(err);
        }
      });
      return null;
    };
    _validState = function(TaBundle, uid) {
      var result;
      if (Design.instance().get('agent').enabled === true) {
        result = TaBundle.stateEditor(uid);
        _pushResult(result, 'stateEditor', 'stateEditor', uid);
      }
      return null;
    };
    _validAsync = function() {
      var asyncList, finishTimes, syncFinish;
      asyncList = config.get('asyncList');
      if (!asyncList || !_.size(asyncList)) {
        _syncFinish();
        return;
      }
      finishTimes = _.reduce(asyncList, function(memo, arr) {
        return memo + arr.length;
      }, 0);
      _syncStart();
      syncFinish = _genSyncFinish(finishTimes);
      _.each(asyncList, function(methods, filename) {
        return _.each(methods, function(method) {
          var err, result;
          try {
            result = TaBundle[filename][method](_asyncCallback(method, filename, syncFinish));
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
        MC.ta.resultVO = TaCore;
        temp = type.split('.');
        filename = temp[0];
        method = temp[1];
        func = TaBundle[filename][method];
        if (_.isFunction(func)) {
          args = Array.prototype.slice.call(arguments, 1);
          result = func.apply(TaBundle[filename], args);
          TaCore.set(type, result);
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
      return TaCore.result();
    };
    validAll = function() {
      _init();
      _validComponents();
      _validGlobal('all');
      return TaCore.result();
    };
    MC.ta = {
      validComp: validComp,
      validAll: validAll,
      validRun: validRun,
      stateEditor: TaBundle.stateEditor,
      list: [],
      state_list: {}
    };
    return MC.ta;
  });

}).call(this);

define('component/trustedadvisor/gui/tpl/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "no-item";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						";
  stack1 = ((stack1 = (depth0 && depth0.info)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n\r\n				";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title empty\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.GOOD_JOB_NO_ERROR_HERE", {hash:{},data:data}))
    + "\r\n					</div>\r\n				";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						";
  stack1 = ((stack1 = (depth0 && depth0.info)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</div>\r\n				";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title empty\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.GOOD_JOB_NO_WARNING_HERE", {hash:{},data:data}))
    + "\r\n					</div>\r\n				";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n					<div class=\"title empty\" data-key=\""
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\r\n						"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.GOOD_JOB_NO_NOTICE_HERE", {hash:{},data:data}))
    + "\r\n					</div>\r\n				";
  return buffer;
  }

  buffer += "<div class=\"validation-content\">\r\n	<ul class=\"tab\">\r\n		<li class=\"active ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.error_list)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tab-target=\"#item-error\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_ERROR", {hash:{},data:data}))
    + "<span class=\"validation-counter validation-counter-error\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.error_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\r\n		<li data-tab-target=\"#item-warning\" class=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.warning_list)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_WARNING", {hash:{},data:data}))
    + "<span class=\"validation-counter validation-counter-warning\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.warning_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\r\n		<li data-tab-target=\"#item-notice\" class=\"";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.notice_list)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_NOTICE", {hash:{},data:data}))
    + "<span class=\"validation-counter validation-counter-notice\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.notice_list)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></li>\r\n	</ul>\r\n	<div class=\"scroll-wrap scroll-wrap-validation\">\r\n		<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\r\n		<div class=\"content_wrap scroll-content\">\r\n\r\n			<div id=\"item-error\" class=\"content active\">\r\n\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.error_list), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n\r\n				<div class=\"item-error-tip\"><i class=\"icon-info\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "IDE.SOME_ERROR_VALIDATION_ONLY_HAPPENS_AT_THE_TIME_TO_RUN_STACK", {hash:{},data:data}))
    + "</div>\r\n\r\n			</div>\r\n			<div id=\"item-warning\" class=\"content\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.warning_list), {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n			<div id=\"item-notice\" class=\"content\">\r\n				";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.notice_list), {hash:{},inverse:self.program(11, program11, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('component/trustedadvisor/gui/tpl/modal_template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-header\">\n	<h3>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.LBL_VALIDATION", {hash:{},data:data}))
    + "</h3>\n	<i class=\"modal-close\">×</i>\n</div>\n<div class=\"modal-body\">\n	<div id=\"modal-validation-statusbar\">\n	</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('component/trustedadvisor/gui/view',['event', 'i18n!/nls/lang.js', './tpl/template', './tpl/modal_template', 'backbone', 'jquery', 'handlebars'], function(ide_event, lang, template, modal_template) {
    var TrustedAdvisorView;
    TrustedAdvisorView = Backbone.View.extend({
      el: '.status-bar-modal',
      events: {
        'click .modal-close': 'closedPopup'
      },
      render: function(type, status) {
        console.log('pop-up:trusted advisor run render', status);
        if (type === 'stack') {
          $('#stack-run-validation-container').html(template(this.model.attributes));
          $('.validating').hide();
          this.processDetails();
          $('.stack-validation details').show();
        } else if (type === 'statusbar') {
          this.$el.html(modal_template());
          this.$el.find('#modal-validation-statusbar').html(template(this.model.attributes));
          this.processStatusBarDetails();
          $('.status-bar-modal').show();
        } else if (type === 'openstack') {
          $('.validating').hide();
          false;
        }
        return null;
      },
      processStatusBarDetails: function() {
        var $tabs, error, notice, warning;
        error = this.model.get('error_list');
        warning = this.model.get('warning_list');
        notice = this.model.get('notice_list');
        $tabs = this.$el.find('.tab li');
        if (error.length) {

        } else if (warning.length) {
          return $tabs.eq(1).click();
        } else if (notice.length) {
          return $tabs.eq(2).click();
        } else {
          this.$el.find('.validation-content').text(lang.IDE.GREAT_JOB_NO_ERROR_WARNING_NOTICE_HERE);
          return this.$el.find('.validation-content').addClass('empty');
        }
      },
      processDetails: function() {
        var $details, $nutshell, $summary, $tabs, error, notice, processNutshell, warning;
        error = this.model.get('error_list');
        warning = this.model.get('warning_list');
        notice = this.model.get('notice_list');
        $tabs = $('.modal-box .tab li');
        $nutshell = $('.modal-box .nutshell');
        $details = $nutshell.prev('details');
        $summary = $details.find('summary');
        processNutshell = function(notShow) {
          var content, contentArr;
          contentArr = [];
          if (error.length) {
            contentArr.push(sprintf(lang.IDE.LENGTH_ERROR, error.len));
            _.defer(function() {
              return modal.position();
            });
          }
          if (warning.length) {
            contentArr.push(sprintf(lang.IDE.LENGTH_WARNING, warning.length));
          }
          if (notice.length) {
            contentArr.push(sprintf(lang.IDE.LENGTH_NOTICE, notice.length));
          }
          if (!contentArr.length) {
            content = lang.IDE.NO_ERROR_WARNING_OR_NOTICE;
          } else {
            content = contentArr.join(lang.IDE.COMMA);
          }
          $nutshell.find('label').text(content);
          return $nutshell.click(function() {
            return $summary.click();
          });
        };
        if (error.length) {
          return processNutshell(true);
        } else if (warning.length) {
          $tabs.eq(1).click();
          $details.removeAttr('open');
          return processNutshell();
        } else if (notice.length) {
          $tabs.eq(2).click();
          $details.removeAttr('open');
          return processNutshell();
        } else {
          $details.removeAttr('open');
          processNutshell();
          return $('.validation-content').text('Great job! No error, warning or notice here.');
        }
      },
      restoreRun: function() {
        return $('#btn-confirm, #confirm-update-app').removeAttr('disabled');
      },
      _clickCurrentTab: function(status) {
        console.log('_clickCurrentTab, status = ' + status);
        if (!status) {
          return;
        }
        return _.each($('.tab').find('li'), function(item) {
          if ($(item).attr('data-tab-target') === '#item-' + status) {
            return $(item).trigger('click');
          }
        });
      },
      closedPopup: function() {
        if (this.$el.html()) {
          console.log('closedPopup');
          this.$el.empty();
          this.trigger('CLOSE_POPUP');
          return $('.status-bar-modal').hide();
        }
      }
    });
    return TrustedAdvisorView;
  });

}).call(this);

(function() {
  define('component/trustedadvisor/gui/model',['backbone', 'jquery', 'underscore', 'MC'], function() {
    var TrustedAdvisorModel;
    TrustedAdvisorModel = Backbone.Model.extend({
      defaults: {
        'notice_list': null,
        'warning_list': null,
        'error_list': null
      },
      createList: function() {
        var error_list, notice_list, temp, warning_list;
        console.log('createList');
        notice_list = [];
        warning_list = [];
        error_list = [];
        temp = {};
        _.each(MC.ta.list, function(obj) {
          temp = {
            'info': obj.info,
            'key': obj.key,
            'type': obj.type
          };
          switch (obj.level) {
            case 'NOTICE':
              return notice_list.push(temp);
            case 'WARNING':
              return warning_list.push(temp);
            case 'ERROR':
              return error_list.push(temp);
          }
        });
        this.set('notice_list', notice_list);
        this.set('warning_list', warning_list);
        this.set('error_list', error_list);
        MC.ta.state_list = {
          'notice_list': notice_list,
          'warning_list': warning_list,
          'error_list': error_list
        };
      }
    });
    return TrustedAdvisorModel;
  });

}).call(this);

(function() {
  define('TaGui',['jquery', 'event', 'component/trustedadvisor/gui/view', 'component/trustedadvisor/gui/model'], function($, ide_event, View, Model) {
    var loadModule, unLoadModule;
    loadModule = function(type, status) {
      var model, processBar, processRun, view;
      view = new View();
      model = new Model();
      view.model = model;
      view.on('CLOSE_POPUP', function() {
        return unLoadModule(view, model);
      });
      processBar = function() {
        ide_event.onLongListen(ide_event.UPDATE_TA_MODAL, function() {
          return console.log('UPDATE_TA_MODAL');
        });
        model.createList();
        return view.render(type, status);
      };
      processRun = function() {
        var deferred;
        deferred = Q.defer();
        ide_event.onListen(ide_event.TA_SYNC_FINISH, function() {
          console.log('TA_SYNC_FINISH');
          model.createList();
          view.render(type, status);
          if (model.get('error_list').length === 0) {
            return deferred.resolve(model);
          } else {
            return deferred.reject(model);
          }
        });
        MC.ta.validRun();
        return deferred.promise;
      };
      ide_event.onLongListen(ide_event.UNLOAD_TA_MODAL, function() {
        console.log('UNLOAD_TA_MODAL');
        return unLoadModule(view, model);
      });
      if (type === 'stack') {
        view.closedPopup();
        return processRun();
      } else {
        return processBar();
      }
    };
    unLoadModule = function(view, model) {
      console.log('trusted advisor run unLoadModule');
      view.off();
      model.off();
      view.undelegateEvents();
      view = null;
      model = null;
      ide_event.offListen(ide_event.UPDATE_TA_MODAL);
      return ide_event.offListen(ide_event.UNLOAD_TA_MODAL);
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);


define("component/Validation", function(){});
