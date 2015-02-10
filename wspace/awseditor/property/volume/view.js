(function() {
  define(['../base/view', './template/stack', 'event', 'i18n!/nls/lang.js'], function(PropertyView, template, ide_event, lang) {
    var VolumeView;
    VolumeView = PropertyView.extend({
      events: {
        'click #volume-type-radios input': 'volumeTypeChecked',
        'change #volume-device': 'deviceNameChanged',
        'keyup #volume-size-ranged': 'sizeChanged',
        'keyup  #volume-size-ranged': 'processIops',
        'keyup #iops-ranged': 'sizeChanged',
        'click #snapshot-info-group': 'showSnapshotDetail',
        'change #volume-property-encrypted-check': 'encryptedCheck'
      },
      render: function() {
        this.$el.html(template(_.extend({
          isAppEdit: this.model.isAppEdit
        }, this.model.toJSON())));
        $('#volume-size-ranged').parsley('custom', function(val) {
          val = +val;
          if (!val || val > 1024 || val < 1) {
            return lang.PARSLEY.VOLUME_SIZE_MUST_IN_1_1024;
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
        return this.model.attributes.volume_detail.name;
      },
      volumeTypeChecked: function(event) {
        var iops, type;
        this.processIops();
        type = $('#volume-type-radios input:checked').val();
        iops = type === 'io1' ? $('#iops-ranged').val() : '';
        if (type !== 'io1') {
          $('#iops-group').hide();
        } else {
          $('#iops-group').show();
        }
        this.model.setVolumeType(type, iops);
        return this.sizeChanged();
      },
      deviceNameChanged: function(event) {
        var devicePrefix, name, self, target, type;
        target = $(event.currentTarget);
        name = target.val();
        devicePrefix = target.prev('label').text();
        type = devicePrefix === '/dev/' ? 'linux' : 'windows';
        self = this;
        target.parsley('custom', function(val) {
          if (!MC.validate.deviceName(val, type, true)) {
            if (type === 'linux') {
              return lang.PARSLEY.DEVICENAME_LINUX;
            } else {
              return lang.PARSLEY.DEVICENAME_WINDOWS;
            }
          }
          if (self.model.isDuplicate(val)) {
            return sprintf(lang.PARSLEY.VOLUME_NAME_INUSE, val);
          }
        });
        if (target.parsley('validate')) {
          this.model.setDeviceName(name);
          return this.setTitle(this.model.attributes.volume_detail.name);
        }
      },
      processIops: function(event) {
        var opsCheck, size;
        size = parseInt($('#volume-size-ranged').val(), 10);
        opsCheck = $('#radio-io1').is(':checked');
        if (size >= 10) {
          this.enableIops();
        } else if (!opsCheck) {
          this.disableIops();
        }
        return null;
      },
      enableIops: function() {
        return $('#volume-type-radios > div').last().data('tooltip', '').find('input').removeAttr('disabled');
      },
      disableIops: function() {
        return $('#volume-type-radios > div').last().data('tooltip', lang.PROP.VOLUME_DISABLE_IOPS_TOOLTIP).find('input').attr('disabled', '');
      },
      sizeChanged: function(event) {
        var iopsEnabled, iopsValidate, volumeSize, volumeValidate;
        volumeSize = parseInt($('#volume-size-ranged').val(), 10);
        iopsValidate = true;
        volumeValidate = $('#volume-size-ranged').parsley('validate');
        iopsEnabled = $('#radio-io1').is(':checked');
        if (iopsEnabled) {
          iopsValidate = $('#iops-ranged').parsley('validate');
        }
        if (volumeValidate && iopsValidate) {
          this.model.setVolumeSize(volumeSize);
          if (iopsEnabled) {
            this.model.setVolumeType('io1', $('#iops-ranged').val());
          }
        }
        return null;
      },
      showSnapshotDetail: function(event) {
        this.trigger("OPEN_SNAPSHOT", $("#snapshot-info-group").data("uid"));
        return null;
      },
      encryptedCheck: function(event) {
        this.model.setEncrypted(event.target.checked);
        return null;
      }
    });
    return new VolumeView();
  });

}).call(this);
