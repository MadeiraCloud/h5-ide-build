(function() {
  define(["Design", "../base/main", "./view", "constant", "event"], function(Design, PropertyModule, view, constant) {
    return PropertyModule.extend({
      handleTypes: ["MarathonDepIn", "MarathonDepOut"],
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
        this.view.mode = 'app';
        return null;
      },
      initAppEdit: function(uid) {
        this.view = view;
        this.model = Design.instance().component(uid);
        this.view.mode = 'appedit';
        return null;
      }
    });
  });

}).call(this);
