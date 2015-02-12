(function() {
  define(['constant', '../OsPropertyView', './template', 'CloudResources', '../ossg/view', 'UI.selection', '../validation/ValidationBase'], function(constant, OsPropertyView, template, CloudResources, SgView, bindSelection, ValidationBase) {
    return OsPropertyView.extend({
      events: {
        "change .selection[data-target]": "updateAttribute",
        "select_dropdown_button_click .item-list": "addItem",
        "click .item-list .item": "editItem",
        "click .item-readable-list .item": "editItem",
        "select_item_add .item-list": "attachItem",
        "select_item_remove .item-list": "unAttachItem",
        "click .item-list .item .item-remove": "unAttachItemClick",
        "mousedown .item-list .item .item-remove": "unAttachItemMousedown"
      },
      initialize: function(options) {
        var that;
        that = this;
        this.targetModel = options.targetModel;
        this.panel = options.panel;
        this.selectTpl = {
          button: function() {
            return template.addButton();
          },
          sgItem: function(item) {
            return template.item({
              name: item.text
            });
          },
          sgOption: function(data) {
            var sgModel;
            sgModel = Design.instance().component(data.value);
            return template.option({
              name: data.text,
              ruleCount: sgModel.get('rules').length,
              memberCount: sgModel.getMemberList().length,
              description: sgModel.get('description')
            });
          }
        };
      },
      render: function() {
        var SGValid;
        SGValid = ValidationBase.getClass(constant.RESTYPE.OSSG);
        bindSelection(this.$el, this.selectTpl, new SGValid({
          view: this
        }));
        this.refreshList();
        return this;
      },
      refreshList: function() {
        var OSSGModel, allSGModels, attachedSGList, attachedSGModels, currentMode, sgList;
        currentMode = Design.instance().mode();
        if (this.targetModel && !this.targetModel.get('appId')) {
          currentMode = 'stack';
        }
        OSSGModel = Design.modelClassForType(constant.RESTYPE.OSSG);
        allSGModels = OSSGModel.allObjects();
        sgList = [];
        _.each(allSGModels, function(sgModel) {
          var sgName, sgUID;
          sgName = sgModel.get('name');
          sgUID = sgModel.get('id');
          return sgList.push({
            name: sgName,
            uid: sgUID,
            id: sgModel.id,
            ruleCount: sgModel.get('rules').length,
            memberCount: sgModel.getMemberList().length,
            description: sgModel.get('description')
          });
        });
        if (currentMode === 'stack' || currentMode === 'appedit') {
          if (this.targetModel) {
            attachedSGModels = this.targetModel.connectionTargets("OsSgAsso");
            attachedSGList = [];
            _.each(attachedSGModels, function(sgModel) {
              var sgUID;
              sgUID = sgModel.get('id');
              return attachedSGList.push(sgUID);
            });
            this.$el.html(template.stack({
              sgList: sgList,
              attachedSGList: attachedSGList.join(',')
            }));
          } else {
            this.$el.html(template.app({
              attachedSGList: sgList
            }));
          }
          return this.refreshRemoveState();
        } else {
          if (this.targetModel) {
            attachedSGModels = this.targetModel.connectionTargets("OsSgAsso");
            attachedSGList = [];
            _.each(attachedSGModels, function(sgModel) {
              return attachedSGList.push({
                id: sgModel.id,
                name: sgModel.get('name'),
                ruleCount: sgModel.get('rules').length,
                memberCount: sgModel.getMemberList().length,
                description: sgModel.get('description')
              });
            });
            return this.$el.html(template.app({
              attachedSGList: attachedSGList
            }));
          } else {
            return this.$el.html(template.app({
              attachedSGList: sgList
            }));
          }
        }
      },
      refreshRemoveState: function() {
        var attachedSGModels;
        if (this.targetModel) {
          attachedSGModels = this.targetModel.connectionTargets("OsSgAsso");
          if (attachedSGModels.length <= 1) {
            return this.$el.find('.item-list .item-remove').addClass('hide');
          } else {
            return this.$el.find('.item-list .item-remove').removeClass('hide');
          }
        }
      },
      getSelectItemModel: function($sgItem) {
        var sgId, sgModel;
        sgId = $sgItem.data('value') || $sgItem.data('id');
        sgModel = Design.instance().component(sgId);
        return sgModel;
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        value = $target.getValue();
      },
      addItem: function(event, value) {
        var $newItem, OSSGModel, oSSGModel, sgUID;
        OSSGModel = Design.modelClassForType(constant.RESTYPE.OSSG);
        if (value) {
          oSSGModel = new OSSGModel({
            name: value
          });
        } else {
          oSSGModel = new OSSGModel({});
        }
        sgUID = oSSGModel.get('id');
        this.attachItem(null, sgUID);
        this.refreshList();
        $newItem = this.$el.find('.item-list .item[data-value="' + sgUID + '"]');
        $newItem.click();
        return false;
      },
      editItem: function(event) {
        var $target, isReadable, sgModel, sgView;
        $target = $(event.currentTarget);
        sgModel = this.getSelectItemModel($target);
        sgView = new SgView({
          sgModel: sgModel,
          listView: this
        });
        isReadable = $target.parents('.item-readable-list').length;
        if (isReadable) {
          $target.parents('.item-readable-list').find('.item').removeClass('active');
          $target.addClass('active');
        }
        this.showFloatPanel(sgView.render().el, function() {
          if (isReadable) {
            return $target.removeClass('active');
          }
        });
        return false;
      },
      attachItem: function(event, sgUID) {
        var sgModel;
        sgModel = Design.instance().component(sgUID);
        sgModel.attachSG(this.targetModel);
        return this.refreshRemoveState();
      },
      unAttachItem: function(event, sgUID) {
        var sgModel;
        sgModel = Design.instance().component(sgUID);
        sgModel.unAttachSG(this.targetModel);
        return this.refreshRemoveState();
      },
      unAttachItemClick: function(event) {
        var $sgItem, $target, sgModel;
        $target = $(event.currentTarget);
        $sgItem = $target.parents('.item');
        sgModel = this.getSelectItemModel($sgItem);
        sgModel.unAttachSG(this.targetModel);
        this.refreshList();
        return false;
      }
    }, {
      handleTypes: ['ossglist'],
      handleModes: ['stack', 'appedit', 'app']
    });
  });

}).call(this);
