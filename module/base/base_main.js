(function() {
  define(['jquery', 'underscore', 'i18n!nls/lang.js', 'UI.notification'], function($, _, lang) {
    var error_repeat, loadSuperModule;
    error_repeat = {};
    error_repeat.header = 0;
    error_repeat.tabbar = 0;
    error_repeat.navigation = 0;
    error_repeat.dashboard = 0;
    error_repeat.register = 0;
    error_repeat.reset = 0;

    /*
    current_View = {}
    count = 0
    count = {}
    count.header     = 1
    count.tabbar     = 1
    count.navigation = 0
    count.dashboard  = 0
     */
    loadSuperModule = function(target, type, View, callback) {
      var error;
      console.log('loadSuperModule, type = ' + type);
      try {

        /*
        current_View[ type ]   = if count[ type ] is 0 then undefined else View
        count.header     = 1 if type is 'header'
        count.tabbar     = 1 if type is 'tabbar'
        count.navigation = 1 if type is 'navigation'
        count.dashboard  = 0 if type is 'dashboard'
        return new current_View[ type ]()
         */
        return new View();
      } catch (_error) {
        error = _error;
        console.log(error);
        error_repeat[type] = error_repeat[type] + 1;
        if (error_repeat[type] < 4) {
          notification('warning', lang.ide.MODULE_RELOAD_MESSAGE, false);
          _.delay(function() {
            return target();
          }, 5 * 1000);
        } else {
          notification('error', lang.ide.MODULE_RELOAD_FAILED, true);
        }
        return null;
      }
      return null;
    };
    return {
      loadSuperModule: loadSuperModule
    };
  });

}).call(this);
