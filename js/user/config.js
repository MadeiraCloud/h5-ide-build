(function() {
  (function() {

    /* AHACKFORRELEASINGPUBLICVERSION */
    var l, s, scripts, version, _i, _len;
    l = window.location;
    window.language = window.version = "";
    if (l.protocol === "http:" && !l.port) {
      window.location = l.href.replace("http:", "https:");
      return;
    }

    /* AHACKFORRELEASINGPUBLICVERSION */
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
    baseUrl: './',
    waitSeconds: 30,
    locale: language,
    urlArgs: 'v=' + version,
    paths: {
      'jquery': 'vender/jquery/jquery.1.0',
      'underscore': 'vender/underscore/underscore',
      'backbone': 'vender/backbone/backbone',
      'handlebars': 'vender/handlebars/handlebars.rt',
      'domReady': 'vender/requirejs/domReady',
      'i18n': 'vender/requirejs/i18n',
      'text': 'vender/requirejs/text',
      'sprintf': 'vender/sprintf/sprintf',
      'crypto': 'vender/crypto-js/cryptobundle',
      'MC': 'js/MC.core',
      'constant': 'lib/constant',
      'common_handle': 'lib/common/main',
      'event': 'lib/ide_event',
      'MC.canvas.constant': 'lib/MC.canvas.constant',
      'base_main': 'module/base/base_main',
      'base_model': 'model/base_model',
      'result_vo': 'service/result_vo',
      'session_model': 'model/session_model',
      'session_service': 'service/session/session_service',
      'account_model': 'model/account_model',
      'account_service': 'service/account/account_service',
      'UI.notification': 'ui/UI.notification'
    },
    shim: {
      'underscore': {
        exports: '_'
      },
      'handlebars': {
        exports: 'Handlebars'
      },
      'MC': {
        deps: ['jquery', 'constant'],
        exports: 'MC'
      }
    },

    /* env:prod */
    bundles: {
      "vender/requirejs/requirelib": ["i18n"],
      "vender/vender": ["jquery", "backbone", "underscore", "handlebars", "sprintf", "crypto"],
      "lib/lib": ["MC", "constant", "MC.canvas.constant", "event"],
      "lib/deprecated": ['aws_handle', 'forge_handle', 'common_handle'],
      "ui/ui": ['UI.notification'],
      "model/model": ['base_model', 'account_model', 'session_model', 'session_service', 'account_service', "result_vo"]
    }

    /* env:prod:end */
  });

  require(["MC", "i18n!nls/lang.js", "jquery"], function(MC, lang) {
    var entry;
    $(function() {
      if (MC.isSupport() === false) {
        return $(document.body).prepend('<div id="unsupported-browser"><p>MadeiraCloud IDE does not support the browser you are using.</p> <p>For a better experience, we suggest you use the latest version of <a href=" https://www.google.com/intl/en/chrome/browser/" target="_blank">Chrome</a>, <a href=" http://www.mozilla.org/en-US/firefox/all/" target="_blank">Firefox</a> or <a href=" http://windows.microsoft.com/en-us/internet-explorer/ie-10-worldwide-languages" target="_blank">IE10</a>.</p></div>');
      }
    });
    entry = $("body").attr("data-entry");
    Handlebars.registerHelper('i18n', function(text) {
      return new Handlebars.SafeString(lang[entry][text]);
    });
    switch (entry) {
      case "login":
        return require(["js/user/login"], function(login) {
          login.ready();
          return null;
        });
      case "register":
        return require(['backbone', 'module/register/main'], function(Backbone, register) {
          var AppRouter, router;
          AppRouter = Backbone.Router.extend({
            routes: {
              'success': 'success',
              '*actions': 'defaultRouter'
            }
          });
          router = new AppRouter();
          router.on('route:defaultRouter', function() {
            return register.loadModule('normal');
          });
          router.on('route:success', function() {
            return register.loadModule('success');
          });
          Backbone.history.start();
          return null;
        });
      case "reset":
        return require(['backbone', 'module/reset/main'], function(Backbone, reset) {
          var AppRouter, router;
          AppRouter = Backbone.Router.extend({
            routes: {
              'email': 'email',
              'password/:key': 'password',
              'expire': 'expire',
              'success': 'success',
              '*actions': 'defaultRouter'
            }
          });
          router = new AppRouter();
          router.on('route:defaultRouter', function() {
            return reset.loadModule('normal');
          });
          router.on('route:email', function() {
            return reset.loadModule('email');
          });
          router.on('route:password', function(key) {
            return reset.loadModule('password', key);
          });
          router.on('route:expire', function() {
            return reset.loadModule('expire');
          });
          router.on('route:success', function() {
            return reset.loadModule('success');
          });
          Backbone.history.start();
          return null;
        });
    }
  });

}).call(this);
