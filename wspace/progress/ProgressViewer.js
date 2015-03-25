define('wspace/progress/PVTpl',['handlebars'], function(Handlebars){ var __TEMPLATE__, TEMPLATE={};

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
    + " <button class=\"btn btn-silver btn-close-process\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_CLOSE_TAB", {hash:{},data:data}))
    + "</button></header>\n    <div class=\"result-error-info\">\n      <p class=\"title\">"
    + escapeExpression(helpers.i18n.call(depth0, "PROC_RLT_FAILED_SUB_TITLE", {hash:{},data:data}))
    + "</p>\n      <p class=\"detail\"></p>\n    </div>\n  </section>\n</div>";
  return buffer;
  };
TEMPLATE.frame=Handlebars.template(__TEMPLATE__);


__TEMPLATE__ =function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<li><div class=\"pdr-3\"></div><div class=\"pdr-2\"></div></li>";
  }

  buffer += "<section class=\"process-detail\">\n  <header><div class=\"pdr-3\">STATUS</div><div class=\"pdr-1\">#</div><div class=\"pdr-2\">TASK</div></header>\n  <ul>";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>\n</section>";
  return buffer;
  };
TEMPLATE.detailFrame=Handlebars.template(__TEMPLATE__);


return TEMPLATE; });
define('wspace/progress/ProgressViewer',["OpsModel", "Workspace", "./PVTpl"], function(OpsModel, Workspace, ProgressTpl) {
  var OpsProgressView;
  OpsProgressView = Backbone.View.extend({
    events: {
      "click .btn-close-process": "close"
    },
    initialize: function(attr) {
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
      this.setElement($(ProgressTpl.frame(data)).appendTo(attr.workspace.scene.spaceParentElement()));
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
        case OpsModel.State.RollingBack:
          this.$el.toggleClass("rolling-back", true);
          break;
        case OpsModel.State.Destroyed:
          if (this.done) {
            this.close();
            return;
          }
          this.$el.children().hide();
          this.$el.find(".fail").show();
          this.$el.find(".process-detail").show();
          this.$el.find(".detail").html(this.model.get("opsActionError").replace(/\n/g, "<br/>"));
          break;
        default:
          console.error("The model has changed to a state that OpsProgress doesn't recongnize", this.model);
      }
    },
    updateProgress: function() {
      var pro;
      this.$el.toggleClass("has-progess", true);
      pro = "" + (this.model.get("progress")) + "%";
      this.$el.find(".process-info").text(pro);
      this.$el.find(".bar").css({
        width: pro
      });
      this.updateDetail();
    },
    updateDetail: function() {
      var $children, $detail, classMap, idx, notification, rawRequest, self, step, text, _i, _len, _ref;
      notification = App.model.notifications().get(this.model.id);
      if (!notification) {
        self = this;
        App.model.notifications().once("add", function() {
          return self.updateDetail();
        });
        return;
      }
      rawRequest = notification.raw();
      $detail = this.$el.children(".process-detail");
      if ($detail.length === 0) {
        $detail = $(ProgressTpl.detailFrame(rawRequest.step || [])).appendTo(this.$el);
      }
      $children = $detail.children("ul").children();
      if (rawRequest.state === "Rollback") {
        classMap = {
          done: "pdr-3 done icon-success",
          running: "pdr-3 rolling icon-pending",
          pending: "pdr-3 rolledback icon-warning"
        };
      } else {
        classMap = {
          done: "pdr-3 done icon-success",
          running: "pdr-3 running icon-pending",
          pending: "pdr-3 pending"
        };
      }
      _ref = rawRequest.step;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        step = _ref[idx];
        if (step.length < 5) {
          continue;
        }
        text = step[2] + " " + step[4];
        if (step[3]) {
          text += " (" + step[3] + ")";
        }
        $children.eq(idx).children(".pdr-2").text(text);
        $children.eq(idx).children(".pdr-3").attr("class", classMap[step[1]]);
      }
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
  return Workspace.extend({
    type: "ProgressViewer",
    isWorkingOn: function(data) {
      return this.opsModel() === data.opsModel;
    },
    tabClass: function() {
      return "icon-app-pending";
    },
    title: function() {
      return this.opsModel().get("name") + " - app";
    },
    url: function() {
      return this.opsModel().relativeUrl();
    },
    constructor: function(attr) {
      if (!attr.opsModel) {
        throw new Error("Cannot find opsmodel while openning workspace.");
      }
      Workspace.apply(this, arguments);
    },
    initialize: function() {
      var self;
      this.view = new OpsProgressView({
        model: this.opsModel(),
        workspace: this
      });
      this.listenTo(this.opsModel(), "change:id", function() {
        this.updateUrl();
      });
      self = this;
      this.view.on("close", function() {
        return self.remove();
      });
      this.view.on("done", function() {
        self.remove();
        App.loadUrl(self.opsModel().url());
      });
    },
    opsModel: function() {
      return this.get("opsModel");
    },
    awake: function() {
      return this.view.awake();
    },
    sleep: function() {
      return this.view.sleep();
    }
  }, {
    canHandle: function(data) {
      if (!data.opsModel) {
        return false;
      }
      if (data.opsModel.testState(OpsModel.State.Saving) || data.opsModel.testState(OpsModel.State.Terminating) || data.opsModel.testState(OpsModel.State.Removing)) {
        console.warn("Avoide opening a saving/terminating/removing OpsModel.");
        return false;
      }
      return data.opsModel.isApp() && data.opsModel.isProcessing();
    }
  });
});

