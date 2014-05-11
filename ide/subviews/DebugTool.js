(function() {
  define(["ApiRequest", "ApiRequestDefs", "vender/select2/select2"], function(ApiRequest, ApiRequestDefs) {
    var ApiDialog, DebugTool, SessionDialog, debugApi, debugSession, dispatchClick, tmpl;
    tmpl = "<div id=\"DebugTool\" class=\"debugToolBg\"><ul>\n<li id=\"DtDiff\" class=\"icon-toolbar-diff tooltip\" data-tooltip=\"Json Diff\"></li>\n<li id=\"DtView\" class=\"icon-toolbar-cloudformation tooltip\" data-tooltip=\"Json View\"></li>\n<li id=\"DtApi\" class=\"tooltip debugToolBg\" data-tooltip=\"Debug Api\"></li>\n<li id=\"DtSession\" class=\"icon-user tooltip\" data-tooltip=\"Share Session\"></li>\n</ul>\n<div id=\"DebugTooltip\">console输入man查看快捷debug</div>\n</div>";
    ApiDialog = "<div class=\"modal-header\"> <h3>Api Debugger</h3> <i class=\"modal-close\">×</i> </div>\n<div id=\"diffWrap\"><div id=\"ApiDebugger\">\n<button class=\"btn btn-blue\" id=\"ApiDebugSend\">Send Request</button>\n<section><label>Api : </label><select id=\"ApiSelect\" data-placeholder=\"Select an api\"></select></section>\n<section><label>Parameters :</label><section id=\"ApiParamsWrap\" class=\"clearfix\"></section></section>\n<section><label>Result :</label><pre id=\"ApiResult\"></pre></section>\n</div></div>";
    SessionDialog = "<div class=\"modal-header\"> <h3>Share Session</h3> <i class=\"modal-close\">×</i> </div>\n<div class=\"modal-body\" style=\"width:500px\">\n  <h5>Paste & run this code to share session.</h5>\n  <textarea id=\"DebugShareSession\" spellcheck=\"false\"></textarea>\n</div>";
    DebugTool = function() {
      $("head").append('<link rel="stylesheet" href="./assets/css/debugger.css"></link>');
      $(tmpl).appendTo("body");
      return $("#DebugTool").on("click", "li", dispatchClick);
    };
    dispatchClick = function(evt) {
      var id;
      id = evt.currentTarget.id;
      switch (id) {
        case "DtDiff":
          return dd.diff();
        case "DtView":
          return dd.view();
        case "DtApi":
          return debugApi();
        case "DtSession":
          return debugSession();
      }
    };
    debugApi = function() {
      var d, def, defName, g, gg, group, groupName, option, _i, _len, _ref;
      modal(ApiDialog);
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
      $("#ApiSelect").html(option).select2({
        width: 400
      }).on("change", function() {
        var apiDef, p, phtml, v, _j, _len1, _ref1;
        apiDef = ApiRequestDefs.Defs[$("#ApiSelect").select2("val")];
        $("#ApiResult").empty();
        if (!apiDef) {
          return $("#ApiParamsWrap").empty();
        }
        phtml = "";
        _ref1 = apiDef.params;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          p = _ref1[_j];
          v = ApiRequestDefs.AutoFill(p);
          if (v === null) {
            v = "";
          }
          phtml += "<input placeholder='" + p + "' class='diffInput tooltip' value='" + v + "' data-tooltip='" + p + "'/>";
        }
        return $("#ApiParamsWrap").html(phtml);
      });
      $("#ApiDebugSend").click(function() {
        var api, apiDef, ch, e, k, params, v, _j, _len1, _ref1;
        api = $("#ApiSelect").select2("val");
        apiDef = ApiRequestDefs.Defs[api];
        if (!apiDef) {
          return;
        }
        params = {};
        _ref1 = $("#ApiParamsWrap").children("input");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ch = _ref1[_j];
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
        $("#ApiResult").text("Loading...");
        return ApiRequest(api, params).then(function(result) {
          $("#ApiResult").text(JSON.stringify(result, void 0, 4));
          return $("#ApiDebugSend").removeAttr("disabled");
        }, function(error) {
          $("#ApiResult").text(JSON.stringify(error, void 0, 4));
          return $("#ApiDebugSend").removeAttr("disabled");
        });
      });
      return $("#modal-box").css({
        width: "98%",
        height: "98%",
        top: "1%",
        left: "1%"
      });
    };
    debugSession = function() {
      var session;
      session = "(function(){var o = {expires:30,path:'/'}, a = " + (JSON.stringify($.cookie())) + ",k;for (k in a) { $.cookie(k,a[k],o); } window.location.reload(); })();";
      modal(SessionDialog);
      $("#DebugShareSession").html(session).select();
    };
    return DebugTool;
  });

}).call(this);