(function() {
  define(['constant', 'MC', 'i18n!nls/lang.js'], function(constant, MC, lang) {
    var isENIAttachToInstance;
    isENIAttachToInstance = function(eniUID) {
      var attachedInstanceId, eniComp, eniName, tipInfo;
      eniComp = MC.canvas_data.component[eniUID];
      attachedInstanceId = eniComp.resource.Attachment.InstanceId;
      if (attachedInstanceId) {
        return null;
      } else {
        eniName = eniComp.name;
        tipInfo = sprintf(lang.ide.TA_MSG_ERROR_ENI_NOT_ATTACH_TO_INSTANCE, eniName);
        return {
          level: constant.TA.ERROR,
          info: tipInfo,
          uid: eniUID
        };
      }
    };
    return {
      isENIAttachToInstance: isENIAttachToInstance
    };
  });

}).call(this);
