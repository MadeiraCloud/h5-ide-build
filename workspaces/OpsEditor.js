define('workspaces/editor/template/TplProgress',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class='ops-process'>\n  <section class=\"processing\">\n  	<header>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_TITLE", {hash:{},data:data}))
    + "<span class=\"process-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</span></header>\n    <header class=\"processing rolling-back-content\">Rolling back.</header>\n  	<div class=\"progress\"> <div class=\"bar\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div> </div>\n  </section>\n\n  <section class=\"success hide\">\n    <p class=\"title\">"
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
  }; return Handlebars.template(TEMPLATE); });
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/ProgressViewer',["OpsModel", "Workspace", "./template/TplProgress", "backbone"], function(OpsModel, Workspace, OpsProgressTpl) {
    var OpsProgress, OpsProgressView;
    OpsProgressView = Backbone.View.extend({
      events: {
        "click .btn-close-process": "close"
      },
      initialize: function() {
        this.listenTo(this.model, "destroy", this.updateState);
        this.listenTo(this.model, "change:state", this.updateState);
        this.listenTo(this.model, "change:progress", this.updateProgress);
        this.setElement($(OpsProgressTpl(this.model.toJSON())).appendTo("#main"));
        this.__progress = 0;
      },
      switchToDone: function() {
        var self;
        this.$el.find(".success").show();
        self = this;
        setTimeout(function() {
          self.$el.find(".processing").addClass("fadeout");
          self.$el.find(".success").addClass("fadein");
        }, 10);
        setTimeout(function() {
          return self.trigger("done");
        }, 2000);
      },
      updateState: function() {
        switch (this.model.get("state")) {
          case OpsModel.State.Running:
            if (this.__awake) {
              this.switchToDone();
            } else {
              this.done = true;
            }
            break;
          case OpsModel.State.Destroyed:
            this.$el.children().hide();
            this.$el.find(".fail").show();
            this.$el.find(".detail").text(this.model.get("opsActionError"));
            break;
          default:
            console.error("The model has changed to a state that OpsProgress doesn't recongnize", this.model);
        }
      },
      updateProgress: function() {
        var pp, pro;
        pp = this.model.get("progress");
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

      OpsProgress.prototype.isFixed = function() {
        return false;
      };

      OpsProgress.prototype.isWorkingOn = function(attribute) {
        return this.opsModel === attribute;
      };

      OpsProgress.prototype.tabClass = function() {
        return "icon-app-pending";
      };

      OpsProgress.prototype.title = function() {
        return this.opsModel.get("name") + " - app";
      };

      function OpsProgress(opsModel) {
        if (!opsModel) {
          this.remove();
          throw new Error("Cannot find opsmodel while openning workspace.");
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

define('workspaces/editor/template/TplCanvas',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<aside class=\"OEPanelLeft\"></aside>";
  }

function program3(depth0,data) {
  
  
  return "<div class=\"OEPanelBottom\"></div>";
  }

  buffer += "<div id=\"OpsEditor\" class=\"pos-r\">\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noLeftPane), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<aside class=\"OEPanelRight\" id=\"OEPanelRight\"></aside>\n\n<div class=\"OEMiddleWrap\">\n	<nav class=\"OEPanelTop\"></nav>\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.noBottomPane), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	<section class=\"OEPanelCenter scroll-wrap\">\n		<div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n		<div class=\"scrollbar-horizontal-wrap\"><div class=\"scrollbar-horizontal-thumb\"></div></div>\n\n		<div id=\"canvas_body\" class=\"canvas-view-normal pos-r scroll-content\">\n			<button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('height', 'expand')\"></button>\n			<button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('height', 'shrink')\"></button>\n			<button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('width', 'expand')\"></button>\n			<button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "' onclick=\"MC.canvas.resize('width', 'shrink')\"></button>\n\n			<svg id=\"svg_canvas\" xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\">\n				<g id=\"group_layer\">\n					<g id=\"vpc_layer\"></g>\n					<g id=\"az_layer\"></g>\n					<g id=\"subnet_layer\"></g>\n					<g id=\"asg_layer\"></g>\n				</g>\n				<g id=\"line_layer\"></g>\n				<g id=\"node_layer\"></g>\n			</svg>\n		</div>\n	</section>\n</div>\n</div>";
  return buffer;
  }; return Handlebars.template(TEMPLATE); });
define('workspaces/editor/template/TplOpsEditor',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"toolbar":{},"confirm":{},"export":{},"modal":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"ops-process\">\n  <header class=\"processing\">Loading data...</header>\n  <section class=\"loading-spinner\"></section>\n</div>";
  };
TEMPLATE.loading=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"ops-process\">\n  <header class=\"processing\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "<span class=\"process-info\">0%</span></header>\n  <header class=\"processing rolling-back-content\">Rolling back.</header>\n  <section class=\"loading-spinner\"></section>\n  <div class=\"progress\"> <div class=\"bar\" style=\"width:0%;\"></div> </div>\n</div>";
  return buffer;
  };
TEMPLATE.appProcessing=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "App has updated successfully.";
  }

function program3(depth0,data) {
  
  
  return "The app failed to update.";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <div class=\"error-info-block\">\n    <div class=\"result-sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</div>\n    <div class=\"result-error-info\">\n      <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\n      <p class=\"detail\">";
  stack1 = ((stack1 = (depth0 && depth0.error)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n    </div>\n    <div class=\"result-error-notice\">The state of your app has been rolled back, except for the already deleted resources.</div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"ops-process\">\n  <header class=\"processing\">";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</header>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <button class=\"btn btn-silver\" id=\"processDoneBtn\">Done</button>\n</div>";
  return buffer;
  };
TEMPLATE.appUpdateStatus=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-export-png toolbar-btn-primary\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "' data-analytics-plus=\"export_vis_png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnActionPng=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-zoom-in tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_ZOOM_IN", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-zoom-out seperator tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_ZOOM_OUT", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnZoom=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"selectbox btn-toolbar toolbar-line-style seperator\">\n  <button class=\"selection tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_LINESTYLE", {hash:{},data:data}))
    + "\"></button>\n  <ul class=\"dropdown\">\n    <li class='item' data-id=\"0\"><span class=\"icon-straight\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_STRAIGHT", {hash:{},data:data}))
    + "</span></li>\n    <li class='item' data-id=\"1\"><span class=\"icon-elbow\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_ELBOW", {hash:{},data:data}))
    + "</span></li>\n    <li class='item' data-id=\"2\"><span class=\"icon-bezier-q\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_QUADRATIC_BELZIER", {hash:{},data:data}))
    + "</span></li>\n    <li class='item' data-id=\"3\"><span class=\"icon-bezier-qt\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_SMOOTH_QUADRATIC_BELZIER", {hash:{},data:data}))
    + "</span></li>\n  </ul>\n</div>";
  return buffer;
  };
TEMPLATE.toolbar.BtnLinestyle=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-play tooltip toolbar-btn-primary runApp\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_BTN_RUN_STACK", {hash:{},data:data}))
    + "'>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_BTN_RUN_STACK", {hash:{},data:data}))
    + "</button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnRunStack=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-save\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_SAVE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-delete tooltip seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DELETE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar tooltip icon-duplicate\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_DUPLICATE_STACK", {hash:{},data:data}))
    + "'></button>\n<button class=\"btn-toolbar icon-new-stack tooltip seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CREATE_STACK", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnStackOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"selectbox btn-toolbar seperator\">\n  <button class=\"selection tooltip icon-send\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT", {hash:{},data:data}))
    + "'></button>\n  <ul class=\"dropdown\">\n    <li data-analytics-plus=\"export_png\" class=\"icon-export-png\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "</li>\n    <li data-analytics-plus=\"export_json\" class=\"icon-export-json\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</li>\n    <li data-analytics-plus=\"cloudformation\" class=\"icon-toolbar-cloudformation\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_CF", {hash:{},data:data}))
    + "</li>\n  </ul>\n</div>";
  return buffer;
  };
TEMPLATE.toolbar.BtnExport=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip btn-toolbar icon-update-app toolbar-btn-primary\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_UPDATE_APP", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EDIT_APP", {hash:{},data:data}))
    + "</button>\n<button class=\"tooltip btn-toolbar icon-apply-app toolbar-btn-primary\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_SAVE_UPDATE_APP", {hash:{},data:data}))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_APPLY_EDIT", {hash:{},data:data}))
    + "</button>\n<button class=\"tooltip btn-toolbar icon-cancel-update-app seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CANCEL_UPDATE_APP", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnEditApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip btn-toolbar icon-stop\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_STOP_APP", {hash:{},data:data}))
    + "\"></button>\n<button class=\"tooltip btn-toolbar icon-play startApp\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_START_APP", {hash:{},data:data}))
    + "\"></button>\n<button class=\"btn-toolbar tooltip icon-terminate seperator\" data-tooltip=\"";
  stack1 = helpers.i18n.call(depth0, "TOOL_TIP_TERMINATE_APP", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></button>\n<button class=\"btn-toolbar tooltip icon-save-app seperator\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_SAVE_APP_TO_STACK", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnAppOps=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar icon-export-png tooltip seperator\" data-analytics-plus=\"export_png\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_EXPORT_AS_PNG", {hash:{},data:data}))
    + "'></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnPng=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"btn-toolbar tooltip icon-refresh seperator\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_REFRESH_REOURCES", {hash:{},data:data}))
    + "\"></button>";
  return buffer;
  };
TEMPLATE.toolbar.BtnReloadRes=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return " on";
  }

  buffer += "<label class=\"switch toolbar-visual-ops-switch tooltip";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.stateOn), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TIP_CUSTOM_USER_DATA", {hash:{},data:data}))
    + "\">\n    <span class=\"switch-label\" data-on=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TOGGLE_VISUALOPS_ON", {hash:{},data:data}))
    + "\" data-off=\""
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_TOGGLE_VISUALOPS_OFF", {hash:{},data:data}))
    + "\"></span>\n    <span class=\"switch-handle\"></span>\n</label>";
  return buffer;
  };
TEMPLATE.toolbar.BtnSwitchStates=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n<button class=\"icon-reload tooltip btn btn-blue reload-states\" data-original=\"Reload States\" data-disabled=\"Initiating…\"  data-tooltip=\"Instantly rerun all states in this app.\">\n    Reload States\n</button>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.reloadOn), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.toolbar.BtnReloadStates=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-text-wraper\">\n    <div class=\"modal-center-align-helper\">\n        <div class=\"modal-text-major\">Enable VisualOps will override your custom User Data. Are you sure to continue?</div>\n    </div>\n</div>";
  };
TEMPLATE.confirm.enableState=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n  <div class=\"modal-text-major\"></div>\n  <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_EXPORT_CF_INFO", {hash:{},data:data}))
    + "</div>\n</div> </div>\n<div style=\"padding-top:20px;text-align:right;\">\n  <a class=\"btn btn-blue disabled\">"
    + escapeExpression(helpers.i18n.call(depth0, "HEAD_INFO_LOADING", {hash:{},data:data}))
    + "</a>\n  <button class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.export.CF=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\" style=\"padding:40px 20px;\">\n  <div class=\"modal-text-major\"></div>\n  <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BODY_EXPORT_AS_JSON", {hash:{},data:data}))
    + "</div>\n</div> </div>\n<div class=\"modal-footer\">\n  <a class=\"btn btn-blue modal-close\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\" download=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_DOWNLOAD", {hash:{},data:data}))
    + "</a>\n  <button id=\"tpl-cancel\" class=\"btn modal-close btn-silver\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_BTN_CANCEL", {hash:{},data:data}))
    + "</button>\n</div>";
  return buffer;
  };
TEMPLATE.export.JSON=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"loading-spinner\"></div>\n<section style=\"margin:10px 10px 0;max-height:420px;overflow:hidden;text-align:center;display:none;\"></section>\n<div class=\"modal-footer\">\n  <a class=\"btn btn-blue\" style=\"display: inline-block;\">Download</a>\n  <button class=\"btn modal-close btn-silver\">Cancel</button>\n</div>";
  };
TEMPLATE.export.PNG=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n  <div class=\"modal-text-major\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + " has unsaved changes.</div>\n  <div class=\"modal-text-major\">Do you confirm to close it?</div>\n</div> </div>";
  return buffer;
  };
TEMPLATE.modal.onClose=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n  <div class=\"modal-text-major\">This app has been changed.</div>\n  <div class=\"modal-text-major\">Do you conﬁrm to discard the changes?</div>\n</div> </div>";
  };
