(function() {
  define(['event', 'i18n!nls/lang.js', './module/dashboard/overview/template', './module/dashboard/overview/template_data', "component/exporter/Thumbnail", 'constant', 'unmanagedvpc', 'backbone', 'jquery', 'handlebars', 'UI.scrollbar'], function(ide_event, lang, overview_tmpl, template_data, ThumbUtil, constant, unmanagedvpc) {
    var Helper, OverviewView, current_region;
    current_region = null;

    /* helper */
    Helper = {
      switchTab: function(event, tabSelector, listSelector) {
        var $target, currentIndex;
        tabSelector = tabSelector instanceof $ ? tabSelector : $(tabSelector);
        listSelector = listSelector instanceof $ ? listSelector : $(listSelector);
        $target = $(event.currentTarget);
        currentIndex = $(tabSelector).index($target);
        if (!$target.hasClass('on')) {
          tabSelector.each(function(index) {
            if (index === currentIndex) {
              return $(this).addClass('on');
            } else {
              return $(this).removeClass('on');
            }
          });
          listSelector.each(function(index) {
            if (index === currentIndex) {
              return $(this).show();
            } else {
              return $(this).hide();
            }
          });
        }
        return null;
      },
      thumbError: function(event) {
        var $target;
        $target = $(event.currentTarget);
        return $target.hide();
      },
      regexIndexOf: function(str, regex, startpos) {
        var indexOf;
        indexOf = str.substring(startpos || 0).search(regex);
        if (indexOf >= 0) {
          return indexOf + (startpos || 0);
        } else {
          return indexOf;
        }
      },
      updateLoadTime: function(time) {
        return $('#global-refresh').text(time);
      },
      scrollToResource: function() {
        var scrollContent, scrollTo;
        scrollContent = $('#global-region-wrap .scroll-content');
        scrollContent.addClass('scroll-transition');
        setTimeout(function() {
          scrollContent.removeClass('scroll-transition');
          return null;
        }, 100);
        scrollTo = $('#global-region-map-wrap').height() + 7;
        return scrollbar.scrollTo($('#global-region-wrap'), {
          'top': scrollTo
        });
      },
      hasCredential: function() {
        return MC.common.cookie.getCookieByName('has_cred') === 'true';
      },
      accountIsDemo: function() {
        return $.cookie('account_id') === 'demo_account';
      }
    };
    OverviewView = Backbone.View.extend({
      el: $('#tab-content-dashboard'),
      overview: overview_tmpl,
      events: {
        'click #global-region-spot > li': 'gotoRegion',
        'click #global-region-create-stack-list li': 'createStack',
        'click #btn-create-stack': 'createStack',
        'click .global-region-status-content li a': 'openItem',
        'click .global-region-status-tab-item': 'switchRecent',
        'click #region-switch-list li': 'switchRegion',
        'click #region-resource-tab a': 'switchAppStack',
        'click #region-aws-resource-tab a': 'switchResource',
        'click #global-refresh': 'reloadResource',
        'click .global-region-resource-content a': 'switchRegionAndResource',
        'click .show-credential': 'showCredential',
        'click .region-resource-thumbnail': 'clickRegionResourceThumbnail',
        'click .table-app-link-clickable': 'openApp',
        'modal-shown .start-app': 'startAppClick',
        'modal-shown .stop-app': 'stopAppClick',
        'modal-shown .terminate-app': 'terminateAppClick',
        'modal-shown .duplicate-stack': 'duplicateStackClick',
        'modal-shown .delete-stack': 'deleteStackClick',
        'click #global-region-visualize-VPC': 'unmanagedVPCClick',
        'click #global-import-stack': 'importJson'
      },
      status: {
        reloading: false,
        resourceType: null,
        isDemo: false
      },
      initialize: function() {
        $(document.body).on('click', 'div.nav-region-group a', this.gotoRegion);
        $(document.body).on('click', '#dashboard-global', this.gotoRegion);
        return $(document.body).on('keyup', '#confirm-app-name', this.confirmAppName);
      },
      confirmAppName: function(event) {
        var confirm;
        confirm = $(this).data('confirm');
        if ($(this).val() === confirm) {
          return $('#btn-confirm').removeAttr('disabled');
        } else {
          return $('#btn-confirm').attr('disabled', 'disabled');
        }
      },
      setDemo: function() {
        this.status.isDemo = true;
        return null;
      },
      clearDemo: function() {
        this.status.isDemo = false;
        return null;
      },
      reloadResource: function(event, skip_load) {
        if (Helper.hasCredential() && !this.status.isDemo) {
          this.status.reloading = true;
          this.showLoading('#global-view, #region-resource-wrap');
          if (!skip_load) {
            return this.trigger('RELOAD_RESOURCE');
          }
        } else {
          return this.showCredential();
        }
      },
      showLoading: function(selector) {
        return this.$el.find(selector).html(template_data.loading());
      },
      showLoadingFaild: function(selector) {
        return this.$el.find(selector).html(template_data.loading_failed());
      },
      switchRegion: function(event) {
        var region, regionName, target;
        console.log('switchRegion');
        target = $(event.currentTarget);
        region = target.data('region');
        if (region !== 'global') {
          current_region = region;
        }
        regionName = target.find('a').text();
        if (regionName === this.$el.find('#region-switch span').text()) {
          return;
        }
        this.$el.find('#region-switch span').text(regionName).data('region', region);
        if (region === 'global') {
          this.$el.find('#global-view').show();
          return this.$el.find('#region-view').hide();
        } else {
          if (!this.status.isDemo) {
            this.showLoading('#region-app-stack-wrap, #region-resource-wrap');
          }
          this.$el.find('#global-view').hide();
          this.$el.find('#region-view').show();
          this.trigger('SWITCH_REGION', region);
          return this.renderRegionAppStack();
        }
      },
      switchRecent: function(event) {
        return Helper.switchTab(event, '#global-region-status-tab-wrap a', '#global-region-status-content-wrap > div');
      },
      switchAppStack: function(event) {
        return Helper.switchTab(event, '#region-resource-tab a', '.region-resource-list');
      },
      switchResource: function(event) {
        var type;
        type = $(event.currentTarget).data('resourceType');
        return this.renderRegionResourceBody(type);
      },
      switchRegionAndResource: function(event) {
        var $target, region;
        $target = $(event.currentTarget);
        region = $target.data('region');
        this.status.resourceType = $target.data('resourceType');
        return this.gotoRegion(region);
      },
      renderGlobalList: function(event) {
        var tmpl;
        if (this.status.reloading) {
          notification('info', lang.ide.DASH_MSG_RELOAD_AWS_RESOURCE_SUCCESS);
          this.status.reloading = false;
        }
        tmpl = template_data.global_list(this.model.toJSON());
        if (current_region) {
          this.trigger('SWITCH_REGION', current_region, true);
        }
        return $(this.el).find('#global-view').html(tmpl);
      },
      renderRegionAppStack: function(tab) {
        var context, i, tmpl, _i, _j, _len, _len1, _ref, _ref1;
        this.regionAppStackRendered = true;
        if (!tab) {
          tab = 'stack';
        }
        context = _.extend({}, this.model.toJSON());
        _ref = context.cur_stack_list || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          i.url = ThumbUtil.fetch(i.id);
        }
        _ref1 = context.cur_app_list || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          i = _ref1[_j];
          i.url = ThumbUtil.fetch(i.id);
        }
        context[tab] = true;
        tmpl = template_data.region_app_stack(context);
        return $(this.el).find('#region-app-stack-wrap').html(tmpl).find('.region-resource-thumbnail img').error(Helper.thumbError);
      },
      renderRegionResource: function(event) {
        var tmpl;
        console.log(this.model.toJSON());
        if (!this.status.reloading) {
          tmpl = template_data.region_resource_head(this.model.toJSON());
          this.$el.find('#region-resource-wrap').html(tmpl);
          this.renderRegionResourceBody();
        }
        return null;
      },
      renderRegionResourceBody: function(type, isReRender) {
        var $currentTab, $typeTabs, currentType, template;
        $typeTabs = $('#region-aws-resource-tab .region-resource-tab-item');
        $currentTab = $typeTabs.filter('.on');
        currentType = $currentTab.data('resourceType');
        if (isReRender && type !== currentType) {
          return;
        }
        if (!type && !isReRender) {
          if (this.status.resourceType) {
            type = this.status.resourceType;
            this.status.resourceType = null;
          } else {
            type = 'DescribeInstances';
          }
        }
        template = template_data[type];
        $typeTabs.each(function() {
          if ($(this).data('resourceType') === type) {
            return $(this).addClass('on');
          } else {
            return $(this).removeClass('on');
          }
        });
        this.$el.find("#region-aws-resource-data").html(template(this.model.get('cur_region_resource')));
        return null;
      },
      renderRecent: function() {
        $(this.el).find('#global-region-status-widget').html(template_data.recent(this.model.attributes));
        return null;
      },
      renderLoadingFaild: function() {
        return this.showLoadingFaild('#global-view, #region-resource-wrap');
      },
      renderGlobalDemo: function() {
        return this.$el.find('#global-view').html(template_data.demo_global());
      },
      renderRegionDemo: function() {
        return this.$el.find('#region-resource-wrap').html(template_data.demo_region());
      },
      enableCreateStack: function(platforms) {
        var $middleButton, $topButton, is_invitated;
        $middleButton = $("#btn-create-stack");
        $topButton = $("#global-create-stack");
        $middleButton.removeAttr('disabled');
        $topButton.removeAttr('disabled').addClass('js-toggle-dropdown');
        $("#global-import-stack").removeAttr("disabled");
        if (MC.common.cookie.getCookieByName('account_id') !== 'demo_account') {
          $('#global-region-visualize-VPC').removeAttr('disabled');
        }
        is_invitated = "" + MC.common.cookie.getCookieByName('is_invitated');
        if (is_invitated === "true" || is_invitated === "2") {
          $('#global-region-visualize-VPC').show();
        } else {
          $('#global-region-visualize-VPC').hide();
        }
        return null;
      },
      enableSwitchRegion: function() {
        return $('#region-switch').removeClass('disabled').addClass('js-toggle-dropdown');
      },
      disableSwitchRegion: function() {
        return $('#region-switch').addClass('disabled').removeClass('js-toggle-dropdown');
      },
      createStack: function(event) {
        var $target;
        $target = $(event.currentTarget);
        if ($target.prop('disabled')) {
          return;
        }
        return ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'NEW_STACK', null, $target.data('region') || current_region, null);
      },
      gotoRegion: function(event) {
        var $target, region;
        console.log('gotoRegion');
        if (event === Object(event)) {
          $target = $(event.currentTarget);
          region = ($target.attr('id')) || ($target.data('regionName'));
          region = region.replace('dashboard-global', 'global');
        } else {
          region = event;
        }
        $("#region-switch-list li[data-region=" + region + "]").click();
        return Helper.scrollToResource();
      },
      displayLoadTime: function() {
        var loadTime;
        loadTime = $.now() / 1000;
        clearInterval(this.timer);
        Helper.updateLoadTime(MC.intervalDate(loadTime));
        this.timer = setInterval((function() {
          Helper.updateLoadTime(MC.intervalDate(loadTime));
          return console.log('timeupdate', loadTime);
        }), 60001);
        $('#global-refresh ').show();
        return null;
      },
      hideLoadTime: function() {
        $('#global-refresh ').hide();
        return null;
      },
      openApp: function(event) {
        var $target, id, name;
        $target = $(event.currentTarget);
        name = $target.data('name');
        id = $target.data('id');
        return ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'OPEN_APP', name, current_region, id);
      },
      showCredential: function(flag) {
        return require(['component/awscredential/main'], function(awscredential_main) {
          return awscredential_main.loadModule(flag);
        });
      },
      renderMapResult: function() {
        var cur_tmpl;
        console.log('dashboard overview-result render');
        cur_tmpl = template_data.overview_result(this.model.attributes);
        $(this.el).find('#global-region-spot').html(cur_tmpl);
        return null;
      },
      render: function() {
        var data, region_names;
        console.log('dashboard overview render');
        console.log(constant.REGION_LABEL);
        region_names = _.map(constant.REGION_LABEL, function(name, id) {
          return {
            long: {
              id: id,
              name: name
            },
            short: {
              id: id,
              name: constant.REGION_SHORT_LABEL[id]
            }
          };
        });
        data = {
          region_names: region_names
        };
        console.log(data);
        $(this.el).html(this.overview(data));
        return null;
      },
      openItem: function(event) {
        var id, me;
        console.log('click item');
        me = this;
        id = event.currentTarget.id;
        if (id.indexOf('app-') === 0) {
          ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'OPEN_APP', $("#" + id).data('option').name, $("#" + id).data('option').region, id);
        } else if (id.indexOf('stack-') === 0) {
          ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'OPEN_STACK', $("#" + id).data('option').name, $("#" + id).data('option').region, id);
        }
        return null;
      },
      clickRegionResourceThumbnail: function(event) {
        var id, item_info, name;
        console.log('click app/stack thumbnail');
        if ($(event.currentTarget).children('.app-thumbnail-pending').length > 0) {

        } else {
          item_info = $(event.currentTarget).next('.region-resource-info')[0];
          id = $(item_info).find('.modal')[0].id;
          name = $($(item_info).find('.region-resource-item-name')[0]).text();
          if (id.indexOf('app-') === 0) {
            ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'OPEN_APP', name, current_region, id);
          } else if (id.indexOf('stack-') === 0) {
            ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'OPEN_STACK', name, current_region, id);
          }
        }
        return null;
      },
      deleteStackClick: function(event) {
        var id, name;
        console.log('click to delete stack');
        id = $(event.currentTarget).attr('id');
        name = $(event.currentTarget).attr('name');
        $('#btn-confirm').on('click', {
          target: this
        }, function(event) {
          console.log('dashboard delete stack');
          modal.close();
          return ide_event.trigger(ide_event.DELETE_STACK, current_region, id, name);
        });
        return null;
      },
      duplicateStackClick: function(event) {
        var id, name, new_name;
        console.log('click to duplicate stack');
        id = $(event.currentTarget).attr('id');
        name = $(event.currentTarget).attr('name');
        new_name = MC.aws.aws.getDuplicateName(name);
        $('#modal-input-value').val(new_name);
        $('#btn-confirm').on('click', {
          target: this
        }, function(event) {
          console.log('dashboard duplicate stack');
          new_name = $('#modal-input-value').val();
          if (!new_name) {
            return notification('warning', lang.ide.PROP_MSG_WARN_NO_STACK_NAME);
          } else if (new_name.indexOf(' ') >= 0) {
            return notification('warning', lang.ide.PROP_MSG_WARN_WHITE_SPACE);
          } else if (!MC.aws.aws.checkStackName(null, new_name)) {
            return notification('warning', lang.ide.PROP_MSG_WARN_REPEATED_STACK_NAME);
          } else {
            modal.close();
            return ide_event.trigger(ide_event.DUPLICATE_STACK, current_region, id, new_name, name);
          }
        });
        return null;
      },
      startAppClick: function(event) {
        var id, name;
        console.log('click to start app');
        id = $(event.currentTarget).attr('id');
        name = $(event.currentTarget).attr('name');
        if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
          modal.close();
          console.log('show credential setting dialog');
          require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          $('#btn-confirm').on('click', {
            target: this
          }, function(event) {
            console.log('dashboard region start app');
            modal.close();
            return ide_event.trigger(ide_event.START_APP, current_region, id, name);
          });
        }
        return null;
      },
      stopAppClick: function(event) {
        var id, name;
        console.log('click to stop app');
        id = $(event.currentTarget).attr('id');
        name = $(event.currentTarget).attr('name');
        if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
          modal.close();
          console.log('show credential setting dialog');
          require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          $('#btn-confirm').on('click', {
            target: this
          }, function(event) {
            console.log('dashboard region stop app');
            modal.close();
            return ide_event.trigger(ide_event.STOP_APP, current_region, id, name);
          });
        }
        return null;
      },
      terminateAppClick: function(event) {
        var id, name;
        console.log('click to terminate app');
        id = $(event.currentTarget).attr('id');
        name = $(event.currentTarget).attr('name');
        if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
          modal.close();
          console.log('show credential setting dialog');
          require(['component/awscredential/main'], function(awscredential_main) {
            return awscredential_main.loadModule();
          });
        } else {
          $('#btn-confirm').on('click', {
            target: this
          }, function(event) {
            console.log('dashboard region terminal app');
            modal.close();
            return ide_event.trigger(ide_event.TERMINATE_APP, current_region, id, name);
          });
        }
        return null;
      },
      updateThumbnail: function(url, id) {
        console.log('updateThumbnail, url = ' + url + ', id = ' + id);
        _.each($('.region-resource-list-item').find('.region-resource-thumbnail img'), function(item) {
          var $item, new_url;
          $item = $(item);
          if ($item.attr('data-id') === id) {
            new_url = 'https://madeiracloudthumbnails-dev.s3.amazonaws.com/' + url + '?time=' + Math.round(+new Date());
            console.log('new_url = ' + new_url);
            $item.attr('src', new_url);
            return $item.removeAttr('style');
          }
        });
        return null;
      },
      unmanagedVPCClick: function() {
        var _ref;
        console.log('unmanagedVPCClick');
        if (((_ref = MC.common.cookie.getCookieByName('is_invitated')) === 'true' || _ref === true || _ref === 2 || _ref === '2') && MC.common.cookie.getCookieByName('account_id') !== 'demo_account') {
          unmanagedvpc.loadModule();
        }
        return null;
      },
      importJson: function() {
        var hanldeFile, model, reader, zone;
        modal(MC.template.importJSON());
        model = this.model;
        reader = new FileReader();
        reader.onload = function(evt) {
          var error;
          error = model.importJson(reader.result);
          if (error) {
            $("#import-json-error").html(error);
          } else {
            modal.close();
            reader = null;
          }
          return null;
        };
        reader.onerror = function() {
          $("#import-json-error").html(lang.ide.POP_IMPORT_ERROR);
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
      }
    });
    return OverviewView;
  });

}).call(this);
