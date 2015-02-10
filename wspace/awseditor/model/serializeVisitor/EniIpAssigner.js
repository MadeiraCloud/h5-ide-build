(function() {
  define(["../DesignAws", "constant"], function(Design, constant) {
    var generateIpForEnis, prepareEniData;
    prepareEniData = function(uid, eniArray) {
      var AzModel, eni, ip, ipSet, reserveIpSet, subnet, subnetCid, _i, _j, _len, _len1, _ref;
      subnet = Design.instance().component(uid);
      AzModel = Design.modelClassForType(constant.RESTYPE.AZ);
      console.assert(subnet, "Cannot find eni's subnet when assigning Eni's ip.");
      subnetCid = subnet.get("cidr");
      if (!subnetCid) {
        console.error("Cannot found cidr when assigning Eni Ip");
        return;
      }
      ipSet = [];
      reserveIpSet = [];
      for (_i = 0, _len = eniArray.length; _i < _len; _i++) {
        eni = eniArray[_i];
        _ref = eni.resource.PrivateIpAddressSet;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          ip = _ref[_j];
          if (ip.AutoAssign === true) {
            ipSet.push(ip);
          } else {
            reserveIpSet.push(ip.PrivateIpAddress);
          }
        }
      }
      return {
        subnetCid: subnetCid,
        ipSet: ipSet,
        reserveIpSet: reserveIpSet
      };
    };
    generateIpForEnis = function(data) {
      var idx, ip, validIpSet, _i, _len, _ref;
      validIpSet = Design.modelClassForType(constant.RESTYPE.ENI).getAvailableIPInCIDR(data.subnetCid, data.reserveIpSet, data.ipSet.length);
      validIpSet = _.filter(validIpSet, function(ip) {
        return ip.available;
      });
      _ref = data.ipSet;
      for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
        ip = _ref[idx];
        if (validIpSet[idx]) {
          ip.PrivateIpAddress = validIpSet[idx].ip;
        } else {
          ip.PrivateIpAddress = "";
        }
      }
      return null;
    };
    Design.registerSerializeVisitor(function(components) {
      var array, comp, data, eniArray, key, subnetEnisMap, uid;
      if (Design.instance().modeIsApp()) {
        return;
      }
      subnetEnisMap = {};
      for (uid in components) {
        comp = components[uid];
        if (comp.type === constant.RESTYPE.ENI) {
          if (comp.resource.SubnetId && comp.resource.SubnetId[0] === "@") {
            key = comp.resource.SubnetId;
          } else {
            key = comp.resource.AvailabilityZone;
          }
          array = subnetEnisMap[key];
          if (!array) {
            array = subnetEnisMap[key] = [];
          }
          array.splice(_.sortedIndex(array, comp, "name"), 0, comp);
        }
      }
      for (uid in subnetEnisMap) {
        eniArray = subnetEnisMap[uid];
        uid = MC.extractID(uid);
        data = prepareEniData(uid, eniArray);
        if (data) {
          generateIpForEnis(data);
        }
      }
      return null;
    });
    return null;
  });

}).call(this);
