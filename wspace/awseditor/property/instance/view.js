(function() {
  define(['../base/view', './template/stack', 'i18n!/nls/lang.js', 'constant', 'kp_dropdown'], function(PropertyView, template, lang, constant, kp) {
    var InstanceView, noop;
    noop = function() {
      return null;
    };
    InstanceView = PropertyView.extend({
      events: {
        'change .instance-name': 'instanceNameChange',
        'change #property-res-desc': 'onChangeDesc',
        'change #property-instance-count': 'countChange',
        'change #property-instance-ebs-optimized': 'ebsOptimizedSelect',
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-user-data': 'userdataChange',
        'change #property-instance-ni-description': 'eniDescriptionChange',
        'change #property-instance-source-check': 'sourceCheckChange',
        'change #property-instance-public-ip': 'publicIpChange',
        'OPTION_CHANGE #instance-type-select': "instanceTypeSelect",
        'OPTION_CHANGE #tenancy-select': "tenancySelect",
        'click #property-ami': 'openAmiPanel',
        'OPTION_CHANGE #keypair-select': "setKP",
        'EDIT_UPDATE #keypair-select': "addKP",
        "EDIT_FINISHED #keypair-select": "updateKPSelect",
        'click .toggle-eip': 'setEip',
        'click #instance-ip-add': "addIp",
        'click #property-network-list .icon-remove': "removeIp",
        'keyup .input-ip': 'syncIPList',
        'click #volume-type-radios input': 'changeVolumeType',
        'keyup #iops-ranged': 'changeIops',
        'keyup #volume-size-ranged': 'sizeChanged'
      },
      changeVolumeType: function(event) {
        var $this, iops, type, volumeSize;
        $this = $(event.currentTarget);
        if ($this.is(":disabled")) {
          return;
        }
        type = $this.val();
        $("#iops-group").toggle(type === "io1");
        if (type === "io1") {
          volumeSize = parseInt($('#volume-size-ranged').val(), 10);
          iops = volumeSize * 10;
          $("#iops-ranged").val(iops).keyup();
        } else {
          this.model.setIops("");
          $("#iops-ranged").val("");
        }
        this.model.setVolumeType(type);
        return null;
      },
      changeIops: function() {
        if ($('#iops-ranged').parsley('validate')) {
          this.model.setIops($('#iops-ranged').val());
        }
        return null;
      },
      sizeChanged: function(event) {
        var $iops, iops, iopsDisabled, volumeSize;
        if (!$('#volume-size-ranged').parsley('validate')) {
          return;
        }
        volumeSize = parseInt($('#volume-size-ranged').val(), 10);
        this.model.setVolumeSize(volumeSize);
        if (volumeSize < 10) {
          this.model.setIops("");
          iopsDisabled = true;
        }
        $iops = $('#volume-type-radios').children("div").last().toggleClass("tooltip", iopsDisabled).find('input');
        if (iopsDisabled) {
          $iops.attr("disabled", "disabled");
          $("#radio-standard").click();
          $("#iops-group").hide();
        } else {
          $iops.removeAttr('disabled');
        }
        iops = parseInt($("#iops-ranged").val(), 10) || 0;
        if (iops) {
          if (iops > volumeSize * 10) {
            iops = volumeSize * 10;
            $("#iops-ranged").val(iops);
          }
          $("#iops-ranged").keyup();
        }
        return null;
      },
      render: function() {
        var instanceModel, kpDropdown, me;
        this.$el.html(template(this.model.attributes));
        instanceModel = Design.instance().component(this.model.get('uid'));
        kpDropdown = new kp({
          resModel: instanceModel
        });
        this.$('#kp-placeholder').html(kpDropdown.render().el);
        this.addSubView(kpDropdown);
        this.refreshIPList();
        me = this;
        $('#volume-size-ranged').parsley('custom', function(val) {
          val = +val;
          if (!val || val > 1024 || val < me.model.attributes.min_volume_size) {
            return sprintf(lang.PARSLEY.VOLUME_SIZE_OF_ROOTDEVICE_MUST_IN_RANGE, me.model.attributes.min_volume_size);
          }
        });
        $('#iops-ranged').parsley('custom', function(val) {
          var volume_size;
          val = +val;
          volume_size = parseInt($('#volume-size-ranged').val(), 10);
          if (val > 4000 || val < 100) {
            return lang.PARSLEY.IOPS_MUST_BETWEEN_100_4000;
          } else if (val > 10 * volume_size) {
            return lang.PARSLEY.IOPS_MUST_BE_LESS_THAN_10_TIMES_OF_VOLUME_SIZE;
          }
        });
        return this.model.attributes.name;
      },
      instanceNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "Instance")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      onChangeDesc: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
      },
      countChange: function(event) {
        var target, that, val;
        target = $(event.currentTarget);
        that = this;
        target.parsley('custom', function(val) {
          if (isNaN(val) || val > 99 || val < 1) {
            return lang.PARSLEY.THIS_VALUE_MUST_BETWEEN_1_99;
          }
        });
        if (target.parsley('validate')) {
          this.refreshIPList();
          val = +target.val();
          this.model.setCount(val);
          $(".property-instance-name-wrap").toggleClass("single", val === 1);
          $("#property-instance-name-count").text(val - 1);
          return this.setEditableIP(val === 1);
        }
      },
      setEditableIP: function(enable) {
        var $parent;
        $parent = $("#property-network-list");
        if (enable) {
          $parent.find(".input-ip-wrap").removeClass("disabled").find(".name").data("tooltip", lang.PROP.INSTANCE_IP_MSG_1).find(".input-ip").prop("disabled", "");
        } else {
          $parent.find(".input-ip-wrap").addClass("disabled").find(".name").data("tooltip", lang.PROP.INSTANCE_IP_MSG_2).find(".input-ip").attr("disabled", "disabled");
        }
        return null;
      },
      instanceTypeSelect: function(event, value) {
        var $ebs, canset, has_ebs;
        canset = this.model.canSetInstanceType(value);
        if (canset !== true) {
          notification("error", canset);
          event.preventDefault();
          return;
        }
        has_ebs = this.model.setInstanceType(value);
        $ebs = $("#property-instance-ebs-optimized");
        $ebs.closest(".property-control-group").toggle(has_ebs);
        if (!has_ebs) {
          $ebs.prop("checked", false);
        }
        return this.refreshIPList();
      },
      ebsOptimizedSelect: function(event) {
        this.model.setEbsOptimized(event.target.checked);
        return null;
      },
      tenancySelect: function(event, value) {
        var $t1, $type, show;
        $type = $("#instance-type-select");
        $t1 = $type.find("[data-id='t1.micro']");
        if ($t1.length) {
          show = value !== "dedicated";
          $t1.toggle(show);
          if ($t1.hasClass("selected") && !show) {
            $type.find(".item:not([data-id='t1.micro'])").eq(0).click();
          }
        }
        this.model.setTenancy(value);
        return null;
      },
      cloudwatchSelect: function(event) {
        this.model.setMonitoring(event.target.checked);
        return $("#property-cloudwatch-warn").toggle($("#property-instance-enable-cloudwatch").is(":checked"));
      },
      userdataChange: function(event) {
        this.model.setUserData(event.target.value);
        return null;
      },
      eniDescriptionChange: function(event) {
        this.model.setEniDescription(event.target.value);
        return null;
      },
      sourceCheckChange: function(event) {
        this.model.setSourceCheck(event.target.checked);
        return null;
      },
      publicIpChange: function(event) {
        this.model.setPublicIp(event.target.checked);
        return null;
      },
      updateKPSelect: function() {
        $("#keypair-select").find(".item:last-child").append('<span class="icon-remove"></span>');
        return null;
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $("#property-ami").attr("data-uid"));
        return null;
      },
      bindIpItemValidate: function() {
        var that;
        that = this;
        return $('.input-ip').each(function() {
          var $item;
          $item = $(this);
          return $item.parsley("custom", function(val) {
            var currentInputIP, inputValue, inputValuePrefix, ipIPFormatCorrect, prefixAry, result, validDOM;
            validDOM = $item;
            inputValue = val;
            inputValuePrefix = validDOM.siblings(".input-ip-prefix").text();
            currentInputIP = inputValuePrefix + inputValue;
            prefixAry = inputValuePrefix.split('.');
            ipIPFormatCorrect = false;
            if (prefixAry.length === 4) {
              if (inputValue === 'x') {
                ipIPFormatCorrect = true;
              } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
                ipIPFormatCorrect = true;
              }
            } else {
              if (inputValue === 'x.x') {
                ipIPFormatCorrect = true;
              } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
                ipIPFormatCorrect = true;
              }
            }
            if (!ipIPFormatCorrect) {
              return 'Invalid IP address';
            } else {
              result = that.model.isValidIp(currentInputIP);
              if (result !== true) {
                return result;
              }
            }
          });
        });
      },
      addIp: function() {
        if ($("#instance-ip-add").hasClass("disabled")) {
          return;
        }
        this.model.addIp();
        this.refreshIPList();
        return null;
      },
      removeIp: function(event) {
        var $li, index;
        $li = $(event.currentTarget).closest("li");
        index = $li.index();
        $li.remove();
        this.model.removeIp(index);
        this.updateIPAddBtnState(true);
        return null;
      },
      setEip: function(event) {
        var $target, attach, index, tooltip;
        $target = $(event.currentTarget);
        index = $target.closest("li").index();
        attach = !$target.hasClass("associated");
        if (attach) {
          tooltip = lang.PROP.INSTANCE_IP_MSG_4;
        } else {
          tooltip = lang.PROP.INSTANCE_IP_MSG_3;
        }
        $target.toggleClass("associated", attach).attr("data-tooltip", tooltip);
        this.model.attachEip(index, attach);
        return null;
      },
      syncIPList: function(event) {
        var $target, autoAssign, ip, ipItems, ipVal;
        ipItems = $('#property-network-list .input-ip-item');
        $target = $(event.currentTarget);
        if (!$target.parsley('validate')) {
          return;
        }
        ipVal = $target.val();
        ip = $target.siblings(".input-ip-prefix").text() + ipVal;
        autoAssign = ipVal === "x" || ipVal === "x.x";
        this.model.setIp($target.closest("li").index(), ip, autoAssign);
        return null;
      },
      refreshIPList: function() {
        if (!this.model.attributes.eni) {
          return;
        }
        $('#property-network-list').html(MC.template.propertyIpList(this.model.attributes.eni.ips));
        this.updateIPAddBtnState();
        this.bindIpItemValidate();
        return null;
      },
      updateIPAddBtnState: function(enabled) {
        var tooltip;
        if (enabled === void 0) {
          enabled = this.model.canAddIP();
        }
        if (enabled === true) {
          tooltip = "Add IP Address";
        } else {
          if (_.isString(enabled)) {
            tooltip = enabled;
          } else {
            tooltip = "Cannot add IP address";
          }
          enabled = false;
        }
        $("#instance-ip-add").toggleClass("disabled", !enabled).data("tooltip", tooltip);
        return null;
      },
      disableUserDataInput: function(flag) {
        var $userDataInput;
        $userDataInput = $('#property-instance-user-data');
        if (flag === true) {
          $userDataInput.attr('disabled', 'disabled');
          return $userDataInput.addClass('tooltip').attr('data-tooltip', lang.PROP.INSTANCE_USER_DATA_DISABLE);
        } else if (flag === false) {
          $userDataInput.removeAttr('disabled');
          return $userDataInput.removeClass('tooltip').removeAttr('data-tooltip');
        }
      }
    });
    return new InstanceView();
  });

}).call(this);
