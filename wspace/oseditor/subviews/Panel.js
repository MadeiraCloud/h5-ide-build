(function() {
  define(['backbone', 'constant', '../template/TplPanel', './panels/ResourcePanel', './panels/ConfigPanel', './panels/PropertyPanel', "StateEditorView"], function(Backbone, constant, PanelTpl, ResourcePanel, ConfigPanel, PropertyPanel, StatePanel) {
    var Panels, __defaultArgs;
    Panels = {
      resource: ResourcePanel,
      config: ConfigPanel,
      property: PropertyPanel,
      state: StatePanel
    };
    __defaultArgs = {
      uid: '',
      type: 'default'
    };
    return Backbone.View.extend({
      events: {
        'click .anchor li': '__scrollTo',
        'click .option-group-head': '__updateRightPanelOption'
      },
      __openArgs: __defaultArgs,
      __currentPanel: 'resource',
      initialize: function(options) {
        _.extend(this, options);
        if (this.workspace.design.mode() === 'app') {
          this.__currentPanel = 'config';
        }
        return this.render();
      },
      render: function() {
        this.setElement(this.parent.$el.find(".OEPanelRight"));
        this.$el.html(PanelTpl({}));
        this.open(this.__currentPanel);
        return this;
      },
      renderSubPanel: function(subPanel, args) {
        var _ref;
        args = _.extend({
          workspace: this.workspace,
          panel: this
        }, args);
        $(document.activeElement).filter("input, textarea").blur();
        if ((_ref = this.subPanel) != null) {
          _ref.remove();
        }
        this.subPanel = new subPanel(args);
        this.$('.panel-body').html(this.subPanel.render().el);
        this.renderStateCount(args);
        return this.__restoreAccordion();
      },
      renderStateCount: function(args) {
        var $stateCount, serverModel, stateCount, states;
        $stateCount = this.parent.$el.find('.sidebar-title a.state .state-count');
        if (args && args.type === constant.RESTYPE.OSSERVER) {
          $stateCount.show();
          serverModel = Design.instance().component(args.uid);
          states = serverModel.get('state');
          stateCount = 0;
          if (states && _.isArray(states)) {
            stateCount = states.length;
          }
          return $stateCount.text(stateCount);
        } else {
          return $stateCount.hide();
        }
      },
      scrollTo: function(className) {
        var $container, $target, newTop, top;
        $container = this.$('.panel-body');
        $target = $("section." + className);
        top = $container.offset().top;
        newTop = $target.offset().top - top + $container.scrollTop();
        return $container.animate({
          scrollTop: newTop
        });
      },
      open: function(panelName, args) {
        var lastArgs, lastPanel, targetPanel;
        if (args == null) {
          args = this.__openArgs;
        }
        lastPanel = this.__currentPanel;
        lastArgs = _.extend({}, this.__openArgs);
        this.__openArgs = args;
        this.__currentPanel = panelName;
        targetPanel = Panels[panelName];
        if (!targetPanel) {
          return;
        }
        if (this.hidden()) {
          return;
        }
        this.$el.removeClass('hide');
        this.hideFloatPanel();
        this.$el.prop('class', "OEPanelRight " + panelName);
        this.$el.closest('#OpsEditor').find('.sidebar-title').prop('class', "sidebar-title " + panelName);
        this.renderSubPanel(targetPanel, args);
        return this;
      },
      floatPanelShowCount: 0,
      showFloatPanel: function(dom, callback) {
        this.floatPanelShowCount++;
        if (dom) {
          this.$('.panel-float').html(dom);
        }
        this.$('.panel-float').removeClass('hidden');
        return _.defer((function(_this) {
          return function() {
            return _this.$('.panel-body').one('click', _this.__hideFloatPanel(_this.floatPanelShowCount, callback));
          };
        })(this));
      },
      __hideFloatPanel: function(showCount, callback) {
        var that;
        that = this;
        return function() {
          if (showCount === that.floatPanelShowCount) {
            that.hideFloatPanel();
            return typeof callback === "function" ? callback() : void 0;
          }
        };
      },
      hideFloatPanel: function() {
        return this.$('.panel-float').addClass('hidden');
      },
      show: function() {
        this.$el.removeClass('hidden');
        return this;
      },
      hide: function() {
        this.$el.addClass('hidden');
        $('.sidebar-title').prop('class', 'sidebar-title');
        return this;
      },
      shown: function() {
        return !this.$el.hasClass('hidden');
      },
      hidden: function() {
        return !this.shown();
      },
      openResource: function(args) {
        return this.open('resource', args);
      },
      openState: function(args) {
        return this.open('state', args);
      },
      openProperty: function(args) {
        return this.open('property', args);
      },
      openConfig: function(args) {
        return this.open('config', args);
      },
      openCurrent: function(args) {
        if (this.workspace.design.mode() === 'app' && this.__currentPanel === 'resource') {
          this.__currentPanel = 'config';
        }
        return this.open(this.__currentPanel, args);
      },
      refresh: function() {
        return this.openCurrent.apply(this, arguments);
      },
      __openOrHidePanel: function(e) {
        var targetPanelName;
        targetPanelName = $(e.currentTarget).attr('data-target');
        if (this.__currentPanel === targetPanelName && this.shown()) {
          return this.hide();
        } else {
          this.show();
          return this.open(targetPanelName, this.__openArgs);
        }
      },
      __scrollTo: function(e) {
        var targetClassName;
        targetClassName = $(e.currentTarget).data('scrollTo');
        return this.scrollTo(targetClassName);
      },
      __updateRightPanelOption: function(event) {
        var $target, $toggle, hide, key, states, _ref;
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
        if (this.__optionStates == null) {
          this.__optionStates = {};
        }
        if (!$toggle.closest('.panel-body').size()) {
          return;
        }
        key = "" + this.__currentPanel + "_" + (this.workspace.design.mode()) + "_" + ((_ref = this.__openArgs) != null ? _ref.uid : void 0);
        states = _.map(this.$el.find('.panel-body').find('.option-group-head'), function(el) {
          return $(el).hasClass("expand");
        });
        this.__optionStates[key] = states;
        return false;
      },
      __restoreAccordion: function() {
        var key, states, _ref, _ref1;
        key = "" + this.__currentPanel + "_" + (this.workspace.design.mode()) + "_" + ((_ref = this.__openArgs) != null ? _ref.uid : void 0);
        if (!(states = (_ref1 = this.__optionStates) != null ? _ref1[key] : void 0)) {
          return;
        }
        return this.$('.option-group-head').each(function(index) {
          return $(this).toggleClass('expand', states[index]);
        });
      }
    });
  });

}).call(this);
