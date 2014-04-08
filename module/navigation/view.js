(function() {
  define(['event', 'constant', 'i18n!nls/lang.js', './module/navigation/template', './module/navigation/template_data', 'backbone', 'jquery', 'handlebars', 'UI.notification'], function(ide_event, constant, lang, template, template_data) {
    var NavigationView;
    NavigationView = Backbone.View.extend({
      el: $('#navigation'),
      events: {
        'click .stack-list li': 'stackListItemsClick',
        'click .app-list li': 'appListItemsClick',
        'click .show-unused-region': 'showEmptyRegionClick',
        'click .create-new-stack': 'createNewStackClick',
        'click .create-new-empty-stack': 'createNewEmptyStackClick',
        "click #off-canvas-app": "showOffCanvasApp",
        "click #off-canvas-stack": "showOffCanvasStack"
      },
      initialize: function() {
        this.listenTo(ide_event, 'SWITCH_TAB', this.hideNavigation);
        null;
        $("#off-canvas-menu").click(function() {
          if ($("#wrapper").hasClass("off-canvas")) {
            return $("wrapper").removeClass("off-canvas");
          }
          if ($("#nav-app-region").children(".nav-empty").length) {
            $("#off-canvas-stack").click();
          } else {
            $("#off-canvas-app").click();
          }
          $("#wrapper").addClass("off-canvas");
        });
        $("#off-canvas-overlay").click(function() {
          $("#wrapper").removeClass("off-canvas");
        });
      },
      hideOffCanvas: function() {
        $("#wrapper").removeClass("off-canvas");
      },
      showOffCanvasApp: function() {
        $("#nav-app-region").show();
        $("#nav-stack").hide();
        $("#off-canvas-app").toggleClass("selected", true);
        $("#off-canvas-stack").toggleClass("selected", false);
      },
      showOffCanvasStack: function() {
        $("#nav-app-region").hide();
        $("#nav-stack").show();
        $("#off-canvas-app").toggleClass("selected", false);
        $("#off-canvas-stack").toggleClass("selected", true);
      },
      render: function() {
        console.log('navigation render');
        $(this.el).html(template());
        ide_event.trigger(ide_event.NAVIGATION_COMPLETE);
        return null;
      },
      appListRender: function() {
        $(this.el).find('#nav-app-region').html(template_data.app_list_data(this.model.attributes));
        return null;
      },
      stackListRender: function() {
        $(this.el).find('#nav-stack-region').html(template_data.stack_list_data(this.model.attributes));
        return null;
      },
      regionEmtpyListRender: function() {
        $(this.el).find('#nav-region-empty-list').html(template_data.region_empty_list(this.model.attributes));
        return null;
      },
      regionListRender: function() {
        return null;
      },
      stackListItemsClick: function(event) {
        var tab_name, target;
        console.log('stack tab click event');
        target = event.currentTarget;
        tab_name = $(target).text();
        this.hideOffCanvas();
        return this.openDesignTab('OPEN_STACK', tab_name, $(target).attr('data-region-name'), $(target).attr('data-stack-id'));
      },
      appListItemsClick: function(event) {
        var tab_name, target;
        console.log('app tab click event');
        target = event.currentTarget;
        tab_name = $(target).text();
        this.hideOffCanvas();
        return this.openDesignTab('OPEN_APP', $.trim(tab_name), $(target).attr('data-region-name'), $(target).attr('data-app-id'));
      },
      showEmptyRegionClick: function() {
        $("#nav-region-empty-list").addClass("show");
      },
      createNewStackClick: function(event) {
        var region;
        region = $(event.currentTarget).closest("li").children("ul").children().eq(0).attr("data-region-name");
        if (region) {
          this.hideOffCanvas();
          this.openDesignTab('NEW_STACK', null, region, null);
        }
      },
      createNewEmptyStackClick: function(event) {
        var current_region_name, region_label;
        region_label = $(event.currentTarget).parent().attr('data-empty-region-label');
        current_region_name = null;
        _.map(constant.REGION_SHORT_LABEL, function(value, key) {
          if (value === region_label) {
            current_region_name = key;
            return current_region_name;
          }
        });
        this.hideOffCanvas();
        return this.openDesignTab('NEW_STACK', null, current_region_name, null);
      },
      regionNameClick: function(event) {
        var data_region_name;
        console.log('regionNameClick');
        console.log($(event.target).attr('data-region-name'));
        data_region_name = $(event.target).attr('data-region-name') === void 0 ? $(event.currentTarget).attr('data-region-name') : $(event.target).attr('data-region-name');
        return ide_event.trigger(ide_event.NAVIGATION_TO_DASHBOARD_REGION, data_region_name);
      },
      dashboardGlobal: function() {
        console.log('dashboardGlobal');
        return ide_event.trigger(ide_event.NAVIGATION_TO_DASHBOARD_REGION, 'global');
      },
      openDesignTab: function(type, tab_name, region_name, tab_id) {
        console.log('openDesignTab', type, tab_name, region_name, tab_id);
        if (MC.data.design_submodule_count !== -1) {
          return notification('warning', lang.ide.NAV_DESMOD_NOT_FINISH_LOAD, false);
        } else {
          return ide_event.trigger(ide_event.OPEN_DESIGN_TAB, type, tab_name, region_name, tab_id);
        }
      }
    });
    return NavigationView;
  });

}).call(this);
