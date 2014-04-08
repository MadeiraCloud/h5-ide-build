(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant', 'MC', 'Design', 'validation_helper'], function(constant, MC, Design, Helper) {
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
