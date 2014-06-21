define('workspaces/editor/template/TplProgress',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
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
    + "%</span></header>\n    <header class=\"processing rolling-back-content\">Rolling back...</header>\n    <section class=\"loading-spinner\"></section>\n    <section class=\"progress\"> <div class=\"bar\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div> </section>\n  </section>\n\n  <section class=\"success hide\">\n    <p class=\"title\">"
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
        this.setElement($(OpsProgressTpl(data)).appendTo("#main"));
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
    + "<span class=\"process-info\">0%</span></header>\n  <header class=\"processing rolling-back-content\">Rolling back...</header>\n  <section class=\"loading-spinner\"></section>\n  <section class=\"progress\"> <div class=\"bar\" style=\"width:0%;\"></div> </section>\n</div>";
  return buffer;
  };
TEMPLATE.appProcessing=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  
  return "\n  <header class=\"processing\">Reloading data...</header>\n  <section class=\"loading-spinner\"></section>\n";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <header class=\"processing\">";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</header>\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <button class=\"btn btn-silver\" id=\"processDoneBtn\">Done</button>\n";
  return buffer;
  }
function program4(depth0,data) {
  
  
  return "App has updated successfully.";
  }

function program6(depth0,data) {
  
  
  return "The app failed to update.";
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
  buffer += "</p>\n    </div>\n    <div class=\"result-error-notice\">The state of your app has been rolled back, except for the already deleted resources.</div>\n  </div>\n  ";
  return buffer;
  }

  buffer += "<div class=\"ops-process\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.loading), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
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
    + "</span></li>\n    <li class='item' data-id=\"4\"><span class=\"icon-hide-sg\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_HIDE_SG", {hash:{},data:data}))
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
  


  return "<button class=\"icon-reload tooltip btn btn-blue reload-states\" data-original=\"Reload States\" data-disabled=\"Initiating…\"  data-tooltip=\"Instantly rerun all states in this app.\">Reload States</button>";
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
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<p class=\"modal-text-major\">Well done! Your VPC "
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " has been successfully imported as VisualOps app.</p>\n<p class=\"modal-text-major\">Give this app an appropriate name.</p>\n<div class=\"modal-control-group\">\n<label for=\"ImportSaveAppName\">App Name</label> <input id=\"ImportSaveAppName\" class=\"input\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"string\" autofocus> </div>\n<p>Now you can easily manage the resources and lifecycle of the app within VisualOps.</p>";
  return buffer;
  };
TEMPLATE.modal.confirmImport=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p class=\"modal-text-major\">VPC of this app has been deleted outside VisualOps.</p>\n<p class=\"modal-text-major\">Do you want to remove the app?</p>";
  };
TEMPLATE.modal.confirmRemoveApp=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div id=\"replace_stack\" style=\"padding: 10px 0\">\n            <div class=\"radio\">\n                <input id=\"radio-replace-stack\" type=\"radio\" name=\"save-stack-type\" checked>\n                <label for=\"radio-replace-stack\"></label>\n            </div>\n            <label class=\"modal-text-minor\" for=\"radio-replace-stack\">"
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
    + "</div>\n            </div>\n        </div>\n        ";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n        <div id=\"name_new_stack\">\n            <input id=\"radio-new-stack\" type=\"hidden\" name=\"save-stack-type\" checked>\n            <div style=\"padding: 10px 22px\" class=\"radio-instruction\">\n                <p>"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_SAVE_STACK_INSTRUCTION", {hash:{},data:data}))
    + "</p>\n                <input class=\"input\" id=\"modal-input-value\" value=\""
    + escapeExpression(((stack1 = (depth0 && depth0.stackName)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" type=\"text\" style=\"width: 400px\"/>\n                <div id=\"stack-name-exist\" class=\"hide\" style=\"color: #ec3c38\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_STACK_NAME_ERROR", {hash:{},data:data}))
    + "</div>\n            </div>\n        </div>\n        ";
  return buffer;
  }

  buffer += "<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_INTRO_1", {hash:{},data:data}))
    + "</p>\n<p class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_INTRO_2", {hash:{},data:data}))
    + "</p>\n<div class=\"modal-center-align-helper\">\n    <div class=\"modal-control-group\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.originStackExist), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </div>\n</div>";
  return buffer;
  };