TEMPLATE.modal.cancelUpdate=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_INTRO_1", {hash:{},data:data}))
    + "</p>\n<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_INTRO_2", {hash:{},data:data}))
    + "</p>\n<div class=\"modal-center-align-helper\">\n    <div class=\"modal-control-group\">\n        <div id=\"replace_stack\" style=\"padding: 10px 0\">\n            <div class=\"radio\">\n                <input id=\"radio-replace-stack\" type=\"radio\" name=\"save-stack-type\" checked>\n                <label for=\"radio-replace-stack\"></label>\n            </div>\n            <label class=\"modal-text-minor\" for=\"radio-replace-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_REPLACE_STACK", {hash:{},data:data}))
    + "</label>\n            <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                "
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_REPLACE_STACK_INTRO", {hash:{},data:data}))
    + " \""
    + escapeExpression(((stack1 = (depth0 && depth0.input)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" "
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_REPLACE_STACK_INTRO_END", {hash:{},data:data}))
    + "\n            </div>\n        </div>\n        <div id=\"save_new_stack\">\n            <div class=\"radio\">\n                <input id=\"radio-new-stack\" type=\"radio\" name=\"save-stack-type\">\n                <label for=\"radio-new-stack\"></label>\n            </div>\n            <label class=\"modal-text-minor\" for=\"radio-new-stack\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_SAVE_NEW_STACK", {hash:{},data:data}))
    + "</label>\n            <div style=\"padding: 10px 22px\" class=\"radio-instruction hide\">\n                <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_SAVE_STACK_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n                <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stackName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_STACK_NAME_ERROR", {hash:{},data:data}))
    + "</div>\n            </div>\n        </div>\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.saveAppToStack=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('CanvasManager',['CloudResources'], function(CloudResources) {
    var CanvasManager;
    CanvasManager = {
      removeClass: function(element, theClass) {
        var klass, newKlass;
        if (element.length) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        klass = element.getAttribute("class") || "";
        newKlass = klass.replace(new RegExp("\\b" + theClass + "\\b", "g"), "");
        if (klass !== newKlass) {
          element.setAttribute("class", newKlass);
        }
        return this;
      },
      addClass: function(element, theClass) {
        var klass;
        if (element.length) {
          element = element[0];
        }
        if (!element) {
          return this;
        }
        klass = element.getAttribute("class") || "";
        if (!klass.match(new RegExp("\\b" + theClass + "\\b"))) {
          klass = $.trim(klass) + " " + theClass;
          element.setAttribute("class", klass);
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
          element.setAttribute("display", "inline");
          element.setAttribute("style", "");
          if (element.getAttribute("data-tooltip")) {
            this.addClass(element, "tooltip");
          }
        } else {
          element.setAttribute("display", "none");
          element.setAttribute("style", "opacity:0");
          this.removeClass(element, "tooltip");
        }
        return this;
      },
      updateEip: function(node, targetModel) {
        var imgUrl, res, resource_list, toggle, tootipStr;
        if (node.length) {
          node = node[0];
        }
        toggle = targetModel.hasPrimaryEip();
        if (toggle) {
          tootipStr = 'Detach Elastic IP from primary IP';
          imgUrl = 'ide/icon/eip-on.png';
        } else {
          tootipStr = 'Associate Elastic IP to primary IP';
          imgUrl = 'ide/icon/eip-off.png';
        }
        if (targetModel.design().modeIsApp() || targetModel.design().modeIsAppView()) {
          resource_list = CloudResources(targetModel.type, targetModel.design().region());
          res = resource_list.get(targetModel.get('appId'));
          if (toggle && res) {
            res = res != null ? res.toJSON() : void 0;
            if (res.privateIpAddressesSet && res.privateIpAddressesSet.item && res.privateIpAddressesSet.item.length) {
              res = res.privateIpAddressesSet.item[0];
              if (res.association && res.association) {
                tootipStr = res.association.publicIp || "";
              }
            } else {
              tootipStr = res.ipAddress || "";
            }
          } else {
            tootipStr = "";
          }
        }
        node.setAttribute("data-tooltip", tootipStr);
        $(node).data("tooltip", tootipStr);
        this.update(node, imgUrl, "href");
        return null;
      },
      update: function(element, value, attr) {
        var href;
        if (_.isString(element)) {
          element = document.getElementById(element);
        }
        element = $(element);
        if (!attr) {
          return element.text(MC.truncate(value, 17));
        } else if (attr === "href" || attr === "image") {
          value = MC.IMG_URL + value;
          href = element[0].getAttributeNS("http://www.w3.org/1999/xlink", "href");
          if (href !== value) {
            return element[0].setAttributeNS("http://www.w3.org/1999/xlink", "href", value);
          }
        } else if (attr === "tooltip") {
          element.data("tooltip", value).attr("data-tooltip", value);
          if (value) {
            return CanvasManager.addClass(element, "tooltip");
          } else {
            return CanvasManager.removeClass(element, "tooltip");
          }
        } else if (attr === "color") {
          return element.attr("style", "fill:" + value);
        } else {
          return element.attr(attr, value);
        }
      },
      size: function(node, w, h, oldw, oldh) {
        var $node, $ports, $wrap, child, childMap, deltaW, newX, newY, pad, transform, transformReg, x, y, _i, _j, _len, _len1;
        pad = 10;
        w *= MC.canvas.GRID_WIDTH;
        h *= MC.canvas.GRID_HEIGHT;
        oldw *= MC.canvas.GRID_WIDTH;
        deltaW = w - oldw;
        $node = $(node);
        $node.children("group").attr("width", w).attr("height", h);
        $ports = $node.children("path");
        transformReg = /translate\(([^)]+)\)/;
        for (_i = 0, _len = $ports.length; _i < _len; _i++) {
          child = $ports[_i];
          transform = transformReg.exec(child.getAttribute("class"));
          if (transform && transform[1]) {
            transform = transform[1].split(",");
            newX = x = parseInt(transform[0], 10);
            y = parseInt(transform[1], 10);
            newY = h / 2;
            if (x >= oldw) {
              newX += deltaW;
            }
            if (x !== newX || y !== newY) {
              this.position(child, newX, newY);
            }
          }
        }
        $wrap = $node.children('.resizer-wrap').children();
        if ($wrap.length) {
          childMap = {};
          for (_j = 0, _len1 = $wrap.length; _j < _len1; _j++) {
            child = $wrap[_j];
            childMap[child.getAttribute("class")] = child;
          }
          child = childMap["resizer-top"];
          if (child) {
            child.setAttribute("width", w - 2 * pad);
          }
          child = childMap["resizer-bottom"];
          if (child) {
            child.setAttribute("width", w - 2 * pad);
          }
          child = childMap["resizer-left"];
          if (child) {
            child.setAttribute("height", h - 2 * pad);
          }
          child = childMap["resizer-right"];
          if (child) {
            child.setAttribute("height", h - 2 * pad);
          }
          child = childMap["resizer-topright"];
          if (child) {
            child.setAttribute("x", w - pad);
          }
          child = childMap["resizer-bottomleft"];
          if (child) {
            child.setAttribute("y", h - pad);
          }
          child = childMap["resizer-bot"];
          if (child) {
            child.setAttribute("x", w - pad);
            return child.setAttribute("y", h - pad);
          }
        }
      },
      setPoisition: function(node, x, y) {
        var transformVal, translateVal;
        transformVal = node.transform.baseVal;
        if (transformVal.numberOfItems === 1) {
          transformVal.getItem(0).setTranslate(x * 10, y * 10);
        } else {
          translateVal = node.ownerSVGElement.createSVGTransform();
          translateVal.setTranslate(x * 10, y * 10);
          transformVal.appendItem(translateVal);
        }
        return null;
      },
      position: function(node, x, y, updateLine) {
        if (node.length) {
          node = node[0];
        }
        MC.canvas.position(node, x, y);
        return null;
      }
    };
    return CanvasManager;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CanvasElement',["CanvasManager", "event", "constant", "i18n!nls/lang.js", "CloudResources", "MC.canvas.constant"], function(CanvasManager, ide_event, constant, lang, CloudResources) {
    var CanvasElement, CanvasElementConstructors, Design;
    Design = null;
    CanvasElementConstructors = {};

    /*
     * Canvas interface of CanvasElement
     */
    CanvasElement = function(model, containerId) {
      this.id = model.id;
      this.model = model;
      this.type = model.type;
      this.containerId = containerId;
      if (model.parent) {
        this.parentId = model.parent();
        this.parentId = this.parentId ? this.parentId.id : "";
      } else {
        this.parentId = "";
      }
      if (model.node_group === true) {
        this.nodeType = "group";
      } else if (model.node_line === true) {
        this.nodeType = "line";
      } else {
        this.nodeType = "node";
      }
      return this;
    };
    CanvasElement.extend = function(Child, ElementType) {
      var CanvasElementPrototype;
      CanvasElementPrototype = function() {
        return null;
      };
      CanvasElementPrototype.prototype = this.prototype;
      Child.prototype = new CanvasElementPrototype();
      Child.prototype.constructor = Child;
      Child["super"] = this.prototype;
      CanvasElementConstructors[ElementType] = Child;
      return null;
    };
    CanvasElement.createView = function(type, model, containerId) {
      var CEC, m;
      CEC = CanvasElementConstructors[type];
      if (!CEC) {
        CEC = CanvasElement;
        m = {
          type: "Unknown",
          id: model
        };
      }
      return new CEC(m || model, containerId);
    };
    CanvasElement.prototype.constant = {
      PATH_PORT_LEFT: "M-8 0.5l6 -5.5l2 0 l0 11 l-2 0z",
      PATH_PORT_TOP: "M0.5 0l5.5 0l0 -2l-5.5 -6l-5.5 6l0 2z",
      PATH_PORT_RIGHT: "M8 0.5l-6 -5.5l-2 0 l0 11 l2 0z",
      PATH_PORT_BOTTOM: "M0.5 0l5.5 0l0 2l-5.5 6l-5.5 -6l0 -2z",
      PATH_PORT_DIAMOND: "M-5 0.5l5.5 -5.5l5.5 5.5 l-5.5 5.5z"
    };
    CanvasElement.constant = {
      PORT_RIGHT_ANGLE: 0,
      PORT_UP_ANGLE: 90,
      PORT_LEFT_ANGLE: 180,
      PORT_DOWN_ANGLE: 270
    };

    /*
     * CanvasElement Interface
     */
    CanvasElement.prototype.draw = function() {
      return null;
    };
    CanvasElement.prototype.getModel = function() {
      return this.model;
    };
    CanvasElement.prototype.element = function(id) {
      if (!id) {
        id = this.id;
      }
      return document.getElementById(id);
    };
    CanvasElement.prototype.$element = function(id) {
      return $(this.element());
    };
    CanvasElement.prototype.move = function(x, y) {
      if (x === this.model.x() && y === this.model.y()) {
        return;
      }
      return MC.canvas.move(this.element(), x, y);
    };
    CanvasElement.prototype.position = function(x, y) {
      var el, oldx, oldy;
      oldx = this.model.x();
      oldy = this.model.y();
      if ((x === void 0 || x === null) && (y === void 0 || y === null)) {
        return [oldx, oldy];
      }
      if (x === null || x === void 0) {
        x = oldx;
      }
      if (y === null || y === void 0) {
        y = oldy;
      }
      if (x === oldx && y === oldy) {
        return;
      }
      this.model.set({
        x: x,
        y: y
      });
      el = this.element();
      if (el) {
        MC.canvas.position(el, x, y);
      }
      return null;
    };
    CanvasElement.prototype.size = function(w, h) {
      var el, oldh, oldw;
      oldw = this.model.width();
      oldh = this.model.height();
      if ((w === void 0 || w === null) && (h === void 0 || h === null)) {
        return [oldw, oldh];
      }
      if (!this.model.node_group) {
        return;
      }
      if (w === null || w === void 0) {
        w = oldw;
      }
      if (h === null || h === void 0) {
        h = oldh;
      }
      if (w !== oldw || h !== oldh) {
        this.model.set({
          width: w,
          height: h
        });
      }
      el = this.element();
      if (el) {
        MC.canvas.groupSize(el, w, h);
      }
      return null;
    };
    CanvasElement.prototype.offset = function() {
      return this.element().getBoundingClientRect();
    };
    CanvasElement.prototype.port = function() {
      if (!this.ports) {
        this.ports = _.map(this.$element().children(".port"), function(el) {
          return el.getAttribute("data-name");
        });
      }
      return this.ports;
    };
    CanvasElement.prototype.isConnectable = function(fromPort, toId, toPort) {
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
    };
    CanvasElement.prototype.isRemovable = function() {
      var ch, res, _i, _len, _ref;
      res = this.model.isRemovable();
      if (res !== true) {
        return res;
      }
      if (this.nodeType === "group") {
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ch = _ref[_i];
          res = ch.isRemovable();
          if (res !== true) {
            break;
          }
        }
      }
      return res;
    };
    CanvasElement.prototype.remove = function() {
      var comp, comp_name, res, template;
      if (this.model.isRemoved()) {
        return;
      }
      res = this.isRemovable();
      comp = this.model;
      comp_name = comp.get("name");
      if (res === true && comp.children && comp.children().length > 0) {
        res = sprintf(lang.ide.CVS_CFM_DEL_GROUP, comp_name);
      }
      if (_.isString(res)) {
        template = MC.template.canvasOpConfirm({
          title: sprintf(lang.ide.CVS_CFM_DEL, comp_name),
          content: res
        });
        modal(template, true);
        $("#canvas-op-confirm").one("click", function() {
          if (!comp.isRemoved()) {
            comp.remove();
            $canvas.selected_node().length = 0;
            ide_event.trigger(ide_event.OPEN_PROPERTY);
          }
          return null;
        });
      } else if (res.error) {
        notification("error", res.error);
      } else if (res === true) {
        comp.remove();
        $canvas.selected_node().length = 0;
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        return true;
      }
      return false;
    };
    CanvasElement.prototype.reConnect = function() {
      var cn, v, _i, _len, _ref;
      _ref = this.model.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        v = cn.getCanvasView();
        if (v) {
          v.draw();
        }
      }
      return null;
    };
    CanvasElement.prototype.select = function() {
      if (this.type === "Unknown") {
        return;
      }
      this.doSelect(this.type, this.id, this.id);
      return true;
    };
    CanvasElement.prototype.doSelect = function(type, propertyId, canvasId) {
      ide_event.trigger(ide_event.OPEN_PROPERTY, type, propertyId);
      return MC.canvas.select(canvasId);
    };
    CanvasElement.prototype.connection = function() {
      var cn, cns, _i, _len, _ref;
      cns = [];
      _ref = this.model.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        if (cn.get("lineType")) {
          cns.push({
            line: cn.id,
            target: this.id,
            port: cn.port(this.id, "name")
          });
        }
      }
      return cns;
    };
    CanvasElement.prototype.toggleEip = function() {
      var toggle;
      console.assert(this.model.setPrimaryEip, "The component doesn't support setting EIP");
      toggle = !this.model.hasPrimaryEip();
      this.model.setPrimaryEip(toggle);
      if (toggle) {
        Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
      }
      ide_event.trigger(ide_event.PROPERTY_REFRESH_ENI_IP_LIST);
      return null;
    };
    CanvasElement.prototype.clone = function(parentId, x, y) {
      var attributes, createOption, design, name, nameMatch, parent, pos;
      design = this.model.design();
      if (!design.modeIsStack() && !design.modeIsAppEdit()) {
        return;
      }
      parent = design.component(parentId);
      if (!parent) {
        console.error("No parent is found when cloning object");
        return;
      }
      if (this.model.clone) {
        name = this.model.get("name");
        nameMatch = name.match(/(.+-copy)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-copy";
        }
        attributes = {
          parent: parent,
          name: name
        };
        pos = {
          x: x,
          y: y
        };
        createOption = {
          cloneSource: this.model
        };
        return $canvas.add(this.type, attributes, pos, createOption);
      }
    };
    CanvasElement.prototype.parent = function() {
      var p;
      p = this.model.parent();
      if (p) {
        return p.getCanvasView();
      } else {
        return null;
      }
    };
    CanvasElement.prototype.changeParent = function(parentId, execCB) {
      var oldPid, parent, res;
      if (parentId === "canvas") {
        parentId = "";
      }
      oldPid = this.model.parent();
      oldPid = oldPid ? oldPid.id : "";
      if (oldPid === parentId) {
        execCB.call(this);
        return false;
      }
      if (this.model.design().modeIsAppEdit() && this.model.get("appId")) {
        notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
        return;
      }
      parent = this.model.design().component(parentId);
      if (!parent) {
        console.warn("Cannot find parent when changing parent");
        return false;
      }
      res = this.model.isReparentable(parent);
      if (_.isString(res)) {
        notification("error", res);
      } else if (res === true) {
        parent.addChild(this.model);
        execCB.call(this);
        return true;
      }
      return false;
    };
    CanvasElement.prototype.children = function() {
      if (this.model.children) {
        return _.map(this.model.children() || [], function(c) {
          return c.getCanvasView();
        });
      } else {
        return [];
      }
    };
    CanvasElement.prototype.list = function() {
      var component, id, idx, instance_data, list, member, members, name, resource_list, state, _i, _len, _ref, _ref1;
      component = this.model;
      members = this.model.members ? this.model.members() : this.model.groupMembers();
      if (members.length === 0) {
        return [];
      }
      id = this.id;
      name = this.model.get("name");
      resource_list = CloudResources(this.model.type, this.model.design().region());

      /*
       * Quick hack for Lc
       */
      if (this.type !== constant.RESTYPE.LC) {
        if (this.type === constant.RESTYPE.INSTANCE) {
          instance_data = (_ref = resource_list.get(this.model.get("appId"))) != null ? _ref.toJSON() : void 0;
          state = instance_data ? instance_data.instanceState.name : "unknown";
        }
        list = [
          {
            id: id,
            name: name,
            appId: this.model.get("appId"),
            state: state || "",
            deleted: resource_list[this.model.get("appId")] ? "" : " deleted"
          }
        ];
        list.id = id;
        list.name = name;
      } else {
        list = [];
        list.id = this.model.parent().id;
        list.name = this.model.parent().get("name");
      }
      _ref1 = this.model.groupMembers();
      for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
        member = _ref1[idx];
        state = "";
        if (this.type === constant.RESTYPE.INSTANCE || this.type === constant.RESTYPE.LC) {
          instance_data = resource_list[member.appId];
          state = instance_data ? instance_data.instanceState.name : "unknown";
        }
        list.push({
          id: member.id,
          name: name,
          appId: member.appId,
          state: state,
          deleted: !this.model.design().modeIsStack() && !resource_list[this.model.get("appId")] ? " deleted" : ""
        });
      }
      return list;
    };
    CanvasElement.prototype.connectionData = function(portName) {
      return Design.modelClassForType("Framework_CN").connectionData(this.type, portName);
    };

    /*
     * Helper functions for rendering and for model
     */
    CanvasElement.prototype.getLayer = function(layerName) {
      return $("#" + layerName);
    };
    CanvasElement.prototype.portDirection = function(portName) {
      if (this.portDirMap) {
        return this.portDirMap[portName];
      } else {
        return null;
      }
    };
    CanvasElement.prototype.portPosition = function(portName) {
      if (this.portPosMap) {
        return this.portPosMap[portName];
      } else {
        return null;
      }
    };
    CanvasElement.prototype.initNode = function(node, x, y) {
      var child, name, pos, _i, _len, _ref;
      CanvasManager.position(node, x, y);
      if (node.length) {
        node = node[0];
      }
      _ref = node.children || node.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.tagName === "PATH" || child.tagName === "path") {
          name = child.getAttribute("data-alias") || child.getAttribute("data-name");
          if (name) {
            pos = this.portPosition(name);
            if (pos) {
              CanvasManager.setPoisition(child, pos[0] / 10, pos[1] / 10);
            }
          }
        }
      }
      return null;
    };
    CanvasElement.prototype.createNode = function(option) {
      var height, m, node, width, x, y;
      m = this.model;
      x = m.x();
      y = m.y();
      width = m.width() * MC.canvas.GRID_WIDTH;
      height = m.height() * MC.canvas.GRID_HEIGHT;
      node = Canvon.group().append(Canvon.rectangle(0, 0, width, height).attr({
        'class': 'node-background',
        'rx': 5,
        'ry': 5
      }), Canvon.image(MC.IMG_URL + option.image, option.imageX, option.imageY, option.imageW, option.imageH)).attr({
        'id': option.id || this.id,
        'class': 'dragable node ' + this.type.replace(/\./g, "-"),
        'data-type': 'node',
        'data-class': this.type
      });
      if (option.labelBg) {
        node.append(Canvon.rectangle(2, 76, 86, 13).attr({
          'class': 'node-label-name-bg',
          'rx': 3,
          'ry': 3
        }));
      }
      if (option.label) {
        node.append(Canvon.text(width / 2, height - 4, MC.truncate(option.label, 17)).attr({
          'class': 'node-label' + (option.labelBg ? ' node-label-name' : '')
        }));
      }
      if (option.sg) {
        node.append(Canvon.group().append(Canvon.rectangle(10, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(20, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(30, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(40, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        }), Canvon.rectangle(50, 6, 7, 5).attr({
          'class': 'node-sg-color-border tooltip'
        })).attr({
          'class': 'node-sg-color-group',
          'transform': 'translate(8, 62)'
        }));
      }
      return node;
    };
    CanvasElement.prototype.createGroup = function(name) {
      var height, m, pad, text_pos, width, x, y;
      m = this.model;
      x = m.x();
      y = m.y();
      width = m.width() * MC.canvas.GRID_WIDTH;
      height = m.height() * MC.canvas.GRID_HEIGHT;
      text_pos = {
        'AWS.VPC.VPC': [6, 16],
        'AWS.EC2.AvailabilityZone': [4, 14],
        'AWS.VPC.Subnet': [4, 14],
        'AWS.AutoScaling.Group': [4, 14]
      }[m.type];
      pad = 10;
      return Canvon.group().append(Canvon.rectangle(0, 0, width, height).attr({
        'class': 'group',
        'rx': 5,
        'ry': 5
      }), Canvon.group().append(Canvon.rectangle(pad, 0, width - 2 * pad, pad).attr({
        'class': 'group-resizer resizer-top',
        'data-direction': 'top'
      }), Canvon.rectangle(0, pad, pad, height - 2 * pad).attr({
        'class': 'group-resizer resizer-left',
        'data-direction': 'left'
      }), Canvon.rectangle(width - pad, pad, pad, height - 2 * pad).attr({
        'class': 'group-resizer resizer-right',
        "data-direction": "right"
      }), Canvon.rectangle(pad, height - pad, width - 2 * pad, pad).attr({
        'class': 'group-resizer resizer-bottom',
        "data-direction": "bottom"
      }), Canvon.rectangle(0, 0, pad, pad).attr({
        'class': 'group-resizer resizer-topleft',
        "data-direction": "topleft"
      }), Canvon.rectangle(width - pad, 0, pad, pad).attr({
        'class': 'group-resizer resizer-topright',
        "data-direction": "topright"
      }), Canvon.rectangle(0, height - pad, pad, pad).attr({
        'class': 'group-resizer resizer-bottomleft',
        "data-direction": "bottomleft"
      }), Canvon.rectangle(width - pad, height - pad, pad, pad).attr({
        'class': 'group-resizer resizer-bottomright',
        "data-direction": "bottomright"
      })).attr({
        'class': 'resizer-wrap'
      }), Canvon.text(text_pos[0], text_pos[1], name).attr({
        'class': 'group-label name'
      })).attr({
        'id': this.id,
        'class': 'dragable ' + this.type.replace(/\./g, "-"),
        'data-type': 'group',
        'data-class': this.type
      });
    };
    CanvasElement.prototype.updateAppState = function() {
      var data, design, m, res_list;
      m = this.model;
      design = m.design();
      if (design.modeIsStack() || !m.get("appId")) {
        return;
      }
      CanvasManager.removeClass(this.element(), "deleted");
      if (m.type && design.region()) {
        res_list = CloudResources(m.type, design.region());
        data = res_list.get(m.get('appId'));
        if (!data) {
          CanvasManager.addClass(this.element(), "deleted");
        }
      }
      return null;
    };
    CanvasElement.prototype.updatexGWAppState = function() {
      var data, design, el, m, res_list;
      m = this.model;
      design = m.design();
      if (m.design().modeIsStack() || !m.get("appId")) {
        return;
      }
      el = this.element();
      CanvasManager.removeClass(el, "deleted");
      if (m.type && design.region()) {
        res_list = CloudResources(m.type, design.region());
        data = res_list.get(m.get('appId'));
      }
      if (data) {
        if (m.get("appId").indexOf("igw-") === 0) {
          if (!(data.get("state") === "available" && data.get("vpcId") === m.parent().get("appId"))) {
            CanvasManager.addClass(el, "deleted");
          }
        } else if (m.get("appId").indexOf("vgw-") === 0) {
          if (!(data.get("state") === "available" && data.get("attachmentState") === "attached" && data.get("vpcId") === m.parent().get("appId"))) {
            CanvasManager.addClass(el, "deleted");
          }
        } else if (m.get("appId").indexOf("cgw-") === 0) {
          if (data.get("state") !== "available") {
            CanvasManager.addClass(el, "deleted");
          }
        }
      } else {
        CanvasManager.addClass(el, "deleted");
      }
      return null;
    };
    CanvasElement.prototype.detach = function() {
      return MC.canvas.remove(this.element());
    };
    CanvasElement.setDesign = function(design) {
      Design = design;
      return null;
    };
    return CanvasElement;
  });

}).call(this);

