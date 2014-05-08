(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define('lib/aws/aws',['MC', 'constant', 'underscore', 'jquery', 'Design'], function(MC, constant, _, $, Design) {
    var cacheResource, checkAppName, checkIsRepeatName, checkPrivateIPIfHaveEIP, checkStackName, collectReference, convertBlockDeviceMapping, enableStackAgent, genAttrRefList, genResRef, getCompByResIdForState, getDuplicateName, getOSFamily, isValidInIPRange, replaceReference;
    cacheResource = function(resources, region, need_reset) {
      var elbResMap, error;
      if (!resources || !region || !MC.data.resource_list) {
        console.log('cacheResource failed');
        return null;
      }
      if (need_reset) {
        MC.data.resource_list[region] = {};
      }
      try {
        if (resources.DescribeVpcs) {
          _.map(resources.DescribeVpcs, function(res, i) {
            MC.data.resource_list[region][res.vpcId] = res;
            return null;
          });
        }
        if (resources.DescribeInstances) {
          _.map(resources.DescribeInstances, function(res, i) {
            MC.data.resource_list[region][res.instanceId] = res;
            return null;
          });
        }
        if (resources.DescribeVolumes) {
          _.map(resources.DescribeVolumes, function(res, i) {
            MC.data.resource_list[region][res.volumeId] = res;
            return null;
          });
        }
        if (resources.DescribeAddresses) {
          _.map(resources.DescribeAddresses, function(res, i) {
            MC.data.resource_list[region][res.publicIp] = res;
            return null;
          });
        }
        elbResMap = {};
        if (resources.DescribeLoadBalancers) {
          _.map(resources.DescribeLoadBalancers, function(res, i) {
            if (!elbResMap[res.LoadBalancerName]) {
              elbResMap[res.LoadBalancerName] = {};
            }
            elbResMap[res.LoadBalancerName] = _.extend(elbResMap[res.LoadBalancerName], res);
            return null;
          });
        }
        if (resources.DescribeLoadBalancerAttributes) {
          _.map(resources.DescribeLoadBalancerAttributes, function(res, i) {
            if (!elbResMap[res.LoadBalancerName]) {
              elbResMap[res.LoadBalancerName] = {};
            }
            elbResMap[res.LoadBalancerName] = _.extend(elbResMap[res.LoadBalancerName], res);
            return null;
          });
        }
        if (resources.DescribeInstanceHealth) {
          _.map(resources.DescribeInstanceHealth, function(res, i) {
            if (!elbResMap[res.LoadBalancerName]) {
              elbResMap[res.LoadBalancerName] = {};
            }
            elbResMap[res.LoadBalancerName] = _.extend(elbResMap[res.LoadBalancerName], {
              InstanceState: res
            });
            return null;
          });
        }
        _.map(elbResMap, function(res) {
          return MC.data.resource_list[region][res.DNSName] = res;
        });
        if (resources.DescribeVpnConnections) {
          _.map(resources.DescribeVpnConnections, function(res, i) {
            MC.data.resource_list[region][res.vpnConnectionId] = res;
            return null;
          });
        }
        if (resources.DescribeKeyPairs) {
          _.map(resources.DescribeKeyPairs, function(res, i) {
            MC.data.resource_list[region][res.keyFingerprint] = res;
            return null;
          });
        }
        if (resources.DescribeSecurityGroups) {
          _.map(resources.DescribeSecurityGroups, function(res, i) {
            MC.data.resource_list[region][res.groupId] = res;
            return null;
          });
        }
        if (resources.DescribeDhcpOptions) {
          _.map(resources.DescribeDhcpOptions, function(res, i) {
            MC.data.resource_list[region][res.dhcpOptionsId] = res;
            return null;
          });
        }
        if (resources.DescribeSubnets) {
          _.map(resources.DescribeSubnets, function(res, i) {
            MC.data.resource_list[region][res.subnetId] = res;
            return null;
          });
        }
        if (resources.DescribeRouteTables) {
          _.map(resources.DescribeRouteTables, function(res, i) {
            MC.data.resource_list[region][res.routeTableId] = res;
            return null;
          });
        }
        if (resources.DescribeNetworkAcls) {
          _.map(resources.DescribeNetworkAcls, function(res, i) {
            MC.data.resource_list[region][res.networkAclId] = res;
            return null;
          });
        }
        if (resources.DescribeNetworkInterfaces) {
          _.map(resources.DescribeNetworkInterfaces, function(res, i) {
            MC.data.resource_list[region][res.networkInterfaceId] = res;
            return null;
          });
        }
        if (resources.DescribeInternetGateways) {
          _.map(resources.DescribeInternetGateways, function(res, i) {
            MC.data.resource_list[region][res.internetGatewayId] = res;
            return null;
          });
        }
        if (resources.DescribeVpnGateways) {
          _.map(resources.DescribeVpnGateways, function(res, i) {
            MC.data.resource_list[region][res.vpnGatewayId] = res;
            return null;
          });
        }
        if (resources.DescribeCustomerGateways) {
          _.map(resources.DescribeCustomerGateways, function(res, i) {
            MC.data.resource_list[region][res.customerGatewayId] = res;
            return null;
          });
        }
        if (resources.DescribeImages) {
          _.map(resources.DescribeImages, function(res, i) {
            var e;
            try {
              if (!res.osType) {
                res = $.extend(true, {}, res);
                res.osType = MC.aws.ami.getOSType(res);
              }
              if (!res.osFamily) {
                res.osFamily = MC.aws.aws.getOSFamily(res.osType, res);
              }
              convertBlockDeviceMapping(res);
              MC.data.dict_ami[res.imageId] = res;
              MC.data.resource_list[region][res.imageId] = res;
            } catch (_error) {
              e = _error;
              console.log("[cacheResource:DescribeImages]error: " + res.imageId);
            }
            return null;
          });
        }
        if (resources.DescribeAutoScalingGroups) {
          _.map(resources.DescribeAutoScalingGroups, function(res, i) {
            MC.data.resource_list[region][res.AutoScalingGroupARN] = res;
            return null;
          });
        }
        if (resources.DescribeLaunchConfigurations) {
          _.map(resources.DescribeLaunchConfigurations, function(res, i) {
            MC.data.resource_list[region][res.LaunchConfigurationARN] = res;
            return null;
          });
        }
        if (resources.DescribeNotificationConfigurations) {
          if (!MC.data.resource_list[region].NotificationConfigurations) {
            MC.data.resource_list[region].NotificationConfigurations = [];
          }
          _.map(resources.DescribeNotificationConfigurations, function(res, i) {
            var found;
            found = null;
            _.each(MC.data.resource_list[region].NotificationConfigurations, function(item) {
              if (item.AutoScalingGroupName === res.AutoScalingGroupName && item.NotificationType === res.NotificationType && item.TopicARN === res.TopicARN) {
                found = item;
                return false;
              }
              return null;
            });
            if (!found) {
              MC.data.resource_list[region].NotificationConfigurations.push(res);
            }
            return null;
          });
        }
        if (resources.DescribePolicies) {
          _.map(resources.DescribePolicies, function(res, i) {
            MC.data.resource_list[region][res.PolicyARN] = res;
            return null;
          });
        }
        if (resources.DescribeScheduledActions) {
          _.map(resources.DescribeScheduledActions, function(res, i) {
            MC.data.resource_list[region][res.ScheduledActionARN] = res;
            return null;
          });
        }
        if (resources.DescribeAlarms) {
          _.map(resources.DescribeAlarms, function(res, i) {
            MC.data.resource_list[region][res.AlarmArn] = res;
            return null;
          });
        }
        if (resources.ListSubscriptions) {
          if (!MC.data.resource_list[region].Subscriptions) {
            MC.data.resource_list[region].Subscriptions = [];
          }
          _.map(resources.ListSubscriptions, function(res, i) {
            var found;
            found = null;
            _.each(MC.data.resource_list[region].Subscriptions, function(item) {
              if (item.Protocol === res.Protocol && item.Endpoint === res.Endpoint && item.TopicArn === res.TopicArn) {
                found = item;
                return false;
              }
              return null;
            });
            if (found) {
              found.SubscriptionArn = res.SubscriptionArn;
            } else {
              MC.data.resource_list[region].Subscriptions.push(res);
            }
            return null;
          });
        }
        if (resources.ListTopics) {
          _.map(resources.ListTopics, function(res, i) {
            MC.data.resource_list[region][res.TopicArn] = res;
            return null;
          });
        }
        if (resources.DescribeAutoScalingInstances) {
          _.map(resources.DescribeAutoScalingInstances, function(res, i) {
            MC.data.resource_list[region][res.AutoScalingGroupName + ':' + res.InstanceId] = res;
            return null;
          });
        }
        if (resources.DescribeScalingActivities) {
          _.map(resources.DescribeScalingActivities, function(res, i) {
            MC.data.resource_list[region][res.ActivityId] = res;
            return null;
          });
        }
      } catch (_error) {
        error = _error;
        console.info(error);
      }
      return null;
    };
    checkIsRepeatName = function(compUID, newName) {
      var originCompObj, originCompType, originCompUID;
      originCompObj = MC.canvas_data.component[compUID];
      originCompUID = originCompObj.uid;
      originCompType = originCompObj.type;
      return !_.some(MC.canvas_data.component, function(compObj) {
        var compName, compType;
        compUID = compObj.uid;
        compType = compObj.type;
        compName = compObj.name;
        if (originCompType === compType && originCompUID !== compUID && newName === compName) {
          return true;
        }
      });
    };
    checkStackName = function(stackId, newName) {
      var stackArray;
      stackArray = _.flatten(_.values(MC.data.stack_list));
      return !_.some(stackArray, function(stack) {
        return stack.id !== stackId && stack.name === newName;
      });
    };
    checkAppName = function(name) {
      var appArray;
      appArray = _.flatten(_.values(MC.data.app_list));
      return !_.contains(appArray, name);
    };
    getDuplicateName = function(stack_name) {
      var copy_name, i, idx, name_list, prefix, reg_name, stacks, _i, _len;
      if (!stack_name) {
        stack_name = "untitled";
      }
      idx = 0;
      reg_name = /.*-\d+$/;
      if (reg_name.test(stack_name)) {
        prefix = stack_name.substr(0, stack_name.lastIndexOf("-"));
        idx = Number(stack_name.substr(stack_name.lastIndexOf("-") + 1));
        copy_name = prefix;
      } else {
        if (stack_name.charAt(name.length - 1) === "-") {
          copy_name = stack_name.substr(0, stack_name.length - 1);
        } else {
          copy_name = stack_name;
        }
      }
      name_list = [];
      stacks = _.flatten(_.values(MC.data.stack_list));
      for (_i = 0, _len = stacks.length; _i < _len; _i++) {
        i = stacks[_i];
        if (i.name.indexOf(copy_name) === 0) {
          name_list.push(i.name);
        }
      }
      idx++;
      while (idx <= name_list.length) {
        if ($.inArray(copy_name + "-" + idx, name_list) === -1) {
          break;
        }
        idx++;
      }
      return copy_name + "-" + idx;
    };
    getOSFamily = function(osType, ami) {
      var error, me, osFamily, sql_standerd_pattern, sql_web_pattern;
      me = this;
      osFamily = 'linux';
      if (osType) {
        if (constant.OS_TYPE_MAPPING[osType]) {
          osFamily = constant.OS_TYPE_MAPPING[osType];
        }
        if (__indexOf.call(constant.WINDOWS, osType) >= 0) {
          osFamily = 'mswin';
          try {
            if (ami) {
              sql_web_pattern = /sql.*?web.*?/;
              sql_standerd_pattern = /sql.*?standard.*?/;
              if (('name' in ami && ami.name.toLowerCase().match(sql_web_pattern)) || ('description' in ami && ami.description.toLowerCase().match(sql_web_pattern)) || ('imageLocation' in ami && ami.imageLocation.toLowerCase().match(sql_web_pattern))) {
                osFamily = 'mswinSQLWeb';
              } else if (('name' in ami && ami.name.toLowerCase().match(sql_standerd_pattern)) || ('description' in ami && ami.description.toLowerCase().match(sql_standerd_pattern)) || ('imageLocation' in ami && ami.imageLocation.toLowerCase().match(sql_standerd_pattern))) {
                osFamily = 'mswinSQL';
              }
            }
          } catch (_error) {
            error = _error;
            console.info(error);
          }
        }
      }
      return osFamily;
    };
    collectReference = function(canvas_component) {
      var comp, idx, ipset, key, uid, _ref;
      key = {};
      for (uid in canvas_component) {
        comp = canvas_component[uid];
        if (constant.AWS_RESOURCE_KEY[comp.type]) {
          key[comp.resource[constant.AWS_RESOURCE_KEY[comp.type]]] = MC.aws.aws.genResRef(uid, "resource." + constant.AWS_RESOURCE_KEY[comp.type]);
          if (comp.type === "AWS.EC2.KeyPair") {
            key[comp.resource.KeyName + '-keypair'] = MC.aws.aws.genResRef(uid, 'resource.KeyName');
          }
          if (comp.type === "AWS.AutoScaling.Group") {
            key[comp.resource.AutoScalingGroupName + '-asg'] = MC.aws.aws.genResRef(uid, 'resource.AutoScalingGroupName');
          }
          if (comp.type === "AWS.AutoScaling.LaunchConfiguration") {
            key[comp.resource.LaunchConfigurationName + '-lc'] = MC.aws.aws.genResRef(uid, 'resource.LaunchConfigurationName');
          }
          if (comp.type === 'AWS.VPC.NetworkInterface') {
            _ref = comp.resource.PrivateIpAddressSet;
            for (idx in _ref) {
              ipset = _ref[idx];
              key[ipset.PrivateIpAddress] = MC.aws.aws.genResRef(uid, "resource.PrivateIpAddressSet." + idx + ".PrivateIpAddress");
            }
          }
        }
      }
      for (uid in canvas_component) {
        comp = canvas_component[uid];
        canvas_component[uid] = replaceReference(comp, key, constant.AWS_RESOURCE_KEY[comp.type]);
      }
      return [canvas_component, key];
    };
    replaceReference = function(obj, reference, except_key) {
      var index, k, slot, v;
      switch (typeof obj) {
        case 'object':
          for (k in obj) {
            v = obj[k];
            if (typeof v === 'string') {
              if (k === 'LaunchConfigurationName') {
                if (reference[v + '-lc'] && (k !== except_key && k !== 'name')) {
                  obj[k] = reference[v + '-lc'];
                }
              } else if (k === 'AutoScalingGroupName') {
                if (reference[v + '-asg'] && (k !== except_key && k !== 'name')) {
                  obj[k] = reference[v + '-asg'];
                }
              } else if (k === 'KeyName') {
                if (reference[v + '-keypair'] && (k !== except_key && k !== 'name') && !obj.KeyFingerprint) {
                  obj[k] = reference[v + '-keypair'];
                }
              } else if (reference[v] && (k !== except_key && k !== 'name')) {
                obj[k] = reference[v];
              }
            }
            if (typeof v === 'object') {
              replaceReference(obj[k], reference, except_key);
            }
            if (typeof v === 'array') {
              replaceReference(obj[k], reference, except_key);
            }
          }
          break;
        case 'array':
          for (index in obj) {
            slot = obj[index];
            if (typeof v === 'string' && reference[slot]) {
              obj[index] = reference[slot];
            }
            if (typeof v === 'object') {
              replaceReference(obj[index], reference, except_key);
            }
            if (typeof v === 'array') {
              replaceReference(obj[index], reference, except_key);
            }
          }
      }
      return obj;
    };
    genResRef = function(uid, attrName) {
      return "@{" + uid + "." + attrName + "}";
    };
    enableStackAgent = function(isEnable) {
      var agentData;
      agentData = Design.instance().get('agent');
      agentData.enabled = isEnable;
      return Design.instance().set('agent', agentData);
    };
    getCompByResIdForState = function(resId) {
      var result;
      result = {
        parent: null,
        self: null
      };
      Design.instance().eachComponent(function(component) {
        var groupMembers, index, member, resourceInList;
        groupMembers = component.groupMembers && component.groupMembers();
        resourceInList = MC.data.resource_list[Design.instance().region()];
        if (result.parent || result.self) {
          null;
        }
        if (component.get('appId') === resId) {
          if (groupMembers && groupMembers.length) {
            result.parent = component;
            result.self = new Backbone.Model({
              'name': "" + (component.get('name')) + "-0"
            });
          } else {
            result.self = component;
          }
          return null;
        } else if (groupMembers && __indexOf.call(_.pluck(groupMembers, 'appId'), resId) >= 0) {
          if (component.type === constant.RESTYPE.LC) {
            result.parent = component.parent();
          } else {
            result.parent = component;
            for (index in groupMembers) {
              member = groupMembers[index];
              if (member.appId === resId) {
                result.self = new Backbone.Model({
                  'name': "" + (component.get('name')) + "-" + (+index + 1)
                });
                break;
              }
            }
          }
          return null;
        }
      });
      return result;
    };
    checkPrivateIPIfHaveEIP = function(allCompData, eniUID, priIPNum) {
      var haveEIP;
      haveEIP = false;
      _.each(allCompData, function(compData) {
        var currentENIUID, currentENIUIDRef, currentPriIPNum, currentPriIPNumAry;
        if (compData.type === constant.RESTYPE.EIP) {
          currentENIUIDRef = compData.resource.NetworkInterfaceId;
          currentENIUID = MC.extractID(currentENIUIDRef);
          if (eniUID === currentENIUID) {
            currentPriIPNumAry = compData.resource.PrivateIpAddress.split('.');
            currentPriIPNum = currentPriIPNumAry[3];
            if (Number(currentPriIPNum) === priIPNum) {
              haveEIP = true;
            }
          }
        }
        return null;
      });
      return haveEIP;
    };
    genAttrRefList = function(currentCompData, allCompData) {
      var autoCompList, awsPropertyData, currentASGName, currentCompType, currentCompUID, currentISGName, currentInstanceName, currentIsASG, currentIsISG, currentIsInstance, groupAutoCompList, instanceAutoCompList, resAttrDataAry;
      currentCompUID = currentCompData.uid;
      currentCompType = currentCompData.type;
      currentIsASG = false;
      currentASGName = null;
      if (currentCompType === constant.RESTYPE.LC) {
        currentIsASG = true;
      }
      currentIsISG = false;
      currentIsInstance = false;
      currentInstanceName = null;
      currentISGName = null;
      if (currentCompData.number) {
        if (currentCompData.number > 1) {
          currentIsISG = true;
          currentISGName = currentCompData.serverGroupName;
        } else {
          currentIsInstance = true;
          currentInstanceName = currentCompData.serverGroupName;
        }
      }
      allCompData = allCompData || this.get('allCompData');
      autoCompList = [];
      awsPropertyData = MC.data.state.aws_property;
      _.each(allCompData, function(compData, uid) {
        var asgHavePublicIP, asgHaveSelf, attrList, checkASGPublicIP, compName, compType, compUID, instanceRef, instanceUID, lcCompData, lcUID, lcUIDRef, supportType, _ref;
        compName = compData.name;
        compUID = compData.uid;
        compType = compData.type;
        checkASGPublicIP = false;
        if (compUID === currentCompUID) {
          compName = 'self';
        }
        if (compType === constant.RESTYPE.ASG) {
          lcUIDRef = compData.resource.LaunchConfigurationName;
          if (lcUIDRef) {
            lcUID = MC.extractID(lcUIDRef);
            lcCompData = allCompData[lcUID];
            if (currentCompType === constant.RESTYPE.LC && currentCompUID === lcUID) {
              currentASGName = compName;
              compName = 'self';
              asgHaveSelf = true;
            }
            if (lcCompData.resource.AssociatePublicIpAddress) {
              asgHavePublicIP = true;
            }
          }
        }
        if (compType === constant.RESTYPE.INSTANCE) {
          return;
        }
        if (compType === constant.RESTYPE.ENI) {
          if (compData.index !== 0) {
            return;
          }
          if (compData.serverGroupUid !== compUID) {
            return;
          }
          instanceRef = compData.resource.Attachment.InstanceId;
          if (!instanceRef) {
            return;
          }
          if ((_ref = compData.resource.Attachment.DeviceIndex) === '0' || _ref === 0) {
            instanceUID = MC.extractID(instanceRef);
            if (instanceUID) {
              compName = allCompData[instanceUID].serverGroupName;
              compUID = instanceUID;
              if (instanceUID === currentCompUID) {
                compName = 'self';
              }
            }
          }
        }
        supportType = compType.replace(/\./ig, '_');
        attrList = awsPropertyData[supportType];
        if (attrList) {
          _.each(attrList, function(isArray, attrName) {
            var autoCompRefStr, autoCompStr, azAry, instanceNoMainPublicIP, ipObjAry;
            autoCompStr = compName + '.';
            autoCompRefStr = compUID + '.';
            if (attrName === '__array') {
              return;
            } else {
              autoCompStr += attrName;
              autoCompRefStr += attrName;
            }
            instanceNoMainPublicIP = false;
            if (attrName === 'PublicIp') {
              if (compType === constant.RESTYPE.ASG) {
                if (!asgHavePublicIP) {
                  return;
                }
              }
              if (compType === constant.RESTYPE.ENI) {
                if ((!MC.aws.aws.checkPrivateIPIfHaveEIP(allCompData, compData.uid, 0)) && (!compData.resource.AssociatePublicIpAddress)) {
                  instanceNoMainPublicIP = true;
                }
              }
            }
            if (!instanceNoMainPublicIP) {
              autoCompList.push({
                name: autoCompStr,
                value: autoCompRefStr,
                uid: compUID
              });
            }
            if (isArray) {
              if (supportType === 'AWS_AutoScaling_Group') {
                if (attrName === 'AvailabilityZones') {
                  azAry = compData.resource.AvailabilityZones;
                  if (azAry.length > 1) {
                    _.each(azAry, function(azName, idx) {
                      autoCompList.push({
                        name: autoCompStr + '[' + idx + ']',
                        value: autoCompRefStr + '[' + idx + ']',
                        uid: compUID
                      });
                      return null;
                    });
                  }
                }
              }
              if (supportType === 'AWS_VPC_NetworkInterface') {
                if (attrName === 'PublicDnsName' || attrName === 'PublicIp' || attrName === 'PrivateDnsName' || attrName === 'PrivateIpAddress') {
                  ipObjAry = compData.resource.PrivateIpAddressSet;
                  if (compData.index !== 0) {
                    return;
                  }
                  if (ipObjAry.length > 1) {
                    _.each(ipObjAry, function(ipObj, idx) {
                      if (idx === 0) {
                        return;
                      }
                      if (attrName === 'PublicIp') {
                        if (!MC.aws.aws.checkPrivateIPIfHaveEIP(allCompData, compData.uid, idx)) {
                          return;
                        }
                      }
                      autoCompList.push({
                        name: autoCompStr + '[' + idx + ']',
                        value: autoCompRefStr + '[' + idx + ']',
                        uid: compUID
                      });
                      return null;
                    });
                  }
                }
              }
              if (supportType === 'AWS_ELB') {
                if (attrName === 'AvailabilityZones') {
                  azAry = compData.resource.AvailabilityZones;
                  if (azAry.length > 1) {
                    _.each(azAry, function(azName, idx) {
                      autoCompList.push({
                        name: autoCompStr + '[' + idx + ']',
                        value: autoCompRefStr + '[' + idx + ']',
                        uid: compUID
                      });
                      return null;
                    });
                  }
                }
              }
            }
            return null;
          });
        }
        return null;
      });
      groupAutoCompList = [];
      instanceAutoCompList = [];
      _.each(autoCompList, function(autoCompObj) {
        var groupCompNameStr, groupCompUIDStr, instanceCompNameStr, instanceCompUIDStr;
        if (autoCompObj.name.indexOf('self.') === 0) {
          if (currentIsInstance) {
            instanceCompNameStr = autoCompObj.name.replace('self', currentInstanceName);
            instanceCompUIDStr = autoCompObj.value.replace('self', currentInstanceName);
            instanceAutoCompList.push({
              name: instanceCompNameStr,
              value: instanceCompUIDStr,
              uid: autoCompObj.uid
            });
          }
          if (currentIsASG || currentIsISG) {
            groupCompNameStr = null;
            groupCompUIDStr = null;
            if (currentIsASG) {
              groupCompNameStr = autoCompObj.name.replace('self', currentASGName);
              groupCompUIDStr = autoCompObj.value.replace('self', currentASGName);
            } else if (currentIsISG) {
              groupCompNameStr = autoCompObj.name.replace('self', currentISGName);
              groupCompUIDStr = autoCompObj.value.replace('self', currentISGName);
            }
            return groupAutoCompList.push({
              name: groupCompNameStr,
              value: groupCompUIDStr,
              uid: autoCompObj.uid
            });
          }
        }
      });
      autoCompList = autoCompList.concat(groupAutoCompList);
      autoCompList = autoCompList.concat(instanceAutoCompList);
      resAttrDataAry = _.map(autoCompList, function(autoCompObj) {
        if (autoCompObj.name.indexOf('self.') === 0) {
          autoCompObj.value = autoCompObj.value.replace(autoCompObj.uid, 'self');
          autoCompObj.uid = 'self';
        }
        return {
          name: "" + autoCompObj.name,
          value: "" + autoCompObj.name,
          ref: "" + autoCompObj.value,
          uid: "" + autoCompObj.uid
        };
      });
      resAttrDataAry = _.filter(resAttrDataAry, function(autoCompObj) {
        if (autoCompObj.name.indexOf('self.') === 0) {
          if (autoCompObj.name.indexOf('.AvailabilityZones') !== -1) {
            return false;
          } else {
            return true;
          }
        }
        return true;
      });
      resAttrDataAry = resAttrDataAry.sort(function(obj1, obj2) {
        if (obj1.name < obj2.name) {
          return -1;
        }
        if (obj1.name > obj2.name) {
          return 1;
        }
      });
      return resAttrDataAry;
    };
    convertBlockDeviceMapping = function(ami) {
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
    };
    isValidInIPRange = function(ipStr, validIPType) {
      var ipRangeAry, ipRangeValid, isInAryRange, priIPAry, pubIPAry;
      pubIPAry = [
        {
          low: '1.0.0.1',
          high: '126.255.255.254'
        }, {
          low: '128.1.0.1',
          high: '191.254.255.254'
        }, {
          low: '192.0.1.1',
          high: '223.255.254.254'
        }
      ];
      priIPAry = [
        {
          low: '10.0.0.0',
          high: '10.255.255.255'
        }, {
          low: '172.16.0.0',
          high: '172.31.255.255'
        }, {
          low: '192.168.0.0',
          high: '192.168.255.255'
        }
      ];
      ipRangeValid = function(ipAryStr1, ipAryStr2, ipStr) {
        var curIPAry, ipAry1, ipAry2, isInIPRange;
        ipAry1 = ipAryStr1.split('.');
        ipAry2 = ipAryStr2.split('.');
        curIPAry = ipStr.split('.');
        isInIPRange = true;
        _.each(curIPAry, function(ipNum, idx) {
          if (!(Number(curIPAry[idx]) >= Number(ipAry1[idx]) && Number(curIPAry[idx]) <= Number(ipAry2[idx]))) {
            isInIPRange = false;
          }
          return null;
        });
        return isInIPRange;
      };
      ipRangeAry = [];
      if (validIPType === 'public') {
        ipRangeAry = pubIPAry;
      } else if (validIPType === 'private') {
        ipRangeAry = priIPAry;
      }
      isInAryRange = false;
      _.each(ipRangeAry, function(ipRangeObj) {
        var highRange, isInRange, lowRange;
        lowRange = ipRangeObj.low;
        highRange = ipRangeObj.high;
        isInRange = ipRangeValid(lowRange, highRange, ipStr);
        if (isInRange) {
          isInAryRange = true;
        }
        return null;
      });
      return isInAryRange;
    };
    return {
      collectReference: collectReference,
      cacheResource: cacheResource,
      checkIsRepeatName: checkIsRepeatName,
      checkStackName: checkStackName,
      checkAppName: checkAppName,
      getDuplicateName: getDuplicateName,
      getOSFamily: getOSFamily,
      genResRef: genResRef,
      enableStackAgent: enableStackAgent,
      getCompByResIdForState: getCompByResIdForState,
      genAttrRefList: genAttrRefList,
      isValidInIPRange: isValidInIPRange,
      checkPrivateIPIfHaveEIP: checkPrivateIPIfHaveEIP
    };
  });

}).call(this);

