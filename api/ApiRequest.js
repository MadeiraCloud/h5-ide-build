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
      syncRedis: {
        url: "/session/",
        method: "sync_redis",
        params: ["username", "session_id"]
      },
      updateCred: {
        url: "/session/",
        method: "set_credential",
        params: ["username", "session_id", "access_key", "secret_key", "account_id"]
      },
      resetKey: {
        url: "/account/",
        method: "reset_key",
        params: ["username", "session_id", "flag"]
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
      },
      changePwd: {
        url: "/account/",
        method: "update_account",
        params: ["username", "session_id", "params"]
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
     * TODO :
     * The Errors is just some random number at this time. Should define it when the Backend Error Code is defined.
     */
    var Errors;
    Errors = {
      InvalidSession: 19
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
		'session_guest'           : { url:'/session/',	method:'guest',	params:['guest_id', 'guestname']   },
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
		'app_render_app'          : { url:'/app/',	method:'render_app',	params:['timestamp', 'app_id', 'res_id', 'is_arrived']   },
		'app_check_app'           : { url:'/app/',	method:'check_app',	params:['timestamp', 'app_id']   },
		'app_update_status'       : { url:'/app/',	method:'update_status',	params:['app_id', 'instance_id', 'recipe_version', 'timestamp', 'statuses', 'waiting', 'agent_status', 'token']   },
		'favorite_add'            : { url:'/favorite/',	method:'add',	params:['username', 'session_id', 'region_name', 'resource']   },
		'favorite_remove'         : { url:'/favorite/',	method:'remove',	params:['username', 'session_id', 'region_name', 'resource_ids']   },
		'favorite_info'           : { url:'/favorite/',	method:'info',	params:['username', 'session_id', 'region_name', 'provider', 'service', 'resource']   },
		'guest_invite'            : { url:'/guest/',	method:'invite',	params:['username', 'session_id', 'region_name']   },
		'guest_cancel'            : { url:'/guest/',	method:'cancel',	params:['username', 'session_id', 'region_name', 'guest_id']   },
		'guest_access'            : { url:'/guest/',	method:'access',	params:['guestname', 'session_id', 'region_name', 'guest_id']   },
		'guest_end'               : { url:'/guest/',	method:'end',	params:['guestname', 'session_id', 'region_name', 'guest_id']   },
		'guest_info'              : { url:'/guest/',	method:'info',	params:['username', 'session_id', 'region_name', 'guest_id']   },
		'opsbackend_render_app'   : { url:'/opsbackend/',	method:'render_app',	params:['timestamp', 'app_id', 'res_id', 'is_arrived']   },
		'opsbackend_check_app'    : { url:'/opsbackend/',	method:'check_app',	params:['timestamp', 'app_id']   },
		'opsbackend_update_status' : { url:'/opsbackend/',	method:'update_status',	params:['app_id', 'instance_id', 'recipe_version', 'timestamp', 'statuses', 'waiting', 'agent_status', 'token']   },
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
		'state_module'            : { url:'/state/',	method:'module',	params:['username', 'session_id', 'mod_repo', 'mod_tag']   },
		'state_status'            : { url:'/state/',	method:'status',	params:['username', 'session_id', 'app_id']   },
		'state_log'               : { url:'/state/',	method:'log',	params:['username', 'session_id', 'app_id', 'res_id']   },
		'account_register'        : { url:'/account/',	method:'register',	params:['username', 'password', 'email']   },
		'account_update_account'  : { url:'/account/',	method:'update_account',	params:['username', 'session_id', 'attributes']   },
		'account_reset_password'  : { url:'/account/',	method:'reset_password',	params:['username']   },
		'account_update_password' : { url:'/account/',	method:'update_password',	params:['key', 'new_pwd']   },
		'account_check_repeat'    : { url:'/account/',	method:'check_repeat',	params:['username', 'email']   },
		'account_check_validation' : { url:'/account/',	method:'check_validation',	params:['key', 'flag']   },
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
		'asl_DescribeMetricCollectionTypes'      : { url:'/aws/autoscaling/',	method:'DescribeMetricCollectionTypes',	params:['username', 'session_id', 'region_name']   },
		'asl_DescribeNotificationConfigurations' : { url:'/aws/autoscaling/',	method:'DescribeNotificationConfigurations',	params:['username', 'session_id', 'region_name', 'group_names', 'max_records', 'next_token']   },
		'asl_DescribePolicies'                   : { url:'/aws/autoscaling/',	method:'DescribePolicies',	params:['username', 'session_id', 'region_name', 'group_name', 'policy_names', 'max_records', 'next_token']   },
		'asl_DescribeScalingActivities'          : { url:'/aws/autoscaling/',	method:'DescribeScalingActivities',	params:['username', 'session_id', 'region_name', 'group_name', 'activity_ids', 'max_records', 'next_token']   },
		'asl_DescribeScalingProcessTypes'        : { url:'/aws/autoscaling/',	method:'DescribeScalingProcessTypes',	params:['username', 'session_id', 'region_name']   },
		'asl_DescribeScheduledActions'           : { url:'/aws/autoscaling/',	method:'DescribeScheduledActions',	params:['username', 'session_id', 'region_name', 'group_name', 'action_names', 'start_time', 'end_time', 'max_records', 'next_token']   },
		'asl_DescribeTags'                       : { url:'/aws/autoscaling/',	method:'DescribeTags',	params:['username', 'session_id', 'region_name', 'filters', 'max_records', 'next_token']   },
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
		'aws_price'          : { url:'/aws/',	method:'price',	params:['username', 'session_id']   },
		'aws_status'         : { url:'/aws/',	method:'status',	params:['username', 'session_id']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/cloudwatch',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'clw_GetMetricStatistics'                : { url:'/aws/cloudwatch/',	method:'GetMetricStatistics',	params:['username', 'session_id', 'region_name', 'metric_name', 'namespace', 'start_time', 'end_time', 'period', 'unit', 'statistics', 'dimensions']   },
		'clw_ListMetrics'                        : { url:'/aws/cloudwatch/',	method:'ListMetrics',	params:['username', 'session_id', 'region_name', 'metric_name', 'namespace', 'dimensions', 'next_token']   },
		'clw_DescribeAlarmHistory'               : { url:'/aws/cloudwatch/',	method:'DescribeAlarmHistory',	params:['username', 'session_id', 'region_name', 'alarm_name', 'start_date', 'end_date', 'history_item_type', 'max_records', 'next_token']   },
		'clw_DescribeAlarms'                     : { url:'/aws/cloudwatch/',	method:'DescribeAlarms',	params:['username', 'session_id', 'region_name', 'alarm_names', 'alarm_name_prefix', 'action_prefix', 'state_value', 'max_records', 'next_token']   },
		'clw_DescribeAlarmsForMetric'            : { url:'/aws/cloudwatch/',	method:'DescribeAlarmsForMetric',	params:['username', 'session_id', 'region_name', 'metric_name', 'namespace', 'dimension_names', 'period', 'statistic', 'unit']   },
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
		'ami_RegisterImage'                      : { url:'/aws/ec2/ami/',	method:'RegisterImage',	params:['username', 'session_id', 'region_name', 'ami_name']   },
		'ami_DeregisterImage'                    : { url:'/aws/ec2/ami/',	method:'DeregisterImage',	params:['username', 'session_id', 'region_name', 'ami_id']   },
		'ami_ModifyImageAttribute'               : { url:'/aws/ec2/ami/',	method:'ModifyImageAttribute',	params:['username', 'session_id']   },
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
		'eip_AssociateAddress'                   : { url:'/aws/ec2/elasticip/',	method:'AssociateAddress',	params:['username']   },
		'eip_DisassociateAddress'                : { url:'/aws/ec2/elasticip/',	method:'DisassociateAddress',	params:['username', 'session_id', 'region_name', 'ip', 'association_id']   },
		'eip_DescribeAddresses'                  : { url:'/aws/ec2/elasticip/',	method:'DescribeAddresses',	params:['username', 'session_id', 'region_name', 'ips', 'allocation_ids', 'filters']   },
		'ins_RunInstances'                       : { url:'/aws/ec2/instance/',	method:'RunInstances',	params:['username']   },
		'ins_StartInstances'                     : { url:'/aws/ec2/instance/',	method:'StartInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_StopInstances'                      : { url:'/aws/ec2/instance/',	method:'StopInstances',	params:['username', 'session_id', 'region_name', 'instance_ids', 'force']   },
		'ins_RebootInstances'                    : { url:'/aws/ec2/instance/',	method:'RebootInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_TerminateInstances'                 : { url:'/aws/ec2/instance/',	method:'TerminateInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_MonitorInstances'                   : { url:'/aws/ec2/instance/',	method:'MonitorInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_UnmonitorInstances'                 : { url:'/aws/ec2/instance/',	method:'UnmonitorInstances',	params:['username', 'session_id', 'region_name', 'instance_ids']   },
		'ins_BundleInstance'                     : { url:'/aws/ec2/instance/',	method:'BundleInstance',	params:['username', 'session_id', 'region_name', 'instance_id', 's3_bucket']   },
		'ins_CancelBundleTask'                   : { url:'/aws/ec2/instance/',	method:'CancelBundleTask',	params:['username', 'session_id', 'region_name', 'bundle_id']   },
		'ins_ModifyInstanceAttribute'            : { url:'/aws/ec2/instance/',	method:'ModifyInstanceAttribute',	params:['username']   },
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
		'sg_AuthorizeSecurityGroupIngress'       : { url:'/aws/ec2/securitygroup/',	method:'AuthorizeSecurityGroupIngress',	params:['username']   },
		'sg_RevokeSecurityGroupIngress'          : { url:'/aws/ec2/securitygroup/',	method:'RevokeSecurityGroupIngress',	params:['username']   },
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
		'rds_DescribeDBEngineVersions'           : { url:'/aws/rds/',	method:'DescribeDBEngineVersions',	params:['username']   },
		'rds_DescribeOrderableDBInstanceOptions' : { url:'/aws/rds/',	method:'DescribeOrderableDBInstanceOptions',	params:['username']   },
		'rds_DescribeEngineDefaultParameters'    : { url:'/aws/rds/',	method:'DescribeEngineDefaultParameters',	params:['username', 'session_id', 'region_name', 'pg_family', 'marker', 'max_records']   },
		'rds_DescribeEvents'                     : { url:'/aws/rds/',	method:'DescribeEvents',	params:['username']   },
		'rds_ins_DescribeDBInstances'            : { url:'/aws/rds/instance/',	method:'DescribeDBInstances',	params:['username', 'session_id', 'region_name', 'instance_id', 'marker', 'max_records']   },
		'rds_og_DescribeOptionGroupOptions'      : { url:'/aws/rds/optiongroup/',	method:'DescribeOptionGroupOptions',	params:['username']   },
		'rds_og_DescribeOptionGroups'            : { url:'/aws/rds/optiongroup/',	method:'DescribeOptionGroups',	params:['username']   },
		'rds_pg_DescribeDBParameterGroups'       : { url:'/aws/rds/parametergroup/',	method:'DescribeDBParameterGroups',	params:['username', 'session_id', 'region_name', 'pg_name', 'marker', 'max_records']   },
		'rds_pg_DescribeDBParameters'            : { url:'/aws/rds/parametergroup/',	method:'DescribeDBParameters',	params:['username', 'session_id', 'region_name', 'pg_name', 'source', 'marker', 'max_records']   },
		'rds_revd_ins_DescribeReservedDBInstances' : { url:'/aws/rds/reservedinstance/',	method:'DescribeReservedDBInstances',	params:['username']   },
		'rds_revd_ins_DescribeReservedDBInstancesOfferings' : { url:'/aws/rds/reservedinstance/',	method:'DescribeReservedDBInstancesOfferings',	params:['username']   },
		'rds_sg_DescribeDBSecurityGroups'        : { url:'/aws/rds/securitygroup/',	method:'DescribeDBSecurityGroups',	params:['username', 'session_id', 'region_name', 'sg_name', 'marker', 'max_records']   },
		'rds_snap_DescribeDBSnapshots'           : { url:'/aws/rds/snapshot/',	method:'DescribeDBSnapshots',	params:['username']   },
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
		'sns_ListSubscriptionsByTopic'           : { url:'/aws/sns/',	method:'ListSubscriptionsByTopic',	params:['username', 'session_id', 'region_name', 'topic_arn', 'next_token']   },
		'sns_ListTopics'                         : { url:'/aws/sns/',	method:'ListTopics',	params:['username', 'session_id', 'region_name', 'next_token']   },
	}

	for ( var i in Apis ) {
		ApiRequestDefs.Defs[ i ] = Apis[ i ];
	}

});

define('api/define/aws/vpc',['ApiRequestDefs'], function( ApiRequestDefs ){
	var Apis = {
		'vpc_DescribeVpcs'                       : { url:'/aws/',	method:'DescribeVpcs',	params:['username', 'session_id', 'region_name', 'vpc_ids', 'filters']   },
		'vpc_DescribeAccountAttributes'          : { url:'/aws/',	method:'DescribeAccountAttributes',	params:['username', 'session_id', 'region_name', 'attribute_name']   },
		'vpc_DescribeVpcAttribute'               : { url:'/aws/',	method:'DescribeVpcAttribute',	params:['username', 'session_id', 'region_name', 'vpc_id', 'attribute']   },
		'acl_DescribeNetworkAcls'                : { url:'/aws/acl/',	method:'DescribeNetworkAcls',	params:['username', 'session_id', 'region_name', 'acl_ids', 'filters']   },
		'cgw_DescribeCustomerGateways'           : { url:'/aws/cgw/',	method:'DescribeCustomerGateways',	params:['username', 'session_id', 'region_name', 'gw_ids', 'filters']   },
		'dhcp_DescribeDhcpOptions'               : { url:'/aws/dhcp/',	method:'DescribeDhcpOptions',	params:['username', 'session_id', 'region_name', 'dhcp_ids', 'filters']   },
		'eni_DescribeNetworkInterfaces'          : { url:'/aws/eni/',	method:'DescribeNetworkInterfaces',	params:['username', 'session_id', 'region_name', 'eni_ids', 'filters']   },
		'eni_DescribeNetworkInterfaceAttribute'  : { url:'/aws/eni/',	method:'DescribeNetworkInterfaceAttribute',	params:['username', 'session_id', 'region_name', 'eni_id', 'attribute']   },
		'igw_DescribeInternetGateways'           : { url:'/aws/igw/',	method:'DescribeInternetGateways',	params:['username', 'session_id', 'region_name', 'gw_ids', 'filters']   },
		'rtb_DescribeRouteTables'                : { url:'/aws/routetable/',	method:'DescribeRouteTables',	params:['username', 'session_id', 'region_name', 'rt_ids', 'filters']   },
		'subnet_DescribeSubnets'                 : { url:'/aws/subnet/',	method:'DescribeSubnets',	params:['username', 'session_id', 'region_name', 'subnet_ids', 'filters']   },
		'vgw_DescribeVpnGateways'                : { url:'/aws/vgw/',	method:'DescribeVpnGateways',	params:['username', 'session_id', 'region_name', 'gw_ids', 'filters']   },
		'vpn_DescribeVpnConnections'             : { url:'/aws/vpn/',	method:'DescribeVpnConnections',	params:['username', 'session_id', 'region_name', 'vpn_ids', 'filters']   },
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

      /* env:dev                                   env:dev:end */
      throw obj;
    };
    AjaxSuccessHandler = function(res) {
      var gloablHandler;
      if (!res || !res.result || res.result.length !== 2) {
        logAndThrow(McError(-1, "Invalid JsonRpc Return Data"));
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
      logAndThrow(McError(-2, textStatus, error));
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
          p.push(apiParameters[i] || ApiDefination.AutoFill(i));
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

