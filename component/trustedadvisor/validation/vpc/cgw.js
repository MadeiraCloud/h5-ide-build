(function() {
  define(['constant', 'jquery', 'MC', 'i18n!nls/lang.js', 'customergateway_service', '../result_vo'], function(constant, $, MC, lang, cgwService) {
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
