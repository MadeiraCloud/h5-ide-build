(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeDBEngineVersions, DescribeEngineDefaultParameters, DescribeEvents, DescribeOrderableDBInstanceOptions, URL, parserDescribeDBEngineVersionsReturn, parserDescribeEngineDefaultParametersReturn, parserDescribeEventsReturn, parserDescribeOrderableDBInstanceOptionsReturn, resolveDescribeDBEngineVersionsResult, resolveDescribeEngineDefaultParametersResult, resolveDescribeEventsResult, resolveDescribeOrderableDBInstanceOptionsResult, send_request;
    URL = '/aws/rds/rds/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("rds." + api_name + " callback is null");
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
        console.log("rds." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeDBEngineVersionsResult = function(result) {};
    parserDescribeDBEngineVersionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeDBEngineVersionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeOrderableDBInstanceOptionsResult = function(result) {};
    parserDescribeOrderableDBInstanceOptionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeOrderableDBInstanceOptionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeEngineDefaultParametersResult = function(result) {};
    parserDescribeEngineDefaultParametersReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeEngineDefaultParametersResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeEventsResult = function(result) {};
    parserDescribeEventsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeEventsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeDBEngineVersions = function(src, username, callback) {
      send_request("DescribeDBEngineVersions", src, [username], parserDescribeDBEngineVersionsReturn, callback);
      return true;
    };
    DescribeOrderableDBInstanceOptions = function(src, username, callback) {
      send_request("DescribeOrderableDBInstanceOptions", src, [username], parserDescribeOrderableDBInstanceOptionsReturn, callback);
      return true;
    };
    DescribeEngineDefaultParameters = function(src, username, session_id, region_name, pg_family, marker, max_records, callback) {
      if (marker == null) {
        marker = null;
      }
      if (max_records == null) {
        max_records = null;
      }
      send_request("DescribeEngineDefaultParameters", src, [username, session_id, region_name, pg_family, marker, max_records], parserDescribeEngineDefaultParametersReturn, callback);
      return true;
    };
    DescribeEvents = function(src, username, session_id, callback) {
      send_request("DescribeEvents", src, [username, session_id], parserDescribeEventsReturn, callback);
      return true;
    };
    return {
      DescribeDBEngineVersions: DescribeDBEngineVersions,
      DescribeOrderableDBInstanceOptions: DescribeOrderableDBInstanceOptions,
      DescribeEngineDefaultParameters: DescribeEngineDefaultParameters,
      DescribeEvents: DescribeEvents
    };
  });

}).call(this);
