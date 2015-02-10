(function() {
  define(['../base/view', './template/app', 'i18n!/nls/lang.js', 'ApiRequest', 'kp_upload', 'Design', 'JsonExporter', "UI.modalplus"], function(PropertyView, template, lang, ApiRequest, kp_upload, Design, JsonExporter, modalPlus) {
    var InstanceAppView, download, genDownload;
    download = JsonExporter.download;
    genDownload = function(name, str) {
      return function() {
        var blob;
        if ($("body").hasClass("safari")) {
          blob = null;
        } else {
          blob = new Blob([str]);
        }
        if (!blob) {
          return {
            data: "data:text/plain;," + str,
            name: name
          };
        }
        download(blob, name);
        return null;
      };
    };
    InstanceAppView = PropertyView.extend({
      __kpUpload: null,
      events: {
        "click #property-app-keypair": "keyPairClick",
        "click #property-app-ami": "openAmiPanel",
        "click .property-btn-get-system-log": "openSysLogModal"
      },
      render: function() {
        var data;
        data = this.model.toJSON();
        data.windows = this.model.get('osType') === 'windows';
        this.$el.html(template(data));
        return this.model.attributes.name;
      },
      keyPairClick: function(event) {
        return this.proccessKpStuff();
      },
      proccessKpStuff: function(notOld) {
        var isOldDefaultKp, isOldKp, isOldOtherKp, kp;
        if (!notOld) {
          kp = this.model.resModel.connectionTargets("KeypairUsage")[0];
          isOldDefaultKp = kp && kp.isDefault() && kp.get('appId') === ("DefaultKP---" + (Design.instance().get('id')));
          isOldOtherKp = kp && !kp.isDefault();
          isOldKp = isOldDefaultKp || isOldOtherKp;
          if (isOldKp) {
            this.model.downloadKp(kpName);
          }
        }
        if (!isOldKp && this.model.get('osType') === 'windows') {
          return this.decryptPassword();
        } else {
          return this.loginPrompt();
        }
      },
      loginPrompt: function() {
        var keypair, me;
        keypair = this.model.get('keyName');
        new modalPlus({
          title: keypair,
          width: 420,
          template: MC.template.modalDownloadKP({
            loginCmd: this.model.get("loginCmd"),
            windows: this.model.get("osType") === "windows"
          }),
          confirm: {
            hide: true
          }
        });
        me = this;
        $('#keypair-cmd').off('click').on('click', function(event) {
          if (event.currentTarget.select) {
            event.currentTarget.select();
          }
          return event.stopPropagation();
        });
        return false;
      },
      decryptPassword: function() {
        var me;
        me = this;
        this.kpModal = new modalPlus({
          title: lang.IDE.GET_WINDOWS_PASSWORD,
          width: 500,
          template: MC.template.modalDecryptPassword({
            name: this.model.get('keyName'),
            isOldKp: false
          }),
          disableFooter: true
        });
        this.model.getPassword().then(function(data) {
          return me.updateKPModal("check", !!data);
        }, function() {
          return notification('error', lang.NOTIFY.ERR_GET_PASSWD_FAILED);
        });
        $("#do-kp-decrypt").off('click').on('click', function(event) {
          return me.model.getPassword(me.__kpUpload.getData()).then(function(data) {
            return me.updateKPModal("got", data);
          }, function() {
            return notification('error', lang.NOTIFY.ERR_GET_PASSWD_FAILED);
          });
        });
        return false;
      },
      updateKPModal: function(action, data, data2, data3) {
        var $kpPwdInput, kp, kpPwdInput, pwd, success;
        if (this.kpModal.isClosed) {
          return;
        }
        if (action === 'check') {
          if (data) {
            this.__kpUpload && this.__kpUpload.remove();
            this.__kpUpload = new kp_upload({
              type: "Private Key"
            });
            this.__kpUpload.on('load', function() {
              return $("#do-kp-decrypt").prop('disabled', false);
            });
            this.kpModal.$('.import-zone').html(this.__kpUpload.render().el);
            return this.kpModal.$('.decrypt-action').show();
          } else {
            this.kpModal.$('.import-zone').html('');
            return this.kpModal.$('.no-password').show();
          }
        } else if (action === 'got') {
          $("#do-kp-decrypt").prop('disabled', true);
          $kpPwdInput = $('#keypair-pwd');
          kpPwdInput = $kpPwdInput.get(0);
          $kpPwdInput.val(data);
          kpPwdInput.select();
          kpPwdInput.focus();
          $('#do-kp-decrypt').text('Decrypted');
          return $('.change-pw-recommend').show();
        } else if (action === 'download') {
          success = data;
          pwd = data2;
          kp = data3 || data2;
          $('#keypair-kp-download').off('click').on('click', genDownload("" + (this.model.get('keyName')) + ".pem", kp));
          $('#keypair-loading').hide();
          $('#keypair-body').show();
          if (this.model.get('osType') === 'windows') {
            $('#keypair-pwd-old').val(pwd).off('click').on('click', function() {
              return this.select();
            });
            return $('#keypair-show').one('click', function() {
              return $('#keypair-pwd-old').prop('type', 'input');
            });
          }
        }
      },
      openAmiPanel: function(event) {
        this.trigger("OPEN_AMI", $(event.target).data("uid"));
        return false;
      },
      openSysLogModal: function() {
        var instanceId, that;
        instanceId = this.model.get('instanceId');
        this.sysLogModal = new modalPlus({
          template: MC.template.modalInstanceSysLog({
            log_content: ''
          }),
          width: 900,
          title: lang.IDE.SYSTEM_LOG + instanceId,
          confirm: {
            hide: true
          }
        }).tpl.attr("id", "modal-instance-sys-log");
        that = this;
        ApiRequest("ins_GetConsoleOutput", {
          key_id: Design.instance().credentialId(),
          region_name: Design.instance().region(),
          instance_id: instanceId
        }).then(function(data) {
          return that.refreshSysLog(data.GetConsoleOutputResponse);
        }, function() {
          return that.refreshSysLog();
        });
        return false;
      },
      refreshSysLog: function(result) {
        var $contentElem, logContent;
        $('#modal-instance-sys-log .instance-sys-log-loading').hide();
        if (result && result.output) {
          logContent = Base64.decode(result.output);
          $contentElem = $('#modal-instance-sys-log .instance-sys-log-content');
          $contentElem.html(MC.template.convertBreaklines({
            content: logContent
          }));
          $contentElem.show();
        } else {
          $('#modal-instance-sys-log .instance-sys-log-info').show();
        }
        return this.sysLogModal.resize();
      }
    });
    return new InstanceAppView();
  });

}).call(this);
