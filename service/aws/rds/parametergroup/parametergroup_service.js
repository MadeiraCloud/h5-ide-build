(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeDBParameterGroups, DescribeDBParameters, URL, parserDescribeDBParameterGroupsReturn, parserDescribeDBParametersReturn, resolveDescribeDBParameterGroupsResult, resolveDescribeDBParametersResult, send_request;
    URL = '/aws/rds/parametergroup/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("parametergroup." + api_name + " callback is null");
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
        console.log("parametergroup." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeDBParameterGroupsResult = function(result) {};
    parserDescribeDBParameterGroupsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeDBParameterGroupsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeDBParametersResult = function(result) {};
    parserDescribeDBParametersReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeDBParametersResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeDBParameterGroups = function(src, username, session_id, region_name, pg_name, marker, max_records, callback) {
      if (pg_name == null) {
        pg_name = null;
      }
      if (marker == null) {
        marker = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      send_request("DescribeDBParameterGroups", src, [username, session_id, region_name, pg_name, marker, max_records], parserDescribeDBParameterGroupsReturn, callback);
      return true;
    };
    DescribeDBParameters = function(src, username, session_id, region_name, pg_name, source, marker, max_records, callback) {
      if (source == null) {
        source = null;
      }
      if (marker == null) {
        marker = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      send_request("DescribeDBParameters", src, [username, session_id, region_name, pg_name, source, marker, max_records], parserDescribeDBParametersReturn, callback);
      return true;
    };
    return {
      DescribeDBParameterGroups: DescribeDBParameterGroups,
      DescribeDBParameters: DescribeDBParameters
    };
  });

}).call(this);
