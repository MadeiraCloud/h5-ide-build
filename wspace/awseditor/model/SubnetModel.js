(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["constant", "Design", "GroupModel", "./connection/RtbAsso", "i18n!/nls/lang.js"], function(constant, Design, GroupModel, RtbAsso, lang) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.SUBNET,
      newNameTmpl: "subnet",
      defaults: {
        cidr: ""
      },
      initialize: function(attributes, option) {
        var Acl, AclAsso, RtbModel, defaultAcl;
        if (!this.attributes.cidr) {
          this.attributes.cidr = this.generateCidr();
        }
        RtbModel = Design.modelClassForType(constant.RESTYPE.RT);
        new RtbAsso(this, RtbModel.getMainRouteTable(), {
          implicit: true
        });
        Acl = Design.modelClassForType(constant.RESTYPE.ACL);
        defaultAcl = Acl.getDefaultAcl();
        if (defaultAcl) {
          AclAsso = Design.modelClassForType("AclAsso");
          new AclAsso(this, defaultAcl);
        }
        return null;
      },
      setCidr: function(cidr) {
        var validCIDR;
        validCIDR = MC.getValidCIDR(cidr);
        this.set("cidr", validCIDR);
        return null;
      },
      setAcl: function(uid) {
        var AclAsso;
        AclAsso = Design.modelClassForType("AclAsso");
        new AclAsso(this, Design.instance().component(uid));
        return null;
      },
      isReparentable: function(newParent) {
        var attach, child, _i, _j, _len, _len1, _ref, _ref1;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.type === constant.RESTYPE.INSTANCE || child.type === constant.RESTYPE.ENI) {
            _ref1 = child.connectionTargets("EniAttachment");
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              attach = _ref1[_j];
              if (attach.parent() !== this) {
                return lang.CANVAS.ERR_MOVE_ATTACHED_ENI;
              }
            }
          }
          if (child.type === constant.RESTYPE.ASG || child.type === "ExpandedAsg") {
            if (child.type === "ExpandedAsg") {
              child = child.get("originalAsg");
            }
            if (child.getExpandAzs().indexOf(newParent) !== -1) {
              return sprintf(lang.CANVAS.ERR_DROP_ASG, child.get("name"), newParent.get("name"));
            }
          }
        }
        return true;
      },
      isRemovable: function() {
        var SBGAsso, ami, az, childAZ, cn, _i, _j, _len, _len1, _ref, _ref1;
        az = this.parent();
        SBGAsso = this.connectionTargets("SubnetgAsso");
        if (SBGAsso.length > 0) {
          return {
            error: sprintf(lang.IDE.RDS_MSG_ERR_REMOVE_SUBNET_FAILED_CAUSEDBY_USEDBY_SBG, this.get("name"), SBGAsso[0].get("name"))
          };
        }
        _ref = this.connections("ElbSubnetAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cn = _ref[_i];
          if (cn.isRemovable() !== true) {
            if (!this.design().modeIsStack()) {
              return {
                error: lang.CANVAS.ERR_DEL_LINKED_ELB
              };
            }
            _ref1 = cn.getOtherTarget(this).connectionTargets("ElbAmiAsso");
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              ami = _ref1[_j];
              if (ami.parent() === this || ami.parent().parent() === this) {
                continue;
              }
              childAZ = ami.parent();
              while (childAZ) {
                if (childAZ === az) {
                  return {
                    error: lang.CANVAS.ERR_DEL_LINKED_ELB
                  };
                }
                childAZ = childAZ.parent();
              }
            }
          }
        }
        return true;
      },
      onParentChanged: function() {
        var elbAsso, sb, _i, _len, _ref;
        elbAsso = this.connections("ElbSubnetAsso")[0];
        if (!elbAsso) {
          return;
        }
        _ref = elbAsso.getTarget(constant.RESTYPE.ELB).connectionTargets("ElbSubnetAsso");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          if (sb.parent() === this.parent()) {
            elbAsso.remove();
            return;
          }
        }
        return null;
      },
      isValidCidr: function(cidr) {
        if (!Model.isInVPCCIDR(this.parent().parent().get("cidr"), cidr)) {
          return {
            error: "" + cidr + " conflicts with VPC CIDR.",
            detail: "Subnet CIDR block should be a subset of VPC's."
          };
        }
        if (this.isCidrConfilctWithSubnets(cidr)) {
          return {
            error: "" + cidr + " conflicts with other subnet.",
            detail: "Please choose a CIDR block not conflicting with existing subnet."
          };
        }
        if (this.getAvailableIPCountInSubnet(cidr) <= 0) {
          return {
            error: "" + cidr + " has not enough IP for the ENIs in this subnet."
          };
        }
        return true;
      },
      isCidrConfilctWithSubnets: function(cidr) {
        var conflict, sb, _i, _len, _ref;
        cidr = cidr || this.get("cidr");
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          sb = _ref[_i];
          if (sb !== this) {
            conflict = Model.isCidrConflict(sb.get("cidr"), cidr);
            if (conflict) {
              return true;
            }
          }
        }
        return false;
      },
      getAvailableIPCountInSubnet: function(cidr) {
        var child, eni, ipCount, maxIpCount, _i, _len, _ref;
        cidr = cidr || this.get("cidr");
        ipCount = 0;
        _ref = this.children();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.type === constant.RESTYPE.INSTANCE) {
            eni = child.getEmbedEni();
          } else if (child.type === constant.RESTYPE.ENI) {
            eni = child;
          } else {
            continue;
          }
          ipCount += eni.get("ips").length * eni.serverGroupCount();
        }
        maxIpCount = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPCountInCIDR(cidr);
        return maxIpCount - ipCount;
      },
      generateCidr: function() {
        var comp, currentSubnetNum, currentVPCCIDR, maxSubnetNum, resultSubnetNum, subnetCIDR, subnetCIDRAry, subnetCIDRIPAry, subnetCIDRIPStr, subnetCIDRSuffix, vpcCIDRAry, vpcCIDRIPStr, vpcCIDRIPStrAry, vpcCIDRSuffix, _i, _len, _ref;
        currentVPCCIDR = this.parent().parent().get("cidr");
        vpcCIDRAry = currentVPCCIDR.split('/');
        vpcCIDRIPStr = vpcCIDRAry[0];
        vpcCIDRIPStrAry = vpcCIDRIPStr.split('.');
        vpcCIDRSuffix = Number(vpcCIDRAry[1]);
        if (vpcCIDRSuffix !== 16) {
          return "";
        }
        maxSubnetNum = -1;
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          comp = _ref[_i];
          subnetCIDR = comp.get("cidr");
          subnetCIDRAry = subnetCIDR.split('/');
          subnetCIDRIPStr = subnetCIDRAry[0];
          subnetCIDRSuffix = Number(subnetCIDRAry[1]);
          subnetCIDRIPAry = subnetCIDRIPStr.split('.');
          currentSubnetNum = Number(subnetCIDRIPAry[2]);
          if (maxSubnetNum < currentSubnetNum) {
            maxSubnetNum = currentSubnetNum;
          }
        }
        resultSubnetNum = maxSubnetNum + 1;
        if (resultSubnetNum > 255) {
          return "";
        }
        vpcCIDRIPStrAry[2] = String(resultSubnetNum);
        return vpcCIDRIPStrAry.join('.') + '/24';
      },
      serialize: function() {
        var component;
        component = {
          name: this.get("name"),
          description: this.get("description") || "",
          type: this.type,
          uid: this.id,
          resource: {
            AvailabilityZone: this.parent().createRef(),
            VpcId: this.parent().parent().createRef("VpcId"),
            SubnetId: this.get("appId"),
            CidrBlock: this.get("cidr")
          }
        };
        return {
          component: component,
          layout: this.generateLayout()
        };
      }
    }, {
      handleTypes: constant.RESTYPE.SUBNET,
      genCIDRPrefixSuffix: function(subnetCIDR) {
        var cutAry, ipAddr, ipAddrAry, resultPrefix, resultSuffix, suffix;
        cutAry = subnetCIDR.split('/');
        ipAddr = cutAry[0];
        suffix = Number(cutAry[1]);
        ipAddrAry = ipAddr.split('.');
        resultPrefix = '';
        resultSuffix = '';
        if (suffix > 23) {
          resultPrefix = ipAddrAry[0] + '.' + ipAddrAry[1] + '.' + ipAddrAry[2] + '.';
          resultSuffix = 'x';
        } else {
          resultPrefix = ipAddrAry[0] + '.' + ipAddrAry[1] + '.';
          resultSuffix = 'x.x';
        }
        return [resultPrefix, resultSuffix];
      },
      isIPInSubnet: function(ipAddr, subnetCIDR, reservedRange) {
        var filterAry, ipAddrBinStr, ipAddrBinStrDiv, ipAddrBinStrDivAnti, isValid, readyAssignAry, readyAssignAryLength, result, subnetAddrAry, subnetIPAry, subnetIPBinStr, subnetIPBinStrDiv, subnetSuffix, suffixLength, suffixOneStr, suffixOneStrNum, suffixZeroAry, suffixZeroStr, suffixZeroStrNum, _i, _j, _ref, _ref1, _results, _results1;
        if (!reservedRange) {
          reservedRange = [0, 1, 2, 3];
        }
        isValid = true;
        subnetIPAry = subnetCIDR.split('/');
        subnetSuffix = Number(subnetIPAry[1]);
        subnetAddrAry = subnetIPAry[0].split('.');
        subnetIPBinStr = MC.getCidrBinStr(subnetIPAry[0]);
        subnetIPBinStrDiv = subnetIPBinStr.slice(0, subnetSuffix);
        ipAddrBinStr = MC.getCidrBinStr(ipAddr);
        ipAddrBinStrDiv = ipAddrBinStr.slice(0, subnetSuffix);
        ipAddrBinStrDivAnti = ipAddrBinStr.slice(subnetSuffix);
        suffixLength = 32 - subnetSuffix;
        suffixZeroAry = _.map((function() {
          _results = [];
          for (var _i = 1, _ref = suffixLength + 1; 1 <= _ref ? _i < _ref : _i > _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this), function() {
          return '0';
        });
        suffixZeroStr = suffixZeroAry.join('');
        suffixOneStr = suffixZeroStr.replace(/0/g, '1');
        suffixZeroStrNum = parseInt(suffixZeroStr, 2);
        suffixOneStrNum = parseInt(suffixOneStr, 2);
        readyAssignAry = (function() {
          _results1 = [];
          for (var _j = suffixZeroStrNum, _ref1 = suffixOneStrNum + 1; suffixZeroStrNum <= _ref1 ? _j < _ref1 : _j > _ref1; suffixZeroStrNum <= _ref1 ? _j++ : _j--){ _results1.push(_j); }
          return _results1;
        }).apply(this);
        readyAssignAryLength = readyAssignAry.length;
        result = false;
        filterAry = [];
        _.each(readyAssignAry, function(value, idx) {
          var filterRange, newIPBinStr;
          newIPBinStr = MC.leftPadString(value.toString(2), suffixLength, "0");
          filterRange = reservedRange.concat([readyAssignAryLength - 1]);
          if (__indexOf.call(filterRange, idx) >= 0) {
            filterAry.push(newIPBinStr);
          }
          return null;
        });
        if (__indexOf.call(filterAry, ipAddrBinStrDivAnti) >= 0) {
          return {
            isValid: false,
            isReserved: true
          };
        }
        isValid = subnetIPBinStrDiv === ipAddrBinStrDiv;
        return {
          isValid: isValid,
          isReserved: false
        };
      },
      isCidrConflict: function(ipCidr1, ipCidr2) {
        var ipCidr1BinStr, ipCidr1Suffix, ipCidr2BinStr, ipCidr2Suffix, minIpCidrSuffix;
        ipCidr1BinStr = MC.getCidrBinStr(ipCidr1);
        ipCidr2BinStr = MC.getCidrBinStr(ipCidr2);
        ipCidr1Suffix = Number(ipCidr1.split('/')[1]);
        ipCidr2Suffix = Number(ipCidr2.split('/')[1]);
        if (ipCidr1Suffix === 0 && (ipCidr1Suffix === ipCidr2Suffix)) {
          return true;
        }
        minIpCidrSuffix = ipCidr1Suffix;
        if (ipCidr1Suffix > ipCidr2Suffix) {
          minIpCidrSuffix = ipCidr2Suffix;
        }
        if (ipCidr1BinStr.slice(0, minIpCidrSuffix) === ipCidr2BinStr.slice(0, minIpCidrSuffix) && minIpCidrSuffix !== 0) {
          return true;
        } else {
          return false;
        }
      },
      isInVPCCIDR: function(vpcCIDR, subnetCIDR) {
        if (!this.isCidrConflict(vpcCIDR, subnetCIDR)) {
          return false;
        }
        return Number(subnetCIDR.split('/')[1]) >= Number(vpcCIDR.split('/')[1]);
      },
      isValidSubnetCIDR: function(subnetCIDR) {
        var subnetCidrBinStr, subnetCidrSuffix, suffixIPBinStr, suffixNum;
        subnetCidrBinStr = MC.getCidrBinStr(subnetCIDR);
        subnetCidrSuffix = Number(subnetCIDR.split('/')[1]);
        suffixIPBinStr = subnetCidrBinStr.slice(subnetCidrSuffix);
        suffixNum = parseInt(suffixIPBinStr);
        if ((suffixNum === 0) || (suffixIPBinStr === '')) {
          return true;
        }
        return false;
      },
      autoAssignAllCIDR: function(vpcCIDR, subnetCount) {
        var binSeq, i, needBinNum, newIPAry, newIPStr, newSubnetAry, newSubnetBinStr, newSubnetStr, newSubnetSuffix, vpcIPBinLeftStr, vpcIPBinStr, vpcIPSuffix;
        needBinNum = Math.ceil((Math.log(subnetCount)) / (Math.log(2)));
        vpcIPSuffix = Number(vpcCIDR.split('/')[1]);
        vpcIPBinStr = MC.getCidrBinStr(vpcCIDR);
        vpcIPBinLeftStr = vpcIPBinStr.slice(0, vpcIPSuffix);
        newSubnetSuffix = vpcIPSuffix + needBinNum;
        newSubnetAry = [];
        i = 0;
        while (i < subnetCount) {
          binSeq = MC.leftPadString(i.toString(2), needBinNum, "0");
          newSubnetBinStr = MC.rightPadString(vpcIPBinLeftStr + binSeq, 32, "0");
          newIPAry = _.map([0, 8, 16, 24], function(value) {
            return parseInt(newSubnetBinStr.slice(value, value + 8), 2);
          });
          newIPStr = newIPAry.join('.');
          newSubnetStr = newIPStr + '/' + newSubnetSuffix;
          newSubnetAry.push(newSubnetStr);
          ++i;
        }
        return newSubnetAry;
      },
      autoAssignSimpleCIDR: function(newVPCCIDR, oldSubnetAry, oldVPCCIDR) {
        var newSubnetAry, oldVPCCIDRSuffix, vpcCIDRAry, vpcCIDRIPStr, vpcCIDRSuffix, vpcIP1, vpcIP2, vpcIP3, vpcIPAry;
        newSubnetAry = [];
        vpcCIDRAry = newVPCCIDR.split('/');
        vpcCIDRIPStr = vpcCIDRAry[0];
        vpcCIDRSuffix = Number(vpcCIDRAry[1]);
        vpcIPAry = vpcCIDRIPStr.split('.');
        oldVPCCIDRSuffix = Number(oldVPCCIDR.split('/')[1]);
        if (vpcCIDRSuffix === 16 || (vpcCIDRSuffix === 24 && oldVPCCIDRSuffix === vpcCIDRSuffix)) {
          vpcIP1 = vpcIPAry[0];
          vpcIP2 = vpcIPAry[1];
          vpcIP3 = vpcIPAry[2];
          _.each(oldSubnetAry, function(subnetCIDR) {
            var newSubnetCIDR, subnetCIDRAry, subnetCIDRIPStr, subnetCIDRSuffix, subnetIPAry;
            subnetCIDRAry = subnetCIDR.split('/');
            subnetCIDRIPStr = subnetCIDRAry[0];
            subnetCIDRSuffix = Number(subnetCIDRAry[1]);
            subnetIPAry = subnetCIDRIPStr.split('.');
            subnetIPAry[0] = vpcIP1;
            subnetIPAry[1] = vpcIP2;
            if (vpcCIDRSuffix === 24) {
              subnetIPAry[2] = vpcIP3;
            }
            newSubnetCIDR = subnetIPAry.join('.') + '/' + subnetCIDRSuffix;
            newSubnetAry.push(newSubnetCIDR);
            return null;
          });
        }
        return newSubnetAry;
      },
      deserialize: function(data, layout_data, resolve) {
        new Model({
          id: data.uid,
          name: data.name,
          description: data.description || "",
          appId: data.resource.SubnetId,
          cidr: data.resource.CidrBlock,
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1],
          parent: resolve(layout_data.groupUId)
        });
        return null;
      }
    });
    return Model;
  });

}).call(this);
