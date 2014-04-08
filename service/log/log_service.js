(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, parserPutUserLogReturn, put_user_log, resolvePutUserLogResult, send_request;
    URL = '/log/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("log." + api_name + " callback is null");
        return false;
      }
      try {
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var forge_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            forge_result = {};
            forge_result = parser(result, return_code, param_ary);
            return callback(forge_result);
          },
          error: function(result, return_code) {
            var forge_result;
            forge_result = {};
            forge_result.return_code = return_code;
            forge_result.is_error = true;
            forge_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            forge_result.param = param_ary;
            return callback(forge_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("log." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolvePutUserLogResult = function(result) {};
    parserPutUserLogReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolvePutUserLogResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    put_user_log = function(src, username, session_id, user_logs, callback) {
      send_request("put_user_log", src, [username, session_id, user_logs], parserPutUserLogReturn, callback);
      return true;
    };
    return {
      put_user_log: put_user_log
    };
  });

}).call(this);