(function() {
  define('workspaces/editor/framework/canvasview/CanvasAdaptor',["./CanvasElement", "event", 'i18n!nls/lang.js', "constant", "UI.notification"], function(CanvasElement, ide_event, lang, constant) {
    var $canvas, Canvas, CanvasEvent, Design;
    Design = null;

    /* $canvas is a adaptor for MC.canvas.js */
    $canvas = function(id, defaultType) {
      var component, type, view;
      component = Design.__instance.component(id);
      if (component) {
        view = component.getCanvasView();
      }
      if (!view) {
        console.debug("Creating an view for an unfound component : ", defaultType, id);
        type = component ? component.type : defaultType;
        view = CanvasElement.createView(type, component || id);
      }
      return view;
    };
    $canvas.size = function(w, h) {
      if (Design.__instance) {
        return Design.__instance.canvas.size(w, h);
      } else {
        return [240, 240];
      }
    };
    $canvas.scale = function(ratio) {
      return Design.__instance.canvas.scale(ratio);
    };
    $canvas.offset = function() {
      return $(document.getElementById("svg_canvas")).offset();
    };
    $canvas.selected_node = function() {
      if (Design.__instance) {
        return Design.__instance.canvas.selectedNode;
      } else {
        return null;
      }
    };
    $canvas.updateLineStyle = function(ls) {
      if (Design.__instance.shouldDraw()) {
        _.each(Design.modelClassForType("SgRuleLine").allObjects(), function(cn) {
          return cn.draw();
        });
      }
      return null;
    };
    $canvas.lineStyle = function() {
      var ls;
      ls = parseInt(localStorage.getItem("canvas/lineStyle"));
      if (isNaN(ls)) {
        return 2;
      } else {
        return 0;
      }
    };
    $canvas.node = function() {
      var comp, id, nodes, _ref;
      nodes = [];
      _ref = Design.__instance.__canvasNodes;
      for (id in _ref) {
        comp = _ref[id];
        if (!comp.isVisual || comp.isVisual()) {
          nodes.push(comp.getCanvasView());
        }
      }
      return nodes;
    };
    $canvas.group = function() {
      return _.map(Design.__instance.__canvasGroups, function(comp) {
        return comp.getCanvasView();
      });
    };
    $canvas.clearSelected = function() {
      MC.canvas.event.clearSelected();
      ide_event.trigger(ide_event.OPEN_PROPERTY);
      return null;
    };
    $canvas.trigger = function(event) {
      console.assert(_.isString(event), "Invalid parameter : event ");
      if (CanvasEvent[event]) {
        CanvasEvent[event].apply(this, Array.prototype.slice.call(arguments, 1));
      }
      return null;
    };
    $canvas.add = function(type, attributes, pos, createOption) {
      var Model, m, parent;
      attributes = $.extend({
        x: Math.round(pos.x),
        y: Math.round(pos.y)
      }, attributes);
      parent = attributes.parent;
      if (!parent) {
        parent = Design.__instance.component(attributes.groupUId);
        attributes.parent = parent;
        delete attributes.groupUId;
      }
      if (parent) {
        if (parent.type === constant.RESTYPE.ASG) {
          attributes.x = parent.x() + 2;
          attributes.y = parent.y() + 3;
          type = constant.RESTYPE.LC;
        } else if (parent.type === "ExpandedAsg") {
          return false;
        }
      }
      Model = Design.modelClassForType(type);
      createOption = $.extend({
        createByUser: true
      }, createOption || {});
      m = new Model(attributes, createOption);
      if (createOption.selectId) {
        $canvas(createOption.selectId, true).select();
      } else if (m.id) {
        $canvas(m.id, true).select();
      }
      return m.id;
    };
    $canvas.connect = function(p1, p1Name, p2, p2Name) {
      var C, DefaultCreateOption, c, comp1, comp2, res;
      C = Design.modelClassForPorts(p1Name, p2Name);
      console.assert(C, "Cannot found Class for type: " + p1Name + ">" + p2Name);
      comp1 = Design.instance().component(p1);
      comp2 = Design.instance().component(p2);
      res = C.isConnectable(comp1, comp2);
      DefaultCreateOption = {
        createByUser: true
      };
      if (_.isString(res)) {
        notification("error", res);
      } else if (res === true) {
        c = new C(comp1, comp2, void 0, DefaultCreateOption);
        if (c.id) {
          $canvas(c.id, true).select();
        }
        return true;
      } else if (res === false) {
        return false;
      } else if (res.confirm) {
        modal(MC.template.modalCanvasConfirm(res), true);
        $("#canvas-op-confirm").one("click", function() {
          c = new C(comp1, comp2, void 0, DefaultCreateOption);
          if (c.id) {
            $canvas(c.id, true).select();
          }
          return null;
        });
      }
      return false;
    };
    $canvas.connection = function(line_uid) {
      var cache, l, line, lineArray, uid;
      if (line_uid) {
        cache = {
          uid: Design.__instance.component(line_uid)
        };
      } else {
        cache = Design.__instance.__canvasLines;
      }
      lineArray = {};
      for (uid in cache) {
        line = cache[uid];
        l = {
          type: line.get("lineType"),
          target: {}
        };
        l.target[line.port1Comp().id] = line.port1("name");
        l.target[line.port2Comp().id] = line.port2("name");
        lineArray[uid] = l;
      }
      if (line_uid) {
        return lineArray.uid;
      } else {
        return lineArray;
      }
    };
    $canvas.hasVPC = function() {
      return !!Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
    };
    CanvasEvent = {
      CANVAS_NODE_SELECTED: function() {
        ide_event.trigger(ide_event.OPEN_PROPERTY);
        return null;
      },
      SHOW_STATE_EDITOR: function(uid) {
        ide_event.trigger(ide_event.SHOW_STATE_EDITOR, uid);
        return null;
      },
      SHOW_PROPERTY_PANEL: function() {
        ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY, 'property');
        return null;
      },
      CANVAS_PLACE_OVERLAP: function() {
        notification('warning', lang.ide.CVS_MSG_WARN_COMPONENT_OVERLAP, false);
        return null;
      },
      CANVAS_ZOOMED_DROP_ERROR: function() {
        notification('warning', lang.ide.CVS_MSG_ERR_ZOOMED_DROP_ERROR);
        return null;
      },
      CANVAS_SAVE: function() {
        $("#OpsEditor").trigger("SAVE");
        return false;
      },
      CANVAS_PLACE_NOT_MATCH: function(param) {
        var info, l, res_type;
        res_type = constant.RESTYPE;
        l = lang.ide;
        switch (param.type) {
          case res_type.VOL:
            info = l.CVS_MSG_WARN_NOTMATCH_VOLUME;
            break;
          case res_type.SUBNET:
            info = l.CVS_MSG_WARN_NOTMATCH_SUBNET;
            break;
          case res_type.INSTANCE:
            info = l.CVS_MSG_WARN_NOTMATCH_INSTANCE_SUBNET;
            break;
          case res_type.ENI:
            info = l.CVS_MSG_WARN_NOTMATCH_ENI;
            break;
          case res_type.RT:
            info = l.CVS_MSG_WARN_NOTMATCH_RTB;
            break;
          case res_type.ELB:
            info = l.CVS_MSG_WARN_NOTMATCH_ELB;
            break;
          case res_type.CGW:
            info = l.CVS_MSG_WARN_NOTMATCH_CGW;
            break;
          case res_type.ASG:
            info = l.CVS_MSG_WARN_NOTMATCH_ASG;
        }
        if (info) {
          notification('warning', info, false);
        }
        return null;
      },
      STATE_ICON_CLICKED: function(uid) {
        return ide_event.trigger(ide_event.OPEN_STATE_EDITOR, uid);
      }
    };
    window.$canvas = $canvas;

    /* Canvas is used by $canvas to store data of svg canvas */
    Canvas = function(size) {
      this.sizeAry = size || [240, 240];
      this.offsetAry = [0, 0];
      this.scaleAry = 1;
      this.selectedNode = [];
      return this;
    };
    Canvas.prototype.init = function() {
      var attr;
      attr = {
        'width': this.sizeAry[0] * MC.canvas.GRID_WIDTH,
        'height': this.sizeAry[1] * MC.canvas.GRID_HEIGHT
      };
      $('#svg_canvas').attr(attr);
      $('#canvas_body').css(attr);
    };
    Canvas.prototype.scale = function(ratio) {
      if (ratio === void 0) {
        return this.scaleAry;
      }
      this.scaleAry = ratio;
      return null;
    };
    Canvas.prototype.offset = function(x, y) {
      if (x === void 0) {
        return this.offsetAry;
      }
      this.offsetAry[0] = x;
      this.offsetAry[1] = y;
      return null;
    };
    Canvas.prototype.size = function(w, h) {
      if (w === void 0) {
        return this.sizeAry;
      }
      this.sizeAry[0] = w;
      this.sizeAry[1] = h;
      return null;
    };
    Canvas.setDesign = function(design) {
      Design = design;
      CanvasElement.setDesign(design);
      Design.on(Design.EVENT.RemoveResource, function(resource) {
        var selected;
        selected = $canvas.selected_node()[0];
        if (selected && selected.id === resource.id) {
          ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY, 'property');
          return null;
        }
      });
      return null;
    };
    return Canvas;
  });

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('Design',["constant", "OpsModel", "workspaces/editor/framework/canvasview/CanvasAdaptor", 'CloudResources'], function(constant, OpsModel, CanvasAdaptor, CloudResources) {
    var Design, DesignImpl, PropertyDefination, createRecursiveCheck, diffHelper, noop;
    PropertyDefination = {
      policy: {
        ha: ""
      },
      lease: {
        action: "",
        length: null,
        due: null
      },
      schedule: {
        stop: {
          run: null,
          when: null,
          during: null
        },
        backup: {
          when: null,
          day: null
        },
        start: {
          when: null
        }
      }
    };

    /* env:prod */
    createRecursiveCheck = function() {
      return createRecursiveCheck.o || (createRecursiveCheck.o = {
        check: function() {}
      });
    };

    /* env:prod:end */

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                         env:dev:end */
    noop = function() {};

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
    Design = function(opsModel) {
      var design, json;
      design = (new DesignImpl(opsModel)).use();
      json = opsModel.getJsonData();
      design.deserialize($.extend(true, {}, json.component), $.extend(true, {}, json.layout));
      return design;
    };
    _.extend(Design, Backbone.Events);
    Design.__modelClassMap = {};
    Design.__resolveFirstMap = {};
    Design.__serializeVisitors = [];
    Design.__deserializeVisitors = [];
    Design.__instance = null;
    DesignImpl = function(opsModel) {
      var canvas_data, component, layout;
      this.__componentMap = {};
      this.__canvasNodes = {};
      this.__canvasLines = {};
      this.__canvasGroups = {};
      this.__classCache = {};
      this.__usedUidCache = {};
      this.__opsModel = opsModel;
      this.__shoulddraw = false;
      canvas_data = opsModel.getJsonData();
      this.canvas = new CanvasAdaptor(canvas_data.layout.size);
      this.__mode = Design.MODE.App;
      if (opsModel.testState(OpsModel.State.UnRun)) {
        this.__mode = Design.MODE.Stack;
      } else if (opsModel.isImported()) {
        this.__mode = Design.MODE.AppView;
      }
      component = canvas_data.component;
      layout = canvas_data.layout;
      delete canvas_data.component;
      delete canvas_data.layout;
      this.attributes = $.extend(true, {}, canvas_data);
      canvas_data.component = component;
      canvas_data.layout = layout;
      this.on(Design.EVENT.AwsResourceUpdated, this.onAwsResourceUpdated);
      return null;
    };
    Design.TYPE = {
      Classic: "ec2-classic",
      Vpc: "ec2-vpc",
      DefaultVpc: "default-vpc",
      CustomVpc: "custom-vpc"
    };
    Design.MODE = {
      Stack: "stack",
      App: "app",
      AppEdit: "appedit",
      AppView: "appview"
    };
    Design.EVENT = {
      Deserialized: "DESERIALIZED",
      AwsResourceUpdated: "AWS_RESOURCE_UPDATED",
      AzUpdated: "AZ_UPDATED",
      AddResource: "ADD_RESOURCE",
      RemoveResource: "REMOVE_RESOURCE"
    };
    DesignImpl.prototype.refreshAppUpdate = function() {
      var needRefresh;
      needRefresh = [constant.RESTYPE.ASG];
      this.eachComponent(function(component) {
        var _ref;
        if (_ref = component.type, __indexOf.call(needRefresh, _ref) >= 0) {
          return component.draw();
        }
      });
      return null;
    };
    DesignImpl.prototype.deserialize = function(json_data, layout_data) {
      var ModelClass, comp, devistor, recursiveCheck, resolveDeserialize, that, uid, version, _i, _len, _old_get_component_, _ref;
      console.debug("Deserializing data :", [json_data, layout_data]);
      version = this.get("version");
      _ref = Design.__deserializeVisitors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        devistor = _ref[_i];
        devistor(json_data, layout_data, version);
      }
      Design.trigger = noop;
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
        ModelClass.deserialize(component_data, layout_data[uid], resolveDeserialize);
        return Design.__instance.__componentMap[uid];
      };
      _old_get_component_ = this.component;
      this.component = null;
      for (uid in json_data) {
        comp = json_data[uid];
        this.__usedUidCache[uid] = true;
        if (Design.__resolveFirstMap[comp.type] === true) {
          ModelClass = Design.modelClassForType(comp.type);
          if (!ModelClass) {
            console.warn("We do not support deserializing resource of type : " + component_data.type);
            continue;
          }
          if (!ModelClass.preDeserialize) {
            console.error("The class is marked as resolveFirst, yet it doesn't implement preDeserialize()");
            continue;
          }
          ModelClass.preDeserialize(comp, layout_data[uid]);
        }
      }
      this.component = resolveDeserialize;
      for (uid in json_data) {
        comp = json_data[uid];
        if (Design.__resolveFirstMap[comp.type] === true) {
          recursiveCheck = createRecursiveCheck(uid);
          Design.modelClassForType(comp.type).deserialize(comp, layout_data[uid], resolveDeserialize);
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
          ModelClass.postDeserialize(comp, layout_data[uid]);
        }
      }
      return null;
    };
    DesignImpl.prototype.finishDeserialization = function() {
      var comp, lines, uid, _i, _len, _ref;
      this.__shoulddraw = true;
      lines = [];
      _ref = this.__componentMap;
      for (uid in _ref) {
        comp = _ref[uid];
        if (!comp.draw) {
          continue;
        }
        if (comp.node_line) {
          lines.push(comp);
        } else {
          comp.draw(true);
        }
      }
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        comp = lines[_i];
        comp.draw(true);
      }
      Design.trigger = Backbone.Events.trigger;
      Design.trigger(Design.EVENT.Deserialized);
      return null;
    };

    /* Private Interface */
    Design.registerModelClass = function(type, modelClass, resolveFirst) {
      this.__modelClassMap[type] = modelClass;
      if (resolveFirst) {
        this.__resolveFirstMap[type] = resolveFirst;
      }
      return null;
    };
    DesignImpl.prototype.classCacheForCid = function(cid) {
      var cache;
      if (this.__classCache[cid]) {
        return this.__classCache[cid];
      }
      cache = this.__classCache[cid] = [];
      return cache;
    };
    DesignImpl.prototype.cacheComponent = function(id, comp) {
      if (!comp) {
        comp = this.__componentMap;
        delete this.__componentMap[id];
        delete this.__canvasGroups[id];
        delete this.__canvasNodes[id];
        if (this.modeIsAppEdit()) {
          this.reclaimGuid(id);
        }
      } else {
        this.__componentMap[id] = comp;
        if (comp.isVisual && comp.isVisual()) {
          if (comp.node_group) {
            this.__canvasGroups[id] = comp;
          } else if (comp.node_line) {
            this.__canvasLines[id] = comp;
          } else {
            this.__canvasNodes[id] = comp;
          }
        }
      }
      return null;
    };
    Design.registerSerializeVisitor = function(func) {
      this.__serializeVisitors.push(func);
      return null;
    };
    Design.registerDeserializeVisitor = function(func) {
      this.__deserializeVisitors.push(func);
      return null;
    };

    /* Private Interface End */
    Design.instance = function() {
      return this.__instance;
    };
    Design.modelClassForType = function(type) {
      return this.__modelClassMap[type];
    };
    Design.modelClassForPorts = function(port1, port2) {
      var type;
      if (port1 < port2) {
        type = port1 + ">" + port2;
      } else {
        type = port2 + ">" + port1;
      }
      return this.__modelClassMap[type];
    };
    Design.lineModelClasses = function() {
      var cs, modelClass, type, _ref;
      if (this.__lineModelClasses) {
        return this.__lineModelClasses;
      }
      this.__lineModelClasses = cs = [];
      _ref = this.__modelClassMap;
      for (type in _ref) {
        modelClass = _ref[type];
        if (modelClass.__isLineClass && type.indexOf(">") === -1) {
          cs.push(modelClass);
        }
      }
      return this.__lineModelClasses;
    };
    DesignImpl.prototype.reclaimGuid = function(guid) {
      return delete this.__usedUidCache[guid];
    };
    DesignImpl.prototype.guid = function() {
      var newId;
      newId = MC.guid();
      while (this.__usedUidCache[newId]) {
        console.warn("GUID collision detected, the generated GUID is " + newId + ". Try generating a new one.");
        newId = MC.guid();
      }
      this.__usedUidCache[newId] = true;
      return newId;
    };
    DesignImpl.prototype.set = function(key, value) {
      this.attributes[key] = value;
      this.trigger("change:" + key);
      this.trigger("change");
    };
    DesignImpl.prototype.get = function(key) {
      if (key === "id") {
        return this.__opsModel.get("id");
      } else if (key === "state") {
        return this.__opsModel.getStateDesc();
      } else {
        return this.attributes[key];
      }
    };
    DesignImpl.prototype.type = function() {
      return Design.TYPE.Vpc;
    };
    DesignImpl.prototype.region = function() {
      return this.attributes.region;
    };
    DesignImpl.prototype.modeIsStack = function() {
      return this.__mode === Design.MODE.Stack;
    };
    DesignImpl.prototype.modeIsApp = function() {
      return this.__mode === Design.MODE.App;
    };
    DesignImpl.prototype.modeIsAppView = function() {
      return this.__mode === Design.MODE.AppView;
    };
    DesignImpl.prototype.modeIsAppEdit = function() {
      return this.__mode === Design.MODE.AppEdit;
    };
    DesignImpl.prototype.setMode = function(m) {
      this.__mode = m;
    };
    DesignImpl.prototype.mode = function() {
      console.warn("Better not to use Design.instance().mode() directly.");
      return this.__mode;
    };
    DesignImpl.prototype.shouldDraw = function() {
      return this.__shoulddraw;
    };
    DesignImpl.prototype.use = function() {
      Design.__instance = this;
      return this;
    };
    DesignImpl.prototype.component = function(uid) {
      return this.__componentMap[uid];
    };
    DesignImpl.prototype.componentsOfType = function(type) {
      return this.classCacheForCid(Design.modelClassForType(type).prototype.classId).slice(0);
    };
    DesignImpl.prototype.eachComponent = function(func, context) {
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
    };
    DesignImpl.prototype.isModified = function(newData, showDetail) {
      var backing, dataToCompare;
      if (this.modeIsApp() || this.modeIsAppView()) {
        console.warn("Testing Design.isModified() in app mode and visualize mode. This should not be happening.");
        return false;
      }
      dataToCompare = newData || this.attributes;
      backing = this.__opsModel.getJsonData();
      if (showDetail) {
        return this.__isModifiedDetail(dataToCompare, backing);
      }
      if (dataToCompare.name !== backing.name) {
        return true;
      }
      if (!newData) {
        newData = this.serialize();
      }
      if (_.isEqual(backing.component, newData.component)) {
        if (_.isEqual(backing.layout, newData.layout)) {
          return false;
        }
      }
      return true;
    };
    DesignImpl.prototype.__isModifiedDetail = function(newData, oldData) {
      var backingState, comp, dataState, result, state, uid, __bsBackup, __dtBackup, __opsModel, _ref, _ref1;
      backingState = {};
      dataState = {};
      if (!newData.component) {
        newData = this.serialize();
      }
      console.assert(__bsBackup = $.extend(true, {}, oldData));
      console.assert(__dtBackup = $.extend(true, {}, newData));
      _ref = oldData.component;
      for (uid in _ref) {
        comp = _ref[uid];
        if (comp.type === constant.RESTYPE.LC || comp.type === constant.RESTYPE.INSTANCE) {
          backingState[uid] = comp.state;
          delete comp.state;
        }
      }
      _ref1 = newData.component;
      for (uid in _ref1) {
        comp = _ref1[uid];
        if (comp.type === constant.RESTYPE.LC || comp.type === constant.RESTYPE.INSTANCE) {
          dataState[uid] = comp.state;
          delete comp.state;
        }
      }
      result = {
        attribute: newData.name !== oldData.name,
        component: !_.isEqual(oldData.component, newData.component),
        layout: !_.isEqual(oldData.layout, newData.layout),
        instanceState: !_.isEqual(backingState, dataState)
      };
      for (uid in backingState) {
        state = backingState[uid];
        oldData.component[uid].state = state;
      }
      for (uid in dataState) {
        state = dataState[uid];
        newData.component[uid].state = state;
      }
      console.assert(_.isEqual(oldData, __bsBackup), "BackingStore Modified.");
      console.assert(_.isEqual(newData, __dtBackup), "Data Modified.");
      if (result.attribute || result.component || result.layout || result.instanceState) {
        __opsModel = this.__opsModel;
        return $.extend(result, {
          result: this.diff(newData, oldData),
          isRunning: __opsModel.testState(OpsModel.State.Running),
          isModified: true,
          newData: newData
        });
      } else {
        return false;
      }
    };
    DesignImpl.prototype.serialize = function(options) {
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
          json = comp.serialize();

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
      _ref1 = Design.__serializeVisitors;
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        visitor = _ref1[_k];
        visitor(component_data, layout_data, options);
      }
      data.layout.size = this.canvas.sizeAry;
      data.property = $.extend({
        stoppable: this.isStoppable()
      }, PropertyDefination);
      data.version = "2014-02-17";
      data.state = this.__opsModel.getStateDesc() || "Enabled";
      data.id = this.__opsModel.get("id");
      currentDesignObj.use();
      return data;
    };
    DesignImpl.prototype.serializeAsStack = function(new_name) {
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
      return json;
    };
    DesignImpl.prototype.getUidByProperty = function(property, value, res_type) {
      var comp, context, json_data, key, last, namespaces, result, uid, _i, _len, _ref;
      if (res_type == null) {
        res_type = null;
      }
      if (!property) {
        return;
      }
      json_data = this.serialize();
      result = {};
      if (json_data && json_data.component) {
        _ref = json_data.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (res_type === null || comp.type === res_type) {
            context = comp;
            namespaces = property.split('.');
            last = namespaces.pop();
            for (_i = 0, _len = namespaces.length; _i < _len; _i++) {
              key = namespaces[_i];
              context = context[key];
            }
            if (context[last] === value) {
              if (!result[comp.type]) {
                result[comp.type] = [];
              }
              result[comp.type].push(uid);
            }
          }
        }
      }
      return result;
    };
    DesignImpl.prototype.getCost = function() {
      var c, comp, cost, costList, currency, priceMap, totalFee, uid, _i, _len, _ref;
      costList = [];
      totalFee = 0;
      priceMap = App.model.getPriceData(this.region());
      if (priceMap) {
        currency = priceMap.currency || 'USD';
        _ref = this.__componentMap;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.getCost) {
            cost = comp.getCost(priceMap, currency);
            if (!cost) {
              continue;
            }
            if (cost.length) {
              for (_i = 0, _len = cost.length; _i < _len; _i++) {
                c = cost[_i];
                totalFee += c.fee;
                costList.push(c);
              }
            } else {
              totalFee += cost.fee;
              costList.push(cost);
            }
          }
        }
        costList = _.sortBy(costList, "resource");
      }
      return {
        costList: costList,
        totalFee: Math.round(totalFee * 100) / 100
      };
    };
    diffHelper = function(newComp, oldComp, result, newComponents, oldComponents) {
      var Model, changeObj, e, r;
      changeObj = newComp || oldComp;
      Model = Design.modelClassForType(changeObj.type);
      if (Model.diffJson) {
        try {
          r = Model.diffJson(newComp, oldComp, newComponents, oldComponents);
        } catch (_error) {
          e = _error;
          console.log(e);
          r = null;
        }
        if (r) {
          if (r.id) {
            result.push(r);
          } else {
            console.error("Invalid return value when diffing json.");
          }
        }
        return;
      }
      changeObj = {
        type: changeObj.type,
        name: changeObj.name,
        id: changeObj.uid
      };
      if (!newComp) {
        changeObj.change = "Delete";
      } else if (!oldComp) {
        changeObj.change = "Create";
      } else if (!_.isEqual(newComp.resource, oldComp.resource)) {
        changeObj.change = "Modify";
      }
      if (changeObj.change) {
        result.push(changeObj);
      }
      return null;
    };
    DesignImpl.prototype.diff = function(newData, oldData) {

      /* Diff the Component first */
      var c, comp, dedupMap, dedupResult, exist, obj, result, uid, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      result = [];
      _ref = newData.component;
      for (uid in _ref) {
        comp = _ref[uid];
        diffHelper(comp, oldData.component[uid], result, newData.component, oldData.component);
      }
      _ref1 = oldData.component;
      for (uid in _ref1) {
        comp = _ref1[uid];
        if (newData.component[uid]) {
          continue;
        }
        diffHelper(void 0, comp, result, newData.component, oldData.component);
      }
      dedupResult = [];
      dedupMap = {};
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        obj = result[_i];
        if (constant.RESNAME[obj.type]) {
          obj.type = constant.RESNAME[obj.type];
        }
        exist = dedupMap[obj.id];
        if (!exist) {
          exist = dedupMap[obj.id] = obj;
          dedupResult.push(obj);
        } else if (obj.change && obj.change !== "Update") {
          exist.change = obj.change;
        }
        if (obj.changes) {
          exist.changes = obj.changes;
          _ref2 = obj.changes;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            c = _ref2[_j];
            c.info = c.name;
            if (c.count < 0) {
              c.info = c.name + " " + c.count;
            } else if (c.count > 0) {
              c.info = c.name + " +" + c.count;
            }
          }
        }
        if (exist.change === "Delete") {
          exist.info = exist.info || "Deletion cannot be rolled back";
        } else if (exist.change === "Terminate") {
          exist.info = exist.info || "Termination cannot be rolled back";
        }
      }
      return dedupResult;
    };
    DesignImpl.prototype.isStoppable = function() {
      var InstanceModel, LcModel, allObjects, ami, comp, _i, _len;
      InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
      LcModel = Design.modelClassForType(constant.RESTYPE.LC);
      allObjects = InstanceModel.allObjects(this).concat(LcModel.allObjects(this));
      for (_i = 0, _len = allObjects.length; _i < _len; _i++) {
        comp = allObjects[_i];
        ami = comp.getAmi() || comp.get("cachedAmi");
        if (ami && ami.rootDeviceType === 'instance-store') {
          return false;
        }
      }
      return true;
    };
    DesignImpl.prototype.onAwsResourceUpdated = function() {
      var comp, uid, _ref;
      if (this.modeIsStack()) {
        return;
      }
      _ref = this.__componentMap;
      for (uid in _ref) {
        comp = _ref[uid];
        if (comp.node_line || comp.node_group) {
          continue;
        }
        if (comp.draw) {
          comp.draw();
        }
      }
      return null;
    };
    DesignImpl.prototype.instancesNoUserData = function() {
      var instanceModels, lcModels, result;
      result = true;
      instanceModels = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
      _.each(instanceModels, function(instanceModel) {
        result = instanceModel.get('userData') ? false : true;
        return null;
      });
      lcModels = Design.modelClassForType(constant.RESTYPE.LC).allObjects();
      _.each(lcModels, function(lcModel) {
        result = lcModel.get('userData') ? false : true;
        return null;
      });
      return result;
    };
    _.extend(DesignImpl.prototype, Backbone.Events);
    DesignImpl.prototype.on = function(event) {
      if (event === Design.EVENT.AwsResourceUpdated && this.modeIsStack()) {
        return;
      }
      return Backbone.Events.on.apply(this, arguments);
    };
    CanvasAdaptor.setDesign(Design);

    /* env:dev                                            env:dev:end */

    /* env:debug */
    Design.DesignImpl = DesignImpl;

    /* env:debug:end */
    return Design;
  });

}).call(this);

