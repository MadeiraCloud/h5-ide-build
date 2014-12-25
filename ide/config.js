(function() {
  (function() {
    var getCookie, hosts, location, p, s, scripts, version, _i, _len;
    if (!window) {
      return;
    }
    location = window.location;
    if (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.exec(location.hostname)) {
      console.error("VisualOps IDE can not be browsed with IP address.");
      return;
    }
    hosts = location.hostname.split(".");
    if (hosts.length >= 3) {
      window.MC_DOMAIN = hosts[hosts.length - 2] + "." + hosts[hosts.length - 1];
    } else {
      window.MC_DOMAIN = location.hostname;
    }
    window.MC_API_HOST = location.protocol + "//api." + window.MC_DOMAIN;
    window.language = window.version = "";
    if (location.hostname.toLowerCase().indexOf("visualops.io") >= 0 && location.protocol === "http:") {
      window.location = location.href.replace("http:", "https:");
      return;
    }
    getCookie = function(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    };
    if (!(getCookie('usercode') && getCookie('session_id'))) {
      p = window.location.pathname;
      if (p === "/") {
        p = window.location.hash.replace("#", "/");
      }
      if (p && p !== "/") {
        window.location.href = "/login?ref=" + p;
      } else {
        window.location.href = "/login";
      }
      return;
    }
    scripts = document.getElementsByTagName("script");
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      s = scripts[_i];
      version = s.getAttribute("data-main");
      if (version) {
        window.version = version.split("?")[1];
        break;
      }
    }
    if (window.version === '#{version}') {
      window.version = "dev";
    }
    window.language = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + "lang\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || (navigator.language && navigator.language === "zh-cn" ? "zh-cn" : "en-us");
    return null;
  })();

  require.config({
    baseUrl: '/',
    waitSeconds: 30,
    locale: language,
    urlArgs: "v=" + version,

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             env:dev:end */
    shim: {
      'underscore': {
        exports: '_'
      },
      'Meteor': {
        deps: ['underscore'],
        exports: 'Meteor'
      }
    },

    /* env:prod */
    bundles: {
      "vender/requirejs/requirelib": ["i18n"],
      "vender/vender": ["jquery", "backbone", "underscore", "handlebars", "sprintf", "Meteor", "crypto", "q", "svg"],
      "lib/lib": ["MC", "constant", 'MC.validate', "lib/handlebarhelpers", "event"],
      "ui/ui": ['UI.tooltip', 'UI.scrollbar', 'UI.bubble', 'UI.modal', 'UI.table', 'UI.tablist', 'UI.selectbox', 'UI.searchbar', 'UI.filter', 'UI.radiobuttons', 'UI.notification', 'UI.multiinputbox', 'UI.canvg', 'UI.sortable', 'UI.parsley', 'UI.errortip', 'UI.dnd', "jqpagination", 'jquerysort', "jqtimepicker", "jqdatetimepicker", "UI.modalplus", "UI.nanoscroller", "UI.selectize", "UI.selection", "UI.bubblepopup", "UI.select2"],
      "api/api": ["ApiRequest", "ApiRequestR", "ApiRequestOs"],
      "cloudres/CrBundle": ["CloudResources"],
      "component/Exporter": ["ThumbnailUtil", "JsonExporter"],
      "component/Validation": ["validation", "TaHelper", "TaGui"],
      "component/StateStatus": ["state_status"],
      "component/StateEditor": ["StateEditor", "StateEditorView"],
      "component/ResDiff": ["ResDiff", "DiffTree"],
      "component/Common": ["combo_dropdown", "toolbar_modal"],
      "component/AwsComps": ['dhcp', 'kp_dropdown', 'kp_manage', 'kp_upload', 'sns_dropdown', 'sns_manage', 'snapshotManager', 'rds_pg', 'rds_snapshot', 'sslcert_manage', 'sslcert_dropdown', 'og_manage', 'og_manage_app', 'og_dropdown', 'SGRulePopup', 'DbSubnetGPopup'],
      "component/OsComps": ['OsKp', 'OsSnapshot'],
      "component/AppAction": ["AppAction"],
      "ide/AppBundle": ["ide/Application", "Workspace", "OpsModel", "ide/Router"],
      "workspaces/dashboard/Dashboard": [],
      "workspaces/osdashboard/DashboardOs": [],
      "workspaces/coreeditor/CoreEditorBundle": ["OpsEditor", "Design", "ResourceModel", "ComplexResModel", "ConnectionModel", "GroupModel", "CoreEditor", "CoreEditorView", "CoreEditorApp", "CoreEditorViewApp", "ProgressViewer", "CanvasElement", "CanvasLine", "CanvasView", "CanvasViewLayout", "CanvasManager", "CanvasPopup"],
      "workspaces/awseditor/EditorAws": [],
      "workspaces/oseditor/EditorOs": []
    },
    bundleExcludes: {
      "component/StateEditor": ["Design", "OpsModel"],
      "component/Validation": ["Design"],
      "component/AwsComps": ["Design", "OpsModel"],
      "component/OsComps": ["Design", "OpsModel"],
      "component/AppAction": ["Design"],
      "workspaces/dashboard/Dashboard": ["Design"],
      "workspaces/osdashboard/DashboardOs": ["Design"]
    }

    /* env:prod:end */
  });

  requirejs.onError = function(err) {
    var i, _i, _len, _ref;
    err = err || {
      requireType: "timeout"
    };
    if (err.requireType === "timeout") {
      _ref = err.requireModules || [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        requirejs.undef(i);
      }
      return require(err.requireModules || [], function() {});
    } else {
      return console.error("[RequireJS Error]", err, err.stack);
    }
  };

  if (window.define) {
    define("/nls/lang.js", [], {
      'en-us': true,
      'zh-cn': true
    });
  }

  require(['ide/Application', "cloudres/CrBundle", "workspaces/dashboard/Dashboard", "OpsEditor", "ide/Router", "MC", 'lib/aws', "workspaces/awseditor/EditorAws", "workspaces/oseditor/EditorOs"], function(Application, CrBundle, Dashboard, OpsEditor, Router) {
    window.OpsEditor = OpsEditor;
    window.Router = new Router();
    return (new Application()).initialize().then(function() {
      window.Router.start();
      window.Dashboard = new Dashboard();
    });
  }, function(err) {
    err = err || {
      requireType: "timeout"
    };
    if (err.requireType === "timeout") {
      requirejs.onError = function() {};
      console.error("[RequireJS timeout] Reloading, error modules :", err.requireModules);
      window.location.reload();
    } else {
      console.error("[RequireJS Error]", err, err.stack);
    }
  });

}).call(this);
