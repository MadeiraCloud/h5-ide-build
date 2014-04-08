
/*
This file use for validate component about state.
 */

(function() {
  define(['constant', 'MC', '../result_vo', 'Design', 'validation_helper'], function(CONST, MC, resultVO, Design, Helper) {
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
