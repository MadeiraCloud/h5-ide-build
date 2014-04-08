(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js', '../result_vo'], function(constant, MC, lang, resultVO) {
    var isConnectSubnetButNoAllowRule;
    isConnectSubnetButNoAllowRule = function(uid) {
      var HasAllowACLRule, acl, components, connectSubnet, tipInfo;
      components = MC.canvas_data.component;
      acl = components[uid];
      connectSubnet = _.some(acl.resource.AssociationSet, function(as) {
        if (as.SubnetId) {
          return true;
        }
      });
      HasAllowACLRule = _.some(acl.resource.EntrySet, function(es) {
        return es.RuleAction === 'allow';
      });
      if (!connectSubnet || HasAllowACLRule) {
        return null;
      }
      tipInfo = sprintf(lang.ide.TA_MSG_NOTICE_ACL_HAS_NO_ALLOW_RULE, acl.name);
      return {
        level: constant.TA.NOTICE,
        info: tipInfo,
        uid: uid
      };
    };
    return {
      isConnectSubnetButNoAllowRule: isConnectSubnetButNoAllowRule
    };
  });

}).call(this);
