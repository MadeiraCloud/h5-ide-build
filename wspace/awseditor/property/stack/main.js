(function() {
  define(['../base/main', './model', './view', '../sglist/main', 'event', "Design"], function(PropertyModule, model, view, sglist_main, ide_event, Design) {
    var StackModule;
    view.on('OPEN_ACL', function(uid) {
      PropertyModule.loadSubPanel("ACL", uid);
      return null;
    });
    StackModule = PropertyModule.extend({
      handleTypes: ["Stack", "default"],
      onUnloadSubPanel: function(id) {
        sglist_main.onUnloadSubPanel(id);
        if (id === "ACL") {
          this.model.getNetworkACL();
          return this.view.refreshACLList();
        }
      },

      /*  * # # # # # # # # # # #
       * For stack mode
       */
      initStack: function(uid) {
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = false;
        this.model.isStack = true;
        this.view = view;
        return null;
      },
      afterLoadStack: function() {
        sglist_main.loadModule(this.model);
        return null;
      },

      /*  * # # # # # # # # # # #
       * For app mode
       */
      initApp: function(uid) {
        this.model = model;
        this.model.isApp = true;
        this.model.isAppEdit = false;
        this.model.isStack = false;
        this.view = view;
        return null;
      },
      afterLoadApp: function() {
        sglist_main.loadModule(this.model);
        return null;
      },

      /*  * # # # # # # # # #
       */
      initAppEdit: function() {
        this.model = model;
        this.model.isApp = false;
        this.model.isAppEdit = true;
        this.model.isStack = false;
        this.view = view;
        return null;
      },
      afterLoadAppEdit: function() {
        sglist_main.loadModule(this.model);
        return null;
      }
    });
    return null;
  });

}).call(this);