TEMPLATE.saveAppToStack=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
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
        if (opsModel.isStack()) {
          btns = ["BtnRunStack", "BtnStackOps", "BtnZoom", "BtnExport", "BtnLinestyle", "BtnSwitchStates"];
        } else {
          btns = ["BtnEditApp", "BtnAppOps", "BtnZoom", "BtnPng", "BtnLinestyle"];
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
          if (_.find(ami, function(comp) {
            var _ref;
            return comp && (((_ref = comp.attributes.state) != null ? _ref.length : void 0) > 0);
          })) {
            tpl += OpsEditorTpl.toolbar.BtnReloadStates();
          }
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
        return $canvas.setLineStyle(attr[0]);
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
          btn.click(function() {
            return modal.close();
          });
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
        var appToStackModal, name, newName, onConfirm, originStackExist, stack;
        name = this.workspace.design.attributes.name;
        newName = this.getStackNameFromApp(name);
        stack = App.model.stackList().get(this.workspace.design.attributes.stack_id);
        onConfirm = (function(_this) {
          return function() {
            var isNew, newJson, newOps;
            MC.Analytics.increase("app_to_stack");
            isNew = !(appToStackModal.tpl.find("input[name='save-stack-type']:checked").attr('id') === "replace_stack");
            if (isNew) {
              newOps = App.model.createStackByJson(_this.workspace.design.serializeAsStack(appToStackModal.tpl.find('#modal-input-value').val()));
              appToStackModal.close();
              App.openOps(newOps);
            } else {
              newJson = Design.instance().serializeAsStack();
              newJson.id = _this.workspace.design.attributes.stack_id;
              appToStackModal.close();
              newJson.name = stack.get("name");
              return stack.save(newJson).then(function() {
                notification("info", sprintf(lang.ide.TOOL_MSG_INFO_HDL_SUCCESS, lang.ide.TOOLBAR_HANDLE_SAVE_STACK, newJson.name));
                return App.openOps(stack, true);
              }, function(err) {
                return notification('error', sprintf(lang.ide.TOOL_MSG_ERR_SAVE_FAILED, newJson.name));
              });
            }
          };
        })(this);
        originStackExist = !!stack;
        appToStackModal = new Modal({
          title: lang.ide.TOOL_POP_TIT_APP_TO_STACK,
          template: OpsEditorTpl.saveAppToStack({
            input: name,
            stackName: newName,
            orignStackExist: originStackExist
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
          if (this.modal) {
            this.modal.on('close', function() {
              return keyPairDropdown.remove();
            });
          }
          if (this.updateModal) {
            this.updateModal.on('close', function() {
              return keyPairDropdown.remove();
            });
          }
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
              result = _this.workspace.applyAppEdit();
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
      backupSubviews: function() {}
    });
  });

}).call(this);


