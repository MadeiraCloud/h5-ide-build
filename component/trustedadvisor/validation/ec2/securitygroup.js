(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant', 'MC', 'i18n!nls/lang.js'], function(constant, MC, lang) {
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
