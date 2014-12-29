define('workspaces/coreeditor/TplOpsEditor',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"modal":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div id=\"OpsEditor\" class=\"pos-r\">\n  <aside class=\"OEPanelLeft\"></aside>\n  <aside class=\"OEPanelRight\" id=\"OEPanelRight\"></aside>\n\n<div class=\"OEMiddleWrap\">\n  <nav class=\"OEPanelTop\"></nav>\n  <div class=\"OEPanelBottom\"></div>\n\n  <section class=\"OEPanelCenter nano\"> <div class=\"nano-content\">\n    <div class=\"canvas-view\">\n      <button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CANVAS.CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <svg width=\"100%\" height=\"100%\"></svg>\n    </div> </div>\n    <q class=\"canvas-message\"></q>\n  </section>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"ops-process\">\n  <header class=\"processing\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LOADING_DATA", {hash:{},data:data}))
    + "</header>\n  <section class=\"loading-spinner\"></section>\n</div>";
  return buffer;
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " "
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.HAS_UNSAVED_CHANGES", {hash:{},data:data}))
    + "</div>\n        <div class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CLOSE_CONFIRM", {hash:{},data:data}))
    + "</div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.modal.onClose=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.VPC_REMOVED_OUTSIDE_VISUALOPS", {hash:{},data:data}))
    + "</p>\n<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.CONFIRM_REMOVE_APP", {hash:{},data:data}))
    + "</p>";
  return buffer;
  };
TEMPLATE.modal.confirmRemoveApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.IMPORT_SUCCESSFULLY_WELL_DONE", (depth0 && depth0.name), {hash:{},data:data}))
    + "</p>\n<p class=\"modal-text-major\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.NAME_IMPORTED_APP", {hash:{},data:data}))
    + "</p>\n<div class=\"modal-control-group\">\n    <label for=\"ImportSaveAppName\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_NAME", {hash:{},data:data}))
    + "</label>\n    <input id=\"ImportSaveAppName\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"string\" autofocus>\n</div>\n<div class=\"modal-control-group app-usage-group clearfix\">\n    <label for=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_USAGE", {hash:{},data:data}))
    + "</label>\n    <div id=\"app-usage-selectbox\" class=\"selectbox\">\n        <div class=\"selection\"><i class=\"icon-app-type-testing\"></i>Testing</div>\n        <ul class=\"dropdown\" tabindex=\"-1\">\n            <li class=\"selected item\" data-value=\"testing\"><i class=\"icon-app-type-testing\"></i>Testing</li>\n            <li class=\"item\" data-value=\"development\"><i class=\"icon-app-type-development\"></i>Development</li>\n            <li class=\"item\" data-value=\"production\"><i class=\"icon-app-type-production\"></i>Production</li>\n            <li class=\"item\" data-value=\"others\"><i class=\"icon-app-type-others\" data-value=\"testing\"></i>Others</li>\n        </ul>\n    </div>\n</div>\n\n<section style=\"margin:5px 5px 20px 8px;\">\n  <div class=\"checkbox\"><input id=\"MonitorImportApp\" type=\"checkbox\" checked=\"checked\"><label for=\"MonitorImportApp\"></label></div>\n  <label for=\"MonitorImportApp\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.MONITOR_REPORT_EXTERNAL_RESOURCE", {hash:{},data:data}))
    + "</label>\n  <i class=\"icon-info tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.IF_RESOURCE_CHANGED_EMAIL_SENT", {hash:{},data:data}))
    + "\" style=\"color:#148BE6;vertical-align:-3px;\"></i>\n</section>\n\n<p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.YOU_CAN_MANAGE_RESOURCES_LIFECYCLE", {hash:{},data:data}))
    + "</p>";
  return buffer;
  };
TEMPLATE.modal.confirmImport=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "has-progess";
  }

function program3(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program5(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "PROC_TITLE", {hash:{},data:data}));
  }

  buffer += "<div class='ops-process ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.progress), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'>\n  <section class=\"processing-wrap\">\n    <header class=\"processing\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"process-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</span></header>\n    <header class=\"processing rolling-back-content\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROP.ROLLING_BACK", {hash:{},data:data}))
    + "</header>\n    <section class=\"loading-spinner\"></section>\n    <section class=\"progress\">\n        <div class=\"bar\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div>\n    </section>\n  </section>\n\n  <section class=\"success hide\">\n    <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_TITLE", {hash:{},data:data}))
    + "</p>\n    <p class=\"sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_SUB_TITLE", {hash:{},data:data}))
    + "</p>\n  </section>\n\n  <section class=\"fail hide error-info-block\">\n    <header>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_FAILED_TITLE", {hash:{},data:data}))
    + "</header>\n    <p class=\"sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</p>\n    <div class=\"result-error-info\">\n      <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\n      <p class=\"detail\"></p>\n    </div>\n    <button class=\"btn btn-silver btn-close-process right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_CLOSE_TAB", {hash:{},data:data}))
    + "</button>\n  </section>\n</div>";
  return buffer;
  };
TEMPLATE.progressView=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"ops-process\">\n    <header class=\"processing\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "<span class=\"process-info\">0%</span></header>\n    <header class=\"processing rolling-back-content\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.ROLLING_BACK", {hash:{},data:data}))
    + "</header>\n    <section class=\"loading-spinner\"></section>\n    <section class=\"progress\">\n        <div class=\"bar\" style=\"width:0%;\"></div>\n    </section>\n</div>";
  return buffer;
  };
TEMPLATE.appProcessing=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <header class=\"processing\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.RELOADING_DATA", {hash:{},data:data}))
    + "</header>\n  <section class=\"loading-spinner\"></section>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <header class=\"processing\">";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</header>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <button class=\"btn btn-silver\" id=\"processDoneBtn\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.LBL_DONE", {hash:{},data:data}))
    + "</button>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_UPDATE_SUCCESSFULLY_TITLE", {hash:{},data:data}));
  }

function program6(depth0,data) {
  
  
  return escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_UPDATE_FAILED_TITLE", {hash:{},data:data}));
  }

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"error-info-block\">\n    <div class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</div>\n    <div class=\"result-error-info\">\n      <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\n      <p class=\"detail\">";
  stack1 = ((stack1 = (depth0 && depth0.error)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    </div>\n    <div class=\"result-error-notice\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOLBAR.APP_ROllBACK_DESC", {hash:{},data:data}))
    + "</div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"ops-process\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.appUpdateStatus=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('ProgressViewer',["OpsModel", "Workspace", "workspaces/coreeditor/TplOpsEditor", "backbone"], function(OpsModel, Workspace, OpsEditorTpl) {
    var OpsProgress, OpsProgressView;
    OpsProgressView = Backbone.View.extend({
      events: {
        "click .btn-close-process": "close"
      },
      initialize: function() {
        var data;
        this.listenTo(this.model, "destroy", this.updateState);
        this.listenTo(this.model, "change:state", this.updateState);
        this.listenTo(this.model, "change:progress", this.updateProgress);
        data = {
          progress: this.model.get("progress")
        };
        if (!this.model.testState(OpsModel.State.Initializing)) {
          data.title = this.model.getStateDesc() + " your app...";
        }
        this.setElement($(OpsEditorTpl.progressView(data)).appendTo("#main"));
        this.__progress = 0;
      },
      switchToDone: function() {
        var self;
        this.$el.find(".success").show();
        self = this;
        setTimeout(function() {
          self.$el.find(".processing-wrap").addClass("fadeout");
          self.$el.find(".success").addClass("fadein");
        }, 10);
        setTimeout(function() {
          return self.trigger("done");
        }, 2000);
      },
      updateState: function() {
        switch (this.model.get("state")) {
          case OpsModel.State.Running:
          case OpsModel.State.Stopped:
            if (this.__awake) {
              this.switchToDone();
            } else {
              this.done = true;
            }
            break;
          case OpsModel.State.Destroyed:
            if (this.done) {
              this.close();
              return;
            }
            this.$el.children().hide();
            this.$el.find(".fail").show();
            this.$el.find(".detail").html(this.model.get("opsActionError").replace(/\n/g, "<br/>"));
            break;
          default:
            console.error("The model has changed to a state that OpsProgress doesn't recongnize", this.model);
        }
      },
      updateProgress: function() {
        var pp, pro;
        pp = this.model.get("progress");
        this.$el.toggleClass("has-progess", true);
        if (this.__progress > pp) {
          this.$el.toggleClass("rolling-back", true);
        }
        this.__progress = pp;
        pro = "" + pp + "%";
        this.$el.find(".process-info").text(pro);
        this.$el.find(".bar").css({
          width: pro
        });
      },
      close: function() {
        return this.trigger("close");
      },
      awake: function() {
        this.$el.show();
        this.__awake = true;
        if (this.done) {
          this.done = false;
          this.switchToDone();
        }
      },
      sleep: function() {
        this.$el.hide();
        this.__awake = false;
      }
    });
    OpsProgress = (function(_super) {
      __extends(OpsProgress, _super);

      OpsProgress.prototype.isWorkingOn = function(attribute) {
        return this.opsModel === attribute;
      };

      OpsProgress.prototype.tabClass = function() {
        return "icon-app-pending";
      };

      OpsProgress.prototype.title = function() {
        return this.opsModel.get("name") + " - app";
      };

      OpsProgress.prototype.url = function() {
        return this.opsModel.url();
      };

      function OpsProgress(opsModel) {
        if (!opsModel) {
          this.remove();
          throw new Error("Cannot find opsmodel while openning workspace.");
        }
        if (opsModel.testState(OpsModel.State.Saving) || opsModel.testState(OpsModel.State.Terminating)) {
          console.warn("Avoiding opening a saving/terminating OpsModel.");
          this.remove();
          return;
        }
        this.opsModel = opsModel;
        return Workspace.apply(this, arguments);
      }

      OpsProgress.prototype.initialize = function() {
        var self;
        this.view = new OpsProgressView({
          model: this.opsModel
        });
        this.view.workspace = this;
        this.listenTo(this.opsModel, "change:id", function() {
          this.updateUrl();
        });
        self = this;
        this.view.on("close", function() {
          return self.remove();
        });
        this.view.on("done", function() {
          var index, ws;
          index = self.index();
          self.remove();
          ws = App.openOps(self.opsModel);
          ws.setIndex(index);
        });
      };

      OpsProgress.prototype.awake = function() {
        return this.view.awake();
      };

      OpsProgress.prototype.sleep = function() {
        return this.view.sleep();
      };

      return OpsProgress;

    })(Workspace);
    return OpsProgress;
  });

}).call(this);

(function() {
  define('Design',["constant", "OpsModel", 'CloudResources'], function(constant, OpsModel, CloudResources) {

    /* env:prod */
    var Design, createRecursiveCheck, noop, __instance, __modelClassMap, __resolveFirstMap;
    createRecursiveCheck = function() {
      return createRecursiveCheck.o || (createRecursiveCheck.o = {
        check: function() {}
      });
    };

    /* env:prod:end */

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                         env:dev:end */
    noop = function() {};
    __modelClassMap = {};
    __resolveFirstMap = {};
    __instance = null;

    /*
      -------------------------------
       Design is the main controller of the framework. It handles the input / ouput of the Application ( a.k.a the DesignCanvas ).
       The input and ouput is the same : the JSON data.
      -------------------------------
    
    
      ++ Class Method ++
    
       * instance() : Design
          description : returns the currently used Design object.
    
       * modelClassForType( typeString ) : Class
          description : returns an Class for the specified typeString.
    
       * debug() :
          description : prints all the resource in the console.
    
       * debug.selectedComp() :
          description : prints the selected resouorce in console.
    
    
      ++ Object Method ++
    
       * component( uid ) : ResourceModel
          description : returns a resource model of uid
    
       * eachComponent( iterator ) :
          description : the iterator will execute with all the components.
    
       * use() :
          description : make the design object to be Design.instance()
    
       * save( component_data, layout_data ) :
          description : save the data, so that isModified() will use the saved data.
    
       * isModified() : Boolean
          description : returns true if the stack is modified since last save.
    
       * serialize() : Object
          description : returns a Plain JS Object that is indentical to JSON data.
    
       * serializeAsStack() : Object
          description : same as serialize(), but it ensure that the JSON will be a stack JSON.
    
       * getCost() : Array
          description : return an array of cost object to represent the cost of the stack.
     */
    Design = Backbone.Model.extend({
      constructor: function(opsModel) {
        var json;
        this.__opsModel = opsModel;
        Backbone.Model.call(this);
        this.use();
        json = opsModel.getJsonData();
        this.deserialize($.extend(true, {}, json.component), $.extend(true, {}, json.layout));
      },
      initialize: function() {
        var canvas_data, component, layout;
        this.__componentMap = {};
        this.__classCache = {};
        this.__usedUidCache = {};
        this.__initializing = false;
        canvas_data = this.__opsModel.getJsonData();
        if (this.__opsModel.testState(OpsModel.State.UnRun)) {
          this.__mode = Design.MODE.Stack;
        } else {
          this.__mode = Design.MODE.App;
        }
        component = canvas_data.component;
        layout = canvas_data.layout;
        delete canvas_data.component;
        delete canvas_data.layout;
        this.attributes = $.extend(true, {
          canvasSize: layout.size
        }, canvas_data);
        canvas_data.component = component;
        canvas_data.layout = layout;
        return null;
      },
      deserialize: function(json_data, layout_data) {
        var ModelClass, comp, defaultLayout, devistor, recursiveCheck, resolveDeserialize, that, uid, version, _i, _len, _old_get_component_, _ref;
        console.assert(Design.instance() === this);
        console.debug("Deserializing data :", [json_data, layout_data]);
        version = this.get("version");
        _ref = this.constructor.__deserializeVisitors || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          devistor = _ref[_i];
          devistor(json_data, layout_data, version);
        }
        this.trigger = noop;
        this.__initializing = true;
        defaultLayout = {
          coordinate: [0, 0],
          size: [0, 0]
        };
        that = this;
        resolveDeserialize = function(uid) {
          var ModelClass, component_data, obj;
          if (!uid) {
            return null;
          }
          obj = that.__componentMap[uid];
          if (obj) {
            return obj;
          }
          recursiveCheck.check(uid);
          component_data = json_data[uid];
          if (!component_data) {
            console.warn("Unknown uid for resolving component :", uid, json_data);
            return;
          }
          ModelClass = Design.modelClassForType(component_data.type);
          if (!ModelClass) {
            console.warn("We do not support deserializing resource of type : " + component_data.type);
            return;
          }
          ModelClass.deserialize(component_data, layout_data[uid] || defaultLayout, resolveDeserialize);
          return __instance.__componentMap[uid];
        };
        _old_get_component_ = this.component;
        this.component = null;
        for (uid in json_data) {
          comp = json_data[uid];
          this.__usedUidCache[uid] = true;
          if (__resolveFirstMap[comp.type] === true) {
            ModelClass = Design.modelClassForType(comp.type);
            if (!ModelClass) {
              console.warn("We do not support deserializing resource of type : " + component_data.type);
              continue;
            }
            if (!ModelClass.preDeserialize) {
              console.error("The class is marked as resolveFirst, yet it doesn't implement preDeserialize()");
              continue;
            }
            ModelClass.preDeserialize(comp, layout_data[uid] || defaultLayout);
          }
        }
        this.component = resolveDeserialize;
        for (uid in json_data) {
          comp = json_data[uid];
          if (__resolveFirstMap[comp.type] === true) {
            recursiveCheck = createRecursiveCheck(uid);
            Design.modelClassForType(comp.type).deserialize(comp, layout_data[uid] || defaultLayout, resolveDeserialize);
          } else {
            recursiveCheck = createRecursiveCheck();
            resolveDeserialize(uid);
          }
        }
        this.component = _old_get_component_;
        for (uid in json_data) {
          comp = json_data[uid];
          ModelClass = Design.modelClassForType(comp.type);
          if (ModelClass && ModelClass.postDeserialize) {
            ModelClass.postDeserialize(comp, layout_data[uid] || defaultLayout);
          }
        }
        this.__initializing = false;
        Backbone.Events.trigger.call(this, Design.EVENT.Deserialized);
        this.trigger = Backbone.Events.trigger;
        return null;
      },
      reload: function() {
        var json, oldDesign;
        oldDesign = Design.instance();
        this.use();
        this.initialize();
        json = this.__opsModel.getJsonData();
        this.deserialize($.extend(true, {}, json.component), $.extend(true, {}, json.layout));
        if (oldDesign) {
          oldDesign.use();
        }
      },
      classCacheForCid: function(cid) {
        var cache;
        if (this.__classCache[cid]) {
          return this.__classCache[cid];
        }
        cache = this.__classCache[cid] = [];
        return cache;
      },
      cacheComponent: function(id, comp) {
        if (!comp) {
          comp = this.__componentMap;
          delete this.__componentMap[id];
          if (this.modeIsAppEdit()) {
            this.reclaimGuid(id);
          }
        } else {
          this.__componentMap[id] = comp;
        }
        return null;
      },
      reclaimGuid: function(guid) {
        return delete this.__usedUidCache[guid];
      },
      guid: function() {
        var newId;
        newId = MC.guid();
        while (this.__usedUidCache[newId]) {
          console.warn("GUID collision detected, the generated GUID is " + newId + ". Try generating a new one.");
          newId = MC.guid();
        }
        this.__usedUidCache[newId] = true;
        return newId;
      },
      set: function(key, value) {
        this.attributes[key] = value;
        this.trigger("change:" + key);
        this.trigger("change");
      },
      get: function(key) {
        if (key === "id") {
          return this.__opsModel.get("id");
        } else if (key === "state") {
          return this.__opsModel.getStateDesc();
        } else {
          return this.attributes[key];
        }
      },
      type: function() {
        return this.__opsModel.type;
      },
      region: function() {
        return this.attributes.region;
      },
      modeIsStack: function() {
        return this.__mode === Design.MODE.Stack;
      },
      modeIsApp: function() {
        return this.__mode === Design.MODE.App;
      },
      modeIsAppView: function() {
        return false;
      },
      modeIsAppEdit: function() {
        return this.__mode === Design.MODE.AppEdit;
      },
      mode: function() {
        return this.__mode;
      },
      setMode: function(m) {
        if (this.__mode === m) {
          return;
        }
        this.__mode = m;
        this.preserveName();
        this.trigger("change:mode", m);
      },
      initializing: function() {
        return this.__initializing;
      },
      use: function() {
        __instance = this;
        return this;
      },
      unuse: function() {
        if (__instance === this) {
          __instance = null;
        }
      },
      component: function(uid) {
        return this.__componentMap[uid];
      },
      componentsOfType: function(type) {
        return this.classCacheForCid(Design.modelClassForType(type).prototype.classId).slice(0);
      },
      eachComponent: function(func, context) {
        var comp, uid, _ref;
        console.assert(_.isFunction(func), "User must pass in a function for Design.instance().eachComponent()");
        context = context || this;
        _ref = this.__componentMap;
        for (uid in _ref) {
          comp = _ref[uid];
          if (func.call(context, comp) === false) {
            break;
          }
        }
        return null;
      },
      isModified: function() {
        var backing, newData;
        if (this.modeIsApp()) {
          console.warn("Testing Design.isModified() in app mode and visualize mode. This should not be happening.");
          return false;
        }
        backing = this.__opsModel.getJsonData();
        if (this.attributes.name !== backing.name) {
          return true;
        }
        newData = this.serialize();
        if (_.isEqual(backing.component, newData.component)) {
          if (_.isEqual(backing.layout, newData.layout)) {
            return false;
          }
        }
        return true;
      },
      serialize: function(options) {
        var c, comp, component_data, connections, currentDesignObj, data, error, j, json, layout_data, mockArray, p1, p2, uid, visitor, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        currentDesignObj = Design.instance();
        this.use();
        console.debug("Design is serializing.");
        component_data = {};
        layout_data = {};
        connections = [];
        mockArray = [];
        _ref = this.__componentMap;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.isRemoved()) {
            console.warn("Resource has been removed, yet it remains in cache when serializing :", comp);
            continue;
          }
          if (comp.node_line) {
            connections.push(comp);
            continue;
          }
          try {
            json = comp.serialize(options);

            /* env:prod */
          } catch (_error) {
            error = _error;
            console.error("Error occur while serializing", error);

            /* env:prod:end */
          } finally {

          }
          if (!json) {
            continue;
          }
          if (!_.isArray(json)) {
            mockArray[0] = json;
            json = mockArray;
          }
          for (_i = 0, _len = json.length; _i < _len; _i++) {
            j = json[_i];
            if (j.component) {
              console.assert(j.component.uid, "Serialized JSON data has no uid.");
              console.assert(!component_data[j.component.uid], "ResourceModel cannot modify existing JSON data.");
              component_data[j.component.uid] = j.component;
            }
            if (j.layout) {
              layout_data[j.layout.uid] = j.layout;
            }
          }
        }
        for (_j = 0, _len1 = connections.length; _j < _len1; _j++) {
          c = connections[_j];
          p1 = c.port1Comp();
          p2 = c.port2Comp();
          if (p1 && p2 && !p1.isRemoved() && !p2.isRemoved()) {
            try {
              c.serialize(component_data, layout_data);

              /* env:prod */
            } catch (_error) {
              error = _error;
              console.error("Error occur while serializing", error);

              /* env:prod:end */
            } finally {

            }
          } else {
            console.error("Serializing an connection while one of the port is isRemoved() or null");
          }
        }
        data = $.extend(true, {}, this.attributes);
        data.component = component_data;
        data.layout = layout_data;
        _ref1 = this.constructor.__serializeVisitors || [];
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          visitor = _ref1[_k];
          visitor(component_data, layout_data, options);
        }
        data.layout.size = data.canvasSize;
        delete data.canvasSize;
        data.property = this.attributes.property || {};
        data.state = this.__opsModel.getStateDesc() || "Enabled";
        data.id = this.__opsModel.get("id");

        /*
         * NOTICE!
         * Git blame shows the following line of code is written by me, but it's not.
         * It's the production of a branch merge.
         * This obscure/ridicious if statement can't be deleted until every app launched before
         * 2014-11-11 is terminated, because of some kind of weird feature and weird solution.
         * Anyway, the if statement should never ever exist!!
         */
        if (options && options.toStack || this.modeIsStack()) {
          data.version = OpsModel.LatestVersion;
        }
        if (currentDesignObj) {
          currentDesignObj.use();
        }
        return data;
      },
      serializeAsStack: function(new_name) {
        var json;
        json = this.serialize({
          toStack: true
        });
        json.name = new_name || json.name;
        json.state = "Enabled";
        json.id = "";
        json.owner = "";
        json.usage = "";
        delete json.history;
        delete json.stack_id;
        delete json.owner;
        delete json.usage;
        return json;
      },
      preserveName: function() {
        var comp, names, uid, _ref;
        if (!this.modeIsAppEdit()) {
          return;
        }
        this.__preservedNames = {};
        _ref = this.__componentMap;
        for (uid in _ref) {
          comp = _ref[uid];
          names = this.__preservedNames[comp.type] || (this.__preservedNames[comp.type] = {});
          names[comp.get("name")] = true;
        }
      },
      isPreservedName: function(type, name) {
        var names;
        if (!this.modeIsAppEdit()) {
          return false;
        }
        if (!this.__preservedNames) {
          return false;
        }
        names = this.__preservedNames[type];
        return names && names[name];
      },
      getCost: function(stopped) {
        return {
          costList: [],
          totalFee: 0
        };
      }
    }, {
      TYPE: {
        Vpc: "ec2-vpc"
      },
      MODE: {
        Stack: "stack",
        App: "app",
        AppEdit: "appedit"
      },
      EVENT: {
        ChangeResource: "CHANGE_RESOURCE",
        AddResource: "ADD_RESOURCE",
        RemoveResource: "REMOVE_RESOURCE",
        Deserialized: "DESERIALIZED"
      },
      registerModelClass: function(type, modelClass, resolveFirst) {
        __modelClassMap[type] = modelClass;
        if (resolveFirst) {
          __resolveFirstMap[type] = resolveFirst;
        }
        return null;
      },
      registerSerializeVisitor: function(func) {
        if (!this.__serializeVisitors) {
          this.__serializeVisitors = [];
        }
        this.__serializeVisitors.push(func);
        return null;
      },
      registerDeserializeVisitor: function(func) {
        if (!this.__deserializeVisitors) {
          this.__deserializeVisitors = [];
        }
        this.__deserializeVisitors.push(func);
        return null;
      },
      instance: function() {
        return __instance;
      },
      modelClassForType: function(type) {
        return __modelClassMap[type];
      },
      modelClassForPorts: function(port1, port2) {
        var type;
        if (port1 < port2) {
          type = port1 + ">" + port2;
        } else {
          type = port2 + ">" + port1;
        }
        return __modelClassMap[type];
      },
      lineModelClasses: function() {
        var cs, modelClass, type;
        if (this.__lineModelClasses) {
          return this.__lineModelClasses;
        }
        this.__lineModelClasses = cs = [];
        for (type in __modelClassMap) {
          modelClass = __modelClassMap[type];
          if (modelClass.__isLineClass && type.indexOf(">") === -1) {
            cs.push(modelClass);
          }
        }
        return this.__lineModelClasses;
      }
    });
    return Design;
  });

}).call(this);

