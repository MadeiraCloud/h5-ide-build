define(["Design", "../base/main", "./view", "constant", "event"], function(Design, PropertyModule, view, constant) {
  return PropertyModule.extend({
    handleTypes: ["Stack", "default"],
    initStack: function(uid) {
      this.view = view;
      this.model = Design.instance();
      this.view.mode = 'stack';
      return null;
    },
    afterLoadStack: function() {},
    initApp: function(uid) {
      this.view = view;
      this.model = Design.instance();
      this.view.mode = 'app';
      return null;
    },
    initAppEdit: function(uid) {
      this.view = view;
      this.model = Design.instance();
      this.view.mode = 'appedit';
      return null;
    }
  });
});
