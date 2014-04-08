(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant', 'MC', 'i18n!nls/lang.js', 'validation_helper'], function(constant, MC, lang, taHelper) {
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
