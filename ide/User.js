
/*
----------------------------
  User is a model containing user's data. Nothing more, nothing less.
  Currently most of the data is stored in cookie. But in the future,
  it might just fetch user data at the beginning.
----------------------------
 */

(function() {
  define(["ApiRequest", "event", "backbone"], function(ApiRequest, ide_event) {
    var UserState;
    UserState = {
      NotFirstTime: 2
    };
    return Backbone.Model.extend({
      initialize: function() {
        this.set({
          usercode: $.cookie("usercode"),
          username: MC.base64Decode($.cookie("usercode")),
          session: $.cookie("session_id")
        });
      },
      hasCredential: function() {
        return !!this.get("account");
      },
      isFirstVisit: function() {
        return !(UserState.NotFirstTime & this.get("state"));
      },
      userInfoAccuired: function(result) {
        var res;
        res = {
          email: MC.base64Decode(result.email),
          repo: result.mod_repo,
          tag: result.mod_tag,
          state: parseInt(result.state, 10),
          intercomHash: result.intercom_secret,
          account: result.account_id,
          awsAccessKey: result.access_key,
          awsSecretKey: result.secret_key
        };
        if (result.account_id === "demo_account") {
          res.account = "";
        } else {
          res.account = result.account_id;
        }
        this.set(res);
        if (this.isFirstVisit()) {
          ApiRequest("updateAccount", {
            params: {
              state: this.get("state") | UserState.NotFirstTime
            }
          });
        }
      },
      bootIntercom: function() {
        var intId;
        if (!window.Intercom) {
          intId = setInterval((function(_this) {
            return function() {
              if (window.Intercom) {
                console.log("Intercom Loaded, Booting Intercom");
                clearInterval(intId);
                _this.bootIntercom();
              }
            };
          })(this), 1000);
          return;
        }
        window.Intercom("boot", {
          app_id: "3rp02j1w",
          email: this.get("email"),
          username: this.get("username"),
          user_hash: this.get("intercomHash"),
          widget: {
            'activator': '#feedback'
          }
        });
      },
      fetch: function() {
        return ApiRequest("login", {
          username: this.get("username"),
          password: this.get("session")
        }).then((function(_this) {
          return function(result) {
            _this.userInfoAccuired(result);

            /* env:prod */
            return _this.bootIntercom();

            /* env:prod:end */
          };
        })(this), function(err) {
          if (err.error < 0) {
            window.location.reload();
          } else {
            App.logout();
          }
          throw err;
        });
      },
      acquireSession: function(password) {
        return ApiRequest("login", {
          username: this.get("username"),
          password: password
        }).then((function(_this) {
          return function(result) {
            $.cookie("session_id", result.session_id, {
              expires: 30,
              path: '/'
            });
            _this.set("session", result.session_id);
            _this.userInfoAccuired(result);
            _this.trigger("SessionUpdated");
          };
        })(this));
      },
      logout: function() {
        var cValue, ckey, domain, _ref;
        domain = {
          "domain": window.location.hostname.replace("ide", "")
        };
        _ref = $.cookie();
        for (ckey in _ref) {
          cValue = _ref[ckey];
          $.removeCookie(ckey, domain);
          $.removeCookie(ckey);
        }
      },
      changePassword: function(oldPwd, newPwd) {
        return ApiRequest("changePwd", {
          params: {
            password: oldPwd,
            new_password: newPwd
          }
        });
      },
      validateCredential: function(accessKey, secretKey) {
        return ApiRequest("validateCred", {
          access_key: accessKey,
          secret_key: secretKey
        });
      },
      changeCredential: function(account, accessKey, secretKey, force) {
        var self;
        if (account == null) {
          account = "";
        }
        if (accessKey == null) {
          accessKey = "";
        }
        if (secretKey == null) {
          secretKey = "";
        }
        if (force == null) {
          force = false;
        }
        self = this;
        return ApiRequest("updateCred", {
          access_key: accessKey,
          secret_key: secretKey,
          account_id: account,
          force: force
        }).then(function() {
          var attr;
          attr = {
            account: account,
            awsAccessKey: accessKey,
            awsSecretKey: secretKey
          };
          if (attr.awsAccessKey.length > 6) {
            attr.awsAccessKey = (new Array(accessKey.length - 6)).join("*") + accessKey.substr(-6);
          }
          if (attr.awsSecretKey.length > 6) {
            attr.awsSecretKey = (new Array(secretKey.length - 6)).join("*") + secretKey.substr(-6);
          }
          self.set(attr);
          self.trigger("change:credential");
          ide_event.trigger(ide_event.UPDATE_AWS_CREDENTIAL);
        });
      }
    });
  });

}).call(this);
