(function() {
  define(["component/exporter/Thumbnail", 'jquery', 'event', 'MC', 'base_main', 'vpc_model'], function(ThumbUtil, $, ide_event, MC, base_main, vpc_model) {
    var Helper, appListGot, current_region, initialize, loadModule, overview_app, overview_stack, should_update_overview, stackListGot, unLoadModule;
    current_region = null;
    overview_app = null;
    overview_stack = null;
    should_update_overview = false;
    stackListGot = false;
    appListGot = false;
    initialize = function() {
      return _.extend(this, base_main);
    };
    Helper = {
      hasCredential: function() {
        return MC.common.cookie.getCookieByName('has_cred') === 'true';
      },
      accountIsDemo: function() {
        return $.cookie('account_id') === 'demo_account';
      },
      cleanupThumbnail: function() {
        var app, id, keepArray, region, _i, _j, _len, _len1, _ref, _ref1;
        appListGot = stackListGot = false;
        keepArray = [];
        _ref = MC.data.app_thumb_list;
        for (id in _ref) {
          region = _ref[id];
          for (_i = 0, _len = region.length; _i < _len; _i++) {
            app = region[_i];
            keepArray.push(app.id);
          }
        }
        _ref1 = MC.data.stack_list;
        for (id in _ref1) {
          region = _ref1[id];
          for (_j = 0, _len1 = region.length; _j < _len1; _j++) {
            app = region[_j];
            keepArray.push(app.id);
          }
        }
        ThumbUtil.cleanup(keepArray);
        return null;
      }
    };
    initialize();
    loadModule = function() {
      MC.data.dashboard_type = 'OVERVIEW_TAB';
      return require(['dashboard_view', 'dashboard_model', 'constant', 'UI.tooltip'], function(View, model, constant) {
        var region_view, view;
        region_view = null;
        view = loadSuperModule(loadModule, 'dashboard', View, null);
        if (!view) {
          return;
        }
        view.model = model;
        view.render();
        ide_event.trigger(ide_event.DASHBOARD_COMPLETE);
        model.on('change:result_list', function() {
          console.log('dashboard_change:result_list');
          should_update_overview = true;
          return view.renderMapResult();
        });
        model.on('change:region_classic_list', function() {
          console.log('dashboard_region_classic_list');
          MC.data.supported_platforms = model.get('region_classic_list');
          if (MC.data.supported_platforms.length <= 0) {

          } else {
            MC.data.is_loading_complete = true;
            return ide_event.trigger(ide_event.IDE_AVAILABLE);
          }
        });
        model.on('change:recent_edited_stacks', function() {
          console.log('dashboard_change:recent_eidted_stacks');
          return view.renderRecent();
        });
        model.on('change:recent_launched_apps', function() {
          console.log('dashboard_change:recent_launched_apps');
          return view.renderRecent();
        });
        model.on('change:global_list', function() {
          return view.renderGlobalList();
        });
        model.on('change:cur_region_resource', function() {
          return view.renderRegionResource();
        });
        ide_event.onLongListen(ide_event.SWITCH_MAIN, function() {
          if (MC.data.supported_platforms && MC.data.supported_platforms.length) {
            model.set('supported_platforms', true);
            return view.enableCreateStack();
          }
        });
        ide_event.onLongListen(ide_event.UPDATE_AWS_CREDENTIAL, function() {
          var r, _i, _len, _ref;
          if (Helper.hasCredential()) {
            if (Helper.accountIsDemo()) {
              view.enableSwitchRegion();
              ide_event.trigger(ide_event.ACCOUNT_DEMONSTRATE);
              view.hideLoadTime();
              $('#global-region-visualize-VPC').addClass('disabled');
              $('#global-region-visualize-VPC').attr('disabled', true);
            } else {
              view.clearDemo();
              view.enableSwitchRegion();
              if (view) {
                view.reloadResource(null, true);
              }
              view.displayLoadTime();
              $('#global-region-visualize-VPC').removeClass('disabled');
              $('#global-region-visualize-VPC').removeAttr('disabled');
            }
            MC.data.config = {};
            _ref = constant.REGION_KEYS;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              r = _ref[_i];
              MC.data.config[r] = {};
            }
            MC.common.other.initUnmanaged();
            return null;
          } else {
            view.disableSwitchRegion();
            view.showCredential();
            view.renderLoadingFaild();
            return view.hideLoadTime();
          }
        });
        ide_event.onLongListen(ide_event.ACCOUNT_DEMONSTRATE, function() {
          view.setDemo();
          view.renderGlobalDemo();
          return view.renderRegionDemo();
        });
        vpc_model.on('VPC_VPC_DESC_ACCOUNT_ATTRS_RETURN', function(result) {
          model.accountReturnHandler();
          if (!result.is_error) {
            view.enableSwitchRegion();
            if (Helper.accountIsDemo()) {
              ide_event.trigger(ide_event.ACCOUNT_DEMONSTRATE);
              return view.hideLoadTime();
            } else {
              return view.displayLoadTime();
            }
          } else {
            return view.hideLoadTime();
          }
        });
        ide_event.onLongListen(ide_event.UPDATE_DASHBOARD, function() {
          console.log('UPDATE_DASHBOARD');
          if (view) {
            return view.reloadResource(null, false);
          }
        });
        if (MC.common.cookie.getCookieByName('state') === '1') {
          view.showCredential('welcome');
        }
        model.describeAccountAttributesService();
        ide_event.onLongListen('RESULT_APP_LIST', function(result) {
          overview_app = result;
          model.updateMap(model, overview_app, overview_stack);
          model.updateRecentList(model, result, 'recent_launched_apps');
          view.renderMapResult();
          model.getItemList('app', current_region, overview_app);
          appListGot = true;
          if (stackListGot) {
            Helper.cleanupThumbnail();
          }
          return null;
        });
        ide_event.onLongListen('RESULT_STACK_LIST', function(result) {
          console.log('overview RESULT_STACK_LIST');
          overview_stack = result;
          model.updateMap(model, overview_app, overview_stack);
          model.updateRecentList(model, result, 'recent_edited_stacks');
          view.renderMapResult();
          model.getItemList('stack', current_region, overview_stack);
          stackListGot = true;
          if (appListGot) {
            Helper.cleanupThumbnail();
          }
          return null;
        });
        ide_event.onLongListen(ide_event.NAVIGATION_TO_DASHBOARD_REGION, function(result) {
          console.log('NAVIGATION_TO_DASHBOARD_REGION');
          if (result === 'global') {
            ide_event.trigger(ide_event.RETURN_OVERVIEW_TAB);
          }
          return null;
        });
        view.on('SWITCH_REGION', function(region, fakeSwitch) {
          current_region = region;
          model.loadResource(region);
          if (!fakeSwitch) {
            this.model.getItemList('app', region, overview_app);
            return this.model.getItemList('stack', region, overview_stack);
          }
        });
        view.on('RELOAD_RESOURCE', function(region) {
          console.log('dashboard:RELOAD_RESOURCE');
          view.displayLoadTime();
          model.describeAWSResourcesService(region);
          ide_event.trigger(ide_event.UPDATE_STACK_LIST);
          ide_event.trigger(ide_event.UPDATE_APP_LIST);
          MC.common.other.initUnmanaged();
          return null;
        });
        model.on('change:cur_app_list', function() {
          return view.renderRegionAppStack('app');
        });
        ide_event.onLongListen(ide_event.UPDATE_APP_INFO, function(region, id) {
          return model.describeAWSResourcesService(region);
        });
        model.on('UPDATE_REGION_APP_LIST', function() {
          return view.renderRegionAppStack('app');
        });
        model.on('change:cur_stack_list', function() {
          return view.renderRegionAppStack('stack');
        });
        model.on('REGION_RESOURCE_CHANGED', function(type, data) {
          console.log('region resource table render');
          return view.renderRegionResourceBody(type, true);
        });
        return ide_event.onLongListen(ide_event.UPDATE_REGION_THUMBNAIL, function(url, id) {
          console.log('UPDATE_REGION_THUMBNAIL');
          view.updateThumbnail(url, id);
          return null;
        });
      });
    };
    unLoadModule = function() {};
    return {
      loadModule: loadModule,
      unLoadModule: unLoadModule
    };
  });

}).call(this);
