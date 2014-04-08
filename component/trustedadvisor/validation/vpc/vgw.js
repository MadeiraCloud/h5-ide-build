(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isConnectToRTB;
    isConnectToRTB = function(uid) {
      var components, isConnectRTB, tipInfo, vpn, vpnId;
      components = MC.canvas_data.component;
      vpn = components[uid];
      vpnId = MC.aws.aws.genResRef(uid, 'resource.VpnGatewayId');
      isConnectRTB = _.some(components, function(component) {
        if (component.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_RouteTable) {
          return _.some(component.resource.RouteSet, function(rt) {
            var RTB;
            if (rt.GatewayId === vpnId) {
              RTB = component;
              return true;
            }
          });
        }
      });
      if (isConnectRTB) {
        return null;
      }
      tipInfo = lang.ide.TA_MSG_WARNING_NO_RTB_CONNECT_VGW;
      return {
        level: constant.TA.WARNING,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isConnectToRTB: isConnectToRTB
    };
  });

}).call(this);
