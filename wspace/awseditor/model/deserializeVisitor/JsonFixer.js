(function() {
  define(["../DesignAws"], function(Design) {
    Design.registerDeserializeVisitor(function(data, layout_data, version) {
      var az, azArr, azMap, checkObj, comp, uid, _i, _len;
      if (version >= "2014-01-25") {
        return;
      }
      azMap = {};
      azArr = [];
      for (uid in layout_data) {
        comp = layout_data[uid];
        if (comp.type === "AWS.EC2.AvailabilityZone") {
          if (comp.groupUId === "Canvas") {
            delete comp.groupUId;
          }
          azArr.push({
            uid: uid,
            type: "AWS.EC2.AvailabilityZone",
            name: comp.name
          });
          azMap[comp.name] = MC.genResRef(uid, 'name');
        } else if (comp.type === "AWS.AutoScaling.Group") {
          if (comp.originalId) {
            data[uid] = {
              type: "ExpandedAsg",
              uid: uid
            };
          }
        }
      }
      checkObj = function(obj) {
        var attr, d, dd, idx, _i, _len;
        for (attr in obj) {
          d = obj[attr];
          if (_.isString(d)) {
            if (d === "true") {
              obj[attr] = true;
            } else if (d === "false") {
              obj[attr] = false;
            } else if (azMap[d]) {
              obj[attr] = azMap[d];
            }
          } else if (_.isArray(d)) {
            for (idx = _i = 0, _len = d.length; _i < _len; idx = ++_i) {
              dd = d[idx];
              if (_.isObject(dd)) {
                checkObj(dd);
              }
              if (_.isString(dd)) {
                if (d === "true") {
                  d[idx] = true;
                } else if (d === "false") {
                  d[idx] = false;
                } else if (azMap[d]) {
                  d[idx] = azMap[d];
                }
              }
            }
          } else if (_.isObject(d)) {
            checkObj(d);
          }
        }
        return null;
      };
      for (uid in data) {
        comp = data[uid];
        checkObj(comp);
      }
      for (_i = 0, _len = azArr.length; _i < _len; _i++) {
        az = azArr[_i];
        data[az.uid] = az;
      }
      return null;
    });
    return null;
  });

}).call(this);
