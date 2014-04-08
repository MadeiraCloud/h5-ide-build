(function() {
  define(['aws_model', 'constant', 'backbone', 'jquery', 'underscore', 'MC'], function(aws_model, constant) {
    var UnmanagedVPCModel;
    UnmanagedVPCModel = Backbone.Model.extend({
      defaults: {
        'resource_list': null
      },
      delay: null,
      initialize: function() {
        var me;
        me = this;
        this.setTimeout();
        return this.on('AWS_RESOURCE_RETURN', function(result) {
          console.log('AWS_RESOURCE_RETURN', result);
          if (result && result.return_code === 0) {
            return console.log('import succcess');
          } else {
            console.log('import error');
            return this.set('resource_list', 'service_error');
          }
        });
      },
      reload: function() {
        console.log('reload');
        this.set('resource_list', null);
        this.setTimeout();
        return this.getStatResourceService();
      },
      setTimeout: function() {
        var me;
        console.log('setTimeout');
        me = this;
        return this.delay = setTimeout(function() {
          console.log('resource import setTimeout');
          return me.set('resource_list', 'service_error');
        }, 1000 * 60 * 10);
      },
      getResource: function(result) {
        var resources;
        console.log('getResource', result);
        if (this.delay) {
          clearTimeout(this.delay);
        }
        delete result._id;
        delete result.timestamp;
        delete result.username;
        resources = this.createResources(result);
        this.set('resource_list', $.extend(true, {}, resources));
        return MC.common.other.addUnmanaged($.extend(true, {}, resources));
      },
      getStatResourceService: function() {
        var obj, resources;
        console.log('getStatResourceService');
        obj = MC.common.other.listUnmanaged();
        if (!_.isEmpty(obj)) {
          this.set('resource_list', $.extend(true, {}, obj));
        } else {
          resources = {
            'AWS.VPC.VPC': {},
            'AWS.ELB': {},
            'AWS.EC2.Instance': {
              'filter': {
                'instance-state-name': ['pending', 'running', 'stopping', 'stopped']
              }
            },
            'AWS.VPC.RouteTable': {},
            'AWS.VPC.Subnet': {},
            'AWS.VPC.VPNGateway': {
              'filter': {
                'state': ['pending', 'available']
              }
            },
            'AWS.VPC.VPNConnection': {
              'filter': {
                'state': ['pending', 'available']
              }
            },
            'AWS.AutoScaling.Group': {},
            'AWS.VPC.NetworkInterface': {}
          };
          aws_model.resource({
            sender: this
          }, $.cookie('usercode'), $.cookie('session_id'), null, resources, 'statistic', 1);
        }
        return null;
      },
      createResources: function(data) {
        var error, resource_map;
        console.log('createResources', data);
        resource_map = {};
        try {
          _.each(data, function(obj, region) {
            var vpcs;
            vpcs = {};
            return _.each(obj, function(vpc_obj, vpc_id) {
              var l2_res, new_value, new_vpc_obj;
              new_vpc_obj = {};
              _.each(vpc_obj, function(value, key) {
                var new_key;
                new_key = key.replace(/\|/igm, '.');
                return new_vpc_obj[new_key] = value;
              });
              vpc_obj = new_vpc_obj;
              if (vpc_id !== MC.data.account_attribute[region].default_vpc) {
                l2_res = {
                  'AWS.VPC.VPC': {
                    'id': [vpc_id]
                  },
                  'AWS.AutoScaling.Group': {
                    'id': []
                  },
                  'AWS.ELB': {
                    'id': []
                  },
                  'AWS.VPC.DhcpOptions': {
                    'id': []
                  },
                  'AWS.VPC.CustomerGateway': {
                    'id': []
                  },
                  'AWS.AutoScaling.LaunchConfiguration': {
                    'id': []
                  },
                  'AWS.AutoScaling.NotificationConfiguration': {
                    'id': []
                  },
                  'AWS.EC2.Instance': {
                    'filter': {
                      'vpc-id': vpc_id
                    }
                  },
                  'AWS.VPC.RouteTable': {
                    'filter': {
                      'vpc-id': vpc_id
                    }
                  },
                  'AWS.VPC.Subnet': {
                    'filter': {
                      'vpc-id': vpc_id
                    }
                  },
                  'AWS.VPC.VPNGateway': {
                    'filter': {
                      'attachment.vpc-id': vpc_id
                    }
                  },
                  'AWS.EC2.SecurityGroup': {
                    'filter': {
                      'vpc-id': vpc_id
                    }
                  },
                  'AWS.VPC.NetworkAcl': {
                    'filter': {
                      'vpc-id': vpc_id
                    }
                  },
                  'AWS.VPC.NetworkInterface': {
                    'filter': {
                      'vpc-id': vpc_id
                    }
                  },
                  'AWS.VPC.InternetGateway': {
                    'filter': {
                      'attachment.vpc-id': vpc_id
                    }
                  },
                  'AWS.EC2.AvailabilityZone': {
                    'filter': {
                      'region-name': region
                    }
                  },
                  'AWS.EC2.EBS.Volume': {
                    'filter': {
                      'attachment.instance-id': []
                    }
                  },
                  'AWS.EC2.EIP': {
                    'filter': {
                      'instance-id': []
                    }
                  },
                  'AWS.VPC.VPNConnection': {
                    'filter': {
                      'vpn-gateway-id': ''
                    }
                  },
                  'AWS.AutoScaling.ScalingPolicy': {
                    'filter': {
                      'AutoScalingGroupName': []
                    }
                  }
                };
                new_value = {};
                _.each(l2_res, function(attrs, type) {
                  var asg_id, asgs, dhcp_ids, filter, id, instances, k, resources, sg_name, v, vpn_id, _ref;
                  resources = {};
                  if ('id' in attrs) {
                    if (attrs.id.length === 0) {
                      if (type === 'AWS.VPC.DhcpOptions' && type in vpc_obj && 'default' in vpc_obj[type]) {
                        dhcp_ids = (function() {
                          var _i, _len, _ref, _results;
                          _ref = vpc_obj[type];
                          _results = [];
                          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            id = _ref[_i];
                            if (id !== 'default') {
                              _results.push(id);
                            }
                          }
                          return _results;
                        })();
                        if (dhcp_ids.length > 0) {
                          resources.id = dhcp_ids;
                        }
                      } else if (type === 'AWS.VPC.CustomerGateway' && 'AWS.VPC.VPNConnection' in vpc_obj) {
                        resources.id = (function() {
                          var _i, _len, _ref, _results;
                          _ref = _.keys(vpc_obj['AWS.VPC.VPNConnection']);
                          _results = [];
                          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            vpn_id = _ref[_i];
                            if ('customerGatewayId' in vpc_obj['AWS.VPC.VPNConnection'][vpn_id]) {
                              _results.push(vpc_obj['AWS.VPC.VPNConnection'][vpn_id].customerGatewayId);
                            }
                          }
                          return _results;
                        })();
                      } else if (type === 'AWS.AutoScaling.NotificationConfiguration' && 'AWS.AutoScaling.Group' in vpc_obj) {
                        resources.id = _.keys(vpc_obj['AWS.AutoScaling.Group']);
                      } else if (type === 'AWS.AutoScaling.LaunchConfiguration' && 'AWS.AutoScaling.Group' in vpc_obj) {
                        resources.id = (function() {
                          var _i, _len, _ref, _results;
                          _ref = _.keys(vpc_obj['AWS.AutoScaling.Group']);
                          _results = [];
                          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            asg_id = _ref[_i];
                            if ('LaunchConfigurationName' in vpc_obj['AWS.AutoScaling.Group'][asg_id]) {
                              _results.push(vpc_obj['AWS.AutoScaling.Group'][asg_id].LaunchConfigurationName);
                            }
                          }
                          return _results;
                        })();
                      } else if (type === 'AWS.CloudWatch.CloudWatch' && 'AWS.AutoScaling.ScalingPolicy' in vpc_obj) {
                        resources['id'] = (function() {
                          var _i, _len, _ref, _results;
                          _ref = _.keys(vpc_obj['AWS.AutoScaling.ScalingPolicy']);
                          _results = [];
                          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            sg_name = _ref[_i];
                            if ('AlarmName' in vpc_obj['AWS.AutoScaling.ScalingPolicy'][sg_name]) {
                              _results.push(vpc_obj['AWS.AutoScaling.ScalingPolicy'][sg_name]['AlarmName']);
                            }
                          }
                          return _results;
                        })();
                      } else if (type in vpc_obj) {
                        resources.id = _.keys(vpc_obj[type]);
                      }
                    } else {
                      resources.id = attrs.id;
                    }
                  }
                  if ('filter' in attrs) {
                    _ref = attrs.filter;
                    for (k in _ref) {
                      v = _ref[k];
                      filter = {};
                      if (!v || v.length === 0) {
                        if ((k === 'instance-id' || k === 'attachment.instance-id') && 'AWS.EC2.Instance' in vpc_obj) {
                          instances = _.keys(vpc_obj['AWS.EC2.Instance']);
                          if (instances.length > 0) {
                            filter[k] = instances;
                          }
                        }
                        if (k === 'vpn-gateway-id' && 'AWS.VPC.VPNGateway' in vpc_obj) {
                          filter[k] = _.keys(vpc_obj['AWS.VPC.VPNGateway'])[0];
                        }
                        if (k === 'AutoScalingGroupName' && 'AWS.AutoScaling.Group' in vpc_obj) {
                          asgs = _.keys(vpc_obj['AWS.AutoScaling.Group']);
                          if (asgs.length > 0) {
                            filter[k] = asgs;
                          }
                        }
                      } else {
                        filter[k] = attrs.filter[k];
                      }
                      if (_.keys(filter).length > 0) {
                        if (!('filter' in resources)) {
                          resources.filter = {};
                        }
                        for (k in filter) {
                          v = filter[k];
                          resources.filter[k] = v;
                        }
                      }
                    }
                  }
                  if (_.keys(resources).length > 0) {
                    return new_value[type] = resources;
                  }
                });
                if (_.keys(new_value).length > 0) {
                  vpcs[vpc_id] = new_value;
                }
                vpcs[vpc_id].origin = vpc_obj;
                return resource_map[region] = vpcs;
              }
            });
          });
          console.log('new resources is ', resource_map);
        } catch (_error) {
          error = _error;
          console.log('createResources error', error, data);
        }
        return resource_map;
      }
    });
    return UnmanagedVPCModel;
  });

}).call(this);
