(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['../base/model', 'constant', 'Design', "CloudResources"], function(PropertyModel, constant, Design, CloudResources) {
    var ASGModel;
    ASGModel = PropertyModel.extend({
      init: function(uid) {
        var asg_comp, asg_data, data, lc, n, region, _ref;
        asg_comp = Design.instance().component(uid);
        if (asg_comp.type === "ExpandedAsg") {
          asg_comp = asg_comp.get("originalAsg");
          uid = asg_comp.get("id");
        }
        data = {
          uid: uid,
          name: asg_comp.get('name'),
          description: asg_comp.get('description'),
          minSize: asg_comp.get('minSize'),
          maxSize: asg_comp.get('maxSize'),
          capacity: asg_comp.get('capacity'),
          isEditable: this.isAppEdit
        };
        this.set(data);
        region = Design.instance().region();
        asg_data = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.ASG, region).get(asg_comp.get('appId'))) != null ? _ref.toJSON() : void 0;
        if (asg_data) {
          this.set('hasData', true);
          this.set('awsResName', asg_data.AutoScalingGroupName);
          this.set('arn', asg_data.id);
          this.set('createTime', asg_data.CreatedTime);
          if (asg_data.TerminationPolicies && asg_data.TerminationPolicies) {
            this.set('term_policy_brief', asg_data.TerminationPolicies.join(" > "));
          }
          this.handleInstance(asg_comp, asg_data);
        }
        if (!this.isAppEdit && asg_comp.type === constant.RESTYPE.ASG) {
          if (!asg_data) {
            return false;
          }
          this.set('lcName', asg_data.LaunchConfigurationName);
          this.set('cooldown', asg_data.DefaultCooldown);
          this.set('healCheckType', asg_data.HealthCheckType);
          this.set('healthCheckGracePeriod', asg_data.HealthCheckGracePeriod);
          this.set('notiTopicName', this.getNotificationTopicName());
          this.handlePolicy(asg_comp, asg_data);
          this.handleNotify(asg_comp, asg_data);
        } else {
          data = asg_comp != null ? asg_comp.toJSON() : void 0;
          data.uid = uid;
          this.set(data);
          lc = asg_comp.getLc();
          if (!lc) {
            this.set("emptyAsg", true);
            return;
          }
          this.set("has_elb", !!lc.connections("ElbAmiAsso").length);
          this.set("isEC2HealthCheck", asg_comp.isEC2HealthCheckType());
          this.set('detail_monitor', !!lc.get('monitoring'));
          n = asg_comp.getNotification();
          this.set("notification", n);
          this.set("has_notification", n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test);
          this.notiObject = asg_comp.getNotiObject();
          this.set("policies", _.map(data.policies, function(p) {
            data = $.extend(true, {}, p.attributes);
            data.alarmData.period = Math.round(data.alarmData.period / 60);
            return data;
          }));
        }
        return null;
      },
      handleInstance: function(asg_comp, asg_data) {
        var ami, az, idx, instance, instance_count, instance_groups, instances, instances_map, _i, _len, _ref;
        instance_count = 0;
        instance_groups = [];
        instances_map = {};
        if (asg_data.Instances && asg_data.Instances) {
          instance_count = asg_data.Instances.length;
          _ref = asg_data.Instances;
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            instance = _ref[idx];
            ami = {
              status: instance.HealthStatus === 'Healthy' ? 'green' : 'red',
              healthy: instance.HealthStatus,
              name: instance.InstanceId
            };
            az = instance.AvailabilityZone;
            if (instances_map[az]) {
              instances_map[az].push(ami);
            } else {
              instances_map[az] = [ami];
            }
          }
          for (az in instances_map) {
            instances = instances_map[az];
            instance_groups.push({
              name: az,
              instances: instances
            });
          }
        } else {
          instance_count = 0;
        }
        this.set('instance_groups', instance_groups);
        return this.set('instance_count', instance_count);
      },
      handleNotify: function(asg_comp, asg_data) {
        var nc_array, nc_map, notification, region, sendNotify, t, _i, _len, _ref;
        region = Design.instance().region();
        notification = CloudResources(Design.instance().credentialId(), constant.RESTYPE.NC, region).findWhere({
          AutoScalingGroupName: asg_data.AutoScalingGroupName
        });
        sendNotify = false;
        nc_array = [false, false, false, false, false];
        nc_map = {
          "autoscaling:EC2_INSTANCE_LAUNCH": 0,
          "autoscaling:EC2_INSTANCE_LAUNCH_ERROR": 1,
          "autoscaling:EC2_INSTANCE_TERMINATE": 2,
          "autoscaling:EC2_INSTANCE_TERMINATE_ERROR": 3,
          "autoscaling:TEST_NOTIFICATION": 4
        };
        if (notification) {
          _ref = notification.get("NotificationType");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            t = _ref[_i];
            nc_array[nc_map[t]] = true;
            sendNotify = true;
          }
        }
        this.set('notifies', nc_array);
        return this.set('sendNotify', sendNotify);
      },
      handlePolicy: function(asg_comp, asg_data) {
        var action, actions, actions_arr, alarm_data, cloudWatchPolicyMap, cwCln, idx, policies, policy, policy_data, region, sp, spCln, trigger_arr, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        policies = [];
        cloudWatchPolicyMap = {};
        region = Design.instance().region();
        spCln = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SP, region);
        cwCln = CloudResources(Design.instance().credentialId(), constant.RESTYPE.CW, region);
        _ref = asg_comp.get("policies");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sp = _ref[_i];
          policy_data = (_ref1 = spCln.get(sp.get('appId'))) != null ? _ref1.toJSON() : void 0;
          if (!policy_data) {
            continue;
          }
          policy = {
            adjusttype: policy_data.AdjustmentType,
            adjustment: policy_data.ScalingAdjustment,
            step: policy_data.MinAdjustmentStep,
            cooldown: policy_data.Cooldown,
            name: policy_data.PolicyName,
            arn: sp.get('appId')
          };
          alarm_data = (_ref2 = cwCln.get(sp.get("alarmData").appId)) != null ? _ref2.toJSON() : void 0;
          if (alarm_data) {
            actions_arr = [alarm_data.InsufficientDataActions, alarm_data.OKActions, alarm_data.AlarmActions];
            trigger_arr = ['INSUFFICIANT_DATA', 'OK', 'ALARM'];
            for (idx = _j = 0, _len1 = actions_arr.length; _j < _len1; idx = ++_j) {
              actions = actions_arr[idx];
              if (!actions) {
                continue;
              }
              for (_k = 0, _len2 = actions.length; _k < _len2; _k++) {
                action = actions[_k];
                if (action !== policy.arn) {
                  continue;
                }
                policy.arn = "";
                policy.evaluation = sp.get("alarmData").comparisonOperator;
                policy.metric = alarm_data.MetricName;
                policy.notify = actions.length === 2;
                policy.periods = alarm_data.EvaluationPeriods;
                policy.minute = Math.round(alarm_data.Period / 60);
                policy.statistics = alarm_data.Statistic;
                policy.threshold = alarm_data.Threshold;
                policy.trigger = trigger_arr[idx];
              }
            }
          } else {
            console.warn("handlePolicy():can not find CloudWatch info of ScalingPolicy");
          }
          policies.push(policy);
          _results.push(this.set('policies', _.sortBy(policies, "name")));
        }
        return _results;
      },
      setHealthCheckType: function(type) {
        return Design.instance().component(this.get("uid")).set("healthCheckType", type);
      },
      setASGMin: function(value) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).set("minSize", value);
        return null;
      },
      setASGMax: function(value) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).set("maxSize", value);
        return null;
      },
      setASGDesireCapacity: function(value) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).set("capacity", value);
        return null;
      },
      setASGCoolDown: function(value) {
        return Design.instance().component(this.get("uid")).set("cooldown", value);
      },
      setHealthCheckGrace: function(value) {
        return Design.instance().component(this.get("uid")).set("healthCheckGracePeriod", value);
      },
      setNotification: function(notification) {
        var n;
        n = Design.instance().component(this.get("uid")).setNotification(notification);
        this.notiObject = n;
        return null;
      },
      removeTopic: function() {
        var n;
        n = Design.instance().component(this.get("uid")).setNotification(notification);
        return n != null ? n.removeTopic() : void 0;
      },
      getNotificationTopicName: function() {
        return Design.instance().component(this.get("uid")).getNotificationTopicName();
      },
      setNotificationTopic: function(appId, name) {
        return Design.instance().component(this.get("uid")).setNotificationTopic(appId, name);
      },
      setTerminatePolicy: function(policies) {
        Design.instance().component(this.get("uid")).set("terminationPolicies", policies);
        this.set("terminationPolicies", policies);
        return null;
      },
      delPolicy: function(uid) {
        Design.instance().component(uid).remove();
        return null;
      },
      isDupPolicyName: function(policy_uid, name) {
        return _.some(Design.instance().component(this.get("uid")).get("policies"), function(p) {
          if (p.id !== policy_uid && p.get('name') === name) {
            return true;
          }
        });
      },
      defaultScalingPolicyName: function() {
        var component, count, currentNames, name, policies;
        component = Design.instance().component(this.get("uid"));
        if (component.type === "ExpandedAsg") {
          component = component.get("originalAsg");
        }
        policies = component.get("policies");
        count = policies.length;
        name = "" + this.attributes.name + "-policy-" + count;
        currentNames = _.map(policies, function(policy) {
          return policy.get('name');
        });
        while (__indexOf.call(currentNames, name) >= 0) {
          name = "" + this.attributes.name + "-policy-" + (++count);
        }
        return name;
      },
      getPolicy: function(uid) {
        var data;
        data = $.extend(true, {}, Design.instance().component(uid).attributes);
        data.alarmData.period = Math.round(data.alarmData.period / 60);
        return data;
      },
      setPolicy: function(policy_detail) {
        var PolicyModel, alarmData, asg, policy;
        asg = Design.instance().component(this.get("uid"));
        if (asg.type === "ExpandedAsg") {
          asg = asg.get('originalAsg');
        }
        if (policy_detail.sendNotification) {
          Design.modelClassForType(constant.RESTYPE.TOPIC).ensureExistence();
        }
        if (!policy_detail.uid) {
          PolicyModel = Design.modelClassForType(constant.RESTYPE.SP);
          policy = new PolicyModel(policy_detail);
          asg.addScalingPolicy(policy);
          policy_detail.uid = policy.id;
          this.get("policies").push(policy != null ? policy.toJSON() : void 0);
        } else {
          policy = Design.instance().component(policy_detail.uid);
          alarmData = policy_detail.alarmData;
          policy.setAlarm(alarmData);
          delete policy_detail.alarmData;
          policy.set(policy_detail);
          policy_detail.alarmData = alarmData;
        }
        if (policy_detail.sendNotification && policy_detail.topic) {
          policy.setTopic(policy_detail.topic.appId, policy_detail.topic.name);
        }
        return null;
      }
    });
    return new ASGModel();
  });

}).call(this);
