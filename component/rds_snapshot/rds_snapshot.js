(function() {
  define(['CloudResources', 'ApiRequest', 'constant', 'combo_dropdown', "UI.modalplus", 'toolbar_modal', "i18n!/nls/lang.js", 'component/rds_snapshot/template'], function(CloudResources, ApiRequest, constant, combo_dropdown, modalPlus, toolbar_modal, lang, template) {
    var deleteCount, deleteErrorCount, fetched, fetching, regionsMark, snapshotRes;
    fetched = false;
    deleteCount = 0;
    deleteErrorCount = 0;
    fetching = false;
    regionsMark = {};
    snapshotRes = Backbone.View.extend({
      constructor: function() {
        this.collection = CloudResources(constant.RESTYPE.DBSNAP, Design.instance().region());
        this.listenTo(this.collection, 'update', this.onChange.bind(this));
        this.listenTo(this.collection, 'change', this.onChange.bind(this));
        return this;
      },
      onChange: function() {
        this.initManager();
        return this.trigger('datachange', this);
      },
      remove: function() {
        this.isRemoved = true;
        return Backbone.View.prototype.remove.call(this);
      },
      render: function() {
        return this.renderManager();
      },
      renderDropdown: function() {
        var option, selection;
        option = {
          filterPlaceHolder: lang.ide.PROP_SNAPSHOT_FILTER_VOLUME
        };
        this.dropdown = new combo_dropdown(option);
        this.instances = CloudResources(constant.RESTYPE.DBINSTANCE, Design.instance().region());
        selection = lang.ide.PROP_INSTANCE_SNAPSHOT_SELECT;
        this.dropdown.setSelection(selection);
        this.dropdown.on('open', this.openDropdown, this);
        this.dropdown.on('filter', this.filterDropdown, this);
        this.dropdown.on('change', this.selectSnapshot, this);
        return this.dropdown;
      },
      renderRegionDropdown: function() {
        var option, selection;
        option = {
          filterPlaceHolder: lang.ide.PROP_SNAPSHOT_FILTER_REGION
        };
        this.regionsDropdown = new combo_dropdown(option);
        this.regions = _.keys(constant.REGION_LABEL);
        selection = lang.ide.PROP_VOLUME_SNAPSHOT_SELECT_REGION;
        this.regionsDropdown.setSelection(selection);
        this.regionsDropdown.on('open', this.openRegionDropdown, this);
        this.regionsDropdown.on('filter', this.filterRegionDropdown, this);
        this.regionsDropdown.on('change', this.selectRegion, this);
        return this.regionsDropdown;
      },
      openRegionDropdown: function(keySet) {
        var content, currentRegion, data, dataSet;
        currentRegion = Design.instance().get('region');
        data = _.map(this.regions, function(region) {
          return {
            name: constant.REGION_LABEL[region] + " - " + constant.REGION_SHORT_LABEL[region],
            selected: region === currentRegion,
            region: region
          };
        });
        dataSet = {
          isRuntime: false,
          data: data
        };
        if (keySet) {
          dataSet.data = keySet;
          dataSet.hideDefaultNoKey = true;
        }
        content = template.keys(dataSet);
        this.regionsDropdown.toggleControls(false, 'manage');
        this.regionsDropdown.toggleControls(true, 'filter');
        return this.regionsDropdown.setContent(content);
      },
      openDropdown: function(keySet) {
        return this.instances.fetch().then((function(_this) {
          return function() {
            var content, data, dataSet;
            data = _this.instances.toJSON();
            if (data.length < 1) {
              _this.dropdown.setContent(template.noinstance());
              return false;
            }
            dataSet = {
              isRuntime: false,
              data: data
            };
            if (keySet) {
              dataSet.data = keySet;
              dataSet.hideDefaultNoKey = true;
            }
            content = template.keys(dataSet);
            _this.dropdown.toggleControls(false, 'manage');
            _this.dropdown.toggleControls(true, 'filter');
            return _this.dropdown.setContent(content);
          };
        })(this));
      },
      filterDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.instances.toJSON(), function(data) {
          return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openDropdown(hitKeys);
        } else {
          return this.openDropdown();
        }
      },
      filterRegionDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.regions, function(data) {
          return data.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openRegionDropdown(hitKeys);
        } else {
          return this.openRegionDropdown();
        }
      },
      selectSnapshot: function(e) {
        $("#property-db-instance-choose .selection .manager-content-sub").remove();
        return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
      },
      selectRegion: function(e) {
        return this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
      },
      renderManager: function() {
        var _ref;
        this.manager = new toolbar_modal(this.getModalOptions());
        this.manager.on('refresh', this.refresh, this);
        this.manager.on("slidedown", this.renderSlides, this);
        this.manager.on("slideup", this.resetSlide, this);
        this.manager.on('action', this.doAction, this);
        this.manager.on('detail', this.detail, this);
        this.manager.on('close', (function(_this) {
          return function() {
            _this.manager.remove();
            return _this.collection.remove();
          };
        })(this));
        this.manager.on('checked', this.processDuplicate, this);
        this.manager.render();
        if (!App.user.hasCredential()) {
          if ((_ref = this.manager) != null) {
            _ref.render('nocredential');
          }
          return false;
        }
        return this.initManager();
      },
      resetSlide: function() {
        return this.manager.$el.find(".slidebox").removeAttr('style');
      },
      processDuplicate: function(event, checked) {
        if (checked.length === 1) {
          return this.M$('[data-btn=duplicate]').prop('disabled', false);
        } else {
          return this.M$('[data-btn=duplicate]').prop('disabled', true);
        }
      },
      refresh: function() {
        fetched = false;
        return this.initManager();
      },
      setContent: function() {
        var content, data, dataSet, _ref;
        fetching = false;
        fetched = true;
        data = this.collection.toJSON();
        _.each(data, function(e, f) {
          if (e.PercentProgress === 100) {
            e.completed = true;
          }
          if (e.SnapshotCreateTime) {
            e.started = (new Date(e.SnapshotCreateTime)).toString();
          }
          return null;
        });
        dataSet = {
          items: data
        };
        content = template.content(dataSet);
        return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
      },
      initManager: function() {
        var currentRegion, setContent;
        setContent = this.setContent.bind(this);
        currentRegion = Design.instance().get('region');
        if ((!fetched && !fetching) || (!regionsMark[currentRegion])) {
          fetching = true;
          regionsMark[currentRegion] = true;
          return this.collection.fetchForce().then(setContent, setContent);
        } else if (!fetching) {
          return this.setContent();
        }
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template['slide_' + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      getSlides: function() {
        return {
          'delete': function(tpl, checked) {
            var checkedAmount, data;
            checkedAmount = checked.length;
            if (!checkedAmount) {
              return;
            }
            data = {};
            if (checkedAmount === 1) {
              data.selectedName = checked[0].data.name;
            } else {
              data.selectedCount = checkedAmount;
            }
            return this.manager.setSlide(tpl(data));
          },
          'create': function(tpl) {
            var data;
            data = {
              volumes: {}
            };
            this.manager.setSlide(tpl(data));
            this.dropdown = this.renderDropdown();
            this.manager.$el.find('#property-db-instance-choose').html(this.dropdown.$el);
            return this.manager.$el.find(".slidebox").css('overflow', "visible");
          },
          'duplicate': function(tpl, checked) {
            var data;
            data = {};
            data.originSnapshot = checked[0];
            data.region = Design.instance().get('region');
            if (!checked) {
              return;
            }
            this.manager.setSlide(tpl(data));
            this.regionsDropdown = this.renderRegionDropdown();
            this.regionsDropdown.on('change', (function(_this) {
              return function() {
                return _this.manager.$el.find('[data-action="duplicate"]').prop('disabled', false);
              };
            })(this));
            this.manager.$el.find('#property-region-choose').html(this.regionsDropdown.$el);
            return this.manager.$el.find(".slidebox").css('overflow', "visible");
          }
        };
      },
      doAction: function(action, checked) {
        return this["do_" + action] && this["do_" + action]('do_' + action, checked);
      },
      do_create: function(validate, checked) {
        var afterCreated, data, dbInstance;
        if (!$('#property-snapshot-name-create').parsley('validate')) {
          return false;
        }
        dbInstance = this.instances.findWhere({
          'id': $('#property-db-instance-choose').find('.selectbox .selection .manager-content-main').data('id')
        });
        if (!dbInstance) {
          return false;
        }
        data = {
          "DBSnapshotIdentifier": $("#property-snapshot-name-create").val(),
          'DBInstanceIdentifier': dbInstance.id
        };
        this.switchAction('processing');
        afterCreated = this.afterCreated.bind(this);
        return this.collection.create(data).save().then(afterCreated, afterCreated);
      },
      do_delete: function(invalid, checked) {
        var afterDeleted, that;
        that = this;
        deleteCount += checked.length;
        this.switchAction('processing');
        afterDeleted = that.afterDeleted.bind(that);
        return _.each(checked, (function(_this) {
          return function(data) {
            return _this.collection.findWhere({
              id: data.data.id
            }).destroy().then(afterDeleted, afterDeleted);
          };
        })(this));
      },
      do_duplicate: function(invalid, checked) {
        var afterDuplicate, description, newName, sourceSnapshot, targetRegion;
        sourceSnapshot = checked[0];
        targetRegion = $('#property-region-choose').find('.selectbox .selection .manager-content-main').data('id');
        if ((this.regions.indexOf(targetRegion)) < 0) {
          return false;
        }
        this.switchAction('processing');
        newName = this.manager.$el.find('#property-snapshot-name').val();
        description = this.manager.$el.find('#property-snapshot-desc').val();
        afterDuplicate = this.afterDuplicate.bind(this);
        return this.collection.findWhere({
          id: sourceSnapshot.data.id
        }).copyTo(targetRegion, newName, description).then(afterDuplicate, afterDuplicate);
      },
      afterCreated: function(result, newSnapshot) {
        this.manager.cancel();
        if (result.error) {
          notification('error', "Create failed because of: " + result.msg);
          return false;
        }
        return notification('info', "New Snapshot is created successfully!");
      },
      afterDuplicate: function(result) {
        var currentRegion;
        currentRegion = Design.instance().get('region');
        this.manager.cancel();
        if (result.error) {
          notification('error', "Duplicate failed because of: " + result.msg);
          return false;
        }
        if (result.attributes.region === currentRegion) {
          this.collection.add(result);
          return notification('info', "New Snapshot is duplicated successfully!");
        } else {
          this.initManager();
          return notification('info', 'New Snapshot is duplicated to another region, you need to switch region to check the snapshot you just created.');
        }
      },
      afterDeleted: function(result) {
        deleteCount--;
        if (result.error) {
          deleteErrorCount++;
        }
        if (deleteCount === 0) {
          if (deleteErrorCount > 0) {
            notification('error', deleteErrorCount + " Snapshot failed to delete, Please try again later.");
          } else {
            notification('info', "Delete Successfully");
          }
          this.manager.unCheckSelectAll();
          deleteErrorCount = 0;
          return this.manager.cancel();
        }
      },
      switchAction: function(state) {
        if (!state) {
          state = 'init';
        }
        return this.M$('.slidebox .action').each(function() {
          if ($(this).hasClass(state)) {
            return $(this).show();
          } else {
            return $(this).hide();
          }
        });
      },
      detail: function(event, data, $tr) {
        var detailTpl, snapshotData, snapshotId;
        snapshotId = data.id;
        snapshotData = this.collection.get(snapshotId).toJSON();
        detailTpl = template.detail(snapshotData);
        return this.manager.setDetail($tr, detailTpl);
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: "Manage RDS Snapshots in " + regionName,
          slideable: true,
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create Snapshot'
            }, {
              icon: 'del',
              type: 'delete',
              disabled: true,
              name: 'Delete'
            }, {
              icon: 'refresh',
              type: 'refresh',
              name: ''
            }
          ],
          columns: [
            {
              sortable: true,
              width: "30%",
              name: 'Name'
            }, {
              sortable: true,
              rowType: 'number',
              width: "20%",
              name: 'Capicity'
            }, {
              sortable: true,
              rowType: 'datetime',
              width: "40%",
              name: 'status'
            }, {
              sortable: false,
              width: "10%",
              name: 'Detail'
            }
          ]
        };
      }
    });
    return snapshotRes;
  });

}).call(this);
