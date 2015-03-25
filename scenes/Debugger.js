var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Scene", "./DebuggerTpl", "ApiRequest", "ApiRequestOs", "ApiRequestDefs", "Design", "component/jsonviewer/JsonViewer", "backbone", "jquery", "UI.select2", "UI.tooltip"], function(Scene, Template, ApiRequest, ApiRequestOs, ApiRequestDefs, Design, JsonViewer) {
  var ApiDebugger, ApiDebuggerView, AppDebugger;
  window.d = function() {
    return Design.instance();
  };
  window.dds = function() {
    return debug.designSerialize();
  };
  window.debug = {
    stacks: function() {
      var m, p, s, _i, _j, _len, _len1, _ref, _ref1;
      s = {};
      _ref = App.model.projects().models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        s[p.id] = {
          name: p.get("name"),
          stacks: []
        };
        _ref1 = p.stacks().models;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          m = _ref1[_j];
          s[p.id].stacks.push(m);
        }
      }
      return s;
    },
    apps: function() {
      var m, p, s, _i, _j, _len, _len1, _ref, _ref1;
      s = {};
      _ref = App.model.projects().models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        s[p.id] = {
          name: p.get("name"),
          apps: []
        };
        _ref1 = p.apps().models;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          m = _ref1[_j];
          s[p.id].apps.push(m);
        }
      }
      return s;
    },
    selectedComp: function() {
      var s;
      s = App.sceneManager.activeScene();
      if (s.getAwakeSpace) {
        s = s.getAwakeSpace();
        if (s.getSelectedComponent) {
          return s.getSelectedComponent();
        }
      }
      return null;
    },
    selectedCompState: function() {
      var comp, _ref;
      comp = (_ref = debug.selectedComp()) != null ? _ref.serialize()[1] : void 0;
      if (comp && comp.component && comp.component.state) {
        return '{\n\t"component": {\n\t\t"init" : {\n\t\t\t"state": ' + JSON.stringify(comp.component.state) + '\n\t\t}\n\t}\n}\n';
      } else {
        return "no state for selected component";
      }
    },
    designSerialize: function() {
      var data;
      if (!Design.instance()) {
        return;
      }
      data = Design.instance().serialize();
      console.log(data);
      return JSON.stringify(data);
    },
    designCheckValid: function() {
      Design.instance().eachComponent(function(comp) {
        if (comp.design() === Design.instance()) {
          console.log("Valid design");
        } else {
          console.log("Invalid design");
        }
        return null;
      });
      return null;
    },
    designExportToFile: function() {
      var a, blob, data, e, filename;
      if (!Design.instance()) {
        return;
      }
      filename = 'CanvasData.json';
      data = Design.debug.json();
      blob = new Blob([data], {
        type: 'text/json'
      });
      e = document.createEvent('MouseEvents');
      a = document.createElement('a');
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
      return null;
    },
    designDiff: function() {
      if (Design.instance()) {
        JsonViewer.showDiffDialog(Design.instance().__opsModel.getJsonData(), Design.instance().serialize());
      }
    },
    designView: function() {
      if (!Design.instance()) {
        return;
      }
      JsonViewer.showViewDialog(Design.instance().serialize());
    },
    designLayout: function() {
      return App.sceneManager.activeScene().getAwakeSpace().view.canvas.autoLayout();
    },
    designSet: function(a, b) {
      var _ref;
      return (_ref = Design.instance()) != null ? _ref.set(a, b) : void 0;
    },
    designGet: function(a) {
      var _ref;
      return (_ref = Design.instance()) != null ? _ref.get(a) : void 0;
    },
    designComps: function() {
      var a, checkedMap, id, _ref;
      if (!Design.instance()) {
        return;
      }
      checkedMap = {
        "line": {},
        "node": {},
        "group": {},
        "otherResource": {},
        "otherConnection": {}
      };
      _ref = Design.instance().__componentMap;
      for (id in _ref) {
        a = _ref[id];
        if (a.node_group) {
          checkedMap.group[a.id] = a;
        } else if (a.node_line) {
          if (a.isVisual()) {
            checkedMap.line[a.id] = a;
          } else {
            checkedMap.otherConnection[a.id] = a;
          }
        } else {
          if (a.isVisual()) {
            checkedMap.node[a.id] = a;
          } else {
            checkedMap.otherResource[a.id] = a;
          }
        }
      }
      return checkedMap;
    }
  };
  window.man = "d()          Return the current Design instance \n dds()        Print JSON \n copy(dds())  Copy JSON \n debug        A object contains some debug functions";
  null;
  AppDebugger = Backbone.View.extend({
    events: {
      "click li": function(evt) {
        var _name;
        return typeof this[_name = evt.currentTarget.id] === "function" ? this[_name]() : void 0;
      }
    },
    initialize: function() {
      $("head").append('<link rel="stylesheet" href="/assets/css/debugger.css"></link>');
      this.setElement($(Template.Toolbar()).appendTo("body"));
    },
    ask: function(content, buttons) {
      var q, self;
      q = $(Template.Question({
        content: content,
        buttons: buttons || []
      })).prependTo("body");
      self = this;
      q.on("click", "button", function(evt) {
        var _name;
        return typeof self[_name = $(evt.currentTarget).attr("data-id")] === "function" ? self[_name]() : void 0;
      });
      setTimeout(function() {
        return $("#DebugQuestion").addClass("ready");
      }, 18);
    },
    DtDiff: function() {
      return debug.designDiff();
    },
    DtView: function() {
      return debug.designView();
    },
    DtApi: function() {
      return new ApiDebugger();
    },
    DtSession: function() {
      var session;
      session = "<textarea id='DebugShareSession' spellcheck='false'>(function(){var o = {expires:30,path:'/'}, a = " + (JSON.stringify($.cookie())) + ",k;for (k in a) { $.cookie(k,a[k],o); } window.location.href = window.location.protocol + '//' + window.location.host + '" + window.location.pathname + "'; })();</textarea>";
      this.ask(session);
      setTimeout(function() {
        return $("#DebugShareSession").focus().select();
      }, 200);
    },
    DtClearApp: function() {
      var buttons;
      buttons = [
        {
          id: "debug_q_clear_project_app",
          text: "当前项目的App"
        }, {
          id: "debug_q_clear_all_app",
          text: "所有项目的App"
        }
      ];
      return this.ask("えええええええっ！！你要Teminate所有App？本当ですか？", buttons);
    },
    DtClearStack: function() {
      var buttons;
      buttons = [
        {
          id: "debug_q_clear_project_stack",
          text: "当前项目的Stack"
        }, {
          id: "debug_q_clear_all_stack",
          text: "所有项目的Stack"
        }
      ];
      return this.ask("マジですか？你要删除所有Stack？", buttons);
    },
    debug_q_close: function() {
      $("#DebugQuestion").addClass("quick").removeClass("ready");
      setTimeout(function() {
        return $("#DebugQuestion").remove();
      }, 100);
    },
    debug_q_clear_project_stack: function() {
      var m, p, s, _i, _len, _ref;
      s = App.sceneManager.activeScene();
      if (_.isFunction(s.project)) {
        p = s.project();
      } else {
        p = App.model.getPrivateProject();
      }
      _ref = p.stacks().models.slice(0);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.remove();
      }
      return this.debug_q_close();
    },
    debug_q_clear_project_app: function() {
      var m, p, s, _i, _len, _ref;
      s = App.sceneManager.activeScene();
      if (_.isFunction(s.project)) {
        p = s.project();
      } else {
        p = App.model.getPrivateProject();
      }
      _ref = p.apps().models.slice(0);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        m.remove();
      }
      return this.debug_q_close();
    },
    debug_q_clear_all_stack: function() {
      var m, p, _i, _j, _len, _len1, _ref, _ref1;
      _ref = App.model.projects().models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        _ref1 = p.stacks().models.slice(0);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          m = _ref1[_j];
          m.remove();
        }
      }
      return this.debug_q_close();
    },
    debug_q_clear_all_app: function() {
      var m, p, _i, _j, _len, _len1, _ref, _ref1;
      _ref = App.model.projects().models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        _ref1 = p.apps().models.slice(0);
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          m = _ref1[_j];
          m.terminate();
        }
      }
      return this.debug_q_close();
    }
  });
  ApiDebuggerView = Backbone.View.extend({
    events: {
      "change #ApiSelect": "onApiChange",
      "click  #ApiDebugSend": "onSendClick",
      "click  #ApiDebuggerClose": "close"
    },
    initialize: function() {
      this.setElement($(Template.ApiDebugger()).appendTo("body"));
      this.render();
      $("#ApiSelect").select2("open");
      $("#s2id_autogen1_search").focus();
    },
    remove: function() {
      $("#ApiSelect").select2("destroy");
      return this.$el.remove();
    },
    close: function() {
      return this.trigger("closed");
    },
    render: function() {
      var d, def, defName, g, gg, group, groupName, option, _i, _len, _ref;
      option = "<option></option>";
      group = {};
      _ref = ApiRequestDefs.Defs;
      for (defName in _ref) {
        def = _ref[defName];
        d = defName.split("_");
        if (d.length === 1) {
          g = "General";
        } else {
          g = d[0].toUpperCase();
        }
        if (!group[g]) {
          group[g] = [];
        }
        group[g].push(defName);
      }
      for (groupName in group) {
        g = group[groupName];
        option += "<optgroup label='" + groupName + "'>";
        for (_i = 0, _len = g.length; _i < _len; _i++) {
          gg = g[_i];
          option += "<option value='" + gg + "'>" + gg + "</option>";
        }
        option += "</optgrouop>";
      }
      return $("#ApiSelect").html(option).select2({
        dropdownCssClass: "debugger",
        matcher: function(term, text, opt) {
          return text.match(new RegExp(term.replace(/\s+/g, '').split('').join('.*'), 'i'));
        }
      });
    },
    onApiChange: function() {
      var apiDef, p, phtml, v, val, _i, _len, _ref;
      val = $("#ApiSelect").select2("val");
      apiDef = ApiRequestDefs.Defs[val];
      $("#ApiResult").empty();
      $("#ApiDebuggerLabel").text("Api : '" + val + "'");
      if (!apiDef) {
        return $("#ApiParamsWrap").empty();
      }
      phtml = "";
      _ref = apiDef.params;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        v = ApiRequestDefs.AutoFill(p);
        if (v === null) {
          v = "";
        }
        phtml += "<input placeholder='" + p + "' class='tooltip' value='" + v + "' data-tooltip='" + p + "'/>";
      }
      $("#ApiParamsWrap").html(phtml);
      return this.trigger("apiChanged", val);
    },
    onSendClick: function() {
      var api, apiDef, ch, e, k, params, v, _i, _len, _ref;
      api = $("#ApiSelect").select2("val");
      apiDef = ApiRequestDefs.Defs[api];
      if (!apiDef) {
        return;
      }
      params = {};
      _ref = $("#ApiParamsWrap").children("input");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ch = _ref[_i];
        v = ch.value;
        if (!v) {
          continue;
        }
        k = $(ch).attr("placeholder");
        try {
          params[k] = JSON.parse(v);
        } catch (_error) {
          e = _error;
          params[k] = v;
        }
      }
      $("#ApiDebugSend").attr("disabled", "disabled");
      $("#ApiResult").text("Loading...").attr("finish", "false");
      (apiDef.type === "openstack" ? ApiRequestOs : ApiRequest)(api, params).then(function(result) {
        var c, i, idx, item, _j, _k, _len1, _len2;
        if (apiDef.url.indexOf("/aws/") === 0 && apiDef.url.length > 5 && (typeof result[1] === "string")) {
          try {
            result[1] = $.xml2json($.parseXML(result[1]));
          } catch (_error) {

          }
        } else if (apiDef.url.indexOf("/os/") === 0) {
          if (apiDef.method === "Info") {
            for (idx = _j = 0, _len1 = result.length; _j < _len1; idx = ++_j) {
              item = result[idx];
              try {
                if ($.type(result) === 'array') {
                  for (i = _k = 0, _len2 = item.length; _k < _len2; i = ++_k) {
                    c = item[i];
                    result[idx][i] = JSON.parse(c);
                  }
                } else {
                  result[idx] = JSON.parse(item);
                }
              } catch (_error) {

              }
            }
          } else {
            try {
              result[1] = JSON.parse(result[1]);
            } catch (_error) {

            }
          }
        }
        $("#ApiResult").text(JSON.stringify(result, void 0, 4));
        $("#ApiDebugSend").removeAttr("disabled");
        return $("#ApiResult").attr("finish", "true");
      }, function(error) {
        $("#ApiResult").text(JSON.stringify(error, void 0, 4));
        $("#ApiDebugSend").removeAttr("disabled");
        return $("#ApiResult").attr("finish", "true");
      });
      return null;
    },
    switchToApi: function(api) {
      $("#ApiSelect").select2("val", api).select2("close");
      return this.onApiChange();
    }
  });
  ApiDebugger = (function(_super) {
    __extends(ApiDebugger, _super);

    ApiDebugger.prototype.api = "";

    function ApiDebugger(api) {
      var ss;
      api = api || "";
      ss = App.sceneManager.find("ApiDebugger");
      if (ss) {
        ss.activate();
        ss.switchToApi(api);
        return ss;
      }
      return Scene.call(this, api);
    }

    ApiDebugger.prototype.initialize = function(api) {
      this.view = new ApiDebuggerView();
      this.listenTo(this.view, "apiChanged", this.onApiChange);
      this.listenTo(this.view, "closed", this.remove);
      this.activate();
      return this.switchToApi(api || "");
    };

    ApiDebugger.prototype.title = function() {
      return "API Debugger";
    };

    ApiDebugger.prototype.url = function() {
      if (this.api) {
        return "debug/api/" + this.api;
      } else {
        return "debug/api";
      }
    };

    ApiDebugger.prototype.isWorkingOn = function(attr) {
      return attr === "ApiDebugger";
    };

    ApiDebugger.prototype.onApiChange = function(api) {
      this.api = api;
      return this.updateUrl();
    };

    ApiDebugger.prototype.switchToApi = function(api) {
      if (this.api === api || !api) {
        return;
      }
      this.onApiChange();
      return this.view.switchToApi(api);
    };

    return ApiDebugger;

  })(Scene);
  new AppDebugger();
  window.Router.route("debug/api(/:theapi)", function(theapi) {
    return new ApiDebugger(theapi);
  });
});
