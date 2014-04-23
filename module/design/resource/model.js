(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['i18n!nls/lang.js', 'ec2_service', 'ebs_model', 'aws_model', 'ami_model', 'favorite_model', 'MC', 'constant', 'event', 'subnet_model', 'Design', 'backbone', 'jquery', 'underscore'], function(lang, ec2_service, ebs_model, aws_model, ami_model, favorite_model, MC, constant, ide_event, subnet_model, Design) {
    var ResourcePanelModel, ami_instance_type, community_ami, model;
    ami_instance_type = null;
    community_ami = {};
    ResourcePanelModel = Backbone.Model.extend({
      defaults: {
        'availability_zone': null,
        'resource_snapshot': null,
        'quickstart_ami': null,
        'my_ami': null,
        'favorite_ami': null,
        'community_ami': null,
        'check_required_service_count': null
      },
      service_count: 0,
      setting: {
        noReset: false
      },
      initialize: function() {
        var me;
        me = this;
        me.on('EC2_EBS_DESC_SSS_RETURN', function(result) {
          var region_name;
          console.log('EC2_EBS_DESC_SSS_RETURN');
          region_name = result.param[3];
          if (!result.is_error) {
            me.set('resource_snapshot', result.resolved_data);
            MC.data.config[region_name].snapshot_list = result.resolved_data;
          }
          return null;
        });
        me.on('AWS_QUICKSTART_RETURN', function(result) {
          var ami_list, i, instanceTypeData, instanceTypeMap, quickstart_amis, region_ami_instance_type, region_name, _i, _j, _len, _len1, _ref;
          region_name = result.param[3];
          console.log('AWS_QUICKSTART_RETURN: ' + region_name);
          if (!result.is_error) {
            ami_list = [];
            ami_instance_type = result.resolved_data.ami_instance_type;
            region_ami_instance_type = result.resolved_data.region_ami_instance_type;
            if (!MC.data.instance_type) {
              MC.data.instance_type = {};
            }
            MC.data.instance_type[result.param[3]] = ami_instance_type;
            if (region_ami_instance_type) {
              if (!MC.data.region_instance_type) {
                MC.data.region_instance_type = {};
              }
              MC.data.region_instance_type[result.param[3]] = region_ami_instance_type;
            }
            instanceTypeMap = {};
            instanceTypeData = result.resolved_data.instance_type;
            _.each(instanceTypeData, function(value1, key1) {
              _.each(value1, function(value2, key2) {
                var descAry, descStr, err, nameStr, newDescAry, typeStr;
                try {
                  descStr = value2.description;
                  nameStr = value2.name;
                  descAry = descStr.split(',');
                  newDescAry = ['', '', '', ''];
                  _.each(descAry, function(str, idx) {
                    var newStr;
                    newStr = $.trim(str);
                    if (idx < 3) {
                      newDescAry[idx + 1] = newStr;
                    } else {
                      newDescAry[0] = nameStr;
                    }
                    return null;
                  });
                  typeStr = key1 + '.' + key2;
                  instanceTypeMap[typeStr] = newDescAry;
                } catch (_error) {
                  err = _error;
                  console.log(err);
                }
                return null;
              });
              return null;
            });
            constant.INSTANCE_TYPE = instanceTypeMap;
            _.map(result.resolved_data.ami, function(value, key) {
              var instanceTypeAry;
              value.imageId = key;
              _.map(value, function(val, key) {
                if (val === '') {
                  value[key] = 'None';
                }
                return null;
              });
              if (value.kernelId === void 0 || value.kernelId === '') {
                value.kernelId = "None";
              }
              value.osType = MC.aws.ami.getOSType(value);
              if (!value.osFamily) {
                value.osFamily = MC.aws.aws.getOSFamily(value.osType);
              }
              instanceTypeAry = MC.aws.ami.getInstanceType(value);
              value.instance_type = instanceTypeAry.join(', ');
              MC.data.dict_ami[key] = value;
              ami_list.push(value);
              return null;
            });
            ami_list.sort(function(a, b) {
              if (a.osType > b.osType) {
                return 1;
              } else if (a.osType < b.osType) {
                return -1;
              } else {
                if (a.architecture >= b.architecture) {
                  return 1;
                } else {
                  return -1;
                }
              }
            });
            quickstart_amis = [];
            if (MC.canvas_data.platform === 'ec2-classic') {
              for (_i = 0, _len = ami_list.length; _i < _len; _i++) {
                i = ami_list[_i];
                if (i.name.indexOf('ami-vpc-nat') < 0) {
                  quickstart_amis.push(i);
                }
              }
            } else {
              quickstart_amis = ami_list;
            }
            console.log('get quistart ami: -> data region: ' + region_name + ', stack region: ' + MC.canvas_data.region);
            if (region_name === MC.canvas_data.region) {
              me.set('quickstart_ami', quickstart_amis);
            }
            MC.data.config[region_name].ami = result.resolved_data.ami;
            MC.data.config[region_name].ami_instance_type = result.resolved_data.ami_instance_type;
            MC.data.config[region_name].region_instance_type = result.resolved_data.region_instance_type;
            if (result.resolved_data.region_ami_instance_type) {
              MC.data.config[region_name].region_ami_instance_type = result.resolved_data.region_ami_instance_type;
            }
            MC.data.config[region_name].instance_type = result.resolved_data.instance_type;
            MC.data.config[region_name].price = result.resolved_data.price;
            MC.data.config[region_name].vpc_limit = result.resolved_data.vpc_limit;
            MC.data.config[region_name].zone = null;
            if (MC.common.cookie.getCookieByName('has_cred') !== 'true') {
              MC.data.config[region_name].zone = {
                'item': []
              };
              _ref = result.resolved_data.zone;
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                i = _ref[_j];
                MC.data.config[region_name].zone.item.push({
                  'regionName': region_name,
                  'zoneName': i,
                  'zoneState': 'available'
                });
              }
            }
            MC.data.config[region_name].ami_list = ami_list;
            MC.data.config[region_name].favorite_ami = null;
            MC.data.config[region_name].my_ami = null;
            me.myAmiService(region_name);
            me.favoriteAmiService(region_name);
            me.stackLoadDepend('quickstartService:NEW');
            me.describeStackAmiService(region_name);
            ide_event.trigger(ide_event.RESOURCE_QUICKSTART_READY, region_name);
          } else {

          }
          return null;
        });
        me.on('EC2_AMI_DESC_IMAGES_RETURN', function(result) {
          var ami_list, my_ami_list, region_name, _ref, _ref1;
          region_name = result.param[3];
          console.log('EC2_AMI_DESC_IMAGES_RETURN: ' + region_name);
          if (!result.is_error && ((result.param[6] && result.param[6][0] && result.param[6][0] === 'self') || (result.param[5] && result.param[5][0] === 'self'))) {
            if (((_ref = result.param[6]) != null ? _ref[0] : void 0) === 'self') {
              MC.data.config[region_name].exec = true;
            } else if (((_ref1 = result.param[5]) != null ? _ref1[0] : void 0) === 'self') {
              MC.data.config[region_name].owner = true;
            }
            console.log('EC2_AMI_DESC_IMAGES_RETURN: My AMI');
            my_ami_list = [];
            if (result.resolved_data) {
              ami_list = [];
              _.map(result.resolved_data, function(value) {
                var err, instanceTypeAry;
                try {
                  if (value.imageState === "available") {
                    value.osType = MC.aws.ami.getOSType(value);
                    if (!value.osFamily) {
                      value.osFamily = MC.aws.aws.getOSFamily(value.osType);
                    }
                    instanceTypeAry = MC.aws.ami.getInstanceType(value);
                    value.instanceType = instanceTypeAry.join(', ');
                    me.convertBlockDeviceMapping(value);
                    MC.data.dict_ami[value.imageId] = value;
                    ami_list.push(value);
                  } else {
                    console.warn("imageState of myAMI (" + value.imageId + ") is " + value.imageState + " , should be available");
                  }
                } catch (_error) {
                  err = _error;
                  console.info('Resolve My AMI error');
                  return true;
                }
                return null;
              });
              my_ami_list = ami_list;
              MC.data.config[region_name].my_ami = MC.data.config[region_name].my_ami.concat(ami_list);
            }
            console.log('get my ami: -> data region: ' + region_name + ', stack region: ' + MC.canvas_data.region);
            if (region_name === MC.canvas_data.region && MC.data.config[region_name].owner && MC.data.config[region_name].exec) {
              me.set('my_ami', MC.data.config[region_name].my_ami);
            }
          } else {
            console.log('EC2_AMI_DESC_IMAGES_RETURN:describeStackAmiService');
            if (result.resolved_data) {
              _.map(result.resolved_data, function(value) {
                var instanceTypeAry;
                if (value.imageState === "available") {
                  value.osType = MC.aws.ami.getOSType(value);
                  if (!value.osFamily) {
                    value.osFamily = MC.aws.aws.getOSFamily(value.osType);
                  }
                  instanceTypeAry = MC.aws.ami.getInstanceType(value);
                  value.instanceType = instanceTypeAry.join(', ');
                  me.convertBlockDeviceMapping(value);
                  MC.data.dict_ami[value.imageId] = value;
                } else {
                  console.warn("imageState of AMI (" + value.imageId + ") is " + value.imageState + " , should be available");
                }
                return null;
              });
            }
            this.stackLoadDepend('describeStackAmiService:OLD');
          }
          return null;
        });
        me.on('AWS__PUBLIC_RETURN', function(result) {
          var community_ami_list, favorite_ami_ids, key, region_name, value, _ref;
          region_name = result.param[3];
          console.log('AWS__PUBLIC_RETURN: ' + region_name);
          community_ami_list = {};
          if (!result.is_error && result.resolved_data) {
            community_ami_list = _.extend(result.resolved_data.ami, {
              timestamp: (new Date()).getTime()
            });
            favorite_ami_ids = _.pluck(_.filter(me.get('favorite_ami'), function(f) {
              return !f["delete"];
            }), 'resource_id');
            _ref = community_ami_list.result;
            for (key in _ref) {
              value = _ref[key];
              if (_.contains(favorite_ami_ids, key)) {
                value.favorite = true;
              }
            }
            console.log('get community ami: -> data region: ' + region_name + ', stack region: ' + MC.canvas_data.region);
            if (region_name === MC.canvas_data.region) {
              me.set('community_ami', community_ami_list);
            }
          } else {
            notification('warning', lang.ide.RES_MSG_WARN_GET_COMMUNITY_AMI_FAILED);
          }
          return null;
        });
        me.on('FAVORITE_INFO_RETURN', function(result) {
          var legalData, region_name;
          if (this.setting.noReset) {
            this.setting.noReset = false;
            return;
          }
          region_name = result.param[3];
          console.log('FAVORITE_INFO_RETURN: ' + region_name);
          legalData = _.filter(result.resolved_data, function(value, key) {
            return value.resource_info;
          });
          _.map(legalData, function(value, key) {
            var instanceTypeAry;
            value.amiVO = value.resource_info;
            value.resource_info = JSON.parse(value.resource_info);
            _.map(value.resource_info, function(val, key) {
              if (val === '') {
                value.resource_info[key] = 'None';
              }
              return null;
            });
            value.resource_info.imageId = value.resource_id;
            value.resource_info.osType = MC.aws.ami.getOSType(value.resource_info);
            if (!value.resource_info.osFamily) {
              value.resource_info.osFamily = MC.aws.aws.getOSFamily(value.resource_info.osType);
            }
            instanceTypeAry = MC.aws.ami.getInstanceType(value.resource_info);
            value.resource_info.instanceType = instanceTypeAry.join(', ');
            MC.data.dict_ami[value.resource_id] = value.resource_info;
            return null;
          });
          console.log('get favorite ami: -> data region: ' + region_name + ', stack region: ' + MC.canvas_data.region);
          if (region_name === MC.canvas_data.region) {
            me.set('favorite_ami', null);
            me.set('favorite_ami', legalData);
          }
          MC.data.config[region_name].favorite_ami = {};
          MC.data.config[region_name].favorite_ami = legalData;
          return null;
        });
        me.on('FAVORITE_ADD_RETURN', function(result) {
          var region_name;
          region_name = result.param[3];
          console.log('FAVORITE_ADD_RETURN: ' + region_name);
          if (!result.is_error) {
            delete MC.data.config[region_name].favorite_ami;
            me.favoriteAmiService(region_name);
            notification('info', lang.ide.RES_MSG_INFO_ADD_AMI_FAVORITE_SUCCESS);
          } else {
            notification('error', lang.ide.RES_MSG_ERR_ADD_FAVORITE_AMI_FAILED);
          }
          return null;
        });
        me.on('FAVORITE_REMOVE_RETURN', function(result) {
          var region_name;
          region_name = result.param[3];
          console.log('FAVORITE_REMOVE_RETURN: ' + region_name);
          if (!result.is_error) {
            delete MC.data.config[region_name].favorite_ami;
            notification('info', lang.ide.RES_MSG_INFO_REMVOE_FAVORITE_AMI_SUCCESS);
          } else {
            notification('error', lang.ide.RES_MSG_ERR_REMOVE_FAVORITE_AMI_FAILED);
          }
          return null;
        });
        return me.on('VPC_SNET_DESC_SUBNETS_RETURN', function(result) {
          var default_vpc, region_name;
          region_name = result.param[3];
          default_vpc = '';
          if (result.param[5] && $.type(result.param[5]) === 'array') {
            default_vpc = result.param[5][0].Value[0];
          }
          console.log('VPC_SNET_DESC_SUBNETS_RETURN ' + region_name + ', ' + default_vpc);
          if (!result.is_error) {
            if ($.type(result.resolved_data) === 'array') {
              $.each(result.resolved_data, function(idx, value) {
                MC.data.account_attribute[region_name].default_subnet[value.availabilityZone] = value;
                MC.data.resource_list[region_name][value.subnetId] = value;
                return null;
              });
            } else {
              console.log('no default subnet found in default vpc ' + default_vpc);
            }
          }
          return null;
        });
      },
      describeAvailableZonesService: function(region_name) {
        var me, res;
        me = this;
        me.set('availability_zone', null);
        if (MC.data.config[region_name] && MC.data.config[region_name].zone) {
          res = $.extend(true, {}, MC.data.config[region_name].zone);
          if (MC.data.current_tab_type !== 'NEW_STACK') {
            $.each(res.item, function(idx, value) {
              return $.each(MC.canvas_data.component, function(i, zone) {
                if (zone.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_AvailabilityZone) {
                  if (zone.resource.ZoneName === value.zoneName) {
                    res.item[idx].isUsed = true;
                    return null;
                  }
                }
              });
            });
          }
          me.stackLoadDepend('describeAvailableZonesService:OLD');
          return me.set('availability_zone', res);
        } else {
          return ec2_service.DescribeAvailabilityZones({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name, null, null, function(result) {
            if (!result.is_error) {
              region_name = result.param[3];
              console.log('EC2_EC2_DESC_AVAILABILITY_ZONES_RETURN: ' + region_name);
              _.map(result.resolved_data.item, function(value) {
                value.zoneShortName = value.zoneName.slice(-1).toUpperCase();
                return null;
              });
              res = $.extend(true, {}, result.resolved_data);
              if (MC.data.current_tab_type !== 'NEW_STACK') {
                $.each(res.item, function(idx, value) {
                  return $.each(MC.canvas_data.component, function(i, zone) {
                    if (zone.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_AvailabilityZone) {
                      if (zone.resource.ZoneName === value.zoneName) {
                        res.item[idx].isUsed = true;
                        return null;
                      }
                    }
                  });
                });
              }
              console.log('get az: -> data region: ' + region_name + ', stack region: ' + MC.canvas_data.region);
              if (region_name === MC.canvas_data.region) {
                me.set('availability_zone', res);
              }
              MC.data.config[region_name].zone = result.resolved_data;
              me.stackLoadDepend('describeAvailableZonesService:NEW');
              return null;
            } else {
              return console.log('ec2.DescribeAvailabilityZones failed, error is ' + result.error_message);
            }
          });
        }
      },
      describeSnapshotsService: function(region_name) {
        var me;
        me = this;
        me.set('resource_snapshot', null);
        if (MC.common.cookie.getCookieByName('account_id') === 'demo_account') {
          return;
        }
        if (MC.data.config[region_name] && MC.data.config[region_name].snapshot_list) {
          return me.set('resource_snapshot', MC.data.config[region_name].snapshot_list);
        } else {
          return ebs_model.DescribeSnapshots({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name, null, ["self"], null, null);
        }
      },
      quickstartService: function(region_name) {
        var ami_list, i, me, quickstart_amis, _i, _len;
        me = this;
        me.set('quickstart_ami', null);
        if (MC.data.config[region_name] && MC.data.config[region_name].ami_list) {
          ami_list = MC.data.config[region_name].ami_list;
          quickstart_amis = [];
          if (MC.canvas_data.platform === 'ec2-classic') {
            for (_i = 0, _len = ami_list.length; _i < _len; _i++) {
              i = ami_list[_i];
              if (i.name.indexOf('ami-vpc-nat') < 0) {
                quickstart_amis.push(i);
              }
            }
          } else {
            quickstart_amis = ami_list;
          }
          me.set('quickstart_ami', quickstart_amis);
          me.myAmiService(region_name);
          me.favoriteAmiService(region_name);
          me.stackLoadDepend('quickstartService:OLD');
          me.describeStackAmiService(region_name);
          ide_event.trigger(ide_event.RESOURCE_QUICKSTART_READY, region_name);
        } else {
          aws_model.quickstart({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name);
        }
        return null;
      },
      myAmiService: function(region_name) {
        var me;
        console.log('myAmiService', region_name);
        me = this;
        me.set('my_ami', Math.round(+new Date()));
        if (MC.common.cookie.getCookieByName('account_id') === 'demo_account') {
          return;
        }
        if (MC.data.config[region_name] && MC.data.config[region_name].my_ami) {
          me.set('my_ami', MC.data.config[region_name].my_ami);
        } else {
          MC.data.config[region_name].my_ami = [];
          ami_model.DescribeImages({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name, null, null, ['self'], [
            {
              Name: 'is-public',
              Value: false
            }
          ]);
          ami_model.DescribeImages({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name, null, ['self'], null, null);
        }
        return null;
      },
      describeStackAmiService: function(region_name) {
        var dict_ami, me, stack_ami_list;
        console.log('describeStackAmiService', name);
        me = this;
        stack_ami_list = [];
        dict_ami = MC.data.dict_ami;
        if (!dict_ami) {
          return;
        }
        _.map(MC.canvas_data.component, function(value) {
          var _ref;
          if (value.type === constant.AWS_RESOURCE_TYPE.AWS_EC2_Instance) {
            if (MC.data.dict_ami) {
              if (!MC.data.dict_ami[value.resource.ImageId]) {
                if (_ref = value.resource.ImageId, __indexOf.call(stack_ami_list, _ref) < 0) {
                  return stack_ami_list.push(value.resource.ImageId);
                }
              }
            }
          }
        });
        if (stack_ami_list.length !== 0) {
          return ami_model.DescribeImages({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name, _.uniq(stack_ami_list));
        } else {
          return me.stackLoadDepend('describeStackAmiService:NEW');
        }
      },
      describeCommunityAmiService: function(region_name, name, platform, isPublic, architecture, rootDeviceType, perPageNum, returnPage) {
        var ami_list, filters, me;
        me = this;
        if (perPageNum === void 0 || perPageNum === null) {
          perPageNum = 50;
        }
        if (returnPage === void 0 || returnPage === null || returnPage === 0 || returnPage === "0") {
          returnPage = 1;
        }
        filters = {
          ami: {
            name: name,
            platform: platform,
            isPublic: isPublic,
            architecture: architecture,
            rootDeviceType: rootDeviceType,
            perPageNum: parseInt(perPageNum, 10),
            returnPage: parseInt(returnPage, 10)
          }
        };
        ami_list = [];
        if (community_ami[region_name] === void 0) {
          aws_model.Public({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name, filters);
        }
        return null;
      },
      favoriteAmiService: function(region_name) {
        var me;
        console.log('favoriteAmiService', region_name);
        me = this;
        if (MC.data.config[region_name] && MC.data.config[region_name].favorite_ami) {
          me.set('favorite_ami', null);
          me.set('favorite_ami', MC.data.config[region_name].favorite_ami);
        } else {
          favorite_model.info({
            sender: me
          }, $.cookie('usercode'), $.cookie('session_id'), region_name);
        }
        return null;
      },
      addFav: function(region_name, amiId, amiVO, noReset) {
        var ami, me;
        this.setting.noReset = noReset;
        if (noReset) {
          ami = _.findWhere(this.get('favorite_ami'), {
            resource_id: amiId
          });
          delete ami["delete"];
          this.trigger('change:favorite_ami');
        }
        if (!amiVO) {
          amiVO = JSON.stringify(this.get('community_ami').result[amiId]);
        }
        amiId = {
          id: amiId,
          provider: 'AWS',
          'resource': 'AMI',
          service: 'EC2'
        };
        me = this;
        return favorite_model.add({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region_name, amiId);
      },
      removeFav: function(region_name, amiId) {
        var me;
        amiId = [amiId];
        me = this;
        favorite_model.remove({
          sender: me
        }, $.cookie('usercode'), $.cookie('session_id'), region_name, amiId);
        delete MC.data.config[region_name].favorite_ami;
        return this.resetFavData('remove', amiId[0]);
      },
      resetFavData: function(action, data) {
        var favorite_ami, new_favorite_ami;
        if (action === 'add') {

        } else if (action === 'remove') {
          favorite_ami = this.get('favorite_ami');
          new_favorite_ami = _.map(favorite_ami, function(ami) {
            if (ami.resource_id === data) {
              return _.extend({}, ami, {
                "delete": true
              });
            }
            return ami;
          });
          return this.set('favorite_ami', new_favorite_ami);
        }
      },
      getIgwStatus: function() {
        var isUsed;
        isUsed = false;
        $.each(MC.canvas_data.component, function(key, comp) {
          if (comp.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_InternetGateway) {
            isUsed = true;
            return false;
          }
        });
        return isUsed;
      },
      getVgwStatus: function() {
        var isUsed;
        isUsed = false;
        $.each(MC.canvas_data.component, function(key, comp) {
          if (comp.type === constant.AWS_RESOURCE_TYPE.AWS_VPC_VPNGateway) {
            isUsed = true;
            return false;
          }
        });
        return isUsed;
      },
      describeSubnetInDefaultVpc: function(region_name) {
        var default_vpc, filters, me;
        me = this;
        default_vpc = MC.data.account_attribute[region_name].default_vpc;
        if (!default_vpc) {
          console.log("hasn't get default_vpc for region " + region_name);
        } else {
          if (default_vpc !== 'none') {
            filters = [
              {
                Name: 'vpc-id',
                Value: [default_vpc]
              }, {
                Name: 'defaultForAz',
                Value: ['true']
              }
            ];
            subnet_model.DescribeSubnets({
              sender: me
            }, $.cookie('usercode'), $.cookie('session_id'), region_name, null, filters);
          } else {
            console.log('current region ' + region_name + ' has no default vpc');
          }
        }
        return null;
      },
      stackLoadDepend: function(name) {
        console.log('stackLoadDepend, name = ' + name);
        this.service_count = this.service_count + 1;
        MC.data.resouceapi.push(name);
        this.set('check_required_service_count', this.service_count);
        return null;
      },
      convertBlockDeviceMapping: function(ami) {
        var data, idx, value, _i, _len, _ref;
        data = {};
        if (ami && ami.blockDeviceMapping && ami.blockDeviceMapping.item) {
          _ref = ami.blockDeviceMapping.item;
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            value = _ref[idx];
            if (value.ebs) {
              data[value.deviceName] = {
                snapshotId: value.ebs.snapshotId,
                volumeSize: value.ebs.volumeSize,
                volumeType: value.ebs.volumeType,
                deleteOnTermination: value.ebs.deleteOnTermination
              };
            } else {
              data[value.deviceName] = {};
            }
            ami.blockDeviceMapping = data;
          }
        } else {
          console.warn("convertBlockDeviceMapping(): nothing to convert");
        }
        return null;
      }
    });
    model = new ResourcePanelModel();
    return model;
  });

}).call(this);
