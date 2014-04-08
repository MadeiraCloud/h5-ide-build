(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var URL, get_dns_ip, get_hostname, parserGetDnsIpReturn, parserGetHostnameReturn, resolveGetDnsIpResult, resolveGetHostnameResult, send_request;
    URL = '/public/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("public." + api_name + " callback is null");
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
        console.log("public." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveGetHostnameResult = function(result) {};
    parserGetHostnameReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveGetHostnameResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    resolveGetDnsIpResult = function(result) {};
    parserGetDnsIpReturn = function(result, return_code, param) {
      var forge_result, resolved_data;
      forge_result = result_vo.processForgeReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !forge_result.is_error) {
        resolved_data = resolveGetDnsIpResult(result);
        forge_result.resolved_data = resolved_data;
      }
      return forge_result;
    };
    get_hostname = function(src, region_name, instance_id, callback) {
      send_request("get_hostname", src, [region_name, instance_id], parserGetHostnameReturn, callback);
      return true;
    };
    get_dns_ip = function(src, region_name, callback) {
      send_request("get_dns_ip", src, [region_name], parserGetDnsIpReturn, callback);
      return true;
    };
    return {
      get_hostname: get_hostname,
      get_dns_ip: get_dns_ip
    };
  });

}).call(this);
