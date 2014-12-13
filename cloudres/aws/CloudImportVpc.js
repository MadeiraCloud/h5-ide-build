(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["CloudResources", "cloudres/CrCollection", "constant", "ApiRequest", "DiffTree"], function(CloudResources, CrCollection, constant, ApiRequest, DiffTree) {
    var AWS_ID, CREATE_REF, ConverterData, Converters, TAG_NAME, UID, convertResToJson, processServerGroup, __createRequestParam;
    CREATE_REF = function(compOrUid, attr) {
      if (!compOrUid) {
        return '';
      }
      if (attr) {
        return "@{" + (compOrUid.uid || compOrUid) + "." + attr + "}";
      } else {
        return "@{" + (compOrUid.uid || compOrUid) + ".r.p}";
      }
    };
    UID = MC.guid;
    AWS_ID = function(dict, type) {
      var key;
      key = constant.AWS_RESOURCE_KEY[type];
      return dict[key] || dict.resource && dict.resource[key];
    };
    TAG_NAME = function(res) {
      var name;
      name = null;
      if (res.tagSet) {
        name = res.tagSet.name || res.tagSet.Name || res.tagSet["aws:cloudformation:logical-id"];
      }
      return name;
    };
    ConverterData = (function() {
      ConverterData.prototype.CrPartials = function(type) {
        return CloudResources(constant.RESTYPE[type], this.region);
      };

      ConverterData.prototype.getResourceByType = function(type) {
        return CloudResources(constant.RESTYPE[type], this.region).filter((function(_this) {
          return function(model) {
            return model.RES_TAG === _this.vpcId || model.get("vpcId") === _this.vpcId;
          };
        })(this));
      };

      function ConverterData(region, vpcId, originalJson) {
        this.region = region;
        this.vpcId = vpcId;
        this.azs = {};
        this.subnets = {};
        this.instances = {};
        this.enis = {};
        this.gateways = {};
        this.volumes = {};
        this.sgs = {};
        this.iams = {};
        this.elbs = {};
        this.lcs = {};
        this.asgs = {};
        this.topics = {};
        this.sps = {};
        this.sbgs = {};
        this.dbinstances = {};
        this.ogs = {};
        this.ins_in_asg = [];
        this.component = {};
        this.layout = {};
        this.originalJson = jQuery.extend(true, {
          component: [],
          layout: []
        }, originalJson);
        this.originAppJSON = originalJson;
        this.DEFAULT_KP = null;
        this.COMPARISONOPERATOR = {
          "GreaterThanOrEqualToThreshold": ">=",
          "GreaterThanThreshold": ">",
          "LessThanThreshold": "<",
          "LessThanOrEqualToThreshold": "<="
        };
      }

      ConverterData.prototype.add = function(shortType, resource, name) {
        var comp, originComp, type;
        type = constant.RESTYPE[shortType];
        if (resource && resource.uid) {
          this.component[resource.uid] = resource;
          return resource;
        }
        originComp = this.getOriginalComp(resource, type);
        if (originComp) {
          _.extend(originComp.resource, resource);
          this.component[originComp.uid] = originComp;
          return this.component[originComp.uid];
        }
        comp = {
          uid: UID(),
          name: name || AWS_ID(resource, type) || shortType,
          type: type,
          resource: resource
        };
        this.component[comp.uid] = comp;
        return comp;
      };

      ConverterData.prototype.addLayout = function(component, isGroupLayout, parentComp) {
        var l;
        l = this.originalJson.layout[component.uid];
        if (!l) {
          l = {
            uid: component.uid,
            coordinate: [0, 0]
          };
          if (isGroupLayout) {
            l.size = [0, 0];
          }
          if (parentComp) {
            l.groupUId = parentComp.uid;
          }
        }
        this.layout[l.uid] = l;
      };

      ConverterData.prototype.addExpandedAsg = function(originalAsg, parentComp) {
        var key, l, node, _ref;
        _ref = this.originalJson.layout;
        for (key in _ref) {
          node = _ref[key];
          if (node.type === "ExpandedAsg" && node.originalId === originalAsg.uid && node.groupUId === parentComp.uid) {
            l = this.originalJson.layout[node.uid];
            break;
          }
        }
        if (!l) {
          l = {
            uid: UID(),
            coordinate: [0, 0],
            originalId: originalAsg.uid,
            type: "ExpandedAsg",
            groupUId: parentComp.uid
          };
        }
        this.layout[l.uid] = l;
      };

      ConverterData.prototype.addAz = function(azName) {
        var az, azRes;
        az = this.azs[azName];
        if (az) {
          return az;
        }
        azRes = this.getOriginalComp(azName, 'AZ');
        if (!azRes) {
          azRes = {
            "RegionName": this.region,
            "ZoneName": azName
          };
        }
        az = this.add("AZ", azRes, azName);
        this.addLayout(az, true, this.theVpc);
        this.azs[azName] = az;
        return az;
      };

      ConverterData.prototype.addIAM = function(arn) {
        var iamComp, iamRes, name, reg_iam, tmpAry;
        iamComp = this.iams[arn];
        if (iamComp) {
          return iamComp;
        }
        reg_iam = /arn:aws:iam::.*:server-certificate\/.*/g;
        if (!arn.match(reg_iam)) {
          console.error("[addIam] not a valid iam arn");
          return null;
        }
        tmpAry = arn.split(":");
        name = tmpAry[tmpAry.length - 1].replace("server-certificate/", "");
        iamRes = {
          "CertificateBody": "",
          "CertificateChain": "",
          "PrivateKey": "",
          "ServerCertificateMetadata": {
            "Arn": arn,
            "ServerCertificateId": "",
            "ServerCertificateName": name
          }
        };
        iamComp = this.add("IAM", iamRes, name);
        this.iams[arn] = iamComp;
        return iamComp;
      };

      ConverterData.prototype.addTopic = function(arn) {
        var tmpAry, topicComp, topicName, topicRes;
        topicComp = this.topics[arn];
        if (topicComp) {
          return topicComp;
        }
        topicRes = {
          "TopicArn": arn
        };
        tmpAry = arn.split(":");
        if (tmpAry.length > 0) {
          topicName = tmpAry[tmpAry.length - 1];
        }
        topicComp = this.add("TOPIC", topicRes, topicName);
        this.topics[arn] = topicComp;
        return topicComp;
      };

      ConverterData.prototype.getOriginalComp = function(jsonOrKey, type) {
        var comp, id, key, uid, _ref, _ref1;
        if (type === constant.RESTYPE["NC"]) {
          _ref = this.originalJson.component;
          for (uid in _ref) {
            comp = _ref[uid];
            if (comp.type !== type) {
              continue;
            }
            if (comp.resource.AutoScalingGroupName === jsonOrKey.AutoScalingGroupName && comp.resource.TopicARN === jsonOrKey.TopicARN) {
              return comp;
            }
          }
        } else {
          type = constant.RESTYPE[type] || type;
          key = constant.AWS_RESOURCE_KEY[type];
          id = _.isObject(jsonOrKey) ? jsonOrKey[key] : jsonOrKey;
          if (!id) {
            return null;
          }
          _ref1 = this.originalJson.component;
          for (uid in _ref1) {
            comp = _ref1[uid];
            if (comp.type !== type) {
              continue;
            }
            if ((comp[key] || comp.resource[key]) === id) {
              return comp;
            }
          }
        }
        return null;
      };

      ConverterData.prototype._mapProperty = function(aws_json, resource) {
        var k, v, _ref;
        for (k in aws_json) {
          v = aws_json[k];
          if (((_ref = typeof v) === "string" || _ref === "number" || _ref === "boolean") && resource[k[0].toUpperCase() + k.slice(1)] !== void 0) {
            resource[k[0].toUpperCase() + k.slice(1)] = v;
          }
        }
        return resource;
      };

      ConverterData.prototype._genCompMap = function(originalJson) {
        var comp, compMap, key, uid, _ref;
        compMap = {};
        _ref = originalJson.component;
        for (uid in _ref) {
          comp = _ref[uid];
          key = constant.AWS_RESOURCE_KEY[comp.type];
          if (!comp.resource) {
            continue;
          }
          if (!key) {
            continue;
          }
          if (!comp.resource[key]) {
            console.error("not found id " + key + " for resource", comp);
          }
          compMap[comp.resource[key]] = {
            "uid": uid,
            "name": comp.name
          };
        }
        return compMap;
      };

      ConverterData.prototype._removeAppId = function(name) {
        var reg_app, rlt;
        reg_app = /app-[a-z0-9]{8}$/g;
        rlt = name.match(reg_app);
        if (rlt && rlt.length === 1) {
          name = name.replace(rlt[0], "");
        }
        return name;
      };

      return ConverterData;

    })();
    Converters = [
      function() {
        var com, compJson, kpRes, retainList, uid, _ref, _ref1;
        retainList = ['AWS.EC2.Tag', 'AWS.AutoScaling.Tag', constant.RESTYPE.KP, constant.RESTYPE.TOPIC, constant.RESTYPE.SUBSCRIPTION, constant.RESTYPE.IAM, constant.RESTYPE.DHCP];
        _ref = this.originalJson.component;
        for (uid in _ref) {
          com = _ref[uid];
          if (!this.component[uid] && (_ref1 = com.type, __indexOf.call(retainList, _ref1) >= 0)) {
            compJson = this.add(null, com);
            if (com.type === constant.RESTYPE.IAM) {
              this.iams[com.resource.ServerCertificateMetadata.Arn] = compJson;
            } else if (com.type === constant.RESTYPE.KP) {
              if (com.name === "DefaultKP") {
                this.DEFAULT_KP = jQuery.extend(true, {}, com);
                this.component[com.uid] = this.DEFAULT_KP;
              }
            }
          }
          null;
        }
        if (!this.DEFAULT_KP) {
          kpRes = {
            "KeyFingerprint": "",
            "KeyName": "DefaultKP"
          };
          this.add("KP", kpRes, "DefaultKP");
        }
        return null;
      }, function() {
        var vpc, vpcComp;
        vpc = this.getResourceByType("VPC")[0];
        this.theVpc = vpcComp = this.add("VPC", {
          VpcId: this.vpcId,
          CidrBlock: vpc.attributes.cidrBlock,
          DhcpOptionsId: vpc.attributes.dhcpOptionsId,
          InstanceTenancy: vpc.attributes.instanceTenancy,
          EnableDnsHostnames: vpc.attributes.enableDnsHostnames,
          EnableDnsSupport: vpc.attributes.enableDnsSupport
        }, TAG_NAME(vpc.attributes) || this.vpcId);
        this.addLayout(vpcComp, true);
      }, function() {
        var azComp, idx, sb, sbComp, _i, _len, _ref;
        _ref = this.getResourceByType("SUBNET") || [];
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          sb = _ref[idx];
          sb = sb.attributes;
          azComp = this.addAz(sb.availabilityZone);
          sbComp = this.add("SUBNET", {
            AvailabilityZone: CREATE_REF(azComp, "resource.ZoneName"),
            CidrBlock: sb.cidrBlock,
            SubnetId: sb.id,
            VpcId: CREATE_REF(this.theVpc, "resource.VpcId")
          }, TAG_NAME(sb) || sb.id);
          this.subnets[sb.id] = sbComp;
          this.addLayout(sbComp, true, azComp);
        }
      }, function() {
        var aws_igw, igwComp, igwRes, _i, _len, _ref;
        _ref = this.getResourceByType("IGW") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_igw = _ref[_i];
          aws_igw = aws_igw.attributes;
          if (!(aws_igw.attachmentSet && aws_igw.attachmentSet.length > 0)) {
            continue;
          }
          igwRes = {
            "AttachmentSet": [
              {
                "VpcId": CREATE_REF(this.theVpc, "resource.VpcId")
              }
            ],
            "InternetGatewayId": aws_igw.id
          };
          igwComp = this.add("IGW", igwRes, "Internet-gateway");
          this.addLayout(igwComp, true, this.theVpc);
          this.gateways[aws_igw.id] = igwComp;
        }
      }, function() {
        var aws_vgw, vgwAttach, vgwComp, vgwRes, _i, _len, _ref, _ref1;
        _ref = this.getResourceByType("VGW");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_vgw = _ref[_i];
          aws_vgw = aws_vgw.attributes;
          if ((_ref1 = aws_vgw.state) === "deleted" || _ref1 === "deleting") {
            continue;
          }
          if (aws_vgw.attachments && aws_vgw.attachments.length > 0) {
            vgwAttach = aws_vgw.attachments[0];
          }
          vgwRes = {
            "Attachments": [
              {
                "VpcId": CREATE_REF(this.theVpc, "resource.VpcId")
              }
            ],
            "Type": aws_vgw.type,
            "VpnGatewayId": ""
          };
          vgwRes.VpnGatewayId = aws_vgw.id;
          vgwComp = this.add("VGW", vgwRes, "VPN-gateway");
          this.addLayout(vgwComp, true, this.theVpc);
          this.gateways[aws_vgw.id] = vgwComp;
        }
      }, function() {
        var aws_cgw, cgwComp, cgwRes, _i, _len, _ref, _ref1;
        _ref = this.getResourceByType("CGW");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_cgw = _ref[_i];
          aws_cgw = aws_cgw.attributes;
          if ((_ref1 = aws_cgw.state) === "deleted" || _ref1 === "deleting") {
            continue;
          }
          cgwRes = {
            "BgpAsn": 'bgpAsn' in aws_cgw ? aws_cgw.bgpAsn : "",
            "CustomerGatewayId": aws_cgw.id,
            "IpAddress": aws_cgw.ipAddress,
            "Type": aws_cgw.type
          };
          cgwComp = this.add("CGW", cgwRes, TAG_NAME(aws_cgw));
          delete this.component[cgwComp.uid];
          this.gateways[aws_cgw.id] = cgwComp;
        }
      }, function() {
        var aws_vpn, cgwComp, route, vgwComp, vpnComp, vpnRes, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        _ref = this.getResourceByType("VPN");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_vpn = _ref[_i];
          aws_vpn = aws_vpn.attributes;
          if ((_ref1 = aws_vpn.state) === "deleted" || _ref1 === "deleting") {
            continue;
          }
          vgwComp = this.gateways[aws_vpn.vpnGatewayId];
          cgwComp = this.gateways[aws_vpn.customerGatewayId];
          if (!(cgwComp && vgwComp)) {
            continue;
          }
          vpnRes = {
            "CustomerGatewayId": CREATE_REF(cgwComp, "resource.CustomerGatewayId"),
            "Options": {
              "StaticRoutesOnly": false
            },
            "Routes": [],
            "Type": aws_vpn.type,
            "VpnConnectionId": aws_vpn.id,
            "VpnGatewayId": CREATE_REF(vgwComp, "resource.VpnGatewayId")
          };
          if (aws_vpn.options && aws_vpn.options.staticRoutesOnly) {
            vpnRes.Options.StaticRoutesOnly = aws_vpn.options.staticRoutesOnly;
            cgwComp.resource.BgpAsn = "";
          }
          if (aws_vpn.routes) {
            _ref2 = aws_vpn.routes;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              route = _ref2[_j];
              if ((_ref3 = route.state) === "deleting" || _ref3 === "deleted") {
                continue;
              }
              vpnRes.Routes.push({
                "DestinationCidrBlock": route.destinationCidrBlock
              });
            }
          }
          vpnComp = this.add("VPN", vpnRes, TAG_NAME(aws_vpn));
          this.component[cgwComp.uid] = cgwComp;
          this.addLayout(cgwComp, false);
        }
      }, function() {
        var aws_sg, defaultSg, defaultSgComp, genRules, groupId, originSGComp, sgComp, sgRefMap, sgRes, sg_rule, that, visualopsDefaultSg, vpcComp, vpcDefaultSg, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        that = this;
        sgRefMap = {};
        genRules = function(sg_rule, new_ruls) {
          var ipranges;
          that = this;
          if (String(sg_rule.ipProtocol) === '-1') {
            sg_rule.fromPort = '0';
            sg_rule.toPort = '65535';
          }
          if (sg_rule.groups && sg_rule.groups.length > 0) {
            return _.each(sg_rule.groups, function(group) {
              var iprange, sgComp, sgId;
              if (group.groupId) {
                iprange = '';
                sgId = group.groupId;
                sgComp = sgRefMap[sgId];
                if (sgComp) {
                  iprange = CREATE_REF(sgComp, 'resource.GroupId');
                } else {
                  iprange = group.groupId;
                }
                return new_ruls.push({
                  "FromPort": String(sg_rule.fromPort ? sg_rule.fromPort : ""),
                  "IpProtocol": String(sg_rule.ipProtocol),
                  "IpRanges": iprange,
                  "ToPort": String(sg_rule.toPort ? sg_rule.toPort : "")
                });
              }
            });
          } else if (sg_rule.ipRanges && sg_rule.ipRanges.length > 0) {
            ipranges = sg_rule.ipRanges;
            return _.each(ipranges, function(iprange) {
              return new_ruls.push({
                "FromPort": String(sg_rule.fromPort ? sg_rule.fromPort : ""),
                "IpProtocol": String(sg_rule.ipProtocol),
                "IpRanges": iprange.cidrIp,
                "ToPort": String(sg_rule.toPort ? sg_rule.toPort : "")
              });
            });
          }
        };
        _ref = this.getResourceByType("SG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_sg = _ref[_i];
          groupId = aws_sg.attributes.groupId;
          sgComp = this.getOriginalComp(groupId, 'SG');
          if (sgComp) {
            sgRefMap[groupId] = sgComp;
          }
        }
        vpcDefaultSg = null;
        visualopsDefaultSg = null;
        _ref1 = this.getResourceByType("SG");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          aws_sg = _ref1[_j];
          aws_sg = aws_sg.attributes;
          sgRes = {
            "Default": false,
            "GroupDescription": "",
            "GroupId": "",
            "GroupName": "",
            "IpPermissions": [],
            "IpPermissionsEgress": [],
            "VpcId": ""
          };
          sgRes = this._mapProperty(aws_sg, sgRes);
          originSGComp = this.getOriginalComp(aws_sg.id, 'SG');
          if (originSGComp) {
            sgRes.GroupName = originSGComp.resource.GroupName;
          }
          vpcComp = this.getOriginalComp(aws_sg.vpcId, 'VPC');
          if (vpcComp) {
            sgRes.VpcId = CREATE_REF(vpcComp.uid, 'resource.VpcId');
          }
          sgRes.GroupDescription = aws_sg.groupDescription;
          if (aws_sg.ipPermissions) {
            _ref2 = aws_sg.ipPermissions || [];
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              sg_rule = _ref2[_k];
              genRules.call(this, sg_rule, sgRes.IpPermissions);
            }
          }
          if (aws_sg.ipPermissionsEgress) {
            _ref3 = aws_sg.ipPermissionsEgress || [];
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              sg_rule = _ref3[_l];
              genRules.call(this, sg_rule, sgRes.IpPermissionsEgress);
            }
          }
          sgComp = this.add("SG", sgRes, TAG_NAME(aws_sg) || this._removeAppId(aws_sg.groupName));
          if (aws_sg.groupName === "default") {
            vpcDefaultSg = aws_sg;
          } else if (aws_sg.groupName.indexOf("-DefaultSG-app-") !== -1) {
            visualopsDefaultSg = aws_sg;
          }
          this.sgs[aws_sg.id] = sgComp;
        }
        if (visualopsDefaultSg && vpcDefaultSg) {
          defaultSgComp = this.sgs[vpcDefaultSg.id];
          delete this.sgs[vpcDefaultSg.id];
          delete this.component[defaultSgComp.uid];
          vpcDefaultSg = null;
        }
        defaultSg = visualopsDefaultSg || vpcDefaultSg;
        if (defaultSg) {
          defaultSg = this.sgs[defaultSg.id];
        }
        if (defaultSg) {
          defaultSg.name = "DefaultSG";
          defaultSg.resource.Default = true;
        }
        _.each(that.sgs, function(sgComp) {
          _.each(sgComp.resource.IpPermissions, function(rule) {
            var ref, refComp;
            if (rule.IpRanges && rule.IpRanges.indexOf('sg-') === 0) {
              refComp = that.sgs[rule.IpRanges];
              if (refComp) {
                ref = CREATE_REF(refComp, 'resource.GroupId');
                return rule.IpRanges = ref;
              }
            }
          });
          return _.each(sgComp.resource.IpPermissionsEgress, function(rule) {
            var ref, refComp;
            if (rule.IpRanges && rule.IpRanges.indexOf('sg-') === 0) {
              refComp = that.sgs[rule.IpRanges];
              if (refComp) {
                ref = CREATE_REF(refComp, 'resource.GroupId');
                return rule.IpRanges = ref;
              }
            }
          });
        });
      }, function() {
        var aws_vol, az, instance, volComp, volRes, _i, _len, _ref;
        _ref = this.getResourceByType("VOL");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_vol = _ref[_i];
          aws_vol = aws_vol.attributes;
          if (!aws_vol.attachmentSet) {
            continue;
          }
          az = this.azs[aws_vol.availabilityZone];
          volRes = {
            "VolumeId": aws_vol.id,
            "Size": Number(aws_vol.size),
            "SnapshotId": aws_vol.snapshotId ? aws_vol.snapshotId : "",
            "Iops": aws_vol.iops ? aws_vol.iops : "",
            "VolumeType": aws_vol.volumeType,
            "AvailabilityZone": CREATE_REF(az, "resource.ZoneName")
          };
          if (aws_vol.volumeType === 'gp2') {
            volRes.Iops = "";
          }
          if (aws_vol.attachmentSet) {
            instance = this.instances[aws_vol.attachmentSet[0].instanceId];
            if (instance) {
              volRes.AttachmentSet.Device = aws_vol.attachmentSet[0].device;
              volRes.AttachmentSet.InstanceId = CREATE_REF(instance, "resource.InstanceId");
            }
          }
          volComp = this.add("VOL", volRes, aws_vol.attachmentSet[0].device);
          delete this.component[volComp.uid];
          this.volumes[aws_vol.id] = volComp;
        }
      }, function() {
        var aws_asg, aws_ins, azComp, insComp, insRes, me, originComp, rootDeviceAry, subnetComp, vol_in_instance, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        me = this;
        _ref = this.getResourceByType("ASG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_asg = _ref[_i];
          aws_asg = aws_asg.attributes;
          _.each(aws_asg.Instances, function(e, key) {
            return me.ins_in_asg.push(e.InstanceId);
          });
        }
        _ref1 = this.getResourceByType("INSTANCE") || [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          aws_ins = _ref1[_j];
          aws_ins = aws_ins.attributes;
          if (aws_ins.tagSet) {
            if (aws_ins.tagSet['aws:elasticmapreduce:instance-group-role'] && aws_ins.tagSet['aws:elasticmapreduce:job-flow-id']) {
              console.warn("ignore EMR instances");
              continue;
            }
          }
          if ((_ref2 = aws_ins.instanceState.name) === "shutting-down" || _ref2 === "terminated") {
            continue;
          }
          if (_ref3 = aws_ins.id, __indexOf.call(this.ins_in_asg, _ref3) >= 0) {
            continue;
          }
          azComp = this.addAz(aws_ins.placement.availabilityZone);
          subnetComp = this.subnets[aws_ins.subnetId];
          if (!subnetComp) {
            continue;
          }
          insRes = {
            "BlockDeviceMapping": [],
            "DisableApiTermination": false,
            "EbsOptimized": "",
            "ImageId": "",
            "InstanceId": "",
            "InstanceType": "",
            "KeyName": "",
            "Monitoring": "",
            "NetworkInterface": [],
            "Placement": {
              "Tenancy": "",
              "AvailabilityZone": ""
            },
            "SecurityGroup": [],
            "SecurityGroupId": [],
            "ShutdownBehavior": "",
            "SubnetId": "",
            "UserData": {
              "Base64Encoded": false,
              "Data": ""
            },
            "VpcId": ""
          };
          insRes = this._mapProperty(aws_ins, insRes);
          insRes.SubnetId = CREATE_REF(subnetComp, 'resource.SubnetId');
          insRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          insRes.Placement.AvailabilityZone = CREATE_REF(azComp, 'resource.ZoneName');
          insRes.Placement.Tenancy = aws_ins.placement.tenancy;
          if (aws_ins.monitoring && aws_ins.monitoring) {
            insRes.Monitoring = aws_ins.monitoring.state;
          }
          if (aws_ins.placement.tenancy === 'default') {
            insRes.Placement.Tenancy = '';
          }
          if (!aws_ins.shutdownBehavior) {
            insRes.ShutdownBehavior = 'terminate';
          }
          insRes.InstanceId = aws_ins.id;
          insRes.EbsOptimized = aws_ins.ebsOptimized;
          originComp = this.getOriginalComp(aws_ins.id, 'INSTANCE');
          vol_in_instance = [];
          if (aws_ins.rootDeviceType === 'ebs') {
            if (originComp) {
              insRes.BlockDeviceMapping = originComp.resource.BlockDeviceMapping || [];
              insRes.BlockDeviceMapping = _.filter(insRes.BlockDeviceMapping, function(bdm) {
                if (_.isString(bdm)) {
                  return false;
                }
                return true;
              });
            }
            rootDeviceAry = [];
            _.each(aws_ins.blockDeviceMapping, function(bdm) {
              var rootDevice, volume;
              if (aws_ins.rootDeviceName.indexOf(bdm.deviceName) !== -1) {
                volume = me.volumes[bdm.ebs.volumeId];
                if (volume) {
                  rootDevice = {
                    DeviceName: bdm.deviceName,
                    Ebs: {
                      SnapshotId: volume.resource.SnapshotId,
                      VolumeSize: volume.resource.Size,
                      VolumeType: volume.resource.VolumeType
                    }
                  };
                  if (volume.resource.VolumeType === 'io1') {
                    rootDevice.Ebs.Iops = volume.resource.Iops;
                  }
                  return rootDeviceAry.push(rootDevice);
                }
              }
            });
            if (insRes.BlockDeviceMapping.length !== rootDeviceAry.length) {
              insRes.BlockDeviceMapping = rootDeviceAry;
            }
          }
          _.each(aws_ins.blockDeviceMapping || [], function(bdm) {
            var volComp;
            if (aws_ins.rootDeviceType === 'instance-store' || aws_ins.rootDeviceName.indexOf(bdm.deviceName) === -1) {
              volComp = me.volumes[bdm.ebs.volumeId];
              if (volComp) {
                me.component[volComp.uid] = volComp;
                return vol_in_instance.push(volComp.uid);
              }
            }
          });
          insComp = this.add("INSTANCE", insRes, TAG_NAME(aws_ins));
          _.each(vol_in_instance, function(e, key) {
            var volComp;
            volComp = me.component[e];
            if (volComp) {
              if (!volComp.resource.AttachmentSet) {
                volComp.resource.AttachmentSet = {};
              }
              return volComp.resource.AttachmentSet.InstanceId = CREATE_REF(insComp, "resource.InstanceId");
            }
          });
          this.addLayout(insComp, false, subnetComp);
          this.instances[aws_ins.id] = insComp;
        }
      }, function() {
        var aws_eni, azComp, eniComp, eniRes, group, insComp, ip, subnetComp, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
        _ref = this.getResourceByType("ENI") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_eni = _ref[_i];
          aws_eni = aws_eni.attributes;
          azComp = this.addAz(aws_eni.availabilityZone);
          subnetComp = this.subnets[aws_eni.subnetId];
          if (!subnetComp) {
            continue;
          }
          eniRes = {
            "AssociatePublicIpAddress": false,
            "Attachment": {
              "AttachmentId": "",
              "DeviceIndex": "1",
              "InstanceId": ""
            },
            "AvailabilityZone": "",
            "Description": "",
            "GroupSet": [],
            "NetworkInterfaceId": "",
            "PrivateIpAddressSet": [],
            "SourceDestCheck": true,
            "SubnetId": "",
            "VpcId": ""
          };
          if (aws_eni.attachment && aws_eni.attachment.instanceOwnerId && ((_ref1 = aws_eni.attachment.instanceOwnerId) === "amazon-elb" || _ref1 === "amazon-rds")) {
            continue;
          }
          eniRes = this._mapProperty(aws_eni, eniRes);
          if (aws_eni.association && aws_eni.association.publicIp) {
            eniRes.AssociatePublicIpAddress = true;
          }
          eniRes.NetworkInterfaceId = aws_eni.id;
          eniRes.AvailabilityZone = CREATE_REF(azComp, 'resource.ZoneName');
          eniRes.SubnetId = CREATE_REF(subnetComp, 'resource.SubnetId');
          eniRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          if (aws_eni.attachment) {
            if (!((_ref2 = aws_eni.attachment.deviceIndex) === "0" || _ref2 === 0)) {
              eniRes.Attachment.AttachmentId = aws_eni.attachment.attachmentId;
            }
            insComp = this.instances[aws_eni.attachment.instanceId];
            if (insComp) {
              eniRes.Attachment.InstanceId = CREATE_REF(insComp, 'resource.InstanceId');
              eniRes.Attachment.DeviceIndex = String(aws_eni.attachment.deviceIndex === 0 ? '0' : aws_eni.attachment.deviceIndex);
            }
          }
          _ref3 = aws_eni.privateIpAddressesSet;
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            ip = _ref3[_j];
            eniRes.PrivateIpAddressSet.push({
              "PrivateIpAddress": ip.privateIpAddress,
              "AutoAssign": false,
              "Primary": ip.primary
            });
          }
          _ref4 = aws_eni.groupSet;
          for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
            group = _ref4[_k];
            eniRes.GroupSet.push({
              "GroupId": CREATE_REF(this.sgs[group.groupId], 'resource.GroupId'),
              "GroupName": CREATE_REF(this.sgs[group.groupId], 'resource.GroupName')
            });
          }
          eniComp = this.add("ENI", eniRes, TAG_NAME(aws_eni));
          this.enis[aws_eni.id] = eniComp;
          if (!aws_eni.attachment || !((_ref5 = aws_eni.attachment.deviceIndex) === "0" || _ref5 === 0)) {
            this.addLayout(eniComp, false, subnetComp);
          }
        }
      }, function() {
        var aws_eip, eipComp, eipRes, eni, idx, ip, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.getResourceByType("EIP");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_eip = _ref[_i];
          aws_eip = aws_eip.attributes;
          eni = this.enis[aws_eip.networkInterfaceId];
          if (!eni) {
            continue;
          }
          eipRes = {
            "AllocationId": aws_eip.id,
            "Domain": aws_eip.domain,
            "InstanceId": "",
            "NetworkInterfaceId": CREATE_REF(eni, "resource.NetworkInterfaceId"),
            "PrivateIpAddress": "",
            "PublicIp": aws_eip.publicIp
          };
          idx = 0;
          _ref1 = eni.resource.PrivateIpAddressSet;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ip = _ref1[_j];
            if (ip.PrivateIpAddress === aws_eip.privateIpAddress) {
              eipRes.PrivateIpAddress = CREATE_REF(eni, "resource.PrivateIpAddressSet." + idx + ".PrivateIpAddress");
            }
            idx++;
          }
          eipComp = this.add("EIP", eipRes);
        }
      }, function() {
        var asso, aws_rtb, eniComp, gwComp, i, insComp, route, rtbComp, rtbRes, subnetComp, xgw_in_route, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        _ref = this.getResourceByType("RT") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_rtb = _ref[_i];
          aws_rtb = aws_rtb.attributes;
          rtbRes = {
            "AssociationSet": [],
            "PropagatingVgwSet": [],
            "RouteSet": [],
            "RouteTableId": aws_rtb.id,
            "VpcId": CREATE_REF(this.theVpc, 'resource.VpcId')
          };
          _ref1 = aws_rtb.associationSet;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            i = _ref1[_j];
            asso = {
              Main: i.main === false ? false : "true",
              RouteTableAssociationId: "",
              SubnetId: ""
            };
            if (!asso.Main) {
              asso.RouteTableAssociationId = i.routeTableAssociationId;
              subnetComp = this.subnets[i.subnetId];
              if (i.subnetId && subnetComp) {
                asso.SubnetId = CREATE_REF(subnetComp, 'resource.SubnetId');
              }
            }
            rtbRes.AssociationSet.push(asso);
          }
          xgw_in_route = {};
          _ref2 = aws_rtb.routeSet;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            i = _ref2[_k];
            if (i.state !== "active") {
              continue;
            }
            if (i.origin && i.origin === "EnableVgwRoutePropagation") {
              continue;
            }
            insComp = this.instances[i.instanceId];
            eniComp = this.enis[i.networkInterfaceId];
            gwComp = this.gateways[i.gatewayId];
            route = {
              "DestinationCidrBlock": i.destinationCidrBlock,
              "GatewayId": "",
              "InstanceId": "",
              "NetworkInterfaceId": i.networkInterfaceId && eniComp ? CREATE_REF(eniComp, 'resource.NetworkInterfaceId') : "",
              "Origin": i.gatewayId === "local" ? i.origin : ""
            };
            if (i.gatewayId) {
              xgw_in_route[i.gatewayId] = true;
              if (i.gatewayId !== "local" && gwComp) {
                if (gwComp.type === "AWS.VPC.VPNGateway") {
                  route.GatewayId = CREATE_REF(gwComp, 'resource.VpnGatewayId');
                } else if (gwComp.type === "AWS.VPC.InternetGateway") {
                  route.GatewayId = CREATE_REF(gwComp, 'resource.InternetGatewayId');
                }
              } else {
                route.GatewayId = i.gatewayId;
              }
            }
            rtbRes.RouteSet.push(route);
          }
          _ref3 = aws_rtb.propagatingVgwSet;
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            i = _ref3[_l];
            gwComp = this.gateways[i.gatewayId];
            if (gwComp && xgw_in_route[i.gatewayId]) {
              rtbRes.PropagatingVgwSet.push(CREATE_REF(gwComp, 'resource.VpnGatewayId'));
            }
          }
          rtbComp = this.add("RT", rtbRes, TAG_NAME(aws_rtb));
          this.addLayout(rtbComp, true, this.theVpc);
        }
      }, function() {
        var acl, aclComp, aclName, aclRes, aws_acl, egress, originComp, subnetComp, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
        _ref = this.getResourceByType("ACL") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_acl = _ref[_i];
          aws_acl = aws_acl.attributes;
          aclRes = {
            "AssociationSet": [],
            "Default": false,
            "EntrySet": [],
            "NetworkAclId": "",
            "VpcId": ""
          };
          aclRes = this._mapProperty(aws_acl, aclRes);
          aclRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          aclRes.NetworkAclId = aws_acl.id;
          if (aws_acl["default"]) {
            aclRes.Default = aws_acl["default"];
            aclName = "DefaultACL";
          } else {
            aclName = TAG_NAME(aws_acl);
          }
          _ref1 = aws_acl.entries;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            acl = _ref1[_j];
            egress = acl.egress;
            if (_.isString(egress)) {
              if (egress === 'true') {
                egress = true;
              } else {
                egress = false;
              }
            }
            aclRes.EntrySet.push({
              "RuleAction": acl.ruleAction,
              "Protocol": Number(acl.protocol),
              "CidrBlock": acl.cidrBlock,
              "Egress": acl.egress,
              "IcmpTypeCode": {
                "Type": acl.icmpTypeCode ? String(acl.icmpTypeCode.type) : "",
                "Code": acl.icmpTypeCode ? String(acl.icmpTypeCode.code) : ""
              },
              "PortRange": {
                "To": acl.portRange ? String(acl.portRange.to) : "",
                "From": acl.portRange ? String(acl.portRange.from) : ""
              },
              "RuleNumber": acl.ruleNumber
            });
          }
          _ref2 = aws_acl.associationSet;
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            acl = _ref2[_k];
            subnetComp = this.subnets[acl.subnetId];
            if (!subnetComp) {
              continue;
            }
            aclRes.AssociationSet.push({
              "NetworkAclAssociationId": acl.networkAclAssociationId,
              "SubnetId": CREATE_REF(subnetComp, 'resource.SubnetId')
            });
          }
          originComp = this.getOriginalComp(aws_acl.id, "ACL");
          if (originComp && originComp.resource.AssociationSet.sort().toString() === aclRes.AssociationSet.sort().toString()) {
            aclRes.AssociationSet = jQuery.extend(true, [], originComp.resource.AssociationSet);
          }
          aclComp = this.add("ACL", aclRes, aclName);
        }
      }, function() {
        var aws_elb, data, elbComp, elbRes, iamComp, instanceId, listener, me, originComp, sgId, sslCertRef, subnetId, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
        me = this;
        _ref = this.getResourceByType("ELB") || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_elb = _ref[_i];
          aws_elb = aws_elb.attributes;
          elbRes = {
            "HealthCheck": {
              "Timeout": "",
              "Target": "",
              "HealthyThreshold": "",
              "UnhealthyThreshold": "",
              "Interval": ""
            },
            "Policies": {
              "AppCookieStickinessPolicies": [
                {
                  CookieName: '',
                  PolicyName: ''
                }
              ],
              "OtherPolicies": [],
              "LBCookieStickinessPolicies": [
                {
                  CookieExpirationPeriod: '',
                  PolicyName: ''
                }
              ]
            },
            "BackendServerDescriptions": [
              {
                InstantPort: "",
                PoliciyNames: ""
              }
            ],
            "SecurityGroups": [],
            "ListenerDescriptions": [],
            "DNSName": "",
            "Scheme": "",
            "Instances": [],
            "Subnets": [],
            "VpcId": "",
            "LoadBalancerName": "",
            "AvailabilityZones": [],
            "CrossZoneLoadBalancing": "",
            "ConnectionDraining": {
              "Enabled": false,
              "Timeout": null
            },
            "ConnectionSettings": {
              "IdleTimeout": 60
            }
          };
          elbRes = this._mapProperty(aws_elb, elbRes);
          originComp = this.getOriginalComp(aws_elb.Name, 'ELB');
          elbRes.ConnectionDraining.Enabled = aws_elb.ConnectionDraining.Enabled;
          elbRes.ConnectionSettings.IdleTimeout = Number(aws_elb.ConnectionSettings.IdleTimeout);
          if (originComp) {
            elbRes.ConnectionDraining.Timeout = originComp.resource.ConnectionDraining.Timeout;
          } else {
            if (aws_elb.ConnectionDraining.Enabled) {
              elbRes.ConnectionDraining.Timeout = Number(aws_elb.ConnectionDraining.Timeout);
            }
          }
          if (aws_elb.SecurityGroups) {
            _ref1 = aws_elb.SecurityGroups;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              sgId = _ref1[_j];
              elbRes.SecurityGroups.push(CREATE_REF(this.sgs[sgId], 'resource.GroupId'));
            }
          }
          elbRes.VpcId = CREATE_REF(this.theVpc, 'resource.VpcId');
          if (aws_elb.Subnets) {
            _ref2 = aws_elb.Subnets;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              subnetId = _ref2[_k];
              elbRes.Subnets.push(CREATE_REF(this.subnets[subnetId], 'resource.SubnetId'));
            }
          }
          elbRes.DNSName = aws_elb.Dnsname;
          elbRes.CrossZoneLoadBalancing = aws_elb.CrossZoneLoadBalancing.Enabled;
          if (aws_elb.ListenerDescriptions) {
            _ref3 = aws_elb.ListenerDescriptions;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              listener = _ref3[_l];
              sslCertRef = '';
              if (listener.Listener.SslcertificateId) {
                iamComp = this.addIAM(listener.Listener.SslcertificateId);
                if (iamComp) {
                  sslCertRef = CREATE_REF(iamComp, 'resource.ServerCertificateMetadata.Arn');
                }
              } else {
                listener.Listener.SslcertificateId = "";
              }
              data = {
                "PolicyNames": '',
                "Listener": {
                  "LoadBalancerPort": listener.Listener.LoadBalancerPort,
                  "InstanceProtocol": listener.Listener.InstanceProtocol,
                  "Protocol": listener.Listener.Protocol,
                  "SSLCertificateId": sslCertRef || listener.Listener.SslcertificateId,
                  "InstancePort": listener.Listener.InstancePort
                }
              };
              elbRes.ListenerDescriptions.push(data);
            }
          }
          elbRes.HealthCheck = aws_elb.HealthCheck;
          if (aws_elb.Instances) {
            _ref4 = aws_elb.Instances;
            for (_m = 0, _len4 = _ref4.length; _m < _len4; _m++) {
              instanceId = _ref4[_m];
              if (!(__indexOf.call(me.ins_in_asg, instanceId) >= 0)) {
                if (this.instances[instanceId]) {
                  elbRes.Instances.push({
                    InstanceId: CREATE_REF(this.instances[instanceId], 'resource.InstanceId')
                  });
                }
              }
            }
          }
          elbComp = this.add("ELB", elbRes, aws_elb.Name);
          this.addLayout(elbComp, false, this.theVpc);
          this.elbs[aws_elb.Name] = elbComp;
        }
      }, function() {
        var aws_lc, bdm, keyPairComp, lcComp, lcRes, me, originComp, sg, _i, _len, _ref;
        me = this;
        _ref = this.getResourceByType('LC');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_lc = _ref[_i];
          aws_lc = aws_lc.attributes;
          lcRes = {
            "AssociatePublicIpAddress": false,
            "BlockDeviceMapping": [],
            "EbsOptimized": false,
            "ImageId": "",
            "InstanceMonitoring": false,
            "InstanceType": "",
            "KeyName": "",
            "LaunchConfigurationARN": "",
            "LaunchConfigurationName": "",
            "SecurityGroups": [],
            "UserData": ""
          };
          lcRes = this._mapProperty(aws_lc, lcRes);
          lcRes.LaunchConfigurationARN = aws_lc.id;
          lcRes.LaunchConfigurationName = aws_lc.Name;
          lcRes.InstanceMonitoring = aws_lc.InstanceMonitoring.Enabled;
          if (aws_lc.UserData && (typeof Base64 !== "undefined" && Base64 !== null ? Base64.decode : void 0)) {
            lcRes.UserData = Base64.decode(aws_lc.UserData);
          }
          sg = [];
          _.each(aws_lc.SecurityGroups, function(e, key) {
            var sgComp;
            sgComp = me.sgs[e];
            if (sgComp) {
              return sg.push(CREATE_REF(sgComp, "resource.GroupId"));
            }
          });
          if (sg.length === 0) {
            continue;
          }
          lcRes.SecurityGroups = sg;
          bdm = lcRes.BlockDeviceMapping;
          _.each(aws_lc.BlockDeviceMapping || [], function(e, key) {
            var data;
            if (e.Ebs === null && e.VirtualName) {
              return data = {
                "DeviceName": e.DeviceName,
                "Ebs": null,
                "NoDevice": e.NoDevice,
                "VirtualName": e.VirtualName
              };
            } else {
              data = {
                "DeviceName": e.DeviceName,
                "Ebs": {
                  "VolumeSize": e.Ebs ? Number(e.Ebs.VolumeSize) : 0,
                  "VolumeType": e.Ebs ? e.Ebs.VolumeType : ""
                }
              };
              if (e.Ebs) {
                if (e.Ebs.SnapshotId) {
                  data.Ebs.SnapshotId = e.Ebs.SnapshotId;
                }
                if (data.Ebs.VolumeType === "io1") {
                  data.Ebs.Iops = e.Ebs.Iops;
                }
              }
              return bdm.push(data);
            }
          });
          keyPairComp = this.getOriginalComp(aws_lc.KeyName, 'KP');
          if (!keyPairComp) {
            if (aws_lc.KeyName) {
              lcRes.KeyName = aws_lc.KeyName;
            }
          } else {
            originComp = this.getOriginalComp(aws_lc.id, 'LC');
            if (originComp) {
              lcRes.KeyName = originComp.resource.KeyName;
            } else {
              lcRes.KeyName = CREATE_REF(keyPairComp, "resource.KeyName");
            }
          }
          lcComp = this.add("LC", lcRes, aws_lc.Name);
          this.addLayout(lcComp);
          delete this.component[aws_lc.id];
          this.lcs[aws_lc.Name] = lcComp;
        }
      }, function() {
        var addOriginal, asgComp, asgRes, aws_asg, az, elb, me, origSubnetComp, origSubnetLayout, originASGComp, vpcZoneIdentifier, _i, _len, _ref;
        me = this;
        _ref = this.getResourceByType("ASG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_asg = _ref[_i];
          aws_asg = aws_asg.attributes;
          if (!this.lcs[aws_asg.LaunchConfigurationName]) {
            continue;
          }
          asgRes = {
            "AutoScalingGroupARN": "",
            "AutoScalingGroupName": "",
            "AvailabilityZones": [],
            "DefaultCooldown": "0",
            "DesiredCapacity": "0",
            "HealthCheckGracePeriod": "0",
            "HealthCheckType": "",
            "LaunchConfigurationName": "",
            "LoadBalancerNames": [],
            "MaxSize": "0",
            "MinSize": "0",
            "TerminationPolicies": [],
            "VPCZoneIdentifier": ""
          };
          asgRes = this._mapProperty(aws_asg, asgRes);
          originASGComp = this.getOriginalComp(aws_asg.id, 'ASG');
          asgRes.AutoScalingGroupARN = aws_asg.id;
          asgRes.AutoScalingGroupName = aws_asg.Name;
          asgRes.TerminationPolicies = aws_asg.TerminationPolicies;
          asgRes.LaunchConfigurationName = CREATE_REF(this.lcs[aws_asg.LaunchConfigurationName], "resource.LaunchConfigurationName");
          vpcZoneIdentifier = [];
          _.each(aws_asg.Subnets, function(e, key) {
            var subnetComp;
            subnetComp = me.subnets[e];
            if (subnetComp) {
              return vpcZoneIdentifier.push(CREATE_REF(subnetComp, "resource.SubnetId"));
            }
          });
          if (vpcZoneIdentifier.length === 0) {
            continue;
          }
          asgRes.VPCZoneIdentifier = vpcZoneIdentifier.join(" , ");
          elb = [];
          _.each(aws_asg.LoadBalancerNames, function(e, key) {
            var elbComp;
            elbComp = me.elbs[e];
            return elb.push(CREATE_REF(elbComp, "resource.LoadBalancerName"));
          });
          asgRes.LoadBalancerNames = elb;
          az = [];
          _.each(aws_asg.AvailabilityZones, function(e, key) {
            var azComp;
            azComp = me.addAz(e);
            return az.push(CREATE_REF(azComp, "resource.ZoneName"));
          });
          asgRes.AvailabilityZones = az;
          asgComp = this.add("ASG", asgRes, TAG_NAME(aws_asg) || aws_asg.Name);
          origSubnetComp = "";
          origSubnetLayout = this.originalJson.layout[asgComp.uid];
          addOriginal = false;
          _.each(aws_asg.Subnets, function(e, key) {
            var subnetComp;
            subnetComp = me.subnets[e];
            if ((!addOriginal) && ((origSubnetLayout && origSubnetLayout.groupUId === subnetComp.uid) || (!origSubnetLayout))) {
              me.addLayout(asgComp, true, subnetComp);
              return addOriginal = true;
            } else {
              return me.addExpandedAsg(asgComp, subnetComp);
            }
          });
          this.asgs[aws_asg.Name] = asgComp;
        }
      }, function() {
        var asgComp, aws_nc, ncComp, ncRes, topicComp, _i, _len, _ref;
        _ref = this.getResourceByType("NC");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_nc = _ref[_i];
          aws_nc = aws_nc.attributes;
          ncRes = {
            "AutoScalingGroupName": aws_nc.AutoScalingGroupName,
            "NotificationType": aws_nc.NotificationType,
            "TopicARN": aws_nc.TopicARN
          };
          asgComp = this.asgs[ncRes.AutoScalingGroupName];
          if (asgComp) {
            ncRes.AutoScalingGroupName = CREATE_REF(asgComp, 'resource.AutoScalingGroupName');
          } else {
            continue;
          }
          topicComp = _.first(_.filter(this.originalJson.component, function(com) {
            if (com.type === constant.RESTYPE.TOPIC) {
              return com.resource.TopicArn === ncRes.TopicARN;
            }
          }));
          if (topicComp) {
            ncRes.TopicARN = CREATE_REF(topicComp, 'resource.TopicArn');
          } else {
            topicComp = this.addTopic(ncRes.TopicARN);
            if (topicComp) {
              ncRes.TopicARN = CREATE_REF(topicComp, 'resource.TopicArn');
            }
          }
          ncComp = this.add("NC", ncRes, "SnsNotification");
        }
      }, function() {
        var asgComp, aws_sp, spComp, spRes, _i, _len, _ref;
        _ref = this.getResourceByType("SP");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_sp = _ref[_i];
          aws_sp = aws_sp.attributes;
          spRes = {
            "AdjustmentType": "",
            "AutoScalingGroupName": "",
            "Cooldown": "0",
            "MinAdjustmentStep": "",
            "PolicyARN": "",
            "PolicyName": "",
            "ScalingAdjustment": ""
          };
          spRes = this._mapProperty(aws_sp, spRes);
          if (aws_sp.Cooldown === "") {
            spRes.Cooldown = "0";
          }
          asgComp = this.asgs[aws_sp.AutoScalingGroupName];
          if (spRes.ScalingAdjustment) {
            spRes.ScalingAdjustment = String(spRes.ScalingAdjustment);
          }
          if (asgComp) {
            spRes.AutoScalingGroupName = CREATE_REF(asgComp, 'resource.AutoScalingGroupName');
          } else {
            continue;
          }
          spRes.PolicyARN = aws_sp.id;
          spRes.PolicyName = aws_sp.Name;
          spComp = this.add("SP", spRes, aws_sp.Name);
          this.sps[aws_sp.id] = spComp;
        }
      }, function() {
        var alarmActionAry, aws_cw, cwComp, cwRes, dimension, hasSP, me, okActionAry, reg_sp, reg_topic, validAlarmAction, _i, _len, _ref;
        me = this;
        _ref = this.getResourceByType("CW");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_cw = _ref[_i];
          aws_cw = aws_cw.attributes;
          cwRes = {
            "AlarmActions": [],
            "AlarmArn": "",
            "AlarmName": "",
            "ComparisonOperator": "",
            "Dimensions": [],
            "EvaluationPeriods": "",
            "InsufficientDataActions": [],
            "MetricName": "",
            "Namespace": "",
            "OKAction": [],
            "Period": 0,
            "Statistic": "",
            "Threshold": "",
            "Unit": ""
          };
          cwRes = this._mapProperty(aws_cw, cwRes);
          dimension = [];
          _.each(aws_cw.Dimensions, function(e, key) {
            var asgComp, data;
            if (e.Name === "AutoScalingGroupName") {
              asgComp = me.asgs[e.Value];
              if (asgComp) {
                data = {
                  "name": e.Name,
                  "value": CREATE_REF(asgComp, "resource.AutoScalingGroupName")
                };
                return dimension.push(data);
              }
            }
          });
          if (dimension.length === 0) {
            continue;
          }
          cwRes.Dimensions = dimension;
          reg_sp = /arn:aws:autoscaling:.*:scalingPolicy:/g;
          reg_topic = /arn:aws:sns:.*:.*/g;
          validAlarmAction = [];
          hasSP = false;
          _.each(aws_cw.AlarmActions, function(e, key) {
            var spComp, topicComp;
            if (e.match(reg_topic)) {
              topicComp = me.addTopic(e);
              if (topicComp) {
                return validAlarmAction.push(e);
              }
            } else if (e.match(reg_sp)) {
              spComp = me.sps[e];
              if (spComp) {
                hasSP = true;
                return validAlarmAction.push(e);
              }
            }
          });
          if (!hasSP) {
            continue;
          }
          alarmActionAry = [];
          _.each(validAlarmAction, function(e, key) {
            var spComp, topicComp;
            if (e.match(reg_topic)) {
              topicComp = me.addTopic(e);
              if (topicComp) {
                return alarmActionAry.push(CREATE_REF(topicComp, "resource.TopicArn"));
              }
            } else if (e.match(reg_sp)) {
              spComp = me.sps[e];
              if (spComp) {
                return alarmActionAry.push(CREATE_REF(spComp, "resource.PolicyARN"));
              }
            }
          });
          cwRes.AlarmActions = alarmActionAry;
          okActionAry = [];
          _.each(aws_cw.Okactions, function(e, key) {
            var spComp;
            if (e.match(reg_sp)) {
              spComp = me.sps[e];
              if (spComp) {
                return okActionAry.push(CREATE_REF(spComp, "resource.PolicyARN"));
              }
            }
          });
          cwRes.OKAction = okActionAry;
          cwRes.Threshold = String(aws_cw.Threshold);
          cwRes.EvaluationPeriods = String(aws_cw.EvaluationPeriods);
          if (aws_cw.ComparisonOperator) {
            cwRes.ComparisonOperator = this.COMPARISONOPERATOR[aws_cw.ComparisonOperator];
          }
          cwRes.AlarmArn = aws_cw.id;
          cwRes.AlarmName = aws_cw.Name;
          cwComp = this.add("CW", cwRes, aws_cw.Name);
        }
      }, function() {
        var aws_og, compName, ogComp, ogRes, op, op_item, originComp, set, set_item, sg, sgComp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
        _ref = this.getResourceByType("DBOG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_og = _ref[_i];
          aws_og = aws_og.attributes;
          if (aws_og.OptionGroupName.indexOf("default:") === 0) {
            console.warn("skip default OptionGroup " + aws_og.OptionGroupName);
            continue;
          }
          ogRes = {
            "CreatedBy": "",
            "EngineName": "",
            "MajorEngineVersion": "",
            "OptionGroupDescription": "",
            "OptionGroupName": "",
            "Options": [],
            "VpcId": ""
          };
          ogRes = this._mapProperty(aws_og, ogRes);
          ogRes.OptionGroupName = aws_og.id;
          ogRes.VpcId = CREATE_REF(this.theVpc, "resource.VpcId");
          _ref1 = aws_og.Options || [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            op = _ref1[_j];
            op_item = this._mapProperty(op, {
              "OptionName": "",
              "OptionSettings": [],
              "Port": "",
              "VpcSecurityGroupMemberships": []
            });
            op_item.Port = op_item.Port ? op_item.Port.toString() : "";
            _ref2 = op.OptionSettings;
            for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
              set = _ref2[_k];
              set_item = this._mapProperty(set, {
                "Name": "",
                "Value": ""
              });
              op_item.OptionSettings.push(set_item);
            }
            _ref3 = op.VpcSecurityGroupMemberships;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              sg = _ref3[_l];
              sgComp = this.sgs[sg.VpcSecurityGroupId];
              if (sgComp) {
                op_item.VpcSecurityGroupMemberships.push(CREATE_REF(sgComp, "resource.GroupId"));
              } else {
                console.error("can not find SG " + sg.VpcSecurityGroupId + " for OptionGroup");
              }
            }
            ogRes.Options.push(op_item);
          }
          originComp = this.getOriginalComp(aws_og.id, 'DBOG');
          if (originComp) {
            compName = originComp.name;
            ogRes.CreatedBy = originComp.resource.CreatedBy;
          } else {
            compName = aws_og.OptionGroupName;
            ogRes.CreatedBy = 'user';
            console.error("[temp]can not find original component");
          }
          ogComp = this.add("DBOG", ogRes, compName);
          this.ogs[aws_og.id] = ogComp;
        }
      }, function() {
        var aws_sbg, compName, originComp, sbgComp, sbgRes, subnet, subnetComp, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.getResourceByType("DBSBG");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_sbg = _ref[_i];
          aws_sbg = aws_sbg.attributes;
          sbgRes = {
            "CreatedBy": "",
            "DBSubnetGroupName": "",
            "SubnetIds": [],
            "DBSubnetGroupDescription": ""
          };
          sbgRes = this._mapProperty(aws_sbg, sbgRes);
          sbgRes.DBSubnetGroupName = aws_sbg.id;
          _ref1 = aws_sbg.Subnets;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            subnet = _ref1[_j];
            subnetComp = this.subnets[subnet.SubnetIdentifier];
            sbgRes.SubnetIds.push(CREATE_REF(subnetComp, "resource.SubnetId"));
          }
          originComp = this.getOriginalComp(aws_sbg.id, 'DBSBG');
          if (originComp) {
            compName = originComp.name;
            sbgRes.CreatedBy = originComp.resource.CreatedBy;
            if (sbgRes.SubnetIds.sort().toString() === originComp.resource.SubnetIds.sort().toString()) {
              sbgRes.SubnetIds = jQuery.extend(true, [], originComp.resource.SubnetIds);
            }
          } else {
            compName = aws_sbg.DBSubnetGroupName;
            sbgRes.CreatedBy = 'user';
          }
          sbgComp = this.add("DBSBG", sbgRes, TAG_NAME(aws_sbg) || compName);
          this.addLayout(sbgComp, true, this.theVpc);
          this.sbgs[aws_sbg.id] = sbgComp;
        }
      }, function() {
        var aws_dbins, compName, dbInsComp, dbInsRes, dbinsAry, ogComp, originComp, sbgComp, sg, sgComp, srcDbInsComp, subnetComp, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        dbinsAry = [];
        _ref = this.getResourceByType("DBINSTANCE");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          aws_dbins = _ref[_i];
          aws_dbins = aws_dbins.attributes;
          if (aws_dbins.ReadReplicaSourceDBInstanceIdentifier) {
            dbinsAry.push(aws_dbins);
          } else {
            dbinsAry.unshift(aws_dbins);
          }
        }
        for (_j = 0, _len1 = dbinsAry.length; _j < _len1; _j++) {
          aws_dbins = dbinsAry[_j];
          subnetComp = this.sbgs[aws_dbins.sbgId];
          if (!subnetComp) {
            console.warn("can not found subnet of DBInstance");
            continue;
          }
          sbgComp = this.sbgs[aws_dbins.DBSubnetGroup.DBSubnetGroupName];
          if (!sbgComp) {
            console.warn("can not found DBSubnetGroup of DBInstance");
            continue;
          }
          dbInsRes = {
            "CreatedBy": "",
            "DBInstanceIdentifier": "",
            "DBSnapshotIdentifier": "",
            "AllocatedStorage": 0,
            "AutoMinorVersionUpgrade": false,
            "AvailabilityZone": "",
            "MultiAZ": false,
            "Iops": "",
            "BackupRetentionPeriod": 0,
            "CharacterSetName": "",
            "DBInstanceClass": "",
            "DBName": "",
            "Endpoint": {
              "Port": 0
            },
            "Engine": "",
            "EngineVersion": "",
            "LicenseModel": "",
            "MasterUsername": "",
            "MasterUserPassword": "",
            "OptionGroupMembership": {
              "OptionGroupName": ""
            },
            "DBParameterGroups": {
              "DBParameterGroupName": ""
            },
            "PendingModifiedValues": "",
            "PreferredBackupWindow": "",
            "PreferredMaintenanceWindow": "",
            "PubliclyAccessible": false,
            "DBSubnetGroup": {
              "DBSubnetGroupName": ""
            },
            "VpcSecurityGroupIds": []
          };
          dbInsRes = this._mapProperty(aws_dbins, dbInsRes);
          if (aws_dbins.PendingModifiedValues) {
            if (aws_dbins.PendingModifiedValues.AllocatedStorage) {
              dbInsRes.AllocatedStorage = Number(aws_dbins.PendingModifiedValues.AllocatedStorage);
            }
            if (aws_dbins.PendingModifiedValues.BackupRetentionPeriod) {
              dbInsRes.BackupRetentionPeriod = Number(aws_dbins.PendingModifiedValues.BackupRetentionPeriod);
            }
            if (aws_dbins.PendingModifiedValues.DBInstanceClass) {
              dbInsRes.DBInstanceClass = aws_dbins.PendingModifiedValues.DBInstanceClass;
            }
            if (aws_dbins.PendingModifiedValues.Iops) {
              dbInsRes.Iops = Number(aws_dbins.PendingModifiedValues.Iops);
            }
            if (aws_dbins.PendingModifiedValues.MultiAZ) {
              dbInsRes.MultiAZ = aws_dbins.PendingModifiedValues.MultiAZ;
            }
            if (aws_dbins.PendingModifiedValues.MasterUserPassword) {
              dbInsRes.MasterUserPassword = aws_dbins.PendingModifiedValues.MasterUserPassword;
            }
          }
          if (dbInsRes.MultiAZ) {
            dbInsRes.AvailabilityZone = "";
          }
          if (aws_dbins.ReadReplicaSourceDBInstanceIdentifier) {
            srcDbInsComp = this.dbinstances[aws_dbins.ReadReplicaSourceDBInstanceIdentifier];
            if (srcDbInsComp) {
              dbInsRes.ReadReplicaSourceDBInstanceIdentifier = CREATE_REF(srcDbInsComp, "resource.DBInstanceIdentifier");
            } else {
              console.error("can not find Source DBInstance for ReadReplica " + aws_dbins.ReadReplicaSourceDBInstanceIdentifier);
            }
          }
          if (aws_dbins.Endpoint) {
            dbInsRes.Endpoint.Port = aws_dbins.Endpoint.Port;
          }
          if (aws_dbins.OptionGroupMemberships[0]) {
            ogComp = this.ogs[aws_dbins.OptionGroupMemberships[0].OptionGroupName];
            if (ogComp) {
              dbInsRes.OptionGroupMembership.OptionGroupName = CREATE_REF(ogComp, "resource.OptionGroupName");
            } else {
              dbInsRes.OptionGroupMembership.OptionGroupName = aws_dbins.OptionGroupMemberships[0].OptionGroupName;
              if (aws_dbins.OptionGroupMemberships[0].OptionGroupName.indexOf("default:") !== 0) {
                console.warn("can not find OptionGroup " + aws_dbins.OptionGroupMemberships[0].OptionGroupName + " for DBInstance");
              }
            }
          }
          if (aws_dbins.DBParameterGroups[0]) {
            dbInsRes.DBParameterGroups.DBParameterGroupName = aws_dbins.DBParameterGroups[0].DBParameterGroupName;
          }
          dbInsRes.DBSubnetGroup.DBSubnetGroupName = CREATE_REF(sbgComp, "resource.DBSubnetGroupName");
          _ref1 = aws_dbins.VpcSecurityGroups;
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            sg = _ref1[_k];
            sgComp = this.sgs[sg.VpcSecurityGroupId];
            if (sgComp) {
              dbInsRes.VpcSecurityGroupIds.push(CREATE_REF(sgComp, "resource.GroupId"));
            } else {
              console.warn("can not found component for SG " + sg.VpcSecurityGroupId);
            }
          }
          originComp = this.getOriginalComp(aws_dbins.id, 'DBINSTANCE');
          if (originComp) {
            compName = originComp.name;
            dbInsRes.CreatedBy = originComp.resource.CreatedBy;
            if (!aws_dbins.Endpoint) {
              dbInsRes.Endpoint.Port = originComp.resource.Endpoint.Port;
            }
            if (!originComp.resource.PreferredBackupWindow) {
              dbInsRes.PreferredBackupWindow = originComp.resource.PreferredBackupWindow;
            }
            if (!originComp.resource.PreferredMaintenanceWindow) {
              dbInsRes.PreferredMaintenanceWindow = originComp.resource.PreferredMaintenanceWindow;
            }
            dbInsRes.MasterUserPassword = originComp.resource.MasterUserPassword;
            dbInsRes.DBSnapshotIdentifier = originComp.resource.DBSnapshotIdentifier;
          } else {
            compName = aws_dbins.Name || aws_dbins.DBInstanceIdentifier;
            dbInsRes.CreatedBy = 'user';
          }
          dbInsComp = this.add("DBINSTANCE", dbInsRes, TAG_NAME(aws_dbins) || compName);
          this.addLayout(dbInsComp, false, subnetComp);
          this.dbinstances[aws_dbins.id] = dbInsComp;
        }
      }
    ];
    processServerGroup = function(cd) {
      var addRemoveDiffRet, diffInstanceAry, diffRet, diffTree, getRelatedInstanceGroupUID, newAddRemoveComps, newComps, newServerGroupComps, oldAddRemoveComps, originComps, originServerGroupComps;
      diffTree = new DiffTree();
      originComps = cd.originAppJSON.component;
      newComps = cd.component;
      getRelatedInstanceGroupUID = function(comp) {
        var eniComp, eniRef, eniUID, instanceComp, instanceRef, instanceUID, resType, serverGroupUid;
        resType = comp.type;
        if (resType === constant.RESTYPE.INSTANCE) {
          return comp.serverGroupUid;
        }
        if (resType === constant.RESTYPE.ENI) {
          instanceRef = comp.resource.Attachment.InstanceId;
          if (instanceRef) {
            instanceUID = MC.extractID(instanceRef);
            instanceComp = originComps[instanceUID];
            if (instanceComp) {
              return instanceComp.serverGroupUid;
            }
          } else {
            serverGroupUid = comp.serverGroupUid;
            if (serverGroupUid !== comp.uid) {
              eniComp = originComps[serverGroupUid];
              if (eniComp) {
                return getRelatedInstanceGroupUID(eniComp);
              }
            }
          }
        }
        if (resType === constant.RESTYPE.VOL) {
          instanceRef = comp.resource.AttachmentSet.InstanceId;
          if (instanceRef) {
            instanceUID = MC.extractID(instanceRef);
            instanceComp = originComps[instanceUID];
            if (instanceComp) {
              return instanceComp.serverGroupUid;
            }
          }
        }
        if (resType === constant.RESTYPE.EIP) {
          eniRef = comp.resource.NetworkInterfaceId;
          if (eniRef) {
            eniUID = MC.extractID(eniRef);
            eniComp = originComps[eniUID];
            if (eniComp) {
              return getRelatedInstanceGroupUID(eniComp);
            }
          }
        }
        return '';
      };
      originServerGroupComps = {};
      _.each(originComps, function(comp) {
        if (comp.number && comp.number > 1) {
          return originServerGroupComps[comp.uid] = comp;
        }
      });
      newServerGroupComps = {};
      _.each(newComps, function(comp) {
        if (originServerGroupComps[comp.uid]) {
          newServerGroupComps[comp.uid] = comp;
        }
        return null;
      });
      diffRet = diffTree.compare(originServerGroupComps, newServerGroupComps);
      if (diffRet) {
        _.each(diffRet, function(comp, uid) {
          var newCompObj, serverGroupUID;
          newCompObj = newServerGroupComps[uid];
          if (newCompObj) {
            serverGroupUID = getRelatedInstanceGroupUID(newCompObj);
            if (serverGroupUID) {
              return _.each(newServerGroupComps, function(newComp) {
                if (getRelatedInstanceGroupUID(newComp) === serverGroupUID) {
                  if (newComp.serverGroupName) {
                    newComp.serverGroupName = newComp.name;
                  }
                  if (newComp.number) {
                    newComp.number = 1;
                  }
                  if (newComp.index) {
                    newComp.index = 0;
                  }
                  if (newComp.serverGroupUid) {
                    return newComp.serverGroupUid = newComp.uid;
                  }
                }
              });
            }
          }
        });
      }
      _.each(cd.elbs, function(insComp) {
        var diffElbInstance, diffInstanceAry, instanceAry, originComp, originInstanceAry;
        instanceAry = _.map(insComp.resource.Instances, function(refObj) {
          return MC.extractID(refObj.InstanceId);
        });
        originComp = originComps[insComp.uid];
        if (originComp) {
          originInstanceAry = _.map(originComp.resource.Instances, function(refObj) {
            return MC.extractID(refObj.InstanceId);
          });
          diffElbInstance = diffTree.compare(instanceAry, originInstanceAry);
          if (diffElbInstance) {
            diffInstanceAry = [];
            _.each(diffElbInstance, function(comp) {
              if (comp.__old__) {
                diffInstanceAry.push(comp.__old__);
              }
              if (comp.__new__) {
                diffInstanceAry.push(comp.__new__);
              }
              return null;
            });
            return _.each(diffInstanceAry, function(instanceUID) {
              var serverGroupInstanceComp, serverGroupUID;
              serverGroupInstanceComp = newServerGroupComps[instanceUID];
              if (serverGroupInstanceComp) {
                serverGroupUID = serverGroupInstanceComp.serverGroupUid;
                return _.each(newServerGroupComps, function(comp, uid) {
                  var _serverGroupUID;
                  _serverGroupUID = getRelatedInstanceGroupUID(comp);
                  if (_serverGroupUID === serverGroupUID) {
                    if (comp.serverGroupName) {
                      comp.serverGroupName = comp.name;
                    }
                    if (comp.number) {
                      comp.number = 1;
                    }
                    if (comp.index) {
                      comp.index = 0;
                    }
                    if (comp.serverGroupUid) {
                      return comp.serverGroupUid = comp.uid;
                    }
                  }
                });
              }
            });
          }
        }
      });
      newAddRemoveComps = {};
      oldAddRemoveComps = {};
      _.each(newComps, function(insComp) {
        var _ref;
        if ((_ref = insComp.type) === constant.RESTYPE.ENI || _ref === constant.RESTYPE.EIP || _ref === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.VOL) {
          if (!originComps[insComp.uid]) {
            return newAddRemoveComps[insComp.uid] = insComp;
          }
        }
      });
      _.each(originComps, function(insComp) {
        var _ref;
        if ((_ref = insComp.type) === constant.RESTYPE.ENI || _ref === constant.RESTYPE.EIP || _ref === constant.RESTYPE.INSTANCE || _ref === constant.RESTYPE.VOL) {
          if (!newComps[insComp.uid]) {
            oldAddRemoveComps[insComp.uid] = insComp;
          }
        }
        return null;
      });
      addRemoveDiffRet = diffTree.compare(newAddRemoveComps, oldAddRemoveComps);
      diffInstanceAry = [];
      if (addRemoveDiffRet) {
        return _.each(addRemoveDiffRet, function(comp, uid) {
          var serverGroupInstanceComp, serverGroupUID;
          serverGroupInstanceComp = newComps[uid] || originComps[uid];
          serverGroupUID = getRelatedInstanceGroupUID(serverGroupInstanceComp);
          return _.each(newComps, function(comp, uid) {
            var _serverGroupUID;
            _serverGroupUID = getRelatedInstanceGroupUID(comp);
            if (_serverGroupUID === serverGroupUID) {
              if (comp.serverGroupName) {
                comp.serverGroupName = comp.name;
              }
              if (comp.number) {
                comp.number = 1;
              }
              if (comp.index) {
                comp.index = 0;
              }
              if (comp.serverGroupUid) {
                return comp.serverGroupUid = comp.uid;
              }
            }
          });
        });
      }
    };
    convertResToJson = function(region, vpcId, originalJson) {
      var cd, err, func, _i, _len;
      console.log(["VOL", "INSTANCE", "SG", "ELB", "ACL", "CGW", "ENI", "IGW", "RT", "SUBNET", "VPC", "VPN", "VGW", "ASG", "LC", "NC", "SP", "IAM", "RETAIN"].map(function(t) {
        return CloudResources(constant.RESTYPE[t], region);
      }));
      cd = new ConverterData(region, vpcId, originalJson);
      for (_i = 0, _len = Converters.length; _i < _len; _i++) {
        func = Converters[_i];
        func.call(cd);
      }
      if (cd.originAppJSON) {
        try {
          processServerGroup(cd);
        } catch (_error) {
          err = _error;
          console.info('Server Group process exception when convert app json');
        }
      }
      return cd;
    };
    __createRequestParam = function(region, vpcId) {
      var RESTYPE, additionalRequestParam, asg, asgNamesInVpc, filter, lcNamesInVpc, sb, subnetIdsInVpc, _i, _j, _len, _len1, _ref, _ref1;
      RESTYPE = constant.RESTYPE;
      filter = {
        filter: {
          'vpc-id': vpcId
        }
      };
      additionalRequestParam = {
        'AWS.EC2.SecurityGroup': filter,
        'AWS.VPC.NetworkAcl': filter,
        'AWS.VPC.NetworkInterface': filter
      };
      subnetIdsInVpc = {};
      _ref = CloudResources(RESTYPE.SUBNET, region).where({
        vpcId: vpcId
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sb = _ref[_i];
        subnetIdsInVpc[sb.id] = true;
      }
      asgNamesInVpc = [];
      lcNamesInVpc = [];
      _ref1 = CloudResources(RESTYPE.ASG, region).models;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        asg = _ref1[_j];
        if (subnetIdsInVpc[asg.get("VPCZoneIdentifier")]) {
          asgNamesInVpc.push(asg.get("AutoScalingGroupName"));
          lcNamesInVpc.push(asg.get("LaunchConfigurationName"));
        }
      }
      if (asgNamesInVpc.length) {
        additionalRequestParam[RESTYPE.LC] = {
          id: _.uniq(lcNamesInVpc)
        };
        additionalRequestParam[RESTYPE.NC] = {
          id: asgNamesInVpc
        };
        additionalRequestParam[RESTYPE.SP] = {
          filter: {
            AutoScalingGroupName: asgNamesInVpc
          }
        };
      }
      return additionalRequestParam;
    };
    CloudResources.getAllResourcesForVpc = convertResToJson;
  });

}).call(this);
