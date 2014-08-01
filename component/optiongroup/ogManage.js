(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant', 'CloudResources', 'toolbar_modal', './component/optiongroup/ogTpl', 'i18n!/nls/lang.js', 'event', 'UI.modalplus'], function(constant, CloudResources, toolbar_modal, template, lang, ide_event, modalplus) {
    var capitalizeKey, valueInRange;
    valueInRange = function(start, end) {
      return function(val) {
        val = +val;
        if (val > end || val < start) {
          return sprintf(lang.ide.RDS_VALUE_IS_NOT_ALLOWED, val);
        }
        return null;
      };
    };
    capitalizeKey = function(arr) {
      var a, k, newK, obj, returnArr, v, _i, _len;
      returnArr = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        a = arr[_i];
        obj = {};
        for (k in a) {
          v = a[k];
          newK = k.charAt(0).toUpperCase() + k.substring(1);
          obj[newK] = v;
        }
        returnArr.push(obj);
      }
      return returnArr;
    };
    return Backbone.View.extend({
      id: 'modal-option-group',
      tagName: 'section',
      className: 'modal-toolbar',
      events: {
        'click .option-item .switcher': 'optionChanged',
        'click .option-item .option-edit-btn': 'optionEditClicked',
        'click .cancel': 'cancel',
        'click .add-option': 'addOption',
        'click .save-btn': 'saveClicked',
        'click .remove-btn': 'removeClicked',
        'click .cancel-btn': 'cancelClicked',
        'submit form': 'doNothing',
        'click #og-sg input': 'changeSg',
        'click .remove-confirm': 'removeConfirm',
        'click .remove-cancel': 'removeCancel',
        'change #option-apply-immediately': 'changeApplyImmediately'
      },
      changeApplyImmediately: function(e) {
        return this.model.set('applyImmediately', e.currentTarget.checked);
      },
      changeSg: function(e) {
        var checked, sgCbs;
        checked = e.currentTarget.checked;
        sgCbs = $('#og-sg input:checked');
        if (!sgCbs.length) {
          return false;
        }
        return null;
      },
      doNothing: function() {
        return false;
      },
      getModalOptions: function() {
        return {
          title: lang.ide.RDS_EDIT_OPTION_GROUP,
          classList: 'option-group-manage',
          context: that
        };
      },
      isAppPortChanged: function() {
        var appData, appId, appOptions, that, _ref;
        if (!this.isAppEdit) {
          return false;
        }
        appId = this.ogModel.get('appId');
        appData = (_ref = CloudResources(constant.RESTYPE.DBOG, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
        if (!appData) {
          return false;
        }
        appOptions = {};
        that = this;
        _.each(appData.Options, function(option) {
          return appOptions[option.OptionName] = option;
        });
        return _.some(appOptions, function(option, name) {
          return +that.ogDataStore[name].Port !== +option.Port;
        });
      },
      initModal: function(tpl) {
        var options, that;
        that = this;
        options = {
          template: tpl,
          title: lang.ide.RDS_EDIT_OPTION_GROUP,
          disableFooter: true,
          disableClose: true,
          width: '855px',
          height: '473px',
          compact: true,
          hideClose: true
        };
        this.__modalplus = new modalplus(options);
        this.__modalplus.on('closed', this.close, this);
        return null;
      },
      initialize: function(option) {
        var engineOptions, optionAry, optionCol, that;
        that = this;
        this.isAppEdit = Design.instance().modeIsAppEdit();
        this.dropdown = option.dropdown;
        this.isCreate = option.isCreate;
        this.dbInstance = option.dbInstance;
        optionCol = CloudResources(constant.RESTYPE.DBENGINE, Design.instance().region());
        engineOptions = optionCol.getOptionGroupsByEngine(Design.instance().region(), option.engine);
        if (engineOptions) {
          this.ogOptions = engineOptions[option.version];
        }
        this.ogModel = option.model;
        this.ogNameOptionMap = {};
        this.ogDataStore = {};
        optionAry = this.ogModel.get('options');
        _.each(optionAry, function(option) {
          that.ogDataStore[option.OptionName] = option;
          return null;
        });
        _.each(this.ogOptions, function(option) {
          that.ogNameOptionMap[option.Name] = option;
          if (that.ogDataStore[option.Name]) {
            option.checked = true;
          } else {
            option.checked = false;
          }
          if (that.isAppEdit && (option.Permanent || option.Persistent) && that.ogModel.get('appId')) {
            option.unmodify = true;
          } else {
            option.unmodify = false;
          }
          return null;
        });
        return null;
      },
      render: function() {
        var ogData;
        ogData = this.ogModel.toJSON();
        ogData.isCreate = this.isCreate;
        ogData.isAppEdit = this.isAppEdit;
        ogData.engineType = this.ogModel.engineType();
        ogData.isAppPortChanged = this.isAppPortChanged();
        this.$el.html(template.og_modal(ogData));
        this.initModal(this.el);
        this.renderOptionList();
        this.__modalplus.resize();
        return this;
      },
      renderOptionList: function() {
        return this.$el.find('.option-list').html(template.og_option_item({
          ogOptions: this.ogOptions,
          isAppEdit: this.isAppEdit
        }));
      },
      slide: function(option, callback) {
        var data;
        if (!option.DefaultPort && !option.OptionGroupOptionSettings) {
          callback({
            Port: '',
            VpcSecurityGroupMemberships: [],
            OptionSettings: []
          });
          return;
        }
        this.optionCb = callback;
        data = this.ogDataStore[option.Name];
        this.renderSlide(option, data);
        return this.$('.slidebox').addClass('show');
      },
      slideUp: function() {
        return this.$('.slidebox').removeClass('show');
      },
      cancel: function() {
        this.slideUp();
        if (typeof this.optionCb === "function") {
          this.optionCb(null);
        }
        return null;
      },
      removeConfirm: function() {
        this.ogModel.remove();
        this.dropdown.setSelection(this.dbInstance.getOptionGroupName());
        this.dropdown.refresh();
        this.slideUp();
        return this.__modalplus.close();
      },
      removeCancel: function() {
        return this.slideUp();
      },
      addOption: function(e) {
        var data, form, optionName, port, sgCbs;
        optionName = $(e.currentTarget).data('optionName');
        form = $('form');
        if (!form.parsley('validate')) {
          this.$('.error').html(lang.ide.RDS_SOME_ERROR_OCCURED);
          return;
        }
        data = {
          OptionSettings: capitalizeKey(form.serializeArray())
        };
        port = $('#og-port').val();
        sgCbs = $('#og-sg input:checked');
        data.Port = port || '';
        data.VpcSecurityGroupMemberships = [];
        sgCbs.each(function() {
          return data.VpcSecurityGroupMemberships.push(Design.instance().component($(this).data('uid')).createRef('GroupId'));
        });
        if (typeof this.optionCb === "function") {
          this.optionCb(data);
        }
        this.ogDataStore[optionName] = data;
        this.slideUp();
        return null;
      },
      renderSlide: function(option, data) {
        var arr, end, i, s, start, _i, _len, _ref;
        option = jQuery.extend(true, {}, option);
        if (option.OptionGroupOptionSettings && !_.isArray(option.OptionGroupOptionSettings)) {
          option.OptionGroupOptionSettings = [option.OptionGroupOptionSettings];
        }
        if (option.DefaultPort) {
          option.port = (data != null ? data.Port : void 0) || option.DefaultPort;
          option.sgs = [];
          Design.modelClassForType(constant.RESTYPE.SG).each(function(obj) {
            var json, _ref;
            json = obj.toJSON();
            json["default"] = obj.isDefault();
            json.color = obj.color;
            json.ruleCount = obj.ruleCount();
            json.memberCount = obj.getMemberList().length;
            if (data && data.VpcSecurityGroupMemberships) {
              if (_ref = obj.createRef('GroupId'), __indexOf.call(data.VpcSecurityGroupMemberships, _ref) >= 0) {
                json.checked = true;
              }
            }
            if (json["default"]) {
              if (!data) {
                json.checked = true;
              }
              return option.sgs.unshift(json);
            } else {
              return option.sgs.push(json);
            }
          });
        }
        _ref = option.OptionGroupOptionSettings || [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          s = _ref[i];
          if (s.AllowedValues.indexOf(',') >= 0) {
            s.items = _.map(s.AllowedValues.split(','), function(v) {
              return {
                value: v,
                selected: data && v === data.OptionSettings[i].Value
              };
            });
          } else if (s.AllowedValues.indexOf('-') >= 0) {
            arr = s.AllowedValues.split('-');
            start = +arr[0];
            end = +arr[1];
            s.start = start;
            s.end = end;

            /*
            if end - start < 10
                s.items = _.range start, end + 1
             */
          }
          if (s.items) {
            s.AllowedValues = '';
          }
          if (data) {
            s.value = data.OptionSettings[i].Value;
          } else {
            s.value = s.DefaultValue;
          }
        }
        this.$('.form').html(template.og_slide(option || {}));
        this.$('.error').html('');
        $('form input').each(function() {
          var $this;
          $this = $(this);
          start = +$this.data('start');
          end = +$this.data('end');
          if (start && end) {
            return $this.parsley('custom', valueInRange(start, end));
          }
        });
        return null;
      },
      renderRemoveConfirm: function() {
        this.$('.slidebox').addClass('show');
        return this.$('form').html(template.og_slide_remove({}));
      },
      processCol: function() {
        return this.renderList({});
      },
      renderList: function(data) {
        return this.modal.setContent(template.modal_list(data));
      },
      renderNoCredential: function() {
        return this.modal.render('nocredential').toggleControls(false);
      },
      renderSlides: function(which, checked) {
        var slides, tpl, _ref;
        tpl = template["slide_" + which];
        slides = this.getSlides();
        return (_ref = slides[which]) != null ? _ref.call(this, tpl, checked) : void 0;
      },
      close: function() {
        this.optionCb = null;
        return this.remove();
      },
      handleApplyImmediately: function() {
        if (this.isAppPortChanged()) {
          return this.$('#option-apply-immediately').prop('disabled', true).prop('checked', true).parent().data('tooltip', lang.ide.RDS_PORT_CHANGE_REQUIRES_APPLIED_IMMEDIATELY);
        } else {
          return this.$('#option-apply-immediately').prop('disabled', false).parent().removeAttr('data-tooltip');
        }
      },
      optionChanged: function(event) {
        var $optionEdit, $optionItem, $switcher, optionIdx, optionName, that;
        that = this;
        $switcher = $(event.currentTarget);
        $optionEdit = $switcher.siblings('.option-edit-btn');
        $switcher.toggleClass('on');
        $optionItem = $switcher.parents('.option-item');
        optionIdx = Number($optionItem.data('idx'));
        optionName = $optionItem.data('name');
        if ($switcher.hasClass('on')) {
          $optionEdit.removeClass('invisible');
          this.slide(this.ogOptions[optionIdx], function(optionData) {
            if (optionData) {
              return that.ogDataStore[optionName] = optionData;
            } else {
              return that.setOption($optionItem, false);
            }
          });
          this.handleApplyImmediately();
        } else {
          $optionEdit.addClass('invisible');
        }
        return null;
      },
      optionEditClicked: function(event) {
        var $optionEdit, $optionItem, optionIdx, optionName, that;
        that = this;
        $optionEdit = $(event.currentTarget);
        $optionItem = $optionEdit.parents('.option-item');
        optionIdx = Number($optionItem.data('idx'));
        optionName = $optionItem.data('name');
        return this.slide(this.ogOptions[optionIdx], function(optionData) {
          if (optionData) {
            that.ogDataStore[optionName] = optionData;
          }
          return this.handleApplyImmediately();
        });
      },
      setOption: function($item, value) {
        var $optionEdit, $switcher;
        $switcher = $item.find('.switcher');
        $optionEdit = $switcher.siblings('.option-edit-btn');
        if (value) {
          $switcher.addClass('on');
          return $optionEdit.removeClass('invisible');
        } else {
          $switcher.removeClass('on');
          return $optionEdit.addClass('invisible');
        }
      },
      getOption: function($item) {
        var $switcher;
        $switcher = $item.find('.switcher');
        return $switcher.hasClass('on');
      },
      getOptionByName: function(ogName) {
        var $switcher;
        $switcher = this.$('.option-list .option-item[data-name="' + ogName + '"]').find('.switcher');
        return $switcher.hasClass('on');
      },
      saveClicked: function() {
        var $ogDesc, $ogItemList, $ogName, isRightDepend, ogDataAry, ogDesc, ogName, that;
        that = this;
        $ogName = this.$('.og-name');
        $ogDesc = this.$('.og-description');
        $ogName.parsley('custom', function(val) {
          var errTip;
          errTip = 'Option group name invalid';
          if (val[val.length - 1] === '-' || (val.indexOf('--') !== -1)) {
            return errTip;
          }
          if (val.length < 1 || val.length > 255) {
            return errTip;
          }
          if (!MC.validate('letters', val[0])) {
            return errTip;
          }
        });
        $ogDesc.parsley('custom', function(val) {
          var errTip;
          errTip = 'Option group description invalid';
          if (val.length < 1) {
            return errTip;
          }
        });
        isRightDepend = true;
        $ogItemList = that.$('.option-list .option-item');
        _.each($ogItemList, function(ogItem) {
          var $ogItem, dependAry, dependName, errTip, needAry, ogDefine, ogName, option;
          $ogItem = $(ogItem);
          option = that.getOption($ogItem);
          if (option) {
            ogName = $ogItem.data('name');
            ogDefine = that.ogNameOptionMap[ogName];
            if (ogDefine.OptionsDependedOn && ogDefine.OptionsDependedOn.OptionName) {
              dependName = ogDefine.OptionsDependedOn.OptionName;
              dependAry = dependName.split(',');
              needAry = [];
              _.each(dependAry, function(depend) {
                var isOn;
                isOn = that.getOptionByName(depend);
                if (!isOn) {
                  return needAry.push(depend);
                }
              });
              if (needAry.length) {
                isRightDepend = false;
                errTip = "" + ogName + " depend on " + (needAry.join(',')) + " option.";
                that.$('.err-tip').text(errTip);
              }
            }
          }
          return null;
        });
        if (!isRightDepend) {
          return;
        }
        if ($ogName.parsley('validate') && $ogDesc.parsley('validate')) {
          ogName = $ogName.val();
          ogDesc = $ogDesc.val();
          this.ogModel.set('name', ogName);
          this.ogModel.set('description', ogDesc);
          ogDataAry = [];
          $ogItemList = this.$('.option-list .option-item');
          _.each($ogItemList, function(ogItem) {
            var $ogItem, ogData, option;
            $ogItem = $(ogItem);
            option = that.getOption($ogItem);
            if (option) {
              ogName = $ogItem.data('name');
              ogData = that.ogDataStore[ogName];
              ogData.OptionName = ogName;
              ogDataAry.push(ogData);
            }
            return null;
          });
          this.ogModel.set('options', ogDataAry);
          this.dropdown.refresh();
          this.__modalplus.close();
          return null;
        }
      },
      removeClicked: function() {
        var that;
        that = this;
        return this.renderRemoveConfirm();
      },
      cancelClicked: function() {
        var that;
        that = this;
        if (this.isCreate) {
          this.ogModel.remove();
        }
        return this.__modalplus.close();
      }
    });
  });

}).call(this);
