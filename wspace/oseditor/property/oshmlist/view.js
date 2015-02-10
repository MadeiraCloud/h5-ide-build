(function() {
  define(['constant', '../OsPropertyView', './stack', './app', 'CloudResources', '../oshm/view', 'UI.selection', '../validation/ValidationBase'], function(constant, OsPropertyView, TplStack, TplApp, CloudResources, HmView, bindSelection, ValidationBase) {
    return OsPropertyView.extend({
      events: {
        "change .selection[data-target]": "updateAttribute",
        "select_dropdown_button_click .item-list": "addItem",
        "click .item-list .item": "editItem",
        "click .item-readable-list .item": "viewItem",
        "click .item-list .item .item-remove": "removeItem"
      },
      initialize: function(options) {
        var that;
        this.targetModel = options.targetModel;
        this.isApp = options.isApp;
        if (this.isApp) {
          this.appModelList = this.targetModel;
          delete this.targetModel;
        }
        that = this;
        return this.selectTpl = {
          button: function() {
            return that.getTpl().addButton();
          },
          getItem: function(item) {
            return that.getTpl().item(that.getItemData(item));
          }
        };
      },
      getModelForMode: function() {
        return this.targetModel;
      },
      getItemData: function(item) {
        return Design.instance().component(item.value).toJSON();
      },
      getAppData: function() {
        var HmClass;
        HmClass = Design.modelClassForType(constant.RESTYPE.OSHM);
        return _.map(this.appModelList, function(model) {
          var json, oshm;
          json = model.toJSON();
          oshm = HmClass.find(function(hm) {
            return hm.get('appId') === json.id;
          });
          json.name = oshm != null ? oshm.get('name') : void 0;
          return json;
        });
      },
      getSingleAppData: function(id) {
        return _.findWhere(this.getAppData(), {
          id: id
        });
      },
      getTpl: function() {
        if (this.isApp) {
          return TplApp;
        } else {
          return TplStack;
        }
      },
      render: function() {
        var HMValid;
        HMValid = ValidationBase.getClass(constant.RESTYPE.OSHM);
        bindSelection(this.$el, this.selectTpl, new HMValid({
          view: this
        }));
        if (this.isApp) {
          this.renderApp();
        } else {
          this.refreshList();
        }
        return this;
      },
      refreshList: function() {
        var list;
        list = this.targetModel.get("healthMonitors").map(function(hm) {
          return hm.toJSON();
        });
        return this.$el.html(this.getTpl().stack({
          activeList: this.targetModel.get("healthMonitors").map(function(hm) {
            return hm.id;
          }).join(','),
          list: list,
          mustShowList: !this.isApp
        }));
      },
      renderApp: function() {
        return this.$el.html(this.getTpl().stack({
          list: this.getAppData()
        }));
      },
      getSelectItemModel: function($item) {
        var uid;
        uid = $item.data('value');
        return Design.instance().component(uid);
      },
      updateAttribute: function(event) {
        var $target, attr, value;
        $target = $(event.currentTarget);
        attr = $target.data('target');
        return value = $target.getValue();
      },
      addItem: function(event, value) {
        var $newItem, monitor;
        monitor = this.targetModel.addNewHm(value);
        this.refreshList();
        $newItem = this.$el.find('.item-list .item[data-value="' + monitor.get('id') + '"]');
        return $newItem.click();
      },
      editItem: function(event) {
        var $target, model, view;
        $target = $(event.currentTarget);
        model = this.getSelectItemModel($target);
        view = this.reg(new HmView({
          model: model,
          isApp: this.isApp
        }));
        this.listenTo(model, 'change', this.refreshList);
        return this.showFloatPanel(view.render().el);
      },
      viewItem: function(event) {
        var $target, id, modelData, view;
        $target = $(event.currentTarget);
        $('.item-readable-list .item').removeClass('focus');
        $target.addClass('focus');
        id = $target.data('id');
        modelData = this.getSingleAppData(id);
        view = this.reg(new HmView({
          modelData: modelData,
          isApp: this.isApp
        }));
        return this.showFloatPanel(view.render().el);
      },
      removeItem: function(event) {
        var $target, id;
        $target = $(event.currentTarget);
        id = $target.closest('.item').data('value');
        this.targetModel.removeHm(id);
        this.refreshList();
        this.hideFloatPanel();
        return false;
      }
    }, {
      handleTypes: ['ossglist'],
      handleModes: ['stack', 'appedit']
    });
  });

}).call(this);
