(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
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
