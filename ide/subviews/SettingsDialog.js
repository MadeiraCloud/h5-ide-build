(function() {
  define(["./SettingsDialogTpl", 'i18n!nls/lang.js', "ApiRequest", "backbone"], function(SettingsTpl, lang, ApiRequest) {
    var SettingsDialog;
    SettingsDialog = Backbone.View.extend({
      events: {
        "click #SettingsNav span": "switchTab",
        "click #AccountPwd": "showPwd",
        "click #AccountCancelPwd": "hidePwd",
        "click #AccountUpdatePwd": "changePwd",
        "click .cred-setup, .cred-cancel": "showCredSetup",
        "click .cred-setup-cancel": "cancelCredSetup",
        "click #CredSetupRemove": "showRemoveCred",
        "click #CredRemoveConfirm": "removeCred",
        "click #CredSetupSubmit": "submitCred",
        "click #CredSetupConfirm": "confirmCred",
        "click #TokenCreate": "createToken",
        "click .tokenControl .icon-edit": "editToken",
        "click .tokenControl .icon-delete": "removeToken",
        "click .tokenControl .tokenDone": "doneEditToken",
        "click #TokenRemove": "confirmRmToken",
        "click #TokenRmCancel": "cancelRmToken",
        "keyup #CredSetupAccount, #CredSetupAccessKey, #CredSetupSecretKey": "updateSubmitBtn"
      },
      initialize: function(options) {
        var attributes, defaultTab;
        attributes = {
          username: App.user.get("username"),
          email: App.user.get("email"),
          account: App.user.get("account"),
          awsAccessKey: App.user.get("awsAccessKey"),
          awsSecretKey: App.user.get("awsSecretKey"),
          credRemoveTitle: sprintf(lang.ide.SETTINGS_CRED_REMOVE_TIT, App.user.get("username")),
          credNeeded: !!(_.reduce(_.map(MC.data.app_list, function(el) {
            return el.length;
          }), (function(m, n) {
            return m + n;
          }), 0))
        };
        modal(SettingsTpl(attributes));
        this.setElement($("#modal-box"));
        defaultTab = 0;
        if (options) {
          defaultTab = options.defaultTab || 0;
        }
        $("#SettingsNav").children().eq(defaultTab).click();
        this.updateTokenTab();
      },
      updateCredSettings: function() {
        var attributes;
        attributes = {
          username: App.user.get("username"),
          email: App.user.get("email"),
          account: App.user.get("account"),
          awsAccessKey: App.user.get("awsAccessKey"),
          awsSecretKey: App.user.get("awsSecretKey"),
          credRemoveTitle: sprintf(lang.ide.SETTINGS_CRED_REMOVE_TIT, App.user.get("username"))
        };
        $("#modal-box").html(SettingsTpl(attributes));
        return $("#SettingsNav").children().eq(SettingsDialog.TAB.Credential).click();
      },
      switchTab: function(evt) {
        var $this;
        $this = $(evt.currentTarget);
        if ($this.hasClass("selected")) {
          return;
        }
        $("#SettingsBody").children().hide();
        $("#SettingsNav").children().removeClass("selected");
        $("#" + $this.addClass("selected").attr("data-target")).show();
      },
      showPwd: function() {
        $("#AccountPwd").hide();
        $("#AccountPwdWrap").show();
        $("#AccountCurrentPwd").focus();
      },
      hidePwd: function() {
        $("#AccountPwd").show();
        $("#AccountPwdWrap").hide();
        $("#AccountCurrentPwd, #AccountNewPwd").val("");
        $("#AccountInfo").empty();
      },
      changePwd: function() {
        var new_pwd, old_pwd;
        old_pwd = $("#AccountCurrentPwd").val() || "";
        new_pwd = $("#AccountNewPwd").val() || "";
        if (old_pwd.length < 6 || new_pwd.length < 6) {
          $('#AccountInfo').text(lang.ide.SETTINGS_ERR_INVALID_PWD);
          return;
        }
        $("#AccountInfo").empty();
        $("#AccountUpdatePwd").attr("disabled", "disabled");
        App.user.changePassword(old_pwd, new_pwd).then(function() {
          notification('info', lang.ide.SETTINGS_UPDATE_PWD_SUCCESS);
          $("#AccountCancelPwd").click();
          $("#AccountUpdatePwd").removeAttr("disabled");
        }, function(err) {
          if (err.error === 2) {
            $('#AccountInfo').html("" + lang.ide.SETTINGS_ERR_WRONG_PWD + " <a href='/reset/' target='_blank'>" + lang.ide.SETTINGS_INFO_FORGET_PWD + "</a>");
          } else {
            $('#AccountInfo').text(lang.ide.SETTINGS_UPDATE_PWD_FAILURE);
          }
          return $("#AccountUpdatePwd").removeAttr("disabled");
        });
      },
      showCredSetup: function() {
        $("#CredentialTab").children().hide();
        $("#CredSetupWrap").show();
        $("#CredSetupAccount").focus()[0].select();
        $("#CredSetupRemove").toggle(App.user.hasCredential());
        this.updateSubmitBtn();
      },
      cancelCredSetup: function() {
        $("#CredentialTab").children().hide();
        if (App.user.hasCredential()) {
          $("#CredAwsWrap").show();
        } else {
          $("#CredDemoWrap").show();
        }
      },
      showRemoveCred: function() {
        $("#CredentialTab").children().hide();
        $("#CredRemoveWrap").show();
      },
      removeCred: function() {
        var self;
        $("#CredentialTab").children().hide();
        $("#CredRemoving").show();
        $("#modal-box .modal-close").hide();
        self = this;
        App.user.changeCredential().then(function() {
          self.updateCredSettings();
        }, function() {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_REMOVE);
          $("#modal-box .modal-close").show();
          return self.showCredSetup();
        });
      },
      updateSubmitBtn: function() {
        var accesskey, account, privatekey;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        if (account.length && accesskey.length && privatekey.length) {
          $("#CredSetupSubmit").removeAttr("disabled");
        } else {
          $("#CredSetupSubmit").attr("disabled", "disabled");
        }
      },
      submitCred: function() {
        var accesskey, privatekey, self;
        $("#CredentialTab").children().hide();
        $("#CredUpdating").show();
        $("#modal-box .modal-close").hide();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.validateCredential(accesskey, privatekey).then(function() {
          self.setCred();
        }, function() {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_VALIDATE);
          $("#modal-box .modal-close").show();
          self.showCredSetup();
        });
      },
      setCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.changeCredential(account, accesskey, privatekey, false).then(function() {
          return self.updateCredSettings();
        }, function(err) {
          if (err.error === ApiRequest.Errors.ChangeCredConfirm) {
            self.showCredConfirm();
          } else {
            self.showCredUpdateFail();
          }
        });
      },
      showCredUpdateFail: function() {
        $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_UPDATE);
        $("#modal-box .modal-close").show();
        return this.showCredSetup();
      },
      showCredConfirm: function() {
        $("#CredentialTab").children().hide();
        $("#CredConfirmWrap").show();
        return $("#modal-box .modal-close").show();
      },
      confirmCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        App.user.changeCredential(account, accesskey, privatekey, true).then(function() {
          return self.updateCredSettings();
        }, function() {
          return self.showCredUpdateFail();
        });
      },
      editToken: function(evt) {
        var $p, $t;
        $t = $(evt.currentTarget);
        $p = $t.closest("li").toggleClass("editing", true);
        $p.children(".tokenName").removeAttr("readonly").focus().select();
      },
      removeToken: function(evt) {
        var $p, name;
        $p = $(evt.currentTarget).closest("li");
        name = $p.children(".tokenName").val();
        this.rmToken = $p.children(".tokenToken").text();
        $("#TokenManager").hide();
        $("#TokenRmConfirm").show();
        $("#TokenRmTit").text(sprintf(lang.ide.SETTINGS_CONFIRM_TOKEN_RM_TIT, name));
      },
      createToken: function() {
        var self;
        $("#TokenCreate").attr("disabled", "disabled");
        self = this;
        Q.defer().promise.then(function() {
          self.updateTokenTab();
          return $("#TokenCreate").removeAttr("disabled");
        }, function() {
          return $("#TokenCreate").removeAttr("disabled");
        });
      },
      doneEditToken: function(evt) {
        var $p;
        $p = $(evt.currentTarget).closest("li").removeClass("editing");
        $p.children(".tokenName").attr("readonly", true);
        Q.defer().promise.then(function() {}, function() {
          var oldName;
          oldName = "";
          return $p.children(".tokenName").val(oldName);
        });
      },
      confirmRmToken: function() {
        var self;
        $("#TokenRemove").attr("disabled", "disabled");
        self = this;
        Q.defer().promise.then(function() {
          self.updateTokenTab();
          return self.cancelRmToken();
        }, function() {
          return notification("Fail to delete access token, please retry.");
        });
      },
      cancelRmToken: function() {
        this.rmToken = "";
        $("#TokenManager").show();
        $("#TokenRmConfirm").hide();
      },
      updateTokenTab: function() {
        var tokens;
        tokens = [
          {
            name: "Token1",
            token: "aaabbbccc"
          }, {
            name: "Token2",
            token: "bbbdddccc"
          }
        ];
        if (tokens.length) {
          $("#TokenManager").children("ul").html(MC.template.accessTokenTable(tokens));
        } else {
          $("#TokenManager").empty();
        }
      }
    });
    SettingsDialog.TAB = {
      Normal: 0,
      Credential: 1,
      Token: 2
    };
    return SettingsDialog;
  });

}).call(this);
