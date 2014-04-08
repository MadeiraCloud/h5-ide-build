(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
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