(function() {
  define('ResourceModel',["Design", 'CloudResources', "constant", "backbone"], function(Design, CloudResources, constant) {
    var ResourceModel, deepClone, __detailExtend, __emptyObj;
    deepClone = function(base) {
      var a, idx, key, target, value, _i, _len;
      if (base === null || !_.isObject(base)) {
        return base;
      }
      if (_.isArray(base)) {
        target = [];
        for (idx = _i = 0, _len = base.length; _i < _len; idx = ++_i) {
          a = base[idx];
          target[idx] = deepClone(a);
        }
        return target;
      }
      target = {};
      for (key in base) {
        value = base[key];
        if (value !== null && _.isObject(value)) {
          target[key] = deepClone(value);
        } else {
          target[key] = value;
        }
      }
      return target;
    };
    __detailExtend = Backbone.Model.extend;
    __emptyObj = {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              env:dev:end */

    /*
      -------------------------------
       ResourceModel is the base class to implment a AWS Resource.
    
       [FORCE] means method of base class will be called, even if it's overriden.
      -------------------------------
    
    
      ++ Class Method ++
    
       * extend( protoProps, overrideArray, staticProps ) : ResourceModelSubClass
          description : returns a subClass of ResourceModel
    
       * preDeserialize( JSON_DATA, LAYOUT_DATA )
          description : If a Class is marked as resolveFirst, this method will be call.
    
       * deserialize( JSON_DATA, LAYOUT_DATA, resolve )
          description : This method is used to create objects from JSON.
          Must be implemented by the user, otherwise it logs an error in console.
    
       * postDeserialize( JSON_DATA, LAYOUT_DATA )
          description : This method is called after all objects are created. It's the place to create connections between objects.
    
      ++ Class Attributes ++
    
       * handleTypes : String | StringArray
                    ( Defined by user )
          description : This attribute is used to determine which ResourceModel's deserialize is called when Desin is deserializing the JSON data.
    
       * type : String
          description : This attribute is used for users to identify what type is the resource.
    
       * id : String
          description : The GUID of this component.
    
       * newNameTmpl : String
          description : This string is used to create a name for an resource
    
      ++ Object Method ++
    
       * allObjects() : Array
          description : returns a array containing all objects of this type of Model.
    
       * createRef() : String
          description : returns an string that can be used to serialized.
    
       * listenTo() :
          description : Override Backbone.Events.listenTo. This method will make sure that when other is removed, this will stop listen to it.
    
       * design() : Design
          description : returns the Design object which manages this ResourceModel object.
    
       * isDesignAwake() : Boolean
          description : return true if the object is in current tab. Otherwise, return false.
    
       * markAsRemoved() :
          description : Simple set this object as removed, so that isRemoved() will return true. Since the object will remain in cache, user still need to call remove() at appropriate time.
    
       * isRemoved() : Boolean
          description : return true if this object has already been removed.
    
       * isRemovable() : Boolean / Object / String
          description : Returns true to indicate the resource can be removed. Returns string to show as an warning asking user if he/she wants to delete anyway. Returns {error:String} to show as an error.
    
       * isReparentable( newParent ) : Boolean / String
          description : Returns true to indicate the resource can change to other parent. Returns string to show as an error.
    
       * clone() :
          description : To allow user to duplicate the resource by drag-drop. The model must implement clone() interface.
    
       * cloneAttributes() :
          description : A helper function to allow ChildClass to implement clone(). More details, see InstanceModel
    
       * remove() : [FORCE]
          description : Just like the destructor in C++. User can override this method.
          The framework will ensure the base class's remove() will get called.
          This method will fire "destroy" event when called.
    
       * initialize() : [FORCE]
          description : The same as Backbone.Model.initialize()
    
       * constructor() :
          description : new Model() will call constructor. If a model wants to create an object, it needs to call SuperClass's constructor. Otherwise, the object is consider not created.
    
    
       * serialize()
          description : Must be implemented by the user, otherwise it logs an error in console.
     */
    ResourceModel = Backbone.Model.extend({
      classId: _.uniqueId("dfc_"),
      type: "Framework_R",
      constructor: function(attributes, options) {
        var design;
        design = Design.instance();
        this.__design = design;
        if (!attributes) {
          attributes = {};
        }
        if (!attributes.id) {
          attributes.id = design.guid();
        }
        if (!attributes.name || !this.isNameAvailable(attributes.name)) {
          attributes.name = this.getNewName(void 0, attributes.name);
          if (!attributes.name) {
            delete attributes.name;
          }
        }
        design.classCacheForCid(this.classId).push(this);
        design.cacheComponent(attributes.id, this);
        Backbone.Model.call(this, attributes, options || __emptyObj);

        /* env:dev                                                                             env:dev:end */
        if (!this.attributes.name) {
          this.attributes.name = "";
        }
        if (!this.attributes.appId) {
          this.attributes.appId = "";
        }
        if (!this.attributes.description) {
          this.attributes.description = "";
        }
        design.trigger(Design.EVENT.AddResource, this);
        this.listenTo(this, "change", this.__triggerChangeInDesign);
        return this;
      },
      __triggerChangeInDesign: function() {
        this.design().trigger(Design.EVENT.ChangeResource, this);
      },
      isNameAvailable: function(name) {
        var comp, _i, _len, _ref;
        if (this.design().isPreservedName(this.type, name)) {
          return false;
        }
        _ref = this.getAllObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          comp = _ref[_i];
          if (comp.get("name") === name) {
            return false;
          }
        }
        return true;
      },
      getNewName: function(base, tmpl) {
        var nameMap, newName;
        tmpl = tmpl || this.newNameTmpl;
        if (!tmpl) {
          newName = this.defaults ? this.defaults.name : void 0;
          return newName || "";
        }
        if (base === void 0) {
          base = this.getAllObjects().length;
        }
        nameMap = {};
        this.design().eachComponent(function(comp) {
          if (comp.get("name")) {
            nameMap[comp.get("name")] = true;
          }
          return null;
        });
        while (true) {
          newName = tmpl + base;
          if (nameMap[newName] || this.design().isPreservedName(this.type, newName)) {
            base += 1;
          } else {
            break;
          }
        }
        return newName;
      },
      hasAppResource: function() {
        if (!Design.instance().modeIsStack() && this.get("appId")) {
          return !!this.get('appId') && CloudResources(this.type, this.design().region()).get(this.get('appId'));
        } else {
          return true;
        }
      },
      isDesignAwake: function() {
        return Design.instance() === this.__design;
      },
      design: function() {
        return this.__design;
      },
      getAllObjects: function(awsType) {
        return this.design().classCacheForCid(Design.modelClassForType(awsType || this.type).prototype.classId).slice(0);
      },
      markAsRemoved: function(isRemoved) {
        if (isRemoved === void 0) {
          this.__isRemoved = true;
        } else {
          this.__isRemoved = !!isRemoved;
        }
        return null;
      },
      isVisual: function() {
        return false;
      },
      isRemoved: function() {
        return this.__isRemoved === true;
      },
      isRemovable: function() {
        return true;
      },
      isReparentable: function() {
        return true;
      },

      /* env:dev                                                                                                                                                                                                                          env:dev:end */
      serialize: function() {
        console.warn("Class '" + this.type + "' doesn't implement serialize");
        return null;
      },
      destroy: function() {
        return this.remove();
      },
      remove: function() {
        var cache, design;
        if (this.isRemoved()) {
          console.warn("The resource is already removed : ", this);
          return;
        }
        this.__isRemoved = true;
        console.debug("Removing resource : " + (this.get('name')), this);
        design = Design.instance();
        cache = design.classCacheForCid(this.classId);
        cache.splice(cache.indexOf(this), 1);
        design.cacheComponent(this.id);
        this.stopListening();
        this.trigger("destroy", this);
        this.trigger("__remove");
        this.off();
        this.__design = null;
        design.trigger(Design.EVENT.RemoveResource, this);
        return null;
      },
      createRef: function(refName, isResourceNS, id) {
        if (_.isString(isResourceNS)) {
          id = isResourceNS;
          isResourceNS = true;
        }
        id = id || this.id;
        if (!id) {
          return "";
        }
        if (isResourceNS !== false) {
          return MC.genResRef(id, "resource." + refName);
        } else {
          return MC.genResRef(id, "" + refName);
        }
      },
      listenTo: function(other, event, callback) {
        var model, that;
        model = Design.modelClassForType(other.type);
        if (model && (!this._listeners || !this._listeners[other._listenerId])) {
          that = this;
          other.once("__remove", function() {
            return that.stopListening(this);
          });
        }
        return Backbone.Events.listenTo.call(this, other, event, callback);
      },
      clone: null,
      cloneAttributes: function(srcTarget, option) {
        var CnClass, attr, cnType, cnsType, extraReserve, reserve, target, value, _i, _j, _len, _len1, _ref, _ref1;
        console.assert(srcTarget.type === this.type, "Invalid type of target when cloning attributes.");
        option = option || {};
        extraReserve = option.reserve || "";
        reserve = "id|appId|x|y|width|height|name";
        cnsType = option.copyConnection || [];
        _ref = srcTarget.attributes;
        for (attr in _ref) {
          value = _ref[attr];
          if (attr.indexOf("__") === 0 || reserve.indexOf(attr) !== -1 || extraReserve.indexOf(attr) !== -1) {
            continue;
          }
          if (value !== null && _.isObject(value)) {
            value = this.cloneObjectAttributes(attr, value);
          }
          this.attributes[attr] = value;
        }
        for (_i = 0, _len = cnsType.length; _i < _len; _i++) {
          cnType = cnsType[_i];
          CnClass = Design.modelClassForType(cnType);
          _ref1 = srcTarget.connectionTargets(cnType);
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            target = _ref1[_j];
            new CnClass(target, this);
          }
        }
        return null;
      },
      cloneObjectAttributes: function(attributeName, attributeValue) {
        return deepClone(attributeValue);
      }
    }, {
      allObjects: function(design) {
        var d;
        d = Design.instance();
        if (design && design.prototype === d.prototype) {
          d = design;
        }
        return d.classCacheForCid(this.prototype.classId).slice(0);
      },
      deserialize: function() {
        console.error("Class '" + this.prototype.type + "' doesn't implement deserialize");
        return null;
      },
      extend: function(protoProps, staticProps) {
        var handleTypes, resolveFirst, subClass, type, _i, _len;
        console.assert(protoProps.type, "Subclass of ResourceModel does not specifying a type");
        if (staticProps) {
          handleTypes = staticProps.handleTypes;
          resolveFirst = staticProps.resolveFirst;
          delete staticProps.handleTypes;
          delete staticProps.resolveFirst;
        }

        /* env:dev                                                                                           env:dev:end */

        /* jshint -W083 */

        /* jshint +W083 */
        protoProps.classId = _.uniqueId("dfc_");
        subClass = __detailExtend.call(this, protoProps, staticProps);
        if (!handleTypes) {
          handleTypes = protoProps.type;
        }
        if (handleTypes) {
          if (_.isString(handleTypes)) {
            handleTypes = [handleTypes];
          }
          for (_i = 0, _len = handleTypes.length; _i < _len; _i++) {
            type = handleTypes[_i];
            Design.registerModelClass(type, subClass, resolveFirst);
          }
        }
        return subClass;
      }
    });
    Design.registerModelClass(ResourceModel.prototype.type, ResourceModel);
    _.each(['forEach', 'each', 'map', 'reduce', 'find', 'filter', 'reject', 'every', 'some', 'contains', 'invoke', 'max', 'min', 'size', 'first', 'without', 'isEmpty', 'chain', 'sample'], function(method) {
      return ResourceModel[method] = function() {
        var args;
        args = [].slice.call(arguments);
        args.unshift(this.allObjects());
        return _[method].apply(_, args);
      };
    });
    ResourceModel.where = function(attrs, first) {
      if (_.isEmpty(attrs)) {
        return first != null ? first : {
          "null": []
        };
      }
      return this[first && 'find' || 'filter'](function(model) {
        var key;
        for (key in attrs) {
          if (attrs[key] !== model.get(key)) {
            return false;
          }
        }
        return true;
      });
    };
    ResourceModel.findWhere = function(attrs) {
      return this.where(attrs, true);
    };
    return ResourceModel;
  });

}).call(this);

(function() {
  define('ComplexResModel',["Design", "ResourceModel", "constant"], function(Design, ResourceModel, constant) {
    var ComplexResModel, emptyArr;
    emptyArr = [];

    /*
      -------------------------------
       ComplexResModel is the base class to implement a Resource that have relationship with other resources. Any visual resources should inherit from ComplexResModel
      -------------------------------
    
      ++ Object Method ++
    
      connect : ( ConnectionModel ) -> [FORCE]
          description : connect is called when a connection is created, subclass should override it to do its own logic.
    
      disconnect : ( ConnectionModel, reason )->
          description : disconnect is called when a connection is removed, subclass should override it to do its own logic. `reason` if not null, it will point to an model, which is the cause to remove the connection.
    
    
      isRemovable   : ()->
          description : When user press delete key in canvas, canvas will ask if the object can be removed. If isRemovable returns a string, it will treat it as a warning, if the string starts with '!', it is a infomation for not allowing the user to delete
    
      connections : ( typeString )->
          description : returns an array of connections. Can be filter by typeString
    
      connectionTargets : ( typeString )->
          description : The same as connections, except the array holds targets connceted to this.
    
      onParentChanged : ()->
          description : If this method is defined, it will be called after the Model's parent is changed.
     */
    ComplexResModel = ResourceModel.extend({

      /*
      defaults :
        x        : 0
        y        : 0
        width    : 0
        height   : 0
        __parent : null
       */
      type: "Framework_CR",
      constructor: function(attributes, options) {
        if (attributes && attributes.parent) {
          attributes.__parent = attributes.parent;
          delete attributes.parent;
        }
        ResourceModel.call(this, attributes, options);
        if (attributes && attributes.__parent) {
          this.set('__parent', null);
          attributes.__parent.addChild(this);
        }
        return null;
      },
      setName: function(name) {
        if (this.get("name") === name) {
          return;
        }
        this.set("name", name);
        return null;
      },
      setDesc: function(description) {
        return this.set("description", description);
      },
      remove: function() {
        var cns, l;
        this.markAsRemoved();
        cns = this.attributes.__connections;
        if (cns) {
          l = cns.length;
          while (l) {
            --l;
            cns[l].remove();
          }
        }
        this.markAsRemoved(false);
        ResourceModel.prototype.remove.call(this);
        return null;
      },
      attach_connection: function(cn, detach) {
        var connections, idx;
        connections = this.get("__connections") || [];
        idx = connections.indexOf(cn);
        if (detach) {
          if (idx !== -1) {
            connections.splice(idx, 1);
          }
        } else {
          if (idx === -1) {
            connections.push(cn);
            this.attributes.__connections = connections;
          }
        }
        this.trigger("change:connections", cn);
        return null;
      },
      connect_base: function(connection) {

        /*
        connect_base.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        this.attach_connection(connection);
        if (this.connect) {
          this.connect(connection);
        }
        return null;
      },
      disconnect_base: function(connection, reason) {

        /*
        disconnect_base.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        this.attach_connection(connection, true);
        if (this.disconnect) {
          this.disconnect(connection, reason);
        }
        return null;
      },
      isVisual: function() {
        return true;
      },
      draw: function() {
        return console.warn("ComplexResModel.draw() is deprecated", this);
      },

      /*
       ReadOnly Infomation
       */
      connections: function(type) {
        var cnns;
        cnns = this.get("__connections");
        if (cnns && _.isString(type)) {
          cnns = _.filter(cnns, function(cn) {
            return cn.type === type;
          });
        }
        return cnns || emptyArr;
      },
      connectionTargets: function(connectionType) {
        var cnn, cnns, targets, _i, _len;
        targets = [];
        cnns = this.get("__connections");
        if (cnns) {
          for (_i = 0, _len = cnns.length; _i < _len; _i++) {
            cnn = cnns[_i];
            if (!connectionType || cnn.type === connectionType) {
              targets.push(cnn.getOtherTarget(this));
            }
          }
        }
        return targets;
      },
      getSubnetRef: function() {
        var p;
        p = this;
        while (p) {
          if (p.type === constant.RESTYPE.SUBNET) {
            break;
          }
          p = p.parent();
        }
        if (p) {
          return p.createRef("SubnetId");
        } else {
          return "";
        }
      },
      getVpcRef: function() {
        var VpcModel, p;
        p = this;
        while (p) {
          if (p.type === constant.RESTYPE.VPC) {
            break;
          }
          p = p.parent();
        }
        if (!p) {
          VpcModel = Design.modelClassForType(constant.RESTYPE.VPC);
          p = VpcModel.theVPC();
        }
        if (p) {
          return p.createRef("VpcId");
        } else {
          return "";
        }
      },
      generateLayout: function() {
        var layout;
        layout = {
          coordinate: [this.x(), this.y()],
          uid: this.id
        };
        if (this.parent()) {
          layout.groupUId = this.parent().id;
        }
        return layout;
      },
      parent: function() {
        return this.get('__parent') || null;
      },
      x: function() {
        return this.get('x') || 0;
      },
      y: function() {
        return this.get('y') || 0;
      },
      width: function() {
        return this.get('width') || 0;
      },
      height: function() {
        return this.get('height') || 0;
      }
    });
    return ComplexResModel;
  });

}).call(this);

(function() {
  define('ConnectionModel',["ResourceModel", "Design"], function(ResourceModel, Design) {

    /*
      -------------------------------
       ConnectionModel is the base class to implment a connection between two resources
      -------------------------------
    
      ++ Object Method ++
    
      setDestroyAfterInit()
        description : calling this method will cause the line to be removed after initialize()
    
      port1()
      port2()
        description : returns the name of the port, port1() is always smaller than port2()
    
      port1Comp()
      port2Comp()
        description : returns the component of each port
    
      getTarget : ( type )
        description : returns a component of a specific type
    
      getOtherTarget : ( theType )
        description : returns a component that its type is not of theType
    
      connectsTo : ( id )
        description : returns true if this connection connects to resource of id
    
      remove( option )
        description : remove the connection from two resources. Optional parameter `option` will be passed.
        `option.reason` will provided when the connection is removed due to one of its target is being removed.
    
    
    
      ++ Class Attributes ++
    
      type :
        description : A string to identify the Class
    
      portDefs :
        description : Ports defination for a visual line
    
      oneToMany :
        description : A type string.
        When C ( connection ) between A ( TYPEA ) and B ( TYPEB ) is created. If oneToMany is TYPEA, then previous B <=> TYPEA connection will be removed.
    
    
    
      ++ Class Method ++
    
      isConnectable( comp1, comp2 )
        description : This method is used to determine if user can create a line between two resources.
     */
    var ConnectionModel;
    ConnectionModel = ResourceModel.extend({
      node_line: true,
      type: "Framework_CN",
      constructor: function(p1Comp, p2Comp, attr, option) {

        /* env:dev                                                                                                                                                                                                           env:dev:end */
        var cn, cns, comp, _i, _len, _ref;
        if (!p1Comp || !p2Comp) {
          console.warn("Connection of " + this.type + " is not created, because invalid targets :", [p1Comp, p2Comp]);
          return;
        }

        /*
         * We must allow self-reference connection to be created.
         * Because SgModel would need that.
         */
        if (!option || option.detectDuplicate !== false) {
          cns = Design.modelClassForType(this.type).allObjects();
          cn = Design.modelClassForType(this.type).findExisting(p1Comp, p2Comp);
          if (cn) {
            console.info("Found existing connection " + this.type + " of ", [p1Comp, p2Comp]);
            if (attr) {
              cn.set(attr);
            }
            return cn;
          }
        }
        if (!this.assignCompsToPorts(p1Comp, p2Comp)) {
          console.error("Trying to connect components while the connection does not support them : ", [p1Comp, p2Comp]);
          return;
        }
        ResourceModel.call(this, attr, option);
        if (this.__destroyAfterInit) {
          this.remove(this);
          this.id = "";
          return this;
        }
        this.__port1Comp.connect_base(this);
        if (this.__port1Comp !== this.__port2Comp) {
          this.__port2Comp.connect_base(this);
        }
        if (this.oneToMany) {
          console.assert(this.oneToMany === this.port1Comp().type || this.oneToMany === this.port2Comp().type, "Invalid oneToMany parameter");
          comp = this.getOtherTarget(this.oneToMany);
          _ref = comp.connections(this.type);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cn = _ref[_i];
            if (cn !== this) {
              cn.remove(this);
            }
          }
        }
        return this;
      },
      setDestroyAfterInit: function() {
        this.__destroyAfterInit = true;
        return null;
      },
      assignCompsToPorts: function(p1Comp, p2Comp) {
        var def, _i, _len, _ref;
        if (this.portDefs) {
          _ref = this.portDefs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            def = _ref[_i];
            if (def.port1.type === p1Comp.type && def.port2.type === p2Comp.type) {
              this.__portDef = def;
              this.__port1Comp = p1Comp;
              this.__port2Comp = p2Comp;
              break;
            } else if (def.port1.type === p2Comp.type && def.port2.type === p1Comp.type) {
              this.__portDef = def;
              this.__port1Comp = p2Comp;
              this.__port2Comp = p1Comp;
              break;
            }
          }
          return !!this.__portDef;
        } else {
          this.__port1Comp = p1Comp;
          this.__port2Comp = p2Comp;
        }
        return true;
      },
      port: function(id, attr) {
        if (!this.__portDef) {
          return "";
        }
        if (this.__port1Comp === id || this.__port1Comp.id === id) {
          return this.__portDef.port1[attr];
        }
        if (this.__port2Comp === id || this.__port2Comp.id === id) {
          return this.__portDef.port2[attr];
        }
        return "";
      },
      port1: function(attr) {
        if (this.__portDef) {
          return this.__portDef.port1[attr];
        } else {
          return "";
        }
      },
      port2: function(attr) {
        if (this.__portDef) {
          return this.__portDef.port2[attr];
        } else {
          return "";
        }
      },
      connectsTo: function(id) {
        return (this.__port1Comp && this.__port1Comp.id === id) || (this.__port2Comp && this.__port2Comp.id === id);
      },
      port1Comp: function() {
        return this.__port1Comp;
      },
      port2Comp: function() {
        return this.__port2Comp;
      },
      getOtherTarget: function(type) {
        if (!_.isString(type)) {
          if (this.__port1Comp === type) {
            return this.__port2Comp;
          } else {
            return this.__port1Comp;
          }
        } else {
          if (this.__port1Comp.type === type) {
            return this.__port2Comp;
          } else {
            return this.__port1Comp;
          }
        }
      },
      getTarget: function(type) {
        if (this.__port1Comp.type === type) {
          return this.__port1Comp;
        }
        if (this.__port2Comp.type === type) {
          return this.__port2Comp;
        }
        return null;
      },
      remove: function(option) {
        var p1Exist, p2Exist;
        console.assert(!(this.__port1Comp.isRemoved() && this.__port2Comp.isRemoved()), "Both ports are already removed when connection is removing", this);
        p1Exist = !this.__port1Comp.isRemoved();
        p2Exist = !this.__port2Comp.isRemoved();
        if (p1Exist) {
          this.__port1Comp.attach_connection(this, true);
        }
        if (p2Exist) {
          this.__port2Comp.attach_connection(this, true);
        }
        if (p1Exist) {
          this.__port1Comp.disconnect_base(this, option);
        }
        if (p2Exist) {
          this.__port2Comp.disconnect_base(this, option);
        }
        ResourceModel.prototype.remove.call(this);
        return null;
      },
      serialize: function() {
        return null;
      },
      isVisual: function() {
        return !!this.portDefs;
      },
      draw: function() {
        return console.warn("ConnectionModel.draw() is deprecated", this);
      }
    }, {
      findExisting: function(p1Comp, p2Comp) {
        var cn, _i, _len, _ref;
        _ref = this.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.port1Comp() === p1Comp && cn.port2Comp() === p2Comp && !cn.isRemoved()) {
            return cn;
          }
          if (cn.port2Comp() === p1Comp && cn.port1Comp() === p2Comp && !cn.isRemoved()) {
            return cn;
          }
        }
        return null;
      },
      extend: function(protoProps, staticProps) {
        var child, def, t, tags, tmp, _i, _j, _len, _len1, _ref;
        tags = [];
        if (protoProps.portDefs) {
          if (!_.isArray(protoProps.portDefs)) {
            protoProps.portDefs = [protoProps.portDefs];
          }
          _ref = protoProps.portDefs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            def = _ref[_i];
            if (def.port1.name > def.port2.name) {
              tmp = def.port1;
              def.port1 = def.port2;
              def.port2 = tmp;
            }
            tags.push(def.port1.name + ">" + def.port2.name);
          }
          if (!protoProps.type) {
            protoProps.type = tags[0];
          }
        }
        child = ResourceModel.extend.call(this, protoProps, staticProps);
        for (_j = 0, _len1 = tags.length; _j < _len1; _j++) {
          t = tags[_j];
          Design.registerModelClass(t, child);
        }
        Design.registerModelClass(protoProps.type, child);
        child.__isLineClass = true;
        return child;
      },
      isConnectable: function(comp1, comp2) {
        return true;
      },
      connectionData: function(type, portName) {
        var LineModel, allLinePortMap, arr, def, op, p, _i, _j, _len, _len1, _ref, _ref1;
        allLinePortMap = {};
        _ref = Design.lineModelClasses();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          LineModel = _ref[_i];
          if (!LineModel.prototype.portDefs) {
            continue;
          }
          _ref1 = LineModel.prototype.portDefs;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            def = _ref1[_j];
            if (def.port1.type === type) {
              p = def.port1;
              op = def.port2;
            } else if (def.port2.type === type) {
              p = def.port2;
              op = def.port1;
            } else {
              continue;
            }
            if (!portName || portName === p.name) {
              arr = allLinePortMap[op.type] || (allLinePortMap[op.type] = []);
              arr.push(op.name);
            }
          }
        }
        return allLinePortMap;
      }
    });
    return ConnectionModel;
  });

}).call(this);

(function() {
  define('GroupModel',["Design", "ComplexResModel"], function(Design, ComplexResModel) {
    var GroupModel;
    GroupModel = ComplexResModel.extend({
      node_group: true,
      type: "Framework_G",
      remove: function() {
        var child, _i, _len, _ref;
        if (this.attributes.__children) {
          _ref = this.attributes.__children.splice(0);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            child.off("destroy", this.removeChild, this);
            child.remove();
          }
        }
        ComplexResModel.prototype.remove.call(this);
        return null;
      },
      addChild: function(child) {

        /*
        addChild.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        var children, oldParent;
        console.assert(child.remove, "This child is not a ResourceModel object");
        oldParent = child.parent();
        if (oldParent === this) {
          return;
        }
        if (oldParent) {
          oldParent.removeChild(child);
        }
        children = this.attributes.__children;
        if (!children) {
          children = [];
        } else if (children.indexOf(child) !== -1) {
          return;
        }
        children.push(child);
        this.set("__children", children);
        child.set("__parent", this);
        child.once("destroy", this.removeChild, this);
        if (child.onParentChanged) {
          child.onParentChanged(oldParent);
        }
        return null;
      },
      removeChild: function(child) {

        /*
        removeChild.call(this) # This is used to suppress the warning in ResourceModel.extend.
         */
        var children, idx;
        children = this.get("__children");
        if (!children || children.length === 0) {
          console.warn("Child not found when removing.");
          return;
        }
        idx = children.indexOf(child);
        if (idx === -1) {
          console.warn("Child not found when removing.");
          return;
        }
        children.splice(idx, 1);
        this.set("__children", children);
        child.off("destroy", this.removeChild, this);
        child.attributes.__parent = null;
        return null;
      },
      children: function() {
        return this.get("__children") || [];
      },
      generateLayout: function() {
        var layout;
        layout = ComplexResModel.prototype.generateLayout.call(this);
        layout.size = [this.width(), this.height()];
        return layout;
      }
    });
    return GroupModel;
  });

}).call(this);

(function() {
  define('CoreEditorView',["workspaces/coreeditor/TplOpsEditor", "UI.modalplus", "i18n!/nls/lang.js", "backbone", "UI.selectbox", "backbone", "UI.selectbox"], function(OpsEditorTpl, Modal, lang) {

    /* Monitor keypress */
    $(window).on('keydown', function(evt) {
      var $tgt, type;
      if ($(evt.target).is("input, textarea") || evt.target.contentEditable === "true") {
        evt.stopPropagation();
        return;
      }
      $tgt = $("#OpsEditor");
      if (!$tgt.length) {
        return;
      }
      switch (evt.keyCode) {
        case 8:
        case 46:

          /* BackSpace & Delete */
          if (evt.which === 8) {
            evt.preventDefault();
          }
          if (!evt.ctrlKey && !evt.metaKey) {
            type = "DelSelectItem";
          }
          break;
        case 37:
        case 38:
        case 39:
        case 40:

          /* Arrows */
          type = "MoveSelectItem";
          break;
        case 65:

          /* A */
          type = "ShowGlobal";
          break;
        case 80:

          /* P */
          type = "ShowProperty";
          break;
        case 82:
          if (!(evt.ctrlKey || evt.metaKey)) {

            /* R */
            type = "ShowResource";
          }
          break;
        case 83:

          /* S */
          if (evt.ctrlKey || evt.metaKey) {
            type = "Save";
          } else {
            type = "ShowStateEditor";
          }
          break;
        case 187:

          /* + */
          type = "ZoomIn";
          break;
        case 189:

          /* - */
          type = "ZoomOut";
          break;
        case 13:

          /* Enter */
          type = "ShowStateEditor";
      }
      if (type) {
        $tgt.triggerHandler(type, evt.which);
        return false;
      }
    });

    /* OpsEditorView base class */
    return Backbone.View.extend({
      events: {
        "Save": "saveStack",
        "DelSelectItem": "delSelectedItem",
        "SelectPrevItem": "selectPrevItem",
        "SelectNextItem": "selectNextItem",
        "MoveSelectItem": "moveSelectedItem",
        "ZoomIn": "zoomIn",
        "ZoomOut": "zoomOut",
        "ShowProperty": "showProperty",
        "ShowStateEditor": "showStateEditor",
        "ShowGlobal": "showGlobal",
        "ShowResource": "showResource",
        "click .HideOEPanelLeft": "toggleLeftPanel",
        "click .HideOEPanelRight": "toggleRightPanel"
      },
      template: OpsEditorTpl.frame,
      constructor: function(options) {
        _.extend(this, options);
        this.setElement($(this.template()).appendTo("#main").attr("data-ws", this.workspace.id).show()[0]);
      },
      __initialize: function() {
        var opt;
        opt = {
          workspace: this.workspace,
          parent: this
        };
        this.toolbar = new (this.TopPanel || Backbone.View)(opt);
        this.propertyPanel = new (this.RightPanel || Backbone.View)(opt);
        this.resourcePanel = new (this.LeftPanel || Backbone.View)(opt);
        this.statusbar = new (this.BottomPanel || Backbone.View)(opt);
        this.canvas = new this.CanvasView(opt);
        this.listenTo(this.canvas, "itemSelected", this.onItemSelected);
        this.listenTo(this.canvas, "doubleclick", this.onCanvasDoubleClick);
        this.initialize();
        if (this.workspace.opsModel.get("__________itsshitdontsave")) {
          this.propertyPanel.$el.remove();
          this.statusbar.$el.remove();
          this.$el.find(".canvas-view").css("pointer-events", "none");
          this.canvas.updateSize();
          this.toolbar.xxxxxx();
          this.resourcePanel.$el.addClass("force-hidden");
        }
      },
      onItemSelected: function(type, id) {},
      showProperty: function() {},
      showResource: function() {},
      showGlobal: function() {},
      showStateEditor: function() {},
      onCanvasDoubleClick: function() {},
      toggleLeftPanel: function() {
        this.resourcePanel.toggleLeftPanel();
        this.canvas.updateSize();
        return false;
      },
      toggleRightPanel: function() {
        this.propertyPanel.toggleRightPanel();
        this.canvas.updateSize();
        return false;
      },
      saveStack: function() {
        return this.toolbar.$el.find(".icon-save").trigger("click");
      },
      moveSelectedItem: function(evt, which) {
        var x, y;
        switch (which) {
          case 37:
            x = -1;
            break;
          case 38:
            y = -1;
            break;
          case 39:
            x = 1;
            break;
          case 40:
            y = 1;
        }
        this.canvas.moveSelectedItem(x || 0, y || 0);
        return false;
      },
      delSelectedItem: function() {
        this.canvas.delSelectedItem();
        return false;
      },
      selectPrevItem: function() {
        this.canvas.selectPrevItem();
        return false;
      },
      selectNextItem: function() {
        this.canvas.selectNextItem();
        return false;
      },
      zoomIn: function() {
        this.canvas.zoomIn();
        this.toolbar.updateZoomButtons();
        return false;
      },
      zoomOut: function() {
        this.canvas.zoomOut();
        this.toolbar.updateZoomButtons();
        return false;
      },
      backup: function() {

        /*
        Revoke all the IDs of every dom.
         */
        if (this.propertyPanel && this.propertyPanel.backup) {
          this.propertyPanel.backup();
        }
        this.$el.attr("id", "");
      },
      recover: function() {
        this.$el.show().attr("id", "OpsEditor");
        if (this.resourcePanel && this.resourcePanel.recalcAccordion) {
          this.resourcePanel.recalcAccordion();
        }
        if (this.propertyPanel && this.propertyPanel.recover) {
          this.propertyPanel.recover();
        }
      },
      remove: function() {
        if (this.toolbar) {
          this.toolbar.remove();
        }
        if (this.propertyPanel) {
          this.propertyPanel.remove();
        }
        if (this.resourcePanel) {
          this.resourcePanel.remove();
        }
        if (this.statusbar) {
          this.statusbar.remove();
        }
        if (this.canvas) {
          this.canvas.remove();
        }
        return Backbone.View.prototype.remove.call(this);
      },
      showCloseConfirm: function() {
        var modal, name, self;
        name = this.workspace.design.get('name');
        self = this;
        modal = new Modal({
          title: sprintf(lang.IDE.TITLE_CONFIRM_TO_CLOSE, name),
          width: "420",
          template: OpsEditorTpl.modal.onClose(name),
          confirm: {
            text: lang.TOOLBAR.TIT_CLOSE_TAB,
            color: "red"
          },
          onConfirm: function() {
            modal.close();
            self.workspace.remove();
          }
        });
      },
      getSvgElement: function() {
        var child, children;
        children = this.$el.children(".OEMiddleWrap").children(".OEPanelCenter").children();
        while (children.length) {
          child = children.filter("svg");
          if (child.length) {
            return child;
          }
          children = children.children();
        }
        return null;
      }
    });
  });

}).call(this);


