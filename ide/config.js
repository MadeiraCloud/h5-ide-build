window.FileVersions={"api/api.js":"5eb5a688","component/Exporter.js":"9d972976","component/StateStatus.js":"55449086","component/Validation.js":"fe151eec","component/jsonviewer/JsonDiffLib.js":"6a66427a","component/jsonviewer/JsonViewer.js":"1679fcd9","component/jsonviewer/diff.js":"c48f397c","component/jsonviewer/jqUi.js":"61d7e808","component/jsonviewer/view.js":"3d847baf","component/sgrule/SGRulePopup.js":"3a44caf5","component/sharedrescomp.js":"907cb3be","component/stateeditor/stateeditor.js":"be956968","ide/AppBundle.js":"0b180e06","ide/Application.js":"a564f81a","ide/Router.js":"a8712484","ide/cloudres/CrBundle.js":"6daae8d4","ide/config.js":"164571f3","ide/subviews/DebugTool.js":"cec313fd","lib/aws.js":"4e837b03","lib/lib.js":"c625deb7","nls/en-us/lang.js":"88f30037","nls/lang.js":"3093b83a","nls/zh-cn/lang.js":"732e05da","service/service.js":"56f473e0","service/stack_model.js":"6c6a0ea2","ui/ui.js":"9e4204be","user/main.js":"881b4aba","vender/crypto-js/hmac-sha256.js":"c822cfb1","vender/handlebars/handlebars.js":"bec7085c","vender/jquery/jquery.1.0.js":"a202c669","vender/jquery/jquery.cookie.min.js":"35af54d1","vender/jsondiffpatch/bundle.js":"0ca30c27","vender/qunit/qunit.js":"302545f4","vender/requirejs/require.js":"374b3c99","vender/requirejs/requirelib.js":"35453d3b","vender/select2/select2.js":"a53745e4","vender/select2/select2.min.js":"f396992f","vender/select2/select2_locale_zh-CN.js":"6add3c52","vender/vender.js":"f3fec4fc","workspaces/Dashboard.js":"0148fe1b","workspaces/OpsEditor.js":"7dc5a626","workspaces/editor/PropertyPanel.js":"7f4b97ec","workspaces/editor/framework/DesignBundle.js":"08f0fb0f","workspaces/editor/framework/util/DesignDebugger.js":"d6f7a9c1","workspaces/editor/property/acl/template/app.js":"1038cfbe","workspaces/editor/property/sgrule/template/app.js":"a7a2ae7d"};
(function() {
  (function() {
    var getCookie, ideHttps, l, s, scripts, shouldIdeHttps, version, _i, _len;
    if (!window) {
      return;
    }
    window.MC_DOMAIN = "visualops.io";
    window.MC_PROTO = "http";
    shouldIdeHttps = false;
    ideHttps = true;

    /* env:debug */
    window.MC_DOMAIN = "mc3.io";
    ideHttps = false;

    /* env:debug:end */

    /* env:dev                                                            env:dev:end */

    /* AHACKFORRELEASINGPUBLICVERSION */
    shouldIdeHttps = ideHttps;
    window.MC_PROTO = "https";

    /* AHACKFORRELEASINGPUBLICVERSION */
    l = window.location;
    window.language = window.version = "";
    if (shouldIdeHttps && l.protocol === "http:") {
      window.location = l.href.replace("http:", "https:");
      return;
    }
    getCookie = function(sKey) {
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    };
    if (!(getCookie('usercode') && getCookie('session_id'))) {
      window.location.href = "/login/";
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
    window.language = document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + "lang\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1") || "en-us";
    return null;
  })();

  require.config({
    baseUrl: '/',
    waitSeconds: 30,
    locale: language,
    urlArgs: "v=" + version,

    /* env:dev                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              env:dev:end */
    shim: {
      'canvon': {
        deps: ['jquery'],
        exports: 'Canvon'
      },
      'underscore': {
        exports: '_'
      },
      'handlebars': {
        exports: 'Handlebars'
      },
      'Meteor': {
        deps: ['underscore'],
        exports: 'Meteor'
      }
    },

    /* env:prod */
    bundles: {
      "vender/requirejs/requirelib": ["i18n"],
      "vender/vender": ["jquery", "backbone", "underscore", "handlebars", "sprintf", "Meteor", "canvon", "crypto", "q"],
      "lib/lib": ["MC", "constant", "MC.canvas", "MC.canvas.constant", 'MC.validate', "lib/handlebarhelpers", "event"],
      "ui/ui": ['UI.tooltip', 'UI.scrollbar', 'UI.bubble', 'UI.modal', 'UI.table', 'UI.tablist', 'UI.selectbox', 'UI.searchbar', 'UI.filter', 'UI.radiobuttons', 'UI.notification', 'UI.multiinputbox', 'UI.canvg', 'UI.sortable', 'UI.parsley', 'UI.errortip', 'UI.tour', "jqpagination", 'jquerysort', "UI.modalplus"],
      "api/api": ["ApiRequest"],
      "service/service": ['base_model', 'state_model', 'keypair_model', 'instance_model', 'result_vo', 'stack_service', 'state_service', 'ami_service', 'ebs_service', 'instance_service', 'keypair_service', 'customergateway_service'],
      "component/Exporter": ["ThumbnailUtil", "JsonExporter"],
      "component/Validation": ["validation", "component/trustedadvisor/main"],
      "component/StateStatus": ["state_status"],
      "component/sgrule/SGRulePopup": [],
      "component/stateeditor/stateeditor": [],
      "component/sharedrescomp": ['kp_dropdown', 'kp_manage', 'kp_upload', 'sns_dropdown', 'sns_manage', 'combo_dropdown', 'toolbar_modal', 'dhcp', 'snapshotManager', 'sslcert_manage', 'sslcert_dropdown', 'ResDiff', 'DiffTree'],
      "ide/cloudres/CrBundle": ["CloudResources"],
      "ide/Application": ["Workspace", "OpsModel"],
      "workspaces/Dashboard": [],
      "workspaces/editor/PropertyPanel": ["workspaces/editor/subviews/PropertyPanel"],
      "workspaces/editor/framework/DesignBundle": ["Design", "CanvasManager"],
      "workspaces/OpsEditor": []
    },
    bundleExcludes: {
      "component/sgrule/SGRulePopup": ["Design"],
      "component/stateeditor/stateeditor": ["Design"],
      "component/sharedrescomp": ["Design"],
      "component/Validation": ["Design"],
      "workspaces/editor/PropertyPanel": ["Design"],
      "workspaces/editor/framework/DesignBundle": [],
      "workspaces/editor/subviews/PropertyPanel": ["component/sgrule/SGRulePopup"]
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

  require(['ide/Application', "ide/cloudres/CrBundle", "workspaces/Dashboard", "workspaces/OpsEditor", "ide/Router", "MC", 'lib/aws'], function(Application, CrBundle, Dashboard, OpsEditor, Router) {
    window.Router = new Router();
    window.OpsEditor = OpsEditor;
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
