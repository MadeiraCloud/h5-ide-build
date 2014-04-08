(function() {
  define(['constant', 'MC', 'validation_helper', 'Design'], function(CONST, MC, Helper, Design) {
    var i18n, isRtbConnectedNatAndItConnectedSubnet, isRtbHaveConflictDestination;
    i18n = Helper.i18n.short();
    isRtbConnectedNatAndItConnectedSubnet = function(uid) {
      var connectedInstances, instance, instanceName, instanceNameStr, notices, rtb, rtbName, subnets, suspectInstances, _i, _len;
      rtb = Design.instance().component(uid);
      rtbName = rtb.get('name');
      suspectInstances = rtb.connectionTargets('RTB_Route');
      subnets = rtb.connectionTargets('RTB_Asso');
      instanceNameStr = '';
      connectedInstances = _.filter(suspectInstances, function(comp) {
        return comp.type === CONST.RESTYPE.INSTANCE;
      });
      notices = [];
      if (subnets.length) {
        for (_i = 0, _len = connectedInstances.length; _i < _len; _i++) {
          instance = connectedInstances[_i];
          instanceName = instance.get('name');
          notices.push(Helper.message.notice(uid + instance.id, i18n.TA_MSG_NOTICE_RT_ROUTE_NAT, instanceName, rtbName, instanceName, rtbName));
        }
        return notices;
      }
      return null;
    };
    isRtbHaveConflictDestination = function(uid) {
      var notices, routeDesAry, routeSet, rtb, rtbName;
      rtb = MC.canvas_data.component[uid];
      routeSet = rtb.resource.RouteSet;
      rtbName = rtb.name;
      routeDesAry = [];
      notices = [];
      _.each(routeSet, function(route) {
        var currentRouteDes;
        currentRouteDes = route.DestinationCidrBlock;
        _.each(routeDesAry, function(routeDes) {
          var tipInfo;
          if (MC.aws.subnet.isSubnetConflict(currentRouteDes, routeDes)) {
            tipInfo = sprintf(i18n.TA_MSG_ERROR_RT_HAVE_CONFLICT_DESTINATION, rtbName);
            return notices.push({
              level: CONST.TA.ERROR,
              info: tipInfo,
              uid: uid
            });
          }
        });
        return routeDesAry.push(currentRouteDes);
      });
      if (notices.length) {
        return notices;
      }
      return null;
    };
    return {
      isRtbConnectedNatAndItConnectedSubnet: isRtbConnectedNatAndItConnectedSubnet,
      isRtbHaveConflictDestination: isRtbHaveConflictDestination
    };
  });

}).call(this);
