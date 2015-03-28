define(["Design", "../base/main", "./view", "constant", "CloudResources", "event"], function(Design, PropertyModule, view, constant, CloudResources) {
  return PropertyModule.extend({
    handleTypes: [constant.RESTYPE.MRTHGROUP],
    initStack: function(uid) {
      this.view = view;
      this.model = Design.instance().component(uid);
      this.view.mode = 'stack';
      return null;
    },
    afterLoadStack: function() {},
    initApp: function(uid) {
      this.view = view;
      this.model = Design.instance().component(uid);
      this.view.appJSON = CloudResources(Design.instance().credentialId(), constant.RESTYPE.MRTHGROUP, Design.instance().get('id')).toJSON();
      this.view.mode = 'app';
      return null;
    },
    initAppEdit: function(uid) {
      this.view = view;
      this.model = Design.instance().component(uid);
      this.view.appJSON = CloudResources(Design.instance().credentialId(), constant.RESTYPE.MRTHGROUP, Design.instance().get('id')).toJSON();
      this.view.mode = 'appedit';
      return null;
    }
  });
});