(function() {
  define('workspaces/editor/subviews/Toolbar',["OpsModel", "../template/TplOpsEditor", "ThumbnailUtil", "JsonExporter", "ApiRequest", "i18n!nls/lang.js", "UI.modalplus", 'kp_dropdown', 'constant', 'event', 'component/trustedadvisor/main', "UI.notification", "backbone"], function(OpsModel, OpsEditorTpl, Thumbnail, JsonExporter, ApiRequest, lang, Modal, kpDropdown, constant, ide_event, TA) {
    var API_HOST, API_URL;
    API_HOST = "api.visualops.io";

    /* env:debug */
    API_HOST = "api.mc3.io";

    /* env:debug:end */

    /* env:dev                                     env:dev:end */
    API_URL = "https://" + API_HOST + "/v1/apps/";
    return Backbone.View.extend({
      events: {
        "click .icon-save": "saveStack",
        "click .icon-delete": "deleteStack",
        "click .icon-duplicate": "duplicateStack",
        "click .icon-new-stack": "createStack",
        "click .icon-zoom-in": "zoomIn",
        "click .icon-zoom-out": "zoomOut",
        "click .icon-export-png": "exportPNG",
        "click .icon-export-json": "exportJson",
        "click .icon-toolbar-cloudformation": "exportCF",
        "click .runApp": 'runStack',
        "OPTION_CHANGE .toolbar-line-style": "setTbLineStyle",
        "click .icon-stop": "stopApp",
        "click .startApp": "startApp",
        "click .icon-terminate": "terminateApp",
        "click .icon-refresh": "refreshResource",
        "click .icon-update-app": "switchToAppEdit",
        "click .icon-apply-app": "applyAppEdit",
        "click .icon-cancel-update-app": "cancelAppEdit",
        'click .toolbar-visual-ops-switch': 'opsOptionChanged',
        'click .reload-states': "reloadState",
        'click .icon-save-app': 'appToStack'
      },
      render: function() {
        var ami, attr, btn, btns, opsModel, tpl, _i, _len;
        opsModel = this.workspace.opsModel;
        if (opsModel.isImported()) {
          btns = ["BtnActionPng", "BtnZoom", "BtnLinestyle"];
        } else if (opsModel.isStack()) {
          btns = ["BtnRunStack", "BtnStackOps", "BtnZoom", "BtnExport", "BtnLinestyle", "BtnSwitchStates"];
        } else {
          if (this.__editMode) {
            btns = ["BtnApply", "BtnZoom", "BtnPng", "BtnLinestyle", "BtnReloadRes", "BtnSwitchStates"];
          } else {
            btns = ["BtnEditApp", "BtnAppOps", "BtnZoom", "BtnPng", "BtnLinestyle", "BtnReloadRes"];
          }
        }
        tpl = "";
        for (_i = 0, _len = btns.length; _i < _len; _i++) {
          btn = btns[_i];
          attr = {
            stateOn: this.workspace.design.get("agent").enabled
          };
          tpl += OpsEditorTpl.toolbar[btn](attr);
        }
        if (this.workspace.opsModel.isApp()) {
          ami = [].concat(this.workspace.design.componentsOfType(constant.RESTYPE.INSTANCE), this.workspace.design.componentsOfType(constant.RESTYPE.LC));
          tpl += OpsEditorTpl.toolbar.BtnReloadStates({
            reloadOn: _.find(ami, function(comp) {
              var _ref;
              return comp && (((_ref = comp.attributes.state) != null ? _ref.length : void 0) > 0);
            })
          });
        }
        this.setElement(this.workspace.view.$el.find(".OEPanelTop").html(tpl));
        this.updateTbBtns();
        this.updateZoomButtons();
      },
      updateTbBtns: function() {
        var isAppEdit, opsModel;
        opsModel = this.workspace.opsModel;
        this.$el.children(".toolbar-line-style").children(".dropdown").children().eq(parseInt(localStorage.getItem("canvas/lineStyle"), 10) || 2).click();
        if (opsModel.isApp()) {
          isAppEdit = this.workspace.isAppEditMode && this.workspace.isAppEditMode();
          this.$el.children(".icon-update-app").toggle(!isAppEdit);
          this.$el.children(".icon-apply-app, .icon-cancel-update-app").toggle(isAppEdit);
          if (isAppEdit) {
            this.$el.children(".icon-terminate, .icon-stop, .icon-play, .icon-refresh, .icon-save-app, .icon-reload").hide();
          } else {
            this.$el.children(".icon-terminate, .icon-refresh, .icon-save-app, .icon-reload").show();
            this.$el.children(".icon-stop").toggle(opsModel.get("stoppable") && opsModel.testState(OpsModel.State.Running));
            this.$el.children(".icon-play").toggle(opsModel.testState(OpsModel.State.Stopped));
          }
        }
        if (this.__saving) {
          this.$el.children(".icon-save").attr("disabled", "disabled");
        } else {
          this.$el.children(".icon-save").removeAttr("disabled");
        }
        this.updateZoomButtons();
      },
      setTbLineStyle: function(ls, attr) {
        localStorage.setItem("canvas/lineStyle", attr[0]);
        return $canvas.updateLineStyle(attr[0]);
      },
      saveStack: function(evt) {
        var newJson, self;
        $(evt.currentTarget).attr("disabled", "disabled");
        self = this;
        this.__saving = true;
        newJson = this.workspace.design.serialize();
        return Thumbnail.generate($("#svg_canvas"))["catch"](function() {
          return null;
        }).then(function(thumbnail) {
          self.workspace.opsModel.save(newJson, thumbnail).then(function() {
            self.__saving = false;
            $(evt.currentTarget).removeAttr("disabled");
            return notification("info", sprintf(lang.ide.TOOL_MSG_ERR_SAVE_SUCCESS, newJson.name));
          }, function(err) {
            self.__saving = false;
            $(evt.currentTarget).removeAttr("disabled");
            return notification("error", sprintf(lang.ide.TOOL_MSG_ERR_SAVE_FAILED, newJson.name));
          });
        });
      },
      deleteStack: function() {
        return App.deleteStack(this.workspace.opsModel.cid, this.workspace.design.get("name"));
      },
      createStack: function() {
        return App.createOps(this.workspace.opsModel.get("region"));
      },
      duplicateStack: function() {
        var newOps;
        newOps = App.model.createStackByJson(this.workspace.design.serialize());
        App.openOps(newOps);
      },
      zoomIn: function() {
        MC.canvas.zoomIn();
        return this.updateZoomButtons();
      },
      zoomOut: function() {
        MC.canvas.zoomOut();
        return this.updateZoomButtons();
      },
      updateZoomButtons: function() {
        var scale;
        scale = $canvas.scale();
        if (scale <= 1) {
          this.$el.find(".icon-zoom-in").attr("disabled", "disabled");
        } else {
          this.$el.find(".icon-zoom-in").removeAttr("disabled");
        }
        if (scale >= 1.6) {
          this.$el.find(".icon-zoom-out").attr("disabled", "disabled");
        } else {
          this.$el.find(".icon-zoom-out").removeAttr("disabled");
        }
      },
      exportPNG: function() {
        var design, modal, name;
        modal = new Modal({
          title: "Export PNG",
          template: OpsEditorTpl["export"].PNG(),
          width: "470",
          disableFooter: true,
          compact: true,
          onClose: function() {
            modal = null;
          }
        });
        design = this.workspace.design;
        name = design.get("name");
        Thumbnail.exportPNG($("#svg_canvas"), {
          isExport: true,
          createBlob: true,
          name: name,
          id: design.get("id"),
          onFinish: function(data) {
            var btn;
            if (!modal) {
              return;
            }
            modal.tpl.find(".loading-spinner").remove();
            modal.tpl.find("section").show().prepend("<img style='max-height:100%;display:inline-block;' src='" + data.image + "' />");
            btn = modal.tpl.find("a.btn-blue");
            if (data.blob) {
              btn.click(function() {
                JsonExporter.download(data.blob, "" + name + ".png");
                return false;
              });
            } else {
              btn.attr({
                href: data.image,
                download: "" + name + ".png"
              });
            }
            modal.resize();
          }
        });
      },
      exportJson: function() {
        var data, date, design, name, username;
        design = this.workspace.design;
        username = App.user.get('username');
        date = MC.dateFormat(new Date(), "yyyy-MM-dd");
        name = [design.get("name"), username, date].join("-");
        data = JsonExporter.exportJson(design.serialize(), "" + name + ".json");
        if (data) {
          return new Modal({
            title: lang.ide.TOOL_EXPORT_AS_JSON,
            template: OpsEditorTpl["export"].JSON(data),
            width: "470",
            disableFooter: true,
            compact: true
          });
        }
      },
      exportCF: function() {
        var design, modal, name;
        modal = new Modal({
          title: lang.ide.TOOL_POP_EXPORT_CF,
          template: OpsEditorTpl["export"].CF(),
          width: "470",
          disableFooter: true
        });
        design = this.workspace.design;
        name = design.get("name");
        return ApiRequest("stack_export_cloudformation", {
          region: design.get("region"),
          stack: design.serialize()
        }).then(function(data) {
          var btn;
          btn = modal.tpl.find("a.btn-blue").text(lang.ide.TOOL_POP_BTN_EXPORT_CF).removeClass("disabled");
          JsonExporter.genericExport(btn, data, "" + name + ".json");
        }, function(err) {
          modal.tpl.find("a.btn-blue").text("Fail to export...");
          notification("error", "Fail to export to AWS CloudFormation Template, Error code:" + err.error);
        });
      },
      reloadState: function(event) {
        var $target, app_id, data;
        $target = $(event.currentTarget);
        if ($target.hasClass('disabled')) {
          return false;
        }
        $target.toggleClass('disabled').html($target.attr('data-disabled'));
        app_id = Design.instance().get('id');
        data = {
          'encoded_user': App.user.get('usercode'),
          'token': App.user.get('defaultToken')
        };
        return $.ajax({
          url: API_URL + app_id,
          method: "POST",
          data: JSON.stringify(data),
          dataType: 'json',
          statusCode: {
            200: function() {
              notification('info', lang.ide.RELOAD_STATE_SUCCESS);
              return ide_event.trigger(ide_event.REFRESH_PROPERTY);
            },
            401: function() {
              return notification('error', lang.ide.RELOAD_STATE_INVALID_REQUEST);
            },
            404: function() {
              return notification('error', lang.ide.RELOAD_STATE_NETWORKERROR);
            },
            429: function() {
              return notification('error', lang.ide.RELOAD_STATE_NOT_READY);
            },
            500: function() {
              return notification('error', lang.ide.RELOAD_STATE_INTERNAL_SERVER_ERROR);
            }
          },
          error: function() {
            return console.log('Error while Reload State');
          },
          success: function() {
            return console.debug('Reload State Success!');
          }
        }).always(function() {
          return window.setTimeout(function() {
            return $target.removeClass('disabled').html($target.attr('data-original'));
          });
        });
      },
      runStack: function(event) {
        var appNameDom, checkAppNameRepeat, cost, self;
        if ($(event.currentTarget).attr('disabled')) {
          return false;
        }
        this.modal = new Modal({
          title: lang.ide.RUN_STACK_MODAL_TITLE,
          template: MC.template.modalRunStack,
          disableClose: true,
          width: '450px',
          height: "620px",
          confirm: {
            text: App.user.hasCredential() ? lang.ide.RUN_STACK_MODAL_CONFIRM_BTN : lang.ide.RUN_STACK_MODAL_NEED_CREDENTIAL,
            disabled: true
          }
        });
        this.renderKpDropdown(this.modal);
        cost = Design.instance().getCost();
        this.modal.tpl.find('.modal-input-value').val(this.workspace.opsModel.get("name"));
        this.modal.tpl.find("#label-total-fee").find('b').text("$" + cost.totalFee);
        TA.loadModule('stack').then((function(_this) {
          return function() {
            var _ref;
            _this.modal.resize();
            return (_ref = _this.modal) != null ? _ref.toggleConfirm(false) : void 0;
          };
        })(this));
        appNameDom = this.modal.tpl.find('#app-name');
        checkAppNameRepeat = this.checkAppNameRepeat.bind(this);
        appNameDom.keyup(function() {
          return checkAppNameRepeat(appNameDom.val());
        });
        self = this;
        return this.modal.on('confirm', (function(_this) {
          return function() {
            var appNameRepeated;
            _this.hideError();
            if (!App.user.hasCredential()) {
              App.showSettings(App.showSettings.TAB.Credential);
              return false;
            }
            appNameRepeated = _this.checkAppNameRepeat(appNameDom.val());
            if (!_this.defaultKpIsSet() || appNameRepeated) {
              return false;
            }
            _this.modal.tpl.find(".btn.modal-confirm").attr("disabled", "disabled");
            _this.json = _this.workspace.design.serialize();
            _this.json.usage = $("#app-usage-selectbox").find(".dropdown .item.selected").data('value');
            _this.json.name = appNameDom.val();
            return _this.workspace.opsModel.run(_this.json, appNameDom.val()).then(function(ops) {
              self.modal.close();
              return App.openOps(ops);
            }, function(err) {
              var error;
              self.modal.close();
              error = err.awsError ? err.error + "." + err.awsError : " " + err.error + " : " + (err.result || err.msg);
              return notification('error', sprintf(lang.ide.PROP_MSG_WARN_FAILA_TO_RUN_BECAUSE, self.workspace.opsModel.get('name'), error));
            });
          };
        })(this));
      },
      appToStack: function(event) {
        var appToStackModal, name, newName, onConfirm;
        name = this.workspace.design.attributes.name;
        newName = this.getStackNameFromApp(name);
        onConfirm = (function(_this) {
          return function() {
            var isNew, newJson, newOps, stack;
            MC.Analytics.increase("app_to_stack");
            isNew = appToStackModal.tpl.find("input[name='save-stack-type']:checked").attr('id') === "radio-new-stack";
            if (isNew) {
              newOps = App.model.createStackByJson(_this.workspace.design.serializeAsStack(appToStackModal.tpl.find('#modal-input-value').val()));
              appToStackModal.close();
              App.openOps(newOps);
            } else {
              newJson = Design.instance().serializeAsStack();
              newJson.id = _this.workspace.design.attributes.stack_id;
              appToStackModal.close();
              stack = App.model.stackList().get(_this.workspace.design.attributes.stack_id);
              newJson.name = stack.attributes.name;
              return stack.save(newJson).then(function() {
                notification("info", sprintf(lang.ide.TOOL_MSG_INFO_HDL_SUCCESS, lang.ide.TOOLBAR_HANDLE_SAVE_STACK, newJson.name));
                return App.openOps(stack, true);
              }, function(err) {
                return notification('error', sprintf(lang.ide.TOOL_MSG_ERR_SAVE_FAILED, newJson.name));
              });
            }
          };
        })(this);
        appToStackModal = new Modal({
          title: lang.ide.TOOL_POP_TIT_APP_TO_STACK,
          template: OpsEditorTpl.saveAppToStack({
            input: name,
            stackName: newName
          }),
          confirm: {
            text: lang.ide.TOOL_POP_BTN_SAVE_TO_STACK
          },
          onConfirm: onConfirm
        });
        return appToStackModal.tpl.find("input[name='save-stack-type']").change(function() {
          return appToStackModal.tpl.find(".radio-instruction").toggleClass('hide');
        });
      },
      getStackNameFromApp: function(app_name) {
        var copy_name, idx, name_list, prefix, reg_name, stack_reg;
        if (!app_name) {
          app_name = "untitled";
        }
        idx = 0;
        reg_name = /.*-\d+$/;
        if (reg_name.test(app_name)) {
          prefix = app_name.substr(0, app_name.lastIndexOf("-"));
          idx = Number(app_name.substr(app_name.lastIndexOf("-") + 1));
          copy_name = prefix;
        } else {
          if (app_name.charAt(name.length - 1) === "-") {
            copy_name = app_name.substr(0, app_name.length - 1);
          } else {
            copy_name = app_name;
          }
        }
        stack_reg = /.-stack+$/;
        if (stack_reg.test(copy_name)) {
          copy_name = copy_name;
        } else {
          copy_name = copy_name + "-stack";
        }
        name_list = App.model.stackList().pluck("name") || [];
        idx++;
        while (idx <= name_list.length) {
          if ($.inArray(copy_name + "-" + idx, name_list) === -1) {
            break;
          }
          idx++;
        }
        return copy_name + "-" + idx;
      },
      checkAppNameRepeat: function(nameVal) {
        if (App.model.appList().findWhere({
          name: nameVal
        })) {
          this.showError('appname', lang.ide.PROP_MSG_WARN_REPEATED_APP_NAME);
          return true;
        } else if (!nameVal) {
          this.showError('appname', lang.ide.PROP_MSG_WARN_NO_APP_NAME);
          return true;
        } else {
          this.hideError('appname');
          return false;
        }
      },
      renderKpDropdown: function(modal) {
        var hideKpError, keyPairDropdown;
        if (kpDropdown.hasResourceWithDefaultKp()) {
          keyPairDropdown = new kpDropdown();
          if (modal) {
            modal.tpl.find("#kp-runtime-placeholder").html(keyPairDropdown.render().el);
          } else {
            return false;
          }
          hideKpError = this.hideError.bind(this);
          keyPairDropdown.dropdown.on('change', function() {
            return hideKpError('kp');
          });
          modal.tpl.find('.default-kp-group').show();
        }
        return null;
      },
      hideDefaultKpError: function(context) {
        return context.hideError('kp');
      },
      hideError: function(type) {
        var selector;
        selector = type ? $("#runtime-error-" + type) : $(".runtime-error");
        return selector.hide();
      },
      showError: function(id, msg) {
        return $("#runtime-error-" + id).text(msg).show();
      },
      defaultKpIsSet: function() {
        var defaultKP, kpModal;
        if (!kpDropdown.hasResourceWithDefaultKp()) {
          return true;
        }
        kpModal = Design.modelClassForType(constant.RESTYPE.KP);
        defaultKP = kpModal.getDefaultKP();
        if (!defaultKP.get('isSet') || !((this.modal || this.updateModal) && (this.modal || this.updateModal).tpl.find("#kp-runtime-placeholder .item.selected").size())) {
          this.showError('kp', lang.ide.RUN_STACK_MODAL_KP_WARNNING);
          return false;
        }
        return true;
      },
      startApp: function() {
        App.startApp(this.workspace.opsModel.id);
        return false;
      },
      stopApp: function() {
        App.stopApp(this.workspace.opsModel.id);
        return false;
      },
      terminateApp: function() {
        App.terminateApp(this.workspace.opsModel.id);
        return false;
      },
      refreshResource: function() {
        this.workspace.refreshResource();
        return false;
      },
      switchToAppEdit: function() {
        this.workspace.switchToEditMode();
        return false;
      },
      applyAppEdit: function() {
        var result;
        result = this.workspace.applyAppEdit();
        console.debug(result);
        if (result !== true) {
          console.debug(result);
          this.updateModal = new Modal({
            title: lang.ide.UPDATE_APP_MODAL_TITLE,
            template: MC.template.updateApp(result),
            disableClose: true,
            width: '450px',
            height: "515px",
            confirm: {
              text: App.user.hasCredential() ? lang.ide.UPDATE_APP_CONFIRM_BTN : lang.ide.UPDATE_APP_MODAL_NEED_CREDENTIAL,
              disabled: true
            }
          });
          this.updateModal.on('confirm', (function(_this) {
            return function() {
              var _ref;
              if (!_this.defaultKpIsSet()) {
                return false;
              }
              _this.workspace.applyAppEdit(result, true);
              return (_ref = _this.updateModal) != null ? _ref.close() : void 0;
            };
          })(this));
          this.renderKpDropdown(this.updateModal);
          TA.loadModule('stack').then((function(_this) {
            return function() {
              return _this.updateModal && _this.updateModal.toggleConfirm(false);
            };
          })(this));
        }
      },
      opsOptionChanged: function() {
        var $switcher, agent, confirmModal, instancesNoUserData, stateEnabled, workspace;
        $switcher = $(".toolbar-visual-ops-switch").toggleClass('on');
        stateEnabled = $switcher.hasClass("on");
        agent = this.workspace.design.get('agent');
        if (stateEnabled) {
          instancesNoUserData = this.workspace.design.instancesNoUserData();
          workspace = this.workspace;
          if (!instancesNoUserData) {
            $switcher.removeClass('on');
            confirmModal = new Modal({
              title: "Conﬁrm to Enable VisualOps",
              width: "420px",
              template: OpsEditorTpl.confirm.enableState(),
              confirm: {
                text: "Enable VisualOps"
              },
              onConfirm: function() {
                agent.enabled = true;
                confirmModal.close();
                $switcher.addClass('on');
                workspace.design.set('agent', agent);
                return ide_event.trigger(ide_event.REFRESH_PROPERTY);
              }
            });
            return null;
          } else {
            agent.enabled = true;
            this.workspace.design.set("agent", agent);
            return ide_event.trigger(ide_event.REFRESH_PROPERTY);
          }
        } else {
          agent.enabled = false;
          this.workspace.design.set('agent', agent);
          return ide_event.trigger(ide_event.REFRESH_PROPERTY);
        }
      },
      cancelAppEdit: function() {
        var modal, self;
        if (!this.workspace.cancelEditMode()) {
          self = this;
          modal = new Modal({
            title: "Changes not applied",
            template: OpsEditorTpl.modal.cancelUpdate(),
            width: "400",
            confirm: {
              text: "Discard",
              color: "red"
            },
            onConfirm: function() {
              modal.close();
              self.workspace.cancelEditMode(true);
            }
          });
        }
        return false;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/OpsViewBase',["./template/TplCanvas", "./template/TplOpsEditor", "./subviews/PropertyPanel", "./subviews/Toolbar", "UI.modalplus", "backbone", "UI.selectbox", "MC.canvas"], function(CanvasTpl, OpsEditorTpl, PropertyPanel, Toolbar, Modal) {
    $(document).on('keydown', MC.canvas.event.keyEvent);
    $('#header, #navigation, #tab-bar').on('click', MC.canvas.volume.close);
    $(document.body).on('mousedown', '#instance_volume_list a', MC.canvas.volume.mousedown);

    /* OpsEditorView base class */
    return Backbone.View.extend({
      constructor: function(options) {
        _.extend(this, options);
        this.propertyPanel = new PropertyPanel();
        this.propertyPanel.workspace = this.workspace;
        this.toolbar = new Toolbar();
        this.toolbar.workspace = this.workspace;
        this.initialize();
      },
      render: function() {
        console.assert(!this.$el || this.$el.attr("id") !== "OpsEditor", "There should be no #OpsEditor when an editor view is rendered.");
        this.setElement($(this.createTpl()).appendTo("#main").show()[0]);
        this.$el.attr("data-workspace", this.workspace.id);
        this.bindUserEvent();
        this.toolbar.render();
        this.propertyPanel.render();
        this.renderSubviews();
        this.workspace.design.canvas.init();
      },
      backup: function() {
        var $center;
        $center = this.$el.find(".OEPanelCenter");
        this.__backupSvg = $center.html();
        $center.empty();

        /*
        Revoke all the IDs of every dom.
         */
        this.propertyPanel.backup();
        this.backupSubviews();
        this.$el.attr("id", "");
      },
      recover: function() {
        this.$el.find(".OEPanelCenter").html(this.__backupSvg);
        this.__backupSvg = null;
        this.recoverSubviews();
        this.$el.attr("id", "OpsEditor");
        this.propertyPanel.recover();
      },
      remove: function() {
        this.toolbar.remove();
        this.propertyPanel.remove();
        this.removeSubviews();
        Backbone.View.prototype.remove.call(this);
      },
      showCloseConfirm: function() {
        var modal, name, self;
        name = this.workspace.design.get('name');
        self = this;
        modal = new Modal({
          title: "Confirm to close " + name,
          width: "420",
          template: OpsEditorTpl.modal.onClose(name),
          confirm: {
            text: "Close Tab",
            color: "red"
          },
          onConfirm: function() {
            modal.close();
            self.workspace.remove();
          }
        });
      },
      saveOps: function() {
        return App.saveOps(this.workspace.opsModel);
      },

      /*
        Override these methods in subclasses.
       */
      createTpl: function() {
        return CanvasTpl({});
      },
      bindUserEvent: function() {},
      renderSubviews: function() {},
      recoverSubviews: function() {},
      backupSubviews: function() {},
      removeSubviews: function() {}
    });
  });

}).call(this);


/*
  OpsEditorBase is a base class for all the OpsEditor
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/OpsEditorBase',["Workspace", "./OpsViewBase", "./template/TplOpsEditor", "ThumbnailUtil", "OpsModel", "Design", "ApiRequest"], function(Workspace, OpsEditorView, OpsEditorTpl, Thumbnail, OpsModel, Design, ApiRequest) {
    var LoadingView, OpsEditorBase;
    LoadingView = Backbone.View.extend({
      isLoadingView: true,
      initialize: function(options) {
        return this.setElement($(OpsEditorTpl.loading()).appendTo("#main").show()[0]);
      },
      setText: function(text) {
        return this.$el.find(".processing").text(text);
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

      OpsEditorBase.prototype.fetchAdditionalData = function() {
        var d;
        d = Q.defer();
        d.resolve();
        return d.promise;
      };

      OpsEditorBase.prototype.createView = function() {
        return new OpsEditorView({
          workspace: this
        });
      };

      OpsEditorBase.prototype.initDesign = function() {
        return this.design.finishDeserialization();
      };

      OpsEditorBase.prototype.isReady = function() {
        return !!this.__hasAdditionalData;
      };

      OpsEditorBase.prototype.onOpsModelStateChanged = function() {
        switch (this.opsModel.get("state")) {
          case OpsModel.State.Destroyed:
            this.remove();
        }
      };


      /*
        Internal methods.
       */

      OpsEditorBase.prototype.isWorkingOn = function(attribute) {
        return this.opsModel === attribute;
      };

      function OpsEditorBase(opsModel) {
        var self;
        if (!opsModel) {
          this.remove();
          throw new Error("Cannot find opsmodel while openning workspace.");
        }
        this.opsModel = opsModel;
        this.listenTo(this.opsModel, "destroy", this.onOpsModelStateChanged);
        this.listenTo(this.opsModel, "change:state", this.onOpsModelStateChanged);
        this.listenTo(this.opsModel, "change:id", function() {
          if (this.design) {
            return this.design.set("id", this.opsModel.get("id"));
          }
        });
        self = this;
        this.opsModel.fetchJsonData().then(function() {
          return self.jsonLoaded();
        }, function(err) {
          if (err.error === ApiRequest.Errors.MissingDataInServer) {
            return;
          }
          notification("error", "Fail to load data, please retry.");
          return self.remove();
        });
        return Workspace.apply(this, arguments);
      }

      OpsEditorBase.prototype.jsonLoaded = function() {
        var self;
        if (this.isRemoved()) {
          return;
        }
        self = this;
        this.fetchAdditionalData().then(function() {
          if (self.isRemoved()) {
            return;
          }
          self.__hasAdditionalData = true;
          return self.switchToReady();
        }, function() {
          notification("error", "Fail to load aws data, please retry.");
          return self.remove();
        });
      };

      OpsEditorBase.prototype.switchToReady = function() {
        if (this.view && this.view.isLoadingView) {
          this.view.remove();
          this.view = null;
        }
        if (this.isAwake() && !this.__inited) {
          this.initEditor();
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
          this.initEditor();
        } else {
          this.design.use();
          this.showEditor();
        }
      };

      OpsEditorBase.prototype.cleanup = function() {
        this.stopListening();
        this.view.remove();
      };

      OpsEditorBase.prototype.isInited = function() {
        return !!this.__inited;
      };

      OpsEditorBase.prototype.initEditor = function() {
        this.__inited = true;
        this.design = new Design(this.opsModel);
        this.listenTo(this.design, "change:name", this.updateTab);
        this.view = this.createView();
        this.view.opsModel = this.opsModel;
        this.view.workspace = this;
        this.hideOtherEditor();
        this.view.render();
        this.initDesign();
        if (this.opsModel.isPresisted() && !this.opsModel.getThumbnail()) {
          this.saveThumbnail();
        }
      };

      OpsEditorBase.prototype.saveThumbnail = function() {
        return Thumbnail.generate($("#svg_canvas")).then((function(_this) {
          return function(thumbnail) {
            return _this.opsModel.saveThumbnail(thumbnail);
          };
        })(this));
      };

      OpsEditorBase.prototype.showEditor = function() {
        if (this.hideOtherEditor()) {
          this.view.$el.show();
          this.view.recover();
        } else {
          console.log("#OpsEditor is current workspace's, just show()-ing it.");
          this.view.$el.show();
        }
      };

      OpsEditorBase.prototype.hideOtherEditor = function() {
        var $theDOM, editorId;
        $theDOM = $("#OpsEditor");
        editorId = $theDOM.attr("data-workspace");
        console.assert(!$theDOM.length || editorId, "There's #OpsEditor, but it doens't have [data-workspace]");
        if (editorId && editorId !== this.id) {
          App.workspaces.get(editorId).view.backup();
          return true;
        }
        return editorId !== this.id;
      };

      OpsEditorBase.prototype.isRemovable = function() {
        if (!this.__inited || !this.isModified()) {
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

define('workspaces/editor/template/TplLeftPanel',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", escapeExpression=this.escapeExpression;


  buffer += "<button class=\"tooltip sidebar-hider icon-caret-left HideOEPanelLeft\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'></button>\n\n<header class=\"sidebar-title\"> "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RESOURCES", {hash:{},data:data}))
    + "\n  <i class=\"icon-resources js-toggle-dropdown menu-manage-shard-res\"></i>\n  <ul class=\"dropdown-menu resources-dropdown-wrapper\">\n    <li data-action=\"keypair\">Manage Key Pairs...</li>\n    <li data-action=\"snapshot\">Manage EBS Snapshots...</li>\n    <li data-action=\"sns\">Manage SNS Topic & Subscriptions...</li>\n    <li data-action=\"sslcert\">Manage Server Certificates...</li>\n    <li data-action=\"dhcp\">Manage DHCP Option Sets...</li>\n  </ul>\n  <i class=\"refresh-resource-panel icon-refresh tooltip\" data-tooltip=\"Refresh resource list\"></i>\n</header>\n\n<div class=\"fixedaccordion accordion-default\">\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AZ", {hash:{},data:data}))
    + "</header>\n    <ul class=\"resource-list-az clearfix accordion-body\"></ul>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AMI", {hash:{},data:data}))
    + "\n      <nav class=\"selectbox resource-select AmiTypeSelect js-toggle-dropdown\">\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</div>\n        <ul class=\"dropdown\">\n          <li class=\"item selected\" data-id=\"QuickStartAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"MyAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_MY_AMI", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"FavoriteAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_FAVORITE_AMI", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </nav>\n    </header>\n    <div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n      <button class=\"btn btn-primary BrowseCommunityAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_BTN_BROWSE_COMMUNITY_AMI", {hash:{},data:data}))
    + "</button>\n      <ul class=\"scroll-content resource-list-ami\"></ul>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VOL", {hash:{},data:data}))
    + "</header>\n    <div class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n      <button class=\"btn btn-primary ManageSnapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_SNAPSHOT_MANAGE", {hash:{},data:data}))
    + "</button>\n      <ul class=\"resource-list-snapshot scroll-content\"></ul>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_ELB_ASG", {hash:{},data:data}))
    + "</header>\n    <ul class=\"resource-list-asg clearfix accordion-body\">\n      <li class=\"tooltip resource-item resource-icon-elb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ELB", {hash:{},data:data}))
    + "' data-type=\"ELB\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ELB", {hash:{},data:data}))
    + "</li>\n      <li class=\"tooltip resource-item resource-icon-asg\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ASG", {hash:{},data:data}))
    + "' data-type=\"ASG\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ASG", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n\n  <section class='accordion-group'>\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VPC", {hash:{},data:data}))
    + "</header>\n    <article class=\"accordion-body scroll-wrap scrollbar-auto-hide\">\n      <div class=\"scrollbar-veritical-wrap\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n      <ul class=\"scroll-content\">\n        <li class=\"tooltip resource-item resource-icon-subnet\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_SUBNET", {hash:{},data:data}))
    + "' data-type=\"SUBNET\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_SUBNET", {hash:{},data:data}))
    + "</li>\n\n        <li class=\"tooltip resource-item resource-icon-rt\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_RTB", {hash:{},data:data}))
    + "' data-type=\"RT\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RTB", {hash:{},data:data}))
    + "</li>\n\n        <li class=\"tooltip resource-item resource-icon-igw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_IGW", {hash:{},data:data}))
    + "' data-type=\"IGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_IGW", {hash:{},data:data}))
    + "</li>\n\n        <li class=\"tooltip resource-item resource-icon-vgw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VGW", {hash:{},data:data}))
    + "' data-type=\"VGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VGW", {hash:{},data:data}))
    + "</li>\n\n        <li class=\"tooltip resource-item resource-icon-cgw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_CGW", {hash:{},data:data}))
    + "' data-type=\"CGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_CGW", {hash:{},data:data}))
    + "</li>\n\n        <li class=\"tooltip resource-item resource-icon-eni\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ENI", {hash:{},data:data}))
    + "' data-type=\"ENI\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ENI", {hash:{},data:data}))
    + "</li>\n      </ul>\n    </article>\n  </section>\n</div>";
  return buffer;
  };