/*
  OpsEditorBase is a base class for all the OpsEditor
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('CoreEditor',["Workspace", "CoreEditorView", "workspaces/coreeditor/TplOpsEditor", "ThumbnailUtil", "OpsModel", "Design", "ApiRequest", "UI.modalplus", "i18n!/nls/lang.js"], function(Workspace, CoreEditorView, OpsEditorTpl, Thumbnail, OpsModel, Design, ApiRequest, Modal, lang) {
    var LoadingView, OpsEditorBase;
    LoadingView = Backbone.View.extend({
      isLoadingView: true,
      initialize: function(options) {
        return this.setElement($(OpsEditorTpl.loading()).appendTo("#main").show()[0]);
      },
      setText: function(text) {
        return this.$el.find(".processing").text(text);
      },
      showVpcNotExist: function(name, onConfirm) {
        var modal, self;
        self = this;
        modal = new Modal({
          title: sprintf(lang.IDE.TITLE_CONFIRM_TO_REMOVE_APP, name),
          template: OpsEditorTpl.modal.confirmRemoveApp(),
          confirm: {
            text: lang.IDE.POP_CONFIRM_TO_REMOVE,
            color: "red"
          },
          disableClose: true,
          onConfirm: function() {
            onConfirm();
            return modal.close();
          }
        });
      }
    });

    /*
      An OpsEditor has two state : Loading / Ready.
      When the OpsEditor is created, it enters Loading state. Once all the necessary data is fetched,
      It enters Ready state.
    
      Every OpsEditor's View should enforce these rules:
        1. Its element must be #OpsEditor
        2. Its have a render() method which will create and set its element to #OpsEditor.
        3. It needs to re-bind every events in render()
     */
    OpsEditorBase = (function(_super) {
      __extends(OpsEditorBase, _super);


      /*
        Override these methods to implement subclasses.
       */

      OpsEditorBase.prototype.title = function() {
        return this.opsModel.get("name");
      };

      OpsEditorBase.prototype.tabClass = function() {
        return "icon-stack-tabbar";
      };

      OpsEditorBase.prototype.url = function() {
        return this.opsModel.url();
      };

      OpsEditorBase.prototype.isWorkingOn = function(att) {
        return this.opsModel === att;
      };

      OpsEditorBase.prototype.viewClass = CoreEditorView;

      OpsEditorBase.prototype.designClass = Design;

      OpsEditorBase.prototype.fetchAdditionalData = function() {
        var d;
        d = Q.defer();
        d.resolve();
        return d.promise;
      };

      OpsEditorBase.prototype.isReady = function() {
        return !!this.__hasAdditionalData;
      };

      OpsEditorBase.prototype.getSelectedComponent = function() {
        if (!this.view.canvas) {
          return null;
        }
        return this.view.canvas.getSelectedComp();
      };

      OpsEditorBase.prototype.onOpsModelStateChanged = function() {
        if (this.opsModel.get("state") === OpsModel.State.Destroyed) {
          return this.remove();
        }
      };


      /*
        Internal methods.
       */

      OpsEditorBase.prototype.onModelIdChange = function() {
        this.updateUrl();
        if (this.design) {
          this.design.set("id", this.opsModel.get("id"));
        }
      };

      function OpsEditorBase(opsModel) {
        var s;
        if (!opsModel) {
          this.remove();
          throw new Error("Cannot find opsmodel while openning workspace.");
        }
        this.opsModel = opsModel;
        this.listenTo(this.opsModel, "destroy", this.onOpsModelStateChanged);
        this.listenTo(this.opsModel, "change:state", this.onOpsModelStateChanged);
        this.listenTo(this.opsModel, "change:name", this.updateTab);
        this.listenTo(this.opsModel, "change:id", this.onModelIdChange);
        s = this;
        this.fetchJsonData().then((function() {
          return s.jsonLoaded();
        }), (function(err) {
          return s.jsonLoadFailed(err);
        }));
        Workspace.apply(this, arguments);
      }

      OpsEditorBase.prototype.fetchJsonData = function() {
        var opsModel;
        opsModel = this.opsModel;
        return opsModel.fetchJsonData().then(function() {
          if (!opsModel.isPersisted()) {
            return opsModel.save();
          }
        });
      };

      OpsEditorBase.prototype.jsonLoadFailed = function(err) {
        if (this.isRemoved()) {
          return;
        }
        if (err.error === ApiRequest.Errors.MissingDataInServer) {
          return;
        }
        notification("error", lang.NOTIFY.FAILED_TO_LOAD_DATA);
        return this.remove();
      };

      OpsEditorBase.prototype.jsonLoaded = function() {
        var self;
        if (this.isRemoved()) {
          return;
        }
        self = this;
        this.fetchAdditionalData().then((function() {
          return self.additionalDataLoaded();
        }), (function() {
          return self.additionalDataLoadFailed();
        }));
      };

      OpsEditorBase.prototype.additionalDataLoadFailed = function() {
        if (this.isRemoved()) {
          return;
        }
        notification("error", lang.NOTIFY.FAILED_TO_LOAD_AWS_DATA);
        return this.remove();
      };

      OpsEditorBase.prototype.additionalDataLoaded = function() {
        var e;
        if (this.isRemoved()) {
          return;
        }
        this.__hasAdditionalData = true;
        if (this.view && this.view.isLoadingView) {
          this.view.remove();
          this.view = null;
        }
        if (this.isAwake() && !this.__inited) {
          try {
            this.__initEditor();
          } catch (_error) {
            e = _error;
            console.error(e);
            notification("error", "Failed to open the stack/app, please contact our support team.");
            this.remove();
          }
        }
      };

      OpsEditorBase.prototype.awake = function() {
        if (!this.isReady()) {
          if (!this.view) {
            this.view = new LoadingView();
          } else {
            this.view.$el.show();
          }
          return;
        }
        if (!this.__inited) {
          this.__initEditor();
        } else {
          this.design.use();
          this.view.recover();
        }
      };

      OpsEditorBase.prototype.sleep = function() {
        if (this.view && this.view.backup) {
          this.view.backup();
        }
        return Workspace.prototype.sleep.call(this);
      };

      OpsEditorBase.prototype.cleanup = function() {
        this.stopListening();
        if (this.view) {
          this.view.remove();
        }
        if (this.design) {
          this.design.unuse();
          this.design = null;
        }
        if (!this.opsModel.isPersisted()) {
          this.opsModel.remove();
        }
      };

      OpsEditorBase.prototype.isInited = function() {
        return !!this.__inited;
      };

      OpsEditorBase.prototype.__initEditor = function() {
        this.__inited = true;
        this.design = new this.designClass(this.opsModel);
        this.listenTo(this.design, "change:name", this.updateTab);
        this.view = new this.viewClass({
          workspace: this
        });
        this.view.__initialize();
        this.initEditor();
        if (!this.opsModel.getThumbnail()) {
          this.saveThumbnail();
        }
        this.opsModel.__setJsonData(this.design.serialize());
      };

      OpsEditorBase.prototype.initEditor = function() {
        if (this.opsModel.get("autoLayout")) {
          this.view.canvas.autoLayout();
        }
      };

      OpsEditorBase.prototype.saveThumbnail = function() {
        if (this.opsModel.isPersisted()) {
          return Thumbnail.generate(this.view.getSvgElement()).then((function(_this) {
            return function(thumbnail) {
              return _this.opsModel.saveThumbnail(thumbnail);
            };
          })(this));
        }
      };

      OpsEditorBase.prototype.isRemovable = function() {
        if (!this.__inited || !this.isModified() || this.opsModel.get("__________itsshitdontsave")) {
          return true;
        }
        this.view.showCloseConfirm();
        return false;
      };

      return OpsEditorBase;

    })(Workspace);
    return OpsEditorBase;
  });

}).call(this);

(function() {
  define('CanvasManager',['CloudResources', 'constant', 'i18n!/nls/lang.js'], function(CloudResources, constant, lang) {
    var CanvasManager;
    CanvasManager = {
      hasClass: function(elements, klass) {
        var element, k, _i, _len;
        if (!elements) {
          return false;
        }
        if (!elements.length && elements.length !== 0) {
          elements = [elements];
        }
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          k = " " + (element.getAttribute("class") || "") + " ";
          if (k.indexOf(" " + klass + " ") >= 0) {
            return true;
          }
        }
        return false;
      },
      removeClass: function(elements, theClass) {
        var element, klass, newKlass, _i, _len;
        if (!elements) {
          return this;
        }
        if (!elements.length && elements.length !== 0) {
          elements = [elements];
        }
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          klass = element.getAttribute("class") || "";
          newKlass = klass.replace(new RegExp("\\b" + theClass + "\\b", "g"), "");
          if (klass !== newKlass) {
            element.setAttribute("class", newKlass);
          }
        }
        return this;
      },
      addClass: function(elements, theClass) {
        var element, klass, _i, _len;
        if (!elements) {
          return this;
        }
        if (!elements.length && elements.length !== 0) {
          elements = [elements];
        }
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          klass = element.getAttribute("class") || "";
          if (!klass.match(new RegExp("\\b" + theClass + "\\b"))) {
            klass = $.trim(klass) + " " + theClass;
            element.setAttribute("class", klass);
          }
        }
        return this;
      },
      toggle: function(element, isShow) {
        if (element.hasOwnProperty("length")) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        if (isShow === null || isShow === void 0) {
          isShow = element.getAttribute("display") === "none";
        }
        if (isShow) {
          element.setAttribute("display", "");
          if (element.getAttribute("data-tooltip")) {
            this.addClass(element, "tooltip");
          }
        } else {
          element.setAttribute("display", "none");
          this.removeClass(element, "tooltip");
        }
        return this;
      },
      updateEip: function(node, targetModel) {
        var imgUrl, ip, toggle, tootipStr, _ref;
        if (node.length) {
          node = node[0];
        }
        if (targetModel && targetModel.type === constant.RESTYPE.ENI) {
          if (!targetModel.connections("EniAttachment").length) {
            $(node).hide();
            return;
          } else {
            $(node).show();
          }
        }
        toggle = targetModel.hasPrimaryEip();
        if (toggle) {
          tootipStr = lang.CANVAS.DETACH_ELASTIC_IP_FROM_PRIMARY_IP;
          imgUrl = 'ide/icon/icn-eipon.png';
        } else {
          tootipStr = lang.CANVAS.ASSOCIATE_ELASTIC_IP_TO_PRIMARY_IP;
          imgUrl = 'ide/icon/icn-eipoff.png';
        }
        if (targetModel.design().modeIsApp()) {
          if (targetModel.getEmbedEni) {
            targetModel = targetModel.getEmbedEni();
          }
          if (targetModel) {
            ip = (targetModel.get("ips") || [])[0];
            tootipStr = (ip != null ? (_ref = ip.eipData) != null ? _ref.publicIp : void 0 : void 0) || "";
          } else {
            console.warn("updateEip(): can not found EmbedEni");
          }
        }
        node.setAttribute("data-tooltip", tootipStr);
        $(node).data("tooltip", tootipStr);
        this.update(node, imgUrl, "href");
        return null;
      },
      updateFip: function(node, targetModel) {
        var img1, img2, toggle, tootipStr;
        if (!node.size()) {
          return false;
        }
        if (targetModel.type === constant.RESTYPE.OSSERVER) {
          toggle = !!targetModel.embedPort().getFloatingIp();
        } else {
          toggle = !!targetModel.getFloatingIp();
        }
        if (toggle) {
          tootipStr = 'Deassociate Floating IP';
          img1 = 'ide/icon-os/cvs-fip-on-n.png';
          img2 = 'ide/icon-os/cvs-fip-on-h.png';
        } else {
          tootipStr = 'Associate Floating IP';
          img1 = 'ide/icon-os/cvs-fip-of-n.png';
          img2 = 'ide/icon-os/cvs-fip-of-h.png';
        }
        node = $(node).data("tooltip", tootipStr).attr("data-tooltip", tootipStr);
        this.update(node.find(".normal"), img1, "href");
        this.update(node.find(".hover"), img2, "href");
        return null;
      },
      update: function(element, value, attr) {
        var el, href, _i, _j, _len, _len1, _results, _results1;
        if (_.isString(element)) {
          element = document.getElementById(element);
        }
        element = $(element);
        if (!attr) {
          return element.text(MC.truncate(value, 17));
        } else if (attr === "href" || attr === "image") {
          value = MC.IMG_URL + value;
          _results = [];
          for (_i = 0, _len = element.length; _i < _len; _i++) {
            el = element[_i];
            href = el.getAttributeNS("http://www.w3.org/1999/xlink", "href");
            if (href !== value) {
              _results.push(el.setAttributeNS("http://www.w3.org/1999/xlink", "href", value));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else if (attr === "tooltip") {
          element.data("tooltip", value).attr("data-tooltip", value);
          _results1 = [];
          for (_j = 0, _len1 = element.length; _j < _len1; _j++) {
            el = element[_j];
            if (value) {
              _results1.push(CanvasManager.addClass(el, "tooltip"));
            } else {
              _results1.push(CanvasManager.removeClass(el, "tooltip"));
            }
          }
          return _results1;
        } else if (attr === "color") {
          return element.attr("style", "fill:" + value);
        } else {
          return element.attr(attr, value);
        }
      },
      setLabel: function(canvasItem, labelElement) {
        var currentLength, e, el, length, maxWidth, text, _i, _len;
        text = canvasItem.label();
        maxWidth = canvasItem.labelWidth();
        if (_.isString(labelElement)) {
          labelElement = document.getElementById(labelElement);
        }
        if (!labelElement.length && labelElement.length !== 0) {
          labelElement = [labelElement];
        }
        if (!text.length) {
          $(labelElement).text(text);
          return;
        }
        $(labelElement[0]).text(text);
        try {
          currentLength = labelElement[0].getSubStringLength(0, text.length);
        } catch (_error) {
          e = _error;
          currentLength = 0;
        }
        if (currentLength > maxWidth) {
          length = text.length - 1;
          while (true && length > 0) {
            if (labelElement[0].getSubStringLength(0, length) + 8 <= maxWidth) {
              text = text.substr(0, length) + "...";
              break;
            }
            --length;
          }
        }
        for (_i = 0, _len = labelElement.length; _i < _len; _i++) {
          el = labelElement[_i];
          $(el).text(text);
        }
      }
    };
    return CanvasManager;
  });

}).call(this);

define('workspaces/coreeditor/TplSvgDef',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<svg style=\"display:none;\" id=\"svgDefs\"><defs>\n  <path d=\"M-5 0.5l5.5 -5.5l5.5 5.5 l-5.5 5.5z\" id=\"port_diamond\"></path>\n  <path d=\"M8 0.5l-6 -5.5l-2 0 l0 11 l2 0z\" id=\"port_right\"></path>\n  <path d=\"M-8 0.5l6 -5.5l2 0 l0 11 l-2 0z\" id=\"port_left\"></path>\n  <path d=\"M0.5 0l5.5 0l0 -2l-5.5 -6l-5.5 6l0 2z\" id=\"port_top\"></path>\n  <path d=\"M0.5 0l5.5 0l0 2l-5.5 6l-5.5 -6l0 -2z\" id=\"port_bottom\"></path>\n  <path d=\"M0 74h90v11a5 5 0 0 1 -5 5h-80a5 5 0 0 1 -5 -5z\" id=\"label_path\" data-readonly=\"true\"></path>\n\n  <g id=\"asg_frame\">\n    <rect class=\"group-asg\" rx=\"5\" ry=\"5\" height=\"129\" x=\"1\" y=\"1\" width=\"129\"></rect>\n    <path d=\"M0 21l0 -16a5 5 0 0 1 5 -5l121 0a5 5 0 0 1 5 5l0 16z\" class=\"asg-title\"></path>\n  </g>\n  <text id=\"asg_prompt\" text-anchor=\"middle\">\n    <tspan x=\"65\" y=\"47\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_ASG_DROP_LC_1", {hash:{},data:data}))
    + "</tspan>\n    <tspan x=\"65\" y=\"67\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_ASG_DROP_LC_2", {hash:{},data:data}))
    + "</tspan>\n    <tspan x=\"65\" y=\"87\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_ASG_DROP_LC_3", {hash:{},data:data}))
    + "</tspan>\n    <tspan x=\"65\" y=\"107\">"
    + escapeExpression(helpers.i18n.call(depth0, "CANVAS.CVS_ASG_DROP_LC_4", {hash:{},data:data}))
    + "</tspan>\n  </text>\n\n  <g id=\"asg_dragger\">\n    <rect height=\"14\" width=\"14\" fill=\"transparent\" x=\"114\" y=\"3\"/>\n    <path d=\"M114.26 11.447 c-0.44 2.83 -0.252 5.113 -0.12 5.313 c0.204 0.398 4.473 0.24 5.512 -0.133 c0.86 -0.604 -0.623 -1.15 -1.094 -1.962 c0.471 -0.611 1.976 -2.352 2.324 -2.865 c-0.28 -1.65 -1.649 -1.818 -1.78 -1.76 c -0.13 0.06 -2.809 2.411 -2.809 2.411 c0 0 -0.925 -0.997 -1.292 -1.259 c-0.465 -0.322 -0.742 0.18 -0.742 0.254 l0 0z m13.482 -2.895 c0.437 -2.83 0.25 -5.115 0.118 -5.315 c-0.204 -0.396 -4.473 -0.227 -5.514 0.135 c-0.856 0.604 0.626 1.15 1.096 1.962 c-0.47 0.611 -1.976 2.352 -2.323 2.868 c0.293 1.648 1.648 1.815 1.778 1.758 c0.13 -0.06 2.805 -2.41 2.805 -2.41 c0.004 0 0.93 0.994 1.3 1.26 c0.461 0.32 0.74 -0.184 0.74 -0.26 l0 0Z\"/>\n  </g>\n\n  <g id=\"clone_indicator\" data-readonly=\"true\">\n    <rect fill=\"#000\" width=\"23\" height=\"23\" rx=\"4\" ry=\"4\"></rect>\n    <path d=\"M8 7c0-1.112.895-2 2-2h6c1.112 0 2 .895 2 2v6c0 1.112-.895 2-2 2v-6c0-1.103-.898-2-2-2h-6zm-1 1c-1.1 0-2 .887-2 2v6c0 1.1.887 2 2 2h6c1.1 0 2-.887 2-2v-6c0-1.1-.887-2-2-2h-6zm1 2c-.547 0-1 .451 -1 1v4c0 .547.45 1 1 1h4c.547 0 1 -.45 1-1v-4c0-.547-.45-1-1-1h-4z\" fill-rule=\"evenodd\" fill=\"#FFF\"></path>\n  </g>\n\n  <g id=\"replica_dragger\">\n    <rect x=\"34\" y=\"53\" width=\"22\" height=\"22\" rx=\"3\" class=\"replica-bg\"/>\n    <path d=\"M44.5 57c3.038 0 5.5 1.119 5.5 2.5s-2.462 2.5-5.5 2.5-5.5-1.119-5.5-2.5 2.462-2.5 5.5-2.5zm5.5 9h-3v2h3v2l4-3-4-3v2zm-1 3h-2c-.552 0-1-.448-1-1v-2c0-.552.448-1 1-1h2c0-.552.448-1 1-1v-3h-.11c-.51 1.141-2.729 2-5.39 2-2.661 0-4.88-.859-5.39-2h-.11v8h.11c.51 1.141 2.729 2 5.39 2 2.069 0 3.859-.522 4.798-1.29-.184-.181-.298-.432-.298-.71z\"/>\n  </g>\n\n  <g id=\"restore_dragger\">\n    <rect x=\"34\" y=\"0\" width=\"22\" height=\"22\" rx=\"3\" class=\"restore-bg\"/>\n    <path d=\"M53.131,0C30.902,0,12.832,17.806,12.287,39.976H0l18.393,20.5l18.391-20.5H22.506C23.045,23.468,36.545,10.25,53.131,10.25  c16.93,0,30.652,13.767,30.652,30.75S70.061,71.75,53.131,71.75c-6.789,0-13.059-2.218-18.137-5.966l-7.029,7.521  C34.904,78.751,43.639,82,53.131,82C75.703,82,94,63.645,94,41S75.703,0,53.131,0z M49.498,19v23.45l15.027,15.024l4.949-4.949  L56.5,39.55V19H49.498z\" transform=\"scale(0.17) translate(215,28) rotate(0 822.5 296)\" stroke-width=\"0\" style=\"position: relative;\" />\n  </g>\n\n  <g id=\"sbg_info\" data-readonly=\"true\">\n    <circle cx=\"10\" cy=\"10\" r=\"6\"></circle>\n    <path fill=\"#fff\" d=\"M9,9 L9,14 L11,14 L11,9 L9,9 Z M10,8 C10.55,8 11,7.55 11,7 C11,6.448 10.55,6 10,6 C9.448,6 9,6.448 9,7 C9,7.55 9.448,8 10,8 Z\"></path>\n  </g>\n\n  <g id=\"os_router\" data-readonly=\"true\">\n    <circle cx=\"40\" cy=\"40\" r=\"30\" fill=\"#D8DAF6\" stroke=\"#6A71BF\" stroke-width=\"1.5\"></circle>\n    <path d=\"M51.92 42.05l8.08 .03c1.1 0 2 -.88 2 -2 0 -1.1 -.9 -2 -2 -2l-7.82 -.03 2.3 -2.28c.78 -.78 .8 -2.04 0 -2.83 -.77 -.8 -2.04 -.8 -2.82 0L46 38.55c-.45 .43 -.65 1.02 -.6 1.6 -.05 .55 .14 1.14 .58 1.58l5.62 5.67c.78 .8 2.05 .8 2.84 .02 .8 -.78 .78 -2.05 0 -2.83l-2.52 -2.55zM28.07 37.95H20c-1.1 0 -2 .88 -2 2 0 1.1 .9 2 2 2h7.83l-2.3 2.28c-.77 .8 -.78 2.05 0 2.84 .8 .78 2.06 .77 2.84 0L34 41.4c.45 -.44 .65 -1.02 .6 -1.6 .05 -.56 -.15 -1.15 -.6 -1.6L28.38 32.6c-.78 -.8 -2.05 -.8 -2.83 -.02 -.8 .8 -.78 2.05 0 2.84l2.53 2.53zM38.12 24.54v8.07c0 1.1 .9 2 2 2s2 -.9 2 -2V24.8l2.3 2.3c.77 .77 2.04 .78 2.82 0 .78 -.8 .78 -2.06 0 -2.84L41.6 18.6c-.45 -.44 -1.03 -.64 -1.6 -.6 -.57 -.04 -1.15 .16 -1.6 .6l-5.64 5.64c-.78 .78 -.78 2.05 0 2.83 .78 .8 2.05 .78 2.83 0l2.52 -2.53zM41.88 55.46V47.4c0 -1.1 -.9 -2 -2 -2s-2 .9 -2 2v7.82l-2.3 -2.3c-.77 -.77 -2.04 -.78 -2.82 0 -.78 .8 -.78 2.06 0 2.84l5.65 5.65c.45 .44 1.03 .64 1.6 .6 .57 .04 1.15 -.16 1.6 -.6l5.64 -5.64c.78 -.78 .78 -2.05 0 -2.83 -.78 -.8 -2.05 -.78 -2.83 0l-2.52 2.53z\" fill=\"#6a71bf\"/>\n  </g>\n\n  <g id=\"os_pool\" data-readonly=\"true\">\n    <rect x=\"16\" y=\"16\" width=\"48\" height=\"48\" rx=\"6\" ry=\"6\" fill=\"#F8C775\" stroke=\"#F5A623\" stroke-width=\"2\"></rect>\n    <rect x=\"42\" y=\"42\" width=\"16\" height=\"16\" rx=\"2\" ry=\"2\" stroke-width=\"2\" stroke=\"#efaf47\" fill=\"none\"></rect>\n    <path d=\"M38 44c0-1.1-.9-2-2-2H24c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V44zm0-20c0-1.1-.9-2-2-2H24c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V24zm20 0c0-1.1-.9-2-2-2H44c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V24z\" fill=\"#f0b046\"/>\n  </g>\n\n  <path id=\"os_listener\" data-readonly=\"data-readonly\" d=\"M61.47 62.46c-.16.03-.3.04-.47.04-1.66 0-3-1.35-3-3v-18c0-9.94-8.06-18-18-18s-18 8.05-18 18v18c0 1.65-1.35 3-3 3-.16 0-.32 0-.47-.04-.17.03-.36.04-.54.04h-2c-2.2 0-4-1.8-4-4v-6c0-2.2 1.8-4 4-4v-7c0-13.26 10.75-24 24-24 13.26 0 24 10.74 24 24v7c2.22 0 4 1.8 4 4v6c0 2.2-1.8 4-4 4h-2c-.17 0-.36 0-.53-.04z\" fill=\"#f8c775\" stroke-width=\"2\" stroke=\"#f6a623\"/>\n\n  <g id=\"os_port\" data-readonly=\"data-readonly\">\n    <rect x=\"20\" y=\"22\" width=\"48\" height=\"32\" rx=\"2\" ry=\"2\" fill=\"#F1F6EC\" stroke=\"#a2c29c\" stroke-width=\"2\"></rect>\n    <path d=\"M50 53h12v6H50v-6zm-23 0h12v6H27v-6zM14 26h-3c-.55 0-1-.45-1-1v-2c0-.56.45-1 1-1h6c.55 0 1 .45 1 1v31c0 .55-.45 1-1 1h-2c-.56 0-1-.44-1-1V26z\" fill=\"#a2c29c\"/>\n  </g>\n\n  <g id=\"os_server\" data-readonly=\"data-readonly\">\n    <rect x=\"5\" y=\"5\" width=\"70\" height=\"70\" rx=\"12\" ry=\"12\" fill=\"#F0F3F8\" stroke=\"#4a90e2\" stroke-width=\"2\"></rect>\n    <path d=\"M5 44.5h70\" stroke=\"#4a90e2\" stroke-width=\"1\" fill=\"none\"/>\n  </g>\n\n</defs></svg>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('CanvasElement',["Design", "CanvasManager", "i18n!/nls/lang.js", "UI.modalplus", "backbone", "svg"], function(Design, CanvasManager, lang, Modal) {
    var CanvasElement, CanvasView, SubElements, __detailExtend;
    CanvasView = null;
    __detailExtend = Backbone.Model.extend;

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 env:dev:end */
    SubElements = {};
    CanvasElement = Backbone.View.extend({
      _ensureElement: function() {
        if (!this.$el) {
          this.$el = $();
        }
      },
      initialize: function(options) {
        this.canvas = options.canvas;
        this.addView(this.create());
        this.render();
        this.listenTo(this.model, "change:name", this.render);
        this.listenModelEvents();
        this.ensureStickyPos();
      },
      listenModelEvents: function() {},
      addView: function(dom) {
        if (!dom) {
          return this;
        }
        this.$el = this.$el.add(dom.node ? dom.node : dom);
        this.delegateEvents();
        return this;
      },
      removeView: function(dom) {
        if (!dom) {
          return this;
        }
        if (dom.node) {
          dom = dom.node;
        }
        this.undelegateEvents();
        this.$el = this.$el.not(dom);
        $(dom).remove();
        this.delegateEvents();
        return this;
      },
      portDirection: function(portName) {
        if (this.portDirMap) {
          return this.portDirMap[portName];
        } else {
          return null;
        }
      },
      portPosition: function(portName, isAtomic) {
        var p;
        if (!this.portPosMap) {
          return null;
        }
        p = this.portPosMap[portName];
        if (isAtomic && p.length >= 5) {
          return [p[3], p[4], p[2]];
        }
        return p;
      },
      isPortSignificant: function(portName) {
        return false;
      },
      hover: function(evt) {
        var cn, _i, _len, _ref;
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          CanvasManager.addClass(cn.$el, "hover");
        }
      },
      hoverOut: function(evt) {
        var cn, _i, _len, _ref;
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          CanvasManager.removeClass(cn.$el, "hover");
        }
      },
      create: function() {},
      render: function() {},
      size: function() {
        var bbox;
        if (this.model.width && this.model.width()) {
          return {
            width: this.model.width(),
            height: this.model.height()
          };
        } else if (this.defaultSize) {
          return {
            width: this.defaultSize[0],
            height: this.defaultSize[1]
          };
        } else {
          bbox = this.$el[0].getBBox();
          console.warn("Accessing CanvasElement's size by getBBox(), should implement defaultSize", this);
          return {
            width: bbox.width,
            height: bbox.height
          };
        }
      },
      pos: function(el) {
        var elId, item, x, y;
        x = this.model.x();
        y = this.model.y();
        if (el) {
          el = el.parentNode;
          while (el) {
            elId = el.getAttribute("data-id");
            item = this.canvas.getItem(elId);
            if (item) {
              x += item.model.x();
              y += item.model.y();
            } else {
              break;
            }
            el = el.parentNode;
          }
        }
        return {
          x: x,
          y: y
        };
      },
      containPoint: function(px, py, includeStickyChildren) {
        var i, rect, testRects, _i, _j, _len, _len1, _ref;
        testRects = [this.rect()];
        if (includeStickyChildren) {
          _ref = this.children(true);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            i = _ref[_i];
            if (i.sticky) {
              testRects.push(i.rect());
            }
          }
        }
        for (_j = 0, _len1 = testRects.length; _j < _len1; _j++) {
          rect = testRects[_j];
          if (rect.x1 <= px && rect.y1 <= py && rect.x2 >= px && rect.y2 >= py) {
            return true;
          }
        }
        return false;
      },
      rect: function(el) {
        var pos, size;
        size = this.size();
        pos = this.pos(el);
        return {
          x1: pos.x,
          y1: pos.y,
          x2: pos.x + size.width,
          y2: pos.y + size.height
        };
      },
      effectiveRect: function() {
        var rect;
        rect = this.rect();
        if (this.isGroup()) {
          rect.x1 -= 1;
          rect.y1 -= 1;
          rect.x2 += 1;
          rect.y2 += 1;
        }
        return rect;
      },
      ensureStickyPos: function(newX, newY) {
        var constrain, prect, size, x, y;
        if (!this.sticky) {
          return;
        }
        size = this.size();
        prect = this.parent().rect();
        constrain = function(v, v1, v2) {
          if (v <= v1) {
            return v1;
          }
          if (v >= v2) {
            return v2;
          }
          return v;
        };
        x = newX || this.model.x();
        y = newY || this.model.y();
        if (x < 0) {
          x = Math.round((prect.x2 - prect.x1 - size.width) / 2);
        }
        if (y < 0) {
          y = Math.round((prect.y2 - prect.y1 - size.height) / 2);
        }
        x = constrain(x, prect.x1, prect.x2 - size.width);
        y = constrain(y, prect.y1, prect.y2 - size.height);
        switch (this.sticky) {
          case "left":
            x = prect.x1 - Math.round(size.width / 2);
            break;
          case "right":
            x = prect.x2 - Math.round(size.width / 2);
            break;
          case "top":
            y = prect.y1 - Math.round(size.height / 2);
            break;
          case "bottom":
            y = prect.y2 - Math.round(size.height / 2);
        }
        if (this.model.attributes.x === x && this.model.attributes.y === y) {
          return;
        }
        this.model.attributes.x = x;
        this.model.attributes.y = y;
        this.$el[0].instance.move(x * CanvasView.GRID_WIDTH, y * CanvasView.GRID_HEIGHT);
        this.updateConnections();
      },
      initNode: function(node, x, y) {
        var child, name, pos, _i, _len, _ref;
        node.move(x * CanvasView.GRID_WIDTH, y * CanvasView.GRID_HEIGHT);
        _ref = node.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if ((child.attr("class") || "").indexOf("port") < 0) {
            continue;
          }
          name = child.attr("data-alias") || child.attr("data-name");
          if (name) {
            pos = this.portPosition(name);
            if (pos) {
              child.move(pos[0], pos[1]);
            }
          }
        }
        return null;
      },
      createRawNode: function() {
        var svg;
        svg = this.canvas.svg;
        return svg.group().attr({
          "data-id": this.cid
        }).classes('canvasel ' + this.type.replace(/\.|:/g, "-")).add([svg.rect(80, 80).radius(16, 16).classes('node-background'), svg.text("").move(40, 90).classes('node-label')]);
      },
      createPortElement: function() {
        var svg;
        svg = this.canvas.svg;
        return svg.group().add([svg.circle(6, 6).cx(0).cy(0).classes("port-border"), svg.circle(6, 6).cx(0).cy(0).classes("port-fill")]);
      },
      createNode: function(option) {
        var el, height, m, size, svg, width, x, y;
        m = this.model;
        size = this.size();
        x = m.x();
        y = m.y();
        width = size.width * CanvasView.GRID_WIDTH;
        height = size.height * CanvasView.GRID_HEIGHT;
        svg = this.canvas.svg;
        el = svg.group();
        el.add([svg.rect(width - 1, height - 1).move(0.5, 0.5).radius(5).classes("node-background"), svg.image(MC.IMG_URL + option.image, option.imageW, option.imageH).move(option.imageX, option.imageY)]).attr({
          "data-id": this.cid
        }).classes('canvasel ' + this.type.replace(/\.|:/g, "-"));
        if (option.labelBg) {
          el.add(svg.use("label_path").classes("node-label-name-bg"));
        }
        if (option.label) {
          el.add(svg.plain(option.label).move(width / 2, height - 4).classes("node-label"));
        }
        if (option.sg) {
          el.add(svg.group().add([svg.rect(7, 5).move(10, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(20, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(30, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(40, 6).classes('node-sg-color-border tooltip'), svg.rect(7, 5).move(50, 6).classes('node-sg-color-border tooltip')]).classes("node-sg-color-group").move(8, 63));
        }
        return el;
      },
      createGroup: function() {
        var el, height, m, pad, svg, width, x, y;
        m = this.model;
        x = m.x();
        y = m.y();
        width = m.width() * CanvasView.GRID_WIDTH;
        height = m.height() * CanvasView.GRID_HEIGHT;
        pad = 10;
        svg = this.canvas.svg;
        el = svg.group();
        return el.add([svg.rect(width, height).radius(5).classes("group"), svg.rect(width - 2 * pad, pad).x(pad).classes("group-resizer top"), svg.rect(pad, height - 2 * pad).y(pad).classes("group-resizer left"), svg.rect(pad, height - 2 * pad).move(width - pad, pad).classes("group-resizer right"), svg.rect(width - 2 * pad, pad).move(pad, height - pad).classes("group-resizer bottom"), svg.rect(pad, pad).classes("group-resizer top-left"), svg.rect(pad, pad).x(width - pad).classes('group-resizer top-right'), svg.rect(pad, pad).y(height - pad).classes("group-resizer bottom-left"), svg.rect(pad, pad).move(width - pad, height - pad).classes("group-resizer bottom-right"), svg.text("").move(5, 15).classes("group-label")]).attr({
          "data-id": this.cid
        }).classes("canvasel group " + this.type.replace(/\.|:/g, "-"));
      },
      label: function() {
        return this.model.get("name");
      },
      labelWidth: function(width) {
        return (width || this.size().width * CanvasView.GRID_WIDTH) - 8;
      },
      isGroup: function() {
        return !!this.model.node_group;
      },
      isTopLevel: function() {
        if (!this.model.parent) {
          return false;
        }
        if (this.model.parent()) {
          return false;
        }
        return true;
      },
      parent: function() {
        var p;
        p = this.model.parent();
        if (p) {
          return this.canvas.getItem(p.id);
        } else {
          return this.canvas.getSvgItem();
        }
      },
      children: function(includeStickyChildren) {
        var canvas, ch, i, items, _i, _len, _ref;
        if (!this.model.node_group) {
          return [];
        }
        canvas = this.canvas;
        items = [];
        _ref = this.model.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          i = canvas.getItem(ch.id);
          if (!i) {
            continue;
          }
          if (i.sticky && !includeStickyChildren) {
            continue;
          }
          items.push(i);
        }
        return items;
      },
      siblings: function(includeStickyChildren) {
        var idx, s;
        s = this.parent().children(includeStickyChildren);
        idx = s.indexOf(this);
        if (idx >= 0) {
          s.splice(idx, 1);
        }
        return s;
      },
      connections: function() {
        var cn, cnns, _i, _len, _ref;
        cnns = [];
        _ref = this.model.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          cn = this.canvas.getItem(cn.id);
          if (cn && cn.node_line) {
            cnns.push(cn);
          }
        }
        return cnns;
      },
      isConnectable: function(fromPort, toId, toPort) {
        var C, p1Comp, p2Comp, t, _i, _len, _ref;
        C = Design.modelClassForPorts(fromPort, toPort);
        if (!C) {
          return false;
        }
        p1Comp = this.model;
        p2Comp = this.model.design().component(toId);
        _ref = p1Comp.connectionTargets(C.prototype.type);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (t === p2Comp) {
            return false;
          }
        }
        return C.isConnectable(p1Comp, p2Comp) !== false;
      },
      select: function(selectedDomElement) {
        this.canvas.triggerSelected(this.type, this.model.id);
      },
      destroy: function(selectedDomElement) {
        var canvas, modal, model, name, result, self;
        if (this.model.isRemoved()) {
          this.$el.remove();
          this.$el = $();
          return;
        }
        canvas = this.canvas;
        result = this.isDestroyable();
        model = this.model;
        name = model.get("name");
        if (result === true && model.node_group && model.children().length > 0) {
          result = sprintf(lang.CANVAS.CVS_CFM_DEL_GROUP, name);
        }
        if (_.isString(result)) {
          self = this;
          modal = new Modal({
            title: sprintf(lang.CANVAS.CVS_CFM_DEL, name),
            template: result,
            confirm: {
              text: lang.IDE.CFM_BTN_DELETE,
              color: "red"
            },
            onConfirm: function() {
              self.doDestroyModel();
              modal.close();
            }
          });
        } else if (result.error) {
          notification("error", result.error);
        } else if (result === true) {
          this.doDestroyModel();
        }
      },
      doDestroyModel: function() {
        return this.model.remove();
      },
      isDestroyable: function(selectedDomElement) {
        var ch, result, _i, _len, _ref;
        result = this.model.isRemovable();
        if (result !== true) {
          return result;
        }
        if (this.model.node_group) {
          _ref = this.children();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ch = _ref[_i];
            result = ch.isDestroyable();
            if (result !== true) {
              break;
            }
          }
        }
        return result;
      },
      isClonable: function() {
        return !!this.model.clone;
      },
      cloneTo: function(parent, x, y) {
        var model, name, nameMatch, self;
        if (!this.model.clone) {
          return;
        }
        name = this.model.get("name");
        nameMatch = name.match(/(.+-copy)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-copy";
        }
        model = CanvasElement.getClassByType(this.type).createResource(this.type, {
          parent: parent.model,
          name: name,
          x: x,
          y: y
        }, {
          cloneSource: this.model
        });
        if (model && model.id) {
          self = this;
          _.defer(function() {
            return self.canvas.selectItem(model.id);
          });
        }
      },
      changeParent: function(newParent, x, y) {
        var parentModel, res;
        if (newParent === this.parent() || newParent === null) {
          if (this.model.x() === x && this.model.y() === y) {
            return;
          }
          this.moveBy(x - this.model.x(), y - this.model.y());
          return;
        }
        if (this.model.get("appId")) {
          notification("error", lang.NOTIFY.WARN_OPERATE_NOT_SUPPORT_YET);
          return;
        }
        if (!this.parent() && newParent) {
          return;
        }
        parentModel = newParent.model;
        res = this.model.isReparentable(parentModel);
        if (_.isString(res)) {
          notification("error", res);
          return;
        }
        if (res === true) {
          parentModel.addChild(this.model);
          this.moveBy(x - this.model.x(), y - this.model.y());
        }
      },
      moveBy: function(deltaX, deltaY) {
        var ch, _i, _len, _ref;
        if (this.isGroup()) {
          _ref = this.children(true);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ch = _ref[_i];
            ch.moveBy(deltaX, deltaY);
          }
        }
        deltaX += this.model.x();
        deltaY += this.model.y();
        this.model.set({
          x: deltaX,
          y: deltaY
        });
        this.$el[0].instance.move(deltaX * CanvasView.GRID_WIDTH, deltaY * CanvasView.GRID_HEIGHT);
        this.updateConnections();
      },
      updateConnections: function() {
        var cn, _i, _len, _ref;
        _ref = this.connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          cn.update();
        }
      },
      applyGeometry: function(x, y, width, height, updateConnections) {
        var ch, classes, cn, name, p, pad, pad2, ports, pos, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
        if (updateConnections == null) {
          updateConnections = true;
        }
        if (x !== void 0 || y !== void 0) {
          this.model.set({
            x: x,
            y: y
          });
          this.$el[0].instance.move(x * CanvasView.GRID_WIDTH, y * CanvasView.GRID_HEIGHT);
        }
        if (this.isGroup() && width !== void 0 && height !== void 0) {
          this.model.set({
            width: width,
            height: height
          });
          _ref = this.children(true);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ch = _ref[_i];
            if (ch.sticky) {
              ch.ensureStickyPos();
            }
          }
        }
        width = (width || this.model.get("width")) * CanvasView.GRID_WIDTH;
        height = (height || this.model.get("height")) * CanvasView.GRID_HEIGHT;
        pad = 10;
        pad2 = 20;
        ports = [];
        _ref1 = this.$el[0].instance.children();
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ch = _ref1[_j];
          classes = ch.classes();
          if (classes.indexOf("group") >= 0) {
            ch.size(width, height);
          } else if (classes.indexOf("top") >= 0) {
            ch.size(width - pad2, pad).x(pad);
          } else if (classes.indexOf("left") >= 0) {
            ch.size(pad, height - pad2).y(pad);
          } else if (classes.indexOf("right") >= 0) {
            ch.size(pad, height - pad2).move(width - pad, pad);
          } else if (classes.indexOf("bottom") >= 0) {
            ch.size(width - pad2, pad).move(pad, height - pad);
          } else if (classes.indexOf("top-right") >= 0) {
            ch.x(width - pad);
          } else if (classes.indexOf("bottom-left") >= 0) {
            ch.y(height - pad);
          } else if (classes.indexOf("bottom-right") >= 0) {
            ch.move(width - pad, height - pad);
          } else if (classes.indexOf("port") >= 0) {
            ports.push(ch);
          } else if (classes.indexOf("group-label") >= 0) {
            CanvasManager.setLabel(this, ch.node);
          }
        }
        for (_k = 0, _len2 = ports.length; _k < _len2; _k++) {
          p = ports[_k];
          name = p.attr("data-alias") || p.attr("data-name");
          if (name) {
            pos = this.portPosition(name);
            if (pos) {
              p.move(pos[0], pos[1]);
            }
          }
        }
        if (updateConnections) {
          _ref2 = this.connections();
          for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
            cn = _ref2[_l];
            cn.update();
          }
        }
      }
    }, {
      isDirectParentType: function(type) {
        return true;
      },
      createResource: function(type, attributes, options) {
        var Model;
        Model = Design.modelClassForType(type);
        return new Model(attributes, options);
      },
      getClassByType: function(type) {
        return SubElements[type];
      },
      extend: function(protoProps, staticProps) {
        var subClass;
        console.assert(protoProps.type, "Subclass of CanvasElement does not specifying a type");
        staticProps = staticProps || {};
        staticProps.type = protoProps.type;
        subClass = __detailExtend.call(this, protoProps, staticProps);
        SubElements[protoProps.type] = subClass;
        return subClass;
      }
    });
    CanvasElement.constant = {
      PORT_4D_ANGLE: -1,
      PORT_2D_H_ANGLE: -2,
      PORT_2D_V_ANGLE: -3,
      PORT_RIGHT_ANGLE: 0,
      PORT_UP_ANGLE: 90,
      PORT_LEFT_ANGLE: 180,
      PORT_DOWN_ANGLE: 270
    };
    CanvasElement.setCanvasViewClass = function(c) {
      CanvasView = c;
    };
    return CanvasElement;
  });

}).call(this);

