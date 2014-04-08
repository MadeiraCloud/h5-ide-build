(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isELBHasHealthCheck, isHasLaunchConfiguration;
    isHasLaunchConfiguration = function(uid) {
      var asg, tipInfo;
      asg = MC.canvas_data.component[uid];
      if (asg.resource.LaunchConfigurationName) {
        return null;
      }
      tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ASG_HAS_NO_LAUNCH_CONFIG, asg.name);
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
      tipInfo = sprintf(lang.ide.TA_MSG_WARNING_ELB_HEALTH_NOT_CHECK, asg.name);
      return {
        level: constant.TA.WARNING,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isHasLaunchConfiguration: isHasLaunchConfiguration,
      isELBHasHealthCheck: isELBHasHealthCheck
    };
  });

}).call(this);
