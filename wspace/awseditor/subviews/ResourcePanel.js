(function() {
  define(["CloudResources", "Design", "../template/TplLeftPanel", "constant", 'dhcp', 'snapshotManager', 'rds_snapshot', 'sslcert_manage', 'sns_manage', 'kp_manage', 'rds_pg', 'rds_snapshot', './AmiBrowser', 'i18n!/nls/lang.js', 'ApiRequest', 'OpsModel', "backbone", "UI.nanoscroller", "UI.dnd"], function(CloudResources, Design, LeftPanelTpl, constant, dhcpManager, EbsSnapshotManager, RdsSnapshotManager, sslCertManager, snsManager, keypairManager, rdsPgManager, rdsSnapshot, AmiBrowser, lang, ApiRequest, OpsModel) {
    var LcItemView, __resizeAccdTO;
    __resizeAccdTO = null;
    $(window).on("resize", function() {
      if (__resizeAccdTO) {
        clearTimeout(__resizeAccdTO);
      }
      __resizeAccdTO = setTimeout(function() {
        return $("#OpsEditor").filter(":visible").children(".OEPanelLeft").trigger("RECALC");
      }, 150);
    });
    MC.template.resPanelAmiInfo = function(data) {
      var ami, config, e, _ref;
      if (!data.region || !data.imageId) {
        return;
      }
      ami = CloudResources(Design.instance().credentialId(), constant.RESTYPE.AMI, data.region).get(data.imageId);
      if (!ami) {
        return;
      }
      ami = ami.toJSON();
      ami.imageSize = ami.imageSize || ((_ref = ami.blockDeviceMapping[ami.rootDeviceName]) != null ? _ref.volumeSize : void 0);
      try {
        config = App.model.getOsFamilyConfig(data.region);
        config = config[ami.osFamily] || config[constant.OS_TYPE_MAPPING[ami.osType]];
        config = ami.rootDeviceType === "ebs" ? config.ebs : config['instance store'];
        config = config[ami.architecture];
        config = config[ami.virtualizationType || "paravirtual"];
        ami.instanceType = config.join(", ");
      } catch (_error) {
        e = _error;
      }
      return MC.template.bubbleAMIInfo(ami);
    };
    MC.template.resPanelDbSnapshot = function(data) {
      var ss;
      if (!data.region || !data.id) {
        return;
      }
      ss = CloudResources(Design.instance().credentialId(), constant.RESTYPE.DBSNAP, data.region).get(data.id);
      if (!ss) {
        return;
      }
      return LeftPanelTpl.resourcePanelBubble(ss.toJSON());
    };
    MC.template.resPanelSnapshot = function(data) {
      var newData, ss;
      if (!data.region || !data.id) {
        return;
      }
      ss = CloudResources(Design.instance().credentialId(), constant.RESTYPE.SNAP, data.region).get(data.id);
      if (!ss) {
        return;
      }
      newData = {};
      _.each(ss.toJSON(), function(value, key) {
        var newKey;
        newKey = lang.IDE["DASH_BUB_" + key.toUpperCase()] || key;
        return newData[newKey] = value;
      });
      return LeftPanelTpl.resourcePanelBubble(newData);
    };
    LcItemView = Backbone.View.extend({
      tagName: 'li',
      className: 'resource-item asg',
      initialize: function(options) {
        this.parent = options.parent;
        (this.parent || this).$el.find(".resource-list-asg").append(this.$el);
        this.listenTo(this.model, 'change:name', this.render);
        this.listenTo(this.model, 'change:imageId', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.render();
        this.$el.attr({
          "data-type": "ASG",
          "data-option": '{"lcId":"' + this.model.id + '"}'
        });
      },
      render: function() {
        return this.$el.html(LeftPanelTpl.reuse_lc({
          name: this.model.get("name"),
          cachedAmi: this.model.getAmi() || this.model.get("cachedAmi")
        }));
      }
    });
    return Backbone.View.extend({
      events: {
        "click .btn-fav-ami": "toggleFav",
        "OPTION_CHANGE .AmiTypeSelect": "changeAmiType",
        "click .BrowseCommunityAmi": "browseCommunityAmi",
        "click .ManageEbsSnapshot": "manageEbsSnapshot",
        "click .ManageRdsSnapshot": "manageRdsSnapshot",
        "click .fixedaccordion-head": "updateAccordion",
        "RECALC": "recalcAccordion",
        "mousedown .resource-item": "startDrag",
        "click .refresh-resource-panel": "refreshPanelData",
        'click .resources-dropdown-wrapper li': 'resourcesMenuClick',
        'OPTION_CHANGE #resource-list-sort-select-snapshot': 'resourceListSortSelectSnapshotEvent',
        'OPTION_CHANGE #resource-list-sort-select-rds-snapshot': 'resourceListSortSelectRdsEvent'
      },
      initialize: function(options) {
        var credentialId, design, region;
        _.extend(this, options);
        this.subViews = [];
        region = this.workspace.design.region();
        credentialId = this.workspace.design.credentialId();
        this.listenTo(CloudResources(credentialId, "MyAmi", region), "update", this.updateMyAmiList);
        this.listenTo(CloudResources(credentialId, constant.RESTYPE.AZ, region), "update", this.updateAZ);
        this.listenTo(CloudResources(credentialId, constant.RESTYPE.SNAP, region), "update", this.updateSnapshot);
        this.listenTo(CloudResources(credentialId, constant.RESTYPE.DBSNAP, region), "update", this.updateRDSSnapshotList);
        design = this.workspace.design;
        this.listenTo(design, Design.EVENT.ChangeResource, this.onResChanged);
        this.listenTo(design, Design.EVENT.AddResource, this.updateDisableItems);
        this.listenTo(design, Design.EVENT.RemoveResource, this.updateDisableItems);
        this.listenTo(design, Design.EVENT.AddResource, this.updateLc);
        this.listenTo(this.workspace, "toggleRdsFeature", this.toggleRdsFeature);
        this.__amiType = "QuickStartAmi";
        this.setElement(this.parent.$el.find(".OEPanelLeft"));
        $(document).off('keydown', this.bindKey.bind(this)).on('keydown', this.bindKey.bind(this));
        return this.render();
      },
      render: function() {
        var hasCGW, hasVGW;
        hasVGW = hasCGW = true;
        if (Design.instance().region() === 'cn-north-1') {
          hasVGW = hasCGW = false;
        }
        this.$el.html(LeftPanelTpl.panel({
          rdsDisabled: this.workspace.isRdsDisabled(),
          hasVGW: hasVGW,
          hasCGW: hasCGW
        }));
        this.$el.toggleClass("hidden", this.__leftPanelHidden || false);
        this.recalcAccordion();
        this.updateAZ();
        this.updateSnapshot();
        this.updateAmi();
        this.updateRDSList();
        this.updateRDSSnapshotList();
        this.updateDisableItems();
        this.renderReuse();
        this.$el.find(".nano").nanoScroller();
      },
      resourceListSortSelectRdsEvent: function(event) {
        var $currentTarget, $sortedList, selectedId;
        selectedId = 'date';
        if (event) {
          $currentTarget = $(event.currentTarget);
          selectedId = $currentTarget.find('.selected').data('id');
        }
        $sortedList = [];
        if (selectedId === 'date') {
          $sortedList = this.$el.find('.resource-list-rds-snapshot li').sort(function(a, b) {
            return (new Date($(b).data('date'))) - (new Date($(a).data('date')));
          });
        }
        if (selectedId === 'engine') {
          $sortedList = this.$el.find('.resource-list-rds-snapshot li').sort(function(a, b) {
            return $(a).data('engine') - $(b).data('engine');
          });
        }
        if (selectedId === 'storge') {
          $sortedList = this.$el.find('.resource-list-rds-snapshot li').sort(function(a, b) {
            return Number($(b).data('storge')) - Number($(a).data('storge'));
          });
        }
        if ($sortedList.length) {
          return this.$el.find('.resource-list-rds-snapshot').html($sortedList);
        }
      },
      resourceListSortSelectSnapshotEvent: function(event) {
        var $currentTarget, $sortedList, selectedId;
        selectedId = 'date';
        if (event) {
          $currentTarget = $(event.currentTarget);
          selectedId = $currentTarget.find('.selected').data('id');
        }
        $sortedList = [];
        if (selectedId === 'date') {
          $sortedList = this.$el.find('.resource-list-snapshot li').sort(function(a, b) {
            return (new Date($(b).data('date'))) - (new Date($(a).data('date')));
          });
        }
        if (selectedId === 'storge') {
          $sortedList = this.$el.find('.resource-list-snapshot li').sort(function(a, b) {
            return Number($(a).data('storge')) - Number($(b).data('storge'));
          });
        }
        if ($sortedList.length) {
          return this.$el.find('.resource-list-snapshot').html($sortedList);
        }
      },
      bindKey: function(event) {
        var is_input, keyCode, metaKey, shiftKey, tagName, that;
        that = this;
        keyCode = event.which;
        metaKey = event.ctrlKey || event.metaKey;
        shiftKey = event.shiftKey;
        tagName = event.target.tagName.toLowerCase();
        is_input = tagName === 'input' || tagName === 'textarea';
        if (metaKey === false && shiftKey === false && keyCode === 82 && is_input === false) {
          that.toggleResourcePanel();
          return false;
        }
      },
      renderReuse: function() {
        var lc, _i, _len, _ref;
        _ref = this.workspace.design.componentsOfType(constant.RESTYPE.LC);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          lc = _ref[_i];
          if (!lc.get('appId')) {
            new LcItemView({
              model: lc,
              parent: this
            });
          }
        }
        return this;
      },
      updateLc: function(resModel) {
        if (resModel.type === constant.RESTYPE.LC && !resModel.get('appId')) {
          return new LcItemView({
            model: resModel,
            parent: this
          });
        }
      },
      onResChanged: function(resModel) {
        if (!resModel) {
          return;
        }
        if (resModel.type !== constant.RESTYPE.AZ) {
          return;
        }
        this.updateAZ();
      },
      updateAZ: function(resModel) {
        var availableAZ, az, region, usedAZ, _i, _len, _ref;
        if (!this.workspace.isAwake()) {
          return;
        }
        if (resModel && resModel.type !== constant.RESTYPE.AZ) {
          return;
        }
        region = this.workspace.design.region();
        usedAZ = (function() {
          var _i, _len, _ref, _results;
          _ref = this.workspace.design.componentsOfType(constant.RESTYPE.AZ) || [];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            az = _ref[_i];
            _results.push(az.get("name"));
          }
          return _results;
        }).call(this);
        availableAZ = [];
        _ref = CloudResources(this.workspace.design.credentialId(), constant.RESTYPE.AZ, region).where({
          category: region
        }) || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          az = _ref[_i];
          if (usedAZ.indexOf(az.id) === -1) {
            availableAZ.push(az.id);
          }
        }
        this.$el.find(".az").toggleClass("disabled", availableAZ.length === 0).data("option", {
          name: availableAZ[0]
        }).children(".resource-count").text(availableAZ.length);
      },
      updateSnapshot: function() {
        var cln, region;
        region = this.workspace.design.region();
        cln = CloudResources(this.workspace.design.credentialId(), constant.RESTYPE.SNAP, region).where({
          category: region
        }) || [];
        cln.region = cln.length ? region : constant.REGION_SHORT_LABEL[region];
        return this.$el.find(".resource-list-snapshot").html(LeftPanelTpl.snapshot(cln));
      },
      toggleRdsFeature: function() {
        this.$el.find(".ManageRdsSnapshot").parent().toggleClass("disableRds", this.workspace.isRdsDisabled());
        if (!this.workspace.isRdsDisabled()) {
          this.updateRDSList();
          this.updateRDSSnapshotList();
        }
        this.updateDisableItems();
        this.$el.children(".sidebar-title").find(".icon-rds-snap,.icon-pg").toggleClass("disabled", this.workspace.isRdsDisabled());
      },
      updateRDSList: function() {
        var cln;
        cln = CloudResources(this.workspace.design.credentialId(), constant.RESTYPE.DBENGINE, this.workspace.design.region()).groupBy("DBEngineDescription");
        return this.$el.find(".resource-list-rds").html(LeftPanelTpl.rds(cln));
      },
      updateRDSSnapshotList: function() {
        var cln, region;
        region = this.workspace.design.region();
        cln = CloudResources(this.workspace.design.credentialId(), constant.RESTYPE.DBSNAP, region).toJSON();
        cln.region = cln.length ? region : constant.REGION_SHORT_LABEL[region];
        return this.$el.find(".resource-list-rds-snapshot").html(LeftPanelTpl.rds_snapshot(cln));
      },
      changeAmiType: function(evt, attr) {
        this.__amiType = attr || "QuickStartAmi";
        this.updateAmi();
        if (!$(evt.currentTarget).parent().hasClass(".open")) {
          $(evt.currentTarget).parent().click();
        }
      },
      updateAmi: function() {
        var html, ms;
        ms = CloudResources(this.workspace.design.credentialId(), this.__amiType, this.workspace.design.region()).getModels().sort(function(a, b) {
          var ca, cb;
          a = a.attributes;
          b = b.attributes;
          if (a.osType === "windows" && b.osType !== "windows") {
            return 1;
          }
          if (a.osType !== "windows" && b.osType === "windows") {
            return -1;
          }
          ca = a.osType;
          cb = b.osType;
          if (ca === cb) {
            ca = a.architecture;
            cb = b.architecture;
            if (ca === cb) {
              ca = a.name;
              cb = b.name;
            }
          }
          if (ca > cb) {
            return 1;
          } else {
            return -1;
          }
        });
        ms.fav = this.__amiType === "FavoriteAmi";
        ms.region = this.workspace.opsModel.get("region");
        html = LeftPanelTpl.ami(ms);
        return this.$el.find(".resource-list-ami").html(html).parent().nanoScroller("reset");
      },
      updateDisableItems: function(resModel) {
        var $ul, RESTYPE, az, design, disabled, minAZCount, subnet, tooltip, _i, _len, _ref, _ref1;
        if (!this.workspace.isAwake()) {
          return;
        }
        this.updateAZ(resModel);
        design = this.workspace.design;
        RESTYPE = constant.RESTYPE;
        $ul = this.$el.find(".resource-item.igw").parent();
        $ul.children(".resource-item.igw").toggleClass("disabled", design.componentsOfType(RESTYPE.IGW).length > 0);
        $ul.children(".resource-item.vgw").toggleClass("disabled", design.componentsOfType(RESTYPE.VGW).length > 0);
        az = {};
        _ref = design.componentsOfType(RESTYPE.SUBNET);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subnet = _ref[_i];
          az[subnet.parent().get("name")] = true;
        }
        this.sbg = this.$el.find(".resource-item.subnetgroup");
        if ((_ref1 = Design.instance().region()) === 'cn-north-1') {
          minAZCount = 1;
        } else {
          minAZCount = 2;
        }
        if (_.keys(az).length < minAZCount) {
          disabled = true;
          tooltip = sprintf(lang.IDE.RES_TIP_DRAG_CREATE_SUBNET_GROUP, minAZCount);
          this.sbg.toggleClass("disabled", true).attr("data-tooltip");
        } else {
          disabled = false;
          tooltip = lang.IDE.RES_TIP_DRAG_NEW_SUBNET_GROUP;
        }
        if (this.workspace.isRdsDisabled()) {
          disabled = true;
          tooltip = lang.IDE.RES_MSG_RDS_DISABLED;
        }
        this.sbg.toggleClass("disabled", disabled).attr("data-tooltip", tooltip);
      },
      updateFavList: function() {
        if (this.__amiType === "FavoriteAmi") {
          return this.updateAmi();
        }
      },
      updateMyAmiList: function() {
        if (this.__amiType === "MyAmi") {
          return this.updateAmi();
        }
      },
      toggleFav: function(evt) {
        var $tgt, amiCln;
        $tgt = $(evt.currentTarget).toggleClass("fav");
        amiCln = CloudResources(this.workspace.design.credentialId(), "FavoriteAmi", this.workspace.design.region());
        if ($tgt.hasClass("fav")) {
          amiCln.fav($tgt.attr("data-id"));
        } else {
          amiCln.unfav($tgt.attr("data-id"));
        }
        return false;
      },
      toggleLeftPanel: function() {
        this.__leftPanelHidden = this.$el.toggleClass("hidden").hasClass("hidden");
        return null;
      },
      toggleResourcePanel: function() {
        return this.toggleLeftPanel();
      },
      updateAccordion: function(event, noAnimate) {
        var $accordion, $accordionParent, $accordionWrap, $body, $expanded, $target, $visibleAccordion, height;
        $target = $(event.currentTarget);
        $accordion = $target.closest(".accordion-group");
        if (event.target && !$(event.target).hasClass("fixedaccordion-head")) {
          return;
        }
        if ($accordion.hasClass("expanded")) {
          return false;
        }
        this.__openedAccordion = $accordion.index();
        $expanded = $accordion.siblings(".expanded");
        $body = $accordion.children(".accordion-body");
        $accordionWrap = $accordion.closest(".fixedaccordion");
        $accordionParent = $accordionWrap.parent();
        $visibleAccordion = $accordionWrap.children().filter(function() {
          return $(this).css('display') !== 'none';
        });
        height = $accordionParent.outerHeight() - 39 - $visibleAccordion.length * $target.outerHeight();
        $body.outerHeight(height);
        if (noAnimate) {
          $accordion.addClass("expanded").children(".nano").nanoScroller("reset");
          $expanded.removeClass("expanded");
          return false;
        }
        $body.slideDown(200, function() {
          return $accordion.addClass("expanded").children(".nano").nanoScroller("reset");
        });
        $expanded.children(".accordion-body").slideUp(200, function() {
          return $expanded.closest(".accordion-group").removeClass("expanded");
        });
        return false;
      },
      recalcAccordion: function() {
        var $accordion, $accordions, $target, leftpane;
        leftpane = this.$el;
        if (!leftpane.length) {
          return;
        }
        $accordions = leftpane.children(".fixedaccordion").children();
        $accordion = $accordions.filter(".expanded");
        if ($accordion.length === 0) {
          $accordion = $accordions.eq(this.__openedAccordion || 0);
        }
        $target = $accordion.removeClass('expanded').children('.fixedaccordion-head');
        return this.updateAccordion({
          currentTarget: $target[0]
        }, true);
      },
      browseCommunityAmi: function() {
        var amiBrowser, credential, region;
        region = this.workspace.design.region();
        credential = this.workspace.design.credentialId();
        this.listenTo(CloudResources(credential, "FavoriteAmi", region), "update", this.updateFavList);
        amiBrowser = new AmiBrowser({
          region: region,
          credential: credential
        });
        amiBrowser.onClose = (function(_this) {
          return function() {
            return _this.stopListening(CloudResources(credential, "FavoriteAmi", region), "update", _this.updateFavList);
          };
        })(this);
        return false;
      },
      manageEbsSnapshot: function() {
        return new EbsSnapshotManager().render();
      },
      manageRdsSnapshot: function() {
        return new RdsSnapshotManager().render();
      },
      refreshPanelData: function(evt) {
        var $tgt, credential, jobs, region;
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("reloading")) {
          return;
        }
        $tgt.addClass("reloading");
        region = this.workspace.design.region();
        credential = this.workspace.design.credentialId();
        jobs = [CloudResources(credential, "MyAmi", region).fetchForce(), CloudResources(credential, constant.RESTYPE.SNAP, region).fetchForce()];
        if (this.workspace.isRdsDisabled()) {
          jobs.push(this.workspace.fetchRdsData());
        } else {
          jobs.push(CloudResources(credential, constant.RESTYPE.DBSNAP, region).fetchForce());
        }
        Q.all(jobs).done(function() {
          return $tgt.removeClass("reloading");
        });
      },
      resourcesMenuClick: function(event) {
        var $currentDom, currentAction, manager;
        $currentDom = $(event.currentTarget);
        currentAction = $currentDom.data('action');
        switch (currentAction) {
          case 'keypair':
            manager = keypairManager;
            break;
          case 'snapshot':
            manager = EbsSnapshotManager;
            break;
          case 'sns':
            manager = snsManager;
            break;
          case 'sslcert':
            manager = sslCertManager;
            break;
          case 'dhcp':
            manager = dhcpManager;
            break;
          case 'rdspg':
            manager = rdsPgManager;
            break;
          case 'rdssnapshot':
            manager = rdsSnapshot;
        }
        if (manager === dhcpManager) {
          return new manager({
            workspace: this.workspace
          }).manageDhcp();
        } else {
          return new manager({
            workspace: this.workspace
          }).render();
        }
      },
      startDrag: function(evt) {
        var $tgt, dropTargets, option, type;
        if (evt.button !== 0) {
          return false;
        }
        $tgt = $(evt.currentTarget);
        if ($tgt.hasClass("disabled")) {
          return false;
        }
        if (evt.target && $(evt.target).hasClass("btn-fav-ami")) {
          return;
        }
        type = constant.RESTYPE[$tgt.attr("data-type")];
        dropTargets = "#OpsEditor .OEPanelCenter";
        if (type === constant.RESTYPE.INSTANCE) {
          dropTargets += ",#changeAmiDropZone";
        }
        option = $.extend(true, {}, $tgt.data("option") || {});
        option.type = type;
        $tgt.dnd(evt, {
          dropTargets: $(dropTargets),
          dataTransfer: option,
          eventPrefix: type === constant.RESTYPE.VOL ? "addVol_" : "addItem_",
          onDragStart: function(data) {
            if (type === constant.RESTYPE.AZ) {
              return data.shadow.children(".res-name").text($tgt.data("option")["name"]);
            } else if (type === constant.RESTYPE.ASG) {
              return data.shadow.text("ASG");
            }
          }
        });
        return false;
      },
      remove: function() {
        _.invoke(this.subViews, 'remove');
        this.subViews = null;
        Backbone.View.prototype.remove.call(this);
      }
    });
  });

}).call(this);
