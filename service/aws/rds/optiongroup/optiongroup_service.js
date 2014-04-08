(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeOptionGroupOptions, DescribeOptionGroups, URL, parserDescribeOptionGroupOptionsReturn, parserDescribeOptionGroupsReturn, resolveDescribeOptionGroupOptionsResult, resolveDescribeOptionGroupsResult, send_request;
    URL = '/aws/rds/optiongroup/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("optiongroup." + api_name + " callback is null");
        return false;
      }
      try {
        MC.api({
          url: URL,
          method: api_name,
          data: param_ary,
          success: function(result, return_code) {
            var aws_result;
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result = {};
            aws_result = parser(result, return_code, param_ary);
            return callback(aws_result);
          },
          error: function(result, return_code) {
            var aws_result;
            aws_result = {};
            aws_result.return_code = return_code;
            aws_result.is_error = true;
            aws_result.error_message = result.toString();
            param_ary.splice(0, 0, {
              url: URL,
              method: api_name,
              src: src
            });
            aws_result.param = param_ary;
            return callback(aws_result);
          }
        });
      } catch (_error) {
        error = _error;
        console.log("optiongroup." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeOptionGroupOptionsResult = function(result) {};
    parserDescribeOptionGroupOptionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeOptionGroupOptionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeOptionGroupsResult = function(result) {};
    parserDescribeOptionGroupsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeOptionGroupsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeOptionGroupOptions = function(src, username, session_id, callback) {
      send_request("DescribeOptionGroupOptions", src, [username, session_id], parserDescribeOptionGroupOptionsReturn, callback);
      return true;
    };
    DescribeOptionGroups = function(src, username, session_id, callback) {
      send_request("DescribeOptionGroups", src, [username, session_id], parserDescribeOptionGroupsReturn, callback);
      return true;
    };
    return {
      DescribeOptionGroupOptions: DescribeOptionGroupOptions,
      DescribeOptionGroups: DescribeOptionGroups
    };
  });

}).call(this);
