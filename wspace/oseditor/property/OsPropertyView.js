(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['constant'], function(constant) {
    var OsPropertyView, __propertyViewMap;
    __propertyViewMap = {
      stack: {},
      app: {},
      appedit: {}
    };
    OsPropertyView = Backbone.View.extend({
      events: {
        'change .selection[data-target]': 'updateAttribute'
      },
      constructor: function(options) {
        if (options && _.isObject(options)) {
          _.extend(this, options);
        }
        this.__subViews = [];
        return Backbone.View.apply(this, arguments);
      },
      reg: function(subView) {
        if (__indexOf.call(this.__subViews, subView) >= 0) {
          return subView;
        }
        if (subView === this) {
          return subView;
        }
        this.__subViews.push(subView);
        _.extend(subView, _.pick(this, 'propertyPanel', 'panel', 'workspace'));
        subView.__superView = this;
        return subView;
      },
      remove: function() {
        var sv, _i, _len, _ref;
        _ref = this.__subViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sv = _ref[_i];
          if (sv != null) {
            if (typeof sv.remove === "function") {
              sv.remove();
            }
          }
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      getRenderData: function() {
        return _.extend({}, this.getExtendJson(), this.getModelJson());
      },
      getExtendJson: function() {
        return {
          modeIsApp: this.modeIsApp(),
          modeIsAppEdit: this.modeIsAppEdit(),
          modeIsStack: this.modeIsStack()
        };
      },
      getModelJson: function() {
        var _ref, _ref1;
        switch (false) {
          case !this.modeIsStack():
            return this.model.toJSON();
          case !this.modeIsApp():
            return (_ref = this.appModel) != null ? _ref.toJSON() : void 0;
          case !this.modeIsAppEdit():
            return _.extend(this.model.toJSON(), {
              app: (_ref1 = this.appModel) != null ? _ref1.toJSON() : void 0
            });
        }
      },

      /*
      events:
          'change [data-target]': 'updateAttribute'
       */
      updateAttribute: function(e) {
        var $target, attr, value, _ref;
        $target = $(e.currentTarget);
        attr = $target.data('target');
        if (!attr) {
          return;
        }
        value = $target.getValue();
        if ((_ref = this.getModelForUpdateAttr(e)) != null) {
          _ref.set(attr, value);
        }
        if (attr === 'name') {
          return this.setTitle(value);
        }
      },
      getModelForUpdateAttr: function() {
        return this.model;
      },
      getPanel: function() {
        var _ref;
        return this.panel || ((_ref = this.__superView) != null ? _ref.panel : void 0);
      },
      getPropertyPanel: function() {
        var _ref;
        return this.propertyPanel || ((_ref = this.__superView) != null ? _ref.propertyPanel : void 0);
      },
      getModelForMode: function() {
        return this.model;
      },
      mode: function() {
        var mod, model;
        model = this.getModelForMode();
        if (!model) {
          return '';
        }
        mod = Design.instance().mode();
        if (mod === 'appedit' && !model.get('appId')) {
          mod = 'stack';
        }
        return mod;
      },
      modeIsApp: function() {
        return this.mode() === 'app';
      },
      modeIsAppEdit: function() {
        return this.mode() === 'appedit';
      },
      modeIsStack: function() {
        return this.mode() === 'stack';
      },
      getTitle: function() {
        var _ref;
        return (_ref = this.model) != null ? _ref.get('name') : void 0;
      },
      setTitle: function() {
        var _ref;
        return (_ref = this.getPropertyPanel()) != null ? _ref.setTitle.apply(this.getPropertyPanel(), arguments) : void 0;
      },
      showFloatPanel: function() {
        var _ref;
        return (_ref = this.getPanel()) != null ? _ref.showFloatPanel.apply(this.getPanel(), arguments) : void 0;
      },
      hideFloatPanel: function() {
        var _ref;
        return (_ref = this.getPanel()) != null ? _ref.hideFloatPanel.apply(this.getPanel(), arguments) : void 0;
      },
      beforeRender: function() {
        var _ref;
        return (_ref = this.getPanel()) != null ? _ref.hideFloatPanel() : void 0;
      },
      afterRender: function() {}
    }, {
      extend: function(protoProps, staticProps) {
        var childClass, handleModes, handleTypes;
        childClass = Backbone.View.extend.apply(this, arguments);
        delete childClass.register;
        delete childClass.getClass;
        if (_.isFunction(childClass.prototype.render)) {
          childClass.prototype.originalRender = childClass.prototype.render;
          childClass.prototype.render = function() {
            var result;
            this.beforeRender();
            result = this.originalRender();
            this.afterRender();
            return result;
          };
        }
        if (staticProps) {
          handleTypes = staticProps.handleTypes;
          handleModes = staticProps.handleModes;
          OsPropertyView.register(handleTypes, handleModes, childClass);
        }
        return childClass;
      },
      register: function(handleTypes, handleModes, modelClass) {
        var mode, type, _i, _j, _len, _len1;
        for (_i = 0, _len = handleModes.length; _i < _len; _i++) {
          mode = handleModes[_i];
          for (_j = 0, _len1 = handleTypes.length; _j < _len1; _j++) {
            type = handleTypes[_j];
            __propertyViewMap[mode][type] = modelClass;
          }
        }
        return null;
      },
      getClass: function(mode, type) {
        return __propertyViewMap[mode][type];
      }
    });
    return OsPropertyView;
  });

}).call(this);
