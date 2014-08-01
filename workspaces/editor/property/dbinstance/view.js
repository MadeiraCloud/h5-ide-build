(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['ApiRequest', '../base/view', 'og_dropdown', './template/stack_instance', './template/stack_replica', './template/stack_component', 'i18n!/nls/lang.js', 'constant', 'CloudResources', 'rds_pg'], function(ApiRequest, PropertyView, OgDropdown, template_instance, template_replica, template_component, lang, constant, CloudResources, parameterGroup) {
    var DBInstanceView, noop;
    noop = function() {
      return null;
    };
    DBInstanceView = PropertyView.extend({
      events: {
        'change #property-dbinstance-name': 'changeInstanceName',
        'change #property-dbinstance-mutil-az-check': 'changeMutilAZ',
        'change #property-dbinstance-storage': 'changeAllocatedStorage',
        'change #property-dbinstance-iops-check': 'changeProvisionedIOPSCheck',
        'change #property-dbinstance-iops-value': 'changeProvisionedIOPS',
        'change #property-dbinstance-master-username': 'changeUserName',
        'change #property-dbinstance-master-password': 'changePassWord',
        'change #property-dbinstance-database-name': 'changeDatabaseName',
        'change #property-dbinstance-database-port': 'changeDatabasePort',
        'change #property-dbinstance-public-access-check': 'changePublicAccessCheck',
        'change #property-dbinstance-version-update': 'changeVersionUpdate',
        'change #property-dbinstance-auto-backup-check': 'changeAutoBackupCheck',
        'change #property-dbinstance-backup-period': 'changeBackupPeriod',
        'click #property-dbinstance-backup-window-select input': 'changeBackupOption',
        'change #property-dbinstance-backup-window-start-time': 'changeBackupTime',
        'OPTION_CHANGE #property-dbinstance-backup-window-duration': 'changeBackupTime',
        'click #property-dbinstance-maintenance-window-select input': 'changeMaintenanceOption',
        'OPTION_CHANGE #property-dbinstance-maintenance-window-start-day-select': 'changeMaintenanceTime',
        'OPTION_CHANGE #property-dbinstance-maintenance-window-duration': 'changeMaintenanceTime',
        'change #property-dbinstance-maintenance-window-start-time': 'changeMaintenanceTime',
        'OPTION_CHANGE #property-dbinstance-license-select': 'changeLicense',
        'OPTION_CHANGE #property-dbinstance-engine-version-select': 'changeVersion',
        'OPTION_CHANGE #property-dbinstance-class-select': 'changeClass',
        'OPTION_CHANGE #property-dbinstance-preferred-az': 'changeAZ',
        'OPTION_CHANGE #property-dbinstance-charset-select': 'changeCharset',
        'change #property-dbinstance-apply-immediately': 'changeApplyImmediately'
      },
      durationOpertions: [0.5, 1, 2, 2.5, 3],
      genDuration: function(selectedValue) {
        return _.map(this.durationOpertions, function(value) {
          return {
            value: value,
            selected: value === selectedValue
          };
        });
      },
      changeCharset: function(event, value, data) {
        return this.resModel.set('characterSetName', value);
      },
      changeApplyImmediately: function(event) {
        var value;
        value = event.target.checked;
        return this.resModel.set('applyImmediately', value);
      },
      changeLicense: function(event, value, data) {
        this.resModel.set('license', value);
        return this.renderLVIA();
      },
      changeVersion: function(event, value, data) {
        var origEngineVersion;
        origEngineVersion = this.resModel.get('engineVersion');
        this.resModel.set('engineVersion', value);
        this.resModel.setDefaultParameterGroup(origEngineVersion);
        this.resModel.setDefaultOptionGroup(origEngineVersion);
        this.renderOptionGroup();
        this.renderParameterGroup();
        return this.renderLVIA();
      },
      changeClass: function(event, value, data) {
        this.resModel.set('instanceClass', value);
        return this.renderLVIA();
      },
      _getTimeData: function(timeStr) {
        var duration, end, endHour, endMin, endTimeAry, endTimeStr, endWeekStr, err, start, startHour, startMin, startTimeAry, startTimeStr, startWeekStr, timeAry;
        try {
          timeAry = timeStr.split('-');
          startTimeStr = timeAry[0];
          endTimeStr = timeAry[1];
          startTimeAry = startTimeStr.split(':');
          endTimeAry = endTimeStr.split(':');
          if (startTimeAry.length === 3) {
            startWeekStr = startTimeAry[0];
            endWeekStr = endTimeAry[0];
            startTimeAry = startTimeAry.slice(1);
            endTimeAry = endTimeAry.slice(1);
          }
          startHour = Number(startTimeAry[0]);
          startMin = Number(startTimeAry[1]);
          endHour = Number(endTimeAry[0]);
          endMin = Number(endTimeAry[1]);
          start = new Date();
          end = new Date(start);
          start.setHours(startHour);
          start.setMinutes(startMin);
          end.setHours(endHour);
          end.setMinutes(endMin);
          duration = (end - start) / 1000 / 60 / 60;
          if (duration < 0) {
            duration = 24 + duration;
          }
          return {
            startHour: startHour,
            startMin: startMin,
            startTime: "" + startHour + ":" + startMin,
            duration: duration,
            startWeek: startWeekStr
          };
        } catch (_error) {
          err = _error;
          return {
            startHour: '00',
            startMin: '00',
            startTime: "00:00",
            duration: 0.5,
            startWeek: 'Mondey'
          };
        }
      },
      _getTimeStr: function(startTimeStr, duration, startWeek) {
        var addZero, end, endHour, endMin, endTimeStr, err, start, startHour, startMin, startTime;
        addZero = function(num) {
          var numStr;
          numStr = String(num);
          if (numStr.length === 1) {
            numStr = '0' + numStr;
          }
          return numStr;
        };
        try {
          startTime = startTimeStr.split(':');
          startHour = Number(startTime[0]);
          startMin = Number(startTime[1]);
          start = new Date();
          start.setHours(startHour);
          start.setMinutes(startMin);
          end = new Date(start.getTime() + 1000 * 60 * 60 * duration);
          endHour = end.getHours();
          endMin = end.getMinutes();
          startHour = addZero(startHour);
          startMin = addZero(startMin);
          endHour = addZero(endHour);
          endMin = addZero(endMin);
          startTimeStr = "" + startHour + ":" + startMin;
          endTimeStr = "" + endHour + ":" + endMin;
          if (startWeek) {
            startTimeStr = "" + startWeek + ":" + startTimeStr;
            endTimeStr = "" + startWeek + ":" + endTimeStr;
          }
          return "" + startTimeStr + "-" + endTimeStr;
        } catch (_error) {
          err = _error;
          return '';
        }
      },
      _setBackupTime: function() {
        var duration, startTime, timeStr;
        startTime = $('#property-dbinstance-backup-window-start-time').val();
        duration = Number($('#property-dbinstance-backup-window-duration .selection').text());
        timeStr = this._getTimeStr(startTime, duration);
        return this.resModel.set('backupWindow', timeStr);
      },
      _setMaintenanceTime: function() {
        var duration, startTime, timeStr, week;
        startTime = $('#property-dbinstance-maintenance-window-start-time').val();
        duration = Number($('#property-dbinstance-maintenance-window-duration .selection').text());
        week = $('#property-dbinstance-maintenance-window-start-day-select').find('.item.selected').data('id');
        timeStr = this._getTimeStr(startTime, duration, week);
        return this.resModel.set('maintenanceWindow', timeStr);
      },
      getModelJSON: function() {
        var attr;
        attr = this.resModel.toJSON();
        if (this.isAppEdit) {
          attr.isAppEdit = this.isAppEdit;
          _.extend(attr, this.appModel.toJSON());
          _.extend(attr, this.getOriginAttr());
        }
        return attr;
      },
      getOriginAttr: function() {
        var allocatedStorage, iops, originComp, originJson;
        originJson = Design.instance().__opsModel.getJsonData();
        originComp = originJson.component[this.resModel.id];
        if (originComp) {
          allocatedStorage = originComp.resource.AllocatedStorage;
          iops = originComp.resource.Iops;
          return {
            originAllocatedStorage: allocatedStorage,
            originIOPS: iops
          };
        } else {
          return null;
        }
      },
      render: function() {
        var $item, $select, attr, backupTime, lvi, maintenanceTime, snapshotModel, spec, template, weekStr;
        attr = this.getModelJSON();
        backupTime = this._getTimeData(attr.backupWindow);
        maintenanceTime = this._getTimeData(attr.maintenanceWindow);
        attr.backup = backupTime;
        attr.maintenance = maintenanceTime;
        attr.backupDurations = this.genDuration(backupTime.duration);
        attr.maintenanceDurations = this.genDuration(maintenanceTime.duration);
        attr.hasSlave = !!this.resModel.slaves().length;
        attr.engineType = this.resModel.engineType();
        _.extend(attr, {
          isOracle: this.resModel.isOracle(),
          isSqlserver: this.resModel.isSqlserver(),
          isPostgresql: this.resModel.isPostgresql()
        });
        if (this.resModel.master()) {
          attr.sourceDbName = this.resModel.master().get('name');
        }
        spec = this.resModel.getSpecifications();
        lvi = this.resModel.getLVIA(spec);
        attr.licenses = lvi[0];
        attr.versions = lvi[1];
        attr.classes = lvi[2];
        template = template_instance;
        if (this.resModel.master()) {
          if (this.isAppEdit) {
            attr.hideAZConfig = true;
          } else {
            template = template_replica;
          }
          attr.masterIops = this.resModel.master().get('iops');
        }
        if (attr.snapshotId) {
          template = template_instance;
          snapshotModel = this.resModel.getSnapshotModel();
          attr.snapshotSize = Number(snapshotModel.get('AllocatedStorage'));
        }
        if (this.resModel.isOracle()) {
          attr.isOracle = true;
          attr.oracleCharset = _.map(Design.modelClassForType(constant.RESTYPE.DBINSTANCE).oracleCharset, function(oc) {
            return {
              charset: oc,
              selected: oc === attr.characterSetName
            };
          });
        }
        if (this.resModel.isSqlserver()) {
          attr.iopsInfo = 'Requires a fixed ratio of 10 IOPS / GB storage';
        } else {
          attr.iopsInfo = 'Supports IOPS / GB ratios between 3 and 10';
        }
        this.$el.html(template(attr));
        this.setTitle(attr.name);
        this.renderLVIA();
        this.renderOptionGroup();
        weekStr = maintenanceTime != null ? maintenanceTime.startWeek : void 0;
        if (weekStr) {
          $select = $('#property-dbinstance-maintenance-window-start-day-select');
          $item = $select.find(".item[data-id='" + weekStr + "']").addClass('selected');
          $select.find('.selection').text($item.text());
        }
        this.resModel.get('name');
        this.pgDropdown = new parameterGroup(this.resModel).renderDropdown();
        $("#property-dbinstance-parameter-group-select").html(this.pgDropdown.el);
        this.bindParsley();
        if (this.isAppEdit) {
          this.getInstanceStatus();
        }
        return attr.name;
      },
      bindParsley: function() {
        var db, that, validateStartTime;
        that = this;
        db = this.model;
        validateStartTime = function(val) {
          if (!/^(([0-1][0-9])|(2[0-3])):[0-5][0-9]$/.test(val)) {
            return 'Format error, the right format is 00:00.';
          }
        };
        $('#property-dbinstance-backup-window-start-time').parsley('custom', validateStartTime);
        $('#property-dbinstance-maintenance-window-start-time').parsley('custom', validateStartTime);
        $('#property-dbinstance-database-name').parsley('custom', function(value) {
          switch (db.engineType()) {
            case 'mysql':
              if (val.length > 64) {
                return 'Max length is 64.';
              }
              break;
            case 'postgresql':
              if (val.length > 63) {
                return 'Max length is 63.';
              }
              if (!/[a-z_]/.test(val[0])) {
                return 'Must begin with a letter or an underscore';
              }
              break;
            case 'oracle':
              if (val.length > 8) {
                return 'Max length is 8.';
              }
          }
          return null;
        });
        $('#property-dbinstance-storage').parsley('custom', function(val) {
          var engine, originValue, source, storage;
          storage = Number(val);
          originValue = that.getOriginAttr();
          if (this.isAppEdit()) {
            if (originValue && (storage < originValue.originAllocatedStorage)) {
              return 'Allocated storage cannot be reduced.';
            }
          }
          if (that.resModel.isMysql() && !(storage >= 5 && storage <= 3072)) {
            return 'Must be an integer from 5 to 3072';
          }
          if (that.resModel.isPostgresql() && !(storage >= 5 && storage <= 3072)) {
            return 'Must be an integer from 5 to 3072';
          }
          if (that.resModel.isOracle() && !(storage >= 10 && storage <= 3072)) {
            return 'Must be an integer from 10 to 3072';
          }
          if (that.resModel.isSqlserver()) {
            engine = that.resModel.get('engine');
            if ((engine === 'sqlserver-ee' || engine === 'sqlserver-se') && !(storage >= 200 && storage <= 1024)) {
              return 'Must be an integer from 200 to 1024';
            }
            if ((engine === 'sqlserver-ex' || engine === 'sqlserver-web') && !(storage >= 30 && storage <= 1024)) {
              return 'Must be an integer from 30 to 1024';
            }
          }
          source = that.resModel.source();
          if (source && storage < +source.get('AllocatedStorage')) {
            return 'Snapshot storage need large than original value';
          }
        });
        return $('#property-dbinstance-iops-value').parsley('custom', function(val) {
          var iops, iopsRange, storage;
          storage = $('#property-dbinstance-storage').val();
          iopsRange = that._getIOPSRange(storage);
          iops = Number(val);
          if (iops < 1000) {
            return "Require 1000 IOPS";
          }
          if (!that.resModel.isSqlserver() && storage < Math.round(iops / 10)) {
            return "Require " + (Math.round(iops / 10)) + "-" + (Math.round(iops / 3)) + " GB Allocated Storage for " + iops + " IOPS";
          }
          if (iops >= iopsRange.minIOPS && iops <= iopsRange.maxIOPS) {
            return null;
          }
          if (iopsRange.minIOPS === iopsRange.maxIOPS) {
            return "Require " + iopsRange.minIOPS + " IOPS";
          }
          if (iopsRange.minIOPS < iopsRange.maxIOPS) {
            return "Require " + iopsRange.minIOPS + "-" + iopsRange.maxIOPS + " IOPS";
          }
        });
      },
      renderOptionGroup: function() {
        var $ogDropdown, attr, defaultInfo, engineCol, engineOptions, ogDropdown, ogOptions, regionName;
        regionName = Design.instance().region();
        attr = this.getModelJSON();
        attr.canCustomOG = false;
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
        engineOptions = engineCol.getOptionGroupsByEngine(regionName, attr.engine);
        if (engineOptions) {
          ogOptions = engineOptions[this.resModel.getMajorVersion()];
        }
        defaultInfo = engineCol.getDefaultByNameVersion(regionName, attr.engine, attr.engineVersion);
        if (defaultInfo && defaultInfo.canCustomOG) {
          attr.canCustomOG = defaultInfo.canCustomOG;
        } else {
          if (engineOptions && ogOptions) {
            attr.canCustomOG = true;
          }
        }
        this.$el.find('.property-dbinstance-optiongroup').html(template_component.optionGroupDropDown(attr));
        if (attr.canCustomOG) {
          $ogDropdown = this.$el.find('.property-dbinstance-optiongroup-placeholder');
          ogDropdown = new OgDropdown({
            el: $ogDropdown,
            dbInstance: this.resModel
          });
          return $ogDropdown.html(ogDropdown.render({
            engine: attr.engine,
            engineVersion: attr.engineVersion,
            majorVersion: this.resModel.getMajorVersion()
          }).el);
        } else {
          return this.$el.find('.property-dbinstance-optiongroup').hide();
        }
      },
      renderParameterGroup: function() {
        this.pgDropdown.setSelection(this.resModel.get('pgName'));
        return null;
      },
      renderLVIA: function() {
        var attr, azUsedMap, connAry, data, lvi, multiAZCapable, sgData, spec, subnetGroupModel, usedAZCount;
        spec = this.resModel.getSpecifications();
        lvi = this.resModel.getLVIA(spec);
        data = {
          licenses: lvi[0],
          versions: lvi[1],
          classes: lvi[2],
          azCapable: lvi[3]
        };
        attr = this.getModelJSON();
        _.extend(data, attr);
        $('#lvia-container').html(template_component.lvi(data));
        spec = this.resModel.getSpecifications();
        lvi = this.resModel.getLVIA(spec);
        multiAZCapable = lvi[3];
        if (!multiAZCapable) {
          this.resModel.set('multiAz', false);
        }
        sgData = {
          multiAZCapable: multiAZCapable
        };
        sgData = _.extend(sgData, attr);
        subnetGroupModel = this.resModel.parent();
        sgData.subnetGroupName = subnetGroupModel.get('name');
        connAry = subnetGroupModel.get('__connections');
        azUsedMap = {};
        _.each(connAry, function(subnetModel) {
          var azName;
          azName = subnetModel.getTarget(constant.RESTYPE.SUBNET).parent().get('name');
          azUsedMap[azName] = true;
          return null;
        });
        usedAZCount = _.size(azUsedMap);
        if (usedAZCount < 2) {
          sgData.azNotEnough = true;
        }
        $('#property-dbinstance-mutil-az').html(template_component.propertyDbinstanceMutilAZ(sgData));
        this.renderAZList();
        return this;
      },
      renderAZList: function() {
        var $item, $preferredAZSelect, attr, avaliableAZ, azData, dragAZs, lvi, optionalAzAry, region, selectedAZ, spec, _ref;
        spec = this.resModel.getSpecifications();
        lvi = this.resModel.getLVIA(spec);
        optionalAzAry = lvi[4];
        attr = this.getModelJSON();
        region = Design.instance().get('region');
        dragAZs = Design.modelClassForType(constant.RESTYPE.AZ).allObjects();
        dragAZs = _.map(dragAZs, function(azModel) {
          return azModel.get('name');
        });
        avaliableAZ = [];
        _.each(optionalAzAry, function(az) {
          avaliableAZ.push(az);
          return null;
        });
        avaliableAZ = _.intersection(avaliableAZ, dragAZs);
        azData = _.map(avaliableAZ, function(az) {
          return {
            name: az
          };
        });
        $('#property-dbinstance-preferred-az').html(template_component.preferred_az(azData));
        if (attr.az && (_ref = attr.az, __indexOf.call(avaliableAZ, _ref) >= 0)) {
          selectedAZ = attr.az;
        } else {
          selectedAZ = 'no';
        }
        $preferredAZSelect = $('#property-dbinstance-preferred-az');
        $item = $preferredAZSelect.find(".item[data-id='" + selectedAZ + "']").addClass('selected');
        return $preferredAZSelect.find('.selection').text($item.text());
      },
      changeInstanceName: function(event) {
        var target, that, value;
        that = this;
        target = $(event.currentTarget);
        if (this.checkResName(target, 'DBInstance')) {
          value = target.val();
          target.parsley('custom', function(val) {
            var errTip;
            errTip = 'DB Instance name invalid';
            if (val[val.length - 1] === '-' || (val.indexOf('--') !== -1)) {
              return errTip;
            }
            if (val.length > 10 && that.resModel.isSqlserver()) {
              return errTip;
            }
            if (val.length > 58) {
              return errTip;
            }
            if (!MC.validate('letters', val[0])) {
              return errTip;
            }
          });
          if (target.parsley('validate')) {
            this.resModel.setName(value);
            this.setTitle(value);
            this.resModel.set('instanceId', value);
          }
        }
        return null;
      },
      changeMutilAZ: function(event) {
        var $item, $select, value;
        value = event.target.checked;
        $select = $('.property-dbinstance-preferred-az');
        if (value) {
          $select.find('.item').remove('selected');
          $item = $select.find(".item[data-id='no']").addClass('selected');
          $select.find('.selection').text($item.text());
          $select.hide();
          this.resModel.set('az', '');
          this.renderAZList();
        } else {
          $select.show();
        }
        return this.resModel.set('multiAz', value);
      },
      changeAZ: function(event, name, data) {
        if (name === 'no') {
          return this.resModel.set('az', '');
        } else {
          return this.resModel.set('az', name);
        }
      },
      changeAllocatedStorage: function(event) {
        var target, that, value;
        that = this;
        target = $(event.target);
        value = Number(target.val());
        if (target.parsley('validate') && that.changeProvisionedIOPS()) {
          return that.resModel.set('allocatedStorage', value);
        }
      },
      _getIOPSRange: function(storage) {
        var maxIOPS, minIOPS;
        if (this.resModel.isSqlserver()) {
          minIOPS = maxIOPS = storage * 10;
        } else {
          minIOPS = storage * 3;
          maxIOPS = storage * 10;
        }
        return {
          minIOPS: minIOPS,
          maxIOPS: maxIOPS
        };
      },
      changeProvisionedIOPSCheck: function(event) {
        var iopsRange, storage, value;
        value = event.target.checked;
        storage = Number($('#property-dbinstance-storage').val());
        iopsRange = this._getIOPSRange(storage);
        if (value) {
          $('.property-dbinstance-iops-value-section').show();
          if (iopsRange.minIOPS >= 1000) {
            $('#property-dbinstance-iops-value').val(iopsRange.minIOPS);
            return this.resModel.setIops(iopsRange.minIOPS);
          }
        } else {
          $('.property-dbinstance-iops-value-section').hide();
          $('#property-dbinstance-iops-value').val('');
          return this.resModel.setIops('');
        }
      },
      changeProvisionedIOPS: function(event) {
        var iops, originValue, storage, target, that, value;
        that = this;
        if ($('#property-dbinstance-iops-check')[0].checked) {
          target = $('#property-dbinstance-iops-value');
          value = target.val();
          iops = Number(value);
          storage = Number($('#property-dbinstance-storage').val());
          if (target.parsley('validate')) {
            originValue = that.getOriginAttr();
            if (originValue && originValue.originIOPS && (iops !== originValue.originIOPS)) {
              $('.property-info-iops-adjust-tip').show();
            } else {
              $('.property-info-iops-adjust-tip').hide();
            }
            that.resModel.setIops(Number(iops));
            that.resModel.set('allocatedStorage', storage);
            return true;
          }
          return false;
        } else {
          return true;
        }
      },
      changeUserName: function(event) {
        var target, that, value;
        that = this;
        target = $(event.target);
        value = target.val();
        target.parsley('custom', function(val) {
          if (MC.validate('alphanum', val) && MC.validate('letters', val[0])) {
            if (that.resModel.isMysql() && val.length >= 1 && val.length <= 16) {
              return null;
            }
            if (that.resModel.isOracle() && val.length >= 1 && val.length <= 30) {
              return null;
            }
            if (that.resModel.isSqlserver() && val.length >= 1 && val.length <= 128) {
              return null;
            }
            if (that.resModel.isPostgresql() && val.length >= 2 && val.length <= 16) {
              return null;
            }
          }
          return "Invalid username";
        });
        if (target.parsley('validate')) {
          return this.resModel.set('username', value);
        }
      },
      changePassWord: function(event) {
        var target, that, value;
        that = this;
        target = $(event.target);
        value = target.val();
        target.parsley('custom', function(val) {
          if (that.resModel.isMysql() && val.length >= 8 && val.length <= 41) {
            return null;
          }
          if (that.resModel.isOracle() && val.length >= 8 && val.length <= 30) {
            return null;
          }
          if (that.resModel.isSqlserver() && val.length >= 8 && val.length <= 128) {
            return null;
          }
          if (that.resModel.isPostgresql() && val.length >= 8 && val.length <= 128) {
            return null;
          }
          return 'Invalid password';
        });
        if (target.parsley('validate')) {
          return this.resModel.set('password', value);
        }
      },
      changeDatabaseName: function(event) {
        var $target;
        $target = $(event.currentTarget);
        if (!$target.parsley('validate')) {
          return;
        }
        return this.resModel.set('dbName', $target.val());
      },
      changeDatabasePort: function(event) {
        var $target;
        $target = $(event.currentTarget);
        if (!$target.parsley('validate')) {
          return;
        }
        return this.resModel.set('port', $target.val());
      },
      changePublicAccessCheck: function(event) {
        var value;
        value = event.target.checked;
        return this.resModel.set('accessible', value);
      },
      changeVersionUpdate: function(event) {
        var value;
        value = event.target.checked;
        return this.resModel.set('autoMinorVersionUpgrade', value);
      },
      changeAutoBackupCheck: function(event) {
        var value;
        value = event.target.checked ? '1' : '0';
        return this.changeBackupPeriod(null, value);
      },
      changeBackupPeriod: function(event, value) {
        var $target;
        if (event) {
          $target = $(event.currentTarget);
          if (!$target.parsley('validate')) {
            return;
          }
          value = $target.val();
        } else if (value) {
          $("#property-dbinstance-backup-period").val(value).parsley('validate');
        } else {
          console.error("at least one value in event or value");
          return null;
        }
        if (value !== '0') {
          $("#group-dbinstance-backup-period").removeClass('hide');
          $('#property-dbinstance-auto-backup-group').removeClass('hide');
        } else {
          $("#group-dbinstance-backup-period").addClass('hide');
          $('#property-dbinstance-auto-backup-group').addClass('hide');
        }
        return this.resModel.autobackup(Number(value));
      },
      changeBackupOption: function(event) {
        var $backupGroup, selectedValue;
        $backupGroup = $('#property-dbinstance-backup-window-group');
        selectedValue = $(event.currentTarget).val();
        if (selectedValue === 'window') {
          return $backupGroup.show();
        } else {
          $backupGroup.hide();
          return this.resModel.set('backupWindow', '');
        }
      },
      changeMaintenanceOption: function(event) {
        var $maintenanceGroup, selectedValue;
        $maintenanceGroup = $('#property-dbinstance-maintenance-window-group');
        selectedValue = $(event.currentTarget).val();
        if (selectedValue === 'window') {
          return $maintenanceGroup.show();
        } else {
          $maintenanceGroup.hide();
          return this.resModel.set('maintenanceWindow', '');
        }
      },
      changeBackupTime: function(event) {
        if ($('#property-dbinstance-backup-window-start-time').parsley('validate')) {
          return this._setBackupTime();
        }
      },
      changeMaintenanceTime: function(event) {
        if ($('#property-dbinstance-maintenance-window-start-time').parsley('validate')) {
          return this._setMaintenanceTime();
        }
      },
      getInstanceStatus: function() {
        var dbId, that, _setStatus;
        _setStatus = function(showError) {
          var tip;
          $('.property-dbinstance-status-icon-warning').remove();
          that.setTitle(that.appModel.get('name'));
          if (showError === true) {
            $('.db-status-loading').remove();
            $('.property-dbinstance-not-available-info').show();
            tip = '<i class="property-dbinstance-status-icon-warning icon-warning"></i>';
          } else if (showError === false) {
            $('.db-status-loading').remove();
            tip = '';
          } else {
            tip = '<div class="db-status-loading loading-spinner loading-spinner-small"></div>';
          }
          return that.prependTitle(tip);
        };
        that = this;
        dbId = this.appModel.get('DBInstanceIdentifier');
        _setStatus();
        return ApiRequest('rds_ins_DescribeDBInstances', {
          id: dbId
        }).then(function(data) {
          var dbData, dbStatus, _ref;
          data = ((_ref = data.DescribeDBInstancesResponse.DescribeDBInstancesResult.DBInstances) != null ? _ref.DBInstance : void 0) || [];
          dbData = !_.isArray(data) ? data : data[0];
          if (dbData) {
            dbStatus = dbData.DBInstanceStatus;
            if (dbStatus !== 'available') {
              _setStatus(true);
              return;
            }
          }
          return _setStatus(false);
        }, function() {
          return _setStatus(false);
        });
      }
    });
    return new DBInstanceView();
  });

}).call(this);
