(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["ComplexResModel", "Design", "./connection/SgAsso", "./connection/EniAttachment", "constant", 'i18n!/nls/lang.js'], function(ComplexResModel, Design, SgAsso, EniAttachment, constant, lang) {

    /*
    IpObject is used to represent an ip in Eni
     */
    var IpObject, Model;
    IpObject = function(attr) {
      if (!attr) {
        attr = {};
      }
      attr.ip = attr.ip || "";
      if (attr.ip.split(".").length !== 4 || attr.ip[attr.ip.length - 1] === ".") {
        attr.ip = "";
      }
      this.hasEip = attr.hasEip || false;
      this.autoAssign = attr.autoAssign !== void 0 ? attr.autoAssign : true;
      this.ip = attr.ip || "x.x.x.x";
      this.eipData = attr.eipData || {
        id: MC.guid()
      };
      this.fixedIpInApp = attr.fixedIpInApp || false;
      return null;
    };

    /*
    Defination of EniModel
     */
    Model = ComplexResModel.extend({
      defaults: function() {
        return {
          sourceDestCheck: true,
          description: "",
          ips: [],
          assoPublicIp: false,
          name: "eni"
        };
      },
      type: constant.RESTYPE.ENI,
      constructor: function(attributes, option) {
        if (option && option.instance) {
          this.__embedInstance = option.instance;
        }
        if (!attributes.ips) {
          attributes.ips = [];
        }
        if (attributes.ips.length === 0) {
          attributes.ips.push(new IpObject());
        }
        return ComplexResModel.call(this, attributes, option);
      },
      initialize: function(attributes, option) {
        var defaultSg;
        option = option || {};
        if (option.createByUser && !option.instance) {
          defaultSg = Design.modelClassForType(constant.RESTYPE.SG).getDefaultSg();
          SgAsso = Design.modelClassForType("SgAsso");
          new SgAsso(defaultSg, this);
        }
        if (option.cloneSource) {
          this.clone(option.cloneSource);
        }
        return null;
      },
      clone: function(srcTarget) {
        var ip, _i, _len, _ref;
        this.cloneAttributes(srcTarget);
        _ref = this.get("ips");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ip = _ref[_i];
          ip.ip = "x.x.x.x";
          ip.autoAssign = true;
          ip.eipData.id = this.design().guid();
        }
        return null;
      },
      groupMembers: function() {
        if (!this.__groupMembers) {
          this.__groupMembers = [];
        }
        return this.__groupMembers;
      },
      updateName: function() {
        this.trigger("change:name");
        return this.trigger("change");
      },
      get: function(attr) {
        if (attr === "name") {
          return this.getName();
        }
        return this.attributes[attr];
      },
      getName: function() {
        var attachment;
        if (this.__embedInstance) {
          return "eni0";
        }
        attachment = this.connections("EniAttachment")[0];
        if (attachment) {
          return "eni" + attachment.get("index");
        }
        return "eni";
      },
      isReparentable: function(newParent) {
        var check;
        if (newParent.type === constant.RESTYPE.SUBNET) {
          if (newParent.parent() !== this.parent().parent()) {
            check = true;
          }
        } else {
          check = true;
        }
        if (check && this.connectionTargets("EniAttachment").length > 0) {
          return lang.CANVAS.ERR_MOVE_ATTACHED_ENI;
        }
        return true;
      },
      isVisual: function() {
        return !this.__embedInstance;
      },
      embedInstance: function() {
        return this.__embedInstance;
      },
      attachedInstance: function() {
        var instance, target;
        instance = this.__embedInstance;
        if (!instance) {
          target = this.connectionTargets("EniAttachment");
          if (target.length) {
            instance = target[0];
          }
        }
        return instance;
      },
      serverGroupCount: function() {
        var count, instance;
        instance = this.attachedInstance();
        if (instance) {
          count = instance.get("count");
        }
        return count || 1;
      },
      maxIpCount: function() {
        var config, instance;
        instance = this.attachedInstance();
        if (instance) {
          config = instance.getInstanceTypeConfig();
          if (config) {
            return config.ip_per_eni;
          }
        }
        return 1;
      },
      limitIpAddress: function() {
        var instance, ipCount;
        instance = this.attachedInstance();
        if (instance && instance.getInstanceTypeConfig()) {
          ipCount = this.maxIpCount();
          if (this.get("ips").length > ipCount) {
            this.get("ips").length = ipCount;
          }
        }
        return null;
      },
      setPrimaryEip: function(toggle) {
        if (!this.attachedInstance()) {
          return;
        }
        this.get("ips")[0].hasEip = toggle;
        return null;
      },
      hasPrimaryEip: function() {
        return this.get("ips")[0].hasEip;
      },
      hasEip: function() {
        return this.get("ips").some(function(ip) {
          return ip.hasEip;
        });
      },
      subnetCidr: function() {
        var parent;
        parent = this.parent() || this.__embedInstance.parent();
        console.assert(parent.type === constant.RESTYPE.SUBNET, "Eni's parent must be subnet");
        return parent.get("cidr") || "10.0.0.1";
      },
      getIpArray: function() {
        var cidr, idx, ip, ipAry, ips, isServergroup, obj, prefixSuffixAry, _i, _len, _ref;
        cidr = this.subnetCidr();
        isServergroup = this.serverGroupCount() > 1;
        prefixSuffixAry = Design.modelClassForType(constant.RESTYPE.SUBNET).genCIDRPrefixSuffix(cidr);
        ips = [];
        _ref = this.get("ips");
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          ip = _ref[idx];
          obj = {
            hasEip: ip.hasEip,
            autoAssign: ip.autoAssign,
            editable: !(isServergroup || (ip.fixedIpInApp && ip.ip !== "x.x.x.x")),
            prefix: prefixSuffixAry[0]
          };
          if (obj.autoAssign || isServergroup) {
            obj.suffix = prefixSuffixAry[1];
          } else {
            ipAry = ip.ip.split(".");
            if (prefixSuffixAry[1] === "x.x") {
              obj.suffix = ipAry[2] + "." + ipAry[3];
            } else {
              obj.suffix = ipAry[3];
            }
          }
          obj.ip = obj.prefix + obj.suffix;
          ips.push(obj);
        }
        return ips;
      },
      getRealIp: function(ip, cidr) {
        var ipAry, prefixSuffixAry, realIp;
        if (ip === "x.x.x.x") {
          return ip;
        }
        if (!cidr) {
          cidr = this.subnetCidr();
        }
        if (!cidr) {
          return ip;
        }
        prefixSuffixAry = Design.modelClassForType(constant.RESTYPE.SUBNET).genCIDRPrefixSuffix(cidr);
        ipAry = ip.split(".");
        if (prefixSuffixAry[1] === "x.x") {
          realIp = prefixSuffixAry[0] + ipAry[2] + "." + ipAry[3];
        } else {
          realIp = prefixSuffixAry[0] + ipAry[3];
        }
        return realIp;
      },
      isValidIp: function(ip) {
        var cidr, eni, ipObj, realIp, realNewIp, validObj, _i, _j, _len, _len1, _ref, _ref1;
        if (ip.indexOf("x") !== -1) {
          return true;
        }
        cidr = this.subnetCidr();
        validObj = Design.modelClassForType(constant.RESTYPE.SUBNET).isIPInSubnet(ip, cidr);
        if (!validObj.isValid) {
          if (validObj.isReserved) {
            return lang.IDE.VALIDATION_IP_IN_SUBNET_REVERSED_RANGE;
          }
          return lang.IDE.VALIDATION_IP_CONFLICTS_WITH_SUBNET_IP_RANGE;
        }
        realNewIp = this.getRealIp(ip, cidr);
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          eni = _ref[_i];
          if (!eni.attachedInstance()) {
            continue;
          }
          _ref1 = eni.attributes.ips;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ipObj = _ref1[_j];
            if (ipObj.autoAssign) {
              continue;
            }
            realIp = eni.getRealIp(ipObj.ip);
            if (realIp === realNewIp) {
              if (eni === this) {
                return lang.IDE.VALIDATION_IP_CONFLICTS_WITH_OTHER_IP;
              } else {
                return lang.IDE.VALIDATION_IP_CONFLICTS_WITH_OTHER_NETWORK_INTERFACE_IP;
              }
            }
          }
        }
        return true;
      },
      addIp: function(idx, ip, autoAssign, hasEip) {
        var ips;
        ips = this.get("ips");
        if (this.maxIpCount() <= ips.length) {
          return false;
        }
        ip = new IpObject({
          hasEip: false,
          ip: "x.x.x.x",
          autoAssign: true
        });
        ips = ips.slice(0);
        ips.push(ip);
        this.set("ips", ips);
        return true;
      },
      setIp: function(idx, ip, autoAssign, hasEip) {
        var ipObj;
        ipObj = this.get("ips")[idx];
        if (ip !== void 0 && ip !== null) {
          ipObj.ip = ip;
        }
        if (autoAssign !== void 0 && autoAssign !== null) {
          ipObj.autoAssign = autoAssign;
        }
        if (hasEip !== void 0 && hasEip !== null && hasEip !== ipObj.hasEip) {
          ipObj.hasEip = hasEip;
          if (idx === 0) {
            (this.__embedInstance || this).trigger("change:primaryEip");
          }
        }
        return null;
      },
      removeIp: function(idx) {
        var ips;
        ips = this.get("ips");
        if (ips.length <= 1 || idx === 0) {
          return;
        }
        ips = ips.slice(0);
        ips.splice(idx, 1);
        this.set("ips", ips);
        return null;
      },
      canAddIp: function() {
        var instance, ips, maxIp, result, subnet;
        instance = this.attachedInstance();
        if (!instance) {
          return false;
        }
        maxIp = this.maxIpCount();
        ips = this.get("ips");
        if (ips.length >= maxIp) {
          return sprintf(lang.PROP.MSG_WARN_ENI_IP_EXTEND, instance.get("instanceType"), maxIp);
        }
        subnet = this.__embedInstance ? this.__embedInstance.parent() : this.parent();
        result = true;
        ips.push({
          ip: "fake"
        });
        if (subnet.getAvailableIPCountInSubnet() <= 0) {
          result = "Ip count limit has reached in " + (subnet.get('name'));
        }
        ips.length = ips.length - 1;
        return result;
      },
      connect: function(connection) {
        var SgModel;
        if (connection.type !== "EniAttachment") {
          return;
        }
        this.limitIpAddress();
        this.updateName();
        SgModel = Design.modelClassForType(constant.RESTYPE.SG);
        SgModel.tryDrawLine(this);
        return null;
      },
      disconnect: function(connection) {
        var reason, sgline, _i, _len, _ref;
        if (connection.type !== "EniAttachment") {
          return;
        }
        this.attributes.name = "eni";
        reason = {
          reason: connection
        };
        _ref = this.connections("SgRuleLine");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sgline = _ref[_i];
          sgline.remove(reason);
        }
        return null;
      },
      ensureEnoughMember: function() {
        var count, idx, instance, ip, ipTemplate, ips, member, _i, _j, _len, _len1, _ref;
        instance = this.attachedInstance();
        if (!instance) {
          return;
        }
        count = instance.get("count") - 1;
        ipTemplate = this.get("ips");
        _ref = this.groupMembers();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          member = _ref[_i];
          while (member.ips.length < ipTemplate.length) {
            member.ips.push({
              autoAssign: true,
              ip: "x.x.x.x",
              eipData: {
                id: MC.guid()
              }
            });
          }
        }
        while (this.groupMembers().length < count) {
          ips = [];
          for (idx = _j = 0, _len1 = ipTemplate.length; _j < _len1; idx = ++_j) {
            ip = ipTemplate[idx];
            ips.push({
              autoAssign: true,
              ip: "x.x.x.x",
              eipData: {
                id: MC.guid()
              }
            });
          }
          this.groupMembers().push({
            id: MC.guid(),
            appId: "",
            forceAutoAssign: true,
            ips: ips
          });
        }
        return null;
      },
      onParentChanged: function(oldParent) {
        var idx, ipObj, _i, _len, _ref, _results;
        if (oldParent) {
          _ref = this.get("ips");
          _results = [];
          for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
            ipObj = _ref[idx];
            _results.push(this.setIp(idx, null, true, ipObj.hasEip));
          }
          return _results;
        }
      },
      generateJSON: function(index, servergroupOption, eniIndex) {
        var autoAssign, az, component, eip, eniName, hasEip, idx, instanceId, ipObj, ips, memberData, parent, resources, securitygroups, sgTarget, subnetId, vpcId, _i, _len, _ref;
        resources = [{}];
        this.ensureEnoughMember();
        eniName = (servergroupOption.instanceName || "") + this.get("name");
        ips = [];
        if (index === 0) {
          memberData = {
            id: this.id,
            appId: this.get("appId"),
            ips: this.get("ips"),
            attachmentId: this.get("attachmentId")
          };
        } else {
          memberData = this.groupMembers()[index - 1];
        }
        _ref = this.get("ips");
        for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
          ipObj = _ref[idx];
          hasEip = ipObj.hasEip;
          ipObj = memberData.ips[idx];
          console.assert(ipObj, "ipObj should be defined.");
          if (servergroupOption.number > 1) {
            autoAssign = true;
          } else {
            autoAssign = ipObj.autoAssign;
          }
          if (ipObj.fixedIpInApp && ipObj.ip.indexOf('x') === -1) {
            autoAssign = false;
          }
          ips.push({
            PrivateIpAddress: this.getRealIp(ipObj.ip),
            AutoAssign: autoAssign,
            Primary: false
          });
          if (hasEip) {
            eip = ipObj.eipData;
            resources.push({
              uid: eip.id || MC.guid(),
              type: constant.RESTYPE.EIP,
              name: "" + eniName + "-eip" + idx,
              index: index,
              resource: {
                Domain: "vpc",
                InstanceId: "",
                AllocationId: eip.allocationId || "",
                NetworkInterfaceId: this.createRef("NetworkInterfaceId", memberData.id),
                PrivateIpAddress: this.createRef("PrivateIpAddressSet." + idx + ".PrivateIpAddress", memberData.id),
                PublicIp: eip.publicIp || ""
              }
            });
          }
        }
        ips[0].Primary = true;
        sgTarget = this.__embedInstance ? this.__embedInstance : this;
        securitygroups = _.map(sgTarget.connectionTargets("SgAsso"), function(sg) {
          return {
            GroupName: sg.createRef("GroupName"),
            GroupId: sg.createRef("GroupId")
          };
        });
        if (servergroupOption.instanceId) {
          instanceId = this.createRef("InstanceId", servergroupOption.instanceId);
        } else {
          instanceId = "";
        }
        az = "";
        if (this.__embedInstance) {
          parent = this.__embedInstance.parent();
        } else {
          parent = this.parent();
        }
        if (parent.type === constant.RESTYPE.SUBNET) {
          subnetId = parent.createRef("SubnetId");
          vpcId = parent.parent().parent().createRef("VpcId");
          az = parent.parent();
        } else {
          az = parent;
        }
        component = {
          index: index,
          uid: memberData.id,
          type: this.type,
          name: eniName,
          description: this.get("description") || "",
          serverGroupUid: this.id,
          serverGroupName: this.get("name"),
          number: servergroupOption.number || 1,
          resource: {
            SourceDestCheck: this.get("sourceDestCheck"),
            Description: "",
            NetworkInterfaceId: memberData.appId,
            AvailabilityZone: az.createRef(),
            VpcId: parent.getVpcRef(),
            SubnetId: parent.getSubnetRef(),
            AssociatePublicIpAddress: this.get("assoPublicIp"),
            PrivateIpAddressSet: ips,
            GroupSet: securitygroups,
            Attachment: {
              InstanceId: instanceId,
              DeviceIndex: eniIndex === void 0 ? "1" : "" + eniIndex,
              AttachmentId: memberData.attachmentId || ""
            }
          }
        };
        resources[0] = component;
        return resources;
      },
      serialize: function() {
        var comps, eniIndex, layout, res;
        res = [];
        if (!this.__embedInstance) {
          layout = this.generateLayout();
          res[0] = {
            layout: layout
          };
        }
        if (!this.attachedInstance()) {
          eniIndex = this.__embedInstance ? 0 : 1;
          comps = this.generateJSON(0, {
            number: 1
          }, eniIndex);
          if (!res[0]) {
            res[0] = {};
          }
          res[0].component = comps[0];
          if (comps[1]) {
            res.push({
              component: comps[1]
            });
          }
        }
        return res;
      }
    }, {
      handleTypes: [constant.RESTYPE.ENI, constant.RESTYPE.EIP],
      getAvailableIPInCIDR: function(ipCidr, filter, maxNeedIPCount, reserveIPs) {
        var allIPAry, availableIPCount, cutAry, idx, ipAddr, ipAddrAry, ipAddrBinAry, ipAddrBinPrefixStr, ipAddrBinStr, ipAddrBinStrSuffixMax, ipAddrBinStrSuffixMin, ipAddrNumSuffixMax, ipAddrNumSuffixMin, isAvailableIP, newIPAry, newIPBinStr, newIPObj, newIPStr, prefix, readyAssignAryLength, suffix, value, _i, _ref;
        if (!reserveIPs) {
          reserveIPs = [0, 1, 2, 3];
        }
        cutAry = ipCidr.split('/');
        ipAddr = cutAry[0];
        suffix = Number(cutAry[1]);
        prefix = 32 - suffix;
        ipAddrAry = ipAddr.split('.');
        ipAddrBinAry = ipAddrAry.map(function(value) {
          return MC.leftPadString(parseInt(value).toString(2), 8, "0");
        });
        ipAddrBinStr = ipAddrBinAry.join('');
        ipAddrBinPrefixStr = ipAddrBinStr.slice(0, suffix);
        ipAddrBinStrSuffixMin = ipAddrBinStr.slice(suffix).replace(/1/g, '0');
        ipAddrBinStrSuffixMax = ipAddrBinStrSuffixMin.replace(/0/g, '1');
        ipAddrNumSuffixMin = parseInt(ipAddrBinStrSuffixMin, 2);
        ipAddrNumSuffixMax = parseInt(ipAddrBinStrSuffixMax, 2);
        allIPAry = [];
        availableIPCount = 0;
        readyAssignAryLength = ipAddrNumSuffixMax - ipAddrNumSuffixMin + 1;
        idx = -1;
        for (value = _i = ipAddrNumSuffixMin, _ref = ipAddrNumSuffixMax + 1; ipAddrNumSuffixMin <= _ref ? _i < _ref : _i > _ref; value = ipAddrNumSuffixMin <= _ref ? ++_i : --_i) {
          idx++;
          newIPBinStr = ipAddrBinPrefixStr + MC.leftPadString(value.toString(2), prefix, "0");
          isAvailableIP = true;
          if (__indexOf.call(reserveIPs, idx) >= 0) {
            isAvailableIP = false;
          }
          if (idx === readyAssignAryLength - 1) {
            isAvailableIP = false;
          }
          newIPAry = _.map([0, 8, 16, 24], function(value) {
            var newIPNum;
            newIPNum = parseInt(newIPBinStr.slice(value, value + 8), 2);
            return newIPNum;
          });
          newIPStr = newIPAry.join('.');
          if (__indexOf.call(filter, newIPStr) >= 0) {
            isAvailableIP = false;
          }
          newIPObj = {
            ip: newIPStr,
            available: isAvailableIP
          };
          allIPAry.push(newIPObj);
          if (isAvailableIP) {
            availableIPCount++;
          }
          if (availableIPCount > maxNeedIPCount) {
            break;
          }
          null;
        }
        console.log('availableIPCount: ' + availableIPCount);
        return allIPAry;
      },
      getAvailableIPCountInCIDR: function(ipCidr) {
        var availableIPCount, cutAry, ipAddr, ipAddrAry, ipAddrBinAry, ipAddrBinPrefixStr, ipAddrBinStr, ipAddrBinStrSuffixMax, ipAddrBinStrSuffixMin, ipAddrNumSuffixMax, ipAddrNumSuffixMin, prefix, suffix;
        cutAry = ipCidr.split('/');
        ipAddr = cutAry[0];
        suffix = Number(cutAry[1]);
        prefix = 32 - suffix;
        ipAddrAry = ipAddr.split('.');
        ipAddrBinAry = ipAddrAry.map(function(value) {
          return MC.leftPadString(parseInt(value).toString(2), 8, "0");
        });
        ipAddrBinStr = ipAddrBinAry.join('');
        ipAddrBinPrefixStr = ipAddrBinStr.slice(0, suffix);
        ipAddrBinStrSuffixMin = ipAddrBinStr.slice(suffix).replace(/1/g, '0');
        ipAddrBinStrSuffixMax = ipAddrBinStrSuffixMin.replace(/0/g, '1');
        ipAddrNumSuffixMin = parseInt(ipAddrBinStrSuffixMin, 2);
        ipAddrNumSuffixMax = parseInt(ipAddrBinStrSuffixMax, 2);
        availableIPCount = (ipAddrNumSuffixMax - ipAddrNumSuffixMin + 1) - 5;
        if (availableIPCount < 0) {
          availableIPCount = 0;
        }
        return availableIPCount;
      },
      createServerGroupMember: function(data) {
        var attachment, ip, ipObj, memberData, _i, _len, _ref;
        attachment = data.resource.Attachment || {};
        memberData = {
          id: data.uid,
          appId: data.resource.NetworkInterfaceId,
          attachmentId: attachment.AttachmentId || "",
          ips: []
        };
        _ref = data.resource.PrivateIpAddressSet || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          ip = _ref[_i];
          ipObj = new IpObject({
            autoAssign: ip.AutoAssign,
            ip: ip.PrivateIpAddress,
            fixedIpInApp: Design.instance().modeIsApp() || Design.instance().modeIsAppView()
          });
          if (ip.EipResource) {
            ipObj.eipData = {
              id: ip.EipResource.uid,
              allocationId: ip.EipResource.resource.AllocationId,
              publicIp: ip.EipResource.resource.PublicIp
            };
          }
          memberData.ips.push(ipObj);
        }
        return memberData;
      },
      deserialize: function(data, layout_data, resolve) {
        var attachment, attr, autoAssign, embed, eni, eniIndex, group, instance, ip, ipObj, m, members, option, sgTarget, _i, _j, _k, _len, _len1, _len2, _ref, _ref1;
        if (data.type === constant.RESTYPE.EIP) {
          return;
        }
        if (data.serverGroupUid && data.serverGroupUid !== data.uid) {
          members = resolve(data.serverGroupUid).groupMembers();
          for (_i = 0, _len = members.length; _i < _len; _i++) {
            m = members[_i];
            if (m && m.id === data.uid) {
              console.debug("This eni servergroup member has already deserialized", data);
              return;
            }
          }
          members[data.index - 1] = this.createServerGroupMember(data);
          return;
        }
        attachment = data.resource.Attachment;
        embed = attachment && (attachment.DeviceIndex === "0" || attachment.DeviceIndex === 0);
        instance = attachment && attachment.InstanceId ? resolve(MC.extractID(attachment.InstanceId)) : null;
        attr = {
          id: data.uid,
          appId: data.resource.NetworkInterfaceId,
          description: data.description || "",
          sourceDestCheck: data.resource.SourceDestCheck,
          assoPublicIp: data.resource.AssociatePublicIpAddress,
          attachmentId: attachment ? attachment.AttachmentId : "",
          ips: [],
          x: embed ? 0 : layout_data.coordinate[0],
          y: embed ? 0 : layout_data.coordinate[1]
        };
        _ref = data.resource.PrivateIpAddressSet || [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          ip = _ref[_j];
          autoAssign = Design.instance().modeIsStack() ? ip.AutoAssign : false;
          ipObj = new IpObject({
            autoAssign: autoAssign,
            ip: ip.PrivateIpAddress,
            fixedIpInApp: Design.instance().modeIsApp() || Design.instance().modeIsAppView()
          });
          if (ip.EipResource) {
            ipObj.hasEip = true;
            ipObj.eipData = {
              id: ip.EipResource.uid,
              allocationId: ip.EipResource.resource.AllocationId,
              publicIp: ip.EipResource.resource.PublicIp
            };
          }
          attr.ips.push(ipObj);
        }
        if (embed) {
          option = {
            instance: instance
          };
        } else {
          attr.parent = resolve(layout_data.groupUId);
        }
        eni = new Model(attr, option);
        sgTarget = eni.embedInstance() || eni;
        _ref1 = data.resource.GroupSet || [];
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          group = _ref1[_k];
          new SgAsso(sgTarget, resolve(MC.extractID(group.GroupId)));
        }
        if (instance) {
          if (embed) {
            instance.setEmbedEni(eni);
          } else {
            eniIndex = attachment && attachment.DeviceIndex ? attachment.DeviceIndex : 1;
            new EniAttachment(eni, instance, {
              index: eniIndex * 1
            });
          }
        }
        return null;
      },
      postDeserialize: function(data, layout) {
        var attach, design, embed, eni, eniMember, found, idx, instance, instanceId, m, _i, _j, _len, _len1, _ref, _ref1;
        attach = data.resource.Attachment;
        if (!attach) {
          return;
        }
        embed = attach.DeviceIndex === "0";
        if (!embed) {
          return;
        }
        design = Design.instance();
        instanceId = MC.extractID(attach.InstanceId);
        instance = design.component(instanceId);
        if (instance) {
          return;
        }
        eni = design.component(data.uid);
        if (!eni) {
          return;
        }
        console.debug("Found embed eni which doesn't belong to visible instance, it might be embed eni of an servergroup member", eni);
        eni.remove();
        eniMember = this.createServerGroupMember(data);
        _ref = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          instance = _ref[_i];
          _ref1 = instance.groupMembers();
          for (idx = _j = 0, _len1 = _ref1.length; _j < _len1; idx = ++_j) {
            m = _ref1[idx];
            if (m.id === instanceId) {
              found = true;
              break;
            }
          }
        }
        if (!found) {
          console.warn("Cannot found instance server group for embed eni :", eni);
          return;
        }
        instance.getEmbedEni().groupMembers()[idx] = eniMember;
        return null;
      }
    });
    return Model;
  });

}).call(this);