TEMPLATE.panel=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"tooltip resource-item resource-icon-az\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_AZ", {hash:{},data:data}))
    + "' data-type=\"AZ\" data-option='{\"name\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'><div class=\"az-name\">"
    + escapeExpression(helpers.lastChar.call(depth0, (depth0 && depth0.id), {hash:{},data:data}))
    + "</div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.az=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble resource-icon-ebs-snapshot\" data-bubble-template=\"bubbleSnapshotInfo\" data-bubble-data='{\"snapshotId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"startTime\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"status\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.status)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"size\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"VOL\" data-option='{\"volumeSize\":"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", \"snapshotId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'><div class=\"ebs-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }

  buffer += "<li class=\"tooltip resource-item resource-icon-volume\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VOLUME", {hash:{},data:data}))
    + "' data-type=\"VOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VOL", {hash:{},data:data}))
    + "</li>\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.snapshot=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data,depth1) {
  
  var stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"bubble resource-item instance\" data-bubble-template=\"bubbleAMIMongoInfo\" data-bubble-data='{&quot;id&quot;:&quot;"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "&quot;}' data-type=\"INSTANCE\" data-option='{\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n  ";
  stack1 = helpers['if'].call(depth0, (depth2 && depth2.fav), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"resource-icon-instance\"><img src=\"assets/images/ide/ami/"
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\" width='39' height='27' /></div>\n  "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<button class=\"btn-fav-ami fav tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_TOGGLE_FAVORITE", {hash:{},data:data}))
    + "\" data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></button>";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.ami=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"resource-icon resource-icon-instance\" >\n    <img src=\"assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\"/>\n  </div>\n<div class=\"resource-label instance-label\">Auto Scaling Group ("
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</div>";
  return buffer;
  };
TEMPLATE.reuse_lc=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/editor/UnmanagedView',["./OpsViewBase", "./template/TplLeftPanel", "./template/TplCanvas", "OpsModel", "backbone", "UI.selectbox", "MC.canvas"], function(OpsViewBase, LeftPanelTpl, CanvasTpl, OpsModel) {
    return OpsViewBase.extend({
      createTpl: function() {
        return CanvasTpl({
          noLeftPane: true,
          noBottomPane: true
        });
      },
      bindUserEvent: function() {
        this.$el.find(".OEPanelCenter").on('mousedown', '.instance-volume, .instanceList-item-volume, .asgList-item-volume', MC.canvas.volume.show).on('mousedown', '.AWS-AutoScaling-LaunchConfiguration .instance-number-group', MC.canvas.asgList.show).on('mousedown', '.dragable', MC.canvas.event.dragable.mousedown).on('mousedown', '.group-resizer', MC.canvas.event.groupResize.mousedown).on('mouseenter mouseleave', '.node', MC.canvas.event.nodeHover).on('click', '.line', MC.canvas.event.selectLine).on('mousedown', '#svg_canvas', MC.canvas.event.clickBlank).on('mousedown', MC.canvas.event.clearSelected).on('mousedown', MC.canvas.event.ctrlMove.mousedown).on('selectstart', false);
        $("#canvas_body").addClass("canvas_state_appview");
      },
      renderSubviews: function() {}
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/UnmanagedViewer',["./OpsEditorBase", "./UnmanagedView", "Design"], function(OpsEditorBase, UnmanagedView, Design) {

    /*
      UnmanagedViewer is mainly used to show visualize vpc
     */
    var UnmanagedViewer;
    UnmanagedViewer = (function(_super) {
      __extends(UnmanagedViewer, _super);

      function UnmanagedViewer() {
        return UnmanagedViewer.__super__.constructor.apply(this, arguments);
      }

      UnmanagedViewer.prototype.title = function() {
        return this.opsModel.get("importVpcId") + " - app";
      };

      UnmanagedViewer.prototype.tabClass = function() {
        return "icon-visualization-tabbar";
      };


      /*
        Override these methods to implement subclasses.
       */

      UnmanagedViewer.prototype.createView = function() {
        return new UnmanagedView({
          opsModel: this.opsModel,
          workspace: this
        });
      };

      UnmanagedViewer.prototype.initDesign = function() {
        MC.canvas.analysis();
        this.design.finishDeserialization();
      };

      UnmanagedViewer.prototype.isReady = function() {
        return this.opsModel.hasJsonData();
      };

      return UnmanagedViewer;

    })(OpsEditorBase);
    return UnmanagedViewer;
  });

}).call(this);

define('workspaces/editor/template/TplAmiBrowser',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"content-wrap\" style=\"position:relative;\">\n  <div id=\"ami-search-option\">\n    <div>\n      <input id=\"community-ami-input\" class=\"input\" type=\"text\" placeholder=\"";
  stack1 = helpers.i18n.call(depth0, "AMI_LBL_ALL_SEARCH_AMI_BY_NAME_OR_ID", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" />\n    </div>\n\n    <div id=\"selectbox-ami-platform\" class=\"selectbox\">\n      <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</div>\n      <ul class=\"dropdown\" tabindex=\"-1\">\n        <li class=\"item selected\" data-id=\"\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ALL_PLATFORMS", {hash:{},data:data}))
    + "</li>\n        <li class=\"item\" data-id=\"amazonlinux\"> <span class=\"icon-ami-os amz-linux\">Amazon Linux</span> </li>\n        <li class=\"item\" data-id=\"centos\"> <span class=\"icon-ami-os centos\">Cent OS</span> </li>\n        <li class=\"item\" data-id=\"debian\"> <span class=\"icon-ami-os debian\">Debian</span> </li>\n        <li class=\"item\" data-id=\"fedora\"> <span class=\"icon-ami-os fedora\">Fedora</span> </li>\n        <li class=\"item\" data-id=\"gentoo\"> <span class=\"icon-ami-os gentoo\">Gentoo</span> </li>\n        <li class=\"item\" data-id=\"opensuse\"><span class=\"icon-ami-os opensuse\">OpenSUSE</span> </li>\n        <li class=\"item\" data-id=\"ubuntu\"> <span class=\"icon-ami-os ubuntu\">Ubuntu</span> </li>\n        <li class=\"item\" data-id=\"redhat\"> <span class=\"icon-ami-os redhat\">Red Hat</span> </li>\n        <li class=\"item\" data-id=\"windows\"><span class=\"icon-ami-os windows\">Windows</span> </li>\n        <li class=\"item\" data-id=\"otherlinux\"> <span class=\"icon-ami-os linux-other\">Other Linux</span> </li>\n      </ul>\n    </div>\n\n    <div class=\"ami-option-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_VISIBILITY", {hash:{},data:data}))
    + "</h5>\n      <div class=\"ami-option-wrap\" id=\"filter-ami-type\">\n        <button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PUBLIC", {hash:{},data:data}))
    + "</button>\n        <button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_PRIVATE", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div class=\"ami-option-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ARCHITECTURE", {hash:{},data:data}))
    + "</h5>\n      <div class=\"ami-option-wrap\" id=\"filter-ami-32bit-64bit\">\n        <button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_32_BIT", {hash:{},data:data}))
    + "</button>\n        <button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_64_BIT", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div class=\"ami-option-group\">\n      <h5>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_ROOT_DEVICE_TYPE", {hash:{},data:data}))
    + "</h5>\n      <div class=\"ami-option-wrap\" id=\"filter-ami-EBS-Instance\">\n        <button type=\"button\" class=\"btn active\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_EBS", {hash:{},data:data}))
    + "</button>\n        <button type=\"button\" class=\"btn\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_INSTANCE_STORE", {hash:{},data:data}))
    + "</button>\n      </div>\n    </div>\n\n    <div id=\"btn-search-ami\" class=\"btn btn-blue\" disabled>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SEARCHING", {hash:{},data:data}))
    + "</div>\n  </div>\n\n  <div id=\"ami-data-wrap\">\n    <div id=\"ami-table-wrap\" class=\"table-head-fix\">\n      <table class=\"table-head\">\n        <thead>\n        <tr>\n          <th style=\"width: 44px;\"></th>\n          <th style=\"width: 104px;\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_ID", {hash:{},data:data}))
    + "</th>\n          <th>"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_AMI_NAME", {hash:{},data:data}))
    + "</th>\n          <th style=\"width: 62px;padding-left:4px;text-align:left;\" class=\"sortable\">"
    + escapeExpression(helpers.i18n.call(depth0, "AMI_LBL_SIZE", {hash:{},data:data}))
    + "</th>\n        </tr>\n        </thead>\n      </table>\n      <div class=\"scroll-wrap\">\n        <div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n        <div class=\"show-loading\">\n          <div class=\"loading-spinner\"></div>\n        </div>\n        <div class=\"scroll-content\" style=\"display:block;\">\n          <table class=\"table\">\n            <thead>\n            <tr>\n              <th style=\"width: 16px;\"><div class=\"th-inner\"></div></th>\n              <th style=\"width: 80px;\"><div class=\"th-inner\"></div></th>\n              <th><div class=\"th-inner\"></div></th>\n              <th style=\"width: 42px;\"><div class=\"th-inner\"></div></th>\n            </tr>\n            </thead>\n            <tbody id=\"community_ami_table\"></tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"community-ami-page\">\n      <div class=\"page-tip\" style=\"display: none;\"></div>\n      <div class=\"pagination\" style=\"display: none;\">\n        <a href=\"#\" class=\"previous\" data-action=\"previous\">&lsaquo;</a>\n        <input type=\"text\" readonly=\"readonly\" data-max-page=\"40\" />\n        <a href=\"#\" class=\"next\" data-action=\"next\">&rsaquo;</a>\n      </div>\n    </div>\n  </div>\n</div>";
  return buffer;
  };