/*
  OpsEditorBase is a base class for all the OpsEditor
 */

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/OpsEditorBase',["Workspace", "./OpsViewBase", "./template/TplOpsEditor", "ThumbnailUtil", "OpsModel", "Design", "ApiRequest", "UI.modalplus"], function(Workspace, OpsEditorView, OpsEditorTpl, Thumbnail, OpsModel, Design, ApiRequest, Modal) {
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
          title: "Confirm to remove the app " + name + "?",
          template: OpsEditorTpl.modal.confirmRemoveApp(),
          confirm: {
            text: "Confirm to Remove",
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
          notification("error", "Failed to load data, please retry.");
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
          notification("error", "Failed to load aws data, please retry.");
          return self.remove();
        });
      };

      OpsEditorBase.prototype.switchToReady = function() {
        if (this.view && this.view.isLoadingView) {
          this.view.remove();
          this.view = null;
        }
        if (this.isAwake() && !this.__inited) {
          this.__initEditor();
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
          this.showEditor();
        }
      };

      OpsEditorBase.prototype.sleep = function() {
        MC.canvas.volume.close();
        return Workspace.prototype.sleep.call(this);
      };

      OpsEditorBase.prototype.cleanup = function() {
        MC.canvas.volume.close();
        this.stopListening();
        if (this.view) {
          this.view.remove();
        }
        if (this.design) {
          this.design.unuse();
          this.design = null;
        }
      };

      OpsEditorBase.prototype.isInited = function() {
        return !!this.__inited;
      };

      OpsEditorBase.prototype.__initEditor = function() {
        this.__inited = true;
        this.design = new Design(this.opsModel);
        this.listenTo(this.design, "change:name", this.updateTab);
        this.view = this.createView();
        this.view.opsModel = this.opsModel;
        this.view.workspace = this;
        this.hideOtherEditor();
        this.view.render();
        this.initDesign();
        this.initEditor();
        if (!this.opsModel.getThumbnail()) {
          this.saveThumbnail();
        }
      };

      OpsEditorBase.prototype.initEditor = function() {};

      OpsEditorBase.prototype.saveThumbnail = function() {
        if (this.opsModel.isPersisted()) {
          return Thumbnail.generate($("#svg_canvas")).then((function(_this) {
            return function(thumbnail) {
              return _this.opsModel.saveThumbnail(thumbnail);
            };
          })(this));
        }
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
  buffer += "\n<li class=\"bubble resource-item instance\" data-bubble-template=\"resPanelAmiInfo\" data-bubble-data='{\"region\":\""
    + escapeExpression(((stack1 = (depth2 && depth2.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"imageId\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"INSTANCE\" data-option='{\"imageId\":\""
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
    + "\">\n  <td><div class=\"toggle-fav ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.faved), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_TOGGLE_FAVORITE", {hash:{},data:data}))
    + "\"></div></td>\n  <td>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\n  <td>\n    <span class=\"ami-table-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n    <div class=\"ami-meta "
    + escapeExpression(((stack1 = (depth0 && depth0.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " icon-ami-os\"> ";
  stack1 = helpers.ifCond.call(depth0, (depth0 && depth0.isPublic), "true", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
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
  
  
  return "fav";
  }

function program4(depth0,data) {
  
  
  return "public";
  }

function program6(depth0,data) {
  
  
  return "private";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.amiItem=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
          result = self.addFavStar(result);
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
      addFavStar: function(result) {
        var dumpObj, favAmis, favIds;
        favAmis = CloudResources("FavoriteAmi", this.region).getModels() || [];
        dumpObj = _.clone(result.ami.result);
        favIds = _.pluck(_.pluck(favAmis, "attributes"), "id");
        _.each(dumpObj, function(e, k) {
          if (__indexOf.call(favIds, k) >= 0) {
            return e.faved = true;
          }
        });
        result.ami.result = dumpObj;
        return result;
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
        return $("#OpsEditor").filter(":visible").children(".OEPanelLeft").trigger("RECALC");
      }, 150);
    });
    MC.template.resPanelAmiInfo = function(data) {
      var ami, config, e, _ref;
      if (!data.region || !data.imageId) {
        return;
      }
      ami = CloudResources(constant.RESTYPE.AMI, data.region).get(data.imageId);
      if (!ami) {
        return;
      }
      ami = ami.toJSON();
      ami.imageSize = ami.imageSize || ((_ref = ami.blockDeviceMapping[ami.rootDeviceName]) != null ? _ref.volumeSize : void 0);
      try {
        config = App.model.getOsFamilyConfig(data.region);
        config = config[ami.osFamily] || config[constant.OS_TYPE_MAPPING[ami.osType]];
        config = ami.rootDeviceType === "ebs" ? config.ebs : config['instance store'];
        config = ami.architecture === "x86_64" ? config["64"] : config["32"];
        config = config[ami.virtualizationType || "paravirtual"];
        ami.instanceType = config.join(", ");
      } catch (_error) {
        e = _error;
      }
      return MC.template.bubbleAMIInfo(ami);
    };
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
        this.subViews = [];
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
        allLc = this.workspace.design.componentsOfType(constant.RESTYPE.LC);
        for (_i = 0, _len = allLc.length; _i < _len; _i++) {
          lc = allLc[_i];
          if (!lc.isClone() && !lc.get('appId')) {
            this.subViews.push(new this.reuseLc({
              model: lc,
              parent: this
            }).render());
          }
        }
        return this;
      },
      subEventForUpdateReuse: function() {
        return this.listenTo(this.workspace.design, Design.EVENT.AddResource, function(resModel) {
          if (resModel.type === constant.RESTYPE.LC && !resModel.isClone() && !resModel.get('appId')) {
            return this.subViews.push(new this.reuseLc({
              model: resModel,
              parent: this
            }).render());
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
        ms.region = this.workspace.opsModel.get("region");
        html = LeftPanelTpl.ami(ms);
        return this.$el.find(".resource-list-ami").html(html);
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
      },
      remove: function() {
        _.invoke(this.subViews, 'remove');
        this.subViews = null;
        Backbone.View.prototype.remove.call(this);
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
    var itemView, items;
    items = [
      {
        name: 'lastSaved',
        className: 'info',
        visible: true,
        events: {
          update: function() {
            return [
              {
                obj: null,
                event: 'jsonDataSaved'
              }
            ];
          }
        },
        update: function($, workspace) {
          var save_time;
          save_time = jQuery.now() / 1000;
          this.timer = setInterval(function() {
            var $item, new_interval_time;
            $item = $('.stack-save-time');
            new_interval_time = MC.intervalDate(save_time);
            if ($item.text() !== new_interval_time) {
              return $item.text(new_interval_time);
            }
          }, 1000);
          return null;
        },
        click: function(event) {
          return null;
        },
        remove: function() {
          return clearInterval(this.timer);
        }
      }, {
        name: 'ta',
        className: 'status-bar-btn',
        visible: function(toggle, workspace) {
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
        changeVisible: true,
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
        visible: function(toggle, workspace) {
          var appStoped, isVisible, mode;
          mode = workspace.design.mode();
          appStoped = _.every([OpsModel.State.Updating, OpsModel.State.Running, OpsModel.State.Saving], function(state) {
            return !workspace.opsModel.testState(state);
          });
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
          update: [
            {
              obj: ide_event,
              event: ide_event.UPDATE_STATE_STATUS_DATA
            }
          ]
        },
        changeVisible: true,
        update: function($, workspace) {
          var data;
          data = this.renderData(true, workspace);
          $('.state-success b').text(data.successCount);
          return $('.state-failed b').text(data.failCount);
        },
        renderData: function(visible, workspace) {
          var failed, state, stateList, status, succeed, _i, _j, _len, _len1, _ref;
          this.workspace = workspace;
          if (!visible) {
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
    itemView = Backbone.View.extend({
      tagName: 'li',
      initialize: function() {
        _.bindAll(this, 'render', 'toggle');
        this.clearGarbage = [];
        return this.needUpdate = [];
      },
      render: function() {
        this.$el.html(this.template(this.data));
        return this;
      },
      toggle: function(showOrHide) {
        return this.$el.toggle(showOrHide);
      },
      remove: function() {
        var garbage, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.clearGarbage;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          garbage = _ref[_i];
          if (_.isArray(garbage)) {
            garbage[1].apply(garbage[0], garbage.slice(2));
          } else {
            garbage();
          }
        }
        this.clearGarbage = [];
        this.needUpdate = [];
        return this;
      },
      update: function() {
        var needUpdate, _i, _len, _ref;
        _ref = this.needUpdate;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          needUpdate = _ref[_i];
          needUpdate();
        }
        return this;
      }
    });
    return Backbone.View.extend({
      initialize: function(options) {
        var workspace;
        workspace = this.workspace = options.workspace;
        this.itemViews = [];
        return null;
      },
      ready: false,
      render: function() {
        this.setElement(this.workspace.view.$el.find(".OEPanelBottom").html(template.frame()));
        this.renderItem();
        return this;
      },
      bindItem: function() {
        var e, event, index, isVisible, item, type, view, wrap$, wrapToggle, wrapUpdate, wrapVisible, _i, _j, _len, _len1, _ref, _ref1;
        _ref = jQuery.extend(true, [], items).reverse();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
          item = _ref[index];
          view = new itemView();
          view.delegateEvents({
            click: item.click
          });
          view.template = template[item.name];
          view.$el.addClass(item.className);
          wrap$ = _.bind(view.$, view);
          wrapToggle = _.bind(view.toggle, view);
          if (_.isFunction(item.visible)) {
            wrapVisible = _.bind(item.visible, item, wrapToggle, this.workspace);
          }
          if (_.isFunction(item.update)) {
            wrapUpdate = _.bind(item.update, item, wrap$, this.workspace);
          }
          _ref1 = item.events;
          for (type in _ref1) {
            event = _ref1[type];
            if (_.isFunction(event)) {
              event = event();
            }
            if (!_.isArray(event)) {
              continue;
            }
            for (_j = 0, _len1 = event.length; _j < _len1; _j++) {
              e = event[_j];
              if (type === 'update') {
                if (e.obj === ide_event) {
                  ide_event.onLongListen(e.event, wrapUpdate);
                  view.clearGarbage.push([ide_event, ide_event.offListen, e.event, wrapUpdate]);
                } else {
                  view.listenTo(e.obj || this.workspace.opsModel, e.event, wrapUpdate);
                }
              }
            }
          }
          if (item.changeVisible) {
            if (item.visible) {
              view.needUpdate.push(wrapVisible);
            }
            if (item.update) {
              view.needUpdate.push(wrapUpdate);
            }
          }
          if (_.isFunction(item.visible)) {
            isVisible = item.visible(view.toggle, this.workspace);
          } else {
            view.toggle(item.visible);
            isVisible = item.visible;
          }
          view.data = (typeof item.renderData === "function" ? item.renderData(isVisible, this.workspace) : void 0) || {};
          if (item.remove) {
            view.clearGarbage.push(_.bind(item.remove, item));
          }
          this.itemViews.push(view);
        }
        return null;
      },
      renderItem: function() {
        var that, view, _i, _len, _ref;
        that = this;
        if (!this.ready) {
          this.bindItem();
          this.ready = true;
        }
        _ref = this.itemViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          this.$('ul').append(view.render().el);
        }
        return this;
      },
      update: function() {
        var view, _i, _len, _ref, _results;
        _ref = this.itemViews;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          _results.push(view.update());
        }
        return _results;
      },
      remove: function() {
        var view, _i, _len, _ref;
        this.$el.remove();
        this.stopListening();
        _ref = this.itemViews;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          view = _ref[_i];
          view.remove();
        }
        return this;
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
      recoverSubviews: function() {
        this.resourcePanel.recalcAccordion();
      },
      remove: function() {
        this.resourcePanel.remove();
        this.statusbar.remove();
        OpsViewBase.prototype.remove.call(this);
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
        if (!this.opsModel.isPersisted()) {
          this.opsModel.remove();
        }
      };

      StackEditor.prototype.isModified = function() {
        if (!this.opsModel.isPersisted()) {
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
  define('workspaces/editor/AppView',["./StackView", "OpsModel", "./template/TplOpsEditor", "UI.modalplus", "i18n!nls/lang.js"], function(StackView, OpsModel, OpsEditorTpl, Modal, lang) {
    return StackView.extend({
      bindUserEvent: function() {
        if (this.workspace.isAppEditMode()) {
          this.$el.find(".OEPanelCenter").removeClass('canvas_state_app').addClass("canvas_state_appedit").off(".CANVAS_EVENT").on('mousedown.CANVAS_EVENT', '.instance-volume, .instanceList-item-volume', MC.canvas.volume.show).on('mousedown.CANVAS_EVENT', '.port', MC.canvas.event.appDrawConnection).on('mousedown.CANVAS_EVENT', '.dragable', MC.canvas.event.dragable.mousedown).on('mousedown.CANVAS_EVENT', '.group-resizer', MC.canvas.event.groupResize.mousedown).on('click.CANVAS_EVENT', '.line', MC.canvas.event.selectLine).on('mousedown.CANVAS_EVENT', MC.canvas.event.clearSelected).on('mousedown.CANVAS_EVENT', '#svg_canvas', MC.canvas.event.clickBlank).on('mouseenter.CANVAS_EVENT mouseleave.CANVAS_EVENT', '.node', MC.canvas.event.nodeHover).on('selectstart.CANVAS_EVENT', false).on('mousedown.CANVAS_EVENT', MC.canvas.event.ctrlMove.mousedown).on('mousedown.CANVAS_EVENT', '#node-action-wrap', MC.canvas.nodeAction.popup);
        } else {
          this.$el.find(".OEPanelCenter").removeClass('canvas_state_appedit').addClass("canvas_state_app").off(".CANVAS_EVENT").on('mousedown.CANVAS_EVENT', '.instance-volume, .instanceList-item-volume', MC.canvas.volume.show).on('click.CANVAS_EVENT', '.line', MC.canvas.event.selectLine).on('mousedown.CANVAS_EVENT', MC.canvas.event.clearSelected).on('mousedown.CANVAS_EVENT', '#svg_canvas', MC.canvas.event.clickBlank).on('selectstart.CANVAS_EVENT', false).on('mousedown.CANVAS_EVENT', '.dragable', MC.canvas.event.selectNode).on('mousedown.CANVAS_EVENT', '.AWS-AutoScaling-LaunchConfiguration .instance-number-group', MC.canvas.asgList.show).on('mousedown.CANVAS_EVENT', '.AWS-EC2-Instance .instance-number-group', MC.canvas.instanceList.show).on('mousedown.CANVAS_EVENT', '.AWS-VPC-NetworkInterface .eni-number-group', MC.canvas.eniList.show).on('mousedown.CANVAS_EVENT', MC.canvas.event.ctrlMove.mousedown).on('mousedown.CANVAS_EVENT', '#node-action-wrap', MC.canvas.nodeAction.popup).on('mouseenter.CANVAS_EVENT mouseleave.CANVAS_EVENT', '.node', MC.canvas.event.nodeHover);
        }
      },
      confirmImport: function() {
        var modal, self;
        self = this;
        modal = new Modal({
          title: "App Imported",
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
                return lang.ide.PARSLEY_SHOULD_BE_A_VALID_STACK_NAME;
              }
              apps = App.model.appList().where({
                name: val
              });
              if (apps.length === 1 && apps[0] === self.workspace.opsModel || apps.length === 0) {
                return;
              }
              return sprintf(lang.ide.PARSLEY_TYPE_NAME_CONFLICT, 'App', val);
            });
            if (!$ipt.parsley('validate')) {
              return;
            }
            modal.tpl.find(".modal-confirm").attr("disabled", "disabled");
            json = self.workspace.design.serialize();
            json.name = $ipt.val();
            return self.workspace.opsModel.saveApp(json).then(function() {
              self.workspace.design.set("name", json.name);
              return modal.close();
            }, function(err) {
              notification("error", err.msg);
              modal.tpl.find(".modal-confirm").removeAttr("disabled");
            });
          }
        });
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
        this.statusbar.update();
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
        MC.canvas.volume.close();
        this.toolbar.updateTbBtns();
        this.statusbar.update();
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
      }
    });
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/AppEditor',["./StackEditor", "./AppView", "ResDiff", "OpsModel", "Design", "CloudResources", "constant"], function(StackEditor, AppView, ResDiff, OpsModel, Design, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.title = function() {
        return ((this.design || this.opsModel).get("name") || this.opsModel.get("importVpcId")) + " - app";
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
          var newJson, oldJson;
          if (self.isRemoved()) {
            return;
          }
          if (self.opsModel.isImported()) {
            return;
          }
          if (!self.opsModel.testState(OpsModel.State.Running)) {
            return;
          }
          oldJson = self.opsModel.getJsonData();
          newJson = self.opsModel.generateJsonFromRes();
          self.differ = new ResDiff({
            old: oldJson,
            "new": newJson,
            callback: function(confirm) {
              if (confirm) {
                return self.opsModel.saveApp(self.design.serialize());
              } else {
                self.opsModel.__setJsonData(oldJson);
                return self.remove();
              }
            }
          });
          if (self.differ.getChangeInfo().hasResChange) {
            self.opsModel.__setJsonData(newJson);
          }
        }, function(err) {
          if (err.error === 286) {
            self.view.showVpcNotExist(self.opsModel.get("name"), function() {
              return self.opsModel.terminate(true);
            });
            self.remove();
            return;
          }
          throw err;
        });
      };

      AppEditor.prototype.isModified = function() {
        return this.isAppEditMode() && this.design && this.design.isModified();
      };

      AppEditor.prototype.isAppEditMode = function() {
        return !!this.__appEdit;
      };

      AppEditor.prototype.initDesign = function() {
        if (this.opsModel.isImported() || (this.differ && this.differ.getChangeInfo().needUpdateLayout)) {
          MC.canvas.analysis();
          this.opsModel.saveThumbnail();
        }
        this.design.finishDeserialization();
      };

      AppEditor.prototype.initEditor = function() {
        if (this.differ && this.differ.getChangeInfo().hasResChange) {
          this.differ.render();
          this.differ = null;
        }
        if (this.opsModel.isImported()) {
          this.updateTab();
          this.view.confirmImport();
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
          this.recreateDesign();
        } else {
          this.design.setMode(Design.MODE.App);
        }
        this.view.switchMode(false);
        return true;
      };

      AppEditor.prototype.recreateDesign = function() {
        this.view.emptyCanvas();
        this.stopListening(this.design);
        this.design = new Design(this.opsModel);
        this.listenTo(this.design, "change:name", this.updateTab);
        this.initDesign();
      };

      AppEditor.prototype.applyAppEdit = function(modfiedData, force) {
        var fastUpdate, modfied, self;
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
        fastUpdate = !modfied.component;
        this.opsModel.update(modfied.newData, fastUpdate).then(function() {
          if (fastUpdate) {
            return self.onAppEditDone();
          } else {
            self.view.showUpdateStatus("", true);
            return CloudResources("OpsResource", self.opsModel.getVpcId()).init(self.opsModel.get("region")).fetchForce().then(function() {
              return self.onAppEditDone();
            });
          }
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

      AppEditor.prototype.onAppEditDone = function() {
        this.__appEdit = this.__applyingUpdate = false;
        this.view.stopListening(this.opsModel, "change:progress", this.view.updateProgress);
        this.recreateDesign();
        this.design.setMode(Design.MODE.App);
        this.view.showUpdateStatus();
        this.view.switchMode(false);
        this.saveThumbnail();
        this.view.showUpdateStatus();
      };

      AppEditor.prototype.onOpsModelStateChanged = function() {
        if (!this.isInited()) {
          return;
        }
        if (this.opsModel.testState(OpsModel.State.Saving)) {
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
  define('workspaces/OpsEditor',["./editor/ProgressViewer", "./editor/StackEditor", "./editor/AppEditor", './editor/framework/DesignBundle'], function(ProgressViewer, StackEditor, AppEditor) {
    var OpsEditor;
    OpsEditor = function(opsModel) {
      if (!opsModel) {
        throw new Error("Cannot find opsmodel while openning workspace.");
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