(function() {
  define('aws_handle',['MC', "constant", 'lib/aws/aws'], function(MC, constant, aws_handler) {
    MC.aws = {
      aws: aws_handler
    };
    MC.aws.ami = {
      getOSType: function(ami) {
        var found, osType, osTypeList;
        if (!ami) {
          return 'unknown';
        }
        if (ami.osType) {
          return ami.osType;
        }
        osTypeList = ['centos', 'redhat', 'rhel', 'ubuntu', 'debian', 'fedora', 'gentoo', 'opensuse', 'suse', 'amazon', 'amzn'];
        osType = 'linux-other';
        found = [];
        if (ami.platform && ami.platform === 'windows') {
          found.push('windows');
        } else {
          if (ami.name) {
            found = osTypeList.filter(function(word) {
              return ~ami.name.toLowerCase().indexOf(word);
            });
          }
          if (found.length === 0 && 'description' in ami && ami.description) {
            found = osTypeList.filter(function(word) {
              return ~ami.description.toLowerCase().indexOf(word);
            });
          }
          if (found.length === 0 && 'imageLocation' in ami && ami.imageLocation) {
            found = osTypeList.filter(function(word) {
              return ~ami.imageLocation.toLowerCase().indexOf(word);
            });
          }
        }
        if (found.length > 0) {
          osType = found[0];
        }
        switch (osType) {
          case 'rhel':
            osType = 'redhat';
            break;
          case 'amzn':
            osType = 'amazon';
        }
        return osType;
      },
      getInstanceType: function(ami) {
        var currentTypeData, current_region_instance_type, err, instance_type, key, osType, region, region_instance_type;
        if (!ami) {
          return [];
        }
        try {
          region = MC.canvas_data.region;
          instance_type = MC.data.instance_type[region];
          region_instance_type = MC.data.region_instance_type;
          current_region_instance_type = null;
          if (region_instance_type) {
            current_region_instance_type = region_instance_type[region];
          }
          currentTypeData = instance_type;
          if (current_region_instance_type && ami.osFamily) {
            currentTypeData = current_region_instance_type;
          }
          if (!currentTypeData) {
            return [];
          }
          if (current_region_instance_type) {
            key = ami.osFamily;
            if (!key) {
              osType = ami.osType;
              key = constant.OS_TYPE_MAPPING[osType];
            }
            currentTypeData = currentTypeData[key];
          } else {
            if (ami.osType === 'windows') {
              currentTypeData = currentTypeData.windows;
            } else {
              currentTypeData = currentTypeData.linux;
            }
          }
          if (ami.rootDeviceType === 'ebs') {
            currentTypeData = currentTypeData.ebs;
          } else {
            currentTypeData = currentTypeData['instance store'];
          }
          if (ami.architecture === 'x86_64') {
            currentTypeData = currentTypeData["64"];
          } else {
            currentTypeData = currentTypeData["32"];
          }
          currentTypeData = currentTypeData[ami.virtualizationType || "paravirtual"];
        } catch (_error) {
          err = _error;
          currentTypeData = [];
        }
        if (!currentTypeData || currentTypeData.length <= 0) {
          currentTypeData = MC.data.config[region].region_instance_type;
        }
        if (!currentTypeData) {
          currentTypeData = [];
        }
        return currentTypeData;
      }
    };
    return MC.aws;
  });

}).call(this);