TEMPLATE.dialog=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<tr class=\"item\" data-id=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n  <td><div class=\"toggle-fav tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_TOGGLE_FAVORITE", {hash:{},data:data}))
    + "\"></div></td>\n  <td>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  <td>\n    <span class=\"ami-table-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"ami-meta "
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-ami-os\"> ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.isPublic), "true", {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " | "
    + escapeExpression(((stack1 = (depth0 && depth0.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " | "
    + escapeExpression(((stack1 = (depth0 && depth0.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n  </td>\n  <td>"
    + escapeExpression(((stack1 = (depth0 && depth0.imageSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n</tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "public";
  }

function program4(depth0,data) {
  
  
  return "private";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.amiItem=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/editor/subviews/AmiBrowser',['../template/TplAmiBrowser', 'i18n!nls/lang.js', 'UI.modalplus', "ApiRequest", 'CloudResources', 'backbone', 'jqpagination'], function(TplAmiBrowser, lang, Modal, ApiRequest, CloudResources) {
    return Backbone.View.extend({
      events: {
        'click .ami-option-group .ami-option-wrap .btn': 'clickOptionBtn',
        'keypress #community-ami-input': "search",
        'click    #btn-search-ami': "search",
        'click    .toggle-fav': "toggleFav"
      },
      initialize: function(attr) {
        var modal, self;
        $.extend(this, attr);
        modal = new Modal({
          title: lang.ide.AMI_LBL_COMMUNITY_AMIS,
          width: "855px",
          template: TplAmiBrowser.dialog(),
          disableFooter: true,
          compact: true
        });
        self = this;
        modal.on("close", function() {
          if (self.onClose) {
            self.onClose();
          }
        });
        this.setElement(modal.tpl);
        this.doSearch();
      },
      clickOptionBtn: function(event) {
        var active_btns;
        if ($(event.target).hasClass('active')) {
          active_btns = $(event.target).parent().find('.active');
          if (active_btns.length === 1 && active_btns[0] === event.target) {
            return;
          } else {
            $(event.target).removeClass('active');
          }
        } else {
          $(event.target).addClass('active');
        }
        return null;
      },
      toggleFav: function(event) {
        var amiElem, data, favAmis, id, promise, that;
        amiElem = $(event.target);
        that = this;
        favAmis = CloudResources("FavoriteAmi", this.region);
        promise = null;
        id = amiElem.closest("tr").attr("data-id");
        if (amiElem.hasClass('fav')) {
          promise = favAmis.unfav(id);
        } else {
          data = $.extend({
            id: id
          }, this.communityAmiData[id]);
          promise = favAmis.fav(data);
        }
        return promise.then(function() {
          return amiElem.toggleClass('fav');
        });
      },
      doSearch: function(pageNum, perPage) {
        var architecture, isPublic, name, perPageNum, platform, returnPage, rootDeviceType, self, visibility;
        pageNum = pageNum || 1;
        this.renderAmiLoading();
        name = $("#community-ami-input").val();
        platform = $('#selectbox-ami-platform').find('.selected').data('id');
        isPublic = 'true';
        architecture = '32-bit';
        rootDeviceType = "EBS";
        if ($('#filter-ami-type').find('.active').length === 1) {
          visibility = radiobuttons.data($('#filter-ami-type'));
          isPublic = visibility === 'Private' ? 'false' : 'true';
        } else if ($('#filter-ami-type').find('.active').length === 2) {
          isPublic = null;
        }
        if ($('#filter-ami-32bit-64bit').find('.active').length === 1) {
          architecture = radiobuttons.data($('#filter-ami-32bit-64bit'));
        } else if ($('#filter-ami-32bit-64bit').find('.active').length === 2) {
          architecture = null;
        }
        if ($('#filter-ami-EBS-Instance').find('.active').length === 1) {
          rootDeviceType = radiobuttons.data($('#filter-ami-EBS-Instance'));
        } else if ($('#filter-ami-EBS-Instance').find('.active').length === 2) {
          rootDeviceType = null;
        }
        perPageNum = parseInt(perPage || 50, 10);
        returnPage = parseInt(pageNum, 10);
        self = this;
        return ApiRequest("aws_public", {
          region_name: this.region,
          filters: {
            ami: {
              name: name,
              platform: platform,
              isPublic: isPublic,
              architecture: architecture,
              rootDeviceType: rootDeviceType,
              perPageNum: perPageNum,
              returnPage: returnPage
            }
          }
        }).then(function(result) {
          var _ref;
          self.communityAmiData = ((_ref = result.ami) != null ? _ref.result : void 0) || {};
          return self.communityAmiRender(result);
        }, function(result) {
          notification('error', lang.ide.RES_MSG_WARN_GET_COMMUNITY_AMI_FAILED);
          return self.communityAmiRender({
            ami: []
          });
        });
      },
      searchPrev: function() {
        var page;
        page = parseInt($("#community_ami_page_current").attr("page"), 10);
        return this.doSearch(page + 1);
      },
      searchNext: function() {
        var page;
        page = parseInt($("#community_ami_page_current").attr("page"), 10);
        return this.doSearch(page - 1);
      },
      search: function(event) {
        if (event.keyCode && event.keyCode !== 13) {
          return;
        }
        return this.doSearch();
      },
      communityAmiRender: function(data) {
        var totalNum;
        this.communityShowContent();
        totalNum = 0;
        if (!data.ami) {
          return;
        }
        data = data.ami;
        $("#community_ami_table").html(TplAmiBrowser.amiItem(data.result));
        return this.communityPagerRender(data.curPageNum, data.totalPageNum, data.totalNum);
      },
      communityPagerRender: function(current_page, max_page, total) {
        var itemBegin, itemEnd, pageSize, pagination, resourceView;
        resourceView = this;
        pageSize = total > 50 ? 50 : total;
        itemBegin = (current_page - 1) * 50 + 1;
        itemEnd = itemBegin + pageSize - 1;
        if (itemEnd > total) {
          itemEnd = total;
        }
        $('.page-tip').text(sprintf(lang.ide.AMI_LBL_PAGEINFO, itemBegin, itemEnd, total));
        pagination = $('.pagination');
        if (max_page === 0) {
          pagination.hide();
        } else {
          pagination.show();
        }
        if (pagination.data('jqPagination')) {
          pagination.jqPagination('destroy');
          pagination.find('input').data('current-page', current_page);
        }
        return pagination.jqPagination({
          current_page: current_page,
          max_page: max_page,
          page_string: "{current_page} / {max_page}",
          paged: (function(current_page, max_page) {
            return function(page) {
              if (page !== current_page && (max_page >= page && page > 0)) {
                return resourceView.doSearch(page);
              }
            };
          })(current_page, max_page)
        });
      },
      communityShowContent: function() {
        $(".show-loading").hide();
        $("#ami-table-wrap .scroll-content").show();
        $("#btn-search-ami").text(lang.ide.AMI_LBL_SEARCH).removeAttr("disabled");
        return $("#community-ami-page>div").show();
      },
      renderAmiLoading: function() {
        $("#ami-table-wrap .scroll-content").hide();
        $(".show-loading").show();
        $("#btn-search-ami").text(lang.ide.AMI_LBL_SEARCHING).attr("disabled", "");
        return $("#community-ami-page>div").hide();
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/subviews/ResourcePanel',["CloudResources", "Design", "../template/TplLeftPanel", "constant", 'dhcp', 'snapshotManager', 'sslcert_manage', 'sns_manage', 'kp_manage', './AmiBrowser', 'i18n!nls/lang.js', 'ApiRequest', "backbone", 'UI.radiobuttons'], function(CloudResources, Design, LeftPanelTpl, constant, dhcpManager, snapshotManager, sslCertManager, snsManager, keypairManager, AmiBrowser, lang, ApiRequest) {
    var __resizeAccdTO;
    __resizeAccdTO = null;
    $(window).on("resize", function() {
      if (__resizeAccdTO) {
        clearTimeout(__resizeAccdTO);
      }
      __resizeAccdTO = setTimeout(function() {
        return $(".OEPanelLeft").trigger("RECALC");
      }, 150);
    });
    return Backbone.View.extend({
      events: {
        "click .btn-fav-ami": "toggleFav",
        "click .HideOEPanelLeft": "toggleLeftPanel",
        "OPTION_CHANGE .AmiTypeSelect": "changeAmiType",
        "click .BrowseCommunityAmi": "browseCommunityAmi",
        "click .ManageSnapshot": "manageSnapshot",
        "click .fixedaccordion-head": "updateAccordion",
        "RECALC": "recalcAccordion",
        "mousedown .resource-item": "startDrag",
        "click .refresh-resource-panel": "refreshPanelData",
        'click .resources-dropdown-wrapper li': 'resourcesMenuClick'
      },
      initialize: function(options) {
        var design, region;
        this.workspace = options.workspace;
        region = this.workspace.opsModel.get("region");
        this.listenTo(CloudResources("MyAmi", region), "update", this.updateMyAmiList);
        this.listenTo(CloudResources(constant.RESTYPE.AZ, region), "update", this.updateAZ);
        this.listenTo(CloudResources(constant.RESTYPE.SNAP, region), "update", this.updateSnapshot);
        design = this.workspace.design;
        this.listenTo(design, Design.EVENT.AzUpdated, this.updateDisableItems);
        this.listenTo(design, Design.EVENT.AddResource, this.updateDisableItems);
        this.listenTo(design, Design.EVENT.RemoveResource, this.updateDisableItems);
        this.subEventForUpdateReuse();
        this.__amiType = "QuickStartAmi";
      },
      render: function() {
        this.setElement(this.workspace.view.$el.find(".OEPanelLeft").html(LeftPanelTpl.panel({})));
        this.$el.toggleClass("hidden", this.__leftPanelHidden || false);
        this.recalcAccordion();
        this.updateAZ();
        this.updateSnapshot();
        this.updateAmi();
        this.updateDisableItems();
        this.registerTemplate();
        this.renderReuse();
      },
      reuseLc: Backbone.View.extend({
        tagName: 'li',
        className: 'tooltip resource-item resource-icon-asg resource-reuse',
        inDom: false,
        defaultAttr: function() {
          return {
            'data-type': 'ASG'
          };
        },
        defaultData: function() {
          var that;
          that = this;
          return {
            'option': {
              lcId: that.model.id
            }
          };
        },
        initialize: function(options) {
          if (!options) {
            options = {};
          }
          this.parent = options.parent;
          this.settleElement(options);
          return this.bindEvent(this.model);
        },
        bindEvent: function(model) {
          this.listenTo(model, 'change', this.render);
          return this.listenTo(model, 'destroy', function(lc) {
            if (lc.__brothers.length) {
              this.model = lc.__brothers[0];
              this.stopListening();
              this.bindEvent(this.model);
              return this.settleElement({});
            } else {
              return this.remove();
            }
          });
        },
        settleElement: function(options) {
          this.$el.attr(_.extend({}, options.attr, this.defaultAttr()));
          return this.$el.data(_.extend({}, options.data, this.defaultData()));
        },
        render: function() {
          var data;
          data = this.model.toJSON();
          if (!data.cachedAmi) {
            data.cachedAmi = this.model.getAmi();
          }
          this.$el.html(LeftPanelTpl.reuse_lc(data));
          if (!this.inDom) {
            this.inDom = true;
            (this.parent || this).$el.find(".resource-list-asg").append(this.el);
          }
          return this;
        }
      }),
      renderReuse: function() {
        var allLc, lc, _i, _len;
        allLc = Design.modelClassForType(constant.RESTYPE.LC).allObjects();
        for (_i = 0, _len = allLc.length; _i < _len; _i++) {
          lc = allLc[_i];
          if (!lc.isClone()) {
            new this.reuseLc({
              model: lc,
              parent: this
            }).render();
          }
        }
        return this;
      },
      subEventForUpdateReuse: function() {
        return Design.on(Design.EVENT.AddResource, function(resModel) {
          if (resModel.type === constant.RESTYPE.LC && !resModel.isClone()) {
            return new this.reuseLc({
              model: resModel,
              parent: this
            }).render();
          }
        }, this);
      },
      updateAZ: function() {
        var region;
        if (!this.workspace.isAwake()) {
          return;
        }
        region = this.workspace.opsModel.get("region");
        this.$el.find(".resource-list-az").html(LeftPanelTpl.az(CloudResources(constant.RESTYPE.AZ, region).where({
          category: region
        }) || []));
        this.updateDisabledAz();
      },
      updateSnapshot: function() {
        var region;
        if (!this.workspace.isAwake()) {
          return;
        }
        region = this.workspace.opsModel.get("region");
        this.$el.find(".resource-list-snapshot").html(LeftPanelTpl.snapshot(CloudResources(constant.RESTYPE.SNAP, region).where({
          category: region
        }) || []));
      },
      changeAmiType: function(evt, attr) {
        this.__amiType = attr || "QuickStartAmi";
        return this.updateAmi();
      },
      updateAmi: function() {
        var html, ms;
        ms = CloudResources(this.__amiType, this.workspace.opsModel.get("region")).getModels().sort(function(a, b) {
          var ca, cb;
          a = a.attributes;
          b = b.attributes;
          if (a.osType === "windows" && b.osType !== "windows") {
            return 1;
          }
          if (a.osType !== "windows" && b.osType === "windows") {
            return -1;
          }
          ca = a.osType;
          cb = b.osType;
          if (ca === cb) {
            ca = a.architecture;
            cb = b.architecture;
            if (ca === cb) {
              ca = a.name;
              cb = b.name;
            }
          }
          if (ca > cb) {
            return 1;
          } else {
            return -1;
          }
        });
        ms.fav = this.__amiType === "FavoriteAmi";
        html = LeftPanelTpl.ami(ms);
        return this.$el.find(".resource-list-ami").html(html);
      },
      registerTemplate: function() {
        var region;
        region = this.workspace.opsModel.get('region');
        return MC.template.bubbleAMIMongoInfo = (function(_this) {
          return function(data) {
            var amiData, models, _ref;
            models = CloudResources(_this.__amiType, region).getModels();
            amiData = (_ref = _.findWhere(models, {
              'id': data.id
            })) != null ? _ref.toJSON() : void 0;
            amiData.imageSize = amiData.imageSize || amiData.blockDeviceMapping[amiData.rootDeviceName].volumeSize;
            return MC.template.bubbleAMIInfo(amiData);
          };
        })(this);
      },
      updateDisableItems: function() {
        if (!this.workspace.isAwake()) {
          return;
        }
        this.updateDisabledAz();
        this.updateDisabledVpcRes();
      },
      updateDisabledAz: function() {
        var $azs, az, azName, i, _i, _j, _len, _len1, _ref;
        $azs = this.$el.find(".resource-list-az").children().removeClass("resource-disabled");
        _ref = this.workspace.design.componentsOfType(constant.RESTYPE.AZ);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          az = _ref[_i];
          azName = az.get("name");
          for (_j = 0, _len1 = $azs.length; _j < _len1; _j++) {
            i = $azs[_j];
            if ($(i).text().indexOf(azName) !== -1) {
              $(i).addClass("resource-disabled");
              break;
            }
          }
        }
      },
      updateDisabledVpcRes: function() {
        var $ul, design;
        $ul = this.$el.find(".resource-icon-igw").parent();
        design = this.workspace.design;
        $ul.children(".resource-icon-igw").toggleClass("resource-disabled", design.componentsOfType(constant.RESTYPE.IGW).length > 0);
        $ul.children(".resource-icon-vgw").toggleClass("resource-disabled", design.componentsOfType(constant.RESTYPE.VGW).length > 0);
      },
      updateFavList: function() {
        if (this.__amiType === "FavoriteAmi") {
          return this.updateAmi();
        }
      },
      updateMyAmiList: function() {
        if (this.__amiType === "MyAmi") {
          return this.updateAmi();
        }
      },
      toggleFav: function(evt) {
        var $tgt, amiCln;
        $tgt = $(evt.currentTarget).toggleClass("fav");
        amiCln = CloudResources("FavoriteAmi", this.workspace.opsModel.get("region"));
        if ($tgt.hasClass("fav")) {
          amiCln.fav($tgt.attr("data-id"));
        } else {
          amiCln.unfav($tgt.attr("data-id"));
        }
        return false;
      },
      toggleLeftPanel: function() {
        this.__leftPanelHidden = this.$el.toggleClass("hidden").hasClass("hidden");
        return false;
      },
      updateAccordion: function(event, noAnimate) {
        var $accordion, $accordionParent, $accordionWrap, $body, $expanded, $target, $visibleAccordion, height;
        $target = $(event.currentTarget);
        $accordion = $target.closest(".accordion-group");
        if (event.target && !$(event.target).hasClass("fixedaccordion-head")) {
          return;
        }
        if ($accordion.hasClass("expanded")) {
          return false;
        }
        this.__openedAccordion = $accordion.index();
        $expanded = $accordion.siblings(".expanded");
        $body = $accordion.children(".accordion-body");
        $accordionWrap = $accordion.closest(".fixedaccordion");
        $accordionParent = $accordionWrap.parent();
        $visibleAccordion = $accordionWrap.children().filter(function() {
          return $(this).css('display') !== 'none';
        });
        height = $accordionParent.outerHeight() - 39 - $visibleAccordion.length * $target.outerHeight();
        $body.outerHeight(height);
        if (noAnimate) {
          $accordion.addClass("expanded");
          $expanded.removeClass("expanded");
          return false;
        }
        $body.slideDown(200, function() {
          return $accordion.addClass("expanded");
        });
        $expanded.children(".accordion-body").slideUp(200, function() {
          return $expanded.closest(".accordion-group").removeClass("expanded");
        });
        return false;
      },
      recalcAccordion: function() {
        var $accordion, $accordions, $target, leftpane;
        leftpane = this.$el;
        if (!leftpane.length) {
          return;
        }
        $accordions = leftpane.children(".fixedaccordion").children();
        $accordion = $accordions.filter(".expanded");
        if ($accordion.length === 0) {
          $accordion = $accordions.eq(this.__openedAccordion || 0);
        }
        $target = $accordion.removeClass('expanded').children('.fixedaccordion-head');
        return this.updateAccordion({
          currentTarget: $target[0]
        }, true);
      },
      browseCommunityAmi: function() {
        var amiBrowser, region;
        region = this.workspace.opsModel.get("region");
        this.listenTo(CloudResources("FavoriteAmi", region), "update", this.updateFavList);
        amiBrowser = new AmiBrowser({
          region: region
        });
        amiBrowser.onClose = (function(_this) {
          return function() {
            return _this.stopListening(CloudResources("FavoriteAmi", region), "update", _this.updateFavList);
          };
        })(this);
        return false;
      },
      manageSnapshot: function() {
        return new snapshotManager().render();
      },
      refreshPanelData: function(evt) {
        var $tgt, region;
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("reloading")) {
          return;
        }
        $tgt.addClass("reloading");
        region = this.workspace.opsModel.get("region");
        Q.all([CloudResources("MyAmi", region).fetchForce(), CloudResources(constant.RESTYPE.SNAP, region).fetchForce()]).done(function() {
          return $tgt.removeClass("reloading");
        });
      },
      resourcesMenuClick: function(event) {
        var $currentDom, currentAction;
        $currentDom = $(event.currentTarget);
        currentAction = $currentDom.data('action');
        switch (currentAction) {
          case 'keypair':
            return new keypairManager().render();
          case 'snapshot':
            return new snapshotManager().render();
          case 'sns':
            return new snsManager().render();
          case 'sslcert':
            return new sslCertManager().render();
          case 'dhcp':
            return (new dhcpManager()).manageDhcp();
        }
      },
      startDrag: function(evt) {
        var $changeAmiZone, $item, $tgt, component_size, drop_zone_data, drop_zone_offset, node_type, placeOffsetX, placeOffsetY, target_group_type, tgtOffset, type;
        if (evt.button !== 0) {
          return false;
        }
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("resource-disabled")) {
          return false;
        }
        if (evt.target && $(evt.target).hasClass("btn-fav-ami")) {
          return;
        }
        type = constant.RESTYPE[$tgt.attr("data-type")];
        console.assert(type);
        $("<div id='ResourceDragItem'></div><div id='overlayer' class='grabbing'></div>").appendTo(document.body);
        tgtOffset = $tgt.offset();
        $item = $("#ResourceDragItem").html($tgt.html()).attr("class", $tgt.attr("class")).css({
          'top': tgtOffset.top,
          'left': tgtOffset.left
        });
        setTimeout(function() {
          return $item.addClass("add-to-dom");
        }, 10);
        if (type === constant.RESTYPE.VOL) {
          Canvon('.AWS-EC2-Instance, .AWS-AutoScaling-LaunchConfiguration').addClass('attachable');
          $(document).on({
            'mousemove': MC.canvas.volume.mousemove,
            'mouseup': MC.canvas.volume.mouseup
          }, {
            'target': $tgt,
            'canvas_offset': $canvas.offset(),
            'canvas_body': $('#canvas_body'),
            'shadow': $item,
            'action': 'add'
          });
        } else {
          target_group_type = MC.canvas.MATCH_PLACEMENT[type];
          if (target_group_type) {
            Canvon('.' + target_group_type.join(',').replace(/\./ig, '-').replace(/,/ig, ',.')).addClass('dropable-group');
          }
          if (type === constant.RESTYPE.INSTANCE) {
            $changeAmiZone = $("#changeAmiDropZone");
            if ($changeAmiZone.is(":visible")) {
              drop_zone_offset = $changeAmiZone.offset();
              drop_zone_data = {
                'x1': drop_zone_offset.left,
                'x2': drop_zone_offset.left + $changeAmiZone.width(),
                'y1': drop_zone_offset.top,
                'y2': drop_zone_offset.top + $changeAmiZone.height()
              };
            }
          }
          component_size = MC.canvas.GROUP_DEFAULT_SIZE[type];
          node_type = "group";
          placeOffsetX = 0;
          placeOffsetY = 0;
          if (!component_size) {
            component_size = MC.canvas.COMPONENT_SIZE[type];
            node_type = "node";
            placeOffsetX = 8;
            placeOffsetY = 8;
          }
          if (type === constant.RESTYPE.INSTANCE) {
            placeOffsetY = 0;
          }
          if (type === constant.RESTYPE.ASG) {
            placeOffsetX = -8;
          }
          $(document).on({
            'mousemove.SidebarDrag': this.onDragMove,
            'mouseup.SidebarDrag': this.onDragStop
          }, {
            'target_type': type,
            'canvas_offset': $canvas.offset(),
            'drop_zone': $changeAmiZone,
            'drop_zone_data': drop_zone_data,
            "comp_size": component_size,
            "node_type": node_type,
            'offsetX': evt.pageX - tgtOffset.left,
            'offsetY': evt.pageY - tgtOffset.top,
            "placeOffsetY": placeOffsetY,
            "placeOffsetX": placeOffsetX,
            'target': $tgt,
            "scale": $canvas.scale()
          });
          $('#canvas_body').addClass('node-dragging');
        }
        MC.canvas.volume.close();
        MC.canvas.event.clearSelected();
        return false;
      },
      onDragMove: function(evt) {
        var canvas_offset, event_data, hover, match_place;
        Canvon('.match-dropable-group').removeClass('match-dropable-group');
        event_data = evt.data;
        canvas_offset = event_data.canvas_offset;
        match_place = MC.canvas.isMatchPlace(null, event_data.target_type, event_data.node_type, (evt.pageX - event_data.offsetX - event_data.placeOffsetX - canvas_offset.left) / 10 * event_data.scale, (evt.pageY - event_data.offsetY - event_data.placeOffsetY - canvas_offset.top) / 10 * event_data.scale, event_data.comp_size[0], event_data.comp_size[1]);
        if (match_place.is_matched) {
          Canvon('#' + match_place.target).addClass('match-dropable-group');
        }
        if (event_data.drop_zone_data) {
          hover = event.pageX > event_data.drop_zone_data.x1 && event.pageX < event_data.drop_zone_data.x2 && event.pageY > event_data.drop_zone_data.y1 && event.pageY < event_data.drop_zone_data.y2;
          event_data.drop_zone.toggleClass("hover", hover);
        }
        $("#ResourceDragItem").css({
          top: evt.pageY - event_data.offsetY,
          left: evt.pageX - event_data.offsetX
        });
        return false;
      },
      onDragStop: function(event) {
        var $item, areaChild, canvas_offset, component_size, coordinate, event_data, match_place, new_node_id, node_option, node_type, target_type, vpc_coordinate, vpc_id, vpc_item, vpc_size;
        $("#overlayer").remove();
        $item = $("#ResourceDragItem");
        Canvon('.dropable-group').removeClass('dropable-group');
        Canvon('.match-dropable-group').removeClass('match-dropable-group');
        $('#canvas_body').removeClass('node-dragging');
        $(document).off('mousemove.SidebarDrag').off('mouseup.SidebarDrag');
        event_data = event.data;
        if (event_data.drop_zone_data && event.pageX > event_data.drop_zone_data.x1 && event.pageX < event_data.drop_zone_data.x2 && event.pageY > event_data.drop_zone_data.y1 && event.pageY < event_data.drop_zone_data.y2) {
          event_data.drop_zone.removeClass("hover").trigger("drop", $(event.data.target).data('option').imageId);
          $item.remove();
          return false;
        }
        node_type = event_data.node_type;
        target_type = event_data.target_type;
        canvas_offset = event_data.canvas_offset;
        node_option = event_data.target.data('option') || {};
        component_size = event_data.comp_size;
        coordinate = {
          x: (event.pageX - event_data.offsetX - event_data.placeOffsetX - canvas_offset.left) / 10 * event_data.scale,
          y: (event.pageY - event_data.offsetY - event_data.placeOffsetY - canvas_offset.top) / 10 * event_data.scale
        };
        if (coordinate.x < 0 || coordinate.y < 0) {
          $item.remove();
          return;
        }
        if (node_type === "node") {
          if (target_type === constant.RESTYPE.IGW || target_type === constant.RESTYPE.VGW) {
            vpc_id = $('.AWS-VPC-VPC').attr('id');
            vpc_item = $canvas(vpc_id);
            vpc_coordinate = vpc_item.position();
            vpc_size = vpc_item.size();
            node_option.groupUId = vpc_id;
            if (coordinate.y > vpc_coordinate[1] + vpc_size[1] - component_size[1]) {
              coordinate.y = vpc_coordinate[1] + vpc_size[1] - component_size[1];
            }
            if (coordinate.y < vpc_coordinate[1]) {
              coordinate.y = vpc_coordinate[1];
            }
            if (target_type === constant.RESTYPE.IGW) {
              coordinate.x = vpc_coordinate[0] - (component_size[1] / 2);
            } else {
              coordinate.x = vpc_coordinate[0] + vpc_size[0] - (component_size[1] / 2);
            }
            $canvas.add(target_type, node_option, coordinate);
          } else {
            match_place = MC.canvas.isMatchPlace(null, target_type, node_type, coordinate.x, coordinate.y, component_size[0], component_size[1]);
            if (match_place.is_matched) {
              node_option.groupUId = match_place.target;
              new_node_id = $canvas.add(target_type, node_option, coordinate);
              if (new_node_id) {
                MC.canvas.select(new_node_id);
              }
            } else {
              $canvas.trigger("CANVAS_PLACE_NOT_MATCH", {
                'type': target_type
              });
            }
          }
        } else {
          match_place = MC.canvas.isMatchPlace(null, target_type, node_type, coordinate.x, coordinate.y, component_size[0], component_size[1]);
          areaChild = MC.canvas.areaChild(null, target_type, coordinate.x, coordinate.y, coordinate.x + component_size[0], coordinate.y + component_size[1]);
          if (match_place.is_matched) {
            if (areaChild.length === 0 && MC.canvas.isBlank("", target_type, 'group', coordinate.x - 1, coordinate.y - 1, component_size[0] + 2, component_size[1] + 2)) {
              node_option.groupUId = match_place.target;
              new_node_id = $canvas.add(target_type, node_option, coordinate);
              if (!($canvas.hasVPC() && target_type === constant.RESTYPE.AZ)) {
                MC.canvas.select(new_node_id);
              }
            } else {
              $canvas.trigger("CANVAS_PLACE_OVERLAP");
            }
          } else {
            $canvas.trigger("CANVAS_PLACE_NOT_MATCH", {
              type: target_type
            });
          }
        }
        if (target_type === constant.RESTYPE.IGW || target_type === constant.RESTYPE.VGW) {
          $item.animate({
            'left': coordinate.x * 10 + canvas_offset.left,
            'top': coordinate.y * 10 + canvas_offset.top,
            'opacity': 0
          }, function() {
            return $item.remove();
          });
        } else {
          $item.remove();
        }
        return false;
      }
    });
  });

}).call(this);

define('workspaces/editor/template/TplStatusbar',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"status-bar\"></ul>\n<div class=\"status-bar-modal\" style=\"display: none;\"></div>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Last saved: <span class=\"stack-save-time\">-<span>";
  };
TEMPLATE.lastSaved=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span class=\"state-success\"><i class=\"status status-green icon-label\"></i><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.successCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>\n<span class=\"state-failed\"><i class=\"status status-red icon-label\"></i><b>"
    + escapeExpression(((stack1 = (depth0 && depth0.failCount)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</b></span>";
  return buffer;
  };
TEMPLATE.state=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "Validate";
  };
TEMPLATE.ta=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/editor/subviews/Statusbar',["OpsModel", "Design", "../template/TplStatusbar", "constant", "backbone", "event", "state_status"], function(OpsModel, Design, template, constant, Backbone, ide_event, stateStatus) {
    var itemView, items, workspace;
    items = [
      {
        name: 'lastSaved',
        className: 'info',
        visible: true,
        events: {
          update: function() {
            return [
              {
                obj: workspace.opsModel,
                event: 'jsonDataSaved'
              }
            ];
          }
        },
        update: function($) {
          var $item, save_time;
          save_time = jQuery.now() / 1000;
          clearInterval(this.timer);
          $item = $('.stack-save-time');
          $item.text(MC.intervalDate(save_time));
          $item.attr('data-save-time', save_time);
          this.timer = setInterval(function() {
            $item = $('.stack-save-time');
            return $item.text(MC.intervalDate($item.attr('data-save-time')));
          }, 500);
          return null;
        },
        click: function(event) {
          return null;
        }
      }, {
        name: 'ta',
        className: 'status-bar-btn',
        visible: function(toggle) {
          var isVisible, mode;
          mode = workspace.design.mode();
          if (mode === 'app' || mode === 'appview') {
            isVisible = false;
          } else {
            isVisible = true;
          }
          if (typeof toggle === "function") {
            toggle(isVisible);
          }
          return isVisible;
        },
        click: function(event) {
          var btnDom, currentText;
          btnDom = $(event.currentTarget);
          currentText = 'Validate';
          btnDom.text('Validating...');
          return setTimeout(function() {
            MC.ta.validAll();
            btnDom.text(currentText);
            return require(['component/trustedadvisor/main'], function(trustedadvisor_main) {
              return trustedadvisor_main.loadModule('statusbar', null);
            });
          }, 50);
        }
      }, {
        name: 'state',
        className: 'status-bar-btn',
        visible: function(toggle) {
          var appStoped, isVisible, mode;
          mode = workspace.design.mode();
          appStoped = workspace.opsModel.testState(OpsModel.State.Stopped);
          isVisible = false;
          if (mode === 'app' || mode === 'appedit') {
            isVisible = !appStoped;
          } else if (mode === 'appview') {
            isVisible = false;
          }
          if (typeof toggle === "function") {
            toggle(isVisible);
          }
          return isVisible;
        },
        events: {
          changeVisible: [
            {
              obj: ide_event,
              event: ide_event.UPDATE_APP_STATE
            }
          ],
          update: [
            {
              obj: ide_event,
              event: ide_event.UPDATE_STATE_STATUS_DATA
            }
          ]
        },
        update: function($) {
          var data;
          data = this.renderData();
          $('.state-success b').text(data.successCount);
          return $('.state-failed b').text(data.failCount);
        },
        renderData: function() {
          var failed, state, stateList, status, succeed, _i, _j, _len, _len1, _ref;
          if (!this.visible()) {
            return {};
          }
          stateList = App.WS.collection.status.find().fetch();
          succeed = failed = 0;
          if (!_.isArray(stateList)) {
            stateList = [stateList];
          }
          for (_i = 0, _len = stateList.length; _i < _len; _i++) {
            state = stateList[_i];
            if (state.app_id !== workspace.opsModel.get('id')) {
              continue;
            }
            if (state.status) {
              _ref = state.status;
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                status = _ref[_j];
                if (status.result === 'success') {
                  succeed++;
                } else if (status.result === 'failure') {
                  failed++;
                }
              }
            }
          }
          return {
            successCount: succeed,
            failCount: failed
          };
        },
        click: function(event) {
          return stateStatus.loadModule();
        }
      }
    ];
    workspace = null;
    itemView = Backbone.View.extend({
      tagName: 'li',
      initialize: function() {
        return _.bindAll(this, 'render', 'toggle');
      },
      render: function() {
        this.$el.html(this.template(this.data));
        return this;
      },
      toggle: function(showOrHide) {
        return this.$el.toggle(showOrHide);
      },
      clearGarbage: [],
      remove: function() {
        var garbage, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.clearGarbage;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          garbage = _ref[_i];
          garbage();
        }
        return this;
      }
    });
    return Backbone.View.extend({
      initialize: function(options) {
        return workspace = this.workspace = options.workspace;
      },
      itemViews: [],
      render: function() {
        this.setElement(this.workspace.view.$el.find(".OEPanelBottom").html(template.frame()));
        this.renderItem();
        return this;
      },
      renderItem: function() {
        var e, event, index, item, that, type, view, wrap$, wrapToggle, wrapUpdate, wrapVisible, _i, _j, _len, _len1, _ref, _ref1;
        that = this;
        _ref = items.reverse();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          item = _ref[index];
          view = new itemView();
          view.delegateEvents({
            click: item.click
          });
          view.template = template[item.name];
          view.data = (typeof item.renderData === "function" ? item.renderData() : void 0) || {};
          view.$el.addClass(item.className);
          _ref1 = item.events;
          for (type in _ref1) {
            event = _ref1[type];
            if (!_.isArray(event)) {
              continue;
            }
            for (_j = 0, _len1 = event.length; _j < _len1; _j++) {
              e = event[_j];
              if (type === 'update') {
                wrap$ = _.bind(view.$, view);
                wrapUpdate = _.bind(item.update, item, wrap$);
                if (e.obj === ide_event) {
                  ide_event.onLongListen(e.event, wrapUpdate);
                  view.clearGarbage.push(function() {
                    return ide_event.offListen(e.event, wrapUpdate);
                  });
                } else {
                  view.listenTo(e.obj, e.event, wrapUpdate);
                }
              } else if (type === 'changeVisible') {
                wrapToggle = _.bind(view.toggle, view);
                wrapVisible = _.bind(item.visible, item, wrapToggle);
              }
              if (e.obj === ide_event) {
                ide_event.onLongListen(e.event, wrapVisible);
                view.clearGarbage.push(function() {
                  return ide_event.offListen(e.event, wrapVisible);
                });
              } else {
                view.listenTo(e.obj, e.event, wrapVisible);
              }
            }
          }
          if (_.isFunction(item.visible)) {
            item.visible(view.toggle);
          } else {
            view.toggle(item.visible);
          }
          this.itemViews.push(view);
          null;
          this.$('ul').append(view.render().el);
          this;
        }
        return {
          remove: function() {
            var _k, _len2, _ref2;
            this.$el.remove();
            this.stopListening();
            _ref2 = this.itemViews;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              view = _ref2[_k];
              view.remove();
            }
            return this;
          }
        };
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/StackView',["./OpsViewBase", "./subviews/ResourcePanel", "./subviews/Statusbar", "OpsModel"], function(OpsViewBase, ResourcePanel, Statusbar, OpsModel) {
    return OpsViewBase.extend({
      events: {
        "SAVE": "saveStack"
      },
      initialize: function() {
        this.resourcePanel = new ResourcePanel({
          workspace: this.workspace
        });
        this.statusbar = new Statusbar({
          workspace: this.workspace
        });
      },
      bindUserEvent: function() {
        this.$el.find(".OEPanelCenter").on('mousedown', '.port', MC.canvas.event.drawConnection.mousedown).on('mousedown', '.dragable', MC.canvas.event.dragable.mousedown).on('mousedown', '.group-resizer', MC.canvas.event.groupResize.mousedown).on('mouseenter mouseleave', '.node', MC.canvas.event.nodeHover).on('click', '.line', MC.canvas.event.selectLine).on('mousedown', '#svg_canvas', MC.canvas.event.clickBlank).on('mousedown', '#node-action-wrap', MC.canvas.nodeAction.popup).on('mousedown', MC.canvas.event.ctrlMove.mousedown).on('mousedown', MC.canvas.event.clearSelected).on('selectstart', false);
        $("#canvas_body").addClass("canvas_state_stack");
      },
      renderSubviews: function() {
        this.resourcePanel.render();
        this.statusbar.render();
      },
      removeSubviews: function() {
        this.resourcePanel.remove();
      },
      saveStack: function() {
        return this.toolbar.$el.find(".icon-save").trigger("click");
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/StackEditor',["./OpsEditorBase", "./StackView", "Design", "CloudResources", "constant"], function(OpsEditorBase, StackView, Design, CloudResources, constant) {

    /*
      StackEditor is mainly for editing a stack
     */
    var StackEditor;
    StackEditor = (function(_super) {
      __extends(StackEditor, _super);

      function StackEditor() {
        return StackEditor.__super__.constructor.apply(this, arguments);
      }

      StackEditor.prototype.title = function() {
        return (this.design || this.opsModel).get("name") + " - stack";
      };

      StackEditor.prototype.tabClass = function() {
        return "icon-stack-tabbar";
      };

      StackEditor.prototype.createView = function() {
        return new StackView({
          workspace: this
        });
      };

      StackEditor.prototype.isReady = function() {
        var region, stateModule;
        if (!this.opsModel.hasJsonData()) {
          return false;
        }
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return CloudResources(constant.RESTYPE.AZ, region).isReady() && CloudResources(constant.RESTYPE.SNAP, region).isReady() && CloudResources("QuickStartAmi", region).isReady() && CloudResources("MyAmi", region).isReady() && CloudResources("FavoriteAmi", region).isReady() && !!App.model.getStateModule(stateModule.repo, stateModule.tag) && this.hasAmiData();
      };

      StackEditor.prototype.fetchAdditionalData = function() {
        var region, stateModule;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.AZ, region).fetch(), CloudResources(constant.RESTYPE.SNAP, region).fetch(), CloudResources("QuickStartAmi", region).fetch(), CloudResources("MyAmi", region).fetch(), CloudResources("FavoriteAmi", region).fetch(), this.fetchAmiData()]);
      };

      StackEditor.prototype.hasAmiData = function() {
        var cln, comp, imageId, json, uid, _ref;
        json = this.opsModel.getJsonData();
        cln = CloudResources(constant.RESTYPE.AMI, this.opsModel.get("region"));
        _ref = json.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.INSTANCE || comp.type === constant.RESTYPE.LC) {
            imageId = comp.resource.ImageId;
            if (imageId && !cln.get(imageId)) {
              return false;
            }
          }
        }
        return true;
      };

      StackEditor.prototype.fetchAmiData = function() {
        var comp, imageId, json, toFetch, uid, _ref;
        json = this.opsModel.getJsonData();
        toFetch = {};
        _ref = json.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === constant.RESTYPE.INSTANCE || comp.type === constant.RESTYPE.LC) {
            imageId = comp.resource.ImageId;
            if (imageId) {
              toFetch[imageId] = true;
            }
          }
        }
        return CloudResources(constant.RESTYPE.AMI, this.opsModel.get("region")).fetchAmis(_.keys(toFetch));
      };

      StackEditor.prototype.cleanup = function() {
        OpsEditorBase.prototype.cleanup.call(this);
        if (!this.opsModel.isPresisted()) {
          this.opsModel.remove();
        }
      };

      StackEditor.prototype.isModified = function() {
        if (!this.opsModel.isPresisted()) {
          return true;
        }
        return this.design && this.design.isModified();
      };

      return StackEditor;

    })(OpsEditorBase);
    return StackEditor;
  });

}).call(this);

