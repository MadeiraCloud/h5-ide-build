(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
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
