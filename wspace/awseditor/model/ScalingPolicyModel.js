(function() {
  define(["ResourceModel", "ComplexResModel", "constant"], function(ResourceModel, ComplexResModel, constant) {
    var Model;
    Model = ComplexResModel.extend({
      type: constant.RESTYPE.SP,
      defaults: function() {
        return {
          cooldown: "",
          minAdjustStep: "",
          adjustment: "-1",
          adjustmentType: "ChangeInCapacity",
          state: "ALARM",
          sendNotification: false,
          alarmData: {
            id: MC.guid(),
            alarmName: "",
            namespace: "AWS/AutoScaling",
            metricName: "CPUUtilization",
            comparisonOperator: ">=",
            evaluationPeriods: "2",
            period: "300",
            statistic: "Average",
            threshold: "10",
            unit: "",
            appId: ""
          }
        };
      },
      isVisual: function() {
        return false;
      },
      constructor: function(attribute, option) {
        var defaults;
        defaults = this.defaults();
        attribute.alarmData = $.extend(defaults.alarmData, attribute.alarmData);
        return ResourceModel.call(this, attribute, option);
      },
      setAlarm: function(alarmData) {
        this.set("alarmData", $.extend({
          id: this.attributes.alarmData.id,
          namespace: "AWS/AutoScaling",
          unit: "",
          appId: this.attributes.alarmData.appId,
          alarmName: this.attributes.alarmData.alarmName
        }, alarmData));
        return null;
      },
      isNotificate: function() {
        return this.get('sendNotification');
      },
      getCost: function(priceMap, currency) {
        var alarmData, asgSize, fee, p, period, _i, _len, _ref;
        alarmData = this.get("alarmData");
        period = parseInt(alarmData.period, 10);
        if (!(period <= 300 && alarmData.namespace === "AWS/AutoScaling")) {
          return null;
        }
        _ref = priceMap.cloudwatch.types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.ec2Monitoring) {
            fee = parseFloat(p.ec2Monitoring[currency], 10) || 0;
            break;
          }
        }
        if (fee && this.__asg) {
          asgSize = Design.instance().modeIsStack() ? this.__asg.get("minSize") : this.__asg.get("capacity");
          fee = Math.round(fee / 7 * 1000) / 1000;
          return {
            resource: this.get("name") + "-alarm",
            type: "CloudWatch",
            fee: fee,
            formatedFee: fee + "/mo"
          };
        }
        return null;
      },
      setTopic: function(appId, name) {
        var TopicModel;
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        return TopicModel.get(appId, name).assignTo(this);
      },
      removeTopic: function() {
        var _ref;
        return (_ref = this.connections('TopicUsage')[0]) != null ? _ref.remove() : void 0;
      },
      getTopic: function() {
        return this.connectionTargets('TopicUsage')[0];
      },
      getTopicName: function() {
        var _ref;
        return (_ref = this.getTopic()) != null ? _ref.get('name') : void 0;
      },
      serialize: function() {
        var act_alarm, act_insuffi, act_ok, action_arry, alarm, alarmData, policy, topic;
        if (!this.__asg) {
          console.warn("ScalingPolicy has no attached asg when serializing.");
          return;
        }
        policy = {
          name: this.get("name"),
          type: this.type,
          uid: this.id,
          resource: {
            ScalingAdjustment: this.get("adjustment"),
            PolicyName: this.get("name"),
            PolicyARN: this.get("appId"),
            Cooldown: this.get("cooldown"),
            AutoScalingGroupName: this.__asg.createRef("AutoScalingGroupName"),
            AdjustmentType: this.get("adjustmentType"),
            MinAdjustmentStep: this.get("adjustmentType") === 'PercentChangeInCapacity' ? this.get("minAdjustStep") : ''
          }
        };
        alarmData = this.get("alarmData");
        act_alarm = act_insuffi = act_ok = [];
        action_arry = [this.createRef("PolicyARN")];
        if (this.get("sendNotification")) {
          topic = this.getTopic();
          if (topic) {
            action_arry.push(topic.createRef("TopicArn"));
          }
        }
        if (this.get("state") === "ALARM") {
          act_alarm = action_arry;
        } else if (this.get("state") === "INSUFFICIANT_DATA") {
          act_insuffi = action_arry;
        } else {
          act_ok = action_arry;
        }
        alarm = {
          name: this.get("name") + "-alarm",
          type: constant.RESTYPE.CW,
          uid: alarmData.id,
          resource: {
            AlarmArn: alarmData.appId,
            AlarmName: alarmData.alarmName || (this.get("name") + "-alarm"),
            ComparisonOperator: alarmData.comparisonOperator,
            EvaluationPeriods: alarmData.evaluationPeriods,
            MetricName: alarmData.metricName,
            Namespace: alarmData.namespace,
            Period: Math.round(alarmData.period / 60) * 60,
            Statistic: alarmData.statistic,
            Threshold: alarmData.threshold,
            Unit: alarmData.unit,
            Dimensions: [
              {
                name: "AutoScalingGroupName",
                value: this.__asg.createRef("AutoScalingGroupName")
              }
            ],
            AlarmActions: act_alarm,
            InsufficientDataActions: act_insuffi,
            OKAction: act_ok
          }
        };
        return [
          {
            component: policy
          }, {
            component: alarm
          }
        ];
      }
    }, {
      handleTypes: [constant.RESTYPE.SP, constant.RESTYPE.CW],
      deserialize: function(data, layout_data, resolve) {
        var alarmData, asg, i, policy, refArray, sendNotification, state, topic, _i, _len;
        if (data.type === constant.RESTYPE.CW) {
          alarmData = {
            id: data.uid,
            name: data.name,
            alarmName: data.resource.AlarmName,
            appId: data.resource.AlarmArn,
            comparisonOperator: data.resource.ComparisonOperator,
            evaluationPeriods: data.resource.EvaluationPeriods,
            metricName: data.resource.MetricName,
            period: data.resource.Period,
            statistic: data.resource.Statistic,
            threshold: data.resource.Threshold,
            namespace: data.resource.Namespace,
            unit: data.resource.Unit
          };
          refArray = [];
          if (data.resource.AlarmActions.length) {
            state = "ALARM";
            refArray.push(data.resource.AlarmActions[0]);
            refArray.push(data.resource.AlarmActions[1]);
          }
          if (data.resource.OKAction.length) {
            state = "OK";
            refArray.push(data.resource.OKAction[0]);
            refArray.push(data.resource.OKAction[1]);
          }
          if (data.resource.InsufficientDataActions && data.resource.InsufficientDataActions.length) {
            state = "INSUFFICIANT_DATA";
            refArray.push(data.resource.InsufficientDataActions[0]);
            refArray.push(data.resource.InsufficientDataActions[1]);
          }
          sendNotification = false;
          for (_i = 0, _len = refArray.length; _i < _len; _i++) {
            i = refArray[_i];
            if (!i) {
              continue;
            }
            if (i.indexOf("PolicyARN") !== -1) {
              policy = resolve(MC.extractID(i)) || new Backbone.Model();
            } else if (i.indexOf("TopicArn") !== -1) {
              topic = resolve(MC.extractID(i));
              sendNotification = true;
            }
          }
          if (topic != null) {
            topic.assignTo(policy);
          }
          if (policy) {
            policy.set({
              "alarmData": alarmData,
              "sendNotification": sendNotification,
              "state": state
            });
          }
        } else {
          policy = new Model({
            id: data.uid,
            name: data.resource.PolicyName || data.name,
            appId: data.resource.PolicyARN,
            cooldown: data.resource.Cooldown,
            minAdjustStep: data.resource.MinAdjustmentStep,
            adjustment: data.resource.ScalingAdjustment,
            adjustmentType: data.resource.AdjustmentType
          });
          asg = resolve(MC.extractID(data.resource.AutoScalingGroupName));
          if (asg) {
            asg.addScalingPolicy(policy);
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