(function() {
  define('CanvasView',["workspaces/coreeditor/TplSvgDef", "CanvasElement", "CanvasManager", "Design", "i18n!/nls/lang.js", "UI.modalplus", "event", "backbone", "UI.nanoscroller", "svg"], function(SvgDefTpl, CanvasElement, CanvasManager, Design, lang, Modal, ide_event) {
    var CanvasView;
    $(SvgDefTpl()).appendTo("body");
    CanvasView = Backbone.View.extend({
      events: {
        "click .icon-resize-down": "expandHeight",
        "click .icon-resize-up": "shrinkHeight",
        "click .icon-resize-right": "expandWidth",
        "click .icon-resize-left": "shrinkWidth",
        "click .canvasel": "selectItemByClick",
        "click .line": "selectItemByClick",
        "click svg": "deselectItem",
        "addItem_dragover": "__addItemDragOver",
        "addItem_dragleave": "__addItemDragLeave",
        "addItem_drop": "__addItemDrop",
        "mousedown .canvasel": "__moveItemMouseDown",
        "mousedown .group-label": "__moveItemMouseDown",
        "mousedown .group-resizer": "__resizeGroupDown",
        "mousedown .port": "__drawLineDown",
        "mouseenter .canvasel": "__hoverEl",
        "mouseleave .canvasel": "__hoverOutEl",
        "mousedown svg": "__dragCanvasMouseDown",
        "dblclick": "onDblClick"
      },
      initialize: function(options) {
        var canvasSize;
        this.workspace = options.workspace;
        this.design = this.workspace.design;
        this.parent = options.parent;
        this.listenTo(this.design, Design.EVENT.Deserialized, this.reload);
        this.listenTo(this.design, Design.EVENT.AddResource, this.addItem);
        this.listenTo(this.design, Design.EVENT.RemoveResource, this.removeItem);
        this.listenTo(this.design, "change:mode", this.switchMode);
        this.setElement(this.parent.$el.find(".OEPanelCenter"), false);
        this.svg = SVG(this.$el.find("svg")[0]);
        canvasSize = this.size();
        this.__getCanvasView().css({
          width: canvasSize[0] * CanvasView.GRID_WIDTH,
          height: canvasSize[1] * CanvasView.GRID_HEIGHT
        });
        this.$el.nanoScroller();
        this.__popupCache = {};
        this.__itemMap = {};
        this.__scale = 1;
        this.__linestyle = parseInt(localStorage.getItem("canvas/lineStyle")) || 0;
        this.switchMode(this.design.mode());
        this.reload();
      },
      isReadOnly: function() {
        return false;
      },
      onDblClick: function(evt) {
        return this.trigger("doubleclick");
      },
      remove: function() {
        var id, item, popup, type, _ref, _ref1;
        _ref = this.__popupCache;
        for (type in _ref) {
          popup = _ref[type];
          if (popup) {
            popup.remove();
          }
        }
        _ref1 = this.__itemMap;
        for (id in _ref1) {
          item = _ref1[id];
          item.remove();
        }
        return Backbone.View.prototype.remove.apply(this, arguments);
      },
      updateSize: function() {
        var self;
        self = this;
        return setTimeout(function() {
          return self.$el.nanoScroller();
        }, 150);
      },
      __appendSvg: function(svgEl, layer) {
        if (svgEl.parent) {
          svgEl.parent.removeElement(svgEl);
        }
        layer = $(this.svg.node).children(layer);
        layer.append(svgEl.node);
        svgEl.parent = layer[0].instance;
        return svgEl;
      },
      __getCanvasView: function() {
        return this.$el.children().children(".canvas-view");
      },
      appendLine: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_line");
      },
      appendNode: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_node");
      },
      switchMode: function(mode) {
        console.assert("stack app appedit".indexOf(mode) >= 0);
        this.__getCanvasView().attr("data-mode", mode);
        this.clearPopups();
        this.trigger("switchMode", mode);
      },
      registerPopup: function(type, popup, unregister) {
        var oldPopup;
        oldPopup = this.__popupCache[type];
        if (unregister) {
          if (oldPopup === popup) {
            delete this.__popupCache[type];
          }
        } else {
          if (oldPopup && oldPopup !== popup) {
            oldPopup.remove();
          }
          this.__popupCache[type] = popup;
        }
      },
      clearPopups: function() {
        var popup, type, _ref;
        _ref = this.__popupCache;
        for (type in _ref) {
          popup = _ref[type];
          popup.remove();
        }
        this.__popupCache = {};
      },
      canvasRect: function() {
        var s;
        s = this.size();
        return {
          x1: 3,
          y1: 1,
          x2: s[0] - 3,
          y2: s[1] - 1
        };
      },
      isRectAvailableForItem: function(subRect, item) {
        var ch, children, parentRect, _i, _len;
        if (item.parent()) {
          parentRect = item.parent().rect();
          children = item.parent().children();
        }
        if (!item.isTopLevel()) {
          parentRect.x1 += 1;
          parentRect.y1 += 1;
          parentRect.x2 -= 1;
          parentRect.y2 -= 1;
        }
        if (parentRect.x1 > subRect.x1 || parentRect.y1 > subRect.y1 || parentRect.x2 < subRect.x2 || parentRect.y2 < subRect.y2) {
          return false;
        }
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          ch = children[_i];
          if (ch === item) {
            continue;
          }
          if (item.isGroup()) {
            parentRect = ch.rect();
          } else {
            parentRect = ch.effectiveRect();
          }
          if (!(parentRect.x1 >= subRect.x2 || parentRect.x2 <= subRect.x1 || parentRect.y1 >= subRect.y2 || parentRect.y2 <= subRect.y1)) {
            return false;
          }
        }
        return true;
      },
      moveSelectedItem: function(deltaX, deltaY) {
        var item, rect;
        if (this.isReadOnly()) {
          return;
        }
        item = this.getSelectedItem();
        if (!item) {
          return;
        }
        rect = item.effectiveRect();
        rect.x1 += deltaX;
        rect.y1 += deltaY;
        rect.x2 += deltaX;
        rect.y2 += deltaY;
        if (item.sticky) {
          item.ensureStickyPos(rect.x1, rect.y1);
        } else if (this.isRectAvailableForItem(rect, item)) {
          item.moveBy(deltaX, deltaY);
        }
      },
      getSelectedItem: function() {
        if (!this.__selected) {
          return null;
        }
        return this.getItem(this.__selected.getAttribute("data-id"));
      },
      getSelectedComp: function() {
        var _ref;
        return (_ref = this.getSelectedItem()) != null ? _ref.model : void 0;
      },
      delSelectedItem: function() {
        if (this.isReadOnly() || !this.__selected) {
          return;
        }
        return this.getItem(this.__selected.getAttribute("data-id")).destroy(this.__selected);
      },
      deleteItem: function(itemOrId) {
        if (_.isString(itemOrId)) {
          itemOrId = this.getItem(itemOrId);
        }
        if (!itemOrId) {
          return;
        }
        return itemOrId.destroy();
      },
      selectPrevItem: function() {
        var idx, nodes;
        nodes = $(this.svg.node).find(".canvasel:not(.group)");
        idx = this.__selected ? [].indexOf.call(nodes, this.__selected) - 1 : null;
        if (idx === null || idx < 0) {
          idx = nodes.length - 1;
        }
        return this.selectItem(nodes[idx]);
      },
      selectNextItem: function() {
        var idx, nodes;
        nodes = $(this.svg.node).find(".canvasel:not(.group)");
        idx = this.__selected ? [].indexOf.call(nodes, this.__selected) + 1 : null;
        if (idx === null || idx >= nodes.length) {
          idx = 0;
        }
        return this.selectItem(nodes[idx]);
      },
      selectItem: function(elementOrId) {
        var item;
        if (_.isString(elementOrId)) {
          elementOrId = this.getItem(elementOrId).$el[0];
        }
        if (!elementOrId) {
          return;
        }
        if (this.__selected) {
          CanvasManager.removeClass(this.__selected, "selected");
          this.__selected = null;
        }
        this.__selected = elementOrId;
        CanvasManager.addClass(this.__selected, "selected");
        item = this.getItem(this.__selected.getAttribute("data-id"));
        item.select(this.__selected);
      },
      selectItemByClick: function(evt) {
        this.selectItem(evt.currentTarget);
        return false;
      },
      deselectItem: function(silent) {
        if (this.__selected) {
          CanvasManager.removeClass(this.__selected, "selected");
          this.__selected = null;
        }
        if (silent !== true) {
          this.triggerSelected();
        }
      },
      triggerSelected: function(type, id) {
        this.trigger("itemSelected", type, id);
      },
      clearItems: function() {
        var cleared, id, item, _ref;
        cleared = {};
        _ref = this.__itemMap;
        for (id in _ref) {
          item = _ref[id];
          if (!cleared[item.cid]) {
            item.remove();
            cleared[item.cid] = true;
          }
        }
        this.__itemMap = {};
      },
      lineStyle: function() {
        return this.__linestyle;
      },
      updateLineStyle: function() {
        var cn, ls, uid, _ref;
        ls = parseInt(localStorage.getItem("canvas/lineStyle")) || 0;
        if (this.__linestyle === ls) {
          return;
        }
        this.__linestyle = ls;
        _ref = this.__itemLineMap;
        for (uid in _ref) {
          cn = _ref[uid];
          cn.update();
        }
      },
      toggleSgLine: function(show) {
        return CanvasManager.toggle($(this.svg.node).children(".layer_sgline"), show);
      },
      zoomOut: function() {
        return this.zoom(0.2);
      },
      zoomIn: function() {
        return this.zoom(-0.2);
      },
      zoom: function(delta) {
        var realH, realW, scale, size;
        scale = Math.round((this.__scale + delta) * 10) / 10;
        if (scale < 1 || scale > 1.6) {
          return;
        }
        this.__scale = scale;
        size = this.size();
        realW = size[0] * CanvasView.GRID_WIDTH;
        realH = size[1] * CanvasView.GRID_HEIGHT;
        this.__getCanvasView().css({
          width: size[0] * CanvasView.GRID_WIDTH / scale,
          height: size[1] * CanvasView.GRID_HEIGHT / scale
        }).attr("data-scale", scale).children("svg")[0].setAttribute("viewBox", "0 0 " + realW + " " + realH);
        this.$el.nanoScroller();
      },
      size: function() {
        return this.design.get("canvasSize");
      },
      scale: function() {
        return this.__scale;
      },
      expandHeight: function() {
        return this.resize("height", 60);
      },
      shrinkHeight: function() {
        return this.resize("height", -60);
      },
      expandWidth: function() {
        return this.resize("width", 60);
      },
      shrinkWidth: function() {
        return this.resize("width", -60);
      },
      resize: function(dimension, delta) {
        var bbox, realH, realW, scale, size, wrapper;
        size = this.size();
        scale = this.scale();
        size[dimension === "width" ? 0 : 1] += delta;
        wrapper = this.__getCanvasView();
        realW = size[0] * CanvasView.GRID_WIDTH;
        realH = size[1] * CanvasView.GRID_HEIGHT;
        if (delta > 0) {
          wrapper.children(".icon-resize-up, .icon-resize-left").show();
        } else {
          bbox = wrapper.children("svg")[0].getBBox();
          if (bbox.width + bbox.x + 20 >= realW) {
            realW = bbox.width + bbox.x + 20;
            size[0] = realW / CanvasView.GRID_WIDTH;
            wrapper.children(".icon-resize-left").hide();
          }
          if (bbox.height + bbox.y + 20 >= realH) {
            realH = bbox.height + bbox.y + 20;
            size[1] = realH / CanvasView.GRID_HEIGHT;
            wrapper.children(".icon-resize-up").hide();
          }
        }
        this.design.set("canvasSize", size);
        wrapper.css({
          width: realW / scale,
          height: realH / scale
        }).children("svg")[0].setAttribute("viewBox", "0 0 " + realW + " " + realH);
        this.$el.nanoScroller();
      },
      update: function() {
        return this.trigger("change:externalData");
      },
      reload: function() {
        var ItemClass, comp, lines, t, types, _i, _len;
        console.log("Reloading svg canvas.");
        this.clearPopups();
        this.clearItems();
        this.addSvgItem();
        this.initializing = true;
        this.recreateStructure();
        this.__itemLineMap = {};
        this.__itemNodeMap = {};
        this.__itemTopLevel = [];
        lines = [];
        types = {};
        this.design.eachComponent(function(comp) {
          if (comp.node_line) {
            lines.push(comp);
          } else {
            this.addItem(comp);
          }
          types[comp.type] = true;
        }, this);
        for (t in types) {
          ItemClass = CanvasElement.getClassByType(t);
          if (ItemClass && ItemClass.render) {
            ItemClass.render(this);
          }
        }
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          comp = lines[_i];
          this.addItem(comp, true);
        }
        this.initializing = false;
      },
      __batchAddLines: function() {
        var e, lineModel, _i, _len, _ref;
        _ref = this.__toAddLines;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lineModel = _ref[_i];
          try {
            this.addItem(lineModel, true);
          } catch (_error) {
            e = _error;
            console.error(e);
          }
        }
        this.__toAddLines = null;
      },
      addSvgItem: function() {
        var SvgItemClass, item;
        SvgItemClass = CanvasElement.getClassByType("SVG");
        item = new SvgItemClass({
          canvas: this
        });
        this.svgItem = this.__itemMap[item.cid] = item;
      },
      getSvgItem: function() {
        return this.svgItem;
      },
      addItem: function(resourceModel, isScheduled) {
        var ItemClass, item, self;
        ItemClass = CanvasElement.getClassByType(resourceModel.type);
        if (!ItemClass) {
          return;
        }
        if (!resourceModel.isVisual()) {
          return;
        }
        if (resourceModel.node_line && !isScheduled) {
          if (!this.__toAddLines) {
            this.__toAddLines = [resourceModel];
            self = this;
            _.defer(function() {
              return self.__batchAddLines();
            });
          } else {
            this.__toAddLines.push(resourceModel);
          }
          return;
        }
        item = new ItemClass({
          model: resourceModel,
          canvas: this
        });
        if (!item.cid) {
          return;
        }
        this.__itemMap[resourceModel.id] = item;
        this.__itemMap[item.cid] = item;
        if (item.isTopLevel()) {
          this.__itemTopLevel[item.isGroup() ? "push" : "unshift"](item);
        }
        if (resourceModel.node_line) {
          this.__itemLineMap[item.cid] = item;
        } else if (!resourceModel.node_group) {
          this.__itemNodeMap[item.cid] = item;
        }
      },
      removeItem: function(resourceModel) {
        var idx, item;
        item = this.getItem(resourceModel.id);
        if (!item) {
          return;
        }
        if (this.getSelectedItem() === item) {
          this.deselectItem();
        }
        delete this.__itemMap[resourceModel.id];
        delete this.__itemMap[item.cid];
        delete this.__itemLineMap[item.cid];
        delete this.__itemNodeMap[item.cid];
        idx = this.__itemTopLevel.indexOf(item);
        if (idx >= 0) {
          this.__itemTopLevel.splice(idx, 1);
        }
        item.remove();
        item.canvas = null;
      },
      getItem: function(id) {
        return this.__itemMap[id];
      },
      autoLayout: function(full) {
        return this.autoLayoutFully();
      },
      __hoverEl: function(evt) {
        var _ref;
        return (_ref = this.getItem(evt.currentTarget.getAttribute("data-id"))) != null ? _ref.hover(evt) : void 0;
      },
      __hoverOutEl: function(evt) {
        var _ref;
        return (_ref = this.getItem(evt.currentTarget.getAttribute("data-id"))) != null ? _ref.hoverOut(evt) : void 0;
      },
      __localToCanvasCoor: function(x, y) {
        var sc;
        sc = this.$el.children(":first-child")[0];
        return {
          x: Math.round((x + sc.scrollLeft) / CanvasView.GRID_WIDTH * this.__scale),
          y: Math.round((y + sc.scrollTop) / CanvasView.GRID_HEIGHT * this.__scale)
        };
      },
      __itemAtPos: function(coord) {
        var child, children, chs, context, _i, _len;
        children = this.__itemTopLevel;
        context = null;
        while (children) {
          chs = children;
          children = null;
          for (_i = 0, _len = chs.length; _i < _len; _i++) {
            child = chs[_i];
            if (!child.containPoint(coord.x, coord.y, true)) {
              continue;
            }
            if (!child.isGroup()) {
              return child;
            }
            context = child;
            children = child.children(true);
            break;
          }
        }
        return context;
      },
      __groupAtCoor: function(coord, excludeSubject) {
        var child, children, chs, context, _i, _len;
        children = this.__itemTopLevel;
        context = null;
        while (children) {
          chs = children;
          children = null;
          for (_i = 0, _len = chs.length; _i < _len; _i++) {
            child = chs[_i];
            if (!child.isGroup()) {
              continue;
            }
            if (child === excludeSubject) {
              continue;
            }
            if (!child.containPoint(coord.x, coord.y)) {
              continue;
            }
            context = child;
            children = child.children();
            break;
          }
        }
        return context;
      },
      __clearDragScroll: function() {
        if (this.__dragScrollInt) {
          console.info("Removed drag scroll timer");
          clearInterval(this.__dragScrollInt);
          this.__dragScrollInt = null;
        }
      },
      __scrollOnDrag: function(data) {
        var DETECT_SIZE, SCROLL_SIZE, continuous, dimension, scrollContent, scrollLeft, scrollTop, scrollX, scrollY, self;
        dimension = data.zoneDimension;
        if (!dimension) {
          return;
        }
        scrollContent = this.$el.children(":first-child")[0];
        scrollLeft = scrollContent.scrollLeft;
        scrollTop = scrollContent.scrollTop;
        DETECT_SIZE = 50;
        SCROLL_SIZE = 10;
        if (data.pageX - dimension.x1 <= DETECT_SIZE) {
          if (scrollLeft > SCROLL_SIZE) {
            continuous = true;
            scrollX = scrollLeft - SCROLL_SIZE;
          } else if (scrollLeft > 0) {
            scrollX = "0";
          }
        } else if (dimension.x2 - data.pageX <= DETECT_SIZE) {
          continuous = true;
          scrollX = scrollLeft + SCROLL_SIZE;
        }
        if (data.pageY - dimension.y1 <= DETECT_SIZE) {
          if (scrollTop > SCROLL_SIZE) {
            continuous = true;
            scrollY = scrollTop - SCROLL_SIZE;
          } else if (scrollTop > 0) {
            scrollY = "0";
          }
        } else if (dimension.y2 - data.pageY <= DETECT_SIZE) {
          continuous = true;
          scrollY = scrollTop + SCROLL_SIZE;
        }
        if (scrollX !== void 0) {
          this.$el.nanoScroller({
            scrollLeft: scrollX
          });
        }
        if (scrollY !== void 0) {
          this.$el.nanoScroller({
            scrollTop: scrollY
          });
        }
        if (continuous) {
          if (!this.__dragScrollInt) {
            self = this;
            console.info("Added drag scroll timer");
            this.__dragScrollInt = setInterval(function() {
              return self.__scrollOnDrag(data);
            }, 50);
          }
        } else {
          this.__clearDragScroll();
        }
      }

      /*
       * Connect lines ( Implemented in CanvasViewConnect )
      __drawLineDown : ( evt )->
      __connect : ( LineClass, comp1, comp2, startItem )->
      __popLineInitiator : ()->
       */

      /*
       * Resize ( Implemented in CanvasViewGResizer )
      __resizeGroupDown : ( evt )->
       */

      /*
       * Drop to add ( Implemented in CanvasViewDnd )
      dragItem : ()->
      __addItemDragOver : ( evt )->
      __addItemDragLeave : ( evt )->
      __addItemDrop : ( evt )->
      __bestFitRect : ()->
      __moveItemMouseDown : ( evt )->
       */

      /*
       * Highlight some items ( Implemented in CavasViewEffect )
      hightLightItems  : ( items )->
      removeHightLight : ()->
       */
    }, {
      GRID_WIDTH: 10,
      GRID_HEIGHT: 10
    });
    CanvasElement.setCanvasViewClass(CanvasView);
    return CanvasView;
  });

}).call(this);

