define(['event'], function(ide_event) {
  var PropertyModule, activeModule, activeModuleType, activeSubModule, activeSubModuleType, propertySubTypeMap, propertyTypeMap, propertyTypeRegExpArr, slice, __getProperty, __loadProperty, __resetSelectedinGroup;
  activeModule = null;
  activeModuleType = null;
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
    return __loadProperty(propertySubTypeMap[subPanelID], subPanelID, componentUid, activeModule.type);
  };
  PropertyModule.extend = function(protoProps, staticProps) {

    /* env:dev                                                                                                                                                                                                                                                env:dev:end */
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

      /* env:dev                                                                                                                                    env:dev:end */
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
  PropertyModule.load = function(componentType, componentUid, tab_type, restore) {
    var loadResult, property;
    property = __getProperty(componentType, componentUid, tab_type);
    loadResult = __loadProperty(property, componentType, componentUid, tab_type, restore);
    if (loadResult !== true) {
      if (loadResult === false) {
        componentType = 'Missing_Resource';
      } else {
        componentType = "";
        console.warn("Cannot open component for type: " + componentType + ", data : " + componentUid);
      }
      property = __getProperty(componentType, componentUid, tab_type);
      return __loadProperty(property, componentType, componentUid, tab_type, restore);
    }
    return true;
  };
  __getProperty = function(componentType, componentUid, tab_type) {
    var handle, property, r, _i, _len;
    if (!componentType) {
      componentType = propertyTypeMap.DEFAULT_TYPE;
    }
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
  __loadProperty = function(property, componentType, componentUid, tab_type, restore) {
    var procName, result, _ref;
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
      activeModuleType = componentType;
    }
    if ((_ref = property.model) != null ? _ref.init : void 0) {
      property.model.clear({
        silent: true
      });
      if (property.model.init(componentUid) === false) {
        return false;
      }
    }
    __resetSelectedinGroup(restore, property.model);
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
  __resetSelectedinGroup = function(restore, model) {};
  PropertyModule.onUnloadSubPanel = function() {
    if (activeModule.onUnloadSubPanel) {
      activeModule.onUnloadSubPanel(activeSubModule.subPanelID);
    }
    activeSubModule = null;
    activeSubModuleType = null;
    return null;
  };
  PropertyModule.snapshot = function() {
    return {
      activeModuleId: activeModule.uid,
      activeModuleType: activeModuleType,
      activeSubModuleId: activeSubModule ? activeSubModule.uid : null,
      activeSubModuleType: activeSubModuleType,
      tab_type: activeModule.type
    };
  };
  PropertyModule.restore = function(ss, propertyView) {
    PropertyModule.load(ss.activeModuleType, ss.activeModuleId, ss.tab_type, true);
    if (ss.activeSubModuleType) {
      PropertyModule.__restore = true;
      PropertyModule.loadSubPanel(ss.activeSubModuleType, ss.activeSubModuleId, true);
      PropertyModule.__restore = false;
    }
    return null;
  };
  return PropertyModule;
});
