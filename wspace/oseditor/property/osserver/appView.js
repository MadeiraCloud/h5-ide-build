define(['constant', '../OsPropertyView', './template', 'CloudResources', 'underscore', 'OsKp', '../ossglist/view', 'ApiRequest', 'ApiRequestOs', 'i18n!/nls/lang.js'], function(constant, OsPropertyView, template, CloudResources, _, OsKp, SgListView, ApiRequest, ApiRequestOs, lang) {
  return OsPropertyView.extend({
    events: {
      'click .os-server-image-info': 'openImageInfoPanel',
      'click .property-btn-get-system-log': 'openSysLogModal'
    },
    initialize: function() {
      this.sgListView = new SgListView({
        panel: this.panel,
        targetModel: this.model.embedPort()
      });
    },
    render: function() {
      var addrData, addressData, appData, flavorObj, _ref, _ref1, _ref2;
      appData = this.getRenderData();
      addrData = {};
      addressData = appData != null ? (_ref = appData.address) != null ? _ref.addresses : void 0 : void 0;
      if (addressData) {
        _.each(addressData, function(addrAry) {
          _.each(addrAry, function(addrObj) {
            if (addrObj.type === 'fixed') {
              addrData.fixedIp = addrObj.addr;
              addrData.macAddress = addrObj.mac_addr;
            }
            if (addrObj.type === 'floating') {
              addrData.floatingIp = addrObj.addr;
            }
            return null;
          });
          return null;
        });
      }
      this.flavorList = App.model.getOpenstackFlavors(Design.instance().get("provider"), Design.instance().region());
      flavorObj = this.flavorList.get(appData.flavor_id);
      appData.vcpus = flavorObj.get("vcpus");
      appData.ram = Math.round(flavorObj.get("ram") / 1024);
      appData.image_name = (_ref1 = this.model.getImage()) != null ? _ref1.name : void 0;
      appData.image_id = (_ref2 = this.model.getImage()) != null ? _ref2.id : void 0;
      this.$el.html(template.appTemplate(_.extend(appData, addrData)));
      this.$el.append(this.sgListView.render().el);
      return this;
    },
    openSysLogModal: function() {
      var region, reqApi, serverId, that;
      serverId = this.model.get('appId');
      that = this;
      region = Design.instance().region();
      reqApi = "os_server_GetConsoleOutput";
      ApiRequestOs(reqApi, {
        region: region,
        server_id: serverId
      }).then(this.refreshSysLog, this.refreshSysLog);
      new modalPlus({
        template: MC.template.modalInstanceSysLog({
          log_content: ''
        }),
        width: 900,
        title: lang.IDE.SYSTEM_LOG + serverId,
        confirm: {
          hide: true
        }
      }).tpl.attr("id", "modal-instance-sys-log");
      return false;
    },
    refreshSysLog: function(result) {
      var $contentElem, logContent;
      $('#modal-instance-sys-log .instance-sys-log-loading').hide();
      if (result && result.output) {
        logContent = result.output;
        $contentElem = $('#modal-instance-sys-log .instance-sys-log-content');
        $contentElem.html(MC.template.convertBreaklines({
          content: logContent
        }));
        $contentElem.show();
      } else {
        $('#modal-instance-sys-log .instance-sys-log-info').show();
      }
      return modal.position();
    },
    openImageInfoPanel: function() {
      var serverData, _ref, _ref1, _ref2;
      serverData = (_ref = this.getRenderData()) != null ? _ref.system_metadata : void 0;
      serverData.image_name = (_ref1 = this.model.getImage()) != null ? _ref1.name : void 0;
      serverData.image_id = (_ref2 = this.model.getImage()) != null ? _ref2.id : void 0;
      return this.showFloatPanel(template.imageTemplate(serverData));
    }
  }, {
    handleTypes: [constant.RESTYPE.OSSERVER],
    handleModes: ['app']
  });
});
