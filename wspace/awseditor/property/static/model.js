(function() {
  define(["../base/model", "Design", "constant", 'CloudResources'], function(PropertyModel, Design, constant, CloudResources) {
    var StaticModel;
    StaticModel = PropertyModel.extend({
      init: function(id) {
        var appId, component, data, isIGW, _ref;
        component = Design.instance().component(id);
        isIGW = component.type === constant.RESTYPE.IGW;
        this.set("isIGW", isIGW);
        if (this.isApp) {
          this.set("readOnly", true);
          appId = component.get("appId");
          data = (_ref = CloudResources(Design.instance().credentialId(), component.type, Design.instance().region()).get(appId)) != null ? _ref.toJSON() : void 0;
        }
        if (data) {
          if (data.attachments && data.attachments.length) {
            data.attachment_state = data.attachments[0].state;
          } else if (data.attachmentSet && data.attachmentSet.length) {
            data.attachment_state = data.attachmentSet[0].state;
          }
          this.set(data);
          this.set('appId', data.id);
        }
        return null;
      }
    });
    return new StaticModel();
  });

}).call(this);
