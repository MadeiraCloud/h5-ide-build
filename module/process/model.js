(function() {
  define(['i18n!nls/lang.js', 'aws_model', 'ami_model', 'event', 'constant', 'forge_handle', 'UI.notification', 'backbone', 'jquery', 'underscore'], function(lang, aws_model, ami_model, ide_event, constant, forge_handle) {
    var ProcessModel, model;
    ProcessModel = Backbone.Model.extend({
      defaults: {
        'flag_list': null,
        'current_tab_id': null,
        'timeout_obj': {}
      },
      initialize: function() {
        var me;
        me = this;
        me.set('flag_list', {
          'is_pending': true
        });
        this.on('AWS_RESOURCE_RETURN', function(result) {
          var ami_ids, error_message, obj, vpc_id;
          console.log('AWS_RESOURCE_RETURN', result);
          if (result && !result.is_error && result.resolved_data && result.resolved_data.length > 0) {
            vpc_id = result.param[4][constant.RESTYPE.VPC].id[0];
            obj = MC.common.other.setCacheMap(vpc_id, result, null, null);
            ami_ids = MC.forge.app.getAmis(result.resolved_data[0]);
            if (_.isEmpty(ami_ids)) {
              this.setCacheMapDataFlg(obj);
            } else {
              this.set('current_tab_id', obj.id);
              this.getDescribeImages(result.param[3], ami_ids);
            }
            return null;
          } else if (result) {
            vpc_id = result.param[4][constant.RESTYPE.VPC].id[0];
            obj = MC.common.other.setCacheMap(vpc_id, null, 'ERROR', null, null);
            if (!result.is_error && _.isEmpty(result.resolved_data)) {
              MC.common.other.delUnmanaged(vpc_id);
              error_message = lang.ide.NOTIFY_MSG_WARN_VPC_DOES_NOT_EXIST;
            } else if (result.is_error) {
              error_message = result.error_message;
            }
            obj = MC.common.other.searchCacheMap({
              key: 'origin_id',
              value: vpc_id
            });
            if (obj && obj.id) {
              ide_event.trigger(ide_event.CLOSE_DESIGN_TAB, obj.id);
            }
            notification('error', error_message, false);
            return null;
          }
        });
        this.on('EC2_AMI_DESC_IMAGES_RETURN', function(result) {
          var ami, amis, current_tab_id, origin_obj, _i, _len, _ref;
          console.log('EC2_AMI_DESC_IMAGES_RETURN', result);
          if (result && !result.is_error) {
            if (result.resolved_data && result.resolved_data.length > 0) {
              amis = {
                "DescribeImages": []
              };
              _ref = result.resolved_data;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                ami = _ref[_i];
                amis.DescribeImages.push(ami);
              }
              MC.aws.aws.cacheResource(amis, result.param[3], false);
            }
            current_tab_id = result.param[0].src.sender.get('current_tab_id');
            console.log('EC2_AMI_DESC_IMAGES_RETURN, current_tab_id', current_tab_id);
            origin_obj = MC.common.other.getCacheMap(current_tab_id);
            this.setCacheMapDataFlg(origin_obj);
            return null;
          }
        });
        return setInterval((function() {
          var obj, t1, t2;
          if (MC.common.other.processType(MC.data.current_tab_id) !== 'appview') {
            return;
          }
          obj = MC.common.other.getCacheMap(MC.data.current_tab_id);
          if (!obj) {
            return;
          }
          if (obj.create_time === 'overtime' || obj.state === 'FINISH') {
            return;
          }
          t1 = obj.origin_time;
          t2 = new Date();
          if (MC.timestamp(t1, t2, 's') > 10) {
            MC.common.other.setCacheMap(obj.origin_id, null, null, null, 'timeout');
            me.set('timeout_obj', {
              'id': obj.id,
              'timeout': true,
              'overtime': false
            });
          }
          if (MC.timestamp(t1, t2, 'm') > 10) {
            MC.common.other.setCacheMap(obj.origin_id, null, null, null, 'overtime');
            return me.set('timeout_obj', {
              'id': obj.id,
              'timeout': true,
              'overtime': true
            });
          }
        }), 1000);
      },
      getProcess: function(tab_name) {
        var flag_list, last_flag, me;
        me = this;
        if (MC.process[tab_name]) {
          flag_list = MC.process[tab_name].flag_list;
          console.log('tab name:' + tab_name);
          console.log('flag_list:' + flag_list);
          last_flag = me.get('flag_list');
          me.set('flag_list', flag_list);
          if ('is_done' in flag_list && flag_list.is_done) {
            $('#progress_bar').css('width', "100%");
            $('#progress_num').text(last_flag.steps);
            $('#progress_total').text(last_flag.steps);
            ide_event.trigger(ide_event.SWITCH_WAITING_BAR);
            setTimeout(function() {
              var app_id, app_name, region;
              app_id = flag_list.app_id;
              region = MC.process[tab_name].region;
              app_name = MC.process[tab_name].name;
              if (MC.data.current_tab_id !== 'process-' + region + '-' + app_name) {
                return;
              }
              return setTimeout(function() {
                ide_event.trigger(ide_event.UPDATE_DESIGN_TAB, app_id, app_name + ' - app');
                ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'RELOAD_APP', app_name, region, app_id);
                return ide_event.trigger(ide_event.UPDATE_APP_LIST, 'RUN_STACK', [app_id]);
              }, 800);
            }, 1000);
          } else if ('is_inprocess' in flag_list && flag_list.is_inprocess) {
            if (flag_list.dones > 0 && 'steps' in flag_list && flag_list.steps > 0) {
              $('#progress_bar').css('width', Math.round(flag_list.dones / flag_list.steps * 100) + "%");
              $('#progress_num').text(flag_list.dones);
            } else {
              $('#progress_bar').css('width', "0");
              $('#progress_num').text('0');
            }
            $('#progress_total').text(flag_list.steps);
          } else {
            me.set('flag_list', flag_list);
          }
        }
        return null;
      },
      getTimestamp: function(state, tab_id) {
        var obj;
        console.log('getTimestamp', state, tab_id);
        if (state === 'OPEN_PROCESS') {
          this.set('timeout_obj', {
            'id': tab_id,
            'timeout': false,
            'overtime': false
          });
        } else if (state === 'OLD_PROCESS') {
          obj = MC.common.other.getCacheMap(tab_id);
          if (obj && obj.create_time === 'timeout') {
            this.set('timeout_obj', {
              'id': tab_id,
              'timeout': true,
              'overtime': false
            });
          }
          if (obj && obj.create_time === 'overtime') {
            this.set('timeout_obj', {
              'id': tab_id,
              'timeout': true,
              'overtime': true
            });
          } else if (obj && obj.create_time !== ['timeout', 'overtime']) {
            this.set('timeout_obj', {
              'id': tab_id,
              'timeout': false,
              'overtime': false
            });
          }
        }
        return null;
      },
      getVpcResourceService: function(region, vpc_id, state) {
        var obj, resources;
        console.log('getVpcResourceService', region, vpc_id, state);
        if (state === 'OPEN_PROCESS') {
          resources = MC.common.other.getUnmanagedVpc(vpc_id);
          if (resources && resources.origin) {
            delete resources.origin;
          }
          MC.session.remove('aws_resource_' + region);
          aws_model.resource({
            sender: this
          }, $.cookie('usercode'), $.cookie('session_id'), region, resources, 'vpc', 1);
          MC.common.other.setCacheMap(vpc_id, null, 'OLD', null);
        } else if (state === 'OLD_PROCESS') {
          obj = MC.common.other.searchCacheMap({
            key: 'origin_id',
            value: vpc_id
          });
          if (obj && obj.data && obj.state === 'FINISH') {
            this.reloadAppView(obj);
          } else if (obj && obj.id) {
            ide_event.trigger(ide_event.UPDATE_DESIGN_TAB_ICON, 'visualization', obj.id);
          } else {
            console.log('not found process');
          }
        }
        return null;
      },
      getDescribeImages: function(region, ami_ids) {
        var me;
        console.log('getDescribeImages', region, ami_ids);
        me = $.extend(true, {}, this);
        ami_model.DescribeImages({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region, ami_ids);
        return null;
      },
      setCacheMapDataFlg: function(data) {
        var obj;
        console.log('setCacheMapDataFlg', data);
        obj = MC.common.other.setCacheMap(data.origin_id, null, 'FINISH', null);
        if (MC.common.other.isCurrentTab(obj.id)) {
          this.reloadAppView(obj);
        }
        return null;
      },
      reloadAppView: function(obj) {
        var appview_id;
        console.log('reloadAppView', obj);
        MC.common.other.setCacheMap(obj.origin_id, null, null, 'appview');
        appview_id = 'appview-' + obj.uid;
        ide_event.trigger(ide_event.UPDATE_DESIGN_TAB, appview_id, obj.origin_id + ' - visualization');
        ide_event.trigger(ide_event.OPEN_DESIGN_TAB, 'RELOAD_APPVIEW', obj.origin_id, obj.region, appview_id);
        return null;
      }
    });
    model = new ProcessModel();
    return model;
  });

}).call(this);
