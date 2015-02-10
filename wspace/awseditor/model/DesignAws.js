(function() {
  define(["Design", "constant", 'CloudResources'], function(Design, constant, CloudResources) {
    var AwsDesign;
    AwsDesign = Design.extend({
      serialize: function(options) {
        var json;
        json = Design.prototype.serialize.apply(this, arguments);
        json.property.stoppable = this.isStoppable();
        return json;
      },
      preserveName: function() {
        var comp, names, uid, _ref;
        if (!this.modeIsAppEdit()) {
          return;
        }
        this.__preservedNames = {};
        _ref = this.__componentMap;
        for (uid in _ref) {
          comp = _ref[uid];
          switch (comp.type) {
            case constant.RESTYPE.ELB:
            case constant.RESTYPE.ASG:
            case constant.RESTYPE.LC:
            case constant.RESTYPE.DBINSTANCE:
              names = this.__preservedNames[comp.type] || (this.__preservedNames[comp.type] = {});
              names[comp.get("name")] = true;
          }
        }
      },
      isStoppable: function() {
        var InstanceModel, LcModel, allObjects, ami, bdm, comp, ins, instanceAry, vpc, vpcId, _i, _j, _k, _len, _len1, _len2, _ref;
        InstanceModel = Design.modelClassForType(constant.RESTYPE.INSTANCE);
        LcModel = Design.modelClassForType(constant.RESTYPE.LC);
        allObjects = InstanceModel.allObjects(this).concat(LcModel.allObjects(this));
        for (_i = 0, _len = allObjects.length; _i < _len; _i++) {
          comp = allObjects[_i];
          ami = comp.getAmi() || comp.get("cachedAmi");
          if (ami && ami.rootDeviceType === 'instance-store') {
            return false;
          }
        }
        vpc = Design.modelClassForType(constant.RESTYPE.VPC).allObjects(this);
        if (vpc.length > 0) {
          vpcId = vpc[0].get("appId");
          instanceAry = CloudResources(this.credentialId(), constant.RESTYPE.INSTANCE, this.region()).filter(function(m) {
            return m.get("vpcId") === vpcId;
          });
          for (_j = 0, _len1 = instanceAry.length; _j < _len1; _j++) {
            ins = instanceAry[_j];
            ins = ins.attributes;
            _ref = ins.blockDeviceMapping || [];
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              bdm = _ref[_k];
              if (bdm.ebs === null && bdm.VirtualName) {
                return false;
              }
            }
          }
        }
        return true;
      },
      instancesNoUserData: function() {
        var instanceModels, lcModels, result;
        result = true;
        instanceModels = Design.modelClassForType(constant.RESTYPE.INSTANCE).allObjects();
        _.each(instanceModels, function(instanceModel) {
          result = instanceModel.get('userData') ? false : true;
          return null;
        });
        lcModels = Design.modelClassForType(constant.RESTYPE.LC).allObjects();
        _.each(lcModels, function(lcModel) {
          result = lcModel.get('userData') ? false : true;
          return null;
        });
        return result;
      },
      getCost: function(stopped) {
        var c, comp, cost, costList, currency, e, priceMap, totalFee, uid, _i, _len, _ref, _ref1;
        costList = [];
        totalFee = 0;
        priceMap = App.model.getPriceData(this.region());
        if (priceMap) {
          currency = priceMap.currency || 'USD';
          _ref = this.__componentMap;
          for (uid in _ref) {
            comp = _ref[uid];
            if (stopped && !((_ref1 = comp.type) === constant.RESTYPE.EIP || _ref1 === constant.RESTYPE.VOL || _ref1 === constant.RESTYPE.ELB || _ref1 === constant.RESTYPE.CW)) {
              continue;
            }
            if (comp.getCost) {
              cost = null;
              try {
                cost = comp.getCost(priceMap, currency);
              } catch (_error) {
                e = _error;
                console.error("Error occured when calc-ing price:", e);
              }
              if (!cost) {
                continue;
              }
              if (cost.length) {
                for (_i = 0, _len = cost.length; _i < _len; _i++) {
                  c = cost[_i];
                  totalFee += c.fee;
                  costList.push(c);
                }
              } else {
                totalFee += cost.fee;
                costList.push(cost);
              }
            }
          }
          costList = _.sortBy(costList, "resource");
        }
        return {
          costList: costList,
          totalFee: Math.round(totalFee * 100) / 100
        };
      },
      getCurrency: function() {
        var currency, _ref;
        currency = "$";
        if ((_ref = Design.instance().region()) === "cn-north-1") {
          currency = "￥";
        }
        return currency;
      }
    });
    return AwsDesign;
  });

}).call(this);
