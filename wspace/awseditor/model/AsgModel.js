(function() {
  define(["ResourceModel", "ComplexResModel", "Design", "constant", "i18n!/nls/lang.js", "./connection/LcUsage"], function(ResourceModel, ComplexResModel, Design, constant, lang, LcUsage) {
    var ExpandedAsgModel, Model, NotificationModel;
    NotificationModel = ComplexResModel.extend({
      type: constant.RESTYPE.NC,
      isUsed: function() {
        return this.get("instanceLaunch") || this.get("instanceLaunchError") || this.get("instanceTerminate") || this.get("instanceTerminateError") || this.get("test");
      },
      initialize: function() {
        Design.modelClassForType(constant.RESTYPE.TOPIC).ensureExistence();
        return null;
      },
      isVisual: function() {
        return false;
      },
      getTopic: function() {
        return this.connectionTargets('TopicUsage')[0];
      },
      removeTopic: function() {
        var _ref;
        return (_ref = this.connections('TopicUsage')[0]) != null ? _ref.remove() : void 0;
      },
      isEffective: function() {
        var n;
        n = this.toJSON();
        return n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test;
      },
      getTopicName: function() {
        var _ref;
        return (_ref = this.getTopic()) != null ? _ref.get('name') : void 0;
      },
      setTopic: function(appId, name) {
        var TopicModel;
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        return TopicModel.get(appId, name).assignTo(this);
      },
      serialize: function() {
        var key, name, notifies, topic, _ref;
        if (!this.isUsed() || !this.get("asg")) {
          return;
        }
        topic = this.getTopic();
        notifies = [];
        _ref = NotificationModel.typeMap;
        for (key in _ref) {
          name = _ref[key];
          if (this.get(name)) {
            notifies.push(key);
          }
        }
        return {
          component: {
            name: "SnsNotification",
            type: this.type,
            uid: this.id,
            resource: {
              AutoScalingGroupName: this.get("asg").createRef("AutoScalingGroupName"),
              TopicARN: topic && topic.createRef("TopicArn") || '',
              NotificationType: notifies
            }
          }
        };
      }
    }, {
      handleTypes: constant.RESTYPE.NC,
      typeMap: {
        "autoscaling:EC2_INSTANCE_LAUNCH": "instanceLaunch",
        "autoscaling:EC2_INSTANCE_LAUNCH_ERROR": "instanceLaunchError",
        "autoscaling:EC2_INSTANCE_TERMINATE": "instanceTerminate",
        "autoscaling:EC2_INSTANCE_TERMINATE_ERROR": "instanceTerminateError",
        "autoscaling:TEST_NOTIFICATION": "test"
      },
      deserialize: function(data, layout_data, resolve) {
        var asg, attr, notify, t, _i, _len, _ref, _ref1;
        attr = {
          id: data.uid
        };
        _ref = data.resource.NotificationType;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          attr[NotificationModel.typeMap[t]] = true;
        }
        notify = new NotificationModel(attr);
        asg = resolve(MC.extractID(data.resource.AutoScalingGroupName));
        if (asg) {
          asg.set("notification", notify);
          notify.set("asg", asg);
        }
        if ((_ref1 = resolve(MC.extractID(data.resource.TopicARN))) != null) {
          _ref1.assignTo(notify);
        }
        return null;
      }
    });
    ExpandedAsgModel = ComplexResModel.extend({
      type: "ExpandedAsg",
      defaults: {
        originalAsg: null
      },
      constructor: function(attributes, options) {
        var asg, expanded, _i, _len, _ref;
        console.assert(attributes.parent && attributes.originalAsg, "Invalid parameter for expanding asg");
        asg = attributes.originalAsg;
        _ref = [asg].concat(asg.get("expandedList"));
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expanded = _ref[_i];
          if (attributes.parent.parent() === expanded.parent().parent()) {
            return;
          }
        }
        ComplexResModel.call(this, attributes, options);
        return null;
      },
      isReparentable: function(newParent) {
        var asg, expanded, _i, _len, _ref;
        asg = this.attributes.originalAsg;
        _ref = [asg].concat(asg.get("expandedList"));
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expanded = _ref[_i];
          if (expanded !== this && newParent.parent() === expanded.parent().parent()) {
            return false;
          }
        }
        return true;
      },
      initialize: function() {
        var _ref;
        console.assert(this.get("originalAsg").get("expandedList").indexOf(this) === -1, "The expandedAsg is already in the Asg");
        this.get("originalAsg").get("expandedList").push(this);
        if ((_ref = this.getLc()) != null) {
          _ref.trigger("change:expandedList", this);
        }
        return null;
      },
      remove: function() {
        var siblings, _ref;
        siblings = this.get("originalAsg").get("expandedList");
        siblings.splice(siblings.indexOf(this), 1);
        if ((_ref = this.getLc()) != null) {
          _ref.trigger("change:expandedList", this);
        }
        return ComplexResModel.prototype.remove.call(this);
      },
      getLc: function() {
        return this.attributes.originalAsg.getLc();
      },
      serialize: function() {
        var layout;
        layout = this.generateLayout();
        layout.type = "ExpandedAsg";
        layout.originalId = this.get("originalAsg").id;
        return {
          layout: layout
        };
      }
    }, {
      handleTypes: "ExpandedAsg",
      deserialize: function(data, layout_data, resolve) {
        var originalAsg;
        originalAsg = resolve(layout_data.originalId);
        if (!originalAsg) {
          console.warn("The ExpandedAsg is removed because its ASG is not found.");
          return;
        }
        new ExpandedAsgModel({
          id: data.uid,
          originalAsg: originalAsg,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        return null;
      }
    });
    Model = ComplexResModel.extend({
      defaults: function() {
        return {
          cooldown: "300",
          capacity: "1",
          minSize: "1",
          maxSize: "2",
          healthCheckGracePeriod: "300",
          healthCheckType: "EC2",
          terminationPolicies: ["Default"],
          expandedList: [],
          policies: []
        };
      },
      type: constant.RESTYPE.ASG,
      newNameTmpl: "asg",
      isReparentable: function(newParent) {
        var expand, _i, _len, _ref;
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          if (newParent.parent() === expand.parent().parent()) {
            return sprintf(lang.CANVAS.ERR_DROP_ASG, this.get("name"), newParent.parent().get("name"));
          }
        }
        return true;
      },
      setName: function(name) {
        var expand, _i, _len, _ref;
        ComplexResModel.prototype.setName.call(this, name);
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          expand.trigger('change:name');
        }
        return null;
      },
      setLc: function(lc) {
        if (this.getLc() || !lc) {
          return;
        }
        if (_.isString(lc)) {
          lc = this.design().component(lc);
        }
        return new LcUsage(this, lc);
      },
      getLc: function() {
        return this.connectionTargets("LcUsage")[0];
      },
      getCost: function(priceMap, currency) {
        var InstanceModel, lc, lcFee, lcPrice, v, volumeList, vp, _i, _len;
        lc = this.getLc();
        if (!lc) {
          return null;
        }
        InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
        lcPrice = InstanceModel.prototype.getCost.call(lc, priceMap, currency);
        if (!lcPrice) {
          return null;
        }
        if (lcPrice.length) {
          lcPrice = lcPrice[0];
        }
        lcPrice.resource = this.get("name");
        lcFee = lcPrice.fee;
        volumeList = lc.get("volumeList");
        if (volumeList && volumeList.length) {
          for (_i = 0, _len = volumeList.length; _i < _len; _i++) {
            v = volumeList[_i];
            vp = v.getCost(priceMap, currency, true);
            if (vp) {
              lcFee += vp.fee;
            }
          }
        }
        if (lcPrice.fee !== lcFee) {
          lcPrice.resource += " (& volumes)";
          lcPrice.fee = lcFee;
        }
        lcPrice.type = parseInt(this.get("capacity") || this.get("minSize"), 10);
        lcPrice.fee *= lcPrice.type;
        lcPrice.fee = Math.round(lcPrice.fee * 100) / 100;
        lcPrice.formatedFee = lcPrice.fee + "/mo";
        return lcPrice;
      },
      getNotification: function() {
        var _ref;
        return ((_ref = this.get("notification")) != null ? _ref.toJSON() : void 0) || {};
      },
      getNotiObject: function() {
        return this.get("notification");
      },
      setNotification: function(data) {
        var n;
        n = this.get("notification");
        if (n) {
          n.set(data);
        } else {
          data.asg = this;
          n = new NotificationModel(data);
          this.set("notification", n);
        }
        return n;
      },
      setNotificationTopic: function(appId, name) {
        var _ref;
        return (_ref = this.get("notification")) != null ? _ref.setTopic(appId, name) : void 0;
      },
      getNotificationTopicName: function() {
        var _ref;
        return (_ref = this.get("notification")) != null ? _ref.getTopicName() : void 0;
      },
      addScalingPolicy: function(policy) {
        policy.__asg = this;
        this.get("policies").push(policy);
        this.listenTo(policy, "destroy", this.__removeScalingPolicy);
        return null;
      },
      __removeScalingPolicy: function(policy) {
        this.stopListening(policy);
        this.get("policies").splice(this.get("policies").indexOf(policy), 1);
        return null;
      },
      isEC2HealthCheckType: function() {
        var lc;
        lc = this.getLc();
        if (lc && lc.connections("ElbAmiAsso").length && this.get("healthCheckType") === "ELB") {
          return false;
        }
        return true;
      },
      remove: function() {
        var asg, p, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asg = _ref[_i];
          asg.remove();
        }
        _ref1 = this.get("policies");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          p.off();
          p.remove();
        }
        if ((_ref2 = this.get("notification")) != null) {
          _ref2.remove();
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      getExpandSubnets: function() {
        var expand, subnets, _i, _len, _ref;
        subnets = [this.parent()];
        _ref = this.get("expandedList");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          expand = _ref[_i];
          subnets.push(expand.parent());
        }
        return subnets;
      },
      getExpandAzs: function() {
        var az, sb, _i, _len, _ref;
        az = [];
        _ref = this.getExpandSubnets();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          az.push(sb.parent());
        }
        return _.uniq(az);
      },
      serialize: function() {
        var azs, component, elbArray, elbs, healthCheckType, lc, subnets;
        subnets = this.getExpandSubnets();
        azs = _.uniq(_.map(subnets, function(sb) {
          return sb.parent().createRef();
        }));
        subnets = _.map(subnets, function(sb) {
          return sb.createRef("SubnetId");
        });
        lc = this.getLc();
        if (lc) {
          elbs = lc.connectionTargets("ElbAmiAsso");
          if (elbs.length) {
            healthCheckType = this.get("healthCheckType");
            elbArray = _.map(elbs, function(elb) {
              return elb.createRef("LoadBalancerName");
            });
          }
        }
        component = {
          uid: this.id,
          name: this.get("name"),
          description: this.get("description") || "",
          type: this.type,
          resource: {
            AvailabilityZones: azs,
            VPCZoneIdentifier: subnets.join(" , "),
            LoadBalancerNames: elbArray || [],
            AutoScalingGroupARN: this.get("appId"),
            DefaultCooldown: this.get("cooldown"),
            MinSize: this.get("minSize"),
            MaxSize: this.get("maxSize"),
            HealthCheckType: healthCheckType || "EC2",
            HealthCheckGracePeriod: this.get("healthCheckGracePeriod"),
            TerminationPolicies: this.get("terminationPolicies"),
            AutoScalingGroupName: this.get("groupName") || this.get("name"),
            DesiredCapacity: this.get("capacity"),
            LaunchConfigurationName: (lc != null ? lc.createRef("LaunchConfigurationName") : void 0) || ""
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.ASG,
      deserialize: function(data, layout_data, resolve) {
        var ElbAsso, asg, elb, elbName, lc, _i, _len, _ref;
        asg = new Model({
          id: data.uid,
          name: data.name,
          description: data.description || "",
          appId: data.resource.AutoScalingGroupARN,
          parent: resolve(MC.extractID(layout_data.groupUId)),
          cooldown: String(data.resource.DefaultCooldown),
          capacity: String(data.resource.DesiredCapacity),
          minSize: String(data.resource.MinSize),
          maxSize: String(data.resource.MaxSize),
          healthCheckType: data.resource.HealthCheckType,
          healthCheckGracePeriod: String(data.resource.HealthCheckGracePeriod),
          terminationPolicies: data.resource.TerminationPolicies,
          groupName: data.resource.AutoScalingGroupName,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1]
        });
        if (data.resource.LaunchConfigurationName) {
          lc = resolve(MC.extractID(data.resource.LaunchConfigurationName));
          new LcUsage(asg, lc);
          ElbAsso = Design.modelClassForType("ElbAmiAsso");
          _ref = data.resource.LoadBalancerNames || [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elbName = _ref[_i];
            elb = resolve(MC.extractID(elbName));
            new ElbAsso(lc, elb);
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
