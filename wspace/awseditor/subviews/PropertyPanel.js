(function() {
  define(["../template/TplRightPanel", "../property/base/main", 'StateEditor', "constant", "Design", "OpsModel", "event", 'CloudResources', "backbone", '../property/stack/main', '../property/instance/main', '../property/servergroup/main', '../property/connection/main', '../property/staticsub/main', '../property/missing/main', '../property/sg/main', '../property/sgrule/main', '../property/volume/main', '../property/elb/main', '../property/az/main', '../property/subnet/main', '../property/vpc/main', '../property/rtb/main', '../property/static/main', '../property/cgw/main', '../property/vpn/main', '../property/eni/main', '../property/acl/main', '../property/launchconfig/main', '../property/asg/main', '../property/dbinstance/main', '../property/subnetgroup/main'], function(RightPanelTpl, PropertyBaseModule, stateeditor, CONST, Design, OpsModel, ide_event, CloudResources) {
    var trimmedJqEventHandler;
    ide_event.onLongListen(ide_event.REFRESH_PROPERTY, function() {
      $("#OEPanelRight").trigger("REFRESH");
    });
    ide_event.onLongListen(ide_event.FORCE_OPEN_PROPERTY, function() {
      $("#OEPanelRight").trigger("FORCE_SHOW");
      $("#OEPanelRight").trigger("SHOW_PROPERTY");
    });
    ide_event.onLongListen(ide_event.SHOW_STATE_EDITOR, function(uid) {
      $("#OEPanelRight").trigger("SHOW_STATEEDITOR", [uid]);
    });
    ide_event.onLongListen(ide_event.OPEN_PROPERTY, function(type, uid) {
      $("#OEPanelRight").trigger("OPEN", [type, uid]);
    });
    trimmedJqEventHandler = function(funcName) {
      return function() {
        var trim;
        trim = Array.prototype.slice.call(arguments, 0);
        trim.shift();
        return this[funcName].apply(this, trim);
      };
    };
    return Backbone.View.extend({
      events: {
        "click .HideSecondPanel": "hideSecondPanel",
        "click .option-group-head": "updateRightPanelOption",
        "OPEN_SUBPANEL": trimmedJqEventHandler("showSecondPanel"),
        "HIDE_SUBPANEL": trimmedJqEventHandler("immHideSecondPanel"),
        "OPEN_SUBPANEL_IMM": trimmedJqEventHandler("immShowSecondPanel"),
        "OPEN": trimmedJqEventHandler("openPanel"),
        "SHOW_STATEEDITOR": "showStateEditor",
        "FORCE_SHOW": "forceShow",
        "REFRESH": "refresh",
        "SHOW_PROPERTY": "switchToProperty",
        "click #btn-switch-property": "switchToProperty",
        "click #btn-switch-state": "showStateEditor"
      },
      initialize: function(options) {
        _.extend(this, options);
        return this.render();
      },
      render: function() {
        this.setElement(this.parent.$el.find(".OEPanelRight").html(RightPanelTpl()));
        this.$el.toggleClass("hidden", this.__rightPanelHidden || false);
        if (this.__backup) {
          PropertyBaseModule.restore(this.__backup);
          this.restoreAccordion(this.__backup.activeModuleType, this.__backup.activeModuleId);
        } else {
          this.openPanel();
        }
        if (this.__showingState) {
          this.showStateEditor();
        }
      },
      backup: function() {
        this.$el.empty().attr("id", "");
        this.__backup = PropertyBaseModule.snapshot();
      },
      recover: function() {
        this.$el.attr("id", "OEPanelRight");
        this.render();
      },
      toggleRightPanel: function() {
        this.__rightPanelHidden = this.$el.toggleClass("hidden").hasClass("hidden");
        return null;
      },
      showSecondPanel: function(type, id) {
        this.$el.find(".HideSecondPanel").data("tooltip", "Back to " + this.$el.find(".property-title").text());
        this.$el.find(".property-second-panel").show().animate({
          left: "0%"
        }, 200);
        this.$el.find(".property-first-panel").animate({
          left: "-30%"
        }, 200, (function(_this) {
          return function() {};
        })(this));
        return this.$el.find(".property-first-panel").hide();
      },
      immShowSecondPanel: function(type, id) {
        this.$el.find(".HideSecondPanel").data("tooltip", "Back to " + this.$el.find(".property-title").text());
        this.$el.find(".property-second-panel").show().css({
          left: "0%"
        });
        this.$el.find(".property-first-panel").css({
          left: "-30%",
          display: "none"
        });
        return null;
      },
      immHideSecondPanel: function() {
        this.$el.find(".property-second-panel").css({
          display: "none",
          left: "100%"
        }).children(".scroll-wrap").children(".property-content").empty();
        this.$el.find(".property-first-panel").css({
          display: "block",
          left: "0px"
        });
        return null;
      },
      hideSecondPanel: function() {
        var $panel;
        $panel = this.$el.find(".property-second-panel");
        $panel.animate({
          left: "100%"
        }, 200, (function(_this) {
          return function() {
            return _this.$el.find(".property-second-panel").hide();
          };
        })(this));
        this.$el.find(".property-first-panel").show().animate({
          left: "0%"
        }, 200);
        PropertyBaseModule.onUnloadSubPanel();
        return false;
      },
      updateRightPanelOption: function(event) {
        var $target, $toggle, comp, hide, status;
        $toggle = $(event.currentTarget);
        if ($toggle.is("button") || $toggle.is("a")) {
          return;
        }
        hide = $toggle.hasClass("expand");
        $target = $toggle.next();
        if (hide) {
          $target.css("display", "block").slideUp(200);
        } else {
          $target.slideDown(200);
        }
        $toggle.toggleClass("expand");
        if (!$toggle.parents(".property-first-panel").length) {
          return;
        }
        this.__optionStates = this.__optionStates || {};
        comp = PropertyBaseModule.activeModule().uid || "Stack";
        status = _.map(this.$el.find('.property-first-panel').find('.option-group-head'), function(el) {
          return $(el).hasClass("expand");
        });
        this.__optionStates[comp] = status;
        comp = this.workspace.design.component(comp);
        if (comp) {
          this.__optionStates[comp.type] = status;
        }
        return false;
      },
      openPanel: function(type, uid) {
        var component, design, error, tab_type;
        if (this.__lastOpenType === type && this.__lastOpenId === uid && this.__showingState) {
          return;
        }
        this.__lastOpenType = type;
        this.__lastOpenId = uid;
        $(document.activeElement).filter("input, textarea").blur();
        this.immHideSecondPanel();
        design = this.workspace.design;
        if (!design) {
          return;
        }
        if (uid) {
          component = design.component(uid);
          if (component && component.type === type && design.modeIsApp() && component.get('appId') && !component.hasAppResource()) {
            type = component.type || 'Missing_Resource';
          }
        } else {
          type = "Stack";
        }
        if (design.modeIsApp() || design.modeIsAppView()) {
          tab_type = PropertyBaseModule.TYPE.App;
        } else if (design.modeIsStack()) {
          tab_type = PropertyBaseModule.TYPE.Stack;
        } else {
          if (!component || component.get("appId")) {
            tab_type = PropertyBaseModule.TYPE.AppEdit;
          } else {
            tab_type = PropertyBaseModule.TYPE.Stack;
          }
        }
        try {
          PropertyBaseModule.load(type, uid, tab_type);
        } catch (_error) {
          error = _error;
          console.error(error);
        }
        this.restoreAccordion(type, uid);
        this.updateStateSwitcher(type, uid);
        this.$el.toggleClass("state", false);
        this.__showingState = false;
      },
      restoreAccordion: function(type, uid) {
        var el, idx, states, _i, _len, _ref, _ref1;
        if (!this.__optionStates) {
          return;
        }
        states = this.__optionStates[uid];
        if (!states) {
          states = this.__optionStates[type];
        }
        if (states) {
          _ref = this.$el.find('.property-first-panel').find('.option-group-head');
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            el = _ref[idx];
            $(el).toggleClass("expand", states[idx]);
          }
          _ref1 = this.__optionStates;
          for (uid in _ref1) {
            states = _ref1[uid];
            if (!uid || this.workspace.design.component(uid) || uid.indexOf("i-") === 0 || uid === "Stack") {
              continue;
            }
            delete this.__optionStates[uid];
          }
        }
      },
      updateStateSwitcher: function(type, uid) {
        var count, design, supports, _ref;
        supports = false;
        design = this.workspace.design;
        if (type === "component_server_group" || type === CONST.RESTYPE.LC || type === CONST.RESTYPE.INSTANCE) {
          if (Design.instance().attributes.agent.enabled) {
            supports = true;
            $('#state-editor-body').trigger('SAVE_STATE');
          } else {
            supports = false;
          }
          if (design.modeIsApp()) {
            if (type === "component_server_group") {
              supports = false;
            }
            if (type === CONST.RESTYPE.LC) {
              supports = this.workspace.opsModel.testState(OpsModel.State.Stopped);
            }
          }
        }
        this.$el.toggleClass("no-state", !supports);
        if (supports) {
          count = design.component(uid) || design.component(PropertyBaseModule.activeModule().model.attributes.uid);
          count = (count != null ? (_ref = count.get("state")) != null ? _ref.length : void 0 : void 0) || 0;
          $('#btn-switch-state').find("b").text("(" + count + ")");
        }
        return supports;
      },
      forceShow: function() {
        var self;
        if (this.__rightPanelHidden) {
          this.__rightPanelHidden = false;
          this.$el.toggleClass("no-transition", true).removeClass("hidden");
          self = this;
          setTimeout(function() {
            return self.$el.removeClass("no-transition");
          }, 100);
        }
      },
      refresh: function() {
        var active;
        active = PropertyBaseModule.activeModule() || {};
        this.openPanel(active.handle, active.uid);
      },
      switchToProperty: function() {
        this.__showingState = false;
        this.$el.toggleClass("state", false);
        this.refresh();
      },
      showStateEditor: function(jqueryEvent, uid) {
        var allCompData, comp, compData, design, resId, _ref;
        if ((jqueryEvent != null ? jqueryEvent.type : void 0) === "SHOW_STATEEDITOR" && this.__showingState) {
          return false;
        }
        if (!uid) {
          uid = PropertyBaseModule.activeModule().uid;
        }
        design = this.workspace.design;
        comp = design.component(uid) || ((_ref = CloudResources(Design.instance().credentialId(), CONST.RESTYPE.INSTANCE, Design.instance().get('region')).findWhere({
          id: uid
        })) != null ? _ref.toJSON() : void 0);
        if (!comp) {
          return;
        }
        if (!comp.type) {
          comp.type = CONST.RESTYPE.INSTANCE;
        }
        if (!this.updateStateSwitcher(comp.type, uid)) {
          this.openPanel(comp.type, uid);
          return;
        }
        this.__showingState = true;
        this.$el.toggleClass("state", true);
        if (design.modeIsApp()) {
          uid = Design.modelClassForType(CONST.RESTYPE.INSTANCE).getEffectiveId(uid).uid;
        }
        allCompData = design.serialize().component;
        compData = allCompData[uid];
        if (comp && comp.id.indexOf('i-') === 0) {
          resId = comp.id;
        }
        stateeditor.loadModule(allCompData, uid, resId);
        this.forceShow();
      }
    });
  });

}).call(this);
