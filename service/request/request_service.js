(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, init, parseResource, parserInitReturn, parserUpdateReturn, resolveInitResult, resolveUpdateResult, send_request, update;
    URL = '/request/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("request." + api_name + " callback is null");
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
        console.log("request." + api_name + " error:" + error.toString());
      }
      return true;
    };
    parseResource = function(resource) {
      request_vo.resource.userid = resource["id"];
      request_vo.resource.code = resource["code"];
      request_vo.resource.submit_time = resource["time_submit"];
      request_vo.resource.begin_time = resource["time_begin"];
      request_vo.resource.end_time = resource["time_end"];
      request_vo.resource.brief = resource["brief"];
      request_vo.resource.data = resource["data"];
      return request_vo.request_info.data.push(request_vo.resource);
    };
    resolveInitResult = function(result) {
      var resource, _i, _len, _ref;
      request_vo.request_info.time = result[0];
      request_vo.request_info.data = [];
      _ref = result[1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        resource = _ref[_i];
        parseResource(resource);
      }
      return request_vo.request_info;
    };
    parserInitReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveInitResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveUpdateResult = function(result) {
      var resource, _i, _len, _ref;
      request_vo.request_info.time = result[0];
      request_vo.request_info.data = [];
      _ref = result[1];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        resource = _ref[_i];
        parseResource(resource);
      }
      return request_vo.request_info;
    };
    parserUpdateReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveUpdateResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    init = function(src, username, session_id, region_name, callback) {
      send_request("init", src, [username, session_id, region_name], parserInitReturn, callback);
      return true;
    };
    update = function(src, username, session_id, region_name, timestamp, callback) {
      if (timestamp == null) {
        timestamp = null;
      }
      send_request("update", src, [username, session_id, region_name, timestamp], parserUpdateReturn, callback);
      return true;
    };
    return {
      init: init,
      update: update
    };
  });

}).call(this);
