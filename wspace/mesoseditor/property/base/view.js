var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

define(['constant', 'i18n!/nls/lang.js', 'backbone', 'jquery', 'handlebars', 'UI.selectbox', 'UI.notification', 'UI.multiinputbox', 'UI.modal', 'UI.selectbox', 'MC.validate', 'UI.parsley', 'UI.tooltip', 'UI.sortable', 'UI.tablist'], function(constant, lang) {

  /*
  
  -------------------------------
   PropertyView is a base class that every property view should inherit.
  -------------------------------
  
  ++ Class attributes ( Extra attributes from Backbone.View ) ++
  
   * model : PropertyModel
      description : This attributes points to the model that is associated with the view.
  
  
  
  ++ Class Protocol ( Should be implemented by user ) ++
  
   * render :
      description : In this method, user should render its content to `this.$el`. If this method returns a string, it is consider as the title of the property, thus you don't have to call `setTile`.
  
  
  
  ++ Class Method ++
   * forceShow :
      description : Call this method before focusing a input of property panel. This method ensure the property panel is not hidden.
   */
  var PropertyView, subViews, trash;
  trash = [];
  subViews = [];
  PropertyView = Backbone.View.extend({
    __addToTrash: function(garbage) {
      if (__indexOf.call(trash, garbage) < 0) {
        return trash.push(garbage);
      }
    },
    __clearTrash: function() {
      var t, _i, _len;
      for (_i = 0, _len = trash.length; _i < _len; _i++) {
        t = trash[_i];
        if (_.isObject(t) && t.remove) {
          t.__removeSubView();
        }
      }
      trash = [];
      return this;
    },
    __removeSubView: function() {
      var subView, _i, _len;
      for (_i = 0, _len = subViews.length; _i < _len; _i++) {
        subView = subViews[_i];
        if (_.isObject(subView) && _.isFunction(subView.remove)) {
          subView.remove();
        }
      }
      return subViews = [];
    },
    addSubView: function(view) {
      if (__indexOf.call(subViews, view) < 0) {
        return subViews.push(view);
      }
    },
    setTitle: function(title) {
      $("#OEPanelRight").find(this._isSub ? ".property-second-title" : ".property-title").text(title);
    },
    prependTitle: function(additionalTitle) {
      $("#OEPanelRight").find(this._isSub ? ".property-second-title" : ".property-title").prepend(additionalTitle);
    },
    forceShow: function() {
      $("#OEPanelRight").trigger("FORCE_SHOW");
      return null;
    },
    disabledAllOperabilityArea: function(disabled) {
      var divTmpl;
      if (disabled) {
        if ($("#OpsEditor").children(".disabled-event-layout").length) {
          return;
        }
        divTmpl = '<div class="disabled-event-layout"></div>';
        $('#OpsEditor').append(divTmpl);
        return $('#tabbar-wrapper').append(divTmpl);
      } else {
        return $('.disabled-event-layout').remove();
      }
    },
    _load: function() {
      var $new_panel, $panel;
      this.__clearTrash();
      this.__addToTrash(this);
      $panel = $("#OEPanelRight").find(".property-first-panel").find(".property-details");
      $new_panel = $("<div class='scroll-content property-content property-details'></div>").insertAfter($panel);
      $panel.empty().remove();
      this._resetImmediatelySection();
      this.setElement($new_panel);
      this.render();
      this.focusImportantInput();
      return null;
    },
    _resetImmediatelySection: function() {
      $('.apply-immediately-section').remove();
      return $('.property-panel-wrapper').removeClass('immediately');
    },
    _loadAsSub: function(subPanelID) {
      var that;
      if (this.__restore) {
        $("#OEPanelRight").trigger("OPEN_SUBPANEL_IMM");
      } else {
        $("#OEPanelRight").trigger("OPEN_SUBPANEL");
      }
      this.setElement($("#OEPanelRight").find(".property-second-panel .property-content"));
      this.render();
      that = this;
      setTimeout((function() {
        return that.focusImportantInput();
      }), 200);
      return null;
    },
    _render: function() {
      var resComp, resUID, result;
      result = this._originalRender();
      selectbox.init();
      if (_.isString(result)) {
        resUID = this.model.get('uid');
        if (resUID) {
          resComp = Design.instance().component(resUID);
          if (resComp && (resComp.type === constant.RESTYPE.SG || resComp.type === constant.RESTYPE.DBINSTANCE)) {
            return null;
          }
        }
        this.setTitle(result);
      } else {
        return result;
      }
      return null;
    },
    focusImportantInput: function() {
      var $emptyInput, that;
      that = this;
      $emptyInput = that.$el.find("input[data-empty-remove]").filter(function() {
        return !this.value.length;
      });
      if ($emptyInput.length) {
        setTimeout(function() {
          that.forceShow();
          $emptyInput.focus();
          return that.disabledAllOperabilityArea(true);
        }, 0);
      }
      return null;
    }
  });
  PropertyView.extend = function(protoProps, staticProps) {
    if (protoProps.render) {
      protoProps._originalRender = protoProps.render;
      protoProps.render = PropertyView.prototype._render;
    }
    return Backbone.View.extend.call(this, protoProps, staticProps);
  };
  return PropertyView;
});
