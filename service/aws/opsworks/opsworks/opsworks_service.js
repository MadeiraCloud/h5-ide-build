(function() {
  define(['MC', 'constant', 'result_vo'], function(MC, constant, result_vo) {
    var DescribeApps, DescribeCommands, DescribeDeployments, DescribeElasticIps, DescribeInstances, DescribeLayers, DescribeLoadBasedAutoScaling, DescribePermissions, DescribeRaidArrays, DescribeServiceErrors, DescribeStacks, DescribeTimeBasedAutoScaling, DescribeUserProfiles, DescribeVolumes, URL, parserDescribeAppsReturn, parserDescribeCommandsReturn, parserDescribeDeploymentsReturn, parserDescribeElasticIpsReturn, parserDescribeInstancesReturn, parserDescribeLayersReturn, parserDescribeLoadBasedAutoScalingReturn, parserDescribePermissionsReturn, parserDescribeRaidArraysReturn, parserDescribeServiceErrorsReturn, parserDescribeStacksReturn, parserDescribeTimeBasedAutoScalingReturn, parserDescribeUserProfilesReturn, parserDescribeVolumesReturn, resolveDescribeAppsResult, resolveDescribeCommandsResult, resolveDescribeDeploymentsResult, resolveDescribeElasticIpsResult, resolveDescribeInstancesResult, resolveDescribeLayersResult, resolveDescribeLoadBasedAutoScalingResult, resolveDescribePermissionsResult, resolveDescribeRaidArraysResult, resolveDescribeServiceErrorsResult, resolveDescribeStacksResult, resolveDescribeTimeBasedAutoScalingResult, resolveDescribeUserProfilesResult, resolveDescribeVolumesResult, send_request;
    URL = '/aws/opsworks/opsworks/';
    send_request = function(api_name, src, param_ary, parser, callback) {
      var error;
      if (callback === null) {
        console.log("opsworks." + api_name + " callback is null");
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
        console.log("opsworks." + api_name + " error:" + error.toString());
      }
      return true;
    };
    resolveDescribeAppsResult = function(result) {};
    parserDescribeAppsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeAppsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeStacksResult = function(result) {};
    parserDescribeStacksReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeStacksResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeCommandsResult = function(result) {};
    parserDescribeCommandsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeCommandsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeDeploymentsResult = function(result) {};
    parserDescribeDeploymentsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeDeploymentsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeElasticIpsResult = function(result) {};
    parserDescribeElasticIpsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeElasticIpsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeInstancesResult = function(result) {};
    parserDescribeInstancesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeInstancesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLayersResult = function(result) {};
    parserDescribeLayersReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLayersResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeLoadBasedAutoScalingResult = function(result) {};
    parserDescribeLoadBasedAutoScalingReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeLoadBasedAutoScalingResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribePermissionsResult = function(result) {};
    parserDescribePermissionsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribePermissionsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeRaidArraysResult = function(result) {};
    parserDescribeRaidArraysReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeRaidArraysResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeServiceErrorsResult = function(result) {};
    parserDescribeServiceErrorsReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeServiceErrorsResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeTimeBasedAutoScalingResult = function(result) {};
    parserDescribeTimeBasedAutoScalingReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeTimeBasedAutoScalingResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeUserProfilesResult = function(result) {};
    parserDescribeUserProfilesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeUserProfilesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    resolveDescribeVolumesResult = function(result) {};
    parserDescribeVolumesReturn = function(result, return_code, param) {
      var aws_result, resolved_data;
      aws_result = result_vo.processAWSReturnHandler(result, return_code, param);
      if (return_code === constant.RETURN_CODE.E_OK && !aws_result.is_error) {
        resolved_data = resolveDescribeVolumesResult(result);
        aws_result.resolved_data = resolved_data;
      }
      return aws_result;
    };
    DescribeApps = function(src, username, session_id, region_name, app_ids, stack_id, callback) {
      if (app_ids == null) {
        app_ids = null;
      }
      if (stack_id == null) {
        stack_id = null;
      }
      send_request("DescribeApps", src, [username, session_id, region_name, app_ids, stack_id], parserDescribeAppsReturn, callback);
      return true;
    };
    DescribeStacks = function(src, username, session_id, region_name, stack_ids, callback) {
      if (stack_ids == null) {
        stack_ids = null;
      }
      send_request("DescribeStacks", src, [username, session_id, region_name, stack_ids], parserDescribeStacksReturn, callback);
      return true;
    };
    DescribeCommands = function(src, username, session_id, region_name, command_ids, deployment_id, instance_id, callback) {
      if (command_ids == null) {
        command_ids = null;
      }
      if (deployment_id == null) {
        deployment_id = null;
      }
      if (instance_id == null) {
        instance_id = null;
      }
      send_request("DescribeCommands", src, [username, session_id, region_name, command_ids, deployment_id, instance_id], parserDescribeCommandsReturn, callback);
      return true;
    };
    DescribeDeployments = function(src, username, session_id, region_name, app_id, deployment_ids, stack_id, callback) {
      if (app_id == null) {
        app_id = null;
      }
      if (deployment_ids == null) {
        deployment_ids = null;
      }
      if (stack_id == null) {
        stack_id = null;
      }
      send_request("DescribeDeployments", src, [username, session_id, region_name, app_id, deployment_ids, stack_id], parserDescribeDeploymentsReturn, callback);
      return true;
    };
    DescribeElasticIps = function(src, username, session_id, region_name, instance_id, ips, callback) {
      if (instance_id == null) {
        instance_id = null;
      }
      if (ips == null) {
        ips = null;
      }
      send_request("DescribeElasticIps", src, [username, session_id, region_name, instance_id, ips], parserDescribeElasticIpsReturn, callback);
      return true;
    };
    DescribeInstances = function(src, username, session_id, region_name, app_id, instance_ids, layer_id, stack_id, callback) {
      if (app_id == null) {
        app_id = null;
      }
      if (instance_ids == null) {
        instance_ids = null;
      }
      if (layer_id == null) {
        layer_id = null;
      }
      if (stack_id == null) {
        stack_id = null;
      }
      send_request("DescribeInstances", src, [username, session_id, region_name, app_id, instance_ids, layer_id, stack_id], parserDescribeInstancesReturn, callback);
      return true;
    };
    DescribeLayers = function(src, username, session_id, region_name, stack_id, layer_ids, callback) {
      if (layer_ids == null) {
        layer_ids = null;
      }
      send_request("DescribeLayers", src, [username, session_id, region_name, stack_id, layer_ids], parserDescribeLayersReturn, callback);
      return true;
    };
    DescribeLoadBasedAutoScaling = function(src, username, session_id, region_name, layer_ids, callback) {
      send_request("DescribeLoadBasedAutoScaling", src, [username, session_id, region_name, layer_ids], parserDescribeLoadBasedAutoScalingReturn, callback);
      return true;
    };
    DescribePermissions = function(src, username, session_id, region_name, iam_user_arn, stack_id, callback) {
      send_request("DescribePermissions", src, [username, session_id, region_name, iam_user_arn, stack_id], parserDescribePermissionsReturn, callback);
      return true;
    };
    DescribeRaidArrays = function(src, username, session_id, region_name, instance_id, raid_array_ids, callback) {
      if (instance_id == null) {
        instance_id = null;
      }
      if (raid_array_ids == null) {
        raid_array_ids = null;
      }
      send_request("DescribeRaidArrays", src, [username, session_id, region_name, instance_id, raid_array_ids], parserDescribeRaidArraysReturn, callback);
      return true;
    };
    DescribeServiceErrors = function(src, username, session_id, region_name, instance_id, service_error_ids, stack_id, callback) {
      if (instance_id == null) {
        instance_id = null;
      }
      if (service_error_ids == null) {
        service_error_ids = null;
      }
      if (stack_id == null) {
        stack_id = null;
      }
      send_request("DescribeServiceErrors", src, [username, session_id, region_name, instance_id, service_error_ids, stack_id], parserDescribeServiceErrorsReturn, callback);
      return true;
    };
    DescribeTimeBasedAutoScaling = function(src, username, session_id, region_name, instance_ids, callback) {
      send_request("DescribeTimeBasedAutoScaling", src, [username, session_id, region_name, instance_ids], parserDescribeTimeBasedAutoScalingReturn, callback);
      return true;
    };
    DescribeUserProfiles = function(src, username, session_id, region_name, iam_user_arns, callback) {
      send_request("DescribeUserProfiles", src, [username, session_id, region_name, iam_user_arns], parserDescribeUserProfilesReturn, callback);
      return true;
    };
    DescribeVolumes = function(src, username, session_id, region_name, instance_id, raid_array_id, volume_ids, callback) {
      if (instance_id == null) {
        instance_id = null;
      }
      if (raid_array_id == null) {
        raid_array_id = null;
      }
      if (volume_ids == null) {
        volume_ids = null;
      }
      send_request("DescribeVolumes", src, [username, session_id, region_name, instance_id, raid_array_id, volume_ids], parserDescribeVolumesReturn, callback);
      return true;
    };
    return {
      DescribeApps: DescribeApps,
      DescribeStacks: DescribeStacks,
      DescribeCommands: DescribeCommands,
      DescribeDeployments: DescribeDeployments,
      DescribeElasticIps: DescribeElasticIps,
      DescribeInstances: DescribeInstances,
      DescribeLayers: DescribeLayers,
      DescribeLoadBasedAutoScaling: DescribeLoadBasedAutoScaling,
      DescribePermissions: DescribePermissions,
      DescribeRaidArrays: DescribeRaidArrays,
      DescribeServiceErrors: DescribeServiceErrors,
      DescribeTimeBasedAutoScaling: DescribeTimeBasedAutoScaling,
      DescribeUserProfiles: DescribeUserProfiles,
      DescribeVolumes: DescribeVolumes
    };
  });

}).call(this);