(function() {
  define('workspaces/editor/AppView',["./StackView", "OpsModel", "./template/TplOpsEditor"], function(StackView, OpsModel, OpsEditorTpl) {
    return StackView.extend({
      bindUserEvent: function() {
        if (this.workspace.isAppEditMode()) {
          this.$el.find(".OEPanelCenter").removeClass('canvas_state_app').addClass("canvas_state_appedit").off(".CANVAS_EVENT").on('mousedown.CANVAS_EVENT', '.instance-volume, .instanceList-item-volume, .asgList-item-volume', MC.canvas.volume.show).on('mousedown.CANVAS_EVENT', '.port', MC.canvas.event.appDrawConnection).on('mousedown.CANVAS_EVENT', '.dragable', MC.canvas.event.dragable.mousedown).on('mousedown.CANVAS_EVENT', '.group-resizer', MC.canvas.event.groupResize.mousedown).on('click.CANVAS_EVENT', '.line', MC.canvas.event.selectLine).on('mousedown.CANVAS_EVENT', MC.canvas.event.clearSelected).on('mousedown.CANVAS_EVENT', '#svg_canvas', MC.canvas.event.clickBlank).on('mouseenter.CANVAS_EVENT mouseleave.CANVAS_EVENT', '.node', MC.canvas.event.nodeHover).on('selectstart.CANVAS_EVENT', false).on('mousedown.CANVAS_EVENT', MC.canvas.event.ctrlMove.mousedown).on('mousedown.CANVAS_EVENT', '#node-action-wrap', MC.canvas.nodeAction.popup);
        } else {
          this.$el.find(".OEPanelCenter").removeClass('canvas_state_appedit').addClass("canvas_state_app").off(".CANVAS_EVENT").on('mousedown.CANVAS_EVENT', '.instance-volume, .instanceList-item-volume, .asgList-item-volume', MC.canvas.volume.show).on('click.CANVAS_EVENT', '.line', MC.canvas.event.selectLine).on('mousedown.CANVAS_EVENT', MC.canvas.event.clearSelected).on('mousedown.CANVAS_EVENT', '#svg_canvas', MC.canvas.event.clickBlank).on('selectstart.CANVAS_EVENT', false).on('mousedown.CANVAS_EVENT', '.dragable', MC.canvas.event.selectNode).on('mousedown.CANVAS_EVENT', '.AWS-AutoScaling-LaunchConfiguration .instance-number-group', MC.canvas.asgList.show).on('mousedown.CANVAS_EVENT', '.AWS-EC2-Instance .instance-number-group', MC.canvas.instanceList.show).on('mousedown.CANVAS_EVENT', '.AWS-VPC-NetworkInterface .eni-number-group', MC.canvas.eniList.show).on('mousedown.CANVAS_EVENT', MC.canvas.event.ctrlMove.mousedown).on('mousedown.CANVAS_EVENT', '#node-action-wrap', MC.canvas.nodeAction.popup).on('mouseenter.CANVAS_EVENT mouseleave.CANVAS_EVENT', '.node', MC.canvas.event.nodeHover);
        }
      },
      renderSubviews: function() {
        if (this.workspace.isAppEditMode()) {
          this.resourcePanel.render();
        }
        this.$el.find(".OEPanelLeft").toggleClass("force-hidden", !this.workspace.isAppEditMode());
        this.statusbar.render();
        this.toggleProcessing();
        this.updateProgress();
      },
      toggleProcessing: function() {
        var opsModel, text;
        if (!this.$el) {
          return;
        }
        this.toolbar.updateTbBtns();
        this.$el.children(".ops-process").remove();
        opsModel = this.workspace.opsModel;
        if (!opsModel.isProcessing()) {
          return;
        }
        switch (opsModel.get("state")) {
          case OpsModel.State.Starting:
            text = "Starting your app...";
            break;
          case OpsModel.State.Stopping:
            text = "Stopping your app...";
            break;
          case OpsModel.State.Terminating:
            text = "Terminating your app..";
            break;
          case OpsModel.State.Updating:
            text = "Applying changes to your app...";
            break;
          default:
            console.warn("Unknown opsmodel state when showing loading in AppEditor,", opsModel);
            text = "Processing your request...";
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
      switchMode: function(isAppEditMode) {
        this.toolbar.updateTbBtns();
        this.$el.find(".OEPanelLeft").toggleClass("force-hidden", !isAppEditMode);
        if (isAppEditMode) {
          this.resourcePanel.render();
        } else {
          this.$el.find(".OEPanelLeft").empty();
        }
        this.propertyPanel.openPanel();
        this.bindUserEvent();
      },
      emptyCanvas: function() {
        $("#vpc_layer, #az_layer, #subnet_layer, #asg_layer, #line_layer, #node_layer").empty();
      },
      showUpdateStatus: function(error) {
        var self;
        this.$el.find(".ops-process").remove();
        self = this;
        $(OpsEditorTpl.appUpdateStatus({
          error: error
        })).appendTo(this.$el).find("#processDoneBtn").click(function() {
          return self.$el.find(".ops-process").remove();
        });
      }
    });
  });

}).call(this);

define('workspaces/editor/diff/resDiffTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"scroll-wrap scroll-wrap-res-diff\">\n	<div class=\"scrollbar-veritical-wrap\" style=\"display: block;\"><div class=\"scrollbar-veritical-thumb\"></div></div>\n	<div class=\"content_wrap scroll-content\">\n		<p>Resources of this app has been externally changed. The change has been synced to app. The diagram may be re-generated to reflect the change.</p>\n		<h5>What has been changed:</h5>\n		<article></article>\n	</div>\n</div>";
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"group "
    + escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n	<div class=\"head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.title)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "<span class=\"count\">("
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></div>\n	<div class=\"content\"></div>\n</div>";
  return buffer;
  };
TEMPLATE.resDiffGroup=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"tree\"></ul>";
  };
TEMPLATE.resDiffTree=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "closed";
  }

  buffer += "<li class=\"item ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.closed), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	<div class=\"meta\">\n		<span class=\"type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n		<span class=\"name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	</div>\n</li>";
  return buffer;
  };