(function() {
  define('forge_handle',['MC', 'constant'], function(MC, constant) {
    var getAmis, getNameById;
    getNameById = function(app_id) {
      var app_name, current_tab, e;
      app_name = '';
      if (app_id) {
        try {
          if (MC.tab[app_id]) {
            current_tab = MC.tab[app_id].data;
          } else {
            current_tab = MC.canvas_data;
          }
          if (current_tab) {
            app_name = current_tab.name;
          }
        } catch (_error) {
          e = _error;
          console.error('[getNameById] error: ' + e);
          app_name = '';
        }
      }
      return app_name;
    };
    getAmis = function(data) {
      var amis;
      console.log('getAmis', data);
      amis = [];
      _.each(data.component, function(item) {
        if (item.type === 'AWS.EC2.Instance' && item.resource && item.resource.ImageId) {
          amis.push(item.resource.ImageId);
        }
        if (item.type === 'AWS.AutoScaling.LaunchConfiguration' && item.resource && item.resource.ImageId) {
          return amis.push(item.resource.ImageId);
        }
      });
      return amis;
    };
    MC.forge = {
      app: {
        getNameById: getNameById,
        getAmis: getAmis
      }
    };
    return null;
  });

}).call(this);

(function() {
  define('lib/common/cookie',['MC'], function(MC) {
    var COOKIE_OPTION, deleteCookie, getCookieByName, setCookie, setCookieByName, setCred;
    COOKIE_OPTION = {
      expires: 30,
      path: '/'
    };
    setCookie = function(result) {
      var key, value;
      deleteCookie();
      result.username = MC.base64Decode(result.usercode);
      for (key in result) {
        value = result[key];
        $.cookie(key, value, COOKIE_OPTION);
      }
      $.cookie("has_session", !!result.session_id, {
        domain: window.location.hostname.replace("ide", ""),
        path: "/",
        expires: 30
      });
      return null;
    };
    deleteCookie = function() {
      var cValue, ckey, domain, _ref;
      domain = {
        "domain": window.location.hostname.replace("ide", "")
      };
      _ref = $.cookie();
      for (ckey in _ref) {
        cValue = _ref[ckey];
        $.removeCookie(ckey, domain);
        $.removeCookie(ckey);
      }
      return null;
    };
    setCred = function(result) {
      return $.cookie('has_cred', result, COOKIE_OPTION);
    };
    getCookieByName = function(cookie_name) {
      return $.cookie(cookie_name);
    };
    setCookieByName = function(cookie_name, value) {
      return $.cookie(cookie_name, value, COOKIE_OPTION);
    };
    return {
      setCookie: setCookie,
      deleteCookie: deleteCookie,
      setCred: setCred,
      getCookieByName: getCookieByName,
      setCookieByName: setCookieByName
    };
  });

}).call(this);

