(function() {
  define(['Design', 'MC', 'event', 'constant', 'app_model', 'stack_model', 'state_model', 'instance_service', 'ami_service', 'i18n!nls/lang.js', 'underscore', 'backbone'], function(Design, MC, ide_event, constant, app_model, stack_model, state_model, instance_service, ami_service, lang, _) {
    var DesignModel, model;
    DesignModel = Backbone.Model.extend({
      defaults: {
        snapshot: null
      },
      initialize: function() {
        var me;
        me = this;
        me.on('APP_RESOURCE_RETURN', function(result) {
          var app_id, app_name, error;
          app_id = result.param[4];
          console.log('APP_RESOURCE_RETURN', app_id);
          if (!result.is_error) {
            try {
              if (app_id === MC.data.current_tab_id) {
                this.setCurrentResource(result);
                MC.canvas.event.clearList();
                $canvas.trigger("CANVAS_NODE_SELECTED", "");
              } else {
                this.setOriginResource(result, app_id);
              }
            } catch (_error) {
              error = _error;
              app_name = MC.forge.app.getNameById(app_id);
              notification('error', sprintf(lang.ide.TOOL_MSG_INFO_APP_REFRESH_FAILED, app_name ? app_name : app_id + '(closed)'));
              console.error('[error]APP_RESOURCE_RETURN' + error);
            }
          } else {

          }
          if (app_id === MC.data.current_tab_id) {
            ide_event.trigger(ide_event.GET_STATE_MODULE);
          }
          return null;
        });
        return me.on('APP_INFO_RETURN', function(result) {
          var app_id;
          console.log('APP_INFO_RETURN');
          app_id = result.param[4][0];
          if (app_id === MC.data.current_tab_id) {
            this.setCanvasData(result.resolved_data[0]);
            this.setOriginData(result.resolved_data[0]);
            if (MC.data.running_app_list && MC.data.running_app_list[app_id] && MC.data.running_app_list[app_id].state === 'stopped') {
              MC.common.other.canvasData.save(MC.common.other.canvasData.data(true));
            }
            MC.common.other.canvasData.set('state', MC.common.other.canvasData.data('origin').state);
          } else {
            this.updateAppTabDate(result.resolved_data[0], app_id);
            this.updateAppTabOriginDate(result.resolved_data[0], app_id);
          }
          this.getAppResourcesService(result.param[3], app_id);
          return null;
        });
      },
      addTab: function(tab_id, snapshot, design_model, data, origin_data, property_panel, origin_ta_valid) {
        console.log('addTab');
        MC.tab[tab_id] = {
          'snapshot': snapshot,
          'design_model': design_model,
          'data': data,
          'origin_data': origin_data,
          'property_panel': property_panel,
          'origin_ta_valid': origin_ta_valid
        };
        return null;
      },
      deleteTab: function(tab_id) {
        var obj;
        console.log('deleteTab');
        delete MC.tab[tab_id];
        console.log(MC.tab);
        if (MC.process[tab_id] && tab_id.split('-')[0] === 'process') {
          MC.common.other.deleteProcess(tab_id);
        }
        console.log(MC.process);
        obj = MC.common.other.getCacheMap(tab_id);
        if (obj && obj.state === 'ERROR' || tab_id.split('-')[0] === 'appview') {
          MC.common.other.delCacheMap(tab_id);
        }
        return null;
      },
      getTab: function(type, tab_id) {
        console.log('getTab');
        this.set('snapshot', Math.round(+new Date()));
        ide_event.trigger(ide_event.SWITCH_WAITING_BAR);
        this.set('snapshot', MC.tab[tab_id].snapshot);
        this.setDesignModel(MC.tab[tab_id].design_model);
        this.setCanvasData(MC.tab[tab_id].data);
        this.setOriginData(MC.tab[tab_id].origin_data);
        if (MC.tab[tab_id].origin_resource) {
          this.setCurrentResource(MC.tab[tab_id].origin_resource);
        }
        this.setPropertyPanel(MC.tab[tab_id].property_panel);
        this.setTAValidation(MC.tab[tab_id].origin_ta_valid);
        return null;
      },
      updateAppTabDate: function(data, tab_id) {
        console.log('updateAppTabDate');
        if (MC.tab[tab_id]) {
          MC.tab[tab_id].data = $.extend(true, {}, data);
          MC.tab[tab_id].design_model.save(data);
          MC.tab[tab_id].design_model.set('state', data.state);
        }
        return null;
      },
      updateAppTabOriginDate: function(data, tab_id) {
        console.log('updateAppTabOriginDate');
        if (MC.tab[tab_id]) {
          MC.tab[tab_id].origin_data = $.extend(true, {}, data);
        }
        return null;
      },
      updateTab: function(new_tab_id, old_tab_id) {
        var old_tab;
        console.log('updateTab', new_tab_id, old_tab_id);
        old_tab = $.extend(true, {}, MC.tab[old_tab_id]);
        if (old_tab) {
          old_tab.data.id = new_tab_id;
          old_tab.origin_data.id = new_tab_id;
          old_tab.design_model.set('id', new_tab_id);
          MC.tab[new_tab_id] = $.extend(true, {}, old_tab);
          return delete MC.tab[old_tab_id];
        }
      },
      setCanvasData: function(data) {
        console.log('setCanvasData');
        MC.common.other.canvasData.init(data);
        return null;
      },
      getCanvasData: function() {
        console.log('getCanvasData');
        return MC.common.other.canvasData.data();
      },
      setPropertyPanel: function(property_panel) {
        console.log('setPropertyPanel');
        this.trigger("SET_PROPERTY_PANEL", property_panel);
        return null;
      },
      setOriginData: function(data) {
        console.log('setOriginData');
        MC.common.other.canvasData.origin(data);
        return null;
      },
      getOriginData: function() {
        console.log('getOriginData');
        return MC.common.other.canvasData.origin();
      },
      setTAValidation: function(data) {
        console.log('setTAValidation');
        MC.ta.list = $.extend(true, [], data);
        return null;
      },
      getTAValidation: function() {
        console.log('getTAValidation');
        return $.extend(true, [], MC.ta.list);
      },
      setOriginResource: function(data, tab_id) {
        console.log('setOriginResource', data, tab_id);
        if (MC.tab[tab_id]) {
          MC.tab[tab_id].origin_resource = $.extend(true, {}, data);
        }
        return null;
      },
      setDesignModel: function(design) {
        console.log('setDesignModel');
        design.use();
        return null;
      },
      getDesignModel: function() {
        console.log('getDesignModel');
        return Design.instance();
      },
      describeInstancesOfASG: function(region) {
        var asg, asg_arn, asg_list, asg_res, error, ins, instance_ids, instance_memeber, src, _i, _j, _len, _len1, _ref;
        console.log('describeInstancesOfASG', region);
        instance_ids = [];
        try {
          asg_list = Design.modelClassForType(constant.RESTYPE.ASG).allObjects();
          for (_i = 0, _len = asg_list.length; _i < _len; _i++) {
            asg = asg_list[_i];
            asg_arn = asg.get("appId");
            asg_res = MC.data.resource_list[region][asg_arn];
            instance_memeber = asg_res && asg_res.Instances ? asg_res.Instances.member : null;
            _ref = instance_memeber || [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              ins = _ref[_j];
              instance_ids.push(ins.InstanceId);
            }
          }
          src = {};
          src.sender = this;
          src.model = null;
          if (instance_ids.length > 0) {
            instance_service.DescribeInstances(src, $.cookie('usercode'), $.cookie('session_id'), region, instance_ids, null, function(aws_result) {
              if (!aws_result.is_error) {
                console.log('instance_service.DescribeInstances');
                if (aws_result.resolved_data) {
                  _.map(aws_result.resolved_data, function(ins, i) {
                    MC.data.resource_list[region][ins.instanceId] = ins;
                    return null;
                  });
                }
                return null;
              } else {
                return console.log('instance.DescribeInstances failed, error is ' + aws_result.error_message);
              }
            });
          } else {

          }
        } catch (_error) {
          error = _error;
          console.error('[error]describeInstancesOfASG');
        }
        return null;
      },
      appInfoService: function(region_name, app_id) {
        console.log('appInfoService', region_name, app_id);
        return app_model.info({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), region_name, [app_id]);
      },
      getAppResourcesService: function(region, app_id) {
        console.log('getAppResourcesService', region, app_id);
        return app_model.resource({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), region, app_id);
      },
      returnAppState: function(type, state) {
        var temp;
        console.log('returnAppState', type, state);
        if (state) {
          temp = state;
        } else {
          switch (type) {
            case 'START_APP':
              temp = constant.APP_STATE.APP_STATE_STARTING;
              break;
            case 'STOP_APP':
              temp = constant.APP_STATE.APP_STATE_STOPPING;
              break;
            case 'TERMINATE_APP':
              temp = constant.APP_STATE.APP_STATE_TERMINATING;
              break;
            default:
              console.log('current type = ' + type + ', state is =' + state);
              console.log(MC.data.process[MC.data.current_tab_id]);
          }
        }
        return temp;
      },
      setCurrentResource: function(data) {
        var app_id, options, region, resource_source, result, uid;
        console.log('setCurrentResource', data);
        result = $.extend(true, {}, data);
        app_id = result.param[4];
        region = result.param[3];
        resource_source = result.resolved_data;
        if (MC.data.running_app_list && MC.data.running_app_list[app_id] && MC.data.running_app_list[app_id].state === 'running') {
          console.log('when OPEN_APP or stop → start app use it');
          $('#vpc_layer, #az_layer, #subnet_layer, #asg_layer, #line_layer, #node_layer').empty();
          options = {
            mode: 'app'
          };
          new Design(MC.common.other.canvasData.origin(), options);
        }
        delete MC.data.running_app_list[app_id];
        if (resource_source) {
          Design.instance().clearResourceInCache();
          MC.aws.aws.cacheResource(resource_source, region, false);
          this.describeInstancesOfASG(region);
        }
        MC.common.other.canvasData.set('layout', {
          'connection': {}
        });
        uid = $canvas.selected_node()[0];
        if (uid) {
          MC.canvas.select(uid);
        }
        Design.instance().trigger(Design.EVENT.AwsResourceUpdated);
        this.setOriginData(MC.common.other.canvasData.data());
        if (MC.tab && MC.tab[app_id] && MC.tab[app_id].origin_resource) {
          MC.tab[app_id].origin_resource = null;
        }
        return console.log('set app.resource end');
      },
      getStateModule: function() {
        var agentData, me, modRepo, modTag, mod_version;
        console.log('getStateModule');
        me = this;
        me.off('STATE_MODULE_RETURN');
        agentData = MC.common.other.canvasData.get('agent');
        modRepo = agentData.module.repo;
        modTag = agentData.module.tag;
        mod_version = modRepo + ':' + modTag;
        if (!MC.data.state.module) {
          MC.data.state.module = {};
        }
        if (!MC.data.state.module[mod_version]) {
          state_model.module({
            sender: me,
            mod_version: mod_version
          }, $.cookie('usercode'), $.cookie('session_id'), modRepo, modTag);
          return me.on('STATE_MODULE_RETURN', function(result, src) {
            console.log('STATE_MODULE_RETURN');
            if (!result.is_error) {
              MC.data.state.module[src.mod_version] = result.resolved_data;
              console.log('----------- design:SWITCH_MAIN -----------');
              ide_event.trigger(ide_event.SWITCH_MAIN);
            }
            return null;
          });
        } else {
          console.log('----------- design:SWITCH_MAIN -----------');
          return ide_event.trigger(ide_event.SWITCH_MAIN);
        }
      }
    });
    model = new DesignModel();
    return model;
  });

}).call(this);
