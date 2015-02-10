(function() {
  define(['../base/model', 'constant', "Design", 'i18n!/nls/lang.js', 'CloudResources'], function(PropertyModel, constant, Design, lang, CloudResources) {
    var ENIModel;
    ENIModel = PropertyModel.extend({
      defaults: {
        'uid': null,
        'isAppEdit': false
      },
      init: function(uid) {
        var component, data;
        component = Design.instance().component(uid);
        data = {
          uid: uid,
          name: component.get("name"),
          desc: component.get("description"),
          sourceDestCheck: component.get("sourceDestCheck"),
          isAppEdit: this.isAppEdit,
          isGroupMode: this.isGroupMode,
          attached: component.connections("EniAttachment").length > 0,
          description: component.get("description")
        };
        this.set(data);
        this.getIpList();
        if (this.isAppEdit) {
          this.getEniGroup(uid);
        }
        return null;
      },
      getIpList: function() {
        var ips;
        ips = Design.instance().component(this.get("uid")).getIpArray();
        ips[0].unDeletable = true;
        if (this.isAppEdit) {
          ips[0].editable = false;
        }
        this.set("ips", ips);
        return null;
      },
      setEniDesc: function(value) {
        Design.instance().component(this.get("uid")).set("description", value);
        return null;
      },
      setSourceDestCheck: function(value) {
        Design.instance().component(this.get("uid")).set("sourceDestCheck", value);
        return null;
      },
      attachEip: function(eip_index, attach) {
        Design.instance().component(this.get("uid")).setIp(eip_index, null, null, attach);
        this.attributes.ips[eip_index].hasEip = attach;
        if (attach) {
          Design.modelClassForType(constant.RESTYPE.IGW).tryCreateIgw();
        }
        return null;
      },
      removeIp: function(index) {
        Design.instance().component(this.get("uid")).removeIp(index);
        return null;
      },
      getEniGroup: function(eni_uid) {
        var appData, count, eni, eniComp, existingLength, group, idx, index, member, members, name, resource_list, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
        eniComp = Design.instance().component(eni_uid);
        resource_list = CloudResources(Design.instance().credentialId(), constant.RESTYPE.ENI, Design.instance().region());
        appData = (_ref = resource_list.get(eniComp.get('appId'))) != null ? _ref.toJSON() : void 0;
        name = eniComp.get("name");
        group = [
          {
            appId: eniComp.get("appId"),
            name: name + "-0",
            desc: eniComp.get("description"),
            status: appData ? appData.status : "Unknown",
            sourceDestCheck: eniComp.get("sourceDestCheck") ? "enabled" : "disabled"
          }
        ];
        count = eniComp.serverGroupCount();
        if (eniComp.groupMembers().length > count - 1) {
          members = eniComp.groupMembers().slice(0, count - 1);
        } else {
          members = eniComp.groupMembers();
        }
        for (index = _i = 0, _len = members.length; _i < _len; index = ++_i) {
          member = members[index];
          group.push({
            name: name + "-" + (index + 1),
            appId: member.appId,
            status: (resource_list != null ? (_ref1 = resource_list.get(member.appId)) != null ? _ref1.toJSON() : void 0 : void 0) ? (_ref2 = resource_list.get(member.appId)) != null ? _ref2.toJSON().status : void 0 : "Unknown",
            isNew: !member.appId,
            isOld: member.appId && (index + 1 >= count)
          });
        }
        while (group.length < count) {
          group.push({
            name: name + "-" + group.length,
            isNew: true,
            status: "Unknown"
          });
        }
        existingLength = 0;
        _ref3 = eniComp.groupMembers();
        for (idx = _j = 0, _len1 = _ref3.length; _j < _len1; idx = ++_j) {
          eni = _ref3[idx];
          if (eni.appId) {
            existingLength = idx + 1;
          } else {
            break;
          }
        }
        existingLength += 1;
        if (group.length > 1) {
          this.set('group', group);
          if (existingLength > count) {
            group.increment = "-" + (existingLength - count);
          } else if (existingLength < count) {
            group.increment = "+" + (count - existingLength);
          }
        } else {
          this.set('group', group[0]);
        }
        this.set('readOnly', false);
        return null;
      },
      addIp: function() {
        var comp, ips;
        comp = Design.instance().component(this.get("uid"));
        comp.addIp();
        ips = comp.getIpArray();
        ips[0].unDeletable = true;
        this.set("ips", ips);
        return null;
      },
      isValidIp: function(ip) {
        return Design.instance().component(this.get("uid")).isValidIp(ip);
      },
      canAddIP: function() {
        return Design.instance().component(this.get("uid")).canAddIp();
      },
      setIp: function(idx, ip, autoAssign) {
        Design.instance().component(this.get("uid")).setIp(idx, ip, autoAssign);
        return null;
      }
    });
    return new ENIModel();
  });

}).call(this);
