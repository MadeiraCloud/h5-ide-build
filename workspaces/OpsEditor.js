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
  buffer += "'>\r\n  <section class=\"processing-wrap\">\r\n    <header class=\"processing\">";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<span class=\"process-info\">"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%</span></header>\r\n    <header class=\"processing rolling-back-content\">Rolling back...</header>\r\n    <section class=\"loading-spinner\"></section>\r\n    <section class=\"progress\"> <div class=\"bar\" style=\"width:"
    + escapeExpression(((stack1 = (depth0 && depth0.progress)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "%;\"></div> </section>\r\n  </section>\r\n\r\n  <section class=\"success hide\">\r\n    <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_TITLE", {hash:{},data:data}))
    + "</p>\r\n    <p class=\"sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_DONE_SUB_TITLE", {hash:{},data:data}))
    + "</p>\r\n  </section>\r\n\r\n  <section class=\"fail hide error-info-block\">\r\n    <header>"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_FAILED_TITLE", {hash:{},data:data}))
    + "</header>\r\n    <p class=\"sub-title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</p>\r\n    <div class=\"result-error-info\">\r\n      <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_ERR_INFO", {hash:{},data:data}))
    + "</p>\r\n      <p class=\"detail\"></p>\r\n    </div>\r\n    <button class=\"btn btn-silver btn-close-process right\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_CLOSE_TAB", {hash:{},data:data}))
    + "</button>\r\n  </section>\r\n</div>";
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

define('workspaces/editor/template/TplOpsEditor',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={"toolbar":{},"confirm":{},"export":{},"modal":{}};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1;


  buffer += "<div id=\"OpsEditor\" class=\"pos-r\">\n  <aside class=\"OEPanelLeft\"></aside>\n  <aside class=\"OEPanelRight\" id=\"OEPanelRight\"></aside>\n\n<div class=\"OEMiddleWrap\">\n  <nav class=\"OEPanelTop\"></nav>\n  <div class=\"OEPanelBottom\"></div>\n\n  <section class=\"OEPanelCenter nano\"> <div class=\"nano-content\">\n    <div class=\"canvas-view\">\n      <button class=\"svg_resizer icon-resize-down tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-up tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_H", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-right tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_EXPAND_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <button class=\"svg_resizer icon-resize-left tooltip\" data-tooltip='";
  stack1 = helpers.i18n.call(depth0, "CVS_TIP_SHRINK_W", {hash:{},data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "'></button>\n      <svg width=\"100%\" height=\"100%\"></svg>\n    </div>\n  </div> </section>\n</div>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


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
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_CURVE", {hash:{},data:data}))
    + "</span></li>\n  </ul>\n</div>\n<button class=\"btn-toolbar icon-hide-sg tooltip\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_LBL_LINESTYLE_HIDE_SG", {hash:{},data:data}))
    + "'></button>";
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
    + "\"><span style=\"display: none\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_START_APP", {hash:{},data:data}))
    + "</span></button>\n<button class=\"btn-toolbar tooltip icon-terminate seperator\" data-tooltip=\"";
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
  var buffer = "", stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "<div class=\"modal-text-highlight\">\n      DB Instance using custom Option Group is not supported in CloudFormation Template. Default Option Group will be\n      used instead.\n  </div>";
  }

  buffer += "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasCustomOG), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <div class=\"modal-text-minor\">"
    + escapeExpression(helpers.i18n.call(depth0, "TOOL_POP_EXPORT_CF_INFO", {hash:{},data:data}))
    + "</div>\n</div> </div>\n<div class=\"stack-validation\">\n  <details open style=\"display:none;\">\n    <summary>Stack Validation</summary>\n    <div id=\"stack-run-validation-container\"></div>\n  </details>\n  <div class=\"nutshell\">:<label></label></div>\n  <div class=\"validating\">\n    <div class=\"loading-spinner loading-spinner-small\"></div>\n    <p>Validating your stack...</p>\n  </div>\n</div>\n<div style=\"padding-top:20px;text-align:right;\">\n  <a class=\"btn btn-blue disabled\">"
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
    + "</div>\n</div> </div>\n<div class=\"modal-footer\">\n  <a class=\"btn btn-blue\" href=\""
    + escapeExpression(((stack1 = (depth0 && depth0.data)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" target=\"_blank\">"
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
  


  return "<div class=\"modal-text-wraper\"> <div class=\"modal-center-align-helper\">\n  <div class=\"modal-text-major\">This app has been changed.</div>\n  <div class=\"modal-text-major\">Do you confirm to discard the changes?</div>\n</div> </div>";
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
    + "\" type=\"string\" autofocus> </div>\n<div class=\"modal-control-group app-usage-group clearfix\">\n  <label for=\"\">App Usage</label>\n  <div id=\"app-usage-selectbox\" class=\"selectbox\">\n    <div class=\"selection\"><i class=\"icon-app-type-testing\"></i>Testing</div>\n    <ul class=\"dropdown\" tabindex=\"-1\">\n      <li class=\"selected item\" data-value=\"testing\"><i class=\"icon-app-type-testing\"></i>Testing</li>\n      <li class=\"item\" data-value=\"development\"><i class=\"icon-app-type-development\"></i>Development</li>\n      <li class=\"item\" data-value=\"production\"><i class=\"icon-app-type-production\"></i>Production</li>\n      <li class=\"item\" data-value=\"others\"><i class=\"icon-app-type-others\" data-value=\"testing\"></i>Others</li>\n    </ul>\n  </div>\n</div>\n\n<section style=\"margin:5px 5px 20px 8px;\">\n  <div class=\"checkbox\"><input id=\"MonitorImportApp\" type=\"checkbox\" checked=\"checked\"><label for=\"MonitorImportApp\"></label></div>\n  <label for=\"MonitorImportApp\">Monitor and report external resource change of this app</label>\n  <i class=\"icon-info tooltip\" data-tooltip=\"If resource has been changed outside VisualOps, an email notification will be sent to you.\" style=\"color:#148BE6;vertical-align:-3px;\"></i>\n</section>\n\n<p>Now you can easily manage the resources and lifecycle of the app within VisualOps.</p>";
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
  buffer += "\n        <div id=\"replace_stack\" style=\"padding: 10px 0\">\n            <div class=\"radio\">\n                <input id=\"radio-replace-stack\" type=\"radio\" name=\"save-stack-type\" value=\"replace\" checked>\n                <label for=\"radio-replace-stack\"></label>\n            </div>\n            <label class=\"modal-text-minor\" for=\"radio-replace-stack\">"
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
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('workspaces/editor/subviews/Toolbar',["OpsModel", "../template/TplOpsEditor", "ThumbnailUtil", "JsonExporter", "ApiRequest", "i18n!/nls/lang.js", "UI.modalplus", 'kp_dropdown', "ResDiff", 'constant', 'event', 'component/trustedadvisor/gui/main', "CloudResources", "appAction", "UI.notification", "backbone"], function(OpsModel, OpsEditorTpl, Thumbnail, JsonExporter, ApiRequest, lang, Modal, kpDropdown, ResDiff, constant, ide_event, TA, CloudResources, appAction) {
    var API_HOST, API_URL, hosts, location;
    location = window.location;
    if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.exec(location.hostname)) {
      console.error("VisualOps IDE can not be browsed with IP address.");
      return;
    }
    hosts = location.hostname.split(".");
    if (hosts.length >= 3) {
      API_HOST = hosts[hosts.length - 2] + "." + hosts[hosts.length - 1];
    } else {
      API_HOST = location.hostname;
    }
    API_URL = "https://api." + API_HOST + "/v1/apps/";
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
        "click .icon-hide-sg": "toggleSgLine",
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
      initialize: function(options) {
        var attr, btn, btns, opsModel, that, tpl, _i, _len;
        _.extend(this, options);
        opsModel = this.workspace.opsModel;
        if (opsModel.isStack()) {
          btns = ["BtnRunStack", "BtnStackOps", "BtnZoom", "BtnExport", "BtnLinestyle", "BtnSwitchStates"];
        } else {
          btns = ["BtnEditApp", "BtnAppOps", "BtnZoom", "BtnPng", "BtnLinestyle", "BtnReloadRes"];
        }
        tpl = "";
        for (_i = 0, _len = btns.length; _i < _len; _i++) {
          btn = btns[_i];
          attr = {
            stateOn: this.workspace.design.get("agent").enabled
          };
          tpl += OpsEditorTpl.toolbar[btn](attr);
        }
        if (this.workspace.opsModel.isApp() && this.workspace.design.attributes.agent.enabled) {
          tpl += OpsEditorTpl.toolbar.BtnReloadStates();
        }
        this.setElement(this.parent.$el.find(".OEPanelTop").html(tpl));
        that = this;
        setTimeout(function() {
          return that.updateTbBtns();
        }, 1000);
        this.updateZoomButtons();
      },
      updateTbBtns: function() {
        var ami, hasState, isAppEdit, opsModel, running, stopped;
        opsModel = this.workspace.opsModel;
        this.$el.children(".toolbar-line-style").children(".dropdown").children().eq(parseInt(localStorage.getItem("canvas/lineStyle"), 10) || 2).click();
        if (opsModel.isApp()) {
          isAppEdit = this.workspace.isAppEditMode && this.workspace.isAppEditMode();
          this.$el.children(".icon-update-app").toggle(!isAppEdit);
          this.$el.children(".icon-apply-app, .icon-cancel-update-app").toggle(isAppEdit);
          if (isAppEdit) {
            this.$el.children(".icon-terminate, .icon-stop, .icon-play, .icon-refresh, .icon-save-app, .icon-reload").hide();
            this.$el.find(".icon-refresh").hide();
          } else {
            running = opsModel.testState(OpsModel.State.Running);
            stopped = opsModel.testState(OpsModel.State.Stopped);
            this.$el.children(".icon-terminate, .icon-refresh, .icon-save-app, .icon-reload").show();
            this.$el.children(".icon-stop").toggle(opsModel.get("stoppable") && running);
            this.$el.children(".icon-play").toggle(stopped).toggleClass("toolbar-btn-primary seperator", opsModel.testState(OpsModel.State.Stopped)).find("span").toggle(stopped);
            this.$el.children('.icon-update-app').toggle(!stopped);
            this.$el.find(".icon-refresh").toggle(running);
            ami = [].concat(this.workspace.design.componentsOfType(constant.RESTYPE.INSTANCE), this.workspace.design.componentsOfType(constant.RESTYPE.LC));
            hasState = _.find(ami, function(comp) {
              var _ref;
              return comp && (((_ref = comp.attributes.state) != null ? _ref.length : void 0) > 0);
            });
            this.$el.find('.reload-states').toggle(!!hasState);
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
        localStorage.setItem("canvas/lineStyle", attr);
        if (this.parent.canvas) {
          this.parent.canvas.updateLineStyle();
        }
      },
      toggleSgLine: function() {
        var sgBtn, show;
        sgBtn = $(".icon-hide-sg");
        show = sgBtn.hasClass("selected");
        if (show) {
          sgBtn.data("tooltip", lang.ide.TOOL_LBL_LINESTYLE_HIDE_SG).removeClass("selected");
        } else {
          sgBtn.data("tooltip", lang.ide.TOOL_LBL_LINESTYLE_SHOW_SG).addClass("selected");
        }
        this.parent.canvas.toggleSgLine(show);
      },
      saveStack: function(evt) {
        var newJson, self;
        $(evt.currentTarget).attr("disabled", "disabled");
        self = this;
        this.__saving = true;
        newJson = this.workspace.design.serialize();
        return Thumbnail.generate(this.parent.getSvgElement())["catch"](function() {
          return null;
        }).then(function(thumbnail) {
          self.workspace.opsModel.save(newJson, thumbnail).then(function() {
            self.__saving = false;
            $(evt.currentTarget).removeAttr("disabled");
            return notification("info", sprintf(lang.ide.TOOL_MSG_ERR_SAVE_SUCCESS, newJson.name));
          }, function() {
            self.__saving = false;
            $(evt.currentTarget).removeAttr("disabled");
            return notification("error", sprintf(lang.ide.TOOL_MSG_ERR_SAVE_FAILED, newJson.name));
          });
        });
      },
      deleteStack: function() {
        return appAction.deleteStack(this.workspace.opsModel.cid, this.workspace.design.get("name"));
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
        this.parent.canvas.zoomIn();
        return this.updateZoomButtons();
      },
      zoomOut: function() {
        this.parent.canvas.zoomOut();
        return this.updateZoomButtons();
      },
      updateZoomButtons: function() {
        var scale;
        scale = this.parent.canvas ? this.parent.canvas.scale() : 1;
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
        Thumbnail.exportPNG(this.parent.getSvgElement(), {
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
            btn = modal.tpl.find("a.btn-blue").click(function() {
              return modal.close();
            });
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
        var ApiPromise, TAPromise, components, design, hasCustomOG, modal, name;
        design = this.workspace.design;
        hasCustomOG = false;
        components = design.serialize({
          usage: 'runStack'
        }).component;
        _.each(components, function(e) {
          if (e.type === constant.RESTYPE.DBOG) {
            return hasCustomOG = true;
          }
        });
        modal = new Modal({
          title: lang.ide.TOOL_POP_EXPORT_CF,
          template: OpsEditorTpl["export"].CF({
            hasCustomOG: hasCustomOG
          }),
          width: "470",
          disableFooter: true
        });
        name = design.get("name");
        TAPromise = TA.loadModule('stack');
        ApiPromise = ApiRequest("stack_export_cloudformation", {
          region: design.get("region"),
          stack: design.serialize()
        });
        return Q.spread([TAPromise, ApiPromise], function(taError, apiReturn) {
          var btn;
          if (modal != null) {
            modal.resize();
          }
          btn = modal.tpl.find("a.btn-blue").text(lang.ide.TOOL_POP_BTN_EXPORT_CF).removeClass("disabled");
          JsonExporter.genericExport(btn, apiReturn, "" + name + ".json");
          btn.click(function() {
            return modal.close();
          });
        }, function(err) {
          if (modal != null) {
            modal.resize();
          }
          modal.tpl.find("a.btn-blue").text(lang.ide.TOOL_POP_BTN_EXPORT_CF);
          if (err.error) {
            notification("error", "Fail to export to AWS CloudFormation Template, Error code:" + err.error);
          }
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
        var appNameDom, checkAppNameRepeat, cost, self, that;
        that = this;
        if ($(event.currentTarget).attr('disabled')) {
          return false;
        }
        this.modal = new Modal({
          title: lang.ide.RUN_STACK_MODAL_TITLE,
          template: MC.template.modalRunStack,
          disableClose: true,
          width: '450px',
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
        this.modal.on('confirm', (function(_this) {
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
            _this.json = _this.workspace.design.serialize({
              usage: 'runStack'
            });
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
        App.user.on('change:credential', function() {
          console.log('We got it.');
          if (App.user.hasCredential() && that.modal.isOpen()) {
            return that.modal.find(".modal-confirm").text(lang.ide.RUN_STACK_MODAL_CONFIRM_BTN);
          }
        });
        return this.modal.on('close', function() {
          console.log('We gave up.');
          return App.user.off('change:credential');
        });
      },
      appToStack: function() {
        var appToStackModal, name, newName, onConfirm, originStackExist, stack;
        name = this.workspace.design.attributes.name;
        newName = this.getStackNameFromApp(name);
        stack = App.model.stackList().get(this.workspace.design.attributes.stack_id);
        onConfirm = (function(_this) {
          return function() {
            var isNew, newJson, newOps;
            MC.Analytics.increase("app_to_stack");
            isNew = !(appToStackModal.tpl.find("input[name='save-stack-type']:checked").val() === "replace");
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
              }, function() {
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
            originStackExist: originStackExist
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
          if (app_name.charAt(app_name.length - 1) === "-") {
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
        appAction.startApp(this.workspace.opsModel.id);
        return false;
      },
      stopApp: function() {
        appAction.stopApp(this.workspace.opsModel.id);
        return false;
      },
      terminateApp: function() {
        appAction.terminateApp(this.workspace.opsModel.id);
        return false;
      },
      refreshResource: function() {
        this.workspace.reloadAppData();
        return false;
      },
      switchToAppEdit: function() {
        this.workspace.switchToEditMode();
        return false;
      },
      checkDBinstance: function(oldDBInstanceList) {
        var DBInstances, checkDB;
        checkDB = new Q.defer();
        if (oldDBInstanceList.length) {
          DBInstances = CloudResources(constant.RESTYPE.DBINSTANCE, Design.instance().get("region"));
          DBInstances.fetchForce().then(function() {
            return checkDB.resolve(DBInstances);
          });
        } else {
          checkDB.resolve([]);
        }
        return checkDB.promise;
      },
      applyAppEdit: function() {
        var components, dbInstanceList, differ, newJson, oldDBInstanceList, oldJson, removes, result, that;
        that = this;
        oldJson = this.workspace.opsModel.getJsonData();
        newJson = this.workspace.design.serialize({
          usage: 'updateApp'
        });
        differ = new ResDiff({
          old: oldJson,
          "new": newJson
        });
        result = differ.getDiffInfo();
        if (!result.compChange && !result.layoutChange && !result.stateChange) {
          return this.workspace.applyAppEdit();
        }
        removes = differ.removedComps;
        console.log(differ);
        dbInstanceList = [];
        console.log(newJson);
        components = newJson.component;
        _.each(components, function(e) {
          if (e.type === constant.RESTYPE.DBINSTANCE) {
            return dbInstanceList.push(e.resource.DBInstanceIdentifier);
          }
        });
        this.updateModal = new Modal({
          title: lang.ide.HEAD_INFO_LOADING,
          template: MC.template.loadingSpiner,
          disableClose: true,
          hasScroll: true,
          maxHeight: "450px",
          cancel: "Close"
        });
        this.updateModal.tpl.find(".modal-footer").hide();
        oldDBInstanceList = [];
        _.each(oldJson.component, function(e) {
          if (e.type === constant.RESTYPE.DBINSTANCE) {
            return oldDBInstanceList.push(e.resource.DBInstanceIdentifier);
          }
        });
        return this.checkDBinstance(oldDBInstanceList).then(function(DBInstances) {
          var $diffTree, notAvailableDB, removeList, removeListNotReady;
          notAvailableDB = DBInstances.filter(function(e) {
            var _ref;
            return (_ref = e.attributes.DBInstanceIdentifier, __indexOf.call(dbInstanceList, _ref) >= 0) && e.attributes.DBInstanceStatus !== "available";
          });
          if (notAvailableDB.length) {
            that.updateModal.find(".modal-footer").show().find(".modal-confirm").hide();
            that.updateModal.setContent(MC.template.cantUpdateApp({
              data: notAvailableDB
            }));
            that.updateModal.setTitle(lang.ide.UPDATE_APP_MODAL_TITLE);
            return false;
          }
          removeList = [];
          _.each(removes, function(e) {
            var dbModel;
            if (e.type === constant.RESTYPE.DBINSTANCE) {
              dbModel = DBInstances.get(e.resource.DBInstanceIdentifier);
              if (dbModel) {
                return removeList.push(DBInstances.get(e.resource.DBInstanceIdentifier));
              }
            }
          });
          removeListNotReady = _.filter(removeList, function(e) {
            return e.attributes.DBInstanceStatus !== "available";
          });
          that.updateModal.tpl.children().css('width', "450px").find(".modal-footer").show();
          that.updateModal.setContent(MC.template.updateApp({
            isRunning: that.workspace.opsModel.testState(OpsModel.State.Running),
            notReadyDB: removeListNotReady,
            removeList: removeList
          }));
          that.updateModal.tpl.find(".modal-header").find("h3").text(lang.ide.UPDATE_APP_MODAL_TITLE);
          that.updateModal.tpl.find('.modal-confirm').prop("disabled", true).text((App.user.hasCredential() ? lang.ide.UPDATE_APP_CONFIRM_BTN : lang.ide.UPDATE_APP_MODAL_NEED_CREDENTIAL));
          that.updateModal.resize();
          window.setTimeout(function() {
            return that.updateModal.resize();
          }, 100);
          if (removeListNotReady != null ? removeListNotReady.length : void 0) {
            that.updateModal.tpl.find("#take-rds-snapshot").attr("checked", false).on("change", function() {
              return that.updateModal.tpl.find(".modal-confirm").prop('disabled', $(this).is(":checked"));
            });
          }
          that.updateModal.on('confirm', function() {
            var _ref;
            if (!App.user.hasCredential()) {
              App.showSettings(App.showSettings.TAB.Credential);
              return false;
            }
            if (!that.defaultKpIsSet()) {
              return false;
            }
            newJson = that.workspace.design.serialize({
              usage: 'updateApp'
            });
            that.workspace.applyAppEdit(newJson, !result.compChange);
            return (_ref = that.updateModal) != null ? _ref.close() : void 0;
          });
          if (result.compChange) {
            $diffTree = differ.renderAppUpdateView();
            $('#app-update-summary-table').html($diffTree);
          }
          that.renderKpDropdown(that.updateModal);
          TA.loadModule('stack').then(function() {
            var _ref;
            that.updateModal && that.updateModal.toggleConfirm(false);
            return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
          }, function(err) {
            var _ref;
            console.log(err);
            that.updateModal && that.updateModal.toggleConfirm(true);
            that.updateModal && that.updateModal.tpl.find("#take-rds-snapshot").off('change');
            return (_ref = that.updateModal) != null ? _ref.resize() : void 0;
          });
        });
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
              title: "Confirm to Enable VisualOps",
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
                return ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
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
          return ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
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

define('workspaces/editor/template/TplLeftPanel',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "disabled";
  }

function program3(depth0,data) {
  
  
  return "disableRds";
  }

  buffer += "<button class=\"tooltip sidebar-hider icon-caret-left HideOEPanelLeft\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_TOGGLE_RESOURCE_PANEL", {hash:{},data:data}))
    + "'></button>\n\n<header class=\"sidebar-title\"> "
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RESOURCES", {hash:{},data:data}))
    + "\n  <i class=\"icon-resources js-toggle-dropdown menu-manage-shard-res tooltip\" data-tooltip=\""
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_SHARED_RESOURCES", {hash:{},data:data}))
    + "\"></i>\n  <ul class=\"dropdown-menu resources-dropdown-wrapper\">\n    <li data-action=\"keypair\" class=\"icon-kp\"><span>Key Pair</span></li>\n    <li data-action=\"snapshot\" class=\"icon-ebs-snap\"><span>EBS Snapshot</span></li>\n    <li data-action=\"sns\" class=\"icon-sns\"><span>SNS Topic & Subscription</span></li>\n    <li data-action=\"sslcert\" class=\"icon-cert\"><span>Server Certificate</span></li>\n    <li data-action=\"dhcp\" class=\"icon-dhcp\"><span>DHCP Option Sets</span></li>\n    <li data-action=\"rdspg\" class=\"icon-pg ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rdsDisabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span>DB Parameter Groups</span></li>\n    <li data-action=\"rdssnapshot\" class=\"icon-rds-snap ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rdsDisabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span>DB Snapshot</span></li>\n  </ul>\n  <i class=\"refresh-resource-panel icon-refresh tooltip\" data-tooltip=\"Refresh resource list\"></i>\n</header>\n\n<div class=\"fixedaccordion accordion-default\">\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AZ", {hash:{},data:data}))
    + "</header>\n    <ul class=\"resource-list-az clearfix accordion-body\">\n      <li class=\"tooltip resource-item az\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_AZ", {hash:{},data:data}))
    + "' data-type=\"AZ\">\n        <div class=\"resource-count\">"
    + escapeExpression(((stack1 = (depth0 && depth0.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"res-name\">AZ & subnet</div>\n      </li>\n      <li class=\"tooltip resource-item subnet\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_SUBNET", {hash:{},data:data}))
    + "' data-type=\"SUBNET\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_SUBNET", {hash:{},data:data}))
    + "</li>\n      <li class=\"tooltip resource-item subnetgroup\" data-type=\"DBSBG\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_SUBNET_GROUP", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_AMI", {hash:{},data:data}))
    + "\n      <nav class=\"selectbox resource-select AmiTypeSelect js-toggle-dropdown\">\n        <div class=\"selection\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</div>\n        <ul class=\"dropdown\">\n          <li class=\"item selected\" data-id=\"QuickStartAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_QUICK_START_AMI", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"MyAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_MY_AMI", {hash:{},data:data}))
    + "</li>\n          <li class=\"item\" data-id=\"FavoriteAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_FAVORITE_AMI", {hash:{},data:data}))
    + "</li>\n        </ul>\n      </nav>\n    </header>\n    <div class=\"accordion-body nano\">\n      <button class=\"btn btn-primary BrowseCommunityAmi\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_BTN_BROWSE_COMMUNITY_AMI", {hash:{},data:data}))
    + "</button>\n      <ul class=\"nano-content resource-list-ami\"></ul>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VOL", {hash:{},data:data}))
    + "</header>\n    <div class=\"accordion-body nano\">\n      <button class=\"btn btn-primary ManageSnapshot ManageEbsSnapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_SNAPSHOT_MANAGE", {hash:{},data:data}))
    + "</button>\n      <div class=\"nano-content\">\n        <div class=\"resource-list-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_BLANK_VOL", {hash:{},data:data}))
    + "</div>\n        <ul class=\"clearfix\"><li class=\"tooltip resource-item volume\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VOLUME", {hash:{},data:data}))
    + "' data-type=\"VOL\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VOL", {hash:{},data:data}))
    + "</li></ul>\n        <div class=\"resource-list-head\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VOL_FROM_SNAPSHOT", {hash:{},data:data}))
    + "\n          <div class=\"selectbox resource-list-sort-select dark\" id=\"resource-list-sort-select-snapshot\">\n            <div class=\"selection\">By Date</div>\n            <ul class=\"dropdown\">\n              <li class=\"item selected focused\" data-id=\"date\">By Date</li>\n              <li class=\"item\" data-id=\"storge\">By Storage</li>\n            </ul>\n          </div>\n        </div>\n        <ul class=\"resource-list-snapshot\"></ul>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RDS", {hash:{},data:data}))
    + "</header>\n    <div class=\"accordion-body nano ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.rdsDisabled), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n      <div class=\"disableRds-content\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_MSG_RDS_DISABLED", {hash:{},data:data}))
    + "</div>\n      <button class=\"btn btn-primary ManageSnapshot ManageRdsSnapshot\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_RDS_SNAPSHOT_MANAGE", {hash:{},data:data}))
    + "</button>\n      <div class=\"nano-content\">\n        <div class=\"resource-list-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RDS_INSTANCE", {hash:{},data:data}))
    + "</div>\n        <ul class=\"resource-list-rds\"></ul>\n        <div class=\"resource-list-head\">\n          "
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RDS_INSTANCE_FROM_SNAPSHOT", {hash:{},data:data}))
    + "\n          <div class=\"selectbox resource-list-sort-select dark\" id=\"resource-list-sort-select-rds-snapshot\">\n            <div class=\"selection\">By Date</div>\n            <ul class=\"dropdown\">\n              <li class=\"item selected focused\" data-id=\"date\">By Date</li>\n              <li class=\"item\" data-id=\"engine\">By Engine</li>\n              <li class=\"item\" data-id=\"storge\">By Storage</li>\n            </ul>\n          </div>\n        </div>\n        <ul class=\"resource-list-rds-snapshot\"></ul>\n      </div>\n    </div>\n  </section>\n\n  <section class=\"accordion-group\">\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_ELB_ASG", {hash:{},data:data}))
    + "</header>\n    <ul class=\"resource-list-asg clearfix accordion-body\">\n      <li class=\"tooltip resource-item elb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ELB", {hash:{},data:data}))
    + "' data-type=\"ELB\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ELB", {hash:{},data:data}))
    + "</li>\n      <li class=\"tooltip resource-item asg\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ASG", {hash:{},data:data}))
    + "' data-type=\"ASG\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ASG", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n\n  <section class='accordion-group'>\n    <header class=\"fixedaccordion-head\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIT_VPC", {hash:{},data:data}))
    + "</header>\n    <ul class=\"accordion-body\">\n      <li class=\"tooltip resource-item rtb\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_RTB", {hash:{},data:data}))
    + "' data-type=\"RT\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_RTB", {hash:{},data:data}))
    + "</li>\n\n      <li class=\"tooltip resource-item igw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_IGW", {hash:{},data:data}))
    + "' data-type=\"IGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_IGW", {hash:{},data:data}))
    + "</li>\n\n      <li class=\"tooltip resource-item vgw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_VGW", {hash:{},data:data}))
    + "' data-type=\"VGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_VGW", {hash:{},data:data}))
    + "</li>\n\n      <li class=\"tooltip resource-item cgw\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_CGW", {hash:{},data:data}))
    + "' data-type=\"CGW\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_CGW", {hash:{},data:data}))
    + "</li>\n\n      <li class=\"tooltip resource-item eni\" data-tooltip='"
    + escapeExpression(helpers.i18n.call(depth0, "RES_TIP_DRAG_NEW_ENI", {hash:{},data:data}))
    + "' data-type=\"ENI\">"
    + escapeExpression(helpers.i18n.call(depth0, "RES_LBL_NEW_ENI", {hash:{},data:data}))
    + "</li>\n    </ul>\n  </section>\n</div>";
  return buffer;
  };
