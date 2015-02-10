(function() {
  define(['../base/view', './template/stack', 'event', 'constant', 'i18n!/nls/lang.js', 'kp_dropdown'], function(PropertyView, template, ide_event, constant, lang, kp) {
    var LanchConfigView;
    LanchConfigView = PropertyView.extend({
      events: {
        'change .launch-configuration-name': 'lcNameChange',
        'change #property-res-desc': 'onChangeDescription',
        'change .instance-type-select': 'instanceTypeSelect',
        'change #property-instance-ebs-optimized': 'ebsOptimizedSelect',
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-user-data': 'userdataChange',
        'change #property-instance-public-ip': 'publicIpChange',
        'OPTION_CHANGE #instance-type-select': "instanceTypeSelect",
        'OPTION_CHANGE #keypair-select': "setKP",
        'EDIT_UPDATE #keypair-select': "addKP",
        "EDIT_FINISHED #keypair-select": "updateKPSelect",
        'click #property-ami': 'openAmiPanel',
        'click #volume-type-radios input': 'changeVolumeType',
        'keyup #iops-ranged': 'changeIops',
        'keyup #volume-size-ranged': 'sizeChanged'
      },
      onChangeDescription: function(event) {
        return this.model.setDesc($(event.currentTarget).val());
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
        this.addSubView(kpDropdown);
        this.$('#kp-placeholder').html(kpDropdown.render().el);
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
      publicIpChange: function(event) {
        this.model.setPublicIp(event.currentTarget.checked);
        return null;
      },
      lcNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (MC.aws.aws.checkResName(this.model.get('uid'), target, "LaunchConfiguration")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      instanceTypeSelect: function(event, value) {
        var $ebs, has_ebs;
        has_ebs = this.model.setInstanceType(value);
        $ebs = $("#property-instance-ebs-optimized");
        $ebs.closest(".property-control-group").toggle(has_ebs);
        if (!has_ebs) {
          return $ebs.prop("checked", false);
        }
      },
      ebsOptimizedSelect: function(event) {
        this.model.setEbsOptimized(event.target.checked);
        return null;
      },
      cloudwatchSelect: function(event) {
        this.model.setCloudWatch(event.target.checked);
        return $("#property-cloudwatch-warn").toggle($("#property-instance-enable-cloudwatch").is(":checked"));
      },
      userdataChange: function(event) {
        return this.model.setUserData(event.target.value);
      },
      setKP: function(event, id) {
        return this.model.setKP(id);
      },
      addKP: function(event, id) {
        var result;
        result = this.model.addKP(id);
        if (!result) {
          notification("error", lang.NOTIFY.WARN_KEYPAIR_NAME_ALREADY_EXISTS);
          return result;
        }
      },
      updateKPSelect: function() {
        return $("#keypair-select").find(".item:last-child").append('<span class="icon-remove"></span>');
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $("#property-ami").attr("data-uid"));
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
    return new LanchConfigView();
  });

}).call(this);
