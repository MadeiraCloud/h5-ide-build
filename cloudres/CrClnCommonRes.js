(function() {
  define(["./CrCommonCollection", "./CrCollection", "./CrModel", "ApiRequest", "constant", "CloudResources"], function(CrCommonCollection, CrCollection, CrModel, ApiRequest, constant, CloudResources) {

    /* Elb */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ELB,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeLoadBalancersResponse.DescribeLoadBalancersResult.LoadBalancerDescriptions) != null ? _ref.member : void 0;
      },
      parseFetchData: function(elbs) {
        var elb, fixKey, i, idx, key, value, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        for (_i = 0, _len = elbs.length; _i < _len; _i++) {
          elb = elbs[_i];
          for (key in elb) {
            value = elb[key];
            fixKey = key.substring(0, 1).toUpperCase() + key.substring(1);
            delete elb[key];
            elb[fixKey] = value;
          }
          elb.id = elb.LoadBalancerName;
          elb.AvailabilityZones = ((_ref = elb.AvailabilityZones) != null ? _ref.member : void 0) || [];
          elb.Instances = ((_ref1 = elb.Instances) != null ? _ref1.member : void 0) || [];
          elb.SecurityGroups = ((_ref2 = elb.SecurityGroups) != null ? _ref2.member : void 0) || [];
          elb.Subnets = ((_ref3 = elb.Subnets) != null ? _ref3.member : void 0) || [];
          elb.ListenerDescriptions = ((_ref4 = elb.ListenerDescriptions) != null ? _ref4.member : void 0) || [];
          _ref5 = elb.Instances;
          for (idx = _j = 0, _len1 = _ref5.length; _j < _len1; idx = ++_j) {
            i = _ref5[idx];
            elb.Instances[idx] = i.InstanceId;
          }
          elb.vpcId = elb.VPCId;
          elb.id = elb.DNSName;
          elb.Name = elb.LoadBalancerName;
          delete elb.VPCId;
        }
        return elbs;
      },
      parseExternalData: function(data) {
        this.camelToPascal(data);
        this.unifyApi(data, this.type);
        this.convertNumTimeToString(data);
        _.each(data, function(dataItem) {
          dataItem.Instances = _.map(dataItem.Instances, function(obj) {
            return obj.InstanceId;
          });
          dataItem.ListenerDescriptions = _.map(dataItem.ListenerDescriptions, function(obj) {
            obj.PolicyNames = {
              member: obj.PolicyNames
            };
            return obj;
          });
          dataItem.id = dataItem.Dnsname;
          return dataItem.Name = dataItem.LoadBalancerName;
        });
        return data;
      }
    });

    /* VPN */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VPN,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVpnConnectionsResponse.vpnConnectionSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(vpns) {
        var vpn, _i, _len, _ref, _ref1;
        _ref = vpns || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vpn = _ref[_i];
          vpn.vgwTelemetry = ((_ref1 = vpn.vgwTelemetry) != null ? _ref1.item : void 0) || [];
          vpn.id = vpn.vpnConnectionId;
        }
        return vpns;
      },
      parseExternalData: function(data) {
        var vpn, _i, _len, _ref;
        this.unifyApi(data, this.type);
        _ref = data || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vpn = _ref[_i];
          vpn.id = vpn.vpnConnectionId;
        }
        return data;
      }
    });

    /* EIP */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.EIP,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAddressesResponse.addressesSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(eips) {
        var eip, _i, _len;
        for (_i = 0, _len = eips.length; _i < _len; _i++) {
          eip = eips[_i];
          eip.id = eip.allocationId;
        }
        return eips;
      },
      parseExternalData: function(data) {
        var eip, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          eip = data[_i];
          eip.id = eip.allocationId;
        }
        return data;
      }
    });

    /* VPC */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VPC,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVpcsResponse.vpcSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(vpcs) {
        var vpc, _i, _len;
        for (_i = 0, _len = vpcs.length; _i < _len; _i++) {
          vpc = vpcs[_i];
          vpc.id = vpc.vpcId;
        }
        return vpcs;
      },
      parseExternalData: function(data) {
        var vpc, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          vpc = data[_i];
          vpc.id = vpc.vpcId;
        }
        return data;
      }
    });

    /* ASG */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ASG,
      modelIdAttribute: "AutoScalingGroupARN",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAutoScalingGroupsResponse.DescribeAutoScalingGroupsResult.AutoScalingGroups) != null ? _ref.member : void 0;
      },
      parseFetchData: function(asgs) {
        var asg, _i, _len, _ref, _ref1, _ref2, _ref3;
        for (_i = 0, _len = asgs.length; _i < _len; _i++) {
          asg = asgs[_i];
          asg.id = asg.AutoScalingGroupARN;
          asg.Name = asg.AutoScalingGroupName;
          asg.AvailabilityZones = ((_ref = asg.AvailabilityZones) != null ? _ref.member : void 0) || [];
          asg.Instances = ((_ref1 = asg.Instances) != null ? _ref1.member : void 0) || [];
          asg.LoadBalancerNames = ((_ref2 = asg.LoadBalancerNames) != null ? _ref2.member : void 0) || [];
          asg.TerminationPolicies = ((_ref3 = asg.TerminationPolicies) != null ? _ref3.member : void 0) || [];
          asg.Subnets = (asg.VPCZoneIdentifier || asg.VpczoneIdentifier || "").split(",");
        }
        return asgs;
      },
      parseExternalData: function(data) {
        var asg, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          asg = data[_i];
          asg.id = asg.AutoScalingGroupARN;
          asg.Name = asg.AutoScalingGroupName;
          asg.DefaultCooldown = String(asg.DefaultCooldown);
          asg.DesiredCapacity = String(asg.DesiredCapacity);
          asg.HealthCheckGracePeriod = String(asg.HealthCheckGracePeriod);
          asg.MaxSize = String(asg.MaxSize);
          asg.MinSize = String(asg.MinSize);
          asg.Subnets = (asg.VPCZoneIdentifier || asg.VpczoneIdentifier).split(",");
        }
        return data;
      }
    });

    /* CloudWatch */
    CrCommonCollection.extend({

      /* env:dev                                                      env:dev:end */
      type: constant.RESTYPE.CW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAlarmsResponse.DescribeAlarmsResult.MetricAlarms) != null ? _ref.member : void 0;
      },
      parseFetchData: function(cws) {
        var cw, _i, _len, _ref, _ref1;
        for (_i = 0, _len = cws.length; _i < _len; _i++) {
          cw = cws[_i];
          cw.Dimensions = ((_ref = cw.Dimensions) != null ? _ref.member : void 0) || [];
          cw.AlarmActions = ((_ref1 = cw.AlarmActions) != null ? _ref1.member : void 0) || [];
          cw.id = cw.AlarmArn;
          cw.Name = cw.AlarmName;
        }
        return cws;
      },
      parseExternalData: function(data) {
        var cw, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          cw = data[_i];
          cw.id = cw.AlarmArn;
          cw.Name = cw.AlarmName;
        }
        return data;
      }
    });

    /* CGW */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.CGW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeCustomerGatewaysResponse.customerGatewaySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(cgws) {
        var cgw, _i, _len;
        for (_i = 0, _len = cgws.length; _i < _len; _i++) {
          cgw = cgws[_i];
          cgw.id = cgw.customerGatewayId;
        }
        return cgws;
      },
      parseExternalData: function(data) {
        var cgw, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          cgw = data[_i];
          cgw.id = cgw.customerGatewayId;
        }
        return data;
      }
    });

    /* VGW */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.VGW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVpnGatewaysResponse.vpnGatewaySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(vgws) {
        var vgw, _i, _len;
        for (_i = 0, _len = vgws.length; _i < _len; _i++) {
          vgw = vgws[_i];
          vgw.id = vgw.vpnGatewayId;
          if (vgw.attachments && vgw.attachments.length > 0) {
            vgw.vpcId = vgw.attachments[0].vpcId;
            vgw.attachmentState = vgw.attachments[0].state;
          }
        }
        return vgws;
      },
      parseExternalData: function(data) {
        var vgw, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          vgw = data[_i];
          vgw.id = vgw.vpnGatewayId;
          if (vgw.attachments && vgw.attachments.length > 0) {
            vgw.vpcId = vgw.attachments[0].vpcId;
            vgw.attachmentState = vgw.attachments[0].state;
          }
        }
        return data;
      }
    });

    /* IGW */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.IGW,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeInternetGatewaysResponse.internetGatewaySet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(igws) {
        var igw, _i, _len, _ref;
        for (_i = 0, _len = igws.length; _i < _len; _i++) {
          igw = igws[_i];
          igw.id = igw.internetGatewayId;
          igw.attachmentSet = ((_ref = igw.attachmentSet) != null ? _ref.item : void 0) || igw.attachments || [];
          if (igw.attachmentSet && igw.attachmentSet.length > 0) {
            igw.vpcId = igw.attachmentSet[0].vpcId;
            igw.state = igw.attachmentSet[0].state;
          }
        }
        return igws;
      },
      parseExternalData: function(data) {
        var igw, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          igw = data[_i];
          igw.id = igw.internetGatewayId;
          if (igw.attachmentSet && igw.attachmentSet.length > 0) {
            igw.vpcId = igw.attachmentSet[0].vpcId;
            igw.state = igw.attachmentSet[0].state;
          }
        }
        return data;
      }
    });

    /* RTB */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.RT,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeRouteTablesResponse.routeTableSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(rtbs) {
        var assoc, found, idx, local_rt, main_rt, rt, rtb, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4;
        for (_i = 0, _len = rtbs.length; _i < _len; _i++) {
          rtb = rtbs[_i];
          rtb.routeSet = ((_ref = rtb.routeSet) != null ? _ref.item : void 0) || [];
          rtb.associationSet = ((_ref1 = rtb.associationSet) != null ? _ref1.item : void 0) || [];
          rtb.propagatingVgwSet = ((_ref2 = rtb.propagatingVgwSet) != null ? _ref2.item : void 0) || [];
          found = -1;
          _ref3 = rtb.routeSet;
          for (idx = _j = 0, _len1 = _ref3.length; _j < _len1; idx = ++_j) {
            rt = _ref3[idx];
            if (rt.gatewayId === 'local') {
              found = idx;
            }
          }
          if (found > 0) {
            local_rt = rtb.routeSet.splice(found, 1);
            rtb.routeSet.splice(0, 0, local_rt[0]);
          }
          found = -1;
          _ref4 = rtb.associationSet;
          for (idx = _k = 0, _len2 = _ref4.length; _k < _len2; idx = ++_k) {
            assoc = _ref4[idx];
            if (assoc.main && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            main_rt = rtb.associationSet.splice(found, 1);
            rtb.associationSet.splice(0, 0, main_rt[0]);
          }
          rtb.id = rtb.routeTableId;
        }
        return rtbs;
      },
      parseExternalData: function(data) {
        var assoc, found, idx, local_rt, main_rt, rt, rtb, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          rtb = data[_i];
          found = -1;
          _ref = rtb.routeSet;
          for (idx = _j = 0, _len1 = _ref.length; _j < _len1; idx = ++_j) {
            rt = _ref[idx];
            if (rt.gatewayId === 'local' && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            local_rt = rtb.routeSet.splice(found, 1);
            rtb.routeSet.splice(0, 0, local_rt[0]);
          }
          found = -1;
          _ref1 = rtb.associationSet;
          for (idx = _k = 0, _len2 = _ref1.length; _k < _len2; idx = ++_k) {
            assoc = _ref1[idx];
            if (assoc.main && found === -1) {
              found = idx;
            }
          }
          if (found > 0) {
            main_rt = rtb.associationSet.splice(found, 1);
            rtb.associationSet.splice(0, 0, main_rt[0]);
          }
          rtb.id = rtb.routeTableId;
        }
        return data;
      }
    });

    /* INSTANCE */
    CrCommonCollection.extend({

      /* env:dev                                                    env:dev:end */
      initialize: function() {
        this.listenTo(this, "add", function(m) {
          return CloudResources(constant.RESTYPE.AMI, m.attributes.category).fetchAmi(m.attributes.imageId);
        });
      },
      type: constant.RESTYPE.INSTANCE,
      trAwsXml: function(data) {
        var i, ins, instances, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        instances = [];
        _ref1 = ((_ref = data.DescribeInstancesResponse.reservationSet) != null ? _ref.item : void 0) || [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];
          _ref3 = ((_ref2 = i.instancesSet) != null ? _ref2.item : void 0) || [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            ins = _ref3[_j];
            instances.push(ins);
          }
        }
        return instances;
      },
      parseFetchData: function(data) {
        var ins, _i, _len, _ref, _ref1, _ref2, _ref3;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ins = data[_i];
          ins.id = ins.instanceId;
          if (ins.instanceState && ((_ref = ins.instanceState.name) === "terminated" || _ref === "shutting-down")) {
            continue;
          }
          ins.blockDeviceMapping = ((_ref1 = ins.blockDeviceMapping) != null ? _ref1.item : void 0) || [];
          ins.networkInterfaceSet = ((_ref2 = ins.networkInterfaceSet) != null ? _ref2.item : void 0) || [];
          ins.groupSet = ((_ref3 = ins.groupSet) != null ? _ref3.item : void 0) || [];
          if (ins.blockDeviceMapping && ins.blockDeviceMapping.length > 1) {
            ins.blockDeviceMapping = ins.blockDeviceMapping.sort(MC.createCompareFn("deviceName"));
          }
        }
        return data;
      },
      parseExternalData: function(data) {
        var eni, ins, _i, _j, _len, _len1, _ref, _ref1;
        this.convertNumTimeToString(data);
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          ins = data[_i];
          ins.id = ins.instanceId;
          if (ins.instanceState && ((_ref = ins.instanceState.name) === "terminated" || _ref === "shutting-down")) {
            continue;
          }
          _ref1 = ins.networkInterfaceSet;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            eni = _ref1[_j];
            if (eni.privateIpAddresses) {
              eni.privateIpAddressesSet = {
                item: eni.privateIpAddresses
              };
              delete eni.privateIpAddresses;
            }
            if (eni.groups) {
              eni.groupSet = {
                item: eni.groups
              };
              delete eni.groups;
            }
          }
          if (ins.blockDeviceMapping && ins.blockDeviceMapping.length > 1) {
            ins.blockDeviceMapping = ins.blockDeviceMapping.sort(MC.createCompareFn("deviceName"));
          }
        }
        return data;
      }
    });

    /* VOLUME */
    CrCommonCollection.extend({

      /* env:dev                                                  env:dev:end */
      type: constant.RESTYPE.VOL,
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeVolumesResponse.volumeSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(volumes) {
        var vol, _i, _len, _ref;
        for (_i = 0, _len = volumes.length; _i < _len; _i++) {
          vol = volumes[_i];
          vol.id = vol.volumeId;
          vol.attachmentSet = ((_ref = vol.attachmentSet) != null ? _ref.item : void 0) || [];
          _.each(vol.attachmentSet, function(e, key) {
            var attachmentStatus, status;
            status = vol.status;
            attachmentStatus = e.status;
            _.extend(vol, e);
            vol.status = status;
            return vol.attachmentStatus = attachmentStatus;
          });
        }
        return volumes;
      },
      parseExternalData: function(data) {
        var vol, _i, _len;
        this.convertNumTimeToString(data);
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          vol = data[_i];
          vol.id = vol.volumeId;
          _.each(vol.attachmentSet, function(e, key) {
            var attachmentStatus, status;
            status = vol.state;
            attachmentStatus = e.state;
            _.extend(vol, e);
            vol.status = status;
            return vol.attachmentStatus = attachmentStatus;
          });
        }
        return data;
      }
    });

    /* LC */
    CrCommonCollection.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.LC,
      AwsResponseType: "DescribeLaunchConfigurationsResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeLaunchConfigurationsResponse.DescribeLaunchConfigurationsResult.LaunchConfigurations) != null ? _ref.member : void 0;
      },
      parseFetchData: function(data) {
        var lc, _i, _len, _ref, _ref1;
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          lc = data[_i];
          lc.BlockDeviceMapping = ((_ref = lc.BlockDeviceMappings) != null ? _ref.member : void 0) || [];
          lc.SecurityGroups = ((_ref1 = lc.SecurityGroups) != null ? _ref1.member : void 0) || [];
          if (lc.BlockDeviceMapping && lc.BlockDeviceMapping.length > 1) {
            lc.BlockDeviceMapping = lc.BlockDeviceMapping.sort(MC.createCompareFn("DeviceName"));
          }
          lc.id = lc.LaunchConfigurationARN;
          lc.Name = lc.LaunchConfigurationName;
        }
        return data;
      },
      parseExternalData: function(data) {
        var lc, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          lc = data[_i];
          if (lc.BlockDeviceMapping && lc.BlockDeviceMapping.length > 1) {
            lc.BlockDeviceMapping = lc.BlockDeviceMapping.sort(MC.createCompareFn("DeviceName"));
          }
          lc.id = lc.LaunchConfigurationARN;
          lc.Name = lc.LaunchConfigurationName;
        }
        return data;
      }
    });

    /* ScalingPolicy */
    CrCommonCollection.extend({

      /* env:dev                                                         env:dev:end */
      type: constant.RESTYPE.SP,
      AwsResponseType: "DescribePoliciesResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribePoliciesResponse.DescribePoliciesResult.ScalingPolicies) != null ? _ref.member : void 0;
      },
      parseFetchData: function(sps) {
        var sp, _i, _len;
        for (_i = 0, _len = sps.length; _i < _len; _i++) {
          sp = sps[_i];
          sp.id = sp.PolicyARN;
          sp.Name = sp.PolicyName;
        }
        return sps;
      },
      parseExternalData: function(data) {
        var sp, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          sp = data[_i];
          sp.id = sp.PolicyARN;
          sp.Name = sp.PolicyName;
        }
        return data;
      }
    });

    /* AvailabilityZone */
    CrCommonCollection.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.AZ,
      AwsResponseType: "DescribeAvailabilityZonesResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeAvailabilityZonesResponse.availabilityZoneInfo) != null ? _ref.item : void 0;
      },
      parseFetchData: function(azs) {
        var az, _i, _len;
        for (_i = 0, _len = azs.length; _i < _len; _i++) {
          az = azs[_i];
          az.id = az.zoneName;
        }
        return azs;
      },
      parseExternalData: function(data) {
        var az, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          az = data[_i];
          az.id = az.zoneName;
        }
        return data;
      }
    });

    /* NotificationConfiguartion */
    CrCommonCollection.extend({

      /* env:dev                                                        env:dev:end */
      type: constant.RESTYPE.NC,
      AwsResponseType: "DescribeNotificationConfigurationsResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeNotificationConfigurationsResponse.DescribeNotificationConfigurationsResult.NotificationConfigurations) != null ? _ref.member : void 0;
      },
      parseFetchData: function(ncs) {
        var id, item, nc, ncMap, newNcList, _i, _len;
        newNcList = [];
        ncMap = {};
        for (_i = 0, _len = ncs.length; _i < _len; _i++) {
          nc = ncs[_i];
          item = ncMap[id] || (ncMap[id] = {});
          id = item.AutoScalingGroupName + "-" + item.TopicARN;
          if (!item) {
            item = ncMap[id] = {
              id: id,
              AutoScalingGroupName: nc.AutoScalingGroupName,
              TopicARN: nc.TopicARN,
              NotificationType: [nc.NotificationType]
            };
            newNcList.push(item);
          } else {
            item.NotificationType.push(nc.NotificationType);
          }
        }
        return newNcList;
      },
      parseExternalData: function(data) {
        var first, item, nc, newNcList, _i, _len;
        this.unifyApi(data, this.type);
        this.camelToPascal(data);
        newNcList = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          nc = data[_i];
          first = nc[0];
          item = {
            AutoScalingGroupName: first.AutoScalingGroupName,
            TopicARN: first.TopicARN,
            NotificationType: _.pluck(nc, 'NotificationType')
          };
          item.id = item.AutoScalingGroupName + "-" + item.TopicARN;
          newNcList.push(item);
        }
        return newNcList;
      }
    });

    /* ACL */
    CrCommonCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ACL,
      AwsResponseType: "DescribeNetworkAclsResponse",
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeNetworkAclsResponse.networkAclSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(acls) {
        var acl, _i, _len, _ref, _ref1;
        for (_i = 0, _len = acls.length; _i < _len; _i++) {
          acl = acls[_i];
          acl.id = acl.networkAclId;
          acl.entrySet = ((_ref = acl.entrySet) != null ? _ref.item : void 0) || [];
          acl.associationSet = ((_ref1 = acl.associationSet) != null ? _ref1.item : void 0) || [];
          if (acl.associationSet.length > 0) {
            acl.subnetId = acl.associationSet[0].subnetId;
          }
        }
        return acls;
      },
      parseExternalData: function(data) {
        var acl, _i, _len;
        this.unifyApi(data, this.type);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          acl = data[_i];
          acl.id = acl.networkAclId;
          if (acl.associationSet.length > 0) {
            acl.subnetId = acl.associationSet[0].subnetId;
          }
        }
        return data;
      }
    });

    /* ENI */
    CrCollection.extend({

      /* env:dev                                               env:dev:end */
      type: constant.RESTYPE.ENI,
      AwsResponseType: "DescribeNetworkInterfacesResponse",
      doFetch: function() {
        return ApiRequest("eni_DescribeNetworkInterfaces", {
          region_name: this.region()
        });
      },
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeNetworkInterfacesResponse.networkInterfaceSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(enis) {
        _.each(enis, function(eni, index) {
          eni.id = eni.networkInterfaceId;
          return _.each(eni, function(e, key) {
            var _ref, _ref1;
            if (key === "groupSet") {
              enis[index].groupSet = ((_ref = enis[index].groupSet) != null ? _ref.item : void 0) || [];
            }
            if (key === "privateIpAddressesSet") {
              return enis[index].privateIpAddressesSet = ((_ref1 = enis[index].privateIpAddressesSet) != null ? _ref1.item : void 0) || [];
            }
          });
        });
        return enis;
      },
      parseExternalData: function(data) {
        this.convertNumTimeToString(data);
        this.unifyApi(data, this.type);
        _.each(data, function(eni, index) {
          return eni.id = eni.networkInterfaceId;
        });
        return data;
      }
    });

    /* SUBNET */
    CrCollection.extend({

      /* env:dev                                                  env:dev:end */
      type: constant.RESTYPE.SUBNET,
      doFetch: function() {
        return ApiRequest("subnet_DescribeSubnets", {
          region_name: this.region()
        });
      },
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeSubnetsResponse.subnetSet) != null ? _ref.item : void 0;
      },
      parseFetchData: function(subnets) {
        _.each(subnets, function(subnet, index) {
          return subnet.id = subnet.subnetId;
        });
        return subnets;
      },
      parseExternalData: function(data) {
        this.unifyApi(data, this.type);
        _.each(data, function(subnet, index) {
          return subnet.id = subnet.subnetId;
        });
        return data;
      }
    });

    /* SG */
    return CrCollection.extend({

      /* env:dev                                              env:dev:end */
      type: constant.RESTYPE.SG,
      AwsResponseType: "DescribeSecurityGroupsResponse",
      doFetch: function() {
        return ApiRequest("sg_DescribeSecurityGroups", {
          region_name: this.region()
        });
      },
      trAwsXml: function(data) {
        var _ref;
        return (_ref = data.DescribeSecurityGroupsResponse.securityGroupInfo) != null ? _ref.item : void 0;
      },
      parseFetchData: function(sgs) {
        var sg, _i, _len, _ref, _ref1;
        for (_i = 0, _len = sgs.length; _i < _len; _i++) {
          sg = sgs[_i];
          sg.ipPermissions = ((_ref = sg.ipPermissions) != null ? _ref.item : void 0) || [];
          _.each(sg.ipPermissions, function(rule, idx) {
            return _.each(rule, function(e, key) {
              if (key === "groups" || key === "ipRanges") {
                return sg.ipPermissions[idx][key] = (e != null ? e.item : void 0) || [];
              }
            });
          });
          sg.ipPermissionsEgress = ((_ref1 = sg.ipPermissionsEgress) != null ? _ref1.item : void 0) || [];
          _.each(sg.ipPermissionsEgress, function(rule, idx) {
            return _.each(rule, function(e, key) {
              if (key === "groups" || key === "ipRanges") {
                return sg.ipPermissionsEgress[idx][key] = (e != null ? e.item : void 0) || [];
              }
            });
          });
          sg.id = sg.groupId;
          sg.Name = sg.groupName;
        }
        return sgs;
      },
      parseExternalData: function(data) {
        var sg, sgRuls, _i, _len;
        this.unifyApi(data, this.type);
        this.convertNumTimeToString(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          sg = data[_i];
          sg.groupName = sg.groupName.trim();
          sg.id = sg.groupId;
          sg.Name = sg.groupName;
          sg.ipPermissions = sg.ipPermissions || [];
          sg.ipPermissionsEgress = sg.ipPermissionsEgress || [];
          sgRuls = sg.ipPermissions.concat(sg.ipPermissionsEgress);
          _.each(sgRuls, function(rule, idx) {
            if (rule.ipRanges && rule.ipRanges.length) {
              rule.ipRanges = _.map(rule.ipRanges, function(cidr) {
                return {
                  cidrIp: cidr
                };
              });
            }
            rule.groups = [];
            if (rule.userIdGroupPairs) {
              rule.groups = rule.userIdGroupPairs;
              return delete rule.userIdGroupPairs;
            }
          });
        }
        return data;
      }
    });
  });

}).call(this);