TEMPLATE.panel=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program2(depth0,data,depth2) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item bubble snapshot\" data-date=\""
    + escapeExpression(((stack1 = (depth0 && depth0.startTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-storge=\""
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-bubble-template=\"resPanelSnapshot\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"region\":\""
    + escapeExpression(((stack1 = (depth2 && depth2.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}' data-type=\"VOL\" data-option='{\"volumeSize\":"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ", \"snapshotId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"encrypted\": \"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.encrypted), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"}'>\n  <div class=\"ebs-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volumeSize)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div>"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "true";
  }

function program5(depth0,data) {
  
  
  return "false";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div style=\"padding-bottom:15px;\">No EBS Snapshot in "
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(7, program7, data),fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.snapshot=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, ((stack1 = (depth0 && depth0[0])),stack1 == null || stack1 === false ? stack1 : stack1.attributes), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item dbinstance tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"DBINSTANCE\" data-option='{\"engine\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n<div class=\"resource-icon-dbinstance\"><img src=\"/assets/images/ide/icon/rds-"
    + escapeExpression(helpers.firstOfSplit.call(depth0, (depth0 && depth0.Engine), "-", {hash:{},data:data}))
    + ".png\" width=\"42\" height=\"30\"></div>\n"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.rds=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n<li class=\"resource-item dbsnapshot bubble\" data-date=\""
    + escapeExpression(((stack1 = (depth0 && depth0.SnapshotCreateTime)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-engine=\""
    + escapeExpression(((stack1 = (depth0 && depth0.EngineVersion)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-storge=\""
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-type=\"DBINSTANCE\" data-option='{\"engine\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.Engine)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\", \"snapshotId\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.DBSnapshotIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"allocatedStorage\": \""
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" }' data-bubble-template=\"resPanelDbSnapshot\" data-bubble-data='{\"id\":\""
    + escapeExpression(((stack1 = (depth0 && depth0.DBSnapshotIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\",\"region\":\""
    + escapeExpression(((stack1 = (depth1 && depth1.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"}'>\n  <div class=\"resource-icon-dbsnapshot\"><img src=\"/assets/images/ide/icon/rds-"
    + escapeExpression(helpers.firstOfSplit.call(depth0, (depth0 && depth0.Engine), "-", {hash:{},data:data}))
    + ".png\" width=\"32\" height=\"23\">\n  <div class=\"rds-snapshot-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.AllocatedStorage)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " GB</div></div>"
    + escapeExpression(((stack1 = (depth0 && depth0.DBInstanceIdentifier)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\n</li>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<div style=\"padding-bottom:15px;\">No DB Snapshot in "
    + escapeExpression(((stack1 = (depth0 && depth0.region)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".</div>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(3, program3, data),fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.rds_snapshot=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1;
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.attributes), {hash:{},inverse:self.noop,fn:self.programWithDepth(2, program2, data, depth1),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
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
  buffer += "\n  <div class=\"resource-icon-instance\"><img src=\"/assets/images/ide/ami/"
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

function program5(depth0,data) {
  
  var stack1;
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.fav), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }
function program6(depth0,data) {
  
  
  return "<p class=\"blank-slate\">Use \"Browse Community AMI\" to add Favourite AMI.</p>";
  }

  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.program(5, program5, data),fn:self.programWithDepth(1, program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.ami=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"resource-icon resource-icon-instance\" >\n  <img src=\"/assets/images/ide/ami/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.osType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.architecture)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "."
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.cachedAmi)),stack1 == null || stack1 === false ? stack1 : stack1.rootDeviceType)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ".png\"/>\n</div>Auto Scaling Group ("
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")";
  return buffer;
  };
TEMPLATE.reuse_lc=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<dt>"
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.key)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</dt><dd>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</dd>";
  return buffer;
  }

  buffer += "<div class=\"bubble-head\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n<dl class=\"bubble-content dl-horizontal\">";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</dl>";
  return buffer;
  };
TEMPLATE.resourcePanelBubble=Handlebars.template(__TEMPLATE__);


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

  define('workspaces/editor/subviews/AmiBrowser',['../template/TplAmiBrowser', 'i18n!/nls/lang.js', 'UI.modalplus', "ApiRequest", 'CloudResources', 'backbone', 'jqpagination'], function(TplAmiBrowser, lang, Modal, ApiRequest, CloudResources) {
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
  define('workspaces/editor/subviews/ResourcePanel',["CloudResources", "Design", "../template/TplLeftPanel", "constant", 'dhcp', 'snapshotManager', 'rds_snapshot', 'sslcert_manage', 'sns_manage', 'kp_manage', 'rds_pg', 'rds_snapshot', './AmiBrowser', 'i18n!/nls/lang.js', 'ApiRequest', "backbone", 'UI.radiobuttons', "UI.nanoscroller", "UI.dnd"], function(CloudResources, Design, LeftPanelTpl, constant, dhcpManager, EbsSnapshotManager, RdsSnapshotManager, sslCertManager, snsManager, keypairManager, rdsPgManager, rdsSnapshot, AmiBrowser, lang, ApiRequest) {
    var LcItemView, __resizeAccdTO;
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
        config = config[ami.architecture];
        config = config[ami.virtualizationType || "paravirtual"];
        ami.instanceType = config.join(", ");
      } catch (_error) {
        e = _error;
      }
      return MC.template.bubbleAMIInfo(ami);
    };
    MC.template.resPanelDbSnapshot = function(data) {
      var ss;
      if (!data.region || !data.id) {
        return;
      }
      ss = CloudResources(constant.RESTYPE.DBSNAP, data.region).get(data.id);
      if (!ss) {
        return;
      }
      return LeftPanelTpl.resourcePanelBubble(ss.toJSON());
    };
    MC.template.resPanelSnapshot = function(data) {
      var ss;
      if (!data.region || !data.id) {
        return;
      }
      ss = CloudResources(constant.RESTYPE.SNAP, data.region).get(data.id);
      if (!ss) {
        return;
      }
      return LeftPanelTpl.resourcePanelBubble(ss.toJSON());
    };
    LcItemView = Backbone.View.extend({
      tagName: 'li',
      className: 'resource-item asg',
      initialize: function(options) {
        this.parent = options.parent;
        (this.parent || this).$el.find(".resource-list-asg").append(this.$el);
        this.listenTo(this.model, 'change:name', this.render);
        this.listenTo(this.model, 'change:imageId', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.render();
        this.$el.attr({
          "data-type": "ASG",
          "data-option": '{"lcId":"' + this.model.id + '"}'
        });
      },
      render: function() {
        return this.$el.html(LeftPanelTpl.reuse_lc({
          name: this.model.get("name"),
          cachedAmi: this.model.getAmi() || this.model.get("cachedAmi")
        }));
      }
    });
    return Backbone.View.extend({
      events: {
        "click .btn-fav-ami": "toggleFav",
        "OPTION_CHANGE .AmiTypeSelect": "changeAmiType",
        "click .BrowseCommunityAmi": "browseCommunityAmi",
        "click .ManageEbsSnapshot": "manageEbsSnapshot",
        "click .ManageRdsSnapshot": "manageRdsSnapshot",
        "click .fixedaccordion-head": "updateAccordion",
        "RECALC": "recalcAccordion",
        "mousedown .resource-item": "startDrag",
        "click .refresh-resource-panel": "refreshPanelData",
        'click .resources-dropdown-wrapper li': 'resourcesMenuClick',
        'OPTION_CHANGE #resource-list-sort-select-snapshot': 'resourceListSortSelectSnapshotEvent',
        'OPTION_CHANGE #resource-list-sort-select-rds-snapshot': 'resourceListSortSelectRdsEvent'
      },
      initialize: function(options) {
        var design, region;
        _.extend(this, options);
        this.subViews = [];
        region = this.workspace.opsModel.get("region");
        this.listenTo(CloudResources("MyAmi", region), "update", this.updateMyAmiList);
        this.listenTo(CloudResources(constant.RESTYPE.AZ, region), "update", this.updateAZ);
        this.listenTo(CloudResources(constant.RESTYPE.SNAP, region), "update", this.updateSnapshot);
        this.listenTo(CloudResources(constant.RESTYPE.DBSNAP, region), "update", this.updateRDSSnapshotList);
        design = this.workspace.design;
        this.listenTo(design, Design.EVENT.ChangeResource, this.onResChanged);
        this.listenTo(design, Design.EVENT.AddResource, this.updateDisableItems);
        this.listenTo(design, Design.EVENT.RemoveResource, this.updateDisableItems);
        this.listenTo(design, Design.EVENT.AddResource, this.updateLc);
        this.listenTo(this.workspace, "toggleRdsFeature", this.toggleRdsFeature);
        this.__amiType = "QuickStartAmi";
        this.setElement(this.parent.$el.find(".OEPanelLeft"));
        $(document).off('keydown', this.bindKey.bind(this)).on('keydown', this.bindKey.bind(this));
        return this.render();
      },
      render: function() {
        this.$el.html(LeftPanelTpl.panel({
          rdsDisabled: this.workspace.isRdsDisabled()
        }));
        this.$el.toggleClass("hidden", this.__leftPanelHidden || false);
        this.recalcAccordion();
        this.updateAZ();
        this.updateSnapshot();
        this.updateAmi();
        this.updateRDSList();
        this.updateRDSSnapshotList();
        this.updateDisableItems();
        this.renderReuse();
        this.$el.find(".nano").nanoScroller();
      },
      resourceListSortSelectRdsEvent: function(event) {
        var $currentTarget, $sortedList, selectedId;
        selectedId = 'date';
        if (event) {
          $currentTarget = $(event.currentTarget);
          selectedId = $currentTarget.find('.selected').data('id');
        }
        $sortedList = [];
        if (selectedId === 'date') {
          $sortedList = this.$el.find('.resource-list-rds-snapshot li').sort(function(a, b) {
            return (new Date($(b).data('date'))) - (new Date($(a).data('date')));
          });
        }
        if (selectedId === 'engine') {
          $sortedList = this.$el.find('.resource-list-rds-snapshot li').sort(function(a, b) {
            return $(a).data('engine') - $(b).data('engine');
          });
        }
        if (selectedId === 'storge') {
          $sortedList = this.$el.find('.resource-list-rds-snapshot li').sort(function(a, b) {
            return Number($(b).data('storge')) - Number($(a).data('storge'));
          });
        }
        if ($sortedList.length) {
          return this.$el.find('.resource-list-rds-snapshot').html($sortedList);
        }
      },
      resourceListSortSelectSnapshotEvent: function(event) {
        var $currentTarget, $sortedList, selectedId;
        selectedId = 'date';
        if (event) {
          $currentTarget = $(event.currentTarget);
          selectedId = $currentTarget.find('.selected').data('id');
        }
        $sortedList = [];
        if (selectedId === 'date') {
          $sortedList = this.$el.find('.resource-list-snapshot li').sort(function(a, b) {
            return (new Date($(b).data('date'))) - (new Date($(a).data('date')));
          });
        }
        if (selectedId === 'storge') {
          $sortedList = this.$el.find('.resource-list-snapshot li').sort(function(a, b) {
            return Number($(a).data('storge')) - Number($(b).data('storge'));
          });
        }
        if ($sortedList.length) {
          return this.$el.find('.resource-list-snapshot').html($sortedList);
        }
      },
      bindKey: function(event) {
        var is_input, keyCode, metaKey, shiftKey, tagName, that;
        that = this;
        keyCode = event.which;
        metaKey = event.ctrlKey || event.metaKey;
        shiftKey = event.shiftKey;
        tagName = event.target.tagName.toLowerCase();
        is_input = tagName === 'input' || tagName === 'textarea';
        if (metaKey === false && shiftKey === false && keyCode === 82 && is_input === false) {
          that.toggleResourcePanel();
          return false;
        }
      },
      renderReuse: function() {
        var lc, _i, _len, _ref;
        _ref = this.workspace.design.componentsOfType(constant.RESTYPE.LC);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lc = _ref[_i];
          if (!lc.get('appId')) {
            new LcItemView({
              model: lc,
              parent: this
            });
          }
        }
        return this;
      },
      updateLc: function(resModel) {
        if (resModel.type === constant.RESTYPE.LC && !resModel.get('appId')) {
          return new LcItemView({
            model: resModel,
            parent: this
          });
        }
      },
      onResChanged: function(resModel) {
        if (!resModel) {
          return;
        }
        if (resModel.type !== constant.RESTYPE.AZ) {
          return;
        }
        this.updateAZ();
      },
      updateAZ: function(resModel) {
        var availableAZ, az, region, usedAZ, _i, _len, _ref;
        if (!this.workspace.isAwake()) {
          return;
        }
        if (resModel && resModel.type !== constant.RESTYPE.AZ) {
          return;
        }
        region = this.workspace.opsModel.get("region");
        usedAZ = (function() {
          var _i, _len, _ref, _results;
          _ref = this.workspace.design.componentsOfType(constant.RESTYPE.AZ) || [];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            az = _ref[_i];
            _results.push(az.get("name"));
          }
          return _results;
        }).call(this);
        availableAZ = [];
        _ref = CloudResources(constant.RESTYPE.AZ, region).where({
          category: region
        }) || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          az = _ref[_i];
          if (usedAZ.indexOf(az.id) === -1) {
            availableAZ.push(az.id);
          }
        }
        this.$el.find(".az").toggleClass("disabled", availableAZ.length === 0).data("option", {
          name: availableAZ[0]
        }).children(".resource-count").text(availableAZ.length);
      },
      updateSnapshot: function() {
        var cln, region;
        region = this.workspace.opsModel.get("region");
        cln = CloudResources(constant.RESTYPE.SNAP, region).where({
          category: region
        }) || [];
        cln.region = cln.length ? region : constant.REGION_SHORT_LABEL[region];
        return this.$el.find(".resource-list-snapshot").html(LeftPanelTpl.snapshot(cln));
      },
      toggleRdsFeature: function() {
        this.$el.find(".ManageRdsSnapshot").parent().toggleClass("disableRds", this.workspace.isRdsDisabled());
        if (!this.workspace.isRdsDisabled()) {
          this.updateRDSList();
          this.updateRDSSnapshotList();
        }
        this.updateDisableItems();
        this.$el.children(".sidebar-title").find(".icon-rds-snap,.icon-pg").toggleClass("disabled", this.workspace.isRdsDisabled());
      },
      updateRDSList: function() {
        var cln;
        cln = CloudResources(constant.RESTYPE.DBENGINE, this.workspace.opsModel.get("region")).groupBy("DBEngineDescription");
        return this.$el.find(".resource-list-rds").html(LeftPanelTpl.rds(cln));
      },
      updateRDSSnapshotList: function() {
        var cln, region;
        region = this.workspace.opsModel.get("region");
        cln = CloudResources(constant.RESTYPE.DBSNAP, region).toJSON();
        cln.region = cln.length ? region : constant.REGION_SHORT_LABEL[region];
        return this.$el.find(".resource-list-rds-snapshot").html(LeftPanelTpl.rds_snapshot(cln));
      },
      changeAmiType: function(evt, attr) {
        this.__amiType = attr || "QuickStartAmi";
        this.updateAmi();
        if (!$(evt.currentTarget).parent().hasClass(".open")) {
          $(evt.currentTarget).parent().click();
        }
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
        return this.$el.find(".resource-list-ami").html(html).parent().nanoScroller("reset");
      },
      updateDisableItems: function(resModel) {
        var $ul, RESTYPE, az, design, disabled, subnet, tooltip, _i, _len, _ref;
        if (!this.workspace.isAwake()) {
          return;
        }
        this.updateAZ(resModel);
        design = this.workspace.design;
        RESTYPE = constant.RESTYPE;
        $ul = this.$el.find(".resource-item.igw").parent();
        $ul.children(".resource-item.igw").toggleClass("disabled", design.componentsOfType(RESTYPE.IGW).length > 0);
        $ul.children(".resource-item.vgw").toggleClass("disabled", design.componentsOfType(RESTYPE.VGW).length > 0);
        az = {};
        _ref = design.componentsOfType(RESTYPE.SUBNET);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          az[subnet.parent().get("name")] = true;
        }
        this.sbg = this.$el.find(".resource-item.subnetgroup");
        if (_.keys(az).length < 2) {
          disabled = true;
          tooltip = "To create subnet group, there must to be subnets from at least 2 different availability zones on canvas.";
          this.sbg.toggleClass("disabled", true).attr("data-tooltip");
        } else {
          disabled = false;
          tooltip = lang.ide.RES_TIP_DRAG_NEW_SUBNET_GROUP;
        }
        if (this.workspace.isRdsDisabled()) {
          disabled = true;
          tooltip = lang.ide.RES_MSG_RDS_DISABLED;
        }
        this.sbg.toggleClass("disabled", disabled).attr("data-tooltip", tooltip);
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
        return null;
      },
      toggleResourcePanel: function() {
        return this.toggleLeftPanel();
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
          $accordion.addClass("expanded").children(".nano").nanoScroller("reset");
          $expanded.removeClass("expanded");
          return false;
        }
        $body.slideDown(200, function() {
          return $accordion.addClass("expanded").children(".nano").nanoScroller("reset");
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
      manageEbsSnapshot: function() {
        return new EbsSnapshotManager().render();
      },
      manageRdsSnapshot: function() {
        return new RdsSnapshotManager().render();
      },
      refreshPanelData: function(evt) {
        var $tgt, jobs, region;
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("reloading")) {
          return;
        }
        $tgt.addClass("reloading");
        region = this.workspace.opsModel.get("region");
        jobs = [CloudResources("MyAmi", region).fetchForce(), CloudResources(constant.RESTYPE.SNAP, region).fetchForce()];
        if (this.workspace.isRdsDisabled()) {
          jobs.push(this.workspace.fetchRdsData());
        } else {
          jobs.push(CloudResources(constant.RESTYPE.DBSNAP, region).fetchForce());
        }
        Q.all(jobs).done(function() {
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
            return new EbsSnapshotManager().render();
          case 'sns':
            return new snsManager().render();
          case 'sslcert':
            return new sslCertManager().render();
          case 'dhcp':
            return (new dhcpManager()).manageDhcp();
          case 'rdspg':
            return new rdsPgManager().render();
          case 'rdssnapshot':
            return new rdsSnapshot().render();
        }
      },
      startDrag: function(evt) {
        var $tgt, dropTargets, option, type;
        if (evt.button !== 0) {
          return false;
        }
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("disabled")) {
          return false;
        }
        if (evt.target && $(evt.target).hasClass("btn-fav-ami")) {
          return;
        }
        type = constant.RESTYPE[$tgt.attr("data-type")];
        dropTargets = "#OpsEditor .OEPanelCenter";
        if (type === constant.RESTYPE.INSTANCE) {
          dropTargets += ",#changeAmiDropZone";
        }
        option = $.extend(true, {}, $tgt.data("option") || {});
        option.type = type;
        $tgt.dnd(evt, {
          dropTargets: $(dropTargets),
          dataTransfer: option,
          eventPrefix: type === constant.RESTYPE.VOL ? "addVol_" : "addItem_",
          onDragStart: function(data) {
            if (type === constant.RESTYPE.AZ) {
              return data.shadow.children(".res-name").text($tgt.data("option")["name"]);
            } else if (type === constant.RESTYPE.ASG) {
              return data.shadow.text("ASG");
            }
          }
        });
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
          if (this.timer) {
            clearInterval(this.timer);
          }
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
            return require(['component/trustedadvisor/gui/main'], function(trustedadvisor_main) {
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
        _.extend(this, options);
        workspace = this.workspace;
        this.itemViews = [];
        this.setElement(this.parent.$el.find(".OEPanelBottom").html(template.frame()));
        return this.renderItem();
      },
      ready: false,
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

define('workspaces/editor/canvas/TplSvgDef',['handlebars'], function(Handlebars){ var TEMPLATE = function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<svg style=\"display:none;\" id=\"svgDefs\"><defs>\r\n  <path d=\"M-5 0.5l5.5 -5.5l5.5 5.5 l-5.5 5.5z\" id=\"port_diamond\"></path>\r\n  <path d=\"M8 0.5l-6 -5.5l-2 0 l0 11 l2 0z\" id=\"port_right\"></path>\r\n  <path d=\"M-8 0.5l6 -5.5l2 0 l0 11 l-2 0z\" id=\"port_left\"></path>\r\n  <path d=\"M0.5 0l5.5 0l0 -2l-5.5 -6l-5.5 6l0 2z\" id=\"port_top\"></path>\r\n  <path d=\"M0.5 0l5.5 0l0 2l-5.5 6l-5.5 -6l0 -2z\" id=\"port_bottom\"></path>\r\n  <path d=\"M0 74h90v11a5 5 0 0 1 -5 5h-80a5 5 0 0 1 -5 -5z\" id=\"label_path\" data-readonly=\"true\"></path>\r\n\r\n  <g id=\"asg_frame\">\r\n    <rect class=\"group-asg\" rx=\"5\" ry=\"5\" height=\"129\" x=\"1\" y=\"1\" width=\"129\"></rect>\r\n    <path d=\"M0 21l0 -16a5 5 0 0 1 5 -5l121 0a5 5 0 0 1 5 5l0 16z\" class=\"asg-title\"></path>\r\n  </g>\r\n  <text id=\"asg_prompt\">\r\n    <tspan x=\"25\" y=\"47\">Drop AMI from</tspan>\r\n    <tspan x=\"20\" y=\"67\">resource panel to</tspan>\r\n    <tspan x=\"30\" y=\"87\">create launch</tspan>\r\n    <tspan x=\"30\" y=\"107\">configuration</tspan>\r\n  </text>\r\n\r\n  <g id=\"asg_dragger\">\r\n    <rect height=\"14\" width=\"14\" fill=\"transparent\" x=\"114\" y=\"3\"/>\r\n    <path d=\"M114.26 11.447 c-0.44 2.83 -0.252 5.113 -0.12 5.313 c0.204 0.398 4.473 0.24 5.512 -0.133 c0.86 -0.604 -0.623 -1.15 -1.094 -1.962 c0.471 -0.611 1.976 -2.352 2.324 -2.865 c-0.28 -1.65 -1.649 -1.818 -1.78 -1.76 c -0.13 0.06 -2.809 2.411 -2.809 2.411 c0 0 -0.925 -0.997 -1.292 -1.259 c-0.465 -0.322 -0.742 0.18 -0.742 0.254 l0 0z m13.482 -2.895 c0.437 -2.83 0.25 -5.115 0.118 -5.315 c-0.204 -0.396 -4.473 -0.227 -5.514 0.135 c-0.856 0.604 0.626 1.15 1.096 1.962 c-0.47 0.611 -1.976 2.352 -2.323 2.868 c0.293 1.648 1.648 1.815 1.778 1.758 c0.13 -0.06 2.805 -2.41 2.805 -2.41 c0.004 0 0.93 0.994 1.3 1.26 c0.461 0.32 0.74 -0.184 0.74 -0.26 l0 0Z\"/>\r\n  </g>\r\n\r\n  <g id=\"clone_indicator\" data-readonly=\"true\">\r\n    <rect fill=\"#000\" width=\"23\" height=\"23\" rx=\"4\" ry=\"4\"></rect>\r\n    <path d=\"M8 7c0-1.112.895-2 2-2h6c1.112 0 2 .895 2 2v6c0 1.112-.895 2-2 2v-6c0-1.103-.898-2-2-2h-6zm-1 1c-1.1 0-2 .887-2 2v6c0 1.1.887 2 2 2h6c1.1 0 2-.887 2-2v-6c0-1.1-.887-2-2-2h-6zm1 2c-.547 0-1 .451 -1 1v4c0 .547.45 1 1 1h4c.547 0 1 -.45 1-1v-4c0-.547-.45-1-1-1h-4z\" fill-rule=\"evenodd\" fill=\"#FFF\"></path>\r\n  </g>\r\n\r\n  <g id=\"replica_dragger\">\r\n    <rect x=\"34\" y=\"53\" width=\"22\" height=\"22\" rx=\"3\" class=\"replica-bg\"/>\r\n    <path d=\"M44.5 57c3.038 0 5.5 1.119 5.5 2.5s-2.462 2.5-5.5 2.5-5.5-1.119-5.5-2.5 2.462-2.5 5.5-2.5zm5.5 9h-3v2h3v2l4-3-4-3v2zm-1 3h-2c-.552 0-1-.448-1-1v-2c0-.552.448-1 1-1h2c0-.552.448-1 1-1v-3h-.11c-.51 1.141-2.729 2-5.39 2-2.661 0-4.88-.859-5.39-2h-.11v8h.11c.51 1.141 2.729 2 5.39 2 2.069 0 3.859-.522 4.798-1.29-.184-.181-.298-.432-.298-.71z\"/>\r\n  </g>\r\n\r\n  <g id=\"sbg_info\" data-readonly=\"true\">\r\n    <circle cx=\"10\" cy=\"10\" r=\"6\"></circle>\r\n    <path fill=\"#fff\" d=\"M9,9 L9,14 L11,14 L11,9 L9,9 Z M10,8 C10.55,8 11,7.55 11,7 C11,6.448 10.55,6 10,6 C9.448,6 9,6.448 9,7 C9,7.55 9.448,8 10,8 Z\"></path>\r\n  </g>\r\n\r\n</defs></svg>";
  }; return Handlebars.template(TEMPLATE); });
(function() {
  define('workspaces/editor/canvas/CanvasManager',['CloudResources'], function(CloudResources) {
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
        toggle = targetModel.hasPrimaryEip();
        if (toggle) {
          tootipStr = 'Detach Elastic IP from primary IP';
          imgUrl = 'ide/icon/icn-eipon.png';
        } else {
          tootipStr = 'Associate Elastic IP to primary IP';
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
        var el, length, maxWidth, text, _i, _len;
        text = canvasItem.label();
        maxWidth = canvasItem.labelWidth();
        if (_.isString(labelElement)) {
          labelElement = document.getElementById(labelElement);
        }
        if (!labelElement.length && labelElement.length !== 0) {
          labelElement = [labelElement];
        }
        $(labelElement[0]).text(text);
        if (labelElement[0].getSubStringLength(0, text.length) > maxWidth) {
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

(function() {
  define('workspaces/editor/canvas/CanvasElement',["Design", "./CanvasManager", "i18n!/nls/lang.js", "UI.modalplus", "event", "backbone", "svg"], function(Design, CanvasManager, lang, Modal, ide_event) {
    var CanvasElement, CanvasView, SubElements, __detailExtend;
    CanvasView = null;
    __detailExtend = Backbone.Model.extend;

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 env:dev:end */
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
        var cc, child, name, pos, _i, _len, _ref;
        node.move(x * CanvasView.GRID_WIDTH, y * CanvasView.GRID_HEIGHT);
        _ref = node.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          cc = child.node;
          if (cc.tagName.toLowerCase() !== "path") {
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
        }).classes('canvasel ' + this.type.replace(/\./g, "-"));
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
        }).classes("canvasel group " + this.type.replace(/\./g, "-"));
      },
      label: function() {
        if (this.model.type === "ExpandedAsg" && this.model.get("originalAsg")) {
          return this.model.get("originalAsg").get("groupName");
        } else {
          return this.model.get("name");
        }
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
          return null;
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
        ide_event.trigger(ide_event.OPEN_PROPERTY, this.type, this.model.id);
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
          result = sprintf(lang.ide.CVS_CFM_DEL_GROUP, name);
        }
        if (_.isString(result)) {
          self = this;
          modal = new Modal({
            title: sprintf(lang.ide.CVS_CFM_DEL, name),
            template: result,
            confirm: {
              text: lang.ide.CFM_BTN_DELETE,
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
        if ((this.parent() || null) === newParent) {
          if (this.model.x() === x && this.model.y() === y) {
            return;
          }
          this.moveBy(x - this.model.x(), y - this.model.y());
          return;
        }
        if (this.model.get("appId")) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
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
  define('workspaces/editor/canvas/CanvasView',["./TplSvgDef", "./CanvasElement", "./CanvasManager", "Design", "i18n!/nls/lang.js", "UI.modalplus", "event", "backbone", "UI.nanoscroller", "svg"], function(SvgDefTpl, CanvasElement, CanvasManager, Design, lang, Modal, ide_event) {
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
        "mousedown svg": "__dragCanvasMouseDown"
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
        } else {
          parentRect = this.canvasRect();
          children = this.__itemTopLevel;
        }
        parentRect.x1 += 1;
        parentRect.y1 += 1;
        parentRect.x2 -= 1;
        parentRect.y2 -= 1;
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
          ide_event.trigger(ide_event.OPEN_PROPERTY);
        }
      },
      clearItems: function() {
        var id, item, _ref;
        _ref = this.__itemMap;
        for (id in _ref) {
          item = _ref[id];
          item.remove();
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
    }, {
      GRID_WIDTH: 10,
      GRID_HEIGHT: 10
    });
    CanvasElement.setCanvasViewClass(CanvasView);
    return CanvasView;
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CanvasPopup',["backbone"], function() {
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
          ac = function(evt) {
            if (self.autoclose(evt)) {
              self.canvas.$el[0].removeEventListener("mousedown", ac, true);
            }
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
        if (this.onRemove) {
          this.onRemove();
        }
        return Backbone.View.prototype.remove.call(this);
      },
      content: function() {}
    });
  });

}).call(this);

define('workspaces/editor/canvas/TplPopup',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<header class=\"volume-pph\">Attached Volume <span>("
    + escapeExpression(((stack1 = (depth0 && depth0.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ")</span></header>\n<ul class=\"popup-content popup-volume\">\n\n    ";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.snapshot), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <div class=\"vpp-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n        <div class=\"vpp-size\">"
    + escapeExpression(((stack1 = (depth0 && depth0.size)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "GB</div>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.appId), {hash:{},inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n";
  return buffer;
  }
function program3(depth0,data) {
  
  
  return "vpp-snapshot";
  }

function program5(depth0,data) {
  
  
  return "vpp-volume";
  }

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<i class=\"status res-state tooltip "
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>";
  return buffer;
  }

function program9(depth0,data) {
  
  
  return "\n<div class=\"volume-pp-empty\">No attached volumes</div>\n";
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.length), {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  };
TEMPLATE.volume=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"popup-content popup-instance\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"vpp-instance\">\n    <i class=\"vpp-ins-state tooltip status-"
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.state)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></i>\n    <img src=\"/assets/images/"
    + escapeExpression(((stack1 = (depth0 && depth0.icon)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" width=\"39\" height=\"27\">\n    <div class=\"vpp-ins-vol\">"
    + escapeExpression(((stack1 = (depth0 && depth0.volume)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div>\n    <div class=\"vpp-ins-name\">"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</div> </li>";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\n<div class=\"instance-pp-empty\">No instances</div>\n";
  }

  buffer += "<header class=\"instance-pph\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"instance-pph-close\">×</span></header>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.items)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.instance=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<ul class=\"popup-content popup-instance\">\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.items), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<li data-id=\""
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"vpp-instance vpp-eni\">\n  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.eip), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  "
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</li>";
  return buffer;
  }
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"vpp-eip tooltip\" data-tooltip=\""
    + escapeExpression(((stack1 = (depth0 && depth0.eip)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n<div class=\"instance-pp-empty\">No network interfaces</div>\n";
  }

  buffer += "<header class=\"instance-pph\">"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"instance-pph-close\">×</span></header>\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.items)),stack1 == null || stack1 === false ? stack1 : stack1.length), {hash:{},inverse:self.program(5, program5, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  };
TEMPLATE.eni=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
(function() {
  define('workspaces/editor/canvas/CpVolume',["./CanvasPopup", "./TplPopup", "event", "constant", "CloudResources"], function(CanvasPopup, TplPopup, ide_event, constant, CloudResources) {
    return CanvasPopup.extend({
      type: "VolumePopup",
      events: {
        "mousedown li": "clickVolume"
      },
      closeOnBlur: true,
      initialize: function() {
        var data, volume, _i, _len, _ref;
        CanvasPopup.prototype.initialize.apply(this, arguments);
        if (this.host) {
          this.listenTo(this.host, "change:volumeList", this.render);
        }
        data = this.models || [];
        if (data[0] && data[0].get) {
          _ref = this.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            volume = _ref[_i];
            this.listenTo(volume, "change:name", this.updateVolume);
            this.listenTo(volume, "change:volumeSize", this.updateVolume);
          }
        }
        if (this.selectAtBegin) {
          this.clickVolume({
            currentTarget: this.$el.find('[data-id=' + this.selectAtBegin.id + ']')[0]
          });
        }
      },
      migrate: function(oldPopup) {
        var id;
        id = oldPopup.$el.find(".selected").attr("data-id");
        this.$el.find('[data-id="' + id + '"]').addClass("selected");
      },
      updateVolume: function(volume) {
        var $vol;
        $vol = this.$el.find('[data-id=' + volume.id + ']');
        $vol.children(".vpp-name").text(volume.get("name"));
        $vol.children(".vpp-size").text(volume.get("volumeSize") + "GB");
      },
      content: function() {
        var appData, appId, data, volume, _i, _len, _ref;
        data = this.models || [];
        if (data[0] && data[0].get) {
          data = [];
          _ref = this.models;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            volume = _ref[_i];
            appId = volume.get("appId");
            data.push({
              id: volume.get("id"),
              appId: appId,
              name: volume.get("name"),
              size: volume.get("volumeSize"),
              snapshot: volume.get("snapshotId")
            });
            if (appId) {
              appData = CloudResources(volume.type, volume.design().region()).get(appId);
              _.last(data).state = (appData != null ? appData.get('state') : void 0) || 'unknown';
            }
          }
        }
        return TplPopup.volume(data);
      },
      clickVolume: function(evt) {
        var $vol, volId;
        $vol = $(evt.currentTarget).addClass("selected");
        volId = $vol.attr("data-id");
        this.canvas.selectVolume(volId);
        if (this.selected) {
          $(this.selected).removeClass("selected");
        }
        this.selected = evt.currentTarget;
        ide_event.trigger(ide_event.OPEN_PROPERTY, constant.RESTYPE.VOL, volId);
        if (!this.canvas.design.modeIsApp() && evt.which === 1) {
          $vol.dnd(evt, {
            dropTargets: this.canvas.$el,
            dataTransfer: {
              id: volId
            },
            eventPrefix: "addVol_"
          });
        }
        return false;
      },
      remove: function() {
        this.canvas.selectVolume(null);
        CanvasPopup.prototype.remove.call(this);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CanvasViewAws',["./CanvasView", "constant", "i18n!/nls/lang.js", "./CpVolume", "./CanvasManager", "Design"], function(CanvasView, constant, lang, VolumePopup, CanvasManager, Design) {
    var AwsCanvasView, isPointInRect;
    isPointInRect = function(point, rect) {
      return rect.x1 <= point.x && rect.y1 <= point.y && rect.x2 >= point.x && rect.y2 >= point.y;
    };
    AwsCanvasView = CanvasView.extend({
      events: function() {
        return $.extend({
          "addVol_dragover": "__addVolDragOver",
          "addVol_dragleave": "__addVolDragLeave",
          "addVol_drop": "__addVolDrop"
        }, CanvasView.prototype.events);
      },
      recreateStructure: function() {
        this.svg.clear().add([this.svg.group().classes("layer_vpc"), this.svg.group().classes("layer_az"), this.svg.group().classes("layer_subnet"), this.svg.group().classes("layer_asg"), this.svg.group().classes("layer_line"), this.svg.group().classes("layer_sgline"), this.svg.group().classes("layer_node")]);
      },
      appendVpc: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_vpc");
      },
      appendAz: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_az");
      },
      appendSubnet: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_subnet");
      },
      appendAsg: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_asg");
      },
      appendSgline: function(svgEl) {
        return this.__appendSvg(svgEl, ".layer_sgline");
      },
      fixConnection: function(coord, initiator, target) {
        var toPort;
        if (target.type === constant.RESTYPE.ELB && (initiator.type === constant.RESTYPE.INSTANCE || initiator.type === constant.RESTYPE.LC)) {
          if (coord.x > target.pos().x + target.size().width / 2) {
            toPort = "elb-sg-out";
          } else {
            toPort = "elb-sg-in";
          }
        } else if (target.type === constant.RESTYPE.ASG || target.type === "ExpandedAsg") {
          target = target.getLc();
          if (target) {
            target = this.getItem(target.id);
          }
        }
        return {
          toPort: toPort,
          target: target
        };
      },
      errorMessageForDrop: function(type) {
        switch (type) {
          case constant.RESTYPE.VOL:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_VOLUME;
          case constant.RESTYPE.SUBNET:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_SUBNET;
          case constant.RESTYPE.INSTANCE:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_INSTANCE_SUBNET;
          case constant.RESTYPE.ENI:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_ENI;
          case constant.RESTYPE.RT:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_RTB;
          case constant.RESTYPE.ELB:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_ELB;
          case constant.RESTYPE.CGW:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_CGW;
          case constant.RESTYPE.ASG:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_ASG;
          case constant.RESTYPE.IGW:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_IGW;
          case constant.RESTYPE.VGW:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_VGW;
          case constant.RESTYPE.DBSBG:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_SGP_VPC;
          case constant.RESTYPE.DBINSTANCE:
            return lang.ide.CVS_MSG_WARN_NOTMATCH_DBINSTANCE_SGP;
        }
      },
      selectVolume: function(volumeId) {
        this.deselectItem(true);
        this.__selectedVolume = volumeId;
        return false;
      },
      isReadOnly: function() {
        return this.design.modeIsApp();
      },
      delSelectedItem: function() {
        var nextVol, res, s, volume;
        if (this.isReadOnly()) {
          return false;
        }
        if (this.__selectedVolume) {
          volume = this.design.component(this.__selectedVolume);
          res = volume.isRemovable();
          if (_.isString(res)) {
            notification("error", res);
            return;
          }
          s = this.__selectedVolume;
          this.__selectedVolume = null;
          volume.remove();
          nextVol = $(".canvas-pp .popup-volume").children().eq(0);
          if (nextVol.length) {
            nextVol.trigger("mousedown");
          } else {
            this.deselectItem();
          }
          return;
        }
        return CanvasView.prototype.delSelectedItem.apply(this, arguments);
      },
      __addVolDragOver: function(evt, data) {
        var RTP, dropzones, el, hoverItem, model, pos, r, targets, tgt, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
        this.__scrollOnDrag(data);
        if (!data.volDropTargets) {
          data.hoverItem = null;
          RTP = constant.RESTYPE;
          targets = this.design.componentsOfType(RTP.INSTANCE).concat(this.design.componentsOfType(RTP.LC));
          data.volDropTargets = dropzones = [];
          for (_i = 0, _len = targets.length; _i < _len; _i++) {
            tgt = targets[_i];
            tgt = this.getItem(tgt.id);
            _ref = tgt.$el;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              el = _ref[_j];
              r = tgt.rect(el);
              r.tgt = tgt;
              r.el = el;
              dropzones.push(r);
            }
          }
        }
        if (!data.effect) {
          data.effect = true;
          _ref1 = data.volDropTargets || [];
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            tgt = _ref1[_k];
            CanvasManager.addClass(tgt.tgt.$el, "droppable");
          }
        }
        pos = this.__localToCanvasCoor(data.pageX - data.zoneDimension.x1, data.pageY - data.zoneDimension.y1);
        hoverItem = null;
        _ref2 = data.volDropTargets;
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          tgt = _ref2[_l];
          if (isPointInRect(pos, tgt)) {
            hoverItem = tgt;
            break;
          }
        }
        if (hoverItem !== data.hoverItem) {
          if (data.popup) {
            data.popup.remove();
          }
          data.hoverItem = hoverItem;
          if (hoverItem) {
            model = hoverItem.tgt.model;
            data.popup = new VolumePopup({
              attachment: hoverItem.el,
              host: model,
              models: model.get("volumeList"),
              canvas: this
            });
          }
        }
      },
      __addVolDragLeave: function(evt, data) {
        var tgt, _i, _len, _ref;
        this.__clearDragScroll();
        _ref = data.volDropTargets || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tgt = _ref[_i];
          CanvasManager.removeClass(tgt.tgt.$el, "droppable");
        }
        data.effect = false;
        if (data.popup) {
          data.popup.remove();
        }
      },
      __addVolDrop: function(evt, data) {
        var VolumeModel, attr, doable, owner, v, volume;
        if (!data.hoverItem) {
          return;
        }
        attr = data.dataTransfer || {};
        owner = data.hoverItem.tgt.model;
        if (attr.id) {
          volume = this.design.component(attr.id);
          doable = volume.isReparentable(owner);
          if (_.isString(doable)) {
            return notification("error", doable);
          } else if (doable) {
            volume.attachTo(owner);
            this.selectItem(data.hoverItem.el);
          }
          return;
        }
        if (owner.type === constant.RESTYPE.LC && owner.get("appId")) {
          notification("error", lang.ide.NOTIFY_MSG_WARN_OPERATE_NOT_SUPPORT_YET);
          return;
        }
        attr.owner = owner;
        if (_.isString(attr.encrypted)) {
          attr.encrypted = attr.encrypted === 'true';
        }
        VolumeModel = Design.modelClassForType(constant.RESTYPE.VOL);
        v = new VolumeModel(attr);
        new VolumePopup({
          attachment: data.hoverItem.el,
          host: owner,
          models: owner.get("volumeList"),
          canvas: this,
          selectAtBegin: v
        });
      }
    });
    return AwsCanvasView;
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CanvasViewDnd',["./CanvasView", "./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasView, CanvasElement, constant, CanvasManager, lang) {
    var CanvasViewProto, ________visualizeBestfit, ________visualizeOnMove, __cancelCanvasDrag, __canvasDrag, __expandRect, __findFits, __isContain, __isOverlap, __isRectEmpty, __moveItemCancel, __moveItemDidDrop, __moveItemDrag, __moveItemDrop, __moveItemStart, __moveStickyItemDrag, __moveStickyItemDrop, __moveStickyItemStart, __parentBorderLimit, __rectHeight, __rectWidth;
    ________visualizeOnMove = function() {};
    ________visualizeBestfit = function() {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     env:dev:end */
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
        return this.__dragHoverGroup = null;
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
          return lang.ide.CVS_MSG_WARN_NO_ENOUGH_SPACE;
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
        if (result === lang.ide.CVS_MSG_WARN_NO_ENOUGH_SPACE) {
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
  define('workspaces/editor/canvas/CanvasViewConnect',["./CanvasView", "Design", "./CanvasManager", "./CanvasElement", "i18n!/nls/lang.js"], function(CanvasView, Design, CanvasManager, CanvasElement, lang) {
    var CanvasViewProto, cancelConnect, detectDrag, startDrag, __drawLineMove, __drawLineUp;
    CanvasViewProto = CanvasView.prototype;
    cancelConnect = function(evt) {
      var $el, data, _i, _len, _ref;
      $(document).off(".drawline");
      data = evt.data;
      data.context.__clearDragScroll();
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
      var $port, cn, co, comp, data, dimension, highlightEls, item, lineSvg, marker, portAlias, portName, portPos, ports, pos, ti, toPort, type, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      $port = d.source;
      item = d.startItem;
      portName = $port.attr("data-name");
      portAlias = $port.attr("data-alias");
      pos = item.pos($port.closest("g")[0]);
      portPos = item.portPosition(portAlias || portName);
      pos.x = pos.x * CanvasView.GRID_WIDTH + portPos[0];
      pos.y = pos.y * CanvasView.GRID_HEIGHT + portPos[1];
      _ref = item.connections();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cn = _ref[_i];
        CanvasManager.addClass(cn.$el, "hover");
      }
      highlightEls = [];
      _ref1 = Design.modelClassForType("Framework_CN").connectionData(item.type, portName);
      for (type in _ref1) {
        data = _ref1[type];
        _ref2 = this.design.componentsOfType(type);
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          comp = _ref2[_j];
          for (_k = 0, _len2 = data.length; _k < _len2; _k++) {
            toPort = data[_k];
            if (item.isConnectable(portName, comp.id, toPort)) {
              ti = this.getItem(comp.id);
              if (ti) {
                ports = ti.$el.children("[data-name='" + toPort + "']");
                CanvasManager.addClass(ti.$el, "connectable");
                CanvasManager.addClass(ports, "connectable");
                highlightEls.push(ports);
                highlightEls.push(ti.$el);
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
      $tgt = $port.closest("g");
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
  define('workspaces/editor/canvas/CanvasViewGResizer',["./CanvasView"], function(CanvasView) {
    var CanvasViewProto, ________visualizeResize, __childrenBound, __max, __min, __resizeMove, __resizeUp, __updateGroupEl, __updateRange;
    ________visualizeResize = function() {};

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                env:dev:end */
    CanvasViewProto = CanvasView.prototype;
    CanvasViewProto.__resizeGroupDown = function(evt) {
      var $group, $resizer, data, direction, dirt, item, left, parent, size, target, top, _i, _len;
      $resizer = $(evt.currentTarget);
      $group = $resizer.closest("g");
      item = this.getItem($group.attr("data-id"));
      direction = $resizer.attr("class").replace("group-resizer ", "").split("-");
      target = item.rect();
      parent = item.parent();
      if (parent) {
        parent = parent.rect();
        parent.x1 += 1;
        parent.y1 += 1;
        parent.x2 -= 1;
        parent.y2 -= 1;
      } else {
        size = this.size();
        parent = {
          x1: 4,
          y1: 2,
          x2: size[0] - 4,
          y2: size[1] - 2
        };
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
    return __resizeUp = function(evt) {
      var data;
      data = evt.data;
      data.overlay.remove();
      $(document).off(".resizegroup");
      return false;
    };
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CanvasViewLayout',["./CanvasView", "constant"], function(CanvasView, constant) {
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
          if (node = this.findNode(this.root, w, h)) {
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
        if (node = this.findNode(this.root, w, h)) {
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
        if (node = this.findNode(this.root, w, h)) {
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
  define('workspaces/editor/canvas/CanvasViewAwsLayout',["./CanvasViewAws", "./CanvasViewLayout", "constant"], function(AwsCanvasView, CanvasViewLayoutHelpers, constant) {
    var ArrangeForAzs, ArrangeForSvg, ArrangeForVpc, AutoLayoutConfig, GroupMForDbSubnet, GroupMForSubnet, SortForVpc, __sortInstance;
    __sortInstance = function(instances) {
      return instances.sort(function(a, b) {
        return b.component.connections("ElbAmiAsso").length - a.component.connections("ElbAmiAsso");
      });
    };
    GroupMForSubnet = function(children) {
      var asgGroup, ch, eni, eniGroup, eniInstanceG, enis, existingEnis, expandedGroup, group, instance, instanceGroup, linkedEnis, linkedInstances, lonelyEnis, lonelyInstances, pairGroup, subnetChildren, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
      group = CanvasViewLayoutHelpers.DefaultGroupMethod.call(this, children);
      instanceGroup = null;
      eniGroup = null;
      asgGroup = null;
      expandedGroup = null;
      subnetChildren = [];
      for (_i = 0, _len = group.length; _i < _len; _i++) {
        ch = group[_i];
        if (ch.type === "AWS.VPC.NetworkInterface_group") {
          eniGroup = ch;
        } else if (ch.type === "AWS.EC2.Instance_group") {
          instanceGroup = ch;
        } else if (ch.type === "ExpandedAsg_group") {
          expandedGroup = ch;
        } else if (ch.type === "AWS.AutoScaling.Group_group") {
          asgGroup = ch;
        } else {
          subnetChildren.push(ch);
        }
      }
      if (expandedGroup) {
        if (asgGroup) {
          asgGroup.children = asgGroup.children.concat(expandedGroup.children);
        } else {
          expandedGroup.type = "AWS.AutoScaling.Group_group";
          asgGroup = expandedGroup;
        }
      }
      if (asgGroup) {
        subnetChildren.unshift(asgGroup);
      }
      if (instanceGroup && eniGroup) {
        linkedInstances = {};
        linkedEnis = {};
        pairGroup = [];
        existingEnis = {};
        _ref = eniGroup.children;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          eni = _ref[_j];
          existingEnis[eni.component.id] = eni;
        }
        lonelyInstances = [];
        lonelyEnis = [];
        _ref1 = instanceGroup.children;
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          instance = _ref1[_k];
          enis = instance.component.connectionTargets("EniAttachment");
          if (!enis.length) {
            lonelyInstances.push(instance);
          } else {
            eniInstanceG = [instance];
            linkedInstances[instance.component.id] = true;
            for (_l = 0, _len3 = enis.length; _l < _len3; _l++) {
              eni = enis[_l];
              linkedEnis[eni.id] = true;
              eniInstanceG.push(existingEnis[eni.id]);
            }
            pairGroup.push({
              type: "AmiEniPair",
              children: eniInstanceG
            });
          }
        }
        _ref2 = eniGroup.children;
        for (_m = 0, _len4 = _ref2.length; _m < _len4; _m++) {
          eni = _ref2[_m];
          if (!linkedEnis[eni.component.id]) {
            lonelyEnis.push(eni);
          }
        }
        __sortInstance(lonelyInstances);
        subnetChildren.push({
          type: "AWS.EC2.Instance_group",
          children: lonelyInstances
        });
        subnetChildren.push({
          type: "AmiEniPari_group",
          children: pairGroup
        });
        subnetChildren.push({
          type: "AWS.VPC.NetworkInterface_group",
          children: lonelyEnis
        });
        return subnetChildren;
      } else {
        if (instanceGroup) {
          __sortInstance(instanceGroup.children);
          subnetChildren.push(instanceGroup);
        }
        if (eniGroup) {
          subnetChildren.push(eniGroup);
        }
        return subnetChildren;
      }
    };
    GroupMForDbSubnet = function(children) {
      var ch, id, lonelyMasters, lonelySlaves, master, masterSlave, masters, msGroup, normalGroup, _i, _j, _len, _len1;
      msGroup = [];
      normalGroup = [];
      masters = {};
      lonelySlaves = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.component.slaves().length) {
          masters[ch.component.id] = [ch];
        }
      }
      for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
        ch = children[_j];
        master = ch.component.master();
        if (master) {
          if (masters[master.id]) {
            masters[master.id].push(ch);
          } else {
            lonelySlaves.push(ch);
          }
        } else if (!masters[ch.component.id]) {
          normalGroup.push(ch);
        }
      }
      lonelyMasters = [];
      for (id in masters) {
        masterSlave = masters[id];
        if (masterSlave.length === 1) {
          lonelyMasters.push(masterSlave[0]);
        } else {
          msGroup.push({
            type: "MasterSlave",
            children: masterSlave
          });
        }
      }
      if (lonelyMasters.length) {
        msGroup.push({
          type: "MasterSlave",
          children: lonelyMasters
        });
      }
      ch = [];
      if (msGroup.length) {
        ch.push({
          type: "MasterSlave_group",
          children: msGroup
        });
      }
      if (lonelySlaves.length) {
        ch.push({
          type: "AWS.RDS.DBInstance_group",
          children: lonelySlaves
        });
      }
      if (normalGroup.length) {
        ch.push({
          type: "AWS.RDS.DBInstance_group",
          children: normalGroup
        });
      }
      return ch;
    };
    ArrangeForAzs = function(children) {
      var ch1, ch2, i, x1, x2, y2;
      if (!children.length) {
        return {
          width: 0,
          height: 0
        };
      }
      if (children.length === 1) {
        return {
          width: children[0].width,
          height: children[0].height
        };
      }
      children.sort(function(a, b) {
        return b.height - a.height;
      });
      i = 0;
      while (i < children.length) {
        ch1 = children[i];
        ch2 = children[i + 1];
        if (ch2 && ch2.width * ch2.height > ch1.width * ch1.height) {
          children[i] = ch2;
          children[i + 1] = ch1;
        }
        i += 2;
      }
      y2 = children[0].height + 15;
      x1 = 0;
      x2 = 0;
      i = 0;
      while (i < children.length) {
        ch1 = children[i];
        ch2 = children[i + 1];
        ch1.y = 0;
        if (ch2) {
          ch1.x = x1;
          x1 += ch1.width + 4;
          ch2.x = x2;
          ch2.y = y2;
          x2 += ch2.width + 4;
        } else {
          if (x1 > x2) {
            ch1.x = x2;
            ch1.y = y2;
            x2 += ch1.width + 4;
          } else {
            ch1.x = x1;
            ch1.y = 0;
            x1 += ch1.width + 4;
          }
        }
        i += 2;
      }
      return {
        width: Math.max(x1, x2) - 4,
        height: children[1].height + y2
      };
    };
    ArrangeForVpc = function(children) {
      var baseX, baseY, ch, childMap, def, elbBaseY, h, height, subnetGroupBaseX, w, width, _i, _j, _len, _len1;
      def = AutoLayoutConfig[constant.RESTYPE.VPC];
      childMap = {};
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        childMap[ch.type] = ch;
      }
      baseX = childMap["AWS.ELB_group"] ? 18 : 5;
      baseY = 4;
      subnetGroupBaseX = baseX;
      ch = childMap["AWS.VPC.RouteTable_group"];
      if (ch) {
        ch.x = baseX;
        ch.y = baseY;
        baseY += ch.height + 3;
      }
      elbBaseY = baseY;
      ch = childMap["AWS.EC2.AvailabilityZone_group"];
      if (ch) {
        ch.x = baseX;
        ch.y = baseY;
        subnetGroupBaseX = baseX + ch.width + 4;
        elbBaseY += ch.children[0].y + ch.children[0].height + 3;
      }
      ch = childMap["AWS.ELB_group"];
      if (ch) {
        ch.x = 5;
        ch.y = elbBaseY;
        if (ch.x + ch.width > subnetGroupBaseX) {
          subnetGroupBaseX = ch.x + ch.width + 4;
        }
      }
      ch = childMap["AWS.RDS.DBSubnetGroup_group"];
      if (ch) {
        ch.x = subnetGroupBaseX;
        ch.y = baseY;
      }
      width = 0;
      height = 0;
      for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
        ch = children[_j];
        w = ch.x + ch.width;
        if (w > width) {
          width = w;
        }
        h = ch.y + ch.height;
        if (h > height) {
          height = h;
        }
      }
      return {
        width: width + 5,
        height: height + 4
      };
    };
    ArrangeForSvg = function(children) {
      var ch, newChs, _i, _len;
      newChs = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.type === "AWS.VPC.VPC_group") {
          newChs.unshift(ch);
        } else {
          newChs.push(ch);
        }
      }
      return CanvasViewLayoutHelpers.DefaultArrangeMethod.call(this, newChs);
    };
    SortForVpc = function(children) {

      /*
       * 1. Main Rtb should be before other RTB.
       * 2. Internet Elb should be before internal Elb
       * 3. Connected Elb should be before none connected Elb
       */
      var ExternalElbs, InternalElbs, ch, col, otherChildren, _i, _len;
      ExternalElbs = [];
      InternalElbs = [];
      otherChildren = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.type === constant.RESTYPE.RT) {
          if (ch.get("main")) {
            otherChildren.unshift(ch);
            continue;
          }
        }
        if (ch.type === constant.RESTYPE.ELB) {
          col = ch.get("internal") ? InternalElbs : ExternalElbs;
          if (ch.connections("ElbAmiAsso").length) {
            col.unshift(ch);
          } else {
            col.push(ch);
          }
          continue;
        }
        otherChildren.push(ch);
      }
      return otherChildren.concat(ExternalElbs, InternalElbs);
    };
    AutoLayoutConfig = AwsCanvasView.prototype.autoLayoutConfig = {
      "SVG": {
        arrangeMethod: ArrangeForSvg,
        space: 6
      },
      "AWS.VPC.CustomerGateway_group": {
        arrangeMethod: "ArrangeVertical",
        space: 2
      },
      "AWS.VPC.VPC": {
        arrangeMethod: ArrangeForVpc,
        space: 4,
        sortMethod: SortForVpc,
        margin: 2,
        width: 60,
        height: 60
      },
      "AWS.VPC.VPNGateway": {
        sticky: true
      },
      "AWS.VPC.InternetGateway": {
        sticky: true
      },
      "AWS.ELB_group": {
        space: 11
      },
      "AWS.ELB": {
        width: 9,
        height: 9
      },
      "AWS.VPC.RouteTable_group": {
        space: 4
      },
      "AWS.VPC.RouteTable": {
        width: 9,
        height: 9
      },
      "AWS.EC2.AvailabilityZone_group": {
        arrangeMethod: ArrangeForAzs
      },
      "AWS.EC2.AvailabilityZone": {
        margin: 2,
        width: 15,
        height: 15
      },
      "AWS.RDS.DBSubnetGroup_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 4
      },
      "AWS.RDS.DBSubnetGroup": {
        groupMethod: GroupMForDbSubnet,
        margin: 2,
        space: 3,
        width: 11,
        height: 11
      },
      "AWS.RDS.DBInstance": {
        width: 9,
        height: 9
      },
      "AWS.RDS.DBInstance_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "MasterSlave": {
        arrangeMethod: "ArrangeVertical",
        space: 2
      },
      "MasterSlave_group": {
        space: 1
      },
      "AWS.AutoScaling.LaunchConfiguration": {
        ignore: true
      },
      "AWS.VPC.NetworkInterface_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 4
      },
      "AWS.VPC.NetworkInterface": {
        width: 9,
        height: 9
      },
      "AWS.EC2.Instance_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "AWS.EC2.Instance": {
        width: 9,
        height: 9
      },
      "AWS.AutoScaling.Group_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "AWS.AutoScaling.Group": {
        width: 13,
        height: 13
      },
      "ExpandedAsg": {
        width: 13,
        height: 13
      },
      "AWS.VPC.Subnet_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "AWS.VPC.Subnet": {
        groupMethod: GroupMForSubnet,
        margin: 2,
        space: 2,
        width: 13,
        height: 13
      },
      "AWS.VPC.CustomerGateway": {
        width: 17,
        height: 10
      },
      "AmiEniPair": {
        space: 1
      },
      "AmiEniPari_group": {
        arrangeMethod: "ArrangeVertical",
        space: 1
      }
    };
    return null;
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeVpc',["./CanvasElement", "constant", "./CanvasManager", "./CanvasView"], function(CanvasElement, constant, CanvasManager, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.VPC,
      parentType: ["SVG"],
      listenModelEvents: function() {
        this.listenTo(this.model, "change:cidr", this.render);
      },
      create: function() {
        return this.canvas.appendVpc(this.createGroup());
      },
      siblings: function() {
        var canvas;
        canvas = this.canvas;
        return canvas.design.componentsOfType(constant.RESTYPE.CGW).map(function(m) {
          return canvas.getItem(m.id);
        });
      },
      label: function() {
        return "" + (this.model.get('name')) + " (" + (this.model.get('cidr')) + ")";
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeAz',["./CanvasElement", "constant", "./CanvasManager", "./CanvasView"], function(CanvasElement, constant, CanvasManager, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                      env:dev:end */
      type: constant.RESTYPE.AZ,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [23, 23],
      create: function() {
        return this.canvas.appendAz(this.createGroup());
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.update(this.$el.children("text"), m.get("name"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      }
    }, {
      createResource: function(type, attr, option) {
        var azModel;
        attr.width = 21;
        attr.height = 21;
        azModel = CanvasElement.createResource(type, attr, option);
        return CanvasElement.createResource(constant.RESTYPE.SUBNET, {
          x: attr.x + 2,
          y: attr.y + 2,
          width: attr.width - 4,
          height: attr.height - 4,
          parent: azModel
        }, option);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeSubnet',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "./CanvasView"], function(CanvasElement, constant, CanvasManager, lang, CanvasView) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: constant.RESTYPE.SUBNET,
      parentType: [constant.RESTYPE.AZ],
      defaultSize: [19, 19],
      portPosition: function(portName, isAtomic) {
        var m, portY, x;
        m = this.model;
        portY = m.height() * CanvasView.GRID_HEIGHT / 2 - 5;
        if (portName === "subnet-assoc-in") {
          return [-12, portY, CanvasElement.constant.PORT_LEFT_ANGLE];
        } else {
          x = m.width() * CanvasView.GRID_WIDTH + 4;
          if (isAtomic) {
            x += 8;
          }
          return [x, portY, CanvasElement.constant.PORT_RIGHT_ANGLE];
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:cidr", this.render);
      },
      create: function() {
        var m, svg, svgEl;
        svg = this.canvas.svg;
        svgEl = this.canvas.appendSubnet(this.createGroup());
        svgEl.add([
          svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'subnet-assoc-in',
            'data-tooltip': lang.ide.PORT_TIP_L
          }), svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'subnet-assoc-out',
            'data-tooltip': lang.ide.PORT_TIP_M
          })
        ]);
        m = this.model;
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      label: function() {
        return "" + (this.model.get('name')) + " (" + (this.model.get('cidr')) + ")";
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        return this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
      },
      containPoint: function(px, py) {
        var size, x, y;
        x = this.model.x() - 2;
        y = this.model.y();
        size = this.size();
        return x <= px && y <= py && x + size.width + 4 >= px && y + size.height >= py;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeRtb',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.RT,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [8, 8],
      portPosMap: {
        "rtb-tgt-left": [10, 35, CanvasElement.constant.PORT_LEFT_ANGLE, 8, 35],
        "rtb-tgt-right": [70, 35, CanvasElement.constant.PORT_RIGHT_ANGLE, 72, 35],
        "rtb-src-top": [40, 3, CanvasElement.constant.PORT_UP_ANGLE],
        "rtb-src-bottom": [40, 77, CanvasElement.constant.PORT_DOWN_ANGLE]
      },
      portDirMap: {
        "rtb-tgt": "horizontal",
        "rtb-src": "vertical"
      },
      iconUrl: function() {
        if (this.model.get("main")) {
          return "ide/icon/cvs-rtb-main.png";
        } else {
          return "ide/icon/cvs-rtb.png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:main", this.render);
      },
      create: function() {
        var m, node, svg;
        m = this.model;
        svg = this.canvas.svg;
        node = this.createNode({
          image: this.iconUrl(),
          imageX: 10,
          imageY: 13,
          imageW: 60,
          imageH: 57
        }).add([
          svg.text("").move(41, 27).classes('node-label'), svg.use("port_left").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'rtb-tgt',
            'data-alias': 'rtb-tgt-left',
            'data-tooltip': lang.ide.PORT_TIP_B
          }), svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'rtb-tgt',
            'data-alias': 'rtb-tgt-right',
            'data-tooltip': lang.ide.PORT_TIP_B
          }), svg.use("port_bottom").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'rtb-src',
            'data-alias': 'rtb-src-top',
            'data-tooltip': lang.ide.PORT_TIP_A
          }), svg.use("port_top").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'rtb-src',
            'data-alias': 'rtb-src-bottom',
            'data-tooltip': lang.ide.PORT_TIP_A
          })
        ]);
        this.canvas.appendNode(node);
        this.initNode(node, m.x(), m.y());
        return node;
      },
      labelWidth: function(width) {
        return CanvasElement.prototype.labelWidth.call(this, width) - 20;
      },
      render: function() {
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        return CanvasManager.update(this.$el.children("image"), this.iconUrl(), "href");
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeIgw',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "Design", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, Design, CloudResources) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.IGW,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [8, 8],
      portPosMap: {
        "igw-tgt": [78, 35, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      sticky: "left",
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cvs-igw.png",
          imageX: 10,
          imageY: 16,
          imageW: 60,
          imageH: 46,
          label: m.get("name")
        }).add(svg.use("port_left").attr({
          'class': 'port port-blue tooltip',
          'data-name': 'igw-tgt',
          'data-tooltip': lang.ide.PORT_TIP_C
        }));
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeVgw',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, CloudResources) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.VGW,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [8, 8],
      portPosMap: {
        "vgw-tgt": [3, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
        "vgw-vpn": [70, 35, CanvasElement.constant.PORT_RIGHT_ANGLE, 72, 35]
      },
      sticky: "right",
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cvs-vgw.png",
          imageX: 10,
          imageY: 16,
          imageW: 60,
          imageH: 46,
          label: m.get("name")
        }).add([
          svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'vgw-tgt',
            'data-tooltip': lang.ide.PORT_TIP_C
          }), svg.use("port_right").attr({
            'class': 'port port-purple tooltip',
            'data-name': 'vgw-vpn',
            'data-tooltip': lang.ide.PORT_TIP_H
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      }
    }, {
      createResource: function(type, attr, option) {
        var vpc;
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).theVPC();
        attr.x = vpc.x() + vpc.width() - 4;
        if (attr.y < vpc.y() || attr.y + 8 > vpc.y() + vpc.height()) {
          attr.y = vpc.y() + Math.round(vpc.height() / 2) - 4;
        }
        attr.parent = vpc;
        return CanvasElement.createResource(type, attr, option);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeCgw',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, CloudResources) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.CGW,
      parentType: ["SVG"],
      defaultSize: [17, 10],
      portPosMap: {
        "cgw-vpn": [6, 45, CanvasElement.constant.PORT_LEFT_ANGLE]
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cvs-cgw.png",
          imageX: 13,
          imageY: 8,
          imageW: 151,
          imageH: 76
        }).add([
          svg.text("").move(90, 95).classes('node-label'), svg.use("port_right").attr({
            'class': 'port port-purple tooltip',
            'data-name': 'cgw-vpn',
            'data-tooltip': lang.ide.PORT_TIP_I
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      labelWidth: function(width) {
        return CanvasElement.prototype.labelWidth.call(this, width) - 4;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children(".node-label"));
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeElb',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.ELB,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [9, 9],
      portPosMap: {
        "elb-sg-in": [2, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
        "elb-assoc": [79, 50, CanvasElement.constant.PORT_RIGHT_ANGLE, 81, 50],
        "elb-sg-out": [79, 20, CanvasElement.constant.PORT_RIGHT_ANGLE, 81, 20]
      },
      iconUrl: function() {
        if (this.model.get("internal")) {
          return "ide/icon/cvs-elb-int.png";
        } else {
          return "ide/icon/cvs-elb-ext.png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:internal", this.render);
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: this.iconUrl(),
          imageX: 9,
          imageY: 11,
          imageW: 70,
          imageH: 53,
          label: m.get("name"),
          sg: true
        }).add([
          svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'elb-sg-in',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-gray tooltip',
            'data-name': 'elb-assoc',
            'data-tooltip': lang.ide.PORT_TIP_K
          }), svg.use("port_right").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'elb-sg-out',
            'data-tooltip': lang.ide.PORT_TIP_J
          })
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var m;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children("image"), this.iconUrl(), "href");
        return CanvasManager.toggle(this.$el.children('[data-name="elb-sg-in"]'), m.get("internal"));
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CpInstance',["./CanvasPopup", "./TplPopup", "./CpVolume", "event", "constant", "CloudResources"], function(CanvasPopup, TplPopup, VolumePopup, ide_event, constant, CloudResources) {
    return CanvasPopup.extend({
      type: "InstancePopup",
      attachType: "overlay",
      className: "canvas-pp instance",
      events: {
        "click .instance-pph-close": "remove",
        "click li": "selectItem",
        "click .vpp-ins-vol": "showVolume"
      },
      initialize: function() {
        CanvasPopup.prototype.initialize.apply(this, arguments);
        this.selectItem({
          currentTarget: this.$el.find("li")[0]
        });
      },
      content: function() {
        return TplPopup.instance({
          name: this.host.get("name"),
          items: this.models || []
        });
      },
      selectItem: function(evt) {
        this.canvas.deselectItem(true);
        this.$el.find(".selected").removeClass("selected");
        ide_event.trigger(ide_event.OPEN_PROPERTY, constant.RESTYPE.INSTANCE, $(evt.currentTarget).addClass("selected").attr("data-id"));
        return false;
      },
      remove: function() {
        if (this.volPopup) {
          this.volPopup.remove();
        }
        return CanvasPopup.prototype.remove.apply(this, arguments);
      },
      showVolume: function(evt) {
        var $ins, bdm, ins, region, vol, volCln, vols, volumeId, _i, _len, _ref, _ref1;
        region = this.canvas.design.region();
        $ins = $(evt.currentTarget).closest(".vpp-instance");
        ins = CloudResources(constant.RESTYPE.INSTANCE, region).get($ins.attr("data-id"));
        if (!ins) {
          return;
        }
        ins = ins.attributes;
        volCln = CloudResources(constant.RESTYPE.VOL, region);
        vols = [];
        _ref = ins.blockDeviceMapping;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          bdm = _ref[_i];
          if (bdm.deviceName !== ins.rootDeviceName) {
            volumeId = (_ref1 = bdm.ebs) != null ? _ref1.volumeId : void 0;
            if (!volumeId) {
              continue;
            }
            vol = volCln.get(volumeId);
            if (!vol) {
              continue;
            }
            vols.push({
              id: vol.id,
              appId: vol.id,
              name: bdm.deviceName,
              snapshot: vol.get("snapshotId"),
              size: vol.get("size"),
              state: vol.get('state') || 'unknown'
            });
          }
        }
        this.volPopup = new VolumePopup({
          attachment: $ins[0],
          models: vols,
          canvas: this.canvas
        });
        return false;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CpEni',["./CpInstance", "./TplPopup", "event", "constant", "CloudResources"], function(InstancePopup, TplPopup, ide_event, constant, CloudResources) {
    return InstancePopup.extend({
      content: function() {
        return TplPopup.eni({
          name: this.host.get("name"),
          items: this.models || []
        });
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeEni',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "CloudResources", "./CpEni", "event"], function(CanvasElement, constant, CanvasManager, lang, CloudResources, EniPopup, ide_event) {
    return CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.ENI,
      parentType: [constant.RESTYPE.SUBNET],
      defaultSize: [9, 9],
      portPosMap: {
        "eni-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "eni-attach": [8, 50, CanvasElement.constant.PORT_LEFT_ANGLE],
        "eni-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "eni-rtb": [45, 2, CanvasElement.constant.PORT_UP_ANGLE]
      },
      portDirMap: {
        "eni-sg": "horizontal"
      },
      events: {
        "mousedown .eip-status": "toggleEip",
        "mousedown .server-number-group": "showGroup",
        "click .eip-status": function() {
          return false;
        }
      },
      iconUrl: function() {
        if (this.model.connections("EniAttachment").length) {
          return "ide/icon/cvs-eni-att.png";
        } else {
          return "ide/icon/cvs-eni-unatt.png";
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:connections", this.onConnectionChange);
        this.listenTo(this.model, "change:primaryEip", this.render);
        this.listenTo(this.canvas, "switchMode", this.render);
      },
      onConnectionChange: function(cn) {
        if (cn.type === "EniAttachment") {
          return this.render();
        }
      },
      toggleEip: function() {
        var toggle;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        toggle = !this.model.hasPrimaryEip();
        this.model.setPrimaryEip(toggle);
        if (toggle) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        CanvasManager.updateEip(this.$el.children(".eip-status"), this.model);
        ide_event.trigger(ide_event.PROPERTY_REFRESH_ENI_IP_LIST);
        return false;
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: this.iconUrl(),
          imageX: 16,
          imageY: 15,
          imageW: 59,
          imageH: 49,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image("", 12, 14).move(44, 37).classes('eip-status tooltip'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'eni-sg',
            'data-alias': 'eni-sg-left',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-green tooltip',
            'data-name': 'eni-attach',
            'data-tooltip': lang.ide.PORT_TIP_G
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'eni-sg',
            'data-alias': 'eni-sg-right',
            'data-tooltip': lang.ide.PORT_TIP_F
          }), svg.use("port_bottom").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'eni-rtb',
            'data-tooltip': lang.ide.PORT_TIP_C
          }), svg.group().add([svg.rect(20, 14).move(36, 2).radius(3).classes("server-number-bg"), svg.plain("0").move(46, 13).classes("server-number")]).classes("server-number-group")
        ]);
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var count, m, numberGroup;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children("image:not(.eip-status)"), this.iconUrl(), "href");
        count = m.serverGroupCount();
        numberGroup = this.$el.children(".server-number-group");
        CanvasManager.toggle(this.$el.children(".port-eni-rtb"), count <= 1);
        CanvasManager.toggle(numberGroup, count > 1);
        numberGroup.children("text").text(count);
        return CanvasManager.updateEip(this.$el.children(".eip-status"), m);
      },
      showGroup: function() {
        var eip, gm, idx, ins, insCln, m, members, name, _i, _len, _ref;
        if (!this.canvas.design.modeIsApp()) {
          return;
        }
        insCln = CloudResources(this.type, this.model.design().region());
        members = (this.model.groupMembers() || []).slice(0);
        members.unshift({
          appId: this.model.get("appId"),
          ips: this.model.get("ips")
        });
        name = this.model.get("name");
        gm = [];
        for (idx = _i = 0, _len = members.length; _i < _len; idx = ++_i) {
          m = members[idx];
          ins = insCln.get(m.appId);
          if (!ins) {
            console.warn("Cannot find eni of `" + m.appId + "`");
            continue;
          }
          ins = ins.attributes;
          eip = (m.ips || [])[0];
          gm.push({
            name: "" + name + "-" + idx,
            id: m.appId,
            eip: eip != null ? (_ref = eip.eipData) != null ? _ref.publicIp : void 0 : void 0
          });
        }
        new EniPopup({
          attachment: this.$el[0],
          host: this.model,
          models: gm,
          canvas: this.canvas
        });
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeInstance',["./CanvasElement", "constant", "./CanvasManager", "./CpVolume", "./CpInstance", "i18n!/nls/lang.js", "CloudResources", "event"], function(CanvasElement, constant, CanvasManager, VolumePopup, InstancePopup, lang, CloudResources, ide_event) {
    return CanvasElement.extend({

      /* env:dev                                            env:dev:end */
      type: constant.RESTYPE.INSTANCE,
      parentType: [constant.RESTYPE.AZ, constant.RESTYPE.SUBNET, constant.RESTYPE.ASG, "ExpandedAsg"],
      defaultSize: [9, 9],
      portPosMap: {
        "instance-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "instance-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "instance-attach": [78, 50, CanvasElement.constant.PORT_RIGHT_ANGLE, 80, 50],
        "instance-rtb": [45, 2, CanvasElement.constant.PORT_UP_ANGLE]
      },
      portDirMap: {
        "instance-sg": "horizontal"
      },
      events: {
        "mousedown .eip-status": "toggleEip",
        "mousedown .volume-image": "showVolume",
        "mousedown .server-number-group": "showGroup",
        "click .eip-status": "suppressEvent",
        "click .volume-image": "suppressEvent",
        "click .server-number-group": "suppressEvent"
      },
      suppressEvent: function() {
        return false;
      },
      iconUrl: function() {
        var ami, instance, m, url;
        ami = this.model.getAmi() || this.model.get("cachedAmi");
        if (!ami) {
          m = this.model;
          instance = CloudResources(m.type, m.design().region()).get(m.get("appId"));
          if (instance) {
            instance = instance.attributes;
            if (instance.platform && instance.platform === "windows") {
              url = "ide/ami/windows." + instance.architecture + "." + instance.rootDeviceType + ".png";
            } else {
              url = "ide/ami/linux-other." + instance.architecture + "." + instance.rootDeviceType + ".png";
            }
          } else {
            url = "ide/ami/ami-not-available.png";
          }
        } else {
          url = "ide/ami/" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
        }
        return url;
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:primaryEip", this.render);
        this.listenTo(this.model, "change:imageId", this.render);
        this.listenTo(this.model, "change:volumeList", this.render);
        this.listenTo(this.model, "change:count", this.updateServerCount);
        this.listenTo(this.canvas, "switchMode", this.render);
        this.listenTo(this.canvas, "change:externalData", this.render);
      },
      updateServerCount: function() {
        var eni, _i, _len, _ref, _ref1;
        this.render();
        _ref = this.model.connectionTargets("EniAttachment");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          eni = _ref[_i];
          if ((_ref1 = this.canvas.getItem(eni.id)) != null) {
            _ref1.render();
          }
        }
      },
      toggleEip: function() {
        var toggle;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        toggle = !this.model.hasPrimaryEip();
        this.model.setPrimaryEip(toggle);
        if (toggle) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        CanvasManager.updateEip(this.$el.children(".eip-status"), this.model);
        ide_event.trigger(ide_event.PROPERTY_REFRESH_ENI_IP_LIST);
        return false;
      },
      select: function(selectedDomElement) {
        var type;
        type = this.type;
        if (this.model.get("appId") && this.canvas.design.modeIsAppEdit()) {
          type = "component_server_group";
        }
        ide_event.trigger(ide_event.OPEN_PROPERTY, type, this.model.id);
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cvs-instance.png",
          imageX: 15,
          imageY: 11,
          imageW: 61,
          imageH: 62,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image(MC.IMG_URL + this.iconUrl(), 39, 27).move(27, 15).classes("ami-image"), svg.image(MC.IMG_URL + "ide/icon/icn-vol.png", 29, 24).move(21, 46).classes('volume-image'), svg.text("").move(35, 58).classes('volume-number'), svg.image("", 12, 14).move(53, 49).classes('eip-status tooltip'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'instance-sg',
            'data-alias': 'instance-sg-left',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_right").attr({
            'class': 'port port-green tooltip',
            'data-name': 'instance-attach',
            'data-tooltip': lang.ide.PORT_TIP_E
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'instance-sg',
            'data-alias': 'instance-sg-right',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_bottom").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'instance-rtb',
            'data-tooltip': lang.ide.PORT_TIP_C
          }), svg.group().add([svg.rect(20, 14).move(36, 2).radius(3).classes("server-number-bg"), svg.plain("0").move(46, 13).classes("server-number")]).classes("server-number-group")
        ]);
        if (!this.model.design().modeIsStack() && m.get("appId")) {
          svgEl.add(svg.circle(8).move(63, 14).classes('res-state unknown'));
        }
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var instance, m, numberGroup, state, statusIcon, volumeCount;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children(".ami-image"), this.iconUrl(), "href");
        numberGroup = this.$el.children(".server-number-group");
        statusIcon = this.$el.children(".res-state");
        if (m.get("count") > 1) {
          CanvasManager.toggle(statusIcon, false);
          CanvasManager.toggle(numberGroup, true);
          CanvasManager.update(numberGroup.children("text"), m.get("count"));
        } else {
          CanvasManager.toggle(statusIcon, true);
          CanvasManager.toggle(numberGroup, false);
          if (statusIcon.length) {
            instance = CloudResources(m.type, m.design().region()).get(m.get("appId"));
            state = (instance != null ? instance.get("instanceState").name : void 0) || "unknown";
            statusIcon.data("tooltip", state).attr("data-tooltip", state).attr("class", "res-state tooltip " + state);
          }
        }
        CanvasManager.updateEip(this.$el.children(".eip-status"), m);
        volumeCount = m.get("volumeList") ? m.get("volumeList").length : 0;
        return CanvasManager.update(this.$el.children(".volume-number"), volumeCount);
      },
      showVolume: function() {
        var self;
        if (this.canvas.design.modeIsApp() && this.model.get("count") > 1) {
          return false;
        }
        if (this.volPopup) {
          return false;
        }
        self = this;
        this.volPopup = new VolumePopup({
          attachment: this.$el[0],
          host: this.model,
          models: this.model.get("volumeList"),
          canvas: this.canvas,
          onRemove: function() {
            return _.defer(function() {
              self.volPopup = null;
            });
          }
        });
        return false;
      },
      showGroup: function() {
        var bdm, gm, icon, idx, ins, insCln, m, members, name, volume, _i, _j, _len, _len1, _ref, _ref1;
        if (!this.canvas.design.modeIsApp()) {
          return;
        }
        insCln = CloudResources(this.type, this.model.design().region());
        members = (this.model.groupMembers() || []).slice(0);
        members.unshift({
          appId: this.model.get("appId")
        });
        name = this.model.get("name");
        gm = [];
        icon = this.iconUrl();
        for (idx = _i = 0, _len = members.length; _i < _len; idx = ++_i) {
          m = members[idx];
          ins = insCln.get(m.appId);
          if (!ins) {
            console.warn("Cannot find instance of `" + m.appId + "`");
            continue;
          }
          ins = ins.attributes;
          volume = ins.blockDeviceMapping.length;
          _ref = ins.blockDeviceMapping;
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            bdm = _ref[_j];
            if (bdm.deviceName === ins.rootDeviceName) {
              --volume;
              break;
            }
          }
          gm.push({
            name: "" + name + "-" + idx,
            id: m.appId,
            icon: icon,
            volume: volume,
            state: ((_ref1 = ins.instanceState) != null ? _ref1.name : void 0) || "unknown"
          });
        }
        new InstancePopup({
          attachment: this.$el[0],
          host: this.model,
          models: gm,
          canvas: this.canvas
        });
      }
    }, {
      isDirectParentType: function(t) {
        return t !== constant.RESTYPE.AZ;
      },
      createResource: function(type, attr, option) {
        var TYPE_LC;
        if (!attr.parent) {
          return;
        }
        switch (attr.parent.type) {
          case constant.RESTYPE.SUBNET:
            return CanvasElement.createResource(type, attr, option);
          case constant.RESTYPE.ASG:
          case "ExpandedAsg":
            TYPE_LC = constant.RESTYPE.LC;
            return CanvasElement.getClassByType(TYPE_LC).createResource(TYPE_LC, attr, option);
          case constant.RESTYPE.AZ:
            attr.parent = CanvasElement.createResource(constant.RESTYPE.SUBNET, {
              x: attr.x + 1,
              y: attr.y + 1,
              width: 11,
              height: 11,
              parent: attr.parent
            }, option);
            attr.x += 2;
            attr.y += 2;
            return CanvasElement.createResource(constant.RESTYPE.INSTANCE, attr, option);
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeAsg',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "./CanvasView"], function(CanvasElement, constant, CanvasManager, lang, CanvasView) {
    var CeAsg;
    CeAsg = CanvasElement.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.ASG,
      parentType: [constant.RESTYPE.SUBNET],
      defaultSize: [15, 15],
      events: {
        "mousedown .asg-dragger": "dragExpand"
      },
      isGroup: function() {
        return true;
      },
      size: function() {
        return {
          width: 13,
          height: 13
        };
      },
      dragExpand: function(evt) {
        if (!this.canvas.design.modeIsApp()) {
          this.canvas.dragItem(evt, {
            onDrop: this.onDropExpand
          });
        }
        return false;
      },
      onDropExpand: function(evt, dataTransfer) {
        var ExpandedAsgModel, item, originalAsg, res, target;
        item = dataTransfer.item;
        originalAsg = item.model;
        if (originalAsg.type === "ExpandedAsg") {
          originalAsg = originalAsg.get("originalAsg");
        }
        target = dataTransfer.parent.model;
        ExpandedAsgModel = Design.modelClassForType("ExpandedAsg");
        res = new ExpandedAsgModel({
          x: dataTransfer.x,
          y: dataTransfer.y,
          parent: target,
          originalAsg: originalAsg
        });
        if (res && res.id) {
          return;
        }
        notification('error', sprintf(lang.ide.CVS_MSG_ERR_DROP_ASG, originalAsg.get("name"), target.parent().get("name")));
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = svg.group().add([svg.rect(129, 129).move(1, 1).radius(5).classes("asg-group"), svg.use("asg_frame", true).classes("asg-frame"), svg.use("asg_prompt", true).classes("asg-prompt"), svg.use("asg_dragger").classes("asg-dragger tooltip").attr("data-tooltip", 'Expand the group by drag-and-drop in other availability zone.'), svg.plain("").move(4, 14).classes('group-label')]).attr({
          "data-id": this.cid
        }).classes('canvasel ' + this.type.split(".").join("-"));
        this.canvas.appendAsg(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      getLc: function() {
        return this.model.getLc();
      },
      labelWidth: function(width) {
        return (width || this.size().width * CanvasView.GRID_WIDTH) - 22;
      },
      render: function() {
        return CanvasManager.setLabel(this, this.$el.children("text"));
      },
      updateConnections: function() {
        var cn, lc, _i, _len, _ref;
        lc = this.model.getLc();
        if (!lc) {
          return;
        }
        _ref = this.canvas.getItem(lc.id).connections();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          cn.update();
        }
      },
      destroy: function(selectedDomElement) {
        var substitute, x, y;
        substitute = this.model.get("expandedList");
        if (substitute && substitute[0]) {
          substitute = substitute[0];
          substitute.parent().addChild(this.model);
          x = substitute.get("x");
          y = substitute.get("y");
          substitute.remove();
          this.moveBy(x - this.model.get("x"), y - this.model.get("y"));
          this.model.set({
            x: x,
            y: y
          });
          return;
        }
        return CanvasElement.prototype.destroy.apply(this, arguments);
      }
    }, {
      createResource: function(type, attr, option) {
        var asgModel, lcId;
        if (attr.lcId) {
          lcId = attr.lcId;
          delete attr.lcId;
        }
        attr.x += 1;
        attr.y += 1;
        asgModel = CanvasElement.createResource(type, attr, option);
        asgModel.setLc(lcId);
        return asgModel;
      }
    });
    CeAsg.extend({

      /* env:dev                                               env:dev:end */
      type: "ExpandedAsg",
      render: function() {
        return CanvasManager.update(this.$el.children("text"), this.model.get("originalAsg").get("name"));
      }
    });
    return CeAsg;
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeLc',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "./CpVolume", "./CpInstance", "CloudResources"], function(CanvasElement, constant, CanvasManager, lang, VolumePopup, InstancePopup, CloudResources) {
    return CanvasElement.extend({

      /* env:dev                                      env:dev:end */
      type: constant.RESTYPE.LC,
      portPosMap: {
        "launchconfig-sg-left": [10, 20, CanvasElement.constant.PORT_LEFT_ANGLE],
        "launchconfig-sg-right": [80, 20, CanvasElement.constant.PORT_RIGHT_ANGLE]
      },
      portDirMap: {
        "launchconfig-sg": "horizontal"
      },
      defaultSize: [9, 9],
      events: {
        "mousedown .server-number-group": "showGroup",
        "mousedown .volume-image": "showVolume",
        "click .volume-image": "suppressEvent",
        "click .server-number-group": "suppressEvent"
      },
      suppressEvent: function() {
        return false;
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:connections", this.render);
        this.listenTo(this.model, "change:volumeList", this.render);
        this.listenTo(this.model, "change:imageId", this.render);
        this.listenTo(this.canvas, "switchMode", this.render);
        this.listenTo(this.model, "change:expandedList", function() {
          var self;
          self = this;
          return setTimeout(function() {
            return self.render();
          }, 0);
        });
      },
      iconUrl: function() {
        var ami;
        ami = this.model.getAmi() || this.model.get("cachedAmi");
        if (!ami) {
          return "ide/ami/ami-not-available.png";
        } else {
          return "ide/ami/" + ami.osType + "." + ami.architecture + "." + ami.rootDeviceType + ".png";
        }
      },
      pos: function(el) {
        var p, parentItem;
        if (el) {
          parentItem = this.canvas.getItem(el.parentNode.getAttribute("data-id"));
        } else {
          console.warn("Accessing LC' position without svg element");
          parentItem = parentItem = this.canvas.getItem(this.model.connectionTargets("LcUsage")[0].id);
        }
        if (parentItem) {
          p = parentItem.pos();
          p.x += 2;
          p.y += 3;
          return p;
        } else {
          return {
            x: 0,
            y: 0
          };
        }
      },
      isTopLevel: function() {
        return false;
      },
      ensureLcView: function() {
        var asg, elementChanged, expanded, isOriginalAsg, lcParentMap, parentCid, parentItem, parentModel, subview, svg, svgEl, uid, views, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2;
        elementChanged = false;
        lcParentMap = {};
        _ref = this.model.connectionTargets("LcUsage");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asg = _ref[_i];
          lcParentMap[asg.id] = asg;
          _ref1 = asg.get("expandedList");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            expanded = _ref1[_j];
            lcParentMap[expanded.id] = expanded;
          }
        }
        views = [];
        _ref2 = this.$el;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          subview = _ref2[_k];
          views.push(subview);
        }
        for (_l = 0, _len3 = views.length; _l < _len3; _l++) {
          subview = views[_l];
          parentCid = $(subview.parentNode).attr("data-id");
          parentItem = this.canvas.getItem(parentCid);
          if (!parentItem) {
            this.removeView(subview);
            elementChanged = true;
          } else {
            parentModel = parentItem.model;
            if (!lcParentMap[parentModel.id]) {
              this.removeView(subview);
              elementChanged = true;
            } else {
              delete lcParentMap[parentModel.id];
            }
          }
        }
        svg = this.canvas.svg;
        for (uid in lcParentMap) {
          parentModel = lcParentMap[uid];
          isOriginalAsg = parentModel.type !== "ExpandedAsg";
          svgEl = this.createNode({
            image: "ide/icon/cvs-instance.png",
            imageX: 15,
            imageY: 11,
            imageW: 61,
            imageH: 62,
            label: true,
            labelBg: true,
            sg: isOriginalAsg
          }).add([
            svg.image(MC.IMG_URL + this.iconUrl(), 39, 27).move(27, 15).classes("ami-image"), svg.use("port_diamond").move(10, 20).attr({
              'class': 'port port-blue tooltip',
              'data-name': 'launchconfig-sg',
              'data-alias': 'launchconfig-sg-left',
              'data-tooltip': lang.ide.PORT_TIP_D
            }), svg.use("port_diamond").move(80, 20).attr({
              'class': 'port port-blue tooltip',
              'data-name': 'launchconfig-sg',
              'data-alias': 'launchconfig-sg-right',
              'data-tooltip': lang.ide.PORT_TIP_D
            }), svg.image(MC.IMG_URL + "ide/icon/icn-vol.png", 29, 24).move(31, 46).classes('volume-image'), svg.plain("").move(45, 58).classes('volume-number'), svg.group().add([svg.rect(20, 14).move(36, 2).radius(3).classes("server-number-bg"), svg.plain("0").move(46, 13).classes("server-number")]).classes("server-number-group")
          ]).classes("canvasel fixed AWS-AutoScaling-LaunchConfiguration").move(20, 30);
          this.addView(svgEl);
          this.canvas.getItem(uid).$el.children().eq(0).after(svgEl.node);
          elementChanged = true;
        }
        if (elementChanged) {
          this.updateConnections();
        }
      },
      render: function(force) {
        var asg, asgCln, el, m, numberGroup, volumeCount, _i, _len, _ref, _ref1;
        if (this.canvas.initializing && !force) {
          return;
        }
        this.ensureLcView();
        m = this.model;
        CanvasManager.update(this.$el.children(".node-label"), m.get("name"));
        CanvasManager.update(this.$el.children(".ami-image"), this.iconUrl(), "href");
        volumeCount = m.get("volumeList") ? m.get("volumeList").length : 0;
        CanvasManager.update(this.$el.children(".volume-number"), volumeCount);
        this.$el.children(".server-number-group").hide();
        if (m.design().modeIsApp()) {
          this.$el.children(".server-number-group").show();
          asgCln = CloudResources(constant.RESTYPE.ASG, m.design().region());
          _ref = this.$el;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            el = _ref[_i];
            asg = this.canvas.getItem(el.parentNode.getAttribute("data-id")).model;
            asg = asgCln.get((asg.get("originalAsg") || asg).get("appId"));
            if (!asg) {
              continue;
            }
            asg = asg.attributes;
            if ((_ref1 = asg.Instances) != null ? _ref1.length : void 0) {
              numberGroup = $(el).children(".server-number-group").show();
              CanvasManager.update(numberGroup.children("text"), asg.Instances.length);
            }
          }
        }
      },
      destroy: function(selectedDomElement) {
        var LcUsage, parentItem, parentModel;
        if (this.model.connections("LcUsage").length > 1) {
          parentItem = this.canvas.getItem(selectedDomElement.parentNode.getAttribute("data-id"));
          if (!parentItem) {
            return;
          }
          LcUsage = Design.modelClassForType("LcUsage");
          parentModel = parentItem.model;
          if (parentModel.type === "ExpandedAsg") {
            parentModel = parentModel.get("originalAsg");
          }
          (new LcUsage(parentModel, this.model)).remove();
          return;
        }
        return CanvasElement.prototype.destroy.apply(this, arguments);
      },
      doDestroyModel: function() {
        var _ref;
        return (_ref = this.model.connections("LcUsage")[0]) != null ? _ref.remove() : void 0;
      },
      showVolume: function(evt) {
        var self;
        if (this.volPopup) {
          return false;
        }
        self = this;
        if (this.canvas.design.modeIsApp()) {
          return false;
        }
        this.volPopup = new VolumePopup({
          attachment: $(evt.currentTarget).closest("g")[0],
          host: this.model,
          models: this.model.get("volumeList"),
          canvas: this.canvas,
          onRemove: function() {
            return _.defer(function() {
              self.volPopup = null;
            });
          }
        });
        return false;
      },
      showGroup: function(evt) {
        var bdm, gm, icon, idx, ins, insCln, m, name, volume, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        insCln = CloudResources(constant.RESTYPE.INSTANCE, this.model.design().region());
        name = this.model.get("name");
        gm = [];
        icon = this.iconUrl();
        _ref = this.model.groupMembers();
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          m = _ref[idx];
          ins = insCln.get(m.appId);
          if (!ins) {
            console.warn("Cannot find instance of `" + m.appId + "`");
            continue;
          }
          ins = ins.attributes;
          volume = ins.blockDeviceMapping.length;
          _ref1 = ins.blockDeviceMapping;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            bdm = _ref1[_j];
            if (bdm.deviceName === ins.rootDeviceName) {
              --volume;
              break;
            }
          }
          gm.push({
            name: "" + name + "-" + idx,
            id: m.appId,
            icon: icon,
            volume: volume,
            state: ((_ref2 = ins.instanceState) != null ? _ref2.name : void 0) || "unknown"
          });
        }
        new InstancePopup({
          attachment: $(evt.currentTarget).closest(".canvasel")[0],
          host: this.model,
          models: gm,
          canvas: this.canvas
        });
      }
    }, {
      render: function(canvas) {
        var lc, _i, _len, _ref, _results;
        _ref = canvas.design.componentsOfType(constant.RESTYPE.LC);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lc = _ref[_i];
          _results.push(canvas.getItem(lc.id).render(true));
        }
        return _results;
      },
      createResource: function(t, attr, option) {
        var asg, lcModel;
        if (!attr.parent) {
          return;
        }
        if (attr.parent.getLc()) {
          return;
        }
        asg = attr.parent.get("originalAsg") || attr.parent;
        delete attr.parent;
        lcModel = CanvasElement.createResource(this.type, attr, option);
        asg.setLc(lcModel);
        return lcModel;
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeSgAsso',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js"], function(CanvasElement, constant, CanvasManager, lang) {
    return CanvasElement.extend({

      /* env:dev                                          env:dev:end */
      type: "SgAsso",
      initialize: function(options) {
        var canvas, self, toRenderTargetId;
        this.listenTo(this.model.getTarget(constant.RESTYPE.SG), "change:name", this.render);
        this.canvas = canvas = options.canvas;
        this.$el = $();
        if (!canvas.__sgAssoToRender) {
          canvas.__sgAssoToRender = {};
        }
        toRenderTargetId = this.model.getOtherTarget(constant.RESTYPE.SG).id;
        canvas.__sgAssoToRender[toRenderTargetId] = this.cid;
        self = this;
        _.defer(function() {
          var item, tgtAssoId;
          tgtAssoId = canvas.__sgAssoToRender[toRenderTargetId];
          delete canvas.__sgAssoToRender[toRenderTargetId];
          item = canvas.getItem(tgtAssoId);
          if (item) {
            item.render();
          }
        });
        CanvasElement.prototype.initialize.call(this, options);
      },
      remove: function() {
        this.render();
        this.stopListening();
      },
      update: function() {},
      render: function() {
        var childrens, i, m, res_node, resource, sg, sgs;
        if (this.canvas.initializing) {
          return;
        }
        m = this.model;
        resource = m.getOtherTarget(constant.RESTYPE.SG);
        res_node = this.canvas.getItem(resource.id);
        if (!res_node) {
          return;
        }
        sgs = m.sortedSgList();
        if (sgs.length > 5) {
          sgs.length = 5;
        }
        childrens = res_node.$el.children(".node-sg-color-group").children(":first-child");
        i = 0;
        while (i < 5) {
          sg = sgs[i];
          if (sg) {
            CanvasManager.update(childrens, sg.color, "color");
            CanvasManager.update(childrens, sg.get("name"), "tooltip");
          } else {
            CanvasManager.update(childrens, "none", "color");
            CanvasManager.update(childrens, "", "tooltip");
          }
          ++i;
          childrens = childrens.next();
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeLine',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "component/sgrule/SGRulePopup"], function(CanvasElement, constant, CanvasManager, lang, SGRulePopup) {
    var CeLine, LineMaskToClear, determineAngle, rotate, __determineAngle;
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

      /* env:dev                                        env:dev:end */
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
        this.canvas.appendLine(svgEl);
        return svgEl;
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
            itemCY: pos_from.y + size_from.height / 2 * 10
          },
          end: {
            x: port_to.pos[0],
            y: port_to.pos[1],
            angle: port_to.pos[2],
            type: connection.port2Comp().type,
            name: port_to.name,
            itemCX: pos_to.x + size_to.width / 2 * 10,
            itemCY: pos_to.y + size_to.height / 2 * 10
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
        this.__lastDir = start.y >= end.y ? 1 : -1;
        return MC.canvas._round_corner(MC.canvas.route2(start, end, this.lineStyle()));
      },
      lineStyle: function() {
        return this.canvas.lineStyle();
      },
      generateCurvePath: function(start, end) {
        var fliped, origin, originalEndAngle, point, result, _i, _j, _len, _len1;
        origin = {
          x: start.x,
          y: start.y
        };
        originalEndAngle = end.angle;
        start.x = start.y = 0;
        end.x -= origin.x;
        end.y -= origin.y;
        if (start.angle !== 0) {
          rotate(end, -start.angle);
          end.angle -= start.angle;
          if (end.angle < 0) {
            end.angle += 360;
          }
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
        }
        result = this["generateCurvePath" + end.angle](start, end);
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
        if (result.length === 3) {
          return "M" + origin.x + " " + origin.y + "C" + result[0].x + " " + result[0].y + " " + result[1].x + " " + result[1].y + " " + result[2].x + " " + result[2].y;
        } else {
          return "M" + origin.x + " " + origin.y + "L" + result[0].x + " " + result[0].y + "C" + result[1].x + " " + result[1].y + " " + result[2].x + " " + result[2].y + " " + result[3].x + " " + result[3].y + "L" + result[4].x + " " + result[4].y;
        }
      },
      generateCurvePath0: function(start, end) {
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
      generateCurvePath90: function(start, end) {
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
      generateCurvePath180: function(start, end) {
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
      generateCurvePath270: function(start, end) {
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
    CeLine.extend({

      /* env:dev                                                 env:dev:end */
      type: "EniAttachment"
    });
    CeLine.extend({

      /* env:dev                                           env:dev:end */
      type: "RTB_Asso"
    });
    CeLine.extend({

      /* env:dev                                            env:dev:end */
      type: "RTB_Route",
      lineStyle: function() {
        return 1;
      },
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = CeLine.prototype.createLine.call(this, pd);
        svgEl.add(svg.path(pd).classes("dash-line"));
        return svgEl;
      }
    });
    CeLine.extend({

      /* env:dev                                       env:dev:end */
      type: constant.RESTYPE.VPN
    });
    CeLine.extend({

      /* env:dev                                                 env:dev:end */
      type: "ElbSubnetAsso"
    });
    CeLine.extend({

      /* env:dev                                              env:dev:end */
      type: "ElbAmiAsso"
    }, {
      connect: function(LineClass, p1Comp, p2Comp) {
        new SGRulePopup(p1Comp, p2Comp);
        return new LineClass(p1Comp, p2Comp, void 0, {
          createByUser: true
        });
      }
    });
    CeLine.extend({

      /* env:dev                                                 env:dev:end */
      type: "DbReplication",
      select: function() {},
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = CeLine.prototype.createLine.call(this, pd);
        svgEl.add(svg.path(pd).classes("dash-line"));
        return svgEl;
      }
    });
    return CeLine;
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeSgLine',["./CeLine", "constant", "./CanvasManager", "i18n!/nls/lang.js", "component/sgrule/SGRulePopup"], function(CeLine, constant, CanvasManager, lang, SGRulePopup) {
    return CeLine.extend({

      /* env:dev                                          env:dev:end */
      type: "SgRuleLine",
      createLine: function(pd) {
        var svg, svgEl;
        svg = this.canvas.svg;
        svgEl = svg.group().add([svg.path(pd), svg.path(pd).classes("fill-line")]).attr({
          "data-id": this.cid
        }).classes("line " + this.type.replace(/\./g, "-"));
        this.canvas.appendSgline(svgEl);
        return svgEl;
      },
      renderConnection: function(item_from, item_to, element1, element2) {
        return CeLine.prototype.renderConnection.call(this, item_from, item_to, element1, element2);
      }
    }, {
      connect: function(LineClass, p1Comp, p2Comp) {
        new SGRulePopup(p1Comp, p2Comp);
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeDbInstance',["./CanvasElement", "constant", "./CanvasManager", "./CpVolume", "./CpInstance", "i18n!/nls/lang.js", "CloudResources", "component/dbsbgroup/DbSubnetGPopup"], function(CanvasElement, constant, CanvasManager, VolumePopup, InstancePopup, lang, CloudResources, DbSubnetGPopup) {
    return CanvasElement.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.DBINSTANCE,
      parentType: [constant.RESTYPE.DBSBG, constant.RESTYPE.VPC],
      defaultSize: [9, 9],
      portPosMap: {
        "db-sg-left": [10, 35, CanvasElement.constant.PORT_LEFT_ANGLE],
        "db-sg-right": [79, 35, CanvasElement.constant.PORT_RIGHT_ANGLE],
        "replica": [45, 45, CanvasElement.constant.PORT_DOWN_ANGLE]
      },
      portDirMap: {
        "db-sg": "horizontal"
      },
      portPosition: function(portName, isAtomic) {
        var p;
        p = this.portPosMap[portName];
        if (portName === "replica") {
          p = p.slice(0);
          if (this.model.master()) {
            p[1] = 45;
            p[2] = CanvasElement.constant.PORT_2D_V_ANGLE;
          } else {
            p[1] = 61;
            p[2] = CanvasElement.constant.PORT_DOWN_ANGLE;
          }
        }
        return p;
      },
      typeIcon: function() {
        return "ide/icon/icn-" + (this.model.category()) + ".png";
      },
      engineIcon: function() {
        return "ide/icon/rds-" + (this.model.get("engine") || "").split("-")[0] + ".png";
      },
      events: {
        "mousedown .dbreplicate": "replicate"
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:backupRetentionPeriod", this.render);
        this.listenTo(this.model, "change:connections", this.updateReplicaTip);
        this.listenTo(this.canvas, "change:externalData", this.updateState);
      },
      updateState: function() {
        var appData, m, state, stateIcon;
        m = this.model;
        stateIcon = this.$el.children(".res-state");
        if (stateIcon) {
          appData = CloudResources(m.type, m.design().region()).get(m.get("appId"));
          state = (appData != null ? appData.get("DBInstanceStatus") : void 0) || "unknown";
          return stateIcon.data("tooltip", state).attr("data-tooltip", state).attr("class", "res-state tooltip " + state);
        }
      },
      updateReplicaTip: function(cnn) {
        if (cnn.type === "DbReplication") {
          this.render();
        }
      },
      replicate: function(evt) {
        if (!this.canvas.design.modeIsApp() && this.model.slaves().length < 5) {
          this.canvas.dragItem(evt, {
            onDrop: this.onDropReplicate
          });
        }
        return false;
      },
      onDropReplicate: function(evt, dataTransfer) {
        var DbInstance, name, nameMatch, replica, targetSubnetGroup;
        targetSubnetGroup = dataTransfer.parent.model;
        if (targetSubnetGroup !== dataTransfer.item.model.parent()) {
          notification("error", "Read replica must be dropped in the same subnet group with source DB instance.");
          return;
        }
        name = dataTransfer.item.model.get("name");
        nameMatch = name.match(/(.+-replica)(\d*)$/);
        if (nameMatch) {
          name = nameMatch[1] + ((parseInt(nameMatch[2], 10) || 0) + 1);
        } else {
          name += "-replica";
        }
        DbInstance = Design.modelClassForType(constant.RESTYPE.DBINSTANCE);
        replica = new DbInstance({
          x: dataTransfer.x,
          y: dataTransfer.y,
          name: name,
          parent: targetSubnetGroup,
          sourceId: dataTransfer.item.model.id
        }, {
          master: dataTransfer.item.model
        });
        if (replica.id) {
          dataTransfer.item.canvas.selectItem(replica.id);
        }
      },
      create: function() {
        var m, svg, svgEl;
        m = this.model;
        svg = this.canvas.svg;
        svgEl = this.createNode({
          image: "ide/icon/cvs-rds.png",
          imageX: 14,
          imageY: 8,
          imageW: 62,
          imageH: 66,
          label: true,
          labelBg: true,
          sg: true
        }).add([
          svg.image(MC.IMG_URL + this.engineIcon(), 46, 33).move(22, 18).classes('engine-image'), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'db-sg',
            'data-alias': 'db-sg-left',
            'data-tooltip': lang.ide.PORT_TIP_D
          }), svg.use("port_diamond").attr({
            'class': 'port port-blue tooltip',
            'data-name': 'db-sg',
            'data-alias': 'db-sg-right',
            'data-tooltip': lang.ide.PORT_TIP_D
          })
        ]);
        if (this.model.get('engine') === constant.DB_ENGINE.MYSQL) {
          svgEl.add(svg.use("port_diamond").attr({
            'data-name': 'replica'
          }), 0);
          if (this.model.master()) {
            svgEl.add(svg.plain("REPLICA").move(45, 60).classes("replica-text"));
          } else {
            svgEl.add(svg.plain("MASTER").move(45, 60).classes("master-text"));
            svgEl.add(svg.use("replica_dragger").attr({
              "class": "dbreplicate tooltip"
            }));
          }
        }
        if (!m.design().modeIsStack() && m.get("appId")) {
          svgEl.add(svg.circle(8).move(63, 15).classes('res-state unknown'));
        }
        this.canvas.appendNode(svgEl);
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var $r, m, tip;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children(".node-label"));
        CanvasManager.update(this.$el.children(".type-image"), this.typeIcon(), "href");
        CanvasManager.update(this.$el.children(".engine-image"), this.engineIcon(), "href");
        CanvasManager.toggle(this.$el.children(".master-text"), m.design().modeIsApp() && m.slaves().length);
        if (m.get('engine') === constant.DB_ENGINE.MYSQL && m.category() !== 'replica') {
          $r = this.$el.children(".dbreplicate");
          CanvasManager.toggle($r, m.autobackup() !== 0);
          if (this.model.slaves().length < 5) {
            tip = "Drag to create a read replica.";
            CanvasManager.removeClass($r, "disabled");
          } else {
            tip = "Cannot create more read replica.";
            CanvasManager.addClass($r, "disabled");
          }
          CanvasManager.update($r, tip, "tooltip");
        }
        this.updateState();
      }
    }, {
      isDirectParentType: function(t) {
        return t !== constant.RESTYPE.VPC;
      },
      createResource: function(type, attr, option) {
        var _ref;
        if (!attr.parent) {
          return;
        }
        if (option && ((_ref = option.cloneSource) != null ? _ref.master() : void 0)) {
          if (option.cloneSource.master().slaves().length >= 5) {
            notification("error", "Cannot create more read replica.");
            return;
          } else {
            option.master = option.cloneSource.master();
            delete option.cloneSource;
          }
        }
        switch (attr.parent.type) {
          case constant.RESTYPE.DBSBG:
            return CanvasElement.createResource(type, attr, option);
          case constant.RESTYPE.VPC:
            attr.parent = CanvasElement.createResource(constant.RESTYPE.DBSBG, {
              x: attr.x + 1,
              y: attr.y + 1,
              width: 11,
              height: 11,
              parent: attr.parent
            }, option);
            if (!attr.parent.id) {
              notification("error", "Cannot create subnet group due to insufficient subnets.");
              return;
            }
            attr.x += 2;
            attr.y += 2;
            new DbSubnetGPopup({
              model: attr.parent
            });
            return CanvasElement.createResource(constant.RESTYPE.DBINSTANCE, attr, option);
        }
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CeDbSubnetGroup',["./CanvasElement", "constant", "./CanvasManager", "i18n!/nls/lang.js", "./CanvasView", "component/dbsbgroup/DbSubnetGPopup"], function(CanvasElement, constant, CanvasManager, lang, CanvasView, DbSubnetGPopup) {
    return CanvasElement.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.DBSBG,
      parentType: [constant.RESTYPE.VPC],
      defaultSize: [19, 19],
      events: {
        "mouseenter .tooltip": "hoverLabel",
        "mouseleave .tooltip": "hoverOutLabel"
      },
      hoverLabel: function(evt) {
        var item, subnet, _i, _len, _ref;
        _ref = this.model.connectionTargets("SubnetgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          item = this.canvas.getItem(subnet.id);
          if (item) {
            CanvasManager.addClass(item.$el, "highlight");
          }
        }
      },
      hoverOutLabel: function(evt) {
        var item, subnet, _i, _len, _ref;
        _ref = this.model.connectionTargets("SubnetgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          item = this.canvas.getItem(subnet.id);
          if (item) {
            CanvasManager.removeClass(item.$el, "highlight");
          }
        }
      },
      listenModelEvents: function() {
        this.listenTo(this.model, "change:connections", this.render);
      },
      labelWidth: function(width) {
        return (width || this.model.width() * CanvasView.GRID_WIDTH) - 20;
      },
      create: function() {
        var m, svg, svgEl;
        svg = this.canvas.svg;
        svgEl = this.canvas.appendSubnet(this.createGroup());
        svgEl.add([svg.use("sbg_info"), svg.rect(16, 14).move(4, 4).classes("tooltip")]);
        $(svgEl.node).children(".group-label").attr({
          "class": "tooltip group-label",
          x: "17",
          y: "14"
        });
        m = this.model;
        this.initNode(svgEl, m.x(), m.y());
        return svgEl;
      },
      render: function() {
        var m, sb, tt, _i, _len, _ref;
        m = this.model;
        CanvasManager.setLabel(this, this.$el.children("text"));
        this.$el[0].instance.move(m.x() * CanvasView.GRID_WIDTH, m.y() * CanvasView.GRID_WIDTH);
        tt = [];
        _ref = m.connectionTargets("SubnetgAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          tt.push(sb.get("name"));
        }
        CanvasManager.update(this.$el.children(".tooltip"), tt.join(", ") || "No subnet is assigned to this subnet group yet", "tooltip");
      },
      doDestroyModel: function() {
        this.hoverOut();
        return CanvasElement.prototype.doDestroyModel.apply(this, arguments);
      }
    }, {
      createResource: function(type, attr, option) {
        var model;
        if (!attr.parent) {
          return;
        }
        model = CanvasElement.createResource(constant.RESTYPE.DBSBG, attr, option);
        new DbSubnetGPopup({
          model: model
        });
      }
    });
  });

}).call(this);

(function() {
  define('workspaces/editor/canvas/CanvasBundle',["./CanvasManager", "./CanvasView", "./CanvasViewDnd", "./CanvasViewConnect", "./CanvasViewGResizer", "./CanvasViewLayout", "./CanvasViewAwsLayout", "./CeVpc", "./CeAz", "./CeSubnet", "./CeRtb", "./CeIgw", "./CeVgw", "./CeCgw", "./CeElb", "./CeEni", "./CeInstance", "./CeAsg", "./CeLc", "./CeSgAsso", "./CeLine", "./CeSgLine", "./CeDbInstance", "./CeDbSubnetGroup"], function(CanvasManager, CanvasView) {
    return CanvasView;
  });

}).call(this);

(function() {
  define('workspaces/editor/OpsViewBase',["./template/TplOpsEditor", "./subviews/PropertyPanel", "./subviews/Toolbar", "./subviews/ResourcePanel", "./subviews/Statusbar", "./canvas/CanvasViewAws", "UI.modalplus", "event", "./canvas/CanvasBundle", "backbone", "UI.selectbox"], function(OpsEditorTpl, PropertyPanel, Toolbar, ResourcePanel, Statusbar, CanvasView, Modal, ide_event) {

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
        case 83:

          /* S */
          if (evt.ctrlKey || evt.metaKey) {
            type = "Save";
          } else {
            type = "ShowStateEditor";
          }
          break;
        case 80:

          /* P */
          type = "ShowProperty";
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
        "click .HideOEPanelLeft": "toggleLeftPanel",
        "click .HideOEPanelRight": "toggleRightPanel"
      },
      constructor: function(options) {
        var opt;
        _.extend(this, options);
        this.setElement($(OpsEditorTpl.frame()).appendTo("#main").attr("data-ws", this.workspace.id).show()[0]);
        opt = {
          workspace: this.workspace,
          parent: this
        };
        this.toolbar = new Toolbar(opt);
        this.propertyPanel = new PropertyPanel(opt);
        this.resourcePanel = new ResourcePanel(opt);
        this.statusbar = new Statusbar(opt);
        this.canvas = new CanvasView(opt);
        this.initialize();
      },
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
        this.propertyPanel.backup();
        this.$el.attr("id", "");
      },
      recover: function() {
        this.$el.show().attr("id", "OpsEditor");
        this.resourcePanel.recalcAccordion();
        this.propertyPanel.recover();
      },
      remove: function() {
        this.toolbar.remove();
        this.propertyPanel.remove();
        this.resourcePanel.remove();
        this.statusbar.remove();
        this.canvas.remove();
        return Backbone.View.prototype.remove.call(this);
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
      showProperty: function() {
        ide_event.trigger(ide_event.FORCE_OPEN_PROPERTY);
      },
      showStateEditor: function() {
        var com;
        com = this.workspace.getSelectedComponent();
        if (com) {
          ide_event.trigger(ide_event.SHOW_STATE_EDITOR, com.id);
        }
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

      OpsEditorBase.prototype.url = function() {
        return this.opsModel.url();
      };

      OpsEditorBase.prototype.isWorkingOn = function(att) {
        return this.opsModel === att;
      };

      OpsEditorBase.prototype.viewClass = OpsEditorView;

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
        this.opsModel.fetchJsonData().then((function() {
          return s.jsonLoaded();
        }), (function(err) {
          return s.jsonLoadFailed(err);
        }));
        Workspace.apply(this, arguments);
      }

      OpsEditorBase.prototype.jsonLoadFailed = function(err) {
        if (this.isRemoved()) {
          return;
        }
        if (err.error === ApiRequest.Errors.MissingDataInServer) {
          return;
        }
        notification("error", "Failed to load data, please retry.");
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
        notification("error", "Failed to load aws data, please retry.");
        return this.remove();
      };

      OpsEditorBase.prototype.additionalDataLoaded = function() {
        if (this.isRemoved()) {
          return;
        }
        this.__hasAdditionalData = true;
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
      };

      OpsEditorBase.prototype.isInited = function() {
        return !!this.__inited;
      };

      OpsEditorBase.prototype.__initEditor = function() {
        this.__inited = true;
        this.design = new Design(this.opsModel);
        this.listenTo(this.design, "change:name", this.updateTab);
        this.view = new this.viewClass({
          workspace: this
        });
        this.initEditor();
        if (!this.opsModel.getThumbnail()) {
          this.saveThumbnail();
        }
        this.opsModel.__setJsonData(this.design.serialize());
      };

      OpsEditorBase.prototype.initEditor = function() {};

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

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define('workspaces/editor/OpsEditorStack',["./OpsEditorBase", "Design", "CloudResources", "constant"], function(OpsEditorBase, Design, CloudResources, constant) {

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

      StackEditor.prototype.isReady = function() {
        var region, stateModule;
        if (this.__hasAdditionalData) {
          return true;
        }
        if (!this.opsModel.hasJsonData() || !this.opsModel.isPersisted()) {
          return false;
        }
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return CloudResources(constant.RESTYPE.AZ, region).isReady() && CloudResources(constant.RESTYPE.SNAP, region).isReady() && CloudResources(constant.RESTYPE.DBENGINE, region).isReady() && CloudResources(constant.RESTYPE.DBOG, region).isReady() && CloudResources(constant.RESTYPE.DBSNAP, region).isReady() && CloudResources("QuickStartAmi", region).isReady() && CloudResources("MyAmi", region).isReady() && CloudResources("FavoriteAmi", region).isReady() && !!App.model.getStateModule(stateModule.repo, stateModule.tag) && this.hasAmiData();
      };

      StackEditor.prototype.fetchAdditionalData = function() {
        var jobs, region, stateModule;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        jobs = [App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.AZ, region).fetch(), CloudResources(constant.RESTYPE.SNAP, region).fetch(), CloudResources("QuickStartAmi", region).fetch(), CloudResources("MyAmi", region).fetch(), CloudResources("FavoriteAmi", region).fetch(), this.fetchAmiData(), this.fetchRdsData()];
        if (!this.opsModel.isPersisted()) {
          jobs.unshift(this.opsModel.save());
        }
        return Q.all(jobs);
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
            if (imageId && !cln.get(imageId) && !cln.isInvalidAmiId(imageId)) {
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

      StackEditor.prototype.isRdsDisabled = function() {
        return !!this.__disableRds;
      };

      StackEditor.prototype.fetchRdsData = function() {
        var region, self;
        self = this;
        region = this.opsModel.get("region");
        return Q.all([CloudResources(constant.RESTYPE.DBENGINE, region).fetchForce(), CloudResources(constant.RESTYPE.DBOG, region).fetchForce(), CloudResources(constant.RESTYPE.DBSNAP, region).fetchForce()]).then(function() {
          if (self.__disableRds !== false) {
            self.__disableRds = false;
            return self.trigger("toggleRdsFeature", true);
          }
        }, function(error) {
          if (error.awsErrorCode) {
            console.error("No authority to load rds data. Rds feature will be disabled.", error);
            self.__disableRds = true;
            self.trigger("toggleRdsFeature", false);
            return;
          }
          throw error;
        });
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
  define('workspaces/editor/OpsViewApp',["./OpsViewBase", "OpsModel", "./template/TplOpsEditor", "UI.modalplus", "i18n!/nls/lang.js"], function(OpsViewBase, OpsModel, OpsEditorTpl, Modal, lang) {
    return OpsViewBase.extend({
      initialize: function() {
        OpsViewBase.prototype.initialize.apply(this, arguments);
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

  define('workspaces/editor/OpsEditorApp',["./OpsEditorStack", "./OpsViewApp", "ResDiff", "OpsModel", "Design", "CloudResources", "constant"], function(StackEditor, AppView, ResDiff, OpsModel, Design, CloudResources, constant) {
    var AppEditor;
    AppEditor = (function(_super) {
      __extends(AppEditor, _super);

      function AppEditor() {
        return AppEditor.__super__.constructor.apply(this, arguments);
      }

      AppEditor.prototype.viewClass = AppView;

      AppEditor.prototype.title = function() {
        return ((this.design || this.opsModel).get("name") || this.opsModel.get("importVpcId")) + " - app";
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
        var region, self, stateModule;
        self = this;
        region = this.opsModel.get("region");
        stateModule = this.opsModel.getJsonData().agent.module;
        return Q.all([App.model.fetchStateModule(stateModule.repo, stateModule.tag), CloudResources(constant.RESTYPE.AZ, region).fetch(), CloudResources(constant.RESTYPE.SNAP, region).fetch(), CloudResources(constant.RESTYPE.DHCP, region).fetch(), CloudResources("QuickStartAmi", region).fetch(), CloudResources("MyAmi", region).fetch(), CloudResources("FavoriteAmi", region).fetch(), this.loadVpcResource(), this.fetchAmiData(), this.fetchRdsData()]).fail(function(err) {
          return self.__handleDataError(err);
        });
      };

      AppEditor.prototype.__handleDataError = function(err) {
        if (err.error === 286) {
          this.view.showVpcNotExist(this.opsModel.get("name"), (function(_this) {
            return function() {
              return _this.opsModel.terminate(true);
            };
          })(this));
          this.remove();
          return;
        }
        throw err;
      };

      AppEditor.prototype.initEditor = function() {
        if (this.opsModel.isImported()) {
          this.updateTab();
          this.view.canvas.autoLayout();
          this.view.confirmImport();
          return;
        }
        this.diff();
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
        return this.opsModel.saveApp(this.design.serialize());
      };

      AppEditor.prototype.reloadAppData = function() {
        var self;
        this.view.showUpdateStatus("", true);
        self = this;
        this.loadVpcResource().then(function() {
          return self.__onReloadDone();
        }, function() {
          return self.view.toggleProcessing();
        });
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
        return CloudResources("OpsResource", this.opsModel.getVpcId()).init(this.opsModel.get("region")).fetchForce();
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
        var self;
        if (this.isRemoved()) {
          return;
        }
        self = this;
        this.view.showUpdateStatus("", true);
        this.loadVpcResource().then(function() {
          return self.__onAppEditDidDone();
        });
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
        var self;
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
          this.loadVpcResource().then(function() {
            return self.__onVpcResLoaded();
          });
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


/*
  OpsEditor is a workspace for working on an OpsModel
  This class is implemented as a class cluster. Actually implementation is seperated in
  other concrete class :

  ProgressViewer  : For starting app.
  UnmanagedViewer : For viewing visualize app
 */

(function() {
  define('workspaces/OpsEditor',["./editor/ProgressViewer", "./editor/OpsEditorStack", "./editor/OpsEditorApp", './editor/framework/DesignBundle'], function(ProgressViewer, StackEditor, AppEditor) {
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

