(function() {
  define(['../base/view', './template/app', 'og_manage_app', 'constant', 'toolbar_modal', 'ApiRequest', 'JsonExporter', "i18n!/nls/lang.js"], function(PropertyView, template, ogManageApp, constant, toolbar_modal, ApiRequest, JsonExporter, lang) {
    var CGWAppView;
    CGWAppView = PropertyView.extend({
      events: {
        'click .db-og-in-app': 'openOgModal',
        'click .property-btn-get-system-log': 'openModal'
      },
      initialize: function() {
        return this.isSafari = $("body").hasClass("safari");
      },
      render: function() {
        var data;
        data = this.model ? this.model.toJSON() : this.resModel.serialize().component.resource;
        if (!data.Endpoint) {
          data = _.extend(this.resModel.serialize().component.resource, data);
          data.DBSubnetGroup.DBSubnetGroupName = this.resModel.parent().get('name');
        }
        data.optionGroups = _.map(data.OptionGroupMemberships, function(ogm) {
          var ogComp;
          ogComp = Design.modelClassForType(constant.RESTYPE.DBOG).findWhere({
            appId: ogm.OptionGroupName
          });
          return _.extend({}, ogm, {
            isDefault: !ogComp,
            uid: (ogComp != null ? ogComp.id : void 0) || ''
          });
        });
        data.description = this.resModel.get("description");
        data.name = this.resModel.get('name');
        this.$el.html(template.appView(data));
        return this.resModel.get('name');
      },
      renderLogList: function(logList) {
        var that;
        that = this;
        if (logList) {
          logList = _.map(logList, function(log) {
            log.isSafari = that.isSafari;
            return log;
          });
          this.modal.options.columns = this.getLogColumns();
          this.modal.setContent(template.log_list(logList));
        } else {
          this.modal.setContent(template.list_empty({}), true);
        }
        return null;
      },
      renderEventList: function(eventList) {
        var that;
        that = this;
        if (eventList) {
          this.modal.options.columns = this.getEventColumns();
          this.modal.setContent(template.event_list(eventList));
        } else {
          this.modal.setContent(template.list_empty({}), true);
        }
        return null;
      },
      openOgModal: function() {
        var ogModel;
        ogModel = this.resModel.connectionTargets('OgUsage')[0];
        return new ogManageApp({
          model: ogModel
        });
      },
      openModal: function() {
        new toolbar_modal(this.getModalOptions());
        this.modal.on('slidedown', this.switchLogEvent, this);
        this.modal.delegate({
          'click a.view': 'viewLog',
          'click a.download': 'downloadLog',
          'click .refresh-log': 'viewLog'
        }, this);
        this.modal.render();
        this.switchLog();
        return false;
      },
      switchLog: function() {
        return this.getLogList();
      },
      switchEvent: function() {
        return this.getEventList();
      },
      switchLogEvent: function(button) {
        this.modal.toggleSlide(false).renderListLoading();
        if (button === 'event') {
          return this.switchEvent();
        } else {
          return this.switchLog();
        }
      },
      getEventList: function() {
        var that;
        that = this;
        ApiRequest('rds_DescribeEvents', {
          region_name: this.resModel.design().region(),
          source_id: this.resModel.get('appId'),
          source_type: 'db-instance',
          event_categories: null,
          duration: 20160
        }).then((function(result) {
          var eventList, _ref, _ref1, _ref2;
          eventList = (result != null ? (_ref = result.DescribeEventsResponse) != null ? (_ref1 = _ref.DescribeEventsResult) != null ? (_ref2 = _ref1.Events) != null ? _ref2.Event : void 0 : void 0 : void 0 : void 0) || null;
          if (eventList && !_.isArray(eventList)) {
            eventList = [eventList];
          }
          return that.renderEventList(eventList);
        }), (function() {}));
        return null;
      },
      getLogList: function() {
        var that;
        that = this;
        ApiRequest('rds_DescribeDBLogFiles', {
          db_identifier: this.resModel.get('appId'),
          region_name: this.resModel.design().region()
        }).then((function(result) {
          var logList, _ref, _ref1, _ref2;
          logList = (result != null ? (_ref = result.DescribeDBLogFilesResponse) != null ? (_ref1 = _ref.DescribeDBLogFilesResult) != null ? (_ref2 = _ref1.DescribeDBLogFiles) != null ? _ref2.DescribeDBLogFilesDetails : void 0 : void 0 : void 0 : void 0) || null;
          if (logList && !_.isArray(logList)) {
            logList = [logList];
          }
          return that.renderLogList(logList);
        }), (function() {
          that.renderLogList(null);
          return null;
        }));
        return null;
      },
      viewLog: function(e) {
        var filename, modal;
        modal = this.modal;
        filename = $(e.currentTarget).data('fileName');
        modal.toggleSlide(true);
        return this.getLogContent(filename).then((function(log) {
          log.filename = filename;
          return modal.setSlide(template.log_content(log));
        }), (function() {
          var log;
          log = {
            LogFileData: '',
            filename: filename
          };
          return modal.setSlide(template.log_content(log));
        }));
      },
      downloadLog: function(e) {
        var filename, modal;
        modal = this.modal;
        filename = $(e.currentTarget).data('fileName');
        modal.toggleSlide(true);
        return this.getLogContent(filename).then(function(log) {
          var blob, download;
          modal.toggleSlide(false);
          download = JsonExporter.download;
          blob = new Blob([log.LogFileData || '']);
          return download(blob, filename);
        });
      },
      getLogContent: function(filename) {
        return ApiRequest('rds_DownloadDBLogFilePortion', {
          region_name: this.resModel.design().region(),
          db_identifier: this.resModel.get('appId'),
          log_filename: filename
        }).then((function(result) {
          var _ref;
          return (result != null ? (_ref = result.DownloadDBLogFilePortionResponse) != null ? _ref.DownloadDBLogFilePortionResult : void 0 : void 0) || {};
        }), (function() {
          return {};
        }));
      },
      getModalOptions: function() {
        var appId, options, that;
        that = this;
        appId = this.resModel.get('appId');
        options = {
          title: sprintf(lang.IDE.TITLE_LOG_AND_EVENT, appId),
          classList: 'syslog-dbinstance',
          context: that,
          noCheckbox: true,
          longtermActive: true,
          buttons: [
            {
              icon: 'unknown',
              type: 'log',
              name: lang.IDE.LBL_LOG,
              active: true
            }, {
              icon: 'unknown',
              type: 'event',
              name: lang.IDE.LBL_EVENT
            }
          ]
        };
        options.columns = this.getLogColumns();
        if (this.isSafari) {
          options.columns.pop();
        }
        return options;
      },
      getLogColumns: function() {
        return [
          {
            sortable: true,
            name: lang.PROP.LBL_NAME
          }, {
            sortable: true,
            rowType: 'datetime',
            name: lang.IDE.LBL_LAST_WRITTEN,
            width: "28%"
          }, {
            sortable: true,
            rowType: 'number',
            width: "10%",
            name: lang.IDE.LBL_SIZE_B
          }, {
            sortable: false,
            width: "10%",
            name: lang.PROP.LBL_VIEW
          }, {
            sortable: false,
            width: "10%",
            name: lang.PROP.LBL_DOWNLOAD
          }
        ];
      },
      getEventColumns: function() {
        return [
          {
            sortable: true,
            rowType: 'datetime',
            name: lang.IDE.LBL_TIME,
            width: "28%"
          }, {
            sortable: true,
            width: "20%",
            name: lang.PROP.LBL_SOURCE
          }, {
            sortable: false,
            name: lang.IDE.LBL_SYSTEM_NOTES
          }
        ];
      }
    });
    return new CGWAppView();
  });

}).call(this);
