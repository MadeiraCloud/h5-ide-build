(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['./DashboardTpl', './DashboardTplData', "./ImportAppTpl", "constant", "i18n!/nls/lang.js", "CloudResources", "UI.modalplus", 'AppAction', "backbone", "UI.tooltip", "UI.table", "UI.bubble", "UI.scrollbar", "UI.nanoscroller"], function(Template, TemplateData, ImportAppTpl, constant, lang, CloudResources, Modal, AppAction) {
    return Backbone.View.extend({
      events: {
        'click #OsReloadResource': 'reloadResource',
        'click .icon-new-stack': 'createStack',
        'click .ops-list-switcher': 'switchAppStack',
        "click .dash-ops-list > li": "openItem",
        "click .dash-ops-list .delete-stack": "deleteStack",
        'click .dash-ops-list .duplicate-stack': 'duplicateStack',
        "click .dash-ops-list .start-app": "startApp",
        'click .dash-ops-list .stop-app': 'stopApp',
        'click .dash-ops-list .terminate-app': 'terminateApp',
        'click .resource-tab': 'switchResource',
        "click #ImportStack": "importStack",
        "click #VisualizeApp": "importApp"
      },
      resourcesTab: 'OSSERVER',
      initialize: function() {
        var self;
        this.opsListTab = "stack";
        this.lastUpdate = +(new Date());
        this.appAction = new AppAction({
          workspace: this.workspace
        });
        this.setElement($(Template.frame()).eq(0).appendTo("#main"));
        this.updateOpsList();
        this.updateResList();
        this.updateRegionResources(true);
        self = this;
        setInterval(function() {
          if (!$("#OsReloadResource").hasClass("reloading")) {
            $("#OsReloadResource").text(MC.intervalDate(self.lastUpdate / 1000));
          }
        }, 1000 * 60);
        MC.template.osDashboardBubble = _.bind(this.osDashboardBubble, this);
      },
      awake: function() {
        this.$el.show().children(".nano").nanoScroller();
      },
      sleep: function() {
        return this.$el.hide();
      },
      osDashboardBubble: function(data) {
        var d, _ref;
        d = {
          id: data.id,
          data: (_ref = this.model.getOsResDataById(constant.RESTYPE[data.type], data.id)) != null ? _ref.toJSON() : void 0
        };
        d.data = d.data.system_metadata;
        _.each(d.data, function(e, key) {
          if (_.isBoolean(e)) {
            d.data[key] = e.toString();
          }
          if (e === "") {
            d.data[key] = "None";
          }
          if ((_.isArray(e)) && e.length === 0) {
            d.data[key] = ['None'];
          }
          if ((_.isObject(e)) && (!_.isArray(e))) {
            return delete d.data[key];
          }
        });
        return TemplateData.bubbleResourceInfo(d);
      },

      /*
        rendering
       */
      updateOpsList: function() {
        var $opsListView, $switcher, apps, filter, html, mapper, stacks, tojson;
        $opsListView = this.$el.find(".dash-ops-list-wrapper");
        tojson = {
          thumbnail: true
        };
        filter = function(m) {
          return m.isExisting();
        };
        mapper = function(m) {
          return m.toJSON(tojson);
        };
        stacks = App.model.stackList().filter(filter);
        apps = App.model.appList().filter(filter);
        $switcher = $opsListView.children("nav");
        $switcher.find(".count").text(apps.length);
        $switcher.find(".stack").find(".count").text(stacks.length);
        if (this.opsListTab === "stack") {
          html = Template.stackList(stacks.map(mapper));
        } else {
          html = Template.appList(apps.map(mapper));
        }
        $opsListView.children("ul").html(html);
      },
      updateResList: function() {
        return this.$('.dash-ops-resource-list').html(Template.resourceList({}));
      },
      updateAppProgress: function(model) {
        var $li;
        if (model.get("region") === this.model.region && this.regionOpsTab === "app") {
          console.log("Dashboard Updated due to app progress changes.");
          $li = $el.find(".dash-ops-list").children("[data-id='" + model.id + "']");
          if (!$li.length) {
            return;
          }
          $li.children(".region-resource-progess").show().css({
            width: model.get("progress") + "%"
          });
        }
      },

      /*
        View logics
       */
      switchAppStack: function(evt) {
        var $target;
        $target = $(evt.currentTarget);
        if ($target.hasClass("on")) {
          return;
        }
        $target.addClass("on").siblings().removeClass("on");
        this.opsListTab = $target.hasClass("stack") ? "stack" : "app";
        this.updateOpsList();
      },
      switchResource: function(evt) {
        this.$(".resource-list-nav").children().removeClass("on");
        this.resourcesTab = $(evt.currentTarget).addClass("on").attr("data-type");
        this.updateRegionResources();
      },
      updateResourceCount: function(init) {
        var $nav, child, count, provider, quotaMap, r, resourceCount, resourceMap, that;
        that = this;
        provider = App.user.get("default_provider");
        quotaMap = App.model.getOpenstackQuotas(provider);
        $nav = $(".resource-list-nav");
        resourceMap = {
          elbs: "Neutron::port",
          fips: "Neutron::floatingip",
          rts: "Neutron::router",
          servers: "Nova::instances",
          snaps: "Cinder::snapshots",
          volumes: "Cinder::volumes"
        };
        if (init === true && quotaMap) {
          _.each(resourceMap, function(value, key) {
            var dom, quota;
            dom = $nav.children("." + key);
            quota = quotaMap[value];
            that.animateUsage(dom, 0, quota);
            return dom.find('.count-usage').text("-");
          });
        }
        resourceCount = this.model.getResourcesCount();
        for (r in resourceCount) {
          count = resourceCount[r];
          child = $nav.children("." + r);
          if (typeof count === "number" && quotaMap) {
            this.animateUsage(child, count, quotaMap[resourceMap[r]]);
          }
        }
      },
      animateUsage: function(elem, usage, quota) {
        var $path;
        $path = elem.find(".quota-path.usage");
        $path.attr("stroke-dashoffset", ($path[0].getTotalLength() * (1 - usage / quota)).toFixed(2));
        elem.find('.count-usage').text(usage);
        return elem.find('.count-quota').text("/" + quota);
      },
      updateRegionResources: function(type) {
        var tpl, _ref;
        this.updateResourceCount(type);
        if (type && (_ref = this.resourcesTab, __indexOf.call(type, _ref) < 0)) {
          return;
        }
        type = constant.RESTYPE[this.resourcesTab];
        if (!this.model.isOsResReady(type)) {
          tpl = '<div class="dashboard-loading"><div class="loading-spinner"></div></div>';
        } else {
          tpl = TemplateData["resource_" + this.resourcesTab](this.model.getOsResData(type));
        }
        return $(".resource-list-body").html(tpl);
      },
      openItem: function(event) {
        return App.openOps($(event.currentTarget).attr("data-id"));
      },
      createStack: function(event) {
        return App.createOps(this.model.region, this.model.provider);
      },
      markUpdated: function() {
        this.lastUpdate = +(new Date());
      },
      reloadResource: function() {
        if ($("#OsReloadResource").hasClass("reloading")) {
          return;
        }
        $("#OsReloadResource").addClass("reloading").text("");
        App.discardAwsCache().done(function() {
          return $("#OsReloadResource").removeClass("reloading").text(lang.IDE.DASH_TPL_JUST_NOW);
        });
      },
      deleteStack: function(event) {
        this.appAction.deleteStack($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      duplicateStack: function(event) {
        this.appAction.duplicateStack($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      startApp: function(event) {
        this.appAction.startApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      stopApp: function(event) {
        this.appAction.stopApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      terminateApp: function(event) {
        this.appAction.terminateApp($(event.currentTarget).closest("li").attr("data-id"));
        return false;
      },
      importStack: function() {
        var hanldeFile, modal, reader, zone;
        modal = new Modal({
          title: lang.IDE.POP_IMPORT_JSON_TIT,
          template: Template.importJSON(),
          width: "470",
          disableFooter: true
        });
        reader = new FileReader();
        reader.onload = function(evt) {
          var error;
          error = App.importJson(reader.result);
          if (_.isString(error)) {
            $("#import-json-error").html(error);
          } else {
            modal.close();
            reader = null;
          }
          return null;
        };
        reader.onerror = function() {
          $("#import-json-error").html(lang.IDE.POP_IMPORT_ERROR);
          return null;
        };
        hanldeFile = function(evt) {
          var files;
          evt.stopPropagation();
          evt.preventDefault();
          $("#modal-import-json-dropzone").removeClass("dragover");
          $("#import-json-error").html("");
          evt = evt.originalEvent;
          files = (evt.dataTransfer || evt.target).files;
          if (!files || !files.length) {
            return;
          }
          reader.readAsText(files[0]);
          return null;
        };
        $("#modal-import-json-file").on("change", hanldeFile);
        zone = $("#modal-import-json-dropzone").on("drop", hanldeFile);
        zone.on("dragenter", function() {
          return $(this).closest("#modal-import-json-dropzone").toggleClass("dragover", true);
        });
        zone.on("dragleave", function() {
          return $(this).closest("#modal-import-json-dropzone").toggleClass("dragover", false);
        });
        zone.on("dragover", function(evt) {
          var dt;
          dt = evt.originalEvent.dataTransfer;
          if (dt) {
            dt.dropEffect = "copy";
          }
          evt.stopPropagation();
          evt.preventDefault();
          return null;
        });
        return null;
      },
      importApp: function() {
        var self;
        self = this;
        if (!this.visModal) {
          this.visModal = new Modal({
            title: lang.IDE.DASH_IMPORT_APP,
            width: "770",
            template: ImportAppTpl({}),
            disableFooter: true,
            compact: true,
            onClose: function() {
              self.visModal = null;
            }
          });
          this.visModal.tpl.on("click", "#VisualizeReload", function() {
            self.importApp();
            self.visModal.tpl.find(".unmanaged-vpc-empty").hide();
            self.visModal.tpl.find(".loading-spinner").show();
            return false;
          });
          this.visModal.tpl.on("click", ".visualize-vpc-btn", function(event) {
            return self.doImportApp(event);
          });
        }
        this.model.importApp().then(function(data) {
          return self.visModal.tpl.find(".modal-body").html(ImportAppTpl({
            ready: true,
            data: data
          }));
        }, function() {
          return self.visModal.tpl.find(".modal-body").html(ImportAppTpl({
            fail: true
          }));
        });
      },
      doImportApp: function(evt) {
        var $tgt, id, region;
        $tgt = $(evt.currentTarget);
        id = $tgt.attr("data-id");
        region = $tgt.closest("ul").attr("data-region");
        this.visModal.close();
        App.openOps(App.model.createImportOps(region, this.model.provider, id));
        return false;
      }
    });
  });

}).call(this);
