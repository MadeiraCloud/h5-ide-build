define(['../base/view', './container', './template/stack', 'i18n!/nls/lang.js', 'constant', 'UI.modalplus'], function(PropertyView, Container, Tpl, lang, constant) {
  var view;
  view = PropertyView.extend({
    events: {
      'click .open-container': 'openContainer',
      'click #mesos-add-health-check': 'addHealthCheck',
      'click .mesos-health-check-item-remove': 'removeHealthCheck',
      'change .mesos-name': 'updateAttribute',
      'change .mesos-cpus': 'updateAttribute',
      'change .mesos-mem': 'updateAttribute',
      'change .mesos-instances': 'updateAttribute',
      'change #property-res-desc': 'updateAttribute',
      'change .mesos-update-min-health-capacity': "updateAttribute",
      'change .mesos-update-max-over-capacity': "updateAttribute",
      "change .execution-command": "updateExecutionSetting",
      'change [data-name="argument"]': "updateExecutionSetting",
      "OPTION_CHANGE #property-execution-setting": "updateExecutionSetting",
      "click .selection-arguments .ipt-controls a": "updateExecutionSetting",
      "change #mesos-health-checks-list li input.input": "updateHealthCheck",
      "OPTION_CHANGE .mesos-health-check-protocol": "updateHealthCheck",
      "change .mesos-constraints input": "updateConstraints",
      "change .mesos-constraints select": "updateConstraints",
      "click .mesos-constraints .ipt-controls a": "updateConstraints",
      'change .mesos-env-key': 'updateAdvance',
      'change .mesos-env-value': 'updateAdvance',
      'change .mesos-port': 'updateAdvance',
      'change .mesos-executor': 'updateAdvance',
      'change .mesos-uri': 'updateAdvance',
      'click .mesos-envs .ipt-controls a': 'updateAdvance',
      'change #property-res-desc': 'updateDescription',
      "change .update-tooltip": "updateTooltip",
      "keyup .update-tooltip": "updateTooltip",
      "click .ipt-controls a": "removeEmptyTooltip"
    },
    initialize: function(options) {},
    openContainer: function() {
      var appData, model, _ref;
      model = this.model;
      appData = this.isAppEdit ? (_ref = this.appData[0]) != null ? typeof _ref.toJSON === "function" ? _ref.toJSON() : void 0 : void 0 : void 0;
      return this.container = new Container({
        model: model,
        appData: appData
      }).render();
    },
    render: function() {
      var data;
      data = this.model.toJSON();
      data.isCommand = data.cmd || data.args ? data.cmd : true;
      this.$el.html(Tpl(data));
      this.updateHealthCheck(true);
      return this.model.get('name');
    },
    addHealthCheck: function() {
      var $healthList, $newHealthCheck;
      $healthList = this.$el.find("#mesos-health-checks-list");
      $newHealthCheck = $healthList.find("li.template").eq(0).clone().show().removeClass("template");
      $newHealthCheck.find('.mesos-health-check-protocol .selection').text('HTTP').end().find('.mesos-health-check-path').val("").show().end().find('.mesos-health-check-port-index').val("0").show().end().find(".health-check-command").val("").hide().end().find('.mesos-health-check-grace-period').val("300").end().find('.mesos-health-check-interval').val("60").end().find('.mesos-health-check-timeout').val("20").end().find('mesos-health-check-max-fail').val("0").end().appendTo($healthList);
      return this.updateHealthCheck();
    },
    removeHealthCheck: function(evt) {
      $(evt.currentTarget).parents('li').remove();
      return this.updateHealthCheck();
    },
    updateAttribute: function(evt) {
      var $target, attr, newValue, upgradeStrategyData, _ref;
      if (evt) {
        $target = $(evt.currentTarget);
        if ($target.data('bind')) {
          if ((_ref = $target.data('bind')) === "maximumOverCapacity" || _ref === 'minimumHealthCapacity') {
            upgradeStrategyData = this.model.get("upgradeStrategy") || {};
            upgradeStrategyData[$target.data('bind')] = +$target.val();
            return this.model.set("upgradeStrategy", upgradeStrategyData);
          } else {
            attr = $target.data('bind');
            newValue = $target.val();
            if (attr === "cpus" || attr === 'mem' || attr === 'instances') {
              newValue = +newValue;
            }
            return this.model.set(attr, newValue);
          }
        }
      }
    },
    updateConstraints: function() {
      var constraints;
      constraints = [];
      this.$el.find(".mesos-constraints .multi-ipt-row").each(function(index, row) {
        var attribute, operator, value;
        attribute = $(row).find(".mesos-constraints-attribute").val();
        operator = $(row).find(".mesos-constraints-operator").val();
        value = $(row).find(".mesos-constraints-value").val();
        if (attribute !== "" || value !== "") {
          return constraints.push([attribute, operator, value]);
        }
      });
      return this.model.set("constraints", constraints);
    },
    updateProtocol: function($target) {
      var $scope, protocol;
      $scope = $target.parents('li');
      protocol = $scope.find(".mesos-health-check-protocol").find('.selection').text();
      if (!protocol) {
        return false;
      }
      if (protocol === 'HTTP') {
        $scope.find(".health-check-option").show();
        return $scope.find(".health-check-command").hide();
      } else if (protocol === 'TCP') {
        $scope.find(".health-check-option").hide();
        return $scope.find(".health-check-port-index").show();
      } else {
        $scope.find(".health-check-option").hide();
        return $scope.find(".health-check-command").show();
      }
    },
    updateHealthCheck: function(evt) {
      var $target, healthChecks, self;
      self = this;
      if (evt) {
        if (evt.currentTarget) {
          $target = $(evt.currentTarget);
          this.updateProtocol($target);
        } else {
          $("#mesos-health-checks-list li").not(".template").find(".mesos-health-check-protocol").each(function(index, protocol) {
            return self.updateProtocol($(protocol));
          });
        }
      }
      healthChecks = [];
      this.$el.find("#mesos-health-checks-list>li").not(".template").each(function(index, li) {
        var $li, command, gracePeriodSeconds, healthCheck, intervalSeconds, maxConsecutiveFailures, path, portIndex, protocol, timeoutSeconds;
        $li = $(li);
        protocol = $li.find('.mesos-health-check-protocol .selection').text().toUpperCase();
        path = $li.find('.mesos-health-check-path').val();
        portIndex = +$li.find(".mesos-health-check-port-index").val();
        gracePeriodSeconds = +$li.find(".mesos-health-check-grace-period").val();
        intervalSeconds = +$li.find(".mesos-health-check-interval").val();
        timeoutSeconds = +$li.find(".mesos-health-check-timeout").val();
        maxConsecutiveFailures = +$li.find(".mesos-health-check-max-fail").val();
        command = {
          value: $li.find(".mesos-health-check-command").val()
        };
        healthCheck = {
          protocol: protocol,
          path: path,
          portIndex: portIndex,
          gracePeriodSeconds: gracePeriodSeconds,
          intervalSeconds: intervalSeconds,
          timeoutSeconds: timeoutSeconds,
          maxConsecutiveFailures: maxConsecutiveFailures,
          command: command
        };
        if (protocol === 'HTTP') {
          delete healthCheck.command;
        }
        if (protocol === 'TCP') {
          delete healthCheck.command;
          delete healthCheck.path;
        }
        if (protocol === 'COMMAND') {
          delete healthCheck.path;
          delete healthCheck.portIndex;
        }
        return healthChecks.push(healthCheck);
      });
      return this.model.set('healthChecks', healthChecks);
    },
    updateExecutionSetting: function() {
      var $target, args, self, val;
      self = this;
      $target = $("#property-execution-setting");
      val = $target.find('.selection').text().toLowerCase();
      this.$el.find(".selection-command, .selection-arguments").hide();
      this.$el.find(".selection-" + val).show();
      if (val === 'command') {
        self.model.set('cmd', $('.execution-command').val());
        return self.model.set('args', []);
      } else {
        args = [];
        this.$el.find(".selection-arguments .multi-ipt-row").not(".template").find('input').each(function(index, input) {
          if (input.value) {
            return args.push(input.value);
          }
        });
        self.model.set('args', args);
        return self.model.set('cmd', '');
      }
    },
    updateAdvance: function() {
      var env, executor, ports, uris;
      env = {};
      this.$el.find(".mesos-envs .multi-ipt-row").each(function(index, row) {
        var key, value;
        key = $(row).find(".mesos-env-key").val();
        value = $(row).find(".mesos-env-value").val();
        if (key && value) {
          return env[key] = value;
        }
      });
      ports = [];
      this.$el.find(".mesos-port").each(function(index, port) {
        if (port.value) {
          return ports.push(+port.value);
        }
      });
      executor = this.$el.find(".mesos-executor").val();
      uris = [];
      this.$el.find(".mesos-uri").each(function(index, uri) {
        if (uri.value) {
          return uris.push(uri.value);
        }
      });
      this.model.set({
        env: env
      });
      this.model.set({
        ports: ports
      });
      this.model.set({
        executor: executor
      });
      return this.model.set({
        uris: uris
      });
    },
    updateDescription: function() {
      var description;
      description = this.$el.find("#property-res-desc").val();
      return this.model.setDescription(description);
    },
    updateTooltip: function(evt) {
      var $target;
      $target = $(evt.currentTarget);
      return $target.attr("data-tooltip", $target.val());
    },
    removeEmptyTooltip: function() {
      var $targets;
      $targets = $("input.update-tooltip");
      return $targets.each(function(index, target) {
        return $(target).attr("data-tooltip", $(target).val());
      });
    }
  });
  return new view();
});
