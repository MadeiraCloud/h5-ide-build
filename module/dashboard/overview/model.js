(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['MC', 'event', 'constant', 'vpc_model', 'aws_model', 'app_model', 'stack_model', 'ami_service', 'elb_service', 'dhcp_service', 'vpngateway_service', 'customergateway_service', 'i18n!nls/lang.js', 'common_handle', "component/exporter/JsonExporter"], function(MC, ide_event, constant, vpc_model, aws_model, app_model, stack_model, ami_service, elb_service, dhcp_service, vpngateway_service, customergateway_service, lang, common_handle, JsonExporter) {
    var OverviewModel, current_region, popup_key_set, region_aws_list, region_classic_vpc_result, region_counts, region_tooltip, result_list, total_app, total_aws, total_stack;
    region_counts = [];
    region_aws_list = [];
    region_classic_vpc_result = [];
    result_list = {
      'total_app': 0,
      'total_stack': 0,
      'total_aws': 0,
      'plural_app': '',
      'plural_stack': '',
      'plural_aws': '',
      'region_infos': []
    };
    total_app = 0;
    total_stack = 0;
    total_aws = 0;
    current_region = null;
    popup_key_set = {
      "unmanaged_bubble": {
        "DescribeVolumes": {
          "status": ["status"],
          "title": "volumeId",
          "sub_info": [
            {
              "key": ["createTime"],
              "show_key": "Create Time"
            }, {
              "key": ["availabilityZone"],
              "show_key": "Availability Zone"
            }, {
              "key": ["attachmentSet", "item", "status"],
              "show_key": "Attachment Status"
            }
          ]
        },
        "DescribeCustomerGateways": {
          "title": "customerGatewayId",
          "status": "state",
          "sub_info": [
            {
              "key": ["customerGatewayId"],
              "show_key": "CustomerGatewayId"
            }, {
              "key": ["type"],
              "show_key": "Type"
            }, {
              "key": ["ipAddress"],
              "show_key": "IpAddress"
            }, {
              "key": ["bgpAsn"],
              "show_key": "BgpAsn"
            }
          ]
        },
        "DescribeVpnGateways": {
          "title": "vpnGatewayId",
          "status": "state",
          "sub_info": [
            {
              "key": ["vpnGatewayId"],
              "show_key": "VPNGatewayId"
            }, {
              "key": ["type"],
              "show_key": "Type"
            }
          ]
        },
        "DescribeInstances": {
          "status": ["instanceState", "name"],
          "title": "instanceId",
          "sub_info": [
            {
              "key": ["launchTime"],
              "show_key": "Launch Time"
            }, {
              "key": ["placement", "availabilityZone"],
              "show_key": "Availability Zone"
            }
          ]
        },
        "DescribeVpnConnections": {
          "status": ["state"],
          "title": "vpnConnectionId",
          "sub_info": [
            {
              "key": ["vpnConnectionId"],
              "show_key": "VPC"
            }, {
              "key": ["type"],
              "show_key": "Type"
            }, {
              "key": ["routes", "item", "source"],
              "show_key": "Routing"
            }
          ]
        },
        "DescribeVpcs": {
          "status": ["state"],
          "title": "vpcId",
          "sub_info": [
            {
              "key": ["cidrBlock"],
              "show_key": "CIDR"
            }, {
              "key": ["isDefault"],
              "show_key": "Default VPC:"
            }, {
              "key": ["instanceTenancy"],
              "show_key": "Tenacy"
            }
          ]
        },
        "DescribeAutoScalingGroups": {
          "status": ["state"],
          "title": "AutoScalingGroupName",
          "sub_info": [
            {
              "key": ["AutoScalingGroupName"],
              "show_key": "AutoScalingGroupName"
            }, {
              "key": ["type"],
              "show_key": "Type"
            }, {
              "key": ["Status"],
              "show_key": "Status"
            }
          ]
        }
      },
      "detail": {
        "DescribeVolumes": {
          "title": "volumeId",
          "sub_info": [
            {
              "key": ["volumeId"],
              "show_key": lang.ide.PROP_VOLUME_ID
            }, {
              "key": ["attachmentSet", "item", 0, "device"],
              "show_key": lang.ide.DASH_LBL_DEVICE_NAME
            }, {
              "key": ["snapshotId"],
              "show_key": lang.ide.PROP_VOLUME_SNAPSHOT_ID
            }, {
              "key": ["size"],
              "show_key": "" + lang.ide.PROP_VOLUME_SIZE + "(GiB)"
            }, {
              "key": ["createTime"],
              "show_key": lang.ide.PROP_VOLUME_CREATE_TIME
            }, {
              "key": ["attachmentSet"],
              "show_key": lang.ide.PROP_VOLUME_ATTACHMENT_SET
            }, {
              "key": ["status"],
              "show_key": lang.ide.PROP_VOLUME_STATE
            }, {
              "key": ["attachmentSet", "item", "status"],
              "show_key": lang.ide.PROP_VOLUME_ATTACHMENT_SET
            }, {
              "key": ["availabilityZone"],
              "show_key": lang.ide.DASH_LBL_AVAILABILITY_ZONE
            }, {
              "key": ["volumeType"],
              "show_key": lang.ide.PROP_VOLUME_TYPE
            }, {
              "key": ["Iops"],
              "show_key": lang.ide.PROP_VOLUME_TYPE_IOPS
            }
          ]
        },
        "DescribeInstances": {
          "title": "instanceId",
          "sub_info": [
            {
              "key": ["instanceState", "name"],
              "show_key": lang.ide.PROP_INSTANCE_STATUS
            }, {
              "key": ["keyName"],
              "show_key": lang.ide.PROP_INSTANCE_KEY_PAIR
            }, {
              "key": ["monitoring", "state"],
              "show_key": lang.ide.PROP_INSTANCE_KEY_MONITORING
            }, {
              "key": ["ipAddress"],
              "show_key": lang.ide.PROP_INSTANCE_PRIMARY_PUBLIC_IP
            }, {
              "key": ["dnsName"],
              "show_key": lang.ide.PROP_INSTANCE_PUBLIC_DNS
            }, {
              "key": ["privateIpAddress"],
              "show_key": lang.ide.PROP_INSTANCE_PRIMARY_PRIVATE_IP
            }, {
              "key": ["privateDnsName"],
              "show_key": lang.ide.PROP_INSTANCE_PRIVATE_DNS
            }, {
              "key": ["launchTime"],
              "show_key": lang.ide.PROP_INSTANCE_LAUNCH_TIME
            }, {
              "key": ["placement", "availabilityZone"],
              "show_key": lang.ide.PROP_INSTANCE_KEY_ZONE
            }, {
              "key": ["amiLaunchIndex"],
              "show_key": lang.ide.PROP_INSTANCE_AMI_LAUNCH_INDEX
            }, {
              "key": ["instanceType"],
              "show_key": lang.ide.PROP_INSTANCE_TYPE
            }, {
              "key": ["ebsOptimized"],
              "show_key": lang.ide.PROP_INSTANCE_EBS_OPTIMIZED
            }, {
              "key": ["rootDeviceType"],
              "show_key": lang.ide.PROP_INSTANCE_ROOT_DEVICE_TYPE
            }, {
              "key": ["placement", "tenancy"],
              "show_key": lang.ide.PROP_INSTANCE_TENANCY
            }, {
              "key": ["blockDeviceMapping", "item"],
              "show_key": lang.ide.PROP_INSTANCE_BLOCK_DEVICE
            }, {
              "key": ['networkInterfaceSet', 'item'],
              "show_key": lang.ide.PROP_INSTANCE_AMI_NETWORK_INTERFACE
            }
          ]
        },
        "DescribeVpnConnections": {
          "title": "vpnConnectionId",
          "sub_info": [
            {
              "key": ["state"],
              "show_key": lang.ide.DASH_LBL_STATE
            }, {
              "key": ["vpnGatewayId"],
              "show_key": lang.ide.DASH_LBL_VIRTUAL_PRIVATE_GATEWAY
            }, {
              "key": ["customerGatewayId"],
              "show_key": lang.ide.DASH_LBL_CUSTOMER_GATEWAY
            }, {
              "key": ["type"],
              "show_key": lang.ide.PROP_CGW_APP_VPN_LBL_TYPE
            }, {
              "key": ["routes", "item", 0],
              "show_key": lang.ide.PROP_CGW_LBL_ROUTING
            }
          ],
          "btns": [
            {
              "type": "download_configuration",
              "name": lang.ide.PROP_CGW_APP_TIT_DOWNLOAD_CONF
            }
          ],
          "detail_table": [
            {
              "key": ["vgwTelemetry", "item"],
              "show_key": lang.ide.PROP_CGW_APP_VPN_LBL_TUNNEL,
              "count_name": "tunnel"
            }, {
              "key": ["outsideIpAddress"],
              "show_key": lang.ide.PROP_CGW_LBL_IPADDR
            }, {
              "key": ["status"],
              "show_key": lang.ide.DASH_LBL_STATUS
            }, {
              "key": ["lastStatusChange"],
              "show_key": lang.ide.IDE_LBL_LAST_STATUS_CHANGE
            }, {
              "key": ["statusMessage"],
              "show_key": lang.ide.DASH_LBL_DETAIL
            }
          ]
        },
        "DescribeVpcs": {
          "title": "vpcId",
          "sub_info": [
            {
              "key": ["state"],
              "show_key": lang.ide.DASH_LBL_STATE
            }, {
              "key": ["cidrBlock"],
              "show_key": lang.ide.DASH_LBL_CIDR
            }, {
              "key": ["instanceTenancy"],
              "show_key": lang.ide.PROP_VPC_DETAIL_LBL_TENANCY
            }
          ]
        },
        "DescribeLoadBalancers": {
          "title": "LoadBalancerName",
          "sub_info": [
            {
              "key": ["state"],
              "show_key": lang.ide.DASH_LBL_STATE
            }, {
              "key": ["AvailabilityZones", "member"],
              "show_key": lang.ide.DASH_LBL_AVAILABILITY_ZONE
            }, {
              "key": ["CreatedTime"],
              "show_key": lang.ide.DASH_LBL_CREATE_TIME
            }, {
              "key": ["DNSName"],
              "show_key": "DNSName"
            }, {
              "key": ["HealthCheck"],
              "show_key": lang.ide.PROP_ELB_HEALTH_CHECK
            }, {
              "key": ["Instances", 'member'],
              "show_key": lang.ide.DASH_LBL_INSTANCE
            }, {
              "key": ["ListenerDescriptions", "member", "Listener"],
              "show_key": lang.ide.PROP_ELB_LBL_LISTENER_DESCRIPTIONS
            }, {
              "key": ["SecurityGroups", "member"],
              "show_key": lang.ide.PROP_ELB_SG_DETAIL
            }, {
              "key": ["Subnets", "member"],
              "show_key": lang.ide.DASH_LBL_SUBNETS
            }
          ]
        },
        "DescribeAddresses": {
          "title": "publicIp",
          "sub_info": [
            {
              "key": ["domain"],
              "show_key": lang.ide.DASH_LBL_DOMAIN
            }, {
              "key": ["instanceId"],
              "show_key": lang.ide.DASH_LBL_INSTANCE_ID
            }, {
              "key": ["publicIp"],
              "show_key": lang.ide.PROP_INSTANCE_PUBLIC_IP
            }, {
              "key": ["associationId"],
              "show_key": lang.ide.DASH_LBL_ASSOCIATION_ID
            }, {
              "key": ["allocationId"],
              "show_key": lang.ide.DASH_LBL_ALLOCATION_ID
            }, {
              "key": ["networkInterfaceId"],
              "show_key": lang.ide.DASH_LBL_NETWORK_INTERFACE_ID
            }, {
              "key": ["privateIpAddress"],
              "show_key": lang.ide.DASH_LBL_PRIVATE_IP_ADDRESS
            }, {
              "key": ["SecurityGroups"],
              "show_key": lang.ide.PROP_INSTANCE_SG_DETAIL
            }, {
              "key": ["Subnets"],
              "show_key": lang.ide.DASH_LBL_SUBNETS
            }
          ]
        },
        "DescribeAutoScalingGroups": {
          "title": "AutoScalingGroupName",
          "sub_info": [
            {
              "key": ["AutoScalingGroupName"],
              "show_key": lang.ide.DASH_LBL_AUTOSCALING_GROUP_NAME
            }, {
              "key": ["AutoScalingGroupARN"],
              "show_key": lang.ide.DASH_LBL_AUTOSCALING_GROUP_ARN
            }, {
              "key": ["AvailabilityZones", "member"],
              "show_key": lang.ide.DASH_LBL_AVAILABILITY_ZONE
            }, {
              "key": ["CreatedTime"],
              "show_key": lang.ide.DASH_LBL_CREATE_TIME
            }, {
              "key": ["DefaultCooldown"],
              "show_key": lang.ide.PROP_ASG_COOL_DOWN
            }, {
              "key": ["DesiredCapacity"],
              "show_key": lang.ide.PROP_ASG_DESIRE_CAPACITY
            }, {
              "key": ["EnabledMetrics"],
              "show_key": lang.ide.DASH_LBL_ENABLED_METRICS
            }, {
              "key": ["HealthCheckGracePeriod"],
              "show_key": lang.ide.PROP_ASG_HEALTH_CHECK_CRACE_PERIOD
            }, {
              "key": ["HealthCheckType"],
              "show_key": lang.ide.PROP_ASG_HEALTH_CHECK_TYPE
            }, {
              "key": ["Instances"],
              "show_key": lang.ide.DASH_LBL_INSTANCE
            }, {
              "key": ["LaunchConfigurationName"],
              "show_key": lang.ide.DASH_LBL_LAUNCH_CONFIGURATION_NAME
            }, {
              "key": ["LoadBalancerNames", 'member'],
              "show_key": lang.ide.DASH_LBL_LOADBALANCER_NAMES
            }, {
              "key": ["MaxSize"],
              "show_key": lang.ide.DASH_LBL_MAX_SIZE
            }, {
              "key": ["MinSize"],
              "show_key": lang.ide.DASH_LBL_MIN_SIZE
            }, {
              "key": ["Status"],
              "show_key": lang.ide.DASH_LBL_STATUS
            }, {
              "key": ["TerminationPolicies", 'member'],
              "show_key": lang.ide.DASH_LBL_TERMINATION_POLICIES
            }, {
              "key": ["VPCZoneIdentifier"],
              "show_key": lang.ide.DASH_LBL_VPC_ZONE_IDENTIFIER
            }
          ]
        },
        "DescribeAlarms": {
          "title": "AlarmName",
          "sub_info": [
            {
              "key": ["ActionsEnabled"],
              "show_key": lang.ide.DASH_LBL_ACTIONS_ENABLED
            }, {
              "key": ["AlarmActions", "member"],
              "show_key": lang.ide.DASH_LBL_ALARM_ACTIONS
            }, {
              "key": ["AlarmArn"],
              "show_key": lang.ide.DASH_LBL_ALARM_ARN
            }, {
              "key": ["AlarmDescription"],
              "show_key": lang.ide.DASH_LBL_ALARM_DESCRIPTION
            }, {
              "key": ["AlarmName"],
              "show_key": lang.ide.DASH_LBL_ALARM_NAME
            }, {
              "key": ["ComparisonOperator"],
              "show_key": lang.ide.DASH_LBL_COMPARISON_OPERATOR
            }, {
              "key": ["Dimensions"],
              "show_key": lang.ide.DASH_LBL_DIMENSIONS
            }, {
              "key": ["EvaluationPeriods"],
              "show_key": lang.ide.DASH_LBL_EVALUATION_PERIODS
            }, {
              "key": ["InsufficientDataActions"],
              "show_key": lang.ide.DASH_LBL_INSUFFICIENT_DATA_ACTIONS
            }, {
              "key": ["MetricName"],
              "show_key": lang.ide.DASH_LBL_METRIC_NAME
            }, {
              "key": ["Namespace"],
              "show_key": lang.ide.DASH_LBL_NAMESPACE
            }, {
              "key": ["OKActions"],
              "show_key": lang.ide.DASH_LBL_OK_ACTIONS
            }, {
              "key": ["Period"],
              "show_key": lang.ide.DASH_LBL_PERIOD
            }, {
              "key": ["Statistic"],
              "show_key": lang.ide.DASH_LBL_STATISTIC
            }, {
              "key": ["StateValue"],
              "show_key": lang.ide.DASH_LBL_STATE_VALUE
            }, {
              "key": ["Threshold"],
              "show_key": lang.ide.DASH_LBL_THRESHOLD
            }, {
              "key": ["Unit"],
              "show_key": lang.ide.DASH_LBL_UNIT
            }
          ]
        },
        "ListSubscriptions": {
          "title": "Endpoint",
          "sub_info": [
            {
              "key": ["Endpoint"],
              "show_key": lang.ide.DASH_LBL_ENDPOINT
            }, {
              "key": ["Owner"],
              "show_key": lang.ide.DASH_LBL_OWNER
            }, {
              "key": ["Protocol"],
              "show_key": lang.ide.DASH_LBL_PROTOCOL
            }, {
              "key": ["SubscriptionArn"],
              "show_key": lang.ide.DASH_LBL_SUBSCRIPTION_ARN
            }, {
              "key": ["TopicArn"],
              "show_key": lang.ide.DASH_LBL_TOPIC_ARN
            }
          ]
        }
      }
    };
    region_tooltip = ["arrow-left map-tooltip-pointer-left", "arrow-up map-tooltip-pointer-up", "arrow-down map-tooltip-pointer", "arrow-down map-tooltip-pointer", "arrow-down map-tooltip-pointer", "arrow-down map-tooltip-pointer", "arrow-down map-tooltip-pointer", "arrow-down map-tooltip-pointer"];
    OverviewModel = Backbone.Model.extend({
      defaults: {
        'result_list': null,
        'region_classic_list': null,
        'region_empty_list': null,
        'recent_edited_stacks': null,
        'recent_launched_apps': null,
        'recent_stoped_apps': null,
        'cur_app_list': null,
        'cur_stack_list': null,
        'global_list': {},
        'cached_resources': {},
        'cached_complex_resources': {},
        'cached_resource_info': {},
        'cur_region_resource': null,
        'cur_region_resource_info': null,
        'supported_platforms': false
      },
      store: {
        awsResource: null
      },
      status: {
        isAccountInfoGot: false,
        isAwsHandleWait: false
      },
      initialize: function() {
        this.on('AWS_RESOURCE_RETURN', this.awsReturnHandler);
        this.on('APP_INFO_RETURN', this.appInfoHandler);
        vpc_model.on('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', this.vpcAccountAttrsReturnHandler, this);
        return null;
      },
      initAwsState: function() {
        this.status.isAwsHandleWait = false;
        return null;
      },
      initAccountState: function() {
        this.status.isAccountInfoGot = false;
        return null;
      },
      accountReturnHandler: function() {
        this.status.isAccountInfoGot = true;
        if (this.status.isAwsHandleWait) {
          return this.awsReturnHandler();
        }
      },
      awsReturnHandler: function(result) {
        var data, globalData, region;
        console.log('dashboard:awsReturnHandler');
        ide_event.trigger(ide_event.IDE_AVAILABLE);
        if (result) {
          this.store.awsResource = result;
        } else {
          result = this.store.awsResource;
        }
        if (!this.status.isAccountInfoGot) {
          this.status.isAwsHandleWait = true;
          return;
        }
        if (!App.user.hasCredential()) {
          return;
        }
        data = result.resolved_data;
        if (!_.size(data)) {
          return;
        }
        region = result.param[3];
        this.trigger('AWS:LOADING:STOP', region);
        if (region === null) {
          $.each(data, function(key, resources) {
            var error;
            try {
              return MC.aws.aws.cacheResource(resources, key, true);
            } catch (_error) {
              error = _error;
              console.error('[awsReturnHandler]catchResource error:' + key);
              console.info(resources);
              return true;
            }
          });
          this.cacheResource('raw', data);
          globalData = this.globalRegionhandle(data);
          return this.forceSet('global_list', globalData);
        } else {
          return this.setResource(data[region], region);
        }
      },
      loadResource: function(region) {
        var complex, info, raw;
        current_region = region;
        complex = this.getResourceFromCache('complex', region);
        raw = this.getResourceFromCache('raw', region);
        info = this.getResourceFromCache('info', region);
        if (complex && info) {
          this.forceSet('cur_region_resource_info', info);
          return this.forceSet('cur_region_resource', complex);
        } else if (raw) {
          return this.setResource(raw, region);
        } else {
          return this.describeAWSResourcesService(region);
        }
      },
      forceSet: function(key, value) {
        if (_.isEqual(value, this.get(key))) {
          return this.trigger("change:" + key);
        } else {
          return this.set(key, value);
        }
      },
      cacheResource: function(type, data, region) {
        var regionList;
        regionList = this.getResourceFromCache(type) || {};
        if (region) {
          regionList[region] = data[region] || data;
        } else {
          _.each(data, function(resource, region) {
            regionList[region] = resource;
            return null;
          });
        }
        return this.setResourceCache(type, regionList);
      },
      getResourceFromCache: function(type, region) {
        var regionList;
        regionList = this.getResourceCache(type);
        if (region && regionList) {
          return regionList[region];
        } else {
          return regionList;
        }
      },
      getResourceCacheKey: function(type) {
        switch (type) {
          case 'raw':
            return 'cached_resources';
          case 'complex':
            return 'cached_complex_resources';
          case 'info':
            return 'cached_resource_info';
          default:
            return 'cached_resources';
        }
      },
      setResourceCache: function(type, value) {
        var key;
        key = this.getResourceCacheKey(type);
        return this.set(key, value);
      },
      getResourceCache: function(type) {
        return this.get(this.getResourceCacheKey(type));
      },
      globalRegionhandle: function(data) {
        var midData, regions, retData, types;
        midData = retData = {};
        regions = _.keys(constant.REGION_LABEL);
        types = ['DescribeInstances', 'DescribeAddresses', 'DescribeVolumes', 'DescribeLoadBalancers', 'DescribeVpnConnections'];
        _.each(regions, function(region) {
          var value;
          value = data[region] || {};
          return _.each(types, function(type) {
            var v;
            v = value[type] || {};
            if (type === 'DescribeInstances') {
              v = _.filter(v, function(vv) {
                return vv.instanceState.name === 'running';
              });
            }
            if (!midData[type]) {
              midData[type] = {};
            }
            midData[type][region] = v;
            return null;
          });
        });
        _.each(midData, function(value, type) {
          retData[type] = {
            data: [],
            total: 0
          };
          return _.each(value, function(v, region) {
            var vTotal;
            vTotal = v && v.length || 0;
            if (vTotal) {
              retData[type].total += vTotal;
            }
            return retData[type].data.push({
              region: region,
              city: constant.REGION_SHORT_LABEL[region],
              area: constant.REGION_LABEL[region],
              total: vTotal
            });
          });
        });
        _.each(retData, function(value, type) {
          value.data = _.sortBy(value.data, function(v) {
            return -v.total;
          });
          return null;
        });
        return retData;
      },
      regionHandel: function(data) {
        var retData;
        retData = {};
        _.each(data, function(value, type) {
          retData[type] = {
            data: value,
            total: value && value.length || 0
          };
          return null;
        });
        return retData;
      },
      reRenderRegionResource: function(type) {
        return this.trigger("REGION_RESOURCE_CHANGED", type, this.get('cur_region_resource'));
      },
      _fillAppFiled: function(describe) {
        var owner, tag, _ref;
        owner = atob($.cookie('usercode'));
        if (describe.tagSet) {
          tag = describe.tagSet;
          if (tag['Created by'] === owner && !(((_ref = describe.instanceState) != null ? _ref.name : void 0) === 'terminated')) {
            describe.clickAble = true;
          }
          if (tag.app) {
            describe.app = tag.app;
            describe.host = tag.name;
            describe.owner = tag['Created by'];
          }
        }
        return describe;
      },
      setResource: function(resources, region) {
        var ami_list, cgw_set, dhcp_set, lists, manage_instances_app, manage_instances_id, me, owner, reg, vgw_set;
        if (!resources) {
          return;
        }
        me = this;
        lists = {
          ELB: 0,
          EIP: 0,
          Instance: 0,
          VPC: 0,
          VPN: 0,
          Volume: 0,
          AutoScalingGroup: 0,
          SNS: 0,
          CW: 0
        };
        lists.Not_Used = {
          'EIP': 0,
          'Volume': 0,
          SNS: 0,
          CW: 0
        };
        owner = atob($.cookie('usercode'));
        if (resources.DescribeLoadBalancers) {
          lists.ELB = resources.DescribeLoadBalancers.length;
          reg = /app-\w{8}/;
          _.map(resources.DescribeLoadBalancers, function(elb, i) {
            var reg_result;
            elb.detail = me.parseSourceValue('DescribeLoadBalancers', elb, "detail", null);
            elb.CreatedTime = MC.dateFormat(new Date(elb.CreatedTime), 'yyyy-MM-dd hh:mm:ss');
            if (!elb.Instances) {
              elb.state = '0 of 0 instances in service';
              elb.instance_state = [];
            } else {
              elb_service.DescribeInstanceHealth({
                sender: me
              }, $.cookie('usercode'), $.cookie('session_id'), current_region, elb.LoadBalancerName, null, function(result) {
                var health, instance, total, _i, _len, _ref;
                if (!result.is_error && result && result.resolved_data && result.resolved_data.length) {
                  total = result.resolved_data.length;
                  health = 0;
                  _ref = result.resolved_data;
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    instance = _ref[_i];
                    if (instance.State === "InService") {
                      health++;
                    }
                  }
                  _.map(resources.DescribeLoadBalancers, function(elb, i) {
                    if (elb.LoadBalancerName === result.param[4]) {
                      resources.DescribeLoadBalancers[i].state = "" + health + " of " + total + " instances in service";
                      resources.DescribeLoadBalancers[i].instance_state = result.resolved_data;
                    }
                    return null;
                  });
                  return me.reRenderRegionResource('DescribeLoadBalancers');
                } else {
                  return console.log('elb.DescribeInstanceHealth failed, error is ' + result.error_message);
                }
              });
            }
            reg_result = elb.LoadBalancerName.match(reg);
            if (reg_result) {
              elb.app = reg_result;
            }
            return null;
          });
        }
        if (resources.ListSubscriptions) {
          _.map(resources.ListSubscriptions, function(sub, i) {
            lists.SNS += 1;
            sub.detail = me.parseSourceValue('ListSubscriptions', sub, "detail", null);
            if (sub.SubscriptionArn === 'PendingConfirmation') {
              sub.pending_state = 'PendingConfirmation';
              lists.Not_Used.SNS += 1;
            } else {
              sub.success_state = 'Success';
            }
            sub.topic = sub.TopicArn.split(":")[5];
            return null;
          });
        }
        if (resources.DescribeAutoScalingGroups) {
          _.map(resources.DescribeAutoScalingGroups, function(asl, i) {
            lists.AutoScalingGroup += 1;
            if (asl.Tags) {
              _.map(asl.Tags.member, function(tag) {
                if (tag.Key === 'app') {
                  asl.app = tag.Value;
                }
                if (tag.Key === 'app-id') {
                  asl.app_id = tag.Value;
                }
                if (tag.Key === 'Created by') {
                  asl.owner = tag.Value;
                }
                return null;
              });
            }
            if (asl.Instances) {
              asl.Instances = _.pluck(asl.Instances.member, 'InstanceId');
            } else {
              asl.Instances = [];
            }
            asl.detail = me.parseSourceValue('DescribeAutoScalingGroups', asl, "detail", null);
            if (resources.DescribeScalingActivities) {
              $.each(resources.DescribeScalingActivities, function(idx, activity) {
                if (activity.AutoScalingGroupName === asl.AutoScalingGroupName) {
                  asl.last_activity = activity.Cause;
                  asl.activity_state = activity.StatusCode;
                  return false;
                }
              });
            }
            return null;
          });
        }
        if (resources.DescribeAlarms) {
          _.map(resources.DescribeAlarms, function(alarm, i) {
            lists.CW += 1;
            alarm.dimension_display = '';
            if (alarm.Dimensions) {
              alarm.dimension_display = alarm.Dimensions.member[0].Name + ':' + alarm.Dimensions.member[0].Value;
            }
            alarm.threshold_display = "" + alarm.MetricName + " " + alarm.ComparisonOperator + " " + alarm.Threshold + " for " + alarm.Period + " seconds";
            if (alarm.StateValue === 'OK') {
              alarm.state_ok = true;
            } else if (alarm.StateValue === 'ALARM') {
              lists.Not_Used.CW += 1;
              alarm.state_alarm = true;
            } else {
              alarm.state_insufficient = true;
            }
            alarm.detail = me.parseSourceValue('DescribeAlarms', alarm, "detail", null);
            return null;
          });
        }
        if (resources.DescribeAddresses) {
          _.map(resources.DescribeAddresses, function(eip, i) {
            if ($.isEmptyObject(eip.instanceId)) {
              lists.Not_Used.EIP++;
              resources.DescribeAddresses[i].instanceId = 'Not associated';
            }
            eip.detail = me.parseSourceValue('DescribeAddresses', eip, "detail", null);
            return null;
          });
          lists.EIP = resources.DescribeAddresses.length;
        }
        manage_instances_id = [];
        manage_instances_app = {};
        if (resources.DescribeInstances) {
          lists.Instance = resources.DescribeInstances.length;
          ami_list = [];
          _.map(resources.DescribeInstances, function(ins, i) {
            var is_managed;
            if (ins.instanceState.name === 'terminated') {
              ins.isTerminated = true;
            }
            ami_list.push(ins.imageId);
            ins.detail = me.parseSourceValue('DescribeInstances', ins, "detail", null);
            ins.launchTime = MC.dateFormat(new Date(ins.launchTime), 'yyyy-MM-dd hh:mm:ss');
            is_managed = false;
            me._fillAppFiled(ins);
            if (!resources.DescribeInstances[i].host) {
              resources.DescribeInstances[i].host = '';
            }
            return null;
          });
          _.map(resources.DescribeInstances, function(ins) {
            if (ins.app !== void 0) {
              manage_instances_id.push(ins.instanceId);
              manage_instances_app[ins.instanceId] = ins.app;
            }
            return null;
          });
          if (ami_list.length !== 0) {
            ami_service.DescribeImages({
              sender: me
            }, $.cookie('usercode'), $.cookie('session_id'), current_region, ami_list, null, null, null, function(result) {
              var region_ami_list;
              if (!result.is_error) {
                region_ami_list = {};
                if ($.type(result.resolved_data) === 'array') {
                  _.map(result.resolved_data, function(ami) {
                    region_ami_list[ami.imageId] = ami;
                    return null;
                  });
                }
                _.map(resources.DescribeInstances, function(ins, i) {
                  ins.image = region_ami_list[ins.imageId];
                  return null;
                });
                return me.reRenderRegionResource('DescribeInstances');
              } else {
                return console.log('ami.DescribeImages failed, error is ' + result.error_message);
              }
            });
          }
        }
        if (resources.DescribeVolumes) {
          lists.Volume = resources.DescribeVolumes.length;
          _.map(resources.DescribeVolumes, function(vol, i) {
            var attachment, _ref;
            vol.detail = me.parseSourceValue('DescribeVolumes', vol, "detail", null);
            vol.createTime = MC.dateFormat(new Date(vol.createTime), 'yyyy-MM-dd hh:mm:ss');
            if (vol.status === "available") {
              lists.Not_Used.Volume++;
            }
            me._set_app_property(vol, resources, i, 'DescribeVolumes');
            if (!vol.attachmentSet) {
              vol.attachmentSet = {
                item: []
              };
              attachment = {
                device: 'not-attached',
                status: 'not-attached'
              };
              vol.attachmentSet.item[0] = attachment;
            } else {
              if (vol.tagSet === void 0 && (_ref = vol.attachmentSet.item[0].instanceId, __indexOf.call(manage_instances_id, _ref) >= 0)) {
                resources.DescribeVolumes[i].app = manage_instances_app[vol.attachmentSet.item[0].instanceId];
                _.map(resources.DescribeInstances, function(ins) {
                  if (ins.instanceId === vol.attachmentSet.item[0].instanceId && ins.owner !== void 0) {
                    resources.DescribeVolumes[i].owner = ins.owner;
                  }
                  return null;
                });
              }
            }
            return null;
          });
        }
        if (resources.DescribeVpcs) {
          lists.VPC = resources.DescribeVpcs.length;
          _.map(resources.DescribeVpcs, function(vpc, i) {
            me._fillAppFiled(vpc);
            me._set_app_property(vpc, resources, i, 'DescribeVpcs');
            vpc.detail = me.parseSourceValue('DescribeVpcs', vpc, "detail", null);
            return null;
          });
          dhcp_set = [];
          _.map(resources.DescribeVpcs, function(vpc) {
            var _ref;
            if ((_ref = vpc.dhcpOptionsId, __indexOf.call(dhcp_set, _ref) < 0) && vpc.dhcpOptionsId !== 'default') {
              dhcp_set.push(vpc.dhcpOptionsId);
            }
            return null;
          });
          if (dhcp_set.length !== 0) {
            dhcp_service.DescribeDhcpOptions({
              sender: me
            }, $.cookie('usercode'), $.cookie('session_id'), current_region, dhcp_set, null, function(result) {
              if (!result.is_error) {
                dhcp_set = result.resolved_data;
                _.map(resources.DescribeVpcs, function(vpc) {
                  if (vpc.dhcpOptionsId === 'default') {
                    vpc.dhcp = '{"title": "default", "sub_info" : ["<dt>DhcpOptionsId: </dt><dd>None</dd>"]}';
                  }
                  if ($.type(dhcp_set) === 'object') {
                    if (vpc.dhcpOptionsId === dhcp_set.dhcpOptionsId) {
                      vpc.dhcp = me._genDhcp(dhcp_set);
                    }
                  } else {
                    _.map(dhcp_set, function(dhcp) {
                      if (vpc.dhcpOptionsId === dhcp.dhcpOptionsId) {
                        vpc.dhcp = me._genDhcp(dhcp);
                        return null;
                      }
                    });
                  }
                  return null;
                });
                me.reRenderRegionResource('DescribeVpcs');
              } else {
                console.log('dhcp.DescribeDhcpOptions failed, error is ' + result.error_message);
              }
              return null;
            });
          }
        }
        if (resources.DescribeVpnConnections) {
          lists.VPN = resources.DescribeVpnConnections.length;
          _.map(resources.DescribeVpnConnections, function(vpn, i) {
            me._set_app_property(vpn, resources, i, 'DescribeVpnConnections');
            vpn.detail = me.parseSourceValue('DescribeVpnConnections', vpn, "detail", null);
            return null;
          });
          cgw_set = [];
          vgw_set = [];
          _.map(resources.DescribeVpnConnections, function(vpn) {
            me._fillAppFiled(vpn);
            cgw_set.push(vpn.customerGatewayId);
            return vgw_set.push(vpn.vpnGatewayId);
          });
          if (cgw_set.length !== 0) {
            customergateway_service.DescribeCustomerGateways({
              sender: me
            }, $.cookie('usercode'), $.cookie('session_id'), current_region, cgw_set, null, function(result) {
              if (!result.is_error) {
                cgw_set = result.resolved_data;
                _.map(resources.DescribeVpnConnections, function(vpn) {
                  if ($.type(cgw_set) === 'object') {
                    vpn.cgw = me.parseSourceValue('DescribeCustomerGateways', cgw_set, "bubble", null);
                  } else {
                    _.map(cgw_set, function(cgw) {
                      if (vpn.customerGatewayId === cgw.customerGatewayId) {
                        vpn.cgw = me.parseSourceValue('DescribeCustomerGateways', cgw, "bubble", null);
                      }
                      return null;
                    });
                  }
                  return null;
                });
                me.reRenderRegionResource('DescribeVpnConnections');
              } else {
                console.log('customergateway.DescribeCustomerGateways failed, error is ' + result.error_message);
              }
              return null;
            });
          }
          if (vgw_set.length !== 0) {
            vpngateway_service.DescribeVpnGateways({
              sender: me
            }, $.cookie('usercode'), $.cookie('session_id'), current_region, vgw_set, null, function(result) {
              if (!result.is_error) {
                vgw_set = result.resolved_data;
                _.map(resources.DescribeVpnConnections, function(vpn) {
                  if ($.type(vgw_set) === 'object') {
                    vpn.vgw = me.parseSourceValue('DescribeVpnGateways', vgw_set, "bubble", null);
                    return null;
                  } else {
                    _.map(vgw_set, function(vgw) {
                      if (vpn.vpnGatewayId === vgw.vpnGatewayId) {
                        vpn.vgw = me.parseSourceValue('DescribeVpnGateways', vgw, "bubble", null);
                      }
                      return null;
                    });
                    return null;
                  }
                });
                me.reRenderRegionResource('DescribeVpnConnections');
              } else {
                console.log('vpngateway.DescribeVpnGateways failed, error is ' + result.error_message);
              }
              return null;
            });
          }
        }
        if (region === current_region) {
          me.forceSet('cur_region_resource_info', lists);
          me.forceSet('cur_region_resource', resources);
        }
        this.cacheResource('complex', resources, region);
        return this.cacheResource('info', lists, region);
      },
      parseSourceValue: function(type, value, keys, name) {
        var cur_state, keys_to_parse, keys_type, me, parse_btns, parse_result, parse_sub_info, parse_table, state_key, status_keys, value_to_parse;
        me = this;
        keys_to_parse = null;
        value_to_parse = value;
        parse_result = '';
        parse_sub_info = '';
        parse_table = '';
        parse_btns = '';
        keys_type = keys;
        if (popup_key_set[keys]) {
          keys_to_parse = popup_key_set[keys_type][type];
        } else {
          keys_type = "unmanaged_bubble";
          keys_to_parse = popup_key_set[keys_type][type];
        }
        if (!keys_to_parse) {
          console.log(type + ' ' + name);
        }
        status_keys = keys_to_parse.status ? keys_to_parse.status : null;
        if (status_keys) {
          state_key = status_keys[0];
          cur_state = value_to_parse[state_key];
          _.map(status_keys, function(value, key) {
            if (cur_state) {
              if (key > 0) {
                cur_state = cur_state[value];
                if ($.type(cur_state) === "array") {
                  cur_state = cur_state[0];
                }
                return null;
              }
            }
          });
          if (cur_state) {
            parse_result += '"status":"' + cur_state + '", ';
          }
        }
        if (keys_to_parse.title) {
          if (keys !== "detail") {
            if (name) {
              parse_result += '"title":"' + name;
              if (value_to_parse[keys_to_parse.title]) {
                parse_result += '-' + value_to_parse[keys_to_parse.title];
                parse_result += '", ';
              }
            } else {
              if (value_to_parse[keys_to_parse.title]) {
                parse_result += '"title":"';
                parse_result += value_to_parse[keys_to_parse.title];
                parse_result += '", ';
              }
            }
          } else if (keys === 'detail') {
            if (name) {
              parse_result += '"title":"' + name;
              if (value_to_parse[keys_to_parse.title]) {
                parse_result += '(' + value_to_parse[keys_to_parse.title];
                parse_result += ')", ';
              }
            } else {
              if (value_to_parse[keys_to_parse.title]) {
                parse_result += '"title":"';
                parse_result += value_to_parse[keys_to_parse.title];
                parse_result += '", ';
              }
            }
          }
        }
        _.map(keys_to_parse.sub_info, function(value) {
          var cur_key, cur_value, key_array, show_key;
          key_array = value.key;
          show_key = value.show_key;
          cur_key = key_array[0];
          cur_value = value_to_parse[cur_key];
          _.map(key_array, function(attr, key) {
            if (cur_value) {
              if (key > 0) {
                if (_.isArray(cur_value) && !_.isNumber(attr)) {
                  cur_value = _.pluck(cur_value, attr);
                } else if (_.isObject(cur_value)) {
                  cur_value = cur_value[attr];
                }
                return cur_value;
              }
            }
          });
          if (cur_value) {
            if ($.type(cur_value) === 'object' || $.type(cur_value) === 'array') {
              cur_value = me._genBubble(cur_value, show_key, true);
            }
            parse_sub_info += '"<dt>' + show_key + ': </dt><dd>' + cur_value + '</dd>", ';
          }
          return null;
        });
        if (parse_sub_info) {
          parse_sub_info = '"sub_info":[' + parse_sub_info;
          parse_sub_info = parse_sub_info.substring(0, parse_sub_info.length - 2);
          parse_sub_info += ']';
        }
        if (keys_to_parse.detail_table) {
          parse_table = me._parseTableValue(keys_to_parse.detail_table, value_to_parse);
          if (parse_table) {
            parse_table = '"detail_table":' + parse_table;
            if (parse_sub_info) {
              parse_sub_info = parse_sub_info + ', ' + parse_table;
            } else {
              parse_sub_info = parse_table;
            }
          }
        }
        if (parse_result) {
          parse_result = '{' + parse_result;
          if (parse_sub_info) {
            parse_result += parse_sub_info;
          } else {
            parse_result = parse_result.substring(0, parse_result.length - 2);
          }
          parse_result += '}';
        }
        return parse_result;
      },
      _set_app_property: function(resource, resources, i, action) {
        if (resource.tagSet !== void 0) {
          _.map(resource.tagSet, function(tag) {
            if (tag.key === 'app') {
              resources[action][i].app = tag.value;
            }
            if (tag.key === 'Created by') {
              resources[action][i].owner = tag.value;
            }
            return null;
          });
        }
        return null;
      },
      _genDhcp: function(dhcp) {
        var me, sub_info;
        me = this;
        popup_key_set.unmanaged_bubble.DescribeDhcpOptions = {};
        popup_key_set.unmanaged_bubble.DescribeDhcpOptions.title = "dhcpOptionsId";
        popup_key_set.unmanaged_bubble.DescribeDhcpOptions.sub_info = [];
        sub_info = popup_key_set.unmanaged_bubble.DescribeDhcpOptions.sub_info;
        if (dhcp.dhcpConfigurationSet) {
          _.map(dhcp.dhcpConfigurationSet.item, function(item, i) {
            return _.map(item.valueSet, function(it, j) {
              return sub_info.push({
                "key": ['dhcpConfigurationSet', 'item', i, 'valueSet', j],
                "show_key": item.key
              });
            });
          });
        }
        return me.parseSourceValue('DescribeDhcpOptions', dhcp, "bubble", null);
      },
      _genBubble: function(source, title, entry) {
        var bubble_end, bubble_front, is_str, lines, me, parse_sub_info, titles, tmp;
        me = this;
        parse_sub_info = "";
        if ($.isEmptyObject(source)) {
          return "";
        }
        if ($.type(source) === 'object') {
          tmp = [];
          _.map(source, function(value, key) {
            if (value !== null) {
              if (_.isString(value) || _.isBoolean(value)) {
                return tmp.push('\\"<dt>' + key + ': </dt><dd>' + value + '</dd>\\"');
              } else {
                return tmp.push(me._genBubble(value, title, false));
              }
            }
          });
          parse_sub_info = tmp.join(',');
          if (entry) {
            bubble_front = '<a href=\\"javascript:void(0)\\" class=\\"bubble table-link\\" data-bubble-template=\\"bubbleRegionResourceInfo\\" data-bubble-data=';
            bubble_end = '>' + title + '</a>';
            parse_sub_info = " &apos;{\\\"title\\\": \\\"" + title + '\\\" , \\\"sub_info\\\":[' + parse_sub_info + "]}&apos; ";
            parse_sub_info = bubble_front + parse_sub_info + bubble_end;
          }
        }
        if ($.type(source) === 'array') {
          tmp = [];
          titles = [];
          is_str = false;
          _.map(source, function(value, index) {
            var current_title;
            current_title = title;
            if (value.deviceName !== void 0) {
              current_title = value.deviceName;
            } else if (value.networkInterfaceId !== void 0) {
              current_title = value.networkInterfaceId;
            } else if (value.InstanceId !== void 0) {
              current_title = value.InstanceId;
            } else if (value.Listener !== void 0) {
              current_title = 'Listener' + '-' + index;
            } else {
              current_title = title + '-' + index;
            }
            titles.push(current_title);
            if (value !== null) {
              if (_.isString(value) || _.isBoolean(value)) {
                is_str = true;
                return tmp.push(value);
              } else {
                return tmp.push(me._genBubble(value, current_title, false));
              }
            }
          });
          lines = [];
          if (entry) {
            if (!is_str) {
              _.map(tmp, function(line, index) {
                bubble_front = '<a href=\\"javascript:void(0)\\" class=\\"bubble table-link\\" data-bubble-template=\\"bubbleRegionResourceInfo\\" data-bubble-data=';
                bubble_end = '>' + titles[index] + '</a>';
                line = " &apos;{\\\"title\\\": \\\"" + titles[index] + '\\\" , \\\"sub_info\\\":[' + line + "]}&apos; ";
                line = bubble_front + line + bubble_end;
                return lines.push(line);
              });
            } else {
              lines = tmp;
            }
          } else {
            lines = tmp;
          }
          parse_sub_info = lines.join(', ');
        }
        return parse_sub_info;
      },
      _parseTableValue: function(keyes_set, value_set) {
        var detail_table, me, parse_table_result, table_date, table_set;
        me = this;
        parse_table_result = '';
        table_date = '';
        detail_table = [
          {
            "key": ["vgwTelemetry", "item"],
            "show_key": "VPN Tunnel",
            "count_name": "tunnel"
          }, {
            "key": ["outsideIpAddress"],
            "show_key": "IP Address"
          }, {
            "key": ["status"],
            "show_key": "Status"
          }, {
            "key": ["lastStatusChange"],
            "show_key": "Last Changed"
          }, {
            "key": ["statusMessage"],
            "show_key": "Detail"
          }
        ];
        table_set = value_set.vgwTelemetry;
        if (table_set) {
          table_set = table_set.item;
          if (table_set) {
            parse_table_result = '{ "th_set":[';
            _.map(keyes_set, function(value, key) {
              if (key !== 0) {
                parse_table_result += ',';
              }
              parse_table_result += '"';
              parse_table_result += me._parseEmptyValue(value.show_key);
              parse_table_result += '"';
              return null;
            });
            _.map(table_set, function(value, key) {
              var cur_key, cur_value;
              cur_key = key;
              cur_value = key + 1;
              parse_table_result += '], "tr';
              parse_table_result += cur_value;
              parse_table_result += '_set":[';
              _.map(keyes_set, function(value, key) {
                if (key !== 0) {
                  parse_table_result += ',"';
                  parse_table_result += me._parseEmptyValue(table_set[cur_key][value.key]);
                  parse_table_result += '"';
                } else {
                  parse_table_result += '"';
                  parse_table_result += me._parseEmptyValue(value.count_name);
                  parse_table_result += cur_value;
                  parse_table_result += '"';
                }
                return null;
              });
              return null;
            });
            parse_table_result += ']}';
          }
        }
        return parse_table_result;
      },
      _parseEmptyValue: function(val) {
        if (val) {
          return val;
        } else {
          return '';
        }
      },
      vpcAccountAttrsReturnHandler: function(result) {
        var me, regionAttrSet;
        me = this;
        console.log('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN');
        MC.common.other.verify500(result);
        region_classic_vpc_result = [];
        if (!result.is_error) {
          regionAttrSet = result.resolved_data;
          _.map(constant.REGION_KEYS, function(value) {
            var default_vpc, support_platform;
            if (regionAttrSet[value] && regionAttrSet[value].accountAttributeSet) {
              support_platform = regionAttrSet[value].accountAttributeSet.item[0].attributeValueSet.item;
              if (support_platform && $.type(support_platform) === "array") {
                if (support_platform.length === 2) {
                  MC.data.account_attribute[value].support_platform = support_platform[0].attributeValue + ',' + support_platform[1].attributeValue;
                  region_classic_vpc_result.push({
                    'classic': 'Classic',
                    'vpc': 'VPC',
                    'region_name': constant.REGION_SHORT_LABEL[value],
                    'region': value
                  });
                } else if (support_platform.length === 1) {
                  MC.data.account_attribute[value].support_platform = support_platform[0].attributeValue;
                  region_classic_vpc_result.push({
                    'vpc': 'VPC',
                    'region_name': constant.REGION_SHORT_LABEL[value],
                    'region': value
                  });
                }
              }
              default_vpc = regionAttrSet[value].accountAttributeSet.item[1].attributeValueSet.item;
              if (default_vpc && $.type(default_vpc) === "array" && default_vpc.length === 1) {
                MC.data.account_attribute[value].default_vpc = default_vpc[0].attributeValue;
              }
              return null;
            }
          });
          me.set('region_classic_list', region_classic_vpc_result);
          setTimeout(function() {
            return me.describeAWSResourcesService();
          }, 2000);
          return null;
        } else {
          if (result.return_code !== constant.RETURN_CODE.E_SESSION && result.return_code !== constant.RETURN_CODE.E_BUSY) {
            App.showSettings(App.showSettings.TAB.CredentialInvalid);
            ide_event.trigger(ide_event.SWITCH_MAIN);
          }
          return me.set('region_classic_list', region_classic_vpc_result);
        }
      },
      updateMap: function(me, app_list, stack_list) {
        var r, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        console.log('updateMap', me, app_list, stack_list);
        total_app = 0;
        total_stack = 0;
        total_aws = 0;
        result_list.region_infos = [];
        region_aws_list = [];
        MC.data.stack_list = {};
        _ref = constant.REGION_KEYS;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          r = _ref[_i];
          MC.data.stack_list[r] = [];
        }
        MC.data.app_list = {};
        _ref1 = constant.REGION_KEYS;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          r = _ref1[_j];
          MC.data.app_list[r] = [];
        }
        MC.data.app_thumb_list = {};
        _ref2 = constant.REGION_KEYS;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          r = _ref2[_k];
          MC.data.app_thumb_list[r] = [];
        }
        _.map(constant.REGION_KEYS, function(value, key) {
          region_counts[value] = {
            'running_app': 0,
            'stopped_app': 0,
            'stack': 0,
            'app': 0
          };
          return null;
        });
        _.map(app_list, function(value) {
          var region_group_obj;
          region_group_obj = value;
          _.map(region_group_obj.region_name_group, function(value) {
            var _ref3;
            if (value.state === constant.APP_STATE.APP_STATE_RUNNING) {
              region_counts[value.region].running_app += 1;
            } else if (value.state === constant.APP_STATE.APP_STATE_STOPPED) {
              region_counts[value.region].stopped_app += 1;
            }
            total_app += 1;
            region_counts[value.region].app += 1;
            if (_ref3 = value.region, __indexOf.call(constant.REGION_KEYS, _ref3) >= 0) {
              MC.data.app_list[value.region].push(value.name);
              MC.data.app_thumb_list[value.region].push({
                id: value.id,
                name: value.name
              });
            }
            return null;
          });
          return null;
        });
        _.map(stack_list, function(value) {
          var region_group_obj;
          region_group_obj = value;
          _.map(region_group_obj.region_name_group, function(value) {
            var _ref3;
            region_counts[value.region].stack += 1;
            total_stack += 1;
            if (_ref3 = value.region, __indexOf.call(constant.REGION_KEYS, _ref3) >= 0) {
              MC.data.stack_list[value.region].push({
                id: value.id,
                name: value.name
              });
            }
            return null;
          });
          return null;
        });
        _.map(constant.REGION_KEYS, function(value, key) {
          if (region_counts[value].app !== 0 || region_counts[value].stack !== 0) {
            result_list.region_infos.push({
              'region_name': value,
              'region_city': constant.REGION_SHORT_LABEL[value],
              'app': region_counts[value].app,
              'running_app': region_counts[value].running_app,
              'stopped_app': region_counts[value].stopped_app,
              'stack': region_counts[value].stack,
              'pointer': region_tooltip[key]
            });
            region_aws_list.push(value);
          }
          return null;
        });
        total_aws = region_aws_list.length;
        result_list.total_app = total_app;
        result_list.total_stack = total_stack;
        result_list.total_aws = total_aws;
        result_list.plural_app = total_app > 1 ? 's' : '';
        result_list.plural_aws = total_aws > 1 ? 's' : '';
        result_list.plural_stack = total_stack > 1 ? 's' : '';
        console.log('sfsfasfffffffffffffff ', result_list);
        me.set('result_list', $.extend(true, {}, result_list));
        return null;
      },
      getItemList: function(flag, region, result) {
        var cur_item_list, item_list, me, regions, _i, _len;
        me = this;
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          regions = result[_i];
          if (constant.REGION_SHORT_LABEL[region] === regions.region_group) {
            item_list = regions.region_name_group;
          }
        }
        cur_item_list = [];
        _.map(item_list, function(value) {
          var item;
          item = me.parseItemList(value, flag);
          if (item) {
            cur_item_list.push(item);
            return null;
          }
        });
        if (cur_item_list) {
          cur_item_list.sort(function(a, b) {
            if (a.create_time <= b.create_time) {
              return 1;
            } else {
              return -1;
            }
          });
          if (flag === 'app') {
            if (_.difference(me.get('cur_app_list'), cur_item_list)) {
              return me.set('cur_app_list', cur_item_list);
            }
          } else if (flag === 'stack') {
            if (_.difference(me.get('cur_stack_list'), cur_item_list)) {
              return me.set('cur_stack_list', cur_item_list);
            }
          }
        }
      },
      parseItemList: function(item, flag) {
        var date, has_instance_store_ami, id, ispending, isrunning, me, result, start_time, status, stop_time;
        me = this;
        id = item.id;
        status = "play";
        isrunning = true;
        ispending = false;
        if (item.state === constant.APP_STATE.APP_STATE_INITIALIZING) {
          return;
        } else if (item.state === constant.APP_STATE.APP_STATE_RUNNING) {
          status = "play";
        } else if (item.state === constant.APP_STATE.APP_STATE_STOPPED) {
          isrunning = false;
          status = "stop";
        } else {
          status = "pending";
          ispending = true;
        }
        result = {
          'id': id,
          'code': item.key,
          'update_time': Math.round(+new Date()),
          'name': item.name,
          'isrunning': isrunning,
          'ispending': ispending,
          'status': status,
          'create_time': item.time_create
        };
        if (flag === 'app') {
          date = new Date();
          start_time = null;
          stop_time = null;
          has_instance_store_ami = false;
          if ('property' in item && item && 'stoppable' in item.property && item.property.stoppable === false) {
            has_instance_store_ami = true;
          }
          if (item.last_start) {
            date.setTime(item.last_start * 1000);
            start_time = "GMT " + MC.dateFormat(date, "hh:mm yyyy-MM-dd");
          }
          if (!isrunning && item.last_stop) {
            date.setTime(item.last_stop * 1000);
            stop_time = "GMT " + MC.dateFormat(date, "hh:mm yyyy-MM-dd");
          }
          result.start_time = start_time;
          result.stop_time = stop_time;
          result.has_instance_store_ami = has_instance_store_ami;
          result.usage = item.usage;
          result.is_production = item.usage !== 'production' ? false : true;
        }
        return result;
      },
      describeAccountAttributesService: function() {
        var me;
        this.initAccountState();
        me = this;
        vpc_model.DescribeAccountAttributes({
          sender: vpc_model
        }, $.cookie('usercode'), $.cookie('session_id'), '', ["supported-platforms", "default-vpc"]);
        return null;
      },
      updateRecentList: function(me, result, flag) {
        var recent_list;
        recent_list = [];
        _.map(result, function(value) {
          var items, region_group_obj, region_name;
          region_group_obj = value;
          items = [];
          region_name = null;
          return _.map(region_group_obj.region_name_group, function(value) {
            var item;
            region_name = value.region;
            items.push(value);
            item = me.parseItem(value, flag);
            if (item) {
              recent_list.push(item);
              return null;
            }
          });
        });
        recent_list.sort(function(a, b) {
          if (a.interval <= b.interval) {
            return 1;
          } else {
            return -1;
          }
        });
        if (recent_list.length > constant.RECENT_NUM) {
          recent_list = recent_list.slice(0, +(constant.RECENT_NUM - 1) + 1 || 9e9);
        }
        if (flag === 'recent_edited_stacks') {
          return me.set('recent_edited_stacks', recent_list);
        } else if (flag === 'recent_launched_apps') {
          return me.set('recent_launched_apps', recent_list);
        }
      },
      parseItem: function(value, flag) {
        var interval, result;
        interval = 0;
        if (flag === 'recent_edited_stacks') {
          interval = value.time_update;
        } else if (flag === 'recent_launched_apps') {
          interval = value.time_update;
        }
        if (interval) {
          result = {
            'id': value.id,
            'region': value.region,
            'region_label': constant.REGION_SHORT_LABEL[value.region],
            'name': value.name,
            'interval': interval,
            'interval_date': MC.intervalDate(interval)
          };
          if (flag === 'recent_launched_apps') {
            result.usage = value.usage;
          }
          return result;
        }
      },
      describeAWSResourcesService: function(region) {
        var me, res_type, resources;
        this.initAwsState();
        this.trigger('AWS:LOADING:START', region);
        me = this;
        region = region || null;
        current_region = region;
        res_type = constant.AWS_RESOURCE;
        resources = {};
        resources[res_type.INSTANCE] = {};
        resources[res_type.EIP] = {};
        resources[res_type.VOLUME] = {};
        resources[res_type.VPC] = {};
        resources[res_type.VPN] = {};
        resources[res_type.ELB] = {};
        resources[res_type.ASG] = {};
        resources[res_type.CLW] = {};
        resources[res_type.SNS_SUB] = {};
        return aws_model.resource({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, resources);
      },
      updateAppState: function(state, tab_name) {
        var cur_app_list, idx, item, me, _i, _len;
        me = this;
        cur_app_list = $.extend(true, [], me.get('cur_app_list'));
        if ((state === constant.APP_STATE.APP_STATE_STARTING || state === constant.APP_STATE.APP_STATE_STOPPING || state === constant.APP_STATE.APP_STATE_TERMINATING || state === constant.APP_STATE.APP_STATE_UPDATING) && tab_name in MC.process) {
          for (_i = 0, _len = cur_app_list.length; _i < _len; _i++) {
            item = cur_app_list[_i];
            if (item.id === MC.process[tab_name].id) {
              idx = cur_app_list.indexOf(item);
              if (idx >= 0 && cur_app_list[idx].status !== 'pending' && !cur_app_list[idx].ispending) {
                cur_app_list[idx].status = 'pending';
                cur_app_list[idx].ispending = true;
              }
              me.set('cur_app_list', cur_app_list);
            }
          }
        }
        return null;
      },
      importJson: function(json) {
        var new_result, result;
        result = JsonExporter.importJson(json);
        if (_.isString(result)) {
          return result;
        }
        console.log("Imported JSON: ", result, result.region);
        MC.common.other.checkRepeatStackName();
        result.username = $.cookie('usercode');
        result.name = MC.aws.aws.getDuplicateName(result.name);
        result.id = 'import-' + MC.data.untitled + '-' + result.region;
        new_result = {};
        new_result.resolved_data = [];
        new_result.resolved_data.push(result);
        console.log("Formate JSON: ", new_result);
        ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'IMPORT_STACK', new_result);
        return null;
      }
    });
    return new OverviewModel();
  });

}).call(this);
