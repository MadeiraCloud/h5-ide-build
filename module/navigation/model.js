(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['app_model', 'stack_model', 'ec2_model', 'state_model', 'aws_model', 'constant', 'event', 'backbone', 'jquery', 'underscore'], function(app_model, stack_model, ec2_model, state_model, aws_model, constant, ide_event) {
    var NavigationModel, model, stack_region_list;
    stack_region_list = [];
    NavigationModel = Backbone.Model.extend({
      defaults: {
        'app_list': null,
        'stack_list': null,
        'region_list': null,
        'region_empty_list': null
      },
      initialize: function() {
        var me;
        me = this;
        me.on('APP_LST_RETURN', function(result) {
          var app_list, ids, idx, item, new_app_list, ni, nrv, oi, orv, rv, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
          console.log('APP_LST_RETURN');
          if (result.is_error) {
            return;
          }
          ids = result.param[4];
          app_list = [];
          if (ids) {
            app_list = $.extend(true, [], me.get('app_list'));
            new_app_list = _.map(result.resolved_data, function(value, key) {
              return {
                'region_group': constant.REGION_SHORT_LABEL[key],
                'region_count': value.length,
                'region_name_group': value
              };
            });
            for (_i = 0, _len = new_app_list.length; _i < _len; _i++) {
              nrv = new_app_list[_i];
              for (_j = 0, _len1 = app_list.length; _j < _len1; _j++) {
                orv = app_list[_j];
                if (orv.region_group === nrv.region_group) {
                  rv = orv;
                }
              }
              idx = app_list.indexOf(rv);
              if (rv) {
                _ref = nrv.region_name_group;
                for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                  ni = _ref[_k];
                  _ref1 = rv.region_name_group;
                  for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
                    oi = _ref1[_l];
                    if (oi.id === ni.id) {
                      item = oi;
                    }
                  }
                  if (item) {
                    rv.region_name_group.splice(rv.region_name_group.indexOf(item), 1, ni);
                  } else {
                    rv.region_name_group.push(ni);
                  }
                  if (_ref2 = ni.id, __indexOf.call(ids, _ref2) >= 0) {
                    ids.splice(ids.indexOf(ni.id), 1);
                  }
                }
                rv.region_count = rv.region_name_group.length;
                app_list.splice(idx, 1, rv);
              } else {
                app_list.push(nrv);
                _ref3 = nrv.region_name_group;
                for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
                  item = _ref3[_m];
                  if (_ref4 = item.id, __indexOf.call(ids, _ref4) >= 0) {
                    ids.splice(ids.indexOf(item.id), 1);
                  }
                }
              }
            }
            if (ids.length > 0) {
              new_app_list = [];
              for (_n = 0, _len5 = app_list.length; _n < _len5; _n++) {
                rv = app_list[_n];
                nrv = {
                  'region_group': rv.region_group,
                  'region_name_group': []
                };
                _ref5 = rv.region_name_group;
                for (_o = 0, _len6 = _ref5.length; _o < _len6; _o++) {
                  item = _ref5[_o];
                  if (_ref6 = item.id, __indexOf.call(ids, _ref6) >= 0) {
                    continue;
                  }
                  nrv.region_name_group.push(item);
                }
                nrv.region_count = nrv.region_name_group.length;
                if (nrv.region_count > 0) {
                  new_app_list.push(nrv);
                }
              }
              app_list = new_app_list;
            }
          } else {
            app_list = _.map(result.resolved_data, function(value, key) {
              return {
                'region_group': constant.REGION_SHORT_LABEL[key],
                'region_count': value.length,
                'region_name_group': value
              };
            });
          }
          console.log(app_list);
          me.set('app_list', $.extend(true, [], app_list));
          return null;
        });
        me.on('STACK_LST_RETURN', function(result) {
          var ids, idx, item, new_stack_list, ni, nrv, oi, orv, rv, stack_list, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
          console.log('STACK_LST_RETURN');
          if (result.is_error) {
            return;
          }
          ids = result.param[4];
          stack_list = [];
          if (ids) {
            stack_list = $.extend(true, [], me.get('stack_list'));
            new_stack_list = _.map(result.resolved_data, function(value, key) {
              return {
                'region_group': constant.REGION_SHORT_LABEL[key],
                'region_count': value.length,
                'region_name_group': value
              };
            });
            for (_i = 0, _len = new_stack_list.length; _i < _len; _i++) {
              nrv = new_stack_list[_i];
              for (_j = 0, _len1 = stack_list.length; _j < _len1; _j++) {
                orv = stack_list[_j];
                if (orv.region_group === nrv.region_group) {
                  rv = orv;
                }
              }
              idx = stack_list.indexOf(rv);
              if (rv) {
                _ref = nrv.region_name_group;
                for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
                  ni = _ref[_k];
                  _ref1 = rv.region_name_group;
                  for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
                    oi = _ref1[_l];
                    if (oi.id === ni.id) {
                      item = oi;
                    }
                  }
                  if (item) {
                    rv.region_name_group.splice(rv.region_name_group.indexOf(item), 1, ni);
                  } else {
                    rv.region_name_group.push(ni);
                  }
                  if (_ref2 = ni.id, __indexOf.call(ids, _ref2) >= 0) {
                    ids.splice(ids.indexOf(ni.id), 1);
                  }
                }
                rv.region_count = rv.region_name_group.length;
                stack_list.splice(idx, 1, rv);
              } else {
                stack_list.push(nrv);
                _ref3 = nrv.region_name_group;
                for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
                  item = _ref3[_m];
                  if (_ref4 = item.id, __indexOf.call(ids, _ref4) >= 0) {
                    ids.splice(ids.indexOf(item.id), 1);
                  }
                }
              }
            }
            if (ids.length > 0) {
              new_stack_list = [];
              for (_n = 0, _len5 = stack_list.length; _n < _len5; _n++) {
                rv = stack_list[_n];
                nrv = {
                  'region_group': rv.region_group,
                  'region_name_group': []
                };
                _ref5 = rv.region_name_group;
                for (_o = 0, _len6 = _ref5.length; _o < _len6; _o++) {
                  item = _ref5[_o];
                  if (_ref6 = item.id, __indexOf.call(ids, _ref6) >= 0) {
                    continue;
                  }
                  nrv.region_name_group.push(item);
                }
                nrv.region_count = nrv.region_name_group.length;
                if (nrv.region_count > 0) {
                  new_stack_list.push(nrv);
                }
              }
              stack_list = new_stack_list;
            }
          } else {
            stack_list = _.map(result.resolved_data, function(value, key) {
              return {
                'region_group': constant.REGION_SHORT_LABEL[key],
                'region_count': value.length,
                'region_name_group': value
              };
            });
          }
          console.log(stack_list);
          me.set('stack_list', $.extend(true, [], stack_list));
          stack_region_list = [];
          _.each(stack_list, function(item) {
            return stack_region_list.push(item.region_name_group[0].region);
          });
          this.regionEmptyList();
          return null;
        });
        me.on('EC2_EC2_DESC_REGIONS_RETURN', function(result) {
          var region_list;
          console.log('EC2_EC2_DESC_REGIONS_RETURN');
          region_list = [];
          if (!result.is_error) {
            region_list = _.map(result.resolved_data.item, function(value, key) {
              var region_area, region_city;
              region_city = constant.REGION_SHORT_LABEL[value.regionName];
              region_area = constant.REGION_LABEL[value.regionName];
              return {
                'region_city': region_city,
                'region_area': region_area,
                'region_name': value.regionName
              };
            });
          } else {
            region_list = _.map(constant.REGION_KEYS, function(region) {
              var region_area, region_city;
              region_city = constant.REGION_SHORT_LABEL[region];
              region_area = constant.REGION_LABEL[region];
              return {
                'region_city': region_city,
                'region_area': region_area,
                'region_name': region
              };
            });
          }
          console.log(region_list);
          me.set('region_list', $.extend(true, [], region_list));
          return null;
        });
        return null;
      },
      appListService: function(flag, ids) {
        console.log('appListService', flag, ids);
        return app_model.list({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), null, ids);
      },
      stackListService: function(flag, ids) {
        console.log('stackListService', flag, ids);
        return stack_model.list({
          sender: this
        }, $.cookie('usercode'), $.cookie('session_id'), null, ids);
      },
      regionEmptyList: function() {
        var diff, region_empty_list;
        console.log('regionEmptyList');
        diff = _.difference(_.keys(constant.REGION_SHORT_LABEL), stack_region_list);
        region_empty_list = _.map(diff, function(val) {
          return constant.REGION_SHORT_LABEL[val];
        });
        console.log(region_empty_list);
        this.set('region_empty_list', $.extend(true, [], region_empty_list));
        return null;
      },
      describeRegionsService: function() {
        var me;
        me = this;
        return ec2_model.DescribeRegions({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), null, null);
      },
      updateApplistState: function(type, id) {
        var temp;
        console.log('updateApplistState', type, id);
        console.log(this.get('app_list'));
        temp = $.extend(true, [], this.get('app_list'));
        _.each(temp, function(obj) {
          return _.each(obj.region_name_group, function(item) {
            if (item.id === id) {
              item.state = type;
            }
            return null;
          });
        });
        console.log(temp);
        this.set('app_list', temp);
        MC.data.nav_app_list = this.get('app_list');
        return null;
      },
      getStateAWSProperty: function() {
        var me;
        console.log('getStateAWSProperty');
        me = this;
        aws_model.property({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'));
        return me.on('AWS_PROPERTY_RETURN', function(result) {
          if (!result.is_error) {
            MC.data.state.aws_property = result.resolved_data;
            ide_event.trigger(ide_event.IDE_AVAILABLE);
          }
          return null;
        });
      },
      listenStateStatusList: function() {
        var handle, query;
        App.WS.collection.status.find().fetch();
        query = App.WS.collection.status.find();
        handle = query.observe({
          added: function(idx, statusData) {
            var newStateUpdateResIdAry;
            ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA, 'add', idx, statusData);
            newStateUpdateResIdAry = [];
            if (idx) {
              newStateUpdateResIdAry.push(idx.res_id);
            }
            return ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR, newStateUpdateResIdAry);
          },
          changed: function(newDocument, oldDocument) {
            var newStateUpdateResIdAry;
            ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA, 'change', newDocument, oldDocument);
            newStateUpdateResIdAry = [];
            if (newDocument) {
              newStateUpdateResIdAry.push(newDocument.res_id);
            }
            return ide_event.trigger(ide_event.UPDATE_STATE_STATUS_DATA_TO_EDITOR, newStateUpdateResIdAry);
          }
        });
        return null;
      }
    });
    model = new NavigationModel();
    return model;
  });

}).call(this);