(function() {
  define('CanvasPopup',["backbone"], function() {
    return Backbone.View.extend({
      type: "CanvasPopup",
      attachType: "float",
      closeOnBlur: false,
      className: "canvas-pp",
      initialize: function(data) {
        var ac, ceItem, oldPoup, self;
        console.info("Showing canvas popup");
        console.assert(data.canvas);
        console.assert(data.attachment, "Canvas popup must be attached to some element");
        $.extend(this, data);
        this.$el.appendTo(this.canvas.__getCanvasView().parent());
        this.render();
        if (this.closeOnBlur) {
          self = this;
          this.ac = ac = function(evt) {
            return self.autoclose(evt);
          };
          this.canvas.$el[0].addEventListener("mousedown", ac, true);
        }
        ceItem = this.canvas.getItem($(this.attachment).closest(".canvasel").attr("data-id")) || this.attachment;
        if (!ceItem.__popupCache) {
          ceItem.__popupCache = {};
        }
        oldPoup = ceItem.__popupCache[this.type];
        ceItem.__popupCache[this.type] = this;
        if (oldPoup) {
          this.migrate(oldPoup);
          oldPoup.remove();
        }
        this.canvas.registerPopup(this.type, this);
      },
      migrate: function(oldPopup) {},
      autoclose: function(evt) {
        var popup;
        popup = $(evt.target).closest(".canvas-pp");
        if (popup.length && popup[0] === this.$el[0]) {
          return false;
        }
        this.remove();
        return true;
      },
      render: function() {
        this.$el.html(this.content());
        if (this.attachType === "float") {
          this.attachFloat();
        } else {
          this.attachOverlay();
        }
      },
      attachFloat: function() {
        var attachment, canvasview, canvaswrapper, viewportX, width, x;
        attachment = this.attachment.getBoundingClientRect();
        canvaswrapper = this.canvas.$el[0].getBoundingClientRect();
        canvasview = this.canvas.__getCanvasView()[0].getBoundingClientRect();
        viewportX = attachment.left - canvaswrapper.left;
        width = this.$el.outerWidth(true);
        if (viewportX > width + 20) {
          this.$el.addClass("pp-left");
          x = attachment.left - canvasview.left - width;
        } else {
          this.$el.addClass("pp-right");
          x = attachment.right - canvasview.left;
        }
        this.$el.css({
          left: x,
          top: attachment.top - canvasview.top + (attachment.height - this.$el.outerHeight(true)) / 2
        });
      },
      attachOverlay: function() {
        var attachment, canvasview;
        attachment = this.attachment.getBoundingClientRect();
        canvasview = this.canvas.__getCanvasView()[0].getBoundingClientRect();
        this.$el.css({
          left: attachment.left - canvasview.left,
          top: attachment.top - canvasview.top
        });
      },
      remove: function() {
        var ceItem, oldPoup;
        this.canvas.registerPopup(this.type, this, false);
        ceItem = this.canvas.getItem($(this.attachment).closest(".canvasel").attr("data-id")) || this.attachment;
        oldPoup = (ceItem.__popupCache || {})[this.type];
        if (oldPoup === this) {
          delete ceItem.__popupCache[this.type];
        }
        if (this.autoclose) {
          this.canvas.$el[0].removeEventListener("mousedown", this.ac, true);
        }
        if (this.onRemove) {
          this.onRemove();
        }
        return Backbone.View.prototype.remove.call(this);
      },
      content: function() {}
    });
  });

}).call(this);

(function() {
  define('CanvasViewLayout',["CanvasView", "constant"], function(CanvasView, constant) {
    var DefaultArrangeMethod, DefaultGroupMethod, DefaultMethods, Defination, GrowingPacker, arrangeGroup, buildHierachy, groupChildren, __GetMethod;
    Defination = null;
    GrowingPacker = (function() {
      function GrowingPacker(paddingX, paddingY) {
        this.px = paddingX || 0;
        this.py = paddingY || 0;
      }

      GrowingPacker.prototype.fit = function(blocks) {
        var block, h, len, n, node, w;
        len = blocks.length;
        this.root = {
          x: 0,
          y: 0,
          w: len > 0 ? blocks[0].w + this.px : 0,
          h: len > 0 ? blocks[0].h + this.py : 0
        };
        n = 0;
        while (n < len) {
          block = blocks[n];
          w = block.w + this.px;
          h = block.h + this.px;
          node = this.findNode(this.root, w, h);
          if (node) {
            block.fit = this.splitNode(node, w, h);
          } else {
            block.fit = this.growNode(w, h);
          }
          n++;
        }
      };

      GrowingPacker.prototype.findNode = function(root, w, h) {
        if (root.used) {
          return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        } else if ((w <= root.w) && (h <= root.h)) {
          return root;
        } else {
          return null;
        }
      };

      GrowingPacker.prototype.splitNode = function(node, w, h) {
        node.used = true;
        node.down = {
          x: node.x,
          y: node.y + h,
          w: node.w,
          h: node.h - h
        };
        node.right = {
          x: node.x + w,
          y: node.y,
          w: node.w - w,
          h: h
        };
        return node;
      };

      GrowingPacker.prototype.growNode = function(w, h) {
        var canGrowDown, canGrowRight, shouldGrowDown, shouldGrowRight;
        canGrowDown = w <= this.root.w;
        canGrowRight = h <= this.root.h;
        shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w));
        shouldGrowDown = canGrowDown && (this.root.w >= (this.root.h + h));
        if (shouldGrowRight) {
          return this.growRight(w, h);
        } else if (shouldGrowDown) {
          return this.growDown(w, h);
        } else if (canGrowRight) {
          return this.growRight(w, h);
        } else if (canGrowDown) {
          return this.growDown(w, h);
        } else {
          return null;
        }
      };

      GrowingPacker.prototype.growRight = function(w, h) {
        var node;
        this.root = {
          used: true,
          x: 0,
          y: 0,
          w: this.root.w + w,
          h: this.root.h,
          down: this.root,
          right: {
            x: this.root.w,
            y: 0,
            w: w,
            h: this.root.h
          }
        };
        node = this.findNode(this.root, w, h);
        if (node) {
          return this.splitNode(node, w, h);
        } else {
          return null;
        }
      };

      GrowingPacker.prototype.growDown = function(w, h) {
        var node;
        this.root = {
          used: true,
          x: 0,
          y: 0,
          w: this.root.w,
          h: this.root.h + h,
          down: {
            x: 0,
            y: this.root.h,
            w: this.root.w,
            h: h
          },
          right: this.root
        };
        node = this.findNode(this.root, w, h);
        if (node) {
          return this.splitNode(node, w, h);
        } else {
          return null;
        }
      };

      return GrowingPacker;

    })();
    DefaultGroupMethod = function(children) {
      var childrens, groups, type, _ref;
      groups = [];
      _ref = _.groupBy(children, "type");
      for (type in _ref) {
        childrens = _ref[type];
        groups.push({
          type: type + "_group",
          children: childrens
        });
      }
      return groups;
    };
    DefaultArrangeMethod = function(children) {
      var ch, chDef, chHeight, chWidth, def, height, space, x, _i, _len;
      def = Defination[this.type] || {};
      space = def.space || 0;
      x = 0;
      height = 0;
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        chDef = Defination[ch.type] || {};
        chWidth = ch.width || chDef.width || 0;
        chHeight = ch.height || chDef.height || 0;
        ch.x = x;
        ch.y = 0;
        if (chWidth > 0) {
          x += chWidth + space;
        }
        if (chHeight && chHeight > height) {
          height = chHeight;
        }
      }
      if (children.length) {
        x -= space;
      }
      return {
        width: x || def.width,
        height: height || def.height
      };
    };
    DefaultMethods = {
      GroupMByType: DefaultGroupMethod,
      ArrangeHorizontal: DefaultArrangeMethod,
      ArrangeVertical: function(children) {
        var ch, chDef, chHeight, chWidth, def, space, width, y, _i, _len;
        def = Defination[this.type] || {};
        space = def.space || 0;
        y = 0;
        width = 0;
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          ch = children[_i];
          chDef = Defination[ch.type] || {};
          chWidth = ch.width || chDef.width || 0;
          chHeight = ch.height || chDef.height || 0;
          ch.x = 0;
          ch.y = y;
          if (chHeight > 0) {
            y += chHeight + space;
          }
          if (chWidth && chWidth > width) {
            width = chWidth;
          }
        }
        if (children.length) {
          y -= space;
        }
        return {
          width: width || def.width,
          height: y || def.height
        };
      },
      ArrangeBinPack: function(children) {
        var ch, chs, def, height, spaceX, spaceY, width, _i, _len, _ref, _ref1;
        if (children.length === 0) {
          return {
            width: 0,
            height: 0
          };
        } else if (children.length === 1) {
          children[0].x = children[0].y = 0;
          return {
            width: children[0].width,
            height: children[0].height
          };
        }
        chs = children.map(function(ch) {
          return {
            w: ch.width,
            h: ch.height,
            item: ch,
            sign: ch.width > ch.height ? ch.width : ch.height
          };
        });
        chs.sort(function(a, b) {
          return b.sign - a.sign;
        });
        def = Defination[this.type] || {};
        spaceX = def.spaceX || def.space || 0;
        spaceY = def.spaceY || def.space || 0;
        (new GrowingPacker(spaceX, spaceY)).fit(chs);
        width = 0;
        height = 0;
        for (_i = 0, _len = chs.length; _i < _len; _i++) {
          ch = chs[_i];
          ch.item.x = ((_ref = ch.fit) != null ? _ref.x : void 0) || 0;
          ch.item.y = ((_ref1 = ch.fit) != null ? _ref1.y : void 0) || 0;
          width = Math.max(width, ch.item.x + ch.item.width);
          height = Math.max(height, ch.item.y + ch.item.height);
        }
        return {
          width: width,
          height: height
        };
      }
    };
    __GetMethod = function(m) {
      if (!m) {
        return null;
      }
      if (_.isFunction(m)) {
        return m;
      }
      return DefaultMethods[m];
    };
    buildHierachy = function(item) {
      var ch, children, obj, sort, _i, _len, _ref, _ref1;
      obj = {
        component: item,
        type: item.type,
        x: 0,
        y: 0
      };
      if (item.children) {
        obj.children = [];
        children = item.children();
        sort = __GetMethod((_ref = Defination[item.type]) != null ? _ref.sortMethod : void 0);
        if (sort) {
          children = sort.call(item, children);
        }
        for (_i = 0, _len = children.length; _i < _len; _i++) {
          ch = children[_i];
          if ((_ref1 = Defination[ch.type]) != null ? _ref1.ignore : void 0) {
            continue;
          }
          obj.children.push(buildHierachy(ch));
        }
      }
      return obj;
    };
    groupChildren = function(item) {
      var ch, groupMethod, _i, _len, _ref, _ref1;
      if (item.children) {
        _ref = item.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          groupChildren(ch);
        }
      }
      groupMethod = __GetMethod((_ref1 = Defination[item.type]) != null ? _ref1.groupMethod : void 0) || DefaultGroupMethod;
      item.children = groupMethod.call(item, item.children);
      return item;
    };
    arrangeGroup = function(item) {
      var arrangeMethod, ch, def, size, _i, _j, _len, _len1, _ref, _ref1;
      def = Defination[item.type] || {};
      if (item.children) {
        _ref = item.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          arrangeGroup(ch);
        }
        arrangeMethod = __GetMethod(def.arrangeMethod) || DefaultArrangeMethod;
        size = arrangeMethod.call(item, item.children);
        if (def.margin) {
          size.width += def.margin * 2;
          size.height += def.margin * 2;
          _ref1 = item.children;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ch = _ref1[_j];
            ch.x += def.margin;
            ch.y += def.margin;
          }
        }
        item.width = size.width;
        item.height = size.height;
      } else {
        item.width = def.width || 0;
        item.height = def.height || 0;
      }
      return item;
    };
    CanvasView.prototype.applyGeometry = function(item, parentX, parentY) {
      var ch, view, x, y, _i, _len, _ref, _ref1;
      x = item.x + parentX;
      y = item.y + parentY;
      if (item.children) {
        _ref = item.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          this.applyGeometry(ch, x, y);
        }
      }
      if (item.component) {
        view = this.getItem(item.component.id);
        if (view) {
          if ((_ref1 = Defination[item.type]) != null ? _ref1.sticky : void 0) {
            x = -1;
            y = -1;
          }
          view.applyGeometry(x, y, item.width, item.height, false);
        }
      }
    };
    CanvasView.prototype.autoLayoutFully = function() {
      var hierachy, line, svgChildren, uid, _ref;
      Defination = this.autoLayoutConfig;

      /*
       * 1. Build hierachy
       */
      svgChildren = this.__itemTopLevel.map(function(item) {
        return item.model;
      });
      hierachy = {
        type: "SVG",
        children: function() {
          return svgChildren;
        }
      };
      hierachy = buildHierachy(hierachy);

      /*
       * 2. Group children
       */
      groupChildren(hierachy);

      /*
       * 3. Arrange Groups
       */
      arrangeGroup(hierachy);

      /*
       * 4. Merge Position Info
       */
      this.applyGeometry(hierachy, 5, 3);

      /*
       * 5. Update Line
       */
      _ref = this.__itemLineMap;
      for (uid in _ref) {
        line = _ref[uid];
        line.update();
      }
    };
    return {
      DefaultGroupMethod: DefaultGroupMethod,
      DefaultArrangeMethod: DefaultArrangeMethod
    };
  });

}).call(this);

(function() {
  define('workspaces/coreeditor/CeSvg',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js", "UI.modalplus"], function(CanvasElement, constant, CanvasManager, lang, Modal) {
    return CanvasElement.extend({

      /* env:dev                                     env:dev:end */
      type: "SVG",
      initialize: function(options) {
        this.canvas = options.canvas;
      },
      hover: function(evt) {},
      hoverOut: function(evt) {},
      pos: function(el) {
        return {
          x: 0,
          y: 0
        };
      },
      size: function() {
        var s;
        s = this.canvas.size();
        return {
          width: s[0] - 4,
          height: s[1] - 2
        };
      },
      rect: function(el) {
        var s;
        s = this.canvas.size();
        return {
          x1: 4,
          y1: 2,
          x2: s[0],
          y2: s[1]
        };
      },
      effectiveRect: function() {
        var s;
        s = this.canvas.size();
        return {
          x1: 0,
          y1: 0,
          x2: s[0],
          y2: s[1]
        };
      },
      ensureStickyPos: function() {},
      isGroup: function() {
        return true;
      },
      isTopLevel: function() {
        return false;
      },
      parent: function() {
        return null;
      },
      children: function() {
        return this.canvas.__itemTopLevel.slice(0);
      },
      siblings: function() {
        return [];
      },
      connections: function() {
        return [];
      },
      isConnectable: function(fromPort, toId, toPort) {
        return false;
      },
      select: function(selectedDomElement) {},
      destroy: function(selectedDomElement) {},
      doDestroyModel: function() {},
      isDestroyable: function(selectedDomElement) {
        return false;
      },
      isClonable: function() {
        return false;
      },
      cloneTo: function(parent, x, y) {},
      changeParent: function(newParent, x, y) {},
      moveBy: function(deltaX, deltaY) {},
      updateConnections: function() {},
      applyGeometry: function(x, y, width, height, updateConnections) {
        if (updateConnections == null) {
          updateConnections = true;
        }
      }
    }, {
      isDirectParentType: function(type) {
        return true;
      },
      createResource: function(type, attributes, options) {}
    });
  });

}).call(this);

