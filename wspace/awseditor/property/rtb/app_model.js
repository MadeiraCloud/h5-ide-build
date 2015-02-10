(function() {
  define(['../base/model', 'constant', 'Design', 'CloudResources'], function(PropertyModel, constant, Design, CloudResources) {
    var RTBAppModel;
    RTBAppModel = PropertyModel.extend({
      processTarget: function(rtb) {
        rtb.routeSet = _.map(rtb.routeSet, function(item) {
          item.target = item.instanceId || item.networkInterfaceId || item.gatewayId || item.vpcPeeringConnectionId;
          if (item.target !== "local") {
            Design.instance().eachComponent(function(component) {
              if (component.get("appId") === item.target) {
                item.target = component.get("name");
                return;
              }
              return null;
            });
          }
          return item;
        });
        return null;
      },
      init: function(rtb_uid) {
        var asso, connectedTo, data, has_main, has_subnet, i, key, propagate, routeTable, rtb, rtbOrConn, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4;
        rtbOrConn = Design.instance().component(rtb_uid);
        if (rtbOrConn.type === constant.RESTYPE.RT) {
          routeTable = rtbOrConn;
        } else {
          data = {};
          connectedTo = rtbOrConn.getOtherTarget(constant.RESTYPE.RT);
          routeTable = rtbOrConn.getTarget(constant.RESTYPE.RT);
          if (connectedTo.type === constant.RESTYPE.SUBNET) {
            data.subnet = connectedTo.get('name');
            has_subnet = true;
          }
          data.rtb = routeTable.get('name');
          rtb_uid = routeTable.id;
          if (has_subnet) {
            this.set('association', data);
            this.set('name', 'Subnet-RT Association');
            return;
          }
        }
        rtb = (_ref = CloudResources(Design.instance().credentialId(), constant.RESTYPE.RT, Design.instance().region()).get(routeTable.get('appId'))) != null ? _ref.toJSON() : void 0;
        if (!rtb) {
          return false;
        }
        rtb = $.extend(true, {}, rtb);
        rtb.name = routeTable.get('name');
        rtb.description = routeTable.get('description');
        has_main = false;
        if (rtb.associationSet && rtb.associationSet.length) {
          _ref1 = rtb.associationSet;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            asso = _ref1[_i];
            if (asso.main === true) {
              has_main = true;
            }
          }
        }
        if (has_main) {
          rtb.main = "Yes";
        } else {
          rtb.main = "No";
        }
        _ref2 = rtb.routeSet;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          i = _ref2[_j];
          if (i.state === "active") {
            i.active = true;
          }
        }
        propagate = {};
        if (rtb.propagatingVgwSet && rtb.propagatingVgwSet.length) {
          _ref3 = rtb.propagatingVgwSet;
          for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
            i = _ref3[_k];
            propagate[i.gatewayId] = true;
          }
        }
        _ref4 = rtb.routeSet;
        for (key = _l = 0, _len3 = _ref4.length; _l < _len3; key = ++_l) {
          value = _ref4[key];
          if (propagate[value.gatewayId]) {
            value.propagate = true;
          }
        }
        this.processTarget(rtb);
        return this.set(rtb);
      }
    });
    return new RTBAppModel();
  });

}).call(this);
