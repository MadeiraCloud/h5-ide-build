(function() {
  define('ApiRequestDefs',[], function() {

    /*
     * === McError ===
     * McError is Object to represent an Error. Every promise handler that wants to throw error should throw an McError
     */
    var ApiRequestDefs;
    window.McError = function(errorNum, errorMsg, params) {
      return {
        error: errorNum,
        msg: errorMsg || "",
        result: params || void 0
      };
    };

    /*
    == Following name of the paramter is autofilled. Thus the paramter is not required.
    == It also means that you cannot use a param name if the param is for sth. else.
       For example, the param's name cannot be username, if it's used to represent Instance's Id.
    
    ** Auto Fill List :
    username
    usercode
    session_id
     */
    ApiRequestDefs = {};
    ApiRequestDefs.Defs = {
      login: {
        url: "/session/",
        method: "login",
        params: ["username", "password"]
      },
      logout: {
        url: "/session/",
        method: "logout",
        params: ["username", "session_id"]
      },
      updateCred: {
        url: "/account/",
        method: "set_credential",
        params: ["username", "session_id", "access_key", "secret_key", "account_id", "force"]
      },
      validateCred: {
        url: "/account/",
        method: "validate_credential",
        params: ["username", "session_id", "access_key", "secret_key"]
      },
      updateAccount: {
        url: "/account/",
        method: "update_account",
        params: ["username", "session_id", "params"]
      },
      saveStack: {
        url: "/stack/",
        method: "save",
        params: ["username", "session_id", "region_name", 'data']
      },
      createStack: {
        url: "/stack/",
        method: "create",
        params: ["username", "session_id", "region_name", "data"]
      }
    };

    /*
    Parsers are promise's success hanlder.
    Thus, if the parser cannot parse a result, it should throw an error !!!
    An example would be like : `throw McError( 300, "Cannot parse the result" )`
     */
    ApiRequestDefs.Parsers = {};
    ApiRequestDefs.AutoFill = function(paramter_name) {
      switch (paramter_name) {
        case "username":
          return $.cookie('usercode');
        case "session_id":
          return $.cookie('session_id');
      }
      return null;
    };
    return ApiRequestDefs;
  });

}).call(this);

(function() {
  define('api/ApiRequestErrors',[], function() {

    /*
     * === Error Code Defination ===
     * 1. Any network errors will be negative. For example, when server returns 404, the `error` in the promise will be -404.
     */
    var Errors;
    Errors = {
      InvalidRpcReturn: -1,
      XhrFailure: -2,
      InvalidMethodCall: -3,
      Network404: -404,
      Network500: -500,
      InvalidSession: 19,
      ChangeCredConfirm: 325,
      InvalidCred: 326,
      GlobalErrorInit: 100,
      GlobalErrorApi: 101,
      GlobalErrorSession: 102,
      GlobalErrorDb: 103,
      GlobalErrorRegion: 104,
      GlobalErrorId: 105,
      GlobalErrorUsername: 106,
      GlobalErrorIntercom: 107,
      GlobalErrorUnknown: 109,
      UserInvalidUser: 110,
      UserInvalidUsername: 111,
      UserErrorUser: 112,
      UserBlockedUser: 113,
      UserRemovedUser: 114,
      UserNoUser: 115,
      UserInvalidEmail: 116,
      SessionInvalidSessio: 120,
      SessionInvalidId: 121,
      SessionFailedCreate: 122,
      SessionFailedUpdate: 123,
      SessionFailedDelete: 124,
      SessionFailedGet: 125,
      SessionErrorSession: 126,
      SessionNotConnected: 127,
      RequestErrorRequest: 130,
      RequestInvalidId: 131,
      RequestNoPending: 132,
      RequestErrorEmail: 133,
      RequestOnProcess: 134,
      IdConstrain: 134,
      AppInvalidFormat: 210,
      AppNotStop: 211,
      AppBeingOperated: 212,
      AppNotRename: 213,
      AppInvalidId: 214,
      AppInvalidState: 214,
      AppIsRunning: 215,
      AppIsStopped: 216,
      AppNotStoppable: 217,
      FavoriteId: 217,
      GuestErrorGuest: 230,
      GuestInvalidId: 231,
      GuestInvalidState: 232,
      GuestGuestEnd: 233,
      GuestGuestFailed: 234,
      GuestGuestThank: 245,
      GuestGuestBusy: 246,
      OpsbackendId: 246,
      OpsbackendRemoveStat: 240,
      OpsbackendErrorStatu: 241,
      StackInvalidFormat: 250,
      StackNotStop: 251,
      StackRepeatedStack: 252,
      StackInvalidId: 253,
      StackIsRemoved: 254,
      StackIsDisabled: 255,
      StackVerifyFailed: 256,
      StateErrorModule: 260,
      RequestNotSend: 300,
      UserInvalidKey: 320,
      UserInvalidUpdateTim: 321,
      UserExpiredActivatio: 322,
      UserInvalidOperation: 323,
      UserExistedUser: 324,
      UserExistedApp: 325,
      UserInvalidCredentia: 326,
      TokenCreateFailed: 330,
      TokenNoneToken: 331,
      TokenMismatchedToken: 332,
      AwsErrorApi: 400,
      AwsInvalidAws: 401,
      AwsExceededResource: 402,
      AwsErrorAws: 403,
      AwsErrorParams: 404,
      AwsErrorExternal: 405,
      AwsInvalidKeypair: 406,
      AwsErrorEmail: 407,
      AwsNoAmi: 408,
      AwsErrorUnknown: 409
    };
    return Errors;
  });

}).call(this);

(function() {
  define('api/ApiRequestHandlers',["./ApiRequestErrors"], function(Errors) {

    /*
     * === Global Error Handlers ===
     * These handlers are used to handle specific errors for any ajax call
     */
    var Handlers;
    Handlers = {};
    return Handlers;
  });

}).call(this);