(function() {
  define('lib/common/other',['MC', 'constant', 'jquery', 'underscore'], function(MC, constant) {
    var addCacheMap, addCacheThumb, addProcess, addSEList, addSENameUIDList, addUnmanaged, addUnmanagedVpc, cacheIDMap, cacheThumb, canvasData, checkRepeatStackName, convertUID, createUID, delCacheMap, delCacheThumb, delUnmanaged, deleteProcess, filterProcess, filterStateData, getCacheMap, getCacheThumb, getProcess, getUnmanagedVpc, initDataProcess, initSEList, initSENameUIDList, initUnmanaged, isCurrentTab, isResultRight, listCacheMap, listSE, listSENameUID, listUnmanaged, listUnmanagedVpc, processType, searchCacheMap, searchStackAppById, setCacheMap, setCurrentTabId, state_editor_list, state_editor_name_list, unmanaged_resource_list, unmanaged_vpc_list, verify500;
    canvasData = {
      init: function(data) {
        console.log('canvasData:init');
        return MC.canvas_data = $.extend(true, {}, data);
      },
      initSet: function(key, value) {
        console.log('canvasData:initSet', key, value);
        return MC.canvas_data[key] = value;
      },
      data: function(is_origin) {
        var data;
        if (is_origin == null) {
          is_origin = false;
        }
        if (_.isString(is_origin) && is_origin === 'origin') {
          data = MC.canvas_data;
        } else if (is_origin) {
          data = $.extend(true, {}, MC.canvas_data);
        } else {
          if (!_.isEmpty(Design.instance())) {
            data = Design.instance().serialize();
          }
        }
        return data;
      },
      save: function(data) {
        console.log('canvasData:save', data);
        if (!_.isEmpty(Design.instance())) {
          return Design.instance().save(data);
        }
      },
      set: function(key, value) {
        console.log('canvasData:set', key, value);
        if (!_.isEmpty(Design.instance())) {
          return Design.instance().set(key, value);
        }
      },
      get: function(key) {
        console.log('canvasData:get', key);
        if (!_.isEmpty(Design.instance())) {
          return Design.instance().get(key);
        }
      },
      isModified: function() {
        console.log('canvasData:isModified');
        if (!_.isEmpty(Design.instance())) {
          return Design.instance().isModified();
        }
      },
      origin: function(origin_data) {
        if (_.isEmpty(origin_data)) {
          console.log('canvasData:get origin', MC.data.origin_canvas_data);
          return $.extend(true, {}, MC.data.origin_canvas_data);
        } else {
          console.log('canvasData:set origin', origin_data);
          return MC.data.origin_canvas_data = $.extend(true, {}, origin_data);
        }
      }
    };
    createUID = function(length) {
      var chars, i, str;
      if (length == null) {
        length = 8;
      }
      chars = void 0;
      str = void 0;
      chars = "0123456789abcdefghiklmnopqrstuvwxyz".split("");
      if (!length) {
        length = Math.floor(Math.random() * chars.length);
      }
      str = "";
      i = 0;
      while (i < length) {
        str += chars[Math.floor(Math.random() * chars.length)];
        i++;
      }
      return str;
    };
    isCurrentTab = function(tab_id) {
      console.log('isCurrentTab', tab_id);
      if (MC.data.current_tab_id === tab_id) {
        return true;
      } else {
        return false;
      }
    };
    setCurrentTabId = function(tab_id) {
      console.log('setCurrentTabId', tab_id);
      MC.data.current_tab_id = tab_id;
      return null;
    };
    searchStackAppById = function(id) {
      var error, obj, prefix, temp, value;
      console.log('searchStackAppById', id);
      value = null;
      try {
        prefix = id.split('-')[0];
        if (prefix === 'appview') {
          obj = searchCacheMap({
            key: 'id',
            value: id.replace('appview', 'process')
          });
          value = obj;
        } else if (prefix === 'new') {
          value = MC.data.nav_new_stack_list[id];
        } else if (prefix === 'stack' || prefix === 'app') {
          temp = id.split('-')[0] === 'stack' ? MC.data.nav_stack_list : MC.data.nav_app_list;
          _.each(temp, function(obj) {
            return _.each(obj.region_name_group, function(item) {
              if (item.id === id) {
                value = item;
              }
              return true;
            });
          });
        } else {
          console.error('unknown tab type ' + tab_id);
        }
      } catch (_error) {
        error = _error;
        console.log('searchStackAppById error, id is ' + id);
        console.log(error);
      }
      return value;
    };
    isResultRight = function(result) {
      console.log('isResultRight');
      if (result && !result.is_error && result.resolved_data && result.resolved_data.length > 0) {
        return true;
      } else if (!result) {
        return 'result_empty';
      } else if (result && result.is_error) {
        return 'result_error';
      } else if (result && !result.is_error && !result.resolved_data) {
        return 'resolved_data_empty';
      } else if (result && !result.is_error && result.resolved_data && (result.resolved_data.length = 0)) {
        return 'resolved_data_length';
      } else {
        return 'other_error';
      }
    };
    processType = function(id) {
      if (!_.isString(id)) {
        return void 0;
      } else if (id.indexOf('-') === -1) {
        return void 0;
      } else if (getCacheMap(id) && (id.split('-').length = 2)) {
        return 'appview';
      } else if (id.split('-')[0] === 'process' && id.split('-').length > 2) {
        return 'process';
      } else {
        return void 0;
      }
    };
    verify500 = function(result, is_test) {
      if (is_test == null) {
        is_test = false;
      }
      console.log('verify500', result, result.return_code);
      if (is_test) {
        result.is_error = true;
        result.return_code = -1;
      }
      if (result && result.return_code === -1) {
        window.location.href = "/500/";
      }
    };
    checkRepeatStackName = function() {
      var _results;
      console.log('checkRepeatStackName');
      _results = [];
      while (true) {
        MC.data.untitled = MC.data.untitled + 1;
        if (MC.aws.aws.checkStackName(null, 'untitled-' + MC.data.untitled)) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    addProcess = function(id, data) {
      console.log('addProcess', id, data);
      MC.process[id] = data;
      return null;
    };
    deleteProcess = function(id) {
      console.log('deleteProcess', id);
      delete MC.process[id];
      delete MC.data.process[id];
      console.log(MC.process);
      return null;
    };
    getProcess = function(id) {
      console.log('getProcess', id);
      return MC.process[id];
    };
    filterProcess = function(id) {
      var obj, state, _ref;
      console.log('filterProcess', id);
      obj = this.searchStackAppById(id);
      state = null;
      if (obj && ((_ref = obj.state) === constant.APP_STATE.APP_STATE_STARTING || _ref === constant.APP_STATE.APP_STATE_STOPPING || _ref === constant.APP_STATE.APP_STATE_TERMINATING || _ref === constant.APP_STATE.APP_STATE_UPDATING)) {
        state = obj.state;
      }
      return state;
    };
    initDataProcess = function(id, type, data) {
      console.log('initDataProcess', id, type, data);
      MC.data.process = {};
      MC.data.process = $.extend(true, {}, data);
      if (MC.data.process && MC.data.process[id]) {
        MC.data.process[id].state = type;
      }
      console.log('current MC.data.process', MC.data.process);
      return MC.data.process;
    };
    cacheIDMap = {};
    listCacheMap = function() {
      console.log('listCacheMap');
      return cacheIDMap;
    };
    addCacheMap = function(uid, id, origin_id, region, type, state) {
      if (state == null) {
        state = 'OPEN';
      }
      console.log('addCacheMap', uid, id, origin_id, region, type, state);
      return cacheIDMap[id] = {
        'uid': uid,
        'id': id,
        'origin_id': origin_id,
        'region': region,
        'type': type,
        'state': state,
        'create_time': '',
        'origin_time': new Date()
      };
    };
    delCacheMap = function(id) {
      console.log('delCacheMap', id);
      if (id.split('-')[0] === 'appview') {
        id = id.replace('appview', 'process');
      }
      delete cacheIDMap[id];
      return cacheIDMap;
    };
    setCacheMap = function(vpc_id, data, state, type, create_time) {
      var obj;
      console.log('setCacheMap', vpc_id, data, state, type, create_time);
      obj = null;
      _.each(cacheIDMap, function(item) {
        if (item.origin_id === vpc_id) {
          if (data) {
            item.data = $.extend(true, {}, data);
          }
          if (state) {
            item.state = state;
          }
          if (type) {
            item.type = type;
          }
          if (create_time) {
            item.create_time = create_time;
          }
          return obj = item;
        }
      });
      return obj;
    };
    getCacheMap = function(id) {
      if (id.split('-')[0] === 'appview') {
        id = id.replace('appview', 'process');
      }
      return cacheIDMap[id];
    };
    searchCacheMap = function(conditions) {
      var obj;
      console.log('searchCacheMap', conditions);
      obj = null;
      _.each(cacheIDMap, function(item) {
        if (item[conditions.key] === conditions.value) {
          return obj = item;
        }
      });
      return obj;
    };
    unmanaged_resource_list = {};
    initUnmanaged = function() {
      console.log('initUnmanaged');
      return unmanaged_resource_list = {};
    };
    listUnmanaged = function() {
      console.log('listUnmanaged');
      return unmanaged_resource_list;
    };
    addUnmanaged = function(data) {
      console.log('addUnmanaged', data);
      return unmanaged_resource_list = data;
    };
    delUnmanaged = function(vpc_id) {
      var error;
      console.log('delUnmanaged', vpc_id);
      try {
        _.each(unmanaged_resource_list, function(item) {
          var delete_item;
          delete_item = {};
          _.each(item, function(vpc_item) {
            if (_.indexOf(_.keys(item), vpc_id) !== -1) {
              return delete_item = item[vpc_id];
            }
          });
          if (delete_item) {
            return delete item[vpc_id];
          }
        });
      } catch (_error) {
        error = _error;
        console.log('delUnmanaged', vpc_id, error);
      }
      return unmanaged_resource_list;
    };
    unmanaged_vpc_list = {};
    addUnmanagedVpc = function(key, value) {
      return unmanaged_vpc_list[key] = value;
    };
    getUnmanagedVpc = function(id) {
      console.log('getUnmanagedVpc', id);
      return unmanaged_vpc_list[id];
    };
    listUnmanagedVpc = function() {
      console.log('listUnmanagedVpc');
      return unmanaged_vpc_list;
    };
    state_editor_list = [];
    initSEList = function() {
      return state_editor_list = [];
    };
    listSE = function() {
      return state_editor_list;
    };
    addSEList = function(data) {
      var comp_list;
      console.log('addSEList', data);
      if (data && data.component) {
        addSENameUIDList(data);
        comp_list = _.values(data.component);
        if (comp_list && !_.isEmpty(comp_list) && _.isArray(comp_list)) {
          initSEList();
          _.each(comp_list, function(component) {
            var key_list, name;
            name = component.name;
            key_list = _.keys(component.resource);
            if (key_list && !_.isEmpty(key_list) && _.isArray(key_list) && !_.isEmpty(component.name)) {
              return _.each(key_list, function(item) {
                var str;
                str = '{' + name + '.' + item + '}';
                return state_editor_list.push({
                  'name': str,
                  'value': str
                });
              });
            }
          });
        }
      }
      console.log('state_editor_list', state_editor_list);
      MC.storage.set('state_editor_list', state_editor_list);
      return state_editor_list;
    };
    state_editor_name_list = {};
    initSENameUIDList = function() {
      return state_editor_name_list = {};
    };
    listSENameUID = function() {
      return state_editor_name_list;
    };
    addSENameUIDList = function(data) {
      console.log('addSENameUIDList', data);
      if (data && data.component) {
        initSENameUIDList();
        _.each(data.component, function(item) {
          return state_editor_name_list[item.name] = {
            uid: item.uid,
            type: item.type
          };
        });
      }
      console.log('state_editor_name_list', state_editor_name_list);
      MC.storage.set('state_editor_name_list', state_editor_name_list);
      return state_editor_name_list;
    };
    filterStateData = function(data) {
      var filter_data, reg;
      console.log('filterStateData', data);
      filter_data = $.extend(true, {}, data);
      reg = /[^@{][-\w\.]+[}]/igm;
      _.each(filter_data, function(item) {
        return item.parameter.verify_gpg = item.parameter.verify_gpg.replace(reg, function($0) {
          var obj, split_arr;
          console.log('sfasdfasdf', $0);
          split_arr = $0.split('.');
          obj = state_editor_name_list[split_arr[0]];
          if (obj && obj.uid && split_arr.length > 1) {
            return obj.uid + '.' + split_arr[1];
          } else {
            return $0;
          }
        });
      });
      return filter_data;
    };
    convertUID = function(str) {
      var new_str, reg;
      console.log('convertUID', str);
      reg = /[^@{][-\w\.]+[}]/igm;
      new_str = str.replace(reg, function($0) {
        var obj, split_arr;
        split_arr = $0.split('.');
        obj = state_editor_name_list[split_arr[0]];
        if (obj && obj.uid && split_arr.length > 1) {
          return obj.uid + '.' + split_arr[1];
        } else {
          return $0;
        }
      });
      return new_str;
    };
    cacheThumb = {};
    addCacheThumb = function(id, canvas, svg) {
      console.log('addCacheThumb', id);
      return cacheThumb[id] = {
        canvas: canvas,
        svg: svg
      };
    };
    getCacheThumb = function(id) {
      return cacheThumb[id];
    };
    delCacheThumb = function(id) {
      return delete cacheThumb[id];
    };
    return {
      canvasData: canvasData,
      isCurrentTab: isCurrentTab,
      isResultRight: isResultRight,
      setCurrentTabId: setCurrentTabId,
      searchStackAppById: searchStackAppById,
      processType: processType,
      verify500: verify500,
      checkRepeatStackName: checkRepeatStackName,
      addProcess: addProcess,
      getProcess: getProcess,
      deleteProcess: deleteProcess,
      filterProcess: filterProcess,
      initDataProcess: initDataProcess,
      createUID: createUID,
      addCacheMap: addCacheMap,
      delCacheMap: delCacheMap,
      setCacheMap: setCacheMap,
      getCacheMap: getCacheMap,
      searchCacheMap: searchCacheMap,
      listCacheMap: listCacheMap,
      initUnmanaged: initUnmanaged,
      listUnmanaged: listUnmanaged,
      addUnmanaged: addUnmanaged,
      delUnmanaged: delUnmanaged,
      addUnmanagedVpc: addUnmanagedVpc,
      getUnmanagedVpc: getUnmanagedVpc,
      listUnmanagedVpc: listUnmanagedVpc,
      initSEList: initSEList,
      listSE: listSE,
      addSEList: addSEList,
      initSENameUIDList: initSENameUIDList,
      listSENameUID: listSENameUID,
      addSENameUIDList: addSENameUIDList,
      filterStateData: filterStateData,
      convertUID: convertUID,
      addCacheThumb: addCacheThumb,
      getCacheThumb: getCacheThumb,
      delCacheThumb: delCacheThumb
    };
  });

}).call(this);

(function() {
  define('lib/common/convert',['MC', 'constant', 'underscore', 'jquery'], function(MC, constant, _, $) {
    var convertACL, convertASG, convertAZ, convertCGW, convertDHCP, convertEIP, convertELB, convertEni, convertIGW, convertInstance, convertKP, convertLC, convertNC, convertRTB, convertSGGroup, convertScalingPolicy, convertSubnet, convertVGW, convertVPC, convertVPN, convertVolume, mapProperty;
    mapProperty = function(aws_json, madeira_json) {
      var k, v;
      for (k in aws_json) {
        v = aws_json[k];
        if (typeof v === "string" && madeira_json.resource[k[0].toUpperCase() + k.slice(1)] !== void 0) {
          madeira_json.resource[k[0].toUpperCase() + k.slice(1)] = v;
        }
      }
      return madeira_json;
    };
    convertEni = function(aws_eni) {
      var eni_json, group, ip, _i, _j, _len, _len1, _ref, _ref1;
      eni_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.NetworkInterface",
        "name": aws_eni.tagSet && aws_eni.tagSet.Name ? aws_eni.tagSet.Name : aws_eni.networkInterfaceId,
        "serverGroupUid": "",
        "serverGroupName": "",
        "number": 1,
        "index": 0,
        "resource": {
          "PrivateIpAddressSet": [],
          "Status": '',
          "GroupSet": [],
          "PrivateDnsName": "",
          "SourceDestCheck": "",
          "RequestId": "",
          "MacAddress": "",
          "OwnerId": "",
          "RequestManaged": "",
          "SecondPriIpCount": "",
          "Attachment": {
            "DeviceIndex": "",
            "InstanceId": "",
            "AttachmentId": "",
            "AttachTime": ""
          },
          "AvailabilityZone": "",
          "SubnetId": "",
          "Description": "",
          "VpcId": "",
          "PrivateIpAddress": "",
          "NetworkInterfaceId": ""
        }
      };
      if (aws_eni.attachment && aws_eni.attachment.instanceOwnerId === "amazon-elb") {
        return false;
      }
      if (aws_eni.attachment) {
        eni_json.resource.Attachment.DeviceIndex = aws_eni.attachment.deviceIndex;
        eni_json.resource.Attachment.InstanceId = aws_eni.attachment.instanceId;
        eni_json.resource.Attachment.AttachmentId = aws_eni.attachment.attachmentId;
        eni_json.resource.Attachment.AttachTime = aws_eni.attachment.attachTime;
      }
      _ref = aws_eni.privateIpAddressesSet.item;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ip = _ref[_i];
        eni_json.resource.PrivateIpAddressSet.push({
          "PrivateIpAddress": ip.privateIpAddress,
          "AutoAssign": "false",
          "Primary": ip.primary
        });
      }
      _ref1 = aws_eni.groupSet.item;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        group = _ref1[_j];
        eni_json.resource.GroupSet.push({
          "GroupId": group.groupId,
          "GroupName": group.groupName
        });
      }
      eni_json = mapProperty(aws_eni, eni_json);
      return eni_json;
    };
    convertInstance = function(aws_instance) {
      var instance_json;
      instance_json = {
        "uid": MC.guid(),
        "type": "AWS.EC2.Instance",
        "name": aws_instance.tagSet && aws_instance.tagSet.Name ? aws_instance.tagSet.Name : aws_instance.instanceId,
        "serverGroupUid": "",
        "serverGroupName": "",
        "number": 1,
        "index": 0,
        "state": "",
        "software": {},
        "resource": {
          "RamdiskId": "",
          "InstanceId": "",
          "DisableApiTermination": "",
          "ShutdownBehavior": "",
          "SecurityGroupId": [],
          "SecurityGroup": [],
          "UserData": {
            "Base64Encoded": "",
            "Data": ""
          },
          "ImageId": "",
          "Placement": {
            "Tenancy": "",
            "AvailabilityZone": "",
            "GroupName": ""
          },
          "PrivateIpAddress": "",
          "BlockDeviceMapping": [],
          "KernelId": "",
          "SubnetId": "",
          "KeyName": "",
          "VpcId": "",
          "InstanceType": "",
          "Monitoring": "",
          "EbsOptimized": "",
          "NetworkInterface": []
        }
      };
      instance_json.resource.Placement.AvailabilityZone = aws_instance.placement.availabilityZone;
      instance_json.resource.Placement.Tenancy = aws_instance.placement.tenancy;
      instance_json = mapProperty(aws_instance, instance_json);
      return instance_json;
    };
    convertSGGroup = function(aws_sg) {
      var ipranges, sg_json, sg_rule, _i, _j, _len, _len1, _ref, _ref1;
      sg_json = {
        "uid": MC.guid(),
        "type": "AWS.EC2.SecurityGroup",
        "name": aws_sg.groupName,
        "resource": {
          "IpPermissions": [],
          "IpPermissionsEgress": [],
          "GroupId": "",
          "Default": "",
          "VpcId": "",
          "GroupName": "",
          "OwnerId": "",
          "GroupDescription": ''
        }
      };
      sg_json = mapProperty(aws_sg, sg_json);
      if (aws_sg.ipPermissions) {
        _ref = aws_sg.ipPermissions.item;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg_rule = _ref[_i];
          ipranges = '';
          if (sg_rule.groups && sg_rule.groups.item[0].groupId) {
            ipranges = sg_rule.groups.item[0].groupId;
          } else if (sg_rule.ipRanges) {
            ipranges = sg_rule.ipRanges.item[0].cidrIp;
          }
          if (ipranges) {
            sg_json.resource.IpPermissions.push({
              "IpProtocol": sg_rule.ipProtocol,
              "IpRanges": ipranges,
              "FromPort": sg_rule.fromPort ? sg_rule.fromPort : "",
              "ToPort": sg_rule.toPort ? sg_rule.toPort : ""
            });
          }
        }
      }
      if (aws_sg.ipPermissionsEgress) {
        _ref1 = aws_sg.ipPermissionsEgress.item;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sg_rule = _ref1[_j];
          ipranges = '';
          if (sg_rule.groups && sg_rule.groups.item[0].groupId) {
            ipranges = sg_rule.groups.item[0].groupId;
          } else if (sg_rule.ipRanges) {
            ipranges = sg_rule.ipRanges.item[0].cidrIp;
          }
          if (ipranges) {
            sg_json.resource.IpPermissionsEgress.push({
              "IpProtocol": sg_rule.ipProtocol,
              "IpRanges": ipranges,
              "FromPort": sg_rule.fromPort ? sg_rule.fromPort : "",
              "ToPort": sg_rule.toPort ? sg_rule.toPort : ""
            });
          }
        }
      }
      return sg_json;
    };
    convertELB = function(aws_elb) {
      var az, elb_json, ins, listener, sg, subnet, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      elb_json = {
        "uid": MC.guid(),
        "type": "AWS.ELB",
        "name": aws_elb.LoadBalancerName,
        "resource": {
          "HealthCheck": {
            "Timeout": "5",
            "Target": "HTTP:80/index.html",
            "HealthyThreshold": "9",
            "UnhealthyThreshold": "4",
            "Interval": "30"
          },
          "Policies": {
            "AppCookieStickinessPolicies": [],
            "OtherPolicies": [],
            "LBCookieStickinessPolicies": []
          },
          "BackendServerDescriptions": [],
          "SecurityGroups": [],
          "CreatedTime": "",
          "CanonicalHostedZoneNameID": "",
          "ListenerDescriptions": [],
          "DNSName": "",
          "Scheme": "",
          "CanonicalHostedZoneName": "",
          "Instances": [],
          "SourceSecurityGroup": {
            "OwnerAlias": "",
            "GroupName": ""
          },
          "Subnets": [],
          "VpcId": "",
          "LoadBalancerName": "",
          "AvailabilityZones": [],
          "CrossZoneLoadBalancing": "false"
        }
      };
      elb_json.resource.HealthCheck.Timeout = aws_elb.HealthCheck.Timeout;
      elb_json.resource.HealthCheck.Interval = aws_elb.HealthCheck.Interval;
      elb_json.resource.HealthCheck.UnhealthyThreshold = aws_elb.HealthCheck.UnhealthyThreshold;
      elb_json.resource.HealthCheck.Target = aws_elb.HealthCheck.Target;
      elb_json.resource.HealthCheck.HealthyThreshold = aws_elb.HealthCheck.HealthyThreshold;
      if (aws_elb.SecurityGroups) {
        _ref = aws_elb.SecurityGroups.member;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sg = _ref[_i];
          elb_json.resource.SecurityGroups.push(sg);
        }
      }
      if (aws_elb.Subnets) {
        _ref1 = aws_elb.Subnets.member;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          subnet = _ref1[_j];
          elb_json.resource.Subnets.push(subnet);
        }
      }
      if (aws_elb.VPCId) {
        elb_json.resource.VpcId = aws_elb.VPCId;
      }
      if (aws_elb.AvailabilityZones) {
        _ref2 = aws_elb.AvailabilityZones.member;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          az = _ref2[_k];
          elb_json.resource.AvailabilityZones.push(az);
        }
      }
      if (aws_elb.ListenerDescriptions) {
        _ref3 = aws_elb.ListenerDescriptions.member;
        for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
          listener = _ref3[_l];
          elb_json.resource.ListenerDescriptions.push({
            "PolicyNames": listener.PolicyNames ? listener.PolicyNames : '',
            "Listener": {
              "LoadBalancerPort": listener.Listener.LoadBalancerPort,
              "InstanceProtocol": listener.Listener.InstanceProtocol,
              "Protocol": listener.Listener.Protocol,
              "SSLCertificateId": listener.Listener.SSLCertificateId ? listener.Listener.SSLCertificateId : "",
              "InstancePort": listener.Listener.InstancePort
            }
          });
        }
      }
      if (aws_elb.Instances) {
        _ref4 = aws_elb.Instances.member;
        for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
          ins = _ref4[_m];
          elb_json.resource.Instances.push(ins);
        }
      }
      elb_json = mapProperty(aws_elb, elb_json);
      return elb_json;
    };
    convertACL = function(aws_acl) {
      var acl, acl_json, _i, _j, _len, _len1, _ref, _ref1;
      acl_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.NetworkAcl",
        "name": aws_acl.networkAclId,
        "resource": {
          "RouteTableId": "",
          "NetworkAclId": "",
          "VpcId": "",
          "Default": "",
          "EntrySet": [],
          "AssociationSet": []
        }
      };
      _ref = aws_acl.entrySet.item;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        acl = _ref[_i];
        acl_json.resource.EntrySet.push({
          "RuleAction": acl.ruleAction,
          "Protocol": acl.protocol,
          "CidrBlock": acl.cidrBlock,
          "Egress": acl.egress,
          "IcmpTypeCode": {
            "Type": acl.icmpTypeCode ? acl.icmpTypeCode.type : "",
            "Code": acl.icmpTypeCode ? acl.icmpTypeCode.code : ""
          },
          "PortRange": {
            "To": acl.portRange ? acl.portRange.to : "",
            "From": acl.portRange ? acl.portRange.from : ""
          },
          "RuleNumber": acl.ruleNumber
        });
      }
      if (aws_acl.associationSet) {
        _ref1 = aws_acl.associationSet.item;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          acl = _ref1[_j];
          acl_json.resource.AssociationSet.push({
            "NetworkAclAssociationId": acl.networkAclAssociationId,
            "NetworkAclId": acl.networkAclId,
            "SubnetId": acl.subnetId
          });
        }
      }
      acl_json = mapProperty(aws_acl, acl_json);
      return acl_json;
    };
    convertRTB = function(aws_rtb) {
      var asso, prop, route, rtb_json, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      rtb_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.RouteTable",
        "name": aws_rtb.routeTableId,
        "resource": {
          "VpcId": "",
          "PropagatingVgwSet": [],
          "RouteSet": [],
          "RouteTableId": "",
          "AssociationSet": []
        }
      };
      if (aws_rtb.associationSet) {
        _ref = aws_rtb.associationSet.item;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          asso = _ref[_i];
          rtb_json.resource.AssociationSet.push({
            "Main": asso.main,
            "RouteTableId": asso.routeTableId,
            "SubnetId": asso.subnetId ? asso.subnetId : "",
            "RouteTableAssociationId": asso.routeTableAssociationId
          });
        }
      }
      _ref1 = aws_rtb.routeSet.item;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        route = _ref1[_j];
        rtb_json.resource.RouteSet.push({
          'State': route.state,
          'Origin': route.origin,
          'InstanceId': route.instanceId ? route.instanceId : "",
          'InstanceOwnerId': route.instanceOwnerId ? route.instanceOwnerId : "",
          'GatewayId': route.gatewayId ? route.gatewayId : "",
          'NetworkInterfaceId': route.networkInterfaceId ? route.networkInterfaceId : "",
          'DestinationCidrBlock': route.destinationCidrBlock
        });
      }
      if (aws_rtb.propagatingVgwSet) {
        _ref2 = aws_rtb.propagatingVgwSet.item;
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          prop = _ref2[_k];
          rtb_json.resource.PropagatingVgwSet.push(prop.gatewayId);
        }
      }
      rtb_json = mapProperty(aws_rtb, rtb_json);
      return rtb_json;
    };
    convertSubnet = function(aws_subnet) {
      var subnet_json;
      subnet_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.Subnet",
        "name": aws_subnet.tagSet && aws_subnet.tagSet.Name ? aws_subnet.tagSet.Name : aws_subnet.subnetId,
        "resource": {
          "AvailabilityZone": "",
          "CidrBlock": "",
          "SubnetId": "",
          "VpcId": "",
          "AvailableIpAddressCount": "",
          "State": ""
        }
      };
      subnet_json = mapProperty(aws_subnet, subnet_json);
      return subnet_json;
    };
    convertVPC = function(aws_vpc) {
      var vpc_json;
      vpc_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.VPC",
        "name": aws_vpc.tagSet && aws_vpc.tagSet.Name ? aws_vpc.tagSet.Name : aws_vpc.vpcId,
        "resource": {
          "EnableDnsHostnames": "",
          "DhcpOptionsId": "",
          "CidrBlock": "",
          "State": "",
          "InstanceTenancy": "",
          "VpcId": "",
          "IsDefault": "",
          "EnableDnsSupport": ""
        }
      };
      vpc_json = mapProperty(aws_vpc, vpc_json);
      return vpc_json;
    };
    convertKP = function(aws_keypair) {
      var kp_json;
      kp_json = {
        "uid": MC.guid(),
        "type": "AWS.EC2.KeyPair",
        "name": aws_keypair.keyName,
        "resource": {
          "KeyFingerprint": aws_keypair.keyFingerprint,
          "KeyName": aws_keypair.keyName
        }
      };
      return kp_json;
    };
    convertVolume = function(aws_vol) {
      var vol_json;
      vol_json = {
        "uid": MC.guid(),
        "type": "AWS.EC2.EBS.Volume",
        "name": aws_vol.attachmentSet ? aws_vol.attachmentSet.item[0].device : "",
        "serverGroupUid": "",
        "serverGroupName": "",
        "number": 1,
        "index": 0,
        "resource": {
          "VolumeId": "",
          "CreateTime": "",
          "AvailabilityZone": "",
          "Size": "1",
          "Status": "",
          "SnapshotId": "",
          "Iops": "",
          "AttachmentSet": {
            "VolumeId": "",
            "Status": "",
            "AttachTime": "",
            "InstanceId": "",
            "DeleteOnTermination": "",
            "Device": ""
          },
          "VolumeType": "standard"
        }
      };
      if (aws_vol.attachmentSet) {
        vol_json.resource.AttachmentSet.AttachTime = aws_vol.attachmentSet.item[0].attachTime;
        vol_json.resource.AttachmentSet.Status = aws_vol.attachmentSet.item[0].status;
        vol_json.resource.AttachmentSet.VolumeId = aws_vol.attachmentSet.item[0].volumeId;
        vol_json.resource.AttachmentSet.InstanceId = aws_vol.attachmentSet.item[0].instanceId;
        vol_json.resource.AttachmentSet.DeleteOnTermination = aws_vol.attachmentSet.item[0].deleteOnTermination;
        vol_json.resource.AttachmentSet.Device = aws_vol.attachmentSet.item[0].device;
      }
      vol_json = mapProperty(aws_vol, vol_json);
      return vol_json;
    };
    convertASG = function(aws_asg) {
      var asg_json;
      asg_json = {
        'type': 'AWS.AutoScaling.Group',
        'name': aws_asg.AutoScalingGroupName,
        'uid': MC.guid(),
        'resource': {
          'AutoScalingGroupARN': '',
          'AutoScalingGroupName': '',
          'AvailabilityZones': [],
          'CreatedTime': '',
          'DefaultCooldown': "",
          'DesiredCapacity': "",
          'EnabledMetrics': [],
          'HealthCheckGracePeriod': "",
          'HealthCheckType': "",
          'Instances': [],
          'LaunchConfigurationName': '',
          'LoadBalancerNames': [],
          'MaxSize': "2",
          'MinSize': "1",
          'PlacementGroup': '',
          'Status': '',
          'SuspendedProcesses': [],
          'Tags': '',
          'TerminationPolicies': [],
          'VPCZoneIdentifier': '',
          'InstanceId': '',
          'ShouldDecrementDesiredCapacity': ''
        }
      };
      if (aws_asg.LoadBalancerNames) {
        asg_json.resource.LoadBalancerNames = aws_asg.LoadBalancerNames.member;
      }
      asg_json.resource.TerminationPolicies = aws_asg.TerminationPolicies.member;
      asg_json.resource.AvailabilityZones = aws_asg.AvailabilityZones.member;
      asg_json = mapProperty(aws_asg, asg_json);
      return asg_json;
    };
    convertLC = function(aws_lc) {
      var lc_json;
      lc_json = {
        'name': aws_lc.LaunchConfigurationName,
        'uid': MC.guid(),
        'type': 'AWS.AutoScaling.LaunchConfiguration',
        'resource': {
          'BlockDeviceMapping': [],
          'CreatedTime': '',
          'EbsOptimized': '',
          'IamInstanceProfile': '',
          'ImageId': '',
          'InstanceMonitoring': '',
          'InstanceType': '',
          'KernelId': '',
          'KeyName': '',
          'LaunchConfigurationARN': '',
          'LaunchConfigurationName': '',
          'RamdiskId': '',
          'SecurityGroups': [],
          'SpotPrice': '',
          'UserData': ''
        }
      };
      lc_json.resource.SecurityGroups = aws_lc.SecurityGroups.member;
      if (aws_lc.BlockDeviceMappings) {
        lc_json.resource.BlockDeviceMapping = aws_lc.BlockDeviceMappings.member;
      }
      lc_json.resource.InstanceMonitoring = aws_lc.InstanceMonitoring.Enabled;
      lc_json = mapProperty(aws_lc, lc_json);
      return lc_json;
    };
    convertEIP = function(aws_eip) {
      var eip_json;
      eip_json = {
        "uid": MC.guid(),
        "type": "AWS.EC2.EIP",
        "name": "",
        "resource": {
          "InstanceId": "",
          "PrivateIpAddress": "",
          "NetworkInterfaceId": "",
          "NetworkInterfaceOwnerId": "",
          "AllowReassociation": "",
          "Domain": "standard",
          "AssociationId": "",
          "PublicIp": "",
          "AllocationId": ""
        }
      };
      eip_json = mapProperty(aws_eip, eip_json);
      return eip_json;
    };
    convertCGW = function(aws_cgw) {
      var cgw_json;
      cgw_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.CustomerGateway",
        "name": aws_cgw.customerGatewayId,
        "resource": {
          "Type": "",
          "BgpAsn": "",
          "CustomerGatewayId": "",
          "State": "",
          "IpAddress": ""
        }
      };
      cgw_json = mapProperty(aws_cgw, cgw_json);
      return cgw_json;
    };
    convertIGW = function(aws_igw) {
      var igw_json;
      igw_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.InternetGateway",
        "name": "InternetGateway",
        "resource": {
          "InternetGatewayId": aws_igw.internetGatewayId,
          "AttachmentSet": [
            {
              "VpcId": aws_igw.attachmentSet.item[0].vpcId,
              "State": aws_igw.attachmentSet.item[0].state
            }
          ]
        }
      };
      return igw_json;
    };
    convertVGW = function(aws_vgw) {
      var vgw_json;
      vgw_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.VPNGateway",
        "name": "VirtualPrivateGateway",
        "resource": {
          "Attachments": [
            {
              "VpcId": aws_vgw.attachments.item[0].vpcId,
              "State": aws_vgw.attachments.item[0].state
            }
          ],
          "Type": aws_vgw.type,
          "VpnGatewayId": aws_vgw.vpnGatewayId,
          "State": aws_vgw.state
        }
      };
      return vgw_json;
    };
    convertVPN = function(aws_vpn) {
      var route, vpn_json, _i, _len, _ref;
      vpn_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.VPNConnection",
        "name": "VPN",
        "resource": {
          "CustomerGatewayConfiguration": "",
          "Routes": [],
          "State": "",
          "Type": "ipsec.1",
          "VpnGatewayId": "",
          "Options": {
            "StaticRoutesOnly": "true"
          },
          "CustomerGatewayId": "",
          "VpnConnectionId": ""
        }
      };
      if (aws_vpn.options && aws_vpn.options.staticRoutesOnly) {
        vpn_json.resource.Options.StaticRoutesOnly = aws_vpn.options.staticRoutesOnly;
      }
      if (aws_vpn.routes) {
        _ref = aws_vpn.routes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          route = _ref[_i];
          vpn_json.resource.Routes.push({
            "DestinationCidrBlock": route.destinationCidrBlock,
            "Source": route.source,
            "State": route.state
          });
        }
      }
      vpn_json = mapProperty(aws_vpn, vpn_json);
      return vpn_json;
    };
    convertNC = function(aws_nc) {
      var nc_json;
      nc_json = {
        'type': 'AWS.AutoScaling.NotificationConfiguration',
        'name': '',
        'uid': MC.guid(),
        'resource': {
          'AutoScalingGroupName': aws_nc.AutoScalingGroupName,
          'NotificationType': aws_nc.NotificationType,
          'TopicARN': aws_nc.TopicARN
        }
      };
      return nc_json;
    };
    convertScalingPolicy = function(aws_sp) {
      var sp_json;
      sp_json = {
        'type': 'AWS.AutoScaling.ScalingPolicy',
        'name': aws_sp.PolicyName,
        'uid': MC.guid(),
        'resource': {
          'AdjustmentType': "",
          'Alarms': [],
          'AutoScalingGroupName': '',
          'Cooldown': '',
          'MinAdjustmentStep': '',
          'PolicyARN': '',
          'PolicyName': '',
          'ScalingAdjustment': ''
        }
      };
      if (aws_sp.Alarms) {
        sp_json.resource.Alarms = aws_sp.Alarms.member;
      }
      sp_json = mapProperty(aws_sp, sp_json);
      return sp_json;
    };
    convertDHCP = function(aws_dhcp) {
      var dhcp, dhcp_json, value, valueset, _i, _j, _len, _len1, _ref, _ref1;
      dhcp_json = {
        "uid": MC.guid(),
        "type": "AWS.VPC.DhcpOptions",
        "name": "default",
        "resource": {
          "VpcId": "",
          "DhcpOptionsId": aws_dhcp.dhcpOptionsId,
          "DhcpConfigurationSet": []
        }
      };
      if (aws_dhcp.dhcpConfigurationSet) {
        _ref = aws_dhcp.dhcpConfigurationSet.item;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dhcp = _ref[_i];
          value = [];
          _ref1 = dhcp.valueSet;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            valueset = _ref1[_j];
            value.push({
              "Value": valueset
            });
          }
          dhcp_json.resource.DhcpConfigurationSet.push({
            "Key": dhcp.key,
            "ValueSet": value
          });
        }
      }
      return dhcp_json;
    };
    convertAZ = function(aws_az) {
      var az_json;
      az_json = {
        'uid': MC.guid(),
        "type": "AWS.EC2.AvailabilityZone",
        "name": aws_az.zoneName,
        "resource": {
          "ZoneName": aws_az.zoneName,
          "RegionName": aws_az.regionName
        }
      };
      return az_json;
    };
    return {
      convertAZ: convertAZ,
      convertDHCP: convertDHCP,
      convertScalingPolicy: convertScalingPolicy,
      convertNC: convertNC,
      convertVPN: convertVPN,
      convertVGW: convertVGW,
      convertIGW: convertIGW,
      convertCGW: convertCGW,
      convertEIP: convertEIP,
      convertLC: convertLC,
      convertASG: convertASG,
      convertVolume: convertVolume,
      convertKP: convertKP,
      convertVPC: convertVPC,
      convertSubnet: convertSubnet,
      convertRTB: convertRTB,
      convertACL: convertACL,
      convertELB: convertELB,
      convertSGGroup: convertSGGroup,
      convertEni: convertEni,
      convertInstance: convertInstance
    };
  });

}).call(this);

(function() {
  define('common_handle',['MC', 'lib/common/cookie', 'lib/common/other', 'lib/common/convert'], function(MC, cookie, other, convert_handler) {
    MC.common = {
      cookie: cookie,
      other: other,
      convert: convert_handler
    };
    return MC.common;
  });

}).call(this);


define("lib/deprecated", function(){});
