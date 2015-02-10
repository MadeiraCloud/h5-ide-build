(function() {
  define(["constant", "ConnectionModel", "i18n!/nls/lang.js", "Design", "SGRulePopup"], function(constant, ConnectionModel, lang, Design, SGRulePopup) {
    var ElbAmiAsso, ElbSubnetAsso;
    ElbSubnetAsso = ConnectionModel.extend({
      type: "ElbSubnetAsso",
      defaults: {
        deserialized: false
      },
      portDefs: [
        {
          port1: {
            name: "elb-assoc",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "subnet-assoc-in",
            type: constant.RESTYPE.SUBNET
          }
        }
      ],
      initialize: function() {
        var az, cn, newSubnet, _i, _len, _ref;
        newSubnet = this.getTarget(constant.RESTYPE.SUBNET);
        az = newSubnet.parent();
        _ref = this.getTarget(constant.RESTYPE.ELB).connections("ElbSubnetAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.getTarget(constant.RESTYPE.SUBNET).parent() === az) {
            if (cn.hasAppUpdateRestriction()) {
              this.setDestroyAfterInit();
            } else {
              cn.remove();
            }
          }
        }
        return null;
      },
      hasAppUpdateRestriction: function() {
        var asso, elb, _i, _len, _ref;
        elb = this.getTarget(constant.RESTYPE.ELB);
        if (this.design().modeIsAppEdit() && this.get("deserialized")) {
          _ref = elb.connections("ElbSubnetAsso");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            asso = _ref[_i];
            if (asso !== this && asso.get("deserialized")) {
              return false;
            }
          }
          return true;
        }
        return false;
      },
      isRemovable: function() {
        var az, child, childAZ, connected, elb, sb, subnet, _i, _j, _len, _len1, _ref, _ref1;
        if (this.design().modeIsAppEdit()) {
          if (this.hasAppUpdateRestriction()) {
            return {
              error: lang.CANVAS.ERR_DEL_ELB_LINE_2
            };
          }
        }
        elb = this.getTarget(constant.RESTYPE.ELB);
        subnet = this.getTarget(constant.RESTYPE.SUBNET);
        az = subnet.parent();
        _ref = elb.connectionTargets("ElbAmiAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          childAZ = child.parent();
          while (childAZ) {
            if (childAZ.type === constant.RESTYPE.AZ) {
              break;
            }
            childAZ = childAZ.parent();
          }
          if (!childAZ) {
            continue;
          }
          if (childAZ === az) {
            connected = true;
            break;
          }
        }
        if (!connected) {
          return true;
        }
        _ref1 = elb.connectionTargets("ElbSubnetAsso");
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          sb = _ref1[_j];
          if (sb !== subnet && sb.parent() === az) {
            connected = false;
            break;
          }
        }
        if (connected) {
          return {
            error: lang.CANVAS.ERR_DEL_ELB_LINE_2
          };
        }
        return true;
      }
    }, {});
    ElbAmiAsso = ConnectionModel.extend({
      type: "ElbAmiAsso",
      portDefs: [
        {
          port1: {
            name: "elb-sg-out",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "instance-sg",
            type: constant.RESTYPE.INSTANCE
          }
        }, {
          port1: {
            name: "elb-sg-out",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "launchconfig-sg",
            type: constant.RESTYPE.LC
          }
        }, {
          port1: {
            name: "elb-sg-out",
            type: constant.RESTYPE.ELB
          },
          port2: {
            name: "launchconfig-sg",
            type: "ExpandedAsg"
          }
        }
      ],
      initialize: function(attibutes, option) {
        var ami, connectedSbs, elb, foundSubnet, sb, _i, _len, _ref;
        ami = this.getOtherTarget(constant.RESTYPE.ELB);
        elb = this.getTarget(constant.RESTYPE.ELB);
        if (ami.type === constant.RESTYPE.LC) {
          this.listenTo(ami, "change:expandedList", this.updateLcSubnetAsso);
          this.listenTo(ami, "change:connections", this.updateLcSubnetAssoIfNeeded);
          if (option.createByUser) {
            this.updateLcSubnetAsso();
          }
        } else {
          connectedSbs = elb.connectionTargets("ElbSubnetAsso");
          _ref = ami.parent().parent().children();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            sb = _ref[_i];
            if (connectedSbs.indexOf(sb) !== -1) {
              foundSubnet = true;
              break;
            }
          }
          if (!foundSubnet) {
            new ElbSubnetAsso(ami.parent(), elb);
          }
        }
      },
      updateLcSubnetAssoIfNeeded: function(cn) {
        if (cn.type === "LcUsage") {
          return this.updateLcSubnetAsso();
        }
      },
      updateLcSubnetAsso: function() {
        var asg, asgs, az, azMap, azName, azs, e, elb, lc, subnet, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2;
        if (this.design().initializing()) {
          return;
        }
        elb = this.getTarget(constant.RESTYPE.ELB);
        lc = this.getTarget(constant.RESTYPE.LC);
        azs = lc.design().componentsOfType(constant.RESTYPE.AZ);
        azMap = {};
        for (_i = 0, _len = azs.length; _i < _len; _i++) {
          az = azs[_i];
          azName = az.get("name");
          _ref = az.children();
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            subnet = _ref[_j];
            _ref1 = subnet.connectionTargets("ElbSubnetAsso");
            for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
              e = _ref1[_k];
              if (e === elb) {
                azMap[azName] = true;
                break;
              }
            }
            if (azMap[azName]) {
              break;
            }
          }
        }
        _ref2 = lc.connectionTargets("LcUsage");
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          asg = _ref2[_l];
          asgs = asg.get("expandedList").slice(0);
          asgs.push(asg);
          for (_m = 0, _len4 = asgs.length; _m < _len4; _m++) {
            asg = asgs[_m];
            azName = asg.parent().parent().get("name");
            if (!azMap[azName]) {
              new ElbSubnetAsso(asg.parent(), elb);
              azMap[azName] = true;
            }
          }
        }
      },
      serialize: function(components) {
        var elb, i, instance, instanceArray, _i, _len, _ref;
        instance = this.getTarget(constant.RESTYPE.INSTANCE);
        if (!instance) {
          return;
        }
        elb = this.getTarget(constant.RESTYPE.ELB);
        instanceArray = components[elb.id].resource.Instances;
        _ref = instance.getRealGroupMemberIds();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          instanceArray.push({
            InstanceId: this.createRef("InstanceId", i)
          });
        }
        return null;
      }
    }, {
      isConnectable: function(comp1, comp2) {
        var lc;
        if (comp1.design().modeIsAppEdit()) {
          if (comp1.type === constant.RESTYPE.LC) {
            lc = comp1;
          } else if (comp2.type === constant.RESTYPE.LC) {
            lc = comp2;
          }
          if (lc && lc.get("appId")) {
            return lang.NOTIFY.WARN_ASG_CAN_ONLY_CONNECT_TO_ELB_ON_LAUNCH;
          }
        }
        return true;
      }
    });
    return null;
  });

}).call(this);
