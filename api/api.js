(function() {
  define('ApiRequestDefs',[], function() {

    /*
     * === McError ===
     * McError is Object to represent an Error. Every promise handler that wants to throw error should throw an McError
     * If McError contains aws result error, it will have 3 additional members:
      awsError     : Number
      awsErrorCode : String
      awsResult    : String or Object
     */
    var ApiRequestDefs;
    window.McError = function(errorNum, errorMsg, params) {
      return {
        error: errorNum,
        msg: errorMsg || "",
        result: params || void 0,
        reason: errorMsg

        /* env:dev                                                     env:dev:end */
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
    ApiRequestDefs = {
      Defs: {},

      /*
      Parsers are promise's success hanlder.
      Thus, if the parser cannot parse a result, it should throw an error !!!
      An example would be like : `throw McError( 300, "Cannot parse the result" )`
       */
      Parsers: {}
    };
    ApiRequestDefs.AutoFill = function(paramter_name) {
      switch (paramter_name) {
        case "username":
          return App.user.get("usercode");
        case "session_id":
          return App.user.get("session");
        case "region_name":
          console.warn("Autofilling region_name:'us-east-1' for ApiRequest, this is for some api who requires region_name while it doesn't care about its value. %o", MC.prettyStackTrace(1));
          return "us-east-1";
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
      InvalidAwsReturn: -4,
      MissingDataInServer: -5,
      OperationFailure: -6,
      Network404: -404,
      Network500: -500,
      ChangeCredConfirm: 296,
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
      AppAlreadyImported: 218,
      AppConflict: 219,
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
      StackConflict: 258,
      StateErrorModule: 260,
      UserInvalidCredentia: 293,
      RequestNotSend: 300,
      UserInvalidKey: 320,
      UserInvalidUpdateTim: 321,
      UserExpiredActivatio: 322,
      UserInvalidOperation: 323,
      UserExistedUser: 324,
      UserExistedApp: 325,
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
    var AwsHandlers, Handlers;
    AwsHandlers = {};
    Handlers = {
      AwsHandlers: AwsHandlers
    };
    Handlers[Errors.GlobalErrorSession] = function(error) {
      App.acquireSession();
      throw error;
    };
    AwsHandlers[401] = function(error) {
      App.askForAwsCredential();
      throw error;
    };
    return Handlers;
  });

}).call(this);

define('api/define/forge',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'session_login'           : { type:'forge', url:'/session/',	method:'login',	params:['username', 'password', 'option']   },
		'session_logout'          : { type:'forge', url:'/session/',	method:'logout',	params:['username', 'session_id']   },
		'app_create'              : { type:'forge', url:'/app/',	method:'create',	params:['username', 'session_id', 'key_id', 'region_name', 'spec']   },
		'app_update'              : { type:'forge', url:'/app/',	method:'update',	params:['username', 'session_id', 'key_id', 'region_name', 'spec', 'app_id', 'fast_update', 'create_snapshot']   },
		'app_rename'              : { type:'forge', url:'/app/',	method:'rename',	params:['username', 'session_id', 'region_name', 'app_id', 'new_name', 'app_name']   },
		'app_terminate'           : { type:'forge', url:'/app/',	method:'terminate',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id', 'app_name', 'flag', 'create_snapshot']   },
		'app_start'               : { type:'forge', url:'/app/',	method:'start',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id', 'app_name']   },
		'app_stop'                : { type:'forge', url:'/app/',	method:'stop',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id', 'app_name', 'force']   },
		'app_reboot'              : { type:'forge', url:'/app/',	method:'reboot',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id', 'app_name']   },
		'app_info'                : { type:'forge', url:'/app/',	method:'info',	params:['username', 'session_id', 'key_id', 'region_name', 'app_ids']   },
		'app_list'                : { type:'forge', url:'/app/',	method:'list',	params:['username', 'session_id', 'key_id', 'region_name', 'app_ids']   },
		'app_resource'            : { type:'forge', url:'/app/',	method:'resource',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id']   },
		'app_get_info'            : { type:'forge', url:'/app/',	method:'get_info',	params:['username', 'session_id', 'key_id', 'vpc_ids']   },
		'app_save_info'           : { type:'forge', url:'/app/',	method:'save_info',	params:['username', 'session_id', 'key_id', 'spec']   },
		'favorite_add'            : { type:'forge', url:'/favorite/',	method:'add',	params:['username', 'session_id', 'region_name', 'resource']   },
		'favorite_remove'         : { type:'forge', url:'/favorite/',	method:'remove',	params:['username', 'session_id', 'region_name', 'resource_ids']   },
		'favorite_info'           : { type:'forge', url:'/favorite/',	method:'info',	params:['username', 'session_id', 'region_name', 'provider', 'service', 'resource']   },
		'guest_invite'            : { type:'forge', url:'/guest/',	method:'invite',	params:['username', 'session_id', 'key_id', 'region_name', 'guest_emails', 'stack_id', 'time_length', 'time_due', 'post_ops', 'autostart', 'autostop_when', 'autostop_during', 'information', 'stack_name']   },
		'guest_cancel'            : { type:'forge', url:'/guest/',	method:'cancel',	params:['username', 'session_id', 'key_id', 'region_name', 'guest_id']   },
		'guest_access'            : { type:'forge', url:'/guest/',	method:'access',	params:['guestname', 'session_id', 'key_id', 'region_name', 'guest_id']   },
		'guest_end'               : { type:'forge', url:'/guest/',	method:'end',	params:['guestname', 'session_id', 'key_id', 'region_name', 'guest_id']   },
		'guest_info'              : { type:'forge', url:'/guest/',	method:'info',	params:['username', 'session_id', 'region_name', 'guest_id']   },
		'opsbackend_render_app'   : { type:'forge', url:'/opsbackend/',	method:'render_app',	params:['timestamp', 'app_id', 'res_id', 'is_arrived']   },
		'opsbackend_check_app'    : { type:'forge', url:'/opsbackend/',	method:'check_app',	params:['timestamp', 'app_id']   },
		'opsbackend_update_status' : { type:'forge', url:'/opsbackend/',	method:'update_status',	params:['app_id', 'instance_id', 'recipe_version', 'timestamp', 'statuses', 'waiting', 'agent_status', 'token']   },
		'opsbackend_verify'       : { type:'forge', url:'/opsbackend/',	method:'verify',	params:['username', 'token']   },
		'project_create'          : { type:'forge', url:'/project/',	method:'create',	params:['username', 'session_id', 'project_name', 'email', 'first_name', 'last_name', 'credit_card']   },
		'project_rename'          : { type:'forge', url:'/project/',	method:'rename',	params:['username', 'session_id', 'project_id', 'spec']   },
		'project_remove'          : { type:'forge', url:'/project/',	method:'remove',	params:['username', 'session_id', 'project_id']   },
		'project_list'            : { type:'forge', url:'/project/',	method:'list',	params:['username', 'session_id', 'project_ids']   },
		'project_update_payment'  : { type:'forge', url:'/project/',	method:'update_payment',	params:['username', 'session_id', 'project_id', 'attributes']   },
		'project_invite'          : { type:'forge', url:'/project/',	method:'invite',	params:['username', 'session_id', 'project_id', 'member_email', 'member_role']   },
		'project_check_invitation' : { type:'forge', url:'/project/',	method:'check_invitation',	params:['session_id', 'key']   },
		'project_cancel_invitation' : { type:'forge', url:'/project/',	method:'cancel_invitation',	params:['username', 'session_id', 'project_id', 'member_id']   },
		'project_remove_members'  : { type:'forge', url:'/project/',	method:'remove_members',	params:['username', 'session_id', 'project_id', 'member_ids']   },
		'project_update_role'     : { type:'forge', url:'/project/',	method:'update_role',	params:['username', 'session_id', 'project_id', 'member_id', 'new_role']   },
		'project_list_member'     : { type:'forge', url:'/project/',	method:'list_member',	params:['username', 'session_id', 'project_id']   },
		'project_add_credential'  : { type:'forge', url:'/project/',	method:'add_credential',	params:['username', 'session_id', 'project_id', 'credential']   },
		'project_remove_credential' : { type:'forge', url:'/project/',	method:'remove_credential',	params:['username', 'session_id', 'project_id', 'key_id']   },
		'project_update_credential' : { type:'forge', url:'/project/',	method:'update_credential',	params:['username', 'session_id', 'project_id', 'key_id', 'credential', 'force_update']   },
		'request_init'            : { type:'forge', url:'/request/',	method:'init',	params:['username', 'session_id', 'region_name']   },
		'request_update'          : { type:'forge', url:'/request/',	method:'update',	params:['username', 'session_id', 'region_name', 'timestamp']   },
		'resource_change_detail'  : { type:'forge', url:'/resource/',	method:'change_detail',	params:['username', 'session_id', 'region_name', 'app_id']   },
		'resource_get_resource'   : { type:'forge', url:'/resource/',	method:'get_resource',	params:['username', 'session_id', 'project_id', 'region_name', 'provider', 'res_id', 'resource']   },
		'resource_check_change'   : { type:'forge', url:'/resource/',	method:'check_change',	params:['username', 'session_id', 'region_name', 'app_id']   },
		'resource_region_resource' : { type:'forge', url:'/resource/',	method:'region_resource',	params:['username', 'session_id', 'project_id']   },
		'stack_create'            : { type:'forge', url:'/stack/',	method:'create',	params:['username', 'session_id', 'key_id', 'region_name', 'spec']   },
		'stack_remove'            : { type:'forge', url:'/stack/',	method:'remove',	params:['username', 'session_id', 'region_name', 'stack_id', 'stack_name']   },
		'stack_save'              : { type:'forge', url:'/stack/',	method:'save',	params:['username', 'session_id', 'region_name', 'spec']   },
		'stack_rename'            : { type:'forge', url:'/stack/',	method:'rename',	params:['username', 'session_id', 'region_name', 'stack_id', 'new_name', 'stack_name']   },
		'stack_run'               : { type:'forge', url:'/stack/',	method:'run',	params:['username', 'session_id', 'key_id', 'region_name', 'stack', 'app_name']   },
		'stack_save_as'           : { type:'forge', url:'/stack/',	method:'save_as',	params:['username', 'session_id', 'region_name', 'stack_id', 'new_name', 'stack_name']   },
		'stack_info'              : { type:'forge', url:'/stack/',	method:'info',	params:['username', 'session_id', 'key_id', 'region_name', 'stack_ids']   },
		'stack_list'              : { type:'forge', url:'/stack/',	method:'list',	params:['username', 'session_id', 'key_id', 'region_name', 'stack_ids']   },
		'stack_export_cloudformation' : { type:'forge', url:'/stack/',	method:'export_cloudformation',	params:['username', 'session_id', 'region_name', 'stack']   },
		'stack_import_cloudformation' : { type:'forge', url:'/stack/',	method:'import_cloudformation',	params:['username', 'session_id', 'region_name', 'cf_template', 'parameters']   },
		'stack_verify'            : { type:'forge', url:'/stack/',	method:'verify',	params:['username', 'session_id', 'spec']   },
		'stackstore_fetch_stackstore' : { type:'forge', url:'/stackstore/',	method:'fetch_stackstore',	params:['sub_path']   },
		'state_module'            : { type:'forge', url:'/state/',	method:'module',	params:['username', 'session_id', 'mod_repo', 'mod_tag']   },
		'state_status'            : { type:'forge', url:'/state/',	method:'status',	params:['username', 'session_id', 'app_id']   },
		'state_log'               : { type:'forge', url:'/state/',	method:'log',	params:['username', 'session_id', 'app_id', 'res_id']   },
		'token_create'            : { type:'forge', url:'/token/',	method:'create',	params:['username', 'session_id', 'project_id', 'token_name']   },
		'token_update'            : { type:'forge', url:'/token/',	method:'update',	params:['username', 'session_id', 'project_id', 'token', 'new_token_name']   },
		'token_remove'            : { type:'forge', url:'/token/',	method:'remove',	params:['username', 'session_id', 'project_id', 'token', 'token_name']   },
		'token_list'              : { type:'forge', url:'/token/',	method:'list',	params:['username', 'session_id', 'project_id', 'token_names']   },
		'account_register'        : { type:'forge', url:'/account/',	method:'register',	params:['username', 'password', 'email', 'attributes']   },
		'account_update_account'  : { type:'forge', url:'/account/',	method:'update_account',	params:['username', 'session_id', 'attributes']   },
		'account_reset_password'  : { type:'forge', url:'/account/',	method:'reset_password',	params:['username']   },
		'account_update_password' : { type:'forge', url:'/account/',	method:'update_password',	params:['key', 'new_pwd']   },
		'account_check_repeat'    : { type:'forge', url:'/account/',	method:'check_repeat',	params:['username', 'email']   },
		'account_check_validation' : { type:'forge', url:'/account/',	method:'check_validation',	params:['key', 'operation_flag']   },
		'account_is_invitated'    : { type:'forge', url:'/account/',	method:'is_invitated',	params:['username', 'session_id']   },
		'account_apply_trial'     : { type:'forge', url:'/account/',	method:'apply_trial',	params:['username', 'session_id', 'message']   },
		'account_get_userinfo'    : { type:'forge', url:'/account/',	method:'get_userinfo',	params:['username', 'session_id', 'user_email']   },
		'account_list_user'       : { type:'forge', url:'/account/',	method:'list_user',	params:['username', 'session_id', 'user_list']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/autoscaling',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'asl_DescribeAdjustmentTypes'            : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeAdjustmentTypes',	params:['username', 'session_id', 'key_id', 'region_name']   },
		'asl_DescribeAutoScalingGroups'          : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeAutoScalingGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'group_names', 'max_records', 'next_token']   },
		'asl_DescribeAutoScalingInstances'       : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeAutoScalingInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids', 'max_records', 'next_token']   },
		'asl_DescribeAutoScalingNotificationTypes' : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeAutoScalingNotificationTypes',	params:['username', 'session_id', 'key_id', 'region_name']   },
		'asl_DescribeLaunchConfigurations'       : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeLaunchConfigurations',	params:['username', 'session_id', 'key_id', 'region_name', 'config_names', 'max_records', 'next_token']   },
		'asl_DeleteLaunchConfiguration'          : { type:'aws', url:'/aws/autoscaling/',	method:'DeleteLaunchConfiguration',	params:['username', 'session_id', 'key_id', 'region_name', 'config_name']   },
		'asl_DescribeMetricCollectionTypes'      : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeMetricCollectionTypes',	params:['username', 'session_id', 'key_id', 'region_name']   },
		'asl_DescribeNotificationConfigurations' : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeNotificationConfigurations',	params:['username', 'session_id', 'key_id', 'region_name', 'group_names', 'max_records', 'next_token']   },
		'asl_DescribePolicies'                   : { type:'aws', url:'/aws/autoscaling/',	method:'DescribePolicies',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'policy_names', 'max_records', 'next_token']   },
		'asl_DescribeScalingActivities'          : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeScalingActivities',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'activity_ids', 'max_records', 'next_token']   },
		'asl_DescribeScalingProcessTypes'        : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeScalingProcessTypes',	params:['username', 'session_id', 'key_id', 'region_name']   },
		'asl_DescribeScheduledActions'           : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeScheduledActions',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'action_names', 'start_time', 'end_time', 'max_records', 'next_token']   },
		'asl_DescribeTags'                       : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeTags',	params:['username', 'session_id', 'key_id', 'region_name', 'filters', 'max_records', 'next_token']   },
		'asl_CreateAutoScalingGroup'             : { type:'aws', url:'/aws/autoscaling/',	method:'CreateAutoScalingGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'min_size', 'max_size', 'availability_zones', 'default_cooldown', 'desired_capacity', 'health_check_period', 'health_check_type', 'instance_id', 'launch_config', 'load_balancers', 'placement_group', 'tags', 'termination_policies', 'vpc_zone_identifier']   },
		'asl_CreateLaunchConfiguration'          : { type:'aws', url:'/aws/autoscaling/',	method:'CreateLaunchConfiguration',	params:['username', 'session_id', 'key_id', 'region_name', 'config_name', 'associate_public_ip', 'block_device_mappings', 'ebs_optimized', 'iam_instance_profile', 'image_id', 'instance_id', 'instance_monitoring', 'instance_type', 'kernel_id', 'key_name', 'placement_tenancy', 'ramdisk_id', 'security_groups', 'spot_price', 'user_data']   },
		'asl_DescribeAccountLimits'              : { type:'aws', url:'/aws/autoscaling/',	method:'DescribeAccountLimits',	params:['username', 'session_id', 'key_id', 'region_name']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/aws',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'aws_quickstart'     : { type:'aws', url:'/aws/',	method:'quickstart',	params:['username', 'session_id', 'region_name']   },
		'aws_public'         : { type:'aws', url:'/aws/',	method:'public',	params:['username', 'session_id', 'region_name', 'filters']   },
		'aws_property'       : { type:'aws', url:'/aws/',	method:'property',	params:['username', 'session_id']   },
		'aws_aws'            : { type:'aws', url:'/aws/',	method:'aws',	params:['username', 'session_id', 'region_names', 'fields', 'filters']   },
		'aws_resource'       : { type:'aws', url:'/aws/',	method:'resource',	params:['username', 'session_id', 'key_id', 'region_name', 'resources', 'addition', 'retry_times']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/cloudwatch',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'clw_GetMetricStatistics'                : { type:'aws', url:'/aws/cloudwatch/',	method:'GetMetricStatistics',	params:['username', 'session_id', 'key_id', 'region_name', 'metric_name', 'namespace', 'start_time', 'end_time', 'period', 'statistics', 'unit', 'dimensions']   },
		'clw_ListMetrics'                        : { type:'aws', url:'/aws/cloudwatch/',	method:'ListMetrics',	params:['username', 'session_id', 'key_id', 'region_name', 'metric_name', 'namespace', 'dimensions', 'next_token']   },
		'clw_DescribeAlarmHistory'               : { type:'aws', url:'/aws/cloudwatch/',	method:'DescribeAlarmHistory',	params:['username', 'session_id', 'key_id', 'region_name', 'alarm_name', 'start_date', 'end_date', 'history_item_type', 'max_records', 'next_token']   },
		'clw_DescribeAlarms'                     : { type:'aws', url:'/aws/cloudwatch/',	method:'DescribeAlarms',	params:['username', 'session_id', 'key_id', 'region_name', 'alarm_names', 'alarm_name_prefix', 'action_prefix', 'state_value', 'max_records', 'next_token']   },
		'clw_DescribeAlarmsForMetric'            : { type:'aws', url:'/aws/cloudwatch/',	method:'DescribeAlarmsForMetric',	params:['username', 'session_id', 'key_id', 'region_name', 'metric_name', 'namespace', 'dimension_names', 'period', 'statistic', 'unit']   },
		'clw_DeleteAlarms'                       : { type:'aws', url:'/aws/cloudwatch/',	method:'DeleteAlarms',	params:['username', 'session_id', 'key_id', 'region_name', 'alarm_names']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/ec2',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'ec2_CreateTags'                         : { type:'aws', url:'/aws/ec2/',	method:'CreateTags',	params:['username', 'session_id', 'key_id', 'region_name', 'resource_ids', 'tags']   },
		'ec2_DeleteTags'                         : { type:'aws', url:'/aws/ec2/',	method:'DeleteTags',	params:['username', 'session_id', 'key_id', 'region_name', 'resource_ids', 'tags']   },
		'ec2_DescribeTags'                       : { type:'aws', url:'/aws/ec2/',	method:'DescribeTags',	params:['username', 'session_id', 'key_id', 'region_name', 'filters']   },
		'ec2_DescribeRegions'                    : { type:'aws', url:'/aws/ec2/',	method:'DescribeRegions',	params:['username', 'session_id', 'key_id', 'region_names', 'filters']   },
		'ec2_DescribeAvailabilityZones'          : { type:'aws', url:'/aws/ec2/',	method:'DescribeAvailabilityZones',	params:['username', 'session_id', 'key_id', 'region_name', 'zone_names', 'filters']   },
		'ami_CreateImage'                        : { type:'aws', url:'/aws/ec2/ami/',	method:'CreateImage',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'ami_name', 'ami_desc', 'no_reboot', 'bd_mappings']   },
		'ami_RegisterImage'                      : { type:'aws', url:'/aws/ec2/ami/',	method:'RegisterImage',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_name', 'ami_desc', 'location', 'architecture', 'kernel_id', 'ramdisk_id', 'root_device_name', 'block_device_map']   },
		'ami_DeregisterImage'                    : { type:'aws', url:'/aws/ec2/ami/',	method:'DeregisterImage',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_id']   },
		'ami_ModifyImageAttribute'               : { type:'aws', url:'/aws/ec2/ami/',	method:'ModifyImageAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_id', 'user_ids', 'group_names', 'product_codes', 'description']   },
		'ami_ResetImageAttribute'                : { type:'aws', url:'/aws/ec2/ami/',	method:'ResetImageAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_id', 'attribute_name']   },
		'ami_DescribeImageAttribute'             : { type:'aws', url:'/aws/ec2/ami/',	method:'DescribeImageAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_id', 'attribute_name']   },
		'ami_DescribeImages'                     : { type:'aws', url:'/aws/ec2/ami/',	method:'DescribeImages',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_ids', 'owners', 'executable_by', 'filters']   },
		'ebs_CreateVolume'                       : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'CreateVolume',	params:['username', 'session_id', 'key_id', 'region_name', 'zone_name', 'snapshot_id', 'volume_size', 'volume_type', 'iops']   },
		'ebs_DeleteVolume'                       : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'DeleteVolume',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id']   },
		'ebs_AttachVolume'                       : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'AttachVolume',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id', 'instance_id', 'device']   },
		'ebs_DetachVolume'                       : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'DetachVolume',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id', 'instance_id', 'device', 'force']   },
		'ebs_DescribeVolumes'                    : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'DescribeVolumes',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_ids', 'filters']   },
		'ebs_DescribeVolumeAttribute'            : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'DescribeVolumeAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id', 'attribute_name']   },
		'ebs_DescribeVolumeStatus'               : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'DescribeVolumeStatus',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_ids', 'filters', 'max_result', 'next_token']   },
		'ebs_ModifyVolumeAttribute'              : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'ModifyVolumeAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id', 'auto_enable_IO']   },
		'ebs_EnableVolumeIO'                     : { type:'aws', url:'/aws/ec2/ebs/volume/',	method:'EnableVolumeIO',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id']   },
		'ebs_CreateSnapshot'                     : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'CreateSnapshot',	params:['username', 'session_id', 'key_id', 'region_name', 'volume_id', 'description']   },
		'ebs_DeleteSnapshot'                     : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'DeleteSnapshot',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_id']   },
		'ebs_ModifySnapshotAttribute'            : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'ModifySnapshotAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_id', 'user_ids', 'group_names']   },
		'ebs_ResetSnapshotAttribute'             : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'ResetSnapshotAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_id', 'attribute_name']   },
		'ebs_DescribeSnapshots'                  : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'DescribeSnapshots',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_ids', 'owners', 'restorable_by', 'filters']   },
		'ebs_DescribeSnapshotAttribute'          : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'DescribeSnapshotAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_id', 'attribute_name']   },
		'ebs_CopySnapshot'                       : { type:'aws', url:'/aws/ec2/ebs/snapshot/',	method:'CopySnapshot',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_id', 'description', 'dst_region_name', 'pre_signed_url']   },
		'eip_AllocateAddress'                    : { type:'aws', url:'/aws/ec2/elasticip/',	method:'AllocateAddress',	params:['username', 'session_id', 'key_id', 'region_name', 'domain']   },
		'eip_ReleaseAddress'                     : { type:'aws', url:'/aws/ec2/elasticip/',	method:'ReleaseAddress',	params:['username', 'session_id', 'key_id', 'region_name', 'ip', 'allocation_id']   },
		'eip_AssociateAddress'                   : { type:'aws', url:'/aws/ec2/elasticip/',	method:'AssociateAddress',	params:['username', 'session_id', 'key_id', 'region_name', 'ip', 'instance_id', 'allocation_id', 'nif_id', 'private_ip', 'allow_reassociation']   },
		'eip_DisassociateAddress'                : { type:'aws', url:'/aws/ec2/elasticip/',	method:'DisassociateAddress',	params:['username', 'session_id', 'key_id', 'region_name', 'ip', 'association_id']   },
		'eip_DescribeAddresses'                  : { type:'aws', url:'/aws/ec2/elasticip/',	method:'DescribeAddresses',	params:['username', 'session_id', 'key_id', 'region_name', 'ips', 'allocation_ids', 'filters']   },
		'ins_RunInstances'                       : { type:'aws', url:'/aws/ec2/instance/',	method:'RunInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'ami_id', 'min_count', 'max_count', 'key_name', 'security_group_ids', 'security_group_names', 'user_data', 'instance_type', 'placement', 'kernel_id', 'ramdisk_id', 'block_device_map', 'monitoring_enabled', 'subnet_id', 'disable_api_termination', 'instance_initiated_shutdown_behavior', 'private_ip_address', 'client_token', 'network_interfaces', 'iam_instance_profiles', 'ebs_optimized']   },
		'ins_StartInstances'                     : { type:'aws', url:'/aws/ec2/instance/',	method:'StartInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids']   },
		'ins_StopInstances'                      : { type:'aws', url:'/aws/ec2/instance/',	method:'StopInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids', 'force']   },
		'ins_RebootInstances'                    : { type:'aws', url:'/aws/ec2/instance/',	method:'RebootInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids']   },
		'ins_TerminateInstances'                 : { type:'aws', url:'/aws/ec2/instance/',	method:'TerminateInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids']   },
		'ins_MonitorInstances'                   : { type:'aws', url:'/aws/ec2/instance/',	method:'MonitorInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids']   },
		'ins_UnmonitorInstances'                 : { type:'aws', url:'/aws/ec2/instance/',	method:'UnmonitorInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids']   },
		'ins_BundleInstance'                     : { type:'aws', url:'/aws/ec2/instance/',	method:'BundleInstance',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 's3_bucket', 's3_prefix', 's3_access_key', 's3_upload_policy', 's3_upload_policy_signature']   },
		'ins_CancelBundleTask'                   : { type:'aws', url:'/aws/ec2/instance/',	method:'CancelBundleTask',	params:['username', 'session_id', 'key_id', 'region_name', 'bundle_id']   },
		'ins_ModifyInstanceAttribute'            : { type:'aws', url:'/aws/ec2/instance/',	method:'ModifyInstanceAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'instance_type', 'kernel_id', 'ramdisk_id', 'user_data', 'disable_api_termination', 'instance_initiated_shutdown_bahavior', 'block_mapping_device', 'source_dest_check', 'group_ids', 'ebs_optimized']   },
		'ins_ResetInstanceAttribute'             : { type:'aws', url:'/aws/ec2/instance/',	method:'ResetInstanceAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'attribute_name']   },
		'ins_ConfirmProductInstance'             : { type:'aws', url:'/aws/ec2/instance/',	method:'ConfirmProductInstance',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'product_code']   },
		'ins_DescribeInstances'                  : { type:'aws', url:'/aws/ec2/instance/',	method:'DescribeInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids', 'filters']   },
		'ins_DescribeInstanceStatus'             : { type:'aws', url:'/aws/ec2/instance/',	method:'DescribeInstanceStatus',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids', 'include_all_instances', 'max_results', 'next_token']   },
		'ins_DescribeBundleTasks'                : { type:'aws', url:'/aws/ec2/instance/',	method:'DescribeBundleTasks',	params:['username', 'session_id', 'key_id', 'region_name', 'bundle_ids', 'filters']   },
		'ins_DescribeInstanceAttribute'          : { type:'aws', url:'/aws/ec2/instance/',	method:'DescribeInstanceAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'attribute_name']   },
		'ins_GetConsoleOutput'                   : { type:'aws', url:'/aws/ec2/instance/',	method:'GetConsoleOutput',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id']   },
		'ins_GetPasswordData'                    : { type:'aws', url:'/aws/ec2/instance/',	method:'GetPasswordData',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'key_data']   },
		'kp_CreateKeyPair'                       : { type:'aws', url:'/aws/ec2/keypair/',	method:'CreateKeyPair',	params:['username', 'session_id', 'key_id', 'region_name', 'key_name']   },
		'kp_DeleteKeyPair'                       : { type:'aws', url:'/aws/ec2/keypair/',	method:'DeleteKeyPair',	params:['username', 'session_id', 'key_id', 'region_name', 'key_name']   },
		'kp_ImportKeyPair'                       : { type:'aws', url:'/aws/ec2/keypair/',	method:'ImportKeyPair',	params:['username', 'session_id', 'key_id', 'region_name', 'key_name', 'key_data']   },
		'kp_DescribeKeyPairs'                    : { type:'aws', url:'/aws/ec2/keypair/',	method:'DescribeKeyPairs',	params:['username', 'session_id', 'key_id', 'region_name', 'key_names', 'filters']   },
		'kp_upload'                              : { type:'aws', url:'/aws/ec2/keypair/',	method:'upload',	params:['username', 'session_id', 'key_id', 'region_name', 'key_name', 'key_data']   },
		'kp_download'                            : { type:'aws', url:'/aws/ec2/keypair/',	method:'download',	params:['username', 'session_id', 'key_id', 'region_name', 'key_name']   },
		'kp_remove'                              : { type:'aws', url:'/aws/ec2/keypair/',	method:'remove',	params:['username', 'session_id', 'key_id', 'region_name', 'key_name']   },
		'kp_list'                                : { type:'aws', url:'/aws/ec2/keypair/',	method:'list',	params:['username', 'session_id', 'key_id', 'region_name']   },
		'pg_CreatePlacementGroup'                : { type:'aws', url:'/aws/ec2/placementgroup/',	method:'CreatePlacementGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'strategy']   },
		'pg_DeletePlacementGroup'                : { type:'aws', url:'/aws/ec2/placementgroup/',	method:'DeletePlacementGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name']   },
		'pg_DescribePlacementGroups'             : { type:'aws', url:'/aws/ec2/placementgroup/',	method:'DescribePlacementGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'group_names', 'filters']   },
		'sg_CreateSecurityGroup'                 : { type:'aws', url:'/aws/ec2/securitygroup/',	method:'CreateSecurityGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'group_desc', 'vpc_id']   },
		'sg_DeleteSecurityGroup'                 : { type:'aws', url:'/aws/ec2/securitygroup/',	method:'DeleteSecurityGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'group_id']   },
		'sg_AuthorizeSecurityGroupIngress'       : { type:'aws', url:'/aws/ec2/securitygroup/',	method:'AuthorizeSecurityGroupIngress',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'group_id', 'ip_permissions']   },
		'sg_RevokeSecurityGroupIngress'          : { type:'aws', url:'/aws/ec2/securitygroup/',	method:'RevokeSecurityGroupIngress',	params:['username', 'session_id', 'key_id', 'region_name', 'group_name', 'group_id', 'ip_permissions']   },
		'sg_DescribeSecurityGroups'              : { type:'aws', url:'/aws/ec2/securitygroup/',	method:'DescribeSecurityGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'group_names', 'group_ids', 'filters']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/elb',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'elb_DescribeInstanceHealth'             : { type:'aws', url:'/aws/elb/',	method:'DescribeInstanceHealth',	params:['username', 'session_id', 'key_id', 'region_name', 'elb_name', 'instance_ids']   },
		'elb_DescribeLoadBalancerPolicies'       : { type:'aws', url:'/aws/elb/',	method:'DescribeLoadBalancerPolicies',	params:['username', 'session_id', 'key_id', 'region_name', 'elb_name', 'policy_names']   },
		'elb_DescribeLoadBalancerPolicyTypes'    : { type:'aws', url:'/aws/elb/',	method:'DescribeLoadBalancerPolicyTypes',	params:['username', 'session_id', 'key_id', 'region_name', 'policy_type_names']   },
		'elb_DescribeLoadBalancers'              : { type:'aws', url:'/aws/elb/',	method:'DescribeLoadBalancers',	params:['username', 'session_id', 'key_id', 'region_name', 'elb_names', 'marker']   },
		'elb_DescribeLoadBalancerAttributes'     : { type:'aws', url:'/aws/elb/',	method:'DescribeLoadBalancerAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'elb_name']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/iam',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'iam_GetServerCertificate'               : { type:'aws', url:'/aws/iam/',	method:'GetServerCertificate',	params:['username', 'session_id', 'key_id', 'region_name', 'servercer_name']   },
		'iam_ListServerCertificates'             : { type:'aws', url:'/aws/iam/',	method:'ListServerCertificates',	params:['username', 'session_id', 'key_id', 'region_name', 'marker', 'max_items', 'path_prefix']   },
		'iam_DeleteServerCertificate'            : { type:'aws', url:'/aws/iam/',	method:'DeleteServerCertificate',	params:['username', 'session_id', 'key_id', 'region_name', 'servercer_name']   },
		'iam_UpdateServerCertificate'            : { type:'aws', url:'/aws/iam/',	method:'UpdateServerCertificate',	params:['username', 'session_id', 'key_id', 'region_name', 'servercer_name', 'new_servercer_name', 'new_path']   },
		'iam_UploadServerCertificate'            : { type:'aws', url:'/aws/iam/',	method:'UploadServerCertificate',	params:['username', 'session_id', 'key_id', 'region_name', 'servercer_name', 'cert_body', 'private_key', 'cert_chain', 'path']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/opsworks',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'ow_DescribeApps'                        : { type:'aws', url:'/aws/opsworks/',	method:'DescribeApps',	params:['username', 'session_id', 'key_id', 'region_name', 'app_ids', 'stack_id']   },
		'ow_DescribeStacks'                      : { type:'aws', url:'/aws/opsworks/',	method:'DescribeStacks',	params:['username', 'session_id', 'key_id', 'region_name', 'stack_ids']   },
		'ow_DescribeCommands'                    : { type:'aws', url:'/aws/opsworks/',	method:'DescribeCommands',	params:['username', 'session_id', 'region_name', 'command_ids', 'deployment_id', 'instance_id']   },
		'ow_DescribeDeployments'                 : { type:'aws', url:'/aws/opsworks/',	method:'DescribeDeployments',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id', 'deployment_ids', 'stack_id']   },
		'ow_DescribeElasticIps'                  : { type:'aws', url:'/aws/opsworks/',	method:'DescribeElasticIps',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'ips']   },
		'ow_DescribeInstances'                   : { type:'aws', url:'/aws/opsworks/',	method:'DescribeInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'app_id', 'instance_ids', 'layer_id', 'stack_id']   },
		'ow_DescribeLayers'                      : { type:'aws', url:'/aws/opsworks/',	method:'DescribeLayers',	params:['username', 'session_id', 'key_id', 'region_name', 'stack_id', 'layer_ids']   },
		'ow_DescribeLoadBasedAutoScaling'        : { type:'aws', url:'/aws/opsworks/',	method:'DescribeLoadBasedAutoScaling',	params:['username', 'session_id', 'key_id', 'region_name', 'layer_ids']   },
		'ow_DescribePermissions'                 : { type:'aws', url:'/aws/opsworks/',	method:'DescribePermissions',	params:['username', 'session_id', 'key_id', 'region_name', 'iam_user_arn', 'stack_id']   },
		'ow_DescribeRaidArrays'                  : { type:'aws', url:'/aws/opsworks/',	method:'DescribeRaidArrays',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'raid_array_ids']   },
		'ow_DescribeServiceErrors'               : { type:'aws', url:'/aws/opsworks/',	method:'DescribeServiceErrors',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'service_error_ids', 'stack_id']   },
		'ow_DescribeTimeBasedAutoScaling'        : { type:'aws', url:'/aws/opsworks/',	method:'DescribeTimeBasedAutoScaling',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_ids']   },
		'ow_DescribeUserProfiles'                : { type:'aws', url:'/aws/opsworks/',	method:'DescribeUserProfiles',	params:['username', 'session_id', 'key_id', 'region_name', 'iam_user_arns']   },
		'ow_DescribeVolumes'                     : { type:'aws', url:'/aws/opsworks/',	method:'DescribeVolumes',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'raid_array_id', 'volume_ids']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/rds',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'rds_DescribeDBEngineVersions'           : { type:'aws', url:'/aws/rds/',	method:'DescribeDBEngineVersions',	params:['username', 'session_id', 'key_id', 'region_name', 'engine', 'engine_version', 'param_group_family', 'default_only', 'list_character_sets', 'filters', 'marker', 'max_records']   },
		'rds_DescribeEngineDefaultParameters'    : { type:'aws', url:'/aws/rds/',	method:'DescribeEngineDefaultParameters',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group_family', 'filters', 'marker', 'max_records']   },
		'rds_DescribeEventCategories'            : { type:'aws', url:'/aws/rds/',	method:'DescribeEventCategories',	params:['username', 'session_id', 'key_id', 'region_name', 'source_type', 'filters']   },
		'rds_DescribeEventSubscriptions'         : { type:'aws', url:'/aws/rds/',	method:'DescribeEventSubscriptions',	params:['username', 'session_id', 'key_id', 'region_name', 'sub_scription', 'filters', 'marker', 'max_records']   },
		'rds_DescribeEvents'                     : { type:'aws', url:'/aws/rds/',	method:'DescribeEvents',	params:['username', 'session_id', 'key_id', 'region_name', 'source_id', 'source_type', 'event_categories', 'duration', 'start_time', 'end_time', 'filters', 'marker', 'max_records']   },
		'rds_ins_DescribeDBInstances'            : { type:'aws', url:'/aws/rds/instance/',	method:'DescribeDBInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'id', 'filters', 'marker', 'max_records']   },
		'rds_ins_DescribeDBLogFiles'             : { type:'aws', url:'/aws/rds/instance/',	method:'DescribeDBLogFiles',	params:['username', 'session_id', 'key_id', 'region_name', 'id', 'filename_contains', 'file_size', 'file_last_written', 'filters', 'marker', 'max_records']   },
		'rds_ins_DescribeOrderableDBInstanceOptions' : { type:'aws', url:'/aws/rds/instance/',	method:'DescribeOrderableDBInstanceOptions',	params:['username', 'session_id', 'key_id', 'region_name', 'engine', 'engine_version', 'instance_class', 'license_model', 'vpc', 'filters', 'marker', 'max_records']   },
		'rds_og_DescribeOptionGroupOptions'      : { type:'aws', url:'/aws/rds/optiongroup/',	method:'DescribeOptionGroupOptions',	params:['username', 'session_id', 'key_id', 'region_name', 'engine_name', 'major_engine_version', 'filters', 'marker', 'max_records']   },
		'rds_og_DescribeOptionGroups'            : { type:'aws', url:'/aws/rds/optiongroup/',	method:'DescribeOptionGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'option_group', 'engine_name', 'major_engine_version', 'filters', 'marker', 'max_records']   },
		'rds_pg_DescribeDBParameterGroups'       : { type:'aws', url:'/aws/rds/parametergroup/',	method:'DescribeDBParameterGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group', 'filters', 'marker', 'max_records']   },
		'rds_pg_DescribeDBParameters'            : { type:'aws', url:'/aws/rds/parametergroup/',	method:'DescribeDBParameters',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group', 'source', 'filters', 'marker', 'max_records']   },
		'rds_pg_CreateDBParameterGroup'          : { type:'aws', url:'/aws/rds/parametergroup/',	method:'CreateDBParameterGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group', 'param_group_family', 'description', 'tags']   },
		'rds_pg_DeleteDBParameterGroup'          : { type:'aws', url:'/aws/rds/parametergroup/',	method:'DeleteDBParameterGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group']   },
		'rds_pg_ModifyDBParameterGroup'          : { type:'aws', url:'/aws/rds/parametergroup/',	method:'ModifyDBParameterGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group', 'parameters']   },
		'rds_pg_ResetDBParameterGroup'           : { type:'aws', url:'/aws/rds/parametergroup/',	method:'ResetDBParameterGroup',	params:['username', 'session_id', 'key_id', 'region_name', 'param_group', 'parameters', 'reset_all']   },
		'rds_revd_ins_DescribeReservedDBInstances' : { type:'aws', url:'/aws/rds/reservedinstance/',	method:'DescribeReservedDBInstances',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'instance_class', 'offering_id', 'offering_type', 'duration', 'multi_az', 'description', 'filters', 'marker', 'max_records']   },
		'rds_revd_ins_DescribeReservedDBInstancesOfferings' : { type:'aws', url:'/aws/rds/reservedinstance/',	method:'DescribeReservedDBInstancesOfferings',	params:['username', 'session_id', 'key_id', 'region_name', 'offering_id', 'offering_type', 'instance_class', 'duration', 'multi_az', 'description', 'filters', 'marker', 'max_records']   },
		'rds_sg_DescribeDBSecurityGroups'        : { type:'aws', url:'/aws/rds/securitygroup/',	method:'DescribeDBSecurityGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'security_group', 'filters', 'marker', 'max_records']   },
		'rds_snap_CopyDBSnapshot'                : { type:'aws', url:'/aws/rds/snapshot/',	method:'CopyDBSnapshot',	params:['username', 'session_id', 'key_id', 'region_name', 'source_id', 'target_id', 'tags']   },
		'rds_snap_CreateDBSnapshot'              : { type:'aws', url:'/aws/rds/snapshot/',	method:'CreateDBSnapshot',	params:['username', 'session_id', 'key_id', 'region_name', 'source_id', 'snapshot_id', 'tags']   },
		'rds_snap_DeleteDBSnapshot'              : { type:'aws', url:'/aws/rds/snapshot/',	method:'DeleteDBSnapshot',	params:['username', 'session_id', 'key_id', 'region_name', 'snapshot_id']   },
		'rds_snap_DescribeDBSnapshots'           : { type:'aws', url:'/aws/rds/snapshot/',	method:'DescribeDBSnapshots',	params:['username', 'session_id', 'key_id', 'region_name', 'instance_id', 'snapshot_id', 'snapshot_type', 'filters', 'marker', 'max_records']   },
		'rds_subgrp_DescribeDBSubnetGroups'      : { type:'aws', url:'/aws/rds/subnetgroup/',	method:'DescribeDBSubnetGroups',	params:['username', 'session_id', 'key_id', 'region_name', 'subnet_group', 'filters', 'marker', 'max_records']   },
		'rds_ListTagsForResource'                : { type:'aws', url:'/aws/rds/',	method:'ListTagsForResource',	params:['username', 'session_id', 'key_id', 'region_name', 'resource_name', 'filters']   },
		'rds_DescribeDBLogFiles'                 : { type:'aws', url:'/aws/rds/',	method:'DescribeDBLogFiles',	params:['username', 'session_id', 'key_id', 'region_name', 'db_identifier', 'file_last_written', 'file_size', 'filename_contains', 'filters', 'marker', 'max_records']   },
		'rds_DownloadDBLogFilePortion'           : { type:'aws', url:'/aws/rds/',	method:'DownloadDBLogFilePortion',	params:['username', 'session_id', 'key_id', 'region_name', 'db_identifier', 'log_filename', 'num_of_lines', 'marker']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/sdb',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'sdb_DomainMetadata'                     : { type:'aws', url:'/aws/sdb/',	method:'DomainMetadata',	params:['username', 'session_id', 'key_id', 'region_name', 'doamin_name']   },
		'sdb_GetAttributes'                      : { type:'aws', url:'/aws/sdb/',	method:'GetAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'domain_name', 'item_name', 'attribute_name', 'consistent_read']   },
		'sdb_ListDomains'                        : { type:'aws', url:'/aws/sdb/',	method:'ListDomains',	params:['username', 'session_id', 'key_id', 'region_name', 'max_domains', 'next_token']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/sns',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'sns_GetSubscriptionAttributes'          : { type:'aws', url:'/aws/sns/',	method:'GetSubscriptionAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'subscription_arn']   },
		'sns_GetTopicAttributes'                 : { type:'aws', url:'/aws/sns/',	method:'GetTopicAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'topic_arn']   },
		'sns_ListSubscriptions'                  : { type:'aws', url:'/aws/sns/',	method:'ListSubscriptions',	params:['username', 'session_id', 'key_id', 'region_name', 'next_token']   },
		'sns_SetSubscriptionAttributes'          : { type:'aws', url:'/aws/sns/',	method:'SetSubscriptionAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'subscription_arn', 'attr_name', 'attr_value']   },
		'sns_ListSubscriptionsByTopic'           : { type:'aws', url:'/aws/sns/',	method:'ListSubscriptionsByTopic',	params:['username', 'session_id', 'key_id', 'region_name', 'topic_arn', 'next_token']   },
		'sns_Subscribe'                          : { type:'aws', url:'/aws/sns/',	method:'Subscribe',	params:['username', 'session_id', 'key_id', 'region_name', 'topic_arn', 'protocol', 'endpoint']   },
		'sns_Unsubscribe'                        : { type:'aws', url:'/aws/sns/',	method:'Unsubscribe',	params:['username', 'session_id', 'key_id', 'region_name', 'sub_arn']   },
		'sns_ListTopics'                         : { type:'aws', url:'/aws/sns/',	method:'ListTopics',	params:['username', 'session_id', 'key_id', 'region_name', 'next_token']   },
		'sns_DeleteTopic'                        : { type:'aws', url:'/aws/sns/',	method:'DeleteTopic',	params:['username', 'session_id', 'key_id', 'region_name', 'topic_arn']   },
		'sns_CreateTopic'                        : { type:'aws', url:'/aws/sns/',	method:'CreateTopic',	params:['username', 'session_id', 'key_id', 'region_name', 'topic_name']   },
		'sns_SetTopicAttributes'                 : { type:'aws', url:'/aws/sns/',	method:'SetTopicAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'topic_arn', 'attr_name', 'attr_value']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/vpc',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'vpc_DescribeVpcs'                       : { type:'aws', url:'/aws/vpc/',	method:'DescribeVpcs',	params:['username', 'session_id', 'key_id', 'region_name', 'vpc_ids', 'filters']   },
		'vpc_DescribeAccountAttributes'          : { type:'aws', url:'/aws/vpc/',	method:'DescribeAccountAttributes',	params:['username', 'session_id', 'key_id', 'region_name', 'attribute_name']   },
		'vpc_DescribeVpcAttribute'               : { type:'aws', url:'/aws/vpc/',	method:'DescribeVpcAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'vpc_id', 'attribute']   },
		'acl_DescribeNetworkAcls'                : { type:'aws', url:'/aws/vpc/acl/',	method:'DescribeNetworkAcls',	params:['username', 'session_id', 'key_id', 'region_name', 'acl_ids', 'filters']   },
		'cgw_DescribeCustomerGateways'           : { type:'aws', url:'/aws/vpc/cgw/',	method:'DescribeCustomerGateways',	params:['username', 'session_id', 'key_id', 'region_name', 'gw_ids', 'filters']   },
		'dhcp_AssociateDhcpOptions'              : { type:'aws', url:'/aws/vpc/dhcp/',	method:'AssociateDhcpOptions',	params:['username', 'session_id', 'key_id', 'region_name', 'dhcp_id', 'vpc_id']   },
		'dhcp_DescribeDhcpOptions'               : { type:'aws', url:'/aws/vpc/dhcp/',	method:'DescribeDhcpOptions',	params:['username', 'session_id', 'key_id', 'region_name', 'dhcp_ids', 'filters']   },
		'dhcp_DeleteDhcpOptions'                 : { type:'aws', url:'/aws/vpc/dhcp/',	method:'DeleteDhcpOptions',	params:['username', 'session_id', 'key_id', 'region_name', 'dhcp_id']   },
		'dhcp_CreateDhcpOptions'                 : { type:'aws', url:'/aws/vpc/dhcp/',	method:'CreateDhcpOptions',	params:['username', 'session_id', 'key_id', 'region_name', 'dhcp_configs']   },
		'eni_DescribeNetworkInterfaces'          : { type:'aws', url:'/aws/vpc/eni/',	method:'DescribeNetworkInterfaces',	params:['username', 'session_id', 'key_id', 'region_name', 'eni_ids', 'filters']   },
		'eni_DescribeNetworkInterfaceAttribute'  : { type:'aws', url:'/aws/vpc/eni/',	method:'DescribeNetworkInterfaceAttribute',	params:['username', 'session_id', 'key_id', 'region_name', 'eni_id', 'attribute']   },
		'igw_DescribeInternetGateways'           : { type:'aws', url:'/aws/vpc/igw/',	method:'DescribeInternetGateways',	params:['username', 'session_id', 'key_id', 'region_name', 'gw_ids', 'filters']   },
		'rtb_DescribeRouteTables'                : { type:'aws', url:'/aws/vpc/routetable/',	method:'DescribeRouteTables',	params:['username', 'session_id', 'key_id', 'region_name', 'rt_ids', 'filters']   },
		'subnet_DescribeSubnets'                 : { type:'aws', url:'/aws/vpc/subnet/',	method:'DescribeSubnets',	params:['username', 'session_id', 'key_id', 'region_name', 'subnet_ids', 'filters']   },
		'vgw_DescribeVpnGateways'                : { type:'aws', url:'/aws/vpc/vgw/',	method:'DescribeVpnGateways',	params:['username', 'session_id', 'key_id', 'region_name', 'gw_ids', 'filters']   },
		'vpn_DescribeVpnConnections'             : { type:'aws', url:'/aws/vpc/vpn/',	method:'DescribeVpnConnections',	params:['username', 'session_id', 'key_id', 'region_name', 'vpn_ids', 'filters']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/openstack/cinder',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'os_cinder_List'                       : { type:'openstack', url:'/os/cinder/v2_0/cinder/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_cinder_V2_Info'                    : { type:'openstack', url:'/os/cinder/v2_0/cinder/',	method:'V2_Info',	params:['username', 'session_id', 'region']   },
		'os_cinder_V2_Extension'               : { type:'openstack', url:'/os/cinder/v2_0/cinder/',	method:'V2_Extension',	params:['username', 'session_id', 'region']   },
		'os_cinder_GetAbsoluteLimits'          : { type:'openstack', url:'/os/cinder/v2_0/cinder/',	method:'GetAbsoluteLimits',	params:['username', 'session_id', 'region']   },
		'os_backup_List'                       : { type:'openstack', url:'/os/cinder/v2_0/backup/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_backup_Info'                       : { type:'openstack', url:'/os/cinder/v2_0/backup/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_backup_Delete'                     : { type:'openstack', url:'/os/cinder/v2_0/backup/',	method:'Delete',	params:['username', 'session_id', 'region', 'backup_id']   },
		'os_backup_Restore'                    : { type:'openstack', url:'/os/cinder/v2_0/backup/',	method:'Restore',	params:['username', 'session_id', 'region', 'backup_id', 'backup']   },
		'os_qos_Create'                        : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'Create',	params:['username', 'session_id', 'region', 'qos_specs']   },
		'os_qos_List'                          : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_qos_Info'                          : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_qos_Delete'                        : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'Delete',	params:['username', 'session_id', 'region', 'qos_id']   },
		'os_qos_GetAssociations'               : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'GetAssociations',	params:['username', 'session_id', 'region', 'qos_id']   },
		'os_qos_Associate'                     : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'Associate',	params:['username', 'session_id', 'region', 'qos_id', 'volume_type_id']   },
		'os_qos_Disassociate'                  : { type:'openstack', url:'/os/cinder/v2_0/qos/',	method:'Disassociate',	params:['username', 'session_id', 'region', 'volume_type_id']   },
		'os_cinder_quota_List'                 : { type:'openstack', url:'/os/cinder/v2_0/quota/',	method:'List',	params:['username', 'session_id', 'region', 'quota_tenant_id']   },
		'os_cinder_quota_Update'               : { type:'openstack', url:'/os/cinder/v2_0/quota/',	method:'Update',	params:['username', 'session_id', 'region', 'quota_tenant_id', 'quota']   },
		'os_cinder_quota_Delete'               : { type:'openstack', url:'/os/cinder/v2_0/quota/',	method:'Delete',	params:['username', 'session_id', 'region', 'quota_tenant_id']   },
		'os_cinder_quota_GetUserQuota'         : { type:'openstack', url:'/os/cinder/v2_0/quota/',	method:'GetUserQuota',	params:['uesrname', 'session_id', 'region', 'quota_tenant_id', 'user_id', 'is_detail']   },
		'os_cinder_quota_UpdateUserQuota'      : { type:'openstack', url:'/os/cinder/v2_0/quota/',	method:'UpdateUserQuota',	params:['uesrname', 'session_id', 'region', 'quota_tenant_id', 'user_id', 'quota']   },
		'os_cinder_quota_DeleteUserQuota'      : { type:'openstack', url:'/os/cinder/v2_0/quota/',	method:'DeleteUserQuota',	params:['uesrname', 'session_id', 'region', 'quota_tenant_id', 'user_id']   },
		'os_snapshot_List'                     : { type:'openstack', url:'/os/cinder/v2_0/snapshot/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_snapshot_Info'                     : { type:'openstack', url:'/os/cinder/v2_0/snapshot/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_snapshot_Update'                   : { type:'openstack', url:'/os/cinder/v2_0/snapshot/',	method:'Update',	params:['username', 'session_id', 'region', 'snapshot_id', 'display_name', 'display_description']   },
		'os_snapshot_Create'                   : { type:'openstack', url:'/os/cinder/v2_0/snapshot/',	method:'Create',	params:['username', 'session_id', 'region', 'volume_id', 'display_name', 'display_description', 'is_force']   },
		'os_snapshot_Delete'                   : { type:'openstack', url:'/os/cinder/v2_0/snapshot/',	method:'Delete',	params:['username', 'session_id', 'region', 'snapshot_id']   },
		'os_volume_List'                       : { type:'openstack', url:'/os/cinder/v2_0/volume/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_volume_Info'                       : { type:'openstack', url:'/os/cinder/v2_0/volume/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_volume_GetVolumeType'              : { type:'openstack', url:'/os/cinder/v2_0/volume/',	method:'GetVolumeType',	params:['username', 'session_id', 'region', 'volume_type_id']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/openstack/neutron',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'os_neutron_List'                      : { type:'openstack', url:'/os/neutron/v2_0/neutron/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_neutron_V2_Info'                   : { type:'openstack', url:'/os/neutron/v2_0/neutron/',	method:'V2_Info',	params:['username', 'session_id', 'region']   },
		'os_neutron_V2_Extension'              : { type:'openstack', url:'/os/neutron/v2_0/neutron/',	method:'V2_Extension',	params:['username', 'session_id', 'region']   },
		'os_agent_List'                        : { type:'openstack', url:'/os/neutron/v2_0/agent/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_agent_Info'                        : { type:'openstack', url:'/os/neutron/v2_0/agent/',	method:'Info',	params:['username', 'session_id', 'region', 'agent_ids']   },
		'os_agentscheduler_ListNetworksOnDhcpAgent' : { type:'openstack', url:'/os/neutron/v2_0/agentscheduler/',	method:'ListNetworksOnDhcpAgent',	params:['username', 'session_id', 'region', 'agent_id']   },
		'os_agentscheduler_ListDhcpAgentsHostingNetwork' : { type:'openstack', url:'/os/neutron/v2_0/agentscheduler/',	method:'ListDhcpAgentsHostingNetwork',	params:['username', 'session_id', 'region', 'network_id']   },
		'os_agentscheduler_ListRoutersOnL3Agent' : { type:'openstack', url:'/os/neutron/v2_0/agentscheduler/',	method:'ListRoutersOnL3Agent',	params:['username', 'session_id', 'region', 'agent_id']   },
		'os_agentscheduler_ListL3AgentsHostingRouter' : { type:'openstack', url:'/os/neutron/v2_0/agentscheduler/',	method:'ListL3AgentsHostingRouter',	params:['username', 'session_id', 'region', 'router_id']   },
		'os_agentscheduler_ListPoolsOnLbaasAgent' : { type:'openstack', url:'/os/neutron/v2_0/agentscheduler/',	method:'ListPoolsOnLbaasAgent',	params:['username', 'session_id', 'region', 'agent_id']   },
		'os_agentscheduler_GetLbaasAgentHostingPool' : { type:'openstack', url:'/os/neutron/v2_0/agentscheduler/',	method:'GetLbaasAgentHostingPool',	params:['username', 'session_id', 'region', 'pool_id']   },
		'os_firewall_ListFirewall'             : { type:'openstack', url:'/os/neutron/v2_0/firewall/',	method:'ListFirewall',	params:['username', 'session_id', 'region', 'fw_id']   },
		'os_firewall_ListFirewallRule'         : { type:'openstack', url:'/os/neutron/v2_0/firewall/',	method:'ListFirewallRule',	params:['username', 'session_id', 'fw_rule_id']   },
		'os_firewall_ListFirewallPolicy'       : { type:'openstack', url:'/os/neutron/v2_0/firewall/',	method:'ListFirewallPolicy',	params:['username', 'session_id', 'region', 'fw_policy_id']   },
		'os_floatingip_List'                   : { type:'openstack', url:'/os/neutron/v2_0/floatingip/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_floatingip_Info'                   : { type:'openstack', url:'/os/neutron/v2_0/floatingip/',	method:'Info',	params:['username', 'session_id', 'region', 'fip_ids']   },
		'os_healthmonitor_List'                : { type:'openstack', url:'/os/neutron/v2_0/healthmonitor/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_healthmonitor_Info'                : { type:'openstack', url:'/os/neutron/v2_0/healthmonitor/',	method:'Info',	params:['username', 'session_id', 'region', 'health_monitor_ids']   },
		'os_loadbalancer_List'                 : { type:'openstack', url:'/os/neutron/v2_0/loadbalancer/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_loadbalancer_Info'                 : { type:'openstack', url:'/os/neutron/v2_0/loadbalancer/',	method:'Info',	params:['username', 'session_id', 'region', 'load_balancer_ids']   },
		'os_member_List'                       : { type:'openstack', url:'/os/neutron/v2_0/member/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_member_Info'                       : { type:'openstack', url:'/os/neutron/v2_0/member/',	method:'Info',	params:['username', 'session_id', 'region', 'member_ids']   },
		'os_metering_ListMeteringLabel'        : { type:'openstack', url:'/os/neutron/v2_0/metering/',	method:'ListMeteringLabel',	params:['username', 'session_id', 'region', 'metering_label_id']   },
		'os_metering_ListMeteringLabelRule'    : { type:'openstack', url:'/os/neutron/v2_0/metering/',	method:'ListMeteringLabelRule',	params:['username', 'session_id', 'region', 'rule_id']   },
		'os_network_List'                      : { type:'openstack', url:'/os/neutron/v2_0/network/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_network_Info'                      : { type:'openstack', url:'/os/neutron/v2_0/network/',	method:'Info',	params:['username', 'session_id', 'region', 'network_ids']   },
		'os_pool_List'                         : { type:'openstack', url:'/os/neutron/v2_0/pool/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_pool_Info'                         : { type:'openstack', url:'/os/neutron/v2_0/pool/',	method:'Info',	params:['username', 'session_id', 'region', 'pool_ids']   },
		'os_port_List'                         : { type:'openstack', url:'/os/neutron/v2_0/port/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_port_Info'                         : { type:'openstack', url:'/os/neutron/v2_0/port/',	method:'Info',	params:['username', 'session_id', 'region', 'port_ids']   },
		'os_neutron_quota_List'                : { type:'openstack', url:'/os/neutron/v2_0/quota/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_neutron_quota_def'                 : { type:'openstack', url:'/os/neutron/v2_0/quota/',	method:'def',	params:['self', 'username', 'session_id', 'region', 'quota_tenant_id', 'user_ids']   },
		'os_router_List'                       : { type:'openstack', url:'/os/neutron/v2_0/router/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_router_Info'                       : { type:'openstack', url:'/os/neutron/v2_0/router/',	method:'Info',	params:['username', 'session_id', 'region', 'router_ids']   },
		'os_securitygroup_List'                : { type:'openstack', url:'/os/neutron/v2_0/securitygroup/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_securitygroup_Info'                : { type:'openstack', url:'/os/neutron/v2_0/securitygroup/',	method:'Info',	params:['username', 'session_id', 'region', 'sg_ids']   },
		'os_securitygroup_ListSecurityGroupRule' : { type:'openstack', url:'/os/neutron/v2_0/securitygroup/',	method:'ListSecurityGroupRule',	params:['username', 'session_id', 'region', 'sg_rule_id']   },
		'os_subnet_List'                       : { type:'openstack', url:'/os/neutron/v2_0/subnet/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_subnet_Info'                       : { type:'openstack', url:'/os/neutron/v2_0/subnet/',	method:'Info',	params:['username', 'session_id', 'region', 'subnet_ids']   },
		'os_vip_List'                          : { type:'openstack', url:'/os/neutron/v2_0/vip/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_vip_Info'                          : { type:'openstack', url:'/os/neutron/v2_0/vip/',	method:'Info',	params:['username', 'session_id', 'region', 'listener_ids']   },
		'os_vpn_ListVPNService'                : { type:'openstack', url:'/os/neutron/v2_0/vpn/',	method:'ListVPNService',	params:['username', 'session_id', 'region', 'service_id']   },
		'os_vpn_ListIKEPolicy'                 : { type:'openstack', url:'/os/neutron/v2_0/vpn/',	method:'ListIKEPolicy',	params:['username', 'session_id', 'region', 'ikepolicy_id']   },
		'os_vpn_ListIPsecPolicy'               : { type:'openstack', url:'/os/neutron/v2_0/vpn/',	method:'ListIPsecPolicy',	params:['username', 'session_id', 'region', 'ipsecpolicy_id']   },
		'os_vpn_ListIPsecSiteConnection'       : { type:'openstack', url:'/os/neutron/v2_0/vpn/',	method:'ListIPsecSiteConnection',	params:['username', 'session_id', 'region', 'connection_id']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/openstack/nova',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'os_nova_List'                         : { type:'openstack', url:'/os/nova/v2_0/nova/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_nova_V2_Info'                      : { type:'openstack', url:'/os/nova/v2_0/nova/',	method:'V2_Info',	params:['username', 'session_id', 'region']   },
		'os_nova_V2_Extension'                 : { type:'openstack', url:'/os/nova/v2_0/nova/',	method:'V2_Extension',	params:['username', 'session_id', 'region', 'alias']   },
		'os_nova_V2_Limits'                    : { type:'openstack', url:'/os/nova/v2_0/nova/',	method:'V2_Limits',	params:['username', 'session_id', 'region', 'spec_tenant_id']   },
		'os_aggregate_List'                    : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_aggregate_Info'                    : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_aggregate_Create'                  : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'Create',	params:['username', 'session_id', 'region', 'aggregate']   },
		'os_aggregate_Delete'                  : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'Delete',	params:['username', 'session_id', 'region', 'aggregate_id']   },
		'os_aggregate_Update'                  : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'Update',	params:['username', 'session_id', 'region', 'aggregate_id', 'specs']   },
		'os_aggregate_SetAggregateMetadata'    : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'SetAggregateMetadata',	params:['username', 'session_id', 'region', 'aggregate_id', 'metadata']   },
		'os_aggregate_AddHost'                 : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'AddHost',	params:['username', 'session_id', 'region', 'aggregate_id', 'host_id']   },
		'os_aggregate_RemoveHost'              : { type:'openstack', url:'/os/nova/v2_0/aggregate/',	method:'RemoveHost',	params:['username', 'session_id', 'region', 'aggregate_id', 'host_id']   },
		'os_cloudpipe_List'                    : { type:'openstack', url:'/os/nova/v2_0/cloudpipe/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_cloudpipe_Create'                  : { type:'openstack', url:'/os/nova/v2_0/cloudpipe/',	method:'Create',	params:['username', 'session_id', 'region', 'project_id']   },
		'os_cloudpipe_Update'                  : { type:'openstack', url:'/os/nova/v2_0/cloudpipe/',	method:'Update',	params:['username', 'session_id', 'region', 'specs']   },
		'os_flavor_List'                       : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'List',	params:['username', 'session_id', 'region', 'min_disk', 'min_ram', 'marker', 'limit']   },
		'os_flavor_Info'                       : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_flavor_Create'                     : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'Create',	params:['username', 'session_id', 'region', 'flavor']   },
		'os_flavor_ListFlavorTenants'          : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'ListFlavorTenants',	params:['username', 'session_id', 'region', 'flavor_id']   },
		'os_flavor_AddTenantAccess'            : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'AddTenantAccess',	params:['username', 'session_id', 'region', 'flavor_id', 'access']   },
		'os_flavor_RemoveTenantAccess'         : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'RemoveTenantAccess',	params:['username', 'session_id', 'region', 'flavor_id', 'access']   },
		'os_flavor_ListFlavorExtraSpecs'       : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'ListFlavorExtraSpecs',	params:['username', 'session_id', 'region', 'key_id']   },
		'os_flavor_CreateFlavorExtraSpecs'     : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'CreateFlavorExtraSpecs',	params:['username', 'session_id', 'region', 'specs']   },
		'os_flavor_DeleteFlavorExtraSpecs'     : { type:'openstack', url:'/os/nova/v2_0/flavor/',	method:'DeleteFlavorExtraSpecs',	params:['username', 'session_id', 'region', 'key_id']   },
		'os_host_List'                         : { type:'openstack', url:'/os/nova/v2_0/host/',	method:'List',	params:['username', 'session_id', 'region', 'service', 'zone']   },
		'os_host_Info'                         : { type:'openstack', url:'/os/nova/v2_0/host/',	method:'Info',	params:['username', 'session_id', 'region', 'host_names']   },
		'os_hypervisor_List'                   : { type:'openstack', url:'/os/nova/v2_0/hypervisor/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_hypervisor_Info'                   : { type:'openstack', url:'/os/nova/v2_0/hypervisor/',	method:'Info',	params:['username', 'session_id', 'region', 'hypervisor_hostnames', 'list_servers']   },
		'os_hypervisor_Statistics'             : { type:'openstack', url:'/os/nova/v2_0/hypervisor/',	method:'Statistics',	params:['username', 'session_id', 'region']   },
		'os_interface_List'                    : { type:'openstack', url:'/os/nova/v2_0/interface/',	method:'List',	params:['username', 'session_id', 'region', 'server_id']   },
		'os_interface_Info'                    : { type:'openstack', url:'/os/nova/v2_0/interface/',	method:'Info',	params:['username', 'session_id', 'region', 'server_id', 'attachment_ids']   },
		'os_interface_Create'                  : { type:'openstack', url:'/os/nova/v2_0/interface/',	method:'Create',	params:['username', 'session_id', 'region', 'server_id', 'interface']   },
		'os_interface_Delete'                  : { type:'openstack', url:'/os/nova/v2_0/interface/',	method:'Delete',	params:['username', 'session_id', 'region', 'server_id', 'attachment_id']   },
		'os_interface_ListVirtualInterface'    : { type:'openstack', url:'/os/nova/v2_0/interface/',	method:'ListVirtualInterface',	params:['username', 'session_id', 'region', 'server_id']   },
		'os_ip_ListServerAddresses'            : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListServerAddresses',	params:['username', 'session_id', 'region', 'server_id', 'network_label']   },
		'os_ip_ListFixedAddresses'             : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListFixedAddresses',	params:['uesrname', 'session_id', 'region', 'addr_id']   },
		'os_ip_ReserveFixedAddress'            : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ReserveFixedAddress',	params:['username', 'session_id', 'region', 'addr_id']   },
		'os_ip_ListDomainEntries'              : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListDomainEntries',	params:['username', 'session_id', 'region']   },
		'os_ip_ListDNSEntries'                 : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListDNSEntries',	params:['username', 'session_id', 'region', 'domain', 'dns_name', 'dns_ip']   },
		'os_ip_ListFloatingAddressPools'       : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListFloatingAddressPools',	params:['uesrname', 'session_id', 'region']   },
		'os_ip_ListFloatingAddresses'          : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListFloatingAddresses',	params:['username', 'session_id', 'region', 'addr_id']   },
		'os_ip_ListFloatingAddressesBulk'      : { type:'openstack', url:'/os/nova/v2_0/ip/',	method:'ListFloatingAddressesBulk',	params:['username', 'session_id', 'region', 'host_name']   },
		'os_keypair_List'                      : { type:'openstack', url:'/os/nova/v2_0/keypair/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_keypair_Info'                      : { type:'openstack', url:'/os/nova/v2_0/keypair/',	method:'Info',	params:['username', 'session_id', 'region', 'keypair_names']   },
		'os_keypair_Create'                    : { type:'openstack', url:'/os/nova/v2_0/keypair/',	method:'Create',	params:['username', 'session_id', 'region', 'keypair_name', 'public_key']   },
		'os_keypair_Delete'                    : { type:'openstack', url:'/os/nova/v2_0/keypair/',	method:'Delete',	params:['username', 'session_id', 'region', 'keypair_name']   },
		'os_servergroup_List'                  : { type:'openstack', url:'/os/nova/v2_0/servergroup/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_servergroup_Info'                  : { type:'openstack', url:'/os/nova/v2_0/servergroup/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_server_List'                       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'List',	params:['username', 'session_id', 'region', 'changes_since', 'image', 'flavor', 'name', 'marker', 'limit', 'status', 'host']   },
		'os_server_Info'                       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
		'os_server_CreateServerMetadata'       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'CreateServerMetadata',	params:['username', 'session_id', 'region', 'server_id', 'metadata']   },
		'os_server_GetServerMetadata'          : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'GetServerMetadata',	params:['username', 'session_id', 'region', 'server_id', 'metadata_key']   },
		'os_server_UpdateServerMetadata'       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'UpdateServerMetadata',	params:['username', 'session_id', 'region', 'server_id', 'metadata']   },
		'os_server_DeleteServerMetadata'       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'DeleteServerMetadata',	params:['username', 'session_id', 'region', 'server_id', 'metadata_key']   },
		'os_server_GetConsoleOutput'           : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'GetConsoleOutput',	params:['username', 'session_id', 'region', 'server_id', 'length']   },
		'os_server_GetVNCConsole'              : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'GetVNCConsole',	params:['username', 'session_id', 'region', 'server_id']   },
		'os_server_GetServerPassword'          : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'GetServerPassword',	params:['username', 'session_id', 'region', 'server_id']   },
		'os_server_DeleteServerPassword'       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'DeleteServerPassword',	params:['username', 'session_id', 'region', 'server_id']   },
		'os_server_GetServerDiagnostics'       : { type:'openstack', url:'/os/nova/v2_0/server/',	method:'GetServerDiagnostics',	params:['username', 'session_id', 'region', 'server_id']   },
		'os_service_List'                      : { type:'openstack', url:'/os/nova/v2_0/service/',	method:'List',	params:['username', 'session_id', 'region', 'is_disabled']   },
		'os_v2_CreateRootCertificate'          : { type:'openstack', url:'/os/nova/v2_0/v2/',	method:'CreateRootCertificate',	params:['username', 'session_id', 'region']   },
		'os_v2_GetRootCertificate'             : { type:'openstack', url:'/os/nova/v2_0/v2/',	method:'GetRootCertificate',	params:['username', 'session_id', 'region']   },
		'os_v2_ListTenantUsage'                : { type:'openstack', url:'/os/nova/v2_0/v2/',	method:'ListTenantUsage',	params:['username', 'session_id', 'region', 'spec_tenant_id']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/openstack/glance',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'os_image_List'                        : { type:'openstack', url:'/os/glance/v2_2/image/',	method:'List',	params:['username', 'session_id', 'region']   },
		'os_image_Info'                        : { type:'openstack', url:'/os/glance/v2_2/image/',	method:'Info',	params:['username', 'session_id', 'region', 'ids']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/openstack/os',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'os_endpoint'      : { type:'openstack', url:'/os/',	method:'endpoint',	params:['username', 'session_id', 'cloud_type', 'provider']   },
		'os_v2_auth'       : { type:'openstack', url:'/os/',	method:'v2_auth',	params:['username', 'session_id', 'os_username', 'os_user_id', 'os_password', 'project_id', 'tenant_name']   },
		'os_os'            : { type:'openstack', url:'/os/',	method:'os',	params:['username', 'session_id', 'provider', 'regions', 'fields']   },
		'os_quota'         : { type:'openstack', url:'/os/',	method:'quota',	params:['username', 'session_id', 'provider', 'regions', 'services']   },
	}

	for ( var i in Apis ) {
		/* env:dev                                                                                       nv:dev:end */
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/ApiBundle',[ './define/forge', './define/aws/autoscaling', './define/aws/aws', './define/aws/cloudwatch', './define/aws/ec2', './define/aws/elb', './define/aws/iam', './define/aws/opsworks', './define/aws/rds', './define/aws/sdb', './define/aws/sns', './define/aws/vpc', './define/openstack/cinder', './define/openstack/neutron', './define/openstack/nova', './define/openstack/glance', './define/openstack/os' ],function(){})
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
    var Abort, AjaxErrorHandler, AjaxSuccessHandler, ApiRequest, EmptyArray, EmptyObject, OneParaArray, RequestData, logAndThrow, tryParseAws;
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

      /* env:dev                                   env:dev:end */
      throw obj;
    };
    tryParseAws = function(xml, findError) {
      var e, json;
      try {
        xml = $.parseXML(xml);
        json = $.xml2json(xml);
      } catch (_error) {
        e = _error;
        if (findError) {
          return {
            error: ApiErrors.InvalidAwsReturn,
            result: awsResult
          };
        } else {
          return null;
        }
      }
      if (!findError) {
        return json;
      }
      xml = $(xml).find("Error");
      return {
        error: xml.find("Code").text() || "",
        result: xml.find("Message").text() || ""
      };
    };
    AjaxSuccessHandler = function(res) {
      var awsresult, error, globalHandler, _ref;
      if (!res || !res.result || res.result.length !== 2) {
        logAndThrow(McError(ApiErrors.InvalidRpcReturn, "Invalid JsonRpc Return Data"));
      }
      if (res.result[0] !== 0 && !((ApiErrors.AwsErrorAws <= (_ref = res.result[0]) && _ref <= ApiErrors.AwsErrorExternal))) {
        globalHandler = ApiHandlers[res.result[0]];
        if (globalHandler) {
          return globalHandler(res);
        }
        logAndThrow(McError(res.result[0], "Service Error", res.result[1]));
      }
      awsresult = res.result[1];
      if (awsresult && _.isArray(awsresult) && (typeof awsresult[1] === "string") && awsresult[1][0] === "<") {
        if (awsresult[0] === 200) {
          res = tryParseAws(awsresult[1]);
          if (!res) {
            logAndThrow(McError(ApiErrors.InvalidAwsReturn, "Aws returns invalid xml data.", res.result));
          } else {
            return res;
          }
        } else {
          error = McError(res.result[0], "Service Error", res.result[1]);
          error.awsError = awsresult[0];
          awsresult = tryParseAws(awsresult[1], true);
          error.awsErrorCode = "" + awsresult.error;
          error.awsResult = awsresult.result;
          globalHandler = ApiHandlers.AwsHandlers[error.awsError];
          if (globalHandler) {
            return globalHandler(error);
          }
          logAndThrow(error);
        }
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
      if (ApiDef.type !== "aws" && ApiDef.type !== "forge") {
        console.error("Cannot send non-aws request(" + apiName + ") by using `ApiRequest`");
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
        jsonp: false,
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

(function() {
  define('ApiRequestRDefs',[], function() {
    return {
      "payment_purchase": {
        url: "/payment/purchase_page/",
        params: ["projectId"]
      },
      "payment_self": {
        url: "/payment/self_page/",
        params: ["projectId"]
      },
      "payment_statement": {
        url: "/payment/statement_list/",
        params: ["projectId"]
      },
      "payment_usage": {
        url: "/payment/usage/",
        params: ["projectId", "startDate", "endDate"]
      }
    };
  });

}).call(this);

(function() {
  define('ApiRequestR',["ApiRequestRDefs", "api/ApiRequestErrors", "MC"], function(ApiDefination, ApiErrors) {

    /*
     * === Restful ApiRequest ===
     *
     * Paramters :
     *   apiName       : (String) The name of the api, see ApiRequestDefs
     *   apiParameters : An object to be send with the api request.
     *         If an api has its parameters map, the `apiParameters` will be converted from OBJECT to ARRAY
     *         If an api has no param map, the apiParameters is considered as the first and only one paramter
     *         to be send with the api.
     */
    var Abort, AjaxErrorHandler, ApiRequestRestful, EmptyObject, logAndThrow;
    EmptyObject = {};
    logAndThrow = function(obj) {

      /* env:dev                                   env:dev:end */
      throw obj;
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
     Restful ApiRequest Defination
     */
    ApiRequestRestful = function(apiName, apiParameters) {
      var ApiDef, ajax, i, p, request, url, _i, _len, _ref;
      ApiDef = ApiDefination[apiName];
      apiParameters = apiParameters || EmptyObject;
      if (!ApiDef) {
        console.error("Cannot find defination of the api:", apiName);
        return;
      }
      url = ApiDef.url + App.user.get("usercode") + "/" + App.user.get("session");
      if (ApiDef.params) {
        p = [];
        _ref = ApiDef.params;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (apiParameters.hasOwnProperty(i)) {
            p.push(apiParameters[i]);
          }
        }
        if (p.length) {
          url += "/" + p.join("/");
        }
      }
      ajax = $.ajax({
        url: MC.API_HOST + url,
        dataType: "json",
        type: ApiDef.method || "GET",
        jsonp: false,
        cache: false
      });
      request = Q(ajax).fail(AjaxErrorHandler);
      request.abort = Abort;
      request.ajax = ajax;
      return request;
    };
    ApiRequestRestful.Errors = ApiErrors;
    return ApiRequestRestful;
  });

}).call(this);

(function() {
  define('api/ApiRequestOsHandlers',["./ApiRequestHandlers"], function(Handlers) {

    /*
     * === Global Error Handlers ===
     * These handlers are used to handle specific errors for any ajax call
     */
    var OsHandlers;
    Handlers.OsHandlers = OsHandlers = {};
    return Handlers;
  });

}).call(this);

(function() {
  define('ApiRequestOs',["ApiRequestDefs", "api/ApiRequestErrors", "api/ApiRequestHandlers", "api/ApiBundle", "MC", "api/ApiRequestOsHandlers"], function(ApiDefination, ApiErrors, ApiHandlers) {

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

      /* env:dev                                   env:dev:end */
      throw obj;
    };
    AjaxSuccessHandler = function(res, apiName, apiParameters) {
      var awsresult, error, globalHandler, osHandler, osResult, _ref;
      if (!res || !res.result || res.result.length !== 2) {
        logAndThrow(McError(ApiErrors.InvalidRpcReturn, "Invalid JsonRpc Return Data"));
      }
      if (res.result[0] !== 0) {
        globalHandler = ApiHandlers[res.result[0]];
        osResult = res.result[1];
        if (osResult) {
          osHandler = ApiHandlers.OsHandlers[osResult[0]];
        }
        if (globalHandler || osHandler) {
          return (osHandler || globalHandler)(res, apiName, apiParameters, ApiRequest);
        }
        logAndThrow(McError(res.result[0], "Service Error", res.result[1]));
      }
      awsresult = res.result[1];
      if (awsresult && _.isArray(awsresult)) {
        if ((200 <= (_ref = awsresult[0]) && _ref < 300)) {
          return awsresult[1];
        } else {
          error = McError(res.result[0], "Service Error", res.result[1]);
          error.awsError = awsresult[0];
          error.awsResult = awsresult[1];
          logAndThrow(error);
        }
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
      if (ApiDef.type !== "openstack") {
        console.error("Cannot send non-openstack request(" + apiName + ") by using `ApiRequestOs`");
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
        jsonp: false,
        data: JSON.stringify(RequestData)
      });
      request = Q(ajax).then((function(res) {
        return AjaxSuccessHandler(res, apiName, apiParameters);
      }), AjaxErrorHandler);
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


define("api/api", function(){});
