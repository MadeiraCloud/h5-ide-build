(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['ApiRequest', 'ResDiff', '../base/view', 'og_dropdown', './template/stack_instance', './template/stack_replica', './template/stack_component', 'i18n!/nls/lang.js', 'constant', 'CloudResources', 'rds_pg', 'UI.modalplus', 'jqtimepicker', 'jqdatetimepicker'], function(ApiRequest, ResDiff, PropertyView, OgDropdown, template_instance, template_replica, template_component, lang, constant, CloudResources, parameterGroup, Modal) {
    var DBInstanceView, noop;
    noop = function() {
      return null;
    };
    DBInstanceView = PropertyView.extend({
      events: {
        'change #property-dbinstance-name': 'changeInstanceName',
        'change #property-res-desc': 'onChangeDesc',
        'change #property-dbinstance-mutil-az-check': 'changeMutilAZ',
        'change #property-dbinstance-storage': 'changeAllocatedStorage',
        'keyup #property-dbinstance-storage': 'inputAllocatedStorage',
        'OPTION_CHANGE #property-dbinstance-storage-type': 'changeStorageType',
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
        'OPTION_CHANGE #property-dbinstance-engine-select': 'changeEngine',
        'OPTION_CHANGE #property-dbinstance-license-select': 'changeLicense',
        'OPTION_CHANGE #property-dbinstance-engine-version-select': 'changeVersion',
        'OPTION_CHANGE #property-dbinstance-class-select': 'changeClass',
        'OPTION_CHANGE #property-dbinstance-preferred-az': 'changeAZ',
        'OPTION_CHANGE #property-dbinstance-charset-select': 'changeCharset',
        'OPTION_CHANGE': 'checkChange',
        'change *': 'checkChange',
        'click #property-dbinstance-promote-replica': 'promoteReplica',
        'click .property-btn-db-restore-config': 'openRestoreConfigModal'
      },
      promoteReplica: function() {
        var modal, that;
        that = this;
        if (this.isPromoted()) {
          this.unsetPromote();
          return App.workspaces.getAwakeSpace().view.propertyPanel.refresh();
        } else {
          return modal = new Modal({
            title: lang.IDE.TITLE_CONFIRM_PROMOTE_READ_REPLICA,
            template: template_component.modalPromoteConfirm({}),
            confirm: {
              text: lang.PROP.DB_CONFIRM_PROMOTE
            },
            disableClose: true,
            onConfirm: function() {
              that.setPromote();
              App.workspaces.getAwakeSpace().view.propertyPanel.refresh();
              return modal.close();
            }
          });
        }
      },
      openRestoreConfigModal: function(defaultRes) {
        var currentTime, customDay, customDayStr, customMonth, customMonthStr, customYear, customYearStr, dateLang, dbRestoreTime, lastestDay, lastestMonth, lastestRestoreTime, lastestYear, modal, noRestore, penddingObj, sourceDbAppModel, sourceDbModel, that, timezone, _getCurrentSelectedTime, _setDefaultSelectedTime;
        if (!(defaultRes && defaultRes.type === constant.RESTYPE.DBINSTANCE)) {
          defaultRes = this.resModel;
        }
        that = this;
        sourceDbModel = defaultRes.getSourceDBForRestore();
        sourceDbAppModel = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(sourceDbModel.get('appId'));
        if (sourceDbAppModel) {
          penddingObj = sourceDbAppModel.get('PendingModifiedValues');
          noRestore = (!sourceDbAppModel.get('LatestRestorableTime')) || (sourceDbAppModel.get('BackupRetentionPeriod') === 0) || (penddingObj && penddingObj.BackupRetentionPeriod === 0);
          if ((new Date(sourceDbAppModel.get('LatestRestorableTime'))) === 'Invalid Date') {
            noRestore = true;
          }
        } else {
          noRestore = true;
        }
        if (noRestore) {
          modal = new Modal({
            title: lang.IDE.TITLE_RESTORE_TO_POINT_IN_TIME_CONFIG,
            template: template_component.modalRestoreConfirm({
              noRestore: noRestore
            }),
            confirm: {
              hide: true
            },
            cancel: {
              text: 'Close'
            },
            disableClose: true,
            disableConfirm: true,
            width: "580",
            onCancel: function() {
              return defaultRes.remove();
            },
            onClose: function() {
              return defaultRes.remove();
            }
          });
        } else {
          lastestRestoreTime = new Date(sourceDbAppModel.get('LatestRestorableTime'));
          dbRestoreTime = defaultRes.get('dbRestoreTime');
          if (dbRestoreTime) {
            currentTime = new Date(dbRestoreTime);
          } else {
            currentTime = lastestRestoreTime;
          }
          lastestYear = lastestRestoreTime.getFullYear();
          lastestMonth = lastestRestoreTime.getMonth() + 1;
          lastestDay = lastestRestoreTime.getDate();
          customYear = currentTime.getFullYear();
          customMonth = currentTime.getMonth() + 1;
          customDay = currentTime.getDate();
          customYearStr = String(customYear).length === 1 ? "0" + customYear : customYear;
          customMonthStr = String(customMonth).length === 1 ? "0" + customMonth : customMonth;
          customDayStr = String(customDay).length === 1 ? "0" + customDay : customDay;
          timezone = -((new Date()).getTimezoneOffset() / 60);
          if (timezone > 0) {
            timezone = "+" + timezone;
          } else {
            timezone = "" + timezone;
          }
          _getCurrentSelectedTime = function() {
            var dateStr, hour, minute, second, selectedDate;
            dateStr = $('.modal-db-instance-restore-config .datepicker').val();
            selectedDate = new Date(dateStr);
            hour = $('.modal-db-instance-restore-config .timepicker.hour').val();
            minute = $('.modal-db-instance-restore-config .timepicker.minute').val();
            second = $('.modal-db-instance-restore-config .timepicker.second').val();
            selectedDate.setHours(Number(hour));
            selectedDate.setMinutes(Number(minute));
            selectedDate.setSeconds(Number(second));
            return selectedDate;
          };
          _setDefaultSelectedTime = function(needMax) {
            var hour, hourStr, minute, minuteStr, second, secondStr;
            if (needMax) {
              hourStr = String(lastestRestoreTime.getHours());
              minuteStr = String(lastestRestoreTime.getMinutes());
              secondStr = String(lastestRestoreTime.getSeconds());
            } else {
              hourStr = String(currentTime.getHours());
              minuteStr = String(currentTime.getMinutes());
              secondStr = String(currentTime.getSeconds());
            }
            hour = hourStr.length === 1 ? "0" + hourStr : hourStr;
            minute = minuteStr.length === 1 ? "0" + minuteStr : minuteStr;
            second = secondStr.length === 1 ? "0" + secondStr : secondStr;
            $('.modal-db-instance-restore-config .timepicker.hour').val(hour);
            $('.modal-db-instance-restore-config .timepicker.minute').val(minute);
            return $('.modal-db-instance-restore-config .timepicker.second').val(second);
          };
          modal = new Modal({
            title: lang.IDE.TITLE_RESTORE_TO_POINT_IN_TIME_CONFIG,
            template: template_component.modalRestoreConfirm({
              lastest: lastestRestoreTime.toString(),
              custom: !dbRestoreTime,
              timezone: timezone,
              noRestore: noRestore
            }),
            confirm: {
              text: lang.PROP.RDS_RESTORE
            },
            disableClose: true,
            width: "580",
            onConfirm: function() {
              var isCustomTime, selectedDate;
              isCustomTime = $('#modal-db-instance-restore-radio-custom')[0].checked;
              if (isCustomTime) {
                selectedDate = _getCurrentSelectedTime();
                defaultRes.set('dbRestoreTime', selectedDate.toISOString());
              } else {
                defaultRes.set('dbRestoreTime', '');
              }
              defaultRes.isRestored = true;
              return modal.close();
            },
            onCancel: function() {
              if (!defaultRes.isRestored) {
                return defaultRes.remove();
              }
            },
            onClose: function() {
              if (!defaultRes.isRestored) {
                return defaultRes.remove();
              }
            }
          });
          _setDefaultSelectedTime();
          dateLang = 'en';
          if (language === 'zh-cn') {
            dateLang = 'ch';
          }
          $('.modal-db-instance-restore-config .datepicker').datetimepicker({
            timepicker: false,
            defaultDate: "" + customMonth + "/" + customDay + "/" + customYear,
            maxDate: "" + lastestMonth + "/" + lastestDay + "/" + lastestYear,
            closeOnDateSelect: true,
            format: 'm/d/Y',
            formatDate: 'm/d/Y',
            value: "" + customMonthStr + "/" + customDayStr + "/" + customYearStr,
            lang: dateLang,
            onSelectDate: function() {
              var selectedDate;
              selectedDate = _getCurrentSelectedTime();
              if (selectedDate > lastestRestoreTime) {
                return _setDefaultSelectedTime(true);
              }
            }
          });
          $('.modal-db-instance-restore-config .datepicker, .modal-db-instance-restore-config .timepicker').on('focus', function(event) {
            return $('#modal-db-instance-restore-radio-custom').prop('checked', true);
          });
          $('.modal-db-instance-restore-config .timepicker').on('change', function(event) {
            var currentValue, maxLatestValue, maxValue, newValStr, selectedDate, valStr;
            valStr = $(event.target).val();
            currentValue = Number(valStr);
            if ($(event.target).hasClass('hour')) {
              maxValue = 23;
              maxLatestValue = currentTime.getHours();
            } else if ($(event.target).hasClass('minute')) {
              maxValue = 59;
              maxLatestValue = currentTime.getMinutes();
            } else if ($(event.target).hasClass('second')) {
              maxValue = 59;
              maxLatestValue = currentTime.getSeconds();
            }
            if (currentValue > maxValue) {
              $(event.target).val(maxValue);
            } else if (!currentValue || currentValue < 0) {
              $(event.target).val('00');
            }
            selectedDate = _getCurrentSelectedTime();
            if (selectedDate > lastestRestoreTime) {
              _setDefaultSelectedTime();
            }
            newValStr = $(event.target).val();
            if (newValStr.length < 2) {
              newValStr = "0" + newValStr;
              return $(event.target).val(newValStr);
            }
          });
        }
        return false;
      },
      checkChange: function(e) {
        var diff, that;
        if (!this.resModel.get('appId')) {
          return;
        }
        that = this;
        diff = function(oldComp, newComp) {
          var comp, differ, keys;
          comp = that.resModel.serialize();
          differ = new ResDiff({
            old: {
              component: that.originComp
            },
            "new": comp
          });
          if (differ.modifiedComps && _.keys(differ.addedComps).length === 0 && _.keys(differ.removedComps).length === 0) {
            keys = _.keys(differ.modifiedComps);
            if (keys.length === 1 && keys[0] === 'name') {
              return false;
            }
          }
          return differ.getChangeInfo().hasResChange;
        };
        if (e) {
          if (!this.isPromoted()) {
            return _.defer(function() {
              if (diff()) {
                $('.apply-immediately-section').show();
                return $('.property-panel-wrapper').addClass('immediately');
              } else {
                $('.apply-immediately-section').hide();
                return $('.property-panel-wrapper').removeClass('immediately');
              }
            });
          }
        } else {
          return diff();
        }
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
      changeEngine: function(event, value, data) {
        this.resModel.set('engine', value);
        this.resModel.setDefaultParameterGroup();
        this.resModel.setDefaultOptionGroup();
        this.renderOptionGroup();
        return this.renderLVIA();
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
        this.setDefaultAllocatedStorage();
        return true;
      },
      setDefaultAllocatedStorage: function() {
        var currentValue, defaultStorage, range;
        range = this.resModel.getAllocatedRange();
        currentValue = this.resModel.get('allocatedStorage');
        if (range.min > currentValue || range.max < currentValue) {
          defaultStorage = this.resModel.getDefaultAllocatedStorage();
          this.resModel.set('allocatedStorage', defaultStorage);
          $('#property-dbinstance-storage').val(defaultStorage);
          return this.updateIOPSCheckStatus();
        }
      },
      _getTimeData: function(timeStr) {
        var defaultValue, duration, end, endHour, endMin, endTimeAry, endTimeStr, endWeekStr, err, start, startHour, startHourStr, startMin, startMinStr, startTimeAry, startTimeStr, startWeekStr, timeAry, _appendZero;
        defaultValue = {
          startHour: '00',
          startMin: '00',
          startTime: "00:00",
          duration: 0.5,
          startWeek: 'Mondey'
        };
        if (!timeStr) {
          return defaultValue;
        }
        try {
          _appendZero = function(str) {
            if (str.length === 1) {
              return "0" + str;
            } else {
              return str;
            }
          };
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
          startHourStr = _appendZero(String(startHour));
          startMinStr = _appendZero(String(startMin));
          return {
            startHour: startHourStr,
            startMin: startMinStr,
            startTime: "" + startHourStr + ":" + startMinStr,
            duration: duration,
            startWeek: startWeekStr
          };
        } catch (_error) {
          err = _error;
          return defaultValue;
        }
      },
      _getTimeStr: function(startTimeStr, duration, startWeek) {
        var addZero, end, endHour, endMin, endTimeStr, endWeek, endWeekIdx, err, start, startHour, startMin, startTime, startWeekIdx, weekAry;
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
            endWeek = startWeek;
            weekAry = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            if (start.getDay() !== end.getDay()) {
              startWeekIdx = weekAry.indexOf(startWeek) + 1;
              endWeekIdx = (startWeekIdx + 1) % 7;
              endWeek = weekAry[endWeekIdx - 1];
            }
            startTimeStr = "" + startWeek + ":" + startTimeStr;
            endTimeStr = "" + endWeek + ":" + endTimeStr;
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
        var attr, sourceDBForRestore, _ref;
        attr = this.resModel.toJSON();
        if (this.isAppEdit) {
          attr.isAppEdit = this.isAppEdit;
          if (this.appModel) {
            _.extend(attr, this.appModel.toJSON());
          }
          _.extend(attr, this.getOriginAttr());
        }
        attr.snapshotId = attr.instanceId ? '' : attr.snapshotId;
        attr.isCanPromote = this.isCanPromote();
        attr.isPromoted = this.isPromoted();
        attr.isPromote = this.isCanPromote() || this.isPromoted();
        sourceDBForRestore = this.resModel.getSourceDBForRestore();
        if (sourceDBForRestore) {
          attr.isRestoreDB = true;
          attr.sourceDbIdForRestore = sourceDBForRestore.get('appId');
        }
        if (this.resModel.isMysql && this.resModel.master() && ((_ref = this.resModel.getMajorVersion()) === '5.1' || _ref === '5.5')) {
          attr.disableBackupForOldMySQL = true;
        }
        return attr;
      },
      isPromoted: function() {
        var dbModel, originReplicaId;
        dbModel = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(this.resModel.get('appId'));
        if (dbModel) {
          originReplicaId = dbModel.get('ReadReplicaSourceDBInstanceIdentifier');
          return this.isAppEdit && originReplicaId && !this.resModel.master();
        }
        return false;
      },
      isCanPromote: function() {
        var dbModel, originReplicaId;
        dbModel = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(this.resModel.get('appId'));
        if (dbModel) {
          originReplicaId = dbModel.get('ReadReplicaSourceDBInstanceIdentifier');
          return this.isAppEdit && originReplicaId && this.resModel.master();
        }
        return false;
      },
      setPromote: function() {
        this.resModel.unsetMaster();
        if (!this.resModel.autobackup()) {
          return this.resModel.autobackup(1);
        }
      },
      unsetPromote: function() {
        var srcDBId, srcDBModel, _ref;
        srcDBId = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, Design.instance().region()).get(this.resModel.get('appId'))) != null ? _ref.get('ReadReplicaSourceDBInstanceIdentifier') : void 0;
        if (srcDBId) {
          srcDBModel = Design.modelClassForType(constant.RESTYPE.DBINSTANCE).findWhere({
            appId: srcDBId
          });
          if (srcDBModel) {
            return this.resModel.setMaster(srcDBModel);
          }
        }
      },
      getOriginAttr: function() {
        var allocatedStorage, iops;
        if (this.originComp && this.appModel) {
          allocatedStorage = this.originComp.resource.AllocatedStorage;
          iops = this.originComp.resource.Iops;
          return {
            originAllocatedStorage: allocatedStorage,
            originIOPS: iops,
            originBackupWindow: this.appModel.get('PreferredBackupWindow'),
            originMaintenanceWindow: this.appModel.get('PreferredMaintenanceWindow')
          };
        } else {
          return null;
        }
      },
      render: function() {
        var $item, $select, attr, backupTime, changeApplyImmediately, checkChange, lvi, maintenanceTime, snapshotModel, spec, template, weekStr, _ref;
        attr = this.getModelJSON();
        backupTime = this._getTimeData(attr.backupWindow);
        maintenanceTime = this._getTimeData(attr.maintenanceWindow);
        attr.backup = backupTime;
        attr.maintenance = maintenanceTime;
        attr.backupDurations = this.genDuration(backupTime.duration);
        attr.maintenanceDurations = this.genDuration(maintenanceTime.duration);
        attr.hasSlave = !!this.resModel.slaves().length;
        attr.engineType = this.resModel.engineType();
        attr.isChanged = this.checkChange();
        _.extend(attr, {
          isOracle: this.resModel.isOracle(),
          isSqlserver: this.resModel.isSqlserver(),
          isPostgresql: this.resModel.isPostgresql(),
          isMysql: this.resModel.isMysql()
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
        if (this.isAppEdit && ((_ref = this.resModel.get('engine')) !== 'sqlserver-ee' && _ref !== 'sqlserver-se')) {
          attr.hideAZConfig = true;
        }
        if (this.resModel.master()) {
          if (this.isAppEdit) {
            attr.hideAZConfig = true;
          } else {
            template = template_replica;
          }
          attr.masterIops = this.resModel.master().get('iops');
        } else if (attr.snapshotId) {
          template = template_instance;
          snapshotModel = this.resModel.getSnapshotModel();
          attr.snapshotSize = Number((snapshotModel != null ? snapshotModel.get('AllocatedStorage') : void 0) || this.resModel.get("allocatedStorage"));
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
          attr.iopsInfo = lang.PROP.DBINSTANCE_STORAGE_REQUIRE_10_RATIO;
        } else {
          attr.iopsInfo = lang.PROP.DBINSTANCE_STORAGE_IOPS_3_10_RATIO;
        }
        this.$el.html(template(attr));
        checkChange = this.checkChange.bind(this);
        changeApplyImmediately = this.changeApplyImmediately.bind(this);
        this.$el.find(".apply-immediately-section").insertAfter('header.property-sidebar-title').click(changeApplyImmediately).click(checkChange);
        if (this.isAppEdit && !this.isPromoted()) {
          $('.property-panel-wrapper').toggleClass('immediately', checkChange());
        }
        this.setTitle(attr.name);
        this.renderLVIA();
        this.renderOptionGroup();
        weekStr = maintenanceTime != null ? maintenanceTime.startWeek : void 0;
        if (weekStr) {
          $select = $('#property-dbinstance-maintenance-window-start-day-select');
          $item = $select.find(".item[data-id='" + weekStr + "']").addClass('selected');
          $select.find('.selection').text($item.text());
        }
        this.updateIOPSCheckStatus();
        this.pgDropdown = new parameterGroup(this.resModel).renderDropdown();
        $("#property-dbinstance-parameter-group-select").html(this.pgDropdown.el);
        this.bindParsley();
        $('#property-dbinstance-maintenance-window-start-time, #property-dbinstance-backup-window-start-time').timepicker({
          'timeFormat': 'H:i',
          'step': 1
        });
        if (this.isAppEdit) {
          this.getInstanceStatus();
        }
        this.resModel.on('change:iops', function(val) {
          var $tipDom, originValue;
          if (this.isAppEdit) {
            originValue = that.getOriginAttr();
            $tipDom = this.$el.find('.property-info-iops-adjust-tip');
            if (originValue === val) {
              return $tipDom.removeClass('hide');
            } else {
              return $tipDom.addClass('hide');
            }
          }
        });
        attr.name;
        if (this.resModel.getSourceDBForRestore() && !this.resModel.isRestored) {
          return this.openRestoreConfigModal(this.resModel);
        }
      },
      bindParsley: function() {
        var db, that, validateStartTime;
        that = this;
        db = this.resModel;
        validateStartTime = function(val) {
          if (!/^(([0-1]?[0-9])|(2?[0-3])):[0-5]?[0-9]$/.test(val)) {
            return lang.PARSLEY.PROVIDE_VALID_TIME_VALUE;
          }
        };
        this.$('#property-dbinstance-backup-window-start-time').parsley('custom', validateStartTime);
        this.$('#property-dbinstance-maintenance-window-start-time').parsley('custom', validateStartTime);
        this.$('#property-dbinstance-database-name').parsley('custom', function(val) {
          switch (db.engineType()) {
            case 'mysql':
              if (val.length > 64) {
                return lang.PARSLEY.MAX_LENGTH_IS_64;
              }
              break;
            case 'postgresql':
              if (val.length > 63) {
                return lang.PARSLEY.MAX_LENGTH_IS_63;
              }
              if (!/[a-z_]/.test(val[0])) {
                return lang.PARSLEY.MUST_BEGIN_WITH_LETTER_OR_UNDERSCORE;
              }
              break;
            case 'oracle':
              if (val.length > 8) {
                return lang.PARSLEY.MAX_LENGTH_IS_8;
              }
          }
          return null;
        });
        this.$('#property-dbinstance-storage').parsley('custom', function(val) {
          var allocatedRange, increaseSize, max, min, minIncreaseSize, originValue, source, storage;
          storage = Number(val);
          originValue = that.getOriginAttr();
          allocatedRange = that.resModel.getAllocatedRange();
          min = allocatedRange.min;
          max = allocatedRange.max;
          if (that.isAppEdit) {
            if (originValue && (storage < originValue.originAllocatedStorage)) {
              return lang.PARSLEY.ALLOCATED_STORAGE_CANNOT_BE_REDUCED;
            }
            increaseSize = storage - originValue.originAllocatedStorage;
            if (increaseSize > 0) {
              minIncreaseSize = Math.ceil(originValue.originAllocatedStorage * 0.1);
              if (increaseSize < minIncreaseSize) {
                return sprintf(lang.PARSLEY.ALLOCATED_STORAGE_MUST_INCREASE_BY_AT_LEAST_10, originValue.originAllocatedStorage + minIncreaseSize);
              }
            }
          }
          if (!(storage >= min && storage <= max)) {
            return sprintf(lang.PARSLEY.MUST_BE_AN_INTEGER_FROM_MIN_TO_MAX, min, max);
          }
          source = that.resModel.source();
          if (source && storage < +source.get('AllocatedStorage')) {
            return lang.PARSLEY.SNAPSHOT_STORAGE_NEED_LARGE_THAN_ORIGINAL_VALUE;
          }
        });
        this.$('#property-dbinstance-iops-value').parsley('custom', function(val) {
          var defaultIOPS, fillValue, iops, iopsRange, originValue, storage;
          fillValue = $('#property-dbinstance-storage').val();
          originValue = that.resModel.get('allocatedStorage');
          storage = Number(fillValue || originValue);
          iopsRange = that._getIOPSRange(storage);
          defaultIOPS = that._getDefaultIOPS(storage);
          iops = Number(val);
          if (iops < 1000) {
            return lang.PARSLEY.REQUIRE_AT_LEAST_1000_IOPS;
          }
          if (that.resModel.isSqlserver() && ((iops % 1000) !== 0 || (storage * 10) !== iops)) {
            return lang.PARSLEY.SQLSERVER_IOPS_REQUIRES_A_MULTIPLE_OF_1000;
          }
          if (iops >= iopsRange.minIOPS && iops <= iopsRange.maxIOPS) {
            return null;
          }
          return lang.PARSLEY.REQUIRE_IOPS_GB_RATIOS_BETWEEN_3_AND_10;
        });
        this.$('#property-dbinstance-master-password').parsley('custom', function(val) {
          var max, min;
          if (val.indexOf('/') !== -1 || val.indexOf('"') !== -1 || val.indexOf('@') !== -1) {
            return lang.PARSLEY.CANNOT_CONTAIN_CHARACTER_SPLASH;
          }
          if (that.resModel.isMysql()) {
            min = 8;
            max = 41;
          }
          if (that.resModel.isOracle()) {
            min = 8;
            max = 30;
          }
          if (that.resModel.isSqlserver()) {
            min = 8;
            max = 128;
          }
          if (that.resModel.isPostgresql()) {
            min = 8;
            max = 128;
          }
          if (val.length >= min && val.length <= max) {
            return null;
          }
          return sprintf(lang.PARSLEY.MUST_CONTAIN_FROM_MIN_TO_MAX_CHARACTERS, min, max);
        });
        return this.$('#property-dbinstance-database-port').parsley('custom', function(val) {
          if (db.isSqlserver() && (+val === 1434 || +val === 3389 || +val === 47001 || +val === 49152 || +val === 49153 || +val === 49154 || +val === 49155 || +val === 49156)) {
            return lang.PARSLEY.THIS_VALUE_CANNOT_BE_1434_3389_47001_49152_49156;
          }
          return null;
        });
      },
      renderOptionGroup: function() {
        var $ogDropdown, attr, defaultInfo, engineCol, engineOptions, ogDropdown, ogOptions, regionName;
        regionName = Design.instance().region();
        attr = this.getModelJSON();
        attr.canCustomOG = false;
        attr.ogName = this.resModel.getOptionGroupName();
        engineCol = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBENGINE, regionName);
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
        }
      },
      renderParameterGroup: function() {
        this.pgDropdown.setSelection(this.resModel.get('pgName'));
        return null;
      },
      renderLVIA: function() {
        var attr, azUsedMap, connAry, data, disableMutilAZForMirror, engine, lvi, minAZCount, multiAZCapable, sgData, spec, subnetGroupModel, usedAZCount, _ref;
        spec = this.resModel.getSpecifications();
        lvi = this.resModel.getLVIA(spec);
        data = {
          licenses: lvi[0],
          versions: lvi[1],
          classes: lvi[2],
          azCapable: lvi[3],
          engines: constant.DB_ENGINE_ARY[this.resModel.engineType()]
        };
        attr = this.getModelJSON();
        attr.classInfo = this.resModel.getInstanceClassDict();
        _.extend(data, attr);
        $('#lvia-container').html(template_component.lvi(data));
        spec = this.resModel.getSpecifications();
        lvi = this.resModel.getLVIA(spec);
        multiAZCapable = lvi[3];
        engine = this.resModel.get('engine');
        disableMutilAZForMirror = false;
        if ((engine === 'sqlserver-ee' || engine === 'sqlserver-se')) {
          disableMutilAZForMirror = true;
        }
        if (!multiAZCapable) {
          this.resModel.set('multiAz', '');
        }
        sgData = {
          disableMutilAZForMirror: disableMutilAZForMirror,
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
        if ((_ref = Design.instance().region()) === 'cn-north-1') {
          minAZCount = 1;
        } else {
          minAZCount = 2;
        }
        if (usedAZCount < minAZCount) {
          sgData.azNotEnough = true;
        }
        if (multiAZCapable) {
          $('#property-dbinstance-mutil-az').html(template_component.propertyDbinstanceMutilAZ(sgData));
        }
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
        var $target, that, value;
        that = this;
        $target = $(event.currentTarget);
        if (MC.aws.aws.checkResName(this.resModel.get('id'), $target, 'DBInstance')) {
          value = $target.val().toLowerCase();
          $target.parsley('custom', function(val) {
            var errTip, max, min;
            val = val.toLowerCase();
            if (val[val.length - 1] === '-' || (val.indexOf('--') !== -1)) {
              return errTip;
            }
            if (that.resModel.isSqlserver()) {
              min = 1;
              max = 10;
            } else {
              min = 1;
              max = 58;
            }
            errTip = sprintf(lang.PARSLEY.MUST_CONTAIN_FROM_MIN_TO_MAX_ALPHANUMERIC_CHARACTERS_HYPHEN, min, max);
            if (val.length < min || val.length > max) {
              return errTip;
            }
            if (!MC.validate('letters', val[0])) {
              return errTip;
            }
          });
          if ($target.parsley('validate')) {
            this.resModel.setName(value);
            this.setTitle(value);
          }
        }
        return null;
      },
      onChangeDesc: function(event) {
        return this.resModel.setDesc($(event.currentTarget).val());
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
      updateIOPSCheckStatus: function(newStorage) {
        var iops, iopsRange, storge, that;
        that = this;
        if (newStorage) {
          storge = newStorage;
        } else {
          storge = that.resModel.get('allocatedStorage');
        }
        if (!(that.resModel.master() && !that.isAppEdit)) {
          iops = that.resModel.get('iops');
          iopsRange = this._getIOPSRange(storge);
          if (iopsRange.minIOPS >= 1000 || iopsRange.maxIOPS >= 1000) {
            if (this.resModel.isSqlserver() && this.isAppEdit) {
              that._disableIOPSCheck(true);
            } else {
              that._disableIOPSCheck(false);
            }
            return $('.property-dbinstance-iops-check-tooltip').attr('data-tooltip', '');
          } else {
            iopsRange.minIOPS >= 1000 || iopsRange.maxIOPS;
            that._disableIOPSCheck(true);
            return $('.property-dbinstance-iops-check-tooltip').attr('data-tooltip', lang.PROP.VOLUME_DISABLE_IOPS_TOOLTIP);
          }
        }
      },
      _disableIOPSCheck: function(isDisable) {
        var _check, _checked, _hide, _switch;
        _check = function(id) {
          var $selectedDom;
          $('#property-dbinstance-storage-type').find('.item').removeClass('selected');
          $selectedDom = $('#property-dbinstance-storage-type').find('.item[data-id="' + id + '"]');
          $selectedDom.addClass('selected');
          return $('#property-dbinstance-storage-type').find('.selection').text($selectedDom.text());
        };
        _switch = function(flag) {
          if (flag) {
            _check('standard');
            return $('.property-dbinstance-iops-value-section').hide();
          } else {
            return _check('io1');
          }
        };
        _hide = function(flag) {
          var $dom;
          $dom = $('#property-dbinstance-storage-type').find('.item[data-id="io1"]');
          if (flag) {
            $dom.hide();
            if (_checked()) {
              return _switch(true);
            }
          } else {
            return $dom.show();
          }
        };
        _checked = function() {
          var $dom;
          $dom = $('#property-dbinstance-storage-type').find('.item[data-id="io1"]');
          return $dom.hasClass('selected');
        };
        if (isDisable) {
          if (_checked()) {
            _switch(true);
          }
          _hide(true);
          $('#property-dbinstance-iops-value').val('');
          return this.resModel.setIops(0);
        } else {
          return _hide(false);
        }
      },
      _getIOPSRange: function(storage) {
        var maxIOPS, minIOPS;
        if (this.resModel.isSqlserver()) {
          minIOPS = storage * 10;
          maxIOPS = storage * 10;
        } else {
          minIOPS = storage * 3;
          maxIOPS = storage * 10;
        }
        return {
          minIOPS: minIOPS,
          maxIOPS: maxIOPS
        };
      },
      _getDefaultIOPS: function(storage) {
        var base, count, iopsRange, value;
        base = 1000;
        count = 0;
        iopsRange = this._getIOPSRange(storage);
        while (++count) {
          value = base * count;
          if (value >= iopsRange.minIOPS && value <= iopsRange.maxIOPS) {
            return value;
          }
          if (value > iopsRange.maxIOPS) {
            return null;
          }
        }
      },
      changeAllocatedStorage: function(event) {
        var target, that, value;
        that = this;
        target = $(event.target);
        value = Number(target.val());
        if (target.parsley('validate') && that.changeProvisionedIOPS()) {
          that.resModel.set('allocatedStorage', value);
          return that.updateIOPSCheckStatus();
        }
      },
      inputAllocatedStorage: function(event) {
        var target, that, value;
        that = this;
        target = $(event.target);
        value = Number(target.val());
        return that.updateIOPSCheckStatus(value);
      },
      changeStorageType: function() {
        var defaultIOPS, fillValue, iopsRange, originValue, storage, that, value, _checked, _value;
        that = this;
        _checked = function() {
          var $dom;
          $dom = $('#property-dbinstance-storage-type').find('.item[data-id="io1"]');
          return $dom.hasClass('selected');
        };
        _value = function() {
          var $dom;
          $dom = $('#property-dbinstance-storage-type').find('.item.selected');
          return $dom.attr('data-id');
        };
        value = _checked();
        fillValue = $('#property-dbinstance-storage').val();
        originValue = this.resModel.get('allocatedStorage');
        storage = Number(fillValue || originValue);
        iopsRange = this._getIOPSRange(storage);
        if (this.resModel.master() && !this.isAppEdit) {
          if (value) {
            this.resModel.setIops(this.resModel.master().get('iops'));
          } else {
            this.resModel.setIops(0);
          }
        } else {
          if (value) {
            $('.property-dbinstance-iops-value-section').show();
            if (iopsRange.minIOPS >= 1000 || iopsRange.maxIOPS >= 1000) {
              defaultIOPS = this._getDefaultIOPS(storage);
              if (defaultIOPS) {
                $('#property-dbinstance-iops-value').val(defaultIOPS);
                that.changeProvisionedIOPS();
              }
            }
          } else {
            $('.property-dbinstance-iops-value-section').hide();
            $('#property-dbinstance-iops-value').val('');
            this.resModel.setIops(0);
          }
        }
        return this.resModel.set('storageType', _value());
      },
      changeProvisionedIOPS: function(event) {
        var fillValue, iops, originValue, storage, target, that, value, _checked;
        that = this;
        _checked = function() {
          var $dom;
          $dom = $('#property-dbinstance-storage-type').find('.item[data-id="io1"]');
          return $dom.hasClass('selected');
        };
        if (_checked()) {
          target = $('#property-dbinstance-iops-value');
          value = target.val();
          iops = Number(value);
          fillValue = $('#property-dbinstance-storage').val();
          originValue = this.resModel.get('allocatedStorage');
          storage = Number(fillValue || originValue);
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
          var max, min;
          if (MC.validate('alphanum', val) && MC.validate('letters', val[0])) {
            if (that.resModel.isMysql()) {
              min = 1;
              max = 16;
            }
            if (that.resModel.isOracle()) {
              min = 1;
              max = 30;
            }
            if (that.resModel.isSqlserver()) {
              min = 1;
              max = 128;
            }
            if (that.resModel.isPostgresql()) {
              min = 2;
              max = 16;
            }
            if (val.length >= min && val.length <= max) {
              return null;
            }
          }
          return sprintf(lang.PARSLEY.MUST_CONTAIN_FROM_MIN_TO_MAX_ALPHANUMERIC_CHARACTERS, min, max);
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
          $backupGroup.show();
          return this.changeBackupTime();
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
          $maintenanceGroup.show();
          return this.changeMaintenanceTime();
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
        var currentResModel, dbId, region, that, _setStatus;
        that = this;
        _setStatus = function(showError) {
          var tip;
          $('.property-dbinstance-status-icon-warning').remove();
          if (that.appModel) {
            that.setTitle(that.appModel.get('name'));
          }
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
        _setStatus();
        region = Design.instance().region();
        dbId = that.resModel.get('appId');
        currentResModel = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBINSTANCE, region).get(dbId);
        if (currentResModel) {
          return ApiRequest("rds_ins_DescribeDBInstances", {
            region_name: region,
            id: dbId
          }).then(function(data) {
            var dbData, dbStatus, newSrcId, oldSrcId, _ref;
            data = ((_ref = data.DescribeDBInstancesResponse.DescribeDBInstancesResult.DBInstances) != null ? _ref.DBInstance : void 0) || [];
            dbData = !_.isArray(data) ? data : data[0];
            if (dbData) {
              oldSrcId = currentResModel.get('ReadReplicaSourceDBInstanceIdentifier');
              newSrcId = dbData.ReadReplicaSourceDBInstanceIdentifier;
              if (oldSrcId !== newSrcId) {
                currentResModel.set('ReadReplicaSourceDBInstanceIdentifier', newSrcId);
                App.workspaces.getAwakeSpace().view.propertyPanel.refresh();
              } else {
                dbStatus = dbData.DBInstanceStatus;
                if (dbStatus !== 'available') {
                  _setStatus(true);
                  return;
                } else {
                  that.$el.find('.property-dbinstance-promote-replica').show();
                }
              }
            }
            return _setStatus(false);
          }, function() {
            return _setStatus(false);
          });
        }
      }
    });
    return new DBInstanceView();
  });

}).call(this);
