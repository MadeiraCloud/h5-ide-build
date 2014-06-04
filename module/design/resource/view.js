(function() {
  define(['event', 'constant', './template', './template_data', 'i18n!nls/lang.js', 'snapshotManager', 'sslcert_manage', 'dhcp', 'sns_manage', 'kp_manage', 'backbone', 'jquery', 'handlebars', 'UI.selectbox', 'UI.radiobuttons', 'UI.modal', 'UI.table'], function(ide_event, constant, template, template_data, lang, snapshotManager, sslCertManage, dhcpManage, snsManage, kpManage) {
    var ResourceView, itemDisableToolTip, itemEnableToolTip, res_type;
    ResourceView = Backbone.View.extend({
      el: $('#resource-panel'),
      my_ami_tmpl: template_data.my_ami_tmpl,
      favorite_ami_tmpl: template_data.favorite_ami_tmpl,
      community_ami_tmpl: template_data.community_ami_tmpl,
      resource_vpc_tmpl: template_data.resource_vpc_tmpl,
      initialize: function() {
        $(document).on('click', '#hide-resource-panel', this.toggleResourcePanel).on('OPTION_CHANGE', '#resource-select', this, this.resourceSelectEvent).on('click', '#btn-browse-community-ami', this, this.openBrowseCommunityAMIsModal).on('click', '#btn-snapshot-manager', this, this.openSnapshotManager).on('click', '#btn-search-ami', this, this.searchCommunityAmiCurrent).on('click', '#community_ami_page_preview', this, this.searchCommunityAmiPreview).on('click', '#community_ami_page_next', this, this.searchCommunityAmiNext).on('click', '#community_ami_table .toggle-fav', this, this.toggleFav).on('click', '.favorite-ami-list .faved', this, this.removeFav).on('click', '.favorite-ami-list .btn-fav-ami.deleted', this, this.addFav).on('keypress', '#community-ami-input', this, this.searchCommunityAmiCurrent).on('click', '.resources-dropdown-wrapper li', this, this.resourcesMenuClick).on('click', '.refresh-resource-panel', this, $.proxy(this.refreshResourcePanel, this));
        $(window).on("resize", _.bind(this.resizeAccordion, this));
        return $("#tab-content-design").on("click", ".fixedaccordion-head", this.updateAccordion);
      },
      render: function() {
        console.log('resource render');
        $('#resource-panel').html(template());
        $('.resoruce-snapshot').html(template_data.resoruce_snapshot_new_data({}));
        ide_event.trigger(ide_event.DESIGN_SUB_COMPLETE);
        this.recalcAccordion();
        return null;
      },
      reRender: function() {
        console.log('re-resource render');
        if ($.trim(this.$el.html()) === 'loading...') {
          $('#resource-panel').html(template());
        }
        return this.recalcAccordion();
      },
      updateAccordion: function(event, noAnimate) {
        var $accordion, $accordionParent, $accordionWrap, $body, $expanded, $target, $visibleAccordion, height;
        $target = $(event.currentTarget);
        $accordion = $target.closest(".accordion-group");
        if ($accordion.hasClass("expanded")) {
          return false;
        }
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
          $accordion.addClass("expanded");
          $expanded.removeClass("expanded");
          return false;
        }
        $body.slideDown(200, function() {
          return $accordion.addClass("expanded");
        });
        $expanded.children(".accordion-body").slideUp(200, function() {
          return $expanded.closest(".accordion-group").removeClass("expanded");
        });
        return false;
      },
      recalcAccordion: function() {
        var $accordion, $accordions, $target;
        $accordions = $("#resource-panel").children(".fixedaccordion").children();
        $accordion = $accordions.filter(".expanded");
        if ($accordion.length === 0) {
          $accordion = $accordions.filter(function() {
            return $(this).css('display') !== 'none';
          });
        }
        if ($accordion.length === 0) {
          return;
        }
        $target = $accordion.removeClass('expanded').children('.fixedaccordion-head');
        return this.updateAccordion({
          currentTarget: $target[0]
        }, true);
      },
      resizeAccordion: function() {
        var self;
        if (this.__resizeAccdTO) {
          clearTimeout(this.__resizeAccdTO);
        }
        self = this;
        this.__resizeAccdTO = setTimeout(function() {
          return self.recalcAccordion();
        }, 150);
        return null;
      },
      listen: function(model) {
        this.model = model;
        this.listenTo(this.model, 'change:availability_zone', this.availabilityZoneRender);
        this.listenTo(this.model, 'change:resource_snapshot', this.resourceSnapshotRender);
        this.listenTo(this.model, 'change:quickstart_ami', this.quickstartAmiRender);
        this.listenTo(this.model, 'change:my_ami', this.myAmiRender);
        this.listenTo(this.model, 'change:favorite_ami', this.favoriteAmiRender);
        this.listenTo(this.model, 'change:community_ami', this.communityAmiRender);
        return this.listenTo(ide_event, 'SWITCH_TAB', this.hideResourcePanel);
      },
      resourceSelectEvent: function(event, id) {
        console.log('resourceSelectEvent = ' + id);
        if (id === 'favorite-ami') {
          $('.favorite-ami-list').show();
          $('.quickstart-ami-list').hide();
          $('.my-ami-list').hide();
        } else if (id === 'my-ami') {
          $('.my-ami-list').show();
          $('.favorite-ami-list').hide();
          $('.quickstart-ami-list').hide();
        } else if (id === 'quickstart-ami') {
          $('.quickstart-ami-list').show();
          $('.favorite-ami-list').hide();
          $('.my-ami-list').hide();
        }
        $(this).siblings(".fixedaccordion-head").click();
        return null;
      },
      toggleFav: function(event) {
        var $this, resourceView;
        resourceView = event.data;
        $this = $(this);
        if ($this.hasClass('faved')) {
          resourceView.trigger('TOGGLE_FAV', resourceView.region, 'remove', $this.data('id'));
          $this.removeClass('faved').data('tooltip', 'Add to Favorite');
        } else {
          resourceView.trigger('TOGGLE_FAV', resourceView.region, 'add', $this.data('id'));
          $this.addClass('faved').data('tooltip', 'Remove from Favorite');
        }
        $this.trigger('mouseleave', event);
        return $this.trigger('mouseenter', event);
      },
      addFav: function(event) {
        var amiVO, id, resourceView, target;
        resourceView = event.data;
        target = $(event.currentTarget);
        id = target.data('id');
        amiVO = target.data('amivo');
        return resourceView.trigger('TOGGLE_FAV', resourceView.region, 'add', id, amiVO, true);
      },
      removeFav: function(event) {
        var id, resourceView, target;
        resourceView = event.data;
        target = $(event.currentTarget);
        id = target.data('id');
        return resourceView.trigger('TOGGLE_FAV', resourceView.region, 'remove', id);
      },
      toggleResourcePanel: function() {
        console.log('toggleResourcePanel');
        $('#resource-panel').toggleClass('hidden');
        $('#hide-resource-panel').toggleClass('icon-caret-left');
        $('#hide-resource-panel').toggleClass('icon-caret-right');
        return null;
      },
      hideResourcePanel: function(type) {
        var $canvas, $item, $panel;
        console.log('hideResourcePanel', type, Tabbar.current);
        this.recalcAccordion();
        $item = $('#hide-resource-panel');
        $panel = $('#resource-panel');
        $canvas = $('#canvas-panel');
        if (type.split('_')[1] === 'STACK' || Tabbar.current === 'appedit' || type === 'show') {
          $item.show();
          $panel.show();
          if ($item.hasClass('icon-caret-left')) {
            $panel.removeClass('hidden');
          }
          if ($item.hasClass('icon-caret-right')) {
            $panel.addClass('hidden');
          }
          if (type === 'show' && $item.hasClass('icon-caret-right') && $panel.hasClass('hidden')) {
            $item.trigger('click');
          }
        } else if (type.split('_')[1] === 'APP' || type === 'hide') {
          $item.hide();
          $panel.hide();
          $item.removeClass('icon-caret-left');
          $item.addClass('icon-caret-right');
          $panel.addClass('hidden');
        }
        return null;
      },

      /*updateResourceState : ( type ) ->
          console.log 'updateResourceState, type = ' + type
           * Get all accordion, and make them not `expanded`
          $item = $('.fixedaccordion').children().removeClass("expanded")
           *
          if type is 'show'
      
               *hide az and scaling
              $item.eq(0).hide()
              $item.eq(3).hide()
               *hide vpc
              $item.eq(4).hide()
      
               *open images & close volume
               * Need to hide other items first
               * Then recalc the accodion
              @recalcAccordion()
      
          else if type is 'hide'
      
               *show all
              $item.show()
      
          null
       */
      availabilityZoneRender: function() {
        console.log('availabilityZoneRender');
        console.log(this.model.attributes.availability_zone);
        if (!this.model.attributes.availability_zone) {
          return;
        }
        $('.availability-zone').html(template_data.availability_zone_data(this.model.attributes));
        return null;
      },
      openSnapshotManager: function() {
        this.snapshotManager || (this.snapshotManager = new snapshotManager());
        this.snapshotManager.off('datachange', this.refreshSnapshotRender);
        this.snapshotManager.on('datachange', this.refreshSnapshotRender);
        return this.snapshotManager.render();
      },
      refreshSnapshotRender: function() {
        console.log('Change detected, Updating Snapshot Resource.');
        return this.resourceSnapshotRender();
      },
      resourceSnapshotRender: function() {
        console.log('resourceSnapshotRender');
        console.log(this.model.attributes.resource_snapshot);
        if (!this.model.attributes.resource_snapshot) {
          return;
        }
        $('.resoruce-snapshot').html(template_data.resoruce_snapshot_new_data({}));
        $('.resoruce-snapshot').append(template_data.resoruce_snapshot_data(this.model.attributes));
        return null;
      },
      quickstartAmiRender: function() {
        console.log('quickstartAmiRender');
        console.log(this.model.attributes.quickstart_ami);
        if (!this.model.attributes.quickstart_ami) {
          $('.quickstart-ami-list').html('');
          return;
        }
        $('.quickstart-ami-list').html(template_data.quickstart_ami_data(this.model.attributes));
        return null;
      },
      myAmiRender: function() {
        console.log('myAmiRender');
        console.log(this.model.attributes.my_ami);
        if (!this.model.attributes.my_ami || _.isNumber(this.model.attributes.my_ami)) {
          $('.my-ami-list').html('');
          return;
        }
        $('.my-ami-list').html(template_data.my_ami_data(this.model.attributes));
        return null;
      },
      favoriteAmiRender: function() {
        console.log('favoriteAmiRender');
        console.log(this.model.attributes.favorite_ami);
        if (!this.model.attributes.favorite_ami) {
          return;
        }
        $('.favorite-ami-list').html(template_data.favorite_ami_data(this.model.attributes));
        return null;
      },
      communityAmiBtnRender: function() {
        console.log('communityAmiRender');
        console.log(this.model.attributes.community_ami);
        $('.community-ami').html(template_data.community_ami_btn(this));
        return null;
      },
      openBrowseCommunityAMIsModal: function(event) {
        var resourceView;
        console.log('openBrowseCommunityAMIsModal');
        resourceView = event.data;
        return require(['component/amis/main'], function(amis_main) {
          amis_main.loadModule();
          return resourceView.searchCommunityAmi();
        });
      },
      communityShowLoading: function() {
        $("#ami-table-wrap .scroll-content").hide();
        $(".show-loading").show();
        $("#btn-search-ami").text(lang.ide.AMI_LBL_SEARCHING).attr("disabled", "");
        $("#community-ami-page>div").hide();
        return $("#ami-count").empty().html("Total: 0");
      },
      communityShowContent: function() {
        $(".show-loading").hide();
        $("#ami-table-wrap .scroll-content").show();
        $("#btn-search-ami").text(lang.ide.AMI_LBL_SEARCH).removeAttr("disabled");
        return $("#community-ami-page>div").show();
      },
      communityPagerRender: function(current_page, max_page, total) {
        var itemBegin, itemEnd, pageSize, pagination, resourceView;
        resourceView = this;
        pageSize = total > 50 ? 50 : total;
        itemBegin = (current_page - 1) * 50 + 1;
        itemEnd = itemBegin + pageSize - 1;
        if (itemEnd > total) {
          itemEnd = total;
        }
        $('.page-tip').text(sprintf(lang.ide.AMI_LBL_PAGEINFO, itemBegin, itemEnd, total));
        pagination = $('.pagination');
        if (max_page === 0) {
          pagination.hide();
        } else {
          pagination.show();
        }
        if (pagination.data('jqPagination')) {
          pagination.jqPagination('destroy');
          pagination.find('input').data('current-page', current_page);
        }
        return pagination.jqPagination({
          current_page: current_page,
          max_page: max_page,
          page_string: "{current_page} / {max_page}",
          paged: (function(current_page, max_page) {
            return function(page) {
              if (page !== current_page && (max_page >= page && page > 0)) {
                return resourceView.searchCommunityAmi(page);
              }
            };
          })(current_page, max_page)
        });
      },
      communityAmiRender: function() {
        var currentPageNum, page, this_tr, totalNum, totalPageNum;
        this.communityShowContent();
        totalNum = 0;
        if (this.model.attributes.community_ami) {
          this_tr = "";
          _.map(this.model.attributes.community_ami.result, function(value, key) {
            var bit, fav_class, tooltip, visibility;
            if (value["delete"]) {
              value.favorite = false;
            }
            fav_class = value.favorite ? 'faved' : '';
            tooltip = value.favorite ? lang.ide.RES_TIT_REMOVE_FROM_FAVORITE : lang.ide.RES_TIT_ADD_TO_FAVORITE;
            bit = value.architecture === 'i386' ? '32' : '64';
            visibility = value.isPublic ? 'public' : 'private';
            this_tr += '<tr class="item" data-id="' + key + ' ' + value.name + '" data-publicprivate="public" data-platform="' + value.osType + '" data-ebs="' + value.rootDeviceType + '" data-bit="' + bit + '">';
            this_tr += '<td class="ami-table-fav"><div class="toggle-fav tooltip ' + fav_class + '" data-tooltip="' + tooltip + '" data-id="' + key + '"></div></td>';
            this_tr += '<td class="ami-table-id">' + key + '</td>';
            this_tr += '<td class="ami-table-info"><span class="ami-table-name">' + value.name + '</span><div class="ami-meta"><i class="icon-' + value.osType + ' icon-ami-os"></i><span>' + visibility + ' | ' + value.architecture + ' | ' + value.rootDeviceType + '</span></div></td>';
            return this_tr += "<td class='ami-table-size'>" + value.imageSize + "</td></tr>";
          });
          currentPageNum = this.model.attributes.community_ami.curPageNum;
          page = "<div>page " + currentPageNum + "</div>";
          totalNum = this.model.attributes.community_ami.totalNum;
          totalPageNum = this.model.attributes.community_ami.totalPageNum;
          $("#ami-count").empty().html("Total: " + totalNum);
          this.communityPagerRender(currentPageNum, totalPageNum, totalNum);
          return $("#community_ami_table").empty().html(this_tr);
        }
      },
      resourceVpcRender: function(current_platform, type) {
        var $list, data;
        data = {};
        if (type !== 'NEW_STACK') {
          data.igwIsUsed = this.model.getIgwStatus();
          data.vgwIsUsed = this.model.getVgwStatus();
        }
        $list = $('.resource-vpc-list').html(template_data.resource_vpc_select_list(data));
        return $list.toggle($list.children().length > 0);
      },
      searchCommunityAmi: function(pageNum) {
        var architecture, isPublic, me, name, platform, rootDeviceType, visibility;
        me = this;
        if (!pageNum) {
          pageNum = 1;
        }
        me.communityShowLoading();
        name = $('#community-ami-input').val();
        platform = $('#selectbox-ami-platform').find('.selected').data('id');
        isPublic = 'true';
        architecture = '32-bit';
        rootDeviceType = 'EBS';
        if ($('#filter-ami-type').find('.active').length === 1) {
          visibility = radiobuttons.data($('#filter-ami-type'));
          isPublic = visibility === 'Private' ? 'false' : 'true';
        } else if ($('#filter-ami-type').find('.active').length === 2) {
          isPublic = null;
        }
        if ($('#filter-ami-32bit-64bit').find('.active').length === 1) {
          architecture = radiobuttons.data($('#filter-ami-32bit-64bit'));
        } else if ($('#filter-ami-32bit-64bit').find('.active').length === 2) {
          architecture = null;
        }
        if ($('#filter-ami-EBS-Instance').find('.active').length === 1) {
          rootDeviceType = radiobuttons.data($('#filter-ami-EBS-Instance'));
        } else if ($('#filter-ami-EBS-Instance').find('.active').length === 2) {
          rootDeviceType = null;
        }
        return me.trigger('LOADING_COMMUNITY_AMI', MC.common.other.canvasData.get('region'), name, platform, isPublic, architecture, rootDeviceType, null, pageNum);
      },
      searchCommunityAmiCurrent: function(event) {
        var resourceView;
        if (event.keyCode && event.keyCode !== 13) {
          return;
        }
        resourceView = event.data;
        return event.data.searchCommunityAmi(0);
      },
      searchCommunityAmiNext: function(event) {
        var page, resourceView;
        resourceView = event.data;
        page = parseInt($('#community_ami_page_current').attr("page"), 10);
        return resourceView.searchCommunityAmi(page + 1);
      },
      searchCommunityAmiPreview: function(event) {
        var page, resourceView;
        resourceView = event.data;
        page = parseInt($('#community_ami_page_current').attr("page"), 10);
        return resourceView.searchCommunityAmi(page - 1);
      },
      enableItem: function(type, filterFunc) {
        this.toggleItem(type, filterFunc, true);
        return null;
      },
      disableItem: function(type, filterFunc) {
        this.toggleItem(type, filterFunc, false);
        return null;
      },
      toggleItem: function(type, filterFunc, enable) {
        $(".resource-item[data-type='" + type + "']").each(function(idx, item) {
          var $item, data, tooltip;
          $item = $(item);
          data = $item.data();
          if (filterFunc && !filterFunc.call($item, data)) {
            return;
          }
          $item.data("enable", enable).attr("data-enable", enable).toggleClass("resource-disabled", !enable);
          if (enable) {
            tooltip = itemEnableToolTip[type];
            $item.toggleClass("tooltip", true);
            if (tooltip) {
              return $item.data("tooltip", tooltip);
            }
          } else {
            tooltip = itemDisableToolTip[type];
            if (tooltip) {
              return $item.data("tooltip", tooltip).toggleClass("tooltip", true);
            } else {
              return $item.toggleClass("tooltip", false);
            }
          }
        });
        return null;
      },
      resourcesMenuClick: function(event) {
        var $currentDom, currentAction;
        $currentDom = $(event.currentTarget);
        currentAction = $currentDom.data('action');
        switch (currentAction) {
          case 'keypair':
            return new kpManage().render();
          case 'snapshot':
            return new snapshotManager().render();
          case 'sns':
            return new snsManage().render();
          case 'sslcert':
            return new sslCertManage().render();
          case 'dhcp':
            return (new dhcpManage()).manageDhcp();
        }
      },
      refreshResourcePanel: function(event) {
        var $refreshBtn, regionName, resourceView;
        $refreshBtn = $('.sidebar-title .refresh-resource-panel');
        if (!$refreshBtn.hasClass('disabled')) {
          resourceView = event.data;
          regionName = resourceView.region;
          this.model.refreshResourceList(regionName);
          return $refreshBtn.addClass('disabled');
        }
      },
      stopRefreshResourcePanel: function() {
        $('.sidebar-title .refresh-resource-panel').removeClass('disabled');
        return notification('info', 'Refresh resource list success');
      }
    });
    res_type = constant.RESTYPE;
    itemDisableToolTip = {};
    itemEnableToolTip = {};

    /*
    
     * Don't know if we really need to update the tooltip of the item.
    
    itemEnableToolTip[  res_type.AWS_VPC_InternetGateway ] = "Drag and drop to canvas to create a new Internet Gateway."
    itemDisableToolTip[ res_type.AWS_VPC_InternetGateway ] = "VPC can only have one IGW. There is already one IGW in current VPC."
    
    itemEnableToolTip[  res_type.AWS_VPC_VPNGateway ] = "Drag and drop to canvas to create a new VPN Gateway."
    itemDisableToolTip[ res_type.AWS_VPC_VPNGateway ] = "VPC can only have one IGW. There is already one IGW in current VPC."
     */
    return ResourceView;
  });

}).call(this);