TEMPLATE.resDiffTreeItem=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var stack1;
  return escapeExpression(((stack1 = (depth0 && depth0.type)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1));
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"to\"> -></span><span class=\""
    + escapeExpression(((stack1 = (depth0 && depth0.type1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value1)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>";
  return buffer;
  }

  buffer += "<div class=\"meta\">\n	<span class=\"type\">"
    + escapeExpression(((stack1 = (depth0 && depth0.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	<span class=\"name ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.type), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">"
    + escapeExpression(((stack1 = (depth0 && depth0.value)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.value1), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  };
TEMPLATE.resDiffTreeMeta=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/editor/diff/DiffTree',[], function() {
    var DiffTree;
    DiffTree = function() {
      var getType, isArray, typeofReal, _compare, _diffAry;
      isArray = function(value) {
        return value && typeof value === 'object' && value.constructor === Array;
      };
      typeofReal = function(value) {
        if (isArray(value)) {
          return 'array';
        } else {
          if (value === null) {
            return 'null';
          } else {
            return typeof value;
          }
        }
      };
      getType = function(value) {
        if (typeA === 'object' || typeA === 'array') {
          return '';
        } else {
          return String(a) + ' ';
        }
      };
      _diffAry = function(a, b) {
        var i, j, tmp, v, _i, _j, _len, _ref, _ref1, _results, _results1;
        _ref1 = (function() {
          _results1 = [];
          for (var _j = 0, _ref = a.length; 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
          return _results1;
        }).apply(this);
        _results = [];
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          v = _ref1[i];
          _results.push((function() {
            var _k, _l, _len1, _ref2, _ref3, _results2, _results3;
            _ref3 = (function() {
              _results3 = [];
              for (var _l = 0, _ref2 = b.length; 0 <= _ref2 ? _l < _ref2 : _l > _ref2; 0 <= _ref2 ? _l++ : _l--){ _results3.push(_l); }
              return _results3;
            }).apply(this);
            _results2 = [];
            for (j = _k = 0, _len1 = _ref3.length; _k < _len1; j = ++_k) {
              v = _ref3[j];
              if (!_compare(a[i], b[j], '', [], [])) {
                tmp = b[i];
                b[i] = b[j];
                _results2.push(b[j] = tmp);
              } else {
                _results2.push(void 0);
              }
            }
            return _results2;
          })());
        }
        return _results;
      };
      _compare = function(a, b, key, path, resultJSON) {
        var aString, bString, changeType, diffAryResult, hasDiff, haveDiff, i, isEqual, keys, pathStr, typeA, typeB, v, value1, value2, _i, _len;
        if (key) {
          path.push(key);
        }
        pathStr = path.join('.');
        if (!a && !b) {
          return;
        }
        haveDiff = false;
        typeA = typeofReal(a);
        typeB = typeofReal(b);
        aString = typeA === 'object' || typeA === 'array' ? '' : String(a) + '';
        bString = typeB === 'object' || typeB === 'array' ? '' : String(b) + '';
        if (!aString) {
          aString = '';
        }
        if (!bString) {
          bString = '';
        }
        changeType = value1 = value2 = '';
        if (a === void 0) {
          changeType = 'added';
          value2 = bString;
        } else if (b === void 0) {
          changeType = 'removed';
          value1 = aString;
        } else if (typeA !== typeB || (typeA !== 'object' && typeA !== 'array' && a !== b)) {
          changeType = 'changed';
          value1 = aString;
          value2 = bString;
        } else {
          value1 = aString;
        }
        resultJSON[key] = {};
        if (typeA === 'object' || typeA === 'array' || typeB === 'object' || typeB === 'array') {
          if (typeA === 'array' && typeB === 'array') {
            diffAryResult = {};
            if (a.length < b.length) {
              _diffAry(a, b);
            } else {
              _diffAry(b, a);
            }
          }
          keys = [];
          for (v in a) {
            keys.push(v);
          }
          for (v in b) {
            keys.push(v);
          }
          keys.sort();
          isEqual = true;
          if (typeA === 'array' && typeB === 'array') {
            console.log(keys);
          }
          for (i = _i = 0, _len = keys.length; _i < _len; i = ++_i) {
            v = keys[i];
            if (keys[i] === keys[i - 1]) {
              continue;
            }
            hasDiff = _compare(a && a[keys[i]], b && b[keys[i]], keys[i], path, resultJSON[key]);
            if (hasDiff) {
              isEqual = false;
            }
          }
          haveDiff = !isEqual;
          if (isEqual) {
            delete resultJSON[key];
          }
        } else {
          if (a !== b) {
            haveDiff = true;
            resultJSON[key] = {
              type: changeType,
              __old__: a,
              __new__: b
            };
          } else {
            delete resultJSON[key];
          }
        }
        return haveDiff;
      };
      this.compare = function(json1, json2) {
        var resultJSON;
        resultJSON = {};
        _compare(json1, json2, 'result', [], resultJSON);
        return resultJSON.result;
      };
      return null;
    };
    return DiffTree;
  });

}).call(this);

(function() {
  define('workspaces/editor/diff/prepare',['constant'], function(constant) {
    var Prepare, helper, prepareNode;
    helper = function(options) {
      return {
        getNodeMap: function(path) {
          var newComp, newCompAttr, oldComp, oldCompAttr, retVal;
          if (_.isString(path)) {
            path = path.split('.');
          }
          oldComp = options.oldAppJSON.component;
          newComp = options.newAppJSON.component;
          oldCompAttr = _.extend(oldComp, {});
          newCompAttr = _.extend(newComp, {});
          _.each(path, function(attr) {
            if (oldCompAttr) {
              if (_.isUndefined(oldCompAttr[attr])) {
                oldCompAttr = void 0;
              } else {
                oldCompAttr = oldCompAttr[attr];
              }
            }
            if (newCompAttr) {
              if (_.isUndefined(newCompAttr[attr])) {
                return newCompAttr = void 0;
              } else {
                return newCompAttr = newCompAttr[attr];
              }
            }
          });
          return retVal = {
            oldAttr: oldCompAttr,
            newAttr: newCompAttr
          };
        },
        genValue: function(type, oldValue, newValue) {
          var result;
          result = '';
          if (type === 'changed') {
            if (!oldValue) {
              oldValue = 'none';
            }
            if (!newValue) {
              newValue = 'none';
            }
          }
          if (oldValue) {
            result = oldValue;
            if (newValue && oldValue !== newValue) {
              result += ' -> ' + newValue;
            }
          } else {
            result = newValue;
          }
          return result;
        },
        getNodeData: function(path) {
          return this.getNewest(this.getNodeMap(path));
        },
        getNewest: function(attrMap) {
          return attrMap.newAttr || attrMap.oldAttr;
        },
        pluralToSingular: function(str) {
          return str.slice(0, -1);
        },
        setToElement: function(str) {
          return str.slice(0, -3);
        },
        replaceArrayIndex: function(path, data) {
          var childNode, component, componentMap, deviceObj, parentKey, type;
          componentMap = this.getNodeMap(path[0]);
          component = this.getNewest(componentMap);
          type = component.type;
          parentKey = path[path.length - 2];
          childNode = data.originValue;
          switch (parentKey) {
            case 'BlockDeviceMapping':
              deviceObj = childNode.DeviceName;
              data.key = this.genValue(deviceObj.type, deviceObj.__old__, deviceObj.__new__);
              break;
            case 'GroupSet':
              data.key = 'SecurityGroup';
              break;
            case 'IpPermissions':
            case 'IpPermissionsEgress':
            case 'EntrySet':
              data.key = 'Rule';
              break;
            case 'AssociationSet':
            case 'AttachmentSet':
            case 'PrivateIpAddressSet':
              data.key = this.setToElement(parentKey);
              break;
            case 'Dimensions':
            case 'AlarmActions':
              data.key = this.pluralToSingular(parentKey);
              break;
            case 'NotificationType':
              data = data;
          }
          if (path.length === 1) {
            data.key = constant.RESNAME[data.key] || data.key;
          }
          return data;
        }
      };
    };
    prepareNode = function(path, data) {
      var compAttrObj, compUID, newAttr, newCompName, newRef, newValue, oldAttr, oldCompName, oldRef, valueRef, _getRef, _ref;
      _getRef = function(value) {
        var refMatchAry, refName, refRegex, refUID;
        if (_.isString(value) && value.indexOf('@{') === 0) {
          refRegex = /@\{.*\}/g;
          refMatchAry = value.match(refRegex);
          if (refMatchAry && refMatchAry.length) {
            refName = value.slice(2, value.length - 1);
            refUID = refName.split('.')[0];
            if (refUID) {
              return "" + refUID + ".name";
            }
          }
        }
        return null;
      };
      if (_.isObject(data.value)) {
        newValue = data.value;
        oldRef = _getRef(newValue.__old__);
        newRef = _getRef(newValue.__new__);
        if (oldRef) {
          newValue.__old__ = this.h.getNodeMap(oldRef).oldAttr;
        }
        if (newRef) {
          newValue.__new__ = this.h.getNodeMap(newRef).newAttr;
        }
        data.value = {
          type: newValue.type,
          old: newValue.__old__,
          "new": newValue.__new__
        };
      } else {
        compAttrObj = this.h.getNodeMap(path);
        oldAttr = compAttrObj.oldAttr;
        newAttr = compAttrObj.newAttr;
        valueRef = _getRef(data.value);
        if (valueRef) {
          data.value = this.h.getNodeMap(valueRef).oldAttr;
        }
        if (path.length === 1) {
          compUID = path[0];
          oldCompName = (oldAttr ? oldAttr.name : void 0) || '';
          newCompName = (newAttr ? newAttr.name : void 0) || '';
          if (oldAttr) {
            data.key = oldAttr.type;
          } else {
            data.key = newAttr.type;
          }
          data.value = this.h.genValue(null, oldCompName, newCompName);
        }
        data = this.h.replaceArrayIndex(path, data);
      }
      if (path.length === 2) {
        if ((_ref = path[1]) === 'type' || _ref === 'uid' || _ref === 'name') {
          delete data.key;
        } else if (path[1] === 'resource') {
          data.skip = true;
        }
      }
      return data;
    };
    Prepare = function(options) {
      _.extend(this, options);
      this.h = helper(options);
      return this;
    };
    Prepare.prototype.node = prepareNode;
    return Prepare;
  });

}).call(this);

(function() {
  define('workspaces/editor/diff/ResDiff',['UI.modalplus', './resDiffTpl', './DiffTree', './prepare'], function(modalplus, template, DiffTree, Prepare) {
    return Backbone.View.extend({
      className: 'res_diff_tree',
      tagName: 'section',
      initialize: function(option) {
        this.oldAppJSON = option.old;
        this.newAppJSON = option["new"];
        this.prepare = new Prepare({
          oldAppJSON: this.oldAppJSON,
          newAppJSON: this.newAppJSON
        });
        return this._genDiffInfo(this.oldAppJSON.component, this.newAppJSON.component);
      },
      events: {
        'click .item .type': '_toggleTab',
        'click .head': '_toggleItem'
      },
      _toggleItem: function(e) {
        var $target;
        $target = $(e.currentTarget).closest('.group');
        return $target.toggleClass('closed');
      },
      _toggleTab: function(e) {
        var $target;
        $target = $(e.currentTarget).closest('.item');
        if ($target.hasClass('end')) {
          return;
        }
        return $target.toggleClass('closed');
      },
      render: function() {
        var options;
        options = {
          template: this.el,
          title: 'App Changes',
          hideClose: true,
          disableClose: true,
          disableCancel: true,
          cancel: {
            hide: true
          },
          confirm: {
            text: 'OK, got it'
          },
          width: '608px',
          compact: true
        };
        this.modal = new modalplus(options);
        this.modal.on('confirm', function() {
          return this.modal.close();
        }, this);
        this.$el.html(template.frame());
        this._genResGroup(this.oldAppJSON.component, this.newAppJSON.component);
        return this.modal.resize();
      },
      _genDiffInfo: function(oldComps, newComps) {
        var diffTree, that, unionNewComps, unionOldComps;
        that = this;
        that.addedComps = {};
        that.removedComps = {};
        that.modifiedComps = {};
        unionOldComps = {};
        unionNewComps = {};
        _.each(oldComps, function(comp, uid) {
          if (newComps[uid]) {
            unionOldComps[uid] = oldComps[uid];
            unionNewComps[uid] = newComps[uid];
          } else {
            that.removedComps[uid] = oldComps[uid];
          }
          return null;
        });
        _.each(_.keys(newComps), function(uid) {
          if (!oldComps[uid]) {
            that.addedComps[uid] = newComps[uid];
          }
          return null;
        });
        diffTree = new DiffTree();
        that.modifiedComps = diffTree.compare(unionOldComps, unionNewComps);
        if (!that.modifiedComps) {
          return that.modifiedComps = {};
        }
      },
      _genResGroup: function() {
        var $group, compCount, data, groupData, that, _i, _len, _results;
        that = this;
        groupData = [
          {
            title: 'New',
            diffComps: that.addedComps,
            closed: true,
            type: 'added'
          }, {
            title: 'Removed',
            diffComps: that.removedComps,
            closed: true,
            type: 'removed'
          }, {
            title: 'Modified',
            diffComps: that.modifiedComps,
            closed: false,
            type: 'modified'
          }
        ];
        _results = [];
        for (_i = 0, _len = groupData.length; _i < _len; _i++) {
          data = groupData[_i];
          compCount = _.keys(data.diffComps).length;
          if (compCount) {
            $group = $(template.resDiffGroup({
              type: data.type,
              title: data.title,
              count: compCount
            })).appendTo(this.$('article'));
            _results.push(this._genResTree($group.find('.content'), data.diffComps, data.closed));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      _genResTree: function($container, diffComps, closed) {
        var that, _genTree;
        that = this;
        _genTree = function(value, key, path, $parent) {
          var $diffTree, $treeItem, changeType, data, nextPath, type, type1, value1, __value, _key, _results, _value;
          if (_.isObject(value)) {
            if (_.isUndefined(value.__new__) && _.isUndefined(value.__old__)) {
              $diffTree = $(template.resDiffTree({})).appendTo($parent);
              _results = [];
              for (_key in value) {
                _value = value[_key];
                __value = _.isObject(_value) ? '' : _value;
                nextPath = path.concat([_key]);
                data = this.prepare.node(nextPath, {
                  key: _key,
                  value: __value,
                  originValue: _value
                });
                if (data.key) {
                  if (data.skip) {
                    $treeItem = $parent;
                    $diffTree.remove();
                  } else {
                    $treeItem = $(template.resDiffTreeItem({
                      key: data.key,
                      value: data.value,
                      closed: closed
                    })).appendTo($diffTree);
                    if (!_.isObject(_value)) {
                      $treeItem.addClass('end');
                    }
                  }
                  if (_.isArray(_value) && _value.length === 0) {
                    _results.push($treeItem.remove());
                  } else {
                    _results.push(_genTree.call(that, _value, _key, nextPath, $treeItem));
                  }
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            } else {
              changeType = value.type;
              data = this.prepare.node(path, {
                key: key,
                value: value
              });
              if (data.key) {
                type = value1 = type1 = '';
                if (_.isObject(data.value)) {
                  if (data.value.type === 'added') {
                    value = data.value["new"];
                    type = 'new';
                  } else if (data.value.type === 'removed') {
                    value = data.value.old;
                    type = 'old';
                  } else if (data.value.type === 'changed') {
                    value = data.value.old;
                    value1 = data.value["new"];
                    type = 'old';
                    type1 = 'new';
                  }
                } else {
                  value = data.value;
                }
                $parent.html(template.resDiffTreeMeta({
                  key: data.key,
                  value: value,
                  type: type,
                  value1: value1,
                  type1: type1,
                  closed: closed
                }));
                $parent.addClass('end');
                return $parent.addClass(changeType);
              } else {
                return $parent.remove();
              }
            }
          }
        };
        return _genTree.call(that, diffComps, null, [], $container);
      },
      getChangeInfo: function() {
        var hasResChange, that;
        that = this;
        hasResChange = false;
        if (_.keys(that.addedComps).length || _.keys(that.removedComps).length || _.keys(that.modifiedComps).length) {
          hasResChange = true;
        }
        return {
          hasResChange: hasResChange,
          needUpdateLayout: true
        };
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/AppEditor',["./StackEditor", "./AppView", "./diff/ResDiff", "OpsModel", "Design", "CloudResources", "constant"], function(StackEditor, AppView, ResDiff, OpsModel, Design, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.title = function() {
        return (this.design || this.opsModel).get("name") + " - app";
      };

      AppEditor.prototype.createView = function() {
        return new AppView({
          workspace: this
        });
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

      AppEditor.prototype.fetchAdditionalData = function() {
        var region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.AZ, region).fetch(), CloudResources(constant.RESTYPE.SNAP, region).fetch(), CloudResources(constant.RESTYPE.DHCP, region).fetch(), CloudResources("QuickStartAmi", region).fetch(), CloudResources("MyAmi", region).fetch(), CloudResources("FavoriteAmi", region).fetch(), CloudResources("OpsResource", this.opsModel.getVpcId()).init(this.opsModel.get("region")).fetchForce(), this.fetchAmiData()]).then(function() {
          var newJson, result;
          if (self.isRemoved()) {
            return;
          }
          newJson = self.opsModel.generateJsonFromRes();
          self.differ = new ResDiff({
            old: self.opsModel.getJsonData(),
            "new": newJson
          });
          result = self.differ.getChangeInfo();
          if (result.hasResChange) {
            return self.opsModel.saveApp(newJson);
          } else {
            self.differ = void 0;
          }
        });
      };

      AppEditor.prototype.isModified = function() {
        return this.isAppEditMode() && this.design && this.design.isModified();
      };

      AppEditor.prototype.isAppEditMode = function() {
        return !!this.__appEdit;
      };

      AppEditor.prototype.initDesign = function() {
        StackEditor.prototype.initDesign.call(this);
        if (this.differ) {
          this.differ.render();
          this.differ = null;
        }
      };

      AppEditor.prototype.refreshResource = function() {};

      AppEditor.prototype.switchToEditMode = function() {
        if (this.isAppEditMode()) {
          return;
        }
        this.__appEdit = true;
        this.design.setMode(Design.MODE.AppEdit);
        this.view.switchMode(true);
      };

      AppEditor.prototype.cancelEditMode = function(force) {
        var modfied;
        modfied = force ? true : this.design.isModified();
        if (modfied && !force) {
          return false;
        }
        this.__appEdit = false;
        if (modfied) {
          this.view.emptyCanvas();
          this.stopListening(this.design);
          this.design = new Design(this.opsModel);
          this.listenTo(this.design, "change:name", this.updateTab);
          this.initDesign();
        } else {
          this.design.setMode(Design.MODE.App);
        }
        this.view.switchMode(false);
        return true;
      };

      AppEditor.prototype.applyAppEdit = function(modfiedData, force) {
        var modfied, self;
        modfied = modfiedData || this.design.isModified(void 0, true);
        if (modfied && !force) {
          return modfied;
        }
        if (!modfied) {
          this.__appEdit = false;
          this.design.setMode(Design.MODE.App);
          this.view.switchMode(false);
          return true;
        }
        self = this;
        this.__applyingUpdate = true;
        this.opsModel.update(modfied.newData, !modfied.component).then(function() {
          self.__applyingUpdate = false;
          self.__appEdit = false;
          self.view.stopListening(self.opsModel, "change:progress", self.view.updateProgress);
          self.design.setMode(Design.MODE.App);
          self.view.showUpdateStatus();
          self.view.switchMode(false);
          self.saveThumbnail();
        }, function(err) {
          var msg;
          self.__applyingUpdate = false;
          self.view.stopListening(self.opsModel, "change:progress", self.view.updateProgress);
          msg = err.msg;
          if (err.result) {
            msg += "<br />" + err.result;
          }
          self.view.showUpdateStatus(msg);
        });
        this.view.listenTo(this.opsModel, "change:progress", this.view.updateProgress);
        return true;
      };

      AppEditor.prototype.onOpsModelStateChanged = function() {
        if (!this.isInited()) {
          return;
        }
        this.updateTab();
        this.view.toggleProcessing();
        return StackEditor.prototype.onOpsModelStateChanged.call(this);
      };

      return AppEditor;

    })(StackEditor);
    return AppEditor;
  });

}).call(this);


/*
  OpsEditor is a workspace for working on an OpsModel
  This class is implemented as a class cluster. Actually implementation is seperated in
  other concrete class :

  ProgressViewer  : For starting app.
  UnmanagedViewer : For viewing visualize app
 */

(function() {
  define('workspaces/OpsEditor',["./editor/ProgressViewer", "./editor/UnmanagedViewer", "./editor/StackEditor", "./editor/AppEditor", './editor/framework/DesignBundle'], function(ProgressViewer, UnmanagedViewer, StackEditor, AppEditor) {
    var OpsEditor;
    OpsEditor = function(opsModel) {
      if (!opsModel) {
        throw new Error("Cannot find opsmodel while openning workspace.");
      }
      if (opsModel.isImported()) {
        return new UnmanagedViewer(opsModel);
      }
      if (opsModel.isProcessing()) {
        return new ProgressViewer(opsModel);
      }
      if (opsModel.isStack()) {
        return new StackEditor(opsModel);
      } else {
        return new AppEditor(opsModel);
      }
    };
    return OpsEditor;
  });

}).call(this);

