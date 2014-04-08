(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang) {
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
