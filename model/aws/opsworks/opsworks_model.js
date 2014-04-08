(function() {
  define(['backbone', 'underscore', 'opsworks_service', 'base_model'], function(Backbone, _, opsworks_service, base_model) {
    var OpsWorksModel, opsworks_model;
    OpsWorksModel = Backbone.Model.extend({
      initialize: function() {
        return _.extend(this, base_model);
      },
      DescribeApps: function(src, username, session_id, region_name, app_ids, stack_id) {
        var me;
        if (app_ids == null) {
          app_ids = null;
        }
        if (stack_id == null) {
          stack_id = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeApps(src, username, session_id, region_name, app_ids, stack_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_APPS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeApps failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeStacks: function(src, username, session_id, region_name, stack_ids) {
        var me;
        if (stack_ids == null) {
          stack_ids = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeStacks(src, username, session_id, region_name, stack_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_STACKS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeStacks failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeCommands: function(src, username, session_id, region_name, command_ids, deployment_id, instance_id) {
        var me;
        if (command_ids == null) {
          command_ids = null;
        }
        if (deployment_id == null) {
          deployment_id = null;
        }
        if (instance_id == null) {
          instance_id = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeCommands(src, username, session_id, region_name, command_ids, deployment_id, instance_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_COMMANDS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeCommands failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeDeployments: function(src, username, session_id, region_name, app_id, deployment_ids, stack_id) {
        var me;
        if (app_id == null) {
          app_id = null;
        }
        if (deployment_ids == null) {
          deployment_ids = null;
        }
        if (stack_id == null) {
          stack_id = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeDeployments(src, username, session_id, region_name, app_id, deployment_ids, stack_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_DEPLOYMENTS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeDeployments failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeElasticIps: function(src, username, session_id, region_name, instance_id, ips) {
        var me;
        if (instance_id == null) {
          instance_id = null;
        }
        if (ips == null) {
          ips = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeElasticIps(src, username, session_id, region_name, instance_id, ips, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_ELASTIC_IPS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeElasticIps failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeInstances: function(src, username, session_id, region_name, app_id, instance_ids, layer_id, stack_id) {
        var me;
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
        me = this;
        src.model = me;
        return opsworks_service.DescribeInstances(src, username, session_id, region_name, app_id, instance_ids, layer_id, stack_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_INSS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeInstances failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLayers: function(src, username, session_id, region_name, stack_id, layer_ids) {
        var me;
        if (layer_ids == null) {
          layer_ids = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeLayers(src, username, session_id, region_name, stack_id, layer_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_LAYERS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeLayers failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeLoadBasedAutoScaling: function(src, username, session_id, region_name, layer_ids) {
        var me;
        me = this;
        src.model = me;
        return opsworks_service.DescribeLoadBasedAutoScaling(src, username, session_id, region_name, layer_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_LOAD_BASED_ASL_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeLoadBasedAutoScaling failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribePermissions: function(src, username, session_id, region_name, iam_user_arn, stack_id) {
        var me;
        me = this;
        src.model = me;
        return opsworks_service.DescribePermissions(src, username, session_id, region_name, iam_user_arn, stack_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_PERMISSIONS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribePermissions failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeRaidArrays: function(src, username, session_id, region_name, instance_id, raid_array_ids) {
        var me;
        if (instance_id == null) {
          instance_id = null;
        }
        if (raid_array_ids == null) {
          raid_array_ids = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeRaidArrays(src, username, session_id, region_name, instance_id, raid_array_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_RAID_ARRAYS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeRaidArrays failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeServiceErrors: function(src, username, session_id, region_name, instance_id, service_error_ids, stack_id) {
        var me;
        if (instance_id == null) {
          instance_id = null;
        }
        if (service_error_ids == null) {
          service_error_ids = null;
        }
        if (stack_id == null) {
          stack_id = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeServiceErrors(src, username, session_id, region_name, instance_id, service_error_ids, stack_id, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_SERVICE_ERRORS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeServiceErrors failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeTimeBasedAutoScaling: function(src, username, session_id, region_name, instance_ids) {
        var me;
        me = this;
        src.model = me;
        return opsworks_service.DescribeTimeBasedAutoScaling(src, username, session_id, region_name, instance_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_TIME_BASED_ASL_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeTimeBasedAutoScaling failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeUserProfiles: function(src, username, session_id, region_name, iam_user_arns) {
        var me;
        me = this;
        src.model = me;
        return opsworks_service.DescribeUserProfiles(src, username, session_id, region_name, iam_user_arns, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_USER_PROFILES_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeUserProfiles failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      },
      DescribeVolumes: function(src, username, session_id, region_name, instance_id, raid_array_id, volume_ids) {
        var me;
        if (instance_id == null) {
          instance_id = null;
        }
        if (raid_array_id == null) {
          raid_array_id = null;
        }
        if (volume_ids == null) {
          volume_ids = null;
        }
        me = this;
        src.model = me;
        return opsworks_service.DescribeVolumes(src, username, session_id, region_name, instance_id, raid_array_id, volume_ids, function(aws_result) {
          if (!aws_result.is_error) {
            if (src.sender && src.sender.trigger) {
              return src.sender.trigger('OPSWORKS__DESC_VOLS_RETURN', aws_result);
            }
          } else {
            console.log('opsworks.DescribeVolumes failed, error is ' + aws_result.error_message);
            return me.pub(aws_result);
          }
        });
      }
    });
    opsworks_model = new OpsWorksModel();
    return opsworks_model;
  });

}).call(this);
