(function() {
  define(['constant', 'MC', 'Design', 'TaHelper'], function(constant, MC, Design, Helper) {
    var i18n, unusedOgWontCreate;
    i18n = Helper.i18n.short();
    unusedOgWontCreate = function(callback) {
      var nameStr, og, ogUnused, taId, _i, _len;
      ogUnused = Design.modelClassForType(constant.RESTYPE.DBOG).filter(function(og) {
        return !(og.isDefault() || og.connections().length);
      });
      if (!ogUnused.length) {
        callback(null);
        return null;
      }
      taId = '';
      nameStr = '';
      for (_i = 0, _len = ogUnused.length; _i < _len; _i++) {
        og = ogUnused[_i];
        nameStr += "<span class='validation-tag'>" + (og.get('name')) + "</span>, ";
        taId += og.id;
      }
      nameStr = nameStr.slice(0, -2);
      callback(Helper.message.warning(taId, i18n.TA_MSG_WARNING_RDS_UNUSED_OG_NOT_CREATE, nameStr));
      return null;
    };
    return {
      unusedOgWontCreate: unusedOgWontCreate
    };
  });

}).call(this);
