(function() {
  define(['event', 'constant'], function(ide_event, constant) {
    var loadModule, unLoadModule;
    loadModule = function() {
      return require(['./module/design/resource/view', './module/design/resource/model', 'UI.bubble'], function(View, model) {
        var view;
        view = new View();
        view.render();
        view.listen(model);
        view.model = model;
        ide_event.onLongListen(ide_event.OPEN_DESIGN, function(region_name, type, current_platform) {
          console.log('resource:OPEN_DESIGN, region_name ' + region_name + ', type = ' + type + ', current_platform = ' + current_platform);
          view.reRender();
          model.service_count = 0;
          model.set('check_required_service_count', -1);
          MC.data.resouceapi = [];
          ide_event.onListen(ide_event.RESOURCE_QUICKSTART_READY, function(region_name) {
            console.log('resource:RESOURCE_QUICKSTART_READY');
            return model.describeAvailableZonesService(region_name);
          });
          model.quickstartService(region_name);
          model.myAmiService(region_name);
          model.favoriteAmiService(region_name);
          model.describeSnapshotsService(region_name);
          model.describeSubnetInDefaultVpc(region_name);
          view.region = region_name;
          view.resourceVpcRender(current_platform, type);
          view.communityAmiBtnRender();
          return null;
        });
        ide_event.onLongListen(ide_event.ENABLE_RESOURCE_ITEM, function(type, filter) {
          return view.enableItem(type, filter);
        });
        ide_event.onLongListen(ide_event.DISABLE_RESOURCE_ITEM, function(type, filter) {
          return view.disableItem(type, filter);
        });
        ide_event.onLongListen(ide_event.UPDATE_RESOURCE_STATE, function(type) {
          return view.hideResourcePanel(type);
        });
        ide_event.onLongListen(ide_event.SWITCH_TAB, function(type, tab_id) {
          var obj, region_name;
          console.log('resource:SWITCH_TAB', type, tab_id);
          if (type.split('_')[0] === 'OLD') {
            obj = MC.common.other.searchStackAppById(tab_id);
            if (obj) {
              region_name = obj.region;
            }
            model.favoriteAmiService(region_name);
            return null;
          }
        });
        ide_event.onLongListen(ide_event.UPDATE_RESOURCE_STATE, function(type) {
          console.log('resource:UPDATE_RESOURCE_STATE', type);
          if (type === 'hide') {
            view.resourceVpcRender(MC.common.other.canvasData.get('platform'), 'OPEN_APP');
            return model.describeAvailableZonesService(MC.common.other.canvasData.get('region'));
          }
        });
        Design.on(Design.EVENT.AddResource, function(comp) {
          var filter, name, res_type, _ref;
          res_type = constant.RESTYPE;
          if (comp && ((_ref = comp.type) === res_type.AZ || _ref === res_type.IGW || _ref === res_type.VGW)) {
            name = comp.get("name");
            filter = function(data) {
              return data && data.option && data.option.name === name;
            };
            view.disableItem(comp.type, filter);
            console.log("Design.EVENT.AddResource: " + comp.type);
          }
          return null;
        });
        Design.on(Design.EVENT.RemoveResource, function(comp) {
          var filter, name, res_type, _ref;
          res_type = constant.RESTYPE;
          if (comp && ((_ref = comp.type) === res_type.AZ || _ref === res_type.IGW || _ref === res_type.VGW)) {
            name = comp.get("name");
            filter = function(data) {
              return data && data.option && data.option.name === name;
            };
            view.enableItem(comp.type, filter);
            console.log("Design.EVENT.RemoveResource: " + comp.type);
          }
          return null;
        });
        view.on('LOADING_COMMUNITY_AMI', function(region, name, platform, isPublic, architecture, rootDeviceType, perPageNum, pageNum) {
          console.log('LOADING_COMMUNITY_AMI');
          return model.describeCommunityAmiService(region, name, platform, isPublic, architecture, rootDeviceType, perPageNum, pageNum);
        });
        view.on('TOGGLE_FAV', function(region_name, action, amiId, amiVO, noReset) {
          if (action === 'add') {
            return model.addFav(region_name, amiId, amiVO, noReset);
          } else if (action === 'remove') {
            return model.removeFav(region_name, amiId);
          }
        });
        model.on('change:availability_zone', function() {
          console.log('resource availability_zone change');
          return ide_event.trigger(ide_event.RELOAD_AZ, model.get('availability_zone'));
        });
        model.on('change:check_required_service_count', function() {
          var is_true;
          console.log('check_required_service_count, count = ' + model.get('check_required_service_count'));
          is_true = false;
          if (model.get('check_required_service_count') === -1) {
            return;
          }
          if (false && model.get('check_required_service_count') === 1) {
            console.log('not set credential and described quickstart service');
            is_true = true;
          } else if (model.get('check_required_service_count') === 3) {
            console.log('set credential and described require service');
            is_true = true;
          }
          if (is_true) {
            ide_event.trigger(ide_event.RESOURCE_API_COMPLETE);
            model.service_count = 0;
          }
          return null;
        });
        return model.on('refresh_resource_finish', function() {
          return view.stopRefreshResourcePanel();
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
