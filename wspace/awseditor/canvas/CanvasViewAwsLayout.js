(function() {
  define(["./CanvasViewAws", "CanvasViewLayout", "constant"], function(AwsCanvasView, CanvasViewLayoutHelpers, constant) {
    var ArrangeForAzs, ArrangeForSvg, ArrangeForVpc, AutoLayoutConfig, GroupMForDbSubnet, GroupMForSubnet, SortForVpc, __sortInstance;
    __sortInstance = function(instances) {
      return instances.sort(function(a, b) {
        return b.component.connections("ElbAmiAsso").length - a.component.connections("ElbAmiAsso");
      });
    };
    GroupMForSubnet = function(children) {
      var asgGroup, ch, eni, eniGroup, eniInstanceG, enis, existingEnis, expandedGroup, group, instance, instanceGroup, linkedEnis, linkedInstances, lonelyEnis, lonelyInstances, pairGroup, subnetChildren, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
      group = CanvasViewLayoutHelpers.DefaultGroupMethod.call(this, children);
      instanceGroup = null;
      eniGroup = null;
      asgGroup = null;
      expandedGroup = null;
      subnetChildren = [];
      for (_i = 0, _len = group.length; _i < _len; _i++) {
        ch = group[_i];
        if (ch.type === "AWS.VPC.NetworkInterface_group") {
          eniGroup = ch;
        } else if (ch.type === "AWS.EC2.Instance_group") {
          instanceGroup = ch;
        } else if (ch.type === "ExpandedAsg_group") {
          expandedGroup = ch;
        } else if (ch.type === "AWS.AutoScaling.Group_group") {
          asgGroup = ch;
        } else {
          subnetChildren.push(ch);
        }
      }
      if (expandedGroup) {
        if (asgGroup) {
          asgGroup.children = asgGroup.children.concat(expandedGroup.children);
        } else {
          expandedGroup.type = "AWS.AutoScaling.Group_group";
          asgGroup = expandedGroup;
        }
      }
      if (asgGroup) {
        subnetChildren.unshift(asgGroup);
      }
      if (instanceGroup && eniGroup) {
        linkedInstances = {};
        linkedEnis = {};
        pairGroup = [];
        existingEnis = {};
        _ref = eniGroup.children;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          eni = _ref[_j];
          existingEnis[eni.component.id] = eni;
        }
        lonelyInstances = [];
        lonelyEnis = [];
        _ref1 = instanceGroup.children;
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          instance = _ref1[_k];
          enis = instance.component.connectionTargets("EniAttachment");
          if (!enis.length) {
            lonelyInstances.push(instance);
          } else {
            eniInstanceG = [instance];
            linkedInstances[instance.component.id] = true;
            for (_l = 0, _len3 = enis.length; _l < _len3; _l++) {
              eni = enis[_l];
              linkedEnis[eni.id] = true;
              eniInstanceG.push(existingEnis[eni.id]);
            }
            pairGroup.push({
              type: "AmiEniPair",
              children: eniInstanceG
            });
          }
        }
        _ref2 = eniGroup.children;
        for (_m = 0, _len4 = _ref2.length; _m < _len4; _m++) {
          eni = _ref2[_m];
          if (!linkedEnis[eni.component.id]) {
            lonelyEnis.push(eni);
          }
        }
        __sortInstance(lonelyInstances);
        subnetChildren.push({
          type: "AWS.EC2.Instance_group",
          children: lonelyInstances
        });
        subnetChildren.push({
          type: "AmiEniPari_group",
          children: pairGroup
        });
        subnetChildren.push({
          type: "AWS.VPC.NetworkInterface_group",
          children: lonelyEnis
        });
        return subnetChildren;
      } else {
        if (instanceGroup) {
          __sortInstance(instanceGroup.children);
          subnetChildren.push(instanceGroup);
        }
        if (eniGroup) {
          subnetChildren.push(eniGroup);
        }
        return subnetChildren;
      }
    };
    GroupMForDbSubnet = function(children) {
      var ch, id, lonelyMasters, lonelySlaves, master, masterSlave, masters, msGroup, normalGroup, _i, _j, _len, _len1;
      msGroup = [];
      normalGroup = [];
      masters = {};
      lonelySlaves = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.component.slaves().length) {
          masters[ch.component.id] = [ch];
        }
      }
      for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
        ch = children[_j];
        master = ch.component.master();
        if (master) {
          if (masters[master.id]) {
            masters[master.id].push(ch);
          } else {
            lonelySlaves.push(ch);
          }
        } else if (!masters[ch.component.id]) {
          normalGroup.push(ch);
        }
      }
      lonelyMasters = [];
      for (id in masters) {
        masterSlave = masters[id];
        if (masterSlave.length === 1) {
          lonelyMasters.push(masterSlave[0]);
        } else {
          msGroup.push({
            type: "MasterSlave",
            children: masterSlave
          });
        }
      }
      if (lonelyMasters.length) {
        msGroup.push({
          type: "MasterSlave",
          children: lonelyMasters
        });
      }
      ch = [];
      if (msGroup.length) {
        ch.push({
          type: "MasterSlave_group",
          children: msGroup
        });
      }
      if (lonelySlaves.length) {
        ch.push({
          type: "AWS.RDS.DBInstance_group",
          children: lonelySlaves
        });
      }
      if (normalGroup.length) {
        ch.push({
          type: "AWS.RDS.DBInstance_group",
          children: normalGroup
        });
      }
      return ch;
    };
    ArrangeForAzs = function(children) {
      var ch1, ch2, i, x1, x2, y2;
      if (!children.length) {
        return {
          width: 0,
          height: 0
        };
      }
      if (children.length === 1) {
        return {
          width: children[0].width,
          height: children[0].height
        };
      }
      children.sort(function(a, b) {
        return b.height - a.height;
      });
      i = 0;
      while (i < children.length) {
        ch1 = children[i];
        ch2 = children[i + 1];
        if (ch2 && ch2.width * ch2.height > ch1.width * ch1.height) {
          children[i] = ch2;
          children[i + 1] = ch1;
        }
        i += 2;
      }
      y2 = children[0].height + 15;
      x1 = 0;
      x2 = 0;
      i = 0;
      while (i < children.length) {
        ch1 = children[i];
        ch2 = children[i + 1];
        ch1.y = 0;
        if (ch2) {
          ch1.x = x1;
          x1 += ch1.width + 4;
          ch2.x = x2;
          ch2.y = y2;
          x2 += ch2.width + 4;
        } else {
          if (x1 > x2) {
            ch1.x = x2;
            ch1.y = y2;
            x2 += ch1.width + 4;
          } else {
            ch1.x = x1;
            ch1.y = 0;
            x1 += ch1.width + 4;
          }
        }
        i += 2;
      }
      return {
        width: Math.max(x1, x2) - 4,
        height: children[1].height + y2
      };
    };
    ArrangeForVpc = function(children) {
      var baseX, baseY, ch, childMap, def, elbBaseY, h, height, subnetGroupBaseX, w, width, _i, _j, _len, _len1;
      def = AutoLayoutConfig[constant.RESTYPE.VPC];
      childMap = {};
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        childMap[ch.type] = ch;
      }
      baseX = childMap["AWS.ELB_group"] ? 18 : 5;
      baseY = 4;
      subnetGroupBaseX = baseX;
      ch = childMap["AWS.VPC.RouteTable_group"];
      if (ch) {
        ch.x = baseX;
        ch.y = baseY;
        baseY += ch.height + 3;
      }
      elbBaseY = baseY;
      ch = childMap["AWS.EC2.AvailabilityZone_group"];
      if (ch) {
        ch.x = baseX;
        ch.y = baseY;
        subnetGroupBaseX = baseX + ch.width + 4;
        elbBaseY += ch.children[0].y + ch.children[0].height + 3;
      }
      ch = childMap["AWS.ELB_group"];
      if (ch) {
        ch.x = 5;
        ch.y = elbBaseY;
        if (ch.x + ch.width > subnetGroupBaseX) {
          subnetGroupBaseX = ch.x + ch.width + 4;
        }
      }
      ch = childMap["AWS.RDS.DBSubnetGroup_group"];
      if (ch) {
        ch.x = subnetGroupBaseX;
        ch.y = baseY;
      }
      width = 0;
      height = 0;
      for (_j = 0, _len1 = children.length; _j < _len1; _j++) {
        ch = children[_j];
        w = ch.x + ch.width;
        if (w > width) {
          width = w;
        }
        h = ch.y + ch.height;
        if (h > height) {
          height = h;
        }
      }
      return {
        width: width + 5,
        height: height + 4
      };
    };
    ArrangeForSvg = function(children) {
      var ch, newChs, _i, _len;
      newChs = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.type === "AWS.VPC.VPC_group") {
          newChs.unshift(ch);
        } else {
          newChs.push(ch);
        }
      }
      return CanvasViewLayoutHelpers.DefaultArrangeMethod.call(this, newChs);
    };
    SortForVpc = function(children) {

      /*
       * 1. Main Rtb should be before other RTB.
       * 2. Internet Elb should be before internal Elb
       * 3. Connected Elb should be before none connected Elb
       */
      var ExternalElbs, InternalElbs, ch, col, otherChildren, _i, _len;
      ExternalElbs = [];
      InternalElbs = [];
      otherChildren = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.type === constant.RESTYPE.RT) {
          if (ch.get("main")) {
            otherChildren.unshift(ch);
            continue;
          }
        }
        if (ch.type === constant.RESTYPE.ELB) {
          col = ch.get("internal") ? InternalElbs : ExternalElbs;
          if (ch.connections("ElbAmiAsso").length) {
            col.unshift(ch);
          } else {
            col.push(ch);
          }
          continue;
        }
        otherChildren.push(ch);
      }
      return otherChildren.concat(ExternalElbs, InternalElbs);
    };
    AutoLayoutConfig = AwsCanvasView.prototype.autoLayoutConfig = {
      "SVG": {
        arrangeMethod: ArrangeForSvg,
        space: 6
      },
      "AWS.VPC.CustomerGateway_group": {
        arrangeMethod: "ArrangeVertical",
        space: 2
      },
      "AWS.VPC.VPC": {
        arrangeMethod: ArrangeForVpc,
        space: 4,
        sortMethod: SortForVpc,
        margin: 2,
        width: 60,
        height: 60
      },
      "AWS.VPC.VPNGateway": {
        sticky: true
      },
      "AWS.VPC.InternetGateway": {
        sticky: true
      },
      "AWS.ELB_group": {
        space: 11
      },
      "AWS.ELB": {
        width: 9,
        height: 9
      },
      "AWS.VPC.RouteTable_group": {
        space: 4
      },
      "AWS.VPC.RouteTable": {
        width: 9,
        height: 9
      },
      "AWS.EC2.AvailabilityZone_group": {
        arrangeMethod: ArrangeForAzs
      },
      "AWS.EC2.AvailabilityZone": {
        margin: 2,
        width: 15,
        height: 15
      },
      "AWS.RDS.DBSubnetGroup_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 4
      },
      "AWS.RDS.DBSubnetGroup": {
        groupMethod: GroupMForDbSubnet,
        margin: 2,
        space: 3,
        width: 11,
        height: 11
      },
      "AWS.RDS.DBInstance": {
        width: 9,
        height: 9
      },
      "AWS.RDS.DBInstance_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "MasterSlave": {
        arrangeMethod: "ArrangeVertical",
        space: 2
      },
      "MasterSlave_group": {
        space: 1
      },
      "AWS.AutoScaling.LaunchConfiguration": {
        ignore: true
      },
      "AWS.VPC.NetworkInterface_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 4
      },
      "AWS.VPC.NetworkInterface": {
        width: 9,
        height: 9
      },
      "AWS.EC2.Instance_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "AWS.EC2.Instance": {
        width: 9,
        height: 9
      },
      "AWS.AutoScaling.Group_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "AWS.AutoScaling.Group": {
        width: 13,
        height: 13
      },
      "ExpandedAsg": {
        width: 13,
        height: 13
      },
      "AWS.VPC.Subnet_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      "AWS.VPC.Subnet": {
        groupMethod: GroupMForSubnet,
        margin: 2,
        space: 2,
        width: 13,
        height: 13
      },
      "AWS.VPC.CustomerGateway": {
        width: 17,
        height: 10
      },
      "AmiEniPair": {
        space: 1
      },
      "AmiEniPari_group": {
        arrangeMethod: "ArrangeVertical",
        space: 1
      }
    };
    return null;
  });

}).call(this);
