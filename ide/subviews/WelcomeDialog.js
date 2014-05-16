(function() {
  define(["./WelcomeTpl", 'i18n!nls/lang.js', "backbone"], function(WelcomeTpl, lang) {
    var WelcomeDialog;
    WelcomeDialog = Backbone.View.extend({
      events: {
        "click #WelcomeSkip": "skip",
        "click #WelcomeBack": "back",
        "click #WelcomeDone": "done",
        "click #WelcomeClose": "close",
        "click #CredSetupSubmit": "submitCred",
        "keyup #CredSetupAccount, #CredSetupAccessKey, #CredSetupSecretKey": "updateSubmitBtn"
      },
      initialize: function(options) {
        var attributes;
        attributes = {
          username: App.user.get("username")
        };
        modal(WelcomeTpl(attributes));
        this.setElement($("#modal-box"));
      },
      skip: function() {
        $("#WelcomeSettings").hide();
        return $("#WelcomeSkipWarning").show();
      },
      back: function() {
        $("#WelcomeSettings").show();
        return $("#WelcomeSkipWarning").hide();
      },
      done: function() {
        $("#WelcomeSettings, #WelcomeSkipWarning, #WelcomeCredUpdate").hide();
        $("#WelcomeDoneWrap").show();
        if (App.user.hasCredential()) {
          $("#WelcomeDoneTitDemo").hide();
          return $("#WelcomeDoneTit").children("span").text(App.user.get("account"));
        } else {
          $("#WelcomeDoneTitDemo").show();
          return $("#WelcomeDoneTit").hide();
        }
      },
      close: function() {
        return modal.close();
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
        $("#WelcomeSettings").hide();
        $("#WelcomeCredUpdate").show();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.validateCredential(accesskey, privatekey).then(function() {
          self.setCred();
        }, function() {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_VALIDATE);
          self.showCredSetup();
        });
      },
      setCred: function() {
        var accesskey, account, privatekey, self;
        account = $("#CredSetupAccount").val();
        accesskey = $("#CredSetupAccessKey").val();
        privatekey = $("#CredSetupSecretKey").val();
        self = this;
        return App.user.changeCredential(account, accesskey, privatekey, true).then(function() {
          self.done();
        }, function(err) {
          $("#CredSetupMsg").text(lang.ide.SETTINGS_ERR_CRED_UPDATE);
          self.showCredSetup();
        });
      },
      showCredSetup: function() {
        $("#WelcomeDialog").children().hide();
        $("#WelcomeSettings").show();
        $("#CredSetupAccount").focus()[0].select();
        this.updateSubmitBtn();
      }
    });
    return WelcomeDialog;
  });

}).call(this);
