(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var ASGConfigModel;
    ASGConfigModel = PropertyModel.extend({
      init: function(uid) {
        var component, data, lc, n;
        component = Design.instance().component(uid);
        if (component.type === "ExpandedAsg") {
          component = component.get("originalAsg");
          uid = component.id;
        }
        data = component != null ? component.toJSON() : void 0;
        data.uid = uid;
        this.set(data);
        lc = component.getLc();
        if (!lc) {
          this.set("emptyAsg", true);
          return;
        }
        this.set("has_elb", !!lc.connections("ElbAmiAsso").length);
        this.set("isEC2HealthCheck", component.isEC2HealthCheckType());
        n = component.getNotification();
        this.set("notification", n);
        this.set("has_notification", n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test);
        this.notiObject = component.getNotiObject();
        this.set("policies", _.map(data.policies, function(p) {
          data = $.extend(true, {}, p.attributes);
          data.alarmData.period = Math.round(data.alarmData.period / 60);
          return data;
        }));
        return null;
      },
      setHealthCheckType: function(type) {
        return Design.instance().component(this.get("uid")).set("healthCheckType", type);
      },
      setASGMin: function(value) {
        return Design.instance().component(this.get("uid")).set("minSize", value);
      },
      setASGMax: function(value) {
        return Design.instance().component(this.get("uid")).set("maxSize", value);
      },
      setASGDesireCapacity: function(value) {
        return Design.instance().component(this.get("uid")).set("capacity", value);
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
        if (!policy_detail.uid) {
          PolicyModel = Design.modelClassForType(constant.RESTYPE.SP);
          policy = new PolicyModel(policy_detail);
          asg.addScalingPolicy(policy);
          policy_detail.uid = policy.id;
          this.get("policies").push(policy.toJSON());
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
    return new ASGConfigModel();
  });

}).call(this);
