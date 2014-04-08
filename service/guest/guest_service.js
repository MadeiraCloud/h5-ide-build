(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, access, cancel, end, info, invite, parserAccessReturn, parserCancelReturn, parserEndReturn, parserInfoReturn, parserInviteReturn, resolveAccessResult, resolveCancelResult, resolveEndResult, resolveInfoResult, resolveInviteResult, send_request;
    URL = '/guest/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("guest." + api_name + " callback is null");
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
        console.log("guest." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveInviteResult = function(result) {
      var invite_info;
      invite_info = {};
      invite_info.request_id = result[0];
      invite_info.state = result[1];
      invite_info.request_brief = result[2];
      invite_info.submit_time = result[3];
      invite_info.request_rid = result[4];
      return invite_info;
    };
    parserInviteReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveInviteResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveCancelResult = function(result) {};
    parserCancelReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveCancelResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveAccessResult = function(result) {};
    parserAccessReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveAccessResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveEndResult = function(result) {};
    parserEndReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveEndResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveInfoResult = function(result) {};
    parserInfoReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveInfoResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    invite = function(src, username, session_id, region_name, callback) {
      send_request("invite", src, [username, session_id, region_name], parserInviteReturn, callback);
      return true;
    };
    cancel = function(src, username, session_id, region_name, guest_id, callback) {
      send_request("cancel", src, [username, session_id, region_name, guest_id], parserCancelReturn, callback);
      return true;
    };
    access = function(src, guestname, session_id, region_name, guest_id, callback) {
      send_request("access", src, [guestname, session_id, region_name, guest_id], parserAccessReturn, callback);
      return true;
    };
    end = function(src, guestname, session_id, region_name, guest_id, callback) {
      send_request("end", src, [guestname, session_id, region_name, guest_id], parserEndReturn, callback);
      return true;
    };
    info = function(src, username, session_id, region_name, guest_id, callback) {
      if (guest_id == null) {
        guest_id = null;
      }
      send_request("info", src, [username, session_id, region_name, guest_id], parserInfoReturn, callback);
      return true;
    };
    return {
      invite: invite,
      cancel: cancel,
      access: access,
      end: end,
      info: info
    };
  });

}).call(this);
