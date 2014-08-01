(function() {
  define(['CloudResources', 'ApiRequest', 'constant', "UI.modalplus", 'combo_dropdown', 'toolbar_modal', "i18n!/nls/lang.js", 'component/rds_pg/template'], function(CloudResources, ApiRequest, constant, modalPlus, combo_dropdown, toolbar_modal, lang, template) {
    var DbpgRes, deleteCount, deleteErrorCount, fetched, fetching, regionsMark;
    fetched = false;
    deleteCount = 0;
    deleteErrorCount = 0;
    fetching = false;
    regionsMark = {};
    DbpgRes = Backbone.View.extend({
      constructor: function(model) {
        if (model) {
          this.resModel = model;
        }
        this.collection = CloudResources(constant.RESTYPE.DBPG, Design.instance().region());
        this.listenTo(this.collection, 'update', this.onUpdate.bind(this));
        this.listenTo(this.collection, 'change', this.onUpdate.bind(this));
        return this;
      },
      onUpdate: function() {
        this.initManager();
        return this.trigger('datachange', this);
      },
      remove: function() {
        return Backbone.View.prototype.remove.call(this);
      },
      render: function() {
        return this.renderManager();
      },
      enableCreate: function() {
        return this.manager.$el.find('[data-action="create"]').prop('disabled', false);
      },
      selectRegion: function() {
        return this.manager.$el.find('[data-action="reset"]').prop('disabled', false);
      },
      renderManager: function() {
        var _ref;
        this.manager = new toolbar_modal(this.getModalOptions());
        this.manager.on('refresh', this.refresh, this);
        this.manager.on("slidedown", this.renderSlides, this);
        this.manager.on('action', this.doAction, this);
        this.manager.on('close', (function(_this) {
          return function() {
            _this.manager.remove();
            return _this.collection.remove();
          };
        })(this));
        this.manager.on('checked', this.processReset, this);
        this.manager.render();
        if (!App.user.hasCredential()) {
          if ((_ref = this.manager) != null) {
            _ref.render('nocredential');
          }
          return false;
        }
        return this.initManager();
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
      processReset: function(event, checked) {
        var allNotDefault, that;
        if (checked.length === 1 && !this.collection.findWhere({
          id: checked[0].data.id
        }).isDefault()) {
          this.M$('[data-btn=reset],[data-btn=edit]').prop('disabled', false);
        } else {
          this.M$('[data-btn=reset],[data-btn=edit]').prop('disabled', true);
        }
        that = this;
        allNotDefault = _.every(checked, function(e) {
          var val;
          val = !that.collection.findWhere({
            id: e.data.id
          }).isDefault();
          return val;
        });
        if (checked.length >= 1 && allNotDefault) {
          return window.setTimeout(function() {
            return that.M$('[data-btn=delete]').prop('disabled', false);
          }, 1);
        } else {
          return window.setTimeout(function() {
            return that.M$('[data-btn=delete]').prop('disabled', true);
          }, 1);
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
        dataSet = {
          items: data
        };
        content = template.content(dataSet);
        return (_ref = this.manager) != null ? _ref.setContent(content) : void 0;
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template['slide_' + which];
        $(".slidebox .content").removeAttr('style');
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
              data.selectedId = checked[0].data.id;
            } else {
              data.selectedCount = checkedAmount;
            }
            return this.manager.setSlide(tpl(data));
          },
          'create': function(tpl) {
            var that;
            this.families = CloudResources(constant.RESTYPE.DBENGINE, Design.instance().get("region"));
            that = this;
            return this.families.fetch().then(function() {
              var data, families;
              families = _.uniq(_.pluck(that.families.toJSON(), "DBParameterGroupFamily"));
              data = {
                families: families
              };
              that.manager.setSlide(tpl(data));
              return $("#property-dbpg-name-create").keyup(function() {
                var disableCreate;
                disableCreate = !$(this).val();
                return that.manager.$el.find('[data-action="create"]').prop('disabled', disableCreate);
              });
            });
          },
          'edit': function(tpl, checked, option) {
            var parameters, target, that;
            if (!checked) {
              return false;
            }
            that = this;
            target = this.collection.findWhere({
              id: checked[0].data.id
            });
            parameters = target.getParameters();
            if (!option) {
              that.manager.setSlide(template.loading());
            }
            return parameters.fetch().then(function(result) {
              if (result.error) {
                that.manager.cancel();
                notification('error', result.awsResult || result.msg);
              }
              that.renderEditTpl(parameters, tpl, option);
              $(".slidebox .content").css({
                "width": "100%",
                "margin-top": "0px"
              });
              return that.bindEditEvent(parameters, tpl, option);
            });
          },
          'reset': function(tpl, checked) {
            var data;
            data = {
              name: checked[0].data.id
            };
            if (!checked) {
              return;
            }
            return this.manager.setSlide(tpl(data));
          }
        };
      },
      renderEditTpl: function(parameters, tpl, option) {
        var data, that;
        that = this;
        data = parameters.toJSON ? parameters.toJSON() : parameters;
        _.each(data, function(e) {
          var _ref;
          if (((_ref = e.AllowedValues) != null ? _ref.split(',').length : void 0) > 1) {
            e.inputType = "select";
            e.selections = e.AllowedValues.split(",");
          } else {
            e.inputType = "input";
          }
        });
        if (option != null ? option.sort : void 0) {
          data = _.sortBy(data, function(e) {
            var s;
            s = e.ParameterName;
            if (option.sort === "ParameterName") {
              s = e.ParameterName;
            }
            if (option.sort === 'IsModifiable') {
              s = e.IsModifiable;
            }
            if (option.sort === "ApplyType") {
              s = e.ApplyType;
            }
            if (option.sort === "Source") {
              s = e.Source;
            }
            return s;
          });
          $("#parameter-table").html(template.filter({
            data: data
          }));
        }
        if (option != null ? option.filter : void 0) {
          data = _.filter(data, function(e) {
            return (e.ParameterName.toLowerCase().indexOf(option.filter.toLowerCase())) > -1;
          });
          $("#parameter-table").html(template.filter({
            data: data
          }));
        }
        if ((option != null ? option.filter : void 0) || (option != null ? option.sort : void 0)) {
          return false;
        }
        return that.manager.setSlide(tpl({
          data: data
        }));
      },
      bindFilter: function(parameters, tpl) {
        var filter, sortType, that, _ref, _ref1;
        that = this;
        sortType = (_ref = $("#sort-parameter-name").find(".item.selected")) != null ? (_ref1 = _ref.data()) != null ? _ref1.id : void 0 : void 0;
        filter = $("#pg-filter-parameter-name");
        filter.off('change').on('change', function() {
          var checked, val;
          val = $(this).val();
          checked = [
            {
              data: {
                id: parameters.groupModel.id
              }
            }
          ];
          return (that.getSlides().edit.bind(that))(template.slide_edit, checked, {
            filter: val,
            sort: sortType
          });
        });
        return $("#sort-parameter-name").on('OPTION_CHANGE', function(event, value, data) {
          sortType = (data != null ? data.id : void 0) || value;
          return filter.trigger('change');
        });
      },
      bindEditEvent: function(parameters, tpl, option) {
        var getChange, that;
        that = this;
        getChange = function() {
          var changeArray;
          changeArray = [];
          parameters.filter(function(e) {
            if (e.has('newValue') && (e.get("newValue") !== e.get("ParameterValue"))) {
              return changeArray.push(e.toJSON());
            }
          });
          return changeArray;
        };
        if (getChange().length) {
          $("[data-action='preview']").prop('disabled', false);
        }
        if (!option) {
          that.bindFilter(parameters, tpl);
        }
        if (!option) {
          $("#pg-filter-parameter-name").keyup(function() {
            return $(this).trigger('change');
          });
        }
        _.each(parameters.models, function(e) {
          var onChange;
          onChange = function() {
            $("[data-action='preview']").prop('disabled', false);
            if (this.value === "<engine-default>" || (this.value === "" && !e.get("ParameterValue"))) {
              e.unset('newValue');
            }
            if (e.isValidValue(this.value) || this.value === "") {
              $(this).removeClass("parsley-error");
              if (this.value !== "") {
                return e.set('newValue', this.value);
              }
            } else {
              return $(this).addClass("parsley-error");
            }
          };
          if (e.attributes.IsModifiable) {
            $(".slidebox").on('change', "[name='" + e.attributes.ParameterName + "']", onChange);
            return $(".slidebox").on('keyup', "[name='" + e.attributes.ParameterName + "']", onChange);
          }
        });
        if (!option) {
          return $("[data-action='preview']").click(function() {
            var data;
            data = getChange();
            _.each(data, function(e) {
              var _ref;
              if (((_ref = e.AllowedValues) != null ? _ref.split(',').length : void 0) > 1) {
                e.inputType = 'select';
                e.selections = e.AllowedValues.split(',');
              } else {
                e.inputType = 'input';
              }
            });
            that.manager.setSlide(tpl({
              data: data,
              preview: true
            }));
            $("#rds-pg-save").click(function() {
              return that.modifyParams(parameters, getChange());
            });
            return $("#pg-back-to-edit").click(function() {
              var checked;
              checked = [
                {
                  data: {
                    id: parameters.groupModel.id
                  }
                }
              ];
              return (that.getSlides().edit.bind(that))(tpl, checked);
            });
          });
        }
      },
      modifyParams: function(parameters, change) {
        var afterModify, changeMap;
        changeMap = {};
        _.each(change, function(e) {
          return changeMap[e.ParameterName] = e.newValue;
        });
        _.each(parameters.models, function(d) {
          return d.unset('newValue');
        });
        afterModify = this.afterModify.bind(this);
        this.switchAction('processing');
        return parameters.groupModel.modifyParams(changeMap).then(afterModify, afterModify);
      },
      afterModify: function(result) {
        this.manager.cancel();
        if ((result != null ? result.error : void 0)) {
          notification('error', "Parameter Group updated failed because of " + (result != null ? result.msg : void 0));
          return false;
        }
        return notification('info', "Parameter Group is updated.");
      },
      doAction: function(action, checked) {
        return this["do_" + action] && this["do_" + action]('do_' + action, checked);
      },
      do_create: function() {
        var afterCreated, data;
        if (!(($('#property-dbpg-name-create').parsley('validate')) && ($('#property-dbpg-desc-create').parsley('validate')))) {
          return false;
        }
        data = {
          "DBParameterGroupName": $("#property-dbpg-name-create").val(),
          'DBParameterGroupFamily': $("#property-family .selection").html().trim(),
          'Description': $('#property-dbpg-desc-create').val()
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
      do_edit: function(invalid, checked) {

        /*
         */
      },
      do_reset: function(invalid, checked) {
        var afterReset, sourceDbpg;
        sourceDbpg = checked[0];
        this.switchAction('processing');
        afterReset = this.afterReset.bind(this);
        return this.collection.findWhere({
          id: sourceDbpg.data.id
        }).resetParams().then(afterReset, afterReset);
      },
      afterCreated: function(result) {
        this.manager.cancel();
        if (result.error) {
          notification('error', "Create failed because of: " + result.msg);
          return false;
        }
        return notification('info', "New RDS Parameter Group is created successfully!");
      },
      afterReset: function(result) {
        var currentRegion;
        currentRegion = Design.instance().get('region');
        this.manager.cancel();
        if (result.error) {
          notification('error', result.awsResult);
          return false;
        }
        return notification('info', "RDS Parameter Group is reset successfully!");
      },
      afterDeleted: function(result) {
        deleteCount--;
        if (result.error) {
          deleteErrorCount++;
        }
        if (deleteCount === 0) {
          if (deleteErrorCount > 0) {
            notification('error', deleteErrorCount + " RDS Parameter Group failed to delete, Please try again later.");
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
      renderDropdown: function() {
        var option, that;
        that = this;
        option = {
          manageBtnValue: lang.ide.PROP_VPC_MANAGE_RDS_PG,
          filterPlaceHolder: lang.ide.PROP_VPC_FILTER_RDS_PG
        };
        this.dropdown = new combo_dropdown(option);
        if (this.resModel && !this.resModel.attributes.pgName) {
          that.dropdown.setSelection("Please Select Parameter Group");
        } else {
          this.dropdown.setSelection(this.resModel.attributes.pgName);
        }
        this.dropdown.on('open', this.initDropdown.bind(this), this);
        this.dropdown.on('manage', this.renderManager.bind(this), this);
        this.dropdown.on('filter', this.filterDropdown.bind(this), this);
        this.dropdown.on('change', this.setParameterGroup.bind(this), this);
        return this.dropdown;
      },
      initDropdown: function() {
        if (App.user.hasCredential()) {
          return this.renderDefault();
        } else {
          return this.renderNoCredential();
        }
      },
      renderDefault: function() {
        if (!fetched) {
          this.renderLoading();
          this.collection.fetch().then((function(_this) {
            return function() {
              return _this.renderDefault();
            };
          })(this));
          fetched = true;
          return false;
        }
        return this.openDropdown();
      },
      renderNoCredential: function() {
        return this.dropdown.render('nocredential').toggleControls(false);
      },
      renderLoading: function() {
        return this.dropdown.render('loading').toggleControls(false);
      },
      openDropdown: function(keys) {
        var content, data, datas, defaultInfo, engineCol, modelData, regionName, selected, targetFamily;
        data = this.collection.toJSON();
        selected = this.resModel.attributes.pgName;
        _.each(data, function(e) {
          if (e.DBParameterGroupName === selected) {
            return e.selected = true;
          }
        });
        datas = {
          keys: data
        };
        if (keys) {
          datas.keys = keys;
        }
        if (Design.instance().modeIsApp() || Design.instance().modeIsAppEdit()) {
          datas.isRunTime = true;
        }
        modelData = this.resModel.attributes;
        regionName = Design.instance().region();
        engineCol = CloudResources(constant.RESTYPE.DBENGINE, regionName);
        if (engineCol) {
          defaultInfo = engineCol.getDefaultByNameVersion(regionName, modelData.engine, modelData.engineVersion);
          targetFamily = defaultInfo.family;
        }
        console.log(modelData, defaultInfo);
        if (targetFamily) {
          datas.keys = _.filter(datas.keys, function(e) {
            return e.DBParameterGroupFamily === targetFamily;
          });
        }
        content = template.keys(datas);
        this.dropdown.toggleControls(true);
        return this.dropdown.setContent(content);
      },
      filterDropdown: function(keyword) {
        var hitKeys;
        hitKeys = _.filter(this.collection.toJSON(), function(data) {
          return data.id.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        if (keyword) {
          return this.openDropdown(hitKeys);
        } else {
          return this.openDropdown();
        }
      },
      setParameterGroup: function(value, data) {
        var val;
        val = value || data.id;
        return this.resModel.set("pgName", val);
      },
      getModalOptions: function() {
        var region, regionName, that;
        that = this;
        region = Design.instance().get('region');
        regionName = constant.REGION_SHORT_LABEL[region];
        return {
          title: "Manage RDS Parameter Group in " + regionName,
          slideable: true,
          context: that,
          buttons: [
            {
              icon: 'new-stack',
              type: 'create',
              name: 'Create RDS PG'
            }, {
              icon: 'edit',
              type: 'edit',
              disabled: true,
              name: ' Edit '
            }, {
              icon: 'reset',
              type: 'reset',
              disabled: true,
              name: 'Reset'
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
              name: 'Name',
              rowType: "string"
            }, {
              sortable: true,
              rowType: 'string',
              width: "30%",
              name: 'Family'
            }, {
              sortable: false,
              width: "40%",
              name: 'Description'
            }
          ]
        };
      }
    });
    return DbpgRes;
  });

}).call(this);
