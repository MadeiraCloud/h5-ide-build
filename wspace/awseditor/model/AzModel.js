(function() {
  define(["GroupModel", "constant", "i18n!/nls/lang.js", "Design"], function(GroupModel, constant, lang, Design) {
    var Model;
    Model = GroupModel.extend({
      type: constant.RESTYPE.AZ,
      isRemovable: function() {
        if (_.some(this.children(), function(sb) {
          return sb.connections("SubnetgAsso").length > 0;
        })) {
          return {
            error: lang.IDE.RDS_MSG_ERR_REMOVE_AZ_FAILED_CAUSEDBY_CHILD_USEDBY_SBG
          };
        }
        if (this.children().length > 0) {
          return sprintf(lang.CANVAS.CVS_CFM_DEL_GROUP, this.get("name"));
        }
        return true;
      },
      createRef: function() {
        return Model.__super__.createRef("ZoneName", true, this.id);
      },
      getAvailableIPCountInSubnet: function(cidr) {
        var child, eni, ipCount, maxIpCount, _i, _len, _ref;
        if (!cidr) {
          return true;
        }
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
      serialize: function() {
        var component, n;
        n = this.get("name");
        component = {
          uid: this.id,
          name: n,
          type: this.type,
          resource: {
            ZoneName: n,
            RegionName: n.substring(0, n.length - 1)
          }
        };
        return {
          layout: this.generateLayout(),
          component: component
        };
      }
    }, {
      handleTypes: constant.RESTYPE.AZ,
      deserialize: function(data, layout_data, resolve) {
        var appId;
        if (!Design.instance().modeIsStack()) {
          appId = data.name;
        }
        new Model({
          id: data.uid,
          name: data.name,
          appId: appId,
          parent: resolve(layout_data.groupUId),
          x: layout_data.coordinate[0],
          y: layout_data.coordinate[1],
          width: layout_data.size[0],
          height: layout_data.size[1]
        });
        return null;
      },
      getAzByName: function(name) {
        var az, _i, _len, _ref;
        _ref = Model.allObjects();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          az = _ref[_i];
          if (az.get("name") === name) {
            return az;
          }
        }
        return null;
      }
    });
    return Model;
  });

}).call(this);