(function() {
  define('workspaces/coreeditor/CanvasViewConnect',["Design", "CanvasView", "CanvasManager", "CanvasElement", "i18n!/nls/lang.js", "UI.modalplus"], function(Design, CanvasView, CanvasManager, CanvasElement, lang, Modal) {
    var CanvasViewProto, cancelConnect, detectDrag, startDrag, __drawLineMove, __drawLineUp;
    CanvasViewProto = CanvasView.prototype;
    cancelConnect = function(evt) {
      var $el, data, _i, _len, _ref;
      $(document).off(".drawline");
      data = evt.data;
      data.context.__clearDragScroll();
      data.context.removeHightLight();
      data.context.hideHintMessage();
      if (data.marker) {
        data.marker.remove();
        data.lineSvg.remove();
        data.overlay.remove();
        _ref = data.highlightEls;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          $el = _ref[_i];
          CanvasManager.removeClass($el, "connectable");
        }
      }
    };
    detectDrag = function(evt) {
      var data;
      data = evt.data;
      if (Math.pow(evt.pageX - data.startX, 2) + Math.pow(evt.pageY - data.startY, 2) >= 4) {
        $(document).off("mousemove.drawline").off("mouseup.drawline").on({
          "mousemove.drawline": __drawLineMove,
          "mouseup.drawline": __drawLineUp
        }, data);
        startDrag.call(data.context, data);
      }
      return false;
    };
    startDrag = function(d) {
      var $port, cn, co, comp, data, dimension, highlightEls, item, lineSvg, marker, portAlias, portName, portPos, ports, pos, targetItems, ti, toPort, type, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      $port = d.source;
      item = d.startItem;
      portName = $port.attr("data-name");
      portAlias = $port.attr("data-alias");
      pos = item.pos($port.closest(".canvasel")[0]);
      portPos = item.portPosition(portAlias || portName);
      pos.x = pos.x * CanvasView.GRID_WIDTH + portPos[0];
      pos.y = pos.y * CanvasView.GRID_HEIGHT + portPos[1];
      _ref = item.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        CanvasManager.addClass(cn.$el, "hover");
      }
      highlightEls = [];
      targetItems = [];
      _ref1 = Design.modelClassForType("Framework_CN").connectionData(item.type, portName);
      for (type in _ref1) {
        data = _ref1[type];
        _ref2 = this.design.componentsOfType(type);
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          comp = _ref2[_j];
          for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
            toPort = data[_k];
            if (comp !== item.model && item.isConnectable(portName, comp.id, toPort)) {
              ti = this.getItem(comp.id);
              if (ti) {
                ports = ti.$el.children("[data-name='" + toPort + "']");
                CanvasManager.addClass(ports, "connectable");
                highlightEls.push(ports);
                targetItems.push(ti);
              }
            }
          }
        }
      }
      marker = this.svg.marker(3, 3).classes(portName).attr("id", "draw-line-marker").add(this.svg.path("M1.5,0 L1.5,3 L3,1.5 L1.5,0"));
      lineSvg = this.svg.line(pos.x, pos.y, pos.x, pos.y).classes("draw-line " + portName).marker("end", marker);
      this.svg.add(lineSvg);
      co = this.$el.offset();
      dimension = {
        x1: co.left,
        y1: co.top,
        x2: co.left + this.$el.outerWidth(),
        y2: co.top + this.$el.outerHeight()
      };
      this.hightLightItems(targetItems);
      this.showHintMessage($port.attr("data-tooltip"));
      $.extend(d, {
        marker: marker,
        lineSvg: lineSvg,
        zoneDimension: dimension,
        highlightEls: highlightEls,
        portName: portName,
        startPos: pos,
        overlay: $("<div></div>").appendTo(this.$el).css({
          "position": "absolute",
          "left": "0",
          "top": "0",
          "bottom": "0",
          "right": "0"
        })
      });
      return false;
    };
    CanvasViewProto.__connect = function(LineClass, comp1, comp2, startItem) {
      var LineItemClass, c, self;
      self = this;
      LineItemClass = CanvasElement.getClassByType(LineClass.prototype.type);
      c = LineItemClass.connect(LineClass, comp1, comp2);
      if (c && c.id) {
        _.defer(function() {
          return self.selectItem(c.id);
        });
      }
      this.__connectInitItem = startItem;
    };
    CanvasViewProto.__popLineInitiator = function() {
      var i;
      i = this.__connectInitItem;
      this.__connectInitItem = null;
      return i;
    };
    CanvasViewProto.__drawLineDown = function(evt) {
      var $port, $tgt, item, scrollContent;
      if (evt.which !== 1) {
        return false;
      }
      $port = $(evt.currentTarget);
      $tgt = $port.closest(".canvasel");
      item = this.getItem($tgt.attr("data-id"));
      if (!item) {
        return false;
      }
      scrollContent = this.$el.children(":first-child")[0];
      $(document).on({
        "mousemove.drawline": detectDrag,
        "mousedown.drawline": cancelConnect,
        "mouseup.drawline": cancelConnect,
        "urlroute.drawline": cancelConnect
      }, {
        context: this,
        canvasScale: this.__scale,
        source: $port,
        startItem: item,
        scrollContent: scrollContent,
        pageX: evt.pageX,
        pageY: evt.pageY,
        startX: evt.pageX + scrollContent.scrollLeft,
        startY: evt.pageY + scrollContent.scrollTop
      });
      return false;
    };
    __drawLineMove = function(evt) {
      var data, newX, newY;
      data = evt.data;
      data.pageX = evt.pageX;
      data.pageY = evt.pageY;
      data.context.__scrollOnDrag(data);
      newX = data.startPos.x + (data.pageX + data.scrollContent.scrollLeft - data.startX) * data.canvasScale;
      newY = data.startPos.y + (data.pageY + data.scrollContent.scrollTop - data.startY) * data.canvasScale;
      data.lineSvg.plot(data.startPos.x, data.startPos.y, newX, newY);
      return false;
    };
    __drawLineUp = function(evt) {
      var C, comp1, comp2, coord, data, fixed, item, modal, offset, res, self, toPort;
      data = evt.data;
      offset = $(data.scrollContent).offset();
      coord = data.context.__localToCanvasCoor(data.pageX - offset.left, data.pageY - offset.top);
      item = data.context.__itemAtPos(coord);
      if (item) {
        fixed = data.context.fixConnection(coord, data.startItem, item);
        if (fixed) {
          toPort = fixed.toPort;
          item = fixed.target;
        }
      }
      if (!toPort && item) {
        toPort = item.$el.find(".connectable").attr("data-name");
      }
      cancelConnect(evt);
      if (!item || !toPort || item === data.startItem) {
        return false;
      }
      C = Design.modelClassForPorts(data.portName, toPort);
      console.assert(C, "Cannot found Class for type: " + data.portName + ">" + toPort);
      comp1 = data.startItem.model;
      comp2 = item.model;
      res = C.isConnectable(comp1, comp2);
      if (res === false) {
        return;
      }
      if (_.isString(res)) {
        notification("error", res);
        return false;
      }
      if (res === true) {
        data.context.__connect(C, comp1, comp2, data.startItem);
        return false;
      }
      if (res.confirm) {
        self = this;
        modal = new Modal({
          title: res.title,
          width: "420",
          template: res.template,
          confirm: {
            text: res.action,
            color: "blue"
          },
          onConfirm: function() {
            modal.close();
            data.context.__connect(C, comp1, comp2, data.startItem);
          }
        });
      }
      return false;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/coreeditor/CanvasViewDnd',["CanvasView", "CanvasElement", "CanvasManager", "constant", "i18n!/nls/lang.js"], function(CanvasView, CanvasElement, CanvasManager, constant, lang) {
    var CanvasViewProto, ________visualizeBestfit, ________visualizeOnMove, __cancelCanvasDrag, __canvasDrag, __expandRect, __findFits, __isContain, __isOverlap, __isRectEmpty, __moveItemCancel, __moveItemDidDrop, __moveItemDrag, __moveItemDrop, __moveItemStart, __moveStickyItemDrag, __moveStickyItemDrop, __moveStickyItemStart, __parentBorderLimit, __rectHeight, __rectWidth;
    ________visualizeOnMove = function() {};
    ________visualizeBestfit = function() {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 env:dev:end */
    CanvasViewProto = CanvasView.prototype;
    CanvasViewProto.__addItemDragOver = function(evt, data) {
      var ItemClass, group, parentType;
      this.__scrollOnDrag(data);
      group = this.__groupAtCoor(this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1));
      if (group) {
        ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
        parentType = ItemClass.prototype.parentType;
        if (!parentType || parentType.indexOf(group.type) === -1) {
          group = null;
        }
      }
      if (group !== this.__dragHoverGroup) {
        if (this.__dragHoverGroup) {
          CanvasManager.removeClass(this.__dragHoverGroup.$el, "droppable");
        }
        if (group) {
          CanvasManager.addClass(group.$el, "droppable");
        }
        this.__dragHoverGroup = group;
        data.shadow.toggleClass("autoparent", !!(group && !ItemClass.isDirectParentType(group.type)));
      }
      ________visualizeOnMove.call(this, data);
    };
    CanvasViewProto.__addItemDragLeave = function() {
      this.__clearDragScroll();
      if (this.__dragHoverGroup) {
        CanvasManager.removeClass(this.__dragHoverGroup.$el, "droppable");
        this.__dragHoverGroup = null;
      }
    };
    CanvasViewProto.__handleDropData = function(data, excludeChild, parentMustBeDirect) {
      var ItemClass, ItemClassProto, dropPos, dropRect, group, groupType;
      if (!data.zoneDimension) {
        return "";
      }
      ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
      ItemClassProto = ItemClass.prototype;
      group = this.__groupAtCoor(this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1), excludeChild);
      groupType = group ? group.type : "SVG";
      if ((parentMustBeDirect && !ItemClass.isDirectParentType(groupType)) || (ItemClassProto.parentType || []).indexOf(groupType) === -1) {
        return this.errorMessageForDrop(ItemClassProto.type) || "";
      }
      dropPos = this.__localToCanvasCoor(data.pageX - data.offsetX - data.zoneDimension.x1, data.pageY - data.offsetY - data.zoneDimension.y1);
      dropRect = {
        x1: dropPos.x,
        y1: dropPos.y,
        x2: dropPos.x + data.itemWidth,
        y2: dropPos.y + data.itemHeight
      };
      if (group && !ItemClass.isDirectParentType(group.type)) {
        dropRect.x1 -= 2;
        dropRect.y1 -= 2;
        dropRect.x2 += 2;
        dropRect.y2 += 2;
      }
      if (!ItemClassProto.sticky) {
        dropRect = this.__bestFitRect(dropRect, group, excludeChild);
        if (!dropRect) {
          return lang.CANVAS.WARN_NO_ENOUGH_SPACE;
        }
      }
      return {
        group: group,
        dropRect: dropRect
      };
    };
    CanvasViewProto.__addItemDrop = function(evt, data) {
      var ItemClass, ItemClassProto, attributes, model, result, self;
      ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
      ItemClassProto = ItemClass.prototype;
      data.itemWidth = ItemClassProto.defaultSize[0];
      data.itemHeight = ItemClassProto.defaultSize[1];
      result = this.__handleDropData(data);
      if (_.isString(result)) {
        notification('warning', result, false);
        return;
      }
      attributes = $.extend({
        x: result.dropRect.x1,
        y: result.dropRect.y1,
        width: ItemClassProto.defaultSize[0],
        height: ItemClassProto.defaultSize[1]
      }, data.dataTransfer);
      if (Design.modelClassForType(attributes.type).prototype.node_group) {
        attributes.x += 1;
        attributes.y += 1;
        attributes.width -= 2;
        attributes.height -= 2;
      }
      delete attributes.type;
      if (result.group) {
        attributes.parent = result.group.model;
      }
      model = ItemClass.createResource(ItemClassProto.type, attributes, {
        createByUser: true
      });
      if (model && model.id) {
        self = this;
        _.defer(function() {
          return self.selectItem(model.id);
        });
      }
    };
    __parentBorderLimit = function(rect, parentRect) {
      var r;
      r = $.extend({}, rect);
      if (rect.x1 <= parentRect.x1) {
        r.x2 -= rect.x1 - parentRect.x1 - 1;
        r.x1 = parentRect.x1 + 1;
      } else if (rect.x2 >= parentRect.x2) {
        r.x1 += parentRect.x2 - 1 - rect.x2;
        r.x2 = parentRect.x2 - 1;
      }
      if (rect.y1 <= parentRect.y1) {
        r.y2 -= rect.y1 - parentRect.y1 - 1;
        r.y1 = parentRect.y1 + 1;
      } else if (rect.y2 >= parentRect.y2) {
        r.y1 += parentRect.y2 - 1 - rect.y2;
        r.y2 = parentRect.y2 - 1;
      }
      return r;
    };
    __isOverlap = function(rect1, rect2) {
      return !(rect1.x1 >= rect2.x2 || rect1.x2 <= rect2.x1 || rect1.y1 >= rect2.y2 || rect1.y2 <= rect2.y1);
    };
    __isRectEmpty = function(rect, testArray) {
      var a, _i, _len;
      for (_i = 0, _len = testArray.length; _i < _len; _i++) {
        a = testArray[_i];
        if (!(rect.x1 >= a.x2 || rect.x2 <= a.x1 || rect.y1 >= a.y2 || rect.y2 <= a.y1)) {
          return false;
        }
      }
      return true;
    };
    __isContain = function(subRect, parentRect) {
      return parentRect.x1 <= subRect.x1 && parentRect.y1 <= subRect.y1 && parentRect.x2 >= subRect.x2 && parentRect.y2 >= subRect.y2;
    };
    __rectWidth = function(rect) {
      return rect.x2 - rect.x1;
    };
    __rectHeight = function(rect) {
      return rect.y2 - rect.y1;
    };
    __expandRect = function(rect, dx, dy) {
      rect.x1 -= dx;
      rect.x2 += dx;
      rect.y1 -= dy;
      rect.y2 += dy;
      return rect;
    };
    __findFits = function(rect, height, alignEdges, colliders) {
      var fits, yyy, _i, _j, _len, _len1, _ref, _ref1;
      fits = [];
      _ref = alignEdges.y1;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        yyy = _ref[_i];
        rect.y1 = yyy;
        rect.y2 = yyy + height;
        if (__isRectEmpty(rect, colliders)) {
          fits.push($.extend({}, rect));
        }
      }
      _ref1 = alignEdges.y2;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        yyy = _ref1[_j];
        rect.y2 = yyy;
        rect.y1 = yyy - height;
        if (__isRectEmpty(rect, colliders)) {
          fits.push($.extend({}, rect));
        }
      }
      return fits;
    };
    CanvasViewProto.__bestFitRect = function(rect, group, item) {
      var alignEdges, bb, bestFit, ch, children, colliders, dis, farColliders, fit, fits, halfH, halfW, height, idx, minDis, minDistance, orignalRect, ox, oy, parentRect, rectMethod, width, x1, x2, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;
      if (group) {
        children = group.children();
        parentRect = group.rect();
      } else {
        children = this.__itemTopLevel.slice(0);
        parentRect = this.canvasRect();
      }
      idx = children.indexOf(item);
      if (idx >= 0) {
        children.splice(idx, 1);
      }
      rectMethod = "rect";
      if (item) {
        if (item.isGroup()) {
          rect.x1 -= 1;
          rect.y1 -= 1;
          rect.x2 += 1;
          rect.y2 += 1;
        } else {
          rectMethod = "effectiveRect";
        }
      }
      width = __rectWidth(rect);
      height = __rectHeight(rect);
      halfW = Math.round(width / 2);
      halfH = Math.round(height / 2);
      if (halfW > 12) {
        halfW = 12;
      }
      if (halfH > 12) {
        halfH = 12;
      }
      orignalRect = __parentBorderLimit(rect, parentRect);
      rect = __parentBorderLimit(__expandRect(rect, halfW, halfH), parentRect);
      colliders = [];
      farColliders = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        bb = ch[rectMethod]();
        if (__isOverlap(bb, orignalRect)) {
          colliders.push(bb);
        } else if (__isOverlap(bb, rect)) {
          farColliders.push(bb);
        }
      }
      if (!colliders.length) {
        if (__isContain(orignalRect, parentRect)) {
          bestFit = orignalRect;
        }
      } else {
        colliders = colliders.concat(farColliders);
        alignEdges = {
          x1: [orignalRect.x1],
          x2: [orignalRect.x2],
          y1: [orignalRect.y1],
          y2: [orignalRect.y2]
        };
        for (_j = 0, _len1 = colliders.length; _j < _len1; _j++) {
          ch = colliders[_j];
          if (ch.x1 - width >= rect.x1) {
            alignEdges.x2.push(ch.x1);
          }
          if (ch.y1 - height >= rect.y1) {
            alignEdges.y2.push(ch.y1);
          }
          if (ch.x2 + width <= rect.x2) {
            alignEdges.x1.push(ch.x2);
          }
          if (ch.y2 + height <= rect.y2) {
            alignEdges.y1.push(ch.y2);
          }
        }
        fits = [];
        ox = orignalRect.x1;
        oy = orignalRect.y1;
        _ref = alignEdges.x1;
        for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
          x1 = _ref[_k];
          orignalRect.x1 = x1;
          orignalRect.x2 = x1 + width;
          fits = fits.concat(__findFits(orignalRect, height, alignEdges, colliders));
        }
        _ref1 = alignEdges.x2;
        for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
          x2 = _ref1[_l];
          orignalRect.x2 = x2;
          orignalRect.x1 = x2 - width;
          fits = fits.concat(__findFits(orignalRect, height, alignEdges, colliders));
        }
        minDistance = 0;
        for (_m = 0, _len4 = fits.length; _m < _len4; _m++) {
          fit = fits[_m];
          if (!__isContain(fit, parentRect)) {
            continue;
          }
          dis = Math.pow(fit.x1 - ox, 2) + Math.pow(fit.y1 - oy, 2);
          if (!bestFit || minDis > dis) {
            bestFit = fit;
            minDis = dis;
          }
        }
      }
      ________visualizeBestfit.call(this, bestFit, fits, colliders, alignEdges, rect);
      return bestFit;
    };
    CanvasViewProto.__moveItemMouseDown = function(evt) {
      if (evt.metaKey || evt.ctrlKey) {
        this.__dragCanvasMouseDown(evt);
      } else if (!this.isReadOnly()) {
        this.dragItem(evt, {
          onDrop: __moveItemDidDrop,
          altState: true
        });
      }
      return false;
    };
    CanvasViewProto.dragItem = function(evt, options) {
      var $dom, $tgt, canvasOffset, item;
      console.assert(options.onDrop, "Drop handler is not specified.");
      if (evt.which !== 1) {
        return false;
      }

      /*
       options = {
          altState : false
          onDrop   : ()->
       }
       */
      $tgt = $(evt.currentTarget).closest(".canvasel");
      if (CanvasManager.hasClass($tgt, "fixed")) {
        return;
      }
      item = this.getItem($tgt.attr("data-id"));
      if (!item) {
        return;
      }
      canvasOffset = this.$el.offset();
      options = $.extend(options, {
        dropTargets: $("#OpsEditor .OEPanelCenter"),
        dataTransfer: {
          type: item.type
        },
        item: item,
        targetSvg: $tgt[0].instance,
        context: this,
        eventPrefix: "moveItem_",
        noShadow: true,
        lockToCenter: false,
        canvasX: canvasOffset.left,
        canvasY: canvasOffset.top,
        onDragStart: __moveItemStart,
        onDrag: __moveItemDrag,
        onDragEnd: __moveItemDrop,
        onDragCancel: __moveItemCancel,
        includeSource: function(evt) {
          return evt.data.altState && !!evt.altKey;
        }
      });
      if (!item.isClonable()) {
        options.altState = false;
      }
      if (item.sticky) {
        options.onDragStart = __moveStickyItemStart;
        options.onDrag = __moveStickyItemDrag;
        options.onDragEnd = __moveStickyItemDrop;
      }
      if (item.isGroup()) {
        $dom = $tgt.children(".group");
      }
      if (!$dom || !$dom.length) {
        $dom = $tgt;
      }
      $dom.dnd(evt, options);
      return false;
    };
    __moveItemStart = function(data) {
      var size, svg, targetSvg;
      svg = data.context.svg;
      targetSvg = data.targetSvg.attr("id", "svgDragTarget");
      data.cloneSvg = svg.group().add(svg.use("svgDragTarget", true).move(-targetSvg.x(), -targetSvg.y())).classes("shadow").move(targetSvg.x(), targetSvg.y());
      if (data.altState) {
        size = data.item.size();
        data.cloneSvg.add(svg.use("clone_indicator").move(size.width * CanvasView.GRID_WIDTH - 12, size.height * CanvasView.GRID_HEIGHT - 12).classes("indicator").hide());
      }
    };
    __moveItemDrag = function(evt) {
      var ItemClass, ctx, data, group, mousePos, parentType;
      data = evt.data;
      if (!data.zoneDimension) {
        return;
      }
      ctx = data.context;
      ctx.__scrollOnDrag(data);
      group = ctx.__groupAtCoor(ctx.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1), data.item);
      if (group) {
        ItemClass = CanvasElement.getClassByType(data.dataTransfer.type);
        parentType = ItemClass.prototype.parentType;
        if (!parentType || parentType.indexOf(group.type) === -1 || !ItemClass.isDirectParentType(group.type)) {
          group = null;
        }
      }
      if (group !== ctx.__dragHoverGroup) {
        if (ctx.__dragHoverGroup) {
          CanvasManager.removeClass(ctx.__dragHoverGroup.$el, "droppable");
        }
        if (group) {
          CanvasManager.addClass(group.$el, "droppable");
        }
        ctx.__dragHoverGroup = group;
      }
      mousePos = data.context.__localToCanvasCoor(data.pageX - data.canvasX - data.offsetX, data.pageY - data.canvasY - data.offsetY);
      data.cloneSvg.move(mousePos.x * CanvasView.GRID_WIDTH, mousePos.y * CanvasView.GRID_HEIGHT);
      if (data.altState) {
        data.cloneSvg.get(1)[evt.altKey ? "show" : "hide"]();
      }
      ________visualizeOnMove.call(ctx, data, data.item);
    };
    __moveItemDrop = function(evt) {
      var data, ignore, result, size;
      data = evt.data;
      __moveItemCancel(evt);
      size = data.item.size();
      data.itemWidth = size.width;
      data.itemHeight = size.height;
      if ((_.isFunction(data.includeSource) && data.includeSource(evt)) || data.includeSource === true) {
        ignore = null;
      } else {
        ignore = data.item;
      }
      result = data.context.__handleDropData(data, ignore, true);
      if (_.isString(result)) {
        if (result === lang.CANVAS.WARN_NO_ENOUGH_SPACE) {
          notification("warning", result);
        }
        return;
      }
      data.dataTransfer.item = data.item;
      data.dataTransfer.parent = result.group;
      data.dataTransfer.x = result.dropRect.x1;
      data.dataTransfer.y = result.dropRect.y1;
      if (data.item.isGroup()) {
        data.dataTransfer.x += 1;
        data.dataTransfer.y += 1;
      }
      data.onDrop(evt, data.dataTransfer);
    };
    __moveItemDidDrop = function(evt, dataTransfer) {
      var m;
      if (dataTransfer.item.isClonable() && evt.altKey) {
        m = "cloneTo";
      } else {
        m = "changeParent";
      }
      dataTransfer.item[m](dataTransfer.parent, dataTransfer.x, dataTransfer.y);
    };
    __moveItemCancel = function(evt) {
      var data;
      data = evt.data;
      data.context.__addItemDragLeave();
      data.targetSvg.attr("id", "");
      if (data.cloneSvg) {
        data.cloneSvg.remove();
      }
    };
    __moveStickyItemStart = function(evt) {};
    __moveStickyItemDrag = function(evt) {
      var ctx, data, mousePos;
      data = evt.data;
      if (!data.zoneDimension) {
        return;
      }
      ctx = data.context;
      ctx.__scrollOnDrag(data);
      mousePos = data.context.__localToCanvasCoor(data.pageX - data.canvasX - data.offsetX, data.pageY - data.canvasY - data.offsetY);
      data.item.ensureStickyPos(mousePos.x, mousePos.y);
    };
    __moveStickyItemDrop = function(evt) {
      return evt.data.context.__clearDragScroll();
    };
    CanvasViewProto.__dragCanvasMouseDown = function(evt) {
      var scrollContent;
      if (!(evt.ctrlKey || evt.metaKey) || evt.which !== 1) {
        return false;
      }
      scrollContent = this.$el.children(":first-child")[0];
      $(document).on({
        "mousemove.dragcanvas": __canvasDrag,
        "mousedown.dragcanvas": __cancelCanvasDrag,
        "mouseup.dragcanvas": __cancelCanvasDrag,
        "urlroute.dragcanvas": __cancelCanvasDrag
      }, {
        context: this,
        startX: evt.pageX,
        startY: evt.pageY,
        scrollLeft: scrollContent.scrollLeft,
        scrollTop: scrollContent.scrollTop,
        overlay: $("<div id='overlayer' class='grabbing'></div>").appendTo("body")
      });
      return false;
    };
    __canvasDrag = function(evt) {
      var data;
      data = evt.data;
      data.context.$el.nanoScroller({
        "scrollLeft": data.scrollLeft - evt.pageX + data.startX
      });
      data.context.$el.nanoScroller({
        "scrollTop": data.scrollTop - evt.pageY + data.startY
      });
      return false;
    };
    __cancelCanvasDrag = function(evt) {
      $(document).off(".dragcanvas");
      evt.data.overlay.remove();
      return false;
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/coreeditor/CanvasViewGResizer',["CanvasView"], function(CanvasView) {
    var CanvasViewProto, ________visualizeResize, __childrenBound, __max, __min, __resizeMove, __resizeUp, __updateGroupEl, __updateRange;
    ________visualizeResize = function() {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  env:dev:end */
    CanvasViewProto = CanvasView.prototype;
    CanvasViewProto.__resizeGroupDown = function(evt) {
      var $group, $resizer, data, direction, dirt, item, left, parent, target, top, _i, _len;
      $resizer = $(evt.currentTarget);
      $group = $resizer.closest("g");
      item = this.getItem($group.attr("data-id"));
      direction = $resizer.attr("class").replace("group-resizer ", "").split("-");
      target = item.rect();
      parent = item.parent().rect();
      if (!item.isTopLevel()) {
        parent.x1 += 1;
        parent.y1 += 1;
        parent.x2 -= 1;
        parent.y2 -= 1;
      }
      left = direction.indexOf("left") >= 0;
      top = direction.indexOf("top") >= 0;
      data = {
        pageX: evt.pageX,
        pageY: evt.pageY,
        direction: direction,
        context: this,
        item: item,
        $resizer: $resizer,
        $svgel: $group,
        sideX: left ? "x1" : "x2",
        sideY: top ? "y1" : "y2",
        move: left || top,
        originalBound: $.extend({}, target),
        innerBound: __childrenBound(item, target),
        target: target,
        parent: parent,
        siblings: item.siblings().map(function(si) {
          return si.rect();
        }),
        overlay: $("<div></div>").appendTo(this.$el).css({
          "position": "absolute",
          "left": "0",
          "top": "0",
          "bottom": "0",
          "right": "0",
          "cursor": $resizer.css("cursor")
        })
      };
      for (_i = 0, _len = direction.length; _i < _len; _i++) {
        dirt = direction[_i];
        __updateRange(dirt, data);
      }
      $(document).on({
        'mousemove.resizegroup': __resizeMove,
        'mouseup.resizegroup': __resizeUp
      }, data);
      ________visualizeResize(data);
      return false;
    };
    __updateRange = function(direction, data) {
      var blocks, down, key, left, range, right, sibling, target, top, _i, _j, _len, _len1, _ref, _ref1;
      target = data.target;
      left = direction === "left";
      right = direction === "right";
      top = direction === "top";
      down = direction === "down";
      blocks = [
        {
          x1: data.parent.x2,
          y1: data.parent.y2,
          x2: data.parent.x1,
          y2: data.parent.y1
        }
      ];
      if (left || right) {
        key = "rangeX";
        _ref = data.siblings;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sibling = _ref[_i];
          if (sibling.y1 >= target.y2 || sibling.y2 <= target.y1) {
            continue;
          }
          if (left) {
            if (sibling.x1 > target.x1) {
              continue;
            }
          } else if (sibling.x2 < target.x2) {
            continue;
          }
          blocks.push(sibling);
        }
      } else {
        key = "rangeY";
        _ref1 = data.siblings;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sibling = _ref1[_j];
          if (sibling.x1 >= target.x2 || sibling.x2 <= target.x1) {
            continue;
          }
          if (top) {
            if (sibling.y1 > target.y1) {
              continue;
            }
          } else if (sibling.y2 < target.y2) {
            continue;
          }
          blocks.push(sibling);
        }
      }
      if (left) {
        range = [__max(blocks, "x2") + 1, data.innerBound.x1];
      } else if (right) {
        range = [data.innerBound.x2, __min(blocks, "x1") - 1];
      } else if (top) {
        range = [__max(blocks, "y2") + 1, data.innerBound.y1];
      } else {
        range = [data.innerBound.y2, __min(blocks, "y1") - 1];
      }
      data[key] = range;
    };
    __childrenBound = function(item, bound) {
      var bb, ch, _i, _len, _ref;
      bound = {
        x1: bound.x2 - 10,
        y1: bound.y2 - 10,
        x2: bound.x1 + 10,
        y2: bound.y1 + 10
      };
      _ref = item.children();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        bb = ch.effectiveRect();
        if (bound.x1 > bb.x1) {
          bound.x1 = bb.x1;
        }
        if (bound.y1 > bb.y1) {
          bound.y1 = bb.y1;
        }
        if (bound.x2 < bb.x2) {
          bound.x2 = bb.x2;
        }
        if (bound.y2 < bb.y2) {
          bound.y2 = bb.y2;
        }
      }
      bound.x1 -= 1;
      bound.y1 -= 1;
      bound.x2 += 1;
      bound.y2 += 1;
      return bound;
    };
    __min = function(array, key) {
      var i, min, _i, _len;
      min = array[0][key];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (i[key] < min) {
          min = i[key];
        }
      }
      return min;
    };
    __max = function(array, key) {
      var i, max, _i, _len;
      max = array[0][key];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        i = array[_i];
        if (i[key] > max) {
          max = i[key];
        }
      }
      return max;
    };
    __resizeMove = function(evt) {
      var changed, data, newX, newY, scale;
      data = evt.data;
      scale = data.context.__scale;
      if (data.rangeX) {
        newX = data.originalBound[data.sideX] + Math.round((evt.pageX - data.pageX) * scale / CanvasView.GRID_WIDTH);
        if (newX < data.rangeX[0]) {
          newX = data.rangeX[0];
        } else if (newX > data.rangeX[1]) {
          newX = data.rangeX[1];
        }
        if (newX !== data.target[data.sideX]) {
          data.target[data.sideX] = newX;
          changed = true;
          if (data.rangeY) {
            __updateRange(data.direction[0], data);
            ________visualizeResize(data);
          }
        }
      }
      if (data.rangeY) {
        newY = data.originalBound[data.sideY] + Math.round((evt.pageY - data.pageY) * scale / CanvasView.GRID_HEIGHT);
        if (newY < data.rangeY[0]) {
          newY = data.rangeY[0];
        } else if (newY > data.rangeY[1]) {
          newY = data.rangeY[1];
        }
        if (newY !== data.target[data.sideY]) {
          data.target[data.sideY] = newY;
          changed = true;
          if (data.rangeX) {
            __updateRange(data.direction[1], data);
            ________visualizeResize(data);
          }
        }
      }
      if (changed) {
        __updateGroupEl(data);
      }
      return false;
    };
    __updateGroupEl = function(data) {
      var height, width, x, y;
      if (data.move) {
        x = data.target.x1;
        y = data.target.y1;
      }
      width = data.target.x2 - data.target.x1;
      height = data.target.y2 - data.target.y1;
      data.item.applyGeometry(x, y, width, height);
    };
    __resizeUp = function(evt) {
      var data;
      data = evt.data;
      data.overlay.remove();
      $(document).off(".resizegroup");
      return false;
    };
  });

}).call(this);

(function() {
  define('workspaces/coreeditor/CanvasViewEffect',["CanvasView", "CanvasElement", "CanvasManager", "constant", "i18n!/nls/lang.js"], function(CanvasView, CanvasElement, CanvasManager, constant, lang) {
    var CanvasViewProto, getElbowPathFromPoints, getNonOverlapRects, getPathFromPolygons, getPolygonsFromRect, trackMMoveForHint, xThenY, yThenX, __isOverlap;
    CanvasViewProto = CanvasView.prototype;
    xThenY = function(a, b) {
      if (a[0] < b[0]) {
        return -1;
      }
      if (a[0] > b[0]) {
        return 1;
      }
      return a[1] - b[1];
    };
    yThenX = function(a, b) {
      if (a[1] < b[1]) {
        return -1;
      }
      if (a[1] > b[1]) {
        return 1;
      }
      return a[0] - b[0];
    };
    getPolygonsFromRect = function(rects) {
      var currentCoor, currentDir, e1, e2, firstPt, hEdges, hEdgesKeys, he, i, idx, k, p, p1, p2, plen, points, pt, r, result, results, uniquePoints, vEdges, _i, _j, _k, _len, _len1, _len2, _ref;
      points = [];
      uniquePoints = {};
      for (_i = 0, _len = rects.length; _i < _len; _i++) {
        r = rects[_i];
        _ref = ["" + r.x1 + "," + r.y1, "" + r.x2 + "," + r.y1, "" + r.x1 + "," + r.y2, "" + r.x2 + "," + r.y2];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          p = _ref[_j];
          if (uniquePoints[p]) {
            delete uniquePoints[p];
          } else {
            uniquePoints[p] = p;
          }
        }
      }
      for (k in uniquePoints) {
        p = uniquePoints[k];
        p = p.split(",");
        points.push([parseInt(p[0], 10) * 10, parseInt(p[1], 10) * 10]);
      }
      vEdges = {};
      hEdges = {};
      plen = points.length;
      points.sort(xThenY);
      i = 0;
      while (i < plen) {
        currentCoor = points[i][0];
        while (i < plen && points[i][0] === currentCoor) {
          p1 = points[i];
          p2 = points[i + 1];
          e1 = "" + p1[0] + "," + p1[1];
          e2 = "" + p2[0] + "," + p2[1];
          vEdges[e1] = e2;
          vEdges[e2] = e1;
          i += 2;
        }
      }
      points.sort(yThenX);
      i = 0;
      while (i < plen) {
        currentCoor = points[i][1];
        while (i < plen && points[i][1] === currentCoor) {
          p1 = points[i];
          p2 = points[i + 1];
          e1 = "" + p1[0] + "," + p1[1];
          e2 = "" + p2[0] + "," + p2[1];
          hEdges[e1] = e2;
          hEdges[e2] = e1;
          i += 2;
        }
      }
      results = [];
      hEdgesKeys = _.keys(hEdges);
      while (hEdgesKeys.length > 0) {
        he = hEdgesKeys[0];
        firstPt = pt = hEdges[he];
        hEdgesKeys.splice(hEdgesKeys.indexOf(pt), 1);
        result = [pt];
        currentDir = 0;
        while (true) {
          if (currentDir === 0) {
            currentDir = 1;
            pt = vEdges[pt];
          } else {
            currentDir = 0;
            hEdgesKeys.splice(hEdgesKeys.indexOf(pt), 1);
            pt = hEdges[pt];
            hEdgesKeys.splice(hEdgesKeys.indexOf(pt), 1);
          }
          result.push(pt);
          if (pt === firstPt) {
            break;
          }
        }
        for (idx = _k = 0, _len2 = result.length; _k < _len2; idx = ++_k) {
          pt = result[idx];
          pt = pt.split(",");
          pt[0] = parseInt(pt[0], 10);
          pt[1] = parseInt(pt[1], 10);
          result[idx] = pt;
        }
        results.push(result);
      }
      return results;
    };
    getPathFromPolygons = function(polygons) {
      var command, i, j, lastPt, nextPt, p, path, r, x, y, _i, _j, _len, _len1;
      for (i = _i = 0, _len = polygons.length; _i < _len; i = ++_i) {
        r = polygons[i];
        path = "";
        for (j = _j = 0, _len1 = r.length; _j < _len1; j = ++_j) {
          p = r[j];
          if (j === 0) {
            command = "M";
            lastPt = r[r.length - 2];
          } else {
            command = "L";
            lastPt = r[j - 1];
          }
          nextPt = r[j + 1];
          if (lastPt && nextPt) {
            x = 0;
            y = 0;
            if (lastPt[1] === p[1] && nextPt[0] === p[0]) {
              x = p[0] + (lastPt[0] > p[0] ? 5 : -5);
              y = p[1] + (nextPt[1] > p[1] ? 5 : -5);
              path += "" + command + x + " " + p[1] + " Q" + p[0] + " " + p[1] + " " + p[0] + " " + y;
              continue;
            } else if (lastPt[0] === p[0] && nextPt[1] === p[1]) {
              x = p[0] + (nextPt[0] > p[0] ? 5 : -5);
              y = p[1] + (lastPt[1] > p[1] ? 5 : -5);
              path += "" + command + p[0] + " " + y + " Q" + p[0] + " " + p[1] + " " + x + " " + p[1];
              continue;
            }
          }
        }
        polygons[i] = path + "Z";
      }
      return polygons.join("");
    };
    getElbowPathFromPoints = function(newPoints) {
      var idx, lastPt, nextPt, p, path, x, y, _i, _len;
      path = "";
      for (idx = _i = 0, _len = newPoints.length; _i < _len; idx = ++_i) {
        p = newPoints[idx];
        if (idx === 0) {
          path = "M" + p.x + " " + p.y;
          continue;
        }
        lastPt = newPoints[idx - 1];
        nextPt = newPoints[idx + 1];
        if (lastPt && nextPt) {
          x = 0;
          y = 0;
          if (lastPt.y === p.y && nextPt.x === p.x) {
            x = p.x + (lastPt.x > p.x ? 5 : -5);
            y = p.y + (nextPt.y > p.y ? 5 : -5);
            path += "L" + x + " " + p.y + " Q" + p.x + " " + p.y + " " + p.x + " " + y;
            continue;
          } else if (lastPt.x === p.x && nextPt.y === p.y) {
            x = p.x + (nextPt.x > p.x ? 5 : -5);
            y = p.y + (lastPt.y > p.y ? 5 : -5);
            path += "L" + p.x + " " + y + " Q" + p.x + " " + p.y + " " + x + " " + p.y;
            continue;
          }
        }
        path += "L" + p.x + " " + p.y;
      }
      return path;
    };
    __isOverlap = function(rect1, rect2) {
      return !(rect1.x1 >= rect2.x2 || rect1.x2 <= rect2.x1 || rect1.y1 >= rect2.y2 || rect1.y2 <= rect2.y1);
    };
    getNonOverlapRects = function(items) {
      var cleanRects, currentRect, groupRects, i, it, j, otherRect, overlap, rects, _i, _j, _len, _len1;
      rects = [];
      groupRects = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        it = items[_i];
        if (it.isGroup()) {
          groupRects.push(it.effectiveRect());
        } else {
          rects.push(it.rect());
        }
      }
      if (!groupRects.length) {
        return rects;
      }
      i = 1;
      cleanRects = [groupRects[0]];
      while (i < groupRects.length) {
        j = i;
        currentRect = groupRects[i];
        overlap = false;
        for (_j = 0, _len1 = cleanRects.length; _j < _len1; _j++) {
          otherRect = cleanRects[_j];
          if (!__isOverlap(currentRect, otherRect)) {
            continue;
          }
          if (currentRect.y1 <= otherRect.y1 && otherRect.y2 <= currentRect.y2) {
            groupRects.push({
              x1: currentRect.x1,
              x2: currentRect.x2,
              y1: currentRect.y1,
              y2: otherRect.y1
            });
            groupRects.push({
              x1: currentRect.x1,
              x2: currentRect.x2,
              y1: currentRect.y2,
              y2: otherRect.y2
            });
            if (currentRect.x1 <= otherRect.x1) {
              groupRects.push({
                x1: currentRect.x1,
                x2: otherRect.x1,
                y1: otherRect.y1,
                y2: otherRect.y2
              });
            } else {
              groupRects.push({
                x1: otherRect.x2,
                x2: currentRect.x2,
                y1: otherRect.y1,
                y2: otherRect.y2
              });
            }
          } else if (currentRect.x1 <= otherRect.x1 && otherRect.x2 <= currentRect.x2) {
            groupRects.push({
              x1: currentRect.x1,
              x2: otherRect.x1,
              y1: currentRect.y1,
              y2: currentRect.y2
            });
            groupRects.push({
              x1: otherRect.x2,
              x2: currentRect.x2,
              y1: currentRect.y1,
              y2: currentRect.y2
            });
            if (currentRect.y1 <= otherRect.y1) {
              groupRects.push({
                x1: otherRect.x1,
                x2: otherRect.x2,
                y1: currentRect.y1,
                y2: otherRect.y1
              });
            } else {
              groupRects.push({
                x1: otherRect.x1,
                x2: otherRect.x2,
                y1: otherRect.y2,
                y2: currentRect.y2
              });
            }
          } else if (otherRect.y1 <= currentRect.y1 && currentRect.y2 <= otherRect.y2) {
            if (currentRect.x1 <= otherRect.x1) {
              groupRects.push({
                x1: currentRect.x1,
                x2: otherRect.x1,
                y1: currentRect.y1,
                y2: currentRect.y2
              });
            } else {
              groupRects.push({
                x1: otherRect.x2,
                x2: currentRect.x2,
                y1: currentRect.y1,
                y2: currentRect.y2
              });
            }
          } else if (otherRect.x1 <= currentRect.x1 && currentRect.x2 <= otherRect.x2) {
            if (currentRect.y1 <= otherRect.y1) {
              groupRects.push({
                x1: currentRect.x1,
                x2: currentRect.x2,
                y1: currentRect.y1,
                y2: otherRect.y1
              });
            } else {
              groupRects.push({
                x1: currentRect.x1,
                x2: currentRect.x2,
                y1: otherRect.y2,
                y2: currentRect.y2
              });
            }
          } else if (currentRect.y1 <= otherRect.y1) {
            groupRects.push({
              x1: currentRect.x1,
              x2: currentRect.x2,
              y1: currentRect.y1,
              y2: otherRect.y1
            });
            if (currentRect.x1 <= otherRect.x1) {
              groupRects.push({
                x1: currentRect.x1,
                x2: otherRect.x1,
                y1: otherRect.y1,
                y2: currentRect.y2
              });
            } else {
              groupRects.push({
                x1: otherRect.x2,
                x2: currentRect.x2,
                y1: otherRect.y1,
                y2: currentRect.y2
              });
            }
          } else {
            groupRects.push({
              x1: currentRect.x1,
              x2: currentRect.x2,
              y1: otherRect.y2,
              y2: currentRect.y2
            });
            if (currentRect.x1 <= otherRect.x1) {
              groupRects.push({
                x1: currentRect.x1,
                x2: otherRect.x1,
                y1: currentRect.y1,
                y2: otherRect.y2
              });
            } else {
              groupRects.push({
                x1: otherRect.x2,
                x2: currentRect.x2,
                y1: currentRect.y1,
                y2: otherRect.y2
              });
            }
          }
          overlap = true;
          break;
        }
        if (!overlap) {
          cleanRects.push(currentRect);
        }
        ++i;
      }
      return rects.concat(cleanRects);
    };
    CanvasViewProto.hightLightItems = function(items) {
      var canvasSize, filler, h, path, polygons, rects, w;
      rects = getNonOverlapRects(items);
      polygons = getPolygonsFromRect(rects);
      path = getPathFromPolygons(polygons);
      canvasSize = this.size();
      w = canvasSize[0] * 10;
      h = canvasSize[1] * 10;
      filler = "M0,0L" + w + ",0L" + w + "," + h + "L0," + h + "Z";
      this.__highLightCliper = this.svg.clip().attr("id", "hlClipper").add(this.svg.path(filler + path).attr("clip-rule", "evenodd"));
      this.__highLightRect = this.svg.rect(0, 0).attr({
        id: "hlArea",
        width: "100%",
        height: "100%"
      }).clipWith(this.__highLightCliper);
    };
    CanvasViewProto.removeHightLight = function(items) {
      if (this.__highLightRect) {
        this.__highLightRect.remove();
      }
      if (this.__highLightCliper) {
        this.__highLightCliper.remove();
      }
      this.__highLightRect = this.__highLightCliper = null;
    };
    trackMMoveForHint = function(evt) {
      var $hint, type;
      type = evt.offsetY > evt.data.height ? "top" : "bottom";
      $hint = $(evt.currentTarget).find(".canvas-message");
      if ($hint.attr("data-type") !== type) {
        $hint.attr("data-type", type);
      }
    };
    CanvasViewProto.showHintMessage = function(message) {
      var height;
      height = this.$el.find(".canvas-message").html(message).outerHeight() + 20;
      this.$el.on({
        "mousemove.canvashint": trackMMoveForHint
      }, {
        height: height
      });
    };
    CanvasViewProto.hideHintMessage = function() {
      this.$el.find(".canvas-message").empty();
      this.$el.off("mousemove.canvashint");
    };
  });

}).call(this);


