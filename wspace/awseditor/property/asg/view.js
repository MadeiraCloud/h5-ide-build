(function() {
  define(['../base/view', './template/stack', './template/policy', './template/term', 'i18n!/nls/lang.js', 'sns_dropdown', 'UI.modalplus'], function(PropertyView, template, policy_template, term_template, lang, snsDropdown, modalPlus) {
    var InstanceView, adjustMap, adjustTooltip, adjustdefault, metricMap, unitMap;
    metricMap = {
      "CPUUtilization": lang.PROP.ASG_POLICY_CPU,
      "DiskReadBytes": lang.PROP.ASG_POLICY_DISC_READS,
      "DiskReadOps": lang.PROP.ASG_POLICY_DISK_READ_OPERATIONS,
      "DiskWriteBytes": lang.PROP.ASG_POLICY_DISK_WRITES,
      "DiskWriteOps": lang.PROP.ASG_POLICY_DISK_WRITE_OPERATIONS,
      "NetworkIn": lang.PROP.ASG_POLICY_NETWORK_IN,
      "NetworkOut": lang.PROP.ASG_POLICY_NETWORK_OUT,
      "StatusCheckFailed": lang.PROP.ASG_POLICY_STATUS_CHECK_FAILED_ANY,
      "StatusCheckFailed_Instance": lang.PROP.ASG_POLICY_STATUS_CHECK_FAILED_INSTANCE,
      "StatusCheckFailed_System": lang.PROP.ASG_POLICY_STATUS_CHECK_FAILED_SYSTEM
    };
    adjustMap = {
      "ChangeInCapacity": lang.PROP.ASG_ADD_POLICY_ADJUSTMENT_CHANGE,
      "ExactCapacity": lang.PROP.ASG_ADD_POLICY_ADJUSTMENT_EXACT,
      "PercentChangeInCapacity": lang.PROP.ASG_ADD_POLICY_ADJUSTMENT_PERCENT
    };
    adjustdefault = {
      "ChangeInCapacity": lang.PROP.EG_MINUS_1,
      "ExactCapacity": lang.PROP.EG_5,
      "PercentChangeInCapacity": lang.PROP.EG_MINUS_30
    };
    adjustTooltip = {
      "ChangeInCapacity": lang.PROP.ASG_ADJUST_TOOLTIP_CHANGE,
      "ExactCapacity": lang.PROP.ASG_ADJUST_TOOLTIP_EXACT,
      "PercentChangeInCapacity": lang.PROP.ASG_ADJUST_TOOLTIP_PERCENT
    };
    unitMap = {
      CPUUtilization: "%",
      DiskReadBytes: "B",
      DiskWriteBytes: "B",
      NetworkIn: "B",
      NetworkOut: "B"
    };
    InstanceView = PropertyView.extend({
      events: {
        "click #property-asg-term-edit": "showTermPolicy",
        "click #property-asg-sns input[type=checkbox]": "setNotification",
        "change #property-asg-elb": "setHealthyCheckELBType",
        "change #property-asg-ec2": "setHealthyCheckEC2Type",
        "change #property-asg-name": "setASGName",
        "change #property-asg-min": "setSizeGroup",
        "change #property-asg-max": "setSizeGroup",
        "change #property-asg-capacity": "setSizeGroup",
        "change #property-asg-cooldown": "setASGCoolDown",
        "change #property-asg-healthcheck": "setHealthCheckGrace",
        "click #property-asg-policy-add": "addScalingPolicy",
        "click #property-asg-policies .icon-edit": "editScalingPolicy",
        "click #property-asg-policies .icon-del": "delScalingPolicy",
        'change #property-res-desc': 'onChangeDescription'
      },
      render: function() {
        var data, p, _i, _len, _ref;
        this.createSnsNotiDropdown(this.model.getNotificationTopicName());
        data = this.model.toJSON();
        _ref = data.policies;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          p.unit = unitMap[p.alarmData.metricName];
          p.alarmData.metricName = metricMap[p.alarmData.metricName];
          p.adjustmentType = adjustMap[p.adjustmentType];
        }
        data.term_policy_brief = this.getTerminationPoliciesText(data.terminationPolicies);
        data.can_add_policy = data.policies.length < 25;
        this.$el.html(template(data));
        this.processNotiTopic(null, true);
        return data.name;
      },
      getTerminationPoliciesText: function(policies) {
        return _.map(policies, function(p) {
          return p;
        }).join(" > ");
      },
      createSnsNotiDropdown: function(selection) {
        var params;
        params = selection ? {
          selection: selection
        } : {};
        this.snsNotiDropdown = new snsDropdown(params);
        this.snsNotiDropdown.on('change', this.model.setNotificationTopic, this.model);
        this.addSubView(this.snsNotiDropdown);
        return this.snsNotiDropdown;
      },
      onChangeDescription: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      wheatherHasNoti: function() {
        var n, _ref;
        n = (_ref = this.model.notiObject) != null ? _ref.toJSON() : void 0;
        return n && (n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test);
      },
      processNotiTopic: function(originHasNoti, render) {
        var hasNoti;
        hasNoti = this.wheatherHasNoti();
        if (render && hasNoti) {
          this.$('#sns-placeholder').html(this.snsNotiDropdown.render().el);
          return this.$('.sns-group').show();
        } else if (!originHasNoti && hasNoti) {
          this.$('#sns-placeholder').html(this.snsNotiDropdown.render(true).el);
          return this.$('.sns-group').show();
        } else if (originHasNoti && !hasNoti) {
          this.createSnsNotiDropdown();
          this.model.removeTopic();
          return this.$('.sns-group').hide();
        }
      },
      processPolicyTopic: function(display, policyObject, needInit) {
        var dropdown, selection;
        selection = policyObject ? policyObject.getTopicName() : null;
        dropdown = new snsDropdown({
          selection: selection
        });
        this.addSubView(dropdown);
        if (display) {
          $('.policy-sns-placeholder').html(dropdown.render(needInit).el);
          return $('.sns-policy-field').show();
        } else {
          dropdown = new snsDropdown();
          return $('.sns-policy-field').hide();
        }
      },
      setASGCoolDown: function(event) {
        var $target;
        $target = $(event.target);
        $target.parsley('custom', function(val) {
          if (_.isNumber(+val) && +val > 86400) {
            return lang.PARSLEY.MAX_VALUE_86400;
          }
          return null;
        });
        if ($target.parsley('validate')) {
          return this.model.setASGCoolDown($target.val());
        }
      },
      setASGName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "ASG")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      setSizeGroup: function(event) {
        var $capacity, $max, $min, that;
        that = this;
        $min = this.$el.find('#property-asg-min');
        $max = this.$el.find('#property-asg-max');
        $capacity = this.$el.find('#property-asg-capacity');
        $min.parsley('custom', function(val) {
          if (+val > +$max.val()) {
            return lang.PARSLEY.MINIMUM_SIZE_MUST_BE_LESSTHAN_MAXIMUM_SIZE;
          }
          return that.constantCheck(val);
        });
        $max.parsley('custom', function(val) {
          if (+val < +$min.val()) {
            return lang.PARSLEY.MAXIMUM_SIZE_MUST_BE_MORETHAN_MINIMUM_SIZE;
          }
          return that.constantCheck(val);
        });
        $capacity.parsley('custom', function(val) {
          if (+val < +$min.val() || +val > +$max.val()) {
            return lang.PARSLEY.DESIRED_CAPACITY_IN_ALLOW_SCOPE;
          }
          return that.constantCheck(val);
        });
        if ($(event.currentTarget).parsley('validateForm')) {
          this.model.setASGMin($min.val());
          this.model.setASGMax($max.val());
          return this.model.setASGDesireCapacity($capacity.val());
        }
      },
      constantCheck: function(val) {
        val = +val;
        if (val > 65534) {
          return sprintf(lang.PARSLEY.VALUE_MUST_BE_LESSTHAN_VAR, 65534);
        }
        return null;
      },
      setHealthCheckGrace: function(event) {
        var $target;
        $target = $(event.currentTarget);
        $target.parsley('custom', function(val) {
          val = +val;
          if (val < 0 || val > 86400) {
            return sprintf(lang.PARSLEY.VALUE_MUST_IN_ALLOW_SCOPE, 0, 86400);
          }
        });
        if ($target.parsley('validate')) {
          return this.model.setHealthCheckGrace($target.val());
        }
      },
      showTermPolicy: function() {
        var checked, data, modal, p, policy, self, _i, _j, _len, _len1, _ref, _ref1;
        data = [];
        checked = {};
        _ref = this.model.get("terminationPolicies");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          policy = _ref[_i];
          if (policy === "Default") {
            data.useDefault = true;
          } else {
            data.push({
              name: policy,
              checked: true,
              text: policy
            });
            checked[policy] = true;
          }
        }
        _ref1 = ['OldestInstance', 'NewestInstance', 'OldestLaunchConfiguration', 'ClosestToNextInstanceHour'];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          if (!checked[p]) {
            data.push({
              name: p,
              checked: false,
              text: p
            });
          }
        }
        modal = new modalPlus({
          title: lang.PROP.ASG_TERMINATION_EDIT,
          width: 420,
          template: term_template(data),
          confirm: {
            text: lang.PROP.LBL_DONE
          }
        });
        self = this;
        modal.on("confirm", function() {
          self.onEditTermPolicy();
          return modal.close();
        });
        $("#property-asg-term").on("click", "input", function() {
          var $checked, $this;
          $checked = $("#property-asg-term").find("input:checked");
          if ($checked.length === 0) {
            return false;
          }
          $this = $(this);
          checked = $this.is(":checked");
          return $this.closest("li").toggleClass("enabled", checked);
        });
        $("#property-asg-term").on("mousedown", ".drag-handle", function() {
          return $(this).trigger("mouseleave");
        });
        return $("#property-term-list").sortable({
          handle: '.drag-handle'
        });
      },
      onEditTermPolicy: function() {
        var data;
        data = [];
        $("#property-term-list .list-name").each(function() {
          var $this;
          $this = $(this);
          if ($this.closest("li").hasClass("enabled")) {
            data.push($this.data('name'));
          }
          return null;
        });
        if ($("#property-asg-term-def").is(":checked")) {
          data.push("Default");
        }
        $(".termination-policy-brief").text(this.getTerminationPoliciesText(data));
        return this.model.setTerminatePolicy(data);
      },
      delScalingPolicy: function(event) {
        var $li, uid;
        $li = $(event.currentTarget).closest("li");
        uid = $li.data("uid");
        $li.remove();
        $("#property-asg-policy-add").removeClass("tooltip disabled");
        return this.model.delPolicy(uid);
      },
      updateScalingPolicy: function(data) {
        var $li, $policies, adjusttype, metric, unit;
        metric = metricMap[data.alarmData.metricName];
        adjusttype = adjustMap[data.adjustmentType];
        unit = unitMap[data.alarmData.metricName] || "";
        if (!data.uid) {
          console.error("Cannot find scaling policy uid");
          return;
        }
        $policies = $("#property-asg-policies");
        $li = $policies.children("[data-uid='" + data.uid + "']");
        if ($li.length === 0) {
          $li = $policies.children(".hide").clone().attr("data-uid", data.uid).removeClass("hide").appendTo($policies);
          $("#property-asg-policy-add").toggleClass("tooltip disabled", $("#property-asg-policies").children().length >= 26);
        }
        $li.find(".name").html(data.name);
        $li.find(".asg-p-metric").html(metric);
        $li.find(".asg-p-eval").html(data.alarmData.comparisonOperator + " " + data.alarmData.threshold + unit);
        $li.find(".asg-p-periods").html(data.alarmData.evaluationPeriods + "x" + Math.round(data.alarmData.period / 60) + "m");
        $li.find(".asg-p-trigger").html(data.state).attr("class", "asg-p-trigger asg-p-tag asg-p-trigger-" + data.state);
        return $li.find(".asg-p-adjust").html(data.adjustment + " " + data.adjustmentType);
      },
      editScalingPolicy: function(event) {
        var $item, $selectbox, $selected, data, item, key, selectMap, uid, value, _i, _len, _ref;
        uid = $(event.currentTarget).closest("li").data("uid");
        data = this.model.getPolicy(uid);
        data.uid = uid;
        data.title = lang.PROP.ASG_ADD_POLICY_TITLE_EDIT;
        this.showScalingPolicy(data);
        selectMap = {
          metric: data.alarmData.metricName,
          "eval": data.alarmData.comparisonOperator,
          trigger: data.state,
          "adjust-type": data.adjustmentType,
          statistics: data.alarmData.statistic
        };
        for (key in selectMap) {
          value = selectMap[key];
          $selectbox = $("#asg-policy-" + key);
          $selected = null;
          _ref = $selectbox.find(".item");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            $item = $(item);
            if ($item.data("id") === value) {
              $selected = $item;
              break;
            }
          }
          if ($selected) {
            $selectbox.find(".selected").removeClass("selected");
            $selectbox.find(".selection").html($selected.addClass("selected").html());
          }
        }
        return $(".pecentcapcity").toggle($("#asg-policy-adjust-type").find(".selected").data("id") === "PercentChangeInCapacity");
      },
      addScalingPolicy: function(event) {
        if ($(event.currentTarget).hasClass("disabled")) {
          return false;
        }
        this.showScalingPolicy();
        return false;
      },
      openPolicyModal: function(data) {
        var modal, options, that;
        options = {
          template: policy_template(data),
          title: lang.PROP.ASG_ADD_POLICY_TITLE_ADD + ' ' + lang.PROP.ASG_ADD_POLICY_TITLE_CONTENT,
          width: '480px',
          compact: true,
          confirm: {
            text: lang.PROP.LBL_DONE
          }
        };
        modal = new modalPlus(options);
        that = this;
        return modal.on('confirm', function() {
          var result;
          result = $("#asg-termination-policy").parsley("validate");
          if (result === false) {
            return false;
          }
          that.onPolicyDone();
          return modal.close();
        }, this);
      },
      showScalingPolicy: function(data) {
        var policyObject, self;
        if (!data) {
          data = {
            title: lang.PROP.ASG_ADD_POLICY_TITLE_ADD,
            name: this.model.defaultScalingPolicyName(),
            minAdjustStep: 1,
            alarmData: {
              evaluationPeriods: 2,
              period: 5
            }
          };
        }
        if (data.uid) {
          policyObject = Design.instance().component(data.uid);
        }
        if (data.alarmData && data.alarmData.metricName) {
          data.unit = unitMap[data.alarmData.metricName];
        } else {
          data.unit = '%';
        }
        this.openPolicyModal(data);
        self = this;
        $("#asg-policy-name").parsley('custom', function(name) {
          var uid;
          uid = $("#property-asg-policy").data("uid");
          if (self.model.isDupPolicyName(uid, name)) {
            return lang.PARSLEY.DUPLICATED_POLICY_NAME;
          }
        });
        $("#asg-policy-periods").on("change", function() {
          var val;
          val = parseInt($(this).val(), 10);
          if (!val || val < 1) {
            $(this).val("1");
          }
          if (val > 86400) {
            return $(this).val(86400);
          }
        });
        $("#asg-policy-second").on("change", function() {
          var val;
          val = parseInt($(this).val(), 10);
          if (!val || val < 1) {
            $(this).val("1");
          }
          if (val > 1440) {
            return $(this).val(1440);
          }
        });
        $("#asg-policy-adjust-type").on("OPTION_CHANGE", function() {
          var type;
          type = $(this).find(".selected").data("id");
          if (type === 'PercentChangeInCapacity') {
            $(".pecentcapcity").toggle(true);
            if ($('#asg-policy-step').val() === '') {
              $('#asg-policy-step').val(1);
            }
          } else {
            $(".pecentcapcity").toggle(false);
          }
          return $("#asg-policy-adjust").attr("placeholder", adjustdefault[type]).data("tooltip", adjustTooltip[type]).trigger("change");
        });
        $("#asg-policy-adjust").on("change", function() {
          var type, val;
          type = $("#asg-policy-adjust-type").find(".selected").data("id");
          val = parseInt($(this).val(), 10);
          if (type === "ExactCapacity") {
            if (!val || val < 1) {
              $(this).val("1");
            }
          } else if (type === "PercentChangeInCapacity") {
            if (!val) {
              $(this).val("0");
            } else if (val < -100) {
              $(this).val("-100");
            }
          }
          if (val < -65534) {
            $(this).val(-65534);
          } else if (val > 65534) {
            $(this).val(65534);
          }
          return $("#").data("tooltip", adjustTooltip[type]).trigger("change");
        });
        $("#asg-policy-cooldown").on("change", function() {
          var $this, val;
          $this = $("#asg-policy-cooldown");
          val = parseInt($this.val(), 10);
          if (isNaN(val)) {
            return;
          }
          if (val < 0) {
            val = 0;
          } else if (val > 86400) {
            val = 86400;
          }
          return $this.val(val);
        });
        $("#asg-policy-step").on("change", function() {
          var $this, val;
          $this = $("#asg-policy-step");
          val = parseInt($this.val(), 10);
          if (isNaN(val)) {
            return;
          }
          if (val < 0) {
            val = 0;
          } else if (val > 65534) {
            val = 65534;
          }
          return $this.val(val);
        });
        $("#asg-policy-threshold").on("change", function() {
          var metric, val;
          metric = $("#asg-policy-metric .selected").data("id");
          val = parseInt($(this).val(), 10);
          if (metric === "CPUUtilization") {
            if (isNaN(val) || val < 1) {
              return $(this).val("1");
            } else if (val > 100) {
              return $(this).val("100");
            }
          }
        });
        this.processPolicyTopic($('#asg-policy-notify').prop('checked'), policyObject, false);
        $("#asg-policy-notify").off("click").on("click", function(evt) {
          evt.stopPropagation();
          self.processPolicyTopic(evt.target.checked, policyObject, true);
          return null;
        });
        $("#asg-policy-metric").on("OPTION_CHANGE", function() {
          $("#asg-policy-unit").html(unitMap[$(this).find(".selected").data("id")] || "");
          return $('#asg-policy-threshold').val('');
        });
        return null;
      },
      onPolicyDone: function() {
        var data, selectedTopicData;
        data = {
          uid: $("#property-asg-policy").data("uid"),
          name: $("#asg-policy-name").val(),
          cooldown: $("#asg-policy-cooldown").val(),
          minAdjustStep: "",
          adjustment: $("#asg-policy-adjust").val(),
          adjustmentType: $("#asg-policy-adjust-type .selected").data("id"),
          state: $("#asg-policy-trigger .selected").data("id"),
          sendNotification: $("#asg-policy-notify").is(":checked"),
          alarmData: {
            metricName: $("#asg-policy-metric .selected").data("id"),
            comparisonOperator: $("#asg-policy-eval .selected").data("id"),
            period: $("#asg-policy-second").val() * 60,
            evaluationPeriods: $("#asg-policy-periods").val(),
            statistic: $("#asg-policy-statistics .selected").data("id"),
            threshold: $("#asg-policy-threshold").val()
          }
        };
        if (data.adjustmentType === 'PercentChangeInCapacity') {
          data.minAdjustStep = $("#asg-policy-step").val();
        }
        if (data.sendNotification) {
          selectedTopicData = $('.policy-sns-placeholder .selected').data();
          if (selectedTopicData && selectedTopicData.id && selectedTopicData.name) {
            data.topic = {
              appId: selectedTopicData.id,
              name: selectedTopicData.name
            };
          }
        }
        this.model.setPolicy(data);
        this.updateScalingPolicy(data);
        return null;
      },
      setNotification: function() {
        var checkMap, hasChecked, originHasNoti;
        checkMap = {};
        hasChecked = false;
        $("#property-asg-sns input[type = checkbox]").each(function() {
          var checked;
          checked = $(this).is(":checked");
          checkMap[$(this).attr("data-key")] = checked;
          if (checked) {
            hasChecked = true;
          }
          return null;
        });
        if (hasChecked) {
          $("#property-asg-sns-info").show();
        } else {
          $("#property-asg-sns-info").hide();
        }
        originHasNoti = this.wheatherHasNoti();
        this.model.setNotification(checkMap);
        return this.processNotiTopic(originHasNoti);
      },
      setHealthyCheckELBType: function(event) {
        this.model.setHealthCheckType('ELB');
        return $("#property-asg-elb-warn").toggle($("#property-asg-elb").is(":checked"));
      },
      setHealthyCheckEC2Type: function(event) {
        this.model.setHealthCheckType('EC2');
        return $("#property-asg-elb-warn").toggle($("#property-asg-elb").is(":checked"));
      }
    });
    return new InstanceView();
  });

}).call(this);
