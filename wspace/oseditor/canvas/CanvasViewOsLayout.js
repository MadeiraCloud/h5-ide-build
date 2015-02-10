(function() {
  define(["./CanvasViewOs", "CanvasViewLayout", "constant"], function(OsCanvasView, CanvasViewLayoutHelpers, constant) {
    var ArrangeForRtGroup, ArrangeForSubnetGroup, ArrangeForSvg, AutoLayoutConfig, GroupMForSubnet, SortForSvg, SubnetPosCache;
    SubnetPosCache = null;
    GroupMForSubnet = function(children) {
      var ch, elbChildren, group, i, idx, pool, poolGroup, portGroup, serverGroup, subnetChildren, v, vip, vipGroup, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      group = CanvasViewLayoutHelpers.DefaultGroupMethod.call(this, children);
      subnetChildren = [];
      serverGroup = portGroup = vipGroup = poolGroup = [];
      for (_i = 0, _len = group.length; _i < _len; _i++) {
        ch = group[_i];
        if (ch.type === "OS::Nova::Server_group") {
          subnetChildren.push(ch);
        } else if (ch.type === "OS::Neutron::Port_group") {
          portGroup = ch.children;
        } else if (ch.type === "OS::Neutron::VIP_group") {
          vipGroup = ch.children;
        } else if (ch.type === "OS::Neutron::Pool_group") {
          poolGroup = ch.children;
        }
      }
      elbChildren = [];
      for (_j = 0, _len1 = poolGroup.length; _j < _len1; _j++) {
        pool = poolGroup[_j];
        vip = pool.component.connectionTargets("OsListenerAsso")[0];
        idx = -1;
        for (i = _k = 0, _len2 = vipGroup.length; _k < _len2; i = ++_k) {
          v = vipGroup[i];
          if (v.component === vip) {
            idx = i;
            break;
          }
        }
        if (idx >= 0) {
          vipGroup.splice(idx, 1);
          elbChildren.push({
            type: "ELB_pair",
            children: [pool, v]
          });
        } else {
          elbChildren.push(pool);
        }
      }
      for (_l = 0, _len3 = vipGroup.length; _l < _len3; _l++) {
        vip = vipGroup[_l];
        elbChildren.push(vip);
      }
      if (elbChildren.length) {
        subnetChildren.push({
          type: "ELB_group",
          children: elbChildren
        });
      }
      if (portGroup.length) {
        subnetChildren.push({
          type: "OS::Neutron::Port_group",
          children: portGroup
        });
      }
      return subnetChildren;
    };
    SortForSvg = function(children) {
      var ch, newChs, _i, _len;
      newChs = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.type === "OS::Neutron::Router") {
          newChs.push(ch);
        } else {
          newChs.unshift(ch);
        }
      }
      return newChs;
    };
    ArrangeForSvg = function(children) {
      var ch, newChs, _i, _len;
      newChs = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        ch = children[_i];
        if (ch.type === "OS::Neutron::Router_group") {
          newChs.unshift(ch);
        } else {
          newChs.push(ch);
        }
      }
      return CanvasViewLayoutHelpers.DefaultArrangeMethod.call(this, newChs);
    };
    ArrangeForSubnetGroup = function(children) {
      var ch, ch2, idx, x1, x2, y1, y2, _i, _j, _len, _len1;
      children.sort(function(a, b) {
        return b.children.length - a.children.length;
      });
      SubnetPosCache = {};
      x1 = -2;
      x2 = -2;
      y1 = 0;
      y2 = 0;
      ch2 = [];
      for (idx = _i = 0, _len = children.length; _i < _len; idx = ++_i) {
        ch = children[idx];
        if (idx % 2 === 0) {
          ch.y = 0;
          ch.x = x1 + 2;
          x1 = ch.x + ch.width;
          if (ch.height > y1) {
            y1 = ch.height;
          }
        } else {
          ch2.push(ch);
          ch.x = x2 + 2;
          x2 = ch.x + ch.width;
          if (ch.height > y2) {
            y2 = ch.height;
          }
        }
      }
      for (_j = 0, _len1 = ch2.length; _j < _len1; _j++) {
        ch = ch2[_j];
        SubnetPosCache[ch.component.id] = ch.y = y1 + 2;
      }
      SubnetPosCache.y = y1 + 2;
      return {
        width: Math.max(x1, x2),
        height: y1 + 2 + y2
      };
    };
    ArrangeForRtGroup = function(children) {
      var firstLine, rt, subnet, x1, x2, _i, _j, _len, _len1, _ref;
      x1 = -2;
      x2 = -2;
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        rt = children[_i];
        firstLine = false;
        _ref = rt.component.connectionTargets("OsRouterAsso");
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          subnet = _ref[_j];
          if (!SubnetPosCache[subnet.id]) {
            firstLine = true;
            break;
          }
        }
        if (firstLine) {
          x1 += 2;
          rt.x = x1;
          x1 += 8;
          rt.y = 0;
        } else {
          x2 += 2;
          rt.x = x2;
          x2 += 8;
          rt.y = SubnetPosCache.y;
        }
      }
      return {
        width: Math.max(x1, x2),
        height: SubnetPosCache.y + 8
      };
    };
    AutoLayoutConfig = OsCanvasView.prototype.autoLayoutConfig = {
      "SVG": {
        sortMethod: SortForSvg,
        arrangeMethod: ArrangeForSvg,
        space: 6
      },
      "OS::Neutron::Network": {
        space: 4,
        margin: 3,
        width: 60,
        height: 60
      },
      "OS::Neutron::Router_group": {
        arrangeMethod: ArrangeForRtGroup,
        space: 4
      },
      "OS::Neutron::Router": {
        width: 8,
        height: 8
      },
      "OS::Neutron::Subnet_group": {
        arrangeMethod: ArrangeForSubnetGroup,
        space: 2
      },
      "OS::Neutron::Subnet": {
        groupMethod: GroupMForSubnet,
        arrangeMethod: "ArrangeVertical",
        space: 2,
        margin: 2,
        width: 8,
        height: 8
      },
      "OS::Nova::Server_group": {
        space: 2
      },
      "OS::Nova::Server": {
        width: 8,
        height: 8
      },
      "OS::Neutron::Port": {
        width: 8,
        height: 8
      },
      "OS::Neutron::VIP": {
        width: 8,
        height: 8
      },
      "OS::Neutron::Pool": {
        width: 8,
        height: 8
      },
      "ELB_group": {
        arrangeMethod: "ArrangeBinPack",
        space: 2
      },
      'ELB_pair': {
        space: 2
      }
    };
    return null;
  });

}).call(this);
