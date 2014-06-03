(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["component/exporter/Thumbnail", 'MC', 'backbone', 'jquery', 'underscore', 'event', 'stack_service', 'stack_model', 'app_model', 'constant', 'account_model'], function(ThumbUtil, MC, Backbone, $, _, ide_event, stack_service, stack_model, app_model, constant, account_model) {
    var AWSRes, AwsTypeConvertMap, ToolbarModel, is_tab, item_state_map, model, process_data_map, req_map;
    AWSRes = constant.RESTYPE;
    AwsTypeConvertMap = {};
    AwsTypeConvertMap[AWSRes.ACL] = "Network ACL";
    AwsTypeConvertMap[AWSRes.ASG] = "Auto Scaling Group";
    AwsTypeConvertMap[AWSRes.CGW] = "Customer Gateway";
    AwsTypeConvertMap[AWSRes.ELB] = "Load Balancer";
    AwsTypeConvertMap[AWSRes.ENI] = "Network Interface";
    AwsTypeConvertMap[AWSRes.IGW] = "Internet Gateway";
    AwsTypeConvertMap[AWSRes.INSTANCE] = "Instance";
    AwsTypeConvertMap[AWSRes.LC] = "Launch Configuration";
    AwsTypeConvertMap[AWSRes.RT] = "Route Table";
    AwsTypeConvertMap[AWSRes.SG] = "Security Group";
    AwsTypeConvertMap[AWSRes.SUBSCRIPTION] = "SNS Subscription";
    AwsTypeConvertMap[AWSRes.VGW] = "VPN Gateway";
    AwsTypeConvertMap[AWSRes.VPC] = "VPC";
    AwsTypeConvertMap[AWSRes.VPN] = "VPN";
    item_state_map = {};
    process_data_map = {};
    req_map = {};
    if (MC.storage.get('req_map')) {
      req_map = $.extend(true, {}, MC.storage.get('req_map'));
    }
    is_tab = true;
    ToolbarModel = Backbone.Model.extend({
      defaults: {
        'item_flags': null,
        'cf_data': null
      },
      initialize: function() {
        var me;
        me = this;
        me.on('STACK_SAVE_RETURN', function(result) {
          var data, id, name, region;
          console.log('STACK_SAVE_RETURN');
          region = result.param[3];
          data = result.param[4];
          id = data.id;
          name = data.name;
          if (!result.is_error) {
            console.log('save stack successfully');
            me.saveStackCallback(id, name, region);
            return me.trigger('TOOLBAR_HANDLE_SUCCESS', 'SAVE_STACK', name);
          } else {
            me.trigger('TOOLBAR_HANDLE_FAILED', 'SAVE_STACK', name);
            return null;
          }
        });
        me.on('STACK_CREATE_RETURN', function(result) {
          var data, name, old_id, region;
          console.log('STACK_CREATE_RETURN');
          region = result.param[3];
          data = result.param[4];
          old_id = data.id;
          name = data.name;
          if (!result.is_error) {
            console.log('create stack successfully');
            me.createStackCallback(result, old_id, name, region);
            return me.trigger('TOOLBAR_HANDLE_SUCCESS', 'CREATE_STACK', name);
          } else {
            me.trigger('TOOLBAR_HANDLE_FAILED', 'CREATE_STACK', name);
            return null;
          }
        });
        me.on('STACK_SAVE__AS_RETURN', function(result) {
          var id, name, new_id, new_name, region;
          console.log('STACK_SAVE__AS_RETURN');
          region = result.param[3];
          id = result.param[4];
          new_name = result.param[5];
          name = result.param[6];
          if (!result.is_error) {
            console.log('save as stack successfully');
            new_id = result.resolved_data;
            MC.data.stack_list[region].push({
              'id': new_id,
              'name': new_name
            });
            me.savePNG(new_id, 'new', id);
            me.trigger('TOOLBAR_HANDLE_SUCCESS', 'DUPLICATE_STACK', name);
            return ide_event.trigger(ide_event.UPDATE_STACK_LIST, 'DUPLICATE_STACK', [new_id]);
          } else {
            return me.trigger('TOOLBAR_HANDLE_FAILED', 'DUPLICATE_STACK', name);
          }
        });
        me.on('STACK_REMOVE_RETURN', function(result) {
          var id, item, name, region, _i, _len, _ref;
          console.log('STACK_REMOVE_RETURN');
          region = result.param[3];
          id = result.param[4];
          name = result.param[5];
          if (!result.is_error) {
            console.log('send delete stack successful message');
            if (MC.aws.aws.checkStackName(id, name)) {
              _ref = MC.data.stack_list[region];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                item = _ref[_i];
                if (item.id === id && item.name === name) {
                  MC.data.stack_list[region].splice(MC.data.stack_list[region].indexOf(item), 1);
                  break;
                }
              }
            }
            me.trigger('TOOLBAR_HANDLE_SUCCESS', 'REMOVE_STACK', name);
            ide_event.trigger(ide_event.UPDATE_STACK_LIST, 'REMOVE_STACK', [id]);
            ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, id);
            return me.setFlag(id, 'DELETE_STACK');
          } else {
            return me.trigger('TOOLBAR_HANDLE_FAILED', 'REMOVE_STACK', name);
          }
        });
        me.on('STACK_RUN_RETURN', function(result) {
          var app_name, id, region;
          console.log('STACK_RUN_RETURN');
          region = result.param[3];
          id = result.param[4];
          app_name = result.param[5];
          ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'NEW_PROCESS', app_name, region, id);
          return me.handleRequest(result, 'RUN_STACK', region, id, app_name);
        });
        me.on('STACK_EXPORT__CLOUDFORMATION_RETURN', function(result) {
          var cf_data, flag, id, name, region;
          console.log('STACK_EXPORT__CLOUDFORMATION_RETURN');
          region = result.param[3];
          id = result.param[4];
          name = MC.common.other.canvasData.get('name');
          cf_data = me.get('cf_data');
          if (!cf_data) {
            cf_data = {};
          }
          flag = false;
          if (!result.is_error) {
            console.log('export cloudformation successfully');
            cf_data[name] = result.resolved_data;
            flag = true;
          } else {
            console.log('export cloudformation failed');
            if (name in cf_data) {
              delete cf_data[name];
            }
          }
          me.set('cf_data', cf_data);
          if (flag === true) {
            return me.trigger('TOOLBAR_HANDLE_SUCCESS', 'EXPORT_CLOUDFORMATION', name);
          } else {
            return me.trigger('TOOLBAR_HANDLE_FAILED', 'EXPORT_CLOUDFORMATION', name);
          }
        });
        me.on('APP_START_RETURN', function(result) {
          var id, name, region;
          console.log('APP_START_RETURN');
          region = result.param[3];
          id = result.param[4];
          name = result.param[5];
          return me.handleRequest(result, 'START_APP', region, id, name);
        });
        me.on('APP_STOP_RETURN', function(result) {
          var id, name, region;
          console.log('APP_STOP_RETURN');
          region = result.param[3];
          id = result.param[4];
          name = result.param[5];
          return me.handleRequest(result, 'STOP_APP', region, id, name);
        });
        me.on('APP_TERMINATE_RETURN', function(result) {
          var flag, id, name, region;
          console.log('APP_TERMINATE_RETURN');
          region = result.param[3];
          id = result.param[4];
          name = result.param[5];
          flag = result.param[6];
          if (!flag || flag === 0) {
            return me.handleRequest(result, 'TERMINATE_APP', region, id, name);
          } else {
            if (!result.is_error) {
              me.setFlag(id, 'TERMINATED_APP', region);
              ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, id);
              if (__indexOf.call(MC.data.app_list[region], name) >= 0) {
                MC.data.app_list[region].splice(MC.data.app_list[region].indexOf(name), 1);
              }
            } else {
              me.setFlag(id, 'STOPPED_APP', region);
            }
            return ide_event.trigger(ide_event.UPDATE_REGION_RESOURCE, region);
          }
        });
        return me.on('APP_UPDATE_RETURN', function(result) {
          var id, name, region;
          console.log('APP_UPDATE_RETURN');
          region = result.param[3];
          id = result.param[5];
          name = item_state_map[id].name;
          me.handleRequest(result, 'UPDATE_APP', region, id, name);
          return null;
        });
      },
      createStackCallback: function(result, old_id, name, region) {
        var data, new_id;
        console.log('createStackCallback', result, old_id, name, region);
        new_id = result.resolved_data;
        this.savePNG(new_id, 'new', old_id);
        MC.data.stack_list[region].push({
          'id': new_id,
          'name': name
        });
        ide_event.trigger(ide_event.UPDATE_STACK_LIST, 'NEW_STACK', [new_id]);
        if (MC.common.other.isCurrentTab(old_id)) {
          MC.common.other.canvasData.set('id', new_id);
          data = MC.common.other.canvasData.data();
          this.setFlag(old_id, 'CREATE_STACK', data);
          MC.common.other.canvasData.origin(data);
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB, new_id, name + ' - stack', old_id);
          return ide_event.trigger(ide_event.UPDATE_STATUS_BAR_SAVE_TIME);
        } else {
          if (item_state_map && item_state_map[old_id]) {
            item_state_map[new_id] = $.extend(true, {}, item_state_map[old_id]);
            item_state_map[new_id].is_enable = true;
            item_state_map[new_id].is_duplicate = true;
            item_state_map[new_id].is_delete = true;
            delete item_state_map[old_id];
          }
          return ide_event.trigger(ide_event.OPEN_DESIGN_TAB, "OPEN_STACK", name, region, result.resolved_data);
        }
      },
      saveStackCallback: function(id, name, region) {
        console.log('saveStackCallback', id, name, region);
        this.savePNG(id);
        ide_event.trigger(ide_event.UPDATE_STACK_LIST, 'SAVE_STACK', [id]);
        if (MC.common.other.isCurrentTab(id)) {
          this.setFlag(id, 'SAVE_STACK', name);
          ide_event.trigger(ide_event.UPDATE_STATUS_BAR_SAVE_TIME);
        } else {
          ide_event.trigger(ide_event.OPEN_DESIGN_TAB, "OPEN_STACK", name, region, id);
          if (item_state_map && item_state_map[id]) {
            item_state_map[id].is_enable = true;
            item_state_map[id].is_duplicate = true;
            item_state_map[id].is_delete = true;
          }
        }
        return null;
      },
      setFlag: function(id, flag, value) {
        var is_pending, is_running, me, name, region, state, _ref;
        me = this;
        name = MC.common.other.canvasData.get('name');
        state = MC.common.other.canvasData.get('state');
        if (id && _.isObject(id) && flag === 'OPEN_STACK') {
          id = id.resolved_data[0].id;
        }
        if (id && id.split && id.split('-')[0] === 'new' && flag === 'OPEN_STACK') {
          flag = 'NEW_STACK';
        }
        if (flag === 'NEW_STACK') {
          item_state_map[id] = {
            'name': name,
            'is_run': true,
            'is_duplicate': false,
            'is_delete': false,
            'is_zoomin': false,
            'is_zoomout': true,
            'is_enable': true
          };
          is_tab = true;
        } else if (flag === 'OPEN_STACK') {
          item_state_map[id] = {
            'name': name,
            'is_run': true,
            'is_duplicate': true,
            'is_delete': true,
            'is_zoomin': false,
            'is_zoomout': true,
            'is_enable': true
          };
          is_tab = true;
        } else if (flag === 'SAVE_STACK') {
          item_state_map[id].name = value;
          item_state_map[id].is_run = true;
          item_state_map[id].is_duplicate = true;
          item_state_map[id].is_delete = true;
          item_state_map[id].is_enable = true;
        } else if (flag === 'CREATE_STACK') {
          item_state_map[value.id] = {
            'name': value.name,
            'is_run': true,
            'is_duplicate': true,
            'is_delete': true,
            'is_zoomin': item_state_map[id].is_zoomin,
            'is_zoomout': item_state_map[id].is_zoomout,
            'is_enable': true
          };
          delete item_state_map[id];
          id = value.id;
        } else if (flag === 'DELETE_STACK') {
          delete item_state_map[id];
          return;
        } else if (flag === 'ZOOMIN_STACK') {
          item_state_map[id].is_zoomin = value;
          item_state_map[id].is_zoomout = true;
        } else if (flag === 'ZOOMOUT_STACK') {
          item_state_map[id].is_zoomout = value;
          item_state_map[id].is_zoomin = true;
        } else if (flag === 'OPEN_APP') {
          is_running = false;
          is_pending = false;
          if (state === constant.APP_STATE.APP_STATE_STOPPED) {
            is_running = false;
          } else if (state === constant.APP_STATE.APP_STATE_RUNNING) {
            is_running = true;
          } else {
            is_running = false;
            is_pending = true;
          }
          id = id.resolved_data[0].id;
          item_state_map[id] = {
            'name': name,
            'state': state,
            'is_running': is_running,
            'is_pending': is_pending,
            'is_zoomin': false,
            'is_zoomout': true,
            'is_app_updating': false,
            'has_instance_store_ami': me.isInstanceStore(),
            'is_asg': me.isAutoScaling(),
            'is_production': MC.common.other.canvasData.get('usage') !== 'production' ? false : true,
            'has_states': Design.instance().serialize().agent.enabled && (_.some(_.values(Design.instance().serialize().component), function(e) {
              var _ref;
              return ((_ref = e.state) != null ? _ref.length : void 0) > 0;
            }))
          };
          is_tab = true;
        } else if (flag === 'RUNNING_APP') {
          if (id in item_state_map) {
            item_state_map[id].state = constant.APP_STATE.APP_STATE_RUNNING;
            item_state_map[id].is_running = true;
            item_state_map[id].is_pending = false;
          }
          region = value;
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'running', id);
          if (item_state_map && item_state_map[id] && item_state_map[id].is_app_updating === false && item_state_map[id].is_running === true) {
            MC.data.running_app_list[id] = {
              app_id: id,
              state: 'running'
            };
            ide_event.trigger(ide_event.UPDATE_APP_INFO, region, id);
          } else {

          }
        } else if (flag === 'STOPPED_APP') {
          if (id in item_state_map) {
            item_state_map[id].state = constant.APP_STATE.APP_STATE_STOPPED;
            item_state_map[id].is_running = false;
            item_state_map[id].is_pending = false;
          }
          region = value;
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'stopped', id);
          if (item_state_map && item_state_map[id] && item_state_map[id].is_app_updating === false) {
            MC.data.running_app_list[id] = {
              app_id: id,
              state: 'stopped'
            };
            ide_event.trigger(ide_event.UPDATE_APP_INFO, region, id);
          }
        } else if (flag === 'TERMINATED_APP') {
          if (id in item_state_map) {
            delete item_state_map[id];
          }
          region = value;
          return;
        } else if (flag === 'PENDING_APP') {
          if (id in item_state_map) {
            item_state_map[id].is_pending = true;
          }
          region = value;
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'pending', id);
        } else if (flag === 'UPDATE_APP') {
          if (id in item_state_map) {
            item_state_map[id].is_app_updating = value;
          }
        } else if (flag === 'ENABLE_SAVE') {
          if ((_ref = item_state_map[id]) != null) {
            _ref.is_enable = value;
          }
        }
        if (id === MC.common.other.canvasData.get('id') && is_tab) {
          me.set('item_flags', $.extend(true, {}, item_state_map[id]));
          if (id.indexOf('app-') === 0) {
            return me.trigger('UPDATE_TOOLBAR', 'app');
          } else {
            return me.trigger('UPDATE_TOOLBAR', 'stack');
          }
        }
      },
      setTabFlag: function(flag) {
        var id, k, me, rid, v;
        me = this;
        is_tab = flag;
        if (flag) {
          id = MC.data.current_tab_id;
          for (k in item_state_map) {
            v = item_state_map[k];
            if (id === k) {
              rid = k;
            }
          }
          if (rid) {
            me.set('item_flags', $.extend(true, {}, item_state_map[id]));
            if (id && id.split('-') && id.split('-')[0] === 'app') {
              me.trigger('UPDATE_TOOLBAR', 'app');
            } else {
              me.trigger('UPDATE_TOOLBAR', 'stack');
            }
          }
        }
        return null;
      },
      saveStack: function(data) {
        var id, me, name, region;
        me = this;
        region = data.region;
        id = data.id;
        name = data.name;
        if (id.indexOf('stack-', 0) === 0) {
          stack_model.save_stack({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region, data);
        } else {
          MC.common.other.addCacheThumb(id, $("#canvas_body").html(), $("#svg_canvas")[0].getBBox());
          stack_model.create({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region, data);
        }
        return this.setFlag(id, 'ENABLE_SAVE', false);
      },
      syncSaveStack: function(region, data) {
        var deferred, func, id, me, src;
        deferred = Q.defer();
        me = this;
        src = {};
        src.sender = this;
        src.model = null;
        id = MC.common.other.canvasData.get('id');
        if (id && _.isArray(id.split('-'))) {
          if (id.split('-')[0] === 'stack') {
            func = stack_service.save;
          } else if (id.split('-')[0] === 'new') {
            MC.common.other.addCacheThumb(id, $("#canvas_body").html(), $("#svg_canvas")[0].getBBox());
            func = stack_service.create;
          }
          if (_.isFunction(func)) {
            func(src, $.cookie('usercode'), $.cookie('session_id'), region, data, function(aws_result) {
              var name;
              if (!aws_result.is_error) {
                console.log('stack_service api');
                region = aws_result.param[3];
                data = aws_result.param[4];
                id = data.id;
                name = data.name;
                if (id.split('-')[0] === 'stack') {
                  me.saveStackCallback(id, name, region);
                  return deferred.resolve(name);
                } else if (id.split('-')[0] === 'new') {
                  me.createStackCallback(aws_result, id, name, region);
                  return deferred.resolve(name);
                }
              } else {
                console.error('stack_service.save_stack, error is ' + aws_result.error_message);
                return deferred.reject(aws_result);
              }
            });
          }
        }
        return deferred.promise;
      },
      duplicateStack: function(region, id, new_name, name) {
        var me;
        console.log('duplicateStack', region, id, new_name, name);
        me = this;
        MC.common.other.addCacheThumb(id, $("#canvas_body").html(), $("#svg_canvas")[0].getBBox());
        return stack_model.save_as({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, id, new_name, name);
      },
      deleteStack: function(region, id, name) {
        var me;
        me = this;
        stack_model.remove({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, id, name);
        ThumbUtil.remove(id);
        return null;
      },
      runStack: function(data) {
        var app_name, comp, id, idx, me, region, usage, _ref;
        _ref = data.component;
        for (id in _ref) {
          comp = _ref[id];
          if (comp.type === "AWS.EC2.Instance" && comp.state && comp.state.length) {
            MC.Analytics.increase("use_visualops");
            break;
          }
        }
        console.log('runStack', data);
        me = this;
        id = data.id;
        region = data.region;
        app_name = data.name;
        usage = data.usage;
        stack_model.run({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, id, app_name, null, null, null, null, null, usage);
        idx = 'process-' + region + '-' + app_name;
        process_data_map[idx] = data;
        MC.common.other.addCacheThumb(idx, $("#canvas_body").html(), $("#svg_canvas")[0].getBBox());
        return null;
      },
      updateApp: function(is_update) {
        this.setFlag(MC.common.other.canvasData.get('id'), 'UPDATE_APP', is_update);
        return null;
      },
      zoomIn: function() {
        var flag, me;
        me = this;
        if ($canvas.scale() > 1) {
          MC.canvas.zoomIn();
        }
        flag = true;
        if ($canvas.scale() <= 1) {
          flag = false;
        }
        return me.setFlag(MC.common.other.canvasData.get('id'), 'ZOOMIN_STACK', flag);
      },
      zoomOut: function() {
        var flag, me;
        me = this;
        if ($canvas.scale() < 1.6) {
          MC.canvas.zoomOut();
        }
        flag = true;
        if ($canvas.scale() >= 1.6) {
          flag = false;
        }
        return me.setFlag(MC.common.other.canvasData.get('id'), 'ZOOMOUT_STACK', flag);
      },
      savePNG: function(id, type, old_id) {
        var obj;
        console.log('savePNG', id, type, old_id);
        if (type === 'new') {
          obj = MC.common.other.getCacheThumb(old_id);
          if (obj && obj.canvas && obj.svg) {
            ThumbUtil.save(id, obj.canvas, obj.svg);
          }
        } else {
          ThumbUtil.save(id, $("#svg_canvas"));
        }
        return null;
      },
      generatePNG: function() {
        ThumbUtil.exportPNG($("#svg_canvas"), {
          isExport: true,
          createBlob: true,
          name: Design.instance().get("name"),
          id: Design.instance().get("id"),
          onFinish: (function(_this) {
            return function(data) {
              if (data.id === Design.instance().get("id")) {
                return _this.trigger('EXPORT_PNG', data.image, data.id, data.blob);
              }
            };
          })(this)
        });
        return null;
      },
      isChanged: function(data) {
        return true;
      },
      startApp: function(region, id, name) {
        var item, me;
        me = this;
        app_model.start({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, id, name);
        item = {
          'region': region,
          'name': name,
          'id': id,
          'flag_list': {
            'is_pending': true
          }
        };
        return me.updateAppState(constant.OPS_STATE.OPS_STATE_INPROCESS, "START_APP", item);
      },
      stopApp: function(region, id, name) {
        var item, me;
        me = this;
        app_model.stop({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, id, name);
        item = {
          'region': region,
          'name': name,
          'id': id,
          'flag_list': {
            'is_pending': true
          }
        };
        return me.updateAppState(constant.OPS_STATE.OPS_STATE_INPROCESS, "STOP_APP", item);
      },
      terminateApp: function(region, id, name, flag) {
        var item, me;
        me = this;
        app_model.terminate({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, id, name, flag);
        item = {
          'region': region,
          'name': name,
          'id': id,
          'flag_list': {
            'is_pending': true
          }
        };
        me.updateAppState(constant.OPS_STATE.OPS_STATE_INPROCESS, "TERMINATE_APP", item);
        ThumbUtil.remove(id);
        return null;
      },
      saveApp: function(data) {
        var backingStore, backingStoreState, comp, dataState, fastUpdate, id, idx, item, me, name, region, state, uid, __bsBackup, __dtBackup, _ref, _ref1;
        me = this;
        region = data.region;
        id = data.id;
        name = data.name;
        MC.common.other.addCacheThumb(id, $("#canvas_body").html(), $("#svg_canvas")[0].getBBox());
        backingStore = Design.instance().backingStore();
        __bsBackup = $.extend(true, {}, backingStore);
        __dtBackup = $.extend(true, {}, data);
        backingStoreState = {};
        dataState = {};
        _ref = backingStore.component;
        for (uid in _ref) {
          comp = _ref[uid];
          if (comp.type === "AWS.AutoScaling.LaunchConfiguration" || comp.type === "AWS.EC2.Instance") {
            backingStoreState[uid] = comp.state;
            delete comp.state;
          }
        }
        _ref1 = data.component;
        for (uid in _ref1) {
          comp = _ref1[uid];
          if (comp.type === "AWS.AutoScaling.LaunchConfiguration" || comp.type === "AWS.EC2.Instance") {
            dataState[uid] = comp.state;
            delete comp.state;
          }
        }
        fastUpdate = _.isEqual(backingStore.component, data.component);
        for (uid in backingStoreState) {
          state = backingStoreState[uid];
          backingStore.component[uid].state = state;
        }
        for (uid in dataState) {
          state = dataState[uid];
          data.component[uid].state = state;
        }
        console.assert(_.isEqual(backingStore, __bsBackup), "BackingStore Modified.");
        console.assert(_.isEqual(data, __dtBackup), "Data Modified.");
        app_model.update({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, data, id, fastUpdate);
        idx = 'process-' + region + '-' + name;
        process_data_map[idx] = data;
        item = {
          'region': region,
          'name': name,
          'id': id,
          'flag_list': {
            'is_pending': true
          }
        };
        return me.updateAppState(constant.OPS_STATE.OPS_STATE_INPROCESS, "UPDATE_APP", item);
      },
      handleRequest: function(result, flag, region, id, name) {
        var icon, me, req_id, state;
        me = this;
        if (flag !== 'RUN_STACK') {
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'pending', id);
        }
        if (!result.is_error) {
          req_id = result.resolved_data.id;
          console.log('request id:' + req_id);
          req_map[req_id] = {
            flag: flag,
            id: id,
            name: name
          };
          MC.storage.set('req_map', $.extend(true, {}, req_map));
          return null;
        } else {
          if (flag === 'RUN_STACK') {
            if (__indexOf.call(MC.data.app_list[region], name) >= 0) {
              MC.data.app_list[region].splice(MC.data.app_list[region].indexOf(name), 1);
            }
          }
          if (item_state_map[id].is_running === true) {
            state = constant.APP_STATE.APP_STATE_RUNNING;
            icon = 'running';
          } else {
            state = constant.APP_STATE.APP_STATE_STOPPED;
            icon = 'stopped';
          }
          ide_event.trigger(ide_event.UPDATE_APP_STATE, state, id);
          ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, icon, id);
          return ide_event.trigger(ide_event.UPDATE_APP_LIST, null, [id]);
        }
      },
      reqHandle: function(idx, dag) {
        var appId, appName, app_id, app_list, descContent, dones, flag, flag_list, id, item, lst, mainContent, me, name, region, req, req_id, req_list, step, steps, tab_name, template, time_update, _i, _len, _ref;
        me = this;
        req_list = App.WS.collection.request.find({
          '_id': idx
        }).fetch();
        if (req_list.length > 0) {
          req = req_list[0];
          req_id = req.id;
          time_update = 'time_end' in req && req.time_end ? req.time_end : req.time_begin;
          if (req_id in req_map) {
            flag = req_map[req_id].flag;
            id = req_map[req_id].id;
            name = req_map[req_id].name;
            region = req.region;
            if (!flag || !region || !id || !name) {
              return;
            }
            if (!time_update) {
              time_update = Date.now() / 1000;
            }
            item = {
              'region': region,
              'id': id,
              'name': name,
              'time_update': time_update
            };
            flag_list = {};
            switch (req.state) {
              case constant.OPS_STATE.OPS_STATE_INPROCESS:
                flag_list.is_inprocess = true;
                dones = 0;
                steps = 0;
                if ('dag' in dag) {
                  steps = dag.dag.step.length;
                  _ref = dag.dag.step;
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    step = _ref[_i];
                    if (step[1].toLowerCase() === 'done') {
                      dones++;
                    }
                  }
                  console.log('done steps:' + dones);
                }
                tab_name = 'process-' + region + '-' + name;
                if (tab_name in MC.process && dones > 0) {
                  dones = !('dones' in MC.process[tab_name].flag_list) || (MC.process[tab_name].flag_list.dones < dones) ? dones : MC.process[tab_name].flag_list.dones;
                }
                flag_list.dones = dones;
                flag_list.steps = steps;
                if (dones > 0 && steps > 0) {
                  flag_list.rate = Math.round(flag_list.dones * 100 / flag_list.steps);
                } else {
                  flag_list.rate = 0;
                }
                break;
              case constant.OPS_STATE.OPS_STATE_FAILED:
                flag_list.is_failed = true;
                flag_list.err_detail = req.data.replace(/\\n/g, '<br />');
                if (req && req.suggestion && _.isArray(req.suggestion) && req.suggestion.length > 0) {
                  _.each(req.suggestion, function(item) {
                    flag_list.err_detail += '<br/>' + item;
                    return null;
                  });
                }
                if (flag === 'RUN_STACK') {
                  if (__indexOf.call(MC.data.app_list[region], name) >= 0) {
                    MC.data.app_list[region].splice(MC.data.app_list[region].indexOf(name), 1);
                  }
                } else if (flag === 'TERMINATE_APP') {
                  appId = id;
                  appName = name;
                  mainContent = 'The app ' + appName + ' failed to terminate. Do you want to force deleting it?';
                  descContent = '';
                  template = MC.template.modalForceDeleteApp({
                    title: 'Force to delete app',
                    main_content: mainContent,
                    desc_content: descContent
                  });
                  modal(template, false, function() {
                    $('#modal-confirm-delete').click(function() {
                      me.terminateApp(region, appId, appName, 1);
                      return modal.close();
                    });
                    return $('#modal-cancel').click(function() {
                      return me.setFlag(id, 'STOPPED_APP', region);
                    });
                  });
                }
                break;
              case constant.OPS_STATE.OPS_STATE_DONE:
                lst = req.data.split(' ');
                app_id = lst[lst.length - 1];
                flag_list.app_id = app_id;
                flag_list.is_done = true;
                item.id = app_id;
                switch (flag) {
                  case 'RUN_STACK':
                    me.setFlag(app_id, 'RUNNING_APP', region);
                    item.id = app_id;
                    break;
                  case 'START_APP':
                    me.setFlag(id, 'RUNNING_APP', region);
                    break;
                  case 'STOP_APP':
                    me.setFlag(id, 'STOPPED_APP', region);
                    break;
                  case 'TERMINATE_APP':
                    me.setFlag(id, 'TERMINATED_APP', region);
                    if (__indexOf.call(MC.data.app_list[region], name) >= 0) {
                      MC.data.app_list[region].splice(MC.data.app_list[region].indexOf(name), 1);
                    }
                    break;
                  case 'UPDATE_APP':
                    flag_list.is_updated = true;
                    if (id in item_state_map) {
                      if (item_state_map[id].is_running) {
                        me.setFlag(id, 'RUNNING_APP', region);
                      } else {
                        me.setFlag(id, 'STOPPED_APP', region);
                      }
                    }
                    break;
                  default:
                    console.log('not support toolbar operation:' + flag);
                    return;
                }
                break;
              default:
                console.log('not support request state:' + req.state);
            }
            if (flag_list) {
              item.flag_list = flag_list;
              me.updateAppState(req.state, flag, item);
            }
            if (req.state === constant.OPS_STATE.OPS_STATE_DONE || req.state === constant.OPS_STATE.OPS_STATE_FAILED) {
              if (req.state === constant.OPS_STATE.OPS_STATE_DONE) {
                if (flag === 'UPDATE_APP') {
                  me.savePNG(item.id, 'new', item.id);
                }
              }
              app_list = [];
              if (item.id.indexOf('app-') === 0) {
                app_list.push(item.id);
              }
              if (app_list) {
                if (flag !== 'RUN_STACK') {
                  ide_event.trigger(ide_event.UPDATE_APP_LIST, flag, app_list);
                }
              } else {
                ide_event.trigger(ide_event.UPDATE_APP_LIST);
              }
              ide_event.trigger(ide_event.UPDATE_REGION_RESOURCE, region);
              if (req.state === constant.OPS_STATE.OPS_STATE_DONE) {
                me.trigger('TOOLBAR_HANDLE_SUCCESS', flag, name);
              } else if (req.state === constant.OPS_STATE.OPS_STATE_FAILED) {
                me.trigger('TOOLBAR_HANDLE_FAILED', flag, name);
              }
              delete req_map[req_id];
              MC.storage.set('req_map', $.extend(true, {}, req_map));
            }
          }
        }
        return ide_event.trigger(ide_event.UPDATE_HEADER, req);
      },
      updateAppState: function(req_state, flag, data) {
        var me, state, tab_name, _ref;
        me = this;
        state = null;
        switch (req_state) {
          case constant.OPS_STATE.OPS_STATE_DONE:
            if (flag === 'RUN_STACK') {
              state = constant.APP_STATE.APP_STATE_RUNNING;
            } else if (flag === 'START_APP') {
              state = constant.APP_STATE.APP_STATE_RUNNING;
            } else if (flag === 'STOP_APP') {
              state = constant.APP_STATE.APP_STATE_STOPPED;
            } else if (flag === 'TERMINATE_APP') {
              state = constant.APP_STATE.APP_STATE_TERMINATED;
            } else if (flag === 'UPDATE_APP') {
              state = constant.APP_STATE.APP_STATE_RUNNING;
            }
            break;
          case constant.OPS_STATE.OPS_STATE_FAILED:
            state = constant.APP_STATE.APP_STATE_STOPPED;
            break;
          case constant.OPS_STATE.OPS_STATE_INPROCESS:
            if (flag === 'RUN_STACK') {
              state = constant.APP_STATE.APP_STATE_INITIALIZING;
            } else if (flag === 'START_APP') {
              state = constant.APP_STATE.APP_STATE_STARTING;
            } else if (flag === 'STOP_APP') {
              state = constant.APP_STATE.APP_STATE_STOPPING;
            } else if (flag === 'TERMINATE_APP') {
              state = constant.APP_STATE.APP_STATE_TERMINATING;
            } else if (flag === 'UPDATE_APP') {
              state = constant.APP_STATE.APP_STATE_UPDATING;
            }
            break;
          default:
            console.log('not support request state:' + req_state);
        }
        if (state) {
          console.log('toolbar:UPDATE_APP_STATE', state, data);
          data.flag_list.flag = flag;
          tab_name = data.id;
          if (flag === 'RUN_STACK') {
            tab_name = 'process-' + data.region + '-' + data.name;
          }
          MC.process[tab_name] = data;
          if (flag === 'RUN_STACK') {
            if (data && data.flag_list && ((_ref = data.flag_list.is_done) === true || _ref === 'true') && data.flag_list.app_id) {
              me.savePNG(data.flag_list.app_id, 'new', tab_name);
            }
            return ide_event.trigger(ide_event.UPDATE_PROCESS, tab_name);
          } else {
            ide_event.trigger(ide_event.UPDATE_APP_STATE, state, tab_name);
            if (flag === 'UPDATE_APP') {
              if (req_state === constant.OPS_STATE.OPS_STATE_DONE) {
                return console.log('app update success');
              } else if (req_state === constant.OPS_STATE.OPS_STATE_FAILED) {
                return console.log('app update failed');
              }
            }
          }
        }
      },
      isInstanceStore: function() {
        return !Design.instance().isStoppable();
      },
      convertCloudformation: function() {
        var me, region;
        me = this;
        region = MC.common.other.canvasData.get('region');
        stack_model.export_cloudformation({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, MC.common.other.canvasData.data());
        return null;
      },
      isAutoScaling: function() {
        return !!Design.modelClassForType("AWS.AutoScaling.Group").allObjects().length;
      },
      diff: function() {
        var c, dedupMap, dedupResult, diffResult, exist, obj, _i, _j, _len, _len1, _ref, _ref1;
        dedupResult = [];
        dedupMap = {};
        diffResult = Design.instance().diff();
        _ref = diffResult.result;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          obj = _ref[_i];
          if (AwsTypeConvertMap[obj.type]) {
            obj.type = AwsTypeConvertMap[obj.type];
          }
          exist = dedupMap[obj.id];
          if (!exist) {
            exist = dedupMap[obj.id] = obj;
            dedupResult.push(obj);
          } else if (obj.change && obj.change !== "Update") {
            exist.change = obj.change;
          }
          if (obj.changes) {
            exist.changes = obj.changes;
            _ref1 = obj.changes;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              c = _ref1[_j];
              c.info = c.name;
              if (c.count < 0) {
                c.info = c.name + " " + c.count;
              } else if (c.count > 0) {
                c.info = c.name + " +" + c.count;
              }
            }
          }
          if (exist.change === "Delete") {
            exist.info = exist.info || "Deletion cannot be rolled back";
          } else if (exist.change === "Terminate") {
            exist.info = exist.info || "Termination cannot be rolled back";
          }
        }
        diffResult.result = dedupResult;
        return diffResult;
      },
      isAllInstanceNotHaveUserData: function() {
        var InstanceModel, LCModel, instanceModels, lcModels, result;
        result = true;
        InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
        instanceModels = InstanceModel.allObjects();
        _.each(instanceModels, function(instanceModel) {
          var userData;
          userData = instanceModel.get('userData');
          if (userData) {
            result = false;
          }
          return null;
        });
        LCModel = Design.modelClassForType(constant.RESTYPE.LC);
        lcModels = LCModel.allObjects();
        _.each(lcModels, function(lcModel) {
          var userData;
          userData = lcModel.get('userData');
          if (userData) {
            result = false;
          }
          return null;
        });
        return result;
      },
      setAgentEnable: function(isEnable) {
        var InstanceModel, LCModel, instanceModels, lcModels;
        if (isEnable === true) {
          InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
          instanceModels = InstanceModel.allObjects();
          _.each(instanceModels, function(instanceModel) {
            instanceModel.set('userData', '');
            return null;
          });
          LCModel = Design.modelClassForType(constant.RESTYPE.LC);
          lcModels = LCModel.allObjects();
          _.each(lcModels, function(lcModel) {
            lcModel.set('userData', '');
            return null;
          });
        }
        return MC.aws.aws.enableStackAgent(isEnable);
      }
    });
    model = new ToolbarModel();
    return model;
  });

}).call(this);
