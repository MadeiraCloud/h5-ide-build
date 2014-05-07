(function() {
  define('module/design/property/base/main',['event', 'backbone'], function(ide_event, Backbone) {
    var Panel, PropertyModule, activeModule, activeSubModule, activeSubModuleType, propertySubTypeMap, propertyTypeMap, propertyTypeRegExpArr, slice, __getProperty, __loadProperty, __resetSelectedinGroup;
    activeModule = null;
    activeSubModule = null;
    activeSubModuleType = null;
    slice = [].slice;
    ide_event.onLongListen("all", function(eventName) {
      var args, handler;
      if ((!activeModule || !activeModule.ideEvents) && (!activeSubModule || !activeSubModule.ideEvents)) {
        return;
      }
      if (activeModule && activeModule.ideEvents && activeModule.ideEvents.hasOwnProperty(eventName)) {
        args = slice.call(arguments, 1);
        handler = activeModule.ideEvents[eventName];
        if (_.isString(handler)) {
          handler = activeModule[handler];
        }
        handler.apply(activeModule, args);
      }
      if (activeSubModule && activeSubModule.ideEvents && activeSubModule.ideEvents.hasOwnProperty(eventName)) {
        if (!args) {
          args = slice.call(arguments, 1);
        }
        handler = activeSubModule.ideEvents[eventName];
        if (_.isString(handler)) {
          handler = activeSubModule[handler];
        }
        handler.apply(activeSubModule, args);
      }
      return null;
    });
    propertyTypeMap = {};
    propertyTypeRegExpArr = [];
    propertyTypeMap.DEFAULT_TYPE = "default";
    propertySubTypeMap = {};

    /*
     * Above is internal implementation. User doesn't have to care about its detail.
     */

    /*
    
    -------------------------------
     PropertyModule is a base class that every property controller ( a.k.a property main )
     should inherit.
    -------------------------------
    
    ++ Class attributes ++
    
     * ideEvents : Map
                  ( Defined by user )
        example : this.ideEvents = {
                    ABC : "functionNameOfModule"
                    DEF : () -> null
                  }
        description : This attributes specify what kind of ide_event this property cares. The event will dispatch to the property when the property is active.
    
     * subPanelID : String
                  ( Defined by user )
        description : If it is not falsy, this Module is meaned to be used as sub panel, or part of another module. For example, sglist / acl / sgrule should set this to something
    
     * uid        : String
                  ( Defined by library when property is loaded )
        description : This uid is the uid of current component. It is set before `init#{type}` is called.
    
    
     * type      : PropertyModule.TYPE.STACK || PropertyModule.TYPE.APP
                  ( Defined by library when property is loaded)
        description : User can use this attribute to determine what mode ( stack or app ) it is right now.
    
     * handle    : String | Regex
                  ( Defined by library when property is loaded)
        description : User can use this attribute to determine what type of the component ( This will be one of the value in this.handleTypes )
    
     * handleTypes : String | Array(of string, regex)
                  ( Defined by user )
        description : This attribute is used to determine which Property should be shown. The String can be one of constant.RESTYPE.
        Examples :
            "AWS.EC2.Instance",
            "App:AWS.EC2.Instance"   ( `App:` means it only open when it's app mode )
            "Stack:AWS.EC2.Instance" ( `Stack:` means it only open when it's design mode )
            "vgw-vpn>cgw-vpn"        ( line between `vgw-vpn` and `cgw-vpn` )
            "subnet-assoc-in>"       ( line between `subnet-assoc-in` and anything )
    
    
     * model     : PropertyModel
                  ( Assigned by user when `init#{type}` is called )
        description : This points to current model for the property.
    
     * view      : PropertyView
                  ( Assigned by user when `init#{type}` is called )
        description : This points to current view for the property.
    
    
    
    ++ Class Protocol ( Should be implemented by user ) ++
     * init#{type} :
         example     : initApp, initStack
         description : These methods are called when the property is loaded. In these method, user has to assign `this.model` and `this.view`. If this method returns false, it means the property is unable to load. And default property panel ( Stack Panel ) will be used.
    
     * setup#{type} :
         example     : setupApp, setupStack
         description : These methods are called after the first time the property is inited. User should use these methods to do proper setup. These methods are called only once, since the `controller`, the `model` and the `view` are all singleton.
    
     * afterLoad#{type} :
         example     : afterLoadApp, afterLoadStack
         description : These methods are called when the property finished loading. The view is guaranteed to be loaded.
    
     * onUnloadSubPanel(id) :
        description : This method is called when sub panel is closed. id is the sub panel's `subPanelID`.
    
    
    
    ++ Class Method ++
    
     * loadSubPanel( subPanelID, componentUid ) :
        description : calling this method will show the property. It does nothing if the property module is main module, not sub module.
    
     * activeModule :
        description : Returns the currently showing property.
    
     * activeSubModule :
        description : Returns the currently showing sub property. Maybe null.
    
    
    
    ++ Static Method ++
    
     * extend :
         description : User must use this method to inherit from PropertyModule. The usage is the same as Backbone's extend.
     */
    PropertyModule = function() {
      this.type = PropertyModule.TYPE.Stack;
      return null;
    };
    PropertyModule.TYPE = PropertyModule.prototype.TYPE = {
      Stack: "Stack",
      App: "App",
      AppEdit: "AppEdit"
    };
    PropertyModule.prototype.loadSubPanel = function(subPanelID, componentUid) {
      var panel, subPanel;
      subPanel = propertySubTypeMap[subPanelID];
      if (!subPanel) {
        return;
      }
      panel = new Panel();
      panel.uid = componentUid;
      panel.property = subPanel;
      panel.type = subPanelID;
      panel.tabType = activeModule.type;
      __loadProperty(panel);
      return null;
    };
    PropertyModule.extend = function(protoProps, staticProps) {

      /* env:dev                                                                                                                                                                                                                                            env:dev:end */
      var handleTypes, newProperty, newPropertyClass, type, types, _i, _len;
      newPropertyClass = Backbone.Model.extend.call(PropertyModule, protoProps, staticProps);
      newProperty = new newPropertyClass();
      if (newProperty.subPanelID) {
        propertySubTypeMap[newProperty.subPanelID] = newProperty;
        return newPropertyClass;
      }
      if (protoProps.handleTypes === "") {
        handleTypes = [propertyTypeMap.DEFAULT_TYPE];
      } else if (_.isString(protoProps.handleTypes) || !protoProps.handleTypes.hasOwnProperty("length")) {
        handleTypes = [protoProps.handleTypes];
      } else {
        handleTypes = protoProps.handleTypes;
      }
      for (_i = 0, _len = handleTypes.length; _i < _len; _i++) {
        type = handleTypes[_i];

        /* env:dev                                                                                                                                 env:dev:end */
        if (!type.hasOwnProperty("length")) {
          propertyTypeRegExpArr.push({
            regexp: type,
            prop: newProperty
          });
          continue;
        }
        if (type.indexOf(">")) {
          types = type.split(">");
          if (types.length === 2 && types[1].length > 0) {
            propertyTypeMap[types[1] + ">" + types[0]] = newProperty;
          }
        }
        propertyTypeMap[type] = newProperty;
      }
      return newPropertyClass;
    };
    PropertyModule.prototype.activeModule = function() {
      return activeModule;
    };
    PropertyModule.prototype.activeSubModule = function() {
      return activeSubModule;
    };
    PropertyModule.activeModule = PropertyModule.prototype.activeModule;
    PropertyModule.activeSubModule = PropertyModule.prototype.activeSubModule;
    PropertyModule.loadSubPanel = PropertyModule.prototype.loadSubPanel;
    Panel = function() {
      var that;
      that = this;
      _.each({
        _type: propertyTypeMap.DEFAULT_TYPE,
        _uid: null,
        tabType: '',
        restore: false,
        property: null
      }, function(v, k) {
        that[k] = v;
        return null;
      });
      Object.defineProperty(this, 'type', {
        set: function(v) {
          if (v) {
            this._type = v;
            return null;
          } else {
            this._uid = '';
            return null;
          }
        },
        get: function() {
          return this._type;
        }
      });
      Object.defineProperty(this, 'uid', {
        set: function(v) {
          if (this._uid !== '') {
            this._uid = v;
            return null;
          }
        },
        get: function() {
          return this._uid;
        }
      });
      return void 0;
    };
    PropertyModule.load = function(componentType, componentUid, tab_type) {
      var loadResult, panel;
      panel = new Panel();
      if (arguments.length > 1) {
        panel.type = componentType;
        panel.uid = componentUid;
        panel.tabType = tab_type;
      } else if (arguments.length === 1 && _.isObject(arguments[0])) {
        _.each(arguments[0], function(v, k) {
          panel[k] = v;
          return null;
        });
      } else {
        return;
      }
      panel.property = __getProperty(panel);
      loadResult = __loadProperty(panel);
      if (loadResult === true) {

      } else {
        if (loadResult === false) {
          panel.type = 'missing_resource';
        } else {
          console.warn("Cannot open component for type: " + componentType + ", data : " + componentUid);
        }
        panel.property = __getProperty(panel);
        return __loadProperty(panel);
      }
    };
    __getProperty = function(panel) {
      var componentType, componentUid, handle, property, r, tab_type, _i, _len;
      componentType = panel.type;
      componentUid = panel.uid;
      tab_type = panel.tabType;
      handle = componentType;
      property = propertyTypeMap[componentType];
      if (!property) {
        handle = tab_type + ":" + componentType;
        property = propertyTypeMap[handle];
      }
      if (!property && componentType.indexOf(">" > -1)) {
        for (_i = 0, _len = propertyTypeRegExpArr.length; _i < _len; _i++) {
          r = propertyTypeRegExpArr[_i];
          if (componentType.match(r.regexp)) {
            handle = r.regexp;
            property = r.prop;
            break;
          }
        }
      }
      if (!property) {
        return;
      }
      property.handle = handle;
      return property;
    };
    __loadProperty = function(panel) {
      var componentType, componentUid, procName, property, result, tab_type;
      componentType = panel.type;
      property = panel.property;
      componentUid = panel.uid;
      tab_type = panel.tabType;
      if (!property) {
        return false;
      }
      property.type = tab_type;
      procName = "init" + property.type;
      if (property[procName]) {
        property.uid = componentUid;
        result = property[procName].call(property, componentUid);
        if (result === false) {
          return;
        }
      } else {
        return;
      }
      procName = "setup" + property.type;
      if (property[procName]) {
        property[procName].call(property);
        property[procName] = null;
      }
      if (property.subPanelID) {
        activeSubModule = property;
        activeSubModuleType = componentType;
      } else {
        activeSubModule = null;
        activeSubModuleType = null;
        activeModule = property;
        activeModule.comType = componentType;
      }
      property.model.clear({
        silent: true
      });
      if (property.model.init(componentUid) === false) {
        return false;
      }
      __resetSelectedinGroup(panel.restore, property.model);
      property.view.model = property.model;
      property.view._isSub = !!property.subPanelID;
      property.view.__restore = PropertyModule.__restore;
      PropertyModule.__restore = false;
      if (property.subPanelID) {
        property.view._loadAsSub(property.subPanelID);
      } else {
        property.view._load();
      }
      procName = "afterLoad" + property.type;
      if (property[procName]) {
        property[procName].call(property);
      }
      return true;
    };
    __resetSelectedinGroup = function(restore, model) {
      var mid, uid;
      mid = model.get('mid');
      uid = model.get('uid');
      if (restore && mid) {
        if (mid.length === 38) {
          return MC.canvas.instanceList.selectById(uid, mid);
        } else {
          return MC.canvas.asgList.selectById(uid, mid);
        }
      }
    };
    PropertyModule.onUnloadSubPanel = function() {
      if (activeModule.onUnloadSubPanel) {
        activeModule.onUnloadSubPanel(activeSubModule.subPanelID);
      }
      activeSubModule = null;
      activeSubModuleType = null;
      return null;
    };
    PropertyModule.snapshot = function(propertyView) {
      var data;
      data = {
        activeModuleType: activeModule.comType,
        activeSubModuleType: activeSubModuleType,
        activeModuleId: activeModule.uid,
        activeSubModuleId: activeSubModule ? activeSubModule.uid : null,
        tab_type: activeModule.type,
        propertyTab: propertyView.currentTab
      };
      return data;
    };
    PropertyModule.restore = function(snapshot, propertyView) {
      var param;
      param = {
        type: snapshot.activeModuleType,
        uid: snapshot.activeModuleId,
        tabType: snapshot.tab_type,
        restore: true
      };
      PropertyModule.load(param);
      if (snapshot.activeSubModuleType) {
        PropertyModule.__restore = true;
        PropertyModule.loadSubPanel(snapshot.activeSubModuleType, snapshot.activeSubModuleId, true);
        PropertyModule.__restore = false;
      } else {
        PropertyModule.event.trigger(PropertyModule.event.HIDE_SUB_PANEL);
      }
      return null;
    };
    PropertyModule.event = _.extend({}, Backbone.Events);
    PropertyModule.event.FORCE_SHOW = "forceshow";
    PropertyModule.event.HIDE_SUB_PANEL = "hidesubpanel";
    return PropertyModule;
  });

}).call(this);

define('module/design/property/template',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<section class=\"property-panel-wrapper\" id=\"property-first-panel\">\n\n  <header class=\"property-sidebar-title sidebar-title truncate\" id='property-title'></header>\n  <div class=\"scroll-wrap scrollbar-auto-hide\">\n    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content property-content property-details\"></div>\n  </div>\n</section>\n\n<section class=\"property-panel-wrapper\" id=\"property-second-panel\">\n  <div class=\"property-sidebar-title sidebar-title\">\n    <a class=\"back tooltip icon-btn-back\" data-tooltip=\"\" href=\"#\" id=\"hide-second-panel\"></a><span id='property-second-title' class=\"truncate\"></span>\n  </div>\n  <div class=\"scroll-wrap scrollbar-auto-hide\">\n    <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n    <div class=\"scroll-content property-content\"></div>\n  </div>\n</section>\n";
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/view',['event', './base/main', 'constant', './template', 'Design', 'backbone', 'jquery', 'handlebars'], function(ide_event, PropertyBaseModule, CONST, template, Design) {
    var PropertyView;
    PropertyView = Backbone.View.extend({
      propertyHeadStateMap: {},
      events: {
        'click': 'test'
      },
      currentTab: 'property',
      uid: null,
      type: null,
      initialize: function() {
        $(document.body).on('click', '#hide-property-panel', this.togglePropertyPanel).on('click', '.option-group-head', _.bind(this.toggleOption, this)).on('click', '#hide-second-panel', _.bind(this.hideSecondPanel, this)).on('click', '#btn-switch-state, #btn-switch-property', _.bind(this.switchTab, this));

        /*
         * Move from render to initialize
         */
        $("body").on("click", ".click-select", this.selectText);
        return null;
      },
      switchTab: function(event) {
        var target;
        target = event.currentTarget;
        if (target.id === 'btn-switch-state') {
          if (this.currentTab !== 'state') {
            this.renderState(this.uid, this.type, true);
          }
        } else {
          if (this.currentTab === 'state') {
            this.renderProperty(this.uid, this.type);
          }
        }
        return this.renderStateCount(Design.instance().component(this.uid));
      },
      showProperty: function() {
        return $('#property-panel').removeClass('state');
      },
      showState: function() {
        return $('#property-panel').addClass('state');
      },
      __hideResourcePanel: function() {
        var hideButton;
        hideButton = $('#hide-resource-panel');
        if (hideButton.hasClass('icon-caret-left')) {
          return hideButton.click();
        }
      },
      storeLast: function(uid, type) {
        if (uid) {
          this.uid = uid;
        }
        if (type) {
          this.type = type;
        }
        return null;
      },
      renderProperty: function(uid, type, force) {
        var comp;
        $('#property-panel').removeClass('state').removeClass('state-wide');
        if (!type && uid) {
          comp = Design.instance().component(uid);
          if (comp) {
            type = comp.type;
          }
        }
        this.initProperty(type, uid, force);
        this.currentTab = 'property';
        this.showProperty();
        this.storeLast(uid, type);
        return this;
      },
      renderStateCount: function(component) {
        var count;
        if (component) {
          count = component.get('state') && component.get('state').length || 0;
          return $('#btn-switch-state b').text("(" + count + ")");
        }
      },
      renderState: function(uid, type, force) {
        var comp, currentSelectedCompModel, currentStackState, effective, resId;
        this.__hideResourcePanel();
        this.showState();
        this.storeLast(uid, type);
        this.currentTab = 'state';
        currentSelectedCompModel = null;
        if (!uid) {
          uid = Design.instance().canvas.selectedNode[0];
          if (uid) {
            currentSelectedCompModel = Design.instance().component(uid);
          }
        }
        if (uid) {
          comp = Design.instance().component(uid);
          if (comp) {
            type = comp.type;
            if (!_.contains([CONST.RESTYPE.LC, CONST.RESTYPE.INSTANCE], type)) {
              this.renderProperty(uid);
              return;
            } else if (_.contains([CONST.RESTYPE.LC], type)) {
              if (Design.instance().modeIsApp()) {
                currentStackState = Design.instance().get('state');
                if (currentStackState === 'Stopped') {
                  ide_event.trigger(ide_event.OPEN_STATE_EDITOR, uid);
                }
                return;
              }
              ide_event.trigger(ide_event.OPEN_STATE_EDITOR, uid);
              return;
            }
          } else if (Design.instance().modeIsApp()) {
            resId = uid;
            effective = Design.modelClassForType(CONST.RESTYPE.INSTANCE).getEffectiveId(resId);
            uid = effective.uid;
          }
        }
        ide_event.trigger(ide_event.OPEN_STATE_EDITOR, uid, resId);
        if (force) {
          this.forceShow();
        }
        return this;
      },
      initProperty: function(type, uid, force) {
        var component, design, error, tab_type;
        this.render();
        this.load();
        design = Design.instance();
        if (uid) {
          component = design.component(uid);
          if (component && component.type === type && design.modeIsApp() && component.get('appId') && !component.hasAppResource()) {
            type = 'Missing_Resource';
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
          this.afterLoad();
          if (force) {
            this.forceShow();
          }

          /* env:prod */
        } catch (_error) {
          error = _error;
          console.error(error);

          /* env:prod:end */
        } finally {

        }
        return null;
      },
      render: function() {
        $(document.activeElement).filter("input, textarea").blur();
        $('#property-panel .sub-property').html(template()).removeClass('state state-wide');
        return this;
      },
      restore: function(snapshot) {
        var currentTab, stateStatus, type, uid;
        type = this.type = snapshot.activeModuleType;
        currentTab = this.currentTab = snapshot.propertyTab;
        uid = this.uid = snapshot.activeModuleId;
        stateStatus = this.processState(uid, type);
        if (currentTab === 'state' && stateStatus) {
          this.renderState(uid);
        } else {
          this.showProperty();
        }
        return null;
      },
      getModeAvai: function(type) {
        var modeAvai;
        modeAvai = null;
        if (Design.instance().modeIsAppEdit()) {
          if (type === 'component_server_group') {
            modeAvai = true;
          }
        } else if (Design.instance().modeIsApp()) {
          if (type === CONST.RESTYPE.LC) {
            modeAvai = false;
          }
          if (type === 'component_server_group') {
            modeAvai = false;
          }
          if (Design.instance().get('state') === "Stopped") {
            if (type === CONST.RESTYPE.LC) {
              modeAvai = true;
            } else if (type === 'component_server_group') {
              modeAvai = false;
            }
          }
        }
        return modeAvai;
      },
      processState: function(uid, type) {
        var component, modeAvai, opsEnabled, propertyPanel, typeAvai;
        propertyPanel = $('#property-panel');
        if (uid) {
          component = Design.instance().component(uid);
          if (!type && component) {
            type = component.type;
          }
          typeAvai = _.contains([CONST.RESTYPE.LC, CONST.RESTYPE.INSTANCE, 'component_server_group'], type);
          opsEnabled = Design.instance().get('agent').enabled;
          modeAvai = this.getModeAvai(type);
          if (opsEnabled && typeAvai) {
            this.renderStateCount(component);
          }
          if (opsEnabled && ((modeAvai === null && typeAvai) || modeAvai)) {
            setTimeout(function() {
              return propertyPanel.removeClass('no-state');
            }, 0);
            return true;
          } else {
            setTimeout(function() {
              return propertyPanel.addClass('no-state');
            }, 0);
            return false;
          }
        } else {
          setTimeout(function() {
            return propertyPanel.addClass('no-state');
          }, 0);
          return false;
        }
      },
      getCurrentCompUid: function() {
        var event;
        event = {};
        this.trigger("GET_CURRENT_UID", event);
        return event.uid;
      },
      togglePropertyPanel: function(event) {
        console.log('togglePropertyPanel');
        $('#property-panel').toggleClass('hidden').toggleClass('transition', true);
        $('#hide-property-panel').toggleClass('icon-caret-left');
        $('#hide-property-panel').toggleClass('icon-caret-right');
        $('#status-bar-modal').toggleClass('toggle');
        return false;
      },
      toggleOption: function(event) {
        var $target, $toggle, component, headCompUID, headElemAry, headExpandStateAry, hide, stackId, stackMap;
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
        stackId = Design.instance().get("id");
        if (!this.propertyHeadStateMap[stackId]) {
          this.propertyHeadStateMap[stackId] = {};
        }
        if ($('#property-second-panel').is(':hidden')) {
          headElemAry = $('#property-panel').find('.option-group-head');
          headExpandStateAry = [];
          headCompUID = this.getCurrentCompUid();
          if (!headCompUID) {
            headCompUID = stackId;
          }
          _.each(headElemAry, function(headElem) {
            var $headElem, expandState;
            $headElem = $(headElem);
            expandState = $headElem.hasClass('expand');
            headExpandStateAry.push(expandState);
            return null;
          });
          if (headCompUID) {
            stackMap = this.propertyHeadStateMap[stackId];
            stackMap[headCompUID] = headExpandStateAry;
            component = Design.instance().component(headCompUID);
            if (component) {
              stackMap[component.type] = headExpandStateAry;
            }
          }
        }
        return false;
      },
      optionToggle: function(event) {
        var $target, $toggle;
        $target = $(this);
        $toggle = $target.prev();
        if ($toggle.hasClass("expand")) {
          return $target.removeClass("transition").css({
            "max-height": "100000px",
            "overflow": "visible"
          });
        }
      },
      forceShow: function(tab) {
        if (tab === 'property') {
          this.showProperty();
        } else if (tab === 'state') {
          this.showState();
        }
        $('#property-panel').removeClass('hidden transition');
        $('#hide-property-panel').removeClass('icon-caret-left').addClass('icon-caret-right');
        return null;
      },
      showSecondPanel: function() {
        $("#hide-second-panel").data("tooltip", "Back to " + $("#property-title").text());
        $("#property-second-panel").show().animate({
          left: "0%"
        }, 200);
        return $("#property-first-panel").animate({
          left: "-30%"
        }, 200, function() {
          return $("#property-first-panel").hide();
        });
      },
      immShowSecondPanel: function() {
        $("#hide-second-panel").data("tooltip", "Back to " + $("#property-title").text());
        $("#property-second-panel").show().css({
          left: "0%"
        });
        $("#property-first-panel").css({
          left: "-30%",
          display: "none"
        });
        return null;
      },
      hideSecondPanel: function() {
        var $panel;
        $panel = $("#property-second-panel");
        $panel.animate({
          left: "100%"
        }, 200, function() {
          return $("#property-second-panel").hide();
        });
        $("#property-first-panel").show().animate({
          left: "0%"
        }, 200);
        this.trigger("HIDE_SUBPANEL");
        return false;
      },
      immHideSecondPanel: function() {
        $("#property-second-panel").css({
          display: "none",
          left: "100%"
        }).children(".scroll-wrap").children(".property-content").empty();
        $("#property-first-panel").css({
          display: "block",
          left: "0px"
        });
        return null;
      },
      load: function() {
        $(document.activeElement).filter('input, textarea').blur();
        this.immHideSecondPanel();
        return null;
      },
      afterLoad: function() {
        var compUID, component, headCompUID, headElemAry, headExpandStateAry, stackId, stackMap, stateAry, stateMap;
        stackId = MC.canvas_data.id;
        if ($('#property-second-panel').is(':hidden')) {
          headCompUID = this.getCurrentCompUid();
          if (!headCompUID) {
            headCompUID = stackId;
          }
          headExpandStateAry = null;
          stackMap = this.propertyHeadStateMap[stackId];
          if (stackMap) {
            headExpandStateAry = stackMap[headCompUID];
            component = Design.instance().component(headCompUID);
            if (!headExpandStateAry && component) {
              headExpandStateAry = stackMap[component.type];
            }
          }
          if (headExpandStateAry) {
            headElemAry = $('#property-panel').find('.option-group-head');
            _.each(headElemAry, function(headElem, i) {
              var $headElem;
              $headElem = $(headElem);
              if (headExpandStateAry[i]) {
                $headElem.addClass('expand');
              } else {
                $headElem.removeClass('expand');
              }
              return null;
            });
          }
          stateMap = this.propertyHeadStateMap[stackId];
          if (stateMap) {
            for (compUID in stateMap) {
              stateAry = stateMap[compUID];
              if (Design.instance().component(compUID)) {
                continue;
              }
              if (compUID === stackId || compUID.indexOf('i-') === 0) {
                continue;
              }
              delete stateMap[compUID];
            }
          }
        }
        return null;
      },
      showPropertyPanel: function() {
        console.log('showPropertyPanel');
        if ($('#hide-property-panel').hasClass('icon-caret-left')) {
          return $('#hide-property-panel').trigger('click');
        }
      },
      selectText: function(event) {
        var e, range;
        try {
          range = document.body.createTextRange();
          range.moveToElementText(event.currentTarget);
          range.select();
          console.warn("Select text by document.body.createTextRange");
        } catch (_error) {
          e = _error;
          if (window.getSelection) {
            range = document.createRange();
            range.selectNode(event.currentTarget);
            window.getSelection().addRange(range);
            console.warn("Select text by document.createRange");
          }
        }
        return false;
      }
    });
    return PropertyView;
  });

}).call(this);

(function() {
  define('module/design/property/base/view',['constant', 'i18n!nls/lang.js', 'backbone', 'jquery', 'handlebars', 'UI.selectbox', 'UI.notification', 'UI.multiinputbox', 'UI.modal', 'UI.selectbox', 'MC.validate', 'UI.parsley', 'UI.tooltip', 'UI.sortable', 'UI.tablist'], function(constant, lang) {

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
    var PropertyView;
    PropertyView = Backbone.View.extend({
      setTitle: function(title) {
        $(this._isSub ? "#property-second-title" : "#property-title").text(title);
      },
      prependTitle: function(additionalTitle) {
        $(this._isSub ? "#property-second-title" : "#property-title").prepend(additionalTitle);
      },
      forceShow: function() {
        PropertyView.event.trigger(PropertyView.event.FORCE_SHOW);
        return null;
      },
      disabledAllOperabilityArea: function(disabled) {
        var divTmpl;
        if (disabled) {
          if ($("#resource-panel").children(".disabled-event-layout").length) {
            return;
          }
          divTmpl = '<div class="disabled-event-layout"></div>';
          $('#resource-panel').append(divTmpl);
          $('#canvas').append(divTmpl);
          return $('#tabbar-wrapper').append(divTmpl);
        } else {
          return $('.disabled-event-layout').remove();
        }
      },
      checkResName: function($input, type) {
        var error, name;
        if (!$input.length) {
          $input = $($input);
        }
        name = $input.val();
        if (!type) {
          type = name;
        }
        if (name && !MC.validate('awsName', name)) {
          error = sprintf(lang.ide.PARSLEY_THIS_VALUE_SHOULD_BE_A_VALID_TYPE_NAME, type);
        }
        if (!error && this.model.isNameDup(name)) {
          error = sprintf(lang.ide.PARSLEY_TYPE_NAME_CONFLICT, type, name);
        }
        if (!error && this.model.isReservedName(name)) {
          error = sprintf(lang.ide.PARSLEY_TYPE_NAME_CONFLICT, type, name);
        }
        if (name.indexOf("elbsg-") === 0) {
          error = lang.ide.PARSLEY_RESOURCE_NAME_ELBSG_RESERVED;
        }
        $input.parsley('custom', function() {
          return error;
        });
        return $input.parsley('validate');
      },
      _load: function() {
        var $new_panel, $panel;
        $panel = $("#property-first-panel").find(".property-details");
        $new_panel = $("<div class='scroll-content property-content property-details'></div>").insertAfter($panel);
        $panel.empty().remove();
        this.setElement($new_panel);
        this.render();
        this.focusImportantInput();
        return null;
      },
      _loadAsSub: function(subPanelID) {
        var that;
        if (this.__restore) {
          PropertyView.event.trigger(PropertyView.event.OPEN_SUBPANEL_IMM);
        } else {
          PropertyView.event.trigger(PropertyView.event.OPEN_SUBPANEL);
        }
        this.setElement($("#property-second-panel .property-content"));
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
            if (resComp && resComp.type === constant.RESTYPE.SG) {
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
    PropertyView.event = _.extend({}, Backbone.Events);
    PropertyView.event.FORCE_SHOW = "forceshow";
    PropertyView.event.OPEN_SUBPANEL = "opensubpanel";
    PropertyView.event.OPEN_SUBPANEL_IMM = "opensubpanelimm";
    PropertyView.extend = function(protoProps, staticProps) {
      if (protoProps.render) {
        protoProps._originalRender = protoProps.render;
        protoProps.render = PropertyView.prototype._render;
      }
      return Backbone.View.extend.call(this, protoProps, staticProps);
    };
    return PropertyView;
  });

}).call(this);

(function() {
  define('module/design/property/base/model',['backbone', 'Design'], function(Backbone, Design) {

    /*
    
    -------------------------------
     PropertyModel is a base class that every property view should inherit.
    -------------------------------
     */
    var PropertyModel;
    PropertyModel = Backbone.Model.extend({
      init: function() {
        return null;
      },
      setName: function(name) {
        var id;
        id = this.get("uid");
        console.assert(id, "This property model doesn't have an id");
        Design.instance().component(id).setName(name);
        this.set("name", name);
        return null;
      },
      isNameDup: function(newName) {
        var comp, dup, id;
        id = this.get("uid");
        console.assert(id, "This property model doesn't have an id");
        comp = Design.instance().component(id);
        if (comp.get("name") === newName) {
          return false;
        }
        dup = false;
        Design.instance().eachComponent(function(comp) {
          if (comp.get("name") === newName) {
            dup = true;
            return false;
          }
        });
        return dup;
      },
      isReservedName: function(newName) {
        var result;
        result = false;
        if (newName === 'self' || newName === 'this' || newName === 'global' || newName === 'meta' || newName === 'madeira') {
          result = true;
        }
        return result;
      }
    });
    return PropertyModel;
  });

}).call(this);

(function() {
  define('module/design/property/stack/model',['../base/model', 'constant', "Design"], function(PropertyModel, constant, Design) {
    var StackModel, typeMap;
    typeMap = {
      'ec2-classic': 'EC2 Classic',
      'ec2-vpc': 'EC2 VPC',
      'default-vpc': 'Default VPC',
      'custom-vpc': 'Custom VPC'
    };
    StackModel = PropertyModel.extend({
      init: function() {
        var agentData, design, vpc;
        design = Design.instance();
        agentData = design.get('agent');
        this.set({
          name: design.get("name").replace(/\s+/g, ''),
          id: design.get("id"),
          usage: design.get("usage"),
          description: design.get('description'),
          type: typeMap[design.type()],
          region: constant.REGION_SHORT_LABEL[design.region()],
          isApp: this.isApp,
          isAppEdit: this.isAppEdit,
          isStack: this.isStack,
          isImport: design.modeIsAppView(),
          opsEnable: agentData.enabled
        });
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        if (vpc) {
          this.set("vpcid", vpc.get("appId"));
        }
        this.getNetworkACL();
        if (this.isApp) {
          this.getAppSubscription();
        } else {
          this.getSubscription();
        }
        if (this.isStack) {
          this.set('isStack', true);
        }
        this.set(Design.instance().getCost());
        return null;
      },
      addSubscription: function(data) {
        var SubscriptionModel, idx, sub, sub_comp, subs, _i, _len;
        SubscriptionModel = Design.modelClassForType(constant.RESTYPE.SUBSCRIPTION);
        subs = this.get("subscription");
        if (!data.uid) {
          sub_comp = new SubscriptionModel(data);
          sub = sub_comp.toJSON();
          sub.confirmed = true;
          subs.push(sub);
        } else {
          sub_comp = Design.instance().component(data.uid);
          sub_comp.set("protocol", data.protocol);
          sub_comp.set("endpoint", data.endpoint);
          for (idx = _i = 0, _len = subs.length; _i < _len; idx = ++_i) {
            sub = subs[idx];
            if (sub.id === data.uid) {
              sub.protocol = data.protocol;
              sub.endpoint = data.endpoint;
              sub.confirmed = data.confirmed;
              break;
            }
          }
        }
        return null;
      },
      deleteSNS: function(uid) {
        var idx, sub, sub_list, _i, _len;
        sub_list = this.get('subscription');
        for (idx = _i = 0, _len = sub_list.length; _i < _len; idx = ++_i) {
          sub = sub_list[idx];
          if (sub.id === uid) {
            sub_list.splice(idx, 1);
            break;
          }
        }
        Design.instance().component(uid).remove();
        return null;
      },
      getSubscription: function() {
        var SubscriptionModel, TopicModel, sub, subState, subs, _i, _len;
        SubscriptionModel = Design.modelClassForType(constant.RESTYPE.SUBSCRIPTION);
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        subs = _.map(SubscriptionModel.allObjects(), function(sub) {
          return sub.toJSON();
        });
        subState = this.getSubState();
        for (_i = 0, _len = subs.length; _i < _len; _i++) {
          sub = subs[_i];
          if (subState && subState[sub.protocol + "-" + sub.endpoint] === false) {
            sub.confirmed = false;
          } else {
            sub.confirmed = true;
          }
        }
        this.set("subscription", subs);
        this.set("has_asg", TopicModel.isTopicNeeded());
        return null;
      },
      getSubState: function() {
        var TopicModel, sub, subRes, subState, topic, topic_arn, _i, _len;
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        topic = TopicModel.allObjects()[0];
        if (topic) {
          topic_arn = topic.get("appId");
        }
        subRes = MC.data.resource_list[Design.instance().region()].Subscriptions;
        subState = {};
        if (topic_arn && subRes) {
          for (_i = 0, _len = subRes.length; _i < _len; _i++) {
            sub = subRes[_i];
            if (sub.TopicArn === topic_arn) {
              subState[sub.Protocol + "-" + sub.Endpoint] = sub.SubscriptionArn !== "PendingConfirmation";
            }
          }
        }
        return subState;
      },
      getAppSubscription: function() {
        var TopicModel, sub, subs, subscription, topic, topic_arn, _i, _len;
        TopicModel = Design.modelClassForType(constant.RESTYPE.TOPIC);
        topic = TopicModel.allObjects()[0];
        if (topic) {
          topic_arn = topic.get("appId");
          this.set('snstopic', {
            name: topic.get("name"),
            arn: topic_arn
          });
        }
        subs = MC.data.resource_list[Design.instance().region()].Subscriptions;
        subscription = [];
        if (topic_arn && subs) {
          for (_i = 0, _len = subs.length; _i < _len; _i++) {
            sub = subs[_i];
            if (sub.TopicArn === topic_arn) {
              subscription.push({
                protocol: sub.Protocol,
                endpoint: sub.Endpoint,
                arn: sub.SubscriptionArn,
                confirmed: sub.SubscriptionArn !== "PendingConfirmation"
              });
            }
          }
        }
        return this.set('subscription', subscription);
      },
      createAcl: function() {
        var ACLModel;
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        return (new ACLModel()).id;
      },
      getNetworkACL: function() {
        var ACLModel, defaultACL, networkAcls;
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        networkAcls = [];
        defaultACL = null;
        _.each(ACLModel.allObjects(), (function(_this) {
          return function(acl) {
            var aclObj, deletable;
            deletable = true;
            if (_this.isApp) {
              deletable = false;
            } else if (acl.isDefault()) {
              deletable = false;
            } else if (_this.isAppEdit) {
              deletable = !acl.get("appId");
            }
            aclObj = {
              uid: acl.id,
              name: acl.get("name"),
              rule: acl.getRuleCount(),
              association: acl.getAssoCount(),
              deletable: deletable
            };
            if (acl.isDefault()) {
              defaultACL = aclObj;
            } else {
              networkAcls.splice(_.sortedIndex(networkAcls, aclObj, "name"), 0, aclObj);
            }
            return null;
          };
        })(this));
        if (defaultACL) {
          networkAcls.splice(0, 0, defaultACL);
        }
        this.set("networkAcls", networkAcls);
        return null;
      },
      removeAcl: function(acl_uid) {
        Design.instance().component(acl_uid).remove();
        this.getNetworkACL();
        return null;
      }
    });
    return new StackModel();
  });

}).call(this);

define('module/design/property/stack/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <dl class=\"dl-horizontal dl-region-type property-control-group\">\n    <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_REGION", {hash:{},data:data}))
    + "</label></dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_TYPE", {hash:{},data:data}))
    + "</label></dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.usage), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_DESC", {hash:{},data:data}))
    + "</label></dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_USAGE", {hash:{},data:data}))
    + "</label></dt>\n    <dd style=\"text-transform: capitalize\">"
    + escapeExpression(((stack1 = (depth0 && depth0.usage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<section class=\"property-control-group\" data-bind=\"true\">\n		<label class=\"left\" for=\"property-stack-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_NAME", {hash:{},data:data}))
    + "</label>\n		<input class=\"input\" type=\"text\" data-ignore=\"true\" data-required-rollback=\"true\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-stack-name\">\n	</section>\n    <section class=\"property-control-group\" data-bind=\"true\">\n        <label for=\"property-stack-description\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_DESCRIPTION", {hash:{},data:data}))
    + "</label>\n        <textarea name=\"\" id=\"property-stack-description\" cols=\"30\" rows=\"7\">"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n	<dl class=\"dl-horizontal dl-region-type property-control-group\">\n		<dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_REGION", {hash:{},data:data}))
    + "</label></dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n		<dt><label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_LBL_TYPE", {hash:{},data:data}))
    + "</label></dt><dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	</dl>\n  ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head pos-r\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_TIT_ACL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.networkAcls)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>\n	</div>\n	<div class=\"option-group\">\n    <ul class=\"acl-sg-info-list acl-info-list property-list\" id=\"stack-property-acl-list\"></ul>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "";
  buffer += "<a href=\"#\" class=\"add-to-list action-link\" id=\"stack-property-new-acl\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_BTN_CREATE_NEW_ACL", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_TIT_SNS", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subscription), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ")</span></div>\n  <div class=\"option-group\">\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subscription), {hash:{},inverse:self.program(20, program20, data),fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  ";
  return buffer;
  }
function program10(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subscription)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program12(depth0,data) {
  
  
  return "0";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"property-group-head\">SNS Topic</div>\n    <div class=\"property-control-group\">\n      <dl class=\"dl-vertical\">\n        <dt>SNS Topic Name</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.snstopic)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>SNS Topic ARN</dt>\n        <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.snstopic)),stack1 == null || stack1 === false ? stack1 : stack1.arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      </dl>\n    </div>\n    <div class=\"property-group-head\">Subscription</div>\n    <ul class=\"property-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subscription), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n    ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li>\n        <dl class=\"dl-horizontal dl-region-type\">\n          <dt><label>Protocol</label></dt><dd class=\"protocol\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n          <dt><label>Endpoint</label></dt><dd class=\"endpoint truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n          <dt><label>Confirmed</label></dt><dd class=\"\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.confirmed), {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n        </dl>\n      </li>\n    ";
  return buffer;
  }
function program16(depth0,data) {
  
  
  return "True";
  }

function program18(depth0,data) {
  
  
  return "False";
  }

function program20(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"property-control-group\">\n      <p class=\"property-info tac\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_APP_SNS_NONE", {hash:{},data:data}))
    + "</p>\n    </div>\n    ";
  return buffer;
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_TIT_SNS", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-stack-sns-num\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subscription)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span></div>\n  <div class=\"option-group\">\n\n  	<ul id=\"property-sub-list\" class=\"property-list\">\n      <li class=\"pos-r hide\">\n      	<dl class=\"dl-horizontal dl-region-type\">\n	        <dt><label>Protocol</label></dt><dd class=\"protocol\"></dd>\n	        <dt><label>Endpoint</label></dt><dd class=\"endpoint truncate\"></dd>\n        </dl>\n        <div class=\"sns-action\">\n          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </li>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subscription), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  	</ul>\n\n    <section class=\"property-sns-info property-control-group\">\n      <div id=\"property-sns-no-sub-no-asg\" class=\"property-info\" >\n        <p>SNS is available for auto scaling group notification and scaling policy.</p>\n        <p>You can enable auto scaling group to send notification via SNS Topic</p>\n      </div>\n\n      <div id=\"property-sns-no-asg\" class=\"property-info\"><p>There is no auto scaling group in this stack using notification. If there is no usage of SNS topic, the topic will not be created when the stack runs into an app.</p></div>\n\n      <div id=\"property-sns-no-sub\"><p class=\"property-warning\">There is auto scaling group relay on SNS Topic to receive notification. Yet no subscription is set up. </p></div>\n    </section>\n	<div class=\"tac property-control-group\"><button id=\"property-create-asg\" class=\"btn btn-blue\" style=\"width:180px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_BTN_ADD_SUB", {hash:{},data:data}))
    + "</button></div>\n  </div>\n  ";
  return buffer;
  }
function program23(depth0,data) {
  
  
  return "\n            <i class=\"icon-del icon-remove\"></i>\n          ";
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.confirmed), {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  return buffer;
  }
function program26(depth0,data) {
  
  
  return "\n              <i class=\"icon-del icon-remove\"></i>\n            ";
  }

function program28(depth0,data) {
  
  var buffer = "";
  buffer += "\n              <i class=\"icon-pending tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_PENDING_CONFIRM", {hash:{},data:data}))
    + "\" ></i>\n            ";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <dl class=\"dl-horizontal dl-region-type\">\n	        <dt><label>Protocol</label></dt><dd class=\"protocol\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	        <dt><label>Endpoint</label></dt><dd class=\"endpoint truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        </dl>\n        <div class=\"sns-action\">\n          ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </li>\n      ";
  return buffer;
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "$"
    + escapeExpression(((stack1 = (depth0 && depth0.totalFee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/";
  stack1 = helpers.i18n.call(depth0, "PROP_STACK_LBL_COST_CYCLE", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }

function program34(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <tr> <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.resource)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td> <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td> <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.formatedFee)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td> </tr>\n      ";
  return buffer;
  }

  buffer += "<article>\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isStack), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<!-- SG, ACL, COST -->\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_TIT_SG", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.networkAcls), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.program(22, program22, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n	<div class=\"option-group-head\">\n		"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_TIT_COST_ESTIMATION", {hash:{},data:data}))
    + "\n		<span class=\"cost-counter right\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.totalFee), {hash:{},inverse:self.noop,fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n	</div>\n	<div class=\"option-group\">\n		<table class=\"table cost-estimation-table\">\n			<thead> <tr>\n					<th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_COST_COL_RESOURCE", {hash:{},data:data}))
    + "</th>\n          <th style=\"min-width:70px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_COST_COL_SIZE_TYPE", {hash:{},data:data}))
    + "</th>\n          <th style=\"min-width:60px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_COST_COL_FEE", {hash:{},data:data}))
    + "</th>\n			</tr> </thead>\n			<tbody> ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.costList), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </tbody>\n\n		</table>\n		<div class=\"property-control-group tac\">\n			<a target=\"_blank\" href=\"http://aws.amazon.com/ec2/pricing/\" class=\"goto-outsite tac\" target=\"_blank\">AWS EC2 Pricing</a>\n		</div>\n	</div>\n\n</article>\n\n\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/stack/template/acl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n<div class=\"col3 edit icon-btn-details tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_ACL_TIP_DETAIL", {hash:{},data:data}))
    + "' ></div>\n<div class=\"col2\">\n	<div class=\"col2-1 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n	<div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rule)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_ACL_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_ACL_LBL_ASSOC", {hash:{},data:data}))
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deletable), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>\n</div>\n</li>";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " | <a class=\"sg-list-delete-btn\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-count=\""
    + escapeExpression(((stack1 = (depth0 && depth0.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_STACK_ACL_BTN_DELETE", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.networkAcls), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/stack/template/sub',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width:420px\">\n   <div class=\"modal-header\">\n      <h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " SNS Subscription</h3>\n      <i class=\"modal-close\">&times;</i>\n   </div>\n   <div class=\"modal-body\" id=\"property-asg-sns-modal\" data-uid="
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ">\n      <div class=\"modal-control-group modal-sns-protocol\">\n        <label class=\"label-short\">Protocol</label>\n        <div class=\"selectbox\">\n          <div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <ul class=\"dropdown\" tabindex=\"-1\">\n            <li class=\"item\" data-id=\"https\">HTTPS</li>\n            <li class=\"item\" data-id=\"http\">HTTP</li>\n            <li class=\"item\" data-id=\"email\">Email</li>\n            <li class=\"item\" data-id=\"email-json\">Email-JSON</li>\n            <li class=\"item\" data-id=\"sms\">SMS</li>\n            <li class=\"item\" data-id=\"arn\">Application</li>\n            <li class=\"item\" data-id=\"sqs\">Amazon SQS</li>\n          </ul>\n        </div>\n      </div>\n      <div class=\"modal-control-group\">\n        <label class=\"label-short\" for=\"property-asg-endpoint\">Endpoint</label>\n        <div class=\"property-asg-ep\" data-bind=\"true\">\n          <input type=\"text\" class=\"input\" id=\"property-asg-endpoint\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.endpoint)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" max-length=\"255\" data-required=\"true\" data-trigger=\"change\">\n        </div>\n      </div>\n\n    </section>\n\n   </div>\n   <div class=\"modal-footer\">\n      <button id=\"property-asg-sns-done\" class=\"btn btn-blue\">Done</button>\n      <button class=\"btn modal-close btn-silver\">Cancel</button>\n   </div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/stack/view',['../base/view', './template/stack', './template/acl', './template/sub', 'event', 'i18n!nls/lang.js'], function(PropertyView, template, acl_template, sub_template, ide_event, lang) {
    var StackView;
    StackView = PropertyView.extend({
      events: {
        'change #property-stack-name': 'stackNameChanged',
        'change #property-stack-description': 'stackDescriptionChanged',
        'click #stack-property-new-acl': 'createAcl',
        'click #stack-property-acl-list .edit': 'openAcl',
        'click .sg-list-delete-btn': 'deleteAcl',
        'click #property-sub-list .icon-edit': 'editSNS',
        'click #property-sub-list .icon-del': 'delSNS',
        'click #property-create-asg': 'openSNSModal'
      },
      render: function() {
        var str, t, title;
        t = template;
        if (this.model.isApp || this.model.isAppEdit) {
          if (this.model.attributes.isImport) {
            str = '<header class="property-sidebar-title sidebar-title truncate" id="property-title">Visualization - ' + this.model.attributes.vpcid + '<i class="icon-info tooltip property-header-info" data-tooltip="Currently you can rearrange the layout of visualisation and export it as PNG image file. Future version will include the feature to import VPC resource as an app. "></i></header>';
            $('#property-title').html(str);
          } else {
            title = "App - " + (this.model.get('name'));
          }
        } else {
          title = "Stack - " + (this.model.get('name'));
        }
        console.log(this.model.attributes);
        this.$el.html(template(this.model.attributes));
        if (title) {
          this.setTitle(title);
        }
        this.refreshACLList();
        if (!this.model.isApp) {
          this.updateSNSList(this.model.get("subscription"), true);
        }
        return null;
      },
      stackDescriptionChanged: function() {
        var description, stackDescTextarea, stackId;
        stackDescTextarea = $("#property-stack-description");
        stackId = this.model.get('id');
        description = stackDescTextarea.val();
        if (stackDescTextarea.parsley('validate')) {
          return this.trigger('STACK_DESC_CHANGED', description);
        }
      },
      stackNameChanged: function() {
        var name, stackId, stackNameInput;
        stackNameInput = $('#property-stack-name');
        stackId = this.model.get('id');
        name = stackNameInput.val();
        stackNameInput.parsley('custom', function(val) {
          if (!MC.validate('awsName', val)) {
            return lang.ide.PARSLEY_SHOULD_BE_A_VALID_STACK_NAME;
          }
          if (!MC.aws.aws.checkStackName(stackId, val)) {
            return sprintf(lang.ide.PARSLEY_TYPE_NAME_CONFLICT, 'Stack', name);
          }
        });
        if (stackNameInput.parsley('validate')) {
          this.trigger('STACK_NAME_CHANGED', name);
          this.setTitle("Stack - " + name);
        }
        return null;
      },
      refreshACLList: function() {
        return $('#stack-property-acl-list').html(acl_template(this.model.attributes));
      },
      createAcl: function() {
        return this.trigger("OPEN_ACL", this.model.createAcl());
      },
      openAcl: function(event) {
        this.trigger("OPEN_ACL", $(event.currentTarget).closest("li").attr("data-uid"));
        return null;
      },
      updateSNSList: function(snslist_data, textOnly) {
        var $clone, $list, $template, hasASG, sub, _i, _len;
        hasASG = this.model.get("has_asg");
        $(".property-sns-info").children().hide();
        if (!snslist_data || !snslist_data.length) {
          if (hasASG) {
            $("#property-sns-no-sub").show();
          } else {
            $("#property-sns-no-sub-no-asg").show();
          }
        } else if (!hasASG) {
          $("#property-sns-no-asg").show();
        }
        if (textOnly) {
          return;
        }
        $list = $("#property-sub-list");
        $list.find("li:not(.hide)").remove();
        $template = $list.find(".hide");
        for (_i = 0, _len = snslist_data.length; _i < _len; _i++) {
          sub = snslist_data[_i];
          $clone = $template.clone().removeClass("hide").appendTo($list);
          $clone.attr("data-uid", sub.id);
          $clone.find(".protocol").html(sub.protocol);
          $clone.find(".endpoint").html(sub.endpoint);
          if (sub.confirmed !== null && sub.confirmed === false) {
            $clone.find(".sns-action").html('<i class="icon-pending tooltip" data-tooltip="pendingConfirm" ></i>');
          } else {
            $clone.find(".sns-action").html('<i class="icon-del icon-remove"></i>');
          }
        }
        $("#property-stack-sns-num").html(snslist_data.length);
        return null;
      },
      delSNS: function(event) {
        var $li, uid;
        $li = $(event.currentTarget).closest("li");
        uid = $li.attr("data-uid");
        $li.remove();
        this.updateSNSList($("#property-sub-list").children(":not(.hide)"), true);
        return this.model.deleteSNS(uid);
      },
      editSNS: function(event) {
        var $sub_li, data;
        $sub_li = $(event.currentTarget).closest("li");
        data = {
          title: "Edit",
          uid: $sub_li.attr("data-uid"),
          protocol: $sub_li.find(".protocol").text(),
          endpoint: $sub_li.find(".endpoint").text()
        };
        this.openSNSModal(event, data);
        return null;
      },
      saveSNS: function(data) {
        var $dom;
        if (data.uid) {
          $dom = $("#property-sub-list").children("li[data-uid='" + data.uid + "']");
          $dom.find(".protocol").html(data.protocol);
          $dom.find(".endpoint").html(data.endpoint);
          if (data.confirmed !== null && data.confirmed === false) {
            $dom.find(".sns-action").html('<i class="icon-pending tooltip" data-tooltip="pendingConfirm" ></i>');
          } else {
            $dom.find(".sns-action").html('<i class="icon-del icon-remove"></i>');
          }
        }
        this.model.addSubscription(data);
        if (!data.uid) {
          return this.updateSNSList(this.model.get("subscription"));
        }
      },
      openSNSModal: function(event, data) {
        var $modal, self, updateEndpoint;
        if (!data) {
          data = {
            protocol: "email",
            title: "Add"
          };
        }
        modal(sub_template(data));
        $modal = $("#property-asg-sns-modal");
        $modal.find(".dropdown").find(".item").each(function() {
          if ($(this).data("id") === data.protocol) {
            return $(this).addClass("selected").parent().siblings().text($(this).text());
          }
        });
        updateEndpoint = function(protocol) {
          var $input, endPoint, errorMsg, placeholder, type;
          $input = $(".property-asg-ep");
          switch ($modal.find(".selected").data("id")) {
            case "sqs":
              placeholder = lang.ide.PROP_STACK_AMAZON_ARN;
              type = lang.ide.PROP_STACK_SQS;
              errorMsg = lang.ide.PARSLEY_PLEASE_PROVIDE_A_VALID_AMAZON_SQS_ARN;
              break;
            case "arn":
              placeholder = lang.ide.PROP_STACK_AMAZON_ARN;
              type = lang.ide.PROP_STACK_ARN;
              errorMsg = lang.ide.PARSLEY_PLEASE_PROVIDE_A_VALID_APPLICATION_ARN;
              break;
            case "email":
              placeholder = lang.ide.PROP_STACK_EXAMPLE_EMAIL;
              type = lang.ide.PROP_STACK_EMAIL;
              errorMsg = lang.ide.HEAD_MSG_ERR_UPDATE_EMAIL3;
              break;
            case "email-json":
              placeholder = lang.ide.PROP_STACK_EXAMPLE_EMAIL;
              type = lang.ide.PROP_STACK_EMAIL;
              errorMsg = lang.ide.HEAD_MSG_ERR_UPDATE_EMAIL3;
              break;
            case "sms":
              placeholder = lang.ide.PROP_STACK_E_G_1_206_555_6423;
              type = lang.ide.PROP_STACK_USPHONE;
              errorMsg = lang.ide.PARSLEY_PLEASE_PROVIDE_A_VALID_PHONE_NUMBER;
              break;
            case "http":
              placeholder = lang.ide.PROP_STACK_HTTP_WWW_EXAMPLE_COM;
              type = lang.ide.PROP_STACK_HTTP;
              errorMsg = lang.ide.PARSLEY_PLEASE_PROVIDE_A_VALID_URL;
              break;
            case "https":
              placeholder = lang.ide.PROP_STACK_HTTPS_WWW_EXAMPLE_COM;
              type = lang.ide.PROP_STACK_HTTPS;
              errorMsg = lang.ide.PARSLEY_PLEASE_PROVIDE_A_VALID_URL;
          }
          endPoint = $('#property-asg-endpoint');
          endPoint.attr("placeholder", placeholder);
          endPoint.parsley('custom', function(value) {
            if (type && value && (!MC.validate(type, value))) {
              return errorMsg;
            }
          });
          if (endPoint.val().length) {
            endPoint.parsley('validate');
          }
          return null;
        };
        updateEndpoint();
        $modal.on("OPTION_CHANGE", updateEndpoint);
        self = this;
        return $("#property-asg-sns-done").on("click", function() {
          var endPoint;
          endPoint = $("#property-asg-endpoint");
          if (endPoint.parsley('validate')) {
            data = {
              uid: $modal.attr("data-uid"),
              protocol: $modal.find(".selected").data("id"),
              endpoint: endPoint.val()
            };
            modal.close();
            self.saveSNS(data);
          }
          return null;
        });
      },
      deleteAcl: function(event) {
        var $target, aclName, aclUID, assoCont, dialog_template, that;
        $target = $(event.currentTarget);
        assoCont = parseInt($target.attr('data-count'), 10);
        aclUID = $target.closest("li").attr('data-uid');
        if (assoCont) {
          that = this;
          aclName = $target.attr('data-name');
          dialog_template = MC.template.modalDeleteSGOrACL({
            title: 'Delete Network ACL',
            main_content: "Are you sure you want to delete " + aclName + "?",
            desc_content: "Subnets associated with " + aclName + " will use DefaultACL."
          });
          return modal(dialog_template, false, function() {
            return $('#modal-confirm-delete').click(function() {
              that.model.removeAcl(aclUID);
              that.refreshACLList();
              return modal.close();
            });
          });
        } else {
          this.model.removeAcl(aclUID);
          return this.refreshACLList();
        }
      }
    });
    return new StackView();
  });

}).call(this);

(function() {
  define('module/design/property/sglist/model',["Design", "constant"], function(Design, constant) {
    var SGListModel;
    SGListModel = Backbone.Model.extend({
      getSGInfoList: function() {
        var SgAssoModel, SgRuleSetModel, asso, assos, deletable, design, enabledSG, enabledSGArr, isELBParent, isStackParent, needShow, parent_model, readonly, resource, resource_id, ruleSets, ruleset, sg, sgChecked, sgRuleAry, sg_list, usedSG, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref;
        design = Design.instance();
        parent_model = this.parent_model;
        readonly = false;
        if (design.modeIsApp() || design.modeIsAppView()) {
          readonly = true;
        } else if (design.modeIsAppEdit()) {
          if (parent_model.isSGListReadOnly) {
            readonly = parent_model.isSGListReadOnly();
          }
        }
        resource_id = parent_model.get("uid");
        resource = design.component(resource_id);
        if (resource) {
          isELBParent = resource.type === constant.RESTYPE.ELB;
          isStackParent = false;
          resource_id = resource.id;
        } else {
          isELBParent = false;
          isStackParent = true;
          resource_id = "";
        }
        sg_list = [];
        enabledSG = {};
        enabledSGArr = [];
        SgAssoModel = Design.modelClassForType("SgAsso");
        _ref = Design.modelClassForType(constant.RESTYPE.SG).allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          if (sg.isElbSg() && !(isELBParent || isStackParent)) {
            continue;
          }
          sgChecked = !!SgAssoModel.findExisting(sg, resource);
          needShow = isStackParent || (!readonly) || sgChecked;
          if (!needShow) {
            continue;
          }
          if (sg.isDefault() || readonly || sg.get("appId")) {
            deletable = false;
          } else {
            deletable = true;
          }
          assos = sg.connections("SgAsso");
          for (_j = 0, _len1 = assos.length; _j < _len1; _j++) {
            asso = assos[_j];
            if (asso.connectsTo(resource_id)) {
              enabledSG[sg.id] = true;
              enabledSGArr.push(sg);
              break;
            }
          }
          sg_list.push({
            uid: sg.id,
            color: sg.color,
            name: sg.get("name"),
            desc: sg.get("description"),
            ruleCount: sg.ruleCount(),
            memberCount: sg.getMemberList().length,
            hideCheck: readonly || isStackParent,
            deletable: deletable,
            used: enabledSG[sg.id]
          });
        }
        sgRuleAry = [];
        for (_k = 0, _len2 = enabledSGArr.length; _k < _len2; _k++) {
          usedSG = enabledSGArr[_k];
          ruleSets = usedSG.connections("SgRuleSet");
          for (_l = 0, _len3 = ruleSets.length; _l < _len3; _l++) {
            ruleset = ruleSets[_l];
            sgRuleAry = sgRuleAry.concat(ruleset.toPlainObjects(usedSG.id));
          }
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        this.set({
          is_stack_sg: isStackParent,
          only_one_sg: enabledSGArr.length === 1,
          sg_list: sg_list,
          sg_length: isStackParent ? sg_list.length : enabledSGArr.length,
          readonly: readonly,
          sg_rule_list: SgRuleSetModel.getPlainObjFromRuleSets(sgRuleAry)
        });
        this.sortSGList();
        this.sortSGRule();
        return null;
      },
      sortSGList: function() {
        this.attributes.sg_list = this.attributes.sg_list.sort(function(a_sg, b_sg) {
          if (a_sg.name === "DefaultSG") {
            return -1;
          }
          if (b_sg.name === "DefaultSG") {
            return 1;
          }
          if (a_sg.name < b_sg.name) {
            return -1;
          }
          if (a_sg.name === b_sg.name) {
            return 0;
          }
          if (a_sg.name > b_sg.name) {
            return 1;
          }
        });
        return this.attributes.sg_list;
      },
      sortSGRule: function(key) {
        var sgRuleList;
        sgRuleList = _.sortBy(this.attributes.sg_rule_list, key || "direction");
        this.set("sg_rule_list", sgRuleList);
        return null;
      },
      assignSG: function(sgUID, sgChecked) {
        var SgAsso, asso, design, uid;
        SgAsso = Design.modelClassForType("SgAsso");
        design = Design.instance();
        uid = this.parent_model.get("uid");
        console.assert(uid, "Resource not found when assigning SG");
        asso = new SgAsso(design.component(uid), design.component(sgUID));
        if (sgChecked === false) {
          asso.remove();
        }
        return null;
      },
      deleteSG: function(sgUID) {
        Design.instance().component(sgUID).remove();
        return null;
      },
      isElbSg: function(sgUID) {
        return Design.instance().component(sgUID).isElbSg();
      },
      getElbNameBySgId: function(sgUID) {
        var elb, sg, _i, _len, _ref;
        sg = Design.instance().component(sgUID);
        if (sg.isElbSg()) {
          _ref = Design.modelClassForType(constant.RESTYPE.ELB).allObjects();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elb = _ref[_i];
            if (elb.getElbSg() === sg) {
              return elb.get("name");
            }
          }
        }
        return "";
      },
      createNewSG: function() {
        var SgAsso, SgModel, component, model;
        SgModel = Design.modelClassForType(constant.RESTYPE.SG);
        model = new SgModel();
        component = Design.instance().component(this.parent_model.get("uid"));
        if (component) {
          SgAsso = Design.modelClassForType("SgAsso");
          new SgAsso(model, component);
        }
        return model.id;
      }
    });
    return new SGListModel();
  });

}).call(this);

define('module/design/property/sglist/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<ul class=\"tab sg-info-list-tab\">\n	<li data-tab-target=\"#item-group\" class=\"active\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_TAB_GROUP", {hash:{},data:data}))
    + "</li>\n	<li data-tab-target=\"#item-rule\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_TAB_RULE", {hash:{},data:data}))
    + "</li>\n</ul>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li class=\"clearfix\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.hideCheck), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<div class=\"col3 sg-edit-icon tooltip icon-btn-details\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_TIP_VIEW_DETAIL", {hash:{},data:data}))
    + "'></div>\n\n				<div class=\"col2\">\n					<div class=\"col2-1 truncate\"><div class=\"sg-color\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.color)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></div><span class=\"sg-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n					<div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n					<div class=\"col2-3 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.ruleCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LBL_MEMBER", {hash:{},data:data}));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.deletable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n			</li>\n			";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<div class=\"checkbox-wrap col1\">\n						<div class=\"checkbox\">\n							<input class=\"sg-list-association-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.used), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"sg-list-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n							<label for=\"sg-list-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n						</div>\n					</div>\n				";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " | <a class=\"sg-list-delete-btn\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-count=\""
    + escapeExpression(((stack1 = (depth0 && depth0.memberCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_LNK_DELETE", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "<a href=\"javascript:void(0)\" class=\"add-to-list action-link\" id=\"add-sg-btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGLIST_BTN_CREATE_NEW_SG", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.is_stack_sg), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"tab-content\">\n	<div id=\"item-group\" class=\"active tab-item pos-r\">\n		<ul class=\"acl-sg-info-list property-list\" id=\"sg-info-list\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sg_list), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readonly), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n\n	<div id=\"item-rule\" class=\"tab-item\">\n		<div class=\"rule-list-sort property-control-group\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"selectbox\" id=\"sg-rule-filter-select\">\n				<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"item selected\" data-id=\"direction\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"relation\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"protocol\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_PROTOCOL", {hash:{},data:data}))
    + "</li>\n				</ul>\n			</div>\n		</div>\n		<ul class=\"sg-rule-list property-list\" id=\"sglist-rule-list\"> </ul>\n	</div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/sglist/view',['./template/stack'], function(template) {
    var SGListView;
    SGListView = Backbone.View.extend({
      events: {
        'click #sg-info-list .sg-edit-icon': 'openSgPanel',
        'click #add-sg-btn': 'openSgPanel',
        'click .sg-list-association-check': 'assignSGToComp',
        'click .sg-list-delete-btn': 'deleteSGFromComp',
        'OPTION_CHANGE #sg-rule-filter-select': 'sortSgRule'
      },
      render: function() {
        this.model.getSGInfoList();
        this.setElement($('.sg-group'));
        this.$el.html(template(this.model.attributes));
        $("#sglist-rule-list").html(MC.template.sgRuleList(this.model.attributes.sg_rule_list));
        return $('#property-head-sg-num').text(this.model.attributes.sg_length);
      },
      openSgPanel: function(event) {
        var sgUID;
        if (event.currentTarget.id === "add-sg-btn") {
          sgUID = this.model.createNewSG();
        } else {
          sgUID = $(event.currentTarget).closest("li").attr("data-uid");
        }
        return this.trigger('OPEN_SG', sgUID);
      },
      refreshSGList: function() {
        return this.render();
      },
      assignSGToComp: function(event) {
        var $checked, $target, sgChecked, sgUID;
        $target = $(event.currentTarget);
        $checked = $target.closest("#sg-info-list").find(":checked");
        if ($checked.length === 0) {
          return false;
        }
        sgUID = $target.closest("li").attr('data-uid');
        sgChecked = $target.prop('checked');
        this.model.assignSG(sgUID, sgChecked);
        this.render();
        return null;
      },
      deleteSGFromComp: function(event) {
        var $target, descContent, mainContent, memberNum, sgName, sgUID, that, tpl;
        that = this;
        $target = $(event.currentTarget);
        sgUID = $target.closest('li').attr('data-uid');
        memberNum = Number($target.attr('data-count'));
        sgName = $target.attr('data-name');
        if (memberNum) {
          mainContent = "Are you sure you want to delete " + sgName + "?";
          descContent = 'The firewall settings of ' + sgName + '\'s member will be affected. Member only has this security group will be using DefaultSG.';
        }
        if (mainContent) {
          tpl = MC.template.modalDeleteSGOrACL({
            title: 'Delete Security Group',
            main_content: mainContent,
            desc_content: descContent
          });
          return modal(tpl, false, function() {
            return $('#modal-confirm-delete').click(function() {
              that.model.deleteSG(sgUID);
              that.render();
              return modal.close();
            });
          });
        } else {
          this.model.deleteSG(sgUID);
          return this.render();
        }
      },
      sortSgRule: function(event) {
        var sg_rule_list, sortType;
        sg_rule_list = $('#sglist-rule-list');
        sortType = $(event.target).find('.selected').attr('data-id');
        this.model.sortSGRule(sortType);
        return $("#sglist-rule-list").html(MC.template.sgRuleList(this.model.attributes.sg_rule_list));
      }
    });
    return new SGListView();
  });

}).call(this);

(function() {
  define('module/design/property/sglist/main',['../base/main', './model', './view', 'event'], function(PropertyModel, model, view, ide_event) {
    var loadModule, onUnloadSubPanel, refresh;
    view.on('OPEN_SG', function(sgUID) {
      PropertyModel.loadSubPanel("SG", sgUID);
      return null;
    });
    view.model = model;
    refresh = function() {
      view.render();
      return null;
    };
    loadModule = function(parent_model) {
      model.parent_model = parent_model;
      view.render();
      return null;
    };
    onUnloadSubPanel = function(id) {
      if (id === "SG") {
        return view.render();
      }
    };
    return {
      loadModule: loadModule,
      refresh: refresh,
      onUnloadSubPanel: onUnloadSubPanel
    };
  });

}).call(this);

(function() {
  define('module/design/property/stack/main',['../base/main', './model', './view', '../sglist/main', 'event', "Design"], function(PropertyModule, model, view, sglist_main, ide_event, Design) {
    var StackModule, ideEvents;
    view.on('STACK_NAME_CHANGED', function(name) {
      var design;
      design = Design.instance();
      design.set("name", name);
      ide_event.trigger(ide_event.UPDATE_DESIGN_TAB, design.get("id"), name + ' - stack');
      return null;
    });
    view.on('STACK_DESC_CHANGED', function(description) {
      var design;
      design = Design.instance();
      design.set('description', description);
      return null;
    });
    view.on('OPEN_ACL', function(uid) {
      PropertyModule.loadSubPanel("ACL", uid);
      return null;
    });
    ideEvents = {};
    ideEvents[ide_event.RESOURCE_QUICKSTART_READY] = function() {
      ide_event.trigger(ide_event.OPEN_PROPERTY);
      return null;
    };
    StackModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: ["Stack", "default"],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        if (id === "ACL") {
          this.model.getNetworkACL();
          return this.view.refreshACLList();
        }
      },

      /*  * # # # # # # # # # # #
       * For stack mode
       */
      initStack: function(uid) {
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = false;
        this.model.isStack = true;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },

      /*  * # # # # # # # # # # #
       * For app mode
       */
      initApp: function(uid) {
        this.model = model;
        this.model.isApp = true;
        this.model.isAppEdit = false;
        this.model.isStack = false;
        this.view = view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
        return null;
      },

      /*  * # # # # # # # # #
       */
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = true;
        this.model.isStack = false;
        this.view = view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/instance/model',['../base/model', 'constant', 'event', 'i18n!nls/lang.js'], function(PropertyModel, constant, ide_event, lang) {
    var InstanceModel;
    InstanceModel = PropertyModel.extend({
      init: function(uid) {
        var agentData, attr, component, design, eni, vpc;
        component = Design.instance().component(uid);
        attr = component.toJSON();
        attr.uid = uid;
        attr.classic_stack = false;
        attr.can_set_ebs = component.isEbsOptimizedEnabled();
        attr.instance_type = component.getInstanceTypeList();
        attr.tenancy = component.isDefaultTenancy();
        attr.displayCount = attr.count - 1;
        eni = component.getEmbedEni();
        attr.number_disable = eni && eni.connections('RTB_Route').length > 0;
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).allObjects()[0];
        attr.force_tenacy = vpc && !vpc.isDefaultTenancy();
        design = Design.instance();
        agentData = design.get('agent');
        attr.stackAgentEnable = agentData.enabled;
        this.set(attr);
        this.getAmi();
        this.getKeyPair();
        this.getEni();
        return null;
      },
      getKeyPair: function() {
        var selectedKP;
        selectedKP = Design.instance().component(this.get("uid")).connectionTargets("KeypairUsage")[0];
        this.set("keypair", selectedKP.getKPList());
        return null;
      },
      addKP: function(kp_name) {
        var KpModel, kp, _i, _len, _ref;
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        _ref = KpModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kp = _ref[_i];
          if (kp.get("name") === kp_name) {
            return false;
          }
        }
        kp = new KpModel({
          name: kp_name
        });
        return kp.id;
      },
      deleteKP: function(kp_uid) {
        Design.instance().component(kp_uid).remove();
        return null;
      },
      setKP: function(kp_uid) {
        var design, instance;
        design = Design.instance();
        instance = design.component(this.get("uid"));
        design.component(kp_uid).assignTo(instance);
        return null;
      },
      setCount: function(val) {
        return Design.instance().component(this.get("uid")).setCount(val);
      },
      setEbsOptimized: function(value) {
        return Design.instance().component(this.get("uid")).set("ebsOptimized", value);
      },
      setTenancy: function(value) {
        return Design.instance().component(this.get("uid")).setTenancy(value);
      },
      setMonitoring: function(value) {
        return Design.instance().component(this.get("uid")).set("monitoring", value);
      },
      setUserData: function(value) {
        return Design.instance().component(this.get("uid")).set("userData", value);
      },
      setEniDescription: function(value) {
        return Design.instance().component(this.get("uid")).getEmbedEni().set("description", value);
      },
      setSourceCheck: function(value) {
        return Design.instance().component(this.get("uid")).getEmbedEni().set("sourceDestCheck", value);
      },
      setPublicIp: function(value) {
        Design.instance().component(this.get("uid")).getEmbedEni().set("assoPublicIp", value);
        if (value) {
          return Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
      },
      getAmi: function() {
        var ami, ami_id, comp, data, rdEbs, rdName, rootDevice;
        ami_id = this.get("imageId");
        comp = Design.instance().component(this.get("uid"));
        ami = comp.getAmi();
        if (!ami) {
          data = {
            name: ami_id + " is not available.",
            icon: "ami-not-available.png",
            unavailable: true
          };
        } else {
          data = {
            name: ami.name,
            icon: ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png"
          };
        }
        this.set('instance_ami', data);
        if (ami && ami.blockDeviceMapping) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (rdName && !rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                rdName = key;
              }
              return null;
            });
          }
          rootDevice = {
            name: rdName,
            size: parseInt(comp.get("rdSize"), 10),
            iops: comp.get("rdIops")
          };
          if (rootDevice.size < 10) {
            rootDevice.iops = "";
            rootDevice.iopsDisabled = true;
          }
          this.set("rootDevice", rootDevice);
        }
        this.set("min_volume_size", comp.getAmiRootDeviceVolumeSize());
        return null;
      },
      canSetInstanceType: function(value) {
        var config, eni_number, instance, max_eni_num;
        instance = Design.instance().component(this.get("uid"));
        eni_number = instance.connectionTargets("EniAttachment").length + 1;
        config = instance.getInstanceTypeConfig(value);
        max_eni_num = config ? config.eni : 2;
        if (eni_number <= 2 || eni_number <= max_eni_num) {
          return true;
        }
        return sprintf(lang.ide.PROP_WARN_EXCEED_ENI_LIMIT, value, max_eni_num);
      },
      setInstanceType: function(value) {
        var instance;
        instance = Design.instance().component(this.get("uid"));
        instance.setInstanceType(value);
        this.getEni();
        return instance.isEbsOptimizedEnabled();
      },
      getEni: function() {
        var eni, eni_obj, instance;
        instance = Design.instance().component(this.get("uid"));
        eni = instance.getEmbedEni();
        if (!eni) {
          return;
        }
        eni_obj = eni.toJSON();
        eni_obj.ips = eni.getIpArray();
        eni_obj.ips[0].unDeletable = true;
        this.set("eni", eni_obj);
        this.set("multi_enis", instance.connections("EniAttachment").length > 0);
        return null;
      },
      attachEip: function(eip_index, attach) {
        Design.instance().component(this.get("uid")).getEmbedEni().setIp(eip_index, null, null, attach);
        this.attributes.eni.ips[eip_index].hasEip = attach;
        if (attach) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        return null;
      },
      removeIp: function(index) {
        Design.instance().component(this.get("uid")).getEmbedEni().removeIp(index);
        return null;
      },
      addIp: function() {
        var comp, ips;
        comp = Design.instance().component(this.get("uid")).getEmbedEni();
        comp.addIp();
        ips = comp.getIpArray();
        ips[0].unDeletable = true;
        this.get("eni").ips = ips;
        return null;
      },
      isValidIp: function(ip) {
        return Design.instance().component(this.get("uid")).getEmbedEni().isValidIp(ip);
      },
      canAddIP: function() {
        return Design.instance().component(this.get("uid")).getEmbedEni().canAddIp();
      },
      setIp: function(idx, ip, autoAssign) {
        Design.instance().component(this.get("uid")).getEmbedEni().setIp(idx, ip, autoAssign);
        return null;
      },
      getStateData: function() {
        return Design.instance().component(this.get("uid")).getStateData();
      },
      setIops: function(iops) {
        Design.instance().component(this.get("uid")).set("rdIops", iops);
        return null;
      },
      setVolumeSize: function(size) {
        Design.instance().component(this.get("uid")).set("rdSize", size);
        return null;
      }
    });
    return new InstanceModel();
  });

}).call(this);

define('module/design/property/instance/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "single";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "disabled=\"disabled\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_YOU_CANNOT_SPECIFY_INSTANCE_NUMBER", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_IF_THE_QUANTITY_IS_MORE_THAN_1", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "style=\"color:red;\"";
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox selectbox-mega\" id=\"instance-type-select\">\n				<div class=\"selection\"></div>\n				<ul class=\"dropdown\"> ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_type), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </ul>\n			</div>\n		</section>\n		";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" tabindex=\"-1\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hide), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n						<div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n					</li>\n				";
  return buffer;
  }
function program11(depth0,data) {
  
  
  return "selected ";
  }

function program13(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program15(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TENANCY", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"tenancy-select\">\n				<div class=\"selection\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tenancy), {hash:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.force_tenacy), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<li class=\"item ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.tenancy), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"dedicated\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TENANCY_DELICATED", {hash:{},data:data}))
    + "</li>\n				</ul>\n			</div>\n		</section>\n		";
  return buffer;
  }
function program18(depth0,data) {
  
  
  return "Default";
  }

function program20(depth0,data) {
  
  
  return "Dedicated";
  }

function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.tenancy), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"default\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TENANCY_DEFAULT", {hash:{},data:data}))
    + "</li>\n					";
  return buffer;
  }
function program23(depth0,data) {
  
  
  return "selected";
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-using=\""
    + escapeExpression(((stack1 = (depth0 && depth0.using)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							";
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</li>\n						";
  return buffer;
  }
function program26(depth0,data) {
  
  
  return " selected";
  }

function program28(depth0,data) {
  
  
  return "<span class=\"icon-remove\"></span>";
  }

function program30(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" checked=\"true\" value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n				";
  }

function program32(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n				";
  }

function program34(depth0,data) {
  
  
  return "hide";
  }

function program36(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<div class=\"property-info\">User Data is disabled to allow installing OpsAgent for VisualOps. <a href=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_AGENT_USER_DATA_URL", {hash:{},data:data}))
    + "\" target=\"_blank\">View content</a>.</div>\n			";
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<label for=\"property-instance-user-data\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_USER_DATA", {hash:{},data:data}))
    + "</label>\n			<textarea id=\"property-instance-user-data\">"
    + escapeExpression(((stack1 = (depth0 && depth0.userData)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n			";
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">Root Device</div>\n	<div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</label>\n      <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </section>\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</label>\n      <div class=\"ranged-number-input\">\n          <label for=\"volume-size-ranged\"></label>\n          <input id=\"volume-size-ranged\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"volume-size-ranged\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-required=\"true\" data-type=\"number\"/>\n      <label for=\"volume-property-ranged-number\" >GB</label>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</label>\n      <div id=\"volume-type-radios\">\n      <div>\n      	<div class=\"radio\">\n          <input id=\"radio-standard\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"radio-standard\"></label>\n        </div>\n        <label for=\"radio-standard\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE_STANDARD", {hash:{},data:data}))
    + "</label>\n      </div>\n      <div ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(41, program41, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_MSG_WARN", {hash:{},data:data}))
    + "\">\n        <div class=\"radio\">\n          <input id=\"radio-iops\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(43, program43, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"radio-iops\"></label>\n        </div>\n        <label for=\"radio-iops\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE_IOPS", {hash:{},data:data}))
    + "</label>\n      </div>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\" id=\"iops-group\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(45, program45, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label>IOPS</label>\n        <div class=\"ranged-number-input\">\n          <label for=\"iops-ranged\"></label>\n          <input id=\"iops-ranged\" type=\"text\" class=\"input\" min=\"100\" max=\"2000\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n    </section>\n	</div>\n  ";
  return buffer;
  }
function program41(depth0,data) {
  
  
  return "class=\"tooltip\"";
  }

function program43(depth0,data) {
  
  
  return "disabled";
  }

function program45(depth0,data) {
  
  
  return "style=\"display:none\"";
  }

function program47(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-instance-ni-description\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_DESC", {hash:{},data:data}))
    + "</label>\n			<textarea id=\"property-instance-ni-description\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck), {hash:{},inverse:self.program(50, program50, data),fn:self.program(48, program48, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<label for=\"property-instance-source-check\"></label>\n			</div>\n			<label for=\"property-instance-source-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_SOURCE_DEST_CHECK", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multi_enis), {hash:{},inverse:self.program(54, program54, data),fn:self.program(52, program52, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			<div class=\"checkbox\">\n				<input id=\"property-instance-public-ip\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.multi_enis), {hash:{},inverse:self.noop,fn:self.program(56, program56, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.assoPublicIp), {hash:{},inverse:self.noop,fn:self.program(58, program58, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-instance-public-ip\" />\n				<label for=\"property-instance-public-ip\"></label>\n			</div>\n			<label for=\"property-instance-public-ip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_AUTO_PUBLIC_IP", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"network-list-wrap\">\n				<div class=\"network-list-header clearfix\">\n					"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "\n					<button id=\"instance-ip-add\" class=\"right btn btn-blue btn-small tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_TIP_ADD_IP_ADDRESS", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_ADD_IP", {hash:{},data:data}))
    + "</button>\n				</div>\n				<ul class=\"network-list\" id=\"property-network-list\" data-bind=\"true\"></ul>\n			</div>\n		</section>\n	</div>\n	";
  return buffer;
  }
function program48(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-source-check\" type=\"checkbox\" checked=\"true\" value=\"None\" name=\"property-instance-source-check\" />\n				";
  }

function program50(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-source-check\" type=\"checkbox\" value=\"None\" name=\"property-instance-source-check\" />\n				";
  }

function program52(depth0,data) {
  
  var buffer = "";
  buffer += "class=\"property-control-group tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_PUBLIC_IP_CANNOT_BE_ASSOCIATED", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program54(depth0,data) {
  
  
  return "class=\"property-control-group\"";
  }

function program56(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program58(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

  buffer += "<article>\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-instance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_HOSTNAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n\n			<div class=\"property-instance-name-wrap ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.count), 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				<div class=\"name-count-wrap\">\n					-[0-<span id=\"property-instance-name-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.displayCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>]\n				</div>\n				<div class=\"fitfloat\">\n					<input class=\"input instance-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-name\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n				</div>\n			</div>\n\n		</section>\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-instance-count\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_NUMBER", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n			<input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-count\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.number_disable), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n		</section>\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI", {hash:{},data:data}))
    + "</label>\n			<div id=\"property-ami\" class=\"property-block-wrap clearfix\" data-uid='"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n				<img class=\"property-ami-icon left\" src=\"./assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<div class=\"property-ami-label\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_set_ebs), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			<div class=\"checkbox\">\n				<input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ebsOptimized), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"ebs-optimized\" />\n				<label for=\"property-instance-ebs-optimized\"></label>\n			</div>\n			<label for=\"property-instance-ebs-optimized\">EBS Optimized</label>\n		</section>\n		";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.classic_stack), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"keypair-select\">\n				<div class=\"selection\"></div>\n				<div style=\"height: 120px; width:260px;\" class=\"dropdown scroll-wrap scrollbar-auto-hide  clearfix\">\n					<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n					<div class=\"scroll-content\">\n						<ul> ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keypair), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </ul>\n					</div>\n				</div>\n\n				<div class=\"editor\">\n					<a href=\"#\" class=\"editbtn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_NEW_KP", {hash:{},data:data}))
    + "</a>\n					<div class=\"edit\">\n						<button class=\"btn btn-blue btn-small\">OK</button>\n						<span class=\"fitfloat\" data-bind=\"true\">\n							<input class=\"input\" type=\"text\" placeholder=\"Key Pair Name\" data-ignore=\"true\"/>\n						</span>\n					</div>\n				</div>\n			</div>\n		</section>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ADVANCED_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.program(32, program32, data),fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<label for=\"property-instance-enable-cloudwatch\"></label>\n			</div>\n			<label for=\"property-instance-enable-cloudwatch\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_CW_ENABLED", {hash:{},data:data}))
    + "</label>\n\n			<p class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-info\" id=\"property-cloudwatch-warn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_CW_WARN", {hash:{},data:data}))
    + "<a target=\"_blank\" href=\"http://aws.amazon.com/cloudwatch\">Amazon Cloud Watch product page</a></p>\n		</section>\n		<section class=\"property-control-group\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stackAgentEnable), {hash:{},inverse:self.program(38, program38, data),fn:self.program(36, program36, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</section>\n	</div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eni), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<div class=\"option-group-head\" id=\"sg-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/instance/view',['../base/view', './template/stack', 'i18n!nls/lang.js', 'constant'], function(PropertyView, template, lang, constant) {
    var InstanceView, noop;
    noop = function() {
      return null;
    };
    InstanceView = PropertyView.extend({
      events: {
        'change .instance-name': 'instanceNameChange',
        'change #property-instance-count': 'countChange',
        'change #property-instance-ebs-optimized': 'ebsOptimizedSelect',
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-user-data': 'userdataChange',
        'change #property-instance-ni-description': 'eniDescriptionChange',
        'change #property-instance-source-check': 'sourceCheckChange',
        'change #property-instance-public-ip': 'publicIpChange',
        'OPTION_CHANGE #instance-type-select': "instanceTypeSelect",
        'OPTION_CHANGE #tenancy-select': "tenancySelect",
        'click #property-ami': 'openAmiPanel',
        'OPTION_CHANGE #keypair-select': "setKP",
        'EDIT_UPDATE #keypair-select': "addKP",
        'click #keypair-select .icon-remove': "deleteKP",
        "EDIT_FINISHED #keypair-select": "updateKPSelect",
        'click .toggle-eip': 'setEip',
        'click #instance-ip-add': "addIp",
        'click #property-network-list .icon-remove': "removeIp",
        'change .input-ip': 'syncIPList',
        'click #volume-type-radios input': 'changeVolumeType',
        'keyup #iops-ranged': 'changeIops',
        'keyup #volume-size-ranged': 'sizeChanged'
      },
      changeVolumeType: function(event) {
        var $this, iops, volumeSize;
        $this = $(event.currentTarget);
        if ($this.is(":disabled")) {
          return;
        }
        $("#iops-group").toggle($this.attr("id") === "radio-iops");
        if ($this.attr("id") === "radio-iops") {
          volumeSize = parseInt($('#volume-size-ranged').val(), 10);
          iops = volumeSize * 10;
          return $("#iops-ranged").val(iops).keyup();
        } else {
          this.model.setIops("");
          return $("#iops-ranged").val("");
        }
      },
      changeIops: function() {
        if ($('#iops-ranged').parsley('validate')) {
          this.model.setIops($('#iops-ranged').val());
        }
        return null;
      },
      sizeChanged: function(event) {
        var $iops, iops, iopsDisabled, volumeSize;
        if (!$('#volume-size-ranged').parsley('validate')) {
          return;
        }
        volumeSize = parseInt($('#volume-size-ranged').val(), 10);
        this.model.setVolumeSize(volumeSize);
        if (volumeSize < 10) {
          this.model.setIops("");
          iopsDisabled = true;
        }
        $iops = $('#volume-type-radios').children("div").last().toggleClass("tooltip", iopsDisabled).find('input');
        if (iopsDisabled) {
          $iops.attr("disabled", "disabled");
          $("#radio-standard").click();
          $("#iops-group").hide();
        } else {
          $iops.removeAttr('disabled');
        }
        iops = parseInt($("#iops-ranged").val(), 10) || 0;
        if (iops) {
          if (iops > volumeSize * 10) {
            iops = volumeSize * 10;
            $("#iops-ranged").val(iops);
          }
          $("#iops-ranged").keyup();
        }
        return null;
      },
      render: function() {
        var me;
        this.$el.html(template(this.model.attributes));
        this.refreshIPList();
        me = this;
        $('#volume-size-ranged').parsley('custom', function(val) {
          val = +val;
          if (!val || val > 1024 || val < me.model.attributes.min_volume_size) {
            return sprintf(lang.ide.PARSLEY_VOLUME_SIZE_OF_ROOTDEVICE_MUST_IN_RANGE, me.model.attributes.min_volume_size);
          }
        });
        $('#iops-ranged').parsley('custom', function(val) {
          var volume_size;
          val = +val;
          volume_size = parseInt($('#volume-size-ranged').val(), 10);
          if (val > 4000 || val < 100) {
            return lang.ide.PARSLEY_IOPS_MUST_BETWEEN_100_4000;
          } else if (val > 10 * volume_size) {
            return lang.ide.PARSLEY_IOPS_MUST_BE_LESS_THAN_10_TIMES_OF_VOLUME_SIZE;
          }
        });
        return this.model.attributes.name;
      },
      instanceNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "Instance")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      countChange: function(event) {
        var target, that, val;
        target = $(event.currentTarget);
        that = this;
        target.parsley('custom', function(val) {
          if (isNaN(val) || val > 99 || val < 1) {
            return lang.ide.PARSLEY_THIS_VALUE_MUST_BETWEEN_1_99;
          }
        });
        if (target.parsley('validate')) {
          this.refreshIPList();
          val = +target.val();
          this.model.setCount(val);
          $(".property-instance-name-wrap").toggleClass("single", val === 1);
          $("#property-instance-name-count").text(val - 1);
          return this.setEditableIP(val === 1);
        }
      },
      setEditableIP: function(enable) {
        var $parent;
        $parent = $("#property-network-list");
        if (enable) {
          $parent.find(".input-ip-wrap").removeClass("disabled").find(".name").data("tooltip", lang.ide.PROP_INSTANCE_IP_MSG_1).find(".input-ip").prop("disabled", "");
        } else {
          $parent.find(".input-ip-wrap").addClass("disabled").find(".name").data("tooltip", lang.ide.PROP_INSTANCE_IP_MSG_2).find(".input-ip").attr("disabled", "disabled");
        }
        return null;
      },
      instanceTypeSelect: function(event, value) {
        var $ebs, canset, has_ebs;
        canset = this.model.canSetInstanceType(value);
        if (canset !== true) {
          notification("error", canset);
          event.preventDefault();
          return;
        }
        has_ebs = this.model.setInstanceType(value);
        $ebs = $("#property-instance-ebs-optimized");
        $ebs.closest(".property-control-group").toggle(has_ebs);
        if (!has_ebs) {
          $ebs.prop("checked", false);
        }
        return this.refreshIPList();
      },
      ebsOptimizedSelect: function(event) {
        this.model.setEbsOptimized(event.target.checked);
        return null;
      },
      tenancySelect: function(event, value) {
        var $t1, $type, show;
        $type = $("#instance-type-select");
        $t1 = $type.find("[data-id='t1.micro']");
        if ($t1.length) {
          show = value !== "dedicated";
          $t1.toggle(show);
          if ($t1.hasClass("selected") && !show) {
            $type.find(".item:not([data-id='t1.micro'])").eq(0).click();
          }
        }
        this.model.setTenancy(value);
        return null;
      },
      cloudwatchSelect: function(event) {
        this.model.setMonitoring(event.target.checked);
        return $("#property-cloudwatch-warn").toggle($("#property-instance-enable-cloudwatch").is(":checked"));
      },
      userdataChange: function(event) {
        this.model.setUserData(event.target.value);
        return null;
      },
      eniDescriptionChange: function(event) {
        this.model.setEniDescription(event.target.value);
        return null;
      },
      sourceCheckChange: function(event) {
        this.model.setSourceCheck(event.target.checked);
        return null;
      },
      publicIpChange: function(event) {
        this.model.setPublicIp(event.target.checked);
        return null;
      },
      setKP: function(event, id) {
        this.model.setKP(id);
        return null;
      },
      addKP: function(event, id) {
        if (!id) {
          return;
        }
        id = this.model.addKP(id);
        event.id = id;
        if (!id) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_KEYPAIR_NAME_ALREADY_EXISTS);
          return id;
        }
      },
      updateKPSelect: function() {
        $("#keypair-select").find(".item:last-child").append('<span class="icon-remove"></span>');
        return null;
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $("#property-ami").attr("data-uid"));
        return null;
      },
      deleteKP: function(event) {
        var $li, data, me, removeKP, selected, using;
        me = this;
        $li = $(event.currentTarget).closest("li");
        selected = $li.hasClass("selected");
        using = using === "true" ? true : selected;
        removeKP = function() {
          $li.remove();
          if (selected) {
            $("#keypair-select").find(".item").eq(0).click();
          }
          return me.model.deleteKP($li.attr("data-id"));
        };
        if (using) {
          data = {
            title: "Delete Key Pair",
            confirm: "Delete",
            color: "red",
            body: "<p class='modal-text-major'>Are you sure to delete " + ($li.text()) + "?</p><p class='modal-text-minor'>Resources using this key pair will change automatically to use DefaultKP.</p>"
          };
          modal(MC.template.modalApp(data));
          $("#btn-confirm").one("click", function() {
            removeKP();
            return modal.close();
          });
        } else {
          removeKP();
        }
        return false;
      },
      validateIpItem: function($item) {
        var result, that;
        that = this;
        $item.parsley("custom", function(val) {
          var currentInputIP, inputValue, inputValuePrefix, ipIPFormatCorrect, prefixAry, result, validDOM;
          validDOM = $item;
          inputValue = validDOM.val();
          inputValuePrefix = validDOM.siblings(".input-ip-prefix").text();
          currentInputIP = inputValuePrefix + inputValue;
          prefixAry = inputValuePrefix.split('.');
          ipIPFormatCorrect = false;
          if (prefixAry.length === 4) {
            if (inputValue === 'x') {
              ipIPFormatCorrect = true;
            } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
              ipIPFormatCorrect = true;
            }
          } else {
            if (inputValue === 'x.x') {
              ipIPFormatCorrect = true;
            } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
              ipIPFormatCorrect = true;
            }
          }
          if (!ipIPFormatCorrect) {
            return 'Invalid IP address';
          } else {
            result = that.model.isValidIp(currentInputIP);
            if (result !== true) {
              return result;
            }
          }
        });
        result = $item.parsley("validate");
        $item.parsley("custom", noop);
        return result;
      },
      addIp: function() {
        if ($("#instance-ip-add").hasClass("disabled")) {
          return;
        }
        this.model.addIp();
        this.refreshIPList();
        return null;
      },
      removeIp: function(event) {
        var $li, index;
        $li = $(event.currentTarget).closest("li");
        index = $li.index();
        $li.remove();
        this.model.removeIp(index);
        this.updateIPAddBtnState(true);
        return null;
      },
      setEip: function(event) {
        var $target, attach, index, tooltip;
        $target = $(event.currentTarget);
        index = $target.closest("li").index();
        attach = !$target.hasClass("associated");
        if (attach) {
          tooltip = lang.ide.PROP_INSTANCE_IP_MSG_4;
        } else {
          tooltip = lang.ide.PROP_INSTANCE_IP_MSG_3;
        }
        $target.toggleClass("associated", attach).data("tooltip", tooltip);
        this.model.attachEip(index, attach);
        return null;
      },
      syncIPList: function(event) {
        var $target, autoAssign, ip, ipItems, ipVal;
        ipItems = $('#property-network-list .input-ip-item');
        $target = $(event.currentTarget);
        if (!this.validateIpItem($target)) {
          return;
        }
        ipVal = $target.val();
        ip = $target.siblings(".input-ip-prefix").text() + ipVal;
        autoAssign = ipVal === "x" || ipVal === "x.x";
        this.model.setIp($target.closest("li").index(), ip, autoAssign);
        return null;
      },
      refreshIPList: function() {
        if (!this.model.attributes.eni) {
          return;
        }
        $('#property-network-list').html(MC.template.propertyIpList(this.model.attributes.eni.ips));
        this.updateIPAddBtnState();
        return null;
      },
      updateIPAddBtnState: function(enabled) {
        var tooltip;
        if (enabled === void 0) {
          enabled = this.model.canAddIP();
        }
        if (enabled === true) {
          tooltip = "Add IP Address";
        } else {
          if (_.isString(enabled)) {
            tooltip = enabled;
          } else {
            tooltip = "Cannot add IP address";
          }
          enabled = false;
        }
        $("#instance-ip-add").toggleClass("disabled", !enabled).data("tooltip", tooltip);
        return null;
      },
      disableUserDataInput: function(flag) {
        var $userDataInput;
        $userDataInput = $('#property-instance-user-data');
        if (flag === true) {
          $userDataInput.attr('disabled', 'disabled');
          return $userDataInput.addClass('tooltip').attr('data-tooltip', lang.ide.PROP_INSTANCE_USER_DATA_DISABLE);
        } else if (flag === false) {
          $userDataInput.removeAttr('disabled');
          return $userDataInput.removeClass('tooltip').removeAttr('data-tooltip');
        }
      }
    });
    return new InstanceView();
  });

}).call(this);

(function() {
  define('module/design/property/instance/app_model',['../base/model', 'keypair_model', 'instance_model', 'constant', 'i18n!nls/lang.js', 'Design'], function(PropertyModel, keypair_model, instance_model, constant, lang, Design) {
    var AppInstanceModel;
    AppInstanceModel = PropertyModel.extend({
      defaults: {
        'id': null
      },
      initialize: function() {
        var me;
        me = this;
        this.on('EC2_KPDOWNLOAD_RETURN', function(result) {
          var cmd_line, curr_keypairname, instance, instance_data, instance_id, instance_state, key_data, keypairname, login_user, option, os_type, public_dns, region_name;
          region_name = result.param[3];
          keypairname = result.param[4];
          os_type = null;
          key_data = null;
          instance = null;
          public_dns = null;
          cmd_line = null;
          login_user = null;
          instance_id = me.get("instanceId");
          curr_keypairname = me.get("keyName");
          if (curr_keypairname !== keypairname) {
            return;
          }

          /*
           * The EC2_KPDOWNLOAD_RETURN event won't fire when the result.is_error
           * is true. According to bugs in service models.
           */
          if (result.is_error) {
            notification('error', lang.ide.PROP_MSG_ERR_DOWNLOAD_KP_FAILED + keypairname);
            key_data = null;
          } else {
            key_data = result.resolved_data;
          }
          instance_data = MC.data.resource_list[region_name][instance_id];
          if (instance_data && instance_data.imageId) {
            os_type = MC.data.dict_ami[instance_data.imageId].osType;
          }
          if ('win|windows'.indexOf(os_type) > 0 && key_data) {
            me.getPasswordData(instance_id, key_data);
          } else {
            instance = MC.data.resource_list[region_name][instance_id];
            if (instance) {
              instance_state = instance.instanceState.name;
            }
            if (instance_state === 'running') {
              switch (os_type) {
                case 'amazon':
                  login_user = 'ec2-user';
                  break;
                case 'ubuntu':
                  login_user = 'ubuntu';
                  break;
                default:
                  login_user = 'root';
              }
            }
            if (instance.ipAddress) {
              cmd_line = sprintf('ssh -i %s.pem %s@%s', instance.keyName, login_user, instance.ipAddress);
            }
            option = {
              type: 'linux',
              cmd_line: cmd_line
            };
            me.trigger("KP_DOWNLOADED", key_data, option);
          }
          return null;
        });
        return this.on('EC2_INS_GET_PWD_DATA_RETURN', function(result) {
          var curr_instance_id, instance, instance_id, instance_state, key_data, option, rdp, region_name, win_passwd;
          region_name = result.param[3];
          instance_id = result.param[4];
          key_data = result.param[5];
          instance = null;
          instance_state = null;
          win_passwd = null;
          rdp = null;
          curr_instance_id = me.get("instanceId");
          if (curr_instance_id !== instance_id) {
            return;
          }
          if (result.is_error) {
            notification('error', lang.ide.PROP_MSG_ERR_GET_PASSWD_FAILED + instance_id);
            key_data = null;
          } else {
            instance = MC.data.resource_list[region_name][instance_id];
            if (instance) {
              instance_state = instance.instanceState.name;
            }
            if (instance_state === 'running' && instance.ipAddress) {
              rdp = sprintf(constant.RDP_TMPL, instance.ipAddress);
            }
            if (result.resolved_data) {
              win_passwd = result.resolved_data.passwordData;
            }
          }
          option = {
            type: 'win',
            passwd: win_passwd,
            rdp: rdp,
            public_dns: instance.ipAddress
          };
          me.trigger("KP_DOWNLOADED", key_data, option);
          return null;
        });
      },
      init: function(instance_id) {
        var app_data, deviceName, effective, i, instance, myInstanceComponent, rdName, rootDevice, volume, _i, _len, _ref;
        this.set('id', instance_id);
        this.set('uid', instance_id);
        myInstanceComponent = Design.instance().component(instance_id);
        if (myInstanceComponent) {
          instance_id = myInstanceComponent.get('appId');
        } else {
          effective = Design.modelClassForType(constant.RESTYPE.INSTANCE).getEffectiveId(instance_id);
          myInstanceComponent = Design.instance().component(effective.uid);
          this.set('uid', effective.uid);
          this.set('mid', effective.mid);
        }
        if (!myInstanceComponent) {
          console.warn("instance.app_model.init(): can not find InstanceModel");
        }
        app_data = MC.data.resource_list[Design.instance().region()];
        if (app_data[instance_id]) {
          instance = $.extend(true, {}, app_data[instance_id]);
          instance.name = myInstanceComponent ? myInstanceComponent.get('name') : instance_id;
          rdName = myInstanceComponent.getAmiRootDeviceName();
          instance.state = MC.capitalize(instance.instanceState.name);
          instance.blockDevice = "";
          if (instance.blockDeviceMapping && instance.blockDeviceMapping.item) {
            deviceName = [];
            _ref = instance.blockDeviceMapping.item;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              deviceName.push(i.deviceName);
              if (rdName === i.deviceName) {
                rootDevice = i;
              }
            }
            instance.blockDevice = deviceName.join(", ");
            if (rootDevice) {
              volume = MC.data.resource_list[Design.instance().region()][rootDevice.ebs.volumeId];
              if (volume) {
                if (volume.attachmentSet) {
                  volume.name = volume.attachmentSet.item[0].device;
                }
                this.set("rootDevice", volume);
              }
            }
          }
          instance.eni = this.getEniData(instance);
          instance.app_view = MC.canvas.getState() === 'appview' ? true : false;
          this.set(instance);
        } else {
          return false;
        }
        return null;
      },
      getEniData: function(instance_data) {
        var EniModel, TYPE_ENI, allEni, appData, component, data, eni, i, id, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        if (!instance_data.networkInterfaceSet) {
          return null;
        }
        _ref = instance_data.networkInterfaceSet.item;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.attachment.deviceIndex === "0") {
            id = i.networkInterfaceId;
            data = i;
            break;
          }
        }
        TYPE_ENI = constant.RESTYPE.ENI;
        if (!id) {
          return null;
        }
        EniModel = Design.modelClassForType(TYPE_ENI);
        allEni = EniModel && EniModel.allObjects() || [];
        for (_j = 0, _len1 = allEni.length; _j < _len1; _j++) {
          eni = allEni[_j];
          if (eni.get('appId' === id)) {
            component = eni;
            break;
          }
        }
        appData = MC.data.resource_list[Design.instance().region()];
        if (!appData[id]) {
          data = $.extend(true, {}, data);
        } else {
          data = $.extend(true, {}, appData[id]);
        }
        data.name = component ? component.get('name') : id;
        if (data.status === "in-use") {
          data.isInUse = true;
        }
        data.sourceDestCheck = data.sourceDestCheck ? "enabled" : "disabled";
        _ref1 = data.privateIpAddressesSet.item;
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          i = _ref1[_k];
          i.primary = i.primary === true;
        }
        return data;
      },
      downloadKP: function(keypairname) {
        var session, username;
        username = $.cookie("usercode");
        session = $.cookie("session_id");
        keypair_model.download({
          sender: this
        }, username, session, Design.instance().region(), keypairname);
        return null;
      },
      getPasswordData: function(instance_id, key_data) {
        var me, session, username;
        username = $.cookie("usercode");
        session = $.cookie("session_id");
        me = this;
        instance_model.GetPasswordData({
          sender: me
        }, username, session, Design.instance().region(), instance_id, key_data);
        return null;
      },
      getAMI: function(ami_id) {
        return MC.data.dict_ami[ami_id];
      },
      getEni: function() {
        var eni, eni_obj, instance;
        instance = Design.instance().component(this.get('uid'));
        eni = instance.getEmbedEni();
        if (!eni) {
          return;
        }
        eni_obj = eni.toJSON();
        eni_obj.ips = eni.getIpArray();
        eni_obj.ips[0].unDeletable = true;
        this.set("eni", eni_obj);
        this.set("multi_enis", instance.connections("EniAttachment").length > 0);
        return null;
      }
    });
    return new AppInstanceModel();
  });

}).call(this);

define('module/design/property/instance/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd><a href=\"#\" class=\"icon-download\" id=\"property-app-keypair\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></dd>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">Root Device</div>\n  <div class=\"option-group\">\n    <article class=\"property-app\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.volumeId), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.name), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.createTime), {hash:{},data:data}))
    + "</dd>\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.volumeType), {hash:{},data:data}))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.snapshotId), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.size), {hash:{},data:data}))
    + " GB</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_ATTACHMENT_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.instanceId), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_ATTACHMENT_TIME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.attachTime), {hash:{},data:data}))
    + "</dd>\n      </dl>\n    </article>\n  </div>\n  ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>IOPS</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.networkInterfaceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.description), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_SOURCE_DEST_CHECK_DISP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n\n    <div class=\"hidden-details\">\n      <a href=\"#\" class=\"toggle-details js-toggle-dropdown\" data-toggle=\"self-only\"><span class=\"details-off\">+ "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SHOW_DETAIL", {hash:{},data:data}))
    + "</span><span class=\"details-on\">- "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_HIDE_DETAIL", {hash:{},data:data}))
    + "</span></a>\n\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_VPC_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SUBNET_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.attachment), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_MAC_ADDRESS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.macAddress), {hash:{},data:data}))
    + "</dd>\n\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.privateDnsName), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.ownerId), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </div>\n    <table class=\"table table-small\">\n      <tr>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "</th>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n      </tr>\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.privateIpAddressesSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n\n  </div>\n  ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_LBL_DESC", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_ATTACHMENT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentId), {hash:{},data:data}))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_Attachment_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.instanceOwnerId), {hash:{},data:data}))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_Attachment_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n        ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PUBLIC_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PRIVATE_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.privateDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_IP_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eni)),stack1 == null || stack1 === false ? stack1 : stack1.ownerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.primary), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        <td>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp), {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      </tr>\n      ";
  return buffer;
  }
function program22(depth0,data) {
  
  
  return "<span>(Primary)</span>";
  }

function program24(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program26(depth0,data) {
  
  
  return "-";
  }

  buffer += "<article class=\"property-app\">\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_DETAIL", {hash:{},data:data}))
    + "\n  <a href=\"#\" class=\"icon-syslog tooltip property-btn-get-system-log action-link\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_GET_SYSTEM_LOG", {hash:{},data:data}))
    + "\" ></a>\n</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_LAUNCH_TIME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.launchTime), {hash:{},data:data}))
    + "</dd>\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PRIMARY_PUBLIC_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.ipAddress), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PUBLIC_DNS", {hash:{},data:data}))
    + "</dt>\n      <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.dnsName), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PRIMARY_PRIVATE_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.privateIpAddress), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PRIVATE_DNS", {hash:{},data:data}))
    + "</dt>\n      <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.privateDnsName), {hash:{},data:data}))
    + "</dd>\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI", {hash:{},data:data}))
    + "</dt>\n      <dd><a href=\"#\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-app-ami\">"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a><dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</dt>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app_view), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.ebsOptimized), {hash:{},data:data}))
    + "<dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TENANCY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.placement)),stack1 == null || stack1 === false ? stack1 : stack1.tenancy), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.rootDeviceType), {hash:{},data:data}))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_BLOCK_DEVICE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.blockDevice), {hash:{},data:data}))
    + "</dd>\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eni), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/instance/app_view',['../base/view', './template/app', 'i18n!nls/lang.js', 'instance_model'], function(PropertyView, template, lang, instance_model) {
    var InstanceAppView;
    InstanceAppView = PropertyView.extend({
      events: {
        "click #property-app-keypair": "downloadKeypair",
        "click #property-app-ami": "openAmiPanel",
        "click .property-btn-get-system-log": "openSysLogModal"
      },
      kpModalClosed: false,
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      },
      downloadKeypair: function(event) {
        var keypair, me;
        keypair = $(event.currentTarget).html();
        this.model.downloadKP(keypair);
        modal(MC.template.modalDownloadKP({
          name: keypair
        }));
        me = this;
        $('#modal-wrap').on("closed", function() {
          me.kpModalClosed = true;
          return null;
        });
        $(".modal-body").on("click", ".click-select", function(event) {
          if (event.currentTarget.select) {
            event.currentTarget.select();
          }
          return event.stopPropagation();
        });
        $("#keypair-show").on("click", function() {
          $("#keypair-pwd").attr("type", "string");
          return null;
        });
        this.kpModalClosed = false;
        return false;
      },
      updateKPModal: function(data, option) {
        if (!data) {
          modal.close();
          return;
        }
        if (this.kpModalClosed) {
          return;
        }
        if (option.passwd) {
          $("#keypair-pwd").val(option.passwd);
        } else {
          $("#keypair-login").hide();
          $("#keypair-no-pwd").text(lang.ide.POP_DOWNLOAD_KP_NOT_AVAILABLE);
        }
        if (option.cmd_line) {
          $("#keypair-cmd").val(option.cmd_line);
        } else {
          $("#keypair-remote").hide();
        }
        if (option.public_dns) {
          $("#keypair-dns").val(option.public_dns);
        } else {
          $("#keypair-public").hide();
        }
        if (option.rdp) {
          $("#keypair-rdp").attr("href", "data://text/plain;charset=utf8," + encodeURIComponent(option.rdp)).attr("download", $("#keypair-name").text() + ".rdp");
        } else {
          $("#keypair-rdp").hide();
        }
        $("#keypair-kp-" + option.type).attr("href", "data://text/plain;charset=utf8," + encodeURIComponent(data)).attr("download", $("#keypair-name").text() + ".pem");
        $("#keypair-private-key").val(data);
        $("#keypair-loading").hide();
        $("#keypair-body-" + option.type).show();
        modal.position();
        return null;
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $(event.target).data("uid"));
        return false;
      },
      openSysLogModal: function() {
        var currentRegion, instanceId, that;
        instanceId = this.model.get('instanceId');
        that = this;
        currentRegion = MC.canvas_data.region;
        instance_model.GetConsoleOutput({
          sender: that
        }, $.cookie('usercode'), $.cookie('session_id'), currentRegion, instanceId);
        modal(MC.template.modalInstanceSysLog({
          instance_id: instanceId,
          log_content: ''
        }, true));
        that.off('EC2_INS_GET_CONSOLE_OUTPUT_RETURN').on('EC2_INS_GET_CONSOLE_OUTPUT_RETURN', function(result) {
          if (!result.is_error) {
            console.log(result.resolved_data);
          }
          return that.refreshSysLog(result.resolved_data);
        });
        return false;
      },
      refreshSysLog: function(result) {
        var $contentElem, logContent;
        $('#modal-instance-sys-log .instance-sys-log-loading').hide();
        if (result && result.output) {
          logContent = MC.base64Decode(result.output);
          $contentElem = $('#modal-instance-sys-log .instance-sys-log-content');
          $contentElem.html(MC.template.convertBreaklines({
            content: logContent
          }));
          $contentElem.show();
        } else {
          $('#modal-instance-sys-log .instance-sys-log-info').show();
        }
        return modal.position();
      }
    });
    return new InstanceAppView();
  });

}).call(this);

(function() {
  define('module/design/property/instance/main',["../base/main", "./model", "./view", "./app_model", "./app_view", "../sglist/main", "constant", "event"], function(PropertyModule, model, view, app_model, app_view, sglist_main, constant, ide_event) {
    var InstanceModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.PROPERTY_REFRESH_ENI_IP_LIST] = function() {
      if (this.model.getEni) {
        this.model.getEni();
      }
      if (this.view.refreshIPList) {
        this.view.refreshIPList();
      }
      return null;
    };
    InstanceModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: [constant.RESTYPE.INSTANCE, 'component_asg_instance'],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      setupStack: function() {
        this.view.on("OPEN_AMI", function(id) {
          return PropertyModule.loadSubPanel("STATIC", id);
        });
        return null;
      },
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      setupApp: function() {
        var me;
        me = this;
        this.model.on("KP_DOWNLOADED", function(data, option) {
          return me.view.updateKPModal(data, option);
        });
        this.view.on("OPEN_AMI", function(id) {
          return PropertyModule.loadSubPanel("STATIC", id);
        });
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/servergroup/app_model',['../base/model', '../instance/model', 'constant', 'i18n!nls/lang.js', 'Design'], function(PropertyModel, instance_model, constant, lang, Design) {
    var ServerGroupModel;
    ServerGroupModel = PropertyModel.extend({
      init: function(uid) {
        var ami, ami_id, myInstanceComponent, rd, routeCount, tenancy;
        this.set('uid', uid);
        this.set('readOnly', !this.isAppEdit);
        myInstanceComponent = Design.instance().component(uid);
        ami_id = myInstanceComponent.get("imageId");
        ami = myInstanceComponent.getAmi() || myInstanceComponent.get("cachedAmi");
        if (ami) {
          this.set('ami', {
            id: ami_id,
            name: ami.name,
            icon: "" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png"
          });
          this.set('type_editable', ami.rootDeviceType !== "instance-store");
        } else {
          notification('warning', sprintf(lang.ide.PROP_MSG_ERR_AMI_NOT_FOUND, ami_id));
        }
        rd = myInstanceComponent.getBlockDeviceMapping();
        if (rd.length === 1) {
          this.set("rootDevice", rd[0]);
        }
        tenancy = myInstanceComponent.get('tenancy' !== 'dedicated');
        this.set('instance_type', myInstanceComponent.getInstanceTypeList());
        this.set('ebs_optimized', myInstanceComponent.get("ebsOptimized"));
        this.set('can_set_ebs', myInstanceComponent.isEbsOptimizedEnabled());
        routeCount = myInstanceComponent.connectionTargets('RTB_Route').length;
        if (routeCount) {
          this.set('number_disable', true);
        }
        this.set('number', myInstanceComponent.get('count'));
        this.set('name', myInstanceComponent.get('name'));
        this.getGroupList();
        this.getEni();
        return null;
      },
      setCount: function(count) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).setCount(count);
        this.getGroupList();
        return null;
      },
      getGroupList: function() {
        var appData, comp, count, eni, existingLength, group, idx, index, member, members, name, resource_list, uid, _i, _j, _len, _len1, _ref;
        uid = this.get('uid');
        comp = Design.instance().component(uid);
        resource_list = MC.data.resource_list[Design.instance().region()];
        appData = resource_list[comp.get("appId")];
        name = comp.get("name");
        group = [
          {
            appId: comp.get("appId"),
            name: name + "-0",
            status: appData ? appData.instanceState.name : "Unknown",
            launchTime: appData ? appData.launchTime : ""
          }
        ];
        count = comp.get("count");
        if (comp.groupMembers().length > count - 1) {
          members = comp.groupMembers().slice(0, count - 1);
        } else {
          members = comp.groupMembers();
        }
        for (index = _i = 0, _len = members.length; _i < _len; index = ++_i) {
          member = members[index];
          group.push({
            name: name + "-" + (index + 1),
            appId: member.appId,
            status: resource_list[member.appId] ? resource_list[member.appId].instanceState.name : "Unknown",
            isNew: !member.appId,
            isOld: member.appId && (index + 1 >= count)
          });
        }
        while (group.length < count) {
          group.push({
            name: name + "-" + group.length,
            isNew: true,
            status: "Unknown"
          });
        }
        existingLength = 0;
        _ref = comp.groupMembers();
        for (idx = _j = 0, _len1 = _ref.length; _j < _len1; idx = ++_j) {
          eni = _ref[idx];
          if (eni.appId) {
            existingLength = idx + 1;
          } else {
            break;
          }
        }
        existingLength += 1;
        if (group.length > 1) {
          this.set('group', group);
          if (existingLength > count) {
            group.increment = "-" + (existingLength - count);
          } else if (existingLength < count) {
            group.increment = "+" + (count - existingLength);
          }
        } else {
          this.set('group', group[0]);
        }
        return null;
      },
      getEni: instance_model.getEni,
      setEbsOptimized: instance_model.setEbsOptimized,
      canSetInstanceType: instance_model.canSetInstanceType,
      setInstanceType: instance_model.setInstanceType,
      setIp: instance_model.setIp,
      canAddIP: instance_model.canAddIP,
      isValidIp: instance_model.isValidIp,
      addIp: instance_model.addIp,
      removeIp: instance_model.removeIp,
      attachEip: instance_model.attachEip
    });
    return new ServerGroupModel();
  });

}).call(this);

define('module/design/property/servergroup/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "class=\"expand\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-instance-count\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_NUMBER", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n      <input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-instance-count\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.number_disable), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ami), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type_editable), {hash:{},inverse:self.program(21, program21, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eni), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "disabled=\"disabled\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_YOU_CANNOT_SPECIFY_INSTANCE_NUMBER", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TIP_IF_THE_QUANTITY_IS_MORE_THAN_1", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI", {hash:{},data:data}))
    + "</label>\n      <div id=\"property-ami\" class=\"property-block-wrap clearfix\" data-uid='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n        <img class=\"property-ami-icon left\" src=\"./assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" / >\n        <div class=\"property-ami-label\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </div>\n    </section>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program11(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n      <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n      <div class=\"selectbox selectbox-mega\" id=\"instance-type-select\">\n        <div class=\"selection\"></div>\n        <ul class=\"dropdown\">\n          ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_type), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n      </div>\n    </section>\n    <section class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_set_ebs), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"checkbox\">\n        <input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ebs_optimized), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"ebs-optimized\" />\n        <label for=\"property-instance-ebs-optimized\"></label>\n      </div>\n      <label for=\"property-instance-ebs-optimized\">EBS Optimized</label>\n    </section>\n    ";
  return buffer;
  }
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hide), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            <div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n          </li>\n          ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "selected ";
  }

function program15(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program17(depth0,data) {
  
  
  return "hide";
  }

function program19(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program21(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n      <p class=\"property-info\">Updating instance type is disabled for instances using instance store for root device.</p>\n    </section>\n    ";
  return buffer;
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">Root Device</div>\n  <div class=\"option-group\">\n    <article class=\"property-app\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.DeviceName), {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeType), {hash:{},data:data}))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId), {hash:{},inverse:self.noop,fn:self.program(24, program24, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeSize), {hash:{},data:data}))
    + " GB</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops), {hash:{},inverse:self.noop,fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </article>\n  </div>\n  ";
  return buffer;
  }
function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>IOPS</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <div class=\"network-list-wrap\">\n        <div class=\"network-list-header clearfix\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "\n          <button id=\"instance-ip-add\" class=\"right btn btn-blue btn-small tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_TIP_ADD_IP_ADDRESS", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_ADD_IP", {hash:{},data:data}))
    + "</button>\n        </div>\n        <ul class=\"network-list\" id=\"property-network-list\" data-bind=\"true\"></ul>\n      </div>\n    </section>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n  <div id=\"prop-appedit-ami-list\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n  </div>\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/servergroup/template/ami_list',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Instance Summary</div>\n<div class=\"option-group\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_LAUNCH_TIME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.launchTime), {hash:{},data:data}))
    + "</dd>\n  </dl>\n<div>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "expand";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Server Group Members<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span> <span class=\"appedit-head-meta appedit-head-meta-add\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.increment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n<ul class=\"option-group property-list\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n  ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"subtitle\">("
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "<div class=\"subtitle subtitle-launch\">Launch after applying updates</div>\n      ";
  }

function program11(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOld), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program12(depth0,data) {
  
  
  return "<div class=\"subtitle subtitle-terminate\">Terminate after applying updates</div>";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/servergroup/app_view',['../base/view', '../instance/view', './template/app', './template/ami_list', 'i18n!nls/lang.js'], function(PropertyView, instance_view, template, ami_list_template, lang) {
    var InstanceView;
    InstanceView = PropertyView.extend({
      events: {
        'change #property-instance-count': "countChange",
        'click #property-ami': "openAmiPanel",
        'OPTION_CHANGE #instance-type-select': "instanceTypeSelect",
        'change #property-instance-ebs-optimized': 'ebsOptimizedSelect',
        'click .toggle-eip': 'setEip',
        'click #instance-ip-add': "addIp",
        'click #property-network-list .icon-remove': "removeIp",
        'change .input-ip': 'syncIPList'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.updateInstanceList();
        this.refreshIPList();
        return this.model.attributes.name;
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $(event.currentTarget).data("uid"));
        return false;
      },
      updateInstanceList: function() {
        $("#prop-appedit-ami-list").html(ami_list_template(this.model.attributes));
        return null;
      },
      countChange: function(event) {
        var target, val;
        target = $(event.currentTarget);
        target.parsley('custom', function(val) {
          if (isNaN(val) || val > 99 || val < 1) {
            return lang.ide.PARSLEY_THIS_VALUE_MUST_BETWEEN_1_99;
          }
        });
        if (!target.parsley('validate')) {
          return;
        }
        val = +target.val();
        this.model.setCount(val);
        this.updateInstanceList();
        this.setEditableIP(val === 1);
        return null;
      },
      ebsOptimizedSelect: function(event) {
        this.model.setEbsOptimized(event.target.checked);
        return null;
      },
      instanceTypeSelect: instance_view.instanceTypeSelect,
      addIp: instance_view.addIp,
      removeIp: instance_view.removeIp,
      setEip: instance_view.setEip,
      syncIPList: instance_view.syncIPList,
      refreshIPList: instance_view.refreshIPList,
      updateIPAddBtnState: instance_view.updateIPAddBtnState,
      setEditableIP: instance_view.setEditableIP,
      validateIpItem: instance_view.validateIpItem
    });
    return new InstanceView();
  });

}).call(this);

(function() {
  define('module/design/property/servergroup/main',["../base/main", "./app_model", "./app_view", "../sglist/main", "constant", "event"], function(PropertyModule, app_model, app_view, sglist_main, constant, ide_event) {
    var ServerGroupModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.PROPERTY_REFRESH_ENI_IP_LIST] = function() {
      this.model.getEni();
      this.view.refreshIPList();
      return null;
    };
    ServerGroupModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: 'component_server_group',
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.model.isAppEdit = false;
        this.view = app_view;
        return null;
      },
      setupAppEdit: function() {
        this.view.on("OPEN_AMI", function(id) {
          return PropertyModule.loadSubPanel("STATIC", id);
        });
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.model.isAppEdit = true;
        this.view = app_view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/connection/model',['../base/model', "Design", 'constant'], function(PropertyModel, Design, constant) {
    var ConnectionModel;
    ConnectionModel = PropertyModel.extend({
      init: function(uid) {
        var attr, cn;
        cn = Design.instance().component(uid);
        if (!cn) {
          return false;
        }
        if (cn.type === "EniAttachment") {
          attr = {
            name: "Instance-ENI Attachment",
            eniAsso: {
              instance: cn.getTarget(constant.RESTYPE.INSTANCE).get("name"),
              eni: cn.getTarget(constant.RESTYPE.ENI).get("name")
            }
          };
        } else if (cn.type === "ElbSubnetAsso") {
          attr = {
            name: "Load Balancer-Subnet Association",
            subnetAsso: {
              elb: cn.getTarget(constant.RESTYPE.ELB).get("name"),
              subnet: cn.getTarget(constant.RESTYPE.SUBNET).get("name")
            }
          };
        }
        return this.set(attr);
      }
    });
    return new ConnectionModel();
  });

}).call(this);

define('module/design/property/connection/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"property-control-group\">This is an attachment of "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eniAsso)),stack1 == null || stack1 === false ? stack1 : stack1.instance)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " to "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.eniAsso)),stack1 == null || stack1 === false ? stack1 : stack1.eni)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.subnetAsso), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group\">A Virtual Network Interface is placed in "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subnetAsso)),stack1 == null || stack1 === false ? stack1 : stack1.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " for "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.subnetAsso)),stack1 == null || stack1 === false ? stack1 : stack1.elb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " to allow traffic be routed to this availability zone.</div>\n  ";
  return buffer;
  }

  buffer += "<article>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eniAsso), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/connection/view',['../base/view', './template/stack'], function(PropertyView, template) {
    var ConnectionView;
    ConnectionView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new ConnectionView();
  });

}).call(this);

(function() {
  define('module/design/property/connection/main',['../base/main', './model', './view'], function(PropertyModule, model, view) {
    var ConnectionModule;
    ConnectionModule = PropertyModule.extend({
      handleTypes: ["EniAttachment", "ElbSubnetAsso"],
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/staticsub/model',['../base/model', 'constant', "../base/main"], function(PropertyModel, constant, PropertyModule) {
    var StaticSubModel;
    StaticSubModel = PropertyModel.extend({
      init: function(uid) {
        var ami, item, snapshot_list, _i, _len, _ref;
        this.set("isApp", this.isApp);
        ami = MC.data.dict_ami[uid];
        if (ami) {
          this.set(ami);
          this.set("instance_type", MC.aws.ami.getInstanceType(ami).join(", "));
          this.set("ami", true);
          this.set("name", ami.name);
          return;
        } else if (uid.indexOf("ami-") === 0) {
          this.set("ami", {
            unavailable: true
          });
          this.set("name", uid);
          return;
        }
        this.set("name", uid);
        snapshot_list = MC.data.config[Design.instance().region()].snapshot_list;
        if (snapshot_list && snapshot_list.item) {
          _ref = snapshot_list.item;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            if (item.snapshotId === uid) {
              this.set(item);
              return;
            }
          }
        }
        return false;
      },
      canChangeAmi: function(amiId) {
        var component, newAmi, oldAmi;
        component = Design.instance().component(PropertyModule.activeModule().uid);
        oldAmi = component.getAmi() || component.get("cachedAmi");
        newAmi = MC.data.dict_ami[amiId];
        if (!oldAmi && !newAmi) {
          return "Ami info is missing, please reopen stack and try again.";
        }
        if (oldAmi.osType === "windows" && newAmi.osType !== "windows") {
          return "Changing AMI platform is not supported. To use a " + newAmi.osFamily + " AMI, please create a new instance instead.";
        }
        if (oldAmi.osType !== "windows" && newAmi.osType === "windows") {
          return "Changing AMI platform is not supported. To use a " + newAmi.osFamily + " AMI, please create a new instance instead.";
        }
        if ((newAmi.instance_type || newAmi.instanceType || "").indexOf(component.get("instanceType")) === -1) {
          return "" + newAmi.name + " does not support previously used instance type " + (component.get("instanceType")) + ". Please change another AMI.";
        }
        return true;
      },
      getAmiPngName: function(amiId) {
        var ami;
        ami = MC.data.dict_ami[amiId];
        if (!ami) {
          return "ami-not-available";
        } else {
          return "" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType;
        }
      },
      getAmiName: function(amiId) {
        var ami;
        ami = MC.data.dict_ami[amiId];
        if (!ami) {
          return "";
        } else {
          return ami.name;
        }
      },
      changeAmi: function(amiId) {
        Design.instance().component(PropertyModule.activeModule().uid).setAmi(amiId);
        this.init(amiId);
        return null;
      },
      getInstanceName: function() {
        return Design.instance().component(PropertyModule.activeModule().uid).get("name");
      }
    });
    return new StaticSubModel();
  });

}).call(this);

define('module/design/property/staticsub/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.program(5, program5, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"property-control-group property-ami-info\">\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_AMI_APP_NOT_AVAILABLE", {hash:{},data:data}))
    + "</p>\n    </div>\n    ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"property-control-group property-ami-info\">\n        <div class=\"property-control-group tac\">\n            <button id=\"changeAmi\" class=\"btn btn-blue\"><i class=\"icon-edit icon-label\"></i>Change AMI</button>\n        </div>\n    </div>\n    <div class=\"property-control-group hide\" id=\"changeAmiPanel\">\n        <p>Drag image from Resource Panel and drop below to change AMI.</p>\n        <div id=\"changeAmiDropZone\">\n            <p>Drop AMI Here</p>\n            <div class=\"resource-icon resource-icon-instance\">\n                <img src=\"assets/images/ide/ami/amazon.i386.ebs.png\" width=\"39\" height=\"27\">\n                <div class=\"resource-label\"></div>\n            </div>\n        </div>\n        <div class=\"hide\" id=\"confirmChangeAmiWrap\">\n            <p id=\"changeAmiWarning\"></p>\n            <button id=\"confirmChangeAmi\" class=\"btn btn-blue\">Confirm Change AMI</button>\n        </div>\n        <button id=\"cancelChangeAmi\" class=\"btn-link\">Cancel</button>\n    </div>\n";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <div class=\"property-control-group property-ami-info\">\n        "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_AMI_STACK_NOT_AVAILABLE", {hash:{},data:data}))
    + "\n    </div>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical property-ami-info\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_DESC", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.rootDeviceType), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_ARCHITECH", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_VIRTUALIZATION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.virtualizationType), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_KERNEL_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.kernelId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_OS_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.osType), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI_SUPPORT_INSTANCE_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.instance_type), {hash:{},data:data}))
    + "</dd>\n    </dl>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical\">\n    <dt>Snapshot ID</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>Volume ID</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>Description</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.description), {hash:{},data:data}))
    + "</dd>\n    <dt>Capacity</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.volumeSize), {hash:{},data:data}))
    + "GB</dd>\n    <dt>Owner</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.ownerId), {hash:{},data:data}))
    + "</dd>\n    <dt>Started</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.startTime), {hash:{},data:data}))
    + "</dd>\n    </dl>\n";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ami), {hash:{},inverse:self.program(10, program10, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/staticsub/view',['../base/view', './template/stack'], function(PropertyView, template) {
    var StaticSubView;
    StaticSubView = PropertyView.extend({
      events: {
        "click #changeAmi": "showChangeAmiPanel",
        "click #confirmChangeAmi": "changeAmi",
        "click #cancelChangeAmi": "hideChangeAmiPanel",
        "drop  #changeAmiDropZone": "onDropAmi"
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      },
      showChangeAmiPanel: function() {
        $("#changeAmiPanel").show().siblings(".property-ami-info").hide();
        $("#changeAmiDropZone").children().hide().filter("p").show();
        $("#confirmChangeAmiWrap").hide();
        return null;
      },
      hideChangeAmiPanel: function() {
        $("#changeAmiPanel").hide().siblings(".property-ami-info").show();
        return null;
      },
      onDropAmi: function(event, amiId) {
        var canChangeAmi;
        $("#changeAmiPanel").data("amiId", amiId);
        $("#confirmChangeAmiWrap").show();
        canChangeAmi = this.model.canChangeAmi(amiId);
        if (canChangeAmi === true) {
          $("#changeAmiWarning").hide();
          $("#confirmChangeAmi").show();
        } else {
          $("#changeAmiWarning").html(canChangeAmi).show();
          $("#confirmChangeAmi").hide();
        }
        $("#changeAmiDropZone").children().show().filter("p").hide();
        $("#changeAmiDropZone").find("img").attr("src", "./assets/images/ide/ami/" + this.model.getAmiPngName(amiId) + ".png");
        $("#changeAmiDropZone").find(".resource-label").html(this.model.getAmiName(amiId));
        return null;
      },
      changeAmi: function() {
        var amiId;
        amiId = $("#changeAmiPanel").data("amiId");
        this.model.changeAmi(amiId);
        this.trigger("AMI_CHANGE");
        return null;
      }
    });
    return new StaticSubView();
  });

}).call(this);

(function() {
  define('module/design/property/staticsub/main',['../base/main', './model', './view', "event", "Design"], function(PropertyModule, model, view, ide_event, Design) {
    var StaticSubModule;
    view.on("AMI_CHANGE", function() {
      var component;
      component = Design.instance().component(PropertyModule.activeModule().uid);
      ide_event.trigger(ide_event.OPEN_PROPERTY, component.type, component.id);
      return null;
    });
    StaticSubModule = PropertyModule.extend({
      subPanelID: "STATIC",
      initStack: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = false;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = true;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = true;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/missing/main',['../base/main', '../base/model', '../base/view', 'constant'], function(PropertyModule, PropertyModel, PropertyView, constant) {
    var MissingModule, MissingView, m, model, view;
    MissingView = PropertyView.extend({
      render: function() {
        var comp, _ref;
        comp = Design.instance().component(this.model.get('uid'));
        if (((_ref = Design.instance().get('state')) === 'Stopped' || _ref === "Stopping") && comp.type === constant.RESTYPE.ASG) {
          this.$el.html(MC.template.missingAsgWhenStop({
            asgName: comp.get('name')
          }));
          return "" + (comp.get('name')) + " Deleted";
        } else {
          this.$el.html(MC.template.missingPropertyPanel());
          return "Resource Unavailable";
        }
      }
    });
    view = new MissingView();
    m = PropertyModel.extend({
      init: function(uid) {
        return this.set('uid', uid);
      }
    });
    model = new m();
    MissingModule = PropertyModule.extend({
      handleTypes: "Missing_Resource",
      initApp: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/sg/model',['../base/model', "Design", 'constant', 'event'], function(PropertyModel, Design, constant, ide_event) {
    var SgModel;
    SgModel = PropertyModel.extend({
      init: function(uid) {
        var component, inputReadOnly, members, rule, rules, _i, _len, _ref;
        this.component = component = Design.instance().component(uid);
        if (this.isReadOnly) {
          this.appInit(uid);
          return;
        }
        rules = [];
        _ref = component.connections("SgRuleSet");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          rules = rules.concat(rule.toPlainObjects(uid, true));
        }
        members = _.map(component.getMemberList(), function(tgt) {
          return tgt.get("name");
        });
        this.set({
          uid: uid,
          name: component.get("name"),
          description: component.get("description"),
          members: members,
          rules: rules,
          color: component.color,
          ruleEditable: true
        });
        this.sortSGRule();
        if (component.isElbSg()) {
          inputReadOnly = true;
        } else if (this.isAppEdit) {
          inputReadOnly = component.get("appId");
        }
        if (inputReadOnly || component.isDefault()) {
          this.set('nameReadOnly', true);
        }
        if (inputReadOnly) {
          this.set('descReadOnly', true);
        }
        return null;
      },
      setDescription: function(value) {
        Design.instance().component(this.get("uid")).set("description", value);
        return null;
      },
      sortSGRule: function(key) {
        this.attributes.rules = _.sortBy(this.attributes.rules, key || "direction");
        return null;
      },
      addRule: function(rule) {
        var SgRuleSetModel, beforeCount, mySg, rules, sgRuleSet, target, uid, _i, _len, _ref;
        uid = this.get("uid");
        mySg = Design.instance().component(uid);
        if (rule.relation[0] === "@") {
          target = Design.instance().component(rule.relation.substr(1));
        } else {
          target = mySg.createIpTarget(rule.relation);
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        sgRuleSet = new SgRuleSetModel(mySg, target);
        beforeCount = sgRuleSet.ruleCount(mySg.id);
        sgRuleSet.addRawRule(mySg.id, rule.direction, rule);
        if (beforeCount < sgRuleSet.ruleCount(mySg.id)) {
          rules = [];
          _ref = mySg.connections("SgRuleSet");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            rule = _ref[_i];
            rules = rules.concat(rule.toPlainObjects(uid, true));
          }
          this.attributes.rules = rules;
          this.sortSGRule();
          return true;
        } else {
          return false;
        }
      },
      createSGRuleData: function() {
        var sgList;
        sgList = _.map(Design.modelClassForType(constant.RESTYPE.SG).allObjects(), function(sg) {
          return {
            id: sg.id,
            color: sg.color,
            name: sg.get("name")
          };
        });
        return {
          isClassic: false,
          sgList: sgList
        };
      },
      removeRule: function(rule) {
        var sgRuleSet;
        sgRuleSet = Design.instance().component(rule.ruleSetId);
        sgRuleSet.removeRuleByPlainObj(rule);
        return null;
      },
      appInit: function(sg_uid) {
        var currentAppSG, currentRegion, currentSGID, members, rule, rules, sg_app_detail, _i, _len, _ref;
        currentRegion = Design.instance().region();
        currentSGID = this.component.get('appId');
        currentAppSG = MC.data.resource_list[currentRegion][currentSGID];
        rules = [];
        _ref = this.component.connections("SgRuleSet");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rule = _ref[_i];
          rules = rules.concat(rule.toPlainObjects(sg_uid));
        }
        members = _.map(this.component.connectionTargets("SgAsso"), function(sgTarget) {
          return sgTarget.get('name');
        });
        sg_app_detail = {
          uid: sg_uid,
          name: this.component.get('name'),
          color: this.component.color,
          groupName: currentAppSG.groupName,
          description: currentAppSG.groupDescription,
          groupId: currentAppSG.groupId,
          ownerId: currentAppSG.ownerId,
          vpcId: currentAppSG.vpcId,
          members: members,
          rules: rules
        };
        this.set(sg_app_detail);
        this.sortSGRule();
        return null;
      }
    });
    return new SgModel();
  });

}).call(this);

define('module/design/property/sg/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n		<a href=\"#\" class=\"icon-add tooltip add-rule action-link\" id=\"sg-add-rule-icon\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIP_CREATE_RULE", {hash:{},data:data}))
    + "' ></a>\n		";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "";
  buffer += "<li class=\"sg-member-name\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>";
  return buffer;
  }

  buffer += "<article>\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<div class=\"property-control-group\">\n			<label for=\"securitygroup-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n			<input class=\"input\"  type=\"text\" id=\"securitygroup-name\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.nameReadOnly), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n		</div>\n		<div class=\"property-control-group\">\n			<label for=\"securitygroup-description\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_DETAIL_LBL_DESCRIPTION", {hash:{},data:data}))
    + "</label>\n			<input class=\"input\" type=\"text\" id=\"securitygroup-description\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.descReadOnly), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"ascii\" data-ignore=\"true\"/>\n		</div>\n	</div>\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIT_RULE", {hash:{},data:data}))
    + "\n		<span class=\"property-head-num-wrap\">(<span id=\"rule-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rules)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ruleEditable), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"option-group\">\n		<div class=\"rule-list-sort property-control-group\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"selectbox\" id=\"sg-rule-filter-select\">\n				<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"item selected\" data-id=\"direction\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"relation\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n					<li class=\"item\" data-id=\"protocol\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_PROTOCOL", {hash:{},data:data}))
    + "</li>\n				</ul>\n			</div>\n		</div>\n\n		<ul class=\"sg-rule-list property-list\" id=\"sg-rule-list\"></ul>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIT_MEMBER", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.members)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>	</div>\n	<div class=\"option-group\">\n		<ul class=\"sg-member-list property-list\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/sg/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += " <li class=\"sg-member-name\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li> ";
  return buffer;
  }

  buffer += "<article>\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_APP_SG_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.groupName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_APP_SG_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.groupId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_DETAIL_LBL_DESCRIPTION", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIT_RULE", {hash:{},data:data}))
    + "\n    <span class=\"property-head-num-wrap\">(<span id=\"rule-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rules)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n  </div>\n  <div class=\"option-group\">\n\n    <div class=\"rule-list-sort property-control-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n      <div class=\"selectbox\" id=\"sg-rule-filter-select\">\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n          <li class=\"item selected\" data-id=\"direction\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"relation\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"protocol\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_RULE_SORT_BY_PROTOCOL", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </div>\n    </div>\n\n    <ul class=\"sg-rule-list property-list\" id=\"sg-rule-list\"></ul>\n  </div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SG_TIT_MEMBER", {hash:{},data:data}))
    + "\n    <span class=\"property-head-num-wrap\">(<span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.members)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n  </div>\n  <div class=\"option-group\">\n    <ul class=\"sg-member-list property-list\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.members), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/sg/view',['../base/view', './template/stack', './template/app', 'constant', 'i18n!nls/lang.js'], function(PropertyView, template, app_template, constant, lang) {
    var SgView;
    SgView = PropertyView.extend({
      events: {
        'click #sg-add-rule-icon': 'showCreateRuleModal',
        'click .sg-rule-delete': 'removeRulefromList',
        'change #securitygroup-name': 'setSGName',
        'change #securitygroup-description': 'setSGDescription',
        'OPTION_CHANGE #sg-rule-filter-select': 'sortSgRule'
      },
      render: function() {
        var tpl;
        tpl = this.model.isReadOnly ? app_template : template;
        this.$el.html(tpl(this.model.toJSON()));
        this.refreshSgruleList();
        this.setTitle(this.model.get("name"));
        this.prependTitle('<span class="sg-color" style="background-color:' + this.model.get("color") + '" ></span>');
        this.forceShow();
        setTimeout(function() {
          return $('#securitygroup-name').focus();
        }, 200);
        return this.model.get("name");
      },
      refreshSgruleList: function() {
        var rules;
        rules = this.model.get('rules');
        rules.deletable = this.model.get('ruleEditable');
        return $('#sg-rule-list').html(MC.template.sgRuleList(rules));
      },
      showCreateRuleModal: function(event) {
        modal(MC.template.modalSGRule(this.model.createSGRuleData()));
        $("#sg-modal-direction").on("click", "input", this.radioSgModalChange);
        $("#modal-protocol-select").on("OPTION_CHANGE", this.sgModalSelectboxChange);
        $("#protocol-icmp-main-select").on("OPTION_CHANGE", this.icmpMainSelect);
        $("#sg-protocol-select-result").on("OPTION_CHANGE", ".protocol-icmp-sub-select", this.icmpSubSelect);
        $("#sg-modal-save").on("click", _.bind(this.saveSgModal, this));
        $("#sg-add-model-source-select").on("OPTION_CHANGE", this.modalRuleSourceSelected);
        return false;
      },
      radioSgModalChange: function(event) {
        if ($('#sg-modal-direction input:checked').val() === "inbound") {
          return $('#rule-modal-ip-range').text("Source");
        } else {
          return $('#rule-modal-ip-range').text("Destination");
        }
      },
      sgModalSelectboxChange: function(event, id) {
        $('#sg-protocol-select-result').find('.show').removeClass('show');
        $('.sg-protocol-option-input').removeClass("show");
        $('#sg-protocol-' + id).addClass('show');
        $('.protocol-icmp-sub-select').removeClass('shown');
        $('#modal-protocol-select').data('protocal-type', id);
        return null;
      },
      icmpMainSelect: function(event, id) {
        $("#protocol-icmp-main-select").data('protocal-main', id);
        if (id === "3" || id === "5" || id === "11" || id === "12") {
          $('.protocol-icmp-sub-select').removeClass('shown');
          return $('#protocol-icmp-sub-select-' + id).addClass('shown');
        } else {
          return $('.protocol-icmp-sub-select').removeClass('shown');
        }
      },
      icmpSubSelect: function(event, id) {
        return $("#protocol-icmp-main-select").data('protocal-sub', id);
      },
      modalRuleSourceSelected: function(event) {
        var isCustom, value;
        value = $.trim($(event.target).find('.selected').attr('data-id'));
        isCustom = value === 'custom';
        $('#securitygroup-modal-description').toggle(isCustom);
        $('#sg-add-model-source-select .selection').width(isCustom ? 69 : 322);
        return null;
      },
      setSGName: function(event) {
        var name, oldName, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "SG")) {
          oldName = this.model.get("name");
          this.model.setName(name);
          this.setTitle(this.model.get("name"));
          this.prependTitle('<span class="sg-color" style="background-color:' + this.model.get("color") + '" ></span>');
          $("#sg-rule-list").children().find(".rule-reference").each(function() {
            if ($(this).text() === oldName) {
              $(this).html(title);
            }
          });
        }
        return null;
      },
      setSGDescription: function(event) {
        this.model.setDescription(event.target.value);
        return null;
      },
      sortSgRule: function(event) {
        this.model.sortSGRule($(event.target).find('.selected').attr('data-id'));
        this.refreshSgruleList();
        return null;
      },
      removeRulefromList: function(event) {
        var li_dom, rule, ruleCount;
        li_dom = $(event.target).closest('li');
        rule = {
          ruleSetId: li_dom.attr('data-uid'),
          port: li_dom.attr('data-port'),
          protocol: li_dom.attr('data-protocol'),
          direction: li_dom.attr('data-direction'),
          relation: li_dom.attr("data-relationid")
        };
        li_dom.remove();
        ruleCount = $("#sg-rule-list").children().length;
        $("#rule-count").text(ruleCount);
        this.model.removeRule(rule);
        return false;
      },
      saveSgModal: function(event) {
        var custom_protocal_dom, descrition_dom, needValidate, ports, protocol_type, protocol_val, protocol_val_sub, result, rule, sg_direction, sourceValue, tcp_port_dom, udp_port_dom, validateMap;
        sg_direction = $('#sg-modal-direction input:checked').val();
        descrition_dom = $('#securitygroup-modal-description');
        tcp_port_dom = $('#sg-protocol-tcp input');
        udp_port_dom = $('#sg-protocol-udp input');
        custom_protocal_dom = $('#sg-protocol-custom input');
        protocol_type = $('#modal-protocol-select').data('protocal-type');
        sourceValue = $.trim($('#sg-add-model-source-select').find('.selected').attr('data-id'));
        validateMap = {
          'custom': {
            dom: custom_protocal_dom,
            method: function(val) {
              if (!MC.validate.portRange(val)) {
                return lang.ide.PARSLEY_MUST_BE_A_VALID_FORMAT_OF_NUMBER;
              }
              if (Number(val) < 0 || Number(val) > 255) {
                return lang.ide.PARSLEY_THE_PROTOCOL_NUMBER_RANGE_MUST_BE_0_255;
              }
              return null;
            }
          },
          'tcp': {
            dom: tcp_port_dom,
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return lang.ide.PARSLEY_MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
              }
              if (!MC.validate.portValidRange(portAry)) {
                return lang.ide.PARSLEY_PORT_RANGE_BETWEEN_0_65535;
              }
              return null;
            }
          },
          'udp': {
            dom: udp_port_dom,
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return lang.ide.PARSLEY_MUST_BE_A_VALID_FORMAT_OF_PORT_RANGE;
              }
              if (!MC.validate.portValidRange(portAry)) {
                return lang.ide.PARSLEY_PORT_RANGE_BETWEEN_0_65535;
              }
              return null;
            }
          }
        };
        if (protocol_type in validateMap) {
          needValidate = validateMap[protocol_type];
          needValidate.dom.parsley('custom', needValidate.method);
        }
        descrition_dom.parsley('custom', function(val) {
          if (!MC.validate('cidr', val)) {
            return lang.ide.PARSLEY_MUST_BE_CIDR_BLOCK;
          }
          return null;
        });
        if ((sourceValue === 'custom' && (!descrition_dom.parsley('validate'))) || (needValidate && !needValidate.dom.parsley('validate'))) {
          return;
        }
        rule = {
          protocol: protocol_type,
          direction: sg_direction || "inbound",
          fromPort: "",
          toPort: ""
        };
        switch (protocol_type) {
          case "tcp":
          case "udp":
            ports = $('#sg-protocol-' + protocol_type + ' input').val().split('-');
            rule.fromPort = ports[0].trim();
            if (ports.length >= 2) {
              rule.toPort = ports[1].trim();
            }
            break;
          case "icmp":
            protocol_val = $("#protocol-icmp-main-select").data('protocal-main');
            protocol_val_sub = $("#protocol-icmp-main-select").data('protocal-sub');
            rule.fromPort = protocol_val;
            rule.toPort = protocol_val_sub;
            break;
          case "custom":
            rule.protocol = $('#sg-protocol-custom input').val();
        }
        if (sourceValue === 'custom') {
          rule.relation = descrition_dom.val();
        } else {
          rule.relation = "@" + $('#sg-add-model-source-select').children("ul").children('.selected').attr("data-uid");
        }
        result = this.model.addRule(rule);
        if (!result) {
          return notification('warning', lang.ide.PROP_WARN_SG_RULE_EXIST);
        } else {
          this.refreshSgruleList();
          return modal.close();
        }
      }
    });
    return new SgView();
  });

}).call(this);

(function() {
  define('module/design/property/sg/main',['../base/main', './model', './view'], function(PropertyModule, model, view) {
    var SgModule;
    SgModule = PropertyModule.extend({
      subPanelID: "SG",
      initStack: function() {
        this.model = model;
        this.model.isReadOnly = false;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isReadOnly = true;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isReadOnly = false;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/sgrule/model',['../base/model', "Design"], function(PropertyModel, Design) {
    var SGRuleModel;
    SGRuleModel = PropertyModel.extend({
      init: function(line_id) {
        var SgRuleSetModel, allRuleSets, connection;
        connection = Design.instance().component(line_id);
        if (!connection) {
          return;
        }
        SgRuleSetModel = Design.modelClassForType("SgRuleSet");
        allRuleSets = SgRuleSetModel.getRelatedSgRuleSets(connection.port1Comp(), connection.port2Comp());
        this.set({
          uid: line_id,
          groups: SgRuleSetModel.getGroupedObjFromRuleSets(allRuleSets),
          readOnly: this.isApp
        });
        return null;
      }
    });
    return new SGRuleModel();
  });

}).call(this);

define('module/design/property/sgrule/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-group-head truncate\"><span class=\"sg-color sg-color-rule-header\" style=\"background-color:"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerColor)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  <ul class=\"property-group sg-rule-list property-list\">";
  stack1 = ((stack1 = (depth0 && depth0.ruleListTpl)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"tac property-control-group\">\n    <button class=\"btn\" id=\"sg-edit-rule-button\" style=\"width:180px;\"><i class=\"icon-edit icon-label\"></i>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGRULE_BTN_EDIT_RULE", {hash:{},data:data}))
    + "</button>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article>\n  <section class=\"property-info\" style=\"margin-top:0;\">\n    <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SGRULE_DESCRIPTION", {hash:{},data:data}))
    + "</div>\n  </section>\n\n	";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.groups), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/sgrule/view',['../base/view', './template/stack', "component/sgrule/SGRulePopup"], function(PropertyView, template, SGRulePopup) {
    var SgRuleView;
    SgRuleView = PropertyView.extend({
      events: {
        "click #sg-edit-rule-button": "onEditRule"
      },
      render: function() {
        var group, _i, _len, _ref;
        _ref = this.model.attributes.groups;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          group = _ref[_i];
          group.ruleListTpl = MC.template.sgRuleList(group.rules);
        }
        this.$el.html(template(this.model.attributes));
        return "Security Group Rule";
      },
      onEditRule: function(event) {
        new SGRulePopup(this.model.get("uid"));
        return false;
      }
    });
    return new SgRuleView();
  });

}).call(this);

(function() {
  define('module/design/property/sgrule/main',['../base/main', './model', './view'], function(PropertyModule, model, view) {
    var SgRuleModule;
    SgRuleModule = PropertyModule.extend({
      handleTypes: ["ElbAmiAsso", "SgRuleLine"],
      initStack: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isApp = true;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/volume/model',['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var VolumeModel;
    VolumeModel = PropertyModel.extend({
      init: function(uid) {
        var component, item, res, snapshot_list, volume_detail, _i, _len, _ref;
        component = Design.instance().component(uid);
        res = component.attributes;
        if (!res.owner) {
          console.error("[volume property] can not found owner of volume!");
          return false;
        }
        volume_detail = {
          isWin: res.name[0] !== '/',
          isStandard: res.volumeType === 'standard',
          iops: res.iops,
          volume_size: res.volumeSize,
          snapshot_id: res.snapshotId,
          name: res.name
        };
        if (volume_detail.isWin) {
          volume_detail.editName = volume_detail.name.slice(-1);
        } else {
          volume_detail.editName = volume_detail.name.slice(5);
        }
        if (volume_detail.snapshot_id) {
          snapshot_list = MC.data.config[Design.instance().region()].snapshot_list;
          if (snapshot_list && snapshot_list.item) {
            _ref = snapshot_list.item;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              if (item.snapshotId === volume_detail.snapshot_id) {
                volume_detail.snapshot_size = item.volumeSize;
                volume_detail.snapshot_desc = item.description;
                break;
              }
            }
          }
        }
        if (volume_detail.volume_size < 10) {
          volume_detail.iopsDisabled = true;
        }
        this.set('volume_detail', volume_detail);
        this.set('uid', uid);
        return null;
      },
      setDeviceName: function(name) {
        var allVolume, device_name, lc, lcUid, newDeviceName, newId, realuid, uid, v, volume, volumeModel, _i, _len;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        if (!volume) {
          realuid = uid.split('_');
          device_name = realuid[2];
          lcUid = realuid[0];
          lc = Design.instance().component(lcUid);
          volumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
          allVolume = volumeModel && volumeModel.allObjects() || [];
          for (_i = 0, _len = allVolume.length; _i < _len; _i++) {
            v = allVolume[_i];
            if (v.get('owner') === lc) {
              if (v.get('name') === device_name) {
                newDeviceName = volume.genFullName(name);
                newId = "" + realuid + "_volume_" + name;
                v.set('name', newDeviceName);
                MC.canvas.update(uid, 'text', "volume_name", newDeviceName);
                MC.canvas.update(realuid, 'id', "volume_" + device_name, newId);
                this.attributes.volume_detail.name = newDeviceName;
                this.attributes.volume_detail.editName = name;
                this.set('uid', newId);
                break;
              }
            }
          }
        } else {
          newDeviceName = volume.genFullName(name);
          volume.set('name', newDeviceName);
          MC.canvas.update(uid, 'text', "volume_name", newDeviceName);
          this.attributes.volume_detail.name = newDeviceName;
        }
        return null;
      },
      setVolumeSize: function(value) {
        var allVolume, device_name, lc, lcUid, realuid, uid, v, volume, volumeModel, _i, _len;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        if (!volume) {
          realuid = uid.split('_');
          device_name = realuid[2];
          lcUid = realuid[0];
          lc = Design.instance().component(lcUid);
          volumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
          allVolume = volumeModel && volumeModel.allObjects() || [];
          for (_i = 0, _len = allVolume.length; _i < _len; _i++) {
            v = allVolume[_i];
            if (v.get('owner') === lc) {
              if (v.get('name') === device_name) {
                v.set('volumeSize', value);
                break;
              }
            }
          }
        } else {
          volume.set('volumeSize', value);
        }
        return null;
      },
      setVolumeTypeStandard: function() {
        var uid, volume;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        return volume.set({
          'volumeType': 'standard',
          'iops': ''
        });
      },
      setVolumeTypeIops: function(value) {
        var uid, volume;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        return volume.set({
          'volumeType': 'io1',
          'iops': value
        });
      },
      setVolumeIops: function(value) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).set('iops', value);
        return null;
      },
      genFullName: function(name) {
        if (comp.name[0] !== '/') {
          if (comp.name === "xvd" + name) {
            return true;
          }
        } else if (comp.name.indexOf(name) !== -1) {
          return true;
        }
      },
      isDuplicate: function(name) {
        var allVolume, device_name, lc, lcUid, realuid, uid, v, volume, volumeModel, _i, _len;
        uid = this.get("uid");
        volume = Design.instance().component(uid);
        volumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
        allVolume = volumeModel && volumeModel.allObjects() || [];
        if (!volume) {
          realuid = uid.split('_');
          device_name = realuid[2];
          lcUid = realuid[0];
          lc = Design.instance().component(lcUid);
          for (_i = 0, _len = allVolume.length; _i < _len; _i++) {
            v = allVolume[_i];
            if (v.get('owner') === lc) {
              volume = v;
              break;
            }
          }
        }
        return _.some(allVolume, function(v) {
          var fullName;
          fullName = v.genFullName(name);
          if (v !== volume && v.get('name') === fullName) {
            return true;
          }
        });
      }
    });
    return new VolumeModel();
  });

}).call(this);

define('module/design/property/volume/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <label for=\"volume-device\">xvd</label>\n            <input class=\"input input-device\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.editName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"volume-device\" data-ignore=\"true\" data-required-rollback=\"true\" maxlength=\"1\"/>\n            ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <label for=\"volume-device\">/dev/</label>\n            <input class=\"input input-device\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.editName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"volume-device\" data-ignore=\"true\" data-required-rollback=\"true\" maxlength=\"5\"/>\n            ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SNAPSHOT", {hash:{},data:data}))
    + "</label>\n        <div id=\"snapshot-info-group\" class=\"clearfix property-block-wrap\" data-uid='"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>\n            <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"mgl5\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</span> </div>\n            <div><span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n        </div>\n    </section>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "class=\"tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_MSG_WARN", {hash:{},data:data}))
    + "\"";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "disabled";
  }

function program15(depth0,data) {
  
  
  return "style=\"display:none\"";
  }

function program17(depth0,data) {
  
  
  return "style=\"display:block\"";
  }

function program19(depth0,data) {
  
  
  return "\n            <input id=\"iops-ranged\" type=\"text\" class=\"input\" value=\"100\" name=\"iops-ranged\" min=\"100\" max=\"2000\" required=\"\">\n            ";
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <input class=\"input\" id=\"iops-ranged\" type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"iops-ranged\" min=\"100\" max=\"2000\" required=\"\">\n            ";
  return buffer;
  }

  buffer += "<article id='property-panel-volume' data-bind=\"true\" data-focus=\"none\">\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</label>\n        <div class=\"name\">\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isWin), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n    </section>\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</label>\n        <div class=\"ranged-number-input\">\n            <label for=\"volume-size-ranged\"></label>\n            <input id=\"volume-size-ranged\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.volume_size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"volume-size-ranged\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-required=\"true\" data-type=\"number\"/>\n        <label for=\"volume-property-ranged-number\" >GB</label>\n        </div>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.snapshot_id), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <section class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</label>\n        <div class=\"context\" id=\"volume-type-radios\">\n            <div>\n            <div class=\"radio\">\n                <input id=\"radio-standard\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"radio-standard\"/>\n                <label for=\"radio-standard\"></label>\n            </div>\n            <label for=\"radio-standard\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE_STANDARD", {hash:{},data:data}))
    + "</label>\n            </div>\n            <div ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"radio\">\n                <input id=\"radio-iops\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.program(7, program7, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"radio-iops\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n                <label for=\"radio-iops\"></label>\n            </div>\n            <label for=\"radio-iops\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE_IOPS", {hash:{},data:data}))
    + "</label>\n            </div>\n        </div>\n    </section>\n\n    <section class=\"property-control-group\" id=\"iops-group\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label>IOPS</label>\n        <div class=\"ranged-number-input\">\n            <label for=\"iops-ranged\"></label>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.volume_detail)),stack1 == null || stack1 === false ? stack1 : stack1.isStandard), {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <label for=\"volume-property-ranged-number\" ></label>\n        </div>\n    </section>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/volume/view',['../base/view', './template/stack', 'event', 'i18n!nls/lang.js'], function(PropertyView, template, ide_event, lang) {
    var VolumeView;
    VolumeView = PropertyView.extend({
      events: {
        'click #volume-type-radios input': 'volumeTypeChecked',
        'change #volume-device': 'deviceNameChanged',
        'keyup #volume-size-ranged': 'sizeChanged',
        'keyup  #volume-size-ranged': 'processIops',
        'keyup #iops-ranged': 'sizeChanged',
        'click #snapshot-info-group': 'showSnapshotDetail'
      },
      render: function() {
        console.log('property:volume render');
        this.$el.html(template(this.model.attributes));
        $('#volume-size-ranged').parsley('custom', function(val) {
          val = +val;
          if (!val || val > 1024 || val < 1) {
            return lang.ide.PARSLEY_VOLUME_SIZE_MUST_IN_1_1024;
          }
        });
        $('#iops-ranged').parsley('custom', function(val) {
          var volume_size;
          val = +val;
          volume_size = parseInt($('#volume-size-ranged').val(), 10);
          if (val > 4000 || val < 100) {
            return lang.ide.PARSLEY_IOPS_MUST_BETWEEN_100_4000;
          } else if (val > 10 * volume_size) {
            return lang.ide.PARSLEY_IOPS_MUST_BE_LESS_THAN_10_TIMES_OF_VOLUME_SIZE;
          }
        });
        return this.model.attributes.volume_detail.name;
      },
      volumeTypeChecked: function(event) {
        this.processIops();
        if ($('#volume-type-radios input:checked').val() === 'radio-standard') {
          $('#iops-group').hide();
          this.model.setVolumeTypeStandard();
        } else {
          $('#iops-group').show();
          this.model.setVolumeTypeIops($('#iops-ranged').val());
        }
        return this.sizeChanged();
      },
      deviceNameChanged: function(event) {
        var devicePrefix, name, self, target, type;
        target = $(event.currentTarget);
        name = target.val();
        devicePrefix = target.prev('label').text();
        type = devicePrefix === '/dev/' ? 'linux' : 'windows';
        self = this;
        target.parsley('custom', function(val) {
          if (!MC.validate.deviceName(val, type, true)) {
            if (type === 'linux') {
              return lang.ide.PARSLEY_DEVICENAME_LINUX;
            } else {
              return lang.ide.PARSLEY_DEVICENAME_WINDOWS;
            }
          }
          if (self.model.isDuplicate(val)) {
            return sprintf(lang.ide.PARSLEY_VOLUME_NAME_INUSE, val);
          }
        });
        if (target.parsley('validate')) {
          this.model.setDeviceName(name);
          return this.setTitle(this.model.attributes.volume_detail.name);
        }
      },
      processIops: function(event) {
        var opsCheck, size;
        size = parseInt($('#volume-size-ranged').val(), 10);
        opsCheck = $('#radio-iops').is(':checked');
        if (size >= 10) {
          this.enableIops();
        } else if (!opsCheck) {
          this.disableIops();
        }
        return null;
      },
      enableIops: function() {
        return $('#volume-type-radios > div').last().data('tooltip', '').find('input').removeAttr('disabled');
      },
      disableIops: function() {
        return $('#volume-type-radios > div').last().data('tooltip', 'Volume size must be at least 10 GB to use Provisioned IOPS volume type.').find('input').attr('disabled', '');
      },
      sizeChanged: function(event) {
        var iopsEnabled, iopsValidate, volumeSize, volumeValidate;
        volumeSize = parseInt($('#volume-size-ranged').val(), 10);
        iopsValidate = true;
        volumeValidate = $('#volume-size-ranged').parsley('validate');
        iopsEnabled = $('#radio-iops').is(':checked');
        if (iopsEnabled) {
          iopsValidate = $('#iops-ranged').parsley('validate');
        }
        if (volumeValidate && iopsValidate) {
          this.trigger('VOLUME_SIZE_CHANGED', volumeSize);
          if (iopsEnabled) {
            this.model.setVolumeIops($('#iops-ranged').val());
          }
        }
        return null;
      },
      showSnapshotDetail: function(event) {
        this.trigger("OPEN_SNAPSHOT", $("#snapshot-info-group").data("uid"));
        return null;
      }
    });
    return new VolumeView();
  });

}).call(this);

(function() {
  define('module/design/property/volume/app_model',['../base/model', 'Design'], function(PropertyModel, Design) {
    var VolumeAppModel;
    VolumeAppModel = PropertyModel.extend({
      init: function(uid) {
        var appId, myVolumeComponent, volume;
        myVolumeComponent = Design.instance().component(uid);
        if (myVolumeComponent) {
          appId = myVolumeComponent.get("appId");
        } else {
          appId = uid;
        }
        volume = MC.data.resource_list[Design.instance().region()][appId];
        if (volume) {
          if (volume.attachmentSet) {
            volume.name = volume.attachmentSet.item[0].device;
          }
        } else {
          return false;
        }
        return this.set(volume);
      }
    });
    return new VolumeAppModel();
  });

}).call(this);

define('module/design/property/volume/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.snapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>IOPS</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.volumeId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.name), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</dd>\n  </dl>\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.volumeType), {hash:{},data:data}))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshotId), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.size), {hash:{},data:data}))
    + " GB</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.iops), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </dl>\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_ATTACHMENT_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.status), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_INSTANCE_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.instanceId), {hash:{},data:data}))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_ATTACHMENT_TIME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.attachmentSet)),stack1 == null || stack1 === false ? stack1 : stack1.item)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.attachTime), {hash:{},data:data}))
    + "</dd>\n  </dl>\n</article>\n\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/volume/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var VolumeView;
    VolumeView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new VolumeView();
  });

}).call(this);

(function() {
  define('module/design/property/volume/main',["../base/main", "./model", "./view", "./app_model", "./app_view", "constant"], function(PropertyModule, model, view, app_model, app_view, constant) {
    var VolumeModule;
    VolumeModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.VOL, "component_asg_volume"],
      setupStack: function() {
        var me;
        me = this;
        this.view.on('VOLUME_SIZE_CHANGED', function(value) {
          me.model.setVolumeSize(value);
          return MC.canvas.update(model.attributes.uid, "text", "volume_size", value + "GB");
        });
        this.model.once('REFRESH_PANEL', function() {
          return me.view.render();
        });
        this.view.on("OPEN_SNAPSHOT", function(id) {
          PropertyModule.loadSubPanel("STATIC", id);
          return null;
        });
        return null;
      },
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/elb/model',['../base/model', "event", "Design", 'constant'], function(PropertyModel, ide_event, Design, constant) {
    var ElbModel;
    ElbModel = PropertyModel.extend({
      init: function(uid) {
        var AzModel, allCertModelAry, ami, attr, az, azArr, azComp, component, connectedAzMap, currentSSLCert, filterFunc, i, pingArr, reg, replaceFunc, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        component = Design.instance().component(uid);
        this.getAppData(uid);
        attr = component.toJSON();
        attr.uid = uid;
        attr.isVpc = true;
        pingArr = component.getHealthCheckTarget();
        attr.pingProtocol = pingArr[0];
        attr.pingPort = pingArr[1];
        attr.pingPath = pingArr[2];
        if (attr.sslCert) {
          attr.sslCert = attr.sslCert.toJSON();
        }
        _ref = attr.listeners;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (i.protocol === "SSL" || i.protocol === "HTTPS") {
            attr.showCert = true;
            break;
          }
        }
        if (!attr.isVpc) {
          AzModel = Design.modelClassForType(constant.RESTYPE.AZ);
          connectedAzMap = {};
          _ref1 = component.connectionTargets("ElbAmiAsso");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ami = _ref1[_j];
            if (ami.parent().type === constant.RESTYPE.ASG) {
              az = ami.parent().parent();
            } else {
              az = ami.parent();
            }
            connectedAzMap[az.get("name")] = true;
          }
          reg = /-[\w]/g;
          replaceFunc = function(g) {
            return " " + g[1].toUpperCase();
          };
          filterFunc = function(ch) {
            return ch.type === constant.RESTYPE.INSTANCE;
          };
          azArr = AzModel.allPossibleAZ();
          for (_k = 0, _len2 = azArr.length; _k < _len2; _k++) {
            az = azArr[_k];
            if (connectedAzMap[az.name]) {
              az.disabled = connectedAzMap[az.name];
              az.selected = true;
            } else {
              az.disabled = false;
              az.selected = attr.AvailabilityZones.indexOf(az.name) !== -1;
            }
            az.displayName = az.name.replace(reg, replaceFunc);
            az.displayName = az.displayName[0].toUpperCase() + az.displayName.substr(1);
            if (az.id) {
              azComp = Design.instance().component(az.id);
              az.instanceCount = _.filter(azComp.children(), filterFunc).length;
            }
          }
          attr.azArray = azArr;
        }
        currentSSLCert = component.connectionTargets("SslCertUsage")[0];
        allCertModelAry = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
        attr.noSSLCert = true;
        attr.sslCertItem = _.map(allCertModelAry, function(sslCertModel) {
          if (currentSSLCert === sslCertModel) {
            attr.noSSLCert = false;
          }
          return {
            uid: sslCertModel.id,
            name: sslCertModel.get('name'),
            selected: currentSSLCert === sslCertModel
          };
        });
        if (attr.ConnectionDraining) {
          if (attr.ConnectionDraining.Enabled === true) {
            attr.connectionDrainingEnabled = true;
            attr.connectionDrainingTimeout = attr.ConnectionDraining.Timeout;
          } else {
            attr.connectionDrainingEnabled = false;
          }
        }
        this.set(attr);
        return null;
      },
      getAppData: function(uid) {
        var appData, elb, myElbComponent;
        uid = uid || this.get("uid");
        myElbComponent = Design.instance().component(uid);
        appData = MC.data.resource_list[Design.instance().region()];
        elb = appData[myElbComponent.get('appId')];
        if (!elb) {
          return;
        }
        this.set({
          appData: true,
          isInternet: elb.Scheme === 'internet-facing',
          DNSName: elb.DNSName,
          CanonicalHostedZoneNameID: elb.CanonicalHostedZoneNameID
        });
        return null;
      },
      setScheme: function(value) {
        value = value === "internal";
        Design.instance().component(this.get("uid")).setInternal(value);
        if (!value) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        return null;
      },
      setElbCrossAZ: function(value) {
        Design.instance().component(this.get("uid")).set("crossZone", !!value);
        return null;
      },
      setHealthProtocol: function(value) {
        Design.instance().component(this.get("uid")).setHealthCheckTarget(value);
        return null;
      },
      setHealthPort: function(value) {
        Design.instance().component(this.get("uid")).setHealthCheckTarget(void 0, value);
        return null;
      },
      setHealthPath: function(value) {
        Design.instance().component(this.get("uid")).setHealthCheckTarget(void 0, void 0, value);
        return null;
      },
      setHealthInterval: function(value) {
        Design.instance().component(this.get("uid")).set("healthCheckInterval", value);
        return null;
      },
      setHealthTimeout: function(value) {
        Design.instance().component(this.get("uid")).set("healthCheckTimeout", value);
        return null;
      },
      setHealthUnhealth: function(value) {
        Design.instance().component(this.get("uid")).set("unHealthyThreshold", value);
        return null;
      },
      setHealthHealth: function(value) {
        Design.instance().component(this.get("uid")).set("healthyThreshold", value);
        return null;
      },
      setListener: function(idx, value) {
        Design.instance().component(this.get("uid")).setListener(idx, value);
        return null;
      },
      removeListener: function(idx) {
        Design.instance().component(this.get("uid")).removeListener(idx);
        return null;
      },
      setCert: function(value) {
        Design.instance().component(this.get("uid")).connectionTargets("SslCertUsage")[0].set(value);
        return null;
      },
      addCert: function(value) {
        var SslCertModel;
        SslCertModel = Design.modelClassForType(constant.RESTYPE.IAM);
        (new SslCertModel(value)).assignTo(Design.instance().component(this.get("uid")));
        return null;
      },
      removeCert: function(value) {
        Design.instance().component(value).remove();
        return null;
      },
      updateElbAZ: function(azArray) {
        Design.instance().component(this.get("uid")).set("AvailabilityZones", azArray);
        return null;
      },
      changeCert: function(certUID) {
        var cn, design, _i, _len, _ref;
        design = Design.instance();
        if (certUID) {
          design.component(certUID).assignTo(design.component(this.get("uid")));
        } else {
          _ref = design.component(this.get("uid")).connections("SslCertUsage");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cn = _ref[_i];
            cn.remove();
          }
        }
        return null;
      },
      updateCert: function(certUID, certObj) {
        Design.instance().component(certUID).updateValue(certObj);
        return null;
      },
      getOtherCertName: function(currentName) {
        var allCertModelAry, otherCertNameAry;
        allCertModelAry = Design.modelClassForType(constant.RESTYPE.IAM).allObjects();
        otherCertNameAry = [];
        _.each(allCertModelAry, function(sslCertModel) {
          var sslCertName;
          sslCertName = sslCertModel.get('name');
          if (currentName !== sslCertName) {
            return otherCertNameAry.push(sslCertName);
          }
        });
        return otherCertNameAry;
      },
      setConnectionDraining: function(enabled, timeout) {
        var elbModel;
        if (!enabled) {
          timeout = null;
        }
        elbModel = Design.instance().component(this.get("uid"));
        return elbModel.set('ConnectionDraining', {
          Enabled: enabled,
          Timeout: timeout
        });
      },
      setAdvancedProxyProtocol: function(enable, portAry) {
        var elbModel;
        elbModel = Design.instance().component(this.get("uid"));
        return elbModel.setPolicyProxyProtocol(enable, portAry);
      }
    });
    return new ElbModel();
  });

}).call(this);

define('module/design/property/elb/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dl class=\"dl-vertical property-app\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SCHEME", {hash:{},data:data}))
    + "</dt>\n      <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isInternet), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_DNS_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>\n        <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A)"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(AAAA)ipv6."
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A/AAAA)dualstack."
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      </dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HOST_ZONE_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.CanonicalHostedZoneNameID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n    </dl>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "Internet Facing";
  }

function program4(depth0,data) {
  
  
  return "Internal";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-elb-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_REQUIRED", {hash:{},data:data}))
    + "</span>\n			<input data-ignore=\"true\" data-required-rollback=\"true\" maxlength=\"17\" class=\"input elb-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-elb-name\"/>\n		</section>\n\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isVpc), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SCHEME", {hash:{},data:data}))
    + "</label>\n      <div class=\"mgt5\">\n        <div class=\"radio\">\n            <input type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.internal), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"internet\" id=\"elb-scheme-select1\" name=\"elb-schema-select\"/>\n            <label for=\"elb-scheme-select1\"></label>\n        </div>\n        <label for=\"elb-scheme-select1\">Internet-facing</label>\n      </div>\n      <div class=\"mgt5\">\n        <div class=\"radio\">\n            <input type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.internal), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"internal\" id=\"elb-scheme-select2\" name=\"elb-schema-select\"/>\n            <label for=\"elb-scheme-select2\"></label>\n        </div>\n        <label for=\"elb-scheme-select2\">Internal</label>\n    	</div>\n		</section>\n		";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program10(depth0,data) {
  
  
  return "hide";
  }

function program12(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.connectionDrainingTimeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program14(depth0,data) {
  
  
  return "300";
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<li class=\"elb-property-listener\">\n			<div class=\"elb-property-listener-item-remove icon-remove tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_REMOVE_LISTENER", {hash:{},data:data}))
    + "\" ";
  stack1 = helpers.unless.call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n\n			<div class=\"property-control-group clearfix\">\n				<div class=\"elb-property-listener-item-1\">\n					<label class=\"left\">Load Balancer Protocol</label>\n					<div class=\"selectbox elb-property-elb-protocol\">\n						<div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<ul class=\"dropdown\">\n							<li data-id=\"HTTP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTP</li>\n							<li data-id=\"HTTPS\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "HTTPS", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTPS</li>\n							<li data-id=\"TCP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">TCP</li>\n							<li data-id=\"SSL\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.protocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">SSL</li>\n						</ul>\n					</div>\n				</div>\n				<div class=\"elb-property-listener-item-2\">\n					<label class=\"left\">Port</label>\n					<input class=\"input elb-property-elb-port tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_25_80_443OR1024TO65535", {hash:{},data:data}))
    + "\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" maxlength=\"5\"/>\n				</div>\n			</div>\n\n			<div class=\"property-control-group clearfix\">\n				<div class=\"left elb-property-listener-item-1\">\n					<label class=\"left\">Instance Protocol</label>\n					<div class=\"selectbox elb-property-instance-protocol\">\n						<div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<ul class=\"dropdown\">\n							<li data-id=\"HTTP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTP</li>\n							<li data-id=\"HTTPS\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "HTTPS", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">HTTPS</li>\n							<li data-id=\"TCP\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">TCP</li>\n							<li data-id=\"SSL\" class=\"item ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.instanceProtocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">SSL</li>\n						</ul>\n					</div>\n				</div>\n				<div class=\"left elb-property-listener-item-2\">\n					<label class=\"left\">Port</label>\n					<input class=\"input elb-property-instance-port tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_1_65535", {hash:{},data:data}))
    + "\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instancePort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-required=\"true\" data-type=\"digits\" maxlength=\"5\"/>\n				</div>\n			</div>\n		</li>\n		";
  return buffer;
  }
function program17(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

function program19(depth0,data) {
  
  
  return "selected";
  }

function program21(depth0,data) {
  
  
  return " selected";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n								<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n									"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"icon-edit\"></span><span class=\"icon-remove\"></span>\n								</li>\n							";
  return buffer;
  }

function program25(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n	<div class=\"option-group sg-group\"></div>\n\n	";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.azArray), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;
  }
function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_AVAILABILITY_ZONE", {hash:{},data:data}))
    + " </div>\n		<div class=\"option-group\" id=\"property-elb-az-cb-group\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.azArray), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n		";
  return buffer;
  }
function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<section class=\"property-control-group\">\n				<div class=\"checkbox\">\n					<input class=\"property-elb-az-checkbox\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.disabled), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\n					<label for=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n				</div>\n				<label for=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"checkbox-label-main\">\n					<span>"
    + escapeExpression(((stack1 = (depth0 && depth0.displayName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></label>\n				<label for=\"property-elb-az-"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"checkbox-label-minor\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " instances</label>\n			</section>\n			";
  return buffer;
  }

  buffer += "<article id=\"stack-elb-property-panel\">\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_DETAILS", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\" >\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appData), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				<input id=\"elb-cross-az-select\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.crossZone), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"elb-cross-az-select\"></label>\n			</div>\n			<label for=\"elb-cross-az-select\" >Enable cross-zone load balancing</label>\n			<a class=\"elb-info-icon tooltip icon-info\" href=\"https://aws.amazon.com/about-aws/whats-new/2013/11/06/elastic-load-balancing-adds-cross-zone-load-balancing/\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_READ_RELATED_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n		</section>\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				<input id=\"elb-connection-draining-select\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.connectionDrainingEnabled), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"elb-connection-draining-select\"></label>\n			</div>\n			<label for=\"elb-connection-draining-select\" >Enable Connection Draining</label>\n			<a class=\"elb-info-icon tooltip icon-info\" href=\"http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/conﬁg-conn-drain.html\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_READ_RELATED_AWS_DOCUMENT", {hash:{},data:data}))
    + "\" target=\"_blank\"></a>\n			<div class=\"elb-connection-draining-input-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.connectionDrainingEnabled), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				<label for=\"elb-connection-draining-input\" class=\"left\">Timeout</label>\n				<input id=\"elb-connection-draining-input\" class=\"input parsley-validated\" type=\"text\" value=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.connectionDrainingTimeout), {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-ignore=\"true\" data-required=\"true\" data-type=\"number\">\n				<label for=\"elb-connection-draining-input\">seconds</label>\n			</div>\n		</section>\n	</div>\n\n	<!--\n	<div class=\"option-group-head\">Advanced Configuration</div>\n	<div class=\"option-group\" data-bind=\"true\"> <ul id=\"elb-property-listener-list\" class=\"property-list\">\n		<section class=\"property-control-group\">\n			<label>Proxy Protocol</label>\n			<div class=\"mgt5\">\n				<div class=\"checkbox\">\n					<input id=\"elb-advanced-proxy-protocol-select\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.otherPoliciesMap)),stack1 == null || stack1 === false ? stack1 : stack1.EnableProxyProtocol), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n					<label for=\"elb-advanced-proxy-protocol-select\"></label>\n				</div>\n				<label for=\"elb-advanced-proxy-protocol-select\">Enable Proxy Protocol</label>\n				<div id=\"elb-advanced-proxy-protocol-select-tip\" class=\"property-info ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.otherPoliciesMap)),stack1 == null || stack1 === false ? stack1 : stack1.EnableProxyProtocol), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">If you have a Proxy Protocol enabled proxy server in front of your load balancer, then you must not enable Proxy Protocol on your load balancer.</div>\n			</div>\n		</section>\n	</div>\n	-->\n\n	<div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_LISTENER_DETAIL", {hash:{},data:data}))
    + " </div>\n	<div class=\"option-group\" data-bind=\"true\"> <ul id=\"elb-property-listener-list\" class=\"property-list\">\n		";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.listeners), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n		<a href=\"#\" id=\"elb-property-listener-content-add\" class=\"add-to-list action-link\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_BTN_ADD_LISTENER", {hash:{},data:data}))
    + "</a>\n		<section class=\"property-control-group\" id=\"property-control-group-cert-setting\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SERVER_CERTIFICATE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"sslcert-select\">\n				<div class=\"selection\"></div>\n				<div style=\"height: 120px; width:260px;\" class=\"dropdown scroll-wrap scrollbar-auto-hide  clearfix\">\n					<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n					<div class=\"scroll-content\">\n						<ul>\n							<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noSSLCert), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">None</li>\n							";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.sslCertItem), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</ul>\n					</div>\n				</div>\n				<div class=\"editor\">\n					<a href=\"#\" class=\"editbtn\">Add New Certiﬁcate...</a>\n				</div>\n			</div>\n		</section>\n	</div>\n\n	<div class=\"option-group-head\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_DETAILS", {hash:{},data:data}))
    + " </div>\n	<div class=\"option-group\" data-bind=\"true\" data-validate=\"parsley\" >\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PING_PROTOCOL", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox mgt5\" id=\"elb-property-health-protocol-select\">\n				<div class=\"selection\">"
    + escapeExpression(((stack1 = (depth0 && depth0.pingProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n				<ul class=\"dropdown\" tabindex=\"-1\">\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"TCP\">TCP</li>\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "HTTP", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"HTTP\">HTTP</li>\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "HTTPS", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"HTTPS\">HTTPS</li>\n					<li class=\"item";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"SSL\">SSL</li>\n				</ul>\n			</div>\n		</section>\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label for=\"property-elb-health-port\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PING_PORT", {hash:{},data:data}))
    + "</label>\n			<input class=\"input mgt5\" tooltip=\"1-65535\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.pingPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-port\" id=\"property-elb-health-port\" data-required=\"true\" data-type=\"digits\" data-ignore=\"true\" maxlength=\"5\"/>\n		</section>\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-health-path\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PING_PATH", {hash:{},data:data}))
    + "</label>\n			<div class=\"pos-r mgt5\">\n				<input class=\"input\" ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "SSL", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.pingProtocol), "TCP", {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.pingPath)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-path\" id=\"property-elb-health-path\" />\n				<span class=\"elb-pingpath-prefix\">/</span>\n			</div>\n		</section>\n\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-health-interval\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_INTERVAL", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short mgt5\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckInterval)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-interval\" id=\"property-elb-health-interval\" data-required=\"true\" data-type=\"digits\" data-ignore=\"true\"/>\n			<label class=\"elb-property-right-text\" for=\"property-elb-health-interval\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</label>\n		</section>\n		<section class=\"property-control-group\">\n			<label for=\"property-elb-health-timout\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_RESPOND_TIMEOUT", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short mgt5\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckTimeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-elb-health-timeout\" id=\"property-elb-health-timeout\" data-required=\"true\" data-type=\"digits\" data-ignore=\"true\"/>\n			<label class=\"elb-property-right-text\" for=\"property-elb-health-timeout\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</label>\n		</section>\n\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_UNHEALTH_THRESHOLD", {hash:{},data:data}))
    + "</label>\n			<div class=\"slider\" id=\"elb-property-slider-unhealthy\">\n				<a class=\"thumb\"></a>\n				<ul class=\"marker\"><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul>\n			</div>\n		</section>\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_THRESHOLD", {hash:{},data:data}))
    + "</label>\n			<div class=\"slider\" id=\"elb-property-slider-healthy\">\n				<a class=\"thumb\"></a>\n				<ul class=\"marker\"><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul>\n			</div>\n		</section>\n	</div>\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isVpc), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('module/design/property/elb/view',['../base/view', './template/stack', 'event', 'i18n!nls/lang.js'], function(PropertyView, template, ide_event, lang) {
    var ElbView, Helper;
    Helper = {
      makeInRange: function(value, range, $target, deflt) {
        var begin, end;
        begin = range[0];
        end = range[1];
        if (isFinite(value)) {
          value = +value;
          if (value < begin) {
            value = begin;
          } else if (value > end) {
            value = end;
          }
        } else {
          value = deflt;
        }
        $target.val(value);
        return value;
      }
    };
    ElbView = PropertyView.extend({
      events: {
        'change #property-elb-name': 'elbNameChange',
        'change #elb-scheme-select1': "schemeSelectChange",
        'change #elb-scheme-select2': "schemeSelectChange",
        'OPTION_CHANGE #elb-property-health-protocol-select': "healthProtocolSelect",
        'change #property-elb-health-port': 'healthPortChanged',
        'change #property-elb-health-path': 'healthPathChanged',
        'change #property-elb-health-interval': 'healthIntervalChanged',
        'change #property-elb-health-timeout': 'healthTimeoutChanged',
        'OPTION_CHANGE .elb-property-elb-protocol': 'protocolChanged',
        'OPTION_CHANGE .elb-property-instance-protocol': 'protocolChanged',
        'change .elb-property-elb-port': 'portChanged',
        'change .elb-property-instance-port': 'portChanged',
        'click #elb-property-listener-content-add': 'listenerItemAddClicked',
        'click .elb-property-listener-item-remove': 'listenerItemRemovedClicked',
        'change #elb-property-cert-name-input': 'listenerCertChanged',
        'change #elb-property-cert-privatekey-input': 'listenerCertChanged',
        'change #elb-property-cert-publickey-input': 'listenerCertChanged',
        'change #elb-property-cert-chain-input': 'listenerCertChanged',
        'change .property-elb-az-checkbox': 'azCheckChanged',
        'mousedown .slider .thumb': "sliderMouseDown",
        'mousedown .slider li': "sliderSelect",
        'SLIDER_CHANGE .slider': 'sliderChanged',
        'change #elb-cross-az-select': 'elbCrossAZSelect',
        'click .editbtn': 'elbSSLCertAdd',
        'click #sslcert-select .item': 'changeSSLCert',
        'click #sslcert-select .item .icon-edit': 'elbSSLCertEdit',
        'click #sslcert-select .item .icon-remove': 'elbSSLCertRemove',
        'click #elb-connection-draining-select': 'elbConnectionDrainSelectChange',
        'change #elb-connection-draining-input': 'elbConnectionDrainTimeoutChange',
        'click #elb-advanced-proxy-protocol-select': 'elbAdvancedProxyProtocolSelectChange'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.updateSlider($('#elb-property-slider-unhealthy'), this.model.get('unHealthyThreshold') - 2);
        this.updateSlider($('#elb-property-slider-healthy'), this.model.get('healthyThreshold') - 2);
        this.updateCertView();
        return this.model.attributes.name;
      },
      elbNameChange: function(event) {
        var name, newName, oldName, target;
        target = $(event.currentTarget);
        name = target.val();
        oldName = this.model.get("name");
        if (this.checkResName(target, "Load Balancer")) {
          this.model.setName(name);
          this.setTitle(name);
          oldName += "-sg";
          newName = name + "-sg";
          return $("#sg-info-list").children().each(function() {
            var $name;
            $name = $(this).find(".sg-name");
            if ($name.text() === oldName) {
              $name.text(newName);
              return false;
            }
          });
        }
      },
      schemeSelectChange: function(event) {
        this.model.setScheme(event.currentTarget.value);
        return null;
      },
      healthProtocolSelect: function(event, value) {
        if (value === "TCP" || value === "SSL") {
          $('#property-elb-health-path').attr('disabled', 'disabled');
        } else {
          $('#property-elb-health-path').removeAttr('disabled');
        }
        return this.model.setHealthProtocol(value);
      },
      healthPortChanged: function(event) {
        var $target, value;
        $target = $(event.currentTarget);
        value = $target.val();
        value = Helper.makeInRange(value, [1, 65535], $target, 1);
        return this.model.setHealthPort(value);
      },
      healthPathChanged: function(event) {
        return this.model.setHealthPath($(event.currentTarget).val());
      },
      healthIntervalChanged: function(event) {
        var $target, $timeoutDom, value;
        $target = $(event.currentTarget);
        value = Helper.makeInRange($target.val(), [5, 300], $target, 30);
        $timeoutDom = $('#property-elb-health-timeout');
        $target.parsley('custom', function(val) {
          var intervalValue, timeoutValue;
          intervalValue = Number(val);
          timeoutValue = Number($timeoutDom.val());
          if (intervalValue < timeoutValue) {
            return lang.ide.PROP_ELB_HEALTH_INTERVAL_VALID;
          }
          return null;
        });
        if (!$target.parsley('validate')) {
          return;
        } else {
          $timeoutDom.parsley('validate');
        }
        return this.model.setHealthInterval(value);
      },
      healthTimeoutChanged: function(event) {
        var $intervalDom, $target, value;
        $target = $(event.currentTarget);
        value = Helper.makeInRange($target.val(), [2, 60], $target, 5);
        $intervalDom = $('#property-elb-health-interval');
        $target.parsley('custom', function(val) {
          var intervalValue, timeoutValue;
          intervalValue = Number($intervalDom.val());
          timeoutValue = Number(val);
          if (intervalValue < timeoutValue) {
            return lang.ide.PROP_ELB_HEALTH_INTERVAL_VALID;
          }
          return null;
        });
        if (!$target.parsley('validate')) {
          return;
        } else {
          $intervalDom.parsley('validate');
        }
        return this.model.setHealthTimeout(value);
      },
      sliderChanged: function(event, value) {
        var id, target;
        target = $(event.target);
        id = event.target.id;
        value += 2;
        if (id === 'elb-property-slider-unhealthy') {
          return this.model.setHealthUnhealth(value);
        } else {
          return this.model.setHealthHealth(value);
        }
      },
      listenerItemAddClicked: function(event) {
        var $li, $selectbox;
        $li = $("#elb-property-listener-list").children().eq(0).clone();
        $li.find(".elb-property-listener-item-remove").show();
        $selectbox = $li.find("ul");
        $selectbox.children(".selected").removeClass("selected");
        $selectbox.children(":first-child").addClass("selected");
        $selectbox.prev(".selection").text("HTTP");
        $('#elb-property-listener-list').append($li);
        this.updateListener($li);
        return false;
      },
      updateListener: function($li) {
        var obj;
        obj = {
          port: $li.find(".elb-property-elb-port").val(),
          protocol: $li.find(".elb-property-elb-protocol .selected").text(),
          instancePort: $li.find(".elb-property-instance-port").val(),
          instanceProtocol: $li.find(".elb-property-instance-protocol .selected").text()
        };
        this.model.setListener($li.index(), obj);
        this.updateCertView();
        return null;
      },
      protocolChanged: function(event) {
        var $allSelectItem, $protocol, $selectProtocol, currentPtotocol, layerMap, newOtherProtocol, otherProtocol, otherProtocolElem, parentItemElem, portElem, thatElem, value;
        $protocol = $(event.currentTarget);
        if (event) {
          thatElem = $(event.target);
          value = thatElem.find('.selection').text();
          if (value) {
            portElem = null;
            otherProtocolElem = null;
            parentItemElem = thatElem.parents('.elb-property-listener');
            if (thatElem.hasClass('elb-property-elb-protocol')) {
              portElem = parentItemElem.find('.elb-property-elb-port');
              otherProtocolElem = parentItemElem.find('.elb-property-instance-protocol');
            } else {
              portElem = parentItemElem.find('.elb-property-instance-port');
              otherProtocolElem = parentItemElem.find('.elb-property-elb-protocol');
            }
            if (value === 'HTTPS' || value === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
            layerMap = {
              'HTTP': 'application',
              'HTTPS': 'application',
              'TCP': 'transport',
              'SSL': 'transport'
            };
            currentPtotocol = value;
            otherProtocol = otherProtocolElem.find('.selection').text();
            if (layerMap[currentPtotocol] !== layerMap[otherProtocol]) {
              otherProtocolElem.find('.selection').text(currentPtotocol);
              $allSelectItem = otherProtocolElem.find('.item');
              $allSelectItem.removeClass('selected');
              $selectProtocol = otherProtocolElem.find("[data-id=" + currentPtotocol + "]");
              $selectProtocol.addClass('selected');
            }
            if (otherProtocolElem.hasClass('elb-property-elb-protocol')) {
              portElem = parentItemElem.find('.elb-property-elb-port');
            } else {
              portElem = parentItemElem.find('.elb-property-instance-port');
            }
            newOtherProtocol = otherProtocolElem.find('.selection').text();
            if (newOtherProtocol === 'HTTPS' || newOtherProtocol === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
          }
        }
        this.updateListener($protocol.closest("li"));
        return null;
      },
      portChanged: function(event) {
        var $input, validate;
        $input = $(event.currentTarget);
        if ($input.hasClass("elb-property-elb-port")) {
          validate = function(val) {
            val = parseInt(val, 10);
            if (!(val === 25 || val === 80 || val === 443 || ((1023 < val && val < 65536)))) {
              return lang.ide.PARSLEY_LOAD_BALANCER_PORT_MUST_BE_SOME_PROT;
            }
          };
        } else {
          validate = function(val) {
            val = parseInt(val, 10);
            if (!((0 < val && val < 65536))) {
              return lang.ide.PARSLEY_INSTANCE_PORT_MUST_BE_BETWEEN_1_AND_65535;
            }
          };
        }
        $input.parsley("custom", validate);
        if ($input.parsley("validate")) {
          this.updateListener($input.closest("li"));
        }
        return null;
      },
      listenerItemChanged: function(event) {
        var currentPtotocol, hasValidateError, isShowCertPanel, layerMap, listenerAry, listenerContainerElem, listenerItemElem, me, newOtherProtocol, otherProtocol, otherProtocolElem, parentItemElem, portElem, thatElem, value;
        if (event) {
          thatElem = $(event.target);
          value = thatElem.find('.selection').text();
          if (value) {
            portElem = null;
            otherProtocolElem = null;
            parentItemElem = thatElem.parents('.elb-property-listener-main');
            if (thatElem.hasClass('elb-property-listener-elb-protocol-select')) {
              portElem = parentItemElem.find('.elb-property-listener-elb-port-input');
              otherProtocolElem = parentItemElem.find('.elb-property-listener-instance-protocol-select');
            } else {
              portElem = parentItemElem.find('.elb-property-listener-instance-port-input');
              otherProtocolElem = parentItemElem.find('.elb-property-listener-elb-protocol-select');
            }
            if (value === 'HTTPS' || value === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
            layerMap = {
              'HTTP': 'application',
              'HTTPS': 'application',
              'TCP': 'transport',
              'SSL': 'transport'
            };
            currentPtotocol = value;
            otherProtocol = otherProtocolElem.find('.selection').text();
            if (layerMap[currentPtotocol] !== layerMap[otherProtocol]) {
              otherProtocolElem.find('.selection').text(currentPtotocol);
            }
            if (otherProtocolElem.hasClass('elb-property-listener-elb-protocol-select')) {
              portElem = parentItemElem.find('.elb-property-listener-elb-port-input');
            } else {
              portElem = parentItemElem.find('.elb-property-listener-instance-port-input');
            }
            newOtherProtocol = otherProtocolElem.find('.selection').text();
            if (newOtherProtocol === 'HTTPS' || newOtherProtocol === 'SSL') {
              portElem.val('443');
            } else {
              portElem.val('80');
            }
          }
        }
        me = this;
        listenerContainerElem = $('#accordion-group-elb-property-listener');
        listenerItemElem = listenerContainerElem.find('.elb-property-listener-main');
        listenerAry = [];
        isShowCertPanel = false;
        hasValidateError = false;
        listenerItemElem.each(function(index, elem) {
          var elbPort, elbPortValue, elbProtocolValue, instancePort, instancePortValue, instanceProtocolValue, newItemObj, that;
          that = $(this);
          elbProtocolValue = $.trim(that.find('.elb-property-listener-elb-protocol-select .selection').text());
          elbPortValue = that.find('.elb-property-listener-elb-port-input').val();
          instanceProtocolValue = $.trim(that.find('.elb-property-listener-instance-protocol-select .selection').text());
          instancePortValue = that.find('.elb-property-listener-instance-port-input').val();
          elbPort = that.find('.elb-property-listener-elb-port-input');
          instancePort = that.find('.elb-property-listener-instance-port-input');
          if (elbPortValidate && instancePortValidate && !isNaN(parseInt(elbPortValue, 10)) && !isNaN(parseInt(instancePortValue, 10))) {
            newItemObj = {
              Listener: {
                "LoadBalancerPort": elbPortValue,
                "InstanceProtocol": instanceProtocolValue,
                "Protocol": elbProtocolValue,
                "SSLCertificateId": "",
                "InstancePort": instancePortValue
              },
              PolicyNames: ''
            };
            listenerAry.push(newItemObj);
          }
          if (elbProtocolValue === 'HTTPS' || elbProtocolValue === 'SSL') {
            isShowCertPanel = true;
          }
          return null;
        });
        this.model.setListenerAry(idx, listener);
        this.updateCertView();
        return null;
      },
      listenerItemRemovedClicked: function(event) {
        var $li;
        $li = $(event.currentTarget).closest("li");
        this.model.removeListener($li.index());
        $li.remove();
        this.updateCertView();
        return false;
      },
      listenerCertChanged: function(event) {
        this.model.setCert({
          name: $('#elb-property-cert-name-input').val(),
          key: $('#elb-property-cert-privatekey-input').val(),
          body: $('#elb-property-cert-publickey-input').val(),
          chain: $('#elb-property-cert-chain-input').val()
        });
        return null;
      },
      updateCertView: function() {
        var $certPanel, show;
        show = false;
        $("#elb-property-listener-list").children().each(function() {
          var protocol;
          protocol = $(this).find(".elb-property-elb-protocol .selected").text();
          if (protocol === "HTTPS" || protocol === "SSL") {
            show = true;
            return false;
          }
        });
        $certPanel = $('#property-control-group-cert-setting');
        if (show) {
          $certPanel.show();
        } else {
          $certPanel.hide();
        }
        return null;
      },
      azCheckChanged: function(event) {
        var azArray;
        azArray = _.map($("#property-elb-az-cb-group").find("input:checked"), function(cb) {
          return $(cb).attr("data-name");
        });
        this.model.updateElbAZ(azArray);
        return null;
      },
      updateSlider: function($target, value) {
        var left, step, width;
        step = $target.children(".marker").children().length - 1;
        width = $target.width();
        left = value * Math.floor(width / step);
        $target.data("value", value).children(".thumb").css("left", left);
        return null;
      },
      sliderSelect: function(event) {
        var $slider, $target, value;
        $target = $(event.currentTarget);
        $slider = $target.closest(".slider");
        value = $target.index();
        this.updateSlider($slider, value);
        $slider.trigger("SLIDER_CHANGE", value);
        return null;
      },
      sliderMouseDown: function(event) {
        var $body, $slider, $thumb, offsetStep, onMouseMove, onMouseUp, originalX, step, stepWidth, thumbPos, value, width;
        $body = $("body");
        $thumb = $(event.currentTarget);
        $slider = $thumb.closest(".slider");
        step = $slider.children(".marker").children().length - 1;
        width = $slider.width();
        stepWidth = Math.floor(width / step);
        originalX = event.clientX;
        thumbPos = $thumb.position().left;
        value = $slider.data("value");
        offsetStep = 0;
        onMouseMove = function(event) {
          var absOffset, delta, halfStepWidth, newPos, offset;
          offset = event.clientX - originalX;
          absOffset = Math.abs(offset);
          halfStepWidth = stepWidth / 2;
          if (absOffset >= halfStepWidth) {
            absOffset += halfStepWidth;
            delta = offset > 0 ? 1 : -1;
            offsetStep = Math.floor(absOffset / stepWidth) * delta;
            newPos = thumbPos + offsetStep * stepWidth;
            if (newPos < 0) {
              newPos = 0;
              offsetStep = -value;
            } else if (newPos > width) {
              newPos = width;
              offsetStep = step - value;
            }
          } else {
            newPos = thumbPos;
            offsetStep = 0;
          }
          $thumb.css("left", newPos);
          return false;
        };
        onMouseUp = function() {
          var newValue;
          $body.off("mousemove", onMouseMove);
          newValue = value + offsetStep;
          $slider.data("value", newValue).trigger("SLIDER_CHANGE", newValue);
          return null;
        };
        $body.on("mousemove", onMouseMove);
        $body.one("mouseup", onMouseUp);
        return false;
      },
      elbCrossAZSelect: function(event) {
        this.model.setElbCrossAZ(event.target.checked);
        return null;
      },
      elbSSLCertAdd: function(event) {
        var that;
        that = this;
        that.popSSLCertModal(false);
        return false;
      },
      elbSSLCertEdit: function(event) {
        var $certEditItem, $certItem, certUID, that;
        that = this;
        $certEditItem = $(event.currentTarget);
        $certItem = $certEditItem.parents('.item');
        certUID = $certItem.attr('data-id');
        if (certUID) {
          that.popSSLCertModal(true, certUID);
        }
        return false;
      },
      elbSSLCertRemove: function(event) {
        var $certEditItem, $certItem, certModel, certName, certUID, that;
        that = this;
        $certEditItem = $(event.currentTarget);
        $certItem = $certEditItem.parents('.item');
        certUID = $certItem.attr('data-id');
        certModel = Design.instance().component(certUID);
        if (certModel) {
          certName = certModel.get('name');
          modal(MC.template.modalDeleteELBCert({
            cert_name: certName
          }, true));
          $("#modal-confirm-elb-cert-delete").one('click', function() {
            that.model.removeCert(certUID);
            ide_event.trigger(ide_event.REFRESH_PROPERTY);
            return modal.close();
          });
        }
        return false;
      },
      changeSSLCert: function(event) {
        var $certItem, certUID, that;
        that = this;
        $certItem = $(event.currentTarget);
        certUID = $certItem.attr('data-id');
        that.model.changeCert(certUID);
        return ide_event.trigger(ide_event.REFRESH_PROPERTY);
      },
      popSSLCertModal: function(isEdit, certUID) {
        var $certChain, $certName, $certPrikey, $certPubkey, certModel, currentCertName, otherCertNameAry, that;
        that = this;
        modal(MC.template.modalSSLCertSetting({}, true));
        $certName = $('#elb-ssl-cert-name-input');
        $certPrikey = $('#elb-ssl-cert-privatekey-input');
        $certPubkey = $('#elb-ssl-cert-publickey-input');
        $certChain = $('#elb-ssl-cert-chain-input');
        currentCertName = '';
        if (isEdit && certUID) {
          certModel = Design.instance().component(certUID);
          if (certModel) {
            currentCertName = certModel.get('name');
            $certName.val(currentCertName);
            $certPrikey.val(certModel.get('key'));
            $certPubkey.val(certModel.get('body'));
            $certChain.val(certModel.get('chain'));
          }
        }
        otherCertNameAry = that.model.getOtherCertName(currentCertName);
        return $("#elb-ssl-cert-confirm").off('click').on('click', function() {
          var certObj, isCorrect, valid1, valid2, valid3;
          isCorrect = false;
          $certName.parsley('custom', function(val) {
            if (__indexOf.call(otherCertNameAry, val) >= 0) {
              return lang.ide.PARSLEY_THIS_NAME_IS_ALREADY_IN_USING;
            }
            return null;
          });
          valid1 = $certName.parsley('validate');
          valid2 = $certPrikey.parsley('validate');
          valid3 = $certPubkey.parsley('validate');
          if (valid1 && valid2 && valid3) {
            isCorrect = true;
          }
          if (isCorrect) {
            certObj = {
              name: $certName.val(),
              key: $certPrikey.val(),
              body: $certPubkey.val(),
              chain: $certChain.val()
            };
            if (isEdit && certUID) {
              that.model.updateCert(certUID, certObj);
            } else {
              that.model.addCert(certObj);
            }
            ide_event.trigger(ide_event.REFRESH_PROPERTY);
            modal.close();
          }
          return null;
        });
      },
      elbConnectionDrainSelectChange: function(event) {
        var $inputGroup, $selectbox, $timeoutInput, selectValue, that, timeoutValue;
        that = this;
        $selectbox = that.$('#elb-connection-draining-select');
        $inputGroup = that.$('.elb-connection-draining-input-group');
        $timeoutInput = that.$('#elb-connection-draining-input');
        selectValue = $selectbox.prop('checked');
        if (selectValue) {
          $inputGroup.removeClass('hide');
        } else {
          $inputGroup.addClass('hide');
        }
        timeoutValue = Number($timeoutInput.val());
        if (selectValue && timeoutValue) {
          that.model.setConnectionDraining(true, timeoutValue);
        }
        if (!selectValue) {
          return that.model.setConnectionDraining(false);
        }
      },
      elbConnectionDrainTimeoutChange: function(event) {
        var $selectbox, $timeoutInput, selectValue, that, timeoutValue;
        that = this;
        $timeoutInput = that.$('#elb-connection-draining-input');
        $selectbox = that.$('#elb-connection-draining-select');
        selectValue = $selectbox.prop('checked');
        timeoutValue = Number($timeoutInput.val());
        $timeoutInput.parsley('custom', function(val) {
          var inputValue;
          inputValue = Number($timeoutInput.val());
          if (!(inputValue >= 1 && inputValue < 3600)) {
            return lang.ide.PROP_ELB_CONNECTION_DRAIN_TIMEOUT_INVALID;
          }
          return null;
        });
        if (!$timeoutInput.parsley('validate')) {
          return;
        }
        if (selectValue && timeoutValue) {
          return that.model.setConnectionDraining(true, timeoutValue);
        }
      },
      elbAdvancedProxyProtocolSelectChange: function(event) {
        var $selectbox, $tipBox, selectValue, that;
        that = this;
        $selectbox = that.$('#elb-advanced-proxy-protocol-select');
        $tipBox = $('#elb-advanced-proxy-protocol-select-tip');
        selectValue = $selectbox.prop('checked');
        if (selectValue) {
          $tipBox.removeClass('hide');
        } else {
          $tipBox.addClass('hide');
        }
        return that.model.setAdvancedProxyProtocol(selectValue, [80]);
      }
    });
    return new ElbView();
  });

}).call(this);

(function() {
  define('module/design/property/elb/app_model',['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var ElbAppModel;
    ElbAppModel = PropertyModel.extend({
      defaults: {
        'id': null
      },
      init: function(uid) {
        var appData, elb, elbDistrMap, instanceStateObj, myElbComponent, port, splitIndex, target;
        this.set('id', uid);
        this.set('uid', uid);
        myElbComponent = Design.instance().component(uid);
        appData = MC.data.resource_list[Design.instance().region()];
        elb = appData[myElbComponent.get('appId')];
        if (elb.ConnectionDraining) {
          if (elb.ConnectionDraining.Enabled) {
            elb.ConnectionDrainingInfo = "Enabled; Timeout: " + elb.ConnectionDraining.Timeout + " seconds";
          } else {
            elb.ConnectionDrainingInfo = 'Disabled';
          }
        } else {
          elb.ConnectionDrainingInfo = 'Disabled';
        }
        if (!elb) {
          return false;
        }
        elb = $.extend(true, {}, elb);
        elb.name = myElbComponent.get('name');
        elb.isInternet = elb.Scheme === 'internet-facing';
        target = elb.HealthCheck.Target;
        splitIndex = target.indexOf(":");
        elb.HealthCheck.protocol = target.substring(0, splitIndex);
        target = target.substring(splitIndex + 1);
        port = parseInt(target, 10);
        if (isNaN(port)) {
          port = 80;
        }
        elb.HealthCheck.port = port;
        elb.HealthCheck.path = target.replace(/[^\/]+\//, "/");
        elb.CrossZone = myElbComponent.get('crossZone') ? "Enabled" : "Disabled";
        elb.listenerDisplay = [];
        if (elb.ListenerDescriptions.member) {
          $.each(elb.ListenerDescriptions.member, function(i, listener) {
            elb.listenerDisplay.push(listener);
            if (listener.Listener.SSLCertificateId) {
              elb.server_certificate = listener.Listener.SSLCertificateId.split('/')[1];
              return null;
            }
          });
        }
        elb.isClassic = false;
        elb.defaultVPC = false;
        elb.distribution = [];
        elbDistrMap = {};
        instanceStateObj = elb.InstanceState;
        _.each(instanceStateObj, function(stateObj) {
          var err, instanceComp, instanceCompObj, instanceId, instanceName, instanceState, instanceStateCode, instanceStateDescription, instanceUID, regionComp, regionName, showStateObj;
          try {
            instanceId = stateObj.InstanceId;
            instanceStateCode = stateObj.ReasonCode;
            instanceState = stateObj.State;
            instanceStateDescription = stateObj.Description;
            instanceCompObj = Design.modelClassForType(constant.RESTYPE.INSTANCE).getEffectiveId(instanceId);
            instanceUID = instanceCompObj.uid;
            instanceComp = Design.instance().component(instanceUID);
            regionName = '';
            if (instanceComp) {
              instanceName = instanceComp.get('name');
              if (instanceName === instanceId) {
                instanceName = null;
              }
              showStateObj = {
                instance_name: instanceName,
                instance_id: instanceId,
                instance_state: instanceState === 'InService',
                instance_state_desc: instanceStateDescription
              };
              regionComp = null;
              if (instanceComp.parent() && instanceComp.parent().parent()) {
                regionComp = instanceComp.parent().parent();
                if (instanceComp.type === constant.RESTYPE.LC) {
                  regionComp = instanceComp.parent().parent().parent();
                }
              }
              if (regionComp) {
                regionName = regionComp.get('name');
              }
            }
            elbDistrMap[regionName] = elbDistrMap[regionName] || [];
            return elbDistrMap[regionName].push(showStateObj);
          } catch (_error) {
            err = _error;
            return console.log('Error: ELB Instance State Parse Failed');
          }
        });
        _.each(elbDistrMap, function(instanceAry, azName) {
          var isHealth;
          isHealth = true;
          _.each(instanceAry, function(instanceObj) {
            if (!instanceObj.instance_state) {
              isHealth = false;
            }
            return null;
          });
          return elb.distribution.push({
            zone: azName,
            instance: instanceAry,
            health: isHealth
          });
        });
        elb.distribution = elb.distribution.sort(function(azObj1, azObj2) {
          return azObj1.zone > azObj2.zone;
        });
        this.set(elb);
        return this.set("componentUid", myElbComponent.id);
      }
    });
    return new ElbAppModel();
  });

}).call(this);

define('module/design/property/elb/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "Internet Facing";
  }

function program3(depth0,data) {
  
  
  return "Internal";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"clearfix\">\n        <div class=\"app-panel-li-col2-1\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_ELB_PROTOCOL", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.Protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n\n        <div class=\"app-panel-li-col2-2\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PORT", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.LoadBalancerPort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n\n        <div class=\"app-panel-li-col2-1\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_INSTANCE_PROTOCOL", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.InstanceProtocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n\n        <div class=\"app-panel-li-col2-2\">\n          <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PORT", {hash:{},data:data}))
    + "</label>\n          <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.Listener)),stack1 == null || stack1 === false ? stack1 : stack1.InstancePort)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </div>\n      </li>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"clearfix\">\n        <p class=\"app-panel-li-main\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SERVER_CERTIFICATE", {hash:{},data:data}))
    + "</p>\n        <p class=\"app-panel-li-sub\">"
    + escapeExpression(((stack1 = (depth0 && depth0.server_certificate)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</p>\n      </li>\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li>\n        <div class=\"list-row\">\n            <i class=\"status status-";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.health), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " icon-label\"></i>\n            <span class=\"app-panel-li-main\">"
    + escapeExpression(((stack1 = (depth0 && depth0.zone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        </div>\n        <div class=\"list-row\">\n          <ul class=\"elb-property-instance-list\">\n            ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </ul>\n        </div>\n      </li>\n    ";
  return buffer;
  }
function program10(depth0,data) {
  
  
  return "green";
  }

function program12(depth0,data) {
  
  
  return "red";
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n              <li>\n                <div class=\"instance-info\">\n                  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.instance_name), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  <div class=\"instance-id ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.instance_name), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">("
    + escapeExpression(((stack1 = (depth0 && depth0.instance_id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>\n                </div>\n                <div class=\"instance-state\">\n                  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.instance_state), {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.instance_state), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n                </div>\n              </li>\n            ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"instance-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.instance_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>";
  return buffer;
  }

function program17(depth0,data) {
  
  
  return "instance-id-down";
  }

function program19(depth0,data) {
  
  
  return "InService";
  }

function program21(depth0,data) {
  
  
  return "OutOfService";
  }

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<a class=\"elb-info-icon tooltip icon-info\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.instance_state_desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></a>";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span> </div>\n  <div class=\"option-group sg-group\">Loading...</div>\n  ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_DETAILS", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_SCHEME", {hash:{},data:data}))
    + "</dt>\n        <dd>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isInternet), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_DNS_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>\n          <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A)"
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(AAAA)ipv6."
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_TIP_CLICK_TO_SELECT_ALL", {hash:{},data:data}))
    + "\">(A/AAAA)dualstack."
    + escapeExpression(((stack1 = (depth0 && depth0.DNSName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        </dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HOST_ZONE_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.CanonicalHostedZoneNameID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_CROSS_ZONE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.CrossZone)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_CONNECTION_DRAIN", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ConnectionDrainingInfo)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n      </dl>\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_LISTENER_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <ul class=\"property-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.listenerDisplay), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.server_certificate), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_DETAILS", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PING_PROTOCOL", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PING_PORT", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_PING_PATH", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.path)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_INTERVAL", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.Interval)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_RESPOND_TIMEOUT", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.Timeout)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_CHECK_INTERVAL_SECONDS", {hash:{},data:data}))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_UNHEALTH_THRESHOLD", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.UnhealthyThreshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_HEALTH_THRESHOLD", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.HealthCheck)),stack1 == null || stack1 === false ? stack1 : stack1.HealthyThreshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      </dl>\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ELB_INSTANCES", {hash:{},data:data}))
    + "</div>\n  <ul class=\"option-group property-list\">\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.distribution), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </ul>\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isclassic), {hash:{},inverse:self.noop,fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/elb/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var ElbAppView;
    ElbAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new ElbAppView();
  });

}).call(this);

(function() {
  define('module/design/property/elb/main',['../base/main', './model', './view', './app_model', './app_view', "../sglist/main", 'constant', 'event'], function(PropertyModule, model, view, app_model, app_view, sglist_main, constant, ide_event) {
    var ElbModule;
    ElbModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.ELB,
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(model);
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/az/model',['module/design/property/base/model', "Design", 'constant'], function(PropertyModel, Design, constant) {
    var AZModel;
    AZModel = PropertyModel.extend({
      reInit: function() {
        this.init(this.get("uid"));
        return null;
      },
      init: function(id) {
        var az_list, az_name, component, data;
        az_list = MC.data.config[Design.instance().region()];
        component = Design.instance().component(id);
        if (!component || !az_list) {
          return false;
        }
        az_name = component.get("name");
        data = {
          uid: id,
          name: az_name
        };
        if (az_list && az_list.zone) {
          data.az_list = this.possibleAZList(az_list.zone.item, az_name);
        } else {
          data.az_list = [
            {
              name: az_name,
              selected: true
            }
          ];
        }
        this.set(data);
        return null;
      },
      possibleAZList: function(datalist, selectedItemName) {
        var AZClass, az, possible_list, used_list, _i, _len;
        if (!datalist) {
          return;
        }
        used_list = {};
        AZClass = Design.modelClassForType(constant.RESTYPE.AZ);
        _.each(AZClass.allObjects(), function(element) {
          used_list[element.get("name")] = true;
          return null;
        });
        possible_list = [];
        for (_i = 0, _len = datalist.length; _i < _len; _i++) {
          az = datalist[_i];
          if (az.zoneName === selectedItemName || !used_list[az.zoneName]) {
            possible_list.push({
              name: az.zoneName,
              selected: az.zoneName === selectedItemName
            });
          }
        }
        return possible_list;
      }
    });
    return new AZModel();
  });

}).call(this);

define('module/design/property/az/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n      ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " selected";
  }

  buffer += "<section class=\"property-control-group\">\n  <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_AZ_LBL_SWITCH", {hash:{},data:data}))
    + "</label>\n  <div class=\"selectbox selectbox-mega\" id=\"az-quick-select\">\n    <div class=\"selection\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.component)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <ul class=\"dropdown\" tabindex=\"-1\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.az_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ul>\n  </div>\n</section>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/az/view',['../base/view', './template/stack'], function(PropertyView, template) {
    var AZView;
    AZView = PropertyView.extend({
      events: {
        'OPTION_CHANGE #az-quick-select': "azSelect"
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        return "Availability Zone";
      },
      azSelect: function(event, newAZName) {
        return this.trigger("SELECT_AZ", newAZName);
      }
    });
    return new AZView();
  });

}).call(this);

(function() {
  define('module/design/property/az/main',['../base/main', './model', './view', 'constant', 'event'], function(PropertyModule, model, view, constant, ide_event) {
    var AZModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.RELOAD_AZ] = function(new_az_data) {
      var me;
      if (!new_az_data) {
        return;
      }
      me = this;
      setTimeout(function() {
        me.model.reInit();
        return me.view.render();
      }, 0);
      return null;
    };
    AZModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: "Stack:" + constant.RESTYPE.AZ,
      setupStack: function() {
        var me;
        me = this;
        this.view.on("SELECT_AZ", function(newZone) {
          var filter, name, oldZone, res_type;
          oldZone = me.model.get("name");
          me.model.setName(newZone);
          res_type = constant.RESTYPE.AZ;
          filter = function(data) {
            return data.option.name === name;
          };
          name = oldZone;
          ide_event.trigger(ide_event.ENABLE_RESOURCE_ITEM, res_type, filter);
          name = newZone;
          return ide_event.trigger(ide_event.DISABLE_RESOURCE_ITEM, res_type, filter);
        });
        return null;
      },
      initStack: function() {
        if (Design.instance().modeIsAppEdit()) {
          throw new Error("Cannot open az property panel in AppEdit mode.");
        }
        this.model = model;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/subnet/model',['../base/model', 'constant', "Design"], function(PropertyModel, constant, Design) {
    var SubnetModel;
    SubnetModel = PropertyModel.extend({
      defaults: {
        'isAppEdit': false
      },
      init: function(uid) {
        var ACLModel, appData, defaultACL, defaultRT, linkedRT, networkACLs, routeTable, subnet, subnet_acl, subnet_component;
        subnet_component = Design.instance().component(uid);
        if (!subnet_component) {
          return false;
        }
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        subnet_acl = subnet_component.connectionTargets("AclAsso")[0];
        defaultACL = null;
        networkACLs = [];
        _.each(ACLModel.allObjects(), function(acl) {
          var aclObj;
          aclObj = {
            uid: acl.id,
            name: acl.get("name"),
            isUsed: acl === subnet_acl,
            rule: acl.getRuleCount(),
            association: acl.getAssoCount()
          };
          if (acl.isDefault()) {
            defaultACL = aclObj;
            aclObj.isDefault = true;
          } else {
            networkACLs.splice(_.sortedIndex(networkACLs, aclObj, "name"), 0, aclObj);
          }
          return null;
        });
        if (defaultACL) {
          networkACLs.splice(0, 0, defaultACL);
        }
        this.set({
          uid: uid,
          name: subnet_component.get("name"),
          networkACL: networkACLs,
          isAppEdit: this.isAppEdit
        });
        if (this.isAppEdit) {
          appData = MC.data.resource_list[Design.instance().region()];
          subnet = appData[subnet_component.get('appId')];
          subnet = $.extend(true, {}, subnet);
          routeTable = subnet_component.connectionTargets('RTB_Asso')[0];
          linkedRT = routeTable.get('appId');
          if (routeTable.get('main')) {
            defaultRT = routeTable.get('appId');
          }
          subnet.routeTable = linkedRT ? linkedRT : defaultRT;
          this.set(subnet);
        }
        this.getCidr();
        return null;
      },
      getCidr: function() {
        var cidrDivAry, subnet, subnetCidr;
        subnet = Design.instance().component(this.get("uid"));
        subnetCidr = subnet.get("cidr");
        cidrDivAry = this.genCIDRDivAry(subnet.parent().parent().get("cidr"), subnetCidr);
        this.set("CIDRPrefix", cidrDivAry[0]);
        this.set("CIDR", subnetCidr ? cidrDivAry[1] : "");
        return null;
      },
      genCIDRDivAry: function(vpcCIDR, subnetCIDR) {
        var resultPrefix, resultSuffix, subnetAddrAry, subnetIPAry, subnetSuffix, vpcSuffix;
        if (!subnetCIDR) {
          subnetCIDR = vpcCIDR;
        }
        vpcSuffix = Number(vpcCIDR.split('/')[1]);
        subnetIPAry = subnetCIDR.split('/');
        subnetSuffix = Number(subnetIPAry[1]);
        subnetAddrAry = subnetIPAry[0].split('.');
        if (vpcSuffix > 23) {
          resultPrefix = subnetAddrAry[0] + '.' + subnetAddrAry[1] + '.' + subnetAddrAry[2] + '.';
          resultSuffix = subnetAddrAry[3] + '/' + subnetSuffix;
        } else {
          resultPrefix = subnetAddrAry[0] + '.' + subnetAddrAry[1] + '.';
          resultSuffix = subnetAddrAry[2] + '.' + subnetAddrAry[3] + '/' + subnetSuffix;
        }
        return [resultPrefix, resultSuffix];
      },
      createAcl: function() {
        var ACLModel, acl;
        ACLModel = Design.modelClassForType(constant.RESTYPE.ACL);
        acl = new ACLModel();
        this.setACL(acl.id);
        return acl.id;
      },
      removeAcl: function(acl_uid) {
        Design.instance().component(acl_uid).remove();
        return null;
      },
      setCidr: function(cidr) {
        return Design.instance().component(this.get("uid")).setCidr(cidr);
      },
      setACL: function(acl_uid) {
        Design.instance().component(this.get("uid")).setAcl(acl_uid);
        return null;
      },
      isValidCidr: function(cidr) {
        return Design.instance().component(this.get("uid")).isValidCidr(cidr);
      }
    });
    return new SubnetModel();
  });

}).call(this);

define('module/design/property/subnet/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_AVAILABLE_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.availableIpAddressCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_RT_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.routeTable)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n  </div>\n\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group\">\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-subnet-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" lastValue=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-subnet-name\" maxlength=\"255\" data-required-rollback=\"true\" data-ignore=\"true\"/>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-cidr-block\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_DETAIL_LBL_CIDR_BLOCK", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <div class=\"subnet-cidr-wrapper\">\n        <span class=\"cidr-prefix\" id=\"property-cidr-prefix\">"
    + escapeExpression(((stack1 = (depth0 && depth0.CIDRPrefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <input data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" class=\"input cidr-rest tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.CIDR)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" lastValue=\""
    + escapeExpression(((stack1 = (depth0 && depth0.CIDR)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cidr-block\" data-empty-remove=\"true\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_TIP_CIDR_BLOCK", {hash:{},data:data}))
    + "\"/>\n      </div>\n    </section>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article data-bind=\"true\">\n  <div class=\"option-group-head expand\" id=\"subnet-property-detail\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_TIT_ASSOC_ACL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <ul id=\"networkacl-list\" class=\"acl-sg-info-list acl-info-list property-list stack-property-acl-list\"></ul>\n    <a href=\"#\" class=\"add-to-list action-link\" id=\"networkacl-create\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_BTN_CREATE_NEW_ACL", {hash:{},data:data}))
    + "</a>\n  </div>\n</article>\n\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/subnet/template/acl',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"clearfix\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <div class=\"col1\"> <div class=\"radio\">\n    <input id=\"ppty-acl-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"ppty-acl-cb\" type=\"radio\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isUsed), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n    <label for=\"ppty-acl-"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n  </div> </div>\n  <div class=\"col3 tooltip icon-btn-details\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_TIP_DETAIL", {hash:{},data:data}))
    + "'></div>\n  <div class=\"col2\">\n    <div class=\"col2-1 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.rule)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = (depth0 && depth0.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_LBL_ASSOC", {hash:{},data:data}));
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n  </div>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " | <a class=\"sg-list-delete-btn\" data-name=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-count=\""
    + escapeExpression(((stack1 = (depth0 && depth0.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_BTN_DELETE", {hash:{},data:data}))
    + "</a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.networkACL), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/subnet/view',['../base/view', './template/stack', './template/acl', 'event', "Design"], function(PropertyView, template, acl_template, ide_event, Design) {
    var SubnetView;
    SubnetView = PropertyView.extend({
      events: {
        "change #property-subnet-name": 'onChangeName',
        "focus #property-cidr-block": 'onFocusCIDR',
        "keypress #property-cidr-block": 'onPressCIDR',
        "blur #property-cidr-block": 'onBlurCIDR',
        'click #networkacl-create': 'createAcl',
        'click .icon-btn-details': 'openAcl',
        "click .ppty-acl-cb": 'changeAcl',
        'click .sg-list-delete-btn': 'deleteAcl'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.refreshACLList();
        return this.model.attributes.name;
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "Subnet")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      onPressCIDR: function(event) {
        if (event.keyCode === 13) {
          $('#property-cidr-block').blur();
        }
        return null;
      },
      onFocusCIDR: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurCIDR: function(event) {
        var cidrPrefix, cidrSuffix, descContent, error, mainContent, removeInfo, subnetCIDR, that;
        cidrPrefix = $("#property-cidr-prefix").html();
        cidrSuffix = $("#property-cidr-block").val();
        subnetCIDR = cidrPrefix + cidrSuffix;
        removeInfo = 'Remove Subnet';
        if (!cidrSuffix) {
          mainContent = "CIDR block is required.";
          descContent = "Please provide a subset of IP ranges of this VPC.";
        } else if (!MC.validate('cidr', subnetCIDR)) {
          mainContent = "" + subnetCIDR + " is not a valid form of CIDR block.";
          descContent = "Please provide a valid IP range. For example, 10.0.0.1/24.";
        } else {
          error = this.model.isValidCidr(subnetCIDR);
          if (error !== true) {
            mainContent = error.error;
            descContent = error.detail;
            if (error.shouldRemove === false) {
              removeInfo = "";
            }
          }
        }
        if (mainContent) {
          that = this;
          modal(MC.template.setupCIDRConfirm({
            main_content: mainContent,
            desc_content: descContent,
            remove_content: removeInfo
          }), false, null, {
            $source: $(event.target)
          });
          $('.modal-close').click(function() {
            return $('#property-cidr-block').focus();
          });
          return $('#cidr-remove').click(function() {
            $canvas.clearSelected();
            Design.instance().component(that.model.get("uid")).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        } else {
          this.model.setCidr(subnetCIDR);
          return this.disabledAllOperabilityArea(false);
        }
      },
      createAcl: function() {
        return this.trigger("OPEN_ACL", this.model.createAcl());
      },
      openAcl: function(event) {
        var id;
        id = $(event.currentTarget).closest("li").attr("data-uid");
        this.trigger("OPEN_ACL", id);
        return null;
      },
      deleteAcl: function(event) {
        var $target, aclName, aclUID, assoCont, dialog_template, that;
        $target = $(event.currentTarget);
        assoCont = parseInt($target.attr('data-count'), 10);
        aclUID = $target.closest("li").attr('data-uid');
        if (assoCont) {
          that = this;
          aclName = $target.attr('data-name');
          dialog_template = MC.template.modalDeleteSGOrACL({
            title: 'Delete Network ACL',
            main_content: "Are you sure you want to delete " + aclName + "?",
            desc_content: "Subnets associated with " + aclName + " will use DefaultACL."
          });
          return modal(dialog_template, false, function() {
            return $('#modal-confirm-delete').click(function() {
              that.model.removeAcl(aclUID);
              that.refreshACLList();
              return modal.close();
            });
          });
        } else {
          this.model.removeAcl(aclUID);
          return this.refreshACLList();
        }
      },
      changeAcl: function(event) {
        this.model.setACL($(event.currentTarget).closest("li").attr("data-uid"));
        return this.refreshACLList();
      },
      refreshACLList: function() {
        this.model.init(this.model.get('uid'));
        return $('#networkacl-list').html(acl_template(this.model.attributes));
      }
    });
    return new SubnetView();
  });

}).call(this);

(function() {
  define('module/design/property/subnet/app_model',['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var SubnetAppModel;
    SubnetAppModel = PropertyModel.extend({
      init: function(uid) {
        var appData, defaultRT, linkedRT, mySubnetComponent, routeTable, subnet;
        mySubnetComponent = Design.instance().component(uid);
        appData = MC.data.resource_list[Design.instance().region()];
        subnet = appData[mySubnetComponent.get('appId')];
        if (!subnet) {
          return false;
        }
        subnet = $.extend(true, {}, subnet);
        subnet.name = mySubnetComponent.get('name');
        subnet.acl = this.getACL(uid);
        subnet.uid = uid;
        routeTable = mySubnetComponent.connectionTargets('RTB_Asso')[0];
        linkedRT = routeTable.get('appId');
        if (routeTable.get('main')) {
          defaultRT = routeTable.get('appId');
        }
        subnet.routeTable = linkedRT ? linkedRT : defaultRT;
        this.set(subnet);
        return null;
      },
      getACL: function(uid) {
        var acl;
        acl = Design.instance().component(uid).connectionTargets('AclAsso')[0];
        if (!acl) {
          return null;
        }
        return {
          id: acl.id,
          name: acl.get("name"),
          rule: acl.getRuleCount(),
          association: acl.getAssoCount()
        };
      }
    });
    return new SubnetAppModel();
  });

}).call(this);

define('module/design/property/subnet/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_TIT_ASSOC_ACL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <ul class=\"acl-sg-info-list property-list acl-info-list\">\n      <li>\n        <div class=\"col3 tooltip icon-btn-details\" data-uid=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_TIP_DETAIL", {hash:{},data:data}))
    + "'></div>\n        <div class=\"col2\">\n          <div class=\"col2-1 truncate\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n          <div class=\"col2-2 truncate\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.rule)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_LBL_RULE", {hash:{},data:data}))
    + ", "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.acl)),stack1 == null || stack1 === false ? stack1 : stack1.association)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_ACL_LBL_ASSOC", {hash:{},data:data}))
    + "</div>\n        </div>\n      </li>\n    </ul>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_AVAILABLE_IP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.availableIpAddressCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_SUBNET_APP_RT_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.routeTable)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.acl), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/subnet/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var SubnetAppView;
    SubnetAppView = PropertyView.extend({
      events: {
        "click .acl-sg-info-list .icon-btn-details": 'showACLDetail'
      },
      render: function() {
        this.$el.html(template(this.model.toJSON()));
        this.setTitle(this.model.get('name'));
        return null;
      },
      showACLDetail: function(event) {
        this.trigger('OPEN_ACL', $(event.currentTarget).data('uid'));
        return null;
      }
    });
    return new SubnetAppView();
  });

}).call(this);

(function() {
  define('module/design/property/subnet/main',['../base/main', './model', './view', './app_model', './app_view', 'constant'], function(PropertyModule, model, view, app_model, app_view, constant) {
    var SubnetModule;
    app_view.on('OPEN_ACL', function(acl_uid) {
      return PropertyModule.loadSubPanel("ACL", acl_uid);
    });
    view.on('OPEN_ACL', function(acl_uid) {
      PropertyModule.loadSubPanel("ACL", acl_uid);
      return null;
    });
    SubnetModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.SUBNET,
      onUnloadSubPanel: function(id) {
        if (id === "ACL" && this.view.refreshACLList) {
          return this.view.refreshACLList();
        }
      },
      initStack: function() {
        this.view = view;
        this.model = model;
        this.model.isAppEdit = false;
        return null;
      },
      initApp: function() {
        this.view = app_view;
        this.model = app_model;
        return null;
      },
      initAppEdit: function() {
        this.view = view;
        this.model = model;
        this.model.isAppEdit = true;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/vpc/model',['../base/model', 'Design', 'constant'], function(PropertyModel, Design, constant) {
    var VPCModel;
    VPCModel = PropertyModel.extend({
      defaults: {
        'isAppEdit': false
      },
      init: function(uid) {
        var AclModel, RtbModel, TYPE_ACL, TYPE_RTB, appData, component, data, dhcp, dhcp_comp, myVPCComponent, vpc;
        component = Design.instance().component(uid);
        dhcp_comp = component.get("dhcp");
        dhcp = $.extend({}, dhcp_comp.attributes);
        dhcp.none = dhcp_comp.isNone();
        dhcp["default"] = dhcp_comp.isDefault();
        dhcp.hasDhcp = (!dhcp.none) && (!dhcp["default"]);
        data = {
          uid: uid,
          dnsSupport: component.get("dnsSupport"),
          dnsHosts: component.get("dnsHostnames"),
          defaultTenancy: component.isDefaultTenancy(),
          name: component.get("name"),
          cidr: component.get("cidr"),
          dhcp: dhcp,
          isAppEdit: this.isAppEdit
        };
        if (this.isAppEdit) {
          myVPCComponent = Design.instance().component(uid);
          appData = MC.data.resource_list[Design.instance().region()];
          vpc = appData[myVPCComponent.get('appId')];
          vpc = $.extend(true, {}, vpc);
          TYPE_RTB = constant.RESTYPE.RT;
          TYPE_ACL = constant.RESTYPE.ACL;
          RtbModel = Design.modelClassForType(TYPE_RTB);
          AclModel = Design.modelClassForType(TYPE_ACL);
          vpc.mainRTB = RtbModel.getMainRouteTable();
          if (vpc.mainRTB) {
            vpc.mainRTB = vpc.mainRTB.get("appId");
            vpc.defaultACL = AclModel.getDefaultAcl();
          }
          if (vpc.defaultACL) {
            vpc.defaultACL = vpc.defaultACL.get("appId");
          }
          this.set(vpc);
        }
        this.set(data);
        return null;
      },
      setCidr: function(newCIDR) {
        if (Design.instance().component(this.get("uid")).setCidr(newCIDR)) {
          this.attributes.cidr = newCIDR;
          return true;
        }
        return false;
      },
      setTenancy: function(tenancy) {
        Design.instance().component(this.get("uid")).setTenancy(tenancy);
        return null;
      },
      setDnsSupport: function(enable) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).set("dnsSupport", enable);
        return null;
      },
      setDnsHosts: function(enable) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).set("dnsHostnames", enable);
        return null;
      },
      setAmazonDns: function(enable) {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).get("dhcp").set("amazonDNS", enable);
        return null;
      },
      removeDhcp: function(isDefault) {
        var dhcp, uid;
        uid = this.get("uid");
        dhcp = Design.instance().component(uid).get("dhcp");
        if (isDefault) {
          dhcp.setDefault();
        } else {
          dhcp.setNone();
        }
        return null;
      },
      useDhcp: function() {
        var uid;
        uid = this.get("uid");
        Design.instance().component(uid).get("dhcp").setCustom();
        return null;
      },
      setDHCPOptions: function(options) {
        var dhcp, uid;
        uid = this.get("uid");
        dhcp = Design.instance().component(uid).get("dhcp");
        dhcp.set(options);
        return null;
      }
    });
    return new VPCModel();
  });

}).call(this);

define('module/design/property/vpc/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_TENANCY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceTenancy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.mainRTB)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_DEFAULT_ACL", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.defaultACL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-resolution\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsSupport), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-resolution\">\n        <label for=\"property-dns-resolution\"></label>\n      </div>\n      <label for=\"property-dns-resolution\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_ENABLE_DNS_RESOLUTION", {hash:{},data:data}))
    + "</label>\n    </section>\n\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-hostname\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsHosts), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-hostname\">\n        <label for=\"property-dns-hostname\"></label>\n      </div>\n      <label for=\"property-dns-hostname\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_ENABLE_DNS_HOSTNAME_SUPPORT", {hash:{},data:data}))
    + "</label>\n    </section>\n  </div>\n\n\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return " checked=\"checked\"";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group\" data-bind=\"true\">\n    <section class=\"property-control-group clearfix\">\n      <label class=\"left\" for=\"property-vpc-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input vpc-name\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-vpc-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n    </section>\n\n    <section class=\"property-control-group clearfix\">\n      <label class=\"left\" for=\"property-cidr-block\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_CIDR_BLOCK", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n      <input class=\"input cidr-block tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cidr-block\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_EG_10_0_0_0_16", {hash:{},data:data}))
    + "\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\" data-trigger=\"change\" data-type=\"awsCidr\"/>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_TENANCY", {hash:{},data:data}))
    + "</label>\n      <div class=\"selectbox selectbox-mega\" id=\"property-tenancy\">\n        <div class=\"selection\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultTenancy), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n          <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.defaultTenancy), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"default\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_TENANCY_LBL_DEFAULT", {hash:{},data:data}))
    + "</li>\n          <li class=\"item";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.defaultTenancy), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\"dedicated\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_TENANCY_LBL_DEDICATED", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </div>\n      <div id=\"desc-dedicated\" class=\"property-info\">Selecting 'Dedicated' forces all instances launched into this VPC to run on single-tenant hardware. <a target=\"_blank\" href=\"http://aws.amazon.com/dedicated-instances/\">Additional charges will apply.</a></div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-resolution\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsSupport), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-resolution\">\n        <label for=\"property-dns-resolution\"></label>\n      </div>\n      <label for=\"property-dns-resolution\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_ENABLE_DNS_RESOLUTION", {hash:{},data:data}))
    + "</label>\n    </section>\n\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-dns-hostname\" type=\"checkbox\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dnsHosts), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"dns-hostname\">\n        <label for=\"property-dns-hostname\"></label>\n      </div>\n      <label for=\"property-dns-hostname\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_ENABLE_DNS_HOSTNAME_SUPPORT", {hash:{},data:data}))
    + "</label>\n    </section>\n  </div>\n\n  ";
  return buffer;
  }
function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP_VPC_DETAIL_TENANCY_LBL_DEFAULT", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program7(depth0,data) {
  
  
  return "Dedicated";
  }

function program9(depth0,data) {
  
  
  return " selected";
  }

function program11(depth0,data) {
  
  
  return "checked=\"checked\"  ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1['default']), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  return buffer;
  }
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <section class=\"property-control-group\">\n        <div class=\"radio property-dhcp\">\n          <input id=\"property-dhcp-default\" type=\"radio\" name=\"dhcp-opts\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1['default']), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"none\" />\n          <label for=\"property-dhcp-default\"></label>\n        </div>\n        <label for=\"property-dhcp-default\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_LBL_DEFAULT", {hash:{},data:data}))
    + "</label>\n      </section>\n      ";
  return buffer;
  }
function program15(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <section class=\"property-control-group\">\n        <div class=\"radio property-dhcp\">\n          <input id=\"property-dhcp-default\" type=\"radio\" name=\"dhcp-opts\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1['default']), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"none\" />\n          <label for=\"property-dhcp-default\"></label>\n        </div>\n        <label for=\"property-dhcp-default\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_LBL_DEFAULT", {hash:{},data:data}))
    + "</label>\n      </section>\n    ";
  return buffer;
  }

function program19(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program21(depth0,data) {
  
  
  return "hide";
  }

function program23(depth0,data) {
  
  
  return "3";
  }

function program25(depth0,data) {
  
  
  return "4";
  }

function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"multi-ipt-row\">\n            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_UP_TO_4_DNS", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_EG_172_16_16_16", {hash:{},data:data}))
    + "\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n          </div>\n          ";
  return buffer;
  }

function program29(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"multi-ipt-row\">\n            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_UP_TO_4_DNS", {hash:{},data:data}))
    + "\"  placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_EG_172_16_16_16", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n          </div>\n          ";
  return buffer;
  }

function program31(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"multi-ipt-row\">\n            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_UP_TO_4_NTP", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n          </div>\n          ";
  return buffer;
  }

function program33(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"multi-ipt-row\">\n            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_UP_TO_4_NTP", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n          </div>\n          ";
  return buffer;
  }

function program35(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"multi-ipt-row\">\n            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_UP_TO_4_NETBIOS", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n          </div>\n          ";
  return buffer;
  }

function program37(depth0,data) {
  
  var buffer = "";
  buffer += "\n          <div class=\"multi-ipt-row\">\n            <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n            <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_UP_TO_4_NETBIOS", {hash:{},data:data}))
    + "\" type=\"text\" maxlength=\"255\" data-type=\"ipv4\" data-ignore=\"true\"></span>\n          </div>\n          ";
  return buffer;
  }

function program39(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE_NOT_SPECIFIED", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program41(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n            ";
  return buffer;
  }

  buffer += "<article>\n  <div class=\"option-group-head expand\" id=\"vpc-property-detail\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIT_DHCP_OPTION", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\" id=\"dhcp-property-detail\" data-type=\"true\">\n    <section class=\"property-control-group\">\n      <div class=\"radio property-dhcp\">\n        <input id=\"property-dhcp-none\" type=\"radio\" name=\"dhcp-opts\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.none), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"none\" />\n        <label for=\"property-dhcp-none\"></label>\n      </div>\n      <label for=\"property-dhcp-none\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_LBL_NONE", {hash:{},data:data}))
    + "</label>\n    </section>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(17, program17, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <section class=\"property-control-group\">\n      <div class=\"radio property-dhcp\">\n        <input id=\"property-dhcp-spec\" type=\"radio\" name=\"dhcp-opts\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.hasDhcp), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"specified\"/>\n        <label for=\"property-dhcp-spec\"></label>\n      </div>\n      <label for=\"property-dhcp-spec\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_LBL_SPECIFIED", {hash:{},data:data}))
    + "</label>\n\n      <div class=\"property-info ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.hasDhcp), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-dhcp-desc\">Specify Domain Name, DNS Server, NTP server NetBIOS Name Server or NetBIOS Node Type.</div>\n    </section>\n\n    <section id=\"property-dhcp-options\" data-bind=\"true\" class=\"property-control-group-sub ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.hasDhcp), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"property-control-group\">\n        <label class=\"left\" for=\"property-dhcp-domain\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</label>\n        <input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_ENTER_THE_DOMAIN_NAME", {hash:{},data:data}))
    + "\" id=\"property-dhcp-domain\" maxlength=\"255\" data-type=\"domain\" data-ignore=\"true\"/>\n      </div>\n\n      <div class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n        <div>\n          <div class=\"checkbox left\">\n            <input id=\"property-amazon-dns\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.amazonDNS), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "type=\"checkbox\">\n            <label for=\"property-amazon-dns\"></label>\n          </div>\n          <label for=\"property-amazon-dns\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_AMZN_PROVIDED_DNS", {hash:{},data:data}))
    + "</label>\n        </div>\n\n        <div id=\"property-domain-server\" class=\"multi-input\" data-max-row=\"";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.amazonDNS), {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainServers), {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </div>\n\n      <div class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</label>\n        <div id=\"property-ntp-server\" class=\"multi-input\" data-max-row=\"4\">\n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers), {hash:{},inverse:self.program(33, program33, data),fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </div>\n\n      <div class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NETBIOS_NAME_SERVER", {hash:{},data:data}))
    + "</label>\n        <div id=\"property-netbios-server\" class=\"multi-input\" data-max-row=\"4\">\n          ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosServers), {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </div>\n\n      <div class=\"property-control-group\">\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</label>\n        <div class=\"selectbox selectbox-mega\" id=\"property-netbios-type\">\n          <div class=\"selection tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIP_SELECT_NETBIOS_NODE", {hash:{},data:data}))
    + "\">";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosType), {hash:{},inverse:self.noop,fn:self.program(39, program39, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n          <ul class=\"dropdown\" tabindex=\"-1\">\n            ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosTypes), {hash:{},inverse:self.noop,fn:self.program(41, program41, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          </ul>\n        </div>\n      </div>\n\n    </section>\n  </div>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/vpc/view',['../base/view', './template/stack', 'i18n!nls/lang.js'], function(PropertyView, template, lang) {
    var VPCView, mapFilterInput, updateAmazonCB;
    mapFilterInput = function(selector) {
      var $inputs, ipt, result, _i, _len;
      $inputs = $(selector);
      result = [];
      for (_i = 0, _len = $inputs.length; _i < _len; _i++) {
        ipt = $inputs[_i];
        if (ipt.value) {
          result.push(ipt.value);
        }
      }
      return result;
    };
    updateAmazonCB = function() {
      var rowLength;
      rowLength = $("#property-domain-server").children().length;
      if (rowLength > 3) {
        return $('#property-amazon-dns').attr("disabled", true);
      } else {
        return $('#property-amazon-dns').removeAttr("disabled");
      }
    };
    VPCView = PropertyView.extend({
      events: {
        'change #property-vpc-name': 'onChangeName',
        'change #property-cidr-block': 'onChangeCidr',
        'change #property-dns-resolution': 'onChangeDnsSupport',
        'change #property-dns-hostname': 'onChangeDnsHostname',
        'OPTION_CHANGE #property-tenancy': 'onChangeTenancy',
        'click #property-dhcp-none': 'onRemoveDhcp',
        'click #property-dhcp-default': 'onRemoveDhcp',
        'click #property-dhcp-spec': 'onUseDHCP',
        'click #property-amazon-dns': 'onChangeAmazonDns',
        'change .property-control-group-sub .input': 'onChangeDhcpOptions',
        'OPTION_CHANGE #property-netbios-type': 'onChangeDhcpOptions',
        'REMOVE_ROW #property-dhcp-options': 'onChangeDhcpOptions',
        'ADD_ROW .multi-input': 'processParsley'
      },
      render: function() {
        var data, selectedType;
        data = this.model.attributes;
        selectedType = data.dhcp.netbiosType || 0;
        data.dhcp.netbiosTypes = [
          {
            id: "default",
            value: lang.ide.PROP_VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE_NOT_SPECIFIED,
            selected: selectedType === 0
          }, {
            id: 1,
            value: 1,
            selected: selectedType === 1
          }, {
            id: 2,
            value: 2,
            selected: selectedType === 2
          }, {
            id: 4,
            value: 4,
            selected: selectedType === 4
          }, {
            id: 8,
            value: 8,
            selected: selectedType === 8
          }
        ];
        this.$el.html(template(data));
        $('#property-domain-server').on('ADD_ROW REMOVE_ROW', updateAmazonCB);
        updateAmazonCB();
        multiinputbox.update($("#property-domain-server"));
        return data.name;
      },
      processParsley: function(event) {
        return $(event.currentTarget).find('input').last().removeClass('parsley-validated').removeClass('parsley-error').next('.parsley-error-list').remove();
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "Route Table")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      onChangeCidr: function(event) {
        var cidr, target;
        target = $(event.currentTarget);
        cidr = target.val();
        if (target.parsley('validate')) {
          if (!this.model.setCidr(cidr)) {
            target.val(this.model.get("cidr"));
            notification(lang.ide.NOTIFY_MSG_WARN_CANNT_AUTO_ASSIGN_CIDR_FOR_SUBNET);
          }
        }
        return null;
      },
      onChangeTenancy: function(event, newValue) {
        this.model.setTenancy(newValue);
        return null;
      },
      onChangeDnsSupport: function(event) {
        this.model.setDnsSupport(event.target.checked);
        return null;
      },
      onChangeDnsHostname: function(event) {
        this.model.setDnsHosts(event.target.checked);
        return null;
      },
      onRemoveDhcp: function(event) {
        var isDefault;
        isDefault = $(event.currentTarget).closest("section").find("input").attr("id") === "property-dhcp-default";
        $("#property-dhcp-desc").show();
        $("#property-dhcp-options").hide();
        this.model.removeDhcp(isDefault);
        return null;
      },
      onChangeAmazonDns: function(event) {
        var $inputbox, $rows, allowRows, useAmazonDns;
        useAmazonDns = $("#property-amazon-dns").is(":checked");
        allowRows = useAmazonDns ? 3 : 4;
        $inputbox = $("#property-domain-server").attr("data-max-row", allowRows);
        $rows = $inputbox.children();
        $inputbox.toggleClass("max", $rows.length >= allowRows);
        this.model.setAmazonDns(useAmazonDns);
        return null;
      },
      onUseDHCP: function(event) {
        $("#property-dhcp-desc").hide();
        $("#property-dhcp-options").show();
        this.model.useDhcp();
        return null;
      },
      onChangeDhcpOptions: function(event) {
        var data;
        if (event && !$(event.currentTarget).closest('[data-bind=true]').parsley('validate')) {
          return;
        }
        data = {
          domainName: $("#property-dhcp-domain").val(),
          domainServers: mapFilterInput("#property-domain-server .input"),
          ntpServers: mapFilterInput("#property-ntp-server .input"),
          netbiosServers: mapFilterInput("#property-netbios-server .input"),
          netbiosType: parseInt($("#property-netbios-type .selection").html(), 10) || 0
        };
        console.log("DHCP Options Changed", data);
        this.model.setDHCPOptions(data);
        return null;
      }
    });
    return new VPCView();
  });

}).call(this);

(function() {
  define('module/design/property/vpc/app_model',['../base/model', "Design", 'constant'], function(PropertyModel, Design, constant) {
    var VPCAppModel;
    VPCAppModel = PropertyModel.extend({
      init: function(vpc_uid) {
        var AclModel, RtbModel, TYPE_ACL, TYPE_RTB, appData, dhcp, dhcpData, i, idx, j, myVPCComponent, tmp, vpc, _i, _j, _len, _len1, _ref;
        myVPCComponent = Design.instance().component(vpc_uid);
        appData = MC.data.resource_list[Design.instance().region()];
        vpc = appData[myVPCComponent.get('appId')];
        if (!vpc) {
          return false;
        }
        vpc = $.extend(true, {}, vpc);
        vpc.name = myVPCComponent.get('name');
        TYPE_RTB = constant.RESTYPE.RT;
        TYPE_ACL = constant.RESTYPE.ACL;
        RtbModel = Design.modelClassForType(TYPE_RTB);
        AclModel = Design.modelClassForType(TYPE_ACL);
        vpc.mainRTB = RtbModel.getMainRouteTable();
        if (vpc.mainRTB) {
          vpc.mainRTB = vpc.mainRTB.get("appId");
        }
        vpc.defaultACL = AclModel.getDefaultAcl();
        if (vpc.defaultACL) {
          vpc.defaultACL = vpc.defaultACL.get("appId");
        }
        if (vpc.dhcpOptionsId) {
          if (!appData[vpc.dhcpOptionsId]) {
            vpc.default_dhcp = true;
          } else {
            dhcpData = appData[vpc.dhcpOptionsId].dhcpConfigurationSet.item;
            dhcp = {};
            for (_i = 0, _len = dhcpData.length; _i < _len; _i++) {
              i = dhcpData[_i];
              if (i.key === 'domain-name-servers') {
                _ref = i.valueSet;
                for (idx = _j = 0, _len1 = _ref.length; _j < _len1; idx = ++_j) {
                  j = _ref[idx];
                  if (j === 'AmazonProvidedDNS') {
                    tmp = i.valueSet[0];
                    i.valueSet[0] = j;
                    i.valueSet[idx] = tmp;
                    break;
                  }
                }
              }
              dhcp[MC.camelCase(i.key)] = i.valueSet;
            }
            vpc.dhcp = dhcp;
          }
        }
        this.set(vpc);
        return null;
      }
    });
    return new VPCAppModel();
  });

}).call(this);

define('module/design/property/vpc/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"property-control-group\">\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_LBL_DEFAULT", {hash:{},data:data}))
    + "</p>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.dhcp), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_LBL_NONE", {hash:{},data:data}))
    + "</p>\n </div>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_OPTION_SET_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.dhcpOptionsId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainName), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainNameServers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNameServers)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNodeType), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </dl>\n\n  ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainName)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_DOMAIN_NAME_SERVER", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.domainNameServers), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n    ";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</p>";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NTP_SERVER", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.ntpServers), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n    ";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NETBIOS_NAME_SERVER", {hash:{},data:data}))
    + "</dt>\n    <dd>";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNameServers), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dd>\n    ";
  return buffer;
  }

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DHCP_SPECIFIED_LBL_NETBIOS_NODE_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.dhcp)),stack1 == null || stack1 === false ? stack1 : stack1.netbiosNodeType)),stack1 == null || stack1 === false ? stack1 : stack1[0])),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIT_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_CIDR", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_DETAIL_LBL_TENANCY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceTenancy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.mainRTB)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_APP_DEFAULT_ACL", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.defaultACL)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n  </div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPC_TIT_DHCP_OPTION", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.default_dhcp), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </div>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/vpc/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var VPCAppView;
    VPCAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new VPCAppView();
  });

}).call(this);

(function() {
  define('module/design/property/vpc/main',['../base/main', './model', './view', './app_model', './app_view', 'constant'], function(PropertyModule, model, view, app_model, app_view, constant) {
    var VPCModule;
    VPCModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.VPC,
      initStack: function() {
        this.model = model;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/rtb/model',['../base/model', "Design", 'constant'], function(PropertyModel, Design, constant) {
    var RTBModel;
    RTBModel = PropertyModel.extend({
      defaults: {
        'isAppEdit': false
      },
      setMainRT: function() {
        Design.instance().component(this.get("uid")).setMain();
        if (this.isAppEdit) {
          this.setMainMessage(this.get("uid"));
          this.set('isMain', Design.instance().component(this.get("uid")).get("main"));
        }
        return null;
      },
      reInit: function() {
        this.init(this.get("uid"));
        return null;
      },
      init: function(uid) {
        var VPCModel, cn, component, data, design, res_type, routes, subnet, theOtherPort, _i, _len, _ref;
        design = Design.instance();
        component = design.component(uid);
        res_type = constant.RESTYPE;
        if (component.node_line) {
          subnet = component.getTarget(res_type.SUBNET);
          component = component.getTarget(res_type.RT);
          if (subnet) {
            this.set({
              title: 'Subnet-RT Association',
              association: {
                subnet: subnet.get("name"),
                rtb: component.get("name")
              }
            });
            return;
          }
        }
        VPCModel = Design.modelClassForType(res_type.VPC);
        routes = [];
        data = {
          uid: component.id,
          title: component.get("name"),
          isMain: component.get("main"),
          local_route: VPCModel.theVPC().get("cidr"),
          routes: routes,
          isAppEdit: this.isAppEdit
        };
        _ref = component.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.type !== "RTB_Route") {
            continue;
          }
          theOtherPort = cn.getOtherTarget(res_type.RT);
          routes.push({
            name: theOtherPort.get("name"),
            type: theOtherPort.type,
            ref: cn.id,
            isVgw: theOtherPort.type === res_type.VGW,
            isProp: cn.get("propagate"),
            cidr_set: cn.get("routes")
          });
        }
        routes = _.sortBy(routes, "type");
        if (this.isAppEdit) {
          this.set('vpcId', component.parent().get('appId'));
          this.set('routeTableId', component.get('appId'));
          this.setMainMessage(uid);
        }
        this.set(data);
        return true;
      },
      setMainMessage: function(uid) {
        var appData, asso, aws_rt_is_main, component, now_main_rtb, resource_list, _i, _len, _ref;
        component = Design.instance().component(uid);
        resource_list = MC.data.resource_list[Design.instance().region()];
        appData = resource_list[component.get("appId")];
        aws_rt_is_main = false;
        if (appData && appData.associationSet && appData.associationSet.item) {
          _ref = appData.associationSet.item;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            asso = _ref[_i];
            if (asso.main === true) {
              aws_rt_is_main = true;
            }
          }
        }
        now_main_rtb = Design.modelClassForType(constant.RESTYPE.RT).getMainRouteTable();
        if (aws_rt_is_main && now_main_rtb.id !== component.id) {
          return this.set('main', 'Yes (Set as No after applying updates)');
        } else if (aws_rt_is_main && now_main_rtb.id === component.id) {
          return this.set('main', 'Yes');
        } else if (!aws_rt_is_main && now_main_rtb.id === component.id) {
          return this.set('main', 'No (Set as Yes after applying updates)');
        } else {
          return this.set('main', 'No');
        }
      },
      setPropagation: function(propagate) {
        var cn, component;
        component = Design.instance().component(this.get("uid"));
        cn = _.find(component.connections(), function(cn) {
          return cn.getTarget(constant.RESTYPE.VGW) !== null;
        });
        cn.setPropagate(propagate);
        return null;
      },
      setRoutes: function(routeId, routes) {
        Design.instance().component(routeId).set("routes", routes);
        return null;
      },
      isCidrConflict: function(inputValue, cidr) {
        return Design.modelClassForType(constant.RESTYPE.SUBNET).isCidrConflict(inputValue, cidr);
      }
    });
    return new RTBModel();
  });

}).call(this);

define('module/design/property/rtb/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_ASSOCIATION", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_ASSOCIATION_TO", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.rtb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"property-control-group\" data-bind=\"true\">\n		<label class=\"left\" for=\"rt-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_NAME", {hash:{},data:data}))
    + "</label>\n		<input class=\"input\" type=\"text\" data-required=\"true\" data-ignore=\"true\" data-required-rollback=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"rt-name\">\n	</div>\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.program(9, program9, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_ROUTE", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<ul class=\"property-list property-list-no-padding route-list\">\n			<li><table class=\"table-no-style\">\n			  <tr class=\"route-target\">\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_TARGET", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-target-resource\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LOCAL", {hash:{},data:data}))
    + "</td>\n			  </tr>\n			  <tr>\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_DESTINATION", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-destination-input\">\n			    	<div class=\"route-destination-input multi-input\"><input class=\"input\" disabled=\"disabled\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.local_route)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\n			    </td>\n			  </tr>\n			</table></li>\n\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.routes), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	</div>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	  <dl class=\"dl-vertical\">\n	    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_ID", {hash:{},data:data}))
    + "</dt>\n	    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.routeTableId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n	    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n	    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n	    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_VPC_ID", {hash:{},data:data}))
    + "</dt>\n	    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n	  </dl>\n\n	  	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isMain), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n	  	<div class=\"tac property-control-group\">\n			<button class=\"btn btn-primary\" id=\"set-main-rt\" style=\"width: 200px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_SET_MAIN", {hash:{},data:data}))
    + "</button>\n			<p class=\"hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</p>\n		</div>\n		";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"tac property-control-group\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isMain), {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	";
  return buffer;
  }
function program10(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</p>\n			";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<button class=\"btn btn-primary\" id=\"set-main-rt\" style=\"width: 200px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_SET_MAIN", {hash:{},data:data}))
    + "</button>\n			<p class=\"hide\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</p>\n			";
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li><table class=\"table-no-style\">\n			  <tr class=\"route-target\">\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_TARGET", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-target-resource\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n			  </tr>\n\n			  <tr>\n			    <td class=\"route-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_DESTINATION", {hash:{},data:data}))
    + "</td>\n			    <td class=\"route-destination-input\">\n			    	<div class=\"route-destination-input multi-input\" data-ref=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ref)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n\n						";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.cidr_set), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				    </div>\n\n				    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isVgw), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			    </td>\n			  </tr>\n			</table></li>\n			";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n						<div class=\"multi-ipt-row\">\n		          <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n		          <span class=\"ipt-wrapper\"><input class=\"ip-main-input input\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" data-type=\"cidr\" data-trigger=\"change\" placeholder=\"eg. 0.0.0.0/0\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\"></span>\n		        </div>\n						";
  return buffer;
  }

function program17(depth0,data) {
  
  
  return "\n						<div class=\"multi-ipt-row\">\n		          <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n		          <span class=\"ipt-wrapper\"><input class=\"input tooltip\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" placeholder=\"eg. 0.0.0.0/0\" data-empty-remove=\"true\" type=\"text\"></span>\n		        </div>\n			      ";
  }

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				    <div class=\"property-control-group\">\n							<div class=\"checkbox\">\n								<input id=\"propagate_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" class=\"propagation\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isProp), {hash:{},inverse:self.noop,fn:self.program(20, program20, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n								<label for=\"propagate_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n							</div>\n							<label for=\"propagate_"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">Allow propagation</label>\n						</div>\n						";
  return buffer;
  }
function program20(depth0,data) {
  
  
  return "checked=\"true\"";
  }

  buffer += "<article>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.association), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/rtb/view',['../base/view', './template/stack'], function(PropertyView, template) {
    var RTBView;
    RTBView = PropertyView.extend({
      events: {
        'REMOVE_ROW  .multi-input': 'removeIp',
        'ADD_ROW     .multi-input': 'processParsley',
        'BEFORE_REMOVE_ROW  .multi-input': 'beforeRemoveIp',
        'change #rt-name': 'changeName',
        'click #set-main-rt': 'setMainRT',
        'change .propagation': 'changePropagation',
        "focus .ipt-wrapper .input": 'onFocusCIDR',
        "keypress .ipt-wrapper .input": 'onPressCIDR',
        "blur .ipt-wrapper .input": 'onBlurCIDR'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.title;
      },
      processParsley: function(event) {
        $(event.currentTarget).find('input').last().focus().removeClass('parsley-validated').removeClass('parsley-error').next('.parsley-error-list').remove();
        return null;
      },
      beforeRemoveIp: function(event) {
        var $nonEmptyInputs;
        $nonEmptyInputs = $(event.currentTarget).find("input").filter(function() {
          return this.value.length;
        });
        if ($nonEmptyInputs.length <= 1 && event.value) {
          return false;
        }
        return null;
      },
      removeIp: function(event) {
        var $target, newIps;
        $target = $(event.currentTarget);
        newIps = _.map($target.find("input"), function(input) {
          return input.value;
        });
        this.model.setRoutes($target.attr("data-ref"), _.uniq(newIps));
        return null;
      },
      changeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "Route Table")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      setMainRT: function() {
        if (this.model.isAppEdit) {
          this.model.setMainRT();
          this.render();
        } else {
          $("#set-main-rt").hide().parent().find("p").show();
          this.model.setMainRT();
        }
        return null;
      },
      changePropagation: function(event) {
        this.model.setPropagation($(event.target).is(":checked"));
        return null;
      },
      onPressCIDR: function(event) {
        if (event.keyCode === 13) {
          return $(event.currentTarget).blur();
        }
      },
      onFocusCIDR: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurCIDR: function(event) {
        var allCidrAry, cidr, dataRef, descContent, dialog_template, inputElem, inputValue, ips, mainContent, parentElem, that, _i, _len;
        inputElem = $(event.currentTarget);
        inputValue = inputElem.val();
        parentElem = inputElem.closest(".multi-input");
        dataRef = parentElem.attr("data-ref");
        ips = [];
        parentElem.find("input").each(function() {
          if (this !== event.currentTarget && this.value) {
            ips.push(this.value);
          }
          return null;
        });
        allCidrAry = _.uniq(ips);
        parentElem.closest("li").siblings().each(function() {
          var otherGroupIps;
          otherGroupIps = [];
          $(this).find("input").each(function() {
            if (this.value) {
              otherGroupIps.push(this.value);
            }
            return null;
          });
          allCidrAry = allCidrAry.concat(_.uniq(otherGroupIps));
          return null;
        });
        if (!inputValue) {
          if (inputElem.closest('.multi-ipt-row').siblings().length === 0) {
            mainContent = 'CIDR block is required.';
            descContent = 'Please provide a IP ranges for this route.';
          }
        } else if (!MC.validate('cidr', inputValue)) {
          mainContent = "" + inputValue + " is not a valid form of CIDR block.";
          descContent = 'Please provide a valid IP range. For example, 10.0.0.1/24.';
        } else {
          for (_i = 0, _len = allCidrAry.length; _i < _len; _i++) {
            cidr = allCidrAry[_i];
            if (inputValue === cidr || (cidr !== "0.0.0.0/0" && this.model.isCidrConflict(inputValue, cidr))) {
              mainContent = "" + inputValue + " conflicts with other route.";
              descContent = 'Please choose a CIDR block not conflicting with existing route.';
              break;
            }
          }
        }
        if (!mainContent) {
          if (inputValue) {
            ips.push(inputValue);
          }
          this.model.setRoutes(dataRef, _.uniq(ips));
          this.disabledAllOperabilityArea(false);
          return;
        }
        dialog_template = MC.template.setupCIDRConfirm({
          remove_content: 'Remove Route',
          main_content: mainContent,
          desc_content: descContent
        });
        that = this;
        modal(dialog_template, false, function() {
          $('.modal-close').click(function() {
            return inputElem.focus();
          });
          return $('#cidr-remove').click(function() {
            $canvas.clearSelected();
            Design.instance().component(dataRef).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        }, {
          $source: $(event.target)
        });
        return null;
      }
    });
    return new RTBView();
  });

}).call(this);

(function() {
  define('module/design/property/rtb/app_model',['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var RTBAppModel;
    RTBAppModel = PropertyModel.extend({
      processTarget: function(rtb) {
        console.log(rtb);
        rtb.routeSet.item = _.map(rtb.routeSet.item, function(item) {
          item.target = item.instanceId || item.networkInterfaceId || item.gatewayId;
          if (item.target !== "local") {
            Design.instance().eachComponent(function(component) {
              if (component.get("appId") === item.target) {
                item.target = component.get("name");
                return;
              }
              return null;
            });
          }
          return item;
        });
        return null;
      },
      init: function(rtb_uid) {
        var appData, asso, connectedTo, data, has_main, has_subnet, i, key, propagate, routeTable, rtb, rtbOrConn, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        rtbOrConn = Design.instance().component(rtb_uid);
        if (rtbOrConn.type === constant.RESTYPE.RT) {
          routeTable = rtbOrConn;
        } else {
          data = {};
          connectedTo = rtbOrConn.getOtherTarget(constant.RESTYPE.RT);
          routeTable = rtbOrConn.getTarget(constant.RESTYPE.RT);
          if (connectedTo.type === constant.RESTYPE.SUBNET) {
            data.subnet = connectedTo.get('name');
            has_subnet = true;
          }
          data.rtb = routeTable.get('name');
          rtb_uid = routeTable.id;
          if (has_subnet) {
            this.set('association', data);
            this.set('name', 'Subnet-RT Association');
            return;
          }
        }
        appData = MC.data.resource_list[Design.instance().region()];
        rtb = appData[routeTable.get('appId')];
        if (!rtb) {
          return false;
        }
        rtb = $.extend(true, {}, rtb);
        rtb.name = routeTable.get('name');
        has_main = false;
        if (rtb.associationSet && rtb.associationSet.item) {
          _ref = rtb.associationSet.item;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            asso = _ref[_i];
            if (asso.main === true) {
              has_main = true;
            }
          }
        }
        if (has_main) {
          rtb.main = "Yes";
        } else {
          rtb.main = "No";
        }
        _ref1 = rtb.routeSet.item;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          i = _ref1[_j];
          if (i.state === "active") {
            i.active = true;
          }
        }
        propagate = {};
        if (rtb.propagatingVgwSet && rtb.propagatingVgwSet.item) {
          _ref2 = rtb.propagatingVgwSet.item;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            i = _ref2[_k];
            propagate[i.gatewayId] = true;
          }
        }
        _ref3 = rtb.routeSet.item;
        for (key = _l = 0, _len3 = _ref3.length; _l < _len3; key = ++_l) {
          value = _ref3[key];
          if (propagate[value.gatewayId]) {
            value.propagate = true;
          }
        }
        this.processTarget(rtb);
        return this.set(rtb);
      }
    });
    return new RTBAppModel();
  });

}).call(this);

define('module/design/property/rtb/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_ASSOCIATION", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.subnet)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_ASSOCIATION_TO", {hash:{},data:data}))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.rtb)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.routeTableId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_MAIN_RT", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_VPC_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_LBL_ROUTE", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <table class=\"table table-small\">\n      <thead>\n        <tr>\n          <th></th>\n          <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_DESTINATION", {hash:{},data:data}))
    + "</th>\n          <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_TARGET", {hash:{},data:data}))
    + "</th>\n          <th></th>\n        </tr>\n      </thead>\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.routeSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n  </div>\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.active), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.destinationCidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.target)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.propagate), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </tr>\n      ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td><i class=\"status status-green tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_TIP_ACTIVE", {hash:{},data:data}))
    + "\"></i></td>\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td><i class=\"status status-red tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_TIP_BLACKHOLE", {hash:{},data:data}))
    + "\"></i></td>\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td><i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_RT_TIP_PROPAGATED", {hash:{},data:data}))
    + "\"></i></td>\n        ";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "\n        <td></td>\n        ";
  }

  buffer += "<article class=\"property-app\">\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.association), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/rtb/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var RtbAppView;
    RtbAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      }
    });
    return new RtbAppView();
  });

}).call(this);

(function() {
  define('module/design/property/rtb/main',['../base/main', './model', './view', './app_model', './app_view', 'event', 'constant'], function(PropertyModule, model, view, app_model, app_view, ide_event, constant) {
    var RTBModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.CANVAS_DELETE_OBJECT] = function() {
      this.model.reInit();
      return this.view.render();
    };
    ideEvents[ide_event.CANVAS_CREATE_LINE] = function() {
      this.model.reInit();
      return this.view.render();
    };
    RTBModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.RT, "RTB_Route", "RTB_Asso"],
      initStack: function() {
        this.model = model;
        this.model.isAppEdit = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/static/model',["module/design/property/base/model", "Design", "constant"], function(PropertyModel, Design, constant) {
    var StaticModel;
    StaticModel = PropertyModel.extend({
      init: function(id) {
        var appData, appId, component, data, isIGW, item, vpc, vpcId;
        component = Design.instance().component(id);
        isIGW = component.type === constant.RESTYPE.IGW;
        this.set("isIGW", isIGW);
        if (this.isApp) {
          this.set("readOnly", true);
          appData = MC.data.resource_list[Design.instance().region()];
          appId = component.get("appId");
          data = appData[appId];
          if (data) {
            if (isIGW) {
              if (data.attachmentSet && data.attachmentSet.item.length) {
                item = data.attachmentSet.item[0];
              }
            } else {
              item = data;
            }
          }
          if (item) {
            if (item.attachments && item.attachments.item && item.attachments.item.length) {
              this.set("state", item.state);
              this.set("attachment_state", item.attachments.item[0].state);
              vpcId = item.attachments.item[0].vpcId;
            } else {
              this.set("state", item.state);
              vpcId = item.vpcId;
            }
          } else {
            this.set("state", "unavailable");
          }
          vpc = appData[vpcId];
          if (vpc) {
            vpcId += " (" + vpc.cidrBlock + ")";
          }
          this.set("id", id);
          this.set("appId", component.get("appId"));
          this.set("vpc", vpcId);
        }
        return null;
      }
    });
    return new StaticModel();
  });

}).call(this);

define('module/design/property/static/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <article class=\"property-app\">\n  <dl class=\"dl-vertical\">\n    <dt>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIGW), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ID</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.appId), {hash:{},data:data}))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIGW), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt>VPC</dt>\n    <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.vpc), {hash:{},data:data}))
    + "</dd>\n  </dl>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "Internet Gateway";
  }

function program4(depth0,data) {
  
  
  return "VPN Gateway";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>State</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>State</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>Attachment State</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.attachment_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.attachment_state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>type</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <article>\n  <div  class=\"property-control-group\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isIGW), {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n";
  return buffer;
  }
function program13(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_IGW_TXT_DESCRIPTION", {hash:{},data:data}))
    + "\n  ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "";
  buffer += "\n    "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VGW_TXT_DESCRIPTION", {hash:{},data:data}))
    + "\n  ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.program(12, program12, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/static/view',['../base/view', './template/stack'], function(PropertyView, template) {
    var StaticView;
    StaticView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        if (this.model.get("isIGW")) {
          return "Internet-gateway";
        } else {
          return "VPN-gateway";
        }
      }
    });
    return new StaticView();
  });

}).call(this);

(function() {
  define('module/design/property/static/main',['../base/main', './model', './view', 'constant'], function(PropertyModule, model, view, constant) {
    var StaticModule;
    StaticModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.VGW, constant.RESTYPE.IGW],
      initStack: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = false;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = true;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.view = view;
        this.model.isApp = true;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/cgw/model',['../base/model', "Design", 'constant'], function(PropertyModel, Design, constant) {
    var CGWModel;
    CGWModel = PropertyModel.extend({
      init: function(uid) {
        var cgw;
        cgw = Design.instance().component(uid);
        this.set({
          uid: uid,
          name: cgw.get("name"),
          BGP: cgw.get("bgpAsn"),
          ip: cgw.get("ip")
        });
        return null;
      },
      setIP: function(ip) {
        Design.instance().component(this.get("uid")).set("ip", ip);
        return null;
      },
      setBGP: function(bgp) {
        Design.instance().component(this.get("uid")).set("bgpAsn", bgp);
        return null;
      }
    });
    return new CGWModel();
  });

}).call(this);

define('module/design/property/cgw/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "checked=\"checked\" ";
  }

function program3(depth0,data) {
  
  
  return "style=\"display:none;\"";
  }

  buffer += "<article id=\"property-cgw\" data-bind=\"true\">\n	<div class=\"property-control-group clearfix\">\n		<label class=\"left\" for=\"property-cgw-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_NAME", {hash:{},data:data}))
    + "</label>\n		<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n		<input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cgw-name\" data-ignore=\"true\"/>\n	</div>\n\n	<div class=\"property-control-group clearfix\">\n		<label class=\"left\" for=\"property-cgw-ip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_IPADDR", {hash:{},data:data}))
    + "</label>\n		<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n		<input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.ip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9.]*$\" id=\"property-cgw-ip\" data-empty-remove=\"true\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_TIP_THIS_ADDRESS_MUST_BE_STATIC", {hash:{},data:data}))
    + "\"/>\n	</div>\n\n	<div class=\"property-control-group clearfix cgw-routing\">\n		<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_ROUTING", {hash:{},data:data}))
    + "</label>\n		<p></p>\n		<div class=\"radio\">\n			<input id=\"property-routing-static\" type=\"radio\" name=\"routing-type\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.BGP), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"static\" />\n			<label for=\"property-routing-static\"></label>\n		</div>\n		<label for=\"property-routing-static\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_STATIC", {hash:{},data:data}))
    + "</label>\n	</div>\n\n	<div class=\"property-control-group clearfix cgw-routing\">\n		<div class=\"radio\">\n			<input id=\"property-routing-dynamic\" type=\"radio\" name=\"routing-type\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.BGP), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "value=\"dynamic\" />\n			<label for=\"property-routing-dynamic\"></label>\n		</div>\n		<label for=\"property-routing-dynamic\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_DYNAMIC", {hash:{},data:data}))
    + "</label>\n	</div>\n\n	<div class=\"property-control-group clearfix\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.BGP), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"property-cgw-bgp-wrapper\">\n		<label class=\"left\" for=\"property-cgw-bgp\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_BGP_ASN", {hash:{},data:data}))
    + "</label>\n		<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n		<input class=\"input tooltip\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.BGP)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-cgw-bgp\" maxlength=\"5\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_TIP_1TO65534", {hash:{},data:data}))
    + "\" data-type=\"digits\" />\n	</div>\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/cgw/view',['i18n!nls/lang.js', '../base/view', './template/stack', 'event', 'constant', "Design"], function(lang, PropertyView, template, ide_event, constant, Design) {
    var CGWView;
    CGWView = PropertyView.extend({
      events: {
        "click #property-cgw .cgw-routing input": 'onChangeRouting',
        "change #property-cgw-bgp": 'onChangeBGP',
        "change #property-cgw-name": 'onChangeName',
        "focus #property-cgw-ip": 'onFocusIP',
        "keypress #property-cgw-ip": 'onPressIP',
        "blur #property-cgw-ip": 'onBlurIP'
      },
      render: function() {
        this.$el.html(template(this.model.toJSON()));
        return this.model.get('name');
      },
      onChangeRouting: function() {
        $('#property-cgw-bgp-wrapper').toggle($('#property-routing-dynamic').is(':checked'));
        return this.model.setBGP("");
      },
      onChangeBGP: function(event) {
        var $target, region;
        $target = $(event.currentTarget);
        region = Design.instance().region();
        if (!$target.val()) {
          this.model.setBGP("");
          return;
        }
        $target.parsley('custom', function(val) {
          val = +val;
          if (val < 1 || val > 65534) {
            return lang.ide.PARSLEY_MUST_BE_BETWEEN_1_AND_65534;
          }
          if (val === 7224 && region === 'us-east-1') {
            return lang.ide.PARSLEY_ASN_NUMBER_7224_RESERVED;
          }
          if (val === 9059 && region === 'eu-west-1') {
            return lang.ide.PARSLEY_ASN_NUMBER_9059_RESERVED_IN_IRELAND;
          }
        });
        if ($target.parsley('validate')) {
          this.model.setBGP($target.val());
        }
        return null;
      },
      onChangeName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "Customer Gateway")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      onPressIP: function(event) {
        if (event.keyCode === 13) {
          return $('#property-cgw-ip').blur();
        }
      },
      onFocusIP: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurIP: function(event) {
        var descContent, dialog_template, haveError, ipAddr, mainContent, that;
        ipAddr = $('#property-cgw-ip').val();
        haveError = true;
        if (!ipAddr) {
          mainContent = 'IP Address is required.';
          descContent = 'Please provide a IP Address of this Customer Gateway.';
        } else if (!MC.validate('ipv4', ipAddr)) {
          mainContent = "" + ipAddr + " is not a valid IP Address.";
          descContent = 'Please provide a valid IP Address. For example, 192.168.1.1.';
        } else if (MC.aws.aws.isValidInIPRange(ipAddr, 'private')) {
          mainContent = "IP Address " + ipAddr + " is invalid for customer gateway.";
          descContent = "The address must be static and can't be behind a device performing network address translation (NAT).";
        } else {
          haveError = false;
        }
        if (!haveError) {
          this.model.setIP(event.target.value);
          this.disabledAllOperabilityArea(false);
          return;
        }
        dialog_template = MC.template.setupCIDRConfirm({
          remove_content: 'Remove Customer Gateway',
          main_content: mainContent,
          desc_content: descContent
        });
        that = this;
        return modal(dialog_template, false, function() {
          $('.modal-close').click(function() {
            return $('#property-cgw-ip').focus();
          });
          return $('#cidr-remove').click(function() {
            $canvas.clearSelected();
            Design.instance().component(that.model.get("uid")).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        }, {
          $source: $(event.target)
        });
      }
    });
    return new CGWView();
  });

}).call(this);

(function() {
  define('module/design/property/cgw/app_model',['../base/model', 'Design', 'constant'], function(PropertyModel, Design, constant) {
    var CGWAppModel;
    CGWAppModel = PropertyModel.extend({
      init: function(uid) {
        var appData, cgw, myCGWComponent;
        myCGWComponent = Design.instance().component(uid);
        appData = MC.data.resource_list[Design.instance().region()];
        cgw = appData[myCGWComponent.get('appId')];
        if (!cgw) {
          return false;
        }
        cgw = $.extend(true, {}, cgw);
        cgw.name = myCGWComponent.get('name');
        this.set(cgw);
        return null;
      }
    });
    return new CGWAppModel();
  });

}).call(this);

define('module/design/property/cgw/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<article class=\"property-app\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_CGW_LBL_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.customerGatewayId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_CGW_LBL_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_IPADDR", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ipAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_CGW_LBL_TYPE", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_BGP_ASN", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.bgpAsn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/cgw/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var CGWAppView;
    CGWAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.toJSON()));
        return this.model.get('name');
      }
    });
    return new CGWAppView();
  });

}).call(this);

(function() {
  define('module/design/property/cgw/main',['../base/main', './model', './view', './app_model', './app_view', 'constant'], function(PropertyModule, model, view, app_model, app_view, constant) {
    var CGWModule;
    CGWModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.CGW,
      setupStack: function() {
        var me;
        me = this;
        return this.view.on("CHANGE_NAME", function(value) {
          me.model.setName(value);
          MC.canvas.update(uid, "text", "name", value);
          return null;
        });
      },
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.view = app_view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/vpn/model',['../base/model', "Design", "constant"], function(PropertyModel, Design, constant) {
    var VPNModel, generateDownload;
    generateDownload = function(configs, vpn_data) {
      var defaultCfg, parse_result;
      defaultCfg = "{}";
      if (!vpn_data.customerGatewayConfiguration) {
        return defaultCfg;
      }
      vpn_data = $.xml2json($.parseXML(vpn_data.customerGatewayConfiguration));
      if (!vpn_data) {
        return defaultCfg;
      }
      vpn_data = vpn_data.vpn_connection;
      parse_result = _.map(configs, function(config) {
        var dc_data, dc_filename;
        dc_data = {
          vpnConnectionId: vpn_data['@attributes'].id || "",
          vpnGatewayId: vpn_data.vpn_gateway_id || "",
          customerGatewayId: vpn_data.customer_gateway_id || ""
        };
        dc_data.tunnel = _.map(vpn_data.ipsec_tunnel, function(value, key) {
          var cur_array;
          cur_array = {};
          cur_array.number = key + 1;
          cur_array.ike_protocol_method = value.ike.authentication_protocol || "";
          cur_array.ike_pre_shared_key = value.ike.pre_shared_key || "";
          cur_array.ike_authentication_protocol_algorithm = value.ike.authentication_protocol || "";
          cur_array.ike_encryption_protocol = value.ike.encryption_protocol || "";
          cur_array.ike_lifetime = value.ike.lifetime || "";
          cur_array.ike_mode = value.ike.mode || "";
          cur_array.ike_perfect_forward_secrecy = value.ike.perfect_forward_secrecy || "";
          cur_array.ipsec_protocol = value.ipsec.protocol || "";
          cur_array.ipsec_authentication_protocol = value.ipsec.authentication_protocol || "";
          cur_array.ipsec_encryption_protocol = value.ipsec.encryption_protocol || "";
          cur_array.ipsec_lifetime = value.ipsec.lifetime || "";
          cur_array.ipsec_mode = value.ipsec.mode || "";
          cur_array.ipsec_perfect_forward_secrecy = value.ipsec.perfect_forward_secrecy || "";
          cur_array.ipsec_interval = value.ipsec.dead_peer_detection.interval || "";
          cur_array.ipsec_retries = value.ipsec.dead_peer_detection.retries || "";
          cur_array.tcp_mss_adjustment = value.ipsec.tcp_mss_adjustment || "";
          cur_array.clear_df_bit = value.ipsec.clear_df_bit || "";
          cur_array.fragmentation_before_encryption = value.ipsec.fragmentation_before_encryption || "";
          cur_array.customer_gateway_outside_address = value.customer_gateway.tunnel_outside_address.ip_address || "";
          cur_array.vpn_gateway_outside_address = value.vpn_gateway.tunnel_outside_address.ip_address || "";
          cur_array.customer_gateway_inside_address = value.customer_gateway.tunnel_inside_address.ip_address + '/' + value.customer_gateway.tunnel_inside_address.network_cidr || "";
          cur_array.vpn_gateway_inside_address = value.vpn_gateway.tunnel_inside_address.ip_address + '/' + value.customer_gateway.tunnel_inside_address.network_cidr || "";
          cur_array.next_hop = value.vpn_gateway.tunnel_inside_address.ip_address || "";
          cur_array.isStaticRouting = true;
          if (value.customer_gateway.bgp && value.customer_gateway.bgp.asn) {
            cur_array.isStaticRouting = false;
            cur_array.customer_gateway_bgp_asn = value.customer_gateway.bgp.asn || "";
            cur_array.vpn_gateway_bgp_asn = value.vpn_gateway.bgp.asn || "";
            cur_array.neighbor_ip_address = value.vpn_gateway.tunnel_inside_address.ip_address || "";
            cur_array.customer_gateway_bgp_hold_time = value.customer_gateway.bgp.hold_time || "";
          }
          return cur_array;
        });
        dc_filename = dc_data.vpnConnectionId || 'download_configuration';
        dc_data = MC.template.configurationDownload(dc_data);
        return "{\"download\":true, \"filecontent\":\"" + (window.btoa(dc_data)) + "\", \"filename\":\"" + dc_filename + "\", \"btnname\":\"" + config.name + "\"}";
      });
      return "[ " + (parse_result.join(',')) + " ]";
    };
    VPNModel = PropertyModel.extend({
      init: function(uid) {
        var cgw, vgw, vpn;
        vpn = Design.instance().component(uid);
        vgw = vpn.getTarget(constant.RESTYPE.VGW);
        cgw = vpn.getTarget(constant.RESTYPE.CGW);
        if (this.isApp || this.isAppEdit) {
          this.getAppData(vpn.get("appId"));
        }
        this.set({
          uid: uid,
          name: "vpn:" + (cgw.get('name')),
          ips: vpn.get("routes"),
          dynamic: cgw.isDynamic()
        });
        return null;
      },
      updateIps: function(ipset) {
        Design.instance().component(this.get("uid")).set("routes", ipset);
        return null;
      },
      getAppData: function(vpnAppId) {
        var appData, vpn, vpncfg, vpncfg_str;
        appData = MC.data.resource_list[Design.instance().region()];
        vpn = $.extend(true, {}, appData[vpnAppId]);
        if (vpn) {
          vpncfg_str = generateDownload([
            {
              "type": "download_configuration",
              "name": "Download Configuration"
            }
          ], vpn);
          vpncfg = JSON.parse(vpncfg_str);
          if (vpncfg && vpncfg.length > 0) {
            this.set("vpncfg", vpncfg[0]);
          }
        }
        if (vpn.vgwTelemetry && vpn.vgwTelemetry.item) {
          vpn.vgwTelemetry = _.map(vpn.vgwTelemetry.item, function(item, idx) {
            item = $.extend(true, {}, item);
            item.index = idx + 1;
            return item;
          });
        }
        vpn.isApp = this.isApp;
        return this.set(vpn);
      },
      isCidrConflict: function(inputValue, cidr) {
        return Design.modelClassForType(constant.RESTYPE.SUBNET).isCidrConflict(inputValue, cidr);
      }
    });
    return new VPNModel();
  });

}).call(this);

define('module/design/property/vpn/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">VPN Summary</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_LBL_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpnConnectionId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_LBL_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-xgw-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_LBL_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_LBL_ROUTING", {hash:{},data:data}))
    + "</dt>\n      <dd>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.staticRoutesOnly), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dd>\n\n      <a class='btn btn-primary vpn-download' href=\"data://text/plain;base64,";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.vpncfg)),stack1 == null || stack1 === false ? stack1 : stack1.filecontent)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" download=\"";
  stack1 = ((stack1 = ((stack1 = (depth0 && depth0.vpncfg)),stack1 == null || stack1 === false ? stack1 : stack1.filename)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ".txt\" style=\"padding:8px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_TIT_DOWNLOAD_CONF", {hash:{},data:data}))
    + "</a>\n\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vgwTelemetry), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "Static";
  }

function program4(depth0,data) {
  
  
  return "Dynamic";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_LBL_TUNNEL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\"> <table class=\"table\">\n    <thead> <tr>\n      <th style=\"width:20px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_COL_TUNNEL", {hash:{},data:data}))
    + "</th>\n      <th style=\"width:100px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_COL_IP", {hash:{},data:data}))
    + "</th>\n    </tr> </thead>\n    <tbody>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.vgwTelemetry), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table> </div>\n  ";
  return buffer;
  }
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\"";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.status), "DOWN", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " since "
    + escapeExpression(((stack1 = (depth0 && depth0.lastStatusChange)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.statusMessage), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.outsideIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      </tr>\n    ";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "DOWN";
  }

function program10(depth0,data) {
  
  
  return "UP";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "because "
    + escapeExpression(((stack1 = (depth0 && depth0.statusMessage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  return buffer;
  }

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.routes)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_LBL_STATUS_RT", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\"> <table class=\"table\">\n    <thead> <tr>\n      <th style=\"width:100px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_COL_IP_PREFIX", {hash:{},data:data}))
    + "</th>\n      <th style=\"width:100px\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_COL_SOURCE", {hash:{},data:data}))
    + "</th>\n    </tr> </thead>\n    <tbody>\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.routes)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tbody>\n  </table> </div>\n  ";
  return buffer;
  }
function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.destinationCidrBlock)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.source)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n      </tr>\n      ";
  return buffer;
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.dynamic), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program19(depth0,data) {
  
  
  return "\n    <section class=\"property-control-group\"> Since the Customer Gateway this VPN is connected to has dynamic routing enabled no configuration is necessary. </section>\n  ";
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.dynamic), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vpnConnectionId), {hash:{},inverse:self.noop,fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <section class=\"property-control-group\">\n    <div class=\"clearfix\">\n      <label class=\"left\" for=\"property-vpc-ips\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPN_LBL_IP_PREFIX", {hash:{},data:data}))
    + "</label>\n      <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n    </div>\n    <div id=\"property-vpn-ips\" class=\"multi-input\" data-max-row=\"100\" data-bind=\"true\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.ips), {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  </section>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vpnConnectionId), {hash:{},inverse:self.noop,fn:self.program(29, program29, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_CGW_APP_VPN_LBL_STATUS_RT", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n  ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"multi-ipt-row\">\n        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n        <span class=\"ipt-wrapper\"><input data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\" type=\"text\"></span>\n      </div>\n      ";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "";
  buffer += "\n      <div class=\"multi-ipt-row\">\n        <span class=\"ipt-controls\"><a href=\"#\" class=\"icon-del\"></a><a href=\"#\" class=\"icon-add\"></a></span>\n        <span class=\"ipt-wrapper\"><input data-ignore=\"true\" data-empty-remove=\"true\" data-ignore-regexp=\"^[0-9./]*$\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VPN_TIP_EG_192_168_0_0_16", {hash:{},data:data}))
    + "\" type=\"text\"></span>\n      </div>\n      ";
  return buffer;
  }

function program29(depth0,data) {
  
  
  return " </div> ";
  }

  buffer += "<article>\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.vpnConnectionId), {hash:{},inverse:self.program(18, program18, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/vpn/view',['../base/view', './template/stack'], function(PropertyView, template) {
    var VPNView;
    VPNView = PropertyView.extend({
      events: {
        "BEFORE_REMOVE_ROW #property-vpn-ips": 'beforeRemoveIP',
        "REMOVE_ROW #property-vpn-ips": 'removeIP',
        "ADD_ROW #property-vpn-ips": 'addIP',
        "focus #property-vpn-ips input": 'onFocusCIDR',
        "keypress #property-vpn-ips input": 'onPressCIDR',
        "blur #property-vpn-ips input": 'onBlurCIDR'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        return this.model.attributes.name;
      },
      addIP: function() {
        $("#property-vpn-ips input").last().focus();
        return null;
      },
      beforeRemoveIP: function(event) {
        var nonEmptyInputs;
        if (event.value) {
          nonEmptyInputs = $("#property-vpn-ips").find("input").filter(function() {
            return this.value.length > 0;
          });
          if (nonEmptyInputs.length < 2) {
            event.preventDefault();
          }
        }
        return null;
      },
      removeIP: function(event, ip) {
        var ips;
        if (!ip) {
          return;
        }
        ips = [];
        $("#property-vpn-ips input").each(function() {
          return ips.push($(this).val());
        });
        this.model.updateIps(ips);
        return null;
      },
      onPressCIDR: function(event) {
        if (event.keyCode === 13) {
          $(event.currentTarget).blur();
        }
        return null;
      },
      onFocusCIDR: function(event) {
        this.disabledAllOperabilityArea(true);
        return null;
      },
      onBlurCIDR: function(event) {
        var allCidrAry, cidr, descContent, dialog_template, inputElem, inputValue, ips, mainContent, that, _i, _len;
        inputElem = $(event.currentTarget);
        inputValue = inputElem.val();
        ips = [];
        $("#property-vpn-ips input").each(function() {
          if (this.value) {
            ips.push(this.value);
          }
          return null;
        });
        allCidrAry = _.uniq(ips);
        if (!inputValue) {
          if (inputElem.parents('.multi-ipt-row').siblings().length === 0) {
            mainContent = 'CIDR block is required.';
            descContent = 'Please provide a IP ranges for this IP Prefix.';
          }
        } else if (!MC.validate('cidr', inputValue)) {
          mainContent = "" + inputValue + " is not a valid form of CIDR block.";
          descContent = 'Please provide a valid IP range. For example, 10.0.0.1/24.';
        } else {
          for (_i = 0, _len = allCidrAry.length; _i < _len; _i++) {
            cidr = allCidrAry[_i];
            if (cidr !== inputValue && this.model.isCidrConflict(inputValue, cidr)) {
              mainContent = "" + inputValue + " conflicts with other IP Prefix.";
              descContent = 'Please choose a CIDR block not conflicting with existing IP Prefix.';
              break;
            }
          }
        }
        if (!mainContent) {
          this.model.updateIps(allCidrAry);
          this.disabledAllOperabilityArea(false);
          return;
        }
        dialog_template = MC.template.setupCIDRConfirm({
          remove_content: 'Remove Connection',
          main_content: mainContent,
          desc_content: descContent
        });
        that = this;
        return modal(dialog_template, false, function() {
          $('.modal-close').click(function() {
            return inputElem.focus();
          });
          return $('#cidr-remove').click(function() {
            $canvas.clearSelected();
            Design.instance().component(that.model.get("uid")).remove();
            that.disabledAllOperabilityArea(false);
            return modal.close();
          });
        }, {
          $source: $(event.target)
        });
      }
    });
    return new VPNView();
  });

}).call(this);

(function() {
  define('module/design/property/vpn/main',['../base/main', './model', './view', 'constant', 'event'], function(PropertyModule, model, view, constant, ide_event) {
    var VPNModule;
    VPNModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.VPN,
      initStack: function() {
        this.view = view;
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = false;
        return null;
      },
      initApp: function() {
        this.view = view;
        this.model = model;
        this.model.isApp = true;
        this.model.isAppEdit = false;
        return null;
      },
      initAppEdit: function() {
        this.view = view;
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = true;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/eni/model',['../base/model', 'constant', "Design", "event", 'i18n!nls/lang.js'], function(PropertyModel, constant, Design, ide_event, lang) {
    var ENIModel;
    ENIModel = PropertyModel.extend({
      defaults: {
        'uid': null,
        'isAppEdit': false
      },
      init: function(uid) {
        var component, data;
        component = Design.instance().component(uid);
        data = {
          uid: uid,
          name: component.get("name"),
          desc: component.get("description"),
          sourceDestCheck: component.get("sourceDestCheck"),
          isAppEdit: this.isAppEdit,
          isGroupMode: this.isGroupMode,
          attached: component.connections("EniAttachment").length > 0
        };
        this.set(data);
        this.getIpList();
        if (this.isAppEdit) {
          this.getEniGroup(uid);
        }
        return null;
      },
      getIpList: function() {
        var ips;
        ips = Design.instance().component(this.get("uid")).getIpArray();
        ips[0].unDeletable = true;
        if (this.isAppEdit) {
          ips[0].editable = false;
        }
        this.set("ips", ips);
        return null;
      },
      setEniDesc: function(value) {
        Design.instance().component(this.get("uid")).set("description", value);
        return null;
      },
      setSourceDestCheck: function(value) {
        Design.instance().component(this.get("uid")).set("sourceDestCheck", value);
        return null;
      },
      attachEip: function(eip_index, attach) {
        Design.instance().component(this.get("uid")).setIp(eip_index, null, null, attach);
        this.attributes.ips[eip_index].hasEip = attach;
        if (attach) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        return null;
      },
      removeIp: function(index) {
        Design.instance().component(this.get("uid")).removeIp(index);
        return null;
      },
      getEniGroup: function(eni_uid) {
        var appData, count, eni, eniComp, existingLength, group, idx, index, member, members, name, resource_list, _i, _j, _len, _len1, _ref;
        eniComp = Design.instance().component(eni_uid);
        resource_list = MC.data.resource_list[Design.instance().region()];
        appData = resource_list[eniComp.get("appId")];
        name = eniComp.get("name");
        group = [
          {
            appId: eniComp.get("appId"),
            name: name + "-0",
            desc: eniComp.get("description"),
            status: appData ? appData.status : "Unknown",
            sourceDestCheck: eniComp.get("sourceDestCheck") ? "enabled" : "disabled"
          }
        ];
        count = eniComp.serverGroupCount();
        if (eniComp.groupMembers().length > count - 1) {
          members = eniComp.groupMembers().slice(0, count - 1);
        } else {
          members = eniComp.groupMembers();
        }
        for (index = _i = 0, _len = members.length; _i < _len; index = ++_i) {
          member = members[index];
          group.push({
            name: name + "-" + (index + 1),
            appId: member.appId,
            status: resource_list[member.appId] ? resource_list[member.appId].status : "Unknown",
            isNew: !member.appId,
            isOld: member.appId && (index + 1 >= count)
          });
        }
        while (group.length < count) {
          group.push({
            name: name + "-" + group.length,
            isNew: true,
            status: "Unknown"
          });
        }
        existingLength = 0;
        _ref = eniComp.groupMembers();
        for (idx = _j = 0, _len1 = _ref.length; _j < _len1; idx = ++_j) {
          eni = _ref[idx];
          if (eni.appId) {
            existingLength = idx + 1;
          } else {
            break;
          }
        }
        existingLength += 1;
        if (group.length > 1) {
          this.set('group', group);
          if (existingLength > count) {
            group.increment = "-" + (existingLength - count);
          } else if (existingLength < count) {
            group.increment = "+" + (count - existingLength);
          }
        } else {
          this.set('group', group[0]);
        }
        this.set('readOnly', false);
        return null;
      },
      addIp: function() {
        var comp, ips;
        comp = Design.instance().component(this.get("uid"));
        comp.addIp();
        ips = comp.getIpArray();
        ips[0].unDeletable = true;
        this.set("ips", ips);
        return null;
      },
      isValidIp: function(ip) {
        return Design.instance().component(this.get("uid")).isValidIp(ip);
      },
      canAddIP: function() {
        return Design.instance().component(this.get("uid")).canAddIp();
      },
      setIp: function(idx, ip, autoAssign) {
        Design.instance().component(this.get("uid")).setIp(idx, ip, autoAssign);
        return null;
      }
    });
    return new ENIModel();
  });

}).call(this);

define('module/design/property/eni/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n<article class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_LBL_ATTACH_WARN", {hash:{},data:data}))
    + "</article>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n\n<article>\n  <div id=\"prop-appedit-eni-list\" class=\"expand\"></div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_LBL_DETAIL", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAppEdit), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <section class=\"property-control-group\">\n      <div class=\"network-list-wrap\">\n        <div class=\"network-list-header\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "\n          <button id=\"property-eni-ip-add\" class=\"right btn btn-blue btn-small tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_TIP_ADD_IP_ADDRESS", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_ADD_IP", {hash:{},data:data}))
    + "</button>\n        </div>\n        <ul class=\"network-list\" id=\"property-eni-list\" data-bind=\"true\">\n        </ul>\n      </div>\n    </section>\n  </div>\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>\n\n";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <section class=\"property-control-group\" data-bind=\"true\">\n      <label class=\"left\" for=\"property-eni-desc\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_LBL_DESC", {hash:{},data:data}))
    + "</label>\n      <textarea id=\"property-eni-desc\" data-type=\"ascii\" data-ignore=\"true\" class=\"input\">"
    + escapeExpression(((stack1 = (depth0 && depth0.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n    </section>\n\n    <section class=\"property-control-group\">\n      <div class=\"checkbox\">\n        <input id=\"property-eni-source-check\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sourceDestCheck), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " />\n        <label for=\"property-eni-source-check\"></label>\n      </div>\n      <label for=\"property-eni-source-check\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SOURCE_DEST_CHECK", {hash:{},data:data}))
    + "</label>\n    </section>\n";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  stack1 = helpers.unless.call(depth0, (depth0 && depth0.attached), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/eni/template/eni_list',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(7, program7, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Network Interface Summary</div>\n<div class=\"option-group\">\n  <dl class=\"dl-vertical\">\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_ID", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_STATE", {hash:{},data:data}))
    + "</dt>\n    <dd><i class=\"status status-"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.description), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_SOURCE_DEST_CHECK_DISP", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.sourceDestCheck)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n  </dl>\n<div>\n\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "expand";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_LBL_DESC", {hash:{},data:data}))
    + "</dt>\n    <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div class=\"option-group-head ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Network Interface Group Members<span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span> <span class=\"appedit-head-meta appedit-head-meta-add\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.group)),stack1 == null || stack1 === false ? stack1 : stack1.increment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n<ul class=\"option-group property-list\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li>\n      <i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isNew), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n  ";
  return buffer;
  }
function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"subtitle\">("
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span>";
  return buffer;
  }

function program11(depth0,data) {
  
  
  return "<div class=\"subtitle subtitle-launch\">Create after applying updates</div>\n      ";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOld), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      ";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return "<div class=\"subtitle subtitle-terminate\">Delete after applying updates</div>";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.group), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/eni/view',['../base/view', './template/stack', './template/eni_list', 'i18n!nls/lang.js'], function(PropertyView, template, list_template, lang) {
    var ENIView, noop;
    noop = function() {
      return null;
    };
    ENIView = PropertyView.extend({
      events: {
        "change #property-eni-desc": "setEniDesc",
        "change #property-eni-source-check": "setEniSourceDestCheck",
        'click .toggle-eip': 'setEip',
        'click #property-eni-ip-add': "addIp",
        'click #property-eni-list .icon-remove': "removeIp",
        'blur .input-ip': 'syncIPList'
      },
      render: function() {
        this.$el.html(template(this.model.attributes));
        this.refreshIpList();
        $("#prop-appedit-eni-list").html(list_template(this.model.attributes));
        return this.model.attributes.name;
      },
      setEniDesc: function(event) {
        this.model.setEniDesc(event.target.value);
        return null;
      },
      setEniSourceDestCheck: function(event) {
        this.model.setSourceDestCheck(event.target.checked);
        return null;
      },
      addIp: function() {
        if ($("#property-eni-ip-add").hasClass("disabled")) {
          return;
        }
        this.model.addIp();
        this.refreshIpList();
        return null;
      },
      setEip: function(event) {
        var $target, attach, index, tooltip;
        $target = $(event.currentTarget);
        index = $target.closest("li").index();
        attach = !$target.hasClass("associated");
        if (attach) {
          tooltip = lang.ide.PROP_INSTANCE_IP_MSG_4;
        } else {
          tooltip = lang.ide.PROP_INSTANCE_IP_MSG_3;
        }
        $target.toggleClass("associated", attach).data("tooltip", tooltip);
        this.model.attachEip(index, attach);
        return null;
      },
      removeIp: function(event) {
        var $li, index;
        $li = $(event.currentTarget).closest("li");
        index = $li.index();
        $li.remove();
        this.model.removeIp(index);
        this.updateIPAddBtnState(true);
        return null;
      },
      syncIPList: function(event) {
        var $target, autoAssign, ip, ipItems, ipVal;
        ipItems = $('#property-eni-list .input-ip-item');
        $target = $(event.currentTarget);
        if (!this.validateIpItem($target)) {
          return;
        }
        ipVal = $target.val();
        ip = $target.siblings(".input-ip-prefix").text() + ipVal;
        autoAssign = ipVal === "x" || ipVal === "x.x";
        this.model.setIp($target.closest(".input-ip-item").index(), ip, autoAssign);
        return null;
      },
      refreshIpList: function(event) {
        $('#property-eni-list').html(MC.template.propertyIpList(this.model.attributes.ips));
        this.updateIPAddBtnState();
        return null;
      },
      validateIpItem: function($item) {
        var result, that;
        that = this;
        $item.parsley("custom", function(val) {
          var currentInputIP, inputValue, inputValuePrefix, ipIPFormatCorrect, prefixAry, result, validDOM;
          validDOM = $item;
          inputValue = validDOM.val();
          inputValuePrefix = validDOM.siblings(".input-ip-prefix").text();
          currentInputIP = inputValuePrefix + inputValue;
          prefixAry = inputValuePrefix.split('.');
          ipIPFormatCorrect = false;
          if (prefixAry.length === 4) {
            if (inputValue === 'x') {
              ipIPFormatCorrect = true;
            } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
              ipIPFormatCorrect = true;
            }
          } else {
            if (inputValue === 'x.x') {
              ipIPFormatCorrect = true;
            } else if (MC.validate('ipaddress', inputValuePrefix + inputValue)) {
              ipIPFormatCorrect = true;
            }
          }
          if (!ipIPFormatCorrect) {
            return lang.ide.PARSLEY_INVALID_IP_ADDRESS;
          } else {
            result = that.model.isValidIp(currentInputIP);
            if (result !== true) {
              return result;
            }
          }
          return null;
        });
        result = $item.parsley("validate");
        $item.parsley("custom", noop);
        return result;
      },
      updateIPAddBtnState: function(enabled) {
        var tooltip;
        if (enabled === void 0) {
          enabled = this.model.canAddIP();
        }
        if (enabled === true) {
          tooltip = "Add IP Address";
        } else {
          if (_.isString(enabled)) {
            tooltip = enabled;
          } else {
            tooltip = "Cannot add IP address";
          }
          enabled = false;
        }
        $("#property-eni-ip-add").toggleClass("disabled", !enabled).data("tooltip", tooltip);
        return null;
      }
    });
    return new ENIView();
  });

}).call(this);

(function() {
  define('module/design/property/eni/app_model',['../base/model', 'Design', 'constant'], function(PropertyModel, Design, constant) {
    var EniAppModel;
    EniAppModel = PropertyModel.extend({
      init: function(uid) {
        var allEni, appData, e, eni, eni_comp, formated_group, group, i, index, m, mIndex, memberIndex, myEniComponent, myEniComponentJSON, _i, _j, _len, _len1, _ref, _ref1;
        group = [];
        myEniComponent = Design.instance().component(uid);
        if (!myEniComponent) {
          allEni = Design.modelClassForType('AWS.VPC.NetworkInterface').allObjects();
          for (_i = 0, _len = allEni.length; _i < _len; _i++) {
            e = allEni[_i];
            if (e.get('appId') === uid) {
              myEniComponent = e;
              myEniComponentJSON = e.toJSON();
              break;
            } else {
              _ref = e.groupMembers();
              for (mIndex in _ref) {
                m = _ref[mIndex];
                if (m.appId === uid) {
                  memberIndex = +mIndex + 1;
                  myEniComponent = e;
                  myEniComponentJSON = m;
                  break;
                }
              }
            }
          }
        } else {
          myEniComponentJSON = myEniComponent.toJSON();
        }
        appData = MC.data.resource_list[Design.instance().region()];
        if (this.isGroupMode) {
          group = [myEniComponentJSON].concat(myEniComponent.groupMembers());
        } else {
          group.push(myEniComponentJSON);
        }
        formated_group = [];
        for (index in group) {
          eni_comp = group[index];
          if (appData[eni_comp.appId]) {
            eni = $.extend(true, {}, appData[eni_comp.appId]);
          } else {
            eni = {
              privateIpAddressesSet: {
                item: []
              }
            };
          }
          _ref1 = eni.privateIpAddressesSet.item;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            i = _ref1[_j];
            i.primary = i.primary === true;
          }
          eni.id = eni_comp.appId;
          eni.name = eni_comp.name ? "" + eni_comp.name + "-0" : "" + (myEniComponent.get('name')) + "-" + (memberIndex || index);
          eni.idx = memberIndex || index;
          eni.sourceDestCheck = eni.sourceDestCheck ? 'enabled' : 'disabled';
          formated_group.push(eni);
        }
        if (this.isGroupMode) {
          this.set('group', _.sortBy(formated_group, 'idx'));
          this.set('readOnly', true);
          this.set('isGroupMode', true);
          this.set('name', myEniComponent.get('name'));
        } else {
          eni = formated_group[0];
          eni.readOnly = true;
          eni.isGroupMode = false;
          eni.id = uid;
          eni.uid = myEniComponent ? myEniComponent.id : uid;
          this.set(eni);
        }
        return null;
      }
    });
    return new EniAppModel();
  });

}).call(this);

define('module/design/property/eni/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">Network Interface Details</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.networkInterfaceId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_STATE", {hash:{},data:data}))
    + "</dt>\n      <dd><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.description), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_SOURCE_DEST_CHECK_DISP", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.sourceDestCheck)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <div class=\"hidden-details\">\n      <a href=\"#\" class=\"toggle-details js-toggle-dropdown\" data-toggle=\"self-only\"><span class=\"details-off\">+ "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SHOW_DETAIL", {hash:{},data:data}))
    + "</span><span class=\"details-on\">- "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_HIDE_DETAIL", {hash:{},data:data}))
    + "</span></a>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_VPC_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SUBNET_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.subnetId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.attachment), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_MAC_ADDRESS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.macAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.privateDnsName), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ownerId), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </div>\n\n    <table class=\"table\">\n      <tr>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_IP_ADDRESS", {hash:{},data:data}))
    + "</th>\n        <th>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PUBLIC_IP", {hash:{},data:data}))
    + "</th>\n      </tr>\n      ";
  stack1 = helpers.each.call(depth0, ((stack1 = (depth0 && depth0.privateIpAddressesSet)),stack1 == null || stack1 === false ? stack1 : stack1.item), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </table>\n  </div>\n\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_LBL_DESC", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_ATTACHMENT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.attachmentId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_Attachment_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.instanceOwnerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_Attachment_STATE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.attachment)),stack1 == null || stack1 === false ? stack1 : stack1.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PUBLIC_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_PRIVATE_DNS", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateDnsName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ENI_IP_OWNER", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ownerId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <tr>\n        <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.privateIpAddress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.primary), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n        <td>";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp), {hash:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n      </tr>\n      ";
  return buffer;
  }
function program13(depth0,data) {
  
  
  return "<span>(Primary)</span>";
  }

function program15(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.association)),stack1 == null || stack1 === false ? stack1 : stack1.publicIp)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program17(depth0,data) {
  
  
  return "-";
  }

  buffer += "<article class=\"property-app\">\n  <div id=\"prop-appedit-eni-list\" class=\"expand\"></div>\n\n  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isGroupMode), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/eni/app_view',['../base/view', './template/app', './template/eni_list'], function(PropertyView, template, list_template) {
    var EniAppView;
    EniAppView = PropertyView.extend({
      render: function() {
        this.$el.html(template(this.model.attributes));
        if (this.model.isGroupMode) {
          $("#prop-appedit-eni-list").html(list_template(this.model.attributes));
        }
        return this.model.attributes.name;
      }
    });
    return new EniAppView();
  });

}).call(this);

(function() {
  define('module/design/property/eni/main',["../base/main", "./model", "./view", "./app_model", "./app_view", "../sglist/main", 'event', "constant"], function(PropertyModule, model, view, app_model, app_view, sglist_main, ide_event, constant) {
    var EniModule, ideEvents;
    ideEvents = {};
    ideEvents[ide_event.PROPERTY_REFRESH_ENI_IP_LIST] = function() {
      this.model.getIpList();
      this.view.refreshIpList();
      return null;
    };
    EniModule = PropertyModule.extend({
      ideEvents: ideEvents,
      handleTypes: [constant.RESTYPE.ENI, "component_eni_group"],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initStack: function() {
        this.model = model;
        this.model.isAppEdit = false;
        this.model.isGroupMode = false;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        if (!this.model.attributes.association) {
          return sglist_main.loadModule(this.model);
        }
      },
      initApp: function() {
        this.model = app_model;
        this.model.isGroupMode = this.handle === "component_eni_group";
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        if (!this.model.isGroupMode) {
          sglist_main.loadModule(this.model);
        }
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isAppEdit = true;
        this.view = view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/acl/model',['../base/model', "Design", 'constant', 'i18n!nls/lang.js'], function(PropertyModel, Design, constant, lang) {
    var ACLModel, icmpCodeMap, icmpTypeMap;
    icmpTypeMap = {
      "0": "Echo Reply(0)",
      "3": "Destination Unreachable(3)",
      "4": "Source Quench(4)",
      "5": "Redirect Message(5)",
      "6": "Alternate Host Address(6)",
      "8": "Echo Request(8)",
      "9": "Router Advertisement(9)",
      "10": "Router Solicitation(10)",
      "11": "Time Exceeded(11)",
      "12": "Parameter Problem: Bad IP header(12)",
      "13": "Timestamp(13)",
      "14": "Timestamp Reply(14)",
      "15": "Information Request(15)",
      "16": "Information Reply(16)",
      "17": "Address Mask Request(17)",
      "18": "Address Mask Reply(18)",
      "30": "Traceroute(30)",
      "31": "Datagram Conversion Error(31)",
      "32": "Mobile Host Redirect(32)",
      "33": "Where Are You(33)",
      "34": "Here I Am(34)",
      "35": "Mobile Registration Request(35)",
      "36": "Mobile Registration Reply(36)",
      "37": "Domain Name Request(37)",
      "38": "Domain Name Reply(38)",
      "39": "SKIP Algorithm Discovery Protocol(39)",
      "40": "Photuris Security Failures(40)",
      "-1": "All(-1)"
    };
    icmpCodeMap = {
      "3": {
        "-1": "All(-1)",
        "0": "destination network unreachable(0)",
        "1": "destination host unreachable(1)",
        "2": "destination protocol unreachable(2)",
        "3": "destination port unreachable(3)",
        "4": "fragmentation required and DF flag set(4)",
        "5": "source route failed(5)",
        "6": "destination network unknown(6)",
        "7": "destination host unknown(7)",
        "8": "source host isolated(8)",
        "9": "network administratively prohibited(9)",
        "10": "host administratively prohibited(10)",
        "11": "network unreachable for TOS(11)",
        "12": "host unreachable for TOS(12)",
        "13": "communication administratively prohibited(13)"
      },
      "5": {
        "-1": "All(-1)",
        "0": "redirect datagram for the network(0)",
        "1": "redirect datagram for the host(1)",
        "2": "redirect datagram for the TOS & network(2)",
        "3": "redirect datagram for the TOS & host(3)"
      },
      "11": {
        "-1": "All(-1)",
        "0": "TTL expired transit(0)",
        "1": "fragmentation reasembly time exceeded(1)"
      },
      "12": {
        "-1": "All(-1)",
        "0": "pointer indicates the error(0)",
        "1": "missing a required option(1)",
        "2": "bad length(2)"
      }
    };
    ACLModel = PropertyModel.extend({
      init: function(uid) {
        var aclObj, assos;
        aclObj = Design.instance().component(uid);
        assos = _.map(aclObj.connectionTargets("AclAsso"), function(subnet) {
          return {
            name: subnet.get('name'),
            cidr: subnet.get('cidr')
          };
        });
        this.set({
          uid: uid,
          isDefault: aclObj.isDefault(),
          appId: aclObj.get("appId"),
          name: aclObj.get("name"),
          vpcId: Design.modelClassForType(constant.RESTYPE.VPC).theVPC().get("appId"),
          rules: null,
          isApp: this.isApp,
          associations: _.sortBy(assos, name)
        });
        this.getRules();
        this.sortRules();
        return null;
      },
      getRules: function() {
        var isApp, isDefault, rules;
        rules = $.extend(true, [], Design.instance().component(this.get("uid")).get("rules"));
        isDefault = this.get("isDefault");
        isApp = this.isApp;
        _.each(rules, function(rule) {
          var codeStr, err, typeCodeStrAry, typeStr;
          if (!rule.port) {
            rule.port = "All";
          }
          if (rule.number === 32767) {
            rule.number = "*";
            rule.readOnly = true;
          } else if ((rule.number === 100 && isDefault) || isApp) {
            rule.readOnly = true;
          }
          switch (rule.protocol) {
            case -1:
              rule.protocol = "ALL";
              break;
            case 1:
              rule.protocol = "ICMP";
              break;
            case 6:
              rule.protocol = "TCP";
              break;
            case 17:
              rule.protocol = "UDP";
          }
          rule.tooltip = 'Port';
          try {
            if (rule.protocol === 'ICMP') {
              typeCodeStrAry = rule.port.split('/');
              typeStr = '';
              if (typeCodeStrAry[0]) {
                typeStr = icmpTypeMap[typeCodeStrAry[0]];
              }
              codeStr = '';
              if (typeCodeStrAry[1]) {
                if (icmpCodeMap[typeCodeStrAry[0]]) {
                  codeStr = icmpCodeMap[typeCodeStrAry[0]][typeCodeStrAry[1]];
                } else {
                  codeStr = "All(-1)";
                }
              }
              if (typeStr && !codeStr) {
                rule.tooltip = 'Type: ' + typeStr;
              } else if (typeStr && codeStr) {
                rule.tooltip = 'Type: ' + typeStr + ', ' + 'Code: ' + codeStr;
              }
            } else {
              rule.tooltip = 'Port: ' + rule.port;
            }
          } catch (_error) {
            err = _error;
            console.log('ERR: icmp code type parse faild.');
          }
          return null;
        });
        return this.set("rules", rules);
      },
      sortRules: function() {
        var compare, key;
        key = this.get("sortKey") || "number";
        if (key === "number") {
          compare = function(a, b) {
            var a_n, b_n;
            a_n = parseInt(a.number, 10) || -1;
            b_n = parseInt(b.number, 10) || -1;
            if (a_n > b_n) {
              return 1;
            }
            if (a_n === b_n) {
              return 0;
            }
            if (a_n < b_n) {
              return -1;
            }
          };
        } else {
          compare = function(a, b) {
            if (a[key] > b[key]) {
              return 1;
            }
            if (a[key] === b[key]) {
              return 0;
            }
            if (a[key] < b[key]) {
              return -1;
            }
          };
        }
        this.attributes.rules = this.attributes.rules.sort(compare);
        return null;
      },
      setSortOption: function(key) {
        this.set("sortKey", key);
        this.sortRules();
        return null;
      },
      removeAclRule: function(ruleId) {
        return Design.instance().component(this.get("uid")).removeRule(ruleId);
      },
      addAclRule: function(ruleObj) {
        Design.instance().component(this.get("uid")).addRule(ruleObj);
        this.getRules();
        this.sortRules();
        this.trigger("REFRESH_RULE_LIST");
        return null;
      },
      checkRuleNumber: function(rulenumber) {
        var rule;
        rulenumber = parseInt(rulenumber, 10);
        if (!((0 < rulenumber && rulenumber < 32768))) {
          return lang.ide.PARSLEY_VALID_RULE_NUMBER_1_TO_32767;
        }
        if (this.get("isDefault") && rulenumber === 100) {
          return lang.ide.PARSLEY_RULE_NUMBER_100_HAS_EXISTED;
        }
        rule = _.find(Design.instance().component(this.get("uid")).get("rules"), function(r) {
          return r.number === rulenumber;
        });
        if (rule) {
          return sprintf(lang.ide.PARSLEY_RULENUMBER_ALREADY_EXISTS, rulenumber);
        }
        return true;
      }
    });
    return new ACLModel();
  });

}).call(this);

define('module/design/property/acl/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <section class=\"property-control-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_APP_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.appId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_APP_IS_DEFAULT", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.isDefault)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_APP_VPC_ID", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.vpcId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n  </section>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <section class=\"property-control-group\" data-bind=\"true\">\n    <label class=\"left\" for=\"property-acl-name\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_LBL_NAME", {hash:{},data:data}))
    + "</label>\n    <span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LBL_REQUIRED", {hash:{},data:data}))
    + "</span>\n    <input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isDefault), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " id=\"property-acl-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n  </section>\n  ";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "\n    <a href=\"#\" class=\"icon-add add-rule tooltip action-link\" id=\"acl-add-rule-icon\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_BTN_CREATE_NEW_RULE", {hash:{},data:data}))
    + "'></a>\n    ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " ("
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</li>";
  return buffer;
  }

  buffer += "<article>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  <div class=\"option-group-head acl-header expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_TIT_RULE", {hash:{},data:data}))
    + "\n    <span class=\"property-head-num-wrap\">(<span id=\"acl-rule-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rules)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isApp), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  <div class=\"option-group\">\n    <div class=\"rule-list-sort property-control-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_RULE_SORT_BY", {hash:{},data:data}))
    + "</h5>\n      <div class=\"selectbox\" id=\"acl-sort-rule-select\">\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_RULE_SORT_BY_NUMBER", {hash:{},data:data}))
    + "</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n          <li data-id=\"number\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_RULE_SORT_BY_NUMBER", {hash:{},data:data}))
    + "</li>\n          <li data-id=\"action\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_RULE_SORT_BY_ACTION", {hash:{},data:data}))
    + "</li>\n          <li data-id=\"direction\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_RULE_SORT_BY_DIRECTION", {hash:{},data:data}))
    + "</li>\n          <li data-id=\"source/destination\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_RULE_SORT_BY_SRC_DEST", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </div>\n    </div>\n    <ul class=\"property-list acl-rule-list\" id=\"acl-rule-list\">"
    + escapeExpression(((stack1 = (depth0 && depth0.acl_list)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</ul>\n  </div>\n\n  <div class=\"option-group-head acl-header expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_TIT_ASSOC", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"acl-assn-count\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.associations)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>)</span>\n  </div>\n\n  <ul class=\"option-group property-list\">";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.associations), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</article>\n\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/acl/template/rule_item',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <div class=\"acl-rule-number\"><span class=\"tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_TIP_RULE_NUMBER", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.number)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n\n  <div class=\"acl-rule-details\">\n    <div class=\"rule-list-row\">\n      <div class=\"acl-rule-allow-cb tooltip icon-"
    + escapeExpression(((stack1 = (depth0 && depth0.action)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip='";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.action), "deny", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></div>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.egress), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      <span class=\"tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_TIP_CIDR_BLOCK", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    </div>\n    <div class=\"rule-list-row\">\n      <div><span class=\"rule-protocol tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_TIP_PROTOCOL", {hash:{},data:data}))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.protocol)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n      <div class=\"tooltip\" data-tooltip='"
    + escapeExpression(((stack1 = (depth0 && depth0.tooltip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "'>"
    + escapeExpression(((stack1 = (depth0 && depth0.port)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </div>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.readOnly), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n</li>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP_ACL_TIP_ACTION_DENY", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program4(depth0,data) {
  
  var stack1;
  stack1 = helpers.i18n.call(depth0, "PROP_ACL_TIP_ACTION_ALLOW", {hash:{},data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"icon-outbound tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "PROP_ACL_TIP_OUTBOUND", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></span>\n      ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"icon-inbound tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "PROP_ACL_TIP_INBOUND", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></span>\n      ";
  return buffer;
  }

function program10(depth0,data) {
  
  var buffer = "";
  buffer += "<a class=\"icon-remove rule-remove-icon tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ACL_TIP_REMOVE_RULE", {hash:{},data:data}))
    + "'></a>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/acl/template/dialog',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<li class=\"item tooltip\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cidr)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><div class=\"main truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div></li>\n			";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n			  <li class=\"item\" data-id=\"custom\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</li>\n			  <li class=\"item\" data-id=\"all\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_ALL", {hash:{},data:data}))
    + "</li>\n			  ";
  return buffer;
  }

  buffer += "<div id=\"modal-acl-rule\" data-bind=\"true\">\n  <div class=\"modal-header\"><h3>"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_TITLE_ADD", {hash:{},data:data}))
    + "</h3><i class=\"modal-close\">&times;</i></div>\n  <div class=\"modal-body\" style=\"width:450px;\">\n	<div class=\"modal-control-group clearfix\">\n	  <label class=\"label-short\" for=\"modal-acl-number\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_RULE_NUMBER", {hash:{},data:data}))
    + "</label>\n	  <div class=\"prefix-input left\">\n  		<label for=\"modal-acl-number\">#</label>\n  		<input class=\"input\" type=\"text\" id=\"modal-acl-number\" required data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*$\" data-required=\"true\" autofocus>\n	  </div>\n	</div>\n	<div class=\"modal-control-group clearfix\">\n		<label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_ACTION", {hash:{},data:data}))
    + "</label>\n		<div class=\"radio-group-horizontal\">\n			<div class=\"radio\">\n				<input type=\"radio\" id=\"acl-add-model-action-allow\" checked=\"checked\" name=\"acl-add-model-action-select\"/>\n				<label for=\"acl-add-model-action-allow\"></label>\n			</div>\n			<label class=\"radio-label\" for=\"acl-add-model-action-allow\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_ACTION_ALLOW", {hash:{},data:data}))
    + "</label>\n		</div>\n		<div class=\"radio-group-horizontal\">\n			<div class=\"radio\">\n				<input type=\"radio\" id=\"acl-add-model-action-deny\" name=\"acl-add-model-action-select\"/>\n				<label for=\"acl-add-model-action-deny\"></label>\n			</div>\n			<label class=\"radio-label\" for=\"acl-add-model-action-deny\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_ACTION_DENY", {hash:{},data:data}))
    + "</label>\n		</div>\n	</div>\n	<div class=\"modal-control-group clearfix\">\n		<label class=\"label-short\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_DIRECTION", {hash:{},data:data}))
    + "</label>\n		<div class=\"radio-group-horizontal\">\n			<div class=\"radio\">\n				<input type=\"radio\" id=\"acl-add-model-direction-inbound\" checked=\"checked\" name=\"acl-add-model-direction-select\"/>\n				<label for=\"acl-add-model-direction-inbound\"></label>\n			</div>\n			<label class=\"radio-label\" for=\"acl-add-model-direction-inbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_INBOUND", {hash:{},data:data}))
    + "</label>\n		</div>\n		<div class=\"radio-group-horizontal\">\n			<div class=\"radio\">\n				<input type=\"radio\" id=\"acl-add-model-direction-outbound\" name=\"acl-add-model-direction-select\"/>\n				<label for=\"acl-add-model-direction-outbound\"></label>\n			</div>\n			<label class=\"radio-label\" for=\"acl-add-model-direction-outbound\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_OUTBOUND", {hash:{},data:data}))
    + "</label>\n		</div>\n	</div>\n	<div class=\"modal-control-group acl-source-dest clearfix\">\n	  <label class=\"label-short\" id=\"acl-add-model-bound-label\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_SOURCE", {hash:{},data:data}))
    + "</label>\n		<div class=\"selectbox\" id=\"acl-add-model-source-select\">\n			<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</div>\n			<ul class=\"dropdown\">\n			<li class=\"item tooltip selected\" data-id=\"custom\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_CUSTOM", {hash:{},data:data}))
    + "</li>\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.subnets), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n	  </div>\n	  <input class=\"input\" type=\"text\" id=\"modal-acl-source-input\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9./]*$\" data-required=\"true\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PLACEHOLD_SOURCE", {hash:{},data:data}))
    + "' >\n	</div>\n\n	<div class=\"modal-control-group clearfix\">\n	  <label class=\"label-short\" >"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_PROTOCOL", {hash:{},data:data}))
    + "</label>\n		  <div class=\"selectbox modal-protocol-select\" id=\"modal-protocol-select\"  data-protocal-type=\"tcp\">\n			<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</div>\n			<ul class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" tabindex=\"-1\">\n			  <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n			  <li class=\"selected item\" data-id=\"tcp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_TCP", {hash:{},data:data}))
    + "</li>\n			  <li class=\"item\" data-id=\"udp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_UDP", {hash:{},data:data}))
    + "</li>\n			  <li class=\"item\" data-id=\"icmp\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PROTOCOL_ICMP", {hash:{},data:data}))
    + "</li>\n			  ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.classic), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ul>\n		  </div>\n\n	  <div id=\"sg-protocol-select-result\">\n		  <div class=\"sg-protocol-option-input show\" id=\"sg-protocol-tcp\">\n			<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n		  </div>\n		  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-udp\">\n			<input class=\"input\" type=\"text\" placeholder='"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_PLACEHOLD_PORT_RANGE", {hash:{},data:data}))
    + "' required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\"/>\n		  </div>\n		  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-icmp\">\n			<div class=\"selectbox\" id=\"protocol-icmp-main-select\" data-protocal-main=\"0\"  data-protocal-sub=\"-1\">\n			  <div class=\"selection\">Echo Reply(0)</div>\n			  <div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n				<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n				<ul tabindex=\"-1\" class=\"scroll-content\">\n				  <li class=\"item selected\" data-id=\"0\">Echo Reply(0)</li>\n				  <li class=\"item\" data-id=\"3\">Destination Unreachable(3) ...</li>\n				  <li class=\"item\" data-id=\"4\">Source Quench(4)</li>\n				  <li class=\"item\" data-id=\"5\">Redirect Message(5) ...</li>\n				  <li class=\"item\" data-id=\"6\">Alternate Host Address(6)</li>\n				  <li class=\"item\" data-id=\"8\">Echo Request(8)</li>\n				  <li class=\"item\" data-id=\"9\">Router Advertisement(9)</li>\n				  <li class=\"item\" data-id=\"10\">Router Solicitation(10)</li>\n				  <li class=\"item\" data-id=\"11\">Time Exceeded(11) ...</li>\n				  <li class=\"item\" data-id=\"12\">Parameter Problem: Bad IP header(12) ...</li>\n				  <li class=\"item\" data-id=\"13\">Timestamp(13)</li>\n				  <li class=\"item\" data-id=\"14\">Timestamp Reply(14)</li>\n				  <li class=\"item\" data-id=\"15\">Information Request(15)</li>\n				  <li class=\"item\" data-id=\"16\">Information Reply(16)</li>\n				  <li class=\"item\" data-id=\"17\">Address Mask Request(17)</li>\n				  <li class=\"item\" data-id=\"18\">Address Mask Reply(18)</li>\n				  <li class=\"item\" data-id=\"30\">Traceroute(30)</li>\n				  <li class=\"item\" data-id=\"31\">Datagram Conversion Error(31)</li>\n				  <li class=\"item\" data-id=\"32\">Mobile Host Redirect(32)</li>\n				  <li class=\"item\" data-id=\"33\">Where Are You(33)</li>\n				  <li class=\"item\" data-id=\"34\">Here I Am(34)</li>\n				  <li class=\"item\" data-id=\"35\">Mobile Registration Request(35)</li>\n				  <li class=\"item\" data-id=\"36\">Mobile Registration Reply(36)</li>\n				  <li class=\"item\" data-id=\"37\">Domain Name Request(37)</li>\n				  <li class=\"item\" data-id=\"38\">Domain Name Reply(38)</li>\n				  <li class=\"item\" data-id=\"39\">SKIP Algorithm Discovery Protocol(39)</li>\n				  <li class=\"item\" data-id=\"40\">Photuris Security Failures(40)</li>\n				  <li class=\"item\" data-id=\"-1\">All(-1)</li>\n				</ul>\n			  </div>\n		  </div>\n		  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-3\">\n			<div class=\"selection\">All(-1)</div>\n			<div class=\"dropdown scroll-wrap scrollbar-auto-hide context-wrap\" style=\"height:300px;\">\n				<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n				<ul class=\"scroll-content\" tabindex=\"-1\">\n				  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n				  <li class=\"item\" data-id=\"0\">destination network unreachable(0)</li>\n				  <li class=\"item\" data-id=\"1\">destination host unreachable(1)</li>\n				  <li class=\"item\" data-id=\"2\">destination protocol unreachable(2)</li>\n				  <li class=\"item\" data-id=\"3\">destination port unreachable(3)</li>\n				  <li class=\"item\" data-id=\"4\">fragmentation required and DF flag set(4)</li>\n				  <li class=\"item\" data-id=\"5\">source route failed(5)</li>\n				  <li class=\"item\" data-id=\"6\">destination network unknown(6)</li>\n				  <li class=\"item\" data-id=\"7\">destination host unknown(7)</li>\n				  <li class=\"item\" data-id=\"8\">source host isolated(8)</li>\n				  <li class=\"item\" data-id=\"9\">network administratively prohibited(9)</li>\n				  <li class=\"item\" data-id=\"10\">host administratively prohibited(10)</li>\n				  <li class=\"item\" data-id=\"11\">network unreachable for TOS(11)</li>\n				  <li class=\"item\" data-id=\"12\">host unreachable for TOS(12)</li>\n				  <li class=\"item\" data-id=\"13\">communication administratively prohibited(13)</li>\n				</ul>\n			</div>\n		  </div>\n		  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-5\">\n			<div class=\"selection\">All(-1)</div>\n			<ul class=\"dropdown\" tabindex=\"-1\">\n			  <li class=\"selected item\" data-id=\"-1\">All(-1)</li>\n			  <li class=\"item\" data-id=\"0\">redirect datagram for the network(0)</li>\n			  <li class=\"item\" data-id=\"1\">redirect datagram for the host(1)</li>\n			  <li class=\"item\" data-id=\"2\">redirect datagram for the TOS & network(2)</li>\n			  <li class=\"item\" data-id=\"3\">redirect datagram for the TOS & host(3)</li>\n			</ul>\n		  </div>\n		  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-11\">\n			<div class=\"selection\">All(-1)</div>\n			<ul class=\"dropdown\" tabindex=\"-1\">\n			  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n			  <li class=\"item\" data-id=\"0\">TTL expired transit(0)</li>\n			  <li class=\"item\" data-id=\"1\">fragmentation reasembly time exceeded(1)</li>\n			</ul>\n		  </div>\n		  <div class=\"selectbox protocol-icmp-sub-select\" id=\"protocol-icmp-sub-select-12\">\n			<div class=\"selection\">All(-1)</div>\n			<ul class=\"dropdown\" role=\"menu\">\n			  <li class=\"item selected\" data-id=\"-1\">All(-1)</li>\n			  <li class=\"item\" data-id=\"0\">pointer indicates the error(0)</li>\n			  <li class=\"item\" data-id=\"1\">missing a required option(1)</li>\n			  <li class=\"item\" data-id=\"2\">bad length(2)</li>\n			</ul>\n		  </div>\n		  </div>\n		  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-custom\">\n				<input class=\"input\" type=\"string\" value=\"1\" min=\"1\" max=\"255\" required=\"\" required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\" data-required=\"true\">\n		  </div>\n		  <div class=\"sg-protocol-option-input\" id=\"sg-protocol-all\" required data-ignore=\"true\" data-ignore-regexp=\"^[0-9-]*$\"> "
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_LBL_PORT_RANGE_ALL", {hash:{},data:data}))
    + " </div>\n	  </div>\n	  <ul class=\"simple-protocol-select\">\n			<li>SSH</li>\n			<li>SMTP</li>\n			<li>DNS</li>\n			<li>HTTP</li>\n			<li>POP3</li>\n			<li>IMAP</li>\n			<li>LDAP</li>\n			<li>HTTPS</li>\n			<li>SMTPS</li>\n			<li>IMAPS</li>\n			<li>POP3S</li>\n			<li>MS SQL</li>\n			<li>MYSQL</li>\n			<li>RDP</li>\n		</ul>\n	</div>\n\n  </div>\n  <div class=\"modal-footer\">\n	<button class=\"btn btn-blue\" id=\"acl-modal-rule-save-btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_BTN_SAVE", {hash:{},data:data}))
    + "</button>\n	<button class=\"btn btn-silver modal-close\">"
    + escapeExpression(helpers.i18n.call(depth0, "POP_ACLRULE_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n  </div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/acl/view',['../base/view', 'Design', 'constant', './template/stack', './template/rule_item', './template/dialog', 'i18n!nls/lang.js'], function(PropertyView, Design, constant, htmlTpl, ruleTpl, rulePopupTpl, lang) {
    var ACLView;
    ACLView = PropertyView.extend({
      events: {
        'change #property-acl-name': 'aclNameChanged',
        'click #acl-add-rule-icon': 'showCreateRuleModal',
        'OPTION_CHANGE #acl-sort-rule-select': 'sortAclRule',
        'click .acl-rule-details .rule-remove-icon': 'removeAclRule'
      },
      render: function() {
        this.$el.html(htmlTpl(this.model.attributes));
        this.refreshRuleList();
        return this.model.attributes.name;
      },
      aclNameChanged: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "ACL")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      sortAclRule: function(event) {
        var sg_rule_list, sortType;
        sg_rule_list = $('#acl-rule-list');
        sortType = $(event.target).find('.selected').attr('data-id');
        this.model.setSortOption(sortType);
        this.refreshRuleList();
        return null;
      },
      refreshRuleList: function() {
        $('#acl-rule-list').html(ruleTpl(this.model.attributes.rules));
        $('#acl-rule-count').text(this.model.attributes.rules.length);
        return null;
      },
      removeAclRule: function(event) {
        var $target, ruleId;
        $target = $(event.currentTarget).closest("li");
        ruleId = $target.attr("data-uid");
        if (this.model.removeAclRule(ruleId)) {
          $target.remove();
        }
        return null;
      },
      showCreateRuleModal: function() {
        var SubnetModel, data;
        SubnetModel = Design.modelClassForType(constant.RESTYPE.SUBNET);
        data = {
          classic: false,
          subnets: _.map(SubnetModel.allObjects(), function(subnet) {
            return {
              name: subnet.get("name"),
              cidr: subnet.get("cidr")
            };
          })
        };
        modal(rulePopupTpl(data));
        $("#acl-modal-rule-save-btn").on("click", _.bind(this.saveRule, this));
        $("#acl-add-model-source-select").on("OPTION_CHANGE", this.modalRuleSourceSelected);
        $("#modal-protocol-select").on("OPTION_CHANGE", this.modalRuleProtocolSelected);
        $("#protocol-icmp-main-select").on("OPTION_CHANGE", this.modalRuleICMPSelected);
        $("#acl-add-model-direction-outbound").on("change", this.changeBoundInModal);
        $("#acl-add-model-direction-inbound").on("change", this.changeBoundInModal);
        $('.simple-protocol-select li').on('click', this.clickSimpleProtocolSelect);
        return false;
      },
      saveRule: function() {
        var $custom_source_dom, $protocol_dom, $rule_number_dom, icmpCode, icmpType, needValidate, number, port, protocol, result, source, validateMap;
        $rule_number_dom = $('#modal-acl-number');
        number = $('#modal-acl-number').val();
        result = this.model.checkRuleNumber(number);
        $rule_number_dom.parsley('custom', function(val) {
          if (_.isString(result)) {
            return result;
          } else {
            return null;
          }
        });
        if (!$rule_number_dom.parsley('validate')) {
          return;
        }
        source = $('#acl-add-model-source-select').find('.selected').attr('data-id');
        if (source === "custom") {
          $custom_source_dom = $('#modal-acl-source-input');
          $custom_source_dom.parsley('custom', function(val) {
            if (!MC.validate('cidr', val)) {
              return lang.ide.PARSLEY_MUST_BE_CIDR_BLOCK;
            }
            return null;
          });
          if (!$custom_source_dom.parsley('validate')) {
            return;
          }
          source = $custom_source_dom.val();
        }
        $protocol_dom = $('#modal-protocol-select').find('.selected');
        protocol = $protocol_dom.attr('data-id');
        validateMap = {
          'tcp': {
            dom: $('#sg-protocol-tcp input'),
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return 'Must be a valid format of port range.';
              }
              if (!MC.validate.portValidRange(portAry)) {
                return 'Port range needs to be a number or a range of numbers between 0 and 65535.';
              }
              return null;
            }
          },
          'udp': {
            dom: $('#sg-protocol-udp input'),
            method: function(val) {
              var portAry;
              portAry = [];
              portAry = MC.validate.portRange(val);
              if (!portAry) {
                return 'Must be a valid format of port range.';
              }
              if (!MC.validate.portValidRange(portAry)) {
                return 'Port range needs to be a number or a range of numbers between 0 and 65535.';
              }
              return null;
            }
          },
          'custom': {
            dom: $('#sg-protocol-custom input'),
            method: function(val) {
              if (!MC.validate.port(val)) {
                return 'Must be a valid format of port.';
              }
              return null;
            }
          }
        };
        if (validateMap[protocol]) {
          needValidate = validateMap[protocol];
          needValidate.dom.parsley('custom', needValidate.method);
          if (!needValidate.dom.parsley('validate')) {
            return;
          }
        }
        if (protocol === 'tcp') {
          port = $('#sg-protocol-' + protocol + ' input').val();
          protocol = "6";
        } else if (protocol === 'udp') {
          port = $('#sg-protocol-' + protocol + ' input').val();
          protocol = '17';
        } else if (protocol === 'icmp') {
          icmpType = $('#protocol-icmp-main-select').find('.selected').attr('data-id');
          icmpCode = $('#protocol-icmp-sub-select-' + icmpType).find('.selected').attr('data-id') || "-1";
          protocol = '1';
          port = icmpType + "/" + icmpCode;
        } else if (protocol === 'custom') {
          protocol = $('#sg-protocol-' + protocol + ' input').val();
          port = "";
        } else if (protocol === 'all') {
          protocol = '-1';
          port = '';
        }
        this.model.addAclRule({
          number: number,
          action: $('#acl-add-model-action-allow').is(':checked') ? "allow" : "deny",
          egress: $('#acl-add-model-direction-outbound').is(':checked'),
          cidr: source,
          protocol: protocol,
          port: port
        });
        modal.close();
        return null;
      },
      modalRuleSourceSelected: function(event) {
        var value;
        value = $.trim($(event.target).find('.selected').attr('data-id'));
        if (value === 'custom') {
          $('#modal-acl-source-input').show();
          return $('#acl-add-model-source-select .selection').width(68);
        } else {
          $('#modal-acl-source-input').hide();
          return $('#acl-add-model-source-select .selection').width(322);
        }
      },
      modalRuleProtocolSelected: function(event) {
        var icmpSelectElem, icmpSelectedValue, protocolSelectElem, selectedValue;
        protocolSelectElem = $(event.target);
        selectedValue = protocolSelectElem.find('.selected').attr('data-id');
        if (selectedValue) {
          $('#sg-protocol-custom').hide();
          $('#sg-protocol-all').hide();
          $('#sg-protocol-select-result .sg-protocol-option-input').hide();
          $('#sg-protocol-' + selectedValue).show();
          icmpSelectElem = $('#protocol-icmp-main-select');
          icmpSelectedValue = icmpSelectElem.find('.selected').attr('data-id');
          if (icmpSelectedValue !== '3' && icmpSelectedValue !== '5' && icmpSelectedValue !== '11' && icmpSelectedValue !== '12') {
            $('.protocol-icmp-sub-select').hide();
          }
        }
        return null;
      },
      modalRuleICMPSelected: function(event) {
        var icmpSelectElem, selectedValue, subSelectElem;
        icmpSelectElem = $(event.target);
        selectedValue = icmpSelectElem.find('.selected').attr('data-id');
        subSelectElem = $('#protocol-icmp-sub-select-' + selectedValue);
        $('.protocol-icmp-sub-select').hide();
        subSelectElem.show();
        return null;
      },
      changeBoundInModal: function(event) {
        var inbound;
        inbound = $('#acl-add-model-direction-inbound').prop('checked');
        if (inbound) {
          return $('#acl-add-model-bound-label').text(lang.ide.POP_ACLRULE_LBL_SOURCE);
        } else {
          return $('#acl-add-model-bound-label').text(lang.ide.POP_ACLRULE_LBL_DEST);
        }
      },
      clickSimpleProtocolSelect: function(event) {
        var protocolMap, protocolName, protocolPort, toggleToProtocol;
        protocolName = $(event.currentTarget).text();
        toggleToProtocol = function(protocolName) {
          var protocolNameLowerCase, selectBox;
          protocolNameLowerCase = protocolName.toLowerCase();
          selectBox = $('#modal-protocol-select');
          selectBox.find('li.item').removeClass('selected');
          selectBox.find('li.item[data-id=' + protocolNameLowerCase + ']').addClass('selected');
          selectBox.find('.selection').text(protocolName);
          return selectBox.trigger('OPTION_CHANGE');
        };
        protocolMap = {
          'SSH': 22,
          'SMTP': 25,
          'DNS': 53,
          'HTTP': 80,
          'POP3': 110,
          'IMAP': 143,
          'LDAP': 289,
          'HTTPS': 443,
          'SMTPS': 465,
          'IMAPS': 993,
          'POP3S': 995,
          'MS SQL': 1433,
          'MYSQL': 3306,
          'RDP': 3389
        };
        protocolPort = protocolMap[protocolName];
        if (protocolName === 'DNS') {
          toggleToProtocol('UDP');
          return $('#sg-protocol-udp input').val(protocolPort);
        } else {
          toggleToProtocol('TCP');
          return $('#sg-protocol-tcp input').val(protocolPort);
        }
      }
    });
    return new ACLView();
  });

}).call(this);

(function() {
  define('module/design/property/acl/main',["../base/main", './model', './view', 'event'], function(PropertyModule, model, view) {
    var AclModule;
    model.on('REFRESH_RULE_LIST', function() {
      return view.refreshRuleList();
    });
    AclModule = PropertyModule.extend({
      subPanelID: "ACL",
      initStack: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isApp = true;
        this.view = view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('module/design/property/launchconfig/model',['../base/model', 'keypair_model', 'constant', 'Design'], function(PropertyModel, keypair_model, constant, Design) {
    var LaunchConfigModel;
    LaunchConfigModel = PropertyModel.extend({
      initialize: function() {
        var me;
        me = this;
        return this.on('EC2_KPDOWNLOAD_RETURN', function(result) {
          var keypairname, region_name;
          region_name = result.param[3];
          keypairname = result.param[4];
          if (me.get("keyName") !== keypairname) {
            return;
          }

          /*
           * The EC2_KPDOWNLOAD_RETURN event won't fire when the result.is_error
           * is true. According to bugs in service models.
           */
          me.trigger("KP_DOWNLOADED", result.resolved_data);
          return null;
        });
      },
      downloadKP: function(keypairname) {
        var session, username;
        username = $.cookie("usercode");
        session = $.cookie("session_id");
        keypair_model.download({
          sender: this
        }, username, session, Design.instance().region(), keypairname);
        return null;
      },
      init: function(uid) {
        var agentData, data, design, rootDevice;
        this.lc = Design.instance().component(uid);
        data = this.lc.toJSON();
        data.uid = uid;
        data.isEditable = this.isAppEdit;
        data.app_view = Design.instance().modeIsAppView();
        this.set(data);
        this.set("displayAssociatePublicIp", true);
        this.set("monitorEnabled", this.isMonitoringEnabled());
        this.set("can_set_ebs", this.lc.isEbsOptimizedEnabled());
        this.getInstanceType();
        this.getAmi();
        this.getKeyPair();
        design = Design.instance();
        agentData = design.get('agent');
        this.set("stackAgentEnable", agentData.enabled);
        if (this.isApp) {
          this.getAppLaunch(uid);
          this.set('keyName', this.lc.connectionTargets('KeypairUsage')[0].get("appId"));
          rootDevice = this.lc.getBlockDeviceMapping();
          if (rootDevice.length === 1) {
            this.set("rootDevice", rootDevice[0]);
          }
          return;
        }
        return null;
      },
      getInstanceType: function(uid, data) {
        var instanceType, instance_type_list, view_instance_type;
        instance_type_list = MC.aws.ami.getInstanceType(this.lc.getAmi());
        if (instance_type_list) {
          instanceType = this.lc.get('instanceType');
          view_instance_type = _.map(instance_type_list, function(value) {
            return {
              main: constant.INSTANCE_TYPE[value][0],
              ecu: constant.INSTANCE_TYPE[value][1],
              core: constant.INSTANCE_TYPE[value][2],
              mem: constant.INSTANCE_TYPE[value][3],
              name: value,
              selected: instanceType === value
            };
          });
        }
        this.set("instance_type", view_instance_type);
        return null;
      },
      isMonitoringEnabled: function() {
        var p, _i, _len, _ref;
        _ref = this.lc.parent().get("policies");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          if (p.get("alarmData").metricName === "StatusCheckFailed") {
            return false;
          }
        }
        return true;
      },
      setEbsOptimized: function(value) {
        return this.lc.set('ebsOptimized', value);
      },
      setCloudWatch: function(value) {
        return this.lc.set('monitoring', value);
      },
      setUserData: function(value) {
        return this.lc.set('userData', value);
      },
      setPublicIp: function(value) {
        this.lc.set("publicIp", value);
        if (value) {
          return Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
      },
      setInstanceType: function(value) {
        this.lc.setInstanceType(value);
        return this.lc.isEbsOptimizedEnabled();
      },
      getAmi: function() {
        var ami, ami_id, comp, data, rdEbs, rdName, rootDevice;
        ami_id = this.get("imageId");
        comp = Design.instance().component(this.get("uid"));
        ami = this.lc.getAmi();
        if (!ami) {
          data = {
            name: ami_id + " is not available.",
            icon: "ami-not-available.png",
            unavailable: true
          };
        } else {
          data = {
            name: ami.name,
            icon: ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png"
          };
        }
        this.set('instance_ami', data);
        if (ami && ami.blockDeviceMapping) {
          rdName = ami.rootDeviceName;
          rdEbs = ami.blockDeviceMapping[rdName];
          if (rdName && !rdEbs) {
            _.each(ami.blockDeviceMapping, function(value, key) {
              if (rdName.indexOf(key) !== -1 && !rdEbs) {
                rdEbs = value;
                return rdName = key;
              }
            });
            null;
          }
          rootDevice = {
            name: rdName,
            size: parseInt(comp.get("rdSize"), 10),
            iops: comp.get("rdIops")
          };
          if (rootDevice.size < 10) {
            rootDevice.iops = "";
            rootDevice.iopsDisabled = true;
          }
          this.set("rootDevice", rootDevice);
        }
        this.set("min_volume_size", comp.getAmiRootDeviceVolumeSize());
        return null;
      },
      getKeyPair: function() {
        var selectedKP;
        selectedKP = Design.instance().component(this.get("uid")).connectionTargets("KeypairUsage")[0];
        this.set("keypair", selectedKP.getKPList());
        return null;
      },
      addKP: function(kp_name) {
        var KpModel, kp, _i, _len, _ref;
        KpModel = Design.modelClassForType(constant.RESTYPE.KP);
        _ref = KpModel.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          kp = _ref[_i];
          if (kp.get("name") === kp_name) {
            return false;
          }
        }
        kp = new KpModel({
          name: kp_name
        });
        return kp.id;
      },
      deleteKP: function(kp_uid) {
        Design.instance().component(kp_uid).remove();
        return null;
      },
      setKP: function(kp_uid) {
        var design, instance;
        design = Design.instance();
        instance = design.component(this.get("uid"));
        design.component(kp_uid).assignTo(instance);
        return null;
      },
      isSGListReadOnly: function() {
        if (this.get('appId')) {
          return true;
        }
      },
      getAppLaunch: function(uid) {
        var lc_data;
        lc_data = MC.data.resource_list[Design.instance().region()][this.lc.get('appId')];
        this.set("ebsOptimized", this.lc.get("ebsOptimized") + "");
        this.set('name', this.lc.get('name'));
        this.set('lc', lc_data);
        this.set('uid', uid);
        return null;
      },
      getStateData: function() {
        return Design.instance().component(this.get("uid")).getStateData();
      },
      setIops: function(iops) {
        Design.instance().component(this.get("uid")).set("rdIops", iops);
        return null;
      },
      setVolumeSize: function(size) {
        Design.instance().component(this.get("uid")).set("rdSize", size);
        return null;
      }
    });
    return new LaunchConfigModel();
  });

}).call(this);

define('module/design/property/launchconfig/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "style=\"color:red;\"";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TYPE", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox selectbox-mega\" id=\"instance-type-select\">\n				<div class=\"selection\"></div>\n				<ul class=\"dropdown\">\n					";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_type), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</ul>\n			</div>\n		</section>\n		";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<li class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "tooltip item\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n						<div class=\"main  truncate\">"
    + escapeExpression(((stack1 = (depth0 && depth0.main)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n						<div class=\"sub\"><span>"
    + escapeExpression(((stack1 = (depth0 && depth0.ecu)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.core)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span> <span>"
    + escapeExpression(((stack1 = (depth0 && depth0.mem)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span></div>\n					</li>\n					";
  return buffer;
  }
function program5(depth0,data) {
  
  
  return "selected ";
  }

function program7(depth0,data) {
  
  
  return "hide";
  }

function program9(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" checked=\"true\" name=\"ebs-optimized\" />\n				";
  }

function program11(depth0,data) {
  
  
  return "\n				<input id=\"property-instance-ebs-optimized\" type=\"checkbox\" value=\"None\" name=\"ebs-optimized\" />\n				";
  }

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							<li class=\"item";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.selected), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-using=\""
    + escapeExpression(((stack1 = (depth0 && depth0.using)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n							";
  stack1 = helpers['if'].call(depth0, (data == null || data === false ? data : data.index), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</li>\n							";
  return buffer;
  }
function program14(depth0,data) {
  
  
  return " selected";
  }

function program16(depth0,data) {
  
  
  return "<span class=\"icon-remove\"></span>";
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<section class=\"property-control-group\">\n				<div class=\"checkbox\">\n					<input id=\"property-instance-public-ip\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.publicIp), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-instance-public-ip\" />\n					<label for=\"property-instance-public-ip\"></label>\n				</div>\n				<label for=\"property-instance-public-ip\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ENI_AUTO_PUBLIC_IP", {hash:{},data:data}))
    + "</label>\n			</section>\n		";
  return buffer;
  }
function program19(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program21(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program22(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program24(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program26(depth0,data) {
  
  var buffer = "";
  buffer += "\n			<div class=\"property-info\"> User Data is disabled to allow installing OpsAgent for VisualOps. <a href=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_AGENT_USER_DATA_URL", {hash:{},data:data}))
    + "\" target=\"_blank\">View content</a>.\n			</div>\n			";
  return buffer;
  }

function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<label for=\"property-instance-user-data\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_USER_DATA", {hash:{},data:data}))
    + "</label>\n				<textarea id=\"property-instance-user-data\">"
    + escapeExpression(((stack1 = (depth0 && depth0.userData)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</textarea>\n			";
  return buffer;
  }

function program30(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head\">Root Device</div>\n	<div class=\"option-group\">\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</label>\n      <div>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    </section>\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</label>\n      <div class=\"ranged-number-input\">\n          <label for=\"volume-size-ranged\"></label>\n          <input id=\"volume-size-ranged\" type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"volume-size-ranged\" data-ignore=\"true\" maxlength=\"4\" data-required=\"true\" data-required=\"true\" data-type=\"number\"/>\n      <label for=\"volume-property-ranged-number\" >GB</label>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</label>\n      <div id=\"volume-type-radios\">\n      <div>\n      	<div class=\"radio\">\n          <input id=\"radio-standard\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"radio-standard\"></label>\n        </div>\n        <label for=\"radio-standard\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE_STANDARD", {hash:{},data:data}))
    + "</label>\n      </div>\n      <div ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(31, program31, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_MSG_WARN", {hash:{},data:data}))
    + "\">\n        <div class=\"radio\">\n          <input id=\"radio-iops\" type=\"radio\" name=\"volume-type\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iopsDisabled), {hash:{},inverse:self.noop,fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"radio-iops\"></label>\n        </div>\n        <label for=\"radio-iops\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE_IOPS", {hash:{},data:data}))
    + "</label>\n      </div>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\" id=\"iops-group\" ";
  stack1 = helpers.unless.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops), {hash:{},inverse:self.noop,fn:self.program(35, program35, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <label>IOPS</label>\n        <div class=\"ranged-number-input\">\n          <label for=\"iops-ranged\"></label>\n          <input id=\"iops-ranged\" type=\"text\" class=\"input\" min=\"100\" max=\"2000\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        </div>\n    </section>\n	</div>\n  ";
  return buffer;
  }
function program31(depth0,data) {
  
  
  return "class=\"tooltip\"";
  }

function program33(depth0,data) {
  
  
  return "disabled";
  }

function program35(depth0,data) {
  
  
  return "style=\"display:none\"";
  }

  buffer += "<article>\n\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LC_TITLE", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\" data-bind=\"true\">\n			<label class=\"left\" for=\"property-instance-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LC_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_REQUIRE", {hash:{},data:data}))
    + "</span>\n			<input class=\"input launch-configuration-name\"  type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" name=\"property-instance-name\" id=\"property-instance-name\" maxlength=\"240\" data-required-rollback=\"true\" data-ignore=\"true\"/>\n		</section>\n		<section class=\"property-control-group\">\n			<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI", {hash:{},data:data}))
    + "</label>\n			<div id=\"property-ami\" class=\"property-block-wrap clearfix\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n				<img class=\"property-ami-icon left\" src=\"./assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" / >\n				<div class=\"property-ami-label\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.unavailable), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.instance_ami)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			</div>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.instance_type)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<section class=\"property-control-group ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_set_ebs), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			<div class=\"checkbox\">\n				";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.ebsOptimized), {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<label for=\"property-instance-ebs-optimized\"></label>\n			</div>\n			<label for=\"property-instance-ebs-optimized\">EBS Optimized</label>\n		</section>\n		<section class=\"property-control-group\">\n			<label class=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</label>\n			<div class=\"selectbox\" id=\"keypair-select\">\n				<div class=\"selection\"></div>\n				<div style=\"height: 120px;\" class=\"dropdown scroll-wrap scrollbar-auto-hide  clearfix\">\n					<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n					<div class=\"scroll-content\">\n						<ul tabindex=\"-1\">\n							";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.keypair), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</ul>\n					</div>\n				</div>\n\n				<div class=\"editor\">\n					<a href=\"#\" class=\"editbtn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_NEW_KP", {hash:{},data:data}))
    + "</a>\n					<div class=\"edit\">\n						<button class=\"btn btn-blue btn-small\">OK</button>\n						<span class=\"fitfloat\">\n							<input class=\"input\" type=\"text\" placeholder=\"Key Pair Name\" />\n						</span>\n					</div>\n				</div>\n			</div>\n		</section>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.displayAssociatePublicIp), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_ADVANCED_DETAIL", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group\">\n			<div class=\"checkbox\">\n				<input id=\"property-instance-enable-cloudwatch\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.monitorEnabled), {hash:{},inverse:self.program(24, program24, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"None\" name=\"property-instance-enable-cloudwatch\" />\n				<label for=\"property-instance-enable-cloudwatch\"></label>\n			</div>\n			<label for=\"property-instance-enable-cloudwatch\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_CW_ENABLED", {hash:{},data:data}))
    + "</label>\n\n			<p class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.monitoring), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-info\" id=\"property-cloudwatch-warn\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_CW_WARN", {hash:{},data:data}))
    + "<a target=\"_blank\" href=\"http://aws.amazon.com/cloudwatch\">Amazon Cloud Watch product page</a></p>\n		</section>\n		<section class=\"property-control-group\">\n			";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stackAgentEnable), {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</section>\n	</div>\n\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/launchconfig/view',['../base/view', './template/stack', 'event', 'constant', 'i18n!nls/lang.js'], function(PropertyView, template, ide_event, constant, lang) {
    var LanchConfigView;
    LanchConfigView = PropertyView.extend({
      events: {
        'change .launch-configuration-name': 'lcNameChange',
        'change .instance-type-select': 'instanceTypeSelect',
        'change #property-instance-ebs-optimized': 'ebsOptimizedSelect',
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-user-data': 'userdataChange',
        'change #property-instance-public-ip': 'publicIpChange',
        'OPTION_CHANGE #instance-type-select': "instanceTypeSelect",
        'OPTION_CHANGE #keypair-select': "setKP",
        'EDIT_UPDATE #keypair-select': "addKP",
        "EDIT_FINISHED #keypair-select": "updateKPSelect",
        'click #property-ami': 'openAmiPanel',
        'click #volume-type-radios input': 'changeVolumeType',
        'keyup #iops-ranged': 'changeIops',
        'keyup #volume-size-ranged': 'sizeChanged'
      },
      changeVolumeType: function(event) {
        var $this, iops, volumeSize;
        $this = $(event.currentTarget);
        if ($this.is(":disabled")) {
          return;
        }
        $("#iops-group").toggle($this.attr("id") === "radio-iops");
        if ($this.attr("id") === "radio-iops") {
          volumeSize = parseInt($('#volume-size-ranged').val(), 10);
          iops = volumeSize * 10;
          return $("#iops-ranged").val(iops).keyup();
        } else {
          this.model.setIops("");
          return $("#iops-ranged").val("");
        }
      },
      changeIops: function() {
        if ($('#iops-ranged').parsley('validate')) {
          this.model.setIops($('#iops-ranged').val());
        }
        return null;
      },
      sizeChanged: function(event) {
        var $iops, iops, iopsDisabled, volumeSize;
        if (!$('#volume-size-ranged').parsley('validate')) {
          return;
        }
        volumeSize = parseInt($('#volume-size-ranged').val(), 10);
        this.model.setVolumeSize(volumeSize);
        if (volumeSize < 10) {
          this.model.setIops("");
          iopsDisabled = true;
        }
        $iops = $('#volume-type-radios').children("div").last().toggleClass("tooltip", iopsDisabled).find('input');
        if (iopsDisabled) {
          $iops.attr("disabled", "disabled");
          $("#radio-standard").click();
          $("#iops-group").hide();
        } else {
          $iops.removeAttr('disabled');
        }
        iops = parseInt($("#iops-ranged").val(), 10) || 0;
        if (iops) {
          if (iops > volumeSize * 10) {
            iops = volumeSize * 10;
            $("#iops-ranged").val(iops);
          }
          $("#iops-ranged").keyup();
        }
        return null;
      },
      render: function() {
        var me;
        this.$el.html(template(this.model.attributes));
        $("#keypair-select").on("click", ".icon-remove", _.bind(this.deleteKP, this));
        me = this;
        $('#volume-size-ranged').parsley('custom', function(val) {
          val = +val;
          if (!val || val > 1024 || val < me.model.attributes.min_volume_size) {
            return sprintf(lang.ide.PARSLEY_VOLUME_SIZE_OF_ROOTDEVICE_MUST_IN_RANGE, me.model.attributes.min_volume_size);
          }
        });
        $('#iops-ranged').parsley('custom', function(val) {
          var volume_size;
          val = +val;
          volume_size = parseInt($('#volume-size-ranged').val(), 10);
          if (val > 4000 || val < 100) {
            return lang.ide.PARSLEY_IOPS_MUST_BETWEEN_100_4000;
          } else if (val > 10 * volume_size) {
            return lang.ide.PARSLEY_IOPS_MUST_BE_LESS_THAN_10_TIMES_OF_VOLUME_SIZE;
          }
        });
        return this.model.attributes.name;
      },
      publicIpChange: function(event) {
        this.model.setPublicIp(event.currentTarget.checked);
        return null;
      },
      lcNameChange: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "LaunchConfiguration")) {
          this.model.setName(name);
          this.setTitle(name);
        }
        return null;
      },
      instanceTypeSelect: function(event, value) {
        var $ebs, has_ebs;
        has_ebs = this.model.setInstanceType(value);
        $ebs = $("#property-instance-ebs-optimized");
        $ebs.closest(".property-control-group").toggle(has_ebs);
        if (!has_ebs) {
          return $ebs.prop("checked", false);
        }
      },
      ebsOptimizedSelect: function(event) {
        this.model.setEbsOptimized(event.target.checked);
        return null;
      },
      cloudwatchSelect: function(event) {
        this.model.setCloudWatch(event.target.checked);
        return $("#property-cloudwatch-warn").toggle($("#property-instance-enable-cloudwatch").is(":checked"));
      },
      userdataChange: function(event) {
        return this.model.setUserData(event.target.value);
      },
      setKP: function(event, id) {
        return this.model.setKP(id);
      },
      addKP: function(event, id) {
        var result;
        result = this.model.addKP(id);
        if (!result) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_KEYPAIR_NAME_ALREADY_EXISTS);
          return result;
        }
      },
      updateKPSelect: function() {
        return $("#keypair-select").find(".item:last-child").append('<span class="icon-remove"></span>');
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $("#property-ami").attr("data-uid"));
        return null;
      },
      deleteKP: function(event) {
        var $li, data, me, removeKP, selected, using;
        me = this;
        $li = $(event.currentTarget).closest("li");
        selected = $li.hasClass("selected");
        using = using === "true" ? true : selected;
        removeKP = function() {
          $li.remove();
          if (selected) {
            $("#keypair-select").find(".item").eq(0).click();
          }
          return me.model.deleteKP($li.attr("data-id"));
        };
        if (using) {
          data = {
            title: "Delete Key Pair",
            confirm: "Delete",
            color: "red",
            body: "<p class='modal-text-major'>Are you sure to delete " + ($li.text()) + "?</p><p class='modal-text-minor'>Resources using this key pair will change automatically to use DefaultKP.</p>"
          };
          modal(MC.template.modalApp(data));
          $("#btn-confirm").one("click", function() {
            removeKP();
            return modal.close();
          });
        } else {
          removeKP();
        }
        return false;
      },
      disableUserDataInput: function(flag) {
        var $userDataInput;
        $userDataInput = $('#property-instance-user-data');
        if (flag === true) {
          $userDataInput.attr('disabled', 'disabled');
          return $userDataInput.addClass('tooltip').attr('data-tooltip', lang.ide.PROP_INSTANCE_USER_DATA_DISABLE);
        } else if (flag === false) {
          $userDataInput.removeAttr('disabled');
          return $userDataInput.removeClass('tooltip').removeAttr('data-tooltip');
        }
      }
    });
    return new LanchConfigView();
  });

}).call(this);

define('module/design/property/launchconfig/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dd><a href=\"#\" class=\"icon-download\" id=\"property-app-keypair\">"
    + escapeExpression(((stack1 = (depth0 && depth0.keyName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a></dd>\n      ";
  return buffer;
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head\">Root Device</div>\n  <div class=\"option-group\">\n    <article class=\"property-app\">\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_DEVICE_NAME", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.DeviceName), {hash:{},data:data}))
    + "</dd>\n      </dl>\n      <dl class=\"dl-vertical\">\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_TYPE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeType), {hash:{},data:data}))
    + "</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SIZE", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(helpers.emptyStr.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.VolumeSize), {hash:{},data:data}))
    + " GB</dd>\n        ";
  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </dl>\n    </article>\n  </div>\n  ";
  return buffer;
  }
function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_VOLUME_SNAPSHOT_ID", {hash:{},data:data}))
    + "</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.SnapshotId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <dt>IOPS</dt>\n        <dd>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.rootDevice)),stack1 == null || stack1 === false ? stack1 : stack1.Ebs)),stack1 == null || stack1 === false ? stack1 : stack1.Iops)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n        ";
  return buffer;
  }

  buffer += "<article class=\"property-app\">\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LC_TITLE", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LC_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, ((stack1 = (depth0 && depth0.lc)),stack1 == null || stack1 === false ? stack1 : stack1.CreatedTime), {hash:{},data:data}))
    + "</dd>\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_AMI", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageId)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.instanceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_KEY_PAIR", {hash:{},data:data}))
    + "</dt>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.app_view), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </dl>\n\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_EBS_OPTIMIZED", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.ebsOptimized)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<dd>\n    </dl>\n  </div>\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rootDevice), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_INSTANCE_SG_DETAIL", {hash:{},data:data}))
    + "<span class=\"property-head-num-wrap\">(<span id=\"property-head-sg-num\"></span>)</span></div>\n  <div class=\"option-group sg-group\"></div>\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/launchconfig/app_view',['../base/view', './template/app'], function(PropertyView, template) {
    var LCAppView;
    LCAppView = PropertyView.extend({
      events: {
        'click #property-app-keypair': 'downloadKeypair',
        'change #property-instance-enable-cloudwatch': 'cloudwatchSelect',
        'change #property-instance-user-data': 'userdataChange'
      },
      kpModalClosed: false,
      render: function() {
        var data;
        data = this.model.toJSON();
        this.$el.html(template(data));
        return data.name;
      },
      cloudwatchSelect: function(event) {
        this.model.setCloudWatch(event.target.checked);
        return $("#property-cloudwatch-warn").toggle($("#property-instance-enable-cloudwatch").is(":checked"));
      },
      userdataChange: function(event) {
        return this.model.setUserData(event.target.value);
      },
      downloadKeypair: function(event) {
        var keypair, me;
        keypair = $(event.currentTarget).html();
        this.model.downloadKP(keypair);
        modal(MC.template.modalDownloadKP({
          name: keypair
        }));
        me = this;
        $('#modal-wrap').on("closed", function() {
          me.kpModalClosed = true;
          return null;
        });
        this.kpModalClosed = false;
        return false;
      },
      updateKPModal: function(data) {
        if (!data) {
          modal.close();
          return;
        }
        if (this.kpModalClosed) {
          return;
        }
        $("#keypair-login").hide();
        $("#keypair-remote").hide();
        $("#keypair-public").hide();
        $("#keypair-rdp").hide();
        $("#keypair-kp-linux").attr("href", "data://text/plain;charset=utf8," + encodeURIComponent(data)).attr("download", $("#keypair-name").text() + ".pem");
        $("#keypair-private-key").val(data);
        $("#keypair-loading").hide();
        return $("#keypair-body-linux").show();
      }
    });
    return new LCAppView();
  });

}).call(this);

(function() {
  define('module/design/property/launchconfig/main',["../base/main", "./model", "./view", "./app_view", "../sglist/main", "constant", "event"], function(PropertyModule, model, view, app_view, sglist_main, constant, ide_event) {
    var LCModule;
    model.on("KP_DOWNLOADED", function(data, option) {
      return app_view.updateKPModal(data, option);
    });
    app_view.on("OPEN_AMI", function(id) {
      return PropertyModule.loadSubPanel("STATIC", id);
    });
    view.on("OPEN_AMI", function(id) {
      return PropertyModule.loadSubPanel("STATIC", id);
    });
    LCModule = PropertyModule.extend({
      handleTypes: constant.RESTYPE.LC,
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        return null;
      },
      initStack: function() {
        this.model = model;
        this.model.isApp = false;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      initApp: function() {
        this.model = model;
        this.model.isApp = true;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = true;
        this.view = app_view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('module/design/property/asg/model',['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var ASGConfigModel;
    ASGConfigModel = PropertyModel.extend({
      init: function(uid) {
        var component, data, lc, n;
        component = Design.instance().component(uid);
        if (component.type === "ExpandedAsg") {
          component = component.get("originalAsg");
        }
        data = component.toJSON();
        data.uid = uid;
        this.set(data);
        lc = component.get("lc");
        if (!lc) {
          this.set("emptyAsg", true);
          return;
        }
        this.set("has_elb", !!component.get("lc").connections("ElbAmiAsso").length);
        this.set("isEC2HealthCheck", component.isEC2HealthCheckType());
        this.set('detail_monitor', !!lc.get('monitoring'));
        n = component.getNotification();
        this.set("notification", n);
        this.set("has_notification", n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test);
        this.set("has_sns_sub", !!(Design.modelClassForType(constant.RESTYPE.SUBSCRIPTION).allObjects().length));
        this.set("policies", _.map(data.policies, function(p) {
          data = $.extend(true, {}, p.attributes);
          data.cooldown = Math.round(data.cooldown / 60);
          data.alarmData.period = Math.round(data.alarmData.period / 60);
          return data;
        }));
        return null;
      },
      setHealthCheckType: function(type) {
        return Design.instance().component(this.get("uid")).set("healthCheckType", type);
      },
      setASGMin: function(value) {
        return Design.instance().component(this.get("uid")).set("minSize", value);
      },
      setASGMax: function(value) {
        return Design.instance().component(this.get("uid")).set("maxSize", value);
      },
      setASGDesireCapacity: function(value) {
        return Design.instance().component(this.get("uid")).set("capacity", value);
      },
      setASGCoolDown: function(value) {
        return Design.instance().component(this.get("uid")).set("cooldown", value);
      },
      setHealthCheckGrace: function(value) {
        return Design.instance().component(this.get("uid")).set("healthCheckGracePeriod", value);
      },
      setNotification: function(notification) {
        return Design.instance().component(this.get("uid")).setNotification(notification);
      },
      setTerminatePolicy: function(policies) {
        Design.instance().component(this.get("uid")).set("terminationPolicies", policies);
        this.set("terminationPolicies", policies);
        return null;
      },
      delPolicy: function(uid) {
        Design.instance().component(uid).remove();
        return null;
      },
      isDupPolicyName: function(policy_uid, name) {
        return _.some(Design.instance().component(this.get("uid")).get("policies"), function(p) {
          if (p.id !== policy_uid && p.get('name') === name) {
            return true;
          }
        });
      },
      defaultScalingPolicyName: function() {
        var component, count, currentNames, name, policies;
        component = Design.instance().component(this.get("uid"));
        if (component.type === "ExpandedAsg") {
          component = component.get("originalAsg");
        }
        policies = component.get("policies");
        count = policies.length;
        name = "" + this.attributes.name + "-policy-" + count;
        currentNames = _.map(policies, function(policy) {
          return policy.get('name');
        });
        while (__indexOf.call(currentNames, name) >= 0) {
          name = "" + this.attributes.name + "-policy-" + (++count);
        }
        return name;
      },
      getPolicy: function(uid) {
        var data;
        data = $.extend(true, {}, Design.instance().component(uid).attributes);
        data.cooldown = Math.round(data.cooldown / 60);
        data.alarmData.period = Math.round(data.alarmData.period / 60);
        return data;
      },
      setPolicy: function(policy_detail) {
        var PolicyModel, alarmData, asg, policy;
        asg = Design.instance().component(this.get("uid"));
        if (asg.type === "ExpandedAsg") {
          asg = asg.get('originalAsg');
        }
        if (policy_detail.sendNotification) {
          Design.modelClassForType(constant.RESTYPE.TOPIC).ensureExistence();
        }
        if (!policy_detail.uid) {
          PolicyModel = Design.modelClassForType(constant.RESTYPE.SP);
          policy = new PolicyModel(policy_detail);
          asg.addScalingPolicy(policy);
          policy_detail.uid = policy.id;
          this.get("policies").push(policy.toJSON());
        } else {
          policy = Design.instance().component(policy_detail.uid);
          alarmData = policy_detail.alarmData;
          policy.setAlarm(alarmData);
          delete policy_detail.alarmData;
          policy.set(policy_detail);
          policy_detail.alarmData = alarmData;
        }
        return null;
      }
    });
    return new ASGConfigModel();
  });

}).call(this);

define('module/design/property/asg/template/stack',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <div class=\"property-control-group\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MSG_DROP_LC", {hash:{},data:data}))
    + "</div>\n  ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_DETAILS", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" data-bind=\"true\">\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-asg-name\" >"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_NAME", {hash:{},data:data}))
    + "</label>\n			<span class=\"required-input right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_REQUIRED", {hash:{},data:data}))
    + "</span>\n			<input class=\"input\" type=\"text\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"property-asg-name\" maxlength=\"255\" data-ignore=\"true\" data-required-rollback=\"true\"/>\n		</section>\n\n		<section class=\"property-control-group clearfix\">\n			<div class=\"left property-asg-size\">\n				<label class=\"left\" for=\"property-asg-min\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MIN_SIZE", {hash:{},data:data}))
    + "</label>\n				<input class=\"input\" type=\"text\" id=\"property-asg-min\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.minSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n			</div>\n			<div class=\"right property-asg-size\">\n				<label class=\"left\" for=\"property-asg-max\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MAX_SIZE", {hash:{},data:data}))
    + "</label>\n				<input class=\"input\" type=\"text\" id=\"property-asg-max\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n			</div>\n	  </section>\n\n		<section class=\"property-control-group property-asg-size\">\n			<label class=\"left\" for=\"property-asg-capacity\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_DESIRE_CAPACITY", {hash:{},data:data}))
    + "</label>\n			<input class=\"input\" type=\"text\" id=\"property-asg-capacity\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.capacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n		</section>\n\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-asg-cooldown\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_COOL_DOWN", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short\" type=\"text\" id=\"property-asg-cooldown\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"digits\" max=\"86400\">\n			<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n		</section>\n\n		<section class=\"property-control-group clearfix\">\n			<label clas=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HEALTH_CHECK_TYPE", {hash:{},data:data}))
    + "</label>\n			<div class=\"asg-radio-group\">\n				<div class=\"radio\">\n					<input id=\"property-asg-ec2\" type=\"radio\" value=\"ec2\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n					<label for=\"property-asg-ec2\"></label>\n				</div>\n				<label for=\"property-asg-ec2\">EC2</label>\n			</div>\n			<div ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				<div class=\"radio\">\n					<input id=\"property-asg-elb\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.noop,fn:self.program(10, program10, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"elb\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n					<label for=\"property-asg-elb\"></label>\n				</div>\n				<label for=\"property-asg-elb\">ELB</label>\n			</div>\n		</section>\n\n		<section class=\"property-control-group\">\n			<label class=\"left\" for=\"property-asg-healthcheck\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HEALTH_CHECK_CRACE_PERIOD", {hash:{},data:data}))
    + "</label>\n			<input class=\"input input-short\" type=\"text\" id=\"property-asg-healthcheck\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckGracePeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n			<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n		</section>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\">\n		<section class=\"property-control-group pos-r property-term-p\">\n			<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_POLICY", {hash:{},data:data}))
    + "</h5>\n			<div class=\"termination-policy-brief\">"
    + escapeExpression(((stack1 = (depth0 && depth0.term_policy_brief)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n			<div class=\"asg-p-action\"><i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_EDIT", {hash:{},data:data}))
    + "\" id=\"property-asg-term-edit\"></i></div>\n		</section>\n\n		<ul id=\"property-asg-policies\" class=\"property-list\">\n			<li class=\"pos-r hide\">\n        <h5 class=\"property-asg-policy-name name\"></h5>\n				<span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-trigger asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\"></span>\n        <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\"></span>\n        <div class=\"asg-p-action\">\n	        <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n	        <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n        </div>\n      </li>\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.policies), {hash:{},inverse:self.noop,fn:self.program(12, program12, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		</ul>\n		<div class=\"property-control-group tac\">\n			<button class=\"btn btn-blue ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_add_policy), {hash:{},inverse:self.noop,fn:self.program(14, program14, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-asg-policy-add\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TIP_YOU_CAN_ONLY_ADD_25_SCALING_POLICIES", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_BTN_ADD_SCALING_POLICY", {hash:{},data:data}))
    + "</button>\n		</div>\n	</div>\n\n	<div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_NOTIFICATION", {hash:{},data:data}))
    + "</div>\n	<div class=\"option-group\" id=\"property-asg-sns\">\n		<div class=\"property-control-group property-asg-notification-wrap\">\n			<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SEND_NOTIFICATION", {hash:{},data:data}))
    + "</p>\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns1\" type=\"checkbox\" data-key=\"instanceLaunch\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunch), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns1\"></label>\n			</div>\n			<label for=\"property-asg-sns1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SUCCESS_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns2\" type=\"checkbox\" data-key=\"instanceLaunchError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunchError), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns2\"></label>\n			</div>\n			<label for=\"property-asg-sns2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_FAILED_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns3\" type=\"checkbox\" data-key=\"instanceTerminate\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminate), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns3\"></label>\n			</div>\n			<label for=\"property-asg-sns3\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SUCCESS_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns4\" type=\"checkbox\" data-key=\"instanceTerminateError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminateError), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns4\"></label>\n			</div>\n			<label for=\"property-asg-sns4\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_FAILED_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n			<div><div class=\"checkbox\">\n				<input id=\"property-asg-sns5\" type=\"checkbox\" data-key=\"test\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.test), {hash:{},inverse:self.noop,fn:self.program(16, program16, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n				<label for=\"property-asg-sns5\"></label>\n			</div>\n			<label for=\"property-asg-sns5\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_VALIDATE_SNS", {hash:{},data:data}))
    + "</label></div>\n\n	    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_sns_sub), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		</div>\n	</div>\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program6(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HAS_ELB_WARN", {hash:{},data:data}))
    + "\" class=\"asg-radio-group tooltip\"";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "class=\"asg-radio-group\"";
  }

function program10(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n        <h5 class=\"property-asg-policy-name name\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n      	<span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.metricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.comparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.evaluationPeriods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "x"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "m</span>\n        <span class=\"asg-p-trigger asg-p-tag asg-p-trigger-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.adjustmentType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n        <div class=\"asg-p-action\">\n	        <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n	        <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n        </div>\n      </li>\n      ";
  return buffer;
  }

function program14(depth0,data) {
  
  
  return "disabled tooltip";
  }

function program16(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<p class=\"property-warning ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_notification), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-asg-sns-info\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MSG_SNS_WARN", {hash:{},data:data}))
    + " </p>\n	    ";
  return buffer;
  }
function program19(depth0,data) {
  
  
  return "hide";
  }

  buffer += "<article>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.emptyAsg), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/asg/template/policy',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  
  return "readonly";
  }

function program3(depth0,data) {
  
  
  return "\n								<li data-id=\"StatusCheckFailed\" class=\"item\">Status Check Failed (Any)</li>\n								<li data-id=\"StatusCheckFailed_Instance\" class=\"item\">Status Check Failed (Instance)</li>\n								<li data-id=\"StatusCheckFailed_System\" class=\"item\">Status Check Failed (System)</li>\n								";
  }

function program5(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<p class=\"";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.sendNotification), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " property-warning\" id=\"asg-policy-no-sns\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MSG_SNS_WARN", {hash:{},data:data}))
    + "</p>\n						";
  return buffer;
  }
function program8(depth0,data) {
  
  
  return "hide";
  }

  buffer += "<div id=\"asg-termination-policy\" style=\"width:480px;\"  data-bind=\"true\">\n	 <div class=\"modal-header\">\n			<h3>"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_TITLE_CONTENT", {hash:{},data:data}))
    + "</h3>\n			<i class=\"modal-close\">&times;</i>\n	 </div>\n	<div class=\"scroll-wrap\" style=\"max-height:500px;\">\n		<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		 <div class=\"modal-body scroll-content\" id=\"property-asg-policy\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n\n			<label for=\"asg-policy-name\" class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "</label>\n			<input type=\"text\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" id=\"asg-policy-name\" data-required-rollback=\"true\" data-ignore=\"true\" maxlength=\"255\" data-required=\"true\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isOld), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n\n\n				<section class=\"modal-control-group\">\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ALARM", {hash:{},data:data}))
    + "</h5>\n					<div class=\"control-sentence\">\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_WHEN", {hash:{},data:data}))
    + "</span>\n\n						<div class=\"selectbox\" id=\"asg-policy-metric\">\n							<div class=\"selection\">CPU Utillization</div>\n							<ul class=\"dropdown\" tabindex=\"-1\">\n								<li data-id=\"CPUUtilization\" class=\"item selected\">CPU Utilization</li>\n								<li data-id=\"DiskReadBytes\" class=\"item\">Disk Reads</li>\n								<li data-id=\"DiskReadOps\" class=\"item\">Disk Read Operations</li>\n								<li data-id=\"DiskWriteBytes\" class=\"item\">Disk Writes</li>\n								<li data-id=\"DiskWriteOps\" class=\"item\">Disk Write Operations</li>\n								<li data-id=\"NetworkIn\" class=\"item\">Network In</li>\n								<li data-id=\"NetworkOut\" class=\"item\">Network Out</li>\n								";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.detail_monitor), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</ul>\n						</div>\n\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_IS", {hash:{},data:data}))
    + "</span>\n\n						<div class=\"selectbox\" id=\"asg-policy-eval\">\n							<div class=\"selection\">&gt;=</div>\n							<ul class=\"dropdown\" tabindex=\"-1\">\n								<li data-id=\">\" class=\"item\">&gt;</li>\n								<li data-id=\">=\" class=\"item selected\">&gt;=</li>\n								<li data-id=\"<\" class=\"item\">&lt;</li>\n								<li data-id=\"<=\" class=\"item\">&lt;=</li>\n							</ul>\n						</div>\n\n						<input type=\"text\" class=\"input\" id=\"asg-policy-threshold\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\" data-ignore=\"true\" data-ignore-regexp=\"^[0-9]*\\.?[0-9]*$\" data-required=\"true\">\n\n						<span id=\"asg-policy-unit\">"
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n\n						<br />\n\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_FOR", {hash:{},data:data}))
    + "</span>\n\n						<input type=\"text\" class=\"input\" id=\"asg-policy-periods\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.evaluationPeriods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-ignore=\"true\" data-type=\"digits\">\n\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_PERIOD", {hash:{},data:data}))
    + "</span>\n\n						<input type=\"text\" class=\"input\" id=\"asg-policy-second\" value=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-required=\"true\" data-ignore=\"true\" data-type=\"digits\">\n\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_SECONDS", {hash:{},data:data}))
    + "</span>\n\n						<br />\n\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_START_SCALING", {hash:{},data:data}))
    + "</span>\n\n						<div class=\"selectbox\" id=\"asg-policy-trigger\">\n							<div class=\"selection\">ALARM</div>\n							<ul class=\"dropdown\" tabindex=\"-1\">\n								<li data-id=\"ALARM\" class=\"item selected\">ALARM</li>\n								<li data-id=\"INSUFFICIANT_DATA\" class=\"item\">INSUFFICIANT_DATA</li>\n								<li data-id=\"OK\" class=\"item\">OK</li>\n							</ul>\n						</div>\n\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_STATE", {hash:{},data:data}))
    + "</span>\n					</div>\n				</section>\n\n				<section class=\"modal-control-group\">\n					<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_SCALING_ACTIVITY", {hash:{},data:data}))
    + "</h5>\n					<div class=\"control-sentence\">\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADJUSTMENT", {hash:{},data:data}))
    + "</span>\n						<div class=\"selectbox\" id=\"asg-policy-adjust-type\">\n							<div class=\"selection\">Change in Capacity</div>\n							<ul class=\"dropdown\" tabindex=\"-1\">\n								<li data-id=\"ChangeInCapacity\" class=\"item selected\">Change in Capacity</li>\n								<li data-id=\"ExactCapacity\" class=\"item\">Exact Capacity</li>\n								<li data-id=\"PercentChangeInCapacity\" class=\"item\">Percent Change in Capacity</li>\n							</ul>\n						</div>\n						<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADJUSTMENT_OF", {hash:{},data:data}))
    + "</span>\n						<input type=\"text\" class=\"input tooltip\" id=\"asg-policy-adjust\" data-required=\"true\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" placeholder=\"e.g. -1\" data-ignore=\"true\" data-ignore-regexp=\"^-?[0-9]*$\">\n						<span class=\"hide pecentcapcity\">%</span>\n						<span>.</span>\n					</div>\n				</section>\n\n				<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED", {hash:{},data:data}))
    + "</h5>\n				<div class=\"asg-policy-advanced\">\n					<section id=\"asg-policy-statistics\" class=\"modal-control-group\">\n						<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_ALARM_OPTION", {hash:{},data:data}))
    + "</h5>\n						<div class=\"clearfix\">\n							<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC", {hash:{},data:data}))
    + "</label>\n							<div class=\"selectbox\" id=\"asg-policy-statistics\">\n							<div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC_AVG", {hash:{},data:data}))
    + "</div>\n							<ul class=\"dropdown\" tabindex=\"-1\">\n								<li data-id=\"Average\" class=\"item selected\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC_AVG", {hash:{},data:data}))
    + "</li>\n								<li data-id=\"Minimum\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC_MIN", {hash:{},data:data}))
    + "</li>\n								<li data-id=\"Maximum\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC_MAX", {hash:{},data:data}))
    + "</li>\n								<li data-id=\"SampleCount\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC_SAMPLE", {hash:{},data:data}))
    + "</li>\n								<li data-id=\"Sum\" class=\"item\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_STATISTIC_SUM", {hash:{},data:data}))
    + "</li>\n							</ul>\n						</div>\n					</div>\n					</section>\n\n					<section id=\"asg-policy-scaling\" class=\"modal-control-group\">\n						<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_SCALING_OPTION", {hash:{},data:data}))
    + "</h5>\n						<div class=\"clearfix\">\n							<label for=\"asg-policy-cooldown\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_COOLDOWN_PERIOD", {hash:{},data:data}))
    + "</label>\n							<input type=\"text\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_TIP_COOLDOWN_PERIOD", {hash:{},data:data}))
    + "\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"5\" placeholder=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_DEFAULT_COOL_DOWN", {hash:{},data:data}))
    + "\" data-ignore=\"true\" data-type=\"digits\" id=\"asg-policy-cooldown\">\n							<span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_UNIT_MINS", {hash:{},data:data}))
    + "</span>\n						</div>\n\n						<div id=\"asg-policy-step-wrapper\" class=\"hide clearfix pecentcapcity\">\n							<label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_MIN_ADJUST_STEP", {hash:{},data:data}))
    + "</label>\n							<input type=\"text\" class=\"input tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_ADD_POLICY_ADVANCED_TIP_MIN_ADJUST_STEP", {hash:{},data:data}))
    + "\" id=\"asg-policy-step\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.minAdjustStep)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-ignore=\"true\" maxlength=\"5\" data-type=\"digits\">\n						</div>\n					</section>\n\n					<section class=\"modal-control-group\">\n						<h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_NOTIFICATION", {hash:{},data:data}))
    + "</h5>\n						<div class=\"checkbox\">\n							<input id=\"asg-policy-notify\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sendNotification), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n							<label for=\"asg-policy-notify\"></label>\n						</div>\n						<label id=\"asg-policy-notify-label\" for=\"asg-policy-notify\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SEND_NOTIFICATION_D", {hash:{},data:data}))
    + "</label>\n\n						";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.noSNS), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</section>\n				</div>\n		 </div>\n		</div>\n	 </div>\n	 <div class=\"modal-footer\">\n			<button id=\"property-asg-policy-done\" class=\"btn btn-blue\">Done</button>\n			<button class=\"btn modal-close btn-silver\">Cancel</button>\n	 </div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('module/design/property/asg/template/term',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"checkbox\">\n              <input id=\"property-asg-term"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checked), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n              <label for=\"property-asg-term"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></label>\n            </div>\n            <label for=\"property-asg-term"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"list-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</label>\n            <span class=\"drag-handle tooltip icon-sort\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_MSG_DRAG", {hash:{},data:data}))
    + "\"></span>\n          </li>\n          ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "class=\"enabled\"";
  }

function program4(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

  buffer += "<div style=\"width:420px\">\n   <div class=\"modal-header\">\n      <h3>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_EDIT", {hash:{},data:data}))
    + "</h3>\n      <i class=\"modal-close\">&times;</i>\n   </div>\n   <div class=\"modal-body\" id=\"property-asg-term\">\n\n      <p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_TEXT_WARN", {hash:{},data:data}))
    + "</p>\n      <div class=\"drag-sort-list-wrap\">\n        <ul class=\"drag-sort-list\" id=\"property-term-list\">\n          ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n\n        <ul class=\"drag-sort-list\">\n          <li ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useDefault), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n            <div class=\"checkbox\">\n              <input id=\"property-asg-term-def\" type=\"checkbox\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.useDefault), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n              <label for=\"property-asg-term-def\"></label>\n            </div>\n            <span>Default</span>\n          </li>\n        </ul>\n      </div>\n   </div>\n   <div class=\"modal-footer\">\n      <button id=\"property-asg-term-done\" class=\"btn btn-blue\">Done</button>\n      <button class=\"btn modal-close btn-silver\">Cancel</button>\n   </div>\n</div>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/asg/view',['../base/view', './template/stack', './template/policy', './template/term', 'i18n!nls/lang.js'], function(PropertyView, template, policy_template, term_template, lang) {
    var InstanceView, adjustMap, adjustTooltip, adjustdefault, metricMap, unitMap;
    metricMap = {
      "CPUUtilization": "CPU Utilization",
      "DiskReadBytes": "Disk Reads",
      "DiskReadOps": "Disk Read Operations",
      "DiskWriteBytes": "Disk Writes",
      "DiskWriteOps": "Disk Write Operations",
      "NetworkIn": "Network In",
      "NetworkOut": "Network Out",
      "StatusCheckFailed": "Status Check Failed (Any)",
      "StatusCheckFailed_Instance": "Status Check Failed (Instance)",
      "StatusCheckFailed_System": "Status Check Failed (System)"
    };
    adjustMap = {
      "ChangeInCapacity": "Change in Capacity",
      "ExactCapacity": "Exact Capacity",
      "PercentChangeInCapacity": "Percent Change in Capacity"
    };
    adjustdefault = {
      "ChangeInCapacity": "eg. -1",
      "ExactCapacity": "eg. 5",
      "PercentChangeInCapacity": "eg. -30"
    };
    adjustTooltip = {
      "ChangeInCapacity": "Increase or decrease existing capacity by integer you input here. A positive value adds to the current capacity and a negative value removes from the current capacity.",
      "ExactCapacity": "Change the current capacity of your Auto Scaling group to the exact value specified.",
      "PercentChangeInCapacity": "Increase or decrease the desired capacity by a percentage of the desired capacity. A positive value adds to the current capacity and a negative value removes from the current capacity"
    };
    unitMap = {
      CPUUtilization: "%",
      DiskReadBytes: "B",
      DiskWriteBytes: "B",
      NetworkIn: "B",
      NetworkOut: "B"
    };
    InstanceView = PropertyView.extend({
      events: {
        "click #property-asg-term-edit": "showTermPolicy",
        "click #property-asg-sns input[type=checkbox]": "setNotification",
        "change #property-asg-elb": "setHealthyCheckELBType",
        "change #property-asg-ec2": "setHealthyCheckEC2Type",
        "change #property-asg-name": "setASGName",
        "change #property-asg-min": "setSizeGroup",
        "change #property-asg-max": "setSizeGroup",
        "change #property-asg-capacity": "setSizeGroup",
        "change #property-asg-cooldown": "setASGCoolDown",
        "change #property-asg-healthcheck": "setHealthCheckGrace",
        "click #property-asg-policy-add": "addScalingPolicy",
        "click #property-asg-policies .icon-edit": "editScalingPolicy",
        "click #property-asg-policies .icon-del": "delScalingPolicy"
      },
      render: function() {
        var data, p, _i, _len, _ref;
        data = this.model.toJSON();
        _ref = data.policies;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          p = _ref[_i];
          p.unit = unitMap[p.alarmData.metricName];
          p.alarmData.metricName = metricMap[p.alarmData.metricName];
          p.adjustmentType = adjustMap[p.adjustmentType];
        }
        data.term_policy_brief = data.terminationPolicies.join(" > ");
        data.can_add_policy = data.policies.length < 25;
        this.$el.html(template(data));
        return data.name;
      },
      setASGCoolDown: function(event) {
        var $target;
        $target = $(event.target);
        $target.parsley('custom', function(val) {
          if (_.isNumber(+val) && +val > 86400) {
            return lang.ide.PARSLEY_MAX_VALUE_86400;
          }
          return null;
        });
        if ($target.parsley('validate')) {
          return this.model.setASGCoolDown($target.val());
        }
      },
      setASGName: function(event) {
        var name, target;
        target = $(event.currentTarget);
        name = target.val();
        if (this.checkResName(target, "ASG")) {
          this.model.setName(name);
          return this.setTitle(name);
        }
      },
      setSizeGroup: function(event) {
        var $capacity, $max, $min, that;
        that = this;
        $min = this.$el.find('#property-asg-min');
        $max = this.$el.find('#property-asg-max');
        $capacity = this.$el.find('#property-asg-capacity');
        $min.parsley('custom', function(val) {
          if (+val > +$max.val()) {
            return lang.ide.PARSLEY_MINIMUM_SIZE_MUST_BE_LESSTHAN_MAXIMUM_SIZE;
          }
          return that.constantCheck(val);
        });
        $max.parsley('custom', function(val) {
          if (+val < +$min.val()) {
            return lang.ide.PARSLEY_MAXIMUM_SIZE_MUST_BE_MORETHAN_MINIMUM_SIZE;
          }
          return that.constantCheck(val);
        });
        $capacity.parsley('custom', function(val) {
          if (+val < +$min.val() || +val > +$max.val()) {
            return lang.ide.PARSLEY_DESIRED_CAPACITY_IN_ALLOW_SCOPE;
          }
          return that.constantCheck(val);
        });
        if ($(event.currentTarget).parsley('validateForm')) {
          this.model.setASGMin($min.val());
          this.model.setASGMax($max.val());
          return this.model.setASGDesireCapacity($capacity.val());
        }
      },
      constantCheck: function(val) {
        val = +val;
        if (val < 1) {
          return sprintf(lang.ide.PARSLEY_VALUE_MUST_BE_GREATERTHAN_VAR, 1);
        }
        if (val > 65534) {
          return sprintf(lang.ide.PARSLEY_VALUE_MUST_BE_LESSTHAN_VAR, 65534);
        }
        return null;
      },
      setHealthCheckGrace: function(event) {
        var $target;
        $target = $(event.currentTarget);
        $target.parsley('custom', function(val) {
          val = +val;
          if (val < 0 || val > 86400) {
            return sprintf(lang.ide.PARSLEY_VALUE_MUST_IN_ALLOW_SCOPE, 0, 86400);
          }
        });
        if ($target.parsley('validate')) {
          return this.model.setHealthCheckGrace($target.val());
        }
      },
      showTermPolicy: function() {
        var checked, data, p, policy, self, _i, _j, _len, _len1, _ref, _ref1;
        data = [];
        checked = {};
        _ref = this.model.get("terminationPolicies");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          policy = _ref[_i];
          if (policy === "Default") {
            data.useDefault = true;
          } else {
            data.push({
              name: policy,
              checked: true
            });
            checked[policy] = true;
          }
        }
        _ref1 = [lang.ide.PROP_ASG_TERMINATION_POLICY_OLDEST, lang.ide.PROP_ASG_TERMINATION_POLICY_NEWEST, lang.ide.PROP_ASG_TERMINATION_POLICY_OLDEST_LAUNCH, lang.ide.PROP_ASG_TERMINATION_POLICY_CLOSEST];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          if (!checked[p]) {
            data.push({
              name: p,
              checked: false
            });
          }
        }
        modal(term_template(data), true);
        self = this;
        $("#property-asg-term").on("click", "input", function() {
          var $checked, $this;
          $checked = $("#property-asg-term").find("input:checked");
          if ($checked.length === 0) {
            return false;
          }
          $this = $(this);
          checked = $this.is(":checked");
          return $this.closest("li").toggleClass("enabled", checked);
        });
        $("#property-asg-term-done").on("click", function() {
          self.onEditTermPolicy();
          return modal.close();
        });
        $("#property-asg-term").on("mousedown", ".drag-handle", function() {
          return $(this).trigger("mouseleave");
        });
        return $("#property-term-list").sortable({
          handle: '.drag-handle'
        });
      },
      onEditTermPolicy: function() {
        var data;
        data = [];
        $("#property-term-list .list-name").each(function() {
          var $this;
          $this = $(this);
          if ($this.closest("li").hasClass("enabled")) {
            data.push($this.text());
          }
          return null;
        });
        if ($("#property-asg-term-def").is(":checked")) {
          data.push("Default");
        }
        $(".termination-policy-brief").text(data.join(" > "));
        return this.model.setTerminatePolicy(data);
      },
      delScalingPolicy: function(event) {
        var $li, uid;
        $li = $(event.currentTarget).closest("li");
        uid = $li.data("uid");
        $li.remove();
        $("#property-asg-policy-add").removeClass("tooltip disabled");
        return this.model.delPolicy(uid);
      },
      updateScalingPolicy: function(data) {
        var $li, $policies, adjusttype, metric, unit;
        metric = metricMap[data.alarmData.metricName];
        adjusttype = adjustMap[data.adjustmentType];
        unit = unitMap[data.alarmData.metricName] || "";
        if (!data.uid) {
          console.error("Cannot find scaling policy uid");
          return;
        }
        $policies = $("#property-asg-policies");
        $li = $policies.children("[data-uid='" + data.uid + "']");
        if ($li.length === 0) {
          $li = $policies.children(".hide").clone().attr("data-uid", data.uid).removeClass("hide").appendTo($policies);
          $("#property-asg-policy-add").toggleClass("tooltip disabled", $("#property-asg-policies").children().length >= 26);
        }
        $li.find(".name").html(data.name);
        $li.find(".asg-p-metric").html(metric);
        $li.find(".asg-p-eval").html(data.alarmData.comparisonOperator + " " + data.alarmData.threshold + unit);
        $li.find(".asg-p-periods").html(data.alarmData.evaluationPeriods + "x" + Math.round(data.alarmData.period / 60) + "m");
        $li.find(".asg-p-trigger").html(data.state).attr("class", "asg-p-trigger asg-p-tag asg-p-trigger-" + data.state);
        return $li.find(".asg-p-adjust").html(data.adjustment + " " + data.adjustmentType);
      },
      editScalingPolicy: function(event) {
        var $item, $selectbox, $selected, data, item, key, selectMap, uid, value, _i, _len, _ref;
        uid = $(event.currentTarget).closest("li").data("uid");
        data = this.model.getPolicy(uid);
        data.uid = uid;
        data.title = lang.ide.PROP_ASG_ADD_POLICY_TITLE_EDIT;
        this.showScalingPolicy(data);
        selectMap = {
          metric: data.alarmData.metricName,
          "eval": data.alarmData.comparisonOperator,
          trigger: data.state,
          "adjust-type": data.adjustmentType,
          statistics: data.alarmData.statistic
        };
        for (key in selectMap) {
          value = selectMap[key];
          $selectbox = $("#asg-policy-" + key);
          $selected = null;
          _ref = $selectbox.find(".item");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            $item = $(item);
            if ($item.data("id") === value) {
              $selected = $item;
              break;
            }
          }
          if ($selected) {
            $selectbox.find(".selected").removeClass("selected");
            $selectbox.find(".selection").html($selected.addClass("selected").html());
          }
        }
        return $(".pecentcapcity").toggle($("#asg-policy-adjust-type").find(".selected").data("id") === "PercentChangeInCapacity");
      },
      addScalingPolicy: function(event) {
        if ($(event.currentTarget).hasClass("disabled")) {
          return false;
        }
        this.showScalingPolicy();
        return false;
      },
      showScalingPolicy: function(data) {
        var self;
        if (!data) {
          data = {
            title: lang.ide.PROP_ASG_ADD_POLICY_TITLE_ADD,
            name: this.model.defaultScalingPolicyName(),
            minAdjustStep: 1,
            alarmData: {
              evaluationPeriods: 2,
              period: 5
            }
          };
        }
        if (data.alarmData && data.alarmData.metricName) {
          data.unit = unitMap[data.alarmData.metricName];
        } else {
          data.unit = '%';
        }
        data.noSNS = !this.model.attributes.has_sns_sub;
        data.detail_monitor = this.model.attributes.detail_monitor;
        modal(policy_template(data), true);
        self = this;
        $("#property-asg-policy-done").on("click", function() {
          var result;
          result = $("#asg-termination-policy").parsley("validate");
          if (result === false) {
            return false;
          }
          self.onPolicyDone();
          return modal.close();
        });
        $("#asg-policy-name").parsley('custom', function(name) {
          var uid;
          uid = $("#property-asg-policy").data("uid");
          if (self.model.isDupPolicyName(uid, name)) {
            return "Duplicated policy name in this autoscaling group";
          }
        });
        $("#asg-policy-periods").on("change", function() {
          var val;
          val = parseInt($(this).val(), 10);
          if (!val || val < 1) {
            $(this).val("1");
          }
          if (val > 86400) {
            return $(this).val(86400);
          }
        });
        $("#asg-policy-second").on("change", function() {
          var val;
          val = parseInt($(this).val(), 10);
          if (!val || val < 1) {
            $(this).val("1");
          }
          if (val > 1440) {
            return $(this).val(1440);
          }
        });
        $("#asg-policy-adjust-type").on("OPTION_CHANGE", function() {
          var type;
          type = $(this).find(".selected").data("id");
          $(".pecentcapcity").toggle(type === "PercentChangeInCapacity");
          return $("#asg-policy-adjust").attr("placeholder", adjustdefault[type]).data("tooltip", adjustTooltip[type]).trigger("change");
        });
        $("#asg-policy-adjust").on("change", function() {
          var type, val;
          type = $("#asg-policy-adjust-type").find(".selected").data("id");
          val = parseInt($(this).val(), 10);
          if (type === "ExactCapacity") {
            if (!val || val < 1) {
              $(this).val("1");
            }
          } else if (type === "PercentChangeInCapacity") {
            if (!val) {
              $(this).val("0");
            } else if (val < -100) {
              $(this).val("-100");
            }
          }
          if (val < -65534) {
            $(this).val(-65534);
          } else if (val > 65534) {
            $(this).val(65534);
          }
          return $("#").data("tooltip", adjustTooltip[type]).trigger("change");
        });
        $("#asg-policy-cooldown").on("change", function() {
          var $this, val;
          $this = $("#asg-policy-cooldown");
          val = parseInt($this.val(), 10);
          if (isNaN(val)) {
            return;
          }
          if (val < 0) {
            val = 0;
          } else if (val > 1440) {
            val = 1440;
          }
          return $this.val(val);
        });
        $("#asg-policy-step").on("change", function() {
          var $this, val;
          $this = $("#asg-policy-step");
          val = parseInt($this.val(), 10);
          if (isNaN(val)) {
            return;
          }
          if (val < 0) {
            val = 0;
          } else if (val > 65534) {
            val = 65534;
          }
          return $this.val(val);
        });
        $("#asg-policy-threshold").on("change", function() {
          var metric, val;
          metric = $("#asg-policy-metric .selected").data("id");
          val = parseInt($(this).val(), 10);
          if (metric === "CPUUtilization") {
            if (isNaN(val) || val < 1) {
              return $(this).val("1");
            } else if (val > 100) {
              return $(this).val("100");
            }
          }
        });
        $("#asg-policy-notify").on("click", function(evt) {
          $("#asg-policy-no-sns").toggle($("#asg-policy-notify").is(":checked"));
          evt.stopPropagation();
          return null;
        });
        $("#asg-policy-metric").on("OPTION_CHANGE", function() {
          $("#asg-policy-unit").html(unitMap[$(this).find(".selected").data("id")] || "");
          return $('#asg-policy-threshold').val('');
        });
        return null;
      },
      onPolicyDone: function() {
        var data;
        data = {
          uid: $("#property-asg-policy").data("uid"),
          name: $("#asg-policy-name").val(),
          cooldown: $("#asg-policy-cooldown").val() * 60,
          minAdjustStep: $("#asg-policy-step").val(),
          adjustment: $("#asg-policy-adjust").val(),
          adjustmentType: $("#asg-policy-adjust-type .selected").data("id"),
          state: $("#asg-policy-trigger .selected").data("id"),
          sendNotification: $("#asg-policy-notify").is(":checked"),
          alarmData: {
            metricName: $("#asg-policy-metric .selected").data("id"),
            comparisonOperator: $("#asg-policy-eval .selected").data("id"),
            period: $("#asg-policy-second").val() * 60,
            evaluationPeriods: $("#asg-policy-periods").val(),
            statistic: $("#asg-policy-statistics .selected").data("id"),
            threshold: $("#asg-policy-threshold").val()
          }
        };
        this.model.setPolicy(data);
        this.updateScalingPolicy(data);
        return null;
      },
      setNotification: function() {
        var checkMap, hasChecked;
        checkMap = {};
        hasChecked = false;
        $("#property-asg-sns input[type = checkbox]").each(function() {
          var checked;
          checked = $(this).is(":checked");
          checkMap[$(this).attr("data-key")] = checked;
          if (checked) {
            hasChecked = true;
          }
          return null;
        });
        if (hasChecked) {
          $("#property-asg-sns-info").show();
        } else {
          $("#property-asg-sns-info").hide();
        }
        return this.model.setNotification(checkMap);
      },
      setHealthyCheckELBType: function(event) {
        return this.model.setHealthCheckType('ELB');
      },
      setHealthyCheckEC2Type: function(event) {
        return this.model.setHealthCheckType('EC2');
      }
    });
    return new InstanceView();
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('module/design/property/asg/app_model',['../base/model', 'constant', 'Design'], function(PropertyModel, constant, Design) {
    var ASGModel;
    ASGModel = PropertyModel.extend({
      init: function(uid) {
        var asg_comp, asg_data, component, data, lc, n, resource_list;
        asg_comp = component = Design.instance().component(uid);
        data = {
          uid: uid,
          name: asg_comp.get('name'),
          minSize: asg_comp.get('minSize'),
          maxSize: asg_comp.get('maxSize'),
          capacity: asg_comp.get('capacity'),
          isEditable: this.isAppEdit
        };
        this.set(data);
        resource_list = MC.data.resource_list[Design.instance().region()];
        asg_data = resource_list[asg_comp.get('appId')];
        if (asg_data) {
          this.set('hasData', true);
          this.set('awsResName', asg_data.AutoScalingGroupName);
          this.set('arn', asg_data.AutoScalingGroupARN);
          this.set('createTime', asg_data.CreatedTime);
          if (asg_data.TerminationPolicies && asg_data.TerminationPolicies.member) {
            this.set('term_policy_brief', asg_data.TerminationPolicies.member.join(" > "));
          }
          this.handleInstance(asg_comp, resource_list, asg_data);
        }
        if (!this.isAppEdit) {
          if (!asg_data) {
            return false;
          }
          this.set('lcName', asg_data.LaunchConfigurationName);
          this.set('cooldown', asg_data.DefaultCooldown);
          this.set('healCheckType', asg_data.HealthCheckType);
          this.set('healthCheckGracePeriod', asg_data.HealthCheckGracePeriod);
          this.handlePolicy(asg_comp, resource_list, asg_data);
          this.handleNotify(asg_comp, resource_list, asg_data);
        } else {
          data = component.toJSON();
          data.uid = uid;
          this.set(data);
          lc = asg_comp.get('lc');
          if (!lc) {
            this.set("emptyAsg", true);
            return;
          }
          this.set("has_elb", !!component.get("lc").connections("ElbAmiAsso").length);
          this.set("isEC2HealthCheck", component.isEC2HealthCheckType());
          this.set('detail_monitor', !!lc.get('monitoring'));
          n = component.getNotification();
          this.set("notification", n);
          this.set("has_notification", n.instanceLaunch || n.instanceLaunchError || n.instanceTerminate || n.instanceTerminateError || n.test);
          this.set("has_sns_sub", !!(Design.modelClassForType(constant.RESTYPE.SUBSCRIPTION).allObjects().length));
          this.set("policies", _.map(data.policies, function(p) {
            data = $.extend(true, {}, p.attributes);
            data.cooldown = Math.round(data.cooldown / 60);
            data.alarmData.period = Math.round(data.alarmData.period / 60);
            return data;
          }));
        }
        return null;
      },
      handleInstance: function(asg_comp, resource_list, asg_data) {
        var ami, az, idx, instance, instance_count, instance_groups, instances, instances_map, _i, _len, _ref;
        instance_count = 0;
        instance_groups = [];
        instances_map = {};
        if (asg_data.Instances && asg_data.Instances.member) {
          instance_count = asg_data.Instances.member.length;
          _ref = asg_data.Instances.member;
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            instance = _ref[idx];
            ami = {
              status: instance.HealthStatus === 'Healthy' ? 'green' : 'red',
              healthy: instance.HealthStatus,
              name: instance.InstanceId
            };
            az = instance.AvailabilityZone;
            if (instances_map[az]) {
              instances_map[az].push(ami);
            } else {
              instances_map[az] = [ami];
            }
          }
          for (az in instances_map) {
            instances = instances_map[az];
            instance_groups.push({
              name: az,
              instances: instances
            });
          }
        } else {
          instance_count = 0;
        }
        this.set('instance_groups', instance_groups);
        return this.set('instance_count', instance_count);
      },
      handleNotify: function(asg_comp, resource_list, asg_data) {
        var nc_array, nc_map, notification, notifications, sendNotify, _i, _len;
        notifications = resource_list.NotificationConfigurations;
        sendNotify = false;
        nc_array = [false, false, false, false, false];
        nc_map = {
          "autoscaling:EC2_INSTANCE_LAUNCH": 0,
          "autoscaling:EC2_INSTANCE_LAUNCH_ERROR": 1,
          "autoscaling:EC2_INSTANCE_TERMINATE": 2,
          "autoscaling:EC2_INSTANCE_TERMINATE_ERROR": 3,
          "autoscaling:TEST_NOTIFICATION": 4
        };
        if (notifications) {
          for (_i = 0, _len = notifications.length; _i < _len; _i++) {
            notification = notifications[_i];
            if (notification.AutoScalingGroupName === asg_data.AutoScalingGroupName) {
              nc_array[nc_map[notification.NotificationType]] = true;
              sendNotify = true;
            }
          }
        }
        this.set('notifies', nc_array);
        return this.set('sendNotify', sendNotify);
      },
      handlePolicy: function(asg_comp, resource_list, asg_data) {
        var action, actions, actions_arr, alarm_data, cloudWatchPolicyMap, comp_uid, idx, policies, policy, policy_data, sp, trigger_arr, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
        policies = [];
        cloudWatchPolicyMap = {};
        _ref = asg_comp.get("policies");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sp = _ref[_i];
          comp_uid = sp.id;
          policy_data = resource_list[sp.get('appId')];
          if (!policy_data) {
            continue;
          }
          policy = {
            adjusttype: policy_data.AdjustmentType,
            adjustment: policy_data.ScalingAdjustment,
            step: policy_data.MinAdjustmentStep,
            cooldown: policy_data.Cooldown,
            name: policy_data.PolicyName,
            arn: sp.get('appId')
          };
          alarm_data = resource_list[sp.get("alarmData").appId];
          if (alarm_data) {
            actions_arr = [alarm_data.InsufficientDataActions, alarm_data.OKActions, alarm_data.AlarmActions];
            trigger_arr = ['INSUFFICIANT_DATA', 'OK', 'ALARM'];
            for (idx = _j = 0, _len1 = actions_arr.length; _j < _len1; idx = ++_j) {
              actions = actions_arr[idx];
              if (!actions) {
                continue;
              }
              _ref1 = actions.member;
              for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                action = _ref1[_k];
                if (action !== policy.arn) {
                  continue;
                }
                policy.arn = "";
                policy.evaluation = sp.get("alarmData").comparisonOperator;
                policy.metric = alarm_data.MetricName;
                policy.notify = actions.length === 2;
                policy.periods = alarm_data.EvaluationPeriods;
                policy.minute = Math.round(alarm_data.Period / 60);
                policy.statistics = alarm_data.Statistic;
                policy.threshold = alarm_data.Threshold;
                policy.trigger = trigger_arr[idx];
              }
            }
          } else {
            console.warn("handlePolicy():can not find CloudWatch info of ScalingPolicy");
          }
          policies.push(policy);
          _results.push(this.set('policies', _.sortBy(policies, "name")));
        }
        return _results;
      },
      setHealthCheckType: function(type) {
        return Design.instance().component(this.get("uid")).set("healthCheckType", type);
      },
      setASGMin: function(value) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).set("minSize", value);
        return null;
      },
      setASGMax: function(value) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).set("maxSize", value);
        return null;
      },
      setASGDesireCapacity: function(value) {
        var uid;
        uid = this.get('uid');
        Design.instance().component(uid).set("capacity", value);
        return null;
      },
      setASGCoolDown: function(value) {
        return Design.instance().component(this.get("uid")).set("cooldown", value);
      },
      setHealthCheckGrace: function(value) {
        return Design.instance().component(this.get("uid")).set("healthCheckGracePeriod", value);
      },
      setNotification: function(notification) {
        return Design.instance().component(this.get("uid")).setNotification(notification);
      },
      setTerminatePolicy: function(policies) {
        Design.instance().component(this.get("uid")).set("terminationPolicies", policies);
        this.set("terminationPolicies", policies);
        return null;
      },
      delPolicy: function(uid) {
        Design.instance().component(uid).remove();
        return null;
      },
      isDupPolicyName: function(policy_uid, name) {
        return _.some(Design.instance().component(this.get("uid")).get("policies"), function(p) {
          if (p.id !== policy_uid && p.get('name') === name) {
            return true;
          }
        });
      },
      defaultScalingPolicyName: function() {
        var component, count, currentNames, name, policies;
        component = Design.instance().component(this.get("uid"));
        if (component.type === "ExpandedAsg") {
          component = component.get("originalAsg");
        }
        policies = component.get("policies");
        count = policies.length;
        name = "" + this.attributes.name + "-policy-" + count;
        currentNames = _.map(policies, function(policy) {
          return policy.get('name');
        });
        while (__indexOf.call(currentNames, name) >= 0) {
          name = "" + this.attributes.name + "-policy-" + (++count);
        }
        return name;
      },
      getPolicy: function(uid) {
        var data;
        data = $.extend(true, {}, Design.instance().component(uid).attributes);
        data.cooldown = Math.round(data.cooldown / 60);
        data.alarmData.period = Math.round(data.alarmData.period / 60);
        return data;
      },
      setPolicy: function(policy_detail) {
        var PolicyModel, alarmData, asg, policy;
        asg = Design.instance().component(this.get("uid"));
        if (asg.type === "ExpandedAsg") {
          asg = asg.get('originalAsg');
        }
        if (policy_detail.sendNotification) {
          Design.modelClassForType(constant.RESTYPE.TOPIC).ensureExistence();
        }
        if (!policy_detail.uid) {
          PolicyModel = Design.modelClassForType(constant.RESTYPE.SP);
          policy = new PolicyModel(policy_detail);
          asg.addScalingPolicy(policy);
          policy_detail.uid = policy.id;
          this.get("policies").push(policy.toJSON());
        } else {
          policy = Design.instance().component(policy_detail.uid);
          alarmData = policy_detail.alarmData;
          policy.setAlarm(alarmData);
          delete policy_detail.alarmData;
          policy.set(policy_detail);
          policy_detail.alarmData = alarmData;
        }
        return null;
      }
    });
    return new ASGModel();
  });

}).call(this);

define('module/design/property/asg/template/app',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_SUMMARY", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_NAME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.awsResName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>Auto Scaling Group ARN</dt>\n      <dd class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TIP_CLICK_TO_SELECT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_CREATE_TIME", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(helpers.timeStr.call(depth0, (depth0 && depth0.createTime), {hash:{},data:data}))
    + "</dd>\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n  ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "\n    </dl>\n    ";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_LC_TITLE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.lcName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MIN_SIZE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.minSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MAX_SIZE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.maxSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_DESIRE_CAPACITY", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.capacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_COOL_DOWN", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    <dl class=\"dl-vertical\">\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HEALTH_CHECK_TYPE", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.healCheckType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n      <dt>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HEALTH_CHECK_CRACE_PERIOD", {hash:{},data:data}))
    + "</dt>\n      <dd>"
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckGracePeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dd>\n    </dl>\n    ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"property-control-group\">\n    <p class=\"property-info tac\">Auto Scaling Group "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " is deleted in stopped app.</p>\n  </div>\n  ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"option-group-head expand\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_DETAILS", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\" data-bind=\"true\">\n    <section class=\"property-control-group clearfix\">\n      <div class=\"left property-asg-size\">\n        <label class=\"left\" for=\"property-asg-min\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MIN_SIZE", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" id=\"property-asg-min\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.minSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n      </div>\n      <div class=\"right property-asg-size\">\n        <label class=\"left\" for=\"property-asg-max\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MAX_SIZE", {hash:{},data:data}))
    + "</label>\n        <input class=\"input\" type=\"text\" id=\"property-asg-max\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.maxSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\" data-required-rollback=\"true\">\n      </div>\n    </section>\n\n    <section class=\"property-control-group property-asg-size\">\n      <label class=\"left\" for=\"property-asg-capacity\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_DESIRE_CAPACITY", {hash:{},data:data}))
    + "</label>\n      <input class=\"input\" type=\"text\" id=\"property-asg-capacity\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.capacity)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-asg-cooldown\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_COOL_DOWN", {hash:{},data:data}))
    + "</label>\n      <input class=\"input input-short\" type=\"text\" id=\"property-asg-cooldown\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.cooldown)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"digits\" max=\"86400\">\n      <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n    </section>\n\n    <section class=\"property-control-group clearfix\">\n      <label clas=\"left\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HEALTH_CHECK_TYPE", {hash:{},data:data}))
    + "</label>\n      <div class=\"asg-radio-group\">\n        <div class=\"radio\">\n          <input id=\"property-asg-ec2\" type=\"radio\" value=\"ec2\" ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n          <label for=\"property-asg-ec2\"></label>\n        </div>\n        <label for=\"property-asg-ec2\">EC2</label>\n      </div>\n      <div ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n        <div class=\"radio\">\n          <input id=\"property-asg-elb\" type=\"radio\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_elb), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"elb\" ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEC2HealthCheck), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"property-asg-hc-option\" />\n          <label for=\"property-asg-elb\"></label>\n        </div>\n        <label for=\"property-asg-elb\">ELB</label>\n      </div>\n    </section>\n\n    <section class=\"property-control-group\">\n      <label class=\"left\" for=\"property-asg-healthcheck\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HEALTH_CHECK_CRACE_PERIOD", {hash:{},data:data}))
    + "</label>\n      <input class=\"input input-short\" type=\"text\" id=\"property-asg-healthcheck\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthCheckGracePeriod)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" maxlength=\"255\" data-type=\"digits\" data-ignore=\"true\">\n      <span>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_UNIT_SECONDS", {hash:{},data:data}))
    + "</span>\n    </section>\n\n  </div>\n  ";
  return buffer;
  }
function program9(depth0,data) {
  
  
  return "checked=\"true\"";
  }

function program11(depth0,data) {
  
  var buffer = "";
  buffer += "data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_HAS_ELB_WARN", {hash:{},data:data}))
    + "\" class=\"asg-radio-group tooltip\"";
  return buffer;
  }

function program13(depth0,data) {
  
  
  return "class=\"asg-radio-group\"";
  }

function program15(depth0,data) {
  
  
  return "disabled=\"disabled\"";
  }

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_INSTANCE", {hash:{},data:data}))
    + " <span class=\"property-head-num-wrap\">("
    + escapeExpression(((stack1 = (depth0 && depth0.instance_count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></div>\n    <div class=\"option-group\">\n      ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instance_groups), {hash:{},inverse:self.noop,fn:self.program(18, program18, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n  ";
  return buffer;
  }
function program18(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"property-group-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n      <ul class=\"property-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.instances), {hash:{},inverse:self.noop,fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n      ";
  return buffer;
  }
function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li><i class=\"status status-"
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-label tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.healthy)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" ></i>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>\n        ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <section class=\"property-control-group pos-r\">\n        <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_POLICY", {hash:{},data:data}))
    + "</h5>\n        <p class=\"termination-policy-brief\">"
    + escapeExpression(helpers.emptyStr.call(depth0, (depth0 && depth0.term_policy_brief), {hash:{},data:data}))
    + "</p>\n      </section>\n      <ul id=\"property-asg-policies\" class=\"property-list\">\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.policies), {hash:{},inverse:self.noop,fn:self.program(22, program22, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </ul>\n    ";
  return buffer;
  }
function program22(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n          <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.uid)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"property-asg-policy-name\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.arn), {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n          </li>\n\n        ";
  return buffer;
  }
function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div class=\"click-select tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TIP_CLICK_TO_SELECT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.arn)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n            ";
  return buffer;
  }

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.metric)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.evaluation)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.periods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "x"
    + escapeExpression(((stack1 = (depth0 && depth0.minute)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "m</span>\n            <span class=\"asg-p-trigger asg-p-tag asg-p-trigger-"
    + escapeExpression(((stack1 = (depth0 && depth0.trigger)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.trigger)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.adjusttype)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            ";
  return buffer;
  }

function program27(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <section class=\"property-control-group pos-r property-term-p\">\n        <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_POLICY", {hash:{},data:data}))
    + "</h5>\n        <div class=\"termination-policy-brief\">"
    + escapeExpression(((stack1 = (depth0 && depth0.term_policy_brief)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"asg-p-action\"><i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TERMINATION_EDIT", {hash:{},data:data}))
    + "\" id=\"property-asg-term-edit\"></i></div>\n      </section>\n      <ul id=\"property-asg-policies\" class=\"property-list\">\n        <li class=\"pos-r hide\">\n          <h5 class=\"property-asg-policy-name name\"></h5>\n          <span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-trigger asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\"></span>\n          <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\"></span>\n          <div class=\"asg-p-action\">\n            <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n            <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n          </div>\n        </li>\n        ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.policies), {hash:{},inverse:self.noop,fn:self.program(28, program28, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      </ul>\n      <div class=\"property-control-group tac\">\n        <button class=\"btn btn-blue ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.can_add_policy), {hash:{},inverse:self.noop,fn:self.program(30, program30, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-asg-policy-add\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_TIP_YOU_CAN_ONLY_ADD_25_SCALING_POLICIES", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_BTN_ADD_SCALING_POLICY", {hash:{},data:data}))
    + "</button>\n      </div>\n    ";
  return buffer;
  }
function program28(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <li class=\"pos-r\" data-uid=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-old=\"true\">\n          <h5 class=\"property-asg-policy-name name\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_NAME", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</h5>\n          <span class=\"asg-p-metric asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ALARM_METRIC", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.metricName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"asg-p-eval asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_THRESHOLD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.comparisonOperator)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.threshold)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + escapeExpression(((stack1 = (depth0 && depth0.unit)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"asg-p-periods asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_PERIOD", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.evaluationPeriods)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "x"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.alarmData)),stack1 == null || stack1 === false ? stack1 : stack1.period)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "m</span>\n          <span class=\"asg-p-trigger asg-p-tag asg-p-trigger-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ACTION", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <span class=\"asg-p-adjust asg-p-tag\" title=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_ADJUSTMENT", {hash:{},data:data}))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.adjustment)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = (depth0 && depth0.adjustmentType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n          <div class=\"asg-p-action\">\n            <i class=\"icon-edit tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_EDIT", {hash:{},data:data}))
    + "\"></i>\n            <i class=\"icon-remove icon-del tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY_TLT_REMOVE", {hash:{},data:data}))
    + "\"></i>\n          </div>\n        </li>\n        ";
  return buffer;
  }

function program30(depth0,data) {
  
  
  return "disabled tooltip";
  }

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"property-asg-notification-wrap property-control-group\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.sendNotify), {hash:{},inverse:self.program(44, program44, data),fn:self.program(33, program33, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </div>\n\n    ";
  return buffer;
  }
function program33(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <label>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SEND_NOTIFICATION", {hash:{},data:data}))
    + "</label>\n        <section>\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(34, program34, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[1]), {hash:{},inverse:self.noop,fn:self.program(36, program36, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[2]), {hash:{},inverse:self.noop,fn:self.program(38, program38, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[3]), {hash:{},inverse:self.noop,fn:self.program(40, program40, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notifies)),stack1 == null || stack1 === false ? stack1 : stack1[4]), {hash:{},inverse:self.noop,fn:self.program(42, program42, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </section>\n        ";
  return buffer;
  }
function program34(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SUCCESS_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</p>";
  return buffer;
  }

function program36(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_FAILED_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</p>";
  return buffer;
  }

function program38(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SUCCESS_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</p>";
  return buffer;
  }

function program40(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_FAILED_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</p>";
  return buffer;
  }

function program42(depth0,data) {
  
  var buffer = "";
  buffer += "<p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_VALIDATE_SNS", {hash:{},data:data}))
    + "</p>";
  return buffer;
  }

function program44(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <p class=\"property-info tac\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MSG_NO_NOTIFICATION_WARN", {hash:{},data:data}))
    + "</p>\n        ";
  return buffer;
  }

function program46(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      <div class=\"property-control-group property-asg-notification-wrap\">\n        <p>"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SEND_NOTIFICATION", {hash:{},data:data}))
    + "</p>\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns1\" type=\"checkbox\" data-key=\"instanceLaunch\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunch), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns1\"></label>\n        </div>\n        <label for=\"property-asg-sns1\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SUCCESS_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns2\" type=\"checkbox\" data-key=\"instanceLaunchError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceLaunchError), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns2\"></label>\n        </div>\n        <label for=\"property-asg-sns2\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_FAILED_INSTANCES_LAUNCH", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns3\" type=\"checkbox\" data-key=\"instanceTerminate\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminate), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns3\"></label>\n        </div>\n        <label for=\"property-asg-sns3\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_SUCCESS_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns4\" type=\"checkbox\" data-key=\"instanceTerminateError\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.instanceTerminateError), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns4\"></label>\n        </div>\n        <label for=\"property-asg-sns4\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_FAILED_INSTANCES_TERMINATE", {hash:{},data:data}))
    + "</label></div>\n\n        <div><div class=\"checkbox\">\n          <input id=\"property-asg-sns5\" type=\"checkbox\" data-key=\"test\" ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.notification)),stack1 == null || stack1 === false ? stack1 : stack1.test), {hash:{},inverse:self.noop,fn:self.program(47, program47, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n          <label for=\"property-asg-sns5\"></label>\n        </div>\n        <label for=\"property-asg-sns5\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_VALIDATE_SNS", {hash:{},data:data}))
    + "</label></div>\n\n        ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_sns_sub), {hash:{},inverse:self.noop,fn:self.program(49, program49, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n      </div>\n    ";
  return buffer;
  }
function program47(depth0,data) {
  
  
  return "checked=\"checked\"";
  }

function program49(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <p class=\"property-warning ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.has_notification), {hash:{},inverse:self.noop,fn:self.program(50, program50, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"property-asg-sns-info\"> "
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_MSG_SNS_WARN", {hash:{},data:data}))
    + " </p>\n        ";
  return buffer;
  }
function program50(depth0,data) {
  
  
  return "hide";
  }

  buffer += "<article class=\"property-app\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasData), {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasData), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_POLICY", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\">\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.program(27, program27, data),fn:self.program(21, program21, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n\n  </div>\n\n  <div class=\"option-group-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP_ASG_LBL_NOTIFICATION", {hash:{},data:data}))
    + "</div>\n  <div class=\"option-group\" id=\"property-asg-sns\">\n\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isEditable), {hash:{},inverse:self.program(46, program46, data),fn:self.program(32, program32, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n  </div>\n\n</article>\n";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('module/design/property/asg/app_view',['../base/view', './template/app', './template/policy', './template/term', 'i18n!nls/lang.js'], function(PropertyView, template, policy_template, term_template, lang) {
    var ASGAppEditView, adjustMap, adjustTooltip, adjustdefault, metricMap, unitMap;
    metricMap = {
      "CPUUtilization": "CPU Utilization",
      "DiskReadBytes": "Disk Reads",
      "DiskReadOps": "Disk Read Operations",
      "DiskWriteBytes": "Disk Writes",
      "DiskWriteOps": "Disk Write Operations",
      "NetworkIn": "Network In",
      "NetworkOut": "Network Out",
      "StatusCheckFailed": "Status Check Failed (Any)",
      "StatusCheckFailed_Instance": "Status Check Failed (Instance)",
      "StatusCheckFailed_System": "Status Check Failed (System)"
    };
    adjustMap = {
      "ChangeInCapacity": "Change in Capacity",
      "ExactCapacity": "Exact Capacity",
      "PercentChangeInCapacity": "Percent Change in Capacity"
    };
    adjustdefault = {
      "ChangeInCapacity": "eg. -1",
      "ExactCapacity": "eg. 5",
      "PercentChangeInCapacity": "eg. -30"
    };
    adjustTooltip = {
      "ChangeInCapacity": "Increase or decrease existing capacity by integer you input here. A positive value adds to the current capacity and a negative value removes from the current capacity.",
      "ExactCapacity": "Change the current capacity of your Auto Scaling group to the exact value specified.",
      "PercentChangeInCapacity": "Increase or decrease the desired capacity by a percentage of the desired capacity. A positive value adds to the current capacity and a negative value removes from the current capacity"
    };
    unitMap = {
      CPUUtilization: "%",
      DiskReadBytes: "B",
      DiskWriteBytes: "B",
      NetworkIn: "B",
      NetworkOut: "B"
    };
    ASGAppEditView = PropertyView.extend({
      events: {
        "change #property-asg-min": "setSizeGroup",
        "change #property-asg-max": "setSizeGroup",
        "change #property-asg-capacity": "setSizeGroup",
        "click #property-asg-term-edit": "showTermPolicy",
        "click #property-asg-sns input[type=checkbox]": "setNotification",
        "change #property-asg-elb": "setHealthyCheckELBType",
        "change #property-asg-ec2": "setHealthyCheckEC2Type",
        "change #property-asg-cooldown": "setASGCoolDown",
        "change #property-asg-healthcheck": "setHealthCheckGrace",
        "click #property-asg-policy-add": "addScalingPolicy",
        "click #property-asg-policies .icon-edit": "editScalingPolicy",
        "click #property-asg-policies .icon-del": "delScalingPolicy"
      },
      setASGCoolDown: function(event) {
        var $target;
        $target = $(event.target);
        $target.parsley('custom', function(val) {
          if (_.isNumber(+val) && +val > 86400) {
            return lang.ide.PARSLEY_MAX_VALUE_86400;
          }
          return null;
        });
        if ($target.parsley('validate')) {
          return this.model.setASGCoolDown($target.val());
        }
      },
      setHealthCheckGrace: function(event) {
        return this.model.setHealthCheckGrace(event.target.value);
      },
      showTermPolicy: function() {
        var checked, data, p, policy, self, _i, _j, _len, _len1, _ref, _ref1;
        data = [];
        checked = {};
        _ref = this.model.get("terminationPolicies");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          policy = _ref[_i];
          if (policy === "Default") {
            data.useDefault = true;
          } else {
            data.push({
              name: policy,
              checked: true
            });
            checked[policy] = true;
          }
        }
        _ref1 = [lang.ide.PROP_ASG_TERMINATION_POLICY_OLDEST, lang.ide.PROP_ASG_TERMINATION_POLICY_NEWEST, lang.ide.PROP_ASG_TERMINATION_POLICY_OLDEST_LAUNCH, lang.ide.PROP_ASG_TERMINATION_POLICY_CLOSEST];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          if (!checked[p]) {
            data.push({
              name: p,
              checked: false
            });
          }
        }
        modal(term_template(data), true);
        self = this;
        $("#property-asg-term").on("click", "input", function() {
          var $checked, $this;
          $checked = $("#property-asg-term").find("input:checked");
          if ($checked.length === 0) {
            return false;
          }
          $this = $(this);
          checked = $this.is(":checked");
          return $this.closest("li").toggleClass("enabled", checked);
        });
        $("#property-asg-term-done").on("click", function() {
          self.onEditTermPolicy();
          return modal.close();
        });
        $("#property-asg-term").on("mousedown", ".drag-handle", function() {
          return $(this).trigger("mouseleave");
        });
        return $("#property-term-list").sortable({
          handle: '.drag-handle'
        });
      },
      onEditTermPolicy: function() {
        var data;
        data = [];
        $("#property-term-list .list-name").each(function() {
          var $this;
          $this = $(this);
          if ($this.closest("li").hasClass("enabled")) {
            data.push($this.text());
          }
          return null;
        });
        if ($("#property-asg-term-def").is(":checked")) {
          data.push("Default");
        }
        $(".termination-policy-brief").text(data.join(" > "));
        return this.model.setTerminatePolicy(data);
      },
      delScalingPolicy: function(event) {
        var $li, uid;
        $li = $(event.currentTarget).closest("li");
        uid = $li.data("uid");
        $li.remove();
        $("#property-asg-policy-add").removeClass("tooltip disabled");
        return this.model.delPolicy(uid);
      },
      updateScalingPolicy: function(data) {
        var $li, $policies, adjusttype, metric, unit;
        metric = metricMap[data.alarmData.metricName];
        adjusttype = adjustMap[data.adjustmentType];
        unit = unitMap[data.alarmData.metricName] || "";
        if (!data.uid) {
          console.error("Cannot find scaling policy uid");
          return;
        }
        $policies = $("#property-asg-policies");
        $li = $policies.children("[data-uid='" + data.uid + "']");
        if ($li.length === 0) {
          $li = $policies.children(".hide").clone().attr("data-uid", data.uid).removeClass("hide").appendTo($policies);
          $("#property-asg-policy-add").toggleClass("tooltip disabled", $("#property-asg-policies").children().length >= 26);
        }
        $li.find(".name").html(data.name);
        $li.find(".asg-p-metric").html(metric);
        $li.find(".asg-p-eval").html(data.alarmData.comparisonOperator + " " + data.alarmData.threshold + unit);
        $li.find(".asg-p-periods").html(data.alarmData.evaluationPeriods + "x" + Math.round(data.alarmData.period / 60) + "m");
        $li.find(".asg-p-trigger").html(data.state).attr("class", "asg-p-trigger asg-p-tag asg-p-trigger-" + data.state);
        return $li.find(".asg-p-adjust").html(data.adjustment + " " + data.adjustmentType);
      },
      editScalingPolicy: function(event) {
        var $item, $itemLi, $selectbox, $selected, data, isOld, item, key, selectMap, uid, value, _i, _len, _ref;
        $itemLi = $(event.currentTarget).closest("li");
        uid = $itemLi.data('uid');
        isOld = $itemLi.data('old');
        data = this.model.getPolicy(uid);
        data.uid = uid;
        data.title = lang.ide.PROP_ASG_ADD_POLICY_TITLE_EDIT;
        data.isOld = isOld;
        this.showScalingPolicy(data);
        selectMap = {
          metric: data.alarmData.metricName,
          "eval": data.alarmData.comparisonOperator,
          trigger: data.state,
          "adjust-type": data.adjustmentType,
          statistics: data.alarmData.statistic
        };
        for (key in selectMap) {
          value = selectMap[key];
          $selectbox = $("#asg-policy-" + key);
          $selected = null;
          _ref = $selectbox.find(".item");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            $item = $(item);
            if ($item.data("id") === value) {
              $selected = $item;
              break;
            }
          }
          if ($selected) {
            $selectbox.find(".selected").removeClass("selected");
            $selectbox.find(".selection").html($selected.addClass("selected").html());
          }
        }
        return $(".pecentcapcity").toggle($("#asg-policy-adjust-type").find(".selected").data("id") === "PercentChangeInCapacity");
      },
      addScalingPolicy: function(event) {
        if ($(event.currentTarget).hasClass("disabled")) {
          return false;
        }
        this.showScalingPolicy();
        return false;
      },
      showScalingPolicy: function(data) {
        var self;
        if (!data) {
          data = {
            title: lang.ide.PROP_ASG_ADD_POLICY_TITLE_ADD,
            name: this.model.defaultScalingPolicyName(),
            minAdjustStep: 1,
            alarmData: {
              evaluationPeriods: 2,
              period: 5
            }
          };
        }
        if (data.alarmData && data.alarmData.metricName) {
          data.unit = unitMap[data.alarmData.metricName];
        } else {
          data.unit = '%';
        }
        data.noSNS = !this.model.attributes.has_sns_sub;
        data.detail_monitor = this.model.attributes.detail_monitor;
        modal(policy_template(data), true);
        self = this;
        $("#property-asg-policy-done").on("click", function() {
          var result;
          result = $("#asg-termination-policy").parsley("validate");
          if (result === false) {
            return false;
          }
          self.onPolicyDone();
          return modal.close();
        });
        $("#asg-policy-name").parsley('custom', function(name) {
          var uid;
          uid = $("#property-asg-policy").data("uid");
          if (self.model.isDupPolicyName(uid, name)) {
            return lang.ide.PARSLEY_DUPLICATED_POLICY_NAME;
          }
        });
        $("#asg-policy-periods").on("change", function() {
          var val;
          val = parseInt($(this).val(), 10);
          if (!val || val < 1) {
            $(this).val("1");
          }
          if (val > 86400) {
            return $(this).val(86400);
          }
        });
        $("#asg-policy-second").on("change", function() {
          var val;
          val = parseInt($(this).val(), 10);
          if (!val || val < 1) {
            $(this).val("1");
          }
          if (val > 1440) {
            return $(this).val(1440);
          }
        });
        $("#asg-policy-adjust-type").on("OPTION_CHANGE", function() {
          var type;
          type = $(this).find(".selected").data("id");
          $(".pecentcapcity").toggle(type === "PercentChangeInCapacity");
          return $("#asg-policy-adjust").attr("placeholder", adjustdefault[type]).data("tooltip", adjustTooltip[type]).trigger("change");
        });
        $("#asg-policy-adjust").on("change", function() {
          var type, val;
          type = $("#asg-policy-adjust-type").find(".selected").data("id");
          val = parseInt($(this).val(), 10);
          if (type === "ExactCapacity") {
            if (!val || val < 1) {
              $(this).val("1");
            }
          } else if (type === "PercentChangeInCapacity") {
            if (!val) {
              $(this).val("0");
            } else if (val < -100) {
              $(this).val("-100");
            }
          }
          if (val < -65534) {
            $(this).val(-65534);
          } else if (val > 65534) {
            $(this).val(65534);
          }
          return $("#").data("tooltip", adjustTooltip[type]).trigger("change");
        });
        $("#asg-policy-cooldown").on("change", function() {
          var $this, val;
          $this = $("#asg-policy-cooldown");
          val = parseInt($this.val(), 10);
          if (isNaN(val)) {
            return;
          }
          if (val < 0) {
            val = 0;
          } else if (val > 1440) {
            val = 1440;
          }
          return $this.val(val);
        });
        $("#asg-policy-step").on("change", function() {
          var $this, val;
          $this = $("#asg-policy-step");
          val = parseInt($this.val(), 10);
          if (isNaN(val)) {
            return;
          }
          if (val < 0) {
            val = 0;
          } else if (val > 65534) {
            val = 65534;
          }
          return $this.val(val);
        });
        $("#asg-policy-threshold").on("change", function() {
          var metric, val;
          metric = $("#asg-policy-metric .selected").data("id");
          val = parseInt($(this).val(), 10);
          if (metric === "CPUUtilization") {
            if (isNaN(val) || val < 1) {
              return $(this).val("1");
            } else if (val > 100) {
              return $(this).val("100");
            }
          }
        });
        $("#asg-policy-notify").on("click", function(evt) {
          $("#asg-policy-no-sns").toggle($("#asg-policy-notify").is(":checked"));
          evt.stopPropagation();
          return null;
        });
        $("#asg-policy-metric").on("OPTION_CHANGE", function() {
          $("#asg-policy-unit").html(unitMap[$(this).find(".selected").data("id")] || "");
          return $('#asg-policy-threshold').val('');
        });
        return null;
      },
      onPolicyDone: function() {
        var data;
        data = {
          uid: $("#property-asg-policy").data("uid"),
          name: $("#asg-policy-name").val(),
          cooldown: $("#asg-policy-cooldown").val() * 60,
          minAdjustStep: $("#asg-policy-step").val(),
          adjustment: $("#asg-policy-adjust").val(),
          adjustmentType: $("#asg-policy-adjust-type .selected").data("id"),
          state: $("#asg-policy-trigger .selected").data("id"),
          sendNotification: $("#asg-policy-notify").is(":checked"),
          alarmData: {
            metricName: $("#asg-policy-metric .selected").data("id"),
            comparisonOperator: $("#asg-policy-eval .selected").data("id"),
            period: $("#asg-policy-second").val() * 60,
            evaluationPeriods: $("#asg-policy-periods").val(),
            statistic: $("#asg-policy-statistics .selected").data("id"),
            threshold: $("#asg-policy-threshold").val()
          }
        };
        this.model.setPolicy(data);
        this.updateScalingPolicy(data);
        return null;
      },
      setNotification: function() {
        var checkMap, hasChecked;
        checkMap = {};
        hasChecked = false;
        $("#property-asg-sns input[type = checkbox]").each(function() {
          var checked;
          checked = $(this).is(":checked");
          checkMap[$(this).attr("data-key")] = checked;
          if (checked) {
            hasChecked = true;
          }
          return null;
        });
        if (hasChecked) {
          $("#property-asg-sns-info").show();
        } else {
          $("#property-asg-sns-info").hide();
        }
        return this.model.setNotification(checkMap);
      },
      setHealthyCheckELBType: function(event) {
        return this.model.setHealthCheckType('ELB');
      },
      setHealthyCheckEC2Type: function(event) {
        return this.model.setHealthCheckType('EC2');
      },
      render: function() {
        var data, p, _i, _len, _ref;
        data = this.model.toJSON();
        if (data.isEditable) {
          _ref = data.policies;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            p.alarmData.metricName = metricMap[p.alarmData.metricName];
            p.unit = unitMap[p.alarmData.metricName];
            p.adjustmentType = adjustMap[p.adjustmentType];
            p.isNew = !p.appId;
          }
          data.term_policy_brief = data.terminationPolicies.join(" > ");
          data.can_add_policy = data.policies.length < 25;
        }
        this.$el.html(template(data));
        return data.name;
      },
      setSizeGroup: function(event) {
        var $capacity, $max, $min;
        $min = this.$el.find('#property-asg-min');
        $max = this.$el.find('#property-asg-max');
        $capacity = this.$el.find('#property-asg-capacity');
        $min.parsley('custom', function(val) {
          if (+val < 1) {
            return lang.ide.PARSLEY_ASG_SIZE_MUST_BE_EQUAL_OR_GREATER_THAN_1;
          }
          if (+val > +$max.val()) {
            return lang.ide.PARSLEY_MINIMUM_SIZE_MUST_BE_LESSTHAN_MAXIMUM_SIZE;
          }
        });
        $max.parsley('custom', function(val) {
          if (+val < 1) {
            return lang.ide.PARSLEY_ASG_SIZE_MUST_BE_EQUAL_OR_GREATER_THAN_1;
          }
          if (+val < +$min.val()) {
            return lang.ide.PARSLEY_MINIMUM_SIZE_MUST_BE_LESSTHAN_MAXIMUM_SIZE;
          }
        });
        $capacity.parsley('custom', function(val) {
          if (+val < 1) {
            return lang.ide.PARSLEY_DESIRED_CAPACITY_EQUAL_OR_GREATER_1;
          }
          if (+val < +$min.val() || +val > +$max.val()) {
            return lang.ide.PARSLEY_DESIRED_CAPACITY_IN_ALLOW_SCOPE;
          }
        });
        if ($(event.currentTarget).parsley('validateForm')) {
          this.model.setASGMin($min.val());
          this.model.setASGMax($max.val());
          return this.model.setASGDesireCapacity($capacity.val());
        }
      }
    });
    return new ASGAppEditView();
  });

}).call(this);

(function() {
  define('module/design/property/asg/main',['../base/main', './model', './view', 'constant', './app_model', './app_view'], function(PropertyModule, model, view, constant, app_model, app_view) {
    var AsgModule;
    AsgModule = PropertyModule.extend({
      handleTypes: [constant.RESTYPE.ASG, "ExpandedAsg"],
      initStack: function() {
        this.model = model;
        this.view = view;
        return null;
      },
      initApp: function() {
        this.model = app_model;
        this.model.isAppEdit = false;
        this.view = app_view;
        return null;
      },
      initAppEdit: function() {
        this.model = app_model;
        this.model.isAppEdit = true;
        this.view = app_view;
        return null;
      }
    });
    return null;
  });

}).call(this);

(function() {
  define('property',['event', 'constant', 'MC', './module/design/property/view', './module/design/property/base/main', './module/design/property/base/view', "Design", 'i18n!nls/lang.js', './module/design/property/stack/main', './module/design/property/instance/main', './module/design/property/servergroup/main', './module/design/property/connection/main', './module/design/property/staticsub/main', './module/design/property/missing/main', './module/design/property/sg/main', './module/design/property/sgrule/main', './module/design/property/volume/main', './module/design/property/elb/main', './module/design/property/az/main', './module/design/property/subnet/main', './module/design/property/vpc/main', './module/design/property/rtb/main', './module/design/property/static/main', './module/design/property/cgw/main', './module/design/property/vpn/main', './module/design/property/eni/main', './module/design/property/acl/main', './module/design/property/launchconfig/main', './module/design/property/asg/main'], function(ide_event, CONST, MC, View, PropertyBaseModule, PropertyBaseView, Design, lang) {
    var loadModule, openPorperty, openTab, restore, snapshot, unLoadModule, updateActiveModule, view;
    view = null;
    loadModule = function() {
      view = new View();
      ide_event.trigger(ide_event.DESIGN_SUB_COMPLETE);
      ide_event.onLongListen(ide_event.REFRESH_PROPERTY, function() {
        $canvas($canvas.selected_node()).select();
        return null;
      });
      ide_event.onLongListen(ide_event.FORCE_OPEN_PROPERTY, function(tab) {
        view.forceShow(tab);
        return null;
      });
      PropertyBaseView.event.on(PropertyBaseView.event.FORCE_SHOW, function(tab) {
        view.forceShow(tab);
        return null;
      });
      PropertyBaseView.event.on(PropertyBaseView.event.OPEN_SUBPANEL_IMM, function() {
        view.immShowSecondPanel();
        return null;
      });
      PropertyBaseModule.event.on(PropertyBaseModule.event.HIDE_SUB_PANEL, function() {
        view.immHideSecondPanel();
        return null;
      });
      PropertyBaseView.event.on(PropertyBaseView.event.OPEN_SUBPANEL, function() {
        view.showSecondPanel();
        return null;
      });
      ide_event.onLongListen(ide_event.SHOW_STATE_EDITOR, function(uid) {
        view.renderState(uid, null, true);
        return null;
      });
      view.on("HIDE_SUBPANEL", function() {
        PropertyBaseModule.onUnloadSubPanel();
        return null;
      });
      view.on("GET_CURRENT_UID", function(event) {
        var activeModule;
        activeModule = PropertyBaseModule.activeModule();
        event.uid = activeModule ? activeModule.uid : "";
        return null;
      });
      return ide_event.onLongListen(ide_event.OPEN_PROPERTY, openPorperty);
    };
    openPorperty = function(type, uid, force, tab) {
      var stateStatus;
      stateStatus = view.processState(uid, type);
      if (openTab(tab, uid)) {
        return;
      }
      if (view.currentTab === 'state' && stateStatus) {
        view.renderState(uid, type);
        updateActiveModule(uid, type);
        return null;
      } else {
        return view.renderProperty(uid, type, force);
      }
    };
    updateActiveModule = function(uid, type) {
      var activeModule;
      activeModule = PropertyBaseModule.activeModule();
      activeModule.uid = uid;
      activeModule.comType = type;
      return null;
    };
    openTab = function(tab, uid) {
      if (tab === 'property') {
        view.renderProperty(uid);
        return true;
      } else if (tab === 'state') {
        view.renderState(uid);
        return true;
      } else {
        return false;
      }
    };
    unLoadModule = function() {
      return null;
    };
    snapshot = function() {
      return PropertyBaseModule.snapshot(view);
    };
    restore = function(snapshot) {
      view.restore(snapshot);
      return PropertyBaseModule.restore(snapshot, view);
    };
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule,
      snapshot: snapshot,
      restore: restore
    };
  });

}).call(this);