define('api/define/forge',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'session_login'           : { url:'/session/',	method:'login',	params:['username', 'password']   },
		'session_logout'          : { url:'/session/',	method:'logout',	params:['username', 'session_id']   },
		'session_set_credential'  : { url:'/session/',	method:'set_credential',	params:['username', 'session_id', 'access_key', 'secret_key', 'account_id']   },
		'app_create'              : { url:'/app/',	method:'create',	params:['username', 'session_id', 'region_name', 'spec']   },
		'app_update'              : { url:'/app/',	method:'update',	params:['username', 'session_id', 'region_name', 'spec', 'app_id']   },
		'app_rename'              : { url:'/app/',	method:'rename',	params:['username', 'session_id', 'region_name', 'app_id', 'new_name', 'app_name']   },
		'app_terminate'           : { url:'/app/',	method:'terminate',	params:['username', 'session_id', 'region_name', 'app_id', 'app_name', 'flag']   },
		'app_start'               : { url:'/app/',	method:'start',	params:['username', 'session_id', 'region_name', 'app_id', 'app_name']   },
		'app_stop'                : { url:'/app/',	method:'stop',	params:['username', 'session_id', 'region_name', 'app_id', 'app_name', 'force']   },
		'app_reboot'              : { url:'/app/',	method:'reboot',	params:['username', 'session_id', 'region_name', 'app_id', 'app_name']   },
		'app_info'                : { url:'/app/',	method:'info',	params:['username', 'session_id', 'region_name', 'app_ids']   },
		'app_list'                : { url:'/app/',	method:'list',	params:['username', 'session_id', 'region_name', 'app_ids']   },
		'app_resource'            : { url:'/app/',	method:'resource',	params:['username', 'session_id', 'region_name', 'app_id']   },
		'app_get_info'            : { url:'/app/',	method:'get_info',	params:['username', 'session_id', 'vpc_ids']   },
		'app_save_info'           : { url:'/app/',	method:'save_info',	params:['username', 'session_id', 'spec', 'resource']   },
		'favorite_add'            : { url:'/favorite/',	method:'add',	params:['username', 'session_id', 'region_name', 'resource']   },
		'favorite_remove'         : { url:'/favorite/',	method:'remove',	params:['username', 'session_id', 'region_name', 'resource_ids']   },
		'favorite_info'           : { url:'/favorite/',	method:'info',	params:['username', 'session_id', 'region_name', 'provider', 'service', 'resource']   },
		'guest_invite'            : { url:'/guest/',	method:'invite',	params:['username', 'session_id', 'region_name', 'guest_emails', 'stack_id', 'time_length', 'time_due', 'post_ops', 'autostart', 'autostop_when', 'autostop_during', 'information', 'stack_name']   },
		'guest_cancel'            : { url:'/guest/',	method:'cancel',	params:['username', 'session_id', 'region_name', 'guest_id']   },
		'guest_access'            : { url:'/guest/',	method:'access',	params:['guestname', 'session_id', 'region_name', 'guest_id']   },
		'guest_end'               : { url:'/guest/',	method:'end',	params:['guestname', 'session_id', 'region_name', 'guest_id']   },
		'guest_info'              : { url:'/guest/',	method:'info',	params:['username', 'session_id', 'region_name', 'guest_id']   },
		'opsbackend_render_app'   : { url:'/opsbackend/',	method:'render_app',	params:['timestamp', 'app_id', 'res_id', 'is_arrived']   },
		'opsbackend_check_app'    : { url:'/opsbackend/',	method:'check_app',	params:['timestamp', 'app_id']   },
		'opsbackend_update_status' : { url:'/opsbackend/',	method:'update_status',	params:['app_id', 'instance_id', 'recipe_version', 'timestamp', 'statuses', 'waiting', 'agent_status', 'token']   },
		'opsbackend_verify'       : { url:'/opsbackend/',	method:'verify',	params:['username', 'token']   },
		'request_init'            : { url:'/request/',	method:'init',	params:['username', 'session_id', 'region_name']   },
		'request_update'          : { url:'/request/',	method:'update',	params:['username', 'session_id', 'region_name', 'timestamp']   },
		'stack_create'            : { url:'/stack/',	method:'create',	params:['username', 'session_id', 'region_name', 'spec']   },
		'stack_remove'            : { url:'/stack/',	method:'remove',	params:['username', 'session_id', 'region_name', 'stack_id', 'stack_name']   },
		'stack_save'              : { url:'/stack/',	method:'save',	params:['username', 'session_id', 'region_name', 'spec']   },
		'stack_rename'            : { url:'/stack/',	method:'rename',	params:['username', 'session_id', 'region_name', 'stack_id', 'new_name', 'stack_name']   },
		'stack_run'               : { url:'/stack/',	method:'run',	params:['username', 'session_id', 'region_name', 'stack_id', 'app_name', 'app_desc', 'app_component', 'app_property', 'app_layout', 'stack_name', 'usage']   },
		'stack_save_as'           : { url:'/stack/',	method:'save_as',	params:['username', 'session_id', 'region_name', 'stack_id', 'new_name', 'stack_name']   },
		'stack_info'              : { url:'/stack/',	method:'info',	params:['username', 'session_id', 'region_name', 'stack_ids']   },
		'stack_list'              : { url:'/stack/',	method:'list',	params:['username', 'session_id', 'region_name', 'stack_ids']   },
		'stack_export_cloudformation' : { url:'/stack/',	method:'export_cloudformation',	params:['username', 'session_id', 'region_name', 'stack']   },
		'stack_verify'            : { url:'/stack/',	method:'verify',	params:['username', 'session_id', 'spec']   },
		'stackstore_fetch_stackstore' : { url:'/stackstore/',	method:'fetch_stackstore',	params:['sub_path']   },
		'state_module'            : { url:'/state/',	method:'module',	params:['username', 'session_id', 'mod_repo', 'mod_tag']   },
		'state_status'            : { url:'/state/',	method:'status',	params:['username', 'session_id', 'app_id']   },
		'state_log'               : { url:'/state/',	method:'log',	params:['username', 'session_id', 'app_id', 'res_id']   },
		'token_create'            : { url:'/token/',	method:'create',	params:['username', 'session_id', 'token_name']   },
		'token_update'            : { url:'/token/',	method:'update',	params:['username', 'session_id', 'token', 'new_token_name']   },
		'token_remove'            : { url:'/token/',	method:'remove',	params:['username', 'session_id', 'token', 'token_name']   },
		'token_list'              : { url:'/token/',	method:'list',	params:['username', 'session_id', 'token_names']   },
		'account_register'        : { url:'/account/',	method:'register',	params:['username', 'password', 'email']   },
		'account_update_account'  : { url:'/account/',	method:'update_account',	params:['username', 'session_id', 'attributes']   },
		'account_reset_password'  : { url:'/account/',	method:'reset_password',	params:['username']   },
		'account_update_password' : { url:'/account/',	method:'update_password',	params:['key', 'new_pwd']   },
		'account_check_repeat'    : { url:'/account/',	method:'check_repeat',	params:['username', 'email']   },
		'account_check_validation' : { url:'/account/',	method:'check_validation',	params:['key', 'operation_flag']   },
		'account_reset_key'       : { url:'/account/',	method:'reset_key',	params:['username', 'session_id', 'flag']   },
		'account_del_account'     : { url:'/account/',	method:'del_account',	params:['username', 'email', 'password', 'force_delete']   },
		'account_is_invitated'    : { url:'/account/',	method:'is_invitated',	params:['username', 'session_id']   },
		'account_apply_trial'     : { url:'/account/',	method:'apply_trial',	params:['username', 'session_id', 'message']   },
		'account_set_credential'  : { url:'/account/',	method:'set_credential',	params:['username', 'session_id', 'access_key', 'secret_key', 'account_id', 'force_update']   },
		'account_validate_credential' : { url:'/account/',	method:'validate_credential',	params:['username', 'session_id', 'access_key', 'secret_key']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/autoscaling',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'asl_DescribeAdjustmentTypes'            : { url:'/aws/autoscaling/',	method:'DescribeAdjustmentTypes',	params:['username', 'session_id', 'region_name']   },
		'asl_DescribeAutoScalingGroups'          : { url:'/aws/autoscaling/',	method:'DescribeAutoScalingGroups',	params:['username', 'session_id', 'region_name', 'group_names', 'max_records', 'next_token']   },
		'asl_DescribeAutoScalingInstances'       : { url:'/aws/autoscaling/',	method:'DescribeAutoScalingInstances',	params:['username', 'session_id', 'region_name', 'instance_ids', 'max_records', 'next_token']   },
		'asl_DescribeAutoScalingNotificationTypes' : { url:'/aws/autoscaling/',	method:'DescribeAutoScalingNotificationTypes',	params:['username', 'session_id', 'region_name']   },
		'asl_DescribeLaunchConfigurations'       : { url:'/aws/autoscaling/',	method:'DescribeLaunchConfigurations',	params:['username', 'session_id', 'region_name', 'config_names', 'max_records', 'next_token']   },
		'asl_DeleteLaunchConfiguration'          : { url:'/aws/autoscaling/',	method:'DeleteLaunchConfiguration',	params:['username', 'session_id', 'region_name', 'config_name']   },
		'asl_DescribeMetricCollectionTypes'      : { url:'/aws/autoscaling/',	method:'DescribeMetricCollectionTypes',	params:['username', 'session_id', 'region_name']   },
		'asl_DescribeNotificationConfigurations' : { url:'/aws/autoscaling/',	method:'DescribeNotificationConfigurations',	params:['username', 'session_id', 'region_name', 'group_names', 'max_records', 'next_token']   },
		'asl_DescribePolicies'                   : { url:'/aws/autoscaling/',	method:'DescribePolicies',	params:['username', 'session_id', 'region_name', 'group_name', 'policy_names', 'max_records', 'next_token']   },
		'asl_DescribeScalingActivities'          : { url:'/aws/autoscaling/',	method:'DescribeScalingActivities',	params:['username', 'session_id', 'region_name', 'group_name', 'activity_ids', 'max_records', 'next_token']   },
		'asl_DescribeScalingProcessTypes'        : { url:'/aws/autoscaling/',	method:'DescribeScalingProcessTypes',	params:['username', 'session_id', 'region_name']   },
		'asl_DescribeScheduledActions'           : { url:'/aws/autoscaling/',	method:'DescribeScheduledActions',	params:['username', 'session_id', 'region_name', 'group_name', 'action_names', 'start_time', 'end_time', 'max_records', 'next_token']   },
		'asl_DescribeTags'                       : { url:'/aws/autoscaling/',	method:'DescribeTags',	params:['username', 'session_id', 'region_name', 'filters', 'max_records', 'next_token']   },
		'asl_CreateAutoScalingGroup'             : { url:'/aws/autoscaling/',	method:'CreateAutoScalingGroup',	params:['username', 'session_id', 'region_name', 'group_name', 'min_size', 'max_size', 'availability_zones', 'default_cooldown', 'desired_capacity', 'health_check_period', 'health_check_type', 'instance_id', 'launch_config', 'load_balancers', 'placement_group', 'tags', 'termination_policies', 'vpc_zone_identifier']   },
		'asl_CreateLaunchConfiguration'          : { url:'/aws/autoscaling/',	method:'CreateLaunchConfiguration',	params:['username', 'session_id', 'region_name', 'config_name', 'associate_public_ip', 'block_device_mappings', 'ebs_optimized', 'iam_instance_profile', 'image_id', 'instance_id', 'instance_monitoring', 'instance_type', 'kernel_id', 'key_name', 'placement_tenancy', 'ramdisk_id', 'security_groups', 'spot_price', 'user_data']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/aws',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'aws_quickstart'     : { url:'/aws/',	method:'quickstart',	params:['username', 'session_id', 'region_name']   },
		'aws_public'         : { url:'/aws/',	method:'public',	params:['username', 'session_id', 'region_name', 'filters']   },
		'aws_property'       : { url:'/aws/',	method:'property',	params:['username', 'session_id']   },
		'aws_resource'       : { url:'/aws/',	method:'resource',	params:['username', 'session_id', 'region_name', 'resources', 'addition', 'retry_times']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/cloudwatch',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'clw_GetMetricStatistics'                : { url:'/aws/cloudwatch/',	method:'GetMetricStatistics',	params:['username', 'session_id', 'region_name', 'metric_name', 'namespace', 'start_time', 'end_time', 'period', 'statistics', 'unit', 'dimensions']   },
		'clw_ListMetrics'                        : { url:'/aws/cloudwatch/',	method:'ListMetrics',	params:['username', 'session_id', 'region_name', 'metric_name', 'namespace', 'dimensions', 'next_token']   },
		'clw_DescribeAlarmHistory'               : { url:'/aws/cloudwatch/',	method:'DescribeAlarmHistory',	params:['username', 'session_id', 'region_name', 'alarm_name', 'start_date', 'end_date', 'history_item_type', 'max_records', 'next_token']   },
		'clw_DescribeAlarms'                     : { url:'/aws/cloudwatch/',	method:'DescribeAlarms',	params:['username', 'session_id', 'region_name', 'alarm_names', 'alarm_name_prefix', 'action_prefix', 'state_value', 'max_records', 'next_token']   },
		'clw_DescribeAlarmsForMetric'            : { url:'/aws/cloudwatch/',	method:'DescribeAlarmsForMetric',	params:['username', 'session_id', 'region_name', 'metric_name', 'namespace', 'dimension_names', 'period', 'statistic', 'unit']   },
		'clw_DeleteAlarms'                       : { url:'/aws/cloudwatch/',	method:'DeleteAlarms',	params:['username', 'session_id', 'region_name', 'alarm_names']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/ec2',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'ec2_CreateTags'                         : { url:'/aws/ec2/',	method:'CreateTags',	params:['username', 'session_id', 'region_name', 'resource_ids', 'tags']   },
		'ec2_DeleteTags'                         : { url:'/aws/ec2/',	method:'DeleteTags',	params:['username', 'session_id', 'region_name', 'resource_ids', 'tags']   },
		'ec2_DescribeTags'                       : { url:'/aws/ec2/',	method:'DescribeTags',	params:['username', 'session_id', 'region_name', 'filters']   },
		'ec2_DescribeRegions'                    : { url:'/aws/ec2/',	method:'DescribeRegions',	params:['username', 'session_id', 'region_names', 'filters']   },
		'ec2_DescribeAvailabilityZones'          : { url:'/aws/ec2/',	method:'DescribeAvailabilityZones',	params:['username', 'session_id', 'region_name', 'zone_names', 'filters']   },
		'ami_CreateImage'                        : { url:'/aws/ec2/ami/',	method:'CreateImage',	params:['username', 'session_id', 'region_name', 'instance_id', 'ami_name', 'ami_desc', 'no_reboot', 'bd_mappings']   },
		'ami_RegisterImage'                      : { url:'/aws/ec2/ami/',	method:'RegisterImage',	params:['username', 'session_id', 'region_name', 'ami_name', 'ami_desc', 'location', 'architecture', 'kernel_id', 'ramdisk_id', 'root_device_name', 'block_device_map']   },
		'ami_DeregisterImage'                    : { url:'/aws/ec2/ami/',	method:'DeregisterImage',	params:['username', 'session_id', 'region_name', 'ami_id']   },
		'ami_ModifyImageAttribute'               : { url:'/aws/ec2/ami/',	method:'ModifyImageAttribute',	params:['username', 'session_id', 'region_name', 'ami_id', 'user_ids', 'group_names', 'product_codes', 'description']   },
		'ami_ResetImageAttribute'                : { url:'/aws/ec2/ami/',	method:'ResetImageAttribute',	params:['username', 'session_id', 'region_name', 'ami_id', 'attribute_name']   },
		'ami_DescribeImageAttribute'             : { url:'/aws/ec2/ami/',	method:'DescribeImageAttribute',	params:['username', 'session_id', 'region_name', 'ami_id', 'attribute_name']   },
		'ami_DescribeImages'                     : { url:'/aws/ec2/ami/',	method:'DescribeImages',	params:['username', 'session_id', 'region_name', 'ami_ids', 'owners', 'executable_by', 'filters']   },
		'ebs_CreateVolume'                       : { url:'/aws/ec2/ebs/volume/',	method:'CreateVolume',	params:['username', 'session_id', 'region_name', 'zone_name', 'snapshot_id', 'volume_size', 'volume_type', 'iops']   },
		'ebs_DeleteVolume'                       : { url:'/aws/ec2/ebs/volume/',	method:'DeleteVolume',	params:['username', 'session_id', 'region_name', 'volume_id']   },
		'ebs_AttachVolume'                       : { url:'/aws/ec2/ebs/volume/',	method:'AttachVolume',	params:['username', 'session_id', 'region_name', 'volume_id', 'instance_id', 'device']   },
		'ebs_DetachVolume'                       : { url:'/aws/ec2/ebs/volume/',	method:'DetachVolume',	params:['username', 'session_id', 'region_name', 'volume_id', 'instance_id', 'device', 'force']   },
		'ebs_DescribeVolumes'                    : { url:'/aws/ec2/ebs/volume/',	method:'DescribeVolumes',	params:['username', 'session_id', 'region_name', 'volume_ids', 'filters']   },
		'ebs_DescribeVolumeAttribute'            : { url:'/aws/ec2/ebs/volume/',	method:'DescribeVolumeAttribute',	params:['username', 'session_id', 'region_name', 'volume_id', 'attribute_name']   },
		'ebs_DescribeVolumeStatus'               : { url:'/aws/ec2/ebs/volume/',	method:'DescribeVolumeStatus',	params:['username', 'session_id', 'region_name', 'volume_ids', 'filters', 'max_result', 'next_token']   },
		'ebs_ModifyVolumeAttribute'              : { url:'/aws/ec2/ebs/volume/',	method:'ModifyVolumeAttribute',	params:['username', 'session_id', 'region_name', 'volume_id', 'auto_enable_IO']   },
		'ebs_EnableVolumeIO'                     : { url:'/aws/ec2/ebs/volume/',	method:'EnableVolumeIO',	params:['username', 'session_id', 'region_name', 'volume_id']   },
		'ebs_CreateSnapshot'                     : { url:'/aws/ec2/ebs/snapshot/',	method:'CreateSnapshot',	params:['username', 'session_id', 'region_name', 'volume_id', 'description']   },
		'ebs_DeleteSnapshot'                     : { url:'/aws/ec2/ebs/snapshot/',	method:'DeleteSnapshot',	params:['username', 'session_id', 'region_name', 'snapshot_id']   },
		'ebs_ModifySnapshotAttribute'            : { url:'/aws/ec2/ebs/snapshot/',	method:'ModifySnapshotAttribute',	params:['username', 'session_id', 'region_name', 'snapshot_id', 'user_ids', 'group_names']   },
		'ebs_ResetSnapshotAttribute'             : { url:'/aws/ec2/ebs/snapshot/',	method:'ResetSnapshotAttribute',	params:['username', 'session_id', 'region_name', 'snapshot_id', 'attribute_name']   },
		'ebs_DescribeSnapshots'                  : { url:'/aws/ec2/ebs/snapshot/',	method:'DescribeSnapshots',	params:['username', 'session_id', 'region_name', 'snapshot_ids', 'owners', 'restorable_by', 'filters']   },
		'ebs_DescribeSnapshotAttribute'          : { url:'/aws/ec2/ebs/snapshot/',	method:'DescribeSnapshotAttribute',	params:['username', 'session_id', 'region_name', 'snapshot_id', 'attribute_name']   },
		'eip_AllocateAddress'                    : { url:'/aws/ec2/elasticip/',	method:'AllocateAddress',	params:['username', 'session_id', 'region_name', 'domain']   },
		'eip_ReleaseAddress'                     : { url:'/aws/ec2/elasticip/',	method:'ReleaseAddress',	params:['username', 'session_id', 'region_name', 'ip', 'allocation_id']   },
		'eip_AssociateAddress'                   : { url:'/aws/ec2/elasticip/',	method:'AssociateAddress',	params:['username', 'session_id', 'region_name', 'ip', 'instance_id', 'allocation_id', 'nif_id', 'private_ip', 'allow_reassociation']   },
		'eip_DisassociateAddress'                : { url:'/aws/ec2/elasticip/',	method:'DisassociateAddress',	params:['username', 'session_id', 'region_name', 'ip', 'association_id']   },
		'eip_DescribeAddresses'                  : { url:'/aws/ec2/elasticip/',	method:'DescribeAddresses',	params:['username', 'session_id', 'region_name', 'ips', 'allocation_ids', 'filters']   },
		'ins_RunInstances'                       : { url:'/aws/ec2/instance/',	method:'RunInstances',	params:['username', 'session_id', 'region_name', 'ami_id', 'min_count', 'max_count', 'key_name', 'security_group_ids', 'security_group_names', 'user_data', 'instance_type', 'placement', 'kernel_id', 'ramdisk_id', 'block_device_map', 'monitoring_enabled', 'subnet_id', 'disable_api_termination', 'instance_initiated_shutdown_behavior', 'private_ip_address', 'client_token', 'network_interfaces', 'iam_instance_profiles', 'ebs_optimized']   },
		'ins_StartInstances'                     : { url:'/aws/ec2/instance/',	method:'StartInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_StopInstances'                      : { url:'/aws/ec2/instance/',	method:'StopInstances',	params:['username', 'session_id', 'region_name', 'instance_ids', 'force']   },
		'ins_RebootInstances'                    : { url:'/aws/ec2/instance/',	method:'RebootInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_TerminateInstances'                 : { url:'/aws/ec2/instance/',	method:'TerminateInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_MonitorInstances'                   : { url:'/aws/ec2/instance/',	method:'MonitorInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_UnmonitorInstances'                 : { url:'/aws/ec2/instance/',	method:'UnmonitorInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_BundleInstance'                     : { url:'/aws/ec2/instance/',	method:'BundleInstance',	params:['username', 'session_id', 'region_name', 'instance_id', 's3_bucket', 's3_prefix', 's3_access_key', 's3_upload_policy', 's3_upload_policy_signature']   },
		'ins_CancelBundleTask'                   : { url:'/aws/ec2/instance/',	method:'CancelBundleTask',	params:['username', 'session_id', 'region_name', 'bundle_id']   },
		'ins_ModifyInstanceAttribute'            : { url:'/aws/ec2/instance/',	method:'ModifyInstanceAttribute',	params:['username', 'session_id', 'region_name', 'instance_id', 'instance_type', 'kernel_id', 'ramdisk_id', 'user_data', 'disable_api_termination', 'instance_initiated_shutdown_bahavior', 'block_mapping_device', 'source_dest_check', 'group_ids', 'ebs_optimized']   },
		'ins_ResetInstanceAttribute'             : { url:'/aws/ec2/instance/',	method:'ResetInstanceAttribute',	params:['username', 'session_id', 'region_name', 'instance_id', 'attribute_name']   },
		'ins_ConfirmProductInstance'             : { url:'/aws/ec2/instance/',	method:'ConfirmProductInstance',	params:['username', 'session_id', 'region_name', 'instance_id', 'product_code']   },
		'ins_DescribeInstances'                  : { url:'/aws/ec2/instance/',	method:'DescribeInstances',	params:['username', 'session_id', 'region_name', 'instance_ids', 'filters']   },
		'ins_DescribeInstanceStatus'             : { url:'/aws/ec2/instance/',	method:'DescribeInstanceStatus',	params:['username', 'session_id', 'region_name', 'instance_ids', 'include_all_instances', 'max_results', 'next_token']   },
		'ins_DescribeBundleTasks'                : { url:'/aws/ec2/instance/',	method:'DescribeBundleTasks',	params:['username', 'session_id', 'region_name', 'bundle_ids', 'filters']   },
		'ins_DescribeInstanceAttribute'          : { url:'/aws/ec2/instance/',	method:'DescribeInstanceAttribute',	params:['username', 'session_id', 'region_name', 'instance_id', 'attribute_name']   },
		'ins_GetConsoleOutput'                   : { url:'/aws/ec2/instance/',	method:'GetConsoleOutput',	params:['username', 'session_id', 'region_name', 'instance_id']   },
		'ins_GetPasswordData'                    : { url:'/aws/ec2/instance/',	method:'GetPasswordData',	params:['username', 'session_id', 'region_name', 'instance_id', 'key_data']   },
		'kp_CreateKeyPair'                       : { url:'/aws/ec2/keypair/',	method:'CreateKeyPair',	params:['username', 'session_id', 'region_name', 'key_name']   },
		'kp_DeleteKeyPair'                       : { url:'/aws/ec2/keypair/',	method:'DeleteKeyPair',	params:['username', 'session_id', 'region_name', 'key_name']   },
		'kp_ImportKeyPair'                       : { url:'/aws/ec2/keypair/',	method:'ImportKeyPair',	params:['username', 'session_id', 'region_name', 'key_name', 'key_data']   },
		'kp_DescribeKeyPairs'                    : { url:'/aws/ec2/keypair/',	method:'DescribeKeyPairs',	params:['username', 'session_id', 'region_name', 'key_names', 'filters']   },
		'kp_upload'                              : { url:'/aws/ec2/keypair/',	method:'upload',	params:['username', 'session_id', 'region_name', 'key_name', 'key_data']   },
		'kp_download'                            : { url:'/aws/ec2/keypair/',	method:'download',	params:['username', 'session_id', 'region_name', 'key_name']   },
		'kp_remove'                              : { url:'/aws/ec2/keypair/',	method:'remove',	params:['username', 'session_id', 'region_name', 'key_name']   },
		'kp_list'                                : { url:'/aws/ec2/keypair/',	method:'list',	params:['username', 'session_id', 'region_name']   },
		'pg_CreatePlacementGroup'                : { url:'/aws/ec2/placementgroup/',	method:'CreatePlacementGroup',	params:['username', 'session_id', 'region_name', 'group_name', 'strategy']   },
		'pg_DeletePlacementGroup'                : { url:'/aws/ec2/placementgroup/',	method:'DeletePlacementGroup',	params:['username', 'session_id', 'region_name', 'group_name']   },
		'pg_DescribePlacementGroups'             : { url:'/aws/ec2/placementgroup/',	method:'DescribePlacementGroups',	params:['username', 'session_id', 'region_name', 'group_names', 'filters']   },
		'sg_CreateSecurityGroup'                 : { url:'/aws/ec2/securitygroup/',	method:'CreateSecurityGroup',	params:['username', 'session_id', 'region_name', 'group_name', 'group_desc', 'vpc_id']   },
		'sg_DeleteSecurityGroup'                 : { url:'/aws/ec2/securitygroup/',	method:'DeleteSecurityGroup',	params:['username', 'session_id', 'region_name', 'group_name', 'group_id']   },
		'sg_AuthorizeSecurityGroupIngress'       : { url:'/aws/ec2/securitygroup/',	method:'AuthorizeSecurityGroupIngress',	params:['username', 'session_id', 'region_name', 'group_name', 'group_id', 'ip_permissions']   },
		'sg_RevokeSecurityGroupIngress'          : { url:'/aws/ec2/securitygroup/',	method:'RevokeSecurityGroupIngress',	params:['username', 'session_id', 'region_name', 'group_name', 'group_id', 'ip_permissions']   },
		'sg_DescribeSecurityGroups'              : { url:'/aws/ec2/securitygroup/',	method:'DescribeSecurityGroups',	params:['username', 'session_id', 'region_name', 'group_names', 'group_ids', 'filters']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/elb',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'elb_DescribeInstanceHealth'             : { url:'/aws/elb/',	method:'DescribeInstanceHealth',	params:['username', 'session_id', 'region_name', 'elb_name', 'instance_ids']   },
		'elb_DescribeLoadBalancerPolicies'       : { url:'/aws/elb/',	method:'DescribeLoadBalancerPolicies',	params:['username', 'session_id', 'region_name', 'elb_name', 'policy_names']   },
		'elb_DescribeLoadBalancerPolicyTypes'    : { url:'/aws/elb/',	method:'DescribeLoadBalancerPolicyTypes',	params:['username', 'session_id', 'region_name', 'policy_type_names']   },
		'elb_DescribeLoadBalancers'              : { url:'/aws/elb/',	method:'DescribeLoadBalancers',	params:['username', 'session_id', 'region_name', 'elb_names', 'marker']   },
		'elb_DescribeLoadBalancerAttributes'     : { url:'/aws/elb/',	method:'DescribeLoadBalancerAttributes',	params:['username', 'session_id', 'region_name', 'elb_name']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/iam',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'iam_GetServerCertificate'               : { url:'/aws/iam/',	method:'GetServerCertificate',	params:['username', 'session_id', 'region_name', 'servercer_name']   },
		'iam_ListServerCertificates'             : { url:'/aws/iam/',	method:'ListServerCertificates',	params:['username', 'session_id', 'region_name', 'marker', 'max_items', 'path_prefix']   },
		'iam_DeleteServerCertificate'            : { url:'/aws/iam/',	method:'DeleteServerCertificate',	params:['username', 'session_id', 'region_name', 'servercer_name']   },
		'iam_UpdateServerCertificate'            : { url:'/aws/iam/',	method:'UpdateServerCertificate',	params:['username', 'session_id', 'region_name', 'servercer_name', 'new_servercer_name', 'new_path']   },
		'iam_UploadServerCertificate'            : { url:'/aws/iam/',	method:'UploadServerCertificate',	params:['username', 'session_id', 'region_name', 'servercer_name', 'cert_body', 'private_key', 'cert_chain', 'path']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/opsworks',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'ow_DescribeApps'                        : { url:'/aws/opsworks/',	method:'DescribeApps',	params:['username', 'session_id', 'region_name', 'app_ids', 'stack_id']   },
		'ow_DescribeStacks'                      : { url:'/aws/opsworks/',	method:'DescribeStacks',	params:['username', 'session_id', 'region_name', 'stack_ids']   },
		'ow_DescribeCommands'                    : { url:'/aws/opsworks/',	method:'DescribeCommands',	params:['username', 'session_id', 'region_name', 'command_ids', 'deployment_id', 'instance_id']   },
		'ow_DescribeDeployments'                 : { url:'/aws/opsworks/',	method:'DescribeDeployments',	params:['username', 'session_id', 'region_name', 'app_id', 'deployment_ids', 'stack_id']   },
		'ow_DescribeElasticIps'                  : { url:'/aws/opsworks/',	method:'DescribeElasticIps',	params:['username', 'session_id', 'region_name', 'instance_id', 'ips']   },
		'ow_DescribeInstances'                   : { url:'/aws/opsworks/',	method:'DescribeInstances',	params:['username', 'session_id', 'region_name', 'app_id', 'instance_ids', 'layer_id', 'stack_id']   },
		'ow_DescribeLayers'                      : { url:'/aws/opsworks/',	method:'DescribeLayers',	params:['username', 'session_id', 'region_name', 'stack_id', 'layer_ids']   },
		'ow_DescribeLoadBasedAutoScaling'        : { url:'/aws/opsworks/',	method:'DescribeLoadBasedAutoScaling',	params:['username', 'session_id', 'region_name', 'layer_ids']   },
		'ow_DescribePermissions'                 : { url:'/aws/opsworks/',	method:'DescribePermissions',	params:['username', 'session_id', 'region_name', 'iam_user_arn', 'stack_id']   },
		'ow_DescribeRaidArrays'                  : { url:'/aws/opsworks/',	method:'DescribeRaidArrays',	params:['username', 'session_id', 'region_name', 'instance_id', 'raid_array_ids']   },
		'ow_DescribeServiceErrors'               : { url:'/aws/opsworks/',	method:'DescribeServiceErrors',	params:['username', 'session_id', 'region_name', 'instance_id', 'service_error_ids', 'stack_id']   },
		'ow_DescribeTimeBasedAutoScaling'        : { url:'/aws/opsworks/',	method:'DescribeTimeBasedAutoScaling',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ow_DescribeUserProfiles'                : { url:'/aws/opsworks/',	method:'DescribeUserProfiles',	params:['username', 'session_id', 'region_name', 'iam_user_arns']   },
		'ow_DescribeVolumes'                     : { url:'/aws/opsworks/',	method:'DescribeVolumes',	params:['username', 'session_id', 'region_name', 'instance_id', 'raid_array_id', 'volume_ids']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/rds',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'rds_DescribeDBEngineVersions'           : { url:'/aws/rds/',	method:'DescribeDBEngineVersions',	params:['username', 'session_id', 'region_name', 'pg_family', 'default_only', 'engine', 'engine_version', 'list_supported_character_set', 'marker', 'max_records']   },
		'rds_DescribeOrderableDBInstanceOptions' : { url:'/aws/rds/',	method:'DescribeOrderableDBInstanceOptions',	params:['username', 'session_id', 'region_name', 'engine', 'engine_version', 'instance_class', 'license_model', 'marker', 'max_records']   },
		'rds_DescribeEngineDefaultParameters'    : { url:'/aws/rds/',	method:'DescribeEngineDefaultParameters',	params:['username', 'session_id', 'region_name', 'pg_family', 'marker', 'max_records']   },
		'rds_DescribeEvents'                     : { url:'/aws/rds/',	method:'DescribeEvents',	params:['username', 'session_id', 'region_name', 'duration', 'start_time', 'end_time', 'source_id', 'source_type', 'marker', 'max_records']   },
		'rds_ins_DescribeDBInstances'            : { url:'/aws/rds/instance/',	method:'DescribeDBInstances',	params:['username', 'session_id', 'region_name', 'instance_id', 'marker', 'max_records']   },
		'rds_og_DescribeOptionGroupOptions'      : { url:'/aws/rds/optiongroup/',	method:'DescribeOptionGroupOptions',	params:['username', 'session_id', 'region_name', 'engine_name', 'major_engine_version', 'marker', 'max_records']   },
		'rds_og_DescribeOptionGroups'            : { url:'/aws/rds/optiongroup/',	method:'DescribeOptionGroups',	params:['username', 'session_id', 'region_name', 'op_name', 'engine_name', 'major_engine_version', 'marker', 'max_records']   },
		'rds_pg_DescribeDBParameterGroups'       : { url:'/aws/rds/parametergroup/',	method:'DescribeDBParameterGroups',	params:['username', 'session_id', 'region_name', 'pg_name', 'marker', 'max_records']   },
		'rds_pg_DescribeDBParameters'            : { url:'/aws/rds/parametergroup/',	method:'DescribeDBParameters',	params:['username', 'session_id', 'region_name', 'pg_name', 'source', 'marker', 'max_records']   },
		'rds_revd_ins_DescribeReservedDBInstances' : { url:'/aws/rds/reservedinstance/',	method:'DescribeReservedDBInstances',	params:['username', 'session_id', 'region_name', 'instance_id', 'instance_class', 'offering_id', 'offering_type', 'duration', 'multi_az', 'description', 'marker', 'max_records']   },
		'rds_revd_ins_DescribeReservedDBInstancesOfferings' : { url:'/aws/rds/reservedinstance/',	method:'DescribeReservedDBInstancesOfferings',	params:['username', 'session_id', 'region_name', 'offering_id', 'offering_type', 'instance_class', 'duration', 'multi_az', 'description', 'marker', 'max_records']   },
		'rds_sg_DescribeDBSecurityGroups'        : { url:'/aws/rds/securitygroup/',	method:'DescribeDBSecurityGroups',	params:['username', 'session_id', 'region_name', 'sg_name', 'marker', 'max_records']   },
		'rds_snap_DescribeDBSnapshots'           : { url:'/aws/rds/snapshot/',	method:'DescribeDBSnapshots',	params:['username', 'session_id', 'region_name', 'instance_id', 'snapshot_id', 'snapshot_type', 'marker', 'max_records']   },
		'rds_subgrp_DescribeDBSubnetGroups'      : { url:'/aws/rds/subnetgroup/',	method:'DescribeDBSubnetGroups',	params:['username', 'session_id', 'region_name', 'sg_name', 'marker', 'max_records']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/sdb',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'sdb_DomainMetadata'                     : { url:'/aws/sdb/',	method:'DomainMetadata',	params:['username', 'session_id', 'region_name', 'doamin_name']   },
		'sdb_GetAttributes'                      : { url:'/aws/sdb/',	method:'GetAttributes',	params:['username', 'session_id', 'region_name', 'domain_name', 'item_name', 'attribute_name', 'consistent_read']   },
		'sdb_ListDomains'                        : { url:'/aws/sdb/',	method:'ListDomains',	params:['username', 'session_id', 'region_name', 'max_domains', 'next_token']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/sns',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'sns_GetSubscriptionAttributes'          : { url:'/aws/sns/',	method:'GetSubscriptionAttributes',	params:['username', 'session_id', 'region_name', 'subscription_arn']   },
		'sns_GetTopicAttributes'                 : { url:'/aws/sns/',	method:'GetTopicAttributes',	params:['username', 'session_id', 'region_name', 'topic_arn']   },
		'sns_ListSubscriptions'                  : { url:'/aws/sns/',	method:'ListSubscriptions',	params:['username', 'session_id', 'region_name', 'next_token']   },
		'sns_SetSubscriptionAttributes'          : { url:'/aws/sns/',	method:'SetSubscriptionAttributes',	params:['username', 'session_id', 'region_name', 'subscription_arn', 'attr_name', 'attr_value']   },
		'sns_ListSubscriptionsByTopic'           : { url:'/aws/sns/',	method:'ListSubscriptionsByTopic',	params:['username', 'session_id', 'region_name', 'topic_arn', 'next_token']   },
		'sns_Subscribe'                          : { url:'/aws/sns/',	method:'Subscribe',	params:['username', 'session_id', 'region_name', 'topic_arn', 'protocol', 'endpoint']   },
		'sns_Unsubscribe'                        : { url:'/aws/sns/',	method:'Unsubscribe',	params:['username', 'session_id', 'region_name', 'sub_arn']   },
		'sns_ListTopics'                         : { url:'/aws/sns/',	method:'ListTopics',	params:['username', 'session_id', 'region_name', 'next_token']   },
		'sns_DeleteTopic'                        : { url:'/aws/sns/',	method:'DeleteTopic',	params:['username', 'session_id', 'region_name', 'topic_arn']   },
		'sns_CreateTopic'                        : { url:'/aws/sns/',	method:'CreateTopic',	params:['username', 'session_id', 'region_name', 'topic_name']   },
		'sns_SetTopicAttributes'                 : { url:'/aws/sns/',	method:'SetTopicAttributes',	params:['username', 'session_id', 'region_name', 'topic_arn', 'attr_name', 'attr_value']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/vpc',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'vpc_DescribeVpcs'                       : { url:'/aws/vpc/',	method:'DescribeVpcs',	params:['username', 'session_id', 'region_name', 'vpc_ids', 'filters']   },
		'vpc_DescribeAccountAttributes'          : { url:'/aws/vpc/',	method:'DescribeAccountAttributes',	params:['username', 'session_id', 'region_name', 'attribute_name']   },
		'vpc_DescribeVpcAttribute'               : { url:'/aws/vpc/',	method:'DescribeVpcAttribute',	params:['username', 'session_id', 'region_name', 'vpc_id', 'attribute']   },
		'acl_DescribeNetworkAcls'                : { url:'/aws/vpc/acl/',	method:'DescribeNetworkAcls',	params:['username', 'session_id', 'region_name', 'acl_ids', 'filters']   },
		'cgw_DescribeCustomerGateways'           : { url:'/aws/vpc/cgw/',	method:'DescribeCustomerGateways',	params:['username', 'session_id', 'region_name', 'gw_ids', 'filters']   },
		'dhcp_AssociateDhcpOptions'              : { url:'/aws/vpc/dhcp/',	method:'AssociateDhcpOptions',	params:['username', 'session_id', 'region_name', 'dhcp_id', 'vpc_id']   },
		'dhcp_DescribeDhcpOptions'               : { url:'/aws/vpc/dhcp/',	method:'DescribeDhcpOptions',	params:['username', 'session_id', 'region_name', 'dhcp_ids', 'filters']   },
		'dhcp_DeleteDhcpOptions'                 : { url:'/aws/vpc/dhcp/',	method:'DeleteDhcpOptions',	params:['username', 'session_id', 'region_name', 'dhcp_id']   },
		'dhcp_CreateDhcpOptions'                 : { url:'/aws/vpc/dhcp/',	method:'CreateDhcpOptions',	params:['username', 'session_id', 'region_name', 'dhcp_configs']   },
		'eni_DescribeNetworkInterfaces'          : { url:'/aws/vpc/eni/',	method:'DescribeNetworkInterfaces',	params:['username', 'session_id', 'region_name', 'eni_ids', 'filters']   },
		'eni_DescribeNetworkInterfaceAttribute'  : { url:'/aws/vpc/eni/',	method:'DescribeNetworkInterfaceAttribute',	params:['username', 'session_id', 'region_name', 'eni_id', 'attribute']   },
		'igw_DescribeInternetGateways'           : { url:'/aws/vpc/igw/',	method:'DescribeInternetGateways',	params:['username', 'session_id', 'region_name', 'gw_ids', 'filters']   },
		'rtb_DescribeRouteTables'                : { url:'/aws/vpc/routetable/',	method:'DescribeRouteTables',	params:['username', 'session_id', 'region_name', 'rt_ids', 'filters']   },
		'subnet_DescribeSubnets'                 : { url:'/aws/vpc/subnet/',	method:'DescribeSubnets',	params:['username', 'session_id', 'region_name', 'subnet_ids', 'filters']   },
		'vgw_DescribeVpnGateways'                : { url:'/aws/vpc/vgw/',	method:'DescribeVpnGateways',	params:['username', 'session_id', 'region_name', 'gw_ids', 'filters']   },
		'vpn_DescribeVpnConnections'             : { url:'/aws/vpc/vpn/',	method:'DescribeVpnConnections',	params:['username', 'session_id', 'region_name', 'vpn_ids', 'filters']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/ApiBundle',[ './define/forge', './define/aws/autoscaling', './define/aws/aws', './define/aws/cloudwatch', './define/aws/ec2', './define/aws/elb', './define/aws/iam', './define/aws/opsworks', './define/aws/rds', './define/aws/sdb', './define/aws/sns', './define/aws/vpc' ],function(){})
;
(function() {
  define('ApiRequest',["ApiRequestDefs", "api/ApiRequestErrors", "api/ApiRequestHandlers", "api/ApiBundle", "MC"], function(ApiDefination, ApiErrors, ApiHandlers) {

    /*
     * === ApiRequest ===
     *
     * Paramters :
     *   apiName       : (String) The name of the api, see ApiRequestDefs
     *   apiParameters : An object to be send with the api request.
     *         If an api has its parameters map, the `apiParameters` will be converted from OBJECT to ARRAY
     *         If an api has no param map, the apiParameters is considered as the first and only one paramter
     *         to be send with the api.
     */
    var Abort, AjaxErrorHandler, AjaxSuccessHandler, ApiRequest, EmptyArray, EmptyObject, OneParaArray, RequestData, logAndThrow;
    OneParaArray = [""];
    EmptyArray = [];
    EmptyObject = {};
    RequestData = {
      jsonrpc: '2.0',
      id: "1",
      method: '',
      params: {}
    };
    logAndThrow = function(obj) {

      /* env:dev                                     env:dev:end */
      throw obj;
    };
    AjaxSuccessHandler = function(res) {
      var gloablHandler;
      if (!res || !res.result || res.result.length !== 2) {
        logAndThrow(McError(ApiErrors.InvalidRpcReturn, "Invalid JsonRpc Return Data"));
      }
      if (res.result[0] !== 0) {
        gloablHandler = ApiHandlers[res.result[0]];
        if (gloablHandler) {
          return gloablHandler(res);
        }
        logAndThrow(McError(res.result[0], "Service Error", res.result[1]));
      }
      return res.result[1];
    };
    AjaxErrorHandler = function(jqXHR, textStatus, error) {
      if (!error && jqXHR.status !== 200) {
        logAndThrow(McError(-jqXHR.status, "Network Error"));
      }
      logAndThrow(McError(ApiErrors.XhrFailure, textStatus, error));
    };
    Abort = function() {
      this.ajax.abort();
    };

    /*
     ApiRequest Defination
     */
    ApiRequest = function(apiName, apiParameters) {
      var ApiDef, ajax, i, p, request, _i, _len, _ref;
      ApiDef = ApiDefination.Defs[apiName];
      apiParameters = apiParameters || EmptyObject;
      if (!ApiDef) {
        console.error("Cannot find defination of the api:", apiName);
        return;
      }
      RequestData.method = ApiDef.method || "";
      if (ApiDef.params) {
        RequestData.params = p = [];
        _ref = ApiDef.params;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (apiParameters.hasOwnProperty(i)) {
            p.push(apiParameters[i]);
          } else {
            p.push(ApiDefination.AutoFill(i));
          }
        }
      } else if (apiParameters) {
        OneParaArray[0] = apiParameters;
        RequestData.params = OneParaArray;
      } else {
        RequestData.params = EmptyArray;
      }
      ajax = $.ajax({
        url: MC.API_HOST + ApiDef.url,
        dataType: "json",
        type: "POST",
        data: JSON.stringify(RequestData)
      });
      request = Q(ajax).then(AjaxSuccessHandler, AjaxErrorHandler);
      if (ApiDefination.Parsers[apiName]) {
        request = request.then(ApiDefination.Parsers[apiName]);
      }
      request.abort = Abort;
      request.ajax = ajax;
      return request;
    };
    ApiRequest.Errors = ApiErrors;
    return ApiRequest;
  });

}).call(this);