/*
  This file is used to include all the core functionality of the editor
 */


/*
  OpsEditor is a workspace for working on an OpsModel
  This class is implemented as a class cluster. Actually implementation is seperated in
  other concrete class :

  ProgressViewer  : For starting app.
 */

(function() {
  define('OpsEditor',["ProgressViewer", "Design", "ResourceModel", "ComplexResModel", "ConnectionModel", "GroupModel", "CoreEditor", "CoreEditorView", "CanvasManager", "CanvasView", "CanvasElement", "CanvasPopup", "CanvasViewLayout", "workspaces/coreeditor/CeSvg", "workspaces/coreeditor/CanvasViewConnect", "workspaces/coreeditor/CanvasViewDnd", "workspaces/coreeditor/CanvasViewGResizer", "workspaces/coreeditor/CanvasViewEffect", "workspaces/coreeditor/TplOpsEditor", "workspaces/coreeditor/TplSvgDef"], function(ProgressViewer, Design) {

    /* env:dev                                                                    env:dev:end */

    /* env:debug */
    var OpsEditor, registeredEditors;
    require(["workspaces/coreeditor/DesignDebugger"], function() {});

    /* env:debug:end */
    window.Design = Design;
    registeredEditors = [];
    OpsEditor = function(opsmodel) {
      var e, _i, _len;
      if (!opsmodel) {
        throw new Error("Cannot find opsmodel while openning workspace.");
      }
      if (opsmodel.isProcessing()) {
        return new ProgressViewer(opsmodel);
      }
      for (_i = 0, _len = registeredEditors.length; _i < _len; _i++) {
        e = registeredEditors[_i];
        if (e.handler(opsmodel)) {
          return new e.editor(opsmodel);
        }
      }
      return console.error("Cannot find editor to edit OpsModel: ", opsmodel);
    };
    OpsEditor.registerEditors = function(editor, handler) {
      return registeredEditors.push({
        editor: editor,
        handler: handler
      });
    };
    return OpsEditor;
  });

}).call(this);

(function() {
  define('CoreEditorViewApp',["CoreEditorView", "OpsModel", "workspaces/coreeditor/TplOpsEditor", "UI.modalplus", "i18n!/nls/lang.js", "AppAction"], function(StackView, OpsModel, OpsEditorTpl, Modal, lang, AppAction) {
    return StackView.extend({
      initialize: function() {
        StackView.prototype.initialize.apply(this, arguments);
        this.$el.find(".OEPanelLeft").addClass("force-hidden").empty();
        this.toggleProcessing();
        this.updateProgress();
        this.listenTo(this.workspace.design, "change:mode", this.switchMode);
      },
      switchMode: function(mode) {
        this.toolbar.updateTbBtns();
        this.statusbar.update();
        if (mode === "appedit") {
          this.$el.find(".OEPanelLeft").removeClass("force-hidden");
          this.resourcePanel.render();
        } else {
          this.$el.find(".OEPanelLeft").addClass("force-hidden").empty();
        }
        this.propertyPanel.openPanel();
      },
      confirmImport: function() {
        var modal, self;
        self = this;
        modal = new Modal({
          title: lang.TOOLBAR.APP_IMPORTED,
          template: OpsEditorTpl.modal.confirmImport({
            name: this.workspace.opsModel.get("name")
          }),
          confirm: {
            text: "Done"
          },
          disableClose: true,
          hideClose: true,
          onCancel: function() {
            self.workspace.remove();
          },
          onConfirm: function() {
            var $ipt, json;
            $ipt = modal.tpl.find("#ImportSaveAppName");
            $ipt.parsley('custom', function(val) {
              var apps;
              if (!MC.validate('awsName', val)) {
                return lang.PARSLEY.SHOULD_BE_A_VALID_STACK_NAME;
              }
              apps = App.model.appList().where({
                name: val
              });
              if (apps.length === 1 && apps[0] === self.workspace.opsModel || apps.length === 0) {
                return;
              }
              return sprintf(lang.PARSLEY.TYPE_NAME_CONFLICT, 'App', val);
            });
            if (!$ipt.parsley('validate')) {
              return;
            }
            modal.tpl.find(".modal-confirm").attr("disabled", "disabled");
            json = self.workspace.design.serialize();
            json.name = $ipt.val();
            json.usage = $("#app-usage-selectbox").find(".item.selected").attr('data-value') || "testing";
            json.resource_diff = $("#MonitorImportApp").is(":checked");
            return self.workspace.opsModel.saveApp(json).then(function() {
              var design;
              design = self.workspace.design;
              design.set("name", json.name);
              design.set("resource_diff", json.resource_diff);
              design.set("usage", json.usage);
              $("#OEPanelRight").trigger("REFRESH");
              return modal.close();
            }, function(err) {
              notification("error", err.msg);
              modal.tpl.find(".modal-confirm").removeAttr("disabled");
            });
          }
        });
      },
      toggleProcessing: function() {
        var opsModel, text;
        if (!this.$el) {
          return;
        }
        this.toolbar.updateTbBtns();
        this.statusbar.update();
        this.$el.children(".ops-process").remove();
        opsModel = this.workspace.opsModel;
        if (!opsModel.isProcessing()) {
          return;
        }
        switch (opsModel.get("state")) {
          case OpsModel.State.Starting:
            text = lang.IDE.STARTING_YOUR_APP;
            break;
          case OpsModel.State.Stopping:
            text = lang.IDE.STOPPING_YOUR_APP;
            break;
          case OpsModel.State.Terminating:
            text = lang.IDE.TERMINATING_YOUR_APP;
            break;
          case OpsModel.State.Updating:
            text = lang.IDE.APPLYING_CHANGES_TO_YOUR_APP;
            break;
          default:
            console.warn("Unknown opsmodel state when showing loading in AppEditor,", opsModel);
            text = lang.IDE.PROCESSING_YOUR_REQUEST;
        }
        this.__progress = 0;
        this.$el.append(OpsEditorTpl.appProcessing(text));
      },
      updateProgress: function() {
        var $p, pp, pro;
        pp = this.workspace.opsModel.get("progress");
        $p = this.$el.find(".ops-process");
        $p.toggleClass("has-progess", !!pp);
        if (this.__progress > pp) {
          $p.toggleClass("rolling-back", true);
        }
        this.__progress = pp;
        pro = "" + pp + "%";
        $p.find(".process-info").text(pro);
        $p.find(".bar").css({
          width: pro
        });
      },
      showUpdateStatus: function(error, loading) {
        var self;
        this.$el.find(".ops-process").remove();
        self = this;
        $(OpsEditorTpl.appUpdateStatus({
          error: error,
          loading: loading
        })).appendTo(this.$el).find("#processDoneBtn").click(function() {
          return self.$el.find(".ops-process").remove();
        });
      },
      showUnpayUI: function() {
        this.statusbar.remove();
        this.propertyPanel.remove();
        this.toolbar.remove();
        this.canvas.updateSize();
        AppAction.showPayment($("<div class='ops-apppm-wrapper'></div>").appendTo(this.$el)[0]);
        notification("error", "Your account is limited now.");
      },
      listenToPayment: function() {
        var self;
        self = this;
        return this.workspace.listenTo(App.user, "paymentUpdate", function() {
          if (!$(".ops-apppm-wrapper").size()) {
            if (App.user.shouldPay()) {
              return self.showUnpayUI();
            }
          } else {
            if (!App.user.shouldPay()) {
              return self.reopenApp();
            }
          }
        });
      },
      reopenApp: function() {
        var appId, index;
        appId = this.workspace.opsModel.get("id");
        index = this.workspace.index();
        this.workspace.remove();
        return _.defer(function() {
          App.openOps(appId).setIndex(index);
          return notification("info", "User payment status change detected, reloading app resource.");
        });
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('CoreEditorApp',["CoreEditor", "CoreEditorViewApp", "ResDiff", "OpsModel", "Design", "CloudResources", "constant"], function(StackEditor, AppView, ResDiff, OpsModel, Design, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.viewClass = AppView;

      AppEditor.prototype.title = function() {
        return ((this.design || this.opsModel).get("name") || this.opsModel.getMsrId()) + " - app";
      };

      AppEditor.prototype.tabClass = function() {
        switch (this.opsModel.get("state")) {
          case OpsModel.State.Running:
            return "icon-app-running";
          case OpsModel.State.Stopped:
            return "icon-app-stopped";
          default:
            return "icon-app-pending";
        }
      };

      AppEditor.prototype.isReady = function() {
        return !!this.__hasAdditionalData;
      };

      AppEditor.prototype.isAppEditMode = function() {
        var _ref;
        return (_ref = this.design) != null ? _ref.modeIsAppEdit() : void 0;
      };

      AppEditor.prototype.isModified = function() {
        return this.design && this.design.modeIsAppEdit() && this.design.isModified();
      };

      AppEditor.prototype.fetchAdditionalData = function() {
        var d;
        d = Q.defer();
        d.resolve();
        return d.promise;
      };

      AppEditor.prototype.initEditor = function() {
        if (this.opsModel.isImported()) {
          this.updateTab();
          this.view.canvas.autoLayout();
          this.view.confirmImport();
          return;
        }
        if (App.user.shouldPay() && this.opsModel.isPMRestricted()) {
          this.view.showUnpayUI();
        } else {
          this.diff();
        }
        this.view.listenToPayment();
      };

      AppEditor.prototype.diff = function() {
        var differ, newJson, self;
        if (!this.opsModel.testState(OpsModel.State.Running)) {
          return;
        }
        newJson = this.opsModel.generateJsonFromRes();
        self = this;
        differ = new ResDiff({
          old: this.opsModel.getJsonData(),
          "new": newJson,
          callback: function(confirm) {
            if (confirm) {
              return self.applyDiff(newJson, differ.getChangeInfo().needUpdateLayout);
            }
            self.remove();
          }
        });
        if (differ.getChangeInfo().hasResChange) {
          differ.render();
          return true;
        }
        return false;
      };

      AppEditor.prototype.applyDiff = function(newJson, autoLayout) {
        var e;
        try {
          this.opsModel.__setJsonData(newJson);
          this.design.reload();
          if (autoLayout) {
            this.view.canvas.autoLayout();
          }
        } catch (_error) {
          e = _error;
          console.error(e);
        }
        return this.opsModel.saveApp(newJson);
      };

      AppEditor.prototype.reloadAppData = function() {
        var self, _ref;
        this.view.showUpdateStatus("", true);
        self = this;
        if ((_ref = this.loadVpcResource()) != null) {
          _ref.then(function() {
            return self.__onReloadDone();
          }, function() {
            return self.view.toggleProcessing();
          });
        }
      };

      AppEditor.prototype.__onReloadDone = function() {
        if (this.isRemoved()) {
          return;
        }
        this.view.toggleProcessing();
        if (!this.diff()) {
          this.view.canvas.update();
        }
      };

      AppEditor.prototype.loadVpcResource = function() {
        return CloudResources("OpsResource", this.opsModel.getMsrId()).init(this.opsModel.get("region"), this.opsModel.get("provider")).fetchForce();
      };


      /*
       AppEdit
       */

      AppEditor.prototype.switchToEditMode = function() {
        return this.design.setMode(Design.MODE.AppEdit);
      };

      AppEditor.prototype.cancelEditMode = function(force) {
        var modfied;
        modfied = force || this.design.isModified();
        if (modfied && !force) {
          return false;
        }
        this.design.setMode(Design.MODE.App);
        if (modfied) {
          this.design.reload();
        }
        return true;
      };

      AppEditor.prototype.applyAppEdit = function(newJson, fastUpdate) {
        var self;
        if (!newJson) {
          this.design.setMode(Design.MODE.App);
          return;
        }
        this.__applyingUpdate = true;
        fastUpdate = fastUpdate && !this.opsModel.testState(OpsModel.State.Stopped);
        self = this;
        this.view.listenTo(this.opsModel, "change:progress", this.view.updateProgress);
        this.opsModel.update(newJson, fastUpdate).then(function() {
          if (fastUpdate) {
            return self.__onAppEditDidDone();
          } else {
            return self.__onAppEditDone();
          }
        }, function(err) {
          return self.__onAppEditFail(err);
        });
        return true;
      };

      AppEditor.prototype.__onAppEditFail = function(err) {
        var msg;
        if (this.isRemoved()) {
          return;
        }
        this.__applyingUpdate = false;
        this.view.stopListening(this.opsModel, "change:progress", this.view.updateProgress);
        msg = err.msg;
        if (err.result) {
          msg += "\n" + err.result;
        }
        msg = msg.replace(/\n/g, "<br />");
        this.view.showUpdateStatus(msg);
      };

      AppEditor.prototype.__onAppEditDone = function() {
        var self, _ref;
        if (this.isRemoved()) {
          return;
        }
        self = this;
        this.view.showUpdateStatus("", true);
        if ((_ref = this.loadVpcResource()) != null) {
          _ref.then(function() {
            return self.__onAppEditDidDone();
          });
        }
      };

      AppEditor.prototype.__onAppEditDidDone = function() {
        if (this.isRemoved()) {
          return;
        }
        this.__applyingUpdate = false;
        this.view.stopListening(this.opsModel, "change:progress", this.view.updateProgress);
        this.view.showUpdateStatus();
        this.design.setMode(Design.MODE.App);
        this.design.reload();
        this.saveThumbnail();
      };

      AppEditor.prototype.onOpsModelStateChanged = function() {
        var self, _ref;
        if (!this.isInited()) {
          return;
        }
        if (this.opsModel.testState(OpsModel.State.Saving) || this.opsModel.previous("state") === OpsModel.State.Saving) {
          return;
        }
        this.updateTab();
        if (this.opsModel.isProcessing()) {
          this.view.toggleProcessing();
        } else if (this.opsModel.testState(OpsModel.State.Destroyed)) {
          this.remove();
        } else if (!this.__applyingUpdate) {
          self = this;
          this.view.showUpdateStatus("", true);
          if ((_ref = this.loadVpcResource()) != null) {
            _ref.then(function() {
              return self.__onVpcResLoaded();
            });
          }
        }
      };

      AppEditor.prototype.__onVpcResLoaded = function() {
        if (this.isRemoved()) {
          return;
        }
        this.view.canvas.update();
        this.view.toggleProcessing();
      };

      return AppEditor;

    })(StackEditor);
    return AppEditor;
  });

}).call(this);

(function() {
  define('CanvasLine',["CanvasElement", "constant", "CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang, SGRulePopup) {
    var CeLine, LineMaskToClear, determineAngle, flipRect, offsetRect, rotate, rotateRect, __determineAngle;
    LineMaskToClear = null;
    rotate = function(point, angle) {
      var a, c, s, x, y;
      a = Math.PI / 180 * angle;
      c = Math.cos(a);
      s = Math.sin(a);
      point.y = -point.y;
      x = Math.round(point.x * c - point.y * s);
      y = Math.round(point.x * s + point.y * c);
      point.x = x;
      point.y = -y;
    };
    offsetRect = function(rect, origin) {
      rect.x1 -= origin.x;
      rect.y1 -= origin.y;
      rect.x2 -= origin.x;
      rect.y2 -= origin.y;
    };
    rotateRect = function(rect, angle) {
      var p1, p2;
      p1 = {
        x: rect.x1,
        y: rect.y1
      };
      p2 = {
        x: rect.x2,
        y: rect.y2
      };
      rotate(p1, angle);
      rotate(p2, angle);
      rect.x1 = Math.min(p1.x, p2.x);
      rect.x2 = Math.max(p1.x, p2.x);
      rect.y1 = Math.min(p1.y, p2.y);
      rect.y2 = Math.max(p1.y, p2.y);
    };
    flipRect = function(rect) {
      var t;
      t = rect.y1;
      rect.y1 = -rect.y2;
      rect.y2 = -t;
    };
    __determineAngle = function(target, endpoint) {
      var a;
      a = target[2];
      if (a === CanvasElement.constant.PORT_4D_ANGLE) {
        if (Math.abs(endpoint[0] - target[0]) - Math.abs(endpoint[1] - target[1]) > 0) {
          a = CanvasElement.constant.PORT_2D_H_ANGLE;
        } else {
          a = CanvasElement.constant.PORT_2D_V_ANGLE;
        }
      }
      if (a === CanvasElement.constant.PORT_2D_H_ANGLE) {
        target[2] = endpoint[0] >= target[0] ? CanvasElement.constant.PORT_RIGHT_ANGLE : CanvasElement.constant.PORT_LEFT_ANGLE;
      } else if (a === CanvasElement.constant.PORT_2D_V_ANGLE) {
        target[2] = endpoint[1] >= target[1] ? CanvasElement.constant.PORT_DOWN_ANGLE : CanvasElement.constant.PORT_UP_ANGLE;
      }
    };
    determineAngle = function(p1, p2) {
      if (p1[2] < 0) {
        __determineAngle(p1, p2);
      }
      if (p2[2] < 0) {
        __determineAngle(p2, p1);
      }
    };
    CeLine = CanvasElement.extend({

      /* env:dev                                      env:dev:end */
      type: "CeLine",
      node_line: true,
      portName: function(targetId) {
        return this.model.port(targetId, "name");
      },
      render: function() {
        var el1, el2, initiator, item1, item2, _i, _j, _len, _len1, _ref, _ref1;
        this.$el.remove();
        this.$el = $();
        item1 = this.canvas.getItem(this.model.port1Comp().id);
        item2 = this.canvas.getItem(this.model.port2Comp().id);
        initiator = this.canvas.__popLineInitiator() || item1;
        if (item1.$el.length === 1 && item2.$el.length === 1) {
          this.renderConnection(item1, item2, void 0, void 0, initiator);
        } else {
          _ref = item1.$el;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el1 = _ref[_i];
            _ref1 = item2.$el;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              el2 = _ref1[_j];
              this.renderConnection(item1, item2, el1, el2, initiator);
            }
          }
        }
      },
      update: function() {
        var el1, el2, i, item1, item2, newLength, svgEl, _i, _j, _len, _len1, _ref, _ref1;
        item1 = this.canvas.getItem(this.model.port1Comp().id);
        item2 = this.canvas.getItem(this.model.port2Comp().id);
        if (item1.$el.length === 1 && item2.$el.length === 1) {
          this.$el.children().attr("d", this.generatePath(item1, item2, void 0, void 0));
        } else {
          newLength = item1.$el.length * item2.$el.length;
          if (this.$el.length < newLength) {
            while (this.$el.length < newLength) {
              svgEl = this.createLine("M0 0Z");
              this.addView(svgEl);
            }
          } else if (this.$el.length > newLength) {
            this.$el.slice(newLength).remove();
            this.$el = this.$el.slice(0, newLength);
          }
          i = 0;
          _ref = item1.$el;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el1 = _ref[_i];
            _ref1 = item2.$el;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              el2 = _ref1[_j];
              this.$el.eq(i).children().attr("d", this.generatePath(item1, item2, el1, el2));
              ++i;
            }
          }
        }
      },
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = svg.group().add([svg.path(pd), svg.path(pd).classes("fill-line")]).attr({
          "data-id": this.cid
        }).classes("line " + this.type.replace(/\./g, "-"));
        this.appendLineToCanvas(svgEl);
        return svgEl;
      },
      appendLineToCanvas: function(svgEl) {
        return this.canvas.appendLine(svgEl);
      },
      renderConnection: function(item_from, item_to, element1, element2, initiator) {
        var dirt, length, maskPath, path, svg, svgEl;
        path = this.generatePath(item_from, item_to, element1, element2);
        svgEl = this.createLine(path);
        this.addView(svgEl);
        if (!this.canvas.initializing && initiator) {
          svg = this.canvas.svg;
          maskPath = svg.path(path);
          length = parseFloat(maskPath.node.getTotalLength()).toFixed(2);
          dirt = (initiator === item_from ? 1 : -1) * (this.__lastDir || 1);
          maskPath.style({
            "stroke-dasharray": length + " " + length,
            "stroke-dashoffset": length * dirt
          });
          setTimeout(function() {
            return maskPath.classes("mask-line");
          }, 20);
          CeLine.cleanLineMask(svgEl.maskWith(maskPath));
        }
      },
      getConnectPorts: function(item_from, item_to, element1, element2) {
        var connection, d, dirn_from, dirn_to, distance, from_port, i, idx, j, port_from, port_to, pos_from, pos_to, possiblePortFrom, possiblePortTo, size_from, size_to, to_port, _i, _j, _k, _l, _len, _len1, _len2, _len3;
        connection = this.model;
        pos_to = item_to.pos(element2);
        pos_from = item_from.pos(element1);
        pos_to.x *= 10;
        pos_from.x *= 10;
        pos_to.y *= 10;
        pos_from.y *= 10;
        from_port = connection.port1("name");
        to_port = connection.port2("name");
        dirn_from = item_from.portDirection(from_port);
        dirn_to = item_to.portDirection(to_port);
        possiblePortFrom = [from_port];
        possiblePortTo = [to_port];
        if (dirn_from) {
          possiblePortFrom = dirn_from === "horizontal" ? [from_port + "-right", from_port + "-left"] : [from_port + "-top", from_port + "-bottom"];
        }
        if (dirn_to) {
          possiblePortTo = dirn_to === "horizontal" ? [to_port + "-right", to_port + "-left"] : [to_port + "-top", to_port + "-bottom"];
        }
        for (idx = _i = 0, _len = possiblePortFrom.length; _i < _len; idx = ++_i) {
          i = possiblePortFrom[idx];
          possiblePortFrom[idx] = {
            name: i,
            pos: item_from.portPosition(i, true).slice(0)
          };
          possiblePortFrom[idx].pos[0] += pos_from.x;
          possiblePortFrom[idx].pos[1] += pos_from.y;
        }
        for (idx = _j = 0, _len1 = possiblePortTo.length; _j < _len1; idx = ++_j) {
          i = possiblePortTo[idx];
          possiblePortTo[idx] = {
            name: i,
            pos: item_to.portPosition(i, true).slice(0)
          };
          possiblePortTo[idx].pos[0] += pos_to.x;
          possiblePortTo[idx].pos[1] += pos_to.y;
        }
        distance = -1;
        for (_k = 0, _len2 = possiblePortFrom.length; _k < _len2; _k++) {
          i = possiblePortFrom[_k];
          for (_l = 0, _len3 = possiblePortTo.length; _l < _len3; _l++) {
            j = possiblePortTo[_l];
            d = Math.pow(i.pos[0] - j.pos[0], 2) + Math.pow(i.pos[1] - j.pos[1], 2);
            if (distance === -1 || distance > d) {
              distance = d;
              port_from = i;
              port_to = j;
            }
          }
        }
        size_to = item_to.size();
        size_from = item_from.size();
        determineAngle(port_from.pos, port_to.pos);
        return {
          start: {
            x: port_from.pos[0],
            y: port_from.pos[1],
            angle: port_from.pos[2],
            type: connection.port1Comp().type,
            name: port_from.name,
            itemCX: pos_from.x + size_from.width / 2 * 10,
            itemCY: pos_from.y + size_from.height / 2 * 10,
            item: item_from,
            closer: item_from.isPortSignificant(port_from.name),
            itemRect: {
              x1: pos_from.x,
              x2: pos_from.x + size_from.width * 10,
              y1: pos_from.y,
              y2: pos_from.y + size_from.height * 10
            }
          },
          end: {
            x: port_to.pos[0],
            y: port_to.pos[1],
            angle: port_to.pos[2],
            type: connection.port2Comp().type,
            name: port_to.name,
            itemCX: pos_to.x + size_to.width / 2 * 10,
            itemCY: pos_to.y + size_to.height / 2 * 10,
            item: item_to,
            closer: item_to.isPortSignificant(port_to.name),
            itemRect: {
              x1: pos_to.x,
              x2: pos_to.x + size_to.width * 10,
              y1: pos_to.y,
              y2: pos_to.y + size_to.height * 10
            }
          }
        };
      },
      generatePath: function(item_from, item_to, element1, element2) {
        var end, ports, start;
        ports = this.getConnectPorts(item_from, item_to, element1, element2);
        start = ports.start;
        end = ports.end;
        this.__lastDir = 1;
        if (this.lineStyle() === 0) {
          return "M" + start.x + " " + start.y + " L" + end.x + " " + end.y;
        }
        if (this.lineStyle() === 2 || this.lineStyle() === 3) {
          return this.generateCurvePath(ports.start, ports.end);
        }
        if (start.x === end.x || start.y === end.y) {
          return "M" + start.x + " " + start.y + " L" + end.x + " " + end.y;
        }
        return this.generateElbowPath(start, end);
      },
      lineStyle: function() {
        return 4;
      },
      genericGenerate: function(start, end, algorithms) {
        var fliped, origin, originalEndAngle, point, result, _i, _j, _len, _len1;
        origin = {
          x: start.x,
          y: start.y
        };
        originalEndAngle = end.angle;
        start.x = start.y = 0;
        end.x -= origin.x;
        end.y -= origin.y;
        offsetRect(start.itemRect, origin);
        offsetRect(end.itemRect, origin);
        if (start.angle !== 0) {
          rotate(end, -start.angle);
          end.angle -= start.angle;
          if (end.angle < 0) {
            end.angle += 360;
          }
          rotateRect(start.itemRect, -start.angle);
          rotateRect(end.itemRect, -start.angle);
        }
        fliped = false;
        if (end.y > 0) {
          fliped = true;
          end.y = -end.y;
          if (end.angle === 90) {
            end.angle = 270;
          } else if (end.angle === 270) {
            end.angle = 90;
          }
          flipRect(start.itemRect);
          flipRect(end.itemRect);
        }
        result = algorithms["" + end.angle](start, end);
        result.push(end);
        if (fliped) {
          for (_i = 0, _len = result.length; _i < _len; _i++) {
            point = result[_i];
            point.y = -point.y;
          }
        }
        for (_j = 0, _len1 = result.length; _j < _len1; _j++) {
          point = result[_j];
          rotate(point, start.angle);
          point.x += origin.x;
          point.y += origin.y;
        }
        result.unshift(origin);
        return result;
      },
      generateCurvePath: function(start, end) {
        var origin, result;
        result = this.genericGenerate(start, end, this.curveAlgorithms);
        origin = result.shift();
        if (result.length === 3) {
          return "M" + origin.x + " " + origin.y + "C" + result[0].x + " " + result[0].y + " " + result[1].x + " " + result[1].y + " " + result[2].x + " " + result[2].y;
        } else {
          return "M" + origin.x + " " + origin.y + "L" + result[0].x + " " + result[0].y + "C" + result[1].x + " " + result[1].y + " " + result[2].x + " " + result[2].y + " " + result[3].x + " " + result[3].y + "L" + result[4].x + " " + result[4].y;
        }
      },
      curveAlgorithms: {
        "0": function(start, end) {
          var cos, dis, rad, sin, x, y;
          x = end.x;
          y = Math.abs(end.y);
          dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 4;
          rad = Math.PI / 180 * 30;
          cos = dis * Math.cos(rad);
          sin = dis * Math.sin(rad);
          if (x > 0) {
            return [
              {
                x: cos,
                y: -sin
              }, {
                x: end.x + sin,
                y: end.y + cos
              }
            ];
          } else if (x === 0) {
            return [
              {
                x: cos,
                y: -sin
              }, {
                x: end.x + cos,
                y: end.y + sin
              }
            ];
          } else {
            return [
              {
                x: sin,
                y: -cos
              }, {
                x: end.x + cos,
                y: end.y + sin
              }
            ];
          }
        },
        "90": function(start, end) {
          var c2x, c2y, dis, rad, x, y;
          x = end.x;
          y = Math.abs(end.y);
          dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
          rad = Math.PI / 180 * 30;
          dis /= x > 0 ? 4 : 2;
          c2x = dis * Math.cos(rad);
          c2y = dis * Math.sin(rad);
          if (x > 0) {
            return [
              {
                x: end.x / 2,
                y: 0
              }, {
                x: end.x - c2x,
                y: end.y - c2y
              }
            ];
          } else {
            return [
              {
                x: sin,
                y: -cos
              }, {
                x: end.x + cos,
                y: end.y - sin
              }
            ];
          }
        },
        "180": function(start, end) {
          var cos, dis, rad, sin, x, y;
          if (end.x > 0) {
            return [
              {
                x: end.x / 2,
                y: 0
              }, {
                x: end.x / 2,
                y: end.y
              }
            ];
          }
          x = end.x;
          y = Math.abs(end.y);
          dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 3;
          rad = Math.PI / 180 * 40;
          sin = dis * Math.sin(rad);
          cos = dis * Math.cos(rad);
          return [
            {
              x: sin,
              y: -cos
            }, {
              x: end.x - sin,
              y: end.y + cos
            }
          ];
        },
        "270": function(start, end) {
          var c1x, c1y, dis, rad, x, y;
          x = end.x;
          y = Math.abs(end.y);
          if (x > 0) {
            if (Math.abs(x - y) < 10) {
              return [
                {
                  x: x,
                  y: 0
                }, {
                  x: x,
                  y: end.y
                }
              ];
            }
            if (x < 20) {
              return [
                {
                  x: 0,
                  y: 0
                }, {
                  x: 0,
                  y: 0
                }, {
                  x: x,
                  y: 0
                }, {
                  x: x,
                  y: -x
                }
              ];
            } else if (y < 20) {
              return [
                {
                  x: x - y,
                  y: 0
                }, {
                  x: x - y,
                  y: 0
                }, {
                  x: x,
                  y: 0
                }, {
                  x: x,
                  y: end.y
                }
              ];
            }
            if (x < y) {
              return [
                {
                  x: x,
                  y: 0
                }, {
                  x: x,
                  y: end.y / 2
                }
              ];
            } else {
              return [
                {
                  x: x / 2,
                  y: 0
                }, {
                  x: x,
                  y: 0
                }
              ];
            }
          }
          dis = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) / 4;
          rad = Math.PI / 180 * 30;
          c1x = dis * Math.cos(rad);
          c1y = dis * Math.sin(rad);
          return [
            {
              x: c1x,
              y: -c1y
            }, {
              x: end.x,
              y: end.y / 2
            }
          ];
        }
      },
      generateElbowPath: function(start, end) {
        var result;
        result = this.genericGenerate(start, end, this.elbowAlgorithms);
        return this.getElbowPathFromPoints(result);
      },
      elbowAlgorithms: {
        "0": function(start, end) {
          var x;
          x = Math.max(start.itemRect.x2, end.itemRect.x2) + 20;
          return [
            {
              x: x,
              y: start.y
            }, {
              x: x,
              y: end.y
            }
          ];
        },
        "90": function(start, end) {
          var x, y;
          if (end.itemRect.x1 > 0) {
            x = Math.max(start.itemRect.x2, end.itemRect.x2) + 20;
            if (start.closer) {
              x = start.itemRect.x2 + 20;
            } else if (end.closer) {
              x = end.itemRect.x1 - 20;
            } else {
              x = Math.round((end.itemRect.x1 - start.itemRect.x2) / 2) + start.itemRect.x2;
            }
          } else {
            x = Math.max(start.itemRect.x2, end.itemRect.x2) + 20;
          }
          y = end.itemRect.y1 - 20;
          return [
            {
              x: x,
              y: start.y
            }, {
              x: x,
              y: y
            }, {
              x: end.x,
              y: y
            }
          ];
        },
        "180": function(start, end) {
          var x, x2, y;
          if (end.x <= 0) {
            x = start.itemRect.x2 + 20;
            y = end.itemRect.y2 + 20;
            x2 = end.itemRect.x1 - 20;
            return [
              {
                x: x,
                y: start.y
              }, {
                x: x,
                y: y
              }, {
                x: x2,
                y: y
              }, {
                x: x2,
                y: end.y
              }
            ];
          } else {
            if (start.closer) {
              x = start.itemRect.x2 + 20;
            } else if (end.closer) {
              x = end.itemRect.x1 - 20;
            } else {
              x = Math.round((end.itemRect.x1 - start.itemRect.x2) / 2) + start.itemRect.x2;
            }
            return [
              {
                x: x,
                y: start.y
              }, {
                x: x,
                y: end.y
              }
            ];
          }
        },
        "270": function(start, end) {
          var x, y;
          if (end.x > 0) {
            return [
              {
                x: end.x,
                y: start.y
              }
            ];
          }
          x = start.itemRect.x2 + 20;
          y = end.itemRect.y2 + 20;
          return [
            {
              x: x,
              y: start.y
            }, {
              x: x,
              y: y
            }, {
              x: end.x,
              y: y
            }
          ];
        }
      },
      generateElbowPathAdv: function(start, end) {
        var s, s1, s2;
        s1 = this.getElbowPoints(start, end);
        s2 = this.getElbowPoints(end, start);
        if (s2.failure) {
          s = s1;
        } else if (s1.failure) {
          s = s2;
        } else {
          s = s1.length < s2.length ? s1 : s2;
        }
        return this.getElbowPathFromPoints(s.result);
      },
      getElbowPoints: function(start, end) {
        var lineData;
        lineData = this.getElbowBounds(start, end);

        /*
        
         * 2. Find out all the area that we might go through
        lineData.areas = @getElbowAreas( start, end )
        
        console.log "=========== #{@type}", lineData
        
        lineData.result  = []
        lineData.current = { x:lineData.start.x, y:lineData.start.y }
        lineData.target  = {}
        lineData.test    = 0
        
        lineData.addResult = ( x, y, area )->
          @result.push {
            x : x
            y : y
            area : area
          }
        
         * 3. Search best points for each area
        @getNextElbowTarget( lineData )
        while not lineData.done
          @proceedElbowTarget( lineData )
          @getNextElbowTarget( lineData )
        
          if lineData.inFinalArea
            @proceedElbowLastArea( lineData )
            break
        
          ++lineData.test
          if lineData.test >= 50
            lineData.failure = true
            console.info "Failed to search elbow path", @type, start, end
            break
        
        
         * 3.1 If it fails, fallback to old strategy to generate the line
        if lineData.failure
          @getElbowFallback( lineData )
         */
        this.getElbowFallback(lineData);
        lineData.result.unshift({
          x: lineData.start.x,
          y: lineData.start.y
        });
        lineData.result.unshift({
          x: start.x,
          y: start.y
        });
        lineData.result.push({
          x: lineData.end.x,
          y: lineData.end.y
        });
        lineData.result.push({
          x: end.x,
          y: end.y
        });
        this.optimizeElbowPoints(lineData);
        return lineData;
      },
      getElbowFallback: function(lineData) {
        var end, start;
        start = lineData.start;
        end = lineData.end;
        if (lineData.start.angle === CanvasElement.constant.PORT_UP_ANGLE || lineData.start.angle === CanvasElement.constant.PORT_DOWN_ANGLE) {
          lineData.result = [
            {
              x: start.x,
              y: lineData.preferY
            }, {
              x: lineData.preferX,
              y: lineData.preferY
            }
          ];
        } else {
          lineData.result = [
            {
              y: start.y,
              x: lineData.preferX
            }, {
              y: lineData.preferY,
              x: lineData.preferX
            }
          ];
        }
      },
      getNextElbowTarget: function(lineData) {
        var down, lastArea, left, right, top, _ref, _ref1;
        if (lineData.current.x === lineData.end.x && lineData.current.y === lineData.end.y) {
          lineData.done = true;
          return;
        }
        lastArea = lineData.areas[lineData.areas.length - 1];
        if ((lastArea.x1 <= (_ref = lineData.current.x) && _ref <= lastArea.x2) && (lastArea.y1 <= (_ref1 = lineData.current.y) && _ref1 <= lastArea.y2)) {
          lineData.done = true;
          lineData.inFinalArea = true;
          return;
        }
        lineData.target.x = lineData.current.x;
        lineData.target.y = lineData.current.y;
        if (lineData.start.angle === CanvasElement.constant.PORT_RIGHT_ANGLE || lineData.start.angle === CanvasElement.constant.PORT_LEFT_ANGLE) {
          if (lineData.start.angle === CanvasElement.constant.PORT_RIGHT_ANGLE) {
            left = lineData.current.x;
            right = lineData.preferX;
          } else {
            left = lineData.preferX;
            right = lineData.current.x;
          }
          if (left < right) {
            lineData.target.x = lineData.preferX;
          } else if (lineData.current.y !== lineData.end.y) {
            lineData.target.y = lineData.end.y;
          } else {
            lineData.target.x = lineData.end.x;
          }
        } else {
          if (lineData.start.angle === CanvasElement.constant.PORT_DOWN_ANGLE) {
            top = lineData.current.y;
            down = lineData.preferY;
          } else {
            top = lineData.preferY;
            down = lineData.current.y;
          }
          if (top < down) {
            lineData.target.y = lineData.preferY;
          } else if (lineData.current.x !== lineData.end.x) {
            lineData.target.x = lineData.end.x;
          } else {
            lineData.target.y = lineData.end.y;
          }
        }
      },
      proceedElbowTarget: function(lineData) {
        var area, ch, cross, current, currentAngle, dis, idx, linex1, linex2, liney1, liney2, minCross, nextArea, target, theCross, theCrossEnd, theCrossX, theCrossY, thearea, xRange, xSide, yRange, ySide, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        target = $.extend({}, lineData.target);
        current = lineData.current;
        _ref = lineData.areas;
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          thearea = _ref[idx];
          if (area && area.depth < thearea.depth) {
            continue;
          }
          xRange = thearea.x1 < current.x && current.x < thearea.x2;
          yRange = thearea.y1 < current.y && current.y < thearea.y2;
          xSide = thearea.x1 === current.x || thearea.x2 === current.x;
          ySide = thearea.y1 === current.y || thearea.y2 === current.y;
          if ((xRange && yRange) || (thearea.endParent && ((xRange && ySide) || (yRange && xSide)))) {
            area = thearea;
            nextArea = lineData.areas[idx + 1];
          }
        }
        if (nextArea) {
          if (nextArea.endParent) {
            if ((nextArea.x1 < (_ref1 = target.x) && _ref1 < nextArea.x2) && (nextArea.y1 < (_ref2 = target.y) && _ref2 < nextArea.y2)) {
              if (current.x > nextArea.x2) {
                target.x = nextArea.x2;
              } else if (current.x < nextArea.x1) {
                target.x = nextArea.x1;
              } else if (current.y > nextArea.y2) {
                target.y = nextArea.y2;
              } else if (current.y < nextArea.y1) {
                target.y = nextArea.y1;
              }
            }
          } else {
            if (!((area.x1 < (_ref3 = target.x) && _ref3 < area.x2) && (area.y1 < (_ref4 = target.y) && _ref4 < area.y2))) {
              if (target.x > area.x2) {
                target.x = area.x2;
              } else if (target.x < area.x1) {
                target.x = area.x1;
              } else if (target.y > area.y2) {
                target.y = area.y2;
              } else if (target.y < area.y1) {
                target.y = area.y1;
              }
            }
          }
        }
        cross = [];
        if (target.x < current.x) {
          linex1 = target.x;
          linex2 = current.x;
        } else {
          linex1 = current.x;
          linex2 = target.x;
        }
        if (target.y < current.y) {
          liney1 = target.y;
          liney2 = current.y;
        } else {
          liney1 = current.y;
          liney2 = target.y;
        }
        _ref5 = area.children;
        for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
          ch = _ref5[_j];
          if (!(ch.x1 >= linex2 || ch.x2 <= linex1 || ch.y1 >= liney2 || ch.y2 <= liney1)) {
            cross.push(ch);
          }
        }
        if (current.x > target.x) {
          currentAngle = CanvasElement.constant.PORT_LEFT_ANGLE;
        } else if (current.x < target.x) {
          currentAngle = CanvasElement.constant.PORT_RIGHT_ANGLE;
        } else if (current.y > target.y) {
          currentAngle = CanvasElement.constant.PORT_UP_ANGLE;
        } else {
          currentAngle = CanvasElement.constant.PORT_DOWN_ANGLE;
        }
        minCross = -1;
        theCross = null;
        for (_k = 0, _len2 = cross.length; _k < _len2; _k++) {
          ch = cross[_k];
          if (currentAngle === CanvasElement.constant.PORT_LEFT_ANGLE || currentAngle === CanvasElement.constant.PORT_RIGHT_ANGLE) {
            dis = Math.abs(ch.x1 - current.x);
          } else {
            dis = Math.abs(ch.y1 - current.y);
          }
          if (dis < minCross || minCross === -1) {
            theCross = ch;
            minCross = dis;
          }
        }
        if (!theCross) {
          lineData.addResult(target.x, target.y, area);
          lineData.current.x = target.x;
          lineData.current.y = target.y;
          return;
        }
        if (currentAngle === CanvasElement.constant.PORT_UP_ANGLE || currentAngle === CanvasElement.constant.PORT_DOWN_ANGLE) {
          if (currentAngle === CanvasElement.constant.PORT_UP_ANGLE) {
            theCrossY = theCross.y2;
            theCrossEnd = theCross.y1;
          } else {
            theCrossY = theCross.y1;
            theCrossEnd = theCross.y2;
          }
          lineData.addResult(lineData.current.x, theCrossY, area);
          if (theCross.x2 < lineData.end.x) {
            theCrossX = theCross.x2;
          } else if (theCross.x1 > lineData.end.x) {
            theCrossX = theCross.x1;
          } else if ((theCross.x2 - lineData.current.x) <= (lineData.current.x - theCross.x1)) {
            theCrossX = theCross.x2;
          } else {
            theCrossX = theCross.x1;
          }
          lineData.addResult(theCrossX, theCrossY, area);
          if (Math.abs(theCrossEnd - theCrossY) > Math.abs(lineData.preferY - theCrossY)) {
            lineData.addResult(theCrossX, lineData.preferY, area);
          } else {
            lineData.addResult(theCrossX, theCrossEnd, area);
          }
        } else {
          if (currentAngle === CanvasElement.constant.PORT_LEFT_ANGLE) {
            theCrossX = theCross.x2;
            theCrossEnd = theCross.x1;
          } else {
            theCrossX = theCross.x1;
            theCrossEnd = theCross.x2;
          }
          lineData.addResult(theCrossX, lineData.current.y, area);
          if (theCross.y2 < lineData.end.y) {
            theCrossY = theCross.y2;
          } else if (theCross.y1 > lineData.end.y) {
            theCrossY = theCross.y1;
          } else if ((theCross.y2 - lineData.current.y) <= (lineData.current.y - theCross.y1)) {
            theCrossY = theCross.y2;
          } else {
            theCrossY = theCross.y1;
          }
          lineData.addResult(theCrossX, theCrossY, area);
          if (Math.abs(theCrossEnd - theCrossX) > Math.abs(lineData.preferX - theCrossX)) {
            lineData.addResult(lineData.preferX, theCrossY, area);
          } else {
            lineData.addResult(theCrossEnd, theCrossY, area);
          }
        }
        lineData.current = $.extend({}, lineData.result[lineData.result.length - 1]);
      },
      proceedElbowLastArea: function(lineData) {
        var current, end, lastArea, nextX, nextY, otherSide, target, toX, toY;
        end = lineData.end;
        lastArea = lineData.areas[lineData.areas.length - 1];
        target = lineData.target;
        toX = target.x;
        toY = target.y;
        current = lineData.result[lineData.result.length - 1];
        if (end.angle === CanvasElement.constant.PORT_UP_ANGLE || end.angle === CanvasElement.constant.PORT_DOWN_ANGLE) {
          if (Math.abs(end.y - lastArea.y1) < Math.abs(end.y - lastArea.y2)) {
            toY = lastArea.y1;
            otherSide = lastArea.y2;
          } else {
            toY = lastArea.y2;
            otherSide = lastArea.y1;
          }
          if (current.y === otherSide) {
            if (Math.abs(current.x - lastArea.x1) < Math.abs(current.x - lastArea.x2)) {
              nextX = lastArea.x1;
            } else {
              nextX = lastArea.x2;
            }
            lineData.addResult(nextX, current.y, lastArea);
            lineData.addResult(nextX, toY, lastArea);
          } else {
            lineData.addResult(current.x, toY, lastArea);
          }
          lineData.addResult(toX, toY, lastArea);
          lineData.addResult(lineData.end.x, toY, lastArea);
        } else {
          if (Math.abs(end.x - lastArea.x1) < Math.abs(end.x - lastArea.x2)) {
            toX = lastArea.x1;
            otherSide = lastArea.x2;
          } else {
            toX = lastArea.x2;
            otherSide = lastArea.x1;
          }
          if (current.x === otherSide) {
            if (Math.abs(current.y - lastArea.y1) < Math.abs(current.y - lastArea.y2)) {
              nextY = lastArea.y1;
            } else {
              nextY = lastArea.y2;
            }
            lineData.addResult(current.x, nextY, lastArea);
            lineData.addResult(toX, nextY, lastArea);
          } else {
            lineData.addResult(toX, current.y, lastArea);
          }
          lineData.addResult(toX, toY, lastArea);
          lineData.addResult(toX, lineData.end.y, lastArea);
        }
      },
      optimizeElbowPoints: function(lineData) {
        var idx, optPoints, pt0, pt1, pt2;
        optPoints = [];
        idx = 0;
        while (idx < lineData.result.length) {
          pt0 = lineData.result[idx];
          pt1 = lineData.result[idx + 1];
          pt2 = lineData.result[idx + 2];
          if (pt1 && pt1.y === pt0.y && pt0.x === pt1.x) {
            idx += 1;
            continue;
          }
          optPoints.push(pt0);
          if (pt1 && pt2) {
            if ((pt1.x === pt2.x && pt0.x === pt1.x) || (pt1.y === pt2.y && pt0.y === pt1.y)) {
              idx += 2;
              continue;
            }
          }
          ++idx;
        }
        lineData.result = optPoints;
      },
      getElbowPathFromPoints: function(newPoints) {
        var idx, lastPt, nextPt, p, path, x, y, _i, _len;
        path = "";
        for (idx = _i = 0, _len = newPoints.length; _i < _len; idx = ++_i) {
          p = newPoints[idx];
          if (idx === 0) {
            path = "M" + p.x + " " + p.y;
            continue;
          }
          lastPt = newPoints[idx - 1];
          nextPt = newPoints[idx + 1];
          if (lastPt && nextPt) {
            x = 0;
            y = 0;
            if (lastPt.y === p.y && nextPt.x === p.x) {
              x = p.x + (lastPt.x > p.x ? 5 : -5);
              y = p.y + (nextPt.y > p.y ? 5 : -5);
              path += "L" + x + " " + p.y + " Q" + p.x + " " + p.y + " " + p.x + " " + y;
              continue;
            } else if (lastPt.x === p.x && nextPt.y === p.y) {
              x = p.x + (nextPt.x > p.x ? 5 : -5);
              y = p.y + (lastPt.y > p.y ? 5 : -5);
              path += "L" + p.x + " " + y + " Q" + p.x + " " + p.y + " " + x + " " + p.y;
              continue;
            }
          }
          path += "L" + p.x + " " + p.y;
        }
        return path;
      },
      __fixElbowEndpoint: function(point, relative) {
        var angle, p;
        p = $.extend({}, point);
        if (point.angle === CanvasElement.constant.PORT_2D_H_ANGLE || point.angle === CanvasElement.constant.PORT_4D_ANGLE) {
          if (point.x >= relative.x) {
            p.angle = CanvasElement.constant.PORT_LEFT_ANGLE;
          } else {
            p.angle = CanvasElement.constant.PORT_RIGHT_ANGLE;
          }
        }
        if (point.angle === CanvasElement.constant.PORT_2D_V_ANGLE) {
          if (point.y >= relative.y) {
            p.angle = CanvasElement.constant.PORT_UP_ANGLE;
          } else {
            p.pointangle = CanvasElement.constant.PORT_DOWN_ANGLE;
          }
        }
        if ((p.angle === CanvasElement.constant.PORT_LEFT_ANGLE && p.x < relative.x) || (p.angle === CanvasElement.constant.PORT_RIGHT_ANGLE && p.x > relative.x)) {
          angle = relative.y >= p.y ? CanvasElement.constant.PORT_DOWN_ANGLE : CanvasElement.constant.PORT_UP_ANGLE;
        } else if ((p.angle === CanvasElement.constant.PORT_UP_ANGLE && p.y < relative.y) || (p.angle === CanvasElement.constant.PORT_DOWN_ANGLE && p.y > relative.y)) {
          angle = relative.x >= p.x ? CanvasElement.constant.PORT_RIGHT_ANGLE : CanvasElement.constant.PORT_LEFT_ANGLE;
        }
        if (angle) {
          switch (p.angle) {
            case CanvasElement.constant.PORT_LEFT_ANGLE:
              p.x = Math.floor((p.x - 1) / 5) * 5;
              break;
            case CanvasElement.constant.PORT_RIGHT_ANGLE:
              p.x = Math.ceil((p.x + 1) / 10) * 10;
              break;
            case CanvasElement.constant.PORT_UP_ANGLE:
              p.y = Math.floor((p.y - 1) / 10) * 10;
              break;
            case CanvasElement.constant.PORT_DOWN_ANGLE:
              p.y = Math.ceil((p.y + 1) / 10) * 10;
          }
          p.angle = angle;
        }
        return p;
      },
      __ensurePointInParent: function(point, parentRect) {
        point.x = Math.max(point.x, parentRect.x1 * 10);
        point.x = Math.min(point.x, parentRect.x2 * 10);
        point.y = Math.max(point.y, parentRect.y1 * 10);
        point.y = Math.min(point.y, parentRect.y2 * 10);
        return point;
      },
      getElbowBounds: function(start, end) {
        var bound, end0, start0, sticky, x1, x2, y1, y2, _ref, _ref1, _ref2, _ref3;
        start0 = this.__fixElbowEndpoint(start, end);
        end0 = this.__fixElbowEndpoint(end, start);
        bound = {};
        if ((start0.angle + end0.angle) % 180 === 0) {
          if (start.item.sticky) {
            sticky = start;
          } else if (end.item.sticky) {
            sticky = end;
          }
          if (start0.angle === CanvasElement.constant.PORT_UP_ANGLE || start0.angle === CanvasElement.constant.PORT_DOWN_ANGLE) {
            bound.preferX = end0.x;
            if (sticky) {
              bound.preferY = sticky.y + (sticky.angle === CanvasElement.constant.PORT_UP_ANGLE ? -10 : 10);
            } else {
              bound.preferY = Math.round((start0.y + end0.y) / 20) * 10;
              if ((start.itemRect.y1 < (_ref = bound.preferY) && _ref < start.itemRect.y2) || (end.itemRect.y1 < (_ref1 = bound.preferY) && _ref1 < end.itemRect.y2)) {
                y1 = Math.min(start.itemRect.y1, end.itemRect.y1);
                y2 = Math.max(start.itemRect.y2, end.itemRect.y2);
                if (Math.abs(y1 - start0.y) + Math.abs(y1 - end0.y) < Math.abs(y2 - start0.y) + Math.abs(y2 - end0.y)) {
                  bound.preferY = y1 - 5;
                } else {
                  bound.preferY = y2 + 5;
                }
                start0.angle = start0.y <= bound.preferY ? CanvasElement.constant.PORT_DOWN_ANGLE : CanvasElement.constant.PORT_UP_ANGLE;
                end0.angle = end0.y <= bound.preferY ? CanvasElement.constant.PORT_DOWN_ANGLE : CanvasElement.constant.PORT_UP_ANGLE;
              }
            }
          } else {
            bound.preferY = end0.y;
            if (sticky) {
              bound.preferX = sticky.x + (sticky.angle === CanvasElement.constant.PORT_LEFT_ANGLE ? -10 : 10);
            } else {
              bound.preferX = Math.round((start0.x + end0.x) / 20) * 10;
              if ((start.itemRect.x1 < (_ref2 = bound.preferX) && _ref2 < start.itemRect.x2) || (end.itemRect.x1 < (_ref3 = bound.preferX) && _ref3 < end.itemRect.x2)) {
                x1 = Math.min(start.itemRect.x1, end.itemRect.x1);
                x2 = Math.max(start.itemRect.x2, end.itemRect.x2);
                if (Math.abs(x1 - start0.x) + Math.abs(x1 - end0.x) < Math.abs(x2 - start0.x) + Math.abs(x2 - end0.x)) {
                  bound.preferX = x1 - 5;
                } else {
                  bound.preferX = x2 + 5;
                }
                start0.angle = start0.x <= bound.preferX ? CanvasElement.constant.PORT_RIGHT_ANGLE : CanvasElement.constant.PORT_LEFT_ANGLE;
                end0.angle = end0.x <= bound.preferX ? CanvasElement.constant.PORT_RIGHT_ANGLE : CanvasElement.constant.PORT_LEFT_ANGLE;
              }
            }
          }
        } else {
          if (start0.angle === CanvasElement.constant.PORT_UP_ANGLE || start0.angle === CanvasElement.constant.PORT_DOWN_ANGLE) {
            bound.preferX = start0.x;
            bound.preferY = end0.y;
          } else {
            bound.preferX = end0.x;
            bound.preferY = start0.y;
          }
        }
        bound.x1 = Math.min(start0.x, end0.x);
        bound.x2 = Math.max(start0.x, end0.x);
        bound.y1 = Math.min(start0.y, end0.y);
        bound.y2 = Math.max(start0.y, end0.y);
        bound.start = this.__ensurePointInParent(start0, start.item.parent().rect());
        bound.end = this.__ensurePointInParent(end0, end.item.parent().rect());
        return bound;
      },
      __getElbowChildRect: function(p) {
        var ch, children, rect, _i, _len, _ref;
        children = [];
        _ref = p.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          rect = ch.rect();
          rect.item = ch;
          rect.x1 *= 10;
          rect.y1 *= 10;
          rect.x2 *= 10;
          rect.y2 *= 10;
          if (ch.isGroup()) {
            rect.x1 -= 5;
            rect.y1 -= 5;
            rect.x2 += 5;
            rect.y2 += 5;
          }
          children.push(rect);
        }
        return children;
      },
      __getElbowParentRect: function(ch, depth, endParent) {
        var factor, rect;
        rect = ch.rect();
        rect.item = ch;
        factor = ch.isGroup() ? 5 : 0;
        rect.x1 = rect.x1 * 10 - factor;
        rect.y1 = rect.y1 * 10 - factor;
        rect.x2 = rect.x2 * 10 + factor;
        rect.y2 = rect.y2 * 10 + factor;
        rect.children = this.__getElbowChildRect(ch);
        rect.depth = depth;
        rect.endParent = endParent;
        return rect;
      },
      getElbowAreas: function(start, end) {
        var areas, depth, endParent, p1, p2, p2Index, p2Parents;
        p1 = start.item;
        p2 = end.item;
        p2Parents = [];
        while (p2) {
          p2Parents.push(p2);
          p2 = p2.parent();
        }
        areas = [];
        depth = 0;
        while (p1) {
          ++depth;
          p2Index = p2Parents.indexOf(p1);
          if (p2Index === -1) {
            areas.push(this.__getElbowParentRect(p1, depth));
          } else {
            endParent = false;
            while (p2Index >= 0) {
              areas.push(this.__getElbowParentRect(p2Parents[p2Index], depth, endParent));
              endParent = true;
              --p2Index;
              --depth;
            }
            break;
          }
          p1 = p1.parent();
        }
        return areas;
      }
    }, {
      cleanLineMask: function(line) {
        if (!LineMaskToClear) {
          LineMaskToClear = [line];
          return setTimeout(function() {
            return CeLine.__cleanLineMask();
          }, 340);
        } else {
          return LineMaskToClear.push(line);
        }
      },
      __cleanLineMask: function() {
        var line, _i, _len;
        for (_i = 0, _len = LineMaskToClear.length; _i < _len; _i++) {
          line = LineMaskToClear[_i];
          if (line.masker) {
            line.masker.remove();
          }
        }
        LineMaskToClear = null;
      },
      connect: function(LineClass, comp1, comp2) {
        return new LineClass(comp1, comp2, void 0, {
          createByUser: true
        });
      }
    });
    return CeLine;
  });

}).call(this);


define("workspaces/coreeditor/CoreEditorBundle", function(){});
